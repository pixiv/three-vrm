/*!
 * @pixiv/three-vrm-core v2.1.0
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2024 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
import * as THREE from 'three';

// animationMixer の監視対象は、Scene の中に入っている必要がある。
// そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
class VRMExpression extends THREE.Object3D {
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

/******************************************************************************
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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
    constructor({ material, type, targetValue, targetAlpha, }) {
        this.material = material;
        this.type = type;
        this.targetValue = targetValue;
        this.targetAlpha = targetAlpha !== null && targetAlpha !== void 0 ? targetAlpha : 1.0;
        // init bind state
        const color = this._initColorBindState();
        const alpha = this._initAlphaBindState();
        this._state = { color, alpha };
    }
    applyWeight(weight) {
        const { color, alpha } = this._state;
        if (color != null) {
            const { propertyName, deltaValue } = color;
            const target = this.material[propertyName];
            if (target != undefined) {
                target.add(_color.copy(deltaValue).multiplyScalar(weight));
            }
        }
        if (alpha != null) {
            const { propertyName, deltaValue } = alpha;
            const target = this.material[propertyName];
            if (target != undefined) {
                this.material[propertyName] += deltaValue * weight;
            }
        }
    }
    clearAppliedWeight() {
        const { color, alpha } = this._state;
        if (color != null) {
            const { propertyName, initialValue } = color;
            const target = this.material[propertyName];
            if (target != undefined) {
                target.copy(initialValue);
            }
        }
        if (alpha != null) {
            const { propertyName, initialValue } = alpha;
            const target = this.material[propertyName];
            if (target != undefined) {
                this.material[propertyName] = initialValue;
            }
        }
    }
    _initColorBindState() {
        var _a, _b, _c;
        const { material, type, targetValue } = this;
        const propertyNameMap = this._getPropertyNameMap();
        const propertyName = (_b = (_a = propertyNameMap === null || propertyNameMap === void 0 ? void 0 : propertyNameMap[type]) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
        if (propertyName == null) {
            console.warn(`Tried to add a material color bind to the material ${(_c = material.name) !== null && _c !== void 0 ? _c : '(no name)'}, the type ${type} but the material or the type is not supported.`);
            return null;
        }
        const target = material[propertyName];
        const initialValue = target.clone();
        // 負の値を保持するためにColor.subを使わずに差分を計算する
        const deltaValue = new THREE.Color(targetValue.r - initialValue.r, targetValue.g - initialValue.g, targetValue.b - initialValue.b);
        return { propertyName, initialValue, deltaValue };
    }
    _initAlphaBindState() {
        var _a, _b, _c;
        const { material, type, targetAlpha } = this;
        const propertyNameMap = this._getPropertyNameMap();
        const propertyName = (_b = (_a = propertyNameMap === null || propertyNameMap === void 0 ? void 0 : propertyNameMap[type]) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
        if (propertyName == null && targetAlpha !== 1.0) {
            console.warn(`Tried to add a material alpha bind to the material ${(_c = material.name) !== null && _c !== void 0 ? _c : '(no name)'}, the type ${type} but the material or the type does not support alpha.`);
            return null;
        }
        if (propertyName == null) {
            return null;
        }
        const initialValue = material[propertyName];
        const deltaValue = targetAlpha - initialValue;
        return { propertyName, initialValue, deltaValue };
    }
    _getPropertyNameMap() {
        var _a, _b;
        return ((_b = (_a = Object.entries(VRMExpressionMaterialColorBind._propertyNameMapMap).find(([distinguisher]) => {
            return this.material[distinguisher] === true;
        })) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null);
    }
}
/**
 * Mapping of property names from VRMC/materialColorBinds.type to three.js/Material.
 * The first element stands for color channels, the second element stands for the alpha channel.
 * The second element can be null if the target property doesn't exist.
 */
