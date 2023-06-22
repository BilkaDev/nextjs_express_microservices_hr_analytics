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
import mongoose from 'mongoose';

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError('Route not found');
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (e) {
    console.log(e);
  }

  app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
  });
};

void (async () => {
  await start();
})();
