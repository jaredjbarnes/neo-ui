"use strict";

require("core-js/modules/es.promise");

require("core-js/modules/es.promise.finally");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncAction = exports.TimeoutError = exports.CancelledError = void 0;

var _rxjs = require("rxjs");

class CancelledError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CancelledError';
  }

}

exports.CancelledError = CancelledError;

class TimeoutError extends CancelledError {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }

}
/**
 * The new and improved PromiseBuilder. Tighter, cleaner, sleeker, faster.
 * @param action Action<T> - Method that returns a promise which resolves to T.
 */


exports.TimeoutError = TimeoutError;

class AsyncAction {
  executingPromise = null;
  rejectExecutingPromise = noop;
  retryLimit = 0;
  useExponentialBackoff = true;
  timeout = null;
  timeoutTimer = null;
  cancelSubject = new _rxjs.Subject();
  _recoverCount = 0;

  constructor(action) {
    this.action = action;
  }

  getExecutingPromise() {
    return this.executingPromise;
  }

  retry() {
    if (this.executingPromise && this.executingPromise.isFinished()) {
      this.executingPromise = null;
      this.rejectExecutingPromise = noop;

      if (this.timeoutTimer) {
        window.clearTimeout(this.timeoutTimer);
      }

      this.cancelSubject = new _rxjs.Subject();
      this._recoverCount = 0;
    }

    return this.execute();
  }
  /**
   * Just a simple getter for the private retryCount value.
   */


  get retryCount() {
    return this._recoverCount;
  }
  /**
   *  Throw an error, making retryCount readonly with the above getter.
   */


  set retryCount(_count) {
    throw new Error('retryCount is readonly.');
  }
  /**
   * Execute the stored action and return the promise.
   */


  execute() {
    if (this.executingPromise == null) {
      // Setup the wrapper promise. This is mainly so we can facilitate retries.
      // We dont resolve this until the action is resolved or retry limit is reached.
      this.executingPromise = makeExtendedPromise(new Promise((resolve, reject) => {
        this.rejectExecutingPromise = reject;
        this.action().then(resolve).catch(error => {
          // Will attempt to retry if it should. If it exhausts retry attempts it will
          // reject the executingAction. if it succeeds then it will resolve the executingAction
          this.retryWithRecovery(error, resolve, this.rejectExecutingPromise);
        });
      })); // Handle cleanup after the wrapper finishes its execution;

      this.executingPromise.catch(noop).finally(() => {
        // Only clear the timeout timer when the outer promise finishes.
        if (this.timeoutTimer != null) {
          window.clearTimeout(Number(this.timeoutTimer));
          this.timeoutTimer = null;
        }
      }); // Setup the timeout timer if we have timeout enabled.

      if (this.timeout != null) {
        const time = this.timeout;
        this.timeoutTimer = window.setTimeout(() => {
          this.cancelExecution(new TimeoutError("Promise timed out after ".concat(time)));
        }, time);
      }
    }

    return this.executingPromise;
  }
  /**
   * Handles retry attempts. If it enounters a CancelledError or TimeoutError it will stop.
   * If it fails the shouldRecover check, it will stop.
   * @param error Error | CancelledError | TimeoutError
   * @param resolve Resolve<T> - The outer resolve (from the current `executingAction`)
   * @param reject Reject - The outer reject (from the current `executingAction`)
   */


  async retryWithRecovery(error, resolve, reject) {
    let shouldRecover = // Only if AsyncAction hasn't been cancelled.
    // `value` is a private variable... which is stupid, and I do what I want.
    this.cancelSubject.thrownError === null && ( // User definable recovery strategy
    await this.shouldRecover(error, this._recoverCount, this.retryLimit));
    if (!shouldRecover) return reject(error); // It is now officially retrying.

    ++this._recoverCount;
    await this.maybeDelay();

    try {
      const result = await this.action();
      resolve(result);
    } catch (err) {
      this.retryWithRecovery(err, resolve, reject);
    }
  }
  /**
   * The default recovery strategy.
   */


  async shouldRecover(_error, retryCount, retryLimit) {
    return retryLimit != null ? retryCount < retryLimit : false;
  }
  /**
   * Handles exponential backoff if its set, otherwise resolves immediately (no delay);
   */


  maybeDelay() {
    if (this.useExponentialBackoff) {
      return new Promise(resolve => {
        const time = (Math.pow(2, this._recoverCount) - 1) / 2 * 100;
        window.setTimeout(resolve, time);
      });
    }

    return Promise.resolve();
  }
  /**
   * Cancel the current executing action if there is one.
   * This method is also used internally by timeout to cancel with a TimeoutError.
   */


  cancelExecution() {
    let reason = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Cancelled';
    if (this.executingPromise == null || this.executingPromise.isFinished()) return;
    const error = typeof reason === 'string' ? new CancelledError(reason) : reason;
    this.rejectExecutingPromise(error);
    this.cancelSubject.error(error);
  }
  /**
   * Subscribe to cancellation event and execute your own logic when cancellation happens.
   * @param callback onCancel handler. This method will be invoked when cancel is called.
   * @returns Subscription
   */


  onCancel(callback) {
    return this.cancelSubject.subscribe({
      error: callback
    });
  }
  /**
   * Attach a timeout in milliseconds. This timeout is inclusive of retries. This means
   * that an action execution can timeout even though it may be in the middle of retrying.
   */


  timeoutIn(time) {
    this.timeout = time;
    return this;
  }
  /**
   * Enable retries. Disabled by default. You can pass either a simple number to define number
   * of retry attempts, or you can use your own custom recovery strategy to fit any scenario.
   * Enable exponential backoff to gradually increase the time between retry attempts.
   */


  setRecoverStrategy(amountOrRecoveryStrategy) {
    let useExponentialBackoff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    this.useExponentialBackoff = useExponentialBackoff;

    if (isNumber(amountOrRecoveryStrategy)) {
      this.retryLimit = amountOrRecoveryStrategy;
    } else {
      this.shouldRecover = async function () {
        return await amountOrRecoveryStrategy(...arguments);
      };
    }

    return this;
  }
  /**
   * Works almost just like `Promise.resolve()`.
   * AsyncAction.resolve(VALUE).execute()
   * @param value Resolved value
   */


  static resolve(value) {
    return new AsyncAction(() => {
      return Promise.resolve(value);
    });
  }
  /**
   * Works almost just like `Promise.reject()`
   * AsyncAction.reject(ERROR).execute()
   * @param error The rejection reason.
   */


  static reject(error) {
    return new AsyncAction(() => {
      return Promise.reject(error);
    });
  }

} // Some simple helpers

/**
 * For narrowing type in the retry method.
 * @param it number | RecoverStrategy
 */


exports.AsyncAction = AsyncAction;

function isNumber(it) {
  return typeof it === 'number';
}
/**
 * A function that does absolutely nothing. :)
 */


function noop() {}
/**
 * Turns a normal promise into an extended promise which tracks the promises status.
 */


function makeExtendedPromise(promise) {
  // Set initial state
  let isPending = true;
  let isRejected = false;
  let isFulfilled = false;
  let isFinished = false; // Observe the promise, saving the fulfillment in the closure scope.

  const extendedPromise = promise.then(v => {
    isPending = false;
    isFulfilled = true;
    isFinished = true;
    return v;
  }).catch(e => {
    isPending = false;
    isRejected = true;
    isFinished = true;
    throw e;
  });

  extendedPromise.isPending = () => isPending;

  extendedPromise.isFulfilled = () => isFulfilled;

  extendedPromise.isRejected = () => isRejected;

  extendedPromise.isFinished = () => isFinished;

  return extendedPromise;
}