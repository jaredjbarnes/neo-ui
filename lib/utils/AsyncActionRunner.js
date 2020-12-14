"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncActionRunner = exports.Status = void 0;

var _ObservableValue = _interopRequireDefault(require("./ObservableValue"));

var _AsyncAction = require("./AsyncAction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Status; // ActionState and ObservableValue

exports.Status = Status;

(function (Status) {
  Status["INITIAL"] = "initial";
  Status["PENDING"] = "pending";
  Status["ERROR"] = "error";
  Status["SUCCESS"] = "success";
  Status["DISABLED"] = "disabled";
})(Status || (exports.Status = Status = {}));

class AsyncActionRunner extends _ObservableValue.default {
  _internalState = new InitialState(this);
  status = new _ObservableValue.default(Status.INITIAL);

  changeState(state) {
    this._internalState = state;
    this.status.next(state.getName());
  }

  disable() {
    return this._internalState.disable();
  }

  enable() {
    return this._internalState.enable();
  } // Set the action then run, use chaining.


  execute(action) {
    this._internalState.execute(action);
  }

  cancel() {
    return this._internalState.cancel();
  }

  retry() {
    return this._internalState.retry();
  }

  reset() {
    this._internalState.cancel();

    this.setError(null);
    this.changeState(new InitialState(this));
  }

  dispose() {
    super.dispose();
    this.status.dispose();
  }

}

exports.AsyncActionRunner = AsyncActionRunner;

class State {
  constructor(context) {
    this.context = context;
  }

  enable() {// Do Nothing.
  }

  disable() {// Do Nothing.
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  execute(action) {// disabled linter per defining an interface that needs to be followed on other states
    // return Promise.reject<TResult>(new Error('Not yet implemented.'));
    // Do Nothing.
  }

  retry() {// Do nothing
  }

  cancel() {// Do nothing.
  }

}

class InitialState extends State {
  getName() {
    return Status.INITIAL;
  }

  disable() {
    this.context.changeState(new DisabledState(this.context));
  }

  execute(action) {
    this.context.changeState(new PendingState(this.context, action));
  }

}

class PendingState extends State {
  constructor(context, action) {
    super(context);

    this.cancel = function cancel() {
      const executingPromise = action.getExecutingPromise();
      if (!executingPromise) return;
      executingPromise.catch(error => {
        this.context.setError(error);
        this.context.changeState(new ErrorState(this.context, action));
      });
      action.cancelExecution();
    };

    action.execute().then(nextValue => {
      this.context.next(nextValue);
      this.context.changeState(new SuccessState(this.context));
    }).catch(error => {
      if (!(error instanceof _AsyncAction.CancelledError)) {
        this.context.setError(error);
        this.context.changeState(new ErrorState(this.context, action));
      }
    });
  }

  getName() {
    return Status.PENDING;
  }

}

class SuccessState extends State {
  getName() {
    return Status.SUCCESS;
  }

  execute(action) {
    this.context.changeState(new PendingState(this.context, action));
  }

  disable() {
    this.context.changeState(new DisabledState(this.context));
  }

}

class ErrorState extends State {
  constructor(context, action) {
    super(context); // Yes... calling retry() on the action will immindately execute it, and then the pending
    // state will call .execute on it... which is fine, because that will just return the same promise. Booyah.

    this.retry = function retry() {
      action.retry();
      this.context.changeState(new PendingState(this.context, action));
    };
  }

  getName() {
    return Status.ERROR;
  }

  execute(action) {
    this.context.changeState(new PendingState(this.context, action));
  }

  disable() {
    this.context.changeState(new DisabledState(this.context));
  }

}

class DisabledState extends State {
  getName() {
    return Status.DISABLED;
  }

  enable() {
    this.context.changeState(new InitialState(this.context));
  }

}