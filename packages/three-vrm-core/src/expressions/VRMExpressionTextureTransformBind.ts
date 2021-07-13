import type * as THREE from 'three';

/**
 * A bind of expression influences to texture transforms.
 */
export interface VRMExpressionTextureTransformBind {
  /**
   * The target material.
   */
  material: THREE.Material;

  /**
   * The uv scaling of the texture.
   */
  scaling: THREE.Vector2;

  /**
   * The uv offset of the texture.
   */
  offset: THREE.Vector2;
}
