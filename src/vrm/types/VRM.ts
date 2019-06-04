/**
 * VRM.ts extension is for 3d humanoid avatars (and models) in VR applications.
 */
export interface RawVrm {
  BlendShapeMaster?: RawVrmBlendShape;
  /**
   * Version of exporter that vrm created. UniVRM-0.46
   */
  exporterVersion?: string;
  firstPerson?: RawVrmFirstPerson;
  humanoid?: RawVrmHumanoid;
  materialProperties?: RawVrmMaterial[];
  meta?: RawVrmMeta;
  secondaryAnimation?: RawVrmSecondaryanimation;
}

export interface RawVrmBlendShape {
  BlendShapeGroups?: RawVrmBlendShapeGroup[];
}

export interface RawVrmBlendShapeGroup {
  /**
   * Low level BlendShape references.
   */
  binds?: RawVrmBlendShapeBind[];
  /**
   * 0 or 1. Do not allow an intermediate value. Value should rounded
   */
  isBinary?: boolean;
  /**
   * Material animation references.
   */
  materialValues?: RawVrmBlendShapeMaterialbind[];
  /**
   * Expression name
   */
  name?: string;
  /**
   * Predefined Expression name
   */
  presetName?: BlendShapePresetName;
}

export interface RawVrmBlendShapeBind {
  index?: number;
  mesh?: number;
  /**
   * SkinnedMeshRenderer.SetBlendShapeWeight
   */
  weight?: number;
}

export interface RawVrmBlendShapeMaterialbind {
  materialName?: string;
  propertyName?: string;
  targetValue?: number[];
}

/**
 * Predefined Expression name
 */
export enum BlendShapePresetName {
  A = 'a',
  Angry = 'angry',
  Blink = 'blink',
  BlinkL = 'blink_l',
  BlinkR = 'blink_r',
  E = 'e',
  Fun = 'fun',
  I = 'i',
  Joy = 'joy',
  Lookdown = 'lookdown',
  Lookleft = 'lookleft',
  Lookright = 'lookright',
  Lookup = 'lookup',
  Neutral = 'neutral',
  O = 'o',
  Sorrow = 'sorrow',
  U = 'u',
  Unknown = 'unknown',
}

export interface RawVrmFirstPerson {
  /**
   * The bone whose rendering should be turned off in first-person view. Usually Head is
   * specified.
   */
  firstPersonBone?: number;
  /**
   * The target position of the VR headset in first-person view. It is assumed that an offset
   * from the head bone to the VR headset is added.
   */
  firstPersonBoneOffset?: RawFirstPersonBoneOffset;
  lookAtHorizontalInner?: RawVrmFirstPersonDegreemap;
  lookAtHorizontalOuter?: RawVrmFirstPersonDegreemap;
  /**
   * Eye controller mode.
   */
  lookAtTypeName?: LookAtTypeName;
  lookAtVerticalDown?: RawVrmFirstPersonDegreemap;
  lookAtVerticalUp?: RawVrmFirstPersonDegreemap;
  /**
   * Switch display / undisplay for each mesh in first-person view or the others.
   */
  meshAnnotations?: RawVrmFirstPersonMeshannotation[];
}

/**
 * The target position of the VR headset in first-person view. It is assumed that an offset
 * from the head bone to the VR headset is added.
 */
