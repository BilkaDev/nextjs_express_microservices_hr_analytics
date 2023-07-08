import { requireAuth, validationRequest } from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Job } from '../modela/job';

const router = express.Router();

router.post(
  '/api/jobs',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('title')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Title must be between 3 and 15 characters'),
    body('shortDescription')
      .not()
      .isEmpty()
      .withMessage('Short description is required'),
    body('shortDescription')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('Short description must be between 5 and 50 characters'),
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
      .withMessage('companyName must be between 5 and 15 characters')
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const job = Job.build({ ...req.body, userId: req.currentUser!.id });
    await job.save();
    res.status(201).send(job);
  }
);

export { router as createJobRouter };
