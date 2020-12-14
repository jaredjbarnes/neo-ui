"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useColumns = _interopRequireDefault(require("../../mediators/table/hooks/useColumns"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _useIsRowSelected = _interopRequireDefault(require("../../mediators/table/hooks/useIsRowSelected"));

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _RowProvider = _interopRequireDefault(require("../../mediators/table/RowProvider"));

var _Checkbox = _interopRequireDefault(require("../../inputs/Checkbox"));

var _Button = _interopRequireDefault(require("../../inputs/Button"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _DynamicRow = require("./DynamicRow");

var _useValue = require("../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  tableRowContainer: {
    display: "grid",
    position: "relative",
    height: "40px",
    minWidth: "100%",
    borderBottom: "2px ridge rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    boxSizing: "border-box"
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

const TableRow = (_ref) => {
  let {
    row,
    className,
    style,
    onRowClick
  } = _ref;
  const classes = useStyles();
  const columns = (0, _useColumns.default)();
  const table = (0, _useTable.default)();
  const isSelected = (0, _useIsRowSelected.default)(row);
  const isSelectable = (0, _useValue.useValue)(table.isSelectable);
  const cells = row.cells;

  const onCheckboxClick = () => {
    if (table.isRowSelected(row)) {
      table.deselectRow(row);
    } else {
      table.selectRow(row);
    }
  };

  const onClick = event => {
    if (typeof onRowClick === "function") {
      onRowClick(row, table, event);
    }
  };

  const children = columns.map((c, index) => {
    var _cells$find;

    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      column: c,
      key: index
    }, (_cells$find = cells.find(cell => cell.name === c.name)) === null || _cells$find === void 0 ? void 0 : _cells$find.value);
  });
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
      value: isSelected,
      onValueChange: onCheckboxClick
    })));
    columnsWidths.unshift(30);
  }

  return /*#__PURE__*/_react.default.createElement(_RowProvider.default, {
    row: row
  }, /*#__PURE__*/_react.default.createElement(_DynamicRow.DynamicRow, {
    onClick: onClick,
    className: (0, _joinClassNames.default)(classes.tableRowContainer, className),
    style: style,
    columnWidths: columnsWidths
  }, children));
};

var _default = TableRow;
exports.default = _default;