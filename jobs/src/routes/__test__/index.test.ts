import request from 'supertest';
import { app } from '../../app';

const createJob = async () => {
  const payload = {
    title: 'title',
    shortDescription: 'short',
    longDescription: 'long desc',
    logo: 'short',
    companyName: 'companyName'
  };
  const response = await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send(payload)
    .expect(201);

  return payload;
};

it('can fetch a list of jobs', async () => {
  await createJob();
  await createJob();
  await createJob();
  const response = await request(app).get(`/api/jobs`).expect(200);

  expect(response.body.length).toEqual(3);
});
