"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

const defaultValidation = () => {
  return Promise.resolve();
};

class FieldMediator {
  value = null;
  name = "";
  label = "";
  error = null;
  validation = defaultValidation;
  hasBeenTouched = false;
  _isFocused = false;
  _initialValue = null;
  message = null;
  changeSubject = new _rxjs.Subject();

  getName() {
    return this.name;
  }

  setName(name) {
    if (name === this.name) {
      return;
    }

    this.name = name;
    this.changeSubject.next(this);
  }

  getLabel() {
    return this.label;
  }

  setLabel(label) {
    if (label === this.label) {
      return;
    }

    this.label = label;
    this.changeSubject.next(this);
  }

  getValue() {
    if (!this.value && !this.hasBeenTouched) {
      return this._initialValue;
    }

    return this.value;
  }

  setValue(value) {
    if (value === this.value) {
      return;
    }

    this.value = value;
    this.changeSubject.next(this);
  }

  getMessage() {
    return this.message;
  }

  setMessage(message) {
    if (message === this.message) {
      return;
    }

    this.message = message;
    this.changeSubject.next(this);
  }

  getInitialValue() {
    return this._initialValue;
  }

  setInitialValue(value) {
    this.value = value;
    this._initialValue = value;
  }

  setError(error) {
    if (error === this.error) {
      return;
    }

    this.error = error;
    this.changeSubject.next(this);
  }

  getError() {
    return this.error;
  }

  clearError() {
    this.error = null;
    this.changeSubject.next(this);
  }

  getValidation() {
    return this.validation;
  }

  setValidation(validation) {
    this.validation = validation;
  }

  clearValidation() {
    this.validation = defaultValidation;
  }

  validate() {
    if (this.validation != null) {
      return this.validation(this.value);
    }

    return Promise.resolve();
  }

  isTouched() {
    return this.hasBeenTouched;
  }

  touch() {
    this.hasBeenTouched = true;
    this.changeSubject.next(this);
  }

  blur() {
    this._isFocused = false;
    this.changeSubject.next(this);
  }

  focus() {
    this._isFocused = true;
    this.changeSubject.next(this);
  }

  isFocused() {
    return this._isFocused;
  }

  reset() {
    this.hasBeenTouched = false;
    this.error = null;
    this.value = this._initialValue;
    this.changeSubject.next(this);
  }

  onChange(callback) {
    return this.changeSubject.subscribe({
      next: callback
    });
  }

  dispose() {
    this.changeSubject.complete();
  }

}

exports.default = FieldMediator;