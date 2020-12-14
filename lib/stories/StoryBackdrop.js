"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  container: {
    backgroundColor: "#ecf0f3",
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    minHeight: "400px",
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

const StoryBackdrop = (_ref) => {
  let {
    children
  } = _ref;
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.container
  }, children);
};

var _default = StoryBackdrop;
exports.default = _default;