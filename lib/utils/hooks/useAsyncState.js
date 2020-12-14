"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncState = useAsyncState;

var _useAsyncValue = require("./useAsyncValue");

var _useAsyncError = require("./useAsyncError");

var _useAsyncStatus = require("./useAsyncStatus");

function useAsyncState(asyncActionRunner) {
  return {
    value: (0, _useAsyncValue.useAsyncValue)(asyncActionRunner),
    error: (0, _useAsyncError.useAsyncError)(asyncActionRunner),
    status: (0, _useAsyncStatus.useAsyncStatus)(asyncActionRunner)
  };
}