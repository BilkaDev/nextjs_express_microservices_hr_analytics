import express, { json } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError('Route not found');
});
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
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
