import { sanitizeAngle } from '../sanitizeAngle';

describe('sanitizeAngle', () => {
  it('does not do anything to an angle within -PI and PI (3 / 4 * PI)', () => {
    const result = sanitizeAngle(0.75 * Math.PI);
    expect(result).toBeCloseTo(0.75 * Math.PI);
  });

  it('converts 1.5 * PI within -PI and PI', () => {
    const result = sanitizeAngle(1.5 * Math.PI);
    expect(result).toBeCloseTo(-0.5 * Math.PI);
  });

  it('converts -3.25 * PI within -PI and PI', () => {
    const result = sanitizeAngle(-3.25 * Math.PI);
    expect(result).toBeCloseTo(0.75 * Math.PI);
  });
});
