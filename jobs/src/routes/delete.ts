import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth
} from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { Job } from '../modela/job';

const router = express.Router();

router.delete(
  '/api/jobs/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) throw new NotFoundError('Job not found');

    if (job.userId !== req.currentUser?.id) throw new NotAuthorizedError();

    await job.deleteOne();

    res.status(200).send({});
  }
);

export { router as deleteJobRouter };
