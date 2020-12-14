"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Handle = _interopRequireDefault(require("../layouts/window/Handle"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: "Handle",
  component: _Handle.default
};
exports.default = _default;

function Baseline() {
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Handle.default, {
    style: {
      width: "400px",
      height: "35px"
    }
  }));
}