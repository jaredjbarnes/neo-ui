"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Switch = _interopRequireDefault(require("./Switch"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _reactJss.createUseStyles)({
  switchFieldContainer: {
    display: "inline-grid",
    gridTemplateColumns: "auto 70px",
    gridTemplateRows: "100%",
    gridGap: "3px",
    height: "35px",
    width: "200px"
  },
  switch: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1
  },
  label: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    lineHeight: "35px",
    paddingLeft: "4px",
    color: "rgba(100, 110, 140, 0.85)",
    width: "100%",
    height: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    userSelect: "none"
  }
});

const SwitchField = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    name,
    checked,
    className,
    style
  } = _ref,
      props = _objectWithoutProperties(_ref, ["name", "checked", "className", "style"]);

  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: (0, _joinClassNames.default)(classes.switchFieldContainer, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.label
  }, name), /*#__PURE__*/_react.default.createElement(_Switch.default, _extends({
    className: classes.switch,
    checked: checked
  }, props)));
});

var _default = SwitchField;
exports.default = _default;