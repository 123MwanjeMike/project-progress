/* eslint-disable no-undef */
import { generateBearerToken, getInstallations } from '../src/helpers';

jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockImplementation(() => ({
      data: [
        {
          id: 1,
          account: { login: 'octocat', id: 1 },
          permissions: { metadata: 'read' },
        },
      ],
    })),
  })),
}));

describe('index tests', () => {
  // generates bearer token
  it('generates bearer token', () => {
    expect(typeof generateBearerToken(1)).toBe('string');
  });

  // gets its installations
  it('gets its installations', (done) => {
    getInstallations().then((result) => {
      expect(result[0]).toHaveProperty('account');
      done();
    });
  });
});
