import StatefulSubject from "../../utils/StatefulSubject";

export interface IRect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

export interface IAnchorPlacement {
  horizontal: "center" | "left" | "right";
  vertical: "center" | "top" | "bottom";
}

export interface IOffset {
  x: number;
  y: number;
}

const defaultRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
};

const defaultOffset: IOffset = {
  x: 0,
  y: 0,
};

const defaultPlacement: IAnchorPlacement = {
  vertical: "bottom",
  horizontal: "left",
};

export default class PopoverMediator {
  private newPlaceRect: IRect = JSON.parse(JSON.stringify(defaultRect));

  nodeRect: IRect = defaultRect;
  anchorRect: IRect = defaultRect;
  boundingRect: IRect = defaultRect;
  offset: IOffset = defaultOffset;
  placement: IAnchorPlacement = defaultPlacement;

  getPosition() {
    this.positionToAnchor();
    this.keepWithinBounds();

    return this.newPlaceRect;
  }

  positionToAnchor() {
    let top;
    let left;

    if (this.placement.vertical === "center") {
      top = Math.floor(this.anchorRect.top + this.anchorRect.height / 2);
    } else {
      top = this.anchorRect[this.placement.vertical];
    }

    if (this.placement.horizontal === "center") {
      left = Math.floor(this.anchorRect.left + this.anchorRect.width / 2);
    } else {
      left = this.anchorRect[this.placement.horizontal];
    }

    this.newPlaceRect.top = top + this.offset.y;
    this.newPlaceRect.left = left + this.offset.x;
    this.newPlaceRect.right = this.newPlaceRect.left + this.nodeRect.width;
    this.newPlaceRect.bottom = this.newPlaceRect.top + this.nodeRect.height;
    this.newPlaceRect.width = this.newPlaceRect.right - this.newPlaceRect.left;
    this.newPlaceRect.height = this.newPlaceRect.bottom - this.newPlaceRect.top;
  }

  keepWithinBounds() {
    if (this.newPlaceRect.top < this.boundingRect.top) {
      const difference = this.boundingRect.top - this.newPlaceRect.top;
      this.newPlaceRect.top += difference;
      this.newPlaceRect.bottom += difference;
    }

    if (this.newPlaceRect.right > this.boundingRect.right) {
      const difference = this.newPlaceRect.right - this.boundingRect.right;
      this.newPlaceRect.left -= difference;
      this.newPlaceRect.right -= difference;
    }

    if (this.newPlaceRect.left < this.boundingRect.left) {
      const difference = this.boundingRect.left - this.newPlaceRect.left;
      this.newPlaceRect.left += difference;
      this.newPlaceRect.right += difference;
    }

    if (this.newPlaceRect.bottom > this.boundingRect.bottom) {
      const difference = this.newPlaceRect.bottom - this.boundingRect.bottom;
      this.newPlaceRect.top -= difference;
      this.newPlaceRect.bottom -= difference;
    }
  }
}
