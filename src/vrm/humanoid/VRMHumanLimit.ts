import * as THREE from 'three';

export interface VRMHumanLimit {
  useDefaultValues?: boolean;
  min?: THREE.Vector3;
  max?: THREE.Vector3;
  center?: THREE.Vector3;
  axisLength?: number;
}
