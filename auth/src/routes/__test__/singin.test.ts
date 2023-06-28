import request from 'supertest';

import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: '123456'
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'signin@example.com',
      password: '123456789',
      lastName: 'Test',
      firstName: 'Test'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'signin@example.com',
      password: 'otherpassword'
    })
    .expect(400);
});

it('response with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'signin@example.com',
      password: '123456789',
      lastName: 'Test',
      firstName: 'Test'
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'signin@example.com',
      password: '123456789'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
