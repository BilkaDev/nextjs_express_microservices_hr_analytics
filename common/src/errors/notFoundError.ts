import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(private readonly customMessage?: string) {
    super('Not Found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.customMessage ?? 'Not found' }];
  }
}
