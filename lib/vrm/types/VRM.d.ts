export interface RawVrm {
    BlendShapeMaster?: RawVrmBlendShape;
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
    binds?: RawVrmBlendShapeBind[];
    isBinary?: boolean;
    materialValues?: RawVrmBlendShapeMaterialbind[];
    name?: string;
    presetName?: BlendShapePresetName;
}
export interface RawVrmBlendShapeBind {
    index?: number;
    mesh?: number;
    weight?: number;
}
export interface RawVrmBlendShapeMaterialbind {
    materialName?: string;
    propertyName?: string;
    targetValue?: number[];
}
export declare enum BlendShapePresetName {
    A = "a",
    Angry = "angry",
    Blink = "blink",
    BlinkL = "blink_l",
    BlinkR = "blink_r",
    E = "e",
    Fun = "fun",
    I = "i",
    Joy = "joy",
    Lookdown = "lookdown",
    Lookleft = "lookleft",
    Lookright = "lookright",
    Lookup = "lookup",
    Neutral = "neutral",
    O = "o",
    Sorrow = "sorrow",
    U = "u",
    Unknown = "unknown"
}
export interface RawVrmFirstPerson {
    firstPersonBone?: number;
    firstPersonBoneOffset?: RawFirstPersonBoneOffset;
    lookAtHorizontalInner?: RawVrmFirstPersonDegreemap;
    lookAtHorizontalOuter?: RawVrmFirstPersonDegreemap;
    lookAtTypeName?: LookAtTypeName;
    lookAtVerticalDown?: RawVrmFirstPersonDegreemap;
    lookAtVerticalUp?: RawVrmFirstPersonDegreemap;
    meshAnnotations?: RawVrmFirstPersonMeshannotation[];
}
export interface RawFirstPersonBoneOffset {
    x?: number;
    y?: number;
    z?: number;
}
export interface RawVrmFirstPersonDegreemap {
    curve?: number[];
    xRange?: number;
    yRange?: number;
}
export declare enum LookAtTypeName {
    BlendShape = "BlendShape",
    Bone = "Bone"
}
export interface RawVrmFirstPersonMeshannotation {
    firstPersonFlag?: string;
    mesh?: number;
}
export interface RawVrmHumanoid {
    armStretch?: number;
    feetSpacing?: number;
    hasTranslationDoF?: boolean;
    humanBones?: RawVrmHumanoidBone[];
    legStretch?: number;
    lowerArmTwist?: number;
    lowerLegTwist?: number;
    upperArmTwist?: number;
    upperLegTwist?: number;
}
export interface RawVrmHumanoidBone {
    axisLength?: number;
    bone?: HumanBone;
    center?: RawCenter;
    max?: RawMax;
    min?: RawMin;
    node?: number;
    useDefaultValues?: boolean;
}
export declare enum HumanBone {
    Chest = "chest",
    Head = "head",
    Hips = "hips",
    Jaw = "jaw",
    LeftEye = "leftEye",
    LeftFoot = "leftFoot",
    LeftHand = "leftHand",
    LeftIndexDistal = "leftIndexDistal",
    LeftIndexIntermediate = "leftIndexIntermediate",
    LeftIndexProximal = "leftIndexProximal",
    LeftLittleDistal = "leftLittleDistal",
    LeftLittleIntermediate = "leftLittleIntermediate",
    LeftLittleProximal = "leftLittleProximal",
    LeftLowerArm = "leftLowerArm",
    LeftLowerLeg = "leftLowerLeg",
    LeftMiddleDistal = "leftMiddleDistal",
    LeftMiddleIntermediate = "leftMiddleIntermediate",
    LeftMiddleProximal = "leftMiddleProximal",
    LeftRingDistal = "leftRingDistal",
    LeftRingIntermediate = "leftRingIntermediate",
    LeftRingProximal = "leftRingProximal",
    LeftShoulder = "leftShoulder",
    LeftThumbDistal = "leftThumbDistal",
    LeftThumbIntermediate = "leftThumbIntermediate",
    LeftThumbProximal = "leftThumbProximal",
    LeftToes = "leftToes",
    LeftUpperArm = "leftUpperArm",
    LeftUpperLeg = "leftUpperLeg",
    Neck = "neck",
    RightEye = "rightEye",
    RightFoot = "rightFoot",
    RightHand = "rightHand",
    RightIndexDistal = "rightIndexDistal",
    RightIndexIntermediate = "rightIndexIntermediate",
    RightIndexProximal = "rightIndexProximal",
    RightLittleDistal = "rightLittleDistal",
    RightLittleIntermediate = "rightLittleIntermediate",
    RightLittleProximal = "rightLittleProximal",
    RightLowerArm = "rightLowerArm",
    RightLowerLeg = "rightLowerLeg",
    RightMiddleDistal = "rightMiddleDistal",
    RightMiddleIntermediate = "rightMiddleIntermediate",
    RightMiddleProximal = "rightMiddleProximal",
    RightRingDistal = "rightRingDistal",
    RightRingIntermediate = "rightRingIntermediate",
    RightRingProximal = "rightRingProximal",
    RightShoulder = "rightShoulder",
    RightThumbDistal = "rightThumbDistal",
    RightThumbIntermediate = "rightThumbIntermediate",
    RightThumbProximal = "rightThumbProximal",
    RightToes = "rightToes",
    RightUpperArm = "rightUpperArm",
    RightUpperLeg = "rightUpperLeg",
    Spine = "spine",
    UpperChest = "upperChest"
}
export interface RawCenter {
    x?: number;
    y?: number;
    z?: number;
}
export interface RawMax {
    x?: number;
    y?: number;
    z?: number;
}
export interface RawMin {
    x?: number;
    y?: number;
    z?: number;
}
export interface RawVrmMaterial {
    floatProperties?: {
        [key: string]: any;
    };
    keywordMap?: {
        [key: string]: any;
    };
    name?: string;
    renderQueue?: number;
    shader?: string;
    tagMap?: {
        [key: string]: any;
    };
    textureProperties?: {
        [key: string]: any;
    };
    vectorProperties?: {
        [key: string]: any;
    };
}
export interface RawVrmMeta {
    allowedUserName?: AllowedUserName;
    author?: string;
    commercialUssageName?: UssageName;
    contactInformation?: string;
    licenseName?: LicenseName;
    otherLicenseUrl?: string;
    otherPermissionUrl?: string;
    reference?: string;
    sexualUssageName?: UssageName;
    texture?: number;
    title?: string;
    version?: string;
    violentUssageName?: UssageName;
}
export declare enum AllowedUserName {
    Everyone = "Everyone",
    ExplicitlyLicensedPerson = "ExplicitlyLicensedPerson",
    OnlyAuthor = "OnlyAuthor"
}
export declare enum UssageName {
    Allow = "Allow",
    Disallow = "Disallow"
}
export declare enum LicenseName {
    Cc0 = "CC0",
    CcBy = "CC_BY",
    CcByNc = "CC_BY_NC",
    CcByNcNd = "CC_BY_NC_ND",
    CcByNcSa = "CC_BY_NC_SA",
    CcByNd = "CC_BY_ND",
    CcBySa = "CC_BY_SA",
    Other = "Other",
    RedistributionProhibited = "Redistribution_Prohibited"
}
export interface RawVrmSecondaryanimation {
    boneGroups?: RawVrmSecondaryanimationSpring[];
    colliderGroups?: RawVrmSecondaryanimationCollidergroup[];
}
export interface RawVrmSecondaryanimationSpring {
    bones?: number[];
    center?: number;
    colliderGroups?: number[];
    comment?: string;
    dragForce?: number;
    gravityDir?: RawGravityDir;
    gravityPower?: number;
    hitRadius?: number;
    stiffiness?: number;
}
export interface RawGravityDir {
    x?: number;
    y?: number;
    z?: number;
}
export interface RawVrmSecondaryanimationCollidergroup {
    colliders?: RawCollider[];
    node?: number;
}
export interface RawCollider {
    offset?: RawOffset;
    radius?: number;
}
export interface RawOffset {
    x?: number;
    y?: number;
    z?: number;
}
