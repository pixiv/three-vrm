/**
 * Eye controller setting.
 */
export interface FirstPersonDegreeMap {
    /**
     * None linear mapping params. time, value, inTangent, outTangent
     */
    curve?: number[];
    /**
     * Look at input clamp range degree.
     */
    xRange?: number;
    /**
     * Look at map range degree from xRange.
     */
    yRange?: number;
}
