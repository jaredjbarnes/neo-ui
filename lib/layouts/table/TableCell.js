"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _reactJss.createUseStyles)({
  tableCell: {
    position: "relative",
    textAlign: "center",
    lineHeight: "40px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "rgba(100, 110, 140, 0.8)",
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "0px 8px"
  }
});

const TableCell = (_ref) => {
  let {
    column,
    children,
    style,
    className
  } = _ref;
  const styleOverrides = {
    textAlign: column.alignment
  };
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, style), styleOverrides),
    className: (0, _joinClassNames.default)(classes.tableCell, className)
  }, children);
};

var _default = TableCell;
exports.default = _default;