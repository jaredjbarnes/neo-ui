"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _TableHeader = _interopRequireDefault(require("./TableHeader"));

var _Surface = _interopRequireDefault(require("../../core/Surface"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _TableRow = _interopRequireDefault(require("./TableRow"));

var _useRows = _interopRequireDefault(require("../../mediators/table/hooks/useRows"));

var _TableStatus = _interopRequireDefault(require("./TableStatus"));

var _TableLoadingRow = _interopRequireDefault(require("./TableLoadingRow"));

var _useTableStatus = _interopRequireDefault(require("../../mediators/table/hooks/useTableStatus"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  raisedContainer: {
    minHeight: "200px",
    minWidth: "200px",
    width: "200px",
    height: "200px",
    padding: "0px 6px",
    borderRadius: "8px"
  },
  // Surface
  insetContainer: {
    position: "relative",
    borderRadius: "8px",
    width: "100%",
    height: "100%"
  },
  // Surface
  scrollContainer: {
    position: "absolute",
    top: "0px",
    bottom: "34px",
    left: "0px",
    right: "0px",
    overflow: "auto"
  },
  // div
  header: {
    position: "sticky",
    top: 0,
    left: 0,
    minWidth: "100%",
    zIndex: 1
  },
  // TableHeader
  content: {
    position: "relative",
    minWidth: "100%",
    minHeight: "100%",
    zIndex: 0
  },
  // div
  status: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    height: "34px",
    width: "100%",
    zIndex: 2
  } // TableStatus

});
const OFFSET_Y = 37;
const ROW_HEIGHT = 40;
const STATUS_HEIGHT = 40;

function getRowsWithinRange(rows, offsetY, rowHeight, startY, endY, contentWidth) {
  startY = startY - offsetY;
  endY = endY - offsetY;
  let startIndex = Math.floor(startY / rowHeight);
  let endIndex = Math.ceil(endY / rowHeight);
  startIndex = Math.max(0, startIndex);
  endIndex = Math.min(rows.length - 1, endIndex);
  return rows.slice(startIndex, endIndex + 1).map((row, index) => {
    return {
      row: row,
      x: 0,
      y: (startIndex + index) * rowHeight + offsetY,
      width: contentWidth,
      height: rowHeight
    };
  });
}

const TableDataScroller = (_ref) => {
  let {
    style,
    className,
    onRowClick
  } = _ref;
  const classes = useStyles();
  const rows = (0, _useRows.default)();
  const table = (0, _useTable.default)();
  const tableStatus = (0, _useTableStatus.default)();
  const tableScrollerRef = (0, _react.useRef)(null);
  const [range, setRange] = (0, _react.useState)({
    startY: 0,
    endY: 0
  });
  const width = table.getContentWidth();
  const rowsData = getRowsWithinRange(rows, OFFSET_Y, ROW_HEIGHT, range.startY, range.endY, width);
  const isFinished = table.isFinishedLoading.getValue();
  const height = table.getLoadedRowsLength() * ROW_HEIGHT;
  const tableContentStyle = {
    width: width + "px",
    height: height + OFFSET_Y + (isFinished ? 0 : STATUS_HEIGHT) + "px"
  };
  const tableLoadingRowStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "none"
  };

  if (tableStatus === "pending") {
    tableLoadingRowStyle.transform = "translate(0px, ".concat(height + OFFSET_Y, "px)");
    tableLoadingRowStyle.display = "grid";
  }

  const updateRect = (0, _react.useCallback)(() => {
    if (tableScrollerRef.current != null) {
      const element = tableScrollerRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop = element.scrollTop;
      setRange({
        startY: scrollTop,
        endY: rect.height + scrollTop
      });
    }
  }, [table]);

  const onScroll = () => {
    const element = tableScrollerRef.current;
    const isFinished = table.isFinishedLoading.getValue();
    updateRect();

    if (!isFinished && element != null && element.scrollTop >= element.scrollHeight - element.offsetHeight) {
      table.loadNextBatch();
    }
  };

  (0, _react.useEffect)(() => {
    updateRect();
  }, []);
  (0, _react.useEffect)(() => {
    const observer = new ResizeObserver(() => {
      updateRect();
    });
    observer.observe(tableScrollerRef.current);
    return () => observer.disconnect();
  }, [updateRect]);
  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: (0, _joinClassNames.default)(classes.raisedContainer, className),
    style: style,
    mode: "raised",
    raisedOffset: 7,
    raisedSpread: 14
  }, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.insetContainer,
    mode: "cutOut",
    insetOffset: 2
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.scrollContainer,
    ref: tableScrollerRef,
    onScroll: onScroll
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.content,
    style: tableContentStyle
  }, /*#__PURE__*/_react.default.createElement(_TableHeader.default, {
    className: classes.header
  }), rowsData.map((data, index) => {
    const y = index * ROW_HEIGHT + OFFSET_Y + range.startY;
    const style = {
      position: "absolute",
      top: "0px",
      left: "0px",
      transform: "translate(".concat(data.x, "px, ").concat(data.y, "px)")
    };
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      key: data.row.id,
      row: data.row,
      style: style,
      onRowClick: onRowClick
    });
  }), !isFinished && /*#__PURE__*/_react.default.createElement(_TableLoadingRow.default, {
    style: tableLoadingRowStyle
  }))), /*#__PURE__*/_react.default.createElement(_TableStatus.default, {
    className: classes.status
  })));
};

var _default = TableDataScroller;
exports.default = _default;