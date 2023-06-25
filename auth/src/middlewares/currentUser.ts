import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDoc } from '../models/user';

type UserPayload = Pick<UserDoc, 'firstName' | 'lastName' | 'email' | 'id'>;

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    next();
    return;
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (e) {}
  next();
};
