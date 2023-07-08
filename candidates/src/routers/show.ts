import { NotFoundError } from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { Candidate } from '../modela/candidate';

const router = express.Router();

router.get('/api/candidates/:id', async (req: Request, res: Response) => {
  const candidateId = req.params.id;
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) throw new NotFoundError('Not found candidate');
  res.send(candidate);
});

export { router as showCandidateRouter };
