import request from 'supertest';
import { app } from '../../app';

it('returns a 404 if the candidates is not found', async () => {
  await request(app).get('/api/candidates/randomidtest').send().expect(404);
});

it('returns the candidate if the candidate is found', async () => {
  const payload = {
    name: 'name',
    shortDescription: 'short',
    longDescription: 'short',
    logo: 'short',
    companyName: 'companyName',
    position: 'position'
  };
  const response = await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send(payload)
    .expect(201);

  const jobResponse = await request(app)
    .get(`/api/candidates/${response.body.id}`)
    .expect(200);

  expect(jobResponse.body.name).toEqual(payload.name);
});
