/* eslint-disable no-undef */
import {
  getInstallations,
  retrieveInstallationAccessToken,
} from '../src/helpers';

jest.mock('@octokit/core', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    auth: jest.fn().mockImplementation(() => ({ token: 'token123' })),
    request: jest.fn().mockImplementation(() => ({
      data: [{ id: 1, account: { login: 'octocat', id: 1 } }],
    })),
  })),
}));

describe('index helper tests', () => {
  // gets its installations
  it('gets its installations', (done) => {
    getInstallations().then((result) => {
      expect(result[0]).toHaveProperty('account');
      done();
    });
  });

  // retrieves installation access token
  it('retrieves installation access token', (done) => {
    const reqMock = { login: 'octocat' };
    const resMock = {};
    const nextMock = () => jest.fn();
    retrieveInstallationAccessToken(reqMock, resMock, nextMock).then(
      (result) => {
        expect(result).toBe(true);
        done();
      },
    );
  });
});
