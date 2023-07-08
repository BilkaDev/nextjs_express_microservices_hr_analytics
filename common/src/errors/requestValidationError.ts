import { ValidationError } from 'express-validator';

import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public readonly errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.reduce<Array<{ message: string; field: string }>>(
      (acc, err) => {
        if (err.type === 'field') {
          acc = [...acc, { message: err.msg, field: err.path }];
        }
        return acc;
      },
      []
    );
  }
}
