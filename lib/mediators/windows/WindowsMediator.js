"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Window = _interopRequireDefault(require("./Window"));

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WindowsMediator {
  windows = [];
  windowsChangeSubject = new _rxjs.Subject();
  screenRect = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  createWindow() {
    const window = new _Window.default();
    this.windows.push(window);
    this.subscribeToWindow(window);
    this.windowsChangeSubject.next(this.windows.slice());
    return window;
  }

  closeWindow(window) {
    window.close();
  }

  subscribeToWindow(window) {
    window.onClose(() => {
      this.removeWindow(window);
    });
    window.onPositionChange(() => {
      this.keepWindowOnScreen(window);
    });
  }

  removeWindow(window) {
    const index = this.windows.indexOf(window);

    if (index > -1) {
      this.windows.splice(index, 1);
      this.windowsChangeSubject.next(this.windows.slice());
    }
  }

  bringWindowToFront(window) {
    const largestZIndex = this.getLargestZIndex();
    window.setZIndex(largestZIndex + 1);
  }

  getLargestZIndex() {
    return this.windows.reduce((largestZIndex, window) => {
      return Math.max(largestZIndex, window.getZIndex());
    }, 0);
  }

  sendWindowToBack(window) {
    const smallestZIndex = this.getSmallestIndex();
    window.setZIndex(smallestZIndex - 1);
  }

  getSmallestIndex() {
    return this.windows.reduce((largestZIndex, window) => {
      return Math.min(largestZIndex, window.getZIndex());
    }, this.getLargestZIndex());
  }

  setScreenRect(rect) {
    if (rect.top !== this.screenRect.top || rect.bottom !== this.screenRect.top || rect.left !== this.screenRect.left || rect.right !== this.screenRect.right) {
      this.screenRect = rect;
      this.fitWindowsWithinScreen();
    }
  }

  fitWindowsWithinScreen() {
    this.windows.forEach(window => {
      this.keepWindowOnScreen(window);
    });
  }

  keepWindowOnScreen(window) {
    const rect = window.getRect();
    let x = window.getX();
    let y = window.getY();

    if (rect.top < this.screenRect.top) {
      y = this.screenRect.top;
    }

    if (rect.bottom > this.screenRect.bottom) {
      const difference = this.screenRect.bottom - rect.bottom;
      y = y + difference;
    }

    if (rect.left < this.screenRect.left) {
      x = this.screenRect.left;
    }

    if (rect.right > this.screenRect.right) {
      const difference = this.screenRect.right - rect.right;
      x = x + difference;
    }

    window.setPosition(x, y);
  }

  onWindowsChange(callback) {
    return this.windowsChangeSubject.subscribe({
      next: callback
    });
  }

  dispose() {
    this.windowsChangeSubject.complete();
  }

}

exports.default = WindowsMediator;