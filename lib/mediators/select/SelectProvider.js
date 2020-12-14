"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useSelectMediator = exports.SelectContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SelectMediator = _interopRequireDefault(require("./SelectMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultSelectMediator = new _SelectMediator.default();

const SelectContext = /*#__PURE__*/_react.default.createContext(defaultSelectMediator);

exports.SelectContext = SelectContext;

const useSelectMediator = () => {
  return (0, _react.useContext)(SelectContext);
};

exports.useSelectMediator = useSelectMediator;

function SelectProvider(_ref) {
  let {
    children,
    dropDownHeight,
    dropDownWidth,
    selectedOption,
    options
  } = _ref;
  options = Array.isArray(options) ? options : [];
  const mediator = (0, _react.useMemo)(() => {
    return new _SelectMediator.default();
  }, []);
  (0, _react.useEffect)(() => () => mediator.dispose(), []);
  (0, _react.useEffect)(() => {
    if (typeof dropDownWidth === "number") {
      mediator.dropDownWidth.setValue(dropDownWidth);
    }
  }, [dropDownWidth]);
  (0, _react.useEffect)(() => {
    if (typeof dropDownHeight === "number") {
      mediator.dropDownHeight.setValue(dropDownHeight);
    }
  }, [dropDownHeight]);
  (0, _react.useEffect)(() => {
    if (typeof dropDownHeight === "number") {
      mediator.dropDownHeight.setValue(dropDownHeight);
    }
  }, [dropDownHeight]);
  (0, _react.useEffect)(() => {
    mediator.setOptions(options);
  }, [options]);
  (0, _react.useEffect)(() => {
    mediator.selectOption(selectedOption);
  }, [selectedOption]);
  return /*#__PURE__*/_react.default.createElement(SelectContext.Provider, {
    value: mediator
  }, children);
}

var _default = SelectProvider;
exports.default = _default;