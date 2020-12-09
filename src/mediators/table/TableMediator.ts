import { AsyncAction } from "../../utils/AsyncAction";
import { AsyncStateMachine } from "../../utils/AsyncStateMachine";
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

  readonly rows = new AsyncStateMachine<Row<T>[]>([]);
  readonly action = new AsyncStateMachine<void>(undefined);

  readonly query = new StatefulSubject("");
  readonly columns = new StatefulSubject<Column[]>([]);
  readonly sorting = new StatefulSubject<Sort[]>([]);
  readonly actions = new StatefulSubject<Action<T>[]>([]);
  readonly selectedRows = new StatefulSubject<Row<T>[]>([]);

  private onLoad: (
    request: RequestOptions<T>
  ) => Promise<Response<T>> = nullableOnLoadFunction;

  async loadNextBatch() {
    const onLoad = this.getOnLoad();
    const rows = this.rows.getValue().slice();
    const sorting = this.sorting.getValue();
    const query = this.query.getValue();
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
      await this.rows.execute(action);
    } catch (_) {
      // Do Nothing
    } finally {
      if (isLast) {
        this.rows.disable();
      }
    }
  }

  getActions() {
    return this.actions.getValue().slice();
  }

  getActionByName(name: string) {
    return this.actionsMap.get(name);
  }

  setActions(actions: Action<T>[]) {
    if (!this.areActionsEqual(actions)) {
      this.actionsMap.clear();
      actions.forEach((a) => this.actionsMap.set(a.name, a));
      this.actions.setValue(actions);
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
    this.performAction(name, this.selectedRows.getValue());
  }

  setOnLoad(onLoad: (request: RequestOptions<T>) => Promise<Response<T>>) {
    this.onLoad = onLoad;
  }

  getOnLoad() {
    return this.onLoad;
  }

  getColumns() {
    return this.columns.getValue().slice();
  }

  setColumns(columns: Column[]) {
    if (!this.areColumnsEqual(this.columns.getValue(), columns)) {
      this.columns.setValue(columns);
      this.sorting.setValue(
        this.columns
          .getValue()
          .filter((c) => c.canSort)
          .map((c) => ({ name: c.name, direction: "ASC" }))
      );
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
    this.query.setValue(query);
    this.reset();
    this.loadNextBatch();
  }

  updateRow(row: Row<T>) {
    const index = this.rows.getValue().findIndex((r) => r.id === row.id);

    if (index > -1) {
      this.rows.getValue().splice(index, 1, row);
    }
  }

  selectRow(row: Row<T>) {
    this.selectedRowsMap.set(row.id, row);
    this.selectedRows.setValue(this.getSelectedRows());
  }

  deselectRow(row: Row<T>) {
    this.selectedRowsMap.delete(row.id);
    this.selectedRows.setValue(this.getSelectedRows());
  }

  deselectAllRows() {
    this.selectedRowsMap.clear();
    this.selectedRows.setValue(this.getSelectedRows());
  }

  selectedAllRows() {
    this.rows.getValue().forEach((row) => {
      this.selectedRowsMap.set(row.id, row);
    });

    this.selectedRows.setValue(this.getSelectedRows());
  }

  getSelectedRows() {
    return Array.from(this.selectedRowsMap.values());
  }

  isRowSelected(row: Row<T>) {
    return this.selectedRowsMap.has(row.id);
  }

  setSort(name: string, direction: "ASC" | "DESC") {
    const sorting = this.sorting.getValue().slice();

    const index = sorting.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      sorting.splice(index, 1, { name, direction });
    } else {
      sorting.push({ name, direction });
    }

    this.sorting.setValue(sorting);
    this.reset();
    this.loadNextBatch();
  }

  removeSortByName(name: string) {
    const sorting = this.sorting.getValue();

    const index = sorting.findIndex((sort) => {
      return sort.name === name;
    });

    if (index > -1) {
      sorting.splice(index, 1);

      this.sorting.setValue(sorting);
      this.reset();
      this.loadNextBatch();
    }
  }

  reset() {
    this.clearRows();
    this.rows.restore();
  }

  reload() {
    this.reset();
    this.loadNextBatch();
  }

  refresh() {
    this.rows.setValue(this.rows.getValue());
  }

  getLoadedRowsLength() {
    return this.rows.getValue().length;
  }

  clearRows() {
    this.rows.setValue([]);
  }

  getContentWidth() {
    return this.columns.getValue().reduce((acc, column) => {
      return acc + column.width;
    }, 0);
  }

  dispose() {
    this.rows.dispose();
    this.action.dispose();
    this.query.dispose();
    this.columns.dispose();
    this.sorting.dispose();
    this.actions.dispose();
    this.selectedRows.dispose();
  }
}
