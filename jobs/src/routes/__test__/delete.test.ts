import request from 'supertest';
import { app } from '../../app';

const payload = {
  title: 'title',
  shortDescription: 'short',
  longDescription: 'long desc',
  logo: 'short',
  companyName: 'companyName'
};

const createJob = async () => {
  const userCookies = global.signin();
  const response = await request(app)
    .post('/api/jobs')
    .set('Cookie', userCookies)
    .send(payload)
    .expect(201);
  return { body: response.body, userCookies };
};

it('return 404 if not found job', async () => {
  await request(app)
    .delete('/api/jobs/randomtestid')
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

it('can only be accessed if the usr is signed in', async () => {
  const response = await request(app).delete('/api/jobs/randomtestid').send();

  expect(response.status).toEqual(401);
});

it('returns a 401 if the user does not own the job', async () => {
  const responseJob = await createJob();

  const response = await request(app)
    .delete(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', global.signin())
    .send();

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const responseJob = await createJob();
  const response = await request(app)
    .delete(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', responseJob.userCookies)
    .send();

  expect(response.status).not.toEqual(401);
});

it('return 200 if delete found job', async () => {
  const responseJob = await createJob();
  const response = await request(app)
    .delete(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', responseJob.userCookies)
    .send();

  expect(response.status).toEqual(200);
});
