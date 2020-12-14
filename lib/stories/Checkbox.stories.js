"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Checkbox = _interopRequireDefault(require("../inputs/Checkbox"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: "Checkbox",
  component: _Checkbox.default
};
exports.default = _default;

function Baseline(props) {
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Checkbox.default, null));
}