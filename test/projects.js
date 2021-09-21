/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockImplementation(() => ({
      data: [{ id: 12345, state: 'open', node_id: 'node_id' }],
    })),
  })),
}));

describe('user tests', () => {
  // user-owned project boards
  it('gets user-owned projects', (done) => {
    chai
      .request(app)
      .get('/projects/user/USERNAME')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });
});
