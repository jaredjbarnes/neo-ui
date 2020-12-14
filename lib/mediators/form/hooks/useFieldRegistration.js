"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useForm = _interopRequireDefault(require("./useForm"));

var _FieldMediator = _interopRequireDefault(require("../FieldMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useFieldRegistration(_ref) {
  let {
    name,
    label,
    initialValue
  } = _ref;
  const form = (0, _useForm.default)();
  const [_, render] = (0, _react.useState)({});
  let field = form.getFieldByName(name);

  if (field == null) {
    field = new _FieldMediator.default();
    field.setName(name);
    field.setLabel(label || "");
    field.setInitialValue(typeof initialValue === "undefined" ? null : initialValue);
    form.addField(field);
  }

  const changeSubscription = (0, _react.useMemo)(() => {
    return field.onChange(() => {
      render({});
    });
  }, [field]);
  (0, _react.useEffect)(() => () => changeSubscription.unsubscribe(), [changeSubscription]);
  return field;
}

var _default = useFieldRegistration;
exports.default = _default;