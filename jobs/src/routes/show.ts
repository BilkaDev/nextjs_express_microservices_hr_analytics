import { NotFoundError } from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { Job } from '../modela/job';

const router = express.Router();

router.get('/api/jobs/:id', async (req: Request, res: Response) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  if (!job) throw new NotFoundError('Not found job');
  res.send(job);
});

export { router as showJobRouter };
