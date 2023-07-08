import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the job is not found', async () => {
  await request(app).get('/api/jobs/randomidtest').send().expect(404);
});

it('returns the job if the job is found', async () => {
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

  const jobResponse = await request(app)
    .get(`/api/jobs/${response.body.id}`)
    .expect(200);

  expect(jobResponse.body.title).toEqual(payload.title);
});
