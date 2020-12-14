"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AsyncAction = require("../../utils/AsyncAction");

var _AsyncActionRunner = require("../../utils/AsyncActionRunner");

var _ObservableValue = _interopRequireDefault(require("../../utils/ObservableValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nullableOnLoadFunction() {
  return Promise.reject(new Error("No OnLoad Handler Found."));
}

function sortColumns(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}

class TableMediator {
  selectedRowsMap = new Map();
  actionsMap = new Map();
  rows = new _AsyncActionRunner.AsyncActionRunner([]);
  action = new _AsyncActionRunner.AsyncActionRunner(undefined);
  query = new _ObservableValue.default("");
  columns = new _ObservableValue.default([]);
  sorting = new _ObservableValue.default([]);
  actions = new _ObservableValue.default([]);
  selectedRows = new _ObservableValue.default([]);
  isFinishedLoading = new _ObservableValue.default(false);
  isSelectable = new _ObservableValue.default(false);
  isSearchable = new _ObservableValue.default(false);
  onLoad = nullableOnLoadFunction;

  async loadNextBatch() {
    if (!this.isFinishedLoading.getValue()) {
      const onLoad = this.getOnLoad();
      const rows = this.rows.getValue().slice();
      const sorting = this.sorting.getValue();
      const query = this.query.getValue();
      const action = new _AsyncAction.AsyncAction(async () => {
        const response = await onLoad({
          rows,
          sorting,
          query
        });

        if (response.isLast) {
          this.isFinishedLoading.setValue(true);
        }

        return rows.concat(response.data);
      });
      await this.rows.execute(action);
    }
  }

  getActions() {
    return this.actions.getValue().slice();
  }

  getActionByName(name) {
    return this.actionsMap.get(name);
  }

  setActions(actions) {
    if (!this.areActionsEqual(actions)) {
      this.actionsMap.clear();
      actions.forEach(a => this.actionsMap.set(a.name, a));
      this.actions.setValue(actions);
    }
  }

  areActionsEqual(actions) {
    const newActionsLength = actions.length;
    const currentActionsLength = this.actionsMap.size;
    return newActionsLength === currentActionsLength && actions.every(a => {
      return this.actionsMap.has(a.name);
    });
  }

  performAction(name, rows) {
    const action = this.actionsMap.get(name);

    if (action != null) {
      const dynamicAction = new _AsyncAction.AsyncAction(() => action.handler(this));
      this.action.execute(dynamicAction);
    } else {
      throw new Error("Unable to find action by name of '".concat(name, "'."));
    }
  }

  performActionOnSelectedRows(name) {
    this.performAction(name, this.selectedRows.getValue());
  }

  setOnLoad(onLoad) {
    this.onLoad = onLoad;
  }

  getOnLoad() {
    return this.onLoad;
  }

  getColumns() {
    return this.columns.getValue().slice();
  }

  setColumns(columns) {
    if (!this.areColumnsEqual(this.columns.getValue(), columns)) {
      this.columns.setValue(columns);
      this.sorting.setValue(this.columns.getValue().filter(c => c.canSort).map(c => ({
        name: c.name,
        direction: "ASC"
      })));
    }
  }

  areColumnsEqual(columnsA, columnsB) {
    columnsA.slice().sort(sortColumns);
    columnsB.slice().sort(sortColumns);
    const stringA = columnsA.map(c => "".concat(c.name, "|").concat(c.label, "|").concat(c.width, "|").concat(c.canSort)).join(",");
    const stringB = columnsB.map(c => "".concat(c.name, "|").concat(c.label, "|").concat(c.width, "|").concat(c.canSort)).join(",");
    return stringA === stringB;
  }

  search(query) {
    this.query.setValue(query);
    this.reset();
    this.loadNextBatch();
  }

  updateRow(row) {
    const index = this.rows.getValue().findIndex(r => r.id === row.id);

    if (index > -1) {
      this.rows.getValue().splice(index, 1, row);
    }
  }

  selectRow(row) {
    if (!this.isSelectable.getValue()) {
      return;
    }

    this.selectedRowsMap.set(row.id, row);
    this.selectedRows.setValue(this.getSelectedRows());
  }

  deselectRow(row) {
    if (!this.isSelectable.getValue()) {
      return;
    }

    this.selectedRowsMap.delete(row.id);
    this.selectedRows.setValue(this.getSelectedRows());
  }

  deselectAllRows() {
    if (!this.isSelectable.getValue()) {
      return;
    }

    this.selectedRowsMap.clear();
    this.selectedRows.setValue(this.getSelectedRows());
  }

  selectedAllRows() {
    if (!this.isSelectable.getValue()) {
      return;
    }

    this.rows.getValue().forEach(row => {
      this.selectedRowsMap.set(row.id, row);
    });
    this.selectedRows.setValue(this.getSelectedRows());
  }

  getSelectedRows() {
    return Array.from(this.selectedRowsMap.values());
  }

  isRowSelected(row) {
    return this.selectedRowsMap.has(row.id);
  }

  setSort(name, direction) {
    const sorting = this.sorting.getValue().slice();
    const index = sorting.findIndex(sort => {
      return sort.name === name;
    });

    if (index > -1) {
      sorting.splice(index, 1, {
        name,
        direction
      });
    } else {
      sorting.push({
        name,
        direction
      });
    }

    this.sorting.setValue(sorting);
    this.reset();
    this.loadNextBatch();
  }

  removeSortByName(name) {
    const sorting = this.sorting.getValue();
    const index = sorting.findIndex(sort => {
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
    this.rows.reset();
    this.isFinishedLoading.setValue(false);
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

  enableSelection() {
    if (!this.isSelectable.getValue()) {
      this.isSelectable.setValue(true);
    }
  }

  disableSelection() {
    if (this.isSelectable.getValue()) {
      this.deselectAllRows();
      this.isSelectable.setValue(false);
    }
  }

  dispose() {
    this.rows.dispose();
    this.action.dispose();
    this.query.dispose();
    this.columns.dispose();
    this.sorting.dispose();
    this.actions.dispose();
    this.selectedRows.dispose();
    this.isFinishedLoading.dispose();
    this.isSelectable.dispose();
    this.isSelectable.dispose();
  }

}

exports.default = TableMediator;