import express, { json } from 'express';
import 'express-async-errors';

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors';

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError('sds');
});
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
