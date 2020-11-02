import Rect from "../../utils/Rect";
import { Subject } from "rxjs";
import WindowMediator from "./WindowsMediator";

export interface MetaDataEvent<T> {
  key: string;
  value: T;
}

export interface WindowMemento {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  zIndex: number;
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
  isResizable: boolean;
  isMovable: boolean;
}

interface Message<T> {
  type: string;
  payload: T;
}

type WindowState = "minimized" | "open" | "maximized" | "spotlighted";

export default class Window {
  private name = "";
  private zIndex = 0;
  private width = 0;
  private minWidth = 0;
  private minHeight = 0;
  private maxWidth = 0;
  private maxHeight = 0;
  private height = 0;
  private x = 0;
  private y = 0;
  private scale = 1;
  private rotateX = 0;
  private rotateY = 0;
  private rotateZ = 0;
  private isResizable: boolean = true;
  private isMovable: boolean = true;
  private isResizing: boolean = false;
  private isDragging: boolean = false;
  private state: WindowState = "open";
  private changeSubject = new Subject<void>();
  private metaDataSubject = new Subject<MetaDataEvent<any>>();
  private positionChangeSubject = new Subject<undefined>();
  private disposeSubject = new Subject<void>();
  private messageSubject = new Subject<Message<any>>();
  private metaData = new Map<string, any>();
  private isDisabled = false;

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

  getMinWidth() {
    return this.minWidth;
  }

  setMinWidth(value: number) {
    if (value !== this.minWidth) {
      this.minWidth;
      this.width = Math.min(this.width, this.minWidth);
      this.notifyChange();
    }
  }

  getMinHeight() {
    return this.minHeight;
  }

  setMinHeight(value: number) {
    if (value !== this.minHeight) {
      this.minHeight;
      this.height = Math.min(this.height, this.minHeight);
      this.notifyChange();
    }
  }

  getMaxWidth() {
    return this.maxWidth;
  }

  setMaxWidth(value: number) {
    if (value !== this.maxWidth) {
      this.maxWidth;
      this.width = Math.max(this.width, this.maxWidth);
      this.notifyChange();
    }
  }

  getMaxHeight() {
    return this.maxHeight;
  }

  setMaxHeight(value: number) {
    if (value !== this.maxHeight) {
      this.maxHeight;
      this.height = Math.max(this.maxHeight, this.maxHeight);
      this.notifyChange();
    }
  }

  getWidth() {
    return this.width;
  }

  setWidth(width: number) {
    if (this.isResizable && this.width !== width) {
      this.width = width;
      this.notifyChange();
    }
  }

  getHeight() {
    return this.height;
  }

  setHeight(height: number) {
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
      right: this.x + this.width,
    } as Rect;
  }

  setSize(width: number, height: number) {
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

  getIsResizable() {
    return this.isResizable;
  }

  setIsResizable(value: boolean) {
    if (value !== this.isResizable) {
      this.isResizable = value;
      this.notifyChange();
    }
  }

  getIsMovable() {
    return this.isMovable;
  }

  setIsMovable(value: boolean) {
    if (value !== this.isMovable) {
      this.isMovable = value;
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

  restoreTo(memento: WindowMediator) {
    Object.keys(memento).forEach(
      (key) => ((this as any)[key] = (memento as any)[key])
    );
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
      isMovable: this.isMovable,
    };
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

  whenClosed() {
    return new Promise((resolve) => {
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

  postMessage<T>(message: Message<T>) {
    this.messageSubject.next(message);
  }

  onMessage<T>(callback: (message: Message<T>) => void) {
    return this.messageSubject.subscribe({ next: callback });
  }

  close() {
    this.disposeSubject.next();
    this.dispose();
  }

  private dispose() {
    this.changeSubject.complete();
    this.positionChangeSubject.complete();
    this.messageSubject.complete();
    this.metaDataSubject.complete();
    this.disposeSubject.complete();
  }
}
