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
  // get user-owned public project boards
  it('gets user-owned public project boards', (done) => {
    chai
      .request(app)
      .get('/projects/user/USERNAME')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });

  // get organization-wide public project boards
  it('gets organization-wide public project boards', (done) => {
    chai
      .request(app)
      .get('/projects/org/ORGANIZATION_NAME')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });

  // get repository project boards
  it('gets repository project boards', (done) => {
    chai
      .request(app)
      .get('/projects/repo?owner=OWNER&repo=REPOSITORY')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });
});
