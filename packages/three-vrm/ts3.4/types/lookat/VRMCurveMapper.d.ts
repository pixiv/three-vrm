/**
 * This is an equivalent of CurveMapper class defined in UniVRM.
 * Will be used for [[VRMLookAtApplyer]]s, to define behavior of LookAt.
 *
 * See: https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/LookAt/CurveMapper.cs
 */
export declare class VRMCurveMapper {
    /**
     * An array represents the curve. See AnimationCurve class of Unity for its details.
     *
     * See: https://docs.unity3d.com/ja/current/ScriptReference/AnimationCurve.html
     */
    curve: number[];
    /**
     * The maximum input range of the [[VRMCurveMapper]].
     */
    curveXRangeDegree: number;
    /**
     * The maximum output value of the [[VRMCurveMapper]].
     */
    curveYRangeDegree: number;
    /**
     * Create a new [[VRMCurveMapper]].
     *
     * @param xRange The maximum input range
     * @param yRange The maximum output value
     * @param curve An array represents the curve
     */
    constructor(xRange?: number, yRange?: number, curve?: number[]);
    /**
     * Evaluate an input value and output a mapped value.
     *
     * @param src The input value
     */
    map(src: number): number;
}
