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
          url: 'https://api.github.com/projects/columns/cards/1478',
          id: 1478,
          node_id: 'MDExOlByb2plY3RDYXJkMTQ3OA==',
          note: 'Add payload for delete Project column',
          creator: {
            login: 'octocat',
            id: 1,
            node_id: 'MDQ6VXNlcjE=',
            avatar_url: 'https://github.com/images/error/octocat_happy.gif',
            gravatar_id: '',
            url: 'https://api.github.com/users/octocat',
            html_url: 'https://github.com/octocat',
            followers_url: 'https://api.github.com/users/octocat/followers',
            following_url:
              'https://api.github.com/users/octocat/following{/other_user}',
            gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/octocat/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/octocat/subscriptions',
            organizations_url: 'https://api.github.com/users/octocat/orgs',
            repos_url: 'https://api.github.com/users/octocat/repos',
            events_url: 'https://api.github.com/users/octocat/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/octocat/received_events',
            type: 'User',
            site_admin: false,
          },
          created_at: '2016-09-05T14:21:06Z',
          updated_at: '2016-09-05T14:20:22Z',
          archived: false,
          column_url: 'https://api.github.com/projects/columns/367',
          content_url:
            'https://api.github.com/repos/api-playground/projects-test/issues/3',
          project_url: 'https://api.github.com/projects/120',
        },
      ],
    })),
  })),
}));

describe('card tests', () => {
  // lists project column cards
  it('lists project column cards', (done) => {
    chai
      .request(app)
      .get('/cards/COLUMN_ID')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('id');
        done();
      });
  });

  // total number of cards in project board
  it('total number of cards in project board', (done) => {
    chai
      .request(app)
      .get('/cards/total')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.total_number_of_cards).toBe(1);
        done();
      });
  });

  // number of cards in project column
  it('number of cards in project column', (done) => {
    chai
      .request(app)
      .get('/cards/COLUMN_ID/number')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.number_of_cards).toBe(1);
        done();
      });
  });
});
