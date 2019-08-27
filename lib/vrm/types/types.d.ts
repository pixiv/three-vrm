import * as THREE from 'three';
import * as VRMExtension from './VRM';
export declare type GLTFNode = THREE.Object3D;
export declare type GLTFPrimitive = THREE.Mesh | THREE.SkinnedMesh;
export declare type GLTFMesh = THREE.Group | THREE.Mesh | THREE.SkinnedMesh;
export interface VRMPoseTransform {
    position?: RawVector3;
    rotation?: RawVector4;
}
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
export declare type RawVector3 = [number, number, number];
export declare type RawVector4 = [number, number, number, number];
