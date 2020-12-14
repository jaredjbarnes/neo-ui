"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _TableDataScroller = _interopRequireDefault(require("./TableDataScroller"));

var _TableActions = _interopRequireDefault(require("./TableActions"));

var _useActions = _interopRequireDefault(require("../../mediators/table/hooks/useActions"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _useValue = require("../../utils/hooks/useValue");

var _TableSearch = require("./TableSearch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _reactJss.createUseStyles)({
  tableLayout: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "100% 0px",
    gridTemplateRows: "0px 0px 100%",
    minWidth: "400px",
    minHeight: "400px"
  },
  display: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 3,
    gridRowEnd: 3,
    width: "100%",
    height: "100%"
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 3,
    gridRowEnd: 3
  }
});

function TableLayout(_ref) {
  let {
    style,
    className,
    onRowClick
  } = _ref;
  const classes = useStyles();
  const table = (0, _useTable.default)();
  const actions = (0, _useActions.default)();
  const isSelectable = (0, _useValue.useValue)(table.isSelectable);
  const isSearchable = (0, _useValue.useValue)(table.isSearchable);
  const showActions = actions.length > 0 && isSelectable;
  const gridStyles = {
    gridTemplateColumns: "100% 0px",
    gridTemplateRows: "0px 0px 100%"
  };

  if (showActions) {
    gridStyles.gridTemplateColumns = "auto 125px";
  }

  if (isSearchable) {
    gridStyles.gridTemplateRows = "35px 16px auto";
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _joinClassNames.default)(classes.tableLayout, className),
    style: _objectSpread(_objectSpread({}, style), gridStyles)
  }, isSearchable && /*#__PURE__*/_react.default.createElement(_TableSearch.TableSearch, null), /*#__PURE__*/_react.default.createElement(_TableDataScroller.default, {
    className: classes.display,
    onRowClick: onRowClick
  }), showActions && /*#__PURE__*/_react.default.createElement(_TableActions.default, {
    className: classes.actions
  }));
}

var _default = TableLayout;
exports.default = _default;