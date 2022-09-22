/*!
 * @pixiv/three-vrm-core v1.0.1
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import * as THREE from 'three';

// animationMixer の監視対象は、Scene の中に入っている必要がある。
// そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
class VRMExpression extends THREE.Object3D {
    constructor(expressionName) {
        super();
        /**
         * The current weight of the expression.
         */
        this.weight = 0.0;
        /**
         * Interpret values greater than 0.5 as 1.0, ortherwise 0.0.
         */
        this.isBinary = false;
        /**
         * Specify how the expression overrides blink expressions.
         */
        this.overrideBlink = 'none';
        /**
         * Specify how the expression overrides lookAt expressions.
         */
        this.overrideLookAt = 'none';
        /**
         * Specify how the expression overrides mouth expressions.
         */
        this.overrideMouth = 'none';
        this._binds = [];
        this.name = `VRMExpression_${expressionName}`;
        this.expressionName = expressionName;
        // traverse 時の救済手段として Object3D ではないことを明示しておく
        this.type = 'VRMExpression';
        // 表示目的のオブジェクトではないので、負荷軽減のために visible を false にしておく。
        // これにより、このインスタンスに対する毎フレームの matrix 自動計算を省略できる。
        this.visible = false;
    }
    /**
     * A value represents how much it should override blink expressions.
     * `0.0` == no override at all, `1.0` == completely block the expressions.
     */
    get overrideBlinkAmount() {
        if (this.overrideBlink === 'block') {
            return 0.0 < this.weight ? 1.0 : 0.0;
        }
        else if (this.overrideBlink === 'blend') {
            return this.weight;
        }
        else {
            return 0.0;
        }
    }
    /**
     * A value represents how much it should override lookAt expressions.
     * `0.0` == no override at all, `1.0` == completely block the expressions.
     */
    get overrideLookAtAmount() {
        if (this.overrideLookAt === 'block') {
            return 0.0 < this.weight ? 1.0 : 0.0;
        }
        else if (this.overrideLookAt === 'blend') {
            return this.weight;
        }
        else {
            return 0.0;
        }
    }
    /**
     * A value represents how much it should override mouth expressions.
     * `0.0` == no override at all, `1.0` == completely block the expressions.
     */
    get overrideMouthAmount() {
        if (this.overrideMouth === 'block') {
            return 0.0 < this.weight ? 1.0 : 0.0;
        }
        else if (this.overrideMouth === 'blend') {
            return this.weight;
        }
        else {
            return 0.0;
        }
    }
    addBind(bind) {
        this._binds.push(bind);
    }
    /**
     * Apply weight to every assigned blend shapes.
     * Should be called every frame.
     */
    applyWeight(options) {
        var _a;
        let actualWeight = this.isBinary ? (this.weight <= 0.5 ? 0.0 : 1.0) : this.weight;
        actualWeight *= (_a = options === null || options === void 0 ? void 0 : options.multiplier) !== null && _a !== void 0 ? _a : 1.0;
        this._binds.forEach((bind) => bind.applyWeight(actualWeight));
    }
    /**
     * Clear previously assigned blend shapes.
     */
    clearAppliedWeight() {
        this._binds.forEach((bind) => bind.clearAppliedWeight());
    }
}

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

function extractPrimitivesInternal(gltf, nodeIndex, node) {
    var _a, _b;
    const json = gltf.parser.json;
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
    const schemaNode = (_a = json.nodes) === null || _a === void 0 ? void 0 : _a[nodeIndex];
    if (schemaNode == null) {
        console.warn(`extractPrimitivesInternal: Attempt to use nodes[${nodeIndex}] of glTF but the node doesn't exist`);
        return null;
    }
    const meshIndex = schemaNode.mesh;
    if (meshIndex == null) {
        return null;
    }
    // How many primitives the mesh has?
    const schemaMesh = (_b = json.meshes) === null || _b === void 0 ? void 0 : _b[meshIndex];
    if (schemaMesh == null) {
        console.warn(`extractPrimitivesInternal: Attempt to use meshes[${meshIndex}] of glTF but the mesh doesn't exist`);
        return null;
    }
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

/**
 * Get a material definition index of glTF from associated material.
 * It's basically a comat code between Three.js r133 or above and previous versions.
 * @param parser GLTFParser
 * @param material A material of gltf
 * @returns Material definition index of glTF
 */
function gltfGetAssociatedMaterialIndex(parser, material) {
    var _a, _b;
    const threeRevision = parseInt(THREE.REVISION, 10);
    let index = null;
    if (threeRevision >= 133) {
        index = (_b = (_a = parser.associations.get(material)) === null || _a === void 0 ? void 0 : _a.materials) !== null && _b !== void 0 ? _b : null;
    }
    else {
        const associations = parser.associations;
        const reference = associations.get(material);
        if ((reference === null || reference === void 0 ? void 0 : reference.type) === 'materials') {
            index = reference.index;
        }
    }
    return index;
}

/* eslint-disable @typescript-eslint/naming-convention */
const VRMExpressionPresetName = {
    Aa: 'aa',
    Ih: 'ih',
    Ou: 'ou',
    Ee: 'ee',
    Oh: 'oh',
    Blink: 'blink',
    Happy: 'happy',
    Angry: 'angry',
    Sad: 'sad',
    Relaxed: 'relaxed',
    LookUp: 'lookUp',
    Surprised: 'surprised',
    LookDown: 'lookDown',
    LookLeft: 'lookLeft',
    LookRight: 'lookRight',
    BlinkLeft: 'blinkLeft',
    BlinkRight: 'blinkRight',
    Neutral: 'neutral',
};

/**
 * Clamp the input value within [0.0 - 1.0].
 *
 * @param value The input value
 */
function saturate(value) {
    return Math.max(Math.min(value, 1.0), 0.0);
}

class VRMExpressionManager {
    /**
     * Create a new {@link VRMExpressionManager}.
     */
    constructor() {
        /**
         * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideBlink}.
         */
        this.blinkExpressionNames = ['blink', 'blinkLeft', 'blinkRight'];
        /**
         * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideLookAt}.
         */
        this.lookAtExpressionNames = ['lookLeft', 'lookRight', 'lookUp', 'lookDown'];
        /**
         * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideMouth}.
         */
        this.mouthExpressionNames = ['aa', 'ee', 'ih', 'oh', 'ou'];
        /**
         * A set of {@link VRMExpression}.
         * When you want to register expressions, use {@link registerExpression}
         */
        this._expressions = [];
        /**
         * A map from name to expression.
         */
        this._expressionMap = {};
        // do nothing
    }
    get expressions() {
        return this._expressions.concat();
    }
    get expressionMap() {
        return Object.assign({}, this._expressionMap);
    }
    /**
     * A map from name to expression, but excluding custom expressions.
     */
    get presetExpressionMap() {
        const result = {};
        const presetNameSet = new Set(Object.values(VRMExpressionPresetName));
        Object.entries(this._expressionMap).forEach(([name, expression]) => {
            if (presetNameSet.has(name)) {
                result[name] = expression;
            }
        });
        return result;
    }
    /**
     * A map from name to expression, but excluding preset expressions.
     */
    get customExpressionMap() {
        const result = {};
        const presetNameSet = new Set(Object.values(VRMExpressionPresetName));
        Object.entries(this._expressionMap).forEach(([name, expression]) => {
            if (!presetNameSet.has(name)) {
                result[name] = expression;
            }
        });
        return result;
    }
    /**
     * Copy the given {@link VRMExpressionManager} into this one.
     * @param source The {@link VRMExpressionManager} you want to copy
     * @returns this
     */
    copy(source) {
        // first unregister all the expression it has
        const expressions = this._expressions.concat();
        expressions.forEach((expression) => {
            this.unregisterExpression(expression);
        });
        // then register all the expression of the source
        source._expressions.forEach((expression) => {
            this.registerExpression(expression);
        });
        // copy remaining members
        this.blinkExpressionNames = source.blinkExpressionNames.concat();
        this.lookAtExpressionNames = source.lookAtExpressionNames.concat();
        this.mouthExpressionNames = source.mouthExpressionNames.concat();
        return this;
    }
    /**
     * Returns a clone of this {@link VRMExpressionManager}.
     * @returns Copied {@link VRMExpressionManager}
     */
    clone() {
        return new VRMExpressionManager().copy(this);
    }
    /**
     * Return a registered expression.
     * If it cannot find an expression, it will return `null` instead.
     *
     * @param name Name or preset name of the expression
     */
    getExpression(name) {
        var _a;
        return (_a = this._expressionMap[name]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Register an expression.
     *
     * @param expression {@link VRMExpression} that describes the expression
     */
    registerExpression(expression) {
        this._expressions.push(expression);
        this._expressionMap[expression.expressionName] = expression;
    }
    /**
     * Unregister an expression.
     *
     * @param expression The expression you want to unregister
     */
    unregisterExpression(expression) {
        const index = this._expressions.indexOf(expression);
        if (index === -1) {
            console.warn('VRMExpressionManager: The specified expressions is not registered');
        }
        this._expressions.splice(index, 1);
        delete this._expressionMap[expression.expressionName];
    }
    /**
     * Get the current weight of the specified expression.
     * If it doesn't have an expression of given name, it will return `null` instead.
     *
     * @param name Name of the expression
     */
    getValue(name) {
        var _a;
        const expression = this.getExpression(name);
        return (_a = expression === null || expression === void 0 ? void 0 : expression.weight) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Set a weight to the specified expression.
     *
     * @param name Name of the expression
     * @param weight Weight
     */
    setValue(name, weight) {
        const expression = this.getExpression(name);
        if (expression) {
            expression.weight = saturate(weight);
        }
    }
    /**
     * Get a track name of specified expression.
     * This track name is needed to manipulate its expression via keyframe animations.
     *
     * @example Manipulate an expression using keyframe animation
     * ```js
     * const trackName = vrm.expressionManager.getExpressionTrackName( 'blink' );
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
     * @param name Name of the expression
     */
    getExpressionTrackName(name) {
        const expression = this.getExpression(name);
        return expression ? `${expression.name}.weight` : null;
    }
    /**
     * Update every expressions.
     */
    update() {
        // see how much we should override certain expressions
        const weightMultipliers = this._calculateWeightMultipliers();
        // reset expression binds first
        this._expressions.forEach((expression) => {
            expression.clearAppliedWeight();
        });
        // then apply binds
        this._expressions.forEach((expression) => {
            let multiplier = 1.0;
            const name = expression.expressionName;
            if (this.blinkExpressionNames.indexOf(name) !== -1) {
                multiplier *= weightMultipliers.blink;
            }
            if (this.lookAtExpressionNames.indexOf(name) !== -1) {
                multiplier *= weightMultipliers.lookAt;
            }
            if (this.mouthExpressionNames.indexOf(name) !== -1) {
                multiplier *= weightMultipliers.mouth;
            }
            expression.applyWeight({ multiplier });
        });
    }
    /**
     * Calculate sum of override amounts to see how much we should multiply weights of certain expressions.
     */
    _calculateWeightMultipliers() {
        let blink = 1.0;
        let lookAt = 1.0;
        let mouth = 1.0;
        this._expressions.forEach((expression) => {
            blink -= expression.overrideBlinkAmount;
            lookAt -= expression.overrideLookAtAmount;
            mouth -= expression.overrideMouthAmount;
        });
        blink = Math.max(0.0, blink);
        lookAt = Math.max(0.0, lookAt);
        mouth = Math.max(0.0, mouth);
        return { blink, lookAt, mouth };
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
const VRMExpressionMaterialColorType = {
    Color: 'color',
    EmissionColor: 'emissionColor',
    ShadeColor: 'shadeColor',
    MatcapColor: 'matcapColor',
    RimColor: 'rimColor',
    OutlineColor: 'outlineColor',
};
const v0ExpressionMaterialColorMap = {
    _Color: VRMExpressionMaterialColorType.Color,
    _EmissionColor: VRMExpressionMaterialColorType.EmissionColor,
    _ShadeColor: VRMExpressionMaterialColorType.ShadeColor,
    _RimColor: VRMExpressionMaterialColorType.RimColor,
    _OutlineColor: VRMExpressionMaterialColorType.OutlineColor,
};

const _color = new THREE.Color();
/**
 * A bind of expression influences to a material color.
 */
class VRMExpressionMaterialColorBind {
    constructor({ material, type, targetValue, }) {
        var _a, _b, _c;
        this.material = material;
        this.type = type;
        this.targetValue = targetValue;
        // init property name
        const propertyNameMap = (_a = Object.entries(VRMExpressionMaterialColorBind._propertyNameMapMap).find(([distinguisher]) => {
            return material[distinguisher] === true;
        })) === null || _a === void 0 ? void 0 : _a[1];
        const propertyName = (_b = propertyNameMap === null || propertyNameMap === void 0 ? void 0 : propertyNameMap[type]) !== null && _b !== void 0 ? _b : null;
        if (propertyName == null) {
            console.warn(`Tried to add a material color bind to the material ${(_c = material.name) !== null && _c !== void 0 ? _c : '(no name)'}, the type ${type} but the material or the type is not supported.`);
            this._state = null;
        }
        else {
            const target = material[propertyName];
            const initialValue = target.clone();
            // 負の値を保持するためにColor.subを使わずに差分を計算する
            const deltaValue = new THREE.Color(targetValue.r - initialValue.r, targetValue.g - initialValue.g, targetValue.b - initialValue.b);
            this._state = {
                propertyName,
                initialValue,
                deltaValue,
            };
        }
    }
    applyWeight(weight) {
        if (this._state == null) {
            // warning is already emitted in constructor
            return;
        }
        const { propertyName, deltaValue } = this._state;
        const target = this.material[propertyName];
        if (target === undefined) {
            return;
        } // TODO: we should kick this at `addMaterialValue`
        target.add(_color.copy(deltaValue).multiplyScalar(weight));
        if (typeof this.material.shouldApplyUniforms === 'boolean') {
            this.material.shouldApplyUniforms = true;
        }
    }
    clearAppliedWeight() {
        if (this._state == null) {
            // warning is already emitted in constructor
            return;
        }
        const { propertyName, initialValue } = this._state;
        const target = this.material[propertyName];
        if (target === undefined) {
            return;
        } // TODO: we should kick this at `addMaterialValue`
        target.copy(initialValue);
        if (typeof this.material.shouldApplyUniforms === 'boolean') {
            this.material.shouldApplyUniforms = true;
        }
    }
}
/**
 * Mapping of property names from VRMC/materialColorBinds.type to three.js/Material.
 */
VRMExpressionMaterialColorBind._propertyNameMapMap = {
    isMeshStandardMaterial: {
        color: 'color',
        emissionColor: 'emissive',
    },
    isMeshBasicMaterial: {
        color: 'color',
    },
    isMToonMaterial: {
        color: 'color',
        emissionColor: 'emissive',
        outlineColor: 'outlineColorFactor',
        matcapColor: 'matcapFactor',
        rimColor: 'parametricRimColorFactor',
        shadeColor: 'shadeColorFactor',
    },
};

/**
 * A bind of {@link VRMExpression} influences to morph targets.
 */
class VRMExpressionMorphTargetBind {
    constructor({ primitives, index, weight, }) {
        this.primitives = primitives;
        this.index = index;
        this.weight = weight;
    }
    applyWeight(weight) {
        this.primitives.forEach((mesh) => {
            var _a;
            if (((_a = mesh.morphTargetInfluences) === null || _a === void 0 ? void 0 : _a[this.index]) != null) {
                mesh.morphTargetInfluences[this.index] += this.weight * weight;
            }
        });
    }
    clearAppliedWeight() {
        this.primitives.forEach((mesh) => {
            var _a;
            if (((_a = mesh.morphTargetInfluences) === null || _a === void 0 ? void 0 : _a[this.index]) != null) {
                mesh.morphTargetInfluences[this.index] = 0.0;
            }
        });
    }
}

const _v2 = new THREE.Vector2();
/**
 * A bind of expression influences to texture transforms.
 */
class VRMExpressionTextureTransformBind {
    constructor({ material, scale, offset, }) {
        var _a, _b;
        this.material = material;
        this.scale = scale;
        this.offset = offset;
        const propertyNames = (_a = Object.entries(VRMExpressionTextureTransformBind._propertyNamesMap).find(([distinguisher]) => {
            return material[distinguisher] === true;
        })) === null || _a === void 0 ? void 0 : _a[1];
        if (propertyNames == null) {
            console.warn(`Tried to add a texture transform bind to the material ${(_b = material.name) !== null && _b !== void 0 ? _b : '(no name)'} but the material is not supported.`);
            this._properties = [];
        }
        else {
            this._properties = [];
            propertyNames.forEach((propertyName) => {
                var _a;
                const texture = (_a = material[propertyName]) === null || _a === void 0 ? void 0 : _a.clone();
                if (!texture) {
                    return null;
                }
                material[propertyName] = texture; // because the texture is cloned
                const initialOffset = texture.offset.clone();
                const initialScale = texture.repeat.clone();
                const deltaOffset = offset.clone().sub(initialOffset);
                const deltaScale = scale.clone().sub(initialScale);
                this._properties.push({
                    name: propertyName,
                    initialOffset,
                    deltaOffset,
                    initialScale,
                    deltaScale,
                });
            });
        }
    }
    applyWeight(weight) {
        this._properties.forEach((property) => {
            const target = this.material[property.name];
            if (target === undefined) {
                return;
            } // TODO: we should kick this at `addMaterialValue`
            target.offset.add(_v2.copy(property.deltaOffset).multiplyScalar(weight));
            target.repeat.add(_v2.copy(property.deltaScale).multiplyScalar(weight));
            target.needsUpdate = true;
        });
    }
    clearAppliedWeight() {
        this._properties.forEach((property) => {
            const target = this.material[property.name];
            if (target === undefined) {
                return;
            } // TODO: we should kick this at `addMaterialValue`
            target.offset.copy(property.initialOffset);
            target.repeat.copy(property.initialScale);
            target.needsUpdate = true;
        });
    }
}
VRMExpressionTextureTransformBind._propertyNamesMap = {
    isMeshStandardMaterial: [
        'map',
        'emissiveMap',
        'bumpMap',
        'normalMap',
        'displacementMap',
        'roughnessMap',
        'metalnessMap',
        'alphaMap',
    ],
    isMeshBasicMaterial: ['map', 'specularMap', 'alphaMap'],
    isMToonMaterial: [
        'map',
        'normalMap',
        'emissiveMap',
        'shadeMultiplyTexture',
        'rimMultiplyTexture',
        'outlineWidthMultiplyTexture',
        'uvAnimationMaskTexture',
    ],
};

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS$4 = new Set(['1.0', '1.0-beta']);
/**
 * A plugin of GLTFLoader that imports a {@link VRMExpressionManager} from a VRM extension of a GLTF.
 */
class VRMExpressionLoaderPlugin {
    constructor(parser) {
        this.parser = parser;
    }
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMExpressionLoaderPlugin';
    }
    afterRoot(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            gltf.userData.vrmExpressionManager = yield this._import(gltf);
        });
    }
    /**
     * Import a {@link VRMExpressionManager} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    _import(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            const v1Result = yield this._v1Import(gltf);
            if (v1Result) {
                return v1Result;
            }
            const v0Result = yield this._v0Import(gltf);
            if (v0Result) {
                return v0Result;
            }
            return null;
        });
    }
    _v1Import(gltf) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const isVRMUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf('VRMC_vrm')) !== -1;
            if (!isVRMUsed) {
                return null;
            }
            const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b['VRMC_vrm'];
            if (!extension) {
                return null;
            }
            const specVersion = extension.specVersion;
            if (!POSSIBLE_SPEC_VERSIONS$4.has(specVersion)) {
                console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
                return null;
            }
            const schemaExpressions = extension.expressions;
            if (!schemaExpressions) {
                return null;
            }
            // list expressions
            const presetNameSet = new Set(Object.values(VRMExpressionPresetName));
            const nameSchemaExpressionMap = new Map();
            if (schemaExpressions.preset != null) {
                Object.entries(schemaExpressions.preset).forEach(([name, schemaExpression]) => {
                    if (schemaExpression == null) {
                        return;
                    } // typescript
                    if (!presetNameSet.has(name)) {
                        console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${name}" detected. Ignoring the expression`);
                        return;
                    }
                    nameSchemaExpressionMap.set(name, schemaExpression);
                });
            }
            if (schemaExpressions.custom != null) {
                Object.entries(schemaExpressions.custom).forEach(([name, schemaExpression]) => {
                    if (presetNameSet.has(name)) {
                        console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${name}". Ignoring the expression`);
                        return;
                    }
                    nameSchemaExpressionMap.set(name, schemaExpression);
                });
            }
            // prepare manager
            const manager = new VRMExpressionManager();
            // load expressions
            yield Promise.all(Array.from(nameSchemaExpressionMap.entries()).map(([name, schemaExpression]) => __awaiter(this, void 0, void 0, function* () {
                var _c, _d, _e, _f, _g, _h, _j;
                const expression = new VRMExpression(name);
                gltf.scene.add(expression);
                expression.isBinary = (_c = schemaExpression.isBinary) !== null && _c !== void 0 ? _c : false;
                expression.overrideBlink = (_d = schemaExpression.overrideBlink) !== null && _d !== void 0 ? _d : 'none';
                expression.overrideLookAt = (_e = schemaExpression.overrideLookAt) !== null && _e !== void 0 ? _e : 'none';
                expression.overrideMouth = (_f = schemaExpression.overrideMouth) !== null && _f !== void 0 ? _f : 'none';
                (_g = schemaExpression.morphTargetBinds) === null || _g === void 0 ? void 0 : _g.forEach((bind) => __awaiter(this, void 0, void 0, function* () {
                    var _k;
                    if (bind.node === undefined || bind.index === undefined) {
                        return;
                    }
                    const primitives = (yield gltfExtractPrimitivesFromNode(gltf, bind.node));
                    const morphTargetIndex = bind.index;
                    // check if the mesh has the target morph target
                    if (!primitives.every((primitive) => Array.isArray(primitive.morphTargetInfluences) &&
                        morphTargetIndex < primitive.morphTargetInfluences.length)) {
                        console.warn(`VRMExpressionLoaderPlugin: ${schemaExpression.name} attempts to index morph #${morphTargetIndex} but not found.`);
                        return;
                    }
                    expression.addBind(new VRMExpressionMorphTargetBind({
                        primitives,
                        index: morphTargetIndex,
                        weight: (_k = bind.weight) !== null && _k !== void 0 ? _k : 1.0,
                    }));
                }));
                if (schemaExpression.materialColorBinds || schemaExpression.textureTransformBinds) {
                    // list up every material in `gltf.scene`
                    const gltfMaterials = [];
                    gltf.scene.traverse((object) => {
                        const material = object.material;
                        if (material) {
                            gltfMaterials.push(material);
                        }
                    });
                    (_h = schemaExpression.materialColorBinds) === null || _h === void 0 ? void 0 : _h.forEach((bind) => __awaiter(this, void 0, void 0, function* () {
                        const materials = gltfMaterials.filter((material) => {
                            const materialIndex = gltfGetAssociatedMaterialIndex(this.parser, material);
                            return bind.material === materialIndex;
                        });
                        materials.forEach((material) => {
                            expression.addBind(new VRMExpressionMaterialColorBind({
                                material,
                                type: bind.type,
                                targetValue: new THREE.Color().fromArray(bind.targetValue),
                            }));
                        });
                    }));
                    (_j = schemaExpression.textureTransformBinds) === null || _j === void 0 ? void 0 : _j.forEach((bind) => __awaiter(this, void 0, void 0, function* () {
                        const materials = gltfMaterials.filter((material) => {
                            const materialIndex = gltfGetAssociatedMaterialIndex(this.parser, material);
                            return bind.material === materialIndex;
                        });
                        materials.forEach((material) => {
                            var _a, _b;
                            expression.addBind(new VRMExpressionTextureTransformBind({
                                material,
                                offset: new THREE.Vector2().fromArray((_a = bind.offset) !== null && _a !== void 0 ? _a : [0.0, 0.0]),
                                scale: new THREE.Vector2().fromArray((_b = bind.scale) !== null && _b !== void 0 ? _b : [1.0, 1.0]),
                            }));
                        });
                    }));
                }
                manager.registerExpression(expression);
            })));
            return manager;
        });
    }
    _v0Import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const vrmExt = (_a = json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaBlendShape = vrmExt.blendShapeMaster;
            if (!schemaBlendShape) {
                return null;
            }
            const manager = new VRMExpressionManager();
            const schemaBlendShapeGroups = schemaBlendShape.blendShapeGroups;
            if (!schemaBlendShapeGroups) {
                return manager;
            }
            const blendShapeNameSet = new Set();
            yield Promise.all(schemaBlendShapeGroups.map((schemaGroup) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                const v0PresetName = schemaGroup.presetName;
                const v1PresetName = (v0PresetName != null && VRMExpressionLoaderPlugin.v0v1PresetNameMap[v0PresetName]) || null;
                const name = v1PresetName !== null && v1PresetName !== void 0 ? v1PresetName : schemaGroup.name;
                if (name == null) {
                    console.warn('VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression');
                    return;
                }
                // duplication check
                if (blendShapeNameSet.has(name)) {
                    console.warn(`VRMExpressionLoaderPlugin: An expression preset ${v0PresetName} has duplicated entries. Ignoring the expression`);
                    return;
                }
                blendShapeNameSet.add(name);
                const expression = new VRMExpression(name);
                gltf.scene.add(expression);
                expression.isBinary = (_b = schemaGroup.isBinary) !== null && _b !== void 0 ? _b : false;
                // v0 doesn't have ignore properties
                // Bind morphTarget
                if (schemaGroup.binds) {
                    schemaGroup.binds.forEach((bind) => __awaiter(this, void 0, void 0, function* () {
                        var _c;
                        if (bind.mesh === undefined || bind.index === undefined) {
                            return;
                        }
                        const nodesUsingMesh = [];
                        (_c = json.nodes) === null || _c === void 0 ? void 0 : _c.forEach((node, i) => {
                            if (node.mesh === bind.mesh) {
                                nodesUsingMesh.push(i);
                            }
                        });
                        const morphTargetIndex = bind.index;
                        yield Promise.all(nodesUsingMesh.map((nodeIndex) => __awaiter(this, void 0, void 0, function* () {
                            var _d;
                            const primitives = (yield gltfExtractPrimitivesFromNode(gltf, nodeIndex));
                            // check if the mesh has the target morph target
                            if (!primitives.every((primitive) => Array.isArray(primitive.morphTargetInfluences) &&
                                morphTargetIndex < primitive.morphTargetInfluences.length)) {
                                console.warn(`VRMExpressionLoaderPlugin: ${schemaGroup.name} attempts to index ${morphTargetIndex}th morph but not found.`);
                                return;
                            }
                            expression.addBind(new VRMExpressionMorphTargetBind({
                                primitives,
                                index: morphTargetIndex,
                                weight: 0.01 * ((_d = bind.weight) !== null && _d !== void 0 ? _d : 100),
                            }));
                        })));
                    }));
                }
                // Bind MaterialColor and TextureTransform
                const materialValues = schemaGroup.materialValues;
                if (materialValues && materialValues.length !== 0) {
                    materialValues.forEach((materialValue) => {
                        if (materialValue.materialName === undefined ||
                            materialValue.propertyName === undefined ||
                            materialValue.targetValue === undefined) {
                            return;
                        }
                        /**
                         * アバターのオブジェクトに設定されているマテリアルの内から
                         * materialValueで指定されているマテリアルを集める。
                         *
                         * 特定には名前を使用する。
                         * アウトライン描画用のマテリアルも同時に集める。
                         */
                        const materials = [];
                        gltf.scene.traverse((object) => {
                            if (object.material) {
                                const material = object.material;
                                if (Array.isArray(material)) {
                                    materials.push(...material.filter((mtl) => (mtl.name === materialValue.materialName ||
                                        mtl.name === materialValue.materialName + ' (Outline)') &&
                                        materials.indexOf(mtl) === -1));
                                }
                                else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                                    materials.push(material);
                                }
                            }
                        });
                        const materialPropertyName = materialValue.propertyName;
                        materials.forEach((material) => {
                            // TextureTransformBind
                            if (materialPropertyName === '_MainTex_ST') {
                                const scale = new THREE.Vector2(materialValue.targetValue[0], materialValue.targetValue[1]);
                                const offset = new THREE.Vector2(materialValue.targetValue[2], materialValue.targetValue[3]);
                                expression.addBind(new VRMExpressionTextureTransformBind({
                                    material,
                                    scale,
                                    offset,
                                }));
                                return;
                            }
                            // MaterialColorBind
                            const materialColorType = v0ExpressionMaterialColorMap[materialPropertyName];
                            if (materialColorType) {
                                expression.addBind(new VRMExpressionMaterialColorBind({
                                    material,
                                    type: materialColorType,
                                    targetValue: new THREE.Color(...materialValue.targetValue.slice(0, 3)),
                                }));
                                return;
                            }
                            console.warn(materialPropertyName + ' is not supported');
                        });
                    });
                }
                manager.registerExpression(expression);
            })));
            return manager;
        });
    }
}
VRMExpressionLoaderPlugin.v0v1PresetNameMap = {
    a: 'aa',
    e: 'ee',
    i: 'ih',
    o: 'oh',
    u: 'ou',
    blink: 'blink',
    joy: 'happy',
    angry: 'angry',
    sorrow: 'sad',
    fun: 'relaxed',
    lookup: 'lookUp',
    lookdown: 'lookDown',
    lookleft: 'lookLeft',
    lookright: 'lookRight',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    blink_l: 'blinkLeft',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    blink_r: 'blinkRight',
    neutral: 'neutral',
};

