"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function useForkRef() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return obj => {
    args.forEach(ref => {
      if (typeof ref === "function") {
        ref(obj);
      } else if (typeof ref === "object" && ref != null && ref.hasOwnProperty("current")) {
        ref.current = obj;
      }
    });
  };
}

var _default = useForkRef;
exports.default = _default;