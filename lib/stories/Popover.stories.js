"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Popover = _interopRequireDefault(require("../core/popover/Popover"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

var _SolidButton = _interopRequireDefault(require("../inputs/SolidButton"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

var _ClickAwayListener = _interopRequireDefault(require("../core/ClickAwayListener"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  menu: {
    width: "125px",
    height: "200px",
    borderRadius: "4px"
  }
});
var _default = {
  title: "Popover",
  component: _Popover.default
};
exports.default = _default;

function Baseline(props) {
  const classes = useStyles();
  const [clickOpen, setClickOpen] = (0, _react.useState)(false);
  const buttonRef = (0, _react.useRef)(null);

  const openMenu = () => {
    setClickOpen(true);
  };

  const closeMenu = () => {
    setClickOpen(false);
  };

  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Popover.default, {
    open: clickOpen,
    anchorRef: buttonRef,
    placement: {
      horizontal: "left",
      vertical: "bottom"
    }
  }, /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: closeMenu
  }, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    mode: "popOut",
    className: classes.menu,
    raisedOffset: 2
  }))), /*#__PURE__*/_react.default.createElement(_SolidButton.default, {
    ref: buttonRef,
    onClick: openMenu
  }, "Open"));
}