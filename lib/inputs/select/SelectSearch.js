"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJss = require("react-jss");

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _SelectProvider = require("../../mediators/select/SelectProvider");

var _useValue = require("../../utils/hooks/useValue");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  searchContainer: {
    display: "inline-grid",
    gridTemplateColumns: "auto 30px",
    height: "35px"
  },
  iconContainer: {
    display: "flex",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  inputContainer: {
    display: "flex",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  searchIcon: {
    color: "rgba(100, 110, 140, 0.8)"
  },
  input: {
    width: "100%"
  }
});

const SelectSearch = (_ref) => {
  let {
    style,
    className
  } = _ref;
  const classes = useStyles();
  const selectMediator = (0, _SelectProvider.useSelectMediator)();
  const keywords = (0, _useValue.useValue)(selectMediator.filterKeywords);
  const inputRef = (0, _react.useCallback)(element => {
    if (element != null) {
      element.focus();
    }
  }, []);

  const onValueChange = value => {
    selectMediator.filter(value);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    style: style,
    className: (0, _joinClassNames.default)(classes.searchContainer, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.inputContainer
  }, /*#__PURE__*/_react.default.createElement(_TextInput.default, {
    value: keywords,
    onValueChange: onValueChange,
    inputRef: inputRef,
    className: classes.input
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.iconContainer
  }, /*#__PURE__*/_react.default.createElement(_Search.default, {
    className: classes.searchIcon
  })));
};

var _default = SelectSearch;
exports.default = _default;