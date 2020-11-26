import ReactDOM from "react-dom";
import React from "react";

export class Portal {
  portalDiv: HTMLDivElement | null = null;
  portalMediator: PortalMediator;

  constructor(portalMediator: PortalMediator) {
    this.portalMediator = portalMediator;
    this.createPortalContainer();
  }

  private createPortalContainer() {
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

    this.portalMediator?.platformDiv?.appendChild(this.portalDiv);
  }

  render(children: React.ReactNode | React.ReactNode[]) {
    if (this.portalDiv == null) {
      return null;
    }
    return ReactDOM.createPortal(children, this.portalDiv);
  }

  dispose() {
    if (this.portalDiv != null && this.portalMediator.platformDiv != null) {
      this.portalMediator.platformDiv.removeChild(this.portalDiv);
    }

    this.portalMediator.removePortal(this);
    this.portalDiv = null;
  }
}

export default class PortalMediator {
  private body: HTMLElement;
  private portals: Portal[] = [];

  platformDiv: HTMLDivElement | null = null;

  constructor(body: HTMLElement) {
    this.body = body;
    this.createPlatform();
  }

  private createPlatform() {
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
    if (
      this.platformDiv != null &&
      this.portals.length === 0 &&
      this.platformDiv.parentElement != null
    ) {
      this.body.removeChild(this.platformDiv);
    }
  }

  removePortal(portal: Portal) {
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

    this.portals.forEach((p) => {
      p.dispose();
    });
    this.platformDiv = null;
  }
}
