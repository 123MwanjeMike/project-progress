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
          url: 'https://api.github.com/projects/columns/1',
          project_url: 'https://api.github.com/projects/120',
          cards_url: 'https://api.github.com/projects/columns/1/cards',
          id: 1,
          node_id: 'MDEzOlByb2plY3RDb2x1bW4zNjc=',
          name: 'To Do',
        },
        {
          url: 'https://api.github.com/projects/columns/2',
          project_url: 'https://api.github.com/projects/120',
          cards_url: 'https://api.github.com/projects/columns/2/cards',
          id: 2,
          node_id: 'MDEzOlByWEWDCUYDb2x1bW4zNjc&',
          name: 'In progress',
        },
        {
          url: 'https://api.github.com/projects/columns/3',
          project_url: 'https://api.github.com/projects/120',
          cards_url: 'https://api.github.com/projects/columns/3/cards',
          id: 3,
          node_id: 'MDEzOlByb2SJBEx1bW4zN8CYSUDF',
          name: 'Done',
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

  // get 'TODO' project column
  it("get 'TODO' project column", (done) => {
    chai
      .request(app)
      .get('/columns/todo')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toHaveProperty(1);
        done();
      });
  });
});
