import StatefulSubject from "../../utils/StatefulSubject";

export interface Option<T> {
  id: string;
  label: string;
  value: T;
}

function byId<T>(a: Option<T>, b: Option<T>) {
  if (a.id < b.id) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  } else {
    return 0;
  }
}

export default class SelectMediator<T> {
  dropDownWidth = new StatefulSubject(200);
  dropDownHeight = new StatefulSubject(200);
  isOpen = new StatefulSubject(false);
  filterKeywords = new StatefulSubject("");
  options = new StatefulSubject<Option<T>[]>([]);
  filteredOptions = new StatefulSubject<Option<T>[]>([]);
  selectedOption = new StatefulSubject<Option<T> | null>(null);
  highlightedOption = new StatefulSubject<Option<T> | null>(null);

  moveHighlightDown() {
    const highlightedOption = this.highlightedOption.getValue();

    if (highlightedOption == null) {
      this.highlightedOption.setValue(this.filteredOptions.getValue()[0]);
      return;
    }

    const index = this.filteredOptions.getValue().indexOf(highlightedOption);

    if (index > -1) {
      const nextIndex = Math.min(
        this.filteredOptions.getValue().length - 1,
        index + 1
      );
      this.highlightedOption.setValue(
        this.filteredOptions.getValue()[nextIndex]
      );
    }
  }

  moveHighlightUp() {
    const highlightedOption = this.highlightedOption.getValue();

    if (highlightedOption == null) {
      return;
    }

    const index = this.filteredOptions.getValue().indexOf(highlightedOption);

    if (index > -1) {
      this.highlightedOption.setValue(
        this.filteredOptions.getValue()[index - 1] || null
      );
    }
  }

  highlightOption(option: Option<T> | null) {
    if (option == null) {
      this.highlightedOption.setValue(null);
    }

    if (option?.id !== this.highlightedOption.getValue()?.id) {
      this.highlightedOption.setValue(option);
    }
  }

  selectOption(option: Option<T> | null) {
    if (option == null) {
      this.selectedOption.setValue(option);
      return;
    }

    const index = this.options
      .getValue()
      .findIndex((o) => o.value === option.value);

    if (index > -1) {
      this.selectedOption.setValue(this.options.getValue()[index]);
    }
  }

  deselectOption() {
    if (this.selectedOption.getValue() != null) {
      this.selectedOption.setValue(null);
    }
  }

  setOptions(options: Option<T>[]) {
    if (!this.areOptionsEqual(options)) {
      this.options.setValue(options);
      this.updateFilteredOptions();
    }
  }

  private areOptionsEqual(options: Option<T>[]) {
    const currentOptions = this.options.getValue().slice();
    const newOptions = options.slice();

    currentOptions.sort(byId);
    newOptions.sort(byId);

    return currentOptions.join("|") === newOptions.join("|");
  }

  private updateFilteredOptions() {
    this.filteredOptions.setValue(
      this.options.getValue().filter((option) => {
        return option.label
          .toLowerCase()
          .includes(this.filterKeywords.getValue().toLowerCase());
      })
    );
  }

  filter(keywords: string) {
    if (keywords !== this.filterKeywords.getValue()) {
      this.filterKeywords.setValue(keywords);
      this.updateFilteredOptions();
    }
  }

  open() {
    if (!this.isOpen.getValue()) {
      this.isOpen.setValue(true);
    }
  }

  close() {
    if (this.isOpen.getValue()) {
      this.isOpen.setValue(false);
      this.highlightedOption.setValue(null);
    }
  }

  dispose() {
    this.dropDownWidth.dispose();
    this.dropDownHeight.dispose();
    this.isOpen.dispose();
    this.filterKeywords.dispose();
    this.options.dispose();
    this.filteredOptions.dispose();
    this.selectedOption.dispose();
    this.highlightedOption.dispose();
  }
}
