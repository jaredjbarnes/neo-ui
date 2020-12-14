"use strict";

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

class ColorConverter {
  convertToRgba(color) {
    if (this.isHex(color)) {
      return this.convertHexToRgba(color);
    } else if (this.isRgb(color)) {
      return this.convertRgbToRgba(color);
    } else if (this.isRgba(color)) {
      return color;
    } else {
      return color;
    }
  }

  convertHexToRgba(hex) {
    // Reset Regex.
    hexRegEx.lastIndex = 0;
    hex = this.convertToFullHex(hex);
    const result = hexRegEx.exec(hex);

    if (result != null) {
      return "rgba(".concat(parseInt(result[1], 16), ",").concat(parseInt(result[2], 16), ",").concat(parseInt(result[3], 16), ", 1)");
    } else {
      return null;
    }
  }

  convertRgbToRgba(rgb) {
    return rgb.replace("rgb(", "rgba(");
  }

  convertToFullHex(hex) {
    if (hex.length === 4) {
      hex = hex + hex.substring(1);
    }

    return hex;
  }

  changeAlpha(color, alpha) {
    let rgba = this.convertToRgba(color);
    alpha = Math.min(1, alpha);
    alpha = Math.max(0, alpha);

    if (rgba != null) {
      rgba = rgba.replace(" ", "");
      const values = rgba.substring(5, rgba.length - 1);
      const parts = values.split(",");
      return "rgba(".concat(parts[0], ",").concat(parts[1], ",").concat(parts[2], ",").concat(alpha, ")");
    }

    return null;
  }

  isHex(hex) {
    return hex.trim().indexOf("#") === 0;
  }

  isRgb(rgb) {
    return rgb.trim().indexOf("rgb(") === 0;
  }

  isRgba(rgba) {
    return rgba.trim().indexOf("rgba(") === 0;
  }

}

exports.default = ColorConverter;