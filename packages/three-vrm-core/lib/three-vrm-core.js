/*!
 * @pixiv/three-vrm-core v2.0.10
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2024 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_CORE = {}, global.THREE));
})(this, (function (exports, THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    // animationMixer の監視対象は、Scene の中に入っている必要がある。
    // そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
    class VRMExpression extends THREE__namespace.Object3D {
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
        const threeRevision = parseInt(THREE__namespace.REVISION, 10);
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

    const _color = new THREE__namespace.Color();
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
            const deltaValue = new THREE__namespace.Color(targetValue.r - initialValue.r, targetValue.g - initialValue.g, targetValue.b - initialValue.b);
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

    const _v2 = new THREE__namespace.Vector2();
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
                                    targetValue: new THREE__namespace.Color().fromArray(bind.targetValue),
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
                                    offset: new THREE__namespace.Vector2().fromArray((_a = bind.offset) !== null && _a !== void 0 ? _a : [0.0, 0.0]),
                                    scale: new THREE__namespace.Vector2().fromArray((_b = bind.scale) !== null && _b !== void 0 ? _b : [1.0, 1.0]),
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
                                    const scale = new THREE__namespace.Vector2(materialValue.targetValue[0], materialValue.targetValue[1]);
                                    const offset = new THREE__namespace.Vector2(materialValue.targetValue[2], materialValue.targetValue[3]);
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
                                        targetValue: new THREE__namespace.Color().fromArray(materialValue.targetValue),
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
            const dst = new THREE__namespace.SkinnedMesh(src.geometry.clone(), src.material);
            dst.name = `${src.name}(erase)`;
            dst.frustumCulled = src.frustumCulled;
            dst.layers.set(this._firstPersonOnlyLayer);
            const geometry = dst.geometry;
            const skinIndexAttr = geometry.getAttribute('skinIndex');
            const skinIndexAttrArray = skinIndexAttr instanceof THREE__namespace.GLBufferAttribute ? [] : skinIndexAttr.array;
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
            const skinWeightAttrArray = skinWeightAttr instanceof THREE__namespace.GLBufferAttribute ? [] : skinWeightAttr.array;
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
            dst.bind(new THREE__namespace.Skeleton(src.skeleton.bones, src.skeleton.boneInverses), new THREE__namespace.Matrix4());
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
                    const parent = new THREE__namespace.Group();
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

    const _v3A$4 = new THREE__namespace.Vector3();
    const _v3B$2 = new THREE__namespace.Vector3();
    const _quatA$5 = new THREE__namespace.Quaternion();
    class VRMHumanoidHelper extends THREE__namespace.Group {
        constructor(humanoid) {
            super();
            this.vrmHumanoid = humanoid;
            this._boneAxesMap = new Map();
            Object.values(humanoid.humanBones).forEach((bone) => {
                const helper = new THREE__namespace.AxesHelper(1.0);
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

    const _v3A$3 = new THREE__namespace.Vector3();
    const _quatA$4 = new THREE__namespace.Quaternion();
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

    const _v3A$2 = new THREE__namespace.Vector3();
    const _quatA$3 = new THREE__namespace.Quaternion();
    const _boneWorldPos = new THREE__namespace.Vector3();
    /**
     * A class represents the normalized Rig of a VRM.
     */
    class VRMHumanoidRig extends VRMRig {
        static _setupTransforms(modelRig) {
            const root = new THREE__namespace.Object3D();
            root.name = 'VRMHumanoidRig';
            // store boneWorldPositions, boneWorldRotations, and parentWorldRotations
            const boneWorldPositions = {};
            const boneRotations = {};
            const parentWorldRotations = {};
            VRMHumanBoneList.forEach((boneName) => {
                var _a;
                const boneNode = modelRig.getBoneNode(boneName);
                if (boneNode) {
                    const boneWorldPosition = new THREE__namespace.Vector3();
                    const boneWorldRotation = new THREE__namespace.Quaternion();
                    boneNode.updateWorldMatrix(true, false);
                    boneNode.matrixWorld.decompose(boneWorldPosition, boneWorldRotation, _v3A$2);
                    boneWorldPositions[boneName] = boneWorldPosition;
                    boneRotations[boneName] = boneNode.quaternion.clone();
                    const parentWorldRotation = new THREE__namespace.Quaternion();
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
                    const rigBoneNode = new THREE__namespace.Object3D();
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

    class FanBufferGeometry extends THREE__namespace.BufferGeometry {
        constructor() {
            super();
            this._currentTheta = 0;
            this._currentRadius = 0;
            this.theta = 0.0;
            this.radius = 0.0;
            this._currentTheta = 0.0;
            this._currentRadius = 0.0;
            this._attrPos = new THREE__namespace.BufferAttribute(new Float32Array(65 * 3), 3);
            this.setAttribute('position', this._attrPos);
            this._attrIndex = new THREE__namespace.BufferAttribute(new Uint16Array(3 * 63), 1);
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

    class LineAndSphereBufferGeometry extends THREE__namespace.BufferGeometry {
        constructor() {
            super();
            this.radius = 0.0;
            this._currentRadius = 0.0;
            this.tail = new THREE__namespace.Vector3();
            this._currentTail = new THREE__namespace.Vector3();
            this._attrPos = new THREE__namespace.BufferAttribute(new Float32Array(294), 3);
            this.setAttribute('position', this._attrPos);
            this._attrIndex = new THREE__namespace.BufferAttribute(new Uint16Array(194), 1);
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

    const _quatA$2 = new THREE__namespace.Quaternion();
    const _quatB$2 = new THREE__namespace.Quaternion();
    const _v3A$1 = new THREE__namespace.Vector3();
    const _v3B$1 = new THREE__namespace.Vector3();
    const SQRT_2_OVER_2 = Math.sqrt(2.0) / 2.0;
    const QUAT_XY_CW90 = new THREE__namespace.Quaternion(0, 0, -SQRT_2_OVER_2, SQRT_2_OVER_2);
    const VEC3_POSITIVE_Y = new THREE__namespace.Vector3(0.0, 1.0, 0.0);
    class VRMLookAtHelper extends THREE__namespace.Group {
        constructor(lookAt) {
            super();
            this.matrixAutoUpdate = false;
            this.vrmLookAt = lookAt;
            {
                const geometry = new FanBufferGeometry();
                geometry.radius = 0.5;
                const material = new THREE__namespace.MeshBasicMaterial({
                    color: 0x00ff00,
                    transparent: true,
                    opacity: 0.5,
                    side: THREE__namespace.DoubleSide,
                    depthTest: false,
                    depthWrite: false,
                });
                this._meshPitch = new THREE__namespace.Mesh(geometry, material);
                this.add(this._meshPitch);
            }
            {
                const geometry = new FanBufferGeometry();
                geometry.radius = 0.5;
                const material = new THREE__namespace.MeshBasicMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 0.5,
                    side: THREE__namespace.DoubleSide,
                    depthTest: false,
                    depthWrite: false,
                });
                this._meshYaw = new THREE__namespace.Mesh(geometry, material);
                this.add(this._meshYaw);
            }
            {
                const geometry = new LineAndSphereBufferGeometry();
                geometry.radius = 0.1;
                const material = new THREE__namespace.LineBasicMaterial({
                    color: 0xffffff,
                    depthTest: false,
                    depthWrite: false,
                });
                this._lineTarget = new THREE__namespace.LineSegments(geometry, material);
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
            const yaw = THREE__namespace.MathUtils.DEG2RAD * this.vrmLookAt.yaw;
            this._meshYaw.geometry.theta = yaw;
            this._meshYaw.geometry.update();
            const pitch = THREE__namespace.MathUtils.DEG2RAD * this.vrmLookAt.pitch;
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

    const _position = new THREE__namespace.Vector3();
    const _scale = new THREE__namespace.Vector3();
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

    const VEC3_POSITIVE_Z$1 = new THREE__namespace.Vector3(0.0, 0.0, 1.0);
    const _v3A = new THREE__namespace.Vector3();
    const _v3B = new THREE__namespace.Vector3();
    const _v3C = new THREE__namespace.Vector3();
    const _quatA$1 = new THREE__namespace.Quaternion();
    const _quatB$1 = new THREE__namespace.Quaternion();
    const _quatC = new THREE__namespace.Quaternion();
    const _quatD = new THREE__namespace.Quaternion();
    const _eulerA$1 = new THREE__namespace.Euler();
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
            return this.getEuler(new THREE__namespace.Euler());
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
            this.offsetFromHeadBone = new THREE__namespace.Vector3();
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
            this.faceFront = new THREE__namespace.Vector3(0.0, 0.0, 1.0);
            this.humanoid = humanoid;
            this.applier = applier;
            this._yaw = 0.0;
            this._pitch = 0.0;
            this._needsUpdate = true;
            this._restHeadWorldQuaternion = this.getLookAtWorldQuaternion(new THREE__namespace.Quaternion());
        }
        /**
         * Get its yaw-pitch angles as an `Euler`.
         * Does NOT consider {@link faceFront}; it returns `Euler(0, 0, 0; "YXZ")` by default regardless of the faceFront value.
         *
         * @param target The target euler
         */
        getEuler(target) {
            return target.set(THREE__namespace.MathUtils.DEG2RAD * this._pitch, THREE__namespace.MathUtils.DEG2RAD * this._yaw, 0.0, 'YXZ');
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
            this._yaw = THREE__namespace.MathUtils.RAD2DEG * yaw;
            this._pitch = THREE__namespace.MathUtils.RAD2DEG * pitch;
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

    const VEC3_POSITIVE_Z = new THREE__namespace.Vector3(0.0, 0.0, 1.0);
    const _quatA = new THREE__namespace.Quaternion();
    const _quatB = new THREE__namespace.Quaternion();
    const _eulerA = new THREE__namespace.Euler(0.0, 0.0, 0.0, 'YXZ');
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
            this.faceFront = new THREE__namespace.Vector3(0.0, 0.0, 1.0);
            // set rest quaternions
            this._restQuatLeftEye = new THREE__namespace.Quaternion();
            this._restQuatRightEye = new THREE__namespace.Quaternion();
            this._restLeftEyeParentWorldQuat = new THREE__namespace.Quaternion();
            this._restRightEyeParentWorldQuat = new THREE__namespace.Quaternion();
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
                    _eulerA.x = -THREE__namespace.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
                }
                else {
                    _eulerA.x = THREE__namespace.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
                }
                if (yaw < 0.0) {
                    _eulerA.y = -THREE__namespace.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(-yaw);
                }
                else {
                    _eulerA.y = THREE__namespace.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(yaw);
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
                    _eulerA.x = -THREE__namespace.MathUtils.DEG2RAD * this.rangeMapVerticalDown.map(-pitch);
                }
                else {
                    _eulerA.x = THREE__namespace.MathUtils.DEG2RAD * this.rangeMapVerticalUp.map(pitch);
                }
                if (yaw < 0.0) {
                    _eulerA.y = -THREE__namespace.MathUtils.DEG2RAD * this.rangeMapHorizontalOuter.map(-yaw);
                }
                else {
                    _eulerA.y = THREE__namespace.MathUtils.DEG2RAD * this.rangeMapHorizontalInner.map(yaw);
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
            const yaw = THREE__namespace.MathUtils.RAD2DEG * euler.y;
            const pitch = THREE__namespace.MathUtils.RAD2DEG * euler.x;
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
            const yaw = THREE__namespace.MathUtils.RAD2DEG * euler.y;
            const pitch = THREE__namespace.MathUtils.RAD2DEG * euler.x;
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
                const loader = new THREE__namespace.ImageLoader();
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

    exports.VRMCore = VRMCore;
    exports.VRMCoreLoaderPlugin = VRMCoreLoaderPlugin;
    exports.VRMExpression = VRMExpression;
    exports.VRMExpressionLoaderPlugin = VRMExpressionLoaderPlugin;
    exports.VRMExpressionManager = VRMExpressionManager;
    exports.VRMExpressionMaterialColorBind = VRMExpressionMaterialColorBind;
    exports.VRMExpressionMaterialColorType = VRMExpressionMaterialColorType;
    exports.VRMExpressionMorphTargetBind = VRMExpressionMorphTargetBind;
    exports.VRMExpressionOverrideType = VRMExpressionOverrideType;
    exports.VRMExpressionPresetName = VRMExpressionPresetName;
    exports.VRMExpressionTextureTransformBind = VRMExpressionTextureTransformBind;
    exports.VRMFirstPerson = VRMFirstPerson;
    exports.VRMFirstPersonLoaderPlugin = VRMFirstPersonLoaderPlugin;
    exports.VRMFirstPersonMeshAnnotationType = VRMFirstPersonMeshAnnotationType;
    exports.VRMHumanBoneList = VRMHumanBoneList;
    exports.VRMHumanBoneName = VRMHumanBoneName;
    exports.VRMHumanBoneParentMap = VRMHumanBoneParentMap;
    exports.VRMHumanoid = VRMHumanoid;
    exports.VRMHumanoidHelper = VRMHumanoidHelper;
    exports.VRMHumanoidLoaderPlugin = VRMHumanoidLoaderPlugin;
    exports.VRMLookAt = VRMLookAt;
    exports.VRMLookAtBoneApplier = VRMLookAtBoneApplier;
    exports.VRMLookAtExpressionApplier = VRMLookAtExpressionApplier;
    exports.VRMLookAtHelper = VRMLookAtHelper;
    exports.VRMLookAtLoaderPlugin = VRMLookAtLoaderPlugin;
    exports.VRMLookAtRangeMap = VRMLookAtRangeMap;
    exports.VRMLookAtTypeName = VRMLookAtTypeName;
    exports.VRMMetaLoaderPlugin = VRMMetaLoaderPlugin;
    exports.VRMRequiredHumanBoneName = VRMRequiredHumanBoneName;

    Object.defineProperty(exports, '__esModule', { value: true });

    Object.assign(THREE, exports);

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLWNvcmUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uLnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZS50cyIsIi4uL3NyYy91dGlscy9nbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXgudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblByZXNldE5hbWUudHMiLCIuLi9zcmMvdXRpbHMvc2F0dXJhdGUudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXIudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUudHMiLCIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24udHMiLCIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4udHMiLCIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUudHMiLCIuLi9zcmMvaHVtYW5vaWQvaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlci50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVMaXN0LnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFuQm9uZU5hbWUudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lUGFyZW50TWFwLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNUmlnLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkUmlnLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZS50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZExvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9GYW5CdWZmZXJHZW9tZXRyeS50cyIsIi4uL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCIuLi9zcmMvbG9va0F0L2hlbHBlcnMvVlJNTG9va0F0SGVscGVyLnRzIiwiLi4vc3JjL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUudHMiLCIuLi9zcmMvbG9va0F0L3V0aWxzL2NhbGNBemltdXRoQWx0aXR1ZGUudHMiLCIuLi9zcmMvbG9va0F0L3V0aWxzL3Nhbml0aXplQW5nbGUudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdC50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0Qm9uZUFwcGxpZXIudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRSYW5nZU1hcC50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0TG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRUeXBlTmFtZS50cyIsIi4uL3NyYy91dGlscy9yZXNvbHZlVVJMLnRzIiwiLi4vc3JjL21ldGEvVlJNTWV0YUxvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9WUk1Db3JlLnRzIiwiLi4vc3JjL1ZSTUNvcmVMb2FkZXJQbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSc7XG5cbi8vIGFuaW1hdGlvbk1peGVyIOOBruebo+imluWvvuixoeOBr+OAgVNjZW5lIOOBruS4reOBq+WFpeOBo+OBpuOBhOOCi+W/heimgeOBjOOBguOCi+OAglxuLy8g44Gd44Gu44Gf44KB44CB6KGo56S644Kq44OW44K444Kn44Kv44OI44Gn44Gv44Gq44GE44GR44KM44Gp44CBT2JqZWN0M0Qg44KS57aZ5om/44GX44GmIFNjZW5lIOOBq+aKleWFpeOBp+OBjeOCi+OCiOOBhuOBq+OBmeOCi+OAglxuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb24gZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoaXMgZXhwcmVzc2lvbi5cbiAgICogRGlzdGluZ3Vpc2hlZCB3aXRoIGBuYW1lYCBzaW5jZSBgbmFtZWAgd2lsbCBiZSBjb25mbGljdGVkIHdpdGggT2JqZWN0M0QuXG4gICAqL1xuICBwdWJsaWMgZXhwcmVzc2lvbk5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBleHByZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIHdlaWdodCA9IDAuMDtcblxuICAvKipcbiAgICogSW50ZXJwcmV0IHZhbHVlcyBncmVhdGVyIHRoYW4gMC41IGFzIDEuMCwgb3J0aGVyd2lzZSAwLjAuXG4gICAqL1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdGhlIGV4cHJlc3Npb24gb3ZlcnJpZGVzIGJsaW5rIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlQmxpbms6IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBsb29rQXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVMb29rQXQ6IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBtb3V0aCBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZU1vdXRoOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIHByaXZhdGUgX2JpbmRzOiBWUk1FeHByZXNzaW9uQmluZFtdID0gW107XG5cbiAgb3ZlcnJpZGUgcmVhZG9ubHkgdHlwZTogc3RyaW5nIHwgJ1ZSTUV4cHJlc3Npb24nO1xuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHJlcHJlc2VudHMgaG93IG11Y2ggaXQgc2hvdWxkIG92ZXJyaWRlIGJsaW5rIGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZUJsaW5rQW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVCbGluayA9PT0gJ2Jsb2NrJykge1xuICAgICAgcmV0dXJuIDAuMCA8IHRoaXMud2VpZ2h0ID8gMS4wIDogMC4wO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vdmVycmlkZUJsaW5rID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgbG9va0F0IGV4cHJlc3Npb25zLlxuICAgKiBgMC4wYCA9PSBubyBvdmVycmlkZSBhdCBhbGwsIGAxLjBgID09IGNvbXBsZXRlbHkgYmxvY2sgdGhlIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBvdmVycmlkZUxvb2tBdEFtb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlTG9va0F0ID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy53ZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlTG9va0F0ID09PSAnYmxlbmQnKSB7XG4gICAgICByZXR1cm4gdGhpcy53ZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgbW91dGggZXhwcmVzc2lvbnMuXG4gICAqIGAwLjBgID09IG5vIG92ZXJyaWRlIGF0IGFsbCwgYDEuMGAgPT0gY29tcGxldGVseSBibG9jayB0aGUgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG92ZXJyaWRlTW91dGhBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZU1vdXRoID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy53ZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlTW91dGggPT09ICdibGVuZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihleHByZXNzaW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubmFtZSA9IGBWUk1FeHByZXNzaW9uXyR7ZXhwcmVzc2lvbk5hbWV9YDtcbiAgICB0aGlzLmV4cHJlc3Npb25OYW1lID0gZXhwcmVzc2lvbk5hbWU7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ1ZSTUV4cHJlc3Npb24nO1xuXG4gICAgLy8g6KGo56S655uu55qE44Gu44Kq44OW44K444Kn44Kv44OI44Gn44Gv44Gq44GE44Gu44Gn44CB6LKg6I236Lu95rib44Gu44Gf44KB44GrIHZpc2libGUg44KSIGZhbHNlIOOBq+OBl+OBpuOBiuOBj+OAglxuICAgIC8vIOOBk+OCjOOBq+OCiOOCiuOAgeOBk+OBruOCpOODs+OCueOCv+ODs+OCueOBq+WvvuOBmeOCi+avjuODleODrOODvOODoOOBriBtYXRyaXgg6Ieq5YuV6KiI566X44KS55yB55Wl44Gn44GN44KL44CCXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkQmluZChiaW5kOiBWUk1FeHByZXNzaW9uQmluZCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLnB1c2goYmluZCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgd2VpZ2h0IHRvIGV2ZXJ5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICogU2hvdWxkIGJlIGNhbGxlZCBldmVyeSBmcmFtZS5cbiAgICovXG4gIHB1YmxpYyBhcHBseVdlaWdodChvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgYSB2YWx1ZSB0byBpdHMgd2VpZ2h0IHRvIGFwcGx5LlxuICAgICAqIEludGVuZGVkIHRvIGJlIHVzZWQgZm9yIG92ZXJyaWRpbmcgYW4gZXhwcmVzc2lvbiB3ZWlnaHQgYnkgYW5vdGhlciBleHByZXNzaW9uLlxuICAgICAqIFNlZSBhbHNvOiB7QGxpbmsgb3ZlcnJpZGVCbGlua30sIHtAbGluayBvdmVycmlkZUxvb2tBdH0sIHtAbGluayBvdmVycmlkZU1vdXRofVxuICAgICAqL1xuICAgIG11bHRpcGxpZXI/OiBudW1iZXI7XG4gIH0pOiB2b2lkIHtcbiAgICBsZXQgYWN0dWFsV2VpZ2h0ID0gdGhpcy5pc0JpbmFyeSA/ICh0aGlzLndlaWdodCA8PSAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG4gICAgYWN0dWFsV2VpZ2h0ICo9IG9wdGlvbnM/Lm11bHRpcGxpZXIgPz8gMS4wO1xuXG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4gYmluZC5hcHBseVdlaWdodChhY3R1YWxXZWlnaHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBwcmV2aW91c2x5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4gYmluZC5jbGVhckFwcGxpZWRXZWlnaHQoKSk7XG4gIH1cbn1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2U7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciByZWMgPSBlbnYuc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVjLmRpc3Bvc2UgJiYgcmVjLmRpc3Bvc2UuY2FsbChyZWMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbn07XHJcbiIsImltcG9ydCB0eXBlIHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG5mdW5jdGlvbiBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsKGdsdGY6IEdMVEYsIG5vZGVJbmRleDogbnVtYmVyLCBub2RlOiBUSFJFRS5PYmplY3QzRCk6IFRIUkVFLk1lc2hbXSB8IG51bGwge1xuICBjb25zdCBqc29uID0gZ2x0Zi5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gIC8qKlxuICAgKiBMZXQncyBsaXN0IHVwIGV2ZXJ5IHBvc3NpYmxlIHBhdHRlcm5zIHRoYXQgcGFyc2VkIGdsdGYgbm9kZXMgd2l0aCBhIG1lc2ggY2FuIGhhdmUsLCxcbiAgICpcbiAgICogXCIqXCIgaW5kaWNhdGVzIHRoYXQgdGhvc2UgbWVzaGVzIHNob3VsZCBiZSBsaXN0ZWQgdXAgdXNpbmcgdGhpcyBmdW5jdGlvblxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgYSBzaWdubGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5NZXNoYDogVGhlIG9ubHkgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpXG4gICAqXG4gICAqIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBhIHNpbmdsZSBwcmltaXRpdmUpXG4gICAqXG4gICAqIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiBhIE1FU0ggT0YgVEhFIENISUxEXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBBTkQgKGEgY2hpbGQgd2l0aCBhIG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpXG4gICAqXG4gICAqIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgdGhlIG1lc2hcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKiAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEJVVCB0aGUgbm9kZSBpcyBhIGJvbmVcbiAgICpcbiAgICogLSBgVEhSRUUuQm9uZWA6IFRoZSByb290IG9mIHRoZSBub2RlLCBhcyBhIGJvbmVcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBBTkQgKGEgY2hpbGQgd2l0aCBhIG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEJVVCB0aGUgbm9kZSBpcyBhIGJvbmVcbiAgICpcbiAgICogLSBgVEhSRUUuQm9uZWA6IFRoZSByb290IG9mIHRoZSBub2RlLCBhcyBhIGJvbmVcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKlxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICgyKSAqXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiBhIE1FU0ggT0YgVEhFIENISUxEXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggb2YgdGhlIGNoaWxkXG4gICAqICAgICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggb2YgdGhlIGNoaWxkICgyKVxuICAgKlxuICAgKiAuLi5JIHdpbGwgdGFrZSBhIHN0cmF0ZWd5IHRoYXQgdHJhdmVyc2VzIHRoZSByb290IG9mIHRoZSBub2RlIGFuZCB0YWtlIGZpcnN0IChwcmltaXRpdmVDb3VudCkgbWVzaGVzLlxuICAgKi9cblxuICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbm9kZSBoYXMgYSBtZXNoXG4gIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzPy5bbm9kZUluZGV4XTtcbiAgaWYgKHNjaGVtYU5vZGUgPT0gbnVsbCkge1xuICAgIGNvbnNvbGUud2FybihgZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbDogQXR0ZW1wdCB0byB1c2Ugbm9kZXNbJHtub2RlSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbm9kZSBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBtZXNoSW5kZXggPSBzY2hlbWFOb2RlLm1lc2g7XG4gIGlmIChtZXNoSW5kZXggPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gSG93IG1hbnkgcHJpbWl0aXZlcyB0aGUgbWVzaCBoYXM/XG4gIGNvbnN0IHNjaGVtYU1lc2ggPSBqc29uLm1lc2hlcz8uW21lc2hJbmRleF07XG4gIGlmIChzY2hlbWFNZXNoID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG1lc2hlc1ske21lc2hJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtZXNoIGRvZXNuJ3QgZXhpc3RgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHByaW1pdGl2ZUNvdW50ID0gc2NoZW1hTWVzaC5wcmltaXRpdmVzLmxlbmd0aDtcblxuICAvLyBUcmF2ZXJzZSB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlc1xuICBjb25zdCBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW10gPSBbXTtcbiAgbm9kZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgaWYgKHByaW1pdGl2ZXMubGVuZ3RoIDwgcHJpbWl0aXZlQ291bnQpIHtcbiAgICAgIGlmICgob2JqZWN0IGFzIGFueSkuaXNNZXNoKSB7XG4gICAgICAgIHByaW1pdGl2ZXMucHVzaChvYmplY3QgYXMgVEhSRUUuTWVzaCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcHJpbWl0aXZlcztcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIGEgbm9kZSBmcm9tIGEgbG9hZGVkIEdMVEYuXG4gKiBUaGUgbWFpbiBwdXJwb3NlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gZGlzdGluZ3Vpc2ggcHJpbWl0aXZlcyBhbmQgY2hpbGRyZW4gZnJvbSBhIG5vZGUgdGhhdCBoYXMgYm90aCBtZXNoZXMgYW5kIGNoaWxkcmVuLlxuICpcbiAqIEl0IHV0aWxpemVzIHRoZSBiZWhhdmlvciB0aGF0IEdMVEZMb2FkZXIgYWRkcyBtZXNoIHByaW1pdGl2ZXMgdG8gdGhlIG5vZGUgb2JqZWN0ICggYFRIUkVFLkdyb3VwYCApIGZpcnN0IHRoZW4gYWRkcyBpdHMgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIGdsdGYgQSBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAqIEBwYXJhbSBub2RlSW5kZXggVGhlIGluZGV4IG9mIHRoZSBub2RlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlcik6IFByb21pc2U8VEhSRUUuTWVzaFtdIHwgbnVsbD4ge1xuICBjb25zdCBub2RlOiBUSFJFRS5PYmplY3QzRCA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBub2RlSW5kZXgpO1xuICByZXR1cm4gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBub2RlSW5kZXgsIG5vZGUpO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgcHJpbWl0aXZlcyAoIGBUSFJFRS5NZXNoW11gICkgb2Ygbm9kZXMgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogU2VlIHtAbGluayBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZX0gZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBJdCByZXR1cm5zIGEgbWFwIGZyb20gbm9kZSBpbmRleCB0byBleHRyYWN0aW9uIHJlc3VsdC5cbiAqIElmIGEgbm9kZSBkb2VzIG5vdCBoYXZlIGEgbWVzaCwgdGhlIGVudHJ5IGZvciB0aGUgbm9kZSB3aWxsIG5vdCBiZSBwdXQgaW4gdGhlIHJldHVybmluZyBtYXAuXG4gKlxuICogQHBhcmFtIGdsdGYgQSBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlcyhnbHRmOiBHTFRGKTogUHJvbWlzZTxNYXA8bnVtYmVyLCBUSFJFRS5NZXNoW10+PiB7XG4gIGNvbnN0IG5vZGVzOiBUSFJFRS5PYmplY3QzRFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdub2RlJyk7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8bnVtYmVyLCBUSFJFRS5NZXNoW10+KCk7XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsKGdsdGYsIGluZGV4LCBub2RlKTtcbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIG1hcC5zZXQoaW5kZXgsIHJlc3VsdCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbWFwO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuXG4vKipcbiAqIEdldCBhIG1hdGVyaWFsIGRlZmluaXRpb24gaW5kZXggb2YgZ2xURiBmcm9tIGFzc29jaWF0ZWQgbWF0ZXJpYWwuXG4gKiBJdCdzIGJhc2ljYWxseSBhIGNvbWF0IGNvZGUgYmV0d2VlbiBUaHJlZS5qcyByMTMzIG9yIGFib3ZlIGFuZCBwcmV2aW91cyB2ZXJzaW9ucy5cbiAqIEBwYXJhbSBwYXJzZXIgR0xURlBhcnNlclxuICogQHBhcmFtIG1hdGVyaWFsIEEgbWF0ZXJpYWwgb2YgZ2x0ZlxuICogQHJldHVybnMgTWF0ZXJpYWwgZGVmaW5pdGlvbiBpbmRleCBvZiBnbFRGXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXgocGFyc2VyOiBHTFRGUGFyc2VyLCBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiBudW1iZXIgfCBudWxsIHtcbiAgY29uc3QgdGhyZWVSZXZpc2lvbiA9IHBhcnNlSW50KFRIUkVFLlJFVklTSU9OLCAxMCk7XG5cbiAgbGV0IGluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBpZiAodGhyZWVSZXZpc2lvbiA+PSAxMzMpIHtcbiAgICBpbmRleCA9IHBhcnNlci5hc3NvY2lhdGlvbnMuZ2V0KG1hdGVyaWFsKT8ubWF0ZXJpYWxzID8/IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gQ09NUEFUOiBzdHJ1Y3R1cmUgb2YgYHBhcnNlci5hc3NvY2lhdGlvbnNgIGhhcyBiZWVuIGNoYW5nZWQgQCByMTMzXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMjE3MzdcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZS10eXBlcy90aHJlZS10cy10eXBlcy9jb21taXQvNTI0NjY3NmU0NzliNjFhOWZmMmRiNzFkZjQxMTlmNmYxNDYyNTgwZFxuICAgIHR5cGUgR0xURlJlZmVyZW5jZVByZTEzMyA9IHtcbiAgICAgIHR5cGU6ICdtYXRlcmlhbHMnIHwgJ25vZGVzJyB8ICd0ZXh0dXJlcycgfCAnbWVzaGVzJztcbiAgICAgIGluZGV4OiBudW1iZXI7XG4gICAgfTtcblxuICAgIHR5cGUgR0xURkFzc29jaWF0aW9uc1ByZTEzMyA9IE1hcDxUSFJFRS5PYmplY3QzRCB8IFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuVGV4dHVyZSwgR0xURlJlZmVyZW5jZVByZTEzMz47XG5cbiAgICBjb25zdCBhc3NvY2lhdGlvbnMgPSBwYXJzZXIuYXNzb2NpYXRpb25zIGFzIEdMVEZBc3NvY2lhdGlvbnNQcmUxMzM7XG5cbiAgICBjb25zdCByZWZlcmVuY2UgPSBhc3NvY2lhdGlvbnMuZ2V0KG1hdGVyaWFsKTtcblxuICAgIGlmIChyZWZlcmVuY2U/LnR5cGUgPT09ICdtYXRlcmlhbHMnKSB7XG4gICAgICBpbmRleCA9IHJlZmVyZW5jZS5pbmRleDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0ge1xuICBBYTogJ2FhJyxcbiAgSWg6ICdpaCcsXG4gIE91OiAnb3UnLFxuICBFZTogJ2VlJyxcbiAgT2g6ICdvaCcsXG4gIEJsaW5rOiAnYmxpbmsnLFxuICBIYXBweTogJ2hhcHB5JyxcbiAgQW5ncnk6ICdhbmdyeScsXG4gIFNhZDogJ3NhZCcsXG4gIFJlbGF4ZWQ6ICdyZWxheGVkJyxcbiAgTG9va1VwOiAnbG9va1VwJyxcbiAgU3VycHJpc2VkOiAnc3VycHJpc2VkJyxcbiAgTG9va0Rvd246ICdsb29rRG93bicsXG4gIExvb2tMZWZ0OiAnbG9va0xlZnQnLFxuICBMb29rUmlnaHQ6ICdsb29rUmlnaHQnLFxuICBCbGlua0xlZnQ6ICdibGlua0xlZnQnLFxuICBCbGlua1JpZ2h0OiAnYmxpbmtSaWdodCcsXG4gIE5ldXRyYWw6ICduZXV0cmFsJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lID0gdHlwZW9mIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV07XG4iLCIvKipcbiAqIENsYW1wIHRoZSBpbnB1dCB2YWx1ZSB3aXRoaW4gWzAuMCAtIDEuMF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cbiIsImltcG9ydCB7IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uUHJlc2V0TmFtZSc7XG5pbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL3NhdHVyYXRlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbiB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbic7XG5cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gIC8qKlxuICAgKiBBIHNldCBvZiBuYW1lIG9yIHByZXNldCBuYW1lIG9mIGV4cHJlc3Npb25zIHRoYXQgd2lsbCBiZSBvdmVycmlkZGVuIGJ5IHtAbGluayBWUk1FeHByZXNzaW9uLm92ZXJyaWRlQmxpbmt9LlxuICAgKi9cbiAgcHVibGljIGJsaW5rRXhwcmVzc2lvbk5hbWVzID0gWydibGluaycsICdibGlua0xlZnQnLCAnYmxpbmtSaWdodCddO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBuYW1lIG9yIHByZXNldCBuYW1lIG9mIGV4cHJlc3Npb25zIHRoYXQgd2lsbCBiZSBvdmVycmlkZGVuIGJ5IHtAbGluayBWUk1FeHByZXNzaW9uLm92ZXJyaWRlTG9va0F0fS5cbiAgICovXG4gIHB1YmxpYyBsb29rQXRFeHByZXNzaW9uTmFtZXMgPSBbJ2xvb2tMZWZ0JywgJ2xvb2tSaWdodCcsICdsb29rVXAnLCAnbG9va0Rvd24nXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZU1vdXRofS5cbiAgICovXG4gIHB1YmxpYyBtb3V0aEV4cHJlc3Npb25OYW1lcyA9IFsnYWEnLCAnZWUnLCAnaWgnLCAnb2gnLCAnb3UnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2Yge0BsaW5rIFZSTUV4cHJlc3Npb259LlxuICAgKiBXaGVuIHlvdSB3YW50IHRvIHJlZ2lzdGVyIGV4cHJlc3Npb25zLCB1c2Uge0BsaW5rIHJlZ2lzdGVyRXhwcmVzc2lvbn1cbiAgICovXG4gIHByaXZhdGUgX2V4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uW10gPSBbXTtcbiAgcHVibGljIGdldCBleHByZXNzaW9ucygpOiBWUk1FeHByZXNzaW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9leHByZXNzaW9ucy5jb25jYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbi5cbiAgICovXG4gIHByaXZhdGUgX2V4cHJlc3Npb25NYXA6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuICBwdWJsaWMgZ2V0IGV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fZXhwcmVzc2lvbk1hcCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24sIGJ1dCBleGNsdWRpbmcgY3VzdG9tIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIGdldCBwcmVzZXRFeHByZXNzaW9uTWFwKCk6IHsgW25hbWUgaW4gVlJNRXhwcmVzc2lvblByZXNldE5hbWVdPzogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWUgaW4gVlJNRXhwcmVzc2lvblByZXNldE5hbWVdPzogVlJNRXhwcmVzc2lvbiB9ID0ge307XG5cbiAgICBjb25zdCBwcmVzZXROYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KE9iamVjdC52YWx1ZXMoVlJNRXhwcmVzc2lvblByZXNldE5hbWUpKTtcblxuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuX2V4cHJlc3Npb25NYXApLmZvckVhY2goKFtuYW1lLCBleHByZXNzaW9uXSkgPT4ge1xuICAgICAgaWYgKHByZXNldE5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgIHJlc3VsdFtuYW1lIGFzIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXSA9IGV4cHJlc3Npb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIHByZXNldCBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgY3VzdG9tRXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0ge1xuICAgIGNvbnN0IHJlc3VsdDogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9ID0ge307XG5cbiAgICBjb25zdCBwcmVzZXROYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KE9iamVjdC52YWx1ZXMoVlJNRXhwcmVzc2lvblByZXNldE5hbWUpKTtcblxuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuX2V4cHJlc3Npb25NYXApLmZvckVhY2goKFtuYW1lLCBleHByZXNzaW9uXSkgPT4ge1xuICAgICAgaWYgKCFwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnRvIHRoaXMgb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1FeHByZXNzaW9uTWFuYWdlcik6IHRoaXMge1xuICAgIC8vIGZpcnN0IHVucmVnaXN0ZXIgYWxsIHRoZSBleHByZXNzaW9uIGl0IGhhc1xuICAgIGNvbnN0IGV4cHJlc3Npb25zID0gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gICAgZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgdGhpcy51bnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIHRoZW4gcmVnaXN0ZXIgYWxsIHRoZSBleHByZXNzaW9uIG9mIHRoZSBzb3VyY2VcbiAgICBzb3VyY2UuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgIH0pO1xuXG4gICAgLy8gY29weSByZW1haW5pbmcgbWVtYmVyc1xuICAgIHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMgPSBzb3VyY2UuYmxpbmtFeHByZXNzaW9uTmFtZXMuY29uY2F0KCk7XG4gICAgdGhpcy5sb29rQXRFeHByZXNzaW9uTmFtZXMgPSBzb3VyY2UubG9va0F0RXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubW91dGhFeHByZXNzaW9uTmFtZXMgPSBzb3VyY2UubW91dGhFeHByZXNzaW9uTmFtZXMuY29uY2F0KCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUV4cHJlc3Npb25NYW5hZ2VyIHtcbiAgICByZXR1cm4gbmV3IFZSTUV4cHJlc3Npb25NYW5hZ2VyKCkuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByZWdpc3RlcmVkIGV4cHJlc3Npb24uXG4gICAqIElmIGl0IGNhbm5vdCBmaW5kIGFuIGV4cHJlc3Npb24sIGl0IHdpbGwgcmV0dXJuIGBudWxsYCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9yIHByZXNldCBuYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvbihuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IFZSTUV4cHJlc3Npb24gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbk1hcFtuYW1lXSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uIHtAbGluayBWUk1FeHByZXNzaW9ufSB0aGF0IGRlc2NyaWJlcyB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uOiBWUk1FeHByZXNzaW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMucHVzaChleHByZXNzaW9uKTtcbiAgICB0aGlzLl9leHByZXNzaW9uTWFwW2V4cHJlc3Npb24uZXhwcmVzc2lvbk5hbWVdID0gZXhwcmVzc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVyIGFuIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uIFRoZSBleHByZXNzaW9uIHlvdSB3YW50IHRvIHVucmVnaXN0ZXJcbiAgICovXG4gIHB1YmxpYyB1bnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uOiBWUk1FeHByZXNzaW9uKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9leHByZXNzaW9ucy5pbmRleE9mKGV4cHJlc3Npb24pO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignVlJNRXhwcmVzc2lvbk1hbmFnZXI6IFRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbnMgaXMgbm90IHJlZ2lzdGVyZWQnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGRlbGV0ZSB0aGlzLl9leHByZXNzaW9uTWFwW2V4cHJlc3Npb24uZXhwcmVzc2lvbk5hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB3ZWlnaHQgb2YgdGhlIHNwZWNpZmllZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBkb2Vzbid0IGhhdmUgYW4gZXhwcmVzc2lvbiBvZiBnaXZlbiBuYW1lLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldFZhbHVlKG5hbWU6IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIHwgc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZ2V0RXhwcmVzc2lvbihuYW1lKTtcbiAgICByZXR1cm4gZXhwcmVzc2lvbj8ud2VpZ2h0ID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgd2VpZ2h0IHRvIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKiBAcGFyYW0gd2VpZ2h0IFdlaWdodFxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlKG5hbWU6IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIHwgc3RyaW5nLCB3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgaWYgKGV4cHJlc3Npb24pIHtcbiAgICAgIGV4cHJlc3Npb24ud2VpZ2h0ID0gc2F0dXJhdGUod2VpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdHJhY2sgbmFtZSBvZiBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogVGhpcyB0cmFjayBuYW1lIGlzIG5lZWRlZCB0byBtYW5pcHVsYXRlIGl0cyBleHByZXNzaW9uIHZpYSBrZXlmcmFtZSBhbmltYXRpb25zLlxuICAgKlxuICAgKiBAZXhhbXBsZSBNYW5pcHVsYXRlIGFuIGV4cHJlc3Npb24gdXNpbmcga2V5ZnJhbWUgYW5pbWF0aW9uXG4gICAqIGBgYGpzXG4gICAqIGNvbnN0IHRyYWNrTmFtZSA9IHZybS5leHByZXNzaW9uTWFuYWdlci5nZXRFeHByZXNzaW9uVHJhY2tOYW1lKCAnYmxpbmsnICk7XG4gICAqIGNvbnN0IHRyYWNrID0gbmV3IFRIUkVFLk51bWJlcktleWZyYW1lVHJhY2soXG4gICAqICAgbmFtZSxcbiAgICogICBbIDAuMCwgMC41LCAxLjAgXSwgLy8gdGltZXNcbiAgICogICBbIDAuMCwgMS4wLCAwLjAgXSAvLyB2YWx1ZXNcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgY2xpcCA9IG5ldyBUSFJFRS5BbmltYXRpb25DbGlwKFxuICAgKiAgICdibGluaycsIC8vIG5hbWVcbiAgICogICAxLjAsIC8vIGR1cmF0aW9uXG4gICAqICAgWyB0cmFjayBdIC8vIHRyYWNrc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlciggdnJtLnNjZW5lICk7XG4gICAqIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oIGNsaXAgKTtcbiAgICogYWN0aW9uLnBsYXkoKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRFeHByZXNzaW9uVHJhY2tOYW1lKG5hbWU6IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIHwgc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZ2V0RXhwcmVzc2lvbihuYW1lKTtcbiAgICByZXR1cm4gZXhwcmVzc2lvbiA/IGAke2V4cHJlc3Npb24ubmFtZX0ud2VpZ2h0YCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGV2ZXJ5IGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBzZWUgaG93IG11Y2ggd2Ugc2hvdWxkIG92ZXJyaWRlIGNlcnRhaW4gZXhwcmVzc2lvbnNcbiAgICBjb25zdCB3ZWlnaHRNdWx0aXBsaWVycyA9IHRoaXMuX2NhbGN1bGF0ZVdlaWdodE11bHRpcGxpZXJzKCk7XG5cbiAgICAvLyByZXNldCBleHByZXNzaW9uIGJpbmRzIGZpcnN0XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgZXhwcmVzc2lvbi5jbGVhckFwcGxpZWRXZWlnaHQoKTtcbiAgICB9KTtcblxuICAgIC8vIHRoZW4gYXBwbHkgYmluZHNcbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBsZXQgbXVsdGlwbGllciA9IDEuMDtcbiAgICAgIGNvbnN0IG5hbWUgPSBleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lO1xuXG4gICAgICBpZiAodGhpcy5ibGlua0V4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLmJsaW5rO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5sb29rQXRFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5sb29rQXQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubW91dGg7XG4gICAgICB9XG5cbiAgICAgIGV4cHJlc3Npb24uYXBwbHlXZWlnaHQoeyBtdWx0aXBsaWVyIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBzdW0gb2Ygb3ZlcnJpZGUgYW1vdW50cyB0byBzZWUgaG93IG11Y2ggd2Ugc2hvdWxkIG11bHRpcGx5IHdlaWdodHMgb2YgY2VydGFpbiBleHByZXNzaW9ucy5cbiAgICovXG4gIHByaXZhdGUgX2NhbGN1bGF0ZVdlaWdodE11bHRpcGxpZXJzKCk6IHtcbiAgICBibGluazogbnVtYmVyO1xuICAgIGxvb2tBdDogbnVtYmVyO1xuICAgIG1vdXRoOiBudW1iZXI7XG4gIH0ge1xuICAgIGxldCBibGluayA9IDEuMDtcbiAgICBsZXQgbG9va0F0ID0gMS4wO1xuICAgIGxldCBtb3V0aCA9IDEuMDtcblxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGJsaW5rIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVCbGlua0Ftb3VudDtcbiAgICAgIGxvb2tBdCAtPSBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0QW1vdW50O1xuICAgICAgbW91dGggLT0gZXhwcmVzc2lvbi5vdmVycmlkZU1vdXRoQW1vdW50O1xuICAgIH0pO1xuXG4gICAgYmxpbmsgPSBNYXRoLm1heCgwLjAsIGJsaW5rKTtcbiAgICBsb29rQXQgPSBNYXRoLm1heCgwLjAsIGxvb2tBdCk7XG4gICAgbW91dGggPSBNYXRoLm1heCgwLjAsIG1vdXRoKTtcblxuICAgIHJldHVybiB7IGJsaW5rLCBsb29rQXQsIG1vdXRoIH07XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlID0ge1xuICBDb2xvcjogJ2NvbG9yJyxcbiAgRW1pc3Npb25Db2xvcjogJ2VtaXNzaW9uQ29sb3InLFxuICBTaGFkZUNvbG9yOiAnc2hhZGVDb2xvcicsXG4gIE1hdGNhcENvbG9yOiAnbWF0Y2FwQ29sb3InLFxuICBSaW1Db2xvcjogJ3JpbUNvbG9yJyxcbiAgT3V0bGluZUNvbG9yOiAnb3V0bGluZUNvbG9yJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSA9XG4gIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVba2V5b2YgdHlwZW9mIFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZV07XG5cbmV4cG9ydCBjb25zdCB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwOiB7IFtrZXk6IHN0cmluZ106IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSB8IHVuZGVmaW5lZCB9ID0ge1xuICBfQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5Db2xvcixcbiAgX0VtaXNzaW9uQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5FbWlzc2lvbkNvbG9yLFxuICBfU2hhZGVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLlNoYWRlQ29sb3IsXG4gIF9SaW1Db2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLlJpbUNvbG9yLFxuICBfT3V0bGluZUNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuT3V0bGluZUNvbG9yLFxufTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuXG5jb25zdCBfY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcblxuaW50ZXJmYWNlIENvbG9yQmluZFN0YXRlIHtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGluaXRpYWxWYWx1ZTogVEhSRUUuQ29sb3I7XG4gIGRlbHRhVmFsdWU6IFRIUkVFLkNvbG9yO1xufVxuXG5pbnRlcmZhY2UgQWxwaGFCaW5kU3RhdGUge1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgaW5pdGlhbFZhbHVlOiBudW1iZXI7XG4gIGRlbHRhVmFsdWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIEJpbmRTdGF0ZSB7XG4gIGNvbG9yOiBDb2xvckJpbmRTdGF0ZSB8IG51bGw7XG4gIGFscGhhOiBBbHBoYUJpbmRTdGF0ZSB8IG51bGw7XG59XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byBhIG1hdGVyaWFsIGNvbG9yLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICAvKipcbiAgICogTWFwcGluZyBvZiBwcm9wZXJ0eSBuYW1lcyBmcm9tIFZSTUMvbWF0ZXJpYWxDb2xvckJpbmRzLnR5cGUgdG8gdGhyZWUuanMvTWF0ZXJpYWwuXG4gICAqIFRoZSBmaXJzdCBlbGVtZW50IHN0YW5kcyBmb3IgY29sb3IgY2hhbm5lbHMsIHRoZSBzZWNvbmQgZWxlbWVudCBzdGFuZHMgZm9yIHRoZSBhbHBoYSBjaGFubmVsLlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgY2FuIGJlIG51bGwgaWYgdGhlIHRhcmdldCBwcm9wZXJ0eSBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgLy8gVE9ETzogV2UgbWlnaHQgd2FudCB0byB1c2UgdGhlIGBzYXRpc2ZpZXNgIG9wZXJhdG9yIG9uY2Ugd2UgYnVtcCBUUyB0byA0Ljkgb3IgaGlnaGVyXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3BpeGl2L3RocmVlLXZybS9wdWxsLzEzMjMjZGlzY3Vzc2lvbl9yMTM3NDAyMDAzNVxuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lTWFwTWFwOiB7XG4gICAgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHsgW3R5cGUgaW4gVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXT86IHJlYWRvbmx5IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdIH07XG4gIH0gPSB7XG4gICAgaXNNZXNoU3RhbmRhcmRNYXRlcmlhbDoge1xuICAgICAgY29sb3I6IFsnY29sb3InLCAnb3BhY2l0eSddLFxuICAgICAgZW1pc3Npb25Db2xvcjogWydlbWlzc2l2ZScsIG51bGxdLFxuICAgIH0sXG4gICAgaXNNZXNoQmFzaWNNYXRlcmlhbDoge1xuICAgICAgY29sb3I6IFsnY29sb3InLCAnb3BhY2l0eSddLFxuICAgIH0sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogWydjb2xvcicsICdvcGFjaXR5J10sXG4gICAgICBlbWlzc2lvbkNvbG9yOiBbJ2VtaXNzaXZlJywgbnVsbF0sXG4gICAgICBvdXRsaW5lQ29sb3I6IFsnb3V0bGluZUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgICBtYXRjYXBDb2xvcjogWydtYXRjYXBGYWN0b3InLCBudWxsXSxcbiAgICAgIHJpbUNvbG9yOiBbJ3BhcmFtZXRyaWNSaW1Db2xvckZhY3RvcicsIG51bGxdLFxuICAgICAgc2hhZGVDb2xvcjogWydzaGFkZUNvbG9yRmFjdG9yJywgbnVsbF0sXG4gICAgfSxcbiAgfTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSB0YXJnZXQgcHJvcGVydHkgb2YgdGhlIG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBjb2xvci5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRWYWx1ZTogVEhSRUUuQ29sb3I7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgYWxwaGEuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0QWxwaGE6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGJpbmRpbmcgc3RhdGUuXG4gICAqIElmIGl0IGNhbm5vdCBmaW5kIHRoZSB0YXJnZXQgcHJvcGVydHkgaW4gdGhlIGNvbnN0cnVjdG9yLCBlYWNoIHByb3BlcnR5IHdpbGwgYmUgbnVsbCBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhdGU6IEJpbmRTdGF0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHR5cGUsXG4gICAgdGFyZ2V0VmFsdWUsXG4gICAgdGFyZ2V0QWxwaGEsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSB0YXJnZXQgcHJvcGVydHkgb2YgdGhlIG1hdGVyaWFsLlxuICAgICAqL1xuICAgIHR5cGU6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAgICovXG4gICAgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBhbHBoYS5cbiAgICAgKi9cbiAgICB0YXJnZXRBbHBoYT86IG51bWJlcjtcbiAgfSkge1xuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudGFyZ2V0VmFsdWUgPSB0YXJnZXRWYWx1ZTtcbiAgICB0aGlzLnRhcmdldEFscGhhID0gdGFyZ2V0QWxwaGEgPz8gMS4wO1xuXG4gICAgLy8gaW5pdCBiaW5kIHN0YXRlXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLl9pbml0Q29sb3JCaW5kU3RhdGUoKTtcbiAgICBjb25zdCBhbHBoYSA9IHRoaXMuX2luaXRBbHBoYUJpbmRTdGF0ZSgpO1xuICAgIHRoaXMuX3N0YXRlID0geyBjb2xvciwgYWxwaGEgfTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgY29sb3IsIGFscGhhIH0gPSB0aGlzLl9zdGF0ZTtcblxuICAgIGlmIChjb2xvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgZGVsdGFWYWx1ZSB9ID0gY29sb3I7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRhcmdldC5hZGQoX2NvbG9yLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFscGhhICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBkZWx0YVZhbHVlIH0gPSBhbHBoYTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICgodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyKSArPSBkZWx0YVZhbHVlICogd2VpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2xvciwgYWxwaGEgfSA9IHRoaXMuX3N0YXRlO1xuXG4gICAgaWYgKGNvbG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUgfSA9IGNvbG9yO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG4gICAgICBpZiAodGFyZ2V0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXQuY29weShpbml0aWFsVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhbHBoYSAhPSBudWxsKSB7XG4gICAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlIH0gPSBhbHBoYTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIG51bWJlcjtcbiAgICAgIGlmICh0YXJnZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICgodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyKSA9IGluaXRpYWxWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29sb3JCaW5kU3RhdGUoKTogQ29sb3JCaW5kU3RhdGUgfCBudWxsIHtcbiAgICBjb25zdCB7IG1hdGVyaWFsLCB0eXBlLCB0YXJnZXRWYWx1ZSB9ID0gdGhpcztcblxuICAgIGNvbnN0IHByb3BlcnR5TmFtZU1hcCA9IHRoaXMuX2dldFByb3BlcnR5TmFtZU1hcCgpO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdPy5bMF0gPz8gbnVsbDtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWUgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgbWF0ZXJpYWwgY29sb3IgYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0sIHRoZSB0eXBlICR7dHlwZX0gYnV0IHRoZSBtYXRlcmlhbCBvciB0aGUgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLmAsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuXG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gdGFyZ2V0LmNsb25lKCk7XG5cbiAgICAvLyDosqDjga7lgKTjgpLkv53mjIHjgZnjgovjgZ/jgoHjgatDb2xvci5zdWLjgpLkvb/jgo/jgZrjgavlt67liIbjgpLoqIjnrpfjgZnjgotcbiAgICBjb25zdCBkZWx0YVZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKFxuICAgICAgdGFyZ2V0VmFsdWUuciAtIGluaXRpYWxWYWx1ZS5yLFxuICAgICAgdGFyZ2V0VmFsdWUuZyAtIGluaXRpYWxWYWx1ZS5nLFxuICAgICAgdGFyZ2V0VmFsdWUuYiAtIGluaXRpYWxWYWx1ZS5iLFxuICAgICk7XG5cbiAgICByZXR1cm4geyBwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSwgZGVsdGFWYWx1ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFscGhhQmluZFN0YXRlKCk6IEFscGhhQmluZFN0YXRlIHwgbnVsbCB7XG4gICAgY29uc3QgeyBtYXRlcmlhbCwgdHlwZSwgdGFyZ2V0QWxwaGEgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVNYXAgPSB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVNYXAoKTtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWVNYXA/Llt0eXBlXT8uWzFdID8/IG51bGw7XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwgJiYgdGFyZ2V0QWxwaGEgIT09IDEuMCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVHJpZWQgdG8gYWRkIGEgbWF0ZXJpYWwgYWxwaGEgYmluZCB0byB0aGUgbWF0ZXJpYWwgJHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID8/ICcobm8gbmFtZSknXG4gICAgICAgIH0sIHRoZSB0eXBlICR7dHlwZX0gYnV0IHRoZSBtYXRlcmlhbCBvciB0aGUgdHlwZSBkb2VzIG5vdCBzdXBwb3J0IGFscGhhLmAsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgbnVtYmVyO1xuXG4gICAgY29uc3QgZGVsdGFWYWx1ZSA9IHRhcmdldEFscGhhIC0gaW5pdGlhbFZhbHVlO1xuXG4gICAgcmV0dXJuIHsgcHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUsIGRlbHRhVmFsdWUgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BlcnR5TmFtZU1hcCgpOlxuICAgIHwgeyBbdHlwZSBpbiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdPzogcmVhZG9ubHkgW3N0cmluZywgc3RyaW5nIHwgbnVsbF0gfVxuICAgIHwgbnVsbCB7XG4gICAgcmV0dXJuIChcbiAgICAgIE9iamVjdC5lbnRyaWVzKFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC5fcHJvcGVydHlOYW1lTWFwTWFwKS5maW5kKChbZGlzdGluZ3Vpc2hlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbZGlzdGluZ3Vpc2hlcl0gPT09IHRydWU7XG4gICAgICB9KT8uWzFdID8/IG51bGxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcblxuLyoqXG4gKiBBIGJpbmQgb2Yge0BsaW5rIFZSTUV4cHJlc3Npb259IGluZmx1ZW5jZXMgdG8gbW9ycGggdGFyZ2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQgaW1wbGVtZW50cyBWUk1FeHByZXNzaW9uQmluZCB7XG4gIC8qKlxuICAgKiBUaGUgbWVzaCBwcmltaXRpdmVzIHRoYXQgYXR0YWNoZWQgdG8gdGFyZ2V0IG1lc2guXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIG1vcnBoIHRhcmdldCBpbiB0aGUgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgd2VpZ2h0OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHtcbiAgICBwcmltaXRpdmVzLFxuICAgIGluZGV4LFxuICAgIHdlaWdodCxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICAgKi9cbiAgICBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIG1vcnBoIHRhcmdldCBpbiB0aGUgbWVzaC5cbiAgICAgKi9cbiAgICBpbmRleDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHdlaWdodCB2YWx1ZSBvZiB0YXJnZXQgbW9ycGggdGFyZ2V0LiBSYW5naW5nIGluIFswLjAgLSAxLjBdLlxuICAgICAqL1xuICAgIHdlaWdodDogbnVtYmVyO1xuICB9KSB7XG4gICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSArPSB0aGlzLndlaWdodCAqIHdlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5wcmltaXRpdmVzLmZvckVhY2goKG1lc2gpID0+IHtcbiAgICAgIGlmIChtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz8uW3RoaXMuaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbdGhpcy5pbmRleF0gPSAwLjA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcblxuY29uc3QgX3YyID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuLyoqXG4gKiBBIGJpbmQgb2YgZXhwcmVzc2lvbiBpbmZsdWVuY2VzIHRvIHRleHR1cmUgdHJhbnNmb3Jtcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX3Byb3BlcnR5TmFtZXNNYXA6IHsgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7XG4gICAgaXNNZXNoU3RhbmRhcmRNYXRlcmlhbDogW1xuICAgICAgJ21hcCcsXG4gICAgICAnZW1pc3NpdmVNYXAnLFxuICAgICAgJ2J1bXBNYXAnLFxuICAgICAgJ25vcm1hbE1hcCcsXG4gICAgICAnZGlzcGxhY2VtZW50TWFwJyxcbiAgICAgICdyb3VnaG5lc3NNYXAnLFxuICAgICAgJ21ldGFsbmVzc01hcCcsXG4gICAgICAnYWxwaGFNYXAnLFxuICAgIF0sXG4gICAgaXNNZXNoQmFzaWNNYXRlcmlhbDogWydtYXAnLCAnc3BlY3VsYXJNYXAnLCAnYWxwaGFNYXAnXSxcbiAgICBpc01Ub29uTWF0ZXJpYWw6IFtcbiAgICAgICdtYXAnLFxuICAgICAgJ25vcm1hbE1hcCcsXG4gICAgICAnZW1pc3NpdmVNYXAnLFxuICAgICAgJ3NoYWRlTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICdyaW1NdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ291dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZScsXG4gICAgICAndXZBbmltYXRpb25NYXNrVGV4dHVyZScsXG4gICAgXSxcbiAgfTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgLyoqXG4gICAqIFRoZSB1diBzY2FsZSBvZiB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzY2FsZTogVEhSRUUuVmVjdG9yMjtcblxuICAvKipcbiAgICogVGhlIHV2IG9mZnNldCBvZiB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBvZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIHRleHR1cmUgbmFtZXMgYW5kIGl0cyBzdGF0ZSB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZCBieSB0aGlzIGJpbmQuXG4gICAqL1xuICBwcml2YXRlIF9wcm9wZXJ0aWVzOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGluaXRpYWxPZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gICAgaW5pdGlhbFNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuICAgIGRlbHRhT2Zmc2V0OiBUSFJFRS5WZWN0b3IyO1xuICAgIGRlbHRhU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG4gIH1bXTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHNjYWxlLFxuICAgIG9mZnNldCxcbiAgfToge1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAgICovXG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHV2IHNjYWxlIG9mIHRoZSB0ZXh0dXJlLlxuICAgICAqL1xuICAgIHNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHV2IG9mZnNldCBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKi9cbiAgICBvZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gIH0pIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgY29uc3QgcHJvcGVydHlOYW1lcyA9IE9iamVjdC5lbnRyaWVzKFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC5fcHJvcGVydHlOYW1lc01hcCkuZmluZChcbiAgICAgIChbZGlzdGluZ3Vpc2hlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIChtYXRlcmlhbCBhcyBhbnkpW2Rpc3Rpbmd1aXNoZXJdID09PSB0cnVlO1xuICAgICAgfSxcbiAgICApPy5bMV07XG5cbiAgICBpZiAocHJvcGVydHlOYW1lcyA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBUcmllZCB0byBhZGQgYSB0ZXh0dXJlIHRyYW5zZm9ybSBiaW5kIHRvIHRoZSBtYXRlcmlhbCAke1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPz8gJyhubyBuYW1lKSdcbiAgICAgICAgfSBidXQgdGhlIG1hdGVyaWFsIGlzIG5vdCBzdXBwb3J0ZWQuYCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuXG4gICAgICBwcm9wZXJ0eU5hbWVzLmZvckVhY2goKHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gKChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuVGV4dHVyZSB8IHVuZGVmaW5lZCk/LmNsb25lKCk7XG4gICAgICAgIGlmICghdGV4dHVyZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSA9IHRleHR1cmU7IC8vIGJlY2F1c2UgdGhlIHRleHR1cmUgaXMgY2xvbmVkXG5cbiAgICAgICAgY29uc3QgaW5pdGlhbE9mZnNldCA9IHRleHR1cmUub2Zmc2V0LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxTY2FsZSA9IHRleHR1cmUucmVwZWF0LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IGRlbHRhT2Zmc2V0ID0gb2Zmc2V0LmNsb25lKCkuc3ViKGluaXRpYWxPZmZzZXQpO1xuICAgICAgICBjb25zdCBkZWx0YVNjYWxlID0gc2NhbGUuY2xvbmUoKS5zdWIoaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgICAgICBpbml0aWFsT2Zmc2V0LFxuICAgICAgICAgIGRlbHRhT2Zmc2V0LFxuICAgICAgICAgIGluaXRpYWxTY2FsZSxcbiAgICAgICAgICBkZWx0YVNjYWxlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHkubmFtZV0gYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIHRhcmdldC5vZmZzZXQuYWRkKF92Mi5jb3B5KHByb3BlcnR5LmRlbHRhT2Zmc2V0KS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcbiAgICAgIHRhcmdldC5yZXBlYXQuYWRkKF92Mi5jb3B5KHByb3BlcnR5LmRlbHRhU2NhbGUpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5Lm5hbWVdIGFzIFRIUkVFLlRleHR1cmU7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICB0YXJnZXQub2Zmc2V0LmNvcHkocHJvcGVydHkuaW5pdGlhbE9mZnNldCk7XG4gICAgICB0YXJnZXQucmVwZWF0LmNvcHkocHJvcGVydHkuaW5pdGlhbFNjYWxlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUgfSBmcm9tICcuLi91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSc7XG5pbXBvcnQgeyBnbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXggfSBmcm9tICcuLi91dGlscy9nbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXgnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbiB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbic7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHsgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25Nb3JwaFRhcmdldEJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25QcmVzZXROYW1lJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdjB2MVByZXNldE5hbWVNYXA6IHsgW3YwTmFtZSBpbiBWMFZSTS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9ID0ge1xuICAgIGE6ICdhYScsXG4gICAgZTogJ2VlJyxcbiAgICBpOiAnaWgnLFxuICAgIG86ICdvaCcsXG4gICAgdTogJ291JyxcbiAgICBibGluazogJ2JsaW5rJyxcbiAgICBqb3k6ICdoYXBweScsXG4gICAgYW5ncnk6ICdhbmdyeScsXG4gICAgc29ycm93OiAnc2FkJyxcbiAgICBmdW46ICdyZWxheGVkJyxcbiAgICBsb29rdXA6ICdsb29rVXAnLFxuICAgIGxvb2tkb3duOiAnbG9va0Rvd24nLFxuICAgIGxvb2tsZWZ0OiAnbG9va0xlZnQnLFxuICAgIGxvb2tyaWdodDogJ2xvb2tSaWdodCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX2w6ICdibGlua0xlZnQnLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICBibGlua19yOiAnYmxpbmtSaWdodCcsXG4gICAgbmV1dHJhbDogJ25ldXRyYWwnLFxuICB9O1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlciA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUV4cHJlc3Npb25NYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUV4cHJlc3Npb25NYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUV4cHJlc3Npb25zID0gZXh0ZW5zaW9uLmV4cHJlc3Npb25zO1xuICAgIGlmICghc2NoZW1hRXhwcmVzc2lvbnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIGxpc3QgZXhwcmVzc2lvbnNcbiAgICBjb25zdCBwcmVzZXROYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KE9iamVjdC52YWx1ZXMoVlJNRXhwcmVzc2lvblByZXNldE5hbWUpKTtcbiAgICBjb25zdCBuYW1lU2NoZW1hRXhwcmVzc2lvbk1hcCA9IG5ldyBNYXA8c3RyaW5nLCBWMVZSTVNjaGVtYS5FeHByZXNzaW9uPigpO1xuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5wcmVzZXQpLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIHR5cGVzY3JpcHRcblxuICAgICAgICBpZiAoIXByZXNldE5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIHByZXNldCBuYW1lIFwiJHtuYW1lfVwiIGRldGVjdGVkLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbmApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20gIT0gbnVsbCkge1xuICAgICAgT2JqZWN0LmVudHJpZXMoc2NoZW1hRXhwcmVzc2lvbnMuY3VzdG9tKS5mb3JFYWNoKChbbmFtZSwgc2NoZW1hRXhwcmVzc2lvbl0pID0+IHtcbiAgICAgICAgaWYgKHByZXNldE5hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IEN1c3RvbSBleHByZXNzaW9uIGNhbm5vdCBoYXZlIHByZXNldCBuYW1lIFwiJHtuYW1lfVwiLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lU2NoZW1hRXhwcmVzc2lvbk1hcC5zZXQobmFtZSwgc2NoZW1hRXhwcmVzc2lvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBwcmVwYXJlIG1hbmFnZXJcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTUV4cHJlc3Npb25NYW5hZ2VyKCk7XG5cbiAgICAvLyBsb2FkIGV4cHJlc3Npb25zXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBBcnJheS5mcm9tKG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLmVudHJpZXMoKSkubWFwKGFzeW5jIChbbmFtZSwgc2NoZW1hRXhwcmVzc2lvbl0pID0+IHtcbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IG5ldyBWUk1FeHByZXNzaW9uKG5hbWUpO1xuICAgICAgICBnbHRmLnNjZW5lLmFkZChleHByZXNzaW9uKTtcblxuICAgICAgICBleHByZXNzaW9uLmlzQmluYXJ5ID0gc2NoZW1hRXhwcmVzc2lvbi5pc0JpbmFyeSA/PyBmYWxzZTtcbiAgICAgICAgZXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rID8/ICdub25lJztcbiAgICAgICAgZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVMb29rQXQgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTW91dGggPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlTW91dGggPz8gJ25vbmUnO1xuXG4gICAgICAgIHNjaGVtYUV4cHJlc3Npb24ubW9ycGhUYXJnZXRCaW5kcz8uZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgIGlmIChiaW5kLm5vZGUgPT09IHVuZGVmaW5lZCB8fCBiaW5kLmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gKGF3YWl0IGdsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlKGdsdGYsIGJpbmQubm9kZSkpITtcbiAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBtZXNoIGhhcyB0aGUgdGFyZ2V0IG1vcnBoIHRhcmdldFxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFwcmltaXRpdmVzLmV2ZXJ5KFxuICAgICAgICAgICAgICAocHJpbWl0aXZlKSA9PlxuICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkocHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcykgJiZcbiAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4IDwgcHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5sZW5ndGgsXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiAke3NjaGVtYUV4cHJlc3Npb24ubmFtZX0gYXR0ZW1wdHMgdG8gaW5kZXggbW9ycGggIyR7bW9ycGhUYXJnZXRJbmRleH0gYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICB3ZWlnaHQ6IGJpbmQud2VpZ2h0ID8/IDEuMCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uLm1hdGVyaWFsQ29sb3JCaW5kcyB8fCBzY2hlbWFFeHByZXNzaW9uLnRleHR1cmVUcmFuc2Zvcm1CaW5kcykge1xuICAgICAgICAgIC8vIGxpc3QgdXAgZXZlcnkgbWF0ZXJpYWwgaW4gYGdsdGYuc2NlbmVgXG4gICAgICAgICAgY29uc3QgZ2x0Zk1hdGVyaWFsczogVEhSRUUuTWF0ZXJpYWxbXSA9IFtdO1xuICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSAob2JqZWN0IGFzIGFueSkubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgZ2x0Zk1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IGdsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCh0aGlzLnBhcnNlciwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBiaW5kLnR5cGUsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRWYWx1ZTogbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGJpbmQudGFyZ2V0VmFsdWUpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0QWxwaGE6IGJpbmQudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IGdsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCh0aGlzLnBhcnNlciwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQub2Zmc2V0ID8/IFswLjAsIDAuMF0pLFxuICAgICAgICAgICAgICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQuc2NhbGUgPz8gWzEuMCwgMS4wXSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZSA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpO1xuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZUdyb3VwcyA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBtYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVOYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHNjaGVtYUJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCB2MFByZXNldE5hbWUgPSBzY2hlbWFHcm91cC5wcmVzZXROYW1lO1xuICAgICAgICBjb25zdCB2MVByZXNldE5hbWUgPVxuICAgICAgICAgICh2MFByZXNldE5hbWUgIT0gbnVsbCAmJiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnYwdjFQcmVzZXROYW1lTWFwW3YwUHJlc2V0TmFtZV0pIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB2MVByZXNldE5hbWUgPz8gc2NoZW1hR3JvdXAubmFtZTtcblxuICAgICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBPbmUgb2YgY3VzdG9tIGV4cHJlc3Npb25zIGhhcyBubyBuYW1lLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGR1cGxpY2F0aW9uIGNoZWNrXG4gICAgICAgIGlmIChibGVuZFNoYXBlTmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQW4gZXhwcmVzc2lvbiBwcmVzZXQgJHt2MFByZXNldE5hbWV9IGhhcyBkdXBsaWNhdGVkIGVudHJpZXMuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsZW5kU2hhcGVOYW1lU2V0LmFkZChuYW1lKTtcblxuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFHcm91cC5pc0JpbmFyeSA/PyBmYWxzZTtcbiAgICAgICAgLy8gdjAgZG9lc24ndCBoYXZlIGlnbm9yZSBwcm9wZXJ0aWVzXG5cbiAgICAgICAgLy8gQmluZCBtb3JwaFRhcmdldFxuICAgICAgICBpZiAoc2NoZW1hR3JvdXAuYmluZHMpIHtcbiAgICAgICAgICBzY2hlbWFHcm91cC5iaW5kcy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZC5tZXNoID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm9kZXNVc2luZ01lc2g6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBqc29uLm5vZGVzPy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLm1lc2ggPT09IGJpbmQubWVzaCkge1xuICAgICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLnB1c2goaSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiDjgqLjg5Djgr/jg7zjga7jgqrjg5bjgrjjgqfjgq/jg4jjgavoqK3lrprjgZXjgozjgabjgYTjgovjg57jg4bjg6rjgqLjg6vjga7lhoXjgYvjgolcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWXjgafmjIflrprjgZXjgozjgabjgYTjgovjg57jg4bjg6rjgqLjg6vjgpLpm4bjgoHjgovjgIJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiDnibnlrprjgavjga/lkI3liY3jgpLkvb/nlKjjgZnjgovjgIJcbiAgICAgICAgICAgICAqIOOCouOCpuODiOODqeOCpOODs+aPj+eUu+eUqOOBruODnuODhuODquOCouODq+OCguWQjOaZguOBq+mbhuOCgeOCi+OAglxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcblxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gMS4wIC0gb2Zmc2V0LnkgLSBzY2FsZS55O1xuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIE1hdGVyaWFsQ29sb3JCaW5kXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsQ29sb3JUeXBlID0gdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcFttYXRlcmlhbFByb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgIGlmIChtYXRlcmlhbENvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQoe1xuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0ZXJpYWxDb2xvclR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSEpLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRBbHBoYTogbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbM10sXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgQmxvY2s6ICdibG9jaycsXG4gIEJsZW5kOiAnYmxlbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9IHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlXTtcbiIsImltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRGaXJzdFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUiA9IDk7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0VGhpcmRQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHB1YmxpYyBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXTtcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUjtcbiAgcHJpdmF0ZSBfdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVI7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRMYXllcnMgPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUZpcnN0UGVyc29uIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gbWVzaEFubm90YXRpb25zIEEgcmVuZGVyZXIgc2V0dGluZ3MuIFNlZSB0aGUgZGVzY3JpcHRpb24gb2YgW1tSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NdXSBmb3IgbW9yZSBpbmZvXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucyA9IG1lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1GaXJzdFBlcnNvbik6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNRmlyc3RQZXJzb246IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBzb3VyY2UubWVzaEFubm90YXRpb25zLm1hcCgoYW5ub3RhdGlvbikgPT4gKHtcbiAgICAgIG1lc2hlczogYW5ub3RhdGlvbi5tZXNoZXMuY29uY2F0KCksXG4gICAgICB0eXBlOiBhbm5vdGF0aW9uLnR5cGUsXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUZpcnN0UGVyc29ufS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1GaXJzdFBlcnNvbn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1GaXJzdFBlcnNvbiB7XG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbih0aGlzLmh1bWFub2lkLCB0aGlzLm1lc2hBbm5vdGF0aW9ucykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwge0BsaW5rIHNldHVwfSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyB7QGxpbmsgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSfSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEge0BsaW5rIHNldHVwfSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgdGhpcmRQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW4gdGhpcyBtZXRob2QsIGl0IGFzc2lnbnMgbGF5ZXJzIGZvciBldmVyeSBtZXNoZXMgYmFzZWQgb24gbWVzaCBhbm5vdGF0aW9ucy5cbiAgICogWW91IG11c3QgY2FsbCB0aGlzIG1ldGhvZCBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZS5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIFtWUk1GaXJzdFBlcnNvbi5TZXR1cF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzczYTViZDhmY2RkYWEyYTdhODczNTA5OWE5N2U2M2M5ZGIzZTVlYTAvQXNzZXRzL1ZSTS9SdW50aW1lL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzI0wyOTUtTDI5OSkgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIsXG4gICAgdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIsXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZExheWVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdmaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3RoaXJkUGVyc29uT25seScpIHtcbiAgICAgICAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICAgIG1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnYXV0bycpIHtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsKG1lc2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2luaXRpYWxpemVkTGF5ZXJzID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnk7XG5cbiAgICBjb25zdCBza2luSW5kZXhBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKTtcbiAgICBjb25zdCBza2luSW5kZXhBdHRyQXJyYXkgPSBza2luSW5kZXhBdHRyIGluc3RhbmNlb2YgVEhSRUUuR0xCdWZmZXJBdHRyaWJ1dGUgPyBbXSA6IHNraW5JbmRleEF0dHIuYXJyYXk7XG4gICAgY29uc3Qgc2tpbkluZGV4ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyQXJyYXkubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5JbmRleC5wdXNoKFtcbiAgICAgICAgc2tpbkluZGV4QXR0ckFycmF5W2ldLFxuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaSArIDFdLFxuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaSArIDJdLFxuICAgICAgICBza2luSW5kZXhBdHRyQXJyYXlbaSArIDNdLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKTtcbiAgICBjb25zdCBza2luV2VpZ2h0QXR0ckFycmF5ID0gc2tpbldlaWdodEF0dHIgaW5zdGFuY2VvZiBUSFJFRS5HTEJ1ZmZlckF0dHJpYnV0ZSA/IFtdIDogc2tpbldlaWdodEF0dHIuYXJyYXk7XG4gICAgY29uc3Qgc2tpbldlaWdodCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbldlaWdodEF0dHJBcnJheS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbldlaWdodC5wdXNoKFtcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpXSxcbiAgICAgICAgc2tpbldlaWdodEF0dHJBcnJheVtpICsgMV0sXG4gICAgICAgIHNraW5XZWlnaHRBdHRyQXJyYXlbaSArIDJdLFxuICAgICAgICBza2luV2VpZ2h0QXR0ckFycmF5W2kgKyAzXSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kZXgoKTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VvbWV0cnkgZG9lc24ndCBoYXZlIGFuIGluZGV4IGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVHJpYW5nbGVzID0gQXJyYXkuZnJvbShpbmRleC5hcnJheSk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2V4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50OiBUSFJFRS5PYmplY3QzRCwgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBlcmFzZUJvbmVJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIG1lc2guc2tlbGV0b24uYm9uZXMuZm9yRWFjaCgoYm9uZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUpKSBlcmFzZUJvbmVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gVW5saWtlIFVuaVZSTSB3ZSBkb24ndCBjb3B5IG1lc2ggaWYgbm8gaW52aXNpYmxlIGJvbmUgd2FzIGZvdW5kXG4gICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgY29uc3QgbmV3TWVzaCA9IHRoaXMuX2NyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWwobm9kZTogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAnR3JvdXAnKSB7XG4gICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBwYXJlbnQubmFtZSA9IGBfaGVhZGxlc3NfJHtub2RlLm5hbWV9YDtcbiAgICAgICAgcGFyZW50LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnBhcmVudCEuYWRkKHBhcmVudCk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudHlwZSA9PT0gJ1NraW5uZWRNZXNoJylcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gY2hpbGQgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50LCBza2lubmVkTWVzaCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gbm9kZSBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChub2RlLnBhcmVudCEsIHNraW5uZWRNZXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0VyYXNlVGFyZ2V0KGJvbmU6IFRIUkVFLk9iamVjdDNEKTogYm9vbGVhbiB7XG4gICAgaWYgKGJvbmUgPT09IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IGV4dGVuc2lvbi5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuICAgIEFycmF5LmZyb20obm9kZVByaW1pdGl2ZXNNYXAuZW50cmllcygpKS5mb3JFYWNoKChbbm9kZUluZGV4LCBwcmltaXRpdmVzXSkgPT4ge1xuICAgICAgY29uc3QgYW5ub3RhdGlvbiA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm5vZGUgPT09IG5vZGVJbmRleClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiBhbm5vdGF0aW9uPy50eXBlID8/ICdib3RoJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFYwVlJNLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG5cbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICBjb25zdCBmbGFnID0gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zXG4gICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoKGEpID0+IGEubWVzaCA9PT0gc2NoZW1hTm9kZS5tZXNoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2goe1xuICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgIHR5cGU6IHRoaXMuX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnPy5maXJzdFBlcnNvbkZsYWcpLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKGh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydFYwRmxhZ1RvVjFUeXBlKGZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIHtcbiAgICBpZiAoZmxhZyA9PT0gJ0ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgIHJldHVybiAnZmlyc3RQZXJzb25Pbmx5JztcbiAgICB9IGVsc2UgaWYgKGZsYWcgPT09ICdUaGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ3RoaXJkUGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnQXV0bycpIHtcbiAgICAgIHJldHVybiAnYXV0byc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnYm90aCc7XG4gICAgfVxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID0ge1xuICBBdXRvOiAnYXV0bycsXG4gIEJvdGg6ICdib3RoJyxcbiAgVGhpcmRQZXJzb25Pbmx5OiAndGhpcmRQZXJzb25Pbmx5JyxcbiAgRmlyc3RQZXJzb25Pbmx5OiAnZmlyc3RQZXJzb25Pbmx5Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID1cbiAgdHlwZW9mIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlW2tleW9mIHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZV07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9WUk1IdW1hbm9pZCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1IdW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHByaXZhdGUgX2JvbmVBeGVzTWFwOiBNYXA8VlJNSHVtYW5Cb25lLCBUSFJFRS5BeGVzSGVscGVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtSHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMuX2JvbmVBeGVzTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgT2JqZWN0LnZhbHVlcyhodW1hbm9pZC5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxLjApO1xuXG4gICAgICBoZWxwZXIubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAgIChoZWxwZXIubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoV3JpdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hZGQoaGVscGVyKTtcblxuICAgICAgdGhpcy5fYm9uZUF4ZXNNYXAuc2V0KGJvbmUsIGhlbHBlcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLnZhbHVlcygpKS5mb3JFYWNoKChheGVzKSA9PiB7XG4gICAgICBheGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIChheGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW2JvbmUsIGF4ZXNdKSA9PiB7XG4gICAgICBib25lLm5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBib25lLm5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIF9xdWF0QSwgX3YzQik7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gX3YzQS5zZXQoMC4xLCAwLjEsIDAuMSkuZGl2aWRlKF92M0IpO1xuICAgICAgYXhlcy5tYXRyaXguY29weShib25lLm5vZGUubWF0cml4V29ybGQpLnNjYWxlKHNjYWxlKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS4gRGVwZW5kZW5jeSBhd2FyZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZUxpc3Q6IFZSTUh1bWFuQm9uZU5hbWVbXSA9IFtcbiAgJ2hpcHMnLFxuICAnc3BpbmUnLFxuICAnY2hlc3QnLFxuICAndXBwZXJDaGVzdCcsXG4gICduZWNrJyxcblxuICAnaGVhZCcsXG4gICdsZWZ0RXllJyxcbiAgJ3JpZ2h0RXllJyxcbiAgJ2phdycsXG5cbiAgJ2xlZnRVcHBlckxlZycsXG4gICdsZWZ0TG93ZXJMZWcnLFxuICAnbGVmdEZvb3QnLFxuICAnbGVmdFRvZXMnLFxuXG4gICdyaWdodFVwcGVyTGVnJyxcbiAgJ3JpZ2h0TG93ZXJMZWcnLFxuICAncmlnaHRGb290JyxcbiAgJ3JpZ2h0VG9lcycsXG5cbiAgJ2xlZnRTaG91bGRlcicsXG4gICdsZWZ0VXBwZXJBcm0nLFxuICAnbGVmdExvd2VyQXJtJyxcbiAgJ2xlZnRIYW5kJyxcblxuICAncmlnaHRTaG91bGRlcicsXG4gICdyaWdodFVwcGVyQXJtJyxcbiAgJ3JpZ2h0TG93ZXJBcm0nLFxuICAncmlnaHRIYW5kJyxcblxuICAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gICdsZWZ0VGh1bWJEaXN0YWwnLFxuICAnbGVmdEluZGV4UHJveGltYWwnLFxuICAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRJbmRleERpc3RhbCcsXG4gICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gICdsZWZ0TWlkZGxlRGlzdGFsJyxcbiAgJ2xlZnRSaW5nUHJveGltYWwnLFxuICAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICAnbGVmdFJpbmdEaXN0YWwnLFxuICAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gICdyaWdodFRodW1iRGlzdGFsJyxcbiAgJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gICdyaWdodE1pZGRsZURpc3RhbCcsXG4gICdyaWdodFJpbmdQcm94aW1hbCcsXG4gICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRSaW5nRGlzdGFsJyxcbiAgJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRMaXR0bGVEaXN0YWwnLFxuXTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFRoZSBuYW1lcyBvZiB7QGxpbmsgVlJNSHVtYW5vaWR9IGJvbmUgbmFtZXMuXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIENoZXN0OiAnY2hlc3QnLFxuICBVcHBlckNoZXN0OiAndXBwZXJDaGVzdCcsXG4gIE5lY2s6ICduZWNrJyxcblxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRFeWU6ICdsZWZ0RXllJyxcbiAgUmlnaHRFeWU6ICdyaWdodEV5ZScsXG4gIEphdzogJ2phdycsXG5cbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIExlZnRUb2VzOiAnbGVmdFRvZXMnLFxuXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBSaWdodFRvZXM6ICdyaWdodFRvZXMnLFxuXG4gIExlZnRTaG91bGRlcjogJ2xlZnRTaG91bGRlcicsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuXG4gIFJpZ2h0U2hvdWxkZXI6ICdyaWdodFNob3VsZGVyJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG5cbiAgTGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBMZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgTGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iRGlzdGFsJyxcbiAgTGVmdEluZGV4UHJveGltYWw6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIExlZnRJbmRleEludGVybWVkaWF0ZTogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIExlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleERpc3RhbCcsXG4gIExlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIExlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdE1pZGRsZURpc3RhbDogJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICBMZWZ0UmluZ1Byb3hpbWFsOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIExlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBMZWZ0UmluZ0Rpc3RhbDogJ2xlZnRSaW5nRGlzdGFsJyxcbiAgTGVmdExpdHRsZVByb3hpbWFsOiAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgTGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgUmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIFJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIFJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgUmlnaHRJbmRleFByb3hpbWFsOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgUmlnaHRJbmRleEludGVybWVkaWF0ZTogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBSaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleERpc3RhbCcsXG4gIFJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIFJpZ2h0TWlkZGxlRGlzdGFsOiAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICBSaWdodFJpbmdQcm94aW1hbDogJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRSaW5nRGlzdGFsOiAncmlnaHRSaW5nRGlzdGFsJyxcbiAgUmlnaHRMaXR0bGVQcm94aW1hbDogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICBSaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZURpc3RhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1IdW1hbkJvbmVOYW1lID0gdHlwZW9mIFZSTUh1bWFuQm9uZU5hbWVba2V5b2YgdHlwZW9mIFZSTUh1bWFuQm9uZU5hbWVdO1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IG1hcHMgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gaXRzIHBhcmVudCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZVBhcmVudE1hcDogeyBbYm9uZSBpbiBWUk1IdW1hbkJvbmVOYW1lXTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgfSA9IHtcbiAgaGlwczogbnVsbCxcbiAgc3BpbmU6ICdoaXBzJyxcbiAgY2hlc3Q6ICdzcGluZScsXG4gIHVwcGVyQ2hlc3Q6ICdjaGVzdCcsXG4gIG5lY2s6ICd1cHBlckNoZXN0JyxcblxuICBoZWFkOiAnbmVjaycsXG4gIGxlZnRFeWU6ICdoZWFkJyxcbiAgcmlnaHRFeWU6ICdoZWFkJyxcbiAgamF3OiAnaGVhZCcsXG5cbiAgbGVmdFVwcGVyTGVnOiAnaGlwcycsXG4gIGxlZnRMb3dlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIGxlZnRGb290OiAnbGVmdExvd2VyTGVnJyxcbiAgbGVmdFRvZXM6ICdsZWZ0Rm9vdCcsXG5cbiAgcmlnaHRVcHBlckxlZzogJ2hpcHMnLFxuICByaWdodExvd2VyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIHJpZ2h0Rm9vdDogJ3JpZ2h0TG93ZXJMZWcnLFxuICByaWdodFRvZXM6ICdyaWdodEZvb3QnLFxuXG4gIGxlZnRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICBsZWZ0VXBwZXJBcm06ICdsZWZ0U2hvdWxkZXInLFxuICBsZWZ0TG93ZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBsZWZ0SGFuZDogJ2xlZnRMb3dlckFybScsXG5cbiAgcmlnaHRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICByaWdodFVwcGVyQXJtOiAncmlnaHRTaG91bGRlcicsXG4gIHJpZ2h0TG93ZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgcmlnaHRIYW5kOiAncmlnaHRMb3dlckFybScsXG5cbiAgbGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBsZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBsZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBsZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIGxlZnRSaW5nUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIGxlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBsZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG5cbiAgcmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICByaWdodEluZGV4UHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgcmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICByaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgcmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIHJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICByaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICByaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgcmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Qb3NlIH0gZnJvbSAnLi9WUk1Qb3NlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNUmlnIHtcbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IHRoYXQgY29udGFpbnMgYWxsIHRoZSBodW1hbiBib25lcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBnZXQgdGhlc2UgYm9uZXMgdXNpbmcge0BsaW5rIFZSTUh1bWFub2lkLmdldEJvbmV9LlxuICAgKi9cbiAgcHVibGljIGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXM7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldFBvc2V9IGFuZCB7QGxpbmsgZ2V0UG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIHJlc3RQb3NlOiBWUk1Qb3NlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcykge1xuICAgIHRoaXMuaHVtYW5Cb25lcyA9IGh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLnJlc3RQb3NlID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2UgPSB7fSBhcyBWUk1Qb3NlO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKCh2cm1Cb25lTmFtZVN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdnJtQm9uZU5hbWUgPSB2cm1Cb25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUodnJtQm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmNvcHkobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEuY29weShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRvIHJhdyBhcnJheXNcbiAgICAgIHBvc2VbdnJtQm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2UgPSB7fSBhcyBWUk1Qb3NlO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lTmFtZVN0cmluZykgPT4ge1xuICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRha2UgYSBkaWZmIGZyb20gcmVzdFBvc2VcbiAgICAgIF92M0Euc2V0KDAsIDAsIDApO1xuICAgICAgX3F1YXRBLmlkZW50aXR5KCk7XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKHJlc3RTdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN0U3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIHF1YXRJbnZlcnRDb21wYXQoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuYWRkKG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLnByZW11bHRpcGx5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIC8vIENvbnZlcnQgdG8gcmF3IGFycmF5c1xuICAgICAgcG9zZVtib25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgaHVtYW5vaWQgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSBbW1ZSTVBvc2VdXSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHBvc2VPYmplY3QpLmZvckVhY2goKFtib25lTmFtZVN0cmluZywgc3RhdGVdKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgcG9zZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKCFyZXN0U3RhdGUpIHtcbiAgICAgICAgLy8gSXQncyB2ZXJ5IHVubGlrZWx5LiBQb3NzaWJseSBhIGJ1Z1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBzdGF0ZSB0byB0aGUgYWN0dWFsIGJvbmVcbiAgICAgIGlmIChzdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgICBub2RlLnBvc2l0aW9uLmFkZChfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkoc3RhdGUucm90YXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnJlc3RQb3NlKS5mb3JFYWNoKChbYm9uZU5hbWUsIHJlc3RdKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSBhcyBWUk1IdW1hbkJvbmVOYW1lKTtcblxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHJlc3QucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShyZXN0LnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSB7QGxpbmsgVlJNSHVtYW5Cb25lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEgYFRIUkVFLk9iamVjdDNEYC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0/Lm5vZGUgPz8gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSwgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTGlzdCB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTGlzdCc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVQYXJlbnRNYXAgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZVBhcmVudE1hcCc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9ib25lV29ybGRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgbm9ybWFsaXplZCBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZFJpZyBleHRlbmRzIFZSTVJpZyB7XG4gIHByb3RlY3RlZCBzdGF0aWMgX3NldHVwVHJhbnNmb3Jtcyhtb2RlbFJpZzogVlJNUmlnKToge1xuICAgIHJpZ0JvbmVzOiBWUk1IdW1hbkJvbmVzO1xuICAgIHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICAgIHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgICBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgfSB7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgIHJvb3QubmFtZSA9ICdWUk1IdW1hbm9pZFJpZyc7XG5cbiAgICAvLyBzdG9yZSBib25lV29ybGRQb3NpdGlvbnMsIGJvbmVXb3JsZFJvdGF0aW9ucywgYW5kIHBhcmVudFdvcmxkUm90YXRpb25zXG4gICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlZlY3RvcjMgfSA9IHt9O1xuICAgIGNvbnN0IGJvbmVXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcbiAgICBjb25zdCBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfSA9IHt9O1xuXG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSBtb2RlbFJpZy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSkge1xuICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgIGNvbnN0IGJvbmVXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgICAgICBib25lTm9kZS51cGRhdGVXb3JsZE1hdHJpeCh0cnVlLCBmYWxzZSk7XG4gICAgICAgIGJvbmVOb2RlLm1hdHJpeFdvcmxkLmRlY29tcG9zZShib25lV29ybGRQb3NpdGlvbiwgYm9uZVdvcmxkUm90YXRpb24sIF92M0EpO1xuXG4gICAgICAgIGJvbmVXb3JsZFBvc2l0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRQb3NpdGlvbjtcbiAgICAgICAgYm9uZVdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSA9IGJvbmVXb3JsZFJvdGF0aW9uO1xuICAgICAgICBib25lUm90YXRpb25zW2JvbmVOYW1lXSA9IGJvbmVOb2RlLnF1YXRlcm5pb24uY2xvbmUoKTtcblxuICAgICAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICAgICAgYm9uZU5vZGUucGFyZW50Py5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3YzQSwgcGFyZW50V29ybGRSb3RhdGlvbiwgX3YzQSk7XG4gICAgICAgIHBhcmVudFdvcmxkUm90YXRpb25zW2JvbmVOYW1lXSA9IHBhcmVudFdvcmxkUm90YXRpb247XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBidWlsZCByaWcgaGllcmFyY2h5ICsgc3RvcmUgcGFyZW50V29ybGRSb3RhdGlvbnNcbiAgICBjb25zdCByaWdCb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdIGFzIFRIUkVFLlZlY3RvcjM7XG5cbiAgICAgICAgLy8gc2VlIHRoZSBuZWFyZXN0IHBhcmVudCBwb3NpdGlvblxuICAgICAgICBsZXQgY3VycmVudEJvbmVOYW1lOiBWUk1IdW1hbkJvbmVOYW1lIHwgbnVsbCA9IGJvbmVOYW1lO1xuICAgICAgICBsZXQgcGFyZW50Qm9uZVdvcmxkUG9zaXRpb246IFRIUkVFLlZlY3RvcjMgfCB1bmRlZmluZWQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnRCb25lV29ybGRQb3NpdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudEJvbmVOYW1lID0gVlJNSHVtYW5Cb25lUGFyZW50TWFwW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgICAgaWYgKGN1cnJlbnRCb25lTmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcGFyZW50Qm9uZVdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbY3VycmVudEJvbmVOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0byBoaWVyYXJjaHlcbiAgICAgICAgY29uc3QgcmlnQm9uZU5vZGUgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgcmlnQm9uZU5vZGUubmFtZSA9ICdOb3JtYWxpemVkXycgKyBib25lTm9kZS5uYW1lO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudFJpZ0JvbmVOb2RlID0gKGN1cnJlbnRCb25lTmFtZSA/IHJpZ0JvbmVzW2N1cnJlbnRCb25lTmFtZV0/Lm5vZGUgOiByb290KSBhcyBUSFJFRS5PYmplY3QzRDtcblxuICAgICAgICBwYXJlbnRSaWdCb25lTm9kZS5hZGQocmlnQm9uZU5vZGUpO1xuICAgICAgICByaWdCb25lTm9kZS5wb3NpdGlvbi5jb3B5KGJvbmVXb3JsZFBvc2l0aW9uKTtcbiAgICAgICAgaWYgKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uKSB7XG4gICAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uc3ViKHBhcmVudEJvbmVXb3JsZFBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJpZ0JvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZTogcmlnQm9uZU5vZGUgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICByaWdCb25lczogcmlnQm9uZXMgYXMgVlJNSHVtYW5Cb25lcyxcbiAgICAgIHJvb3QsXG4gICAgICBwYXJlbnRXb3JsZFJvdGF0aW9ucyxcbiAgICAgIGJvbmVSb3RhdGlvbnMsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbDogVlJNUmlnO1xuICBwdWJsaWMgcmVhZG9ubHkgcm9vdDogVEhSRUUuT2JqZWN0M0Q7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyZW50V29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JvbmVSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbm9pZDogVlJNUmlnKSB7XG4gICAgY29uc3QgeyByaWdCb25lcywgcm9vdCwgcGFyZW50V29ybGRSb3RhdGlvbnMsIGJvbmVSb3RhdGlvbnMgfSA9IFZSTUh1bWFub2lkUmlnLl9zZXR1cFRyYW5zZm9ybXMoaHVtYW5vaWQpO1xuXG4gICAgc3VwZXIocmlnQm9uZXMpO1xuXG4gICAgdGhpcy5vcmlnaW5hbCA9IGh1bWFub2lkO1xuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbnMgPSBwYXJlbnRXb3JsZFJvdGF0aW9ucztcbiAgICB0aGlzLl9ib25lUm90YXRpb25zID0gYm9uZVJvdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBodW1hbm9pZCByaWcuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gdGhpcy5vcmlnaW5hbC5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSkhO1xuICAgICAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uID0gdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdITtcbiAgICAgICAgY29uc3QgaW52UGFyZW50V29ybGRSb3RhdGlvbiA9IF9xdWF0QS5jb3B5KHBhcmVudFdvcmxkUm90YXRpb24pLmludmVydCgpO1xuICAgICAgICBjb25zdCBib25lUm90YXRpb24gPSB0aGlzLl9ib25lUm90YXRpb25zW2JvbmVOYW1lXSE7XG5cbiAgICAgICAgYm9uZU5vZGUucXVhdGVybmlvblxuICAgICAgICAgIC5jb3B5KHJpZ0JvbmVOb2RlLnF1YXRlcm5pb24pXG4gICAgICAgICAgLm11bHRpcGx5KHBhcmVudFdvcmxkUm90YXRpb24pXG4gICAgICAgICAgLnByZW11bHRpcGx5KGludlBhcmVudFdvcmxkUm90YXRpb24pXG4gICAgICAgICAgLm11bHRpcGx5KGJvbmVSb3RhdGlvbik7XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgbWFzcyBjZW50ZXIgb2YgdGhlIFZSTVxuICAgICAgICBpZiAoYm9uZU5hbWUgPT09ICdoaXBzJykge1xuICAgICAgICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uID0gcmlnQm9uZU5vZGUuZ2V0V29ybGRQb3NpdGlvbihfYm9uZVdvcmxkUG9zKTtcbiAgICAgICAgICBib25lTm9kZS5wYXJlbnQhLnVwZGF0ZVdvcmxkTWF0cml4KHRydWUsIGZhbHNlKTtcbiAgICAgICAgICBjb25zdCBwYXJlbnRXb3JsZE1hdHJpeCA9IGJvbmVOb2RlLnBhcmVudCEubWF0cml4V29ybGQ7XG4gICAgICAgICAgY29uc3QgbG9jYWxQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uLmFwcGx5TWF0cml4NChwYXJlbnRXb3JsZE1hdHJpeC5pbnZlcnQoKSk7XG4gICAgICAgICAgYm9uZU5vZGUucG9zaXRpb24uY29weShsb2NhbFBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Qb3NlIH0gZnJvbSAnLi9WUk1Qb3NlJztcbmltcG9ydCB7IFZSTVJpZyB9IGZyb20gJy4vVlJNUmlnJztcbmltcG9ydCB7IFZSTUh1bWFub2lkUmlnIH0gZnJvbSAnLi9WUk1IdW1hbm9pZFJpZyc7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgaHVtYW5vaWQgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZCB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIGl0IGNvcGllcyBwb3NlIGZyb20gbm9ybWFsaXplZEh1bWFuQm9uZXMgdG8gcmF3SHVtYW5Cb25lcyBvbiB7QGxpbmsgdXBkYXRlfS5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlSHVtYW5Cb25lczogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSByYXcgcmlnIG9mIHRoZSBWUk0uXG4gICAqL1xuICBwcml2YXRlIF9yYXdIdW1hbkJvbmVzOiBWUk1SaWc7IC8vIFRPRE86IFJlbmFtZVxuXG4gIC8qKlxuICAgKiBBIG5vcm1hbGl6ZWQgcmlnIG9mIHRoZSBWUk0uXG4gICAqL1xuICBwcml2YXRlIF9ub3JtYWxpemVkSHVtYW5Cb25lczogVlJNSHVtYW5vaWRSaWc7IC8vIFRPRE86IFJlbmFtZVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayByYXdSZXN0UG9zZX0gb3Ige0BsaW5rIG5vcm1hbGl6ZWRSZXN0UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogcmVzdFBvc2UgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciByYXdSZXN0UG9zZSBvciBub3JtYWxpemVkUmVzdFBvc2UgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnJhd1Jlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IG9mIGl0cyByYXcgaHVtYW4gYm9uZXMgdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0UmF3UG9zZX0gYW5kIHtAbGluayBnZXRSYXdQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhd1Jlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnJlc3RQb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IG9mIGl0cyBub3JtYWxpemVkIGh1bWFuIGJvbmVzIHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBhbmQge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSwgc2luY2UgaXQgY29udGFpbnMgbm9uLXJlbGF0aXZlIHZhbHVlcyBvZiBlYWNoIGxvY2FsIHRyYW5zZm9ybXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRSZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICAvLyBhbiBhbGlhcyBvZiBgcmF3SHVtYW5Cb25lc2BcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhd0h1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZEh1bWFuQm9uZXMoKTogVlJNSHVtYW5Cb25lcyB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvb3Qgb2Ygbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWRIdW1hbkJvbmVzUm9vdCgpOiBUSFJFRS5PYmplY3QzRCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJvb3Q7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqIEBwYXJhbSBodW1hbkJvbmVzIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IGNvbnRhaW5zIGFsbCB0aGUgYm9uZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKiBAcGFyYW0gYXV0b1VwZGF0ZUh1bWFuQm9uZXMgV2hldGhlciBpdCBjb3BpZXMgcG9zZSBmcm9tIG5vcm1hbGl6ZWRIdW1hbkJvbmVzIHRvIHJhd0h1bWFuQm9uZXMgb24ge0BsaW5rIHVwZGF0ZX0uIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMsIG9wdGlvbnM/OiB7IGF1dG9VcGRhdGVIdW1hbkJvbmVzPzogYm9vbGVhbiB9KSB7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzID8/IHRydWU7XG4gICAgdGhpcy5fcmF3SHVtYW5Cb25lcyA9IG5ldyBWUk1SaWcoaHVtYW5Cb25lcyk7XG4gICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMgPSBuZXcgVlJNSHVtYW5vaWRSaWcodGhpcy5fcmF3SHVtYW5Cb25lcyk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSB0aGUgZ2l2ZW4ge0BsaW5rIFZSTUh1bWFub2lkfSBpbnRvIHRoaXMgb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNSHVtYW5vaWR9IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1IdW1hbm9pZCk6IHRoaXMge1xuICAgIHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBzb3VyY2UuYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG4gICAgdGhpcy5fcmF3SHVtYW5Cb25lcyA9IG5ldyBWUk1SaWcoc291cmNlLmh1bWFuQm9uZXMpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzID0gbmV3IFZSTUh1bWFub2lkUmlnKHRoaXMuX3Jhd0h1bWFuQm9uZXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1IdW1hbm9pZCB7XG4gICAgcmV0dXJuIG5ldyBWUk1IdW1hbm9pZCh0aGlzLmh1bWFuQm9uZXMsIHsgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMgfSkuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdBYnNvbHV0ZVBvc2V9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnVlJNSHVtYW5vaWQ6IGdldEFic29sdXRlUG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3QWJzb2x1dGVQb3NlKCkgb3IgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZSgpIGluc3RlYWQuJyxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyByYXcgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0UmF3UG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRSYXdBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IGFic29sdXRlIHBvc2Ugb2YgdGhpcyBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEFic29sdXRlUG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd1Bvc2V9IG9yIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IGdldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd1Bvc2UoKSBvciBnZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjdXJyZW50IHBvc2Ugb2YgcmF3IGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXRSYXdQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiBub3JtYWxpemVkIGh1bWFuIGJvbmVzIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHNldFJhd1Bvc2V9IG9yIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBzZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBzZXRSYXdQb3NlKCkgb3Igc2V0Tm9ybWFsaXplZFBvc2UoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2V0UmF3UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIHJhdyBodW1hbiBib25lcyBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldFJhd1Bvc2V9LlxuICAgKlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30sIHlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0UmF3UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuc2V0UG9zZShwb3NlT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXQgdGhlIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXROb3JtYWxpemVkUG9zZX0uXG4gICAqXG4gICAqIEBwYXJhbSBwb3NlT2JqZWN0IEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0Tm9ybWFsaXplZFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5zZXRQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHJlc2V0UmF3UG9zZX0gb3Ige0BsaW5rIHJlc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQb3NlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHJlc2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgcmVzZXRSYXdQb3NlKCkgb3IgcmVzZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXNldFJhd1Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgcmF3IGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayByZXNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UmF3UG9zZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgbm9ybWFsaXplZCBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0Tm9ybWFsaXplZFBvc2UoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnJlc2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0JvbmV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IGdldEJvbmUoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIGdldFJhd0JvbmUoKSBvciBnZXROb3JtYWxpemVkQm9uZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyB7QGxpbmsgVlJNSHVtYW5Cb25lfSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgbm9ybWFsaXplZCB7QGxpbmsgVlJNSHVtYW5Cb25lfSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXROb3JtYWxpemVkQm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lTm9kZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRCb25lTm9kZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnVlJNSHVtYW5vaWQ6IGdldEJvbmVOb2RlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lTm9kZSgpIG9yIGdldE5vcm1hbGl6ZWRCb25lTm9kZSgpIGluc3RlYWQuJyxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmF3IGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldFJhd0JvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmdldEJvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQgYm9uZSBhcyBhIGBUSFJFRS5PYmplY3QzRGAgYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGh1bWFub2lkIGNvbXBvbmVudC5cbiAgICpcbiAgICogSWYge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSBpcyBgdHJ1ZWAsIGl0IHRyYW5zZmVycyB0aGUgcG9zZSBvZiBub3JtYWxpemVkIGh1bWFuIGJvbmVzIHRvIHJhdyBodW1hbiBib25lcy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMpIHtcbiAgICAgIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIEhlYWQ6ICdoZWFkJyxcbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBMZWZ0VXBwZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBMZWZ0TG93ZXJBcm06ICdsZWZ0TG93ZXJBcm0nLFxuICBMZWZ0SGFuZDogJ2xlZnRIYW5kJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgPSB0eXBlb2YgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lW2tleW9mIHR5cGVvZiBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWVdO1xuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB7IFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL1ZSTUh1bWFub2lkSGVscGVyJztcbmltcG9ydCB7IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gJy4vVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW5PcHRpb25zJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgbWFwIGZyb20gb2xkIHRodW1iIGJvbmUgbmFtZXMgdG8gbmV3IHRodW1iIGJvbmUgbmFtZXNcbiAqL1xuY29uc3QgdGh1bWJCb25lTmFtZU1hcDogeyBba2V5OiBzdHJpbmddOiBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWUgfCB1bmRlZmluZWQgfSA9IHtcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iSW50ZXJtZWRpYXRlOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJJbnRlcm1lZGlhdGU6ICdyaWdodFRodW1iUHJveGltYWwnLFxufTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1IdW1hbm9pZH0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgYW4gT2JqZWN0M0QgdG8gYWRkIHtAbGluayBWUk1IdW1hbm9pZEhlbHBlcn0uXG4gICAqIElmIG5vdCBzcGVjaWZpZWQsIGhlbHBlciB3aWxsIG5vdCBiZSBjcmVhdGVkLlxuICAgKiBJZiBgcmVuZGVyT3JkZXJgIGlzIHNldCB0byB0aGUgcm9vdCwgdGhlIGhlbHBlciB3aWxsIGNvcHkgdGhlIHNhbWUgYHJlbmRlck9yZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgaGVscGVyUm9vdD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHB1YmxpYyBhdXRvVXBkYXRlSHVtYW5Cb25lcz86IGJvb2xlYW47XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5oZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1IdW1hbm9pZH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNSHVtYW5vaWQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUh1bWFub2lkID0gZXh0ZW5zaW9uLmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbXBhdDogMS4wLWJldGEgdGh1bWIgYm9uZSBuYW1lc1xuICAgICAqXG4gICAgICogYHRydWVgIGlmIGBsZWZ0VGh1bWJJbnRlcm1lZGlhdGVgIG9yIGByaWdodFRodW1iSW50ZXJtZWRpYXRlYCBleGlzdHNcbiAgICAgKi9cbiAgICBjb25zdCBleGlzdHNQcmV2aW91c1RodW1iTmFtZSA9XG4gICAgICAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyBhcyBhbnkpLmxlZnRUaHVtYkludGVybWVkaWF0ZSAhPSBudWxsIHx8XG4gICAgICAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyBhcyBhbnkpLnJpZ2h0VGh1bWJJbnRlcm1lZGlhdGUgIT0gbnVsbDtcblxuICAgIGNvbnN0IGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4gPSB7fTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcyAhPSBudWxsKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcykubWFwKGFzeW5jIChbYm9uZU5hbWVTdHJpbmcsIHNjaGVtYUh1bWFuQm9uZV0pID0+IHtcbiAgICAgICAgICBsZXQgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWU7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBzY2hlbWFIdW1hbkJvbmUubm9kZTtcblxuICAgICAgICAgIC8vIGNvbXBhdDogMS4wLWJldGEgcHJldmlvdXMgdGh1bWIgYm9uZSBuYW1lc1xuICAgICAgICAgIGlmIChleGlzdHNQcmV2aW91c1RodW1iTmFtZSkge1xuICAgICAgICAgICAgY29uc3QgdGh1bWJCb25lTmFtZSA9IHRodW1iQm9uZU5hbWVNYXBbYm9uZU5hbWVdO1xuICAgICAgICAgICAgaWYgKHRodW1iQm9uZU5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBib25lTmFtZSA9IHRodW1iQm9uZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgZG9lcyBub3QgZXhpc3QsIGVtaXQgYSB3YXJuaW5nXG4gICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBBIGdsVEYgbm9kZSBib3VuZCB0byB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSAoaW5kZXggPSAke2luZGV4fSkgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzZXQgdG8gdGhlIGBodW1hbkJvbmVzYFxuICAgICAgICAgIGh1bWFuQm9uZXNbYm9uZU5hbWVdID0geyBub2RlIH07XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbm9pZCA9IG5ldyBWUk1IdW1hbm9pZCh0aGlzLl9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lcyksIHtcbiAgICAgIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzLFxuICAgIH0pO1xuICAgIGdsdGYuc2NlbmUuYWRkKGh1bWFub2lkLm5vcm1hbGl6ZWRIdW1hbkJvbmVzUm9vdCk7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNSHVtYW5vaWRIZWxwZXIoaHVtYW5vaWQpO1xuICAgICAgdGhpcy5oZWxwZXJSb290LmFkZChoZWxwZXIpO1xuICAgICAgaGVscGVyLnJlbmRlck9yZGVyID0gdGhpcy5oZWxwZXJSb290LnJlbmRlck9yZGVyO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbm9pZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCB2cm1FeHQgPSBqc29uLmV4dGVuc2lvbnM/LlZSTSBhcyBWMFZSTS5WUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUh1bWFub2lkOiBWMFZSTS5IdW1hbm9pZCB8IHVuZGVmaW5lZCA9IHZybUV4dC5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMubWFwKGFzeW5jIChib25lKSA9PiB7XG4gICAgICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lLmJvbmU7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBib25lLm5vZGU7XG5cbiAgICAgICAgICBpZiAoYm9uZU5hbWUgPT0gbnVsbCB8fCBpbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBpbmRleCk7XG5cbiAgICAgICAgICAvLyBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgZG9lcyBub3QgZXhpc3QsIGVtaXQgYSB3YXJuaW5nXG4gICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBBIGdsVEYgbm9kZSBib3VuZCB0byB0aGUgaHVtYW5vaWQgYm9uZSAke2JvbmVOYW1lfSAoaW5kZXggPSAke2luZGV4fSkgZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBtYXAgdG8gbmV3IGJvbmUgbmFtZVxuICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICBjb25zdCBuZXdCb25lTmFtZSA9ICh0aHVtYkJvbmVOYW1lID8/IGJvbmVOYW1lKSBhcyBWMVZSTVNjaGVtYS5IdW1hbm9pZEh1bWFuQm9uZU5hbWU7XG5cbiAgICAgICAgICAvLyB2MCBWUk1zIG1pZ2h0IGhhdmUgYSBtdWx0aXBsZSBub2RlcyBhdHRhY2hlZCB0byBhIHNpbmdsZSBib25lLi4uXG4gICAgICAgICAgLy8gc28gaWYgdGhlcmUgYWxyZWFkeSBpcyBhbiBlbnRyeSBpbiB0aGUgYGh1bWFuQm9uZXNgLCBzaG93IGEgd2FybmluZyBhbmQgaWdub3JlIGl0XG4gICAgICAgICAgaWYgKGh1bWFuQm9uZXNbbmV3Qm9uZU5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYE11bHRpcGxlIGJvbmUgZW50cmllcyBmb3IgJHtuZXdCb25lTmFtZX0gZGV0ZWN0ZWQgKGluZGV4ID0gJHtpbmRleH0pLCBpZ25vcmluZyBkdXBsaWNhdGVkIGVudHJpZXMuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW25ld0JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICAvKipcbiAgICogRW5zdXJlIHJlcXVpcmVkIGJvbmVzIGV4aXN0IGluIGdpdmVuIGh1bWFuIGJvbmVzLlxuICAgKiBAcGFyYW0gaHVtYW5Cb25lcyBIdW1hbiBib25lc1xuICAgKiBAcmV0dXJucyBIdW1hbiBib25lcywgbm8gbG9uZ2VyIHBhcnRpYWwhXG4gICAqL1xuICBwcml2YXRlIF9lbnN1cmVSZXF1aXJlZEJvbmVzRXhpc3QoaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPik6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdFxuICAgIGNvbnN0IG1pc3NpbmdSZXF1aXJlZEJvbmVzID0gT2JqZWN0LnZhbHVlcyhWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUpLmZpbHRlcihcbiAgICAgIChyZXF1aXJlZEJvbmVOYW1lKSA9PiBodW1hbkJvbmVzW3JlcXVpcmVkQm9uZU5hbWVdID09IG51bGwsXG4gICAgKTtcblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGFyZSBtaXNzaW5nIGJvbmVzXG4gICAgaWYgKG1pc3NpbmdSZXF1aXJlZEJvbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luOiBUaGVzZSBodW1hbm9pZCBib25lcyBhcmUgcmVxdWlyZWQgYnV0IG5vdCBleGlzdDogJHttaXNzaW5nUmVxdWlyZWRCb25lcy5qb2luKCcsICcpfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBodW1hbkJvbmVzIGFzIFZSTUh1bWFuQm9uZXM7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIEZhbkJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgdGhldGE6IG51bWJlcjtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGhldGEgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGhldGEgPSAwLjA7XG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFRoZXRhID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLl9hdHRyUG9zID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgRmxvYXQzMkFycmF5KDY1ICogMyksIDMpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIHRoaXMuX2F0dHJQb3MpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4ID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShuZXcgVWludDE2QXJyYXkoMyAqIDYzKSwgMSk7XG4gICAgdGhpcy5zZXRJbmRleCh0aGlzLl9hdHRySW5kZXgpO1xuXG4gICAgdGhpcy5fYnVpbGRJbmRleCgpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUaGV0YSAhPT0gdGhpcy50aGV0YSkge1xuICAgICAgdGhpcy5fY3VycmVudFRoZXRhID0gdGhpcy50aGV0YTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDAsIDAuMCwgMC4wLCAwLjApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICBjb25zdCB0ID0gKGkgLyA2My4wKSAqIHRoaXMuX2N1cnJlbnRUaGV0YTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSArIDEsIHRoaXMuX2N1cnJlbnRSYWRpdXMgKiBNYXRoLnNpbih0KSwgMC4wLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYzOyBpKyspIHtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWVooaSAqIDMsIDAsIGkgKyAxLCBpICsgMik7XG4gICAgfVxuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5IGV4dGVuZHMgVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG4gIHB1YmxpYyB0YWlsOiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIF9jdXJyZW50UmFkaXVzOiBudW1iZXI7XG4gIHByaXZhdGUgX2N1cnJlbnRUYWlsOiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRyUG9zOiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJJbmRleDogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5yYWRpdXMgPSAwLjA7XG4gICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IDAuMDtcblxuICAgIHRoaXMudGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSgyOTQpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDE5NCksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50UmFkaXVzICE9PSB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5fY3VycmVudFJhZGl1cyA9IHRoaXMucmFkaXVzO1xuICAgICAgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudFRhaWwuZXF1YWxzKHRoaXMudGFpbCkpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy50YWlsKTtcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlR2VvbWV0cnkpIHtcbiAgICAgIHRoaXMuX2J1aWxkUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gMTYuMCkgKiBNYXRoLlBJO1xuXG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWihpLCBNYXRoLmNvcyh0KSwgTWF0aC5zaW4odCksIDAuMCk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigzMiArIGksIDAuMCwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpKTtcbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDY0ICsgaSwgTWF0aC5zaW4odCksIDAuMCwgTWF0aC5jb3ModCkpO1xuICAgIH1cblxuICAgIHRoaXMuc2NhbGUodGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cywgdGhpcy5fY3VycmVudFJhZGl1cyk7XG4gICAgdGhpcy50cmFuc2xhdGUodGhpcy5fY3VycmVudFRhaWwueCwgdGhpcy5fY3VycmVudFRhaWwueSwgdGhpcy5fY3VycmVudFRhaWwueik7XG5cbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig5NiwgMCwgMCwgMCk7XG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTcsIHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEluZGV4KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgY29uc3QgaTEgPSAoaSArIDEpICUgMzI7XG5cbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWShpICogMiwgaSwgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDY0ICsgaSAqIDIsIDMyICsgaSwgMzIgKyBpMSk7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTI4ICsgaSAqIDIsIDY0ICsgaSwgNjQgKyBpMSk7XG4gICAgfVxuICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSgxOTIsIDk2LCA5Nyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgRmFuQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0ZhbkJ1ZmZlckdlb21ldHJ5JztcbmltcG9ydCB7IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSB9IGZyb20gJy4vdXRpbHMvTGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5JztcblxuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBTUVJUXzJfT1ZFUl8yID0gTWF0aC5zcXJ0KDIuMCkgLyAyLjA7XG5jb25zdCBRVUFUX1hZX0NXOTAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigwLCAwLCAtU1FSVF8yX09WRVJfMiwgU1FSVF8yX09WRVJfMik7XG5jb25zdCBWRUMzX1BPU0lUSVZFX1kgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDEuMCwgMC4wKTtcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlbHBlciBleHRlbmRzIFRIUkVFLkdyb3VwIHtcbiAgcHVibGljIHJlYWRvbmx5IHZybUxvb2tBdDogVlJNTG9va0F0O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoWWF3OiBUSFJFRS5NZXNoPEZhbkJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbD47XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc2hQaXRjaDogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9saW5lVGFyZ2V0OiBUSFJFRS5MaW5lU2VnbWVudHM8TGluZUFuZFNwaGVyZUJ1ZmZlckdlb21ldHJ5LCBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGxvb2tBdDogVlJNTG9va0F0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMudnJtTG9va0F0ID0gbG9va0F0O1xuXG4gICAge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgRmFuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuNTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHgwMGZmMDAsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX21lc2hQaXRjaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoUGl0Y2gpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmYwMDAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoWWF3ID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX21lc2hZYXcpO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC4xO1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbGluZVRhcmdldCA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbGluZVRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbWVzaFlhdy5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5tYXRlcmlhbC5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9saW5lVGFyZ2V0Lm1hdGVyaWFsLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXRyaXhXb3JsZChmb3JjZTogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHVwZGF0ZSBnZW9tZXRyaWVzXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC55YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS50aGV0YSA9IHlhdztcbiAgICB0aGlzLl9tZXNoWWF3Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuXG4gICAgY29uc3QgcGl0Y2ggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMudnJtTG9va0F0LnBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS50aGV0YSA9IHBpdGNoO1xuICAgIHRoaXMuX21lc2hQaXRjaC5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIC8vIGdldCB3b3JsZCBwb3NpdGlvbiBhbmQgcXVhdGVybmlvblxuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUG9zaXRpb24oX3YzQSk7XG4gICAgdGhpcy52cm1Mb29rQXQuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0QSk7XG5cbiAgICAvLyBjYWxjdWxhdGUgcm90YXRpb24gdXNpbmcgZmFjZUZyb250XG4gICAgX3F1YXRBLm11bHRpcGx5KHRoaXMudnJtTG9va0F0LmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRCKSk7XG5cbiAgICAvLyBzZXQgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHRoaXMuX21lc2hZYXcucG9zaXRpb24uY29weShfdjNBKTtcbiAgICB0aGlzLl9tZXNoWWF3LnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24uY29weShfcXVhdEEpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KF9xdWF0Qi5zZXRGcm9tQXhpc0FuZ2xlKFZFQzNfUE9TSVRJVkVfWSwgeWF3KSk7XG4gICAgdGhpcy5fbWVzaFBpdGNoLnF1YXRlcm5pb24ubXVsdGlwbHkoUVVBVF9YWV9DVzkwKTtcblxuICAgIC8vIHVwZGF0ZSB0YXJnZXQgbGluZSBhbmQgc3BoZXJlXG4gICAgY29uc3QgeyB0YXJnZXQsIGF1dG9VcGRhdGUgfSA9IHRoaXMudnJtTG9va0F0O1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBhdXRvVXBkYXRlKSB7XG4gICAgICB0YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNCKS5zdWIoX3YzQSk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnRhaWwuY29weShfdjNCKTtcbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQuZ2VvbWV0cnkudXBkYXRlKCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgdHJhbnNmb3JtIHRvIG1lc2hlc1xuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfcG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3NjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuLyoqXG4gKiBBIHJlcGxhY2VtZW50IG9mIGBPYmplY3QzRC5nZXRXb3JsZFF1YXRlcm5pb25gLlxuICogRXh0cmFjdCB0aGUgd29ybGQgcXVhdGVybmlvbiBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCB3aXRob3V0IGNhbGxpbmcgYE9iamVjdDNELnVwZGF0ZVdvcmxkTWF0cml4YC5cbiAqIFVzZSB0aGlzIHdoZW4geW91J3JlIHN1cmUgdGhhdCB0aGUgd29ybGQgbWF0cml4IGlzIHVwLXRvLWRhdGUuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IEEgdGFyZ2V0IHF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUXVhdGVybmlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3Bvc2l0aW9uLCBvdXQsIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGF6aW11dGggLyBhbHRpdHVkZSBhbmdsZXMgZnJvbSBhIHZlY3Rvci5cbiAqXG4gKiBUaGlzIHJldHVybnMgYSBkaWZmZXJlbmNlIG9mIGFuZ2xlcyBmcm9tICgxLCAwLCAwKS5cbiAqIEF6aW11dGggcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWSBheGlzLlxuICogQWx0aXR1ZGUgcmVwcmVzZW50cyBhbiBhbmdsZSBhcm91bmQgWiBheGlzLlxuICogSXQgaXMgcm90YXRlZCBpbiBpbnRyaW5zaWMgWS1aIG9yZGVyLlxuICpcbiAqIEBwYXJhbSB2ZWN0b3IgVGhlIHZlY3RvclxuICogQHJldHVybnMgQSB0dXBsZSBjb250YWlucyB0d28gYW5nbGVzLCBgWyBhemltdXRoLCBhbHRpdHVkZSBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY0F6aW11dGhBbHRpdHVkZSh2ZWN0b3I6IFRIUkVFLlZlY3RvcjMpOiBbYXppbXV0aDogbnVtYmVyLCBhbHRpdHVkZTogbnVtYmVyXSB7XG4gIHJldHVybiBbTWF0aC5hdGFuMigtdmVjdG9yLnosIHZlY3Rvci54KSwgTWF0aC5hdGFuMih2ZWN0b3IueSwgTWF0aC5zcXJ0KHZlY3Rvci54ICogdmVjdG9yLnggKyB2ZWN0b3IueiAqIHZlY3Rvci56KSldO1xufVxuIiwiLyoqXG4gKiBNYWtlIHN1cmUgdGhlIGFuZ2xlIGlzIHdpdGhpbiAtUEkgdG8gUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBzYW5pdGl6ZUFuZ2xlKDEuNSAqIE1hdGguUEkpIC8vIC0wLjUgKiBQSVxuICogYGBgXG4gKlxuICogQHBhcmFtIGFuZ2xlIEFuIGlucHV0IGFuZ2xlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUFuZ2xlKGFuZ2xlOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCByb3VuZFR1cm4gPSBNYXRoLnJvdW5kKGFuZ2xlIC8gMi4wIC8gTWF0aC5QSSk7XG4gIHJldHVybiBhbmdsZSAtIDIuMCAqIE1hdGguUEkgKiByb3VuZFR1cm47XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlJztcbmltcG9ydCB7IHF1YXRJbnZlcnRDb21wYXQgfSBmcm9tICcuLi91dGlscy9xdWF0SW52ZXJ0Q29tcGF0JztcbmltcG9ydCB7IGNhbGNBemltdXRoQWx0aXR1ZGUgfSBmcm9tICcuL3V0aWxzL2NhbGNBemltdXRoQWx0aXR1ZGUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IHNhbml0aXplQW5nbGUgfSBmcm9tICcuL3V0aWxzL3Nhbml0aXplQW5nbGUnO1xuXG5jb25zdCBWRUMzX1BPU0lUSVZFX1ogPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEMgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXREID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9ldWxlckEgPSBuZXcgVEhSRUUuRXVsZXIoKTtcblxuLyoqXG4gKiBBIGNsYXNzIGNvbnRyb2xzIGV5ZSBnYXplIG1vdmVtZW50cyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdCB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVVMRVJfT1JERVIgPSAnWVhaJzsgLy8geWF3LXBpdGNoLXJvbGxcblxuICAvKipcbiAgICogVGhlIG9yaWdpbiBvZiBMb29rQXQuIFBvc2l0aW9uIG9mZnNldCBmcm9tIHRoZSBoZWFkIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgb2Zmc2V0RnJvbUhlYWRCb25lID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgVlJNTG9va0F0QXBwbGllcn0gb2YgdGhlIExvb2tBdC5cbiAgICovXG4gIHB1YmxpYyBhcHBsaWVyOiBWUk1Mb29rQXRBcHBsaWVyO1xuXG4gIC8qKlxuICAgKiBJZiB0aGlzIGlzIHRydWUsIHRoZSBMb29rQXQgd2lsbCBiZSB1cGRhdGVkIGF1dG9tYXRpY2FsbHkgYnkgY2FsbGluZyB7QGxpbmsgdXBkYXRlfSwgdG93YXJkaW5nIHRoZSBkaXJlY3Rpb24gdG8gdGhlIHtAbGluayB0YXJnZXR9LlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayB0YXJnZXR9XG4gICAqL1xuICBwdWJsaWMgYXV0b1VwZGF0ZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgb2JqZWN0IG9mIHRoZSBMb29rQXQuXG4gICAqIE5vdGUgdGhhdCBpdCBkb2VzIG5vdCBtYWtlIGFueSBzZW5zZSBpZiB7QGxpbmsgYXV0b1VwZGF0ZX0gaXMgZGlzYWJsZWQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgYXV0b1VwZGF0ZX1cbiAgICovXG4gIHB1YmxpYyB0YXJnZXQ/OiBUSFJFRS5PYmplY3QzRCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBmcm9udCBkaXJlY3Rpb24gb2YgdGhlIGZhY2UuXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgZm9yIFZSTSAwLjAgY29tcGF0IChWUk0gMC4wIG1vZGVscyBhcmUgZmFjaW5nIFotIGluc3RlYWQgb2YgWispLlxuICAgKiBZb3UgdXN1YWxseSBkb24ndCB3YW50IHRvIHRvdWNoIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZmFjZUZyb250ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHByb3RlY3RlZCBfeWF3OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgeWF3KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3lhdztcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgc2V0IHlhdyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5feWF3ID0gdmFsdWU7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHByb3RlY3RlZCBfcGl0Y2g6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIGdldCBwaXRjaCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9waXRjaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgc2V0IHBpdGNoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9waXRjaCA9IHZhbHVlO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhhdCBhbmdsZXMgbmVlZCB0byBiZSBhcHBsaWVkIHRvIGl0cyBbQGxpbmsgYXBwbGllcl0uXG4gICAqL1xuICBwcm90ZWN0ZWQgX25lZWRzVXBkYXRlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXb3JsZCByb3RhdGlvbiBvZiB0aGUgaGVhZCBpbiBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdEhlYWRXb3JsZFF1YXRlcm5pb246IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgZ2V0RXVsZXJ9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGV1bGVyKCk6IFRIUkVFLkV1bGVyIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdDogZXVsZXIgaXMgZGVwcmVjYXRlZC4gdXNlIGdldEV1bGVyKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldEV1bGVyKG5ldyBUSFJFRS5FdWxlcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdH0uXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIGFwcGxpZXIgQSB7QGxpbmsgVlJNTG9va0F0QXBwbGllcn1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihodW1hbm9pZDogVlJNSHVtYW5vaWQsIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXIpIHtcbiAgICB0aGlzLmh1bWFub2lkID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5hcHBsaWVyID0gYXBwbGllcjtcblxuICAgIHRoaXMuX3lhdyA9IDAuMDtcbiAgICB0aGlzLl9waXRjaCA9IDAuMDtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICB0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbiA9IHRoaXMuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgeWF3LXBpdGNoIGFuZ2xlcyBhcyBhbiBgRXVsZXJgLlxuICAgKiBEb2VzIE5PVCBjb25zaWRlciB7QGxpbmsgZmFjZUZyb250fTsgaXQgcmV0dXJucyBgRXVsZXIoMCwgMCwgMDsgXCJZWFpcIilgIGJ5IGRlZmF1bHQgcmVnYXJkbGVzcyBvZiB0aGUgZmFjZUZyb250IHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgZXVsZXJcbiAgICovXG4gIHB1YmxpYyBnZXRFdWxlcih0YXJnZXQ6IFRIUkVFLkV1bGVyKTogVEhSRUUuRXVsZXIge1xuICAgIHJldHVybiB0YXJnZXQuc2V0KFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5fcGl0Y2gsIFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5feWF3LCAwLjAsICdZWFonKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNTG9va0F0fSBpbnRvIHRoaXMgb25lLlxuICAgKiB7QGxpbmsgaHVtYW5vaWR9IG11c3QgYmUgc2FtZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICoge0BsaW5rIGFwcGxpZXJ9IHdpbGwgcmVmZXJlbmNlIHRoZSBzYW1lIGluc3RhbmNlIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNTG9va0F0fSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNTG9va0F0KTogdGhpcyB7XG4gICAgaWYgKHRoaXMuaHVtYW5vaWQgIT09IHNvdXJjZS5odW1hbm9pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Mb29rQXQ6IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUuY29weShzb3VyY2Uub2Zmc2V0RnJvbUhlYWRCb25lKTtcbiAgICB0aGlzLmFwcGxpZXIgPSBzb3VyY2UuYXBwbGllcjtcbiAgICB0aGlzLmF1dG9VcGRhdGUgPSBzb3VyY2UuYXV0b1VwZGF0ZTtcbiAgICB0aGlzLnRhcmdldCA9IHNvdXJjZS50YXJnZXQ7XG4gICAgdGhpcy5mYWNlRnJvbnQuY29weShzb3VyY2UuZmFjZUZyb250KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1Mb29rQXR9LlxuICAgKiBOb3RlIHRoYXQge0BsaW5rIGh1bWFub2lkfSBhbmQge0BsaW5rIGFwcGxpZXJ9IHdpbGwgcmVmZXJlbmNlIHRoZSBzYW1lIGluc3RhbmNlIGFzIHRoaXMgb25lLlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUxvb2tBdH1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1Mb29rQXQge1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0KHRoaXMuaHVtYW5vaWQsIHRoaXMuYXBwbGllcikuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgbG9va0F0IGRpcmVjdGlvbiAoeWF3IGFuZCBwaXRjaCkgdG8gdGhlIGluaXRpYWwgZGlyZWN0aW9uLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3lhdyA9IDAuMDtcbiAgICB0aGlzLl9waXRjaCA9IDAuMDtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBsb29rQXQgcG9zaXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuVmVjdG9yM2BcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZFBvc2l0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIGNvbnN0IGhlYWQgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykhO1xuXG4gICAgcmV0dXJuIHRhcmdldC5jb3B5KHRoaXMub2Zmc2V0RnJvbUhlYWRCb25lKS5hcHBseU1hdHJpeDQoaGVhZC5tYXRyaXhXb3JsZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBsb29rQXQgcm90YXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICogRG9lcyBOT1QgY29uc2lkZXIge0BsaW5rIGZhY2VGcm9udH0uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGNvbnN0IGhlYWQgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykhO1xuXG4gICAgcmV0dXJuIGdldFdvcmxkUXVhdGVybmlvbkxpdGUoaGVhZCwgdGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgK1ogdW5pdCB2ZWN0b3Igb2YgdGhlIGh1bWFub2lkIEhlYWQgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHB1YmxpYyBnZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGlmICh0aGlzLmZhY2VGcm9udC5kaXN0YW5jZVRvU3F1YXJlZChWRUMzX1BPU0lUSVZFX1opIDwgMC4wMSkge1xuICAgICAgcmV0dXJuIHRhcmdldC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKS5pbnZlcnQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpLnByZW11bHRpcGx5KF9xdWF0RC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKS5pbnZlcnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBMb29rQXQgZGlyZWN0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGREaXJlY3Rpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRCKTtcbiAgICB0aGlzLmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRDKTtcblxuICAgIHJldHVybiB0YXJnZXRcbiAgICAgIC5jb3B5KFZFQzNfUE9TSVRJVkVfWilcbiAgICAgIC5hcHBseVF1YXRlcm5pb24oX3F1YXRCKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihfcXVhdEMpXG4gICAgICAuYXBwbHlFdWxlcih0aGlzLmdldEV1bGVyKF9ldWxlckEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaXRzIGxvb2tBdCB0YXJnZXQgcG9zaXRpb24uXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpdHMgcmVzdWx0IHdpbGwgYmUgaW5zdGFudGx5IG92ZXJ3cml0dGVuIGlmIHtAbGluayBWUk1Mb29rQXRIZWFkLmF1dG9VcGRhdGV9IGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIElmIHlvdSB3YW50IHRvIHRyYWNrIGFuIG9iamVjdCBjb250aW51b3VzbHksIHlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgdGFyZ2V0fSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zaXRpb24gQSB0YXJnZXQgcG9zaXRpb24sIGluIHdvcmxkIHNwYWNlXG4gICAqL1xuICBwdWJsaWMgbG9va0F0KHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgLy8gTG9vayBhdCBkaXJlY3Rpb24gaW4gbG9jYWwgY29vcmRpbmF0ZVxuICAgIGNvbnN0IGhlYWRSb3REaWZmSW52ID0gX3F1YXRBXG4gICAgICAuY29weSh0aGlzLl9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbilcbiAgICAgIC5tdWx0aXBseShxdWF0SW52ZXJ0Q29tcGF0KHRoaXMuZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKF9xdWF0QikpKTtcbiAgICBjb25zdCBoZWFkUG9zID0gdGhpcy5nZXRMb29rQXRXb3JsZFBvc2l0aW9uKF92M0IpO1xuICAgIGNvbnN0IGxvb2tBdERpciA9IF92M0MuY29weShwb3NpdGlvbikuc3ViKGhlYWRQb3MpLmFwcGx5UXVhdGVybmlvbihoZWFkUm90RGlmZkludikubm9ybWFsaXplKCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgYW5nbGVzXG4gICAgY29uc3QgW2F6aW11dGhGcm9tLCBhbHRpdHVkZUZyb21dID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgY29uc3QgW2F6aW11dGhUbywgYWx0aXR1ZGVUb10gPSBjYWxjQXppbXV0aEFsdGl0dWRlKGxvb2tBdERpcik7XG4gICAgY29uc3QgeWF3ID0gc2FuaXRpemVBbmdsZShhemltdXRoVG8gLSBhemltdXRoRnJvbSk7XG4gICAgY29uc3QgcGl0Y2ggPSBzYW5pdGl6ZUFuZ2xlKGFsdGl0dWRlRnJvbSAtIGFsdGl0dWRlVG8pOyAvLyBzcGlubmluZyAoMSwgMCwgMCkgQ0NXIGFyb3VuZCBaIGF4aXMgbWFrZXMgdGhlIHZlY3RvciBsb29rIHVwLCB3aGlsZSBzcGlubmluZyAoMCwgMCwgMSkgQ0NXIGFyb3VuZCBYIGF4aXMgbWFrZXMgdGhlIHZlY3RvciBsb29rIGRvd25cblxuICAgIC8vIGFwcGx5IGFuZ2xlc1xuICAgIHRoaXMuX3lhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogeWF3O1xuICAgIHRoaXMuX3BpdGNoID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBwaXRjaDtcblxuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIFZSTUxvb2tBdEhlYWQuXG4gICAqIElmIHtAbGluayBhdXRvVXBkYXRlfSBpcyBlbmFibGVkLCB0aGlzIHdpbGwgbWFrZSBpdCBsb29rIGF0IHRoZSB7QGxpbmsgdGFyZ2V0fS5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZSwgaXQgaXNuJ3QgdXNlZCB0aG91Z2guIFlvdSBjYW4gdXNlIHRoZSBwYXJhbWV0ZXIgaWYgeW91IHdhbnQgdG8gdXNlIHRoaXMgaW4geW91ciBvd24gZXh0ZW5kZWQge0BsaW5rIFZSTUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YXJnZXQgIT0gbnVsbCAmJiB0aGlzLmF1dG9VcGRhdGUpIHtcbiAgICAgIHRoaXMubG9va0F0KHRoaXMudGFyZ2V0LmdldFdvcmxkUG9zaXRpb24oX3YzQSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9uZWVkc1VwZGF0ZSkge1xuICAgICAgdGhpcy5fbmVlZHNVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hcHBsaWVyLmFwcGx5WWF3UGl0Y2godGhpcy5feWF3LCB0aGlzLl9waXRjaCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRSYW5nZU1hcCB9IGZyb20gJy4vVlJNTG9va0F0UmFuZ2VNYXAnO1xuaW1wb3J0IHsgY2FsY0F6aW11dGhBbHRpdHVkZSB9IGZyb20gJy4vdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZSc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSc7XG5cbmNvbnN0IFZFQzNfUE9TSVRJVkVfWiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9ldWxlckEgPSBuZXcgVEhSRUUuRXVsZXIoMC4wLCAwLjAsIDAuMCwgJ1lYWicpO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhcHBsaWVzIGV5ZSBnYXplIGRpcmVjdGlvbnMgdG8gYSBWUk0uXG4gKiBJdCB3aWxsIGJlIHVzZWQgYnkge0BsaW5rIFZSTUxvb2tBdH0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRCb25lQXBwbGllciBpbXBsZW1lbnRzIFZSTUxvb2tBdEFwcGxpZXIge1xuICAvKipcbiAgICogUmVwcmVzZW50IGl0cyB0eXBlIG9mIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnYm9uZSc7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1IdW1hbm9pZH0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIGhvcml6b250YWwgaW53YXJkIG1vdmVtZW50LiBUaGUgbGVmdCBleWUgbW92ZXMgcmlnaHQuIFRoZSByaWdodCBleWUgbW92ZXMgbGVmdC5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBvdXR3YXJkIG1vdmVtZW50LiBUaGUgbGVmdCBleWUgbW92ZXMgbGVmdC4gVGhlIHJpZ2h0IGV5ZSBtb3ZlcyByaWdodC5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgZG93bndhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIHVwd2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIHVwd2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgZG93bndhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIFRoZSBmcm9udCBkaXJlY3Rpb24gb2YgdGhlIGZhY2UuXG4gICAqIEludGVuZGVkIHRvIGJlIHVzZWQgZm9yIFZSTSAwLjAgY29tcGF0IChWUk0gMC4wIG1vZGVscyBhcmUgZmFjaW5nIFotIGluc3RlYWQgb2YgWispLlxuICAgKiBZb3UgdXN1YWxseSBkb24ndCB3YW50IHRvIHRvdWNoIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZmFjZUZyb250OiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIExlZnRFeWUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RRdWF0TGVmdEV5ZTogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHJlc3QgcXVhdGVybmlvbiBvZiBSaWdodEV5ZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFF1YXRSaWdodEV5ZTogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHdvcmxkLXNwYWNlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBodW1hbm9pZCBMZWZ0RXllLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIFRoZSB3b3JsZC1zcGFjZSByZXN0IHF1YXRlcm5pb24gb2YgdGhlIHBhcmVudCBvZiB0aGUgaHVtYW5vaWQgUmlnaHRFeWUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQ6IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0Qm9uZUFwcGxpZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9XG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxJbm5lciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgaW5uZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBvdXRlciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbERvd24gQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsVXAgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICApIHtcbiAgICB0aGlzLmh1bWFub2lkID0gaHVtYW5vaWQ7XG5cbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyID0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI7XG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlciA9IHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24gPSByYW5nZU1hcFZlcnRpY2FsRG93bjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxVcCA9IHJhbmdlTWFwVmVydGljYWxVcDtcblxuICAgIHRoaXMuZmFjZUZyb250ID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbiAgICAvLyBzZXQgcmVzdCBxdWF0ZXJuaW9uc1xuICAgIHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdFF1YXRSaWdodEV5ZSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgIHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICBjb25zdCBsZWZ0RXllID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgncmlnaHRFeWUnKTtcblxuICAgIGlmIChsZWZ0RXllKSB7XG4gICAgICB0aGlzLl9yZXN0UXVhdExlZnRFeWUuY29weShsZWZ0RXllLnF1YXRlcm5pb24pO1xuICAgICAgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShsZWZ0RXllLnBhcmVudCEsIHRoaXMuX3Jlc3RMZWZ0RXllUGFyZW50V29ybGRRdWF0KTtcbiAgICB9XG5cbiAgICBpZiAocmlnaHRFeWUpIHtcbiAgICAgIHRoaXMuX3Jlc3RRdWF0UmlnaHRFeWUuY29weShyaWdodEV5ZS5xdWF0ZXJuaW9uKTtcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUocmlnaHRFeWUucGFyZW50ISwgdGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIGlucHV0IGFuZ2xlIHRvIGl0cyBhc3NvY2lhdGVkIFZSTSBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHlhdyBSb3RhdGlvbiBhcm91bmQgWSBheGlzLCBpbiBkZWdyZWVcbiAgICogQHBhcmFtIHBpdGNoIFJvdGF0aW9uIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZVxuICAgKi9cbiAgcHVibGljIGFwcGx5WWF3UGl0Y2goeWF3OiBudW1iZXIsIHBpdGNoOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsZWZ0RXllID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllID0gdGhpcy5odW1hbm9pZC5nZXRSYXdCb25lTm9kZSgncmlnaHRFeWUnKTtcbiAgICBjb25zdCBsZWZ0RXllTm9ybWFsaXplZCA9IHRoaXMuaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWVOb3JtYWxpemVkID0gdGhpcy5odW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG4gICAgLy8gbGVmdFxuICAgIGlmIChsZWZ0RXllKSB7XG4gICAgICBpZiAocGl0Y2ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS54ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93bi5tYXAoLXBpdGNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueCA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKHBpdGNoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnkgPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLm1hcCgteWF3KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlckEueSA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoeWF3KTtcbiAgICAgIH1cblxuICAgICAgX3F1YXRBLnNldEZyb21FdWxlcihfZXVsZXJBKTtcbiAgICAgIHRoaXMuX2dldFdvcmxkRmFjZUZyb250UXVhdChfcXVhdEIpO1xuXG4gICAgICAvLyBfcXVhdEIgKiBfcXVhdEEgKiBfcXVhdEJeLTFcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyBMb29rQXQgcm90YXRpb25cbiAgICAgIC8vIGFuZCBfcXVhdEIgaXMgd29ybGRGYWNlRnJvbnRRdWF0XG4gICAgICBsZWZ0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbi5jb3B5KF9xdWF0QikubXVsdGlwbHkoX3F1YXRBKS5tdWx0aXBseShfcXVhdEIuaW52ZXJ0KCkpO1xuXG4gICAgICBfcXVhdEEuY29weSh0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCk7XG5cbiAgICAgIC8vIF9xdWF0QV4tMSAqIGxlZnRFeWVOb3JtYWxpemVkLnF1YXRlcm5pb24gKiBfcXVhdEEgKiByZXN0UXVhdExlZnRFeWVcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyByZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdFxuICAgICAgbGVmdEV5ZS5xdWF0ZXJuaW9uXG4gICAgICAgIC5jb3B5KGxlZnRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uKVxuICAgICAgICAubXVsdGlwbHkoX3F1YXRBKVxuICAgICAgICAucHJlbXVsdGlwbHkoX3F1YXRBLmludmVydCgpKVxuICAgICAgICAubXVsdGlwbHkodGhpcy5fcmVzdFF1YXRMZWZ0RXllKTtcbiAgICB9XG5cbiAgICAvLyByaWdodFxuICAgIGlmIChyaWdodEV5ZSkge1xuICAgICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueCA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKC1waXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcChwaXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS55ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoLXlhdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnkgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIubWFwKHlhdyk7XG4gICAgICB9XG5cbiAgICAgIF9xdWF0QS5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gICAgICB0aGlzLl9nZXRXb3JsZEZhY2VGcm9udFF1YXQoX3F1YXRCKTtcblxuICAgICAgLy8gX3F1YXRCICogX3F1YXRBICogX3F1YXRCXi0xXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgTG9va0F0IHJvdGF0aW9uXG4gICAgICAvLyBhbmQgX3F1YXRCIGlzIHdvcmxkRmFjZUZyb250UXVhdFxuICAgICAgcmlnaHRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRCKS5tdWx0aXBseShfcXVhdEEpLm11bHRpcGx5KF9xdWF0Qi5pbnZlcnQoKSk7XG5cbiAgICAgIF9xdWF0QS5jb3B5KHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCk7XG5cbiAgICAgIC8vIF9xdWF0QV4tMSAqIHJpZ2h0RXllTm9ybWFsaXplZC5xdWF0ZXJuaW9uICogX3F1YXRBICogcmVzdFF1YXRSaWdodEV5ZVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIHJlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdFxuICAgICAgcmlnaHRFeWUucXVhdGVybmlvblxuICAgICAgICAuY29weShyaWdodEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24pXG4gICAgICAgIC5tdWx0aXBseShfcXVhdEEpXG4gICAgICAgIC5wcmVtdWx0aXBseShfcXVhdEEuaW52ZXJ0KCkpXG4gICAgICAgIC5tdWx0aXBseSh0aGlzLl9yZXN0UXVhdFJpZ2h0RXllKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhcHBseVlhd1BpdGNofSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdEJvbmVBcHBsaWVyOiBsb29rQXQoKSBpcyBkZXByZWNhdGVkLiB1c2UgYXBwbHkoKSBpbnN0ZWFkLicpO1xuXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci55O1xuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci54O1xuXG4gICAgdGhpcy5hcHBseVlhd1BpdGNoKHlhdywgcGl0Y2gpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHF1YXRlcm5pb24gdGhhdCByb3RhdGVzIHRoZSB3b3JsZC1zcGFjZSArWiB1bml0IHZlY3RvciB0byB0aGUge0BsaW5rIGZhY2VGcm9udH0gZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5RdWF0ZXJuaW9uYFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0V29ybGRGYWNlRnJvbnRRdWF0KHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGlmICh0aGlzLmZhY2VGcm9udC5kaXN0YW5jZVRvU3F1YXJlZChWRUMzX1BPU0lUSVZFX1opIDwgMC4wMSkge1xuICAgICAgcmV0dXJuIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIGNvbnN0IFtmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZV0gPSBjYWxjQXppbXV0aEFsdGl0dWRlKHRoaXMuZmFjZUZyb250KTtcbiAgICBfZXVsZXJBLnNldCgwLjAsIDAuNSAqIE1hdGguUEkgKyBmYWNlRnJvbnRBemltdXRoLCBmYWNlRnJvbnRBbHRpdHVkZSwgJ1laWCcpO1xuXG4gICAgcmV0dXJuIHRhcmdldC5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdleHByZXNzaW9uJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIEl0IHdvbid0IGJlIHVzZWQgaW4gZXhwcmVzc2lvbiBhcHBsaWVyLlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyfVxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBsZWZ0IG9yIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9ucyBBIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBleHByZXNzaW9ucztcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAoLXBpdGNoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tVcCcsIDAuMCk7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rRG93bicsIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKHBpdGNoKSk7XG4gICAgfVxuXG4gICAgaWYgKHlhdyA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoLXlhdykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rUmlnaHQnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0xlZnQnLCB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLm1hcCh5YXcpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBhcHBseVlhd1BpdGNofSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdEJvbmVBcHBsaWVyOiBsb29rQXQoKSBpcyBkZXByZWNhdGVkLiB1c2UgYXBwbHkoKSBpbnN0ZWFkLicpO1xuXG4gICAgY29uc3QgeWF3ID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci55O1xuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLlJBRDJERUcgKiBldWxlci54O1xuXG4gICAgdGhpcy5hcHBseVlhd1BpdGNoKHlhdywgcGl0Y2gpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL3NhdHVyYXRlJztcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdFJhbmdlTWFwIHtcbiAgLyoqXG4gICAqIExpbWl0cyB0aGUgbWF4aW11bSBhbmdsZSBvZiB0aGUgaW5wdXQgYW5nbGUgb2YgdGhlIExvb2tBdCB2ZWN0b3IgZnJvbSB0aGUgZnJvbnQgb2YgdGhlIGhlYWQgKHRoZSBwb3NpdGl2ZSB6IGF4aXMpLlxuICAgKi9cbiAgcHVibGljIGlucHV0TWF4VmFsdWU6IG51bWJlcjtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbiBhbmdsZSAoaW4gZGVncmVlcykgZm9yIGJvbmUgdHlwZSBvZiBMb29rQXQgYXBwbGllcnMsIG9yIGEgd2VpZ2h0IGZvciBleHByZXNzaW9uIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLlxuICAgKiBUaGUgaW5wdXQgdmFsdWUgd2lsbCB0YWtlIGAxLjBgIHdoZW4gdGhlIGlucHV0IGFuZ2xlIGVxdWFscyAob3IgZ3JlYXRlcikgdG8ge0BsaW5rIGlucHV0TWF4VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIG91dHB1dFNjYWxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9LlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXRNYXhWYWx1ZSBUaGUge0BsaW5rIGlucHV0TWF4VmFsdWV9IG9mIHRoZSBtYXBcbiAgICogQHBhcmFtIG91dHB1dFNjYWxlIFRoZSB7QGxpbmsgb3V0cHV0U2NhbGV9IG9mIHRoZSBtYXBcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihpbnB1dE1heFZhbHVlOiBudW1iZXIsIG91dHB1dFNjYWxlOiBudW1iZXIpIHtcbiAgICB0aGlzLmlucHV0TWF4VmFsdWUgPSBpbnB1dE1heFZhbHVlO1xuICAgIHRoaXMub3V0cHV0U2NhbGUgPSBvdXRwdXRTY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBpbnB1dCB2YWx1ZSBhbmQgb3V0cHV0IGEgbWFwcGVkIHZhbHVlLlxuICAgKiBAcGFyYW0gc3JjIFRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIG1hcChzcmM6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3V0cHV0U2NhbGUgKiBzYXR1cmF0ZShzcmMgLyB0aGlzLmlucHV0TWF4VmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfSBmcm9tICcuLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL1ZSTUxvb2tBdEhlbHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL1ZSTUxvb2tBdCc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0Qm9uZUFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEJvbmVBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllcic7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTG9va0F0UmFuZ2VNYXAgfSBmcm9tICcuL1ZSTUxvb2tBdFJhbmdlTWFwJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIFRoZSBtaW5pbXVtIHBlcm1pdHRlZCB2YWx1ZSBmb3Ige0BsaW5rIFYxVlJNU2NoZW1hLkxvb2tBdFJhbmdlTWFwLmlucHV0TWF4VmFsdWV9LlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIHNtYWxsZXIgdGhhbiB0aGlzLCB0aGUgbG9hZGVyIHNob3dzIGEgd2FybmluZyBhbmQgY2xhbXBzIHVwIHRoZSB2YWx1ZS5cbiAqL1xuY29uc3QgSU5QVVRfTUFYX1ZBTFVFX01JTklNVU0gPSAwLjAxO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0TG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNTG9va0F0SGVscGVyfSBzLlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIGhlbHBlcnMgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUxvb2tBdExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB2cm1IdW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBleHBsaWNpdGx5IGRpc3Rpbmd1aXNoIG51bGwgYW5kIHVuZGVmaW5lZFxuICAgIC8vIHNpbmNlIHZybUh1bWFub2lkIG1pZ2h0IGJlIG51bGwgYXMgYSByZXN1bHRcbiAgICBpZiAodnJtSHVtYW5vaWQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUh1bWFub2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNTG9va0F0TG9hZGVyUGx1Z2luOiB2cm1IdW1hbm9pZCBpcyB1bmRlZmluZWQuIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHZybUV4cHJlc3Npb25NYW5hZ2VyID0gZ2x0Zi51c2VyRGF0YS52cm1FeHByZXNzaW9uTWFuYWdlciBhcyBWUk1FeHByZXNzaW9uTWFuYWdlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh2cm1FeHByZXNzaW9uTWFuYWdlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVlJNTG9va0F0TG9hZGVyUGx1Z2luOiB2cm1FeHByZXNzaW9uTWFuYWdlciBpcyB1bmRlZmluZWQuIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaGF2ZSB0byBiZSB1c2VkIGZpcnN0JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZ2x0Zi51c2VyRGF0YS52cm1Mb29rQXQgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0ZiwgdnJtSHVtYW5vaWQsIHZybUV4cHJlc3Npb25NYW5hZ2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNTG9va0F0fSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbnMgQSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsLFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlciB8IG51bGwsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGlmIChodW1hbm9pZCA9PSBudWxsIHx8IGV4cHJlc3Npb25zID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0ZiwgaHVtYW5vaWQsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChcbiAgICBnbHRmOiBHTFRGLFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIsXG4gICk6IFByb21pc2U8VlJNTG9va0F0IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTG9va0F0TG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTG9va0F0ID0gZXh0ZW5zaW9uLmxvb2tBdDtcbiAgICBpZiAoIXNjaGVtYUxvb2tBdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdE91dHB1dFNjYWxlID0gc2NoZW1hTG9va0F0LnR5cGUgPT09ICdleHByZXNzaW9uJyA/IDEuMCA6IDEwLjA7XG5cbiAgICBjb25zdCBtYXBISSA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcEhPID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVkQgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsRG93biwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWVSA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwVmVydGljYWxVcCwgZGVmYXVsdE91dHB1dFNjYWxlKTtcblxuICAgIGxldCBhcHBsaWVyO1xuXG4gICAgaWYgKHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicpIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIoZXhwcmVzc2lvbnMsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRCb25lQXBwbGllcihodW1hbm9pZCwgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2tBdCA9IHRoaXMuX2ltcG9ydExvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLmZyb21BcnJheShzY2hlbWFMb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lID8/IFswLjAsIDAuMDYsIDAuMF0pO1xuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxuXG4gIHByaXZhdGUgX3YxSW1wb3J0UmFuZ2VNYXAoXG4gICAgc2NoZW1hUmFuZ2VNYXA6IFYxVlJNU2NoZW1hLkxvb2tBdFJhbmdlTWFwIHwgdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRPdXRwdXRTY2FsZTogbnVtYmVyLFxuICApOiBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gICAgbGV0IGlucHV0TWF4VmFsdWUgPSBzY2hlbWFSYW5nZU1hcD8uaW5wdXRNYXhWYWx1ZSA/PyA5MC4wO1xuICAgIGNvbnN0IG91dHB1dFNjYWxlID0gc2NoZW1hUmFuZ2VNYXA/Lm91dHB1dFNjYWxlID8/IGRlZmF1bHRPdXRwdXRTY2FsZTtcblxuICAgIC8vIEl0IG1pZ2h0IGNhdXNlIE5hTiB3aGVuIGBpbnB1dE1heFZhbHVlYCBpcyB0b28gc21hbGxcbiAgICAvLyB3aGljaCBtYWtlcyB0aGUgbWVzaCBvZiB0aGUgaGVhZCBkaXNhcHBlYXJcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9waXhpdi90aHJlZS12cm0vaXNzdWVzLzEyMDFcbiAgICBpZiAoaW5wdXRNYXhWYWx1ZSA8IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdWUk1Mb29rQXRMb2FkZXJQbHVnaW46IGlucHV0TWF4VmFsdWUgb2YgYSByYW5nZSBtYXAgaXMgdG9vIHNtYWxsLiBDb25zaWRlciByZXZpZXdpbmcgdGhlIHJhbmdlIG1hcCEnLFxuICAgICAgKTtcbiAgICAgIGlucHV0TWF4VmFsdWUgPSBJTlBVVF9NQVhfVkFMVUVfTUlOSU1VTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKGlucHV0TWF4VmFsdWUsIG91dHB1dFNjYWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcixcbiAgKTogUHJvbWlzZTxWUk1Mb29rQXQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb24gPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdE91dHB1dFNjYWxlID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUgPT09ICdCbGVuZFNoYXBlJyA/IDEuMCA6IDEwLjA7XG5cbiAgICBjb25zdCBtYXBISSA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxPdXRlciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWRCA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsRG93biwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBWVSA9IHRoaXMuX3YwSW1wb3J0RGVncmVlTWFwKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSA9PT0gJ0JsZW5kU2hhcGUnKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgaWYgKHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldCkge1xuICAgICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5zZXQoXG4gICAgICAgIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC54ID8/IDAuMCxcbiAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnkgPz8gMC4wNixcbiAgICAgICAgLShzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueiA/PyAwLjApLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5zZXQoMC4wLCAwLjA2LCAwLjApO1xuICAgIH1cblxuICAgIC8vIFZSTSAwLjAgYXJlIGZhY2luZyBaLSBpbnN0ZWFkIG9mIForXG4gICAgbG9va0F0LmZhY2VGcm9udC5zZXQoMC4wLCAwLjAsIC0xLjApO1xuXG4gICAgaWYgKGFwcGxpZXIgaW5zdGFuY2VvZiBWUk1Mb29rQXRCb25lQXBwbGllcikge1xuICAgICAgYXBwbGllci5mYWNlRnJvbnQuc2V0KDAuMCwgMC4wLCAtMS4wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9va0F0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdjBJbXBvcnREZWdyZWVNYXAoXG4gICAgc2NoZW1hRGVncmVlTWFwOiBWMFZSTS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIGNvbnN0IGN1cnZlID0gc2NoZW1hRGVncmVlTWFwPy5jdXJ2ZTtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkoY3VydmUpICE9PSAnWzAsMCwwLDEsMSwxLDEsMF0nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0N1cnZlcyBvZiBMb29rQXREZWdyZWVNYXAgZGVmaW5lZCBpbiBWUk0gMC4wIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuXG4gICAgbGV0IHhSYW5nZSA9IHNjaGVtYURlZ3JlZU1hcD8ueFJhbmdlID8/IDkwLjA7XG4gICAgY29uc3QgeVJhbmdlID0gc2NoZW1hRGVncmVlTWFwPy55UmFuZ2UgPz8gZGVmYXVsdE91dHB1dFNjYWxlO1xuXG4gICAgLy8gSXQgbWlnaHQgY2F1c2UgTmFOIHdoZW4gYHhSYW5nZWAgaXMgdG9vIHNtYWxsXG4gICAgLy8gd2hpY2ggbWFrZXMgdGhlIG1lc2ggb2YgdGhlIGhlYWQgZGlzYXBwZWFyXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vcGl4aXYvdGhyZWUtdnJtL2lzc3Vlcy8xMjAxXG4gICAgaWYgKHhSYW5nZSA8IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogeFJhbmdlIG9mIGEgZGVncmVlIG1hcCBpcyB0b28gc21hbGwuIENvbnNpZGVyIHJldmlld2luZyB0aGUgZGVncmVlIG1hcCEnKTtcbiAgICAgIHhSYW5nZSA9IElOUFVUX01BWF9WQUxVRV9NSU5JTVVNO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVlJNTG9va0F0UmFuZ2VNYXAoeFJhbmdlLCB5UmFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0TG9va0F0KGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcik6IFZSTUxvb2tBdCB7XG4gICAgY29uc3QgbG9va0F0ID0gbmV3IFZSTUxvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBpZiAodGhpcy5oZWxwZXJSb290KSB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVlJNTG9va0F0SGVscGVyKGxvb2tBdCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb2tBdDtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHR5cGUgb2YgYXBwbGllci5cbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUxvb2tBdFR5cGVOYW1lID0ge1xuICBCb25lOiAnYm9uZScsXG4gIEV4cHJlc3Npb246ICdleHByZXNzaW9uJyxcbn07XG5cbmV4cG9ydCB0eXBlIFZSTUxvb2tBdFR5cGVOYW1lID0gdHlwZW9mIFZSTUxvb2tBdFR5cGVOYW1lW2tleW9mIHR5cGVvZiBWUk1Mb29rQXRUeXBlTmFtZV07XG4iLCIvKipcbiAqIFlvaW5rZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIEludmFsaWQgVVJMXG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJyB8fCB1cmwgPT09ICcnKSByZXR1cm4gJyc7XG5cbiAgLy8gSG9zdCBSZWxhdGl2ZSBVUkxcbiAgaWYgKC9eaHR0cHM/OlxcL1xcLy9pLnRlc3QocGF0aCkgJiYgL15cXC8vLnRlc3QodXJsKSkge1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoLyheaHR0cHM/OlxcL1xcL1teL10rKS4qL2ksICckMScpO1xuICB9XG5cbiAgLy8gQWJzb2x1dGUgVVJMIGh0dHA6Ly8saHR0cHM6Ly8sLy9cbiAgaWYgKC9eKGh0dHBzPzopP1xcL1xcLy9pLnRlc3QodXJsKSkgcmV0dXJuIHVybDtcblxuICAvLyBEYXRhIFVSSVxuICBpZiAoL15kYXRhOi4qLC4qJC9pLnRlc3QodXJsKSkgcmV0dXJuIHVybDtcblxuICAvLyBCbG9iIFVSTFxuICBpZiAoL15ibG9iOi4qJC9pLnRlc3QodXJsKSkgcmV0dXJuIHVybDtcblxuICAvLyBSZWxhdGl2ZSBVUkxcbiAgcmV0dXJuIHBhdGggKyB1cmw7XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB0eXBlIHsgVlJNME1ldGEgfSBmcm9tICcuL1ZSTTBNZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNMU1ldGEgfSBmcm9tICcuL1ZSTTFNZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YSB9IGZyb20gJy4vVlJNTWV0YSc7XG5pbXBvcnQgdHlwZSB7IFZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1NZXRhTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyByZXNvbHZlVVJMIH0gZnJvbSAnLi4vdXRpbHMvcmVzb2x2ZVVSTCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk0xTWV0YX0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTWV0YUxvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIC8qKlxuICAgKiBJZiBgZmFsc2VgLCBpdCB3b24ndCBsb2FkIGl0cyB0aHVtYm5haWwgaW1hZ2UgKHtAbGluayBWUk0xTWV0YS50aHVtYm5haWxJbWFnZX0pLlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBuZWVkVGh1bWJuYWlsSW1hZ2U6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBsaWNlbnNlIHVybHMuXG4gICAqIFRoaXMgbWV0YSBsb2FkZXIgd2lsbCBhY2NlcHQgdGhlc2UgYGxpY2Vuc2VVcmxgcy5cbiAgICogT3RoZXJ3aXNlIGl0IHdvbid0IGJlIGxvYWRlZC5cbiAgICovXG4gIHB1YmxpYyBhY2NlcHRMaWNlbnNlVXJsczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgc2hvdWxkIGFjY2VwdCBWUk0wLjAgbWV0YSBvciBub3QuXG4gICAqIE5vdGUgdGhhdCBpdCBtaWdodCBsb2FkIHtAbGluayBWUk0wTWV0YX0gaW5zdGVhZCBvZiB7QGxpbmsgVlJNMU1ldGF9IHdoZW4gdGhpcyBpcyBgdHJ1ZWAuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGFjY2VwdFYwTWV0YTogYm9vbGVhbjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTWV0YUxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyLCBvcHRpb25zPzogVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMubmVlZFRodW1ibmFpbEltYWdlID0gb3B0aW9ucz8ubmVlZFRodW1ibmFpbEltYWdlID8/IHRydWU7XG4gICAgdGhpcy5hY2NlcHRMaWNlbnNlVXJscyA9IG9wdGlvbnM/LmFjY2VwdExpY2Vuc2VVcmxzID8/IFsnaHR0cHM6Ly92cm0uZGV2L2xpY2Vuc2VzLzEuMC8nXTtcbiAgICB0aGlzLmFjY2VwdFYwTWV0YSA9IG9wdGlvbnM/LmFjY2VwdFYwTWV0YSA/PyB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1NZXRhID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTU1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYxUmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHYwUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjBJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYwUmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTTFNZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTU1ldGFMb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFNZXRhID0gZXh0ZW5zaW9uLm1ldGE7XG4gICAgaWYgKCFzY2hlbWFNZXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiBhY2NlcHRWME1ldGEgaXMgZmFsc2VcbiAgICBjb25zdCBsaWNlbnNlVXJsID0gc2NoZW1hTWV0YS5saWNlbnNlVXJsO1xuICAgIGNvbnN0IGFjY2VwdExpY2Vuc2VVcmxzU2V0ID0gbmV3IFNldCh0aGlzLmFjY2VwdExpY2Vuc2VVcmxzKTtcbiAgICBpZiAoIWFjY2VwdExpY2Vuc2VVcmxzU2V0LmhhcyhsaWNlbnNlVXJsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBUaGUgbGljZW5zZSB1cmwgXCIke2xpY2Vuc2VVcmx9XCIgaXMgbm90IGFjY2VwdGVkYCk7XG4gICAgfVxuXG4gICAgbGV0IHRodW1ibmFpbEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLm5lZWRUaHVtYm5haWxJbWFnZSAmJiBzY2hlbWFNZXRhLnRodW1ibmFpbEltYWdlICE9IG51bGwpIHtcbiAgICAgIHRodW1ibmFpbEltYWdlID0gKGF3YWl0IHRoaXMuX2V4dHJhY3RHTFRGSW1hZ2Uoc2NoZW1hTWV0YS50aHVtYm5haWxJbWFnZSkpID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWV0YVZlcnNpb246ICcxJyxcbiAgICAgIG5hbWU6IHNjaGVtYU1ldGEubmFtZSxcbiAgICAgIHZlcnNpb246IHNjaGVtYU1ldGEudmVyc2lvbixcbiAgICAgIGF1dGhvcnM6IHNjaGVtYU1ldGEuYXV0aG9ycyxcbiAgICAgIGNvcHlyaWdodEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvcHlyaWdodEluZm9ybWF0aW9uLFxuICAgICAgY29udGFjdEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvbnRhY3RJbmZvcm1hdGlvbixcbiAgICAgIHJlZmVyZW5jZXM6IHNjaGVtYU1ldGEucmVmZXJlbmNlcyxcbiAgICAgIHRoaXJkUGFydHlMaWNlbnNlczogc2NoZW1hTWV0YS50aGlyZFBhcnR5TGljZW5zZXMsXG4gICAgICB0aHVtYm5haWxJbWFnZSxcbiAgICAgIGxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEubGljZW5zZVVybCxcbiAgICAgIGF2YXRhclBlcm1pc3Npb246IHNjaGVtYU1ldGEuYXZhdGFyUGVybWlzc2lvbixcbiAgICAgIGFsbG93RXhjZXNzaXZlbHlWaW9sZW50VXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dFeGNlc3NpdmVseVZpb2xlbnRVc2FnZSxcbiAgICAgIGFsbG93RXhjZXNzaXZlbHlTZXh1YWxVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0V4Y2Vzc2l2ZWx5U2V4dWFsVXNhZ2UsXG4gICAgICBjb21tZXJjaWFsVXNhZ2U6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzYWdlLFxuICAgICAgYWxsb3dQb2xpdGljYWxPclJlbGlnaW91c1VzYWdlOiBzY2hlbWFNZXRhLmFsbG93UG9saXRpY2FsT3JSZWxpZ2lvdXNVc2FnZSxcbiAgICAgIGFsbG93QW50aXNvY2lhbE9ySGF0ZVVzYWdlOiBzY2hlbWFNZXRhLmFsbG93QW50aXNvY2lhbE9ySGF0ZVVzYWdlLFxuICAgICAgY3JlZGl0Tm90YXRpb246IHNjaGVtYU1ldGEuY3JlZGl0Tm90YXRpb24sXG4gICAgICBhbGxvd1JlZGlzdHJpYnV0aW9uOiBzY2hlbWFNZXRhLmFsbG93UmVkaXN0cmlidXRpb24sXG4gICAgICBtb2RpZmljYXRpb246IHNjaGVtYU1ldGEubW9kaWZpY2F0aW9uLFxuICAgICAgb3RoZXJMaWNlbnNlVXJsOiBzY2hlbWFNZXRhLm90aGVyTGljZW5zZVVybCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNME1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YSA9IHZybUV4dC5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gdGhyb3cgYW4gZXJyb3IgaWYgYWNjZXB0VjBNZXRhIGlzIGZhbHNlXG4gICAgaWYgKCF0aGlzLmFjY2VwdFYwTWV0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1NZXRhTG9hZGVyUGx1Z2luOiBBdHRlbXB0ZWQgdG8gbG9hZCBWUk0wLjAgbWV0YSBidXQgYWNjZXB0VjBNZXRhIGlzIGZhbHNlJyk7XG4gICAgfVxuXG4gICAgLy8gbG9hZCB0aHVtYm5haWwgdGV4dHVyZVxuICAgIGxldCB0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgJiYgc2NoZW1hTWV0YS50ZXh0dXJlICE9IG51bGwgJiYgc2NoZW1hTWV0YS50ZXh0dXJlICE9PSAtMSkge1xuICAgICAgdGV4dHVyZSA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ3RleHR1cmUnLCBzY2hlbWFNZXRhLnRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtZXRhVmVyc2lvbjogJzAnLFxuICAgICAgYWxsb3dlZFVzZXJOYW1lOiBzY2hlbWFNZXRhLmFsbG93ZWRVc2VyTmFtZSxcbiAgICAgIGF1dGhvcjogc2NoZW1hTWV0YS5hdXRob3IsXG4gICAgICBjb21tZXJjaWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5jb21tZXJjaWFsVXNzYWdlTmFtZSxcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICBsaWNlbnNlTmFtZTogc2NoZW1hTWV0YS5saWNlbnNlTmFtZSxcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgICBvdGhlclBlcm1pc3Npb25Vcmw6IHNjaGVtYU1ldGEub3RoZXJQZXJtaXNzaW9uVXJsLFxuICAgICAgcmVmZXJlbmNlOiBzY2hlbWFNZXRhLnJlZmVyZW5jZSxcbiAgICAgIHNleHVhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuc2V4dWFsVXNzYWdlTmFtZSxcbiAgICAgIHRleHR1cmU6IHRleHR1cmUgPz8gdW5kZWZpbmVkLFxuICAgICAgdGl0bGU6IHNjaGVtYU1ldGEudGl0bGUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICB2aW9sZW50VXNzYWdlTmFtZTogc2NoZW1hTWV0YS52aW9sZW50VXNzYWdlTmFtZSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfZXh0cmFjdEdMVEZJbWFnZShpbmRleDogbnVtYmVyKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICBjb25zdCBzb3VyY2UgPSBqc29uLmltYWdlcz8uW2luZGV4XTtcblxuICAgIGlmIChzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgVlJNTWV0YUxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgaW1hZ2VzWyR7aW5kZXh9XSBvZiBnbFRGIGFzIGEgdGh1bWJuYWlsIGJ1dCB0aGUgaW1hZ2UgZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvcjEyNC9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzI0wyNDY3XG5cbiAgICAvLyBgc291cmNlLnVyaWAgbWlnaHQgYmUgYSByZWZlcmVuY2UgdG8gYSBmaWxlXG4gICAgbGV0IHNvdXJjZVVSSTogc3RyaW5nIHwgdW5kZWZpbmVkID0gc291cmNlLnVyaTtcblxuICAgIC8vIExvYWQgdGhlIGJpbmFyeSBhcyBhIGJsb2JcbiAgICBpZiAoc291cmNlLmJ1ZmZlclZpZXcgIT0gbnVsbCkge1xuICAgICAgY29uc3QgYnVmZmVyVmlldyA9IGF3YWl0IHRoaXMucGFyc2VyLmdldERlcGVuZGVuY3koJ2J1ZmZlclZpZXcnLCBzb3VyY2UuYnVmZmVyVmlldyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J1ZmZlclZpZXddLCB7IHR5cGU6IHNvdXJjZS5taW1lVHlwZSB9KTtcbiAgICAgIHNvdXJjZVVSSSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZVVSSSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBpbWFnZXNbJHtpbmRleH1dIG9mIGdsVEYgYXMgYSB0aHVtYm5haWwgYnV0IHRoZSBpbWFnZSBjb3VsZG4ndCBsb2FkIHByb3Blcmx5YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuSW1hZ2VMb2FkZXIoKTtcbiAgICByZXR1cm4gYXdhaXQgbG9hZGVyLmxvYWRBc3luYyhyZXNvbHZlVVJMKHNvdXJjZVVSSSwgKHRoaXMucGFyc2VyIGFzIGFueSkub3B0aW9ucy5wYXRoKSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIGNvbnNvbGUud2FybignVlJNTWV0YUxvYWRlclBsdWdpbjogRmFpbGVkIHRvIGxvYWQgYSB0aHVtYm5haWwgaW1hZ2UnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXQgfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXQnO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YS9WUk1NZXRhJztcbmltcG9ydCB7IFZSTUNvcmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1Db3JlUGFyYW1ldGVycyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgVlJNIG1vZGVsLlxuICogVGhpcyBjbGFzcyBvbmx5IGluY2x1ZGVzIGNvcmUgc3BlYyBvZiB0aGUgVlJNIChgVlJNQ192cm1gKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUNvcmUge1xuICAvKipcbiAgICogYFRIUkVFLkdyb3VwYCB0aGF0IGNvbnRhaW5zIHRoZSBlbnRpcmUgVlJNLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjZW5lOiBUSFJFRS5Hcm91cDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YTogVlJNTWV0YTtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUh1bWFub2lkfSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlfSBvciB7QGxpbmsgVlJNSHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGV9LlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ6IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXIuc2V0VmFsdWV9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25NYW5hZ2VyPzogVlJNRXhwcmVzc2lvbk1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gb2YgdGhlIFZSTS5cbiAgICogVlJNRmlyc3RQZXJzb24gaXMgbW9zdGx5IHVzZWQgZm9yIG1lc2ggY3VsbGluZyBmb3IgZmlyc3QgcGVyc29uIHZpZXcuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUxvb2tBdH0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBWUk1Mb29rQXQudGFyZ2V0fSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgW1tWUk1QYXJhbWV0ZXJzXV0gdGhhdCByZXByZXNlbnRzIGNvbXBvbmVudHMgb2YgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogVlJNQ29yZVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnNjZW5lID0gcGFyYW1zLnNjZW5lO1xuICAgIHRoaXMubWV0YSA9IHBhcmFtcy5tZXRhO1xuICAgIHRoaXMuaHVtYW5vaWQgPSBwYXJhbXMuaHVtYW5vaWQ7XG4gICAgdGhpcy5leHByZXNzaW9uTWFuYWdlciA9IHBhcmFtcy5leHByZXNzaW9uTWFuYWdlcjtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xuICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5odW1hbm9pZC51cGRhdGUoKTtcblxuICAgIGlmICh0aGlzLmxvb2tBdCkge1xuICAgICAgdGhpcy5sb29rQXQudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5leHByZXNzaW9uTWFuYWdlcikge1xuICAgICAgdGhpcy5leHByZXNzaW9uTWFuYWdlci51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYsIEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IFZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Db3JlIH0gZnJvbSAnLi9WUk1Db3JlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gfSBmcm9tICcuL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4gfSBmcm9tICcuL2ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZExvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1NZXRhTG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGFMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNTG9va0F0TG9hZGVyUGx1Z2luIH0gZnJvbSAnLi9sb29rQXQvVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL2h1bWFub2lkJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YSB9IGZyb20gJy4vbWV0YSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Db3JlTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1DX3ZybSc7XG4gIH1cblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyByZWFkb25seSBleHByZXNzaW9uUGx1Z2luOiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb25QbHVnaW46IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWRQbHVnaW46IFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luO1xuICBwdWJsaWMgcmVhZG9ubHkgbG9va0F0UGx1Z2luOiBWUk1Mb29rQXRMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBtZXRhUGx1Z2luOiBWUk1NZXRhTG9hZGVyUGx1Z2luO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Db3JlTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgY29uc3QgaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gICAgY29uc3QgYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPSBvcHRpb25zPy5hdXRvVXBkYXRlSHVtYW5Cb25lcztcblxuICAgIHRoaXMuZXhwcmVzc2lvblBsdWdpbiA9IG9wdGlvbnM/LmV4cHJlc3Npb25QbHVnaW4gPz8gbmV3IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLmZpcnN0UGVyc29uUGx1Z2luID0gb3B0aW9ucz8uZmlyc3RQZXJzb25QbHVnaW4gPz8gbmV3IFZSTUZpcnN0UGVyc29uTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gICAgdGhpcy5odW1hbm9pZFBsdWdpbiA9XG4gICAgICBvcHRpb25zPy5odW1hbm9pZFBsdWdpbiA/PyBuZXcgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4ocGFyc2VyLCB7IGhlbHBlclJvb3QsIGF1dG9VcGRhdGVIdW1hbkJvbmVzIH0pO1xuICAgIHRoaXMubG9va0F0UGx1Z2luID0gb3B0aW9ucz8ubG9va0F0UGx1Z2luID8/IG5ldyBWUk1Mb29rQXRMb2FkZXJQbHVnaW4ocGFyc2VyLCB7IGhlbHBlclJvb3QgfSk7XG4gICAgdGhpcy5tZXRhUGx1Z2luID0gb3B0aW9ucz8ubWV0YVBsdWdpbiA/PyBuZXcgVlJNTWV0YUxvYWRlclBsdWdpbihwYXJzZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5tZXRhUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmh1bWFub2lkUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmV4cHJlc3Npb25QbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMubG9va0F0UGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcbiAgICBhd2FpdCB0aGlzLmZpcnN0UGVyc29uUGx1Z2luLmFmdGVyUm9vdChnbHRmKTtcblxuICAgIGNvbnN0IG1ldGEgPSBnbHRmLnVzZXJEYXRhLnZybU1ldGEgYXMgVlJNTWV0YSB8IG51bGw7XG4gICAgY29uc3QgaHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgbnVsbDtcblxuICAgIC8vIG1ldGEgYW5kIGh1bWFub2lkIGFyZSByZXF1aXJlZCB0byBiZSBhIFZSTS5cbiAgICAvLyBEb24ndCBjcmVhdGUgVlJNIGlmIHRoZXkgYXJlIG51bGxcbiAgICBpZiAobWV0YSAmJiBodW1hbm9pZCkge1xuICAgICAgY29uc3QgdnJtQ29yZSA9IG5ldyBWUk1Db3JlKHtcbiAgICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXG4gICAgICAgIGV4cHJlc3Npb25NYW5hZ2VyOiBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyLFxuICAgICAgICBmaXJzdFBlcnNvbjogZ2x0Zi51c2VyRGF0YS52cm1GaXJzdFBlcnNvbixcbiAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgIGxvb2tBdDogZ2x0Zi51c2VyRGF0YS52cm1Mb29rQXQsXG4gICAgICAgIG1ldGEsXG4gICAgICB9KTtcblxuICAgICAgZ2x0Zi51c2VyRGF0YS52cm1Db3JlID0gdnJtQ29yZTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJUSFJFRSIsIlBPU1NJQkxFX1NQRUNfVkVSU0lPTlMiLCJfdjNBIiwiX3YzQiIsIl9xdWF0QSIsIl9xdWF0QiIsIlZFQzNfUE9TSVRJVkVfWiIsIl9ldWxlckEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJQTtJQUNBO0lBQ2EsTUFBQSxhQUFjLFNBQVFBLGdCQUFLLENBQUMsUUFBUSxDQUFBO0lBb0MvQzs7O0lBR0c7SUFDSCxJQUFBLElBQVcsbUJBQW1CLEdBQUE7SUFDNUIsUUFBQSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFFO0lBQ2xDLFlBQUEsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RDLFNBQUE7SUFBTSxhQUFBLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwQixTQUFBO0lBQU0sYUFBQTtJQUNMLFlBQUEsT0FBTyxHQUFHLENBQUM7SUFDWixTQUFBO1NBQ0Y7SUFFRDs7O0lBR0c7SUFDSCxJQUFBLElBQVcsb0JBQW9CLEdBQUE7SUFDN0IsUUFBQSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssT0FBTyxF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LFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0lBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0lBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RSxLQUFLLENB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LEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELFNBQUE7SUFFRCxRQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUUsUUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RixRQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNsQztRQUVPLFdBQVcsR0FBQTtZQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFB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
