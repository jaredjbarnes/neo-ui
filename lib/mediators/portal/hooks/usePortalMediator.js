"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _PortalProvider = require("../PortalProvider");

const usePortalMediator = () => {
  return (0, _react.useContext)(_PortalProvider.PortalContext);
};

var _default = usePortalMediator;
exports.default = _default;