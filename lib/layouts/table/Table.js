"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = Table;

var _react = _interopRequireDefault(require("react"));

var _DiggingTable = require("./DiggingTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function onLoadGenerator(rows, columns) {
  return (_ref) => {
    var _rows$;

    let {
      query,
      sorting: sorts
    } = _ref;
    const filteredResults = rows.filter(row => {
      return row.cells.some(cell => {
        var _cell$value;

        return (_cell$value = cell.value) === null || _cell$value === void 0 ? void 0 : _cell$value.toString().toLowerCase().includes(query.toLowerCase());
      });
    });
    const cells = ((_rows$ = rows[0]) === null || _rows$ === void 0 ? void 0 : _rows$.cells) || [];
    const columnNameToIndexMap = cells.reduce((acc, column, index) => {
      acc[column.name] = index;
      return acc;
    }, {});
    filteredResults.sort((rowA, rowB) => {
      let score = 0;
      sorts.every(sort => {
        const columnName = sort.name;
        const direction = sort.direction === "ASC" ? 1 : -1;
        const columnA = rowA.cells[columnNameToIndexMap[columnName]].value || "";
        const columnB = rowB.cells[columnNameToIndexMap[columnName]].value || "";

        if (columnA < columnB) {
          score = -1 * direction;
          return false;
        } else if (columnA > columnB) {
          score = 1 * direction;
          return false;
        } else {
          return true;
        }
      });
      return score;
    });
    return Promise.resolve({
      data: filteredResults,
      isLast: true
    });
  };
}

function Table(_ref2) {
  let {
    rows,
    columns
  } = _ref2,
      props = _objectWithoutProperties(_ref2, ["rows", "columns"]);

  const onLoad = onLoadGenerator(rows, columns);
  return /*#__PURE__*/_react.default.createElement(_DiggingTable.DiggingTable, _extends({
    onLoad: onLoad,
    columns: columns
  }, props));
}