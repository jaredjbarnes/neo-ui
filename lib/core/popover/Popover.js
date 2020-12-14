"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Portal = _interopRequireDefault(require("../../layouts/Portal"));

var _useForkRef = _interopRequireDefault(require("../hooks/useForkRef"));

var _reactMotionUx = require("react-motion-ux");

var _PopoverMediator = _interopRequireDefault(require("./PopoverMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyledTransition = (0, _reactMotionUx.makeStyledTransition)({
  closed: {
    transform: "scale(0.9) translate(0px, -20px)",
    opacity: 0,
    transformOrigin: "center center"
  },
  closing: {
    transform: "scale(0.9) translate(0px, -20px)",
    opacity: 0,
    transformOrigin: "center center"
  },
  open: {
    transform: "scale(1) translate(0px, 0px)",
    opacity: 1,
    transformOrigin: "center center"
  }
}, 500);

const getOffset = offset => {
  return offset != null && typeof offset === "object" ? offset : {
    x: 0,
    y: 0
  };
};

const Popover = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    open,
    children,
    anchorRef,
    placement,
    offset
  } = _ref;
  const nodeRef = (0, _react.useRef)(null);
  const forkedRef = (0, _useForkRef.default)(nodeRef, ref);
  const finalOffset = getOffset(offset);
  const popoverMediator = (0, _react.useMemo)(() => {
    return new _PopoverMediator.default();
  }, []);
  const [internalState, setInternalState] = (0, _react.useState)(open ? "open" : "closed");
  const timeoutRef = (0, _react.useRef)(0);
  const finalRef = useStyledTransition(internalState, {
    ref: forkedRef,
    duration: internalState === "open" ? 200 : 200
  });
  const position = (0, _react.useCallback)(() => {
    const anchorElement = anchorRef.current;
    const node = nodeRef.current;

    if (anchorElement == null || node == null) {
      return;
    }

    const anchorRect = anchorElement.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const boundingRect = {
      top: 0,
      left: 0,
      right: document.documentElement.clientWidth,
      bottom: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
    popoverMediator.nodeRect = nodeRect;
    popoverMediator.boundingRect = boundingRect;
    popoverMediator.offset = finalOffset;
    popoverMediator.anchorRect = anchorRect;
    popoverMediator.placement = placement;
    const resultRect = popoverMediator.getPosition();
    node.style.position = "absolute";
    node.style.top = "".concat(resultRect.top, "px");
    node.style.left = "".concat(resultRect.left, "px");
  }, []);
  (0, _react.useEffect)(() => {
    if (open) {
      clearTimeout(timeoutRef.current);
      setInternalState("open");
    } else {
      setInternalState("closing");
      timeoutRef.current = setTimeout(() => {
        setInternalState("closed");
      }, 200);
    }
  }, [open]);
  (0, _react.useEffect)(() => {
    const onResize = () => {
      position();
    };

    window.addEventListener("resize", onResize);
    return () => {
      return window.removeEventListener("resize", onResize);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (internalState === "open") {
      const anchorElement = anchorRef.current;
      const node = nodeRef.current;

      if (anchorElement != null && node != null) {
        position();
      }
    }
  }, [internalState]);

  if (internalState === "closed") {
    return null;
  } else {
    return /*#__PURE__*/_react.default.createElement(_Portal.default, {
      ref: finalRef
    }, children);
  }
});

var _default = Popover;
exports.default = _default;