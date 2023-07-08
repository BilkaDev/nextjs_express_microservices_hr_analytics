import { requireAuth, validationRequest } from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Candidate } from '../modela/candidate';

const router = express.Router();

router.post(
  '/api/candidates',
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('name')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Name must be between 3 and 15 characters'),
    body('shortDescription')
      .not()
      .isEmpty()
      .withMessage('Short description is required'),
    body('shortDescription')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('Short description must be between 5 and 15 characters'),
    body('longDescription')
      .not()
      .isEmpty()
      .withMessage('Long description is required'),
    body('longDescription')
      .trim()
      .isLength({ min: 5, max: 250 })
      .withMessage('Long description must be between 5 and 250 characters'),
    body('logo').not().isEmpty().withMessage('Logo is required'),
    body('logo')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('Logo must be between 5 and 15 characters'),
    body('companyName').not().isEmpty().withMessage('Company name is required'),
    body('companyName')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('companyName must be between 5 and 15 characters'),
    body('position').not().isEmpty().withMessage('Position is required'),
    body('position')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Position must be between 3 and 50 characters')
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const candidate = Candidate.build({
      ...req.body,
      userId: req.currentUser!.id
    });
    await candidate.save();
    res.status(201).send(candidate);
  }
);

export { router as createCandidatesRouter };
