import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validationRequest
} from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Job } from '../modela/job';

const router = express.Router();

router.patch(
  '/api/jobs/:id',
  requireAuth,
  [
    body('title')
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
      .optional({ nullable: true })
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) throw new NotFoundError('Job not found');

    if (job.userId !== req.currentUser?.id) throw new NotAuthorizedError();

    job.set(req.body);
    await job.save();

    res.status(200).send(job);
  }
);

export { router as updateJobRouter };
