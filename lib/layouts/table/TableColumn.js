"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _useColumnSortDirection = _interopRequireDefault(require("../../mediators/table/hooks/useColumnSortDirection"));

var _Surface = _interopRequireDefault(require("../../core/Surface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _reactJss.createUseStyles)({
  columnContainer: {
    borderRadius: "6px",
    position: "relative",
    textAlign: "center",
    lineHeight: "25px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "rgba(100, 110, 140, 0.8)",
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "12px",
    padding: "0px 8px",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden"
  }
});

const TableColumn = (_ref) => {
  let {
    column,
    children,
    style,
    className
  } = _ref;
  const classes = useStyles();
  const table = (0, _useTable.default)();
  const [state, setState] = (0, _react.useState)("flat");
  const direction = (0, _useColumnSortDirection.default)(column.name);

  const press = () => {
    if (!column.canSort) {
      return;
    }

    setState("inset");
  };

  const release = () => {
    if (!column.canSort) {
      return;
    }

    setState("flat");
  };

  const toggleSortDirection = () => {
    if (!column.canSort) {
      return;
    }

    if (direction === "ASC") {
      table.setSort(column.name, "DESC");
    } else {
      table.setSort(column.name, "ASC");
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    onMouseDown: press,
    onMouseUp: release,
    onMouseLeave: release,
    mode: state,
    onClick: toggleSortDirection,
    style: _objectSpread({}, style),
    className: (0, _joinClassNames.default)(classes.columnContainer, className),
    insetOffset: 2,
    insetSpread: 4,
    raisedOffset: 2,
    raisedSpread: 4
  }, children);
};

var _default = TableColumn;
exports.default = _default;