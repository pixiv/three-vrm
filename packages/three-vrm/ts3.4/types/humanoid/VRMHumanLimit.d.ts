import * as THREE from 'three';
/**
 * An interface represents a `HumanLimit` defined in VRM specification.
 * These fields are not used in this implementation.
 */
export interface VRMHumanLimit {
    useDefaultValues?: boolean;
    min?: THREE.Vector3;
    max?: THREE.Vector3;
    center?: THREE.Vector3;
    axisLength?: number;
}
