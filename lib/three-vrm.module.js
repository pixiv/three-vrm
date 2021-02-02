/*!
 * @pixiv/three-vrm v0.6.0-alpha.1
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2020 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/master/LICENSE
 */
import { Vector2, Vector3, Vector4, Color, Object3D, Quaternion, SkinnedMesh, Skeleton, Matrix4, Euler, GammaEncoding, RGBDEncoding, RGBM16Encoding, RGBM7Encoding, RGBEEncoding, sRGBEncoding, LinearEncoding, ShaderMaterial, TangentSpaceNormalMap, UniformsUtils, UniformsLib, DoubleSide, BackSide, FrontSide, MeshBasicMaterial, Mesh, SphereBufferGeometry, OrthographicCamera, PlaneBufferGeometry, Scene, ArrowHelper, BoxHelper, SkeletonHelper } from 'three';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// See: https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects
function disposeMaterial(material) {
    Object.keys(material).forEach((propertyName) => {
        const value = material[propertyName];
        if (value === null || value === void 0 ? void 0 : value.isTexture) {
            const texture = value;
            texture.dispose();
        }
    });
    material.dispose();
}
function dispose(object3D) {
    const geometry = object3D.geometry;
    if (geometry) {
        geometry.dispose();
    }
    const material = object3D.material;
    if (material) {
        if (Array.isArray(material)) {
            material.forEach((material) => disposeMaterial(material));
        }
        else if (material) {
            disposeMaterial(material);
        }
    }
}
function deepDispose(object3D) {
    object3D.traverse(dispose);
}

var VRMBlendShapeMaterialValueType;
(function (VRMBlendShapeMaterialValueType) {
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["NUMBER"] = 0] = "NUMBER";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["VECTOR2"] = 1] = "VECTOR2";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["VECTOR3"] = 2] = "VECTOR3";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["VECTOR4"] = 3] = "VECTOR4";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["COLOR"] = 4] = "COLOR";
})(VRMBlendShapeMaterialValueType || (VRMBlendShapeMaterialValueType = {}));
const _v2 = new Vector2();
const _v3 = new Vector3();
const _v4 = new Vector4();
const _color = new Color();
// animationMixer の監視対象は、Scene の中に入っている必要がある。
// そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
class VRMBlendShapeGroup extends Object3D {
    constructor(expressionName) {
        super();
        this.weight = 0.0;
        this.isBinary = false;
        this._binds = [];
        this._materialValues = [];
        this.name = `BlendShapeController_${expressionName}`;
        // traverse 時の救済手段として Object3D ではないことを明示しておく
        this.type = 'BlendShapeController';
        // 表示目的のオブジェクトではないので、負荷軽減のために visible を false にしておく。
        // これにより、このインスタンスに対する毎フレームの matrix 自動計算を省略できる。
        this.visible = false;
    }
    addBind(args) {
        // original weight is 0-100 but we want to deal with this value within 0-1
        const weight = args.weight / 100;
        this._binds.push({
            meshes: args.meshes,
            morphTargetIndex: args.morphTargetIndex,
            weight,
        });
    }
    addMaterialValue(args) {
        const material = args.material;
        const propertyName = args.propertyName;
        let value = material[propertyName];
        if (!value) {
            // property has not been found
            return;
        }
        value = args.defaultValue || value;
        let type;
        let defaultValue;
        let targetValue;
        let deltaValue;
        if (value.isVector2) {
            type = VRMBlendShapeMaterialValueType.VECTOR2;
            defaultValue = value.clone();
            targetValue = new Vector2().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isVector3) {
            type = VRMBlendShapeMaterialValueType.VECTOR3;
            defaultValue = value.clone();
            targetValue = new Vector3().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isVector4) {
            type = VRMBlendShapeMaterialValueType.VECTOR4;
            defaultValue = value.clone();
            // vectorProperty and targetValue index is different from each other
            // exported vrm by UniVRM file is
            //
            // vectorProperty
            // offset = targetValue[0], targetValue[1]
            // tiling = targetValue[2], targetValue[3]
            //
            // targetValue
            // offset = targetValue[2], targetValue[3]
            // tiling = targetValue[0], targetValue[1]
            targetValue = new Vector4().fromArray([
                args.targetValue[2],
                args.targetValue[3],
                args.targetValue[0],
                args.targetValue[1],
            ]);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isColor) {
            type = VRMBlendShapeMaterialValueType.COLOR;
            defaultValue = value.clone();
            targetValue = new Color().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else {
            type = VRMBlendShapeMaterialValueType.NUMBER;
            defaultValue = value;
            targetValue = args.targetValue[0];
            deltaValue = targetValue - defaultValue;
        }
        this._materialValues.push({
            material,
            propertyName,
            defaultValue,
            targetValue,
            deltaValue,
            type,
        });
    }
    /**
     * Apply weight to every assigned blend shapes.
     * Should be called via {@link BlendShapeMaster#update}.
     */
    applyWeight() {
        const w = this.isBinary ? (this.weight < 0.5 ? 0.0 : 1.0) : this.weight;
        this._binds.forEach((bind) => {
            bind.meshes.forEach((mesh) => {
                if (!mesh.morphTargetInfluences) {
                    return;
                } // TODO: we should kick this at `addBind`
                mesh.morphTargetInfluences[bind.morphTargetIndex] += w * bind.weight;
            });
        });
        this._materialValues.forEach((materialValue) => {
            const prop = materialValue.material[materialValue.propertyName];
            if (prop === undefined) {
                return;
            } // TODO: we should kick this at `addMaterialValue`
            if (materialValue.type === VRMBlendShapeMaterialValueType.NUMBER) {
                const deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName] += deltaValue * w;
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR2) {
                const deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v2.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR3) {
                const deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v3.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR4) {
                const deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v4.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.COLOR) {
                const deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_color.copy(deltaValue).multiplyScalar(w));
            }
            if (typeof materialValue.material.shouldApplyUniforms === 'boolean') {
                materialValue.material.shouldApplyUniforms = true;
            }
        });
    }
    /**
     * Clear previously assigned blend shapes.
     */
    clearAppliedWeight() {
        this._binds.forEach((bind) => {
            bind.meshes.forEach((mesh) => {
                if (!mesh.morphTargetInfluences) {
                    return;
                } // TODO: we should kick this at `addBind`
                mesh.morphTargetInfluences[bind.morphTargetIndex] = 0.0;
            });
        });
        this._materialValues.forEach((materialValue) => {
            const prop = materialValue.material[materialValue.propertyName];
            if (prop === undefined) {
                return;
            } // TODO: we should kick this at `addMaterialValue`
            if (materialValue.type === VRMBlendShapeMaterialValueType.NUMBER) {
                const defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName] = defaultValue;
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR2) {
                const defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR3) {
                const defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR4) {
                const defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.COLOR) {
                const defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            if (typeof materialValue.material.shouldApplyUniforms === 'boolean') {
                materialValue.material.shouldApplyUniforms = true;
            }
        });
    }
}

// Typedoc does not support export declarations yet
// then we have to use `namespace` instead of export declarations for now.
// See: https://github.com/TypeStrong/typedoc/pull/801
// eslint-disable-next-line @typescript-eslint/no-namespace
var VRMSchema;
(function (VRMSchema) {
    (function (BlendShapePresetName) {
        BlendShapePresetName["A"] = "a";
        BlendShapePresetName["Angry"] = "angry";
        BlendShapePresetName["Blink"] = "blink";
        BlendShapePresetName["BlinkL"] = "blink_l";
        BlendShapePresetName["BlinkR"] = "blink_r";
        BlendShapePresetName["E"] = "e";
        BlendShapePresetName["Fun"] = "fun";
        BlendShapePresetName["I"] = "i";
        BlendShapePresetName["Joy"] = "joy";
        BlendShapePresetName["Lookdown"] = "lookdown";
        BlendShapePresetName["Lookleft"] = "lookleft";
        BlendShapePresetName["Lookright"] = "lookright";
        BlendShapePresetName["Lookup"] = "lookup";
        BlendShapePresetName["Neutral"] = "neutral";
        BlendShapePresetName["O"] = "o";
        BlendShapePresetName["Sorrow"] = "sorrow";
        BlendShapePresetName["U"] = "u";
        BlendShapePresetName["Unknown"] = "unknown";
    })(VRMSchema.BlendShapePresetName || (VRMSchema.BlendShapePresetName = {}));
    (function (FirstPersonLookAtTypeName) {
        FirstPersonLookAtTypeName["BlendShape"] = "BlendShape";
        FirstPersonLookAtTypeName["Bone"] = "Bone";
    })(VRMSchema.FirstPersonLookAtTypeName || (VRMSchema.FirstPersonLookAtTypeName = {}));
    (function (HumanoidBoneName) {
        HumanoidBoneName["Chest"] = "chest";
        HumanoidBoneName["Head"] = "head";
        HumanoidBoneName["Hips"] = "hips";
        HumanoidBoneName["Jaw"] = "jaw";
        HumanoidBoneName["LeftEye"] = "leftEye";
        HumanoidBoneName["LeftFoot"] = "leftFoot";
        HumanoidBoneName["LeftHand"] = "leftHand";
        HumanoidBoneName["LeftIndexDistal"] = "leftIndexDistal";
        HumanoidBoneName["LeftIndexIntermediate"] = "leftIndexIntermediate";
        HumanoidBoneName["LeftIndexProximal"] = "leftIndexProximal";
        HumanoidBoneName["LeftLittleDistal"] = "leftLittleDistal";
        HumanoidBoneName["LeftLittleIntermediate"] = "leftLittleIntermediate";
        HumanoidBoneName["LeftLittleProximal"] = "leftLittleProximal";
        HumanoidBoneName["LeftLowerArm"] = "leftLowerArm";
        HumanoidBoneName["LeftLowerLeg"] = "leftLowerLeg";
        HumanoidBoneName["LeftMiddleDistal"] = "leftMiddleDistal";
        HumanoidBoneName["LeftMiddleIntermediate"] = "leftMiddleIntermediate";
        HumanoidBoneName["LeftMiddleProximal"] = "leftMiddleProximal";
        HumanoidBoneName["LeftRingDistal"] = "leftRingDistal";
        HumanoidBoneName["LeftRingIntermediate"] = "leftRingIntermediate";
        HumanoidBoneName["LeftRingProximal"] = "leftRingProximal";
        HumanoidBoneName["LeftShoulder"] = "leftShoulder";
        HumanoidBoneName["LeftThumbDistal"] = "leftThumbDistal";
        HumanoidBoneName["LeftThumbIntermediate"] = "leftThumbIntermediate";
        HumanoidBoneName["LeftThumbProximal"] = "leftThumbProximal";
        HumanoidBoneName["LeftToes"] = "leftToes";
        HumanoidBoneName["LeftUpperArm"] = "leftUpperArm";
        HumanoidBoneName["LeftUpperLeg"] = "leftUpperLeg";
        HumanoidBoneName["Neck"] = "neck";
        HumanoidBoneName["RightEye"] = "rightEye";
        HumanoidBoneName["RightFoot"] = "rightFoot";
        HumanoidBoneName["RightHand"] = "rightHand";
        HumanoidBoneName["RightIndexDistal"] = "rightIndexDistal";
        HumanoidBoneName["RightIndexIntermediate"] = "rightIndexIntermediate";
        HumanoidBoneName["RightIndexProximal"] = "rightIndexProximal";
        HumanoidBoneName["RightLittleDistal"] = "rightLittleDistal";
        HumanoidBoneName["RightLittleIntermediate"] = "rightLittleIntermediate";
        HumanoidBoneName["RightLittleProximal"] = "rightLittleProximal";
        HumanoidBoneName["RightLowerArm"] = "rightLowerArm";
        HumanoidBoneName["RightLowerLeg"] = "rightLowerLeg";
        HumanoidBoneName["RightMiddleDistal"] = "rightMiddleDistal";
        HumanoidBoneName["RightMiddleIntermediate"] = "rightMiddleIntermediate";
        HumanoidBoneName["RightMiddleProximal"] = "rightMiddleProximal";
        HumanoidBoneName["RightRingDistal"] = "rightRingDistal";
        HumanoidBoneName["RightRingIntermediate"] = "rightRingIntermediate";
        HumanoidBoneName["RightRingProximal"] = "rightRingProximal";
        HumanoidBoneName["RightShoulder"] = "rightShoulder";
        HumanoidBoneName["RightThumbDistal"] = "rightThumbDistal";
        HumanoidBoneName["RightThumbIntermediate"] = "rightThumbIntermediate";
        HumanoidBoneName["RightThumbProximal"] = "rightThumbProximal";
        HumanoidBoneName["RightToes"] = "rightToes";
        HumanoidBoneName["RightUpperArm"] = "rightUpperArm";
        HumanoidBoneName["RightUpperLeg"] = "rightUpperLeg";
        HumanoidBoneName["Spine"] = "spine";
        HumanoidBoneName["UpperChest"] = "upperChest";
    })(VRMSchema.HumanoidBoneName || (VRMSchema.HumanoidBoneName = {}));
    (function (MetaAllowedUserName) {
        MetaAllowedUserName["Everyone"] = "Everyone";
        MetaAllowedUserName["ExplicitlyLicensedPerson"] = "ExplicitlyLicensedPerson";
        MetaAllowedUserName["OnlyAuthor"] = "OnlyAuthor";
    })(VRMSchema.MetaAllowedUserName || (VRMSchema.MetaAllowedUserName = {}));
    (function (MetaUssageName) {
        MetaUssageName["Allow"] = "Allow";
        MetaUssageName["Disallow"] = "Disallow";
    })(VRMSchema.MetaUssageName || (VRMSchema.MetaUssageName = {}));
    (function (MetaLicenseName) {
        MetaLicenseName["Cc0"] = "CC0";
        MetaLicenseName["CcBy"] = "CC_BY";
        MetaLicenseName["CcByNc"] = "CC_BY_NC";
        MetaLicenseName["CcByNcNd"] = "CC_BY_NC_ND";
        MetaLicenseName["CcByNcSa"] = "CC_BY_NC_SA";
        MetaLicenseName["CcByNd"] = "CC_BY_ND";
        MetaLicenseName["CcBySa"] = "CC_BY_SA";
        MetaLicenseName["Other"] = "Other";
        MetaLicenseName["RedistributionProhibited"] = "Redistribution_Prohibited";
    })(VRMSchema.MetaLicenseName || (VRMSchema.MetaLicenseName = {}));
})(VRMSchema || (VRMSchema = {}));

function extractPrimitivesInternal(gltf, nodeIndex, node) {
    const schemaNode = gltf.parser.json.nodes[nodeIndex];
    const meshIndex = schemaNode.mesh;
    if (meshIndex == null) {
        return null;
    }
    const schemaMesh = gltf.parser.json.meshes[meshIndex];
    const primitives = [];
    if (node.isMesh) {
        primitives.push(node);
    }
    else {
        const primitivesCount = schemaMesh.primitives.length;
        // assuming first (primitivesCount) children are its primitives
        for (let i = 0; i < primitivesCount; i++) {
            primitives.push(node.children[i]);
        }
    }
    return primitives;
}
/**
 * Extract primitives ( `THREE.Mesh[]` ) of a node from a loaded GLTF.
 * The main purpose of this function is to distinguish primitives and children from a node that has both meshes and children.
 *
 * It utilizes the behavior that GLTFLoader adds mesh primitives to the node object ( `THREE.Group` ) first then adds its children.
 *
 * @param gltf A GLTF object taken from GLTFLoader
 * @param nodeIndex The index of the node
 */
function gltfExtractPrimitivesFromNode(gltf, nodeIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = yield gltf.parser.getDependency('node', nodeIndex);
        return extractPrimitivesInternal(gltf, nodeIndex, node);
    });
}
/**
 * Extract primitives ( `THREE.Mesh[]` ) of nodes from a loaded GLTF.
 * See {@link gltfExtractPrimitivesFromNode} for more details.
 *
 * It returns a map from node index to extraction result.
 * If a node does not have a mesh, the entry for the node will not be put in the returning map.
 *
 * @param gltf A GLTF object taken from GLTFLoader
 */
function gltfExtractPrimitivesFromNodes(gltf) {
    return __awaiter(this, void 0, void 0, function* () {
        const nodes = yield gltf.parser.getDependencies('node');
        const map = new Map();
        nodes.forEach((node, index) => {
            const result = extractPrimitivesInternal(gltf, index, node);
            if (result != null) {
                map.set(index, result);
            }
        });
        return map;
    });
}

function renameMaterialProperty(name) {
    if (name[0] !== '_') {
        console.warn(`renameMaterialProperty: Given property name "${name}" might be invalid`);
        return name;
    }
    name = name.substring(1);
    if (!/[A-Z]/.test(name[0])) {
        console.warn(`renameMaterialProperty: Given property name "${name}" might be invalid`);
        return name;
    }
    return name[0].toLowerCase() + name.substring(1);
}

/**
 * Clamp an input number within [ `0.0` - `1.0` ].
 *
 * @param value The input value
 */
function saturate(value) {
    return Math.max(Math.min(value, 1.0), 0.0);
}
const _position = new Vector3();
const _scale = new Vector3();
const _rotation = new Quaternion();
/**
 * Extract world rotation of an object from its world space matrix, in cheaper way.
 *
 * @param object The object
 * @param out Target vector
 */
function getWorldQuaternionLite(object, out) {
    object.matrixWorld.decompose(_position, out, _scale);
    return out;
}

class VRMBlendShapeProxy {
    /**
     * Create a new VRMBlendShape.
     */
    constructor() {
        /**
         * List of registered blend shape.
         */
        this._blendShapeGroups = {};
        /**
         * A map from [[VRMSchema.BlendShapePresetName]] to its actual blend shape name.
         */
        this._blendShapePresetMap = {};
        /**
         * A list of name of unknown blend shapes.
         */
        this._unknownGroupNames = [];
        // do nothing
    }
    /**
     * List of name of registered blend shape group.
     */
    get expressions() {
        return Object.keys(this._blendShapeGroups);
    }
    /**
     * A map from [[VRMSchema.BlendShapePresetName]] to its actual blend shape name.
     */
    get blendShapePresetMap() {
        return this._blendShapePresetMap;
    }
    /**
     * A list of name of unknown blend shapes.
     */
    get unknownGroupNames() {
        return this._unknownGroupNames;
    }
    /**
     * Return registered blend shape group.
     *
     * @param name Name of the blend shape group
     */
    getBlendShapeGroup(name) {
        const presetName = this._blendShapePresetMap[name];
        const controller = presetName ? this._blendShapeGroups[presetName] : this._blendShapeGroups[name];
        if (!controller) {
            console.warn(`no blend shape found by ${name}`);
            return undefined;
        }
        return controller;
    }
    /**
     * Register a blend shape group.
     *
     * @param name Name of the blend shape gorup
     * @param controller VRMBlendShapeController that describes the blend shape group
     */
    registerBlendShapeGroup(name, presetName, controller) {
        this._blendShapeGroups[name] = controller;
        if (presetName) {
            this._blendShapePresetMap[presetName] = name;
        }
        else {
            this._unknownGroupNames.push(name);
        }
    }
    /**
     * Get current weight of specified blend shape group.
     *
     * @param name Name of the blend shape group
     */
    getValue(name) {
        var _a;
        const controller = this.getBlendShapeGroup(name);
        return (_a = controller === null || controller === void 0 ? void 0 : controller.weight) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Set a weight to specified blend shape group.
     *
     * @param name Name of the blend shape group
     * @param weight Weight
     */
    setValue(name, weight) {
        const controller = this.getBlendShapeGroup(name);
        if (controller) {
            controller.weight = saturate(weight);
        }
    }
    /**
     * Get a track name of specified blend shape group.
     * This track name is needed to manipulate its blend shape group via keyframe animations.
     *
     * @example Manipulate a blend shape group using keyframe animation
     * ```js
     * const trackName = vrm.blendShapeProxy.getBlendShapeTrackName( THREE.VRMSchema.BlendShapePresetName.Blink );
     * const track = new THREE.NumberKeyframeTrack(
     *   name,
     *   [ 0.0, 0.5, 1.0 ], // times
     *   [ 0.0, 1.0, 0.0 ] // values
     * );
     *
     * const clip = new THREE.AnimationClip(
     *   'blink', // name
     *   1.0, // duration
     *   [ track ] // tracks
     * );
     *
     * const mixer = new THREE.AnimationMixer( vrm.scene );
     * const action = mixer.clipAction( clip );
     * action.play();
     * ```
     *
     * @param name Name of the blend shape group
     */
    getBlendShapeTrackName(name) {
        const controller = this.getBlendShapeGroup(name);
        return controller ? `${controller.name}.weight` : null;
    }
    /**
     * Update every blend shape groups.
     */
    update() {
        Object.keys(this._blendShapeGroups).forEach((name) => {
            const controller = this._blendShapeGroups[name];
            controller.clearAppliedWeight();
        });
        Object.keys(this._blendShapeGroups).forEach((name) => {
            const controller = this._blendShapeGroups[name];
            controller.applyWeight();
        });
    }
}

/**
 * An importer that imports a [[VRMBlendShape]] from a VRM extension of a GLTF.
 */
class VRMBlendShapeImporter {
    /**
     * Import a [[VRMBlendShape]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaBlendShape = vrmExt.blendShapeMaster;
            if (!schemaBlendShape) {
                return null;
            }
            const blendShape = new VRMBlendShapeProxy();
            const blendShapeGroups = schemaBlendShape.blendShapeGroups;
            if (!blendShapeGroups) {
                return blendShape;
            }
            const blendShapePresetMap = {};
            yield Promise.all(blendShapeGroups.map((schemaGroup) => __awaiter(this, void 0, void 0, function* () {
                const name = schemaGroup.name;
                if (name === undefined) {
                    console.warn('VRMBlendShapeImporter: One of blendShapeGroups has no name');
                    return;
                }
                let presetName;
                if (schemaGroup.presetName &&
                    schemaGroup.presetName !== VRMSchema.BlendShapePresetName.Unknown &&
                    !blendShapePresetMap[schemaGroup.presetName]) {
                    presetName = schemaGroup.presetName;
                    blendShapePresetMap[schemaGroup.presetName] = name;
                }
                const group = new VRMBlendShapeGroup(name);
                gltf.scene.add(group);
                group.isBinary = schemaGroup.isBinary || false;
                if (schemaGroup.binds) {
                    schemaGroup.binds.forEach((bind) => __awaiter(this, void 0, void 0, function* () {
                        if (bind.mesh === undefined || bind.index === undefined) {
                            return;
                        }
                        const nodesUsingMesh = [];
                        gltf.parser.json.nodes.forEach((node, i) => {
                            if (node.mesh === bind.mesh) {
                                nodesUsingMesh.push(i);
                            }
                        });
                        const morphTargetIndex = bind.index;
                        yield Promise.all(nodesUsingMesh.map((nodeIndex) => __awaiter(this, void 0, void 0, function* () {
                            var _b;
                            const primitives = (yield gltfExtractPrimitivesFromNode(gltf, nodeIndex));
                            // check if the mesh has the target morph target
                            if (!primitives.every((primitive) => Array.isArray(primitive.morphTargetInfluences) &&
                                morphTargetIndex < primitive.morphTargetInfluences.length)) {
                                console.warn(`VRMBlendShapeImporter: ${schemaGroup.name} attempts to index ${morphTargetIndex}th morph but not found.`);
                                return;
                            }
                            group.addBind({
                                meshes: primitives,
                                morphTargetIndex,
                                weight: (_b = bind.weight) !== null && _b !== void 0 ? _b : 100,
                            });
                        })));
                    }));
                }
                const materialValues = schemaGroup.materialValues;
                if (materialValues) {
                    materialValues.forEach((materialValue) => {
                        if (materialValue.materialName === undefined ||
                            materialValue.propertyName === undefined ||
                            materialValue.targetValue === undefined) {
                            return;
                        }
                        const materials = [];
                        gltf.scene.traverse((object) => {
                            if (object.material) {
                                const material = object.material;
                                if (Array.isArray(material)) {
                                    materials.push(...material.filter((mtl) => mtl.name === materialValue.materialName && materials.indexOf(mtl) === -1));
                                }
                                else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                                    materials.push(material);
                                }
                            }
                        });
                        materials.forEach((material) => {
                            group.addMaterialValue({
                                material,
                                propertyName: renameMaterialProperty(materialValue.propertyName),
                                targetValue: materialValue.targetValue,
                            });
                        });
                    });
                }
                blendShape.registerBlendShapeGroup(name, presetName, group);
            })));
            return blendShape;
        });
    }
}

const VECTOR3_FRONT = Object.freeze(new Vector3(0.0, 0.0, -1.0));
const _quat = new Quaternion();
var FirstPersonFlag;
(function (FirstPersonFlag) {
    FirstPersonFlag[FirstPersonFlag["Auto"] = 0] = "Auto";
    FirstPersonFlag[FirstPersonFlag["Both"] = 1] = "Both";
    FirstPersonFlag[FirstPersonFlag["ThirdPersonOnly"] = 2] = "ThirdPersonOnly";
    FirstPersonFlag[FirstPersonFlag["FirstPersonOnly"] = 3] = "FirstPersonOnly";
})(FirstPersonFlag || (FirstPersonFlag = {}));
/**
 * This class represents a single [`meshAnnotation`](https://github.com/vrm-c/UniVRM/blob/master/specification/0.0/schema/vrm.firstperson.meshannotation.schema.json) entry.
 * Each mesh will be assigned to specified layer when you call [[VRMFirstPerson.setup]].
 */
class VRMRendererFirstPersonFlags {
    /**
     * Create a new mesh annotation.
     *
     * @param firstPersonFlag A [[FirstPersonFlag]] of the annotation entry
     * @param node A node of the annotation entry.
     */
    constructor(firstPersonFlag, primitives) {
        this.firstPersonFlag = VRMRendererFirstPersonFlags._parseFirstPersonFlag(firstPersonFlag);
        this.primitives = primitives;
    }
    static _parseFirstPersonFlag(firstPersonFlag) {
        switch (firstPersonFlag) {
            case 'Both':
                return FirstPersonFlag.Both;
            case 'ThirdPersonOnly':
                return FirstPersonFlag.ThirdPersonOnly;
            case 'FirstPersonOnly':
                return FirstPersonFlag.FirstPersonOnly;
            default:
                return FirstPersonFlag.Auto;
        }
    }
}
class VRMFirstPerson {
    /**
     * Create a new VRMFirstPerson object.
     *
     * @param firstPersonBone A first person bone
     * @param firstPersonBoneOffset An offset from the specified first person bone
     * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
     */
    constructor(firstPersonBone, firstPersonBoneOffset, meshAnnotations) {
        this._meshAnnotations = [];
        this._firstPersonOnlyLayer = VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER;
        this._thirdPersonOnlyLayer = VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER;
        this._initialized = false;
        this._firstPersonBone = firstPersonBone;
        this._firstPersonBoneOffset = firstPersonBoneOffset;
        this._meshAnnotations = meshAnnotations;
    }
    get firstPersonBone() {
        return this._firstPersonBone;
    }
    get meshAnnotations() {
        return this._meshAnnotations;
    }
    getFirstPersonWorldDirection(target) {
        return target.copy(VECTOR3_FRONT).applyQuaternion(getWorldQuaternionLite(this._firstPersonBone, _quat));
    }
    /**
     * A camera layer represents `FirstPersonOnly` layer.
     * Note that **you must call [[setup]] first before you use the layer feature** or it does not work properly.
     *
     * The value is [[DEFAULT_FIRSTPERSON_ONLY_LAYER]] by default but you can change the layer by specifying via [[setup]] if you prefer.
     *
     * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
     * @see https://threejs.org/docs/#api/en/core/Layers
     */
    get firstPersonOnlyLayer() {
        return this._firstPersonOnlyLayer;
    }
    /**
     * A camera layer represents `ThirdPersonOnly` layer.
     * Note that **you must call [[setup]] first before you use the layer feature** or it does not work properly.
     *
     * The value is [[DEFAULT_THIRDPERSON_ONLY_LAYER]] by default but you can change the layer by specifying via [[setup]] if you prefer.
     *
     * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
     * @see https://threejs.org/docs/#api/en/core/Layers
     */
    get thirdPersonOnlyLayer() {
        return this._thirdPersonOnlyLayer;
    }
    getFirstPersonBoneOffset(target) {
        return target.copy(this._firstPersonBoneOffset);
    }
    /**
     * Get current world position of the first person.
     * The position takes [[FirstPersonBone]] and [[FirstPersonOffset]] into account.
     *
     * @param v3 target
     * @returns Current world position of the first person
     */
    getFirstPersonWorldPosition(v3) {
        // UniVRM#VRMFirstPersonEditor
        // var worldOffset = head.localToWorldMatrix.MultiplyPoint(component.FirstPersonOffset);
        const offset = this._firstPersonBoneOffset;
        const v4 = new Vector4(offset.x, offset.y, offset.z, 1.0);
        v4.applyMatrix4(this._firstPersonBone.matrixWorld);
        return v3.set(v4.x, v4.y, v4.z);
    }
    /**
     * In this method, it assigns layers for every meshes based on mesh annotations.
     * You must call this method first before you use the layer feature.
     *
     * This is an equivalent of [VRMFirstPerson.Setup](https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/FirstPerson/VRMFirstPerson.cs) of the UniVRM.
     *
     * The `cameraLayer` parameter specifies which layer will be assigned for `FirstPersonOnly` / `ThirdPersonOnly`.
     * In UniVRM, we specified those by naming each desired layer as `FIRSTPERSON_ONLY_LAYER` / `THIRDPERSON_ONLY_LAYER`
     * but we are going to specify these layers at here since we are unable to name layers in Three.js.
     *
     * @param cameraLayer Specify which layer will be for `FirstPersonOnly` / `ThirdPersonOnly`.
     */
    setup({ firstPersonOnlyLayer = VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER, thirdPersonOnlyLayer = VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER, } = {}) {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._firstPersonOnlyLayer = firstPersonOnlyLayer;
        this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;
        this._meshAnnotations.forEach((item) => {
            if (item.firstPersonFlag === FirstPersonFlag.FirstPersonOnly) {
                item.primitives.forEach((primitive) => {
                    primitive.layers.set(this._firstPersonOnlyLayer);
                });
            }
            else if (item.firstPersonFlag === FirstPersonFlag.ThirdPersonOnly) {
                item.primitives.forEach((primitive) => {
                    primitive.layers.set(this._thirdPersonOnlyLayer);
                });
            }
            else if (item.firstPersonFlag === FirstPersonFlag.Auto) {
                this._createHeadlessModel(item.primitives);
            }
        });
    }
    _excludeTriangles(triangles, bws, skinIndex, exclude) {
        let count = 0;
        if (bws != null && bws.length > 0) {
            for (let i = 0; i < triangles.length; i += 3) {
                const a = triangles[i];
                const b = triangles[i + 1];
                const c = triangles[i + 2];
                const bw0 = bws[a];
                const skin0 = skinIndex[a];
                if (bw0[0] > 0 && exclude.includes(skin0[0]))
                    continue;
                if (bw0[1] > 0 && exclude.includes(skin0[1]))
                    continue;
                if (bw0[2] > 0 && exclude.includes(skin0[2]))
                    continue;
                if (bw0[3] > 0 && exclude.includes(skin0[3]))
                    continue;
                const bw1 = bws[b];
                const skin1 = skinIndex[b];
                if (bw1[0] > 0 && exclude.includes(skin1[0]))
                    continue;
                if (bw1[1] > 0 && exclude.includes(skin1[1]))
                    continue;
                if (bw1[2] > 0 && exclude.includes(skin1[2]))
                    continue;
                if (bw1[3] > 0 && exclude.includes(skin1[3]))
                    continue;
                const bw2 = bws[c];
                const skin2 = skinIndex[c];
                if (bw2[0] > 0 && exclude.includes(skin2[0]))
                    continue;
                if (bw2[1] > 0 && exclude.includes(skin2[1]))
                    continue;
                if (bw2[2] > 0 && exclude.includes(skin2[2]))
                    continue;
                if (bw2[3] > 0 && exclude.includes(skin2[3]))
                    continue;
                triangles[count++] = a;
                triangles[count++] = b;
                triangles[count++] = c;
            }
        }
        return count;
    }
    _createErasedMesh(src, erasingBonesIndex) {
        const dst = new SkinnedMesh(src.geometry.clone(), src.material);
        dst.name = `${src.name}(erase)`;
        dst.frustumCulled = src.frustumCulled;
        dst.layers.set(this._firstPersonOnlyLayer);
        const geometry = dst.geometry;
        const skinIndexAttr = geometry.getAttribute('skinIndex').array;
        const skinIndex = [];
        for (let i = 0; i < skinIndexAttr.length; i += 4) {
            skinIndex.push([skinIndexAttr[i], skinIndexAttr[i + 1], skinIndexAttr[i + 2], skinIndexAttr[i + 3]]);
        }
        const skinWeightAttr = geometry.getAttribute('skinWeight').array;
        const skinWeight = [];
        for (let i = 0; i < skinWeightAttr.length; i += 4) {
            skinWeight.push([skinWeightAttr[i], skinWeightAttr[i + 1], skinWeightAttr[i + 2], skinWeightAttr[i + 3]]);
        }
        const index = geometry.getIndex();
        if (!index) {
            throw new Error("The geometry doesn't have an index buffer");
        }
        const oldTriangles = Array.from(index.array);
        const count = this._excludeTriangles(oldTriangles, skinWeight, skinIndex, erasingBonesIndex);
        const newTriangle = [];
        for (let i = 0; i < count; i++) {
            newTriangle[i] = oldTriangles[i];
        }
        geometry.setIndex(newTriangle);
        // mtoon material includes onBeforeRender. this is unsupported at SkinnedMesh#clone
        if (src.onBeforeRender) {
            dst.onBeforeRender = src.onBeforeRender;
        }
        dst.bind(new Skeleton(src.skeleton.bones, src.skeleton.boneInverses), new Matrix4());
        return dst;
    }
    _createHeadlessModelForSkinnedMesh(parent, mesh) {
        const eraseBoneIndexes = [];
        mesh.skeleton.bones.forEach((bone, index) => {
            if (this._isEraseTarget(bone))
                eraseBoneIndexes.push(index);
        });
        // Unlike UniVRM we don't copy mesh if no invisible bone was found
        if (!eraseBoneIndexes.length) {
            mesh.layers.enable(this._thirdPersonOnlyLayer);
            mesh.layers.enable(this._firstPersonOnlyLayer);
            return;
        }
        mesh.layers.set(this._thirdPersonOnlyLayer);
        const newMesh = this._createErasedMesh(mesh, eraseBoneIndexes);
        parent.add(newMesh);
    }
    _createHeadlessModel(primitives) {
        primitives.forEach((primitive) => {
            if (primitive.type === 'SkinnedMesh') {
                const skinnedMesh = primitive;
                this._createHeadlessModelForSkinnedMesh(skinnedMesh.parent, skinnedMesh);
            }
            else {
                if (this._isEraseTarget(primitive)) {
                    primitive.layers.set(this._thirdPersonOnlyLayer);
                }
            }
        });
    }
    /**
     * It just checks whether the node or its parent is the first person bone or not.
     * @param bone The target bone
     */
    _isEraseTarget(bone) {
        if (bone === this._firstPersonBone) {
            return true;
        }
        else if (!bone.parent) {
            return false;
        }
        else {
            return this._isEraseTarget(bone.parent);
        }
    }
}
/**
 * A default camera layer for `FirstPersonOnly` layer.
 *
 * @see [[getFirstPersonOnlyLayer]]
 */
VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
/**
 * A default camera layer for `ThirdPersonOnly` layer.
 *
 * @see [[getThirdPersonOnlyLayer]]
 */
VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER = 10;

/**
 * An importer that imports a [[VRMFirstPerson]] from a VRM extension of a GLTF.
 */
class VRMFirstPersonImporter {
    /**
     * Import a [[VRMFirstPerson]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
     */
    import(gltf, humanoid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaFirstPerson = vrmExt.firstPerson;
            if (!schemaFirstPerson) {
                return null;
            }
            const firstPersonBoneIndex = schemaFirstPerson.firstPersonBone;
            let firstPersonBone;
            if (firstPersonBoneIndex === undefined || firstPersonBoneIndex === -1) {
                firstPersonBone = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Head);
            }
            else {
                firstPersonBone = yield gltf.parser.getDependency('node', firstPersonBoneIndex);
            }
            if (!firstPersonBone) {
                console.warn('VRMFirstPersonImporter: Could not find firstPersonBone of the VRM');
                return null;
            }
            const firstPersonBoneOffset = schemaFirstPerson.firstPersonBoneOffset
                ? new Vector3(schemaFirstPerson.firstPersonBoneOffset.x, schemaFirstPerson.firstPersonBoneOffset.y, -schemaFirstPerson.firstPersonBoneOffset.z)
                : new Vector3(0.0, 0.06, 0.0); // fallback, taken from UniVRM implementation
            const meshAnnotations = [];
            const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
            Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
                const schemaNode = gltf.parser.json.nodes[nodeIndex];
                const flag = schemaFirstPerson.meshAnnotations
                    ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === schemaNode.mesh)
                    : undefined;
                meshAnnotations.push(new VRMRendererFirstPersonFlags(flag === null || flag === void 0 ? void 0 : flag.firstPersonFlag, primitives));
            });
            return new VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations);
        });
    }
}

/**
 * A class represents a single `humanBone` of a VRM.
 */
class VRMHumanBone {
    /**
     * Create a new VRMHumanBone.
     *
     * @param node A [[GLTFNode]] that represents the new bone
     * @param humanLimit A [[VRMHumanLimit]] object that represents properties of the new bone
     */
    constructor(node, humanLimit) {
        this.node = node;
        this.humanLimit = humanLimit;
    }
}

/**
 * A compat function for `Quaternion.invert()` / `Quaternion.inverse()`.
 * `Quaternion.invert()` is introduced in r123 and `Quaternion.inverse()` emits a warning.
 * We are going to use this compat for a while.
 * @param target A target quaternion
 */
function quatInvertCompat(target) {
    if (target.invert) {
        target.invert();
    }
    else {
        target.inverse();
    }
    return target;
}

const _v3A = new Vector3();
const _quatA = new Quaternion();
/**
 * A class represents humanoid of a VRM.
 */
class VRMHumanoid {
    /**
     * Create a new [[VRMHumanoid]].
     * @param boneArray A [[VRMHumanBoneArray]] contains all the bones of the new humanoid
     * @param humanDescription A [[VRMHumanDescription]] that represents properties of the new humanoid
     */
    constructor(boneArray, humanDescription) {
        /**
         * A [[VRMPose]] that is its default state.
         * Note that it's not compatible with `setPose` and `getPose`, since it contains non-relative values of each local transforms.
         */
        this.restPose = {};
        this.humanBones = this._createHumanBones(boneArray);
        this.humanDescription = humanDescription;
        this.restPose = this.getPose();
    }
    /**
     * Return the current pose of this humanoid as a [[VRMPose]].
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getPose() {
        const pose = {};
        Object.keys(this.humanBones).forEach((vrmBoneName) => {
            const node = this.getBoneNode(vrmBoneName);
            // Ignore when there are no bone on the VRMHumanoid
            if (!node) {
                return;
            }
            // When there are two or more bones in a same name, we are not going to overwrite existing one
            if (pose[vrmBoneName]) {
                return;
            }
            // Take a diff from restPose
            // note that restPose also will use getPose to initialize itself
            _v3A.set(0, 0, 0);
            _quatA.identity();
            const restState = this.restPose[vrmBoneName];
            if (restState === null || restState === void 0 ? void 0 : restState.position) {
                _v3A.fromArray(restState.position).negate();
            }
            if (restState === null || restState === void 0 ? void 0 : restState.rotation) {
                quatInvertCompat(_quatA.fromArray(restState.rotation));
            }
            // Get the position / rotation from the node
            _v3A.add(node.position);
            _quatA.premultiply(node.quaternion);
            pose[vrmBoneName] = {
                position: _v3A.toArray(),
                rotation: _quatA.toArray(),
            };
        }, {});
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
    setPose(poseObject) {
        Object.keys(poseObject).forEach((boneName) => {
            const state = poseObject[boneName];
            const node = this.getBoneNode(boneName);
            // Ignore when there are no bone that is defined in the pose on the VRMHumanoid
            if (!node) {
                return;
            }
            const restState = this.restPose[boneName];
            if (!restState) {
                return;
            }
            if (state.position) {
                node.position.fromArray(state.position);
                if (restState.position) {
                    node.position.add(_v3A.fromArray(restState.position));
                }
            }
            if (state.rotation) {
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
    resetPose() {
        this.setPose({});
    }
    /**
     * Return a bone bound to a specified [[HumanBone]], as a [[VRMHumanBone]].
     *
     * See also: [[VRMHumanoid.getBones]]
     *
     * @param name Name of the bone you want
     */
    getBone(name) {
        return this.humanBones[name][0] || undefined;
    }
    /**
     * Return bones bound to a specified [[HumanBone]], as an array of [[VRMHumanBone]].
     *
     * See also: [[VRMHumanoid.getBone]]
     *
     * @param name Name of the bone you want
     */
    getBones(name) {
        return this.humanBones[name];
    }
    /**
     * Return a bone bound to a specified [[HumanBone]], as a THREE.Object3D.
     *
     * See also: [[VRMHumanoid.getBoneNodes]]
     *
     * @param name Name of the bone you want
     */
    getBoneNode(name) {
        var _a, _b;
        return (_b = (_a = this.humanBones[name][0]) === null || _a === void 0 ? void 0 : _a.node) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Return bones bound to a specified [[HumanBone]], as an array of THREE.Object3D.
     *
     * See also: [[VRMHumanoid.getBoneNode]]
     *
     * @param name Name of the bone you want
     */
    getBoneNodes(name) {
        return this.humanBones[name].map((bone) => bone.node);
    }
    /**
     * Prepare a [[VRMHumanBones]] from a [[VRMHumanBoneArray]].
     */
    _createHumanBones(boneArray) {
        const bones = Object.values(VRMSchema.HumanoidBoneName).reduce((accum, name) => {
            accum[name] = [];
            return accum;
        }, {});
        boneArray.forEach((bone) => {
            bones[bone.name].push(bone.bone);
        });
        return bones;
    }
}

/**
 * An importer that imports a [[VRMHumanoid]] from a VRM extension of a GLTF.
 */
class VRMHumanoidImporter {
    /**
     * Import a [[VRMHumanoid]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaHumanoid = vrmExt.humanoid;
            if (!schemaHumanoid) {
                return null;
            }
            const humanBoneArray = [];
            if (schemaHumanoid.humanBones) {
                yield Promise.all(schemaHumanoid.humanBones.map((bone) => __awaiter(this, void 0, void 0, function* () {
                    if (!bone.bone || bone.node == null) {
                        return;
                    }
                    const node = yield gltf.parser.getDependency('node', bone.node);
                    humanBoneArray.push({
                        name: bone.bone,
                        bone: new VRMHumanBone(node, {
                            axisLength: bone.axisLength,
                            center: bone.center && new Vector3(bone.center.x, bone.center.y, bone.center.z),
                            max: bone.max && new Vector3(bone.max.x, bone.max.y, bone.max.z),
                            min: bone.min && new Vector3(bone.min.x, bone.min.y, bone.min.z),
                            useDefaultValues: bone.useDefaultValues,
                        }),
                    });
                })));
            }
            const humanDescription = {
                armStretch: schemaHumanoid.armStretch,
                legStretch: schemaHumanoid.legStretch,
                upperArmTwist: schemaHumanoid.upperArmTwist,
                lowerArmTwist: schemaHumanoid.lowerArmTwist,
                upperLegTwist: schemaHumanoid.upperLegTwist,
                lowerLegTwist: schemaHumanoid.lowerLegTwist,
                feetSpacing: schemaHumanoid.feetSpacing,
                hasTranslationDoF: schemaHumanoid.hasTranslationDoF,
            };
            return new VRMHumanoid(humanBoneArray, humanDescription);
        });
    }
}

/**
 * Evaluate a hermite spline.
 *
 * @param y0 y on start
 * @param y1 y on end
 * @param t0 delta y on start
 * @param t1 delta y on end
 * @param x input value
 */
const hermiteSpline = (y0, y1, t0, t1, x) => {
    const xc = x * x * x;
    const xs = x * x;
    const dy = y1 - y0;
    const h01 = -2.0 * xc + 3.0 * xs;
    const h10 = xc - 2.0 * xs + x;
    const h11 = xc - xs;
    return y0 + dy * h01 + t0 * h10 + t1 * h11;
};
/**
 * Evaluate an AnimationCurve array. See AnimationCurve class of Unity for its details.
 *
 * See: https://docs.unity3d.com/ja/current/ScriptReference/AnimationCurve.html
 *
 * @param arr An array represents a curve
 * @param x An input value
 */
const evaluateCurve = (arr, x) => {
    // -- sanity check -----------------------------------------------------------
    if (arr.length < 8) {
        throw new Error('evaluateCurve: Invalid curve detected! (Array length must be 8 at least)');
    }
    if (arr.length % 4 !== 0) {
        throw new Error('evaluateCurve: Invalid curve detected! (Array length must be multiples of 4');
    }
    // -- check range ------------------------------------------------------------
    let outNode;
    for (outNode = 0;; outNode++) {
        if (arr.length <= 4 * outNode) {
            return arr[4 * outNode - 3]; // too further!! assume as "Clamp"
        }
        else if (x <= arr[4 * outNode]) {
            break;
        }
    }
    const inNode = outNode - 1;
    if (inNode < 0) {
        return arr[4 * inNode + 5]; // too behind!! assume as "Clamp"
    }
    // -- calculate local x ------------------------------------------------------
    const x0 = arr[4 * inNode];
    const x1 = arr[4 * outNode];
    const xHermite = (x - x0) / (x1 - x0);
    // -- finally do the hermite spline ------------------------------------------
    const y0 = arr[4 * inNode + 1];
    const y1 = arr[4 * outNode + 1];
    const t0 = arr[4 * inNode + 3];
    const t1 = arr[4 * outNode + 2];
    return hermiteSpline(y0, y1, t0, t1, xHermite);
};
/**
 * This is an equivalent of CurveMapper class defined in UniVRM.
 * Will be used for [[VRMLookAtApplyer]]s, to define behavior of LookAt.
 *
 * See: https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/LookAt/CurveMapper.cs
 */
class VRMCurveMapper {
    /**
     * Create a new [[VRMCurveMapper]].
     *
     * @param xRange The maximum input range
     * @param yRange The maximum output value
     * @param curve An array represents the curve
     */
    constructor(xRange, yRange, curve) {
        /**
         * An array represents the curve. See AnimationCurve class of Unity for its details.
         *
         * See: https://docs.unity3d.com/ja/current/ScriptReference/AnimationCurve.html
         */
        this.curve = [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0];
        /**
         * The maximum input range of the [[VRMCurveMapper]].
         */
        this.curveXRangeDegree = 90.0;
        /**
         * The maximum output value of the [[VRMCurveMapper]].
         */
        this.curveYRangeDegree = 10.0;
        if (xRange !== undefined) {
            this.curveXRangeDegree = xRange;
        }
        if (yRange !== undefined) {
            this.curveYRangeDegree = yRange;
        }
        if (curve !== undefined) {
            this.curve = curve;
        }
    }
    /**
     * Evaluate an input value and output a mapped value.
     *
     * @param src The input value
     */
    map(src) {
        const clampedSrc = Math.min(Math.max(src, 0.0), this.curveXRangeDegree);
        const x = clampedSrc / this.curveXRangeDegree;
        return this.curveYRangeDegree * evaluateCurve(this.curve, x);
    }
}

/**
 * This class is used by [[VRMLookAtHead]], applies look at direction.
 * There are currently two variant of applier: [[VRMLookAtBoneApplyer]] and [[VRMLookAtBlendShapeApplyer]].
 */
class VRMLookAtApplyer {
}

/**
 * This class is used by [[VRMLookAtHead]], applies look at direction to eye blend shapes of a VRM.
 */
class VRMLookAtBlendShapeApplyer extends VRMLookAtApplyer {
    /**
     * Create a new VRMLookAtBlendShapeApplyer.
     *
     * @param blendShapeProxy A [[VRMBlendShapeProxy]] used by this applier
     * @param curveHorizontal A [[VRMCurveMapper]] used for transverse direction
     * @param curveVerticalDown A [[VRMCurveMapper]] used for down direction
     * @param curveVerticalUp A [[VRMCurveMapper]] used for up direction
     */
    constructor(blendShapeProxy, curveHorizontal, curveVerticalDown, curveVerticalUp) {
        super();
        this.type = VRMSchema.FirstPersonLookAtTypeName.BlendShape;
        this._curveHorizontal = curveHorizontal;
        this._curveVerticalDown = curveVerticalDown;
        this._curveVerticalUp = curveVerticalUp;
        this._blendShapeProxy = blendShapeProxy;
    }
    name() {
        return VRMSchema.FirstPersonLookAtTypeName.BlendShape;
    }
    lookAt(euler) {
        const srcX = euler.x;
        const srcY = euler.y;
        if (srcX < 0.0) {
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookup, 0.0);
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookdown, this._curveVerticalDown.map(-srcX));
        }
        else {
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookdown, 0.0);
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookup, this._curveVerticalUp.map(srcX));
        }
        if (srcY < 0.0) {
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookleft, 0.0);
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookright, this._curveHorizontal.map(-srcY));
        }
        else {
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookright, 0.0);
            this._blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Lookleft, this._curveHorizontal.map(srcY));
        }
    }
}

const VECTOR3_FRONT$1 = Object.freeze(new Vector3(0.0, 0.0, -1.0));
const _v3A$1 = new Vector3();
const _v3B = new Vector3();
const _v3C = new Vector3();
const _quat$1 = new Quaternion();
/**
 * A class represents look at of a VRM.
 */
class VRMLookAtHead {
    /**
     * Create a new VRMLookAtHead.
     *
     * @param firstPerson A [[VRMFirstPerson]] that will be associated with this new VRMLookAtHead
     * @param applyer A [[VRMLookAtApplyer]] that will be associated with this new VRMLookAtHead
     */
    constructor(firstPerson, applyer) {
        /**
         * If this is true, its look at direction will be updated automatically by calling [[VRMLookAtHead.update]] (which is called from [[VRM.update]]).
         *
         * See also: [[VRMLookAtHead.target]]
         */
        this.autoUpdate = true;
        this._euler = new Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);
        this.firstPerson = firstPerson;
        this.applyer = applyer;
    }
    /**
     * Get its look at direction in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldDirection(target) {
        const rot = getWorldQuaternionLite(this.firstPerson.firstPersonBone, _quat$1);
        return target.copy(VECTOR3_FRONT$1).applyEuler(this._euler).applyQuaternion(rot);
    }
    /**
     * Set its look at position.
     * Note that its result will be instantly overwritten if [[VRMLookAtHead.autoUpdate]] is enabled.
     *
     * @param position A target position
     */
    lookAt(position) {
        this._calcEuler(this._euler, position);
        if (this.applyer) {
            this.applyer.lookAt(this._euler);
        }
    }
    /**
     * Update the VRMLookAtHead.
     * If [[VRMLookAtHead.autoUpdate]] is disabled, it will do nothing.
     *
     * @param delta deltaTime
     */
    update(delta) {
        if (this.target && this.autoUpdate) {
            this.lookAt(this.target.getWorldPosition(_v3A$1));
            if (this.applyer) {
                this.applyer.lookAt(this._euler);
            }
        }
    }
    _calcEuler(target, position) {
        const headPosition = this.firstPerson.getFirstPersonWorldPosition(_v3B);
        // Look at direction in world coordinate
        const lookAtDir = _v3C.copy(position).sub(headPosition).normalize();
        // Transform the direction into local coordinate from the first person bone
        lookAtDir.applyQuaternion(quatInvertCompat(getWorldQuaternionLite(this.firstPerson.firstPersonBone, _quat$1)));
        // convert the direction into euler
        target.x = Math.atan2(lookAtDir.y, Math.sqrt(lookAtDir.x * lookAtDir.x + lookAtDir.z * lookAtDir.z));
        target.y = Math.atan2(-lookAtDir.x, -lookAtDir.z);
        return target;
    }
}
VRMLookAtHead.EULER_ORDER = 'YXZ'; // yaw-pitch-roll

const _euler = new Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);
/**
 * This class is used by [[VRMLookAtHead]], applies look at direction to eye bones of a VRM.
 */
class VRMLookAtBoneApplyer extends VRMLookAtApplyer {
    /**
     * Create a new VRMLookAtBoneApplyer.
     *
     * @param humanoid A [[VRMHumanoid]] used by this applier
     * @param curveHorizontalInner A [[VRMCurveMapper]] used for inner transverse direction
     * @param curveHorizontalOuter A [[VRMCurveMapper]] used for outer transverse direction
     * @param curveVerticalDown A [[VRMCurveMapper]] used for down direction
     * @param curveVerticalUp A [[VRMCurveMapper]] used for up direction
     */
    constructor(humanoid, curveHorizontalInner, curveHorizontalOuter, curveVerticalDown, curveVerticalUp) {
        super();
        this.type = VRMSchema.FirstPersonLookAtTypeName.Bone;
        this._curveHorizontalInner = curveHorizontalInner;
        this._curveHorizontalOuter = curveHorizontalOuter;
        this._curveVerticalDown = curveVerticalDown;
        this._curveVerticalUp = curveVerticalUp;
        this._leftEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftEye);
        this._rightEye = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.RightEye);
    }
    lookAt(euler) {
        const srcX = euler.x;
        const srcY = euler.y;
        // left
        if (this._leftEye) {
            if (srcX < 0.0) {
                _euler.x = -this._curveVerticalDown.map(-srcX);
            }
            else {
                _euler.x = this._curveVerticalUp.map(srcX);
            }
            if (srcY < 0.0) {
                _euler.y = -this._curveHorizontalInner.map(-srcY);
            }
            else {
                _euler.y = this._curveHorizontalOuter.map(srcY);
            }
            this._leftEye.quaternion.setFromEuler(_euler);
        }
        // right
        if (this._rightEye) {
            if (srcX < 0.0) {
                _euler.x = -this._curveVerticalDown.map(-srcX);
            }
            else {
                _euler.x = this._curveVerticalUp.map(srcX);
            }
            if (srcY < 0.0) {
                _euler.y = -this._curveHorizontalOuter.map(-srcY);
            }
            else {
                _euler.y = this._curveHorizontalInner.map(srcY);
            }
            this._rightEye.quaternion.setFromEuler(_euler);
        }
    }
}

// THREE.Math has been renamed to THREE.MathUtils since r113.
// We are going to define the DEG2RAD by ourselves for a while
// https://github.com/mrdoob/three.js/pull/18270
const DEG2RAD = Math.PI / 180; // THREE.MathUtils.DEG2RAD;
/**
 * An importer that imports a [[VRMLookAtHead]] from a VRM extension of a GLTF.
 */
class VRMLookAtImporter {
    /**
     * Import a [[VRMLookAtHead]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param blendShapeProxy A [[VRMBlendShapeProxy]] instance that represents the VRM
     * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
     */
    import(gltf, firstPerson, blendShapeProxy, humanoid) {
        var _a;
        const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
        if (!vrmExt) {
            return null;
        }
        const schemaFirstPerson = vrmExt.firstPerson;
        if (!schemaFirstPerson) {
            return null;
        }
        const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
        return new VRMLookAtHead(firstPerson, applyer || undefined);
    }
    _importApplyer(schemaFirstPerson, blendShapeProxy, humanoid) {
        const lookAtHorizontalInner = schemaFirstPerson.lookAtHorizontalInner;
        const lookAtHorizontalOuter = schemaFirstPerson.lookAtHorizontalOuter;
        const lookAtVerticalDown = schemaFirstPerson.lookAtVerticalDown;
        const lookAtVerticalUp = schemaFirstPerson.lookAtVerticalUp;
        switch (schemaFirstPerson.lookAtTypeName) {
            case VRMSchema.FirstPersonLookAtTypeName.Bone: {
                if (lookAtHorizontalInner === undefined ||
                    lookAtHorizontalOuter === undefined ||
                    lookAtVerticalDown === undefined ||
                    lookAtVerticalUp === undefined) {
                    return null;
                }
                else {
                    return new VRMLookAtBoneApplyer(humanoid, this._importCurveMapperBone(lookAtHorizontalInner), this._importCurveMapperBone(lookAtHorizontalOuter), this._importCurveMapperBone(lookAtVerticalDown), this._importCurveMapperBone(lookAtVerticalUp));
                }
            }
            case VRMSchema.FirstPersonLookAtTypeName.BlendShape: {
                if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
                    return null;
                }
                else {
                    return new VRMLookAtBlendShapeApplyer(blendShapeProxy, this._importCurveMapperBlendShape(lookAtHorizontalOuter), this._importCurveMapperBlendShape(lookAtVerticalDown), this._importCurveMapperBlendShape(lookAtVerticalUp));
                }
            }
            default: {
                return null;
            }
        }
    }
    _importCurveMapperBone(map) {
        return new VRMCurveMapper(typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined, typeof map.yRange === 'number' ? DEG2RAD * map.yRange : undefined, map.curve);
    }
    _importCurveMapperBlendShape(map) {
        return new VRMCurveMapper(typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined, map.yRange, map.curve);
    }
}

const getEncodingComponents = (encoding) => {
    switch (encoding) {
        case LinearEncoding:
            return ['Linear', '( value )'];
        case sRGBEncoding:
            return ['sRGB', '( value )'];
        case RGBEEncoding:
            return ['RGBE', '( value )'];
        case RGBM7Encoding:
            return ['RGBM', '( value, 7.0 )'];
        case RGBM16Encoding:
            return ['RGBM', '( value, 16.0 )'];
        case RGBDEncoding:
            return ['RGBD', '( value, 256.0 )'];
        case GammaEncoding:
            return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
        default:
            throw new Error('unsupported encoding: ' + encoding);
    }
};
const getTexelDecodingFunction = (functionName, encoding) => {
    const components = getEncodingComponents(encoding);
    return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
};

var vertexShader = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n  varying vec2 vUv;\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHTEXTURE\n  uniform sampler2D outlineWidthTexture;\n#endif\n\nuniform float outlineWidth;\nuniform float outlineScaledMaxDistance;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n    vUv = uv;\n    vUv.y = 1.0 - vUv.y; // uv.y is opposite from UniVRM's\n    vUv = mainTex_ST.st + mainTex_ST.pq * vUv;\n    vUv.y = 1.0 - vUv.y; // reverting the previous flip\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  float outlineTex = 1.0;\n\n  #ifdef OUTLINE\n    #ifdef USE_OUTLINEWIDTHTEXTURE\n      outlineTex = texture2D( outlineWidthTexture, vUv ).r;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_WORLD\n      float worldNormalLength = length( transformedNormal );\n      vec3 outlineOffset = 0.01 * outlineWidth * outlineTex * worldNormalLength * objectNormal;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n      vec2 projectedNormal = normalize( clipNormal.xy );\n      projectedNormal *= min( gl_Position.w, outlineScaledMaxDistance );\n      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;\n      gl_Position.xy += 0.01 * outlineWidth * outlineTex * projectedNormal.xy;\n    #endif\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}";

var fragmentShader = "// #define PHONG\n\n#ifdef BLENDMODE_CUTOUT\n  uniform float cutoff;\n#endif\n\nuniform vec3 color;\nuniform float colorAlpha;\nuniform vec3 shadeColor;\n#ifdef USE_SHADETEXTURE\n  uniform sampler2D shadeTexture;\n#endif\n\nuniform float receiveShadowRate;\n#ifdef USE_RECEIVESHADOWTEXTURE\n  uniform sampler2D receiveShadowTexture;\n#endif\n\nuniform float shadingGradeRate;\n#ifdef USE_SHADINGGRADETEXTURE\n  uniform sampler2D shadingGradeTexture;\n#endif\n\nuniform float shadeShift;\nuniform float shadeToony;\nuniform float lightColorAttenuation;\nuniform float indirectLightIntensity;\n\n#ifdef USE_RIMTEXTURE\n  uniform sampler2D rimTexture;\n#endif\nuniform vec3 rimColor;\nuniform float rimLightingMix;\nuniform float rimFresnelPower;\nuniform float rimLift;\n\n#ifdef USE_SPHEREADD\n  uniform sampler2D sphereAdd;\n#endif\n\nuniform vec3 emissionColor;\n\nuniform vec3 outlineColor;\nuniform float outlineLightingMix;\n\n#ifdef USE_UVANIMMASKTEXTURE\n  uniform sampler2D uvAnimMaskTexture;\n#endif\n\nuniform float uvAnimOffsetX;\nuniform float uvAnimOffsetY;\nuniform float uvAnimTheta;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n  varying vec2 vUv;\n#endif\n\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\n    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n    vec2 st0 = dFdx( uv.st );\n    vec2 st1 = dFdy( uv.st );\n\n    float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n    vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;\n    vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;\n\n    // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n    // TODO: Is this still required? Or shall I make a PR about it?\n\n    if ( length( S ) == 0.0 || length( T ) == 0.0 ) {\n      return surf_norm;\n    }\n\n    S = normalize( S );\n    T = normalize( T );\n    vec3 N = normalize( surf_norm );\n\n    #ifdef DOUBLE_SIDED\n\n      // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331\n\n      bool frontFacing = dot( cross( S, T ), N ) > 0.0;\n\n      mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );\n\n    #else\n\n      mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n    #endif\n\n    mat3 tsn = mat3( S, T, N );\n    return normalize( tsn * mapN );\n\n  }\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == lighting stuff ===========================================================\nfloat getLightIntensity(\n  const in IncidentLight directLight,\n  const in GeometricContext geometry,\n  const in float shadow,\n  const in float shadingGrade\n) {\n  float lightIntensity = dot( geometry.normal, directLight.direction );\n  lightIntensity = 0.5 + 0.5 * lightIntensity;\n  lightIntensity = lightIntensity * shadow;\n  lightIntensity = lightIntensity * shadingGrade;\n  lightIntensity = lightIntensity * 2.0 - 1.0;\n  return shadeToony == 1.0\n    ? step( shadeShift, lightIntensity )\n    : smoothstep( shadeShift, shadeShift + ( 1.0 - shadeToony ), lightIntensity );\n}\n\nvec3 getLighting( const in vec3 lightColor ) {\n  vec3 lighting = lightColor;\n  lighting = mix(\n    lighting,\n    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),\n    lightColorAttenuation\n  );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    lighting *= PI;\n  #endif\n\n  return lighting;\n}\n\nvec3 getDiffuse(\n  const in vec3 lit,\n  const in vec3 shade,\n  const in float lightIntensity,\n  const in vec3 lighting\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Diffuse_Lambert( lightIntensity * lighting ) );\n  #endif\n\n  return lighting * BRDF_Diffuse_Lambert( mix( shade, lit, lightIntensity ) );\n}\n\nvec3 calcDirectDiffuse(\n  const in vec2 uv,\n  const in vec3 lit,\n  const in vec3 shade,\n  in GeometricContext geometry,\n  inout ReflectedLight reflectedLight\n) {\n  IncidentLight directLight;\n  vec3 lightingSum = vec3( 0.0 );\n\n  float shadingGrade = 1.0;\n  #ifdef USE_SHADINGGRADETEXTURE\n    shadingGrade = 1.0 - shadingGradeRate * ( 1.0 - texture2D( shadingGradeTexture, uv ).r );\n  #endif\n\n  float receiveShadow = receiveShadowRate;\n  #ifdef USE_RECEIVESHADOWTEXTURE\n    receiveShadow *= texture2D( receiveShadowTexture, uv ).a;\n  #endif\n\n  #if ( NUM_POINT_LIGHTS > 0 )\n    PointLight pointLight;\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n      pointLight = pointLights[ i ];\n      getPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 )\n    SpotLight spotLight;\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n      spotLight = spotLights[ i ];\n      getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 )\n    DirectionalLight directionalLight;\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n      directionalLight = directionalLights[ i ];\n      getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  return lightingSum;\n}\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMMASKTEXTURE\n      uvAnimMask = texture2D( uvAnimMaskTexture, uv ).x;\n    #endif\n\n    uv = uv + vec2( uvAnimOffsetX, uvAnimOffsetY ) * uvAnimMask;\n    float uvRotCos = cos( uvAnimTheta * uvAnimMask );\n    float uvRotSin = sin( uvAnimTheta * uvAnimMask );\n    uv = mat2( uvRotCos, uvRotSin, -uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( color, colorAlpha );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissionColor;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, uv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // -- MToon: alpha -----------------------------------------------------------\n  // #include <alphatest_fragment>\n  #ifdef BLENDMODE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef BLENDMODE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode\n    gl_FragColor = vec4( outlineColor, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // #include <specularmap_fragment>\n  #include <normal_fragment_begin>\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  #ifdef OBJECTSPACE_NORMALMAP\n\n    normal = texture2D( normalMap, uv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  #elif defined( TANGENTSPACE_NORMALMAP )\n\n    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    #ifdef USE_TANGENT\n\n      normal = normalize( vTBN * mapN );\n\n    #else\n\n      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, uv ) ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  // #include <lights_fragment_begin>\n  vec3 lit = diffuseColor.rgb;\n  vec3 shade = shadeColor;\n  #ifdef USE_SHADETEXTURE\n    shade *= shadeTextureTexelToLinear( texture2D( shadeTexture, uv ) ).rgb;\n  #endif\n\n  GeometricContext geometry;\n\n  geometry.position = - vViewPosition;\n  geometry.normal = normal;\n  geometry.viewDir = normalize( vViewPosition );\n\n  vec3 lighting = calcDirectDiffuse( uv, diffuseColor.rgb, shade, geometry, reflectedLight );\n\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n  #if ( NUM_HEMI_LIGHTS > 0 )\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  // #include <lights_fragment_maps>\n  #ifdef USE_LIGHTMAP\n    vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).rgb * lightMapIntensity;\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n    #endif\n    irradiance += lightMapIrradiance;\n  #endif\n\n  // #include <lights_fragment_end>\n  reflectedLight.indirectDiffuse += indirectLightIntensity * irradiance * BRDF_Diffuse_Lambert( lit );\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  // The \"comment out if you want to PBR absolutely\" line\n  col = min(col, lit);\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED )\n    gl_FragColor = vec4(\n      outlineColor.rgb * mix( vec3( 1.0 ), col, outlineLightingMix ),\n      diffuseColor.a\n    );\n    postCorrection();\n    return;\n  #endif\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: parametric rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n  vec3 rimMix = mix(vec3(1.0), lighting + indirectLightIntensity * irradiance, rimLightingMix);\n  vec3 rim = rimColor * pow( saturate( 1.0 - dot( viewDir, normal ) + rimLift ), rimFresnelPower );\n  #ifdef USE_RIMTEXTURE\n    rim *= rimTextureTexelToLinear( texture2D( rimTexture, uv ) ).rgb;\n  #endif\n  col += rim;\n\n  // -- MToon: additive matcap -------------------------------------------------\n  #ifdef USE_SPHEREADD\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      vec3 matcap = sphereAddTexelToLinear( texture2D( sphereAdd, sphereUv ) ).xyz;\n      col += matcap;\n    }\n  #endif\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}";

/* tslint:disable:member-ordering */
const TAU = 2.0 * Math.PI;
var MToonMaterialCullMode;
(function (MToonMaterialCullMode) {
    MToonMaterialCullMode[MToonMaterialCullMode["Off"] = 0] = "Off";
    MToonMaterialCullMode[MToonMaterialCullMode["Front"] = 1] = "Front";
    MToonMaterialCullMode[MToonMaterialCullMode["Back"] = 2] = "Back";
})(MToonMaterialCullMode || (MToonMaterialCullMode = {}));
var MToonMaterialDebugMode;
(function (MToonMaterialDebugMode) {
    MToonMaterialDebugMode[MToonMaterialDebugMode["None"] = 0] = "None";
    MToonMaterialDebugMode[MToonMaterialDebugMode["Normal"] = 1] = "Normal";
    MToonMaterialDebugMode[MToonMaterialDebugMode["LitShadeRate"] = 2] = "LitShadeRate";
    MToonMaterialDebugMode[MToonMaterialDebugMode["UV"] = 3] = "UV";
})(MToonMaterialDebugMode || (MToonMaterialDebugMode = {}));
var MToonMaterialOutlineColorMode;
(function (MToonMaterialOutlineColorMode) {
    MToonMaterialOutlineColorMode[MToonMaterialOutlineColorMode["FixedColor"] = 0] = "FixedColor";
    MToonMaterialOutlineColorMode[MToonMaterialOutlineColorMode["MixedLighting"] = 1] = "MixedLighting";
})(MToonMaterialOutlineColorMode || (MToonMaterialOutlineColorMode = {}));
var MToonMaterialOutlineWidthMode;
(function (MToonMaterialOutlineWidthMode) {
    MToonMaterialOutlineWidthMode[MToonMaterialOutlineWidthMode["None"] = 0] = "None";
    MToonMaterialOutlineWidthMode[MToonMaterialOutlineWidthMode["WorldCoordinates"] = 1] = "WorldCoordinates";
    MToonMaterialOutlineWidthMode[MToonMaterialOutlineWidthMode["ScreenCoordinates"] = 2] = "ScreenCoordinates";
})(MToonMaterialOutlineWidthMode || (MToonMaterialOutlineWidthMode = {}));
var MToonMaterialRenderMode;
(function (MToonMaterialRenderMode) {
    MToonMaterialRenderMode[MToonMaterialRenderMode["Opaque"] = 0] = "Opaque";
    MToonMaterialRenderMode[MToonMaterialRenderMode["Cutout"] = 1] = "Cutout";
    MToonMaterialRenderMode[MToonMaterialRenderMode["Transparent"] = 2] = "Transparent";
    MToonMaterialRenderMode[MToonMaterialRenderMode["TransparentWithZWrite"] = 3] = "TransparentWithZWrite";
})(MToonMaterialRenderMode || (MToonMaterialRenderMode = {}));
/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * See: https://github.com/Santarh/MToon
 */
class MToonMaterial extends ShaderMaterial {
    constructor(parameters = {}) {
        super();
        /**
         * Readonly boolean that indicates this is a [[MToonMaterial]].
         */
        this.isMToonMaterial = true;
        this.cutoff = 0.5; // _Cutoff
        this.color = new Vector4(1.0, 1.0, 1.0, 1.0); // _Color
        this.shadeColor = new Vector4(0.97, 0.81, 0.86, 1.0); // _ShadeColor
        this.map = null; // _MainTex
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.mainTex_ST = new Vector4(0.0, 0.0, 1.0, 1.0); // _MainTex_ST
        this.shadeTexture = null; // _ShadeTexture
        // public shadeTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ShadeTexture_ST (unused)
        this.normalMap = null; // _BumpMap. again, THIS IS _BumpMap
        this.normalMapType = TangentSpaceNormalMap; // Three.js requires this
        this.normalScale = new Vector2(1.0, 1.0); // _BumpScale, in Vector2
        // public bumpMap_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _BumpMap_ST (unused)
        this.receiveShadowRate = 1.0; // _ReceiveShadowRate
        this.receiveShadowTexture = null; // _ReceiveShadowTexture
        // public receiveShadowTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ReceiveShadowTexture_ST (unused)
        this.shadingGradeRate = 1.0; // _ShadingGradeRate
        this.shadingGradeTexture = null; // _ShadingGradeTexture
        // public shadingGradeTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _ShadingGradeTexture_ST (unused)
        this.shadeShift = 0.0; // _ShadeShift
        this.shadeToony = 0.9; // _ShadeToony
        this.lightColorAttenuation = 0.0; // _LightColorAttenuation
        this.indirectLightIntensity = 0.1; // _IndirectLightIntensity
        this.rimTexture = null; // _RimTexture
        this.rimColor = new Vector4(0.0, 0.0, 0.0, 1.0); // _RimColor
        this.rimLightingMix = 0.0; // _RimLightingMix
        this.rimFresnelPower = 1.0; // _RimFresnelPower
        this.rimLift = 0.0; // _RimLift
        this.sphereAdd = null; // _SphereAdd
        // public sphereAdd_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _SphereAdd_ST (unused)
        this.emissionColor = new Vector4(0.0, 0.0, 0.0, 1.0); // _EmissionColor
        this.emissiveMap = null; // _EmissionMap
        // public emissionMap_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _EmissionMap_ST (unused)
        this.outlineWidthTexture = null; // _OutlineWidthTexture
        // public outlineWidthTexture_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0); // _OutlineWidthTexture_ST (unused)
        this.outlineWidth = 0.5; // _OutlineWidth
        this.outlineScaledMaxDistance = 1.0; // _OutlineScaledMaxDistance
        this.outlineColor = new Vector4(0.0, 0.0, 0.0, 1.0); // _OutlineColor
        this.outlineLightingMix = 1.0; // _OutlineLightingMix
        this.uvAnimMaskTexture = null; // _UvAnimMaskTexture
        this.uvAnimScrollX = 0.0; // _UvAnimScrollX
        this.uvAnimScrollY = 0.0; // _UvAnimScrollY
        this.uvAnimRotation = 0.0; // _uvAnimRotation
        this.shouldApplyUniforms = true; // when this is true, applyUniforms effects
        this._debugMode = MToonMaterialDebugMode.None; // _DebugMode
        this._blendMode = MToonMaterialRenderMode.Opaque; // _BlendMode
        this._outlineWidthMode = MToonMaterialOutlineWidthMode.None; // _OutlineWidthMode
        this._outlineColorMode = MToonMaterialOutlineColorMode.FixedColor; // _OutlineColorMode
        this._cullMode = MToonMaterialCullMode.Back; // _CullMode
        this._outlineCullMode = MToonMaterialCullMode.Front; // _OutlineCullMode
        // public srcBlend = 1.0; // _SrcBlend (is not supported)
        // public dstBlend = 0.0; // _DstBlend (is not supported)
        // public zWrite = 1.0; // _ZWrite (will be converted to depthWrite)
        this._isOutline = false;
        this._uvAnimOffsetX = 0.0;
        this._uvAnimOffsetY = 0.0;
        this._uvAnimPhase = 0.0;
        this.encoding = parameters.encoding || LinearEncoding;
        if (this.encoding !== LinearEncoding && this.encoding !== sRGBEncoding) {
            console.warn('The specified color encoding does not work properly with MToonMaterial. You might want to use THREE.sRGBEncoding instead.');
        }
        // == these parameter has no compatibility with this implementation ========
        [
            'mToonVersion',
            'shadeTexture_ST',
            'bumpMap_ST',
            'receiveShadowTexture_ST',
            'shadingGradeTexture_ST',
            'rimTexture_ST',
            'sphereAdd_ST',
            'emissionMap_ST',
            'outlineWidthTexture_ST',
            'uvAnimMaskTexture_ST',
            'srcBlend',
            'dstBlend',
        ].forEach((key) => {
            if (parameters[key] !== undefined) {
                // console.warn(`THREE.${this.type}: The parameter "${key}" is not supported.`);
                delete parameters[key];
            }
        });
        // == enabling bunch of stuff ==============================================
        parameters.fog = true;
        parameters.lights = true;
        parameters.clipping = true;
        parameters.skinning = parameters.skinning || false;
        parameters.morphTargets = parameters.morphTargets || false;
        parameters.morphNormals = parameters.morphNormals || false;
        // == uniforms =============================================================
        parameters.uniforms = UniformsUtils.merge([
            UniformsLib.common,
            UniformsLib.normalmap,
            UniformsLib.emissivemap,
            UniformsLib.fog,
            UniformsLib.lights,
            {
                cutoff: { value: 0.5 },
                color: { value: new Color(1.0, 1.0, 1.0) },
                colorAlpha: { value: 1.0 },
                shadeColor: { value: new Color(0.97, 0.81, 0.86) },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                mainTex_ST: { value: new Vector4(0.0, 0.0, 1.0, 1.0) },
                shadeTexture: { value: null },
                receiveShadowRate: { value: 1.0 },
                receiveShadowTexture: { value: null },
                shadingGradeRate: { value: 1.0 },
                shadingGradeTexture: { value: null },
                shadeShift: { value: 0.0 },
                shadeToony: { value: 0.9 },
                lightColorAttenuation: { value: 0.0 },
                indirectLightIntensity: { value: 0.1 },
                rimTexture: { value: null },
                rimColor: { value: new Color(0.0, 0.0, 0.0) },
                rimLightingMix: { value: 0.0 },
                rimFresnelPower: { value: 1.0 },
                rimLift: { value: 0.0 },
                sphereAdd: { value: null },
                emissionColor: { value: new Color(0.0, 0.0, 0.0) },
                outlineWidthTexture: { value: null },
                outlineWidth: { value: 0.5 },
                outlineScaledMaxDistance: { value: 1.0 },
                outlineColor: { value: new Color(0.0, 0.0, 0.0) },
                outlineLightingMix: { value: 1.0 },
                uvAnimMaskTexture: { value: null },
                uvAnimOffsetX: { value: 0.0 },
                uvAnimOffsetY: { value: 0.0 },
                uvAnimTheta: { value: 0.0 },
            },
        ]);
        // == finally compile the shader program ===================================
        this.setValues(parameters);
        // == update shader stuff ==================================================
        this._updateShaderCode();
        this._applyUniforms();
    }
    get mainTex() {
        return this.map;
    }
    set mainTex(t) {
        this.map = t;
    }
    get bumpMap() {
        return this.normalMap;
    }
    set bumpMap(t) {
        this.normalMap = t;
    }
    /**
     * Getting the `bumpScale` reutrns its x component of `normalScale` (assuming x and y component of `normalScale` are same).
     */
    get bumpScale() {
        return this.normalScale.x;
    }
    /**
     * Setting the `bumpScale` will be convert the value into Vector2 `normalScale` .
     */
    set bumpScale(t) {
        this.normalScale.set(t, t);
    }
    get emissionMap() {
        return this.emissiveMap;
    }
    set emissionMap(t) {
        this.emissiveMap = t;
    }
    get blendMode() {
        return this._blendMode;
    }
    set blendMode(m) {
        this._blendMode = m;
        this.depthWrite = this._blendMode !== MToonMaterialRenderMode.Transparent;
        this.transparent =
            this._blendMode === MToonMaterialRenderMode.Transparent ||
                this._blendMode === MToonMaterialRenderMode.TransparentWithZWrite;
        this._updateShaderCode();
    }
    get debugMode() {
        return this._debugMode;
    }
    set debugMode(m) {
        this._debugMode = m;
        this._updateShaderCode();
    }
    get outlineWidthMode() {
        return this._outlineWidthMode;
    }
    set outlineWidthMode(m) {
        this._outlineWidthMode = m;
        this._updateShaderCode();
    }
    get outlineColorMode() {
        return this._outlineColorMode;
    }
    set outlineColorMode(m) {
        this._outlineColorMode = m;
        this._updateShaderCode();
    }
    get cullMode() {
        return this._cullMode;
    }
    set cullMode(m) {
        this._cullMode = m;
        this._updateCullFace();
    }
    get outlineCullMode() {
        return this._outlineCullMode;
    }
    set outlineCullMode(m) {
        this._outlineCullMode = m;
        this._updateCullFace();
    }
    get zWrite() {
        return this.depthWrite ? 1 : 0;
    }
    set zWrite(i) {
        this.depthWrite = 0.5 <= i;
    }
    get isOutline() {
        return this._isOutline;
    }
    set isOutline(b) {
        this._isOutline = b;
        this._updateShaderCode();
        this._updateCullFace();
    }
    /**
     * Update this material.
     * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
     *
     * @param delta deltaTime since last update
     */
    updateVRMMaterials(delta) {
        this._uvAnimOffsetX = this._uvAnimOffsetX + delta * this.uvAnimScrollX;
        this._uvAnimOffsetY = this._uvAnimOffsetY - delta * this.uvAnimScrollY; // Negative since t axis of uvs are opposite from Unity's one
        this._uvAnimPhase = this._uvAnimPhase + delta * this.uvAnimRotation;
        this._applyUniforms();
    }
    copy(source) {
        super.copy(source);
        // == copy members =========================================================
        this.cutoff = source.cutoff;
        this.color.copy(source.color);
        this.shadeColor.copy(source.shadeColor);
        this.map = source.map;
        this.mainTex_ST.copy(source.mainTex_ST);
        this.shadeTexture = source.shadeTexture;
        this.normalMap = source.normalMap;
        this.normalMapType = source.normalMapType;
        this.normalScale.copy(this.normalScale);
        this.receiveShadowRate = source.receiveShadowRate;
        this.receiveShadowTexture = source.receiveShadowTexture;
        this.shadingGradeRate = source.shadingGradeRate;
        this.shadingGradeTexture = source.shadingGradeTexture;
        this.shadeShift = source.shadeShift;
        this.shadeToony = source.shadeToony;
        this.lightColorAttenuation = source.lightColorAttenuation;
        this.indirectLightIntensity = source.indirectLightIntensity;
        this.rimTexture = source.rimTexture;
        this.rimColor.copy(source.rimColor);
        this.rimLightingMix = source.rimLightingMix;
        this.rimFresnelPower = source.rimFresnelPower;
        this.rimLift = source.rimLift;
        this.sphereAdd = source.sphereAdd;
        this.emissionColor.copy(source.emissionColor);
        this.emissiveMap = source.emissiveMap;
        this.outlineWidthTexture = source.outlineWidthTexture;
        this.outlineWidth = source.outlineWidth;
        this.outlineScaledMaxDistance = source.outlineScaledMaxDistance;
        this.outlineColor.copy(source.outlineColor);
        this.outlineLightingMix = source.outlineLightingMix;
        this.uvAnimMaskTexture = source.uvAnimMaskTexture;
        this.uvAnimScrollX = source.uvAnimScrollX;
        this.uvAnimScrollY = source.uvAnimScrollY;
        this.uvAnimRotation = source.uvAnimRotation;
        this.debugMode = source.debugMode;
        this.blendMode = source.blendMode;
        this.outlineWidthMode = source.outlineWidthMode;
        this.outlineColorMode = source.outlineColorMode;
        this.cullMode = source.cullMode;
        this.outlineCullMode = source.outlineCullMode;
        this.isOutline = source.isOutline;
        return this;
    }
    /**
     * Apply updated uniform variables.
     */
    _applyUniforms() {
        this.uniforms.uvAnimOffsetX.value = this._uvAnimOffsetX;
        this.uniforms.uvAnimOffsetY.value = this._uvAnimOffsetY;
        this.uniforms.uvAnimTheta.value = TAU * this._uvAnimPhase;
        if (!this.shouldApplyUniforms) {
            return;
        }
        this.shouldApplyUniforms = false;
        this.uniforms.cutoff.value = this.cutoff;
        this.uniforms.color.value.setRGB(this.color.x, this.color.y, this.color.z);
        this.uniforms.colorAlpha.value = this.color.w;
        this.uniforms.shadeColor.value.setRGB(this.shadeColor.x, this.shadeColor.y, this.shadeColor.z);
        this.uniforms.map.value = this.map;
        this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
        this.uniforms.shadeTexture.value = this.shadeTexture;
        this.uniforms.normalMap.value = this.normalMap;
        this.uniforms.normalScale.value.copy(this.normalScale);
        this.uniforms.receiveShadowRate.value = this.receiveShadowRate;
        this.uniforms.receiveShadowTexture.value = this.receiveShadowTexture;
        this.uniforms.shadingGradeRate.value = this.shadingGradeRate;
        this.uniforms.shadingGradeTexture.value = this.shadingGradeTexture;
        this.uniforms.shadeShift.value = this.shadeShift;
        this.uniforms.shadeToony.value = this.shadeToony;
        this.uniforms.lightColorAttenuation.value = this.lightColorAttenuation;
        this.uniforms.indirectLightIntensity.value = this.indirectLightIntensity;
        this.uniforms.rimTexture.value = this.rimTexture;
        this.uniforms.rimColor.value.setRGB(this.rimColor.x, this.rimColor.y, this.rimColor.z);
        this.uniforms.rimLightingMix.value = this.rimLightingMix;
        this.uniforms.rimFresnelPower.value = this.rimFresnelPower;
        this.uniforms.rimLift.value = this.rimLift;
        this.uniforms.sphereAdd.value = this.sphereAdd;
        this.uniforms.emissionColor.value.setRGB(this.emissionColor.x, this.emissionColor.y, this.emissionColor.z);
        this.uniforms.emissiveMap.value = this.emissiveMap;
        this.uniforms.outlineWidthTexture.value = this.outlineWidthTexture;
        this.uniforms.outlineWidth.value = this.outlineWidth;
        this.uniforms.outlineScaledMaxDistance.value = this.outlineScaledMaxDistance;
        this.uniforms.outlineColor.value.setRGB(this.outlineColor.x, this.outlineColor.y, this.outlineColor.z);
        this.uniforms.outlineLightingMix.value = this.outlineLightingMix;
        this.uniforms.uvAnimMaskTexture.value = this.uvAnimMaskTexture;
        // apply color space to uniform colors
        if (this.encoding === sRGBEncoding) {
            this.uniforms.color.value.convertSRGBToLinear();
            this.uniforms.shadeColor.value.convertSRGBToLinear();
            this.uniforms.rimColor.value.convertSRGBToLinear();
            this.uniforms.emissionColor.value.convertSRGBToLinear();
            this.uniforms.outlineColor.value.convertSRGBToLinear();
        }
        this._updateCullFace();
    }
    _updateShaderCode() {
        this.defines = {
            OUTLINE: this._isOutline,
            BLENDMODE_OPAQUE: this._blendMode === MToonMaterialRenderMode.Opaque,
            BLENDMODE_CUTOUT: this._blendMode === MToonMaterialRenderMode.Cutout,
            BLENDMODE_TRANSPARENT: this._blendMode === MToonMaterialRenderMode.Transparent ||
                this._blendMode === MToonMaterialRenderMode.TransparentWithZWrite,
            USE_SHADETEXTURE: this.shadeTexture !== null,
            USE_RECEIVESHADOWTEXTURE: this.receiveShadowTexture !== null,
            USE_SHADINGGRADETEXTURE: this.shadingGradeTexture !== null,
            USE_RIMTEXTURE: this.rimTexture !== null,
            USE_SPHEREADD: this.sphereAdd !== null,
            USE_OUTLINEWIDTHTEXTURE: this.outlineWidthTexture !== null,
            USE_UVANIMMASKTEXTURE: this.uvAnimMaskTexture !== null,
            DEBUG_NORMAL: this._debugMode === MToonMaterialDebugMode.Normal,
            DEBUG_LITSHADERATE: this._debugMode === MToonMaterialDebugMode.LitShadeRate,
            DEBUG_UV: this._debugMode === MToonMaterialDebugMode.UV,
            OUTLINE_WIDTH_WORLD: this._outlineWidthMode === MToonMaterialOutlineWidthMode.WorldCoordinates,
            OUTLINE_WIDTH_SCREEN: this._outlineWidthMode === MToonMaterialOutlineWidthMode.ScreenCoordinates,
            OUTLINE_COLOR_FIXED: this._outlineColorMode === MToonMaterialOutlineColorMode.FixedColor,
            OUTLINE_COLOR_MIXED: this._outlineColorMode === MToonMaterialOutlineColorMode.MixedLighting,
        };
        // == texture encodings ====================================================
        const encodings = (this.shadeTexture !== null
            ? getTexelDecodingFunction('shadeTextureTexelToLinear', this.shadeTexture.encoding) + '\n'
            : '') +
            (this.sphereAdd !== null
                ? getTexelDecodingFunction('sphereAddTexelToLinear', this.sphereAdd.encoding) + '\n'
                : '') +
            (this.rimTexture !== null
                ? getTexelDecodingFunction('rimTextureTexelToLinear', this.rimTexture.encoding) + '\n'
                : '');
        // == generate shader code =================================================
        this.vertexShader = vertexShader;
        this.fragmentShader = encodings + fragmentShader;
        // == set needsUpdate flag =================================================
        this.needsUpdate = true;
    }
    _updateCullFace() {
        if (!this.isOutline) {
            if (this.cullMode === MToonMaterialCullMode.Off) {
                this.side = DoubleSide;
            }
            else if (this.cullMode === MToonMaterialCullMode.Front) {
                this.side = BackSide;
            }
            else if (this.cullMode === MToonMaterialCullMode.Back) {
                this.side = FrontSide;
            }
        }
        else {
            if (this.outlineCullMode === MToonMaterialCullMode.Off) {
                this.side = DoubleSide;
            }
            else if (this.outlineCullMode === MToonMaterialCullMode.Front) {
                this.side = BackSide;
            }
            else if (this.outlineCullMode === MToonMaterialCullMode.Back) {
                this.side = FrontSide;
            }
        }
    }
}

var vertexShader$1 = "#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef USE_MAP\n    vUv = vec2( mainTex_ST.p * uv.x + mainTex_ST.s, mainTex_ST.q * uv.y + mainTex_ST.t );\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n  #include <skinbase_vertex>\n\n  #ifdef USE_ENVMAP\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n\n  #endif\n\n  #include <begin_vertex>\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n\n  #include <worldpos_vertex>\n  #include <clipping_planes_vertex>\n  #include <envmap_vertex>\n  #include <fog_vertex>\n\n}";

var fragmentShader$1 = "#ifdef RENDERTYPE_CUTOUT\n  uniform float cutoff;\n#endif\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n// #include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n// #include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec4 diffuseColor = vec4( 1.0 );\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, vUv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // MToon: alpha\n  // #include <alphatest_fragment>\n  #ifdef RENDERTYPE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef RENDERTYPE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  // #include <specularmap_fragment>\n\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n  // accumulation (baked indirect lighting only)\n  #ifdef USE_LIGHTMAP\n    reflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n  #else\n    reflectedLight.indirectDiffuse += vec3( 1.0 );\n  #endif\n\n  // modulation\n  // #include <aomap_fragment>\n\n  reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n  vec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n  // #include <envmap_fragment>\n\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n  #include <premultiplied_alpha_fragment>\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n}";

/* tslint:disable:member-ordering */
var VRMUnlitMaterialRenderType;
(function (VRMUnlitMaterialRenderType) {
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["Opaque"] = 0] = "Opaque";
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["Cutout"] = 1] = "Cutout";
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["Transparent"] = 2] = "Transparent";
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["TransparentWithZWrite"] = 3] = "TransparentWithZWrite";
})(VRMUnlitMaterialRenderType || (VRMUnlitMaterialRenderType = {}));
/**
 * This is a material that is an equivalent of "VRM/Unlit***" on VRM spec, those materials are already kinda deprecated though...
 */
class VRMUnlitMaterial extends ShaderMaterial {
    constructor(parameters) {
        super();
        /**
         * Readonly boolean that indicates this is a [[VRMUnlitMaterial]].
         */
        this.isVRMUnlitMaterial = true;
        this.cutoff = 0.5;
        this.map = null; // _MainTex
        // eslint-disable-next-line @typescript-eslint/naming-convention
        this.mainTex_ST = new Vector4(0.0, 0.0, 1.0, 1.0); // _MainTex_ST
        this._renderType = VRMUnlitMaterialRenderType.Opaque;
        this.shouldApplyUniforms = true; // when this is true, applyUniforms effects
        if (parameters === undefined) {
            parameters = {};
        }
        // == enabling bunch of stuff ==============================================
        parameters.fog = true;
        parameters.clipping = true;
        parameters.skinning = parameters.skinning || false;
        parameters.morphTargets = parameters.morphTargets || false;
        parameters.morphNormals = parameters.morphNormals || false;
        // == uniforms =============================================================
        parameters.uniforms = UniformsUtils.merge([
            UniformsLib.common,
            UniformsLib.fog,
            {
                cutoff: { value: 0.5 },
                // eslint-disable-next-line @typescript-eslint/naming-convention
                mainTex_ST: { value: new Vector4(0.0, 0.0, 1.0, 1.0) },
            },
        ]);
        // == finally compile the shader program ===================================
        this.setValues(parameters);
        // == update shader stuff ==================================================
        this._updateShaderCode();
        this._applyUniforms();
    }
    get mainTex() {
        return this.map;
    }
    set mainTex(t) {
        this.map = t;
    }
    get renderType() {
        return this._renderType;
    }
    set renderType(t) {
        this._renderType = t;
        this.depthWrite = this._renderType !== VRMUnlitMaterialRenderType.Transparent;
        this.transparent =
            this._renderType === VRMUnlitMaterialRenderType.Transparent ||
                this._renderType === VRMUnlitMaterialRenderType.TransparentWithZWrite;
        this._updateShaderCode();
    }
    /**
     * Update this material.
     * Usually this will be called via [[VRM.update]] so you don't have to call this manually.
     *
     * @param delta deltaTime since last update
     */
    updateVRMMaterials(delta) {
        this._applyUniforms();
    }
    copy(source) {
        super.copy(source);
        // == copy members =========================================================
        this.cutoff = source.cutoff;
        this.map = source.map;
        this.mainTex_ST.copy(source.mainTex_ST);
        this.renderType = source.renderType;
        return this;
    }
    /**
     * Apply updated uniform variables.
     */
    _applyUniforms() {
        if (!this.shouldApplyUniforms) {
            return;
        }
        this.shouldApplyUniforms = false;
        this.uniforms.cutoff.value = this.cutoff;
        this.uniforms.map.value = this.map;
        this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
    }
    _updateShaderCode() {
        this.defines = {
            RENDERTYPE_OPAQUE: this._renderType === VRMUnlitMaterialRenderType.Opaque,
            RENDERTYPE_CUTOUT: this._renderType === VRMUnlitMaterialRenderType.Cutout,
            RENDERTYPE_TRANSPARENT: this._renderType === VRMUnlitMaterialRenderType.Transparent ||
                this._renderType === VRMUnlitMaterialRenderType.TransparentWithZWrite,
        };
        this.vertexShader = vertexShader$1;
        this.fragmentShader = fragmentShader$1;
        // == set needsUpdate flag =================================================
        this.needsUpdate = true;
    }
}

/**
 * An importer that imports VRM materials from a VRM extension of a GLTF.
 */
class VRMMaterialImporter {
    /**
     * Create a new VRMMaterialImporter.
     *
     * @param options Options of the VRMMaterialImporter
     */
    constructor(options = {}) {
        this._encoding = options.encoding || LinearEncoding;
        if (this._encoding !== LinearEncoding && this._encoding !== sRGBEncoding) {
            console.warn('The specified color encoding might not work properly with VRMMaterialImporter. You might want to use THREE.sRGBEncoding instead.');
        }
        this._requestEnvMap = options.requestEnvMap;
    }
    /**
     * Convert all the materials of given GLTF based on VRM extension field `materialProperties`.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    convertGLTFMaterials(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const materialProperties = vrmExt.materialProperties;
            if (!materialProperties) {
                return null;
            }
            const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
            const materialList = {};
            const materials = []; // result
            yield Promise.all(Array.from(nodePrimitivesMap.entries()).map(([nodeIndex, primitives]) => __awaiter(this, void 0, void 0, function* () {
                const schemaNode = gltf.parser.json.nodes[nodeIndex];
                const schemaMesh = gltf.parser.json.meshes[schemaNode.mesh];
                yield Promise.all(primitives.map((primitive, primitiveIndex) => __awaiter(this, void 0, void 0, function* () {
                    const schemaPrimitive = schemaMesh.primitives[primitiveIndex];
                    // some glTF might have both `node.mesh` and `node.children` at once
                    // and GLTFLoader handles both mesh primitives and "children" in glTF as "children" in THREE
                    // It seems GLTFLoader handles primitives first then handles "children" in glTF (it's lucky!)
                    // so we should ignore (primitives.length)th and following children of `mesh.children`
                    // TODO: sanitize this after GLTFLoader plugin system gets introduced : https://github.com/mrdoob/three.js/pull/18421
                    if (!schemaPrimitive) {
                        return;
                    }
                    const primitiveGeometry = primitive.geometry;
                    const primitiveVertices = primitiveGeometry.index
                        ? primitiveGeometry.index.count
                        : primitiveGeometry.attributes.position.count / 3;
                    // if primitives material is not an array, make it an array
                    if (!Array.isArray(primitive.material)) {
                        primitive.material = [primitive.material];
                        primitiveGeometry.addGroup(0, primitiveVertices, 0);
                    }
                    // create / push to cache (or pop from cache) vrm materials
                    const vrmMaterialIndex = schemaPrimitive.material;
                    let props = materialProperties[vrmMaterialIndex];
                    if (!props) {
                        console.warn(`VRMMaterialImporter: There are no material definition for material #${vrmMaterialIndex} on VRM extension.`);
                        props = { shader: 'VRM_USE_GLTFSHADER' }; // fallback
                    }
                    let vrmMaterials;
                    if (materialList[vrmMaterialIndex]) {
                        vrmMaterials = materialList[vrmMaterialIndex];
                    }
                    else {
                        vrmMaterials = yield this.createVRMMaterials(primitive.material[0], props, gltf);
                        materialList[vrmMaterialIndex] = vrmMaterials;
                        materials.push(vrmMaterials.surface);
                        if (vrmMaterials.outline) {
                            materials.push(vrmMaterials.outline);
                        }
                    }
                    // surface
                    primitive.material[0] = vrmMaterials.surface;
                    // envmap
                    if (this._requestEnvMap && vrmMaterials.surface.isMeshStandardMaterial) {
                        this._requestEnvMap().then((envMap) => {
                            vrmMaterials.surface.envMap = envMap;
                            vrmMaterials.surface.needsUpdate = true;
                        });
                    }
                    // render order
                    primitive.renderOrder = props.renderQueue || 2000;
                    // outline ("2 pass shading using groups" trick here)
                    if (vrmMaterials.outline) {
                        primitive.material[1] = vrmMaterials.outline;
                        primitiveGeometry.addGroup(0, primitiveVertices, 1);
                    }
                })));
            })));
            return materials;
        });
    }
    createVRMMaterials(originalMaterial, vrmProps, gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            let newSurface;
            let newOutline;
            if (vrmProps.shader === 'VRM/MToon') {
                const params = yield this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
                // we need to get rid of these properties
                ['srcBlend', 'dstBlend', 'isFirstSetup'].forEach((name) => {
                    if (params[name] !== undefined) {
                        delete params[name];
                    }
                });
                // these textures must be sRGB Encoding, depends on current colorspace
                ['mainTex', 'shadeTexture', 'emissionMap', 'sphereAdd', 'rimTexture'].forEach((name) => {
                    if (params[name] !== undefined) {
                        params[name].encoding = this._encoding;
                    }
                });
                // specify uniform color encodings
                params.encoding = this._encoding;
                // done
                newSurface = new MToonMaterial(params);
                // outline
                if (params.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
                    params.isOutline = true;
                    newOutline = new MToonMaterial(params);
                }
            }
            else if (vrmProps.shader === 'VRM/UnlitTexture') {
                // this is very legacy
                const params = yield this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
                params.renderType = VRMUnlitMaterialRenderType.Opaque;
                newSurface = new VRMUnlitMaterial(params);
            }
            else if (vrmProps.shader === 'VRM/UnlitCutout') {
                // this is very legacy
                const params = yield this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
                params.renderType = VRMUnlitMaterialRenderType.Cutout;
                newSurface = new VRMUnlitMaterial(params);
            }
            else if (vrmProps.shader === 'VRM/UnlitTransparent') {
                // this is very legacy
                const params = yield this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
                params.renderType = VRMUnlitMaterialRenderType.Transparent;
                newSurface = new VRMUnlitMaterial(params);
            }
            else if (vrmProps.shader === 'VRM/UnlitTransparentZWrite') {
                // this is very legacy
                const params = yield this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
                params.renderType = VRMUnlitMaterialRenderType.TransparentWithZWrite;
                newSurface = new VRMUnlitMaterial(params);
            }
            else {
                if (vrmProps.shader !== 'VRM_USE_GLTFSHADER') {
                    console.warn(`Unknown shader detected: "${vrmProps.shader}"`);
                    // then presume as VRM_USE_GLTFSHADER
                }
                newSurface = this._convertGLTFMaterial(originalMaterial.clone());
            }
            newSurface.name = originalMaterial.name;
            newSurface.userData = JSON.parse(JSON.stringify(originalMaterial.userData));
            newSurface.userData.vrmMaterialProperties = vrmProps;
            if (newOutline) {
                newOutline.name = originalMaterial.name + ' (Outline)';
                newOutline.userData = JSON.parse(JSON.stringify(originalMaterial.userData));
                newOutline.userData.vrmMaterialProperties = vrmProps;
            }
            return {
                surface: newSurface,
                outline: newOutline,
            };
        });
    }
    _renameMaterialProperty(name) {
        if (name[0] !== '_') {
            console.warn(`VRMMaterials: Given property name "${name}" might be invalid`);
            return name;
        }
        name = name.substring(1);
        if (!/[A-Z]/.test(name[0])) {
            console.warn(`VRMMaterials: Given property name "${name}" might be invalid`);
            return name;
        }
        return name[0].toLowerCase() + name.substring(1);
    }
    _convertGLTFMaterial(material) {
        if (material.isMeshStandardMaterial) {
            const mtl = material;
            if (mtl.map) {
                mtl.map.encoding = this._encoding;
            }
            if (mtl.emissiveMap) {
                mtl.emissiveMap.encoding = this._encoding;
            }
            if (this._encoding === LinearEncoding) {
                mtl.color.convertLinearToSRGB();
                mtl.emissive.convertLinearToSRGB();
            }
        }
        if (material.isMeshBasicMaterial) {
            const mtl = material;
            if (mtl.map) {
                mtl.map.encoding = this._encoding;
            }
            if (this._encoding === LinearEncoding) {
                mtl.color.convertLinearToSRGB();
            }
        }
        return material;
    }
    _extractMaterialProperties(originalMaterial, vrmProps, gltf) {
        const taskList = [];
        const params = {};
        // extract texture properties
        if (vrmProps.textureProperties) {
            for (const name of Object.keys(vrmProps.textureProperties)) {
                const newName = this._renameMaterialProperty(name);
                const textureIndex = vrmProps.textureProperties[name];
                taskList.push(gltf.parser.getDependency('texture', textureIndex).then((texture) => {
                    params[newName] = texture;
                }));
            }
        }
        // extract float properties
        if (vrmProps.floatProperties) {
            for (const name of Object.keys(vrmProps.floatProperties)) {
                const newName = this._renameMaterialProperty(name);
                params[newName] = vrmProps.floatProperties[name];
            }
        }
        // extract vector (color tbh) properties
        if (vrmProps.vectorProperties) {
            for (const name of Object.keys(vrmProps.vectorProperties)) {
                let newName = this._renameMaterialProperty(name);
                // if this is textureST (same name as texture name itself), add '_ST'
                const isTextureST = [
                    '_MainTex',
                    '_ShadeTexture',
                    '_BumpMap',
                    '_ReceiveShadowTexture',
                    '_ShadingGradeTexture',
                    '_RimTexture',
                    '_SphereAdd',
                    '_EmissionMap',
                    '_OutlineWidthTexture',
                    '_UvAnimMaskTexture',
                ].some((textureName) => name === textureName);
                if (isTextureST) {
                    newName += '_ST';
                }
                params[newName] = new Vector4(...vrmProps.vectorProperties[name]);
            }
        }
        // set whether it needs skinning and morphing or not
        params.skinning = originalMaterial.skinning || false;
        params.morphTargets = originalMaterial.morphTargets || false;
        params.morphNormals = originalMaterial.morphNormals || false;
        return Promise.all(taskList).then(() => params);
    }
}

/**
 * An importer that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
class VRMMetaImporter {
    constructor(options) {
        var _a;
        this.ignoreTexture = (_a = options === null || options === void 0 ? void 0 : options.ignoreTexture) !== null && _a !== void 0 ? _a : false;
    }
    import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaMeta = vrmExt.meta;
            if (!schemaMeta) {
                return null;
            }
            let texture;
            if (!this.ignoreTexture && schemaMeta.texture != null && schemaMeta.texture !== -1) {
                texture = yield gltf.parser.getDependency('texture', schemaMeta.texture);
            }
            return {
                allowedUserName: schemaMeta.allowedUserName,
                author: schemaMeta.author,
                commercialUssageName: schemaMeta.commercialUssageName,
                contactInformation: schemaMeta.contactInformation,
                licenseName: schemaMeta.licenseName,
                otherLicenseUrl: schemaMeta.otherLicenseUrl,
                otherPermissionUrl: schemaMeta.otherPermissionUrl,
                reference: schemaMeta.reference,
                sexualUssageName: schemaMeta.sexualUssageName,
                texture: texture !== null && texture !== void 0 ? texture : undefined,
                title: schemaMeta.title,
                version: schemaMeta.version,
                violentUssageName: schemaMeta.violentUssageName,
            };
        });
    }
}

const _matA = new Matrix4();
/**
 * A compat function for `Matrix4.invert()` / `Matrix4.getInverse()`.
 * `Matrix4.invert()` is introduced in r123 and `Matrix4.getInverse()` emits a warning.
 * We are going to use this compat for a while.
 * @param target A target matrix
 */
function mat4InvertCompat(target) {
    if (target.invert) {
        target.invert();
    }
    else {
        target.getInverse(_matA.copy(target));
    }
    return target;
}

class Matrix4InverseCache {
    constructor(matrix) {
        /**
         * A cache of inverse of current matrix.
         */
        this._inverseCache = new Matrix4();
        /**
         * A flag that makes it want to recalculate its {@link _inverseCache}.
         * Will be set `true` when `elements` are mutated and be used in `getInverse`.
         */
        this._shouldUpdateInverse = true;
        this.matrix = matrix;
        const handler = {
            set: (obj, prop, newVal) => {
                this._shouldUpdateInverse = true;
                obj[prop] = newVal;
                return true;
            },
        };
        this._originalElements = matrix.elements;
        matrix.elements = new Proxy(matrix.elements, handler);
    }
    /**
     * Inverse of given matrix.
     * Note that it will return its internal private instance.
     * Make sure copying this before mutate this.
     */
    get inverse() {
        if (this._shouldUpdateInverse) {
            mat4InvertCompat(this._inverseCache.copy(this.matrix));
            this._shouldUpdateInverse = false;
        }
        return this._inverseCache;
    }
    revert() {
        this.matrix.elements = this._originalElements;
    }
}

// based on
// http://rocketjump.skr.jp/unity3d/109/
// https://github.com/dwango/UniVRM/blob/master/Scripts/SpringBone/VRMSpringBone.cs
const IDENTITY_MATRIX4 = Object.freeze(new Matrix4());
const IDENTITY_QUATERNION = Object.freeze(new Quaternion());
// 計算中の一時保存用変数（一度インスタンスを作ったらあとは使い回す）
const _v3A$2 = new Vector3();
const _v3B$1 = new Vector3();
const _v3C$1 = new Vector3();
const _quatA$1 = new Quaternion();
const _matA$1 = new Matrix4();
const _matB = new Matrix4();
/**
 * A class represents a single spring bone of a VRM.
 * It should be managed by a [[VRMSpringBoneManager]].
 */
class VRMSpringBone {
    /**
     * Create a new VRMSpringBone.
     *
     * @param bone An Object3D that will be attached to this bone
     * @param params Several parameters related to behavior of the spring bone
     */
    constructor(bone, params = {}) {
        var _a, _b, _c, _d, _e, _f;
        /**
         * Current position of child tail, in world unit. Will be used for verlet integration.
         */
        this._currentTail = new Vector3();
        /**
         * Previous position of child tail, in world unit. Will be used for verlet integration.
         */
        this._prevTail = new Vector3();
        /**
         * Next position of child tail, in world unit. Will be used for verlet integration.
         * Actually used only in [[update]] and it's kind of temporary variable.
         */
        this._nextTail = new Vector3();
        /**
         * Initial axis of the bone, in local unit.
         */
        this._boneAxis = new Vector3();
        /**
         * Position of this bone in relative space, kind of a temporary variable.
         */
        this._centerSpacePosition = new Vector3();
        /**
         * This springbone will be calculated based on the space relative from this object.
         * If this is `null`, springbone will be calculated in world space.
         */
        this._center = null;
        /**
         * Rotation of parent bone, in world unit.
         * We should update this constantly in [[update]].
         */
        this._parentWorldRotation = new Quaternion();
        /**
         * Initial state of the local matrix of the bone.
         */
        this._initialLocalMatrix = new Matrix4();
        /**
         * Initial state of the rotation of the bone.
         */
        this._initialLocalRotation = new Quaternion();
        /**
         * Initial state of the position of its child.
         */
        this._initialLocalChildPosition = new Vector3();
        this.bone = bone; // uniVRMでの parent
        this.bone.matrixAutoUpdate = false; // updateにより計算されるのでthree.js内での自動処理は不要
        this.radius = (_a = params.radius) !== null && _a !== void 0 ? _a : 0.02;
        this.stiffnessForce = (_b = params.stiffnessForce) !== null && _b !== void 0 ? _b : 1.0;
        this.gravityDir = params.gravityDir
            ? new Vector3().copy(params.gravityDir)
            : new Vector3().set(0.0, -1.0, 0.0);
        this.gravityPower = (_c = params.gravityPower) !== null && _c !== void 0 ? _c : 0.0;
        this.dragForce = (_d = params.dragForce) !== null && _d !== void 0 ? _d : 0.4;
        this.colliders = (_e = params.colliders) !== null && _e !== void 0 ? _e : [];
        this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
        this._initialLocalMatrix.copy(this.bone.matrix);
        this._initialLocalRotation.copy(this.bone.quaternion);
        if (this.bone.children.length === 0) {
            // 末端のボーン。子ボーンがいないため「自分の少し先」が子ボーンということにする
            // https://github.com/dwango/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/SpringBone/VRMSpringBone.cs#L246
            this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(0.07); // magic number! derives from original source
        }
        else {
            const firstChild = this.bone.children[0];
            this._initialLocalChildPosition.copy(firstChild.position);
        }
        this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
        this._prevTail.copy(this._currentTail);
        this._nextTail.copy(this._currentTail);
        this._boneAxis.copy(this._initialLocalChildPosition).normalize();
        this._centerSpaceBoneLength = _v3A$2
            .copy(this._initialLocalChildPosition)
            .applyMatrix4(this.bone.matrixWorld)
            .sub(this._centerSpacePosition)
            .length();
        this.center = (_f = params.center) !== null && _f !== void 0 ? _f : null;
    }
    get center() {
        return this._center;
    }
    set center(center) {
        var _a;
        // convert tails to world space
        this._getMatrixCenterToWorld(_matA$1);
        this._currentTail.applyMatrix4(_matA$1);
        this._prevTail.applyMatrix4(_matA$1);
        this._nextTail.applyMatrix4(_matA$1);
        // uninstall inverse cache
        if ((_a = this._center) === null || _a === void 0 ? void 0 : _a.userData.inverseCacheProxy) {
            this._center.userData.inverseCacheProxy.revert();
            delete this._center.userData.inverseCacheProxy;
        }
        // change the center
        this._center = center;
        // install inverse cache
        if (this._center) {
            if (!this._center.userData.inverseCacheProxy) {
                this._center.userData.inverseCacheProxy = new Matrix4InverseCache(this._center.matrixWorld);
            }
        }
        // convert tails to center space
        this._getMatrixWorldToCenter(_matA$1);
        this._currentTail.applyMatrix4(_matA$1);
        this._prevTail.applyMatrix4(_matA$1);
        this._nextTail.applyMatrix4(_matA$1);
        // convert center space dependant state
        _matA$1.multiply(this.bone.matrixWorld); // 🔥 ??
        this._centerSpacePosition.setFromMatrixPosition(_matA$1);
        this._centerSpaceBoneLength = _v3A$2
            .copy(this._initialLocalChildPosition)
            .applyMatrix4(_matA$1)
            .sub(this._centerSpacePosition)
            .length();
    }
    /**
     * Reset the state of this bone.
     * You might want to call [[VRMSpringBoneManager.reset]] instead.
     */
    reset() {
        this.bone.quaternion.copy(this._initialLocalRotation);
        // We need to update its matrixWorld manually, since we tweaked the bone by our hand
        this.bone.updateMatrix();
        this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
        this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
        // Apply updated position to tail states
        this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
        this._prevTail.copy(this._currentTail);
        this._nextTail.copy(this._currentTail);
    }
    /**
     * Update the state of this bone.
     * You might want to call [[VRMSpringBoneManager.update]] instead.
     *
     * @param delta deltaTime
     */
    update(delta) {
        if (delta <= 0)
            return;
        // 親スプリングボーンの姿勢は常に変化している。
        // それに基づいて処理直前に自分のworldMatrixを更新しておく
        this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
        if (this.bone.parent) {
            // SpringBoneは親から順に処理されていくため、
            // 親のmatrixWorldは最新状態の前提でworldMatrixからquaternionを取り出す。
            // 制限はあるけれど、計算は少ないのでgetWorldQuaternionではなくこの方法を取る。
            getWorldQuaternionLite(this.bone.parent, this._parentWorldRotation);
        }
        else {
            this._parentWorldRotation.copy(IDENTITY_QUATERNION);
        }
        // Get bone position in center space
        this._getMatrixWorldToCenter(_matA$1);
        _matA$1.multiply(this.bone.matrixWorld); // 🔥 ??
        this._centerSpacePosition.setFromMatrixPosition(_matA$1);
        // Get parent position in center space
        this._getMatrixWorldToCenter(_matB);
        _matB.multiply(this._getParentMatrixWorld());
        // several parameters
        const stiffness = this.stiffnessForce * delta;
        const external = _v3B$1.copy(this.gravityDir).multiplyScalar(this.gravityPower * delta);
        // verlet積分で次の位置を計算
        this._nextTail
            .copy(this._currentTail)
            .add(_v3A$2
            .copy(this._currentTail)
            .sub(this._prevTail)
            .multiplyScalar(1 - this.dragForce)) // 前フレームの移動を継続する(減衰もあるよ)
            .add(_v3A$2
            .copy(this._boneAxis)
            .applyMatrix4(this._initialLocalMatrix)
            .applyMatrix4(_matB)
            .sub(this._centerSpacePosition)
            .normalize()
            .multiplyScalar(stiffness)) // 親の回転による子ボーンの移動目標
            .add(external); // 外力による移動量
        // normalize bone length
        this._nextTail
            .sub(this._centerSpacePosition)
            .normalize()
            .multiplyScalar(this._centerSpaceBoneLength)
            .add(this._centerSpacePosition);
        // Collisionで移動
        this._collision(this._nextTail);
        this._prevTail.copy(this._currentTail);
        this._currentTail.copy(this._nextTail);
        // Apply rotation, convert vector3 thing into actual quaternion
        // Original UniVRM is doing world unit calculus at here but we're gonna do this on local unit
        // since Three.js is not good at world coordination stuff
        const initialCenterSpaceMatrixInv = mat4InvertCompat(_matA$1.copy(_matB.multiply(this._initialLocalMatrix)));
        const applyRotation = _quatA$1.setFromUnitVectors(this._boneAxis, _v3A$2.copy(this._nextTail).applyMatrix4(initialCenterSpaceMatrixInv).normalize());
        this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);
        // We need to update its matrixWorld manually, since we tweaked the bone by our hand
        this.bone.updateMatrix();
        this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
    }
    /**
     * Do collision math against every colliders attached to this bone.
     *
     * @param tail The tail you want to process
     */
    _collision(tail) {
        this.colliders.forEach((collider) => {
            this._getMatrixWorldToCenter(_matA$1);
            _matA$1.multiply(collider.matrixWorld);
            const colliderCenterSpacePosition = _v3A$2.setFromMatrixPosition(_matA$1);
            const colliderRadius = collider.geometry.boundingSphere.radius; // the bounding sphere is guaranteed to be exist by VRMSpringBoneImporter._createColliderMesh
            const r = this.radius + colliderRadius;
            if (tail.distanceToSquared(colliderCenterSpacePosition) <= r * r) {
                // ヒット。Colliderの半径方向に押し出す
                const normal = _v3B$1.subVectors(tail, colliderCenterSpacePosition).normalize();
                const posFromCollider = _v3C$1.addVectors(colliderCenterSpacePosition, normal.multiplyScalar(r));
                // normalize bone length
                tail.copy(posFromCollider
                    .sub(this._centerSpacePosition)
                    .normalize()
                    .multiplyScalar(this._centerSpaceBoneLength)
                    .add(this._centerSpacePosition));
            }
        });
    }
    /**
     * Create a matrix that converts center space into world space.
     * @param target Target matrix
     */
    _getMatrixCenterToWorld(target) {
        if (this._center) {
            target.copy(this._center.matrixWorld);
        }
        else {
            target.identity();
        }
        return target;
    }
    /**
     * Create a matrix that converts world space into center space.
     * @param target Target matrix
     */
    _getMatrixWorldToCenter(target) {
        if (this._center) {
            target.copy(this._center.userData.inverseCacheProxy.inverse);
        }
        else {
            target.identity();
        }
        return target;
    }
    /**
     * Returns the world matrix of its parent object.
     */
    _getParentMatrixWorld() {
        return this.bone.parent ? this.bone.parent.matrixWorld : IDENTITY_MATRIX4;
    }
}

/**
 * A class manages every spring bones on a VRM.
 */
class VRMSpringBoneManager {
    /**
     * Create a new [[VRMSpringBoneManager]]
     *
     * @param springBoneGroupList An array of [[VRMSpringBoneGroup]]
     */
    constructor(colliderGroups, springBoneGroupList) {
        this.colliderGroups = [];
        this.springBoneGroupList = [];
        this.colliderGroups = colliderGroups;
        this.springBoneGroupList = springBoneGroupList;
    }
    /**
     * Set all bones be calculated based on the space relative from this object.
     * If `null` is given, springbone will be calculated in world space.
     * @param root Root object, or `null`
     */
    setCenter(root) {
        this.springBoneGroupList.forEach((springBoneGroup) => {
            springBoneGroup.forEach((springBone) => {
                springBone.center = root;
            });
        });
    }
    /**
     * Update every spring bone attached to this manager.
     *
     * @param delta deltaTime
     */
    lateUpdate(delta) {
        this.springBoneGroupList.forEach((springBoneGroup) => {
            springBoneGroup.forEach((springBone) => {
                springBone.update(delta);
            });
        });
    }
    /**
     * Reset every spring bone attached to this manager.
     */
    reset() {
        this.springBoneGroupList.forEach((springBoneGroup) => {
            springBoneGroup.forEach((springBone) => {
                springBone.reset();
            });
        });
    }
}

const _v3A$3 = new Vector3();
const _colliderMaterial = new MeshBasicMaterial({ visible: false });
/**
 * An importer that imports a [[VRMSpringBoneManager]] from a VRM extension of a GLTF.
 */
class VRMSpringBoneImporter {
    /**
     * Import a [[VRMLookAtHead]] from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt)
                return null;
            const schemaSecondaryAnimation = vrmExt.secondaryAnimation;
            if (!schemaSecondaryAnimation)
                return null;
            // 衝突判定球体メッシュ。
            const colliderGroups = yield this._importColliderMeshGroups(gltf, schemaSecondaryAnimation);
            // 同じ属性（stiffinessやdragForceが同じ）のボーンはboneGroupにまとめられている。
            // 一列だけではないことに注意。
            const springBoneGroupList = yield this._importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups);
            return new VRMSpringBoneManager(colliderGroups, springBoneGroupList);
        });
    }
    _createSpringBone(bone, params = {}) {
        return new VRMSpringBone(bone, params);
    }
    _importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups) {
        return __awaiter(this, void 0, void 0, function* () {
            const springBoneGroups = schemaSecondaryAnimation.boneGroups || [];
            const springBoneGroupList = [];
            yield Promise.all(springBoneGroups.map((vrmBoneGroup) => __awaiter(this, void 0, void 0, function* () {
                if (vrmBoneGroup.stiffiness === undefined ||
                    vrmBoneGroup.gravityDir === undefined ||
                    vrmBoneGroup.gravityDir.x === undefined ||
                    vrmBoneGroup.gravityDir.y === undefined ||
                    vrmBoneGroup.gravityDir.z === undefined ||
                    vrmBoneGroup.gravityPower === undefined ||
                    vrmBoneGroup.dragForce === undefined ||
                    vrmBoneGroup.hitRadius === undefined ||
                    vrmBoneGroup.colliderGroups === undefined ||
                    vrmBoneGroup.bones === undefined ||
                    vrmBoneGroup.center === undefined) {
                    return;
                }
                const stiffnessForce = vrmBoneGroup.stiffiness;
                const gravityDir = new Vector3(vrmBoneGroup.gravityDir.x, vrmBoneGroup.gravityDir.y, -vrmBoneGroup.gravityDir.z);
                const gravityPower = vrmBoneGroup.gravityPower;
                const dragForce = vrmBoneGroup.dragForce;
                const radius = vrmBoneGroup.hitRadius;
                const colliders = [];
                vrmBoneGroup.colliderGroups.forEach((colliderIndex) => {
                    colliders.push(...colliderGroups[colliderIndex].colliders);
                });
                const springBoneGroup = [];
                yield Promise.all(vrmBoneGroup.bones.map((nodeIndex) => __awaiter(this, void 0, void 0, function* () {
                    // VRMの情報から「揺れモノ」ボーンのルートが取れる
                    const springRootBone = yield gltf.parser.getDependency('node', nodeIndex);
                    const center = vrmBoneGroup.center !== -1 ? yield gltf.parser.getDependency('node', vrmBoneGroup.center) : null;
                    // it's weird but there might be cases we can't find the root bone
                    if (!springRootBone) {
                        return;
                    }
                    springRootBone.traverse((bone) => {
                        const springBone = this._createSpringBone(bone, {
                            radius,
                            stiffnessForce,
                            gravityDir,
                            gravityPower,
                            dragForce,
                            colliders,
                            center,
                        });
                        springBoneGroup.push(springBone);
                    });
                })));
                springBoneGroupList.push(springBoneGroup);
            })));
            return springBoneGroupList;
        });
    }
    /**
     * Create an array of [[VRMSpringBoneColliderGroup]].
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param schemaSecondaryAnimation A `secondaryAnimation` field of VRM
     */
    _importColliderMeshGroups(gltf, schemaSecondaryAnimation) {
        return __awaiter(this, void 0, void 0, function* () {
            const vrmColliderGroups = schemaSecondaryAnimation.colliderGroups;
            if (vrmColliderGroups === undefined)
                return [];
            const colliderGroups = [];
            vrmColliderGroups.forEach((colliderGroup) => __awaiter(this, void 0, void 0, function* () {
                if (colliderGroup.node === undefined || colliderGroup.colliders === undefined) {
                    return;
                }
                const bone = yield gltf.parser.getDependency('node', colliderGroup.node);
                const colliders = [];
                colliderGroup.colliders.forEach((collider) => {
                    if (collider.offset === undefined ||
                        collider.offset.x === undefined ||
                        collider.offset.y === undefined ||
                        collider.offset.z === undefined ||
                        collider.radius === undefined) {
                        return;
                    }
                    const offset = _v3A$3.set(collider.offset.x, collider.offset.y, -collider.offset.z);
                    const colliderMesh = this._createColliderMesh(collider.radius, offset);
                    bone.add(colliderMesh);
                    colliders.push(colliderMesh);
                });
                const colliderMeshGroup = {
                    node: colliderGroup.node,
                    colliders,
                };
                colliderGroups.push(colliderMeshGroup);
            }));
            return colliderGroups;
        });
    }
    /**
     * Create a collider mesh.
     *
     * @param radius Radius of the new collider mesh
     * @param offset Offest of the new collider mesh
     */
    _createColliderMesh(radius, offset) {
        const colliderMesh = new Mesh(new SphereBufferGeometry(radius, 8, 4), _colliderMaterial);
        colliderMesh.position.copy(offset);
        // the name have to be this in order to exclude colliders from bounding box
        // (See Viewer.ts, search for child.name === 'vrmColliderSphere')
        colliderMesh.name = 'vrmColliderSphere';
        // We will use the radius of the sphere for collision vs bones.
        // `boundingSphere` must be created to compute the radius.
        colliderMesh.geometry.computeBoundingSphere();
        return colliderMesh;
    }
}

/**
 * An importer that imports a [[VRM]] from a VRM extension of a GLTF.
 */
class VRMImporter {
    /**
     * Create a new VRMImporter.
     *
     * @param options [[VRMImporterOptions]], optionally contains importers for each component
     */
    constructor(options = {}) {
        this._metaImporter = options.metaImporter || new VRMMetaImporter();
        this._blendShapeImporter = options.blendShapeImporter || new VRMBlendShapeImporter();
        this._lookAtImporter = options.lookAtImporter || new VRMLookAtImporter();
        this._humanoidImporter = options.humanoidImporter || new VRMHumanoidImporter();
        this._firstPersonImporter = options.firstPersonImporter || new VRMFirstPersonImporter();
        this._materialImporter = options.materialImporter || new VRMMaterialImporter();
        this._springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporter();
    }
    /**
     * Receive a GLTF object retrieved from `THREE.GLTFLoader` and create a new [[VRM]] instance.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    import(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
                throw new Error('Could not find VRM extension on the GLTF');
            }
            const scene = gltf.scene;
            scene.updateMatrixWorld(false);
            // Skinned object should not be frustumCulled
            // Since pre-skinned position might be outside of view
            scene.traverse((object3d) => {
                if (object3d.isMesh) {
                    object3d.frustumCulled = false;
                }
            });
            const meta = (yield this._metaImporter.import(gltf)) || undefined;
            const materials = (yield this._materialImporter.convertGLTFMaterials(gltf)) || undefined;
            const humanoid = (yield this._humanoidImporter.import(gltf)) || undefined;
            const firstPerson = humanoid ? (yield this._firstPersonImporter.import(gltf, humanoid)) || undefined : undefined;
            const blendShapeProxy = (yield this._blendShapeImporter.import(gltf)) || undefined;
            const lookAt = firstPerson && blendShapeProxy && humanoid
                ? (yield this._lookAtImporter.import(gltf, firstPerson, blendShapeProxy, humanoid)) || undefined
                : undefined;
            const springBoneManager = (yield this._springBoneImporter.import(gltf)) || undefined;
            return new VRM({
                scene: gltf.scene,
                meta,
                materials,
                humanoid,
                firstPerson,
                blendShapeProxy,
                lookAt,
                springBoneManager,
            });
        });
    }
}

/**
 * A class that represents a single VRM model.
 * See the documentation of [[VRM.from]] for the most basic use of VRM.
 */
class VRM {
    /**
     * Create a new VRM instance.
     *
     * @param params [[VRMParameters]] that represents components of the VRM
     */
    constructor(params) {
        this.scene = params.scene;
        this.humanoid = params.humanoid;
        this.blendShapeProxy = params.blendShapeProxy;
        this.firstPerson = params.firstPerson;
        this.lookAt = params.lookAt;
        this.materials = params.materials;
        this.springBoneManager = params.springBoneManager;
        this.meta = params.meta;
    }
    /**
     * Create a new VRM from a parsed result of GLTF taken from GLTFLoader.
     * It's probably a thing what you want to get started with VRMs.
     *
     * @example Most basic use of VRM
     * ```
     * const scene = new THREE.Scene();
     *
     * new THREE.GLTFLoader().load( 'models/three-vrm-girl.vrm', ( gltf ) => {
     *
     *   THREE.VRM.from( gltf ).then( ( vrm ) => {
     *
     *     scene.add( vrm.scene );
     *
     *   } );
     *
     * } );
     * ```
     *
     * @param gltf A parsed GLTF object taken from GLTFLoader
     * @param options Options that will be used in importer
     */
    static from(gltf, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const importer = new VRMImporter(options);
            return yield importer.import(gltf);
        });
    }
    /**
     * **You need to call this on your update loop.**
     *
     * This function updates every VRM components.
     *
     * @param delta deltaTime
     */
    update(delta) {
        if (this.lookAt) {
            this.lookAt.update(delta);
        }
        if (this.blendShapeProxy) {
            this.blendShapeProxy.update();
        }
        if (this.springBoneManager) {
            this.springBoneManager.lateUpdate(delta);
        }
        if (this.materials) {
            this.materials.forEach((material) => {
                if (material.updateVRMMaterials) {
                    material.updateVRMMaterials(delta);
                }
            });
        }
    }
    /**
     * Dispose everything about the VRM instance.
     */
    dispose() {
        var _a, _b;
        const scene = this.scene;
        if (scene) {
            deepDispose(scene);
        }
        (_b = (_a = this.meta) === null || _a === void 0 ? void 0 : _a.texture) === null || _b === void 0 ? void 0 : _b.dispose();
    }
}

const _v2A = new Vector2();
const _camera = new OrthographicCamera(-1, 1, -1, 1, -1, 1);
const _plane = new Mesh(new PlaneBufferGeometry(2, 2), new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide }));
const _scene = new Scene();
_scene.add(_plane);
/**
 * Extract a thumbnail image blob from a {@link VRM}.
 * If the vrm does not have a thumbnail, it will throw an error.
 * @param renderer Renderer
 * @param vrm VRM with a thumbnail
 * @param size width / height of the image
 */
function extractThumbnailBlob(renderer, vrm, size = 512) {
    var _a;
    // get the texture
    const texture = (_a = vrm.meta) === null || _a === void 0 ? void 0 : _a.texture;
    if (!texture) {
        throw new Error('extractThumbnailBlob: This VRM does not have a thumbnail');
    }
    const canvas = renderer.getContext().canvas;
    // store the current resolution
    renderer.getSize(_v2A);
    const prevWidth = _v2A.x;
    const prevHeight = _v2A.y;
    // overwrite the resolution
    renderer.setSize(size, size, false);
    // assign the texture to plane
    _plane.material.map = texture;
    // render
    renderer.render(_scene, _camera);
    // unassign the texture
    _plane.material.map = null;
    // get blob
    if (canvas instanceof OffscreenCanvas) {
        return canvas.convertToBlob().finally(() => {
            // revert to previous resolution
            renderer.setSize(prevWidth, prevHeight, false);
        });
    }
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            // revert to previous resolution
            renderer.setSize(prevWidth, prevHeight, false);
            if (blob == null) {
                reject('extractThumbnailBlob: Failed to create a blob');
            }
            else {
                resolve(blob);
            }
        });
    });
}

/**
 * Traverse given object and remove unnecessarily bound joints from every `THREE.SkinnedMesh`.
 * Some environments like mobile devices have a lower limit of bones and might be unable to perform mesh skinning, this function might resolve such an issue.
 * Also this function might greatly improve the performance of mesh skinning.
 *
 * @param root Root object that will be traversed
 */
function removeUnnecessaryJoints(root) {
    // some meshes might share a same skinIndex attribute and this map prevents to convert the attribute twice
    const skeletonList = new Map();
    // Traverse an entire tree
    root.traverse((obj) => {
        if (obj.type !== 'SkinnedMesh') {
            return;
        }
        const mesh = obj;
        const geometry = mesh.geometry;
        const attribute = geometry.getAttribute('skinIndex');
        // look for existing skeleton
        let skeleton = skeletonList.get(attribute);
        if (!skeleton) {
            // generate reduced bone list
            const bones = []; // new list of bone
            const boneInverses = []; // new list of boneInverse
            const boneIndexMap = {}; // map of old bone index vs. new bone index
            // create a new bone map
            const array = attribute.array;
            for (let i = 0; i < array.length; i++) {
                const index = array[i];
                // new skinIndex buffer
                if (boneIndexMap[index] === undefined) {
                    boneIndexMap[index] = bones.length;
                    bones.push(mesh.skeleton.bones[index]);
                    boneInverses.push(mesh.skeleton.boneInverses[index]);
                }
                array[i] = boneIndexMap[index];
            }
            // replace with new indices
            attribute.copyArray(array);
            attribute.needsUpdate = true;
            // replace with new indices
            skeleton = new Skeleton(bones, boneInverses);
            skeletonList.set(attribute, skeleton);
        }
        mesh.bind(skeleton, new Matrix4());
        //                  ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
        // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
    });
}

class VRMUtils {
    constructor() {
        // this class is not meant to be instantiated
    }
}
VRMUtils.extractThumbnailBlob = extractThumbnailBlob;
VRMUtils.removeUnnecessaryJoints = removeUnnecessaryJoints;

const _v3$1 = new Vector3();
class VRMLookAtHeadDebug extends VRMLookAtHead {
    setupHelper(scene, debugOption) {
        if (!debugOption.disableFaceDirectionHelper) {
            this._faceDirectionHelper = new ArrowHelper(new Vector3(0, 0, -1), new Vector3(0, 0, 0), 0.5, 0xff00ff);
            scene.add(this._faceDirectionHelper);
        }
    }
    update(delta) {
        super.update(delta);
        if (this._faceDirectionHelper) {
            this.firstPerson.getFirstPersonWorldPosition(this._faceDirectionHelper.position);
            this._faceDirectionHelper.setDirection(this.getLookAtWorldDirection(_v3$1));
        }
    }
}

class VRMLookAtImporterDebug extends VRMLookAtImporter {
    import(gltf, firstPerson, blendShapeProxy, humanoid) {
        var _a;
        const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
        if (!vrmExt) {
            return null;
        }
        const schemaFirstPerson = vrmExt.firstPerson;
        if (!schemaFirstPerson) {
            return null;
        }
        const applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
        return new VRMLookAtHeadDebug(firstPerson, applyer || undefined);
    }
}

const _colliderGizmoMaterial = new MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
    transparent: true,
    depthTest: false,
});
class VRMSpringBoneManagerDebug extends VRMSpringBoneManager {
    setupHelper(scene, debugOption) {
        if (debugOption.disableSpringBoneHelper)
            return;
        this.springBoneGroupList.forEach((springBoneGroup) => {
            springBoneGroup.forEach((springBone) => {
                if (springBone.getGizmo) {
                    const gizmo = springBone.getGizmo();
                    scene.add(gizmo);
                }
            });
        });
        this.colliderGroups.forEach((colliderGroup) => {
            colliderGroup.colliders.forEach((collider) => {
                collider.material = _colliderGizmoMaterial;
                collider.renderOrder = VRM_GIZMO_RENDER_ORDER;
            });
        });
    }
}

const _v3A$4 = new Vector3();
class VRMSpringBoneDebug extends VRMSpringBone {
    constructor(bone, params) {
        super(bone, params);
    }
    /**
     * Return spring bone gizmo, as `THREE.ArrowHelper`.
     * Useful for debugging spring bones.
     */
    getGizmo() {
        // return if gizmo is already existed
        if (this._gizmo) {
            return this._gizmo;
        }
        const nextTailRelative = _v3A$4.copy(this._nextTail).sub(this._centerSpacePosition);
        const nextTailRelativeLength = nextTailRelative.length();
        this._gizmo = new ArrowHelper(nextTailRelative.normalize(), this._centerSpacePosition, nextTailRelativeLength, 0xffff00, this.radius, this.radius);
        // it should be always visible
        this._gizmo.line.renderOrder = VRM_GIZMO_RENDER_ORDER;
        this._gizmo.cone.renderOrder = VRM_GIZMO_RENDER_ORDER;
        this._gizmo.line.material.depthTest = false;
        this._gizmo.line.material.transparent = true;
        this._gizmo.cone.material.depthTest = false;
        this._gizmo.cone.material.transparent = true;
        return this._gizmo;
    }
    update(delta) {
        super.update(delta);
        // lastly we're gonna update gizmo
        this._updateGizmo();
    }
    _updateGizmo() {
        if (!this._gizmo) {
            return;
        }
        const nextTailRelative = _v3A$4.copy(this._currentTail).sub(this._centerSpacePosition);
        const nextTailRelativeLength = nextTailRelative.length();
        this._gizmo.setDirection(nextTailRelative.normalize());
        this._gizmo.setLength(nextTailRelativeLength, this.radius, this.radius);
        this._gizmo.position.copy(this._centerSpacePosition);
    }
}

class VRMSpringBoneImporterDebug extends VRMSpringBoneImporter {
    import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt)
                return null;
            const schemaSecondaryAnimation = vrmExt.secondaryAnimation;
            if (!schemaSecondaryAnimation)
                return null;
            // 衝突判定球体メッシュ。
            const colliderGroups = yield this._importColliderMeshGroups(gltf, schemaSecondaryAnimation);
            // 同じ属性（stiffinessやdragForceが同じ）のボーンはboneGroupにまとめられている。
            // 一列だけではないことに注意。
            const springBoneGroupList = yield this._importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups);
            return new VRMSpringBoneManagerDebug(colliderGroups, springBoneGroupList);
        });
    }
    _createSpringBone(bone, params) {
        return new VRMSpringBoneDebug(bone, params);
    }
}

/**
 * An importer that imports a [[VRMDebug]] from a VRM extension of a GLTF.
 */
class VRMImporterDebug extends VRMImporter {
    constructor(options = {}) {
        options.lookAtImporter = options.lookAtImporter || new VRMLookAtImporterDebug();
        options.springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporterDebug();
        super(options);
    }
    import(gltf, debugOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
                throw new Error('Could not find VRM extension on the GLTF');
            }
            const scene = gltf.scene;
            scene.updateMatrixWorld(false);
            // Skinned object should not be frustumCulled
            // Since pre-skinned position might be outside of view
            scene.traverse((object3d) => {
                if (object3d.isMesh) {
                    object3d.frustumCulled = false;
                }
            });
            const meta = (yield this._metaImporter.import(gltf)) || undefined;
            const materials = (yield this._materialImporter.convertGLTFMaterials(gltf)) || undefined;
            const humanoid = (yield this._humanoidImporter.import(gltf)) || undefined;
            const firstPerson = humanoid ? (yield this._firstPersonImporter.import(gltf, humanoid)) || undefined : undefined;
            const blendShapeProxy = (yield this._blendShapeImporter.import(gltf)) || undefined;
            const lookAt = firstPerson && blendShapeProxy && humanoid
                ? (yield this._lookAtImporter.import(gltf, firstPerson, blendShapeProxy, humanoid)) || undefined
                : undefined;
            if (lookAt.setupHelper) {
                lookAt.setupHelper(scene, debugOptions);
            }
            const springBoneManager = (yield this._springBoneImporter.import(gltf)) || undefined;
            if (springBoneManager.setupHelper) {
                springBoneManager.setupHelper(scene, debugOptions);
            }
            return new VRMDebug({
                scene: gltf.scene,
                meta,
                materials,
                humanoid,
                firstPerson,
                blendShapeProxy,
                lookAt,
                springBoneManager,
            }, debugOptions);
        });
    }
}

const VRM_GIZMO_RENDER_ORDER = 10000;
/**
 * [[VRM]] but it has some useful gizmos.
 */
class VRMDebug extends VRM {
    /**
     * Create a new VRMDebug from a parsed result of GLTF taken from GLTFLoader.
     *
     * See [[VRM.from]] for a detailed example.
     *
     * @param gltf A parsed GLTF object taken from GLTFLoader
     * @param options Options that will be used in importer
     * @param debugOption Options for VRMDebug features
     */
    static from(gltf, options = {}, debugOption = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const importer = new VRMImporterDebug(options);
            return yield importer.import(gltf, debugOption);
        });
    }
    /**
     * Create a new VRMDebug instance.
     *
     * @param params [[VRMParameters]] that represents components of the VRM
     * @param debugOption Options for VRMDebug features
     */
    constructor(params, debugOption = {}) {
        super(params);
        // Gizmoを展開
        if (!debugOption.disableBoxHelper) {
            this.scene.add(new BoxHelper(this.scene));
        }
        if (!debugOption.disableSkeletonHelper) {
            this.scene.add(new SkeletonHelper(this.scene));
        }
    }
    update(delta) {
        super.update(delta);
    }
}

export { MToonMaterial, MToonMaterialCullMode, MToonMaterialDebugMode, MToonMaterialOutlineColorMode, MToonMaterialOutlineWidthMode, MToonMaterialRenderMode, VRM, VRMBlendShapeGroup, VRMBlendShapeImporter, VRMBlendShapeProxy, VRMCurveMapper, VRMDebug, VRMFirstPerson, VRMFirstPersonImporter, VRMHumanBone, VRMHumanoid, VRMHumanoidImporter, VRMImporter, VRMLookAtApplyer, VRMLookAtBlendShapeApplyer, VRMLookAtBoneApplyer, VRMLookAtHead, VRMLookAtImporter, VRMMaterialImporter, VRMMetaImporter, VRMRendererFirstPersonFlags, VRMSchema, VRMSpringBone, VRMSpringBoneDebug, VRMSpringBoneImporter, VRMSpringBoneImporterDebug, VRMSpringBoneManager, VRMUnlitMaterial, VRMUnlitMaterialRenderType, VRMUtils, VRM_GIZMO_RENDER_ORDER };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9kaXNwb3Nlci50cyIsIi4uL3NyYy9ibGVuZHNoYXBlL1ZSTUJsZW5kU2hhcGVHcm91cC50cyIsIi4uL3NyYy90eXBlcy9WUk1TY2hlbWEudHMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUudHMiLCIuLi9zcmMvdXRpbHMvcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eS50cyIsIi4uL3NyYy91dGlscy9tYXRoLnRzIiwiLi4vc3JjL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZVByb3h5LnRzIiwiLi4vc3JjL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUltcG9ydGVyLnRzIiwiLi4vc3JjL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uLnRzIiwiLi4vc3JjL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uSW1wb3J0ZXIudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRJbXBvcnRlci50cyIsIi4uL3NyYy9sb29rYXQvVlJNQ3VydmVNYXBwZXIudHMiLCIuLi9zcmMvbG9va2F0L1ZSTUxvb2tBdEFwcGx5ZXIudHMiLCIuLi9zcmMvbG9va2F0L1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLnRzIiwiLi4vc3JjL2xvb2thdC9WUk1Mb29rQXRIZWFkLnRzIiwiLi4vc3JjL2xvb2thdC9WUk1Mb29rQXRCb25lQXBwbHllci50cyIsIi4uL3NyYy9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXIudHMiLCIuLi9zcmMvbWF0ZXJpYWwvZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uLnRzIiwiLi4vc3JjL21hdGVyaWFsL01Ub29uTWF0ZXJpYWwudHMiLCIuLi9zcmMvbWF0ZXJpYWwvVlJNVW5saXRNYXRlcmlhbC50cyIsIi4uL3NyYy9tYXRlcmlhbC9WUk1NYXRlcmlhbEltcG9ydGVyLnRzIiwiLi4vc3JjL21ldGEvVlJNTWV0YUltcG9ydGVyLnRzIiwiLi4vc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZS50cyIsIi4uL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmUudHMiLCIuLi9zcmMvc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsIi4uL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlci50cyIsIi4uL3NyYy9WUk1JbXBvcnRlci50cyIsIi4uL3NyYy9WUk0udHMiLCIuLi9zcmMvVlJNVXRpbHMvZXh0cmFjdFRodW1ibmFpbEJsb2IudHMiLCIuLi9zcmMvVlJNVXRpbHMvcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMudHMiLCIuLi9zcmMvVlJNVXRpbHMvaW5kZXgudHMiLCIuLi9zcmMvZGVidWcvVlJNTG9va0F0SGVhZERlYnVnLnRzIiwiLi4vc3JjL2RlYnVnL1ZSTUxvb2tBdEltcG9ydGVyRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zy50cyIsIi4uL3NyYy9kZWJ1Zy9WUk1TcHJpbmdCb25lRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNSW1wb3J0ZXJEZWJ1Zy50cyIsIi4uL3NyYy9kZWJ1Zy9WUk1EZWJ1Zy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCIvLyBTZWU6IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jbWFudWFsL2VuL2ludHJvZHVjdGlvbi9Ib3ctdG8tZGlzcG9zZS1vZi1vYmplY3RzXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZnVuY3Rpb24gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IHZvaWQge1xuICBPYmplY3Qua2V5cyhtYXRlcmlhbCkuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdO1xuICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gdmFsdWUgYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIHRleHR1cmUuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xufVxuXG5mdW5jdGlvbiBkaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBjb25zdCBnZW9tZXRyeTogVEhSRUUuR2VvbWV0cnkgPSAob2JqZWN0M0QgYXMgYW55KS5nZW9tZXRyeTtcbiAgaWYgKGdlb21ldHJ5KSB7XG4gICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuTWF0ZXJpYWxbXSA9IChvYmplY3QzRCBhcyBhbnkpLm1hdGVyaWFsO1xuICBpZiAobWF0ZXJpYWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgIG1hdGVyaWFsLmZvckVhY2goKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCkgPT4gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gICAgfSBlbHNlIGlmIChtYXRlcmlhbCkge1xuICAgICAgZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBEaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBvYmplY3QzRC50cmF2ZXJzZShkaXNwb3NlKTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQcmltaXRpdmUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNQmxlbmRTaGFwZUJpbmQge1xuICBtZXNoZXM6IEdMVEZQcmltaXRpdmVbXTtcbiAgbW9ycGhUYXJnZXRJbmRleDogbnVtYmVyO1xuICB3ZWlnaHQ6IG51bWJlcjtcbn1cblxuZW51bSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUge1xuICBOVU1CRVIsXG4gIFZFQ1RPUjIsXG4gIFZFQ1RPUjMsXG4gIFZFQ1RPUjQsXG4gIENPTE9SLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlIHtcbiAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgZGVmYXVsdFZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgdGFyZ2V0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICBkZWx0YVZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjsgLy8gdGFyZ2V0VmFsdWUgLSBkZWZhdWx0VmFsdWVcbiAgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xufVxuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuY29uc3QgX3YzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92NCA9IG5ldyBUSFJFRS5WZWN0b3I0KCk7XG5jb25zdCBfY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcblxuLy8gYW5pbWF0aW9uTWl4ZXIg44Gu55uj6KaW5a++6LGh44Gv44CBU2NlbmUg44Gu5Lit44Gr5YWl44Gj44Gm44GE44KL5b+F6KaB44GM44GC44KL44CCXG4vLyDjgZ3jga7jgZ/jgoHjgIHooajnpLrjgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjgZHjgozjganjgIFPYmplY3QzRCDjgpLntpnmib/jgZfjgaYgU2NlbmUg44Gr5oqV5YWl44Gn44GN44KL44KI44GG44Gr44GZ44KL44CCXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZUdyb3VwIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICBwdWJsaWMgd2VpZ2h0ID0gMC4wO1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICBwcml2YXRlIF9iaW5kczogVlJNQmxlbmRTaGFwZUJpbmRbXSA9IFtdO1xuICBwcml2YXRlIF9tYXRlcmlhbFZhbHVlczogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IGBCbGVuZFNoYXBlQ29udHJvbGxlcl8ke2V4cHJlc3Npb25OYW1lfWA7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ0JsZW5kU2hhcGVDb250cm9sbGVyJztcbiAgICAvLyDooajnpLrnm67nmoTjga7jgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjga7jgafjgIHosqDojbfou73muJvjga7jgZ/jgoHjgasgdmlzaWJsZSDjgpIgZmFsc2Ug44Gr44GX44Gm44GK44GP44CCXG4gICAgLy8g44GT44KM44Gr44KI44KK44CB44GT44Gu44Kk44Oz44K544K/44Oz44K544Gr5a++44GZ44KL5q+O44OV44Os44O844Og44GuIG1hdHJpeCDoh6rli5XoqIjnrpfjgpLnnIHnlaXjgafjgY3jgovjgIJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRCaW5kKGFyZ3M6IHsgbWVzaGVzOiBHTFRGUHJpbWl0aXZlW107IG1vcnBoVGFyZ2V0SW5kZXg6IG51bWJlcjsgd2VpZ2h0OiBudW1iZXIgfSk6IHZvaWQge1xuICAgIC8vIG9yaWdpbmFsIHdlaWdodCBpcyAwLTEwMCBidXQgd2Ugd2FudCB0byBkZWFsIHdpdGggdGhpcyB2YWx1ZSB3aXRoaW4gMC0xXG4gICAgY29uc3Qgd2VpZ2h0ID0gYXJncy53ZWlnaHQgLyAxMDA7XG5cbiAgICB0aGlzLl9iaW5kcy5wdXNoKHtcbiAgICAgIG1lc2hlczogYXJncy5tZXNoZXMsXG4gICAgICBtb3JwaFRhcmdldEluZGV4OiBhcmdzLm1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICB3ZWlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTWF0ZXJpYWxWYWx1ZShhcmdzOiB7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcbiAgICBkZWZhdWx0VmFsdWU/OiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gYXJncy5tYXRlcmlhbDtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBhcmdzLnByb3BlcnR5TmFtZTtcblxuICAgIGxldCB2YWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV07XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgLy8gcHJvcGVydHkgaGFzIG5vdCBiZWVuIGZvdW5kXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlID0gYXJncy5kZWZhdWx0VmFsdWUgfHwgdmFsdWU7XG5cbiAgICBsZXQgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xuICAgIGxldCBkZWZhdWx0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICAgIGxldCB0YXJnZXRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gICAgbGV0IGRlbHRhVmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuXG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpLmlzVmVjdG9yMikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IyO1xuICAgICAgZGVmYXVsdFZhbHVlID0gKHZhbHVlIGFzIFRIUkVFLlZlY3RvcjIpLmNsb25lKCk7XG4gICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgYW55KS5pc1ZlY3RvcjMpIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMztcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5WZWN0b3IzKS5jbG9uZSgpO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNWZWN0b3I0KSB7XG4gICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjQ7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuVmVjdG9yNCkuY2xvbmUoKTtcblxuICAgICAgLy8gdmVjdG9yUHJvcGVydHkgYW5kIHRhcmdldFZhbHVlIGluZGV4IGlzIGRpZmZlcmVudCBmcm9tIGVhY2ggb3RoZXJcbiAgICAgIC8vIGV4cG9ydGVkIHZybSBieSBVbmlWUk0gZmlsZSBpc1xuICAgICAgLy9cbiAgICAgIC8vIHZlY3RvclByb3BlcnR5XG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVswXSwgdGFyZ2V0VmFsdWVbMV1cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzJdLCB0YXJnZXRWYWx1ZVszXVxuICAgICAgLy9cbiAgICAgIC8vIHRhcmdldFZhbHVlXG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVsyXSwgdGFyZ2V0VmFsdWVbM11cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsxXVxuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yNCgpLmZyb21BcnJheShbXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMl0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMF0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMV0sXG4gICAgICBdKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNDb2xvcikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5DT0xPUjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5Db2xvcikuY2xvbmUoKTtcbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSO1xuICAgICAgZGVmYXVsdFZhbHVlID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBhcmdzLnRhcmdldFZhbHVlWzBdO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlIC0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLnB1c2goe1xuICAgICAgbWF0ZXJpYWwsXG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICB0YXJnZXRWYWx1ZSxcbiAgICAgIGRlbHRhVmFsdWUsXG4gICAgICB0eXBlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgdmlhIHtAbGluayBCbGVuZFNoYXBlTWFzdGVyI3VwZGF0ZX0uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgdyA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPCAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG5cbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSArPSB3ICogYmluZC53ZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSArPSBkZWx0YVZhbHVlICogdztcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIFRIUkVFLlZlY3RvcjI7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjIuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5WZWN0b3IzO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3YzLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuVmVjdG9yNDtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92NC5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHByZXZpb3VzbHkgYXNzaWduZWQgYmxlbmQgc2hhcGVzLlxuICAgKi9cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSA9IDAuMDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdO1xuICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5OVU1CRVIpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZSBhcyBUSFJFRS5WZWN0b3IyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuVmVjdG9yMztcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLlZlY3RvcjQ7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuQ29sb3I7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUeXBlZG9jIGRvZXMgbm90IHN1cHBvcnQgZXhwb3J0IGRlY2xhcmF0aW9ucyB5ZXRcbi8vIHRoZW4gd2UgaGF2ZSB0byB1c2UgYG5hbWVzcGFjZWAgaW5zdGVhZCBvZiBleHBvcnQgZGVjbGFyYXRpb25zIGZvciBub3cuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9UeXBlU3Ryb25nL3R5cGVkb2MvcHVsbC84MDFcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgVlJNU2NoZW1hIHtcbiAgLyoqXG4gICAqIFZSTSBleHRlbnNpb24gaXMgZm9yIDNkIGh1bWFub2lkIGF2YXRhcnMgKGFuZCBtb2RlbHMpIGluIFZSIGFwcGxpY2F0aW9ucy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgVlJNIHtcbiAgICBibGVuZFNoYXBlTWFzdGVyPzogQmxlbmRTaGFwZTtcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIGV4cG9ydGVyIHRoYXQgdnJtIGNyZWF0ZWQuIFVuaVZSTS0wLjUzLjBcbiAgICAgKi9cbiAgICBleHBvcnRlclZlcnNpb24/OiBzdHJpbmc7XG4gICAgZmlyc3RQZXJzb24/OiBGaXJzdFBlcnNvbjtcbiAgICBodW1hbm9pZD86IEh1bWFub2lkO1xuICAgIG1hdGVyaWFsUHJvcGVydGllcz86IE1hdGVyaWFsW107XG4gICAgbWV0YT86IE1ldGE7XG4gICAgc2Vjb25kYXJ5QW5pbWF0aW9uPzogU2Vjb25kYXJ5QW5pbWF0aW9uO1xuICAgIC8qKlxuICAgICAqIFZlcnNpb24gb2YgVlJNIHNwZWNpZmljYXRpb24uIDAuMFxuICAgICAqL1xuICAgIHNwZWNWZXJzaW9uPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIEJsZW5kU2hhcGVBdmF0YXIgb2YgVW5pVlJNXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGUge1xuICAgIGJsZW5kU2hhcGVHcm91cHM/OiBCbGVuZFNoYXBlR3JvdXBbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZUdyb3VwIHtcbiAgICAvKipcbiAgICAgKiBMb3cgbGV2ZWwgYmxlbmRzaGFwZSByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIGJpbmRzPzogQmxlbmRTaGFwZUJpbmRbXTtcbiAgICAvKipcbiAgICAgKiAwIG9yIDEuIERvIG5vdCBhbGxvdyBhbiBpbnRlcm1lZGlhdGUgdmFsdWUuIFZhbHVlIHNob3VsZCByb3VuZGVkXG4gICAgICovXG4gICAgaXNCaW5hcnk/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE1hdGVyaWFsIGFuaW1hdGlvbiByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIG1hdGVyaWFsVmFsdWVzPzogQmxlbmRTaGFwZU1hdGVyaWFsYmluZFtdO1xuICAgIC8qKlxuICAgICAqIEV4cHJlc3Npb24gbmFtZVxuICAgICAqL1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUHJlZGVmaW5lZCBFeHByZXNzaW9uIG5hbWVcbiAgICAgKi9cbiAgICBwcmVzZXROYW1lPzogQmxlbmRTaGFwZVByZXNldE5hbWU7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGVCaW5kIHtcbiAgICBpbmRleD86IG51bWJlcjtcbiAgICBtZXNoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNraW5uZWRNZXNoUmVuZGVyZXIuU2V0QmxlbmRTaGFwZVdlaWdodFxuICAgICAqL1xuICAgIHdlaWdodD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZU1hdGVyaWFsYmluZCB7XG4gICAgbWF0ZXJpYWxOYW1lPzogc3RyaW5nO1xuICAgIHByb3BlcnR5TmFtZT86IHN0cmluZztcbiAgICB0YXJnZXRWYWx1ZT86IG51bWJlcltdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWRlZmluZWQgRXhwcmVzc2lvbiBuYW1lXG4gICAqL1xuICBleHBvcnQgZW51bSBCbGVuZFNoYXBlUHJlc2V0TmFtZSB7XG4gICAgQSA9ICdhJyxcbiAgICBBbmdyeSA9ICdhbmdyeScsXG4gICAgQmxpbmsgPSAnYmxpbmsnLFxuICAgIEJsaW5rTCA9ICdibGlua19sJyxcbiAgICBCbGlua1IgPSAnYmxpbmtfcicsXG4gICAgRSA9ICdlJyxcbiAgICBGdW4gPSAnZnVuJyxcbiAgICBJID0gJ2knLFxuICAgIEpveSA9ICdqb3knLFxuICAgIExvb2tkb3duID0gJ2xvb2tkb3duJyxcbiAgICBMb29rbGVmdCA9ICdsb29rbGVmdCcsXG4gICAgTG9va3JpZ2h0ID0gJ2xvb2tyaWdodCcsXG4gICAgTG9va3VwID0gJ2xvb2t1cCcsXG4gICAgTmV1dHJhbCA9ICduZXV0cmFsJyxcbiAgICBPID0gJ28nLFxuICAgIFNvcnJvdyA9ICdzb3Jyb3cnLFxuICAgIFUgPSAndScsXG4gICAgVW5rbm93biA9ICd1bmtub3duJyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb24ge1xuICAgIC8qKlxuICAgICAqIFRoZSBib25lIHdob3NlIHJlbmRlcmluZyBzaG91bGQgYmUgdHVybmVkIG9mZiBpbiBmaXJzdC1wZXJzb24gdmlldy4gVXN1YWxseSBIZWFkIGlzXG4gICAgICogc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIGZpcnN0UGVyc29uQm9uZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHBvc2l0aW9uIG9mIHRoZSBWUiBoZWFkc2V0IGluIGZpcnN0LXBlcnNvbiB2aWV3LiBJdCBpcyBhc3N1bWVkIHRoYXQgYW4gb2Zmc2V0XG4gICAgICogZnJvbSB0aGUgaGVhZCBib25lIHRvIHRoZSBWUiBoZWFkc2V0IGlzIGFkZGVkLlxuICAgICAqL1xuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldD86IFZlY3RvcjM7XG4gICAgbG9va0F0SG9yaXpvbnRhbElubmVyPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgbG9va0F0SG9yaXpvbnRhbE91dGVyPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgLyoqXG4gICAgICogRXllIGNvbnRyb2xsZXIgbW9kZS5cbiAgICAgKi9cbiAgICBsb29rQXRUeXBlTmFtZT86IEZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWU7XG4gICAgbG9va0F0VmVydGljYWxEb3duPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgbG9va0F0VmVydGljYWxVcD86IEZpcnN0UGVyc29uRGVncmVlTWFwO1xuICAgIC8qKlxuICAgICAqIFN3aXRjaCBkaXNwbGF5IC8gdW5kaXNwbGF5IGZvciBlYWNoIG1lc2ggaW4gZmlyc3QtcGVyc29uIHZpZXcgb3IgdGhlIG90aGVycy5cbiAgICAgKi9cbiAgICBtZXNoQW5ub3RhdGlvbnM/OiBGaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uW107XG4gIH1cblxuICAvKipcbiAgICogRXllIGNvbnRyb2xsZXIgc2V0dGluZy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb25EZWdyZWVNYXAge1xuICAgIC8qKlxuICAgICAqIE5vbmUgbGluZWFyIG1hcHBpbmcgcGFyYW1zLiB0aW1lLCB2YWx1ZSwgaW5UYW5nZW50LCBvdXRUYW5nZW50XG4gICAgICovXG4gICAgY3VydmU/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBMb29rIGF0IGlucHV0IGNsYW1wIHJhbmdlIGRlZ3JlZS5cbiAgICAgKi9cbiAgICB4UmFuZ2U/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTG9vayBhdCBtYXAgcmFuZ2UgZGVncmVlIGZyb20geFJhbmdlLlxuICAgICAqL1xuICAgIHlSYW5nZT86IG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeWUgY29udHJvbGxlciBtb2RlLlxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZSB7XG4gICAgQmxlbmRTaGFwZSA9ICdCbGVuZFNoYXBlJyxcbiAgICBCb25lID0gJ0JvbmUnLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uIHtcbiAgICBmaXJzdFBlcnNvbkZsYWc/OiBzdHJpbmc7XG4gICAgbWVzaD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSHVtYW5vaWQge1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5hcm1TdHJldGNoXG4gICAgICovXG4gICAgYXJtU3RyZXRjaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uZmVldFNwYWNpbmdcbiAgICAgKi9cbiAgICBmZWV0U3BhY2luZz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uaGFzVHJhbnNsYXRpb25Eb0ZcbiAgICAgKi9cbiAgICBoYXNUcmFuc2xhdGlvbkRvRj86IGJvb2xlYW47XG4gICAgaHVtYW5Cb25lcz86IEh1bWFub2lkQm9uZVtdO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5sZWdTdHJldGNoXG4gICAgICovXG4gICAgbGVnU3RyZXRjaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24ubG93ZXJBcm1Ud2lzdFxuICAgICAqL1xuICAgIGxvd2VyQXJtVHdpc3Q/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmxvd2VyTGVnVHdpc3RcbiAgICAgKi9cbiAgICBsb3dlckxlZ1R3aXN0PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi51cHBlckFybVR3aXN0XG4gICAgICovXG4gICAgdXBwZXJBcm1Ud2lzdD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24udXBwZXJMZWdUd2lzdFxuICAgICAqL1xuICAgIHVwcGVyTGVnVHdpc3Q/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEh1bWFub2lkQm9uZSB7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LmF4aXNMZW5ndGhcbiAgICAgKi9cbiAgICBheGlzTGVuZ3RoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEh1bWFuIGJvbmUgbmFtZS5cbiAgICAgKi9cbiAgICBib25lPzogSHVtYW5vaWRCb25lTmFtZTtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQuY2VudGVyXG4gICAgICovXG4gICAgY2VudGVyPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWF4XG4gICAgICovXG4gICAgbWF4PzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWluXG4gICAgICovXG4gICAgbWluPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2Ugbm9kZSBpbmRleFxuICAgICAqL1xuICAgIG5vZGU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LnVzZURlZmF1bHRWYWx1ZXNcbiAgICAgKi9cbiAgICB1c2VEZWZhdWx0VmFsdWVzPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIdW1hbiBib25lIG5hbWUuXG4gICAqL1xuICBleHBvcnQgZW51bSBIdW1hbm9pZEJvbmVOYW1lIHtcbiAgICBDaGVzdCA9ICdjaGVzdCcsXG4gICAgSGVhZCA9ICdoZWFkJyxcbiAgICBIaXBzID0gJ2hpcHMnLFxuICAgIEphdyA9ICdqYXcnLFxuICAgIExlZnRFeWUgPSAnbGVmdEV5ZScsXG4gICAgTGVmdEZvb3QgPSAnbGVmdEZvb3QnLFxuICAgIExlZnRIYW5kID0gJ2xlZnRIYW5kJyxcbiAgICBMZWZ0SW5kZXhEaXN0YWwgPSAnbGVmdEluZGV4RGlzdGFsJyxcbiAgICBMZWZ0SW5kZXhJbnRlcm1lZGlhdGUgPSAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0SW5kZXhQcm94aW1hbCA9ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gICAgTGVmdExpdHRsZURpc3RhbCA9ICdsZWZ0TGl0dGxlRGlzdGFsJyxcbiAgICBMZWZ0TGl0dGxlSW50ZXJtZWRpYXRlID0gJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRMaXR0bGVQcm94aW1hbCA9ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICAgIExlZnRMb3dlckFybSA9ICdsZWZ0TG93ZXJBcm0nLFxuICAgIExlZnRMb3dlckxlZyA9ICdsZWZ0TG93ZXJMZWcnLFxuICAgIExlZnRNaWRkbGVEaXN0YWwgPSAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICAgTGVmdE1pZGRsZUludGVybWVkaWF0ZSA9ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0TWlkZGxlUHJveGltYWwgPSAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgICBMZWZ0UmluZ0Rpc3RhbCA9ICdsZWZ0UmluZ0Rpc3RhbCcsXG4gICAgTGVmdFJpbmdJbnRlcm1lZGlhdGUgPSAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRSaW5nUHJveGltYWwgPSAnbGVmdFJpbmdQcm94aW1hbCcsXG4gICAgTGVmdFNob3VsZGVyID0gJ2xlZnRTaG91bGRlcicsXG4gICAgTGVmdFRodW1iRGlzdGFsID0gJ2xlZnRUaHVtYkRpc3RhbCcsXG4gICAgTGVmdFRodW1iSW50ZXJtZWRpYXRlID0gJ2xlZnRUaHVtYkludGVybWVkaWF0ZScsXG4gICAgTGVmdFRodW1iUHJveGltYWwgPSAnbGVmdFRodW1iUHJveGltYWwnLFxuICAgIExlZnRUb2VzID0gJ2xlZnRUb2VzJyxcbiAgICBMZWZ0VXBwZXJBcm0gPSAnbGVmdFVwcGVyQXJtJyxcbiAgICBMZWZ0VXBwZXJMZWcgPSAnbGVmdFVwcGVyTGVnJyxcbiAgICBOZWNrID0gJ25lY2snLFxuICAgIFJpZ2h0RXllID0gJ3JpZ2h0RXllJyxcbiAgICBSaWdodEZvb3QgPSAncmlnaHRGb290JyxcbiAgICBSaWdodEhhbmQgPSAncmlnaHRIYW5kJyxcbiAgICBSaWdodEluZGV4RGlzdGFsID0gJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICAgIFJpZ2h0SW5kZXhJbnRlcm1lZGlhdGUgPSAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICAgUmlnaHRJbmRleFByb3hpbWFsID0gJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gICAgUmlnaHRMaXR0bGVEaXN0YWwgPSAncmlnaHRMaXR0bGVEaXN0YWwnLFxuICAgIFJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlID0gJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodExpdHRsZVByb3hpbWFsID0gJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICAgIFJpZ2h0TG93ZXJBcm0gPSAncmlnaHRMb3dlckFybScsXG4gICAgUmlnaHRMb3dlckxlZyA9ICdyaWdodExvd2VyTGVnJyxcbiAgICBSaWdodE1pZGRsZURpc3RhbCA9ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gICAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUgPSAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0TWlkZGxlUHJveGltYWwgPSAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gICAgUmlnaHRSaW5nRGlzdGFsID0gJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlID0gJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gICAgUmlnaHRSaW5nUHJveGltYWwgPSAncmlnaHRSaW5nUHJveGltYWwnLFxuICAgIFJpZ2h0U2hvdWxkZXIgPSAncmlnaHRTaG91bGRlcicsXG4gICAgUmlnaHRUaHVtYkRpc3RhbCA9ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgICBSaWdodFRodW1iSW50ZXJtZWRpYXRlID0gJ3JpZ2h0VGh1bWJJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0VGh1bWJQcm94aW1hbCA9ICdyaWdodFRodW1iUHJveGltYWwnLFxuICAgIFJpZ2h0VG9lcyA9ICdyaWdodFRvZXMnLFxuICAgIFJpZ2h0VXBwZXJBcm0gPSAncmlnaHRVcHBlckFybScsXG4gICAgUmlnaHRVcHBlckxlZyA9ICdyaWdodFVwcGVyTGVnJyxcbiAgICBTcGluZSA9ICdzcGluZScsXG4gICAgVXBwZXJDaGVzdCA9ICd1cHBlckNoZXN0JyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWwge1xuICAgIGZsb2F0UHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAga2V5d29yZE1hcD86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgbmFtZT86IHN0cmluZztcbiAgICByZW5kZXJRdWV1ZT86IG51bWJlcjtcbiAgICBzaGFkZXI/OiBzdHJpbmc7XG4gICAgdGFnTWFwPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICB0ZXh0dXJlUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgdmVjdG9yUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE1ldGEge1xuICAgIC8qKlxuICAgICAqIEEgcGVyc29uIHdobyBjYW4gcGVyZm9ybSB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgYWxsb3dlZFVzZXJOYW1lPzogTWV0YUFsbG93ZWRVc2VyTmFtZTtcbiAgICAvKipcbiAgICAgKiBBdXRob3Igb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgYXV0aG9yPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEZvciBjb21tZXJjaWFsIHVzZVxuICAgICAqL1xuICAgIGNvbW1lcmNpYWxVc3NhZ2VOYW1lPzogTWV0YVVzc2FnZU5hbWU7XG4gICAgLyoqXG4gICAgICogQ29udGFjdCBJbmZvcm1hdGlvbiBvZiBWUk0gbW9kZWwgYXV0aG9yXG4gICAgICovXG4gICAgY29udGFjdEluZm9ybWF0aW9uPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIExpY2Vuc2UgdHlwZVxuICAgICAqL1xuICAgIGxpY2Vuc2VOYW1lPzogTWV0YUxpY2Vuc2VOYW1lO1xuICAgIC8qKlxuICAgICAqIElmIOKAnE90aGVy4oCdIGlzIHNlbGVjdGVkLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50IGhlcmUuXG4gICAgICovXG4gICAgb3RoZXJMaWNlbnNlVXJsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIElmIHRoZXJlIGFyZSBhbnkgY29uZGl0aW9ucyBub3QgbWVudGlvbmVkIGFib3ZlLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50XG4gICAgICogaGVyZS5cbiAgICAgKi9cbiAgICBvdGhlclBlcm1pc3Npb25Vcmw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHJlZmVyZW5jZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gc2V4dWFsIGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgICAqL1xuICAgIHNleHVhbFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgICAvKipcbiAgICAgKiBUaHVtYm5haWwgb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgdGV4dHVyZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICB0aXRsZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHZlcnNpb24/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHZpb2xlbnQgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgdmlvbGVudFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHBlcnNvbiB3aG8gY2FuIHBlcmZvcm0gd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YUFsbG93ZWRVc2VyTmFtZSB7XG4gICAgRXZlcnlvbmUgPSAnRXZlcnlvbmUnLFxuICAgIEV4cGxpY2l0bHlMaWNlbnNlZFBlcnNvbiA9ICdFeHBsaWNpdGx5TGljZW5zZWRQZXJzb24nLFxuICAgIE9ubHlBdXRob3IgPSAnT25seUF1dGhvcicsXG4gIH1cblxuICAvKipcbiAgICogRm9yIGNvbW1lcmNpYWwgdXNlXG4gICAqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSBzZXh1YWwgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSB2aW9sZW50IGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YVVzc2FnZU5hbWUge1xuICAgIEFsbG93ID0gJ0FsbG93JyxcbiAgICBEaXNhbGxvdyA9ICdEaXNhbGxvdycsXG4gIH1cblxuICAvKipcbiAgICogTGljZW5zZSB0eXBlXG4gICAqL1xuICBleHBvcnQgZW51bSBNZXRhTGljZW5zZU5hbWUge1xuICAgIENjMCA9ICdDQzAnLFxuICAgIENjQnkgPSAnQ0NfQlknLFxuICAgIENjQnlOYyA9ICdDQ19CWV9OQycsXG4gICAgQ2NCeU5jTmQgPSAnQ0NfQllfTkNfTkQnLFxuICAgIENjQnlOY1NhID0gJ0NDX0JZX05DX1NBJyxcbiAgICBDY0J5TmQgPSAnQ0NfQllfTkQnLFxuICAgIENjQnlTYSA9ICdDQ19CWV9TQScsXG4gICAgT3RoZXIgPSAnT3RoZXInLFxuICAgIFJlZGlzdHJpYnV0aW9uUHJvaGliaXRlZCA9ICdSZWRpc3RyaWJ1dGlvbl9Qcm9oaWJpdGVkJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2V0dGluZyBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uIG9mIHN0cmluZy1saWtlIG9iamVjdHMgc3VjaCBhcyB0YWlscyBhbmQgaGFpcnMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlY29uZGFyeUFuaW1hdGlvbiB7XG4gICAgYm9uZUdyb3Vwcz86IFNlY29uZGFyeUFuaW1hdGlvblNwcmluZ1tdO1xuICAgIGNvbGxpZGVyR3JvdXBzPzogU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJncm91cFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25TcHJpbmcge1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIG5vZGUgaW5kZXggb2YgdGhlIHJvb3QgYm9uZSBvZiB0aGUgc3dheWluZyBvYmplY3QuXG4gICAgICovXG4gICAgYm9uZXM/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVmZXJlbmNlIHBvaW50IG9mIGEgc3dheWluZyBvYmplY3QgY2FuIGJlIHNldCBhdCBhbnkgbG9jYXRpb24gZXhjZXB0IHRoZSBvcmlnaW4uXG4gICAgICogV2hlbiBpbXBsZW1lbnRpbmcgVUkgbW92aW5nIHdpdGggd2FycCwgdGhlIHBhcmVudCBub2RlIHRvIG1vdmUgd2l0aCB3YXJwIGNhbiBiZSBzcGVjaWZpZWRcbiAgICAgKiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBtYWtlIHRoZSBvYmplY3Qgc3dheWluZyB3aXRoIHdhcnAgbW92ZW1lbnQuXG4gICAgICovXG4gICAgY2VudGVyPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGluZGV4IG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3IgY29sbGlzaW9ucyB3aXRoIHN3YXlpbmcgb2JqZWN0cy5cbiAgICAgKi9cbiAgICBjb2xsaWRlckdyb3Vwcz86IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIEFubm90YXRpb24gY29tbWVudFxuICAgICAqL1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHJlc2lzdGFuY2UgKGRlY2VsZXJhdGlvbikgb2YgYXV0b21hdGljIGFuaW1hdGlvbi5cbiAgICAgKi9cbiAgICBkcmFnRm9yY2U/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIGRpcmVjdGlvbiBvZiBncmF2aXR5LiBTZXQgKDAsIC0xLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgZ3Jhdml0eS4gU2V0ICgxLCAwLCAwKSBmb3JcbiAgICAgKiBzaW11bGF0aW5nIHRoZSB3aW5kLlxuICAgICAqL1xuICAgIGdyYXZpdHlEaXI/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiBncmF2aXR5LlxuICAgICAqL1xuICAgIGdyYXZpdHlQb3dlcj86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgdXNlZCBmb3IgdGhlIGNvbGxpc2lvbiBkZXRlY3Rpb24gd2l0aCBjb2xsaWRlcnMuXG4gICAgICovXG4gICAgaGl0UmFkaXVzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSByZXNpbGllbmNlIG9mIHRoZSBzd2F5aW5nIG9iamVjdCAodGhlIHBvd2VyIG9mIHJldHVybmluZyB0byB0aGUgaW5pdGlhbCBwb3NlKS5cbiAgICAgKi9cbiAgICBzdGlmZmluZXNzPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcmdyb3VwIHtcbiAgICBjb2xsaWRlcnM/OiBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcltdO1xuICAgIC8qKlxuICAgICAqIFRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3Igc2V0dGluZyB1cCBjb2xsaXNpb24gZGV0ZWN0aW9ucy5cbiAgICAgKi9cbiAgICBub2RlPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlciB7XG4gICAgLyoqXG4gICAgICogVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXG4gICAgICovXG4gICAgb2Zmc2V0PzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cbiAgICAgKi9cbiAgICByYWRpdXM/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFZlY3RvcjMge1xuICAgIHg/OiBudW1iZXI7XG4gICAgeT86IG51bWJlcjtcbiAgICB6PzogbnVtYmVyO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB0eXBlIHsgR0xURlByaW1pdGl2ZSwgR0xURlNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBHTFRGUHJpbWl0aXZlW10gfCBudWxsIHtcbiAgY29uc3Qgc2NoZW1hTm9kZTogR0xURlNjaGVtYS5Ob2RlID0gZ2x0Zi5wYXJzZXIuanNvbi5ub2Rlc1tub2RlSW5kZXhdO1xuICBjb25zdCBtZXNoSW5kZXggPSBzY2hlbWFOb2RlLm1lc2g7XG4gIGlmIChtZXNoSW5kZXggPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc2NoZW1hTWVzaDogR0xURlNjaGVtYS5NZXNoID0gZ2x0Zi5wYXJzZXIuanNvbi5tZXNoZXNbbWVzaEluZGV4XTtcblxuICBjb25zdCBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10gPSBbXTtcblxuICBpZiAoKG5vZGUgYXMgYW55KS5pc01lc2gpIHtcbiAgICBwcmltaXRpdmVzLnB1c2gobm9kZSBhcyBHTFRGUHJpbWl0aXZlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwcmltaXRpdmVzQ291bnQgPSBzY2hlbWFNZXNoLnByaW1pdGl2ZXMubGVuZ3RoO1xuXG4gICAgLy8gYXNzdW1pbmcgZmlyc3QgKHByaW1pdGl2ZXNDb3VudCkgY2hpbGRyZW4gYXJlIGl0cyBwcmltaXRpdmVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmltaXRpdmVzQ291bnQ7IGkrKykge1xuICAgICAgcHJpbWl0aXZlcy5wdXNoKG5vZGUuY2hpbGRyZW5baV0gYXMgR0xURlByaW1pdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPEdMVEZQcmltaXRpdmVbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgR0xURlByaW1pdGl2ZVtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgR0xURlByaW1pdGl2ZVtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICBjb25zb2xlLndhcm4oYHJlbmFtZU1hdGVyaWFsUHJvcGVydHk6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygxKTtcblxuICBpZiAoIS9bQS1aXS8udGVzdChuYW1lWzBdKSkge1xuICAgIGNvbnNvbGUud2FybihgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eTogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgcmV0dXJuIG5hbWVbMF0udG9Mb3dlckNhc2UoKSArIG5hbWUuc3Vic3RyaW5nKDEpO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIENsYW1wIGFuIGlucHV0IG51bWJlciB3aXRoaW4gWyBgMC4wYCAtIGAxLjBgIF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHJhbmdlIG9mIGFuIGlucHV0IHZhbHVlIGZyb20gWyBgbWluYCAtIGBtYXhgIF0gdG8gWyBgMC4wYCAtIGAxLjBgIF0uXG4gKiBJZiBpbnB1dCB2YWx1ZSBpcyBsZXNzIHRoYW4gYG1pbmAgLCBpdCByZXR1cm5zIGAwLjBgLlxuICogSWYgaW5wdXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIGBtYXhgICwgaXQgcmV0dXJucyBgMS4wYC5cbiAqXG4gKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vbWF0aC9NYXRoLnNtb290aHN0ZXBcbiAqXG4gKiBAcGFyYW0geCBUaGUgdmFsdWUgdGhhdCB3aWxsIGJlIG1hcHBlZCBpbnRvIHRoZSBzcGVjaWZpZWQgcmFuZ2VcbiAqIEBwYXJhbSBtaW4gTWluaW11bSB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAqIEBwYXJhbSBtYXggTWF4aW11bSB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbnN0ZXAoeDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoeCA8PSBtaW4pIHJldHVybiAwO1xuICBpZiAoeCA+PSBtYXgpIHJldHVybiAxO1xuXG4gIHJldHVybiAoeCAtIG1pbikgLyAobWF4IC0gbWluKTtcbn1cblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgcG9zaXRpb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUG9zaXRpb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKG91dCwgX3JvdGF0aW9uLCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgc2NhbGUgb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkU2NhbGVMaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgX3JvdGF0aW9uLCBvdXQpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgcm90YXRpb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUXVhdGVybmlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3Bvc2l0aW9uLCBvdXQsIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG4iLCJpbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUdyb3VwIH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlR3JvdXAnO1xuXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZVByb3h5IHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgcmVnaXN0ZXJlZCBibGVuZCBzaGFwZS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVHcm91cHM6IHsgW25hbWU6IHN0cmluZ106IFZSTUJsZW5kU2hhcGVHcm91cCB9ID0ge307XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gW1tWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdXSB0byBpdHMgYWN0dWFsIGJsZW5kIHNoYXBlIG5hbWUuXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9ibGVuZFNoYXBlUHJlc2V0TWFwOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgbmFtZSBvZiB1bmtub3duIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3Vua25vd25Hcm91cE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNQmxlbmRTaGFwZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBuYW1lIG9mIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGV4cHJlc3Npb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3Vwcyk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBbW1ZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV1dIHRvIGl0cyBhY3R1YWwgYmxlbmQgc2hhcGUgbmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgYmxlbmRTaGFwZVByZXNldE1hcCgpOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXA7XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIG5hbWUgb2YgdW5rbm93biBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHVua25vd25Hcm91cE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdW5rbm93bkdyb3VwTmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWU6IHN0cmluZyB8IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSk6IFZSTUJsZW5kU2hhcGVHcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJlc2V0TmFtZSA9IHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXBbbmFtZSBhcyBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwcmVzZXROYW1lID8gdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1twcmVzZXROYW1lXSA6IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oYG5vIGJsZW5kIHNoYXBlIGZvdW5kIGJ5ICR7bmFtZX1gKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdvcnVwXG4gICAqIEBwYXJhbSBjb250cm9sbGVyIFZSTUJsZW5kU2hhcGVDb250cm9sbGVyIHRoYXQgZGVzY3JpYmVzIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwcmVzZXROYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCB1bmRlZmluZWQsXG4gICAgY29udHJvbGxlcjogVlJNQmxlbmRTaGFwZUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdID0gY29udHJvbGxlcjtcbiAgICBpZiAocHJlc2V0TmFtZSkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByZXNldE1hcFtwcmVzZXROYW1lXSA9IG5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Vua25vd25Hcm91cE5hbWVzLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHdlaWdodCBvZiBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xuICAgIHJldHVybiBjb250cm9sbGVyPy53ZWlnaHQgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB3ZWlnaHQgdG8gc3BlY2lmaWVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKiBAcGFyYW0gd2VpZ2h0IFdlaWdodFxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5nZXRCbGVuZFNoYXBlR3JvdXAobmFtZSk7XG4gICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIud2VpZ2h0ID0gc2F0dXJhdGUod2VpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdHJhY2sgbmFtZSBvZiBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgYmxlbmQgc2hhcGUgZ3JvdXAgdmlhIGtleWZyYW1lIGFuaW1hdGlvbnMuXG4gICAqXG4gICAqIEBleGFtcGxlIE1hbmlwdWxhdGUgYSBibGVuZCBzaGFwZSBncm91cCB1c2luZyBrZXlmcmFtZSBhbmltYXRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgdHJhY2tOYW1lID0gdnJtLmJsZW5kU2hhcGVQcm94eS5nZXRCbGVuZFNoYXBlVHJhY2tOYW1lKCBUSFJFRS5WUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuQmxpbmsgKTtcbiAgICogY29uc3QgdHJhY2sgPSBuZXcgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjayhcbiAgICogICBuYW1lLFxuICAgKiAgIFsgMC4wLCAwLjUsIDEuMCBdLCAvLyB0aW1lc1xuICAgKiAgIFsgMC4wLCAxLjAsIDAuMCBdIC8vIHZhbHVlc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBjbGlwID0gbmV3IFRIUkVFLkFuaW1hdGlvbkNsaXAoXG4gICAqICAgJ2JsaW5rJywgLy8gbmFtZVxuICAgKiAgIDEuMCwgLy8gZHVyYXRpb25cbiAgICogICBbIHRyYWNrIF0gLy8gdHJhY2tzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IG1peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKCB2cm0uc2NlbmUgKTtcbiAgICogY29uc3QgYWN0aW9uID0gbWl4ZXIuY2xpcEFjdGlvbiggY2xpcCApO1xuICAgKiBhY3Rpb24ucGxheSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBnZXRCbGVuZFNoYXBlVHJhY2tOYW1lKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldEJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICByZXR1cm4gY29udHJvbGxlciA/IGAke2NvbnRyb2xsZXIubmFtZX0ud2VpZ2h0YCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGV2ZXJ5IGJsZW5kIHNoYXBlIGdyb3Vwcy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgICBjb250cm9sbGVyLmNsZWFyQXBwbGllZFdlaWdodCgpO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgICBjb250cm9sbGVyLmFwcGx5V2VpZ2h0KCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IEdMVEZTY2hlbWEsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eSB9IGZyb20gJy4uL3V0aWxzL3JlbmFtZU1hdGVyaWFsUHJvcGVydHknO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUdyb3VwIH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlR3JvdXAnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlUHJveHknO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNQmxlbmRTaGFwZV1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUJsZW5kU2hhcGVJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUJsZW5kU2hhcGVdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNQmxlbmRTaGFwZVByb3h5IHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlOiBWUk1TY2hlbWEuQmxlbmRTaGFwZSB8IHVuZGVmaW5lZCA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZSA9IG5ldyBWUk1CbGVuZFNoYXBlUHJveHkoKTtcblxuICAgIGNvbnN0IGJsZW5kU2hhcGVHcm91cHM6IFZSTVNjaGVtYS5CbGVuZFNoYXBlR3JvdXBbXSB8IHVuZGVmaW5lZCA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIWJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBibGVuZFNoYXBlO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVQcmVzZXRNYXA6IHsgW3ByZXNldE5hbWUgaW4gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9ID0ge307XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gc2NoZW1hR3JvdXAubmFtZTtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJNQmxlbmRTaGFwZUltcG9ydGVyOiBPbmUgb2YgYmxlbmRTaGFwZUdyb3VwcyBoYXMgbm8gbmFtZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcmVzZXROYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzY2hlbWFHcm91cC5wcmVzZXROYW1lICYmXG4gICAgICAgICAgc2NoZW1hR3JvdXAucHJlc2V0TmFtZSAhPT0gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLlVua25vd24gJiZcbiAgICAgICAgICAhYmxlbmRTaGFwZVByZXNldE1hcFtzY2hlbWFHcm91cC5wcmVzZXROYW1lXVxuICAgICAgICApIHtcbiAgICAgICAgICBwcmVzZXROYW1lID0gc2NoZW1hR3JvdXAucHJlc2V0TmFtZTtcbiAgICAgICAgICBibGVuZFNoYXBlUHJlc2V0TWFwW3NjaGVtYUdyb3VwLnByZXNldE5hbWVdID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFZSTUJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZ3JvdXApO1xuXG4gICAgICAgIGdyb3VwLmlzQmluYXJ5ID0gc2NoZW1hR3JvdXAuaXNCaW5hcnkgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKHNjaGVtYUdyb3VwLmJpbmRzKSB7XG4gICAgICAgICAgc2NoZW1hR3JvdXAuYmluZHMuZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmQubWVzaCA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVzVXNpbmdNZXNoOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgKGdsdGYucGFyc2VyLmpzb24ubm9kZXMgYXMgR0xURlNjaGVtYS5Ob2RlW10pLmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUubWVzaCA9PT0gYmluZC5tZXNoKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gucHVzaChpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gubWFwKGFzeW5jIChub2RlSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gKGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlKGdsdGYsIG5vZGVJbmRleCkpITtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBtZXNoIGhhcyB0aGUgdGFyZ2V0IG1vcnBoIHRhcmdldFxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICFwcmltaXRpdmVzLmV2ZXJ5KFxuICAgICAgICAgICAgICAgICAgICAocHJpbWl0aXZlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcykgJiZcbiAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4IDwgcHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgIGBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI6ICR7c2NoZW1hR3JvdXAubmFtZX0gYXR0ZW1wdHMgdG8gaW5kZXggJHttb3JwaFRhcmdldEluZGV4fXRoIG1vcnBoIGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZ3JvdXAuYWRkQmluZCh7XG4gICAgICAgICAgICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgd2VpZ2h0OiBiaW5kLndlaWdodCA/PyAxMDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsVmFsdWVzID0gc2NoZW1hR3JvdXAubWF0ZXJpYWxWYWx1ZXM7XG4gICAgICAgIGlmIChtYXRlcmlhbFZhbHVlcykge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbFtdIHwgVEhSRUUuTWF0ZXJpYWwgPSAob2JqZWN0IGFzIGFueSkubWF0ZXJpYWw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgLi4ubWF0ZXJpYWwuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgIChtdGwpID0+IG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgJiYgbWF0ZXJpYWxzLmluZGV4T2YobXRsKSA9PT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgJiYgbWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBncm91cC5hZGRNYXRlcmlhbFZhbHVlKHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHJlbmFtZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUhKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBibGVuZFNoYXBlLnJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKG5hbWUsIHByZXNldE5hbWUsIGdyb3VwKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gYmxlbmRTaGFwZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURk5vZGUsIEdMVEZQcmltaXRpdmUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5cbmNvbnN0IFZFQ1RPUjNfRlJPTlQgPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAtMS4wKSk7XG5cbmNvbnN0IF9xdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuZW51bSBGaXJzdFBlcnNvbkZsYWcge1xuICBBdXRvLFxuICBCb3RoLFxuICBUaGlyZFBlcnNvbk9ubHksXG4gIEZpcnN0UGVyc29uT25seSxcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgW2BtZXNoQW5ub3RhdGlvbmBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8wLjAvc2NoZW1hL3ZybS5maXJzdHBlcnNvbi5tZXNoYW5ub3RhdGlvbi5zY2hlbWEuanNvbikgZW50cnkuXG4gKiBFYWNoIG1lc2ggd2lsbCBiZSBhc3NpZ25lZCB0byBzcGVjaWZpZWQgbGF5ZXIgd2hlbiB5b3UgY2FsbCBbW1ZSTUZpcnN0UGVyc29uLnNldHVwXV0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3Mge1xuICBwcml2YXRlIHN0YXRpYyBfcGFyc2VGaXJzdFBlcnNvbkZsYWcoZmlyc3RQZXJzb25GbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBGaXJzdFBlcnNvbkZsYWcge1xuICAgIHN3aXRjaCAoZmlyc3RQZXJzb25GbGFnKSB7XG4gICAgICBjYXNlICdCb3RoJzpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5Cb3RoO1xuICAgICAgY2FzZSAnVGhpcmRQZXJzb25Pbmx5JzpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5UaGlyZFBlcnNvbk9ubHk7XG4gICAgICBjYXNlICdGaXJzdFBlcnNvbk9ubHknOlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkZpcnN0UGVyc29uT25seTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuQXV0bztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBbW0ZpcnN0UGVyc29uRmxhZ11dIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgcHVibGljIGZpcnN0UGVyc29uRmxhZzogRmlyc3RQZXJzb25GbGFnO1xuXG4gIC8qKlxuICAgKiBBIG1lc2ggcHJpbWl0aXZlcyBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIHB1YmxpYyBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtZXNoIGFubm90YXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvbkZsYWcgQSBbW0ZpcnN0UGVyc29uRmxhZ11dIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5XG4gICAqIEBwYXJhbSBub2RlIEEgbm9kZSBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGZpcnN0UGVyc29uRmxhZzogc3RyaW5nIHwgdW5kZWZpbmVkLCBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10pIHtcbiAgICB0aGlzLmZpcnN0UGVyc29uRmxhZyA9IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncy5fcGFyc2VGaXJzdFBlcnNvbkZsYWcoZmlyc3RQZXJzb25GbGFnKTtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbiB7XG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldEZpcnN0UGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldFRoaXJkUGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9maXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoQW5ub3RhdGlvbnM6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpcnN0UGVyc29uQm9uZU9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XG4gIHByaXZhdGUgX3RoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUjtcblxuICBwcml2YXRlIF9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRmlyc3RQZXJzb24gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb25Cb25lIEEgZmlyc3QgcGVyc29uIGJvbmVcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uQm9uZU9mZnNldCBBbiBvZmZzZXQgZnJvbSB0aGUgc3BlY2lmaWVkIGZpcnN0IHBlcnNvbiBib25lXG4gICAqIEBwYXJhbSBtZXNoQW5ub3RhdGlvbnMgQSByZW5kZXJlciBzZXR0aW5ncy4gU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiBbW1JlbmRlcmVyRmlyc3RQZXJzb25GbGFnc11dIGZvciBtb3JlIGluZm9cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGZpcnN0UGVyc29uQm9uZTogR0xURk5vZGUsXG4gICAgZmlyc3RQZXJzb25Cb25lT2Zmc2V0OiBUSFJFRS5WZWN0b3IzLFxuICAgIG1lc2hBbm5vdGF0aW9uczogVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzW10sXG4gICkge1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uQm9uZSA9IGZpcnN0UGVyc29uQm9uZTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQgPSBmaXJzdFBlcnNvbkJvbmVPZmZzZXQ7XG4gICAgdGhpcy5fbWVzaEFubm90YXRpb25zID0gbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbkJvbmUoKTogR0xURk5vZGUge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbkJvbmU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lc2hBbm5vdGF0aW9ucygpOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbldvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0YXJnZXQuY29weShWRUNUT1IzX0ZST05UKS5hcHBseVF1YXRlcm5pb24oZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLl9maXJzdFBlcnNvbkJvbmUsIF9xdWF0KSk7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCBbW3NldHVwXV0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMgW1tERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVJdXSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEgW1tzZXR1cF1dIGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIFtbc2V0dXBdXSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyBbW0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUl1dIGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSBbW3NldHVwXV0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgcHVibGljIGdldEZpcnN0UGVyc29uQm9uZU9mZnNldCh0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcGVyc29uLlxuICAgKiBUaGUgcG9zaXRpb24gdGFrZXMgW1tGaXJzdFBlcnNvbkJvbmVdXSBhbmQgW1tGaXJzdFBlcnNvbk9mZnNldF1dIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogQHBhcmFtIHYzIHRhcmdldFxuICAgKiBAcmV0dXJucyBDdXJyZW50IHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwZXJzb25cbiAgICovXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24odjM6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICAvLyBVbmlWUk0jVlJNRmlyc3RQZXJzb25FZGl0b3JcbiAgICAvLyB2YXIgd29ybGRPZmZzZXQgPSBoZWFkLmxvY2FsVG9Xb3JsZE1hdHJpeC5NdWx0aXBseVBvaW50KGNvbXBvbmVudC5GaXJzdFBlcnNvbk9mZnNldCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xuICAgIGNvbnN0IHY0ID0gbmV3IFRIUkVFLlZlY3RvcjQob2Zmc2V0LngsIG9mZnNldC55LCBvZmZzZXQueiwgMS4wKTtcbiAgICB2NC5hcHBseU1hdHJpeDQodGhpcy5fZmlyc3RQZXJzb25Cb25lLm1hdHJpeFdvcmxkKTtcbiAgICByZXR1cm4gdjMuc2V0KHY0LngsIHY0LnksIHY0LnopO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcykgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSLFxuICAgIHRoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUixcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLl9tZXNoQW5ub3RhdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuRmlyc3RQZXJzb25Pbmx5KSB7XG4gICAgICAgIGl0ZW0ucHJpbWl0aXZlcy5mb3JFYWNoKChwcmltaXRpdmUpID0+IHtcbiAgICAgICAgICBwcmltaXRpdmUubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLlRoaXJkUGVyc29uT25seSkge1xuICAgICAgICBpdGVtLnByaW1pdGl2ZXMuZm9yRWFjaCgocHJpbWl0aXZlKSA9PiB7XG4gICAgICAgICAgcHJpbWl0aXZlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5BdXRvKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWwoaXRlbS5wcmltaXRpdmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goXG4gICAgc3JjOiBUSFJFRS5Ta2lubmVkTWVzaDxUSFJFRS5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWF0ZXJpYWwgfCBUSFJFRS5NYXRlcmlhbFtdPixcbiAgICBlcmFzaW5nQm9uZXNJbmRleDogbnVtYmVyW10sXG4gICk6IFRIUkVFLlNraW5uZWRNZXNoIHtcbiAgICBjb25zdCBkc3QgPSBuZXcgVEhSRUUuU2tpbm5lZE1lc2goc3JjLmdlb21ldHJ5LmNsb25lKCksIHNyYy5tYXRlcmlhbCk7XG4gICAgZHN0Lm5hbWUgPSBgJHtzcmMubmFtZX0oZXJhc2UpYDtcbiAgICBkc3QuZnJ1c3R1bUN1bGxlZCA9IHNyYy5mcnVzdHVtQ3VsbGVkO1xuICAgIGRzdC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gZHN0Lmdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4JykuYXJyYXk7XG4gICAgY29uc3Qgc2tpbkluZGV4ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luSW5kZXgucHVzaChbc2tpbkluZGV4QXR0cltpXSwgc2tpbkluZGV4QXR0cltpICsgMV0sIHNraW5JbmRleEF0dHJbaSArIDJdLCBza2luSW5kZXhBdHRyW2kgKyAzXV0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0JykuYXJyYXk7XG4gICAgY29uc3Qgc2tpbldlaWdodCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbldlaWdodEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5XZWlnaHQucHVzaChbc2tpbldlaWdodEF0dHJbaV0sIHNraW5XZWlnaHRBdHRyW2kgKyAxXSwgc2tpbldlaWdodEF0dHJbaSArIDJdLCBza2luV2VpZ2h0QXR0cltpICsgM11dKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGV4KCk7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGdlb21ldHJ5IGRvZXNuJ3QgaGF2ZSBhbiBpbmRleCBidWZmZXJcIik7XG4gICAgfVxuICAgIGNvbnN0IG9sZFRyaWFuZ2xlcyA9IEFycmF5LmZyb20oaW5kZXguYXJyYXkpO1xuXG4gICAgY29uc3QgY291bnQgPSB0aGlzLl9leGNsdWRlVHJpYW5nbGVzKG9sZFRyaWFuZ2xlcywgc2tpbldlaWdodCwgc2tpbkluZGV4LCBlcmFzaW5nQm9uZXNJbmRleCk7XG4gICAgY29uc3QgbmV3VHJpYW5nbGU6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBuZXdUcmlhbmdsZVtpXSA9IG9sZFRyaWFuZ2xlc1tpXTtcbiAgICB9XG4gICAgZ2VvbWV0cnkuc2V0SW5kZXgobmV3VHJpYW5nbGUpO1xuXG4gICAgLy8gbXRvb24gbWF0ZXJpYWwgaW5jbHVkZXMgb25CZWZvcmVSZW5kZXIuIHRoaXMgaXMgdW5zdXBwb3J0ZWQgYXQgU2tpbm5lZE1lc2gjY2xvbmVcbiAgICBpZiAoc3JjLm9uQmVmb3JlUmVuZGVyKSB7XG4gICAgICBkc3Qub25CZWZvcmVSZW5kZXIgPSBzcmMub25CZWZvcmVSZW5kZXI7XG4gICAgfVxuICAgIGRzdC5iaW5kKG5ldyBUSFJFRS5Ta2VsZXRvbihzcmMuc2tlbGV0b24uYm9uZXMsIHNyYy5za2VsZXRvbi5ib25lSW52ZXJzZXMpLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKFxuICAgIHBhcmVudDogVEhSRUUuT2JqZWN0M0QsXG4gICAgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2g8VEhSRUUuQnVmZmVyR2VvbWV0cnksIFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuTWF0ZXJpYWxbXT4sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGVyYXNlQm9uZUluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgbWVzaC5za2VsZXRvbi5ib25lcy5mb3JFYWNoKChib25lLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZSkpIGVyYXNlQm9uZUluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICAvLyBVbmxpa2UgVW5pVlJNIHdlIGRvbid0IGNvcHkgbWVzaCBpZiBubyBpbnZpc2libGUgYm9uZSB3YXMgZm91bmRcbiAgICBpZiAoIWVyYXNlQm9uZUluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICBjb25zdCBuZXdNZXNoID0gdGhpcy5fY3JlYXRlRXJhc2VkTWVzaChtZXNoLCBlcmFzZUJvbmVJbmRleGVzKTtcbiAgICBwYXJlbnQuYWRkKG5ld01lc2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbChwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10pOiB2b2lkIHtcbiAgICBwcmltaXRpdmVzLmZvckVhY2goKHByaW1pdGl2ZSkgPT4ge1xuICAgICAgaWYgKHByaW1pdGl2ZS50eXBlID09PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gcHJpbWl0aXZlIGFzIFRIUkVFLlNraW5uZWRNZXNoPFRIUkVFLkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLk1hdGVyaWFsW10+O1xuICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2goc2tpbm5lZE1lc2gucGFyZW50ISwgc2tpbm5lZE1lc2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQocHJpbWl0aXZlKSkge1xuICAgICAgICAgIHByaW1pdGl2ZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0IGp1c3QgY2hlY2tzIHdoZXRoZXIgdGhlIG5vZGUgb3IgaXRzIHBhcmVudCBpcyB0aGUgZmlyc3QgcGVyc29uIGJvbmUgb3Igbm90LlxuICAgKiBAcGFyYW0gYm9uZSBUaGUgdGFyZ2V0IGJvbmVcbiAgICovXG4gIHByaXZhdGUgX2lzRXJhc2VUYXJnZXQoYm9uZTogR0xURk5vZGUpOiBib29sZWFuIHtcbiAgICBpZiAoYm9uZSA9PT0gdGhpcy5fZmlyc3RQZXJzb25Cb25lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFib25lLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNFcmFzZVRhcmdldChib25lLnBhcmVudCEpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBHTFRGTm9kZSwgR0xURlNjaGVtYSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24sIFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb24nO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNRmlyc3RQZXJzb25dXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbkltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNRmlyc3RQZXJzb25dXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGh1bWFub2lkIEEgW1tWUk1IdW1hbm9pZF1dIGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWUk1TY2hlbWEuRmlyc3RQZXJzb24gfCB1bmRlZmluZWQgPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQZXJzb25Cb25lSW5kZXggPSBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmU7XG5cbiAgICBsZXQgZmlyc3RQZXJzb25Cb25lOiBHTFRGTm9kZSB8IG51bGw7XG4gICAgaWYgKGZpcnN0UGVyc29uQm9uZUluZGV4ID09PSB1bmRlZmluZWQgfHwgZmlyc3RQZXJzb25Cb25lSW5kZXggPT09IC0xKSB7XG4gICAgICBmaXJzdFBlcnNvbkJvbmUgPSBodW1hbm9pZC5nZXRCb25lTm9kZShWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZS5IZWFkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQZXJzb25Cb25lID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGZpcnN0UGVyc29uQm9uZUluZGV4KTtcbiAgICB9XG5cbiAgICBpZiAoIWZpcnN0UGVyc29uQm9uZSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1GaXJzdFBlcnNvbkltcG9ydGVyOiBDb3VsZCBub3QgZmluZCBmaXJzdFBlcnNvbkJvbmUgb2YgdGhlIFZSTScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQZXJzb25Cb25lT2Zmc2V0ID0gc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0XG4gICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKFxuICAgICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC54LFxuICAgICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC55LFxuICAgICAgICAgIC1zY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueiEsIC8vIFZSTSAwLjAgdXNlcyBsZWZ0LWhhbmRlZCB5LXVwXG4gICAgICAgIClcbiAgICAgIDogbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjA2LCAwLjApOyAvLyBmYWxsYmFjaywgdGFrZW4gZnJvbSBVbmlWUk0gaW1wbGVtZW50YXRpb25cblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzW10gPSBbXTtcbiAgICBjb25zdCBub2RlUHJpbWl0aXZlc01hcCA9IGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmKTtcblxuICAgIEFycmF5LmZyb20obm9kZVByaW1pdGl2ZXNNYXAuZW50cmllcygpKS5mb3JFYWNoKChbbm9kZUluZGV4LCBwcmltaXRpdmVzXSkgPT4ge1xuICAgICAgY29uc3Qgc2NoZW1hTm9kZTogR0xURlNjaGVtYS5Ob2RlID0gZ2x0Zi5wYXJzZXIuanNvbi5ub2Rlc1tub2RlSW5kZXhdO1xuXG4gICAgICBjb25zdCBmbGFnID0gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zXG4gICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoKGEpID0+IGEubWVzaCA9PT0gc2NoZW1hTm9kZS5tZXNoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKG5ldyBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MoZmxhZz8uZmlyc3RQZXJzb25GbGFnLCBwcmltaXRpdmVzKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKGZpcnN0UGVyc29uQm9uZSwgZmlyc3RQZXJzb25Cb25lT2Zmc2V0LCBtZXNoQW5ub3RhdGlvbnMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTFRGTm9kZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUh1bWFuTGltaXQgfSBmcm9tICcuL1ZSTUh1bWFuTGltaXQnO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBgaHVtYW5Cb25lYCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFuQm9uZSB7XG4gIC8qKlxuICAgKiBBIFtbR0xURk5vZGVdXSAodGhhdCBhY3R1YWxseSBpcyBhIGBUSFJFRS5PYmplY3QzRGApIHRoYXQgcmVwcmVzZW50cyB0aGUgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBub2RlOiBHTFRGTm9kZTtcblxuICAvKipcbiAgICogQSBbW1ZSTUh1bWFuTGltaXRdXSBvYmplY3QgdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5MaW1pdDogVlJNSHVtYW5MaW1pdDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUh1bWFuQm9uZS5cbiAgICpcbiAgICogQHBhcmFtIG5vZGUgQSBbW0dMVEZOb2RlXV0gdGhhdCByZXByZXNlbnRzIHRoZSBuZXcgYm9uZVxuICAgKiBAcGFyYW0gaHVtYW5MaW1pdCBBIFtbVlJNSHVtYW5MaW1pdF1dIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgbmV3IGJvbmVcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihub2RlOiBHTFRGTm9kZSwgaHVtYW5MaW1pdDogVlJNSHVtYW5MaW1pdCkge1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgdGhpcy5odW1hbkxpbWl0ID0gaHVtYW5MaW1pdDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGTm9kZSwgUmF3VmVjdG9yMywgUmF3VmVjdG9yNCwgVlJNUG9zZSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lQXJyYXkgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUFycmF5JztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5EZXNjcmlwdGlvbiB9IGZyb20gJy4vVlJNSHVtYW5EZXNjcmlwdGlvbic7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgaHVtYW5vaWQgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZCB7XG4gIC8qKlxuICAgKiBBIFtbVlJNSHVtYW5Cb25lc11dIHRoYXQgY29udGFpbnMgYWxsIHRoZSBodW1hbiBib25lcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBnZXQgdGhlc2UgYm9uZXMgdXNpbmcgW1tWUk1IdW1hbm9pZC5nZXRCb25lXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcztcblxuICAvKipcbiAgICogQSBbW1ZSTUh1bWFuRGVzY3JpcHRpb25dXSB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgaHVtYW5vaWQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5EZXNjcmlwdGlvbjogVlJNSHVtYW5EZXNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQSBbW1ZSTVBvc2VdXSB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIGBzZXRQb3NlYCBhbmQgYGdldFBvc2VgLCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSByZXN0UG9zZTogVlJNUG9zZSA9IHt9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgW1tWUk1IdW1hbm9pZF1dLlxuICAgKiBAcGFyYW0gYm9uZUFycmF5IEEgW1tWUk1IdW1hbkJvbmVBcnJheV1dIGNvbnRhaW5zIGFsbCB0aGUgYm9uZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKiBAcGFyYW0gaHVtYW5EZXNjcmlwdGlvbiBBIFtbVlJNSHVtYW5EZXNjcmlwdGlvbl1dIHRoYXQgcmVwcmVzZW50cyBwcm9wZXJ0aWVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihib25lQXJyYXk6IFZSTUh1bWFuQm9uZUFycmF5LCBodW1hbkRlc2NyaXB0aW9uOiBWUk1IdW1hbkRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy5odW1hbkJvbmVzID0gdGhpcy5fY3JlYXRlSHVtYW5Cb25lcyhib25lQXJyYXkpO1xuICAgIHRoaXMuaHVtYW5EZXNjcmlwdGlvbiA9IGh1bWFuRGVzY3JpcHRpb247XG5cbiAgICB0aGlzLnJlc3RQb3NlID0gdGhpcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIFtbVlJNUG9zZV1dLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2U6IFZSTVBvc2UgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKHZybUJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZSh2cm1Cb25lTmFtZSBhcyBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSkhO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gdGhlcmUgYXJlIHR3byBvciBtb3JlIGJvbmVzIGluIGEgc2FtZSBuYW1lLCB3ZSBhcmUgbm90IGdvaW5nIHRvIG92ZXJ3cml0ZSBleGlzdGluZyBvbmVcbiAgICAgIGlmIChwb3NlW3ZybUJvbmVOYW1lXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRha2UgYSBkaWZmIGZyb20gcmVzdFBvc2VcbiAgICAgIC8vIG5vdGUgdGhhdCByZXN0UG9zZSBhbHNvIHdpbGwgdXNlIGdldFBvc2UgdG8gaW5pdGlhbGl6ZSBpdHNlbGZcbiAgICAgIF92M0Euc2V0KDAsIDAsIDApO1xuICAgICAgX3F1YXRBLmlkZW50aXR5KCk7XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbdnJtQm9uZU5hbWVdO1xuICAgICAgaWYgKHJlc3RTdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN0U3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIHF1YXRJbnZlcnRDb21wYXQoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuYWRkKG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLnByZW11bHRpcGx5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIHBvc2VbdnJtQm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgUmF3VmVjdG9yMyxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgUmF3VmVjdG9yNCxcbiAgICAgIH07XG4gICAgfSwge30gYXMgVlJNUG9zZSk7XG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBodW1hbm9pZCBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIFtbVlJNUG9zZV1dIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXMocG9zZU9iamVjdCkuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gcG9zZU9iamVjdFtib25lTmFtZV0hO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUgYXMgVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSB0aGF0IGlzIGRlZmluZWQgaW4gdGhlIHBvc2Ugb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmICghcmVzdFN0YXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICBpZiAocmVzdFN0YXRlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgbm9kZS5wb3NpdGlvbi5hZGQoX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkoc3RhdGUucm90YXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2Uoe30pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGJvbmUgYm91bmQgdG8gYSBzcGVjaWZpZWQgW1tIdW1hbkJvbmVdXSwgYXMgYSBbW1ZSTUh1bWFuQm9uZV1dLlxuICAgKlxuICAgKiBTZWUgYWxzbzogW1tWUk1IdW1hbm9pZC5nZXRCb25lc11dXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lKG5hbWU6IFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdWzBdIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYm9uZXMgYm91bmQgdG8gYSBzcGVjaWZpZWQgW1tIdW1hbkJvbmVdXSwgYXMgYW4gYXJyYXkgb2YgW1tWUk1IdW1hbkJvbmVdXS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZV1dXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lcyhuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IFZSTUh1bWFuQm9uZVtdIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGJvbmUgYm91bmQgdG8gYSBzcGVjaWZpZWQgW1tIdW1hbkJvbmVdXSwgYXMgYSBUSFJFRS5PYmplY3QzRC5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZU5vZGVzXV1cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTogR0xURk5vZGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdWzBdPy5ub2RlID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGJvbmVzIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGFuIGFycmF5IG9mIFRIUkVFLk9iamVjdDNELlxuICAgKlxuICAgKiBTZWUgYWxzbzogW1tWUk1IdW1hbm9pZC5nZXRCb25lTm9kZV1dXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZXMobmFtZTogVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpOiBHTFRGTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdLm1hcCgoYm9uZSkgPT4gYm9uZS5ub2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIGEgW1tWUk1IdW1hbkJvbmVzXV0gZnJvbSBhIFtbVlJNSHVtYW5Cb25lQXJyYXldXS5cbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZUh1bWFuQm9uZXMoYm9uZUFycmF5OiBWUk1IdW1hbkJvbmVBcnJheSk6IFZSTUh1bWFuQm9uZXMge1xuICAgIGNvbnN0IGJvbmVzOiBWUk1IdW1hbkJvbmVzID0gT2JqZWN0LnZhbHVlcyhWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSkucmVkdWNlKChhY2N1bSwgbmFtZSkgPT4ge1xuICAgICAgYWNjdW1bbmFtZV0gPSBbXTtcbiAgICAgIHJldHVybiBhY2N1bTtcbiAgICB9LCB7fSBhcyBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+KSBhcyBWUk1IdW1hbkJvbmVzO1xuXG4gICAgYm9uZUFycmF5LmZvckVhY2goKGJvbmUpID0+IHtcbiAgICAgIGJvbmVzW2JvbmUubmFtZV0ucHVzaChib25lLmJvbmUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvbmVzO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVBcnJheSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lQXJyYXknO1xuaW1wb3J0IHsgVlJNSHVtYW5EZXNjcmlwdGlvbiB9IGZyb20gJy4vVlJNSHVtYW5EZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vVlJNSHVtYW5vaWQnO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNSHVtYW5vaWRdXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZEltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNSHVtYW5vaWRdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUh1bWFub2lkOiBWUk1TY2hlbWEuSHVtYW5vaWQgfCB1bmRlZmluZWQgPSB2cm1FeHQuaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5Cb25lQXJyYXk6IFZSTUh1bWFuQm9uZUFycmF5ID0gW107XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzLm1hcChhc3luYyAoYm9uZSkgPT4ge1xuICAgICAgICAgIGlmICghYm9uZS5ib25lIHx8IGJvbmUubm9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBib25lLm5vZGUpO1xuICAgICAgICAgIGh1bWFuQm9uZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogYm9uZS5ib25lLFxuICAgICAgICAgICAgYm9uZTogbmV3IFZSTUh1bWFuQm9uZShub2RlLCB7XG4gICAgICAgICAgICAgIGF4aXNMZW5ndGg6IGJvbmUuYXhpc0xlbmd0aCxcbiAgICAgICAgICAgICAgY2VudGVyOiBib25lLmNlbnRlciAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLmNlbnRlci54LCBib25lLmNlbnRlci55LCBib25lLmNlbnRlci56KSxcbiAgICAgICAgICAgICAgbWF4OiBib25lLm1heCAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLm1heC54LCBib25lLm1heC55LCBib25lLm1heC56KSxcbiAgICAgICAgICAgICAgbWluOiBib25lLm1pbiAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLm1pbi54LCBib25lLm1pbi55LCBib25lLm1pbi56KSxcbiAgICAgICAgICAgICAgdXNlRGVmYXVsdFZhbHVlczogYm9uZS51c2VEZWZhdWx0VmFsdWVzLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbkRlc2NyaXB0aW9uOiBWUk1IdW1hbkRlc2NyaXB0aW9uID0ge1xuICAgICAgYXJtU3RyZXRjaDogc2NoZW1hSHVtYW5vaWQuYXJtU3RyZXRjaCxcbiAgICAgIGxlZ1N0cmV0Y2g6IHNjaGVtYUh1bWFub2lkLmxlZ1N0cmV0Y2gsXG4gICAgICB1cHBlckFybVR3aXN0OiBzY2hlbWFIdW1hbm9pZC51cHBlckFybVR3aXN0LFxuICAgICAgbG93ZXJBcm1Ud2lzdDogc2NoZW1hSHVtYW5vaWQubG93ZXJBcm1Ud2lzdCxcbiAgICAgIHVwcGVyTGVnVHdpc3Q6IHNjaGVtYUh1bWFub2lkLnVwcGVyTGVnVHdpc3QsXG4gICAgICBsb3dlckxlZ1R3aXN0OiBzY2hlbWFIdW1hbm9pZC5sb3dlckxlZ1R3aXN0LFxuICAgICAgZmVldFNwYWNpbmc6IHNjaGVtYUh1bWFub2lkLmZlZXRTcGFjaW5nLFxuICAgICAgaGFzVHJhbnNsYXRpb25Eb0Y6IHNjaGVtYUh1bWFub2lkLmhhc1RyYW5zbGF0aW9uRG9GLFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFZSTUh1bWFub2lkKGh1bWFuQm9uZUFycmF5LCBodW1hbkRlc2NyaXB0aW9uKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBFdmFsdWF0ZSBhIGhlcm1pdGUgc3BsaW5lLlxuICpcbiAqIEBwYXJhbSB5MCB5IG9uIHN0YXJ0XG4gKiBAcGFyYW0geTEgeSBvbiBlbmRcbiAqIEBwYXJhbSB0MCBkZWx0YSB5IG9uIHN0YXJ0XG4gKiBAcGFyYW0gdDEgZGVsdGEgeSBvbiBlbmRcbiAqIEBwYXJhbSB4IGlucHV0IHZhbHVlXG4gKi9cbmNvbnN0IGhlcm1pdGVTcGxpbmUgPSAoeTA6IG51bWJlciwgeTE6IG51bWJlciwgdDA6IG51bWJlciwgdDE6IG51bWJlciwgeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgeGMgPSB4ICogeCAqIHg7XG4gIGNvbnN0IHhzID0geCAqIHg7XG4gIGNvbnN0IGR5ID0geTEgLSB5MDtcbiAgY29uc3QgaDAxID0gLTIuMCAqIHhjICsgMy4wICogeHM7XG4gIGNvbnN0IGgxMCA9IHhjIC0gMi4wICogeHMgKyB4O1xuICBjb25zdCBoMTEgPSB4YyAtIHhzO1xuICByZXR1cm4geTAgKyBkeSAqIGgwMSArIHQwICogaDEwICsgdDEgKiBoMTE7XG59O1xuXG4vKipcbiAqIEV2YWx1YXRlIGFuIEFuaW1hdGlvbkN1cnZlIGFycmF5LiBTZWUgQW5pbWF0aW9uQ3VydmUgY2xhc3Mgb2YgVW5pdHkgZm9yIGl0cyBkZXRhaWxzLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kb2NzLnVuaXR5M2QuY29tL2phL2N1cnJlbnQvU2NyaXB0UmVmZXJlbmNlL0FuaW1hdGlvbkN1cnZlLmh0bWxcbiAqXG4gKiBAcGFyYW0gYXJyIEFuIGFycmF5IHJlcHJlc2VudHMgYSBjdXJ2ZVxuICogQHBhcmFtIHggQW4gaW5wdXQgdmFsdWVcbiAqL1xuY29uc3QgZXZhbHVhdGVDdXJ2ZSA9IChhcnI6IG51bWJlcltdLCB4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAvLyAtLSBzYW5pdHkgY2hlY2sgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgaWYgKGFyci5sZW5ndGggPCA4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdldmFsdWF0ZUN1cnZlOiBJbnZhbGlkIGN1cnZlIGRldGVjdGVkISAoQXJyYXkgbGVuZ3RoIG11c3QgYmUgOCBhdCBsZWFzdCknKTtcbiAgfVxuICBpZiAoYXJyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2YWx1YXRlQ3VydmU6IEludmFsaWQgY3VydmUgZGV0ZWN0ZWQhIChBcnJheSBsZW5ndGggbXVzdCBiZSBtdWx0aXBsZXMgb2YgNCcpO1xuICB9XG5cbiAgLy8gLS0gY2hlY2sgcmFuZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGxldCBvdXROb2RlO1xuICBmb3IgKG91dE5vZGUgPSAwOyA7IG91dE5vZGUrKykge1xuICAgIGlmIChhcnIubGVuZ3RoIDw9IDQgKiBvdXROb2RlKSB7XG4gICAgICByZXR1cm4gYXJyWzQgKiBvdXROb2RlIC0gM107IC8vIHRvbyBmdXJ0aGVyISEgYXNzdW1lIGFzIFwiQ2xhbXBcIlxuICAgIH0gZWxzZSBpZiAoeCA8PSBhcnJbNCAqIG91dE5vZGVdKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBpbk5vZGUgPSBvdXROb2RlIC0gMTtcbiAgaWYgKGluTm9kZSA8IDApIHtcbiAgICByZXR1cm4gYXJyWzQgKiBpbk5vZGUgKyA1XTsgLy8gdG9vIGJlaGluZCEhIGFzc3VtZSBhcyBcIkNsYW1wXCJcbiAgfVxuXG4gIC8vIC0tIGNhbGN1bGF0ZSBsb2NhbCB4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCB4MCA9IGFycls0ICogaW5Ob2RlXTtcbiAgY29uc3QgeDEgPSBhcnJbNCAqIG91dE5vZGVdO1xuICBjb25zdCB4SGVybWl0ZSA9ICh4IC0geDApIC8gKHgxIC0geDApO1xuXG4gIC8vIC0tIGZpbmFsbHkgZG8gdGhlIGhlcm1pdGUgc3BsaW5lIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCB5MCA9IGFycls0ICogaW5Ob2RlICsgMV07XG4gIGNvbnN0IHkxID0gYXJyWzQgKiBvdXROb2RlICsgMV07XG4gIGNvbnN0IHQwID0gYXJyWzQgKiBpbk5vZGUgKyAzXTtcbiAgY29uc3QgdDEgPSBhcnJbNCAqIG91dE5vZGUgKyAyXTtcbiAgcmV0dXJuIGhlcm1pdGVTcGxpbmUoeTAsIHkxLCB0MCwgdDEsIHhIZXJtaXRlKTtcbn07XG5cbi8qKlxuICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIEN1cnZlTWFwcGVyIGNsYXNzIGRlZmluZWQgaW4gVW5pVlJNLlxuICogV2lsbCBiZSB1c2VkIGZvciBbW1ZSTUxvb2tBdEFwcGx5ZXJdXXMsIHRvIGRlZmluZSBiZWhhdmlvciBvZiBMb29rQXQuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvTG9va0F0L0N1cnZlTWFwcGVyLmNzXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1DdXJ2ZU1hcHBlciB7XG4gIC8qKlxuICAgKiBBbiBhcnJheSByZXByZXNlbnRzIHRoZSBjdXJ2ZS4gU2VlIEFuaW1hdGlvbkN1cnZlIGNsYXNzIG9mIFVuaXR5IGZvciBpdHMgZGV0YWlscy5cbiAgICpcbiAgICogU2VlOiBodHRwczovL2RvY3MudW5pdHkzZC5jb20vamEvY3VycmVudC9TY3JpcHRSZWZlcmVuY2UvQW5pbWF0aW9uQ3VydmUuaHRtbFxuICAgKi9cbiAgcHVibGljIGN1cnZlOiBudW1iZXJbXSA9IFswLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMF07XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGlucHV0IHJhbmdlIG9mIHRoZSBbW1ZSTUN1cnZlTWFwcGVyXV0uXG4gICAqL1xuICBwdWJsaWMgY3VydmVYUmFuZ2VEZWdyZWUgPSA5MC4wO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBvdXRwdXQgdmFsdWUgb2YgdGhlIFtbVlJNQ3VydmVNYXBwZXJdXS5cbiAgICovXG4gIHB1YmxpYyBjdXJ2ZVlSYW5nZURlZ3JlZSA9IDEwLjA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBbW1ZSTUN1cnZlTWFwcGVyXV0uXG4gICAqXG4gICAqIEBwYXJhbSB4UmFuZ2UgVGhlIG1heGltdW0gaW5wdXQgcmFuZ2VcbiAgICogQHBhcmFtIHlSYW5nZSBUaGUgbWF4aW11bSBvdXRwdXQgdmFsdWVcbiAgICogQHBhcmFtIGN1cnZlIEFuIGFycmF5IHJlcHJlc2VudHMgdGhlIGN1cnZlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4UmFuZ2U/OiBudW1iZXIsIHlSYW5nZT86IG51bWJlciwgY3VydmU/OiBudW1iZXJbXSkge1xuICAgIGlmICh4UmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZSA9IHhSYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoeVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3VydmVZUmFuZ2VEZWdyZWUgPSB5UmFuZ2U7XG4gICAgfVxuXG4gICAgaWYgKGN1cnZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3VydmUgPSBjdXJ2ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsYW1wZWRTcmMgPSBNYXRoLm1pbihNYXRoLm1heChzcmMsIDAuMCksIHRoaXMuY3VydmVYUmFuZ2VEZWdyZWUpO1xuICAgIGNvbnN0IHggPSBjbGFtcGVkU3JjIC8gdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZTtcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZVlSYW5nZURlZ3JlZSAqIGV2YWx1YXRlQ3VydmUodGhpcy5jdXJ2ZSwgeCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgYnkgW1tWUk1Mb29rQXRIZWFkXV0sIGFwcGxpZXMgbG9vayBhdCBkaXJlY3Rpb24uXG4gKiBUaGVyZSBhcmUgY3VycmVudGx5IHR3byB2YXJpYW50IG9mIGFwcGxpZXI6IFtbVlJNTG9va0F0Qm9uZUFwcGx5ZXJdXSBhbmQgW1tWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcl1dLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNTG9va0F0QXBwbHllciB7XG4gIC8qKlxuICAgKiBJdCByZXByZXNlbnRzIGl0cyB0eXBlIG9mIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgdHlwZTogVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWU7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGxvb2sgYXQgZGlyZWN0aW9uIHRvIGl0cyBhc3NvY2lhdGVkIFZSTSBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGV1bGVyIGBUSFJFRS5FdWxlcmAgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgbG9vayBhdCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNQ3VydmVNYXBwZXIgfSBmcm9tICcuL1ZSTUN1cnZlTWFwcGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCBieSBbW1ZSTUxvb2tBdEhlYWRdXSwgYXBwbGllcyBsb29rIGF0IGRpcmVjdGlvbiB0byBleWUgYmxlbmQgc2hhcGVzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgZXh0ZW5kcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlSG9yaXpvbnRhbDogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9ibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLlxuICAgKlxuICAgKiBAcGFyYW0gYmxlbmRTaGFwZVByb3h5IEEgW1tWUk1CbGVuZFNoYXBlUHJveHldXSB1c2VkIGJ5IHRoaXMgYXBwbGllclxuICAgKiBAcGFyYW0gY3VydmVIb3Jpem9udGFsIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsRG93biBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVWZXJ0aWNhbFVwIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgY3VydmVIb3Jpem9udGFsOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsRG93bjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcixcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2N1cnZlSG9yaXpvbnRhbCA9IGN1cnZlSG9yaXpvbnRhbDtcbiAgICB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93biA9IGN1cnZlVmVydGljYWxEb3duO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxVcCA9IGN1cnZlVmVydGljYWxVcDtcblxuICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eSA9IGJsZW5kU2hhcGVQcm94eTtcbiAgfVxuXG4gIHB1YmxpYyBuYW1lKCk6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lIHtcbiAgICByZXR1cm4gVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3JjWCA9IGV1bGVyLng7XG4gICAgY29uc3Qgc3JjWSA9IGV1bGVyLnk7XG5cbiAgICBpZiAoc3JjWCA8IDAuMCkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rdXAsIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tkb3duLCB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93bi5tYXAoLXNyY1gpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rZG93biwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3VwLCB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAubWFwKHNyY1gpKTtcbiAgICB9XG5cbiAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rbGVmdCwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3JpZ2h0LCB0aGlzLl9jdXJ2ZUhvcml6b250YWwubWFwKC1zcmNZKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3JpZ2h0LCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rbGVmdCwgdGhpcy5fY3VydmVIb3Jpem9udGFsLm1hcChzcmNZKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4uL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuXG5jb25zdCBWRUNUT1IzX0ZST05UID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgLTEuMCkpO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGxvb2sgYXQgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWFkIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBBc3NvY2lhdGVkIFtbVlJNRmlyc3RQZXJzb25dXSwgd2lsbCBiZSB1c2VkIGZvciBkaXJlY3Rpb24gY2FsY3VsYXRpb24uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uO1xuXG4gIC8qKlxuICAgKiBBc3NvY2lhdGVkIFtbVlJNTG9va0F0QXBwbHllcl1dLCBpdHMgbG9vayBhdCBkaXJlY3Rpb24gd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBtb2RlbCB1c2luZyB0aGlzIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYXBwbHllcj86IFZSTUxvb2tBdEFwcGx5ZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgaXRzIGxvb2sgYXQgZGlyZWN0aW9uIHdpbGwgYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGNhbGxpbmcgW1tWUk1Mb29rQXRIZWFkLnVwZGF0ZV1dICh3aGljaCBpcyBjYWxsZWQgZnJvbSBbW1ZSTS51cGRhdGVdXSkuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUxvb2tBdEhlYWQudGFyZ2V0XV1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIGxvb2sgYXQuXG4gICAqIE5vdGUgdGhhdCBpdCBkb2VzIG5vdCBtYWtlIGFueSBzZW5zZSBpZiBbW1ZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZV1dIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHByb3RlY3RlZCBfZXVsZXI6IFRIUkVFLkV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsIFZSTUxvb2tBdEhlYWQuRVVMRVJfT1JERVIpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTG9va0F0SGVhZC5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uIEEgW1tWUk1GaXJzdFBlcnNvbl1dIHRoYXQgd2lsbCBiZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBuZXcgVlJNTG9va0F0SGVhZFxuICAgKiBAcGFyYW0gYXBwbHllciBBIFtbVlJNTG9va0F0QXBwbHllcl1dIHRoYXQgd2lsbCBiZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBuZXcgVlJNTG9va0F0SGVhZFxuICAgKi9cbiAgY29uc3RydWN0b3IoZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLCBhcHBseWVyPzogVlJNTG9va0F0QXBwbHllcikge1xuICAgIHRoaXMuZmlyc3RQZXJzb24gPSBmaXJzdFBlcnNvbjtcbiAgICB0aGlzLmFwcGx5ZXIgPSBhcHBseWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9vayBhdCBkaXJlY3Rpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuVmVjdG9yM2BcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZERpcmVjdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICBjb25zdCByb3QgPSBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lLCBfcXVhdCk7XG4gICAgcmV0dXJuIHRhcmdldC5jb3B5KFZFQ1RPUjNfRlJPTlQpLmFwcGx5RXVsZXIodGhpcy5fZXVsZXIpLmFwcGx5UXVhdGVybmlvbihyb3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpdHMgbG9vayBhdCBwb3NpdGlvbi5cbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYgW1tWUk1Mb29rQXRIZWFkLmF1dG9VcGRhdGVdXSBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zaXRpb24gQSB0YXJnZXQgcG9zaXRpb25cbiAgICovXG4gIHB1YmxpYyBsb29rQXQocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICB0aGlzLl9jYWxjRXVsZXIodGhpcy5fZXVsZXIsIHBvc2l0aW9uKTtcblxuICAgIGlmICh0aGlzLmFwcGx5ZXIpIHtcbiAgICAgIHRoaXMuYXBwbHllci5sb29rQXQodGhpcy5fZXVsZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIFZSTUxvb2tBdEhlYWQuXG4gICAqIElmIFtbVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlXV0gaXMgZGlzYWJsZWQsIGl0IHdpbGwgZG8gbm90aGluZy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG5cbiAgICAgIGlmICh0aGlzLmFwcGx5ZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseWVyLmxvb2tBdCh0aGlzLl9ldWxlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jYWxjRXVsZXIodGFyZ2V0OiBUSFJFRS5FdWxlciwgcG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5FdWxlciB7XG4gICAgY29uc3QgaGVhZFBvc2l0aW9uID0gdGhpcy5maXJzdFBlcnNvbi5nZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24oX3YzQik7XG5cbiAgICAvLyBMb29rIGF0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlXG4gICAgY29uc3QgbG9va0F0RGlyID0gX3YzQy5jb3B5KHBvc2l0aW9uKS5zdWIoaGVhZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcblxuICAgIC8vIFRyYW5zZm9ybSB0aGUgZGlyZWN0aW9uIGludG8gbG9jYWwgY29vcmRpbmF0ZSBmcm9tIHRoZSBmaXJzdCBwZXJzb24gYm9uZVxuICAgIGxvb2tBdERpci5hcHBseVF1YXRlcm5pb24ocXVhdEludmVydENvbXBhdChnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lLCBfcXVhdCkpKTtcblxuICAgIC8vIGNvbnZlcnQgdGhlIGRpcmVjdGlvbiBpbnRvIGV1bGVyXG4gICAgdGFyZ2V0LnggPSBNYXRoLmF0YW4yKGxvb2tBdERpci55LCBNYXRoLnNxcnQobG9va0F0RGlyLnggKiBsb29rQXREaXIueCArIGxvb2tBdERpci56ICogbG9va0F0RGlyLnopKTtcbiAgICB0YXJnZXQueSA9IE1hdGguYXRhbjIoLWxvb2tBdERpci54LCAtbG9va0F0RGlyLnopO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBHTFRGTm9kZSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNQ3VydmVNYXBwZXIgfSBmcm9tICcuL1ZSTUN1cnZlTWFwcGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4vVlJNTG9va0F0SGVhZCc7XG5cbmNvbnN0IF9ldWxlciA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCBWUk1Mb29rQXRIZWFkLkVVTEVSX09SREVSKTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgYnkgW1tWUk1Mb29rQXRIZWFkXV0sIGFwcGxpZXMgbG9vayBhdCBkaXJlY3Rpb24gdG8gZXllIGJvbmVzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0Qm9uZUFwcGx5ZXIgZXh0ZW5kcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5Cb25lO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlSG9yaXpvbnRhbElubmVyOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVIb3Jpem9udGFsT3V0ZXI6IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZVZlcnRpY2FsRG93bjogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlVmVydGljYWxVcDogVlJNQ3VydmVNYXBwZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfbGVmdEV5ZTogR0xURk5vZGUgfCBudWxsO1xuICBwcml2YXRlIHJlYWRvbmx5IF9yaWdodEV5ZTogR0xURk5vZGUgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTG9va0F0Qm9uZUFwcGx5ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIFtbVlJNSHVtYW5vaWRdXSB1c2VkIGJ5IHRoaXMgYXBwbGllclxuICAgKiBAcGFyYW0gY3VydmVIb3Jpem9udGFsSW5uZXIgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgaW5uZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlSG9yaXpvbnRhbE91dGVyIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsRG93biBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVWZXJ0aWNhbFVwIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIGN1cnZlSG9yaXpvbnRhbElubmVyOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZUhvcml6b250YWxPdXRlcjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVWZXJ0aWNhbERvd246IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlVmVydGljYWxVcDogVlJNQ3VydmVNYXBwZXIsXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9jdXJ2ZUhvcml6b250YWxJbm5lciA9IGN1cnZlSG9yaXpvbnRhbElubmVyO1xuICAgIHRoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyID0gY3VydmVIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5fY3VydmVWZXJ0aWNhbERvd24gPSBjdXJ2ZVZlcnRpY2FsRG93bjtcbiAgICB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAgPSBjdXJ2ZVZlcnRpY2FsVXA7XG5cbiAgICB0aGlzLl9sZWZ0RXllID0gaHVtYW5vaWQuZ2V0Qm9uZU5vZGUoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuTGVmdEV5ZSk7XG4gICAgdGhpcy5fcmlnaHRFeWUgPSBodW1hbm9pZC5nZXRCb25lTm9kZShWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZS5SaWdodEV5ZSk7XG4gIH1cblxuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnN0IHNyY1ggPSBldWxlci54O1xuICAgIGNvbnN0IHNyY1kgPSBldWxlci55O1xuXG4gICAgLy8gbGVmdFxuICAgIGlmICh0aGlzLl9sZWZ0RXllKSB7XG4gICAgICBpZiAoc3JjWCA8IDAuMCkge1xuICAgICAgICBfZXVsZXIueCA9IC10aGlzLl9jdXJ2ZVZlcnRpY2FsRG93bi5tYXAoLXNyY1gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyLnggPSB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAubWFwKHNyY1gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgICBfZXVsZXIueSA9IC10aGlzLl9jdXJ2ZUhvcml6b250YWxJbm5lci5tYXAoLXNyY1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyLnkgPSB0aGlzLl9jdXJ2ZUhvcml6b250YWxPdXRlci5tYXAoc3JjWSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2xlZnRFeWUucXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoX2V1bGVyKTtcbiAgICB9XG5cbiAgICAvLyByaWdodFxuICAgIGlmICh0aGlzLl9yaWdodEV5ZSkge1xuICAgICAgaWYgKHNyY1ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyLnggPSAtdGhpcy5fY3VydmVWZXJ0aWNhbERvd24ubWFwKC1zcmNYKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlci54ID0gdGhpcy5fY3VydmVWZXJ0aWNhbFVwLm1hcChzcmNYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyY1kgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyLnkgPSAtdGhpcy5fY3VydmVIb3Jpem9udGFsT3V0ZXIubWFwKC1zcmNZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlci55ID0gdGhpcy5fY3VydmVIb3Jpem9udGFsSW5uZXIubWFwKHNyY1kpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yaWdodEV5ZS5xdWF0ZXJuaW9uLnNldEZyb21FdWxlcihfZXVsZXIpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4uL2ZpcnN0cGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNQ3VydmVNYXBwZXIgfSBmcm9tICcuL1ZSTUN1cnZlTWFwcGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkJztcblxuLy8gVEhSRUUuTWF0aCBoYXMgYmVlbiByZW5hbWVkIHRvIFRIUkVFLk1hdGhVdGlscyBzaW5jZSByMTEzLlxuLy8gV2UgYXJlIGdvaW5nIHRvIGRlZmluZSB0aGUgREVHMlJBRCBieSBvdXJzZWx2ZXMgZm9yIGEgd2hpbGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xODI3MFxuY29uc3QgREVHMlJBRCA9IE1hdGguUEkgLyAxODA7IC8vIFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNTG9va0F0SGVhZF1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNTG9va0F0SGVhZF1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gYmxlbmRTaGFwZVByb3h5IEEgW1tWUk1CbGVuZFNoYXBlUHJveHldXSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSBbW1ZSTUh1bWFub2lkXV0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBpbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb24sXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICApOiBWUk1Mb29rQXRIZWFkIHwgbnVsbCB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWUk1TY2hlbWEuRmlyc3RQZXJzb24gfCB1bmRlZmluZWQgPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYXBwbHllciA9IHRoaXMuX2ltcG9ydEFwcGx5ZXIoc2NoZW1hRmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpO1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0SGVhZChmaXJzdFBlcnNvbiwgYXBwbHllciB8fCB1bmRlZmluZWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRBcHBseWVyKFxuICAgIHNjaGVtYUZpcnN0UGVyc29uOiBWUk1TY2hlbWEuRmlyc3RQZXJzb24sXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICApOiBWUk1Mb29rQXRBcHBseWVyIHwgbnVsbCB7XG4gICAgY29uc3QgbG9va0F0SG9yaXpvbnRhbElubmVyID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbElubmVyO1xuICAgIGNvbnN0IGxvb2tBdEhvcml6b250YWxPdXRlciA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxPdXRlcjtcbiAgICBjb25zdCBsb29rQXRWZXJ0aWNhbERvd24gPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbERvd247XG4gICAgY29uc3QgbG9va0F0VmVydGljYWxVcCA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsVXA7XG5cbiAgICBzd2l0Y2ggKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lKSB7XG4gICAgICBjYXNlIFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJvbmU6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGxvb2tBdEhvcml6b250YWxJbm5lciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBsb29rQXRWZXJ0aWNhbERvd24gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGxvb2tBdFZlcnRpY2FsVXAgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEJvbmVBcHBseWVyKFxuICAgICAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0SG9yaXpvbnRhbElubmVyKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRIb3Jpem9udGFsT3V0ZXIpLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdFZlcnRpY2FsRG93biksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0VmVydGljYWxVcCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FzZSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlOiB7XG4gICAgICAgIGlmIChsb29rQXRIb3Jpem9udGFsT3V0ZXIgPT09IHVuZGVmaW5lZCB8fCBsb29rQXRWZXJ0aWNhbERvd24gPT09IHVuZGVmaW5lZCB8fCBsb29rQXRWZXJ0aWNhbFVwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyKFxuICAgICAgICAgICAgYmxlbmRTaGFwZVByb3h5LFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKGxvb2tBdEhvcml6b250YWxPdXRlciksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobG9va0F0VmVydGljYWxEb3duKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShsb29rQXRWZXJ0aWNhbFVwKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShtYXA6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCk6IFZSTUN1cnZlTWFwcGVyIHtcbiAgICByZXR1cm4gbmV3IFZSTUN1cnZlTWFwcGVyKFxuICAgICAgdHlwZW9mIG1hcC54UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC54UmFuZ2UgOiB1bmRlZmluZWQsXG4gICAgICB0eXBlb2YgbWFwLnlSYW5nZSA9PT0gJ251bWJlcicgPyBERUcyUkFEICogbWFwLnlSYW5nZSA6IHVuZGVmaW5lZCxcbiAgICAgIG1hcC5jdXJ2ZSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKG1hcDogVlJNU2NoZW1hLkZpcnN0UGVyc29uRGVncmVlTWFwKTogVlJNQ3VydmVNYXBwZXIge1xuICAgIHJldHVybiBuZXcgVlJNQ3VydmVNYXBwZXIodHlwZW9mIG1hcC54UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC54UmFuZ2UgOiB1bmRlZmluZWQsIG1hcC55UmFuZ2UsIG1hcC5jdXJ2ZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNvbnN0IGdldEVuY29kaW5nQ29tcG9uZW50cyA9IChlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogW3N0cmluZywgc3RyaW5nXSA9PiB7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlIFRIUkVFLkxpbmVhckVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnTGluZWFyJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuc1JHQkVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnc1JHQicsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQkVFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQkUnLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JNN0VuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCA3LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCTTE2RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JNJywgJyggdmFsdWUsIDE2LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCREVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCRCcsICcoIHZhbHVlLCAyNTYuMCApJ107XG4gICAgY2FzZSBUSFJFRS5HYW1tYUVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnR2FtbWEnLCAnKCB2YWx1ZSwgZmxvYXQoIEdBTU1BX0ZBQ1RPUiApICknXTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBlbmNvZGluZzogJyArIGVuY29kaW5nKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbiA9IChmdW5jdGlvbk5hbWU6IHN0cmluZywgZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGNvbXBvbmVudHMgPSBnZXRFbmNvZGluZ0NvbXBvbmVudHMoZW5jb2RpbmcpO1xuICByZXR1cm4gJ3ZlYzQgJyArIGZ1bmN0aW9uTmFtZSArICcoIHZlYzQgdmFsdWUgKSB7IHJldHVybiAnICsgY29tcG9uZW50c1swXSArICdUb0xpbmVhcicgKyBjb21wb25lbnRzWzFdICsgJzsgfSc7XG59O1xuIiwiLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nICovXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbiB9IGZyb20gJy4vZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uJztcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLnZlcnQnO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi5mcmFnJztcblxuY29uc3QgVEFVID0gMi4wICogTWF0aC5QSTtcblxuZXhwb3J0IGludGVyZmFjZSBNVG9vblBhcmFtZXRlcnMgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMge1xuICBtVG9vblZlcnNpb24/OiBudW1iZXI7IC8vIF9NVG9vblZlcnNpb25cblxuICBjdXRvZmY/OiBudW1iZXI7IC8vIF9DdXRvZmZcbiAgY29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyByZ2Igb2YgX0NvbG9yXG4gIHNoYWRlQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfU2hhZGVDb2xvclxuICBtYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleFxuICBtYWluVGV4PzogVEhSRUUuVGV4dHVyZTsgLy8gX01haW5UZXggKHdpbGwgYmUgcmVuYW1lZCB0byBtYXApXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgbWFpblRleF9TVD86IFRIUkVFLlZlY3RvcjQ7IC8vIF9NYWluVGV4X1NUXG4gIHNoYWRlVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9TaGFkZVRleHR1cmVcbiAgYnVtcFNjYWxlPzogbnVtYmVyOyAvLyBfQnVtcFNjYWxlICh3aWxsIGJlIGNvbnZlcnRlZCB0byBub3JtYWxTY2FsZSlcbiAgbm9ybWFsTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0J1bXBNYXBcbiAgbm9ybWFsTWFwVHlwZT86IFRIUkVFLk5vcm1hbE1hcFR5cGVzOyAvLyBUaHJlZS5qcyBzcGVjaWZpYyB2YWx1ZVxuICBub3JtYWxTY2FsZT86IFRIUkVFLlZlY3RvcjI7IC8vIF9CdW1wU2NhbGUgaW4gVGhyZWUuanMgZmFzaGlvblxuICBidW1wTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0J1bXBNYXAgKHdpbGwgYmUgcmVuYW1lZCB0byBub3JtYWxNYXApXG4gIHJlY2VpdmVTaGFkb3dSYXRlPzogbnVtYmVyOyAvLyBfUmVjZWl2ZVNoYWRvd1JhdGVcbiAgcmVjZWl2ZVNoYWRvd1RleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVcbiAgc2hhZGluZ0dyYWRlUmF0ZT86IG51bWJlcjsgLy8gX1NoYWRpbmdHcmFkZVJhdGVcbiAgc2hhZGluZ0dyYWRlVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9TaGFkaW5nR3JhZGVUZXh0dXJlXG4gIHNoYWRlU2hpZnQ/OiBudW1iZXI7IC8vIF9TaGFkZVNoaWZ0XG4gIHNoYWRlVG9vbnk/OiBudW1iZXI7IC8vIF9TaGFkZVRvb255XG4gIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbj86IG51bWJlcjsgLy8gX0xpZ2h0Q29sb3JBdHRlbnVhdGlvblxuICBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5PzogbnVtYmVyOyAvLyBfSW5kaXJlY3RMaWdodEludGVuc2l0eVxuICByaW1UZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1JpbVRleHR1cmVcbiAgcmltQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfUmltQ29sb3JcbiAgcmltTGlnaHRpbmdNaXg/OiBudW1iZXI7IC8vIF9SaW1MaWdodGluZ01peFxuICByaW1GcmVzbmVsUG93ZXI/OiBudW1iZXI7IC8vIF9SaW1GcmVzbmVsUG93ZXJcbiAgcmltTGlmdD86IG51bWJlcjsgLy8gX1JpbUxpZnRcbiAgc3BoZXJlQWRkPzogVEhSRUUuVGV4dHVyZTsgLy8gX1NwaGVyZUFkZFxuICBlbWlzc2lvbkNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX0VtaXNzaW9uQ29sb3JcbiAgZW1pc3NpdmVNYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfRW1pc3Npb25NYXBcbiAgZW1pc3Npb25NYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfRW1pc3Npb25NYXAgKHdpbGwgYmUgcmVuYW1lZCB0byBlbWlzc2l2ZU1hcClcbiAgb3V0bGluZVdpZHRoVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9PdXRsaW5lV2lkdGhUZXh0dXJlXG4gIG91dGxpbmVXaWR0aD86IG51bWJlcjsgLy8gX091dGxpbmVXaWR0aFxuICBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U/OiBudW1iZXI7IC8vIF9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2VcbiAgb3V0bGluZUNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX091dGxpbmVDb2xvclxuICBvdXRsaW5lTGlnaHRpbmdNaXg/OiBudW1iZXI7IC8vIF9PdXRsaW5lTGlnaHRpbmdNaXhcbiAgdXZBbmltTWFza1RleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfVXZBbmltTWFza1RleHR1cmVcbiAgdXZBbmltU2Nyb2xsWD86IG51bWJlcjsgLy8gX1V2QW5pbVNjcm9sbFhcbiAgdXZBbmltU2Nyb2xsWT86IG51bWJlcjsgLy8gX1V2QW5pbVNjcm9sbFlcbiAgdXZBbmltUm90YXRpb24/OiBudW1iZXI7IC8vIF91dkFuaW1Sb3RhdGlvblxuXG4gIGRlYnVnTW9kZT86IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgfCBudW1iZXI7IC8vIF9EZWJ1Z01vZGVcbiAgYmxlbmRNb2RlPzogTVRvb25NYXRlcmlhbFJlbmRlck1vZGUgfCBudW1iZXI7IC8vIF9CbGVuZE1vZGVcbiAgb3V0bGluZVdpZHRoTW9kZT86IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHwgbnVtYmVyOyAvLyBPdXRsaW5lV2lkdGhNb2RlXG4gIG91dGxpbmVDb2xvck1vZGU/OiBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSB8IG51bWJlcjsgLy8gT3V0bGluZUNvbG9yTW9kZVxuICBjdWxsTW9kZT86IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB8IG51bWJlcjsgLy8gX0N1bGxNb2RlXG4gIG91dGxpbmVDdWxsTW9kZT86IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB8IG51bWJlcjsgLy8gX091dGxpbmVDdWxsTW9kZVxuICBzcmNCbGVuZD86IG51bWJlcjsgLy8gX1NyY0JsZW5kXG4gIGRzdEJsZW5kPzogbnVtYmVyOyAvLyBfRHN0QmxlbmRcbiAgeldyaXRlPzogbnVtYmVyOyAvLyBfWldyaXRlICh3aWxsIGJlIHJlbmFtZWQgdG8gZGVwdGhXcml0ZSlcblxuICBpc091dGxpbmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBlbmNvZGluZyBvZiBpbnB1dCB1bmlmb3JtIGNvbG9ycy5cbiAgICpcbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AuXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5zUkdCRW5jb2RpbmdgLCB1c2UgYFRIUkVFLnNSR0JFbmNvZGluZ2AuXG4gICAqXG4gICAqIEVuY29kaW5ncyBvZiB0ZXh0dXJlcyBzaG91bGQgYmUgc2V0IGluZGVwZW5kZW50bHkgb24gdGV4dHVyZXMuXG4gICAqXG4gICAqIFRoaXMgd2lsbCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYCBpZiB0aGlzIG9wdGlvbiBpc24ndCBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9yZW5kZXJlcnMvV2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZ1xuICAgKi9cbiAgZW5jb2Rpbmc/OiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB7XG4gIE9mZixcbiAgRnJvbnQsXG4gIEJhY2ssXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICBOb25lLFxuICBOb3JtYWwsXG4gIExpdFNoYWRlUmF0ZSxcbiAgVVYsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlIHtcbiAgRml4ZWRDb2xvcixcbiAgTWl4ZWRMaWdodGluZyxcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICBOb25lLFxuICBXb3JsZENvb3JkaW5hdGVzLFxuICBTY3JlZW5Db29yZGluYXRlcyxcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUge1xuICBPcGFxdWUsXG4gIEN1dG91dCxcbiAgVHJhbnNwYXJlbnQsXG4gIFRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbn1cblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEgW1tNVG9vbk1hdGVyaWFsXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaXNNVG9vbk1hdGVyaWFsOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgY3V0b2ZmID0gMC41OyAvLyBfQ3V0b2ZmXG4gIHB1YmxpYyBjb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDEuMCwgMS4wLCAxLjAsIDEuMCk7IC8vIF9Db2xvclxuICBwdWJsaWMgc2hhZGVDb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuOTcsIDAuODEsIDAuODYsIDEuMCk7IC8vIF9TaGFkZUNvbG9yXG4gIHB1YmxpYyBtYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX01haW5UZXhcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICBwdWJsaWMgbWFpblRleF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9NYWluVGV4X1NUXG4gIHB1YmxpYyBzaGFkZVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1NoYWRlVGV4dHVyZVxuICAvLyBwdWJsaWMgc2hhZGVUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1NoYWRlVGV4dHVyZV9TVCAodW51c2VkKVxuICBwdWJsaWMgbm9ybWFsTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9CdW1wTWFwLiBhZ2FpbiwgVEhJUyBJUyBfQnVtcE1hcFxuICBwdWJsaWMgbm9ybWFsTWFwVHlwZSA9IFRIUkVFLlRhbmdlbnRTcGFjZU5vcm1hbE1hcDsgLy8gVGhyZWUuanMgcmVxdWlyZXMgdGhpc1xuICBwdWJsaWMgbm9ybWFsU2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMigxLjAsIDEuMCk7IC8vIF9CdW1wU2NhbGUsIGluIFZlY3RvcjJcbiAgLy8gcHVibGljIGJ1bXBNYXBfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfQnVtcE1hcF9TVCAodW51c2VkKVxuICBwdWJsaWMgcmVjZWl2ZVNoYWRvd1JhdGUgPSAxLjA7IC8vIF9SZWNlaXZlU2hhZG93UmF0ZVxuICBwdWJsaWMgcmVjZWl2ZVNoYWRvd1RleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1JlY2VpdmVTaGFkb3dUZXh0dXJlXG4gIC8vIHB1YmxpYyByZWNlaXZlU2hhZG93VGV4dHVyZV9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9SZWNlaXZlU2hhZG93VGV4dHVyZV9TVCAodW51c2VkKVxuICBwdWJsaWMgc2hhZGluZ0dyYWRlUmF0ZSA9IDEuMDsgLy8gX1NoYWRpbmdHcmFkZVJhdGVcbiAgcHVibGljIHNoYWRpbmdHcmFkZVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1NoYWRpbmdHcmFkZVRleHR1cmVcbiAgLy8gcHVibGljIHNoYWRpbmdHcmFkZVRleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU2hhZGluZ0dyYWRlVGV4dHVyZV9TVCAodW51c2VkKVxuICBwdWJsaWMgc2hhZGVTaGlmdCA9IDAuMDsgLy8gX1NoYWRlU2hpZnRcbiAgcHVibGljIHNoYWRlVG9vbnkgPSAwLjk7IC8vIF9TaGFkZVRvb255XG4gIHB1YmxpYyBsaWdodENvbG9yQXR0ZW51YXRpb24gPSAwLjA7IC8vIF9MaWdodENvbG9yQXR0ZW51YXRpb25cbiAgcHVibGljIGluZGlyZWN0TGlnaHRJbnRlbnNpdHkgPSAwLjE7IC8vIF9JbmRpcmVjdExpZ2h0SW50ZW5zaXR5XG4gIHB1YmxpYyByaW1UZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9SaW1UZXh0dXJlXG4gIHB1YmxpYyByaW1Db2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIF9SaW1Db2xvclxuICBwdWJsaWMgcmltTGlnaHRpbmdNaXggPSAwLjA7IC8vIF9SaW1MaWdodGluZ01peFxuICBwdWJsaWMgcmltRnJlc25lbFBvd2VyID0gMS4wOyAvLyBfUmltRnJlc25lbFBvd2VyXG4gIHB1YmxpYyByaW1MaWZ0ID0gMC4wOyAvLyBfUmltTGlmdFxuICBwdWJsaWMgc3BoZXJlQWRkOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9TcGhlcmVBZGRcbiAgLy8gcHVibGljIHNwaGVyZUFkZF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9TcGhlcmVBZGRfU1QgKHVudXNlZClcbiAgcHVibGljIGVtaXNzaW9uQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAxLjApOyAvLyBfRW1pc3Npb25Db2xvclxuICBwdWJsaWMgZW1pc3NpdmVNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX0VtaXNzaW9uTWFwXG4gIC8vIHB1YmxpYyBlbWlzc2lvbk1hcF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9FbWlzc2lvbk1hcF9TVCAodW51c2VkKVxuICBwdWJsaWMgb3V0bGluZVdpZHRoVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfT3V0bGluZVdpZHRoVGV4dHVyZVxuICAvLyBwdWJsaWMgb3V0bGluZVdpZHRoVGV4dHVyZV9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9PdXRsaW5lV2lkdGhUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBvdXRsaW5lV2lkdGggPSAwLjU7IC8vIF9PdXRsaW5lV2lkdGhcbiAgcHVibGljIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSA9IDEuMDsgLy8gX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZVxuICBwdWJsaWMgb3V0bGluZUNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX091dGxpbmVDb2xvclxuICBwdWJsaWMgb3V0bGluZUxpZ2h0aW5nTWl4ID0gMS4wOyAvLyBfT3V0bGluZUxpZ2h0aW5nTWl4XG4gIHB1YmxpYyB1dkFuaW1NYXNrVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfVXZBbmltTWFza1RleHR1cmVcbiAgcHVibGljIHV2QW5pbVNjcm9sbFggPSAwLjA7IC8vIF9VdkFuaW1TY3JvbGxYXG4gIHB1YmxpYyB1dkFuaW1TY3JvbGxZID0gMC4wOyAvLyBfVXZBbmltU2Nyb2xsWVxuICBwdWJsaWMgdXZBbmltUm90YXRpb24gPSAwLjA7IC8vIF91dkFuaW1Sb3RhdGlvblxuXG4gIHB1YmxpYyBzaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTsgLy8gd2hlbiB0aGlzIGlzIHRydWUsIGFwcGx5VW5pZm9ybXMgZWZmZWN0c1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2Rpbmcgb2YgaW5wdXQgdW5pZm9ybSBjb2xvcnMuXG4gICAqXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuc1JHQkVuY29kaW5nYCwgdXNlIGBUSFJFRS5zUkdCRW5jb2RpbmdgLlxuICAgKlxuICAgKiBFbmNvZGluZ3Mgb2YgdGV4dHVyZXMgYXJlIHNldCBpbmRlcGVuZGVudGx5IG9uIHRleHR1cmVzLlxuICAgKlxuICAgKiBUaGlzIGlzIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogU2VlIGFsc286IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL3JlbmRlcmVycy9XZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nXG4gICAqL1xuICBwdWJsaWMgZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZztcblxuICBwcml2YXRlIF9kZWJ1Z01vZGUgPSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLk5vbmU7IC8vIF9EZWJ1Z01vZGVcbiAgcHJpdmF0ZSBfYmxlbmRNb2RlID0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuT3BhcXVlOyAvLyBfQmxlbmRNb2RlXG4gIHByaXZhdGUgX291dGxpbmVXaWR0aE1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lOyAvLyBfT3V0bGluZVdpZHRoTW9kZVxuICBwcml2YXRlIF9vdXRsaW5lQ29sb3JNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUuRml4ZWRDb2xvcjsgLy8gX091dGxpbmVDb2xvck1vZGVcbiAgcHJpdmF0ZSBfY3VsbE1vZGUgPSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuQmFjazsgLy8gX0N1bGxNb2RlXG4gIHByaXZhdGUgX291dGxpbmVDdWxsTW9kZSA9IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udDsgLy8gX091dGxpbmVDdWxsTW9kZVxuICAvLyBwdWJsaWMgc3JjQmxlbmQgPSAxLjA7IC8vIF9TcmNCbGVuZCAoaXMgbm90IHN1cHBvcnRlZClcbiAgLy8gcHVibGljIGRzdEJsZW5kID0gMC4wOyAvLyBfRHN0QmxlbmQgKGlzIG5vdCBzdXBwb3J0ZWQpXG4gIC8vIHB1YmxpYyB6V3JpdGUgPSAxLjA7IC8vIF9aV3JpdGUgKHdpbGwgYmUgY29udmVydGVkIHRvIGRlcHRoV3JpdGUpXG5cbiAgcHJpdmF0ZSBfaXNPdXRsaW5lID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdXZBbmltT2Zmc2V0WCA9IDAuMDtcbiAgcHJpdmF0ZSBfdXZBbmltT2Zmc2V0WSA9IDAuMDtcbiAgcHJpdmF0ZSBfdXZBbmltUGhhc2UgPSAwLjA7XG5cbiAgY29uc3RydWN0b3IocGFyYW1ldGVyczogTVRvb25QYXJhbWV0ZXJzID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5lbmNvZGluZyA9IHBhcmFtZXRlcnMuZW5jb2RpbmcgfHwgVEhSRUUuTGluZWFyRW5jb2Rpbmc7XG4gICAgaWYgKHRoaXMuZW5jb2RpbmcgIT09IFRIUkVFLkxpbmVhckVuY29kaW5nICYmIHRoaXMuZW5jb2RpbmcgIT09IFRIUkVFLnNSR0JFbmNvZGluZykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVGhlIHNwZWNpZmllZCBjb2xvciBlbmNvZGluZyBkb2VzIG5vdCB3b3JrIHByb3Blcmx5IHdpdGggTVRvb25NYXRlcmlhbC4gWW91IG1pZ2h0IHdhbnQgdG8gdXNlIFRIUkVFLnNSR0JFbmNvZGluZyBpbnN0ZWFkLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vID09IHRoZXNlIHBhcmFtZXRlciBoYXMgbm8gY29tcGF0aWJpbGl0eSB3aXRoIHRoaXMgaW1wbGVtZW50YXRpb24gPT09PT09PT1cbiAgICBbXG4gICAgICAnbVRvb25WZXJzaW9uJyxcbiAgICAgICdzaGFkZVRleHR1cmVfU1QnLFxuICAgICAgJ2J1bXBNYXBfU1QnLFxuICAgICAgJ3JlY2VpdmVTaGFkb3dUZXh0dXJlX1NUJyxcbiAgICAgICdzaGFkaW5nR3JhZGVUZXh0dXJlX1NUJyxcbiAgICAgICdyaW1UZXh0dXJlX1NUJyxcbiAgICAgICdzcGhlcmVBZGRfU1QnLFxuICAgICAgJ2VtaXNzaW9uTWFwX1NUJyxcbiAgICAgICdvdXRsaW5lV2lkdGhUZXh0dXJlX1NUJyxcbiAgICAgICd1dkFuaW1NYXNrVGV4dHVyZV9TVCcsXG4gICAgICAnc3JjQmxlbmQnLFxuICAgICAgJ2RzdEJsZW5kJyxcbiAgICBdLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKChwYXJhbWV0ZXJzIGFzIGFueSlba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybihgVEhSRUUuJHt0aGlzLnR5cGV9OiBUaGUgcGFyYW1ldGVyIFwiJHtrZXl9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcbiAgICAgICAgZGVsZXRlIChwYXJhbWV0ZXJzIGFzIGFueSlba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vID09IGVuYWJsaW5nIGJ1bmNoIG9mIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLmZvZyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5saWdodHMgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMuY2xpcHBpbmcgPSB0cnVlO1xuXG4gICAgcGFyYW1ldGVycy5za2lubmluZyA9IHBhcmFtZXRlcnMuc2tpbm5pbmcgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgPSBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcbiAgICBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyA9IHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xuXG4gICAgLy8gPT0gdW5pZm9ybXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmNvbW1vbiwgLy8gbWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5ub3JtYWxtYXAsIC8vIG5vcm1hbE1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZW1pc3NpdmVtYXAsIC8vIGVtaXNzaXZlTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5mb2csXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5saWdodHMsXG4gICAgICB7XG4gICAgICAgIGN1dG9mZjogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIGNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCkgfSxcbiAgICAgICAgY29sb3JBbHBoYTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHNoYWRlQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjk3LCAwLjgxLCAwLjg2KSB9LFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIG1haW5UZXhfU1Q6IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCkgfSxcbiAgICAgICAgc2hhZGVUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHJlY2VpdmVTaGFkb3dSYXRlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgcmVjZWl2ZVNoYWRvd1RleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGluZ0dyYWRlUmF0ZTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHNoYWRpbmdHcmFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGVTaGlmdDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHNoYWRlVG9vbnk6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBsaWdodENvbG9yQXR0ZW51YXRpb246IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5OiB7IHZhbHVlOiAwLjEgfSxcbiAgICAgICAgcmltVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICByaW1Db2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHJpbUxpZ2h0aW5nTWl4OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgcmltRnJlc25lbFBvd2VyOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgcmltTGlmdDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHNwaGVyZUFkZDogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBlbWlzc2lvbkNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBvdXRsaW5lV2lkdGg6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBvdXRsaW5lQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lTGlnaHRpbmdNaXg6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICB1dkFuaW1NYXNrVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICB1dkFuaW1PZmZzZXRYOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltT2Zmc2V0WTogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbVRoZXRhOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgIH0sXG4gICAgXSk7XG5cbiAgICAvLyA9PSBmaW5hbGx5IGNvbXBpbGUgdGhlIHNoYWRlciBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIGdldCBtYWluVGV4KCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYXA7XG4gIH1cblxuICBzZXQgbWFpblRleCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMubWFwID0gdDtcbiAgfVxuXG4gIGdldCBidW1wTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxNYXA7XG4gIH1cblxuICBzZXQgYnVtcE1hcCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMubm9ybWFsTWFwID0gdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIHRoZSBgYnVtcFNjYWxlYCByZXV0cm5zIGl0cyB4IGNvbXBvbmVudCBvZiBgbm9ybWFsU2NhbGVgIChhc3N1bWluZyB4IGFuZCB5IGNvbXBvbmVudCBvZiBgbm9ybWFsU2NhbGVgIGFyZSBzYW1lKS5cbiAgICovXG4gIGdldCBidW1wU2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxTY2FsZS54O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHRpbmcgdGhlIGBidW1wU2NhbGVgIHdpbGwgYmUgY29udmVydCB0aGUgdmFsdWUgaW50byBWZWN0b3IyIGBub3JtYWxTY2FsZWAgLlxuICAgKi9cbiAgc2V0IGJ1bXBTY2FsZSh0OiBudW1iZXIpIHtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLnNldCh0LCB0KTtcbiAgfVxuXG4gIGdldCBlbWlzc2lvbk1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZW1pc3NpdmVNYXA7XG4gIH1cblxuICBzZXQgZW1pc3Npb25NYXAodDogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gdDtcbiAgfVxuXG4gIGdldCBibGVuZE1vZGUoKTogTVRvb25NYXRlcmlhbFJlbmRlck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9ibGVuZE1vZGU7XG4gIH1cblxuICBzZXQgYmxlbmRNb2RlKG06IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlKSB7XG4gICAgdGhpcy5fYmxlbmRNb2RlID0gbTtcblxuICAgIHRoaXMuZGVwdGhXcml0ZSA9IHRoaXMuX2JsZW5kTW9kZSAhPT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQ7XG4gICAgdGhpcy50cmFuc3BhcmVudCA9XG4gICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50IHx8XG4gICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgZGVidWdNb2RlKCk6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XG4gIH1cblxuICBzZXQgZGVidWdNb2RlKG06IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUpIHtcbiAgICB0aGlzLl9kZWJ1Z01vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVXaWR0aE1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVXaWR0aE1vZGUobTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBvdXRsaW5lQ29sb3JNb2RlKCk6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZUNvbG9yTW9kZTtcbiAgfVxuXG4gIHNldCBvdXRsaW5lQ29sb3JNb2RlKG06IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgY3VsbE1vZGUoKTogTVRvb25NYXRlcmlhbEN1bGxNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fY3VsbE1vZGU7XG4gIH1cblxuICBzZXQgY3VsbE1vZGUobTogTVRvb25NYXRlcmlhbEN1bGxNb2RlKSB7XG4gICAgdGhpcy5fY3VsbE1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIGdldCBvdXRsaW5lQ3VsbE1vZGUoKTogTVRvb25NYXRlcmlhbEN1bGxNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZUN1bGxNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVDdWxsTW9kZShtOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lQ3VsbE1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIGdldCB6V3JpdGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kZXB0aFdyaXRlID8gMSA6IDA7XG4gIH1cblxuICBzZXQgeldyaXRlKGk6IG51bWJlcikge1xuICAgIHRoaXMuZGVwdGhXcml0ZSA9IDAuNSA8PSBpO1xuICB9XG5cbiAgZ2V0IGlzT3V0bGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNPdXRsaW5lO1xuICB9XG5cbiAgc2V0IGlzT3V0bGluZShiOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNPdXRsaW5lID0gYjtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIG1hdGVyaWFsLlxuICAgKiBVc3VhbGx5IHRoaXMgd2lsbCBiZSBjYWxsZWQgdmlhIFtbVlJNLnVwZGF0ZV1dIHNvIHlvdSBkb24ndCBoYXZlIHRvIGNhbGwgdGhpcyBtYW51YWxseS5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZSBzaW5jZSBsYXN0IHVwZGF0ZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVZSTU1hdGVyaWFscyhkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fdXZBbmltT2Zmc2V0WCA9IHRoaXMuX3V2QW5pbU9mZnNldFggKyBkZWx0YSAqIHRoaXMudXZBbmltU2Nyb2xsWDtcbiAgICB0aGlzLl91dkFuaW1PZmZzZXRZID0gdGhpcy5fdXZBbmltT2Zmc2V0WSAtIGRlbHRhICogdGhpcy51dkFuaW1TY3JvbGxZOyAvLyBOZWdhdGl2ZSBzaW5jZSB0IGF4aXMgb2YgdXZzIGFyZSBvcHBvc2l0ZSBmcm9tIFVuaXR5J3Mgb25lXG4gICAgdGhpcy5fdXZBbmltUGhhc2UgPSB0aGlzLl91dkFuaW1QaGFzZSArIGRlbHRhICogdGhpcy51dkFuaW1Sb3RhdGlvbjtcblxuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1dG9mZiA9IHNvdXJjZS5jdXRvZmY7XG4gICAgdGhpcy5jb2xvci5jb3B5KHNvdXJjZS5jb2xvcik7XG4gICAgdGhpcy5zaGFkZUNvbG9yLmNvcHkoc291cmNlLnNoYWRlQ29sb3IpO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcbiAgICB0aGlzLm1haW5UZXhfU1QuY29weShzb3VyY2UubWFpblRleF9TVCk7XG4gICAgdGhpcy5zaGFkZVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVUZXh0dXJlO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcDtcbiAgICB0aGlzLm5vcm1hbE1hcFR5cGUgPSBzb3VyY2Uubm9ybWFsTWFwVHlwZTtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLmNvcHkodGhpcy5ub3JtYWxTY2FsZSk7XG4gICAgdGhpcy5yZWNlaXZlU2hhZG93UmF0ZSA9IHNvdXJjZS5yZWNlaXZlU2hhZG93UmF0ZTtcbiAgICB0aGlzLnJlY2VpdmVTaGFkb3dUZXh0dXJlID0gc291cmNlLnJlY2VpdmVTaGFkb3dUZXh0dXJlO1xuICAgIHRoaXMuc2hhZGluZ0dyYWRlUmF0ZSA9IHNvdXJjZS5zaGFkaW5nR3JhZGVSYXRlO1xuICAgIHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSA9IHNvdXJjZS5zaGFkaW5nR3JhZGVUZXh0dXJlO1xuICAgIHRoaXMuc2hhZGVTaGlmdCA9IHNvdXJjZS5zaGFkZVNoaWZ0O1xuICAgIHRoaXMuc2hhZGVUb29ueSA9IHNvdXJjZS5zaGFkZVRvb255O1xuICAgIHRoaXMubGlnaHRDb2xvckF0dGVudWF0aW9uID0gc291cmNlLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcbiAgICB0aGlzLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkgPSBzb3VyY2UuaW5kaXJlY3RMaWdodEludGVuc2l0eTtcbiAgICB0aGlzLnJpbVRleHR1cmUgPSBzb3VyY2UucmltVGV4dHVyZTtcbiAgICB0aGlzLnJpbUNvbG9yLmNvcHkoc291cmNlLnJpbUNvbG9yKTtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4ID0gc291cmNlLnJpbUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMucmltRnJlc25lbFBvd2VyID0gc291cmNlLnJpbUZyZXNuZWxQb3dlcjtcbiAgICB0aGlzLnJpbUxpZnQgPSBzb3VyY2UucmltTGlmdDtcbiAgICB0aGlzLnNwaGVyZUFkZCA9IHNvdXJjZS5zcGhlcmVBZGQ7XG4gICAgdGhpcy5lbWlzc2lvbkNvbG9yLmNvcHkoc291cmNlLmVtaXNzaW9uQ29sb3IpO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXA7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhUZXh0dXJlID0gc291cmNlLm91dGxpbmVXaWR0aFRleHR1cmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGggPSBzb3VyY2Uub3V0bGluZVdpZHRoO1xuICAgIHRoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gc291cmNlLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTtcbiAgICB0aGlzLm91dGxpbmVDb2xvci5jb3B5KHNvdXJjZS5vdXRsaW5lQ29sb3IpO1xuICAgIHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4ID0gc291cmNlLm91dGxpbmVMaWdodGluZ01peDtcbiAgICB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlID0gc291cmNlLnV2QW5pbU1hc2tUZXh0dXJlO1xuICAgIHRoaXMudXZBbmltU2Nyb2xsWCA9IHNvdXJjZS51dkFuaW1TY3JvbGxYO1xuICAgIHRoaXMudXZBbmltU2Nyb2xsWSA9IHNvdXJjZS51dkFuaW1TY3JvbGxZO1xuICAgIHRoaXMudXZBbmltUm90YXRpb24gPSBzb3VyY2UudXZBbmltUm90YXRpb247XG5cbiAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XG4gICAgdGhpcy5ibGVuZE1vZGUgPSBzb3VyY2UuYmxlbmRNb2RlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNb2RlO1xuICAgIHRoaXMub3V0bGluZUNvbG9yTW9kZSA9IHNvdXJjZS5vdXRsaW5lQ29sb3JNb2RlO1xuICAgIHRoaXMuY3VsbE1vZGUgPSBzb3VyY2UuY3VsbE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lQ3VsbE1vZGUgPSBzb3VyY2Uub3V0bGluZUN1bGxNb2RlO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdXBkYXRlZCB1bmlmb3JtIHZhcmlhYmxlcy5cbiAgICovXG4gIHByaXZhdGUgX2FwcGx5VW5pZm9ybXMoKTogdm9pZCB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1PZmZzZXRYLnZhbHVlID0gdGhpcy5fdXZBbmltT2Zmc2V0WDtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbU9mZnNldFkudmFsdWUgPSB0aGlzLl91dkFuaW1PZmZzZXRZO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltVGhldGEudmFsdWUgPSBUQVUgKiB0aGlzLl91dkFuaW1QaGFzZTtcblxuICAgIGlmICghdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IGZhbHNlO1xuXG4gICAgdGhpcy51bmlmb3Jtcy5jdXRvZmYudmFsdWUgPSB0aGlzLmN1dG9mZjtcbiAgICB0aGlzLnVuaWZvcm1zLmNvbG9yLnZhbHVlLnNldFJHQih0aGlzLmNvbG9yLngsIHRoaXMuY29sb3IueSwgdGhpcy5jb2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLmNvbG9yQWxwaGEudmFsdWUgPSB0aGlzLmNvbG9yLnc7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLnNoYWRlQ29sb3IueCwgdGhpcy5zaGFkZUNvbG9yLnksIHRoaXMuc2hhZGVDb2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZSA9IHRoaXMubWFwO1xuICAgIHRoaXMudW5pZm9ybXMubWFpblRleF9TVC52YWx1ZS5jb3B5KHRoaXMubWFpblRleF9TVCk7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZVRleHR1cmUudmFsdWUgPSB0aGlzLnNoYWRlVGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcC52YWx1ZSA9IHRoaXMubm9ybWFsTWFwO1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWUuY29weSh0aGlzLm5vcm1hbFNjYWxlKTtcbiAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dSYXRlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93UmF0ZTtcbiAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dUZXh0dXJlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdHcmFkZVJhdGUudmFsdWUgPSB0aGlzLnNoYWRpbmdHcmFkZVJhdGU7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nR3JhZGVUZXh0dXJlLnZhbHVlID0gdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVTaGlmdC52YWx1ZSA9IHRoaXMuc2hhZGVTaGlmdDtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVG9vbnkudmFsdWUgPSB0aGlzLnNoYWRlVG9vbnk7XG4gICAgdGhpcy51bmlmb3Jtcy5saWdodENvbG9yQXR0ZW51YXRpb24udmFsdWUgPSB0aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcbiAgICB0aGlzLnVuaWZvcm1zLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkudmFsdWUgPSB0aGlzLmluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1UZXh0dXJlLnZhbHVlID0gdGhpcy5yaW1UZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMucmltQ29sb3IueCwgdGhpcy5yaW1Db2xvci55LCB0aGlzLnJpbUNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXgudmFsdWUgPSB0aGlzLnJpbUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMudW5pZm9ybXMucmltRnJlc25lbFBvd2VyLnZhbHVlID0gdGhpcy5yaW1GcmVzbmVsUG93ZXI7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWZ0LnZhbHVlID0gdGhpcy5yaW1MaWZ0O1xuICAgIHRoaXMudW5pZm9ybXMuc3BoZXJlQWRkLnZhbHVlID0gdGhpcy5zcGhlcmVBZGQ7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2lvbkNvbG9yLnZhbHVlLnNldFJHQih0aGlzLmVtaXNzaW9uQ29sb3IueCwgdGhpcy5lbWlzc2lvbkNvbG9yLnksIHRoaXMuZW1pc3Npb25Db2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlID0gdGhpcy5lbWlzc2l2ZU1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aFRleHR1cmUudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGgudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aDtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZS52YWx1ZSA9IHRoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLm91dGxpbmVDb2xvci54LCB0aGlzLm91dGxpbmVDb2xvci55LCB0aGlzLm91dGxpbmVDb2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peC52YWx1ZSA9IHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltTWFza1RleHR1cmUudmFsdWUgPSB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlO1xuXG4gICAgLy8gYXBwbHkgY29sb3Igc3BhY2UgdG8gdW5pZm9ybSBjb2xvcnNcbiAgICBpZiAodGhpcy5lbmNvZGluZyA9PT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zLmNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnJpbUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMuZW1pc3Npb25Db2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNoYWRlckNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWZpbmVzID0ge1xuICAgICAgT1VUTElORTogdGhpcy5faXNPdXRsaW5lLFxuICAgICAgQkxFTkRNT0RFX09QQVFVRTogdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5PcGFxdWUsXG4gICAgICBCTEVORE1PREVfQ1VUT1VUOiB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLkN1dG91dCxcbiAgICAgIEJMRU5ETU9ERV9UUkFOU1BBUkVOVDpcbiAgICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudCB8fFxuICAgICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICAgIFVTRV9TSEFERVRFWFRVUkU6IHRoaXMuc2hhZGVUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFOiB0aGlzLnJlY2VpdmVTaGFkb3dUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1NIQURJTkdHUkFERVRFWFRVUkU6IHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9SSU1URVhUVVJFOiB0aGlzLnJpbVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU1BIRVJFQUREOiB0aGlzLnNwaGVyZUFkZCAhPT0gbnVsbCxcbiAgICAgIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFOiB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfVVZBTklNTUFTS1RFWFRVUkU6IHRoaXMudXZBbmltTWFza1RleHR1cmUgIT09IG51bGwsXG4gICAgICBERUJVR19OT1JNQUw6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob3JtYWwsXG4gICAgICBERUJVR19MSVRTSEFERVJBVEU6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5MaXRTaGFkZVJhdGUsXG4gICAgICBERUJVR19VVjogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLlVWLFxuICAgICAgT1VUTElORV9XSURUSF9XT1JMRDogdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfQ09MT1JfRklYRUQ6IHRoaXMuX291dGxpbmVDb2xvck1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLkZpeGVkQ29sb3IsXG4gICAgICBPVVRMSU5FX0NPTE9SX01JWEVEOiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZS5NaXhlZExpZ2h0aW5nLFxuICAgIH07XG5cbiAgICAvLyA9PSB0ZXh0dXJlIGVuY29kaW5ncyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgY29uc3QgZW5jb2RpbmdzID1cbiAgICAgICh0aGlzLnNoYWRlVGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbignc2hhZGVUZXh0dXJlVGV4ZWxUb0xpbmVhcicsIHRoaXMuc2hhZGVUZXh0dXJlLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpICtcbiAgICAgICh0aGlzLnNwaGVyZUFkZCAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbignc3BoZXJlQWRkVGV4ZWxUb0xpbmVhcicsIHRoaXMuc3BoZXJlQWRkLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpICtcbiAgICAgICh0aGlzLnJpbVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oJ3JpbVRleHR1cmVUZXhlbFRvTGluZWFyJywgdGhpcy5yaW1UZXh0dXJlLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpO1xuXG4gICAgLy8gPT0gZ2VuZXJhdGUgc2hhZGVyIGNvZGUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudmVydGV4U2hhZGVyID0gdmVydGV4U2hhZGVyO1xuICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBlbmNvZGluZ3MgKyBmcmFnbWVudFNoYWRlcjtcblxuICAgIC8vID09IHNldCBuZWVkc1VwZGF0ZSBmbGFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUN1bGxGYWNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc091dGxpbmUpIHtcbiAgICAgIGlmICh0aGlzLmN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuT2ZmKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udCkge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2spIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRnJvbnRTaWRlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5PZmYpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udCkge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5CYWNrKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkZyb250U2lkZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy91bmxpdC52ZXJ0JztcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvdW5saXQuZnJhZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNVW5saXRNYXRlcmlhbFBhcmFtZXRlcnMgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMge1xuICBjdXRvZmY/OiBudW1iZXI7IC8vIF9DdXRvZmZcbiAgbWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX01haW5UZXhcbiAgbWFpblRleD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4ICh3aWxsIGJlIHJlbmFtZWQgdG8gbWFwKVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIG1haW5UZXhfU1Q/OiBUSFJFRS5WZWN0b3I0OyAvLyBfTWFpblRleF9TVFxuXG4gIHJlbmRlclR5cGU/OiBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUge1xuICBPcGFxdWUsXG4gIEN1dG91dCxcbiAgVHJhbnNwYXJlbnQsXG4gIFRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgbWF0ZXJpYWwgdGhhdCBpcyBhbiBlcXVpdmFsZW50IG9mIFwiVlJNL1VubGl0KioqXCIgb24gVlJNIHNwZWMsIHRob3NlIG1hdGVyaWFscyBhcmUgYWxyZWFkeSBraW5kYSBkZXByZWNhdGVkIHRob3VnaC4uLlxuICovXG5leHBvcnQgY2xhc3MgVlJNVW5saXRNYXRlcmlhbCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIFtbVlJNVW5saXRNYXRlcmlhbF1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlzVlJNVW5saXRNYXRlcmlhbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIGN1dG9mZiA9IDAuNTtcbiAgcHVibGljIG1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfTWFpblRleFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIHB1YmxpYyBtYWluVGV4X1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX01haW5UZXhfU1RcbiAgcHJpdmF0ZSBfcmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLk9wYXF1ZTtcblxuICBwdWJsaWMgc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7IC8vIHdoZW4gdGhpcyBpcyB0cnVlLCBhcHBseVVuaWZvcm1zIGVmZmVjdHNcblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzPzogVlJNVW5saXRNYXRlcmlhbFBhcmFtZXRlcnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHBhcmFtZXRlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1ldGVycyA9IHt9O1xuICAgIH1cblxuICAgIC8vID09IGVuYWJsaW5nIGJ1bmNoIG9mIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLmZvZyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XG5cbiAgICBwYXJhbWV0ZXJzLnNraW5uaW5nID0gcGFyYW1ldGVycy5za2lubmluZyB8fCBmYWxzZTtcbiAgICBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyA9IHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzID0gcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW1xuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLCAvLyBtYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmZvZyxcbiAgICAgIHtcbiAgICAgICAgY3V0b2ZmOiB7IHZhbHVlOiAwLjUgfSxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBtYWluVGV4X1NUOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApIH0sXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XG4gIH1cblxuICBnZXQgbWFpblRleCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFwO1xuICB9XG5cbiAgc2V0IG1haW5UZXgodDogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLm1hcCA9IHQ7XG4gIH1cblxuICBnZXQgcmVuZGVyVHlwZSgpOiBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclR5cGU7XG4gIH1cblxuICBzZXQgcmVuZGVyVHlwZSh0OiBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSkge1xuICAgIHRoaXMuX3JlbmRlclR5cGUgPSB0O1xuXG4gICAgdGhpcy5kZXB0aFdyaXRlID0gdGhpcy5fcmVuZGVyVHlwZSAhPT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQ7XG4gICAgdGhpcy50cmFuc3BhcmVudCA9XG4gICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudCB8fFxuICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBtYXRlcmlhbC5cbiAgICogVXN1YWxseSB0aGlzIHdpbGwgYmUgY2FsbGVkIHZpYSBbW1ZSTS51cGRhdGVdXSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byBjYWxsIHRoaXMgbWFudWFsbHkuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUgc2luY2UgbGFzdCB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVWUk1NYXRlcmlhbHMoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1dG9mZiA9IHNvdXJjZS5jdXRvZmY7XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubWFpblRleF9TVC5jb3B5KHNvdXJjZS5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnJlbmRlclR5cGUgPSBzb3VyY2UucmVuZGVyVHlwZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHVwZGF0ZWQgdW5pZm9ybSB2YXJpYWJsZXMuXG4gICAqL1xuICBwcml2YXRlIF9hcHBseVVuaWZvcm1zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IGZhbHNlO1xuXG4gICAgdGhpcy51bmlmb3Jtcy5jdXRvZmYudmFsdWUgPSB0aGlzLmN1dG9mZjtcbiAgICB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZSA9IHRoaXMubWFwO1xuICAgIHRoaXMudW5pZm9ybXMubWFpblRleF9TVC52YWx1ZS5jb3B5KHRoaXMubWFpblRleF9TVCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaGFkZXJDb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVmaW5lcyA9IHtcbiAgICAgIFJFTkRFUlRZUEVfT1BBUVVFOiB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWUsXG4gICAgICBSRU5ERVJUWVBFX0NVVE9VVDogdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuQ3V0b3V0LFxuICAgICAgUkVOREVSVFlQRV9UUkFOU1BBUkVOVDpcbiAgICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxuICAgIH07XG5cbiAgICB0aGlzLnZlcnRleFNoYWRlciA9IHZlcnRleFNoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAvLyA9PSBzZXQgbmVlZHNVcGRhdGUgZmxhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IEdMVEZTY2hlbWEsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWwsIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIH0gZnJvbSAnLi9NVG9vbk1hdGVyaWFsJztcbmltcG9ydCB7IFZSTVVubGl0TWF0ZXJpYWwsIFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlIH0gZnJvbSAnLi9WUk1VbmxpdE1hdGVyaWFsJztcblxuLyoqXG4gKiBPcHRpb25zIGZvciBhIFtbVlJNTWF0ZXJpYWxJbXBvcnRlcl1dIGluc3RhbmNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZSTU1hdGVyaWFsSW1wb3J0ZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGVuY29kaW5nIG9mIGlucHV0IHVuaWZvcm0gY29sb3JzIGFuZCB0ZXh0dXJlcy5cbiAgICpcbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AuXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5zUkdCRW5jb2RpbmdgLCB1c2UgYFRIUkVFLnNSR0JFbmNvZGluZ2AuXG4gICAqXG4gICAqIFRoZSBpbXBvcnRlciB3aWxsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgIGlmIHRoaXMgb3B0aW9uIGlzbid0IHNwZWNpZmllZC5cbiAgICpcbiAgICogU2VlIGFsc286IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL3JlbmRlcmVycy9XZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nXG4gICAqL1xuICBlbmNvZGluZz86IFRIUkVFLlRleHR1cmVFbmNvZGluZztcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBgUHJvbWlzZWAgb2YgZW52aXJvbm1lbnQgbWFwIHRleHR1cmUuXG4gICAqIFRoZSBpbXBvcnRlciB3aWxsIGF0dGVtcHQgdG8gY2FsbCB0aGlzIGZ1bmN0aW9uIHdoZW4gaXQgaGF2ZSB0byB1c2UgYW4gZW52bWFwLlxuICAgKi9cbiAgcmVxdWVzdEVudk1hcD86ICgpID0+IFByb21pc2U8VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xufVxuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBWUk0gbWF0ZXJpYWxzIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTU1hdGVyaWFsSW1wb3J0ZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IF9lbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IF9yZXF1ZXN0RW52TWFwPzogKCkgPT4gUHJvbWlzZTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1NYXRlcmlhbEltcG9ydGVyLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIG9mIHRoZSBWUk1NYXRlcmlhbEltcG9ydGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBWUk1NYXRlcmlhbEltcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5fZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nIHx8IFRIUkVFLkxpbmVhckVuY29kaW5nO1xuICAgIGlmICh0aGlzLl9lbmNvZGluZyAhPT0gVEhSRUUuTGluZWFyRW5jb2RpbmcgJiYgdGhpcy5fZW5jb2RpbmcgIT09IFRIUkVFLnNSR0JFbmNvZGluZykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVGhlIHNwZWNpZmllZCBjb2xvciBlbmNvZGluZyBtaWdodCBub3Qgd29yayBwcm9wZXJseSB3aXRoIFZSTU1hdGVyaWFsSW1wb3J0ZXIuIFlvdSBtaWdodCB3YW50IHRvIHVzZSBUSFJFRS5zUkdCRW5jb2RpbmcgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXF1ZXN0RW52TWFwID0gb3B0aW9ucy5yZXF1ZXN0RW52TWFwO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYWxsIHRoZSBtYXRlcmlhbHMgb2YgZ2l2ZW4gR0xURiBiYXNlZCBvbiBWUk0gZXh0ZW5zaW9uIGZpZWxkIGBtYXRlcmlhbFByb3BlcnRpZXNgLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmOiBHTFRGKTogUHJvbWlzZTxUSFJFRS5NYXRlcmlhbFtdIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRlcmlhbFByb3BlcnRpZXM6IFZSTVNjaGVtYS5NYXRlcmlhbFtdIHwgdW5kZWZpbmVkID0gdnJtRXh0Lm1hdGVyaWFsUHJvcGVydGllcztcbiAgICBpZiAoIW1hdGVyaWFsUHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG4gICAgY29uc3QgbWF0ZXJpYWxMaXN0OiB7IFt2cm1NYXRlcmlhbEluZGV4OiBudW1iZXJdOiB7IHN1cmZhY2U6IFRIUkVFLk1hdGVyaWFsOyBvdXRsaW5lPzogVEhSRUUuTWF0ZXJpYWwgfSB9ID0ge307XG4gICAgY29uc3QgbWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107IC8vIHJlc3VsdFxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkubWFwKGFzeW5jIChbbm9kZUluZGV4LCBwcmltaXRpdmVzXSkgPT4ge1xuICAgICAgICBjb25zdCBzY2hlbWFOb2RlOiBHTFRGU2NoZW1hLk5vZGUgPSBnbHRmLnBhcnNlci5qc29uLm5vZGVzW25vZGVJbmRleF07XG4gICAgICAgIGNvbnN0IHNjaGVtYU1lc2g6IEdMVEZTY2hlbWEuTWVzaCA9IGdsdGYucGFyc2VyLmpzb24ubWVzaGVzW3NjaGVtYU5vZGUubWVzaCFdO1xuXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIHByaW1pdGl2ZXMubWFwKGFzeW5jIChwcmltaXRpdmUsIHByaW1pdGl2ZUluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY2hlbWFQcmltaXRpdmUgPSBzY2hlbWFNZXNoLnByaW1pdGl2ZXNbcHJpbWl0aXZlSW5kZXhdO1xuXG4gICAgICAgICAgICAvLyBzb21lIGdsVEYgbWlnaHQgaGF2ZSBib3RoIGBub2RlLm1lc2hgIGFuZCBgbm9kZS5jaGlsZHJlbmAgYXQgb25jZVxuICAgICAgICAgICAgLy8gYW5kIEdMVEZMb2FkZXIgaGFuZGxlcyBib3RoIG1lc2ggcHJpbWl0aXZlcyBhbmQgXCJjaGlsZHJlblwiIGluIGdsVEYgYXMgXCJjaGlsZHJlblwiIGluIFRIUkVFXG4gICAgICAgICAgICAvLyBJdCBzZWVtcyBHTFRGTG9hZGVyIGhhbmRsZXMgcHJpbWl0aXZlcyBmaXJzdCB0aGVuIGhhbmRsZXMgXCJjaGlsZHJlblwiIGluIGdsVEYgKGl0J3MgbHVja3khKVxuICAgICAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGlnbm9yZSAocHJpbWl0aXZlcy5sZW5ndGgpdGggYW5kIGZvbGxvd2luZyBjaGlsZHJlbiBvZiBgbWVzaC5jaGlsZHJlbmBcbiAgICAgICAgICAgIC8vIFRPRE86IHNhbml0aXplIHRoaXMgYWZ0ZXIgR0xURkxvYWRlciBwbHVnaW4gc3lzdGVtIGdldHMgaW50cm9kdWNlZCA6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xODQyMVxuICAgICAgICAgICAgaWYgKCFzY2hlbWFQcmltaXRpdmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmVHZW9tZXRyeSA9IHByaW1pdGl2ZS5nZW9tZXRyeTtcbiAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZVZlcnRpY2VzID0gcHJpbWl0aXZlR2VvbWV0cnkuaW5kZXhcbiAgICAgICAgICAgICAgPyBwcmltaXRpdmVHZW9tZXRyeS5pbmRleC5jb3VudFxuICAgICAgICAgICAgICA6IHByaW1pdGl2ZUdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQgLyAzO1xuXG4gICAgICAgICAgICAvLyBpZiBwcmltaXRpdmVzIG1hdGVyaWFsIGlzIG5vdCBhbiBhcnJheSwgbWFrZSBpdCBhbiBhcnJheVxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlLm1hdGVyaWFsID0gW3ByaW1pdGl2ZS5tYXRlcmlhbF07XG4gICAgICAgICAgICAgIHByaW1pdGl2ZUdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY3JlYXRlIC8gcHVzaCB0byBjYWNoZSAob3IgcG9wIGZyb20gY2FjaGUpIHZybSBtYXRlcmlhbHNcbiAgICAgICAgICAgIGNvbnN0IHZybU1hdGVyaWFsSW5kZXggPSBzY2hlbWFQcmltaXRpdmUubWF0ZXJpYWwhO1xuXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSBtYXRlcmlhbFByb3BlcnRpZXNbdnJtTWF0ZXJpYWxJbmRleF07XG4gICAgICAgICAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgVlJNTWF0ZXJpYWxJbXBvcnRlcjogVGhlcmUgYXJlIG5vIG1hdGVyaWFsIGRlZmluaXRpb24gZm9yIG1hdGVyaWFsICMke3ZybU1hdGVyaWFsSW5kZXh9IG9uIFZSTSBleHRlbnNpb24uYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcHJvcHMgPSB7IHNoYWRlcjogJ1ZSTV9VU0VfR0xURlNIQURFUicgfTsgLy8gZmFsbGJhY2tcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHZybU1hdGVyaWFsczogeyBzdXJmYWNlOiBUSFJFRS5NYXRlcmlhbDsgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsIH07XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWxMaXN0W3ZybU1hdGVyaWFsSW5kZXhdKSB7XG4gICAgICAgICAgICAgIHZybU1hdGVyaWFscyA9IG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZybU1hdGVyaWFscyA9IGF3YWl0IHRoaXMuY3JlYXRlVlJNTWF0ZXJpYWxzKHByaW1pdGl2ZS5tYXRlcmlhbFswXSwgcHJvcHMsIGdsdGYpO1xuICAgICAgICAgICAgICBtYXRlcmlhbExpc3RbdnJtTWF0ZXJpYWxJbmRleF0gPSB2cm1NYXRlcmlhbHM7XG5cbiAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2godnJtTWF0ZXJpYWxzLnN1cmZhY2UpO1xuICAgICAgICAgICAgICBpZiAodnJtTWF0ZXJpYWxzLm91dGxpbmUpIHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaCh2cm1NYXRlcmlhbHMub3V0bGluZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc3VyZmFjZVxuICAgICAgICAgICAgcHJpbWl0aXZlLm1hdGVyaWFsWzBdID0gdnJtTWF0ZXJpYWxzLnN1cmZhY2U7XG5cbiAgICAgICAgICAgIC8vIGVudm1hcFxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3RFbnZNYXAgJiYgKHZybU1hdGVyaWFscy5zdXJmYWNlIGFzIGFueSkuaXNNZXNoU3RhbmRhcmRNYXRlcmlhbCkge1xuICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0RW52TWFwKCkudGhlbigoZW52TWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgKHZybU1hdGVyaWFscy5zdXJmYWNlIGFzIGFueSkuZW52TWFwID0gZW52TWFwO1xuICAgICAgICAgICAgICAgIHZybU1hdGVyaWFscy5zdXJmYWNlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbmRlciBvcmRlclxuICAgICAgICAgICAgcHJpbWl0aXZlLnJlbmRlck9yZGVyID0gcHJvcHMucmVuZGVyUXVldWUgfHwgMjAwMDtcblxuICAgICAgICAgICAgLy8gb3V0bGluZSAoXCIyIHBhc3Mgc2hhZGluZyB1c2luZyBncm91cHNcIiB0cmljayBoZXJlKVxuICAgICAgICAgICAgaWYgKHZybU1hdGVyaWFscy5vdXRsaW5lKSB7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbFsxXSA9IHZybU1hdGVyaWFscy5vdXRsaW5lO1xuICAgICAgICAgICAgICBwcmltaXRpdmVHZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIG1hdGVyaWFscztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjcmVhdGVWUk1NYXRlcmlhbHMoXG4gICAgb3JpZ2luYWxNYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwsXG4gICAgdnJtUHJvcHM6IFZSTVNjaGVtYS5NYXRlcmlhbCxcbiAgICBnbHRmOiBHTFRGLFxuICApOiBQcm9taXNlPHtcbiAgICBzdXJmYWNlOiBUSFJFRS5NYXRlcmlhbDtcbiAgICBvdXRsaW5lPzogVEhSRUUuTWF0ZXJpYWw7XG4gIH0+IHtcbiAgICBsZXQgbmV3U3VyZmFjZTogVEhSRUUuTWF0ZXJpYWwgfCB1bmRlZmluZWQ7XG4gICAgbGV0IG5ld091dGxpbmU6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9NVG9vbicpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuXG4gICAgICAvLyB3ZSBuZWVkIHRvIGdldCByaWQgb2YgdGhlc2UgcHJvcGVydGllc1xuICAgICAgWydzcmNCbGVuZCcsICdkc3RCbGVuZCcsICdpc0ZpcnN0U2V0dXAnXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGlmIChwYXJhbXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBwYXJhbXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGVzZSB0ZXh0dXJlcyBtdXN0IGJlIHNSR0IgRW5jb2RpbmcsIGRlcGVuZHMgb24gY3VycmVudCBjb2xvcnNwYWNlXG4gICAgICBbJ21haW5UZXgnLCAnc2hhZGVUZXh0dXJlJywgJ2VtaXNzaW9uTWFwJywgJ3NwaGVyZUFkZCcsICdyaW1UZXh0dXJlJ10uZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAocGFyYW1zW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXJhbXNbbmFtZV0uZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNwZWNpZnkgdW5pZm9ybSBjb2xvciBlbmNvZGluZ3NcbiAgICAgIHBhcmFtcy5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuXG4gICAgICAvLyBkb25lXG4gICAgICBuZXdTdXJmYWNlID0gbmV3IE1Ub29uTWF0ZXJpYWwocGFyYW1zKTtcblxuICAgICAgLy8gb3V0bGluZVxuICAgICAgaWYgKHBhcmFtcy5vdXRsaW5lV2lkdGhNb2RlICE9PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lKSB7XG4gICAgICAgIHBhcmFtcy5pc091dGxpbmUgPSB0cnVlO1xuICAgICAgICBuZXdPdXRsaW5lID0gbmV3IE1Ub29uTWF0ZXJpYWwocGFyYW1zKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRleHR1cmUnKSB7XG4gICAgICAvLyB0aGlzIGlzIHZlcnkgbGVnYWN5XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuT3BhcXVlO1xuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRDdXRvdXQnKSB7XG4gICAgICAvLyB0aGlzIGlzIHZlcnkgbGVnYWN5XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuQ3V0b3V0O1xuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudCcpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudDtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnRaV3JpdGUnKSB7XG4gICAgICAvLyB0aGlzIGlzIHZlcnkgbGVnYWN5XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsKHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2cm1Qcm9wcy5zaGFkZXIgIT09ICdWUk1fVVNFX0dMVEZTSEFERVInKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgVW5rbm93biBzaGFkZXIgZGV0ZWN0ZWQ6IFwiJHt2cm1Qcm9wcy5zaGFkZXJ9XCJgKTtcbiAgICAgICAgLy8gdGhlbiBwcmVzdW1lIGFzIFZSTV9VU0VfR0xURlNIQURFUlxuICAgICAgfVxuXG4gICAgICBuZXdTdXJmYWNlID0gdGhpcy5fY29udmVydEdMVEZNYXRlcmlhbChvcmlnaW5hbE1hdGVyaWFsLmNsb25lKCkpO1xuICAgIH1cblxuICAgIG5ld1N1cmZhY2UubmFtZSA9IG9yaWdpbmFsTWF0ZXJpYWwubmFtZTtcbiAgICBuZXdTdXJmYWNlLnVzZXJEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvcmlnaW5hbE1hdGVyaWFsLnVzZXJEYXRhKSk7XG4gICAgbmV3U3VyZmFjZS51c2VyRGF0YS52cm1NYXRlcmlhbFByb3BlcnRpZXMgPSB2cm1Qcm9wcztcblxuICAgIGlmIChuZXdPdXRsaW5lKSB7XG4gICAgICBuZXdPdXRsaW5lLm5hbWUgPSBvcmlnaW5hbE1hdGVyaWFsLm5hbWUgKyAnIChPdXRsaW5lKSc7XG4gICAgICBuZXdPdXRsaW5lLnVzZXJEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvcmlnaW5hbE1hdGVyaWFsLnVzZXJEYXRhKSk7XG4gICAgICBuZXdPdXRsaW5lLnVzZXJEYXRhLnZybU1hdGVyaWFsUHJvcGVydGllcyA9IHZybVByb3BzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdXJmYWNlOiBuZXdTdXJmYWNlLFxuICAgICAgb3V0bGluZTogbmV3T3V0bGluZSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzOiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMSk7XG5cbiAgICBpZiAoIS9bQS1aXS8udGVzdChuYW1lWzBdKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NYXRlcmlhbHM6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnZlcnRHTFRGTWF0ZXJpYWwobWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKTogVEhSRUUuTWF0ZXJpYWwge1xuICAgIGlmICgobWF0ZXJpYWwgYXMgYW55KS5pc01lc2hTdGFuZGFyZE1hdGVyaWFsKSB7XG4gICAgICBjb25zdCBtdGwgPSBtYXRlcmlhbCBhcyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbDtcblxuICAgICAgaWYgKG10bC5tYXApIHtcbiAgICAgICAgbXRsLm1hcC5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuICAgICAgfVxuICAgICAgaWYgKG10bC5lbWlzc2l2ZU1hcCkge1xuICAgICAgICBtdGwuZW1pc3NpdmVNYXAuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VuY29kaW5nID09PSBUSFJFRS5MaW5lYXJFbmNvZGluZykge1xuICAgICAgICBtdGwuY29sb3IuY29udmVydExpbmVhclRvU1JHQigpO1xuICAgICAgICBtdGwuZW1pc3NpdmUuY29udmVydExpbmVhclRvU1JHQigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgobWF0ZXJpYWwgYXMgYW55KS5pc01lc2hCYXNpY01hdGVyaWFsKSB7XG4gICAgICBjb25zdCBtdGwgPSBtYXRlcmlhbCBhcyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbDtcblxuICAgICAgaWYgKG10bC5tYXApIHtcbiAgICAgICAgbXRsLm1hcC5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZW5jb2RpbmcgPT09IFRIUkVFLkxpbmVhckVuY29kaW5nKSB7XG4gICAgICAgIG10bC5jb2xvci5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGVyaWFsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhcbiAgICBvcmlnaW5hbE1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCxcbiAgICB2cm1Qcm9wczogVlJNU2NoZW1hLk1hdGVyaWFsLFxuICAgIGdsdGY6IEdMVEYsXG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFza0xpc3Q6IEFycmF5PFByb21pc2U8YW55Pj4gPSBbXTtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgLy8gZXh0cmFjdCB0ZXh0dXJlIHByb3BlcnRpZXNcbiAgICBpZiAodnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXMpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyh2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllcykpIHtcbiAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRoaXMuX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG4gICAgICAgIGNvbnN0IHRleHR1cmVJbmRleCA9IHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzW25hbWVdO1xuXG4gICAgICAgIHRhc2tMaXN0LnB1c2goXG4gICAgICAgICAgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHRleHR1cmVJbmRleCkudGhlbigodGV4dHVyZTogVEhSRUUuVGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1zW25ld05hbWVdID0gdGV4dHVyZTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYWN0IGZsb2F0IHByb3BlcnRpZXNcbiAgICBpZiAodnJtUHJvcHMuZmxvYXRQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMuZmxvYXRQcm9wZXJ0aWVzKSkge1xuICAgICAgICBjb25zdCBuZXdOYW1lID0gdGhpcy5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcbiAgICAgICAgcGFyYW1zW25ld05hbWVdID0gdnJtUHJvcHMuZmxvYXRQcm9wZXJ0aWVzW25hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4dHJhY3QgdmVjdG9yIChjb2xvciB0YmgpIHByb3BlcnRpZXNcbiAgICBpZiAodnJtUHJvcHMudmVjdG9yUHJvcGVydGllcykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHZybVByb3BzLnZlY3RvclByb3BlcnRpZXMpKSB7XG4gICAgICAgIGxldCBuZXdOYW1lID0gdGhpcy5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcblxuICAgICAgICAvLyBpZiB0aGlzIGlzIHRleHR1cmVTVCAoc2FtZSBuYW1lIGFzIHRleHR1cmUgbmFtZSBpdHNlbGYpLCBhZGQgJ19TVCdcbiAgICAgICAgY29uc3QgaXNUZXh0dXJlU1QgPSBbXG4gICAgICAgICAgJ19NYWluVGV4JyxcbiAgICAgICAgICAnX1NoYWRlVGV4dHVyZScsXG4gICAgICAgICAgJ19CdW1wTWFwJyxcbiAgICAgICAgICAnX1JlY2VpdmVTaGFkb3dUZXh0dXJlJyxcbiAgICAgICAgICAnX1NoYWRpbmdHcmFkZVRleHR1cmUnLFxuICAgICAgICAgICdfUmltVGV4dHVyZScsXG4gICAgICAgICAgJ19TcGhlcmVBZGQnLFxuICAgICAgICAgICdfRW1pc3Npb25NYXAnLFxuICAgICAgICAgICdfT3V0bGluZVdpZHRoVGV4dHVyZScsXG4gICAgICAgICAgJ19VdkFuaW1NYXNrVGV4dHVyZScsXG4gICAgICAgIF0uc29tZSgodGV4dHVyZU5hbWUpID0+IG5hbWUgPT09IHRleHR1cmVOYW1lKTtcbiAgICAgICAgaWYgKGlzVGV4dHVyZVNUKSB7XG4gICAgICAgICAgbmV3TmFtZSArPSAnX1NUJztcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IG5ldyBUSFJFRS5WZWN0b3I0KC4uLnZybVByb3BzLnZlY3RvclByb3BlcnRpZXNbbmFtZV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCB3aGV0aGVyIGl0IG5lZWRzIHNraW5uaW5nIGFuZCBtb3JwaGluZyBvciBub3RcbiAgICBwYXJhbXMuc2tpbm5pbmcgPSAob3JpZ2luYWxNYXRlcmlhbCBhcyBhbnkpLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5tb3JwaFRhcmdldHMgPSAob3JpZ2luYWxNYXRlcmlhbCBhcyBhbnkpLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcbiAgICBwYXJhbXMubW9ycGhOb3JtYWxzID0gKG9yaWdpbmFsTWF0ZXJpYWwgYXMgYW55KS5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGFza0xpc3QpLnRoZW4oKCkgPT4gcGFyYW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vVlJNTWV0YSc7XG5pbXBvcnQgeyBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zIH0gZnJvbSAnLi9WUk1NZXRhSW1wb3J0ZXJPcHRpb25zJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNTWV0YX0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTWV0YUltcG9ydGVyIHtcbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgaXQgd29uJ3QgbG9hZCBpdHMgdGh1bWJuYWlsIHRleHR1cmUgKHtAbGluayBWUk1NZXRhLnRleHR1cmV9KS4gYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGlnbm9yZVRleHR1cmU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IFZSTU1ldGFJbXBvcnRlck9wdGlvbnMpIHtcbiAgICB0aGlzLmlnbm9yZVRleHR1cmUgPSBvcHRpb25zPy5pZ25vcmVUZXh0dXJlID8/IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFNZXRhOiBWUk1TY2hlbWEuTWV0YSB8IHVuZGVmaW5lZCA9IHZybUV4dC5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdGhpcy5pZ25vcmVUZXh0dXJlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWxsb3dlZFVzZXJOYW1lOiBzY2hlbWFNZXRhLmFsbG93ZWRVc2VyTmFtZSxcbiAgICAgIGF1dGhvcjogc2NoZW1hTWV0YS5hdXRob3IsXG4gICAgICBjb21tZXJjaWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5jb21tZXJjaWFsVXNzYWdlTmFtZSxcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICBsaWNlbnNlTmFtZTogc2NoZW1hTWV0YS5saWNlbnNlTmFtZSxcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgICBvdGhlclBlcm1pc3Npb25Vcmw6IHNjaGVtYU1ldGEub3RoZXJQZXJtaXNzaW9uVXJsLFxuICAgICAgcmVmZXJlbmNlOiBzY2hlbWFNZXRhLnJlZmVyZW5jZSxcbiAgICAgIHNleHVhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuc2V4dWFsVXNzYWdlTmFtZSxcbiAgICAgIHRleHR1cmU6IHRleHR1cmUgPz8gdW5kZWZpbmVkLFxuICAgICAgdGl0bGU6IHNjaGVtYU1ldGEudGl0bGUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICB2aW9sZW50VXNzYWdlTmFtZTogc2NoZW1hTWV0YS52aW9sZW50VXNzYWdlTmFtZSxcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9tYXRBID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYE1hdHJpeDQuaW52ZXJ0KClgIC8gYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYC5cbiAqIGBNYXRyaXg0LmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBNYXRyaXg0LmdldEludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgbWF0cml4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5NYXRyaXg0Pih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmdldEludmVyc2UoX21hdEEuY29weSh0YXJnZXQpKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBtYXQ0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi9tYXQ0SW52ZXJ0Q29tcGF0JztcblxuZXhwb3J0IGNsYXNzIE1hdHJpeDRJbnZlcnNlQ2FjaGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRyaXguXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0cml4OiBUSFJFRS5NYXRyaXg0O1xuXG4gIC8qKlxuICAgKiBBIGNhY2hlIG9mIGludmVyc2Ugb2YgY3VycmVudCBtYXRyaXguXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9pbnZlcnNlQ2FjaGUgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdGhhdCBtYWtlcyBpdCB3YW50IHRvIHJlY2FsY3VsYXRlIGl0cyB7QGxpbmsgX2ludmVyc2VDYWNoZX0uXG4gICAqIFdpbGwgYmUgc2V0IGB0cnVlYCB3aGVuIGBlbGVtZW50c2AgYXJlIG11dGF0ZWQgYW5kIGJlIHVzZWQgaW4gYGdldEludmVyc2VgLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW5hbCBvZiBgbWF0cml4LmVsZW1lbnRzYFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfb3JpZ2luYWxFbGVtZW50czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEludmVyc2Ugb2YgZ2l2ZW4gbWF0cml4LlxuICAgKiBOb3RlIHRoYXQgaXQgd2lsbCByZXR1cm4gaXRzIGludGVybmFsIHByaXZhdGUgaW5zdGFuY2UuXG4gICAqIE1ha2Ugc3VyZSBjb3B5aW5nIHRoaXMgYmVmb3JlIG11dGF0ZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnZlcnNlKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XG4gICAgICBtYXQ0SW52ZXJ0Q29tcGF0KHRoaXMuX2ludmVyc2VDYWNoZS5jb3B5KHRoaXMubWF0cml4KSk7XG4gICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRyaXg6IFRIUkVFLk1hdHJpeDQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuICAgIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxudW1iZXJbXT4gPSB7XG4gICAgICBzZXQ6IChvYmosIHByb3A6IG51bWJlciwgbmV3VmFsKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuICAgIG1hdHJpeC5lbGVtZW50cyA9IG5ldyBQcm94eShtYXRyaXguZWxlbWVudHMsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJldmVydCgpOiB2b2lkIHtcbiAgICB0aGlzLm1hdHJpeC5lbGVtZW50cyA9IHRoaXMuX29yaWdpbmFsRWxlbWVudHM7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9tYXQ0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcbmltcG9ydCB7IE1hdHJpeDRJbnZlcnNlQ2FjaGUgfSBmcm9tICcuLi91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2ggfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG4vLyBiYXNlZCBvblxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcblxuY29uc3QgSURFTlRJVFlfTUFUUklYNCA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLk1hdHJpeDQoKSk7XG5jb25zdCBJREVOVElUWV9RVUFURVJOSU9OID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuUXVhdGVybmlvbigpKTtcblxuLy8g6KiI566X5Lit44Gu5LiA5pmC5L+d5a2Y55So5aSJ5pWw77yI5LiA5bqm44Kk44Oz44K544K/44Oz44K544KS5L2c44Gj44Gf44KJ44GC44Go44Gv5L2/44GE5Zue44GZ77yJXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuY29uc3QgX21hdEIgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBzcHJpbmcgYm9uZSBvZiBhIFZSTS5cbiAqIEl0IHNob3VsZCBiZSBtYW5hZ2VkIGJ5IGEgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZSB7XG4gIC8qKlxuICAgKiBSYWRpdXMgb2YgdGhlIGJvbmUsIHdpbGwgYmUgdXNlZCBmb3IgY29sbGlzaW9uLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdGlmZm5lc3MgZm9yY2Ugb2YgdGhlIGJvbmUuIEluY3JlYXNpbmcgdGhlIHZhbHVlID0gZmFzdGVyIGNvbnZlcmdlbmNlIChmZWVscyBcImhhcmRlclwiKS5cbiAgICogT24gVW5pVlJNLCBpdHMgcmFuZ2Ugb24gR1VJIGlzIGJldHdlZW4gYDAuMGAgYW5kIGA0LjBgIC5cbiAgICovXG4gIHB1YmxpYyBzdGlmZm5lc3NGb3JjZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBQb3dlciBvZiB0aGUgZ3Jhdml0eSBhZ2FpbnN0IHRoaXMgYm9uZS5cbiAgICogVGhlIFwicG93ZXJcIiB1c2VkIGluIGhlcmUgaXMgdmVyeSBmYXIgZnJvbSBzY2llbnRpZmljIHBoeXNpY3MgdGVybS4uLlxuICAgKi9cbiAgcHVibGljIGdyYXZpdHlQb3dlcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBEaXJlY3Rpb24gb2YgdGhlIGdyYXZpdHkgYWdhaW5zdCB0aGlzIGJvbmUuXG4gICAqIFVzdWFsbHkgaXQgc2hvdWxkIGJlIG5vcm1hbGl6ZWQuXG4gICAqL1xuICBwdWJsaWMgZ3Jhdml0eURpcjogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogRHJhZyBmb3JjZSBvZiB0aGUgYm9uZS4gSW5jcmVhc2luZyB0aGUgdmFsdWUgPSBsZXNzIG9zY2lsbGF0aW9uIChmZWVscyBcImhlYXZpZXJcIikuXG4gICAqIE9uIFVuaVZSTSwgaXRzIHJhbmdlIG9uIEdVSSBpcyBiZXR3ZWVuIGAwLjBgIGFuZCBgMS4wYCAuXG4gICAqL1xuICBwdWJsaWMgZHJhZ0ZvcmNlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENvbGxpZGVyIGdyb3VwcyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgY29sbGlkZXJzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoW107XG5cbiAgLyoqXG4gICAqIEFuIE9iamVjdDNEIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBib25lOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogQ3VycmVudCBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiB3b3JsZCB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiB3b3JsZCB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBfcHJldlRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBOZXh0IHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKiBBY3R1YWxseSB1c2VkIG9ubHkgaW4gW1t1cGRhdGVdXSBhbmQgaXQncyBraW5kIG9mIHRlbXBvcmFyeSB2YXJpYWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmV4dFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGF4aXMgb2YgdGhlIGJvbmUsIGluIGxvY2FsIHVuaXQuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2JvbmVBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHJlbGF0aXZlIHNwYWNlIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3Igbm9ybWFsaXphdGlvbiBpbiB1cGRhdGUgbG9vcC5cbiAgICogSXQncyBzYW1lIGFzIGxvY2FsIHVuaXQgbGVuZ3RoIHVubGVzcyB0aGVyZSBhcmUgc2NhbGUgdHJhbnNmb3JtYXRpb24gaW4gd29ybGQgbWF0cml4LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jZW50ZXJTcGFjZUJvbmVMZW5ndGg6IG51bWJlcjtcblxuICAvKipcbiAgICogUG9zaXRpb24gb2YgdGhpcyBib25lIGluIHJlbGF0aXZlIHNwYWNlLCBraW5kIG9mIGEgdGVtcG9yYXJ5IHZhcmlhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jZW50ZXJTcGFjZVBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogVGhpcyBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgY2VudGVyKCk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcbiAgfVxuICBwdWJsaWMgc2V0IGNlbnRlcihjZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCkge1xuICAgIC8vIGNvbnZlcnQgdGFpbHMgdG8gd29ybGQgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKF9tYXRBKTtcblxuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fcHJldlRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuXG4gICAgLy8gdW5pbnN0YWxsIGludmVyc2UgY2FjaGVcbiAgICBpZiAodGhpcy5fY2VudGVyPy51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xuICAgICAgKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5yZXZlcnQoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHk7XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHRoZSBjZW50ZXJcbiAgICB0aGlzLl9jZW50ZXIgPSBjZW50ZXI7XG5cbiAgICAvLyBpbnN0YWxsIGludmVyc2UgY2FjaGVcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICBpZiAoIXRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xuICAgICAgICB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgPSBuZXcgTWF0cml4NEludmVyc2VDYWNoZSh0aGlzLl9jZW50ZXIubWF0cml4V29ybGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgdGFpbHMgdG8gY2VudGVyIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG5cbiAgICB0aGlzLl9jdXJyZW50VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fbmV4dFRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcblxuICAgIC8vIGNvbnZlcnQgY2VudGVyIHNwYWNlIGRlcGVuZGFudCBzdGF0ZVxuICAgIF9tYXRBLm11bHRpcGx5KHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7IC8vIPCflKUgPz9cblxuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKF9tYXRBKTtcblxuICAgIHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0FcbiAgICAgIC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pXG4gICAgICAuYXBwbHlNYXRyaXg0KF9tYXRBKVxuICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgLmxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIG9mIHBhcmVudCBib25lLCBpbiB3b3JsZCB1bml0LlxuICAgKiBXZSBzaG91bGQgdXBkYXRlIHRoaXMgY29uc3RhbnRseSBpbiBbW3VwZGF0ZV1dLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIGxvY2FsIG1hdHJpeCBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTVNwcmluZ0JvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBib25lIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGlzIGJvbmVcbiAgICogQHBhcmFtIHBhcmFtcyBTZXZlcmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byBiZWhhdmlvciBvZiB0aGUgc3ByaW5nIGJvbmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGJvbmU6IFRIUkVFLk9iamVjdDNELCBwYXJhbXM6IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzID0ge30pIHtcbiAgICB0aGlzLmJvbmUgPSBib25lOyAvLyB1bmlWUk3jgafjga4gcGFyZW50XG4gICAgdGhpcy5ib25lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTsgLy8gdXBkYXRl44Gr44KI44KK6KiI566X44GV44KM44KL44Gu44GndGhyZWUuanPlhoXjgafjga7oh6rli5Xlh6bnkIbjga/kuI3opoFcblxuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zLnJhZGl1cyA/PyAwLjAyO1xuICAgIHRoaXMuc3RpZmZuZXNzRm9yY2UgPSBwYXJhbXMuc3RpZmZuZXNzRm9yY2UgPz8gMS4wO1xuICAgIHRoaXMuZ3Jhdml0eURpciA9IHBhcmFtcy5ncmF2aXR5RGlyXG4gICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKCkuY29weShwYXJhbXMuZ3Jhdml0eURpcilcbiAgICAgIDogbmV3IFRIUkVFLlZlY3RvcjMoKS5zZXQoMC4wLCAtMS4wLCAwLjApO1xuICAgIHRoaXMuZ3Jhdml0eVBvd2VyID0gcGFyYW1zLmdyYXZpdHlQb3dlciA/PyAwLjA7XG4gICAgdGhpcy5kcmFnRm9yY2UgPSBwYXJhbXMuZHJhZ0ZvcmNlID8/IDAuNDtcbiAgICB0aGlzLmNvbGxpZGVycyA9IHBhcmFtcy5jb2xsaWRlcnMgPz8gW107XG5cbiAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4LmNvcHkodGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24uY29weSh0aGlzLmJvbmUucXVhdGVybmlvbik7XG5cbiAgICBpZiAodGhpcy5ib25lLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8g5pyr56uv44Gu44Oc44O844Oz44CC5a2Q44Oc44O844Oz44GM44GE44Gq44GE44Gf44KB44CM6Ieq5YiG44Gu5bCR44GX5YWI44CN44GM5a2Q44Oc44O844Oz44Go44GE44GG44GT44Go44Gr44GZ44KLXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9Bc3NldHMvVlJNL1VuaVZSTS9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jcyNMMjQ2XG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkodGhpcy5ib25lLnBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcigwLjA3KTsgLy8gbWFnaWMgbnVtYmVyISBkZXJpdmVzIGZyb20gb3JpZ2luYWwgc291cmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmJvbmUuY2hpbGRyZW5bMF07XG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkoZmlyc3RDaGlsZC5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcblxuICAgIHRoaXMuX2JvbmVBeGlzLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgdGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQVxuICAgICAgLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbilcbiAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5ib25lLm1hdHJpeFdvcmxkKVxuICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5jZW50ZXIgPSBwYXJhbXMuY2VudGVyID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnJlc2V0XV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgLy8gQXBwbHkgdXBkYXRlZCBwb3NpdGlvbiB0byB0YWlsIHN0YXRlc1xuICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSk7XG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fbmV4dFRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwgW1tWUk1TcHJpbmdCb25lTWFuYWdlci51cGRhdGVdXSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGVsdGEgPD0gMCkgcmV0dXJuO1xuXG4gICAgLy8g6Kaq44K544OX44Oq44Oz44Kw44Oc44O844Oz44Gu5ae/5Yui44Gv5bi444Gr5aSJ5YyW44GX44Gm44GE44KL44CCXG4gICAgLy8g44Gd44KM44Gr5Z+644Gl44GE44Gm5Yem55CG55u05YmN44Gr6Ieq5YiG44Gud29ybGRNYXRyaXjjgpLmm7TmlrDjgZfjgabjgYrjgY9cbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcblxuICAgIGlmICh0aGlzLmJvbmUucGFyZW50KSB7XG4gICAgICAvLyBTcHJpbmdCb25l44Gv6Kaq44GL44KJ6aCG44Gr5Yem55CG44GV44KM44Gm44GE44GP44Gf44KB44CBXG4gICAgICAvLyDopqrjga5tYXRyaXhXb3JsZOOBr+acgOaWsOeKtuaFi+OBruWJjeaPkOOBp3dvcmxkTWF0cml444GL44KJcXVhdGVybmlvbuOCkuWPluOCiuWHuuOBmeOAglxuICAgICAgLy8g5Yi26ZmQ44Gv44GC44KL44GR44KM44Gp44CB6KiI566X44Gv5bCR44Gq44GE44Gu44GnZ2V0V29ybGRRdWF0ZXJuaW9u44Gn44Gv44Gq44GP44GT44Gu5pa55rOV44KS5Y+W44KL44CCXG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuYm9uZS5wYXJlbnQsIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uLmNvcHkoSURFTlRJVFlfUVVBVEVSTklPTik7XG4gICAgfVxuXG4gICAgLy8gR2V0IGJvbmUgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG4gICAgX21hdEEubXVsdGlwbHkodGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8g8J+UpSA/P1xuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKF9tYXRBKTtcblxuICAgIC8vIEdldCBwYXJlbnQgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0Qik7XG4gICAgX21hdEIubXVsdGlwbHkodGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSk7XG5cbiAgICAvLyBzZXZlcmFsIHBhcmFtZXRlcnNcbiAgICBjb25zdCBzdGlmZm5lc3MgPSB0aGlzLnN0aWZmbmVzc0ZvcmNlICogZGVsdGE7XG4gICAgY29uc3QgZXh0ZXJuYWwgPSBfdjNCLmNvcHkodGhpcy5ncmF2aXR5RGlyKS5tdWx0aXBseVNjYWxhcih0aGlzLmdyYXZpdHlQb3dlciAqIGRlbHRhKTtcblxuICAgIC8vIHZlcmxldOepjeWIhuOBp+asoeOBruS9jee9ruOCkuioiOeul1xuICAgIHRoaXMuX25leHRUYWlsXG4gICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoXG4gICAgICAgIF92M0FcbiAgICAgICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgICAgICAuc3ViKHRoaXMuX3ByZXZUYWlsKVxuICAgICAgICAgIC5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5kcmFnRm9yY2UpLFxuICAgICAgKSAvLyDliY3jg5Xjg6zjg7zjg6Djga7np7vli5XjgpLntpnntprjgZnjgoso5rib6KGw44KC44GC44KL44KIKVxuICAgICAgLmFkZChcbiAgICAgICAgX3YzQVxuICAgICAgICAgIC5jb3B5KHRoaXMuX2JvbmVBeGlzKVxuICAgICAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5faW5pdGlhbExvY2FsTWF0cml4KVxuICAgICAgICAgIC5hcHBseU1hdHJpeDQoX21hdEIpXG4gICAgICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihzdGlmZm5lc3MpLFxuICAgICAgKSAvLyDopqrjga7lm57ou6LjgavjgojjgovlrZDjg5zjg7zjg7Pjga7np7vli5Xnm67mqJlcbiAgICAgIC5hZGQoZXh0ZXJuYWwpOyAvLyDlpJblipvjgavjgojjgovnp7vli5Xph49cblxuICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgIHRoaXMuX25leHRUYWlsXG4gICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAubm9ybWFsaXplKClcbiAgICAgIC5tdWx0aXBseVNjYWxhcih0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGgpXG4gICAgICAuYWRkKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuXG4gICAgLy8gQ29sbGlzaW9u44Gn56e75YuVXG4gICAgdGhpcy5fY29sbGlzaW9uKHRoaXMuX25leHRUYWlsKTtcblxuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5fbmV4dFRhaWwpO1xuXG4gICAgLy8gQXBwbHkgcm90YXRpb24sIGNvbnZlcnQgdmVjdG9yMyB0aGluZyBpbnRvIGFjdHVhbCBxdWF0ZXJuaW9uXG4gICAgLy8gT3JpZ2luYWwgVW5pVlJNIGlzIGRvaW5nIHdvcmxkIHVuaXQgY2FsY3VsdXMgYXQgaGVyZSBidXQgd2UncmUgZ29ubmEgZG8gdGhpcyBvbiBsb2NhbCB1bml0XG4gICAgLy8gc2luY2UgVGhyZWUuanMgaXMgbm90IGdvb2QgYXQgd29ybGQgY29vcmRpbmF0aW9uIHN0dWZmXG4gICAgY29uc3QgaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52ID0gbWF0NEludmVydENvbXBhdChfbWF0QS5jb3B5KF9tYXRCLm11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeCkpKTtcbiAgICBjb25zdCBhcHBseVJvdGF0aW9uID0gX3F1YXRBLnNldEZyb21Vbml0VmVjdG9ycyhcbiAgICAgIHRoaXMuX2JvbmVBeGlzLFxuICAgICAgX3YzQS5jb3B5KHRoaXMuX25leHRUYWlsKS5hcHBseU1hdHJpeDQoaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52KS5ub3JtYWxpemUoKSxcbiAgICApO1xuXG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb24uY29weSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbikubXVsdGlwbHkoYXBwbHlSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIF9jb2xsaXNpb24odGFpbDogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIHRoaXMuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcbiAgICAgIF9tYXRBLm11bHRpcGx5KGNvbGxpZGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiA9IF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKF9tYXRBKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyUmFkaXVzID0gY29sbGlkZXIuZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUhLnJhZGl1czsgLy8gdGhlIGJvdW5kaW5nIHNwaGVyZSBpcyBndWFyYW50ZWVkIHRvIGJlIGV4aXN0IGJ5IFZSTVNwcmluZ0JvbmVJbXBvcnRlci5fY3JlYXRlQ29sbGlkZXJNZXNoXG4gICAgICBjb25zdCByID0gdGhpcy5yYWRpdXMgKyBjb2xsaWRlclJhZGl1cztcblxuICAgICAgaWYgKHRhaWwuZGlzdGFuY2VUb1NxdWFyZWQoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKSA8PSByICogcikge1xuICAgICAgICAvLyDjg5Ljg4Pjg4jjgIJDb2xsaWRlcuOBruWNiuW+hOaWueWQkeOBq+aKvOOBl+WHuuOBmVxuICAgICAgICBjb25zdCBub3JtYWwgPSBfdjNCLnN1YlZlY3RvcnModGFpbCwgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgICAgICAgY29uc3QgcG9zRnJvbUNvbGxpZGVyID0gX3YzQy5hZGRWZWN0b3JzKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiwgbm9ybWFsLm11bHRpcGx5U2NhbGFyKHIpKTtcblxuICAgICAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICAgICAgdGFpbC5jb3B5KFxuICAgICAgICAgIHBvc0Zyb21Db2xsaWRlclxuICAgICAgICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIodGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoKVxuICAgICAgICAgICAgLmFkZCh0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyBjZW50ZXIgc3BhY2UgaW50byB3b3JsZCBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKHRhcmdldDogVEhSRUUuTWF0cml4NCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcih0YXJnZXQ6IFRIUkVFLk1hdHJpeDQpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICB0YXJnZXQuY29weSgodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLmludmVyc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cbiAgICovXG4gIHByaXZhdGUgX2dldFBhcmVudE1hdHJpeFdvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLmJvbmUucGFyZW50ID8gdGhpcy5ib25lLnBhcmVudC5tYXRyaXhXb3JsZCA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIHNwcmluZyBib25lIGdyb3VwIG9mIGEgVlJNLlxuICovXG5leHBvcnQgdHlwZSBWUk1TcHJpbmdCb25lR3JvdXAgPSBWUk1TcHJpbmdCb25lW107XG5cbi8qKlxuICogQSBjbGFzcyBtYW5hZ2VzIGV2ZXJ5IHNwcmluZyBib25lcyBvbiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW107XG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lR3JvdXBMaXN0OiBWUk1TcHJpbmdCb25lR3JvdXBbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dXG4gICAqXG4gICAqIEBwYXJhbSBzcHJpbmdCb25lR3JvdXBMaXN0IEFuIGFycmF5IG9mIFtbVlJNU3ByaW5nQm9uZUdyb3VwXV1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSwgc3ByaW5nQm9uZUdyb3VwTGlzdDogVlJNU3ByaW5nQm9uZUdyb3VwW10pIHtcbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzID0gY29sbGlkZXJHcm91cHM7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0ID0gc3ByaW5nQm9uZUdyb3VwTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYWxsIGJvbmVzIGJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIHNwYWNlIHJlbGF0aXZlIGZyb20gdGhpcyBvYmplY3QuXG4gICAqIElmIGBudWxsYCBpcyBnaXZlbiwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0LCBvciBgbnVsbGBcbiAgICovXG4gIHB1YmxpYyBzZXRDZW50ZXIocm9vdDogVEhSRUUuT2JqZWN0M0QgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goKHNwcmluZ0JvbmVHcm91cCkgPT4ge1xuICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgICAgc3ByaW5nQm9uZS5jZW50ZXIgPSByb290O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGV2ZXJ5IHNwcmluZyBib25lIGF0dGFjaGVkIHRvIHRoaXMgbWFuYWdlci5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIGxhdGVVcGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUudXBkYXRlKGRlbHRhKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGV2ZXJ5IHNwcmluZyBib25lIGF0dGFjaGVkIHRvIHRoaXMgbWFuYWdlci5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBzcHJpbmdCb25lLnJlc2V0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgR0xURk5vZGUsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAsIFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2ggfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVHcm91cCwgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBfY29sbGlkZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IHZpc2libGU6IGZhbHNlIH0pO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1Mb29rQXRIZWFkXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHJldHVybiBudWxsO1xuXG4gICAgLy8g6KGd56qB5Yik5a6a55CD5L2T44Oh44OD44K344Ol44CCXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBhd2FpdCB0aGlzLl9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKTtcblxuICAgIC8vIOWQjOOBmOWxnuaAp++8iHN0aWZmaW5lc3PjgoRkcmFnRm9yY2XjgYzlkIzjgZjvvInjga7jg5zjg7zjg7Pjga9ib25lR3JvdXDjgavjgb7jgajjgoHjgonjgozjgabjgYTjgovjgIJcbiAgICAvLyDkuIDliJfjgaDjgZHjgafjga/jgarjgYTjgZPjgajjgavms6jmhI/jgIJcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBMaXN0ID0gYXdhaXQgdGhpcy5faW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdChnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24sIGNvbGxpZGVyR3JvdXBzKTtcblxuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoY29sbGlkZXJHcm91cHMsIHNwcmluZ0JvbmVHcm91cExpc3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVTcHJpbmdCb25lKGJvbmU6IFRIUkVFLk9iamVjdDNELCBwYXJhbXM6IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzID0ge30pOiBWUk1TcHJpbmdCb25lIHtcbiAgICByZXR1cm4gbmV3IFZSTVNwcmluZ0JvbmUoYm9uZSwgcGFyYW1zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdChcbiAgICBnbHRmOiBHTFRGLFxuICAgIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbixcbiAgICBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSxcbiAgKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lR3JvdXBbXT4ge1xuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cHM6IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb25TcHJpbmdbXSA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5ib25lR3JvdXBzIHx8IFtdO1xuXG4gICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwTGlzdDogVlJNU3ByaW5nQm9uZUdyb3VwW10gPSBbXTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc3ByaW5nQm9uZUdyb3Vwcy5tYXAoYXN5bmMgKHZybUJvbmVHcm91cCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLnN0aWZmaW5lc3MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci54ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci56ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eVBvd2VyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZHJhZ0ZvcmNlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuaGl0UmFkaXVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuY29sbGlkZXJHcm91cHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ib25lcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmNlbnRlciA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0aWZmbmVzc0ZvcmNlID0gdnJtQm9uZUdyb3VwLnN0aWZmaW5lc3M7XG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci54LFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnksXG4gICAgICAgICAgLXZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnosIC8vIFZSTSAwLjAgdXNlcyBsZWZ0LWhhbmRlZCB5LXVwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGdyYXZpdHlQb3dlciA9IHZybUJvbmVHcm91cC5ncmF2aXR5UG93ZXI7XG4gICAgICAgIGNvbnN0IGRyYWdGb3JjZSA9IHZybUJvbmVHcm91cC5kcmFnRm9yY2U7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHZybUJvbmVHcm91cC5oaXRSYWRpdXM7XG5cbiAgICAgICAgY29uc3QgY29sbGlkZXJzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoW10gPSBbXTtcbiAgICAgICAgdnJtQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVySW5kZXgpID0+IHtcbiAgICAgICAgICBjb2xsaWRlcnMucHVzaCguLi5jb2xsaWRlckdyb3Vwc1tjb2xsaWRlckluZGV4XS5jb2xsaWRlcnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzcHJpbmdCb25lR3JvdXA6IFZSTVNwcmluZ0JvbmVHcm91cCA9IFtdO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuYm9uZXMubWFwKGFzeW5jIChub2RlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIFZSTeOBruaDheWgseOBi+OCieOAjOaPuuOCjOODouODjuOAjeODnOODvOODs+OBruODq+ODvOODiOOBjOWPluOCjOOCi1xuICAgICAgICAgICAgY29uc3Qgc3ByaW5nUm9vdEJvbmU6IEdMVEZOb2RlID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIG5vZGVJbmRleCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjogR0xURk5vZGUgPVxuICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuY2VudGVyISAhPT0gLTEgPyBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgdnJtQm9uZUdyb3VwLmNlbnRlciEpIDogbnVsbDtcblxuICAgICAgICAgICAgLy8gaXQncyB3ZWlyZCBidXQgdGhlcmUgbWlnaHQgYmUgY2FzZXMgd2UgY2FuJ3QgZmluZCB0aGUgcm9vdCBib25lXG4gICAgICAgICAgICBpZiAoIXNwcmluZ1Jvb3RCb25lKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3ByaW5nUm9vdEJvbmUudHJhdmVyc2UoKGJvbmUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX2NyZWF0ZVNwcmluZ0JvbmUoYm9uZSwge1xuICAgICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBzdGlmZm5lc3NGb3JjZSxcbiAgICAgICAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICAgICAgICAgIGdyYXZpdHlQb3dlcixcbiAgICAgICAgICAgICAgICBkcmFnRm9yY2UsXG4gICAgICAgICAgICAgICAgY29sbGlkZXJzLFxuICAgICAgICAgICAgICAgIGNlbnRlcixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNwcmluZ0JvbmVHcm91cC5wdXNoKHNwcmluZ0JvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgc3ByaW5nQm9uZUdyb3VwTGlzdC5wdXNoKHNwcmluZ0JvbmVHcm91cCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHNwcmluZ0JvbmVHcm91cExpc3Q7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGFycmF5IG9mIFtbVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBdXS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24gQSBgc2Vjb25kYXJ5QW5pbWF0aW9uYCBmaWVsZCBvZiBWUk1cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0Q29sbGlkZXJNZXNoR3JvdXBzKFxuICAgIGdsdGY6IEdMVEYsXG4gICAgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uLFxuICApOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10+IHtcbiAgICBjb25zdCB2cm1Db2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3VwcztcbiAgICBpZiAodnJtQ29sbGlkZXJHcm91cHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10gPSBbXTtcbiAgICB2cm1Db2xsaWRlckdyb3Vwcy5mb3JFYWNoKGFzeW5jIChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBpZiAoY29sbGlkZXJHcm91cC5ub2RlID09PSB1bmRlZmluZWQgfHwgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJvbmUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgY29sbGlkZXJHcm91cC5ub2RlKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaFtdID0gW107XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC56ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5yYWRpdXMgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSBfdjNBLnNldChcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueCxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueSxcbiAgICAgICAgICAtY29sbGlkZXIub2Zmc2V0LnosIC8vIFZSTSAwLjAgdXNlcyBsZWZ0LWhhbmRlZCB5LXVwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVyTWVzaCA9IHRoaXMuX2NyZWF0ZUNvbGxpZGVyTWVzaChjb2xsaWRlci5yYWRpdXMsIG9mZnNldCk7XG5cbiAgICAgICAgYm9uZS5hZGQoY29sbGlkZXJNZXNoKTtcbiAgICAgICAgY29sbGlkZXJzLnB1c2goY29sbGlkZXJNZXNoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjb2xsaWRlck1lc2hHcm91cCA9IHtcbiAgICAgICAgbm9kZTogY29sbGlkZXJHcm91cC5ub2RlLFxuICAgICAgICBjb2xsaWRlcnMsXG4gICAgICB9O1xuICAgICAgY29sbGlkZXJHcm91cHMucHVzaChjb2xsaWRlck1lc2hHcm91cCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sbGlkZXJHcm91cHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY29sbGlkZXIgbWVzaC5cbiAgICpcbiAgICogQHBhcmFtIHJhZGl1cyBSYWRpdXMgb2YgdGhlIG5ldyBjb2xsaWRlciBtZXNoXG4gICAqIEBwYXJhbSBvZmZzZXQgT2ZmZXN0IG9mIHRoZSBuZXcgY29sbGlkZXIgbWVzaFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jcmVhdGVDb2xsaWRlck1lc2gocmFkaXVzOiBudW1iZXIsIG9mZnNldDogVEhSRUUuVmVjdG9yMyk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2gge1xuICAgIGNvbnN0IGNvbGxpZGVyTWVzaCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeShyYWRpdXMsIDgsIDQpLCBfY29sbGlkZXJNYXRlcmlhbCk7XG5cbiAgICBjb2xsaWRlck1lc2gucG9zaXRpb24uY29weShvZmZzZXQpO1xuXG4gICAgLy8gdGhlIG5hbWUgaGF2ZSB0byBiZSB0aGlzIGluIG9yZGVyIHRvIGV4Y2x1ZGUgY29sbGlkZXJzIGZyb20gYm91bmRpbmcgYm94XG4gICAgLy8gKFNlZSBWaWV3ZXIudHMsIHNlYXJjaCBmb3IgY2hpbGQubmFtZSA9PT0gJ3ZybUNvbGxpZGVyU3BoZXJlJylcbiAgICBjb2xsaWRlck1lc2gubmFtZSA9ICd2cm1Db2xsaWRlclNwaGVyZSc7XG5cbiAgICAvLyBXZSB3aWxsIHVzZSB0aGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgZm9yIGNvbGxpc2lvbiB2cyBib25lcy5cbiAgICAvLyBgYm91bmRpbmdTcGhlcmVgIG11c3QgYmUgY3JlYXRlZCB0byBjb21wdXRlIHRoZSByYWRpdXMuXG4gICAgY29sbGlkZXJNZXNoLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuXG4gICAgcmV0dXJuIGNvbGxpZGVyTWVzaDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUltcG9ydGVyIH0gZnJvbSAnLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXIgfSBmcm9tICcuL2ZpcnN0cGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkSW1wb3J0ZXIgfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0SW1wb3J0ZXIgfSBmcm9tICcuL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1NYXRlcmlhbEltcG9ydGVyIH0gZnJvbSAnLi9tYXRlcmlhbCc7XG5pbXBvcnQgeyBWUk1NZXRhSW1wb3J0ZXIgfSBmcm9tICcuL21ldGEvVlJNTWV0YUltcG9ydGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlciB9IGZyb20gJy4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi9WUk0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUltcG9ydGVyT3B0aW9ucyB7XG4gIG1ldGFJbXBvcnRlcj86IFZSTU1ldGFJbXBvcnRlcjtcbiAgbG9va0F0SW1wb3J0ZXI/OiBWUk1Mb29rQXRJbXBvcnRlcjtcbiAgaHVtYW5vaWRJbXBvcnRlcj86IFZSTUh1bWFub2lkSW1wb3J0ZXI7XG4gIGJsZW5kU2hhcGVJbXBvcnRlcj86IFZSTUJsZW5kU2hhcGVJbXBvcnRlcjtcbiAgZmlyc3RQZXJzb25JbXBvcnRlcj86IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXI7XG4gIG1hdGVyaWFsSW1wb3J0ZXI/OiBWUk1NYXRlcmlhbEltcG9ydGVyO1xuICBzcHJpbmdCb25lSW1wb3J0ZXI/OiBWUk1TcHJpbmdCb25lSW1wb3J0ZXI7XG59XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1dXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1JbXBvcnRlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbWV0YUltcG9ydGVyOiBWUk1NZXRhSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfYmxlbmRTaGFwZUltcG9ydGVyOiBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbG9va0F0SW1wb3J0ZXI6IFZSTUxvb2tBdEltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2h1bWFub2lkSW1wb3J0ZXI6IFZSTUh1bWFub2lkSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlyc3RQZXJzb25JbXBvcnRlcjogVlJNRmlyc3RQZXJzb25JbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9tYXRlcmlhbEltcG9ydGVyOiBWUk1NYXRlcmlhbEltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NwcmluZ0JvbmVJbXBvcnRlcjogVlJNU3ByaW5nQm9uZUltcG9ydGVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNSW1wb3J0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFtbVlJNSW1wb3J0ZXJPcHRpb25zXV0sIG9wdGlvbmFsbHkgY29udGFpbnMgaW1wb3J0ZXJzIGZvciBlYWNoIGNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5fbWV0YUltcG9ydGVyID0gb3B0aW9ucy5tZXRhSW1wb3J0ZXIgfHwgbmV3IFZSTU1ldGFJbXBvcnRlcigpO1xuICAgIHRoaXMuX2JsZW5kU2hhcGVJbXBvcnRlciA9IG9wdGlvbnMuYmxlbmRTaGFwZUltcG9ydGVyIHx8IG5ldyBWUk1CbGVuZFNoYXBlSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9sb29rQXRJbXBvcnRlciA9IG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgfHwgbmV3IFZSTUxvb2tBdEltcG9ydGVyKCk7XG4gICAgdGhpcy5faHVtYW5vaWRJbXBvcnRlciA9IG9wdGlvbnMuaHVtYW5vaWRJbXBvcnRlciB8fCBuZXcgVlJNSHVtYW5vaWRJbXBvcnRlcigpO1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uSW1wb3J0ZXIgPSBvcHRpb25zLmZpcnN0UGVyc29uSW1wb3J0ZXIgfHwgbmV3IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9tYXRlcmlhbEltcG9ydGVyID0gb3B0aW9ucy5tYXRlcmlhbEltcG9ydGVyIHx8IG5ldyBWUk1NYXRlcmlhbEltcG9ydGVyKCk7XG4gICAgdGhpcy5fc3ByaW5nQm9uZUltcG9ydGVyID0gb3B0aW9ucy5zcHJpbmdCb25lSW1wb3J0ZXIgfHwgbmV3IFZSTVNwcmluZ0JvbmVJbXBvcnRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2VpdmUgYSBHTFRGIG9iamVjdCByZXRyaWV2ZWQgZnJvbSBgVEhSRUUuR0xURkxvYWRlcmAgYW5kIGNyZWF0ZSBhIG5ldyBbW1ZSTV1dIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNPiB7XG4gICAgaWYgKGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucyA9PT0gdW5kZWZpbmVkIHx8IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucy5WUk0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBWUk0gZXh0ZW5zaW9uIG9uIHRoZSBHTFRGJyk7XG4gICAgfVxuICAgIGNvbnN0IHNjZW5lID0gZ2x0Zi5zY2VuZTtcblxuICAgIHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKGZhbHNlKTtcblxuICAgIC8vIFNraW5uZWQgb2JqZWN0IHNob3VsZCBub3QgYmUgZnJ1c3R1bUN1bGxlZFxuICAgIC8vIFNpbmNlIHByZS1za2lubmVkIHBvc2l0aW9uIG1pZ2h0IGJlIG91dHNpZGUgb2Ygdmlld1xuICAgIHNjZW5lLnRyYXZlcnNlKChvYmplY3QzZCkgPT4ge1xuICAgICAgaWYgKChvYmplY3QzZCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBvYmplY3QzZC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtZXRhID0gKGF3YWl0IHRoaXMuX21ldGFJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG1hdGVyaWFscyA9IChhd2FpdCB0aGlzLl9tYXRlcmlhbEltcG9ydGVyLmNvbnZlcnRHTFRGTWF0ZXJpYWxzKGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBodW1hbm9pZCA9IChhd2FpdCB0aGlzLl9odW1hbm9pZEltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZmlyc3RQZXJzb24gPSBodW1hbm9pZCA/IChhd2FpdCB0aGlzLl9maXJzdFBlcnNvbkltcG9ydGVyLmltcG9ydChnbHRmLCBodW1hbm9pZCkpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGJsZW5kU2hhcGVQcm94eSA9IChhd2FpdCB0aGlzLl9ibGVuZFNoYXBlSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBsb29rQXQgPVxuICAgICAgZmlyc3RQZXJzb24gJiYgYmxlbmRTaGFwZVByb3h5ICYmIGh1bWFub2lkXG4gICAgICAgID8gKGF3YWl0IHRoaXMuX2xvb2tBdEltcG9ydGVyLmltcG9ydChnbHRmLCBmaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbm9pZCkpIHx8IHVuZGVmaW5lZFxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHNwcmluZ0JvbmVNYW5hZ2VyID0gKGF3YWl0IHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBuZXcgVlJNKHtcbiAgICAgIHNjZW5lOiBnbHRmLnNjZW5lLFxuICAgICAgbWV0YSxcbiAgICAgIG1hdGVyaWFscyxcbiAgICAgIGh1bWFub2lkLFxuICAgICAgZmlyc3RQZXJzb24sXG4gICAgICBibGVuZFNoYXBlUHJveHksXG4gICAgICBsb29rQXQsXG4gICAgICBzcHJpbmdCb25lTWFuYWdlcixcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4vbG9va2F0JztcbmltcG9ydCB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEvVlJNTWV0YSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBkZWVwRGlzcG9zZSB9IGZyb20gJy4vdXRpbHMvZGlzcG9zZXInO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXIsIFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4vVlJNSW1wb3J0ZXInO1xuXG4vKipcbiAqIFBhcmFtZXRlcnMgZm9yIGEgW1tWUk1dXSBjbGFzcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWUk1QYXJhbWV0ZXJzIHtcbiAgc2NlbmU6IFRIUkVFLlNjZW5lIHwgVEhSRUUuR3JvdXA7IC8vIENPTVBBVDogYEdMVEYuc2NlbmVgIGlzIGdvaW5nIHRvIGJlIGBUSFJFRS5Hcm91cGAgaW4gcjExNFxuICBodW1hbm9pZD86IFZSTUh1bWFub2lkO1xuICBibGVuZFNoYXBlUHJveHk/OiBWUk1CbGVuZFNoYXBlUHJveHk7XG4gIGZpcnN0UGVyc29uPzogVlJNRmlyc3RQZXJzb247XG4gIGxvb2tBdD86IFZSTUxvb2tBdEhlYWQ7XG4gIG1hdGVyaWFscz86IFRIUkVFLk1hdGVyaWFsW107XG4gIHNwcmluZ0JvbmVNYW5hZ2VyPzogVlJNU3ByaW5nQm9uZU1hbmFnZXI7XG4gIG1ldGE/OiBWUk1NZXRhO1xufVxuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIFZSTSBtb2RlbC5cbiAqIFNlZSB0aGUgZG9jdW1lbnRhdGlvbiBvZiBbW1ZSTS5mcm9tXV0gZm9yIHRoZSBtb3N0IGJhc2ljIHVzZSBvZiBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBmcm9tIGEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlci5cbiAgICogSXQncyBwcm9iYWJseSBhIHRoaW5nIHdoYXQgeW91IHdhbnQgdG8gZ2V0IHN0YXJ0ZWQgd2l0aCBWUk1zLlxuICAgKlxuICAgKiBAZXhhbXBsZSBNb3N0IGJhc2ljIHVzZSBvZiBWUk1cbiAgICogYGBgXG4gICAqIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAqXG4gICAqIG5ldyBUSFJFRS5HTFRGTG9hZGVyKCkubG9hZCggJ21vZGVscy90aHJlZS12cm0tZ2lybC52cm0nLCAoIGdsdGYgKSA9PiB7XG4gICAqXG4gICAqICAgVEhSRUUuVlJNLmZyb20oIGdsdGYgKS50aGVuKCAoIHZybSApID0+IHtcbiAgICpcbiAgICogICAgIHNjZW5lLmFkZCggdnJtLnNjZW5lICk7XG4gICAqXG4gICAqICAgfSApO1xuICAgKlxuICAgKiB9ICk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCBpbiBpbXBvcnRlclxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhc3luYyBmcm9tKGdsdGY6IEdMVEYsIG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxWUk0+IHtcbiAgICBjb25zdCBpbXBvcnRlciA9IG5ldyBWUk1JbXBvcnRlcihvcHRpb25zKTtcbiAgICByZXR1cm4gYXdhaXQgaW1wb3J0ZXIuaW1wb3J0KGdsdGYpO1xuICB9XG4gIC8qKlxuICAgKiBgVEhSRUUuU2NlbmVgIG9yIGBUSFJFRS5Hcm91cGAgKGRlcGVuZHMgb24geW91ciB0aHJlZS5qcyByZXZpc2lvbikgdGhhdCBjb250YWlucyB0aGUgZW50aXJlIFZSTS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzY2VuZTogVEhSRUUuU2NlbmUgfCBUSFJFRS5Hcm91cDsgLy8gQ09NUEFUOiBgR0xURi5zY2VuZWAgaXMgZ29pbmcgdG8gYmUgYFRIUkVFLkdyb3VwYCBpbiByMTE0XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNSHVtYW5vaWRdXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyBbW1ZSTUh1bWFub2lkLmdldEJvbmVOb2RlXV0uXG4gICAqXG4gICAqIEBUT0RPIEFkZCBhIGxpbmsgdG8gVlJNIHNwZWNcbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZD86IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUJsZW5kU2hhcGVQcm94eV1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSBbW1ZSTUJsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZV1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJsZW5kU2hhcGVQcm94eT86IFZSTUJsZW5kU2hhcGVQcm94eTtcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1GaXJzdFBlcnNvbl1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gdXNlIHZhcmlvdXMgZmVhdHVyZSBvZiB0aGUgZmlyc3RQZXJzb24gZmllbGQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1Mb29rQXRIZWFkXV0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIFtbVlJNTG9va0F0SGVhZC50YXJnZXRdXSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXRIZWFkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtYXRlcmlhbHMgb2YgdGhlIFZSTS5cbiAgICogYHVwZGF0ZVZSTU1hdGVyaWFsc2AgbWV0aG9kIG9mIHRoZXNlIG1hdGVyaWFscyB3aWxsIGJlIGNhbGxlZCB2aWEgaXRzIFtbVlJNLnVwZGF0ZV1dIG1ldGhvZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHM/OiBUSFJFRS5NYXRlcmlhbFtdO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtZXRhIGZpZWxkcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byByZWZlciB0aGVzZSBsaWNlbnNlIGZpZWxkcyBiZWZvcmUgdXNlIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtZXRhPzogVlJNTWV0YTtcblxuICAvKipcbiAgICogQSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0gbWFuaXB1bGF0ZXMgYWxsIHNwcmluZyBib25lcyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lTWFuYWdlcj86IFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIFtbVlJNUGFyYW1ldGVyc11dIHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnNjZW5lID0gcGFyYW1zLnNjZW5lO1xuICAgIHRoaXMuaHVtYW5vaWQgPSBwYXJhbXMuaHVtYW5vaWQ7XG4gICAgdGhpcy5ibGVuZFNoYXBlUHJveHkgPSBwYXJhbXMuYmxlbmRTaGFwZVByb3h5O1xuICAgIHRoaXMuZmlyc3RQZXJzb24gPSBwYXJhbXMuZmlyc3RQZXJzb247XG4gICAgdGhpcy5sb29rQXQgPSBwYXJhbXMubG9va0F0O1xuICAgIHRoaXMubWF0ZXJpYWxzID0gcGFyYW1zLm1hdGVyaWFscztcbiAgICB0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyID0gcGFyYW1zLnNwcmluZ0JvbmVNYW5hZ2VyO1xuICAgIHRoaXMubWV0YSA9IHBhcmFtcy5tZXRhO1xuICB9XG5cbiAgLyoqXG4gICAqICoqWW91IG5lZWQgdG8gY2FsbCB0aGlzIG9uIHlvdXIgdXBkYXRlIGxvb3AuKipcbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGV2ZXJ5IFZSTSBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb29rQXQpIHtcbiAgICAgIHRoaXMubG9va0F0LnVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRTaGFwZVByb3h5KSB7XG4gICAgICB0aGlzLmJsZW5kU2hhcGVQcm94eS51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zcHJpbmdCb25lTWFuYWdlcikge1xuICAgICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlci5sYXRlVXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXRlcmlhbHMpIHtcbiAgICAgIHRoaXMubWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKG1hdGVyaWFsLnVwZGF0ZVZSTU1hdGVyaWFscykge1xuICAgICAgICAgIG1hdGVyaWFsLnVwZGF0ZVZSTU1hdGVyaWFscyhkZWx0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIGV2ZXJ5dGhpbmcgYWJvdXQgdGhlIFZSTSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcbiAgICBpZiAoc2NlbmUpIHtcbiAgICAgIGRlZXBEaXNwb3NlKHNjZW5lKTtcbiAgICB9XG5cbiAgICB0aGlzLm1ldGE/LnRleHR1cmU/LmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi4vVlJNJztcblxuY29uc3QgX3YyQSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbmNvbnN0IF9jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAtMSwgMSwgLTEsIDEpO1xuY29uc3QgX3BsYW5lID0gbmV3IFRIUkVFLk1lc2goXG4gIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLFxuICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSksXG4pO1xuY29uc3QgX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5fc2NlbmUuYWRkKF9wbGFuZSk7XG5cbi8qKlxuICogRXh0cmFjdCBhIHRodW1ibmFpbCBpbWFnZSBibG9iIGZyb20gYSB7QGxpbmsgVlJNfS5cbiAqIElmIHRoZSB2cm0gZG9lcyBub3QgaGF2ZSBhIHRodW1ibmFpbCwgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAqIEBwYXJhbSByZW5kZXJlciBSZW5kZXJlclxuICogQHBhcmFtIHZybSBWUk0gd2l0aCBhIHRodW1ibmFpbFxuICogQHBhcmFtIHNpemUgd2lkdGggLyBoZWlnaHQgb2YgdGhlIGltYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0VGh1bWJuYWlsQmxvYihyZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgdnJtOiBWUk0sIHNpemUgPSA1MTIpOiBQcm9taXNlPEJsb2I+IHtcbiAgLy8gZ2V0IHRoZSB0ZXh0dXJlXG4gIGNvbnN0IHRleHR1cmUgPSB2cm0ubWV0YT8udGV4dHVyZTtcbiAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdleHRyYWN0VGh1bWJuYWlsQmxvYjogVGhpcyBWUk0gZG9lcyBub3QgaGF2ZSBhIHRodW1ibmFpbCcpO1xuICB9XG5cbiAgY29uc3QgY2FudmFzID0gcmVuZGVyZXIuZ2V0Q29udGV4dCgpLmNhbnZhcztcblxuICAvLyBzdG9yZSB0aGUgY3VycmVudCByZXNvbHV0aW9uXG4gIHJlbmRlcmVyLmdldFNpemUoX3YyQSk7XG4gIGNvbnN0IHByZXZXaWR0aCA9IF92MkEueDtcbiAgY29uc3QgcHJldkhlaWdodCA9IF92MkEueTtcblxuICAvLyBvdmVyd3JpdGUgdGhlIHJlc29sdXRpb25cbiAgcmVuZGVyZXIuc2V0U2l6ZShzaXplLCBzaXplLCBmYWxzZSk7XG5cbiAgLy8gYXNzaWduIHRoZSB0ZXh0dXJlIHRvIHBsYW5lXG4gIF9wbGFuZS5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuXG4gIC8vIHJlbmRlclxuICByZW5kZXJlci5yZW5kZXIoX3NjZW5lLCBfY2FtZXJhKTtcblxuICAvLyB1bmFzc2lnbiB0aGUgdGV4dHVyZVxuICBfcGxhbmUubWF0ZXJpYWwubWFwID0gbnVsbDtcblxuICAvLyBnZXQgYmxvYlxuICBpZiAoY2FudmFzIGluc3RhbmNlb2YgT2Zmc2NyZWVuQ2FudmFzKSB7XG4gICAgcmV0dXJuIGNhbnZhcy5jb252ZXJ0VG9CbG9iKCkuZmluYWxseSgoKSA9PiB7XG4gICAgICAvLyByZXZlcnQgdG8gcHJldmlvdXMgcmVzb2x1dGlvblxuICAgICAgcmVuZGVyZXIuc2V0U2l6ZShwcmV2V2lkdGgsIHByZXZIZWlnaHQsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2FudmFzLnRvQmxvYigoYmxvYikgPT4ge1xuICAgICAgLy8gcmV2ZXJ0IHRvIHByZXZpb3VzIHJlc29sdXRpb25cbiAgICAgIHJlbmRlcmVyLnNldFNpemUocHJldldpZHRoLCBwcmV2SGVpZ2h0LCBmYWxzZSk7XG5cbiAgICAgIGlmIChibG9iID09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KCdleHRyYWN0VGh1bWJuYWlsQmxvYjogRmFpbGVkIHRvIGNyZWF0ZSBhIGJsb2InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGdpdmVuIG9iamVjdCBhbmQgcmVtb3ZlIHVubmVjZXNzYXJpbHkgYm91bmQgam9pbnRzIGZyb20gZXZlcnkgYFRIUkVFLlNraW5uZWRNZXNoYC5cbiAqIFNvbWUgZW52aXJvbm1lbnRzIGxpa2UgbW9iaWxlIGRldmljZXMgaGF2ZSBhIGxvd2VyIGxpbWl0IG9mIGJvbmVzIGFuZCBtaWdodCBiZSB1bmFibGUgdG8gcGVyZm9ybSBtZXNoIHNraW5uaW5nLCB0aGlzIGZ1bmN0aW9uIG1pZ2h0IHJlc29sdmUgc3VjaCBhbiBpc3N1ZS5cbiAqIEFsc28gdGhpcyBmdW5jdGlvbiBtaWdodCBncmVhdGx5IGltcHJvdmUgdGhlIHBlcmZvcm1hbmNlIG9mIG1lc2ggc2tpbm5pbmcuXG4gKlxuICogQHBhcmFtIHJvb3QgUm9vdCBvYmplY3QgdGhhdCB3aWxsIGJlIHRyYXZlcnNlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgLy8gc29tZSBtZXNoZXMgbWlnaHQgc2hhcmUgYSBzYW1lIHNraW5JbmRleCBhdHRyaWJ1dGUgYW5kIHRoaXMgbWFwIHByZXZlbnRzIHRvIGNvbnZlcnQgdGhlIGF0dHJpYnV0ZSB0d2ljZVxuICBjb25zdCBza2VsZXRvbkxpc3Q6IE1hcDxUSFJFRS5CdWZmZXJBdHRyaWJ1dGUsIFRIUkVFLlNrZWxldG9uPiA9IG5ldyBNYXAoKTtcblxuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZVxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAob2JqLnR5cGUgIT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeSBhcyBUSFJFRS5CdWZmZXJHZW9tZXRyeTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICAgIC8vIGxvb2sgZm9yIGV4aXN0aW5nIHNrZWxldG9uXG4gICAgbGV0IHNrZWxldG9uID0gc2tlbGV0b25MaXN0LmdldChhdHRyaWJ1dGUpO1xuXG4gICAgaWYgKCFza2VsZXRvbikge1xuICAgICAgLy8gZ2VuZXJhdGUgcmVkdWNlZCBib25lIGxpc3RcbiAgICAgIGNvbnN0IGJvbmVzOiBUSFJFRS5Cb25lW10gPSBbXTsgLy8gbmV3IGxpc3Qgb2YgYm9uZVxuICAgICAgY29uc3QgYm9uZUludmVyc2VzOiBUSFJFRS5NYXRyaXg0W10gPSBbXTsgLy8gbmV3IGxpc3Qgb2YgYm9uZUludmVyc2VcbiAgICAgIGNvbnN0IGJvbmVJbmRleE1hcDogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9ID0ge307IC8vIG1hcCBvZiBvbGQgYm9uZSBpbmRleCB2cy4gbmV3IGJvbmUgaW5kZXhcblxuICAgICAgLy8gY3JlYXRlIGEgbmV3IGJvbmUgbWFwXG4gICAgICBjb25zdCBhcnJheSA9IGF0dHJpYnV0ZS5hcnJheSBhcyBudW1iZXJbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBhcnJheVtpXTtcblxuICAgICAgICAvLyBuZXcgc2tpbkluZGV4IGJ1ZmZlclxuICAgICAgICBpZiAoYm9uZUluZGV4TWFwW2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYm9uZUluZGV4TWFwW2luZGV4XSA9IGJvbmVzLmxlbmd0aDtcbiAgICAgICAgICBib25lcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZXNbaW5kZXhdKTtcbiAgICAgICAgICBib25lSW52ZXJzZXMucHVzaChtZXNoLnNrZWxldG9uLmJvbmVJbnZlcnNlc1tpbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXlbaV0gPSBib25lSW5kZXhNYXBbaW5kZXhdO1xuICAgICAgfVxuXG4gICAgICAvLyByZXBsYWNlIHdpdGggbmV3IGluZGljZXNcbiAgICAgIGF0dHJpYnV0ZS5jb3B5QXJyYXkoYXJyYXkpO1xuICAgICAgYXR0cmlidXRlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gcmVwbGFjZSB3aXRoIG5ldyBpbmRpY2VzXG4gICAgICBza2VsZXRvbiA9IG5ldyBUSFJFRS5Ta2VsZXRvbihib25lcywgYm9uZUludmVyc2VzKTtcbiAgICAgIHNrZWxldG9uTGlzdC5zZXQoYXR0cmlidXRlLCBza2VsZXRvbik7XG4gICAgfVxuXG4gICAgbWVzaC5iaW5kKHNrZWxldG9uLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgIF5eXl5eXl5eXl5eXl5eXl5eXl4gdHJhbnNmb3JtIG9mIG1lc2hlcyBzaG91bGQgYmUgaWdub3JlZFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMi4wI3NraW5zXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgZXh0cmFjdFRodW1ibmFpbEJsb2IgfSBmcm9tICcuL2V4dHJhY3RUaHVtYm5haWxCbG9iJztcbmltcG9ydCB7IHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzIH0gZnJvbSAnLi9yZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1VdGlscyB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcyBjbGFzcyBpcyBub3QgbWVhbnQgdG8gYmUgaW5zdGFudGlhdGVkXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGV4dHJhY3RUaHVtYm5haWxCbG9iID0gZXh0cmFjdFRodW1ibmFpbEJsb2I7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SGVhZCc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5cbmNvbnN0IF92MyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWFkRGVidWcgZXh0ZW5kcyBWUk1Mb29rQXRIZWFkIHtcbiAgcHJpdmF0ZSBfZmFjZURpcmVjdGlvbkhlbHBlcj86IFRIUkVFLkFycm93SGVscGVyO1xuXG4gIHB1YmxpYyBzZXR1cEhlbHBlcihzY2VuZTogVEhSRUUuT2JqZWN0M0QsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVGYWNlRGlyZWN0aW9uSGVscGVyKSB7XG4gICAgICB0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyID0gbmV3IFRIUkVFLkFycm93SGVscGVyKFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLFxuICAgICAgICAwLjUsXG4gICAgICAgIDB4ZmYwMGZmLFxuICAgICAgKTtcbiAgICAgIHNjZW5lLmFkZCh0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuXG4gICAgaWYgKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuZmlyc3RQZXJzb24uZ2V0Rmlyc3RQZXJzb25Xb3JsZFBvc2l0aW9uKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIucG9zaXRpb24pO1xuICAgICAgdGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlci5zZXREaXJlY3Rpb24odGhpcy5nZXRMb29rQXRXb3JsZERpcmVjdGlvbihfdjMpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SGVhZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlciB9IGZyb20gJy4uL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkRGVidWcgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWREZWJ1Zyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnIGV4dGVuZHMgVlJNTG9va0F0SW1wb3J0ZXIge1xuICBwdWJsaWMgaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0SGVhZCB8IG51bGwge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5ZXIgPSB0aGlzLl9pbXBvcnRBcHBseWVyKHNjaGVtYUZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKTtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWREZWJ1ZyhmaXJzdFBlcnNvbiwgYXBwbHllciB8fCB1bmRlZmluZWQpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4uL3NwcmluZ2JvbmUnO1xuaW1wb3J0IHsgVlJNRGVidWdPcHRpb25zIH0gZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZURlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lRGVidWcnO1xuaW1wb3J0IHsgVlJNX0dJWk1PX1JFTkRFUl9PUkRFUiB9IGZyb20gJy4vVlJNRGVidWcnO1xuXG5jb25zdCBfY29sbGlkZXJHaXptb01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgY29sb3I6IDB4ZmYwMGZmLFxuICB3aXJlZnJhbWU6IHRydWUsXG4gIHRyYW5zcGFyZW50OiB0cnVlLFxuICBkZXB0aFRlc3Q6IGZhbHNlLFxufSk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBzcHJpbmcgYm9uZSBncm91cCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IHR5cGUgVlJNU3ByaW5nQm9uZUdyb3VwRGVidWcgPSBWUk1TcHJpbmdCb25lRGVidWdbXTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgZXh0ZW5kcyBWUk1TcHJpbmdCb25lTWFuYWdlciB7XG4gIHB1YmxpYyBzZXR1cEhlbHBlcihzY2VuZTogVEhSRUUuT2JqZWN0M0QsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoZGVidWdPcHRpb24uZGlzYWJsZVNwcmluZ0JvbmVIZWxwZXIpIHJldHVybjtcblxuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIGlmICgoc3ByaW5nQm9uZSBhcyBhbnkpLmdldEdpem1vKSB7XG4gICAgICAgICAgY29uc3QgZ2l6bW8gPSAoc3ByaW5nQm9uZSBhcyBWUk1TcHJpbmdCb25lRGVidWcpLmdldEdpem1vKCk7XG4gICAgICAgICAgc2NlbmUuYWRkKGdpem1vKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIGNvbGxpZGVyLm1hdGVyaWFsID0gX2NvbGxpZGVyR2l6bW9NYXRlcmlhbDtcbiAgICAgICAgY29sbGlkZXIucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCB7IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgfSBmcm9tICcuL1ZSTURlYnVnJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZURlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZSB7XG4gIHByaXZhdGUgX2dpem1vPzogVEhSRUUuQXJyb3dIZWxwZXI7XG5cbiAgY29uc3RydWN0b3IoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMpIHtcbiAgICBzdXBlcihib25lLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBzcHJpbmcgYm9uZSBnaXptbywgYXMgYFRIUkVFLkFycm93SGVscGVyYC5cbiAgICogVXNlZnVsIGZvciBkZWJ1Z2dpbmcgc3ByaW5nIGJvbmVzLlxuICAgKi9cbiAgcHVibGljIGdldEdpem1vKCk6IFRIUkVFLkFycm93SGVscGVyIHtcbiAgICAvLyByZXR1cm4gaWYgZ2l6bW8gaXMgYWxyZWFkeSBleGlzdGVkXG4gICAgaWYgKHRoaXMuX2dpem1vKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2l6bW87XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZSA9IF92M0EuY29weSh0aGlzLl9uZXh0VGFpbCkuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5fZ2l6bW8gPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoXG4gICAgICBuZXh0VGFpbFJlbGF0aXZlLm5vcm1hbGl6ZSgpLFxuICAgICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbixcbiAgICAgIG5leHRUYWlsUmVsYXRpdmVMZW5ndGgsXG4gICAgICAweGZmZmYwMCxcbiAgICAgIHRoaXMucmFkaXVzLFxuICAgICAgdGhpcy5yYWRpdXMsXG4gICAgKTtcblxuICAgIC8vIGl0IHNob3VsZCBiZSBhbHdheXMgdmlzaWJsZVxuICAgIHRoaXMuX2dpem1vLmxpbmUucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgIHRoaXMuX2dpem1vLmNvbmUucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgICh0aGlzLl9naXptby5saW5lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAodGhpcy5fZ2l6bW8ubGluZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgICh0aGlzLl9naXptby5jb25lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAodGhpcy5fZ2l6bW8uY29uZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkudHJhbnNwYXJlbnQgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXMuX2dpem1vO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcbiAgICAvLyBsYXN0bHkgd2UncmUgZ29ubmEgdXBkYXRlIGdpem1vXG4gICAgdGhpcy5fdXBkYXRlR2l6bW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUdpem1vKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZ2l6bW8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0VGFpbFJlbGF0aXZlID0gX3YzQS5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKS5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZUxlbmd0aCA9IG5leHRUYWlsUmVsYXRpdmUubGVuZ3RoKCk7XG5cbiAgICB0aGlzLl9naXptby5zZXREaXJlY3Rpb24obmV4dFRhaWxSZWxhdGl2ZS5ub3JtYWxpemUoKSk7XG4gICAgdGhpcy5fZ2l6bW8uc2V0TGVuZ3RoKG5leHRUYWlsUmVsYXRpdmVMZW5ndGgsIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyk7XG4gICAgdGhpcy5fZ2l6bW8ucG9zaXRpb24uY29weSh0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUltcG9ydGVyIH0gZnJvbSAnLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lRGVidWcgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcgZXh0ZW5kcyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIge1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uIHwgdW5kZWZpbmVkID0gdnJtRXh0LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICAvLyDooZ3nqoHliKTlrprnkIPkvZPjg6Hjg4Pjgrfjg6XjgIJcbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGF3YWl0IHRoaXMuX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyhnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pO1xuXG4gICAgLy8g5ZCM44GY5bGe5oCn77yIc3RpZmZpbmVzc+OChGRyYWdGb3JjZeOBjOWQjOOBmO+8ieOBruODnOODvOODs+OBr2JvbmVHcm91cOOBq+OBvuOBqOOCgeOCieOCjOOBpuOBhOOCi+OAglxuICAgIC8vIOS4gOWIl+OBoOOBkeOBp+OBr+OBquOBhOOBk+OBqOOBq+azqOaEj+OAglxuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cExpc3QgPSBhd2FpdCB0aGlzLl9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiwgY29sbGlkZXJHcm91cHMpO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlU3ByaW5nQm9uZShib25lOiBUSFJFRS5PYmplY3QzRCwgcGFyYW1zOiBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyk6IFZSTVNwcmluZ0JvbmVEZWJ1ZyB7XG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lRGVidWcoYm9uZSwgcGFyYW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXIsIFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4uL1ZSTUltcG9ydGVyJztcbmltcG9ydCB7IFZSTURlYnVnIH0gZnJvbSAnLi9WUk1EZWJ1Zyc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkRGVidWcgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWREZWJ1Zyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1Mb29rQXRJbXBvcnRlckRlYnVnJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTURlYnVnXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSW1wb3J0ZXJEZWJ1ZyBleHRlbmRzIFZSTUltcG9ydGVyIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucy5sb29rQXRJbXBvcnRlciA9IG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgfHwgbmV3IFZSTUxvb2tBdEltcG9ydGVyRGVidWcoKTtcbiAgICBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciA9IG9wdGlvbnMuc3ByaW5nQm9uZUltcG9ydGVyIHx8IG5ldyBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZygpO1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGLCBkZWJ1Z09wdGlvbnM6IFZSTURlYnVnT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxWUk1EZWJ1Zz4ge1xuICAgIGlmIChnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgPT09IHVuZGVmaW5lZCB8fCBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgVlJNIGV4dGVuc2lvbiBvbiB0aGUgR0xURicpO1xuICAgIH1cbiAgICBjb25zdCBzY2VuZSA9IGdsdGYuc2NlbmU7XG5cbiAgICBzY2VuZS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XG5cbiAgICAvLyBTa2lubmVkIG9iamVjdCBzaG91bGQgbm90IGJlIGZydXN0dW1DdWxsZWRcbiAgICAvLyBTaW5jZSBwcmUtc2tpbm5lZCBwb3NpdGlvbiBtaWdodCBiZSBvdXRzaWRlIG9mIHZpZXdcbiAgICBzY2VuZS50cmF2ZXJzZSgob2JqZWN0M2QpID0+IHtcbiAgICAgIGlmICgob2JqZWN0M2QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWV0YSA9IChhd2FpdCB0aGlzLl9tZXRhSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtYXRlcmlhbHMgPSAoYXdhaXQgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaHVtYW5vaWQgPSAoYXdhaXQgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGZpcnN0UGVyc29uID0gaHVtYW5vaWQgPyAoYXdhaXQgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSAoYXdhaXQgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbG9va0F0ID1cbiAgICAgIGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZFxuICAgICAgICA/IChhd2FpdCB0aGlzLl9sb29rQXRJbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKChsb29rQXQgYXMgYW55KS5zZXR1cEhlbHBlcikge1xuICAgICAgKGxvb2tBdCBhcyBWUk1Mb29rQXRIZWFkRGVidWcpLnNldHVwSGVscGVyKHNjZW5lLCBkZWJ1Z09wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNwcmluZ0JvbmVNYW5hZ2VyID0gKGF3YWl0IHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcbiAgICBpZiAoKHNwcmluZ0JvbmVNYW5hZ2VyIGFzIGFueSkuc2V0dXBIZWxwZXIpIHtcbiAgICAgIChzcHJpbmdCb25lTWFuYWdlciBhcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKS5zZXR1cEhlbHBlcihzY2VuZSwgZGVidWdPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTURlYnVnKFxuICAgICAge1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgbWF0ZXJpYWxzLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgZmlyc3RQZXJzb24sXG4gICAgICAgIGJsZW5kU2hhcGVQcm94eSxcbiAgICAgICAgbG9va0F0LFxuICAgICAgICBzcHJpbmdCb25lTWFuYWdlcixcbiAgICAgIH0sXG4gICAgICBkZWJ1Z09wdGlvbnMsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNLCBWUk1QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vVlJNJztcbmltcG9ydCB7IFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4uL1ZSTUltcG9ydGVyJztcbmltcG9ydCB7IFZSTURlYnVnT3B0aW9ucyB9IGZyb20gJy4vVlJNRGVidWdPcHRpb25zJztcbmltcG9ydCB7IFZSTUltcG9ydGVyRGVidWcgfSBmcm9tICcuL1ZSTUltcG9ydGVyRGVidWcnO1xuXG5leHBvcnQgY29uc3QgVlJNX0dJWk1PX1JFTkRFUl9PUkRFUiA9IDEwMDAwO1xuXG4vKipcbiAqIFtbVlJNXV0gYnV0IGl0IGhhcyBzb21lIHVzZWZ1bCBnaXptb3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1EZWJ1ZyBleHRlbmRzIFZSTSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRGVidWcgZnJvbSBhIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXIuXG4gICAqXG4gICAqIFNlZSBbW1ZSTS5mcm9tXV0gZm9yIGEgZGV0YWlsZWQgZXhhbXBsZS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gaW1wb3J0ZXJcbiAgICogQHBhcmFtIGRlYnVnT3B0aW9uIE9wdGlvbnMgZm9yIFZSTURlYnVnIGZlYXR1cmVzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIGZyb20oXG4gICAgZ2x0ZjogR0xURixcbiAgICBvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSxcbiAgICBkZWJ1Z09wdGlvbjogVlJNRGVidWdPcHRpb25zID0ge30sXG4gICk6IFByb21pc2U8VlJNPiB7XG4gICAgY29uc3QgaW1wb3J0ZXIgPSBuZXcgVlJNSW1wb3J0ZXJEZWJ1ZyhvcHRpb25zKTtcbiAgICByZXR1cm4gYXdhaXQgaW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGRlYnVnT3B0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRGVidWcgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKiBAcGFyYW0gZGVidWdPcHRpb24gT3B0aW9ucyBmb3IgVlJNRGVidWcgZmVhdHVyZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNUGFyYW1ldGVycywgZGVidWdPcHRpb246IFZSTURlYnVnT3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIC8vIEdpem1v44KS5bGV6ZaLXG4gICAgaWYgKCFkZWJ1Z09wdGlvbi5kaXNhYmxlQm94SGVscGVyKSB7XG4gICAgICB0aGlzLnNjZW5lLmFkZChuZXcgVEhSRUUuQm94SGVscGVyKHRoaXMuc2NlbmUpKTtcbiAgICB9XG5cbiAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVTa2VsZXRvbkhlbHBlcikge1xuICAgICAgdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLlNrZWxldG9uSGVscGVyKHRoaXMuc2NlbmUpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVEhSRUUuVmVjdG9yMiIsIlRIUkVFLlZlY3RvcjMiLCJUSFJFRS5WZWN0b3I0IiwiVEhSRUUuQ29sb3IiLCJUSFJFRS5PYmplY3QzRCIsIlRIUkVFLlF1YXRlcm5pb24iLCJUSFJFRS5Ta2lubmVkTWVzaCIsIlRIUkVFLlNrZWxldG9uIiwiVEhSRUUuTWF0cml4NCIsIlZFQ1RPUjNfRlJPTlQiLCJfdjNBIiwiX3F1YXQiLCJUSFJFRS5FdWxlciIsIlRIUkVFLkxpbmVhckVuY29kaW5nIiwiVEhSRUUuc1JHQkVuY29kaW5nIiwiVEhSRUUuUkdCRUVuY29kaW5nIiwiVEhSRUUuUkdCTTdFbmNvZGluZyIsIlRIUkVFLlJHQk0xNkVuY29kaW5nIiwiVEhSRUUuUkdCREVuY29kaW5nIiwiVEhSRUUuR2FtbWFFbmNvZGluZyIsIlRIUkVFLlNoYWRlck1hdGVyaWFsIiwiVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwIiwiVEhSRUUuVW5pZm9ybXNVdGlscyIsIlRIUkVFLlVuaWZvcm1zTGliIiwiVEhSRUUuRG91YmxlU2lkZSIsIlRIUkVFLkJhY2tTaWRlIiwiVEhSRUUuRnJvbnRTaWRlIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJfdjNCIiwiX3YzQyIsIl9xdWF0QSIsIl9tYXRBIiwiVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwiLCJUSFJFRS5NZXNoIiwiVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkiLCJUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEiLCJUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuU2NlbmUiLCJfdjMiLCJUSFJFRS5BcnJvd0hlbHBlciIsIlRIUkVFLkJveEhlbHBlciIsIlRIUkVFLlNrZWxldG9uSGVscGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FB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
