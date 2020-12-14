"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useTable = _interopRequireDefault(require("./useTable"));

var _useAsyncStatus = require("../../../utils/hooks/useAsyncStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useTableStatus = () => {
  return (0, _useAsyncStatus.useAsyncStatus)((0, _useTable.default)().rows);
};

var _default = useTableStatus;
exports.default = _default;