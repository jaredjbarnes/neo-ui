"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Portal = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Portal {
  portalDiv = null;

  constructor(portalMediator) {
    this.portalMediator = portalMediator;
    this.createPortalContainer();
  }

  createPortalContainer() {
    var _this$portalMediator, _this$portalMediator$;

    this.portalDiv = document.createElement("div");
    this.portalDiv.style.position = "absolute";
    this.portalDiv.style.top = "0px";
    this.portalDiv.style.left = "0px";
    this.portalDiv.style.bottom = "0px";
    this.portalDiv.style.right = "0px";
    this.portalDiv.style.backgroundColor = "rgba(0,0,0,0)";
    this.portalDiv.style.overflow = "hidden";
    this.portalDiv.style.padding = "0px";
    this.portalDiv.style.margin = "0px";
    (_this$portalMediator = this.portalMediator) === null || _this$portalMediator === void 0 ? void 0 : (_this$portalMediator$ = _this$portalMediator.platformDiv) === null || _this$portalMediator$ === void 0 ? void 0 : _this$portalMediator$.appendChild(this.portalDiv);
  }

  render(children) {
    if (this.portalDiv == null) {
      return null;
    }

    return /*#__PURE__*/_reactDom.default.createPortal(children, this.portalDiv);
  }

  dispose() {
    if (this.portalDiv != null && this.portalMediator.platformDiv != null) {
      this.portalMediator.platformDiv.removeChild(this.portalDiv);
    }

    this.portalMediator.removePortal(this);
    this.portalDiv = null;
  }

}

exports.Portal = Portal;

class PortalMediator {
  portals = [];
  platformDiv = null;

  constructor(body) {
    this.body = body;
    this.createPlatform();
  }

  createPlatform() {
    this.platformDiv = document.createElement("div");
    this.platformDiv.style.position = "fixed";
    this.platformDiv.style.top = "0px";
    this.platformDiv.style.left = "0px";
    this.platformDiv.style.bottom = "0px";
    this.platformDiv.style.right = "0px";
    this.platformDiv.style.backgroundColor = "rgba(0,0,0,0)";
    this.platformDiv.style.overflow = "hidden";
    this.platformDiv.style.padding = "0px";
    this.platformDiv.style.margin = "0px";
  }

  createPortal() {
    const portal = new Portal(this);
    this.portals.push(portal);
    this.showPlatform();
    return portal;
  }

  showPlatform() {
    if (this.platformDiv != null && this.platformDiv.parentElement == null) {
      this.body.appendChild(this.platformDiv);
    }
  }

  hidePlatformIfNecessary() {
    if (this.platformDiv != null && this.portals.length === 0 && this.platformDiv.parentElement != null) {
      this.body.removeChild(this.platformDiv);
    }
  }

  removePortal(portal) {
    const index = this.portals.indexOf(portal);

    if (index > -1) {
      this.portals.splice(index, 1);
      this.hidePlatformIfNecessary();
    }
  }

  dispose() {
    if (this.platformDiv != null) {
      this.body.removeChild(this.platformDiv);
    }

    this.portals.forEach(p => {
      p.dispose();
    });
    this.platformDiv = null;
  }

}

exports.default = PortalMediator;