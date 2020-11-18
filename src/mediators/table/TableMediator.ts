import AsyncAction from "../../utils/AsyncAction";
import AsyncActionStateMachine, {
  StateEvent,
} from "../../utils/AsyncActionStateMachine";
import { Subject } from "rxjs";
import StatefulSubject from "../../utils/StatefulSubject";

export interface Cell {
  name: string;
  value: string | React.ReactNode;
}

export interface Row<T> {
  id: string;
  value: T;
  cells: Cell[];
}

export interface Response<T> {
  data: Row<T>[];
  isLast: boolean;
  error?: Error;
}

export interface Column {
  name: string;
  label: string;
  width: number;
  canSort: boolean;
  alignment: "left" | "center" | "right";
}

export interface Sort {
  name: string;
  direction: "ASC" | "DESC";
}

export interface RequestOptions<T> {
  rows: Row<T>[];
  sorts: Sort[];
  keywords: string;
}

export interface Action<T> {
  name: string;
  label: string;
  isPrimary: boolean;
  shouldReloadRowsAfterAction: boolean;
  canActOn: (selectedRows: Row<T>) => boolean;
  handler: (selectedRows: Row<T>[]) => AsyncAction<void>;
}

interface MutationEvent<T> {
  type: "added" | "edited" | "deleted";
  row: Row<T>;
}

interface MutationErrorEvent<T> {
  type: "added" | "edited" | "deleted";
  row: Row<T> | null;
  error: Error;
}

const nullableOnViewFunction = () => {
  return Promise.reject(new Error("No OnView Handler Found."));
};

function nullableOnLoadFunction<T>() {
  return Promise.reject<Response<T>>(new Error("No OnLoad Handler Found."));
}

function sortColumns(a: Column, b: Column) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}

export default class TableMediator<T> {
  private loadingStateMachine = new AsyncActionStateMachine<Response<T>>();
  private actionStateMachine = new AsyncActionStateMachine<void>();
  private rows: Row<T>[] = [];
  private keywords: string = "";
  private selectedRows = new Map<string, Row<T>>();
  private currentSorts: Sort[] = [];
  private columns: Column[] = [];
  private onLoad: (
    request: RequestOptions<T>
  ) => Promise<Response<T>> = nullableOnLoadFunction;
  private onView: (item: Row<T>) => Promise<void> = nullableOnViewFunction;

  private mutationSubject = new Subject<MutationEvent<T>>();
  private mutationErrorSubject = new Subject<MutationErrorEvent<T>>();
  private rowsChangeSubject = new Subject<Row<T>[]>();
  private columnsSubject = new Subject<Column[]>();
  private sortSubject = new Subject<Sort[]>();
  private actions: Action<T>[] = [];

  loadNextBatch() {
    const onLoad = this.getOnLoad();
    const rows = this.getRows();
    const sorts = this.getSorts();
    const keywords = this.getKeywords();

    const action = new AsyncAction(() => {
      return onLoad({
        rows,
        sorts,
        keywords,
      });
    });

    this.loadingStateMachine
      .execute(action)
      .then((response) => {
        this.loadRows(response.data);
        if (response.isLast) {
          this.loadingStateMachine.disable();
        }

        this.notifyRowsChange();
        return response;
      })
      .catch(() => {
        // Do nothing.
      });
  }

  getKeywords() {
    return this.keywords;
  }

  getActions() {
    return this.actions.slice();
  }

  getActionByName(name: string) {
    return this.actions.find((a) => a.name === name);
  }

  setActions(value: Action<T>[]) {
    this.actions = value.slice();
  }

  performAction(name: string, rows: Row<T>[]) {}

  performActionOnSelectedRows(name: string) {}

  setOnLoad(onLoad: (request: RequestOptions<T>) => Promise<Response<T>>) {
    this.onLoad = onLoad;
  }

  getOnLoad() {
    return this.onLoad;
  }

  setOnView(onView: (item: Row<T>) => Promise<void>) {
    this.onView = onView;
  }

  getOnView() {
    return this.onView;
  }

  getColumns() {
    return this.columns.slice();
  }

  setColumns(columns: Column[]) {
    if (!this.areColumnsEqual(this.columns, columns)) {
      this.columns = columns;
      this.columnsSubject.next(columns.slice());
      this.currentSorts = this.columns
        .filter((c) => c.canSort)
        .map((c) => ({ name: c.name, direction: "ASC" }));
      this.sortSubject.next(this.currentSorts.slice());
    }
  }

