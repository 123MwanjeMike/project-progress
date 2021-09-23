/* eslint-disable no-undef */
import {
  generateBearerToken,
  getInstallations,
  generateInstallationToken,
} from '../src/helpers';

jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    auth: jest.fn().mockImplementation(() => ({ token: 'token123' })),
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

describe.skip('index helper tests', () => {
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

  // retrieves installation access token
  it('retrieves installation access token', (done) => {
    const reqMock = { query: { owner: 'octocat' } };
    const resMock = {};
    const nextMock = () => jest.fn();
    generateInstallationToken(reqMock, resMock, nextMock).then((result) => {
      expect(result).toBe(true);
      done();
    });
  });
});
