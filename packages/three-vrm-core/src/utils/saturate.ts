/**
 * Clamp the input value within [0.0 - 1.0].
 *
 * @param value The input value
 */
export function saturate(value: number): number {
  return Math.max(Math.min(value, 1.0), 0.0);
}
