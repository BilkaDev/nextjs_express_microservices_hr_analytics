import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser
} from '@bdhranalytics/common';

import { createJobRouter } from './routes/create';
import { showJobRouter } from './routes/show';
import { indexJobsRouter } from './routes';
import { updateJobRouter } from './routes/update';
import { deleteJobRouter } from './routes/delete';

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
app.use(createJobRouter);
app.use(showJobRouter);
app.use(indexJobsRouter);
app.use(updateJobRouter);
app.use(deleteJobRouter);

app.all('*', () => {
  throw new NotFoundError('Route not found');
});
app.use(errorHandler);
