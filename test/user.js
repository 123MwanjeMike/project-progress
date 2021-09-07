/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

describe('user tests', () => {
  // user-owned project boards
  it('gets user-owned projects', (done) => {
    chai
      .request(app)
      .get('/user/projects/123MwanjeMike')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });
});
