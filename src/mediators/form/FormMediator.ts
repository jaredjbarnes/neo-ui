import { Subject } from "rxjs";
import Field from "./FieldMediator";
import FieldMediator from "./FieldMediator";

const defaultSubmission = () => {
  return Promise.resolve();
};

const defaultValidation = () => {
  return Promise.resolve();
};

type FieldsEvent = {
  action: "added" | "removed";
  field: FieldMediator<any>;
};

export default class FormMediator {
  private fields: Field<any>[] = [];
  private validation: (form: FormMediator) => Promise<void> = defaultValidation;
  private submission: (form: FormMediator) => Promise<void> = defaultSubmission;
  private submissionError: Error | null = null;
  private validationError: Error | null = null;
  private isValidating = false;
  private isSubmitting = false;

  private submissionErrorSubject: Subject<Error | null> = new Subject();
  private isSubmittingSubject: Subject<boolean> = new Subject();
  private validationErrorSubject: Subject<Error | null> = new Subject();
  private isValidatingSubject: Subject<boolean> = new Subject();
  private changeSubject: Subject<FormMediator> = new Subject();
  private fieldsSubject: Subject<FieldsEvent> = new Subject();

  addField<T>(field: Field<T>) {
    const fieldWithName = this.fields.find(
      (f) => f.getName() === field.getName()
    );

    if (fieldWithName == null) {
      field.onChange(() => {
        this.changeSubject.next(this);
      });
      this.fields.push(field);
      this.fieldsSubject.next({
        action: "added",
        field: field,
      });
    }
  }

  removeField(field: Field<any>) {
    const index = this.fields.indexOf(field);

    if (index > -1) {
      this.fields.splice(index, 1);
      this.fieldsSubject.next({
        action: "removed",
        field: field,
      });
    }
  }

  getFieldByName<T>(name: string) {
    return this.fields.find((f) => f.getName() === name) as Field<T> | null;
  }

  removeFieldByName(name: string) {
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
    }, {} as any);
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

    return this.fields
      .reduce((promise, field) => {
        return promise.then(() => {
          return field.validate();
        });
      }, Promise.resolve<void>(undefined))
      .then(() => {
        return this.validation(this);
      })
      .catch((error) => {
        this.validationErrorSubject.next(error);
        throw error;
      })
      .finally(() => {
        this.isValidating = false;
        this.isValidatingSubject.next(this.isValidating);
      });
  }

  submit() {
    this.isSubmitting = true;
    this.isSubmittingSubject.next(this.isSubmitting);

    return this.validate()
      .then(() => {
        this.fields.forEach((f) => f.setInitialValue(f.getValue()));
        return this.submission(this);
      })
      .catch((error) => {
        this.submissionErrorSubject.next(error);
      })
      .finally(() => {
        this.isSubmitting = false;
        this.isSubmittingSubject.next(this.isSubmitting);
      });
  }

  setSubmission(submission: (form: FormMediator) => Promise<void>) {
    this.submission = submission;
  }

  setValidation(validation: (form: FormMediator) => Promise<void>) {
    this.validation = validation;
  }

  reset() {
    this.fields.forEach((f) => f.reset());
    this.clearErrors();
  }

  onSubmissionError(callback: (error: Error | null) => void) {
    return this.submissionErrorSubject.subscribe({
      next: callback,
    });
  }

  onChange<T>(callback: (form: FormMediator) => void) {
    return this.changeSubject.subscribe({
      next: callback,
    });
  }

  onValidateError(callback: (error: Error | null) => void) {
    return this.validationErrorSubject.subscribe({
      next: callback,
    });
  }

  onFieldsChange(callback: (event: FieldsEvent) => void) {
    return this.fieldsSubject.subscribe({
      next: callback,
    });
  }

  onSubmissionChange(callback: (isSubmitting: boolean) => void) {
    return this.isSubmittingSubject.subscribe({
      next: callback,
    });
  }

  onValidationChange(callback: (isValidating: boolean) => void) {
    return this.isValidatingSubject.subscribe({
      next: callback,
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

    this.fields.forEach((f) => f.dispose());
    this.fields = [];
  }
}
