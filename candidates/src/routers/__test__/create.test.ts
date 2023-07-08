import request from 'supertest';
import { app } from '../../app';
import { Candidate } from '../../modela/candidate';

it('has a route handler listening to /api/candidates for post request', async () => {
  const response = await request(app).post('/api/candidates').send({});
  expect(response.status).not.toEqual(404);
});
it('can only be accessed if the usr is signed in', async () => {
  const response = await request(app).post('/api/candidates').send({});

  expect(response.status).toEqual(401);
});
it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid name is provided', async () => {
  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: '',
      shortDescription: 'short',
      longDescription: 'long des',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(400);

  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      shortDescription: 'short',
      longDescription: 'short',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(400);
});
it('returns en error if an invalid shortDescription is provided', async () => {
  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: '',
      longDescription: 'short',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(400);

  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      longDescription: 'short',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(400);
});
it('returns en error if an invalid longDescription is provided', async () => {
  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      longDescription: '',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(400);

  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(400);
});
it('returns en error if an invalid companyName is provided', async () => {
  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      longDescription: 'short',
      logo: 'short',
      companyName: '',
      position: 'position'
    })
    .expect(400);

  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      longDescription: 'short',
      logo: 'short',
      position: 'position'
    })
    .expect(400);
});
it('returns en error if an invalid position is provided', async () => {
  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      longDescription: 'short',
      logo: 'short',
      companyName: 'companyName',
      position: ''
    })
    .expect(400);

  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      longDescription: 'short',
      logo: 'short',
      companyName: 'companyName'
    })
    .expect(400);
});
it('creates a candidate with valid inputs', async () => {
  let candidates = await Candidate.find({});
  expect(candidates.length).toEqual(0);

  await request(app)
    .post('/api/candidates')
    .set('Cookie', global.signin())
    .send({
      name: 'name',
      shortDescription: 'short',
      longDescription: 'short',
      logo: 'short',
      companyName: 'companyName',
      position: 'position'
    })
    .expect(201);

  candidates = await Candidate.find({});
  expect(candidates.length).toEqual(1);
});
