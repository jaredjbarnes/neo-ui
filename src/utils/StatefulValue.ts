import { Subject } from "rxjs";

export default class StatefulValue<T, TError = any> {
  private subject = new Subject<T>();
  private _value: T;
  private _error: any = null;

  constructor(defaultState: T) {
    this._value = defaultState;
  }

  get error() {
    return this._error;
  }

  set error(error: TError) {
    this._error = error;
    this.subject.error(error);
  }

  get value() {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
    this.subject.next(value);
  }

  onChange(callback: (value: T) => void) {
    return this.subject.subscribe({ next: callback });
  }

  onError(callback: (error: Error) => void) {
    return this.subject.subscribe({ error: callback });
  }

  dispose() {
    this.subject.complete();
  }
}
