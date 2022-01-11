import * as THREE from 'three';
import { quatInvertCompat } from '../utils/quatInvertCompat';
import type { VRMHumanBone } from './VRMHumanBone';
import type { VRMHumanBones } from './VRMHumanBones';
import type { VRMHumanBoneName } from './VRMHumanBoneName';
import type { VRMPose } from './VRMPose';
import { VRMHumanBoneList } from './VRMHumanBoneList';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _mat4A = new THREE.Matrix4();
const _mat4B = new THREE.Matrix4();

/**
 * A class represents a humanoid of a VRM.
 */
export class VRMHumanoid {
  /**
   * A {@link VRMHumanBones} that contains all the human bones of the VRM.
   * You might want to get these bones using {@link VRMHumanoid.getBone}.
   */
  public humanBones: VRMHumanBones;

  /**
   * A {@link VRMPose} that is its default state.
   * Note that it's not compatible with {@link setPose} and {@link getPose}, since it contains non-relative values of each local transforms.
   */
  public restPose: VRMPose;

  /**
   * Create a new {@link VRMHumanoid}.
   * @param boneArray A {@link VRMHumanBones} contains all the bones of the new humanoid
   */
  public constructor(humanBones: VRMHumanBones) {
    this.humanBones = humanBones;

    this.restPose = this.getAbsolutePose();
  }

  /**
   * Copy the given {@link VRMHumanoid} into this one.
   * @param source The {@link VRMHumanoid} you want to copy
   * @returns this
   */
  public copy(source: VRMHumanoid): this {
    this.humanBones = source.humanBones;
    this.restPose = source.restPose;

    return this;
  }

  /**
   * Returns a clone of this {@link VRMHumanoid}.
   * @returns Copied {@link VRMHumanoid}
   */
  public clone(): VRMHumanoid {
    return new VRMHumanoid(this.humanBones).copy(this);
  }

  /**
   * Return the current absolute pose of this humanoid as a {@link VRMPose}.
   * Note that the output result will contain initial state of the VRM and not compatible between different models.
   * You might want to use {@link getPose} instead.
   */
  public getAbsolutePose(): VRMPose {
    const pose = {} as VRMPose;

    Object.keys(this.humanBones).forEach((vrmBoneNameString) => {
      const vrmBoneName = vrmBoneNameString as VRMHumanBoneName;
      const node = this.getBoneNode(vrmBoneName);

      // Ignore when there are no bone on the VRMHumanoid
      if (!node) {
        return;
      }

      // Get the position / rotation from the node
      _v3A.copy(node.position);
      _quatA.copy(node.quaternion);

      // Convert to raw arrays
      pose[vrmBoneName] = {
        position: _v3A.toArray() as [number, number, number],
        rotation: _quatA.toArray() as [number, number, number, number],
      };
    });

    return pose;
  }

  /**
   * Return the current pose of this humanoid as a {@link VRMPose}.
   *
   * Each transform is a local transform relative from rest pose (T-pose).
   */
  public getPose(): VRMPose {
    const pose = {} as VRMPose;

    Object.keys(this.humanBones).forEach((boneNameString) => {
      const boneName = boneNameString as VRMHumanBoneName;
      const node = this.getBoneNode(boneName);

      // Ignore when there are no bone on the VRMHumanoid
      if (!node) {
        return;
      }

      // Take a diff from restPose
      _v3A.set(0, 0, 0);
      _quatA.identity();

      const restState = this.restPose[boneName];
      if (restState?.position) {
        _v3A.fromArray(restState.position).negate();
      }
      if (restState?.rotation) {
        quatInvertCompat(_quatA.fromArray(restState.rotation));
      }

      // Get the position / rotation from the node
      _v3A.add(node.position);
      _quatA.premultiply(node.quaternion);

      // Convert to raw arrays
      pose[boneName] = {
        position: _v3A.toArray() as [number, number, number],
        rotation: _quatA.toArray() as [number, number, number, number],
      };
    });

    return pose;
  }

  /**
   * Let the humanoid do a specified pose.
   *
   * Each transform have to be a local transform relative from rest pose (T-pose).
   * You can pass what you got from {@link getPose}.
   *
   * @param poseObject A [[VRMPose]] that represents a single pose
   */
  public setPose(poseObject: VRMPose): void {
    Object.entries(poseObject).forEach(([boneNameString, state]) => {
      const boneName = boneNameString as VRMHumanBoneName;
      const node = this.getBoneNode(boneName);

      // Ignore when there are no bone that is defined in the pose on the VRMHumanoid
      if (!node) {
        return;
      }

      const restState = this.restPose[boneName];
      if (!restState) {
        // It's very unlikely. Possibly a bug
        return;
      }

      // Apply the state to the actual bone
      if (state?.position) {
        node.position.fromArray(state.position);

        if (restState.position) {
          node.position.add(_v3A.fromArray(restState.position));
        }
      }

      if (state?.rotation) {
        node.quaternion.fromArray(state.rotation);

        if (restState.rotation) {
          node.quaternion.multiply(_quatA.fromArray(restState.rotation));
        }
      }
    });
  }

