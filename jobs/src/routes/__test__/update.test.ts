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

it('return a 404 if the provided id does not exist', async () => {
  const response = await request(app)
    .patch('/api/jobs/randomtestid')
    .set('Cookie', global.signin())
    .send();
  expect(response.status).toEqual(404);
});

it('can only be accessed if the usr is signed in', async () => {
  const response = await request(app).patch('/api/jobs/randomtestid').send({});

  expect(response.status).toEqual(401);
});

it('returns a 401 if the user does not own the job', async () => {
  const responseJob = await createJob();

  const response = await request(app)
    .patch(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', global.signin())
    .send(payload);

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .patch('/api/jobs/randomtestid')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});
it('returns an error if an invalid title is provided', async () => {
  const responseJob = await createJob();
  await request(app)
    .patch(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'ns'
    })
    .expect(400);
});
it('returns en error if an invalid shortDescription is provided', async () => {
  const responseJob = await createJob();
  await request(app)
    .patch(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', global.signin())
    .send({
      shortDescription: 'ns'
    })
    .expect(400);
});
it('returns en error if an invalid longDescription is provided', async () => {
  const responseJob = await createJob();
  await request(app)
    .patch(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', global.signin())
    .send({
      longDescription: 'ns'
    })
    .expect(400);
});
it('returns en error if an invalid companyName is provided', async () => {
  const responseJob = await createJob();
  await request(app)
    .patch(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', global.signin())
    .send({
      companyName: 'ns'
    })
    .expect(400);
});
it('updates a ticket with valid inputs', async () => {
  const responseJob = await createJob();

  await request(app)
    .patch(`/api/jobs/${responseJob.body.id}`)
    .set('Cookie', responseJob.userCookies)
    .send({
      title: 'new title',
      shortDescription: 'new short',
      longDescription: 'new long'
    })
    .expect(200);
  const response = await request(app)
    .get(`/api/jobs/${responseJob.body.id}`)
    .send()
    .expect(200);

  expect(response.body.title).toEqual('new title');
  expect(response.body.shortDescription).toEqual('new short');
  expect(response.body.longDescription).toEqual('new long');
  expect(response.body.logo).toEqual(payload.logo);
});
