"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useTable = _interopRequireDefault(require("./useTable"));

var _useValue = require("../../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useRows = () => {
  const table = (0, _useTable.default)();
  return (0, _useValue.useValue)(table.rows);
};

var _default = useRows;
exports.default = _default;