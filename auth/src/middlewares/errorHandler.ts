import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(
    '----------------------------------------------------------\n\n',
    err
  );
  if (err instanceof CustomError)
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });

  return res.status(500).send({
    errors: [{ message: 'Something went wrong!' }]
  });
};