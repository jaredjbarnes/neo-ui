"use strict";

require("core-js/modules/es.promise");

require("core-js/modules/es.promise.finally");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

const defaultSubmission = () => {
  return Promise.resolve();
};

const defaultValidation = () => {
  return Promise.resolve();
};

class FormMediator {
  fields = [];
  validation = defaultValidation;
  submission = defaultSubmission;
  submissionError = null;
  validationError = null;
  isValidating = false;
  isSubmitting = false;
  submissionErrorSubject = new _rxjs.Subject();
  isSubmittingSubject = new _rxjs.Subject();
  validationErrorSubject = new _rxjs.Subject();
  isValidatingSubject = new _rxjs.Subject();
  changeSubject = new _rxjs.Subject();
  fieldsSubject = new _rxjs.Subject();

  addField(field) {
    const fieldWithName = this.fields.find(f => f.getName() === field.getName());

    if (fieldWithName == null) {
      field.onChange(() => {
        this.changeSubject.next(this);
      });
      this.fields.push(field);
      this.fieldsSubject.next({
        action: "added",
        field: field
      });
    }
  }

  removeField(field) {
    const index = this.fields.indexOf(field);

    if (index > -1) {
      this.fields.splice(index, 1);
      this.fieldsSubject.next({
        action: "removed",
        field: field
      });
    }
  }

  getFieldByName(name) {
    return this.fields.find(f => f.getName() === name);
  }

  removeFieldByName(name) {
    const field = this.getFieldByName(name);

    if (field != null) {
      this.removeField(field);
    }
  }

  getFields() {
    return this.fields.slice();
  }

  getValidationError() {
    return this.validationError;
  }

  getSubmissionError() {
    return this.submissionError;
  }

  getValues() {
    return this.fields.reduce((map, f) => {
      map[f.getName()] = f.getValue();
      return map;
    }, {});
  }

  getIsValidating() {
    return this.isValidating;
  }

  getIsSubmitting() {
    return this.isSubmitting;
  }

  validate() {
    this.isValidating = true;
    this.isValidatingSubject.next(this.isValidating);
    return this.fields.reduce((promise, field) => {
      return promise.then(() => {
        return field.validate();
      });
    }, Promise.resolve(undefined)).then(() => {
      return this.validation(this);
    }).catch(error => {
      this.validationErrorSubject.next(error);
      throw error;
    }).finally(() => {
      this.isValidating = false;
      this.isValidatingSubject.next(this.isValidating);
    });
  }

  submit() {
    this.isSubmitting = true;
    this.isSubmittingSubject.next(this.isSubmitting);
    return this.validate().then(() => {
      this.fields.forEach(f => f.setInitialValue(f.getValue()));
      return this.submission(this);
    }).catch(error => {
      this.submissionErrorSubject.next(error);
    }).finally(() => {
      this.isSubmitting = false;
      this.isSubmittingSubject.next(this.isSubmitting);
    });
  }

  setSubmission(submission) {
    this.submission = submission;
  }

  setValidation(validation) {
    this.validation = validation;
  }

  reset() {
    this.fields.forEach(f => f.reset());
    this.clearErrors();
  }

  onSubmissionError(callback) {
    return this.submissionErrorSubject.subscribe({
      next: callback
    });
  }

  onChange(callback) {
    return this.changeSubject.subscribe({
      next: callback
    });
  }

  onValidateError(callback) {
    return this.validationErrorSubject.subscribe({
      next: callback
    });
  }

  onFieldsChange(callback) {
    return this.fieldsSubject.subscribe({
      next: callback
    });
  }

  onSubmissionChange(callback) {
    return this.isSubmittingSubject.subscribe({
      next: callback
    });
  }

  onValidationChange(callback) {
    return this.isValidatingSubject.subscribe({
      next: callback
    });
  }

  clearSubmissionError() {
    this.submissionError = null;
    this.submissionErrorSubject.next(null);
  }

  clearValidationError() {
    this.validationError = null;
    this.validationErrorSubject.next(null);
  }

  clearErrors() {
    this.clearSubmissionError();
    this.clearValidationError();
  }

  dispose() {
    this.validationErrorSubject.complete();
    this.isValidatingSubject.complete();
    this.isSubmittingSubject.complete();
    this.submissionErrorSubject.complete();
    this.changeSubject.complete();
    this.fieldsSubject.complete();
    this.fields.forEach(f => f.dispose());
    this.fields = [];
  }

}

exports.default = FormMediator;