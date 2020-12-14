"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useTableStatus = _interopRequireDefault(require("../../mediators/table/hooks/useTableStatus"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _useIsTableFinishedLoading = _interopRequireDefault(require("../../mediators/table/hooks/useIsTableFinishedLoading"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  tableStatusContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    height: "34px",
    minWidth: "100%",
    backgroundColor: "#ecf0f3",
    borderTop: "2px ridge rgba(255, 255, 255, 0.25)",
    fontSize: "10px",
    color: "rgba(100, 110, 140, 0.8)",
    fontFamily: "Verdana, Geneva, sans-serif"
  },
  status: {
    paddingLeft: "4px",
    userSelect: "none"
  },
  loaded: {
    paddingRight: "4px",
    userSelect: "none"
  }
});
const textMap = {
  initial: "Idle",
  success: "Idle",
  disabled: "Disabled",
  pending: "Loading",
  error: "Error"
};

const TableStatus = (_ref) => {
  let {
    className,
    style
  } = _ref;
  const classes = useStyles();
  const state = (0, _useTableStatus.default)();
  const table = (0, _useTable.default)();
  const isFinished = (0, _useIsTableFinishedLoading.default)();
  const status = isFinished ? "Complete" : textMap[state];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _joinClassNames.default)(classes.tableStatusContainer, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: classes.status
  }, "Status: ", status), /*#__PURE__*/_react.default.createElement("span", {
    className: classes.loaded
  }, "Loaded: ", table.getLoadedRowsLength()));
};

var _default = TableStatus;
exports.default = _default;