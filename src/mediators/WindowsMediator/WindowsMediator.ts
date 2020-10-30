import Window from "./Window";
import { Subject } from "rxjs";
import Rect from "../../utils/Rect";

export default class WindowsMediator {
  private windows: Window[];
  private windowsChangeSubject = new Subject<Window[]>();
  private screenRect: Rect = { top: 0, left: 0, right: 0, bottom: 0 };

  createWindow() {
    const window = new Window();
    this.windows.push(window);
    this.subscribeToWindow(window);
    this.windowsChangeSubject.next(this.windows.slice());

    return window;
  }

  closeWindow(window: Window) {
    window.close();
  }

  private subscribeToWindow(window: Window) {
    window.onClose(() => {
      this.removeWindow(window);
    });

    window.onPositionChange(() => {
      this.keepWindowOnScreen(window);
    });
  }

  private removeWindow(window: Window) {
    const index = this.windows.indexOf(window);

    if (index > -1) {
      this.windows.splice(index, 1);
      this.windowsChangeSubject.next(this.windows.slice());
    }
  }

  bringWindowToFront(window: Window) {
    const largestZIndex = this.getLargestZIndex();
    window.setZIndex(largestZIndex + 1);
  }

  private getLargestZIndex() {
    return this.windows.reduce((largestZIndex, window) => {
      return Math.max(largestZIndex, window.getZIndex());
    }, 0);
  }

  sendWindowToBack(window: Window) {
    const smallestZIndex = this.getSmallestIndex();
    window.setZIndex(smallestZIndex - 1);
  }

  private getSmallestIndex() {
    return this.windows.reduce((largestZIndex, window) => {
      return Math.min(largestZIndex, window.getZIndex());
    }, this.getLargestZIndex());
  }

  setScreenRect(rect: Rect) {
    if (
      rect.top !== this.screenRect.top ||
      rect.bottom !== this.screenRect.top ||
      rect.left !== this.screenRect.left ||
      rect.right !== this.screenRect.right
    ) {
      this.screenRect = rect;
      this.fitWindowsWithinScreen();
    }
  }

  private fitWindowsWithinScreen() {
    this.windows.forEach((window) => {
      this.keepWindowOnScreen(window);
    });
  }

  private keepWindowOnScreen(window: Window) {
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

  onWindowsChange(callback: (windows: Window[]) => void) {
    return this.windowsChangeSubject.subscribe({ next: callback });
  }

  dispose() {
    this.windowsChangeSubject.complete();
  }
}
