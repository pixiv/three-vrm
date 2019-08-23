import * as THREE from 'three';

export type GLTFNode = THREE.Object3D | THREE.Mesh | THREE.SkinnedMesh | THREE.Bone;
export type GLTFPrimitive = THREE.Mesh | THREE.SkinnedMesh;
export type GLTFMesh = THREE.Group | THREE.Mesh | THREE.SkinnedMesh;

export interface VRMPose {
  [name: string]:
    | {
        position?: number[];
        rotation?: number[];
      }
    | undefined;
}

// JSの計算で使うvec3。THREE.Vector3やRawVRMVector3とは区別して扱う。
export type RawVector3 = [number, number, number];
