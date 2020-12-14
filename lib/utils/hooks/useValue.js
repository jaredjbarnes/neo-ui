"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValue = useValue;

var _react = require("react");

function useValue(observableValue) {
  const [value, setValue] = (0, _react.useState)(observableValue.getValue());
  const subscription = (0, _react.useMemo)(() => {
    return observableValue.onChange(value => {
      setValue(value);
    });
  }, [observableValue]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return value;
}