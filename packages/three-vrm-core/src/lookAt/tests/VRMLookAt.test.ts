import * as THREE from 'three';
import { VRMHumanBoneName, VRMHumanBoneParentMap, VRMHumanBones, VRMHumanoid } from '../../humanoid';
import { VRMLookAt } from '../VRMLookAt';
import { VRMLookAtBoneApplier } from '../VRMLookAtBoneApplier';
import { VRMLookAtRangeMap } from '../VRMLookAtRangeMap';
import { toBeCloseToQuaternion } from '../../tests/matchers/toBeCloseToQuaternion';
import { toBeCloseToVector3 } from '../../tests/matchers/toBeCloseToVector3';

// This is not a proper test!
// We are currently looking for a solution for an issue under the specific case

const SQRT_2_OVER_2 = Math.sqrt(2.0) / 2.0;
const VEC3_POSITIVE_X = new THREE.Vector3(1.0, 0.0, 0.0);
const VEC3_POSITIVE_Z = new THREE.Vector3(0.0, 0.0, 1.0);
const QUAT_Y_CW90 = new THREE.Quaternion(0, -SQRT_2_OVER_2, 0, SQRT_2_OVER_2);
const QUAT_Y_CCW90 = new THREE.Quaternion(0, SQRT_2_OVER_2, 0, SQRT_2_OVER_2);

beforeEach(() => {
  expect.extend({ toBeCloseToQuaternion, toBeCloseToVector3 });
});

function createHumanoid(): VRMHumanoid {
  // create humanBones
  const humanBones: VRMHumanBones = {
    hips: { node: new THREE.Object3D() },
    spine: { node: new THREE.Object3D() },
    chest: { node: new THREE.Object3D() },
    upperChest: { node: new THREE.Object3D() },
    neck: { node: new THREE.Object3D() },
    head: { node: new THREE.Object3D() },
    leftUpperLeg: { node: new THREE.Object3D() },
    leftLowerLeg: { node: new THREE.Object3D() },
    leftFoot: { node: new THREE.Object3D() },
    rightUpperLeg: { node: new THREE.Object3D() },
    rightLowerLeg: { node: new THREE.Object3D() },
    rightFoot: { node: new THREE.Object3D() },
    leftUpperArm: { node: new THREE.Object3D() },
    leftLowerArm: { node: new THREE.Object3D() },
    leftHand: { node: new THREE.Object3D() },
    rightUpperArm: { node: new THREE.Object3D() },
    rightLowerArm: { node: new THREE.Object3D() },
    rightHand: { node: new THREE.Object3D() },
    leftEye: { node: new THREE.Object3D() },
    rightEye: { node: new THREE.Object3D() },
  };

  // set positions
  humanBones.hips.node.position.set(0.0, 0.6, 0.0);
  humanBones.spine.node.position.set(0.0, 0.2, 0.0);
  humanBones.chest!.node.position.set(0.0, 0.2, 0.0);
  humanBones.upperChest!.node.position.set(0.0, 0.2, 0.0);
  humanBones.neck!.node.position.set(0.0, 0.1, 0.0);
  humanBones.head.node.position.set(0.0, 0.1, 0.0);
  humanBones.leftEye!.node.position.set(0.1, 0.1, 0.0);
  humanBones.rightEye!.node.position.set(-0.1, 0.1, 0.0);

  // "the specific case"
  humanBones.head.node.quaternion.copy(QUAT_Y_CCW90);
  humanBones.leftEye!.node.quaternion.copy(QUAT_Y_CW90);
  humanBones.rightEye!.node.quaternion.copy(QUAT_Y_CW90);

  // build hierarchy
  Object.entries(humanBones).forEach(([boneNameStr, bone]) => {
    const boneNode = bone?.node;
    if (boneNode != null) {
      const boneName = boneNameStr as VRMHumanBoneName;
      const parentName = VRMHumanBoneParentMap[boneName];
      if (parentName != null) {
        const parent = humanBones[parentName];
        parent?.node.add(boneNode);
      }
    }
  });

  // create humanoid
  const humanoid = new VRMHumanoid(humanBones);

  return humanoid;
}

function createBoneApplier(humanoid: VRMHumanoid): VRMLookAtBoneApplier {
  return new VRMLookAtBoneApplier(
    humanoid,
    new VRMLookAtRangeMap(30.0, 5.0),
    new VRMLookAtRangeMap(30.0, 5.0),
    new VRMLookAtRangeMap(30.0, 5.0),
    new VRMLookAtRangeMap(30.0, 5.0),
  );
}

