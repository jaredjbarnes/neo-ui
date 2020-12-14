"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useForm = _interopRequireDefault(require("./useForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useSubmissionError = () => {
  const form = (0, _useForm.default)();
  const [submissionError, setSubmissionError] = (0, _react.useState)(form.getSubmissionError());
  const subscription = (0, _react.useMemo)(() => {
    return form.onSubmissionError(submissionError => {
      setSubmissionError(submissionError);
    });
  }, [form]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return submissionError;
};

var _default = useSubmissionError;
exports.default = _default;