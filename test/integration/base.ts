import { expect } from 'chai';
import app from '../../src/app';

import { port } from '../config';

import request = require('supertest');

let server;

describe('Base integration tests', () => {
  beforeEach(async () => {
    return new Promise((resolve) => {
      server = app.listen(port, resolve);
    });
  });
  afterEach(async () => {
    return new Promise((resolve) => {
      server.close(resolve);
    });
  });

  it('health check', async () => {
    const res = await request(server).get('/health');
    expect(res.status).to.equal(200);
  });

  it('route not found', async () => {
    const res = await request(server).get('/notfound');
    expect(res.status).to.equal(404);
  });
});
