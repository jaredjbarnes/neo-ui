const hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;

export default class ColorConverter {
  convertToRgba(color: string) {
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

  convertHexToRgba(hex: string) {
    // Reset Regex.
    hexRegEx.lastIndex = 0;

    hex = this.convertToFullHex(hex);
    const result = hexRegEx.exec(hex);

    if (result != null) {
      return `rgba(${parseInt(result[1], 16)},${parseInt(
        result[2],
        16
      )},${parseInt(result[3], 16)}, 1)`;
    } else {
      return null;
    }
  }

  convertRgbToRgba(rgb: string) {
    return rgb.replace("rgb(", "rgba(");
  }

  convertToFullHex(hex: string) {
    if (hex.length === 4) {
      hex = hex + hex.substring(1);
    }
    return hex;
  }

  changeAlpha(color: string, alpha: number) {
    let rgba = this.convertToRgba(color);
    alpha = Math.min(1, alpha);
    alpha = Math.max(0, alpha);

    if (rgba != null) {
      rgba = rgba.replace(" ", "");
      const values = rgba.substring(5, rgba.length - 1);
      const parts = values.split(",");
      return `rgba(${parts[0]},${parts[1]},${parts[2]},${alpha})`;
    }

    return null;
  }

  isHex(hex: string) {
    return hex.trim().indexOf("#") === 0;
  }

  isRgb(rgb: string) {
    return rgb.trim().indexOf("rgb(") === 0;
  }

  isRgba(rgba: string) {
    return rgba.trim().indexOf("rgba(") === 0;
  }
}
