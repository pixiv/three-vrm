/**
 * Represents a single bone of a Humanoid.
 */
export interface HumanoidHumanBone {
  /**
   * Represents a single glTF node mapped to this humanBone.
   */
  node: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
