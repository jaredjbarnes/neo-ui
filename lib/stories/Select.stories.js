"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("../inputs/select/Select"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  title: "Select",
  component: _Select.default,
  argTypes: {}
};
exports.default = _default;

function Baseline(props) {
  const options = [{
    id: "1",
    label: "First Option",
    value: "1"
  }, {
    id: "2",
    label: "Second Option",
    value: "2"
  }, {
    id: "3",
    label: "Third Option",
    value: "3"
  }, {
    id: "4",
    label: "Fourth Option",
    value: "4"
  }, {
    id: "5",
    label: "Fifth Option",
    value: "5"
  }, {
    id: "6",
    label: "Sixth Option",
    value: "6"
  }, {
    id: "7",
    label: "Seventh Option",
    value: "7"
  }];
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Select.default, _extends({}, props, {
    options: options
  })));
}