/*!
 * @pixiv/three-vrm v0.6.1
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2021 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
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
new Quaternion();
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
const _material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide });
const _plane = new Mesh(new PlaneBufferGeometry(2, 2), _material);
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
    _material.map = texture;
    // render
    renderer.render(_scene, _camera);
    // unassign the texture
    _material.map = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9kaXNwb3Nlci50cyIsIi4uL3NyYy9ibGVuZHNoYXBlL1ZSTUJsZW5kU2hhcGVHcm91cC50cyIsIi4uL3NyYy90eXBlcy9WUk1TY2hlbWEudHMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUudHMiLCIuLi9zcmMvdXRpbHMvcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eS50cyIsIi4uL3NyYy91dGlscy9tYXRoLnRzIiwiLi4vc3JjL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZVByb3h5LnRzIiwiLi4vc3JjL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUltcG9ydGVyLnRzIiwiLi4vc3JjL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uLnRzIiwiLi4vc3JjL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uSW1wb3J0ZXIudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRJbXBvcnRlci50cyIsIi4uL3NyYy9sb29rYXQvVlJNQ3VydmVNYXBwZXIudHMiLCIuLi9zcmMvbG9va2F0L1ZSTUxvb2tBdEFwcGx5ZXIudHMiLCIuLi9zcmMvbG9va2F0L1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLnRzIiwiLi4vc3JjL2xvb2thdC9WUk1Mb29rQXRIZWFkLnRzIiwiLi4vc3JjL2xvb2thdC9WUk1Mb29rQXRCb25lQXBwbHllci50cyIsIi4uL3NyYy9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXIudHMiLCIuLi9zcmMvbWF0ZXJpYWwvZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uLnRzIiwiLi4vc3JjL21hdGVyaWFsL01Ub29uTWF0ZXJpYWwudHMiLCIuLi9zcmMvbWF0ZXJpYWwvVlJNVW5saXRNYXRlcmlhbC50cyIsIi4uL3NyYy9tYXRlcmlhbC9WUk1NYXRlcmlhbEltcG9ydGVyLnRzIiwiLi4vc3JjL21ldGEvVlJNTWV0YUltcG9ydGVyLnRzIiwiLi4vc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZS50cyIsIi4uL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmUudHMiLCIuLi9zcmMvc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsIi4uL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlci50cyIsIi4uL3NyYy9WUk1JbXBvcnRlci50cyIsIi4uL3NyYy9WUk0udHMiLCIuLi9zcmMvVlJNVXRpbHMvZXh0cmFjdFRodW1ibmFpbEJsb2IudHMiLCIuLi9zcmMvVlJNVXRpbHMvcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMudHMiLCIuLi9zcmMvVlJNVXRpbHMvaW5kZXgudHMiLCIuLi9zcmMvZGVidWcvVlJNTG9va0F0SGVhZERlYnVnLnRzIiwiLi4vc3JjL2RlYnVnL1ZSTUxvb2tBdEltcG9ydGVyRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zy50cyIsIi4uL3NyYy9kZWJ1Zy9WUk1TcHJpbmdCb25lRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNSW1wb3J0ZXJEZWJ1Zy50cyIsIi4uL3NyYy9kZWJ1Zy9WUk1EZWJ1Zy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCIvLyBTZWU6IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jbWFudWFsL2VuL2ludHJvZHVjdGlvbi9Ib3ctdG8tZGlzcG9zZS1vZi1vYmplY3RzXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZnVuY3Rpb24gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IHZvaWQge1xuICBPYmplY3Qua2V5cyhtYXRlcmlhbCkuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdO1xuICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gdmFsdWUgYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIHRleHR1cmUuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xufVxuXG5mdW5jdGlvbiBkaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBjb25zdCBnZW9tZXRyeTogVEhSRUUuQnVmZmVyR2VvbWV0cnkgfCB1bmRlZmluZWQgPSAob2JqZWN0M0QgYXMgYW55KS5nZW9tZXRyeTtcbiAgaWYgKGdlb21ldHJ5KSB7XG4gICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuTWF0ZXJpYWxbXSA9IChvYmplY3QzRCBhcyBhbnkpLm1hdGVyaWFsO1xuICBpZiAobWF0ZXJpYWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgIG1hdGVyaWFsLmZvckVhY2goKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCkgPT4gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gICAgfSBlbHNlIGlmIChtYXRlcmlhbCkge1xuICAgICAgZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBEaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBvYmplY3QzRC50cmF2ZXJzZShkaXNwb3NlKTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQcmltaXRpdmUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNQmxlbmRTaGFwZUJpbmQge1xuICBtZXNoZXM6IEdMVEZQcmltaXRpdmVbXTtcbiAgbW9ycGhUYXJnZXRJbmRleDogbnVtYmVyO1xuICB3ZWlnaHQ6IG51bWJlcjtcbn1cblxuZW51bSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUge1xuICBOVU1CRVIsXG4gIFZFQ1RPUjIsXG4gIFZFQ1RPUjMsXG4gIFZFQ1RPUjQsXG4gIENPTE9SLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlIHtcbiAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgZGVmYXVsdFZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgdGFyZ2V0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICBkZWx0YVZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjsgLy8gdGFyZ2V0VmFsdWUgLSBkZWZhdWx0VmFsdWVcbiAgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xufVxuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuY29uc3QgX3YzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92NCA9IG5ldyBUSFJFRS5WZWN0b3I0KCk7XG5jb25zdCBfY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcblxuLy8gYW5pbWF0aW9uTWl4ZXIg44Gu55uj6KaW5a++6LGh44Gv44CBU2NlbmUg44Gu5Lit44Gr5YWl44Gj44Gm44GE44KL5b+F6KaB44GM44GC44KL44CCXG4vLyDjgZ3jga7jgZ/jgoHjgIHooajnpLrjgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjgZHjgozjganjgIFPYmplY3QzRCDjgpLntpnmib/jgZfjgaYgU2NlbmUg44Gr5oqV5YWl44Gn44GN44KL44KI44GG44Gr44GZ44KL44CCXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZUdyb3VwIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICBwdWJsaWMgd2VpZ2h0ID0gMC4wO1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICBwcml2YXRlIF9iaW5kczogVlJNQmxlbmRTaGFwZUJpbmRbXSA9IFtdO1xuICBwcml2YXRlIF9tYXRlcmlhbFZhbHVlczogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IGBCbGVuZFNoYXBlQ29udHJvbGxlcl8ke2V4cHJlc3Npb25OYW1lfWA7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ0JsZW5kU2hhcGVDb250cm9sbGVyJztcbiAgICAvLyDooajnpLrnm67nmoTjga7jgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjga7jgafjgIHosqDojbfou73muJvjga7jgZ/jgoHjgasgdmlzaWJsZSDjgpIgZmFsc2Ug44Gr44GX44Gm44GK44GP44CCXG4gICAgLy8g44GT44KM44Gr44KI44KK44CB44GT44Gu44Kk44Oz44K544K/44Oz44K544Gr5a++44GZ44KL5q+O44OV44Os44O844Og44GuIG1hdHJpeCDoh6rli5XoqIjnrpfjgpLnnIHnlaXjgafjgY3jgovjgIJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRCaW5kKGFyZ3M6IHsgbWVzaGVzOiBHTFRGUHJpbWl0aXZlW107IG1vcnBoVGFyZ2V0SW5kZXg6IG51bWJlcjsgd2VpZ2h0OiBudW1iZXIgfSk6IHZvaWQge1xuICAgIC8vIG9yaWdpbmFsIHdlaWdodCBpcyAwLTEwMCBidXQgd2Ugd2FudCB0byBkZWFsIHdpdGggdGhpcyB2YWx1ZSB3aXRoaW4gMC0xXG4gICAgY29uc3Qgd2VpZ2h0ID0gYXJncy53ZWlnaHQgLyAxMDA7XG5cbiAgICB0aGlzLl9iaW5kcy5wdXNoKHtcbiAgICAgIG1lc2hlczogYXJncy5tZXNoZXMsXG4gICAgICBtb3JwaFRhcmdldEluZGV4OiBhcmdzLm1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICB3ZWlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTWF0ZXJpYWxWYWx1ZShhcmdzOiB7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcbiAgICBkZWZhdWx0VmFsdWU/OiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gYXJncy5tYXRlcmlhbDtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBhcmdzLnByb3BlcnR5TmFtZTtcblxuICAgIGxldCB2YWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV07XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgLy8gcHJvcGVydHkgaGFzIG5vdCBiZWVuIGZvdW5kXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlID0gYXJncy5kZWZhdWx0VmFsdWUgfHwgdmFsdWU7XG5cbiAgICBsZXQgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xuICAgIGxldCBkZWZhdWx0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICAgIGxldCB0YXJnZXRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gICAgbGV0IGRlbHRhVmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuXG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpLmlzVmVjdG9yMikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IyO1xuICAgICAgZGVmYXVsdFZhbHVlID0gKHZhbHVlIGFzIFRIUkVFLlZlY3RvcjIpLmNsb25lKCk7XG4gICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgYW55KS5pc1ZlY3RvcjMpIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMztcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5WZWN0b3IzKS5jbG9uZSgpO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNWZWN0b3I0KSB7XG4gICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjQ7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuVmVjdG9yNCkuY2xvbmUoKTtcblxuICAgICAgLy8gdmVjdG9yUHJvcGVydHkgYW5kIHRhcmdldFZhbHVlIGluZGV4IGlzIGRpZmZlcmVudCBmcm9tIGVhY2ggb3RoZXJcbiAgICAgIC8vIGV4cG9ydGVkIHZybSBieSBVbmlWUk0gZmlsZSBpc1xuICAgICAgLy9cbiAgICAgIC8vIHZlY3RvclByb3BlcnR5XG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVswXSwgdGFyZ2V0VmFsdWVbMV1cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzJdLCB0YXJnZXRWYWx1ZVszXVxuICAgICAgLy9cbiAgICAgIC8vIHRhcmdldFZhbHVlXG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVsyXSwgdGFyZ2V0VmFsdWVbM11cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsxXVxuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yNCgpLmZyb21BcnJheShbXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMl0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMF0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMV0sXG4gICAgICBdKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNDb2xvcikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5DT0xPUjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5Db2xvcikuY2xvbmUoKTtcbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSO1xuICAgICAgZGVmYXVsdFZhbHVlID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBhcmdzLnRhcmdldFZhbHVlWzBdO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlIC0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLnB1c2goe1xuICAgICAgbWF0ZXJpYWwsXG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICB0YXJnZXRWYWx1ZSxcbiAgICAgIGRlbHRhVmFsdWUsXG4gICAgICB0eXBlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgdmlhIHtAbGluayBCbGVuZFNoYXBlTWFzdGVyI3VwZGF0ZX0uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgdyA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPCAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG5cbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSArPSB3ICogYmluZC53ZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSArPSBkZWx0YVZhbHVlICogdztcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIFRIUkVFLlZlY3RvcjI7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjIuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5WZWN0b3IzO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3YzLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuVmVjdG9yNDtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92NC5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHByZXZpb3VzbHkgYXNzaWduZWQgYmxlbmQgc2hhcGVzLlxuICAgKi9cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSA9IDAuMDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdO1xuICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5OVU1CRVIpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZSBhcyBUSFJFRS5WZWN0b3IyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuVmVjdG9yMztcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLlZlY3RvcjQ7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuQ29sb3I7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUeXBlZG9jIGRvZXMgbm90IHN1cHBvcnQgZXhwb3J0IGRlY2xhcmF0aW9ucyB5ZXRcbi8vIHRoZW4gd2UgaGF2ZSB0byB1c2UgYG5hbWVzcGFjZWAgaW5zdGVhZCBvZiBleHBvcnQgZGVjbGFyYXRpb25zIGZvciBub3cuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9UeXBlU3Ryb25nL3R5cGVkb2MvcHVsbC84MDFcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgVlJNU2NoZW1hIHtcbiAgLyoqXG4gICAqIFZSTSBleHRlbnNpb24gaXMgZm9yIDNkIGh1bWFub2lkIGF2YXRhcnMgKGFuZCBtb2RlbHMpIGluIFZSIGFwcGxpY2F0aW9ucy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgVlJNIHtcbiAgICBibGVuZFNoYXBlTWFzdGVyPzogQmxlbmRTaGFwZTtcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIGV4cG9ydGVyIHRoYXQgdnJtIGNyZWF0ZWQuIFVuaVZSTS0wLjUzLjBcbiAgICAgKi9cbiAgICBleHBvcnRlclZlcnNpb24/OiBzdHJpbmc7XG4gICAgZmlyc3RQZXJzb24/OiBGaXJzdFBlcnNvbjtcbiAgICBodW1hbm9pZD86IEh1bWFub2lkO1xuICAgIG1hdGVyaWFsUHJvcGVydGllcz86IE1hdGVyaWFsW107XG4gICAgbWV0YT86IE1ldGE7XG4gICAgc2Vjb25kYXJ5QW5pbWF0aW9uPzogU2Vjb25kYXJ5QW5pbWF0aW9uO1xuICAgIC8qKlxuICAgICAqIFZlcnNpb24gb2YgVlJNIHNwZWNpZmljYXRpb24uIDAuMFxuICAgICAqL1xuICAgIHNwZWNWZXJzaW9uPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIEJsZW5kU2hhcGVBdmF0YXIgb2YgVW5pVlJNXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGUge1xuICAgIGJsZW5kU2hhcGVHcm91cHM/OiBCbGVuZFNoYXBlR3JvdXBbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZUdyb3VwIHtcbiAgICAvKipcbiAgICAgKiBMb3cgbGV2ZWwgYmxlbmRzaGFwZSByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIGJpbmRzPzogQmxlbmRTaGFwZUJpbmRbXTtcbiAgICAvKipcbiAgICAgKiAwIG9yIDEuIERvIG5vdCBhbGxvdyBhbiBpbnRlcm1lZGlhdGUgdmFsdWUuIFZhbHVlIHNob3VsZCByb3VuZGVkXG4gICAgICovXG4gICAgaXNCaW5hcnk/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE1hdGVyaWFsIGFuaW1hdGlvbiByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIG1hdGVyaWFsVmFsdWVzPzogQmxlbmRTaGFwZU1hdGVyaWFsYmluZFtdO1xuICAgIC8qKlxuICAgICAqIEV4cHJlc3Npb24gbmFtZVxuICAgICAqL1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUHJlZGVmaW5lZCBFeHByZXNzaW9uIG5hbWVcbiAgICAgKi9cbiAgICBwcmVzZXROYW1lPzogQmxlbmRTaGFwZVByZXNldE5hbWU7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGVCaW5kIHtcbiAgICBpbmRleD86IG51bWJlcjtcbiAgICBtZXNoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNraW5uZWRNZXNoUmVuZGVyZXIuU2V0QmxlbmRTaGFwZVdlaWdodFxuICAgICAqL1xuICAgIHdlaWdodD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZU1hdGVyaWFsYmluZCB7XG4gICAgbWF0ZXJpYWxOYW1lPzogc3RyaW5nO1xuICAgIHByb3BlcnR5TmFtZT86IHN0cmluZztcbiAgICB0YXJnZXRWYWx1ZT86IG51bWJlcltdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWRlZmluZWQgRXhwcmVzc2lvbiBuYW1lXG4gICAqL1xuICBleHBvcnQgZW51bSBCbGVuZFNoYXBlUHJlc2V0TmFtZSB7XG4gICAgQSA9ICdhJyxcbiAgICBBbmdyeSA9ICdhbmdyeScsXG4gICAgQmxpbmsgPSAnYmxpbmsnLFxuICAgIEJsaW5rTCA9ICdibGlua19sJyxcbiAgICBCbGlua1IgPSAnYmxpbmtfcicsXG4gICAgRSA9ICdlJyxcbiAgICBGdW4gPSAnZnVuJyxcbiAgICBJID0gJ2knLFxuICAgIEpveSA9ICdqb3knLFxuICAgIExvb2tkb3duID0gJ2xvb2tkb3duJyxcbiAgICBMb29rbGVmdCA9ICdsb29rbGVmdCcsXG4gICAgTG9va3JpZ2h0ID0gJ2xvb2tyaWdodCcsXG4gICAgTG9va3VwID0gJ2xvb2t1cCcsXG4gICAgTmV1dHJhbCA9ICduZXV0cmFsJyxcbiAgICBPID0gJ28nLFxuICAgIFNvcnJvdyA9ICdzb3Jyb3cnLFxuICAgIFUgPSAndScsXG4gICAgVW5rbm93biA9ICd1bmtub3duJyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb24ge1xuICAgIC8qKlxuICAgICAqIFRoZSBib25lIHdob3NlIHJlbmRlcmluZyBzaG91bGQgYmUgdHVybmVkIG9mZiBpbiBmaXJzdC1wZXJzb24gdmlldy4gVXN1YWxseSBIZWFkIGlzXG4gICAgICogc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIGZpcnN0UGVyc29uQm9uZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHBvc2l0aW9uIG9mIHRoZSBWUiBoZWFkc2V0IGluIGZpcnN0LXBlcnNvbiB2aWV3LiBJdCBpcyBhc3N1bWVkIHRoYXQgYW4gb2Zmc2V0XG4gICAgICogZnJvbSB0aGUgaGVhZCBib25lIHRvIHRoZSBWUiBoZWFkc2V0IGlzIGFkZGVkLlxuICAgICAqL1xuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldD86IFZlY3RvcjM7XG4gICAgbG9va0F0SG9yaXpvbnRhbElubmVyPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgbG9va0F0SG9yaXpvbnRhbE91dGVyPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgLyoqXG4gICAgICogRXllIGNvbnRyb2xsZXIgbW9kZS5cbiAgICAgKi9cbiAgICBsb29rQXRUeXBlTmFtZT86IEZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWU7XG4gICAgbG9va0F0VmVydGljYWxEb3duPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgbG9va0F0VmVydGljYWxVcD86IEZpcnN0UGVyc29uRGVncmVlTWFwO1xuICAgIC8qKlxuICAgICAqIFN3aXRjaCBkaXNwbGF5IC8gdW5kaXNwbGF5IGZvciBlYWNoIG1lc2ggaW4gZmlyc3QtcGVyc29uIHZpZXcgb3IgdGhlIG90aGVycy5cbiAgICAgKi9cbiAgICBtZXNoQW5ub3RhdGlvbnM/OiBGaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uW107XG4gIH1cblxuICAvKipcbiAgICogRXllIGNvbnRyb2xsZXIgc2V0dGluZy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb25EZWdyZWVNYXAge1xuICAgIC8qKlxuICAgICAqIE5vbmUgbGluZWFyIG1hcHBpbmcgcGFyYW1zLiB0aW1lLCB2YWx1ZSwgaW5UYW5nZW50LCBvdXRUYW5nZW50XG4gICAgICovXG4gICAgY3VydmU/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBMb29rIGF0IGlucHV0IGNsYW1wIHJhbmdlIGRlZ3JlZS5cbiAgICAgKi9cbiAgICB4UmFuZ2U/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTG9vayBhdCBtYXAgcmFuZ2UgZGVncmVlIGZyb20geFJhbmdlLlxuICAgICAqL1xuICAgIHlSYW5nZT86IG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeWUgY29udHJvbGxlciBtb2RlLlxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZSB7XG4gICAgQmxlbmRTaGFwZSA9ICdCbGVuZFNoYXBlJyxcbiAgICBCb25lID0gJ0JvbmUnLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uIHtcbiAgICBmaXJzdFBlcnNvbkZsYWc/OiBzdHJpbmc7XG4gICAgbWVzaD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSHVtYW5vaWQge1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5hcm1TdHJldGNoXG4gICAgICovXG4gICAgYXJtU3RyZXRjaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uZmVldFNwYWNpbmdcbiAgICAgKi9cbiAgICBmZWV0U3BhY2luZz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uaGFzVHJhbnNsYXRpb25Eb0ZcbiAgICAgKi9cbiAgICBoYXNUcmFuc2xhdGlvbkRvRj86IGJvb2xlYW47XG4gICAgaHVtYW5Cb25lcz86IEh1bWFub2lkQm9uZVtdO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5sZWdTdHJldGNoXG4gICAgICovXG4gICAgbGVnU3RyZXRjaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24ubG93ZXJBcm1Ud2lzdFxuICAgICAqL1xuICAgIGxvd2VyQXJtVHdpc3Q/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmxvd2VyTGVnVHdpc3RcbiAgICAgKi9cbiAgICBsb3dlckxlZ1R3aXN0PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi51cHBlckFybVR3aXN0XG4gICAgICovXG4gICAgdXBwZXJBcm1Ud2lzdD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24udXBwZXJMZWdUd2lzdFxuICAgICAqL1xuICAgIHVwcGVyTGVnVHdpc3Q/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEh1bWFub2lkQm9uZSB7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LmF4aXNMZW5ndGhcbiAgICAgKi9cbiAgICBheGlzTGVuZ3RoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEh1bWFuIGJvbmUgbmFtZS5cbiAgICAgKi9cbiAgICBib25lPzogSHVtYW5vaWRCb25lTmFtZTtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQuY2VudGVyXG4gICAgICovXG4gICAgY2VudGVyPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWF4XG4gICAgICovXG4gICAgbWF4PzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWluXG4gICAgICovXG4gICAgbWluPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2Ugbm9kZSBpbmRleFxuICAgICAqL1xuICAgIG5vZGU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LnVzZURlZmF1bHRWYWx1ZXNcbiAgICAgKi9cbiAgICB1c2VEZWZhdWx0VmFsdWVzPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIdW1hbiBib25lIG5hbWUuXG4gICAqL1xuICBleHBvcnQgZW51bSBIdW1hbm9pZEJvbmVOYW1lIHtcbiAgICBDaGVzdCA9ICdjaGVzdCcsXG4gICAgSGVhZCA9ICdoZWFkJyxcbiAgICBIaXBzID0gJ2hpcHMnLFxuICAgIEphdyA9ICdqYXcnLFxuICAgIExlZnRFeWUgPSAnbGVmdEV5ZScsXG4gICAgTGVmdEZvb3QgPSAnbGVmdEZvb3QnLFxuICAgIExlZnRIYW5kID0gJ2xlZnRIYW5kJyxcbiAgICBMZWZ0SW5kZXhEaXN0YWwgPSAnbGVmdEluZGV4RGlzdGFsJyxcbiAgICBMZWZ0SW5kZXhJbnRlcm1lZGlhdGUgPSAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0SW5kZXhQcm94aW1hbCA9ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gICAgTGVmdExpdHRsZURpc3RhbCA9ICdsZWZ0TGl0dGxlRGlzdGFsJyxcbiAgICBMZWZ0TGl0dGxlSW50ZXJtZWRpYXRlID0gJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRMaXR0bGVQcm94aW1hbCA9ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICAgIExlZnRMb3dlckFybSA9ICdsZWZ0TG93ZXJBcm0nLFxuICAgIExlZnRMb3dlckxlZyA9ICdsZWZ0TG93ZXJMZWcnLFxuICAgIExlZnRNaWRkbGVEaXN0YWwgPSAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICAgTGVmdE1pZGRsZUludGVybWVkaWF0ZSA9ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0TWlkZGxlUHJveGltYWwgPSAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgICBMZWZ0UmluZ0Rpc3RhbCA9ICdsZWZ0UmluZ0Rpc3RhbCcsXG4gICAgTGVmdFJpbmdJbnRlcm1lZGlhdGUgPSAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRSaW5nUHJveGltYWwgPSAnbGVmdFJpbmdQcm94aW1hbCcsXG4gICAgTGVmdFNob3VsZGVyID0gJ2xlZnRTaG91bGRlcicsXG4gICAgTGVmdFRodW1iRGlzdGFsID0gJ2xlZnRUaHVtYkRpc3RhbCcsXG4gICAgTGVmdFRodW1iSW50ZXJtZWRpYXRlID0gJ2xlZnRUaHVtYkludGVybWVkaWF0ZScsXG4gICAgTGVmdFRodW1iUHJveGltYWwgPSAnbGVmdFRodW1iUHJveGltYWwnLFxuICAgIExlZnRUb2VzID0gJ2xlZnRUb2VzJyxcbiAgICBMZWZ0VXBwZXJBcm0gPSAnbGVmdFVwcGVyQXJtJyxcbiAgICBMZWZ0VXBwZXJMZWcgPSAnbGVmdFVwcGVyTGVnJyxcbiAgICBOZWNrID0gJ25lY2snLFxuICAgIFJpZ2h0RXllID0gJ3JpZ2h0RXllJyxcbiAgICBSaWdodEZvb3QgPSAncmlnaHRGb290JyxcbiAgICBSaWdodEhhbmQgPSAncmlnaHRIYW5kJyxcbiAgICBSaWdodEluZGV4RGlzdGFsID0gJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICAgIFJpZ2h0SW5kZXhJbnRlcm1lZGlhdGUgPSAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICAgUmlnaHRJbmRleFByb3hpbWFsID0gJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gICAgUmlnaHRMaXR0bGVEaXN0YWwgPSAncmlnaHRMaXR0bGVEaXN0YWwnLFxuICAgIFJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlID0gJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodExpdHRsZVByb3hpbWFsID0gJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICAgIFJpZ2h0TG93ZXJBcm0gPSAncmlnaHRMb3dlckFybScsXG4gICAgUmlnaHRMb3dlckxlZyA9ICdyaWdodExvd2VyTGVnJyxcbiAgICBSaWdodE1pZGRsZURpc3RhbCA9ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gICAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUgPSAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0TWlkZGxlUHJveGltYWwgPSAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gICAgUmlnaHRSaW5nRGlzdGFsID0gJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlID0gJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gICAgUmlnaHRSaW5nUHJveGltYWwgPSAncmlnaHRSaW5nUHJveGltYWwnLFxuICAgIFJpZ2h0U2hvdWxkZXIgPSAncmlnaHRTaG91bGRlcicsXG4gICAgUmlnaHRUaHVtYkRpc3RhbCA9ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgICBSaWdodFRodW1iSW50ZXJtZWRpYXRlID0gJ3JpZ2h0VGh1bWJJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0VGh1bWJQcm94aW1hbCA9ICdyaWdodFRodW1iUHJveGltYWwnLFxuICAgIFJpZ2h0VG9lcyA9ICdyaWdodFRvZXMnLFxuICAgIFJpZ2h0VXBwZXJBcm0gPSAncmlnaHRVcHBlckFybScsXG4gICAgUmlnaHRVcHBlckxlZyA9ICdyaWdodFVwcGVyTGVnJyxcbiAgICBTcGluZSA9ICdzcGluZScsXG4gICAgVXBwZXJDaGVzdCA9ICd1cHBlckNoZXN0JyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWwge1xuICAgIGZsb2F0UHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAga2V5d29yZE1hcD86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgbmFtZT86IHN0cmluZztcbiAgICByZW5kZXJRdWV1ZT86IG51bWJlcjtcbiAgICBzaGFkZXI/OiBzdHJpbmc7XG4gICAgdGFnTWFwPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICB0ZXh0dXJlUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgdmVjdG9yUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE1ldGEge1xuICAgIC8qKlxuICAgICAqIEEgcGVyc29uIHdobyBjYW4gcGVyZm9ybSB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgYWxsb3dlZFVzZXJOYW1lPzogTWV0YUFsbG93ZWRVc2VyTmFtZTtcbiAgICAvKipcbiAgICAgKiBBdXRob3Igb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgYXV0aG9yPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEZvciBjb21tZXJjaWFsIHVzZVxuICAgICAqL1xuICAgIGNvbW1lcmNpYWxVc3NhZ2VOYW1lPzogTWV0YVVzc2FnZU5hbWU7XG4gICAgLyoqXG4gICAgICogQ29udGFjdCBJbmZvcm1hdGlvbiBvZiBWUk0gbW9kZWwgYXV0aG9yXG4gICAgICovXG4gICAgY29udGFjdEluZm9ybWF0aW9uPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIExpY2Vuc2UgdHlwZVxuICAgICAqL1xuICAgIGxpY2Vuc2VOYW1lPzogTWV0YUxpY2Vuc2VOYW1lO1xuICAgIC8qKlxuICAgICAqIElmIOKAnE90aGVy4oCdIGlzIHNlbGVjdGVkLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50IGhlcmUuXG4gICAgICovXG4gICAgb3RoZXJMaWNlbnNlVXJsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIElmIHRoZXJlIGFyZSBhbnkgY29uZGl0aW9ucyBub3QgbWVudGlvbmVkIGFib3ZlLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50XG4gICAgICogaGVyZS5cbiAgICAgKi9cbiAgICBvdGhlclBlcm1pc3Npb25Vcmw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHJlZmVyZW5jZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gc2V4dWFsIGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgICAqL1xuICAgIHNleHVhbFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgICAvKipcbiAgICAgKiBUaHVtYm5haWwgb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgdGV4dHVyZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICB0aXRsZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHZlcnNpb24/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHZpb2xlbnQgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgdmlvbGVudFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHBlcnNvbiB3aG8gY2FuIHBlcmZvcm0gd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YUFsbG93ZWRVc2VyTmFtZSB7XG4gICAgRXZlcnlvbmUgPSAnRXZlcnlvbmUnLFxuICAgIEV4cGxpY2l0bHlMaWNlbnNlZFBlcnNvbiA9ICdFeHBsaWNpdGx5TGljZW5zZWRQZXJzb24nLFxuICAgIE9ubHlBdXRob3IgPSAnT25seUF1dGhvcicsXG4gIH1cblxuICAvKipcbiAgICogRm9yIGNvbW1lcmNpYWwgdXNlXG4gICAqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSBzZXh1YWwgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSB2aW9sZW50IGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YVVzc2FnZU5hbWUge1xuICAgIEFsbG93ID0gJ0FsbG93JyxcbiAgICBEaXNhbGxvdyA9ICdEaXNhbGxvdycsXG4gIH1cblxuICAvKipcbiAgICogTGljZW5zZSB0eXBlXG4gICAqL1xuICBleHBvcnQgZW51bSBNZXRhTGljZW5zZU5hbWUge1xuICAgIENjMCA9ICdDQzAnLFxuICAgIENjQnkgPSAnQ0NfQlknLFxuICAgIENjQnlOYyA9ICdDQ19CWV9OQycsXG4gICAgQ2NCeU5jTmQgPSAnQ0NfQllfTkNfTkQnLFxuICAgIENjQnlOY1NhID0gJ0NDX0JZX05DX1NBJyxcbiAgICBDY0J5TmQgPSAnQ0NfQllfTkQnLFxuICAgIENjQnlTYSA9ICdDQ19CWV9TQScsXG4gICAgT3RoZXIgPSAnT3RoZXInLFxuICAgIFJlZGlzdHJpYnV0aW9uUHJvaGliaXRlZCA9ICdSZWRpc3RyaWJ1dGlvbl9Qcm9oaWJpdGVkJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2V0dGluZyBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uIG9mIHN0cmluZy1saWtlIG9iamVjdHMgc3VjaCBhcyB0YWlscyBhbmQgaGFpcnMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlY29uZGFyeUFuaW1hdGlvbiB7XG4gICAgYm9uZUdyb3Vwcz86IFNlY29uZGFyeUFuaW1hdGlvblNwcmluZ1tdO1xuICAgIGNvbGxpZGVyR3JvdXBzPzogU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJncm91cFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25TcHJpbmcge1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIG5vZGUgaW5kZXggb2YgdGhlIHJvb3QgYm9uZSBvZiB0aGUgc3dheWluZyBvYmplY3QuXG4gICAgICovXG4gICAgYm9uZXM/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVmZXJlbmNlIHBvaW50IG9mIGEgc3dheWluZyBvYmplY3QgY2FuIGJlIHNldCBhdCBhbnkgbG9jYXRpb24gZXhjZXB0IHRoZSBvcmlnaW4uXG4gICAgICogV2hlbiBpbXBsZW1lbnRpbmcgVUkgbW92aW5nIHdpdGggd2FycCwgdGhlIHBhcmVudCBub2RlIHRvIG1vdmUgd2l0aCB3YXJwIGNhbiBiZSBzcGVjaWZpZWRcbiAgICAgKiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBtYWtlIHRoZSBvYmplY3Qgc3dheWluZyB3aXRoIHdhcnAgbW92ZW1lbnQuXG4gICAgICovXG4gICAgY2VudGVyPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGluZGV4IG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3IgY29sbGlzaW9ucyB3aXRoIHN3YXlpbmcgb2JqZWN0cy5cbiAgICAgKi9cbiAgICBjb2xsaWRlckdyb3Vwcz86IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIEFubm90YXRpb24gY29tbWVudFxuICAgICAqL1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHJlc2lzdGFuY2UgKGRlY2VsZXJhdGlvbikgb2YgYXV0b21hdGljIGFuaW1hdGlvbi5cbiAgICAgKi9cbiAgICBkcmFnRm9yY2U/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIGRpcmVjdGlvbiBvZiBncmF2aXR5LiBTZXQgKDAsIC0xLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgZ3Jhdml0eS4gU2V0ICgxLCAwLCAwKSBmb3JcbiAgICAgKiBzaW11bGF0aW5nIHRoZSB3aW5kLlxuICAgICAqL1xuICAgIGdyYXZpdHlEaXI/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiBncmF2aXR5LlxuICAgICAqL1xuICAgIGdyYXZpdHlQb3dlcj86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgdXNlZCBmb3IgdGhlIGNvbGxpc2lvbiBkZXRlY3Rpb24gd2l0aCBjb2xsaWRlcnMuXG4gICAgICovXG4gICAgaGl0UmFkaXVzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSByZXNpbGllbmNlIG9mIHRoZSBzd2F5aW5nIG9iamVjdCAodGhlIHBvd2VyIG9mIHJldHVybmluZyB0byB0aGUgaW5pdGlhbCBwb3NlKS5cbiAgICAgKi9cbiAgICBzdGlmZmluZXNzPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcmdyb3VwIHtcbiAgICBjb2xsaWRlcnM/OiBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcltdO1xuICAgIC8qKlxuICAgICAqIFRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3Igc2V0dGluZyB1cCBjb2xsaXNpb24gZGV0ZWN0aW9ucy5cbiAgICAgKi9cbiAgICBub2RlPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlciB7XG4gICAgLyoqXG4gICAgICogVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXG4gICAgICovXG4gICAgb2Zmc2V0PzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cbiAgICAgKi9cbiAgICByYWRpdXM/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFZlY3RvcjMge1xuICAgIHg/OiBudW1iZXI7XG4gICAgeT86IG51bWJlcjtcbiAgICB6PzogbnVtYmVyO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB0eXBlIHsgR0xURlByaW1pdGl2ZSwgR0xURlNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBHTFRGUHJpbWl0aXZlW10gfCBudWxsIHtcbiAgY29uc3Qgc2NoZW1hTm9kZTogR0xURlNjaGVtYS5Ob2RlID0gZ2x0Zi5wYXJzZXIuanNvbi5ub2Rlc1tub2RlSW5kZXhdO1xuICBjb25zdCBtZXNoSW5kZXggPSBzY2hlbWFOb2RlLm1lc2g7XG4gIGlmIChtZXNoSW5kZXggPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc2NoZW1hTWVzaDogR0xURlNjaGVtYS5NZXNoID0gZ2x0Zi5wYXJzZXIuanNvbi5tZXNoZXNbbWVzaEluZGV4XTtcblxuICBjb25zdCBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10gPSBbXTtcblxuICBpZiAoKG5vZGUgYXMgYW55KS5pc01lc2gpIHtcbiAgICBwcmltaXRpdmVzLnB1c2gobm9kZSBhcyBHTFRGUHJpbWl0aXZlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwcmltaXRpdmVzQ291bnQgPSBzY2hlbWFNZXNoLnByaW1pdGl2ZXMubGVuZ3RoO1xuXG4gICAgLy8gYXNzdW1pbmcgZmlyc3QgKHByaW1pdGl2ZXNDb3VudCkgY2hpbGRyZW4gYXJlIGl0cyBwcmltaXRpdmVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmltaXRpdmVzQ291bnQ7IGkrKykge1xuICAgICAgcHJpbWl0aXZlcy5wdXNoKG5vZGUuY2hpbGRyZW5baV0gYXMgR0xURlByaW1pdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPEdMVEZQcmltaXRpdmVbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgR0xURlByaW1pdGl2ZVtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgR0xURlByaW1pdGl2ZVtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiByZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICBjb25zb2xlLndhcm4oYHJlbmFtZU1hdGVyaWFsUHJvcGVydHk6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIG5hbWUgPSBuYW1lLnN1YnN0cmluZygxKTtcblxuICBpZiAoIS9bQS1aXS8udGVzdChuYW1lWzBdKSkge1xuICAgIGNvbnNvbGUud2FybihgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eTogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgcmV0dXJuIG5hbWVbMF0udG9Mb3dlckNhc2UoKSArIG5hbWUuc3Vic3RyaW5nKDEpO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIENsYW1wIGFuIGlucHV0IG51bWJlciB3aXRoaW4gWyBgMC4wYCAtIGAxLjBgIF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHJhbmdlIG9mIGFuIGlucHV0IHZhbHVlIGZyb20gWyBgbWluYCAtIGBtYXhgIF0gdG8gWyBgMC4wYCAtIGAxLjBgIF0uXG4gKiBJZiBpbnB1dCB2YWx1ZSBpcyBsZXNzIHRoYW4gYG1pbmAgLCBpdCByZXR1cm5zIGAwLjBgLlxuICogSWYgaW5wdXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIGBtYXhgICwgaXQgcmV0dXJucyBgMS4wYC5cbiAqXG4gKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vbWF0aC9NYXRoLnNtb290aHN0ZXBcbiAqXG4gKiBAcGFyYW0geCBUaGUgdmFsdWUgdGhhdCB3aWxsIGJlIG1hcHBlZCBpbnRvIHRoZSBzcGVjaWZpZWQgcmFuZ2VcbiAqIEBwYXJhbSBtaW4gTWluaW11bSB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAqIEBwYXJhbSBtYXggTWF4aW11bSB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbnN0ZXAoeDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoeCA8PSBtaW4pIHJldHVybiAwO1xuICBpZiAoeCA+PSBtYXgpIHJldHVybiAxO1xuXG4gIHJldHVybiAoeCAtIG1pbikgLyAobWF4IC0gbWluKTtcbn1cblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgcG9zaXRpb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUG9zaXRpb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKG91dCwgX3JvdGF0aW9uLCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgc2NhbGUgb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkU2NhbGVMaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgX3JvdGF0aW9uLCBvdXQpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgcm90YXRpb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUXVhdGVybmlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3Bvc2l0aW9uLCBvdXQsIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG4iLCJpbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUdyb3VwIH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlR3JvdXAnO1xuXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZVByb3h5IHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgcmVnaXN0ZXJlZCBibGVuZCBzaGFwZS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVHcm91cHM6IHsgW25hbWU6IHN0cmluZ106IFZSTUJsZW5kU2hhcGVHcm91cCB9ID0ge307XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gW1tWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdXSB0byBpdHMgYWN0dWFsIGJsZW5kIHNoYXBlIG5hbWUuXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9ibGVuZFNoYXBlUHJlc2V0TWFwOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgbmFtZSBvZiB1bmtub3duIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3Vua25vd25Hcm91cE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNQmxlbmRTaGFwZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBuYW1lIG9mIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGV4cHJlc3Npb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3Vwcyk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBbW1ZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV1dIHRvIGl0cyBhY3R1YWwgYmxlbmQgc2hhcGUgbmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgYmxlbmRTaGFwZVByZXNldE1hcCgpOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXA7XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIG5hbWUgb2YgdW5rbm93biBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHVua25vd25Hcm91cE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdW5rbm93bkdyb3VwTmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWU6IHN0cmluZyB8IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSk6IFZSTUJsZW5kU2hhcGVHcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJlc2V0TmFtZSA9IHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXBbbmFtZSBhcyBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwcmVzZXROYW1lID8gdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1twcmVzZXROYW1lXSA6IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oYG5vIGJsZW5kIHNoYXBlIGZvdW5kIGJ5ICR7bmFtZX1gKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdvcnVwXG4gICAqIEBwYXJhbSBjb250cm9sbGVyIFZSTUJsZW5kU2hhcGVDb250cm9sbGVyIHRoYXQgZGVzY3JpYmVzIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwcmVzZXROYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCB1bmRlZmluZWQsXG4gICAgY29udHJvbGxlcjogVlJNQmxlbmRTaGFwZUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdID0gY29udHJvbGxlcjtcbiAgICBpZiAocHJlc2V0TmFtZSkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByZXNldE1hcFtwcmVzZXROYW1lXSA9IG5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Vua25vd25Hcm91cE5hbWVzLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHdlaWdodCBvZiBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xuICAgIHJldHVybiBjb250cm9sbGVyPy53ZWlnaHQgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB3ZWlnaHQgdG8gc3BlY2lmaWVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKiBAcGFyYW0gd2VpZ2h0IFdlaWdodFxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5nZXRCbGVuZFNoYXBlR3JvdXAobmFtZSk7XG4gICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIud2VpZ2h0ID0gc2F0dXJhdGUod2VpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdHJhY2sgbmFtZSBvZiBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgYmxlbmQgc2hhcGUgZ3JvdXAgdmlhIGtleWZyYW1lIGFuaW1hdGlvbnMuXG4gICAqXG4gICAqIEBleGFtcGxlIE1hbmlwdWxhdGUgYSBibGVuZCBzaGFwZSBncm91cCB1c2luZyBrZXlmcmFtZSBhbmltYXRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgdHJhY2tOYW1lID0gdnJtLmJsZW5kU2hhcGVQcm94eS5nZXRCbGVuZFNoYXBlVHJhY2tOYW1lKCBUSFJFRS5WUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuQmxpbmsgKTtcbiAgICogY29uc3QgdHJhY2sgPSBuZXcgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjayhcbiAgICogICBuYW1lLFxuICAgKiAgIFsgMC4wLCAwLjUsIDEuMCBdLCAvLyB0aW1lc1xuICAgKiAgIFsgMC4wLCAxLjAsIDAuMCBdIC8vIHZhbHVlc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBjbGlwID0gbmV3IFRIUkVFLkFuaW1hdGlvbkNsaXAoXG4gICAqICAgJ2JsaW5rJywgLy8gbmFtZVxuICAgKiAgIDEuMCwgLy8gZHVyYXRpb25cbiAgICogICBbIHRyYWNrIF0gLy8gdHJhY2tzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IG1peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKCB2cm0uc2NlbmUgKTtcbiAgICogY29uc3QgYWN0aW9uID0gbWl4ZXIuY2xpcEFjdGlvbiggY2xpcCApO1xuICAgKiBhY3Rpb24ucGxheSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBnZXRCbGVuZFNoYXBlVHJhY2tOYW1lKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldEJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICByZXR1cm4gY29udHJvbGxlciA/IGAke2NvbnRyb2xsZXIubmFtZX0ud2VpZ2h0YCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGV2ZXJ5IGJsZW5kIHNoYXBlIGdyb3Vwcy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgICBjb250cm9sbGVyLmNsZWFyQXBwbGllZFdlaWdodCgpO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgICBjb250cm9sbGVyLmFwcGx5V2VpZ2h0KCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IEdMVEZTY2hlbWEsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eSB9IGZyb20gJy4uL3V0aWxzL3JlbmFtZU1hdGVyaWFsUHJvcGVydHknO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUdyb3VwIH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlR3JvdXAnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlUHJveHknO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNQmxlbmRTaGFwZV1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUJsZW5kU2hhcGVJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUJsZW5kU2hhcGVdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNQmxlbmRTaGFwZVByb3h5IHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlOiBWUk1TY2hlbWEuQmxlbmRTaGFwZSB8IHVuZGVmaW5lZCA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZSA9IG5ldyBWUk1CbGVuZFNoYXBlUHJveHkoKTtcblxuICAgIGNvbnN0IGJsZW5kU2hhcGVHcm91cHM6IFZSTVNjaGVtYS5CbGVuZFNoYXBlR3JvdXBbXSB8IHVuZGVmaW5lZCA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIWJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBibGVuZFNoYXBlO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVQcmVzZXRNYXA6IHsgW3ByZXNldE5hbWUgaW4gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9ID0ge307XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gc2NoZW1hR3JvdXAubmFtZTtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJNQmxlbmRTaGFwZUltcG9ydGVyOiBPbmUgb2YgYmxlbmRTaGFwZUdyb3VwcyBoYXMgbm8gbmFtZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcmVzZXROYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzY2hlbWFHcm91cC5wcmVzZXROYW1lICYmXG4gICAgICAgICAgc2NoZW1hR3JvdXAucHJlc2V0TmFtZSAhPT0gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLlVua25vd24gJiZcbiAgICAgICAgICAhYmxlbmRTaGFwZVByZXNldE1hcFtzY2hlbWFHcm91cC5wcmVzZXROYW1lXVxuICAgICAgICApIHtcbiAgICAgICAgICBwcmVzZXROYW1lID0gc2NoZW1hR3JvdXAucHJlc2V0TmFtZTtcbiAgICAgICAgICBibGVuZFNoYXBlUHJlc2V0TWFwW3NjaGVtYUdyb3VwLnByZXNldE5hbWVdID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFZSTUJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZ3JvdXApO1xuXG4gICAgICAgIGdyb3VwLmlzQmluYXJ5ID0gc2NoZW1hR3JvdXAuaXNCaW5hcnkgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKHNjaGVtYUdyb3VwLmJpbmRzKSB7XG4gICAgICAgICAgc2NoZW1hR3JvdXAuYmluZHMuZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmQubWVzaCA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVzVXNpbmdNZXNoOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgKGdsdGYucGFyc2VyLmpzb24ubm9kZXMgYXMgR0xURlNjaGVtYS5Ob2RlW10pLmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUubWVzaCA9PT0gYmluZC5tZXNoKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gucHVzaChpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgbm9kZXNVc2luZ01lc2gubWFwKGFzeW5jIChub2RlSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gKGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlKGdsdGYsIG5vZGVJbmRleCkpITtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBtZXNoIGhhcyB0aGUgdGFyZ2V0IG1vcnBoIHRhcmdldFxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICFwcmltaXRpdmVzLmV2ZXJ5KFxuICAgICAgICAgICAgICAgICAgICAocHJpbWl0aXZlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcykgJiZcbiAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4IDwgcHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICAgIGBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI6ICR7c2NoZW1hR3JvdXAubmFtZX0gYXR0ZW1wdHMgdG8gaW5kZXggJHttb3JwaFRhcmdldEluZGV4fXRoIG1vcnBoIGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZ3JvdXAuYWRkQmluZCh7XG4gICAgICAgICAgICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgd2VpZ2h0OiBiaW5kLndlaWdodCA/PyAxMDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsVmFsdWVzID0gc2NoZW1hR3JvdXAubWF0ZXJpYWxWYWx1ZXM7XG4gICAgICAgIGlmIChtYXRlcmlhbFZhbHVlcykge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbFtdIHwgVEhSRUUuTWF0ZXJpYWwgPSAob2JqZWN0IGFzIGFueSkubWF0ZXJpYWw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgLi4ubWF0ZXJpYWwuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgIChtdGwpID0+IG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgJiYgbWF0ZXJpYWxzLmluZGV4T2YobXRsKSA9PT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgJiYgbWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBncm91cC5hZGRNYXRlcmlhbFZhbHVlKHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHJlbmFtZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUhKSxcbiAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBibGVuZFNoYXBlLnJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKG5hbWUsIHByZXNldE5hbWUsIGdyb3VwKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gYmxlbmRTaGFwZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURk5vZGUsIEdMVEZQcmltaXRpdmUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5cbmNvbnN0IFZFQ1RPUjNfRlJPTlQgPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAtMS4wKSk7XG5cbmNvbnN0IF9xdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuZW51bSBGaXJzdFBlcnNvbkZsYWcge1xuICBBdXRvLFxuICBCb3RoLFxuICBUaGlyZFBlcnNvbk9ubHksXG4gIEZpcnN0UGVyc29uT25seSxcbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgW2BtZXNoQW5ub3RhdGlvbmBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8wLjAvc2NoZW1hL3ZybS5maXJzdHBlcnNvbi5tZXNoYW5ub3RhdGlvbi5zY2hlbWEuanNvbikgZW50cnkuXG4gKiBFYWNoIG1lc2ggd2lsbCBiZSBhc3NpZ25lZCB0byBzcGVjaWZpZWQgbGF5ZXIgd2hlbiB5b3UgY2FsbCBbW1ZSTUZpcnN0UGVyc29uLnNldHVwXV0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3Mge1xuICBwcml2YXRlIHN0YXRpYyBfcGFyc2VGaXJzdFBlcnNvbkZsYWcoZmlyc3RQZXJzb25GbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBGaXJzdFBlcnNvbkZsYWcge1xuICAgIHN3aXRjaCAoZmlyc3RQZXJzb25GbGFnKSB7XG4gICAgICBjYXNlICdCb3RoJzpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5Cb3RoO1xuICAgICAgY2FzZSAnVGhpcmRQZXJzb25Pbmx5JzpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5UaGlyZFBlcnNvbk9ubHk7XG4gICAgICBjYXNlICdGaXJzdFBlcnNvbk9ubHknOlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkZpcnN0UGVyc29uT25seTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuQXV0bztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBbW0ZpcnN0UGVyc29uRmxhZ11dIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgcHVibGljIGZpcnN0UGVyc29uRmxhZzogRmlyc3RQZXJzb25GbGFnO1xuXG4gIC8qKlxuICAgKiBBIG1lc2ggcHJpbWl0aXZlcyBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIHB1YmxpYyBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtZXNoIGFubm90YXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvbkZsYWcgQSBbW0ZpcnN0UGVyc29uRmxhZ11dIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5XG4gICAqIEBwYXJhbSBub2RlIEEgbm9kZSBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGZpcnN0UGVyc29uRmxhZzogc3RyaW5nIHwgdW5kZWZpbmVkLCBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10pIHtcbiAgICB0aGlzLmZpcnN0UGVyc29uRmxhZyA9IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncy5fcGFyc2VGaXJzdFBlcnNvbkZsYWcoZmlyc3RQZXJzb25GbGFnKTtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbiB7XG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldEZpcnN0UGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldFRoaXJkUGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9maXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoQW5ub3RhdGlvbnM6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpcnN0UGVyc29uQm9uZU9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XG4gIHByaXZhdGUgX3RoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUjtcblxuICBwcml2YXRlIF9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRmlyc3RQZXJzb24gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb25Cb25lIEEgZmlyc3QgcGVyc29uIGJvbmVcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uQm9uZU9mZnNldCBBbiBvZmZzZXQgZnJvbSB0aGUgc3BlY2lmaWVkIGZpcnN0IHBlcnNvbiBib25lXG4gICAqIEBwYXJhbSBtZXNoQW5ub3RhdGlvbnMgQSByZW5kZXJlciBzZXR0aW5ncy4gU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiBbW1JlbmRlcmVyRmlyc3RQZXJzb25GbGFnc11dIGZvciBtb3JlIGluZm9cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGZpcnN0UGVyc29uQm9uZTogR0xURk5vZGUsXG4gICAgZmlyc3RQZXJzb25Cb25lT2Zmc2V0OiBUSFJFRS5WZWN0b3IzLFxuICAgIG1lc2hBbm5vdGF0aW9uczogVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzW10sXG4gICkge1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uQm9uZSA9IGZpcnN0UGVyc29uQm9uZTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQgPSBmaXJzdFBlcnNvbkJvbmVPZmZzZXQ7XG4gICAgdGhpcy5fbWVzaEFubm90YXRpb25zID0gbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbkJvbmUoKTogR0xURk5vZGUge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbkJvbmU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lc2hBbm5vdGF0aW9ucygpOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbldvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0YXJnZXQuY29weShWRUNUT1IzX0ZST05UKS5hcHBseVF1YXRlcm5pb24oZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLl9maXJzdFBlcnNvbkJvbmUsIF9xdWF0KSk7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCBbW3NldHVwXV0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMgW1tERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVJdXSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEgW1tzZXR1cF1dIGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIFtbc2V0dXBdXSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyBbW0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUl1dIGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSBbW3NldHVwXV0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgcHVibGljIGdldEZpcnN0UGVyc29uQm9uZU9mZnNldCh0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcGVyc29uLlxuICAgKiBUaGUgcG9zaXRpb24gdGFrZXMgW1tGaXJzdFBlcnNvbkJvbmVdXSBhbmQgW1tGaXJzdFBlcnNvbk9mZnNldF1dIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogQHBhcmFtIHYzIHRhcmdldFxuICAgKiBAcmV0dXJucyBDdXJyZW50IHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwZXJzb25cbiAgICovXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24odjM6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICAvLyBVbmlWUk0jVlJNRmlyc3RQZXJzb25FZGl0b3JcbiAgICAvLyB2YXIgd29ybGRPZmZzZXQgPSBoZWFkLmxvY2FsVG9Xb3JsZE1hdHJpeC5NdWx0aXBseVBvaW50KGNvbXBvbmVudC5GaXJzdFBlcnNvbk9mZnNldCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xuICAgIGNvbnN0IHY0ID0gbmV3IFRIUkVFLlZlY3RvcjQob2Zmc2V0LngsIG9mZnNldC55LCBvZmZzZXQueiwgMS4wKTtcbiAgICB2NC5hcHBseU1hdHJpeDQodGhpcy5fZmlyc3RQZXJzb25Cb25lLm1hdHJpeFdvcmxkKTtcbiAgICByZXR1cm4gdjMuc2V0KHY0LngsIHY0LnksIHY0LnopO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcykgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSLFxuICAgIHRoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUixcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLl9tZXNoQW5ub3RhdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuRmlyc3RQZXJzb25Pbmx5KSB7XG4gICAgICAgIGl0ZW0ucHJpbWl0aXZlcy5mb3JFYWNoKChwcmltaXRpdmUpID0+IHtcbiAgICAgICAgICBwcmltaXRpdmUubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLlRoaXJkUGVyc29uT25seSkge1xuICAgICAgICBpdGVtLnByaW1pdGl2ZXMuZm9yRWFjaCgocHJpbWl0aXZlKSA9PiB7XG4gICAgICAgICAgcHJpbWl0aXZlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5BdXRvKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWwoaXRlbS5wcmltaXRpdmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnk7XG5cbiAgICBjb25zdCBza2luSW5kZXhBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKS5hcnJheTtcbiAgICBjb25zdCBza2luSW5kZXggPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5JbmRleC5wdXNoKFtza2luSW5kZXhBdHRyW2ldLCBza2luSW5kZXhBdHRyW2kgKyAxXSwgc2tpbkluZGV4QXR0cltpICsgMl0sIHNraW5JbmRleEF0dHJbaSArIDNdXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKS5hcnJheTtcbiAgICBjb25zdCBza2luV2VpZ2h0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luV2VpZ2h0QXR0ci5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbldlaWdodC5wdXNoKFtza2luV2VpZ2h0QXR0cltpXSwgc2tpbldlaWdodEF0dHJbaSArIDFdLCBza2luV2VpZ2h0QXR0cltpICsgMl0sIHNraW5XZWlnaHRBdHRyW2kgKyAzXV0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kZXgoKTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VvbWV0cnkgZG9lc24ndCBoYXZlIGFuIGluZGV4IGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVHJpYW5nbGVzID0gQXJyYXkuZnJvbShpbmRleC5hcnJheSk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2V4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50OiBUSFJFRS5PYmplY3QzRCwgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBlcmFzZUJvbmVJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIG1lc2guc2tlbGV0b24uYm9uZXMuZm9yRWFjaCgoYm9uZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUpKSBlcmFzZUJvbmVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gVW5saWtlIFVuaVZSTSB3ZSBkb24ndCBjb3B5IG1lc2ggaWYgbm8gaW52aXNpYmxlIGJvbmUgd2FzIGZvdW5kXG4gICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgY29uc3QgbmV3TWVzaCA9IHRoaXMuX2NyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWwocHJpbWl0aXZlczogR0xURlByaW1pdGl2ZVtdKTogdm9pZCB7XG4gICAgcHJpbWl0aXZlcy5mb3JFYWNoKChwcmltaXRpdmUpID0+IHtcbiAgICAgIGlmIChwcmltaXRpdmUudHlwZSA9PT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgICBjb25zdCBza2lubmVkTWVzaCA9IHByaW1pdGl2ZSBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHNraW5uZWRNZXNoLnBhcmVudCEsIHNraW5uZWRNZXNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KHByaW1pdGl2ZSkpIHtcbiAgICAgICAgICBwcmltaXRpdmUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBqdXN0IGNoZWNrcyB3aGV0aGVyIHRoZSBub2RlIG9yIGl0cyBwYXJlbnQgaXMgdGhlIGZpcnN0IHBlcnNvbiBib25lIG9yIG5vdC5cbiAgICogQHBhcmFtIGJvbmUgVGhlIHRhcmdldCBib25lXG4gICAqL1xuICBwcml2YXRlIF9pc0VyYXNlVGFyZ2V0KGJvbmU6IEdMVEZOb2RlKTogYm9vbGVhbiB7XG4gICAgaWYgKGJvbmUgPT09IHRoaXMuX2ZpcnN0UGVyc29uQm9uZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQhKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgR0xURk5vZGUsIEdMVEZTY2hlbWEsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uLCBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MgfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUZpcnN0UGVyc29uXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25JbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUZpcnN0UGVyc29uXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIFtbVlJNSHVtYW5vaWRdXSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGVyc29uQm9uZUluZGV4ID0gc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lO1xuXG4gICAgbGV0IGZpcnN0UGVyc29uQm9uZTogR0xURk5vZGUgfCBudWxsO1xuICAgIGlmIChmaXJzdFBlcnNvbkJvbmVJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGZpcnN0UGVyc29uQm9uZUluZGV4ID09PSAtMSkge1xuICAgICAgZmlyc3RQZXJzb25Cb25lID0gaHVtYW5vaWQuZ2V0Qm9uZU5vZGUoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuSGVhZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0UGVyc29uQm9uZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBmaXJzdFBlcnNvbkJvbmVJbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKCFmaXJzdFBlcnNvbkJvbmUpIHtcbiAgICAgIGNvbnNvbGUud2FybignVlJNRmlyc3RQZXJzb25JbXBvcnRlcjogQ291bGQgbm90IGZpbmQgZmlyc3RQZXJzb25Cb25lIG9mIHRoZSBWUk0nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGVyc29uQm9uZU9mZnNldCA9IHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldFxuICAgICAgPyBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueCxcbiAgICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueSxcbiAgICAgICAgICAtc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnohLCAvLyBWUk0gMC4wIHVzZXMgbGVmdC1oYW5kZWQgeS11cFxuICAgICAgICApXG4gICAgICA6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wNiwgMC4wKTsgLy8gZmFsbGJhY2ssIHRha2VuIGZyb20gVW5pVlJNIGltcGxlbWVudGF0aW9uXG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG5cbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGU6IEdMVEZTY2hlbWEuTm9kZSA9IGdsdGYucGFyc2VyLmpzb24ubm9kZXNbbm9kZUluZGV4XTtcblxuICAgICAgY29uc3QgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm1lc2ggPT09IHNjaGVtYU5vZGUubWVzaClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaChuZXcgVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzKGZsYWc/LmZpcnN0UGVyc29uRmxhZywgcHJpbWl0aXZlcykpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihmaXJzdFBlcnNvbkJvbmUsIGZpcnN0UGVyc29uQm9uZU9mZnNldCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURk5vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1IdW1hbkxpbWl0IH0gZnJvbSAnLi9WUk1IdW1hbkxpbWl0JztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgYGh1bWFuQm9uZWAgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbkJvbmUge1xuICAvKipcbiAgICogQSBbW0dMVEZOb2RlXV0gKHRoYXQgYWN0dWFsbHkgaXMgYSBgVEhSRUUuT2JqZWN0M0RgKSB0aGF0IHJlcHJlc2VudHMgdGhlIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbm9kZTogR0xURk5vZGU7XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1IdW1hbkxpbWl0XV0gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBwcm9wZXJ0aWVzIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFuTGltaXQ6IFZSTUh1bWFuTGltaXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1IdW1hbkJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlIEEgW1tHTFRGTm9kZV1dIHRoYXQgcmVwcmVzZW50cyB0aGUgbmV3IGJvbmVcbiAgICogQHBhcmFtIGh1bWFuTGltaXQgQSBbW1ZSTUh1bWFuTGltaXRdXSBvYmplY3QgdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIG5ldyBib25lXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iobm9kZTogR0xURk5vZGUsIGh1bWFuTGltaXQ6IFZSTUh1bWFuTGltaXQpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMuaHVtYW5MaW1pdCA9IGh1bWFuTGltaXQ7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURk5vZGUsIFJhd1ZlY3RvcjMsIFJhd1ZlY3RvcjQsIFZSTVBvc2UsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZUFycmF5IH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVBcnJheSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB7IFZSTUh1bWFuRGVzY3JpcHRpb24gfSBmcm9tICcuL1ZSTUh1bWFuRGVzY3JpcHRpb24nO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGh1bWFub2lkIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWQge1xuICAvKipcbiAgICogQSBbW1ZSTUh1bWFuQm9uZXNdXSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaHVtYW4gYm9uZXMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gZ2V0IHRoZXNlIGJvbmVzIHVzaW5nIFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZV1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXM7XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1IdW1hbkRlc2NyaXB0aW9uXV0gdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIGh1bWFub2lkLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFuRGVzY3JpcHRpb246IFZSTUh1bWFuRGVzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1Qb3NlXV0gdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCBgc2V0UG9zZWAgYW5kIGBnZXRQb3NlYCwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgcmVzdFBvc2U6IFZSTVBvc2UgPSB7fTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFtbVlJNSHVtYW5vaWRdXS5cbiAgICogQHBhcmFtIGJvbmVBcnJheSBBIFtbVlJNSHVtYW5Cb25lQXJyYXldXSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICogQHBhcmFtIGh1bWFuRGVzY3JpcHRpb24gQSBbW1ZSTUh1bWFuRGVzY3JpcHRpb25dXSB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoYm9uZUFycmF5OiBWUk1IdW1hbkJvbmVBcnJheSwgaHVtYW5EZXNjcmlwdGlvbjogVlJNSHVtYW5EZXNjcmlwdGlvbikge1xuICAgIHRoaXMuaHVtYW5Cb25lcyA9IHRoaXMuX2NyZWF0ZUh1bWFuQm9uZXMoYm9uZUFycmF5KTtcbiAgICB0aGlzLmh1bWFuRGVzY3JpcHRpb24gPSBodW1hbkRlc2NyaXB0aW9uO1xuXG4gICAgdGhpcy5yZXN0UG9zZSA9IHRoaXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSBbW1ZSTVBvc2VdXS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlOiBWUk1Qb3NlID0ge307XG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKCh2cm1Cb25lTmFtZSkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUodnJtQm9uZU5hbWUgYXMgVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpITtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHRoZXJlIGFyZSB0d28gb3IgbW9yZSBib25lcyBpbiBhIHNhbWUgbmFtZSwgd2UgYXJlIG5vdCBnb2luZyB0byBvdmVyd3JpdGUgZXhpc3Rpbmcgb25lXG4gICAgICBpZiAocG9zZVt2cm1Cb25lTmFtZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUYWtlIGEgZGlmZiBmcm9tIHJlc3RQb3NlXG4gICAgICAvLyBub3RlIHRoYXQgcmVzdFBvc2UgYWxzbyB3aWxsIHVzZSBnZXRQb3NlIHRvIGluaXRpYWxpemUgaXRzZWxmXG4gICAgICBfdjNBLnNldCgwLCAwLCAwKTtcbiAgICAgIF9xdWF0QS5pZGVudGl0eSgpO1xuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW3ZybUJvbmVOYW1lXTtcbiAgICAgIGlmIChyZXN0U3RhdGU/LnBvc2l0aW9uKSB7XG4gICAgICAgIF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikubmVnYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdFN0YXRlPy5yb3RhdGlvbikge1xuICAgICAgICBxdWF0SW52ZXJ0Q29tcGF0KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmFkZChub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5wcmVtdWx0aXBseShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICBwb3NlW3ZybUJvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFJhd1ZlY3RvcjMsXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFJhd1ZlY3RvcjQsXG4gICAgICB9O1xuICAgIH0sIHt9IGFzIFZSTVBvc2UpO1xuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgaHVtYW5vaWQgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSBbW1ZSTVBvc2VdXSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHBvc2VPYmplY3QpLmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHBvc2VPYmplY3RbYm9uZU5hbWVdITtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lIGFzIFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgdGhhdCBpcyBkZWZpbmVkIGluIHRoZSBwb3NlIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAoIXJlc3RTdGF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5wb3NpdGlvbikge1xuICAgICAgICBub2RlLnBvc2l0aW9uLmZyb21BcnJheShzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3RTdGF0ZS5wb3NpdGlvbikge1xuICAgICAgICAgIG5vZGUucG9zaXRpb24uYWRkKF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5yb3RhdGlvbikge1xuICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHN0YXRlLnJvdGF0aW9uKTtcblxuICAgICAgICBpZiAocmVzdFN0YXRlLnJvdGF0aW9uKSB7XG4gICAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRQb3NlKHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGEgW1tWUk1IdW1hbkJvbmVdXS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZXNdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXSB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGJvbmVzIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGFuIGFycmF5IG9mIFtbVlJNSHVtYW5Cb25lXV0uXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZXMobmFtZTogVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmVbXSB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGEgVEhSRUUuT2JqZWN0M0QuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVOb2Rlc11dXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IEdMVEZOb2RlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXT8ubm9kZSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBib25lcyBib3VuZCB0byBhIHNwZWNpZmllZCBbW0h1bWFuQm9uZV1dLCBhcyBhbiBhcnJheSBvZiBUSFJFRS5PYmplY3QzRC5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZU5vZGVdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGVzKG5hbWU6IFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTogR0xURk5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXS5tYXAoKGJvbmUpID0+IGJvbmUubm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSBhIFtbVlJNSHVtYW5Cb25lc11dIGZyb20gYSBbW1ZSTUh1bWFuQm9uZUFycmF5XV0uXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVIdW1hbkJvbmVzKGJvbmVBcnJheTogVlJNSHVtYW5Cb25lQXJyYXkpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICBjb25zdCBib25lczogVlJNSHVtYW5Cb25lcyA9IE9iamVjdC52YWx1ZXMoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpLnJlZHVjZSgoYWNjdW0sIG5hbWUpID0+IHtcbiAgICAgIGFjY3VtW25hbWVdID0gW107XG4gICAgICByZXR1cm4gYWNjdW07XG4gICAgfSwge30gYXMgUGFydGlhbDxWUk1IdW1hbkJvbmVzPikgYXMgVlJNSHVtYW5Cb25lcztcblxuICAgIGJvbmVBcnJheS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBib25lc1tib25lLm5hbWVdLnB1c2goYm9uZS5ib25lKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBib25lcztcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lQXJyYXkgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUFycmF5JztcbmltcG9ydCB7IFZSTUh1bWFuRGVzY3JpcHRpb24gfSBmcm9tICcuL1ZSTUh1bWFuRGVzY3JpcHRpb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL1ZSTUh1bWFub2lkJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUh1bWFub2lkXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUh1bWFub2lkXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZDogVlJNU2NoZW1hLkh1bWFub2lkIHwgdW5kZWZpbmVkID0gdnJtRXh0Lmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFuQm9uZUFycmF5OiBWUk1IdW1hbkJvbmVBcnJheSA9IFtdO1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcy5tYXAoYXN5bmMgKGJvbmUpID0+IHtcbiAgICAgICAgICBpZiAoIWJvbmUuYm9uZSB8fCBib25lLm5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgYm9uZS5ub2RlKTtcbiAgICAgICAgICBodW1hbkJvbmVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGJvbmUuYm9uZSxcbiAgICAgICAgICAgIGJvbmU6IG5ldyBWUk1IdW1hbkJvbmUobm9kZSwge1xuICAgICAgICAgICAgICBheGlzTGVuZ3RoOiBib25lLmF4aXNMZW5ndGgsXG4gICAgICAgICAgICAgIGNlbnRlcjogYm9uZS5jZW50ZXIgJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5jZW50ZXIueCwgYm9uZS5jZW50ZXIueSwgYm9uZS5jZW50ZXIueiksXG4gICAgICAgICAgICAgIG1heDogYm9uZS5tYXggJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5tYXgueCwgYm9uZS5tYXgueSwgYm9uZS5tYXgueiksXG4gICAgICAgICAgICAgIG1pbjogYm9uZS5taW4gJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5taW4ueCwgYm9uZS5taW4ueSwgYm9uZS5taW4ueiksXG4gICAgICAgICAgICAgIHVzZURlZmF1bHRWYWx1ZXM6IGJvbmUudXNlRGVmYXVsdFZhbHVlcyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5EZXNjcmlwdGlvbjogVlJNSHVtYW5EZXNjcmlwdGlvbiA9IHtcbiAgICAgIGFybVN0cmV0Y2g6IHNjaGVtYUh1bWFub2lkLmFybVN0cmV0Y2gsXG4gICAgICBsZWdTdHJldGNoOiBzY2hlbWFIdW1hbm9pZC5sZWdTdHJldGNoLFxuICAgICAgdXBwZXJBcm1Ud2lzdDogc2NoZW1hSHVtYW5vaWQudXBwZXJBcm1Ud2lzdCxcbiAgICAgIGxvd2VyQXJtVHdpc3Q6IHNjaGVtYUh1bWFub2lkLmxvd2VyQXJtVHdpc3QsXG4gICAgICB1cHBlckxlZ1R3aXN0OiBzY2hlbWFIdW1hbm9pZC51cHBlckxlZ1R3aXN0LFxuICAgICAgbG93ZXJMZWdUd2lzdDogc2NoZW1hSHVtYW5vaWQubG93ZXJMZWdUd2lzdCxcbiAgICAgIGZlZXRTcGFjaW5nOiBzY2hlbWFIdW1hbm9pZC5mZWV0U3BhY2luZyxcbiAgICAgIGhhc1RyYW5zbGF0aW9uRG9GOiBzY2hlbWFIdW1hbm9pZC5oYXNUcmFuc2xhdGlvbkRvRixcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBWUk1IdW1hbm9pZChodW1hbkJvbmVBcnJheSwgaHVtYW5EZXNjcmlwdGlvbik7XG4gIH1cbn1cbiIsIi8qKlxuICogRXZhbHVhdGUgYSBoZXJtaXRlIHNwbGluZS5cbiAqXG4gKiBAcGFyYW0geTAgeSBvbiBzdGFydFxuICogQHBhcmFtIHkxIHkgb24gZW5kXG4gKiBAcGFyYW0gdDAgZGVsdGEgeSBvbiBzdGFydFxuICogQHBhcmFtIHQxIGRlbHRhIHkgb24gZW5kXG4gKiBAcGFyYW0geCBpbnB1dCB2YWx1ZVxuICovXG5jb25zdCBoZXJtaXRlU3BsaW5lID0gKHkwOiBudW1iZXIsIHkxOiBudW1iZXIsIHQwOiBudW1iZXIsIHQxOiBudW1iZXIsIHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGNvbnN0IHhjID0geCAqIHggKiB4O1xuICBjb25zdCB4cyA9IHggKiB4O1xuICBjb25zdCBkeSA9IHkxIC0geTA7XG4gIGNvbnN0IGgwMSA9IC0yLjAgKiB4YyArIDMuMCAqIHhzO1xuICBjb25zdCBoMTAgPSB4YyAtIDIuMCAqIHhzICsgeDtcbiAgY29uc3QgaDExID0geGMgLSB4cztcbiAgcmV0dXJuIHkwICsgZHkgKiBoMDEgKyB0MCAqIGgxMCArIHQxICogaDExO1xufTtcblxuLyoqXG4gKiBFdmFsdWF0ZSBhbiBBbmltYXRpb25DdXJ2ZSBhcnJheS4gU2VlIEFuaW1hdGlvbkN1cnZlIGNsYXNzIG9mIFVuaXR5IGZvciBpdHMgZGV0YWlscy5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9qYS9jdXJyZW50L1NjcmlwdFJlZmVyZW5jZS9BbmltYXRpb25DdXJ2ZS5odG1sXG4gKlxuICogQHBhcmFtIGFyciBBbiBhcnJheSByZXByZXNlbnRzIGEgY3VydmVcbiAqIEBwYXJhbSB4IEFuIGlucHV0IHZhbHVlXG4gKi9cbmNvbnN0IGV2YWx1YXRlQ3VydmUgPSAoYXJyOiBudW1iZXJbXSwgeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgLy8gLS0gc2FuaXR5IGNoZWNrIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChhcnIubGVuZ3RoIDwgOCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXZhbHVhdGVDdXJ2ZTogSW52YWxpZCBjdXJ2ZSBkZXRlY3RlZCEgKEFycmF5IGxlbmd0aCBtdXN0IGJlIDggYXQgbGVhc3QpJyk7XG4gIH1cbiAgaWYgKGFyci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdldmFsdWF0ZUN1cnZlOiBJbnZhbGlkIGN1cnZlIGRldGVjdGVkISAoQXJyYXkgbGVuZ3RoIG11c3QgYmUgbXVsdGlwbGVzIG9mIDQnKTtcbiAgfVxuXG4gIC8vIC0tIGNoZWNrIHJhbmdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBsZXQgb3V0Tm9kZTtcbiAgZm9yIChvdXROb2RlID0gMDsgOyBvdXROb2RlKyspIHtcbiAgICBpZiAoYXJyLmxlbmd0aCA8PSA0ICogb3V0Tm9kZSkge1xuICAgICAgcmV0dXJuIGFycls0ICogb3V0Tm9kZSAtIDNdOyAvLyB0b28gZnVydGhlciEhIGFzc3VtZSBhcyBcIkNsYW1wXCJcbiAgICB9IGVsc2UgaWYgKHggPD0gYXJyWzQgKiBvdXROb2RlXSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW5Ob2RlID0gb3V0Tm9kZSAtIDE7XG4gIGlmIChpbk5vZGUgPCAwKSB7XG4gICAgcmV0dXJuIGFycls0ICogaW5Ob2RlICsgNV07IC8vIHRvbyBiZWhpbmQhISBhc3N1bWUgYXMgXCJDbGFtcFwiXG4gIH1cblxuICAvLyAtLSBjYWxjdWxhdGUgbG9jYWwgeCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgeDAgPSBhcnJbNCAqIGluTm9kZV07XG4gIGNvbnN0IHgxID0gYXJyWzQgKiBvdXROb2RlXTtcbiAgY29uc3QgeEhlcm1pdGUgPSAoeCAtIHgwKSAvICh4MSAtIHgwKTtcblxuICAvLyAtLSBmaW5hbGx5IGRvIHRoZSBoZXJtaXRlIHNwbGluZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgeTAgPSBhcnJbNCAqIGluTm9kZSArIDFdO1xuICBjb25zdCB5MSA9IGFycls0ICogb3V0Tm9kZSArIDFdO1xuICBjb25zdCB0MCA9IGFycls0ICogaW5Ob2RlICsgM107XG4gIGNvbnN0IHQxID0gYXJyWzQgKiBvdXROb2RlICsgMl07XG4gIHJldHVybiBoZXJtaXRlU3BsaW5lKHkwLCB5MSwgdDAsIHQxLCB4SGVybWl0ZSk7XG59O1xuXG4vKipcbiAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBDdXJ2ZU1hcHBlciBjbGFzcyBkZWZpbmVkIGluIFVuaVZSTS5cbiAqIFdpbGwgYmUgdXNlZCBmb3IgW1tWUk1Mb29rQXRBcHBseWVyXV1zLCB0byBkZWZpbmUgYmVoYXZpb3Igb2YgTG9va0F0LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iL21hc3Rlci9Bc3NldHMvVlJNL1VuaVZSTS9TY3JpcHRzL0xvb2tBdC9DdXJ2ZU1hcHBlci5jc1xuICovXG5leHBvcnQgY2xhc3MgVlJNQ3VydmVNYXBwZXIge1xuICAvKipcbiAgICogQW4gYXJyYXkgcmVwcmVzZW50cyB0aGUgY3VydmUuIFNlZSBBbmltYXRpb25DdXJ2ZSBjbGFzcyBvZiBVbml0eSBmb3IgaXRzIGRldGFpbHMuXG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly9kb2NzLnVuaXR5M2QuY29tL2phL2N1cnJlbnQvU2NyaXB0UmVmZXJlbmNlL0FuaW1hdGlvbkN1cnZlLmh0bWxcbiAgICovXG4gIHB1YmxpYyBjdXJ2ZTogbnVtYmVyW10gPSBbMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjBdO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBpbnB1dCByYW5nZSBvZiB0aGUgW1tWUk1DdXJ2ZU1hcHBlcl1dLlxuICAgKi9cbiAgcHVibGljIGN1cnZlWFJhbmdlRGVncmVlID0gOTAuMDtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gb3V0cHV0IHZhbHVlIG9mIHRoZSBbW1ZSTUN1cnZlTWFwcGVyXV0uXG4gICAqL1xuICBwdWJsaWMgY3VydmVZUmFuZ2VEZWdyZWUgPSAxMC4wO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgW1tWUk1DdXJ2ZU1hcHBlcl1dLlxuICAgKlxuICAgKiBAcGFyYW0geFJhbmdlIFRoZSBtYXhpbXVtIGlucHV0IHJhbmdlXG4gICAqIEBwYXJhbSB5UmFuZ2UgVGhlIG1heGltdW0gb3V0cHV0IHZhbHVlXG4gICAqIEBwYXJhbSBjdXJ2ZSBBbiBhcnJheSByZXByZXNlbnRzIHRoZSBjdXJ2ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoeFJhbmdlPzogbnVtYmVyLCB5UmFuZ2U/OiBudW1iZXIsIGN1cnZlPzogbnVtYmVyW10pIHtcbiAgICBpZiAoeFJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3VydmVYUmFuZ2VEZWdyZWUgPSB4UmFuZ2U7XG4gICAgfVxuXG4gICAgaWYgKHlSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmN1cnZlWVJhbmdlRGVncmVlID0geVJhbmdlO1xuICAgIH1cblxuICAgIGlmIChjdXJ2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmN1cnZlID0gY3VydmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2YWx1YXRlIGFuIGlucHV0IHZhbHVlIGFuZCBvdXRwdXQgYSBtYXBwZWQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSBzcmMgVGhlIGlucHV0IHZhbHVlXG4gICAqL1xuICBwdWJsaWMgbWFwKHNyYzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBjbGFtcGVkU3JjID0gTWF0aC5taW4oTWF0aC5tYXgoc3JjLCAwLjApLCB0aGlzLmN1cnZlWFJhbmdlRGVncmVlKTtcbiAgICBjb25zdCB4ID0gY2xhbXBlZFNyYyAvIHRoaXMuY3VydmVYUmFuZ2VEZWdyZWU7XG4gICAgcmV0dXJuIHRoaXMuY3VydmVZUmFuZ2VEZWdyZWUgKiBldmFsdWF0ZUN1cnZlKHRoaXMuY3VydmUsIHgpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGJ5IFtbVlJNTG9va0F0SGVhZF1dLCBhcHBsaWVzIGxvb2sgYXQgZGlyZWN0aW9uLlxuICogVGhlcmUgYXJlIGN1cnJlbnRseSB0d28gdmFyaWFudCBvZiBhcHBsaWVyOiBbW1ZSTUxvb2tBdEJvbmVBcHBseWVyXV0gYW5kIFtbVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXJdXS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZSTUxvb2tBdEFwcGx5ZXIge1xuICAvKipcbiAgICogSXQgcmVwcmVzZW50cyBpdHMgdHlwZSBvZiBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHJlYWRvbmx5IHR5cGU6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lO1xuXG4gIC8qKlxuICAgKiBBcHBseSBsb29rIGF0IGRpcmVjdGlvbiB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBldWxlciBgVEhSRUUuRXVsZXJgIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIGxvb2sgYXQgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlUHJveHkgfSBmcm9tICcuLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUN1cnZlTWFwcGVyIH0gZnJvbSAnLi9WUk1DdXJ2ZU1hcHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgYnkgW1tWUk1Mb29rQXRIZWFkXV0sIGFwcGxpZXMgbG9vayBhdCBkaXJlY3Rpb24gdG8gZXllIGJsZW5kIHNoYXBlcyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyIGV4dGVuZHMgVlJNTG9va0F0QXBwbHllciB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZUhvcml6b250YWw6IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZVZlcnRpY2FsRG93bjogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlVmVydGljYWxVcDogVlJNQ3VydmVNYXBwZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllci5cbiAgICpcbiAgICogQHBhcmFtIGJsZW5kU2hhcGVQcm94eSBBIFtbVlJNQmxlbmRTaGFwZVByb3h5XV0gdXNlZCBieSB0aGlzIGFwcGxpZXJcbiAgICogQHBhcmFtIGN1cnZlSG9yaXpvbnRhbCBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVWZXJ0aWNhbERvd24gQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxVcCBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGN1cnZlSG9yaXpvbnRhbDogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVWZXJ0aWNhbERvd246IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlVmVydGljYWxVcDogVlJNQ3VydmVNYXBwZXIsXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9jdXJ2ZUhvcml6b250YWwgPSBjdXJ2ZUhvcml6b250YWw7XG4gICAgdGhpcy5fY3VydmVWZXJ0aWNhbERvd24gPSBjdXJ2ZVZlcnRpY2FsRG93bjtcbiAgICB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAgPSBjdXJ2ZVZlcnRpY2FsVXA7XG5cbiAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkgPSBibGVuZFNoYXBlUHJveHk7XG4gIH1cblxuICBwdWJsaWMgbmFtZSgpOiBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZSB7XG4gICAgcmV0dXJuIFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJsZW5kU2hhcGU7XG4gIH1cblxuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcik6IHZvaWQge1xuICAgIGNvbnN0IHNyY1ggPSBldWxlci54O1xuICAgIGNvbnN0IHNyY1kgPSBldWxlci55O1xuXG4gICAgaWYgKHNyY1ggPCAwLjApIHtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3VwLCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rZG93biwgdGhpcy5fY3VydmVWZXJ0aWNhbERvd24ubWFwKC1zcmNYKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2Rvd24sIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2t1cCwgdGhpcy5fY3VydmVWZXJ0aWNhbFVwLm1hcChzcmNYKSk7XG4gICAgfVxuXG4gICAgaWYgKHNyY1kgPCAwLjApIHtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2xlZnQsIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tyaWdodCwgdGhpcy5fY3VydmVIb3Jpem9udGFsLm1hcCgtc3JjWSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tyaWdodCwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2xlZnQsIHRoaXMuX2N1cnZlSG9yaXpvbnRhbC5tYXAoc3JjWSkpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuLi9maXJzdHBlcnNvbi9WUk1GaXJzdFBlcnNvbic7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcblxuY29uc3QgVkVDVE9SM19GUk9OVCA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIC0xLjApKTtcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBsb29rIGF0IG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0SGVhZCB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVVMRVJfT1JERVIgPSAnWVhaJzsgLy8geWF3LXBpdGNoLXJvbGxcblxuICAvKipcbiAgICogQXNzb2NpYXRlZCBbW1ZSTUZpcnN0UGVyc29uXV0sIHdpbGwgYmUgdXNlZCBmb3IgZGlyZWN0aW9uIGNhbGN1bGF0aW9uLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uOiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQXNzb2NpYXRlZCBbW1ZSTUxvb2tBdEFwcGx5ZXJdXSwgaXRzIGxvb2sgYXQgZGlyZWN0aW9uIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgbW9kZWwgdXNpbmcgdGhpcyBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGFwcGx5ZXI/OiBWUk1Mb29rQXRBcHBseWVyO1xuXG4gIC8qKlxuICAgKiBJZiB0aGlzIGlzIHRydWUsIGl0cyBsb29rIGF0IGRpcmVjdGlvbiB3aWxsIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseSBieSBjYWxsaW5nIFtbVlJNTG9va0F0SGVhZC51cGRhdGVdXSAod2hpY2ggaXMgY2FsbGVkIGZyb20gW1tWUk0udXBkYXRlXV0pLlxuICAgKlxuICAgKiBTZWUgYWxzbzogW1tWUk1Mb29rQXRIZWFkLnRhcmdldF1dXG4gICAqL1xuICBwdWJsaWMgYXV0b1VwZGF0ZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgb2JqZWN0IG9mIHRoZSBsb29rIGF0LlxuICAgKiBOb3RlIHRoYXQgaXQgZG9lcyBub3QgbWFrZSBhbnkgc2Vuc2UgaWYgW1tWUk1Mb29rQXRIZWFkLmF1dG9VcGRhdGVdXSBpcyBkaXNhYmxlZC5cbiAgICovXG4gIHB1YmxpYyB0YXJnZXQ/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwcm90ZWN0ZWQgX2V1bGVyOiBUSFJFRS5FdWxlciA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCBWUk1Mb29rQXRIZWFkLkVVTEVSX09SREVSKTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUxvb2tBdEhlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvbiBBIFtbVlJNRmlyc3RQZXJzb25dXSB0aGF0IHdpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbmV3IFZSTUxvb2tBdEhlYWRcbiAgICogQHBhcmFtIGFwcGx5ZXIgQSBbW1ZSTUxvb2tBdEFwcGx5ZXJdXSB0aGF0IHdpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbmV3IFZSTUxvb2tBdEhlYWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZpcnN0UGVyc29uOiBWUk1GaXJzdFBlcnNvbiwgYXBwbHllcj86IFZSTUxvb2tBdEFwcGx5ZXIpIHtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gZmlyc3RQZXJzb247XG4gICAgdGhpcy5hcHBseWVyID0gYXBwbHllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGxvb2sgYXQgZGlyZWN0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGREaXJlY3Rpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc3Qgcm90ID0gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSwgX3F1YXQpO1xuICAgIHJldHVybiB0YXJnZXQuY29weShWRUNUT1IzX0ZST05UKS5hcHBseUV1bGVyKHRoaXMuX2V1bGVyKS5hcHBseVF1YXRlcm5pb24ocm90KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaXRzIGxvb2sgYXQgcG9zaXRpb24uXG4gICAqIE5vdGUgdGhhdCBpdHMgcmVzdWx0IHdpbGwgYmUgaW5zdGFudGx5IG92ZXJ3cml0dGVuIGlmIFtbVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlXV0gaXMgZW5hYmxlZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIEEgdGFyZ2V0IHBvc2l0aW9uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgdGhpcy5fY2FsY0V1bGVyKHRoaXMuX2V1bGVyLCBwb3NpdGlvbik7XG5cbiAgICBpZiAodGhpcy5hcHBseWVyKSB7XG4gICAgICB0aGlzLmFwcGx5ZXIubG9va0F0KHRoaXMuX2V1bGVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBWUk1Mb29rQXRIZWFkLlxuICAgKiBJZiBbW1ZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZV1dIGlzIGRpc2FibGVkLCBpdCB3aWxsIGRvIG5vdGhpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCAmJiB0aGlzLmF1dG9VcGRhdGUpIHtcbiAgICAgIHRoaXMubG9va0F0KHRoaXMudGFyZ2V0LmdldFdvcmxkUG9zaXRpb24oX3YzQSkpO1xuXG4gICAgICBpZiAodGhpcy5hcHBseWVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHllci5sb29rQXQodGhpcy5fZXVsZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY2FsY0V1bGVyKHRhcmdldDogVEhSRUUuRXVsZXIsIHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuRXVsZXIge1xuICAgIGNvbnN0IGhlYWRQb3NpdGlvbiA9IHRoaXMuZmlyc3RQZXJzb24uZ2V0Rmlyc3RQZXJzb25Xb3JsZFBvc2l0aW9uKF92M0IpO1xuXG4gICAgLy8gTG9vayBhdCBkaXJlY3Rpb24gaW4gd29ybGQgY29vcmRpbmF0ZVxuICAgIGNvbnN0IGxvb2tBdERpciA9IF92M0MuY29weShwb3NpdGlvbikuc3ViKGhlYWRQb3NpdGlvbikubm9ybWFsaXplKCk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gdGhlIGRpcmVjdGlvbiBpbnRvIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgZmlyc3QgcGVyc29uIGJvbmVcbiAgICBsb29rQXREaXIuYXBwbHlRdWF0ZXJuaW9uKHF1YXRJbnZlcnRDb21wYXQoZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSwgX3F1YXQpKSk7XG5cbiAgICAvLyBjb252ZXJ0IHRoZSBkaXJlY3Rpb24gaW50byBldWxlclxuICAgIHRhcmdldC54ID0gTWF0aC5hdGFuMihsb29rQXREaXIueSwgTWF0aC5zcXJ0KGxvb2tBdERpci54ICogbG9va0F0RGlyLnggKyBsb29rQXREaXIueiAqIGxvb2tBdERpci56KSk7XG4gICAgdGFyZ2V0LnkgPSBNYXRoLmF0YW4yKC1sb29rQXREaXIueCwgLWxvb2tBdERpci56KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgR0xURk5vZGUsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUN1cnZlTWFwcGVyIH0gZnJvbSAnLi9WUk1DdXJ2ZU1hcHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWQnO1xuXG5jb25zdCBfZXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoMC4wLCAwLjAsIDAuMCwgVlJNTG9va0F0SGVhZC5FVUxFUl9PUkRFUik7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGJ5IFtbVlJNTG9va0F0SGVhZF1dLCBhcHBsaWVzIGxvb2sgYXQgZGlyZWN0aW9uIHRvIGV5ZSBib25lcyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBseWVyIGV4dGVuZHMgVlJNTG9va0F0QXBwbHllciB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQm9uZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZUhvcml6b250YWxJbm5lcjogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlSG9yaXpvbnRhbE91dGVyOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbERvd246IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRFeWU6IEdMVEZOb2RlIHwgbnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcmlnaHRFeWU6IEdMVEZOb2RlIHwgbnVsbDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUxvb2tBdEJvbmVBcHBseWVyLlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSBbW1ZSTUh1bWFub2lkXV0gdXNlZCBieSB0aGlzIGFwcGxpZXJcbiAgICogQHBhcmFtIGN1cnZlSG9yaXpvbnRhbElubmVyIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZUhvcml6b250YWxPdXRlciBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBvdXRlciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVWZXJ0aWNhbERvd24gQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxVcCBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBjdXJ2ZUhvcml6b250YWxJbm5lcjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVIb3Jpem9udGFsT3V0ZXI6IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyLFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY3VydmVIb3Jpem9udGFsSW5uZXIgPSBjdXJ2ZUhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLl9jdXJ2ZUhvcml6b250YWxPdXRlciA9IGN1cnZlSG9yaXpvbnRhbE91dGVyO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxEb3duID0gY3VydmVWZXJ0aWNhbERvd247XG4gICAgdGhpcy5fY3VydmVWZXJ0aWNhbFVwID0gY3VydmVWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5fbGVmdEV5ZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lLkxlZnRFeWUpO1xuICAgIHRoaXMuX3JpZ2h0RXllID0gaHVtYW5vaWQuZ2V0Qm9uZU5vZGUoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuUmlnaHRFeWUpO1xuICB9XG5cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzcmNYID0gZXVsZXIueDtcbiAgICBjb25zdCBzcmNZID0gZXVsZXIueTtcblxuICAgIC8vIGxlZnRcbiAgICBpZiAodGhpcy5fbGVmdEV5ZSkge1xuICAgICAgaWYgKHNyY1ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyLnggPSAtdGhpcy5fY3VydmVWZXJ0aWNhbERvd24ubWFwKC1zcmNYKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlci54ID0gdGhpcy5fY3VydmVWZXJ0aWNhbFVwLm1hcChzcmNYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyY1kgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyLnkgPSAtdGhpcy5fY3VydmVIb3Jpem9udGFsSW5uZXIubWFwKC1zcmNZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlci55ID0gdGhpcy5fY3VydmVIb3Jpem9udGFsT3V0ZXIubWFwKHNyY1kpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9sZWZ0RXllLnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKF9ldWxlcik7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAodGhpcy5fcmlnaHRFeWUpIHtcbiAgICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci54ID0gLXRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueCA9IHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci55ID0gLXRoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyLm1hcCgtc3JjWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueSA9IHRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyLm1hcChzcmNZKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmlnaHRFeWUucXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoX2V1bGVyKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUN1cnZlTWFwcGVyIH0gZnJvbSAnLi9WUk1DdXJ2ZU1hcHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRCb25lQXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0Qm9uZUFwcGx5ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4vVlJNTG9va0F0SGVhZCc7XG5cbi8vIFRIUkVFLk1hdGggaGFzIGJlZW4gcmVuYW1lZCB0byBUSFJFRS5NYXRoVXRpbHMgc2luY2UgcjExMy5cbi8vIFdlIGFyZSBnb2luZyB0byBkZWZpbmUgdGhlIERFRzJSQUQgYnkgb3Vyc2VsdmVzIGZvciBhIHdoaWxlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTgyNzBcbmNvbnN0IERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwOyAvLyBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRDtcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUxvb2tBdEhlYWRdXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUxvb2tBdEhlYWRdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGJsZW5kU2hhcGVQcm94eSBBIFtbVlJNQmxlbmRTaGFwZVByb3h5XV0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGh1bWFub2lkIEEgW1tWUk1IdW1hbm9pZF1dIGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0SGVhZCB8IG51bGwge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5ZXIgPSB0aGlzLl9pbXBvcnRBcHBseWVyKHNjaGVtYUZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKTtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWQoZmlyc3RQZXJzb24sIGFwcGx5ZXIgfHwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0QXBwbHllcihcbiAgICBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0QXBwbHllciB8IG51bGwge1xuICAgIGNvbnN0IGxvb2tBdEhvcml6b250YWxJbm5lciA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxJbm5lcjtcbiAgICBjb25zdCBsb29rQXRIb3Jpem9udGFsT3V0ZXIgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXI7XG4gICAgY29uc3QgbG9va0F0VmVydGljYWxEb3duID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxEb3duO1xuICAgIGNvbnN0IGxvb2tBdFZlcnRpY2FsVXAgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbFVwO1xuXG4gICAgc3dpdGNoIChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSkge1xuICAgICAgY2FzZSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5Cb25lOiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsb29rQXRIb3Jpem9udGFsSW5uZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGxvb2tBdEhvcml6b250YWxPdXRlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbG9va0F0VmVydGljYWxEb3duID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBsb29rQXRWZXJ0aWNhbFVwID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRCb25lQXBwbHllcihcbiAgICAgICAgICAgIGh1bWFub2lkLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdEhvcml6b250YWxJbm5lciksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0SG9yaXpvbnRhbE91dGVyKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRWZXJ0aWNhbERvd24pLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdFZlcnRpY2FsVXApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhc2UgVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZToge1xuICAgICAgICBpZiAobG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxEb3duID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxVcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcihcbiAgICAgICAgICAgIGJsZW5kU2hhcGVQcm94eSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShsb29rQXRIb3Jpem9udGFsT3V0ZXIpLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKGxvb2tBdFZlcnRpY2FsRG93biksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobG9va0F0VmVydGljYWxVcCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobWFwOiBWUk1TY2hlbWEuRmlyc3RQZXJzb25EZWdyZWVNYXApOiBWUk1DdXJ2ZU1hcHBlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1DdXJ2ZU1hcHBlcihcbiAgICAgIHR5cGVvZiBtYXAueFJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueFJhbmdlIDogdW5kZWZpbmVkLFxuICAgICAgdHlwZW9mIG1hcC55UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC55UmFuZ2UgOiB1bmRlZmluZWQsXG4gICAgICBtYXAuY3VydmUsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShtYXA6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCk6IFZSTUN1cnZlTWFwcGVyIHtcbiAgICByZXR1cm4gbmV3IFZSTUN1cnZlTWFwcGVyKHR5cGVvZiBtYXAueFJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueFJhbmdlIDogdW5kZWZpbmVkLCBtYXAueVJhbmdlLCBtYXAuY3VydmUpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjb25zdCBnZXRFbmNvZGluZ0NvbXBvbmVudHMgPSAoZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZyk6IFtzdHJpbmcsIHN0cmluZ10gPT4ge1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSBUSFJFRS5MaW5lYXJFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ0xpbmVhcicsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLnNSR0JFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ3NSR0InLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JFRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JFJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCTTdFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgNy4wICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQk0xNkVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCAxNi4wICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQkRFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQkQnLCAnKCB2YWx1ZSwgMjU2LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuR2FtbWFFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ0dhbW1hJywgJyggdmFsdWUsIGZsb2F0KCBHQU1NQV9GQUNUT1IgKSApJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gPSAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjb21wb25lbnRzID0gZ2V0RW5jb2RpbmdDb21wb25lbnRzKGVuY29kaW5nKTtcbiAgcmV0dXJuICd2ZWM0ICcgKyBmdW5jdGlvbk5hbWUgKyAnKCB2ZWM0IHZhbHVlICkgeyByZXR1cm4gJyArIGNvbXBvbmVudHNbMF0gKyAnVG9MaW5lYXInICsgY29tcG9uZW50c1sxXSArICc7IH0nO1xufTtcbiIsIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gfSBmcm9tICcuL2dldFRleGVsRGVjb2RpbmdGdW5jdGlvbic7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi52ZXJ0JztcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24uZnJhZyc7XG5cbmNvbnN0IFRBVSA9IDIuMCAqIE1hdGguUEk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTVRvb25QYXJhbWV0ZXJzIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzIHtcbiAgbVRvb25WZXJzaW9uPzogbnVtYmVyOyAvLyBfTVRvb25WZXJzaW9uXG5cbiAgY3V0b2ZmPzogbnVtYmVyOyAvLyBfQ3V0b2ZmXG4gIGNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gcmdiIG9mIF9Db2xvclxuICBzaGFkZUNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX1NoYWRlQ29sb3JcbiAgbWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX01haW5UZXhcbiAgbWFpblRleD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4ICh3aWxsIGJlIHJlbmFtZWQgdG8gbWFwKVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIG1haW5UZXhfU1Q/OiBUSFJFRS5WZWN0b3I0OyAvLyBfTWFpblRleF9TVFxuICBzaGFkZVRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfU2hhZGVUZXh0dXJlXG4gIGJ1bXBTY2FsZT86IG51bWJlcjsgLy8gX0J1bXBTY2FsZSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gbm9ybWFsU2NhbGUpXG4gIG5vcm1hbE1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9CdW1wTWFwXG4gIG5vcm1hbE1hcFR5cGU/OiBUSFJFRS5Ob3JtYWxNYXBUeXBlczsgLy8gVGhyZWUuanMgc3BlY2lmaWMgdmFsdWVcbiAgbm9ybWFsU2NhbGU/OiBUSFJFRS5WZWN0b3IyOyAvLyBfQnVtcFNjYWxlIGluIFRocmVlLmpzIGZhc2hpb25cbiAgYnVtcE1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9CdW1wTWFwICh3aWxsIGJlIHJlbmFtZWQgdG8gbm9ybWFsTWFwKVxuICByZWNlaXZlU2hhZG93UmF0ZT86IG51bWJlcjsgLy8gX1JlY2VpdmVTaGFkb3dSYXRlXG4gIHJlY2VpdmVTaGFkb3dUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1JlY2VpdmVTaGFkb3dUZXh0dXJlXG4gIHNoYWRpbmdHcmFkZVJhdGU/OiBudW1iZXI7IC8vIF9TaGFkaW5nR3JhZGVSYXRlXG4gIHNoYWRpbmdHcmFkZVRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfU2hhZGluZ0dyYWRlVGV4dHVyZVxuICBzaGFkZVNoaWZ0PzogbnVtYmVyOyAvLyBfU2hhZGVTaGlmdFxuICBzaGFkZVRvb255PzogbnVtYmVyOyAvLyBfU2hhZGVUb29ueVxuICBsaWdodENvbG9yQXR0ZW51YXRpb24/OiBudW1iZXI7IC8vIF9MaWdodENvbG9yQXR0ZW51YXRpb25cbiAgaW5kaXJlY3RMaWdodEludGVuc2l0eT86IG51bWJlcjsgLy8gX0luZGlyZWN0TGlnaHRJbnRlbnNpdHlcbiAgcmltVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9SaW1UZXh0dXJlXG4gIHJpbUNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX1JpbUNvbG9yXG4gIHJpbUxpZ2h0aW5nTWl4PzogbnVtYmVyOyAvLyBfUmltTGlnaHRpbmdNaXhcbiAgcmltRnJlc25lbFBvd2VyPzogbnVtYmVyOyAvLyBfUmltRnJlc25lbFBvd2VyXG4gIHJpbUxpZnQ/OiBudW1iZXI7IC8vIF9SaW1MaWZ0XG4gIHNwaGVyZUFkZD86IFRIUkVFLlRleHR1cmU7IC8vIF9TcGhlcmVBZGRcbiAgZW1pc3Npb25Db2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9FbWlzc2lvbkNvbG9yXG4gIGVtaXNzaXZlTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0VtaXNzaW9uTWFwXG4gIGVtaXNzaW9uTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0VtaXNzaW9uTWFwICh3aWxsIGJlIHJlbmFtZWQgdG8gZW1pc3NpdmVNYXApXG4gIG91dGxpbmVXaWR0aFRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfT3V0bGluZVdpZHRoVGV4dHVyZVxuICBvdXRsaW5lV2lkdGg/OiBudW1iZXI7IC8vIF9PdXRsaW5lV2lkdGhcbiAgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlPzogbnVtYmVyOyAvLyBfT3V0bGluZVNjYWxlZE1heERpc3RhbmNlXG4gIG91dGxpbmVDb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9PdXRsaW5lQ29sb3JcbiAgb3V0bGluZUxpZ2h0aW5nTWl4PzogbnVtYmVyOyAvLyBfT3V0bGluZUxpZ2h0aW5nTWl4XG4gIHV2QW5pbU1hc2tUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1V2QW5pbU1hc2tUZXh0dXJlXG4gIHV2QW5pbVNjcm9sbFg/OiBudW1iZXI7IC8vIF9VdkFuaW1TY3JvbGxYXG4gIHV2QW5pbVNjcm9sbFk/OiBudW1iZXI7IC8vIF9VdkFuaW1TY3JvbGxZXG4gIHV2QW5pbVJvdGF0aW9uPzogbnVtYmVyOyAvLyBfdXZBbmltUm90YXRpb25cblxuICBkZWJ1Z01vZGU/OiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIHwgbnVtYmVyOyAvLyBfRGVidWdNb2RlXG4gIGJsZW5kTW9kZT86IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlIHwgbnVtYmVyOyAvLyBfQmxlbmRNb2RlXG4gIG91dGxpbmVXaWR0aE1vZGU/OiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB8IG51bWJlcjsgLy8gT3V0bGluZVdpZHRoTW9kZVxuICBvdXRsaW5lQ29sb3JNb2RlPzogTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUgfCBudW1iZXI7IC8vIE91dGxpbmVDb2xvck1vZGVcbiAgY3VsbE1vZGU/OiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUgfCBudW1iZXI7IC8vIF9DdWxsTW9kZVxuICBvdXRsaW5lQ3VsbE1vZGU/OiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUgfCBudW1iZXI7IC8vIF9PdXRsaW5lQ3VsbE1vZGVcbiAgc3JjQmxlbmQ/OiBudW1iZXI7IC8vIF9TcmNCbGVuZFxuICBkc3RCbGVuZD86IG51bWJlcjsgLy8gX0RzdEJsZW5kXG4gIHpXcml0ZT86IG51bWJlcjsgLy8gX1pXcml0ZSAod2lsbCBiZSByZW5hbWVkIHRvIGRlcHRoV3JpdGUpXG5cbiAgaXNPdXRsaW5lPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZW5jb2Rpbmcgb2YgaW5wdXQgdW5pZm9ybSBjb2xvcnMuXG4gICAqXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuc1JHQkVuY29kaW5nYCwgdXNlIGBUSFJFRS5zUkdCRW5jb2RpbmdgLlxuICAgKlxuICAgKiBFbmNvZGluZ3Mgb2YgdGV4dHVyZXMgc2hvdWxkIGJlIHNldCBpbmRlcGVuZGVudGx5IG9uIHRleHR1cmVzLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AgaWYgdGhpcyBvcHRpb24gaXNuJ3Qgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vcmVuZGVyZXJzL1dlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmdcbiAgICovXG4gIGVuY29kaW5nPzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUge1xuICBPZmYsXG4gIEZyb250LFxuICBCYWNrLFxufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIHtcbiAgTm9uZSxcbiAgTm9ybWFsLFxuICBMaXRTaGFkZVJhdGUsXG4gIFVWLFxufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSB7XG4gIEZpeGVkQ29sb3IsXG4gIE1peGVkTGlnaHRpbmcsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHtcbiAgTm9uZSxcbiAgV29ybGRDb29yZGluYXRlcyxcbiAgU2NyZWVuQ29vcmRpbmF0ZXMsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlIHtcbiAgT3BhcXVlLFxuICBDdXRvdXQsXG4gIFRyYW5zcGFyZW50LFxuICBUcmFuc3BhcmVudFdpdGhaV3JpdGUsXG59XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIFtbTVRvb25NYXRlcmlhbF1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlzTVRvb25NYXRlcmlhbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIGN1dG9mZiA9IDAuNTsgLy8gX0N1dG9mZlxuICBwdWJsaWMgY29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgxLjAsIDEuMCwgMS4wLCAxLjApOyAvLyBfQ29sb3JcbiAgcHVibGljIHNoYWRlQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjk3LCAwLjgxLCAwLjg2LCAxLjApOyAvLyBfU2hhZGVDb2xvclxuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9NYWluVGV4XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgcHVibGljIG1haW5UZXhfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfTWFpblRleF9TVFxuICBwdWJsaWMgc2hhZGVUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9TaGFkZVRleHR1cmVcbiAgLy8gcHVibGljIHNoYWRlVGV4dHVyZV9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9TaGFkZVRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIG5vcm1hbE1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfQnVtcE1hcC4gYWdhaW4sIFRISVMgSVMgX0J1bXBNYXBcbiAgcHVibGljIG5vcm1hbE1hcFR5cGUgPSBUSFJFRS5UYW5nZW50U3BhY2VOb3JtYWxNYXA7IC8vIFRocmVlLmpzIHJlcXVpcmVzIHRoaXNcbiAgcHVibGljIG5vcm1hbFNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjIoMS4wLCAxLjApOyAvLyBfQnVtcFNjYWxlLCBpbiBWZWN0b3IyXG4gIC8vIHB1YmxpYyBidW1wTWFwX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX0J1bXBNYXBfU1QgKHVudXNlZClcbiAgcHVibGljIHJlY2VpdmVTaGFkb3dSYXRlID0gMS4wOyAvLyBfUmVjZWl2ZVNoYWRvd1JhdGVcbiAgcHVibGljIHJlY2VpdmVTaGFkb3dUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9SZWNlaXZlU2hhZG93VGV4dHVyZVxuICAvLyBwdWJsaWMgcmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIHNoYWRpbmdHcmFkZVJhdGUgPSAxLjA7IC8vIF9TaGFkaW5nR3JhZGVSYXRlXG4gIHB1YmxpYyBzaGFkaW5nR3JhZGVUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9TaGFkaW5nR3JhZGVUZXh0dXJlXG4gIC8vIHB1YmxpYyBzaGFkaW5nR3JhZGVUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1NoYWRpbmdHcmFkZVRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIHNoYWRlU2hpZnQgPSAwLjA7IC8vIF9TaGFkZVNoaWZ0XG4gIHB1YmxpYyBzaGFkZVRvb255ID0gMC45OyAvLyBfU2hhZGVUb29ueVxuICBwdWJsaWMgbGlnaHRDb2xvckF0dGVudWF0aW9uID0gMC4wOyAvLyBfTGlnaHRDb2xvckF0dGVudWF0aW9uXG4gIHB1YmxpYyBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gMC4xOyAvLyBfSW5kaXJlY3RMaWdodEludGVuc2l0eVxuICBwdWJsaWMgcmltVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfUmltVGV4dHVyZVxuICBwdWJsaWMgcmltQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAxLjApOyAvLyBfUmltQ29sb3JcbiAgcHVibGljIHJpbUxpZ2h0aW5nTWl4ID0gMC4wOyAvLyBfUmltTGlnaHRpbmdNaXhcbiAgcHVibGljIHJpbUZyZXNuZWxQb3dlciA9IDEuMDsgLy8gX1JpbUZyZXNuZWxQb3dlclxuICBwdWJsaWMgcmltTGlmdCA9IDAuMDsgLy8gX1JpbUxpZnRcbiAgcHVibGljIHNwaGVyZUFkZDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU3BoZXJlQWRkXG4gIC8vIHB1YmxpYyBzcGhlcmVBZGRfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU3BoZXJlQWRkX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBlbWlzc2lvbkNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX0VtaXNzaW9uQ29sb3JcbiAgcHVibGljIGVtaXNzaXZlTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9FbWlzc2lvbk1hcFxuICAvLyBwdWJsaWMgZW1pc3Npb25NYXBfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfRW1pc3Npb25NYXBfU1QgKHVudXNlZClcbiAgcHVibGljIG91dGxpbmVXaWR0aFRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVcbiAgLy8gcHVibGljIG91dGxpbmVXaWR0aFRleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfT3V0bGluZVdpZHRoVGV4dHVyZV9TVCAodW51c2VkKVxuICBwdWJsaWMgb3V0bGluZVdpZHRoID0gMC41OyAvLyBfT3V0bGluZVdpZHRoXG4gIHB1YmxpYyBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgPSAxLjA7IC8vIF9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2VcbiAgcHVibGljIG91dGxpbmVDb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIF9PdXRsaW5lQ29sb3JcbiAgcHVibGljIG91dGxpbmVMaWdodGluZ01peCA9IDEuMDsgLy8gX091dGxpbmVMaWdodGluZ01peFxuICBwdWJsaWMgdXZBbmltTWFza1RleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1V2QW5pbU1hc2tUZXh0dXJlXG4gIHB1YmxpYyB1dkFuaW1TY3JvbGxYID0gMC4wOyAvLyBfVXZBbmltU2Nyb2xsWFxuICBwdWJsaWMgdXZBbmltU2Nyb2xsWSA9IDAuMDsgLy8gX1V2QW5pbVNjcm9sbFlcbiAgcHVibGljIHV2QW5pbVJvdGF0aW9uID0gMC4wOyAvLyBfdXZBbmltUm90YXRpb25cblxuICBwdWJsaWMgc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7IC8vIHdoZW4gdGhpcyBpcyB0cnVlLCBhcHBseVVuaWZvcm1zIGVmZmVjdHNcblxuICAvKipcbiAgICogVGhlIGVuY29kaW5nIG9mIGlucHV0IHVuaWZvcm0gY29sb3JzLlxuICAgKlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYC5cbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLnNSR0JFbmNvZGluZ2AsIHVzZSBgVEhSRUUuc1JHQkVuY29kaW5nYC5cbiAgICpcbiAgICogRW5jb2RpbmdzIG9mIHRleHR1cmVzIGFyZSBzZXQgaW5kZXBlbmRlbnRseSBvbiB0ZXh0dXJlcy5cbiAgICpcbiAgICogVGhpcyBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9yZW5kZXJlcnMvV2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZ1xuICAgKi9cbiAgcHVibGljIGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG5cbiAgcHJpdmF0ZSBfZGVidWdNb2RlID0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob25lOyAvLyBfRGVidWdNb2RlXG4gIHByaXZhdGUgX2JsZW5kTW9kZSA9IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLk9wYXF1ZTsgLy8gX0JsZW5kTW9kZVxuICBwcml2YXRlIF9vdXRsaW5lV2lkdGhNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZTsgLy8gX091dGxpbmVXaWR0aE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZUNvbG9yTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLkZpeGVkQ29sb3I7IC8vIF9PdXRsaW5lQ29sb3JNb2RlXG4gIHByaXZhdGUgX2N1bGxNb2RlID0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2s7IC8vIF9DdWxsTW9kZVxuICBwcml2YXRlIF9vdXRsaW5lQ3VsbE1vZGUgPSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuRnJvbnQ7IC8vIF9PdXRsaW5lQ3VsbE1vZGVcbiAgLy8gcHVibGljIHNyY0JsZW5kID0gMS4wOyAvLyBfU3JjQmxlbmQgKGlzIG5vdCBzdXBwb3J0ZWQpXG4gIC8vIHB1YmxpYyBkc3RCbGVuZCA9IDAuMDsgLy8gX0RzdEJsZW5kIChpcyBub3Qgc3VwcG9ydGVkKVxuICAvLyBwdWJsaWMgeldyaXRlID0gMS4wOyAvLyBfWldyaXRlICh3aWxsIGJlIGNvbnZlcnRlZCB0byBkZXB0aFdyaXRlKVxuXG4gIHByaXZhdGUgX2lzT3V0bGluZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3V2QW5pbU9mZnNldFggPSAwLjA7XG4gIHByaXZhdGUgX3V2QW5pbU9mZnNldFkgPSAwLjA7XG4gIHByaXZhdGUgX3V2QW5pbVBoYXNlID0gMC4wO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE1Ub29uUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuZW5jb2RpbmcgPSBwYXJhbWV0ZXJzLmVuY29kaW5nIHx8IFRIUkVFLkxpbmVhckVuY29kaW5nO1xuICAgIGlmICh0aGlzLmVuY29kaW5nICE9PSBUSFJFRS5MaW5lYXJFbmNvZGluZyAmJiB0aGlzLmVuY29kaW5nICE9PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RoZSBzcGVjaWZpZWQgY29sb3IgZW5jb2RpbmcgZG9lcyBub3Qgd29yayBwcm9wZXJseSB3aXRoIE1Ub29uTWF0ZXJpYWwuIFlvdSBtaWdodCB3YW50IHRvIHVzZSBUSFJFRS5zUkdCRW5jb2RpbmcgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyA9PSB0aGVzZSBwYXJhbWV0ZXIgaGFzIG5vIGNvbXBhdGliaWxpdHkgd2l0aCB0aGlzIGltcGxlbWVudGF0aW9uID09PT09PT09XG4gICAgW1xuICAgICAgJ21Ub29uVmVyc2lvbicsXG4gICAgICAnc2hhZGVUZXh0dXJlX1NUJyxcbiAgICAgICdidW1wTWFwX1NUJyxcbiAgICAgICdyZWNlaXZlU2hhZG93VGV4dHVyZV9TVCcsXG4gICAgICAnc2hhZGluZ0dyYWRlVGV4dHVyZV9TVCcsXG4gICAgICAncmltVGV4dHVyZV9TVCcsXG4gICAgICAnc3BoZXJlQWRkX1NUJyxcbiAgICAgICdlbWlzc2lvbk1hcF9TVCcsXG4gICAgICAnb3V0bGluZVdpZHRoVGV4dHVyZV9TVCcsXG4gICAgICAndXZBbmltTWFza1RleHR1cmVfU1QnLFxuICAgICAgJ3NyY0JsZW5kJyxcbiAgICAgICdkc3RCbGVuZCcsXG4gICAgXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgocGFyYW1ldGVycyBhcyBhbnkpW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjb25zb2xlLndhcm4oYFRIUkVFLiR7dGhpcy50eXBlfTogVGhlIHBhcmFtZXRlciBcIiR7a2V5fVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyA9PSBlbmFibGluZyBidW5jaCBvZiBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMubGlnaHRzID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIHBhcmFtZXRlcnMuc2tpbm5pbmcgPSBwYXJhbWV0ZXJzLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzID0gcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgPSBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubm9ybWFsbWFwLCAvLyBub3JtYWxNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLCAvLyBlbWlzc2l2ZU1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubGlnaHRzLFxuICAgICAge1xuICAgICAgICBjdXRvZmY6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBjb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIGNvbG9yQWxwaGE6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBzaGFkZUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC45NywgMC44MSwgMC44NikgfSxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBtYWluVGV4X1NUOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIHNoYWRlVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICByZWNlaXZlU2hhZG93UmF0ZTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHJlY2VpdmVTaGFkb3dUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRpbmdHcmFkZVJhdGU6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBzaGFkaW5nR3JhZGVUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHNoYWRlU2hpZnQ6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBzaGFkZVRvb255OiB7IHZhbHVlOiAwLjkgfSxcbiAgICAgICAgbGlnaHRDb2xvckF0dGVudWF0aW9uOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgaW5kaXJlY3RMaWdodEludGVuc2l0eTogeyB2YWx1ZTogMC4xIH0sXG4gICAgICAgIHJpbVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgcmltQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICByaW1MaWdodGluZ01peDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHJpbUZyZXNuZWxQb3dlcjogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHJpbUxpZnQ6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBzcGhlcmVBZGQ6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgZW1pc3Npb25Db2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aFRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoOiB7IHZhbHVlOiAwLjUgfSxcbiAgICAgICAgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgb3V0bGluZUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4OiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgdXZBbmltTWFza1RleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgdXZBbmltT2Zmc2V0WDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbU9mZnNldFk6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1UaGV0YTogeyB2YWx1ZTogMC4wIH0sXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XG4gIH1cblxuICBnZXQgbWFpblRleCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFwO1xuICB9XG5cbiAgc2V0IG1haW5UZXgodDogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLm1hcCA9IHQ7XG4gIH1cblxuICBnZXQgYnVtcE1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsTWFwO1xuICB9XG5cbiAgc2V0IGJ1bXBNYXAodDogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGluZyB0aGUgYGJ1bXBTY2FsZWAgcmV1dHJucyBpdHMgeCBjb21wb25lbnQgb2YgYG5vcm1hbFNjYWxlYCAoYXNzdW1pbmcgeCBhbmQgeSBjb21wb25lbnQgb2YgYG5vcm1hbFNjYWxlYCBhcmUgc2FtZSkuXG4gICAqL1xuICBnZXQgYnVtcFNjYWxlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubm9ybWFsU2NhbGUueDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIHRoZSBgYnVtcFNjYWxlYCB3aWxsIGJlIGNvbnZlcnQgdGhlIHZhbHVlIGludG8gVmVjdG9yMiBgbm9ybWFsU2NhbGVgIC5cbiAgICovXG4gIHNldCBidW1wU2NhbGUodDogbnVtYmVyKSB7XG4gICAgdGhpcy5ub3JtYWxTY2FsZS5zZXQodCwgdCk7XG4gIH1cblxuICBnZXQgZW1pc3Npb25NYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmVtaXNzaXZlTWFwO1xuICB9XG5cbiAgc2V0IGVtaXNzaW9uTWFwKHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHQ7XG4gIH1cblxuICBnZXQgYmxlbmRNb2RlKCk6IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fYmxlbmRNb2RlO1xuICB9XG5cbiAgc2V0IGJsZW5kTW9kZShtOiBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSkge1xuICAgIHRoaXMuX2JsZW5kTW9kZSA9IG07XG5cbiAgICB0aGlzLmRlcHRoV3JpdGUgPSB0aGlzLl9ibGVuZE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50O1xuICAgIHRoaXMudHJhbnNwYXJlbnQgPVxuICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudCB8fFxuICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IGRlYnVnTW9kZSgpOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZGVidWdNb2RlO1xuICB9XG5cbiAgc2V0IGRlYnVnTW9kZShtOiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlKSB7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBvdXRsaW5lV2lkdGhNb2RlKCk6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoTW9kZTtcbiAgfVxuXG4gIHNldCBvdXRsaW5lV2lkdGhNb2RlKG06IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgb3V0bGluZUNvbG9yTW9kZSgpOiBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVDb2xvck1vZGU7XG4gIH1cblxuICBzZXQgb3V0bGluZUNvbG9yTW9kZShtOiBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVDb2xvck1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IGN1bGxNb2RlKCk6IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1bGxNb2RlO1xuICB9XG5cbiAgc2V0IGN1bGxNb2RlKG06IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSkge1xuICAgIHRoaXMuX2N1bGxNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICBnZXQgb3V0bGluZUN1bGxNb2RlKCk6IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVDdWxsTW9kZTtcbiAgfVxuXG4gIHNldCBvdXRsaW5lQ3VsbE1vZGUobTogTVRvb25NYXRlcmlhbEN1bGxNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZUN1bGxNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICBnZXQgeldyaXRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGVwdGhXcml0ZSA/IDEgOiAwO1xuICB9XG5cbiAgc2V0IHpXcml0ZShpOiBudW1iZXIpIHtcbiAgICB0aGlzLmRlcHRoV3JpdGUgPSAwLjUgPD0gaTtcbiAgfVxuXG4gIGdldCBpc091dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3V0bGluZTtcbiAgfVxuXG4gIHNldCBpc091dGxpbmUoYjogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzT3V0bGluZSA9IGI7XG5cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBtYXRlcmlhbC5cbiAgICogVXN1YWxseSB0aGlzIHdpbGwgYmUgY2FsbGVkIHZpYSBbW1ZSTS51cGRhdGVdXSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byBjYWxsIHRoaXMgbWFudWFsbHkuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUgc2luY2UgbGFzdCB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVWUk1NYXRlcmlhbHMoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3V2QW5pbU9mZnNldFggPSB0aGlzLl91dkFuaW1PZmZzZXRYICsgZGVsdGEgKiB0aGlzLnV2QW5pbVNjcm9sbFg7XG4gICAgdGhpcy5fdXZBbmltT2Zmc2V0WSA9IHRoaXMuX3V2QW5pbU9mZnNldFkgLSBkZWx0YSAqIHRoaXMudXZBbmltU2Nyb2xsWTsgLy8gTmVnYXRpdmUgc2luY2UgdCBheGlzIG9mIHV2cyBhcmUgb3Bwb3NpdGUgZnJvbSBVbml0eSdzIG9uZVxuICAgIHRoaXMuX3V2QW5pbVBoYXNlID0gdGhpcy5fdXZBbmltUGhhc2UgKyBkZWx0YSAqIHRoaXMudXZBbmltUm90YXRpb247XG5cbiAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG5cbiAgICAvLyA9PSBjb3B5IG1lbWJlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5jdXRvZmYgPSBzb3VyY2UuY3V0b2ZmO1xuICAgIHRoaXMuY29sb3IuY29weShzb3VyY2UuY29sb3IpO1xuICAgIHRoaXMuc2hhZGVDb2xvci5jb3B5KHNvdXJjZS5zaGFkZUNvbG9yKTtcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXA7XG4gICAgdGhpcy5tYWluVGV4X1NULmNvcHkoc291cmNlLm1haW5UZXhfU1QpO1xuICAgIHRoaXMuc2hhZGVUZXh0dXJlID0gc291cmNlLnNoYWRlVGV4dHVyZTtcbiAgICB0aGlzLm5vcm1hbE1hcCA9IHNvdXJjZS5ub3JtYWxNYXA7XG4gICAgdGhpcy5ub3JtYWxNYXBUeXBlID0gc291cmNlLm5vcm1hbE1hcFR5cGU7XG4gICAgdGhpcy5ub3JtYWxTY2FsZS5jb3B5KHRoaXMubm9ybWFsU2NhbGUpO1xuICAgIHRoaXMucmVjZWl2ZVNoYWRvd1JhdGUgPSBzb3VyY2UucmVjZWl2ZVNoYWRvd1JhdGU7XG4gICAgdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZSA9IHNvdXJjZS5yZWNlaXZlU2hhZG93VGV4dHVyZTtcbiAgICB0aGlzLnNoYWRpbmdHcmFkZVJhdGUgPSBzb3VyY2Uuc2hhZGluZ0dyYWRlUmF0ZTtcbiAgICB0aGlzLnNoYWRpbmdHcmFkZVRleHR1cmUgPSBzb3VyY2Uuc2hhZGluZ0dyYWRlVGV4dHVyZTtcbiAgICB0aGlzLnNoYWRlU2hpZnQgPSBzb3VyY2Uuc2hhZGVTaGlmdDtcbiAgICB0aGlzLnNoYWRlVG9vbnkgPSBzb3VyY2Uuc2hhZGVUb29ueTtcbiAgICB0aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IHNvdXJjZS5saWdodENvbG9yQXR0ZW51YXRpb247XG4gICAgdGhpcy5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gc291cmNlLmluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XG4gICAgdGhpcy5yaW1UZXh0dXJlID0gc291cmNlLnJpbVRleHR1cmU7XG4gICAgdGhpcy5yaW1Db2xvci5jb3B5KHNvdXJjZS5yaW1Db2xvcik7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peCA9IHNvdXJjZS5yaW1MaWdodGluZ01peDtcbiAgICB0aGlzLnJpbUZyZXNuZWxQb3dlciA9IHNvdXJjZS5yaW1GcmVzbmVsUG93ZXI7XG4gICAgdGhpcy5yaW1MaWZ0ID0gc291cmNlLnJpbUxpZnQ7XG4gICAgdGhpcy5zcGhlcmVBZGQgPSBzb3VyY2Uuc3BoZXJlQWRkO1xuICAgIHRoaXMuZW1pc3Npb25Db2xvci5jb3B5KHNvdXJjZS5lbWlzc2lvbkNvbG9yKTtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gc291cmNlLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhUZXh0dXJlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoID0gc291cmNlLm91dGxpbmVXaWR0aDtcbiAgICB0aGlzLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSA9IHNvdXJjZS5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3IuY29weShzb3VyY2Uub3V0bGluZUNvbG9yKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peCA9IHNvdXJjZS5vdXRsaW5lTGlnaHRpbmdNaXg7XG4gICAgdGhpcy51dkFuaW1NYXNrVGV4dHVyZSA9IHNvdXJjZS51dkFuaW1NYXNrVGV4dHVyZTtcbiAgICB0aGlzLnV2QW5pbVNjcm9sbFggPSBzb3VyY2UudXZBbmltU2Nyb2xsWDtcbiAgICB0aGlzLnV2QW5pbVNjcm9sbFkgPSBzb3VyY2UudXZBbmltU2Nyb2xsWTtcbiAgICB0aGlzLnV2QW5pbVJvdGF0aW9uID0gc291cmNlLnV2QW5pbVJvdGF0aW9uO1xuXG4gICAgdGhpcy5kZWJ1Z01vZGUgPSBzb3VyY2UuZGVidWdNb2RlO1xuICAgIHRoaXMuYmxlbmRNb2RlID0gc291cmNlLmJsZW5kTW9kZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aE1vZGUgPSBzb3VyY2Uub3V0bGluZVdpZHRoTW9kZTtcbiAgICB0aGlzLm91dGxpbmVDb2xvck1vZGUgPSBzb3VyY2Uub3V0bGluZUNvbG9yTW9kZTtcbiAgICB0aGlzLmN1bGxNb2RlID0gc291cmNlLmN1bGxNb2RlO1xuICAgIHRoaXMub3V0bGluZUN1bGxNb2RlID0gc291cmNlLm91dGxpbmVDdWxsTW9kZTtcblxuICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHVwZGF0ZWQgdW5pZm9ybSB2YXJpYWJsZXMuXG4gICAqL1xuICBwcml2YXRlIF9hcHBseVVuaWZvcm1zKCk6IHZvaWQge1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltT2Zmc2V0WC52YWx1ZSA9IHRoaXMuX3V2QW5pbU9mZnNldFg7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1PZmZzZXRZLnZhbHVlID0gdGhpcy5fdXZBbmltT2Zmc2V0WTtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbVRoZXRhLnZhbHVlID0gVEFVICogdGhpcy5fdXZBbmltUGhhc2U7XG5cbiAgICBpZiAoIXRoaXMuc2hvdWxkQXBwbHlVbmlmb3Jtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMgPSBmYWxzZTtcblxuICAgIHRoaXMudW5pZm9ybXMuY3V0b2ZmLnZhbHVlID0gdGhpcy5jdXRvZmY7XG4gICAgdGhpcy51bmlmb3Jtcy5jb2xvci52YWx1ZS5zZXRSR0IodGhpcy5jb2xvci54LCB0aGlzLmNvbG9yLnksIHRoaXMuY29sb3Iueik7XG4gICAgdGhpcy51bmlmb3Jtcy5jb2xvckFscGhhLnZhbHVlID0gdGhpcy5jb2xvci53O1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvci52YWx1ZS5zZXRSR0IodGhpcy5zaGFkZUNvbG9yLngsIHRoaXMuc2hhZGVDb2xvci55LCB0aGlzLnNoYWRlQ29sb3Iueik7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB0aGlzLm1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm1haW5UZXhfU1QudmFsdWUuY29weSh0aGlzLm1haW5UZXhfU1QpO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVUZXh0dXJlLnZhbHVlID0gdGhpcy5zaGFkZVRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWUgPSB0aGlzLm5vcm1hbE1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbFNjYWxlLnZhbHVlLmNvcHkodGhpcy5ub3JtYWxTY2FsZSk7XG4gICAgdGhpcy51bmlmb3Jtcy5yZWNlaXZlU2hhZG93UmF0ZS52YWx1ZSA9IHRoaXMucmVjZWl2ZVNoYWRvd1JhdGU7XG4gICAgdGhpcy51bmlmb3Jtcy5yZWNlaXZlU2hhZG93VGV4dHVyZS52YWx1ZSA9IHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nR3JhZGVSYXRlLnZhbHVlID0gdGhpcy5zaGFkaW5nR3JhZGVSYXRlO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ0dyYWRlVGV4dHVyZS52YWx1ZSA9IHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlU2hpZnQudmFsdWUgPSB0aGlzLnNoYWRlU2hpZnQ7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZVRvb255LnZhbHVlID0gdGhpcy5zaGFkZVRvb255O1xuICAgIHRoaXMudW5pZm9ybXMubGlnaHRDb2xvckF0dGVudWF0aW9uLnZhbHVlID0gdGhpcy5saWdodENvbG9yQXR0ZW51YXRpb247XG4gICAgdGhpcy51bmlmb3Jtcy5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5LnZhbHVlID0gdGhpcy5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5O1xuICAgIHRoaXMudW5pZm9ybXMucmltVGV4dHVyZS52YWx1ZSA9IHRoaXMucmltVGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLnJpbUNvbG9yLngsIHRoaXMucmltQ29sb3IueSwgdGhpcy5yaW1Db2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUxpZ2h0aW5nTWl4LnZhbHVlID0gdGhpcy5yaW1MaWdodGluZ01peDtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUZyZXNuZWxQb3dlci52YWx1ZSA9IHRoaXMucmltRnJlc25lbFBvd2VyO1xuICAgIHRoaXMudW5pZm9ybXMucmltTGlmdC52YWx1ZSA9IHRoaXMucmltTGlmdDtcbiAgICB0aGlzLnVuaWZvcm1zLnNwaGVyZUFkZC52YWx1ZSA9IHRoaXMuc3BoZXJlQWRkO1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3Npb25Db2xvci52YWx1ZS5zZXRSR0IodGhpcy5lbWlzc2lvbkNvbG9yLngsIHRoaXMuZW1pc3Npb25Db2xvci55LCB0aGlzLmVtaXNzaW9uQ29sb3Iueik7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2l2ZU1hcC52YWx1ZSA9IHRoaXMuZW1pc3NpdmVNYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGhUZXh0dXJlLnZhbHVlID0gdGhpcy5vdXRsaW5lV2lkdGhUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoLnZhbHVlID0gdGhpcy5vdXRsaW5lV2lkdGg7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UudmFsdWUgPSB0aGlzLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvci52YWx1ZS5zZXRSR0IodGhpcy5vdXRsaW5lQ29sb3IueCwgdGhpcy5vdXRsaW5lQ29sb3IueSwgdGhpcy5vdXRsaW5lQ29sb3Iueik7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lTGlnaHRpbmdNaXgudmFsdWUgPSB0aGlzLm91dGxpbmVMaWdodGluZ01peDtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbU1hc2tUZXh0dXJlLnZhbHVlID0gdGhpcy51dkFuaW1NYXNrVGV4dHVyZTtcblxuICAgIC8vIGFwcGx5IGNvbG9yIHNwYWNlIHRvIHVuaWZvcm0gY29sb3JzXG4gICAgaWYgKHRoaXMuZW5jb2RpbmcgPT09IFRIUkVFLnNSR0JFbmNvZGluZykge1xuICAgICAgdGhpcy51bmlmb3Jtcy5jb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgdGhpcy51bmlmb3Jtcy5yaW1Db2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaW9uQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaGFkZXJDb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVmaW5lcyA9IHtcbiAgICAgIE9VVExJTkU6IHRoaXMuX2lzT3V0bGluZSxcbiAgICAgIEJMRU5ETU9ERV9PUEFRVUU6IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuT3BhcXVlLFxuICAgICAgQkxFTkRNT0RFX0NVVE9VVDogdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5DdXRvdXQsXG4gICAgICBCTEVORE1PREVfVFJBTlNQQVJFTlQ6XG4gICAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudFdpdGhaV3JpdGUsXG4gICAgICBVU0VfU0hBREVURVhUVVJFOiB0aGlzLnNoYWRlVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRTogdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9TSEFESU5HR1JBREVURVhUVVJFOiB0aGlzLnNoYWRpbmdHcmFkZVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUklNVEVYVFVSRTogdGhpcy5yaW1UZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1NQSEVSRUFERDogdGhpcy5zcGhlcmVBZGQgIT09IG51bGwsXG4gICAgICBVU0VfT1VUTElORVdJRFRIVEVYVFVSRTogdGhpcy5vdXRsaW5lV2lkdGhUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1VWQU5JTU1BU0tURVhUVVJFOiB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlICE9PSBudWxsLFxuICAgICAgREVCVUdfTk9STUFMOiB0aGlzLl9kZWJ1Z01vZGUgPT09IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTm9ybWFsLFxuICAgICAgREVCVUdfTElUU0hBREVSQVRFOiB0aGlzLl9kZWJ1Z01vZGUgPT09IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTGl0U2hhZGVSYXRlLFxuICAgICAgREVCVUdfVVY6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5VVixcbiAgICAgIE9VVExJTkVfV0lEVEhfV09STEQ6IHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLldvcmxkQ29vcmRpbmF0ZXMsXG4gICAgICBPVVRMSU5FX1dJRFRIX1NDUkVFTjogdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuU2NyZWVuQ29vcmRpbmF0ZXMsXG4gICAgICBPVVRMSU5FX0NPTE9SX0ZJWEVEOiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZS5GaXhlZENvbG9yLFxuICAgICAgT1VUTElORV9DT0xPUl9NSVhFRDogdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUuTWl4ZWRMaWdodGluZyxcbiAgICB9O1xuXG4gICAgLy8gPT0gdGV4dHVyZSBlbmNvZGluZ3MgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGNvbnN0IGVuY29kaW5ncyA9XG4gICAgICAodGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oJ3NoYWRlVGV4dHVyZVRleGVsVG9MaW5lYXInLCB0aGlzLnNoYWRlVGV4dHVyZS5lbmNvZGluZykgKyAnXFxuJ1xuICAgICAgICA6ICcnKSArXG4gICAgICAodGhpcy5zcGhlcmVBZGQgIT09IG51bGxcbiAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oJ3NwaGVyZUFkZFRleGVsVG9MaW5lYXInLCB0aGlzLnNwaGVyZUFkZC5lbmNvZGluZykgKyAnXFxuJ1xuICAgICAgICA6ICcnKSArXG4gICAgICAodGhpcy5yaW1UZXh0dXJlICE9PSBudWxsXG4gICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKCdyaW1UZXh0dXJlVGV4ZWxUb0xpbmVhcicsIHRoaXMucmltVGV4dHVyZS5lbmNvZGluZykgKyAnXFxuJ1xuICAgICAgICA6ICcnKTtcblxuICAgIC8vID09IGdlbmVyYXRlIHNoYWRlciBjb2RlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnZlcnRleFNoYWRlciA9IHZlcnRleFNoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZW5jb2RpbmdzICsgZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAvLyA9PSBzZXQgbmVlZHNVcGRhdGUgZmxhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDdWxsRmFjZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPdXRsaW5lKSB7XG4gICAgICBpZiAodGhpcy5jdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLk9mZikge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuRnJvbnQpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5CYWNrKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkZyb250U2lkZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuT2ZmKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuRnJvbnQpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuQmFjaykge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Gcm9udFNpZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvdW5saXQudmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL3VubGl0LmZyYWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZSTVVubGl0TWF0ZXJpYWxQYXJhbWV0ZXJzIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzIHtcbiAgY3V0b2ZmPzogbnVtYmVyOyAvLyBfQ3V0b2ZmXG4gIG1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4XG4gIG1haW5UZXg/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleCAod2lsbCBiZSByZW5hbWVkIHRvIG1hcClcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICBtYWluVGV4X1NUPzogVEhSRUUuVmVjdG9yNDsgLy8gX01haW5UZXhfU1RcblxuICByZW5kZXJUeXBlPzogVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUgfCBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlIHtcbiAgT3BhcXVlLFxuICBDdXRvdXQsXG4gIFRyYW5zcGFyZW50LFxuICBUcmFuc3BhcmVudFdpdGhaV3JpdGUsXG59XG5cbi8qKlxuICogVGhpcyBpcyBhIG1hdGVyaWFsIHRoYXQgaXMgYW4gZXF1aXZhbGVudCBvZiBcIlZSTS9VbmxpdCoqKlwiIG9uIFZSTSBzcGVjLCB0aG9zZSBtYXRlcmlhbHMgYXJlIGFscmVhZHkga2luZGEgZGVwcmVjYXRlZCB0aG91Z2guLi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVVubGl0TWF0ZXJpYWwgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbCB7XG4gIC8qKlxuICAgKiBSZWFkb25seSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoaXMgaXMgYSBbW1ZSTVVubGl0TWF0ZXJpYWxdXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpc1ZSTVVubGl0TWF0ZXJpYWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBjdXRvZmYgPSAwLjU7XG4gIHB1YmxpYyBtYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX01haW5UZXhcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICBwdWJsaWMgbWFpblRleF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9NYWluVGV4X1NUXG4gIHByaXZhdGUgX3JlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWU7XG5cbiAgcHVibGljIHNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlOyAvLyB3aGVuIHRoaXMgaXMgdHJ1ZSwgYXBwbHlVbmlmb3JtcyBlZmZlY3RzXG5cbiAgY29uc3RydWN0b3IocGFyYW1ldGVycz86IFZSTVVubGl0TWF0ZXJpYWxQYXJhbWV0ZXJzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChwYXJhbWV0ZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgICB9XG5cbiAgICAvLyA9PSBlbmFibGluZyBidW5jaCBvZiBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMuY2xpcHBpbmcgPSB0cnVlO1xuXG4gICAgcGFyYW1ldGVycy5za2lubmluZyA9IHBhcmFtZXRlcnMuc2tpbm5pbmcgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgPSBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcbiAgICBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyA9IHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xuXG4gICAgLy8gPT0gdW5pZm9ybXMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmNvbW1vbiwgLy8gbWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5mb2csXG4gICAgICB7XG4gICAgICAgIGN1dG9mZjogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgbWFpblRleF9TVDogeyB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgfSxcbiAgICBdKTtcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgZ2V0IG1haW5UZXgoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hcDtcbiAgfVxuXG4gIHNldCBtYWluVGV4KHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5tYXAgPSB0O1xuICB9XG5cbiAgZ2V0IHJlbmRlclR5cGUoKTogVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJUeXBlO1xuICB9XG5cbiAgc2V0IHJlbmRlclR5cGUodDogVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUpIHtcbiAgICB0aGlzLl9yZW5kZXJUeXBlID0gdDtcblxuICAgIHRoaXMuZGVwdGhXcml0ZSA9IHRoaXMuX3JlbmRlclR5cGUgIT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50O1xuICAgIHRoaXMudHJhbnNwYXJlbnQgPVxuICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqIFVzdWFsbHkgdGhpcyB3aWxsIGJlIGNhbGxlZCB2aWEgW1tWUk0udXBkYXRlXV0gc28geW91IGRvbid0IGhhdmUgdG8gY2FsbCB0aGlzIG1hbnVhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVlJNTWF0ZXJpYWxzKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG5cbiAgICAvLyA9PSBjb3B5IG1lbWJlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5jdXRvZmYgPSBzb3VyY2UuY3V0b2ZmO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcbiAgICB0aGlzLm1haW5UZXhfU1QuY29weShzb3VyY2UubWFpblRleF9TVCk7XG4gICAgdGhpcy5yZW5kZXJUeXBlID0gc291cmNlLnJlbmRlclR5cGU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB1cGRhdGVkIHVuaWZvcm0gdmFyaWFibGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlVbmlmb3JtcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc2hvdWxkQXBwbHlVbmlmb3Jtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMgPSBmYWxzZTtcblxuICAgIHRoaXMudW5pZm9ybXMuY3V0b2ZmLnZhbHVlID0gdGhpcy5jdXRvZmY7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB0aGlzLm1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm1haW5UZXhfU1QudmFsdWUuY29weSh0aGlzLm1haW5UZXhfU1QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2hhZGVyQ29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmluZXMgPSB7XG4gICAgICBSRU5ERVJUWVBFX09QQVFVRTogdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuT3BhcXVlLFxuICAgICAgUkVOREVSVFlQRV9DVVRPVVQ6IHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLkN1dG91dCxcbiAgICAgIFJFTkRFUlRZUEVfVFJBTlNQQVJFTlQ6XG4gICAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50IHx8XG4gICAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICB9O1xuXG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB2ZXJ0ZXhTaGFkZXI7XG4gICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGZyYWdtZW50U2hhZGVyO1xuXG4gICAgLy8gPT0gc2V0IG5lZWRzVXBkYXRlIGZsYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBHTFRGU2NoZW1hLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsLCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgeyBWUk1VbmxpdE1hdGVyaWFsLCBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB9IGZyb20gJy4vVlJNVW5saXRNYXRlcmlhbCc7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgYSBbW1ZSTU1hdGVyaWFsSW1wb3J0ZXJdXSBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWUk1NYXRlcmlhbEltcG9ydGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBlbmNvZGluZyBvZiBpbnB1dCB1bmlmb3JtIGNvbG9ycyBhbmQgdGV4dHVyZXMuXG4gICAqXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuc1JHQkVuY29kaW5nYCwgdXNlIGBUSFJFRS5zUkdCRW5jb2RpbmdgLlxuICAgKlxuICAgKiBUaGUgaW1wb3J0ZXIgd2lsbCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYCBpZiB0aGlzIG9wdGlvbiBpc24ndCBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9yZW5kZXJlcnMvV2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZ1xuICAgKi9cbiAgZW5jb2Rpbmc/OiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgYFByb21pc2VgIG9mIGVudmlyb25tZW50IG1hcCB0ZXh0dXJlLlxuICAgKiBUaGUgaW1wb3J0ZXIgd2lsbCBhdHRlbXB0IHRvIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIGl0IGhhdmUgdG8gdXNlIGFuIGVudm1hcC5cbiAgICovXG4gIHJlcXVlc3RFbnZNYXA/OiAoKSA9PiBQcm9taXNlPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbn1cblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgVlJNIG1hdGVyaWFscyBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NYXRlcmlhbEltcG9ydGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZztcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdEVudk1hcD86ICgpID0+IFByb21pc2U8VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTWF0ZXJpYWxJbXBvcnRlci5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBvZiB0aGUgVlJNTWF0ZXJpYWxJbXBvcnRlclxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogVlJNTWF0ZXJpYWxJbXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuX2VuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZyB8fCBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgICBpZiAodGhpcy5fZW5jb2RpbmcgIT09IFRIUkVFLkxpbmVhckVuY29kaW5nICYmIHRoaXMuX2VuY29kaW5nICE9PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RoZSBzcGVjaWZpZWQgY29sb3IgZW5jb2RpbmcgbWlnaHQgbm90IHdvcmsgcHJvcGVybHkgd2l0aCBWUk1NYXRlcmlhbEltcG9ydGVyLiBZb3UgbWlnaHQgd2FudCB0byB1c2UgVEhSRUUuc1JHQkVuY29kaW5nIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVxdWVzdEVudk1hcCA9IG9wdGlvbnMucmVxdWVzdEVudk1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFsbCB0aGUgbWF0ZXJpYWxzIG9mIGdpdmVuIEdMVEYgYmFzZWQgb24gVlJNIGV4dGVuc2lvbiBmaWVsZCBgbWF0ZXJpYWxQcm9wZXJ0aWVzYC5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY29udmVydEdMVEZNYXRlcmlhbHMoZ2x0ZjogR0xURik6IFByb21pc2U8VEhSRUUuTWF0ZXJpYWxbXSB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0aWVzOiBWUk1TY2hlbWEuTWF0ZXJpYWxbXSB8IHVuZGVmaW5lZCA9IHZybUV4dC5tYXRlcmlhbFByb3BlcnRpZXM7XG4gICAgaWYgKCFtYXRlcmlhbFByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuICAgIGNvbnN0IG1hdGVyaWFsTGlzdDogeyBbdnJtTWF0ZXJpYWxJbmRleDogbnVtYmVyXTogeyBzdXJmYWNlOiBUSFJFRS5NYXRlcmlhbDsgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsIH0gfSA9IHt9O1xuICAgIGNvbnN0IG1hdGVyaWFsczogVEhSRUUuTWF0ZXJpYWxbXSA9IFtdOyAvLyByZXN1bHRcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLm1hcChhc3luYyAoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgICAgY29uc3Qgc2NoZW1hTm9kZTogR0xURlNjaGVtYS5Ob2RlID0gZ2x0Zi5wYXJzZXIuanNvbi5ub2Rlc1tub2RlSW5kZXhdO1xuICAgICAgICBjb25zdCBzY2hlbWFNZXNoOiBHTFRGU2NoZW1hLk1lc2ggPSBnbHRmLnBhcnNlci5qc29uLm1lc2hlc1tzY2hlbWFOb2RlLm1lc2ghXTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICBwcmltaXRpdmVzLm1hcChhc3luYyAocHJpbWl0aXZlLCBwcmltaXRpdmVJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NoZW1hUHJpbWl0aXZlID0gc2NoZW1hTWVzaC5wcmltaXRpdmVzW3ByaW1pdGl2ZUluZGV4XTtcblxuICAgICAgICAgICAgLy8gc29tZSBnbFRGIG1pZ2h0IGhhdmUgYm90aCBgbm9kZS5tZXNoYCBhbmQgYG5vZGUuY2hpbGRyZW5gIGF0IG9uY2VcbiAgICAgICAgICAgIC8vIGFuZCBHTFRGTG9hZGVyIGhhbmRsZXMgYm90aCBtZXNoIHByaW1pdGl2ZXMgYW5kIFwiY2hpbGRyZW5cIiBpbiBnbFRGIGFzIFwiY2hpbGRyZW5cIiBpbiBUSFJFRVxuICAgICAgICAgICAgLy8gSXQgc2VlbXMgR0xURkxvYWRlciBoYW5kbGVzIHByaW1pdGl2ZXMgZmlyc3QgdGhlbiBoYW5kbGVzIFwiY2hpbGRyZW5cIiBpbiBnbFRGIChpdCdzIGx1Y2t5ISlcbiAgICAgICAgICAgIC8vIHNvIHdlIHNob3VsZCBpZ25vcmUgKHByaW1pdGl2ZXMubGVuZ3RoKXRoIGFuZCBmb2xsb3dpbmcgY2hpbGRyZW4gb2YgYG1lc2guY2hpbGRyZW5gXG4gICAgICAgICAgICAvLyBUT0RPOiBzYW5pdGl6ZSB0aGlzIGFmdGVyIEdMVEZMb2FkZXIgcGx1Z2luIHN5c3RlbSBnZXRzIGludHJvZHVjZWQgOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTg0MjFcbiAgICAgICAgICAgIGlmICghc2NoZW1hUHJpbWl0aXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlR2VvbWV0cnkgPSBwcmltaXRpdmUuZ2VvbWV0cnk7XG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmVWZXJ0aWNlcyA9IHByaW1pdGl2ZUdlb21ldHJ5LmluZGV4XG4gICAgICAgICAgICAgID8gcHJpbWl0aXZlR2VvbWV0cnkuaW5kZXguY291bnRcbiAgICAgICAgICAgICAgOiBwcmltaXRpdmVHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmNvdW50IC8gMztcblxuICAgICAgICAgICAgLy8gaWYgcHJpbWl0aXZlcyBtYXRlcmlhbCBpcyBub3QgYW4gYXJyYXksIG1ha2UgaXQgYW4gYXJyYXlcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcmltaXRpdmUubWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbCA9IFtwcmltaXRpdmUubWF0ZXJpYWxdO1xuICAgICAgICAgICAgICBwcmltaXRpdmVHZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSAvIHB1c2ggdG8gY2FjaGUgKG9yIHBvcCBmcm9tIGNhY2hlKSB2cm0gbWF0ZXJpYWxzXG4gICAgICAgICAgICBjb25zdCB2cm1NYXRlcmlhbEluZGV4ID0gc2NoZW1hUHJpbWl0aXZlLm1hdGVyaWFsITtcblxuICAgICAgICAgICAgbGV0IHByb3BzID0gbWF0ZXJpYWxQcm9wZXJ0aWVzW3ZybU1hdGVyaWFsSW5kZXhdO1xuICAgICAgICAgICAgaWYgKCFwcm9wcykge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTU1hdGVyaWFsSW1wb3J0ZXI6IFRoZXJlIGFyZSBubyBtYXRlcmlhbCBkZWZpbml0aW9uIGZvciBtYXRlcmlhbCAjJHt2cm1NYXRlcmlhbEluZGV4fSBvbiBWUk0gZXh0ZW5zaW9uLmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHByb3BzID0geyBzaGFkZXI6ICdWUk1fVVNFX0dMVEZTSEFERVInIH07IC8vIGZhbGxiYWNrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2cm1NYXRlcmlhbHM6IHsgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7IG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbCB9O1xuICAgICAgICAgICAgaWYgKG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XSkge1xuICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMgPSBtYXRlcmlhbExpc3RbdnJtTWF0ZXJpYWxJbmRleF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMgPSBhd2FpdCB0aGlzLmNyZWF0ZVZSTU1hdGVyaWFscyhwcmltaXRpdmUubWF0ZXJpYWxbMF0sIHByb3BzLCBnbHRmKTtcbiAgICAgICAgICAgICAgbWF0ZXJpYWxMaXN0W3ZybU1hdGVyaWFsSW5kZXhdID0gdnJtTWF0ZXJpYWxzO1xuXG4gICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKHZybU1hdGVyaWFscy5zdXJmYWNlKTtcbiAgICAgICAgICAgICAgaWYgKHZybU1hdGVyaWFscy5vdXRsaW5lKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2godnJtTWF0ZXJpYWxzLm91dGxpbmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN1cmZhY2VcbiAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbFswXSA9IHZybU1hdGVyaWFscy5zdXJmYWNlO1xuXG4gICAgICAgICAgICAvLyBlbnZtYXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0RW52TWFwICYmICh2cm1NYXRlcmlhbHMuc3VyZmFjZSBhcyBhbnkpLmlzTWVzaFN0YW5kYXJkTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdEVudk1hcCgpLnRoZW4oKGVudk1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICh2cm1NYXRlcmlhbHMuc3VyZmFjZSBhcyBhbnkpLmVudk1hcCA9IGVudk1hcDtcbiAgICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMuc3VyZmFjZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW5kZXIgb3JkZXJcbiAgICAgICAgICAgIHByaW1pdGl2ZS5yZW5kZXJPcmRlciA9IHByb3BzLnJlbmRlclF1ZXVlIHx8IDIwMDA7XG5cbiAgICAgICAgICAgIC8vIG91dGxpbmUgKFwiMiBwYXNzIHNoYWRpbmcgdXNpbmcgZ3JvdXBzXCIgdHJpY2sgaGVyZSlcbiAgICAgICAgICAgIGlmICh2cm1NYXRlcmlhbHMub3V0bGluZSkge1xuICAgICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWxbMV0gPSB2cm1NYXRlcmlhbHMub3V0bGluZTtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlR2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYXRlcmlhbHM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3JlYXRlVlJNTWF0ZXJpYWxzKFxuICAgIG9yaWdpbmFsTWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsLFxuICAgIHZybVByb3BzOiBWUk1TY2hlbWEuTWF0ZXJpYWwsXG4gICAgZ2x0ZjogR0xURixcbiAgKTogUHJvbWlzZTx7XG4gICAgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7XG4gICAgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsO1xuICB9PiB7XG4gICAgbGV0IG5ld1N1cmZhY2U6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkO1xuICAgIGxldCBuZXdPdXRsaW5lOiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vTVRvb24nKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcblxuICAgICAgLy8gd2UgbmVlZCB0byBnZXQgcmlkIG9mIHRoZXNlIHByb3BlcnRpZXNcbiAgICAgIFsnc3JjQmxlbmQnLCAnZHN0QmxlbmQnLCAnaXNGaXJzdFNldHVwJ10uZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAocGFyYW1zW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgcGFyYW1zW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhlc2UgdGV4dHVyZXMgbXVzdCBiZSBzUkdCIEVuY29kaW5nLCBkZXBlbmRzIG9uIGN1cnJlbnQgY29sb3JzcGFjZVxuICAgICAgWydtYWluVGV4JywgJ3NoYWRlVGV4dHVyZScsICdlbWlzc2lvbk1hcCcsICdzcGhlcmVBZGQnLCAncmltVGV4dHVyZSddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGFyYW1zW25hbWVdLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBzcGVjaWZ5IHVuaWZvcm0gY29sb3IgZW5jb2RpbmdzXG4gICAgICBwYXJhbXMuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcblxuICAgICAgLy8gZG9uZVxuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBNVG9vbk1hdGVyaWFsKHBhcmFtcyk7XG5cbiAgICAgIC8vIG91dGxpbmVcbiAgICAgIGlmIChwYXJhbXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgICBwYXJhbXMuaXNPdXRsaW5lID0gdHJ1ZTtcbiAgICAgICAgbmV3T3V0bGluZSA9IG5ldyBNVG9vbk1hdGVyaWFsKHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUZXh0dXJlJykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLk9wYXF1ZTtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0Q3V0b3V0Jykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLkN1dG91dDtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnQnKSB7XG4gICAgICAvLyB0aGlzIGlzIHZlcnkgbGVnYWN5XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQ7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodnJtUHJvcHMuc2hhZGVyICE9PSAnVlJNX1VTRV9HTFRGU0hBREVSJykge1xuICAgICAgICBjb25zb2xlLndhcm4oYFVua25vd24gc2hhZGVyIGRldGVjdGVkOiBcIiR7dnJtUHJvcHMuc2hhZGVyfVwiYCk7XG4gICAgICAgIC8vIHRoZW4gcHJlc3VtZSBhcyBWUk1fVVNFX0dMVEZTSEFERVJcbiAgICAgIH1cblxuICAgICAgbmV3U3VyZmFjZSA9IHRoaXMuX2NvbnZlcnRHTFRGTWF0ZXJpYWwob3JpZ2luYWxNYXRlcmlhbC5jbG9uZSgpKTtcbiAgICB9XG5cbiAgICBuZXdTdXJmYWNlLm5hbWUgPSBvcmlnaW5hbE1hdGVyaWFsLm5hbWU7XG4gICAgbmV3U3VyZmFjZS51c2VyRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxNYXRlcmlhbC51c2VyRGF0YSkpO1xuICAgIG5ld1N1cmZhY2UudXNlckRhdGEudnJtTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdnJtUHJvcHM7XG5cbiAgICBpZiAobmV3T3V0bGluZSkge1xuICAgICAgbmV3T3V0bGluZS5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lICsgJyAoT3V0bGluZSknO1xuICAgICAgbmV3T3V0bGluZS51c2VyRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxNYXRlcmlhbC51c2VyRGF0YSkpO1xuICAgICAgbmV3T3V0bGluZS51c2VyRGF0YS52cm1NYXRlcmlhbFByb3BlcnRpZXMgPSB2cm1Qcm9wcztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VyZmFjZTogbmV3U3VyZmFjZSxcbiAgICAgIG91dGxpbmU6IG5ld091dGxpbmUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAobmFtZVswXSAhPT0gJ18nKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTU1hdGVyaWFsczogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xuXG4gICAgaWYgKCEvW0EtWl0vLnRlc3QobmFtZVswXSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzOiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZVswXS50b0xvd2VyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XG4gIH1cblxuICBwcml2YXRlIF9jb252ZXJ0R0xURk1hdGVyaWFsKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IFRIUkVFLk1hdGVyaWFsIHtcbiAgICBpZiAoKG1hdGVyaWFsIGFzIGFueSkuaXNNZXNoU3RhbmRhcmRNYXRlcmlhbCkge1xuICAgICAgY29uc3QgbXRsID0gbWF0ZXJpYWwgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWw7XG5cbiAgICAgIGlmIChtdGwubWFwKSB7XG4gICAgICAgIG10bC5tYXAuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcbiAgICAgIH1cbiAgICAgIGlmIChtdGwuZW1pc3NpdmVNYXApIHtcbiAgICAgICAgbXRsLmVtaXNzaXZlTWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lbmNvZGluZyA9PT0gVEhSRUUuTGluZWFyRW5jb2RpbmcpIHtcbiAgICAgICAgbXRsLmNvbG9yLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcbiAgICAgICAgbXRsLmVtaXNzaXZlLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKG1hdGVyaWFsIGFzIGFueSkuaXNNZXNoQmFzaWNNYXRlcmlhbCkge1xuICAgICAgY29uc3QgbXRsID0gbWF0ZXJpYWwgYXMgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw7XG5cbiAgICAgIGlmIChtdGwubWFwKSB7XG4gICAgICAgIG10bC5tYXAuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VuY29kaW5nID09PSBUSFJFRS5MaW5lYXJFbmNvZGluZykge1xuICAgICAgICBtdGwuY29sb3IuY29udmVydExpbmVhclRvU1JHQigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRlcmlhbDtcbiAgfVxuXG4gIHByaXZhdGUgX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMoXG4gICAgb3JpZ2luYWxNYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwsXG4gICAgdnJtUHJvcHM6IFZSTVNjaGVtYS5NYXRlcmlhbCxcbiAgICBnbHRmOiBHTFRGLFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhc2tMaXN0OiBBcnJheTxQcm9taXNlPGFueT4+ID0gW107XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIC8vIGV4dHJhY3QgdGV4dHVyZSBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLl9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlSW5kZXggPSB2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllc1tuYW1lXTtcblxuICAgICAgICB0YXNrTGlzdC5wdXNoKFxuICAgICAgICAgIGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ3RleHR1cmUnLCB0ZXh0dXJlSW5kZXgpLnRoZW4oKHRleHR1cmU6IFRIUkVFLlRleHR1cmUpID0+IHtcbiAgICAgICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IHRleHR1cmU7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCBmbG9hdCBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLmZsb2F0UHJvcGVydGllcykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHZybVByb3BzLmZsb2F0UHJvcGVydGllcykpIHtcbiAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRoaXMuX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG4gICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IHZybVByb3BzLmZsb2F0UHJvcGVydGllc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYWN0IHZlY3RvciAoY29sb3IgdGJoKSBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLnZlY3RvclByb3BlcnRpZXMpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyh2cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzKSkge1xuICAgICAgICBsZXQgbmV3TmFtZSA9IHRoaXMuX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG5cbiAgICAgICAgLy8gaWYgdGhpcyBpcyB0ZXh0dXJlU1QgKHNhbWUgbmFtZSBhcyB0ZXh0dXJlIG5hbWUgaXRzZWxmKSwgYWRkICdfU1QnXG4gICAgICAgIGNvbnN0IGlzVGV4dHVyZVNUID0gW1xuICAgICAgICAgICdfTWFpblRleCcsXG4gICAgICAgICAgJ19TaGFkZVRleHR1cmUnLFxuICAgICAgICAgICdfQnVtcE1hcCcsXG4gICAgICAgICAgJ19SZWNlaXZlU2hhZG93VGV4dHVyZScsXG4gICAgICAgICAgJ19TaGFkaW5nR3JhZGVUZXh0dXJlJyxcbiAgICAgICAgICAnX1JpbVRleHR1cmUnLFxuICAgICAgICAgICdfU3BoZXJlQWRkJyxcbiAgICAgICAgICAnX0VtaXNzaW9uTWFwJyxcbiAgICAgICAgICAnX091dGxpbmVXaWR0aFRleHR1cmUnLFxuICAgICAgICAgICdfVXZBbmltTWFza1RleHR1cmUnLFxuICAgICAgICBdLnNvbWUoKHRleHR1cmVOYW1lKSA9PiBuYW1lID09PSB0ZXh0dXJlTmFtZSk7XG4gICAgICAgIGlmIChpc1RleHR1cmVTVCkge1xuICAgICAgICAgIG5ld05hbWUgKz0gJ19TVCc7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSBuZXcgVEhSRUUuVmVjdG9yNCguLi52cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzW25hbWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgd2hldGhlciBpdCBuZWVkcyBza2lubmluZyBhbmQgbW9ycGhpbmcgb3Igbm90XG4gICAgcGFyYW1zLnNraW5uaW5nID0gKG9yaWdpbmFsTWF0ZXJpYWwgYXMgYW55KS5za2lubmluZyB8fCBmYWxzZTtcbiAgICBwYXJhbXMubW9ycGhUYXJnZXRzID0gKG9yaWdpbmFsTWF0ZXJpYWwgYXMgYW55KS5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1zLm1vcnBoTm9ybWFscyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRhc2tMaXN0KS50aGVuKCgpID0+IHBhcmFtcyk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTU1ldGEgfSBmcm9tICcuL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNTWV0YUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4vVlJNTWV0YUltcG9ydGVyT3B0aW9ucyc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTU1ldGF9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTU1ldGFJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCB0ZXh0dXJlICh7QGxpbmsgVlJNTWV0YS50ZXh0dXJlfSkuIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBpZ25vcmVUZXh0dXJlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zKSB7XG4gICAgdGhpcy5pZ25vcmVUZXh0dXJlID0gb3B0aW9ucz8uaWdub3JlVGV4dHVyZSA/PyBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YTogVlJNU2NoZW1hLk1ldGEgfCB1bmRlZmluZWQgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCB0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXRoaXMuaWdub3JlVGV4dHVyZSAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT0gbnVsbCAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT09IC0xKSB7XG4gICAgICB0ZXh0dXJlID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHNjaGVtYU1ldGEudGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBNYXRyaXg0LmludmVydCgpYCAvIGBNYXRyaXg0LmdldEludmVyc2UoKWAuXG4gKiBgTWF0cml4NC5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgTWF0cml4NC5nZXRJbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IG1hdHJpeFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuTWF0cml4ND4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5nZXRJbnZlcnNlKF9tYXRBLmNvcHkodGFyZ2V0KSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4vbWF0NEludmVydENvbXBhdCc7XG5cbmV4cG9ydCBjbGFzcyBNYXRyaXg0SW52ZXJzZUNhY2hlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0cml4LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdHJpeDogVEhSRUUuTWF0cml4NDtcblxuICAvKipcbiAgICogQSBjYWNoZSBvZiBpbnZlcnNlIG9mIGN1cnJlbnQgbWF0cml4LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW52ZXJzZUNhY2hlID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogQSBmbGFnIHRoYXQgbWFrZXMgaXQgd2FudCB0byByZWNhbGN1bGF0ZSBpdHMge0BsaW5rIF9pbnZlcnNlQ2FjaGV9LlxuICAgKiBXaWxsIGJlIHNldCBgdHJ1ZWAgd2hlbiBgZWxlbWVudHNgIGFyZSBtdXRhdGVkIGFuZCBiZSB1c2VkIGluIGBnZXRJbnZlcnNlYC5cbiAgICovXG4gIHByaXZhdGUgX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luYWwgb2YgYG1hdHJpeC5lbGVtZW50c2BcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29yaWdpbmFsRWxlbWVudHM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBJbnZlcnNlIG9mIGdpdmVuIG1hdHJpeC5cbiAgICogTm90ZSB0aGF0IGl0IHdpbGwgcmV0dXJuIGl0cyBpbnRlcm5hbCBwcml2YXRlIGluc3RhbmNlLlxuICAgKiBNYWtlIHN1cmUgY29weWluZyB0aGlzIGJlZm9yZSBtdXRhdGUgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW52ZXJzZSgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSkge1xuICAgICAgbWF0NEludmVydENvbXBhdCh0aGlzLl9pbnZlcnNlQ2FjaGUuY29weSh0aGlzLm1hdHJpeCkpO1xuICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbnZlcnNlQ2FjaGU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IobWF0cml4OiBUSFJFRS5NYXRyaXg0KSB7XG4gICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG5cbiAgICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8bnVtYmVyW10+ID0ge1xuICAgICAgc2V0OiAob2JqLCBwcm9wOiBudW1iZXIsIG5ld1ZhbCkgPT4ge1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcbiAgICAgICAgb2JqW3Byb3BdID0gbmV3VmFsO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdGhpcy5fb3JpZ2luYWxFbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcbiAgICBtYXRyaXguZWxlbWVudHMgPSBuZXcgUHJveHkobWF0cml4LmVsZW1lbnRzLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnQoKTogdm9pZCB7XG4gICAgdGhpcy5tYXRyaXguZWxlbWVudHMgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBtYXQ0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvbWF0NEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBNYXRyaXg0SW52ZXJzZUNhY2hlIH0gZnJvbSAnLi4vdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuLy8gYmFzZWQgb25cbi8vIGh0dHA6Ly9yb2NrZXRqdW1wLnNrci5qcC91bml0eTNkLzEwOS9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzXG5cbmNvbnN0IElERU5USVRZX01BVFJJWDQgPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuY29uc3QgSURFTlRJVFlfUVVBVEVSTklPTiA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLlF1YXRlcm5pb24oKSk7XG5cbi8vIOioiOeul+S4reOBruS4gOaZguS/neWtmOeUqOWkieaVsO+8iOS4gOW6puOCpOODs+OCueOCv+ODs+OCueOCkuS9nOOBo+OBn+OCieOBguOBqOOBr+S9v+OBhOWbnuOBme+8iVxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9tYXRBID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcbmNvbnN0IF9tYXRCID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgc3ByaW5nIGJvbmUgb2YgYSBWUk0uXG4gKiBJdCBzaG91bGQgYmUgbWFuYWdlZCBieSBhIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmUge1xuICAvKipcbiAgICogUmFkaXVzIG9mIHRoZSBib25lLCB3aWxsIGJlIHVzZWQgZm9yIGNvbGxpc2lvbi5cbiAgICovXG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcblxuICAvKipcbiAgICogU3RpZmZuZXNzIGZvcmNlIG9mIHRoZSBib25lLiBJbmNyZWFzaW5nIHRoZSB2YWx1ZSA9IGZhc3RlciBjb252ZXJnZW5jZSAoZmVlbHMgXCJoYXJkZXJcIikuXG4gICAqIE9uIFVuaVZSTSwgaXRzIHJhbmdlIG9uIEdVSSBpcyBiZXR3ZWVuIGAwLjBgIGFuZCBgNC4wYCAuXG4gICAqL1xuICBwdWJsaWMgc3RpZmZuZXNzRm9yY2U6IG51bWJlcjtcblxuICAvKipcbiAgICogUG93ZXIgb2YgdGhlIGdyYXZpdHkgYWdhaW5zdCB0aGlzIGJvbmUuXG4gICAqIFRoZSBcInBvd2VyXCIgdXNlZCBpbiBoZXJlIGlzIHZlcnkgZmFyIGZyb20gc2NpZW50aWZpYyBwaHlzaWNzIHRlcm0uLi5cbiAgICovXG4gIHB1YmxpYyBncmF2aXR5UG93ZXI6IG51bWJlcjtcblxuICAvKipcbiAgICogRGlyZWN0aW9uIG9mIHRoZSBncmF2aXR5IGFnYWluc3QgdGhpcyBib25lLlxuICAgKiBVc3VhbGx5IGl0IHNob3VsZCBiZSBub3JtYWxpemVkLlxuICAgKi9cbiAgcHVibGljIGdyYXZpdHlEaXI6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIERyYWcgZm9yY2Ugb2YgdGhlIGJvbmUuIEluY3JlYXNpbmcgdGhlIHZhbHVlID0gbGVzcyBvc2NpbGxhdGlvbiAoZmVlbHMgXCJoZWF2aWVyXCIpLlxuICAgKiBPbiBVbmlWUk0sIGl0cyByYW5nZSBvbiBHVUkgaXMgYmV0d2VlbiBgMC4wYCBhbmQgYDEuMGAgLlxuICAgKi9cbiAgcHVibGljIGRyYWdGb3JjZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDb2xsaWRlciBncm91cHMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIGNvbGxpZGVyczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaFtdO1xuXG4gIC8qKlxuICAgKiBBbiBPYmplY3QzRCBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYm9uZTogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gd29ybGQgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogUHJldmlvdXMgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gd29ybGQgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgX3ByZXZUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogTmV4dCBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiB3b3JsZCB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICogQWN0dWFsbHkgdXNlZCBvbmx5IGluIFtbdXBkYXRlXV0gYW5kIGl0J3Mga2luZCBvZiB0ZW1wb3JhcnkgdmFyaWFibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX25leHRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBheGlzIG9mIHRoZSBib25lLCBpbiBsb2NhbCB1bml0LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9ib25lQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIExlbmd0aCBvZiB0aGUgYm9uZSBpbiByZWxhdGl2ZSBzcGFjZSB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIG5vcm1hbGl6YXRpb24gaW4gdXBkYXRlIGxvb3AuXG4gICAqIEl0J3Mgc2FtZSBhcyBsb2NhbCB1bml0IGxlbmd0aCB1bmxlc3MgdGhlcmUgYXJlIHNjYWxlIHRyYW5zZm9ybWF0aW9uIGluIHdvcmxkIG1hdHJpeC5cbiAgICovXG4gIHByb3RlY3RlZCBfY2VudGVyU3BhY2VCb25lTGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIG9mIHRoaXMgYm9uZSBpbiByZWxhdGl2ZSBzcGFjZSwga2luZCBvZiBhIHRlbXBvcmFyeSB2YXJpYWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBfY2VudGVyU3BhY2VQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIHNwYWNlIHJlbGF0aXZlIGZyb20gdGhpcyBvYmplY3QuXG4gICAqIElmIHRoaXMgaXMgYG51bGxgLCBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBpbiB3b3JsZCBzcGFjZS5cbiAgICovXG4gIHByb3RlY3RlZCBfY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZ2V0IGNlbnRlcigpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XG4gIH1cbiAgcHVibGljIHNldCBjZW50ZXIoY2VudGVyOiBUSFJFRS5PYmplY3QzRCB8IG51bGwpIHtcbiAgICAvLyBjb252ZXJ0IHRhaWxzIHRvIHdvcmxkIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4Q2VudGVyVG9Xb3JsZChfbWF0QSk7XG5cbiAgICB0aGlzLl9jdXJyZW50VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fbmV4dFRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcblxuICAgIC8vIHVuaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcj8udXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkucmV2ZXJ0KCk7XG4gICAgICBkZWxldGUgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5O1xuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgY2VudGVyXG4gICAgdGhpcy5fY2VudGVyID0gY2VudGVyO1xuXG4gICAgLy8gaW5zdGFsbCBpbnZlcnNlIGNhY2hlXG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgaWYgKCF0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcbiAgICAgICAgdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5ID0gbmV3IE1hdHJpeDRJbnZlcnNlQ2FjaGUodGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IHRhaWxzIHRvIGNlbnRlciBzcGFjZVxuICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xuXG4gICAgdGhpcy5fY3VycmVudFRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIHRoaXMuX25leHRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG5cbiAgICAvLyBjb252ZXJ0IGNlbnRlciBzcGFjZSBkZXBlbmRhbnQgc3RhdGVcbiAgICBfbWF0QS5tdWx0aXBseSh0aGlzLmJvbmUubWF0cml4V29ybGQpOyAvLyDwn5SlID8/XG5cbiAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbihfbWF0QSk7XG5cbiAgICB0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGggPSBfdjNBXG4gICAgICAuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKVxuICAgICAgLmFwcGx5TWF0cml4NChfbWF0QSlcbiAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgIC5sZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGlvbiBvZiBwYXJlbnQgYm9uZSwgaW4gd29ybGQgdW5pdC5cbiAgICogV2Ugc2hvdWxkIHVwZGF0ZSB0aGlzIGNvbnN0YW50bHkgaW4gW1t1cGRhdGVdXS5cbiAgICovXG4gIHByaXZhdGUgX3BhcmVudFdvcmxkUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBsb2NhbCBtYXRyaXggb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSByb3RhdGlvbiBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcG9zaXRpb24gb2YgaXRzIGNoaWxkLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1TcHJpbmdCb25lLlxuICAgKlxuICAgKiBAcGFyYW0gYm9uZSBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBib25lXG4gICAqIEBwYXJhbSBwYXJhbXMgU2V2ZXJhbCBwYXJhbWV0ZXJzIHJlbGF0ZWQgdG8gYmVoYXZpb3Igb2YgdGhlIHNwcmluZyBib25lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihib25lOiBUSFJFRS5PYmplY3QzRCwgcGFyYW1zOiBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgdGhpcy5ib25lID0gYm9uZTsgLy8gdW5pVlJN44Gn44GuIHBhcmVudFxuICAgIHRoaXMuYm9uZS5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7IC8vIHVwZGF0ZeOBq+OCiOOCiuioiOeul+OBleOCjOOCi+OBruOBp3RocmVlLmpz5YaF44Gn44Gu6Ieq5YuV5Yem55CG44Gv5LiN6KaBXG5cbiAgICB0aGlzLnJhZGl1cyA9IHBhcmFtcy5yYWRpdXMgPz8gMC4wMjtcbiAgICB0aGlzLnN0aWZmbmVzc0ZvcmNlID0gcGFyYW1zLnN0aWZmbmVzc0ZvcmNlID8/IDEuMDtcbiAgICB0aGlzLmdyYXZpdHlEaXIgPSBwYXJhbXMuZ3Jhdml0eURpclxuICAgICAgPyBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkocGFyYW1zLmdyYXZpdHlEaXIpXG4gICAgICA6IG5ldyBUSFJFRS5WZWN0b3IzKCkuc2V0KDAuMCwgLTEuMCwgMC4wKTtcbiAgICB0aGlzLmdyYXZpdHlQb3dlciA9IHBhcmFtcy5ncmF2aXR5UG93ZXIgPz8gMC4wO1xuICAgIHRoaXMuZHJhZ0ZvcmNlID0gcGFyYW1zLmRyYWdGb3JjZSA/PyAwLjQ7XG4gICAgdGhpcy5jb2xsaWRlcnMgPSBwYXJhbXMuY29sbGlkZXJzID8/IFtdO1xuXG4gICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeC5jb3B5KHRoaXMuYm9uZS5tYXRyaXgpO1xuICAgIHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uLmNvcHkodGhpcy5ib25lLnF1YXRlcm5pb24pO1xuXG4gICAgaWYgKHRoaXMuYm9uZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIOacq+err+OBruODnOODvOODs+OAguWtkOODnOODvOODs+OBjOOBhOOBquOBhOOBn+OCgeOAjOiHquWIhuOBruWwkeOBl+WFiOOAjeOBjOWtkOODnOODvOODs+OBqOOBhOOBhuOBk+OBqOOBq+OBmeOCi1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3MjTDI0NlxuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KHRoaXMuYm9uZS5wb3NpdGlvbikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoMC4wNyk7IC8vIG1hZ2ljIG51bWJlciEgZGVyaXZlcyBmcm9tIG9yaWdpbmFsIHNvdXJjZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaXJzdENoaWxkID0gdGhpcy5ib25lLmNoaWxkcmVuWzBdO1xuICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbi5jb3B5KGZpcnN0Q2hpbGQucG9zaXRpb24pO1xuICAgIH1cblxuICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSk7XG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fbmV4dFRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG5cbiAgICB0aGlzLl9ib25lQXhpcy5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgIHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0FcbiAgICAgIC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pXG4gICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuYm9uZS5tYXRyaXhXb3JsZClcbiAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgIC5sZW5ndGgoKTtcblxuICAgIHRoaXMuY2VudGVyID0gcGFyYW1zLmNlbnRlciA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwgW1tWUk1TcHJpbmdCb25lTWFuYWdlci5yZXNldF1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb24uY29weSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSwgdGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcblxuICAgIC8vIEFwcGx5IHVwZGF0ZWQgcG9zaXRpb24gdG8gdGFpbCBzdGF0ZXNcbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX25leHRUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXIudXBkYXRlXV0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGRlbHRhIDw9IDApIHJldHVybjtcblxuICAgIC8vIOimquOCueODl+ODquODs+OCsOODnOODvOODs+OBruWnv+WLouOBr+W4uOOBq+WkieWMluOBl+OBpuOBhOOCi+OAglxuICAgIC8vIOOBneOCjOOBq+WfuuOBpeOBhOOBpuWHpueQhuebtOWJjeOBq+iHquWIhuOBrndvcmxkTWF0cml444KS5pu05paw44GX44Gm44GK44GPXG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSwgdGhpcy5ib25lLm1hdHJpeCk7XG5cbiAgICBpZiAodGhpcy5ib25lLnBhcmVudCkge1xuICAgICAgLy8gU3ByaW5nQm9uZeOBr+imquOBi+OCiemghuOBq+WHpueQhuOBleOCjOOBpuOBhOOBj+OBn+OCgeOAgVxuICAgICAgLy8g6Kaq44GubWF0cml4V29ybGTjga/mnIDmlrDnirbmhYvjga7liY3mj5Djgad3b3JsZE1hdHJpeOOBi+OCiXF1YXRlcm5pb27jgpLlj5bjgorlh7rjgZnjgIJcbiAgICAgIC8vIOWItumZkOOBr+OBguOCi+OBkeOCjOOBqeOAgeioiOeul+OBr+WwkeOBquOBhOOBruOBp2dldFdvcmxkUXVhdGVybmlvbuOBp+OBr+OBquOBj+OBk+OBruaWueazleOCkuWPluOCi+OAglxuICAgICAgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmJvbmUucGFyZW50LCB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbi5jb3B5KElERU5USVRZX1FVQVRFUk5JT04pO1xuICAgIH1cblxuICAgIC8vIEdldCBib25lIHBvc2l0aW9uIGluIGNlbnRlciBzcGFjZVxuICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xuICAgIF9tYXRBLm11bHRpcGx5KHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7IC8vIPCflKUgPz9cbiAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbihfbWF0QSk7XG5cbiAgICAvLyBHZXQgcGFyZW50IHBvc2l0aW9uIGluIGNlbnRlciBzcGFjZVxuICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEIpO1xuICAgIF9tYXRCLm11bHRpcGx5KHRoaXMuX2dldFBhcmVudE1hdHJpeFdvcmxkKCkpO1xuXG4gICAgLy8gc2V2ZXJhbCBwYXJhbWV0ZXJzXG4gICAgY29uc3Qgc3RpZmZuZXNzID0gdGhpcy5zdGlmZm5lc3NGb3JjZSAqIGRlbHRhO1xuICAgIGNvbnN0IGV4dGVybmFsID0gX3YzQi5jb3B5KHRoaXMuZ3Jhdml0eURpcikubXVsdGlwbHlTY2FsYXIodGhpcy5ncmF2aXR5UG93ZXIgKiBkZWx0YSk7XG5cbiAgICAvLyB2ZXJsZXTnqY3liIbjgafmrKHjga7kvY3nva7jgpLoqIjnrpdcbiAgICB0aGlzLl9uZXh0VGFpbFxuICAgICAgLmNvcHkodGhpcy5fY3VycmVudFRhaWwpXG4gICAgICAuYWRkKFxuICAgICAgICBfdjNBXG4gICAgICAgICAgLmNvcHkodGhpcy5fY3VycmVudFRhaWwpXG4gICAgICAgICAgLnN1Yih0aGlzLl9wcmV2VGFpbClcbiAgICAgICAgICAubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuZHJhZ0ZvcmNlKSxcbiAgICAgICkgLy8g5YmN44OV44Os44O844Og44Gu56e75YuV44KS57aZ57aa44GZ44KLKOa4m+ihsOOCguOBguOCi+OCiClcbiAgICAgIC5hZGQoXG4gICAgICAgIF92M0FcbiAgICAgICAgICAuY29weSh0aGlzLl9ib25lQXhpcylcbiAgICAgICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeClcbiAgICAgICAgICAuYXBwbHlNYXRyaXg0KF9tYXRCKVxuICAgICAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAubXVsdGlwbHlTY2FsYXIoc3RpZmZuZXNzKSxcbiAgICAgICkgLy8g6Kaq44Gu5Zue6Lui44Gr44KI44KL5a2Q44Oc44O844Oz44Gu56e75YuV55uu5qiZXG4gICAgICAuYWRkKGV4dGVybmFsKTsgLy8g5aSW5Yqb44Gr44KI44KL56e75YuV6YePXG5cbiAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICB0aGlzLl9uZXh0VGFpbFxuICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAubXVsdGlwbHlTY2FsYXIodGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoKVxuICAgICAgLmFkZCh0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKTtcblxuICAgIC8vIENvbGxpc2lvbuOBp+enu+WLlVxuICAgIHRoaXMuX2NvbGxpc2lvbih0aGlzLl9uZXh0VGFpbCk7XG5cbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX25leHRUYWlsKTtcblxuICAgIC8vIEFwcGx5IHJvdGF0aW9uLCBjb252ZXJ0IHZlY3RvcjMgdGhpbmcgaW50byBhY3R1YWwgcXVhdGVybmlvblxuICAgIC8vIE9yaWdpbmFsIFVuaVZSTSBpcyBkb2luZyB3b3JsZCB1bml0IGNhbGN1bHVzIGF0IGhlcmUgYnV0IHdlJ3JlIGdvbm5hIGRvIHRoaXMgb24gbG9jYWwgdW5pdFxuICAgIC8vIHNpbmNlIFRocmVlLmpzIGlzIG5vdCBnb29kIGF0IHdvcmxkIGNvb3JkaW5hdGlvbiBzdHVmZlxuICAgIGNvbnN0IGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludiA9IG1hdDRJbnZlcnRDb21wYXQoX21hdEEuY29weShfbWF0Qi5tdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpKSk7XG4gICAgY29uc3QgYXBwbHlSb3RhdGlvbiA9IF9xdWF0QS5zZXRGcm9tVW5pdFZlY3RvcnMoXG4gICAgICB0aGlzLl9ib25lQXhpcyxcbiAgICAgIF92M0EuY29weSh0aGlzLl9uZXh0VGFpbCkuYXBwbHlNYXRyaXg0KGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludikubm9ybWFsaXplKCksXG4gICAgKTtcblxuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pLm11bHRpcGx5KGFwcGx5Um90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX2dldFBhcmVudE1hdHJpeFdvcmxkKCksIHRoaXMuYm9uZS5tYXRyaXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIGNvbGxpc2lvbiBtYXRoIGFnYWluc3QgZXZlcnkgY29sbGlkZXJzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICpcbiAgICogQHBhcmFtIHRhaWwgVGhlIHRhaWwgeW91IHdhbnQgdG8gcHJvY2Vzc1xuICAgKi9cbiAgcHJpdmF0ZSBfY29sbGlzaW9uKHRhaWw6IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG4gICAgICBfbWF0QS5tdWx0aXBseShjb2xsaWRlci5tYXRyaXhXb3JsZCk7XG4gICAgICBjb25zdCBjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24gPSBfdjNBLnNldEZyb21NYXRyaXhQb3NpdGlvbihfbWF0QSk7XG4gICAgICBjb25zdCBjb2xsaWRlclJhZGl1cyA9IGNvbGxpZGVyLmdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlIS5yYWRpdXM7IC8vIHRoZSBib3VuZGluZyBzcGhlcmUgaXMgZ3VhcmFudGVlZCB0byBiZSBleGlzdCBieSBWUk1TcHJpbmdCb25lSW1wb3J0ZXIuX2NyZWF0ZUNvbGxpZGVyTWVzaFxuICAgICAgY29uc3QgciA9IHRoaXMucmFkaXVzICsgY29sbGlkZXJSYWRpdXM7XG5cbiAgICAgIGlmICh0YWlsLmRpc3RhbmNlVG9TcXVhcmVkKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbikgPD0gciAqIHIpIHtcbiAgICAgICAgLy8g44OS44OD44OI44CCQ29sbGlkZXLjga7ljYrlvoTmlrnlkJHjgavmirzjgZflh7rjgZlcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gX3YzQi5zdWJWZWN0b3JzKHRhaWwsIGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgICAgIGNvbnN0IHBvc0Zyb21Db2xsaWRlciA9IF92M0MuYWRkVmVjdG9ycyhjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24sIG5vcm1hbC5tdWx0aXBseVNjYWxhcihyKSk7XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgICAgIHRhaWwuY29weShcbiAgICAgICAgICBwb3NGcm9tQ29sbGlkZXJcbiAgICAgICAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgICAgLm11bHRpcGx5U2NhbGFyKHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aClcbiAgICAgICAgICAgIC5hZGQodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbiksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgY2VudGVyIHNwYWNlIGludG8gd29ybGQgc3BhY2UuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4Q2VudGVyVG9Xb3JsZCh0YXJnZXQ6IFRIUkVFLk1hdHJpeDQpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICB0YXJnZXQuY29weSh0aGlzLl9jZW50ZXIubWF0cml4V29ybGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIHdvcmxkIHNwYWNlIGludG8gY2VudGVyIHNwYWNlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBtYXRyaXhcbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIodGFyZ2V0OiBUSFJFRS5NYXRyaXg0KTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgdGFyZ2V0LmNvcHkoKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5pbnZlcnNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3b3JsZCBtYXRyaXggb2YgaXRzIHBhcmVudCBvYmplY3QuXG4gICAqL1xuICBwcml2YXRlIF9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5ib25lLnBhcmVudCA/IHRoaXMuYm9uZS5wYXJlbnQubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBzcHJpbmcgYm9uZSBncm91cCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IHR5cGUgVlJNU3ByaW5nQm9uZUdyb3VwID0gVlJNU3ByaW5nQm9uZVtdO1xuXG4vKipcbiAqIEEgY2xhc3MgbWFuYWdlcyBldmVyeSBzcHJpbmcgYm9uZXMgb24gYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTWFuYWdlciB7XG4gIHB1YmxpYyByZWFkb25seSBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSA9IFtdO1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZUdyb3VwTGlzdDogVlJNU3ByaW5nQm9uZUdyb3VwW10gPSBbXTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXVxuICAgKlxuICAgKiBAcGFyYW0gc3ByaW5nQm9uZUdyb3VwTGlzdCBBbiBhcnJheSBvZiBbW1ZSTVNwcmluZ0JvbmVHcm91cF1dXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10sIHNwcmluZ0JvbmVHcm91cExpc3Q6IFZSTVNwcmluZ0JvbmVHcm91cFtdKSB7XG4gICAgdGhpcy5jb2xsaWRlckdyb3VwcyA9IGNvbGxpZGVyR3JvdXBzO1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdCA9IHNwcmluZ0JvbmVHcm91cExpc3Q7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFsbCBib25lcyBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBzcGFjZSByZWxhdGl2ZSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKiBJZiBgbnVsbGAgaXMgZ2l2ZW4sIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKiBAcGFyYW0gcm9vdCBSb290IG9iamVjdCwgb3IgYG51bGxgXG4gICAqL1xuICBwdWJsaWMgc2V0Q2VudGVyKHJvb3Q6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUuY2VudGVyID0gcm9vdDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBzcHJpbmcgYm9uZSBhdHRhY2hlZCB0byB0aGlzIG1hbmFnZXIuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyBsYXRlVXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBzcHJpbmdCb25lLnVwZGF0ZShkZWx0YSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBldmVyeSBzcHJpbmcgYm9uZSBhdHRhY2hlZCB0byB0aGlzIG1hbmFnZXIuXG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goKHNwcmluZ0JvbmVHcm91cCkgPT4ge1xuICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgICAgc3ByaW5nQm9uZS5yZXNldCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IEdMVEZOb2RlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwLCBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lR3JvdXAsIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgX2NvbGxpZGVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyB2aXNpYmxlOiBmYWxzZSB9KTtcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNTG9va0F0SGVhZF1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb246IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb24gfCB1bmRlZmluZWQgPSB2cm1FeHQuc2Vjb25kYXJ5QW5pbWF0aW9uO1xuICAgIGlmICghc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIOihneeqgeWIpOWumueQg+S9k+ODoeODg+OCt+ODpeOAglxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gYXdhaXQgdGhpcy5faW1wb3J0Q29sbGlkZXJNZXNoR3JvdXBzKGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbik7XG5cbiAgICAvLyDlkIzjgZjlsZ7mgKfvvIhzdGlmZmluZXNz44KEZHJhZ0ZvcmNl44GM5ZCM44GY77yJ44Gu44Oc44O844Oz44GvYm9uZUdyb3Vw44Gr44G+44Go44KB44KJ44KM44Gm44GE44KL44CCXG4gICAgLy8g5LiA5YiX44Gg44GR44Gn44Gv44Gq44GE44GT44Go44Gr5rOo5oSP44CCXG4gICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwTGlzdCA9IGF3YWl0IHRoaXMuX2ltcG9ydFNwcmluZ0JvbmVHcm91cExpc3QoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLCBjb2xsaWRlckdyb3Vwcyk7XG5cbiAgICByZXR1cm4gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlU3ByaW5nQm9uZShib25lOiBUSFJFRS5PYmplY3QzRCwgcGFyYW1zOiBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyA9IHt9KTogVlJNU3ByaW5nQm9uZSB7XG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lKGJvbmUsIHBhcmFtcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydFNwcmluZ0JvbmVHcm91cExpc3QoXG4gICAgZ2x0ZjogR0xURixcbiAgICBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb246IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb24sXG4gICAgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10sXG4gICk6IFByb21pc2U8VlJNU3ByaW5nQm9uZUdyb3VwW10+IHtcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBzOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nW10gPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24uYm9uZUdyb3VwcyB8fCBbXTtcblxuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cExpc3Q6IFZSTVNwcmluZ0JvbmVHcm91cFtdID0gW107XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHNwcmluZ0JvbmVHcm91cHMubWFwKGFzeW5jICh2cm1Cb25lR3JvdXApID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZybUJvbmVHcm91cC5zdGlmZmluZXNzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlQb3dlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmRyYWdGb3JjZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmhpdFJhZGl1cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuYm9uZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5jZW50ZXIgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGlmZm5lc3NGb3JjZSA9IHZybUJvbmVHcm91cC5zdGlmZmluZXNzO1xuICAgICAgICBjb25zdCBncmF2aXR5RGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueCxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci55LFxuICAgICAgICAgIC12cm1Cb25lR3JvdXAuZ3Jhdml0eURpci56LCAvLyBWUk0gMC4wIHVzZXMgbGVmdC1oYW5kZWQgeS11cFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBncmF2aXR5UG93ZXIgPSB2cm1Cb25lR3JvdXAuZ3Jhdml0eVBvd2VyO1xuICAgICAgICBjb25zdCBkcmFnRm9yY2UgPSB2cm1Cb25lR3JvdXAuZHJhZ0ZvcmNlO1xuICAgICAgICBjb25zdCByYWRpdXMgPSB2cm1Cb25lR3JvdXAuaGl0UmFkaXVzO1xuXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaFtdID0gW107XG4gICAgICAgIHZybUJvbmVHcm91cC5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckluZGV4KSA9PiB7XG4gICAgICAgICAgY29sbGlkZXJzLnB1c2goLi4uY29sbGlkZXJHcm91cHNbY29sbGlkZXJJbmRleF0uY29sbGlkZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwOiBWUk1TcHJpbmdCb25lR3JvdXAgPSBbXTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmJvbmVzLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyBWUk3jga7mg4XloLHjgYvjgonjgIzmj7rjgozjg6Ljg47jgI3jg5zjg7zjg7Pjga7jg6vjg7zjg4jjgYzlj5bjgozjgotcbiAgICAgICAgICAgIGNvbnN0IHNwcmluZ1Jvb3RCb25lOiBHTFRGTm9kZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBub2RlSW5kZXgpO1xuXG4gICAgICAgICAgICBjb25zdCBjZW50ZXI6IEdMVEZOb2RlID1cbiAgICAgICAgICAgICAgdnJtQm9uZUdyb3VwLmNlbnRlciEgIT09IC0xID8gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIHZybUJvbmVHcm91cC5jZW50ZXIhKSA6IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGl0J3Mgd2VpcmQgYnV0IHRoZXJlIG1pZ2h0IGJlIGNhc2VzIHdlIGNhbid0IGZpbmQgdGhlIHJvb3QgYm9uZVxuICAgICAgICAgICAgaWYgKCFzcHJpbmdSb290Qm9uZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwcmluZ1Jvb3RCb25lLnRyYXZlcnNlKChib25lKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9jcmVhdGVTcHJpbmdCb25lKGJvbmUsIHtcbiAgICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgICAgc3RpZmZuZXNzRm9yY2UsXG4gICAgICAgICAgICAgICAgZ3Jhdml0eURpcixcbiAgICAgICAgICAgICAgICBncmF2aXR5UG93ZXIsXG4gICAgICAgICAgICAgICAgZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgICAgIGNvbGxpZGVycyxcbiAgICAgICAgICAgICAgICBjZW50ZXIsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzcHJpbmdCb25lR3JvdXAucHVzaChzcHJpbmdCb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIHNwcmluZ0JvbmVHcm91cExpc3QucHVzaChzcHJpbmdCb25lR3JvdXApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBzcHJpbmdCb25lR3JvdXBMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBhcnJheSBvZiBbW1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwXV0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uIEEgYHNlY29uZGFyeUFuaW1hdGlvbmAgZmllbGQgb2YgVlJNXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyhcbiAgICBnbHRmOiBHTFRGLFxuICAgIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbixcbiAgKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdPiB7XG4gICAgY29uc3QgdnJtQ29sbGlkZXJHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24uY29sbGlkZXJHcm91cHM7XG4gICAgaWYgKHZybUNvbGxpZGVyR3JvdXBzID09PSB1bmRlZmluZWQpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW107XG4gICAgdnJtQ29sbGlkZXJHcm91cHMuZm9yRWFjaChhc3luYyAoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgaWYgKGNvbGxpZGVyR3JvdXAubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBib25lID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGNvbGxpZGVyR3JvdXAubm9kZSk7XG4gICAgICBjb25zdCBjb2xsaWRlcnM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2hbXSA9IFtdO1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIucmFkaXVzID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gX3YzQS5zZXQoXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LngsXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnksXG4gICAgICAgICAgLWNvbGxpZGVyLm9mZnNldC56LCAvLyBWUk0gMC4wIHVzZXMgbGVmdC1oYW5kZWQgeS11cFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb2xsaWRlck1lc2ggPSB0aGlzLl9jcmVhdGVDb2xsaWRlck1lc2goY29sbGlkZXIucmFkaXVzLCBvZmZzZXQpO1xuXG4gICAgICAgIGJvbmUuYWRkKGNvbGxpZGVyTWVzaCk7XG4gICAgICAgIGNvbGxpZGVycy5wdXNoKGNvbGxpZGVyTWVzaCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY29sbGlkZXJNZXNoR3JvdXAgPSB7XG4gICAgICAgIG5vZGU6IGNvbGxpZGVyR3JvdXAubm9kZSxcbiAgICAgICAgY29sbGlkZXJzLFxuICAgICAgfTtcbiAgICAgIGNvbGxpZGVyR3JvdXBzLnB1c2goY29sbGlkZXJNZXNoR3JvdXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbGxpZGVyR3JvdXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbGxpZGVyIG1lc2guXG4gICAqXG4gICAqIEBwYXJhbSByYWRpdXMgUmFkaXVzIG9mIHRoZSBuZXcgY29sbGlkZXIgbWVzaFxuICAgKiBAcGFyYW0gb2Zmc2V0IE9mZmVzdCBvZiB0aGUgbmV3IGNvbGxpZGVyIG1lc2hcbiAgICovXG4gIHByb3RlY3RlZCBfY3JlYXRlQ29sbGlkZXJNZXNoKHJhZGl1czogbnVtYmVyLCBvZmZzZXQ6IFRIUkVFLlZlY3RvcjMpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoIHtcbiAgICBjb25zdCBjb2xsaWRlck1lc2ggPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkocmFkaXVzLCA4LCA0KSwgX2NvbGxpZGVyTWF0ZXJpYWwpO1xuXG4gICAgY29sbGlkZXJNZXNoLnBvc2l0aW9uLmNvcHkob2Zmc2V0KTtcblxuICAgIC8vIHRoZSBuYW1lIGhhdmUgdG8gYmUgdGhpcyBpbiBvcmRlciB0byBleGNsdWRlIGNvbGxpZGVycyBmcm9tIGJvdW5kaW5nIGJveFxuICAgIC8vIChTZWUgVmlld2VyLnRzLCBzZWFyY2ggZm9yIGNoaWxkLm5hbWUgPT09ICd2cm1Db2xsaWRlclNwaGVyZScpXG4gICAgY29sbGlkZXJNZXNoLm5hbWUgPSAndnJtQ29sbGlkZXJTcGhlcmUnO1xuXG4gICAgLy8gV2Ugd2lsbCB1c2UgdGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIGZvciBjb2xsaXNpb24gdnMgYm9uZXMuXG4gICAgLy8gYGJvdW5kaW5nU3BoZXJlYCBtdXN0IGJlIGNyZWF0ZWQgdG8gY29tcHV0ZSB0aGUgcmFkaXVzLlxuICAgIGNvbGxpZGVyTWVzaC5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcblxuICAgIHJldHVybiBjb2xsaWRlck1lc2g7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVJbXBvcnRlciB9IGZyb20gJy4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbkltcG9ydGVyIH0gZnJvbSAnLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZEltcG9ydGVyIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZEltcG9ydGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEltcG9ydGVyIH0gZnJvbSAnLi9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNTWF0ZXJpYWxJbXBvcnRlciB9IGZyb20gJy4vbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVlJNTWV0YUltcG9ydGVyIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGFJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIgfSBmcm9tICcuL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZUltcG9ydGVyJztcbmltcG9ydCB7IFZSTSB9IGZyb20gJy4vVlJNJztcblxuZXhwb3J0IGludGVyZmFjZSBWUk1JbXBvcnRlck9wdGlvbnMge1xuICBtZXRhSW1wb3J0ZXI/OiBWUk1NZXRhSW1wb3J0ZXI7XG4gIGxvb2tBdEltcG9ydGVyPzogVlJNTG9va0F0SW1wb3J0ZXI7XG4gIGh1bWFub2lkSW1wb3J0ZXI/OiBWUk1IdW1hbm9pZEltcG9ydGVyO1xuICBibGVuZFNoYXBlSW1wb3J0ZXI/OiBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI7XG4gIGZpcnN0UGVyc29uSW1wb3J0ZXI/OiBWUk1GaXJzdFBlcnNvbkltcG9ydGVyO1xuICBtYXRlcmlhbEltcG9ydGVyPzogVlJNTWF0ZXJpYWxJbXBvcnRlcjtcbiAgc3ByaW5nQm9uZUltcG9ydGVyPzogVlJNU3ByaW5nQm9uZUltcG9ydGVyO1xufVxuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSW1wb3J0ZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX21ldGFJbXBvcnRlcjogVlJNTWV0YUltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JsZW5kU2hhcGVJbXBvcnRlcjogVlJNQmxlbmRTaGFwZUltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2xvb2tBdEltcG9ydGVyOiBWUk1Mb29rQXRJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9odW1hbm9pZEltcG9ydGVyOiBWUk1IdW1hbm9pZEltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpcnN0UGVyc29uSW1wb3J0ZXI6IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbWF0ZXJpYWxJbXBvcnRlcjogVlJNTWF0ZXJpYWxJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zcHJpbmdCb25lSW1wb3J0ZXI6IFZSTVNwcmluZ0JvbmVJbXBvcnRlcjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUltcG9ydGVyLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBbW1ZSTUltcG9ydGVyT3B0aW9uc11dLCBvcHRpb25hbGx5IGNvbnRhaW5zIGltcG9ydGVycyBmb3IgZWFjaCBjb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuX21ldGFJbXBvcnRlciA9IG9wdGlvbnMubWV0YUltcG9ydGVyIHx8IG5ldyBWUk1NZXRhSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9ibGVuZFNoYXBlSW1wb3J0ZXIgPSBvcHRpb25zLmJsZW5kU2hhcGVJbXBvcnRlciB8fCBuZXcgVlJNQmxlbmRTaGFwZUltcG9ydGVyKCk7XG4gICAgdGhpcy5fbG9va0F0SW1wb3J0ZXIgPSBvcHRpb25zLmxvb2tBdEltcG9ydGVyIHx8IG5ldyBWUk1Mb29rQXRJbXBvcnRlcigpO1xuICAgIHRoaXMuX2h1bWFub2lkSW1wb3J0ZXIgPSBvcHRpb25zLmh1bWFub2lkSW1wb3J0ZXIgfHwgbmV3IFZSTUh1bWFub2lkSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkltcG9ydGVyID0gb3B0aW9ucy5maXJzdFBlcnNvbkltcG9ydGVyIHx8IG5ldyBWUk1GaXJzdFBlcnNvbkltcG9ydGVyKCk7XG4gICAgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlciA9IG9wdGlvbnMubWF0ZXJpYWxJbXBvcnRlciB8fCBuZXcgVlJNTWF0ZXJpYWxJbXBvcnRlcigpO1xuICAgIHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlciA9IG9wdGlvbnMuc3ByaW5nQm9uZUltcG9ydGVyIHx8IG5ldyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNlaXZlIGEgR0xURiBvYmplY3QgcmV0cmlldmVkIGZyb20gYFRIUkVFLkdMVEZMb2FkZXJgIGFuZCBjcmVhdGUgYSBuZXcgW1tWUk1dXSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTT4ge1xuICAgIGlmIChnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgPT09IHVuZGVmaW5lZCB8fCBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgVlJNIGV4dGVuc2lvbiBvbiB0aGUgR0xURicpO1xuICAgIH1cbiAgICBjb25zdCBzY2VuZSA9IGdsdGYuc2NlbmU7XG5cbiAgICBzY2VuZS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XG5cbiAgICAvLyBTa2lubmVkIG9iamVjdCBzaG91bGQgbm90IGJlIGZydXN0dW1DdWxsZWRcbiAgICAvLyBTaW5jZSBwcmUtc2tpbm5lZCBwb3NpdGlvbiBtaWdodCBiZSBvdXRzaWRlIG9mIHZpZXdcbiAgICBzY2VuZS50cmF2ZXJzZSgob2JqZWN0M2QpID0+IHtcbiAgICAgIGlmICgob2JqZWN0M2QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWV0YSA9IChhd2FpdCB0aGlzLl9tZXRhSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtYXRlcmlhbHMgPSAoYXdhaXQgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaHVtYW5vaWQgPSAoYXdhaXQgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGZpcnN0UGVyc29uID0gaHVtYW5vaWQgPyAoYXdhaXQgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSAoYXdhaXQgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbG9va0F0ID1cbiAgICAgIGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZFxuICAgICAgICA/IChhd2FpdCB0aGlzLl9sb29rQXRJbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBzcHJpbmdCb25lTWFuYWdlciA9IChhd2FpdCB0aGlzLl9zcHJpbmdCb25lSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gbmV3IFZSTSh7XG4gICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgIG1ldGEsXG4gICAgICBtYXRlcmlhbHMsXG4gICAgICBodW1hbm9pZCxcbiAgICAgIGZpcnN0UGVyc29uLFxuICAgICAgYmxlbmRTaGFwZVByb3h5LFxuICAgICAgbG9va0F0LFxuICAgICAgc3ByaW5nQm9uZU1hbmFnZXIsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuL2xvb2thdCc7XG5pbXBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL3NwcmluZ2JvbmUnO1xuaW1wb3J0IHsgZGVlcERpc3Bvc2UgfSBmcm9tICcuL3V0aWxzL2Rpc3Bvc2VyJztcbmltcG9ydCB7IFZSTUltcG9ydGVyLCBWUk1JbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuL1ZSTUltcG9ydGVyJztcblxuLyoqXG4gKiBQYXJhbWV0ZXJzIGZvciBhIFtbVlJNXV0gY2xhc3MuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVlJNUGFyYW1ldGVycyB7XG4gIHNjZW5lOiBUSFJFRS5TY2VuZSB8IFRIUkVFLkdyb3VwOyAvLyBDT01QQVQ6IGBHTFRGLnNjZW5lYCBpcyBnb2luZyB0byBiZSBgVEhSRUUuR3JvdXBgIGluIHIxMTRcbiAgaHVtYW5vaWQ/OiBWUk1IdW1hbm9pZDtcbiAgYmxlbmRTaGFwZVByb3h5PzogVlJNQmxlbmRTaGFwZVByb3h5O1xuICBmaXJzdFBlcnNvbj86IFZSTUZpcnN0UGVyc29uO1xuICBsb29rQXQ/OiBWUk1Mb29rQXRIZWFkO1xuICBtYXRlcmlhbHM/OiBUSFJFRS5NYXRlcmlhbFtdO1xuICBzcHJpbmdCb25lTWFuYWdlcj86IFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xuICBtZXRhPzogVlJNTWV0YTtcbn1cblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKiBTZWUgdGhlIGRvY3VtZW50YXRpb24gb2YgW1tWUk0uZnJvbV1dIGZvciB0aGUgbW9zdCBiYXNpYyB1c2Ugb2YgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gZnJvbSBhIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXIuXG4gICAqIEl0J3MgcHJvYmFibHkgYSB0aGluZyB3aGF0IHlvdSB3YW50IHRvIGdldCBzdGFydGVkIHdpdGggVlJNcy5cbiAgICpcbiAgICogQGV4YW1wbGUgTW9zdCBiYXNpYyB1c2Ugb2YgVlJNXG4gICAqIGBgYFxuICAgKiBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgKlxuICAgKiBuZXcgVEhSRUUuR0xURkxvYWRlcigpLmxvYWQoICdtb2RlbHMvdGhyZWUtdnJtLWdpcmwudnJtJywgKCBnbHRmICkgPT4ge1xuICAgKlxuICAgKiAgIFRIUkVFLlZSTS5mcm9tKCBnbHRmICkudGhlbiggKCB2cm0gKSA9PiB7XG4gICAqXG4gICAqICAgICBzY2VuZS5hZGQoIHZybS5zY2VuZSApO1xuICAgKlxuICAgKiAgIH0gKTtcbiAgICpcbiAgICogfSApO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gaW1wb3J0ZXJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZnJvbShnbHRmOiBHTFRGLCBvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSk6IFByb21pc2U8VlJNPiB7XG4gICAgY29uc3QgaW1wb3J0ZXIgPSBuZXcgVlJNSW1wb3J0ZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIGF3YWl0IGltcG9ydGVyLmltcG9ydChnbHRmKTtcbiAgfVxuICAvKipcbiAgICogYFRIUkVFLlNjZW5lYCBvciBgVEhSRUUuR3JvdXBgIChkZXBlbmRzIG9uIHlvdXIgdGhyZWUuanMgcmV2aXNpb24pIHRoYXQgY29udGFpbnMgdGhlIGVudGlyZSBWUk0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFRIUkVFLlNjZW5lIHwgVEhSRUUuR3JvdXA7IC8vIENPTVBBVDogYEdMVEYuc2NlbmVgIGlzIGdvaW5nIHRvIGJlIGBUSFJFRS5Hcm91cGAgaW4gcjExNFxuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUh1bWFub2lkXV0gb2YgdGhlIFZSTS5cbiAgICogWW91IGNhbiBjb250cm9sIGVhY2ggYm9uZXMgdXNpbmcgW1tWUk1IdW1hbm9pZC5nZXRCb25lTm9kZV1dLlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ/OiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1CbGVuZFNoYXBlUHJveHldXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjb250cm9sIHRoZXNlIGZhY2lhbCBleHByZXNzaW9ucyB2aWEgW1tWUk1CbGVuZFNoYXBlUHJveHkuc2V0VmFsdWVdXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBibGVuZFNoYXBlUHJveHk/OiBWUk1CbGVuZFNoYXBlUHJveHk7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNRmlyc3RQZXJzb25dXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIHVzZSB2YXJpb3VzIGZlYXR1cmUgb2YgdGhlIGZpcnN0UGVyc29uIGZpZWxkLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uPzogVlJNRmlyc3RQZXJzb247XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNTG9va0F0SGVhZF1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSBbW1ZSTUxvb2tBdEhlYWQudGFyZ2V0XV0gdG8gY29udHJvbCB0aGUgZXllIGRpcmVjdGlvbiBvZiB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbG9va0F0PzogVlJNTG9va0F0SGVhZDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWF0ZXJpYWxzIG9mIHRoZSBWUk0uXG4gICAqIGB1cGRhdGVWUk1NYXRlcmlhbHNgIG1ldGhvZCBvZiB0aGVzZSBtYXRlcmlhbHMgd2lsbCBiZSBjYWxsZWQgdmlhIGl0cyBbW1ZSTS51cGRhdGVdXSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWxzPzogVEhSRUUuTWF0ZXJpYWxbXTtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YT86IFZSTU1ldGE7XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dIG1hbmlwdWxhdGVzIGFsbCBzcHJpbmcgYm9uZXMgYXR0YWNoZWQgb24gdGhlIFZSTS5cbiAgICogVXN1YWxseSB5b3UgZG9uJ3QgaGF2ZSB0byBjYXJlIGFib3V0IHRoaXMgcHJvcGVydHkuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZU1hbmFnZXI/OiBWUk1TcHJpbmdCb25lTWFuYWdlcjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBbW1ZSTVBhcmFtZXRlcnNdXSB0aGF0IHJlcHJlc2VudHMgY29tcG9uZW50cyBvZiB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiBWUk1QYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5zY2VuZSA9IHBhcmFtcy5zY2VuZTtcbiAgICB0aGlzLmh1bWFub2lkID0gcGFyYW1zLmh1bWFub2lkO1xuICAgIHRoaXMuYmxlbmRTaGFwZVByb3h5ID0gcGFyYW1zLmJsZW5kU2hhcGVQcm94eTtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xuICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcbiAgICB0aGlzLm1hdGVyaWFscyA9IHBhcmFtcy5tYXRlcmlhbHM7XG4gICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlciA9IHBhcmFtcy5zcHJpbmdCb25lTWFuYWdlcjtcbiAgICB0aGlzLm1ldGEgPSBwYXJhbXMubWV0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9va0F0KSB7XG4gICAgICB0aGlzLmxvb2tBdC51cGRhdGUoZGVsdGEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJsZW5kU2hhcGVQcm94eSkge1xuICAgICAgdGhpcy5ibGVuZFNoYXBlUHJveHkudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIpIHtcbiAgICAgIHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIubGF0ZVVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF0ZXJpYWxzKSB7XG4gICAgICB0aGlzLm1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbDogYW55KSA9PiB7XG4gICAgICAgIGlmIChtYXRlcmlhbC51cGRhdGVWUk1NYXRlcmlhbHMpIHtcbiAgICAgICAgICBtYXRlcmlhbC51cGRhdGVWUk1NYXRlcmlhbHMoZGVsdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSBldmVyeXRoaW5nIGFib3V0IHRoZSBWUk0gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XG4gICAgaWYgKHNjZW5lKSB7XG4gICAgICBkZWVwRGlzcG9zZShzY2VuZSk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXRhPy50ZXh0dXJlPy5kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTSB9IGZyb20gJy4uL1ZSTSc7XG5cbmNvbnN0IF92MkEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5jb25zdCBfY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgLTEsIDEsIC0xLCAxKTtcbmNvbnN0IF9tYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiwgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcbmNvbnN0IF9wbGFuZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLCBfbWF0ZXJpYWwpO1xuY29uc3QgX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5fc2NlbmUuYWRkKF9wbGFuZSk7XG5cbi8qKlxuICogRXh0cmFjdCBhIHRodW1ibmFpbCBpbWFnZSBibG9iIGZyb20gYSB7QGxpbmsgVlJNfS5cbiAqIElmIHRoZSB2cm0gZG9lcyBub3QgaGF2ZSBhIHRodW1ibmFpbCwgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAqIEBwYXJhbSByZW5kZXJlciBSZW5kZXJlclxuICogQHBhcmFtIHZybSBWUk0gd2l0aCBhIHRodW1ibmFpbFxuICogQHBhcmFtIHNpemUgd2lkdGggLyBoZWlnaHQgb2YgdGhlIGltYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0VGh1bWJuYWlsQmxvYihyZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgdnJtOiBWUk0sIHNpemUgPSA1MTIpOiBQcm9taXNlPEJsb2I+IHtcbiAgLy8gZ2V0IHRoZSB0ZXh0dXJlXG4gIGNvbnN0IHRleHR1cmUgPSB2cm0ubWV0YT8udGV4dHVyZTtcbiAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdleHRyYWN0VGh1bWJuYWlsQmxvYjogVGhpcyBWUk0gZG9lcyBub3QgaGF2ZSBhIHRodW1ibmFpbCcpO1xuICB9XG5cbiAgY29uc3QgY2FudmFzID0gcmVuZGVyZXIuZ2V0Q29udGV4dCgpLmNhbnZhcztcblxuICAvLyBzdG9yZSB0aGUgY3VycmVudCByZXNvbHV0aW9uXG4gIHJlbmRlcmVyLmdldFNpemUoX3YyQSk7XG4gIGNvbnN0IHByZXZXaWR0aCA9IF92MkEueDtcbiAgY29uc3QgcHJldkhlaWdodCA9IF92MkEueTtcblxuICAvLyBvdmVyd3JpdGUgdGhlIHJlc29sdXRpb25cbiAgcmVuZGVyZXIuc2V0U2l6ZShzaXplLCBzaXplLCBmYWxzZSk7XG5cbiAgLy8gYXNzaWduIHRoZSB0ZXh0dXJlIHRvIHBsYW5lXG4gIF9tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuXG4gIC8vIHJlbmRlclxuICByZW5kZXJlci5yZW5kZXIoX3NjZW5lLCBfY2FtZXJhKTtcblxuICAvLyB1bmFzc2lnbiB0aGUgdGV4dHVyZVxuICBfbWF0ZXJpYWwubWFwID0gbnVsbDtcblxuICAvLyBnZXQgYmxvYlxuICBpZiAoY2FudmFzIGluc3RhbmNlb2YgT2Zmc2NyZWVuQ2FudmFzKSB7XG4gICAgcmV0dXJuIGNhbnZhcy5jb252ZXJ0VG9CbG9iKCkuZmluYWxseSgoKSA9PiB7XG4gICAgICAvLyByZXZlcnQgdG8gcHJldmlvdXMgcmVzb2x1dGlvblxuICAgICAgcmVuZGVyZXIuc2V0U2l6ZShwcmV2V2lkdGgsIHByZXZIZWlnaHQsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY2FudmFzLnRvQmxvYigoYmxvYikgPT4ge1xuICAgICAgLy8gcmV2ZXJ0IHRvIHByZXZpb3VzIHJlc29sdXRpb25cbiAgICAgIHJlbmRlcmVyLnNldFNpemUocHJldldpZHRoLCBwcmV2SGVpZ2h0LCBmYWxzZSk7XG5cbiAgICAgIGlmIChibG9iID09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KCdleHRyYWN0VGh1bWJuYWlsQmxvYjogRmFpbGVkIHRvIGNyZWF0ZSBhIGJsb2InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyYXZlcnNlIGdpdmVuIG9iamVjdCBhbmQgcmVtb3ZlIHVubmVjZXNzYXJpbHkgYm91bmQgam9pbnRzIGZyb20gZXZlcnkgYFRIUkVFLlNraW5uZWRNZXNoYC5cbiAqIFNvbWUgZW52aXJvbm1lbnRzIGxpa2UgbW9iaWxlIGRldmljZXMgaGF2ZSBhIGxvd2VyIGxpbWl0IG9mIGJvbmVzIGFuZCBtaWdodCBiZSB1bmFibGUgdG8gcGVyZm9ybSBtZXNoIHNraW5uaW5nLCB0aGlzIGZ1bmN0aW9uIG1pZ2h0IHJlc29sdmUgc3VjaCBhbiBpc3N1ZS5cbiAqIEFsc28gdGhpcyBmdW5jdGlvbiBtaWdodCBncmVhdGx5IGltcHJvdmUgdGhlIHBlcmZvcm1hbmNlIG9mIG1lc2ggc2tpbm5pbmcuXG4gKlxuICogQHBhcmFtIHJvb3QgUm9vdCBvYmplY3QgdGhhdCB3aWxsIGJlIHRyYXZlcnNlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMocm9vdDogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgLy8gc29tZSBtZXNoZXMgbWlnaHQgc2hhcmUgYSBzYW1lIHNraW5JbmRleCBhdHRyaWJ1dGUgYW5kIHRoaXMgbWFwIHByZXZlbnRzIHRvIGNvbnZlcnQgdGhlIGF0dHJpYnV0ZSB0d2ljZVxuICBjb25zdCBza2VsZXRvbkxpc3Q6IE1hcDxUSFJFRS5CdWZmZXJBdHRyaWJ1dGUsIFRIUkVFLlNrZWxldG9uPiA9IG5ldyBNYXAoKTtcblxuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZVxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAob2JqLnR5cGUgIT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeSBhcyBUSFJFRS5CdWZmZXJHZW9tZXRyeTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICAgIC8vIGxvb2sgZm9yIGV4aXN0aW5nIHNrZWxldG9uXG4gICAgbGV0IHNrZWxldG9uID0gc2tlbGV0b25MaXN0LmdldChhdHRyaWJ1dGUpO1xuXG4gICAgaWYgKCFza2VsZXRvbikge1xuICAgICAgLy8gZ2VuZXJhdGUgcmVkdWNlZCBib25lIGxpc3RcbiAgICAgIGNvbnN0IGJvbmVzOiBUSFJFRS5Cb25lW10gPSBbXTsgLy8gbmV3IGxpc3Qgb2YgYm9uZVxuICAgICAgY29uc3QgYm9uZUludmVyc2VzOiBUSFJFRS5NYXRyaXg0W10gPSBbXTsgLy8gbmV3IGxpc3Qgb2YgYm9uZUludmVyc2VcbiAgICAgIGNvbnN0IGJvbmVJbmRleE1hcDogeyBbaW5kZXg6IG51bWJlcl06IG51bWJlciB9ID0ge307IC8vIG1hcCBvZiBvbGQgYm9uZSBpbmRleCB2cy4gbmV3IGJvbmUgaW5kZXhcblxuICAgICAgLy8gY3JlYXRlIGEgbmV3IGJvbmUgbWFwXG4gICAgICBjb25zdCBhcnJheSA9IGF0dHJpYnV0ZS5hcnJheSBhcyBudW1iZXJbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBhcnJheVtpXTtcblxuICAgICAgICAvLyBuZXcgc2tpbkluZGV4IGJ1ZmZlclxuICAgICAgICBpZiAoYm9uZUluZGV4TWFwW2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYm9uZUluZGV4TWFwW2luZGV4XSA9IGJvbmVzLmxlbmd0aDtcbiAgICAgICAgICBib25lcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZXNbaW5kZXhdKTtcbiAgICAgICAgICBib25lSW52ZXJzZXMucHVzaChtZXNoLnNrZWxldG9uLmJvbmVJbnZlcnNlc1tpbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXlbaV0gPSBib25lSW5kZXhNYXBbaW5kZXhdO1xuICAgICAgfVxuXG4gICAgICAvLyByZXBsYWNlIHdpdGggbmV3IGluZGljZXNcbiAgICAgIGF0dHJpYnV0ZS5jb3B5QXJyYXkoYXJyYXkpO1xuICAgICAgYXR0cmlidXRlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gcmVwbGFjZSB3aXRoIG5ldyBpbmRpY2VzXG4gICAgICBza2VsZXRvbiA9IG5ldyBUSFJFRS5Ta2VsZXRvbihib25lcywgYm9uZUludmVyc2VzKTtcbiAgICAgIHNrZWxldG9uTGlzdC5zZXQoYXR0cmlidXRlLCBza2VsZXRvbik7XG4gICAgfVxuXG4gICAgbWVzaC5iaW5kKHNrZWxldG9uLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgIF5eXl5eXl5eXl5eXl5eXl5eXl4gdHJhbnNmb3JtIG9mIG1lc2hlcyBzaG91bGQgYmUgaWdub3JlZFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMi4wI3NraW5zXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgZXh0cmFjdFRodW1ibmFpbEJsb2IgfSBmcm9tICcuL2V4dHJhY3RUaHVtYm5haWxCbG9iJztcbmltcG9ydCB7IHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzIH0gZnJvbSAnLi9yZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1VdGlscyB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcyBjbGFzcyBpcyBub3QgbWVhbnQgdG8gYmUgaW5zdGFudGlhdGVkXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGV4dHJhY3RUaHVtYm5haWxCbG9iID0gZXh0cmFjdFRodW1ibmFpbEJsb2I7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SGVhZCc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5cbmNvbnN0IF92MyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWFkRGVidWcgZXh0ZW5kcyBWUk1Mb29rQXRIZWFkIHtcbiAgcHJpdmF0ZSBfZmFjZURpcmVjdGlvbkhlbHBlcj86IFRIUkVFLkFycm93SGVscGVyO1xuXG4gIHB1YmxpYyBzZXR1cEhlbHBlcihzY2VuZTogVEhSRUUuT2JqZWN0M0QsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVGYWNlRGlyZWN0aW9uSGVscGVyKSB7XG4gICAgICB0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyID0gbmV3IFRIUkVFLkFycm93SGVscGVyKFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLFxuICAgICAgICAwLjUsXG4gICAgICAgIDB4ZmYwMGZmLFxuICAgICAgKTtcbiAgICAgIHNjZW5lLmFkZCh0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuXG4gICAgaWYgKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuZmlyc3RQZXJzb24uZ2V0Rmlyc3RQZXJzb25Xb3JsZFBvc2l0aW9uKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIucG9zaXRpb24pO1xuICAgICAgdGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlci5zZXREaXJlY3Rpb24odGhpcy5nZXRMb29rQXRXb3JsZERpcmVjdGlvbihfdjMpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SGVhZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlciB9IGZyb20gJy4uL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkRGVidWcgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWREZWJ1Zyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnIGV4dGVuZHMgVlJNTG9va0F0SW1wb3J0ZXIge1xuICBwdWJsaWMgaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0SGVhZCB8IG51bGwge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5ZXIgPSB0aGlzLl9pbXBvcnRBcHBseWVyKHNjaGVtYUZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKTtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWREZWJ1ZyhmaXJzdFBlcnNvbiwgYXBwbHllciB8fCB1bmRlZmluZWQpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4uL3NwcmluZ2JvbmUnO1xuaW1wb3J0IHsgVlJNRGVidWdPcHRpb25zIH0gZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZURlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lRGVidWcnO1xuaW1wb3J0IHsgVlJNX0dJWk1PX1JFTkRFUl9PUkRFUiB9IGZyb20gJy4vVlJNRGVidWcnO1xuXG5jb25zdCBfY29sbGlkZXJHaXptb01hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgY29sb3I6IDB4ZmYwMGZmLFxuICB3aXJlZnJhbWU6IHRydWUsXG4gIHRyYW5zcGFyZW50OiB0cnVlLFxuICBkZXB0aFRlc3Q6IGZhbHNlLFxufSk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBzcHJpbmcgYm9uZSBncm91cCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IHR5cGUgVlJNU3ByaW5nQm9uZUdyb3VwRGVidWcgPSBWUk1TcHJpbmdCb25lRGVidWdbXTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgZXh0ZW5kcyBWUk1TcHJpbmdCb25lTWFuYWdlciB7XG4gIHB1YmxpYyBzZXR1cEhlbHBlcihzY2VuZTogVEhSRUUuT2JqZWN0M0QsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoZGVidWdPcHRpb24uZGlzYWJsZVNwcmluZ0JvbmVIZWxwZXIpIHJldHVybjtcblxuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIGlmICgoc3ByaW5nQm9uZSBhcyBhbnkpLmdldEdpem1vKSB7XG4gICAgICAgICAgY29uc3QgZ2l6bW8gPSAoc3ByaW5nQm9uZSBhcyBWUk1TcHJpbmdCb25lRGVidWcpLmdldEdpem1vKCk7XG4gICAgICAgICAgc2NlbmUuYWRkKGdpem1vKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIGNvbGxpZGVyLm1hdGVyaWFsID0gX2NvbGxpZGVyR2l6bW9NYXRlcmlhbDtcbiAgICAgICAgY29sbGlkZXIucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCB7IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgfSBmcm9tICcuL1ZSTURlYnVnJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZURlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZSB7XG4gIHByaXZhdGUgX2dpem1vPzogVEhSRUUuQXJyb3dIZWxwZXI7XG5cbiAgY29uc3RydWN0b3IoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMpIHtcbiAgICBzdXBlcihib25lLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBzcHJpbmcgYm9uZSBnaXptbywgYXMgYFRIUkVFLkFycm93SGVscGVyYC5cbiAgICogVXNlZnVsIGZvciBkZWJ1Z2dpbmcgc3ByaW5nIGJvbmVzLlxuICAgKi9cbiAgcHVibGljIGdldEdpem1vKCk6IFRIUkVFLkFycm93SGVscGVyIHtcbiAgICAvLyByZXR1cm4gaWYgZ2l6bW8gaXMgYWxyZWFkeSBleGlzdGVkXG4gICAgaWYgKHRoaXMuX2dpem1vKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2l6bW87XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZSA9IF92M0EuY29weSh0aGlzLl9uZXh0VGFpbCkuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5fZ2l6bW8gPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoXG4gICAgICBuZXh0VGFpbFJlbGF0aXZlLm5vcm1hbGl6ZSgpLFxuICAgICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbixcbiAgICAgIG5leHRUYWlsUmVsYXRpdmVMZW5ndGgsXG4gICAgICAweGZmZmYwMCxcbiAgICAgIHRoaXMucmFkaXVzLFxuICAgICAgdGhpcy5yYWRpdXMsXG4gICAgKTtcblxuICAgIC8vIGl0IHNob3VsZCBiZSBhbHdheXMgdmlzaWJsZVxuICAgIHRoaXMuX2dpem1vLmxpbmUucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgIHRoaXMuX2dpem1vLmNvbmUucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgICh0aGlzLl9naXptby5saW5lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAodGhpcy5fZ2l6bW8ubGluZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgICh0aGlzLl9naXptby5jb25lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAodGhpcy5fZ2l6bW8uY29uZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkudHJhbnNwYXJlbnQgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXMuX2dpem1vO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcbiAgICAvLyBsYXN0bHkgd2UncmUgZ29ubmEgdXBkYXRlIGdpem1vXG4gICAgdGhpcy5fdXBkYXRlR2l6bW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUdpem1vKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZ2l6bW8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0VGFpbFJlbGF0aXZlID0gX3YzQS5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKS5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZUxlbmd0aCA9IG5leHRUYWlsUmVsYXRpdmUubGVuZ3RoKCk7XG5cbiAgICB0aGlzLl9naXptby5zZXREaXJlY3Rpb24obmV4dFRhaWxSZWxhdGl2ZS5ub3JtYWxpemUoKSk7XG4gICAgdGhpcy5fZ2l6bW8uc2V0TGVuZ3RoKG5leHRUYWlsUmVsYXRpdmVMZW5ndGgsIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyk7XG4gICAgdGhpcy5fZ2l6bW8ucG9zaXRpb24uY29weSh0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUltcG9ydGVyIH0gZnJvbSAnLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lRGVidWcgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcgZXh0ZW5kcyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIge1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uIHwgdW5kZWZpbmVkID0gdnJtRXh0LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICAvLyDooZ3nqoHliKTlrprnkIPkvZPjg6Hjg4Pjgrfjg6XjgIJcbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGF3YWl0IHRoaXMuX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyhnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pO1xuXG4gICAgLy8g5ZCM44GY5bGe5oCn77yIc3RpZmZpbmVzc+OChGRyYWdGb3JjZeOBjOWQjOOBmO+8ieOBruODnOODvOODs+OBr2JvbmVHcm91cOOBq+OBvuOBqOOCgeOCieOCjOOBpuOBhOOCi+OAglxuICAgIC8vIOS4gOWIl+OBoOOBkeOBp+OBr+OBquOBhOOBk+OBqOOBq+azqOaEj+OAglxuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cExpc3QgPSBhd2FpdCB0aGlzLl9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiwgY29sbGlkZXJHcm91cHMpO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlU3ByaW5nQm9uZShib25lOiBUSFJFRS5PYmplY3QzRCwgcGFyYW1zOiBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyk6IFZSTVNwcmluZ0JvbmVEZWJ1ZyB7XG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lRGVidWcoYm9uZSwgcGFyYW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXIsIFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4uL1ZSTUltcG9ydGVyJztcbmltcG9ydCB7IFZSTURlYnVnIH0gZnJvbSAnLi9WUk1EZWJ1Zyc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkRGVidWcgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWREZWJ1Zyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1Mb29rQXRJbXBvcnRlckRlYnVnJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTURlYnVnXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSW1wb3J0ZXJEZWJ1ZyBleHRlbmRzIFZSTUltcG9ydGVyIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucy5sb29rQXRJbXBvcnRlciA9IG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgfHwgbmV3IFZSTUxvb2tBdEltcG9ydGVyRGVidWcoKTtcbiAgICBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciA9IG9wdGlvbnMuc3ByaW5nQm9uZUltcG9ydGVyIHx8IG5ldyBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZygpO1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGLCBkZWJ1Z09wdGlvbnM6IFZSTURlYnVnT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxWUk1EZWJ1Zz4ge1xuICAgIGlmIChnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgPT09IHVuZGVmaW5lZCB8fCBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgVlJNIGV4dGVuc2lvbiBvbiB0aGUgR0xURicpO1xuICAgIH1cbiAgICBjb25zdCBzY2VuZSA9IGdsdGYuc2NlbmU7XG5cbiAgICBzY2VuZS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XG5cbiAgICAvLyBTa2lubmVkIG9iamVjdCBzaG91bGQgbm90IGJlIGZydXN0dW1DdWxsZWRcbiAgICAvLyBTaW5jZSBwcmUtc2tpbm5lZCBwb3NpdGlvbiBtaWdodCBiZSBvdXRzaWRlIG9mIHZpZXdcbiAgICBzY2VuZS50cmF2ZXJzZSgob2JqZWN0M2QpID0+IHtcbiAgICAgIGlmICgob2JqZWN0M2QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWV0YSA9IChhd2FpdCB0aGlzLl9tZXRhSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtYXRlcmlhbHMgPSAoYXdhaXQgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaHVtYW5vaWQgPSAoYXdhaXQgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGZpcnN0UGVyc29uID0gaHVtYW5vaWQgPyAoYXdhaXQgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSAoYXdhaXQgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbG9va0F0ID1cbiAgICAgIGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZFxuICAgICAgICA/IChhd2FpdCB0aGlzLl9sb29rQXRJbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKChsb29rQXQgYXMgYW55KS5zZXR1cEhlbHBlcikge1xuICAgICAgKGxvb2tBdCBhcyBWUk1Mb29rQXRIZWFkRGVidWcpLnNldHVwSGVscGVyKHNjZW5lLCBkZWJ1Z09wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNwcmluZ0JvbmVNYW5hZ2VyID0gKGF3YWl0IHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcbiAgICBpZiAoKHNwcmluZ0JvbmVNYW5hZ2VyIGFzIGFueSkuc2V0dXBIZWxwZXIpIHtcbiAgICAgIChzcHJpbmdCb25lTWFuYWdlciBhcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKS5zZXR1cEhlbHBlcihzY2VuZSwgZGVidWdPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTURlYnVnKFxuICAgICAge1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgbWF0ZXJpYWxzLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgZmlyc3RQZXJzb24sXG4gICAgICAgIGJsZW5kU2hhcGVQcm94eSxcbiAgICAgICAgbG9va0F0LFxuICAgICAgICBzcHJpbmdCb25lTWFuYWdlcixcbiAgICAgIH0sXG4gICAgICBkZWJ1Z09wdGlvbnMsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNLCBWUk1QYXJhbWV0ZXJzIH0gZnJvbSAnLi4vVlJNJztcbmltcG9ydCB7IFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4uL1ZSTUltcG9ydGVyJztcbmltcG9ydCB7IFZSTURlYnVnT3B0aW9ucyB9IGZyb20gJy4vVlJNRGVidWdPcHRpb25zJztcbmltcG9ydCB7IFZSTUltcG9ydGVyRGVidWcgfSBmcm9tICcuL1ZSTUltcG9ydGVyRGVidWcnO1xuXG5leHBvcnQgY29uc3QgVlJNX0dJWk1PX1JFTkRFUl9PUkRFUiA9IDEwMDAwO1xuXG4vKipcbiAqIFtbVlJNXV0gYnV0IGl0IGhhcyBzb21lIHVzZWZ1bCBnaXptb3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1EZWJ1ZyBleHRlbmRzIFZSTSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRGVidWcgZnJvbSBhIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXIuXG4gICAqXG4gICAqIFNlZSBbW1ZSTS5mcm9tXV0gZm9yIGEgZGV0YWlsZWQgZXhhbXBsZS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gaW1wb3J0ZXJcbiAgICogQHBhcmFtIGRlYnVnT3B0aW9uIE9wdGlvbnMgZm9yIFZSTURlYnVnIGZlYXR1cmVzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIGZyb20oXG4gICAgZ2x0ZjogR0xURixcbiAgICBvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSxcbiAgICBkZWJ1Z09wdGlvbjogVlJNRGVidWdPcHRpb25zID0ge30sXG4gICk6IFByb21pc2U8VlJNPiB7XG4gICAgY29uc3QgaW1wb3J0ZXIgPSBuZXcgVlJNSW1wb3J0ZXJEZWJ1ZyhvcHRpb25zKTtcbiAgICByZXR1cm4gYXdhaXQgaW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGRlYnVnT3B0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRGVidWcgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKiBAcGFyYW0gZGVidWdPcHRpb24gT3B0aW9ucyBmb3IgVlJNRGVidWcgZmVhdHVyZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNUGFyYW1ldGVycywgZGVidWdPcHRpb246IFZSTURlYnVnT3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIocGFyYW1zKTtcblxuICAgIC8vIEdpem1v44KS5bGV6ZaLXG4gICAgaWYgKCFkZWJ1Z09wdGlvbi5kaXNhYmxlQm94SGVscGVyKSB7XG4gICAgICB0aGlzLnNjZW5lLmFkZChuZXcgVEhSRUUuQm94SGVscGVyKHRoaXMuc2NlbmUpKTtcbiAgICB9XG5cbiAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVTa2VsZXRvbkhlbHBlcikge1xuICAgICAgdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLlNrZWxldG9uSGVscGVyKHRoaXMuc2NlbmUpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiVEhSRUUuVmVjdG9yMiIsIlRIUkVFLlZlY3RvcjMiLCJUSFJFRS5WZWN0b3I0IiwiVEhSRUUuQ29sb3IiLCJUSFJFRS5PYmplY3QzRCIsIlRIUkVFLlF1YXRlcm5pb24iLCJUSFJFRS5Ta2lubmVkTWVzaCIsIlRIUkVFLlNrZWxldG9uIiwiVEhSRUUuTWF0cml4NCIsIlZFQ1RPUjNfRlJPTlQiLCJfdjNBIiwiX3F1YXQiLCJUSFJFRS5FdWxlciIsIlRIUkVFLkxpbmVhckVuY29kaW5nIiwiVEhSRUUuc1JHQkVuY29kaW5nIiwiVEhSRUUuUkdCRUVuY29kaW5nIiwiVEhSRUUuUkdCTTdFbmNvZGluZyIsIlRIUkVFLlJHQk0xNkVuY29kaW5nIiwiVEhSRUUuUkdCREVuY29kaW5nIiwiVEhSRUUuR2FtbWFFbmNvZGluZyIsIlRIUkVFLlNoYWRlck1hdGVyaWFsIiwiVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwIiwiVEhSRUUuVW5pZm9ybXNVdGlscyIsIlRIUkVFLlVuaWZvcm1zTGliIiwiVEhSRUUuRG91YmxlU2lkZSIsIlRIUkVFLkJhY2tTaWRlIiwiVEhSRUUuRnJvbnRTaWRlIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJfdjNCIiwiX3YzQyIsIl9xdWF0QSIsIl9tYXRBIiwiVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwiLCJUSFJFRS5NZXNoIiwiVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkiLCJUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEiLCJUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuU2NlbmUiLCJfdjMiLCJUSFJFRS5BcnJvd0hlbHBlciIsIlRIUkVFLkJveEhlbHBlciIsIlRIUkVFLlNrZWxldG9uSGVscGVy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
