"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.AddAndRemovePortals = AddAndRemovePortals;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Portal = _interopRequireDefault(require("../layouts/Portal"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  title: "Portal",
  component: _Portal.default,
  argTypes: {
    color: {
      control: "color"
    }
  }
};
exports.default = _default;

function Baseline(props) {
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Portal.default, null, /*#__PURE__*/_react.default.createElement("span", null, "I'm in another world")), /*#__PURE__*/_react.default.createElement(_Portal.default, null, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      position: "absolute",
      top: "100px"
    }
  }, "I'm in another world too!")))));
}

function AddAndRemovePortals(props) {
  const [isOpen, setIsOpen] = (0, _react.useState)(false);

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: show
  }, "Show"), /*#__PURE__*/_react.default.createElement("div", null, isOpen && /*#__PURE__*/_react.default.createElement(_Portal.default, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: hide
  }, "Hide")))));
}