export declare namespace VRMSchema {
    /**
     * VRM extension is for 3d humanoid avatars (and models) in VR applications.
     */
    interface VRM {
        blendShapeMaster?: BlendShape;
        /**
         * Version of exporter that vrm created. UniVRM-0.53.0
         */
        exporterVersion?: string;
        firstPerson?: FirstPerson;
        humanoid?: Humanoid;
        materialProperties?: Material[];
        meta?: Meta;
        secondaryAnimation?: SecondaryAnimation;
        /**
         * Version of VRM specification. 0.0
         */
        specVersion?: string;
    }
    /**
     * BlendShapeAvatar of UniVRM
     */
    interface BlendShape {
        blendShapeGroups?: BlendShapeGroup[];
    }
    interface BlendShapeGroup {
        /**
         * Low level blendshape references.
         */
        binds?: BlendShapeBind[];
        /**
         * 0 or 1. Do not allow an intermediate value. Value should rounded
         */
        isBinary?: boolean;
        /**
         * Material animation references.
         */
        materialValues?: BlendShapeMaterialbind[];
        /**
         * Expression name
         */
        name?: string;
        /**
         * Predefined Expression name
         */
        presetName?: BlendShapePresetName;
    }
    interface BlendShapeBind {
        index?: number;
        mesh?: number;
        /**
         * SkinnedMeshRenderer.SetBlendShapeWeight
         */
        weight?: number;
    }
    interface BlendShapeMaterialbind {
        materialName?: string;
        propertyName?: string;
        targetValue?: number[];
    }
    /**
     * Predefined Expression name
     */
    enum BlendShapePresetName {
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
    interface FirstPerson {
        /**
         * The bone whose rendering should be turned off in first-person view. Usually Head is
         * specified.
         */
        firstPersonBone?: number;
        /**
         * The target position of the VR headset in first-person view. It is assumed that an offset
         * from the head bone to the VR headset is added.
         */
        firstPersonBoneOffset?: Vector3;
        lookAtHorizontalInner?: FirstPersonDegreeMap;
        lookAtHorizontalOuter?: FirstPersonDegreeMap;
        /**
         * Eye controller mode.
         */
        lookAtTypeName?: FirstPersonLookAtTypeName;
        lookAtVerticalDown?: FirstPersonDegreeMap;
        lookAtVerticalUp?: FirstPersonDegreeMap;
        /**
         * Switch display / undisplay for each mesh in first-person view or the others.
         */
        meshAnnotations?: FirstPersonMeshannotation[];
    }
    /**
     * Eye controller setting.
     */
    interface FirstPersonDegreeMap {
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
    enum FirstPersonLookAtTypeName {
        BlendShape = "BlendShape",
        Bone = "Bone"
    }
    interface FirstPersonMeshannotation {
        firstPersonFlag?: string;
        mesh?: number;
    }
    interface Humanoid {
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
        humanBones?: HumanoidBone[];
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
    interface HumanoidBone {
        /**
         * Unity's HumanLimit.axisLength
         */
        axisLength?: number;
        /**
         * Human bone name.
         */
        bone?: HumanoidBoneName;
        /**
         * Unity's HumanLimit.center
         */
        center?: Vector3;
        /**
         * Unity's HumanLimit.max
         */
        max?: Vector3;
        /**
         * Unity's HumanLimit.min
         */
        min?: Vector3;
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
    enum HumanoidBoneName {
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
    interface Material {
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
    interface Meta {
        /**
         * A person who can perform with this avatar
         */
        allowedUserName?: MetaAllowedUserName;
        /**
         * Author of VRM model
         */
        author?: string;
        /**
         * For commercial use
         */
        commercialUssageName?: MetaUssageName;
        /**
         * Contact Information of VRM model author
         */
        contactInformation?: string;
        /**
         * License type
         */
        licenseName?: MetaLicenseName;
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
         * Reference of VRM model
         */
        reference?: string;
        /**
         * Permission to perform sexual acts with this avatar
         */
        sexualUssageName?: MetaUssageName;
        /**
         * Thumbnail of VRM model
         */
        texture?: number;
        /**
         * Title of VRM model
         */
        title?: string;
        /**
         * Version of VRM model
         */
        version?: string;
        /**
         * Permission to perform violent acts with this avatar
         */
        violentUssageName?: MetaUssageName;
    }
    /**
     * A person who can perform with this avatar
     */
    enum MetaAllowedUserName {
        Everyone = "Everyone",
        ExplicitlyLicensedPerson = "ExplicitlyLicensedPerson",
        OnlyAuthor = "OnlyAuthor"
    }
    /**
     * For commercial use
     *
     * Permission to perform sexual acts with this avatar
     *
     * Permission to perform violent acts with this avatar
     */
    enum MetaUssageName {
        Allow = "Allow",
        Disallow = "Disallow"
    }
    /**
     * License type
     */
    enum MetaLicenseName {
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
    /**
     * The setting of automatic animation of string-like objects such as tails and hairs.
     */
    interface SecondaryAnimation {
        boneGroups?: SecondaryAnimationSpring[];
        colliderGroups?: SecondaryAnimationCollidergroup[];
    }
    interface SecondaryAnimationSpring {
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
        gravityDir?: Vector3;
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
    interface SecondaryAnimationCollidergroup {
        colliders?: SecondaryAnimationCollider[];
        /**
         * The node of the collider group for setting up collision detections.
         */
        node?: number;
    }
    interface SecondaryAnimationCollider {
        /**
         * The local coordinate from the node of the collider group.
         */
        offset?: Vector3;
        /**
         * The radius of the collider.
         */
        radius?: number;
    }
    interface Vector3 {
        x?: number;
        y?: number;
        z?: number;
    }
}