  /**
   * Reset the humanoid to its rest pose.
   */
  public resetPose(): void {
    Object.entries(this.restPose).forEach(([boneName, rest]) => {
      const node = this.getBoneNode(boneName as VRMHumanBoneName);

      if (!node) {
        return;
      }

      if (rest?.position) {
        node.position.fromArray(rest.position);
      }

      if (rest?.rotation) {
        node.quaternion.fromArray(rest.rotation);
      }
    });
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
   *
   * @param name Name of the bone you want
   */
  public getBone(name: VRMHumanBoneName): VRMHumanBone | undefined {
    return this.humanBones[name] ?? undefined;
  }

  /**
   * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
   *
   * @param name Name of the bone you want
   */
  public getBoneNode(name: VRMHumanBoneName): THREE.Object3D | null {
    return this.humanBones[name]?.node ?? null;
  }

  /**
   * Normalize bone orientations.
   * It also converts skeletons inside given scene.
   *
   * @param root Root object that will be traversed for skeletons
   */
  public normalizeBoneOrientations(root?: THREE.Object3D): void {
    this.transferBoneOrientations({}, new THREE.Quaternion(), root);
  }

  /**
   * Transfer a bone orientation structure to this model from another model.
   * You can use {@link restPose} retrieved from other models.
   * It also converts skeletons inside given scene.
   *
   * @param pose The reference rest pose retrieved from other models
   * @param hipsWorldQuat The world space rotation of hips
   * @param root Root object that will be traversed for skeletons
   */
  public transferBoneOrientations(pose: VRMPose, hipsWorldQuat?: THREE.Quaternion, root?: THREE.Object3D): void {
    /** A map from bone object to original world matrix */
    const originalWorldMatrixMap = new Map<THREE.Object3D, THREE.Matrix4>();

    /** A map from bone object to new world matrix */
    const newWorldMatrixMap = new Map<THREE.Object3D, THREE.Matrix4>();

    // store the current world matrix of human bones
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = this.getBoneNode(boneName);
      if (boneNode == null) {
        return;
      }

      originalWorldMatrixMap.set(boneNode, boneNode.matrixWorld.clone());
    });

    // store current world matrices of all root objects
    // skinned mesh might depend on non humanoid bones!
    root?.updateWorldMatrix(true, true);
    root?.traverse((obj) => {
      originalWorldMatrixMap.set(obj, obj.matrixWorld.clone());
    });

    // copy reference orientation
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = this.getBoneNode(boneName);
      if (boneNode == null) {
        return;
      }

      if (hipsWorldQuat != null && boneName === 'hips') {
        boneNode.updateWorldMatrix(false, false);
        const invBoneWorldQuat = boneNode.getWorldQuaternion(_quatA).invert();
        boneNode.quaternion.multiply(invBoneWorldQuat);
        boneNode.updateWorldMatrix(false, false);
        boneNode.applyQuaternion(hipsWorldQuat);
        return;
      }

      const referenceQuat = pose[boneName]?.rotation;
      if (referenceQuat != null) {
        // copy reference orientation
        boneNode.quaternion.fromArray(referenceQuat);
      } else {
        boneNode.quaternion.identity();
      }
    });

    // translate bones
    VRMHumanBoneList.forEach((boneName) => {
      const boneNode = this.getBoneNode(boneName);
      if (boneNode == null) {
        return;
      }

      const originalWorldMatrix = originalWorldMatrixMap.get(boneNode);

      if (originalWorldMatrix != null) {
        /** The vector is going to be a new local position of boneNode */
        const position = _v3A.set(
          originalWorldMatrix.elements[12],
          originalWorldMatrix.elements[13],
          originalWorldMatrix.elements[14],
        );

        const parent = boneNode.parent;
        if (parent) {
          parent.worldToLocal(position);
        }

        boneNode.position.copy(position);
      }

      // set the new world matrix
      boneNode.updateWorldMatrix(true, false);
      newWorldMatrixMap.set(boneNode, boneNode.matrixWorld.clone());
    });

    // store new world matrices of all root objects
    // skinned mesh might depend on non humanoid bones!
    root?.updateWorldMatrix(true, true);
    root?.traverse((obj) => {
      newWorldMatrixMap.set(obj, obj.matrixWorld.clone());
    });

    // list all skeletons in the root
    const skeletons: THREE.Skeleton[] = [];
    root?.traverse((obj) => {
      if (obj.type !== 'SkinnedMesh') {
        return;
      }

      const mesh = obj as THREE.SkinnedMesh;
      const skeleton = mesh.skeleton;
      skeletons.push(skeleton);
    });

    // apply diff of world transform to skeletons
    skeletons.forEach((skeleton) => {
      skeleton.bones.forEach((bone, boneIndex) => {
        const originalWorldMatrix = originalWorldMatrixMap.get(bone);
        const newWorldMatrix = newWorldMatrixMap.get(bone);

        if (originalWorldMatrix != null && newWorldMatrix != null) {
          const boneInverse = skeleton.boneInverses[boneIndex];

          // current: worldMatrix * boneInverse = dest
          // need: newWorldMatrix * newBoneInverse = dest
          // do: invNewWorldMatrix * newWorldMatrix * newBoneInverse = invNewWorldMatrix * dest

          const dest = _mat4A.multiplyMatrices(originalWorldMatrix, boneInverse);
          const invNewWorldMatrix = _mat4B.copy(newWorldMatrix).invert();
          boneInverse.multiplyMatrices(invNewWorldMatrix, dest);
        }
      });
    });

    // update rest pose
    this.restPose = this.getAbsolutePose();
  }
}
