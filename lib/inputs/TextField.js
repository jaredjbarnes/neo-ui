"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextInput = _interopRequireDefault(require("./TextInput"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _reactJss.createUseStyles)({
  textFieldContainer: {
    display: "inline-grid",
    gridTemplateColumns: "auto 0px 0px",
    gridTemplateRows: "24px 35px",
    height: "70px",
    width: "200px"
  },
  // div
  label: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 1,
    gridRowEnd: 1,
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    lineHeight: "24px",
    paddingLeft: "4px",
    color: "rgba(100, 110, 140, 0.85)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  // div
  textInput: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: 2,
    width: "100%"
  },
  // Text Input
  ErrorIcon: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 2,
    gridRowEnd: 2
  },
  // div
  infoIcon: {
    gridColumnStart: 3,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 2
  } // div

});

const TextField = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  let {
    name,
    value,
    style,
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, ["name", "value", "style", "className"]);

  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: (0, _joinClassNames.default)(classes.textFieldContainer, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.label
  }, name), /*#__PURE__*/_react.default.createElement(_TextInput.default, _extends({
    className: classes.textInput,
    value: value
  }, props)));
});

var _default = TextField;
exports.default = _default;