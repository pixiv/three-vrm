import * as THREE from 'three';
import { VRMHumanBone } from '../VRMHumanBone';
import { VRMHumanoid } from '../VRMHumanoid';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

export class VRMHumanoidHelper extends THREE.Group {
  public readonly vrmHumanoid: VRMHumanoid;
  private _boneAxesMap: Map<VRMHumanBone, THREE.AxesHelper>;

  public constructor(humanoid: VRMHumanoid) {
    super();

    this.vrmHumanoid = humanoid;

    this._boneAxesMap = new Map();

    Object.values(humanoid.humanBones).forEach((bone) => {
      const helper = new THREE.AxesHelper(1.0);

      helper.matrixAutoUpdate = false;

      (helper.material as THREE.Material).depthTest = false;
      (helper.material as THREE.Material).depthWrite = false;

      this.add(helper);

      this._boneAxesMap.set(bone, helper);
    });
  }

  public dispose(): void {
    Array.from(this._boneAxesMap.values()).forEach((axes) => {
      axes.geometry.dispose();
      (axes.material as THREE.Material).dispose();
    });
  }

  public updateMatrixWorld(force: boolean): void {
    Array.from(this._boneAxesMap.entries()).forEach(([bone, axes]) => {
      bone.node.updateWorldMatrix(true, false);

      bone.node.matrixWorld.decompose(_v3A, _quatA, _v3B);

      const scale = _v3A.set(0.1, 0.1, 0.1).divide(_v3B);
      axes.matrix.copy(bone.node.matrixWorld).scale(scale);
    });

    super.updateMatrixWorld(force);
  }
}
