"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RowContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RowContext = /*#__PURE__*/_react.default.createContext({
  value: {},
  cells: [],
  id: "0"
});

exports.RowContext = RowContext;

function RowProvider(_ref) {
  let {
    row,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(RowContext.Provider, {
    value: row
  }, children);
}

var _default = RowProvider;
exports.default = _default;