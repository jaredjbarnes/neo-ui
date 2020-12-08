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
    if (this.highlightedOption.value == null) {
      this.highlightedOption.value = this.filteredOptions.value[0];
      return;
    }

    const index = this.filteredOptions.value.indexOf(
      this.highlightedOption.value
    );

    if (index > -1) {
      const nextIndex = Math.min(
        this.filteredOptions.value.length - 1,
        index + 1
      );
      this.highlightedOption.value = this.filteredOptions.value[nextIndex];
    }
  }

  moveHighlightUp() {
    if (this.highlightedOption.value == null) {
      return;
    }

    const index = this.filteredOptions.value.indexOf(
      this.highlightedOption.value
    );

    if (index > -1) {
      this.highlightedOption.value =
        this.filteredOptions.value[index - 1] || null;
    }
  }

  highlightOption(option: Option<T> | null) {
    if (option == null) {
      this.highlightedOption.value = null;
    }

    if (option?.id !== this.highlightedOption.value?.id) {
      this.highlightedOption.value = option;
    }
  }

  selectOption(option: Option<T> | null) {
    if (option == null) {
      this.selectedOption.value = option;
      return;
    }

    const index = this.options.value.findIndex((o) => o.value === option.value);

    if (index > -1) {
      this.selectedOption.value = this.options.value[index];
    }
  }

  deselectOption() {
    if (this.selectedOption.value != null) {
      this.selectedOption.value = null;
    }
  }

  setOptions(options: Option<T>[]) {
    if (!this.areOptionsEqual(options)) {
      this.options.value = options;
      this.updateFilteredOptions();
    }
  }

  private areOptionsEqual(options: Option<T>[]) {
    const currentOptions = this.options.value.slice();
    const newOptions = options.slice();

    currentOptions.sort(byId);
    newOptions.sort(byId);

    return currentOptions.join("|") === newOptions.join("|");
  }

  private updateFilteredOptions() {
    this.filteredOptions.value = this.options.value.filter((option) => {
      return option.label
        .toLowerCase()
        .includes(this.filterKeywords.value.toLowerCase());
    });
  }

  filter(keywords: string) {
    if (keywords !== this.filterKeywords.value) {
      this.filterKeywords.value = keywords;
      this.updateFilteredOptions();
    }
  }

  open() {
    if (!this.isOpen.value) {
      this.isOpen.value = true;
    }
  }

  close() {
    if (this.isOpen.value) {
      this.isOpen.value = false;
      this.highlightedOption.value = null;
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
