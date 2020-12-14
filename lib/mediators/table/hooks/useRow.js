"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _RowProvider = require("../RowProvider");

function useRow() {
  (0, _react.useContext)(_RowProvider.RowContext);
}

var _default = useRow;
exports.default = _default;