"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Surface = _interopRequireWildcard(require("../core/Surface"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

var _reactMotionUx = require("react-motion-ux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  raised: {
    transform: "scale(1)"
  },
  inset: {
    transform: "scale(0.96)"
  },
  flat: {
    transform: "scale(1)"
  }
}, 500);
const useStyles = (0, _reactJss.createUseStyles)({
  container: {
    position: "relative",
    display: "inline-block",
    borderRadius: "18px",
    height: "35px",
    width: "100px",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "16px",
    userSelect: "none",
    color: "rgba(0, 0, 0, 0.6)",
    cursor: "pointer",
    outlineStyle: "none",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
});

const Button = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, ["children", "className"]);

  const [state, setState] = (0, _react.useState)("flat");
  const [isFocused, setIsFocused] = (0, _react.useState)(false);
  const contentRef = useStyledTransition(state);
  const classes = useStyles();
  const [duration, setDuration] = (0, _react.useState)(2000);

  const returnToNormal = () => {
    if (isFocused) {
      setState("raised");
    } else {
      setState("flat");
    }
  };

  const onMouseDown = event => {
    if (typeof props.onMouseDown === "function") {
      props.onMouseDown(event);
    }

    setState("inset");
    setDuration(1000);
  };

  const onMouseUp = event => {
    if (typeof props.onMouseUp === "function") {
      props.onMouseUp(event);
    }

    returnToNormal();
    setDuration(1000);
  };

  const onMouseEnter = event => {
    if (typeof props.onMouseEnter === "function") {
      props.onMouseEnter(event);
    }

    setState("raised");
    setDuration(1250);
  };

  const onMouseLeave = event => {
    if (typeof props.onMouseLeave === "function") {
      props.onMouseLeave(event);
    }

    returnToNormal();
    setDuration(1250);
  };

  const onFocus = event => {
    if (typeof props.onFocus === "function") {
      props.onFocus(event);
    }

    if (state === "flat") {
      setState("raised");
    }

    setDuration(1000);
    setIsFocused(true);
  };

  const onBlur = event => {
    if (typeof props.onBlur === "function") {
      props.onBlur(event);
    }

    setState("flat");
    setDuration(1250);
    setIsFocused(false);
  };

  const onKeyDown = event => {
    if (event.key === "Enter") {
      setState("inset");
    }
  };

  const onKeyUp = event => {
    if (event.key === "Enter") {
      returnToNormal();
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Surface.default, _extends({
    ref: ref,
    raisedOffset: 4,
    raisedSpread: 7,
    className: (0, _joinClassNames.default)(className, classes.container)
  }, props, {
    mode: state,
    transitionDuration: duration,
    onKeyUp: onKeyUp,
    onKeyDown: onKeyDown,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onMouseLeave: onMouseLeave,
    onMouseEnter: onMouseEnter,
    onFocus: onFocus,
    onBlur: onBlur,
    tabIndex: 0
  }), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.content
  }, children));
});

var _default = Button;
exports.default = _default;