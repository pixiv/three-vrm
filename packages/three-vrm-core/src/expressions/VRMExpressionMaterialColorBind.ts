import type * as THREE from 'three';
import type { VRMExpressionMaterialColorType } from './VRMExpressionMaterialColorType';

/**
 * A bind of expression influences to a material color.
 */
export interface VRMExpressionMaterialColorBind {
  /**
   * The target material.
   */
  material: THREE.Material;

  /**
   * The type of the target property of the material.
   */
  type: VRMExpressionMaterialColorType;

  /**
   * The target color.
   */
  targetValue: THREE.Color;
}
