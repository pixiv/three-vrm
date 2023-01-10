/* eslint-env jest */

import { saturate } from '../saturate';

describe('saturate', () => {
  it('returns the saturated value (0.4 -> 0.4)', () => {
    const result = saturate(0.4);
    expect(result).toBe(0.4);
  });

  it('returns the saturated value (1.8 -> 1.0)', () => {
    const result = saturate(1.8);
    expect(result).toBe(1.0);
  });

  it('returns the saturated value (-0.4 -> 0.0)', () => {
    const result = saturate(-0.4);
    expect(result).toBe(0.0);
  });
});
