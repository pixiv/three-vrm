import { Bone, GLTFNode } from '../types'

export class VRMHumanBones {
  public [Bone.Hips]: GLTFNode
  public [Bone.LeftUpperLeg]: GLTFNode
  public [Bone.RightUpperLeg]: GLTFNode
  public [Bone.LeftLowerLeg]: GLTFNode
  public [Bone.RightLowerLeg]: GLTFNode
  public [Bone.LeftFoot]: GLTFNode
  public [Bone.RightFoot]: GLTFNode
  public [Bone.Spine]: GLTFNode
  public [Bone.Chest]: GLTFNode
  public [Bone.Neck]: GLTFNode
  public [Bone.Head]: GLTFNode
  public [Bone.LeftShoulder]?: GLTFNode
  public [Bone.RightShoulder]?: GLTFNode
  public [Bone.LeftUpperArm]: GLTFNode
  public [Bone.RightUpperArm]: GLTFNode
  public [Bone.LeftLowerArm]: GLTFNode
  public [Bone.RightLowerArm]: GLTFNode
  public [Bone.LeftHand]: GLTFNode
  public [Bone.RightHand]: GLTFNode
  public [Bone.LeftToes]?: GLTFNode
  public [Bone.RightToes]?: GLTFNode
  public [Bone.LeftEye]?: GLTFNode
  public [Bone.RightEye]?: GLTFNode
  public [Bone.Jaw]: GLTFNode
  public [Bone.LeftThumbProximal]?: GLTFNode
  public [Bone.LeftThumbIntermediate]?: GLTFNode
  public [Bone.LeftThumbDistal]?: GLTFNode
  public [Bone.LeftIndexProximal]?: GLTFNode
  public [Bone.LeftIndexIntermediate]?: GLTFNode
  public [Bone.LeftIndexDistal]?: GLTFNode
  public [Bone.LeftMiddleProximal]?: GLTFNode
  public [Bone.LeftMiddleIntermediate]?: GLTFNode
  public [Bone.LeftMiddleDistal]?: GLTFNode
  public [Bone.LeftRingProximal]?: GLTFNode
  public [Bone.LeftRingIntermediate]?: GLTFNode
  public [Bone.LeftRingDistal]?: GLTFNode
  public [Bone.LeftLittleProximal]?: GLTFNode
  public [Bone.LeftLittleIntermediate]?: GLTFNode
  public [Bone.LeftLittleDistal]?: GLTFNode
  public [Bone.RightThumbProximal]?: GLTFNode
  public [Bone.RightThumbIntermediate]?: GLTFNode
  public [Bone.RightThumbDistal]?: GLTFNode
  public [Bone.RightIndexProximal]?: GLTFNode
  public [Bone.RightIndexIntermediate]?: GLTFNode
  public [Bone.RightIndexDistal]?: GLTFNode
  public [Bone.RightMiddleProximal]?: GLTFNode
  public [Bone.RightMiddleIntermediate]?: GLTFNode
  public [Bone.RightMiddleDistal]?: GLTFNode
  public [Bone.RightRingProximal]?: GLTFNode
  public [Bone.RightRingIntermediate]?: GLTFNode
  public [Bone.RightRingDistal]?: GLTFNode
  public [Bone.RightLittleProximal]?: GLTFNode
  public [Bone.RightLittleIntermediate]?: GLTFNode
  public [Bone.RightLittleDistal]?: GLTFNode
  public [Bone.UpperChest]?: GLTFNode

  [name: string]: GLTFNode | undefined;
}