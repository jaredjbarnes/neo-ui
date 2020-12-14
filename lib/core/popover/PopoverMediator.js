"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const defaultRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0
};
const defaultOffset = {
  x: 0,
  y: 0
};
const defaultPlacement = {
  vertical: "bottom",
  horizontal: "left"
};

class PopoverMediator {
  newPlaceRect = JSON.parse(JSON.stringify(defaultRect));
  nodeRect = defaultRect;
  anchorRect = defaultRect;
  boundingRect = defaultRect;
  offset = defaultOffset;
  placement = defaultPlacement;

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

exports.default = PopoverMediator;