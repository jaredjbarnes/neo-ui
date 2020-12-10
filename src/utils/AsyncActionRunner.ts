import ObservableValue from './ObservableValue';
import { AsyncAction, CancelledError } from './AsyncAction';

export enum Status {
  INITIAL = 'initial',
  PENDING = 'pending',
  ERROR = 'error',
  SUCCESS = 'success',
  DISABLED = 'disabled',
}

// ActionState and ObservableValue
export class AsyncActionRunner<TResult, TError = any> extends ObservableValue<TResult> {
  private _internalState: State<TResult, TError> = new InitialState<TResult, TError>(
    this
  );

  readonly status = new ObservableValue<Status>(Status.INITIAL);

  changeState(state: State<TResult, TError>) {
    this._internalState = state;
    this.status.next(state.getName());
  }

  disable() {
    return this._internalState.disable();
  }

  enable() {
    return this._internalState.enable();
  }

  // Set the action then run, use chaining.
  execute(action: AsyncAction<TResult>) {
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
    this.changeState(new InitialState<TResult, TError>(this));
  }

  dispose() {
    super.dispose();
    this.status.dispose();
  }
}

abstract class State<TResult, TError> {
  protected context: AsyncActionRunner<TResult, TError>;

  constructor(context: AsyncActionRunner<TResult, TError>) {
    this.context = context;
  }

  abstract getName(): Status;

  enable() {
    // Do Nothing.
  }

  disable() {
    // Do Nothing.
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(action: AsyncAction<TResult>) {
    // disabled linter per defining an interface that needs to be followed on other states
    // return Promise.reject<TResult>(new Error('Not yet implemented.'));
    // Do Nothing.
  }

  retry() {
    // Do nothing
  }

  cancel() {
    // Do nothing.
  }
}

class InitialState<TResult, TError> extends State<TResult, TError> {
  getName() {
    return Status.INITIAL;
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }

  execute(action: AsyncAction<TResult>) {
    this.context.changeState(new PendingState<TResult, TError>(this.context, action));
  }
}

class PendingState<TResult, TError> extends State<TResult, TError> {
  constructor(context: AsyncActionRunner<TResult, TError>, action: AsyncAction<TResult>) {
    super(context);

    this.cancel = function cancel() {
      const executingPromise = action.getExecutingPromise();
      if (!executingPromise) return;

      executingPromise.catch((error: TError) => {
        this.context.setError(error);
        this.context.changeState(new ErrorState<TResult, TError>(this.context, action));
      });
      action.cancelExecution();
    };

    action
      .execute()
      .then((nextValue: TResult) => {
        this.context.next(nextValue);
        this.context.changeState(new SuccessState<TResult, TError>(this.context));
      })
      .catch((error: TError) => {
        if (!(error instanceof CancelledError)) {
          this.context.setError(error);
          this.context.changeState(new ErrorState<TResult, TError>(this.context, action));
        }
      });
  }

  getName() {
    return Status.PENDING;
  }
}

class SuccessState<TResult, TError> extends State<TResult, TError> {
  getName() {
    return Status.SUCCESS;
  }

  execute(action: AsyncAction<TResult>) {
    this.context.changeState(new PendingState<TResult, TError>(this.context, action));
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }
}

class ErrorState<TResult, TError> extends State<TResult, TError> {
  constructor(context: AsyncActionRunner<TResult, TError>, action: AsyncAction<TResult>) {
    super(context);

    // Yes... calling retry() on the action will immindately execute it, and then the pending
    // state will call .execute on it... which is fine, because that will just return the same promise. Booyah.
    this.retry = function retry() {
      action.retry();
      this.context.changeState(new PendingState<TResult, TError>(this.context, action));
    };
  }

  getName() {
    return Status.ERROR;
  }

  execute(action: AsyncAction<TResult>) {
    this.context.changeState(new PendingState<TResult, TError>(this.context, action));
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }
}

class DisabledState<TResult, TError> extends State<TResult, TError> {
  getName() {
    return Status.DISABLED;
  }

  enable() {
    this.context.changeState(new InitialState(this.context));
  }
}
