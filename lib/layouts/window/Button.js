"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Surface = _interopRequireDefault(require("../../core/Surface"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _reactJss.createUseStyles)({
  button: {
    position: "relative",
    width: "13px",
    height: "13px",
    borderRadius: "50%",
    backgroundColor: "rgba(243, 85, 92, 1)",
    cursor: "pointer"
  }
});

const Button = (_ref) => {
  let {} = _ref;
  const classes = useStyles();
  const [mode, setMode] = (0, _react.useState)("flat");

  const press = () => {
    setMode("cutOut");
  };

  const release = () => {
    setMode("flat");
  };

  return /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.button,
    onMouseDown: press,
    onMouseLeave: release,
    onMouseUp: release,
    mode: mode,
    insetSpread: 5,
    insetOffset: 0,
    shadowColor: "rgba(180,0,0,1)",
    highlightColor: "rgba(255,80,80,0.9)"
  });
};

var _default = Button;
exports.default = _default;