import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { BadRequestError, RequestValidationError } from '../errors';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Password must be between 3 and 15 characters')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build(req.body);
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