export interface RawFirstPersonBoneOffset {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Eye controller setting.
 */
export interface RawVrmFirstPersonDegreemap {
  /**
   * None linear mapping params. time, value, inTangent, outTangent
   */
  curve?: number[];
  /**
   * Look at input clamp range degree.
   */
  xRange?: number;
  /**
   * Look at map range degree from xRange.
   */
  yRange?: number;
}

/**
 * Eye controller mode.
 */
export enum LookAtTypeName {
  BlendShape = 'BlendShape',
  Bone = 'Bone',
}

export interface RawVrmFirstPersonMeshannotation {
  firstPersonFlag?: string;
  mesh?: number;
}

export interface RawVrmHumanoid {
  /**
   * Unity's HumanDescription.armStretch
   */
  armStretch?: number;
  /**
   * Unity's HumanDescription.feetSpacing
   */
  feetSpacing?: number;
  /**
   * Unity's HumanDescription.hasTranslationDoF
   */
  hasTranslationDoF?: boolean;
  humanBones?: RawVrmHumanoidBone[];
  /**
   * Unity's HumanDescription.legStretch
   */
  legStretch?: number;
  /**
   * Unity's HumanDescription.lowerArmTwist
   */
  lowerArmTwist?: number;
  /**
   * Unity's HumanDescription.lowerLegTwist
   */
  lowerLegTwist?: number;
  /**
   * Unity's HumanDescription.upperArmTwist
   */
  upperArmTwist?: number;
  /**
   * Unity's HumanDescription.upperLegTwist
   */
  upperLegTwist?: number;
}

export interface RawVrmHumanoidBone {
  /**
   * Unity's HumanLimit.axisLength
   */
  axisLength?: number;
  /**
   * Human bone name.
   */
  bone?: Bone;
  /**
   * Unity's HumanLimit.center
   */
  center?: RawCenter;
  /**
   * Unity's HumanLimit.max
   */
  max?: RawMax;
  /**
   * Unity's HumanLimit.min
   */
  min?: RawMin;
  /**
   * Reference node index
   */
  node?: number;
  /**
   * Unity's HumanLimit.useDefaultValues
   */
  useDefaultValues?: boolean;
}

/**
 * Human bone name.
 */
export enum Bone {
  Chest = 'chest',
  Head = 'head',
  Hips = 'hips',
  Jaw = 'jaw',
  LeftEye = 'leftEye',
  LeftFoot = 'leftFoot',
  LeftHand = 'leftHand',
  LeftIndexDistal = 'leftIndexDistal',
  LeftIndexIntermediate = 'leftIndexIntermediate',
  LeftIndexProximal = 'leftIndexProximal',
  LeftLittleDistal = 'leftLittleDistal',
  LeftLittleIntermediate = 'leftLittleIntermediate',
  LeftLittleProximal = 'leftLittleProximal',
  LeftLowerArm = 'leftLowerArm',
  LeftLowerLeg = 'leftLowerLeg',
  LeftMiddleDistal = 'leftMiddleDistal',
  LeftMiddleIntermediate = 'leftMiddleIntermediate',
  LeftMiddleProximal = 'leftMiddleProximal',
  LeftRingDistal = 'leftRingDistal',
  LeftRingIntermediate = 'leftRingIntermediate',
  LeftRingProximal = 'leftRingProximal',
  LeftShoulder = 'leftShoulder',
  LeftThumbDistal = 'leftThumbDistal',
  LeftThumbIntermediate = 'leftThumbIntermediate',
  LeftThumbProximal = 'leftThumbProximal',
  LeftToes = 'leftToes',
  LeftUpperArm = 'leftUpperArm',
  LeftUpperLeg = 'leftUpperLeg',
  Neck = 'neck',
  RightEye = 'rightEye',
  RightFoot = 'rightFoot',
  RightHand = 'rightHand',
  RightIndexDistal = 'rightIndexDistal',
  RightIndexIntermediate = 'rightIndexIntermediate',
  RightIndexProximal = 'rightIndexProximal',
  RightLittleDistal = 'rightLittleDistal',
  RightLittleIntermediate = 'rightLittleIntermediate',
  RightLittleProximal = 'rightLittleProximal',
  RightLowerArm = 'rightLowerArm',
  RightLowerLeg = 'rightLowerLeg',
  RightMiddleDistal = 'rightMiddleDistal',
  RightMiddleIntermediate = 'rightMiddleIntermediate',
  RightMiddleProximal = 'rightMiddleProximal',
  RightRingDistal = 'rightRingDistal',
  RightRingIntermediate = 'rightRingIntermediate',
  RightRingProximal = 'rightRingProximal',
  RightShoulder = 'rightShoulder',
  RightThumbDistal = 'rightThumbDistal',
  RightThumbIntermediate = 'rightThumbIntermediate',
  RightThumbProximal = 'rightThumbProximal',
  RightToes = 'rightToes',
  RightUpperArm = 'rightUpperArm',
  RightUpperLeg = 'rightUpperLeg',
  Spine = 'spine',
  UpperChest = 'upperChest',
}

/**
 * Unity's HumanLimit.center
 */
export interface RawCenter {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Unity's HumanLimit.max
 */
export interface RawMax {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * Unity's HumanLimit.min
 */
export interface RawMin {
  x?: number;
  y?: number;
  z?: number;
}

export interface RawVrmMaterial {
  floatProperties?: { [key: string]: any };
  keywordMap?: { [key: string]: any };
  name?: string;
  renderQueue?: number;
  shader?: string;
  tagMap?: { [key: string]: any };
  textureProperties?: { [key: string]: any };
  vectorProperties?: { [key: string]: any };
}

export interface RawVrmMeta {
  /**
   * A person who can perform with this avatar
   */
  allowedUserName?: AllowedUserName;
  /**
   * Author of VRM.ts model
   */
  author?: string;
  /**
   * For commercial use
   */
  commercialUssageName?: UssageName;
  /**
   * Contact Information of VRM.ts model author
   */
  contactInformation?: string;
  /**
   * License type
   */
  licenseName?: LicenseName;
  /**
   * If “Other” is selected, put the URL link of the license document here.
   */
  otherLicenseUrl?: string;
  /**
   * If there are any conditions not mentioned above, put the URL link of the license document
   * here.
   */
  otherPermissionUrl?: string;
  /**
   * Reference of VRM.ts model
   */
  reference?: string;
  /**
   * Permission to perform sexual acts with this avatar
   */
  sexualUssageName?: UssageName;
  /**
   * Thumbnail of VRM.ts model
   */
  texture?: number;
  /**
   * Title of VRM.ts model
   */
  title?: string;
  /**
   * Version of VRM.ts model
   */
  version?: string;
  /**
   * Permission to perform violent acts with this avatar
   */
  violentUssageName?: UssageName;
}

/**
 * A person who can perform with this avatar
 */
export enum AllowedUserName {
  Everyone = 'Everyone',
  ExplicitlyLicensedPerson = 'ExplicitlyLicensedPerson',
  OnlyAuthor = 'OnlyAuthor',
}

/**
 * For commercial use
 *
 * Permission to perform sexual acts with this avatar
 *
 * Permission to perform violent acts with this avatar
 */
export enum UssageName {
  Allow = 'Allow',
  Disallow = 'Disallow',
}

/**
 * License type
 */
export enum LicenseName {
  Cc0 = 'CC0',
  CcBy = 'CC_BY',
  CcByNc = 'CC_BY_NC',
  CcByNcNd = 'CC_BY_NC_ND',
  CcByNcSa = 'CC_BY_NC_SA',
  CcByNd = 'CC_BY_ND',
  CcBySa = 'CC_BY_SA',
  Other = 'Other',
  RedistributionProhibited = 'Redistribution_Prohibited',
}

export interface RawVrmSecondaryanimation {
  boneGroups?: RawVrmSecondaryanimationSpring[];
  colliderGroups?: RawVrmSecondaryanimationCollidergroup[];
}

export interface RawVrmSecondaryanimationSpring {
  /**
   * Specify the node index of the root bone of the swaying object.
   */
  bones?: number[];
  /**
   * The reference point of a swaying object can be set at any location except the origin.
   * When implementing UI moving with warp, the parent node to move with warp can be specified
   * if you don't want to make the object swaying with warp movement.
   */
  center?: number;
  /**
   * Specify the index of the collider group for collisions with swaying objects.
   */
  colliderGroups?: number[];
  /**
   * Annotation comment
   */
  comment?: string;
  /**
   * The resistance (deceleration) of automatic animation.
   */
  dragForce?: number;
  /**
   * The direction of gravity. Set (0, -1, 0) for simulating the gravity. Set (1, 0, 0) for
   * simulating the wind.
   */
  gravityDir?: RawGravityDir;
  /**
   * The strength of gravity.
   */
  gravityPower?: number;
  /**
   * The radius of the sphere used for the collision detection with colliders.
   */
  hitRadius?: number;
  /**
   * The resilience of the swaying object (the power of returning to the initial pose).
   */
  stiffiness?: number;
}

/**
 * The direction of gravity. Set (0, -1, 0) for simulating the gravity. Set (1, 0, 0) for
 * simulating the wind.
 */
export interface RawGravityDir {
  x?: number;
  y?: number;
  z?: number;
}

export interface RawVrmSecondaryanimationCollidergroup {
  colliders?: RawCollider[];
  /**
   * The node of the collider group for setting up collision detections.
   */
  node?: number;
}

export interface RawCollider {
  /**
   * The local coordinate from the node of the collider group.
   */
  offset?: RawOffset;
  /**
   * The radius of the collider.
   */
  radius?: number;
}

/**
 * The local coordinate from the node of the collider group.
 */
export interface RawOffset {
  x?: number;
  y?: number;
  z?: number;
}
