import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth
} from '@bdhranalytics/common';
import express, { Request, Response } from 'express';
import { Candidate } from '../modela/candidate';

const router = express.Router();

router.delete(
  '/api/candidates/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const candidateId = req.params.id;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) throw new NotFoundError('Candidate not found');

    if (candidate.userId !== req.currentUser?.id)
      throw new NotAuthorizedError();

    await candidate.deleteOne();

    res.status(200).send({});
  }
);

export { router as deleteCandidateRouter };
