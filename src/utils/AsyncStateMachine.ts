import StatefulSubject from './StatefulSubject';
import { AsyncAction, CancelledError } from './AsyncAction';

export type StateEvent = 'ready' | 'pending' | 'error' | 'disabled';

// ActionState and StatefulSubject
export class AsyncStateMachine<TResult, TError = any> extends StatefulSubject<TResult> {
  private _internalState: State<TResult, TError> = new ReadyState<TResult, TError>(this);

  readonly status = new StatefulSubject<StateEvent>('ready');
  readonly action = new StatefulSubject<AsyncAction<TResult> | null>(null);

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
  execute(action: AsyncAction<TResult>): Promise<TResult> {
    return this._internalState.execute(action);
  }

  cancel() {
    return this._internalState.cancel();
  }

  retry() {
    return this._internalState.retry();
  }

  resolveError() {
    return this._internalState.resolveError();
  }

  restore() {
    this._internalState.cancel();
    this._internalState.resolveError();
    this.changeState(new ReadyState<TResult, TError>(this));
  }

  dispose() {
    super.dispose();
    this.status.dispose();
    this.action.dispose();
  }
}

abstract class State<TResult, TError> {
  protected context: AsyncStateMachine<TResult, TError>;

  constructor(context: AsyncStateMachine<TResult, TError>) {
    this.context = context;
  }

  abstract getName(): StateEvent;

  enable() {
    // Do Nothing.
  }

  disable() {
    // Do Nothing.
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(action: AsyncAction<TResult>) {
    // disabled linter per defining an interface that needs to be followed on other states
    return Promise.reject<TResult>(new Error('Not yet implemented.'));
  }

  cancel() {
    // Do nothing.
  }

  retry() {
    const action = this.context.action.getValue();

    if (action) {
      return action.execute();
    } else {
      return Promise.reject<TResult>(new Error('There was no action to retry.'));
    }
  }

  resolveError() {
    // Do nothing.
  }
}

class ReadyState<TResult, TError> extends State<TResult, TError> {
  getName() {
    return 'ready' as StateEvent;
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }

  execute(action: AsyncAction<TResult>) {
    this.context.action.next(action);

    this.context.changeState(new PendingState<TResult, TError>(this.context));

    return action
      .execute()
      .then((nextValue: TResult) => {
        this.context.next(nextValue);
        this.context.changeState(new ReadyState<TResult, TError>(this.context));
        return this.context.getValue();
      })
      .catch((error: TError) => {
        if (!(error instanceof CancelledError)) {
          this.context.changeState(new ErrorState<TResult, TError>(this.context));
          this.context.error(error);
        }

        throw error;
      });
  }
}

class PendingState<TResult, TError> extends State<TResult, TError> {
  getName() {
    return 'pending' as StateEvent;
  }

  execute(action: AsyncAction<TResult>) {
    this.context.action.getValue()?.cancelExecution();
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(action);
  }

  retry() {
    const action = this.context.action.getValue();

    if (action != null) {
      return action.execute();
    } else {
      return Promise.reject<TResult>(new Error('There was no action to retry.'));
    }
  }

  cancel() {
    this.context.action.getValue()?.cancelExecution();
    this.context.changeState(new ReadyState<TResult, TError>(this.context));
  }

  disable() {
    this.context.action.getValue()?.cancelExecution();
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }
}

class ErrorState<TResult, TError> extends State<TResult, TError> {
  execute(action: AsyncAction<TResult>) {
    this.context.error(null);
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(action);
  }

  getName() {
    return 'error' as StateEvent;
  }

  retry() {
    this.context.error(null);
    this.context.changeState(new ReadyState(this.context));
    const action = this.context.action.getValue();

    if (action != null) {
      return this.context.execute(action);
    } else {
      return Promise.reject<TResult>(new Error('There was no action to retry.'));
    }
  }

  resolveError() {
    this.context.error(null);
    return this.context.changeState(new ReadyState(this.context));
  }

  disable() {
    this.context.changeState(new DisabledState<TResult, TError>(this.context));
  }
}

class DisabledState<TResult, TError> extends State<TResult, TError> {
  getName() {
    return 'disabled' as StateEvent;
  }

  execute() {
    return Promise.reject<TResult>(
      new Error('Cannot execute the action, it is disabled.')
    );
  }

  retry() {
    return Promise.reject<TResult>(new Error('Cannot retry the action, it is disabled.'));
  }

  enable() {
    this.context.changeState(new ReadyState(this.context));
  }
}
