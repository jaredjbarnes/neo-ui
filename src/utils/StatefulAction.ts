import StatefulValue from "./StatefulValue";
import AsyncAction, { CancelledError } from "./AsyncAction";

export type StateEvent = "ready" | "pending" | "error" | "disabled";

// ActionState

export default class AsyncStatefulValue<T> extends StatefulValue<T> {
  private state: State<T> = new ReadyState(this);

  readonly status = new StatefulValue<StateEvent>("ready");
  readonly action = new StatefulValue<AsyncAction<T> | null>(null);

  changeState(state: State<T>) {
    this.state = state;
    this.status.value = state.getName();
  }

  disable() {
    return this.state.disable();
  }

  enable() {
    return this.state.enable();
  }

  // Set the action then run, use chaining.
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
    this.state.resolveError();
    this.changeState(new ReadyState<T>(this));
  }

  dispose() {
    this.status.dispose();
    this.action.dispose();
  }
}

abstract class State<T> {
  protected context: AsyncStatefulValue<T>;

  constructor(context: AsyncStatefulValue<T>) {
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
    const action = this.context.action.value;

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
    this.context.action.value = action;

    this.context.changeState(new PendingState<T>(this.context));

    return action
      .execute()
      .then((nextValue: T) => {
        this.context.value = nextValue;
        this.context.changeState(new ReadyState<T>(this.context));
        return this.context.value;
      })
      .catch((error: Error) => {
        if (!(error instanceof CancelledError)) {
          this.context.changeState(new ErrorState<T>(this.context));
          this.context.error = error;
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
    this.context.action.value?.cancel();
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(action);
  }

  retry() {
    const action = this.context.action.value;

    if (action != null) {
      return action.execute();
    } else {
      return Promise.reject<T>(new Error("There was no action to retry."));
    }
  }

  cancel() {
    this.context.action.value?.cancel();
    this.context.changeState(new ReadyState(this.context));
  }

  disable() {
    this.context.action.value?.cancel();
    this.context.changeState(new DisabledState(this.context));
  }
}

class ErrorState<T> extends State<T> {
  constructor(context: AsyncStatefulValue<T>) {
    super(context);
  }

  execute(action: AsyncAction<T>) {
    this.context.error = null;
    this.context.changeState(new ReadyState(this.context));
    return this.context.execute(action);
  }

  getName() {
    return "error" as StateEvent;
  }

  retry() {
    this.context.error = null;
    this.context.changeState(new ReadyState(this.context));
    const action = this.context.action.value;

    if (action != null) {
      return this.context.execute(action);
    } else {
      return Promise.reject<T>(new Error("There was no action to retry."));
    }
  }

  resolveError() {
    this.context.error.value = null;
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
