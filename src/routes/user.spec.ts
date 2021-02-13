import * as request from 'supertest';
import { expect } from 'chai';

import { setup } from '../test/setup';
import { instance } from '../app';
import { prefixBase } from '../utils';
import { UserData } from '../models';

const app = instance();

const user: UserData = {
  email: 'test@test.com',
  password: 'passw0rd'
};

describe('/user', () => {
  setup();

  it('/create POST creates a new user', async () => {
    const res = await request(app)
      .post(prefixBase('/user/create'))
      .send(user)
      .then(r => r);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
  });

  it('/create POST does not create a user with an existing email', async () => {
    const res = await request(app)
      .post(prefixBase('/user/create'))
      .send(user)
      .then(r => r);
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.contain(
      'User validation failed: email: Error, expected `email` to be unique.'
    );
  });

  it('/login POST will login an existing user', async () => {
    const res = await request(app)
      .post(prefixBase('/user/login'))
      .send(user)
      .then(r => r);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('expiresIn');
    expect(res.body.expiresIn).to.equal(3600);
  });

  it('/login POST will not login with bad credentials', async () => {
    user.password = user.password + '123';
    const res = await request(app)
      .post(prefixBase('/user/login'))
      .send(user)
      .then(r => r);
    expect(res.status).to.equal(401);
    expect(res.text).to.equal('Unauthorized');
  });
});
