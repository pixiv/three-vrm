/**
 * An object which maps a eye gaze point to a node.
 */
export interface LookAt {
  /**
   * Represents a single glTF node represents the eye gaze point.
   */
  node: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
