import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  // eslint-disable-next-line no-var
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'SDFSAFS';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  const email = 'test@example.com';
  const password = 'password';
  const lastName = 'John';
  const firstName = 'Dept';

  // build a JWT payload.
  const payload = {
    email,
    password,
    lastName,
    firstName,
    id: new mongoose.Types.ObjectId().toHexString()
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session Objecxt. { jwt: MY_JWT }

  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie
  return [`session=${base64}`];
};
