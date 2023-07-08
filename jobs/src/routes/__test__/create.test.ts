import request from 'supertest';
import { app } from '../../app';
import { Job } from '../../modela/job';

it('has a route handler listening to /api/jobs for post request', async () => {
  const response = await request(app).post('/api/jobs').send({});
  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the usr is signed in', async () => {
  const response = await request(app).post('/api/jobs').send({});

  expect(response.status).toEqual(401);
});
it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});
it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: '',
      shortDescription: 'short',
      longDescription: 'long des',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);

  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      shortDescription: 'short',
      longDescription: 'long des',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);
});
it('returns en error if an invalid shortDescription is provided', async () => {
  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      shortDescription: '',
      longDescription: 'long des',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);

  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      longDescription: 'long des',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);
});
it('returns en error if an invalid longDescription is provided', async () => {
  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      shortDescription: 'short',
      longDescription: '',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);

  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'tile',
      shortDescription: 'short',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);
});
it('returns en error if an invalid companyName is provided', async () => {
  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      shortDescription: 'short',
      longDescription: 'long des',
      logo: 'short',
      companyName: ''
    })
    .expect(400);

  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'tile',
      shortDescription: 'short',
      longDescription: 'long des',
      logo: 'short'
    })
    .expect(400);
});
it('creates a ticket with valid inputs', async () => {
  let jobs = await Job.find({});
  expect(jobs.length).toEqual(0);

  await request(app)
    .post('/api/jobs')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      shortDescription: 'short',
      longDescription: 'long desc',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(201);

  jobs = await Job.find({});
  expect(jobs.length).toEqual(1);
  expect(jobs[0].title).toEqual('title')
});
