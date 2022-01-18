import * as THREE from 'three';
/**
 * A single node of GLTFs, represented as a Three.js object.
 *
 * See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
 */
export declare type GLTFNode = THREE.Object3D;
/**
 * A single primitive of GLTFs, represented as a Three.js object.
 *
 * See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshes
 */
export declare type GLTFPrimitive = THREE.Mesh | THREE.SkinnedMesh;
/**
 * A single mesh of GLTFs, represented as a Three.js object;
 *
 * See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshes
 */
export declare type GLTFMesh = THREE.Group | THREE.Mesh | THREE.SkinnedMesh;
/**
 * Represents a transform of a single bone of [[VRMPose]].
 * Both `position` and `rotation` are optional.
 */
export interface VRMPoseTransform {
    /**
     * Position of the transform.
     */
    position?: RawVector3;
    /**
     * Rotation of the transform.
     * Note that it's a quaternion.
     */
    rotation?: RawVector4;
}
/**
 * Represents a pose that VRM can do.
 *
 * See [[HumanBone]] for complete list of bone names.
 * Note that certain VRM models might not have every bones defined in [[HumanBone]].
 *
 * @example An example of VRMPose interface
 * ```js
 * {
 *   [HumanBone.LeftUpperLeg] : {
 *     rotation: [  0.000,  0.000, -0.454,  0.891 ],
 *     position: [  0.000,  0.000,  0.000 ] // position is not required though
 *   },
 *   [HumanBone.LeftLowerLeg] : {
 *     rotation: [ -0.454,  0.000,  0.000,  0.891 ]
 *   },
 * }
 * ```
 */
export interface VRMPose {
    [boneName: string]: VRMPoseTransform | undefined;
}
/**
 * Vector3 but it's a raw array.
 */
export declare type RawVector3 = [
    number,
    number,
    number
];
/**
 * Vector4 but it's a raw array.
 */
export declare type RawVector4 = [
    number,
    number,
    number,
    number
];
