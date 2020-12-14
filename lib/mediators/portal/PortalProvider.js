"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PortalContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _PortalMediator = _interopRequireDefault(require("./PortalMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const portalMediator = new _PortalMediator.default(document.body);

const PortalContext = /*#__PURE__*/_react.default.createContext(portalMediator);

exports.PortalContext = PortalContext;

const PortalProvider = (_ref) => {
  let {
    element,
    children
  } = _ref;
  const portalMediator = (0, _react.useMemo)(() => {
    return new _PortalMediator.default(element);
  }, [element]);
  (0, _react.useEffect)(() => () => portalMediator.dispose(), [portalMediator]);
  return /*#__PURE__*/_react.default.createElement(PortalContext.Provider, {
    value: portalMediator
  }, children);
};

var _default = PortalProvider;
exports.default = _default;