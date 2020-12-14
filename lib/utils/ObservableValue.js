"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

class ObservableValue {
  valueSubject = new _rxjs.Subject();
  errorSubject = new _rxjs.Subject();
  _error = null;

  constructor(initialState) {
    this._value = initialState;
  }

  next(value) {
    this._value = value;
    return this.valueSubject.next(value);
  }

  getValue() {
    return this._value;
  }

  setValue(value) {
    return this.next(value);
  }

  setError(e) {
    this._error = e;

    if (e != null) {
      this.errorSubject.next(e);
    }
  }

  getError() {
    return this._error;
  }

  onError(callback) {
    return this.errorSubject.subscribe({
      next: callback
    });
  }

  onChange(callback) {
    return this.valueSubject.subscribe({
      next: callback
    });
  }

  dispose() {
    this.valueSubject.complete();
    this.errorSubject.complete();
  }

}

exports.default = ObservableValue;