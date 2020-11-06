import StatefulSubject from "../../utils/StatefulSubject";
import AsyncAction from "../../utils/AsyncAction";
import { Subject } from "rxjs";

export interface Cell {
  name: string;
  value: string | React.Component;
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
}

export interface Sort {
  name: string;
  direction: "ASC" | "DESC";
}

export interface RequestOptions<T> {
  rows: Row<T>[];
  sorts: Sort[];
  keywords?: string;
}

type TableStateEvent = "pending" | "ready" | "finished";

interface MutationEvent<T> {
  type: "added" | "edited" | "deleted";
  row: Row<T>;
}

interface MutationErrorEvent<T> {
  type: "added" | "edited" | "deleted";
  row: Row<T> | null;
  error: Error;
}

abstract class TableState<T> {
  protected context: TableMediator<T>;

  constructor(context: TableMediator<T>) {
    this.context = context;
  }

  abstract loadNextBatch(): void;
  abstract reset(): void;
}

class ReadyState<T> extends TableState<T> {
  loadNextBatch() {
    const onLoad = this.context.getOnLoad();
    const rows = this.context.getRows();
    const sorts = this.context.getSorts();
    const keywords = this.context.getKeywords();

    this.context.changeToPendingState();

    onLoad({
      rows,
      sorts,
      keywords,
    })
      .execute()
      .then((response) => {
        if (!response.isLast) {
          this.context.changeToReadyState();
        } else {
          this.context.changeToFinishedState();
        }

        this.context.loadRows(response.data);
      })
      .catch(() => {})
      .finally();
  }

  reset() {
    this.context.clearRows();
    this.context.deselectAllRows();
    this.context.loadNextBatch();
  }
}

class PendingState<T> extends TableState<T> {
  loadNextBatch() {
    // Do nothing.
  }
  reset() {
    this.context.getPendingRequest()?.cancel();

    this.context.clearRows();
    this.context.deselectAllRows();
    this.context.changeToReadyState();
    this.context.loadNextBatch();
  }
}

class FinishedState<T> extends TableState<T> {
  loadNextBatch() {
    // Do nothing
  }

  reset() {
    this.context.clearRows();
    this.context.deselectAllRows();
    this.context.changeToReadyState();
    this.context.loadNextBatch();
  }
}

const nullableOnViewFunction = () => {
  return Promise.reject(new Error("No OnView Handler Found."));
};

const nullableOnEditFunction = () => {
  return Promise.reject(new Error("No OnEdit Handler Found."));
};

const nullableOnDeleteFunction = () => {
  return Promise.reject(new Error("No OnDelete Handler Found."));
};

function nullableOnLoadFunction<T>() {
  return AsyncAction.reject<Response<T>>(new Error("No OnLoad Handler Found."));
}

