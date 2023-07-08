import request from 'supertest';
import { app } from '../../app';

const payload = {
  name: 'name',
  shortDescription: 'short',
  longDescription: 'short',
  logo: 'short',
  companyName: 'companyName',
  position: 'position'
};

const createCandidate = async () => {
  const userCookies = global.signin();
  const response = await request(app)
    .post('/api/candidates')
    .set('Cookie', userCookies)
    .send(payload)
    .expect(201);
  return { body: response.body, userCookies };
};

it('return 404 if not found candidate', async () => {
  await request(app)
    .delete('/api/candidates/randomtestid')
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

it('can only be accessed if the usr is signed in', async () => {
  const response = await request(app)
    .delete('/api/candidates/randomtestid')
    .send();

  expect(response.status).toEqual(401);
});

it('returns a 401 if the user does not own the candidate', async () => {
  const responseCandidate = await createCandidate();

  const response = await request(app)
    .delete(`/api/candidates/${responseCandidate.body.id}`)
    .set('Cookie', global.signin())
    .send();

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const responseCandidate = await createCandidate();
  const response = await request(app)
    .delete(`/api/candidates/${responseCandidate.body.id}`)
    .set('Cookie', responseCandidate.userCookies)
    .send();

  expect(response.status).not.toEqual(401);
});

it('return 200 if delete found candidate', async () => {
  const responseCandidate = await createCandidate();
  const response = await request(app)
    .delete(`/api/candidates/${responseCandidate.body.id}`)
    .set('Cookie', responseCandidate.userCookies)
    .send();

  expect(response.status).toEqual(200);
});
