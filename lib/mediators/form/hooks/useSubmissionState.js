"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useForm = _interopRequireDefault(require("./useForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useSubmissionState = () => {
  const form = (0, _useForm.default)();
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(form.getIsSubmitting());
  const subscription = (0, _react.useMemo)(() => {
    return form.onSubmissionChange(isSubmitting => {
      setIsSubmitting(isSubmitting);
    });
  }, [form]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return isSubmitting;
};

var _default = useSubmissionState;
exports.default = _default;