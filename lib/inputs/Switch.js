"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

var _reactMotionUx = require("react-motion-ux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useContainerStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  focused: {
    border: "2px ridge rgba(30, 167, 253, 0.5)"
  },
  normal: {
    border: "2px ridge rgba(255, 255, 255, 0.15)"
  }
}, 700);
const useOnStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  on: {
    color: "rgba(30, 167, 253, 0.9)"
  },
  off: {
    color: "rgba(30, 167, 253, 0)"
  }
}, 500);
const useOffStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  on: {
    color: "rgba(126, 134, 168, 0)"
  },
  off: {
    color: "rgba(126, 134, 168, 0.9)"
  }
}, 500);
const useHandleStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  on: {
    transform: "translate(36px, 4px)"
  },
  off: {
    transform: "translate(4px, 4px)"
  }
}, 500);
const useStyles = (0, _reactJss.createUseStyles)({
  switchContainer: {
    display: "inline-grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "100%",
    position: "relative",
    width: "70px",
    height: "36px",
    borderRadius: "8px",
    fontSize: "10px",
    fontFamily: "Verdana, Geneva, sans-serif",
    color: "rgba(126, 134, 168, 1)",
    border: "2px ridge rgba(30, 167, 253, 0.9)",
    boxSizing: "border-box",
    cursor: "pointer",
    outlineStyle: "none",
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  handle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "28px",
    height: "26px",
    transform: "translate(5px, 5px)",
    borderRadius: "4px",
    backgroundColor: "#ecf0f3"
  },
  topLeftTexture: {
    top: "6px",
    left: "6px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%"
  },
  topRightTexture: {
    top: "6px",
    right: "8px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%"
  },
  bottomLeftTexture: {
    bottom: "7px",
    right: "8px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%"
  },
  bottomRightTexture: {
    bottom: "7px",
    left: "6px",
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%"
  },
  off: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridRowStart: 1,
    gridRowEnd: 1,
    gridColumnStart: 2,
    gridColumnEnd: 2,
    textTransform: "uppercase",
    paddingRight: "2px",
    userSelect: "none"
  },
  on: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridRowStart: 1,
    gridRowEnd: 1,
    gridColumnStart: 1,
    gridColumnEnd: 1,
    textTransform: "uppercase",
    paddingLeft: "4px",
    userSelect: "none"
  }
});

const Switch = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  let {
    checked,
    onChange,
    className,
    style
  } = _ref;
  const classes = useStyles();
  const [isFocused, setIsFocused] = (0, _react.useState)("normal");
  const containerRef = useContainerStyledTransition(isFocused, {
    ref
  });
  const verifiedValue = typeof checked === "boolean" ? checked : false;
  const [isChecked, setIsChecked] = (0, _react.useState)(verifiedValue);
  (0, _react.useEffect)(() => {
    setIsChecked(verifiedValue);
  }, [verifiedValue]);
  const state = isChecked ? "on" : "off";
  const onRef = useOnStyledTransition(state);
  const offRef = useOffStyledTransition(state);
  const handleRef = useHandleStyledTransition(state);

  const toggle = event => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    if (typeof onChange === "function") {
      onChange(newValue, event);
    }
  };

  const onKeyDown = event => {
    if (event.key === "Enter") {
      toggle(event);
    }
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    onClick: toggle,
    onKeyDown: onKeyDown,
    ref: containerRef,
    mode: "inset",
    insetOffset: 2,
    insetSpread: 5,
    tabIndex: 0,
    onBlur: onBlur,
    onFocus: onFocus,
    className: (0, _joinClassNames.default)(classes.switchContainer, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.off,
    ref: offRef
  }, "Off"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.on,
    ref: onRef
  }, "On"), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.handle,
    ref: handleRef,
    mode: "raised",
    raisedOffset: 2,
    raisedSpread: 5
  }, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.topLeftTexture,
    mode: "raised",
    raisedOffset: 1,
    raisedSpread: 2
  }), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.topRightTexture,
    mode: "raised",
    raisedOffset: 1,
    raisedSpread: 2
  }), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.bottomLeftTexture,
    mode: "raised",
    raisedOffset: 1,
    raisedSpread: 2
  }), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.bottomRightTexture,
    mode: "raised",
    raisedOffset: 1,
    raisedSpread: 2
  })));
});

var _default = Switch;
exports.default = _default;