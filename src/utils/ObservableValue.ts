import { Subject } from "rxjs";

export default class ObservableValue<T, TError = any> {
  private valueSubject = new Subject<T>();
  private _value: T;

  readonly errorSubject = new Subject<TError | null>();
  private _error: TError | null = null;

  constructor(initialState: T) {
    this._value = initialState;
  }

  next(value: T) {
    this._value = value;
    return this.valueSubject.next(value);
  }

  getValue() {
    return this._value;
  }

  setValue(value: T) {
    return this.next(value);
  }

  setError(e: TError | null) {
    this._error = e;

    if (e != null) {
      this.errorSubject.next(e);
    }
  }

  getError() {
    return this._error;
  }

  onError(callback: (e: TError | null) => void) {
    return this.errorSubject.subscribe({ next: callback });
  }

  onChange(callback: (value: T) => void) {
    return this.valueSubject.subscribe({ next: callback });
  }

  dispose() {
    this.valueSubject.complete();
    this.errorSubject.complete();
  }
}
