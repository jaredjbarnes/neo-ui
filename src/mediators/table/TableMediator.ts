import AsyncAction from "../../utils/AsyncAction";
import AsyncActionStateMachine, {
  StateEvent,
} from "../../utils/AsyncActionStateMachine";
import { Subject } from "rxjs";

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
  query: string;
}

export interface Action<T> {
  name: string;
  label: string;
  isPrimary: boolean;
  canAct: (table: TableMediator<T>) => boolean;
  handler: (table: TableMediator<T>) => Promise<void>;
}

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
  private query: string = "";
  private selectedRows = new Map<string, Row<T>>();
  private actions: Map<string, Action<T>> = new Map();
  private currentSorts: Sort[] = [];
  private columns: Column[] = [];
  private onLoad: (
    request: RequestOptions<T>
  ) => Promise<Response<T>> = nullableOnLoadFunction;

  private rowsChangeSubject = new Subject<Row<T>[]>();
  private columnsSubject = new Subject<Column[]>();
  private sortSubject = new Subject<Sort[]>();
  private actionsSubject = new Subject<Action<T>[]>();
  private selectionSubject = new Subject<Row<T>[]>();
  private querySubject = new Subject<string>();

  loadNextBatch() {
    const onLoad = this.getOnLoad();
    const rows = this.getRows();
    const sorts = this.getSorts();
    const query = this.getQuery();

    const action = new AsyncAction(() => {
      return onLoad({
        rows,
        sorts,
        query,
      });
    });

    this.loadingStateMachine
      .execute(action)
      .then((response) => {
        this.appendRows(response.data);
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

  getQuery() {
    return this.query;
  }

  getActions() {
    return Array.from(this.actions.values());
  }

  getActionByName(name: string) {
    return this.actions.get(name);
  }

  setActions(actions: Action<T>[]) {
    if (!this.areActionsEqual(actions)) {
      this.actions.clear();
      actions.forEach((a) => this.actions.set(a.name, a));
      this.actionsSubject.next(actions);
    }
  }

  areActionsEqual(actions: Action<T>[]) {
    const newActionsLength = actions.length;
    const currentActionsLength = this.actions.size;

    return (
      newActionsLength === currentActionsLength &&
      actions.every((a) => {
        return this.actions.has(a.name);
      })
    );
  }

  performAction(name: string, rows: Row<T>[]) {
    const action = this.actions.get(name);

    if (action != null) {
      const dynamicAction = new AsyncAction(() => action.handler(this));

      this.actionStateMachine.execute(dynamicAction);
    } else {
      throw new Error(`Unable to find action by name of '${name}'.`);
    }
  }

  performActionOnSelectedRows(name: string) {
    this.performAction(name, Array.from(this.selectedRows.values()));
  }

  setOnLoad(onLoad: (request: RequestOptions<T>) => Promise<Response<T>>) {
    this.onLoad = onLoad;
  }

  getOnLoad() {
    return this.onLoad;
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

  search(query: string) {
    this.query = query;
    this.querySubject.next(query);

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
    this.selectionSubject.next(this.getSelectedRows());
  }

  deselectRow(row: Row<T>) {
    this.selectedRows.delete(row.id);
    this.selectionSubject.next(this.getSelectedRows());
  }

  deselectAllRows() {
    this.selectedRows.clear();
    this.selectionSubject.next(this.getSelectedRows());
  }

  selectedAllRows() {
    this.rows.forEach((row) => {
      this.selectedRows.set(row.id, row);
    });

    this.selectionSubject.next(this.getSelectedRows());
  }

  getSelectedRows() {
    return Array.from(this.selectedRows.values());
  }

  isRowSelected(row: Row<T>) {
    return this.selectedRows.has(row.id);
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

  reload() {
    this.reset();
    this.loadNextBatch();
  }

  refresh() {
    this.notifyRowsChange();
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

  appendRows(rows: Row<T>[]) {
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

  onSortChange(callback: (sorts: Sort[]) => void) {
    return this.sortSubject.subscribe({ next: callback });
  }

  onRowsChange(callback: (rows: Row<T>[]) => void) {
    return this.rowsChangeSubject.subscribe({ next: callback });
  }

  onColumnsChange(callback: (columns: Column[]) => void) {
    return this.columnsSubject.subscribe({ next: callback });
  }

  onActionsChange(callback: (actions: Action<T>[]) => void) {
    return this.actionsSubject.subscribe({ next: callback });
  }

  onLoadingStateChange(callback: (event: StateEvent) => void) {
    return this.loadingStateMachine.onStateChange(callback);
  }

  onActionStateChange(callback: (event: StateEvent) => void) {
    return this.actionStateMachine.onStateChange(callback);
  }

  onSelectedRowsChange(callback: (rows: Row<T>[]) => void) {
    return this.selectionSubject.subscribe({ next: callback });
  }

  onQueryChange(callback: (query: string) => void) {
    return this.querySubject.subscribe({ next: callback });
  }

  dispose() {
    this.loadingStateMachine.dispose();
    this.actionStateMachine.dispose();

    this.columnsSubject.complete();
    this.rowsChangeSubject.complete();
    this.sortSubject.complete();
    this.actionsSubject.complete();
    this.querySubject.complete();
  }
}
