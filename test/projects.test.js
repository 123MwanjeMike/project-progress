/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

// Mock @octokit/core
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockImplementation(() => ({
      data: [{ id: 12345, state: 'open', node_id: 'node_id' }],
    })),
  })),
}));

// Mock the retrieveInstallationAccessToken middleware
jest.mock('../src/helpers', () => ({
  retrieveInstallationAccessToken: jest.fn((req, res, next) => {
    req.installationAccessToken = 'installation_access_token';
    next();
  }),
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

  // get all organization-wide project boards
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

  // get all repository project boards
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

  // get specific client project board
  it('gets specific client project board', (done) => {
    chai
      .request(app)
      .get('/projects/PROJECT_ID')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
