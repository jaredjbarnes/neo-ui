import { Subject } from "rxjs";
import AsyncAction, { CancelledError } from "../utils/AsyncAction";

export type StateEvent = "ready" | "pending" | "error" | "disabled";

export default class AsyncActionStateMachine<T> {
  private state: State<T> = new ReadyState(this);
  private stateSubject = new Subject<StateEvent>();
  private valueSubject = new Subject<T | null>();
  private errorSubject = new Subject<Error | null>();
  private action: AsyncAction<T> | null = null;
  private value: T | null = null;
  private error: Error | null = null;

  getAction() {
    return this.action;
  }

  setAction(action: AsyncAction<T>) {
    this.action = action;
  }

  getValue() {
    return this.value;
  }

  setValue(value: T | null) {
    if (value !== this.value) {
      this.value = value;
      this.valueSubject.next(value);
    }
  }

  getError() {
    return this.error;
  }

  setError(error: Error | null) {
    if (error != this.error) {
      this.error = error;
      this.errorSubject.next(error);
    }
  }

  getState() {
    return this.state;
  }

  changeState(state: State<T>) {
    this.state = state;
    this.stateSubject.next(state.getName());
  }

  getStateName() {
    return this.state.getName();
  }

  disable() {
    return this.state.disable();
  }

  enable() {
    return this.state.enable();
  }

  execute(action: AsyncAction<T>): Promise<T> {
    return this.state.execute(action);
  }

  cancel() {
    return this.state.cancel();
  }

  retry() {
    return this.state.retry();
  }

  resolveError() {
    return this.state.resolveError();
  }

  restore() {
    this.state.cancel();
    this.changeState(new ReadyState<T>(this));
  }

  onStateChange(callback: (event: StateEvent) => void) {
    return this.stateSubject.subscribe({ next: callback });
  }

  onValueChange(callback: (value: T | null) => void) {
    return this.valueSubject.subscribe({ next: callback });
  }

  onErrorChange(callback: (error: Error | null) => void) {
    return this.errorSubject.subscribe({ next: callback });
  }

  dispose() {
    this.stateSubject.complete();
  }
}

abstract class State<T> {
  protected subject = new Subject<StateEvent>();
  protected context: AsyncActionStateMachine<T>;

  constructor(context: AsyncActionStateMachine<T>) {
    this.context = context;
  }

  abstract getName(): StateEvent;

  enable() {
    // Do Nothing.
  }

  disable() {
    // Do Nothing.
  }

  execute(action: AsyncAction<T>) {
    return Promise.reject<T>(new Error("Not yet implemented."));
  }

  cancel() {
    // Do nothing.
  }

  retry() {
    const action = this.context.getAction();

    if (action) {
      return action.execute();
    } else {
      return Promise.reject<T>(new Error("There was no action to retry."));
    }
  }

  resolveError() {
    // Do nothing.
  }
}

class ReadyState<T> extends State<T> {
  getName() {
    return "ready" as StateEvent;
  }

  disable() {
    this.context.changeState(new DisabledState<T>(this.context));
  }

  execute(action: AsyncAction<T>) {
    this.context.setAction(action);

    this.context.changeState(new PendingState<T>(this.context));
    const result = action.execute();

    return result
      .then((value: T) => {
        this.context.changeState(new ReadyState<T>(this.context));
        this.context.setValue(value);
        return value;
      })
      .catch((error: Error) => {
        if (!(error instanceof CancelledError)) {
          this.context.changeState(new ErrorState<T>(this.context, error));
          this.context.setError(error);
        }

        throw error;
      });
  }
}

class PendingState<T> extends State<T> {
  getName() {
    return "pending" as StateEvent;
  }

  execute(action: AsyncAction<T>) {
    this.context.getAction()?.cancel();
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(action);
  }

  retry() {
    const action = this.context.getAction();

    if (action != null) {
      return action.execute();
    } else {
      return Promise.reject<T>(new Error("There was no action to retry."));
    }
  }

  cancel() {
    this.context?.getAction()?.cancel();
    this.context.changeState(new ReadyState(this.context));
  }

  disable() {
    this.context?.getAction()?.cancel();
    this.context.changeState(new DisabledState(this.context));
  }
}

class ErrorState<T> extends State<T> {
  private error: Error;

  constructor(context: AsyncActionStateMachine<T>, error: Error) {
    super(context);
    this.error = error;
  }

  execute(action: AsyncAction<T>) {
    this.context.setError(null);
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(action);
  }

  getName() {
    return "error" as StateEvent;
  }

  retry() {
    this.context.setError(null);
    this.context.changeState(new ReadyState(this.context));
    const action = this.context.getAction();

    if (action != null) {
      return this.context.execute(action);
    } else {
      return Promise.reject<T>(new Error("There was no action to retry."));
    }
  }

  resolveError() {
    this.context.setError(null);
    return this.context.changeState(new ReadyState(this.context));
  }

  disable() {
    this.context.changeState(new DisabledState(this.context));
  }
}

class DisabledState<T> extends State<T> {
  getName() {
    return "disabled" as StateEvent;
  }

  execute() {
    return Promise.reject<T>(
      new Error("Cannot execute the action, it is disabled.")
    );
  }

  retry() {
    return Promise.reject<T>(
      new Error("Cannot retry the action, it is disabled.")
    );
  }

  enable() {
    this.context.changeState(new ReadyState(this.context));
  }
}
