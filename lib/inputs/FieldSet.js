"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  fieldset: {
    border: "2px ridge rgba(255, 255, 255, 0.35)",
    borderRadius: "8px",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "16px",
    color: "rgba(100, 110, 140, 0.8)",
    padding: "24px"
  }
});

const FieldSet = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    name,
    className,
    style,
    children
  } = _ref;
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("fieldset", {
    ref: ref,
    className: (0, _joinClassNames.default)(classes.fieldset, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("legend", null, name), children);
});

var _default = FieldSet;
exports.default = _default;