  private areColumnsEqual(columnsA: Column[], columnsB: Column[]) {
    columnsA.slice().sort(sortColumns);
    columnsB.slice().sort(sortColumns);

    const stringA = columnsA
      .map((c) => `${c.name}|${c.label}|${c.width}|${c.canSort}`)
      .join(",");
    const stringB = columnsB
      .map((c) => `${c.name}|${c.label}|${c.width}|${c.canSort}`)
      .join(",");

    return stringA === stringB;
  }

  search(keywords: string) {
    this.keywords = keywords;

    this.reset();
    this.loadNextBatch();
  }

  updateRow(row: Row<T>) {
    const index = this.rows.findIndex((r) => r.id === row.id);

    if (index > -1) {
      this.rows.splice(index, 1, row);
    }
  }

  selectRow(row: Row<T>) {
    this.selectedRows.set(row.id, row);
  }

  deselectRow(row: Row<T>) {
    this.selectedRows.delete(row.id);
  }

  deselectAllRows() {
    this.selectedRows.clear();
  }

  getSelectedRows() {
    return Array.from(this.selectedRows.values());
  }

  viewSelectedRows() {
    this.selectedRows.forEach((row) => {
      this.onView(row);
    });
  }

  setSort(name: string, direction: "ASC" | "DESC") {
    const index = this.currentSorts.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      this.currentSorts.splice(index, 1, { name, direction });
    } else {
      this.currentSorts.push({ name, direction });
    }

    this.sortSubject.next(this.currentSorts.slice());
    this.reset();
    this.loadNextBatch();
  }

  removeSortByName(name: string) {
    const index = this.currentSorts.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      this.currentSorts.splice(index, 1);

      this.sortSubject.next(this.currentSorts.slice());
      this.reset();
      this.loadNextBatch();
    }
  }

  getSorts() {
    return this.currentSorts.slice();
  }

  reset() {
    this.clearRows();
    this.loadingStateMachine.restore();
  }

  getLoadedRowsLength() {
    return this.rows.length;
  }

  clearRows() {
    this.rows.length = 0;
    this.notifyRowsChange();
  }

  getRows(start?: number, end?: number) {
    return this.rows.slice(start, end);
  }

  loadRows(rows: Row<T>[]) {
    rows.forEach((r) => this.rows.push(r));
    this.notifyRowsChange();
  }

  getRowsWithinRange(
    offsetY: number,
    rowHeight: number,
    startY: number,
    endY: number
  ) {
    startY = startY - offsetY;
    endY = endY - offsetY;

    let startIndex = Math.floor(startY / rowHeight);
    let endIndex = Math.ceil(endY / rowHeight);

    startIndex = Math.max(0, startIndex);
    endIndex = Math.min(this.rows.length - 1, endIndex);

    const width = this.getContentWidth();

    return this.rows.slice(startIndex, endIndex + 1).map((row, index) => {
      return {
        row: row,
        x: 0,
        y: (startIndex + index) * rowHeight + offsetY,
        width,
        height: rowHeight,
      };
    });
  }

  getContentWidth() {
    return this.columns.reduce((acc, column) => {
      return acc + column.width;
    }, 0);
  }

  getLoadingState() {
    return this.loadingStateMachine.getState().getName();
  }

  getActionState() {
    return this.actionStateMachine.getState().getName();
  }

  notifyRowsChange() {
    this.rowsChangeSubject.next(this.rows.slice());
  }

  onRowMutation(callback: (event: MutationEvent<T>) => void) {
    return this.mutationSubject.subscribe({ next: callback });
  }

  onSortChange(callback: (sorts: Sort[]) => void) {
    return this.sortSubject.subscribe({ next: callback });
  }

  onRowsChange(callback: (rows: Row<T>[]) => void) {
    return this.rowsChangeSubject.subscribe({ next: callback });
  }

  onColumnsChange(callback: (columns: Column[]) => void) {
    return this.columnsSubject.subscribe({ next: callback });
  }

  onLoadingStateChange(callback: (event: StateEvent) => void) {
    return this.loadingStateMachine.onStateChange(callback);
  }

  onActionStateChange(callback: (event: StateEvent) => void) {
    return this.actionStateMachine.onStateChange(callback);
  }

  dispose() {
    this.loadingStateMachine.dispose();
    this.actionStateMachine.dispose();

    this.mutationSubject.complete();
    this.mutationErrorSubject.complete();
    this.columnsSubject.complete();
    this.rowsChangeSubject.complete();
    this.sortSubject.complete();
  }
}
