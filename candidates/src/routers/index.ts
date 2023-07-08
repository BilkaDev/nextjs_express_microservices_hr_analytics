import express, { Request, Response } from 'express';
import { Candidate } from '../modela/candidate';

const router = express.Router();

router.get('/api/candidates/', async (_req: Request, res: Response) => {
  const candidates = await Candidate.find({});
  res.send(candidates);
});

export { router as indexCandidatesRouter };
