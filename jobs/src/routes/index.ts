import express, { Request, Response } from 'express';
import { Job } from '../modela/job';

const router = express.Router();

router.get('/api/jobs/', async (_req: Request, res: Response) => {
  const jobs = await Job.find({});
  res.send(jobs);
});

export { router as indexJobsRouter };
