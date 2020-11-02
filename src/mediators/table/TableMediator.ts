import { Subject } from "rxjs";
import AsyncAction from "../../utils/AsyncAction";

// NOTE: TODO We need to remove all concepts of pages.
// We should use the State pattern with three states, ready, pending, complete.

export interface Cell {
  name: string;
  value: string | React.Component;
}

export interface Row<T> {
  id: string;
  value: T;
  cells: Cell[];
  page: number;
}

export interface Response<T> {
  data: Row<T>[];
  isLast: boolean;
  page: number;
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
  private context: TableMediator<T>;

  constructor(context: TableMediator<T>) {
    this.context = context;
  }

  abstract activate(): void;
  abstract deactivate(): void;
  abstract loadNextBatch(): void;
  abstract reset(): void;
}

class ReadyState<T> extends TableState<T> {
  activate() {}
  deactivate() {}
  loadNextBatch() {}
  reset() {}
}

class PendingState<T> extends TableState<T> {
  activate() {}
  deactivate() {}
  loadNextBatch() {}
  reset() {}
}

class FinishedState<T> extends TableState<T> {
  activate() {}
  deactivate() {}
  loadNextBatch() {}
  reset() {}
}

export default class TableMediator<T> {
  private state: TableState<T>;
  private readyState = new ReadyState(this);
  private pendingState = new PendingState(this);
  private finishedState = new FinishedState(this);
  private responses: Row<T>[] = [];
  private keywords: string;
  private selectedRows = new Map<string, Row<T>>();
  private onLoad: (request: RequestOptions<T>) => Promise<Response<T>>;
  private onView: (item: T) => Promise<void>;
  private onAdd: () => Promise<void>;
  private onEdit: (item: T) => Promise<void>;
  private onDelete: (item: T) => Promise<void>;
  private currentSorts: Sort[] = [];
  private pendingResponse: AsyncAction<T> | null = null;
  private loadingSubject = new Subject<LoadingPageEvent>();
  private columns: Column[] = [];

  constructor() {
    this.state = this.readyState;
  }

  loadNextBatch() {
    return this.state.loadNextBatch();
  }

  setOnLoad(onLoad: (request: RequestOptions<T>) => Promise<Response<T>>) {
    this.onLoad = onLoad;
  }

  setOnView(onView: (item: T) => Promise<void>) {
    this.onView = onView;
  }

  setOnAdd(onAdd: () => Promise<void>) {
    this.onAdd = onAdd;
  }

  setOnEdit(onEdit: (item: T) => Promise<void>) {
    this.onEdit = onEdit;
  }

  setOnDelete(onDelete: (item: T) => Promise<void>) {
    this.onDelete = onDelete;
  }

  getColumn() {
    return this.columns.slice();
  }

  setColumns(columns: Column[]) {
    this.columns = columns;
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

  removeSort(name: string) {
    const index = this.currentSorts.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      this.currentSorts.splice(index, 1);

      this.reset();
      this.loadNextBatch();
    }
  }

  reset() {
    return this.state.reset();
  }

  getTotalRowsLoaded() {
    return Array.from(this.responses.values()).reduce((total, response) => {
      return total + response.data.length;
    }, 0);
  }
}
