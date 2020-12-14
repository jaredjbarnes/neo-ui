"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useColumns = _interopRequireDefault(require("../../mediators/table/hooks/useColumns"));

var _useSelectedRows = _interopRequireDefault(require("../../mediators/table/hooks/useSelectedRows"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _TableColumn = _interopRequireDefault(require("./TableColumn"));

var _Surface = _interopRequireDefault(require("../../core/Surface"));

var _Checkbox = _interopRequireDefault(require("../../inputs/Checkbox"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _Button = _interopRequireDefault(require("../../inputs/Button"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _DynamicRow = require("./DynamicRow");

var _useValue = require("../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _reactJss.createUseStyles)({
  headerContainer: {
    position: "relative",
    height: "37px",
    minWidth: "100%",
    backgroundColor: "#ecf0f3",
    padding: "6px 0px"
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    padding: 0
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    padding: 0
  },
  actionsButton: {
    width: "25px",
    height: "25px",
    marginLeft: "5px"
  }
});

const TableHeader = (_ref) => {
  let {
    className,
    style
  } = _ref;
  const classes = useStyles();
  const table = (0, _useTable.default)();
  const columns = (0, _useColumns.default)();
  const selectedRows = (0, _useSelectedRows.default)();
  const isChecked = selectedRows.length > 0;
  const isSelectable = (0, _useValue.useValue)(table.isSelectable);

  const toggleSelection = () => {
    if (isChecked) {
      table.deselectAllRows();
    } else {
      table.selectedAllRows();
    }
  };

  const children = columns.map((column, index) => /*#__PURE__*/_react.default.createElement(_TableColumn.default, {
    column: column,
    key: index,
    style: {
      textAlign: column.alignment
    }
  }, column.label));
  const columnsWidths = columns.map(column => column.width);

  if (table.actions.getValue().length > 0) {
    children.unshift( /*#__PURE__*/_react.default.createElement("div", {
      key: "actions",
      style: {
        justifyContent: isSelectable ? "flex-start" : "center"
      },
      className: classes.actionsContainer
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: classes.actionsButton,
      raisedOffset: 2,
      raisedSpread: 4,
      insetOffset: 2,
      insetSpread: 4
    }, /*#__PURE__*/_react.default.createElement(_MoreVert.default, {
      fontSize: "small"
    }))));
    columnsWidths.unshift(40);
  }

  if (isSelectable) {
    children.unshift( /*#__PURE__*/_react.default.createElement("div", {
      key: "checkbox",
      className: classes.checkboxContainer
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      value: isChecked,
      onValueChange: toggleSelection
    })));
    columnsWidths.unshift(30);
  }

  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    style: _objectSpread({}, style),
    className: (0, _joinClassNames.default)(classes.headerContainer, className),
    mode: "popOut",
    raisedSpread: 4,
    raisedOffset: 2
  }, /*#__PURE__*/_react.default.createElement(_DynamicRow.DynamicRow, {
    columnWidths: columnsWidths
  }, children));
};

var _default = TableHeader;
exports.default = _default;