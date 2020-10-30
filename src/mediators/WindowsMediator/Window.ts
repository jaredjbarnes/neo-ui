import Rect from "../../utils/Rect";
import { Subject } from "rxjs";

export interface MetaDataEvent<T> {
  key: string;
  value: T;
}

type WindowState = "minimized" | "open" | "maximized" | "spotlighted";

export default class Window {
  private id: string;
  private name: string;
  private zIndex: number;
  private isResizing: boolean;
  private isDragging: boolean;
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private scale: number;
  private changeSubject = new Subject<undefined>();
  private metaDataSubject = new Subject<MetaDataEvent<any>>();
  private positionChangeSubject = new Subject<undefined>();
  private disposeSubject = new Subject<undefined>();
  private metaData = new Map<string, any>();
  private state: WindowState;
  private restoreTo: Rect = { top: 0, left: 0, right: 10, bottom: 10 };

  constructor(name?: string) {
    this.name = name ?? "";
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    if (this.name !== name) {
      this.name = name;
      this.notifyChange();
    }
  }

  getState() {
    return this.state;
  }

  setState(value: WindowState) {
    if (this.state !== value) {
      this.state = value;
      this.notifyChange();
    }
  }

  getX() {
    return this.x;
  }

  setX(x: number) {
    if (this.x !== x) {
      this.x = x;
      this.positionChangeSubject.next();
      this.notifyChange();
    }
  }

  getY() {
    return this.y;
  }

  setY(y: number) {
    if (this.y !== y) {
      this.y = y;
      this.positionChangeSubject.next();
      this.notifyChange();
    }
  }

  getWidth() {
    return this.width;
  }

  setWidth(width: number) {
    if (this.width !== width) {
      this.width = width;
      this.notifyChange();
    }
  }

  getHeight() {
    return this.height;
  }

  setHeight(height: number) {
    if (this.height !== height) {
      this.height = height;
      this.notifyChange();
    }
  }

  getRect() {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width,
    } as Rect;
  }

  setSize(width: number, height: number) {
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

  setPosition(x: number, y: number) {
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

  setScale(scale: number) {
    if (this.scale !== scale) {
      this.scale = scale;
      this.notifyChange();
    }
  }

  getIsDragging() {
    return this.isDragging;
  }

  setIsDragging(isDragging: boolean) {
    if (this.isDragging !== isDragging) {
      this.isDragging = isDragging;
      this.notifyChange();
    }
  }

  getIsResizing() {
    return this.isResizing;
  }

  setIsResizing(isResizing: boolean) {
    if (this.isResizing !== isResizing) {
      this.isResizing = isResizing;
      this.notifyChange();
    }
  }

  getZIndex() {
    return this.zIndex;
  }

  setZIndex(zIndex: number) {
    if (this.zIndex !== zIndex) {
      this.zIndex = zIndex;
      this.notifyChange();
    }
  }

  getMetaData<T>(key: string) {
    return this.metaData.get(key) as T | undefined;
  }

  setMetaData<T>(key: string, value: T) {
    const currentValue = this.metaData.get(key);

    if (currentValue !== value) {
      this.metaData.set(key, value);
      this.metaDataSubject.next({ key, value });
    }
  }

  getRestoreTo() {
    return this.restoreTo;
  }

  setRestoreTo(value: Rect) {
    this.restoreTo = value;
  }

  restore() {
    this.x = this.restoreTo.left;
    this.y = this.restoreTo.top;
    this.height = this.restoreTo.bottom - this.restoreTo.top;
    this.width = this.restoreTo.right - this.restoreTo.left;

    this.positionChangeSubject.next();
    this.notifyChange();
  }

  notifyChange() {
    this.changeSubject.next();
  }

  onMetaDataChange<T>(callback: (event: MetaDataEvent<T>) => void) {
    return this.metaDataSubject.subscribe({ next: callback });
  }

  onChange(callback: () => void) {
    return this.changeSubject.subscribe({ next: callback });
  }

  onPositionChange(callback: () => void) {
    return this.positionChangeSubject.subscribe({
      next: callback,
    });
  }

  onClose(callback: () => void) {
    return this.disposeSubject.subscribe({ next: callback });
  }

  close() {
    this.disposeSubject.next();
    this.dispose();
  }

  private dispose() {
    this.changeSubject.complete();
    this.positionChangeSubject.complete();
    this.metaDataSubject.complete();
    this.disposeSubject.complete();
  }
}
