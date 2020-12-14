"use strict";

require("core-js/modules/es.string.search");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableSearch = TableSearch;

var _react = _interopRequireWildcard(require("react"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _TextInput = _interopRequireDefault(require("../../inputs/TextInput"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  searchContainer: {
    display: "grid",
    gridTemplateColumns: "auto 30px",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%"
  },
  searchInput: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%"
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%"
  },
  searchIcon: {
    color: "rgba(100, 110, 140, 0.8)"
  }
});

function TableSearch() {
  const classes = useStyles();
  const table = (0, _useTable.default)();
  const inputRef = (0, _react.useRef)(null);

  const search = value => {
    if (inputRef.current != null) {
      table.search(value);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.searchContainer
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.searchIconContainer
  }, /*#__PURE__*/_react.default.createElement(_Search.default, {
    className: classes.searchIcon
  })), /*#__PURE__*/_react.default.createElement(_TextInput.default, {
    className: classes.searchInput,
    inputRef: inputRef,
    onValueChange: search
  }));
}