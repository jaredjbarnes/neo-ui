"use strict";

require("core-js/modules/es.string.search");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SelectProvider = require("../../mediators/select/SelectProvider");

var _useValue = require("../../utils/hooks/useValue");

var _Surface = _interopRequireDefault(require("../../core/Surface"));

var _Popover = _interopRequireDefault(require("../../core/popover/Popover"));

var _reactJss = require("react-jss");

var _ClickAwayListener = _interopRequireDefault(require("../../core/ClickAwayListener"));

var _SelectSearch = _interopRequireDefault(require("./SelectSearch"));

var _SelectOption = _interopRequireDefault(require("./SelectOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  selectOptions: {
    display: "grid",
    gridTemplateRows: "8px 35px 8px auto 8px",
    gridTemplateColumns: "8px auto 8px",
    height: "200px",
    borderRadius: "8px"
  },
  search: {
    width: "100%",
    gridRowStart: 2,
    gridRowEnd: 2,
    gridColumnStart: 2,
    gridColumnEnd: 2
  },
  options: {
    gridRowStart: 4,
    gridRowEnd: 4,
    gridColumnStart: 2,
    gridColumnEnd: 2,
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    overflow: "auto",
    border: "2px ridge rgba(255, 255, 255, 0.15)"
  }
});

function SelectOptions(_ref) {
  let {
    anchorRef
  } = _ref;
  const classes = useStyles();
  const selectMediator = (0, _SelectProvider.useSelectMediator)();
  const open = (0, _useValue.useValue)(selectMediator.isOpen);
  const options = (0, _useValue.useValue)(selectMediator.filteredOptions);
  const dropDownWidth = (0, _useValue.useValue)(selectMediator.dropDownWidth);
  const dropDownHeight = (0, _useValue.useValue)(selectMediator.dropDownHeight);
  const placement = {
    vertical: "bottom",
    horizontal: "left"
  };

  const close = () => {
    selectMediator.close();
  };

  const style = {
    width: "".concat(dropDownWidth, "px"),
    height: "".concat(dropDownHeight, "px")
  };

  const onKeyDown = event => {
    if (event.key === "ArrowDown") {
      selectMediator.moveHighlightDown();
    } else if (event.key === "ArrowUp") {
      selectMediator.moveHighlightUp();
    } else if (event.key === "Enter") {
      if (selectMediator.highlightedOption.getValue() != null) {
        selectMediator.selectOption(selectMediator.highlightedOption.getValue());
        selectMediator.close();
      }
    } else if (event.key === "Escape") {
      selectMediator.close();
      event.stopPropagation();
      event.preventDefault();
    } else if (event.shiftKey && event.key === "Tab") {
      selectMediator.moveHighlightUp();
      event.stopPropagation();
      event.preventDefault();
    } else if (event.key === "Tab") {
      selectMediator.moveHighlightDown();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Popover.default, {
    open: open,
    anchorRef: anchorRef,
    placement: placement
  }, /*#__PURE__*/_react.default.createElement(_ClickAwayListener.default, {
    onClickAway: close,
    mouseEvent: "onMouseDown"
  }, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    mode: "popOut",
    raisedOffset: 2,
    style: style,
    className: classes.selectOptions,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react.default.createElement(_SelectSearch.default, {
    className: classes.search
  }), /*#__PURE__*/_react.default.createElement(_Surface.default, {
    mode: "cutOut",
    insetOffset: 2,
    className: classes.options
  }, options.map((o, index) => /*#__PURE__*/_react.default.createElement(_SelectOption.default, {
    key: index,
    option: o
  }))))));
}

var _default = SelectOptions;
exports.default = _default;