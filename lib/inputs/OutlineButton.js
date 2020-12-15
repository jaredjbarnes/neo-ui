"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../inputs/Button"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _reactJss.createUseStyles)({
  outline: {
    border: " 2px solid rgba(30, 167, 253, 0.8)",
    width: "94px",
    height: "29px",
    boxSizing: "border-box",
    borderRadius: "15px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "33px",
    color: "rgba(30, 167, 253, 0.9)"
  }
});

const OutlineButton = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    color
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children", "color"]);

  const classes = useStyles();
  let outlineStyle = undefined;

  if (color != null) {
    outlineStyle = {
      border: "2px solid ".concat(color),
      color: color
    };
  }

  return /*#__PURE__*/_react.default.createElement(_Button.default, _extends({
    ref: ref
  }, props), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.outline,
    style: outlineStyle
  }, children));
});

var _default = OutlineButton;
exports.default = _default;