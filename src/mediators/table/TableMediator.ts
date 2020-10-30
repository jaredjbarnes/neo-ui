import { Subject } from "rxjs";

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

export interface RequestOptions {
  page: number;
  sorts: Sort[];
  keywords?: string;
}

export interface LoadingPageEvent {
  page: number;
  state: "loading" | "loaded";
}

export default class TableMediator<T> {
  private responses = new Map<number, Response<T>>();
  private isFinished = false;
  private keywords: string;
  private selectedRows = new Map<string, Row<T>>();
  private onLoad: (request: RequestOptions) => Promise<Response<T>>;
  private onView: (item: T) => Promise<void>;
  private onAdd: () => Promise<void>;
  private onEdit: (item: T) => Promise<void>;
  private onDelete: (item: T) => Promise<void>;
  private currentSorts: Sort[] = [];
  private pendingResponses: Promise<Response<T>>[] = [];
  private loadingSubject = new Subject<LoadingPageEvent>();
  private columns: Column[] = [];

  loadNextPage() {
    if (!this.isFinished) {
      this.loadPage(this.getFurthestPage() + 1);
    }
  }

  private loadPage(page: number, force?: boolean) {
    const response = this.responses.get(page);

    // Short Circuit. No need to load twice.
    if (!force && response != null && response.error != null) {
      return;
    }

    this.loadingSubject.next({
      page,
      state: "loading",
    });

    const request = {
      page: page,
      keywords: this.keywords,
      sorts: this.currentSorts,
    };

    const pendingResponse = this.onLoad(request)
      .then((response) => {
        response.page = page;
        response.data.forEach((row) => (row.page = page));

        this.responses.set(page, response);
        this.isFinished = response.isLast;

        return response;
      })
      .catch((error) => {
        const response = {
          data: [],
          isLast: false,
          error,
          page,
        };

        this.responses.set(page, response);

        return response;
      })
      .finally(() => {
        const index = this.pendingResponses.indexOf(pendingResponse);

        if (index > -1) {
          this.pendingResponses.splice(index, 1);
        }

        if (this.pendingResponses.length === 0) {
          this.loadingSubject.next({
            page,
            state: "loaded",
          });
        }
      });

    this.pendingResponses.push(pendingResponse);

    return pendingResponse;
  }

  private getFurthestPage() {
    return Array.from(this.responses.values()).reduce((lastPage, response) => {
      return Math.max(lastPage, response.page);
    }, 0);
  }

  refreshPage(page: number) {
    this.loadPage(page, true);
  }

  setOnLoad(onLoad: (request: RequestOptions) => Promise<Response<T>>) {
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
    this.responses = new Map<number, Response<T>>();
    this.keywords = keywords;

    this.loadNextPage();
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

  viewRow(row: Row<T>) {
    this.onView(row.value)
      .then(() => {
        this.refresh();
      })
      .catch(() => {
        // Do nothing for now
      });
  }

  deleteRow(row: Row<T>) {
    this.onDelete(row.value)
      .then(() => {
        this.refresh();
      })
      .catch((error) => {
        // Do nothing for now.
      });
  }

  editRow(row: Row<T>) {
    this.onEdit(row.value)
      .then(() => {
        this.refresh();
      })
      .catch(() => {
        // Do nothing for now
      });
  }

  addRow() {
    this.onAdd()
      .then(() => {
        this.refresh();
      })
      .catch((error) => {});
  }

  refresh() {
    Array.from(this.responses.values()).forEach((response) => {
      this.refreshPage(response.page);
    });
  }

  sort(name: string, direction: "ASC" | "DESC") {
    const index = this.currentSorts.findIndex((sort) => {
      return sort.name === name;
    });

    if (index === -1) {
      this.currentSorts.splice(index, 1, { name, direction });
    } else {
      this.currentSorts.push({ name, direction });
    }
  }

  getTotalRowsLoaded() {
    return Array.from(this.responses.values()).reduce((total, response) => {
      return total + response.data.length;
    }, 0);
  }
}
