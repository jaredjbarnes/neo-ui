import delayAsync from "./delayAsync";
export class CancelledError extends Error {}

type OnCancelCallback = (reason: string | CancelledError) => void;

export default class AsyncAction<T> {
  private action: (asyncAction: AsyncAction<T>) => Promise<T>;
  private promise: Promise<T> | null = null;
  private reject: (reason: any) => void = () => {};
  private error: Error | null = null;
  private onCancelCallbacks: OnCancelCallback[] = [];

  constructor(action: (asyncAction: AsyncAction<T>) => Promise<T>) {
    this.action = action;
  }

  execute() {
    // This is a defferred execution, and it should only happen if someone is interested in the result.
    // Finally cleans up promise and allows for the developer to execute again.
    if (this.promise == null) {
      this.onCancelCallbacks = [];
      this.promise = new Promise((resolve, reject) => {
        this.reject = reject;
        this.action(this)
          .then(resolve)
          .catch((error) => {
            this.error = error;
            reject(error);
          })
          .finally(() => (this.promise = null));
      });
    }

    return this.promise;
  }

  getError() {
    return this.error;
  }

  cancel(reason = "Cancelled") {
    const error = new CancelledError(reason);
    this.reject(error);

    this.onCancelCallbacks.forEach((callback) => callback(error));
  }

  onCancel(callback: OnCancelCallback) {
    this.onCancelCallbacks.push(callback);
  }

  static delay<T>(milliseconds: number, value: T) {
    return new AsyncAction<T>(() => {
      return delayAsync<T>(milliseconds, value);
    });
  }

  static resolve<T>(value: T) {
    return new AsyncAction<T>(() => {
      return Promise.resolve<T>(value);
    });
  }

  static reject<T>(error: Error) {
    return new AsyncAction<T>(() => {
      return Promise.reject(error);
    });
  }
}
