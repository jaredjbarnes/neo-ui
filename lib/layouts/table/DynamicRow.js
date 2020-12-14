"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicRow = DynamicRow;

var _react = _interopRequireDefault(require("react"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _reactJss.createUseStyles)({
  row: {
    display: "grid",
    width: "100%"
  }
});

function generateGridTemplateColumns(columnWidths) {
  return columnWidths.map(width => "".concat(width, "px")).join(" ") + " auto";
}

function getMinWidth(columnWidths) {
  return columnWidths.reduce((acc, width) => acc + width, 0);
}

function DynamicRow(_ref) {
  let {
    style,
    className,
    columnWidths,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, ["style", "className", "columnWidths", "children"]);

  const classes = useStyles();
  const gridTemplateColumns = generateGridTemplateColumns(columnWidths);
  const minWidth = getMinWidth(columnWidths);
  style = _objectSpread(_objectSpread({}, style), {}, {
    gridTemplateColumns,
    minWidth
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
    style: style,
    className: (0, _joinClassNames.default)(classes.row, className)
  }), children.map((child, index) => {
    var _child$props;

    const width = typeof columnWidths[index] === "number" ? "".concat(columnWidths[index], "px") : "0px";
    const gridColumnStart = index + 1;
    const gridColumnEnd = index + 1;

    const style = _objectSpread(_objectSpread({}, ((_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.style) || {}), {}, {
      width,
      gridColumnStart,
      gridColumnEnd
    });

    return /*#__PURE__*/_react.default.cloneElement(child, _objectSpread(_objectSpread({}, child.props), {}, {
      style
    }));
  }));
}