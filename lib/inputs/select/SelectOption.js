"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJss = require("react-jss");

var _SelectProvider = require("../../mediators/select/SelectProvider");

var _useValue = require("../../utils/hooks/useValue");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  selectRow: {
    position: "relative",
    height: "40px",
    minWidth: "100%",
    borderBottom: "2px ridge rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    lineHeight: "40px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "rgba(100, 110, 140, 0.8)",
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    padding: "0px 8px",
    "&:hover": {
      backgroundColor: "rgba(30, 167, 253, 0.5)",
      color: "rgba(255, 255, 255, 0.9)"
    }
  }
});

const SelectOption = (_ref) => {
  let {
    option
  } = _ref;
  const classes = useStyles();
  const optionRef = (0, _react.useRef)(null);
  const selectMediator = (0, _SelectProvider.useSelectMediator)();
  const selectedOption = (0, _useValue.useValue)(selectMediator.selectedOption);
  const highlightedOption = (0, _useValue.useValue)(selectMediator.highlightedOption);
  const isHighlighted = highlightedOption != null && highlightedOption.id === option.id;
  const isSelected = selectedOption != null && selectedOption.id === option.id;
  (0, _react.useEffect)(() => {
    if (isHighlighted && optionRef.current != null) {
      const optionElement = optionRef.current;
      const parentElement = optionElement.parentElement;

      if (parentElement) {
        const elementRect = optionElement.getBoundingClientRect();
        const parentRect = parentElement.getBoundingClientRect();
        const top = Math.max(elementRect.top, parentRect.top);
        const bottom = Math.min(elementRect.bottom, parentRect.bottom);

        if (top > bottom || bottom - top < elementRect.height) {
          if (elementRect.top < parentRect.top) {
            const offset = elementRect.top - parentRect.top;
            const scrollOffset = parentElement.scrollTop;
            parentElement.scrollTop = scrollOffset + offset;
          } else {
            const offset = elementRect.bottom - parentRect.bottom;
            const scrollOffset = parentElement.scrollTop;
            parentElement.scrollTop = scrollOffset + offset;
          }
        }
      }
    }
  }, [isHighlighted]);
  const style = {};

  const selectOption = () => {
    selectMediator.selectOption(option);
    selectMediator.close();
  };

  if (isHighlighted) {
    style.backgroundColor = "rgba(30, 167, 253, 0.9)";
    style.color = "rgba(255, 255, 255, 0.9)";
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: optionRef,
    onClick: selectOption,
    className: classes.selectRow,
    style: style
  }, option.label);
};

var _default = SelectOption;
exports.default = _default;