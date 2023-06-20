import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError, DatabaseConnectionError } from '../errors';

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    console.log('creating a  user!');
    throw new DatabaseConnectionError();
    res.send({});
  }
);

export { router as signupRouter };
