import { RawVrmFirstPersonDegreemap } from '../types/VRM';
export declare const DEG2RAD: number;
export declare class CurveMapper {
    static apply(map: RawVrmFirstPersonDegreemap): CurveMapper;
    curve: number[];
    curveXRangeDegree: number;
    curveYRangeDegree: number;
    constructor(xRange?: number, yRange?: number, curve?: number[]);
    map(src: number): number;
}
