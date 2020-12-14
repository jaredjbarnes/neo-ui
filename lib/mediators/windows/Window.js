"use strict";

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

class Window {
  name = "";
  zIndex = 0;
  width = 0;
  minWidth = 0;
  minHeight = 0;
  maxWidth = 0;
  maxHeight = 0;
  height = 0;
  x = 0;
  y = 0;
  scale = 1;
  rotateX = 0;
  rotateY = 0;
  rotateZ = 0;
  isResizable = true;
  isMovable = true;
  isResizing = false;
  isDragging = false;
  state = "open";
  changeSubject = new _rxjs.Subject();
  metaDataSubject = new _rxjs.Subject();
  positionChangeSubject = new _rxjs.Subject();
  disposeSubject = new _rxjs.Subject();
  messageSubject = new _rxjs.Subject();
  metaData = new Map();
  isDisabled = false;

  getName() {
    return this.name;
  }

  setName(name) {
    if (this.name !== name) {
      this.name = name;
      this.notifyChange();
    }
  }

  getState() {
    return this.state;
  }

  setState(value) {
    if (this.state !== value) {
      this.state = value;
      this.notifyChange();
    }
  }

  getX() {
    return this.x;
  }

  setX(x) {
    if (this.x !== x) {
      this.x = x;
      this.positionChangeSubject.next();
      this.notifyChange();
    }
  }

  getY() {
    return this.y;
  }

  setY(y) {
    if (this.y !== y) {
      this.y = y;
      this.positionChangeSubject.next();
      this.notifyChange();
    }
  }

  getMinWidth() {
    return this.minWidth;
  }

  setMinWidth(value) {
    if (value !== this.minWidth) {
      this.minWidth;
      this.width = Math.min(this.width, this.minWidth);
      this.notifyChange();
    }
  }

  getMinHeight() {
    return this.minHeight;
  }

  setMinHeight(value) {
    if (value !== this.minHeight) {
      this.minHeight;
      this.height = Math.min(this.height, this.minHeight);
      this.notifyChange();
    }
  }

  getMaxWidth() {
    return this.maxWidth;
  }

  setMaxWidth(value) {
    if (value !== this.maxWidth) {
      this.maxWidth;
      this.width = Math.max(this.width, this.maxWidth);
      this.notifyChange();
    }
  }

  getMaxHeight() {
    return this.maxHeight;
  }

  setMaxHeight(value) {
    if (value !== this.maxHeight) {
      this.maxHeight;
      this.height = Math.max(this.maxHeight, this.maxHeight);
      this.notifyChange();
    }
  }

  getWidth() {
    return this.width;
  }

  setWidth(width) {
    if (this.isResizable && this.width !== width) {
      this.width = width;
      this.notifyChange();
    }
  }

  getHeight() {
    return this.height;
  }

  setHeight(height) {
    if (this.isResizable && this.height !== height) {
      this.height = height;
      this.notifyChange();
    }
  }

  getRect() {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width
    };
  }

  setSize(width, height) {
    if (!this.isResizable) {
      return;
    }

    let didChange = false;

    if (this.width !== width) {
      this.width = width;
      didChange = true;
    }

    if (this.height !== height) {
      this.height = height;
      didChange = true;
    }

    if (didChange) {
      this.notifyChange();
    }
  }

  setPosition(x, y) {
    let didChange = false;

    if (this.x !== x) {
      this.x = x;
      didChange = true;
    }

    if (this.y !== y) {
      this.y = y;
      didChange = true;
    }

    if (didChange) {
      this.positionChangeSubject.next();
      this.notifyChange();
    }
  }

  getScale() {
    return this.scale;
  }

  setScale(scale) {
    if (this.scale !== scale) {
      this.scale = scale;
      this.notifyChange();
    }
  }

  getIsDragging() {
    return this.isDragging;
  }

  setIsDragging(isDragging) {
    if (this.isDragging !== isDragging) {
      this.isDragging = isDragging;
      this.notifyChange();
    }
  }

  getIsResizing() {
    return this.isResizing;
  }

  setIsResizing(isResizing) {
    if (this.isResizing !== isResizing) {
      this.isResizing = isResizing;
      this.notifyChange();
    }
  }

  getIsResizable() {
    return this.isResizable;
  }

  setIsResizable(value) {
    if (value !== this.isResizable) {
      this.isResizable = value;
      this.notifyChange();
    }
  }

  getIsMovable() {
    return this.isMovable;
  }

  setIsMovable(value) {
    if (value !== this.isMovable) {
      this.isMovable = value;
      this.notifyChange();
    }
  }

  getZIndex() {
    return this.zIndex;
  }

  setZIndex(zIndex) {
    if (this.zIndex !== zIndex) {
      this.zIndex = zIndex;
      this.notifyChange();
    }
  }

  getMetaData(key) {
    return this.metaData.get(key);
  }

  setMetaData(key, value) {
    const currentValue = this.metaData.get(key);

    if (currentValue !== value) {
      this.metaData.set(key, value);
      this.metaDataSubject.next({
        key,
        value
      });
    }
  }

  restoreTo(memento) {
    Object.keys(memento).forEach(key => this[key] = memento[key]);
  }

  createRestoreMemento() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      scale: this.scale,
      rotateX: this.rotateX,
      rotateY: this.rotateY,
      rotateZ: this.rotateZ,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      isResizable: this.isResizable,
      isMovable: this.isMovable
    };
  }

  notifyChange() {
    this.changeSubject.next();
  }

  onMetaDataChange(callback) {
    return this.metaDataSubject.subscribe({
      next: callback
    });
  }

  onChange(callback) {
    return this.changeSubject.subscribe({
      next: callback
    });
  }

  onPositionChange(callback) {
    return this.positionChangeSubject.subscribe({
      next: callback
    });
  }

  onClose(callback) {
    return this.disposeSubject.subscribe({
      next: callback
    });
  }

  whenClosed() {
    return new Promise(resolve => {
      const subscription = this.onClose(() => {
        subscription.unsubscribe();
        resolve();
      });
    });
  }

  disable() {
    this.isDisabled = false;
    this.changeSubject.next();
  }

  enable() {
    this.isDisabled = true;
    this.changeSubject.next();
  }

  postMessage(message) {
    this.messageSubject.next(message);
  }

  onMessage(callback) {
    return this.messageSubject.subscribe({
      next: callback
    });
  }

  close() {
    this.disposeSubject.next();
    this.dispose();
  }

  dispose() {
    this.changeSubject.complete();
    this.positionChangeSubject.complete();
    this.messageSubject.complete();
    this.metaDataSubject.complete();
    this.disposeSubject.complete();
  }

}

exports.default = Window;