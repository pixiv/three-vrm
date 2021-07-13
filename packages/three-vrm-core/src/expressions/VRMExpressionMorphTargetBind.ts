import type * as THREE from 'three';

/**
 * A bind of expression influences to morph targets.
 */
export interface VRMExpressionMorphTargetBind {
  /**
   * The mesh primitives that attached to target mesh.
   */
  primitives: THREE.Mesh[];

  /**
   * The index of the morph target in the mesh.
   */
  index: number;

  /**
   * The weight value of target morph target. Ranging in [0.0 - 1.0].
   */
  weight: number;
}
