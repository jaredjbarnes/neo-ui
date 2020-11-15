import TableMediator, { Row } from "./TableMediator";

export default abstract class TableActionState<T> {
  protected context: TableMediator<T>;

  constructor(context: TableMediator<T>) {
    this.context = context;
  }

  abstract performAction(name: string, rows: Row<T>[]): void;
}

export class ActionReadyState<T> extends TableActionState<T> {
  performAction(name: string, rows: Row<T>[]) {}
}

export class ActionPendingState<T> extends TableActionState<T> {
  performAction(name: string, rows: Row<T>[]) {
    // Do nothing.
  }
}

export class ActionErrorState<T> extends TableActionState<T> {
  performAction(name: string, rows: Row<T>[]) {
    // Do nothing.
  }

  retry(){
    
  }
}
