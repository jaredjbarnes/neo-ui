"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useForm = _interopRequireDefault(require("./useForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useField = name => {
  const form = (0, _useForm.default)();
  const field = form.getFieldByName(name);
  const [_, render] = (0, _react.useState)({});
  const timeoutRef = (0, _react.useRef)(-1);
  const formSubscription = (0, _react.useMemo)(() => {
    return form.onFieldsChange(event => {
      if (event.field.getName() === name) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          render({});
        });
      }
    });
  }, [form, name]);
  (0, _react.useEffect)(() => () => formSubscription.unsubscribe(), [formSubscription]);
  const fieldSubscription = (0, _react.useMemo)(() => {
    if (field != null) {
      return field.onChange(_ => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          render({});
        });
      });
    }

    return null;
  }, [field]);
  (0, _react.useEffect)(() => {
    if (fieldSubscription != null) {
      return () => {
        fieldSubscription.unsubscribe();
      };
    }
  }, [fieldSubscription]);
  return field;
};

var _default = useField;
exports.default = _default;