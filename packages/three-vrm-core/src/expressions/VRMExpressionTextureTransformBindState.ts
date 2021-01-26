import type * as THREE from 'three';

/**
 * Intended to be used internally as an intersection type with {@link VRMExpressionTextureTransformBind}.
 */
export interface VRMExpressionTextureTransformBindState {
  /**
   * The list of texture names and its state that should be transformed by this bind.
   */
  properties: {
    name: string;
    initialOffset: THREE.Vector2;
    initialScaling: THREE.Vector2;
    deltaOffset: THREE.Vector2;
    deltaScaling: THREE.Vector2;
  }[];
}
