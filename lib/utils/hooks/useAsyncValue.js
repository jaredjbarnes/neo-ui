"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncValue = useAsyncValue;

var _useValue = require("./useValue");

function useAsyncValue(asyncActionRunner) {
  return (0, _useValue.useValue)(asyncActionRunner);
}