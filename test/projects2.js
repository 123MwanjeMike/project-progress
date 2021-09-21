/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

describe.skip('user tests', () => {
  // project_id can be obtained from user entered project html_url
  it('gets project_id from provided project html_url', (done) => {
    chai
      .request(app)
      .post('/user/')
      .send({
        html_url:
          'https://github.com/123MwanjeMike/project-progress/projects/1',
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.project_id).any(Number);
        done();
      });
  });
});
