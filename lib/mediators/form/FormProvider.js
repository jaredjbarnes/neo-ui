"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _FormMediator = _interopRequireDefault(require("./FormMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultOnSubmit = () => {
  return Promise.resolve();
};

const defaultOnValidate = () => {
  return Promise.resolve();
};

const defaultOnChange = () => {};

const defaultOnInitialize = () => {};

const Context = /*#__PURE__*/_react.default.createContext(new _FormMediator.default());

exports.Context = Context;

const FormProvider = (_ref) => {
  let {
    children,
    onValidate,
    onSubmit,
    onChange,
    onInitialize
  } = _ref;
  const validation = onValidate != null ? onValidate : defaultOnValidate;
  const submission = onSubmit != null ? onSubmit : defaultOnSubmit;
  const change = onChange != null ? onChange : defaultOnChange;
  const initialize = onInitialize != null ? onInitialize : defaultOnInitialize;
  const formMediator = (0, _react.useMemo)(() => {
    return new _FormMediator.default();
  }, []);
  (0, _react.useEffect)(() => () => formMediator.dispose(), [formMediator]);
  (0, _react.useEffect)(() => {
    formMediator.setValidation(validation);
  }, [formMediator, validation]);
  (0, _react.useEffect)(() => {
    formMediator.setSubmission(submission);
  }, [formMediator, submission]);
  (0, _react.useEffect)(() => {
    initialize(formMediator);
  }, [formMediator, initialize]);
  const subscription = (0, _react.useMemo)(() => {
    return formMediator.onChange(change);
  }, [formMediator, change]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: formMediator
  }, children);
};

var _default = FormProvider;
exports.default = _default;