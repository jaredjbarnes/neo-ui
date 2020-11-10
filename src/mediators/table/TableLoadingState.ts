import TableMediator from "./TableMediator";

export default abstract class TableLoadingState<T> {
  protected context: TableMediator<T>;

  constructor(context: TableMediator<T>) {
    this.context = context;
  }

  abstract loadNextBatch(): void;
  abstract reset(): void;
}

export class LoadingReadyState<T> extends TableLoadingState<T> {
  loadNextBatch() {
    const onLoad = this.context.getOnLoad();
    const rows = this.context.getRows();
    const sorts = this.context.getSorts();
    const keywords = this.context.getKeywords();

    this.context.changeLoadingStateToPending();

    this.context.loadingAsyncAction = onLoad({
      rows,
      sorts,
      keywords,
    });

    this.context.loadingAsyncAction
      .execute()
      .then((response) => {
        if (!response.isLast) {
          this.context.changeLoadingStateToReady();
        } else {
          this.context.changeLoadingStateToFinished();
        }

        this.context.loadRows(response.data);
      })
      .catch(() => {});
  }

  reset() {
    this.context.clearRows();
    this.context.deselectAllRows();
  }
}

export class LoadingPendingState<T> extends TableLoadingState<T> {
  loadNextBatch() {
    // Do nothing.
  }
  reset() {
    this.context.loadingAsyncAction?.cancel();

    this.context.clearRows();
    this.context.deselectAllRows();
    this.context.changeLoadingStateToReady();
  }
}

export class LoadingFinishedState<T> extends TableLoadingState<T> {
  loadNextBatch() {
    // Do nothing
  }

  reset() {
    this.context.clearRows();
    this.context.deselectAllRows();
    this.context.changeLoadingStateToReady();
  }
}
