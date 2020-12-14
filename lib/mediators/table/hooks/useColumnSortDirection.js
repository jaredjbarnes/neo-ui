"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useTable = _interopRequireDefault(require("./useTable"));

var _useValue = require("../../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useColumnSortDirection = name => {
  var _sorting$find;

  const table = (0, _useTable.default)();
  const sorting = (0, _useValue.useValue)(table.sorting);
  return ((_sorting$find = sorting.find(c => c.name === name)) === null || _sorting$find === void 0 ? void 0 : _sorting$find.direction) || "ASC";
};

var _default = useColumnSortDirection;
exports.default = _default;