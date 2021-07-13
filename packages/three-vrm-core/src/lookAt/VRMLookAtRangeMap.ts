import { saturate } from '../utils/saturate';

export class VRMLookAtRangeMap {
  /**
   * Limits the maximum angle of the input angle of the LookAt vector from the front of the head (the positive z axis).
   */
  public inputMaxValue: number;

  /**
   * Represents an angle (in degrees) for bone type of LookAt appliers, or a weight for expression type of LookAt appliers.
   * The input value will take `1.0` when the input angle equals (or greater) to {@link inputMaxValue}.
   */
  public outputScale: number;

  /**
   * Create a new {@link VRMLookAtRangeMap}.
   *
   * @param inputMaxValue The {@link inputMaxValue} of the map
   * @param outputScale The {@link outputScale} of the map
   */
  public constructor(inputMaxValue: number, outputScale: number) {
    this.inputMaxValue = inputMaxValue;
    this.outputScale = outputScale;
  }

  /**
   * Evaluate an input value and output a mapped value.
   * @param src The input value
   */
  public map(src: number): number {
    return this.outputScale * saturate(src / this.inputMaxValue);
  }
}
