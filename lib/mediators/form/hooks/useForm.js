"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _FormProvider = require("../FormProvider");

const useForm = () => {
  return (0, _react.useContext)(_FormProvider.Context);
};

var _default = useForm;
exports.default = _default;