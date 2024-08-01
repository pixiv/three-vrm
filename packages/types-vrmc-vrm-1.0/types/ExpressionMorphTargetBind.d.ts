/**
 * Morph target value associated with a expression
 */
export interface ExpressionMorphTargetBind {
  /**
   * The index of the node that attached to target mesh.
   */
  node: number;

  /**
   * The index of the morph target in the mesh.
   */
  index: number;

  /**
   * The weight value of target morph target.
   */
  weight: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
