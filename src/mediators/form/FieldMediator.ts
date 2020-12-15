import { Subject } from "rxjs";

const defaultValidation = () => {
  return Promise.resolve();
};

export class FieldMediator<T> {
  private value: T | null = null;
  private name: string = "";
  private label: string = "";
  private error: Error | null = null;
  private validation: (value: T | null) => Promise<void> = defaultValidation;
  private hasBeenTouched: boolean = false;
  private _isFocused: boolean = false;
  private _initialValue: T | null = null;
  private message: string | null = null;

  private changeSubject = new Subject<FieldMediator<T>>();

  getName() {
    return this.name;
  }

  setName(name: string) {
    if (name === this.name) {
      return;
    }

    this.name = name;
    this.changeSubject.next(this);
  }

  getLabel() {
    return this.label;
  }

  setLabel(label: string) {
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

  setValue(value: T) {
    if (value === this.value) {
      return;
    }

    this.value = value;
    this.changeSubject.next(this);
  }

  getMessage() {
    return this.message;
  }

  setMessage(message: string | null) {
    if (message === this.message) {
      return;
    }

    this.message = message;
    this.changeSubject.next(this);
  }

  getInitialValue() {
    return this._initialValue;
  }

  setInitialValue(value: T | null) {
    this.value = value;
    this._initialValue = value;
  }

  setError(error: Error) {
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

  setValidation(validation: (value: T | null) => Promise<void>) {
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

  onChange(callback: (fieldMediator: FieldMediator<T>) => void) {
    return this.changeSubject.subscribe({
      next: callback,
    });
  }

  dispose() {
    this.changeSubject.complete();
  }
}
