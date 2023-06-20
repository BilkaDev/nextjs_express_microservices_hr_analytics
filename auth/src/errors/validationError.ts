import { CustomError } from './customError';

export class ValidationError extends CustomError {
  statusCode = 404;

  constructor(private readonly customMessage?: string) {
    super('Validation error');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.customMessage ?? '' }];
  }
}
