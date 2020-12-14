"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useForm = _interopRequireDefault(require("./useForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useValidationState = () => {
  const form = (0, _useForm.default)();
  const [isValidating, setIsValidating] = (0, _react.useState)(form.getIsValidating());
  const subscription = (0, _react.useMemo)(() => {
    return form.onValidationChange(isValidating => {
      setIsValidating(isValidating);
    });
  }, [form]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return isValidating;
};

var _default = useValidationState;
exports.default = _default;