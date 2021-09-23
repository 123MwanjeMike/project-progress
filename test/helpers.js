/* eslint-disable no-undef */
import { generateBearerToken } from '../src/helpers';

describe('index tests', () => {
  // generates bearer token
  it('generates bearer token', () => {
    expect(typeof generateBearerToken(1)).toBe('string');
  });
});
