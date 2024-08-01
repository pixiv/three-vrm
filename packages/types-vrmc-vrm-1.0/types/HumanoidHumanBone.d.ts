/**
 * Represents a single bone of a Humanoid.
 */
export interface HumanoidHumanBone {
  /**
   * Represents a single glTF node tied to this humanBone.
   */
  node: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
