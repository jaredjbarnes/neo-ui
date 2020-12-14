"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

var _Check = _interopRequireDefault(require("@material-ui/icons/Check"));

var _joinClassNames = _interopRequireDefault(require("../utils/joinClassNames"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  container: {
    borderRadius: "4px",
    width: "18px",
    height: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "2px ridge rgba(255, 255, 255, 0.25)",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  icon: {
    color: "rgba(100, 110, 140, 1)"
  }
});

const Checkbox = (_ref) => {
  let {
    style,
    className,
    value,
    onValueChange
  } = _ref;
  const classes = useStyles();
  const verifiedValue = typeof value === "boolean" ? value : false;
  const [isChecked, setIsChecked] = (0, _react.useState)(verifiedValue);

  const onClick = event => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    if (typeof onValueChange === "function") {
      onValueChange(newValue, event);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  (0, _react.useEffect)(() => {
    setIsChecked(verifiedValue);
  }, [verifiedValue]);
  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    style: style,
    className: (0, _joinClassNames.default)(classes.container, className),
    mode: "inset",
    insetOffset: 2,
    insetSpread: 4,
    onClick: onClick
  }, isChecked && /*#__PURE__*/_react.default.createElement(_Check.default, {
    className: classes.icon,
    style: {
      fontSize: 15
    }
  }));
};

var _default = Checkbox;
exports.default = _default;