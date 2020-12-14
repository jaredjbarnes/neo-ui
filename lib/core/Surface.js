"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJss = require("react-jss");

var _reactMotionUx = require("react-motion-ux");

var _ColorConverter = _interopRequireDefault(require("../utils/ColorConverter"));

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const colorConverter = new _ColorConverter.default();

function resolveHighlightColor(color) {
  color = color || "rgba(255,255,255,1)";
  const convertedColor = colorConverter.convertToRgba(color) || color;
  return convertedColor;
}

function resolveShadowColor(color) {
  color = color || "rgba(190,200,215,1)";
  const convertedColor = colorConverter.convertToRgba(color) || color;
  return convertedColor;
}

const useStyles = (0, _reactJss.createUseStyles)({
  container: {
    display: "inline-block",
    boxSizing: "border-box",
    backgroundColor: "#ecf0f3"
  }
});
const useStyledTransition = (0, _reactMotionUx.makeStyledTransition)((_ref) => {
  let {
    highlightColor,
    shadowColor,
    fadedShadowColor,
    fadedHighlightColor,
    raisedOffset,
    raisedSpread,
    insetOffset,
    insetSpread
  } = _ref;
  return {
    raised: {
      boxShadow: "-".concat(raisedOffset, "px -").concat(raisedOffset, "px ").concat(raisedSpread, "px 0px ").concat(highlightColor, ",\n      ").concat(raisedOffset, "px ").concat(raisedOffset, "px ").concat(raisedSpread, "px 0px ").concat(shadowColor, ",\n         inset -").concat(insetOffset, "px -").concat(insetOffset, "px ").concat(insetSpread, "px 0px ").concat(fadedHighlightColor, ",\n         inset ").concat(insetOffset, "px ").concat(insetOffset, "px ").concat(insetSpread, "px 0px ").concat(fadedShadowColor)
    },
    inset: {
      boxShadow: "-".concat(raisedOffset, "px -").concat(raisedOffset, "px ").concat(raisedSpread, "px 0px ").concat(fadedHighlightColor, ",\n      ").concat(raisedOffset, "px ").concat(raisedOffset, "px ").concat(raisedSpread, "px 0px ").concat(fadedShadowColor, ",\n         inset -").concat(insetOffset, "px -").concat(insetOffset, "px ").concat(insetSpread, "px 0px ").concat(highlightColor, ",\n         inset ").concat(insetOffset, "px ").concat(insetOffset, "px ").concat(insetSpread, "px 0px ").concat(shadowColor)
    },
    cutOut: {
      boxShadow: "-".concat(raisedOffset * 3, "px -").concat(raisedOffset * 3, "px ").concat(raisedSpread * 2, "px 0px ").concat(fadedHighlightColor, ",\n      ").concat(raisedOffset * 3, "px ").concat(raisedOffset * 3, "px ").concat(raisedSpread * 2, "px 0px ").concat(fadedShadowColor, ",\n      inset -").concat(insetOffset, "px -").concat(insetOffset, "px ").concat(insetSpread * 2, "px 0px ").concat(fadedHighlightColor, ",\n        inset ").concat(insetOffset, "px ").concat(insetOffset, "px ").concat(insetSpread, "px 1px ").concat(shadowColor)
    },
    popOut: {
      boxShadow: "".concat(raisedOffset * 3, "px ").concat(raisedOffset * 3, "px ").concat(raisedSpread * 2, "px 0px ").concat(fadedShadowColor, ",\n      ").concat(raisedOffset, "px ").concat(raisedOffset, "px ").concat(raisedSpread, "px 1px ").concat(shadowColor, ",\n      inset -").concat(insetOffset, "px -").concat(insetOffset, "px ").concat(insetSpread * 2, "px 0px ").concat(fadedHighlightColor, ",\n      inset ").concat(insetOffset, "px ").concat(insetOffset, "px ").concat(insetSpread * 2, "px 0px ").concat(fadedShadowColor)
    },
    flat: {
      boxShadow: "-".concat(raisedOffset * 3, "px -").concat(raisedOffset * 3, "px ").concat(raisedSpread * 2, "px 0px ").concat(fadedHighlightColor, ",\n      ").concat(raisedOffset * 3, "px ").concat(raisedOffset * 3, "px ").concat(raisedSpread * 2, "px 0px ").concat(fadedShadowColor, ",\n      inset -").concat(insetOffset, "px -").concat(insetOffset, "px ").concat(insetSpread * 2, "px 0px ").concat(fadedHighlightColor, ",\n      inset ").concat(insetOffset, "px ").concat(insetOffset, "px ").concat(insetSpread * 2, "px 0px ").concat(fadedShadowColor)
    }
  };
}, 1000);

const Surface = /*#__PURE__*/_react.default.forwardRef(function (_ref2, ref) {
  let {
    className,
    style,
    children,
    mode,
    highlightColor,
    shadowColor,
    raisedSpread,
    raisedOffset,
    insetSpread,
    insetOffset,
    transitionDuration
  } = _ref2,
      props = _objectWithoutProperties(_ref2, ["className", "style", "children", "mode", "highlightColor", "shadowColor", "raisedSpread", "raisedOffset", "insetSpread", "insetOffset", "transitionDuration"]);

  const classes = useStyles();
  highlightColor = resolveHighlightColor(highlightColor);
  shadowColor = resolveShadowColor(shadowColor);
  mode = mode == null ? "flat" : mode;
  raisedSpread = typeof raisedSpread === "number" ? raisedSpread : 15;
  raisedOffset = typeof raisedOffset === "number" ? raisedOffset : 10;
  insetSpread = typeof insetSpread === "number" ? insetSpread : 7;
  insetOffset = typeof insetOffset === "number" ? insetOffset : 4;
  const fadedHighlightColor = colorConverter.changeAlpha(highlightColor, 0);
  const fadedShadowColor = colorConverter.changeAlpha(shadowColor, 0);
  const containerRef = useStyledTransition(mode, {
    ref,
    duration: typeof transitionDuration === "number" ? transitionDuration : 700,
    props: {
      highlightColor,
      shadowColor,
      raisedSpread,
      raisedOffset,
      insetSpread,
      insetOffset,
      fadedHighlightColor,
      fadedShadowColor
    }
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    ref: containerRef,
    className: (0, _joinClassNames.default)(classes.container, className),
    style: style
  }), children);
});

var _default = Surface;
exports.default = _default;