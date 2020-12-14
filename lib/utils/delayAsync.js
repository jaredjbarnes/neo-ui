"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function delayAsync(milliseconds, value) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds, value);
  });
}

;
var _default = delayAsync;
exports.default = _default;