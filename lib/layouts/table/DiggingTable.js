"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiggingTable = DiggingTable;

var _react = _interopRequireDefault(require("react"));

var _TableProvider = _interopRequireDefault(require("../../mediators/table/TableProvider"));

var _TableLayout = _interopRequireDefault(require("./TableLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DiggingTable(_ref) {
  let {
    actions,
    onLoad,
    columns,
    onSelectionChange,
    onRowClick,
    style,
    className,
    isSelectable,
    isSearchable
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_TableProvider.default, {
    actions: actions,
    columns: columns,
    onLoad: onLoad,
    onSelectionChange: onSelectionChange,
    isSelectable: isSelectable,
    isSearchable: isSearchable
  }, /*#__PURE__*/_react.default.createElement(_TableLayout.default, {
    style: style,
    className: className,
    onRowClick: onRowClick
  }));
}