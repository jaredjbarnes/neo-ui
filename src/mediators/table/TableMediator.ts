import AsyncAction from "../../utils/AsyncAction";
import StatefulAction from "../../utils/StatefulAction";
import StatefulValue from "../../utils/StatefulValue";

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
  sorting: Sort[];
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
  private selectedRowsMap = new Map<string, Row<T>>();
  private actionsMap: Map<string, Action<T>> = new Map();

  readonly loadedRowsAction = new StatefulAction<Row<T>[]>([]);
  readonly action = new StatefulAction<void>(undefined);
  
  readonly query = new StatefulValue("");
  readonly currentSorts = new StatefulValue<Sort[]>([]);
  readonly columns = new StatefulValue<Column[]>([]);
  readonly sorting = new StatefulValue<Sort[]>([]);
  readonly actions = new StatefulValue<Action<T>[]>([]);
  readonly selectedRows = new StatefulValue<Row<T>[]>([]);

  private onLoad: (
    request: RequestOptions<T>
  ) => Promise<Response<T>> = nullableOnLoadFunction;

  async loadNextBatch() {
    const onLoad = this.getOnLoad();
    const rows = this.loadedRowsAction.value.slice();
    const sorting = this.sorting.value;
    const query = this.query.value;
    let isLast = false;

    const action = new AsyncAction(async () => {
      const response = await onLoad({
        rows,
        sorting,
        query,
      });

      isLast = response.isLast;
      return rows.concat(response.data);
    });

    try {
      await this.loadedRowsAction.execute(action);
    } catch (_) {
      // Do Nothing
    } finally {
      if (isLast) {
        this.loadedRowsAction.disable();
      }
    }
  }

  getActions() {
    return this.actions.value.slice();
  }

  getActionByName(name: string) {
    return this.actionsMap.get(name);
  }

  setActions(actions: Action<T>[]) {
    if (!this.areActionsEqual(actions)) {
      this.actionsMap.clear();
      actions.forEach((a) => this.actionsMap.set(a.name, a));
      this.actions.value = actions;
    }
  }

  areActionsEqual(actions: Action<T>[]) {
    const newActionsLength = actions.length;
    const currentActionsLength = this.actionsMap.size;

    return (
      newActionsLength === currentActionsLength &&
      actions.every((a) => {
        return this.actionsMap.has(a.name);
      })
    );
  }

  performAction(name: string, rows: Row<T>[]) {
    const action = this.actionsMap.get(name);

    if (action != null) {
      const dynamicAction = new AsyncAction(() => action.handler(this));

      this.action.execute(dynamicAction);
    } else {
      throw new Error(`Unable to find action by name of '${name}'.`);
    }
  }

  performActionOnSelectedRows(name: string) {
    this.performAction(name, this.selectedRows.value);
  }

  setOnLoad(onLoad: (request: RequestOptions<T>) => Promise<Response<T>>) {
    this.onLoad = onLoad;
  }

  getOnLoad() {
    return this.onLoad;
  }

  getColumns() {
    return this.columns.value.slice();
  }

  setColumns(columns: Column[]) {
    if (!this.areColumnsEqual(this.columns.value, columns)) {
      this.columns.value = columns;
      this.sorting.value = this.columns.value
        .filter((c) => c.canSort)
        .map((c) => ({ name: c.name, direction: "ASC" }));
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
    this.query.value = query;
    this.reset();
    this.loadNextBatch();
  }

  updateRow(row: Row<T>) {
    const index = this.loadedRowsAction.value.findIndex((r) => r.id === row.id);

    if (index > -1) {
      this.loadedRowsAction.value.splice(index, 1, row);
    }
  }

  selectRow(row: Row<T>) {
    this.selectedRowsMap.set(row.id, row);
    this.selectedRows.value = this.getSelectedRows();
  }

  deselectRow(row: Row<T>) {
    this.selectedRowsMap.delete(row.id);
    this.selectedRows.value = this.getSelectedRows();
  }

  deselectAllRows() {
    this.selectedRowsMap.clear();
    this.selectedRows.value = this.getSelectedRows();
  }

  selectedAllRows() {
    this.loadedRowsAction.value.forEach((row) => {
      this.selectedRowsMap.set(row.id, row);
    });

    this.selectedRows.value = this.getSelectedRows();
  }

  getSelectedRows() {
    return Array.from(this.selectedRowsMap.values());
  }

  isRowSelected(row: Row<T>) {
    return this.selectedRowsMap.has(row.id);
  }

  setSort(name: string, direction: "ASC" | "DESC") {
    const sorting = this.sorting.value.slice();

    const index = sorting.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      sorting.splice(index, 1, { name, direction });
    } else {
      sorting.push({ name, direction });
    }

    this.sorting.value = sorting;
    this.reset();
    this.loadNextBatch();
  }

  removeSortByName(name: string) {
    const sorting = this.sorting.value;

    const index = sorting.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      sorting.splice(index, 1);

      this.sorting.value = sorting;
      this.reset();
      this.loadNextBatch();
    }
  }

  reset() {
    this.clearRows();
    this.loadedRowsAction.restore();
  }

  reload() {
    this.reset();
    this.loadNextBatch();
  }

  refresh() {
    this.loadedRowsAction.value = this.loadedRowsAction.value;
  }

  getLoadedRowsLength() {
    return this.loadedRowsAction.value.length;
  }

  clearRows() {
    this.loadedRowsAction.value = [];
  }

  getContentWidth() {
    return this.columns.value.reduce((acc, column) => {
      return acc + column.width;
    }, 0);
  }

  dispose() {
    this.loadedRowsAction.dispose();
    this.action.dispose();
    this.query.dispose();
    this.columns.dispose();
    this.sorting.dispose();
    this.actions.dispose();
    this.selectedRows.dispose();
  }
}
