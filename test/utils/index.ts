import http, { Server } from 'http';
import request = require('supertest');

interface GetRequestWithToken {
  server: http.Server;
  path: string;
  method: string;
  querystring?: string;
  headers?: any;
  body?: any;
}

interface PostRequestWithToken {
  server: http.Server;
  path: string;
  body: any;
  headers?: any;
  method: string;
}

export const requestWithToken = (data: GetRequestWithToken) => {
  const { server, path, method, body = {}, querystring, headers = {} } = data;

  return request(server)
    [method](`${path}?${querystring}`)
    .set({
      ...headers,
      authorization: `Bearer ${process.env.JWT_FOREVER}`,
    })
    .send(body);
};
