import * as THREE from 'three';
import * as VRMExtension from './VRM';

/**
 * A single node of GLTF, represented as Three.js object.
 */
export type GLTFNode = THREE.Object3D;

/**
 * A single primitive of GLTF, represented as Three.js object.
 */
export type GLTFPrimitive = THREE.Mesh | THREE.SkinnedMesh;
export type GLTFMesh = THREE.Group | THREE.Mesh | THREE.SkinnedMesh;

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

export interface AnimationClipKeyframe {
  name: VRMExtension.HumanBone | VRMExtension.BlendShapePresetName;
  type: 'morph' | 'rotation' | 'position';
  times: number[];
  values: number[];
}

export interface AnimationClipData {
  duration: number;
  tracks: AnimationClipKeyframe[];
}

/**
 * Vector3 but it's a raw array.
 */
export type RawVector3 = [number, number, number];

/**
 * Vector4 but it's a raw array.
 */
export type RawVector4 = [number, number, number, number];
