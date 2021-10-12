/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

describe('auth tests', () => {
  // request user identity
  it('requests user identity', (done) => {
    chai
      .request(app)
      .get('/auth/login')
      .redirects(0)
      .end((err, res) => {
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toContain(
          'http://localhost:3000/auth/success',
        );
        expect(res.headers.location).toContain(
          'https://github.com/login/oauth/authorize/?client_id=',
        );
        done();
      });
  });

  // aborts identify requests made by third parties
  it('aborts identify requests made by third parties', (done) => {
    chai
      .request(app)
      .get('/auth/success/?code=123&state=123')
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Request was created by a third party!');
        done();
      });
  });
});
