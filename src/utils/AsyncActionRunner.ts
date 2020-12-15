import ObservableValue from './ObservableValue';
import { AsyncAction, CancelledError } from './AsyncAction';

export enum Status {
  INITIAL = 'initial',
  PENDING = 'pending',
  ERROR = 'error',
  SUCCESS = 'success',
  DISABLED = 'disabled',
}

export class AsyncActionRunner<TResult, TError = any> extends ObservableValue<TResult> {
  private _internalState: State<TResult, TError> = new InitialState<TResult, TError>(
    this
  );

  readonly status = new ObservableValue<Status>(Status.INITIAL);
  action: AsyncAction<TResult> | null = null;

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

  execute(action: AsyncAction<TResult>) {
    return this._internalState.execute(action);
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
  execute(action: AsyncAction<TResult>): Promise<TResult> {
    // disabled linter per defining an interface that needs to be followed on other states
    // Throw because this should never be hit.
    return Promise.reject(new Error('Not Yet Implmented'));
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
    this.context.action = action;

    const pendingState = new PendingState<TResult, TError>(this.context);
    this.context.changeState(pendingState);

    return pendingState.executingPromise;
  }
}

class PendingState<TResult, TError> extends State<TResult, TError> {
  private isEnabled = true;
  readonly executingPromise: Promise<TResult>;

  constructor(context: AsyncActionRunner<TResult, TError>) {
    super(context);
    const action = this.context.action;

    if (action == null) {
      throw new Error(
        'Cannot switch to pending state without an action set to the context.'
      );
    }

    this.executingPromise = action
      .execute()
      .then((nextValue: TResult) => {
        this.context.next(nextValue);
        this.context.changeState(new SuccessState<TResult, TError>(this.context));
        return nextValue;
      })
      .catch((error: TError) => {
        if (!(error instanceof CancelledError)) {
          this.context.setError(error);
          this.context.changeState(new ErrorState<TResult, TError>(this.context));
        }

        throw error;
      })
      .finally(() => {
        if (!this.isEnabled) {
          this.context.changeState(new DisabledState<TResult, TError>(this.context));
        }
      });
  }

  cancel() {
    this.context.action?.cancelExecution();
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }

  execute() {
    return this.executingPromise;
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
    this.context.action = action;

    const pendingState = new PendingState<TResult, TError>(this.context);
    this.context.changeState(pendingState);

    return pendingState.executingPromise;
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }
}

class ErrorState<TResult, TError> extends State<TResult, TError> {
  retry() {
    const pendingState = new PendingState<TResult, TError>(this.context);
    this.context.changeState(pendingState);
  }

  getName() {
    return Status.ERROR;
  }

  execute(action: AsyncAction<TResult>) {
    this.context.action = action;

    const pendingState = new PendingState<TResult, TError>(this.context);
    this.context.changeState(pendingState);

    return pendingState.executingPromise;
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }
}

class DisabledState<TResult, TError> extends State<TResult, TError> {
  execute() {
    return Promise.reject(new Error('Cannot execute while runner is disabled.'));
  }

  getName() {
    return Status.DISABLED;
  }

  enable() {
    this.context.changeState(new InitialState(this.context));
  }
}
