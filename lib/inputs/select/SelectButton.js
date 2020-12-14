"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireWildcard(require("react"));

var _Surface = _interopRequireDefault(require("../../core/Surface"));

var _reactJss = require("react-jss");

var _ArrowDropDown = _interopRequireDefault(require("@material-ui/icons/ArrowDropDown"));

var _reactMotionUx = require("react-motion-ux");

var _useForkRef = _interopRequireDefault(require("../../core/hooks/useForkRef"));

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

var _SelectProvider = require("../../mediators/select/SelectProvider");

var _useValue = require("../../utils/hooks/useValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useContainerStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  focused: {
    border: "2px ridge rgba(30, 167, 253, 0.5)"
  },
  normal: {
    border: "2px ridge rgba(255, 255, 255, 0.15)"
  }
}, 200);
const useArrowTransition = (0, _reactMotionUx.makeStyledTransition)({
  open: {
    transform: "rotate(180deg)"
  },
  closed: {
    transform: "rotate(0deg)"
  }
}, 600);
const useStyles = (0, _reactJss.createUseStyles)({
  container: {
    display: "inline-grid",
    gridTemplateColumns: "auto 30px",
    width: "200px",
    height: "35px",
    boxSizing: "border-box",
    border: "2px ridge rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "rgba(100, 110, 140, 1)",
    fontFamily: "Verdana, Geneva, sans-serif",
    outline: "none"
  },
  downArrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    userSelect: "none"
  },
  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0px 8px",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    userSelect: "none"
  }
});

function _default(_ref) {
  let {
    className,
    style,
    innerRef
  } = _ref;
  const classes = useStyles();
  const selectMediator = (0, _SelectProvider.useSelectMediator)();
  const open = (0, _useValue.useValue)(selectMediator.isOpen);
  const selectedOption = (0, _useValue.useValue)(selectMediator.selectedOption);
  const closed = (0, _useValue.useValue)(selectMediator.closed);
  const [isFocused, setIsFocused] = (0, _react.useState)("normal");
  const label = selectedOption != null ? selectedOption.label : "-- Select --";
  const [isPressed, setIsPressed] = (0, _react.useState)(false);
  const buttonRef = (0, _react.useRef)(null);

  const onElementMount = element => {
    if (element != null) {
      selectMediator.dropDownWidth.setValue(element.offsetWidth);
    }
  };

  (0, _react.useEffect)(() => {
    if (buttonRef.current != null) {
      buttonRef.current.focus();
    }
  }, [closed]);
  const ref = (0, _useForkRef.default)(innerRef, onElementMount, buttonRef);
  const svgRef = useArrowTransition(open ? "open" : "closed");
  let containerRef = useContainerStyledTransition(isFocused, {
    ref
  });

  const press = () => {
    setIsPressed(true);
  };

  const release = () => {
    setIsPressed(false);
  };

  const onFocus = () => {
    setIsFocused("focused");
  };

  const onBlur = () => {
    setIsFocused("normal");
  };

  const onKeyDown = event => {
    if (event.key === "Enter") {
      toggle();
    }
  };

  const toggle = () => {
    if (selectMediator.isOpen.getValue()) {
      selectMediator.close();
    } else {
      selectMediator.open();
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    ref: containerRef,
    onMouseDown: press,
    onMouseUp: release,
    onMouseLeave: release,
    onFocus: onFocus,
    onBlur: onBlur,
    mode: isPressed ? "inset" : "raised",
    raisedOffset: 5,
    raisedSpread: 10,
    insetOffset: 2,
    insetSpread: 6,
    className: (0, _joinClassNames.default)(classes.container, className),
    style: style,
    tabIndex: 0,
    onClick: toggle,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.label
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.downArrow
  }, /*#__PURE__*/_react.default.createElement(_ArrowDropDown.default, {
    ref: svgRef
  })));
}