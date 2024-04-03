type ErrorMessage = {
  message: string;
  field: string;
};

export type OutputErrorsType = {
  errorsMessages: ErrorMessage[];
};

export class ErrorsMessages {
  private errors: OutputErrorsType = {
    errorsMessages: [],
  };
  getErrors = () => {
    return this.errors;
  };

  addErrorsMessage = (errorsMessage: ErrorMessage) => {
    this.errors.errorsMessages.push(errorsMessage);
  };
}
