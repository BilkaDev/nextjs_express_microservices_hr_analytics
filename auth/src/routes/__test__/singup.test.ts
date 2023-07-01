import request from 'supertest';

import { app } from '../../app';

it('Should return a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'envkt@example.com',
      password: '123456',
      lastName: 'Dept',
      firstName: 'John'
    })
    .expect(201);
});

it('Should return a 400 an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'envktexample.com',
      password: '123456',
      lastName: 'Dept',
      firstName: 'John'
    })
    .expect(400);
});

it('Should return a 400 an invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'envktexample.com',
      password: '12',
      lastName: 'Dept',
      firstName: 'John'
    })
    .expect(400);
});

it('Should return a 400 an invalid firstName', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'envkt@example.com',
      password: '123456',
      lastName: 'Dept',
      firstName: ''
    })
    .expect(400);
});

it('Should return a 400 an invalid lastName', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'envkt@example.com',
      password: '123456',
      lastName: '',
      firstName: 'John'
    })
    .expect(400);
});

it('Should return a 400 an missin email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      lastName: 'dept',
      firstName: 'John'
    })
    .expect(400);
});

it('Disallows duplicate email', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'envkt@example.com',
    password: '123456',
    lastName: 'Dept',
    firstName: 'John'
  });
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'envkt@example.com',
      password: '123456',
      lastName: 'Dept',
      firstName: 'John'
    })
    .expect(409);
});

it('Sets a cookie after successful signup', async () => {
  const response = await request(app).post('/api/users/signup').send({
    email: 'envkt@example.com',
    password: '123456',
    lastName: 'Dept',
    firstName: 'John'
  });

  expect(response.get('Set-Cookie')).toBeDefined();
});
