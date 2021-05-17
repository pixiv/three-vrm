/**
 * Specify how the mesh should be interpreted by the camera
 */
export interface FirstPersonMeshAnnotation {
  /**
   * The index of the node that attached to target mesh.
   */
  node?: number;

  /**
   * How the camera interprets the mesh.
   */
  firstPersonType?: 'auto' | 'both' | 'thirdPersonOnly' | 'firstPersonOnly';

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
