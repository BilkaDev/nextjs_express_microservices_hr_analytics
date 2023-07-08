import request from 'supertest';
import { app } from '../../app';

const createCandidate = async () => {
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

  return payload;
};

it('can fetch a list of candidates', async () => {
  await createCandidate();
  await createCandidate();
  await createCandidate();
  const response = await request(app).get(`/api/candidates`).expect(200);

  expect(response.body.length).toEqual(3);
});
