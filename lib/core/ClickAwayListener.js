"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useForkRef = _interopRequireDefault(require("./hooks/useForkRef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const eventMap = {
  onClick: "click",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup"
};
const touchMap = {
  onTouchStart: "touchstart",
  onTouchEnd: "touchend"
};

const ClickAwayListener = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    mouseEvent,
    touchEvent,
    children,
    onClickAway
  } = _ref;
  const nodeRef = (0, _react.useRef)(null);
  const DOMMouseEvent = eventMap[mouseEvent || "onClick"];
  const DOMTouchEvent = touchMap[touchEvent || "onTouchEnd"];

  const childrenProps = _objectSpread(_objectSpread({}, children.props), {}, {
    ref: (0, _useForkRef.default)(nodeRef, children.props.ref, ref)
  });

  const eventHandler = event => {
    let insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !document.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM) {
      onClickAway(event);
    }
  };

  (0, _react.useEffect)(() => {
    document.addEventListener(DOMMouseEvent, eventHandler);
    document.addEventListener(DOMTouchEvent, eventHandler);
    return () => {
      document.removeEventListener(DOMMouseEvent, eventHandler);
      document.removeEventListener(DOMTouchEvent, eventHandler);
    };
  }, [touchEvent, mouseEvent]);
  return /*#__PURE__*/_react.default.cloneElement(children, childrenProps);
});

var _default = ClickAwayListener;
exports.default = _default;