// TODO: We might want to use the `satisfies` operator once we bump TS to 4.9 or higher
// See: https://github.com/pixiv/three-vrm/pull/1323#discussion_r1374020035
VRMExpressionMaterialColorBind._propertyNameMapMap = {
    isMeshStandardMaterial: {
        color: ['color', 'opacity'],
        emissionColor: ['emissive', null],
    },
    isMeshBasicMaterial: {
        color: ['color', 'opacity'],
    },
    isMToonMaterial: {
        color: ['color', 'opacity'],
        emissionColor: ['emissive', null],
        outlineColor: ['outlineColorFactor', null],
        matcapColor: ['matcapFactor', null],
        rimColor: ['parametricRimColorFactor', null],
        shadeColor: ['shadeColorFactor', null],
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
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMExpressionLoaderPlugin';
    }
    constructor(parser) {
        this.parser = parser;
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
                                targetAlpha: bind.targetValue[3],
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
                                weight: 0.01 * ((_d = bind.weight) !== null && _d !== void 0 ? _d : 100), // narrowing the range from [ 0.0 - 100.0 ] to [ 0.0 - 1.0 ]
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
                                offset.y = 1.0 - offset.y - scale.y;
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
                                    targetValue: new THREE.Color().fromArray(materialValue.targetValue),
                                    targetAlpha: materialValue.targetValue[3],
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
        const skinIndexAttr = geometry.getAttribute('skinIndex');
        const skinIndexAttrArray = skinIndexAttr instanceof THREE.GLBufferAttribute ? [] : skinIndexAttr.array;
        const skinIndex = [];
        for (let i = 0; i < skinIndexAttrArray.length; i += 4) {
            skinIndex.push([
                skinIndexAttrArray[i],
                skinIndexAttrArray[i + 1],
                skinIndexAttrArray[i + 2],
                skinIndexAttrArray[i + 3],
            ]);
        }
        const skinWeightAttr = geometry.getAttribute('skinWeight');
        const skinWeightAttrArray = skinWeightAttr instanceof THREE.GLBufferAttribute ? [] : skinWeightAttr.array;
        const skinWeight = [];
        for (let i = 0; i < skinWeightAttrArray.length; i += 4) {
            skinWeight.push([
                skinWeightAttrArray[i],
                skinWeightAttrArray[i + 1],
                skinWeightAttrArray[i + 2],
                skinWeightAttrArray[i + 3],
            ]);
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
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMFirstPersonLoaderPlugin';
    }
    constructor(parser) {
        this.parser = parser;
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
const _boneWorldPos = new THREE.Vector3();
/**
 * A class represents the normalized Rig of a VRM.
 */
class VRMHumanoidRig extends VRMRig {
    static _setupTransforms(modelRig) {
        const root = new THREE.Object3D();
        root.name = 'VRMHumanoidRig';
        // store boneWorldPositions, boneWorldRotations, and parentWorldRotations
        const boneWorldPositions = {};
        const boneRotations = {};
        const parentWorldRotations = {};
        VRMHumanBoneList.forEach((boneName) => {
            var _a;
            const boneNode = modelRig.getBoneNode(boneName);
            if (boneNode) {
                const boneWorldPosition = new THREE.Vector3();
                const boneWorldRotation = new THREE.Quaternion();
                boneNode.updateWorldMatrix(true, false);
                boneNode.matrixWorld.decompose(boneWorldPosition, boneWorldRotation, _v3A$2);
                boneWorldPositions[boneName] = boneWorldPosition;
                boneRotations[boneName] = boneNode.quaternion.clone();
                const parentWorldRotation = new THREE.Quaternion();
                (_a = boneNode.parent) === null || _a === void 0 ? void 0 : _a.matrixWorld.decompose(_v3A$2, parentWorldRotation, _v3A$2);
                parentWorldRotations[boneName] = parentWorldRotation;
            }
        });
        // build rig hierarchy + store parentWorldRotations
        const rigBones = {};
        VRMHumanBoneList.forEach((boneName) => {
            var _a;
            const boneNode = modelRig.getBoneNode(boneName);
            if (boneNode) {
                const boneWorldPosition = boneWorldPositions[boneName];
                // see the nearest parent position
                let currentBoneName = boneName;
                let parentBoneWorldPosition;
                while (parentBoneWorldPosition == null) {
                    currentBoneName = VRMHumanBoneParentMap[currentBoneName];
                    if (currentBoneName == null) {
                        break;
                    }
                    parentBoneWorldPosition = boneWorldPositions[currentBoneName];
                }
                // add to hierarchy
                const rigBoneNode = new THREE.Object3D();
                rigBoneNode.name = 'Normalized_' + boneNode.name;
                const parentRigBoneNode = (currentBoneName ? (_a = rigBones[currentBoneName]) === null || _a === void 0 ? void 0 : _a.node : root);
                parentRigBoneNode.add(rigBoneNode);
                rigBoneNode.position.copy(boneWorldPosition);
                if (parentBoneWorldPosition) {
                    rigBoneNode.position.sub(parentBoneWorldPosition);
                }
                rigBones[boneName] = { node: rigBoneNode };
            }
        });
        return {
            rigBones: rigBones,
            root,
            parentWorldRotations,
            boneRotations,
        };
    }
    constructor(humanoid) {
        const { rigBones, root, parentWorldRotations, boneRotations } = VRMHumanoidRig._setupTransforms(humanoid);
        super(rigBones);
        this.original = humanoid;
        this.root = root;
        this._parentWorldRotations = parentWorldRotations;
        this._boneRotations = boneRotations;
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
                    const boneWorldPosition = rigBoneNode.getWorldPosition(_boneWorldPos);
                    boneNode.parent.updateWorldMatrix(true, false);
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
        return this._normalizedHumanBones.resetPose();
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
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMHumanoidLoaderPlugin';
    }
    constructor(parser, options) {
        this.parser = parser;
        this.helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
        this.autoUpdateHumanBones = options === null || options === void 0 ? void 0 : options.autoUpdateHumanBones;
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
 * A replacement of `Object3D.getWorldQuaternion`.
 * Extract the world quaternion of an object from its world space matrix, without calling `Object3D.updateWorldMatrix`.
 * Use this when you're sure that the world matrix is up-to-date.
 *
 * @param object The object
 * @param out A target quaternion
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
     * Get its yaw-pitch angles as an `Euler`.
     * Does NOT consider {@link faceFront}; it returns `Euler(0, 0, 0; "YXZ")` by default regardless of the faceFront value.
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
     * Reset the lookAt direction (yaw and pitch) to the initial direction.
     */
    reset() {
        this._yaw = 0.0;
        this._pitch = 0.0;
        this._needsUpdate = true;
    }
    /**
     * Get its lookAt position in world coordinate.
     *
     * @param target A target `THREE.Vector3`
     */
    getLookAtWorldPosition(target) {
        const head = this.humanoid.getRawBoneNode('head');
        return target.copy(this.offsetFromHeadBone).applyMatrix4(head.matrixWorld);
    }
    /**
     * Get its lookAt rotation in world coordinate.
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
     * Set its lookAt target position.
     *
     * Note that its result will be instantly overwritten if {@link VRMLookAtHead.autoUpdate} is enabled.
     *
     * If you want to track an object continuously, you might want to use {@link target} instead.
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
     * If {@link autoUpdate} is enabled, this will make it look at the {@link target}.
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
        const rightEye = this.humanoid.getRawBoneNode('rightEye');
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
 * The minimum permitted value for {@link V1VRMSchema.LookAtRangeMap.inputMaxValue}.
 * If the given value is smaller than this, the loader shows a warning and clamps up the value.
 */
const INPUT_MAX_VALUE_MINIMUM = 0.01;
/**
 * A plugin of GLTFLoader that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
class VRMLookAtLoaderPlugin {
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMLookAtLoaderPlugin';
    }
    constructor(parser, options) {
        this.parser = parser;
        this.helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
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
        let inputMaxValue = (_a = schemaRangeMap === null || schemaRangeMap === void 0 ? void 0 : schemaRangeMap.inputMaxValue) !== null && _a !== void 0 ? _a : 90.0;
        const outputScale = (_b = schemaRangeMap === null || schemaRangeMap === void 0 ? void 0 : schemaRangeMap.outputScale) !== null && _b !== void 0 ? _b : defaultOutputScale;
        // It might cause NaN when `inputMaxValue` is too small
        // which makes the mesh of the head disappear
        // See: https://github.com/pixiv/three-vrm/issues/1201
        if (inputMaxValue < INPUT_MAX_VALUE_MINIMUM) {
            console.warn('VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!');
            inputMaxValue = INPUT_MAX_VALUE_MINIMUM;
        }
        return new VRMLookAtRangeMap(inputMaxValue, outputScale);
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
        let xRange = (_a = schemaDegreeMap === null || schemaDegreeMap === void 0 ? void 0 : schemaDegreeMap.xRange) !== null && _a !== void 0 ? _a : 90.0;
        const yRange = (_b = schemaDegreeMap === null || schemaDegreeMap === void 0 ? void 0 : schemaDegreeMap.yRange) !== null && _b !== void 0 ? _b : defaultOutputScale;
        // It might cause NaN when `xRange` is too small
        // which makes the mesh of the head disappear
        // See: https://github.com/pixiv/three-vrm/issues/1201
        if (xRange < INPUT_MAX_VALUE_MINIMUM) {
            console.warn('VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!');
            xRange = INPUT_MAX_VALUE_MINIMUM;
        }
        return new VRMLookAtRangeMap(xRange, yRange);
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
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMMetaLoaderPlugin';
    }
    constructor(parser, options) {
        var _a, _b, _c;
        this.parser = parser;
        this.needThumbnailImage = (_a = options === null || options === void 0 ? void 0 : options.needThumbnailImage) !== null && _a !== void 0 ? _a : true;
        this.acceptLicenseUrls = (_b = options === null || options === void 0 ? void 0 : options.acceptLicenseUrls) !== null && _b !== void 0 ? _b : ['https://vrm.dev/licenses/1.0/'];
        this.acceptV0Meta = (_c = options === null || options === void 0 ? void 0 : options.acceptV0Meta) !== null && _c !== void 0 ? _c : true;
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
    get name() {
        // We should use the extension name instead but we have multiple plugins for an extension...
        return 'VRMC_vrm';
    }
    constructor(parser, options) {
        var _a, _b, _c, _d, _e;
        this.parser = parser;
        const helperRoot = options === null || options === void 0 ? void 0 : options.helperRoot;
        const autoUpdateHumanBones = options === null || options === void 0 ? void 0 : options.autoUpdateHumanBones;
        this.expressionPlugin = (_a = options === null || options === void 0 ? void 0 : options.expressionPlugin) !== null && _a !== void 0 ? _a : new VRMExpressionLoaderPlugin(parser);
        this.firstPersonPlugin = (_b = options === null || options === void 0 ? void 0 : options.firstPersonPlugin) !== null && _b !== void 0 ? _b : new VRMFirstPersonLoaderPlugin(parser);
        this.humanoidPlugin =
            (_c = options === null || options === void 0 ? void 0 : options.humanoidPlugin) !== null && _c !== void 0 ? _c : new VRMHumanoidLoaderPlugin(parser, { helperRoot, autoUpdateHumanBones });
        this.lookAtPlugin = (_d = options === null || options === void 0 ? void 0 : options.lookAtPlugin) !== null && _d !== void 0 ? _d : new VRMLookAtLoaderPlugin(parser, { helperRoot });
        this.metaPlugin = (_e = options === null || options === void 0 ? void 0 : options.metaPlugin) !== null && _e !== void 0 ? _e : new VRMMetaLoaderPlugin(parser);
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

export { VRMCore, VRMCoreLoaderPlugin, VRMExpression, VRMExpressionLoaderPlugin, VRMExpressionManager, VRMExpressionMaterialColorBind, VRMExpressionMaterialColorType, VRMExpressionMorphTargetBind, VRMExpressionOverrideType, VRMExpressionPresetName, VRMExpressionTextureTransformBind, VRMFirstPerson, VRMFirstPersonLoaderPlugin, VRMFirstPersonMeshAnnotationType, VRMHumanBoneList, VRMHumanBoneName, VRMHumanBoneParentMap, VRMHumanoid, VRMHumanoidHelper, VRMHumanoidLoaderPlugin, VRMLookAt, VRMLookAtBoneApplier, VRMLookAtExpressionApplier, VRMLookAtHelper, VRMLookAtLoaderPlugin, VRMLookAtRangeMap, VRMLookAtTypeName, VRMMetaLoaderPlugin, VRMRequiredHumanBoneName };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLWNvcmUubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbi50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUudHMiLCIuLi9zcmMvdXRpbHMvZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4LnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25QcmVzZXROYW1lLnRzIiwiLi4vc3JjL3V0aWxzL3NhdHVyYXRlLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYW5hZ2VyLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZC50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlLnRzIiwiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLnRzIiwiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlLnRzIiwiLi4vc3JjL2h1bWFub2lkL2hlbHBlcnMvVlJNSHVtYW5vaWRIZWxwZXIudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lTGlzdC50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVOYW1lLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFuQm9uZVBhcmVudE1hcC50cyIsIi4uL3NyYy91dGlscy9xdWF0SW52ZXJ0Q29tcGF0LnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTVJpZy50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZFJpZy50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZC50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4udHMiLCIuLi9zcmMvbG9va0F0L2hlbHBlcnMvdXRpbHMvRmFuQnVmZmVyR2VvbWV0cnkudHMiLCIuLi9zcmMvbG9va0F0L2hlbHBlcnMvdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LnRzIiwiLi4vc3JjL2xvb2tBdC9oZWxwZXJzL1ZSTUxvb2tBdEhlbHBlci50cyIsIi4uL3NyYy91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlLnRzIiwiLi4vc3JjL2xvb2tBdC91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlLnRzIiwiLi4vc3JjL2xvb2tBdC91dGlscy9zYW5pdGl6ZUFuZ2xlLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXQudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdEJvbmVBcHBsaWVyLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllci50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0UmFuZ2VNYXAudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0VHlwZU5hbWUudHMiLCIuLi9zcmMvdXRpbHMvcmVzb2x2ZVVSTC50cyIsIi4uL3NyYy9tZXRhL1ZSTU1ldGFMb2FkZXJQbHVnaW4udHMiLCIuLi9zcmMvVlJNQ29yZS50cyIsIi4uL3NyYy9WUk1Db3JlTG9hZGVyUGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUnO1xuXG4vLyBhbmltYXRpb25NaXhlciDjga7nm6Poppblr77osaHjga/jgIFTY2VuZSDjga7kuK3jgavlhaXjgaPjgabjgYTjgovlv4XopoHjgYzjgYLjgovjgIJcbi8vIOOBneOBruOBn+OCgeOAgeihqOekuuOCquODluOCuOOCp+OCr+ODiOOBp+OBr+OBquOBhOOBkeOCjOOBqeOAgU9iamVjdDNEIOOCkue2meaJv+OBl+OBpiBTY2VuZSDjgavmipXlhaXjgafjgY3jgovjgojjgYbjgavjgZnjgovjgIJcbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAqIERpc3Rpbmd1aXNoZWQgd2l0aCBgbmFtZWAgc2luY2UgYG5hbWVgIHdpbGwgYmUgY29uZmxpY3RlZCB3aXRoIE9iamVjdDNELlxuICAgKi9cbiAgcHVibGljIGV4cHJlc3Npb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHdlaWdodCBvZiB0aGUgZXhwcmVzc2lvbi5cbiAgICovXG4gIHB1YmxpYyB3ZWlnaHQgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEludGVycHJldCB2YWx1ZXMgZ3JlYXRlciB0aGFuIDAuNSBhcyAxLjAsIG9ydGhlcndpc2UgMC4wLlxuICAgKi9cbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBibGluayBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZUJsaW5rOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlTG9va0F0OiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0aGUgZXhwcmVzc2lvbiBvdmVycmlkZXMgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVNb3V0aDogVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9ICdub25lJztcblxuICBwcml2YXRlIF9iaW5kczogVlJNRXhwcmVzc2lvbkJpbmRbXSA9IFtdO1xuXG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGU6IHN0cmluZyB8ICdWUk1FeHByZXNzaW9uJztcblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBibGluayBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVCbGlua0Ftb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlQmxpbmsgPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLndlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGxvb2tBdCBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVMb29rQXRBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMud2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUxvb2tBdCA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIG1vdXRoIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZU1vdXRoQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVNb3V0aCA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMud2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZXhwcmVzc2lvbk5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm5hbWUgPSBgVlJNRXhwcmVzc2lvbl8ke2V4cHJlc3Npb25OYW1lfWA7XG4gICAgdGhpcy5leHByZXNzaW9uTmFtZSA9IGV4cHJlc3Npb25OYW1lO1xuXG4gICAgLy8gdHJhdmVyc2Ug5pmC44Gu5pWR5riI5omL5q6144Go44GX44GmIE9iamVjdDNEIOOBp+OBr+OBquOBhOOBk+OBqOOCkuaYjuekuuOBl+OBpuOBiuOBj1xuICAgIHRoaXMudHlwZSA9ICdWUk1FeHByZXNzaW9uJztcblxuICAgIC8vIOihqOekuuebrueahOOBruOCquODluOCuOOCp+OCr+ODiOOBp+OBr+OBquOBhOOBruOBp+OAgeiyoOiNt+i7vea4m+OBruOBn+OCgeOBqyB2aXNpYmxlIOOCkiBmYWxzZSDjgavjgZfjgabjgYrjgY/jgIJcbiAgICAvLyDjgZPjgozjgavjgojjgorjgIHjgZPjga7jgqTjg7Pjgrnjgr/jg7Pjgrnjgavlr77jgZnjgovmr47jg5Xjg6zjg7zjg6Djga4gbWF0cml4IOiHquWLleioiOeul+OCkuecgeeVpeOBp+OBjeOCi+OAglxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFkZEJpbmQoYmluZDogVlJNRXhwcmVzc2lvbkJpbmQpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5wdXNoKGJpbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQob3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGEgdmFsdWUgdG8gaXRzIHdlaWdodCB0byBhcHBseS5cbiAgICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBvdmVycmlkaW5nIGFuIGV4cHJlc3Npb24gd2VpZ2h0IGJ5IGFub3RoZXIgZXhwcmVzc2lvbi5cbiAgICAgKiBTZWUgYWxzbzoge0BsaW5rIG92ZXJyaWRlQmxpbmt9LCB7QGxpbmsgb3ZlcnJpZGVMb29rQXR9LCB7QGxpbmsgb3ZlcnJpZGVNb3V0aH1cbiAgICAgKi9cbiAgICBtdWx0aXBsaWVyPzogbnVtYmVyO1xuICB9KTogdm9pZCB7XG4gICAgbGV0IGFjdHVhbFdlaWdodCA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPD0gMC41ID8gMC4wIDogMS4wKSA6IHRoaXMud2VpZ2h0O1xuICAgIGFjdHVhbFdlaWdodCAqPSBvcHRpb25zPy5tdWx0aXBsaWVyID8/IDEuMDtcblxuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuYXBwbHlXZWlnaHQoYWN0dWFsV2VpZ2h0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgcHJldmlvdXNseSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLmZvckVhY2goKGJpbmQpID0+IGJpbmQuY2xlYXJBcHBsaWVkV2VpZ2h0KCkpO1xuICB9XG59XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG59O1xyXG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcblxuLyoqXG4gKiBHZXQgYSBtYXRlcmlhbCBkZWZpbml0aW9uIGluZGV4IG9mIGdsVEYgZnJvbSBhc3NvY2lhdGVkIG1hdGVyaWFsLlxuICogSXQncyBiYXNpY2FsbHkgYSBjb21hdCBjb2RlIGJldHdlZW4gVGhyZWUuanMgcjEzMyBvciBhYm92ZSBhbmQgcHJldmlvdXMgdmVyc2lvbnMuXG4gKiBAcGFyYW0gcGFyc2VyIEdMVEZQYXJzZXJcbiAqIEBwYXJhbSBtYXRlcmlhbCBBIG1hdGVyaWFsIG9mIGdsdGZcbiAqIEByZXR1cm5zIE1hdGVyaWFsIGRlZmluaXRpb24gaW5kZXggb2YgZ2xURlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4KHBhcnNlcjogR0xURlBhcnNlciwgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gIGxldCBpbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgaWYgKHRocmVlUmV2aXNpb24gPj0gMTMzKSB7XG4gICAgaW5kZXggPSBwYXJzZXIuYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk/Lm1hdGVyaWFscyA/PyBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIENPTVBBVDogc3RydWN0dXJlIG9mIGBwYXJzZXIuYXNzb2NpYXRpb25zYCBoYXMgYmVlbiBjaGFuZ2VkIEAgcjEzM1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIxNzM3XG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvY29tbWl0LzUyNDY2NzZlNDc5YjYxYTlmZjJkYjcxZGY0MTE5ZjZmMTQ2MjU4MGRcbiAgICB0eXBlIEdMVEZSZWZlcmVuY2VQcmUxMzMgPSB7XG4gICAgICB0eXBlOiAnbWF0ZXJpYWxzJyB8ICdub2RlcycgfCAndGV4dHVyZXMnIHwgJ21lc2hlcyc7XG4gICAgICBpbmRleDogbnVtYmVyO1xuICAgIH07XG5cbiAgICB0eXBlIEdMVEZBc3NvY2lhdGlvbnNQcmUxMzMgPSBNYXA8VEhSRUUuT2JqZWN0M0QgfCBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLlRleHR1cmUsIEdMVEZSZWZlcmVuY2VQcmUxMzM+O1xuXG4gICAgY29uc3QgYXNzb2NpYXRpb25zID0gcGFyc2VyLmFzc29jaWF0aW9ucyBhcyBHTFRGQXNzb2NpYXRpb25zUHJlMTMzO1xuXG4gICAgY29uc3QgcmVmZXJlbmNlID0gYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk7XG5cbiAgICBpZiAocmVmZXJlbmNlPy50eXBlID09PSAnbWF0ZXJpYWxzJykge1xuICAgICAgaW5kZXggPSByZWZlcmVuY2UuaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHtcbiAgQWE6ICdhYScsXG4gIEloOiAnaWgnLFxuICBPdTogJ291JyxcbiAgRWU6ICdlZScsXG4gIE9oOiAnb2gnLFxuICBCbGluazogJ2JsaW5rJyxcbiAgSGFwcHk6ICdoYXBweScsXG4gIEFuZ3J5OiAnYW5ncnknLFxuICBTYWQ6ICdzYWQnLFxuICBSZWxheGVkOiAncmVsYXhlZCcsXG4gIExvb2tVcDogJ2xvb2tVcCcsXG4gIFN1cnByaXNlZDogJ3N1cnByaXNlZCcsXG4gIExvb2tEb3duOiAnbG9va0Rvd24nLFxuICBMb29rTGVmdDogJ2xvb2tMZWZ0JyxcbiAgTG9va1JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgQmxpbmtMZWZ0OiAnYmxpbmtMZWZ0JyxcbiAgQmxpbmtSaWdodDogJ2JsaW5rUmlnaHQnLFxuICBOZXV0cmFsOiAnbmV1dHJhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZVtrZXlvZiB0eXBlb2YgVlJNRXhwcmVzc2lvblByZXNldE5hbWVdO1xuIiwiLyoqXG4gKiBDbGFtcCB0aGUgaW5wdXQgdmFsdWUgd2l0aGluIFswLjAgLSAxLjBdLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdHVyYXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEuMCksIDAuMCk7XG59XG4iLCJpbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rfS5cbiAgICovXG4gIHB1YmxpYyBibGlua0V4cHJlc3Npb25OYW1lcyA9IFsnYmxpbmsnLCAnYmxpbmtMZWZ0JywgJ2JsaW5rUmlnaHQnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0RXhwcmVzc2lvbk5hbWVzID0gWydsb29rTGVmdCcsICdsb29rUmlnaHQnLCAnbG9va1VwJywgJ2xvb2tEb3duJ107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aH0uXG4gICAqL1xuICBwdWJsaWMgbW91dGhFeHByZXNzaW9uTmFtZXMgPSBbJ2FhJywgJ2VlJywgJ2loJywgJ29oJywgJ291J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHtAbGluayBWUk1FeHByZXNzaW9ufS5cbiAgICogV2hlbiB5b3Ugd2FudCB0byByZWdpc3RlciBleHByZXNzaW9ucywgdXNlIHtAbGluayByZWdpc3RlckV4cHJlc3Npb259XG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uczogVlJNRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogVlJNRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcbiAgcHVibGljIGdldCBleHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2V4cHJlc3Npb25NYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIGN1c3RvbSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJlc2V0RXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZSBhcyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBwcmVzZXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1c3RvbUV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRXhwcmVzc2lvbk1hbmFnZXIpOiB0aGlzIHtcbiAgICAvLyBmaXJzdCB1bnJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBpdCBoYXNcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICAgIGV4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIHJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBvZiB0aGUgc291cmNlXG4gICAgc291cmNlLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgcmVtYWluaW5nIG1lbWJlcnNcbiAgICB0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVnaXN0ZXJlZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCBhbiBleHByZXNzaW9uLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvciBwcmVzZXQgbmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb24obmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBWUk1FeHByZXNzaW9uIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25NYXBbbmFtZV0gPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gdGhhdCBkZXNjcmliZXMgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLnB1c2goZXhwcmVzc2lvbik7XG4gICAgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB5b3Ugd2FudCB0byB1bnJlZ2lzdGVyXG4gICAqL1xuICBwdWJsaWMgdW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXhwcmVzc2lvbnMuaW5kZXhPZihleHByZXNzaW9uKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25NYW5hZ2VyOiBUaGUgc3BlY2lmaWVkIGV4cHJlc3Npb25zIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgZG9lc24ndCBoYXZlIGFuIGV4cHJlc3Npb24gb2YgZ2l2ZW4gbmFtZSwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgZXhwcmVzc2lvbiB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhbiBleHByZXNzaW9uIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXIuZ2V0RXhwcmVzc2lvblRyYWNrTmFtZSggJ2JsaW5rJyApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvblRyYWNrTmFtZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24gPyBgJHtleHByZXNzaW9uLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBvdmVycmlkZSBjZXJ0YWluIGV4cHJlc3Npb25zXG4gICAgY29uc3Qgd2VpZ2h0TXVsdGlwbGllcnMgPSB0aGlzLl9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpO1xuXG4gICAgLy8gcmVzZXQgZXhwcmVzc2lvbiBiaW5kcyBmaXJzdFxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24uY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIGFwcGx5IGJpbmRzXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IG11bHRpcGxpZXIgPSAxLjA7XG4gICAgICBjb25zdCBuYW1lID0gZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZTtcblxuICAgICAgaWYgKHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5ibGluaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubG9va0F0O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLm1vdXRoO1xuICAgICAgfVxuXG4gICAgICBleHByZXNzaW9uLmFwcGx5V2VpZ2h0KHsgbXVsdGlwbGllciB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3VtIG9mIG92ZXJyaWRlIGFtb3VudHMgdG8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBtdWx0aXBseSB3ZWlnaHRzIG9mIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpOiB7XG4gICAgYmxpbms6IG51bWJlcjtcbiAgICBsb29rQXQ6IG51bWJlcjtcbiAgICBtb3V0aDogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgYmxpbmsgPSAxLjA7XG4gICAgbGV0IGxvb2tBdCA9IDEuMDtcbiAgICBsZXQgbW91dGggPSAxLjA7XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBibGluayAtPSBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmtBbW91bnQ7XG4gICAgICBsb29rQXQgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdEFtb3VudDtcbiAgICAgIG1vdXRoIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aEFtb3VudDtcbiAgICB9KTtcblxuICAgIGJsaW5rID0gTWF0aC5tYXgoMC4wLCBibGluayk7XG4gICAgbG9va0F0ID0gTWF0aC5tYXgoMC4wLCBsb29rQXQpO1xuICAgIG1vdXRoID0gTWF0aC5tYXgoMC4wLCBtb3V0aCk7XG5cbiAgICByZXR1cm4geyBibGluaywgbG9va0F0LCBtb3V0aCB9O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSA9IHtcbiAgQ29sb3I6ICdjb2xvcicsXG4gIEVtaXNzaW9uQ29sb3I6ICdlbWlzc2lvbkNvbG9yJyxcbiAgU2hhZGVDb2xvcjogJ3NoYWRlQ29sb3InLFxuICBNYXRjYXBDb2xvcjogJ21hdGNhcENvbG9yJyxcbiAgUmltQ29sb3I6ICdyaW1Db2xvcicsXG4gIE91dGxpbmVDb2xvcjogJ291dGxpbmVDb2xvcicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgPVxuICB0eXBlb2YgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdO1xuXG5leHBvcnQgY29uc3QgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcDogeyBba2V5OiBzdHJpbmddOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfCB1bmRlZmluZWQgfSA9IHtcbiAgX0NvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuQ29sb3IsXG4gIF9FbWlzc2lvbkNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuRW1pc3Npb25Db2xvcixcbiAgX1NoYWRlQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5TaGFkZUNvbG9yLFxuICBfUmltQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5SaW1Db2xvcixcbiAgX091dGxpbmVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLk91dGxpbmVDb2xvcixcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlJztcblxuY29uc3QgX2NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG5cbmludGVyZmFjZSBDb2xvckJpbmRTdGF0ZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBpbml0aWFsVmFsdWU6IFRIUkVFLkNvbG9yO1xuICBkZWx0YVZhbHVlOiBUSFJFRS5Db2xvcjtcbn1cblxuaW50ZXJmYWNlIEFscGhhQmluZFN0YXRlIHtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGluaXRpYWxWYWx1ZTogbnVtYmVyO1xuICBkZWx0YVZhbHVlOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBCaW5kU3RhdGUge1xuICBjb2xvcjogQ29sb3JCaW5kU3RhdGUgfCBudWxsO1xuICBhbHBoYTogQWxwaGFCaW5kU3RhdGUgfCBudWxsO1xufVxuXG4vKipcbiAqIEEgYmluZCBvZiBleHByZXNzaW9uIGluZmx1ZW5jZXMgdG8gYSBtYXRlcmlhbCBjb2xvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgLyoqXG4gICAqIE1hcHBpbmcgb2YgcHJvcGVydHkgbmFtZXMgZnJvbSBWUk1DL21hdGVyaWFsQ29sb3JCaW5kcy50eXBlIHRvIHRocmVlLmpzL01hdGVyaWFsLlxuICAgKiBUaGUgZmlyc3QgZWxlbWVudCBzdGFuZHMgZm9yIGNvbG9yIGNoYW5uZWxzLCB0aGUgc2Vjb25kIGVsZW1lbnQgc3RhbmRzIGZvciB0aGUgYWxwaGEgY2hhbm5lbC5cbiAgICogVGhlIHNlY29uZCBlbGVtZW50IGNhbiBiZSBudWxsIGlmIHRoZSB0YXJnZXQgcHJvcGVydHkgZG9lc24ndCBleGlzdC5cbiAgICovXG4gIC8vIFRPRE86IFdlIG1pZ2h0IHdhbnQgdG8gdXNlIHRoZSBgc2F0aXNmaWVzYCBvcGVyYXRvciBvbmNlIHdlIGJ1bXAgVFMgdG8gNC45IG9yIGhpZ2hlclxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9waXhpdi90aHJlZS12cm0vcHVsbC8xMzIzI2Rpc2N1c3Npb25fcjEzNzQwMjAwMzVcbiAgcHJpdmF0ZSBzdGF0aWMgX3Byb3BlcnR5TmFtZU1hcE1hcDoge1xuICAgIFtkaXN0aW5ndWlzaGVyOiBzdHJpbmddOiB7IFt0eXBlIGluIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZV0/OiByZWFkb25seSBbc3RyaW5nLCBzdHJpbmcgfCBudWxsXSB9O1xuICB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICAgIGVtaXNzaW9uQ29sb3I6IFsnZW1pc3NpdmUnLCBudWxsXSxcbiAgICB9LFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiBbJ2NvbG9yJywgJ29wYWNpdHknXSxcbiAgICB9LFxuICAgIGlzTVRvb25NYXRlcmlhbDoge1xuICAgICAgY29sb3I6IFsnY29sb3InLCAnb3BhY2l0eSddLFxuICAgICAgZW1pc3Npb25Db2xvcjogWydlbWlzc2l2ZScsIG51bGxdLFxuICAgICAgb3V0bGluZUNvbG9yOiBbJ291dGxpbmVDb2xvckZhY3RvcicsIG51bGxdLFxuICAgICAgbWF0Y2FwQ29sb3I6IFsnbWF0Y2FwRmFjdG9yJywgbnVsbF0sXG4gICAgICByaW1Db2xvcjogWydwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLCBudWxsXSxcbiAgICAgIHNoYWRlQ29sb3I6IFsnc2hhZGVDb2xvckZhY3RvcicsIG51bGxdLFxuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdGFyZ2V0IHByb3BlcnR5IG9mIHRoZSBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGU7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGFscGhhLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldEFscGhhOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEl0cyBiaW5kaW5nIHN0YXRlLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCB0aGUgdGFyZ2V0IHByb3BlcnR5IGluIHRoZSBjb25zdHJ1Y3RvciwgZWFjaCBwcm9wZXJ0eSB3aWxsIGJlIG51bGwgaW5zdGVhZC5cbiAgICovXG4gIHByaXZhdGUgX3N0YXRlOiBCaW5kU3RhdGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBtYXRlcmlhbCxcbiAgICB0eXBlLFxuICAgIHRhcmdldFZhbHVlLFxuICAgIHRhcmdldEFscGhhLFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgdGFyZ2V0IHByb3BlcnR5IG9mIHRoZSBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICB0eXBlOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IGNvbG9yLlxuICAgICAqL1xuICAgIHRhcmdldFZhbHVlOiBUSFJFRS5Db2xvcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgYWxwaGEuXG4gICAgICovXG4gICAgdGFyZ2V0QWxwaGE/OiBudW1iZXI7XG4gIH0pIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnRhcmdldFZhbHVlID0gdGFyZ2V0VmFsdWU7XG4gICAgdGhpcy50YXJnZXRBbHBoYSA9IHRhcmdldEFscGhhID8/IDEuMDtcblxuICAgIC8vIGluaXQgYmluZCBzdGF0ZVxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5faW5pdENvbG9yQmluZFN0YXRlKCk7XG4gICAgY29uc3QgYWxwaGEgPSB0aGlzLl9pbml0QWxwaGFCaW5kU3RhdGUoKTtcbiAgICB0aGlzLl9zdGF0ZSA9IHsgY29sb3IsIGFscGhhIH07XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbG9yLCBhbHBoYSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBpZiAoY29sb3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGRlbHRhVmFsdWUgfSA9IGNvbG9yO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXQuYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbHBoYSAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgZGVsdGFWYWx1ZSB9ID0gYWxwaGE7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAoKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcikgKz0gZGVsdGFWYWx1ZSAqIHdlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29sb3IsIGFscGhhIH0gPSB0aGlzLl9zdGF0ZTtcblxuICAgIGlmIChjb2xvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlIH0gPSBjb2xvcjtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuICAgICAgaWYgKHRhcmdldCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0LmNvcHkoaW5pdGlhbFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWxwaGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgeyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSB9ID0gYWxwaGE7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBudW1iZXI7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAoKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcikgPSBpbml0aWFsVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbG9yQmluZFN0YXRlKCk6IENvbG9yQmluZFN0YXRlIHwgbnVsbCB7XG4gICAgY29uc3QgeyBtYXRlcmlhbCwgdHlwZSwgdGFyZ2V0VmFsdWUgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVNYXAgPSB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVNYXAoKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWVNYXA/Llt0eXBlXT8uWzBdID8/IG51bGw7XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIG1hdGVyaWFsIGNvbG9yIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9LCB0aGUgdHlwZSAke3R5cGV9IGJ1dCB0aGUgbWF0ZXJpYWwgb3IgdGhlIHR5cGUgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcblxuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHRhcmdldC5jbG9uZSgpO1xuXG4gICAgLy8g6LKg44Gu5YCk44KS5L+d5oyB44GZ44KL44Gf44KB44GrQ29sb3Iuc3Vi44KS5L2/44KP44Ga44Gr5beu5YiG44KS6KiI566X44GZ44KLXG4gICAgY29uc3QgZGVsdGFWYWx1ZSA9IG5ldyBUSFJFRS5Db2xvcihcbiAgICAgIHRhcmdldFZhbHVlLnIgLSBpbml0aWFsVmFsdWUucixcbiAgICAgIHRhcmdldFZhbHVlLmcgLSBpbml0aWFsVmFsdWUuZyxcbiAgICAgIHRhcmdldFZhbHVlLmIgLSBpbml0aWFsVmFsdWUuYixcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUsIGRlbHRhVmFsdWUgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBbHBoYUJpbmRTdGF0ZSgpOiBBbHBoYUJpbmRTdGF0ZSB8IG51bGwge1xuICAgIGNvbnN0IHsgbWF0ZXJpYWwsIHR5cGUsIHRhcmdldEFscGhhIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gdGhpcy5fZ2V0UHJvcGVydHlOYW1lTWFwKCk7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lTWFwPy5bdHlwZV0/LlsxXSA/PyBudWxsO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsICYmIHRhcmdldEFscGhhICE9PSAxLjApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIG1hdGVyaWFsIGFscGhhIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9LCB0aGUgdHlwZSAke3R5cGV9IGJ1dCB0aGUgbWF0ZXJpYWwgb3IgdGhlIHR5cGUgZG9lcyBub3Qgc3VwcG9ydCBhbHBoYS5gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHByb3BlcnR5TmFtZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsVmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcjtcblxuICAgIGNvbnN0IGRlbHRhVmFsdWUgPSB0YXJnZXRBbHBoYSAtIGluaXRpYWxWYWx1ZTtcblxuICAgIHJldHVybiB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlLCBkZWx0YVZhbHVlIH07XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcm9wZXJ0eU5hbWVNYXAoKTpcbiAgICB8IHsgW3R5cGUgaW4gVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXT86IHJlYWRvbmx5IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdIH1cbiAgICB8IG51bGwge1xuICAgIHJldHVybiAoXG4gICAgICBPYmplY3QuZW50cmllcyhWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQuX3Byb3BlcnR5TmFtZU1hcE1hcCkuZmluZCgoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW2Rpc3Rpbmd1aXNoZXJdID09PSB0cnVlO1xuICAgICAgfSk/LlsxXSA/PyBudWxsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5cbi8qKlxuICogQSBiaW5kIG9mIHtAbGluayBWUk1FeHByZXNzaW9ufSBpbmZsdWVuY2VzIHRvIG1vcnBoIHRhcmdldHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICAvKipcbiAgICogVGhlIG1lc2ggcHJpbWl0aXZlcyB0aGF0IGF0dGFjaGVkIHRvIHRhcmdldCBtZXNoLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBtb3JwaCB0YXJnZXQgaW4gdGhlIG1lc2guXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHdlaWdodCB2YWx1ZSBvZiB0YXJnZXQgbW9ycGggdGFyZ2V0LiBSYW5naW5nIGluIFswLjAgLSAxLjBdLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHdlaWdodDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgcHJpbWl0aXZlcyxcbiAgICBpbmRleCxcbiAgICB3ZWlnaHQsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbWVzaCBwcmltaXRpdmVzIHRoYXQgYXR0YWNoZWQgdG8gdGFyZ2V0IG1lc2guXG4gICAgICovXG4gICAgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluZGV4IG9mIHRoZSBtb3JwaCB0YXJnZXQgaW4gdGhlIG1lc2guXG4gICAgICovXG4gICAgaW5kZXg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB3ZWlnaHQgdmFsdWUgb2YgdGFyZ2V0IG1vcnBoIHRhcmdldC4gUmFuZ2luZyBpbiBbMC4wIC0gMS4wXS5cbiAgICAgKi9cbiAgICB3ZWlnaHQ6IG51bWJlcjtcbiAgfSkge1xuICAgIHRoaXMucHJpbWl0aXZlcyA9IHByaW1pdGl2ZXM7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wcmltaXRpdmVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgIGlmIChtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz8uW3RoaXMuaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbdGhpcy5pbmRleF0gKz0gdGhpcy53ZWlnaHQgKiB3ZWlnaHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMucHJpbWl0aXZlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICBpZiAobWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXM/Llt0aGlzLmluZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW3RoaXMuaW5kZXhdID0gMC4wO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5cbmNvbnN0IF92MiA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byB0ZXh0dXJlIHRyYW5zZm9ybXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIHByaXZhdGUgc3RhdGljIF9wcm9wZXJ0eU5hbWVzTWFwOiB7IFtkaXN0aW5ndWlzaGVyOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IFtcbiAgICAgICdtYXAnLFxuICAgICAgJ2VtaXNzaXZlTWFwJyxcbiAgICAgICdidW1wTWFwJyxcbiAgICAgICdub3JtYWxNYXAnLFxuICAgICAgJ2Rpc3BsYWNlbWVudE1hcCcsXG4gICAgICAncm91Z2huZXNzTWFwJyxcbiAgICAgICdtZXRhbG5lc3NNYXAnLFxuICAgICAgJ2FscGhhTWFwJyxcbiAgICBdLFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IFsnbWFwJywgJ3NwZWN1bGFyTWFwJywgJ2FscGhhTWFwJ10sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiBbXG4gICAgICAnbWFwJyxcbiAgICAgICdub3JtYWxNYXAnLFxuICAgICAgJ2VtaXNzaXZlTWFwJyxcbiAgICAgICdzaGFkZU11bHRpcGx5VGV4dHVyZScsXG4gICAgICAncmltTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICdvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ3V2QW5pbWF0aW9uTWFza1RleHR1cmUnLFxuICAgIF0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdXYgc2NhbGUgb2YgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgLyoqXG4gICAqIFRoZSB1diBvZmZzZXQgb2YgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgb2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiB0ZXh0dXJlIG5hbWVzIGFuZCBpdHMgc3RhdGUgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQgYnkgdGhpcyBiaW5kLlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJvcGVydGllczoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0aWFsT2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICAgIGluaXRpYWxTY2FsZTogVEhSRUUuVmVjdG9yMjtcbiAgICBkZWx0YU9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgICBkZWx0YVNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuICB9W107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBtYXRlcmlhbCxcbiAgICBzY2FsZSxcbiAgICBvZmZzZXQsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1diBzY2FsZSBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKi9cbiAgICBzY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB1diBvZmZzZXQgb2YgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgb2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZXMgPSBPYmplY3QuZW50cmllcyhWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQuX3Byb3BlcnR5TmFtZXNNYXApLmZpbmQoXG4gICAgICAoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAobWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKT8uWzFdO1xuXG4gICAgaWYgKHByb3BlcnR5TmFtZXMgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgdGV4dHVyZSB0cmFuc2Zvcm0gYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0gYnV0IHRoZSBtYXRlcmlhbCBpcyBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcblxuICAgICAgcHJvcGVydHlOYW1lcy5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9ICgobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLlRleHR1cmUgfCB1bmRlZmluZWQpPy5jbG9uZSgpO1xuICAgICAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gPSB0ZXh0dXJlOyAvLyBiZWNhdXNlIHRoZSB0ZXh0dXJlIGlzIGNsb25lZFxuXG4gICAgICAgIGNvbnN0IGluaXRpYWxPZmZzZXQgPSB0ZXh0dXJlLm9mZnNldC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBpbml0aWFsU2NhbGUgPSB0ZXh0dXJlLnJlcGVhdC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBkZWx0YU9mZnNldCA9IG9mZnNldC5jbG9uZSgpLnN1Yihpbml0aWFsT2Zmc2V0KTtcbiAgICAgICAgY29uc3QgZGVsdGFTY2FsZSA9IHNjYWxlLmNsb25lKCkuc3ViKGluaXRpYWxTY2FsZSk7XG5cbiAgICAgICAgdGhpcy5fcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBwcm9wZXJ0eU5hbWUsXG4gICAgICAgICAgaW5pdGlhbE9mZnNldCxcbiAgICAgICAgICBkZWx0YU9mZnNldCxcbiAgICAgICAgICBpbml0aWFsU2NhbGUsXG4gICAgICAgICAgZGVsdGFTY2FsZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5Lm5hbWVdIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICB0YXJnZXQub2Zmc2V0LmFkZChfdjIuY29weShwcm9wZXJ0eS5kZWx0YU9mZnNldCkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG4gICAgICB0YXJnZXQucmVwZWF0LmFkZChfdjIuY29weShwcm9wZXJ0eS5kZWx0YVNjYWxlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eS5uYW1lXSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgdGFyZ2V0Lm9mZnNldC5jb3B5KHByb3BlcnR5LmluaXRpYWxPZmZzZXQpO1xuICAgICAgdGFyZ2V0LnJlcGVhdC5jb3B5KHByb3BlcnR5LmluaXRpYWxTY2FsZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4IH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4JztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYW5hZ2VyJztcbmltcG9ydCB7IHYwRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JNYXAgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uUHJlc2V0TmFtZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHYwdjFQcmVzZXROYW1lTWFwOiB7IFt2ME5hbWUgaW4gVjBWUk0uQmxlbmRTaGFwZVByZXNldE5hbWVdPzogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfSA9IHtcbiAgICBhOiAnYWEnLFxuICAgIGU6ICdlZScsXG4gICAgaTogJ2loJyxcbiAgICBvOiAnb2gnLFxuICAgIHU6ICdvdScsXG4gICAgYmxpbms6ICdibGluaycsXG4gICAgam95OiAnaGFwcHknLFxuICAgIGFuZ3J5OiAnYW5ncnknLFxuICAgIHNvcnJvdzogJ3NhZCcsXG4gICAgZnVuOiAncmVsYXhlZCcsXG4gICAgbG9va3VwOiAnbG9va1VwJyxcbiAgICBsb29rZG93bjogJ2xvb2tEb3duJyxcbiAgICBsb29rbGVmdDogJ2xvb2tMZWZ0JyxcbiAgICBsb29rcmlnaHQ6ICdsb29rUmlnaHQnLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICBibGlua19sOiAnYmxpbmtMZWZ0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfcjogJ2JsaW5rUmlnaHQnLFxuICAgIG5ldXRyYWw6ICduZXV0cmFsJyxcbiAgfTtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFFeHByZXNzaW9ucyA9IGV4dGVuc2lvbi5leHByZXNzaW9ucztcbiAgICBpZiAoIXNjaGVtYUV4cHJlc3Npb25zKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBsaXN0IGV4cHJlc3Npb25zXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG4gICAgY29uc3QgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAgPSBuZXcgTWFwPHN0cmluZywgVjFWUk1TY2hlbWEuRXhwcmVzc2lvbj4oKTtcblxuICAgIGlmIChzY2hlbWFFeHByZXNzaW9ucy5wcmVzZXQgIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmVudHJpZXMoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0KS5mb3JFYWNoKChbbmFtZSwgc2NoZW1hRXhwcmVzc2lvbl0pID0+IHtcbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyB0eXBlc2NyaXB0XG5cbiAgICAgICAgaWYgKCFwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogVW5rbm93biBwcmVzZXQgbmFtZSBcIiR7bmFtZX1cIiBkZXRlY3RlZC4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lU2NoZW1hRXhwcmVzc2lvbk1hcC5zZXQobmFtZSwgc2NoZW1hRXhwcmVzc2lvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMuY3VzdG9tICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBDdXN0b20gZXhwcmVzc2lvbiBjYW5ub3QgaGF2ZSBwcmVzZXQgbmFtZSBcIiR7bmFtZX1cIi4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb25gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJlcGFyZSBtYW5hZ2VyXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpO1xuXG4gICAgLy8gbG9hZCBleHByZXNzaW9uc1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgQXJyYXkuZnJvbShuYW1lU2NoZW1hRXhwcmVzc2lvbk1hcC5lbnRyaWVzKCkpLm1hcChhc3luYyAoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBuZXcgVlJNRXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZXhwcmVzc2lvbik7XG5cbiAgICAgICAgZXhwcmVzc2lvbi5pc0JpbmFyeSA9IHNjaGVtYUV4cHJlc3Npb24uaXNCaW5hcnkgPz8gZmFsc2U7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVCbGluayA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVCbGluayA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXQgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID8/ICdub25lJztcbiAgICAgICAgZXhwcmVzc2lvbi5vdmVycmlkZU1vdXRoID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZU1vdXRoID8/ICdub25lJztcblxuICAgICAgICBzY2hlbWFFeHByZXNzaW9uLm1vcnBoVGFyZ2V0QmluZHM/LmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICBpZiAoYmluZC5ub2RlID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBiaW5kLm5vZGUpKSE7XG4gICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmRleCA9IGJpbmQuaW5kZXg7XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFFeHByZXNzaW9uLm5hbWV9IGF0dGVtcHRzIHRvIGluZGV4IG1vcnBoICMke21vcnBoVGFyZ2V0SW5kZXh9IGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQoe1xuICAgICAgICAgICAgICBwcmltaXRpdmVzLFxuICAgICAgICAgICAgICBpbmRleDogbW9ycGhUYXJnZXRJbmRleCxcbiAgICAgICAgICAgICAgd2VpZ2h0OiBiaW5kLndlaWdodCA/PyAxLjAsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbi5tYXRlcmlhbENvbG9yQmluZHMgfHwgc2NoZW1hRXhwcmVzc2lvbi50ZXh0dXJlVHJhbnNmb3JtQmluZHMpIHtcbiAgICAgICAgICAvLyBsaXN0IHVwIGV2ZXJ5IG1hdGVyaWFsIGluIGBnbHRmLnNjZW5lYFxuICAgICAgICAgIGNvbnN0IGdsdGZNYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgIGdsdGZNYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzY2hlbWFFeHByZXNzaW9uLm1hdGVyaWFsQ29sb3JCaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gZ2x0Zk1hdGVyaWFscy5maWx0ZXIoKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBnbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXgodGhpcy5wYXJzZXIsIG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGJpbmQubWF0ZXJpYWwgPT09IG1hdGVyaWFsSW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kKHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgdHlwZTogYmluZC50eXBlLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG5ldyBUSFJFRS5Db2xvcigpLmZyb21BcnJheShiaW5kLnRhcmdldFZhbHVlKSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldEFscGhhOiBiaW5kLnRhcmdldFZhbHVlWzNdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzY2hlbWFFeHByZXNzaW9uLnRleHR1cmVUcmFuc2Zvcm1CaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gZ2x0Zk1hdGVyaWFscy5maWx0ZXIoKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsSW5kZXggPSBnbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXgodGhpcy5wYXJzZXIsIG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGJpbmQubWF0ZXJpYWwgPT09IG1hdGVyaWFsSW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kKHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgVEhSRUUuVmVjdG9yMigpLmZyb21BcnJheShiaW5kLm9mZnNldCA/PyBbMC4wLCAwLjBdKSxcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMigpLmZyb21BcnJheShiaW5kLnNjYWxlID8/IFsxLjAsIDEuMF0pLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYW5hZ2VyLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUV4cHJlc3Npb25NYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUJsZW5kU2hhcGUgPSB2cm1FeHQuYmxlbmRTaGFwZU1hc3RlcjtcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIGNvbnN0IHNjaGVtYUJsZW5kU2hhcGVHcm91cHMgPSBzY2hlbWFCbGVuZFNoYXBlLmJsZW5kU2hhcGVHcm91cHM7XG4gICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlR3JvdXBzKSB7XG4gICAgICByZXR1cm4gbWFuYWdlcjtcbiAgICB9XG5cbiAgICBjb25zdCBibGVuZFNoYXBlTmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBzY2hlbWFCbGVuZFNoYXBlR3JvdXBzLm1hcChhc3luYyAoc2NoZW1hR3JvdXApID0+IHtcbiAgICAgICAgY29uc3QgdjBQcmVzZXROYW1lID0gc2NoZW1hR3JvdXAucHJlc2V0TmFtZTtcbiAgICAgICAgY29uc3QgdjFQcmVzZXROYW1lID1cbiAgICAgICAgICAodjBQcmVzZXROYW1lICE9IG51bGwgJiYgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbi52MHYxUHJlc2V0TmFtZU1hcFt2MFByZXNldE5hbWVdKSB8fCBudWxsO1xuICAgICAgICBjb25zdCBuYW1lID0gdjFQcmVzZXROYW1lID8/IHNjaGVtYUdyb3VwLm5hbWU7XG5cbiAgICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogT25lIG9mIGN1c3RvbSBleHByZXNzaW9ucyBoYXMgbm8gbmFtZS4gSWdub3JpbmcgdGhlIGV4cHJlc3Npb24nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkdXBsaWNhdGlvbiBjaGVja1xuICAgICAgICBpZiAoYmxlbmRTaGFwZU5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IEFuIGV4cHJlc3Npb24gcHJlc2V0ICR7djBQcmVzZXROYW1lfSBoYXMgZHVwbGljYXRlZCBlbnRyaWVzLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBibGVuZFNoYXBlTmFtZVNldC5hZGQobmFtZSk7XG5cbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IG5ldyBWUk1FeHByZXNzaW9uKG5hbWUpO1xuICAgICAgICBnbHRmLnNjZW5lLmFkZChleHByZXNzaW9uKTtcblxuICAgICAgICBleHByZXNzaW9uLmlzQmluYXJ5ID0gc2NoZW1hR3JvdXAuaXNCaW5hcnkgPz8gZmFsc2U7XG4gICAgICAgIC8vIHYwIGRvZXNuJ3QgaGF2ZSBpZ25vcmUgcHJvcGVydGllc1xuXG4gICAgICAgIC8vIEJpbmQgbW9ycGhUYXJnZXRcbiAgICAgICAgaWYgKHNjaGVtYUdyb3VwLmJpbmRzKSB7XG4gICAgICAgICAgc2NoZW1hR3JvdXAuYmluZHMuZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmQubWVzaCA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGVzVXNpbmdNZXNoOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAganNvbi5ub2Rlcz8uZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5tZXNoID09PSBiaW5kLm1lc2gpIHtcbiAgICAgICAgICAgICAgICBub2Rlc1VzaW5nTWVzaC5wdXNoKGkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmRleCA9IGJpbmQuaW5kZXg7XG5cbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICBub2Rlc1VzaW5nTWVzaC5tYXAoYXN5bmMgKG5vZGVJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0Ziwgbm9kZUluZGV4KSkhO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hR3JvdXAubmFtZX0gYXR0ZW1wdHMgdG8gaW5kZXggJHttb3JwaFRhcmdldEluZGV4fXRoIG1vcnBoIGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVzLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogbW9ycGhUYXJnZXRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiAwLjAxICogKGJpbmQud2VpZ2h0ID8/IDEwMCksIC8vIG5hcnJvd2luZyB0aGUgcmFuZ2UgZnJvbSBbIDAuMCAtIDEwMC4wIF0gdG8gWyAwLjAgLSAxLjAgXVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmluZCBNYXRlcmlhbENvbG9yIGFuZCBUZXh0dXJlVHJhbnNmb3JtXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsVmFsdWVzID0gc2NoZW1hR3JvdXAubWF0ZXJpYWxWYWx1ZXM7XG4gICAgICAgIGlmIChtYXRlcmlhbFZhbHVlcyAmJiBtYXRlcmlhbFZhbHVlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBtYXRlcmlhbFZhbHVlcy5mb3JFYWNoKChtYXRlcmlhbFZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog44Ki44OQ44K/44O844Gu44Kq44OW44K444Kn44Kv44OI44Gr6Kit5a6a44GV44KM44Gm44GE44KL44Oe44OG44Oq44Ki44Or44Gu5YaF44GL44KJXG4gICAgICAgICAgICAgKiBtYXRlcmlhbFZhbHVl44Gn5oyH5a6a44GV44KM44Gm44GE44KL44Oe44OG44Oq44Ki44Or44KS6ZuG44KB44KL44CCXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICog54m55a6a44Gr44Gv5ZCN5YmN44KS5L2/55So44GZ44KL44CCXG4gICAgICAgICAgICAgKiDjgqLjgqbjg4jjg6njgqTjg7Pmj4/nlLvnlKjjga7jg57jg4bjg6rjgqLjg6vjgoLlkIzmmYLjgavpm4bjgoHjgovjgIJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgaWYgKChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbFtdIHwgVEhSRUUuTWF0ZXJpYWwgPSAob2JqZWN0IGFzIGFueSkubWF0ZXJpYWw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgLi4ubWF0ZXJpYWwuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgIChtdGwpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAobXRsLm5hbWUgPT09IG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lISB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhICsgJyAoT3V0bGluZSknKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLmluZGV4T2YobXRsKSA9PT0gLTEsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgJiYgbWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsUHJvcGVydHlOYW1lID0gbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgLy8gVGV4dHVyZVRyYW5zZm9ybUJpbmRcbiAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsUHJvcGVydHlOYW1lID09PSAnX01haW5UZXhfU1QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMihtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVswXSwgbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzJdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVszXSk7XG5cbiAgICAgICAgICAgICAgICBvZmZzZXQueSA9IDEuMCAtIG9mZnNldC55IC0gc2NhbGUueTtcblxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBNYXRlcmlhbENvbG9yQmluZFxuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbENvbG9yVHlwZSA9IHYwRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JNYXBbbWF0ZXJpYWxQcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxDb2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kKHtcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG1hdGVyaWFsQ29sb3JUeXBlLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QWxwaGE6IG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihtYXRlcmlhbFByb3BlcnR5TmFtZSArICcgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYW5hZ2VyLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0ge1xuICBOb25lOiAnbm9uZScsXG4gIEJsb2NrOiAnYmxvY2snLFxuICBCbGVuZDogJ2JsZW5kJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSB0eXBlb2YgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZVtrZXlvZiB0eXBlb2YgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZV07XG4iLCJpbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24nO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcblxuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uIHtcbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0Rmlyc3RQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldFRoaXJkUGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSID0gMTA7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuICBwdWJsaWMgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW107XG5cbiAgcHJpdmF0ZSBfZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XG4gIHByaXZhdGUgX3RoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSO1xuXG4gIHByaXZhdGUgX2luaXRpYWxpemVkTGF5ZXJzID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1GaXJzdFBlcnNvbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIG1lc2hBbm5vdGF0aW9ucyBBIHJlbmRlcmVyIHNldHRpbmdzLiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIFtbUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzXV0gZm9yIG1vcmUgaW5mb1xuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10pIHtcbiAgICB0aGlzLmh1bWFub2lkID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBtZXNoQW5ub3RhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBpbnRvIHRoaXMgb25lLlxuICAgKiB7QGxpbmsgaHVtYW5vaWR9IG11c3QgYmUgc2FtZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUZpcnN0UGVyc29ufSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRmlyc3RQZXJzb24pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5odW1hbm9pZCAhPT0gc291cmNlLmh1bWFub2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUZpcnN0UGVyc29uOiBodW1hbm9pZCBtdXN0IGJlIHNhbWUgaW4gb3JkZXIgdG8gY29weScpO1xuICAgIH1cblxuICAgIHRoaXMubWVzaEFubm90YXRpb25zID0gc291cmNlLm1lc2hBbm5vdGF0aW9ucy5tYXAoKGFubm90YXRpb24pID0+ICh7XG4gICAgICBtZXNoZXM6IGFubm90YXRpb24ubWVzaGVzLmNvbmNhdCgpLFxuICAgICAgdHlwZTogYW5ub3RhdGlvbi50eXBlLFxuICAgIH0pKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1GaXJzdFBlcnNvbn0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNRmlyc3RQZXJzb259XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNRmlyc3RQZXJzb24ge1xuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24odGhpcy5odW1hbm9pZCwgdGhpcy5tZXNoQW5ub3RhdGlvbnMpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCB7QGxpbmsgc2V0dXB9IGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIHtAbGluayBERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVJ9IGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSB7QGxpbmsgc2V0dXB9IGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi83M2E1YmQ4ZmNkZGFhMmE3YTg3MzUwOTlhOTdlNjNjOWRiM2U1ZWEwL0Fzc2V0cy9WUk0vUnVudGltZS9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcyNMMjk1LUwyOTkpIG9mIHRoZSBVbmlWUk0uXG4gICAqXG4gICAqIFRoZSBgY2FtZXJhTGF5ZXJgIHBhcmFtZXRlciBzcGVjaWZpZXMgd2hpY2ggbGF5ZXIgd2lsbCBiZSBhc3NpZ25lZCBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICogSW4gVW5pVlJNLCB3ZSBzcGVjaWZpZWQgdGhvc2UgYnkgbmFtaW5nIGVhY2ggZGVzaXJlZCBsYXllciBhcyBgRklSU1RQRVJTT05fT05MWV9MQVlFUmAgLyBgVEhJUkRQRVJTT05fT05MWV9MQVlFUmBcbiAgICogYnV0IHdlIGFyZSBnb2luZyB0byBzcGVjaWZ5IHRoZXNlIGxheWVycyBhdCBoZXJlIHNpbmNlIHdlIGFyZSB1bmFibGUgdG8gbmFtZSBsYXllcnMgaW4gVGhyZWUuanMuXG4gICAqXG4gICAqIEBwYXJhbSBjYW1lcmFMYXllciBTcGVjaWZ5IHdoaWNoIGxheWVyIHdpbGwgYmUgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqL1xuICBwdWJsaWMgc2V0dXAoe1xuICAgIGZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSLFxuICAgIHRoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSLFxuICB9ID0ge30pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWRMYXllcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBmaXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgICB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllciA9IHRoaXJkUGVyc29uT25seUxheWVyO1xuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZmlyc3RQZXJzb25Pbmx5Jykge1xuICAgICAgICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgICAgbWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICd0aGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbChtZXNoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9pbml0aWFsaXplZExheWVycyA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9leGNsdWRlVHJpYW5nbGVzKHRyaWFuZ2xlczogbnVtYmVyW10sIGJ3czogbnVtYmVyW11bXSwgc2tpbkluZGV4OiBudW1iZXJbXVtdLCBleGNsdWRlOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoYndzICE9IG51bGwgJiYgYndzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIGNvbnN0IGEgPSB0cmlhbmdsZXNbaV07XG4gICAgICAgIGNvbnN0IGIgPSB0cmlhbmdsZXNbaSArIDFdO1xuICAgICAgICBjb25zdCBjID0gdHJpYW5nbGVzW2kgKyAyXTtcbiAgICAgICAgY29uc3QgYncwID0gYndzW2FdO1xuICAgICAgICBjb25zdCBza2luMCA9IHNraW5JbmRleFthXTtcblxuICAgICAgICBpZiAoYncwWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncxID0gYndzW2JdO1xuICAgICAgICBjb25zdCBza2luMSA9IHNraW5JbmRleFtiXTtcbiAgICAgICAgaWYgKGJ3MVswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MiA9IGJ3c1tjXTtcbiAgICAgICAgY29uc3Qgc2tpbjIgPSBza2luSW5kZXhbY107XG4gICAgICAgIGlmIChidzJbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbM10pKSBjb250aW51ZTtcblxuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBhO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBiO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFcmFzZWRNZXNoKHNyYzogVEhSRUUuU2tpbm5lZE1lc2gsIGVyYXNpbmdCb25lc0luZGV4OiBudW1iZXJbXSk6IFRIUkVFLlNraW5uZWRNZXNoIHtcbiAgICBjb25zdCBkc3QgPSBuZXcgVEhSRUUuU2tpbm5lZE1lc2goc3JjLmdlb21ldHJ5LmNsb25lKCksIHNyYy5tYXRlcmlhbCk7XG4gICAgZHN0Lm5hbWUgPSBgJHtzcmMubmFtZX0oZXJhc2UpYDtcbiAgICBkc3QuZnJ1c3R1bUN1bGxlZCA9IHNyYy5mcnVzdHVtQ3VsbGVkO1xuICAgIGRzdC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gZHN0Lmdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ckFycmF5ID0gc2tpbkluZGV4QXR0ciBpbnN0YW5jZW9mIFRIUkVFLkdMQnVmZmVyQXR0cmlidXRlID8gW10gOiBza2luSW5kZXhBdHRyLmFycmF5O1xuICAgIGNvbnN0IHNraW5JbmRleCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbkluZGV4QXR0ckFycmF5Lmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luSW5kZXgucHVzaChbXG4gICAgICAgIHNraW5JbmRleEF0dHJBcnJheVtpXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAxXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAyXSxcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2kgKyAzXSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0Jyk7XG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHJBcnJheSA9IHNraW5XZWlnaHRBdHRyIGluc3RhbmNlb2YgVEhSRUUuR0xCdWZmZXJBdHRyaWJ1dGUgPyBbXSA6IHNraW5XZWlnaHRBdHRyLmFycmF5O1xuICAgIGNvbnN0IHNraW5XZWlnaHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5XZWlnaHRBdHRyQXJyYXkubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5XZWlnaHQucHVzaChbXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaV0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDFdLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAyXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgM10sXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGV4KCk7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGdlb21ldHJ5IGRvZXNuJ3QgaGF2ZSBhbiBpbmRleCBidWZmZXJcIik7XG4gICAgfVxuICAgIGNvbnN0IG9sZFRyaWFuZ2xlcyA9IEFycmF5LmZyb20oaW5kZXguYXJyYXkpO1xuXG4gICAgY29uc3QgY291bnQgPSB0aGlzLl9leGNsdWRlVHJpYW5nbGVzKG9sZFRyaWFuZ2xlcywgc2tpbldlaWdodCwgc2tpbkluZGV4LCBlcmFzaW5nQm9uZXNJbmRleCk7XG4gICAgY29uc3QgbmV3VHJpYW5nbGU6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBuZXdUcmlhbmdsZVtpXSA9IG9sZFRyaWFuZ2xlc1tpXTtcbiAgICB9XG4gICAgZ2VvbWV0cnkuc2V0SW5kZXgobmV3VHJpYW5nbGUpO1xuXG4gICAgLy8gbXRvb24gbWF0ZXJpYWwgaW5jbHVkZXMgb25CZWZvcmVSZW5kZXIuIHRoaXMgaXMgdW5zdXBwb3J0ZWQgYXQgU2tpbm5lZE1lc2gjY2xvbmVcbiAgICBpZiAoc3JjLm9uQmVmb3JlUmVuZGVyKSB7XG4gICAgICBkc3Qub25CZWZvcmVSZW5kZXIgPSBzcmMub25CZWZvcmVSZW5kZXI7XG4gICAgfVxuICAgIGRzdC5iaW5kKG5ldyBUSFJFRS5Ta2VsZXRvbihzcmMuc2tlbGV0b24uYm9uZXMsIHNyYy5za2VsZXRvbi5ib25lSW52ZXJzZXMpLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudDogVEhSRUUuT2JqZWN0M0QsIG1lc2g6IFRIUkVFLlNraW5uZWRNZXNoKTogdm9pZCB7XG4gICAgY29uc3QgZXJhc2VCb25lSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICBtZXNoLnNrZWxldG9uLmJvbmVzLmZvckVhY2goKGJvbmUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChib25lKSkgZXJhc2VCb25lSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8vIFVubGlrZSBVbmlWUk0gd2UgZG9uJ3QgY29weSBtZXNoIGlmIG5vIGludmlzaWJsZSBib25lIHdhcyBmb3VuZFxuICAgIGlmICghZXJhc2VCb25lSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgIGNvbnN0IG5ld01lc2ggPSB0aGlzLl9jcmVhdGVFcmFzZWRNZXNoKG1lc2gsIGVyYXNlQm9uZUluZGV4ZXMpO1xuICAgIHBhcmVudC5hZGQobmV3TWVzaCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsKG5vZGU6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0dyb3VwJykge1xuICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgcGFyZW50Lm5hbWUgPSBgX2hlYWRsZXNzXyR7bm9kZS5uYW1lfWA7XG4gICAgICAgIHBhcmVudC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS5wYXJlbnQhLmFkZChwYXJlbnQpO1xuICAgICAgICBub2RlLmNoaWxkcmVuXG4gICAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBza2lubmVkTWVzaCA9IGNoaWxkIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudCwgc2tpbm5lZE1lc2gpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZS50eXBlID09PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICBjb25zdCBza2lubmVkTWVzaCA9IG5vZGUgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gobm9kZS5wYXJlbnQhLCBza2lubmVkTWVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNFcmFzZVRhcmdldChib25lOiBUSFJFRS5PYmplY3QzRCk6IGJvb2xlYW4ge1xuICAgIGlmIChib25lID09PSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWJvbmUucGFyZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUucGFyZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb24nO1xuaW1wb3J0IHR5cGUgeyBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHZybUh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IHVuZGVmaW5lZDtcblxuICAgIC8vIGV4cGxpY2l0bHkgZGlzdGluZ3Vpc2ggbnVsbCBhbmQgdW5kZWZpbmVkXG4gICAgLy8gc2luY2UgdnJtSHVtYW5vaWQgbWlnaHQgYmUgbnVsbCBhcyBhIHJlc3VsdFxuICAgIGlmICh2cm1IdW1hbm9pZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodnJtSHVtYW5vaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IHZybUh1bWFub2lkIGlzIHVuZGVmaW5lZC4gVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gaGF2ZSB0byBiZSB1c2VkIGZpcnN0JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ2x0Zi51c2VyRGF0YS52cm1GaXJzdFBlcnNvbiA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmLCB2cm1IdW1hbm9pZCk7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cblxuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURiwgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgaWYgKGh1bWFub2lkID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpO1xuICAgIGlmICh2MVJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURiwgaHVtYW5vaWQ6IFZSTUh1bWFub2lkKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb24gPSBleHRlbnNpb24uZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzaEFubm90YXRpb25zOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uW10gPSBbXTtcbiAgICBjb25zdCBub2RlUHJpbWl0aXZlc01hcCA9IGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmKTtcbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IGFubm90YXRpb24gPSBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnNcbiAgICAgICAgPyBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnMuZmluZCgoYSkgPT4gYS5ub2RlID09PSBub2RlSW5kZXgpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaCh7XG4gICAgICAgIG1lc2hlczogcHJpbWl0aXZlcyxcbiAgICAgICAgdHlwZTogYW5ub3RhdGlvbj8udHlwZSA/PyAnYm90aCcsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oaHVtYW5vaWQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWMFZSTS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuXG4gICAgQXJyYXkuZnJvbShub2RlUHJpbWl0aXZlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtub2RlSW5kZXgsIHByaW1pdGl2ZXNdKSA9PiB7XG4gICAgICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2RlcyFbbm9kZUluZGV4XTtcblxuICAgICAgY29uc3QgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm1lc2ggPT09IHNjaGVtYU5vZGUubWVzaClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiB0aGlzLl9jb252ZXJ0VjBGbGFnVG9WMVR5cGUoZmxhZz8uZmlyc3RQZXJzb25GbGFnKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSB7XG4gICAgaWYgKGZsYWcgPT09ICdGaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ2ZpcnN0UGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnVGhpcmRQZXJzb25Pbmx5Jykge1xuICAgICAgcmV0dXJuICd0aGlyZFBlcnNvbk9ubHknO1xuICAgIH0gZWxzZSBpZiAoZmxhZyA9PT0gJ0F1dG8nKSB7XG4gICAgICByZXR1cm4gJ2F1dG8nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2JvdGgnO1xuICAgIH1cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSA9IHtcbiAgQXV0bzogJ2F1dG8nLFxuICBCb3RoOiAnYm90aCcsXG4gIFRoaXJkUGVyc29uT25seTogJ3RoaXJkUGVyc29uT25seScsXG4gIEZpcnN0UGVyc29uT25seTogJ2ZpcnN0UGVyc29uT25seScsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSA9XG4gIHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZVtrZXlvZiB0eXBlb2YgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGVdO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vVlJNSHVtYW5vaWQnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkSGVscGVyIGV4dGVuZHMgVEhSRUUuR3JvdXAge1xuICBwdWJsaWMgcmVhZG9ubHkgdnJtSHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuICBwcml2YXRlIF9ib25lQXhlc01hcDogTWFwPFZSTUh1bWFuQm9uZSwgVEhSRUUuQXhlc0hlbHBlcj47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnZybUh1bWFub2lkID0gaHVtYW5vaWQ7XG5cbiAgICB0aGlzLl9ib25lQXhlc01hcCA9IG5ldyBNYXAoKTtcblxuICAgIE9iamVjdC52YWx1ZXMoaHVtYW5vaWQuaHVtYW5Cb25lcykuZm9yRWFjaCgoYm9uZSkgPT4ge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoMS4wKTtcblxuICAgICAgaGVscGVyLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgICAgKGhlbHBlci5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFdyaXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYWRkKGhlbHBlcik7XG5cbiAgICAgIHRoaXMuX2JvbmVBeGVzTWFwLnNldChib25lLCBoZWxwZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9ib25lQXhlc01hcC52YWx1ZXMoKSkuZm9yRWFjaCgoYXhlcykgPT4ge1xuICAgICAgYXhlcy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAoYXhlcy5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlOiBib29sZWFuKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9ib25lQXhlc01hcC5lbnRyaWVzKCkpLmZvckVhY2goKFtib25lLCBheGVzXSkgPT4ge1xuICAgICAgYm9uZS5ub2RlLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcblxuICAgICAgYm9uZS5ub2RlLm1hdHJpeFdvcmxkLmRlY29tcG9zZShfdjNBLCBfcXVhdEEsIF92M0IpO1xuXG4gICAgICBjb25zdCBzY2FsZSA9IF92M0Euc2V0KDAuMSwgMC4xLCAwLjEpLmRpdmlkZShfdjNCKTtcbiAgICAgIGF4ZXMubWF0cml4LmNvcHkoYm9uZS5ub2RlLm1hdHJpeFdvcmxkKS5zY2FsZShzY2FsZSk7XG4gICAgfSk7XG5cbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uIERlcGVuZGVuY3kgYXdhcmUuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1IdW1hbkJvbmVMaXN0OiBWUk1IdW1hbkJvbmVOYW1lW10gPSBbXG4gICdoaXBzJyxcbiAgJ3NwaW5lJyxcbiAgJ2NoZXN0JyxcbiAgJ3VwcGVyQ2hlc3QnLFxuICAnbmVjaycsXG5cbiAgJ2hlYWQnLFxuICAnbGVmdEV5ZScsXG4gICdyaWdodEV5ZScsXG4gICdqYXcnLFxuXG4gICdsZWZ0VXBwZXJMZWcnLFxuICAnbGVmdExvd2VyTGVnJyxcbiAgJ2xlZnRGb290JyxcbiAgJ2xlZnRUb2VzJyxcblxuICAncmlnaHRVcHBlckxlZycsXG4gICdyaWdodExvd2VyTGVnJyxcbiAgJ3JpZ2h0Rm9vdCcsXG4gICdyaWdodFRvZXMnLFxuXG4gICdsZWZ0U2hvdWxkZXInLFxuICAnbGVmdFVwcGVyQXJtJyxcbiAgJ2xlZnRMb3dlckFybScsXG4gICdsZWZ0SGFuZCcsXG5cbiAgJ3JpZ2h0U2hvdWxkZXInLFxuICAncmlnaHRVcHBlckFybScsXG4gICdyaWdodExvd2VyQXJtJyxcbiAgJ3JpZ2h0SGFuZCcsXG5cbiAgJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICAnbGVmdFRodW1iUHJveGltYWwnLFxuICAnbGVmdFRodW1iRGlzdGFsJyxcbiAgJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gICdsZWZ0SW5kZXhEaXN0YWwnLFxuICAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdE1pZGRsZURpc3RhbCcsXG4gICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRSaW5nRGlzdGFsJyxcbiAgJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRMaXR0bGVEaXN0YWwnLFxuXG4gICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gICdyaWdodFRodW1iUHJveGltYWwnLFxuICAncmlnaHRUaHVtYkRpc3RhbCcsXG4gICdyaWdodEluZGV4UHJveGltYWwnLFxuICAncmlnaHRJbmRleEludGVybWVkaWF0ZScsXG4gICdyaWdodEluZGV4RGlzdGFsJyxcbiAgJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICAncmlnaHRSaW5nUHJveGltYWwnLFxuICAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbl07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBUaGUgbmFtZXMgb2Yge0BsaW5rIFZSTUh1bWFub2lkfSBib25lIG5hbWVzLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL2Jsb2IvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ192cm0tMS4wL2h1bWFub2lkLm1kXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1IdW1hbkJvbmVOYW1lID0ge1xuICBIaXBzOiAnaGlwcycsXG4gIFNwaW5lOiAnc3BpbmUnLFxuICBDaGVzdDogJ2NoZXN0JyxcbiAgVXBwZXJDaGVzdDogJ3VwcGVyQ2hlc3QnLFxuICBOZWNrOiAnbmVjaycsXG5cbiAgSGVhZDogJ2hlYWQnLFxuICBMZWZ0RXllOiAnbGVmdEV5ZScsXG4gIFJpZ2h0RXllOiAncmlnaHRFeWUnLFxuICBKYXc6ICdqYXcnLFxuXG4gIExlZnRVcHBlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIExlZnRMb3dlckxlZzogJ2xlZnRMb3dlckxlZycsXG4gIExlZnRGb290OiAnbGVmdEZvb3QnLFxuICBMZWZ0VG9lczogJ2xlZnRUb2VzJyxcblxuICBSaWdodFVwcGVyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIFJpZ2h0TG93ZXJMZWc6ICdyaWdodExvd2VyTGVnJyxcbiAgUmlnaHRGb290OiAncmlnaHRGb290JyxcbiAgUmlnaHRUb2VzOiAncmlnaHRUb2VzJyxcblxuICBMZWZ0U2hvdWxkZXI6ICdsZWZ0U2hvdWxkZXInLFxuICBMZWZ0VXBwZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBMZWZ0TG93ZXJBcm06ICdsZWZ0TG93ZXJBcm0nLFxuICBMZWZ0SGFuZDogJ2xlZnRIYW5kJyxcblxuICBSaWdodFNob3VsZGVyOiAncmlnaHRTaG91bGRlcicsXG4gIFJpZ2h0VXBwZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgUmlnaHRMb3dlckFybTogJ3JpZ2h0TG93ZXJBcm0nLFxuICBSaWdodEhhbmQ6ICdyaWdodEhhbmQnLFxuXG4gIExlZnRUaHVtYk1ldGFjYXJwYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgTGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIExlZnRUaHVtYkRpc3RhbDogJ2xlZnRUaHVtYkRpc3RhbCcsXG4gIExlZnRJbmRleFByb3hpbWFsOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBMZWZ0SW5kZXhJbnRlcm1lZGlhdGU6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBMZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhEaXN0YWwnLFxuICBMZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBMZWZ0TWlkZGxlSW50ZXJtZWRpYXRlOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIExlZnRNaWRkbGVEaXN0YWw6ICdsZWZ0TWlkZGxlRGlzdGFsJyxcbiAgTGVmdFJpbmdQcm94aW1hbDogJ2xlZnRSaW5nUHJveGltYWwnLFxuICBMZWZ0UmluZ0ludGVybWVkaWF0ZTogJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgTGVmdFJpbmdEaXN0YWw6ICdsZWZ0UmluZ0Rpc3RhbCcsXG4gIExlZnRMaXR0bGVQcm94aW1hbDogJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gIExlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdExpdHRsZURpc3RhbDogJ2xlZnRMaXR0bGVEaXN0YWwnLFxuXG4gIFJpZ2h0VGh1bWJNZXRhY2FycGFsOiAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICBSaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICBSaWdodFRodW1iRGlzdGFsOiAncmlnaHRUaHVtYkRpc3RhbCcsXG4gIFJpZ2h0SW5kZXhQcm94aW1hbDogJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gIFJpZ2h0SW5kZXhJbnRlcm1lZGlhdGU6ICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICBSaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gIFJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlOiAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICBSaWdodE1pZGRsZURpc3RhbDogJ3JpZ2h0TWlkZGxlRGlzdGFsJyxcbiAgUmlnaHRSaW5nUHJveGltYWw6ICdyaWdodFJpbmdQcm94aW1hbCcsXG4gIFJpZ2h0UmluZ0ludGVybWVkaWF0ZTogJ3JpZ2h0UmluZ0ludGVybWVkaWF0ZScsXG4gIFJpZ2h0UmluZ0Rpc3RhbDogJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gIFJpZ2h0TGl0dGxlUHJveGltYWw6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgUmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG4gIFJpZ2h0TGl0dGxlRGlzdGFsOiAncmlnaHRMaXR0bGVEaXN0YWwnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNSHVtYW5Cb25lTmFtZSA9IHR5cGVvZiBWUk1IdW1hbkJvbmVOYW1lW2tleW9mIHR5cGVvZiBWUk1IdW1hbkJvbmVOYW1lXTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCBtYXBzIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIGl0cyBwYXJlbnQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICpcbiAqIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL2Jsb2IvbWFzdGVyL3NwZWNpZmljYXRpb24vVlJNQ192cm0tMS4wL2h1bWFub2lkLm1kXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1IdW1hbkJvbmVQYXJlbnRNYXA6IHsgW2JvbmUgaW4gVlJNSHVtYW5Cb25lTmFtZV06IFZSTUh1bWFuQm9uZU5hbWUgfCBudWxsIH0gPSB7XG4gIGhpcHM6IG51bGwsXG4gIHNwaW5lOiAnaGlwcycsXG4gIGNoZXN0OiAnc3BpbmUnLFxuICB1cHBlckNoZXN0OiAnY2hlc3QnLFxuICBuZWNrOiAndXBwZXJDaGVzdCcsXG5cbiAgaGVhZDogJ25lY2snLFxuICBsZWZ0RXllOiAnaGVhZCcsXG4gIHJpZ2h0RXllOiAnaGVhZCcsXG4gIGphdzogJ2hlYWQnLFxuXG4gIGxlZnRVcHBlckxlZzogJ2hpcHMnLFxuICBsZWZ0TG93ZXJMZWc6ICdsZWZ0VXBwZXJMZWcnLFxuICBsZWZ0Rm9vdDogJ2xlZnRMb3dlckxlZycsXG4gIGxlZnRUb2VzOiAnbGVmdEZvb3QnLFxuXG4gIHJpZ2h0VXBwZXJMZWc6ICdoaXBzJyxcbiAgcmlnaHRMb3dlckxlZzogJ3JpZ2h0VXBwZXJMZWcnLFxuICByaWdodEZvb3Q6ICdyaWdodExvd2VyTGVnJyxcbiAgcmlnaHRUb2VzOiAncmlnaHRGb290JyxcblxuICBsZWZ0U2hvdWxkZXI6ICd1cHBlckNoZXN0JyxcbiAgbGVmdFVwcGVyQXJtOiAnbGVmdFNob3VsZGVyJyxcbiAgbGVmdExvd2VyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgbGVmdEhhbmQ6ICdsZWZ0TG93ZXJBcm0nLFxuXG4gIHJpZ2h0U2hvdWxkZXI6ICd1cHBlckNoZXN0JyxcbiAgcmlnaHRVcHBlckFybTogJ3JpZ2h0U2hvdWxkZXInLFxuICByaWdodExvd2VyQXJtOiAncmlnaHRVcHBlckFybScsXG4gIHJpZ2h0SGFuZDogJ3JpZ2h0TG93ZXJBcm0nLFxuXG4gIGxlZnRUaHVtYk1ldGFjYXJwYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIGxlZnRUaHVtYkRpc3RhbDogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgbGVmdEluZGV4UHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRJbmRleEludGVybWVkaWF0ZTogJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgbGVmdEluZGV4RGlzdGFsOiAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgbGVmdE1pZGRsZVByb3hpbWFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlOiAnbGVmdE1pZGRsZVByb3hpbWFsJyxcbiAgbGVmdE1pZGRsZURpc3RhbDogJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICBsZWZ0UmluZ1Byb3hpbWFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0UmluZ0ludGVybWVkaWF0ZTogJ2xlZnRSaW5nUHJveGltYWwnLFxuICBsZWZ0UmluZ0Rpc3RhbDogJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgbGVmdExpdHRsZVByb3hpbWFsOiAnbGVmdEhhbmQnLFxuICBsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlOiAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgbGVmdExpdHRsZURpc3RhbDogJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuXG4gIHJpZ2h0VGh1bWJNZXRhY2FycGFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICByaWdodFRodW1iRGlzdGFsOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgcmlnaHRJbmRleFByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRJbmRleEludGVybWVkaWF0ZTogJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gIHJpZ2h0SW5kZXhEaXN0YWw6ICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgcmlnaHRNaWRkbGVQcm94aW1hbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlOiAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gIHJpZ2h0TWlkZGxlRGlzdGFsOiAncmlnaHRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICByaWdodFJpbmdQcm94aW1hbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0UmluZ0ludGVybWVkaWF0ZTogJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgcmlnaHRSaW5nRGlzdGFsOiAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgcmlnaHRMaXR0bGVQcm94aW1hbDogJ3JpZ2h0SGFuZCcsXG4gIHJpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlOiAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gIHJpZ2h0TGl0dGxlRGlzdGFsOiAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxufTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBBIGNvbXBhdCBmdW5jdGlvbiBmb3IgYFF1YXRlcm5pb24uaW52ZXJ0KClgIC8gYFF1YXRlcm5pb24uaW52ZXJzZSgpYC5cbiAqIGBRdWF0ZXJuaW9uLmludmVydCgpYCBpcyBpbnRyb2R1Y2VkIGluIHIxMjMgYW5kIGBRdWF0ZXJuaW9uLmludmVyc2UoKWAgZW1pdHMgYSB3YXJuaW5nLlxuICogV2UgYXJlIGdvaW5nIHRvIHVzZSB0aGlzIGNvbXBhdCBmb3IgYSB3aGlsZS5cbiAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgcXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVydENvbXBhdDxUIGV4dGVuZHMgVEhSRUUuUXVhdGVybmlvbj4odGFyZ2V0OiBUKTogVCB7XG4gIGlmICgodGFyZ2V0IGFzIGFueSkuaW52ZXJ0KSB7XG4gICAgdGFyZ2V0LmludmVydCgpO1xuICB9IGVsc2Uge1xuICAgICh0YXJnZXQgYXMgYW55KS5pbnZlcnNlKCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcbmltcG9ydCB0eXBlIHsgVlJNUG9zZSB9IGZyb20gJy4vVlJNUG9zZSc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIFJpZyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJpZyB7XG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaHVtYW4gYm9uZXMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gZ2V0IHRoZXNlIGJvbmVzIHVzaW5nIHtAbGluayBWUk1IdW1hbm9pZC5nZXRCb25lfS5cbiAgICovXG4gIHB1YmxpYyBodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRQb3NlfSBhbmQge0BsaW5rIGdldFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyByZXN0UG9zZTogVlJNUG9zZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IGNvbnRhaW5zIGFsbCB0aGUgYm9uZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMpIHtcbiAgICB0aGlzLmh1bWFuQm9uZXMgPSBodW1hbkJvbmVzO1xuXG4gICAgdGhpcy5yZXN0UG9zZSA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlID0ge30gYXMgVlJNUG9zZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgodnJtQm9uZU5hbWVTdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZybUJvbmVOYW1lID0gdnJtQm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKHZybUJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIC8gcm90YXRpb24gZnJvbSB0aGUgbm9kZVxuICAgICAgX3YzQS5jb3B5KG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLmNvcHkobm9kZS5xdWF0ZXJuaW9uKTtcblxuICAgICAgLy8gQ29udmVydCB0byByYXcgYXJyYXlzXG4gICAgICBwb3NlW3ZybUJvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IF92M0EudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgICAgcm90YXRpb246IF9xdWF0QS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2YgdGhpcyBodW1hbm9pZCBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlID0ge30gYXMgVlJNUG9zZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuaHVtYW5Cb25lcykuZm9yRWFjaCgoYm9uZU5hbWVTdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVlJNSHVtYW5Cb25lTmFtZTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUYWtlIGEgZGlmZiBmcm9tIHJlc3RQb3NlXG4gICAgICBfdjNBLnNldCgwLCAwLCAwKTtcbiAgICAgIF9xdWF0QS5pZGVudGl0eSgpO1xuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmIChyZXN0U3RhdGU/LnBvc2l0aW9uKSB7XG4gICAgICAgIF92M0EuZnJvbUFycmF5KHJlc3RTdGF0ZS5wb3NpdGlvbikubmVnYXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdFN0YXRlPy5yb3RhdGlvbikge1xuICAgICAgICBxdWF0SW52ZXJ0Q29tcGF0KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmFkZChub2RlLnBvc2l0aW9uKTtcbiAgICAgIF9xdWF0QS5wcmVtdWx0aXBseShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRvIHJhdyBhcnJheXNcbiAgICAgIHBvc2VbYm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIGh1bWFub2lkIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UG9zZX0uXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEgW1tWUk1Qb3NlXV0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyhwb3NlT2JqZWN0KS5mb3JFYWNoKChbYm9uZU5hbWVTdHJpbmcsIHN0YXRlXSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSB0aGF0IGlzIGRlZmluZWQgaW4gdGhlIHBvc2Ugb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmICghcmVzdFN0YXRlKSB7XG4gICAgICAgIC8vIEl0J3MgdmVyeSB1bmxpa2VseS4gUG9zc2libHkgYSBidWdcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSB0aGUgc3RhdGUgdG8gdGhlIGFjdHVhbCBib25lXG4gICAgICBpZiAoc3RhdGU/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICBpZiAocmVzdFN0YXRlLnBvc2l0aW9uKSB7XG4gICAgICAgICAgbm9kZS5wb3NpdGlvbi5hZGQoX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlPy5yb3RhdGlvbikge1xuICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHN0YXRlLnJvdGF0aW9uKTtcblxuICAgICAgICBpZiAocmVzdFN0YXRlLnJvdGF0aW9uKSB7XG4gICAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5yZXN0UG9zZSkuZm9yRWFjaCgoW2JvbmVOYW1lLCByZXN0XSkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUgYXMgVlJNSHVtYW5Cb25lTmFtZSk7XG5cbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0Py5wb3NpdGlvbikge1xuICAgICAgICBub2RlLnBvc2l0aW9uLmZyb21BcnJheShyZXN0LnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkocmVzdC5yb3RhdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEge0BsaW5rIFZSTUh1bWFuQm9uZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0gPz8gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGJvbmUgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LCBhcyBhIGBUSFJFRS5PYmplY3QzRGAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdPy5ub2RlID8/IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUsIFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZUxpc3QgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUxpc3QnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lUGFyZW50TWFwIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVQYXJlbnRNYXAnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfYm9uZVdvcmxkUG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIG5vcm1hbGl6ZWQgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRSaWcgZXh0ZW5kcyBWUk1SaWcge1xuICBwcm90ZWN0ZWQgc3RhdGljIF9zZXR1cFRyYW5zZm9ybXMobW9kZWxSaWc6IFZSTVJpZyk6IHtcbiAgICByaWdCb25lczogVlJNSHVtYW5Cb25lcztcbiAgICByb290OiBUSFJFRS5PYmplY3QzRDtcbiAgICBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gICAgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gIH0ge1xuICAgIGNvbnN0IHJvb3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICByb290Lm5hbWUgPSAnVlJNSHVtYW5vaWRSaWcnO1xuXG4gICAgLy8gc3RvcmUgYm9uZVdvcmxkUG9zaXRpb25zLCBib25lV29ybGRSb3RhdGlvbnMsIGFuZCBwYXJlbnRXb3JsZFJvdGF0aW9uc1xuICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5WZWN0b3IzIH0gPSB7fTtcbiAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG4gICAgY29uc3QgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcbiAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICAgICAgYm9uZU5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICBib25lTm9kZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoYm9uZVdvcmxkUG9zaXRpb24sIGJvbmVXb3JsZFJvdGF0aW9uLCBfdjNBKTtcblxuICAgICAgICBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdID0gYm9uZVdvcmxkUG9zaXRpb247XG4gICAgICAgIGJvbmVXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRSb3RhdGlvbjtcbiAgICAgICAgYm9uZVJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lTm9kZS5xdWF0ZXJuaW9uLmNsb25lKCk7XG5cbiAgICAgICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgICAgIGJvbmVOb2RlLnBhcmVudD8ubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIHBhcmVudFdvcmxkUm90YXRpb24sIF92M0EpO1xuICAgICAgICBwYXJlbnRXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBwYXJlbnRXb3JsZFJvdGF0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYnVpbGQgcmlnIGhpZXJhcmNoeSArIHN0b3JlIHBhcmVudFdvcmxkUm90YXRpb25zXG4gICAgY29uc3QgcmlnQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IG1vZGVsUmlnLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlKSB7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb25zW2JvbmVOYW1lXSBhcyBUSFJFRS5WZWN0b3IzO1xuXG4gICAgICAgIC8vIHNlZSB0aGUgbmVhcmVzdCBwYXJlbnQgcG9zaXRpb25cbiAgICAgICAgbGV0IGN1cnJlbnRCb25lTmFtZTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgPSBib25lTmFtZTtcbiAgICAgICAgbGV0IHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzIHwgdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAocGFyZW50Qm9uZVdvcmxkUG9zaXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgIGN1cnJlbnRCb25lTmFtZSA9IFZSTUh1bWFuQm9uZVBhcmVudE1hcFtjdXJyZW50Qm9uZU5hbWVdO1xuICAgICAgICAgIGlmIChjdXJyZW50Qm9uZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb25zW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gaGllcmFyY2h5XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIHJpZ0JvbmVOb2RlLm5hbWUgPSAnTm9ybWFsaXplZF8nICsgYm9uZU5vZGUubmFtZTtcblxuICAgICAgICBjb25zdCBwYXJlbnRSaWdCb25lTm9kZSA9IChjdXJyZW50Qm9uZU5hbWUgPyByaWdCb25lc1tjdXJyZW50Qm9uZU5hbWVdPy5ub2RlIDogcm9vdCkgYXMgVEhSRUUuT2JqZWN0M0Q7XG5cbiAgICAgICAgcGFyZW50UmlnQm9uZU5vZGUuYWRkKHJpZ0JvbmVOb2RlKTtcbiAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uY29weShib25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIGlmIChwYXJlbnRCb25lV29ybGRQb3NpdGlvbikge1xuICAgICAgICAgIHJpZ0JvbmVOb2RlLnBvc2l0aW9uLnN1YihwYXJlbnRCb25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByaWdCb25lc1tib25lTmFtZV0gPSB7IG5vZGU6IHJpZ0JvbmVOb2RlIH07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmlnQm9uZXM6IHJpZ0JvbmVzIGFzIFZSTUh1bWFuQm9uZXMsXG4gICAgICByb290LFxuICAgICAgcGFyZW50V29ybGRSb3RhdGlvbnMsXG4gICAgICBib25lUm90YXRpb25zLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWw6IFZSTVJpZztcbiAgcHVibGljIHJlYWRvbmx5IHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTVJpZykge1xuICAgIGNvbnN0IHsgcmlnQm9uZXMsIHJvb3QsIHBhcmVudFdvcmxkUm90YXRpb25zLCBib25lUm90YXRpb25zIH0gPSBWUk1IdW1hbm9pZFJpZy5fc2V0dXBUcmFuc2Zvcm1zKGh1bWFub2lkKTtcblxuICAgIHN1cGVyKHJpZ0JvbmVzKTtcblxuICAgIHRoaXMub3JpZ2luYWwgPSBodW1hbm9pZDtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb25zID0gcGFyZW50V29ybGRSb3RhdGlvbnM7XG4gICAgdGhpcy5fYm9uZVJvdGF0aW9ucyA9IGJvbmVSb3RhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgaHVtYW5vaWQgcmlnLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBWUk1IdW1hbkJvbmVMaXN0LmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib25lTm9kZSA9IHRoaXMub3JpZ2luYWwuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCByaWdCb25lTm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpITtcbiAgICAgICAgY29uc3QgcGFyZW50V29ybGRSb3RhdGlvbiA9IHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSE7XG4gICAgICAgIGNvbnN0IGludlBhcmVudFdvcmxkUm90YXRpb24gPSBfcXVhdEEuY29weShwYXJlbnRXb3JsZFJvdGF0aW9uKS5pbnZlcnQoKTtcbiAgICAgICAgY29uc3QgYm9uZVJvdGF0aW9uID0gdGhpcy5fYm9uZVJvdGF0aW9uc1tib25lTmFtZV0hO1xuXG4gICAgICAgIGJvbmVOb2RlLnF1YXRlcm5pb25cbiAgICAgICAgICAuY29weShyaWdCb25lTm9kZS5xdWF0ZXJuaW9uKVxuICAgICAgICAgIC5tdWx0aXBseShwYXJlbnRXb3JsZFJvdGF0aW9uKVxuICAgICAgICAgIC5wcmVtdWx0aXBseShpbnZQYXJlbnRXb3JsZFJvdGF0aW9uKVxuICAgICAgICAgIC5tdWx0aXBseShib25lUm90YXRpb24pO1xuXG4gICAgICAgIC8vIE1vdmUgdGhlIG1hc3MgY2VudGVyIG9mIHRoZSBWUk1cbiAgICAgICAgaWYgKGJvbmVOYW1lID09PSAnaGlwcycpIHtcbiAgICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IHJpZ0JvbmVOb2RlLmdldFdvcmxkUG9zaXRpb24oX2JvbmVXb3JsZFBvcyk7XG4gICAgICAgICAgYm9uZU5vZGUucGFyZW50IS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgY29uc3QgcGFyZW50V29ybGRNYXRyaXggPSBib25lTm9kZS5wYXJlbnQhLm1hdHJpeFdvcmxkO1xuICAgICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbi5hcHBseU1hdHJpeDQocGFyZW50V29ybGRNYXRyaXguaW52ZXJ0KCkpO1xuICAgICAgICAgIGJvbmVOb2RlLnBvc2l0aW9uLmNvcHkobG9jYWxQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVOYW1lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVOYW1lJztcbmltcG9ydCB0eXBlIHsgVlJNUG9zZSB9IGZyb20gJy4vVlJNUG9zZSc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZFJpZyB9IGZyb20gJy4vVlJNSHVtYW5vaWRSaWcnO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIGh1bWFub2lkIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWQge1xuICAvKipcbiAgICogV2hldGhlciBpdCBjb3BpZXMgcG9zZSBmcm9tIG5vcm1hbGl6ZWRIdW1hbkJvbmVzIHRvIHJhd0h1bWFuQm9uZXMgb24ge0BsaW5rIHVwZGF0ZX0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgcmF3IHJpZyBvZiB0aGUgVlJNLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmF3SHVtYW5Cb25lczogVlJNUmlnOyAvLyBUT0RPOiBSZW5hbWVcblxuICAvKipcbiAgICogQSBub3JtYWxpemVkIHJpZyBvZiB0aGUgVlJNLlxuICAgKi9cbiAgcHJpdmF0ZSBfbm9ybWFsaXplZEh1bWFuQm9uZXM6IFZSTUh1bWFub2lkUmlnOyAvLyBUT0RPOiBSZW5hbWVcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmF3UmVzdFBvc2V9IG9yIHtAbGluayBub3JtYWxpemVkUmVzdFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHJlc3RQb3NlIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgcmF3UmVzdFBvc2Ugb3Igbm9ybWFsaXplZFJlc3RQb3NlIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5yYXdSZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSBvZiBpdHMgcmF3IGh1bWFuIGJvbmVzIHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldFJhd1Bvc2V9IGFuZCB7QGxpbmsgZ2V0UmF3UG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIGdldCByYXdSZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Qb3NlfSBvZiBpdHMgbm9ybWFsaXplZCBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gYW5kIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkUmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGh1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgLy8gYW4gYWxpYXMgb2YgYHJhd0h1bWFuQm9uZXNgXG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCByYXdIdW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRIdW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByb290IG9mIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QoKTogVEhSRUUuT2JqZWN0M0Qge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yb290O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBBIHtAbGluayBWUk1IdW1hbkJvbmVzfSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICogQHBhcmFtIGF1dG9VcGRhdGVIdW1hbkJvbmVzIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzLCBvcHRpb25zPzogeyBhdXRvVXBkYXRlSHVtYW5Cb25lcz86IGJvb2xlYW4gfSkge1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA/PyB0cnVlO1xuICAgIHRoaXMuX3Jhd0h1bWFuQm9uZXMgPSBuZXcgVlJNUmlnKGh1bWFuQm9uZXMpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzID0gbmV3IFZSTUh1bWFub2lkUmlnKHRoaXMuX3Jhd0h1bWFuQm9uZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1IdW1hbm9pZH0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUh1bWFub2lkfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNSHVtYW5vaWQpOiB0aGlzIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gc291cmNlLmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICAgIHRoaXMuX3Jhd0h1bWFuQm9uZXMgPSBuZXcgVlJNUmlnKHNvdXJjZS5odW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEByZXR1cm5zIENvcGllZCB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNSHVtYW5vaWQge1xuICAgIHJldHVybiBuZXcgVlJNSHVtYW5vaWQodGhpcy5odW1hbkJvbmVzLCB7IGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzIH0pLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3QWJzb2x1dGVQb3NlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRBYnNvbHV0ZVBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0Fic29sdXRlUG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2UoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0Fic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgcmF3IGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldFJhd1Bvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBhYnNvbHV0ZSBwb3NlIG9mIHRoaXMgbm9ybWFsaXplZCBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdQb3NlfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdQb3NlKCkgb3IgZ2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaXMgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBzZXRSYXdQb3NlfSBvciB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogc2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgc2V0UmF3UG9zZSgpIG9yIHNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnNldFJhd1Bvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSByYXcgaHVtYW4gYm9uZXMgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRSYXdQb3NlfS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFJhd1Bvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIHtAbGluayBWUk1Qb3NlfSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldE5vcm1hbGl6ZWRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuc2V0UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayByZXNldFJhd1Bvc2V9IG9yIHtAbGluayByZXNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJlc2V0UmF3UG9zZSgpIG9yIHJlc2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVzZXRSYXdQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHJhdyBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30sIHlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFJhd1Bvc2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIG5vcm1hbGl6ZWQgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHB1YmxpYyByZXNldE5vcm1hbGl6ZWRQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRCb25lKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmUoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZU5vZGV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZU5vZGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRCb25lTm9kZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZU5vZGUoKSBvciBnZXROb3JtYWxpemVkQm9uZU5vZGUoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBodW1hbm9pZCBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30gaXMgYHRydWVgLCBpdCB0cmFuc2ZlcnMgdGhlIHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyB0byByYXcgaHVtYW4gYm9uZXMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzKSB7XG4gICAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0ge1xuICBIaXBzOiAnaGlwcycsXG4gIFNwaW5lOiAnc3BpbmUnLFxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRVcHBlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIExlZnRMb3dlckxlZzogJ2xlZnRMb3dlckxlZycsXG4gIExlZnRGb290OiAnbGVmdEZvb3QnLFxuICBSaWdodFVwcGVyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIFJpZ2h0TG93ZXJMZWc6ICdyaWdodExvd2VyTGVnJyxcbiAgUmlnaHRGb290OiAncmlnaHRGb290JyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG4gIFJpZ2h0VXBwZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgUmlnaHRMb3dlckFybTogJ3JpZ2h0TG93ZXJBcm0nLFxuICBSaWdodEhhbmQ6ICdyaWdodEhhbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0gdHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZVtrZXlvZiB0eXBlb2YgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lXTtcbiIsImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL1ZSTUh1bWFub2lkJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgeyBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlcic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIG1hcCBmcm9tIG9sZCB0aHVtYiBib25lIG5hbWVzIHRvIG5ldyB0aHVtYiBib25lIG5hbWVzXG4gKi9cbmNvbnN0IHRodW1iQm9uZU5hbWVNYXA6IHsgW2tleTogc3RyaW5nXTogVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lIHwgdW5kZWZpbmVkIH0gPSB7XG4gIGxlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIGxlZnRUaHVtYkludGVybWVkaWF0ZTogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgcmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICByaWdodFRodW1iSW50ZXJtZWRpYXRlOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbn07XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNSHVtYW5vaWRIZWxwZXJ9LlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIHRoZSBoZWxwZXIgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZCA9IGV4dGVuc2lvbi5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wYXQ6IDEuMC1iZXRhIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgKlxuICAgICAqIGB0cnVlYCBpZiBgbGVmdFRodW1iSW50ZXJtZWRpYXRlYCBvciBgcmlnaHRUaHVtYkludGVybWVkaWF0ZWAgZXhpc3RzXG4gICAgICovXG4gICAgY29uc3QgZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUgPVxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5sZWZ0VGh1bWJJbnRlcm1lZGlhdGUgIT0gbnVsbCB8fFxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5yaWdodFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGw7XG5cbiAgICBjb25zdCBodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMpLm1hcChhc3luYyAoW2JvbmVOYW1lU3RyaW5nLCBzY2hlbWFIdW1hbkJvbmVdKSA9PiB7XG4gICAgICAgICAgbGV0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2NoZW1hSHVtYW5Cb25lLm5vZGU7XG5cbiAgICAgICAgICAvLyBjb21wYXQ6IDEuMC1iZXRhIHByZXZpb3VzIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgICAgICBpZiAoZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICAgIGlmICh0aHVtYkJvbmVOYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZDogVjBWUk0uSHVtYW5vaWQgfCB1bmRlZmluZWQgPSB2cm1FeHQuaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzLm1hcChhc3luYyAoYm9uZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZS5ib25lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gYm9uZS5ub2RlO1xuXG4gICAgICAgICAgaWYgKGJvbmVOYW1lID09IG51bGwgfHwgaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbWFwIHRvIG5ldyBib25lIG5hbWVcbiAgICAgICAgICBjb25zdCB0aHVtYkJvbmVOYW1lID0gdGh1bWJCb25lTmFtZU1hcFtib25lTmFtZV07XG4gICAgICAgICAgY29uc3QgbmV3Qm9uZU5hbWUgPSAodGh1bWJCb25lTmFtZSA/PyBib25lTmFtZSkgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuXG4gICAgICAgICAgLy8gdjAgVlJNcyBtaWdodCBoYXZlIGEgbXVsdGlwbGUgbm9kZXMgYXR0YWNoZWQgdG8gYSBzaW5nbGUgYm9uZS4uLlxuICAgICAgICAgIC8vIHNvIGlmIHRoZXJlIGFscmVhZHkgaXMgYW4gZW50cnkgaW4gdGhlIGBodW1hbkJvbmVzYCwgc2hvdyBhIHdhcm5pbmcgYW5kIGlnbm9yZSBpdFxuICAgICAgICAgIGlmIChodW1hbkJvbmVzW25ld0JvbmVOYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBNdWx0aXBsZSBib25lIGVudHJpZXMgZm9yICR7bmV3Qm9uZU5hbWV9IGRldGVjdGVkIChpbmRleCA9ICR7aW5kZXh9KSwgaWdub3JpbmcgZHVwbGljYXRlZCBlbnRyaWVzLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB0byB0aGUgYGh1bWFuQm9uZXNgXG4gICAgICAgICAgaHVtYW5Cb25lc1tuZXdCb25lTmFtZV0gPSB7IG5vZGUgfTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFub2lkID0gbmV3IFZSTUh1bWFub2lkKHRoaXMuX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzKSwge1xuICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgfSk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoaHVtYW5vaWQubm9ybWFsaXplZEh1bWFuQm9uZXNSb290KTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1IdW1hbm9pZEhlbHBlcihodW1hbm9pZCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFub2lkO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdCBpbiBnaXZlbiBodW1hbiBib25lcy5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgSHVtYW4gYm9uZXNcbiAgICogQHJldHVybnMgSHVtYW4gYm9uZXMsIG5vIGxvbmdlciBwYXJ0aWFsIVxuICAgKi9cbiAgcHJpdmF0ZSBfZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4pOiBWUk1IdW1hbkJvbmVzIHtcbiAgICAvLyBlbnN1cmUgcmVxdWlyZWQgYm9uZXMgZXhpc3RcbiAgICBjb25zdCBtaXNzaW5nUmVxdWlyZWRCb25lcyA9IE9iamVjdC52YWx1ZXMoVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lKS5maWx0ZXIoXG4gICAgICAocmVxdWlyZWRCb25lTmFtZSkgPT4gaHVtYW5Cb25lc1tyZXF1aXJlZEJvbmVOYW1lXSA9PSBudWxsLFxuICAgICk7XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBhcmUgbWlzc2luZyBib25lc1xuICAgIGlmIChtaXNzaW5nUmVxdWlyZWRCb25lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjogVGhlc2UgaHVtYW5vaWQgYm9uZXMgYXJlIHJlcXVpcmVkIGJ1dCBub3QgZXhpc3Q6ICR7bWlzc2luZ1JlcXVpcmVkQm9uZXMuam9pbignLCAnKX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5Cb25lcyBhcyBWUk1IdW1hbkJvbmVzO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBGYW5CdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHRoZXRhOiBudW1iZXI7XG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY3VycmVudFRoZXRhID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRoZXRhID0gMC4wO1xuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRUaGV0YSA9IDAuMDtcbiAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gMC4wO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSg2NSAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDMgKiA2MyksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50VGhldGEgIT09IHRoaXMudGhldGEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUaGV0YSA9IHRoaXMudGhldGE7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHRoaXMucmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigwLCAwLjAsIDAuMCwgMC4wKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gNjMuMCkgKiB0aGlzLl9jdXJyZW50VGhldGE7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGkgKyAxLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5zaW4odCksIDAuMCwgdGhpcy5fY3VycmVudFJhZGl1cyAqIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MzsgaSsrKSB7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFlaKGkgKiAzLCAwLCBpICsgMSwgaSArIDIpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLnRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMudGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi4vVlJNTG9va0F0JztcbmltcG9ydCB7IEZhbkJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9GYW5CdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0xpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgU1FSVF8yX09WRVJfMiA9IE1hdGguc3FydCgyLjApIC8gMi4wO1xuY29uc3QgUVVBVF9YWV9DVzkwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oMCwgMCwgLVNRUlRfMl9PVkVSXzIsIFNRUlRfMl9PVkVSXzIpO1xuY29uc3QgVkVDM19QT1NJVElWRV9ZID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAxLjAsIDAuMCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1Mb29rQXQ6IFZSTUxvb2tBdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVzaFlhdzogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoUGl0Y2g6IFRIUkVFLk1lc2g8RmFuQnVmZmVyR2VvbWV0cnksIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsPjtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZVRhcmdldDogVEhSRUUuTGluZVNlZ21lbnRzPExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSwgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWw+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihsb29rQXQ6IFZSTUxvb2tBdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLnZybUxvb2tBdCA9IGxvb2tBdDtcblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4MDBmZjAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoUGl0Y2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbWVzaFBpdGNoKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBGYW5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC41O1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmMDAwMCxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbWVzaFlhdyA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoWWF3KTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuMTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX2xpbmVUYXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hZYXcubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbGluZVRhcmdldC5tYXRlcmlhbC5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgZ2VvbWV0cmllc1xuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy52cm1Mb29rQXQueWF3O1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkudGhldGEgPSB5YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC5waXRjaDtcbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkudGhldGEgPSBwaXRjaDtcbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICAvLyBnZXQgd29ybGQgcG9zaXRpb24gYW5kIHF1YXRlcm5pb25cbiAgICB0aGlzLnZybUxvb2tBdC5nZXRMb29rQXRXb3JsZFBvc2l0aW9uKF92M0EpO1xuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEEpO1xuXG4gICAgLy8gY2FsY3VsYXRlIHJvdGF0aW9uIHVzaW5nIGZhY2VGcm9udFxuICAgIF9xdWF0QS5tdWx0aXBseSh0aGlzLnZybUxvb2tBdC5nZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKF9xdWF0QikpO1xuXG4gICAgLy8gc2V0IHRyYW5zZm9ybSB0byBtZXNoZXNcbiAgICB0aGlzLl9tZXNoWWF3LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFlhdy5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKTtcblxuICAgIHRoaXMuX21lc2hQaXRjaC5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEIuc2V0RnJvbUF4aXNBbmdsZShWRUMzX1BPU0lUSVZFX1ksIHlhdykpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KFFVQVRfWFlfQ1c5MCk7XG5cbiAgICAvLyB1cGRhdGUgdGFyZ2V0IGxpbmUgYW5kIHNwaGVyZVxuICAgIGNvbnN0IHsgdGFyZ2V0LCBhdXRvVXBkYXRlIH0gPSB0aGlzLnZybUxvb2tBdDtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgYXV0b1VwZGF0ZSkge1xuICAgICAgdGFyZ2V0LmdldFdvcmxkUG9zaXRpb24oX3YzQikuc3ViKF92M0EpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS50YWlsLmNvcHkoX3YzQik7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IHRyYW5zZm9ybSB0byBtZXNoZXNcbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogQSByZXBsYWNlbWVudCBvZiBgT2JqZWN0M0QuZ2V0V29ybGRRdWF0ZXJuaW9uYC5cbiAqIEV4dHJhY3QgdGhlIHdvcmxkIHF1YXRlcm5pb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgd2l0aG91dCBjYWxsaW5nIGBPYmplY3QzRC51cGRhdGVXb3JsZE1hdHJpeGAuXG4gKiBVc2UgdGhpcyB3aGVuIHlvdSdyZSBzdXJlIHRoYXQgdGhlIHdvcmxkIG1hdHJpeCBpcyB1cC10by1kYXRlLlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdFxuICogQHBhcmFtIG91dCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgb3V0LCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIENhbGN1bGF0ZSBhemltdXRoIC8gYWx0aXR1ZGUgYW5nbGVzIGZyb20gYSB2ZWN0b3IuXG4gKlxuICogVGhpcyByZXR1cm5zIGEgZGlmZmVyZW5jZSBvZiBhbmdsZXMgZnJvbSAoMSwgMCwgMCkuXG4gKiBBemltdXRoIHJlcHJlc2VudHMgYW4gYW5nbGUgYXJvdW5kIFkgYXhpcy5cbiAqIEFsdGl0dWRlIHJlcHJlc2VudHMgYW4gYW5nbGUgYXJvdW5kIFogYXhpcy5cbiAqIEl0IGlzIHJvdGF0ZWQgaW4gaW50cmluc2ljIFktWiBvcmRlci5cbiAqXG4gKiBAcGFyYW0gdmVjdG9yIFRoZSB2ZWN0b3JcbiAqIEByZXR1cm5zIEEgdHVwbGUgY29udGFpbnMgdHdvIGFuZ2xlcywgYFsgYXppbXV0aCwgYWx0aXR1ZGUgXWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGNBemltdXRoQWx0aXR1ZGUodmVjdG9yOiBUSFJFRS5WZWN0b3IzKTogW2F6aW11dGg6IG51bWJlciwgYWx0aXR1ZGU6IG51bWJlcl0ge1xuICByZXR1cm4gW01hdGguYXRhbjIoLXZlY3Rvci56LCB2ZWN0b3IueCksIE1hdGguYXRhbjIodmVjdG9yLnksIE1hdGguc3FydCh2ZWN0b3IueCAqIHZlY3Rvci54ICsgdmVjdG9yLnogKiB2ZWN0b3IueikpXTtcbn1cbiIsIi8qKlxuICogTWFrZSBzdXJlIHRoZSBhbmdsZSBpcyB3aXRoaW4gLVBJIHRvIFBJLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogc2FuaXRpemVBbmdsZSgxLjUgKiBNYXRoLlBJKSAvLyAtMC41ICogUElcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBhbmdsZSBBbiBpbnB1dCBhbmdsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVBbmdsZShhbmdsZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3Qgcm91bmRUdXJuID0gTWF0aC5yb3VuZChhbmdsZSAvIDIuMCAvIE1hdGguUEkpO1xuICByZXR1cm4gYW5nbGUgLSAyLjAgKiBNYXRoLlBJICogcm91bmRUdXJuO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBzYW5pdGl6ZUFuZ2xlIH0gZnJvbSAnLi91dGlscy9zYW5pdGl6ZUFuZ2xlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRDID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0RCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZXVsZXJBID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5cbi8qKlxuICogQSBjbGFzcyBjb250cm9scyBleWUgZ2F6ZSBtb3ZlbWVudHMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXQge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVVTEVSX09SREVSID0gJ1lYWic7IC8vIHlhdy1waXRjaC1yb2xsXG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW4gb2YgTG9va0F0LiBQb3NpdGlvbiBvZmZzZXQgZnJvbSB0aGUgaGVhZCBib25lLlxuICAgKi9cbiAgcHVibGljIG9mZnNldEZyb21IZWFkQm9uZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFZSTUxvb2tBdEFwcGxpZXJ9IG9mIHRoZSBMb29rQXQuXG4gICAqL1xuICBwdWJsaWMgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcjtcblxuICAvKipcbiAgICogSWYgdGhpcyBpcyB0cnVlLCB0aGUgTG9va0F0IHdpbGwgYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGNhbGxpbmcge0BsaW5rIHVwZGF0ZX0sIHRvd2FyZGluZyB0aGUgZGlyZWN0aW9uIHRvIHRoZSB7QGxpbmsgdGFyZ2V0fS5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgdGFyZ2V0fVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG9iamVjdCBvZiB0aGUgTG9va0F0LlxuICAgKiBOb3RlIHRoYXQgaXQgZG9lcyBub3QgbWFrZSBhbnkgc2Vuc2UgaWYge0BsaW5rIGF1dG9VcGRhdGV9IGlzIGRpc2FibGVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIGF1dG9VcGRhdGV9XG4gICAqL1xuICBwdWJsaWMgdGFyZ2V0PzogVEhSRUUuT2JqZWN0M0QgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZnJvbnQgZGlyZWN0aW9uIG9mIHRoZSBmYWNlLlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBWUk0gMC4wIGNvbXBhdCAoVlJNIDAuMCBtb2RlbHMgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForKS5cbiAgICogWW91IHVzdWFsbHkgZG9uJ3Qgd2FudCB0byB0b3VjaCB0aGlzLlxuICAgKi9cbiAgcHVibGljIGZhY2VGcm9udCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3lhdzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHlhdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl95YXc7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIHNldCB5YXcodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3lhdyA9IHZhbHVlO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX3BpdGNoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcGl0Y2goKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGl0Y2g7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIHNldCBwaXRjaCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcGl0Y2ggPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW5nbGVzIG5lZWQgdG8gYmUgYXBwbGllZCB0byBpdHMgW0BsaW5rIGFwcGxpZXJdLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uZWVkc1VwZGF0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogV29ybGQgcm90YXRpb24gb2YgdGhlIGhlYWQgaW4gaXRzIHJlc3QgcG9zZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGdldEV1bGVyfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCBldWxlcigpOiBUSFJFRS5FdWxlciB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXQ6IGV1bGVyIGlzIGRlcHJlY2F0ZWQuIHVzZSBnZXRFdWxlcigpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRFdWxlcihuZXcgVEhSRUUuRXVsZXIoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXR9LlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqIEBwYXJhbSBhcHBsaWVyIEEge0BsaW5rIFZSTUxvb2tBdEFwcGxpZXJ9XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBhcHBsaWVyOiBWUk1Mb29rQXRBcHBsaWVyKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuICAgIHRoaXMuYXBwbGllciA9IGFwcGxpZXI7XG5cbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgdGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24gPSB0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihuZXcgVEhSRUUuUXVhdGVybmlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIHlhdy1waXRjaCBhbmdsZXMgYXMgYW4gYEV1bGVyYC5cbiAgICogRG9lcyBOT1QgY29uc2lkZXIge0BsaW5rIGZhY2VGcm9udH07IGl0IHJldHVybnMgYEV1bGVyKDAsIDAsIDA7IFwiWVhaXCIpYCBieSBkZWZhdWx0IHJlZ2FyZGxlc3Mgb2YgdGhlIGZhY2VGcm9udCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IGV1bGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0RXVsZXIodGFyZ2V0OiBUSFJFRS5FdWxlcik6IFRIUkVFLkV1bGVyIHtcbiAgICByZXR1cm4gdGFyZ2V0LnNldChUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMuX3BpdGNoLCBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMuX3lhdywgMC4wLCAnWVhaJyk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUxvb2tBdH0gaW50byB0aGlzIG9uZS5cbiAgICoge0BsaW5rIGh1bWFub2lkfSBtdXN0IGJlIHNhbWUgYXMgdGhlIHNvdXJjZSBvbmUuXG4gICAqIHtAbGluayBhcHBsaWVyfSB3aWxsIHJlZmVyZW5jZSB0aGUgc2FtZSBpbnN0YW5jZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUxvb2tBdH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUxvb2tBdCk6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTG9va0F0OiBodW1hbm9pZCBtdXN0IGJlIHNhbWUgaW4gb3JkZXIgdG8gY29weScpO1xuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0RnJvbUhlYWRCb25lLmNvcHkoc291cmNlLm9mZnNldEZyb21IZWFkQm9uZSk7XG4gICAgdGhpcy5hcHBsaWVyID0gc291cmNlLmFwcGxpZXI7XG4gICAgdGhpcy5hdXRvVXBkYXRlID0gc291cmNlLmF1dG9VcGRhdGU7XG4gICAgdGhpcy50YXJnZXQgPSBzb3VyY2UudGFyZ2V0O1xuICAgIHRoaXMuZmFjZUZyb250LmNvcHkoc291cmNlLmZhY2VGcm9udCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICogTm90ZSB0aGF0IHtAbGluayBodW1hbm9pZH0gYW5kIHtAbGluayBhcHBsaWVyfSB3aWxsIHJlZmVyZW5jZSB0aGUgc2FtZSBpbnN0YW5jZSBhcyB0aGlzIG9uZS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1Mb29rQXR9XG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVlJNTG9va0F0IHtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdCh0aGlzLmh1bWFub2lkLCB0aGlzLmFwcGxpZXIpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGxvb2tBdCBkaXJlY3Rpb24gKHlhdyBhbmQgcGl0Y2gpIHRvIHRoZSBpbml0aWFsIGRpcmVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9va0F0IHBvc2l0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGRQb3NpdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpITtcblxuICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLm9mZnNldEZyb21IZWFkQm9uZSkuYXBwbHlNYXRyaXg0KGhlYWQubWF0cml4V29ybGQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9va0F0IHJvdGF0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUXVhdGVybmlvbih0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnaGVhZCcpITtcblxuICAgIHJldHVybiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKGhlYWQsIHRhcmdldCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcXVhdGVybmlvbiB0aGF0IHJvdGF0ZXMgdGhlICtaIHVuaXQgdmVjdG9yIG9mIHRoZSBodW1hbm9pZCBIZWFkIHRvIHRoZSB7QGxpbmsgZmFjZUZyb250fSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwdWJsaWMgZ2V0RmFjZUZyb250UXVhdGVybmlvbih0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbikuaW52ZXJ0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgW2ZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIF9ldWxlckEuc2V0KDAuMCwgMC41ICogTWF0aC5QSSArIGZhY2VGcm9udEF6aW11dGgsIGZhY2VGcm9udEFsdGl0dWRlLCAnWVpYJyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0LnNldEZyb21FdWxlcihfZXVsZXJBKS5wcmVtdWx0aXBseShfcXVhdEQuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbikuaW52ZXJ0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgTG9va0F0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHRoaXMuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0Qik7XG4gICAgdGhpcy5nZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKF9xdWF0Qyk7XG5cbiAgICByZXR1cm4gdGFyZ2V0XG4gICAgICAuY29weShWRUMzX1BPU0lUSVZFX1opXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKF9xdWF0QilcbiAgICAgIC5hcHBseVF1YXRlcm5pb24oX3F1YXRDKVxuICAgICAgLmFwcGx5RXVsZXIodGhpcy5nZXRFdWxlcihfZXVsZXJBKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGl0cyBsb29rQXQgdGFyZ2V0IHBvc2l0aW9uLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaXRzIHJlc3VsdCB3aWxsIGJlIGluc3RhbnRseSBvdmVyd3JpdHRlbiBpZiB7QGxpbmsgVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlfSBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBJZiB5b3Ugd2FudCB0byB0cmFjayBhbiBvYmplY3QgY29udGludW91c2x5LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHRhcmdldH0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIEEgdGFyZ2V0IHBvc2l0aW9uLCBpbiB3b3JsZCBzcGFjZVxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIGxvY2FsIGNvb3JkaW5hdGVcbiAgICBjb25zdCBoZWFkUm90RGlmZkludiA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkocXVhdEludmVydENvbXBhdCh0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpKSk7XG4gICAgY29uc3QgaGVhZFBvcyA9IHRoaXMuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNCKTtcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDLmNvcHkocG9zaXRpb24pLnN1YihoZWFkUG9zKS5hcHBseVF1YXRlcm5pb24oaGVhZFJvdERpZmZJbnYpLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGFuZ2xlc1xuICAgIGNvbnN0IFthemltdXRoRnJvbSwgYWx0aXR1ZGVGcm9tXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIGNvbnN0IFthemltdXRoVG8sIGFsdGl0dWRlVG9dID0gY2FsY0F6aW11dGhBbHRpdHVkZShsb29rQXREaXIpO1xuICAgIGNvbnN0IHlhdyA9IHNhbml0aXplQW5nbGUoYXppbXV0aFRvIC0gYXppbXV0aEZyb20pO1xuICAgIGNvbnN0IHBpdGNoID0gc2FuaXRpemVBbmdsZShhbHRpdHVkZUZyb20gLSBhbHRpdHVkZVRvKTsgLy8gc3Bpbm5pbmcgKDEsIDAsIDApIENDVyBhcm91bmQgWiBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayB1cCwgd2hpbGUgc3Bpbm5pbmcgKDAsIDAsIDEpIENDVyBhcm91bmQgWCBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayBkb3duXG5cbiAgICAvLyBhcHBseSBhbmdsZXNcbiAgICB0aGlzLl95YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHlhdztcbiAgICB0aGlzLl9waXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogcGl0Y2g7XG5cbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBWUk1Mb29rQXRIZWFkLlxuICAgKiBJZiB7QGxpbmsgYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZCwgdGhpcyB3aWxsIG1ha2UgaXQgbG9vayBhdCB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUsIGl0IGlzbid0IHVzZWQgdGhvdWdoLiBZb3UgY2FuIHVzZSB0aGUgcGFyYW1ldGVyIGlmIHlvdSB3YW50IHRvIHVzZSB0aGlzIGluIHlvdXIgb3duIGV4dGVuZGVkIHtAbGluayBWUk1Mb29rQXR9LlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwgJiYgdGhpcy5hdXRvVXBkYXRlKSB7XG4gICAgICB0aGlzLmxvb2tBdCh0aGlzLnRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0EpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbmVlZHNVcGRhdGUpIHtcbiAgICAgIHRoaXMuX25lZWRzVXBkYXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYXBwbGllci5hcHBseVlhd1BpdGNoKHRoaXMuX3lhdywgdGhpcy5fcGl0Y2gpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcbmltcG9ydCB7IGNhbGNBemltdXRoQWx0aXR1ZGUgfSBmcm9tICcuL3V0aWxzL2NhbGNBemltdXRoQWx0aXR1ZGUnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuXG5jb25zdCBWRUMzX1BPU0lUSVZFX1ogPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZXVsZXJBID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsICdZWFonKTtcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgYXBwbGllcyBleWUgZ2F6ZSBkaXJlY3Rpb25zIHRvIGEgVlJNLlxuICogSXQgd2lsbCBiZSB1c2VkIGJ5IHtAbGluayBWUk1Mb29rQXR9LlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0Qm9uZUFwcGxpZXIgaW1wbGVtZW50cyBWUk1Mb29rQXRBcHBsaWVyIHtcbiAgLyoqXG4gICAqIFJlcHJlc2VudCBpdHMgdHlwZSBvZiBhcHBsaWVyLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ2JvbmUnO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIGlud2FyZCBtb3ZlbWVudC4gVGhlIGxlZnQgZXllIG1vdmVzIHJpZ2h0LiBUaGUgcmlnaHQgZXllIG1vdmVzIGxlZnQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIGhvcml6b250YWwgb3V0d2FyZCBtb3ZlbWVudC4gVGhlIGxlZnQgZXllIG1vdmVzIGxlZnQuIFRoZSByaWdodCBleWUgbW92ZXMgcmlnaHQuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIGRvd253YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSB1cHdhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCB1cHdhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIGRvd253YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBUaGUgZnJvbnQgZGlyZWN0aW9uIG9mIHRoZSBmYWNlLlxuICAgKiBJbnRlbmRlZCB0byBiZSB1c2VkIGZvciBWUk0gMC4wIGNvbXBhdCAoVlJNIDAuMCBtb2RlbHMgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForKS5cbiAgICogWW91IHVzdWFsbHkgZG9uJ3Qgd2FudCB0byB0b3VjaCB0aGlzLlxuICAgKi9cbiAgcHVibGljIGZhY2VGcm9udDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiBMZWZ0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdExlZnRFeWU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgUmlnaHRFeWUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RRdWF0UmlnaHRFeWU6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSB3b3JsZC1zcGFjZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgaHVtYW5vaWQgTGVmdEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIFJpZ2h0RXllLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdEJvbmVBcHBsaWVyfS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxPdXRlciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxEb3duIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbFVwIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgKSB7XG4gICAgdGhpcy5odW1hbm9pZCA9IGh1bWFub2lkO1xuXG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lciA9IHJhbmdlTWFwSG9yaXpvbnRhbElubmVyO1xuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgPSByYW5nZU1hcEhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duID0gcmFuZ2VNYXBWZXJ0aWNhbERvd247XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAgPSByYW5nZU1hcFZlcnRpY2FsVXA7XG5cbiAgICB0aGlzLmZhY2VGcm9udCA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG4gICAgLy8gc2V0IHJlc3QgcXVhdGVybmlvbnNcbiAgICB0aGlzLl9yZXN0UXVhdExlZnRFeWUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG5cbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllLmNvcHkobGVmdEV5ZS5xdWF0ZXJuaW9uKTtcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUobGVmdEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllLmNvcHkocmlnaHRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHJpZ2h0RXllLnBhcmVudCEsIHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG4gICAgY29uc3QgbGVmdEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllTm9ybWFsaXplZCA9IHRoaXMuaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIC8vIGxlZnRcbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueCA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKC1waXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcChwaXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS55ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoLXlhdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnkgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdyk7XG4gICAgICB9XG5cbiAgICAgIF9xdWF0QS5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gICAgICB0aGlzLl9nZXRXb3JsZEZhY2VGcm9udFF1YXQoX3F1YXRCKTtcblxuICAgICAgLy8gX3F1YXRCICogX3F1YXRBICogX3F1YXRCXi0xXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgTG9va0F0IHJvdGF0aW9uXG4gICAgICAvLyBhbmQgX3F1YXRCIGlzIHdvcmxkRmFjZUZyb250UXVhdFxuICAgICAgbGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiBsZWZ0RXllTm9ybWFsaXplZC5xdWF0ZXJuaW9uICogX3F1YXRBICogcmVzdFF1YXRMZWZ0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIGxlZnRFeWUucXVhdGVybmlvblxuICAgICAgICAuY29weShsZWZ0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZSk7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAocmlnaHRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbi5jb3B5KF9xdWF0QikubXVsdGlwbHkoX3F1YXRBKS5tdWx0aXBseShfcXVhdEIuaW52ZXJ0KCkpO1xuXG4gICAgICBfcXVhdEEuY29weSh0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiByaWdodEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0UmlnaHRFeWVcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyByZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIHJpZ2h0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkocmlnaHRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uKVxuICAgICAgICAubXVsdGlwbHkoX3F1YXRBKVxuICAgICAgICAucHJlbXVsdGlwbHkoX3F1YXRBLmludmVydCgpKVxuICAgICAgICAubXVsdGlwbHkodGhpcy5fcmVzdFF1YXRSaWdodEV5ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgd29ybGQtc3BhY2UgK1ogdW5pdCB2ZWN0b3IgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHByaXZhdGUgX2dldFdvcmxkRmFjZUZyb250UXVhdCh0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4uL2V4cHJlc3Npb25zJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRSYW5nZU1hcCB9IGZyb20gJy4vVlJNTG9va0F0UmFuZ2VNYXAnO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhcHBsaWVzIGV5ZSBnYXplIGRpcmVjdGlvbnMgdG8gYSBWUk0uXG4gKiBJdCB3aWxsIGJlIHVzZWQgYnkge0BsaW5rIFZSTUxvb2tBdH0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciBpbXBsZW1lbnRzIFZSTUxvb2tBdEFwcGxpZXIge1xuICAvKipcbiAgICogUmVwcmVzZW50IGl0cyB0eXBlIG9mIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnZXhwcmVzc2lvbic7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBJdCB3b24ndCBiZSB1c2VkIGluIGV4cHJlc3Npb24gYXBwbGllci5cbiAgICogU2VlIGFsc286IHtAbGluayByYW5nZU1hcEhvcml6b250YWxPdXRlcn1cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgbGVmdCBvciByaWdodC5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgZG93bndhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIHVwd2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIHVwd2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgZG93bndhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbnMgQSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9XG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxJbm5lciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgaW5uZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBvdXRlciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbERvd24gQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsVXAgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcixcbiAgICByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICApIHtcbiAgICB0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnM7XG5cbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyID0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI7XG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlciA9IHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24gPSByYW5nZU1hcFZlcnRpY2FsRG93bjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxVcCA9IHJhbmdlTWFwVmVydGljYWxVcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgaW5wdXQgYW5nbGUgdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geWF3IFJvdGF0aW9uIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZVxuICAgKiBAcGFyYW0gcGl0Y2ggUm90YXRpb24gYXJvdW5kIFggYXhpcywgaW4gZGVncmVlXG4gICAqL1xuICBwdWJsaWMgYXBwbHlZYXdQaXRjaCh5YXc6IG51bWJlciwgcGl0Y2g6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0Rvd24nLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1VwJywgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKC1waXRjaCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0Rvd24nLCB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcChwaXRjaCkpO1xuICAgIH1cblxuICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tMZWZ0JywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tSaWdodCcsIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tMZWZ0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoeWF3KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gIC8qKlxuICAgKiBMaW1pdHMgdGhlIG1heGltdW0gYW5nbGUgb2YgdGhlIGlucHV0IGFuZ2xlIG9mIHRoZSBMb29rQXQgdmVjdG9yIGZyb20gdGhlIGZyb250IG9mIHRoZSBoZWFkICh0aGUgcG9zaXRpdmUgeiBheGlzKS5cbiAgICovXG4gIHB1YmxpYyBpbnB1dE1heFZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYW4gYW5nbGUgKGluIGRlZ3JlZXMpIGZvciBib25lIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLCBvciBhIHdlaWdodCBmb3IgZXhwcmVzc2lvbiB0eXBlIG9mIExvb2tBdCBhcHBsaWVycy5cbiAgICogVGhlIGlucHV0IHZhbHVlIHdpbGwgdGFrZSBgMS4wYCB3aGVuIHRoZSBpbnB1dCBhbmdsZSBlcXVhbHMgKG9yIGdyZWF0ZXIpIHRvIHtAbGluayBpbnB1dE1heFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyBvdXRwdXRTY2FsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfS5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TWF4VmFsdWUgVGhlIHtAbGluayBpbnB1dE1heFZhbHVlfSBvZiB0aGUgbWFwXG4gICAqIEBwYXJhbSBvdXRwdXRTY2FsZSBUaGUge0BsaW5rIG91dHB1dFNjYWxlfSBvZiB0aGUgbWFwXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXRNYXhWYWx1ZTogbnVtYmVyLCBvdXRwdXRTY2FsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dE1heFZhbHVlID0gaW5wdXRNYXhWYWx1ZTtcbiAgICB0aGlzLm91dHB1dFNjYWxlID0gb3V0cHV0U2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNjYWxlICogc2F0dXJhdGUoc3JjIC8gdGhpcy5pbnB1dE1heFZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1Mb29rQXRIZWxwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBUaGUgbWluaW11bSBwZXJtaXR0ZWQgdmFsdWUgZm9yIHtAbGluayBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcC5pbnB1dE1heFZhbHVlfS5cbiAqIElmIHRoZSBnaXZlbiB2YWx1ZSBpcyBzbWFsbGVyIHRoYW4gdGhpcywgdGhlIGxvYWRlciBzaG93cyBhIHdhcm5pbmcgYW5kIGNsYW1wcyB1cCB0aGUgdmFsdWUuXG4gKi9cbmNvbnN0IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNID0gMC4wMTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1Mb29rQXR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUxvb2tBdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB2cm1FeHByZXNzaW9uTWFuYWdlciA9IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgYXMgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUV4cHJlc3Npb25NYW5hZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtRXhwcmVzc2lvbk1hbmFnZXIgaXMgdW5kZWZpbmVkLiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtTG9va0F0ID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkLCB2cm1FeHByZXNzaW9uTWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCB8fCBleHByZXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCwgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUxvb2tBdExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxvb2tBdCA9IGV4dGVuc2lvbi5sb29rQXQ7XG4gICAgaWYgKCFzY2hlbWFMb29rQXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFMb29rQXQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5mcm9tQXJyYXkoc2NoZW1hTG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZSA/PyBbMC4wLCAwLjA2LCAwLjBdKTtcblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MUltcG9ydFJhbmdlTWFwKFxuICAgIHNjaGVtYVJhbmdlTWFwOiBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGxldCBpbnB1dE1heFZhbHVlID0gc2NoZW1hUmFuZ2VNYXA/LmlucHV0TWF4VmFsdWUgPz8gOTAuMDtcbiAgICBjb25zdCBvdXRwdXRTY2FsZSA9IHNjaGVtYVJhbmdlTWFwPy5vdXRwdXRTY2FsZSA/PyBkZWZhdWx0T3V0cHV0U2NhbGU7XG5cbiAgICAvLyBJdCBtaWdodCBjYXVzZSBOYU4gd2hlbiBgaW5wdXRNYXhWYWx1ZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKGlucHV0TWF4VmFsdWUgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBpbnB1dE1heFZhbHVlIG9mIGEgcmFuZ2UgbWFwIGlzIHRvbyBzbWFsbC4gQ29uc2lkZXIgcmV2aWV3aW5nIHRoZSByYW5nZSBtYXAhJyxcbiAgICAgICk7XG4gICAgICBpbnB1dE1heFZhbHVlID0gSU5QVVRfTUFYX1ZBTFVFX01JTklNVU07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRSYW5nZU1hcChpbnB1dE1heFZhbHVlLCBvdXRwdXRTY2FsZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lID09PSAnQmxlbmRTaGFwZScgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsSW5uZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwSE8gPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MEltcG9ydERlZ3JlZU1hcChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbFVwLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuXG4gICAgbGV0IGFwcGxpZXI7XG5cbiAgICBpZiAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJykge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcihleHByZXNzaW9ucywgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEJvbmVBcHBsaWVyKGh1bWFub2lkLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9va0F0ID0gdGhpcy5faW1wb3J0TG9va0F0KGh1bWFub2lkLCBhcHBsaWVyKTtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQpIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KFxuICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueCA/PyAwLjAsXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC55ID8/IDAuMDYsXG4gICAgICAgIC0oc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnogPz8gMC4wKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb2tBdC5vZmZzZXRGcm9tSGVhZEJvbmUuc2V0KDAuMCwgMC4wNiwgMC4wKTtcbiAgICB9XG5cbiAgICAvLyBWUk0gMC4wIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaK1xuICAgIGxvb2tBdC5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcblxuICAgIGlmIChhcHBsaWVyIGluc3RhbmNlb2YgVlJNTG9va0F0Qm9uZUFwcGxpZXIpIHtcbiAgICAgIGFwcGxpZXIuZmFjZUZyb250LnNldCgwLjAsIDAuMCwgLTEuMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YwSW1wb3J0RGVncmVlTWFwKFxuICAgIHNjaGVtYURlZ3JlZU1hcDogVjBWUk0uRmlyc3RQZXJzb25EZWdyZWVNYXAgfCB1bmRlZmluZWQsXG4gICAgZGVmYXVsdE91dHB1dFNjYWxlOiBudW1iZXIsXG4gICk6IFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgICBjb25zdCBjdXJ2ZSA9IHNjaGVtYURlZ3JlZU1hcD8uY3VydmU7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KGN1cnZlKSAhPT0gJ1swLDAsMCwxLDEsMSwxLDBdJykge1xuICAgICAgY29uc29sZS53YXJuKCdDdXJ2ZXMgb2YgTG9va0F0RGVncmVlTWFwIGRlZmluZWQgaW4gVlJNIDAuMCBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cblxuICAgIGxldCB4UmFuZ2UgPSBzY2hlbWFEZWdyZWVNYXA/LnhSYW5nZSA/PyA5MC4wO1xuICAgIGNvbnN0IHlSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueVJhbmdlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGB4UmFuZ2VgIGlzIHRvbyBzbWFsbFxuICAgIC8vIHdoaWNoIG1ha2VzIHRoZSBtZXNoIG9mIHRoZSBoZWFkIGRpc2FwcGVhclxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9pc3N1ZXMvMTIwMVxuICAgIGlmICh4UmFuZ2UgPCBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTSkge1xuICAgICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IHhSYW5nZSBvZiBhIGRlZ3JlZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIGRlZ3JlZSBtYXAhJyk7XG4gICAgICB4UmFuZ2UgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKHhSYW5nZSwgeVJhbmdlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydExvb2tBdChodW1hbm9pZDogVlJNSHVtYW5vaWQsIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXIpOiBWUk1Mb29rQXQge1xuICAgIGNvbnN0IGxvb2tBdCA9IG5ldyBWUk1Mb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUxvb2tBdEhlbHBlcihsb29rQXQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0eXBlIG9mIGFwcGxpZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBWUk1Mb29rQXRUeXBlTmFtZSA9IHtcbiAgQm9uZTogJ2JvbmUnLFxuICBFeHByZXNzaW9uOiAnZXhwcmVzc2lvbicsXG59O1xuXG5leHBvcnQgdHlwZSBWUk1Mb29rQXRUeXBlTmFtZSA9IHR5cGVvZiBWUk1Mb29rQXRUeXBlTmFtZVtrZXlvZiB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVdO1xuIiwiLyoqXG4gKiBZb2lua2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVVJMKHVybDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBJbnZhbGlkIFVSTFxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycgfHwgdXJsID09PSAnJykgcmV0dXJuICcnO1xuXG4gIC8vIEhvc3QgUmVsYXRpdmUgVVJMXG4gIGlmICgvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KHBhdGgpICYmIC9eXFwvLy50ZXN0KHVybCkpIHtcbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC8oXmh0dHBzPzpcXC9cXC9bXi9dKykuKi9pLCAnJDEnKTtcbiAgfVxuXG4gIC8vIEFic29sdXRlIFVSTCBodHRwOi8vLGh0dHBzOi8vLC8vXG4gIGlmICgvXihodHRwcz86KT9cXC9cXC8vaS50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgLy8gRGF0YSBVUklcbiAgaWYgKC9eZGF0YTouKiwuKiQvaS50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgLy8gQmxvYiBVUkxcbiAgaWYgKC9eYmxvYjouKiQvaS50ZXN0KHVybCkpIHJldHVybiB1cmw7XG5cbiAgLy8gUmVsYXRpdmUgVVJMXG4gIHJldHVybiBwYXRoICsgdXJsO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTTBNZXRhIH0gZnJvbSAnLi9WUk0wTWV0YSc7XG5pbXBvcnQgdHlwZSB7IFZSTTFNZXRhIH0gZnJvbSAnLi9WUk0xTWV0YSc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGEgfSBmcm9tICcuL1ZSTU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgcmVzb2x2ZVVSTCB9IGZyb20gJy4uL3V0aWxzL3Jlc29sdmVVUkwnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNMU1ldGF9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTU1ldGFMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICAvKipcbiAgICogSWYgYGZhbHNlYCwgaXQgd29uJ3QgbG9hZCBpdHMgdGh1bWJuYWlsIGltYWdlICh7QGxpbmsgVlJNMU1ldGEudGh1bWJuYWlsSW1hZ2V9KS5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgbmVlZFRodW1ibmFpbEltYWdlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgbGljZW5zZSB1cmxzLlxuICAgKiBUaGlzIG1ldGEgbG9hZGVyIHdpbGwgYWNjZXB0IHRoZXNlIGBsaWNlbnNlVXJsYHMuXG4gICAqIE90aGVyd2lzZSBpdCB3b24ndCBiZSBsb2FkZWQuXG4gICAqL1xuICBwdWJsaWMgYWNjZXB0TGljZW5zZVVybHM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGl0IHNob3VsZCBhY2NlcHQgVlJNMC4wIG1ldGEgb3Igbm90LlxuICAgKiBOb3RlIHRoYXQgaXQgbWlnaHQgbG9hZCB7QGxpbmsgVlJNME1ldGF9IGluc3RlYWQgb2Yge0BsaW5rIFZSTTFNZXRhfSB3aGVuIHRoaXMgaXMgYHRydWVgLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBhY2NlcHRWME1ldGE6IGJvb2xlYW47XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTU1ldGFMb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLm5lZWRUaHVtYm5haWxJbWFnZSA9IG9wdGlvbnM/Lm5lZWRUaHVtYm5haWxJbWFnZSA/PyB0cnVlO1xuICAgIHRoaXMuYWNjZXB0TGljZW5zZVVybHMgPSBvcHRpb25zPy5hY2NlcHRMaWNlbnNlVXJscyA/PyBbJ2h0dHBzOi8vdnJtLmRldi9saWNlbnNlcy8xLjAvJ107XG4gICAgdGhpcy5hY2NlcHRWME1ldGEgPSBvcHRpb25zPy5hY2NlcHRWME1ldGEgPz8gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGdsdGYudXNlckRhdGEudnJtTWV0YSA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0xTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IGV4dGVuc2lvbi5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgY29uc3QgbGljZW5zZVVybCA9IHNjaGVtYU1ldGEubGljZW5zZVVybDtcbiAgICBjb25zdCBhY2NlcHRMaWNlbnNlVXJsc1NldCA9IG5ldyBTZXQodGhpcy5hY2NlcHRMaWNlbnNlVXJscyk7XG4gICAgaWYgKCFhY2NlcHRMaWNlbnNlVXJsc1NldC5oYXMobGljZW5zZVVybCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVlJNTWV0YUxvYWRlclBsdWdpbjogVGhlIGxpY2Vuc2UgdXJsIFwiJHtsaWNlbnNlVXJsfVwiIGlzIG5vdCBhY2NlcHRlZGApO1xuICAgIH1cblxuICAgIGxldCB0aHVtYm5haWxJbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSAhPSBudWxsKSB7XG4gICAgICB0aHVtYm5haWxJbWFnZSA9IChhd2FpdCB0aGlzLl9leHRyYWN0R0xURkltYWdlKHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UpKSA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMScsXG4gICAgICBuYW1lOiBzY2hlbWFNZXRhLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICBhdXRob3JzOiBzY2hlbWFNZXRhLmF1dGhvcnMsXG4gICAgICBjb3B5cmlnaHRJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb3B5cmlnaHRJbmZvcm1hdGlvbixcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICByZWZlcmVuY2VzOiBzY2hlbWFNZXRhLnJlZmVyZW5jZXMsXG4gICAgICB0aGlyZFBhcnR5TGljZW5zZXM6IHNjaGVtYU1ldGEudGhpcmRQYXJ0eUxpY2Vuc2VzLFxuICAgICAgdGh1bWJuYWlsSW1hZ2UsXG4gICAgICBsaWNlbnNlVXJsOiBzY2hlbWFNZXRhLmxpY2Vuc2VVcmwsXG4gICAgICBhdmF0YXJQZXJtaXNzaW9uOiBzY2hlbWFNZXRhLmF2YXRhclBlcm1pc3Npb24sXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2UsXG4gICAgICBhbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlLFxuICAgICAgY29tbWVyY2lhbFVzYWdlOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc2FnZSxcbiAgICAgIGFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZTogc2NoZW1hTWV0YS5hbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2UsXG4gICAgICBhbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0FudGlzb2NpYWxPckhhdGVVc2FnZSxcbiAgICAgIGNyZWRpdE5vdGF0aW9uOiBzY2hlbWFNZXRhLmNyZWRpdE5vdGF0aW9uLFxuICAgICAgYWxsb3dSZWRpc3RyaWJ1dGlvbjogc2NoZW1hTWV0YS5hbGxvd1JlZGlzdHJpYnV0aW9uLFxuICAgICAgbW9kaWZpY2F0aW9uOiBzY2hlbWFNZXRhLm1vZGlmaWNhdGlvbixcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTBNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGlmICghdGhpcy5hY2NlcHRWME1ldGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdGVkIHRvIGxvYWQgVlJNMC4wIG1ldGEgYnV0IGFjY2VwdFYwTWV0YSBpcyBmYWxzZScpO1xuICAgIH1cblxuICAgIC8vIGxvYWQgdGh1bWJuYWlsIHRleHR1cmVcbiAgICBsZXQgdGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcwJyxcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2V4dHJhY3RHTFRGSW1hZ2UoaW5kZXg6IG51bWJlcik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3Qgc291cmNlID0ganNvbi5pbWFnZXM/LltpbmRleF07XG5cbiAgICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGRvZXNuJ3QgZXhpc3RgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL3IxMjQvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyNMMjQ2N1xuXG4gICAgLy8gYHNvdXJjZS51cmlgIG1pZ2h0IGJlIGEgcmVmZXJlbmNlIHRvIGEgZmlsZVxuICAgIGxldCBzb3VyY2VVUkk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHNvdXJjZS51cmk7XG5cbiAgICAvLyBMb2FkIHRoZSBiaW5hcnkgYXMgYSBibG9iXG4gICAgaWYgKHNvdXJjZS5idWZmZXJWaWV3ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdidWZmZXJWaWV3Jywgc291cmNlLmJ1ZmZlclZpZXcpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJWaWV3XSwgeyB0eXBlOiBzb3VyY2UubWltZVR5cGUgfSk7XG4gICAgICBzb3VyY2VVUkkgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VVUkkgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgY291bGRuJ3QgbG9hZCBwcm9wZXJseWAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLkltYWdlTG9hZGVyKCk7XG4gICAgcmV0dXJuIGF3YWl0IGxvYWRlci5sb2FkQXN5bmMocmVzb2x2ZVVSTChzb3VyY2VVUkksICh0aGlzLnBhcnNlciBhcyBhbnkpLm9wdGlvbnMucGF0aCkpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEZhaWxlZCB0byBsb2FkIGEgdGh1bWJuYWlsIGltYWdlJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYW5hZ2VyJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9sb29rQXQvVlJNTG9va0F0JztcbmltcG9ydCB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEvVlJNTWV0YSc7XG5pbXBvcnQgeyBWUk1Db3JlUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNQ29yZVBhcmFtZXRlcnMnO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIFZSTSBtb2RlbC5cbiAqIFRoaXMgY2xhc3Mgb25seSBpbmNsdWRlcyBjb3JlIHNwZWMgb2YgdGhlIFZSTSAoYFZSTUNfdnJtYCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Db3JlIHtcbiAgLyoqXG4gICAqIGBUSFJFRS5Hcm91cGAgdGhhdCBjb250YWlucyB0aGUgZW50aXJlIFZSTS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzY2VuZTogVEhSRUUuR3JvdXA7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIG1ldGEgZmllbGRzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHJlZmVyIHRoZXNlIGxpY2Vuc2UgZmllbGRzIGJlZm9yZSB1c2UgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1ldGE6IFZSTU1ldGE7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1IdW1hbm9pZH0gb2YgdGhlIFZSTS5cbiAgICogWW91IGNhbiBjb250cm9sIGVhY2ggYm9uZXMgdXNpbmcge0BsaW5rIFZSTUh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZX0gb3Ige0BsaW5rIFZSTUh1bWFub2lkLmdldFJhd0JvbmVOb2RlfS5cbiAgICpcbiAgICogQFRPRE8gQWRkIGEgbGluayB0byBWUk0gc3BlY1xuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjb250cm9sIHRoZXNlIGZhY2lhbCBleHByZXNzaW9ucyB2aWEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyLnNldFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uTWFuYWdlcj86IFZSTUV4cHJlc3Npb25NYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNRmlyc3RQZXJzb259IG9mIHRoZSBWUk0uXG4gICAqIFZSTUZpcnN0UGVyc29uIGlzIG1vc3RseSB1c2VkIGZvciBtZXNoIGN1bGxpbmcgZm9yIGZpcnN0IHBlcnNvbiB2aWV3LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uPzogVlJNRmlyc3RQZXJzb247XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1Mb29rQXR9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgVlJNTG9va0F0LnRhcmdldH0gdG8gY29udHJvbCB0aGUgZXllIGRpcmVjdGlvbiBvZiB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbG9va0F0PzogVlJNTG9va0F0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIFtbVlJNUGFyYW1ldGVyc11dIHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTUNvcmVQYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5zY2VuZSA9IHBhcmFtcy5zY2VuZTtcbiAgICB0aGlzLm1ldGEgPSBwYXJhbXMubWV0YTtcbiAgICB0aGlzLmh1bWFub2lkID0gcGFyYW1zLmh1bWFub2lkO1xuICAgIHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIgPSBwYXJhbXMuZXhwcmVzc2lvbk1hbmFnZXI7XG4gICAgdGhpcy5maXJzdFBlcnNvbiA9IHBhcmFtcy5maXJzdFBlcnNvbjtcbiAgICB0aGlzLmxvb2tBdCA9IHBhcmFtcy5sb29rQXQ7XG4gIH1cblxuICAvKipcbiAgICogKipZb3UgbmVlZCB0byBjYWxsIHRoaXMgb24geW91ciB1cGRhdGUgbG9vcC4qKlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgZXZlcnkgVlJNIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaHVtYW5vaWQudXBkYXRlKCk7XG5cbiAgICBpZiAodGhpcy5sb29rQXQpIHtcbiAgICAgIHRoaXMubG9va0F0LnVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIpIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbk1hbmFnZXIudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNQ29yZSB9IGZyb20gJy4vVlJNQ29yZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9maXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiB9IGZyb20gJy4vaHVtYW5vaWQvVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNTWV0YUxvYWRlclBsdWdpbiB9IGZyb20gJy4vbWV0YS9WUk1NZXRhTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUxvb2tBdExvYWRlclBsdWdpbiB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdExvYWRlclBsdWdpbic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZCc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEnO1xuXG5leHBvcnQgY2xhc3MgVlJNQ29yZUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNQ192cm0nO1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvblBsdWdpbjogVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uUGx1Z2luOiBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkUGx1Z2luOiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdFBsdWdpbjogVlJNTG9va0F0TG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YVBsdWdpbjogVlJNTWV0YUxvYWRlclBsdWdpbjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIGNvbnN0IGhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICAgIGNvbnN0IGF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLmV4cHJlc3Npb25QbHVnaW4gPSBvcHRpb25zPy5leHByZXNzaW9uUGx1Z2luID8/IG5ldyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5maXJzdFBlcnNvblBsdWdpbiA9IG9wdGlvbnM/LmZpcnN0UGVyc29uUGx1Z2luID8/IG5ldyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuaHVtYW5vaWRQbHVnaW4gPVxuICAgICAgb3B0aW9ucz8uaHVtYW5vaWRQbHVnaW4gPz8gbmV3IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290LCBhdXRvVXBkYXRlSHVtYW5Cb25lcyB9KTtcbiAgICB0aGlzLmxvb2tBdFBsdWdpbiA9IG9wdGlvbnM/Lmxvb2tBdFBsdWdpbiA/PyBuZXcgVlJNTG9va0F0TG9hZGVyUGx1Z2luKHBhcnNlciwgeyBoZWxwZXJSb290IH0pO1xuICAgIHRoaXMubWV0YVBsdWdpbiA9IG9wdGlvbnM/Lm1ldGFQbHVnaW4gPz8gbmV3IFZSTU1ldGFMb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZnRlclJvb3QoZ2x0ZjogR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubWV0YVBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5odW1hbm9pZFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5leHByZXNzaW9uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmxvb2tBdFBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5maXJzdFBlcnNvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG5cbiAgICBjb25zdCBtZXRhID0gZ2x0Zi51c2VyRGF0YS52cm1NZXRhIGFzIFZSTU1ldGEgfCBudWxsO1xuICAgIGNvbnN0IGh1bWFub2lkID0gZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCBhcyBWUk1IdW1hbm9pZCB8IG51bGw7XG5cbiAgICAvLyBtZXRhIGFuZCBodW1hbm9pZCBhcmUgcmVxdWlyZWQgdG8gYmUgYSBWUk0uXG4gICAgLy8gRG9uJ3QgY3JlYXRlIFZSTSBpZiB0aGV5IGFyZSBudWxsXG4gICAgaWYgKG1ldGEgJiYgaHVtYW5vaWQpIHtcbiAgICAgIGNvbnN0IHZybUNvcmUgPSBuZXcgVlJNQ29yZSh7XG4gICAgICAgIHNjZW5lOiBnbHRmLnNjZW5lLFxuICAgICAgICBleHByZXNzaW9uTWFuYWdlcjogZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlcixcbiAgICAgICAgZmlyc3RQZXJzb246IGdsdGYudXNlckRhdGEudnJtRmlyc3RQZXJzb24sXG4gICAgICAgIGh1bWFub2lkLFxuICAgICAgICBsb29rQXQ6IGdsdGYudXNlckRhdGEudnJtTG9va0F0LFxuICAgICAgICBtZXRhLFxuICAgICAgfSk7XG5cbiAgICAgIGdsdGYudXNlckRhdGEudnJtQ29yZSA9IHZybUNvcmU7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsIl92M0EiLCJfdjNCIiwiX3F1YXRBIiwiX3F1YXRCIiwiVkVDM19QT1NJVElWRV9aIiwiX2V1bGVyQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDYSxNQUFBLGFBQWMsU0FBUSxLQUFLLENBQUMsUUFBUSxDQUFBO0FBb0MvQzs7O0FBR0c7QUFDSCxJQUFBLElBQVcsbUJBQW1CLEdBQUE7QUFDNUIsUUFBQSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFFO0FBQ2xDLFlBQUEsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLFNBQUE7QUFBTSxhQUFBLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3BCLFNBQUE7QUFBTSxhQUFBO0FBQ0wsWUFBQSxPQUFPLEdBQUcsQ0FBQztBQUNaLFNBQUE7S0FDRjtBQUVEOzs7QUFHRztBQUNILElBQUEsSUFBVyxvQkFBb0IsR0FBQTtBQUM3QixRQUFBLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxPQUFPLEVBQUU7QUFDbkMsWUFBQSxPQUFPLEdBQUcsR0FB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O0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFnTUQ7QUFDdUIs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
