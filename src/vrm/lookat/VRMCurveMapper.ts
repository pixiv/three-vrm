/**
 * Evaluate a hermite spline.
 *
 * @param y0 y on start
 * @param y1 y on end
 * @param t0 delta y on start
 * @param t1 delta y on end
 * @param x input value
 */
const hermiteSpline = (y0: number, y1: number, t0: number, t1: number, x: number): number => {
  const xc = x * x * x;
  const xs = x * x;
  const dy = y1 - y0;
  const h01 = -2.0 * xc + 3.0 * xs;
  const h10 = xc - 2.0 * xs + x;
  const h11 = xc - xs;
  return y0 + dy * h01 + t0 * h10 + t1 * h11;
};

/**
 * Evaluate an AnimationCurve array. See AnimationCurve class of Unity for its details.
 *
 * See: https://docs.unity3d.com/ja/current/ScriptReference/AnimationCurve.html
 *
 * @param arr An array represents a curve
 * @param x An input value
 */
const evaluateCurve = (arr: number[], x: number): number => {
  // -- sanity check -----------------------------------------------------------
  if (arr.length < 8) {
    throw new Error('evaluateCurve: Invalid curve detected! (Array length must be 8 at least)');
  }
  if (arr.length % 4 !== 0) {
    throw new Error('evaluateCurve: Invalid curve detected! (Array length must be multiples of 4');
  }

  // -- check range ------------------------------------------------------------
  let outNode;
  for (outNode = 0; ; outNode++) {
    if (arr.length <= 4 * outNode) {
      return arr[4 * outNode - 3]; // too further!! assume as "Clamp"
    } else if (x <= arr[4 * outNode]) {
      break;
    }
  }

  const inNode = outNode - 1;
  if (inNode < 0) {
    return arr[4 * inNode + 5]; // too behind!! assume as "Clamp"
  }

  // -- calculate local x ------------------------------------------------------
  const x0 = arr[4 * inNode];
  const x1 = arr[4 * outNode];
  const xHermite = (x - x0) / (x1 - x0);

  // -- finally do the hermite spline ------------------------------------------
  const y0 = arr[4 * inNode + 1];
  const y1 = arr[4 * outNode + 1];
  const t0 = arr[4 * inNode + 3];
  const t1 = arr[4 * outNode + 2];
  return hermiteSpline(y0, y1, t0, t1, xHermite);
};

/**
 * This is an equivalent of CurveMapper class defined in UniVRM.
 * Will be used for [[VRMLookAtApplyer]]s, to define behavior of LookAt.
 *
 * See: https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/LookAt/CurveMapper.cs
 */
export class VRMCurveMapper {
  /**
   * An array represents the curve. See AnimationCurve class of Unity for its details.
   *
   * See: https://docs.unity3d.com/ja/current/ScriptReference/AnimationCurve.html
   */
  public curve: number[] = [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0];

  /**
   * The maximum input range of the [[VRMCurveMapper]].
   */
  public curveXRangeDegree = 90.0;

  /**
   * The maximum output value of the [[VRMCurveMapper]].
   */
  public curveYRangeDegree = 10.0;

  /**
   * Create a new [[VRMCurveMapper]].
   *
   * @param xRange The maximum input range
   * @param yRange The maximum output value
   * @param curve An array represents the curve
   */
  constructor(xRange?: number, yRange?: number, curve?: number[]) {
    if (xRange !== undefined) {
      this.curveXRangeDegree = xRange;
    }

    if (yRange !== undefined) {
      this.curveYRangeDegree = yRange;
    }

    if (curve !== undefined) {
      this.curve = curve;
    }
  }

  /**
   * Evaluate an input value and output a mapped value.
   *
   * @param src The input value
   */
  public map(src: number): number {
    const clampedSrc = Math.min(Math.max(src, 0.0), this.curveXRangeDegree);
    const x = clampedSrc / this.curveXRangeDegree;
    return this.curveYRangeDegree * evaluateCurve(this.curve, x);
  }
}
