"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useTable = _interopRequireDefault(require("./useTable"));

var _useValue = require("../../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useIsTableFinishedLoading = () => {
  return (0, _useValue.useValue)((0, _useTable.default)().isFinishedLoading);
};

var _default = useIsTableFinishedLoading;
exports.default = _default;