import mongoose from 'mongoose';

import { app } from './app';

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