function nullableOnAddFunction() {
  return Promise.reject(new Error("No OnAdd Handler Found."));
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
  private state: TableState<T>;
  private readyState = new ReadyState<T>(this);
  private pendingState = new PendingState<T>(this);
  private finishedState = new FinishedState<T>(this);
  private rows: Row<T>[] = [];
  private keywords: string = "";
  private selectedRows = new Map<string, Row<T>>();
  private currentSorts: Sort[] = [];
  private pendingResponse: AsyncAction<T> | null = null;
  private columns: Column[] = [];
  private onLoad: (
    request: RequestOptions<T>
  ) => AsyncAction<Response<T>> = nullableOnLoadFunction;
  private onView: (item: Row<T>) => Promise<void> = nullableOnViewFunction;
  private onAdd: () => Promise<Row<T>> = nullableOnAddFunction;
  private onEdit: (item: Row<T>) => Promise<void> = nullableOnEditFunction;
  private onDelete: (item: Row<T>) => Promise<void> = nullableOnDeleteFunction;
  private stateSubject = new StatefulSubject<TableStateEvent>("ready");
  private mutationSubject = new Subject<MutationEvent<T>>();
  private mutationErrorSubject = new Subject<MutationErrorEvent<T>>();
  private loadedSubject = new Subject<Row<T>[]>();
  private columnsSubject = new Subject<Column[]>();

  constructor() {
    this.state = this.readyState;
  }

  loadNextBatch() {
    return this.state.loadNextBatch();
  }

  getKeywords() {
    return this.keywords;
  }

  setOnLoad(onLoad: (request: RequestOptions<T>) => AsyncAction<Response<T>>) {
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

  setOnAdd(onAdd: () => Promise<Row<T>>) {
    this.onAdd = onAdd;
  }

  getOnAdd() {
    return this.onAdd;
  }

  setOnEdit(onEdit: (item: Row<T>) => Promise<void>) {
    this.onEdit = onEdit;
  }

  getOnEdit() {
    return this.onEdit;
  }

  setOnDelete(onDelete: (item: Row<T>) => Promise<void>) {
    this.onDelete = onDelete;
  }

  getOnDelete() {
    return this.onDelete;
  }

  getColumns() {
    return this.columns.slice();
  }

  setColumns(columns: Column[]) {
    if (!this.areColumnsEqual(this.columns, columns)) {
      this.columns = columns;
      this.columnsSubject.next(columns.slice());
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

  getPendingRequest() {
    return this.pendingResponse;
  }

  search(keywords: string) {
    this.reset();
    this.keywords = keywords;
    this.loadNextBatch();
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

  viewSelectedRows() {
    this.selectedRows.forEach((row) => {
      this.onView(row);
    });
  }

  deleteSelectedRows() {
    this.selectedRows.forEach((row) => {
      this.onDelete(row)
        .then(() => {
          this.mutationSubject.next({
            type: "deleted",
            row,
          });
        })
        .catch((error) => {
          this.mutationErrorSubject.next({
            type: "deleted",
            row,
            error,
          });
        });
    });
  }

  editSelectedRows() {
    this.selectedRows.forEach((row) => {
      this.onEdit(row)
        .then(() => {
          this.mutationSubject.next({
            type: "edited",
            row,
          });
        })
        .catch((error) => {
          this.mutationErrorSubject.next({
            type: "edited",
            row,
            error,
          });
        });
    });
  }

  addRow() {
    this.onAdd()
      .then((row) => {
        this.mutationSubject.next({
          type: "added",
          row,
        });
      })
      .catch((error) => {
        this.mutationErrorSubject.next({
          type: "added",
          row: null,
          error,
        });
      });
  }

  addSort(name: string, direction: "ASC" | "DESC") {
    const index = this.currentSorts.findIndex((sort) => {
      return sort.name === name;
    });

    if (index === -1) {
      this.currentSorts.splice(index, 1, { name, direction });
    } else {
      this.currentSorts.push({ name, direction });
    }

    this.reset();
    this.loadNextBatch();
  }

  removeSortByName(name: string) {
    const index = this.currentSorts.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      this.currentSorts.splice(index, 1);

      this.reset();
      this.loadNextBatch();
    }
  }

  changeToPendingState() {
    this.state = this.pendingState;
    this.stateSubject.next("pending");
  }

  changeToReadyState() {
    this.state = this.readyState;
    this.stateSubject.next("ready");
  }

  changeToFinishedState() {
    this.state = this.finishedState;
    this.stateSubject.next("finished");
  }

  getSorts() {
    return this.currentSorts.slice();
  }

  reset() {
    return this.state.reset();
  }

  getLoadedLength() {
    return this.rows.length;
  }

  clearRows() {
    this.rows.length = 0;
  }

  getRows(start?: number, end?: number) {
    return this.rows.slice(start, end);
  }

  loadRows(rows: Row<T>[]) {
    rows.forEach((r) => this.rows.push(r));
    this.loadedSubject.next(rows);
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

  getState() {
    return this.stateSubject.getState();
  }

  onRowMutation(callback: (event: MutationEvent<T>) => void) {
    return this.mutationSubject.subscribe({
      next: callback,
    });
  }

  onRowsLoaded(callback: (rows: Row<T>[]) => void) {
    return this.loadedSubject.subscribe({ next: callback });
  }

  onColumnsChange(callback: (columns: Column[]) => void) {
    return this.columnsSubject.subscribe({
      next: callback,
    });
  }

  dispose() {
    this.stateSubject.complete();
    this.mutationSubject.complete();
    this.mutationErrorSubject.complete();
    this.columnsSubject.complete();
    this.loadedSubject.complete();
  }
}
