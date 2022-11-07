import * as THREE from 'three';
import { VRMHumanBoneName, VRMHumanBoneParentMap, VRMHumanBones, VRMHumanoid } from '../../humanoid';
import { VRMLookAtBoneApplier } from '../VRMLookAtBoneApplier';
import { VRMLookAtRangeMap } from '../VRMLookAtRangeMap';
import { toBeCloseToQuaternion } from '../../tests/matchers/toBeCloseToQuaternion';

// This is not a proper test!
// We are currently looking for a solution for an issue under the specific case

const { DEG2RAD } = THREE.MathUtils;
const SQRT_2_OVER_2 = Math.sqrt(2.0) / 2.0;
const QUAT_Y_CW90 = new THREE.Quaternion(0, -SQRT_2_OVER_2, 0, SQRT_2_OVER_2);
const QUAT_Y_CCW90 = new THREE.Quaternion(0, SQRT_2_OVER_2, 0, SQRT_2_OVER_2);

beforeEach(() => {
  expect.extend({ toBeCloseToQuaternion });
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

describe('VRMLookAtBoneApplier', () => {
  let scene: THREE.Scene;
  let humanoid: VRMHumanoid;
  let applier: VRMLookAtBoneApplier;

  beforeEach(() => {
    scene = new THREE.Scene();

    humanoid = createHumanoid();
    scene.add(humanoid.getRawBoneNode('hips')!);

    applier = createBoneApplier(humanoid);
  });

  describe('applyYawPitch', () => {
    it('makes the raw left eye look toward the specified angle', () => {
      applier.applyYawPitch(15.0, 15.0);

      const rawLeftEye = humanoid.getRawBoneNode('leftEye')!;

      // saturate( angle / rangeMap.inputMaxValue ) * rangeMap.outputScale = saturate( 15 / 30 ) * 5 = 2.5
      const expected = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(DEG2RAD * 2.5, DEG2RAD * 2.5, 0.0, 'YXZ'))
        .multiply(QUAT_Y_CW90);

      expect(rawLeftEye.quaternion).toBeCloseToQuaternion(expected);
    });

    it('makes the normalized left eye look toward the specified angle', () => {
      applier.applyYawPitch(15.0, 15.0);

      const normalizedLeftEye = humanoid.getNormalizedBoneNode('leftEye')!;
      const expected = new THREE.Quaternion().setFromEuler(new THREE.Euler(DEG2RAD * 2.5, DEG2RAD * 2.5, 0.0, 'YXZ'));
      expect(normalizedLeftEye.quaternion).toBeCloseToQuaternion(expected);
    });

    it('makes the raw right eye look toward the specified angle', () => {
      applier.applyYawPitch(15.0, 15.0);

      const rawRightEye = humanoid.getRawBoneNode('rightEye')!;

      // saturate( angle / rangeMap.inputMaxValue ) * rangeMap.outputScale = saturate( 15 / 30 ) * 5 = 2.5
      const expected = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(DEG2RAD * 2.5, DEG2RAD * 2.5, 0.0, 'YXZ'))
        .multiply(QUAT_Y_CW90);

      expect(rawRightEye.quaternion).toBeCloseToQuaternion(expected);
    });

    it('makes the normalized right eye look toward the specified angle', () => {
      applier.applyYawPitch(15.0, 15.0);

      const normalizedRightEye = humanoid.getNormalizedBoneNode('rightEye')!;

      // saturate( angle / rangeMap.inputMaxValue ) * rangeMap.outputScale = saturate( 15 / 30 ) * 5 = 2.5
      const expected = new THREE.Quaternion().setFromEuler(new THREE.Euler(DEG2RAD * 2.5, DEG2RAD * 2.5, 0.0, 'YXZ'));

      expect(normalizedRightEye.quaternion).toBeCloseToQuaternion(expected);
    });

    describe('when leftEye and rightEye have different rest orientations', () => {
      beforeEach(() => {
        scene = new THREE.Scene();

        humanoid = createHumanoid();
        scene.add(humanoid.getRawBoneNode('hips')!);
        humanoid.getRawBoneNode('rightEye')!.quaternion.copy(QUAT_Y_CCW90);

        applier = createBoneApplier(humanoid);
      });

      it('makes each eye look toward the specified angle', () => {
        applier.applyYawPitch(15.0, 15.0);

        const rawLeftEye = humanoid.getRawBoneNode('leftEye')!;
        const rawRightEye = humanoid.getRawBoneNode('rightEye')!;

        // saturate( angle / rangeMap.inputMaxValue ) * rangeMap.outputScale = saturate( 15 / 30 ) * 5 = 2.5
        const expectedLeft = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(DEG2RAD * 2.5, DEG2RAD * 2.5, 0.0, 'YXZ'))
          .multiply(QUAT_Y_CW90);
        const expectedRight = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(DEG2RAD * 2.5, DEG2RAD * 2.5, 0.0, 'YXZ'))
          .multiply(QUAT_Y_CCW90);

        expect(rawLeftEye.quaternion).toBeCloseToQuaternion(expectedLeft);
        expect(rawRightEye.quaternion).toBeCloseToQuaternion(expectedRight);
      });
    });
  });

  it.todo('Test when the faceFront is (0, 0, -1)');
});
