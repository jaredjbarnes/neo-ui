"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useColumns = _interopRequireDefault(require("../../mediators/table/hooks/useColumns"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _DynamicRow = require("./DynamicRow");

var _useValue = require("../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  tableRowContainer: {
    position: "relative",
    height: "40px",
    minWidth: "100%",
    borderBottom: "1px solid #ccc",
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  "@keyframes pulse": {
    "0%": {
      backgroundColor: "rgba(190, 200, 215, 0.5)"
    },
    "70%": {
      backgroundColor: "rgba(190, 200, 215, 0.15)"
    },
    "100%": {
      backgroundColor: "rgba(190, 200, 215, 0.5)"
    }
  },
  pulsingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px"
  },
  pulsingSection: {
    display: "inline-block",
    width: "70%",
    height: "20px",
    animationName: "$pulse",
    animationDuration: "2s",
    animationIterationCount: "infinite",
    borderRadius: "8px"
  }
});
const alignmentMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};

const TableLoadingRow = (_ref) => {
  let {
    className,
    style
  } = _ref;
  const table = (0, _useTable.default)();
  const classes = useStyles();
  const columns = (0, _useColumns.default)();
  const isSelectable = (0, _useValue.useValue)(table.isSelectable);
  const children = columns.map((c, index) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      style: {
        justifyContent: alignmentMap[c.alignment]
      },
      className: classes.pulsingContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: classes.pulsingSection
    }));
  });
  const columnsWidths = columns.map(column => column.width);

  if (table.actions.getValue().length > 0) {
    let actionsWidth = 40;
    children.unshift( /*#__PURE__*/_react.default.createElement("div", {
      key: "actions",
      style: {
        justifyContent: isSelectable ? "flex-start" : "center"
      },
      className: classes.pulsingContainer
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: classes.pulsingSection
    })));
    children.push( /*#__PURE__*/_react.default.createElement("div", {
      key: children.length
    }));

    if (isSelectable) {
      actionsWidth = 70;
    }

    columnsWidths.unshift(actionsWidth);
  }

  return /*#__PURE__*/_react.default.createElement(_DynamicRow.DynamicRow, {
    className: (0, _joinClassNames.default)(classes.tableRowContainer, className),
    style: style,
    columnWidths: columnsWidths
  }, children);
};

var _default = TableLoadingRow;
exports.default = _default;