/* eslint-disable @typescript-eslint/naming-convention */
const VRMExpressionOverrideType = {
    None: 'none',
    Block: 'block',
    Blend: 'blend',
};

class VRMFirstPerson {
    /**
     * Create a new VRMFirstPerson object.
     *
     * @param humanoid A {@link VRMHumanoid}
     * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
     */
    constructor(humanoid, meshAnnotations) {
        this._firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER;
        this._thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER;
        this._initializedLayers = false;
        this.humanoid = humanoid;
        this.meshAnnotations = meshAnnotations;
    }
    /**
     * Copy the given {@link VRMFirstPerson} into this one.
     * {@link humanoid} must be same as the source one.
     * @param source The {@link VRMFirstPerson} you want to copy
     * @returns this
     */
    copy(source) {
        if (this.humanoid !== source.humanoid) {
            throw new Error('VRMFirstPerson: humanoid must be same in order to copy');
        }
        this.meshAnnotations = source.meshAnnotations.map((annotation) => ({
            meshes: annotation.meshes.concat(),
            type: annotation.type,
        }));
        return this;
    }
    /**
     * Returns a clone of this {@link VRMFirstPerson}.
     * @returns Copied {@link VRMFirstPerson}
     */
    clone() {
        return new VRMFirstPerson(this.humanoid, this.meshAnnotations).copy(this);
    }
    /**
     * A camera layer represents `FirstPersonOnly` layer.
     * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
     *
     * The value is {@link DEFAULT_FIRSTPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
     *
     * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
     * @see https://threejs.org/docs/#api/en/core/Layers
     */
    get firstPersonOnlyLayer() {
        return this._firstPersonOnlyLayer;
    }
    /**
     * A camera layer represents `ThirdPersonOnly` layer.
     * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
     *
     * The value is {@link DEFAULT_THIRDPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
     *
     * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
     * @see https://threejs.org/docs/#api/en/core/Layers
     */
    get thirdPersonOnlyLayer() {
        return this._thirdPersonOnlyLayer;
    }
    /**
     * In this method, it assigns layers for every meshes based on mesh annotations.
     * You must call this method first before you use the layer feature.
     *
     * This is an equivalent of [VRMFirstPerson.Setup](https://github.com/vrm-c/UniVRM/blob/73a5bd8fcddaa2a7a8735099a97e63c9db3e5ea0/Assets/VRM/Runtime/FirstPerson/VRMFirstPerson.cs#L295-L299) of the UniVRM.
     *
     * The `cameraLayer` parameter specifies which layer will be assigned for `FirstPersonOnly` / `ThirdPersonOnly`.
     * In UniVRM, we specified those by naming each desired layer as `FIRSTPERSON_ONLY_LAYER` / `THIRDPERSON_ONLY_LAYER`
     * but we are going to specify these layers at here since we are unable to name layers in Three.js.
     *
     * @param cameraLayer Specify which layer will be for `FirstPersonOnly` / `ThirdPersonOnly`.
     */
    setup({ firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER, thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER, } = {}) {
        if (this._initializedLayers) {
            return;
        }
        this._firstPersonOnlyLayer = firstPersonOnlyLayer;
        this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;
        this.meshAnnotations.forEach((item) => {
            item.meshes.forEach((mesh) => {
                if (item.type === 'firstPersonOnly') {
                    mesh.layers.set(this._firstPersonOnlyLayer);
                    mesh.traverse((child) => child.layers.set(this._firstPersonOnlyLayer));
                }
                else if (item.type === 'thirdPersonOnly') {
                    mesh.layers.set(this._thirdPersonOnlyLayer);
                    mesh.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
                }
                else if (item.type === 'auto') {
                    this._createHeadlessModel(mesh);
                }
            });
        });
        this._initializedLayers = true;
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
        const dst = new THREE.SkinnedMesh(src.geometry.clone(), src.material);
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
        dst.bind(new THREE.Skeleton(src.skeleton.bones, src.skeleton.boneInverses), new THREE.Matrix4());
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
    _createHeadlessModel(node) {
        if (node.type === 'Group') {
            node.layers.set(this._thirdPersonOnlyLayer);
            if (this._isEraseTarget(node)) {
                node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
            }
            else {
                const parent = new THREE.Group();
                parent.name = `_headless_${node.name}`;
                parent.layers.set(this._firstPersonOnlyLayer);
                node.parent.add(parent);
                node.children
                    .filter((child) => child.type === 'SkinnedMesh')
                    .forEach((child) => {
                    const skinnedMesh = child;
                    this._createHeadlessModelForSkinnedMesh(parent, skinnedMesh);
                });
            }
        }
        else if (node.type === 'SkinnedMesh') {
            const skinnedMesh = node;
            this._createHeadlessModelForSkinnedMesh(node.parent, skinnedMesh);
        }
        else {
            if (this._isEraseTarget(node)) {
                node.layers.set(this._thirdPersonOnlyLayer);
                node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
            }
        }
    }
    _isEraseTarget(bone) {
        if (bone === this.humanoid.getRawBoneNode('head')) {
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
VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
/**
 * A default camera layer for `ThirdPersonOnly` layer.
 *
 * @see [[getThirdPersonOnlyLayer]]
 */
VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER = 10;

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS$3 = new Set(['1.0', '1.0-beta']);
/**
 * A plugin of GLTFLoader that imports a {@link VRMFirstPerson} from a VRM extension of a GLTF.
 */
class VRMFirstPersonLoaderPlugin {
    constructor(parser) {
        this.parser = parser;
    }
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMFirstPersonLoaderPlugin';
    }
    afterRoot(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            const vrmHumanoid = gltf.userData.vrmHumanoid;
            // explicitly distinguish null and undefined
            // since vrmHumanoid might be null as a result
            if (vrmHumanoid === null) {
                return;
            }
            else if (vrmHumanoid === undefined) {
                throw new Error('VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first');
            }
            gltf.userData.vrmFirstPerson = yield this._import(gltf, vrmHumanoid);
        });
    }
    /**
     * Import a {@link VRMFirstPerson} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
     */
    _import(gltf, humanoid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (humanoid == null) {
                return null;
            }
            const v1Result = yield this._v1Import(gltf, humanoid);
            if (v1Result) {
                return v1Result;
            }
            const v0Result = yield this._v0Import(gltf, humanoid);
            if (v0Result) {
                return v0Result;
            }
            return null;
        });
    }
    _v1Import(gltf, humanoid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const isVRMUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf('VRMC_vrm')) !== -1;
            if (!isVRMUsed) {
                return null;
            }
            const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b['VRMC_vrm'];
            if (!extension) {
                return null;
            }
            const specVersion = extension.specVersion;
            if (!POSSIBLE_SPEC_VERSIONS$3.has(specVersion)) {
                console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
                return null;
            }
            const schemaFirstPerson = extension.firstPerson;
            if (!schemaFirstPerson) {
                return null;
            }
            const meshAnnotations = [];
            const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
            Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
                var _a;
                const annotation = schemaFirstPerson.meshAnnotations
                    ? schemaFirstPerson.meshAnnotations.find((a) => a.node === nodeIndex)
                    : undefined;
                meshAnnotations.push({
                    meshes: primitives,
                    type: (_a = annotation === null || annotation === void 0 ? void 0 : annotation.type) !== null && _a !== void 0 ? _a : 'both',
                });
            });
            return new VRMFirstPerson(humanoid, meshAnnotations);
        });
    }
    _v0Import(gltf, humanoid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            const vrmExt = (_a = json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaFirstPerson = vrmExt.firstPerson;
            if (!schemaFirstPerson) {
                return null;
            }
            const meshAnnotations = [];
            const nodePrimitivesMap = yield gltfExtractPrimitivesFromNodes(gltf);
            Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
                const schemaNode = json.nodes[nodeIndex];
                const flag = schemaFirstPerson.meshAnnotations
                    ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === schemaNode.mesh)
                    : undefined;
                meshAnnotations.push({
                    meshes: primitives,
                    type: this._convertV0FlagToV1Type(flag === null || flag === void 0 ? void 0 : flag.firstPersonFlag),
                });
            });
            return new VRMFirstPerson(humanoid, meshAnnotations);
        });
    }
    _convertV0FlagToV1Type(flag) {
        if (flag === 'FirstPersonOnly') {
            return 'firstPersonOnly';
        }
        else if (flag === 'ThirdPersonOnly') {
            return 'thirdPersonOnly';
        }
        else if (flag === 'Auto') {
            return 'auto';
        }
        else {
            return 'both';
        }
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
const VRMFirstPersonMeshAnnotationType = {
    Auto: 'auto',
    Both: 'both',
    ThirdPersonOnly: 'thirdPersonOnly',
    FirstPersonOnly: 'firstPersonOnly',
};

const _v3A$4 = new THREE.Vector3();
const _v3B$2 = new THREE.Vector3();
const _quatA$5 = new THREE.Quaternion();
class VRMHumanoidHelper extends THREE.Group {
    constructor(humanoid) {
        super();
        this.vrmHumanoid = humanoid;
        this._boneAxesMap = new Map();
        Object.values(humanoid.humanBones).forEach((bone) => {
            const helper = new THREE.AxesHelper(1.0);
            helper.matrixAutoUpdate = false;
            helper.material.depthTest = false;
            helper.material.depthWrite = false;
            this.add(helper);
            // TODO: type assertion is not needed in later versions of TypeScript
            this._boneAxesMap.set(bone, helper);
        });
    }
    dispose() {
        Array.from(this._boneAxesMap.values()).forEach((axes) => {
            axes.geometry.dispose();
            axes.material.dispose();
        });
    }
    updateMatrixWorld(force) {
        Array.from(this._boneAxesMap.entries()).forEach(([bone, axes]) => {
            bone.node.updateWorldMatrix(true, false);
            bone.node.matrixWorld.decompose(_v3A$4, _quatA$5, _v3B$2);
            const scale = _v3A$4.set(0.1, 0.1, 0.1).divide(_v3B$2);
            axes.matrix.copy(bone.node.matrixWorld).scale(scale);
        });
        super.updateMatrixWorld(force);
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * The list of {@link VRMHumanBoneName}. Dependency aware.
 */
const VRMHumanBoneList = [
    'hips',
    'spine',
    'chest',
    'upperChest',
    'neck',
    'head',
    'leftEye',
    'rightEye',
    'jaw',
    'leftUpperLeg',
    'leftLowerLeg',
    'leftFoot',
    'leftToes',
    'rightUpperLeg',
    'rightLowerLeg',
    'rightFoot',
    'rightToes',
    'leftShoulder',
    'leftUpperArm',
    'leftLowerArm',
    'leftHand',
    'rightShoulder',
    'rightUpperArm',
    'rightLowerArm',
    'rightHand',
    'leftThumbMetacarpal',
    'leftThumbProximal',
    'leftThumbDistal',
    'leftIndexProximal',
    'leftIndexIntermediate',
    'leftIndexDistal',
    'leftMiddleProximal',
    'leftMiddleIntermediate',
    'leftMiddleDistal',
    'leftRingProximal',
    'leftRingIntermediate',
    'leftRingDistal',
    'leftLittleProximal',
    'leftLittleIntermediate',
    'leftLittleDistal',
    'rightThumbMetacarpal',
    'rightThumbProximal',
    'rightThumbDistal',
    'rightIndexProximal',
    'rightIndexIntermediate',
    'rightIndexDistal',
    'rightMiddleProximal',
    'rightMiddleIntermediate',
    'rightMiddleDistal',
    'rightRingProximal',
    'rightRingIntermediate',
    'rightRingDistal',
    'rightLittleProximal',
    'rightLittleIntermediate',
    'rightLittleDistal',
];

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * The names of {@link VRMHumanoid} bone names.
 *
 * Ref: https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/humanoid.md
 */
const VRMHumanBoneName = {
    Hips: 'hips',
    Spine: 'spine',
    Chest: 'chest',
    UpperChest: 'upperChest',
    Neck: 'neck',
    Head: 'head',
    LeftEye: 'leftEye',
    RightEye: 'rightEye',
    Jaw: 'jaw',
    LeftUpperLeg: 'leftUpperLeg',
    LeftLowerLeg: 'leftLowerLeg',
    LeftFoot: 'leftFoot',
    LeftToes: 'leftToes',
    RightUpperLeg: 'rightUpperLeg',
    RightLowerLeg: 'rightLowerLeg',
    RightFoot: 'rightFoot',
    RightToes: 'rightToes',
    LeftShoulder: 'leftShoulder',
    LeftUpperArm: 'leftUpperArm',
    LeftLowerArm: 'leftLowerArm',
    LeftHand: 'leftHand',
    RightShoulder: 'rightShoulder',
    RightUpperArm: 'rightUpperArm',
    RightLowerArm: 'rightLowerArm',
    RightHand: 'rightHand',
    LeftThumbMetacarpal: 'leftThumbMetacarpal',
    LeftThumbProximal: 'leftThumbProximal',
    LeftThumbDistal: 'leftThumbDistal',
    LeftIndexProximal: 'leftIndexProximal',
    LeftIndexIntermediate: 'leftIndexIntermediate',
    LeftIndexDistal: 'leftIndexDistal',
    LeftMiddleProximal: 'leftMiddleProximal',
    LeftMiddleIntermediate: 'leftMiddleIntermediate',
    LeftMiddleDistal: 'leftMiddleDistal',
    LeftRingProximal: 'leftRingProximal',
    LeftRingIntermediate: 'leftRingIntermediate',
    LeftRingDistal: 'leftRingDistal',
    LeftLittleProximal: 'leftLittleProximal',
    LeftLittleIntermediate: 'leftLittleIntermediate',
    LeftLittleDistal: 'leftLittleDistal',
    RightThumbMetacarpal: 'rightThumbMetacarpal',
    RightThumbProximal: 'rightThumbProximal',
    RightThumbDistal: 'rightThumbDistal',
    RightIndexProximal: 'rightIndexProximal',
    RightIndexIntermediate: 'rightIndexIntermediate',
    RightIndexDistal: 'rightIndexDistal',
    RightMiddleProximal: 'rightMiddleProximal',
    RightMiddleIntermediate: 'rightMiddleIntermediate',
    RightMiddleDistal: 'rightMiddleDistal',
    RightRingProximal: 'rightRingProximal',
    RightRingIntermediate: 'rightRingIntermediate',
    RightRingDistal: 'rightRingDistal',
    RightLittleProximal: 'rightLittleProximal',
    RightLittleIntermediate: 'rightLittleIntermediate',
    RightLittleDistal: 'rightLittleDistal',
};

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * An object that maps from {@link VRMHumanBoneName} to its parent {@link VRMHumanBoneName}.
 *
 * Ref: https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/humanoid.md
 */
const VRMHumanBoneParentMap = {
    hips: null,
    spine: 'hips',
    chest: 'spine',
    upperChest: 'chest',
    neck: 'upperChest',
    head: 'neck',
    leftEye: 'head',
    rightEye: 'head',
    jaw: 'head',
    leftUpperLeg: 'hips',
    leftLowerLeg: 'leftUpperLeg',
    leftFoot: 'leftLowerLeg',
    leftToes: 'leftFoot',
    rightUpperLeg: 'hips',
    rightLowerLeg: 'rightUpperLeg',
    rightFoot: 'rightLowerLeg',
    rightToes: 'rightFoot',
    leftShoulder: 'upperChest',
    leftUpperArm: 'leftShoulder',
    leftLowerArm: 'leftUpperArm',
    leftHand: 'leftLowerArm',
    rightShoulder: 'upperChest',
    rightUpperArm: 'rightShoulder',
    rightLowerArm: 'rightUpperArm',
    rightHand: 'rightLowerArm',
    leftThumbMetacarpal: 'leftHand',
    leftThumbProximal: 'leftThumbMetacarpal',
    leftThumbDistal: 'leftThumbProximal',
    leftIndexProximal: 'leftHand',
    leftIndexIntermediate: 'leftIndexProximal',
    leftIndexDistal: 'leftIndexIntermediate',
    leftMiddleProximal: 'leftHand',
    leftMiddleIntermediate: 'leftMiddleProximal',
    leftMiddleDistal: 'leftMiddleIntermediate',
    leftRingProximal: 'leftHand',
    leftRingIntermediate: 'leftRingProximal',
    leftRingDistal: 'leftRingIntermediate',
    leftLittleProximal: 'leftHand',
    leftLittleIntermediate: 'leftLittleProximal',
    leftLittleDistal: 'leftLittleIntermediate',
    rightThumbMetacarpal: 'rightHand',
    rightThumbProximal: 'rightThumbMetacarpal',
    rightThumbDistal: 'rightThumbProximal',
    rightIndexProximal: 'rightHand',
    rightIndexIntermediate: 'rightIndexProximal',
    rightIndexDistal: 'rightIndexIntermediate',
    rightMiddleProximal: 'rightHand',
    rightMiddleIntermediate: 'rightMiddleProximal',
    rightMiddleDistal: 'rightMiddleIntermediate',
    rightRingProximal: 'rightHand',
    rightRingIntermediate: 'rightRingProximal',
    rightRingDistal: 'rightRingIntermediate',
    rightLittleProximal: 'rightHand',
    rightLittleIntermediate: 'rightLittleProximal',
    rightLittleDistal: 'rightLittleIntermediate',
};

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

const _v3A$3 = new THREE.Vector3();
const _quatA$4 = new THREE.Quaternion();
/**
 * A class represents the Rig of a VRM.
 */
class VRMRig {
    /**
     * Create a new {@link VRMHumanoid}.
     * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
     */
    constructor(humanBones) {
        this.humanBones = humanBones;
        this.restPose = this.getAbsolutePose();
    }
    /**
     * Return the current absolute pose of this humanoid as a {@link VRMPose}.
     * Note that the output result will contain initial state of the VRM and not compatible between different models.
     * You might want to use {@link getPose} instead.
     */
    getAbsolutePose() {
        const pose = {};
        Object.keys(this.humanBones).forEach((vrmBoneNameString) => {
            const vrmBoneName = vrmBoneNameString;
            const node = this.getBoneNode(vrmBoneName);
            // Ignore when there are no bone on the VRMHumanoid
            if (!node) {
                return;
            }
            // Get the position / rotation from the node
            _v3A$3.copy(node.position);
            _quatA$4.copy(node.quaternion);
            // Convert to raw arrays
            pose[vrmBoneName] = {
                position: _v3A$3.toArray(),
                rotation: _quatA$4.toArray(),
            };
        });
        return pose;
    }
    /**
     * Return the current pose of this humanoid as a {@link VRMPose}.
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getPose() {
        const pose = {};
        Object.keys(this.humanBones).forEach((boneNameString) => {
            const boneName = boneNameString;
            const node = this.getBoneNode(boneName);
            // Ignore when there are no bone on the VRMHumanoid
            if (!node) {
                return;
            }
            // Take a diff from restPose
            _v3A$3.set(0, 0, 0);
            _quatA$4.identity();
            const restState = this.restPose[boneName];
            if (restState === null || restState === void 0 ? void 0 : restState.position) {
                _v3A$3.fromArray(restState.position).negate();
            }
            if (restState === null || restState === void 0 ? void 0 : restState.rotation) {
                quatInvertCompat(_quatA$4.fromArray(restState.rotation));
            }
            // Get the position / rotation from the node
            _v3A$3.add(node.position);
            _quatA$4.premultiply(node.quaternion);
            // Convert to raw arrays
            pose[boneName] = {
                position: _v3A$3.toArray(),
                rotation: _quatA$4.toArray(),
            };
        });
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
        Object.entries(poseObject).forEach(([boneNameString, state]) => {
            const boneName = boneNameString;
            const node = this.getBoneNode(boneName);
            // Ignore when there are no bone that is defined in the pose on the VRMHumanoid
            if (!node) {
                return;
            }
            const restState = this.restPose[boneName];
            if (!restState) {
                // It's very unlikely. Possibly a bug
                return;
            }
            // Apply the state to the actual bone
            if (state === null || state === void 0 ? void 0 : state.position) {
                node.position.fromArray(state.position);
                if (restState.position) {
                    node.position.add(_v3A$3.fromArray(restState.position));
                }
            }
            if (state === null || state === void 0 ? void 0 : state.rotation) {
                node.quaternion.fromArray(state.rotation);
                if (restState.rotation) {
                    node.quaternion.multiply(_quatA$4.fromArray(restState.rotation));
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
     * Return a bone bound to a specified {@link VRMHumanBoneName}, as a {@link VRMHumanBone}.
     *
     * @param name Name of the bone you want
     */
    getBone(name) {
        var _a;
        return (_a = this.humanBones[name]) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * Return a bone bound to a specified {@link VRMHumanBoneName}, as a `THREE.Object3D`.
     *
     * @param name Name of the bone you want
     */
    getBoneNode(name) {
        var _a, _b;
        return (_b = (_a = this.humanBones[name]) === null || _a === void 0 ? void 0 : _a.node) !== null && _b !== void 0 ? _b : null;
    }
}

const _v3A$2 = new THREE.Vector3();
const _quatA$3 = new THREE.Quaternion();
/**
 * A class represents the normalized Rig of a VRM.
 */
class VRMHumanoidRig extends VRMRig {
    constructor(humanoid) {
        const { rigBones, root, parentWorldRotations, boneRotations } = VRMHumanoidRig._setupTransforms(humanoid);
        super(rigBones);
        this.original = humanoid;
        this.root = root;
        this._parentWorldRotations = parentWorldRotations;
        this._boneRotations = boneRotations;
    }
    static _setupTransforms(modelRig) {
        const root = new THREE.Object3D();
        root.name = 'VRMHumanoidRig';
        // store boneWorldPositions and boneWorldRotations
        const boneWorldPositions = {};
        const boneWorldRotations = {};
        const boneRotations = {};
        VRMHumanBoneList.forEach((boneName) => {
            const boneNode = modelRig.getBoneNode(boneName);
            if (boneNode) {
                const boneWorldPosition = new THREE.Vector3();
                const boneWorldRotation = new THREE.Quaternion();
                boneNode.updateWorldMatrix(true, false);
                boneNode.matrixWorld.decompose(boneWorldPosition, boneWorldRotation, _v3A$2);
                boneWorldPositions[boneName] = boneWorldPosition;
                boneWorldRotations[boneName] = boneWorldRotation;
                boneRotations[boneName] = boneNode.quaternion.clone();
            }
        });
        // build rig hierarchy + store parentWorldRotations
        const parentWorldRotations = {};
        const rigBones = {};
        VRMHumanBoneList.forEach((boneName) => {
            var _a;
            const boneNode = modelRig.getBoneNode(boneName);
            if (boneNode) {
                const boneWorldPosition = boneWorldPositions[boneName];
                // see the nearest parent position
                let currentBoneName = boneName;
                let parentWorldPosition;
                let parentWorldRotation;
                while (parentWorldPosition == null) {
                    currentBoneName = VRMHumanBoneParentMap[currentBoneName];
                    if (currentBoneName == null) {
                        break;
                    }
                    parentWorldPosition = boneWorldPositions[currentBoneName];
                    parentWorldRotation = boneWorldRotations[currentBoneName];
                }
                // add to hierarchy
                const rigBoneNode = new THREE.Object3D();
                rigBoneNode.name = 'Normalized_' + boneNode.name;
                const parentRigBoneNode = (currentBoneName ? (_a = rigBones[currentBoneName]) === null || _a === void 0 ? void 0 : _a.node : root);
                parentRigBoneNode.add(rigBoneNode);
                rigBoneNode.position.copy(boneWorldPosition);
                if (parentWorldPosition) {
                    rigBoneNode.position.sub(parentWorldPosition);
                }
                rigBones[boneName] = { node: rigBoneNode };
                // store parentWorldRotation
                parentWorldRotations[boneName] = parentWorldRotation !== null && parentWorldRotation !== void 0 ? parentWorldRotation : new THREE.Quaternion();
            }
        });
        return {
            rigBones: rigBones,
            root,
            parentWorldRotations,
            boneRotations,
        };
    }
    /**
     * Update this humanoid rig.
     */
    update() {
        VRMHumanBoneList.forEach((boneName) => {
            const boneNode = this.original.getBoneNode(boneName);
            if (boneNode != null) {
                const rigBoneNode = this.getBoneNode(boneName);
                const parentWorldRotation = this._parentWorldRotations[boneName];
                const invParentWorldRotation = _quatA$3.copy(parentWorldRotation).invert();
                const boneRotation = this._boneRotations[boneName];
                boneNode.quaternion
                    .copy(rigBoneNode.quaternion)
                    .multiply(parentWorldRotation)
                    .premultiply(invParentWorldRotation)
                    .multiply(boneRotation);
                // Move the mass center of the VRM
                if (boneName === 'hips') {
                    const boneWorldPosition = rigBoneNode.getWorldPosition(new THREE.Vector3());
                    const parentWorldMatrix = boneNode.parent.matrixWorld;
                    const localPosition = boneWorldPosition.applyMatrix4(parentWorldMatrix.invert());
                    boneNode.position.copy(localPosition);
                }
            }
        });
    }
}

/**
 * A class represents a humanoid of a VRM.
 */
class VRMHumanoid {
    /**
     * Create a new {@link VRMHumanoid}.
     * @param humanBones A {@link VRMHumanBones} contains all the bones of the new humanoid
     * @param autoUpdateHumanBones Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}. `true` by default.
     */
    constructor(humanBones, options) {
        var _a;
        this.autoUpdateHumanBones = (_a = options === null || options === void 0 ? void 0 : options.autoUpdateHumanBones) !== null && _a !== void 0 ? _a : true;
        this._rawHumanBones = new VRMRig(humanBones);
        this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);
    }
    /**
     * @deprecated Deprecated. Use either {@link rawRestPose} or {@link normalizedRestPose} instead.
     */
    get restPose() {
        console.warn('VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead.');
        return this.rawRestPose;
    }
    /**
     * A {@link VRMPose} of its raw human bones that is its default state.
     * Note that it's not compatible with {@link setRawPose} and {@link getRawPose}, since it contains non-relative values of each local transforms.
     */
    get rawRestPose() {
        return this._rawHumanBones.restPose;
    }
    /**
     * A {@link VRMPose} of its normalized human bones that is its default state.
     * Note that it's not compatible with {@link setNormalizedPose} and {@link getNormalizedPose}, since it contains non-relative values of each local transforms.
     */
    get normalizedRestPose() {
        return this._normalizedHumanBones.restPose;
    }
    /**
     * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
     */
    get humanBones() {
        // an alias of `rawHumanBones`
        return this._rawHumanBones.humanBones;
    }
    /**
     * A map from {@link VRMHumanBoneName} to raw {@link VRMHumanBone}s.
     */
    get rawHumanBones() {
        return this._rawHumanBones.humanBones;
    }
    /**
     * A map from {@link VRMHumanBoneName} to normalized {@link VRMHumanBone}s.
     */
    get normalizedHumanBones() {
        return this._normalizedHumanBones.humanBones;
    }
    /**
     * The root of normalized {@link VRMHumanBone}s.
     */
    get normalizedHumanBonesRoot() {
        return this._normalizedHumanBones.root;
    }
    /**
     * Copy the given {@link VRMHumanoid} into this one.
     * @param source The {@link VRMHumanoid} you want to copy
     * @returns this
     */
    copy(source) {
        this.autoUpdateHumanBones = source.autoUpdateHumanBones;
        this._rawHumanBones = new VRMRig(source.humanBones);
        this._normalizedHumanBones = new VRMHumanoidRig(this._rawHumanBones);
        return this;
    }
    /**
     * Returns a clone of this {@link VRMHumanoid}.
     * @returns Copied {@link VRMHumanoid}
     */
    clone() {
        return new VRMHumanoid(this.humanBones, { autoUpdateHumanBones: this.autoUpdateHumanBones }).copy(this);
    }
    /**
     * @deprecated Deprecated. Use either {@link getRawAbsolutePose} or {@link getNormalizedAbsolutePose} instead.
     */
    getAbsolutePose() {
        console.warn('VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead.');
        return this.getRawAbsolutePose();
    }
    /**
     * Return the current absolute pose of this raw human bones as a {@link VRMPose}.
     * Note that the output result will contain initial state of the VRM and not compatible between different models.
     * You might want to use {@link getRawPose} instead.
     */
    getRawAbsolutePose() {
        return this._rawHumanBones.getAbsolutePose();
    }
    /**
     * Return the current absolute pose of this normalized human bones as a {@link VRMPose}.
     * Note that the output result will contain initial state of the VRM and not compatible between different models.
     * You might want to use {@link getNormalizedPose} instead.
     */
    getNormalizedAbsolutePose() {
        return this._normalizedHumanBones.getAbsolutePose();
    }
    /**
     * @deprecated Deprecated. Use either {@link getRawPose} or {@link getNormalizedPose} instead.
     */
    getPose() {
        console.warn('VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead.');
        return this.getRawPose();
    }
    /**
     * Return the current pose of raw human bones as a {@link VRMPose}.
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getRawPose() {
        return this._rawHumanBones.getPose();
    }
    /**
     * Return the current pose of normalized human bones as a {@link VRMPose}.
     *
     * Each transform is a local transform relative from rest pose (T-pose).
     */
    getNormalizedPose() {
        return this._normalizedHumanBones.getPose();
    }
    /**
     * @deprecated Deprecated. Use either {@link setRawPose} or {@link setNormalizedPose} instead.
     */
    setPose(poseObject) {
        console.warn('VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead.');
        return this.setRawPose(poseObject);
    }
    /**
     * Let the raw human bones do a specified pose.
     *
     * Each transform have to be a local transform relative from rest pose (T-pose).
     * You can pass what you got from {@link getRawPose}.
     *
     * If you are using {@link autoUpdateHumanBones}, you might want to use {@link setNormalizedPose} instead.
     *
     * @param poseObject A {@link VRMPose} that represents a single pose
     */
    setRawPose(poseObject) {
        return this._rawHumanBones.setPose(poseObject);
    }
    /**
     * Let the normalized human bones do a specified pose.
     *
     * Each transform have to be a local transform relative from rest pose (T-pose).
     * You can pass what you got from {@link getNormalizedPose}.
     *
     * @param poseObject A {@link VRMPose} that represents a single pose
     */
    setNormalizedPose(poseObject) {
        return this._normalizedHumanBones.setPose(poseObject);
    }
    /**
     * @deprecated Deprecated. Use either {@link resetRawPose} or {@link resetNormalizedPose} instead.
     */
    resetPose() {
        console.warn('VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead.');
        return this.resetRawPose();
    }
    /**
     * Reset the raw humanoid to its rest pose.
     *
     * If you are using {@link autoUpdateHumanBones}, you might want to use {@link resetNormalizedPose} instead.
     */
    resetRawPose() {
        return this._rawHumanBones.resetPose();
    }
    /**
     * Reset the normalized humanoid to its rest pose.
     */
    resetNormalizedPose() {
        return this._rawHumanBones.resetPose();
    }
    /**
     * @deprecated Deprecated. Use either {@link getRawBone} or {@link getNormalizedBone} instead.
     */
    getBone(name) {
        console.warn('VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead.');
        return this.getRawBone(name);
    }
    /**
     * Return a raw {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getRawBone(name) {
        return this._rawHumanBones.getBone(name);
    }
    /**
     * Return a normalized {@link VRMHumanBone} bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getNormalizedBone(name) {
        return this._normalizedHumanBones.getBone(name);
    }
    /**
     * @deprecated Deprecated. Use either {@link getRawBoneNode} or {@link getNormalizedBoneNode} instead.
     */
    getBoneNode(name) {
        console.warn('VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead.');
        return this.getRawBoneNode(name);
    }
    /**
     * Return a raw bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getRawBoneNode(name) {
        return this._rawHumanBones.getBoneNode(name);
    }
    /**
     * Return a normalized bone as a `THREE.Object3D` bound to a specified {@link VRMHumanBoneName}.
     *
     * @param name Name of the bone you want
     */
    getNormalizedBoneNode(name) {
        return this._normalizedHumanBones.getBoneNode(name);
    }
    /**
     * Update the humanoid component.
     *
     * If {@link autoUpdateHumanBones} is `true`, it transfers the pose of normalized human bones to raw human bones.
     */
    update() {
        if (this.autoUpdateHumanBones) {
            this._normalizedHumanBones.update();
        }
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
const VRMRequiredHumanBoneName = {
    Hips: 'hips',
    Spine: 'spine',
    Head: 'head',
    LeftUpperLeg: 'leftUpperLeg',
    LeftLowerLeg: 'leftLowerLeg',
    LeftFoot: 'leftFoot',
    RightUpperLeg: 'rightUpperLeg',
    RightLowerLeg: 'rightLowerLeg',
    RightFoot: 'rightFoot',
    LeftUpperArm: 'leftUpperArm',
    LeftLowerArm: 'leftLowerArm',
    LeftHand: 'leftHand',
    RightUpperArm: 'rightUpperArm',
    RightLowerArm: 'rightLowerArm',
    RightHand: 'rightHand',
};

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS$2 = new Set(['1.0', '1.0-beta']);
/**
 * A map from old thumb bone names to new thumb bone names
 */
const thumbBoneNameMap = {
    leftThumbProximal: 'leftThumbMetacarpal',
    leftThumbIntermediate: 'leftThumbProximal',
    rightThumbProximal: 'rightThumbMetacarpal',
    rightThumbIntermediate: 'rightThumbProximal',
};
/**
 * A plugin of GLTFLoader that imports a {@link VRMHumanoid} from a VRM extension of a GLTF.
 */
class VRMHumanoidLoaderPlugin {
    constructor(parser, options) {
        this.parser = parser;
        this.helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
        this.autoUpdateHumanBones = options === null || options === void 0 ? void 0 : options.autoUpdateHumanBones;
    }
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMHumanoidLoaderPlugin';
    }
    afterRoot(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            gltf.userData.vrmHumanoid = yield this._import(gltf);
        });
    }
    /**
     * Import a {@link VRMHumanoid} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    _import(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            const v1Result = yield this._v1Import(gltf);
            if (v1Result) {
                return v1Result;
            }
            const v0Result = yield this._v0Import(gltf);
            if (v0Result) {
                return v0Result;
            }
            return null;
        });
    }
    _v1Import(gltf) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const isVRMUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf('VRMC_vrm')) !== -1;
            if (!isVRMUsed) {
                return null;
            }
            const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b['VRMC_vrm'];
            if (!extension) {
                return null;
            }
            const specVersion = extension.specVersion;
            if (!POSSIBLE_SPEC_VERSIONS$2.has(specVersion)) {
                console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
                return null;
            }
            const schemaHumanoid = extension.humanoid;
            if (!schemaHumanoid) {
                return null;
            }
            /**
             * compat: 1.0-beta thumb bone names
             *
             * `true` if `leftThumbIntermediate` or `rightThumbIntermediate` exists
             */
            const existsPreviousThumbName = schemaHumanoid.humanBones.leftThumbIntermediate != null ||
                schemaHumanoid.humanBones.rightThumbIntermediate != null;
            const humanBones = {};
            if (schemaHumanoid.humanBones != null) {
                yield Promise.all(Object.entries(schemaHumanoid.humanBones).map(([boneNameString, schemaHumanBone]) => __awaiter(this, void 0, void 0, function* () {
                    let boneName = boneNameString;
                    const index = schemaHumanBone.node;
                    // compat: 1.0-beta previous thumb bone names
                    if (existsPreviousThumbName) {
                        const thumbBoneName = thumbBoneNameMap[boneName];
                        if (thumbBoneName != null) {
                            boneName = thumbBoneName;
                        }
                    }
                    const node = yield this.parser.getDependency('node', index);
                    // if the specified node does not exist, emit a warning
                    if (node == null) {
                        console.warn(`A glTF node bound to the humanoid bone ${boneName} (index = ${index}) does not exist`);
                        return;
                    }
                    // set to the `humanBones`
                    humanBones[boneName] = { node };
                })));
            }
            const humanoid = new VRMHumanoid(this._ensureRequiredBonesExist(humanBones), {
                autoUpdateHumanBones: this.autoUpdateHumanBones,
            });
            gltf.scene.add(humanoid.normalizedHumanBonesRoot);
            if (this.helperRoot) {
                const helper = new VRMHumanoidHelper(humanoid);
                this.helperRoot.add(helper);
                helper.renderOrder = this.helperRoot.renderOrder;
            }
            return humanoid;
        });
    }
    _v0Import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            const vrmExt = (_a = json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaHumanoid = vrmExt.humanoid;
            if (!schemaHumanoid) {
                return null;
            }
            const humanBones = {};
            if (schemaHumanoid.humanBones != null) {
                yield Promise.all(schemaHumanoid.humanBones.map((bone) => __awaiter(this, void 0, void 0, function* () {
                    const boneName = bone.bone;
                    const index = bone.node;
                    if (boneName == null || index == null) {
                        return;
                    }
                    const node = yield this.parser.getDependency('node', index);
                    // if the specified node does not exist, emit a warning
                    if (node == null) {
                        console.warn(`A glTF node bound to the humanoid bone ${boneName} (index = ${index}) does not exist`);
                        return;
                    }
                    // map to new bone name
                    const thumbBoneName = thumbBoneNameMap[boneName];
                    const newBoneName = (thumbBoneName !== null && thumbBoneName !== void 0 ? thumbBoneName : boneName);
                    // v0 VRMs might have a multiple nodes attached to a single bone...
                    // so if there already is an entry in the `humanBones`, show a warning and ignore it
                    if (humanBones[newBoneName] != null) {
                        console.warn(`Multiple bone entries for ${newBoneName} detected (index = ${index}), ignoring duplicated entries.`);
                        return;
                    }
                    // set to the `humanBones`
                    humanBones[newBoneName] = { node };
                })));
            }
            const humanoid = new VRMHumanoid(this._ensureRequiredBonesExist(humanBones), {
                autoUpdateHumanBones: this.autoUpdateHumanBones,
            });
            gltf.scene.add(humanoid.normalizedHumanBonesRoot);
            if (this.helperRoot) {
                const helper = new VRMHumanoidHelper(humanoid);
                this.helperRoot.add(helper);
                helper.renderOrder = this.helperRoot.renderOrder;
            }
            return humanoid;
        });
    }
    /**
     * Ensure required bones exist in given human bones.
     * @param humanBones Human bones
     * @returns Human bones, no longer partial!
     */
    _ensureRequiredBonesExist(humanBones) {
        // ensure required bones exist
        const missingRequiredBones = Object.values(VRMRequiredHumanBoneName).filter((requiredBoneName) => humanBones[requiredBoneName] == null);
        // throw an error if there are missing bones
        if (missingRequiredBones.length > 0) {
            throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${missingRequiredBones.join(', ')}`);
        }
        return humanBones;
    }
}

class FanBufferGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this._currentTheta = 0;
        this._currentRadius = 0;
        this.theta = 0.0;
        this.radius = 0.0;
        this._currentTheta = 0.0;
        this._currentRadius = 0.0;
        this._attrPos = new THREE.BufferAttribute(new Float32Array(65 * 3), 3);
        this.setAttribute('position', this._attrPos);
        this._attrIndex = new THREE.BufferAttribute(new Uint16Array(3 * 63), 1);
        this.setIndex(this._attrIndex);
        this._buildIndex();
        this.update();
    }
    update() {
        let shouldUpdateGeometry = false;
        if (this._currentTheta !== this.theta) {
            this._currentTheta = this.theta;
            shouldUpdateGeometry = true;
        }
        if (this._currentRadius !== this.radius) {
            this._currentRadius = this.radius;
            shouldUpdateGeometry = true;
        }
        if (shouldUpdateGeometry) {
            this._buildPosition();
        }
    }
    _buildPosition() {
        this._attrPos.setXYZ(0, 0.0, 0.0, 0.0);
        for (let i = 0; i < 64; i++) {
            const t = (i / 63.0) * this._currentTheta;
            this._attrPos.setXYZ(i + 1, this._currentRadius * Math.sin(t), 0.0, this._currentRadius * Math.cos(t));
        }
        this._attrPos.needsUpdate = true;
    }
    _buildIndex() {
        for (let i = 0; i < 63; i++) {
            this._attrIndex.setXYZ(i * 3, 0, i + 1, i + 2);
        }
        this._attrIndex.needsUpdate = true;
    }
}

class LineAndSphereBufferGeometry extends THREE.BufferGeometry {
    constructor() {
        super();
        this.radius = 0.0;
        this._currentRadius = 0.0;
        this.tail = new THREE.Vector3();
        this._currentTail = new THREE.Vector3();
        this._attrPos = new THREE.BufferAttribute(new Float32Array(294), 3);
        this.setAttribute('position', this._attrPos);
        this._attrIndex = new THREE.BufferAttribute(new Uint16Array(194), 1);
        this.setIndex(this._attrIndex);
        this._buildIndex();
        this.update();
    }
    update() {
        let shouldUpdateGeometry = false;
        if (this._currentRadius !== this.radius) {
            this._currentRadius = this.radius;
            shouldUpdateGeometry = true;
        }
        if (!this._currentTail.equals(this.tail)) {
            this._currentTail.copy(this.tail);
            shouldUpdateGeometry = true;
        }
        if (shouldUpdateGeometry) {
            this._buildPosition();
        }
    }
    _buildPosition() {
        for (let i = 0; i < 32; i++) {
            const t = (i / 16.0) * Math.PI;
            this._attrPos.setXYZ(i, Math.cos(t), Math.sin(t), 0.0);
            this._attrPos.setXYZ(32 + i, 0.0, Math.cos(t), Math.sin(t));
            this._attrPos.setXYZ(64 + i, Math.sin(t), 0.0, Math.cos(t));
        }
        this.scale(this._currentRadius, this._currentRadius, this._currentRadius);
        this.translate(this._currentTail.x, this._currentTail.y, this._currentTail.z);
        this._attrPos.setXYZ(96, 0, 0, 0);
        this._attrPos.setXYZ(97, this._currentTail.x, this._currentTail.y, this._currentTail.z);
        this._attrPos.needsUpdate = true;
    }
    _buildIndex() {
        for (let i = 0; i < 32; i++) {
            const i1 = (i + 1) % 32;
            this._attrIndex.setXY(i * 2, i, i1);
            this._attrIndex.setXY(64 + i * 2, 32 + i, 32 + i1);
            this._attrIndex.setXY(128 + i * 2, 64 + i, 64 + i1);
        }
        this._attrIndex.setXY(192, 96, 97);
        this._attrIndex.needsUpdate = true;
    }
}

const _quatA$2 = new THREE.Quaternion();
const _quatB$2 = new THREE.Quaternion();
const _v3A$1 = new THREE.Vector3();
const _v3B$1 = new THREE.Vector3();
const SQRT_2_OVER_2 = Math.sqrt(2.0) / 2.0;
const QUAT_XY_CW90 = new THREE.Quaternion(0, 0, -SQRT_2_OVER_2, SQRT_2_OVER_2);
const VEC3_POSITIVE_Y = new THREE.Vector3(0.0, 1.0, 0.0);
class VRMLookAtHelper extends THREE.Group {
    constructor(lookAt) {
        super();
        this.matrixAutoUpdate = false;
        this.vrmLookAt = lookAt;
        {
            const geometry = new FanBufferGeometry();
            geometry.radius = 0.5;
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide,
                depthTest: false,
                depthWrite: false,
            });
            this._meshPitch = new THREE.Mesh(geometry, material);
            this.add(this._meshPitch);
        }
        {
            const geometry = new FanBufferGeometry();
            geometry.radius = 0.5;
            const material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide,
                depthTest: false,
                depthWrite: false,
            });
            this._meshYaw = new THREE.Mesh(geometry, material);
            this.add(this._meshYaw);
        }
        {
            const geometry = new LineAndSphereBufferGeometry();
            geometry.radius = 0.1;
            const material = new THREE.LineBasicMaterial({
                color: 0xffffff,
                depthTest: false,
                depthWrite: false,
            });
            this._lineTarget = new THREE.LineSegments(geometry, material);
            this._lineTarget.frustumCulled = false;
            this.add(this._lineTarget);
        }
    }
    dispose() {
        this._meshYaw.geometry.dispose();
        this._meshYaw.material.dispose();
        this._meshPitch.geometry.dispose();
        this._meshPitch.material.dispose();
        this._lineTarget.geometry.dispose();
        this._lineTarget.material.dispose();
    }
    updateMatrixWorld(force) {
        // update geometries
        const yaw = THREE.MathUtils.DEG2RAD * this.vrmLookAt.yaw;
        this._meshYaw.geometry.theta = yaw;
        this._meshYaw.geometry.update();
        const pitch = THREE.MathUtils.DEG2RAD * this.vrmLookAt.pitch;
        this._meshPitch.geometry.theta = pitch;
        this._meshPitch.geometry.update();
        // get world position and quaternion
        this.vrmLookAt.getLookAtWorldPosition(_v3A$1);
        this.vrmLookAt.getLookAtWorldQuaternion(_quatA$2);
        // calculate rotation using faceFront
        _quatA$2.multiply(this.vrmLookAt.getFaceFrontQuaternion(_quatB$2));
        // set transform to meshes
        this._meshYaw.position.copy(_v3A$1);
        this._meshYaw.quaternion.copy(_quatA$2);
        this._meshPitch.position.copy(_v3A$1);
        this._meshPitch.quaternion.copy(_quatA$2);
        this._meshPitch.quaternion.multiply(_quatB$2.setFromAxisAngle(VEC3_POSITIVE_Y, yaw));
        this._meshPitch.quaternion.multiply(QUAT_XY_CW90);
        // update target line and sphere
        const { target, autoUpdate } = this.vrmLookAt;
        if (target != null && autoUpdate) {
            target.getWorldPosition(_v3B$1).sub(_v3A$1);
            this._lineTarget.geometry.tail.copy(_v3B$1);
            this._lineTarget.geometry.update();
            this._lineTarget.position.copy(_v3A$1);
        }
        // apply transform to meshes
        super.updateMatrixWorld(force);
    }
}

const _position = new THREE.Vector3();
const _scale = new THREE.Vector3();
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

/**
 * Calculate azimuth / altitude angles from a vector.
 *
 * This returns a difference of angles from (1, 0, 0).
 * Azimuth represents an angle around Y axis.
 * Altitude represents an angle around Z axis.
 * It is rotated in intrinsic Y-Z order.
 *
 * @param vector The vector
 * @returns A tuple contains two angles, `[ azimuth, altitude ]`
 */
function calcAzimuthAltitude(vector) {
    return [Math.atan2(-vector.z, vector.x), Math.atan2(vector.y, Math.sqrt(vector.x * vector.x + vector.z * vector.z))];
}

/**
 * Make sure the angle is within -PI to PI.
 *
 * @example
 * ```js
 * sanitizeAngle(1.5 * Math.PI) // -0.5 * PI
 * ```
 *
 * @param angle An input angle
 */
function sanitizeAngle(angle) {
    const roundTurn = Math.round(angle / 2.0 / Math.PI);
    return angle - 2.0 * Math.PI * roundTurn;
}

const VEC3_POSITIVE_Z$1 = new THREE.Vector3(0.0, 0.0, 1.0);
const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quatA$1 = new THREE.Quaternion();
const _quatB$1 = new THREE.Quaternion();
const _quatC = new THREE.Quaternion();
const _quatD = new THREE.Quaternion();
const _eulerA$1 = new THREE.Euler();
/**
 * A class controls eye gaze movements of a VRM.
 */
class VRMLookAt {
    /**
     * Create a new {@link VRMLookAt}.
     *
     * @param humanoid A {@link VRMHumanoid}
     * @param applier A {@link VRMLookAtApplier}
     */
    constructor(humanoid, applier) {
        /**
         * The origin of LookAt. Position offset from the head bone.
         */
        this.offsetFromHeadBone = new THREE.Vector3();
        /**
         * If this is true, the LookAt will be updated automatically by calling {@link update}, towarding the direction to the {@link target}.
         * `true` by default.
         *
         * See also: {@link target}
         */
        this.autoUpdate = true;
        /**
         * The front direction of the face.
         * Intended to be used for VRM 0.0 compat (VRM 0.0 models are facing Z- instead of Z+).
         * You usually don't want to touch this.
         */
        this.faceFront = new THREE.Vector3(0.0, 0.0, 1.0);
        this.humanoid = humanoid;
        this.applier = applier;
        this._yaw = 0.0;
        this._pitch = 0.0;
        this._needsUpdate = true;
        this._restHeadWorldQuaternion = this.getLookAtWorldQuaternion(new THREE.Quaternion());
    }
    /**
     * Its current angle around Y axis, in degree.
     */
    get yaw() {
        return this._yaw;
    }
    /**
     * Its current angle around Y axis, in degree.
     */
    set yaw(value) {
        this._yaw = value;
        this._needsUpdate = true;
    }
    /**
     * Its current angle around X axis, in degree.
     */
    get pitch() {
        return this._pitch;
    }
    /**
     * Its current angle around X axis, in degree.
     */
    set pitch(value) {
        this._pitch = value;
        this._needsUpdate = true;
    }
    /**
     * @deprecated Use {@link getEuler} instead.
     */
    get euler() {
        console.warn('VRMLookAt: euler is deprecated. use getEuler() instead.');
        return this.getEuler(new THREE.Euler());
    }
    /**
     * Get its yaw-pitch angles as an `Euler`.
     * Does NOT consider {@link faceFront}.
     *
     * @param target The target euler
     */
    getEuler(target) {
        return target.set(THREE.MathUtils.DEG2RAD * this._pitch, THREE.MathUtils.DEG2RAD * this._yaw, 0.0, 'YXZ');
    }
    /**
     * Copy the given {@link VRMLookAt} into this one.
     * {@link humanoid} must be same as the source one.
     * {@link applier} will reference the same instance as the source one.
     * @param source The {@link VRMLookAt} you want to copy
     * @returns this
     */
    copy(source) {
        if (this.humanoid !== source.humanoid) {
            throw new Error('VRMLookAt: humanoid must be same in order to copy');
        }
        this.offsetFromHeadBone.copy(source.offsetFromHeadBone);
        this.applier = source.applier;
        this.autoUpdate = source.autoUpdate;
        this.target = source.target;
        this.faceFront.copy(source.faceFront);
        return this;
    }
    /**
     * Returns a clone of this {@link VRMLookAt}.
     * Note that {@link humanoid} and {@link applier} will reference the same instance as this one.
     * @returns Copied {@link VRMLookAt}
     */
    clone() {
        return new VRMLookAt(this.humanoid, this.applier).copy(this);
    }
    /**
     * Reset the lookAt direction to initial direction.
     */
    reset() {
        this._yaw = 0.0;
        this._pitch = 0.0;
        this._needsUpdate = true;
    }
    /**
     * Get its head position in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldPosition(target) {
        const head = this.humanoid.getRawBoneNode('head');
        return target.copy(this.offsetFromHeadBone).applyMatrix4(head.matrixWorld);
    }
    /**
     * Get its head rotation in world coordinate.
     * Does NOT consider {@link faceFront}.
     *
     * @param target A target `THREE.Quaternion`
     */
    getLookAtWorldQuaternion(target) {
        const head = this.humanoid.getRawBoneNode('head');
        return getWorldQuaternionLite(head, target);
    }
    /**
     * Get a quaternion that rotates the +Z unit vector of the humanoid Head to the {@link faceFront} direction.
     *
     * @param target A target `THREE.Quaternion`
     */
    getFaceFrontQuaternion(target) {
        if (this.faceFront.distanceToSquared(VEC3_POSITIVE_Z$1) < 0.01) {
            return target.copy(this._restHeadWorldQuaternion).invert();
        }
        const [faceFrontAzimuth, faceFrontAltitude] = calcAzimuthAltitude(this.faceFront);
        _eulerA$1.set(0.0, 0.5 * Math.PI + faceFrontAzimuth, faceFrontAltitude, 'YZX');
        return target.setFromEuler(_eulerA$1).premultiply(_quatD.copy(this._restHeadWorldQuaternion).invert());
    }
    /**
     * Get its LookAt direction in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldDirection(target) {
        this.getLookAtWorldQuaternion(_quatB$1);
        this.getFaceFrontQuaternion(_quatC);
        return target
            .copy(VEC3_POSITIVE_Z$1)
            .applyQuaternion(_quatB$1)
            .applyQuaternion(_quatC)
            .applyEuler(this.getEuler(_eulerA$1));
    }
    /**
     * Set its LookAt position.
     * Note that its result will be instantly overwritten if {@link VRMLookAtHead.autoUpdate} is enabled.
     *
     * @param position A target position, in world space
     */
    lookAt(position) {
        // Look at direction in local coordinate
        const headRotDiffInv = _quatA$1
            .copy(this._restHeadWorldQuaternion)
            .multiply(quatInvertCompat(this.getLookAtWorldQuaternion(_quatB$1)));
        const headPos = this.getLookAtWorldPosition(_v3B);
        const lookAtDir = _v3C.copy(position).sub(headPos).applyQuaternion(headRotDiffInv).normalize();
        // calculate angles
        const [azimuthFrom, altitudeFrom] = calcAzimuthAltitude(this.faceFront);
        const [azimuthTo, altitudeTo] = calcAzimuthAltitude(lookAtDir);
        const yaw = sanitizeAngle(azimuthTo - azimuthFrom);
        const pitch = sanitizeAngle(altitudeFrom - altitudeTo); // spinning (1, 0, 0) CCW around Z axis makes the vector look up, while spinning (0, 0, 1) CCW around X axis makes the vector look down
        // apply angles
        this._yaw = THREE.MathUtils.RAD2DEG * yaw;
        this._pitch = THREE.MathUtils.RAD2DEG * pitch;
        this._needsUpdate = true;
    }
    /**
     * Update the VRMLookAtHead.
     * If {@link VRMLookAtHead.autoUpdate} is disabled, it will do nothing.
     *
     * @param delta deltaTime, it isn't used though. You can use the parameter if you want to use this in your own extended {@link VRMLookAt}.
     */
    update(delta) {
        if (this.target != null && this.autoUpdate) {
            this.lookAt(this.target.getWorldPosition(_v3A));
        }
        if (this._needsUpdate) {
            this._needsUpdate = false;
            this.applier.applyYawPitch(this._yaw, this._pitch);
        }
    }
}
VRMLookAt.EULER_ORDER = 'YXZ'; // yaw-pitch-roll

const VEC3_POSITIVE_Z = new THREE.Vector3(0.0, 0.0, 1.0);
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
const _eulerA = new THREE.Euler(0.0, 0.0, 0.0, 'YXZ');
/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
class VRMLookAtBoneApplier {
    /**
     * Create a new {@link VRMLookAtBoneApplier}.
     *
     * @param humanoid A {@link VRMHumanoid}
     * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
     * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
     * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
     * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
     */
    constructor(humanoid, rangeMapHorizontalInner, rangeMapHorizontalOuter, rangeMapVerticalDown, rangeMapVerticalUp) {
        this.humanoid = humanoid;
        this.rangeMapHorizontalInner = rangeMapHorizontalInner;
        this.rangeMapHorizontalOuter = rangeMapHorizontalOuter;
        this.rangeMapVerticalDown = rangeMapVerticalDown;
        this.rangeMapVerticalUp = rangeMapVerticalUp;
        this.faceFront = new THREE.Vector3(0.0, 0.0, 1.0);
        // set rest quaternions
        this._restQuatLeftEye = new THREE.Quaternion();
        this._restQuatRightEye = new THREE.Quaternion();
        this._restLeftEyeParentWorldQuat = new THREE.Quaternion();
        this._restRightEyeParentWorldQuat = new THREE.Quaternion();
        const leftEye = this.humanoid.getRawBoneNode('leftEye');
        const rightEye = this.humanoid.getRawBoneNode('leftEye');
        if (leftEye) {
            this._restQuatLeftEye.copy(leftEye.quaternion);
            getWorldQuaternionLite(leftEye.parent, this._restLeftEyeParentWorldQuat);
        }
        if (rightEye) {
            this._restQuatRightEye.copy(rightEye.quaternion);
            getWorldQuaternionLite(rightEye.parent, this._restRightEyeParentWorldQuat);
        }
    }
    /**
     * Apply the input angle to its associated VRM model.
     *
     * @param yaw Rotation around Y axis, in degree
     * @param pitch Rotation around X axis, in degree
     */
    applyYawPitch(yaw, pitch) {
        const leftEye = this.humanoid.getRawBoneNode('leftEye');
        const rightEye = this.humanoid.getRawBoneNode('rightEye');
        const leftEyeNormalized = this.humanoid.getNormalizedBoneNode('leftEye');
        const rightEyeNormalized = this.humanoid.getNormalizedBoneNode('rightEye');
        // left
        if (leftEye) {
            if (pitch < 0.0) {
                _eulerA.x = -THREE.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
            }
            else {
                _eulerA.x = THREE.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
            }
            if (yaw < 0.0) {
                _eulerA.y = -THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(-yaw);
            }
            else {
                _eulerA.y = THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(yaw);
            }
            _quatA.setFromEuler(_eulerA);
            this._getWorldFaceFrontQuat(_quatB);
            // _quatB * _quatA * _quatB^-1
            // where _quatA is LookAt rotation
            // and _quatB is worldFaceFrontQuat
            leftEyeNormalized.quaternion.copy(_quatB).multiply(_quatA).multiply(_quatB.invert());
            _quatA.copy(this._restLeftEyeParentWorldQuat);
            // _quatA^-1 * leftEyeNormalized.quaternion * _quatA * restQuatLeftEye
            // where _quatA is restLeftEyeParentWorldQuat
            leftEye.quaternion
                .copy(leftEyeNormalized.quaternion)
                .multiply(_quatA)
                .premultiply(_quatA.invert())
                .multiply(this._restQuatLeftEye);
        }
        // right
        if (rightEye) {
            if (pitch < 0.0) {
                _eulerA.x = -THREE.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
            }
            else {
                _eulerA.x = THREE.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
            }
            if (yaw < 0.0) {
                _eulerA.y = -THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(-yaw);
            }
            else {
                _eulerA.y = THREE.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(yaw);
            }
            _quatA.setFromEuler(_eulerA);
            this._getWorldFaceFrontQuat(_quatB);
            // _quatB * _quatA * _quatB^-1
            // where _quatA is LookAt rotation
            // and _quatB is worldFaceFrontQuat
            rightEyeNormalized.quaternion.copy(_quatB).multiply(_quatA).multiply(_quatB.invert());
            _quatA.copy(this._restRightEyeParentWorldQuat);
            // _quatA^-1 * rightEyeNormalized.quaternion * _quatA * restQuatRightEye
            // where _quatA is restRightEyeParentWorldQuat
            rightEye.quaternion
                .copy(rightEyeNormalized.quaternion)
                .multiply(_quatA)
                .premultiply(_quatA.invert())
                .multiply(this._restQuatRightEye);
        }
    }
    /**
     * @deprecated Use {@link applyYawPitch} instead.
     */
    lookAt(euler) {
        console.warn('VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.');
        const yaw = THREE.MathUtils.RAD2DEG * euler.y;
        const pitch = THREE.MathUtils.RAD2DEG * euler.x;
        this.applyYawPitch(yaw, pitch);
    }
    /**
     * Get a quaternion that rotates the world-space +Z unit vector to the {@link faceFront} direction.
     *
     * @param target A target `THREE.Quaternion`
     */
    _getWorldFaceFrontQuat(target) {
        if (this.faceFront.distanceToSquared(VEC3_POSITIVE_Z) < 0.01) {
            return target.identity();
        }
        const [faceFrontAzimuth, faceFrontAltitude] = calcAzimuthAltitude(this.faceFront);
        _eulerA.set(0.0, 0.5 * Math.PI + faceFrontAzimuth, faceFrontAltitude, 'YZX');
        return target.setFromEuler(_eulerA);
    }
}
/**
 * Represent its type of applier.
 */
VRMLookAtBoneApplier.type = 'bone';

/**
 * A class that applies eye gaze directions to a VRM.
 * It will be used by {@link VRMLookAt}.
 */
class VRMLookAtExpressionApplier {
    /**
     * Create a new {@link VRMLookAtExpressionApplier}.
     *
     * @param expressions A {@link VRMExpressionManager}
     * @param rangeMapHorizontalInner A {@link VRMLookAtRangeMap} used for inner transverse direction
     * @param rangeMapHorizontalOuter A {@link VRMLookAtRangeMap} used for outer transverse direction
     * @param rangeMapVerticalDown A {@link VRMLookAtRangeMap} used for down direction
     * @param rangeMapVerticalUp A {@link VRMLookAtRangeMap} used for up direction
     */
    constructor(expressions, rangeMapHorizontalInner, rangeMapHorizontalOuter, rangeMapVerticalDown, rangeMapVerticalUp) {
        this.expressions = expressions;
        this.rangeMapHorizontalInner = rangeMapHorizontalInner;
        this.rangeMapHorizontalOuter = rangeMapHorizontalOuter;
        this.rangeMapVerticalDown = rangeMapVerticalDown;
        this.rangeMapVerticalUp = rangeMapVerticalUp;
    }
    /**
     * Apply the input angle to its associated VRM model.
     *
     * @param yaw Rotation around Y axis, in degree
     * @param pitch Rotation around X axis, in degree
     */
    applyYawPitch(yaw, pitch) {
        if (pitch < 0.0) {
            this.expressions.setValue('lookDown', 0.0);
            this.expressions.setValue('lookUp', this.rangeMapVerticalUp.map(-pitch));
        }
        else {
            this.expressions.setValue('lookUp', 0.0);
            this.expressions.setValue('lookDown', this.rangeMapVerticalDown.map(pitch));
        }
        if (yaw < 0.0) {
            this.expressions.setValue('lookLeft', 0.0);
            this.expressions.setValue('lookRight', this.rangeMapHorizontalOuter.map(-yaw));
        }
        else {
            this.expressions.setValue('lookRight', 0.0);
            this.expressions.setValue('lookLeft', this.rangeMapHorizontalOuter.map(yaw));
        }
    }
    /**
     * @deprecated Use {@link applyYawPitch} instead.
     */
    lookAt(euler) {
        console.warn('VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.');
        const yaw = THREE.MathUtils.RAD2DEG * euler.y;
        const pitch = THREE.MathUtils.RAD2DEG * euler.x;
        this.applyYawPitch(yaw, pitch);
    }
}
/**
 * Represent its type of applier.
 */
VRMLookAtExpressionApplier.type = 'expression';

class VRMLookAtRangeMap {
    /**
     * Create a new {@link VRMLookAtRangeMap}.
     *
     * @param inputMaxValue The {@link inputMaxValue} of the map
     * @param outputScale The {@link outputScale} of the map
     */
    constructor(inputMaxValue, outputScale) {
        this.inputMaxValue = inputMaxValue;
        this.outputScale = outputScale;
    }
    /**
     * Evaluate an input value and output a mapped value.
     * @param src The input value
     */
    map(src) {
        return this.outputScale * saturate(src / this.inputMaxValue);
    }
}

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS$1 = new Set(['1.0', '1.0-beta']);
/**
 * A plugin of GLTFLoader that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
class VRMLookAtLoaderPlugin {
    constructor(parser, options) {
        this.parser = parser;
        this.helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
    }
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMLookAtLoaderPlugin';
    }
    afterRoot(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            const vrmHumanoid = gltf.userData.vrmHumanoid;
            // explicitly distinguish null and undefined
            // since vrmHumanoid might be null as a result
            if (vrmHumanoid === null) {
                return;
            }
            else if (vrmHumanoid === undefined) {
                throw new Error('VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first');
            }
            const vrmExpressionManager = gltf.userData.vrmExpressionManager;
            if (vrmExpressionManager === null) {
                return;
            }
            else if (vrmExpressionManager === undefined) {
                throw new Error('VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first');
            }
            gltf.userData.vrmLookAt = yield this._import(gltf, vrmHumanoid, vrmExpressionManager);
        });
    }
    /**
     * Import a {@link VRMLookAt} from a VRM.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
     * @param expressions A {@link VRMExpressionManager} instance that represents the VRM
     */
    _import(gltf, humanoid, expressions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (humanoid == null || expressions == null) {
                return null;
            }
            const v1Result = yield this._v1Import(gltf, humanoid, expressions);
            if (v1Result) {
                return v1Result;
            }
            const v0Result = yield this._v0Import(gltf, humanoid, expressions);
            if (v0Result) {
                return v0Result;
            }
            return null;
        });
    }
    _v1Import(gltf, humanoid, expressions) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const isVRMUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf('VRMC_vrm')) !== -1;
            if (!isVRMUsed) {
                return null;
            }
            const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b['VRMC_vrm'];
            if (!extension) {
                return null;
            }
            const specVersion = extension.specVersion;
            if (!POSSIBLE_SPEC_VERSIONS$1.has(specVersion)) {
                console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
                return null;
            }
            const schemaLookAt = extension.lookAt;
            if (!schemaLookAt) {
                return null;
            }
            const defaultOutputScale = schemaLookAt.type === 'expression' ? 1.0 : 10.0;
            const mapHI = this._v1ImportRangeMap(schemaLookAt.rangeMapHorizontalInner, defaultOutputScale);
            const mapHO = this._v1ImportRangeMap(schemaLookAt.rangeMapHorizontalOuter, defaultOutputScale);
            const mapVD = this._v1ImportRangeMap(schemaLookAt.rangeMapVerticalDown, defaultOutputScale);
            const mapVU = this._v1ImportRangeMap(schemaLookAt.rangeMapVerticalUp, defaultOutputScale);
            let applier;
            if (schemaLookAt.type === 'expression') {
                applier = new VRMLookAtExpressionApplier(expressions, mapHI, mapHO, mapVD, mapVU);
            }
            else {
                applier = new VRMLookAtBoneApplier(humanoid, mapHI, mapHO, mapVD, mapVU);
            }
            const lookAt = this._importLookAt(humanoid, applier);
            lookAt.offsetFromHeadBone.fromArray((_c = schemaLookAt.offsetFromHeadBone) !== null && _c !== void 0 ? _c : [0.0, 0.06, 0.0]);
            return lookAt;
        });
    }
    _v1ImportRangeMap(schemaRangeMap, defaultOutputScale) {
        var _a, _b;
        return new VRMLookAtRangeMap((_a = schemaRangeMap === null || schemaRangeMap === void 0 ? void 0 : schemaRangeMap.inputMaxValue) !== null && _a !== void 0 ? _a : 90.0, (_b = schemaRangeMap === null || schemaRangeMap === void 0 ? void 0 : schemaRangeMap.outputScale) !== null && _b !== void 0 ? _b : defaultOutputScale);
    }
    _v0Import(gltf, humanoid, expressions) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const vrmExt = (_a = json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaFirstPerson = vrmExt.firstPerson;
            if (!schemaFirstPerson) {
                return null;
            }
            const defaultOutputScale = schemaFirstPerson.lookAtTypeName === 'BlendShape' ? 1.0 : 10.0;
            const mapHI = this._v0ImportDegreeMap(schemaFirstPerson.lookAtHorizontalInner, defaultOutputScale);
            const mapHO = this._v0ImportDegreeMap(schemaFirstPerson.lookAtHorizontalOuter, defaultOutputScale);
            const mapVD = this._v0ImportDegreeMap(schemaFirstPerson.lookAtVerticalDown, defaultOutputScale);
            const mapVU = this._v0ImportDegreeMap(schemaFirstPerson.lookAtVerticalUp, defaultOutputScale);
            let applier;
            if (schemaFirstPerson.lookAtTypeName === 'BlendShape') {
                applier = new VRMLookAtExpressionApplier(expressions, mapHI, mapHO, mapVD, mapVU);
            }
            else {
                applier = new VRMLookAtBoneApplier(humanoid, mapHI, mapHO, mapVD, mapVU);
            }
            const lookAt = this._importLookAt(humanoid, applier);
            if (schemaFirstPerson.firstPersonBoneOffset) {
                lookAt.offsetFromHeadBone.set((_b = schemaFirstPerson.firstPersonBoneOffset.x) !== null && _b !== void 0 ? _b : 0.0, (_c = schemaFirstPerson.firstPersonBoneOffset.y) !== null && _c !== void 0 ? _c : 0.06, -((_d = schemaFirstPerson.firstPersonBoneOffset.z) !== null && _d !== void 0 ? _d : 0.0));
            }
            else {
                lookAt.offsetFromHeadBone.set(0.0, 0.06, 0.0);
            }
            // VRM 0.0 are facing Z- instead of Z+
            lookAt.faceFront.set(0.0, 0.0, -1.0);
            if (applier instanceof VRMLookAtBoneApplier) {
                applier.faceFront.set(0.0, 0.0, -1.0);
            }
            return lookAt;
        });
    }
    _v0ImportDegreeMap(schemaDegreeMap, defaultOutputScale) {
        var _a, _b;
        const curve = schemaDegreeMap === null || schemaDegreeMap === void 0 ? void 0 : schemaDegreeMap.curve;
        if (JSON.stringify(curve) !== '[0,0,0,1,1,1,1,0]') {
            console.warn('Curves of LookAtDegreeMap defined in VRM 0.0 are not supported');
        }
        return new VRMLookAtRangeMap((_a = schemaDegreeMap === null || schemaDegreeMap === void 0 ? void 0 : schemaDegreeMap.xRange) !== null && _a !== void 0 ? _a : 90.0, (_b = schemaDegreeMap === null || schemaDegreeMap === void 0 ? void 0 : schemaDegreeMap.yRange) !== null && _b !== void 0 ? _b : defaultOutputScale);
    }
    _importLookAt(humanoid, applier) {
        const lookAt = new VRMLookAt(humanoid, applier);
        if (this.helperRoot) {
            const helper = new VRMLookAtHelper(lookAt);
            this.helperRoot.add(helper);
            helper.renderOrder = this.helperRoot.renderOrder;
        }
        return lookAt;
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Represents a type of applier.
 */
const VRMLookAtTypeName = {
    Bone: 'bone',
    Expression: 'expression',
};

/**
 * Yoinked from https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/GLTFLoader.js
 */
function resolveURL(url, path) {
    // Invalid URL
    if (typeof url !== 'string' || url === '')
        return '';
    // Host Relative URL
    if (/^https?:\/\//i.test(path) && /^\//.test(url)) {
        path = path.replace(/(^https?:\/\/[^/]+).*/i, '$1');
    }
    // Absolute URL http://,https://,//
    if (/^(https?:)?\/\//i.test(url))
        return url;
    // Data URI
    if (/^data:.*,.*$/i.test(url))
        return url;
    // Blob URL
    if (/^blob:.*$/i.test(url))
        return url;
    // Relative URL
    return path + url;
}

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);
/**
 * A plugin of GLTFLoader that imports a {@link VRM1Meta} from a VRM extension of a GLTF.
 */
class VRMMetaLoaderPlugin {
    constructor(parser, options) {
        var _a, _b, _c;
        this.parser = parser;
        this.needThumbnailImage = (_a = options === null || options === void 0 ? void 0 : options.needThumbnailImage) !== null && _a !== void 0 ? _a : true;
        this.acceptLicenseUrls = (_b = options === null || options === void 0 ? void 0 : options.acceptLicenseUrls) !== null && _b !== void 0 ? _b : ['https://vrm.dev/licenses/1.0/'];
        this.acceptV0Meta = (_c = options === null || options === void 0 ? void 0 : options.acceptV0Meta) !== null && _c !== void 0 ? _c : true;
    }
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMMetaLoaderPlugin';
    }
    afterRoot(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            gltf.userData.vrmMeta = yield this._import(gltf);
        });
    }
    _import(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            const v1Result = yield this._v1Import(gltf);
            if (v1Result != null) {
                return v1Result;
            }
            const v0Result = yield this._v0Import(gltf);
            if (v0Result != null) {
                return v0Result;
            }
            return null;
        });
    }
    _v1Import(gltf) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const isVRMUsed = ((_a = json.extensionsUsed) === null || _a === void 0 ? void 0 : _a.indexOf('VRMC_vrm')) !== -1;
            if (!isVRMUsed) {
                return null;
            }
            const extension = (_b = json.extensions) === null || _b === void 0 ? void 0 : _b['VRMC_vrm'];
            if (extension == null) {
                return null;
            }
            const specVersion = extension.specVersion;
            if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
                console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
                return null;
            }
            const schemaMeta = extension.meta;
            if (!schemaMeta) {
                return null;
            }
            // throw an error if acceptV0Meta is false
            const licenseUrl = schemaMeta.licenseUrl;
            const acceptLicenseUrlsSet = new Set(this.acceptLicenseUrls);
            if (!acceptLicenseUrlsSet.has(licenseUrl)) {
                throw new Error(`VRMMetaLoaderPlugin: The license url "${licenseUrl}" is not accepted`);
            }
            let thumbnailImage = undefined;
            if (this.needThumbnailImage && schemaMeta.thumbnailImage != null) {
                thumbnailImage = (_c = (yield this._extractGLTFImage(schemaMeta.thumbnailImage))) !== null && _c !== void 0 ? _c : undefined;
            }
            return {
                metaVersion: '1',
                name: schemaMeta.name,
                version: schemaMeta.version,
                authors: schemaMeta.authors,
                copyrightInformation: schemaMeta.copyrightInformation,
                contactInformation: schemaMeta.contactInformation,
                references: schemaMeta.references,
                thirdPartyLicenses: schemaMeta.thirdPartyLicenses,
                thumbnailImage,
                licenseUrl: schemaMeta.licenseUrl,
                avatarPermission: schemaMeta.avatarPermission,
                allowExcessivelyViolentUsage: schemaMeta.allowExcessivelyViolentUsage,
                allowExcessivelySexualUsage: schemaMeta.allowExcessivelySexualUsage,
                commercialUsage: schemaMeta.commercialUsage,
                allowPoliticalOrReligiousUsage: schemaMeta.allowPoliticalOrReligiousUsage,
                allowAntisocialOrHateUsage: schemaMeta.allowAntisocialOrHateUsage,
                creditNotation: schemaMeta.creditNotation,
                allowRedistribution: schemaMeta.allowRedistribution,
                modification: schemaMeta.modification,
                otherLicenseUrl: schemaMeta.otherLicenseUrl,
            };
        });
    }
    _v0Import(gltf) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            // early abort if it doesn't use vrm
            const vrmExt = (_a = json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
            if (!vrmExt) {
                return null;
            }
            const schemaMeta = vrmExt.meta;
            if (!schemaMeta) {
                return null;
            }
            // throw an error if acceptV0Meta is false
            if (!this.acceptV0Meta) {
                throw new Error('VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false');
            }
            // load thumbnail texture
            let texture;
            if (this.needThumbnailImage && schemaMeta.texture != null && schemaMeta.texture !== -1) {
                texture = yield this.parser.getDependency('texture', schemaMeta.texture);
            }
            return {
                metaVersion: '0',
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
    _extractGLTFImage(index) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const json = this.parser.json;
            const source = (_a = json.images) === null || _a === void 0 ? void 0 : _a[index];
            if (source == null) {
                console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${index}] of glTF as a thumbnail but the image doesn't exist`);
                return null;
            }
            // Ref: https://github.com/mrdoob/three.js/blob/r124/examples/jsm/loaders/GLTFLoader.js#L2467
            // `source.uri` might be a reference to a file
            let sourceURI = source.uri;
            // Load the binary as a blob
            if (source.bufferView != null) {
                const bufferView = yield this.parser.getDependency('bufferView', source.bufferView);
                const blob = new Blob([bufferView], { type: source.mimeType });
                sourceURI = URL.createObjectURL(blob);
            }
            if (sourceURI == null) {
                console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${index}] of glTF as a thumbnail but the image couldn't load properly`);
                return null;
            }
            const loader = new THREE.ImageLoader();
            return yield loader.loadAsync(resolveURL(sourceURI, this.parser.options.path)).catch((error) => {
                console.error(error);
                console.warn('VRMMetaLoaderPlugin: Failed to load a thumbnail image');
                return null;
            });
        });
    }
}

