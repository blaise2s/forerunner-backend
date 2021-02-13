import * as request from 'supertest';
import { expect } from 'chai';

import { setup } from '../test/setup';
import { instance } from '../app';
import { prefixBase } from '../utils';

const app = instance();

describe('/ping', () => {
  setup();

  it('GET responds pong', async () => {
    const res = await request(app)
      .get(prefixBase('/ping'))
      .then(r => r);
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('pong');
  });
});
