"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

var _reactJss = require("react-jss");

var _reactMotionUx = require("react-motion-ux");

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useContainerStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  focused: {
    border: "2px ridge rgba(30, 167, 253, 0.5)"
  },
  normal: {
    border: "2px ridge rgba(255, 255, 255, 0.15)"
  }
}, 700);
const useTextAreaHeight = (0, _reactMotionUx.makeStyledTransition)({
  true: {
    minHeight: "100px"
  },
  false: {
    minHeight: "35px"
  }
}, 700);
const useStyles = (0, _reactJss.createUseStyles)({
  inputContainer: {
    borderRadius: "8px",
    width: "150px",
    height: "35px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "2px ridge rgba(255, 255, 255, 0.15)",
    boxSizing: "border-box"
  },
  input: {
    outline: "none",
    border: 0,
    padding: "0px 8px",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    color: "rgba(100, 110, 140, 1)",
    "::placeholder": {
      color: "rgba(100, 110, 140, 0.3)"
    },
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "16px"
  },
  textarea: {
    outline: "none",
    border: 0,
    padding: "6px 8px",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    color: "rgba(100, 110, 140, 1)",
    "::placeholder": {
      color: "rgba(100, 110, 140, 0.3)"
    },
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "16px",
    resize: "none"
  }
});

const TextInput = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  let {
    value,
    onValueChange,
    className,
    style,
    inputRef,
    textareaRef,
    placeholder,
    large,
    disabled,
    inputProps,
    textareaProps
  } = _ref,
      props = _objectWithoutProperties(_ref, ["value", "onValueChange", "className", "style", "inputRef", "textareaRef", "placeholder", "large", "disabled", "inputProps", "textareaProps"]);

  const classes = useStyles();
  const [isFocused, setIsFocused] = (0, _react.useState)("normal");
  let containerRef = useContainerStyledTransition(isFocused, {
    ref
  });
  large = typeof large === "boolean" ? large : false;
  disabled = typeof disabled === "boolean" ? disabled : false;
  containerRef = useTextAreaHeight(large.toString(), {
    ref: containerRef
  });

  const onInputChangeWrapper = event => {
    if (typeof onValueChange === "function") {
      onValueChange(event.target.value, event);
    }
  };

  const onTextChangeWrapper = event => {
    if (typeof onValueChange === "function") {
      onValueChange(event.target.value, event);
    }
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  return /*#__PURE__*/_react.default.createElement(_Surface.default, _extends({
    ref: containerRef,
    className: (0, _joinClassNames.default)(classes.inputContainer, className),
    style: _objectSpread(_objectSpread({}, style), {}, {
      minHeight: large ? "100px" : "35px"
    }),
    mode: disabled ? "flat" : "inset",
    insetOffset: 3,
    insetSpread: 5
  }, props), !large && /*#__PURE__*/_react.default.createElement("input", _extends({
    type: "text",
    onFocus: onFocus,
    onBlur: onBlur,
    ref: inputRef,
    value: value,
    onChange: onInputChangeWrapper,
    placeholder: placeholder,
    disabled: disabled,
    className: classes.input
  }, inputProps)), large && /*#__PURE__*/_react.default.createElement("textarea", _extends({
    onFocus: onFocus,
    onBlur: onBlur,
    ref: textareaRef,
    value: value,
    onChange: onTextChangeWrapper,
    placeholder: placeholder,
    disabled: disabled,
    className: classes.textarea
  }, textareaProps)));
});

var _default = TextInput;
exports.default = _default;