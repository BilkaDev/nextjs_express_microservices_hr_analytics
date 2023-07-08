import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validationRequest, ConflictError } from '@bdhranalytics/common';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('firstName').trim().isLength({ min: 3, max: 15 }),
    body('lastName').trim().isLength({ min: 3, max: 15 }),
    body('password')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Password must be between 3 and 15 characters')
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ConflictError('User with given email already exists');
    }

    const user = User.build(req.body);
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName
      },
      process.env.JWT_KEY!
    );

    // Stored it on session object
    req.session = {
      jwt: userJwt
    };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
