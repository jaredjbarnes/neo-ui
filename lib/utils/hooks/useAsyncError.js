"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncError = useAsyncError;

var _react = require("react");

function useAsyncError(asyncActionRunner) {
  const [value, setValue] = (0, _react.useState)(asyncActionRunner.getError());
  const subscription = (0, _react.useMemo)(() => {
    return asyncActionRunner.onError(value => {
      setValue(value);
    });
  }, [asyncActionRunner]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return value;
}