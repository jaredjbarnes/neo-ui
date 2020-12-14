"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _Button = _interopRequireDefault(require("./Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  handleContainer: {
    display: "flex",
    cursor: "move",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35px",
    borderTopRightRadius: "6px",
    borderTopLeftRadius: "6px",
    background: "repeating-linear-gradient(\n        rgba(190, 200, 215, 0),\n        rgba(190, 200, 215, 0) 4px,\n        rgba(190, 200, 215, 1) 5px\n      ),\n      repeating-linear-gradient(\n        rgba(255, 255, 255, 1),\n        rgba(255, 255, 255, 0) 2px,\n        rgba(255, 255, 255, 0) 5px\n      )"
  },
  handleLabel: {
    backgroundColor: "#ecf0f3",
    borderRadius: "10px",
    height: "22px",
    color: "rgba(100, 110, 140, 0.9)",
    fontSize: "14px",
    fontFamily: "Verdana, Geneva, sans-serif",
    lineHeight: "18px",
    padding: "0px 18px",
    border: "2px ridge rgba(255, 255, 255, 0.15)",
    boxSizing: "border-box",
    userSelect: "none"
  },
  leftHandleOptions: {
    padding: "0px 12px",
    width: "15px"
  },
  rightHandleOptions: {
    padding: "0px 12px",
    height: "15px",
    boxSizing: "border-box"
  }
});

const Handle = (_ref) => {
  let {
    name,
    style,
    className
  } = _ref;
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    style: style,
    className: (0, _joinClassNames.default)(classes.handleContainer, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.leftHandleOptions
  }), typeof name === "string" && name.length > 0 ? /*#__PURE__*/_react.default.createElement("div", {
    className: classes.handleLabel
  }, name) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.rightHandleOptions
  }, /*#__PURE__*/_react.default.createElement(_Button.default, null)));
};

var _default = Handle;
exports.default = _default;