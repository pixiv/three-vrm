import * as THREE from 'three'
import * as GLTFJSON from './GLTF'
import * as VRMExtension from './VRM'

export interface GLTF {
  scene: THREE.Scene;
  scenes: THREE.Scene[];
  cameras: THREE.Camera[];
  animations: THREE.AnimationClip[];
  asset: GLTFAsset;
  parser: {
    json: GLTFJSON.RawGltf;
    [key: string]: any;
  };
  userData: any;
}

interface GLTFAsset {
  copyright?: string;
  generator?: string;
  version: string;
  minVersion?: string;
  extensions?: object;
  extras?: any;
}

export type GLTFNode = THREE.Object3D | THREE.Mesh | THREE.SkinnedMesh | THREE.Bone;
export type GLTFPrimitive = THREE.Mesh | THREE.SkinnedMesh;

export interface VRMPose {
  [name: string]:
    | {
    position?: number[];
    rotation?: number[];
  }
    | undefined;
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

// JSの計算で使うvec3。THREE.Vector3やRawVRMVector3とは区別して扱う。
export type RawVector3 = [number, number, number];
