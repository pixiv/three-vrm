/**
 * Make sure the angle is within -PI to PI.
 *
 * @example
 * ```js
 * sanitizeAngle(1.5 * Math.PI) // -0.5 * PI
 * ```
 *
 * @param angle An input angle
 */
export function sanitizeAngle(angle: number): number {
  const roundTurn = Math.round(angle / 2.0 / Math.PI);
  return angle - 2.0 * Math.PI * roundTurn;
}
