/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import { generateBearerToken } from '../src/controllers/auth';

chai.use(chaiHttp);

// Mock @octokit/core
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockImplementation(() => ({
      data: {
        access_token: 'ghu_123456789',
        expires_in: 28800,
        refresh_token: 'ghr_123456789',
        refresh_token_expires_in: 15811200,
        scope: '',
        token_type: 'bearer',
      },
    })),
  })),
}));

describe('auth tests', () => {
  let state = null;
  // generates bearer token
  it('generates bearer token', () => {
    expect(typeof generateBearerToken(1)).toBe('string');
  });

  // request user identity
  it('requests user identity', (done) => {
    chai
      .request(app)
      .get('/auth/login')
      .redirects(0)
      .end((err, res) => {
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toContain('/auth/success');
        expect(res.headers.location).toContain(
          'https://github.com/login/oauth/authorize/?client_id=',
        );
        const urlSearchParams = new URLSearchParams(res.headers.location);
        state = Object.fromEntries(urlSearchParams.entries()).state;
        done();
      });
  });

  // aborts identify requests made by third parties
  it('aborts identify requests made by third parties', (done) => {
    chai
      .request(app)
      .get('/auth/success/?code=123&state=something_unexpected')
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Request was created by a third party!');
        done();
      });
  });

  // returns user access tokens for right requests
  it('return user access tokens for right requests', (done) => {
    chai
      .request(app)
      .get(`/auth/success/?code=123&state=${state}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBe('ghu_123456789');
        expect(res.body.message).toBe('Login successful');
        done();
      });
  });
});
