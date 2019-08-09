import { GLTFNode, VRMSchema } from '../types';

/**
 * A class represents the `humanoid.humanBones` array of a VRM.
 * This is simply a list of bones of your VRM.
 */
export class VRMHumanBones {
  public [VRMSchema.HumanoidBoneName.Hips]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftUpperLeg]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightUpperLeg]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftLowerLeg]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightLowerLeg]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftFoot]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightFoot]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.Spine]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.Chest]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.Neck]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.Head]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftShoulder]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightShoulder]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftUpperArm]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightUpperArm]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftLowerArm]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightLowerArm]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftHand]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightHand]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftToes]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightToes]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftEye]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightEye]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.Jaw]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftThumbProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftThumbIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftThumbDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftIndexProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftIndexIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftIndexDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftMiddleProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftMiddleIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftMiddleDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftRingProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftRingIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftRingDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftLittleProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftLittleIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.LeftLittleDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightThumbProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightThumbIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightThumbDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightIndexProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightIndexIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightIndexDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightMiddleProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightMiddleIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightMiddleDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightRingProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightRingIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightRingDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightLittleProximal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightLittleIntermediate]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.RightLittleDistal]: GLTFNode;
  public [VRMSchema.HumanoidBoneName.UpperChest]: GLTFNode;

  [name: string]: GLTFNode | undefined;
}
