import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type UserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

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

      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (e) {}
  next();
};
