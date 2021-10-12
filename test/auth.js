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
});
