export interface VRMSpringBoneParameters {
    radius?: number;
    stiffnessForce?: number;
    gravityDir?: THREE.Vector3;
    gravityPower?: number;
    dragForce?: number;
    colliders?: THREE.Mesh[];
    center?: THREE.Object3D | null;
}
