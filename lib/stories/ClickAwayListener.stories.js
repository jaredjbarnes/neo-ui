"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.WithPortal = WithPortal;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ClickAwayListener = _interopRequireDefault(require("../core/ClickAwayListener"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

var _Portal = _interopRequireDefault(require("../layouts/Portal"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  container: {
    width: "100px",
    height: "100px",
    border: "1px solid #000",
    backgroundColor: "red",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
var _default = {
  title: "ClickAwayListener",
  component: _ClickAwayListener.default,
  argTypes: {}
};
exports.default = _default;

function Baseline(props) {
  const classes = useStyles();
  const [state, setState] = (0, _react.useState)(0);

  const handler = () => {
    setState(prevState => {
      return prevState + 1;
    });
  };

  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: handler
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.container
  }, state)));
}

function WithPortal(props) {
  const classes = useStyles();
  const [open, setOpen] = (0, _react.useState)(false);

  const handler = () => {
    setOpen(false);
  };

  const openPopup = () => {
    setOpen(true);
  };

  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: openPopup
  }, "Open"), open && /*#__PURE__*/_react.default.createElement(_Portal.default, null, /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: handler
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.container
  }, "Hello World"))));
}