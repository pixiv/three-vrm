/*!
 * @pixiv/three-vrm v0.6.4
 * VRM file loader for three.js.
 *
 * Copyright (c) 2019-2021 pixiv Inc.
 * @pixiv/three-vrm is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import { Vector2, Vector3, Vector4, Color, Object3D, Quaternion, SkinnedMesh, Skeleton, Matrix4, Euler, GammaEncoding, RGBDEncoding, RGBM16Encoding, RGBM7Encoding, RGBEEncoding, sRGBEncoding, LinearEncoding, ShaderMaterial, TangentSpaceNormalMap, UniformsUtils, UniformsLib, REVISION, DoubleSide, BackSide, FrontSide, MeshBasicMaterial, Mesh, SphereBufferGeometry, OrthographicCamera, PlaneBufferGeometry, Scene, ArrowHelper, BoxHelper, SkeletonHelper } from 'three';

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
    /**
     * Let's list up every possible patterns that parsed gltf nodes with a mesh can have,,,
     *
     * "*" indicates that those meshes should be listed up using this function
     *
     * ### A node with a (mesh, a signle primitive)
     *
     * - `THREE.Mesh`: The only primitive of the mesh *
     *
     * ### A node with a (mesh, multiple primitives)
     *
     * - `THREE.Group`: The root of the mesh
     *   - `THREE.Mesh`: A primitive of the mesh *
     *   - `THREE.Mesh`: A primitive of the mesh (2) *
     *
     * ### A node with a (mesh, multiple primitives) AND (a child with a mesh, a single primitive)
     *
     * - `THREE.Group`: The root of the mesh
     *   - `THREE.Mesh`: A primitive of the mesh *
     *   - `THREE.Mesh`: A primitive of the mesh (2) *
     *   - `THREE.Mesh`: A primitive of a MESH OF THE CHILD
     *
     * ### A node with a (mesh, multiple primitives) AND (a child with a mesh, multiple primitives)
     *
     * - `THREE.Group`: The root of the mesh
     *   - `THREE.Mesh`: A primitive of the mesh *
     *   - `THREE.Mesh`: A primitive of the mesh (2) *
     *   - `THREE.Group`: The root of a MESH OF THE CHILD
     *     - `THREE.Mesh`: A primitive of the mesh of the child
     *     - `THREE.Mesh`: A primitive of the mesh of the child (2)
     *
     * ### A node with a (mesh, multiple primitives) BUT the node is a bone
     *
     * - `THREE.Bone`: The root of the node, as a bone
     *   - `THREE.Group`: The root of the mesh
     *     - `THREE.Mesh`: A primitive of the mesh *
     *     - `THREE.Mesh`: A primitive of the mesh (2) *
     *
     * ### A node with a (mesh, multiple primitives) AND (a child with a mesh, multiple primitives) BUT the node is a bone
     *
     * - `THREE.Bone`: The root of the node, as a bone
     *   - `THREE.Group`: The root of the mesh
     *     - `THREE.Mesh`: A primitive of the mesh *
     *     - `THREE.Mesh`: A primitive of the mesh (2) *
     *   - `THREE.Group`: The root of a MESH OF THE CHILD
     *     - `THREE.Mesh`: A primitive of the mesh of the child
     *     - `THREE.Mesh`: A primitive of the mesh of the child (2)
     *
     * ...I will take a strategy that traverses the root of the node and take first (primitiveCount) meshes.
     */
    // Make sure that the node has a mesh
    const schemaNode = gltf.parser.json.nodes[nodeIndex];
    const meshIndex = schemaNode.mesh;
    if (meshIndex == null) {
        return null;
    }
    // How many primitives the mesh has?
    const schemaMesh = gltf.parser.json.meshes[meshIndex];
    const primitiveCount = schemaMesh.primitives.length;
    // Traverse the node and take first (primitiveCount) meshes
    const primitives = [];
    node.traverse((object) => {
        if (primitives.length < primitiveCount) {
            if (object.isMesh) {
                primitives.push(object);
            }
        }
    });
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
        Object.entries(this.restPose).forEach(([boneName, rest]) => {
            const node = this.getBoneNode(boneName);
            if (!node) {
                return;
            }
            if (rest === null || rest === void 0 ? void 0 : rest.position) {
                node.position.fromArray(rest.position);
            }
            if (rest === null || rest === void 0 ? void 0 : rest.rotation) {
                node.quaternion.fromArray(rest.rotation);
            }
        });
    }
    /**
     * Return a bone bound to a specified [[HumanBone]], as a [[VRMHumanBone]].
     *
     * See also: [[VRMHumanoid.getBones]]
     *
     * @param name Name of the bone you want
     */
    getBone(name) {
        var _a;
        return (_a = this.humanBones[name][0]) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * Return bones bound to a specified [[HumanBone]], as an array of [[VRMHumanBone]].
     * If there are no bones bound to the specified HumanBone, it will return an empty array.
     *
     * See also: [[VRMHumanoid.getBone]]
     *
     * @param name Name of the bone you want
     */
    getBones(name) {
        var _a;
        return (_a = this.humanBones[name]) !== null && _a !== void 0 ? _a : [];
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
     * If there are no bones bound to the specified HumanBone, it will return an empty array.
     *
     * See also: [[VRMHumanoid.getBoneNode]]
     *
     * @param name Name of the bone you want
     */
    getBoneNodes(name) {
        var _a, _b;
        return (_b = (_a = this.humanBones[name]) === null || _a === void 0 ? void 0 : _a.map((bone) => bone.node)) !== null && _b !== void 0 ? _b : [];
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

var vertexShader = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef MTOON_USE_UV\n  #ifdef MTOON_UVS_VERTEX_ONLY\n    vec2 vUv;\n  #else\n    varying vec2 vUv;\n  #endif\n\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHTEXTURE\n  uniform sampler2D outlineWidthTexture;\n#endif\n\nuniform float outlineWidth;\nuniform float outlineScaledMaxDistance;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef MTOON_USE_UV\n    vUv = uv;\n    vUv.y = 1.0 - vUv.y; // uv.y is opposite from UniVRM's\n    vUv = mainTex_ST.st + mainTex_ST.pq * vUv;\n    vUv.y = 1.0 - vUv.y; // reverting the previous flip\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  float outlineTex = 1.0;\n\n  #ifdef OUTLINE\n    #ifdef USE_OUTLINEWIDTHTEXTURE\n      outlineTex = texture2D( outlineWidthTexture, vUv ).r;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_WORLD\n      float worldNormalLength = length( transformedNormal );\n      vec3 outlineOffset = 0.01 * outlineWidth * outlineTex * worldNormalLength * objectNormal;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n      vec2 projectedNormal = normalize( clipNormal.xy );\n      projectedNormal *= min( gl_Position.w, outlineScaledMaxDistance );\n      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;\n      gl_Position.xy += 0.01 * outlineWidth * outlineTex * projectedNormal.xy;\n    #endif\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}";

var fragmentShader = "// #define PHONG\n\n#ifdef BLENDMODE_CUTOUT\n  uniform float cutoff;\n#endif\n\nuniform vec3 color;\nuniform float colorAlpha;\nuniform vec3 shadeColor;\n#ifdef USE_SHADETEXTURE\n  uniform sampler2D shadeTexture;\n#endif\n\nuniform float receiveShadowRate;\n#ifdef USE_RECEIVESHADOWTEXTURE\n  uniform sampler2D receiveShadowTexture;\n#endif\n\nuniform float shadingGradeRate;\n#ifdef USE_SHADINGGRADETEXTURE\n  uniform sampler2D shadingGradeTexture;\n#endif\n\nuniform float shadeShift;\nuniform float shadeToony;\nuniform float lightColorAttenuation;\nuniform float indirectLightIntensity;\n\n#ifdef USE_RIMTEXTURE\n  uniform sampler2D rimTexture;\n#endif\nuniform vec3 rimColor;\nuniform float rimLightingMix;\nuniform float rimFresnelPower;\nuniform float rimLift;\n\n#ifdef USE_SPHEREADD\n  uniform sampler2D sphereAdd;\n#endif\n\nuniform vec3 emissionColor;\n\nuniform vec3 outlineColor;\nuniform float outlineLightingMix;\n\n#ifdef USE_UVANIMMASKTEXTURE\n  uniform sampler2D uvAnimMaskTexture;\n#endif\n\nuniform float uvAnimOffsetX;\nuniform float uvAnimOffsetY;\nuniform float uvAnimTheta;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n  varying vec2 vUv;\n#endif\n\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n// #include <envmap_common_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\nstruct MToonMaterial {\n  vec3 diffuseColor;\n  vec3 shadeColor;\n  float shadingGrade;\n  float receiveShadow;\n};\n\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  // Temporary compat against shader change @ Three.js r126\n  // See: #21205, #21307, #21299\n  #ifdef THREE_VRM_THREE_REVISION_126\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      vec3 N = normalize( surf_norm );\n\n      vec3 q1perp = cross( q1, N );\n      vec3 q0perp = cross( N, q0 );\n\n      vec3 T = q1perp * st0.x + q0perp * st1.x;\n      vec3 B = q1perp * st0.y + q0perp * st1.y;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      float det = max( dot( T, T ), dot( B, B ) );\n      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\n      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\n    }\n\n  #else\n\n    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\n      // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n      vec2 st0 = dFdx( uv.st );\n      vec2 st1 = dFdy( uv.st );\n\n      float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n      vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;\n      vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;\n\n      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n      // TODO: Is this still required? Or shall I make a PR about it?\n\n      if ( length( S ) == 0.0 || length( T ) == 0.0 ) {\n        return surf_norm;\n      }\n\n      S = normalize( S );\n      T = normalize( T );\n      vec3 N = normalize( surf_norm );\n\n      #ifdef DOUBLE_SIDED\n\n        // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331\n\n        bool frontFacing = dot( cross( S, T ), N ) > 0.0;\n\n        mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );\n\n      #else\n\n        mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n      #endif\n\n      mat3 tsn = mat3( S, T, N );\n      return normalize( tsn * mapN );\n\n    }\n\n  #endif\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == lighting stuff ===========================================================\nfloat getLightIntensity(\n  const in IncidentLight directLight,\n  const in GeometricContext geometry,\n  const in float shadow,\n  const in float shadingGrade\n) {\n  float lightIntensity = dot( geometry.normal, directLight.direction );\n  lightIntensity = 0.5 + 0.5 * lightIntensity;\n  lightIntensity = lightIntensity * shadow;\n  lightIntensity = lightIntensity * shadingGrade;\n  lightIntensity = lightIntensity * 2.0 - 1.0;\n  return shadeToony == 1.0\n    ? step( shadeShift, lightIntensity )\n    : smoothstep( shadeShift, shadeShift + ( 1.0 - shadeToony ), lightIntensity );\n}\n\nvec3 getLighting( const in vec3 lightColor ) {\n  vec3 lighting = lightColor;\n  lighting = mix(\n    lighting,\n    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),\n    lightColorAttenuation\n  );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    lighting *= PI;\n  #endif\n\n  return lighting;\n}\n\nvec3 getDiffuse(\n  const in MToonMaterial material,\n  const in float lightIntensity,\n  const in vec3 lighting\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Diffuse_Lambert( lightIntensity * lighting ) );\n  #endif\n\n  return lighting * BRDF_Diffuse_Lambert( mix( material.shadeColor, material.diffuseColor, lightIntensity ) );\n}\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMMASKTEXTURE\n      uvAnimMask = texture2D( uvAnimMaskTexture, uv ).x;\n    #endif\n\n    uv = uv + vec2( uvAnimOffsetX, uvAnimOffsetY ) * uvAnimMask;\n    float uvRotCos = cos( uvAnimTheta * uvAnimMask );\n    float uvRotSin = sin( uvAnimTheta * uvAnimMask );\n    uv = mat2( uvRotCos, uvRotSin, -uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( color, colorAlpha );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissionColor;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, uv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // -- MToon: alpha -----------------------------------------------------------\n  // #include <alphatest_fragment>\n  #ifdef BLENDMODE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef BLENDMODE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode\n    gl_FragColor = vec4( outlineColor, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // #include <specularmap_fragment>\n  #include <normal_fragment_begin>\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  #ifdef OBJECTSPACE_NORMALMAP\n\n    normal = texture2D( normalMap, uv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      // Temporary compat against shader change @ Three.js r126\n      // See: #21205, #21307, #21299\n      #ifdef THREE_VRM_THREE_REVISION_126\n\n        normal = normal * faceDirection;\n\n      #else\n\n        normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n      #endif\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  #elif defined( TANGENTSPACE_NORMALMAP )\n\n    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    #ifdef USE_TANGENT\n\n      normal = normalize( vTBN * mapN );\n\n    #else\n\n      // Temporary compat against shader change @ Three.js r126\n      // See: #21205, #21307, #21299\n      #ifdef THREE_VRM_THREE_REVISION_126\n\n        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );\n\n      #else\n\n        normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );\n\n      #endif\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, uv ) ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  MToonMaterial material;\n\n  material.diffuseColor = diffuseColor.rgb;\n\n  material.shadeColor = shadeColor;\n  #ifdef USE_SHADETEXTURE\n    material.shadeColor *= shadeTextureTexelToLinear( texture2D( shadeTexture, uv ) ).rgb;\n  #endif\n\n  material.shadingGrade = 1.0;\n  #ifdef USE_SHADINGGRADETEXTURE\n    material.shadingGrade = 1.0 - shadingGradeRate * ( 1.0 - texture2D( shadingGradeTexture, uv ).r );\n  #endif\n\n  material.receiveShadow = receiveShadowRate;\n  #ifdef USE_RECEIVESHADOWTEXTURE\n    material.receiveShadow *= texture2D( receiveShadowTexture, uv ).a;\n  #endif\n\n  // #include <lights_fragment_begin>\n  GeometricContext geometry;\n\n  geometry.position = - vViewPosition;\n  geometry.normal = normal;\n  geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\n  IncidentLight directLight;\n  vec3 lightingSum = vec3( 0.0 );\n\n  #if ( NUM_POINT_LIGHTS > 0 )\n    PointLight pointLight;\n\n    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n    PointLightShadow pointLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n      pointLight = pointLights[ i ];\n      getPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n      float atten = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n      pointLightShadow = pointLightShadows[ i ];\n      atten = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - material.receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, material.shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( material, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 )\n    SpotLight spotLight;\n\n    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n    SpotLightShadow spotLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n      spotLight = spotLights[ i ];\n      getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n      float atten = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n      spotLightShadow = spotLightShadows[ i ];\n      atten = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - material.receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, material.shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( material, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 )\n    DirectionalLight directionalLight;\n\n    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n    DirectionalLightShadow directionalLightShadow;\n    #endif\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n      directionalLight = directionalLights[ i ];\n      getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n      float atten = 1.0;\n      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n      directionalLightShadow = directionalLightShadows[ i ];\n      atten = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - material.receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, material.shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( material, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  // #if defined( RE_IndirectDiffuse )\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n  irradiance += getLightProbeIrradiance( lightProbe, geometry );\n  #if ( NUM_HEMI_LIGHTS > 0 )\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n    }\n    #pragma unroll_loop_end\n  #endif\n  // #endif\n\n  // #include <lights_fragment_maps>\n  #ifdef USE_LIGHTMAP\n    vec4 lightMapTexel = texture2D( lightMap, vUv2 );\n    vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      lightMapIrradiance *= PI;\n    #endif\n    irradiance += lightMapIrradiance;\n  #endif\n\n  // #include <lights_fragment_end>\n  // RE_IndirectDiffuse here\n  reflectedLight.indirectDiffuse += indirectLightIntensity * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  // The \"comment out if you want to PBR absolutely\" line\n  #ifndef DEBUG_LITSHADERATE\n    col = min(col, material.diffuseColor);\n  #endif\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED )\n    gl_FragColor = vec4(\n      outlineColor.rgb * mix( vec3( 1.0 ), col, outlineLightingMix ),\n      diffuseColor.a\n    );\n    postCorrection();\n    return;\n  #endif\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: parametric rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n  vec3 rimMix = mix( vec3( 1.0 ), lightingSum + indirectLightIntensity * irradiance, rimLightingMix );\n  vec3 rim = rimColor * pow( saturate( 1.0 - dot( viewDir, normal ) + rimLift ), rimFresnelPower );\n  #ifdef USE_RIMTEXTURE\n    rim *= rimTextureTexelToLinear( texture2D( rimTexture, uv ) ).rgb;\n  #endif\n  col += rim;\n\n  // -- MToon: additive matcap -------------------------------------------------\n  #ifdef USE_SPHEREADD\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      vec3 matcap = sphereAddTexelToLinear( texture2D( sphereAdd, sphereUv ) ).xyz;\n      col += matcap;\n    }\n  #endif\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}";

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
        const useUvInVert = this.outlineWidthTexture !== null;
        const useUvInFrag = this.map !== null ||
            this.shadeTexture !== null ||
            this.receiveShadowTexture !== null ||
            this.shadingGradeTexture !== null ||
            this.rimTexture !== null ||
            this.uvAnimMaskTexture !== null;
        this.defines = {
            // Temporary compat against shader change @ Three.js r126
            // See: #21205, #21307, #21299
            THREE_VRM_THREE_REVISION_126: parseInt(REVISION) >= 126,
            OUTLINE: this._isOutline,
            BLENDMODE_OPAQUE: this._blendMode === MToonMaterialRenderMode.Opaque,
            BLENDMODE_CUTOUT: this._blendMode === MToonMaterialRenderMode.Cutout,
            BLENDMODE_TRANSPARENT: this._blendMode === MToonMaterialRenderMode.Transparent ||
                this._blendMode === MToonMaterialRenderMode.TransparentWithZWrite,
            MTOON_USE_UV: useUvInVert || useUvInFrag,
            MTOON_UVS_VERTEX_ONLY: useUvInVert && !useUvInFrag,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9kaXNwb3Nlci50cyIsIi4uL3NyYy9ibGVuZHNoYXBlL1ZSTUJsZW5kU2hhcGVHcm91cC50cyIsIi4uL3NyYy90eXBlcy9WUk1TY2hlbWEudHMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUudHMiLCIuLi9zcmMvdXRpbHMvcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eS50cyIsIi4uL3NyYy91dGlscy9tYXRoLnRzIiwiLi4vc3JjL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZVByb3h5LnRzIiwiLi4vc3JjL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUltcG9ydGVyLnRzIiwiLi4vc3JjL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uLnRzIiwiLi4vc3JjL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uSW1wb3J0ZXIudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRJbXBvcnRlci50cyIsIi4uL3NyYy9sb29rYXQvVlJNQ3VydmVNYXBwZXIudHMiLCIuLi9zcmMvbG9va2F0L1ZSTUxvb2tBdEFwcGx5ZXIudHMiLCIuLi9zcmMvbG9va2F0L1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLnRzIiwiLi4vc3JjL2xvb2thdC9WUk1Mb29rQXRIZWFkLnRzIiwiLi4vc3JjL2xvb2thdC9WUk1Mb29rQXRCb25lQXBwbHllci50cyIsIi4uL3NyYy9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXIudHMiLCIuLi9zcmMvbWF0ZXJpYWwvZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uLnRzIiwiLi4vc3JjL21hdGVyaWFsL01Ub29uTWF0ZXJpYWwudHMiLCIuLi9zcmMvbWF0ZXJpYWwvVlJNVW5saXRNYXRlcmlhbC50cyIsIi4uL3NyYy9tYXRlcmlhbC9WUk1NYXRlcmlhbEltcG9ydGVyLnRzIiwiLi4vc3JjL21ldGEvVlJNTWV0YUltcG9ydGVyLnRzIiwiLi4vc3JjL3V0aWxzL21hdDRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvdXRpbHMvTWF0cml4NEludmVyc2VDYWNoZS50cyIsIi4uL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmUudHMiLCIuLi9zcmMvc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsIi4uL3NyYy9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlci50cyIsIi4uL3NyYy9WUk1JbXBvcnRlci50cyIsIi4uL3NyYy9WUk0udHMiLCIuLi9zcmMvVlJNVXRpbHMvZXh0cmFjdFRodW1ibmFpbEJsb2IudHMiLCIuLi9zcmMvVlJNVXRpbHMvcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMudHMiLCIuLi9zcmMvVlJNVXRpbHMvaW5kZXgudHMiLCIuLi9zcmMvZGVidWcvVlJNTG9va0F0SGVhZERlYnVnLnRzIiwiLi4vc3JjL2RlYnVnL1ZSTUxvb2tBdEltcG9ydGVyRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zy50cyIsIi4uL3NyYy9kZWJ1Zy9WUk1TcHJpbmdCb25lRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcudHMiLCIuLi9zcmMvZGVidWcvVlJNSW1wb3J0ZXJEZWJ1Zy50cyIsIi4uL3NyYy9kZWJ1Zy9WUk1EZWJ1Zy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCIvLyBTZWU6IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jbWFudWFsL2VuL2ludHJvZHVjdGlvbi9Ib3ctdG8tZGlzcG9zZS1vZi1vYmplY3RzXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZnVuY3Rpb24gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IHZvaWQge1xuICBPYmplY3Qua2V5cyhtYXRlcmlhbCkuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdO1xuICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gdmFsdWUgYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIHRleHR1cmUuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xufVxuXG5mdW5jdGlvbiBkaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBjb25zdCBnZW9tZXRyeTogVEhSRUUuQnVmZmVyR2VvbWV0cnkgfCB1bmRlZmluZWQgPSAob2JqZWN0M0QgYXMgYW55KS5nZW9tZXRyeTtcbiAgaWYgKGdlb21ldHJ5KSB7XG4gICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuTWF0ZXJpYWxbXSA9IChvYmplY3QzRCBhcyBhbnkpLm1hdGVyaWFsO1xuICBpZiAobWF0ZXJpYWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgIG1hdGVyaWFsLmZvckVhY2goKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCkgPT4gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gICAgfSBlbHNlIGlmIChtYXRlcmlhbCkge1xuICAgICAgZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBEaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBvYmplY3QzRC50cmF2ZXJzZShkaXNwb3NlKTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQcmltaXRpdmUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNQmxlbmRTaGFwZUJpbmQge1xuICBtZXNoZXM6IEdMVEZQcmltaXRpdmVbXTtcbiAgbW9ycGhUYXJnZXRJbmRleDogbnVtYmVyO1xuICB3ZWlnaHQ6IG51bWJlcjtcbn1cblxuZW51bSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUge1xuICBOVU1CRVIsXG4gIFZFQ1RPUjIsXG4gIFZFQ1RPUjMsXG4gIFZFQ1RPUjQsXG4gIENPTE9SLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlIHtcbiAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgZGVmYXVsdFZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgdGFyZ2V0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICBkZWx0YVZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjsgLy8gdGFyZ2V0VmFsdWUgLSBkZWZhdWx0VmFsdWVcbiAgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xufVxuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuY29uc3QgX3YzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92NCA9IG5ldyBUSFJFRS5WZWN0b3I0KCk7XG5jb25zdCBfY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcblxuLy8gYW5pbWF0aW9uTWl4ZXIg44Gu55uj6KaW5a++6LGh44Gv44CBU2NlbmUg44Gu5Lit44Gr5YWl44Gj44Gm44GE44KL5b+F6KaB44GM44GC44KL44CCXG4vLyDjgZ3jga7jgZ/jgoHjgIHooajnpLrjgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjgZHjgozjganjgIFPYmplY3QzRCDjgpLntpnmib/jgZfjgaYgU2NlbmUg44Gr5oqV5YWl44Gn44GN44KL44KI44GG44Gr44GZ44KL44CCXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZUdyb3VwIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICBwdWJsaWMgd2VpZ2h0ID0gMC4wO1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICBwcml2YXRlIF9iaW5kczogVlJNQmxlbmRTaGFwZUJpbmRbXSA9IFtdO1xuICBwcml2YXRlIF9tYXRlcmlhbFZhbHVlczogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IGBCbGVuZFNoYXBlQ29udHJvbGxlcl8ke2V4cHJlc3Npb25OYW1lfWA7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ0JsZW5kU2hhcGVDb250cm9sbGVyJztcbiAgICAvLyDooajnpLrnm67nmoTjga7jgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjga7jgafjgIHosqDojbfou73muJvjga7jgZ/jgoHjgasgdmlzaWJsZSDjgpIgZmFsc2Ug44Gr44GX44Gm44GK44GP44CCXG4gICAgLy8g44GT44KM44Gr44KI44KK44CB44GT44Gu44Kk44Oz44K544K/44Oz44K544Gr5a++44GZ44KL5q+O44OV44Os44O844Og44GuIG1hdHJpeCDoh6rli5XoqIjnrpfjgpLnnIHnlaXjgafjgY3jgovjgIJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRCaW5kKGFyZ3M6IHsgbWVzaGVzOiBHTFRGUHJpbWl0aXZlW107IG1vcnBoVGFyZ2V0SW5kZXg6IG51bWJlcjsgd2VpZ2h0OiBudW1iZXIgfSk6IHZvaWQge1xuICAgIC8vIG9yaWdpbmFsIHdlaWdodCBpcyAwLTEwMCBidXQgd2Ugd2FudCB0byBkZWFsIHdpdGggdGhpcyB2YWx1ZSB3aXRoaW4gMC0xXG4gICAgY29uc3Qgd2VpZ2h0ID0gYXJncy53ZWlnaHQgLyAxMDA7XG5cbiAgICB0aGlzLl9iaW5kcy5wdXNoKHtcbiAgICAgIG1lc2hlczogYXJncy5tZXNoZXMsXG4gICAgICBtb3JwaFRhcmdldEluZGV4OiBhcmdzLm1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICB3ZWlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTWF0ZXJpYWxWYWx1ZShhcmdzOiB7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcbiAgICBkZWZhdWx0VmFsdWU/OiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gYXJncy5tYXRlcmlhbDtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBhcmdzLnByb3BlcnR5TmFtZTtcblxuICAgIGxldCB2YWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV07XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgLy8gcHJvcGVydHkgaGFzIG5vdCBiZWVuIGZvdW5kXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlID0gYXJncy5kZWZhdWx0VmFsdWUgfHwgdmFsdWU7XG5cbiAgICBsZXQgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xuICAgIGxldCBkZWZhdWx0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICAgIGxldCB0YXJnZXRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gICAgbGV0IGRlbHRhVmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuXG4gICAgaWYgKHZhbHVlLmlzVmVjdG9yMikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IyO1xuICAgICAgZGVmYXVsdFZhbHVlID0gKHZhbHVlIGFzIFRIUkVFLlZlY3RvcjIpLmNsb25lKCk7XG4gICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZS5pc1ZlY3RvcjMpIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMztcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5WZWN0b3IzKS5jbG9uZSgpO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUuaXNWZWN0b3I0KSB7XG4gICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjQ7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuVmVjdG9yNCkuY2xvbmUoKTtcblxuICAgICAgLy8gdmVjdG9yUHJvcGVydHkgYW5kIHRhcmdldFZhbHVlIGluZGV4IGlzIGRpZmZlcmVudCBmcm9tIGVhY2ggb3RoZXJcbiAgICAgIC8vIGV4cG9ydGVkIHZybSBieSBVbmlWUk0gZmlsZSBpc1xuICAgICAgLy9cbiAgICAgIC8vIHZlY3RvclByb3BlcnR5XG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVswXSwgdGFyZ2V0VmFsdWVbMV1cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzJdLCB0YXJnZXRWYWx1ZVszXVxuICAgICAgLy9cbiAgICAgIC8vIHRhcmdldFZhbHVlXG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVsyXSwgdGFyZ2V0VmFsdWVbM11cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsxXVxuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yNCgpLmZyb21BcnJheShbXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMl0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMF0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMV0sXG4gICAgICBdKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUuaXNDb2xvcikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5DT0xPUjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5Db2xvcikuY2xvbmUoKTtcbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSO1xuICAgICAgZGVmYXVsdFZhbHVlID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBhcmdzLnRhcmdldFZhbHVlWzBdO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlIC0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLnB1c2goe1xuICAgICAgbWF0ZXJpYWwsXG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICB0YXJnZXRWYWx1ZSxcbiAgICAgIGRlbHRhVmFsdWUsXG4gICAgICB0eXBlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgdmlhIHtAbGluayBCbGVuZFNoYXBlTWFzdGVyI3VwZGF0ZX0uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgdyA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPCAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG5cbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSArPSB3ICogYmluZC53ZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSArPSBkZWx0YVZhbHVlICogdztcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIFRIUkVFLlZlY3RvcjI7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjIuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5WZWN0b3IzO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3YzLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuVmVjdG9yNDtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92NC5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHByZXZpb3VzbHkgYXNzaWduZWQgYmxlbmQgc2hhcGVzLlxuICAgKi9cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSA9IDAuMDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdO1xuICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5OVU1CRVIpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZSBhcyBUSFJFRS5WZWN0b3IyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuVmVjdG9yMztcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLlZlY3RvcjQ7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuQ29sb3I7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUeXBlZG9jIGRvZXMgbm90IHN1cHBvcnQgZXhwb3J0IGRlY2xhcmF0aW9ucyB5ZXRcbi8vIHRoZW4gd2UgaGF2ZSB0byB1c2UgYG5hbWVzcGFjZWAgaW5zdGVhZCBvZiBleHBvcnQgZGVjbGFyYXRpb25zIGZvciBub3cuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9UeXBlU3Ryb25nL3R5cGVkb2MvcHVsbC84MDFcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgVlJNU2NoZW1hIHtcbiAgLyoqXG4gICAqIFZSTSBleHRlbnNpb24gaXMgZm9yIDNkIGh1bWFub2lkIGF2YXRhcnMgKGFuZCBtb2RlbHMpIGluIFZSIGFwcGxpY2F0aW9ucy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgVlJNIHtcbiAgICBibGVuZFNoYXBlTWFzdGVyPzogQmxlbmRTaGFwZTtcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIGV4cG9ydGVyIHRoYXQgdnJtIGNyZWF0ZWQuIFVuaVZSTS0wLjUzLjBcbiAgICAgKi9cbiAgICBleHBvcnRlclZlcnNpb24/OiBzdHJpbmc7XG4gICAgZmlyc3RQZXJzb24/OiBGaXJzdFBlcnNvbjtcbiAgICBodW1hbm9pZD86IEh1bWFub2lkO1xuICAgIG1hdGVyaWFsUHJvcGVydGllcz86IE1hdGVyaWFsW107XG4gICAgbWV0YT86IE1ldGE7XG4gICAgc2Vjb25kYXJ5QW5pbWF0aW9uPzogU2Vjb25kYXJ5QW5pbWF0aW9uO1xuICAgIC8qKlxuICAgICAqIFZlcnNpb24gb2YgVlJNIHNwZWNpZmljYXRpb24uIDAuMFxuICAgICAqL1xuICAgIHNwZWNWZXJzaW9uPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIEJsZW5kU2hhcGVBdmF0YXIgb2YgVW5pVlJNXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGUge1xuICAgIGJsZW5kU2hhcGVHcm91cHM/OiBCbGVuZFNoYXBlR3JvdXBbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZUdyb3VwIHtcbiAgICAvKipcbiAgICAgKiBMb3cgbGV2ZWwgYmxlbmRzaGFwZSByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIGJpbmRzPzogQmxlbmRTaGFwZUJpbmRbXTtcbiAgICAvKipcbiAgICAgKiAwIG9yIDEuIERvIG5vdCBhbGxvdyBhbiBpbnRlcm1lZGlhdGUgdmFsdWUuIFZhbHVlIHNob3VsZCByb3VuZGVkXG4gICAgICovXG4gICAgaXNCaW5hcnk/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE1hdGVyaWFsIGFuaW1hdGlvbiByZWZlcmVuY2VzLlxuICAgICAqL1xuICAgIG1hdGVyaWFsVmFsdWVzPzogQmxlbmRTaGFwZU1hdGVyaWFsYmluZFtdO1xuICAgIC8qKlxuICAgICAqIEV4cHJlc3Npb24gbmFtZVxuICAgICAqL1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUHJlZGVmaW5lZCBFeHByZXNzaW9uIG5hbWVcbiAgICAgKi9cbiAgICBwcmVzZXROYW1lPzogQmxlbmRTaGFwZVByZXNldE5hbWU7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGVCaW5kIHtcbiAgICBpbmRleD86IG51bWJlcjtcbiAgICBtZXNoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNraW5uZWRNZXNoUmVuZGVyZXIuU2V0QmxlbmRTaGFwZVdlaWdodFxuICAgICAqL1xuICAgIHdlaWdodD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZU1hdGVyaWFsYmluZCB7XG4gICAgbWF0ZXJpYWxOYW1lPzogc3RyaW5nO1xuICAgIHByb3BlcnR5TmFtZT86IHN0cmluZztcbiAgICB0YXJnZXRWYWx1ZT86IG51bWJlcltdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWRlZmluZWQgRXhwcmVzc2lvbiBuYW1lXG4gICAqL1xuICBleHBvcnQgZW51bSBCbGVuZFNoYXBlUHJlc2V0TmFtZSB7XG4gICAgQSA9ICdhJyxcbiAgICBBbmdyeSA9ICdhbmdyeScsXG4gICAgQmxpbmsgPSAnYmxpbmsnLFxuICAgIEJsaW5rTCA9ICdibGlua19sJyxcbiAgICBCbGlua1IgPSAnYmxpbmtfcicsXG4gICAgRSA9ICdlJyxcbiAgICBGdW4gPSAnZnVuJyxcbiAgICBJID0gJ2knLFxuICAgIEpveSA9ICdqb3knLFxuICAgIExvb2tkb3duID0gJ2xvb2tkb3duJyxcbiAgICBMb29rbGVmdCA9ICdsb29rbGVmdCcsXG4gICAgTG9va3JpZ2h0ID0gJ2xvb2tyaWdodCcsXG4gICAgTG9va3VwID0gJ2xvb2t1cCcsXG4gICAgTmV1dHJhbCA9ICduZXV0cmFsJyxcbiAgICBPID0gJ28nLFxuICAgIFNvcnJvdyA9ICdzb3Jyb3cnLFxuICAgIFUgPSAndScsXG4gICAgVW5rbm93biA9ICd1bmtub3duJyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb24ge1xuICAgIC8qKlxuICAgICAqIFRoZSBib25lIHdob3NlIHJlbmRlcmluZyBzaG91bGQgYmUgdHVybmVkIG9mZiBpbiBmaXJzdC1wZXJzb24gdmlldy4gVXN1YWxseSBIZWFkIGlzXG4gICAgICogc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIGZpcnN0UGVyc29uQm9uZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHBvc2l0aW9uIG9mIHRoZSBWUiBoZWFkc2V0IGluIGZpcnN0LXBlcnNvbiB2aWV3LiBJdCBpcyBhc3N1bWVkIHRoYXQgYW4gb2Zmc2V0XG4gICAgICogZnJvbSB0aGUgaGVhZCBib25lIHRvIHRoZSBWUiBoZWFkc2V0IGlzIGFkZGVkLlxuICAgICAqL1xuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldD86IFZlY3RvcjM7XG4gICAgbG9va0F0SG9yaXpvbnRhbElubmVyPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgbG9va0F0SG9yaXpvbnRhbE91dGVyPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgLyoqXG4gICAgICogRXllIGNvbnRyb2xsZXIgbW9kZS5cbiAgICAgKi9cbiAgICBsb29rQXRUeXBlTmFtZT86IEZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWU7XG4gICAgbG9va0F0VmVydGljYWxEb3duPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgbG9va0F0VmVydGljYWxVcD86IEZpcnN0UGVyc29uRGVncmVlTWFwO1xuICAgIC8qKlxuICAgICAqIFN3aXRjaCBkaXNwbGF5IC8gdW5kaXNwbGF5IGZvciBlYWNoIG1lc2ggaW4gZmlyc3QtcGVyc29uIHZpZXcgb3IgdGhlIG90aGVycy5cbiAgICAgKi9cbiAgICBtZXNoQW5ub3RhdGlvbnM/OiBGaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uW107XG4gIH1cblxuICAvKipcbiAgICogRXllIGNvbnRyb2xsZXIgc2V0dGluZy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb25EZWdyZWVNYXAge1xuICAgIC8qKlxuICAgICAqIE5vbmUgbGluZWFyIG1hcHBpbmcgcGFyYW1zLiB0aW1lLCB2YWx1ZSwgaW5UYW5nZW50LCBvdXRUYW5nZW50XG4gICAgICovXG4gICAgY3VydmU/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBMb29rIGF0IGlucHV0IGNsYW1wIHJhbmdlIGRlZ3JlZS5cbiAgICAgKi9cbiAgICB4UmFuZ2U/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTG9vayBhdCBtYXAgcmFuZ2UgZGVncmVlIGZyb20geFJhbmdlLlxuICAgICAqL1xuICAgIHlSYW5nZT86IG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeWUgY29udHJvbGxlciBtb2RlLlxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZSB7XG4gICAgQmxlbmRTaGFwZSA9ICdCbGVuZFNoYXBlJyxcbiAgICBCb25lID0gJ0JvbmUnLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uIHtcbiAgICBmaXJzdFBlcnNvbkZsYWc/OiBzdHJpbmc7XG4gICAgbWVzaD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSHVtYW5vaWQge1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5hcm1TdHJldGNoXG4gICAgICovXG4gICAgYXJtU3RyZXRjaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uZmVldFNwYWNpbmdcbiAgICAgKi9cbiAgICBmZWV0U3BhY2luZz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uaGFzVHJhbnNsYXRpb25Eb0ZcbiAgICAgKi9cbiAgICBoYXNUcmFuc2xhdGlvbkRvRj86IGJvb2xlYW47XG4gICAgaHVtYW5Cb25lcz86IEh1bWFub2lkQm9uZVtdO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5sZWdTdHJldGNoXG4gICAgICovXG4gICAgbGVnU3RyZXRjaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24ubG93ZXJBcm1Ud2lzdFxuICAgICAqL1xuICAgIGxvd2VyQXJtVHdpc3Q/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmxvd2VyTGVnVHdpc3RcbiAgICAgKi9cbiAgICBsb3dlckxlZ1R3aXN0PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi51cHBlckFybVR3aXN0XG4gICAgICovXG4gICAgdXBwZXJBcm1Ud2lzdD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24udXBwZXJMZWdUd2lzdFxuICAgICAqL1xuICAgIHVwcGVyTGVnVHdpc3Q/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEh1bWFub2lkQm9uZSB7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LmF4aXNMZW5ndGhcbiAgICAgKi9cbiAgICBheGlzTGVuZ3RoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEh1bWFuIGJvbmUgbmFtZS5cbiAgICAgKi9cbiAgICBib25lPzogSHVtYW5vaWRCb25lTmFtZTtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQuY2VudGVyXG4gICAgICovXG4gICAgY2VudGVyPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWF4XG4gICAgICovXG4gICAgbWF4PzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWluXG4gICAgICovXG4gICAgbWluPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2Ugbm9kZSBpbmRleFxuICAgICAqL1xuICAgIG5vZGU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LnVzZURlZmF1bHRWYWx1ZXNcbiAgICAgKi9cbiAgICB1c2VEZWZhdWx0VmFsdWVzPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIdW1hbiBib25lIG5hbWUuXG4gICAqL1xuICBleHBvcnQgZW51bSBIdW1hbm9pZEJvbmVOYW1lIHtcbiAgICBDaGVzdCA9ICdjaGVzdCcsXG4gICAgSGVhZCA9ICdoZWFkJyxcbiAgICBIaXBzID0gJ2hpcHMnLFxuICAgIEphdyA9ICdqYXcnLFxuICAgIExlZnRFeWUgPSAnbGVmdEV5ZScsXG4gICAgTGVmdEZvb3QgPSAnbGVmdEZvb3QnLFxuICAgIExlZnRIYW5kID0gJ2xlZnRIYW5kJyxcbiAgICBMZWZ0SW5kZXhEaXN0YWwgPSAnbGVmdEluZGV4RGlzdGFsJyxcbiAgICBMZWZ0SW5kZXhJbnRlcm1lZGlhdGUgPSAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0SW5kZXhQcm94aW1hbCA9ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gICAgTGVmdExpdHRsZURpc3RhbCA9ICdsZWZ0TGl0dGxlRGlzdGFsJyxcbiAgICBMZWZ0TGl0dGxlSW50ZXJtZWRpYXRlID0gJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRMaXR0bGVQcm94aW1hbCA9ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICAgIExlZnRMb3dlckFybSA9ICdsZWZ0TG93ZXJBcm0nLFxuICAgIExlZnRMb3dlckxlZyA9ICdsZWZ0TG93ZXJMZWcnLFxuICAgIExlZnRNaWRkbGVEaXN0YWwgPSAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICAgTGVmdE1pZGRsZUludGVybWVkaWF0ZSA9ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0TWlkZGxlUHJveGltYWwgPSAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgICBMZWZ0UmluZ0Rpc3RhbCA9ICdsZWZ0UmluZ0Rpc3RhbCcsXG4gICAgTGVmdFJpbmdJbnRlcm1lZGlhdGUgPSAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRSaW5nUHJveGltYWwgPSAnbGVmdFJpbmdQcm94aW1hbCcsXG4gICAgTGVmdFNob3VsZGVyID0gJ2xlZnRTaG91bGRlcicsXG4gICAgTGVmdFRodW1iRGlzdGFsID0gJ2xlZnRUaHVtYkRpc3RhbCcsXG4gICAgTGVmdFRodW1iSW50ZXJtZWRpYXRlID0gJ2xlZnRUaHVtYkludGVybWVkaWF0ZScsXG4gICAgTGVmdFRodW1iUHJveGltYWwgPSAnbGVmdFRodW1iUHJveGltYWwnLFxuICAgIExlZnRUb2VzID0gJ2xlZnRUb2VzJyxcbiAgICBMZWZ0VXBwZXJBcm0gPSAnbGVmdFVwcGVyQXJtJyxcbiAgICBMZWZ0VXBwZXJMZWcgPSAnbGVmdFVwcGVyTGVnJyxcbiAgICBOZWNrID0gJ25lY2snLFxuICAgIFJpZ2h0RXllID0gJ3JpZ2h0RXllJyxcbiAgICBSaWdodEZvb3QgPSAncmlnaHRGb290JyxcbiAgICBSaWdodEhhbmQgPSAncmlnaHRIYW5kJyxcbiAgICBSaWdodEluZGV4RGlzdGFsID0gJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICAgIFJpZ2h0SW5kZXhJbnRlcm1lZGlhdGUgPSAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICAgUmlnaHRJbmRleFByb3hpbWFsID0gJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gICAgUmlnaHRMaXR0bGVEaXN0YWwgPSAncmlnaHRMaXR0bGVEaXN0YWwnLFxuICAgIFJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlID0gJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodExpdHRsZVByb3hpbWFsID0gJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICAgIFJpZ2h0TG93ZXJBcm0gPSAncmlnaHRMb3dlckFybScsXG4gICAgUmlnaHRMb3dlckxlZyA9ICdyaWdodExvd2VyTGVnJyxcbiAgICBSaWdodE1pZGRsZURpc3RhbCA9ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gICAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUgPSAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0TWlkZGxlUHJveGltYWwgPSAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gICAgUmlnaHRSaW5nRGlzdGFsID0gJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlID0gJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gICAgUmlnaHRSaW5nUHJveGltYWwgPSAncmlnaHRSaW5nUHJveGltYWwnLFxuICAgIFJpZ2h0U2hvdWxkZXIgPSAncmlnaHRTaG91bGRlcicsXG4gICAgUmlnaHRUaHVtYkRpc3RhbCA9ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgICBSaWdodFRodW1iSW50ZXJtZWRpYXRlID0gJ3JpZ2h0VGh1bWJJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0VGh1bWJQcm94aW1hbCA9ICdyaWdodFRodW1iUHJveGltYWwnLFxuICAgIFJpZ2h0VG9lcyA9ICdyaWdodFRvZXMnLFxuICAgIFJpZ2h0VXBwZXJBcm0gPSAncmlnaHRVcHBlckFybScsXG4gICAgUmlnaHRVcHBlckxlZyA9ICdyaWdodFVwcGVyTGVnJyxcbiAgICBTcGluZSA9ICdzcGluZScsXG4gICAgVXBwZXJDaGVzdCA9ICd1cHBlckNoZXN0JyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWwge1xuICAgIGZsb2F0UHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAga2V5d29yZE1hcD86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgbmFtZT86IHN0cmluZztcbiAgICByZW5kZXJRdWV1ZT86IG51bWJlcjtcbiAgICBzaGFkZXI/OiBzdHJpbmc7XG4gICAgdGFnTWFwPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICB0ZXh0dXJlUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgdmVjdG9yUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE1ldGEge1xuICAgIC8qKlxuICAgICAqIEEgcGVyc29uIHdobyBjYW4gcGVyZm9ybSB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgYWxsb3dlZFVzZXJOYW1lPzogTWV0YUFsbG93ZWRVc2VyTmFtZTtcbiAgICAvKipcbiAgICAgKiBBdXRob3Igb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgYXV0aG9yPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEZvciBjb21tZXJjaWFsIHVzZVxuICAgICAqL1xuICAgIGNvbW1lcmNpYWxVc3NhZ2VOYW1lPzogTWV0YVVzc2FnZU5hbWU7XG4gICAgLyoqXG4gICAgICogQ29udGFjdCBJbmZvcm1hdGlvbiBvZiBWUk0gbW9kZWwgYXV0aG9yXG4gICAgICovXG4gICAgY29udGFjdEluZm9ybWF0aW9uPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIExpY2Vuc2UgdHlwZVxuICAgICAqL1xuICAgIGxpY2Vuc2VOYW1lPzogTWV0YUxpY2Vuc2VOYW1lO1xuICAgIC8qKlxuICAgICAqIElmIOKAnE90aGVy4oCdIGlzIHNlbGVjdGVkLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50IGhlcmUuXG4gICAgICovXG4gICAgb3RoZXJMaWNlbnNlVXJsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIElmIHRoZXJlIGFyZSBhbnkgY29uZGl0aW9ucyBub3QgbWVudGlvbmVkIGFib3ZlLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50XG4gICAgICogaGVyZS5cbiAgICAgKi9cbiAgICBvdGhlclBlcm1pc3Npb25Vcmw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHJlZmVyZW5jZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gc2V4dWFsIGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgICAqL1xuICAgIHNleHVhbFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgICAvKipcbiAgICAgKiBUaHVtYm5haWwgb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgdGV4dHVyZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICB0aXRsZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHZlcnNpb24/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHZpb2xlbnQgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgdmlvbGVudFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHBlcnNvbiB3aG8gY2FuIHBlcmZvcm0gd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YUFsbG93ZWRVc2VyTmFtZSB7XG4gICAgRXZlcnlvbmUgPSAnRXZlcnlvbmUnLFxuICAgIEV4cGxpY2l0bHlMaWNlbnNlZFBlcnNvbiA9ICdFeHBsaWNpdGx5TGljZW5zZWRQZXJzb24nLFxuICAgIE9ubHlBdXRob3IgPSAnT25seUF1dGhvcicsXG4gIH1cblxuICAvKipcbiAgICogRm9yIGNvbW1lcmNpYWwgdXNlXG4gICAqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSBzZXh1YWwgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSB2aW9sZW50IGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YVVzc2FnZU5hbWUge1xuICAgIEFsbG93ID0gJ0FsbG93JyxcbiAgICBEaXNhbGxvdyA9ICdEaXNhbGxvdycsXG4gIH1cblxuICAvKipcbiAgICogTGljZW5zZSB0eXBlXG4gICAqL1xuICBleHBvcnQgZW51bSBNZXRhTGljZW5zZU5hbWUge1xuICAgIENjMCA9ICdDQzAnLFxuICAgIENjQnkgPSAnQ0NfQlknLFxuICAgIENjQnlOYyA9ICdDQ19CWV9OQycsXG4gICAgQ2NCeU5jTmQgPSAnQ0NfQllfTkNfTkQnLFxuICAgIENjQnlOY1NhID0gJ0NDX0JZX05DX1NBJyxcbiAgICBDY0J5TmQgPSAnQ0NfQllfTkQnLFxuICAgIENjQnlTYSA9ICdDQ19CWV9TQScsXG4gICAgT3RoZXIgPSAnT3RoZXInLFxuICAgIFJlZGlzdHJpYnV0aW9uUHJvaGliaXRlZCA9ICdSZWRpc3RyaWJ1dGlvbl9Qcm9oaWJpdGVkJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2V0dGluZyBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uIG9mIHN0cmluZy1saWtlIG9iamVjdHMgc3VjaCBhcyB0YWlscyBhbmQgaGFpcnMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlY29uZGFyeUFuaW1hdGlvbiB7XG4gICAgYm9uZUdyb3Vwcz86IFNlY29uZGFyeUFuaW1hdGlvblNwcmluZ1tdO1xuICAgIGNvbGxpZGVyR3JvdXBzPzogU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJncm91cFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25TcHJpbmcge1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIG5vZGUgaW5kZXggb2YgdGhlIHJvb3QgYm9uZSBvZiB0aGUgc3dheWluZyBvYmplY3QuXG4gICAgICovXG4gICAgYm9uZXM/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVmZXJlbmNlIHBvaW50IG9mIGEgc3dheWluZyBvYmplY3QgY2FuIGJlIHNldCBhdCBhbnkgbG9jYXRpb24gZXhjZXB0IHRoZSBvcmlnaW4uXG4gICAgICogV2hlbiBpbXBsZW1lbnRpbmcgVUkgbW92aW5nIHdpdGggd2FycCwgdGhlIHBhcmVudCBub2RlIHRvIG1vdmUgd2l0aCB3YXJwIGNhbiBiZSBzcGVjaWZpZWRcbiAgICAgKiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBtYWtlIHRoZSBvYmplY3Qgc3dheWluZyB3aXRoIHdhcnAgbW92ZW1lbnQuXG4gICAgICovXG4gICAgY2VudGVyPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGluZGV4IG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3IgY29sbGlzaW9ucyB3aXRoIHN3YXlpbmcgb2JqZWN0cy5cbiAgICAgKi9cbiAgICBjb2xsaWRlckdyb3Vwcz86IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIEFubm90YXRpb24gY29tbWVudFxuICAgICAqL1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIHJlc2lzdGFuY2UgKGRlY2VsZXJhdGlvbikgb2YgYXV0b21hdGljIGFuaW1hdGlvbi5cbiAgICAgKi9cbiAgICBkcmFnRm9yY2U/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIGRpcmVjdGlvbiBvZiBncmF2aXR5LiBTZXQgKDAsIC0xLCAwKSBmb3Igc2ltdWxhdGluZyB0aGUgZ3Jhdml0eS4gU2V0ICgxLCAwLCAwKSBmb3JcbiAgICAgKiBzaW11bGF0aW5nIHRoZSB3aW5kLlxuICAgICAqL1xuICAgIGdyYXZpdHlEaXI/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdHJlbmd0aCBvZiBncmF2aXR5LlxuICAgICAqL1xuICAgIGdyYXZpdHlQb3dlcj86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgdXNlZCBmb3IgdGhlIGNvbGxpc2lvbiBkZXRlY3Rpb24gd2l0aCBjb2xsaWRlcnMuXG4gICAgICovXG4gICAgaGl0UmFkaXVzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSByZXNpbGllbmNlIG9mIHRoZSBzd2F5aW5nIG9iamVjdCAodGhlIHBvd2VyIG9mIHJldHVybmluZyB0byB0aGUgaW5pdGlhbCBwb3NlKS5cbiAgICAgKi9cbiAgICBzdGlmZmluZXNzPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcmdyb3VwIHtcbiAgICBjb2xsaWRlcnM/OiBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcltdO1xuICAgIC8qKlxuICAgICAqIFRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3Igc2V0dGluZyB1cCBjb2xsaXNpb24gZGV0ZWN0aW9ucy5cbiAgICAgKi9cbiAgICBub2RlPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlciB7XG4gICAgLyoqXG4gICAgICogVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXG4gICAgICovXG4gICAgb2Zmc2V0PzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cbiAgICAgKi9cbiAgICByYWRpdXM/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFZlY3RvcjMge1xuICAgIHg/OiBudW1iZXI7XG4gICAgeT86IG51bWJlcjtcbiAgICB6PzogbnVtYmVyO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB0eXBlIHsgR0xURlByaW1pdGl2ZSwgR0xURlNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBHTFRGUHJpbWl0aXZlW10gfCBudWxsIHtcbiAgLyoqXG4gICAqIExldCdzIGxpc3QgdXAgZXZlcnkgcG9zc2libGUgcGF0dGVybnMgdGhhdCBwYXJzZWQgZ2x0ZiBub2RlcyB3aXRoIGEgbWVzaCBjYW4gaGF2ZSwsLFxuICAgKlxuICAgKiBcIipcIiBpbmRpY2F0ZXMgdGhhdCB0aG9zZSBtZXNoZXMgc2hvdWxkIGJlIGxpc3RlZCB1cCB1c2luZyB0aGlzIGZ1bmN0aW9uXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBhIHNpZ25sZSBwcmltaXRpdmUpXG4gICAqXG4gICAqIC0gYFRIUkVFLk1lc2hgOiBUaGUgb25seSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcylcbiAgICpcbiAgICogLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBBTkQgKGEgY2hpbGQgd2l0aCBhIG1lc2gsIGEgc2luZ2xlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcylcbiAgICpcbiAgICogLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiBhIE1FU0ggT0YgVEhFIENISUxEXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggb2YgdGhlIGNoaWxkXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggb2YgdGhlIGNoaWxkICgyKVxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQlVUIHRoZSBub2RlIGlzIGEgYm9uZVxuICAgKlxuICAgKiAtIGBUSFJFRS5Cb25lYDogVGhlIHJvb3Qgb2YgdGhlIG5vZGUsIGFzIGEgYm9uZVxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQlVUIHRoZSBub2RlIGlzIGEgYm9uZVxuICAgKlxuICAgKiAtIGBUSFJFRS5Cb25lYDogVGhlIHJvb3Qgb2YgdGhlIG5vZGUsIGFzIGEgYm9uZVxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqIC4uLkkgd2lsbCB0YWtlIGEgc3RyYXRlZ3kgdGhhdCB0cmF2ZXJzZXMgdGhlIHJvb3Qgb2YgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXMuXG4gICAqL1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBub2RlIGhhcyBhIG1lc2hcbiAgY29uc3Qgc2NoZW1hTm9kZTogR0xURlNjaGVtYS5Ob2RlID0gZ2x0Zi5wYXJzZXIuanNvbi5ub2Rlc1tub2RlSW5kZXhdO1xuICBjb25zdCBtZXNoSW5kZXggPSBzY2hlbWFOb2RlLm1lc2g7XG4gIGlmIChtZXNoSW5kZXggPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gSG93IG1hbnkgcHJpbWl0aXZlcyB0aGUgbWVzaCBoYXM/XG4gIGNvbnN0IHNjaGVtYU1lc2g6IEdMVEZTY2hlbWEuTWVzaCA9IGdsdGYucGFyc2VyLmpzb24ubWVzaGVzW21lc2hJbmRleF07XG4gIGNvbnN0IHByaW1pdGl2ZUNvdW50ID0gc2NoZW1hTWVzaC5wcmltaXRpdmVzLmxlbmd0aDtcblxuICAvLyBUcmF2ZXJzZSB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlc1xuICBjb25zdCBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10gPSBbXTtcbiAgbm9kZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgaWYgKHByaW1pdGl2ZXMubGVuZ3RoIDwgcHJpbWl0aXZlQ291bnQpIHtcbiAgICAgIGlmICgob2JqZWN0IGFzIGFueSkuaXNNZXNoKSB7XG4gICAgICAgIHByaW1pdGl2ZXMucHVzaChvYmplY3QgYXMgR0xURlByaW1pdGl2ZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcHJpbWl0aXZlcztcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIGEgbm9kZSBmcm9tIGEgbG9hZGVkIEdMVEYuXG4gKiBUaGUgbWFpbiBwdXJwb3NlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gZGlzdGluZ3Vpc2ggcHJpbWl0aXZlcyBhbmQgY2hpbGRyZW4gZnJvbSBhIG5vZGUgdGhhdCBoYXMgYm90aCBtZXNoZXMgYW5kIGNoaWxkcmVuLlxuICpcbiAqIEl0IHV0aWxpemVzIHRoZSBiZWhhdmlvciB0aGF0IEdMVEZMb2FkZXIgYWRkcyBtZXNoIHByaW1pdGl2ZXMgdG8gdGhlIG5vZGUgb2JqZWN0ICggYFRIUkVFLkdyb3VwYCApIGZpcnN0IHRoZW4gYWRkcyBpdHMgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIGdsdGYgQSBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAqIEBwYXJhbSBub2RlSW5kZXggVGhlIGluZGV4IG9mIHRoZSBub2RlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlcik6IFByb21pc2U8R0xURlByaW1pdGl2ZVtdIHwgbnVsbD4ge1xuICBjb25zdCBub2RlOiBUSFJFRS5PYmplY3QzRCA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBub2RlSW5kZXgpO1xuICByZXR1cm4gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBub2RlSW5kZXgsIG5vZGUpO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgcHJpbWl0aXZlcyAoIGBUSFJFRS5NZXNoW11gICkgb2Ygbm9kZXMgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogU2VlIHtAbGluayBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZX0gZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBJdCByZXR1cm5zIGEgbWFwIGZyb20gbm9kZSBpbmRleCB0byBleHRyYWN0aW9uIHJlc3VsdC5cbiAqIElmIGEgbm9kZSBkb2VzIG5vdCBoYXZlIGEgbWVzaCwgdGhlIGVudHJ5IGZvciB0aGUgbm9kZSB3aWxsIG5vdCBiZSBwdXQgaW4gdGhlIHJldHVybmluZyBtYXAuXG4gKlxuICogQHBhcmFtIGdsdGYgQSBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmOiBHTFRGKTogUHJvbWlzZTxNYXA8bnVtYmVyLCBHTFRGUHJpbWl0aXZlW10+PiB7XG4gIGNvbnN0IG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8bnVtYmVyLCBHTFRGUHJpbWl0aXZlW10+KCk7XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsKGdsdGYsIGluZGV4LCBub2RlKTtcbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIG1hcC5zZXQoaW5kZXgsIHJlc3VsdCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbWFwO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgIGNvbnNvbGUud2FybihgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eTogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xuXG4gIGlmICghL1tBLVpdLy50ZXN0KG5hbWVbMF0pKSB7XG4gICAgY29uc29sZS53YXJuKGByZW5hbWVNYXRlcmlhbFByb3BlcnR5OiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICByZXR1cm4gbmFtZVswXS50b0xvd2VyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2xhbXAgYW4gaW5wdXQgbnVtYmVyIHdpdGhpbiBbIGAwLjBgIC0gYDEuMGAgXS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIGlucHV0IHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXR1cmF0ZSh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCAxLjApLCAwLjApO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgcmFuZ2Ugb2YgYW4gaW5wdXQgdmFsdWUgZnJvbSBbIGBtaW5gIC0gYG1heGAgXSB0byBbIGAwLjBgIC0gYDEuMGAgXS5cbiAqIElmIGlucHV0IHZhbHVlIGlzIGxlc3MgdGhhbiBgbWluYCAsIGl0IHJldHVybnMgYDAuMGAuXG4gKiBJZiBpbnB1dCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gYG1heGAgLCBpdCByZXR1cm5zIGAxLjBgLlxuICpcbiAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9tYXRoL01hdGguc21vb3Roc3RlcFxuICpcbiAqIEBwYXJhbSB4IFRoZSB2YWx1ZSB0aGF0IHdpbGwgYmUgbWFwcGVkIGludG8gdGhlIHNwZWNpZmllZCByYW5nZVxuICogQHBhcmFtIG1pbiBNaW5pbXVtIHZhbHVlIG9mIHRoZSByYW5nZVxuICogQHBhcmFtIG1heCBNYXhpbXVtIHZhbHVlIG9mIHRoZSByYW5nZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGluc3RlcCh4OiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh4IDw9IG1pbikgcmV0dXJuIDA7XG4gIGlmICh4ID49IG1heCkgcmV0dXJuIDE7XG5cbiAgcmV0dXJuICh4IC0gbWluKSAvIChtYXggLSBtaW4pO1xufVxuXG5jb25zdCBfcG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3NjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9yb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogRXh0cmFjdCB3b3JsZCBwb3NpdGlvbiBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCBpbiBjaGVhcGVyIHdheS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgVGFyZ2V0IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRQb3NpdGlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2Uob3V0LCBfcm90YXRpb24sIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogRXh0cmFjdCB3b3JsZCBzY2FsZSBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCBpbiBjaGVhcGVyIHdheS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgVGFyZ2V0IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRTY2FsZUxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3Bvc2l0aW9uLCBfcm90YXRpb24sIG91dCk7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogRXh0cmFjdCB3b3JsZCByb3RhdGlvbiBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCBpbiBjaGVhcGVyIHdheS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgVGFyZ2V0IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsImltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNhdHVyYXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlR3JvdXAgfSBmcm9tICcuL1ZSTUJsZW5kU2hhcGVHcm91cCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1CbGVuZFNoYXBlUHJveHkge1xuICAvKipcbiAgICogTGlzdCBvZiByZWdpc3RlcmVkIGJsZW5kIHNoYXBlLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfYmxlbmRTaGFwZUdyb3VwczogeyBbbmFtZTogc3RyaW5nXTogVlJNQmxlbmRTaGFwZUdyb3VwIH0gPSB7fTtcblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBbW1ZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV1dIHRvIGl0cyBhY3R1YWwgYmxlbmQgc2hhcGUgbmFtZS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVQcmVzZXRNYXA6IHsgW3ByZXNldE5hbWUgaW4gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9ID0ge307XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBuYW1lIG9mIHVua25vd24gYmxlbmQgc2hhcGVzLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfdW5rbm93bkdyb3VwTmFtZXM6IHN0cmluZ1tdID0gW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1CbGVuZFNoYXBlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIG5hbWUgb2YgcmVnaXN0ZXJlZCBibGVuZCBzaGFwZSBncm91cC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9ibGVuZFNoYXBlR3JvdXBzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIFtbVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXV0gdG8gaXRzIGFjdHVhbCBibGVuZCBzaGFwZSBuYW1lLlxuICAgKi9cbiAgcHVibGljIGdldCBibGVuZFNoYXBlUHJlc2V0TWFwKCk6IHsgW3ByZXNldE5hbWUgaW4gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9IHtcbiAgICByZXR1cm4gdGhpcy5fYmxlbmRTaGFwZVByZXNldE1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgbmFtZSBvZiB1bmtub3duIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgdW5rbm93bkdyb3VwTmFtZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl91bmtub3duR3JvdXBOYW1lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gcmVnaXN0ZXJlZCBibGVuZCBzaGFwZSBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBnZXRCbGVuZFNoYXBlR3JvdXAobmFtZTogc3RyaW5nIHwgVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lKTogVlJNQmxlbmRTaGFwZUdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwcmVzZXROYW1lID0gdGhpcy5fYmxlbmRTaGFwZVByZXNldE1hcFtuYW1lIGFzIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV07XG4gICAgY29uc3QgY29udHJvbGxlciA9IHByZXNldE5hbWUgPyB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW3ByZXNldE5hbWVdIDogdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1tuYW1lXTtcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnNvbGUud2Fybihgbm8gYmxlbmQgc2hhcGUgZm91bmQgYnkgJHtuYW1lfWApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBibGVuZCBzaGFwZSBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ29ydXBcbiAgICogQHBhcmFtIGNvbnRyb2xsZXIgVlJNQmxlbmRTaGFwZUNvbnRyb2xsZXIgdGhhdCBkZXNjcmliZXMgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgcmVnaXN0ZXJCbGVuZFNoYXBlR3JvdXAoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHByZXNldE5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHVuZGVmaW5lZCxcbiAgICBjb250cm9sbGVyOiBWUk1CbGVuZFNoYXBlR3JvdXAsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV0gPSBjb250cm9sbGVyO1xuICAgIGlmIChwcmVzZXROYW1lKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwW3ByZXNldE5hbWVdID0gbmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdW5rbm93bkdyb3VwTmFtZXMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGN1cnJlbnQgd2VpZ2h0IG9mIHNwZWNpZmllZCBibGVuZCBzaGFwZSBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5nZXRCbGVuZFNoYXBlR3JvdXAobmFtZSk7XG4gICAgcmV0dXJuIGNvbnRyb2xsZXI/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqIEBwYXJhbSB3ZWlnaHQgV2VpZ2h0XG4gICAqL1xuICBwdWJsaWMgc2V0VmFsdWUobmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nLCB3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldEJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICBpZiAoY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlci53ZWlnaHQgPSBzYXR1cmF0ZSh3ZWlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB0cmFjayBuYW1lIG9mIHNwZWNpZmllZCBibGVuZCBzaGFwZSBncm91cC5cbiAgICogVGhpcyB0cmFjayBuYW1lIGlzIG5lZWRlZCB0byBtYW5pcHVsYXRlIGl0cyBibGVuZCBzaGFwZSBncm91cCB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhIGJsZW5kIHNoYXBlIGdyb3VwIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uYmxlbmRTaGFwZVByb3h5LmdldEJsZW5kU2hhcGVUcmFja05hbWUoIFRIUkVFLlZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5CbGluayApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIGdldEJsZW5kU2hhcGVUcmFja05hbWUobmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xuICAgIHJldHVybiBjb250cm9sbGVyID8gYCR7Y29udHJvbGxlci5uYW1lfS53ZWlnaHRgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZXZlcnkgYmxlbmQgc2hhcGUgZ3JvdXBzLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9ibGVuZFNoYXBlR3JvdXBzKS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1tuYW1lXTtcbiAgICAgIGNvbnRyb2xsZXIuY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLl9ibGVuZFNoYXBlR3JvdXBzKS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1tuYW1lXTtcbiAgICAgIGNvbnRyb2xsZXIuYXBwbHlXZWlnaHQoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgR0xURlNjaGVtYSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyByZW5hbWVNYXRlcmlhbFByb3BlcnR5IH0gZnJvbSAnLi4vdXRpbHMvcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eSc7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlR3JvdXAgfSBmcm9tICcuL1ZSTUJsZW5kU2hhcGVHcm91cCc7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlUHJveHkgfSBmcm9tICcuL1ZSTUJsZW5kU2hhcGVQcm94eSc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1CbGVuZFNoYXBlXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZUltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNQmxlbmRTaGFwZV1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1CbGVuZFNoYXBlUHJveHkgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJsZW5kU2hhcGU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlIHwgdW5kZWZpbmVkID0gdnJtRXh0LmJsZW5kU2hhcGVNYXN0ZXI7XG4gICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBibGVuZFNoYXBlID0gbmV3IFZSTUJsZW5kU2hhcGVQcm94eSgpO1xuXG4gICAgY29uc3QgYmxlbmRTaGFwZUdyb3VwczogVlJNU2NoZW1hLkJsZW5kU2hhcGVHcm91cFtdIHwgdW5kZWZpbmVkID0gc2NoZW1hQmxlbmRTaGFwZS5ibGVuZFNoYXBlR3JvdXBzO1xuICAgIGlmICghYmxlbmRTaGFwZUdyb3Vwcykge1xuICAgICAgcmV0dXJuIGJsZW5kU2hhcGU7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZVByZXNldE1hcDogeyBbcHJlc2V0TmFtZSBpbiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdPzogc3RyaW5nIH0gPSB7fTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgYmxlbmRTaGFwZUdyb3Vwcy5tYXAoYXN5bmMgKHNjaGVtYUdyb3VwKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBzY2hlbWFHcm91cC5uYW1lO1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUk1CbGVuZFNoYXBlSW1wb3J0ZXI6IE9uZSBvZiBibGVuZFNoYXBlR3JvdXBzIGhhcyBubyBuYW1lJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByZXNldE5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNjaGVtYUdyb3VwLnByZXNldE5hbWUgJiZcbiAgICAgICAgICBzY2hlbWFHcm91cC5wcmVzZXROYW1lICE9PSBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuVW5rbm93biAmJlxuICAgICAgICAgICFibGVuZFNoYXBlUHJlc2V0TWFwW3NjaGVtYUdyb3VwLnByZXNldE5hbWVdXG4gICAgICAgICkge1xuICAgICAgICAgIHByZXNldE5hbWUgPSBzY2hlbWFHcm91cC5wcmVzZXROYW1lO1xuICAgICAgICAgIGJsZW5kU2hhcGVQcmVzZXRNYXBbc2NoZW1hR3JvdXAucHJlc2V0TmFtZV0gPSBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgVlJNQmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xuICAgICAgICBnbHRmLnNjZW5lLmFkZChncm91cCk7XG5cbiAgICAgICAgZ3JvdXAuaXNCaW5hcnkgPSBzY2hlbWFHcm91cC5pc0JpbmFyeSB8fCBmYWxzZTtcblxuICAgICAgICBpZiAoc2NoZW1hR3JvdXAuYmluZHMpIHtcbiAgICAgICAgICBzY2hlbWFHcm91cC5iaW5kcy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZC5tZXNoID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm9kZXNVc2luZ01lc2g6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICAoZ2x0Zi5wYXJzZXIuanNvbi5ub2RlcyBhcyBHTFRGU2NoZW1hLk5vZGVbXSkuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5tZXNoID09PSBiaW5kLm1lc2gpIHtcbiAgICAgICAgICAgICAgICBub2Rlc1VzaW5nTWVzaC5wdXNoKGkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmRleCA9IGJpbmQuaW5kZXg7XG5cbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICBub2Rlc1VzaW5nTWVzaC5tYXAoYXN5bmMgKG5vZGVJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0Ziwgbm9kZUluZGV4KSkhO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgYFZSTUJsZW5kU2hhcGVJbXBvcnRlcjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBncm91cC5hZGRCaW5kKHtcbiAgICAgICAgICAgICAgICAgIG1lc2hlczogcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGJpbmQud2VpZ2h0ID8/IDEwMCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzKSB7XG4gICAgICAgICAgbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT4gbXRsLm5hbWUgPT09IG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lISAmJiBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGdyb3VwLmFkZE1hdGVyaWFsVmFsdWUoe1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSEpLFxuICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlISxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsZW5kU2hhcGUucmVnaXN0ZXJCbGVuZFNoYXBlR3JvdXAobmFtZSwgcHJlc2V0TmFtZSwgZ3JvdXApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBibGVuZFNoYXBlO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGTm9kZSwgR0xURlByaW1pdGl2ZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcblxuY29uc3QgVkVDVE9SM19GUk9OVCA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIC0xLjApKTtcblxuY29uc3QgX3F1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5lbnVtIEZpcnN0UGVyc29uRmxhZyB7XG4gIEF1dG8sXG4gIEJvdGgsXG4gIFRoaXJkUGVyc29uT25seSxcbiAgRmlyc3RQZXJzb25Pbmx5LFxufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBbYG1lc2hBbm5vdGF0aW9uYF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uLzAuMC9zY2hlbWEvdnJtLmZpcnN0cGVyc29uLm1lc2hhbm5vdGF0aW9uLnNjaGVtYS5qc29uKSBlbnRyeS5cbiAqIEVhY2ggbWVzaCB3aWxsIGJlIGFzc2lnbmVkIHRvIHNwZWNpZmllZCBsYXllciB3aGVuIHlvdSBjYWxsIFtbVlJNRmlyc3RQZXJzb24uc2V0dXBdXS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyB7XG4gIHByaXZhdGUgc3RhdGljIF9wYXJzZUZpcnN0UGVyc29uRmxhZyhmaXJzdFBlcnNvbkZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IEZpcnN0UGVyc29uRmxhZyB7XG4gICAgc3dpdGNoIChmaXJzdFBlcnNvbkZsYWcpIHtcbiAgICAgIGNhc2UgJ0JvdGgnOlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkJvdGg7XG4gICAgICBjYXNlICdUaGlyZFBlcnNvbk9ubHknOlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLlRoaXJkUGVyc29uT25seTtcbiAgICAgIGNhc2UgJ0ZpcnN0UGVyc29uT25seSc6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuRmlyc3RQZXJzb25Pbmx5O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5BdXRvO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIFtbRmlyc3RQZXJzb25GbGFnXV0gb2YgdGhlIGFubm90YXRpb24gZW50cnkuXG4gICAqL1xuICBwdWJsaWMgZmlyc3RQZXJzb25GbGFnOiBGaXJzdFBlcnNvbkZsYWc7XG5cbiAgLyoqXG4gICAqIEEgbWVzaCBwcmltaXRpdmVzIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgcHVibGljIHByaW1pdGl2ZXM6IEdMVEZQcmltaXRpdmVbXTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG1lc2ggYW5ub3RhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uRmxhZyBBIFtbRmlyc3RQZXJzb25GbGFnXV0gb2YgdGhlIGFubm90YXRpb24gZW50cnlcbiAgICogQHBhcmFtIG5vZGUgQSBub2RlIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZmlyc3RQZXJzb25GbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQsIHByaW1pdGl2ZXM6IEdMVEZQcmltaXRpdmVbXSkge1xuICAgIHRoaXMuZmlyc3RQZXJzb25GbGFnID0gVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzLl9wYXJzZUZpcnN0UGVyc29uRmxhZyhmaXJzdFBlcnNvbkZsYWcpO1xuICAgIHRoaXMucHJpbWl0aXZlcyA9IHByaW1pdGl2ZXM7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uIHtcbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0Rmlyc3RQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0RFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUiA9IDk7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0VGhpcmRQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUiA9IDEwO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpcnN0UGVyc29uQm9uZTogR0xURk5vZGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hBbm5vdGF0aW9uczogVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzW10gPSBbXTtcbiAgcHJpdmF0ZSByZWFkb25seSBfZmlyc3RQZXJzb25Cb25lT2Zmc2V0OiBUSFJFRS5WZWN0b3IzO1xuXG4gIHByaXZhdGUgX2ZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUjtcbiAgcHJpdmF0ZSBfdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSO1xuXG4gIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1GaXJzdFBlcnNvbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvbkJvbmUgQSBmaXJzdCBwZXJzb24gYm9uZVxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb25Cb25lT2Zmc2V0IEFuIG9mZnNldCBmcm9tIHRoZSBzcGVjaWZpZWQgZmlyc3QgcGVyc29uIGJvbmVcbiAgICogQHBhcmFtIG1lc2hBbm5vdGF0aW9ucyBBIHJlbmRlcmVyIHNldHRpbmdzLiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIFtbUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzXV0gZm9yIG1vcmUgaW5mb1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgZmlyc3RQZXJzb25Cb25lOiBHTFRGTm9kZSxcbiAgICBmaXJzdFBlcnNvbkJvbmVPZmZzZXQ6IFRIUkVFLlZlY3RvcjMsXG4gICAgbWVzaEFubm90YXRpb25zOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSxcbiAgKSB7XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Cb25lID0gZmlyc3RQZXJzb25Cb25lO1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uQm9uZU9mZnNldCA9IGZpcnN0UGVyc29uQm9uZU9mZnNldDtcbiAgICB0aGlzLl9tZXNoQW5ub3RhdGlvbnMgPSBtZXNoQW5ub3RhdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZpcnN0UGVyc29uQm9uZSgpOiBHTFRGTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uQm9uZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVzaEFubm90YXRpb25zKCk6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdIHtcbiAgICByZXR1cm4gdGhpcy5fbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldEZpcnN0UGVyc29uV29ybGREaXJlY3Rpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgcmV0dXJuIHRhcmdldC5jb3B5KFZFQ1RPUjNfRlJPTlQpLmFwcGx5UXVhdGVybmlvbihnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuX2ZpcnN0UGVyc29uQm9uZSwgX3F1YXQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIFtbc2V0dXBdXSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyBbW0RFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUl1dIGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSBbW3NldHVwXV0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwgW1tzZXR1cF1dIGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIFtbREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSXV0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIFtbc2V0dXBdXSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgdGhpcmRQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25Cb25lT2Zmc2V0KHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwZXJzb24uXG4gICAqIFRoZSBwb3NpdGlvbiB0YWtlcyBbW0ZpcnN0UGVyc29uQm9uZV1dIGFuZCBbW0ZpcnN0UGVyc29uT2Zmc2V0XV0gaW50byBhY2NvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gdjMgdGFyZ2V0XG4gICAqIEByZXR1cm5zIEN1cnJlbnQgd29ybGQgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHBlcnNvblxuICAgKi9cbiAgcHVibGljIGdldEZpcnN0UGVyc29uV29ybGRQb3NpdGlvbih2MzogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIC8vIFVuaVZSTSNWUk1GaXJzdFBlcnNvbkVkaXRvclxuICAgIC8vIHZhciB3b3JsZE9mZnNldCA9IGhlYWQubG9jYWxUb1dvcmxkTWF0cml4Lk11bHRpcGx5UG9pbnQoY29tcG9uZW50LkZpcnN0UGVyc29uT2Zmc2V0KTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQ7XG4gICAgY29uc3QgdjQgPSBuZXcgVEhSRUUuVmVjdG9yNChvZmZzZXQueCwgb2Zmc2V0LnksIG9mZnNldC56LCAxLjApO1xuICAgIHY0LmFwcGx5TWF0cml4NCh0aGlzLl9maXJzdFBlcnNvbkJvbmUubWF0cml4V29ybGQpO1xuICAgIHJldHVybiB2My5zZXQodjQueCwgdjQueSwgdjQueik7XG4gIH1cblxuICAvKipcbiAgICogSW4gdGhpcyBtZXRob2QsIGl0IGFzc2lnbnMgbGF5ZXJzIGZvciBldmVyeSBtZXNoZXMgYmFzZWQgb24gbWVzaCBhbm5vdGF0aW9ucy5cbiAgICogWW91IG11c3QgY2FsbCB0aGlzIG1ldGhvZCBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZS5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIFtWUk1GaXJzdFBlcnNvbi5TZXR1cF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iL21hc3Rlci9Bc3NldHMvVlJNL1VuaVZSTS9TY3JpcHRzL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzKSBvZiB0aGUgVW5pVlJNLlxuICAgKlxuICAgKiBUaGUgYGNhbWVyYUxheWVyYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIHdoaWNoIGxheWVyIHdpbGwgYmUgYXNzaWduZWQgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqIEluIFVuaVZSTSwgd2Ugc3BlY2lmaWVkIHRob3NlIGJ5IG5hbWluZyBlYWNoIGRlc2lyZWQgbGF5ZXIgYXMgYEZJUlNUUEVSU09OX09OTFlfTEFZRVJgIC8gYFRISVJEUEVSU09OX09OTFlfTEFZRVJgXG4gICAqIGJ1dCB3ZSBhcmUgZ29pbmcgdG8gc3BlY2lmeSB0aGVzZSBsYXllcnMgYXQgaGVyZSBzaW5jZSB3ZSBhcmUgdW5hYmxlIHRvIG5hbWUgbGF5ZXJzIGluIFRocmVlLmpzLlxuICAgKlxuICAgKiBAcGFyYW0gY2FtZXJhTGF5ZXIgU3BlY2lmeSB3aGljaCBsYXllciB3aWxsIGJlIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKi9cbiAgcHVibGljIHNldHVwKHtcbiAgICBmaXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIsXG4gICAgdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSLFxuICB9ID0ge30pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyID0gZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gICAgdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSB0aGlyZFBlcnNvbk9ubHlMYXllcjtcblxuICAgIHRoaXMuX21lc2hBbm5vdGF0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5GaXJzdFBlcnNvbk9ubHkpIHtcbiAgICAgICAgaXRlbS5wcmltaXRpdmVzLmZvckVhY2goKHByaW1pdGl2ZSkgPT4ge1xuICAgICAgICAgIHByaW1pdGl2ZS5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuVGhpcmRQZXJzb25Pbmx5KSB7XG4gICAgICAgIGl0ZW0ucHJpbWl0aXZlcy5mb3JFYWNoKChwcmltaXRpdmUpID0+IHtcbiAgICAgICAgICBwcmltaXRpdmUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLkF1dG8pIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbChpdGVtLnByaW1pdGl2ZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhjbHVkZVRyaWFuZ2xlcyh0cmlhbmdsZXM6IG51bWJlcltdLCBid3M6IG51bWJlcltdW10sIHNraW5JbmRleDogbnVtYmVyW11bXSwgZXhjbHVkZTogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaWYgKGJ3cyAhPSBudWxsICYmIGJ3cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICBjb25zdCBhID0gdHJpYW5nbGVzW2ldO1xuICAgICAgICBjb25zdCBiID0gdHJpYW5nbGVzW2kgKyAxXTtcbiAgICAgICAgY29uc3QgYyA9IHRyaWFuZ2xlc1tpICsgMl07XG4gICAgICAgIGNvbnN0IGJ3MCA9IGJ3c1thXTtcbiAgICAgICAgY29uc3Qgc2tpbjAgPSBza2luSW5kZXhbYV07XG5cbiAgICAgICAgaWYgKGJ3MFswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MSA9IGJ3c1tiXTtcbiAgICAgICAgY29uc3Qgc2tpbjEgPSBza2luSW5kZXhbYl07XG4gICAgICAgIGlmIChidzFbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzIgPSBid3NbY107XG4gICAgICAgIGNvbnN0IHNraW4yID0gc2tpbkluZGV4W2NdO1xuICAgICAgICBpZiAoYncyWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYTtcbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYjtcbiAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRXJhc2VkTWVzaChzcmM6IFRIUkVFLlNraW5uZWRNZXNoLCBlcmFzaW5nQm9uZXNJbmRleDogbnVtYmVyW10pOiBUSFJFRS5Ta2lubmVkTWVzaCB7XG4gICAgY29uc3QgZHN0ID0gbmV3IFRIUkVFLlNraW5uZWRNZXNoKHNyYy5nZW9tZXRyeS5jbG9uZSgpLCBzcmMubWF0ZXJpYWwpO1xuICAgIGRzdC5uYW1lID0gYCR7c3JjLm5hbWV9KGVyYXNlKWA7XG4gICAgZHN0LmZydXN0dW1DdWxsZWQgPSBzcmMuZnJ1c3R1bUN1bGxlZDtcbiAgICBkc3QubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG5cbiAgICBjb25zdCBnZW9tZXRyeSA9IGRzdC5nZW9tZXRyeTtcblxuICAgIGNvbnN0IHNraW5JbmRleEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5JbmRleCcpLmFycmF5O1xuICAgIGNvbnN0IHNraW5JbmRleCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbkluZGV4QXR0ci5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbkluZGV4LnB1c2goW3NraW5JbmRleEF0dHJbaV0sIHNraW5JbmRleEF0dHJbaSArIDFdLCBza2luSW5kZXhBdHRyW2kgKyAyXSwgc2tpbkluZGV4QXR0cltpICsgM11dKTtcbiAgICB9XG5cbiAgICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpLmFycmF5O1xuICAgIGNvbnN0IHNraW5XZWlnaHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5XZWlnaHRBdHRyLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luV2VpZ2h0LnB1c2goW3NraW5XZWlnaHRBdHRyW2ldLCBza2luV2VpZ2h0QXR0cltpICsgMV0sIHNraW5XZWlnaHRBdHRyW2kgKyAyXSwgc2tpbldlaWdodEF0dHJbaSArIDNdXSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBnZW9tZXRyeS5nZXRJbmRleCgpO1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBnZW9tZXRyeSBkb2Vzbid0IGhhdmUgYW4gaW5kZXggYnVmZmVyXCIpO1xuICAgIH1cbiAgICBjb25zdCBvbGRUcmlhbmdsZXMgPSBBcnJheS5mcm9tKGluZGV4LmFycmF5KTtcblxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5fZXhjbHVkZVRyaWFuZ2xlcyhvbGRUcmlhbmdsZXMsIHNraW5XZWlnaHQsIHNraW5JbmRleCwgZXJhc2luZ0JvbmVzSW5kZXgpO1xuICAgIGNvbnN0IG5ld1RyaWFuZ2xlOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgbmV3VHJpYW5nbGVbaV0gPSBvbGRUcmlhbmdsZXNbaV07XG4gICAgfVxuICAgIGdlb21ldHJ5LnNldEluZGV4KG5ld1RyaWFuZ2xlKTtcblxuICAgIC8vIG10b29uIG1hdGVyaWFsIGluY2x1ZGVzIG9uQmVmb3JlUmVuZGVyLiB0aGlzIGlzIHVuc3VwcG9ydGVkIGF0IFNraW5uZWRNZXNoI2Nsb25lXG4gICAgaWYgKHNyYy5vbkJlZm9yZVJlbmRlcikge1xuICAgICAgZHN0Lm9uQmVmb3JlUmVuZGVyID0gc3JjLm9uQmVmb3JlUmVuZGVyO1xuICAgIH1cbiAgICBkc3QuYmluZChuZXcgVEhSRUUuU2tlbGV0b24oc3JjLnNrZWxldG9uLmJvbmVzLCBzcmMuc2tlbGV0b24uYm9uZUludmVyc2VzKSwgbmV3IFRIUkVFLk1hdHJpeDQoKSk7XG4gICAgcmV0dXJuIGRzdDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQ6IFRIUkVFLk9iamVjdDNELCBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCk6IHZvaWQge1xuICAgIGNvbnN0IGVyYXNlQm9uZUluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgbWVzaC5za2VsZXRvbi5ib25lcy5mb3JFYWNoKChib25lLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZSkpIGVyYXNlQm9uZUluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICAvLyBVbmxpa2UgVW5pVlJNIHdlIGRvbid0IGNvcHkgbWVzaCBpZiBubyBpbnZpc2libGUgYm9uZSB3YXMgZm91bmRcbiAgICBpZiAoIWVyYXNlQm9uZUluZGV4ZXMubGVuZ3RoKSB7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICBjb25zdCBuZXdNZXNoID0gdGhpcy5fY3JlYXRlRXJhc2VkTWVzaChtZXNoLCBlcmFzZUJvbmVJbmRleGVzKTtcbiAgICBwYXJlbnQuYWRkKG5ld01lc2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbChwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10pOiB2b2lkIHtcbiAgICBwcmltaXRpdmVzLmZvckVhY2goKHByaW1pdGl2ZSkgPT4ge1xuICAgICAgaWYgKHByaW1pdGl2ZS50eXBlID09PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gcHJpbWl0aXZlIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2goc2tpbm5lZE1lc2gucGFyZW50ISwgc2tpbm5lZE1lc2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQocHJpbWl0aXZlKSkge1xuICAgICAgICAgIHByaW1pdGl2ZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0IGp1c3QgY2hlY2tzIHdoZXRoZXIgdGhlIG5vZGUgb3IgaXRzIHBhcmVudCBpcyB0aGUgZmlyc3QgcGVyc29uIGJvbmUgb3Igbm90LlxuICAgKiBAcGFyYW0gYm9uZSBUaGUgdGFyZ2V0IGJvbmVcbiAgICovXG4gIHByaXZhdGUgX2lzRXJhc2VUYXJnZXQoYm9uZTogR0xURk5vZGUpOiBib29sZWFuIHtcbiAgICBpZiAoYm9uZSA9PT0gdGhpcy5fZmlyc3RQZXJzb25Cb25lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFib25lLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNFcmFzZVRhcmdldChib25lLnBhcmVudCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IEdMVEZOb2RlLCBHTFRGU2NoZW1hLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiwgVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbic7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1GaXJzdFBlcnNvbl1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1GaXJzdFBlcnNvbl1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSBbW1ZSTUh1bWFub2lkXV0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURiwgaHVtYW5vaWQ6IFZSTUh1bWFub2lkKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFZSTVNjaGVtYS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBlcnNvbkJvbmVJbmRleCA9IHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZTtcblxuICAgIGxldCBmaXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlIHwgbnVsbDtcbiAgICBpZiAoZmlyc3RQZXJzb25Cb25lSW5kZXggPT09IHVuZGVmaW5lZCB8fCBmaXJzdFBlcnNvbkJvbmVJbmRleCA9PT0gLTEpIHtcbiAgICAgIGZpcnN0UGVyc29uQm9uZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lLkhlYWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBlcnNvbkJvbmUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgZmlyc3RQZXJzb25Cb25lSW5kZXgpO1xuICAgIH1cblxuICAgIGlmICghZmlyc3RQZXJzb25Cb25lKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUZpcnN0UGVyc29uSW1wb3J0ZXI6IENvdWxkIG5vdCBmaW5kIGZpcnN0UGVyc29uQm9uZSBvZiB0aGUgVlJNJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQgPSBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXRcbiAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LngsXG4gICAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnksXG4gICAgICAgICAgLXNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC56ISwgLy8gVlJNIDAuMCB1c2VzIGxlZnQtaGFuZGVkIHktdXBcbiAgICAgICAgKVxuICAgICAgOiBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMDYsIDAuMCk7IC8vIGZhbGxiYWNrLCB0YWtlbiBmcm9tIFVuaVZSTSBpbXBsZW1lbnRhdGlvblxuXG4gICAgY29uc3QgbWVzaEFubm90YXRpb25zOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuXG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlOiBHTFRGU2NoZW1hLk5vZGUgPSBnbHRmLnBhcnNlci5qc29uLm5vZGVzW25vZGVJbmRleF07XG5cbiAgICAgIGNvbnN0IGZsYWcgPSBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnNcbiAgICAgICAgPyBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnMuZmluZCgoYSkgPT4gYS5tZXNoID09PSBzY2hlbWFOb2RlLm1lc2gpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2gobmV3IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyhmbGFnPy5maXJzdFBlcnNvbkZsYWcsIHByaW1pdGl2ZXMpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oZmlyc3RQZXJzb25Cb25lLCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEZOb2RlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5MaW1pdCB9IGZyb20gJy4vVlJNSHVtYW5MaW1pdCc7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIGBodW1hbkJvbmVgIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5Cb25lIHtcbiAgLyoqXG4gICAqIEEgW1tHTFRGTm9kZV1dICh0aGF0IGFjdHVhbGx5IGlzIGEgYFRIUkVFLk9iamVjdDNEYCkgdGhhdCByZXByZXNlbnRzIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG5vZGU6IEdMVEZOb2RlO1xuXG4gIC8qKlxuICAgKiBBIFtbVlJNSHVtYW5MaW1pdF1dIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbkxpbWl0OiBWUk1IdW1hbkxpbWl0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNSHVtYW5Cb25lLlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZSBBIFtbR0xURk5vZGVdXSB0aGF0IHJlcHJlc2VudHMgdGhlIG5ldyBib25lXG4gICAqIEBwYXJhbSBodW1hbkxpbWl0IEEgW1tWUk1IdW1hbkxpbWl0XV0gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBwcm9wZXJ0aWVzIG9mIHRoZSBuZXcgYm9uZVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG5vZGU6IEdMVEZOb2RlLCBodW1hbkxpbWl0OiBWUk1IdW1hbkxpbWl0KSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLmh1bWFuTGltaXQgPSBodW1hbkxpbWl0O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQSBjb21wYXQgZnVuY3Rpb24gZm9yIGBRdWF0ZXJuaW9uLmludmVydCgpYCAvIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAuXG4gKiBgUXVhdGVybmlvbi5pbnZlcnQoKWAgaXMgaW50cm9kdWNlZCBpbiByMTIzIGFuZCBgUXVhdGVybmlvbi5pbnZlcnNlKClgIGVtaXRzIGEgd2FybmluZy5cbiAqIFdlIGFyZSBnb2luZyB0byB1c2UgdGhpcyBjb21wYXQgZm9yIGEgd2hpbGUuXG4gKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IHF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLlF1YXRlcm5pb24+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuaW52ZXJzZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZOb2RlLCBSYXdWZWN0b3IzLCBSYXdWZWN0b3I0LCBWUk1Qb3NlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVBcnJheSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lQXJyYXknO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgeyBWUk1IdW1hbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi9WUk1IdW1hbkRlc2NyaXB0aW9uJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBodW1hbm9pZCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkIHtcbiAgLyoqXG4gICAqIEEgW1tWUk1IdW1hbkJvbmVzXV0gdGhhdCBjb250YWlucyBhbGwgdGhlIGh1bWFuIGJvbmVzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGdldCB0aGVzZSBib25lcyB1c2luZyBbW1ZSTUh1bWFub2lkLmdldEJvbmVdXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzO1xuXG4gIC8qKlxuICAgKiBBIFtbVlJNSHVtYW5EZXNjcmlwdGlvbl1dIHRoYXQgcmVwcmVzZW50cyBwcm9wZXJ0aWVzIG9mIHRoZSBodW1hbm9pZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbkRlc2NyaXB0aW9uOiBWUk1IdW1hbkRlc2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBBIFtbVlJNUG9zZV1dIHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGggYHNldFBvc2VgIGFuZCBgZ2V0UG9zZWAsIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHJlc3RQb3NlOiBWUk1Qb3NlID0ge307XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBbW1ZSTUh1bWFub2lkXV0uXG4gICAqIEBwYXJhbSBib25lQXJyYXkgQSBbW1ZSTUh1bWFuQm9uZUFycmF5XV0gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqIEBwYXJhbSBodW1hbkRlc2NyaXB0aW9uIEEgW1tWUk1IdW1hbkRlc2NyaXB0aW9uXV0gdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGJvbmVBcnJheTogVlJNSHVtYW5Cb25lQXJyYXksIGh1bWFuRGVzY3JpcHRpb246IFZSTUh1bWFuRGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmh1bWFuQm9uZXMgPSB0aGlzLl9jcmVhdGVIdW1hbkJvbmVzKGJvbmVBcnJheSk7XG4gICAgdGhpcy5odW1hbkRlc2NyaXB0aW9uID0gaHVtYW5EZXNjcmlwdGlvbjtcblxuICAgIHRoaXMucmVzdFBvc2UgPSB0aGlzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEgW1tWUk1Qb3NlXV0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc3QgcG9zZTogVlJNUG9zZSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgodnJtQm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKHZybUJvbmVOYW1lIGFzIFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKSE7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiB0aGVyZSBhcmUgdHdvIG9yIG1vcmUgYm9uZXMgaW4gYSBzYW1lIG5hbWUsIHdlIGFyZSBub3QgZ29pbmcgdG8gb3ZlcndyaXRlIGV4aXN0aW5nIG9uZVxuICAgICAgaWYgKHBvc2VbdnJtQm9uZU5hbWVdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGFrZSBhIGRpZmYgZnJvbSByZXN0UG9zZVxuICAgICAgLy8gbm90ZSB0aGF0IHJlc3RQb3NlIGFsc28gd2lsbCB1c2UgZ2V0UG9zZSB0byBpbml0aWFsaXplIGl0c2VsZlxuICAgICAgX3YzQS5zZXQoMCwgMCwgMCk7XG4gICAgICBfcXVhdEEuaWRlbnRpdHkoKTtcblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVt2cm1Cb25lTmFtZV07XG4gICAgICBpZiAocmVzdFN0YXRlPy5wb3NpdGlvbikge1xuICAgICAgICBfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pLm5lZ2F0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3RTdGF0ZT8ucm90YXRpb24pIHtcbiAgICAgICAgcXVhdEludmVydENvbXBhdChfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5hZGQobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEucHJlbXVsdGlwbHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgcG9zZVt2cm1Cb25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBSYXdWZWN0b3IzLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBSYXdWZWN0b3I0LFxuICAgICAgfTtcbiAgICB9LCB7fSBhcyBWUk1Qb3NlKTtcbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIGh1bWFub2lkIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UG9zZX0uXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEgW1tWUk1Qb3NlXV0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyhwb3NlT2JqZWN0KS5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBwb3NlT2JqZWN0W2JvbmVOYW1lXSE7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSBhcyBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgcG9zZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKCFyZXN0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgICBub2RlLnBvc2l0aW9uLmFkZChfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShzdGF0ZS5yb3RhdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3RTdGF0ZS5yb3RhdGlvbikge1xuICAgICAgICAgIG5vZGUucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEEuZnJvbUFycmF5KHJlc3RTdGF0ZS5yb3RhdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQb3NlKCk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMucmVzdFBvc2UpLmZvckVhY2goKFtib25lTmFtZSwgcmVzdF0pID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lIGFzIFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTtcblxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHJlc3QucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShyZXN0LnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGEgW1tWUk1IdW1hbkJvbmVdXS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZXNdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGJvbmVzIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGFuIGFycmF5IG9mIFtbVlJNSHVtYW5Cb25lXV0uXG4gICAqIElmIHRoZXJlIGFyZSBubyBib25lcyBib3VuZCB0byB0aGUgc3BlY2lmaWVkIEh1bWFuQm9uZSwgaXQgd2lsbCByZXR1cm4gYW4gZW1wdHkgYXJyYXkuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZXMobmFtZTogVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmVbXSB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXSA/PyBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGEgVEhSRUUuT2JqZWN0M0QuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVOb2Rlc11dXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IEdMVEZOb2RlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXT8ubm9kZSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBib25lcyBib3VuZCB0byBhIHNwZWNpZmllZCBbW0h1bWFuQm9uZV1dLCBhcyBhbiBhcnJheSBvZiBUSFJFRS5PYmplY3QzRC5cbiAgICogSWYgdGhlcmUgYXJlIG5vIGJvbmVzIGJvdW5kIHRvIHRoZSBzcGVjaWZpZWQgSHVtYW5Cb25lLCBpdCB3aWxsIHJldHVybiBhbiBlbXB0eSBhcnJheS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZU5vZGVdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGVzKG5hbWU6IFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTogR0xURk5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXT8ubWFwKChib25lKSA9PiBib25lLm5vZGUpID8/IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgYSBbW1ZSTUh1bWFuQm9uZXNdXSBmcm9tIGEgW1tWUk1IdW1hbkJvbmVBcnJheV1dLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSHVtYW5Cb25lcyhib25lQXJyYXk6IFZSTUh1bWFuQm9uZUFycmF5KTogVlJNSHVtYW5Cb25lcyB7XG4gICAgY29uc3QgYm9uZXM6IFZSTUh1bWFuQm9uZXMgPSBPYmplY3QudmFsdWVzKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKS5yZWR1Y2UoKGFjY3VtLCBuYW1lKSA9PiB7XG4gICAgICBhY2N1bVtuYW1lXSA9IFtdO1xuICAgICAgcmV0dXJuIGFjY3VtO1xuICAgIH0sIHt9IGFzIFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4pIGFzIFZSTUh1bWFuQm9uZXM7XG5cbiAgICBib25lQXJyYXkuZm9yRWFjaCgoYm9uZSkgPT4ge1xuICAgICAgYm9uZXNbYm9uZS5uYW1lXS5wdXNoKGJvbmUuYm9uZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYm9uZXM7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZUFycmF5IH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVBcnJheSc7XG5pbXBvcnQgeyBWUk1IdW1hbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi9WUk1IdW1hbkRlc2NyaXB0aW9uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9WUk1IdW1hbm9pZCc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1IdW1hbm9pZF1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1IdW1hbm9pZF1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQ6IFZSTVNjaGVtYS5IdW1hbm9pZCB8IHVuZGVmaW5lZCA9IHZybUV4dC5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbkJvbmVBcnJheTogVlJNSHVtYW5Cb25lQXJyYXkgPSBbXTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcykge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMubWFwKGFzeW5jIChib25lKSA9PiB7XG4gICAgICAgICAgaWYgKCFib25lLmJvbmUgfHwgYm9uZS5ub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGJvbmUubm9kZSk7XG4gICAgICAgICAgaHVtYW5Cb25lQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBib25lLmJvbmUsXG4gICAgICAgICAgICBib25lOiBuZXcgVlJNSHVtYW5Cb25lKG5vZGUsIHtcbiAgICAgICAgICAgICAgYXhpc0xlbmd0aDogYm9uZS5heGlzTGVuZ3RoLFxuICAgICAgICAgICAgICBjZW50ZXI6IGJvbmUuY2VudGVyICYmIG5ldyBUSFJFRS5WZWN0b3IzKGJvbmUuY2VudGVyLngsIGJvbmUuY2VudGVyLnksIGJvbmUuY2VudGVyLnopLFxuICAgICAgICAgICAgICBtYXg6IGJvbmUubWF4ICYmIG5ldyBUSFJFRS5WZWN0b3IzKGJvbmUubWF4LngsIGJvbmUubWF4LnksIGJvbmUubWF4LnopLFxuICAgICAgICAgICAgICBtaW46IGJvbmUubWluICYmIG5ldyBUSFJFRS5WZWN0b3IzKGJvbmUubWluLngsIGJvbmUubWluLnksIGJvbmUubWluLnopLFxuICAgICAgICAgICAgICB1c2VEZWZhdWx0VmFsdWVzOiBib25lLnVzZURlZmF1bHRWYWx1ZXMsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFuRGVzY3JpcHRpb246IFZSTUh1bWFuRGVzY3JpcHRpb24gPSB7XG4gICAgICBhcm1TdHJldGNoOiBzY2hlbWFIdW1hbm9pZC5hcm1TdHJldGNoLFxuICAgICAgbGVnU3RyZXRjaDogc2NoZW1hSHVtYW5vaWQubGVnU3RyZXRjaCxcbiAgICAgIHVwcGVyQXJtVHdpc3Q6IHNjaGVtYUh1bWFub2lkLnVwcGVyQXJtVHdpc3QsXG4gICAgICBsb3dlckFybVR3aXN0OiBzY2hlbWFIdW1hbm9pZC5sb3dlckFybVR3aXN0LFxuICAgICAgdXBwZXJMZWdUd2lzdDogc2NoZW1hSHVtYW5vaWQudXBwZXJMZWdUd2lzdCxcbiAgICAgIGxvd2VyTGVnVHdpc3Q6IHNjaGVtYUh1bWFub2lkLmxvd2VyTGVnVHdpc3QsXG4gICAgICBmZWV0U3BhY2luZzogc2NoZW1hSHVtYW5vaWQuZmVldFNwYWNpbmcsXG4gICAgICBoYXNUcmFuc2xhdGlvbkRvRjogc2NoZW1hSHVtYW5vaWQuaGFzVHJhbnNsYXRpb25Eb0YsXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgVlJNSHVtYW5vaWQoaHVtYW5Cb25lQXJyYXksIGh1bWFuRGVzY3JpcHRpb24pO1xuICB9XG59XG4iLCIvKipcbiAqIEV2YWx1YXRlIGEgaGVybWl0ZSBzcGxpbmUuXG4gKlxuICogQHBhcmFtIHkwIHkgb24gc3RhcnRcbiAqIEBwYXJhbSB5MSB5IG9uIGVuZFxuICogQHBhcmFtIHQwIGRlbHRhIHkgb24gc3RhcnRcbiAqIEBwYXJhbSB0MSBkZWx0YSB5IG9uIGVuZFxuICogQHBhcmFtIHggaW5wdXQgdmFsdWVcbiAqL1xuY29uc3QgaGVybWl0ZVNwbGluZSA9ICh5MDogbnVtYmVyLCB5MTogbnVtYmVyLCB0MDogbnVtYmVyLCB0MTogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCB4YyA9IHggKiB4ICogeDtcbiAgY29uc3QgeHMgPSB4ICogeDtcbiAgY29uc3QgZHkgPSB5MSAtIHkwO1xuICBjb25zdCBoMDEgPSAtMi4wICogeGMgKyAzLjAgKiB4cztcbiAgY29uc3QgaDEwID0geGMgLSAyLjAgKiB4cyArIHg7XG4gIGNvbnN0IGgxMSA9IHhjIC0geHM7XG4gIHJldHVybiB5MCArIGR5ICogaDAxICsgdDAgKiBoMTAgKyB0MSAqIGgxMTtcbn07XG5cbi8qKlxuICogRXZhbHVhdGUgYW4gQW5pbWF0aW9uQ3VydmUgYXJyYXkuIFNlZSBBbmltYXRpb25DdXJ2ZSBjbGFzcyBvZiBVbml0eSBmb3IgaXRzIGRldGFpbHMuXG4gKlxuICogU2VlOiBodHRwczovL2RvY3MudW5pdHkzZC5jb20vamEvY3VycmVudC9TY3JpcHRSZWZlcmVuY2UvQW5pbWF0aW9uQ3VydmUuaHRtbFxuICpcbiAqIEBwYXJhbSBhcnIgQW4gYXJyYXkgcmVwcmVzZW50cyBhIGN1cnZlXG4gKiBAcGFyYW0geCBBbiBpbnB1dCB2YWx1ZVxuICovXG5jb25zdCBldmFsdWF0ZUN1cnZlID0gKGFycjogbnVtYmVyW10sIHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIC8vIC0tIHNhbml0eSBjaGVjayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBpZiAoYXJyLmxlbmd0aCA8IDgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2YWx1YXRlQ3VydmU6IEludmFsaWQgY3VydmUgZGV0ZWN0ZWQhIChBcnJheSBsZW5ndGggbXVzdCBiZSA4IGF0IGxlYXN0KScpO1xuICB9XG4gIGlmIChhcnIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXZhbHVhdGVDdXJ2ZTogSW52YWxpZCBjdXJ2ZSBkZXRlY3RlZCEgKEFycmF5IGxlbmd0aCBtdXN0IGJlIG11bHRpcGxlcyBvZiA0Jyk7XG4gIH1cblxuICAvLyAtLSBjaGVjayByYW5nZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgbGV0IG91dE5vZGU7XG4gIGZvciAob3V0Tm9kZSA9IDA7IDsgb3V0Tm9kZSsrKSB7XG4gICAgaWYgKGFyci5sZW5ndGggPD0gNCAqIG91dE5vZGUpIHtcbiAgICAgIHJldHVybiBhcnJbNCAqIG91dE5vZGUgLSAzXTsgLy8gdG9vIGZ1cnRoZXIhISBhc3N1bWUgYXMgXCJDbGFtcFwiXG4gICAgfSBlbHNlIGlmICh4IDw9IGFycls0ICogb3V0Tm9kZV0pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGluTm9kZSA9IG91dE5vZGUgLSAxO1xuICBpZiAoaW5Ob2RlIDwgMCkge1xuICAgIHJldHVybiBhcnJbNCAqIGluTm9kZSArIDVdOyAvLyB0b28gYmVoaW5kISEgYXNzdW1lIGFzIFwiQ2xhbXBcIlxuICB9XG5cbiAgLy8gLS0gY2FsY3VsYXRlIGxvY2FsIHggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHgwID0gYXJyWzQgKiBpbk5vZGVdO1xuICBjb25zdCB4MSA9IGFycls0ICogb3V0Tm9kZV07XG4gIGNvbnN0IHhIZXJtaXRlID0gKHggLSB4MCkgLyAoeDEgLSB4MCk7XG5cbiAgLy8gLS0gZmluYWxseSBkbyB0aGUgaGVybWl0ZSBzcGxpbmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHkwID0gYXJyWzQgKiBpbk5vZGUgKyAxXTtcbiAgY29uc3QgeTEgPSBhcnJbNCAqIG91dE5vZGUgKyAxXTtcbiAgY29uc3QgdDAgPSBhcnJbNCAqIGluTm9kZSArIDNdO1xuICBjb25zdCB0MSA9IGFycls0ICogb3V0Tm9kZSArIDJdO1xuICByZXR1cm4gaGVybWl0ZVNwbGluZSh5MCwgeTEsIHQwLCB0MSwgeEhlcm1pdGUpO1xufTtcblxuLyoqXG4gKiBUaGlzIGlzIGFuIGVxdWl2YWxlbnQgb2YgQ3VydmVNYXBwZXIgY2xhc3MgZGVmaW5lZCBpbiBVbmlWUk0uXG4gKiBXaWxsIGJlIHVzZWQgZm9yIFtbVlJNTG9va0F0QXBwbHllcl1dcywgdG8gZGVmaW5lIGJlaGF2aW9yIG9mIExvb2tBdC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9Mb29rQXQvQ3VydmVNYXBwZXIuY3NcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUN1cnZlTWFwcGVyIHtcbiAgLyoqXG4gICAqIEFuIGFycmF5IHJlcHJlc2VudHMgdGhlIGN1cnZlLiBTZWUgQW5pbWF0aW9uQ3VydmUgY2xhc3Mgb2YgVW5pdHkgZm9yIGl0cyBkZXRhaWxzLlxuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9qYS9jdXJyZW50L1NjcmlwdFJlZmVyZW5jZS9BbmltYXRpb25DdXJ2ZS5odG1sXG4gICAqL1xuICBwdWJsaWMgY3VydmU6IG51bWJlcltdID0gWzAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wXTtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gaW5wdXQgcmFuZ2Ugb2YgdGhlIFtbVlJNQ3VydmVNYXBwZXJdXS5cbiAgICovXG4gIHB1YmxpYyBjdXJ2ZVhSYW5nZURlZ3JlZSA9IDkwLjA7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIG91dHB1dCB2YWx1ZSBvZiB0aGUgW1tWUk1DdXJ2ZU1hcHBlcl1dLlxuICAgKi9cbiAgcHVibGljIGN1cnZlWVJhbmdlRGVncmVlID0gMTAuMDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFtbVlJNQ3VydmVNYXBwZXJdXS5cbiAgICpcbiAgICogQHBhcmFtIHhSYW5nZSBUaGUgbWF4aW11bSBpbnB1dCByYW5nZVxuICAgKiBAcGFyYW0geVJhbmdlIFRoZSBtYXhpbXVtIG91dHB1dCB2YWx1ZVxuICAgKiBAcGFyYW0gY3VydmUgQW4gYXJyYXkgcmVwcmVzZW50cyB0aGUgY3VydmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHhSYW5nZT86IG51bWJlciwgeVJhbmdlPzogbnVtYmVyLCBjdXJ2ZT86IG51bWJlcltdKSB7XG4gICAgaWYgKHhSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmN1cnZlWFJhbmdlRGVncmVlID0geFJhbmdlO1xuICAgIH1cblxuICAgIGlmICh5UmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZVlSYW5nZURlZ3JlZSA9IHlSYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZSA9IGN1cnZlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBpbnB1dCB2YWx1ZSBhbmQgb3V0cHV0IGEgbWFwcGVkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gc3JjIFRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIG1hcChzcmM6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2xhbXBlZFNyYyA9IE1hdGgubWluKE1hdGgubWF4KHNyYywgMC4wKSwgdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZSk7XG4gICAgY29uc3QgeCA9IGNsYW1wZWRTcmMgLyB0aGlzLmN1cnZlWFJhbmdlRGVncmVlO1xuICAgIHJldHVybiB0aGlzLmN1cnZlWVJhbmdlRGVncmVlICogZXZhbHVhdGVDdXJ2ZSh0aGlzLmN1cnZlLCB4KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCBieSBbW1ZSTUxvb2tBdEhlYWRdXSwgYXBwbGllcyBsb29rIGF0IGRpcmVjdGlvbi5cbiAqIFRoZXJlIGFyZSBjdXJyZW50bHkgdHdvIHZhcmlhbnQgb2YgYXBwbGllcjogW1tWUk1Mb29rQXRCb25lQXBwbHllcl1dIGFuZCBbW1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyXV0uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgLyoqXG4gICAqIEl0IHJlcHJlc2VudHMgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSB0eXBlOiBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZTtcblxuICAvKipcbiAgICogQXBwbHkgbG9vayBhdCBkaXJlY3Rpb24gdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZXVsZXIgYFRIUkVFLkV1bGVyYCBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBsb29rIGF0IGRpcmVjdGlvblxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1DdXJ2ZU1hcHBlciB9IGZyb20gJy4vVlJNQ3VydmVNYXBwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGJ5IFtbVlJNTG9va0F0SGVhZF1dLCBhcHBsaWVzIGxvb2sgYXQgZGlyZWN0aW9uIHRvIGV5ZSBibGVuZCBzaGFwZXMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllciBleHRlbmRzIFZSTUxvb2tBdEFwcGx5ZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJsZW5kU2hhcGU7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVIb3Jpem9udGFsOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbERvd246IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBibGVuZFNoYXBlUHJveHkgQSBbW1ZSTUJsZW5kU2hhcGVQcm94eV1dIHVzZWQgYnkgdGhpcyBhcHBsaWVyXG4gICAqIEBwYXJhbSBjdXJ2ZUhvcml6b250YWwgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxEb3duIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsVXAgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eSxcbiAgICBjdXJ2ZUhvcml6b250YWw6IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyLFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY3VydmVIb3Jpem9udGFsID0gY3VydmVIb3Jpem9udGFsO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxEb3duID0gY3VydmVWZXJ0aWNhbERvd247XG4gICAgdGhpcy5fY3VydmVWZXJ0aWNhbFVwID0gY3VydmVWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5ID0gYmxlbmRTaGFwZVByb3h5O1xuICB9XG5cbiAgcHVibGljIG5hbWUoKTogVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUge1xuICAgIHJldHVybiBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlO1xuICB9XG5cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzcmNYID0gZXVsZXIueDtcbiAgICBjb25zdCBzcmNZID0gZXVsZXIueTtcblxuICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2t1cCwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2Rvd24sIHRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tkb3duLCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rdXAsIHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCkpO1xuICAgIH1cblxuICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tsZWZ0LCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rcmlnaHQsIHRoaXMuX2N1cnZlSG9yaXpvbnRhbC5tYXAoLXNyY1kpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rcmlnaHQsIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tsZWZ0LCB0aGlzLl9jdXJ2ZUhvcml6b250YWwubWFwKHNyY1kpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi4vZmlyc3RwZXJzb24vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5cbmNvbnN0IFZFQ1RPUjNfRlJPTlQgPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAtMS4wKSk7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgbG9vayBhdCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlYWQge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVVTEVSX09SREVSID0gJ1lYWic7IC8vIHlhdy1waXRjaC1yb2xsXG5cbiAgLyoqXG4gICAqIEFzc29jaWF0ZWQgW1tWUk1GaXJzdFBlcnNvbl1dLCB3aWxsIGJlIHVzZWQgZm9yIGRpcmVjdGlvbiBjYWxjdWxhdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb247XG5cbiAgLyoqXG4gICAqIEFzc29jaWF0ZWQgW1tWUk1Mb29rQXRBcHBseWVyXV0sIGl0cyBsb29rIGF0IGRpcmVjdGlvbiB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIG1vZGVsIHVzaW5nIHRoaXMgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBhcHBseWVyPzogVlJNTG9va0F0QXBwbHllcjtcblxuICAvKipcbiAgICogSWYgdGhpcyBpcyB0cnVlLCBpdHMgbG9vayBhdCBkaXJlY3Rpb24gd2lsbCBiZSB1cGRhdGVkIGF1dG9tYXRpY2FsbHkgYnkgY2FsbGluZyBbW1ZSTUxvb2tBdEhlYWQudXBkYXRlXV0gKHdoaWNoIGlzIGNhbGxlZCBmcm9tIFtbVlJNLnVwZGF0ZV1dKS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNTG9va0F0SGVhZC50YXJnZXRdXVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG9iamVjdCBvZiB0aGUgbG9vayBhdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIFtbVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlXV0gaXMgZGlzYWJsZWQuXG4gICAqL1xuICBwdWJsaWMgdGFyZ2V0PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHJvdGVjdGVkIF9ldWxlcjogVEhSRUUuRXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoMC4wLCAwLjAsIDAuMCwgVlJNTG9va0F0SGVhZC5FVUxFUl9PUkRFUik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1Mb29rQXRIZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb24gQSBbW1ZSTUZpcnN0UGVyc29uXV0gdGhhdCB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5ldyBWUk1Mb29rQXRIZWFkXG4gICAqIEBwYXJhbSBhcHBseWVyIEEgW1tWUk1Mb29rQXRBcHBseWVyXV0gdGhhdCB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5ldyBWUk1Mb29rQXRIZWFkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb24sIGFwcGx5ZXI/OiBWUk1Mb29rQXRBcHBseWVyKSB7XG4gICAgdGhpcy5maXJzdFBlcnNvbiA9IGZpcnN0UGVyc29uO1xuICAgIHRoaXMuYXBwbHllciA9IGFwcGx5ZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBsb29rIGF0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIGNvbnN0IHJvdCA9IGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5maXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmUsIF9xdWF0KTtcbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkoVkVDVE9SM19GUk9OVCkuYXBwbHlFdWxlcih0aGlzLl9ldWxlcikuYXBwbHlRdWF0ZXJuaW9uKHJvdCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGl0cyBsb29rIGF0IHBvc2l0aW9uLlxuICAgKiBOb3RlIHRoYXQgaXRzIHJlc3VsdCB3aWxsIGJlIGluc3RhbnRseSBvdmVyd3JpdHRlbiBpZiBbW1ZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZV1dIGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBBIHRhcmdldCBwb3NpdGlvblxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIHRoaXMuX2NhbGNFdWxlcih0aGlzLl9ldWxlciwgcG9zaXRpb24pO1xuXG4gICAgaWYgKHRoaXMuYXBwbHllcikge1xuICAgICAgdGhpcy5hcHBseWVyLmxvb2tBdCh0aGlzLl9ldWxlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgVlJNTG9va0F0SGVhZC5cbiAgICogSWYgW1tWUk1Mb29rQXRIZWFkLmF1dG9VcGRhdGVdXSBpcyBkaXNhYmxlZCwgaXQgd2lsbCBkbyBub3RoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy5hdXRvVXBkYXRlKSB7XG4gICAgICB0aGlzLmxvb2tBdCh0aGlzLnRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0EpKTtcblxuICAgICAgaWYgKHRoaXMuYXBwbHllcikge1xuICAgICAgICB0aGlzLmFwcGx5ZXIubG9va0F0KHRoaXMuX2V1bGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NhbGNFdWxlcih0YXJnZXQ6IFRIUkVFLkV1bGVyLCBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLkV1bGVyIHtcbiAgICBjb25zdCBoZWFkUG9zaXRpb24gPSB0aGlzLmZpcnN0UGVyc29uLmdldEZpcnN0UGVyc29uV29ybGRQb3NpdGlvbihfdjNCKTtcblxuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGVcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDLmNvcHkocG9zaXRpb24pLnN1YihoZWFkUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHRoZSBkaXJlY3Rpb24gaW50byBsb2NhbCBjb29yZGluYXRlIGZyb20gdGhlIGZpcnN0IHBlcnNvbiBib25lXG4gICAgbG9va0F0RGlyLmFwcGx5UXVhdGVybmlvbihxdWF0SW52ZXJ0Q29tcGF0KGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5maXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmUsIF9xdWF0KSkpO1xuXG4gICAgLy8gY29udmVydCB0aGUgZGlyZWN0aW9uIGludG8gZXVsZXJcbiAgICB0YXJnZXQueCA9IE1hdGguYXRhbjIobG9va0F0RGlyLnksIE1hdGguc3FydChsb29rQXREaXIueCAqIGxvb2tBdERpci54ICsgbG9va0F0RGlyLnogKiBsb29rQXREaXIueikpO1xuICAgIHRhcmdldC55ID0gTWF0aC5hdGFuMigtbG9va0F0RGlyLngsIC1sb29rQXREaXIueik7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IEdMVEZOb2RlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1DdXJ2ZU1hcHBlciB9IGZyb20gJy4vVlJNQ3VydmVNYXBwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkJztcblxuY29uc3QgX2V1bGVyID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsIFZSTUxvb2tBdEhlYWQuRVVMRVJfT1JERVIpO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCBieSBbW1ZSTUxvb2tBdEhlYWRdXSwgYXBwbGllcyBsb29rIGF0IGRpcmVjdGlvbiB0byBleWUgYm9uZXMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRCb25lQXBwbHllciBleHRlbmRzIFZSTUxvb2tBdEFwcGx5ZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJvbmU7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVIb3Jpem9udGFsSW5uZXI6IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZUhvcml6b250YWxPdXRlcjogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9sZWZ0RXllOiBHTFRGTm9kZSB8IG51bGw7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3JpZ2h0RXllOiBHTFRGTm9kZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1Mb29rQXRCb25lQXBwbHllci5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEgW1tWUk1IdW1hbm9pZF1dIHVzZWQgYnkgdGhpcyBhcHBsaWVyXG4gICAqIEBwYXJhbSBjdXJ2ZUhvcml6b250YWxJbm5lciBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVIb3Jpem9udGFsT3V0ZXIgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxEb3duIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsVXAgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgY3VydmVIb3Jpem9udGFsSW5uZXI6IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlSG9yaXpvbnRhbE91dGVyOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsRG93bjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcixcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyID0gY3VydmVIb3Jpem9udGFsSW5uZXI7XG4gICAgdGhpcy5fY3VydmVIb3Jpem9udGFsT3V0ZXIgPSBjdXJ2ZUhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93biA9IGN1cnZlVmVydGljYWxEb3duO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxVcCA9IGN1cnZlVmVydGljYWxVcDtcblxuICAgIHRoaXMuX2xlZnRFeWUgPSBodW1hbm9pZC5nZXRCb25lTm9kZShWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZS5MZWZ0RXllKTtcbiAgICB0aGlzLl9yaWdodEV5ZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lLlJpZ2h0RXllKTtcbiAgfVxuXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3JjWCA9IGV1bGVyLng7XG4gICAgY29uc3Qgc3JjWSA9IGV1bGVyLnk7XG5cbiAgICAvLyBsZWZ0XG4gICAgaWYgKHRoaXMuX2xlZnRFeWUpIHtcbiAgICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci54ID0gLXRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueCA9IHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci55ID0gLXRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyLm1hcCgtc3JjWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueSA9IHRoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyLm1hcChzcmNZKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGVmdEV5ZS5xdWF0ZXJuaW9uLnNldEZyb21FdWxlcihfZXVsZXIpO1xuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKHRoaXMuX3JpZ2h0RXllKSB7XG4gICAgICBpZiAoc3JjWCA8IDAuMCkge1xuICAgICAgICBfZXVsZXIueCA9IC10aGlzLl9jdXJ2ZVZlcnRpY2FsRG93bi5tYXAoLXNyY1gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyLnggPSB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAubWFwKHNyY1gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgICBfZXVsZXIueSA9IC10aGlzLl9jdXJ2ZUhvcml6b250YWxPdXRlci5tYXAoLXNyY1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyLnkgPSB0aGlzLl9jdXJ2ZUhvcml6b250YWxJbm5lci5tYXAoc3JjWSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JpZ2h0RXllLnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKF9ldWxlcik7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlUHJveHkgfSBmcm9tICcuLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1DdXJ2ZU1hcHBlciB9IGZyb20gJy4vVlJNQ3VydmVNYXBwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0Qm9uZUFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEJvbmVBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWQnO1xuXG4vLyBUSFJFRS5NYXRoIGhhcyBiZWVuIHJlbmFtZWQgdG8gVEhSRUUuTWF0aFV0aWxzIHNpbmNlIHIxMTMuXG4vLyBXZSBhcmUgZ29pbmcgdG8gZGVmaW5lIHRoZSBERUcyUkFEIGJ5IG91cnNlbHZlcyBmb3IgYSB3aGlsZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE4MjcwXG5jb25zdCBERUcyUkFEID0gTWF0aC5QSSAvIDE4MDsgLy8gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQ7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1Mb29rQXRIZWFkXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0SW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1Mb29rQXRIZWFkXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBibGVuZFNoYXBlUHJveHkgQSBbW1ZSTUJsZW5kU2hhcGVQcm94eV1dIGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIFtbVlJNSHVtYW5vaWRdXSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGZpcnN0UGVyc29uOiBWUk1GaXJzdFBlcnNvbixcbiAgICBibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eSxcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICk6IFZSTUxvb2tBdEhlYWQgfCBudWxsIHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFZSTVNjaGVtYS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBhcHBseWVyID0gdGhpcy5faW1wb3J0QXBwbHllcihzY2hlbWFGaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbm9pZCk7XG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRIZWFkKGZpcnN0UGVyc29uLCBhcHBseWVyIHx8IHVuZGVmaW5lZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ltcG9ydEFwcGx5ZXIoXG4gICAgc2NoZW1hRmlyc3RQZXJzb246IFZSTVNjaGVtYS5GaXJzdFBlcnNvbixcbiAgICBibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eSxcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICk6IFZSTUxvb2tBdEFwcGx5ZXIgfCBudWxsIHtcbiAgICBjb25zdCBsb29rQXRIb3Jpem9udGFsSW5uZXIgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsSW5uZXI7XG4gICAgY29uc3QgbG9va0F0SG9yaXpvbnRhbE91dGVyID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbE91dGVyO1xuICAgIGNvbnN0IGxvb2tBdFZlcnRpY2FsRG93biA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsRG93bjtcbiAgICBjb25zdCBsb29rQXRWZXJ0aWNhbFVwID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxVcDtcblxuICAgIHN3aXRjaCAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUpIHtcbiAgICAgIGNhc2UgVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQm9uZToge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbG9va0F0SG9yaXpvbnRhbElubmVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBsb29rQXRIb3Jpem9udGFsT3V0ZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGxvb2tBdFZlcnRpY2FsRG93biA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbG9va0F0VmVydGljYWxVcCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgVlJNTG9va0F0Qm9uZUFwcGx5ZXIoXG4gICAgICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRIb3Jpem9udGFsSW5uZXIpLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdEhvcml6b250YWxPdXRlciksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0VmVydGljYWxEb3duKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRWZXJ0aWNhbFVwKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYXNlIFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJsZW5kU2hhcGU6IHtcbiAgICAgICAgaWYgKGxvb2tBdEhvcml6b250YWxPdXRlciA9PT0gdW5kZWZpbmVkIHx8IGxvb2tBdFZlcnRpY2FsRG93biA9PT0gdW5kZWZpbmVkIHx8IGxvb2tBdFZlcnRpY2FsVXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIoXG4gICAgICAgICAgICBibGVuZFNoYXBlUHJveHksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobG9va0F0SG9yaXpvbnRhbE91dGVyKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShsb29rQXRWZXJ0aWNhbERvd24pLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKGxvb2tBdFZlcnRpY2FsVXApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Q3VydmVNYXBwZXJCb25lKG1hcDogVlJNU2NoZW1hLkZpcnN0UGVyc29uRGVncmVlTWFwKTogVlJNQ3VydmVNYXBwZXIge1xuICAgIHJldHVybiBuZXcgVlJNQ3VydmVNYXBwZXIoXG4gICAgICB0eXBlb2YgbWFwLnhSYW5nZSA9PT0gJ251bWJlcicgPyBERUcyUkFEICogbWFwLnhSYW5nZSA6IHVuZGVmaW5lZCxcbiAgICAgIHR5cGVvZiBtYXAueVJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueVJhbmdlIDogdW5kZWZpbmVkLFxuICAgICAgbWFwLmN1cnZlLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobWFwOiBWUk1TY2hlbWEuRmlyc3RQZXJzb25EZWdyZWVNYXApOiBWUk1DdXJ2ZU1hcHBlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1DdXJ2ZU1hcHBlcih0eXBlb2YgbWFwLnhSYW5nZSA9PT0gJ251bWJlcicgPyBERUcyUkFEICogbWFwLnhSYW5nZSA6IHVuZGVmaW5lZCwgbWFwLnlSYW5nZSwgbWFwLmN1cnZlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY29uc3QgZ2V0RW5jb2RpbmdDb21wb25lbnRzID0gKGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpOiBbc3RyaW5nLCBzdHJpbmddID0+IHtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgVEhSRUUuTGluZWFyRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydMaW5lYXInLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5zUkdCRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydzUkdCJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCRUVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCRScsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQk03RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JNJywgJyggdmFsdWUsIDcuMCApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JNMTZFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgMTYuMCApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JERW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JEJywgJyggdmFsdWUsIDI1Ni4wICknXTtcbiAgICBjYXNlIFRIUkVFLkdhbW1hRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydHYW1tYScsICcoIHZhbHVlLCBmbG9hdCggR0FNTUFfRkFDVE9SICkgKSddO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uID0gKGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgY29tcG9uZW50cyA9IGdldEVuY29kaW5nQ29tcG9uZW50cyhlbmNvZGluZyk7XG4gIHJldHVybiAndmVjNCAnICsgZnVuY3Rpb25OYW1lICsgJyggdmVjNCB2YWx1ZSApIHsgcmV0dXJuICcgKyBjb21wb25lbnRzWzBdICsgJ1RvTGluZWFyJyArIGNvbXBvbmVudHNbMV0gKyAnOyB9Jztcbn07XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uIH0gZnJvbSAnLi9nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24nO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24udmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLmZyYWcnO1xuXG5jb25zdCBUQVUgPSAyLjAgKiBNYXRoLlBJO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1Ub29uUGFyYW1ldGVycyBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyB7XG4gIG1Ub29uVmVyc2lvbj86IG51bWJlcjsgLy8gX01Ub29uVmVyc2lvblxuXG4gIGN1dG9mZj86IG51bWJlcjsgLy8gX0N1dG9mZlxuICBjb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIHJnYiBvZiBfQ29sb3JcbiAgc2hhZGVDb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9TaGFkZUNvbG9yXG4gIG1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4XG4gIG1haW5UZXg/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleCAod2lsbCBiZSByZW5hbWVkIHRvIG1hcClcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICBtYWluVGV4X1NUPzogVEhSRUUuVmVjdG9yNDsgLy8gX01haW5UZXhfU1RcbiAgc2hhZGVUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1NoYWRlVGV4dHVyZVxuICBidW1wU2NhbGU/OiBudW1iZXI7IC8vIF9CdW1wU2NhbGUgKHdpbGwgYmUgY29udmVydGVkIHRvIG5vcm1hbFNjYWxlKVxuICBub3JtYWxNYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfQnVtcE1hcFxuICBub3JtYWxNYXBUeXBlPzogVEhSRUUuTm9ybWFsTWFwVHlwZXM7IC8vIFRocmVlLmpzIHNwZWNpZmljIHZhbHVlXG4gIG5vcm1hbFNjYWxlPzogVEhSRUUuVmVjdG9yMjsgLy8gX0J1bXBTY2FsZSBpbiBUaHJlZS5qcyBmYXNoaW9uXG4gIGJ1bXBNYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfQnVtcE1hcCAod2lsbCBiZSByZW5hbWVkIHRvIG5vcm1hbE1hcClcbiAgcmVjZWl2ZVNoYWRvd1JhdGU/OiBudW1iZXI7IC8vIF9SZWNlaXZlU2hhZG93UmF0ZVxuICByZWNlaXZlU2hhZG93VGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9SZWNlaXZlU2hhZG93VGV4dHVyZVxuICBzaGFkaW5nR3JhZGVSYXRlPzogbnVtYmVyOyAvLyBfU2hhZGluZ0dyYWRlUmF0ZVxuICBzaGFkaW5nR3JhZGVUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1NoYWRpbmdHcmFkZVRleHR1cmVcbiAgc2hhZGVTaGlmdD86IG51bWJlcjsgLy8gX1NoYWRlU2hpZnRcbiAgc2hhZGVUb29ueT86IG51bWJlcjsgLy8gX1NoYWRlVG9vbnlcbiAgbGlnaHRDb2xvckF0dGVudWF0aW9uPzogbnVtYmVyOyAvLyBfTGlnaHRDb2xvckF0dGVudWF0aW9uXG4gIGluZGlyZWN0TGlnaHRJbnRlbnNpdHk/OiBudW1iZXI7IC8vIF9JbmRpcmVjdExpZ2h0SW50ZW5zaXR5XG4gIHJpbVRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfUmltVGV4dHVyZVxuICByaW1Db2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9SaW1Db2xvclxuICByaW1MaWdodGluZ01peD86IG51bWJlcjsgLy8gX1JpbUxpZ2h0aW5nTWl4XG4gIHJpbUZyZXNuZWxQb3dlcj86IG51bWJlcjsgLy8gX1JpbUZyZXNuZWxQb3dlclxuICByaW1MaWZ0PzogbnVtYmVyOyAvLyBfUmltTGlmdFxuICBzcGhlcmVBZGQ/OiBUSFJFRS5UZXh0dXJlOyAvLyBfU3BoZXJlQWRkXG4gIGVtaXNzaW9uQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfRW1pc3Npb25Db2xvclxuICBlbWlzc2l2ZU1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9FbWlzc2lvbk1hcFxuICBlbWlzc2lvbk1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9FbWlzc2lvbk1hcCAod2lsbCBiZSByZW5hbWVkIHRvIGVtaXNzaXZlTWFwKVxuICBvdXRsaW5lV2lkdGhUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVcbiAgb3V0bGluZVdpZHRoPzogbnVtYmVyOyAvLyBfT3V0bGluZVdpZHRoXG4gIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZT86IG51bWJlcjsgLy8gX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZVxuICBvdXRsaW5lQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfT3V0bGluZUNvbG9yXG4gIG91dGxpbmVMaWdodGluZ01peD86IG51bWJlcjsgLy8gX091dGxpbmVMaWdodGluZ01peFxuICB1dkFuaW1NYXNrVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9VdkFuaW1NYXNrVGV4dHVyZVxuICB1dkFuaW1TY3JvbGxYPzogbnVtYmVyOyAvLyBfVXZBbmltU2Nyb2xsWFxuICB1dkFuaW1TY3JvbGxZPzogbnVtYmVyOyAvLyBfVXZBbmltU2Nyb2xsWVxuICB1dkFuaW1Sb3RhdGlvbj86IG51bWJlcjsgLy8gX3V2QW5pbVJvdGF0aW9uXG5cbiAgZGVidWdNb2RlPzogTVRvb25NYXRlcmlhbERlYnVnTW9kZSB8IG51bWJlcjsgLy8gX0RlYnVnTW9kZVxuICBibGVuZE1vZGU/OiBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSB8IG51bWJlcjsgLy8gX0JsZW5kTW9kZVxuICBvdXRsaW5lV2lkdGhNb2RlPzogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfCBudW1iZXI7IC8vIE91dGxpbmVXaWR0aE1vZGVcbiAgb3V0bGluZUNvbG9yTW9kZT86IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlIHwgbnVtYmVyOyAvLyBPdXRsaW5lQ29sb3JNb2RlXG4gIGN1bGxNb2RlPzogTVRvb25NYXRlcmlhbEN1bGxNb2RlIHwgbnVtYmVyOyAvLyBfQ3VsbE1vZGVcbiAgb3V0bGluZUN1bGxNb2RlPzogTVRvb25NYXRlcmlhbEN1bGxNb2RlIHwgbnVtYmVyOyAvLyBfT3V0bGluZUN1bGxNb2RlXG4gIHNyY0JsZW5kPzogbnVtYmVyOyAvLyBfU3JjQmxlbmRcbiAgZHN0QmxlbmQ/OiBudW1iZXI7IC8vIF9Ec3RCbGVuZFxuICB6V3JpdGU/OiBudW1iZXI7IC8vIF9aV3JpdGUgKHdpbGwgYmUgcmVuYW1lZCB0byBkZXB0aFdyaXRlKVxuXG4gIGlzT3V0bGluZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGVuY29kaW5nIG9mIGlucHV0IHVuaWZvcm0gY29sb3JzLlxuICAgKlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYC5cbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLnNSR0JFbmNvZGluZ2AsIHVzZSBgVEhSRUUuc1JHQkVuY29kaW5nYC5cbiAgICpcbiAgICogRW5jb2RpbmdzIG9mIHRleHR1cmVzIHNob3VsZCBiZSBzZXQgaW5kZXBlbmRlbnRseSBvbiB0ZXh0dXJlcy5cbiAgICpcbiAgICogVGhpcyB3aWxsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgIGlmIHRoaXMgb3B0aW9uIGlzbid0IHNwZWNpZmllZC5cbiAgICpcbiAgICogU2VlIGFsc286IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL3JlbmRlcmVycy9XZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nXG4gICAqL1xuICBlbmNvZGluZz86IFRIUkVFLlRleHR1cmVFbmNvZGluZztcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbEN1bGxNb2RlIHtcbiAgT2ZmLFxuICBGcm9udCxcbiAgQmFjayxcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbERlYnVnTW9kZSB7XG4gIE5vbmUsXG4gIE5vcm1hbCxcbiAgTGl0U2hhZGVSYXRlLFxuICBVVixcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUge1xuICBGaXhlZENvbG9yLFxuICBNaXhlZExpZ2h0aW5nLFxufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB7XG4gIE5vbmUsXG4gIFdvcmxkQ29vcmRpbmF0ZXMsXG4gIFNjcmVlbkNvb3JkaW5hdGVzLFxufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSB7XG4gIE9wYXF1ZSxcbiAgQ3V0b3V0LFxuICBUcmFuc3BhcmVudCxcbiAgVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxufVxuXG4vKipcbiAqIE1Ub29uIGlzIGEgbWF0ZXJpYWwgc3BlY2lmaWNhdGlvbiB0aGF0IGhhcyB2YXJpb3VzIGZlYXR1cmVzLlxuICogVGhlIHNwZWMgYW5kIGltcGxlbWVudGF0aW9uIGFyZSBvcmlnaW5hbGx5IGZvdW5kZWQgZm9yIFVuaXR5IGVuZ2luZSBhbmQgdGhpcyBpcyBhIHBvcnQgb2YgdGhlIG1hdGVyaWFsLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1NhbnRhcmgvTVRvb25cbiAqL1xuZXhwb3J0IGNsYXNzIE1Ub29uTWF0ZXJpYWwgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbCB7XG4gIC8qKlxuICAgKiBSZWFkb25seSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoaXMgaXMgYSBbW01Ub29uTWF0ZXJpYWxdXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpc01Ub29uTWF0ZXJpYWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBjdXRvZmYgPSAwLjU7IC8vIF9DdXRvZmZcbiAgcHVibGljIGNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMS4wLCAxLjAsIDEuMCwgMS4wKTsgLy8gX0NvbG9yXG4gIHB1YmxpYyBzaGFkZUNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC45NywgMC44MSwgMC44NiwgMS4wKTsgLy8gX1NoYWRlQ29sb3JcbiAgcHVibGljIG1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfTWFpblRleFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gIHB1YmxpYyBtYWluVGV4X1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX01haW5UZXhfU1RcbiAgcHVibGljIHNoYWRlVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU2hhZGVUZXh0dXJlXG4gIC8vIHB1YmxpYyBzaGFkZVRleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU2hhZGVUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBub3JtYWxNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX0J1bXBNYXAuIGFnYWluLCBUSElTIElTIF9CdW1wTWFwXG4gIHB1YmxpYyBub3JtYWxNYXBUeXBlID0gVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwOyAvLyBUaHJlZS5qcyByZXF1aXJlcyB0aGlzXG4gIHB1YmxpYyBub3JtYWxTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDEuMCwgMS4wKTsgLy8gX0J1bXBTY2FsZSwgaW4gVmVjdG9yMlxuICAvLyBwdWJsaWMgYnVtcE1hcF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9CdW1wTWFwX1NUICh1bnVzZWQpXG4gIHB1YmxpYyByZWNlaXZlU2hhZG93UmF0ZSA9IDEuMDsgLy8gX1JlY2VpdmVTaGFkb3dSYXRlXG4gIHB1YmxpYyByZWNlaXZlU2hhZG93VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVcbiAgLy8gcHVibGljIHJlY2VpdmVTaGFkb3dUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1JlY2VpdmVTaGFkb3dUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBzaGFkaW5nR3JhZGVSYXRlID0gMS4wOyAvLyBfU2hhZGluZ0dyYWRlUmF0ZVxuICBwdWJsaWMgc2hhZGluZ0dyYWRlVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU2hhZGluZ0dyYWRlVGV4dHVyZVxuICAvLyBwdWJsaWMgc2hhZGluZ0dyYWRlVGV4dHVyZV9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9TaGFkaW5nR3JhZGVUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBzaGFkZVNoaWZ0ID0gMC4wOyAvLyBfU2hhZGVTaGlmdFxuICBwdWJsaWMgc2hhZGVUb29ueSA9IDAuOTsgLy8gX1NoYWRlVG9vbnlcbiAgcHVibGljIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IDAuMDsgLy8gX0xpZ2h0Q29sb3JBdHRlbnVhdGlvblxuICBwdWJsaWMgaW5kaXJlY3RMaWdodEludGVuc2l0eSA9IDAuMTsgLy8gX0luZGlyZWN0TGlnaHRJbnRlbnNpdHlcbiAgcHVibGljIHJpbVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1JpbVRleHR1cmVcbiAgcHVibGljIHJpbUNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX1JpbUNvbG9yXG4gIHB1YmxpYyByaW1MaWdodGluZ01peCA9IDAuMDsgLy8gX1JpbUxpZ2h0aW5nTWl4XG4gIHB1YmxpYyByaW1GcmVzbmVsUG93ZXIgPSAxLjA7IC8vIF9SaW1GcmVzbmVsUG93ZXJcbiAgcHVibGljIHJpbUxpZnQgPSAwLjA7IC8vIF9SaW1MaWZ0XG4gIHB1YmxpYyBzcGhlcmVBZGQ6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1NwaGVyZUFkZFxuICAvLyBwdWJsaWMgc3BoZXJlQWRkX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1NwaGVyZUFkZF9TVCAodW51c2VkKVxuICBwdWJsaWMgZW1pc3Npb25Db2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIF9FbWlzc2lvbkNvbG9yXG4gIHB1YmxpYyBlbWlzc2l2ZU1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfRW1pc3Npb25NYXBcbiAgLy8gcHVibGljIGVtaXNzaW9uTWFwX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX0VtaXNzaW9uTWFwX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9PdXRsaW5lV2lkdGhUZXh0dXJlXG4gIC8vIHB1YmxpYyBvdXRsaW5lV2lkdGhUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIG91dGxpbmVXaWR0aCA9IDAuNTsgLy8gX091dGxpbmVXaWR0aFxuICBwdWJsaWMgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gMS4wOyAvLyBfT3V0bGluZVNjYWxlZE1heERpc3RhbmNlXG4gIHB1YmxpYyBvdXRsaW5lQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAxLjApOyAvLyBfT3V0bGluZUNvbG9yXG4gIHB1YmxpYyBvdXRsaW5lTGlnaHRpbmdNaXggPSAxLjA7IC8vIF9PdXRsaW5lTGlnaHRpbmdNaXhcbiAgcHVibGljIHV2QW5pbU1hc2tUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9VdkFuaW1NYXNrVGV4dHVyZVxuICBwdWJsaWMgdXZBbmltU2Nyb2xsWCA9IDAuMDsgLy8gX1V2QW5pbVNjcm9sbFhcbiAgcHVibGljIHV2QW5pbVNjcm9sbFkgPSAwLjA7IC8vIF9VdkFuaW1TY3JvbGxZXG4gIHB1YmxpYyB1dkFuaW1Sb3RhdGlvbiA9IDAuMDsgLy8gX3V2QW5pbVJvdGF0aW9uXG5cbiAgcHVibGljIHNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlOyAvLyB3aGVuIHRoaXMgaXMgdHJ1ZSwgYXBwbHlVbmlmb3JtcyBlZmZlY3RzXG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyBvZiBpbnB1dCB1bmlmb3JtIGNvbG9ycy5cbiAgICpcbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AuXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5zUkdCRW5jb2RpbmdgLCB1c2UgYFRIUkVFLnNSR0JFbmNvZGluZ2AuXG4gICAqXG4gICAqIEVuY29kaW5ncyBvZiB0ZXh0dXJlcyBhcmUgc2V0IGluZGVwZW5kZW50bHkgb24gdGV4dHVyZXMuXG4gICAqXG4gICAqIFRoaXMgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vcmVuZGVyZXJzL1dlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmdcbiAgICovXG4gIHB1YmxpYyBlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xuXG4gIHByaXZhdGUgX2RlYnVnTW9kZSA9IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTm9uZTsgLy8gX0RlYnVnTW9kZVxuICBwcml2YXRlIF9ibGVuZE1vZGUgPSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5PcGFxdWU7IC8vIF9CbGVuZE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7IC8vIF9PdXRsaW5lV2lkdGhNb2RlXG4gIHByaXZhdGUgX291dGxpbmVDb2xvck1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZS5GaXhlZENvbG9yOyAvLyBfT3V0bGluZUNvbG9yTW9kZVxuICBwcml2YXRlIF9jdWxsTW9kZSA9IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5CYWNrOyAvLyBfQ3VsbE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZUN1bGxNb2RlID0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkZyb250OyAvLyBfT3V0bGluZUN1bGxNb2RlXG4gIC8vIHB1YmxpYyBzcmNCbGVuZCA9IDEuMDsgLy8gX1NyY0JsZW5kIChpcyBub3Qgc3VwcG9ydGVkKVxuICAvLyBwdWJsaWMgZHN0QmxlbmQgPSAwLjA7IC8vIF9Ec3RCbGVuZCAoaXMgbm90IHN1cHBvcnRlZClcbiAgLy8gcHVibGljIHpXcml0ZSA9IDEuMDsgLy8gX1pXcml0ZSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gZGVwdGhXcml0ZSlcblxuICBwcml2YXRlIF9pc091dGxpbmUgPSBmYWxzZTtcblxuICBwcml2YXRlIF91dkFuaW1PZmZzZXRYID0gMC4wO1xuICBwcml2YXRlIF91dkFuaW1PZmZzZXRZID0gMC4wO1xuICBwcml2YXRlIF91dkFuaW1QaGFzZSA9IDAuMDtcblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vblBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmVuY29kaW5nID0gcGFyYW1ldGVycy5lbmNvZGluZyB8fCBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgICBpZiAodGhpcy5lbmNvZGluZyAhPT0gVEhSRUUuTGluZWFyRW5jb2RpbmcgJiYgdGhpcy5lbmNvZGluZyAhPT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdUaGUgc3BlY2lmaWVkIGNvbG9yIGVuY29kaW5nIGRvZXMgbm90IHdvcmsgcHJvcGVybHkgd2l0aCBNVG9vbk1hdGVyaWFsLiBZb3UgbWlnaHQgd2FudCB0byB1c2UgVEhSRUUuc1JHQkVuY29kaW5nIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gPT0gdGhlc2UgcGFyYW1ldGVyIGhhcyBubyBjb21wYXRpYmlsaXR5IHdpdGggdGhpcyBpbXBsZW1lbnRhdGlvbiA9PT09PT09PVxuICAgIFtcbiAgICAgICdtVG9vblZlcnNpb24nLFxuICAgICAgJ3NoYWRlVGV4dHVyZV9TVCcsXG4gICAgICAnYnVtcE1hcF9TVCcsXG4gICAgICAncmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QnLFxuICAgICAgJ3NoYWRpbmdHcmFkZVRleHR1cmVfU1QnLFxuICAgICAgJ3JpbVRleHR1cmVfU1QnLFxuICAgICAgJ3NwaGVyZUFkZF9TVCcsXG4gICAgICAnZW1pc3Npb25NYXBfU1QnLFxuICAgICAgJ291dGxpbmVXaWR0aFRleHR1cmVfU1QnLFxuICAgICAgJ3V2QW5pbU1hc2tUZXh0dXJlX1NUJyxcbiAgICAgICdzcmNCbGVuZCcsXG4gICAgICAnZHN0QmxlbmQnLFxuICAgIF0uZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoKHBhcmFtZXRlcnMgYXMgYW55KVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKGBUSFJFRS4ke3RoaXMudHlwZX06IFRoZSBwYXJhbWV0ZXIgXCIke2tleX1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xuICAgICAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmxpZ2h0cyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XG5cbiAgICBwYXJhbWV0ZXJzLnNraW5uaW5nID0gcGFyYW1ldGVycy5za2lubmluZyB8fCBmYWxzZTtcbiAgICBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyA9IHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzID0gcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW1xuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLCAvLyBtYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLm5vcm1hbG1hcCwgLy8gbm9ybWFsTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5lbWlzc2l2ZW1hcCwgLy8gZW1pc3NpdmVNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmZvZyxcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmxpZ2h0cyxcbiAgICAgIHtcbiAgICAgICAgY3V0b2ZmOiB7IHZhbHVlOiAwLjUgfSxcbiAgICAgICAgY29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBjb2xvckFscGhhOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGVDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuOTcsIDAuODEsIDAuODYpIH0sXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgbWFpblRleF9TVDogeyB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBzaGFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgcmVjZWl2ZVNoYWRvd1JhdGU6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICByZWNlaXZlU2hhZG93VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nR3JhZGVSYXRlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGluZ0dyYWRlVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkZVNoaWZ0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc2hhZGVUb29ueTogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIGluZGlyZWN0TGlnaHRJbnRlbnNpdHk6IHsgdmFsdWU6IDAuMSB9LFxuICAgICAgICByaW1UZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHJpbUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgcmltTGlnaHRpbmdNaXg6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICByaW1GcmVzbmVsUG93ZXI6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICByaW1MaWZ0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc3BoZXJlQWRkOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIGVtaXNzaW9uQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aDogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIG91dGxpbmVDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG91dGxpbmVMaWdodGluZ01peDogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHV2QW5pbU1hc2tUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHV2QW5pbU9mZnNldFg6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1PZmZzZXRZOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltVGhldGE6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgfSxcbiAgICBdKTtcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgZ2V0IG1haW5UZXgoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hcDtcbiAgfVxuXG4gIHNldCBtYWluVGV4KHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5tYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGJ1bXBNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbE1hcDtcbiAgfVxuXG4gIHNldCBidW1wTWFwKHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSB0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgdGhlIGBidW1wU2NhbGVgIHJldXRybnMgaXRzIHggY29tcG9uZW50IG9mIGBub3JtYWxTY2FsZWAgKGFzc3VtaW5nIHggYW5kIHkgY29tcG9uZW50IG9mIGBub3JtYWxTY2FsZWAgYXJlIHNhbWUpLlxuICAgKi9cbiAgZ2V0IGJ1bXBTY2FsZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbFNjYWxlLng7XG4gIH1cblxuICAvKipcbiAgICogU2V0dGluZyB0aGUgYGJ1bXBTY2FsZWAgd2lsbCBiZSBjb252ZXJ0IHRoZSB2YWx1ZSBpbnRvIFZlY3RvcjIgYG5vcm1hbFNjYWxlYCAuXG4gICAqL1xuICBzZXQgYnVtcFNjYWxlKHQ6IG51bWJlcikge1xuICAgIHRoaXMubm9ybWFsU2NhbGUuc2V0KHQsIHQpO1xuICB9XG5cbiAgZ2V0IGVtaXNzaW9uTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5lbWlzc2l2ZU1hcDtcbiAgfVxuXG4gIHNldCBlbWlzc2lvbk1hcCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGJsZW5kTW9kZSgpOiBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2JsZW5kTW9kZTtcbiAgfVxuXG4gIHNldCBibGVuZE1vZGUobTogTVRvb25NYXRlcmlhbFJlbmRlck1vZGUpIHtcbiAgICB0aGlzLl9ibGVuZE1vZGUgPSBtO1xuXG4gICAgdGhpcy5kZXB0aFdyaXRlID0gdGhpcy5fYmxlbmRNb2RlICE9PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudDtcbiAgICB0aGlzLnRyYW5zcGFyZW50ID1cbiAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBkZWJ1Z01vZGUoKTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnTW9kZTtcbiAgfVxuXG4gIHNldCBkZWJ1Z01vZGUobTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSkge1xuICAgIHRoaXMuX2RlYnVnTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgb3V0bGluZVdpZHRoTW9kZSgpOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVXaWR0aE1vZGU7XG4gIH1cblxuICBzZXQgb3V0bGluZVdpZHRoTW9kZShtOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVDb2xvck1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVDb2xvck1vZGUobTogTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBjdWxsTW9kZSgpOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9jdWxsTW9kZTtcbiAgfVxuXG4gIHNldCBjdWxsTW9kZShtOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUpIHtcbiAgICB0aGlzLl9jdWxsTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVDdWxsTW9kZSgpOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ3VsbE1vZGU7XG4gIH1cblxuICBzZXQgb3V0bGluZUN1bGxNb2RlKG06IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVDdWxsTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgZ2V0IHpXcml0ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRlcHRoV3JpdGUgPyAxIDogMDtcbiAgfVxuXG4gIHNldCB6V3JpdGUoaTogbnVtYmVyKSB7XG4gICAgdGhpcy5kZXB0aFdyaXRlID0gMC41IDw9IGk7XG4gIH1cblxuICBnZXQgaXNPdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc091dGxpbmU7XG4gIH1cblxuICBzZXQgaXNPdXRsaW5lKGI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc091dGxpbmUgPSBiO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqIFVzdWFsbHkgdGhpcyB3aWxsIGJlIGNhbGxlZCB2aWEgW1tWUk0udXBkYXRlXV0gc28geW91IGRvbid0IGhhdmUgdG8gY2FsbCB0aGlzIG1hbnVhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVlJNTWF0ZXJpYWxzKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl91dkFuaW1PZmZzZXRYID0gdGhpcy5fdXZBbmltT2Zmc2V0WCArIGRlbHRhICogdGhpcy51dkFuaW1TY3JvbGxYO1xuICAgIHRoaXMuX3V2QW5pbU9mZnNldFkgPSB0aGlzLl91dkFuaW1PZmZzZXRZIC0gZGVsdGEgKiB0aGlzLnV2QW5pbVNjcm9sbFk7IC8vIE5lZ2F0aXZlIHNpbmNlIHQgYXhpcyBvZiB1dnMgYXJlIG9wcG9zaXRlIGZyb20gVW5pdHkncyBvbmVcbiAgICB0aGlzLl91dkFuaW1QaGFzZSA9IHRoaXMuX3V2QW5pbVBoYXNlICsgZGVsdGEgKiB0aGlzLnV2QW5pbVJvdGF0aW9uO1xuXG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiB0aGlzKTogdGhpcyB7XG4gICAgc3VwZXIuY29weShzb3VyY2UpO1xuXG4gICAgLy8gPT0gY29weSBtZW1iZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuY3V0b2ZmID0gc291cmNlLmN1dG9mZjtcbiAgICB0aGlzLmNvbG9yLmNvcHkoc291cmNlLmNvbG9yKTtcbiAgICB0aGlzLnNoYWRlQ29sb3IuY29weShzb3VyY2Uuc2hhZGVDb2xvcik7XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubWFpblRleF9TVC5jb3B5KHNvdXJjZS5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnNoYWRlVGV4dHVyZSA9IHNvdXJjZS5zaGFkZVRleHR1cmU7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xuICAgIHRoaXMubm9ybWFsTWFwVHlwZSA9IHNvdXJjZS5ub3JtYWxNYXBUeXBlO1xuICAgIHRoaXMubm9ybWFsU2NhbGUuY29weSh0aGlzLm5vcm1hbFNjYWxlKTtcbiAgICB0aGlzLnJlY2VpdmVTaGFkb3dSYXRlID0gc291cmNlLnJlY2VpdmVTaGFkb3dSYXRlO1xuICAgIHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgPSBzb3VyY2UucmVjZWl2ZVNoYWRvd1RleHR1cmU7XG4gICAgdGhpcy5zaGFkaW5nR3JhZGVSYXRlID0gc291cmNlLnNoYWRpbmdHcmFkZVJhdGU7XG4gICAgdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlID0gc291cmNlLnNoYWRpbmdHcmFkZVRleHR1cmU7XG4gICAgdGhpcy5zaGFkZVNoaWZ0ID0gc291cmNlLnNoYWRlU2hpZnQ7XG4gICAgdGhpcy5zaGFkZVRvb255ID0gc291cmNlLnNoYWRlVG9vbnk7XG4gICAgdGhpcy5saWdodENvbG9yQXR0ZW51YXRpb24gPSBzb3VyY2UubGlnaHRDb2xvckF0dGVudWF0aW9uO1xuICAgIHRoaXMuaW5kaXJlY3RMaWdodEludGVuc2l0eSA9IHNvdXJjZS5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5O1xuICAgIHRoaXMucmltVGV4dHVyZSA9IHNvdXJjZS5yaW1UZXh0dXJlO1xuICAgIHRoaXMucmltQ29sb3IuY29weShzb3VyY2UucmltQ29sb3IpO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXggPSBzb3VyY2UucmltTGlnaHRpbmdNaXg7XG4gICAgdGhpcy5yaW1GcmVzbmVsUG93ZXIgPSBzb3VyY2UucmltRnJlc25lbFBvd2VyO1xuICAgIHRoaXMucmltTGlmdCA9IHNvdXJjZS5yaW1MaWZ0O1xuICAgIHRoaXMuc3BoZXJlQWRkID0gc291cmNlLnNwaGVyZUFkZDtcbiAgICB0aGlzLmVtaXNzaW9uQ29sb3IuY29weShzb3VyY2UuZW1pc3Npb25Db2xvcik7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoVGV4dHVyZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aCA9IHNvdXJjZS5vdXRsaW5lV2lkdGg7XG4gICAgdGhpcy5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgPSBzb3VyY2Uub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xuICAgIHRoaXMub3V0bGluZUNvbG9yLmNvcHkoc291cmNlLm91dGxpbmVDb2xvcik7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXggPSBzb3VyY2Uub3V0bGluZUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMudXZBbmltTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltTWFza1RleHR1cmU7XG4gICAgdGhpcy51dkFuaW1TY3JvbGxYID0gc291cmNlLnV2QW5pbVNjcm9sbFg7XG4gICAgdGhpcy51dkFuaW1TY3JvbGxZID0gc291cmNlLnV2QW5pbVNjcm9sbFk7XG4gICAgdGhpcy51dkFuaW1Sb3RhdGlvbiA9IHNvdXJjZS51dkFuaW1Sb3RhdGlvbjtcblxuICAgIHRoaXMuZGVidWdNb2RlID0gc291cmNlLmRlYnVnTW9kZTtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IHNvdXJjZS5ibGVuZE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JNb2RlID0gc291cmNlLm91dGxpbmVDb2xvck1vZGU7XG4gICAgdGhpcy5jdWxsTW9kZSA9IHNvdXJjZS5jdWxsTW9kZTtcbiAgICB0aGlzLm91dGxpbmVDdWxsTW9kZSA9IHNvdXJjZS5vdXRsaW5lQ3VsbE1vZGU7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IHNvdXJjZS5pc091dGxpbmU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB1cGRhdGVkIHVuaWZvcm0gdmFyaWFibGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlVbmlmb3JtcygpOiB2b2lkIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbU9mZnNldFgudmFsdWUgPSB0aGlzLl91dkFuaW1PZmZzZXRYO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltT2Zmc2V0WS52YWx1ZSA9IHRoaXMuX3V2QW5pbU9mZnNldFk7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1UaGV0YS52YWx1ZSA9IFRBVSAqIHRoaXMuX3V2QW5pbVBoYXNlO1xuXG4gICAgaWYgKCF0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zID0gZmFsc2U7XG5cbiAgICB0aGlzLnVuaWZvcm1zLmN1dG9mZi52YWx1ZSA9IHRoaXMuY3V0b2ZmO1xuICAgIHRoaXMudW5pZm9ybXMuY29sb3IudmFsdWUuc2V0UkdCKHRoaXMuY29sb3IueCwgdGhpcy5jb2xvci55LCB0aGlzLmNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMuY29sb3JBbHBoYS52YWx1ZSA9IHRoaXMuY29sb3IudztcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMuc2hhZGVDb2xvci54LCB0aGlzLnNoYWRlQ29sb3IueSwgdGhpcy5zaGFkZUNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdGhpcy5tYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5tYWluVGV4X1NULnZhbHVlLmNvcHkodGhpcy5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVGV4dHVyZS52YWx1ZSA9IHRoaXMuc2hhZGVUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlID0gdGhpcy5ub3JtYWxNYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxTY2FsZS52YWx1ZS5jb3B5KHRoaXMubm9ybWFsU2NhbGUpO1xuICAgIHRoaXMudW5pZm9ybXMucmVjZWl2ZVNoYWRvd1JhdGUudmFsdWUgPSB0aGlzLnJlY2VpdmVTaGFkb3dSYXRlO1xuICAgIHRoaXMudW5pZm9ybXMucmVjZWl2ZVNoYWRvd1RleHR1cmUudmFsdWUgPSB0aGlzLnJlY2VpdmVTaGFkb3dUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ0dyYWRlUmF0ZS52YWx1ZSA9IHRoaXMuc2hhZGluZ0dyYWRlUmF0ZTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdHcmFkZVRleHR1cmUudmFsdWUgPSB0aGlzLnNoYWRpbmdHcmFkZVRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZVNoaWZ0LnZhbHVlID0gdGhpcy5zaGFkZVNoaWZ0O1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVUb29ueS52YWx1ZSA9IHRoaXMuc2hhZGVUb29ueTtcbiAgICB0aGlzLnVuaWZvcm1zLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbi52YWx1ZSA9IHRoaXMubGlnaHRDb2xvckF0dGVudWF0aW9uO1xuICAgIHRoaXMudW5pZm9ybXMuaW5kaXJlY3RMaWdodEludGVuc2l0eS52YWx1ZSA9IHRoaXMuaW5kaXJlY3RMaWdodEludGVuc2l0eTtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbVRleHR1cmUudmFsdWUgPSB0aGlzLnJpbVRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1Db2xvci52YWx1ZS5zZXRSR0IodGhpcy5yaW1Db2xvci54LCB0aGlzLnJpbUNvbG9yLnksIHRoaXMucmltQ29sb3Iueik7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peC52YWx1ZSA9IHRoaXMucmltTGlnaHRpbmdNaXg7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1GcmVzbmVsUG93ZXIudmFsdWUgPSB0aGlzLnJpbUZyZXNuZWxQb3dlcjtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUxpZnQudmFsdWUgPSB0aGlzLnJpbUxpZnQ7XG4gICAgdGhpcy51bmlmb3Jtcy5zcGhlcmVBZGQudmFsdWUgPSB0aGlzLnNwaGVyZUFkZDtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaW9uQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMuZW1pc3Npb25Db2xvci54LCB0aGlzLmVtaXNzaW9uQ29sb3IueSwgdGhpcy5lbWlzc2lvbkNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAudmFsdWUgPSB0aGlzLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoVGV4dHVyZS52YWx1ZSA9IHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aC52YWx1ZSA9IHRoaXMub3V0bGluZVdpZHRoO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlLnZhbHVlID0gdGhpcy5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMub3V0bGluZUNvbG9yLngsIHRoaXMub3V0bGluZUNvbG9yLnksIHRoaXMub3V0bGluZUNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4LnZhbHVlID0gdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXg7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1NYXNrVGV4dHVyZS52YWx1ZSA9IHRoaXMudXZBbmltTWFza1RleHR1cmU7XG5cbiAgICAvLyBhcHBseSBjb2xvciBzcGFjZSB0byB1bmlmb3JtIGNvbG9yc1xuICAgIGlmICh0aGlzLmVuY29kaW5nID09PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcbiAgICAgIHRoaXMudW5pZm9ybXMuY29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgdGhpcy51bmlmb3Jtcy5lbWlzc2lvbkNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2hhZGVyQ29kZSgpOiB2b2lkIHtcbiAgICBjb25zdCB1c2VVdkluVmVydCA9IHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZSAhPT0gbnVsbDtcbiAgICBjb25zdCB1c2VVdkluRnJhZyA9XG4gICAgICB0aGlzLm1hcCAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgIT09IG51bGwgfHxcbiAgICAgIHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSAhPT0gbnVsbCB8fFxuICAgICAgdGhpcy5yaW1UZXh0dXJlICE9PSBudWxsIHx8XG4gICAgICB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlICE9PSBudWxsO1xuXG4gICAgdGhpcy5kZWZpbmVzID0ge1xuICAgICAgLy8gVGVtcG9yYXJ5IGNvbXBhdCBhZ2FpbnN0IHNoYWRlciBjaGFuZ2UgQCBUaHJlZS5qcyByMTI2XG4gICAgICAvLyBTZWU6ICMyMTIwNSwgIzIxMzA3LCAjMjEyOTlcbiAgICAgIFRIUkVFX1ZSTV9USFJFRV9SRVZJU0lPTl8xMjY6IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OKSA+PSAxMjYsXG5cbiAgICAgIE9VVExJTkU6IHRoaXMuX2lzT3V0bGluZSxcbiAgICAgIEJMRU5ETU9ERV9PUEFRVUU6IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuT3BhcXVlLFxuICAgICAgQkxFTkRNT0RFX0NVVE9VVDogdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5DdXRvdXQsXG4gICAgICBCTEVORE1PREVfVFJBTlNQQVJFTlQ6XG4gICAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudFdpdGhaV3JpdGUsXG4gICAgICBNVE9PTl9VU0VfVVY6IHVzZVV2SW5WZXJ0IHx8IHVzZVV2SW5GcmFnLCAvLyB3ZSBjYW4ndCB1c2UgYFVTRV9VVmAgLCBpdCB3aWxsIGJlIHJlZGVmaW5lZCBpbiBXZWJHTFByb2dyYW0uanNcbiAgICAgIE1UT09OX1VWU19WRVJURVhfT05MWTogdXNlVXZJblZlcnQgJiYgIXVzZVV2SW5GcmFnLFxuICAgICAgVVNFX1NIQURFVEVYVFVSRTogdGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkU6IHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU0hBRElOR0dSQURFVEVYVFVSRTogdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1JJTVRFWFRVUkU6IHRoaXMucmltVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9TUEhFUkVBREQ6IHRoaXMuc3BoZXJlQWRkICE9PSBudWxsLFxuICAgICAgVVNFX09VVExJTkVXSURUSFRFWFRVUkU6IHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9VVkFOSU1NQVNLVEVYVFVSRTogdGhpcy51dkFuaW1NYXNrVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLk5vcm1hbCxcbiAgICAgIERFQlVHX0xJVFNIQURFUkFURTogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLkxpdFNoYWRlUmF0ZSxcbiAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuVVYsXG4gICAgICBPVVRMSU5FX1dJRFRIX1dPUkxEOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzLFxuICAgICAgT1VUTElORV9XSURUSF9TQ1JFRU46IHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzLFxuICAgICAgT1VUTElORV9DT0xPUl9GSVhFRDogdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUuRml4ZWRDb2xvcixcbiAgICAgIE9VVExJTkVfQ09MT1JfTUlYRUQ6IHRoaXMuX291dGxpbmVDb2xvck1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLk1peGVkTGlnaHRpbmcsXG4gICAgfTtcblxuICAgIC8vID09IHRleHR1cmUgZW5jb2RpbmdzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCBlbmNvZGluZ3MgPVxuICAgICAgKHRoaXMuc2hhZGVUZXh0dXJlICE9PSBudWxsXG4gICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKCdzaGFkZVRleHR1cmVUZXhlbFRvTGluZWFyJywgdGhpcy5zaGFkZVRleHR1cmUuZW5jb2RpbmcpICsgJ1xcbidcbiAgICAgICAgOiAnJykgK1xuICAgICAgKHRoaXMuc3BoZXJlQWRkICE9PSBudWxsXG4gICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKCdzcGhlcmVBZGRUZXhlbFRvTGluZWFyJywgdGhpcy5zcGhlcmVBZGQuZW5jb2RpbmcpICsgJ1xcbidcbiAgICAgICAgOiAnJykgK1xuICAgICAgKHRoaXMucmltVGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbigncmltVGV4dHVyZVRleGVsVG9MaW5lYXInLCB0aGlzLnJpbVRleHR1cmUuZW5jb2RpbmcpICsgJ1xcbidcbiAgICAgICAgOiAnJyk7XG5cbiAgICAvLyA9PSBnZW5lcmF0ZSBzaGFkZXIgY29kZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB2ZXJ0ZXhTaGFkZXI7XG4gICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGVuY29kaW5ncyArIGZyYWdtZW50U2hhZGVyO1xuXG4gICAgLy8gPT0gc2V0IG5lZWRzVXBkYXRlIGZsYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ3VsbEZhY2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3V0bGluZSkge1xuICAgICAgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5PZmYpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkZyb250KSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuQmFjaykge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Gcm9udFNpZGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLk9mZikge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkZyb250KSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2spIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRnJvbnRTaWRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nICovXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL3VubGl0LnZlcnQnO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gJy4vc2hhZGVycy91bmxpdC5mcmFnJztcblxuZXhwb3J0IGludGVyZmFjZSBWUk1VbmxpdE1hdGVyaWFsUGFyYW1ldGVycyBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyB7XG4gIGN1dG9mZj86IG51bWJlcjsgLy8gX0N1dG9mZlxuICBtYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleFxuICBtYWluVGV4PzogVEhSRUUuVGV4dHVyZTsgLy8gX01haW5UZXggKHdpbGwgYmUgcmVuYW1lZCB0byBtYXApXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgbWFpblRleF9TVD86IFRIUkVFLlZlY3RvcjQ7IC8vIF9NYWluVGV4X1NUXG5cbiAgcmVuZGVyVHlwZT86IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgZW51bSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB7XG4gIE9wYXF1ZSxcbiAgQ3V0b3V0LFxuICBUcmFuc3BhcmVudCxcbiAgVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxufVxuXG4vKipcbiAqIFRoaXMgaXMgYSBtYXRlcmlhbCB0aGF0IGlzIGFuIGVxdWl2YWxlbnQgb2YgXCJWUk0vVW5saXQqKipcIiBvbiBWUk0gc3BlYywgdGhvc2UgbWF0ZXJpYWxzIGFyZSBhbHJlYWR5IGtpbmRhIGRlcHJlY2F0ZWQgdGhvdWdoLi4uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1VbmxpdE1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEgW1tWUk1VbmxpdE1hdGVyaWFsXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaXNWUk1VbmxpdE1hdGVyaWFsOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgY3V0b2ZmID0gMC41O1xuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9NYWluVGV4XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgcHVibGljIG1haW5UZXhfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfTWFpblRleF9TVFxuICBwcml2YXRlIF9yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuT3BhcXVlO1xuXG4gIHB1YmxpYyBzaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTsgLy8gd2hlbiB0aGlzIGlzIHRydWUsIGFwcGx5VW5pZm9ybXMgZWZmZWN0c1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM/OiBWUk1VbmxpdE1hdGVyaWFsUGFyYW1ldGVycykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAocGFyYW1ldGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbWV0ZXJzID0ge307XG4gICAgfVxuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIHBhcmFtZXRlcnMuc2tpbm5pbmcgPSBwYXJhbWV0ZXJzLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzID0gcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgPSBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAge1xuICAgICAgICBjdXRvZmY6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIG1haW5UZXhfU1Q6IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCkgfSxcbiAgICAgIH0sXG4gICAgXSk7XG5cbiAgICAvLyA9PSBmaW5hbGx5IGNvbXBpbGUgdGhlIHNoYWRlciBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIGdldCBtYWluVGV4KCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYXA7XG4gIH1cblxuICBzZXQgbWFpblRleCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMubWFwID0gdDtcbiAgfVxuXG4gIGdldCByZW5kZXJUeXBlKCk6IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyVHlwZTtcbiAgfVxuXG4gIHNldCByZW5kZXJUeXBlKHQ6IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlKSB7XG4gICAgdGhpcy5fcmVuZGVyVHlwZSA9IHQ7XG5cbiAgICB0aGlzLmRlcHRoV3JpdGUgPSB0aGlzLl9yZW5kZXJUeXBlICE9PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudDtcbiAgICB0aGlzLnRyYW5zcGFyZW50ID1cbiAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50IHx8XG4gICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIG1hdGVyaWFsLlxuICAgKiBVc3VhbGx5IHRoaXMgd2lsbCBiZSBjYWxsZWQgdmlhIFtbVlJNLnVwZGF0ZV1dIHNvIHlvdSBkb24ndCBoYXZlIHRvIGNhbGwgdGhpcyBtYW51YWxseS5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZSBzaW5jZSBsYXN0IHVwZGF0ZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVZSTU1hdGVyaWFscyhkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiB0aGlzKTogdGhpcyB7XG4gICAgc3VwZXIuY29weShzb3VyY2UpO1xuXG4gICAgLy8gPT0gY29weSBtZW1iZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuY3V0b2ZmID0gc291cmNlLmN1dG9mZjtcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXA7XG4gICAgdGhpcy5tYWluVGV4X1NULmNvcHkoc291cmNlLm1haW5UZXhfU1QpO1xuICAgIHRoaXMucmVuZGVyVHlwZSA9IHNvdXJjZS5yZW5kZXJUeXBlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdXBkYXRlZCB1bmlmb3JtIHZhcmlhYmxlcy5cbiAgICovXG4gIHByaXZhdGUgX2FwcGx5VW5pZm9ybXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zID0gZmFsc2U7XG5cbiAgICB0aGlzLnVuaWZvcm1zLmN1dG9mZi52YWx1ZSA9IHRoaXMuY3V0b2ZmO1xuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdGhpcy5tYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5tYWluVGV4X1NULnZhbHVlLmNvcHkodGhpcy5tYWluVGV4X1NUKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNoYWRlckNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWZpbmVzID0ge1xuICAgICAgUkVOREVSVFlQRV9PUEFRVUU6IHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLk9wYXF1ZSxcbiAgICAgIFJFTkRFUlRZUEVfQ1VUT1VUOiB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5DdXRvdXQsXG4gICAgICBSRU5ERVJUWVBFX1RSQU5TUEFSRU5UOlxuICAgICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudCB8fFxuICAgICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudFdpdGhaV3JpdGUsXG4gICAgfTtcblxuICAgIHRoaXMudmVydGV4U2hhZGVyID0gdmVydGV4U2hhZGVyO1xuICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBmcmFnbWVudFNoYWRlcjtcblxuICAgIC8vID09IHNldCBuZWVkc1VwZGF0ZSBmbGFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgR0xURlNjaGVtYSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgTVRvb25NYXRlcmlhbCwgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWwnO1xuaW1wb3J0IHsgVlJNVW5saXRNYXRlcmlhbCwgVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUgfSBmcm9tICcuL1ZSTVVubGl0TWF0ZXJpYWwnO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGEgW1tWUk1NYXRlcmlhbEltcG9ydGVyXV0gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVlJNTWF0ZXJpYWxJbXBvcnRlck9wdGlvbnMge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZW5jb2Rpbmcgb2YgaW5wdXQgdW5pZm9ybSBjb2xvcnMgYW5kIHRleHR1cmVzLlxuICAgKlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYC5cbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLnNSR0JFbmNvZGluZ2AsIHVzZSBgVEhSRUUuc1JHQkVuY29kaW5nYC5cbiAgICpcbiAgICogVGhlIGltcG9ydGVyIHdpbGwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AgaWYgdGhpcyBvcHRpb24gaXNuJ3Qgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vcmVuZGVyZXJzL1dlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmdcbiAgICovXG4gIGVuY29kaW5nPzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGBQcm9taXNlYCBvZiBlbnZpcm9ubWVudCBtYXAgdGV4dHVyZS5cbiAgICogVGhlIGltcG9ydGVyIHdpbGwgYXR0ZW1wdCB0byBjYWxsIHRoaXMgZnVuY3Rpb24gd2hlbiBpdCBoYXZlIHRvIHVzZSBhbiBlbnZtYXAuXG4gICAqL1xuICByZXF1ZXN0RW52TWFwPzogKCkgPT4gUHJvbWlzZTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG59XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIFZSTSBtYXRlcmlhbHMgZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxJbXBvcnRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2VuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlcXVlc3RFbnZNYXA/OiAoKSA9PiBQcm9taXNlPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTU1hdGVyaWFsSW1wb3J0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgb2YgdGhlIFZSTU1hdGVyaWFsSW1wb3J0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTU1hdGVyaWFsSW1wb3J0ZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLl9lbmNvZGluZyA9IG9wdGlvbnMuZW5jb2RpbmcgfHwgVEhSRUUuTGluZWFyRW5jb2Rpbmc7XG4gICAgaWYgKHRoaXMuX2VuY29kaW5nICE9PSBUSFJFRS5MaW5lYXJFbmNvZGluZyAmJiB0aGlzLl9lbmNvZGluZyAhPT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdUaGUgc3BlY2lmaWVkIGNvbG9yIGVuY29kaW5nIG1pZ2h0IG5vdCB3b3JrIHByb3Blcmx5IHdpdGggVlJNTWF0ZXJpYWxJbXBvcnRlci4gWW91IG1pZ2h0IHdhbnQgdG8gdXNlIFRIUkVFLnNSR0JFbmNvZGluZyBpbnN0ZWFkLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3JlcXVlc3RFbnZNYXAgPSBvcHRpb25zLnJlcXVlc3RFbnZNYXA7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhbGwgdGhlIG1hdGVyaWFscyBvZiBnaXZlbiBHTFRGIGJhc2VkIG9uIFZSTSBleHRlbnNpb24gZmllbGQgYG1hdGVyaWFsUHJvcGVydGllc2AuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNvbnZlcnRHTFRGTWF0ZXJpYWxzKGdsdGY6IEdMVEYpOiBQcm9taXNlPFRIUkVFLk1hdGVyaWFsW10gfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsUHJvcGVydGllczogVlJNU2NoZW1hLk1hdGVyaWFsW10gfCB1bmRlZmluZWQgPSB2cm1FeHQubWF0ZXJpYWxQcm9wZXJ0aWVzO1xuICAgIGlmICghbWF0ZXJpYWxQcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBub2RlUHJpbWl0aXZlc01hcCA9IGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmKTtcbiAgICBjb25zdCBtYXRlcmlhbExpc3Q6IHsgW3ZybU1hdGVyaWFsSW5kZXg6IG51bWJlcl06IHsgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7IG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbCB9IH0gPSB7fTtcbiAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTsgLy8gcmVzdWx0XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obm9kZVByaW1pdGl2ZXNNYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjaGVtYU5vZGU6IEdMVEZTY2hlbWEuTm9kZSA9IGdsdGYucGFyc2VyLmpzb24ubm9kZXNbbm9kZUluZGV4XTtcbiAgICAgICAgY29uc3Qgc2NoZW1hTWVzaDogR0xURlNjaGVtYS5NZXNoID0gZ2x0Zi5wYXJzZXIuanNvbi5tZXNoZXNbc2NoZW1hTm9kZS5tZXNoIV07XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgcHJpbWl0aXZlcy5tYXAoYXN5bmMgKHByaW1pdGl2ZSwgcHJpbWl0aXZlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYVByaW1pdGl2ZSA9IHNjaGVtYU1lc2gucHJpbWl0aXZlc1twcmltaXRpdmVJbmRleF07XG5cbiAgICAgICAgICAgIC8vIHNvbWUgZ2xURiBtaWdodCBoYXZlIGJvdGggYG5vZGUubWVzaGAgYW5kIGBub2RlLmNoaWxkcmVuYCBhdCBvbmNlXG4gICAgICAgICAgICAvLyBhbmQgR0xURkxvYWRlciBoYW5kbGVzIGJvdGggbWVzaCBwcmltaXRpdmVzIGFuZCBcImNoaWxkcmVuXCIgaW4gZ2xURiBhcyBcImNoaWxkcmVuXCIgaW4gVEhSRUVcbiAgICAgICAgICAgIC8vIEl0IHNlZW1zIEdMVEZMb2FkZXIgaGFuZGxlcyBwcmltaXRpdmVzIGZpcnN0IHRoZW4gaGFuZGxlcyBcImNoaWxkcmVuXCIgaW4gZ2xURiAoaXQncyBsdWNreSEpXG4gICAgICAgICAgICAvLyBzbyB3ZSBzaG91bGQgaWdub3JlIChwcmltaXRpdmVzLmxlbmd0aCl0aCBhbmQgZm9sbG93aW5nIGNoaWxkcmVuIG9mIGBtZXNoLmNoaWxkcmVuYFxuICAgICAgICAgICAgLy8gVE9ETzogc2FuaXRpemUgdGhpcyBhZnRlciBHTFRGTG9hZGVyIHBsdWdpbiBzeXN0ZW0gZ2V0cyBpbnRyb2R1Y2VkIDogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE4NDIxXG4gICAgICAgICAgICBpZiAoIXNjaGVtYVByaW1pdGl2ZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZUdlb21ldHJ5ID0gcHJpbWl0aXZlLmdlb21ldHJ5O1xuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlVmVydGljZXMgPSBwcmltaXRpdmVHZW9tZXRyeS5pbmRleFxuICAgICAgICAgICAgICA/IHByaW1pdGl2ZUdlb21ldHJ5LmluZGV4LmNvdW50XG4gICAgICAgICAgICAgIDogcHJpbWl0aXZlR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAvIDM7XG5cbiAgICAgICAgICAgIC8vIGlmIHByaW1pdGl2ZXMgbWF0ZXJpYWwgaXMgbm90IGFuIGFycmF5LCBtYWtlIGl0IGFuIGFycmF5XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJpbWl0aXZlLm1hdGVyaWFsKSkge1xuICAgICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWwgPSBbcHJpbWl0aXZlLm1hdGVyaWFsXTtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlR2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgLyBwdXNoIHRvIGNhY2hlIChvciBwb3AgZnJvbSBjYWNoZSkgdnJtIG1hdGVyaWFsc1xuICAgICAgICAgICAgY29uc3QgdnJtTWF0ZXJpYWxJbmRleCA9IHNjaGVtYVByaW1pdGl2ZS5tYXRlcmlhbCE7XG5cbiAgICAgICAgICAgIGxldCBwcm9wcyA9IG1hdGVyaWFsUHJvcGVydGllc1t2cm1NYXRlcmlhbEluZGV4XTtcbiAgICAgICAgICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1NYXRlcmlhbEltcG9ydGVyOiBUaGVyZSBhcmUgbm8gbWF0ZXJpYWwgZGVmaW5pdGlvbiBmb3IgbWF0ZXJpYWwgIyR7dnJtTWF0ZXJpYWxJbmRleH0gb24gVlJNIGV4dGVuc2lvbi5gLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBwcm9wcyA9IHsgc2hhZGVyOiAnVlJNX1VTRV9HTFRGU0hBREVSJyB9OyAvLyBmYWxsYmFja1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdnJtTWF0ZXJpYWxzOiB7IHN1cmZhY2U6IFRIUkVFLk1hdGVyaWFsOyBvdXRsaW5lPzogVEhSRUUuTWF0ZXJpYWwgfTtcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbExpc3RbdnJtTWF0ZXJpYWxJbmRleF0pIHtcbiAgICAgICAgICAgICAgdnJtTWF0ZXJpYWxzID0gbWF0ZXJpYWxMaXN0W3ZybU1hdGVyaWFsSW5kZXhdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdnJtTWF0ZXJpYWxzID0gYXdhaXQgdGhpcy5jcmVhdGVWUk1NYXRlcmlhbHMocHJpbWl0aXZlLm1hdGVyaWFsWzBdLCBwcm9wcywgZ2x0Zik7XG4gICAgICAgICAgICAgIG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XSA9IHZybU1hdGVyaWFscztcblxuICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaCh2cm1NYXRlcmlhbHMuc3VyZmFjZSk7XG4gICAgICAgICAgICAgIGlmICh2cm1NYXRlcmlhbHMub3V0bGluZSkge1xuICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKHZybU1hdGVyaWFscy5vdXRsaW5lKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdXJmYWNlXG4gICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWxbMF0gPSB2cm1NYXRlcmlhbHMuc3VyZmFjZTtcblxuICAgICAgICAgICAgLy8gZW52bWFwXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVxdWVzdEVudk1hcCAmJiAodnJtTWF0ZXJpYWxzLnN1cmZhY2UgYXMgYW55KS5pc01lc2hTdGFuZGFyZE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RFbnZNYXAoKS50aGVuKChlbnZNYXApID0+IHtcbiAgICAgICAgICAgICAgICAodnJtTWF0ZXJpYWxzLnN1cmZhY2UgYXMgYW55KS5lbnZNYXAgPSBlbnZNYXA7XG4gICAgICAgICAgICAgICAgdnJtTWF0ZXJpYWxzLnN1cmZhY2UubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVuZGVyIG9yZGVyXG4gICAgICAgICAgICBwcmltaXRpdmUucmVuZGVyT3JkZXIgPSBwcm9wcy5yZW5kZXJRdWV1ZSB8fCAyMDAwO1xuXG4gICAgICAgICAgICAvLyBvdXRsaW5lIChcIjIgcGFzcyBzaGFkaW5nIHVzaW5nIGdyb3Vwc1wiIHRyaWNrIGhlcmUpXG4gICAgICAgICAgICBpZiAodnJtTWF0ZXJpYWxzLm91dGxpbmUpIHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlLm1hdGVyaWFsWzFdID0gdnJtTWF0ZXJpYWxzLm91dGxpbmU7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZUdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gbWF0ZXJpYWxzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNyZWF0ZVZSTU1hdGVyaWFscyhcbiAgICBvcmlnaW5hbE1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCxcbiAgICB2cm1Qcm9wczogVlJNU2NoZW1hLk1hdGVyaWFsLFxuICAgIGdsdGY6IEdMVEYsXG4gICk6IFByb21pc2U8e1xuICAgIHN1cmZhY2U6IFRIUkVFLk1hdGVyaWFsO1xuICAgIG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbDtcbiAgfT4ge1xuICAgIGxldCBuZXdTdXJmYWNlOiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcbiAgICBsZXQgbmV3T3V0bGluZTogVEhSRUUuTWF0ZXJpYWwgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL01Ub29uJykge1xuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gZ2V0IHJpZCBvZiB0aGVzZSBwcm9wZXJ0aWVzXG4gICAgICBbJ3NyY0JsZW5kJywgJ2RzdEJsZW5kJywgJ2lzRmlyc3RTZXR1cCddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIHBhcmFtc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoZXNlIHRleHR1cmVzIG11c3QgYmUgc1JHQiBFbmNvZGluZywgZGVwZW5kcyBvbiBjdXJyZW50IGNvbG9yc3BhY2VcbiAgICAgIFsnbWFpblRleCcsICdzaGFkZVRleHR1cmUnLCAnZW1pc3Npb25NYXAnLCAnc3BoZXJlQWRkJywgJ3JpbVRleHR1cmUnXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGlmIChwYXJhbXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBhcmFtc1tuYW1lXS5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc3BlY2lmeSB1bmlmb3JtIGNvbG9yIGVuY29kaW5nc1xuICAgICAgcGFyYW1zLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG5cbiAgICAgIC8vIGRvbmVcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgTVRvb25NYXRlcmlhbChwYXJhbXMpO1xuXG4gICAgICAvLyBvdXRsaW5lXG4gICAgICBpZiAocGFyYW1zLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmUpIHtcbiAgICAgICAgcGFyYW1zLmlzT3V0bGluZSA9IHRydWU7XG4gICAgICAgIG5ld091dGxpbmUgPSBuZXcgTVRvb25NYXRlcmlhbChwYXJhbXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0VGV4dHVyZScpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWU7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdEN1dG91dCcpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5DdXRvdXQ7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50Jykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50O1xuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZScpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZybVByb3BzLnNoYWRlciAhPT0gJ1ZSTV9VU0VfR0xURlNIQURFUicpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBVbmtub3duIHNoYWRlciBkZXRlY3RlZDogXCIke3ZybVByb3BzLnNoYWRlcn1cImApO1xuICAgICAgICAvLyB0aGVuIHByZXN1bWUgYXMgVlJNX1VTRV9HTFRGU0hBREVSXG4gICAgICB9XG5cbiAgICAgIG5ld1N1cmZhY2UgPSB0aGlzLl9jb252ZXJ0R0xURk1hdGVyaWFsKG9yaWdpbmFsTWF0ZXJpYWwuY2xvbmUoKSk7XG4gICAgfVxuXG4gICAgbmV3U3VyZmFjZS5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lO1xuICAgIG5ld1N1cmZhY2UudXNlckRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsTWF0ZXJpYWwudXNlckRhdGEpKTtcbiAgICBuZXdTdXJmYWNlLnVzZXJEYXRhLnZybU1hdGVyaWFsUHJvcGVydGllcyA9IHZybVByb3BzO1xuXG4gICAgaWYgKG5ld091dGxpbmUpIHtcbiAgICAgIG5ld091dGxpbmUubmFtZSA9IG9yaWdpbmFsTWF0ZXJpYWwubmFtZSArICcgKE91dGxpbmUpJztcbiAgICAgIG5ld091dGxpbmUudXNlckRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsTWF0ZXJpYWwudXNlckRhdGEpKTtcbiAgICAgIG5ld091dGxpbmUudXNlckRhdGEudnJtTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdnJtUHJvcHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1cmZhY2U6IG5ld1N1cmZhY2UsXG4gICAgICBvdXRsaW5lOiBuZXdPdXRsaW5lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NYXRlcmlhbHM6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygxKTtcblxuICAgIGlmICghL1tBLVpdLy50ZXN0KG5hbWVbMF0pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTU1hdGVyaWFsczogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVbMF0udG9Mb3dlckNhc2UoKSArIG5hbWUuc3Vic3RyaW5nKDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydEdMVEZNYXRlcmlhbChtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiBUSFJFRS5NYXRlcmlhbCB7XG4gICAgaWYgKChtYXRlcmlhbCBhcyBhbnkpLmlzTWVzaFN0YW5kYXJkTWF0ZXJpYWwpIHtcbiAgICAgIGNvbnN0IG10bCA9IG1hdGVyaWFsIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsO1xuXG4gICAgICBpZiAobXRsLm1hcCkge1xuICAgICAgICBtdGwubWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICB9XG4gICAgICBpZiAobXRsLmVtaXNzaXZlTWFwKSB7XG4gICAgICAgIG10bC5lbWlzc2l2ZU1hcC5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZW5jb2RpbmcgPT09IFRIUkVFLkxpbmVhckVuY29kaW5nKSB7XG4gICAgICAgIG10bC5jb2xvci5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XG4gICAgICAgIG10bC5lbWlzc2l2ZS5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKChtYXRlcmlhbCBhcyBhbnkpLmlzTWVzaEJhc2ljTWF0ZXJpYWwpIHtcbiAgICAgIGNvbnN0IG10bCA9IG1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsO1xuXG4gICAgICBpZiAobXRsLm1hcCkge1xuICAgICAgICBtdGwubWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lbmNvZGluZyA9PT0gVEhSRUUuTGluZWFyRW5jb2RpbmcpIHtcbiAgICAgICAgbXRsLmNvbG9yLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0ZXJpYWw7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKFxuICAgIG9yaWdpbmFsTWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsLFxuICAgIHZybVByb3BzOiBWUk1TY2hlbWEuTWF0ZXJpYWwsXG4gICAgZ2x0ZjogR0xURixcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YXNrTGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdO1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge307XG5cbiAgICAvLyBleHRyYWN0IHRleHR1cmUgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllcykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzKSkge1xuICAgICAgICBjb25zdCBuZXdOYW1lID0gdGhpcy5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcbiAgICAgICAgY29uc3QgdGV4dHVyZUluZGV4ID0gdnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXNbbmFtZV07XG5cbiAgICAgICAgdGFza0xpc3QucHVzaChcbiAgICAgICAgICBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgdGV4dHVyZUluZGV4KS50aGVuKCh0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSB0ZXh0dXJlO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4dHJhY3QgZmxvYXQgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXMpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyh2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLl9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSB2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCB2ZWN0b3IgKGNvbG9yIHRiaCkgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMudmVjdG9yUHJvcGVydGllcykpIHtcbiAgICAgICAgbGV0IG5ld05hbWUgPSB0aGlzLl9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuXG4gICAgICAgIC8vIGlmIHRoaXMgaXMgdGV4dHVyZVNUIChzYW1lIG5hbWUgYXMgdGV4dHVyZSBuYW1lIGl0c2VsZiksIGFkZCAnX1NUJ1xuICAgICAgICBjb25zdCBpc1RleHR1cmVTVCA9IFtcbiAgICAgICAgICAnX01haW5UZXgnLFxuICAgICAgICAgICdfU2hhZGVUZXh0dXJlJyxcbiAgICAgICAgICAnX0J1bXBNYXAnLFxuICAgICAgICAgICdfUmVjZWl2ZVNoYWRvd1RleHR1cmUnLFxuICAgICAgICAgICdfU2hhZGluZ0dyYWRlVGV4dHVyZScsXG4gICAgICAgICAgJ19SaW1UZXh0dXJlJyxcbiAgICAgICAgICAnX1NwaGVyZUFkZCcsXG4gICAgICAgICAgJ19FbWlzc2lvbk1hcCcsXG4gICAgICAgICAgJ19PdXRsaW5lV2lkdGhUZXh0dXJlJyxcbiAgICAgICAgICAnX1V2QW5pbU1hc2tUZXh0dXJlJyxcbiAgICAgICAgXS5zb21lKCh0ZXh0dXJlTmFtZSkgPT4gbmFtZSA9PT0gdGV4dHVyZU5hbWUpO1xuICAgICAgICBpZiAoaXNUZXh0dXJlU1QpIHtcbiAgICAgICAgICBuZXdOYW1lICs9ICdfU1QnO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW25ld05hbWVdID0gbmV3IFRIUkVFLlZlY3RvcjQoLi4udnJtUHJvcHMudmVjdG9yUHJvcGVydGllc1tuYW1lXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IHdoZXRoZXIgaXQgbmVlZHMgc2tpbm5pbmcgYW5kIG1vcnBoaW5nIG9yIG5vdFxuICAgIHBhcmFtcy5za2lubmluZyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkuc2tpbm5pbmcgfHwgZmFsc2U7XG4gICAgcGFyYW1zLm1vcnBoVGFyZ2V0cyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5tb3JwaE5vcm1hbHMgPSAob3JpZ2luYWxNYXRlcmlhbCBhcyBhbnkpLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdCkudGhlbigoKSA9PiBwYXJhbXMpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB7IFZSTU1ldGFJbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFJbXBvcnRlck9wdGlvbnMnO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1NZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhSW1wb3J0ZXIge1xuICAvKipcbiAgICogSWYgYHRydWVgLCBpdCB3b24ndCBsb2FkIGl0cyB0aHVtYm5haWwgdGV4dHVyZSAoe0BsaW5rIFZSTU1ldGEudGV4dHVyZX0pLiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgaWdub3JlVGV4dHVyZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogVlJNTWV0YUltcG9ydGVyT3B0aW9ucykge1xuICAgIHRoaXMuaWdub3JlVGV4dHVyZSA9IG9wdGlvbnM/Lmlnbm9yZVRleHR1cmUgPz8gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGE6IFZSTVNjaGVtYS5NZXRhIHwgdW5kZWZpbmVkID0gdnJtRXh0Lm1ldGE7XG4gICAgaWYgKCFzY2hlbWFNZXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgdGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLmlnbm9yZVRleHR1cmUgJiYgc2NoZW1hTWV0YS50ZXh0dXJlICE9IG51bGwgJiYgc2NoZW1hTWV0YS50ZXh0dXJlICE9PSAtMSkge1xuICAgICAgdGV4dHVyZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ3RleHR1cmUnLCBzY2hlbWFNZXRhLnRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhbGxvd2VkVXNlck5hbWU6IHNjaGVtYU1ldGEuYWxsb3dlZFVzZXJOYW1lLFxuICAgICAgYXV0aG9yOiBzY2hlbWFNZXRhLmF1dGhvcixcbiAgICAgIGNvbW1lcmNpYWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc3NhZ2VOYW1lLFxuICAgICAgY29udGFjdEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvbnRhY3RJbmZvcm1hdGlvbixcbiAgICAgIGxpY2Vuc2VOYW1lOiBzY2hlbWFNZXRhLmxpY2Vuc2VOYW1lLFxuICAgICAgb3RoZXJMaWNlbnNlVXJsOiBzY2hlbWFNZXRhLm90aGVyTGljZW5zZVVybCxcbiAgICAgIG90aGVyUGVybWlzc2lvblVybDogc2NoZW1hTWV0YS5vdGhlclBlcm1pc3Npb25VcmwsXG4gICAgICByZWZlcmVuY2U6IHNjaGVtYU1ldGEucmVmZXJlbmNlLFxuICAgICAgc2V4dWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5zZXh1YWxVc3NhZ2VOYW1lLFxuICAgICAgdGV4dHVyZTogdGV4dHVyZSA/PyB1bmRlZmluZWQsXG4gICAgICB0aXRsZTogc2NoZW1hTWV0YS50aXRsZSxcbiAgICAgIHZlcnNpb246IHNjaGVtYU1ldGEudmVyc2lvbixcbiAgICAgIHZpb2xlbnRVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnZpb2xlbnRVc3NhZ2VOYW1lLFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgTWF0cml4NC5pbnZlcnQoKWAgLyBgTWF0cml4NC5nZXRJbnZlcnNlKClgLlxuICogYE1hdHJpeDQuaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYE1hdHJpeDQuZ2V0SW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBtYXRyaXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnRDb21wYXQ8VCBleHRlbmRzIFRIUkVFLk1hdHJpeDQ+KHRhcmdldDogVCk6IFQge1xuICBpZiAoKHRhcmdldCBhcyBhbnkpLmludmVydCkge1xuICAgIHRhcmdldC5pbnZlcnQoKTtcbiAgfSBlbHNlIHtcbiAgICAodGFyZ2V0IGFzIGFueSkuZ2V0SW52ZXJzZShfbWF0QS5jb3B5KHRhcmdldCkpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IG1hdDRJbnZlcnRDb21wYXQgfSBmcm9tICcuL21hdDRJbnZlcnRDb21wYXQnO1xuXG5leHBvcnQgY2xhc3MgTWF0cml4NEludmVyc2VDYWNoZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdHJpeC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEEgY2FjaGUgb2YgaW52ZXJzZSBvZiBjdXJyZW50IG1hdHJpeC5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0aGF0IG1ha2VzIGl0IHdhbnQgdG8gcmVjYWxjdWxhdGUgaXRzIHtAbGluayBfaW52ZXJzZUNhY2hlfS5cbiAgICogV2lsbCBiZSBzZXQgYHRydWVgIHdoZW4gYGVsZW1lbnRzYCBhcmUgbXV0YXRlZCBhbmQgYmUgdXNlZCBpbiBgZ2V0SW52ZXJzZWAuXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIG9mIGBtYXRyaXguZWxlbWVudHNgXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9vcmlnaW5hbEVsZW1lbnRzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogSW52ZXJzZSBvZiBnaXZlbiBtYXRyaXguXG4gICAqIE5vdGUgdGhhdCBpdCB3aWxsIHJldHVybiBpdHMgaW50ZXJuYWwgcHJpdmF0ZSBpbnN0YW5jZS5cbiAgICogTWFrZSBzdXJlIGNvcHlpbmcgdGhpcyBiZWZvcmUgbXV0YXRlIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2UoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UpIHtcbiAgICAgIG1hdDRJbnZlcnRDb21wYXQodGhpcy5faW52ZXJzZUNhY2hlLmNvcHkodGhpcy5tYXRyaXgpKTtcbiAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW52ZXJzZUNhY2hlO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKG1hdHJpeDogVEhSRUUuTWF0cml4NCkge1xuICAgIHRoaXMubWF0cml4ID0gbWF0cml4O1xuXG4gICAgY29uc3QgaGFuZGxlcjogUHJveHlIYW5kbGVyPG51bWJlcltdPiA9IHtcbiAgICAgIHNldDogKG9iaiwgcHJvcDogbnVtYmVyLCBuZXdWYWwpID0+IHtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG4gICAgICAgIG9ialtwcm9wXSA9IG5ld1ZhbDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuX29yaWdpbmFsRWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XG4gICAgbWF0cml4LmVsZW1lbnRzID0gbmV3IFByb3h5KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMubWF0cml4LmVsZW1lbnRzID0gdGhpcy5fb3JpZ2luYWxFbGVtZW50cztcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgbWF0NEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL21hdDRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgTWF0cml4NEludmVyc2VDYWNoZSB9IGZyb20gJy4uL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzJztcbi8vIGJhc2VkIG9uXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xuXG5jb25zdCBJREVOVElUWV9NQVRSSVg0ID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuTWF0cml4NCgpKTtcbmNvbnN0IElERU5USVRZX1FVQVRFUk5JT04gPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkpO1xuXG4vLyDoqIjnrpfkuK3jga7kuIDmmYLkv53lrZjnlKjlpInmlbDvvIjkuIDluqbjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzjgaPjgZ/jgonjgYLjgajjga/kvb/jgYTlm57jgZnvvIlcbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfbWF0QiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIHNwcmluZyBib25lIG9mIGEgVlJNLlxuICogSXQgc2hvdWxkIGJlIG1hbmFnZWQgYnkgYSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lIHtcbiAgLyoqXG4gICAqIFJhZGl1cyBvZiB0aGUgYm9uZSwgd2lsbCBiZSB1c2VkIGZvciBjb2xsaXNpb24uXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN0aWZmbmVzcyBmb3JjZSBvZiB0aGUgYm9uZS4gSW5jcmVhc2luZyB0aGUgdmFsdWUgPSBmYXN0ZXIgY29udmVyZ2VuY2UgKGZlZWxzIFwiaGFyZGVyXCIpLlxuICAgKiBPbiBVbmlWUk0sIGl0cyByYW5nZSBvbiBHVUkgaXMgYmV0d2VlbiBgMC4wYCBhbmQgYDQuMGAgLlxuICAgKi9cbiAgcHVibGljIHN0aWZmbmVzc0ZvcmNlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFBvd2VyIG9mIHRoZSBncmF2aXR5IGFnYWluc3QgdGhpcyBib25lLlxuICAgKiBUaGUgXCJwb3dlclwiIHVzZWQgaW4gaGVyZSBpcyB2ZXJ5IGZhciBmcm9tIHNjaWVudGlmaWMgcGh5c2ljcyB0ZXJtLi4uXG4gICAqL1xuICBwdWJsaWMgZ3Jhdml0eVBvd2VyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERpcmVjdGlvbiBvZiB0aGUgZ3Jhdml0eSBhZ2FpbnN0IHRoaXMgYm9uZS5cbiAgICogVXN1YWxseSBpdCBzaG91bGQgYmUgbm9ybWFsaXplZC5cbiAgICovXG4gIHB1YmxpYyBncmF2aXR5RGlyOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBEcmFnIGZvcmNlIG9mIHRoZSBib25lLiBJbmNyZWFzaW5nIHRoZSB2YWx1ZSA9IGxlc3Mgb3NjaWxsYXRpb24gKGZlZWxzIFwiaGVhdmllclwiKS5cbiAgICogT24gVW5pVlJNLCBpdHMgcmFuZ2Ugb24gR1VJIGlzIGJldHdlZW4gYDAuMGAgYW5kIGAxLjBgIC5cbiAgICovXG4gIHB1YmxpYyBkcmFnRm9yY2U6IG51bWJlcjtcblxuICAvKipcbiAgICogQ29sbGlkZXIgZ3JvdXBzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlcnM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2hbXTtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFByZXZpb3VzIHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9wcmV2VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIE5leHQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gd29ybGQgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqIEFjdHVhbGx5IHVzZWQgb25seSBpbiBbW3VwZGF0ZV1dIGFuZCBpdCdzIGtpbmQgb2YgdGVtcG9yYXJ5IHZhcmlhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uZXh0VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgYXhpcyBvZiB0aGUgYm9uZSwgaW4gbG9jYWwgdW5pdC5cbiAgICovXG4gIHByb3RlY3RlZCBfYm9uZUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBMZW5ndGggb2YgdGhlIGJvbmUgaW4gcmVsYXRpdmUgc3BhY2UgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciBub3JtYWxpemF0aW9uIGluIHVwZGF0ZSBsb29wLlxuICAgKiBJdCdzIHNhbWUgYXMgbG9jYWwgdW5pdCBsZW5ndGggdW5sZXNzIHRoZXJlIGFyZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbiBpbiB3b3JsZCBtYXRyaXguXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NlbnRlclNwYWNlQm9uZUxlbmd0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiB0aGlzIGJvbmUgaW4gcmVsYXRpdmUgc3BhY2UsIGtpbmQgb2YgYSB0ZW1wb3JhcnkgdmFyaWFibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NlbnRlclNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBUaGlzIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBzcGFjZSByZWxhdGl2ZSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKiBJZiB0aGlzIGlzIGBudWxsYCwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NlbnRlcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGdldCBjZW50ZXIoKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xuICB9XG4gIHB1YmxpYyBzZXQgY2VudGVyKGNlbnRlcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsKSB7XG4gICAgLy8gY29udmVydCB0YWlscyB0byB3b3JsZCBzcGFjZVxuICAgIHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoX21hdEEpO1xuXG4gICAgdGhpcy5fY3VycmVudFRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIHRoaXMuX25leHRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG5cbiAgICAvLyB1bmluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXI/LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLnJldmVydCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGNlbnRlclxuICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblxuICAgIC8vIGluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlKHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29udmVydCB0YWlscyB0byBjZW50ZXIgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcblxuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fcHJldlRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuXG4gICAgLy8gY29udmVydCBjZW50ZXIgc3BhY2UgZGVwZW5kYW50IHN0YXRlXG4gICAgX21hdEEubXVsdGlwbHkodGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8g8J+UpSA/P1xuXG4gICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xuXG4gICAgdGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQVxuICAgICAgLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbilcbiAgICAgIC5hcHBseU1hdHJpeDQoX21hdEEpXG4gICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAubGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRpb24gb2YgcGFyZW50IGJvbmUsIGluIHdvcmxkIHVuaXQuXG4gICAqIFdlIHNob3VsZCB1cGRhdGUgdGhpcyBjb25zdGFudGx5IGluIFtbdXBkYXRlXV0uXG4gICAqL1xuICBwcml2YXRlIF9wYXJlbnRXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgbG9jYWwgbWF0cml4IG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcm90YXRpb24gb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHBvc2l0aW9uIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNU3ByaW5nQm9uZS5cbiAgICpcbiAgICogQHBhcmFtIGJvbmUgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoaXMgYm9uZVxuICAgKiBAcGFyYW0gcGFyYW1zIFNldmVyYWwgcGFyYW1ldGVycyByZWxhdGVkIHRvIGJlaGF2aW9yIG9mIHRoZSBzcHJpbmcgYm9uZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHRoaXMuYm9uZSA9IGJvbmU7IC8vIHVuaVZSTeOBp+OBriBwYXJlbnRcbiAgICB0aGlzLmJvbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlOyAvLyB1cGRhdGXjgavjgojjgoroqIjnrpfjgZXjgozjgovjga7jgad0aHJlZS5qc+WGheOBp+OBruiHquWLleWHpueQhuOBr+S4jeimgVxuXG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXMucmFkaXVzID8/IDAuMDI7XG4gICAgdGhpcy5zdGlmZm5lc3NGb3JjZSA9IHBhcmFtcy5zdGlmZm5lc3NGb3JjZSA/PyAxLjA7XG4gICAgdGhpcy5ncmF2aXR5RGlyID0gcGFyYW1zLmdyYXZpdHlEaXJcbiAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoKS5jb3B5KHBhcmFtcy5ncmF2aXR5RGlyKVxuICAgICAgOiBuZXcgVEhSRUUuVmVjdG9yMygpLnNldCgwLjAsIC0xLjAsIDAuMCk7XG4gICAgdGhpcy5ncmF2aXR5UG93ZXIgPSBwYXJhbXMuZ3Jhdml0eVBvd2VyID8/IDAuMDtcbiAgICB0aGlzLmRyYWdGb3JjZSA9IHBhcmFtcy5kcmFnRm9yY2UgPz8gMC40O1xuICAgIHRoaXMuY29sbGlkZXJzID0gcGFyYW1zLmNvbGxpZGVycyA/PyBbXTtcblxuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG5cbiAgICB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXguY29weSh0aGlzLmJvbmUubWF0cml4KTtcbiAgICB0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbi5jb3B5KHRoaXMuYm9uZS5xdWF0ZXJuaW9uKTtcblxuICAgIGlmICh0aGlzLmJvbmUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyDmnKvnq6/jga7jg5zjg7zjg7PjgILlrZDjg5zjg7zjg7PjgYzjgYTjgarjgYTjgZ/jgoHjgIzoh6rliIbjga7lsJHjgZflhYjjgI3jgYzlrZDjg5zjg7zjg7PjgajjgYTjgYbjgZPjgajjgavjgZnjgotcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzI0wyNDZcbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weSh0aGlzLmJvbmUucG9zaXRpb24pLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKDAuMDcpOyAvLyBtYWdpYyBudW1iZXIhIGRlcml2ZXMgZnJvbSBvcmlnaW5hbCBzb3VyY2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IHRoaXMuYm9uZS5jaGlsZHJlblswXTtcbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weShmaXJzdENoaWxkLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX25leHRUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuXG4gICAgdGhpcy5fYm9uZUF4aXMuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGggPSBfdjNBXG4gICAgICAuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKVxuICAgICAgLmFwcGx5TWF0cml4NCh0aGlzLmJvbmUubWF0cml4V29ybGQpXG4gICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAubGVuZ3RoKCk7XG5cbiAgICB0aGlzLmNlbnRlciA9IHBhcmFtcy5jZW50ZXIgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXIucmVzZXRdXSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX2dldFBhcmVudE1hdHJpeFdvcmxkKCksIHRoaXMuYm9uZS5tYXRyaXgpO1xuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG5cbiAgICAvLyBBcHBseSB1cGRhdGVkIHBvc2l0aW9uIHRvIHRhaWwgc3RhdGVzXG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZV1dIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyDopqrjgrnjg5fjg6rjg7PjgrDjg5zjg7zjg7Pjga7lp7/li6Ljga/luLjjgavlpInljJbjgZfjgabjgYTjgovjgIJcbiAgICAvLyDjgZ3jgozjgavln7rjgaXjgYTjgablh6bnkIbnm7TliY3jgavoh6rliIbjga53b3JsZE1hdHJpeOOCkuabtOaWsOOBl+OBpuOBiuOBj1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX2dldFBhcmVudE1hdHJpeFdvcmxkKCksIHRoaXMuYm9uZS5tYXRyaXgpO1xuXG4gICAgaWYgKHRoaXMuYm9uZS5wYXJlbnQpIHtcbiAgICAgIC8vIFNwcmluZ0JvbmXjga/opqrjgYvjgonpoIbjgavlh6bnkIbjgZXjgozjgabjgYTjgY/jgZ/jgoHjgIFcbiAgICAgIC8vIOimquOBrm1hdHJpeFdvcmxk44Gv5pyA5paw54q25oWL44Gu5YmN5o+Q44Gnd29ybGRNYXRyaXjjgYvjgolxdWF0ZXJuaW9u44KS5Y+W44KK5Ye644GZ44CCXG4gICAgICAvLyDliLbpmZDjga/jgYLjgovjgZHjgozjganjgIHoqIjnrpfjga/lsJHjgarjgYTjga7jgadnZXRXb3JsZFF1YXRlcm5pb27jgafjga/jgarjgY/jgZPjga7mlrnms5XjgpLlj5bjgovjgIJcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5ib25lLnBhcmVudCwgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb24uY29weShJREVOVElUWV9RVUFURVJOSU9OKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYm9uZSBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcbiAgICBfbWF0QS5tdWx0aXBseSh0aGlzLmJvbmUubWF0cml4V29ybGQpOyAvLyDwn5SlID8/XG4gICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xuXG4gICAgLy8gR2V0IHBhcmVudCBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRCKTtcbiAgICBfbWF0Qi5tdWx0aXBseSh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpKTtcblxuICAgIC8vIHNldmVyYWwgcGFyYW1ldGVyc1xuICAgIGNvbnN0IHN0aWZmbmVzcyA9IHRoaXMuc3RpZmZuZXNzRm9yY2UgKiBkZWx0YTtcbiAgICBjb25zdCBleHRlcm5hbCA9IF92M0IuY29weSh0aGlzLmdyYXZpdHlEaXIpLm11bHRpcGx5U2NhbGFyKHRoaXMuZ3Jhdml0eVBvd2VyICogZGVsdGEpO1xuXG4gICAgLy8gdmVybGV056mN5YiG44Gn5qyh44Gu5L2N572u44KS6KiI566XXG4gICAgdGhpcy5fbmV4dFRhaWxcbiAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxuICAgICAgLmFkZChcbiAgICAgICAgX3YzQVxuICAgICAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxuICAgICAgICAgIC5zdWIodGhpcy5fcHJldlRhaWwpXG4gICAgICAgICAgLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLmRyYWdGb3JjZSksXG4gICAgICApIC8vIOWJjeODleODrOODvOODoOOBruenu+WLleOCkue2mee2muOBmeOCiyjmuJvoobDjgoLjgYLjgovjgogpXG4gICAgICAuYWRkKFxuICAgICAgICBfdjNBXG4gICAgICAgICAgLmNvcHkodGhpcy5fYm9uZUF4aXMpXG4gICAgICAgICAgLmFwcGx5TWF0cml4NCh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAgICAgLmFwcGx5TWF0cml4NChfbWF0QilcbiAgICAgICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgLm11bHRpcGx5U2NhbGFyKHN0aWZmbmVzcyksXG4gICAgICApIC8vIOimquOBruWbnui7ouOBq+OCiOOCi+WtkOODnOODvOODs+OBruenu+WLleebruaomVxuICAgICAgLmFkZChleHRlcm5hbCk7IC8vIOWkluWKm+OBq+OCiOOCi+enu+WLlemHj1xuXG4gICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgdGhpcy5fbmV4dFRhaWxcbiAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgLm11bHRpcGx5U2NhbGFyKHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aClcbiAgICAgIC5hZGQodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG5cbiAgICAvLyBDb2xsaXNpb27jgafnp7vli5VcbiAgICB0aGlzLl9jb2xsaXNpb24odGhpcy5fbmV4dFRhaWwpO1xuXG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9uZXh0VGFpbCk7XG5cbiAgICAvLyBBcHBseSByb3RhdGlvbiwgY29udmVydCB2ZWN0b3IzIHRoaW5nIGludG8gYWN0dWFsIHF1YXRlcm5pb25cbiAgICAvLyBPcmlnaW5hbCBVbmlWUk0gaXMgZG9pbmcgd29ybGQgdW5pdCBjYWxjdWx1cyBhdCBoZXJlIGJ1dCB3ZSdyZSBnb25uYSBkbyB0aGlzIG9uIGxvY2FsIHVuaXRcbiAgICAvLyBzaW5jZSBUaHJlZS5qcyBpcyBub3QgZ29vZCBhdCB3b3JsZCBjb29yZGluYXRpb24gc3R1ZmZcbiAgICBjb25zdCBpbml0aWFsQ2VudGVyU3BhY2VNYXRyaXhJbnYgPSBtYXQ0SW52ZXJ0Q29tcGF0KF9tYXRBLmNvcHkoX21hdEIubXVsdGlwbHkodGhpcy5faW5pdGlhbExvY2FsTWF0cml4KSkpO1xuICAgIGNvbnN0IGFwcGx5Um90YXRpb24gPSBfcXVhdEEuc2V0RnJvbVVuaXRWZWN0b3JzKFxuICAgICAgdGhpcy5fYm9uZUF4aXMsXG4gICAgICBfdjNBLmNvcHkodGhpcy5fbmV4dFRhaWwpLmFwcGx5TWF0cml4NChpbml0aWFsQ2VudGVyU3BhY2VNYXRyaXhJbnYpLm5vcm1hbGl6ZSgpLFxuICAgICk7XG5cbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKS5tdWx0aXBseShhcHBseVJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEbyBjb2xsaXNpb24gbWF0aCBhZ2FpbnN0IGV2ZXJ5IGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0YWlsIFRoZSB0YWlsIHlvdSB3YW50IHRvIHByb2Nlc3NcbiAgICovXG4gIHByaXZhdGUgX2NvbGxpc2lvbih0YWlsOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xuICAgICAgX21hdEEubXVsdGlwbHkoY29sbGlkZXIubWF0cml4V29ybGQpO1xuICAgICAgY29uc3QgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uID0gX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xuICAgICAgY29uc3QgY29sbGlkZXJSYWRpdXMgPSBjb2xsaWRlci5nZW9tZXRyeS5ib3VuZGluZ1NwaGVyZSEucmFkaXVzOyAvLyB0aGUgYm91bmRpbmcgc3BoZXJlIGlzIGd1YXJhbnRlZWQgdG8gYmUgZXhpc3QgYnkgVlJNU3ByaW5nQm9uZUltcG9ydGVyLl9jcmVhdGVDb2xsaWRlck1lc2hcbiAgICAgIGNvbnN0IHIgPSB0aGlzLnJhZGl1cyArIGNvbGxpZGVyUmFkaXVzO1xuXG4gICAgICBpZiAodGFpbC5kaXN0YW5jZVRvU3F1YXJlZChjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pIDw9IHIgKiByKSB7XG4gICAgICAgIC8vIOODkuODg+ODiOOAgkNvbGxpZGVy44Gu5Y2K5b6E5pa55ZCR44Gr5oq844GX5Ye644GZXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IF92M0Iuc3ViVmVjdG9ycyh0YWlsLCBjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgICAgICBjb25zdCBwb3NGcm9tQ29sbGlkZXIgPSBfdjNDLmFkZFZlY3RvcnMoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uLCBub3JtYWwubXVsdGlwbHlTY2FsYXIocikpO1xuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgICAgICB0YWlsLmNvcHkoXG4gICAgICAgICAgcG9zRnJvbUNvbGxpZGVyXG4gICAgICAgICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcih0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGgpXG4gICAgICAgICAgICAuYWRkKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIGNlbnRlciBzcGFjZSBpbnRvIHdvcmxkIHNwYWNlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBtYXRyaXhcbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeENlbnRlclRvV29ybGQodGFyZ2V0OiBUSFJFRS5NYXRyaXg0KTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgdGFyZ2V0LmNvcHkodGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyB3b3JsZCBzcGFjZSBpbnRvIGNlbnRlciBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKHRhcmdldDogVEhSRUUuTWF0cml4NCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIHRhcmdldC5jb3B5KCh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkuaW52ZXJzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0UGFyZW50TWF0cml4V29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuYm9uZS5wYXJlbnQgPyB0aGlzLmJvbmUucGFyZW50Lm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVlJNU3ByaW5nQm9uZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgc3ByaW5nIGJvbmUgZ3JvdXAgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCB0eXBlIFZSTVNwcmluZ0JvbmVHcm91cCA9IFZSTVNwcmluZ0JvbmVbXTtcblxuLyoqXG4gKiBBIGNsYXNzIG1hbmFnZXMgZXZlcnkgc3ByaW5nIGJvbmVzIG9uIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10gPSBbXTtcbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmVHcm91cExpc3Q6IFZSTVNwcmluZ0JvbmVHcm91cFtdID0gW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV1cbiAgICpcbiAgICogQHBhcmFtIHNwcmluZ0JvbmVHcm91cExpc3QgQW4gYXJyYXkgb2YgW1tWUk1TcHJpbmdCb25lR3JvdXBdXVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdLCBzcHJpbmdCb25lR3JvdXBMaXN0OiBWUk1TcHJpbmdCb25lR3JvdXBbXSkge1xuICAgIHRoaXMuY29sbGlkZXJHcm91cHMgPSBjb2xsaWRlckdyb3VwcztcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QgPSBzcHJpbmdCb25lR3JvdXBMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbGwgYm9uZXMgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgYG51bGxgIGlzIGdpdmVuLCBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBpbiB3b3JsZCBzcGFjZS5cbiAgICogQHBhcmFtIHJvb3QgUm9vdCBvYmplY3QsIG9yIGBudWxsYFxuICAgKi9cbiAgcHVibGljIHNldENlbnRlcihyb290OiBUSFJFRS5PYmplY3QzRCB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBzcHJpbmdCb25lLmNlbnRlciA9IHJvb3Q7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZXZlcnkgc3ByaW5nIGJvbmUgYXR0YWNoZWQgdG8gdGhpcyBtYW5hZ2VyLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgbGF0ZVVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goKHNwcmluZ0JvbmVHcm91cCkgPT4ge1xuICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgICAgc3ByaW5nQm9uZS51cGRhdGUoZGVsdGEpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgZXZlcnkgc3ByaW5nIGJvbmUgYXR0YWNoZWQgdG8gdGhpcyBtYW5hZ2VyLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBHTFRGTm9kZSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCwgVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUdyb3VwLCBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmNvbnN0IF9jb2xsaWRlck1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgdmlzaWJsZTogZmFsc2UgfSk7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUxvb2tBdEhlYWRdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uIHwgdW5kZWZpbmVkID0gdnJtRXh0LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICAvLyDooZ3nqoHliKTlrprnkIPkvZPjg6Hjg4Pjgrfjg6XjgIJcbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGF3YWl0IHRoaXMuX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyhnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pO1xuXG4gICAgLy8g5ZCM44GY5bGe5oCn77yIc3RpZmZpbmVzc+OChGRyYWdGb3JjZeOBjOWQjOOBmO+8ieOBruODnOODvOODs+OBr2JvbmVHcm91cOOBq+OBvuOBqOOCgeOCieOCjOOBpuOBhOOCi+OAglxuICAgIC8vIOS4gOWIl+OBoOOBkeOBp+OBr+OBquOBhOOBk+OBqOOBq+azqOaEj+OAglxuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cExpc3QgPSBhd2FpdCB0aGlzLl9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiwgY29sbGlkZXJHcm91cHMpO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlcihjb2xsaWRlckdyb3Vwcywgc3ByaW5nQm9uZUdyb3VwTGlzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZVNwcmluZ0JvbmUoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgPSB7fSk6IFZSTVNwcmluZ0JvbmUge1xuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZShib25lLCBwYXJhbXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIF9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uLFxuICAgIGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdLFxuICApOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVHcm91cFtdPiB7XG4gICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwczogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvblNwcmluZ1tdID0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLmJvbmVHcm91cHMgfHwgW107XG5cbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBMaXN0OiBWUk1TcHJpbmdCb25lR3JvdXBbXSA9IFtdO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBzcHJpbmdCb25lR3JvdXBzLm1hcChhc3luYyAodnJtQm9uZUdyb3VwKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuc3RpZmZpbmVzcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnogPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5UG93ZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5kcmFnRm9yY2UgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5oaXRSYWRpdXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5jb2xsaWRlckdyb3VwcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmJvbmVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuY2VudGVyID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RpZmZuZXNzRm9yY2UgPSB2cm1Cb25lR3JvdXAuc3RpZmZpbmVzcztcbiAgICAgICAgY29uc3QgZ3Jhdml0eURpciA9IG5ldyBUSFJFRS5WZWN0b3IzKFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLngsXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueSxcbiAgICAgICAgICAtdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueiwgLy8gVlJNIDAuMCB1c2VzIGxlZnQtaGFuZGVkIHktdXBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZ3Jhdml0eVBvd2VyID0gdnJtQm9uZUdyb3VwLmdyYXZpdHlQb3dlcjtcbiAgICAgICAgY29uc3QgZHJhZ0ZvcmNlID0gdnJtQm9uZUdyb3VwLmRyYWdGb3JjZTtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gdnJtQm9uZUdyb3VwLmhpdFJhZGl1cztcblxuICAgICAgICBjb25zdCBjb2xsaWRlcnM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2hbXSA9IFtdO1xuICAgICAgICB2cm1Cb25lR3JvdXAuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJJbmRleCkgPT4ge1xuICAgICAgICAgIGNvbGxpZGVycy5wdXNoKC4uLmNvbGxpZGVyR3JvdXBzW2NvbGxpZGVySW5kZXhdLmNvbGxpZGVycyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cDogVlJNU3ByaW5nQm9uZUdyb3VwID0gW107XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ib25lcy5tYXAoYXN5bmMgKG5vZGVJbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gVlJN44Gu5oOF5aCx44GL44KJ44CM5o+644KM44Oi44OO44CN44Oc44O844Oz44Gu44Or44O844OI44GM5Y+W44KM44KLXG4gICAgICAgICAgICBjb25zdCBzcHJpbmdSb290Qm9uZTogR0xURk5vZGUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcblxuICAgICAgICAgICAgY29uc3QgY2VudGVyOiBHTFRGTm9kZSA9XG4gICAgICAgICAgICAgIHZybUJvbmVHcm91cC5jZW50ZXIhICE9PSAtMSA/IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCB2cm1Cb25lR3JvdXAuY2VudGVyISkgOiBudWxsO1xuXG4gICAgICAgICAgICAvLyBpdCdzIHdlaXJkIGJ1dCB0aGVyZSBtaWdodCBiZSBjYXNlcyB3ZSBjYW4ndCBmaW5kIHRoZSByb290IGJvbmVcbiAgICAgICAgICAgIGlmICghc3ByaW5nUm9vdEJvbmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcHJpbmdSb290Qm9uZS50cmF2ZXJzZSgoYm9uZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzcHJpbmdCb25lID0gdGhpcy5fY3JlYXRlU3ByaW5nQm9uZShib25lLCB7XG4gICAgICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgICAgIHN0aWZmbmVzc0ZvcmNlLFxuICAgICAgICAgICAgICAgIGdyYXZpdHlEaXIsXG4gICAgICAgICAgICAgICAgZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgICAgICAgIGRyYWdGb3JjZSxcbiAgICAgICAgICAgICAgICBjb2xsaWRlcnMsXG4gICAgICAgICAgICAgICAgY2VudGVyLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc3ByaW5nQm9uZUdyb3VwLnB1c2goc3ByaW5nQm9uZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcblxuICAgICAgICBzcHJpbmdCb25lR3JvdXBMaXN0LnB1c2goc3ByaW5nQm9uZUdyb3VwKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gc3ByaW5nQm9uZUdyb3VwTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gYXJyYXkgb2YgW1tWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cF1dLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiBBIGBzZWNvbmRhcnlBbmltYXRpb25gIGZpZWxkIG9mIFZSTVxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIF9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoXG4gICAgZ2x0ZjogR0xURixcbiAgICBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb246IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb24sXG4gICk6IFByb21pc2U8VlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXT4ge1xuICAgIGNvbnN0IHZybUNvbGxpZGVyR3JvdXBzID0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLmNvbGxpZGVyR3JvdXBzO1xuICAgIGlmICh2cm1Db2xsaWRlckdyb3VwcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSA9IFtdO1xuICAgIHZybUNvbGxpZGVyR3JvdXBzLmZvckVhY2goYXN5bmMgKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGlmIChjb2xsaWRlckdyb3VwLm5vZGUgPT09IHVuZGVmaW5lZCB8fCBjb2xsaWRlckdyb3VwLmNvbGxpZGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYm9uZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBjb2xsaWRlckdyb3VwLm5vZGUpO1xuICAgICAgY29uc3QgY29sbGlkZXJzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoW10gPSBbXTtcbiAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC54ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnogPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLnJhZGl1cyA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IF92M0Euc2V0KFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC54LFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC55LFxuICAgICAgICAgIC1jb2xsaWRlci5vZmZzZXQueiwgLy8gVlJNIDAuMCB1c2VzIGxlZnQtaGFuZGVkIHktdXBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY29sbGlkZXJNZXNoID0gdGhpcy5fY3JlYXRlQ29sbGlkZXJNZXNoKGNvbGxpZGVyLnJhZGl1cywgb2Zmc2V0KTtcblxuICAgICAgICBib25lLmFkZChjb2xsaWRlck1lc2gpO1xuICAgICAgICBjb2xsaWRlcnMucHVzaChjb2xsaWRlck1lc2gpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvbGxpZGVyTWVzaEdyb3VwID0ge1xuICAgICAgICBub2RlOiBjb2xsaWRlckdyb3VwLm5vZGUsXG4gICAgICAgIGNvbGxpZGVycyxcbiAgICAgIH07XG4gICAgICBjb2xsaWRlckdyb3Vwcy5wdXNoKGNvbGxpZGVyTWVzaEdyb3VwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xsaWRlckdyb3VwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb2xsaWRlciBtZXNoLlxuICAgKlxuICAgKiBAcGFyYW0gcmFkaXVzIFJhZGl1cyBvZiB0aGUgbmV3IGNvbGxpZGVyIG1lc2hcbiAgICogQHBhcmFtIG9mZnNldCBPZmZlc3Qgb2YgdGhlIG5ldyBjb2xsaWRlciBtZXNoXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NyZWF0ZUNvbGxpZGVyTWVzaChyYWRpdXM6IG51bWJlciwgb2Zmc2V0OiBUSFJFRS5WZWN0b3IzKTogVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaCB7XG4gICAgY29uc3QgY29sbGlkZXJNZXNoID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUJ1ZmZlckdlb21ldHJ5KHJhZGl1cywgOCwgNCksIF9jb2xsaWRlck1hdGVyaWFsKTtcblxuICAgIGNvbGxpZGVyTWVzaC5wb3NpdGlvbi5jb3B5KG9mZnNldCk7XG5cbiAgICAvLyB0aGUgbmFtZSBoYXZlIHRvIGJlIHRoaXMgaW4gb3JkZXIgdG8gZXhjbHVkZSBjb2xsaWRlcnMgZnJvbSBib3VuZGluZyBib3hcbiAgICAvLyAoU2VlIFZpZXdlci50cywgc2VhcmNoIGZvciBjaGlsZC5uYW1lID09PSAndnJtQ29sbGlkZXJTcGhlcmUnKVxuICAgIGNvbGxpZGVyTWVzaC5uYW1lID0gJ3ZybUNvbGxpZGVyU3BoZXJlJztcblxuICAgIC8vIFdlIHdpbGwgdXNlIHRoZSByYWRpdXMgb2YgdGhlIHNwaGVyZSBmb3IgY29sbGlzaW9uIHZzIGJvbmVzLlxuICAgIC8vIGBib3VuZGluZ1NwaGVyZWAgbXVzdCBiZSBjcmVhdGVkIHRvIGNvbXB1dGUgdGhlIHJhZGl1cy5cbiAgICBjb2xsaWRlck1lc2guZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XG5cbiAgICByZXR1cm4gY29sbGlkZXJNZXNoO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlSW1wb3J0ZXIgfSBmcm9tICcuL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb25JbXBvcnRlciB9IGZyb20gJy4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRJbXBvcnRlciB9IGZyb20gJy4vaHVtYW5vaWQvVlJNSHVtYW5vaWRJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlciB9IGZyb20gJy4vbG9va2F0L1ZSTUxvb2tBdEltcG9ydGVyJztcbmltcG9ydCB7IFZSTU1hdGVyaWFsSW1wb3J0ZXIgfSBmcm9tICcuL21hdGVyaWFsJztcbmltcG9ydCB7IFZSTU1ldGFJbXBvcnRlciB9IGZyb20gJy4vbWV0YS9WUk1NZXRhSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUltcG9ydGVyIH0gZnJvbSAnLi9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk0gfSBmcm9tICcuL1ZSTSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNSW1wb3J0ZXJPcHRpb25zIHtcbiAgbWV0YUltcG9ydGVyPzogVlJNTWV0YUltcG9ydGVyO1xuICBsb29rQXRJbXBvcnRlcj86IFZSTUxvb2tBdEltcG9ydGVyO1xuICBodW1hbm9pZEltcG9ydGVyPzogVlJNSHVtYW5vaWRJbXBvcnRlcjtcbiAgYmxlbmRTaGFwZUltcG9ydGVyPzogVlJNQmxlbmRTaGFwZUltcG9ydGVyO1xuICBmaXJzdFBlcnNvbkltcG9ydGVyPzogVlJNRmlyc3RQZXJzb25JbXBvcnRlcjtcbiAgbWF0ZXJpYWxJbXBvcnRlcj86IFZSTU1hdGVyaWFsSW1wb3J0ZXI7XG4gIHNwcmluZ0JvbmVJbXBvcnRlcj86IFZSTVNwcmluZ0JvbmVJbXBvcnRlcjtcbn1cblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTV1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUltcG9ydGVyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9tZXRhSW1wb3J0ZXI6IFZSTU1ldGFJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ibGVuZFNoYXBlSW1wb3J0ZXI6IFZSTUJsZW5kU2hhcGVJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9sb29rQXRJbXBvcnRlcjogVlJNTG9va0F0SW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfaHVtYW5vaWRJbXBvcnRlcjogVlJNSHVtYW5vaWRJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maXJzdFBlcnNvbkltcG9ydGVyOiBWUk1GaXJzdFBlcnNvbkltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX21hdGVyaWFsSW1wb3J0ZXI6IFZSTU1hdGVyaWFsSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3ByaW5nQm9uZUltcG9ydGVyOiBWUk1TcHJpbmdCb25lSW1wb3J0ZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1JbXBvcnRlci5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgW1tWUk1JbXBvcnRlck9wdGlvbnNdXSwgb3B0aW9uYWxseSBjb250YWlucyBpbXBvcnRlcnMgZm9yIGVhY2ggY29tcG9uZW50XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogVlJNSW1wb3J0ZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLl9tZXRhSW1wb3J0ZXIgPSBvcHRpb25zLm1ldGFJbXBvcnRlciB8fCBuZXcgVlJNTWV0YUltcG9ydGVyKCk7XG4gICAgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyID0gb3B0aW9ucy5ibGVuZFNoYXBlSW1wb3J0ZXIgfHwgbmV3IFZSTUJsZW5kU2hhcGVJbXBvcnRlcigpO1xuICAgIHRoaXMuX2xvb2tBdEltcG9ydGVyID0gb3B0aW9ucy5sb29rQXRJbXBvcnRlciB8fCBuZXcgVlJNTG9va0F0SW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9odW1hbm9pZEltcG9ydGVyID0gb3B0aW9ucy5odW1hbm9pZEltcG9ydGVyIHx8IG5ldyBWUk1IdW1hbm9pZEltcG9ydGVyKCk7XG4gICAgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlciA9IG9wdGlvbnMuZmlyc3RQZXJzb25JbXBvcnRlciB8fCBuZXcgVlJNRmlyc3RQZXJzb25JbXBvcnRlcigpO1xuICAgIHRoaXMuX21hdGVyaWFsSW1wb3J0ZXIgPSBvcHRpb25zLm1hdGVyaWFsSW1wb3J0ZXIgfHwgbmV3IFZSTU1hdGVyaWFsSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9zcHJpbmdCb25lSW1wb3J0ZXIgPSBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciB8fCBuZXcgVlJNU3ByaW5nQm9uZUltcG9ydGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVjZWl2ZSBhIEdMVEYgb2JqZWN0IHJldHJpZXZlZCBmcm9tIGBUSFJFRS5HTFRGTG9hZGVyYCBhbmQgY3JlYXRlIGEgbmV3IFtbVlJNXV0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0+IHtcbiAgICBpZiAoZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zID09PSB1bmRlZmluZWQgfHwgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIFZSTSBleHRlbnNpb24gb24gdGhlIEdMVEYnKTtcbiAgICB9XG4gICAgY29uc3Qgc2NlbmUgPSBnbHRmLnNjZW5lO1xuXG4gICAgc2NlbmUudXBkYXRlTWF0cml4V29ybGQoZmFsc2UpO1xuXG4gICAgLy8gU2tpbm5lZCBvYmplY3Qgc2hvdWxkIG5vdCBiZSBmcnVzdHVtQ3VsbGVkXG4gICAgLy8gU2luY2UgcHJlLXNraW5uZWQgcG9zaXRpb24gbWlnaHQgYmUgb3V0c2lkZSBvZiB2aWV3XG4gICAgc2NlbmUudHJhdmVyc2UoKG9iamVjdDNkKSA9PiB7XG4gICAgICBpZiAoKG9iamVjdDNkIGFzIGFueSkuaXNNZXNoKSB7XG4gICAgICAgIG9iamVjdDNkLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1ldGEgPSAoYXdhaXQgdGhpcy5fbWV0YUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxzID0gKGF3YWl0IHRoaXMuX21hdGVyaWFsSW1wb3J0ZXIuY29udmVydEdMVEZNYXRlcmlhbHMoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGh1bWFub2lkID0gKGF3YWl0IHRoaXMuX2h1bWFub2lkSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBmaXJzdFBlcnNvbiA9IGh1bWFub2lkID8gKGF3YWl0IHRoaXMuX2ZpcnN0UGVyc29uSW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGh1bWFub2lkKSkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgYmxlbmRTaGFwZVByb3h5ID0gKGF3YWl0IHRoaXMuX2JsZW5kU2hhcGVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGxvb2tBdCA9XG4gICAgICBmaXJzdFBlcnNvbiAmJiBibGVuZFNoYXBlUHJveHkgJiYgaHVtYW5vaWRcbiAgICAgICAgPyAoYXdhaXQgdGhpcy5fbG9va0F0SW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKSkgfHwgdW5kZWZpbmVkXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgc3ByaW5nQm9uZU1hbmFnZXIgPSAoYXdhaXQgdGhpcy5fc3ByaW5nQm9uZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIG5ldyBWUk0oe1xuICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXG4gICAgICBtZXRhLFxuICAgICAgbWF0ZXJpYWxzLFxuICAgICAgaHVtYW5vaWQsXG4gICAgICBmaXJzdFBlcnNvbixcbiAgICAgIGJsZW5kU2hhcGVQcm94eSxcbiAgICAgIGxvb2tBdCxcbiAgICAgIHNwcmluZ0JvbmVNYW5hZ2VyLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlUHJveHkgfSBmcm9tICcuL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL2ZpcnN0cGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi9sb29rYXQnO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YS9WUk1NZXRhJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9zcHJpbmdib25lJztcbmltcG9ydCB7IGRlZXBEaXNwb3NlIH0gZnJvbSAnLi91dGlscy9kaXNwb3Nlcic7XG5pbXBvcnQgeyBWUk1JbXBvcnRlciwgVlJNSW1wb3J0ZXJPcHRpb25zIH0gZnJvbSAnLi9WUk1JbXBvcnRlcic7XG5cbi8qKlxuICogUGFyYW1ldGVycyBmb3IgYSBbW1ZSTV1dIGNsYXNzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZSTVBhcmFtZXRlcnMge1xuICBzY2VuZTogVEhSRUUuU2NlbmUgfCBUSFJFRS5Hcm91cDsgLy8gQ09NUEFUOiBgR0xURi5zY2VuZWAgaXMgZ29pbmcgdG8gYmUgYFRIUkVFLkdyb3VwYCBpbiByMTE0XG4gIGh1bWFub2lkPzogVlJNSHVtYW5vaWQ7XG4gIGJsZW5kU2hhcGVQcm94eT86IFZSTUJsZW5kU2hhcGVQcm94eTtcbiAgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcbiAgbG9va0F0PzogVlJNTG9va0F0SGVhZDtcbiAgbWF0ZXJpYWxzPzogVEhSRUUuTWF0ZXJpYWxbXTtcbiAgc3ByaW5nQm9uZU1hbmFnZXI/OiBWUk1TcHJpbmdCb25lTWFuYWdlcjtcbiAgbWV0YT86IFZSTU1ldGE7XG59XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICogU2VlIHRoZSBkb2N1bWVudGF0aW9uIG9mIFtbVlJNLmZyb21dXSBmb3IgdGhlIG1vc3QgYmFzaWMgdXNlIG9mIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNIGZyb20gYSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyLlxuICAgKiBJdCdzIHByb2JhYmx5IGEgdGhpbmcgd2hhdCB5b3Ugd2FudCB0byBnZXQgc3RhcnRlZCB3aXRoIFZSTXMuXG4gICAqXG4gICAqIEBleGFtcGxlIE1vc3QgYmFzaWMgdXNlIG9mIFZSTVxuICAgKiBgYGBcbiAgICogY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICpcbiAgICogbmV3IFRIUkVFLkdMVEZMb2FkZXIoKS5sb2FkKCAnbW9kZWxzL3RocmVlLXZybS1naXJsLnZybScsICggZ2x0ZiApID0+IHtcbiAgICpcbiAgICogICBUSFJFRS5WUk0uZnJvbSggZ2x0ZiApLnRoZW4oICggdnJtICkgPT4ge1xuICAgKlxuICAgKiAgICAgc2NlbmUuYWRkKCB2cm0uc2NlbmUgKTtcbiAgICpcbiAgICogICB9ICk7XG4gICAqXG4gICAqIH0gKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIEdMVEYgb2JqZWN0IHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRoYXQgd2lsbCBiZSB1c2VkIGluIGltcG9ydGVyXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIGZyb20oZ2x0ZjogR0xURiwgb3B0aW9uczogVlJNSW1wb3J0ZXJPcHRpb25zID0ge30pOiBQcm9taXNlPFZSTT4ge1xuICAgIGNvbnN0IGltcG9ydGVyID0gbmV3IFZSTUltcG9ydGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBhd2FpdCBpbXBvcnRlci5pbXBvcnQoZ2x0Zik7XG4gIH1cbiAgLyoqXG4gICAqIGBUSFJFRS5TY2VuZWAgb3IgYFRIUkVFLkdyb3VwYCAoZGVwZW5kcyBvbiB5b3VyIHRocmVlLmpzIHJldmlzaW9uKSB0aGF0IGNvbnRhaW5zIHRoZSBlbnRpcmUgVlJNLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBUSFJFRS5TY2VuZSB8IFRIUkVFLkdyb3VwOyAvLyBDT01QQVQ6IGBHTFRGLnNjZW5lYCBpcyBnb2luZyB0byBiZSBgVEhSRUUuR3JvdXBgIGluIHIxMTRcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1IdW1hbm9pZF1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gY29udHJvbCBlYWNoIGJvbmVzIHVzaW5nIFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZU5vZGVdXS5cbiAgICpcbiAgICogQFRPRE8gQWRkIGEgbGluayB0byBWUk0gc3BlY1xuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkPzogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNQmxlbmRTaGFwZVByb3h5XV0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY29udHJvbCB0aGVzZSBmYWNpYWwgZXhwcmVzc2lvbnMgdmlhIFtbVlJNQmxlbmRTaGFwZVByb3h5LnNldFZhbHVlXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYmxlbmRTaGFwZVByb3h5PzogVlJNQmxlbmRTaGFwZVByb3h5O1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUZpcnN0UGVyc29uXV0gb2YgdGhlIFZSTS5cbiAgICogWW91IGNhbiB1c2UgdmFyaW91cyBmZWF0dXJlIG9mIHRoZSBmaXJzdFBlcnNvbiBmaWVsZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvbj86IFZSTUZpcnN0UGVyc29uO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUxvb2tBdEhlYWRdXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2UgW1tWUk1Mb29rQXRIZWFkLnRhcmdldF1dIHRvIGNvbnRyb2wgdGhlIGV5ZSBkaXJlY3Rpb24gb2YgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdD86IFZSTUxvb2tBdEhlYWQ7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIG1hdGVyaWFscyBvZiB0aGUgVlJNLlxuICAgKiBgdXBkYXRlVlJNTWF0ZXJpYWxzYCBtZXRob2Qgb2YgdGhlc2UgbWF0ZXJpYWxzIHdpbGwgYmUgY2FsbGVkIHZpYSBpdHMgW1tWUk0udXBkYXRlXV0gbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFscz86IFRIUkVFLk1hdGVyaWFsW107XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIG1ldGEgZmllbGRzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHJlZmVyIHRoZXNlIGxpY2Vuc2UgZmllbGRzIGJlZm9yZSB1c2UgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1ldGE/OiBWUk1NZXRhO1xuXG4gIC8qKlxuICAgKiBBIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXSBtYW5pcHVsYXRlcyBhbGwgc3ByaW5nIGJvbmVzIGF0dGFjaGVkIG9uIHRoZSBWUk0uXG4gICAqIFVzdWFsbHkgeW91IGRvbid0IGhhdmUgdG8gY2FyZSBhYm91dCB0aGlzIHByb3BlcnR5LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmVNYW5hZ2VyPzogVlJNU3ByaW5nQm9uZU1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNUGFyYW1ldGVycykge1xuICAgIHRoaXMuc2NlbmUgPSBwYXJhbXMuc2NlbmU7XG4gICAgdGhpcy5odW1hbm9pZCA9IHBhcmFtcy5odW1hbm9pZDtcbiAgICB0aGlzLmJsZW5kU2hhcGVQcm94eSA9IHBhcmFtcy5ibGVuZFNoYXBlUHJveHk7XG4gICAgdGhpcy5maXJzdFBlcnNvbiA9IHBhcmFtcy5maXJzdFBlcnNvbjtcbiAgICB0aGlzLmxvb2tBdCA9IHBhcmFtcy5sb29rQXQ7XG4gICAgdGhpcy5tYXRlcmlhbHMgPSBwYXJhbXMubWF0ZXJpYWxzO1xuICAgIHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIgPSBwYXJhbXMuc3ByaW5nQm9uZU1hbmFnZXI7XG4gICAgdGhpcy5tZXRhID0gcGFyYW1zLm1ldGE7XG4gIH1cblxuICAvKipcbiAgICogKipZb3UgbmVlZCB0byBjYWxsIHRoaXMgb24geW91ciB1cGRhdGUgbG9vcC4qKlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgZXZlcnkgVlJNIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvb2tBdCkge1xuICAgICAgdGhpcy5sb29rQXQudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ibGVuZFNoYXBlUHJveHkpIHtcbiAgICAgIHRoaXMuYmxlbmRTaGFwZVByb3h5LnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyKSB7XG4gICAgICB0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyLmxhdGVVcGRhdGUoZGVsdGEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1hdGVyaWFscykge1xuICAgICAgdGhpcy5tYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWw6IGFueSkgPT4ge1xuICAgICAgICBpZiAobWF0ZXJpYWwudXBkYXRlVlJNTWF0ZXJpYWxzKSB7XG4gICAgICAgICAgbWF0ZXJpYWwudXBkYXRlVlJNTWF0ZXJpYWxzKGRlbHRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgZXZlcnl0aGluZyBhYm91dCB0aGUgVlJNIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgY29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xuICAgIGlmIChzY2VuZSkge1xuICAgICAgZGVlcERpc3Bvc2Uoc2NlbmUpO1xuICAgIH1cblxuICAgIHRoaXMubWV0YT8udGV4dHVyZT8uZGlzcG9zZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk0gfSBmcm9tICcuLi9WUk0nO1xuXG5jb25zdCBfdjJBID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuY29uc3QgX2NhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIC0xLCAxLCAtMSwgMSk7XG5jb25zdCBfbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG5jb25zdCBfcGxhbmUgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgX21hdGVyaWFsKTtcbmNvbnN0IF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuX3NjZW5lLmFkZChfcGxhbmUpO1xuXG4vKipcbiAqIEV4dHJhY3QgYSB0aHVtYm5haWwgaW1hZ2UgYmxvYiBmcm9tIGEge0BsaW5rIFZSTX0uXG4gKiBJZiB0aGUgdnJtIGRvZXMgbm90IGhhdmUgYSB0aHVtYm5haWwsIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuXG4gKiBAcGFyYW0gcmVuZGVyZXIgUmVuZGVyZXJcbiAqIEBwYXJhbSB2cm0gVlJNIHdpdGggYSB0aHVtYm5haWxcbiAqIEBwYXJhbSBzaXplIHdpZHRoIC8gaGVpZ2h0IG9mIHRoZSBpbWFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRodW1ibmFpbEJsb2IocmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXIsIHZybTogVlJNLCBzaXplID0gNTEyKTogUHJvbWlzZTxCbG9iPiB7XG4gIC8vIGdldCB0aGUgdGV4dHVyZVxuICBjb25zdCB0ZXh0dXJlID0gdnJtLm1ldGE/LnRleHR1cmU7XG4gIGlmICghdGV4dHVyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXh0cmFjdFRodW1ibmFpbEJsb2I6IFRoaXMgVlJNIGRvZXMgbm90IGhhdmUgYSB0aHVtYm5haWwnKTtcbiAgfVxuXG4gIGNvbnN0IGNhbnZhcyA9IHJlbmRlcmVyLmdldENvbnRleHQoKS5jYW52YXM7XG5cbiAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgcmVzb2x1dGlvblxuICByZW5kZXJlci5nZXRTaXplKF92MkEpO1xuICBjb25zdCBwcmV2V2lkdGggPSBfdjJBLng7XG4gIGNvbnN0IHByZXZIZWlnaHQgPSBfdjJBLnk7XG5cbiAgLy8gb3ZlcndyaXRlIHRoZSByZXNvbHV0aW9uXG4gIHJlbmRlcmVyLnNldFNpemUoc2l6ZSwgc2l6ZSwgZmFsc2UpO1xuXG4gIC8vIGFzc2lnbiB0aGUgdGV4dHVyZSB0byBwbGFuZVxuICBfbWF0ZXJpYWwubWFwID0gdGV4dHVyZTtcblxuICAvLyByZW5kZXJcbiAgcmVuZGVyZXIucmVuZGVyKF9zY2VuZSwgX2NhbWVyYSk7XG5cbiAgLy8gdW5hc3NpZ24gdGhlIHRleHR1cmVcbiAgX21hdGVyaWFsLm1hcCA9IG51bGw7XG5cbiAgLy8gZ2V0IGJsb2JcbiAgaWYgKGNhbnZhcyBpbnN0YW5jZW9mIE9mZnNjcmVlbkNhbnZhcykge1xuICAgIHJldHVybiBjYW52YXMuY29udmVydFRvQmxvYigpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgLy8gcmV2ZXJ0IHRvIHByZXZpb3VzIHJlc29sdXRpb25cbiAgICAgIHJlbmRlcmVyLnNldFNpemUocHJldldpZHRoLCBwcmV2SGVpZ2h0LCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNhbnZhcy50b0Jsb2IoKGJsb2IpID0+IHtcbiAgICAgIC8vIHJldmVydCB0byBwcmV2aW91cyByZXNvbHV0aW9uXG4gICAgICByZW5kZXJlci5zZXRTaXplKHByZXZXaWR0aCwgcHJldkhlaWdodCwgZmFsc2UpO1xuXG4gICAgICBpZiAoYmxvYiA9PSBudWxsKSB7XG4gICAgICAgIHJlamVjdCgnZXh0cmFjdFRodW1ibmFpbEJsb2I6IEZhaWxlZCB0byBjcmVhdGUgYSBibG9iJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGJsb2IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBnaXZlbiBvYmplY3QgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyaWx5IGJvdW5kIGpvaW50cyBmcm9tIGV2ZXJ5IGBUSFJFRS5Ta2lubmVkTWVzaGAuXG4gKiBTb21lIGVudmlyb25tZW50cyBsaWtlIG1vYmlsZSBkZXZpY2VzIGhhdmUgYSBsb3dlciBsaW1pdCBvZiBib25lcyBhbmQgbWlnaHQgYmUgdW5hYmxlIHRvIHBlcmZvcm0gbWVzaCBza2lubmluZywgdGhpcyBmdW5jdGlvbiBtaWdodCByZXNvbHZlIHN1Y2ggYW4gaXNzdWUuXG4gKiBBbHNvIHRoaXMgZnVuY3Rpb24gbWlnaHQgZ3JlYXRseSBpbXByb3ZlIHRoZSBwZXJmb3JtYW5jZSBvZiBtZXNoIHNraW5uaW5nLlxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzKHJvb3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIC8vIHNvbWUgbWVzaGVzIG1pZ2h0IHNoYXJlIGEgc2FtZSBza2luSW5kZXggYXR0cmlidXRlIGFuZCB0aGlzIG1hcCBwcmV2ZW50cyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdHdpY2VcbiAgY29uc3Qgc2tlbGV0b25MaXN0OiBNYXA8VEhSRUUuQnVmZmVyQXR0cmlidXRlLCBUSFJFRS5Ta2VsZXRvbj4gPSBuZXcgTWFwKCk7XG5cbiAgLy8gVHJhdmVyc2UgYW4gZW50aXJlIHRyZWVcbiAgcm9vdC50cmF2ZXJzZSgob2JqKSA9PiB7XG4gICAgaWYgKG9iai50eXBlICE9PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzaCA9IG9iaiBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnk7XG4gICAgY29uc3QgYXR0cmlidXRlID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgICAvLyBsb29rIGZvciBleGlzdGluZyBza2VsZXRvblxuICAgIGxldCBza2VsZXRvbiA9IHNrZWxldG9uTGlzdC5nZXQoYXR0cmlidXRlKTtcblxuICAgIGlmICghc2tlbGV0b24pIHtcbiAgICAgIC8vIGdlbmVyYXRlIHJlZHVjZWQgYm9uZSBsaXN0XG4gICAgICBjb25zdCBib25lczogVEhSRUUuQm9uZVtdID0gW107IC8vIG5ldyBsaXN0IG9mIGJvbmVcbiAgICAgIGNvbnN0IGJvbmVJbnZlcnNlczogVEhSRUUuTWF0cml4NFtdID0gW107IC8vIG5ldyBsaXN0IG9mIGJvbmVJbnZlcnNlXG4gICAgICBjb25zdCBib25lSW5kZXhNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSA9IHt9OyAvLyBtYXAgb2Ygb2xkIGJvbmUgaW5kZXggdnMuIG5ldyBib25lIGluZGV4XG5cbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBib25lIG1hcFxuICAgICAgY29uc3QgYXJyYXkgPSBhdHRyaWJ1dGUuYXJyYXkgYXMgbnVtYmVyW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlbaV07XG5cbiAgICAgICAgLy8gbmV3IHNraW5JbmRleCBidWZmZXJcbiAgICAgICAgaWYgKGJvbmVJbmRleE1hcFtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJvbmVJbmRleE1hcFtpbmRleF0gPSBib25lcy5sZW5ndGg7XG4gICAgICAgICAgYm9uZXMucHVzaChtZXNoLnNrZWxldG9uLmJvbmVzW2luZGV4XSk7XG4gICAgICAgICAgYm9uZUludmVyc2VzLnB1c2gobWVzaC5za2VsZXRvbi5ib25lSW52ZXJzZXNbaW5kZXhdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5W2ldID0gYm9uZUluZGV4TWFwW2luZGV4XTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVwbGFjZSB3aXRoIG5ldyBpbmRpY2VzXG4gICAgICBhdHRyaWJ1dGUuY29weUFycmF5KGFycmF5KTtcbiAgICAgIGF0dHJpYnV0ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgIC8vIHJlcGxhY2Ugd2l0aCBuZXcgaW5kaWNlc1xuICAgICAgc2tlbGV0b24gPSBuZXcgVEhSRUUuU2tlbGV0b24oYm9uZXMsIGJvbmVJbnZlcnNlcyk7XG4gICAgICBza2VsZXRvbkxpc3Quc2V0KGF0dHJpYnV0ZSwgc2tlbGV0b24pO1xuICAgIH1cblxuICAgIG1lc2guYmluZChza2VsZXRvbiwgbmV3IFRIUkVFLk1hdHJpeDQoKSk7XG4gICAgLy8gICAgICAgICAgICAgICAgICBeXl5eXl5eXl5eXl5eXl5eXl5eIHRyYW5zZm9ybSBvZiBtZXNoZXMgc2hvdWxkIGJlIGlnbm9yZWRcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzIuMCNza2luc1xuICB9KTtcbn1cbiIsImltcG9ydCB7IGV4dHJhY3RUaHVtYm5haWxCbG9iIH0gZnJvbSAnLi9leHRyYWN0VGh1bWJuYWlsQmxvYic7XG5pbXBvcnQgeyByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyB9IGZyb20gJy4vcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMnO1xuXG5leHBvcnQgY2xhc3MgVlJNVXRpbHMge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMgY2xhc3MgaXMgbm90IG1lYW50IHRvIGJlIGluc3RhbnRpYXRlZFxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBleHRyYWN0VGh1bWJuYWlsQmxvYiA9IGV4dHJhY3RUaHVtYm5haWxCbG9iO1xuICBwdWJsaWMgc3RhdGljIHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzID0gcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHM7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi4vbG9va2F0L1ZSTUxvb2tBdEhlYWQnO1xuaW1wb3J0IHsgVlJNRGVidWdPcHRpb25zIH0gZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuXG5jb25zdCBfdjMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0SGVhZERlYnVnIGV4dGVuZHMgVlJNTG9va0F0SGVhZCB7XG4gIHByaXZhdGUgX2ZhY2VEaXJlY3Rpb25IZWxwZXI/OiBUSFJFRS5BcnJvd0hlbHBlcjtcblxuICBwdWJsaWMgc2V0dXBIZWxwZXIoc2NlbmU6IFRIUkVFLk9iamVjdDNELCBkZWJ1Z09wdGlvbjogVlJNRGVidWdPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKCFkZWJ1Z09wdGlvbi5kaXNhYmxlRmFjZURpcmVjdGlvbkhlbHBlcikge1xuICAgICAgdGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlciA9IG5ldyBUSFJFRS5BcnJvd0hlbHBlcihcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgICAgMC41LFxuICAgICAgICAweGZmMDBmZixcbiAgICAgICk7XG4gICAgICBzY2VuZS5hZGQodGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcblxuICAgIGlmICh0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyKSB7XG4gICAgICB0aGlzLmZpcnN0UGVyc29uLmdldEZpcnN0UGVyc29uV29ybGRQb3NpdGlvbih0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIuc2V0RGlyZWN0aW9uKHRoaXMuZ2V0TG9va0F0V29ybGREaXJlY3Rpb24oX3YzKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlUHJveHkgfSBmcm9tICcuLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi4vbG9va2F0L1ZSTUxvb2tBdEhlYWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SW1wb3J0ZXIgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZERlYnVnIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkRGVidWcnO1xuXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0SW1wb3J0ZXJEZWJ1ZyBleHRlbmRzIFZSTUxvb2tBdEltcG9ydGVyIHtcbiAgcHVibGljIGltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGZpcnN0UGVyc29uOiBWUk1GaXJzdFBlcnNvbixcbiAgICBibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eSxcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICk6IFZSTUxvb2tBdEhlYWQgfCBudWxsIHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFZSTVNjaGVtYS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBhcHBseWVyID0gdGhpcy5faW1wb3J0QXBwbHllcihzY2hlbWFGaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbm9pZCk7XG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRIZWFkRGVidWcoZmlyc3RQZXJzb24sIGFwcGx5ZXIgfHwgdW5kZWZpbmVkKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCB7IFZSTURlYnVnT3B0aW9ucyB9IGZyb20gJy4vVlJNRGVidWdPcHRpb25zJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZURlYnVnJztcbmltcG9ydCB7IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgfSBmcm9tICcuL1ZSTURlYnVnJztcblxuY29uc3QgX2NvbGxpZGVyR2l6bW9NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gIGNvbG9yOiAweGZmMDBmZixcbiAgd2lyZWZyYW1lOiB0cnVlLFxuICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgZGVwdGhUZXN0OiBmYWxzZSxcbn0pO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgc3ByaW5nIGJvbmUgZ3JvdXAgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCB0eXBlIFZSTVNwcmluZ0JvbmVHcm91cERlYnVnID0gVlJNU3ByaW5nQm9uZURlYnVnW107XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwdWJsaWMgc2V0dXBIZWxwZXIoc2NlbmU6IFRIUkVFLk9iamVjdDNELCBkZWJ1Z09wdGlvbjogVlJNRGVidWdPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKGRlYnVnT3B0aW9uLmRpc2FibGVTcHJpbmdCb25lSGVscGVyKSByZXR1cm47XG5cbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBpZiAoKHNwcmluZ0JvbmUgYXMgYW55KS5nZXRHaXptbykge1xuICAgICAgICAgIGNvbnN0IGdpem1vID0gKHNwcmluZ0JvbmUgYXMgVlJNU3ByaW5nQm9uZURlYnVnKS5nZXRHaXptbygpO1xuICAgICAgICAgIHNjZW5lLmFkZChnaXptbyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBjb2xsaWRlci5tYXRlcmlhbCA9IF9jb2xsaWRlckdpem1vTWF0ZXJpYWw7XG4gICAgICAgIGNvbGxpZGVyLnJlbmRlck9yZGVyID0gVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi4vc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBWUk1fR0laTU9fUkVOREVSX09SREVSIH0gZnJvbSAnLi9WUk1EZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVEZWJ1ZyBleHRlbmRzIFZSTVNwcmluZ0JvbmUge1xuICBwcml2YXRlIF9naXptbz86IFRIUkVFLkFycm93SGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yKGJvbmU6IFRIUkVFLk9iamVjdDNELCBwYXJhbXM6IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzKSB7XG4gICAgc3VwZXIoYm9uZSwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gc3ByaW5nIGJvbmUgZ2l6bW8sIGFzIGBUSFJFRS5BcnJvd0hlbHBlcmAuXG4gICAqIFVzZWZ1bCBmb3IgZGVidWdnaW5nIHNwcmluZyBib25lcy5cbiAgICovXG4gIHB1YmxpYyBnZXRHaXptbygpOiBUSFJFRS5BcnJvd0hlbHBlciB7XG4gICAgLy8gcmV0dXJuIGlmIGdpem1vIGlzIGFscmVhZHkgZXhpc3RlZFxuICAgIGlmICh0aGlzLl9naXptbykge1xuICAgICAgcmV0dXJuIHRoaXMuX2dpem1vO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmUgPSBfdjNBLmNvcHkodGhpcy5fbmV4dFRhaWwpLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKTtcbiAgICBjb25zdCBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoID0gbmV4dFRhaWxSZWxhdGl2ZS5sZW5ndGgoKTtcblxuICAgIHRoaXMuX2dpem1vID0gbmV3IFRIUkVFLkFycm93SGVscGVyKFxuICAgICAgbmV4dFRhaWxSZWxhdGl2ZS5ub3JtYWxpemUoKSxcbiAgICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24sXG4gICAgICBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLFxuICAgICAgMHhmZmZmMDAsXG4gICAgICB0aGlzLnJhZGl1cyxcbiAgICAgIHRoaXMucmFkaXVzLFxuICAgICk7XG5cbiAgICAvLyBpdCBzaG91bGQgYmUgYWx3YXlzIHZpc2libGVcbiAgICB0aGlzLl9naXptby5saW5lLnJlbmRlck9yZGVyID0gVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcbiAgICB0aGlzLl9naXptby5jb25lLnJlbmRlck9yZGVyID0gVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcbiAgICAodGhpcy5fZ2l6bW8ubGluZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgKHRoaXMuX2dpem1vLmxpbmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAodGhpcy5fZ2l6bW8uY29uZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgKHRoaXMuX2dpem1vLmNvbmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLnRyYW5zcGFyZW50ID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzLl9naXptbztcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZShkZWx0YSk7XG4gICAgLy8gbGFzdGx5IHdlJ3JlIGdvbm5hIHVwZGF0ZSBnaXptb1xuICAgIHRoaXMuX3VwZGF0ZUdpem1vKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVHaXptbygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2dpem1vKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZSA9IF92M0EuY29weSh0aGlzLl9jdXJyZW50VGFpbCkuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5fZ2l6bW8uc2V0RGlyZWN0aW9uKG5leHRUYWlsUmVsYXRpdmUubm9ybWFsaXplKCkpO1xuICAgIHRoaXMuX2dpem1vLnNldExlbmd0aChuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLCB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMpO1xuICAgIHRoaXMuX2dpem1vLnBvc2l0aW9uLmNvcHkodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlciB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZUltcG9ydGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZURlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lRGVidWcnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzJztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUltcG9ydGVyIHtcbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHJldHVybiBudWxsO1xuXG4gICAgLy8g6KGd56qB5Yik5a6a55CD5L2T44Oh44OD44K344Ol44CCXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBhd2FpdCB0aGlzLl9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKTtcblxuICAgIC8vIOWQjOOBmOWxnuaAp++8iHN0aWZmaW5lc3PjgoRkcmFnRm9yY2XjgYzlkIzjgZjvvInjga7jg5zjg7zjg7Pjga9ib25lR3JvdXDjgavjgb7jgajjgoHjgonjgozjgabjgYTjgovjgIJcbiAgICAvLyDkuIDliJfjgaDjgZHjgafjga/jgarjgYTjgZPjgajjgavms6jmhI/jgIJcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBMaXN0ID0gYXdhaXQgdGhpcy5faW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdChnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24sIGNvbGxpZGVyR3JvdXBzKTtcblxuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyhjb2xsaWRlckdyb3Vwcywgc3ByaW5nQm9uZUdyb3VwTGlzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZVNwcmluZ0JvbmUoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMpOiBWUk1TcHJpbmdCb25lRGVidWcge1xuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZURlYnVnKGJvbmUsIHBhcmFtcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUltcG9ydGVyLCBWUk1JbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuLi9WUk1JbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1EZWJ1ZyB9IGZyb20gJy4vVlJNRGVidWcnO1xuaW1wb3J0IHsgVlJNRGVidWdPcHRpb25zIH0gZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZERlYnVnIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkRGVidWcnO1xuaW1wb3J0IHsgVlJNTG9va0F0SW1wb3J0ZXJEZWJ1ZyB9IGZyb20gJy4vVlJNTG9va0F0SW1wb3J0ZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1EZWJ1Z11dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUltcG9ydGVyRGVidWcgZXh0ZW5kcyBWUk1JbXBvcnRlciB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgPSBvcHRpb25zLmxvb2tBdEltcG9ydGVyIHx8IG5ldyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnKCk7XG4gICAgb3B0aW9ucy5zcHJpbmdCb25lSW1wb3J0ZXIgPSBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciB8fCBuZXcgVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcoKTtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURiwgZGVidWdPcHRpb25zOiBWUk1EZWJ1Z09wdGlvbnMgPSB7fSk6IFByb21pc2U8VlJNRGVidWc+IHtcbiAgICBpZiAoZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zID09PSB1bmRlZmluZWQgfHwgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIFZSTSBleHRlbnNpb24gb24gdGhlIEdMVEYnKTtcbiAgICB9XG4gICAgY29uc3Qgc2NlbmUgPSBnbHRmLnNjZW5lO1xuXG4gICAgc2NlbmUudXBkYXRlTWF0cml4V29ybGQoZmFsc2UpO1xuXG4gICAgLy8gU2tpbm5lZCBvYmplY3Qgc2hvdWxkIG5vdCBiZSBmcnVzdHVtQ3VsbGVkXG4gICAgLy8gU2luY2UgcHJlLXNraW5uZWQgcG9zaXRpb24gbWlnaHQgYmUgb3V0c2lkZSBvZiB2aWV3XG4gICAgc2NlbmUudHJhdmVyc2UoKG9iamVjdDNkKSA9PiB7XG4gICAgICBpZiAoKG9iamVjdDNkIGFzIGFueSkuaXNNZXNoKSB7XG4gICAgICAgIG9iamVjdDNkLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1ldGEgPSAoYXdhaXQgdGhpcy5fbWV0YUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxzID0gKGF3YWl0IHRoaXMuX21hdGVyaWFsSW1wb3J0ZXIuY29udmVydEdMVEZNYXRlcmlhbHMoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGh1bWFub2lkID0gKGF3YWl0IHRoaXMuX2h1bWFub2lkSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBmaXJzdFBlcnNvbiA9IGh1bWFub2lkID8gKGF3YWl0IHRoaXMuX2ZpcnN0UGVyc29uSW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGh1bWFub2lkKSkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgYmxlbmRTaGFwZVByb3h5ID0gKGF3YWl0IHRoaXMuX2JsZW5kU2hhcGVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGxvb2tBdCA9XG4gICAgICBmaXJzdFBlcnNvbiAmJiBibGVuZFNoYXBlUHJveHkgJiYgaHVtYW5vaWRcbiAgICAgICAgPyAoYXdhaXQgdGhpcy5fbG9va0F0SW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKSkgfHwgdW5kZWZpbmVkXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGlmICgobG9va0F0IGFzIGFueSkuc2V0dXBIZWxwZXIpIHtcbiAgICAgIChsb29rQXQgYXMgVlJNTG9va0F0SGVhZERlYnVnKS5zZXR1cEhlbHBlcihzY2VuZSwgZGVidWdPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCBzcHJpbmdCb25lTWFuYWdlciA9IChhd2FpdCB0aGlzLl9zcHJpbmdCb25lSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG4gICAgaWYgKChzcHJpbmdCb25lTWFuYWdlciBhcyBhbnkpLnNldHVwSGVscGVyKSB7XG4gICAgICAoc3ByaW5nQm9uZU1hbmFnZXIgYXMgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zykuc2V0dXBIZWxwZXIoc2NlbmUsIGRlYnVnT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBWUk1EZWJ1ZyhcbiAgICAgIHtcbiAgICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXG4gICAgICAgIG1ldGEsXG4gICAgICAgIG1hdGVyaWFscyxcbiAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgIGZpcnN0UGVyc29uLFxuICAgICAgICBibGVuZFNoYXBlUHJveHksXG4gICAgICAgIGxvb2tBdCxcbiAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXIsXG4gICAgICB9LFxuICAgICAgZGVidWdPcHRpb25zLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTSwgVlJNUGFyYW1ldGVycyB9IGZyb20gJy4uL1ZSTSc7XG5pbXBvcnQgeyBWUk1JbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuLi9WUk1JbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1JbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1JbXBvcnRlckRlYnVnJztcblxuZXhwb3J0IGNvbnN0IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgPSAxMDAwMDtcblxuLyoqXG4gKiBbW1ZSTV1dIGJ1dCBpdCBoYXMgc29tZSB1c2VmdWwgZ2l6bW9zLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRGVidWcgZXh0ZW5kcyBWUk0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTURlYnVnIGZyb20gYSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyLlxuICAgKlxuICAgKiBTZWUgW1tWUk0uZnJvbV1dIGZvciBhIGRldGFpbGVkIGV4YW1wbGUuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIEdMVEYgb2JqZWN0IHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRoYXQgd2lsbCBiZSB1c2VkIGluIGltcG9ydGVyXG4gICAqIEBwYXJhbSBkZWJ1Z09wdGlvbiBPcHRpb25zIGZvciBWUk1EZWJ1ZyBmZWF0dXJlc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhc3luYyBmcm9tKFxuICAgIGdsdGY6IEdMVEYsXG4gICAgb3B0aW9uczogVlJNSW1wb3J0ZXJPcHRpb25zID0ge30sXG4gICAgZGVidWdPcHRpb246IFZSTURlYnVnT3B0aW9ucyA9IHt9LFxuICApOiBQcm9taXNlPFZSTT4ge1xuICAgIGNvbnN0IGltcG9ydGVyID0gbmV3IFZSTUltcG9ydGVyRGVidWcob3B0aW9ucyk7XG4gICAgcmV0dXJuIGF3YWl0IGltcG9ydGVyLmltcG9ydChnbHRmLCBkZWJ1Z09wdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTURlYnVnIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIFtbVlJNUGFyYW1ldGVyc11dIHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICogQHBhcmFtIGRlYnVnT3B0aW9uIE9wdGlvbnMgZm9yIFZSTURlYnVnIGZlYXR1cmVzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTVBhcmFtZXRlcnMsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcyk7XG5cbiAgICAvLyBHaXptb+OCkuWxlemWi1xuICAgIGlmICghZGVidWdPcHRpb24uZGlzYWJsZUJveEhlbHBlcikge1xuICAgICAgdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkJveEhlbHBlcih0aGlzLnNjZW5lKSk7XG4gICAgfVxuXG4gICAgaWYgKCFkZWJ1Z09wdGlvbi5kaXNhYmxlU2tlbGV0b25IZWxwZXIpIHtcbiAgICAgIHRoaXMuc2NlbmUuYWRkKG5ldyBUSFJFRS5Ta2VsZXRvbkhlbHBlcih0aGlzLnNjZW5lKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlRIUkVFLlZlY3RvcjIiLCJUSFJFRS5WZWN0b3IzIiwiVEhSRUUuVmVjdG9yNCIsIlRIUkVFLkNvbG9yIiwiVEhSRUUuT2JqZWN0M0QiLCJUSFJFRS5RdWF0ZXJuaW9uIiwiVEhSRUUuU2tpbm5lZE1lc2giLCJUSFJFRS5Ta2VsZXRvbiIsIlRIUkVFLk1hdHJpeDQiLCJWRUNUT1IzX0ZST05UIiwiX3YzQSIsIl9xdWF0IiwiVEhSRUUuRXVsZXIiLCJUSFJFRS5MaW5lYXJFbmNvZGluZyIsIlRIUkVFLnNSR0JFbmNvZGluZyIsIlRIUkVFLlJHQkVFbmNvZGluZyIsIlRIUkVFLlJHQk03RW5jb2RpbmciLCJUSFJFRS5SR0JNMTZFbmNvZGluZyIsIlRIUkVFLlJHQkRFbmNvZGluZyIsIlRIUkVFLkdhbW1hRW5jb2RpbmciLCJUSFJFRS5TaGFkZXJNYXRlcmlhbCIsIlRIUkVFLlRhbmdlbnRTcGFjZU5vcm1hbE1hcCIsIlRIUkVFLlVuaWZvcm1zVXRpbHMiLCJUSFJFRS5Vbmlmb3Jtc0xpYiIsIlRIUkVFLlJFVklTSU9OIiwiVEhSRUUuRG91YmxlU2lkZSIsIlRIUkVFLkJhY2tTaWRlIiwiVEhSRUUuRnJvbnRTaWRlIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJfdjNCIiwiX3YzQyIsIl9xdWF0QSIsIl9tYXRBIiwiVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwiLCJUSFJFRS5NZXNoIiwiVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkiLCJUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEiLCJUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5IiwiVEhSRUUuU2NlbmUiLCJfdjMiLCJUSFJFRS5BcnJvd0hlbHBlciIsIlRIUkVFLkJveEhlbHBlciIsIlRIUkVFLlNrZWxldG9uSGVscGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUDs7QUM3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
