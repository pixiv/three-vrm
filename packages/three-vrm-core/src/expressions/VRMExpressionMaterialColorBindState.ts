import type * as THREE from 'three';

/**
 * Intended to be used internally as an intersection type with {@link VRMExpressionMaterialColorBind}.
 */
export interface VRMExpressionMaterialColorBindState {
  propertyName: string;

  initialValue: THREE.Color;

  deltaValue: THREE.Color;
}
