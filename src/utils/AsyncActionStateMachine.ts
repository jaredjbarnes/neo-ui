import { Subject } from "rxjs";
import AsyncAction from "../utils/AsyncAction";

type StateEvent = "ready" | "pending" | "error" | "disabled" | string;

export abstract class AsyncActionStateMachine<T> {
  protected state: State<T> = new ReadyState(this);
  protected subject = new Subject<StateEvent>();
  protected action: AsyncAction<T>;
  protected value: T | null;

  getAction() {
    return this.action;
  }

  setAction(action: AsyncAction<T>) {
    this.action = action;
  }

  changeState(state: State<T>) {
    this.state = state;
    this.subject.next(state.getName());
  }

  getState() {
    return this.state;
  }

  disable() {
    this.cancel();
    this.changeState(new DisabledState(this));
  }

  enable() {
    if (this.state.getName() === "disabled") {
      this.changeState(new ReadyState(this));
    }
  }

  execute(action: AsyncAction<T>) {
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

  getError() {
    return this.state.getError();
  }
}

abstract class State<T> {
  protected subject = new Subject<StateEvent>();
  protected context: AsyncActionStateMachine<T>;

  constructor(context: AsyncActionStateMachine<T>) {
    this.context = context;
  }

  abstract getName(): string;

  execute(action: AsyncAction<T>) {
    // Do nothing.
  }
  cancel() {
    // Do nothing.
  }
  retry() {
    // Do nothing.
  }
  resolveError() {
    // Do nothing.
  }
  getError() {
    return null;
  }
}

class ReadyState<T> extends State<T> {
  getName() {
    return "ready";
  }

  execute(action: AsyncAction<T>) {
    this.context.setAction(action);

    this.context.changeState(new PendingState(this.context));
    return action
      .execute()
      .then(() => {
        this.context.changeState(new ReadyState(this.context));
      })
      .catch((error) => {
        this.context.changeState(new ErrorState(this.context, error));
      });
  }
}

class PendingState<T> extends State<T> {
  getName() {
    return "pending";
  }

  cancel() {
    this.context.getAction().cancel();
    this.context.changeState(new ReadyState(this.context));
  }
}

class ErrorState<T> extends State<T> {
  private error: Error;
  constructor(context: AsyncActionStateMachine<T>, error: Error) {
    super(context);
    this.error = error;
  }

  getName() {
    return "error";
  }

  getError() {
    return this.error;
  }

  retry() {
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(this.context.getAction());
  }

  resolveError() {
    return this.context.changeState(new ReadyState(this.context));
  }
}

class DisabledState<T> extends State<T> {
  getName() {
    return "disabled";
  }
}
