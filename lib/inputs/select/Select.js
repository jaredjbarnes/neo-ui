"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SelectProvider = _interopRequireDefault(require("../../mediators/select/SelectProvider"));

var _SelectOptions = _interopRequireDefault(require("./SelectOptions"));

var _SelectButton = _interopRequireDefault(require("./SelectButton"));

var _useForkRef = _interopRequireDefault(require("../../core/hooks/useForkRef"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  button: {
    width: "100%"
  },
  container: {
    width: "200px",
    height: "35px"
  }
});

function Select(_ref) {
  let {
    options,
    selectRef,
    style,
    className,
    dropDownWidth,
    dropDownHeight,
    value
  } = _ref;
  const classes = useStyles();
  const buttonRef = (0, _react.useRef)(null);
  const ref = (0, _useForkRef.default)(selectRef, buttonRef);
  let selectedOption = null;

  if (Array.isArray(options)) {
    selectedOption = options.find(o => o.value === value) || null;
  }

  return /*#__PURE__*/_react.default.createElement(_SelectProvider.default, {
    options: options,
    selectedOption: selectedOption,
    dropDownWidth: dropDownWidth,
    dropDownHeight: dropDownHeight
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: style,
    className: (0, _joinClassNames.default)(classes.container, className)
  }, /*#__PURE__*/_react.default.createElement(_SelectButton.default, {
    innerRef: ref,
    className: classes.button
  }), /*#__PURE__*/_react.default.createElement(_SelectOptions.default, {
    anchorRef: buttonRef
  })));
}

var _default = Select;
exports.default = _default;