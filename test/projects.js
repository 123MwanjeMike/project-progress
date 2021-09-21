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

describe('project tests', () => {
  // user-owned project boards
  it('gets user-owned project boards', (done) => {
    chai
      .request(app)
      .get('/projects/user/USERNAME')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });

  // organization-wide project boards
  it('gets organization-wide project boards', (done) => {
    chai
      .request(app)
      .get('/projects/org/ORGANIZATION_NAME')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });
});
