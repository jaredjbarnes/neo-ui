import { Subject } from "rxjs";
import AsyncAction from "../../utils/AsyncAction";

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
  canSort: boolean;
}

export interface Sort {
  name: string;
  direction: "ASC" | "DESC";
}

export interface RequestOptions<T> {
  currentResults: Row<T>[];
  sorts: Sort[];
  keywords?: string;
}

export interface LoadingPageEvent {
  page: number;
  state: "loading" | "loaded";
}

abstract class TableState<T> {
  context: TableMediator<T>;

  constructor(context: TableMediator<T>) {
    this.context = context;
  }

  abstract loadNextBatch(): void;
  abstract reset(): void;
}

class ReadyState<T> extends TableState<T> {
  loadNextBatch() {}

  reset() {
    // Do nothing,
  }
}

class PendingState<T> extends TableState<T> {
  loadNextBatch() {
    // Do nothing.
  }
  reset() {
    this.context.getPendingRequest()?.cancel();
  }
}

class FinishedState<T> extends TableState<T> {
  loadNextBatch() {
    // Do nothing
  }
  
  reset() {
    
  }
}

const nullableFunction = () => {
  return Promise.resolve(undefined);
};

function nullableOnLoadFunction<T>() {
  return AsyncAction.resolve({
    data: [],
    isLast: true,
  } as Response<T>);
}

export default class TableMediator<T> {
  private state: TableState<T>;
  private readyState = new ReadyState<T>(this);
  private pendingState = new PendingState<T>(this);
  private finishedState = new FinishedState<T>(this);
  private responses: Row<T>[] = [];
  private keywords: string = "";
  private selectedRows = new Map<string, Row<T>>();
  private currentSorts: Sort[] = [];
  private pendingResponse: AsyncAction<T> | null = null;
  private loadingSubject = new Subject<LoadingPageEvent>();
  private columns: Column[] = [];
  private onLoad: (
    request: RequestOptions<T>
  ) => AsyncAction<Response<T>> = nullableOnLoadFunction;
  private onView: (item: T) => Promise<void> = nullableFunction;
  private onAdd: () => Promise<void> = nullableFunction;
  private onEdit: (item: T) => Promise<void> = nullableFunction;
  private onDelete: (item: T) => Promise<void> = nullableFunction;

  constructor() {
    this.state = this.readyState;
  }

  loadNextBatch() {
    return this.state.loadNextBatch();
  }

  setOnLoad(onLoad: (request: RequestOptions<T>) => AsyncAction<Response<T>>) {
    this.onLoad = onLoad;
  }

  getOnLoad() {
    return this.onLoad;
  }

  setOnView(onView: (item: T) => Promise<void>) {
    this.onView = onView;
  }

  getOnView() {
    return this.onView;
  }

  setOnAdd(onAdd: () => Promise<void>) {
    this.onAdd = onAdd;
  }

  getOnAdd() {
    return this.onAdd;
  }

  setOnEdit(onEdit: (item: T) => Promise<void>) {
    this.onEdit = onEdit;
  }

  getOnEdit() {
    return this.onEdit;
  }

  setOnDelete(onDelete: (item: T) => Promise<void>) {
    this.onDelete = onDelete;
  }

  getOnDelete() {
    return this.onDelete;
  }

  getColumn() {
    return this.columns.slice();
  }

  setColumns(columns: Column[]) {
    this.columns = columns;
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

  viewSelectedRows(row: Row<T>) {}

  deleteSelectedRows(row: Row<T>) {}

  editSelectedRows() {}

  addRow() {}

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
  }

  changeToReadyState() {
    this.state = this.readyState;
  }

  changeToFinishState() {
    this.state = this.finishedState;
  }

  getSort() {
    return this.currentSorts.slice();
  }

  reset() {
    return this.state.reset();
  }
}
