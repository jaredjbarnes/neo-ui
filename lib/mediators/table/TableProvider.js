"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TableContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _TableMediator = _interopRequireDefault(require("./TableMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultTableMediator = new _TableMediator.default();

const TableContext = /*#__PURE__*/_react.default.createContext(defaultTableMediator);

exports.TableContext = TableContext;

function TableProvider(_ref) {
  let {
    columns,
    onLoad,
    children,
    actions,
    onSelectionChange,
    isSelectable,
    isSearchable
  } = _ref;
  const selectable = typeof isSelectable === "boolean" ? isSelectable : false;
  const searchable = typeof isSearchable === "boolean" ? isSearchable : false;
  const tableMediator = (0, _react.useMemo)(() => {
    return new _TableMediator.default();
  }, []);
  (0, _react.useEffect)(() => {
    tableMediator.setColumns(columns);
  }, [tableMediator, columns]);
  (0, _react.useEffect)(() => {
    if (Array.isArray(actions)) {
      tableMediator.setActions(actions);
    }
  }, [tableMediator, actions]);
  (0, _react.useEffect)(() => {
    tableMediator.setOnLoad(onLoad);
  }, [tableMediator, onLoad]);
  (0, _react.useEffect)(() => {
    tableMediator.isSelectable.setValue(selectable);
  }, [tableMediator, selectable]);
  (0, _react.useEffect)(() => {
    tableMediator.isSearchable.setValue(searchable);
  }, [tableMediator, searchable]);
  (0, _react.useEffect)(() => {
    // This will load the first page on mount.
    tableMediator.loadNextBatch();
  }, [tableMediator]);
  (0, _react.useEffect)(() => {
    if (typeof onSelectionChange === "function") {
      const subscription = tableMediator.rows.onChange(rows => {
        onSelectionChange(rows, tableMediator);
      });
      return () => subscription.unsubscribe();
    }
  }, [onSelectionChange]);
  (0, _react.useEffect)(() => () => tableMediator.dispose(), [tableMediator]);
  return /*#__PURE__*/_react.default.createElement(TableContext.Provider, {
    value: tableMediator
  }, children);
}

var _default = TableProvider;
exports.default = _default;