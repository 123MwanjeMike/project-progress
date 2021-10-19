/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

// Mock @octokit/core
jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockImplementation(() => ({
      data: [
        {
          url: 'https://api.github.com/projects/columns/367',
          project_url: 'https://api.github.com/projects/120',
          cards_url: 'https://api.github.com/projects/columns/367/cards',
          id: 367,
          node_id: 'MDEzOlByb2plY3RDb2x1bW4zNjc=',
          name: 'To Do',
        },
      ],
    })),
  })),
}));

describe('column tests', () => {
  // lists project columns
  it('lists project columns', (done) => {
    chai
      .request(app)
      .get('/columns/:PROJECT_ID')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('cards_url');
        done();
      });
  });
});
