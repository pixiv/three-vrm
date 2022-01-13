export declare class VRMLookAtRangeMap {
    /**
     * Limits the maximum angle of the input angle of the LookAt vector from the front of the head (the positive z axis).
     */
    inputMaxValue: number;
    /**
     * Represents an angle (in degrees) for bone type of LookAt appliers, or a weight for expression type of LookAt appliers.
     * The input value will take `1.0` when the input angle equals (or greater) to {@link inputMaxValue}.
     */
    outputScale: number;
    /**
     * Create a new {@link VRMLookAtRangeMap}.
     *
     * @param inputMaxValue The {@link inputMaxValue} of the map
     * @param outputScale The {@link outputScale} of the map
     */
    constructor(inputMaxValue: number, outputScale: number);
    /**
     * Evaluate an input value and output a mapped value.
     * @param src The input value
     */
    map(src: number): number;
}
