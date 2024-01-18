import * as THREE from 'three';
import { VRMHumanBoneName, VRMHumanBones } from '.';
import { VRMHumanBoneList } from './VRMHumanBoneList';
import { VRMHumanBoneParentMap } from './VRMHumanBoneParentMap';
import { VRMRig } from './VRMRig';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _boneWorldPos = new THREE.Vector3();

/**
 * A class represents the normalized Rig of a VRM.
 */
export class VRMHumanoidRig extends VRMRig {
  protected static _setupTransforms(modelRig: VRMRig): {
    rigBones: VRMHumanBones;
    root: THREE.Object3D;
    parentWorldRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion };
    boneRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion };
  } {
    const root = new THREE.Object3D();
    root.name = 'VRMHumanoidRig';

    // store boneWorldPositions, boneWorldRotations, and parentWorldRotations
    const boneWorldPositions: { [boneName in VRMHumanBoneName]?: THREE.Vector3 } = {};
    const boneWorldRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion } = {};
    const boneRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion } = {};
    const parentWorldRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion } = {};

    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = modelRig.getBoneNode(boneName);

      if (boneNode) {
        const boneWorldPosition = new THREE.Vector3();
        const boneWorldRotation = new THREE.Quaternion();

        boneNode.updateWorldMatrix(true, false);
        boneNode.matrixWorld.decompose(boneWorldPosition, boneWorldRotation, _v3A);

        boneWorldPositions[boneName] = boneWorldPosition;
        boneWorldRotations[boneName] = boneWorldRotation;
        boneRotations[boneName] = boneNode.quaternion.clone();

        const parentWorldRotation = new THREE.Quaternion();
        boneNode.parent?.matrixWorld.decompose(_v3A, parentWorldRotation, _v3A);
        parentWorldRotations[boneName] = parentWorldRotation;
      }
    });

    // build rig hierarchy + store parentWorldRotations
    const rigBones: Partial<VRMHumanBones> = {};
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = modelRig.getBoneNode(boneName);

      if (boneNode) {
        const boneWorldPosition = boneWorldPositions[boneName] as THREE.Vector3;

        // see the nearest parent position
        let currentBoneName: VRMHumanBoneName | null = boneName;
        let parentBoneWorldPosition: THREE.Vector3 | undefined;
        while (parentBoneWorldPosition == null) {
          currentBoneName = VRMHumanBoneParentMap[currentBoneName];
          if (currentBoneName == null) {
            break;
          }
          parentBoneWorldPosition = boneWorldPositions[currentBoneName];
        }

        // add to hierarchy
        const rigBoneNode = new THREE.Object3D();
        rigBoneNode.name = 'Normalized_' + boneNode.name;

        const parentRigBoneNode = (currentBoneName ? rigBones[currentBoneName]?.node : root) as THREE.Object3D;

        parentRigBoneNode.add(rigBoneNode);
        rigBoneNode.position.copy(boneWorldPosition);
        if (parentBoneWorldPosition) {
          rigBoneNode.position.sub(parentBoneWorldPosition);
        }

        rigBones[boneName] = { node: rigBoneNode };
      }
    });

    return {
      rigBones: rigBones as VRMHumanBones,
      root,
      parentWorldRotations,
      boneRotations,
    };
  }

  public readonly original: VRMRig;
  public readonly root: THREE.Object3D;
  protected readonly _parentWorldRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion };
  protected readonly _boneRotations: { [boneName in VRMHumanBoneName]?: THREE.Quaternion };

  public constructor(humanoid: VRMRig) {
    const { rigBones, root, parentWorldRotations, boneRotations } = VRMHumanoidRig._setupTransforms(humanoid);

    super(rigBones);

    this.original = humanoid;
    this.root = root;
    this._parentWorldRotations = parentWorldRotations;
    this._boneRotations = boneRotations;
  }

  /**
   * Update this humanoid rig.
   */
  public update(): void {
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = this.original.getBoneNode(boneName);

      if (boneNode != null) {
        const rigBoneNode = this.getBoneNode(boneName)!;
        const parentWorldRotation = this._parentWorldRotations[boneName]!;
        const invParentWorldRotation = _quatA.copy(parentWorldRotation).invert();
        const boneRotation = this._boneRotations[boneName]!;

        boneNode.quaternion
          .copy(rigBoneNode.quaternion)
          .multiply(parentWorldRotation)
          .premultiply(invParentWorldRotation)
          .multiply(boneRotation);

        // Move the mass center of the VRM
        if (boneName === 'hips') {
          const boneWorldPosition = rigBoneNode.getWorldPosition(_boneWorldPos);
          boneNode.parent!.updateWorldMatrix(true, false);
          const parentWorldMatrix = boneNode.parent!.matrixWorld;
          const localPosition = boneWorldPosition.applyMatrix4(parentWorldMatrix.invert());
          boneNode.position.copy(localPosition);
        }
      }
    });
  }
}
