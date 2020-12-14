"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  title: "Surface",
  component: _Surface.default,
  argTypes: {
    mode: {
      control: {
        type: "inline-radio",
        options: ["flat", "raised", "inset", "cutOut", "popOut"]
      }
    },
    highlightColor: {
      control: "color"
    },
    shadowColor: {
      control: "color"
    }
  },
  args: {
    mode: "raised"
  }
};
exports.default = _default;
const useStyles = (0, _reactJss.createUseStyles)({
  circle: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "100px"
  },
  roundedSquare: {
    height: "100px",
    width: "100px",
    borderRadius: "8px",
    textAlign: "center",
    lineHeight: "100px",
    border: "2px ridge rgba(255, 255, 255, 0.15)"
  },
  outerSurface: {
    height: "36px",
    width: "175px",
    borderRadius: "18px",
    textAlign: "center",
    lineHeight: "100px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "left"
  },
  innerSurface: {
    position: "relative",
    height: "30px",
    width: "130px",
    borderRadius: "15px",
    textAlign: "center",
    lineHeight: "100px",
    marginLeft: "3px",
    color: "rgba(126, 134, 168, 0.9)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)"
  },
  icon: {
    marginLeft: "6px",
    color: "rgba(126, 134, 168, 0.9)"
  },
  input: {
    outline: "none",
    border: 0,
    backgroundColor: "transparent",
    padding: "0px 12px",
    width: "100%",
    height: "100%",
    color: "rgba(126, 134, 168, 0.9)"
  },
  big: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  small: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  smallest: {
    width: "30px",
    height: "30px",
    borderRadius: "4px"
  }
});

function Baseline(props) {
  const classes = useStyles();
  const isDefault = props.mode == null || props.mode === "flat";
  let inverseMode = props.mode === "raised" ? "inset" : "raised";
  inverseMode = isDefault ? "flat" : inverseMode;
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Surface.default, _extends({
    className: classes.circle
  }, props)), /*#__PURE__*/_react.default.createElement(_Surface.default, _extends({
    className: classes.roundedSquare
  }, props)), /*#__PURE__*/_react.default.createElement(_Surface.default, _extends({
    className: classes.outerSurface
  }, props, {
    mode: "raised"
  }), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.innerSurface,
    mode: "inset",
    insetOffset: 3,
    insetSpread: 5
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: classes.input
  })), /*#__PURE__*/_react.default.createElement(_Search.default, {
    className: classes.icon
  })), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.big,
    mode: props.mode
  }, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.small,
    mode: inverseMode
  }, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.smallest,
    mode: props.mode
  }))));
}