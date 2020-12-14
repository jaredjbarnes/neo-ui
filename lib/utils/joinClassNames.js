"use strict";

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const joinClassNames = function joinClassNames() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  const className = args.map(a => a === null || a === void 0 ? void 0 : a.trim()).filter(a => a != null).join(" ");
  return className;
};

var _default = joinClassNames;
exports.default = _default;