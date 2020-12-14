"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncStatus = useAsyncStatus;

var _useValue = require("./useValue");

function useAsyncStatus(asyncActionRunner) {
  return (0, _useValue.useValue)(asyncActionRunner.status);
}