/**
 * A class that represents a single VRM model.
 * This class only includes core spec of the VRM (`VRMC_vrm`).
 */
class VRMCore {
    /**
     * Create a new VRM instance.
     *
     * @param params [[VRMParameters]] that represents components of the VRM
     */
    constructor(params) {
        this.scene = params.scene;
        this.meta = params.meta;
        this.humanoid = params.humanoid;
        this.expressionManager = params.expressionManager;
        this.firstPerson = params.firstPerson;
        this.lookAt = params.lookAt;
    }
    /**
     * **You need to call this on your update loop.**
     *
     * This function updates every VRM components.
     *
     * @param delta deltaTime
     */
    update(delta) {
        this.humanoid.update();
        if (this.lookAt) {
            this.lookAt.update(delta);
        }
        if (this.expressionManager) {
            this.expressionManager.update();
        }
    }
}

class VRMCoreLoaderPlugin {
    constructor(parser, options) {
        var _a, _b, _c, _d, _e;
        this.parser = parser;
        const helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
        const autoUpdateHumanBones = options === null || options === void 0 ? void 0 : options.autoUpdateHumanBones;
        this.expressionPlugin = (_a = options === null || options === void 0 ? void 0 : options.expressionPlugin) !== null && _a !== void 0 ? _a : new VRMExpressionLoaderPlugin(parser);
        this.firstPersonPlugin = (_b = options === null || options === void 0 ? void 0 : options.firstPersonPlugin) !== null && _b !== void 0 ? _b : new VRMFirstPersonLoaderPlugin(parser);
        this.humanoidPlugin = (_c = options === null || options === void 0 ? void 0 : options.humanoidPlugin) !== null && _c !== void 0 ? _c : new VRMHumanoidLoaderPlugin(parser, { helperRoot, autoUpdateHumanBones });
        this.lookAtPlugin = (_d = options === null || options === void 0 ? void 0 : options.lookAtPlugin) !== null && _d !== void 0 ? _d : new VRMLookAtLoaderPlugin(parser, { helperRoot });
        this.metaPlugin = (_e = options === null || options === void 0 ? void 0 : options.metaPlugin) !== null && _e !== void 0 ? _e : new VRMMetaLoaderPlugin(parser);
    }
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMC_vrm';
    }
    afterRoot(gltf) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.metaPlugin.afterRoot(gltf);
            yield this.humanoidPlugin.afterRoot(gltf);
            yield this.expressionPlugin.afterRoot(gltf);
            yield this.lookAtPlugin.afterRoot(gltf);
            yield this.firstPersonPlugin.afterRoot(gltf);
            const meta = gltf.userData.vrmMeta;
            const humanoid = gltf.userData.vrmHumanoid;
            // meta and humanoid are required to be a VRM.
            // Don't create VRM if they are null
            if (meta && humanoid) {
                const vrmCore = new VRMCore({
                    scene: gltf.scene,
                    expressionManager: gltf.userData.vrmExpressionManager,
                    firstPerson: gltf.userData.vrmFirstPerson,
                    humanoid,
                    lookAt: gltf.userData.vrmLookAt,
                    meta,
                });
                gltf.userData.vrmCore = vrmCore;
            }
        });
    }
}

