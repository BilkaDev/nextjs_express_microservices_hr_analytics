import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  currentUser,
  errorHandler,
  NotFoundError
} from '@bdhranalytics/common';
import { createCandidatesRouter } from './routers/create';
import { showCandidateRouter } from './routers/show';
import { indexCandidatesRouter } from './routers';
import { updateCandidateRouter } from './routers/update';
import { deleteCandidateRouter } from './routers/delete';

export const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

app.use(createCandidatesRouter);
app.use(showCandidateRouter);
app.use(indexCandidatesRouter);
app.use(updateCandidateRouter);
app.use(deleteCandidateRouter);

app.all('*', () => {
  throw new NotFoundError('Route not found');
});
app.use(errorHandler);
