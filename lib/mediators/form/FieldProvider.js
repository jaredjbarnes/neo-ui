"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useForm = _interopRequireDefault(require("./hooks/useForm"));

var _FieldMediator = _interopRequireDefault(require("./FieldMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Context = /*#__PURE__*/_react.default.createContext(new _FieldMediator.default());

exports.Context = Context;

function FieldProvider(_ref) {
  let {
    children,
    initialValue,
    name,
    label,
    message
  } = _ref;
  const formMediator = (0, _useForm.default)();
  const fieldMediator = (0, _react.useMemo)(() => {
    const fieldMediator = new _FieldMediator.default();
    fieldMediator.setName(name);
    fieldMediator.setLabel(label);
    fieldMediator.setInitialValue(initialValue);
    fieldMediator.setValue(initialValue);
    fieldMediator.setMessage(message);
    return fieldMediator;
  }, [initialValue, name, label, message]);
  (0, _react.useEffect)(() => {
    formMediator.addField(fieldMediator);
    return () => {
      formMediator.removeField(fieldMediator);
      fieldMediator.dispose();
    };
  }, [formMediator, fieldMediator]);
  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: fieldMediator
  }, children);
}

var _default = FieldProvider;
exports.default = _default;