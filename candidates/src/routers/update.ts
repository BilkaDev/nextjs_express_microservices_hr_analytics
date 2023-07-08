import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validationRequest
} from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Candidate } from '../modela/candidate';

const router = express.Router();

router.patch(
  '/api/candidates/:id',
  requireAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Title must be between 3 and 15 characters')
      .optional({ nullable: true }),
    body('shortDescription')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('Short description must be between 5 and 50 characters')
      .optional({ nullable: true }),
    body('longDescription')
      .trim()
      .isLength({ min: 5, max: 250 })
      .withMessage('Long description must be between 5 and 250 characters')
      .optional({ nullable: true }),
    body('logo')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('Logo must be between 5 and 15 characters')
      .optional({ nullable: true }),
    body('companyName')
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage('companyName must be between 5 and 15 characters')
      .optional({ nullable: true }),
    body('position')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Position must be between 3 and 50 characters')
      .optional({ nullable: true })
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const candidateId = req.params.id;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new NotFoundError('Candidate not found');

    if (candidate.userId !== req.currentUser?.id)
      throw new NotAuthorizedError();

    candidate.set(req.body);
    await candidate.save();

    res.status(200).send(candidate);
  }
);

export { router as updateCandidateRouter };
