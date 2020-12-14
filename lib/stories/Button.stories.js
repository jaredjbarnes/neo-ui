"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../inputs/Button"));

var _OutlineButton = _interopRequireDefault(require("../inputs/OutlineButton"));

var _SolidButton = _interopRequireDefault(require("../inputs/SolidButton"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: "Button",
  component: _Button.default,
  argTypes: {
    color: {
      control: "color"
    }
  }
};
exports.default = _default;

function Baseline(props) {
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, props, "Save"), /*#__PURE__*/_react.default.createElement(_OutlineButton.default, props, "Save"), /*#__PURE__*/_react.default.createElement(_SolidButton.default, props, "Save"));
}