"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ObservableValue = _interopRequireDefault(require("../../utils/ObservableValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function byId(a, b) {
  if (a.id < b.id) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  } else {
    return 0;
  }
}

class SelectMediator {
  opened = new _ObservableValue.default(0);
  closed = new _ObservableValue.default(0);
  dropDownWidth = new _ObservableValue.default(200);
  dropDownHeight = new _ObservableValue.default(200);
  isOpen = new _ObservableValue.default(false);
  filterKeywords = new _ObservableValue.default("");
  options = new _ObservableValue.default([]);
  filteredOptions = new _ObservableValue.default([]);
  selectedOption = new _ObservableValue.default(null);
  highlightedOption = new _ObservableValue.default(null);

  moveHighlightDown() {
    const highlightedOption = this.highlightedOption.getValue();

    if (highlightedOption == null) {
      this.highlightedOption.setValue(this.filteredOptions.getValue()[0]);
      return;
    }

    const index = this.filteredOptions.getValue().indexOf(highlightedOption);

    if (index > -1) {
      const nextIndex = Math.min(this.filteredOptions.getValue().length - 1, index + 1);
      this.highlightedOption.setValue(this.filteredOptions.getValue()[nextIndex]);
    }
  }

  moveHighlightUp() {
    const highlightedOption = this.highlightedOption.getValue();

    if (highlightedOption == null) {
      return;
    }

    const index = this.filteredOptions.getValue().indexOf(highlightedOption);

    if (index > -1) {
      this.highlightedOption.setValue(this.filteredOptions.getValue()[index - 1] || null);
    }
  }

  highlightOption(option) {
    var _this$highlightedOpti;

    if (option == null) {
      this.highlightedOption.setValue(null);
    }

    if ((option === null || option === void 0 ? void 0 : option.id) !== ((_this$highlightedOpti = this.highlightedOption.getValue()) === null || _this$highlightedOpti === void 0 ? void 0 : _this$highlightedOpti.id)) {
      this.highlightedOption.setValue(option);
    }
  }

  selectOption(option) {
    if (option == null) {
      this.selectedOption.setValue(option);
      return;
    }

    const index = this.options.getValue().findIndex(o => o.value === option.value);

    if (index > -1) {
      this.selectedOption.setValue(this.options.getValue()[index]);
    }
  }

  deselectOption() {
    if (this.selectedOption.getValue() != null) {
      this.selectedOption.setValue(null);
    }
  }

  setOptions(options) {
    if (!this.areOptionsEqual(options)) {
      this.options.setValue(options);
      this.updateFilteredOptions();
    }
  }

  areOptionsEqual(options) {
    const currentOptions = this.options.getValue().slice();
    const newOptions = options.slice();
    currentOptions.sort(byId);
    newOptions.sort(byId);
    return currentOptions.join("|") === newOptions.join("|");
  }

  updateFilteredOptions() {
    this.filteredOptions.setValue(this.options.getValue().filter(option => {
      return option.label.toLowerCase().includes(this.filterKeywords.getValue().toLowerCase());
    }));
  }

  filter(keywords) {
    if (keywords !== this.filterKeywords.getValue()) {
      this.filterKeywords.setValue(keywords);
      this.updateFilteredOptions();
      this.highlightedOption.setValue(null);
    }
  }

  open() {
    if (!this.isOpen.getValue()) {
      this.isOpen.setValue(true);
      this.opened.setValue(Date.now());
    }
  }

  close() {
    if (this.isOpen.getValue()) {
      this.isOpen.setValue(false);
      this.closed.setValue(Date.now());
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

exports.default = SelectMediator;