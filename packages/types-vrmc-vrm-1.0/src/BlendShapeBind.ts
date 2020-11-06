/**
 * Morph target values that make up the BlendShape
 */
export interface BlendShapeBind {
  /**
   * The index of the node that attached to target mesh.
   */
  node?: number;

  /**
   * The index of the morph target in the mesh.
   */
  index?: number;

  /**
   * The weight value of target morph target.
   */
  weight?: number;
}