export { VRMCore, VRMCoreLoaderPlugin, VRMExpression, VRMExpressionLoaderPlugin, VRMExpressionManager, VRMExpressionMaterialColorType, VRMExpressionOverrideType, VRMExpressionPresetName, VRMFirstPerson, VRMFirstPersonLoaderPlugin, VRMFirstPersonMeshAnnotationType, VRMHumanBoneList, VRMHumanBoneName, VRMHumanBoneParentMap, VRMHumanoid, VRMHumanoidHelper, VRMHumanoidLoaderPlugin, VRMLookAt, VRMLookAtBoneApplier, VRMLookAtExpressionApplier, VRMLookAtHelper, VRMLookAtLoaderPlugin, VRMLookAtRangeMap, VRMLookAtTypeName, VRMMetaLoaderPlugin, VRMRequiredHumanBoneName };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLWNvcmUubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbi50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUudHMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4LnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25QcmVzZXROYW1lLnRzIiwiLi4vc3JjL3V0aWxzL3NhdHVyYXRlLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYW5hZ2VyLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZC50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlLnRzIiwiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLnRzIiwiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlLnRzIiwiLi4vc3JjL2h1bWFub2lkL2hlbHBlcnMvVlJNSHVtYW5vaWRIZWxwZXIudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lTGlzdC50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVOYW1lLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFuQm9uZVBhcmVudE1hcC50cyIsIi4uL3NyYy91dGlscy9xdWF0SW52ZXJ0Q29tcGF0LnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTVJpZy50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZFJpZy50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZC50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4udHMiLCIuLi9zcmMvbG9va0F0L2hlbHBlcnMvdXRpbHMvRmFuQnVmZmVyR2VvbWV0cnkudHMiLCIuLi9zcmMvbG9va0F0L2hlbHBlcnMvdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LnRzIiwiLi4vc3JjL2xvb2tBdC9oZWxwZXJzL1ZSTUxvb2tBdEhlbHBlci50cyIsIi4uL3NyYy91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlLnRzIiwiLi4vc3JjL2xvb2tBdC91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlLnRzIiwiLi4vc3JjL2xvb2tBdC91dGlscy9zYW5pdGl6ZUFuZ2xlLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXQudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdEJvbmVBcHBsaWVyLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllci50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0UmFuZ2VNYXAudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0VHlwZU5hbWUudHMiLCIuLi9zcmMvdXRpbHMvcmVzb2x2ZVVSTC50cyIsIi4uL3NyYy9tZXRhL1ZSTU1ldGFMb2FkZXJQbHVnaW4udHMiLCIuLi9zcmMvVlJNQ29yZS50cyIsIi4uL3NyYy9WUk1Db3JlTG9hZGVyUGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUnO1xuXG4vLyBhbmltYXRpb25NaXhlciDjga7nm6Poppblr77osaHjga/jgIFTY2VuZSDjga7kuK3jgavlhaXjgaPjgabjgYTjgovlv4XopoHjgYzjgYLjgovjgIJcbi8vIOOBneOBruOBn+OCgeOAgeihqOekuuOCquODluOCuOOCp+OCr+ODiOOBp+OBr+OBquOBhOOBkeOCjOOBqeOAgU9iamVjdDNEIOOCkue2meaJv+OBl+OBpiBTY2VuZSDjgavmipXlhaXjgafjgY3jgovjgojjgYbjgavjgZnjgovjgIJcbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAqIERpc3Rpbmd1aXNoZWQgd2l0aCBgbmFtZWAgc2luY2UgYG5hbWVgIHdpbGwgYmUgY29uZmxpY3RlZCB3aXRoIE9iamVjdDNELlxuICAgKi9cbiAgcHVibGljIGV4cHJlc3Npb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHdlaWdodCBvZiB0aGUgZXhwcmVzc2lvbi5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEludGVycHJldCB2YWx1ZXMgZ3JlYXRlciB0aGFuIDAuNSBhcyAxLjAsIG9ydGhlcndpc2UgMC4wLlxuICAgKi9cbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBibGluayBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZUJsaW5rOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlTG9va0F0OiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVNb3V0aDogVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICdub25lJztcblxuICBwcml2YXRlIF9iaW5kczogVlJNRXhwcmVzc2lvbkJpbmRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGJsaW5rIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZUJsaW5rQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMud2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUJsaW5rID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZUxvb2tBdEFtb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlTG9va0F0ID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy53ZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlTG9va0F0ID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqIGAwLjBgID09IG5vIG92ZXJyaWRlIGF0IGFsbCwgYDEuMGAgPT0gY29tcGxldGVseSBibG9jayB0aGUgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG92ZXJyaWRlTW91dGhBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy53ZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlTW91dGggPT09ICdibGVuZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihleHByZXNzaW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9IGBWUk1FeHByZXNzaW9uXyR7ZXhwcmVzc2lvbk5hbWV9YDtcbiAgICB0aGlzLmV4cHJlc3Npb25OYW1lID0gZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ1ZSTUV4cHJlc3Npb24nO1xuICAgIC8vIOihqOekuuebrueahOOBruOCquODluOCuOOCp+OCr+ODiOOBp+OBr+OBquOBhOOBruOBp+OAgeiyoOiNt+i7vea4m+OBruOBn+OCgeOBqyB2aXNpYmxlIOOCkiBmYWxzZSDjgavjgZfjgabjgYrjgY/jgIJcbiAgICAvLyDjgZPjgozjgavjgojjgorjgIHjgZPjga7jgqTjg7Pjgrnjgr/jg7Pjgrnjgavlr77jgZnjgovmr47jg5Xjg6zjg7zjg6Djga4gbWF0cml4IOiHquWLleioiOeul+OCkuecgeeVpeOBp+OBjeOCi+OAglxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFkZEJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5wdXNoKGJpbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQob3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGEgdmFsdWUgdG8gaXRzIHdlaWdodCB0byBhcHBseS5cbiAgICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBvdmVycmlkaW5nIGFuIGV4cHJlc3Npb24gd2VpZ2h0IGJ5IGFub3RoZXIgZXhwcmVzc2lvbi5cbiAgICAgKiBTZWUgYWxzbzoge0BsaW5rIG92ZXJyaWRlQmxpbmt9LCB7QGxpbmsgb3ZlcnJpZGVMb29rQXR9LCB7QGxpbmsgb3ZlcnJpZGVNb3V0aH1cbiAgICAgKi9cbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyO1xuICB9KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbFdlaWdodCA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPD0gMC41ID8gMC4wIDogMS4wKSA6IHRoaXMud2VpZ2h0O1xuICAgIGFjdHVhbFdlaWdodCAqPSBvcHRpb25zPy5tdWx0aXBsaWVyID8/IDEuMDtcblxuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuYXBwbHlXZWlnaHQoYWN0dWFsV2VpZ2h0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcHJldmlvdXNseSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuY2xlYXJBcHBsaWVkV2VpZ2h0KCkpO1xuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXHJcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xyXG4gICAgcmV0dXJuIHRvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcblxuLyoqXG4gKiBHZXQgYSBtYXRlcmlhbCBkZWZpbml0aW9uIGluZGV4IG9mIGdsVEYgZnJvbSBhc3NvY2lhdGVkIG1hdGVyaWFsLlxuICogSXQncyBiYXNpY2FsbHkgYSBjb21hdCBjb2RlIGJldHdlZW4gVGhyZWUuanMgcjEzMyBvciBhYm92ZSBhbmQgcHJldmlvdXMgdmVyc2lvbnMuXG4gKiBAcGFyYW0gcGFyc2VyIEdMVEZQYXJzZXJcbiAqIEBwYXJhbSBtYXRlcmlhbCBBIG1hdGVyaWFsIG9mIGdsdGZcbiAqIEByZXR1cm5zIE1hdGVyaWFsIGRlZmluaXRpb24gaW5kZXggb2YgZ2xURlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4KHBhcnNlcjogR0xURlBhcnNlciwgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gIGxldCBpbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgaWYgKHRocmVlUmV2aXNpb24gPj0gMTMzKSB7XG4gICAgaW5kZXggPSBwYXJzZXIuYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk/Lm1hdGVyaWFscyA/PyBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIENPTVBBVDogc3RydWN0dXJlIG9mIGBwYXJzZXIuYXNzb2NpYXRpb25zYCBoYXMgYmVlbiBjaGFuZ2VkIEAgcjEzM1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIxNzM3XG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvY29tbWl0LzUyNDY2NzZlNDc5YjYxYTlmZjJkYjcxZGY0MTE5ZjZmMTQ2MjU4MGRcbiAgICB0eXBlIEdMVEZSZWZlcmVuY2VQcmUxMzMgPSB7XG4gICAgICB0eXBlOiAnbWF0ZXJpYWxzJyB8ICdub2RlcycgfCAndGV4dHVyZXMnIHwgJ21lc2hlcyc7XG4gICAgICBpbmRleDogbnVtYmVyO1xuICAgIH07XG5cbiAgICB0eXBlIEdMVEZBc3NvY2lhdGlvbnNQcmUxMzMgPSBNYXA8VEhSRUUuT2JqZWN0M0QgfCBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLlRleHR1cmUsIEdMVEZSZWZlcmVuY2VQcmUxMzM+O1xuXG4gICAgY29uc3QgYXNzb2NpYXRpb25zID0gcGFyc2VyLmFzc29jaWF0aW9ucyBhcyBHTFRGQXNzb2NpYXRpb25zUHJlMTMzO1xuXG4gICAgY29uc3QgcmVmZXJlbmNlID0gYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk7XG5cbiAgICBpZiAocmVmZXJlbmNlPy50eXBlID09PSAnbWF0ZXJpYWxzJykge1xuICAgICAgaW5kZXggPSByZWZlcmVuY2UuaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHtcbiAgQWE6ICdhYScsXG4gIEloOiAnaWgnLFxuICBPdTogJ291JyxcbiAgRWU6ICdlZScsXG4gIE9oOiAnb2gnLFxuICBCbGluazogJ2JsaW5rJyxcbiAgSGFwcHk6ICdoYXBweScsXG4gIEFuZ3J5OiAnYW5ncnknLFxuICBTYWQ6ICdzYWQnLFxuICBSZWxheGVkOiAncmVsYXhlZCcsXG4gIExvb2tVcDogJ2xvb2tVcCcsXG4gIFN1cnByaXNlZDogJ3N1cnByaXNlZCcsXG4gIExvb2tEb3duOiAnbG9va0Rvd24nLFxuICBMb29rTGVmdDogJ2xvb2tMZWZ0JyxcbiAgTG9va1JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgQmxpbmtMZWZ0OiAnYmxpbmtMZWZ0JyxcbiAgQmxpbmtSaWdodDogJ2JsaW5rUmlnaHQnLFxuICBOZXV0cmFsOiAnbmV1dHJhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZVtrZXlvZiB0eXBlb2YgVlJNRXhwcmVzc2lvblByZXNldE5hbWVdO1xuIiwiLyoqXG4gKiBDbGFtcCB0aGUgaW5wdXQgdmFsdWUgd2l0aGluIFswLjAgLSAxLjBdLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdHVyYXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEuMCksIDAuMCk7XG59XG4iLCJpbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rfS5cbiAgICovXG4gIHB1YmxpYyBibGlua0V4cHJlc3Npb25OYW1lcyA9IFsnYmxpbmsnLCAnYmxpbmtMZWZ0JywgJ2JsaW5rUmlnaHQnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0RXhwcmVzc2lvbk5hbWVzID0gWydsb29rTGVmdCcsICdsb29rUmlnaHQnLCAnbG9va1VwJywgJ2xvb2tEb3duJ107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aH0uXG4gICAqL1xuICBwdWJsaWMgbW91dGhFeHByZXNzaW9uTmFtZXMgPSBbJ2FhJywgJ2VlJywgJ2loJywgJ29oJywgJ291J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHtAbGluayBWUk1FeHByZXNzaW9ufS5cbiAgICogV2hlbiB5b3Ugd2FudCB0byByZWdpc3RlciBleHByZXNzaW9ucywgdXNlIHtAbGluayByZWdpc3RlckV4cHJlc3Npb259XG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uczogVlJNRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogVlJNRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcbiAgcHVibGljIGdldCBleHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2V4cHJlc3Npb25NYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIGN1c3RvbSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJlc2V0RXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZSBhcyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBwcmVzZXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1c3RvbUV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRXhwcmVzc2lvbk1hbmFnZXIpOiB0aGlzIHtcbiAgICAvLyBmaXJzdCB1bnJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBpdCBoYXNcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICAgIGV4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIHJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBvZiB0aGUgc291cmNlXG4gICAgc291cmNlLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgcmVtYWluaW5nIG1lbWJlcnNcbiAgICB0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVnaXN0ZXJlZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCBhbiBleHByZXNzaW9uLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvciBwcmVzZXQgbmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb24obmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBWUk1FeHByZXNzaW9uIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25NYXBbbmFtZV0gPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gdGhhdCBkZXNjcmliZXMgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLnB1c2goZXhwcmVzc2lvbik7XG4gICAgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB5b3Ugd2FudCB0byB1bnJlZ2lzdGVyXG4gICAqL1xuICBwdWJsaWMgdW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXhwcmVzc2lvbnMuaW5kZXhPZihleHByZXNzaW9uKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25NYW5hZ2VyOiBUaGUgc3BlY2lmaWVkIGV4cHJlc3Npb25zIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgZG9lc24ndCBoYXZlIGFuIGV4cHJlc3Npb24gb2YgZ2l2ZW4gbmFtZSwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgZXhwcmVzc2lvbiB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhbiBleHByZXNzaW9uIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXIuZ2V0RXhwcmVzc2lvblRyYWNrTmFtZSggJ2JsaW5rJyApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvblRyYWNrTmFtZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24gPyBgJHtleHByZXNzaW9uLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBvdmVycmlkZSBjZXJ0YWluIGV4cHJlc3Npb25zXG4gICAgY29uc3Qgd2VpZ2h0TXVsdGlwbGllcnMgPSB0aGlzLl9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpO1xuXG4gICAgLy8gcmVzZXQgZXhwcmVzc2lvbiBiaW5kcyBmaXJzdFxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24uY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIGFwcGx5IGJpbmRzXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IG11bHRpcGxpZXIgPSAxLjA7XG4gICAgICBjb25zdCBuYW1lID0gZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZTtcblxuICAgICAgaWYgKHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5ibGluaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubG9va0F0O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLm1vdXRoO1xuICAgICAgfVxuXG4gICAgICBleHByZXNzaW9uLmFwcGx5V2VpZ2h0KHsgbXVsdGlwbGllciB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3VtIG9mIG92ZXJyaWRlIGFtb3VudHMgdG8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBtdWx0aXBseSB3ZWlnaHRzIG9mIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpOiB7XG4gICAgYmxpbms6IG51bWJlcjtcbiAgICBsb29rQXQ6IG51bWJlcjtcbiAgICBtb3V0aDogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgYmxpbmsgPSAxLjA7XG4gICAgbGV0IGxvb2tBdCA9IDEuMDtcbiAgICBsZXQgbW91dGggPSAxLjA7XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBibGluayAtPSBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmtBbW91bnQ7XG4gICAgICBsb29rQXQgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdEFtb3VudDtcbiAgICAgIG1vdXRoIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aEFtb3VudDtcbiAgICB9KTtcblxuICAgIGJsaW5rID0gTWF0aC5tYXgoMC4wLCBibGluayk7XG4gICAgbG9va0F0ID0gTWF0aC5tYXgoMC4wLCBsb29rQXQpO1xuICAgIG1vdXRoID0gTWF0aC5tYXgoMC4wLCBtb3V0aCk7XG5cbiAgICByZXR1cm4geyBibGluaywgbG9va0F0LCBtb3V0aCB9O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSA9IHtcbiAgQ29sb3I6ICdjb2xvcicsXG4gIEVtaXNzaW9uQ29sb3I6ICdlbWlzc2lvbkNvbG9yJyxcbiAgU2hhZGVDb2xvcjogJ3NoYWRlQ29sb3InLFxuICBNYXRjYXBDb2xvcjogJ21hdGNhcENvbG9yJyxcbiAgUmltQ29sb3I6ICdyaW1Db2xvcicsXG4gIE91dGxpbmVDb2xvcjogJ291dGxpbmVDb2xvcicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgPSB0eXBlb2YgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdO1xuXG5leHBvcnQgY29uc3QgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcDogeyBba2V5OiBzdHJpbmddOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfCB1bmRlZmluZWQgfSA9IHtcbiAgX0NvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuQ29sb3IsXG4gIF9FbWlzc2lvbkNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuRW1pc3Npb25Db2xvcixcbiAgX1NoYWRlQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5TaGFkZUNvbG9yLFxuICBfUmltQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5SaW1Db2xvcixcbiAgX091dGxpbmVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLk91dGxpbmVDb2xvcixcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlJztcblxuY29uc3QgX2NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byBhIG1hdGVyaWFsIGNvbG9yLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICAvKipcbiAgICogTWFwcGluZyBvZiBwcm9wZXJ0eSBuYW1lcyBmcm9tIFZSTUMvbWF0ZXJpYWxDb2xvckJpbmRzLnR5cGUgdG8gdGhyZWUuanMvTWF0ZXJpYWwuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lTWFwTWFwOiB7XG4gICAgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHsgW3R5cGUgaW4gVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXT86IHN0cmluZyB9O1xuICB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiAnY29sb3InLFxuICAgICAgZW1pc3Npb25Db2xvcjogJ2VtaXNzaXZlJyxcbiAgICB9LFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiAnY29sb3InLFxuICAgIH0sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogJ2NvbG9yJyxcbiAgICAgIGVtaXNzaW9uQ29sb3I6ICdlbWlzc2l2ZScsXG4gICAgICBvdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3JGYWN0b3InLFxuICAgICAgbWF0Y2FwQ29sb3I6ICdtYXRjYXBGYWN0b3InLFxuICAgICAgcmltQ29sb3I6ICdwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLFxuICAgICAgc2hhZGVDb2xvcjogJ3NoYWRlQ29sb3JGYWN0b3InLFxuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdGFyZ2V0IHByb3BlcnR5IG9mIHRoZSBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGU7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuXG4gIC8qKlxuICAgKiBJdHMgc3RhdGUuXG4gICAqIElmIGl0IGNhbm5vdCBmaW5kIHRoZSB0YXJnZXQgcHJvcGVydHkgaW4gY29uc3RydWN0b3IsIGl0IHdpbGwgYmUgbnVsbCBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhdGU6IHtcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgICBpbml0aWFsVmFsdWU6IFRIUkVFLkNvbG9yO1xuICAgIGRlbHRhVmFsdWU6IFRIUkVFLkNvbG9yO1xuICB9IHwgbnVsbDtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHR5cGUsXG4gICAgdGFyZ2V0VmFsdWUsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSB0YXJnZXQgcHJvcGVydHkgb2YgdGhlIG1hdGVyaWFsLlxuICAgICAqL1xuICAgIHR5cGU6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAgICovXG4gICAgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy50YXJnZXRWYWx1ZSA9IHRhcmdldFZhbHVlO1xuXG4gICAgLy8gaW5pdCBwcm9wZXJ0eSBuYW1lXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kLl9wcm9wZXJ0eU5hbWVNYXBNYXApLmZpbmQoXG4gICAgICAoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAobWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKT8uWzFdO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdID8/IG51bGw7XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIG1hdGVyaWFsIGNvbG9yIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9LCB0aGUgdHlwZSAke3R5cGV9IGJ1dCB0aGUgbWF0ZXJpYWwgb3IgdGhlIHR5cGUgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuXG4gICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB0YXJnZXQuY2xvbmUoKTtcblxuICAgICAgLy8g6LKg44Gu5YCk44KS5L+d5oyB44GZ44KL44Gf44KB44GrQ29sb3Iuc3Vi44KS5L2/44KP44Ga44Gr5beu5YiG44KS6KiI566X44GZ44KLXG4gICAgICBjb25zdCBkZWx0YVZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKFxuICAgICAgICB0YXJnZXRWYWx1ZS5yIC0gaW5pdGlhbFZhbHVlLnIsXG4gICAgICAgIHRhcmdldFZhbHVlLmcgLSBpbml0aWFsVmFsdWUuZyxcbiAgICAgICAgdGFyZ2V0VmFsdWUuYiAtIGluaXRpYWxWYWx1ZS5iLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSB7XG4gICAgICAgIHByb3BlcnR5TmFtZSxcbiAgICAgICAgaW5pdGlhbFZhbHVlLFxuICAgICAgICBkZWx0YVZhbHVlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gbnVsbCkge1xuICAgICAgLy8gd2FybmluZyBpcyBhbHJlYWR5IGVtaXR0ZWQgaW4gY29uc3RydWN0b3JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgZGVsdGFWYWx1ZSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgdGFyZ2V0LmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcblxuICAgIGlmICh0eXBlb2YgKHRoaXMubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID09PSAnYm9vbGVhbicpIHtcbiAgICAgICh0aGlzLm1hdGVyaWFsIGFzIGFueSkuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gbnVsbCkge1xuICAgICAgLy8gd2FybmluZyBpcyBhbHJlYWR5IGVtaXR0ZWQgaW4gY29uc3RydWN0b3JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlIH0gPSB0aGlzLl9zdGF0ZTtcblxuICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICB0YXJnZXQuY29weShpbml0aWFsVmFsdWUpO1xuXG4gICAgaWYgKHR5cGVvZiAodGhpcy5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgKHRoaXMubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG4vKipcbiAqIEEgYmluZCBvZiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gaW5mbHVlbmNlcyB0byBtb3JwaCB0YXJnZXRzLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgLyoqXG4gICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgdmFsdWUgb2YgdGFyZ2V0IG1vcnBoIHRhcmdldC4gUmFuZ2luZyBpbiBbMC4wIC0gMS4wXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB3ZWlnaHQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIHByaW1pdGl2ZXMsXG4gICAgaW5kZXgsXG4gICAgd2VpZ2h0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIG1lc2ggcHJpbWl0aXZlcyB0aGF0IGF0dGFjaGVkIHRvIHRhcmdldCBtZXNoLlxuICAgICAqL1xuICAgIHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgICAqL1xuICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAgICovXG4gICAgd2VpZ2h0OiBudW1iZXI7XG4gIH0pIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucHJpbWl0aXZlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICBpZiAobWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXM/Llt0aGlzLmluZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW3RoaXMuaW5kZXhdICs9IHRoaXMud2VpZ2h0ICogd2VpZ2h0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSA9IDAuMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4vKipcbiAqIEEgYmluZCBvZiBleHByZXNzaW9uIGluZmx1ZW5jZXMgdG8gdGV4dHVyZSB0cmFuc2Zvcm1zLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lc01hcDogeyBbZGlzdGluZ3Vpc2hlcjogc3RyaW5nXTogc3RyaW5nW10gfSA9IHtcbiAgICBpc01lc2hTdGFuZGFyZE1hdGVyaWFsOiBbXG4gICAgICAnbWFwJyxcbiAgICAgICdlbWlzc2l2ZU1hcCcsXG4gICAgICAnYnVtcE1hcCcsXG4gICAgICAnbm9ybWFsTWFwJyxcbiAgICAgICdkaXNwbGFjZW1lbnRNYXAnLFxuICAgICAgJ3JvdWdobmVzc01hcCcsXG4gICAgICAnbWV0YWxuZXNzTWFwJyxcbiAgICAgICdhbHBoYU1hcCcsXG4gICAgXSxcbiAgICBpc01lc2hCYXNpY01hdGVyaWFsOiBbJ21hcCcsICdzcGVjdWxhck1hcCcsICdhbHBoYU1hcCddLFxuICAgIGlzTVRvb25NYXRlcmlhbDogW1xuICAgICAgJ21hcCcsXG4gICAgICAnbm9ybWFsTWFwJyxcbiAgICAgICdlbWlzc2l2ZU1hcCcsXG4gICAgICAnc2hhZGVNdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ3JpbU11bHRpcGx5VGV4dHVyZScsXG4gICAgICAnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJyxcbiAgICBdLFxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhlIHV2IHNjYWxlIG9mIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gIC8qKlxuICAgKiBUaGUgdXYgb2Zmc2V0IG9mIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG9mZnNldDogVEhSRUUuVmVjdG9yMjtcblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgdGV4dHVyZSBuYW1lcyBhbmQgaXRzIHN0YXRlIHRoYXQgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIGJ5IHRoaXMgYmluZC5cbiAgICovXG4gIHByaXZhdGUgX3Byb3BlcnRpZXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdGlhbE9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgICBpbml0aWFsU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG4gICAgZGVsdGFPZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gICAgZGVsdGFTY2FsZTogVEhSRUUuVmVjdG9yMjtcbiAgfVtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWF0ZXJpYWwsXG4gICAgc2NhbGUsXG4gICAgb2Zmc2V0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXYgc2NhbGUgb2YgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgc2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXYgb2Zmc2V0IG9mIHRoZSB0ZXh0dXJlLlxuICAgICAqL1xuICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgfSkge1xuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kLl9wcm9wZXJ0eU5hbWVzTWFwKS5maW5kKFxuICAgICAgKFtkaXN0aW5ndWlzaGVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gKG1hdGVyaWFsIGFzIGFueSlbZGlzdGluZ3Vpc2hlcl0gPT09IHRydWU7XG4gICAgICB9LFxuICAgICk/LlsxXTtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWVzID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIHRleHR1cmUgdHJhbnNmb3JtIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9IGJ1dCB0aGUgbWF0ZXJpYWwgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XG5cbiAgICAgIHByb3BlcnR5TmFtZXMuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSAoKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5UZXh0dXJlIHwgdW5kZWZpbmVkKT8uY2xvbmUoKTtcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdID0gdGV4dHVyZTsgLy8gYmVjYXVzZSB0aGUgdGV4dHVyZSBpcyBjbG9uZWRcblxuICAgICAgICBjb25zdCBpbml0aWFsT2Zmc2V0ID0gdGV4dHVyZS5vZmZzZXQuY2xvbmUoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbFNjYWxlID0gdGV4dHVyZS5yZXBlYXQuY2xvbmUoKTtcbiAgICAgICAgY29uc3QgZGVsdGFPZmZzZXQgPSBvZmZzZXQuY2xvbmUoKS5zdWIoaW5pdGlhbE9mZnNldCk7XG4gICAgICAgIGNvbnN0IGRlbHRhU2NhbGUgPSBzY2FsZS5jbG9uZSgpLnN1Yihpbml0aWFsU2NhbGUpO1xuXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgICAgIGluaXRpYWxPZmZzZXQsXG4gICAgICAgICAgZGVsdGFPZmZzZXQsXG4gICAgICAgICAgaW5pdGlhbFNjYWxlLFxuICAgICAgICAgIGRlbHRhU2NhbGUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eS5uYW1lXSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgdGFyZ2V0Lm9mZnNldC5hZGQoX3YyLmNvcHkocHJvcGVydHkuZGVsdGFPZmZzZXQpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgICAgdGFyZ2V0LnJlcGVhdC5hZGQoX3YyLmNvcHkocHJvcGVydHkuZGVsdGFTY2FsZSkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG5cbiAgICAgIHRhcmdldC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHkubmFtZV0gYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIHRhcmdldC5vZmZzZXQuY29weShwcm9wZXJ0eS5pbml0aWFsT2Zmc2V0KTtcbiAgICAgIHRhcmdldC5yZXBlYXQuY29weShwcm9wZXJ0eS5pbml0aWFsU2NhbGUpO1xuXG4gICAgICB0YXJnZXQubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IGdsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCB9IGZyb20gJy4uL3V0aWxzL2dsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2MHYxUHJlc2V0TmFtZU1hcDogeyBbdjBOYW1lIGluIFYwVlJNLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gPSB7XG4gICAgYTogJ2FhJyxcbiAgICBlOiAnZWUnLFxuICAgIGk6ICdpaCcsXG4gICAgbzogJ29oJyxcbiAgICB1OiAnb3UnLFxuICAgIGJsaW5rOiAnYmxpbmsnLFxuICAgIGpveTogJ2hhcHB5JyxcbiAgICBhbmdyeTogJ2FuZ3J5JyxcbiAgICBzb3Jyb3c6ICdzYWQnLFxuICAgIGZ1bjogJ3JlbGF4ZWQnLFxuICAgIGxvb2t1cDogJ2xvb2tVcCcsXG4gICAgbG9va2Rvd246ICdsb29rRG93bicsXG4gICAgbG9va2xlZnQ6ICdsb29rTGVmdCcsXG4gICAgbG9va3JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfbDogJ2JsaW5rTGVmdCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX3I6ICdibGlua1JpZ2h0JyxcbiAgICBuZXV0cmFsOiAnbmV1dHJhbCcsXG4gIH07XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRXhwcmVzc2lvbnMgPSBleHRlbnNpb24uZXhwcmVzc2lvbnM7XG4gICAgaWYgKCFzY2hlbWFFeHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBleHByZXNzaW9uc1xuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuICAgIGNvbnN0IG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwID0gbmV3IE1hcDxzdHJpbmcsIFYxVlJNU2NoZW1hLkV4cHJlc3Npb24+KCk7XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0ICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gdHlwZXNjcmlwdFxuXG4gICAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gcHJlc2V0IG5hbWUgXCIke25hbWV9XCIgZGV0ZWN0ZWQuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20pLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQ3VzdG9tIGV4cHJlc3Npb24gY2Fubm90IGhhdmUgcHJlc2V0IG5hbWUgXCIke25hbWV9XCIuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmUgbWFuYWdlclxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIC8vIGxvYWQgZXhwcmVzc2lvbnNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFFeHByZXNzaW9uLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA/PyAnbm9uZSc7XG5cbiAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tb3JwaFRhcmdldEJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZiwgYmluZC5ub2RlKSkhO1xuICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hRXhwcmVzc2lvbi5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCBtb3JwaCAjJHttb3JwaFRhcmdldEluZGV4fSBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgaW5kZXg6IG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgPz8gMS4wLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzIHx8IHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzKSB7XG4gICAgICAgICAgLy8gbGlzdCB1cCBldmVyeSBtYXRlcmlhbCBpbiBgZ2x0Zi5zY2VuZWBcbiAgICAgICAgICBjb25zdCBnbHRmTWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCkge1xuICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tYXRlcmlhbENvbG9yQmluZHM/LmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFscyA9IGdsdGZNYXRlcmlhbHMuZmlsdGVyKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4KHRoaXMucGFyc2VyLCBtYXRlcmlhbCk7XG4gICAgICAgICAgICAgIHJldHVybiBiaW5kLm1hdGVyaWFsID09PSBtYXRlcmlhbEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCh7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGJpbmQudHlwZSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkoYmluZC50YXJnZXRWYWx1ZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IGdsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCh0aGlzLnBhcnNlciwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQub2Zmc2V0ID8/IFswLjAsIDAuMF0pLFxuICAgICAgICAgICAgICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQuc2NhbGUgPz8gWzEuMCwgMS4wXSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZSA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpO1xuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZUdyb3VwcyA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBtYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVOYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHNjaGVtYUJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCB2MFByZXNldE5hbWUgPSBzY2hlbWFHcm91cC5wcmVzZXROYW1lO1xuICAgICAgICBjb25zdCB2MVByZXNldE5hbWUgPVxuICAgICAgICAgICh2MFByZXNldE5hbWUgIT0gbnVsbCAmJiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnYwdjFQcmVzZXROYW1lTWFwW3YwUHJlc2V0TmFtZV0pIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB2MVByZXNldE5hbWUgPz8gc2NoZW1hR3JvdXAubmFtZTtcblxuICAgICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBPbmUgb2YgY3VzdG9tIGV4cHJlc3Npb25zIGhhcyBubyBuYW1lLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGR1cGxpY2F0aW9uIGNoZWNrXG4gICAgICAgIGlmIChibGVuZFNoYXBlTmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQW4gZXhwcmVzc2lvbiBwcmVzZXQgJHt2MFByZXNldE5hbWV9IGhhcyBkdXBsaWNhdGVkIGVudHJpZXMuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsZW5kU2hhcGVOYW1lU2V0LmFkZChuYW1lKTtcblxuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFHcm91cC5pc0JpbmFyeSA/PyBmYWxzZTtcbiAgICAgICAgLy8gdjAgZG9lc24ndCBoYXZlIGlnbm9yZSBwcm9wZXJ0aWVzXG5cbiAgICAgICAgLy8gQmluZCBtb3JwaFRhcmdldFxuICAgICAgICBpZiAoc2NoZW1hR3JvdXAuYmluZHMpIHtcbiAgICAgICAgICBzY2hlbWFHcm91cC5iaW5kcy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZC5tZXNoID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm9kZXNVc2luZ01lc2g6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBqc29uLm5vZGVzPy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLm1lc2ggPT09IGJpbmQubWVzaCkge1xuICAgICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLnB1c2goaSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiDjgqLjg5Djgr/jg7zjga7jgqrjg5bjgrjjgqfjgq/jg4jjgavoqK3lrprjgZXjgozjgabjgYTjgovjg57jg4bjg6rjgqLjg6vjga7lhoXjgYvjgolcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWXjgafmjIflrprjgZXjgozjgabjgYTjgovjg57jg4bjg6rjgqLjg6vjgpLpm4bjgoHjgovjgIJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiDnibnlrprjgavjga/lkI3liY3jgpLkvb/nlKjjgZnjgovjgIJcbiAgICAgICAgICAgICAqIOOCouOCpuODiOODqeOCpOODs+aPj+eUu+eUqOOBruODnuODhuODquOCouODq+OCguWQjOaZguOBq+mbhuOCgeOCi+OAglxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kKHtcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gTWF0ZXJpYWxDb2xvckJpbmRcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxDb2xvclR5cGUgPSB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwW21hdGVyaWFsUHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBtYXRlcmlhbENvbG9yVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG5ldyBUSFJFRS5Db2xvciguLi5tYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIS5zbGljZSgwLCAzKSksXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgQmxvY2s6ICdibG9jaycsXG4gIEJsZW5kOiAnYmxlbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9IHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlXTtcbiIsImltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRGaXJzdFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUiA9IDk7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0VGhpcmRQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHB1YmxpYyBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXTtcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUjtcbiAgcHJpdmF0ZSBfdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVI7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRMYXllcnMgPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUZpcnN0UGVyc29uIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gbWVzaEFubm90YXRpb25zIEEgcmVuZGVyZXIgc2V0dGluZ3MuIFNlZSB0aGUgZGVzY3JpcHRpb24gb2YgW1tSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NdXSBmb3IgbW9yZSBpbmZvXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucyA9IG1lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1GaXJzdFBlcnNvbik6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNRmlyc3RQZXJzb246IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBzb3VyY2UubWVzaEFubm90YXRpb25zLm1hcCgoYW5ub3RhdGlvbikgPT4gKHtcbiAgICAgIG1lc2hlczogYW5ub3RhdGlvbi5tZXNoZXMuY29uY2F0KCksXG4gICAgICB0eXBlOiBhbm5vdGF0aW9uLnR5cGUsXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUZpcnN0UGVyc29ufS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1GaXJzdFBlcnNvbn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1GaXJzdFBlcnNvbiB7XG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbih0aGlzLmh1bWFub2lkLCB0aGlzLm1lc2hBbm5vdGF0aW9ucykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwge0BsaW5rIHNldHVwfSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyB7QGxpbmsgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSfSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEge0BsaW5rIHNldHVwfSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgdGhpcmRQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW4gdGhpcyBtZXRob2QsIGl0IGFzc2lnbnMgbGF5ZXJzIGZvciBldmVyeSBtZXNoZXMgYmFzZWQgb24gbWVzaCBhbm5vdGF0aW9ucy5cbiAgICogWW91IG11c3QgY2FsbCB0aGlzIG1ldGhvZCBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZS5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIFtWUk1GaXJzdFBlcnNvbi5TZXR1cF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzczYTViZDhmY2RkYWEyYTdhODczNTA5OWE5N2U2M2M5ZGIzZTVlYTAvQXNzZXRzL1ZSTS9SdW50aW1lL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzI0wyOTUtTDI5OSkgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIsXG4gICAgdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIsXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZExheWVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdmaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3RoaXJkUGVyc29uT25seScpIHtcbiAgICAgICAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICAgIG1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnYXV0bycpIHtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsKG1lc2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2luaXRpYWxpemVkTGF5ZXJzID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnk7XG5cbiAgICBjb25zdCBza2luSW5kZXhBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKS5hcnJheTtcbiAgICBjb25zdCBza2luSW5kZXggPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5JbmRleC5wdXNoKFtza2luSW5kZXhBdHRyW2ldLCBza2luSW5kZXhBdHRyW2kgKyAxXSwgc2tpbkluZGV4QXR0cltpICsgMl0sIHNraW5JbmRleEF0dHJbaSArIDNdXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKS5hcnJheTtcbiAgICBjb25zdCBza2luV2VpZ2h0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luV2VpZ2h0QXR0ci5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbldlaWdodC5wdXNoKFtza2luV2VpZ2h0QXR0cltpXSwgc2tpbldlaWdodEF0dHJbaSArIDFdLCBza2luV2VpZ2h0QXR0cltpICsgMl0sIHNraW5XZWlnaHRBdHRyW2kgKyAzXV0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kZXgoKTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VvbWV0cnkgZG9lc24ndCBoYXZlIGFuIGluZGV4IGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVHJpYW5nbGVzID0gQXJyYXkuZnJvbShpbmRleC5hcnJheSk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2V4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50OiBUSFJFRS5PYmplY3QzRCwgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBlcmFzZUJvbmVJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIG1lc2guc2tlbGV0b24uYm9uZXMuZm9yRWFjaCgoYm9uZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUpKSBlcmFzZUJvbmVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gVW5saWtlIFVuaVZSTSB3ZSBkb24ndCBjb3B5IG1lc2ggaWYgbm8gaW52aXNpYmxlIGJvbmUgd2FzIGZvdW5kXG4gICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgY29uc3QgbmV3TWVzaCA9IHRoaXMuX2NyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWwobm9kZTogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAnR3JvdXAnKSB7XG4gICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBwYXJlbnQubmFtZSA9IGBfaGVhZGxlc3NfJHtub2RlLm5hbWV9YDtcbiAgICAgICAgcGFyZW50LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnBhcmVudCEuYWRkKHBhcmVudCk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudHlwZSA9PT0gJ1NraW5uZWRNZXNoJylcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gY2hpbGQgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50LCBza2lubmVkTWVzaCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gbm9kZSBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChub2RlLnBhcmVudCEsIHNraW5uZWRNZXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0VyYXNlVGFyZ2V0KGJvbmU6IFRIUkVFLk9iamVjdDNEKTogYm9vbGVhbiB7XG4gICAgaWYgKGJvbmUgPT09IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IGV4dGVuc2lvbi5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuICAgIEFycmF5LmZyb20obm9kZVByaW1pdGl2ZXNNYXAuZW50cmllcygpKS5mb3JFYWNoKChbbm9kZUluZGV4LCBwcmltaXRpdmVzXSkgPT4ge1xuICAgICAgY29uc3QgYW5ub3RhdGlvbiA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm5vZGUgPT09IG5vZGVJbmRleClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiBhbm5vdGF0aW9uPy50eXBlID8/ICdib3RoJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFYwVlJNLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG5cbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICBjb25zdCBmbGFnID0gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zXG4gICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoKGEpID0+IGEubWVzaCA9PT0gc2NoZW1hTm9kZS5tZXNoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2goe1xuICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgIHR5cGU6IHRoaXMuX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnPy5maXJzdFBlcnNvbkZsYWcpLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKGh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydFYwRmxhZ1RvVjFUeXBlKGZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIHtcbiAgICBpZiAoZmxhZyA9PT0gJ0ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgIHJldHVybiAnZmlyc3RQZXJzb25Pbmx5JztcbiAgICB9IGVsc2UgaWYgKGZsYWcgPT09ICdUaGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ3RoaXJkUGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnQXV0bycpIHtcbiAgICAgIHJldHVybiAnYXV0byc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnYm90aCc7XG4gICAgfVxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID0ge1xuICBBdXRvOiAnYXV0bycsXG4gIEJvdGg6ICdib3RoJyxcbiAgVGhpcmRQZXJzb25Pbmx5OiAndGhpcmRQZXJzb25Pbmx5JyxcbiAgRmlyc3RQZXJzb25Pbmx5OiAnZmlyc3RQZXJzb25Pbmx5Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID0gdHlwZW9mIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlW2tleW9mIHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZV07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9WUk1IdW1hbm9pZCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1IdW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHByaXZhdGUgX2JvbmVBeGVzTWFwOiBNYXA8VlJNSHVtYW5Cb25lLCBUSFJFRS5BeGVzSGVscGVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtSHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMuX2JvbmVBeGVzTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgT2JqZWN0LnZhbHVlcyhodW1hbm9pZC5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxLjApO1xuXG4gICAgICBoZWxwZXIubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAgIChoZWxwZXIubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoV3JpdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hZGQoaGVscGVyKTtcblxuICAgICAgLy8gVE9ETzogdHlwZSBhc3NlcnRpb24gaXMgbm90IG5lZWRlZCBpbiBsYXRlciB2ZXJzaW9ucyBvZiBUeXBlU2NyaXB0XG4gICAgICB0aGlzLl9ib25lQXhlc01hcC5zZXQoYm9uZSEsIGhlbHBlcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLnZhbHVlcygpKS5mb3JFYWNoKChheGVzKSA9PiB7XG4gICAgICBheGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIChheGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW2JvbmUsIGF4ZXNdKSA9PiB7XG4gICAgICBib25lLm5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBib25lLm5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIF9xdWF0QSwgX3YzQik7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gX3YzQS5zZXQoMC4xLCAwLjEsIDAuMSkuZGl2aWRlKF92M0IpO1xuICAgICAgYXhlcy5tYXRyaXguY29weShib25lLm5vZGUubWF0cml4V29ybGQpLnNjYWxlKHNjYWxlKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS4gRGVwZW5kZW5jeSBhd2FyZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZUxpc3Q6IFZSTUh1bWFuQm9uZU5hbWVbXSA9IFtcbiAgJ2hpcHMnLFxuICAnc3BpbmUnLFxuICAnY2hlc3QnLFxuICAndXBwZXJDaGVzdCcsXG4gICduZWNrJyxcblxuICAnaGVhZCcsXG4gICdsZWZ0RXllJyxcbiAgJ3JpZ2h0RXllJyxcbiAgJ2phdycsXG5cbiAgJ2xlZnRVcHBlckxlZycsXG4gICdsZWZ0TG93ZXJMZWcnLFxuICAnbGVmdEZvb3QnLFxuICAnbGVmdFRvZXMnLFxuXG4gICdyaWdodFVwcGVyTGVnJyxcbiAgJ3JpZ2h0TG93ZXJMZWcnLFxuICAncmlnaHRGb290JyxcbiAgJ3JpZ2h0VG9lcycsXG5cbiAgJ2xlZnRTaG91bGRlcicsXG4gICdsZWZ0VXBwZXJBcm0nLFxuICAnbGVmdExvd2VyQXJtJyxcbiAgJ2xlZnRIYW5kJyxcblxuICAncmlnaHRTaG91bGRlcicsXG4gICdyaWdodFVwcGVyQXJtJyxcbiAgJ3JpZ2h0TG93ZXJBcm0nLFxuICAncmlnaHRIYW5kJyxcblxuICAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gICdsZWZ0VGh1bWJEaXN0YWwnLFxuICAnbGVmdEluZGV4UHJveGltYWwnLFxuICAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRJbmRleERpc3RhbCcsXG4gICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gICdsZWZ0TWlkZGxlRGlzdGFsJyxcbiAgJ2xlZnRSaW5nUHJveGltYWwnLFxuICAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICAnbGVmdFJpbmdEaXN0YWwnLFxuICAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gICdyaWdodFRodW1iRGlzdGFsJyxcbiAgJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gICdyaWdodE1pZGRsZURpc3RhbCcsXG4gICdyaWdodFJpbmdQcm94aW1hbCcsXG4gICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRSaW5nRGlzdGFsJyxcbiAgJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRMaXR0bGVEaXN0YWwnLFxuXTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFRoZSBuYW1lcyBvZiB7QGxpbmsgVlJNSHVtYW5vaWR9IGJvbmUgbmFtZXMuXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIENoZXN0OiAnY2hlc3QnLFxuICBVcHBlckNoZXN0OiAndXBwZXJDaGVzdCcsXG4gIE5lY2s6ICduZWNrJyxcblxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRFeWU6ICdsZWZ0RXllJyxcbiAgUmlnaHRFeWU6ICdyaWdodEV5ZScsXG4gIEphdzogJ2phdycsXG5cbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIExlZnRUb2VzOiAnbGVmdFRvZXMnLFxuXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBSaWdodFRvZXM6ICdyaWdodFRvZXMnLFxuXG4gIExlZnRTaG91bGRlcjogJ2xlZnRTaG91bGRlcicsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuXG4gIFJpZ2h0U2hvdWxkZXI6ICdyaWdodFNob3VsZGVyJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG5cbiAgTGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBMZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgTGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iRGlzdGFsJyxcbiAgTGVmdEluZGV4UHJveGltYWw6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIExlZnRJbmRleEludGVybWVkaWF0ZTogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIExlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleERpc3RhbCcsXG4gIExlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIExlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdE1pZGRsZURpc3RhbDogJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICBMZWZ0UmluZ1Byb3hpbWFsOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIExlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBMZWZ0UmluZ0Rpc3RhbDogJ2xlZnRSaW5nRGlzdGFsJyxcbiAgTGVmdExpdHRsZVByb3hpbWFsOiAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgTGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgUmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIFJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIFJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgUmlnaHRJbmRleFByb3hpbWFsOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgUmlnaHRJbmRleEludGVybWVkaWF0ZTogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBSaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleERpc3RhbCcsXG4gIFJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIFJpZ2h0TWlkZGxlRGlzdGFsOiAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICBSaWdodFJpbmdQcm94aW1hbDogJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRSaW5nRGlzdGFsOiAncmlnaHRSaW5nRGlzdGFsJyxcbiAgUmlnaHRMaXR0bGVQcm94aW1hbDogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICBSaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZURpc3RhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1IdW1hbkJvbmVOYW1lID0gdHlwZW9mIFZSTUh1bWFuQm9uZU5hbWVba2V5b2YgdHlwZW9mIFZSTUh1bWFuQm9uZU5hbWVdO1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IG1hcHMgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gaXRzIHBhcmVudCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZVBhcmVudE1hcDogeyBbYm9uZSBpbiBWUk1IdW1hbkJvbmVOYW1lXTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgfSA9IHtcbiAgaGlwczogbnVsbCxcbiAgc3BpbmU6ICdoaXBzJyxcbiAgY2hlc3Q6ICdzcGluZScsXG4gIHVwcGVyQ2hlc3Q6ICdjaGVzdCcsXG4gIG5lY2s6ICd1cHBlckNoZXN0JyxcblxuICBoZWFkOiAnbmVjaycsXG4gIGxlZnRFeWU6ICdoZWFkJyxcbiAgcmlnaHRFeWU6ICdoZWFkJyxcbiAgamF3OiAnaGVhZCcsXG5cbiAgbGVmdFVwcGVyTGVnOiAnaGlwcycsXG4gIGxlZnRMb3dlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIGxlZnRGb290OiAnbGVmdExvd2VyTGVnJyxcbiAgbGVmdFRvZXM6ICdsZWZ0Rm9vdCcsXG5cbiAgcmlnaHRVcHBlckxlZzogJ2hpcHMnLFxuICByaWdodExvd2VyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIHJpZ2h0Rm9vdDogJ3JpZ2h0TG93ZXJMZWcnLFxuICByaWdodFRvZXM6ICdyaWdodEZvb3QnLFxuXG4gIGxlZnRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICBsZWZ0VXBwZXJBcm06ICdsZWZ0U2hvdWxkZXInLFxuICBsZWZ0TG93ZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBsZWZ0SGFuZDogJ2xlZnRMb3dlckFybScsXG5cbiAgcmlnaHRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICByaWdodFVwcGVyQXJtOiAncmlnaHRTaG91bGRlcicsXG4gIHJpZ2h0TG93ZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgcmlnaHRIYW5kOiAncmlnaHRMb3dlckFybScsXG5cbiAgbGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBsZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBsZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBsZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIGxlZnRSaW5nUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIGxlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBsZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG5cbiAgcmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICByaWdodEluZGV4UHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgcmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICByaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgcmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIHJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICByaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICByaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgcmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Qb3NlIH0gZnJvbSAnLi9WUk1Qb3NlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNUmlnIHtcbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IHRoYXQgY29udGFpbnMgYWxsIHRoZSBodW1hbiBib25lcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBnZXQgdGhlc2UgYm9uZXMgdXNpbmcge0BsaW5rIFZSTUh1bWFub2lkLmdldEJvbmV9LlxuICAgKi9cbiAgcHVibGljIGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXM7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldFBvc2V9IGFuZCB7QGxpbmsgZ2V0UG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIHJlc3RQb3NlOiBWUk1Qb3NlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcykge1xuICAgIHRoaXMuaHVtYW5Cb25lcyA9IGh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLnJlc3RQb3NlID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2UgPSB7fSBhcyBWUk1Qb3NlO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKCh2cm1Cb25lTmFtZVN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdnJtQm9uZU5hbWUgPSB2cm1Cb25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUodnJtQm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmNvcHkobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEuY29weShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRvIHJhdyBhcnJheXNcbiAgICAgIHBvc2VbdnJtQm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2UgPSB7fSBhcyBWUk1Qb3NlO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lTmFtZVN0cmluZykgPT4ge1xuICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRha2UgYSBkaWZmIGZyb20gcmVzdFBvc2VcbiAgICAgIF92M0Euc2V0KDAsIDAsIDApO1xuICAgICAgX3F1YXRBLmlkZW50aXR5KCk7XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKHJlc3RTdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN0U3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIHF1YXRJbnZlcnRDb21wYXQoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuYWRkKG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLnByZW11bHRpcGx5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIC8vIENvbnZlcnQgdG8gcmF3IGFycmF5c1xuICAgICAgcG9zZVtib25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgaHVtYW5vaWQgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSBbW1ZSTVBvc2VdXSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHBvc2VPYmplY3QpLmZvckVhY2goKFtib25lTmFtZVN0cmluZywgc3RhdGVdKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgcG9zZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKCFyZXN0U3RhdGUpIHtcbiAgICAgICAgLy8gSXQncyB2ZXJ5IHVubGlrZWx5LiBQb3NzaWJseSBhIGJ1Z1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBzdGF0ZSB0byB0aGUgYWN0dWFsIGJvbmVcbiAgICAgIGlmIChzdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgICBub2RlLnBvc2l0aW9uLmFkZChfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkoc3RhdGUucm90YXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnJlc3RQb3NlKS5mb3JFYWNoKChbYm9uZU5hbWUsIHJlc3RdKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSBhcyBWUk1IdW1hbkJvbmVOYW1lKTtcblxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHJlc3QucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShyZXN0LnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSB7QGxpbmsgVlJNSHVtYW5Cb25lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEgYFRIUkVFLk9iamVjdDNEYC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0/Lm5vZGUgPz8gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSwgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTGlzdCB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTGlzdCc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVQYXJlbnRNYXAgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZVBhcmVudE1hcCc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIG5vcm1hbGl6ZWQgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRSaWcgZXh0ZW5kcyBWUk1SaWcge1xuICBwcm90ZWN0ZWQgc3RhdGljIF9zZXR1cFRyYW5zZm9ybXMoXG4gICAgbW9kZWxSaWc6IFZSTVJpZyxcbiAgKToge1xuICAgIHJpZ0JvbmVzOiBWUk1IdW1hbkJvbmVzO1xuICAgIHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICAgIHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgICBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgfSB7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgIHJvb3QubmFtZSA9ICdWUk1IdW1hbm9pZFJpZyc7XG5cbiAgICAvLyBzdG9yZSBib25lV29ybGRQb3NpdGlvbnMgYW5kIGJvbmVXb3JsZFJvdGF0aW9uc1xuICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5WZWN0b3IzIH0gPSB7fTtcbiAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG4gICAgY29uc3QgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICAgICAgYm9uZU5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICBib25lTm9kZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoYm9uZVdvcmxkUG9zaXRpb24sIGJvbmVXb3JsZFJvdGF0aW9uLCBfdjNBKTtcblxuICAgICAgICBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdID0gYm9uZVdvcmxkUG9zaXRpb247XG4gICAgICAgIGJvbmVXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRSb3RhdGlvbjtcbiAgICAgICAgYm9uZVJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lTm9kZS5xdWF0ZXJuaW9uLmNsb25lKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBidWlsZCByaWcgaGllcmFyY2h5ICsgc3RvcmUgcGFyZW50V29ybGRSb3RhdGlvbnNcbiAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIGNvbnN0IHJpZ0JvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSBtb2RlbFJpZy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSkge1xuICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uc1tib25lTmFtZV0gYXMgVEhSRUUuVmVjdG9yMztcblxuICAgICAgICAvLyBzZWUgdGhlIG5lYXJlc3QgcGFyZW50IHBvc2l0aW9uXG4gICAgICAgIGxldCBjdXJyZW50Qm9uZU5hbWU6IFZSTUh1bWFuQm9uZU5hbWUgfCBudWxsID0gYm9uZU5hbWU7XG4gICAgICAgIGxldCBwYXJlbnRXb3JsZFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgcGFyZW50V29ybGRSb3RhdGlvbjogVEhSRUUuUXVhdGVybmlvbiB8IHVuZGVmaW5lZDtcbiAgICAgICAgd2hpbGUgKHBhcmVudFdvcmxkUG9zaXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgIGN1cnJlbnRCb25lTmFtZSA9IFZSTUh1bWFuQm9uZVBhcmVudE1hcFtjdXJyZW50Qm9uZU5hbWVdO1xuICAgICAgICAgIGlmIChjdXJyZW50Qm9uZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudFdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbY3VycmVudEJvbmVOYW1lXTtcbiAgICAgICAgICBwYXJlbnRXb3JsZFJvdGF0aW9uID0gYm9uZVdvcmxkUm90YXRpb25zW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gaGllcmFyY2h5XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIHJpZ0JvbmVOb2RlLm5hbWUgPSAnTm9ybWFsaXplZF8nICsgYm9uZU5vZGUubmFtZTtcblxuICAgICAgICBjb25zdCBwYXJlbnRSaWdCb25lTm9kZSA9IChjdXJyZW50Qm9uZU5hbWUgPyByaWdCb25lc1tjdXJyZW50Qm9uZU5hbWVdPy5ub2RlIDogcm9vdCkgYXMgVEhSRUUuT2JqZWN0M0Q7XG5cbiAgICAgICAgcGFyZW50UmlnQm9uZU5vZGUuYWRkKHJpZ0JvbmVOb2RlKTtcbiAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uY29weShib25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIGlmIChwYXJlbnRXb3JsZFBvc2l0aW9uKSB7XG4gICAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uc3ViKHBhcmVudFdvcmxkUG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmlnQm9uZXNbYm9uZU5hbWVdID0geyBub2RlOiByaWdCb25lTm9kZSB9O1xuXG4gICAgICAgIC8vIHN0b3JlIHBhcmVudFdvcmxkUm90YXRpb25cbiAgICAgICAgcGFyZW50V29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdID0gcGFyZW50V29ybGRSb3RhdGlvbiA/PyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJpZ0JvbmVzOiByaWdCb25lcyBhcyBWUk1IdW1hbkJvbmVzLFxuICAgICAgcm9vdCxcbiAgICAgIHBhcmVudFdvcmxkUm90YXRpb25zLFxuICAgICAgYm9uZVJvdGF0aW9ucyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsOiBWUk1SaWc7XG4gIHB1YmxpYyByZWFkb25seSByb290OiBUSFJFRS5PYmplY3QzRDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gIHByb3RlY3RlZCByZWFkb25seSBfYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1SaWcpIHtcbiAgICBjb25zdCB7IHJpZ0JvbmVzLCByb290LCBwYXJlbnRXb3JsZFJvdGF0aW9ucywgYm9uZVJvdGF0aW9ucyB9ID0gVlJNSHVtYW5vaWRSaWcuX3NldHVwVHJhbnNmb3JtcyhodW1hbm9pZCk7XG5cbiAgICBzdXBlcihyaWdCb25lcyk7XG5cbiAgICB0aGlzLm9yaWdpbmFsID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9ucyA9IHBhcmVudFdvcmxkUm90YXRpb25zO1xuICAgIHRoaXMuX2JvbmVSb3RhdGlvbnMgPSBib25lUm90YXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIGh1bWFub2lkIHJpZy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSB0aGlzLm9yaWdpbmFsLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmlnQm9uZU5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKSE7XG4gICAgICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb24gPSB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0hO1xuICAgICAgICBjb25zdCBpbnZQYXJlbnRXb3JsZFJvdGF0aW9uID0gX3F1YXRBLmNvcHkocGFyZW50V29ybGRSb3RhdGlvbikuaW52ZXJ0KCk7XG4gICAgICAgIGNvbnN0IGJvbmVSb3RhdGlvbiA9IHRoaXMuX2JvbmVSb3RhdGlvbnNbYm9uZU5hbWVdITtcblxuICAgICAgICBib25lTm9kZS5xdWF0ZXJuaW9uXG4gICAgICAgICAgLmNvcHkocmlnQm9uZU5vZGUucXVhdGVybmlvbilcbiAgICAgICAgICAubXVsdGlwbHkocGFyZW50V29ybGRSb3RhdGlvbilcbiAgICAgICAgICAucHJlbXVsdGlwbHkoaW52UGFyZW50V29ybGRSb3RhdGlvbilcbiAgICAgICAgICAubXVsdGlwbHkoYm9uZVJvdGF0aW9uKTtcblxuICAgICAgICAvLyBNb3ZlIHRoZSBtYXNzIGNlbnRlciBvZiB0aGUgVlJNXG4gICAgICAgIGlmIChib25lTmFtZSA9PT0gJ2hpcHMnKSB7XG4gICAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSByaWdCb25lTm9kZS5nZXRXb3JsZFBvc2l0aW9uKG5ldyBUSFJFRS5WZWN0b3IzKCkpO1xuICAgICAgICAgIGNvbnN0IHBhcmVudFdvcmxkTWF0cml4ID0gYm9uZU5vZGUucGFyZW50IS5tYXRyaXhXb3JsZDtcbiAgICAgICAgICBjb25zdCBsb2NhbFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb24uYXBwbHlNYXRyaXg0KHBhcmVudFdvcmxkTWF0cml4LmludmVydCgpKTtcbiAgICAgICAgICBib25lTm9kZS5wb3NpdGlvbi5jb3B5KGxvY2FsUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRSaWcgfSBmcm9tICcuL1ZSTUh1bWFub2lkUmlnJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBodW1hbm9pZCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIHJhdyByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX3Jhd0h1bWFuQm9uZXM6IFZSTVJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEEgbm9ybWFsaXplZCByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX25vcm1hbGl6ZWRIdW1hbkJvbmVzOiBWUk1IdW1hbm9pZFJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHJhd1Jlc3RQb3NlfSBvciB7QGxpbmsgbm9ybWFsaXplZFJlc3RQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCByZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXN0UG9zZSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJhd1Jlc3RQb3NlIG9yIG5vcm1hbGl6ZWRSZXN0UG9zZSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmF3UmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIHJhdyBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRSYXdQb3NlfSBhbmQge0BsaW5rIGdldFJhd1Bvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3UmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGFuZCB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZFJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBodW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGFuIGFsaWFzIG9mIGByYXdIdW1hbkJvbmVzYFxuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3SHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBvZiBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZEh1bWFuQm9uZXNSb290KCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucm9vdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqIEBwYXJhbSBhdXRvVXBkYXRlSHVtYW5Cb25lcyBXaGV0aGVyIGl0IGNvcGllcyBwb3NlIGZyb20gbm9ybWFsaXplZEh1bWFuQm9uZXMgdG8gcmF3SHVtYW5Cb25lcyBvbiB7QGxpbmsgdXBkYXRlfS4gYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcywgb3B0aW9ucz86IHsgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPz8gdHJ1ZTtcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhodW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNSHVtYW5vaWR9IGludG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1IdW1hbm9pZH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUh1bWFub2lkKTogdGhpcyB7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IHNvdXJjZS5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhzb3VyY2UuaHVtYW5Cb25lcyk7XG4gICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMgPSBuZXcgVlJNSHVtYW5vaWRSaWcodGhpcy5fcmF3SHVtYW5Cb25lcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUh1bWFub2lkIHtcbiAgICByZXR1cm4gbmV3IFZSTUh1bWFub2lkKHRoaXMuaHVtYW5Cb25lcywgeyBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyB9KS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0Fic29sdXRlUG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1IdW1hbm9pZDogZ2V0QWJzb2x1dGVQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdBYnNvbHV0ZVBvc2UoKSBvciBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCkgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRSYXdQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFJhd0Fic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3UG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogZ2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3UG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd1Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiByYXcgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFJhd1Bvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgc2V0UmF3UG9zZX0gb3Ige0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHNldFJhd1Bvc2UoKSBvciBzZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5zZXRSYXdQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgcmF3IGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UmF3UG9zZX0uXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRSYXdQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5zZXRQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgbm9ybWFsaXplZCBodW1hbiBib25lcyBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXROb3JtYWxpemVkUG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmVzZXRSYXdQb3NlfSBvciB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogcmVzZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciByZXNldFJhd1Bvc2UoKSBvciByZXNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnJlc2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSByYXcgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHJlc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRSYXdQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnJlc2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBub3JtYWxpemVkIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXROb3JtYWxpemVkUG9zZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRCb25lKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmUoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZU5vZGV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZU5vZGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRCb25lTm9kZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZU5vZGUoKSBvciBnZXROb3JtYWxpemVkQm9uZU5vZGUoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBodW1hbm9pZCBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30gaXMgYHRydWVgLCBpdCB0cmFuc2ZlcnMgdGhlIHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyB0byByYXcgaHVtYW4gYm9uZXMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzKSB7XG4gICAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0ge1xuICBIaXBzOiAnaGlwcycsXG4gIFNwaW5lOiAnc3BpbmUnLFxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRVcHBlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIExlZnRMb3dlckxlZzogJ2xlZnRMb3dlckxlZycsXG4gIExlZnRGb290OiAnbGVmdEZvb3QnLFxuICBSaWdodFVwcGVyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIFJpZ2h0TG93ZXJMZWc6ICdyaWdodExvd2VyTGVnJyxcbiAgUmlnaHRGb290OiAncmlnaHRGb290JyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG4gIFJpZ2h0VXBwZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgUmlnaHRMb3dlckFybTogJ3JpZ2h0TG93ZXJBcm0nLFxuICBSaWdodEhhbmQ6ICdyaWdodEhhbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0gdHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZVtrZXlvZiB0eXBlb2YgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lXTtcbiIsImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL1ZSTUh1bWFub2lkJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgeyBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlcic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIG1hcCBmcm9tIG9sZCB0aHVtYiBib25lIG5hbWVzIHRvIG5ldyB0aHVtYiBib25lIG5hbWVzXG4gKi9cbmNvbnN0IHRodW1iQm9uZU5hbWVNYXA6IHsgW2tleTogc3RyaW5nXTogVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lIHwgdW5kZWZpbmVkIH0gPSB7XG4gIGxlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIGxlZnRUaHVtYkludGVybWVkaWF0ZTogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgcmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICByaWdodFRodW1iSW50ZXJtZWRpYXRlOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbn07XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNSHVtYW5vaWRIZWxwZXJ9LlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIHRoZSBoZWxwZXIgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZCA9IGV4dGVuc2lvbi5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wYXQ6IDEuMC1iZXRhIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgKlxuICAgICAqIGB0cnVlYCBpZiBgbGVmdFRodW1iSW50ZXJtZWRpYXRlYCBvciBgcmlnaHRUaHVtYkludGVybWVkaWF0ZWAgZXhpc3RzXG4gICAgICovXG4gICAgY29uc3QgZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUgPVxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5sZWZ0VGh1bWJJbnRlcm1lZGlhdGUgIT0gbnVsbCB8fFxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5yaWdodFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGw7XG5cbiAgICBjb25zdCBodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMpLm1hcChhc3luYyAoW2JvbmVOYW1lU3RyaW5nLCBzY2hlbWFIdW1hbkJvbmVdKSA9PiB7XG4gICAgICAgICAgbGV0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2NoZW1hSHVtYW5Cb25lLm5vZGU7XG5cbiAgICAgICAgICAvLyBjb21wYXQ6IDEuMC1iZXRhIHByZXZpb3VzIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgICAgICBpZiAoZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICAgIGlmICh0aHVtYkJvbmVOYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZDogVjBWUk0uSHVtYW5vaWQgfCB1bmRlZmluZWQgPSB2cm1FeHQuaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzLm1hcChhc3luYyAoYm9uZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZS5ib25lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gYm9uZS5ub2RlO1xuXG4gICAgICAgICAgaWYgKGJvbmVOYW1lID09IG51bGwgfHwgaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbWFwIHRvIG5ldyBib25lIG5hbWVcbiAgICAgICAgICBjb25zdCB0aHVtYkJvbmVOYW1lID0gdGh1bWJCb25lTmFtZU1hcFtib25lTmFtZV07XG4gICAgICAgICAgY29uc3QgbmV3Qm9uZU5hbWUgPSAodGh1bWJCb25lTmFtZSA/PyBib25lTmFtZSkgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuXG4gICAgICAgICAgLy8gdjAgVlJNcyBtaWdodCBoYXZlIGEgbXVsdGlwbGUgbm9kZXMgYXR0YWNoZWQgdG8gYSBzaW5nbGUgYm9uZS4uLlxuICAgICAgICAgIC8vIHNvIGlmIHRoZXJlIGFscmVhZHkgaXMgYW4gZW50cnkgaW4gdGhlIGBodW1hbkJvbmVzYCwgc2hvdyBhIHdhcm5pbmcgYW5kIGlnbm9yZSBpdFxuICAgICAgICAgIGlmIChodW1hbkJvbmVzW25ld0JvbmVOYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBNdWx0aXBsZSBib25lIGVudHJpZXMgZm9yICR7bmV3Qm9uZU5hbWV9IGRldGVjdGVkIChpbmRleCA9ICR7aW5kZXh9KSwgaWdub3JpbmcgZHVwbGljYXRlZCBlbnRyaWVzLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB0byB0aGUgYGh1bWFuQm9uZXNgXG4gICAgICAgICAgaHVtYW5Cb25lc1tuZXdCb25lTmFtZV0gPSB7IG5vZGUgfTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFub2lkID0gbmV3IFZSTUh1bWFub2lkKHRoaXMuX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzKSwge1xuICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgfSk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoaHVtYW5vaWQubm9ybWFsaXplZEh1bWFuQm9uZXNSb290KTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1IdW1hbm9pZEhlbHBlcihodW1hbm9pZCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFub2lkO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdCBpbiBnaXZlbiBodW1hbiBib25lcy5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgSHVtYW4gYm9uZXNcbiAgICogQHJldHVybnMgSHVtYW4gYm9uZXMsIG5vIGxvbmdlciBwYXJ0aWFsIVxuICAgKi9cbiAgcHJpdmF0ZSBfZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4pOiBWUk1IdW1hbkJvbmVzIHtcbiAgICAvLyBlbnN1cmUgcmVxdWlyZWQgYm9uZXMgZXhpc3RcbiAgICBjb25zdCBtaXNzaW5nUmVxdWlyZWRCb25lcyA9IE9iamVjdC52YWx1ZXMoVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lKS5maWx0ZXIoXG4gICAgICAocmVxdWlyZWRCb25lTmFtZSkgPT4gaHVtYW5Cb25lc1tyZXF1aXJlZEJvbmVOYW1lXSA9PSBudWxsLFxuICAgICk7XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBhcmUgbWlzc2luZyBib25lc1xuICAgIGlmIChtaXNzaW5nUmVxdWlyZWRCb25lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjogVGhlc2UgaHVtYW5vaWQgYm9uZXMgYXJlIHJlcXVpcmVkIGJ1dCBub3QgZXhpc3Q6ICR7bWlzc2luZ1JlcXVpcmVkQm9uZXMuam9pbignLCAnKX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5Cb25lcyBhcyBWUk1IdW1hbkJvbmVzO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBGYW5CdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHRoZXRhOiBudW1iZXI7XG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY3VycmVudFRoZXRhID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRoZXRhID0gMC4wO1xuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRUaGV0YSA9IDAuMDtcbiAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gMC4wO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSg2NSAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDMgKiA2MyksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50VGhldGEgIT09IHRoaXMudGhldGEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUaGV0YSA9IHRoaXMudGhldGE7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHRoaXMucmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigwLCAwLjAsIDAuMCwgMC4wKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gNjMuMCkgKiB0aGlzLl9jdXJyZW50VGhldGE7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGkgKyAxLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5zaW4odCksIDAuMCwgdGhpcy5fY3VycmVudFJhZGl1cyAqIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MzsgaSsrKSB7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFlaKGkgKiAzLCAwLCBpICsgMSwgaSArIDIpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLnRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMudGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi4vVlJNTG9va0F0JztcbmltcG9ydCB7IEZhbkJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9GYW5CdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0xpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgU1FSVF8yX09WRVJfMiA9IE1hdGguc3FydCgyLjApIC8gMi4wO1xuY29uc3QgUVVBVF9YWV9DVzkwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oMCwgMCwgLVNRUlRfMl9PVkVSXzIsIFNRUlRfMl9PVkVSXzIpO1xuY29uc3QgVkVDM19QT1NJVElWRV9ZID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAxLjAsIDAuMCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1Mb29rQXQ6IFZSTUxvb2tBdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVzaFlhdzogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoUGl0Y2g6IFRIUkVFLk1lc2g8RmFuQnVmZmVyR2VvbWV0cnksIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsPjtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZVRhcmdldDogVEhSRUUuTGluZVNlZ21lbnRzPExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSwgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWw+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihsb29rQXQ6IFZSTUxvb2tBdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLnZybUxvb2tBdCA9IGxvb2tBdDtcblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4MDBmZjAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoUGl0Y2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbWVzaFBpdGNoKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBGYW5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC41O1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmMDAwMCxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbWVzaFlhdyA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoWWF3KTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuMTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX2xpbmVUYXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hZYXcubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbGluZVRhcmdldC5tYXRlcmlhbC5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgZ2VvbWV0cmllc1xuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy52cm1Mb29rQXQueWF3O1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkudGhldGEgPSB5YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC5waXRjaDtcbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkudGhldGEgPSBwaXRjaDtcbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICAvLyBnZXQgd29ybGQgcG9zaXRpb24gYW5kIHF1YXRlcm5pb25cbiAgICB0aGlzLnZybUxvb2tBdC5nZXRMb29rQXRXb3JsZFBvc2l0aW9uKF92M0EpO1xuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEEpO1xuXG4gICAgLy8gY2FsY3VsYXRlIHJvdGF0aW9uIHVzaW5nIGZhY2VGcm9udFxuICAgIF9xdWF0QS5tdWx0aXBseSh0aGlzLnZybUxvb2tBdC5nZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKF9xdWF0QikpO1xuXG4gICAgLy8gc2V0IHRyYW5zZm9ybSB0byBtZXNoZXNcbiAgICB0aGlzLl9tZXNoWWF3LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFlhdy5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKTtcblxuICAgIHRoaXMuX21lc2hQaXRjaC5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEIuc2V0RnJvbUF4aXNBbmdsZShWRUMzX1BPU0lUSVZFX1ksIHlhdykpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KFFVQVRfWFlfQ1c5MCk7XG5cbiAgICAvLyB1cGRhdGUgdGFyZ2V0IGxpbmUgYW5kIHNwaGVyZVxuICAgIGNvbnN0IHsgdGFyZ2V0LCBhdXRvVXBkYXRlIH0gPSB0aGlzLnZybUxvb2tBdDtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgYXV0b1VwZGF0ZSkge1xuICAgICAgdGFyZ2V0LmdldFdvcmxkUG9zaXRpb24oX3YzQikuc3ViKF92M0EpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS50YWlsLmNvcHkoX3YzQik7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IHRyYW5zZm9ybSB0byBtZXNoZXNcbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogRXh0cmFjdCB3b3JsZCByb3RhdGlvbiBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCBpbiBjaGVhcGVyIHdheS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgVGFyZ2V0IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBDYWxjdWxhdGUgYXppbXV0aCAvIGFsdGl0dWRlIGFuZ2xlcyBmcm9tIGEgdmVjdG9yLlxuICpcbiAqIFRoaXMgcmV0dXJucyBhIGRpZmZlcmVuY2Ugb2YgYW5nbGVzIGZyb20gKDEsIDAsIDApLlxuICogQXppbXV0aCByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBZIGF4aXMuXG4gKiBBbHRpdHVkZSByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBaIGF4aXMuXG4gKiBJdCBpcyByb3RhdGVkIGluIGludHJpbnNpYyBZLVogb3JkZXIuXG4gKlxuICogQHBhcmFtIHZlY3RvciBUaGUgdmVjdG9yXG4gKiBAcmV0dXJucyBBIHR1cGxlIGNvbnRhaW5zIHR3byBhbmdsZXMsIGBbIGF6aW11dGgsIGFsdGl0dWRlIF1gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjQXppbXV0aEFsdGl0dWRlKHZlY3RvcjogVEhSRUUuVmVjdG9yMyk6IFthemltdXRoOiBudW1iZXIsIGFsdGl0dWRlOiBudW1iZXJdIHtcbiAgcmV0dXJuIFtNYXRoLmF0YW4yKC12ZWN0b3IueiwgdmVjdG9yLngpLCBNYXRoLmF0YW4yKHZlY3Rvci55LCBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci56ICogdmVjdG9yLnopKV07XG59XG4iLCIvKipcbiAqIE1ha2Ugc3VyZSB0aGUgYW5nbGUgaXMgd2l0aGluIC1QSSB0byBQSS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIHNhbml0aXplQW5nbGUoMS41ICogTWF0aC5QSSkgLy8gLTAuNSAqIFBJXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYW5nbGUgQW4gaW5wdXQgYW5nbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplQW5nbGUoYW5nbGU6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IHJvdW5kVHVybiA9IE1hdGgucm91bmQoYW5nbGUgLyAyLjAgLyBNYXRoLlBJKTtcbiAgcmV0dXJuIGFuZ2xlIC0gMi4wICogTWF0aC5QSSAqIHJvdW5kVHVybjtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgY2FsY0F6aW11dGhBbHRpdHVkZSB9IGZyb20gJy4vdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgc2FuaXRpemVBbmdsZSB9IGZyb20gJy4vdXRpbHMvc2FuaXRpemVBbmdsZSc7XG5cbmNvbnN0IFZFQzNfUE9TSVRJVkVfWiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigpO1xuXG4vKipcbiAqIEEgY2xhc3MgY29udHJvbHMgZXllIGdhemUgbW92ZW1lbnRzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luIG9mIExvb2tBdC4gUG9zaXRpb24gb2Zmc2V0IGZyb20gdGhlIGhlYWQgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXRGcm9tSGVhZEJvbmUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogVGhlIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfSBvZiB0aGUgTG9va0F0LlxuICAgKi9cbiAgcHVibGljIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlIExvb2tBdCB3aWxsIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseSBieSBjYWxsaW5nIHtAbGluayB1cGRhdGV9LCB0b3dhcmRpbmcgdGhlIGRpcmVjdGlvbiB0byB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIExvb2tBdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIHtAbGluayBhdXRvVXBkYXRlfSBpcyBkaXNhYmxlZC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBhdXRvVXBkYXRlfVxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF95YXc6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIGdldCB5YXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWF3O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgeWF3KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl95YXcgPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9waXRjaDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBpdGNoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BpdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgcGl0Y2godmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BpdGNoID0gdmFsdWU7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuZ2xlcyBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gaXRzIFtAbGluayBhcHBsaWVyXS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdvcmxkIHJvdGF0aW9uIG9mIHRoZSBoZWFkIGluIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbjogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBnZXRFdWxlcn0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZXVsZXIoKTogVEhSRUUuRXVsZXIge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0OiBldWxlciBpcyBkZXByZWNhdGVkLiB1c2UgZ2V0RXVsZXIoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RXVsZXIobmV3IFRIUkVFLkV1bGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gYXBwbGllciBBIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcikge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLmFwcGxpZXIgPSBhcHBsaWVyO1xuXG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uID0gdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24obmV3IFRIUkVFLlF1YXRlcm5pb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyB5YXctcGl0Y2ggYW5nbGVzIGFzIGFuIGBFdWxlcmAuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgZXVsZXJcbiAgICovXG4gIHB1YmxpYyBnZXRFdWxlcih0YXJnZXQ6IFRIUkVFLkV1bGVyKTogVEhSRUUuRXVsZXIge1xuICAgIHJldHVybiB0YXJnZXQuc2V0KFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5fcGl0Y2gsIFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5feWF3LCAwLjAsICdZWFonKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNTG9va0F0fSBpbnRvIHRoaXMgb25lLlxuICAgKiB7QGxpbmsgaHVtYW5vaWR9IG11c3QgYmUgc2FtZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICoge0BsaW5rIGFwcGxpZXJ9IHdpbGwgcmVmZXJlbmNlIHRoZSBzYW1lIGluc3RhbmNlIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNTG9va0F0fSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNTG9va0F0KTogdGhpcyB7XG4gICAgaWYgKHRoaXMuaHVtYW5vaWQgIT09IHNvdXJjZS5odW1hbm9pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Mb29rQXQ6IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUuY29weShzb3VyY2Uub2Zmc2V0RnJvbUhlYWRCb25lKTtcbiAgICB0aGlzLmFwcGxpZXIgPSBzb3VyY2UuYXBwbGllcjtcbiAgICB0aGlzLmF1dG9VcGRhdGUgPSBzb3VyY2UuYXV0b1VwZGF0ZTtcbiAgICB0aGlzLnRhcmdldCA9IHNvdXJjZS50YXJnZXQ7XG4gICAgdGhpcy5mYWNlRnJvbnQuY29weShzb3VyY2UuZmFjZUZyb250KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1Mb29rQXR9LlxuICAgKiBOb3RlIHRoYXQge0BsaW5rIGh1bWFub2lkfSBhbmQge0BsaW5rIGFwcGxpZXJ9IHdpbGwgcmVmZXJlbmNlIHRoZSBzYW1lIGluc3RhbmNlIGFzIHRoaXMgb25lLlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUxvb2tBdH1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1Mb29rQXQge1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0KHRoaXMuaHVtYW5vaWQsIHRoaXMuYXBwbGllcikuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgbG9va0F0IGRpcmVjdGlvbiB0byBpbml0aWFsIGRpcmVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgaGVhZCBwb3NpdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUG9zaXRpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUpLmFwcGx5TWF0cml4NChoZWFkLm1hdHJpeFdvcmxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGhlYWQgcm90YXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICogRG9lcyBOT1QgY29uc2lkZXIge0BsaW5rIGZhY2VGcm9udH0uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGNvbnN0IGhlYWQgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykhO1xuXG4gICAgcmV0dXJuIGdldFdvcmxkUXVhdGVybmlvbkxpdGUoaGVhZCwgdGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgK1ogdW5pdCB2ZWN0b3Igb2YgdGhlIGh1bWFub2lkIEhlYWQgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHB1YmxpYyBnZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGlmICh0aGlzLmZhY2VGcm9udC5kaXN0YW5jZVRvU3F1YXJlZChWRUMzX1BPU0lUSVZFX1opIDwgMC4wMSkge1xuICAgICAgcmV0dXJuIHRhcmdldC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKS5pbnZlcnQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpLnByZW11bHRpcGx5KF9xdWF0RC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKS5pbnZlcnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBMb29rQXQgZGlyZWN0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGREaXJlY3Rpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRCKTtcbiAgICB0aGlzLmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRDKTtcblxuICAgIHJldHVybiB0YXJnZXRcbiAgICAgIC5jb3B5KFZFQzNfUE9TSVRJVkVfWilcbiAgICAgIC5hcHBseVF1YXRlcm5pb24oX3F1YXRCKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihfcXVhdEMpXG4gICAgICAuYXBwbHlFdWxlcih0aGlzLmdldEV1bGVyKF9ldWxlckEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaXRzIExvb2tBdCBwb3NpdGlvbi5cbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYge0BsaW5rIFZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIEEgdGFyZ2V0IHBvc2l0aW9uLCBpbiB3b3JsZCBzcGFjZVxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIGxvY2FsIGNvb3JkaW5hdGVcbiAgICBjb25zdCBoZWFkUm90RGlmZkludiA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkocXVhdEludmVydENvbXBhdCh0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpKSk7XG4gICAgY29uc3QgaGVhZFBvcyA9IHRoaXMuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNCKTtcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDLmNvcHkocG9zaXRpb24pLnN1YihoZWFkUG9zKS5hcHBseVF1YXRlcm5pb24oaGVhZFJvdERpZmZJbnYpLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGFuZ2xlc1xuICAgIGNvbnN0IFthemltdXRoRnJvbSwgYWx0aXR1ZGVGcm9tXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIGNvbnN0IFthemltdXRoVG8sIGFsdGl0dWRlVG9dID0gY2FsY0F6aW11dGhBbHRpdHVkZShsb29rQXREaXIpO1xuICAgIGNvbnN0IHlhdyA9IHNhbml0aXplQW5nbGUoYXppbXV0aFRvIC0gYXppbXV0aEZyb20pO1xuICAgIGNvbnN0IHBpdGNoID0gc2FuaXRpemVBbmdsZShhbHRpdHVkZUZyb20gLSBhbHRpdHVkZVRvKTsgLy8gc3Bpbm5pbmcgKDEsIDAsIDApIENDVyBhcm91bmQgWiBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayB1cCwgd2hpbGUgc3Bpbm5pbmcgKDAsIDAsIDEpIENDVyBhcm91bmQgWCBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayBkb3duXG5cbiAgICAvLyBhcHBseSBhbmdsZXNcbiAgICB0aGlzLl95YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHlhdztcbiAgICB0aGlzLl9waXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogcGl0Y2g7XG5cbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBWUk1Mb29rQXRIZWFkLlxuICAgKiBJZiB7QGxpbmsgVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlfSBpcyBkaXNhYmxlZCwgaXQgd2lsbCBkbyBub3RoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lLCBpdCBpc24ndCB1c2VkIHRob3VnaC4gWW91IGNhbiB1c2UgdGhlIHBhcmFtZXRlciBpZiB5b3Ugd2FudCB0byB1c2UgdGhpcyBpbiB5b3VyIG93biBleHRlbmRlZCB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX25lZWRzVXBkYXRlKSB7XG4gICAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmFwcGxpZXIuYXBwbHlZYXdQaXRjaCh0aGlzLl95YXcsIHRoaXMuX3BpdGNoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCAnWVhaJyk7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdib25lJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBpbndhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyByaWdodC4gVGhlIHJpZ2h0IGV5ZSBtb3ZlcyBsZWZ0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG91dHdhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyBsZWZ0LiBUaGUgcmlnaHQgZXllIG1vdmVzIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgTGVmdEV5ZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFF1YXRMZWZ0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIFJpZ2h0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdFJpZ2h0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIExlZnRFeWUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHdvcmxkLXNwYWNlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBodW1hbm9pZCBSaWdodEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRCb25lQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5mYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAgIC8vIHNldCByZXN0IHF1YXRlcm5pb25zXG4gICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG5cbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllLmNvcHkobGVmdEV5ZS5xdWF0ZXJuaW9uKTtcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUobGVmdEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllLmNvcHkocmlnaHRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHJpZ2h0RXllLnBhcmVudCEsIHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG4gICAgY29uc3QgbGVmdEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllTm9ybWFsaXplZCA9IHRoaXMuaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIC8vIGxlZnRcbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueCA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKC1waXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcChwaXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS55ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoLXlhdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnkgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdyk7XG4gICAgICB9XG5cbiAgICAgIF9xdWF0QS5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gICAgICB0aGlzLl9nZXRXb3JsZEZhY2VGcm9udFF1YXQoX3F1YXRCKTtcblxuICAgICAgLy8gX3F1YXRCICogX3F1YXRBICogX3F1YXRCXi0xXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgTG9va0F0IHJvdGF0aW9uXG4gICAgICAvLyBhbmQgX3F1YXRCIGlzIHdvcmxkRmFjZUZyb250UXVhdFxuICAgICAgbGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiBsZWZ0RXllTm9ybWFsaXplZC5xdWF0ZXJuaW9uICogX3F1YXRBICogcmVzdFF1YXRMZWZ0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIGxlZnRFeWUucXVhdGVybmlvblxuICAgICAgICAuY29weShsZWZ0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZSk7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAocmlnaHRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbi5jb3B5KF9xdWF0QikubXVsdGlwbHkoX3F1YXRBKS5tdWx0aXBseShfcXVhdEIuaW52ZXJ0KCkpO1xuXG4gICAgICBfcXVhdEEuY29weSh0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiByaWdodEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0UmlnaHRFeWVcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyByZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIHJpZ2h0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkocmlnaHRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uKVxuICAgICAgICAubXVsdGlwbHkoX3F1YXRBKVxuICAgICAgICAucHJlbXVsdGlwbHkoX3F1YXRBLmludmVydCgpKVxuICAgICAgICAubXVsdGlwbHkodGhpcy5fcmVzdFF1YXRSaWdodEV5ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgd29ybGQtc3BhY2UgK1ogdW5pdCB2ZWN0b3IgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHByaXZhdGUgX2dldFdvcmxkRmFjZUZyb250UXVhdCh0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4uL2V4cHJlc3Npb25zJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRSYW5nZU1hcCB9IGZyb20gJy4vVlJNTG9va0F0UmFuZ2VNYXAnO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhcHBsaWVzIGV5ZSBnYXplIGRpcmVjdGlvbnMgdG8gYSBWUk0uXG4gKiBJdCB3aWxsIGJlIHVzZWQgYnkge0BsaW5rIFZSTUxvb2tBdH0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciBpbXBsZW1lbnRzIFZSTUxvb2tBdEFwcGxpZXIge1xuICAvKipcbiAgICogUmVwcmVzZW50IGl0cyB0eXBlIG9mIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnZXhwcmVzc2lvbic7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBJdCB3b24ndCBiZSB1c2VkIGluIGV4cHJlc3Npb24gYXBwbGllci5cbiAgICogU2VlIGFsc286IHtAbGluayByYW5nZU1hcEhvcml6b250YWxPdXRlcn1cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgbGVmdCBvciByaWdodC5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgZG93bndhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIHVwd2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIHVwd2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgZG93bndhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbnMgQSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9XG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxJbm5lciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgaW5uZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBvdXRlciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbERvd24gQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsVXAgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcixcbiAgICByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICApIHtcbiAgICB0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnM7XG5cbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyID0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI7XG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlciA9IHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24gPSByYW5nZU1hcFZlcnRpY2FsRG93bjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxVcCA9IHJhbmdlTWFwVmVydGljYWxVcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgaW5wdXQgYW5nbGUgdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geWF3IFJvdGF0aW9uIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZVxuICAgKiBAcGFyYW0gcGl0Y2ggUm90YXRpb24gYXJvdW5kIFggYXhpcywgaW4gZGVncmVlXG4gICAqL1xuICBwdWJsaWMgYXBwbHlZYXdQaXRjaCh5YXc6IG51bWJlciwgcGl0Y2g6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0Rvd24nLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1VwJywgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKC1waXRjaCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0Rvd24nLCB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcChwaXRjaCkpO1xuICAgIH1cblxuICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tMZWZ0JywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tSaWdodCcsIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tMZWZ0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoeWF3KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gIC8qKlxuICAgKiBMaW1pdHMgdGhlIG1heGltdW0gYW5nbGUgb2YgdGhlIGlucHV0IGFuZ2xlIG9mIHRoZSBMb29rQXQgdmVjdG9yIGZyb20gdGhlIGZyb250IG9mIHRoZSBoZWFkICh0aGUgcG9zaXRpdmUgeiBheGlzKS5cbiAgICovXG4gIHB1YmxpYyBpbnB1dE1heFZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYW4gYW5nbGUgKGluIGRlZ3JlZXMpIGZvciBib25lIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLCBvciBhIHdlaWdodCBmb3IgZXhwcmVzc2lvbiB0eXBlIG9mIExvb2tBdCBhcHBsaWVycy5cbiAgICogVGhlIGlucHV0IHZhbHVlIHdpbGwgdGFrZSBgMS4wYCB3aGVuIHRoZSBpbnB1dCBhbmdsZSBlcXVhbHMgKG9yIGdyZWF0ZXIpIHRvIHtAbGluayBpbnB1dE1heFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyBvdXRwdXRTY2FsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfS5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TWF4VmFsdWUgVGhlIHtAbGluayBpbnB1dE1heFZhbHVlfSBvZiB0aGUgbWFwXG4gICAqIEBwYXJhbSBvdXRwdXRTY2FsZSBUaGUge0BsaW5rIG91dHB1dFNjYWxlfSBvZiB0aGUgbWFwXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXRNYXhWYWx1ZTogbnVtYmVyLCBvdXRwdXRTY2FsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dE1heFZhbHVlID0gaW5wdXRNYXhWYWx1ZTtcbiAgICB0aGlzLm91dHB1dFNjYWxlID0gb3V0cHV0U2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNjYWxlICogc2F0dXJhdGUoc3JjIC8gdGhpcy5pbnB1dE1heFZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1Mb29rQXRIZWxwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1Mb29rQXR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUxvb2tBdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB2cm1FeHByZXNzaW9uTWFuYWdlciA9IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgYXMgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUV4cHJlc3Npb25NYW5hZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtRXhwcmVzc2lvbk1hbmFnZXIgaXMgdW5kZWZpbmVkLiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtTG9va0F0ID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkLCB2cm1FeHByZXNzaW9uTWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCB8fCBleHByZXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCwgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUxvb2tBdExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxvb2tBdCA9IGV4dGVuc2lvbi5sb29rQXQ7XG4gICAgaWYgKCFzY2hlbWFMb29rQXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFMb29rQXQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5mcm9tQXJyYXkoc2NoZW1hTG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZSA/PyBbMC4wLCAwLjA2LCAwLjBdKTtcblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MUltcG9ydFJhbmdlTWFwKFxuICAgIHNjaGVtYVJhbmdlTWFwOiBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0UmFuZ2VNYXAoXG4gICAgICBzY2hlbWFSYW5nZU1hcD8uaW5wdXRNYXhWYWx1ZSA/PyA5MC4wLFxuICAgICAgc2NoZW1hUmFuZ2VNYXA/Lm91dHB1dFNjYWxlID8/IGRlZmF1bHRPdXRwdXRTY2FsZSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0T3V0cHV0U2NhbGUgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSA9PT0gJ0JsZW5kU2hhcGUnID8gMS4wIDogMTAuMDtcblxuICAgIGNvbnN0IG1hcEhJID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbElubmVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcEhPID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxEb3duLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZVID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxVcCwgZGVmYXVsdE91dHB1dFNjYWxlKTtcblxuICAgIGxldCBhcHBsaWVyO1xuXG4gICAgaWYgKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lID09PSAnQmxlbmRTaGFwZScpIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIoZXhwcmVzc2lvbnMsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRCb25lQXBwbGllcihodW1hbm9pZCwgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2tBdCA9IHRoaXMuX2ltcG9ydExvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBpZiAoc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0KSB7XG4gICAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLnNldChcbiAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueSA/PyAwLjA2LFxuICAgICAgICAtKHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC56ID8/IDAuMCksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLnNldCgwLjAsIDAuMDYsIDAuMCk7XG4gICAgfVxuXG4gICAgLy8gVlJNIDAuMCBhcmUgZmFjaW5nIFotIGluc3RlYWQgb2YgWitcbiAgICBsb29rQXQuZmFjZUZyb250LnNldCgwLjAsIDAuMCwgLTEuMCk7XG5cbiAgICBpZiAoYXBwbGllciBpbnN0YW5jZW9mIFZSTUxvb2tBdEJvbmVBcHBsaWVyKSB7XG4gICAgICBhcHBsaWVyLmZhY2VGcm9udC5zZXQoMC4wLCAwLjAsIC0xLjApO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MEltcG9ydERlZ3JlZU1hcChcbiAgICBzY2hlbWFEZWdyZWVNYXA6IFYwVlJNLkZpcnN0UGVyc29uRGVncmVlTWFwIHwgdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRPdXRwdXRTY2FsZTogbnVtYmVyLFxuICApOiBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gICAgY29uc3QgY3VydmUgPSBzY2hlbWFEZWdyZWVNYXA/LmN1cnZlO1xuICAgIGlmIChKU09OLnN0cmluZ2lmeShjdXJ2ZSkgIT09ICdbMCwwLDAsMSwxLDEsMSwwXScpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ3VydmVzIG9mIExvb2tBdERlZ3JlZU1hcCBkZWZpbmVkIGluIFZSTSAwLjAgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKHNjaGVtYURlZ3JlZU1hcD8ueFJhbmdlID8/IDkwLjAsIHNjaGVtYURlZ3JlZU1hcD8ueVJhbmdlID8/IGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRMb29rQXQoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBhcHBsaWVyOiBWUk1Mb29rQXRBcHBsaWVyKTogVlJNTG9va0F0IHtcbiAgICBjb25zdCBsb29rQXQgPSBuZXcgVlJNTG9va0F0KGh1bWFub2lkLCBhcHBsaWVyKTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Mb29rQXRIZWxwZXIobG9va0F0KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9va0F0O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdHlwZSBvZiBhcHBsaWVyLlxuICovXG5leHBvcnQgY29uc3QgVlJNTG9va0F0VHlwZU5hbWUgPSB7XG4gIEJvbmU6ICdib25lJyxcbiAgRXhwcmVzc2lvbjogJ2V4cHJlc3Npb24nLFxufTtcblxuZXhwb3J0IHR5cGUgVlJNTG9va0F0VHlwZU5hbWUgPSB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVba2V5b2YgdHlwZW9mIFZSTUxvb2tBdFR5cGVOYW1lXTtcbiIsIi8qKlxuICogWW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gSW52YWxpZCBVUkxcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8IHVybCA9PT0gJycpIHJldHVybiAnJztcblxuICAvLyBIb3N0IFJlbGF0aXZlIFVSTFxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdChwYXRoKSAmJiAvXlxcLy8udGVzdCh1cmwpKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvKF5odHRwcz86XFwvXFwvW14vXSspLiovaSwgJyQxJyk7XG4gIH1cblxuICAvLyBBYnNvbHV0ZSBVUkwgaHR0cDovLyxodHRwczovLywvL1xuICBpZiAoL14oaHR0cHM/Oik/XFwvXFwvL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIERhdGEgVVJJXG4gIGlmICgvXmRhdGE6LiosLiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIEJsb2IgVVJMXG4gIGlmICgvXmJsb2I6LiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIFJlbGF0aXZlIFVSTFxuICByZXR1cm4gcGF0aCArIHVybDtcbn1cbiIsImltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk0wTWV0YSB9IGZyb20gJy4vVlJNME1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk0xTWV0YSB9IGZyb20gJy4vVlJNMU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHJlc29sdmVVUkwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlVVJMJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTTFNZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIElmIGBmYWxzZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCBpbWFnZSAoe0BsaW5rIFZSTTFNZXRhLnRodW1ibmFpbEltYWdlfSkuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIG5lZWRUaHVtYm5haWxJbWFnZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGxpY2Vuc2UgdXJscy5cbiAgICogVGhpcyBtZXRhIGxvYWRlciB3aWxsIGFjY2VwdCB0aGVzZSBgbGljZW5zZVVybGBzLlxuICAgKiBPdGhlcndpc2UgaXQgd29uJ3QgYmUgbG9hZGVkLlxuICAgKi9cbiAgcHVibGljIGFjY2VwdExpY2Vuc2VVcmxzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogV2hldGhlciBpdCBzaG91bGQgYWNjZXB0IFZSTTAuMCBtZXRhIG9yIG5vdC5cbiAgICogTm90ZSB0aGF0IGl0IG1pZ2h0IGxvYWQge0BsaW5rIFZSTTBNZXRhfSBpbnN0ZWFkIG9mIHtAbGluayBWUk0xTWV0YX0gd2hlbiB0aGlzIGlzIGB0cnVlYC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgYWNjZXB0VjBNZXRhOiBib29sZWFuO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1NZXRhTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1NZXRhTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgPSBvcHRpb25zPy5uZWVkVGh1bWJuYWlsSW1hZ2UgPz8gdHJ1ZTtcbiAgICB0aGlzLmFjY2VwdExpY2Vuc2VVcmxzID0gb3B0aW9ucz8uYWNjZXB0TGljZW5zZVVybHMgPz8gWydodHRwczovL3ZybS5kZXYvbGljZW5zZXMvMS4wLyddO1xuICAgIHRoaXMuYWNjZXB0VjBNZXRhID0gb3B0aW9ucz8uYWNjZXB0VjBNZXRhID8/IHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU1ldGEgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNMU1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWV0YUxvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSBleHRlbnNpb24ubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGNvbnN0IGxpY2Vuc2VVcmwgPSBzY2hlbWFNZXRhLmxpY2Vuc2VVcmw7XG4gICAgY29uc3QgYWNjZXB0TGljZW5zZVVybHNTZXQgPSBuZXcgU2V0KHRoaXMuYWNjZXB0TGljZW5zZVVybHMpO1xuICAgIGlmICghYWNjZXB0TGljZW5zZVVybHNTZXQuaGFzKGxpY2Vuc2VVcmwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFZSTU1ldGFMb2FkZXJQbHVnaW46IFRoZSBsaWNlbnNlIHVybCBcIiR7bGljZW5zZVVybH1cIiBpcyBub3QgYWNjZXB0ZWRgKTtcbiAgICB9XG5cbiAgICBsZXQgdGh1bWJuYWlsSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UgIT0gbnVsbCkge1xuICAgICAgdGh1bWJuYWlsSW1hZ2UgPSAoYXdhaXQgdGhpcy5fZXh0cmFjdEdMVEZJbWFnZShzY2hlbWFNZXRhLnRodW1ibmFpbEltYWdlKSkgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtZXRhVmVyc2lvbjogJzEnLFxuICAgICAgbmFtZTogc2NoZW1hTWV0YS5uYW1lLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgYXV0aG9yczogc2NoZW1hTWV0YS5hdXRob3JzLFxuICAgICAgY29weXJpZ2h0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29weXJpZ2h0SW5mb3JtYXRpb24sXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgcmVmZXJlbmNlczogc2NoZW1hTWV0YS5yZWZlcmVuY2VzLFxuICAgICAgdGhpcmRQYXJ0eUxpY2Vuc2VzOiBzY2hlbWFNZXRhLnRoaXJkUGFydHlMaWNlbnNlcyxcbiAgICAgIHRodW1ibmFpbEltYWdlLFxuICAgICAgbGljZW5zZVVybDogc2NoZW1hTWV0YS5saWNlbnNlVXJsLFxuICAgICAgYXZhdGFyUGVybWlzc2lvbjogc2NoZW1hTWV0YS5hdmF0YXJQZXJtaXNzaW9uLFxuICAgICAgYWxsb3dFeGNlc3NpdmVseVZpb2xlbnRVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlLFxuICAgICAgYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlTZXh1YWxVc2FnZSxcbiAgICAgIGNvbW1lcmNpYWxVc2FnZTogc2NoZW1hTWV0YS5jb21tZXJjaWFsVXNhZ2UsXG4gICAgICBhbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dQb2xpdGljYWxPclJlbGlnaW91c1VzYWdlLFxuICAgICAgYWxsb3dBbnRpc29jaWFsT3JIYXRlVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dBbnRpc29jaWFsT3JIYXRlVXNhZ2UsXG4gICAgICBjcmVkaXROb3RhdGlvbjogc2NoZW1hTWV0YS5jcmVkaXROb3RhdGlvbixcbiAgICAgIGFsbG93UmVkaXN0cmlidXRpb246IHNjaGVtYU1ldGEuYWxsb3dSZWRpc3RyaWJ1dGlvbixcbiAgICAgIG1vZGlmaWNhdGlvbjogc2NoZW1hTWV0YS5tb2RpZmljYXRpb24sXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0wTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFNZXRhID0gdnJtRXh0Lm1ldGE7XG4gICAgaWYgKCFzY2hlbWFNZXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiBhY2NlcHRWME1ldGEgaXMgZmFsc2VcbiAgICBpZiAoIXRoaXMuYWNjZXB0VjBNZXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHRlZCB0byBsb2FkIFZSTTAuMCBtZXRhIGJ1dCBhY2NlcHRWME1ldGEgaXMgZmFsc2UnKTtcbiAgICB9XG5cbiAgICAvLyBsb2FkIHRodW1ibmFpbCB0ZXh0dXJlXG4gICAgbGV0IHRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLm5lZWRUaHVtYm5haWxJbWFnZSAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT0gbnVsbCAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT09IC0xKSB7XG4gICAgICB0ZXh0dXJlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHNjaGVtYU1ldGEudGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMCcsXG4gICAgICBhbGxvd2VkVXNlck5hbWU6IHNjaGVtYU1ldGEuYWxsb3dlZFVzZXJOYW1lLFxuICAgICAgYXV0aG9yOiBzY2hlbWFNZXRhLmF1dGhvcixcbiAgICAgIGNvbW1lcmNpYWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc3NhZ2VOYW1lLFxuICAgICAgY29udGFjdEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvbnRhY3RJbmZvcm1hdGlvbixcbiAgICAgIGxpY2Vuc2VOYW1lOiBzY2hlbWFNZXRhLmxpY2Vuc2VOYW1lLFxuICAgICAgb3RoZXJMaWNlbnNlVXJsOiBzY2hlbWFNZXRhLm90aGVyTGljZW5zZVVybCxcbiAgICAgIG90aGVyUGVybWlzc2lvblVybDogc2NoZW1hTWV0YS5vdGhlclBlcm1pc3Npb25VcmwsXG4gICAgICByZWZlcmVuY2U6IHNjaGVtYU1ldGEucmVmZXJlbmNlLFxuICAgICAgc2V4dWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5zZXh1YWxVc3NhZ2VOYW1lLFxuICAgICAgdGV4dHVyZTogdGV4dHVyZSA/PyB1bmRlZmluZWQsXG4gICAgICB0aXRsZTogc2NoZW1hTWV0YS50aXRsZSxcbiAgICAgIHZlcnNpb246IHNjaGVtYU1ldGEudmVyc2lvbixcbiAgICAgIHZpb2xlbnRVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnZpb2xlbnRVc3NhZ2VOYW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9leHRyYWN0R0xURkltYWdlKGluZGV4OiBudW1iZXIpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHNvdXJjZSA9IGpzb24uaW1hZ2VzPy5baW5kZXhdO1xuXG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBpbWFnZXNbJHtpbmRleH1dIG9mIGdsVEYgYXMgYSB0aHVtYm5haWwgYnV0IHRoZSBpbWFnZSBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9yMTI0L2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMjTDI0NjdcblxuICAgIC8vIGBzb3VyY2UudXJpYCBtaWdodCBiZSBhIHJlZmVyZW5jZSB0byBhIGZpbGVcbiAgICBsZXQgc291cmNlVVJJOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBzb3VyY2UudXJpO1xuXG4gICAgLy8gTG9hZCB0aGUgYmluYXJ5IGFzIGEgYmxvYlxuICAgIGlmIChzb3VyY2UuYnVmZmVyVmlldyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBidWZmZXJWaWV3ID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnYnVmZmVyVmlldycsIHNvdXJjZS5idWZmZXJWaWV3KTtcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYnVmZmVyVmlld10sIHsgdHlwZTogc291cmNlLm1pbWVUeXBlIH0pO1xuICAgICAgc291cmNlVVJJID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlVVJJID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGNvdWxkbid0IGxvYWQgcHJvcGVybHlgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5JbWFnZUxvYWRlcigpO1xuICAgIHJldHVybiBhd2FpdCBsb2FkZXIubG9hZEFzeW5jKHJlc29sdmVVUkwoc291cmNlVVJJLCAodGhpcy5wYXJzZXIgYXMgYW55KS5vcHRpb25zLnBhdGgpKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgY29uc29sZS53YXJuKCdWUk1NZXRhTG9hZGVyUGx1Z2luOiBGYWlsZWQgdG8gbG9hZCBhIHRodW1ibmFpbCBpbWFnZScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdCB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdCc7XG5pbXBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNQ29yZVBhcmFtZXRlcnMgfSBmcm9tICcuL1ZSTUNvcmVQYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKiBUaGlzIGNsYXNzIG9ubHkgaW5jbHVkZXMgY29yZSBzcGVjIG9mIHRoZSBWUk0gKGBWUk1DX3ZybWApLlxuICovXG5leHBvcnQgY2xhc3MgVlJNQ29yZSB7XG4gIC8qKlxuICAgKiBgVEhSRUUuR3JvdXBgIHRoYXQgY29udGFpbnMgdGhlIGVudGlyZSBWUk0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFRIUkVFLkdyb3VwO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtZXRhIGZpZWxkcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byByZWZlciB0aGVzZSBsaWNlbnNlIGZpZWxkcyBiZWZvcmUgdXNlIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtZXRhOiBWUk1NZXRhO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNSHVtYW5vaWR9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gY29udHJvbCBlYWNoIGJvbmVzIHVzaW5nIHtAbGluayBWUk1IdW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGV9IG9yIHtAbGluayBWUk1IdW1hbm9pZC5nZXRSYXdCb25lTm9kZX0uXG4gICAqXG4gICAqIEBUT0RPIEFkZCBhIGxpbmsgdG8gVlJNIHNwZWNcbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY29udHJvbCB0aGVzZSBmYWNpYWwgZXhwcmVzc2lvbnMgdmlhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlci5zZXRWYWx1ZX0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvbk1hbmFnZXI/OiBWUk1FeHByZXNzaW9uTWFuYWdlcjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBvZiB0aGUgVlJNLlxuICAgKiBWUk1GaXJzdFBlcnNvbiBpcyBtb3N0bHkgdXNlZCBmb3IgbWVzaCBjdWxsaW5nIGZvciBmaXJzdCBwZXJzb24gdmlldy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvbj86IFZSTUZpcnN0UGVyc29uO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNTG9va0F0fSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIFZSTUxvb2tBdC50YXJnZXR9IHRvIGNvbnRyb2wgdGhlIGV5ZSBkaXJlY3Rpb24gb2YgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdD86IFZSTUxvb2tBdDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBbW1ZSTVBhcmFtZXRlcnNdXSB0aGF0IHJlcHJlc2VudHMgY29tcG9uZW50cyBvZiB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiBWUk1Db3JlUGFyYW1ldGVycykge1xuICAgIHRoaXMuc2NlbmUgPSBwYXJhbXMuc2NlbmU7XG4gICAgdGhpcy5tZXRhID0gcGFyYW1zLm1ldGE7XG4gICAgdGhpcy5odW1hbm9pZCA9IHBhcmFtcy5odW1hbm9pZDtcbiAgICB0aGlzLmV4cHJlc3Npb25NYW5hZ2VyID0gcGFyYW1zLmV4cHJlc3Npb25NYW5hZ2VyO1xuICAgIHRoaXMuZmlyc3RQZXJzb24gPSBwYXJhbXMuZmlyc3RQZXJzb247XG4gICAgdGhpcy5sb29rQXQgPSBwYXJhbXMubG9va0F0O1xuICB9XG5cbiAgLyoqXG4gICAqICoqWW91IG5lZWQgdG8gY2FsbCB0aGlzIG9uIHlvdXIgdXBkYXRlIGxvb3AuKipcbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGV2ZXJ5IFZSTSBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmh1bWFub2lkLnVwZGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMubG9va0F0KSB7XG4gICAgICB0aGlzLmxvb2tBdC51cGRhdGUoZGVsdGEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmV4cHJlc3Npb25NYW5hZ2VyKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25NYW5hZ2VyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUNvcmUgfSBmcm9tICcuL1ZSTUNvcmUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTU1ldGFMb2FkZXJQbHVnaW4gfSBmcm9tICcuL21ldGEvVlJNTWV0YUxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhJztcblxuZXhwb3J0IGNsYXNzIFZSTUNvcmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUNfdnJtJztcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25QbHVnaW46IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvblBsdWdpbjogVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZFBsdWdpbjogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBsb29rQXRQbHVnaW46IFZSTUxvb2tBdExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1ldGFQbHVnaW46IFZSTU1ldGFMb2FkZXJQbHVnaW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICBjb25zdCBoZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgICBjb25zdCBhdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuXG4gICAgdGhpcy5leHByZXNzaW9uUGx1Z2luID0gb3B0aW9ucz8uZXhwcmVzc2lvblBsdWdpbiA/PyBuZXcgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuZmlyc3RQZXJzb25QbHVnaW4gPSBvcHRpb25zPy5maXJzdFBlcnNvblBsdWdpbiA/PyBuZXcgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLmh1bWFub2lkUGx1Z2luID1cbiAgICAgIG9wdGlvbnM/Lmh1bWFub2lkUGx1Z2luID8/IG5ldyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCwgYXV0b1VwZGF0ZUh1bWFuQm9uZXMgfSk7XG4gICAgdGhpcy5sb29rQXRQbHVnaW4gPSBvcHRpb25zPy5sb29rQXRQbHVnaW4gPz8gbmV3IFZSTUxvb2tBdExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCB9KTtcbiAgICB0aGlzLm1ldGFQbHVnaW4gPSBvcHRpb25zPy5tZXRhUGx1Z2luID8/IG5ldyBWUk1NZXRhTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1ldGFQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuaHVtYW5vaWRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZXhwcmVzc2lvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5sb29rQXRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZmlyc3RQZXJzb25QbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuXG4gICAgY29uc3QgbWV0YSA9IGdsdGYudXNlckRhdGEudnJtTWV0YSBhcyBWUk1NZXRhIHwgbnVsbDtcbiAgICBjb25zdCBodW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCBudWxsO1xuXG4gICAgLy8gbWV0YSBhbmQgaHVtYW5vaWQgYXJlIHJlcXVpcmVkIHRvIGJlIGEgVlJNLlxuICAgIC8vIERvbid0IGNyZWF0ZSBWUk0gaWYgdGhleSBhcmUgbnVsbFxuICAgIGlmIChtZXRhICYmIGh1bWFub2lkKSB7XG4gICAgICBjb25zdCB2cm1Db3JlID0gbmV3IFZSTUNvcmUoe1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgZXhwcmVzc2lvbk1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgICAgIGZpcnN0UGVyc29uOiBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgbG9va0F0OiBnbHRmLnVzZXJEYXRhLnZybUxvb2tBdCxcbiAgICAgICAgbWV0YSxcbiAgICAgIH0pO1xuXG4gICAgICBnbHRmLnVzZXJEYXRhLnZybUNvcmUgPSB2cm1Db3JlO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCJfdjNBIiwiX3YzQiIsIl9xdWF0QSIsIl9xdWF0QiIsIlZFQzNfUE9TSVRJVkVfWiIsIl9ldWxlckEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQTtBQUNBO01BQ2EsYUFBYyxTQUFRLEtBQUssQ0FBQyxRQUFRO0lBNEUvQyxZQUFZLGNBQXNCO1FBQ2hDLEtBQUssRUFBRSxDQUFDOzs7O1FBbkVILFdBQU0sR0FBRyxHQUFHLENBQUM7Ozs7UUFLYixhQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2pCLGtCQUFhLEdBQThCLE1BQU0sQ0FBQzs7OztRQUtsRCxtQkFBYyxHQUE4QixNQUFNLENBQUM7Ozs7UUFLbkQsa0JBQWEsR0FBOEIsTUFBTSxDQUFDO1FBRWpELFdBQU0sR0FBd0IsRUFBRSxDQUFDO1FBK0N2QyxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixjQUFjLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQzs7UUFHckMsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7OztRQUc1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztLQUN0Qjs7Ozs7SUFqREQsSUFBVyxtQkFBbUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFBRTtZQUNsQyxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDdEM7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjthQUFNO1lBQ0wsT0FBTyxHQUFHLENBQUM7U0FDWjtLQUNGOzs7OztJQU1ELElBQVcsb0JBQW9CO1FBQzdCLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxPQUFPLEVBQUU7WUFDbkMsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLE9BQU8sRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDO1NBQ1o7S0FDRjs7Ozs7SUFNRCxJQUFXLG1CQUFtQjtRQUM1QixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFFO1lBQ2xDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUN0QzthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3BCO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQztTQUNaO0tBQ0Y7SUFlTSxPQUFPLENBQUMsSUFBdUI7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEI7Ozs7O0lBTU0sV0FBVyxDQUFDLE9BT2xCOztRQUNDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xGLFlBQVksVUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsVUFBVSxtQ0FBSSxHQUFHLENBQUM7UUFFM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0tBQy9EOzs7O0lBS00sa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7S0FDMUQ7OztBQzFISDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENB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
