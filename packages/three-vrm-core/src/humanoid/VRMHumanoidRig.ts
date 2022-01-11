import * as THREE from 'three';
import { VRMHumanBoneName, VRMHumanBones } from '.';
import { VRMHumanBoneList } from './VRMHumanBoneList';
import { VRMHumanBoneParentMap } from './VRMHumanBoneParentMap';
import { VRMHumanoid } from './VRMHumanoid';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

export class VRMHumanoidRig {
  public readonly src: VRMHumanoid;
  public readonly humanoid: VRMHumanoid;
  public readonly root: THREE.Object3D;
  protected readonly _parentWorldRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion};
  protected readonly _boneRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion};

  public constructor(humanoid: VRMHumanoid) {
    this.src = humanoid;

    const { rig, root, parentWorldRotations, boneRotations } = this._setupTransforms(humanoid);
    this.humanoid = rig;
    this.root = root;
    this._parentWorldRotations = parentWorldRotations;
    this._boneRotations = boneRotations;
  }

  /**
   * Update this humanoid rig.
   */
  public update(): void {
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = this.src.getBoneNode(boneName);

      if (boneNode != null) {
        const rigBoneNode = this.humanoid.getBoneNode(boneName)!;
        const parentWorldRotation = this._parentWorldRotations[boneName]!;
        const invParentWorldRotation = _quatA.copy(parentWorldRotation).invert();
        const boneRotation = this._boneRotations[boneName]!;

        boneNode.quaternion.copy(rigBoneNode.quaternion).multiply(parentWorldRotation).premultiply(invParentWorldRotation).multiply(boneRotation);
      }
    });
  }

  protected _setupTransforms(humanoid: VRMHumanoid): {
    rig: VRMHumanoid,
    root: THREE.Object3D,
    parentWorldRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion},
    boneRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion},
  } {
    const root = new THREE.Object3D();
    root.name = 'VRMHumanoidRig';

    // store boneWorldPositions and boneWorldRotations
    const boneWorldPositions: {[boneName in VRMHumanBoneName]?: THREE.Vector3} = {};
    const boneWorldRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion} = {};
    const boneRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion} = {};

    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = humanoid.getBoneNode(boneName);

      if (boneNode) {
        const boneWorldPosition = new THREE.Vector3();
        const boneWorldRotation = new THREE.Quaternion();

        boneNode.updateWorldMatrix(true, false);
        boneNode.matrixWorld.decompose(boneWorldPosition, boneWorldRotation, _v3A);

        boneWorldPositions[boneName] = boneWorldPosition;
        boneWorldRotations[boneName] = boneWorldRotation;
        boneRotations[boneName] = boneNode.quaternion.clone();
      }
    });

    // build rig hierarchy + store parentWorldRotations
    const parentWorldRotations: {[boneName in VRMHumanBoneName]?: THREE.Quaternion} = {};

    const rigBones: Partial<VRMHumanBones> = {};
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = humanoid.getBoneNode(boneName);

      if (boneNode) {
        const boneWorldPosition = boneWorldPositions[boneName] as THREE.Vector3;

        // see the nearest parent position
        let currentBoneName: VRMHumanBoneName | null = boneName;
        let parentWorldPosition: THREE.Vector3 | undefined;
        let parentWorldRotation: THREE.Quaternion | undefined;
        while (parentWorldPosition == null) {
          currentBoneName = VRMHumanBoneParentMap[currentBoneName];
          if (currentBoneName == null) { break; }
          parentWorldPosition = boneWorldPositions[currentBoneName];
          parentWorldRotation = boneWorldRotations[currentBoneName];
        }

        // add to hierarchy
        const rigBoneNode = new THREE.Object3D();
        rigBoneNode.name = boneNode.name;

        const parentRigBoneNode = (currentBoneName ? rigBones[currentBoneName]?.node : root) as THREE.Object3D;

        parentRigBoneNode.add(rigBoneNode);
        rigBoneNode.position.copy(boneWorldPosition);
        if (parentWorldPosition) {rigBoneNode.position.sub(parentWorldPosition);}

        rigBones[boneName] = { node: rigBoneNode };

        // store parentWorldRotation
        parentWorldRotations[boneName] = parentWorldRotation ?? new THREE.Quaternion();
      }
    });

    // create rig humanoid
    const rig = new VRMHumanoid(rigBones as VRMHumanBones);

    return { rig, root, parentWorldRotations, boneRotations };
  }
}
