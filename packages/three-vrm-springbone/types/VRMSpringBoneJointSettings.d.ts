import type * as THREE from 'three';
export interface VRMSpringBoneJointSettings {
    /**
     * Radius of the bone, will be used for collision.
     */
    hitRadius: number;
    stiffness: number;
    gravityPower: number;
    gravityDir: THREE.Vector3;
    dragForce: number;
}
