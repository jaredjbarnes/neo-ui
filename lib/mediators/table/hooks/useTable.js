"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _TableProvider = require("../TableProvider");

const useTable = () => {
  return (0, _react.useContext)(_TableProvider.TableContext);
};

var _default = useTable;
exports.default = _default;