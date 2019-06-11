import { RawVrmFirstPersonDegreemap } from '../types/VRM';

export const DEG2RAD = Math.PI / 180.0;

const hermiteSpline = (y0: number, y1: number, t0: number, t1: number, x: number): number => {
  const xc = x * x * x;
  const xs = x * x;
  const dy = y1 - y0;
  const h01 = -2.0 * xc + 3.0 * xs;
  const h10 = xc - 2.0 * xs + x;
  const h11 = xc - xs;
  return y0 + dy * h01 + t0 * h10 + t1 * h11;
};

const evaluateCurve = (arr: number[], x: number): number => {
  // -- sanity check -----------------------------------------------------------
  if (arr.length < 8) {
    throw new Error('evaluateCurve: Invalid curve detected! (Array length must be 8 at least)');
  }
  if (arr.length % 4 !== 0) {
    throw new Error('evaluateCurve: Invalid curve detected! (Array length must be multiples of 4');
  }

  // -- check range ------------------------------------------------------------
  let outNode = 0;
  while (true) {
    if (arr.length <= 4 * outNode) {
      return arr[4 * outNode - 3]; // too further!! assume as "Clamp"
    } else if (x <= arr[4 * outNode]) {
      break;
    }
    outNode++;
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

export class CurveMapper {
  public static apply(map: RawVrmFirstPersonDegreemap): CurveMapper {
    return new CurveMapper(map.xRange, map.yRange, map.curve);
  }

  public curve: number[] = [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0];
  public curveXRangeDegree: number = 90.0;
  public curveYRangeDegree: number = 10.0;

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

  public map(src: number) {
    const clampedSrc = Math.min(Math.max(src, 0.0), this.curveXRangeDegree);
    const x = clampedSrc / this.curveXRangeDegree;
    return this.curveYRangeDegree * evaluateCurve(this.curve, x);
  }
}