describe('VRMLookAt', () => {
  let scene: THREE.Scene;
  let humanoid: VRMHumanoid;
  let applier: VRMLookAtBoneApplier;
  let lookAt: VRMLookAt;

  beforeEach(() => {
    scene = new THREE.Scene();

    humanoid = createHumanoid();
    scene.add(humanoid.getRawBoneNode('hips')!);
    scene.add(humanoid.normalizedHumanBonesRoot);

    applier = createBoneApplier(humanoid);
    lookAt = new VRMLookAt(humanoid, applier);
  });

  describe('getLookAtWorldPosition', () => {
    it('returns the world position of the head', () => {
      const actual = lookAt.getLookAtWorldPosition(new THREE.Vector3());
      expect(actual).toBeCloseToVector3(new THREE.Vector3(0.0, 1.4, 0.0));
    });
  });

  describe('getLookAtWorldQuaternion', () => {
    it('returns the world quaternion of the head', () => {
      const actual = lookAt.getLookAtWorldQuaternion(new THREE.Quaternion());
      expect(actual).toBeCloseToQuaternion(QUAT_Y_CCW90);
    });

    describe('when the head rotates', () => {
      beforeEach(() => {
        humanoid.getNormalizedBoneNode('head')!.quaternion.multiply(QUAT_Y_CCW90);
        humanoid.update();
        scene.updateMatrixWorld();
      });

      it('returns a quaternion that rotates the +Z unit to the faceFront direction', () => {
        const actual = lookAt.getFaceFrontQuaternion(new THREE.Quaternion());
        expect(actual).toBeCloseToQuaternion(QUAT_Y_CW90);
      });
    });
  });

  describe('getFaceFrontQuaternion', () => {
    it('returns a quaternion that rotates the +Z unit to the faceFront direction', () => {
      const actual = lookAt.getFaceFrontQuaternion(new THREE.Quaternion());
      expect(actual).toBeCloseToQuaternion(QUAT_Y_CW90);
    });

    describe('when the head rotates', () => {
      beforeEach(() => {
        humanoid.getNormalizedBoneNode('head')!.quaternion.multiply(QUAT_Y_CCW90);
        humanoid.update();
        scene.updateMatrixWorld();
      });

      it('returns a quaternion that rotates the +Z unit to the faceFront direction', () => {
        const actual = lookAt.getFaceFrontQuaternion(new THREE.Quaternion());
        expect(actual).toBeCloseToQuaternion(QUAT_Y_CW90);
      });
    });
  });

  describe('getLookAtWorldDirection', () => {
    it('returns the look at direction in world space', () => {
      const actual = lookAt.getLookAtWorldDirection(new THREE.Vector3());
      expect(actual).toBeCloseToVector3(VEC3_POSITIVE_Z);
    });

    describe('when the head rotates', () => {
      beforeEach(() => {
        humanoid.getNormalizedBoneNode('head')!.quaternion.multiply(QUAT_Y_CCW90);
        humanoid.update();
        scene.updateMatrixWorld();
      });

      it('returns the look at direction in world space', () => {
        const actual = lookAt.getLookAtWorldDirection(new THREE.Vector3());
        expect(actual).toBeCloseToVector3(VEC3_POSITIVE_X);
      });
    });
  });

  describe('lookAt', () => {
    it('updates its lookAt angles', () => {
      const target = lookAt.getLookAtWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0.0, 0.0, 5.0));
      lookAt.lookAt(target);

      expect(lookAt.yaw).toBeCloseTo(0.0);
      expect(lookAt.pitch).toBeCloseTo(0.0);
    });

    describe('when the head rotates', () => {
      beforeEach(() => {
        humanoid.getNormalizedBoneNode('head')!.quaternion.multiply(QUAT_Y_CCW90);
        humanoid.update();
        scene.updateMatrixWorld();
      });

      it('updates its lookAt angles', () => {
        const target = lookAt.getLookAtWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0.0, 0.0, 5.0));
        lookAt.lookAt(target);

        expect(lookAt.yaw).toBeCloseTo(-90.0);
        expect(lookAt.pitch).toBeCloseTo(0.0);
      });
    });
  });

  it.todo('Test when the faceFront is (0, 0, -1)');
});
