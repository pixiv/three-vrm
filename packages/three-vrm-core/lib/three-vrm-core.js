/*!
 * @pixiv/three-vrm-core v1.0.4
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2022 pixiv Inc.
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

    const _color = new THREE__namespace.Color();
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
                const deltaValue = new THREE__namespace.Color(targetValue.r - initialValue.r, targetValue.g - initialValue.g, targetValue.b - initialValue.b);
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
                                    targetValue: new THREE__namespace.Color().fromArray(bind.targetValue),
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
                                    const scale = new THREE__namespace.Vector2(materialValue.targetValue[0], materialValue.targetValue[1]);
                                    const offset = new THREE__namespace.Vector2(materialValue.targetValue[2], materialValue.targetValue[3]);
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
                                        targetValue: new THREE__namespace.Color(...materialValue.targetValue.slice(0, 3)),
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
        constructor(humanoid) {
            const { rigBones, root, parentWorldRotations, boneRotations } = VRMHumanoidRig._setupTransforms(humanoid);
            super(rigBones);
            this.original = humanoid;
            this.root = root;
            this._parentWorldRotations = parentWorldRotations;
            this._boneRotations = boneRotations;
        }
        static _setupTransforms(modelRig) {
            const root = new THREE__namespace.Object3D();
            root.name = 'VRMHumanoidRig';
            // store boneWorldPositions and boneWorldRotations
            const boneWorldPositions = {};
            const boneWorldRotations = {};
            const boneRotations = {};
            VRMHumanBoneList.forEach((boneName) => {
                const boneNode = modelRig.getBoneNode(boneName);
                if (boneNode) {
                    const boneWorldPosition = new THREE__namespace.Vector3();
                    const boneWorldRotation = new THREE__namespace.Quaternion();
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
                    const rigBoneNode = new THREE__namespace.Object3D();
                    rigBoneNode.name = 'Normalized_' + boneNode.name;
                    const parentRigBoneNode = (currentBoneName ? (_a = rigBones[currentBoneName]) === null || _a === void 0 ? void 0 : _a.node : root);
                    parentRigBoneNode.add(rigBoneNode);
                    rigBoneNode.position.copy(boneWorldPosition);
                    if (parentWorldPosition) {
                        rigBoneNode.position.sub(parentWorldPosition);
                    }
                    rigBones[boneName] = { node: rigBoneNode };
                    // store parentWorldRotation
                    parentWorldRotations[boneName] = parentWorldRotation !== null && parentWorldRotation !== void 0 ? parentWorldRotation : new THREE__namespace.Quaternion();
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
         * Get its yaw-pitch angles as an `Euler`.
         * Does NOT consider {@link faceFront}.
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
            this._yaw = THREE__namespace.MathUtils.RAD2DEG * yaw;
            this._pitch = THREE__namespace.MathUtils.RAD2DEG * pitch;
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

    exports.VRMCore = VRMCore;
    exports.VRMCoreLoaderPlugin = VRMCoreLoaderPlugin;
    exports.VRMExpression = VRMExpression;
    exports.VRMExpressionLoaderPlugin = VRMExpressionLoaderPlugin;
    exports.VRMExpressionManager = VRMExpressionManager;
    exports.VRMExpressionMaterialColorType = VRMExpressionMaterialColorType;
    exports.VRMExpressionOverrideType = VRMExpressionOverrideType;
    exports.VRMExpressionPresetName = VRMExpressionPresetName;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLWNvcmUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uLnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9nbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZS50cyIsIi4uL3NyYy91dGlscy9nbHRmR2V0QXNzb2NpYXRlZE1hdGVyaWFsSW5kZXgudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvblByZXNldE5hbWUudHMiLCIuLi9zcmMvdXRpbHMvc2F0dXJhdGUudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXIudHMiLCIuLi9zcmMvZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZC50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25UZXh0dXJlVHJhbnNmb3JtQmluZC50cyIsIi4uL3NyYy9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL2V4cHJlc3Npb25zL1ZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUudHMiLCIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24udHMiLCIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4udHMiLCIuLi9zcmMvZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvblR5cGUudHMiLCIuLi9zcmMvaHVtYW5vaWQvaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlci50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbkJvbmVMaXN0LnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFuQm9uZU5hbWUudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNSHVtYW5Cb25lUGFyZW50TWFwLnRzIiwiLi4vc3JjL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQudHMiLCIuLi9zcmMvaHVtYW5vaWQvVlJNUmlnLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkUmlnLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTUh1bWFub2lkLnRzIiwiLi4vc3JjL2h1bWFub2lkL1ZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZS50cyIsIi4uL3NyYy9odW1hbm9pZC9WUk1IdW1hbm9pZExvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9GYW5CdWZmZXJHZW9tZXRyeS50cyIsIi4uL3NyYy9sb29rQXQvaGVscGVycy91dGlscy9MaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkudHMiLCIuLi9zcmMvbG9va0F0L2hlbHBlcnMvVlJNTG9va0F0SGVscGVyLnRzIiwiLi4vc3JjL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUudHMiLCIuLi9zcmMvbG9va0F0L3V0aWxzL2NhbGNBemltdXRoQWx0aXR1ZGUudHMiLCIuLi9zcmMvbG9va0F0L3V0aWxzL3Nhbml0aXplQW5nbGUudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdC50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0Qm9uZUFwcGxpZXIudHMiLCIuLi9zcmMvbG9va0F0L1ZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRSYW5nZU1hcC50cyIsIi4uL3NyYy9sb29rQXQvVlJNTG9va0F0TG9hZGVyUGx1Z2luLnRzIiwiLi4vc3JjL2xvb2tBdC9WUk1Mb29rQXRUeXBlTmFtZS50cyIsIi4uL3NyYy91dGlscy9yZXNvbHZlVVJMLnRzIiwiLi4vc3JjL21ldGEvVlJNTWV0YUxvYWRlclBsdWdpbi50cyIsIi4uL3NyYy9WUk1Db3JlLnRzIiwiLi4vc3JjL1ZSTUNvcmVMb2FkZXJQbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbkJpbmQgfSBmcm9tICcuL1ZSTUV4cHJlc3Npb25CaW5kJztcbmltcG9ydCB0eXBlIHsgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSc7XG5cbi8vIGFuaW1hdGlvbk1peGVyIOOBruebo+imluWvvuixoeOBr+OAgVNjZW5lIOOBruS4reOBq+WFpeOBo+OBpuOBhOOCi+W/heimgeOBjOOBguOCi+OAglxuLy8g44Gd44Gu44Gf44KB44CB6KGo56S644Kq44OW44K444Kn44Kv44OI44Gn44Gv44Gq44GE44GR44KM44Gp44CBT2JqZWN0M0Qg44KS57aZ5om/44GX44GmIFNjZW5lIOOBq+aKleWFpeOBp+OBjeOCi+OCiOOBhuOBq+OBmeOCi+OAglxuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb24gZXh0ZW5kcyBUSFJFRS5PYmplY3QzRCB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoaXMgZXhwcmVzc2lvbi5cbiAgICogRGlzdGluZ3Vpc2hlZCB3aXRoIGBuYW1lYCBzaW5jZSBgbmFtZWAgd2lsbCBiZSBjb25mbGljdGVkIHdpdGggT2JqZWN0M0QuXG4gICAqL1xuICBwdWJsaWMgZXhwcmVzc2lvbk5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBleHByZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIHdlaWdodCA9IDAuMDtcblxuICAvKipcbiAgICogSW50ZXJwcmV0IHZhbHVlcyBncmVhdGVyIHRoYW4gMC41IGFzIDEuMCwgb3J0aGVyd2lzZSAwLjAuXG4gICAqL1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdGhlIGV4cHJlc3Npb24gb3ZlcnJpZGVzIGJsaW5rIGV4cHJlc3Npb25zLlxuICAgKi9cbiAgcHVibGljIG92ZXJyaWRlQmxpbms6IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBsb29rQXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgb3ZlcnJpZGVMb29rQXQ6IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRoZSBleHByZXNzaW9uIG92ZXJyaWRlcyBtb3V0aCBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBvdmVycmlkZU1vdXRoOiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlID0gJ25vbmUnO1xuXG4gIHByaXZhdGUgX2JpbmRzOiBWUk1FeHByZXNzaW9uQmluZFtdID0gW107XG5cbiAgLyoqXG4gICAqIEEgdmFsdWUgcmVwcmVzZW50cyBob3cgbXVjaCBpdCBzaG91bGQgb3ZlcnJpZGUgYmxpbmsgZXhwcmVzc2lvbnMuXG4gICAqIGAwLjBgID09IG5vIG92ZXJyaWRlIGF0IGFsbCwgYDEuMGAgPT0gY29tcGxldGVseSBibG9jayB0aGUgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG92ZXJyaWRlQmxpbmtBbW91bnQoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vdmVycmlkZUJsaW5rID09PSAnYmxvY2snKSB7XG4gICAgICByZXR1cm4gMC4wIDwgdGhpcy53ZWlnaHQgPyAxLjAgOiAwLjA7XG4gICAgfSBlbHNlIGlmICh0aGlzLm92ZXJyaWRlQmxpbmsgPT09ICdibGVuZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBsb29rQXQgZXhwcmVzc2lvbnMuXG4gICAqIGAwLjBgID09IG5vIG92ZXJyaWRlIGF0IGFsbCwgYDEuMGAgPT0gY29tcGxldGVseSBibG9jayB0aGUgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG92ZXJyaWRlTG9va0F0QW1vdW50KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3ZlcnJpZGVMb29rQXQgPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLndlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVMb29rQXQgPT09ICdibGVuZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLndlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDAuMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSB2YWx1ZSByZXByZXNlbnRzIGhvdyBtdWNoIGl0IHNob3VsZCBvdmVycmlkZSBtb3V0aCBleHByZXNzaW9ucy5cbiAgICogYDAuMGAgPT0gbm8gb3ZlcnJpZGUgYXQgYWxsLCBgMS4wYCA9PSBjb21wbGV0ZWx5IGJsb2NrIHRoZSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgb3ZlcnJpZGVNb3V0aEFtb3VudCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm92ZXJyaWRlTW91dGggPT09ICdibG9jaycpIHtcbiAgICAgIHJldHVybiAwLjAgPCB0aGlzLndlaWdodCA/IDEuMCA6IDAuMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcnJpZGVNb3V0aCA9PT0gJ2JsZW5kJykge1xuICAgICAgcmV0dXJuIHRoaXMud2VpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMC4wO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5uYW1lID0gYFZSTUV4cHJlc3Npb25fJHtleHByZXNzaW9uTmFtZX1gO1xuICAgIHRoaXMuZXhwcmVzc2lvbk5hbWUgPSBleHByZXNzaW9uTmFtZTtcblxuICAgIC8vIHRyYXZlcnNlIOaZguOBruaVkea4iOaJi+auteOBqOOBl+OBpiBPYmplY3QzRCDjgafjga/jgarjgYTjgZPjgajjgpLmmI7npLrjgZfjgabjgYrjgY9cbiAgICB0aGlzLnR5cGUgPSAnVlJNRXhwcmVzc2lvbic7XG4gICAgLy8g6KGo56S655uu55qE44Gu44Kq44OW44K444Kn44Kv44OI44Gn44Gv44Gq44GE44Gu44Gn44CB6LKg6I236Lu95rib44Gu44Gf44KB44GrIHZpc2libGUg44KSIGZhbHNlIOOBq+OBl+OBpuOBiuOBj+OAglxuICAgIC8vIOOBk+OCjOOBq+OCiOOCiuOAgeOBk+OBruOCpOODs+OCueOCv+ODs+OCueOBq+WvvuOBmeOCi+avjuODleODrOODvOODoOOBriBtYXRyaXgg6Ieq5YuV6KiI566X44KS55yB55Wl44Gn44GN44KL44CCXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkQmluZChiaW5kOiBWUk1FeHByZXNzaW9uQmluZCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmRzLnB1c2goYmluZCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgd2VpZ2h0IHRvIGV2ZXJ5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICogU2hvdWxkIGJlIGNhbGxlZCBldmVyeSBmcmFtZS5cbiAgICovXG4gIHB1YmxpYyBhcHBseVdlaWdodChvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgYSB2YWx1ZSB0byBpdHMgd2VpZ2h0IHRvIGFwcGx5LlxuICAgICAqIEludGVuZGVkIHRvIGJlIHVzZWQgZm9yIG92ZXJyaWRpbmcgYW4gZXhwcmVzc2lvbiB3ZWlnaHQgYnkgYW5vdGhlciBleHByZXNzaW9uLlxuICAgICAqIFNlZSBhbHNvOiB7QGxpbmsgb3ZlcnJpZGVCbGlua30sIHtAbGluayBvdmVycmlkZUxvb2tBdH0sIHtAbGluayBvdmVycmlkZU1vdXRofVxuICAgICAqL1xuICAgIG11bHRpcGxpZXI/OiBudW1iZXI7XG4gIH0pOiB2b2lkIHtcbiAgICBsZXQgYWN0dWFsV2VpZ2h0ID0gdGhpcy5pc0JpbmFyeSA/ICh0aGlzLndlaWdodCA8PSAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG4gICAgYWN0dWFsV2VpZ2h0ICo9IG9wdGlvbnM/Lm11bHRpcGxpZXIgPz8gMS4wO1xuXG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4gYmluZC5hcHBseVdlaWdodChhY3R1YWxXZWlnaHQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBwcmV2aW91c2x5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4gYmluZC5jbGVhckFwcGxpZWRXZWlnaHQoKSk7XG4gIH1cbn1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZnVuY3Rpb24gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmOiBHTFRGLCBub2RlSW5kZXg6IG51bWJlciwgbm9kZTogVEhSRUUuT2JqZWN0M0QpOiBUSFJFRS5NZXNoW10gfCBudWxsIHtcbiAgY29uc3QganNvbiA9IGdsdGYucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAvKipcbiAgICogTGV0J3MgbGlzdCB1cCBldmVyeSBwb3NzaWJsZSBwYXR0ZXJucyB0aGF0IHBhcnNlZCBnbHRmIG5vZGVzIHdpdGggYSBtZXNoIGNhbiBoYXZlLCwsXG4gICAqXG4gICAqIFwiKlwiIGluZGljYXRlcyB0aGF0IHRob3NlIG1lc2hlcyBzaG91bGQgYmUgbGlzdGVkIHVwIHVzaW5nIHRoaXMgZnVuY3Rpb25cbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIGEgc2lnbmxlIHByaW1pdGl2ZSlcbiAgICpcbiAgICogLSBgVEhSRUUuTWVzaGA6IFRoZSBvbmx5IHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAqXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICpcbiAgICogIyMjIEEgbm9kZSB3aXRoIGEgKG1lc2gsIG11bHRpcGxlIHByaW1pdGl2ZXMpIEFORCAoYSBjaGlsZCB3aXRoIGEgbWVzaCwgYSBzaW5nbGUgcHJpbWl0aXZlKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKVxuICAgKlxuICAgKiAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIHRoZSBtZXNoXG4gICAqICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAtIGBUSFJFRS5NZXNoYDogQSBwcmltaXRpdmUgb2YgdGhlIG1lc2ggKDIpICpcbiAgICogICAtIGBUSFJFRS5Hcm91cGA6IFRoZSByb290IG9mIGEgTUVTSCBPRiBUSEUgQ0hJTERcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGRcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCBvZiB0aGUgY2hpbGQgKDIpXG4gICAqXG4gICAqICMjIyBBIG5vZGUgd2l0aCBhIChtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKlxuICAgKiAjIyMgQSBub2RlIHdpdGggYSAobWVzaCwgbXVsdGlwbGUgcHJpbWl0aXZlcykgQU5EIChhIGNoaWxkIHdpdGggYSBtZXNoLCBtdWx0aXBsZSBwcmltaXRpdmVzKSBCVVQgdGhlIG5vZGUgaXMgYSBib25lXG4gICAqXG4gICAqIC0gYFRIUkVFLkJvbmVgOiBUaGUgcm9vdCBvZiB0aGUgbm9kZSwgYXMgYSBib25lXG4gICAqICAgLSBgVEhSRUUuR3JvdXBgOiBUaGUgcm9vdCBvZiB0aGUgbWVzaFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoICpcbiAgICogICAgIC0gYFRIUkVFLk1lc2hgOiBBIHByaW1pdGl2ZSBvZiB0aGUgbWVzaCAoMikgKlxuICAgKiAgIC0gYFRIUkVFLkdyb3VwYDogVGhlIHJvb3Qgb2YgYSBNRVNIIE9GIFRIRSBDSElMRFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZFxuICAgKiAgICAgLSBgVEhSRUUuTWVzaGA6IEEgcHJpbWl0aXZlIG9mIHRoZSBtZXNoIG9mIHRoZSBjaGlsZCAoMilcbiAgICpcbiAgICogLi4uSSB3aWxsIHRha2UgYSBzdHJhdGVneSB0aGF0IHRyYXZlcnNlcyB0aGUgcm9vdCBvZiB0aGUgbm9kZSBhbmQgdGFrZSBmaXJzdCAocHJpbWl0aXZlQ291bnQpIG1lc2hlcy5cbiAgICovXG5cbiAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGEgbWVzaFxuICBjb25zdCBzY2hlbWFOb2RlID0ganNvbi5ub2Rlcz8uW25vZGVJbmRleF07XG4gIGlmIChzY2hlbWFOb2RlID09IG51bGwpIHtcbiAgICBjb25zb2xlLndhcm4oYGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWw6IEF0dGVtcHQgdG8gdXNlIG5vZGVzWyR7bm9kZUluZGV4fV0gb2YgZ2xURiBidXQgdGhlIG5vZGUgZG9lc24ndCBleGlzdGApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbWVzaEluZGV4ID0gc2NoZW1hTm9kZS5tZXNoO1xuICBpZiAobWVzaEluZGV4ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEhvdyBtYW55IHByaW1pdGl2ZXMgdGhlIG1lc2ggaGFzP1xuICBjb25zdCBzY2hlbWFNZXNoID0ganNvbi5tZXNoZXM/LlttZXNoSW5kZXhdO1xuICBpZiAoc2NoZW1hTWVzaCA9PSBudWxsKSB7XG4gICAgY29uc29sZS53YXJuKGBleHRyYWN0UHJpbWl0aXZlc0ludGVybmFsOiBBdHRlbXB0IHRvIHVzZSBtZXNoZXNbJHttZXNoSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWVzaCBkb2Vzbid0IGV4aXN0YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwcmltaXRpdmVDb3VudCA9IHNjaGVtYU1lc2gucHJpbWl0aXZlcy5sZW5ndGg7XG5cbiAgLy8gVHJhdmVyc2UgdGhlIG5vZGUgYW5kIHRha2UgZmlyc3QgKHByaW1pdGl2ZUNvdW50KSBtZXNoZXNcbiAgY29uc3QgcHJpbWl0aXZlczogVEhSRUUuTWVzaFtdID0gW107XG4gIG5vZGUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgIGlmIChwcmltaXRpdmVzLmxlbmd0aCA8IHByaW1pdGl2ZUNvdW50KSB7XG4gICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBwcmltaXRpdmVzLnB1c2gob2JqZWN0IGFzIFRIUkVFLk1lc2gpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHByaW1pdGl2ZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdCBwcmltaXRpdmVzICggYFRIUkVFLk1lc2hbXWAgKSBvZiBhIG5vZGUgZnJvbSBhIGxvYWRlZCBHTFRGLlxuICogVGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGRpc3Rpbmd1aXNoIHByaW1pdGl2ZXMgYW5kIGNoaWxkcmVuIGZyb20gYSBub2RlIHRoYXQgaGFzIGJvdGggbWVzaGVzIGFuZCBjaGlsZHJlbi5cbiAqXG4gKiBJdCB1dGlsaXplcyB0aGUgYmVoYXZpb3IgdGhhdCBHTFRGTG9hZGVyIGFkZHMgbWVzaCBwcmltaXRpdmVzIHRvIHRoZSBub2RlIG9iamVjdCAoIGBUSFJFRS5Hcm91cGAgKSBmaXJzdCB0aGVuIGFkZHMgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKiBAcGFyYW0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZjogR0xURiwgbm9kZUluZGV4OiBudW1iZXIpOiBQcm9taXNlPFRIUkVFLk1lc2hbXSB8IG51bGw+IHtcbiAgY29uc3Qgbm9kZTogVEhSRUUuT2JqZWN0M0QgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgcmV0dXJuIGV4dHJhY3RQcmltaXRpdmVzSW50ZXJuYWwoZ2x0Ziwgbm9kZUluZGV4LCBub2RlKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHByaW1pdGl2ZXMgKCBgVEhSRUUuTWVzaFtdYCApIG9mIG5vZGVzIGZyb20gYSBsb2FkZWQgR0xURi5cbiAqIFNlZSB7QGxpbmsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogSXQgcmV0dXJucyBhIG1hcCBmcm9tIG5vZGUgaW5kZXggdG8gZXh0cmFjdGlvbiByZXN1bHQuXG4gKiBJZiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhIG1lc2gsIHRoZSBlbnRyeSBmb3IgdGhlIG5vZGUgd2lsbCBub3QgYmUgcHV0IGluIHRoZSByZXR1cm5pbmcgbWFwLlxuICpcbiAqIEBwYXJhbSBnbHRmIEEgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0ZjogR0xURik6IFByb21pc2U8TWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPj4ge1xuICBjb25zdCBub2RlczogVEhSRUUuT2JqZWN0M0RbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbm9kZScpO1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPG51bWJlciwgVEhSRUUuTWVzaFtdPigpO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gZXh0cmFjdFByaW1pdGl2ZXNJbnRlcm5hbChnbHRmLCBpbmRleCwgbm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBtYXAuc2V0KGluZGV4LCByZXN1bHQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG1hcDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcblxuLyoqXG4gKiBHZXQgYSBtYXRlcmlhbCBkZWZpbml0aW9uIGluZGV4IG9mIGdsVEYgZnJvbSBhc3NvY2lhdGVkIG1hdGVyaWFsLlxuICogSXQncyBiYXNpY2FsbHkgYSBjb21hdCBjb2RlIGJldHdlZW4gVGhyZWUuanMgcjEzMyBvciBhYm92ZSBhbmQgcHJldmlvdXMgdmVyc2lvbnMuXG4gKiBAcGFyYW0gcGFyc2VyIEdMVEZQYXJzZXJcbiAqIEBwYXJhbSBtYXRlcmlhbCBBIG1hdGVyaWFsIG9mIGdsdGZcbiAqIEByZXR1cm5zIE1hdGVyaWFsIGRlZmluaXRpb24gaW5kZXggb2YgZ2xURlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4KHBhcnNlcjogR0xURlBhcnNlciwgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IHRocmVlUmV2aXNpb24gPSBwYXJzZUludChUSFJFRS5SRVZJU0lPTiwgMTApO1xuXG4gIGxldCBpbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgaWYgKHRocmVlUmV2aXNpb24gPj0gMTMzKSB7XG4gICAgaW5kZXggPSBwYXJzZXIuYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk/Lm1hdGVyaWFscyA/PyBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIENPTVBBVDogc3RydWN0dXJlIG9mIGBwYXJzZXIuYXNzb2NpYXRpb25zYCBoYXMgYmVlbiBjaGFuZ2VkIEAgcjEzM1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzIxNzM3XG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdGhyZWUtdHlwZXMvdGhyZWUtdHMtdHlwZXMvY29tbWl0LzUyNDY2NzZlNDc5YjYxYTlmZjJkYjcxZGY0MTE5ZjZmMTQ2MjU4MGRcbiAgICB0eXBlIEdMVEZSZWZlcmVuY2VQcmUxMzMgPSB7XG4gICAgICB0eXBlOiAnbWF0ZXJpYWxzJyB8ICdub2RlcycgfCAndGV4dHVyZXMnIHwgJ21lc2hlcyc7XG4gICAgICBpbmRleDogbnVtYmVyO1xuICAgIH07XG5cbiAgICB0eXBlIEdMVEZBc3NvY2lhdGlvbnNQcmUxMzMgPSBNYXA8VEhSRUUuT2JqZWN0M0QgfCBUSFJFRS5NYXRlcmlhbCB8IFRIUkVFLlRleHR1cmUsIEdMVEZSZWZlcmVuY2VQcmUxMzM+O1xuXG4gICAgY29uc3QgYXNzb2NpYXRpb25zID0gcGFyc2VyLmFzc29jaWF0aW9ucyBhcyBHTFRGQXNzb2NpYXRpb25zUHJlMTMzO1xuXG4gICAgY29uc3QgcmVmZXJlbmNlID0gYXNzb2NpYXRpb25zLmdldChtYXRlcmlhbCk7XG5cbiAgICBpZiAocmVmZXJlbmNlPy50eXBlID09PSAnbWF0ZXJpYWxzJykge1xuICAgICAgaW5kZXggPSByZWZlcmVuY2UuaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmV4cG9ydCBjb25zdCBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHtcbiAgQWE6ICdhYScsXG4gIEloOiAnaWgnLFxuICBPdTogJ291JyxcbiAgRWU6ICdlZScsXG4gIE9oOiAnb2gnLFxuICBCbGluazogJ2JsaW5rJyxcbiAgSGFwcHk6ICdoYXBweScsXG4gIEFuZ3J5OiAnYW5ncnknLFxuICBTYWQ6ICdzYWQnLFxuICBSZWxheGVkOiAncmVsYXhlZCcsXG4gIExvb2tVcDogJ2xvb2tVcCcsXG4gIFN1cnByaXNlZDogJ3N1cnByaXNlZCcsXG4gIExvb2tEb3duOiAnbG9va0Rvd24nLFxuICBMb29rTGVmdDogJ2xvb2tMZWZ0JyxcbiAgTG9va1JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgQmxpbmtMZWZ0OiAnYmxpbmtMZWZ0JyxcbiAgQmxpbmtSaWdodDogJ2JsaW5rUmlnaHQnLFxuICBOZXV0cmFsOiAnbmV1dHJhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSA9IHR5cGVvZiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZVtrZXlvZiB0eXBlb2YgVlJNRXhwcmVzc2lvblByZXNldE5hbWVdO1xuIiwiLyoqXG4gKiBDbGFtcCB0aGUgaW5wdXQgdmFsdWUgd2l0aGluIFswLjAgLSAxLjBdLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdHVyYXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEuMCksIDAuMCk7XG59XG4iLCJpbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb24gfSBmcm9tICcuL1ZSTUV4cHJlc3Npb24nO1xuXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hbmFnZXIge1xuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUJsaW5rfS5cbiAgICovXG4gIHB1YmxpYyBibGlua0V4cHJlc3Npb25OYW1lcyA9IFsnYmxpbmsnLCAnYmxpbmtMZWZ0JywgJ2JsaW5rUmlnaHQnXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbmFtZSBvciBwcmVzZXQgbmFtZSBvZiBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiBieSB7QGxpbmsgVlJNRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdH0uXG4gICAqL1xuICBwdWJsaWMgbG9va0F0RXhwcmVzc2lvbk5hbWVzID0gWydsb29rTGVmdCcsICdsb29rUmlnaHQnLCAnbG9va1VwJywgJ2xvb2tEb3duJ107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIG5hbWUgb3IgcHJlc2V0IG5hbWUgb2YgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIG92ZXJyaWRkZW4gYnkge0BsaW5rIFZSTUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aH0uXG4gICAqL1xuICBwdWJsaWMgbW91dGhFeHByZXNzaW9uTmFtZXMgPSBbJ2FhJywgJ2VlJywgJ2loJywgJ29oJywgJ291J107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHtAbGluayBWUk1FeHByZXNzaW9ufS5cbiAgICogV2hlbiB5b3Ugd2FudCB0byByZWdpc3RlciBleHByZXNzaW9ucywgdXNlIHtAbGluayByZWdpc3RlckV4cHJlc3Npb259XG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uczogVlJNRXhwcmVzc2lvbltdID0gW107XG4gIHB1YmxpYyBnZXQgZXhwcmVzc2lvbnMoKTogVlJNRXhwcmVzc2lvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwcmVzc2lvbnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBuYW1lIHRvIGV4cHJlc3Npb24uXG4gICAqL1xuICBwcml2YXRlIF9leHByZXNzaW9uTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1FeHByZXNzaW9uIH0gPSB7fTtcbiAgcHVibGljIGdldCBleHByZXNzaW9uTWFwKCk6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2V4cHJlc3Npb25NYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gbmFtZSB0byBleHByZXNzaW9uLCBidXQgZXhjbHVkaW5nIGN1c3RvbSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJlc2V0RXhwcmVzc2lvbk1hcCgpOiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSB7XG4gICAgY29uc3QgcmVzdWx0OiB7IFtuYW1lIGluIFZSTUV4cHJlc3Npb25QcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmIChwcmVzZXROYW1lU2V0LmhhcyhuYW1lKSkge1xuICAgICAgICByZXN1bHRbbmFtZSBhcyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZV0gPSBleHByZXNzaW9uO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIG5hbWUgdG8gZXhwcmVzc2lvbiwgYnV0IGV4Y2x1ZGluZyBwcmVzZXQgZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGN1c3RvbUV4cHJlc3Npb25NYXAoKTogeyBbbmFtZTogc3RyaW5nXTogVlJNRXhwcmVzc2lvbiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IHsgW25hbWU6IHN0cmluZ106IFZSTUV4cHJlc3Npb24gfSA9IHt9O1xuXG4gICAgY29uc3QgcHJlc2V0TmFtZVNldCA9IG5ldyBTZXQ8c3RyaW5nPihPYmplY3QudmFsdWVzKFZSTUV4cHJlc3Npb25QcmVzZXROYW1lKSk7XG5cbiAgICBPYmplY3QuZW50cmllcyh0aGlzLl9leHByZXNzaW9uTWFwKS5mb3JFYWNoKChbbmFtZSwgZXhwcmVzc2lvbl0pID0+IHtcbiAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgcmVzdWx0W25hbWVdID0gZXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGdpdmVuIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gaW50byB0aGlzIG9uZS5cbiAgICogQHBhcmFtIHNvdXJjZSBUaGUge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNRXhwcmVzc2lvbk1hbmFnZXIpOiB0aGlzIHtcbiAgICAvLyBmaXJzdCB1bnJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBpdCBoYXNcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IHRoaXMuX2V4cHJlc3Npb25zLmNvbmNhdCgpO1xuICAgIGV4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIHRoaXMudW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbik7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIHJlZ2lzdGVyIGFsbCB0aGUgZXhwcmVzc2lvbiBvZiB0aGUgc291cmNlXG4gICAgc291cmNlLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgcmVtYWluaW5nIG1lbWJlcnNcbiAgICB0aGlzLmJsaW5rRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmJsaW5rRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuICAgIHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzID0gc291cmNlLmxvb2tBdEV4cHJlc3Npb25OYW1lcy5jb25jYXQoKTtcbiAgICB0aGlzLm1vdXRoRXhwcmVzc2lvbk5hbWVzID0gc291cmNlLm1vdXRoRXhwcmVzc2lvbk5hbWVzLmNvbmNhdCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1FeHByZXNzaW9uTWFuYWdlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVnaXN0ZXJlZCBleHByZXNzaW9uLlxuICAgKiBJZiBpdCBjYW5ub3QgZmluZCBhbiBleHByZXNzaW9uLCBpdCB3aWxsIHJldHVybiBgbnVsbGAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvciBwcmVzZXQgbmFtZSBvZiB0aGUgZXhwcmVzc2lvblxuICAgKi9cbiAgcHVibGljIGdldEV4cHJlc3Npb24obmFtZTogVlJNRXhwcmVzc2lvblByZXNldE5hbWUgfCBzdHJpbmcpOiBWUk1FeHByZXNzaW9uIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cHJlc3Npb25NYXBbbmFtZV0gPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gdGhhdCBkZXNjcmliZXMgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLnB1c2goZXhwcmVzc2lvbik7XG4gICAgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB5b3Ugd2FudCB0byB1bnJlZ2lzdGVyXG4gICAqL1xuICBwdWJsaWMgdW5yZWdpc3RlckV4cHJlc3Npb24oZXhwcmVzc2lvbjogVlJNRXhwcmVzc2lvbik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXhwcmVzc2lvbnMuaW5kZXhPZihleHByZXNzaW9uKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUV4cHJlc3Npb25NYW5hZ2VyOiBUaGUgc3BlY2lmaWVkIGV4cHJlc3Npb25zIGlzIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fZXhwcmVzc2lvbk1hcFtleHByZXNzaW9uLmV4cHJlc3Npb25OYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2VpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgZXhwcmVzc2lvbi5cbiAgICogSWYgaXQgZG9lc24ndCBoYXZlIGFuIGV4cHJlc3Npb24gb2YgZ2l2ZW4gbmFtZSwgaXQgd2lsbCByZXR1cm4gYG51bGxgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICovXG4gIHB1YmxpYyBnZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24/LndlaWdodCA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHdlaWdodCB0byB0aGUgc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGV4cHJlc3Npb25cbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5nZXRFeHByZXNzaW9uKG5hbWUpO1xuICAgIGlmIChleHByZXNzaW9uKSB7XG4gICAgICBleHByZXNzaW9uLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGV4cHJlc3Npb24uXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgZXhwcmVzc2lvbiB2aWEga2V5ZnJhbWUgYW5pbWF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGUgTWFuaXB1bGF0ZSBhbiBleHByZXNzaW9uIHVzaW5nIGtleWZyYW1lIGFuaW1hdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCB0cmFja05hbWUgPSB2cm0uZXhwcmVzc2lvbk1hbmFnZXIuZ2V0RXhwcmVzc2lvblRyYWNrTmFtZSggJ2JsaW5rJyApO1xuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIG5hbWUsXG4gICAqICAgWyAwLjAsIDAuNSwgMS4wIF0sIC8vIHRpbWVzXG4gICAqICAgWyAwLjAsIDEuMCwgMC4wIF0gLy8gdmFsdWVzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IGNsaXAgPSBuZXcgVEhSRUUuQW5pbWF0aW9uQ2xpcChcbiAgICogICAnYmxpbmsnLCAvLyBuYW1lXG4gICAqICAgMS4wLCAvLyBkdXJhdGlvblxuICAgKiAgIFsgdHJhY2sgXSAvLyB0cmFja3NcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIoIHZybS5zY2VuZSApO1xuICAgKiBjb25zdCBhY3Rpb24gPSBtaXhlci5jbGlwQWN0aW9uKCBjbGlwICk7XG4gICAqIGFjdGlvbi5wbGF5KCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHByZXNzaW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwcmVzc2lvblRyYWNrTmFtZShuYW1lOiBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEV4cHJlc3Npb24obmFtZSk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24gPyBgJHtleHByZXNzaW9uLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBleHByZXNzaW9ucy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgLy8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBvdmVycmlkZSBjZXJ0YWluIGV4cHJlc3Npb25zXG4gICAgY29uc3Qgd2VpZ2h0TXVsdGlwbGllcnMgPSB0aGlzLl9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpO1xuXG4gICAgLy8gcmVzZXQgZXhwcmVzc2lvbiBiaW5kcyBmaXJzdFxuICAgIHRoaXMuX2V4cHJlc3Npb25zLmZvckVhY2goKGV4cHJlc3Npb24pID0+IHtcbiAgICAgIGV4cHJlc3Npb24uY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGVuIGFwcGx5IGJpbmRzXG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuZm9yRWFjaCgoZXhwcmVzc2lvbikgPT4ge1xuICAgICAgbGV0IG11bHRpcGxpZXIgPSAxLjA7XG4gICAgICBjb25zdCBuYW1lID0gZXhwcmVzc2lvbi5leHByZXNzaW9uTmFtZTtcblxuICAgICAgaWYgKHRoaXMuYmxpbmtFeHByZXNzaW9uTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgbXVsdGlwbGllciAqPSB3ZWlnaHRNdWx0aXBsaWVycy5ibGluaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubG9va0F0RXhwcmVzc2lvbk5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIG11bHRpcGxpZXIgKj0gd2VpZ2h0TXVsdGlwbGllcnMubG9va0F0O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5tb3V0aEV4cHJlc3Npb25OYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICBtdWx0aXBsaWVyICo9IHdlaWdodE11bHRpcGxpZXJzLm1vdXRoO1xuICAgICAgfVxuXG4gICAgICBleHByZXNzaW9uLmFwcGx5V2VpZ2h0KHsgbXVsdGlwbGllciB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3VtIG9mIG92ZXJyaWRlIGFtb3VudHMgdG8gc2VlIGhvdyBtdWNoIHdlIHNob3VsZCBtdWx0aXBseSB3ZWlnaHRzIG9mIGNlcnRhaW4gZXhwcmVzc2lvbnMuXG4gICAqL1xuICBwcml2YXRlIF9jYWxjdWxhdGVXZWlnaHRNdWx0aXBsaWVycygpOiB7XG4gICAgYmxpbms6IG51bWJlcjtcbiAgICBsb29rQXQ6IG51bWJlcjtcbiAgICBtb3V0aDogbnVtYmVyO1xuICB9IHtcbiAgICBsZXQgYmxpbmsgPSAxLjA7XG4gICAgbGV0IGxvb2tBdCA9IDEuMDtcbiAgICBsZXQgbW91dGggPSAxLjA7XG5cbiAgICB0aGlzLl9leHByZXNzaW9ucy5mb3JFYWNoKChleHByZXNzaW9uKSA9PiB7XG4gICAgICBibGluayAtPSBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmtBbW91bnQ7XG4gICAgICBsb29rQXQgLT0gZXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdEFtb3VudDtcbiAgICAgIG1vdXRoIC09IGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aEFtb3VudDtcbiAgICB9KTtcblxuICAgIGJsaW5rID0gTWF0aC5tYXgoMC4wLCBibGluayk7XG4gICAgbG9va0F0ID0gTWF0aC5tYXgoMC4wLCBsb29rQXQpO1xuICAgIG1vdXRoID0gTWF0aC5tYXgoMC4wLCBtb3V0aCk7XG5cbiAgICByZXR1cm4geyBibGluaywgbG9va0F0LCBtb3V0aCB9O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSA9IHtcbiAgQ29sb3I6ICdjb2xvcicsXG4gIEVtaXNzaW9uQ29sb3I6ICdlbWlzc2lvbkNvbG9yJyxcbiAgU2hhZGVDb2xvcjogJ3NoYWRlQ29sb3InLFxuICBNYXRjYXBDb2xvcjogJ21hdGNhcENvbG9yJyxcbiAgUmltQ29sb3I6ICdyaW1Db2xvcicsXG4gIE91dGxpbmVDb2xvcjogJ291dGxpbmVDb2xvcicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgPVxuICB0eXBlb2YgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGVdO1xuXG5leHBvcnQgY29uc3QgdjBFeHByZXNzaW9uTWF0ZXJpYWxDb2xvck1hcDogeyBba2V5OiBzdHJpbmddOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUgfCB1bmRlZmluZWQgfSA9IHtcbiAgX0NvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuQ29sb3IsXG4gIF9FbWlzc2lvbkNvbG9yOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUuRW1pc3Npb25Db2xvcixcbiAgX1NoYWRlQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5TaGFkZUNvbG9yLFxuICBfUmltQ29sb3I6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZS5SaW1Db2xvcixcbiAgX091dGxpbmVDb2xvcjogVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlLk91dGxpbmVDb2xvcixcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uQmluZCc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlJztcblxuY29uc3QgX2NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG5cbi8qKlxuICogQSBiaW5kIG9mIGV4cHJlc3Npb24gaW5mbHVlbmNlcyB0byBhIG1hdGVyaWFsIGNvbG9yLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICAvKipcbiAgICogTWFwcGluZyBvZiBwcm9wZXJ0eSBuYW1lcyBmcm9tIFZSTUMvbWF0ZXJpYWxDb2xvckJpbmRzLnR5cGUgdG8gdGhyZWUuanMvTWF0ZXJpYWwuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lTWFwTWFwOiB7XG4gICAgW2Rpc3Rpbmd1aXNoZXI6IHN0cmluZ106IHsgW3R5cGUgaW4gVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JUeXBlXT86IHN0cmluZyB9O1xuICB9ID0ge1xuICAgIGlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiAnY29sb3InLFxuICAgICAgZW1pc3Npb25Db2xvcjogJ2VtaXNzaXZlJyxcbiAgICB9LFxuICAgIGlzTWVzaEJhc2ljTWF0ZXJpYWw6IHtcbiAgICAgIGNvbG9yOiAnY29sb3InLFxuICAgIH0sXG4gICAgaXNNVG9vbk1hdGVyaWFsOiB7XG4gICAgICBjb2xvcjogJ2NvbG9yJyxcbiAgICAgIGVtaXNzaW9uQ29sb3I6ICdlbWlzc2l2ZScsXG4gICAgICBvdXRsaW5lQ29sb3I6ICdvdXRsaW5lQ29sb3JGYWN0b3InLFxuICAgICAgbWF0Y2FwQ29sb3I6ICdtYXRjYXBGYWN0b3InLFxuICAgICAgcmltQ29sb3I6ICdwYXJhbWV0cmljUmltQ29sb3JGYWN0b3InLFxuICAgICAgc2hhZGVDb2xvcjogJ3NoYWRlQ29sb3JGYWN0b3InLFxuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0ZXJpYWwuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdGFyZ2V0IHByb3BlcnR5IG9mIHRoZSBtYXRlcmlhbC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBWUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGU7XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuXG4gIC8qKlxuICAgKiBJdHMgc3RhdGUuXG4gICAqIElmIGl0IGNhbm5vdCBmaW5kIHRoZSB0YXJnZXQgcHJvcGVydHkgaW4gY29uc3RydWN0b3IsIGl0IHdpbGwgYmUgbnVsbCBpbnN0ZWFkLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhdGU6IHtcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgICBpbml0aWFsVmFsdWU6IFRIUkVFLkNvbG9yO1xuICAgIGRlbHRhVmFsdWU6IFRIUkVFLkNvbG9yO1xuICB9IHwgbnVsbDtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIG1hdGVyaWFsLFxuICAgIHR5cGUsXG4gICAgdGFyZ2V0VmFsdWUsXG4gIH06IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSB0YXJnZXQgcHJvcGVydHkgb2YgdGhlIG1hdGVyaWFsLlxuICAgICAqL1xuICAgIHR5cGU6IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yVHlwZTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgY29sb3IuXG4gICAgICovXG4gICAgdGFyZ2V0VmFsdWU6IFRIUkVFLkNvbG9yO1xuICB9KSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy50YXJnZXRWYWx1ZSA9IHRhcmdldFZhbHVlO1xuXG4gICAgLy8gaW5pdCBwcm9wZXJ0eSBuYW1lXG4gICAgY29uc3QgcHJvcGVydHlOYW1lTWFwID0gT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kLl9wcm9wZXJ0eU5hbWVNYXBNYXApLmZpbmQoXG4gICAgICAoW2Rpc3Rpbmd1aXNoZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiAobWF0ZXJpYWwgYXMgYW55KVtkaXN0aW5ndWlzaGVyXSA9PT0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgKT8uWzFdO1xuICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZU1hcD8uW3R5cGVdID8/IG51bGw7XG5cbiAgICBpZiAocHJvcGVydHlOYW1lID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIG1hdGVyaWFsIGNvbG9yIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9LCB0aGUgdHlwZSAke3R5cGV9IGJ1dCB0aGUgbWF0ZXJpYWwgb3IgdGhlIHR5cGUgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdIGFzIFRIUkVFLkNvbG9yO1xuXG4gICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB0YXJnZXQuY2xvbmUoKTtcblxuICAgICAgLy8g6LKg44Gu5YCk44KS5L+d5oyB44GZ44KL44Gf44KB44GrQ29sb3Iuc3Vi44KS5L2/44KP44Ga44Gr5beu5YiG44KS6KiI566X44GZ44KLXG4gICAgICBjb25zdCBkZWx0YVZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKFxuICAgICAgICB0YXJnZXRWYWx1ZS5yIC0gaW5pdGlhbFZhbHVlLnIsXG4gICAgICAgIHRhcmdldFZhbHVlLmcgLSBpbml0aWFsVmFsdWUuZyxcbiAgICAgICAgdGFyZ2V0VmFsdWUuYiAtIGluaXRpYWxWYWx1ZS5iLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSB7XG4gICAgICAgIHByb3BlcnR5TmFtZSxcbiAgICAgICAgaW5pdGlhbFZhbHVlLFxuICAgICAgICBkZWx0YVZhbHVlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbHlXZWlnaHQod2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gbnVsbCkge1xuICAgICAgLy8gd2FybmluZyBpcyBhbHJlYWR5IGVtaXR0ZWQgaW4gY29uc3RydWN0b3JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgZGVsdGFWYWx1ZSB9ID0gdGhpcy5fc3RhdGU7XG5cbiAgICBjb25zdCB0YXJnZXQgPSAodGhpcy5tYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV0gYXMgVEhSRUUuQ29sb3I7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgdGFyZ2V0LmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3ZWlnaHQpKTtcblxuICAgIGlmICh0eXBlb2YgKHRoaXMubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID09PSAnYm9vbGVhbicpIHtcbiAgICAgICh0aGlzLm1hdGVyaWFsIGFzIGFueSkuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gbnVsbCkge1xuICAgICAgLy8gd2FybmluZyBpcyBhbHJlYWR5IGVtaXR0ZWQgaW4gY29uc3RydWN0b3JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlIH0gPSB0aGlzLl9zdGF0ZTtcblxuICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5Db2xvcjtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICB0YXJnZXQuY29weShpbml0aWFsVmFsdWUpO1xuXG4gICAgaWYgKHR5cGVvZiAodGhpcy5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgKHRoaXMubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG4vKipcbiAqIEEgYmluZCBvZiB7QGxpbmsgVlJNRXhwcmVzc2lvbn0gaW5mbHVlbmNlcyB0byBtb3JwaCB0YXJnZXRzLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCBpbXBsZW1lbnRzIFZSTUV4cHJlc3Npb25CaW5kIHtcbiAgLyoqXG4gICAqIFRoZSBtZXNoIHByaW1pdGl2ZXMgdGhhdCBhdHRhY2hlZCB0byB0YXJnZXQgbWVzaC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBwcmltaXRpdmVzOiBUSFJFRS5NZXNoW107XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWlnaHQgdmFsdWUgb2YgdGFyZ2V0IG1vcnBoIHRhcmdldC4gUmFuZ2luZyBpbiBbMC4wIC0gMS4wXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSB3ZWlnaHQ6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Ioe1xuICAgIHByaW1pdGl2ZXMsXG4gICAgaW5kZXgsXG4gICAgd2VpZ2h0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIG1lc2ggcHJpbWl0aXZlcyB0aGF0IGF0dGFjaGVkIHRvIHRhcmdldCBtZXNoLlxuICAgICAqL1xuICAgIHByaW1pdGl2ZXM6IFRIUkVFLk1lc2hbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgbW9ycGggdGFyZ2V0IGluIHRoZSBtZXNoLlxuICAgICAqL1xuICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgd2VpZ2h0IHZhbHVlIG9mIHRhcmdldCBtb3JwaCB0YXJnZXQuIFJhbmdpbmcgaW4gWzAuMCAtIDEuMF0uXG4gICAgICovXG4gICAgd2VpZ2h0OiBudW1iZXI7XG4gIH0pIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseVdlaWdodCh3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucHJpbWl0aXZlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICBpZiAobWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXM/Llt0aGlzLmluZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW3RoaXMuaW5kZXhdICs9IHRoaXMud2VpZ2h0ICogd2VpZ2h0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLnByaW1pdGl2ZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzPy5bdGhpcy5pbmRleF0gIT0gbnVsbCkge1xuICAgICAgICBtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1t0aGlzLmluZGV4XSA9IDAuMDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1FeHByZXNzaW9uQmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbkJpbmQnO1xuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG4vKipcbiAqIEEgYmluZCBvZiBleHByZXNzaW9uIGluZmx1ZW5jZXMgdG8gdGV4dHVyZSB0cmFuc2Zvcm1zLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIGltcGxlbWVudHMgVlJNRXhwcmVzc2lvbkJpbmQge1xuICBwcml2YXRlIHN0YXRpYyBfcHJvcGVydHlOYW1lc01hcDogeyBbZGlzdGluZ3Vpc2hlcjogc3RyaW5nXTogc3RyaW5nW10gfSA9IHtcbiAgICBpc01lc2hTdGFuZGFyZE1hdGVyaWFsOiBbXG4gICAgICAnbWFwJyxcbiAgICAgICdlbWlzc2l2ZU1hcCcsXG4gICAgICAnYnVtcE1hcCcsXG4gICAgICAnbm9ybWFsTWFwJyxcbiAgICAgICdkaXNwbGFjZW1lbnRNYXAnLFxuICAgICAgJ3JvdWdobmVzc01hcCcsXG4gICAgICAnbWV0YWxuZXNzTWFwJyxcbiAgICAgICdhbHBoYU1hcCcsXG4gICAgXSxcbiAgICBpc01lc2hCYXNpY01hdGVyaWFsOiBbJ21hcCcsICdzcGVjdWxhck1hcCcsICdhbHBoYU1hcCddLFxuICAgIGlzTVRvb25NYXRlcmlhbDogW1xuICAgICAgJ21hcCcsXG4gICAgICAnbm9ybWFsTWFwJyxcbiAgICAgICdlbWlzc2l2ZU1hcCcsXG4gICAgICAnc2hhZGVNdWx0aXBseVRleHR1cmUnLFxuICAgICAgJ3JpbU11bHRpcGx5VGV4dHVyZScsXG4gICAgICAnb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlJyxcbiAgICAgICd1dkFuaW1hdGlvbk1hc2tUZXh0dXJlJyxcbiAgICBdLFxuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcblxuICAvKipcbiAgICogVGhlIHV2IHNjYWxlIG9mIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHNjYWxlOiBUSFJFRS5WZWN0b3IyO1xuXG4gIC8qKlxuICAgKiBUaGUgdXYgb2Zmc2V0IG9mIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG9mZnNldDogVEhSRUUuVmVjdG9yMjtcblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgdGV4dHVyZSBuYW1lcyBhbmQgaXRzIHN0YXRlIHRoYXQgc2hvdWxkIGJlIHRyYW5zZm9ybWVkIGJ5IHRoaXMgYmluZC5cbiAgICovXG4gIHByaXZhdGUgX3Byb3BlcnRpZXM6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdGlhbE9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgICBpbml0aWFsU2NhbGU6IFRIUkVFLlZlY3RvcjI7XG4gICAgZGVsdGFPZmZzZXQ6IFRIUkVFLlZlY3RvcjI7XG4gICAgZGVsdGFTY2FsZTogVEhSRUUuVmVjdG9yMjtcbiAgfVtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih7XG4gICAgbWF0ZXJpYWwsXG4gICAgc2NhbGUsXG4gICAgb2Zmc2V0LFxuICB9OiB7XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXYgc2NhbGUgb2YgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgc2NhbGU6IFRIUkVFLlZlY3RvcjI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXYgb2Zmc2V0IG9mIHRoZSB0ZXh0dXJlLlxuICAgICAqL1xuICAgIG9mZnNldDogVEhSRUUuVmVjdG9yMjtcbiAgfSkge1xuICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmVudHJpZXMoVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kLl9wcm9wZXJ0eU5hbWVzTWFwKS5maW5kKFxuICAgICAgKFtkaXN0aW5ndWlzaGVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gKG1hdGVyaWFsIGFzIGFueSlbZGlzdGluZ3Vpc2hlcl0gPT09IHRydWU7XG4gICAgICB9LFxuICAgICk/LlsxXTtcblxuICAgIGlmIChwcm9wZXJ0eU5hbWVzID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyaWVkIHRvIGFkZCBhIHRleHR1cmUgdHJhbnNmb3JtIGJpbmQgdG8gdGhlIG1hdGVyaWFsICR7XG4gICAgICAgICAgbWF0ZXJpYWwubmFtZSA/PyAnKG5vIG5hbWUpJ1xuICAgICAgICB9IGJ1dCB0aGUgbWF0ZXJpYWwgaXMgbm90IHN1cHBvcnRlZC5gLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fcHJvcGVydGllcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XG5cbiAgICAgIHByb3BlcnR5TmFtZXMuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSAoKG1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHlOYW1lXSBhcyBUSFJFRS5UZXh0dXJlIHwgdW5kZWZpbmVkKT8uY2xvbmUoKTtcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdID0gdGV4dHVyZTsgLy8gYmVjYXVzZSB0aGUgdGV4dHVyZSBpcyBjbG9uZWRcblxuICAgICAgICBjb25zdCBpbml0aWFsT2Zmc2V0ID0gdGV4dHVyZS5vZmZzZXQuY2xvbmUoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbFNjYWxlID0gdGV4dHVyZS5yZXBlYXQuY2xvbmUoKTtcbiAgICAgICAgY29uc3QgZGVsdGFPZmZzZXQgPSBvZmZzZXQuY2xvbmUoKS5zdWIoaW5pdGlhbE9mZnNldCk7XG4gICAgICAgIGNvbnN0IGRlbHRhU2NhbGUgPSBzY2FsZS5jbG9uZSgpLnN1Yihpbml0aWFsU2NhbGUpO1xuXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgICAgIGluaXRpYWxPZmZzZXQsXG4gICAgICAgICAgZGVsdGFPZmZzZXQsXG4gICAgICAgICAgaW5pdGlhbFNjYWxlLFxuICAgICAgICAgIGRlbHRhU2NhbGUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFwcGx5V2VpZ2h0KHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gKHRoaXMubWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eS5uYW1lXSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgdGFyZ2V0Lm9mZnNldC5hZGQoX3YyLmNvcHkocHJvcGVydHkuZGVsdGFPZmZzZXQpLm11bHRpcGx5U2NhbGFyKHdlaWdodCkpO1xuICAgICAgdGFyZ2V0LnJlcGVhdC5hZGQoX3YyLmNvcHkocHJvcGVydHkuZGVsdGFTY2FsZSkubXVsdGlwbHlTY2FsYXIod2VpZ2h0KSk7XG5cbiAgICAgIHRhcmdldC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJBcHBsaWVkV2VpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9ICh0aGlzLm1hdGVyaWFsIGFzIGFueSlbcHJvcGVydHkubmFtZV0gYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIHRhcmdldC5vZmZzZXQuY29weShwcm9wZXJ0eS5pbml0aWFsT2Zmc2V0KTtcbiAgICAgIHRhcmdldC5yZXBlYXQuY29weShwcm9wZXJ0eS5pbml0aWFsU2NhbGUpO1xuXG4gICAgICB0YXJnZXQubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSAqIGFzIFYwVlJNIGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCB0eXBlICogYXMgVjFWUk1TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtdnJtLTEuMCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgeyBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZSB9IGZyb20gJy4uL3V0aWxzL2dsdGZFeHRyYWN0UHJpbWl0aXZlc0Zyb21Ob2RlJztcbmltcG9ydCB7IGdsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCB9IGZyb20gJy4uL3V0aWxzL2dsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvclR5cGUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1hdGVyaWFsQ29sb3JCaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uTWF0ZXJpYWxDb2xvckJpbmQnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCB9IGZyb20gJy4vVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCc7XG5pbXBvcnQgeyBWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSB9IGZyb20gJy4vVlJNRXhwcmVzc2lvblByZXNldE5hbWUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kIH0gZnJvbSAnLi9WUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG4vKipcbiAqIFBvc3NpYmxlIHNwZWMgdmVyc2lvbnMgaXQgcmVjb2duaXplcy5cbiAqL1xuY29uc3QgUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyA9IG5ldyBTZXQoWycxLjAnLCAnMS4wLWJldGEnXSk7XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSB2MHYxUHJlc2V0TmFtZU1hcDogeyBbdjBOYW1lIGluIFYwVlJNLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IFZSTUV4cHJlc3Npb25QcmVzZXROYW1lIH0gPSB7XG4gICAgYTogJ2FhJyxcbiAgICBlOiAnZWUnLFxuICAgIGk6ICdpaCcsXG4gICAgbzogJ29oJyxcbiAgICB1OiAnb3UnLFxuICAgIGJsaW5rOiAnYmxpbmsnLFxuICAgIGpveTogJ2hhcHB5JyxcbiAgICBhbmdyeTogJ2FuZ3J5JyxcbiAgICBzb3Jyb3c6ICdzYWQnLFxuICAgIGZ1bjogJ3JlbGF4ZWQnLFxuICAgIGxvb2t1cDogJ2xvb2tVcCcsXG4gICAgbG9va2Rvd246ICdsb29rRG93bicsXG4gICAgbG9va2xlZnQ6ICdsb29rTGVmdCcsXG4gICAgbG9va3JpZ2h0OiAnbG9va1JpZ2h0JyxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgYmxpbmtfbDogJ2JsaW5rTGVmdCcsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgIGJsaW5rX3I6ICdibGlua1JpZ2h0JyxcbiAgICBuZXV0cmFsOiAnbmV1dHJhbCcsXG4gIH07XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybUV4cHJlc3Npb25NYW5hZ2VyID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmKTtcbiAgICBpZiAodjFSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MVJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2MFJlc3VsdCA9IGF3YWl0IHRoaXMuX3YwSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzcGVjVmVyc2lvbiA9IGV4dGVuc2lvbi5zcGVjVmVyc2lvbjtcbiAgICBpZiAoIVBPU1NJQkxFX1NQRUNfVkVSU0lPTlMuaGFzKHNwZWNWZXJzaW9uKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBVbmtub3duIFZSTUNfdnJtIHNwZWNWZXJzaW9uIFwiJHtzcGVjVmVyc2lvbn1cImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRXhwcmVzc2lvbnMgPSBleHRlbnNpb24uZXhwcmVzc2lvbnM7XG4gICAgaWYgKCFzY2hlbWFFeHByZXNzaW9ucykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBleHByZXNzaW9uc1xuICAgIGNvbnN0IHByZXNldE5hbWVTZXQgPSBuZXcgU2V0PHN0cmluZz4oT2JqZWN0LnZhbHVlcyhWUk1FeHByZXNzaW9uUHJlc2V0TmFtZSkpO1xuICAgIGNvbnN0IG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwID0gbmV3IE1hcDxzdHJpbmcsIFYxVlJNU2NoZW1hLkV4cHJlc3Npb24+KCk7XG5cbiAgICBpZiAoc2NoZW1hRXhwcmVzc2lvbnMucHJlc2V0ICE9IG51bGwpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUV4cHJlc3Npb25zLnByZXNldCkuZm9yRWFjaCgoW25hbWUsIHNjaGVtYUV4cHJlc3Npb25dKSA9PiB7XG4gICAgICAgIGlmIChzY2hlbWFFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gdHlwZXNjcmlwdFxuXG4gICAgICAgIGlmICghcHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46IFVua25vd24gcHJlc2V0IG5hbWUgXCIke25hbWV9XCIgZGV0ZWN0ZWQuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuc2V0KG5hbWUsIHNjaGVtYUV4cHJlc3Npb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYUV4cHJlc3Npb25zLmN1c3RvbSAhPSBudWxsKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhzY2hlbWFFeHByZXNzaW9ucy5jdXN0b20pLmZvckVhY2goKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBpZiAocHJlc2V0TmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQ3VzdG9tIGV4cHJlc3Npb24gY2Fubm90IGhhdmUgcHJlc2V0IG5hbWUgXCIke25hbWV9XCIuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVTY2hlbWFFeHByZXNzaW9uTWFwLnNldChuYW1lLCBzY2hlbWFFeHByZXNzaW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmUgbWFuYWdlclxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNRXhwcmVzc2lvbk1hbmFnZXIoKTtcblxuICAgIC8vIGxvYWQgZXhwcmVzc2lvbnNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIEFycmF5LmZyb20obmFtZVNjaGVtYUV4cHJlc3Npb25NYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtuYW1lLCBzY2hlbWFFeHByZXNzaW9uXSkgPT4ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFFeHByZXNzaW9uLmlzQmluYXJ5ID8/IGZhbHNlO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPSBzY2hlbWFFeHByZXNzaW9uLm92ZXJyaWRlQmxpbmsgPz8gJ25vbmUnO1xuICAgICAgICBleHByZXNzaW9uLm92ZXJyaWRlTG9va0F0ID0gc2NoZW1hRXhwcmVzc2lvbi5vdmVycmlkZUxvb2tBdCA/PyAnbm9uZSc7XG4gICAgICAgIGV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA9IHNjaGVtYUV4cHJlc3Npb24ub3ZlcnJpZGVNb3V0aCA/PyAnbm9uZSc7XG5cbiAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tb3JwaFRhcmdldEJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSAoYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUoZ2x0ZiwgYmluZC5ub2RlKSkhO1xuICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuXG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG1lc2ggaGFzIHRoZSB0YXJnZXQgbW9ycGggdGFyZ2V0XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByaW1pdGl2ZXMuZXZlcnkoXG4gICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPCBwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzLmxlbmd0aCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW46ICR7c2NoZW1hRXhwcmVzc2lvbi5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCBtb3JwaCAjJHttb3JwaFRhcmdldEluZGV4fSBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uYWRkQmluZChcbiAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uTW9ycGhUYXJnZXRCaW5kKHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlcyxcbiAgICAgICAgICAgICAgaW5kZXg6IG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgPz8gMS4wLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYUV4cHJlc3Npb24ubWF0ZXJpYWxDb2xvckJpbmRzIHx8IHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzKSB7XG4gICAgICAgICAgLy8gbGlzdCB1cCBldmVyeSBtYXRlcmlhbCBpbiBgZ2x0Zi5zY2VuZWBcbiAgICAgICAgICBjb25zdCBnbHRmTWF0ZXJpYWxzOiBUSFJFRS5NYXRlcmlhbFtdID0gW107XG4gICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbCkge1xuICAgICAgICAgICAgICBnbHRmTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2NoZW1hRXhwcmVzc2lvbi5tYXRlcmlhbENvbG9yQmluZHM/LmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFscyA9IGdsdGZNYXRlcmlhbHMuZmlsdGVyKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbEluZGV4ID0gZ2x0ZkdldEFzc29jaWF0ZWRNYXRlcmlhbEluZGV4KHRoaXMucGFyc2VyLCBtYXRlcmlhbCk7XG4gICAgICAgICAgICAgIHJldHVybiBiaW5kLm1hdGVyaWFsID09PSBtYXRlcmlhbEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCh7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGJpbmQudHlwZSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoKS5mcm9tQXJyYXkoYmluZC50YXJnZXRWYWx1ZSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNjaGVtYUV4cHJlc3Npb24udGV4dHVyZVRyYW5zZm9ybUJpbmRzPy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBnbHRmTWF0ZXJpYWxzLmZpbHRlcigobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxJbmRleCA9IGdsdGZHZXRBc3NvY2lhdGVkTWF0ZXJpYWxJbmRleCh0aGlzLnBhcnNlciwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgICByZXR1cm4gYmluZC5tYXRlcmlhbCA9PT0gbWF0ZXJpYWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgIG5ldyBWUk1FeHByZXNzaW9uVGV4dHVyZVRyYW5zZm9ybUJpbmQoe1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICBvZmZzZXQ6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQub2Zmc2V0ID8/IFswLjAsIDAuMF0pLFxuICAgICAgICAgICAgICAgICAgc2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGJpbmQuc2NhbGUgPz8gWzEuMCwgMS4wXSksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZSA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWFuYWdlciA9IG5ldyBWUk1FeHByZXNzaW9uTWFuYWdlcigpO1xuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZUdyb3VwcyA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBtYW5hZ2VyO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVOYW1lU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHNjaGVtYUJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCB2MFByZXNldE5hbWUgPSBzY2hlbWFHcm91cC5wcmVzZXROYW1lO1xuICAgICAgICBjb25zdCB2MVByZXNldE5hbWUgPVxuICAgICAgICAgICh2MFByZXNldE5hbWUgIT0gbnVsbCAmJiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luLnYwdjFQcmVzZXROYW1lTWFwW3YwUHJlc2V0TmFtZV0pIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB2MVByZXNldE5hbWUgPz8gc2NoZW1hR3JvdXAubmFtZTtcblxuICAgICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luOiBPbmUgb2YgY3VzdG9tIGV4cHJlc3Npb25zIGhhcyBubyBuYW1lLiBJZ25vcmluZyB0aGUgZXhwcmVzc2lvbicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGR1cGxpY2F0aW9uIGNoZWNrXG4gICAgICAgIGlmIChibGVuZFNoYXBlTmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogQW4gZXhwcmVzc2lvbiBwcmVzZXQgJHt2MFByZXNldE5hbWV9IGhhcyBkdXBsaWNhdGVkIGVudHJpZXMuIElnbm9yaW5nIHRoZSBleHByZXNzaW9uYCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsZW5kU2hhcGVOYW1lU2V0LmFkZChuYW1lKTtcblxuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gbmV3IFZSTUV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGV4cHJlc3Npb24pO1xuXG4gICAgICAgIGV4cHJlc3Npb24uaXNCaW5hcnkgPSBzY2hlbWFHcm91cC5pc0JpbmFyeSA/PyBmYWxzZTtcbiAgICAgICAgLy8gdjAgZG9lc24ndCBoYXZlIGlnbm9yZSBwcm9wZXJ0aWVzXG5cbiAgICAgICAgLy8gQmluZCBtb3JwaFRhcmdldFxuICAgICAgICBpZiAoc2NoZW1hR3JvdXAuYmluZHMpIHtcbiAgICAgICAgICBzY2hlbWFHcm91cC5iaW5kcy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgICBpZiAoYmluZC5tZXNoID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm9kZXNVc2luZ01lc2g6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBqc29uLm5vZGVzPy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLm1lc2ggPT09IGJpbmQubWVzaCkge1xuICAgICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLnB1c2goaSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcblxuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgIG5vZGVzVXNpbmdNZXNoLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IChhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZShnbHRmLCBub2RlSW5kZXgpKSE7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbWVzaCBoYXMgdGhlIHRhcmdldCBtb3JwaCB0YXJnZXRcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICBgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvbk1vcnBoVGFyZ2V0QmluZCh7XG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDAuMDEgKiAoYmluZC53ZWlnaHQgPz8gMTAwKSwgLy8gbmFycm93aW5nIHRoZSByYW5nZSBmcm9tIFsgMC4wIC0gMTAwLjAgXSB0byBbIDAuMCAtIDEuMCBdXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCaW5kIE1hdGVyaWFsQ29sb3IgYW5kIFRleHR1cmVUcmFuc2Zvcm1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzICYmIG1hdGVyaWFsVmFsdWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiDjgqLjg5Djgr/jg7zjga7jgqrjg5bjgrjjgqfjgq/jg4jjgavoqK3lrprjgZXjgozjgabjgYTjgovjg57jg4bjg6rjgqLjg6vjga7lhoXjgYvjgolcbiAgICAgICAgICAgICAqIG1hdGVyaWFsVmFsdWXjgafmjIflrprjgZXjgozjgabjgYTjgovjg57jg4bjg6rjgqLjg6vjgpLpm4bjgoHjgovjgIJcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiDnibnlrprjgavjga/lkI3liY3jgpLkvb/nlKjjgZnjgovjgIJcbiAgICAgICAgICAgICAqIOOCouOCpuODiOODqeOCpOODs+aPj+eUu+eUqOOBruODnuODhuODquOCouODq+OCguWQjOaZguOBq+mbhuOCgeOCi+OAglxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIChtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgKyAnIChPdXRsaW5lKScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPSBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAvLyBUZXh0dXJlVHJhbnNmb3JtQmluZFxuICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxQcm9wZXJ0eU5hbWUgPT09ICdfTWFpblRleF9TVCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzBdLCBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIVsxXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIobWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSFbMl0sIG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhWzNdKTtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uLmFkZEJpbmQoXG4gICAgICAgICAgICAgICAgICBuZXcgVlJNRXhwcmVzc2lvblRleHR1cmVUcmFuc2Zvcm1CaW5kKHtcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gTWF0ZXJpYWxDb2xvckJpbmRcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxDb2xvclR5cGUgPSB2MEV4cHJlc3Npb25NYXRlcmlhbENvbG9yTWFwW21hdGVyaWFsUHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5hZGRCaW5kKFxuICAgICAgICAgICAgICAgICAgbmV3IFZSTUV4cHJlc3Npb25NYXRlcmlhbENvbG9yQmluZCh7XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBtYXRlcmlhbENvbG9yVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG5ldyBUSFJFRS5Db2xvciguLi5tYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlIS5zbGljZSgwLCAzKSksXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1hdGVyaWFsUHJvcGVydHlOYW1lICsgJyBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXJFeHByZXNzaW9uKGV4cHJlc3Npb24pO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYW5hZ2VyO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUV4cHJlc3Npb25PdmVycmlkZVR5cGUgPSB7XG4gIE5vbmU6ICdub25lJyxcbiAgQmxvY2s6ICdibG9jaycsXG4gIEJsZW5kOiAnYmxlbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNRXhwcmVzc2lvbk92ZXJyaWRlVHlwZSA9IHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlW2tleW9mIHR5cGVvZiBWUk1FeHByZXNzaW9uT3ZlcnJpZGVUeXBlXTtcbiIsImltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRGaXJzdFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUiA9IDk7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0VGhpcmRQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHB1YmxpYyBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXTtcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUjtcbiAgcHJpdmF0ZSBfdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVI7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWRMYXllcnMgPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUZpcnN0UGVyc29uIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gbWVzaEFubm90YXRpb25zIEEgcmVuZGVyZXIgc2V0dGluZ3MuIFNlZSB0aGUgZGVzY3JpcHRpb24gb2YgW1tSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NdXSBmb3IgbW9yZSBpbmZvXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucyA9IG1lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGludG8gdGhpcyBvbmUuXG4gICAqIHtAbGluayBodW1hbm9pZH0gbXVzdCBiZSBzYW1lIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IHlvdSB3YW50IHRvIGNvcHlcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgcHVibGljIGNvcHkoc291cmNlOiBWUk1GaXJzdFBlcnNvbik6IHRoaXMge1xuICAgIGlmICh0aGlzLmh1bWFub2lkICE9PSBzb3VyY2UuaHVtYW5vaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVlJNRmlyc3RQZXJzb246IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXNoQW5ub3RhdGlvbnMgPSBzb3VyY2UubWVzaEFubm90YXRpb25zLm1hcCgoYW5ub3RhdGlvbikgPT4gKHtcbiAgICAgIG1lc2hlczogYW5ub3RhdGlvbi5tZXNoZXMuY29uY2F0KCksXG4gICAgICB0eXBlOiBhbm5vdGF0aW9uLnR5cGUsXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoaXMge0BsaW5rIFZSTUZpcnN0UGVyc29ufS5cbiAgICogQHJldHVybnMgQ29waWVkIHtAbGluayBWUk1GaXJzdFBlcnNvbn1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1GaXJzdFBlcnNvbiB7XG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbih0aGlzLmh1bWFub2lkLCB0aGlzLm1lc2hBbm5vdGF0aW9ucykuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIHtAbGluayBzZXR1cH0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMge0BsaW5rIERFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUn0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIHtAbGluayBzZXR1cH0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZpcnN0UGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwge0BsaW5rIHNldHVwfSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyB7QGxpbmsgREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSfSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEge0BsaW5rIHNldHVwfSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgdGhpcmRQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW4gdGhpcyBtZXRob2QsIGl0IGFzc2lnbnMgbGF5ZXJzIGZvciBldmVyeSBtZXNoZXMgYmFzZWQgb24gbWVzaCBhbm5vdGF0aW9ucy5cbiAgICogWW91IG11c3QgY2FsbCB0aGlzIG1ldGhvZCBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZS5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIFtWUk1GaXJzdFBlcnNvbi5TZXR1cF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iLzczYTViZDhmY2RkYWEyYTdhODczNTA5OWE5N2U2M2M5ZGIzZTVlYTAvQXNzZXRzL1ZSTS9SdW50aW1lL0ZpcnN0UGVyc29uL1ZSTUZpcnN0UGVyc29uLmNzI0wyOTUtTDI5OSkgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIsXG4gICAgdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIsXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZExheWVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLm1lc2hBbm5vdGF0aW9ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdmaXJzdFBlcnNvbk9ubHknKSB7XG4gICAgICAgICAgbWVzaC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgICBtZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3RoaXJkUGVyc29uT25seScpIHtcbiAgICAgICAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICAgIG1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnYXV0bycpIHtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsKG1lc2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2luaXRpYWxpemVkTGF5ZXJzID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnk7XG5cbiAgICBjb25zdCBza2luSW5kZXhBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKS5hcnJheTtcbiAgICBjb25zdCBza2luSW5kZXggPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5JbmRleC5wdXNoKFtza2luSW5kZXhBdHRyW2ldLCBza2luSW5kZXhBdHRyW2kgKyAxXSwgc2tpbkluZGV4QXR0cltpICsgMl0sIHNraW5JbmRleEF0dHJbaSArIDNdXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKS5hcnJheTtcbiAgICBjb25zdCBza2luV2VpZ2h0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luV2VpZ2h0QXR0ci5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbldlaWdodC5wdXNoKFtza2luV2VpZ2h0QXR0cltpXSwgc2tpbldlaWdodEF0dHJbaSArIDFdLCBza2luV2VpZ2h0QXR0cltpICsgMl0sIHNraW5XZWlnaHRBdHRyW2kgKyAzXV0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kZXgoKTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VvbWV0cnkgZG9lc24ndCBoYXZlIGFuIGluZGV4IGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVHJpYW5nbGVzID0gQXJyYXkuZnJvbShpbmRleC5hcnJheSk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2V4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50OiBUSFJFRS5PYmplY3QzRCwgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBlcmFzZUJvbmVJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIG1lc2guc2tlbGV0b24uYm9uZXMuZm9yRWFjaCgoYm9uZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUpKSBlcmFzZUJvbmVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gVW5saWtlIFVuaVZSTSB3ZSBkb24ndCBjb3B5IG1lc2ggaWYgbm8gaW52aXNpYmxlIGJvbmUgd2FzIGZvdW5kXG4gICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgY29uc3QgbmV3TWVzaCA9IHRoaXMuX2NyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWwobm9kZTogVEhSRUUuT2JqZWN0M0QpOiB2b2lkIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAnR3JvdXAnKSB7XG4gICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBwYXJlbnQubmFtZSA9IGBfaGVhZGxlc3NfJHtub2RlLm5hbWV9YDtcbiAgICAgICAgcGFyZW50LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnBhcmVudCEuYWRkKHBhcmVudCk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudHlwZSA9PT0gJ1NraW5uZWRNZXNoJylcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gY2hpbGQgYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50LCBza2lubmVkTWVzaCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIGNvbnN0IHNraW5uZWRNZXNoID0gbm9kZSBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChub2RlLnBhcmVudCEsIHNraW5uZWRNZXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0VyYXNlVGFyZ2V0KGJvbmU6IFRIUkVFLk9iamVjdDNEKTogYm9vbGVhbiB7XG4gICAgaWYgKGJvbmUgPT09IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQvVlJNSHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzIH0gZnJvbSAnLi4vdXRpbHMvZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB0eXBlIHsgVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbiB9IGZyb20gJy4vVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1GaXJzdFBlcnNvbn0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNRmlyc3RQZXJzb259IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSB7QGxpbmsgVlJNSHVtYW5vaWR9IGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuXG4gIHByaXZhdGUgYXN5bmMgX2ltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQgfCBudWxsKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdjFSZXN1bHQgPSBhd2FpdCB0aGlzLl92MUltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCk7XG4gICAgaWYgKHYwUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjBSZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MUltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IGV4dGVuc2lvbi5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25bXSA9IFtdO1xuICAgIGNvbnN0IG5vZGVQcmltaXRpdmVzTWFwID0gYXdhaXQgZ2x0ZkV4dHJhY3RQcmltaXRpdmVzRnJvbU5vZGVzKGdsdGYpO1xuICAgIEFycmF5LmZyb20obm9kZVByaW1pdGl2ZXNNYXAuZW50cmllcygpKS5mb3JFYWNoKChbbm9kZUluZGV4LCBwcmltaXRpdmVzXSkgPT4ge1xuICAgICAgY29uc3QgYW5ub3RhdGlvbiA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm5vZGUgPT09IG5vZGVJbmRleClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG1lc2hBbm5vdGF0aW9ucy5wdXNoKHtcbiAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICB0eXBlOiBhbm5vdGF0aW9uPy50eXBlID8/ICdib3RoJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihodW1hbm9pZCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YwSW1wb3J0KGdsdGY6IEdMVEYsIGh1bWFub2lkOiBWUk1IdW1hbm9pZCk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHZybUV4dCA9IGpzb24uZXh0ZW5zaW9ucz8uVlJNIGFzIFYwVlJNLlZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFYwVlJNLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hBbm5vdGF0aW9uczogVlJNRmlyc3RQZXJzb25NZXNoQW5ub3RhdGlvbltdID0gW107XG4gICAgY29uc3Qgbm9kZVByaW1pdGl2ZXNNYXAgPSBhd2FpdCBnbHRmRXh0cmFjdFByaW1pdGl2ZXNGcm9tTm9kZXMoZ2x0Zik7XG5cbiAgICBBcnJheS5mcm9tKG5vZGVQcmltaXRpdmVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW25vZGVJbmRleCwgcHJpbWl0aXZlc10pID0+IHtcbiAgICAgIGNvbnN0IHNjaGVtYU5vZGUgPSBqc29uLm5vZGVzIVtub2RlSW5kZXhdO1xuXG4gICAgICBjb25zdCBmbGFnID0gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zXG4gICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoKGEpID0+IGEubWVzaCA9PT0gc2NoZW1hTm9kZS5tZXNoKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2goe1xuICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgIHR5cGU6IHRoaXMuX2NvbnZlcnRWMEZsYWdUb1YxVHlwZShmbGFnPy5maXJzdFBlcnNvbkZsYWcpLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFZSTUZpcnN0UGVyc29uKGh1bWFub2lkLCBtZXNoQW5ub3RhdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydFYwRmxhZ1RvVjFUeXBlKGZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlIHtcbiAgICBpZiAoZmxhZyA9PT0gJ0ZpcnN0UGVyc29uT25seScpIHtcbiAgICAgIHJldHVybiAnZmlyc3RQZXJzb25Pbmx5JztcbiAgICB9IGVsc2UgaWYgKGZsYWcgPT09ICdUaGlyZFBlcnNvbk9ubHknKSB7XG4gICAgICByZXR1cm4gJ3RoaXJkUGVyc29uT25seSc7XG4gICAgfSBlbHNlIGlmIChmbGFnID09PSAnQXV0bycpIHtcbiAgICAgIHJldHVybiAnYXV0byc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnYm90aCc7XG4gICAgfVxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuZXhwb3J0IGNvbnN0IFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID0ge1xuICBBdXRvOiAnYXV0bycsXG4gIEJvdGg6ICdib3RoJyxcbiAgVGhpcmRQZXJzb25Pbmx5OiAndGhpcmRQZXJzb25Pbmx5JyxcbiAgRmlyc3RQZXJzb25Pbmx5OiAnZmlyc3RQZXJzb25Pbmx5Jyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlID1cbiAgdHlwZW9mIFZSTUZpcnN0UGVyc29uTWVzaEFubm90YXRpb25UeXBlW2tleW9mIHR5cGVvZiBWUk1GaXJzdFBlcnNvbk1lc2hBbm5vdGF0aW9uVHlwZV07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9WUk1IdW1hbm9pZCc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1IdW1hbm9pZDogVlJNSHVtYW5vaWQ7XG4gIHByaXZhdGUgX2JvbmVBeGVzTWFwOiBNYXA8VlJNSHVtYW5Cb25lLCBUSFJFRS5BeGVzSGVscGVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5vaWQ6IFZSTUh1bWFub2lkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudnJtSHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMuX2JvbmVBeGVzTWFwID0gbmV3IE1hcCgpO1xuXG4gICAgT2JqZWN0LnZhbHVlcyhodW1hbm9pZC5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxLjApO1xuXG4gICAgICBoZWxwZXIubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAoaGVscGVyLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAgIChoZWxwZXIubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoV3JpdGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5hZGQoaGVscGVyKTtcblxuICAgICAgLy8gVE9ETzogdHlwZSBhc3NlcnRpb24gaXMgbm90IG5lZWRlZCBpbiBsYXRlciB2ZXJzaW9ucyBvZiBUeXBlU2NyaXB0XG4gICAgICB0aGlzLl9ib25lQXhlc01hcC5zZXQoYm9uZSEsIGhlbHBlcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLnZhbHVlcygpKS5mb3JFYWNoKChheGVzKSA9PiB7XG4gICAgICBheGVzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIChheGVzLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuX2JvbmVBeGVzTWFwLmVudHJpZXMoKSkuZm9yRWFjaCgoW2JvbmUsIGF4ZXNdKSA9PiB7XG4gICAgICBib25lLm5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuXG4gICAgICBib25lLm5vZGUubWF0cml4V29ybGQuZGVjb21wb3NlKF92M0EsIF9xdWF0QSwgX3YzQik7XG5cbiAgICAgIGNvbnN0IHNjYWxlID0gX3YzQS5zZXQoMC4xLCAwLjEsIDAuMSkuZGl2aWRlKF92M0IpO1xuICAgICAgYXhlcy5tYXRyaXguY29weShib25lLm5vZGUubWF0cml4V29ybGQpLnNjYWxlKHNjYWxlKTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnVwZGF0ZU1hdHJpeFdvcmxkKGZvcmNlKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS4gRGVwZW5kZW5jeSBhd2FyZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZUxpc3Q6IFZSTUh1bWFuQm9uZU5hbWVbXSA9IFtcbiAgJ2hpcHMnLFxuICAnc3BpbmUnLFxuICAnY2hlc3QnLFxuICAndXBwZXJDaGVzdCcsXG4gICduZWNrJyxcblxuICAnaGVhZCcsXG4gICdsZWZ0RXllJyxcbiAgJ3JpZ2h0RXllJyxcbiAgJ2phdycsXG5cbiAgJ2xlZnRVcHBlckxlZycsXG4gICdsZWZ0TG93ZXJMZWcnLFxuICAnbGVmdEZvb3QnLFxuICAnbGVmdFRvZXMnLFxuXG4gICdyaWdodFVwcGVyTGVnJyxcbiAgJ3JpZ2h0TG93ZXJMZWcnLFxuICAncmlnaHRGb290JyxcbiAgJ3JpZ2h0VG9lcycsXG5cbiAgJ2xlZnRTaG91bGRlcicsXG4gICdsZWZ0VXBwZXJBcm0nLFxuICAnbGVmdExvd2VyQXJtJyxcbiAgJ2xlZnRIYW5kJyxcblxuICAncmlnaHRTaG91bGRlcicsXG4gICdyaWdodFVwcGVyQXJtJyxcbiAgJ3JpZ2h0TG93ZXJBcm0nLFxuICAncmlnaHRIYW5kJyxcblxuICAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gICdsZWZ0VGh1bWJEaXN0YWwnLFxuICAnbGVmdEluZGV4UHJveGltYWwnLFxuICAnbGVmdEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgJ2xlZnRJbmRleERpc3RhbCcsXG4gICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gICdsZWZ0TWlkZGxlRGlzdGFsJyxcbiAgJ2xlZnRSaW5nUHJveGltYWwnLFxuICAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICAnbGVmdFJpbmdEaXN0YWwnLFxuICAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgJ3JpZ2h0VGh1bWJNZXRhY2FycGFsJyxcbiAgJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gICdyaWdodFRodW1iRGlzdGFsJyxcbiAgJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgJ3JpZ2h0SW5kZXhEaXN0YWwnLFxuICAncmlnaHRNaWRkbGVQcm94aW1hbCcsXG4gICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gICdyaWdodE1pZGRsZURpc3RhbCcsXG4gICdyaWdodFJpbmdQcm94aW1hbCcsXG4gICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRSaW5nRGlzdGFsJyxcbiAgJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAncmlnaHRMaXR0bGVEaXN0YWwnLFxuXTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG4vKipcbiAqIFRoZSBuYW1lcyBvZiB7QGxpbmsgVlJNSHVtYW5vaWR9IGJvbmUgbmFtZXMuXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZU5hbWUgPSB7XG4gIEhpcHM6ICdoaXBzJyxcbiAgU3BpbmU6ICdzcGluZScsXG4gIENoZXN0OiAnY2hlc3QnLFxuICBVcHBlckNoZXN0OiAndXBwZXJDaGVzdCcsXG4gIE5lY2s6ICduZWNrJyxcblxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRFeWU6ICdsZWZ0RXllJyxcbiAgUmlnaHRFeWU6ICdyaWdodEV5ZScsXG4gIEphdzogJ2phdycsXG5cbiAgTGVmdFVwcGVyTGVnOiAnbGVmdFVwcGVyTGVnJyxcbiAgTGVmdExvd2VyTGVnOiAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdEZvb3Q6ICdsZWZ0Rm9vdCcsXG4gIExlZnRUb2VzOiAnbGVmdFRvZXMnLFxuXG4gIFJpZ2h0VXBwZXJMZWc6ICdyaWdodFVwcGVyTGVnJyxcbiAgUmlnaHRMb3dlckxlZzogJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodEZvb3Q6ICdyaWdodEZvb3QnLFxuICBSaWdodFRvZXM6ICdyaWdodFRvZXMnLFxuXG4gIExlZnRTaG91bGRlcjogJ2xlZnRTaG91bGRlcicsXG4gIExlZnRVcHBlckFybTogJ2xlZnRVcHBlckFybScsXG4gIExlZnRMb3dlckFybTogJ2xlZnRMb3dlckFybScsXG4gIExlZnRIYW5kOiAnbGVmdEhhbmQnLFxuXG4gIFJpZ2h0U2hvdWxkZXI6ICdyaWdodFNob3VsZGVyJyxcbiAgUmlnaHRVcHBlckFybTogJ3JpZ2h0VXBwZXJBcm0nLFxuICBSaWdodExvd2VyQXJtOiAncmlnaHRMb3dlckFybScsXG4gIFJpZ2h0SGFuZDogJ3JpZ2h0SGFuZCcsXG5cbiAgTGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRUaHVtYk1ldGFjYXJwYWwnLFxuICBMZWZ0VGh1bWJQcm94aW1hbDogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgTGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iRGlzdGFsJyxcbiAgTGVmdEluZGV4UHJveGltYWw6ICdsZWZ0SW5kZXhQcm94aW1hbCcsXG4gIExlZnRJbmRleEludGVybWVkaWF0ZTogJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIExlZnRJbmRleERpc3RhbDogJ2xlZnRJbmRleERpc3RhbCcsXG4gIExlZnRNaWRkbGVQcm94aW1hbDogJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIExlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdE1pZGRsZURpc3RhbDogJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICBMZWZ0UmluZ1Byb3hpbWFsOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIExlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBMZWZ0UmluZ0Rpc3RhbDogJ2xlZnRSaW5nRGlzdGFsJyxcbiAgTGVmdExpdHRsZVByb3hpbWFsOiAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgTGVmdExpdHRsZUludGVybWVkaWF0ZTogJ2xlZnRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBMZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZURpc3RhbCcsXG5cbiAgUmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIFJpZ2h0VGh1bWJQcm94aW1hbDogJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gIFJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iRGlzdGFsJyxcbiAgUmlnaHRJbmRleFByb3hpbWFsOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgUmlnaHRJbmRleEludGVybWVkaWF0ZTogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBSaWdodEluZGV4RGlzdGFsOiAncmlnaHRJbmRleERpc3RhbCcsXG4gIFJpZ2h0TWlkZGxlUHJveGltYWw6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgUmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIFJpZ2h0TWlkZGxlRGlzdGFsOiAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICBSaWdodFJpbmdQcm94aW1hbDogJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgUmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRSaW5nRGlzdGFsOiAncmlnaHRSaW5nRGlzdGFsJyxcbiAgUmlnaHRMaXR0bGVQcm94aW1hbDogJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICBSaWdodExpdHRsZUludGVybWVkaWF0ZTogJ3JpZ2h0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZURpc3RhbCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBWUk1IdW1hbkJvbmVOYW1lID0gdHlwZW9mIFZSTUh1bWFuQm9uZU5hbWVba2V5b2YgdHlwZW9mIFZSTUh1bWFuQm9uZU5hbWVdO1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXG5cbmltcG9ydCB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IG1hcHMgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gaXRzIHBhcmVudCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gKlxuICogUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vYmxvYi9tYXN0ZXIvc3BlY2lmaWNhdGlvbi9WUk1DX3ZybS0xLjAvaHVtYW5vaWQubWRcbiAqL1xuZXhwb3J0IGNvbnN0IFZSTUh1bWFuQm9uZVBhcmVudE1hcDogeyBbYm9uZSBpbiBWUk1IdW1hbkJvbmVOYW1lXTogVlJNSHVtYW5Cb25lTmFtZSB8IG51bGwgfSA9IHtcbiAgaGlwczogbnVsbCxcbiAgc3BpbmU6ICdoaXBzJyxcbiAgY2hlc3Q6ICdzcGluZScsXG4gIHVwcGVyQ2hlc3Q6ICdjaGVzdCcsXG4gIG5lY2s6ICd1cHBlckNoZXN0JyxcblxuICBoZWFkOiAnbmVjaycsXG4gIGxlZnRFeWU6ICdoZWFkJyxcbiAgcmlnaHRFeWU6ICdoZWFkJyxcbiAgamF3OiAnaGVhZCcsXG5cbiAgbGVmdFVwcGVyTGVnOiAnaGlwcycsXG4gIGxlZnRMb3dlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIGxlZnRGb290OiAnbGVmdExvd2VyTGVnJyxcbiAgbGVmdFRvZXM6ICdsZWZ0Rm9vdCcsXG5cbiAgcmlnaHRVcHBlckxlZzogJ2hpcHMnLFxuICByaWdodExvd2VyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIHJpZ2h0Rm9vdDogJ3JpZ2h0TG93ZXJMZWcnLFxuICByaWdodFRvZXM6ICdyaWdodEZvb3QnLFxuXG4gIGxlZnRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICBsZWZ0VXBwZXJBcm06ICdsZWZ0U2hvdWxkZXInLFxuICBsZWZ0TG93ZXJBcm06ICdsZWZ0VXBwZXJBcm0nLFxuICBsZWZ0SGFuZDogJ2xlZnRMb3dlckFybScsXG5cbiAgcmlnaHRTaG91bGRlcjogJ3VwcGVyQ2hlc3QnLFxuICByaWdodFVwcGVyQXJtOiAncmlnaHRTaG91bGRlcicsXG4gIHJpZ2h0TG93ZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgcmlnaHRIYW5kOiAncmlnaHRMb3dlckFybScsXG5cbiAgbGVmdFRodW1iTWV0YWNhcnBhbDogJ2xlZnRIYW5kJyxcbiAgbGVmdFRodW1iUHJveGltYWw6ICdsZWZ0VGh1bWJNZXRhY2FycGFsJyxcbiAgbGVmdFRodW1iRGlzdGFsOiAnbGVmdFRodW1iUHJveGltYWwnLFxuICBsZWZ0SW5kZXhQcm94aW1hbDogJ2xlZnRIYW5kJyxcbiAgbGVmdEluZGV4SW50ZXJtZWRpYXRlOiAnbGVmdEluZGV4UHJveGltYWwnLFxuICBsZWZ0SW5kZXhEaXN0YWw6ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TWlkZGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRNaWRkbGVJbnRlcm1lZGlhdGU6ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICBsZWZ0TWlkZGxlRGlzdGFsOiAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gIGxlZnRSaW5nUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRSaW5nSW50ZXJtZWRpYXRlOiAnbGVmdFJpbmdQcm94aW1hbCcsXG4gIGxlZnRSaW5nRGlzdGFsOiAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBsZWZ0TGl0dGxlUHJveGltYWw6ICdsZWZ0SGFuZCcsXG4gIGxlZnRMaXR0bGVJbnRlcm1lZGlhdGU6ICdsZWZ0TGl0dGxlUHJveGltYWwnLFxuICBsZWZ0TGl0dGxlRGlzdGFsOiAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG5cbiAgcmlnaHRUaHVtYk1ldGFjYXJwYWw6ICdyaWdodEhhbmQnLFxuICByaWdodFRodW1iUHJveGltYWw6ICdyaWdodFRodW1iTWV0YWNhcnBhbCcsXG4gIHJpZ2h0VGh1bWJEaXN0YWw6ICdyaWdodFRodW1iUHJveGltYWwnLFxuICByaWdodEluZGV4UHJveGltYWw6ICdyaWdodEhhbmQnLFxuICByaWdodEluZGV4SW50ZXJtZWRpYXRlOiAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgcmlnaHRJbmRleERpc3RhbDogJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICByaWdodE1pZGRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRNaWRkbGVJbnRlcm1lZGlhdGU6ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgcmlnaHRNaWRkbGVEaXN0YWw6ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gIHJpZ2h0UmluZ1Byb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRSaW5nSW50ZXJtZWRpYXRlOiAncmlnaHRSaW5nUHJveGltYWwnLFxuICByaWdodFJpbmdEaXN0YWw6ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICByaWdodExpdHRsZVByb3hpbWFsOiAncmlnaHRIYW5kJyxcbiAgcmlnaHRMaXR0bGVJbnRlcm1lZGlhdGU6ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgcmlnaHRMaXR0bGVEaXN0YWw6ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIEEgY29tcGF0IGZ1bmN0aW9uIGZvciBgUXVhdGVybmlvbi5pbnZlcnQoKWAgLyBgUXVhdGVybmlvbi5pbnZlcnNlKClgLlxuICogYFF1YXRlcm5pb24uaW52ZXJ0KClgIGlzIGludHJvZHVjZWQgaW4gcjEyMyBhbmQgYFF1YXRlcm5pb24uaW52ZXJzZSgpYCBlbWl0cyBhIHdhcm5pbmcuXG4gKiBXZSBhcmUgZ29pbmcgdG8gdXNlIHRoaXMgY29tcGF0IGZvciBhIHdoaWxlLlxuICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBxdWF0ZXJuaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0SW52ZXJ0Q29tcGF0PFQgZXh0ZW5kcyBUSFJFRS5RdWF0ZXJuaW9uPih0YXJnZXQ6IFQpOiBUIHtcbiAgaWYgKCh0YXJnZXQgYXMgYW55KS5pbnZlcnQpIHtcbiAgICB0YXJnZXQuaW52ZXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgKHRhcmdldCBhcyBhbnkpLmludmVyc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBxdWF0SW52ZXJ0Q29tcGF0IH0gZnJvbSAnLi4vdXRpbHMvcXVhdEludmVydENvbXBhdCc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZU5hbWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Qb3NlIH0gZnJvbSAnLi9WUk1Qb3NlJztcblxuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgUmlnIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNUmlnIHtcbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUh1bWFuQm9uZXN9IHRoYXQgY29udGFpbnMgYWxsIHRoZSBodW1hbiBib25lcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBnZXQgdGhlc2UgYm9uZXMgdXNpbmcge0BsaW5rIFZSTUh1bWFub2lkLmdldEJvbmV9LlxuICAgKi9cbiAgcHVibGljIGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXM7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTVBvc2V9IHRoYXQgaXMgaXRzIGRlZmF1bHQgc3RhdGUuXG4gICAqIE5vdGUgdGhhdCBpdCdzIG5vdCBjb21wYXRpYmxlIHdpdGgge0BsaW5rIHNldFBvc2V9IGFuZCB7QGxpbmsgZ2V0UG9zZX0sIHNpbmNlIGl0IGNvbnRhaW5zIG5vbi1yZWxhdGl2ZSB2YWx1ZXMgb2YgZWFjaCBsb2NhbCB0cmFuc2Zvcm1zLlxuICAgKi9cbiAgcHVibGljIHJlc3RQb3NlOiBWUk1Qb3NlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcykge1xuICAgIHRoaXMuaHVtYW5Cb25lcyA9IGh1bWFuQm9uZXM7XG5cbiAgICB0aGlzLnJlc3RQb3NlID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKiBOb3RlIHRoYXQgdGhlIG91dHB1dCByZXN1bHQgd2lsbCBjb250YWluIGluaXRpYWwgc3RhdGUgb2YgdGhlIFZSTSBhbmQgbm90IGNvbXBhdGlibGUgYmV0d2VlbiBkaWZmZXJlbnQgbW9kZWxzLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIGdldFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2UgPSB7fSBhcyBWUk1Qb3NlO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKCh2cm1Cb25lTmFtZVN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdnJtQm9uZU5hbWUgPSB2cm1Cb25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUodnJtQm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0aGUgcG9zaXRpb24gLyByb3RhdGlvbiBmcm9tIHRoZSBub2RlXG4gICAgICBfdjNBLmNvcHkobm9kZS5wb3NpdGlvbik7XG4gICAgICBfcXVhdEEuY29weShub2RlLnF1YXRlcm5pb24pO1xuXG4gICAgICAvLyBDb252ZXJ0IHRvIHJhdyBhcnJheXNcbiAgICAgIHBvc2VbdnJtQm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogX3YzQS50b0FycmF5KCkgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgICByb3RhdGlvbjogX3F1YXRBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEge0BsaW5rIFZSTVBvc2V9LlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBpcyBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2UgPSB7fSBhcyBWUk1Qb3NlO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKChib25lTmFtZVN0cmluZykgPT4ge1xuICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lTmFtZVN0cmluZyBhcyBWUk1IdW1hbkJvbmVOYW1lO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRha2UgYSBkaWZmIGZyb20gcmVzdFBvc2VcbiAgICAgIF92M0Euc2V0KDAsIDAsIDApO1xuICAgICAgX3F1YXRBLmlkZW50aXR5KCk7XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKHJlc3RTdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKS5uZWdhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN0U3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIHF1YXRJbnZlcnRDb21wYXQoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IHRoZSBwb3NpdGlvbiAvIHJvdGF0aW9uIGZyb20gdGhlIG5vZGVcbiAgICAgIF92M0EuYWRkKG5vZGUucG9zaXRpb24pO1xuICAgICAgX3F1YXRBLnByZW11bHRpcGx5KG5vZGUucXVhdGVybmlvbik7XG5cbiAgICAgIC8vIENvbnZlcnQgdG8gcmF3IGFycmF5c1xuICAgICAgcG9zZVtib25lTmFtZV0gPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpIGFzIFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgaHVtYW5vaWQgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogRWFjaCB0cmFuc2Zvcm0gaGF2ZSB0byBiZSBhIGxvY2FsIHRyYW5zZm9ybSByZWxhdGl2ZSBmcm9tIHJlc3QgcG9zZSAoVC1wb3NlKS5cbiAgICogWW91IGNhbiBwYXNzIHdoYXQgeW91IGdvdCBmcm9tIHtAbGluayBnZXRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSBbW1ZSTVBvc2VdXSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5lbnRyaWVzKHBvc2VPYmplY3QpLmZvckVhY2goKFtib25lTmFtZVN0cmluZywgc3RhdGVdKSA9PiB7XG4gICAgICBjb25zdCBib25lTmFtZSA9IGJvbmVOYW1lU3RyaW5nIGFzIFZSTUh1bWFuQm9uZU5hbWU7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIC8vIElnbm9yZSB3aGVuIHRoZXJlIGFyZSBubyBib25lIHRoYXQgaXMgZGVmaW5lZCBpbiB0aGUgcG9zZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3RTdGF0ZSA9IHRoaXMucmVzdFBvc2VbYm9uZU5hbWVdO1xuICAgICAgaWYgKCFyZXN0U3RhdGUpIHtcbiAgICAgICAgLy8gSXQncyB2ZXJ5IHVubGlrZWx5LiBQb3NzaWJseSBhIGJ1Z1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBzdGF0ZSB0byB0aGUgYWN0dWFsIGJvbmVcbiAgICAgIGlmIChzdGF0ZT8ucG9zaXRpb24pIHtcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5mcm9tQXJyYXkoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucG9zaXRpb24pIHtcbiAgICAgICAgICBub2RlLnBvc2l0aW9uLmFkZChfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGU/LnJvdGF0aW9uKSB7XG4gICAgICAgIG5vZGUucXVhdGVybmlvbi5mcm9tQXJyYXkoc3RhdGUucm90YXRpb24pO1xuXG4gICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBodW1hbm9pZCB0byBpdHMgcmVzdCBwb3NlLlxuICAgKi9cbiAgcHVibGljIHJlc2V0UG9zZSgpOiB2b2lkIHtcbiAgICBPYmplY3QuZW50cmllcyh0aGlzLnJlc3RQb3NlKS5mb3JFYWNoKChbYm9uZU5hbWUsIHJlc3RdKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSBhcyBWUk1IdW1hbkJvbmVOYW1lKTtcblxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3Q/LnBvc2l0aW9uKSB7XG4gICAgICAgIG5vZGUucG9zaXRpb24uZnJvbUFycmF5KHJlc3QucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzdD8ucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShyZXN0LnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSwgYXMgYSB7QGxpbmsgVlJNSHVtYW5Cb25lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXSA/PyB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0sIGFzIGEgYFRIUkVFLk9iamVjdDNEYC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlKG5hbWU6IFZSTUh1bWFuQm9uZU5hbWUpOiBUSFJFRS5PYmplY3QzRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0/Lm5vZGUgPz8gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTmFtZSwgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lTGlzdCB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTGlzdCc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVQYXJlbnRNYXAgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZVBhcmVudE1hcCc7XG5pbXBvcnQgeyBWUk1SaWcgfSBmcm9tICcuL1ZSTVJpZyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9ib25lV29ybGRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyB0aGUgbm9ybWFsaXplZCBSaWcgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZFJpZyBleHRlbmRzIFZSTVJpZyB7XG4gIHByb3RlY3RlZCBzdGF0aWMgX3NldHVwVHJhbnNmb3Jtcyhtb2RlbFJpZzogVlJNUmlnKToge1xuICAgIHJpZ0JvbmVzOiBWUk1IdW1hbkJvbmVzO1xuICAgIHJvb3Q6IFRIUkVFLk9iamVjdDNEO1xuICAgIHBhcmVudFdvcmxkUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgICBib25lUm90YXRpb25zOiB7IFtib25lTmFtZSBpbiBWUk1IdW1hbkJvbmVOYW1lXT86IFRIUkVFLlF1YXRlcm5pb24gfTtcbiAgfSB7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgIHJvb3QubmFtZSA9ICdWUk1IdW1hbm9pZFJpZyc7XG5cbiAgICAvLyBzdG9yZSBib25lV29ybGRQb3NpdGlvbnMgYW5kIGJvbmVXb3JsZFJvdGF0aW9uc1xuICAgIGNvbnN0IGJvbmVXb3JsZFBvc2l0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5WZWN0b3IzIH0gPSB7fTtcbiAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbnM6IHsgW2JvbmVOYW1lIGluIFZSTUh1bWFuQm9uZU5hbWVdPzogVEhSRUUuUXVhdGVybmlvbiB9ID0ge307XG4gICAgY29uc3QgYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIFZSTUh1bWFuQm9uZUxpc3QuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJvbmVOb2RlID0gbW9kZWxSaWcuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUpO1xuXG4gICAgICBpZiAoYm9uZU5vZGUpIHtcbiAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICBjb25zdCBib25lV29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICAgICAgYm9uZU5vZGUudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICBib25lTm9kZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoYm9uZVdvcmxkUG9zaXRpb24sIGJvbmVXb3JsZFJvdGF0aW9uLCBfdjNBKTtcblxuICAgICAgICBib25lV29ybGRQb3NpdGlvbnNbYm9uZU5hbWVdID0gYm9uZVdvcmxkUG9zaXRpb247XG4gICAgICAgIGJvbmVXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lV29ybGRSb3RhdGlvbjtcbiAgICAgICAgYm9uZVJvdGF0aW9uc1tib25lTmFtZV0gPSBib25lTm9kZS5xdWF0ZXJuaW9uLmNsb25lKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBidWlsZCByaWcgaGllcmFyY2h5ICsgc3RvcmUgcGFyZW50V29ybGRSb3RhdGlvbnNcbiAgICBjb25zdCBwYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH0gPSB7fTtcblxuICAgIGNvbnN0IHJpZ0JvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSBtb2RlbFJpZy5nZXRCb25lTm9kZShib25lTmFtZSk7XG5cbiAgICAgIGlmIChib25lTm9kZSkge1xuICAgICAgICBjb25zdCBib25lV29ybGRQb3NpdGlvbiA9IGJvbmVXb3JsZFBvc2l0aW9uc1tib25lTmFtZV0gYXMgVEhSRUUuVmVjdG9yMztcblxuICAgICAgICAvLyBzZWUgdGhlIG5lYXJlc3QgcGFyZW50IHBvc2l0aW9uXG4gICAgICAgIGxldCBjdXJyZW50Qm9uZU5hbWU6IFZSTUh1bWFuQm9uZU5hbWUgfCBudWxsID0gYm9uZU5hbWU7XG4gICAgICAgIGxldCBwYXJlbnRXb3JsZFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgcGFyZW50V29ybGRSb3RhdGlvbjogVEhSRUUuUXVhdGVybmlvbiB8IHVuZGVmaW5lZDtcbiAgICAgICAgd2hpbGUgKHBhcmVudFdvcmxkUG9zaXRpb24gPT0gbnVsbCkge1xuICAgICAgICAgIGN1cnJlbnRCb25lTmFtZSA9IFZSTUh1bWFuQm9uZVBhcmVudE1hcFtjdXJyZW50Qm9uZU5hbWVdO1xuICAgICAgICAgIGlmIChjdXJyZW50Qm9uZU5hbWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudFdvcmxkUG9zaXRpb24gPSBib25lV29ybGRQb3NpdGlvbnNbY3VycmVudEJvbmVOYW1lXTtcbiAgICAgICAgICBwYXJlbnRXb3JsZFJvdGF0aW9uID0gYm9uZVdvcmxkUm90YXRpb25zW2N1cnJlbnRCb25lTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdG8gaGllcmFyY2h5XG4gICAgICAgIGNvbnN0IHJpZ0JvbmVOb2RlID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICAgIHJpZ0JvbmVOb2RlLm5hbWUgPSAnTm9ybWFsaXplZF8nICsgYm9uZU5vZGUubmFtZTtcblxuICAgICAgICBjb25zdCBwYXJlbnRSaWdCb25lTm9kZSA9IChjdXJyZW50Qm9uZU5hbWUgPyByaWdCb25lc1tjdXJyZW50Qm9uZU5hbWVdPy5ub2RlIDogcm9vdCkgYXMgVEhSRUUuT2JqZWN0M0Q7XG5cbiAgICAgICAgcGFyZW50UmlnQm9uZU5vZGUuYWRkKHJpZ0JvbmVOb2RlKTtcbiAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uY29weShib25lV29ybGRQb3NpdGlvbik7XG4gICAgICAgIGlmIChwYXJlbnRXb3JsZFBvc2l0aW9uKSB7XG4gICAgICAgICAgcmlnQm9uZU5vZGUucG9zaXRpb24uc3ViKHBhcmVudFdvcmxkUG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmlnQm9uZXNbYm9uZU5hbWVdID0geyBub2RlOiByaWdCb25lTm9kZSB9O1xuXG4gICAgICAgIC8vIHN0b3JlIHBhcmVudFdvcmxkUm90YXRpb25cbiAgICAgICAgcGFyZW50V29ybGRSb3RhdGlvbnNbYm9uZU5hbWVdID0gcGFyZW50V29ybGRSb3RhdGlvbiA/PyBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJpZ0JvbmVzOiByaWdCb25lcyBhcyBWUk1IdW1hbkJvbmVzLFxuICAgICAgcm9vdCxcbiAgICAgIHBhcmVudFdvcmxkUm90YXRpb25zLFxuICAgICAgYm9uZVJvdGF0aW9ucyxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsOiBWUk1SaWc7XG4gIHB1YmxpYyByZWFkb25seSByb290OiBUSFJFRS5PYmplY3QzRDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJlbnRXb3JsZFJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG4gIHByb3RlY3RlZCByZWFkb25seSBfYm9uZVJvdGF0aW9uczogeyBbYm9uZU5hbWUgaW4gVlJNSHVtYW5Cb25lTmFtZV0/OiBUSFJFRS5RdWF0ZXJuaW9uIH07XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1SaWcpIHtcbiAgICBjb25zdCB7IHJpZ0JvbmVzLCByb290LCBwYXJlbnRXb3JsZFJvdGF0aW9ucywgYm9uZVJvdGF0aW9ucyB9ID0gVlJNSHVtYW5vaWRSaWcuX3NldHVwVHJhbnNmb3JtcyhodW1hbm9pZCk7XG5cbiAgICBzdXBlcihyaWdCb25lcyk7XG5cbiAgICB0aGlzLm9yaWdpbmFsID0gaHVtYW5vaWQ7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9ucyA9IHBhcmVudFdvcmxkUm90YXRpb25zO1xuICAgIHRoaXMuX2JvbmVSb3RhdGlvbnMgPSBib25lUm90YXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIGh1bWFub2lkIHJpZy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgVlJNSHVtYW5Cb25lTGlzdC5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm9uZU5vZGUgPSB0aGlzLm9yaWdpbmFsLmdldEJvbmVOb2RlKGJvbmVOYW1lKTtcblxuICAgICAgaWYgKGJvbmVOb2RlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgcmlnQm9uZU5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lKSE7XG4gICAgICAgIGNvbnN0IHBhcmVudFdvcmxkUm90YXRpb24gPSB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uc1tib25lTmFtZV0hO1xuICAgICAgICBjb25zdCBpbnZQYXJlbnRXb3JsZFJvdGF0aW9uID0gX3F1YXRBLmNvcHkocGFyZW50V29ybGRSb3RhdGlvbikuaW52ZXJ0KCk7XG4gICAgICAgIGNvbnN0IGJvbmVSb3RhdGlvbiA9IHRoaXMuX2JvbmVSb3RhdGlvbnNbYm9uZU5hbWVdITtcblxuICAgICAgICBib25lTm9kZS5xdWF0ZXJuaW9uXG4gICAgICAgICAgLmNvcHkocmlnQm9uZU5vZGUucXVhdGVybmlvbilcbiAgICAgICAgICAubXVsdGlwbHkocGFyZW50V29ybGRSb3RhdGlvbilcbiAgICAgICAgICAucHJlbXVsdGlwbHkoaW52UGFyZW50V29ybGRSb3RhdGlvbilcbiAgICAgICAgICAubXVsdGlwbHkoYm9uZVJvdGF0aW9uKTtcblxuICAgICAgICAvLyBNb3ZlIHRoZSBtYXNzIGNlbnRlciBvZiB0aGUgVlJNXG4gICAgICAgIGlmIChib25lTmFtZSA9PT0gJ2hpcHMnKSB7XG4gICAgICAgICAgY29uc3QgYm9uZVdvcmxkUG9zaXRpb24gPSByaWdCb25lTm9kZS5nZXRXb3JsZFBvc2l0aW9uKF9ib25lV29ybGRQb3MpO1xuICAgICAgICAgIGJvbmVOb2RlLnBhcmVudCEudXBkYXRlV29ybGRNYXRyaXgodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgIGNvbnN0IHBhcmVudFdvcmxkTWF0cml4ID0gYm9uZU5vZGUucGFyZW50IS5tYXRyaXhXb3JsZDtcbiAgICAgICAgICBjb25zdCBsb2NhbFBvc2l0aW9uID0gYm9uZVdvcmxkUG9zaXRpb24uYXBwbHlNYXRyaXg0KHBhcmVudFdvcmxkTWF0cml4LmludmVydCgpKTtcbiAgICAgICAgICBib25lTm9kZS5wb3NpdGlvbi5jb3B5KGxvY2FsUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lTmFtZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgdHlwZSB7IFZSTVBvc2UgfSBmcm9tICcuL1ZSTVBvc2UnO1xuaW1wb3J0IHsgVlJNUmlnIH0gZnJvbSAnLi9WUk1SaWcnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRSaWcgfSBmcm9tICcuL1ZSTUh1bWFub2lkUmlnJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBodW1hbm9pZCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgaXQgY29waWVzIHBvc2UgZnJvbSBub3JtYWxpemVkSHVtYW5Cb25lcyB0byByYXdIdW1hbkJvbmVzIG9uIHtAbGluayB1cGRhdGV9LlxuICAgKiBgdHJ1ZWAgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGVIdW1hbkJvbmVzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIHJhdyByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX3Jhd0h1bWFuQm9uZXM6IFZSTVJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEEgbm9ybWFsaXplZCByaWcgb2YgdGhlIFZSTS5cbiAgICovXG4gIHByaXZhdGUgX25vcm1hbGl6ZWRIdW1hbkJvbmVzOiBWUk1IdW1hbm9pZFJpZzsgLy8gVE9ETzogUmVuYW1lXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIHJhd1Jlc3RQb3NlfSBvciB7QGxpbmsgbm9ybWFsaXplZFJlc3RQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCByZXN0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiByZXN0UG9zZSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHJhd1Jlc3RQb3NlIG9yIG5vcm1hbGl6ZWRSZXN0UG9zZSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMucmF3UmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIHJhdyBodW1hbiBib25lcyB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBOb3RlIHRoYXQgaXQncyBub3QgY29tcGF0aWJsZSB3aXRoIHtAbGluayBzZXRSYXdQb3NlfSBhbmQge0BsaW5rIGdldFJhd1Bvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3UmVzdFBvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMucmVzdFBvc2U7XG4gIH1cblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNUG9zZX0gb2YgaXRzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogTm90ZSB0aGF0IGl0J3Mgbm90IGNvbXBhdGlibGUgd2l0aCB7QGxpbmsgc2V0Tm9ybWFsaXplZFBvc2V9IGFuZCB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9LCBzaW5jZSBpdCBjb250YWlucyBub24tcmVsYXRpdmUgdmFsdWVzIG9mIGVhY2ggbG9jYWwgdHJhbnNmb3Jtcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZFJlc3RQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5yZXN0UG9zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfSB0byByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBodW1hbkJvbmVzKCk6IFZSTUh1bWFuQm9uZXMge1xuICAgIC8vIGFuIGFsaWFzIG9mIGByYXdIdW1hbkJvbmVzYFxuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLmh1bWFuQm9uZXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0gdG8gcmF3IHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3SHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5odW1hbkJvbmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20ge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9IHRvIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX1zLlxuICAgKi9cbiAgcHVibGljIGdldCBub3JtYWxpemVkSHVtYW5Cb25lcygpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuaHVtYW5Cb25lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcm9vdCBvZiBub3JtYWxpemVkIHtAbGluayBWUk1IdW1hbkJvbmV9cy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZEh1bWFuQm9uZXNSb290KCk6IFRIUkVFLk9iamVjdDNEIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMucm9vdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgQSB7QGxpbmsgVlJNSHVtYW5Cb25lc30gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqIEBwYXJhbSBhdXRvVXBkYXRlSHVtYW5Cb25lcyBXaGV0aGVyIGl0IGNvcGllcyBwb3NlIGZyb20gbm9ybWFsaXplZEh1bWFuQm9uZXMgdG8gcmF3SHVtYW5Cb25lcyBvbiB7QGxpbmsgdXBkYXRlfS4gYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcywgb3B0aW9ucz86IHsgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuIH0pIHtcbiAgICB0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzID0gb3B0aW9ucz8uYXV0b1VwZGF0ZUh1bWFuQm9uZXMgPz8gdHJ1ZTtcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhodW1hbkJvbmVzKTtcbiAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcyA9IG5ldyBWUk1IdW1hbm9pZFJpZyh0aGlzLl9yYXdIdW1hbkJvbmVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNSHVtYW5vaWR9IGludG8gdGhpcyBvbmUuXG4gICAqIEBwYXJhbSBzb3VyY2UgVGhlIHtAbGluayBWUk1IdW1hbm9pZH0geW91IHdhbnQgdG8gY29weVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBwdWJsaWMgY29weShzb3VyY2U6IFZSTUh1bWFub2lkKTogdGhpcyB7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IHNvdXJjZS5hdXRvVXBkYXRlSHVtYW5Cb25lcztcbiAgICB0aGlzLl9yYXdIdW1hbkJvbmVzID0gbmV3IFZSTVJpZyhzb3VyY2UuaHVtYW5Cb25lcyk7XG4gICAgdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMgPSBuZXcgVlJNSHVtYW5vaWRSaWcodGhpcy5fcmF3SHVtYW5Cb25lcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhpcyB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZSTUh1bWFub2lkIHtcbiAgICByZXR1cm4gbmV3IFZSTUh1bWFub2lkKHRoaXMuaHVtYW5Cb25lcywgeyBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyB9KS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQuIFVzZSBlaXRoZXIge0BsaW5rIGdldFJhd0Fic29sdXRlUG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRBYnNvbHV0ZVBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0QWJzb2x1dGVQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdWUk1IdW1hbm9pZDogZ2V0QWJzb2x1dGVQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdBYnNvbHV0ZVBvc2UoKSBvciBnZXROb3JtYWxpemVkQWJzb2x1dGVQb3NlKCkgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXdBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIHJhdyBodW1hbiBib25lcyBhcyBhIHtAbGluayBWUk1Qb3NlfS5cbiAgICogTm90ZSB0aGF0IHRoZSBvdXRwdXQgcmVzdWx0IHdpbGwgY29udGFpbiBpbml0aWFsIHN0YXRlIG9mIHRoZSBWUk0gYW5kIG5vdCBjb21wYXRpYmxlIGJldHdlZW4gZGlmZmVyZW50IG1vZGVscy5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBnZXRSYXdQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFJhd0Fic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRBYnNvbHV0ZVBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgYWJzb2x1dGUgcG9zZSBvZiB0aGlzIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqIE5vdGUgdGhhdCB0aGUgb3V0cHV0IHJlc3VsdCB3aWxsIGNvbnRhaW4gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgVlJNIGFuZCBub3QgY29tcGF0aWJsZSBiZXR3ZWVuIGRpZmZlcmVudCBtb2RlbHMuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSB7QGxpbmsgZ2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEFic29sdXRlUG9zZSgpOiBWUk1Qb3NlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0QWJzb2x1dGVQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3UG9zZX0gb3Ige0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldFBvc2UoKTogVlJNUG9zZSB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogZ2V0UG9zZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3UG9zZSgpIG9yIGdldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd1Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiByYXcgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldFJhd1Bvc2UoKTogVlJNUG9zZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0h1bWFuQm9uZXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIG5vcm1hbGl6ZWQgaHVtYW4gYm9uZXMgYXMgYSB7QGxpbmsgVlJNUG9zZX0uXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGlzIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy5nZXRQb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgc2V0UmF3UG9zZX0gb3Ige0BsaW5rIHNldE5vcm1hbGl6ZWRQb3NlfSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIGNvbnNvbGUud2FybignVlJNSHVtYW5vaWQ6IHNldFBvc2UoKSBpcyBkZXByZWNhdGVkLiBVc2UgZWl0aGVyIHNldFJhd1Bvc2UoKSBvciBzZXROb3JtYWxpemVkUG9zZSgpIGluc3RlYWQuJyk7XG5cbiAgICByZXR1cm4gdGhpcy5zZXRSYXdQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgcmF3IGh1bWFuIGJvbmVzIGRvIGEgc3BlY2lmaWVkIHBvc2UuXG4gICAqXG4gICAqIEVhY2ggdHJhbnNmb3JtIGhhdmUgdG8gYmUgYSBsb2NhbCB0cmFuc2Zvcm0gcmVsYXRpdmUgZnJvbSByZXN0IHBvc2UgKFQtcG9zZSkuXG4gICAqIFlvdSBjYW4gcGFzcyB3aGF0IHlvdSBnb3QgZnJvbSB7QGxpbmsgZ2V0UmF3UG9zZX0uXG4gICAqXG4gICAqIElmIHlvdSBhcmUgdXNpbmcge0BsaW5rIGF1dG9VcGRhdGVIdW1hbkJvbmVzfSwgeW91IG1pZ2h0IHdhbnQgdG8gdXNlIHtAbGluayBzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXRSYXdQb3NlKHBvc2VPYmplY3Q6IFZSTVBvc2UpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5zZXRQb3NlKHBvc2VPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgbm9ybWFsaXplZCBodW1hbiBib25lcyBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBFYWNoIHRyYW5zZm9ybSBoYXZlIHRvIGJlIGEgbG9jYWwgdHJhbnNmb3JtIHJlbGF0aXZlIGZyb20gcmVzdCBwb3NlIChULXBvc2UpLlxuICAgKiBZb3UgY2FuIHBhc3Mgd2hhdCB5b3UgZ290IGZyb20ge0BsaW5rIGdldE5vcm1hbGl6ZWRQb3NlfS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSB7QGxpbmsgVlJNUG9zZX0gdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIHBvc2VcbiAgICovXG4gIHB1YmxpYyBzZXROb3JtYWxpemVkUG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLnNldFBvc2UocG9zZU9iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgcmVzZXRSYXdQb3NlfSBvciB7QGxpbmsgcmVzZXROb3JtYWxpemVkUG9zZX0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldFBvc2UoKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1IdW1hbm9pZDogcmVzZXRQb3NlKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciByZXNldFJhd1Bvc2UoKSBvciByZXNldE5vcm1hbGl6ZWRQb3NlKCkgaW5zdGVhZC4nKTtcblxuICAgIHJldHVybiB0aGlzLnJlc2V0UmF3UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSByYXcgaHVtYW5vaWQgdG8gaXRzIHJlc3QgcG9zZS5cbiAgICpcbiAgICogSWYgeW91IGFyZSB1c2luZyB7QGxpbmsgYXV0b1VwZGF0ZUh1bWFuQm9uZXN9LCB5b3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIHJlc2V0Tm9ybWFsaXplZFBvc2V9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRSYXdQb3NlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yYXdIdW1hbkJvbmVzLnJlc2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBub3JtYWxpemVkIGh1bWFub2lkIHRvIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwdWJsaWMgcmVzZXROb3JtYWxpemVkUG9zZSgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5yZXNldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkLiBVc2UgZWl0aGVyIHtAbGluayBnZXRSYXdCb25lfSBvciB7QGxpbmsgZ2V0Tm9ybWFsaXplZEJvbmV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zb2xlLndhcm4oJ1ZSTUh1bWFub2lkOiBnZXRCb25lKCkgaXMgZGVwcmVjYXRlZC4gVXNlIGVpdGhlciBnZXRSYXdCb25lKCkgb3IgZ2V0Tm9ybWFsaXplZEJvbmUoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF3Qm9uZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSByYXcge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0UmF3Qm9uZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVlJNSHVtYW5Cb25lIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5vcm1hbGl6ZWQge0BsaW5rIFZSTUh1bWFuQm9uZX0gYm91bmQgdG8gYSBzcGVjaWZpZWQge0BsaW5rIFZSTUh1bWFuQm9uZU5hbWV9LlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Tm9ybWFsaXplZEJvbmUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRIdW1hbkJvbmVzLmdldEJvbmUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZC4gVXNlIGVpdGhlciB7QGxpbmsgZ2V0UmF3Qm9uZU5vZGV9IG9yIHtAbGluayBnZXROb3JtYWxpemVkQm9uZU5vZGV9IGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNSHVtYW5Cb25lTmFtZSk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTUh1bWFub2lkOiBnZXRCb25lTm9kZSgpIGlzIGRlcHJlY2F0ZWQuIFVzZSBlaXRoZXIgZ2V0UmF3Qm9uZU5vZGUoKSBvciBnZXROb3JtYWxpemVkQm9uZU5vZGUoKSBpbnN0ZWFkLicsXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldFJhd0JvbmVOb2RlKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHJhdyBib25lIGFzIGEgYFRIUkVFLk9iamVjdDNEYCBib3VuZCB0byBhIHNwZWNpZmllZCB7QGxpbmsgVlJNSHVtYW5Cb25lTmFtZX0uXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRSYXdCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SHVtYW5Cb25lcy5nZXRCb25lTm9kZShuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBub3JtYWxpemVkIGJvbmUgYXMgYSBgVEhSRUUuT2JqZWN0M0RgIGJvdW5kIHRvIGEgc3BlY2lmaWVkIHtAbGluayBWUk1IdW1hbkJvbmVOYW1lfS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldE5vcm1hbGl6ZWRCb25lTm9kZShuYW1lOiBWUk1IdW1hbkJvbmVOYW1lKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEh1bWFuQm9uZXMuZ2V0Qm9uZU5vZGUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBodW1hbm9pZCBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIHtAbGluayBhdXRvVXBkYXRlSHVtYW5Cb25lc30gaXMgYHRydWVgLCBpdCB0cmFuc2ZlcnMgdGhlIHBvc2Ugb2Ygbm9ybWFsaXplZCBodW1hbiBib25lcyB0byByYXcgaHVtYW4gYm9uZXMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9VcGRhdGVIdW1hbkJvbmVzKSB7XG4gICAgICB0aGlzLl9ub3JtYWxpemVkSHVtYW5Cb25lcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0ge1xuICBIaXBzOiAnaGlwcycsXG4gIFNwaW5lOiAnc3BpbmUnLFxuICBIZWFkOiAnaGVhZCcsXG4gIExlZnRVcHBlckxlZzogJ2xlZnRVcHBlckxlZycsXG4gIExlZnRMb3dlckxlZzogJ2xlZnRMb3dlckxlZycsXG4gIExlZnRGb290OiAnbGVmdEZvb3QnLFxuICBSaWdodFVwcGVyTGVnOiAncmlnaHRVcHBlckxlZycsXG4gIFJpZ2h0TG93ZXJMZWc6ICdyaWdodExvd2VyTGVnJyxcbiAgUmlnaHRGb290OiAncmlnaHRGb290JyxcbiAgTGVmdFVwcGVyQXJtOiAnbGVmdFVwcGVyQXJtJyxcbiAgTGVmdExvd2VyQXJtOiAnbGVmdExvd2VyQXJtJyxcbiAgTGVmdEhhbmQ6ICdsZWZ0SGFuZCcsXG4gIFJpZ2h0VXBwZXJBcm06ICdyaWdodFVwcGVyQXJtJyxcbiAgUmlnaHRMb3dlckFybTogJ3JpZ2h0TG93ZXJBcm0nLFxuICBSaWdodEhhbmQ6ICdyaWdodEhhbmQnLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lID0gdHlwZW9mIFZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZVtrZXlvZiB0eXBlb2YgVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lXTtcbiIsImltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL1ZSTUh1bWFub2lkJztcbmltcG9ydCB0eXBlIHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgeyBWUk1SZXF1aXJlZEh1bWFuQm9uZU5hbWUgfSBmcm9tICcuL1ZSTVJlcXVpcmVkSHVtYW5Cb25lTmFtZSc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1IdW1hbm9pZEhlbHBlcic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luT3B0aW9ucyc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIG1hcCBmcm9tIG9sZCB0aHVtYiBib25lIG5hbWVzIHRvIG5ldyB0aHVtYiBib25lIG5hbWVzXG4gKi9cbmNvbnN0IHRodW1iQm9uZU5hbWVNYXA6IHsgW2tleTogc3RyaW5nXTogVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lIHwgdW5kZWZpbmVkIH0gPSB7XG4gIGxlZnRUaHVtYlByb3hpbWFsOiAnbGVmdFRodW1iTWV0YWNhcnBhbCcsXG4gIGxlZnRUaHVtYkludGVybWVkaWF0ZTogJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgcmlnaHRUaHVtYlByb3hpbWFsOiAncmlnaHRUaHVtYk1ldGFjYXJwYWwnLFxuICByaWdodFRodW1iSW50ZXJtZWRpYXRlOiAncmlnaHRUaHVtYlByb3hpbWFsJyxcbn07XG5cbi8qKlxuICogQSBwbHVnaW4gb2YgR0xURkxvYWRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGFuIE9iamVjdDNEIHRvIGFkZCB7QGxpbmsgVlJNSHVtYW5vaWRIZWxwZXJ9LlxuICAgKiBJZiBub3Qgc3BlY2lmaWVkLCBoZWxwZXIgd2lsbCBub3QgYmUgY3JlYXRlZC5cbiAgICogSWYgYHJlbmRlck9yZGVyYCBpcyBzZXQgdG8gdGhlIHJvb3QsIHRoZSBoZWxwZXIgd2lsbCBjb3B5IHRoZSBzYW1lIGByZW5kZXJPcmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGhlbHBlclJvb3Q/OiBUSFJFRS5PYmplY3QzRDtcblxuICBwdWJsaWMgYXV0b1VwZGF0ZUh1bWFuQm9uZXM/OiBib29sZWFuO1xuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbk9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuaGVscGVyUm9vdCA9IG9wdGlvbnM/LmhlbHBlclJvb3Q7XG4gICAgdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZ2x0Zi51c2VyRGF0YS52cm1IdW1hbm9pZCA9IGF3YWl0IHRoaXMuX2ltcG9ydChnbHRmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgYSB7QGxpbmsgVlJNSHVtYW5vaWR9IGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IHYxUmVzdWx0ID0gYXdhaXQgdGhpcy5fdjFJbXBvcnQoZ2x0Zik7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQpIHtcbiAgICAgIHJldHVybiB2MFJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3YxSW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IGpzb24gPSB0aGlzLnBhcnNlci5qc29uIGFzIEdMVEZTY2hlbWEuSUdMVEY7XG5cbiAgICAvLyBlYXJseSBhYm9ydCBpZiBpdCBkb2Vzbid0IHVzZSB2cm1cbiAgICBjb25zdCBpc1ZSTVVzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkPy5pbmRleE9mKCdWUk1DX3ZybScpICE9PSAtMTtcbiAgICBpZiAoIWlzVlJNVXNlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9uID0ganNvbi5leHRlbnNpb25zPy5bJ1ZSTUNfdnJtJ10gYXMgVjFWUk1TY2hlbWEuVlJNQ1ZSTSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW46IFVua25vd24gVlJNQ192cm0gc3BlY1ZlcnNpb24gXCIke3NwZWNWZXJzaW9ufVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZCA9IGV4dGVuc2lvbi5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb21wYXQ6IDEuMC1iZXRhIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgKlxuICAgICAqIGB0cnVlYCBpZiBgbGVmdFRodW1iSW50ZXJtZWRpYXRlYCBvciBgcmlnaHRUaHVtYkludGVybWVkaWF0ZWAgZXhpc3RzXG4gICAgICovXG4gICAgY29uc3QgZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUgPVxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5sZWZ0VGh1bWJJbnRlcm1lZGlhdGUgIT0gbnVsbCB8fFxuICAgICAgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgYXMgYW55KS5yaWdodFRodW1iSW50ZXJtZWRpYXRlICE9IG51bGw7XG5cbiAgICBjb25zdCBodW1hbkJvbmVzOiBQYXJ0aWFsPFZSTUh1bWFuQm9uZXM+ID0ge307XG4gICAgaWYgKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMpLm1hcChhc3luYyAoW2JvbmVOYW1lU3RyaW5nLCBzY2hlbWFIdW1hbkJvbmVdKSA9PiB7XG4gICAgICAgICAgbGV0IGJvbmVOYW1lID0gYm9uZU5hbWVTdHJpbmcgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gc2NoZW1hSHVtYW5Cb25lLm5vZGU7XG5cbiAgICAgICAgICAvLyBjb21wYXQ6IDEuMC1iZXRhIHByZXZpb3VzIHRodW1iIGJvbmUgbmFtZXNcbiAgICAgICAgICBpZiAoZXhpc3RzUHJldmlvdXNUaHVtYk5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRodW1iQm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lTWFwW2JvbmVOYW1lXTtcbiAgICAgICAgICAgIGlmICh0aHVtYkJvbmVOYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgYm9uZU5hbWUgPSB0aHVtYkJvbmVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2V0IHRvIHRoZSBgaHVtYW5Cb25lc2BcbiAgICAgICAgICBodW1hbkJvbmVzW2JvbmVOYW1lXSA9IHsgbm9kZSB9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5vaWQgPSBuZXcgVlJNSHVtYW5vaWQodGhpcy5fZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXMpLCB7XG4gICAgICBhdXRvVXBkYXRlSHVtYW5Cb25lczogdGhpcy5hdXRvVXBkYXRlSHVtYW5Cb25lcyxcbiAgICB9KTtcbiAgICBnbHRmLnNjZW5lLmFkZChodW1hbm9pZC5ub3JtYWxpemVkSHVtYW5Cb25lc1Jvb3QpO1xuXG4gICAgaWYgKHRoaXMuaGVscGVyUm9vdCkge1xuICAgICAgY29uc3QgaGVscGVyID0gbmV3IFZSTUh1bWFub2lkSGVscGVyKGh1bWFub2lkKTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5vaWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZDogVjBWUk0uSHVtYW5vaWQgfCB1bmRlZmluZWQgPSB2cm1FeHQuaHVtYW5vaWQ7XG4gICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5Cb25lczogUGFydGlhbDxWUk1IdW1hbkJvbmVzPiA9IHt9O1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzICE9IG51bGwpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzLm1hcChhc3luYyAoYm9uZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZS5ib25lO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gYm9uZS5ub2RlO1xuXG4gICAgICAgICAgaWYgKGJvbmVOYW1lID09IG51bGwgfHwgaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCB0aGlzLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgaW5kZXgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHNwZWNpZmllZCBub2RlIGRvZXMgbm90IGV4aXN0LCBlbWl0IGEgd2FybmluZ1xuICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQSBnbFRGIG5vZGUgYm91bmQgdG8gdGhlIGh1bWFub2lkIGJvbmUgJHtib25lTmFtZX0gKGluZGV4ID0gJHtpbmRleH0pIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbWFwIHRvIG5ldyBib25lIG5hbWVcbiAgICAgICAgICBjb25zdCB0aHVtYkJvbmVOYW1lID0gdGh1bWJCb25lTmFtZU1hcFtib25lTmFtZV07XG4gICAgICAgICAgY29uc3QgbmV3Qm9uZU5hbWUgPSAodGh1bWJCb25lTmFtZSA/PyBib25lTmFtZSkgYXMgVjFWUk1TY2hlbWEuSHVtYW5vaWRIdW1hbkJvbmVOYW1lO1xuXG4gICAgICAgICAgLy8gdjAgVlJNcyBtaWdodCBoYXZlIGEgbXVsdGlwbGUgbm9kZXMgYXR0YWNoZWQgdG8gYSBzaW5nbGUgYm9uZS4uLlxuICAgICAgICAgIC8vIHNvIGlmIHRoZXJlIGFscmVhZHkgaXMgYW4gZW50cnkgaW4gdGhlIGBodW1hbkJvbmVzYCwgc2hvdyBhIHdhcm5pbmcgYW5kIGlnbm9yZSBpdFxuICAgICAgICAgIGlmIChodW1hbkJvbmVzW25ld0JvbmVOYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIGBNdWx0aXBsZSBib25lIGVudHJpZXMgZm9yICR7bmV3Qm9uZU5hbWV9IGRldGVjdGVkIChpbmRleCA9ICR7aW5kZXh9KSwgaWdub3JpbmcgZHVwbGljYXRlZCBlbnRyaWVzLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNldCB0byB0aGUgYGh1bWFuQm9uZXNgXG4gICAgICAgICAgaHVtYW5Cb25lc1tuZXdCb25lTmFtZV0gPSB7IG5vZGUgfTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFub2lkID0gbmV3IFZSTUh1bWFub2lkKHRoaXMuX2Vuc3VyZVJlcXVpcmVkQm9uZXNFeGlzdChodW1hbkJvbmVzKSwge1xuICAgICAgYXV0b1VwZGF0ZUh1bWFuQm9uZXM6IHRoaXMuYXV0b1VwZGF0ZUh1bWFuQm9uZXMsXG4gICAgfSk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoaHVtYW5vaWQubm9ybWFsaXplZEh1bWFuQm9uZXNSb290KTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1IdW1hbm9pZEhlbHBlcihodW1hbm9pZCk7XG4gICAgICB0aGlzLmhlbHBlclJvb3QuYWRkKGhlbHBlcik7XG4gICAgICBoZWxwZXIucmVuZGVyT3JkZXIgPSB0aGlzLmhlbHBlclJvb3QucmVuZGVyT3JkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh1bWFub2lkO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuc3VyZSByZXF1aXJlZCBib25lcyBleGlzdCBpbiBnaXZlbiBodW1hbiBib25lcy5cbiAgICogQHBhcmFtIGh1bWFuQm9uZXMgSHVtYW4gYm9uZXNcbiAgICogQHJldHVybnMgSHVtYW4gYm9uZXMsIG5vIGxvbmdlciBwYXJ0aWFsIVxuICAgKi9cbiAgcHJpdmF0ZSBfZW5zdXJlUmVxdWlyZWRCb25lc0V4aXN0KGh1bWFuQm9uZXM6IFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4pOiBWUk1IdW1hbkJvbmVzIHtcbiAgICAvLyBlbnN1cmUgcmVxdWlyZWQgYm9uZXMgZXhpc3RcbiAgICBjb25zdCBtaXNzaW5nUmVxdWlyZWRCb25lcyA9IE9iamVjdC52YWx1ZXMoVlJNUmVxdWlyZWRIdW1hbkJvbmVOYW1lKS5maWx0ZXIoXG4gICAgICAocmVxdWlyZWRCb25lTmFtZSkgPT4gaHVtYW5Cb25lc1tyZXF1aXJlZEJvbmVOYW1lXSA9PSBudWxsLFxuICAgICk7XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBhcmUgbWlzc2luZyBib25lc1xuICAgIGlmIChtaXNzaW5nUmVxdWlyZWRCb25lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBWUk1IdW1hbm9pZExvYWRlclBsdWdpbjogVGhlc2UgaHVtYW5vaWQgYm9uZXMgYXJlIHJlcXVpcmVkIGJ1dCBub3QgZXhpc3Q6ICR7bWlzc2luZ1JlcXVpcmVkQm9uZXMuam9pbignLCAnKX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHVtYW5Cb25lcyBhcyBWUk1IdW1hbkJvbmVzO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBGYW5CdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHRoZXRhOiBudW1iZXI7XG4gIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcbiAgcHJpdmF0ZSBfY3VycmVudFRoZXRhID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1cyA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F0dHJQb3M6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0ckluZGV4OiBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRoZXRhID0gMC4wO1xuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRUaGV0YSA9IDAuMDtcbiAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gMC4wO1xuXG4gICAgdGhpcy5fYXR0clBvcyA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IEZsb2F0MzJBcnJheSg2NSAqIDMpLCAzKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCB0aGlzLl9hdHRyUG9zKTtcblxuICAgIHRoaXMuX2F0dHJJbmRleCA9IG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobmV3IFVpbnQxNkFycmF5KDMgKiA2MyksIDEpO1xuICAgIHRoaXMuc2V0SW5kZXgodGhpcy5fYXR0ckluZGV4KTtcblxuICAgIHRoaXMuX2J1aWxkSW5kZXgoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2hvdWxkVXBkYXRlR2VvbWV0cnkgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9jdXJyZW50VGhldGEgIT09IHRoaXMudGhldGEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUaGV0YSA9IHRoaXMudGhldGE7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSYWRpdXMgIT09IHRoaXMucmFkaXVzKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UmFkaXVzID0gdGhpcy5yYWRpdXM7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRyUG9zLnNldFhZWigwLCAwLjAsIDAuMCwgMC4wKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgY29uc3QgdCA9IChpIC8gNjMuMCkgKiB0aGlzLl9jdXJyZW50VGhldGE7XG5cbiAgICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKGkgKyAxLCB0aGlzLl9jdXJyZW50UmFkaXVzICogTWF0aC5zaW4odCksIDAuMCwgdGhpcy5fY3VycmVudFJhZGl1cyAqIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRyUG9zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkSW5kZXgoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MzsgaSsrKSB7XG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFlaKGkgKiAzLCAwLCBpICsgMSwgaSArIDIpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJJbmRleC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSBleHRlbmRzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHtcbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuICBwdWJsaWMgdGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSBfY3VycmVudFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIF9jdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcbiAgcHJpdmF0ZSByZWFkb25seSBfYXR0clBvczogVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdHRySW5kZXg6IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucmFkaXVzID0gMC4wO1xuICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSAwLjA7XG5cbiAgICB0aGlzLnRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAgIHRoaXMuX2F0dHJQb3MgPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBGbG9hdDMyQXJyYXkoMjk0KSwgMyk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgdGhpcy5fYXR0clBvcyk7XG5cbiAgICB0aGlzLl9hdHRySW5kZXggPSBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5ldyBVaW50MTZBcnJheSgxOTQpLCAxKTtcbiAgICB0aGlzLnNldEluZGV4KHRoaXMuX2F0dHJJbmRleCk7XG5cbiAgICB0aGlzLl9idWlsZEluZGV4KCk7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFJhZGl1cyAhPT0gdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRSYWRpdXMgPSB0aGlzLnJhZGl1cztcbiAgICAgIHNob3VsZFVwZGF0ZUdlb21ldHJ5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRUYWlsLmVxdWFscyh0aGlzLnRhaWwpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMudGFpbCk7XG4gICAgICBzaG91bGRVcGRhdGVHZW9tZXRyeSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFVwZGF0ZUdlb21ldHJ5KSB7XG4gICAgICB0aGlzLl9idWlsZFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IHQgPSAoaSAvIDE2LjApICogTWF0aC5QSTtcblxuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooaSwgTWF0aC5jb3ModCksIE1hdGguc2luKHQpLCAwLjApO1xuICAgICAgdGhpcy5fYXR0clBvcy5zZXRYWVooMzIgKyBpLCAwLjAsIE1hdGguY29zKHQpLCBNYXRoLnNpbih0KSk7XG4gICAgICB0aGlzLl9hdHRyUG9zLnNldFhZWig2NCArIGksIE1hdGguc2luKHQpLCAwLjAsIE1hdGguY29zKHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjYWxlKHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMsIHRoaXMuX2N1cnJlbnRSYWRpdXMpO1xuICAgIHRoaXMudHJhbnNsYXRlKHRoaXMuX2N1cnJlbnRUYWlsLngsIHRoaXMuX2N1cnJlbnRUYWlsLnksIHRoaXMuX2N1cnJlbnRUYWlsLnopO1xuXG4gICAgdGhpcy5fYXR0clBvcy5zZXRYWVooOTYsIDAsIDAsIDApO1xuICAgIHRoaXMuX2F0dHJQb3Muc2V0WFlaKDk3LCB0aGlzLl9jdXJyZW50VGFpbC54LCB0aGlzLl9jdXJyZW50VGFpbC55LCB0aGlzLl9jdXJyZW50VGFpbC56KTtcblxuICAgIHRoaXMuX2F0dHJQb3MubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRJbmRleCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgIGNvbnN0IGkxID0gKGkgKyAxKSAlIDMyO1xuXG4gICAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoaSAqIDIsIGksIGkxKTtcbiAgICAgIHRoaXMuX2F0dHJJbmRleC5zZXRYWSg2NCArIGkgKiAyLCAzMiArIGksIDMyICsgaTEpO1xuICAgICAgdGhpcy5fYXR0ckluZGV4LnNldFhZKDEyOCArIGkgKiAyLCA2NCArIGksIDY0ICsgaTEpO1xuICAgIH1cbiAgICB0aGlzLl9hdHRySW5kZXguc2V0WFkoMTkyLCA5NiwgOTcpO1xuXG4gICAgdGhpcy5fYXR0ckluZGV4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi4vVlJNTG9va0F0JztcbmltcG9ydCB7IEZhbkJ1ZmZlckdlb21ldHJ5IH0gZnJvbSAnLi91dGlscy9GYW5CdWZmZXJHZW9tZXRyeSc7XG5pbXBvcnQgeyBMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkgfSBmcm9tICcuL3V0aWxzL0xpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSc7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgU1FSVF8yX09WRVJfMiA9IE1hdGguc3FydCgyLjApIC8gMi4wO1xuY29uc3QgUVVBVF9YWV9DVzkwID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oMCwgMCwgLVNRUlRfMl9PVkVSXzIsIFNRUlRfMl9PVkVSXzIpO1xuY29uc3QgVkVDM19QT1NJVElWRV9ZID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAxLjAsIDAuMCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWxwZXIgZXh0ZW5kcyBUSFJFRS5Hcm91cCB7XG4gIHB1YmxpYyByZWFkb25seSB2cm1Mb29rQXQ6IFZSTUxvb2tBdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVzaFlhdzogVEhSRUUuTWVzaDxGYW5CdWZmZXJHZW9tZXRyeSwgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw+O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoUGl0Y2g6IFRIUkVFLk1lc2g8RmFuQnVmZmVyR2VvbWV0cnksIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsPjtcbiAgcHJpdmF0ZSByZWFkb25seSBfbGluZVRhcmdldDogVEhSRUUuTGluZVNlZ21lbnRzPExpbmVBbmRTcGhlcmVCdWZmZXJHZW9tZXRyeSwgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWw+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihsb29rQXQ6IFZSTUxvb2tBdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLnZybUxvb2tBdCA9IGxvb2tBdDtcblxuICAgIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IEZhbkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICBnZW9tZXRyeS5yYWRpdXMgPSAwLjU7XG5cbiAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4MDBmZjAwLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9tZXNoUGl0Y2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgdGhpcy5hZGQodGhpcy5fbWVzaFBpdGNoKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBGYW5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgZ2VvbWV0cnkucmFkaXVzID0gMC41O1xuXG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmMDAwMCxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgZGVwdGhUZXN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fbWVzaFlhdyA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLmFkZCh0aGlzLl9tZXNoWWF3KTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBMaW5lQW5kU3BoZXJlQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlb21ldHJ5LnJhZGl1cyA9IDAuMTtcblxuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2xpbmVUYXJnZXQgPSBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0LmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuYWRkKHRoaXMuX2xpbmVUYXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuX21lc2hZYXcubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5fbWVzaFBpdGNoLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgdGhpcy5fbGluZVRhcmdldC5tYXRlcmlhbC5kaXNwb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlTWF0cml4V29ybGQoZm9yY2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyB1cGRhdGUgZ2VvbWV0cmllc1xuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy52cm1Mb29rQXQueWF3O1xuICAgIHRoaXMuX21lc2hZYXcuZ2VvbWV0cnkudGhldGEgPSB5YXc7XG4gICAgdGhpcy5fbWVzaFlhdy5nZW9tZXRyeS51cGRhdGUoKTtcblxuICAgIGNvbnN0IHBpdGNoID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnZybUxvb2tBdC5waXRjaDtcbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkudGhldGEgPSBwaXRjaDtcbiAgICB0aGlzLl9tZXNoUGl0Y2guZ2VvbWV0cnkudXBkYXRlKCk7XG5cbiAgICAvLyBnZXQgd29ybGQgcG9zaXRpb24gYW5kIHF1YXRlcm5pb25cbiAgICB0aGlzLnZybUxvb2tBdC5nZXRMb29rQXRXb3JsZFBvc2l0aW9uKF92M0EpO1xuICAgIHRoaXMudnJtTG9va0F0LmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEEpO1xuXG4gICAgLy8gY2FsY3VsYXRlIHJvdGF0aW9uIHVzaW5nIGZhY2VGcm9udFxuICAgIF9xdWF0QS5tdWx0aXBseSh0aGlzLnZybUxvb2tBdC5nZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKF9xdWF0QikpO1xuXG4gICAgLy8gc2V0IHRyYW5zZm9ybSB0byBtZXNoZXNcbiAgICB0aGlzLl9tZXNoWWF3LnBvc2l0aW9uLmNvcHkoX3YzQSk7XG4gICAgdGhpcy5fbWVzaFlhdy5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKTtcblxuICAgIHRoaXMuX21lc2hQaXRjaC5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLmNvcHkoX3F1YXRBKTtcbiAgICB0aGlzLl9tZXNoUGl0Y2gucXVhdGVybmlvbi5tdWx0aXBseShfcXVhdEIuc2V0RnJvbUF4aXNBbmdsZShWRUMzX1BPU0lUSVZFX1ksIHlhdykpO1xuICAgIHRoaXMuX21lc2hQaXRjaC5xdWF0ZXJuaW9uLm11bHRpcGx5KFFVQVRfWFlfQ1c5MCk7XG5cbiAgICAvLyB1cGRhdGUgdGFyZ2V0IGxpbmUgYW5kIHNwaGVyZVxuICAgIGNvbnN0IHsgdGFyZ2V0LCBhdXRvVXBkYXRlIH0gPSB0aGlzLnZybUxvb2tBdDtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgYXV0b1VwZGF0ZSkge1xuICAgICAgdGFyZ2V0LmdldFdvcmxkUG9zaXRpb24oX3YzQikuc3ViKF92M0EpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5nZW9tZXRyeS50YWlsLmNvcHkoX3YzQik7XG4gICAgICB0aGlzLl9saW5lVGFyZ2V0Lmdlb21ldHJ5LnVwZGF0ZSgpO1xuICAgICAgdGhpcy5fbGluZVRhcmdldC5wb3NpdGlvbi5jb3B5KF92M0EpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IHRyYW5zZm9ybSB0byBtZXNoZXNcbiAgICBzdXBlci51cGRhdGVNYXRyaXhXb3JsZChmb3JjZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbi8qKlxuICogRXh0cmFjdCB3b3JsZCByb3RhdGlvbiBvZiBhbiBvYmplY3QgZnJvbSBpdHMgd29ybGQgc3BhY2UgbWF0cml4LCBpbiBjaGVhcGVyIHdheS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3RcbiAqIEBwYXJhbSBvdXQgVGFyZ2V0IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIG91dCwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBDYWxjdWxhdGUgYXppbXV0aCAvIGFsdGl0dWRlIGFuZ2xlcyBmcm9tIGEgdmVjdG9yLlxuICpcbiAqIFRoaXMgcmV0dXJucyBhIGRpZmZlcmVuY2Ugb2YgYW5nbGVzIGZyb20gKDEsIDAsIDApLlxuICogQXppbXV0aCByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBZIGF4aXMuXG4gKiBBbHRpdHVkZSByZXByZXNlbnRzIGFuIGFuZ2xlIGFyb3VuZCBaIGF4aXMuXG4gKiBJdCBpcyByb3RhdGVkIGluIGludHJpbnNpYyBZLVogb3JkZXIuXG4gKlxuICogQHBhcmFtIHZlY3RvciBUaGUgdmVjdG9yXG4gKiBAcmV0dXJucyBBIHR1cGxlIGNvbnRhaW5zIHR3byBhbmdsZXMsIGBbIGF6aW11dGgsIGFsdGl0dWRlIF1gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjQXppbXV0aEFsdGl0dWRlKHZlY3RvcjogVEhSRUUuVmVjdG9yMyk6IFthemltdXRoOiBudW1iZXIsIGFsdGl0dWRlOiBudW1iZXJdIHtcbiAgcmV0dXJuIFtNYXRoLmF0YW4yKC12ZWN0b3IueiwgdmVjdG9yLngpLCBNYXRoLmF0YW4yKHZlY3Rvci55LCBNYXRoLnNxcnQodmVjdG9yLnggKiB2ZWN0b3IueCArIHZlY3Rvci56ICogdmVjdG9yLnopKV07XG59XG4iLCIvKipcbiAqIE1ha2Ugc3VyZSB0aGUgYW5nbGUgaXMgd2l0aGluIC1QSSB0byBQSS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIHNhbml0aXplQW5nbGUoMS41ICogTWF0aC5QSSkgLy8gLTAuNSAqIFBJXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gYW5nbGUgQW4gaW5wdXQgYW5nbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplQW5nbGUoYW5nbGU6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IHJvdW5kVHVybiA9IE1hdGgucm91bmQoYW5nbGUgLyAyLjAgLyBNYXRoLlBJKTtcbiAgcmV0dXJuIGFuZ2xlIC0gMi4wICogTWF0aC5QSSAqIHJvdW5kVHVybjtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL2dldFdvcmxkUXVhdGVybmlvbkxpdGUnO1xuaW1wb3J0IHsgcXVhdEludmVydENvbXBhdCB9IGZyb20gJy4uL3V0aWxzL3F1YXRJbnZlcnRDb21wYXQnO1xuaW1wb3J0IHsgY2FsY0F6aW11dGhBbHRpdHVkZSB9IGZyb20gJy4vdXRpbHMvY2FsY0F6aW11dGhBbHRpdHVkZSc7XG5pbXBvcnQgdHlwZSB7IFZSTUxvb2tBdEFwcGxpZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGxpZXInO1xuaW1wb3J0IHsgc2FuaXRpemVBbmdsZSB9IGZyb20gJy4vdXRpbHMvc2FuaXRpemVBbmdsZSc7XG5cbmNvbnN0IFZFQzNfUE9TSVRJVkVfWiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAxLjApO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigpO1xuXG4vKipcbiAqIEEgY2xhc3MgY29udHJvbHMgZXllIGdhemUgbW92ZW1lbnRzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0IHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luIG9mIExvb2tBdC4gUG9zaXRpb24gb2Zmc2V0IGZyb20gdGhlIGhlYWQgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBvZmZzZXRGcm9tSGVhZEJvbmUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJdHMgYXNzb2NpYXRlZCB7QGxpbmsgVlJNSHVtYW5vaWR9LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFub2lkOiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogVGhlIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfSBvZiB0aGUgTG9va0F0LlxuICAgKi9cbiAgcHVibGljIGFwcGxpZXI6IFZSTUxvb2tBdEFwcGxpZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlIExvb2tBdCB3aWxsIGJlIHVwZGF0ZWQgYXV0b21hdGljYWxseSBieSBjYWxsaW5nIHtAbGluayB1cGRhdGV9LCB0b3dhcmRpbmcgdGhlIGRpcmVjdGlvbiB0byB0aGUge0BsaW5rIHRhcmdldH0uXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIHRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIExvb2tBdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIHtAbGluayBhdXRvVXBkYXRlfSBpcyBkaXNhYmxlZC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBhdXRvVXBkYXRlfVxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF95YXc6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHVibGljIGdldCB5YXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5feWF3O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgeWF3KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl95YXcgPSB2YWx1ZTtcbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGN1cnJlbnQgYW5nbGUgYXJvdW5kIFggYXhpcywgaW4gZGVncmVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9waXRjaDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBhbmdsZSBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBpdGNoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BpdGNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGFuZ2xlIGFyb3VuZCBYIGF4aXMsIGluIGRlZ3JlZS5cbiAgICovXG4gIHB1YmxpYyBzZXQgcGl0Y2godmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BpdGNoID0gdmFsdWU7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuZ2xlcyBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gaXRzIFtAbGluayBhcHBsaWVyXS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmVlZHNVcGRhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdvcmxkIHJvdGF0aW9uIG9mIHRoZSBoZWFkIGluIGl0cyByZXN0IHBvc2UuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0SGVhZFdvcmxkUXVhdGVybmlvbjogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBnZXRFdWxlcn0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZXVsZXIoKTogVEhSRUUuRXVsZXIge1xuICAgIGNvbnNvbGUud2FybignVlJNTG9va0F0OiBldWxlciBpcyBkZXByZWNhdGVkLiB1c2UgZ2V0RXVsZXIoKSBpbnN0ZWFkLicpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RXVsZXIobmV3IFRIUkVFLkV1bGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEge0BsaW5rIFZSTUh1bWFub2lkfVxuICAgKiBAcGFyYW0gYXBwbGllciBBIHtAbGluayBWUk1Mb29rQXRBcHBsaWVyfVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGh1bWFub2lkOiBWUk1IdW1hbm9pZCwgYXBwbGllcjogVlJNTG9va0F0QXBwbGllcikge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcbiAgICB0aGlzLmFwcGxpZXIgPSBhcHBsaWVyO1xuXG4gICAgdGhpcy5feWF3ID0gMC4wO1xuICAgIHRoaXMuX3BpdGNoID0gMC4wO1xuICAgIHRoaXMuX25lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uID0gdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24obmV3IFRIUkVFLlF1YXRlcm5pb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyB5YXctcGl0Y2ggYW5nbGVzIGFzIGFuIGBFdWxlcmAuXG4gICAqIERvZXMgTk9UIGNvbnNpZGVyIHtAbGluayBmYWNlRnJvbnR9LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgZXVsZXJcbiAgICovXG4gIHB1YmxpYyBnZXRFdWxlcih0YXJnZXQ6IFRIUkVFLkV1bGVyKTogVEhSRUUuRXVsZXIge1xuICAgIHJldHVybiB0YXJnZXQuc2V0KFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5fcGl0Y2gsIFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5feWF3LCAwLjAsICdZWFonKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBnaXZlbiB7QGxpbmsgVlJNTG9va0F0fSBpbnRvIHRoaXMgb25lLlxuICAgKiB7QGxpbmsgaHVtYW5vaWR9IG11c3QgYmUgc2FtZSBhcyB0aGUgc291cmNlIG9uZS5cbiAgICoge0BsaW5rIGFwcGxpZXJ9IHdpbGwgcmVmZXJlbmNlIHRoZSBzYW1lIGluc3RhbmNlIGFzIHRoZSBzb3VyY2Ugb25lLlxuICAgKiBAcGFyYW0gc291cmNlIFRoZSB7QGxpbmsgVlJNTG9va0F0fSB5b3Ugd2FudCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHRoaXNcbiAgICovXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogVlJNTG9va0F0KTogdGhpcyB7XG4gICAgaWYgKHRoaXMuaHVtYW5vaWQgIT09IHNvdXJjZS5odW1hbm9pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWUk1Mb29rQXQ6IGh1bWFub2lkIG11c3QgYmUgc2FtZSBpbiBvcmRlciB0byBjb3B5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUuY29weShzb3VyY2Uub2Zmc2V0RnJvbUhlYWRCb25lKTtcbiAgICB0aGlzLmFwcGxpZXIgPSBzb3VyY2UuYXBwbGllcjtcbiAgICB0aGlzLmF1dG9VcGRhdGUgPSBzb3VyY2UuYXV0b1VwZGF0ZTtcbiAgICB0aGlzLnRhcmdldCA9IHNvdXJjZS50YXJnZXQ7XG4gICAgdGhpcy5mYWNlRnJvbnQuY29weShzb3VyY2UuZmFjZUZyb250KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjbG9uZSBvZiB0aGlzIHtAbGluayBWUk1Mb29rQXR9LlxuICAgKiBOb3RlIHRoYXQge0BsaW5rIGh1bWFub2lkfSBhbmQge0BsaW5rIGFwcGxpZXJ9IHdpbGwgcmVmZXJlbmNlIHRoZSBzYW1lIGluc3RhbmNlIGFzIHRoaXMgb25lLlxuICAgKiBAcmV0dXJucyBDb3BpZWQge0BsaW5rIFZSTUxvb2tBdH1cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWUk1Mb29rQXQge1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0KHRoaXMuaHVtYW5vaWQsIHRoaXMuYXBwbGllcikuY29weSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgbG9va0F0IGRpcmVjdGlvbiB0byBpbml0aWFsIGRpcmVjdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl95YXcgPSAwLjA7XG4gICAgdGhpcy5fcGl0Y2ggPSAwLjA7XG4gICAgdGhpcy5fbmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgaGVhZCBwb3NpdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkUG9zaXRpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2hlYWQnKSE7XG5cbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5vZmZzZXRGcm9tSGVhZEJvbmUpLmFwcGx5TWF0cml4NChoZWFkLm1hdHJpeFdvcmxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRzIGhlYWQgcm90YXRpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICogRG9lcyBOT1QgY29uc2lkZXIge0BsaW5rIGZhY2VGcm9udH0uXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlF1YXRlcm5pb25gXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGRRdWF0ZXJuaW9uKHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGNvbnN0IGhlYWQgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdoZWFkJykhO1xuXG4gICAgcmV0dXJuIGdldFdvcmxkUXVhdGVybmlvbkxpdGUoaGVhZCwgdGFyZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgK1ogdW5pdCB2ZWN0b3Igb2YgdGhlIGh1bWFub2lkIEhlYWQgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHB1YmxpYyBnZXRGYWNlRnJvbnRRdWF0ZXJuaW9uKHRhcmdldDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICAgIGlmICh0aGlzLmZhY2VGcm9udC5kaXN0YW5jZVRvU3F1YXJlZChWRUMzX1BPU0lUSVZFX1opIDwgMC4wMSkge1xuICAgICAgcmV0dXJuIHRhcmdldC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKS5pbnZlcnQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpLnByZW11bHRpcGx5KF9xdWF0RC5jb3B5KHRoaXMuX3Jlc3RIZWFkV29ybGRRdWF0ZXJuaW9uKS5pbnZlcnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBMb29rQXQgZGlyZWN0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgYFRIUkVFLlZlY3RvcjNgXG4gICAqL1xuICBwdWJsaWMgZ2V0TG9va0F0V29ybGREaXJlY3Rpb24odGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgdGhpcy5nZXRMb29rQXRXb3JsZFF1YXRlcm5pb24oX3F1YXRCKTtcbiAgICB0aGlzLmdldEZhY2VGcm9udFF1YXRlcm5pb24oX3F1YXRDKTtcblxuICAgIHJldHVybiB0YXJnZXRcbiAgICAgIC5jb3B5KFZFQzNfUE9TSVRJVkVfWilcbiAgICAgIC5hcHBseVF1YXRlcm5pb24oX3F1YXRCKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihfcXVhdEMpXG4gICAgICAuYXBwbHlFdWxlcih0aGlzLmdldEV1bGVyKF9ldWxlckEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaXRzIExvb2tBdCBwb3NpdGlvbi5cbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYge0BsaW5rIFZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZX0gaXMgZW5hYmxlZC5cbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uIEEgdGFyZ2V0IHBvc2l0aW9uLCBpbiB3b3JsZCBzcGFjZVxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIGxvY2FsIGNvb3JkaW5hdGVcbiAgICBjb25zdCBoZWFkUm90RGlmZkludiA9IF9xdWF0QVxuICAgICAgLmNvcHkodGhpcy5fcmVzdEhlYWRXb3JsZFF1YXRlcm5pb24pXG4gICAgICAubXVsdGlwbHkocXVhdEludmVydENvbXBhdCh0aGlzLmdldExvb2tBdFdvcmxkUXVhdGVybmlvbihfcXVhdEIpKSk7XG4gICAgY29uc3QgaGVhZFBvcyA9IHRoaXMuZ2V0TG9va0F0V29ybGRQb3NpdGlvbihfdjNCKTtcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDLmNvcHkocG9zaXRpb24pLnN1YihoZWFkUG9zKS5hcHBseVF1YXRlcm5pb24oaGVhZFJvdERpZmZJbnYpLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGFuZ2xlc1xuICAgIGNvbnN0IFthemltdXRoRnJvbSwgYWx0aXR1ZGVGcm9tXSA9IGNhbGNBemltdXRoQWx0aXR1ZGUodGhpcy5mYWNlRnJvbnQpO1xuICAgIGNvbnN0IFthemltdXRoVG8sIGFsdGl0dWRlVG9dID0gY2FsY0F6aW11dGhBbHRpdHVkZShsb29rQXREaXIpO1xuICAgIGNvbnN0IHlhdyA9IHNhbml0aXplQW5nbGUoYXppbXV0aFRvIC0gYXppbXV0aEZyb20pO1xuICAgIGNvbnN0IHBpdGNoID0gc2FuaXRpemVBbmdsZShhbHRpdHVkZUZyb20gLSBhbHRpdHVkZVRvKTsgLy8gc3Bpbm5pbmcgKDEsIDAsIDApIENDVyBhcm91bmQgWiBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayB1cCwgd2hpbGUgc3Bpbm5pbmcgKDAsIDAsIDEpIENDVyBhcm91bmQgWCBheGlzIG1ha2VzIHRoZSB2ZWN0b3IgbG9vayBkb3duXG5cbiAgICAvLyBhcHBseSBhbmdsZXNcbiAgICB0aGlzLl95YXcgPSBUSFJFRS5NYXRoVXRpbHMuUkFEMkRFRyAqIHlhdztcbiAgICB0aGlzLl9waXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogcGl0Y2g7XG5cbiAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBWUk1Mb29rQXRIZWFkLlxuICAgKiBJZiB7QGxpbmsgVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlfSBpcyBkaXNhYmxlZCwgaXQgd2lsbCBkbyBub3RoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lLCBpdCBpc24ndCB1c2VkIHRob3VnaC4gWW91IGNhbiB1c2UgdGhlIHBhcmFtZXRlciBpZiB5b3Ugd2FudCB0byB1c2UgdGhpcyBpbiB5b3VyIG93biBleHRlbmRlZCB7QGxpbmsgVlJNTG9va0F0fS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX25lZWRzVXBkYXRlKSB7XG4gICAgICB0aGlzLl9uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmFwcGxpZXIuYXBwbHlZYXdQaXRjaCh0aGlzLl95YXcsIHRoaXMuX3BpdGNoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBjYWxjQXppbXV0aEFsdGl0dWRlIH0gZnJvbSAnLi91dGlscy9jYWxjQXppbXV0aEFsdGl0dWRlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9nZXRXb3JsZFF1YXRlcm5pb25MaXRlJztcblxuY29uc3QgVkVDM19QT1NJVElWRV9aID0gbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDEuMCk7XG5cbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfcXVhdEIgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX2V1bGVyQSA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCAnWVhaJyk7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IGFwcGxpZXMgZXllIGdhemUgZGlyZWN0aW9ucyB0byBhIFZSTS5cbiAqIEl0IHdpbGwgYmUgdXNlZCBieSB7QGxpbmsgVlJNTG9va0F0fS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBsaWVyIGltcGxlbWVudHMgVlJNTG9va0F0QXBwbGllciB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnQgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdib25lJztcblxuICAvKipcbiAgICogSXRzIGFzc29jaWF0ZWQge0BsaW5rIFZSTUh1bWFub2lkfS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBpbndhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyByaWdodC4gVGhlIHJpZ2h0IGV5ZSBtb3ZlcyBsZWZ0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciBob3Jpem9udGFsIG91dHdhcmQgbW92ZW1lbnQuIFRoZSBsZWZ0IGV5ZSBtb3ZlcyBsZWZ0LiBUaGUgcmlnaHQgZXllIG1vdmVzIHJpZ2h0LlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IGZvciB2ZXJ0aWNhbCBkb3dud2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgdXB3YXJkcy5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcFZlcnRpY2FsRG93bjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgdXB3YXJkIG1vdmVtZW50LiBCb3RoIGV5ZXMgbW92ZSBkb3dud2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbFVwOiBWUk1Mb29rQXRSYW5nZU1hcDtcblxuICAvKipcbiAgICogVGhlIGZyb250IGRpcmVjdGlvbiBvZiB0aGUgZmFjZS5cbiAgICogSW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgVlJNIDAuMCBjb21wYXQgKFZSTSAwLjAgbW9kZWxzIGFyZSBmYWNpbmcgWi0gaW5zdGVhZCBvZiBaKykuXG4gICAqIFlvdSB1c3VhbGx5IGRvbid0IHdhbnQgdG8gdG91Y2ggdGhpcy5cbiAgICovXG4gIHB1YmxpYyBmYWNlRnJvbnQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN0IHF1YXRlcm5pb24gb2YgTGVmdEV5ZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVzdFF1YXRMZWZ0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdCBxdWF0ZXJuaW9uIG9mIFJpZ2h0RXllIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0UXVhdFJpZ2h0RXllOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgd29ybGQtc3BhY2UgcmVzdCBxdWF0ZXJuaW9uIG9mIHRoZSBwYXJlbnQgb2YgdGhlIGh1bWFub2lkIExlZnRFeWUuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogVGhlIHdvcmxkLXNwYWNlIHJlc3QgcXVhdGVybmlvbiBvZiB0aGUgcGFyZW50IG9mIHRoZSBodW1hbm9pZCBSaWdodEV5ZS5cbiAgICovXG4gIHByaXZhdGUgX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdDogVEhSRUUuUXVhdGVybmlvbjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHtAbGluayBWUk1Mb29rQXRCb25lQXBwbGllcn0uXG4gICAqXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH1cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIG91dGVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsRG93biBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwVmVydGljYWxVcCBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICAgIHJhbmdlTWFwSG9yaXpvbnRhbElubmVyOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICkge1xuICAgIHRoaXMuaHVtYW5vaWQgPSBodW1hbm9pZDtcblxuICAgIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsSW5uZXIgPSByYW5nZU1hcEhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyID0gcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5yYW5nZU1hcFZlcnRpY2FsRG93biA9IHJhbmdlTWFwVmVydGljYWxEb3duO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwID0gcmFuZ2VNYXBWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5mYWNlRnJvbnQgPSBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMS4wKTtcblxuICAgIC8vIHNldCByZXN0IHF1YXRlcm5pb25zXG4gICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbiAgICB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5fcmVzdFJpZ2h0RXllUGFyZW50V29ybGRRdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAgIGNvbnN0IGxlZnRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG4gICAgY29uc3QgcmlnaHRFeWUgPSB0aGlzLmh1bWFub2lkLmdldFJhd0JvbmVOb2RlKCdsZWZ0RXllJyk7XG5cbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgdGhpcy5fcmVzdFF1YXRMZWZ0RXllLmNvcHkobGVmdEV5ZS5xdWF0ZXJuaW9uKTtcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUobGVmdEV5ZS5wYXJlbnQhLCB0aGlzLl9yZXN0TGVmdEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuXG4gICAgaWYgKHJpZ2h0RXllKSB7XG4gICAgICB0aGlzLl9yZXN0UXVhdFJpZ2h0RXllLmNvcHkocmlnaHRFeWUucXVhdGVybmlvbik7XG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHJpZ2h0RXllLnBhcmVudCEsIHRoaXMuX3Jlc3RSaWdodEV5ZVBhcmVudFdvcmxkUXVhdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBpbnB1dCBhbmdsZSB0byBpdHMgYXNzb2NpYXRlZCBWUk0gbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB5YXcgUm90YXRpb24gYXJvdW5kIFkgYXhpcywgaW4gZGVncmVlXG4gICAqIEBwYXJhbSBwaXRjaCBSb3RhdGlvbiBhcm91bmQgWCBheGlzLCBpbiBkZWdyZWVcbiAgICovXG4gIHB1YmxpYyBhcHBseVlhd1BpdGNoKHlhdzogbnVtYmVyLCBwaXRjaDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ2xlZnRFeWUnKTtcbiAgICBjb25zdCByaWdodEV5ZSA9IHRoaXMuaHVtYW5vaWQuZ2V0UmF3Qm9uZU5vZGUoJ3JpZ2h0RXllJyk7XG4gICAgY29uc3QgbGVmdEV5ZU5vcm1hbGl6ZWQgPSB0aGlzLmh1bWFub2lkLmdldE5vcm1hbGl6ZWRCb25lTm9kZSgnbGVmdEV5ZScpO1xuICAgIGNvbnN0IHJpZ2h0RXllTm9ybWFsaXplZCA9IHRoaXMuaHVtYW5vaWQuZ2V0Tm9ybWFsaXplZEJvbmVOb2RlKCdyaWdodEV5ZScpO1xuICAgIC8vIGxlZnRcbiAgICBpZiAobGVmdEV5ZSkge1xuICAgICAgaWYgKHBpdGNoIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueCA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24ubWFwKC1waXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnggPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbFVwLm1hcChwaXRjaCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyQS55ID0gLVRIUkVFLk1hdGhVdGlscy5ERUcyUkFEICogdGhpcy5yYW5nZU1hcEhvcml6b250YWxJbm5lci5tYXAoLXlhdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXJBLnkgPSBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKHlhdyk7XG4gICAgICB9XG5cbiAgICAgIF9xdWF0QS5zZXRGcm9tRXVsZXIoX2V1bGVyQSk7XG4gICAgICB0aGlzLl9nZXRXb3JsZEZhY2VGcm9udFF1YXQoX3F1YXRCKTtcblxuICAgICAgLy8gX3F1YXRCICogX3F1YXRBICogX3F1YXRCXi0xXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgTG9va0F0IHJvdGF0aW9uXG4gICAgICAvLyBhbmQgX3F1YXRCIGlzIHdvcmxkRmFjZUZyb250UXVhdFxuICAgICAgbGVmdEV5ZU5vcm1hbGl6ZWQhLnF1YXRlcm5pb24uY29weShfcXVhdEIpLm11bHRpcGx5KF9xdWF0QSkubXVsdGlwbHkoX3F1YXRCLmludmVydCgpKTtcblxuICAgICAgX3F1YXRBLmNvcHkodGhpcy5fcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiBsZWZ0RXllTm9ybWFsaXplZC5xdWF0ZXJuaW9uICogX3F1YXRBICogcmVzdFF1YXRMZWZ0RXllXG4gICAgICAvLyB3aGVyZSBfcXVhdEEgaXMgcmVzdExlZnRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIGxlZnRFeWUucXVhdGVybmlvblxuICAgICAgICAuY29weShsZWZ0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbilcbiAgICAgICAgLm11bHRpcGx5KF9xdWF0QSlcbiAgICAgICAgLnByZW11bHRpcGx5KF9xdWF0QS5pbnZlcnQoKSlcbiAgICAgICAgLm11bHRpcGx5KHRoaXMuX3Jlc3RRdWF0TGVmdEV5ZSk7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAocmlnaHRFeWUpIHtcbiAgICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgICBfZXVsZXJBLnggPSAtVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcCgtcGl0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS54ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwVmVydGljYWxVcC5tYXAocGl0Y2gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWF3IDwgMC4wKSB7XG4gICAgICAgIF9ldWxlckEueSA9IC1USFJFRS5NYXRoVXRpbHMuREVHMlJBRCAqIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyQS55ID0gVEhSRUUuTWF0aFV0aWxzLkRFRzJSQUQgKiB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyLm1hcCh5YXcpO1xuICAgICAgfVxuXG4gICAgICBfcXVhdEEuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICAgICAgdGhpcy5fZ2V0V29ybGRGYWNlRnJvbnRRdWF0KF9xdWF0Qik7XG5cbiAgICAgIC8vIF9xdWF0QiAqIF9xdWF0QSAqIF9xdWF0Ql4tMVxuICAgICAgLy8gd2hlcmUgX3F1YXRBIGlzIExvb2tBdCByb3RhdGlvblxuICAgICAgLy8gYW5kIF9xdWF0QiBpcyB3b3JsZEZhY2VGcm9udFF1YXRcbiAgICAgIHJpZ2h0RXllTm9ybWFsaXplZCEucXVhdGVybmlvbi5jb3B5KF9xdWF0QikubXVsdGlwbHkoX3F1YXRBKS5tdWx0aXBseShfcXVhdEIuaW52ZXJ0KCkpO1xuXG4gICAgICBfcXVhdEEuY29weSh0aGlzLl9yZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXQpO1xuXG4gICAgICAvLyBfcXVhdEFeLTEgKiByaWdodEV5ZU5vcm1hbGl6ZWQucXVhdGVybmlvbiAqIF9xdWF0QSAqIHJlc3RRdWF0UmlnaHRFeWVcbiAgICAgIC8vIHdoZXJlIF9xdWF0QSBpcyByZXN0UmlnaHRFeWVQYXJlbnRXb3JsZFF1YXRcbiAgICAgIHJpZ2h0RXllLnF1YXRlcm5pb25cbiAgICAgICAgLmNvcHkocmlnaHRFeWVOb3JtYWxpemVkIS5xdWF0ZXJuaW9uKVxuICAgICAgICAubXVsdGlwbHkoX3F1YXRBKVxuICAgICAgICAucHJlbXVsdGlwbHkoX3F1YXRBLmludmVydCgpKVxuICAgICAgICAubXVsdGlwbHkodGhpcy5fcmVzdFF1YXRSaWdodEV5ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBxdWF0ZXJuaW9uIHRoYXQgcm90YXRlcyB0aGUgd29ybGQtc3BhY2UgK1ogdW5pdCB2ZWN0b3IgdG8gdGhlIHtAbGluayBmYWNlRnJvbnR9IGRpcmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuUXVhdGVybmlvbmBcbiAgICovXG4gIHByaXZhdGUgX2dldFdvcmxkRmFjZUZyb250UXVhdCh0YXJnZXQ6IFRIUkVFLlF1YXRlcm5pb24pOiBUSFJFRS5RdWF0ZXJuaW9uIHtcbiAgICBpZiAodGhpcy5mYWNlRnJvbnQuZGlzdGFuY2VUb1NxdWFyZWQoVkVDM19QT1NJVElWRV9aKSA8IDAuMDEpIHtcbiAgICAgIHJldHVybiB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGVdID0gY2FsY0F6aW11dGhBbHRpdHVkZSh0aGlzLmZhY2VGcm9udCk7XG4gICAgX2V1bGVyQS5zZXQoMC4wLCAwLjUgKiBNYXRoLlBJICsgZmFjZUZyb250QXppbXV0aCwgZmFjZUZyb250QWx0aXR1ZGUsICdZWlgnKTtcblxuICAgIHJldHVybiB0YXJnZXQuc2V0RnJvbUV1bGVyKF9ldWxlckEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWUk1FeHByZXNzaW9uTWFuYWdlciB9IGZyb20gJy4uL2V4cHJlc3Npb25zJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB0eXBlIHsgVlJNTG9va0F0QXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRSYW5nZU1hcCB9IGZyb20gJy4vVlJNTG9va0F0UmFuZ2VNYXAnO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhcHBsaWVzIGV5ZSBnYXplIGRpcmVjdGlvbnMgdG8gYSBWUk0uXG4gKiBJdCB3aWxsIGJlIHVzZWQgYnkge0BsaW5rIFZSTUxvb2tBdH0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciBpbXBsZW1lbnRzIFZSTUxvb2tBdEFwcGxpZXIge1xuICAvKipcbiAgICogUmVwcmVzZW50IGl0cyB0eXBlIG9mIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnZXhwcmVzc2lvbic7XG5cbiAgLyoqXG4gICAqIEl0cyBhc3NvY2lhdGVkIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBJdCB3b24ndCBiZSB1c2VkIGluIGV4cHJlc3Npb24gYXBwbGllci5cbiAgICogU2VlIGFsc286IHtAbGluayByYW5nZU1hcEhvcml6b250YWxPdXRlcn1cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgaG9yaXpvbnRhbCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgbGVmdCBvciByaWdodC5cbiAgICovXG4gIHB1YmxpYyByYW5nZU1hcEhvcml6b250YWxPdXRlcjogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSBmb3IgdmVydGljYWwgZG93bndhcmQgbW92ZW1lbnQuIEJvdGggZXllcyBtb3ZlIHVwd2FyZHMuXG4gICAqL1xuICBwdWJsaWMgcmFuZ2VNYXBWZXJ0aWNhbERvd246IFZSTUxvb2tBdFJhbmdlTWFwO1xuXG4gIC8qKlxuICAgKiBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gZm9yIHZlcnRpY2FsIHVwd2FyZCBtb3ZlbWVudC4gQm90aCBleWVzIG1vdmUgZG93bndhcmRzLlxuICAgKi9cbiAgcHVibGljIHJhbmdlTWFwVmVydGljYWxVcDogVlJNTG9va0F0UmFuZ2VNYXA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB7QGxpbmsgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbnMgQSB7QGxpbmsgVlJNRXhwcmVzc2lvbk1hbmFnZXJ9XG4gICAqIEBwYXJhbSByYW5nZU1hcEhvcml6b250YWxJbm5lciBBIHtAbGluayBWUk1Mb29rQXRSYW5nZU1hcH0gdXNlZCBmb3IgaW5uZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyIEEge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfSB1c2VkIGZvciBvdXRlciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gcmFuZ2VNYXBWZXJ0aWNhbERvd24gQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSByYW5nZU1hcFZlcnRpY2FsVXAgQSB7QGxpbmsgVlJNTG9va0F0UmFuZ2VNYXB9IHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIGV4cHJlc3Npb25zOiBWUk1FeHByZXNzaW9uTWFuYWdlcixcbiAgICByYW5nZU1hcEhvcml6b250YWxJbm5lcjogVlJNTG9va0F0UmFuZ2VNYXAsXG4gICAgcmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXI6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICAgIHJhbmdlTWFwVmVydGljYWxEb3duOiBWUk1Mb29rQXRSYW5nZU1hcCxcbiAgICByYW5nZU1hcFZlcnRpY2FsVXA6IFZSTUxvb2tBdFJhbmdlTWFwLFxuICApIHtcbiAgICB0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnM7XG5cbiAgICB0aGlzLnJhbmdlTWFwSG9yaXpvbnRhbElubmVyID0gcmFuZ2VNYXBIb3Jpem9udGFsSW5uZXI7XG4gICAgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlciA9IHJhbmdlTWFwSG9yaXpvbnRhbE91dGVyO1xuICAgIHRoaXMucmFuZ2VNYXBWZXJ0aWNhbERvd24gPSByYW5nZU1hcFZlcnRpY2FsRG93bjtcbiAgICB0aGlzLnJhbmdlTWFwVmVydGljYWxVcCA9IHJhbmdlTWFwVmVydGljYWxVcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgaW5wdXQgYW5nbGUgdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0geWF3IFJvdGF0aW9uIGFyb3VuZCBZIGF4aXMsIGluIGRlZ3JlZVxuICAgKiBAcGFyYW0gcGl0Y2ggUm90YXRpb24gYXJvdW5kIFggYXhpcywgaW4gZGVncmVlXG4gICAqL1xuICBwdWJsaWMgYXBwbHlZYXdQaXRjaCh5YXc6IG51bWJlciwgcGl0Y2g6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwaXRjaCA8IDAuMCkge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0Rvd24nLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1VwJywgdGhpcy5yYW5nZU1hcFZlcnRpY2FsVXAubWFwKC1waXRjaCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zLnNldFZhbHVlKCdsb29rVXAnLCAwLjApO1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va0Rvd24nLCB0aGlzLnJhbmdlTWFwVmVydGljYWxEb3duLm1hcChwaXRjaCkpO1xuICAgIH1cblxuICAgIGlmICh5YXcgPCAwLjApIHtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tMZWZ0JywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tSaWdodCcsIHRoaXMucmFuZ2VNYXBIb3Jpem9udGFsT3V0ZXIubWFwKC15YXcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHByZXNzaW9ucy5zZXRWYWx1ZSgnbG9va1JpZ2h0JywgMC4wKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMuc2V0VmFsdWUoJ2xvb2tMZWZ0JywgdGhpcy5yYW5nZU1hcEhvcml6b250YWxPdXRlci5tYXAoeWF3KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgYXBwbHlZYXdQaXRjaH0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc29sZS53YXJuKCdWUk1Mb29rQXRCb25lQXBwbGllcjogbG9va0F0KCkgaXMgZGVwcmVjYXRlZC4gdXNlIGFwcGx5KCkgaW5zdGVhZC4nKTtcblxuICAgIGNvbnN0IHlhdyA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueTtcbiAgICBjb25zdCBwaXRjaCA9IFRIUkVFLk1hdGhVdGlscy5SQUQyREVHICogZXVsZXIueDtcblxuICAgIHRoaXMuYXBwbHlZYXdQaXRjaCh5YXcsIHBpdGNoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2F0dXJhdGUgfSBmcm9tICcuLi91dGlscy9zYXR1cmF0ZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gIC8qKlxuICAgKiBMaW1pdHMgdGhlIG1heGltdW0gYW5nbGUgb2YgdGhlIGlucHV0IGFuZ2xlIG9mIHRoZSBMb29rQXQgdmVjdG9yIGZyb20gdGhlIGZyb250IG9mIHRoZSBoZWFkICh0aGUgcG9zaXRpdmUgeiBheGlzKS5cbiAgICovXG4gIHB1YmxpYyBpbnB1dE1heFZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYW4gYW5nbGUgKGluIGRlZ3JlZXMpIGZvciBib25lIHR5cGUgb2YgTG9va0F0IGFwcGxpZXJzLCBvciBhIHdlaWdodCBmb3IgZXhwcmVzc2lvbiB0eXBlIG9mIExvb2tBdCBhcHBsaWVycy5cbiAgICogVGhlIGlucHV0IHZhbHVlIHdpbGwgdGFrZSBgMS4wYCB3aGVuIHRoZSBpbnB1dCBhbmdsZSBlcXVhbHMgKG9yIGdyZWF0ZXIpIHRvIHtAbGluayBpbnB1dE1heFZhbHVlfS5cbiAgICovXG4gIHB1YmxpYyBvdXRwdXRTY2FsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIFZSTUxvb2tBdFJhbmdlTWFwfS5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TWF4VmFsdWUgVGhlIHtAbGluayBpbnB1dE1heFZhbHVlfSBvZiB0aGUgbWFwXG4gICAqIEBwYXJhbSBvdXRwdXRTY2FsZSBUaGUge0BsaW5rIG91dHB1dFNjYWxlfSBvZiB0aGUgbWFwXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoaW5wdXRNYXhWYWx1ZTogbnVtYmVyLCBvdXRwdXRTY2FsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnB1dE1heFZhbHVlID0gaW5wdXRNYXhWYWx1ZTtcbiAgICB0aGlzLm91dHB1dFNjYWxlID0gb3V0cHV0U2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm91dHB1dFNjYWxlICogc2F0dXJhdGUoc3JjIC8gdGhpcy5pbnB1dE1heFZhbHVlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgKiBhcyBWMFZSTSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtLTAuMCc7XG5pbXBvcnQgdHlwZSAqIGFzIFYxVlJNU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLXZybS0xLjAnO1xuaW1wb3J0IHR5cGUgeyBHTFRGLCBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgdHlwZSB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbk1hbmFnZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlbHBlciB9IGZyb20gJy4vaGVscGVycy9WUk1Mb29rQXRIZWxwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0IH0gZnJvbSAnLi9WUk1Mb29rQXQnO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBsaWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBsaWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbGllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRFeHByZXNzaW9uQXBwbGllciB9IGZyb20gJy4vVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXInO1xuaW1wb3J0IHR5cGUgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zIH0gZnJvbSAnLi9WUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUxvb2tBdFJhbmdlTWFwIH0gZnJvbSAnLi9WUk1Mb29rQXRSYW5nZU1hcCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbi8qKlxuICogUG9zc2libGUgc3BlYyB2ZXJzaW9ucyBpdCByZWNvZ25pemVzLlxuICovXG5jb25zdCBQT1NTSUJMRV9TUEVDX1ZFUlNJT05TID0gbmV3IFNldChbJzEuMCcsICcxLjAtYmV0YSddKTtcblxuLyoqXG4gKiBBIHBsdWdpbiBvZiBHTFRGTG9hZGVyIHRoYXQgaW1wb3J0cyBhIHtAbGluayBWUk1Mb29rQXR9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdExvYWRlclBsdWdpbiBpbXBsZW1lbnRzIEdMVEZMb2FkZXJQbHVnaW4ge1xuICAvKipcbiAgICogU3BlY2lmeSBhbiBPYmplY3QzRCB0byBhZGQge0BsaW5rIFZSTUxvb2tBdEhlbHBlcn0gcy5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgaGVscGVyIHdpbGwgbm90IGJlIGNyZWF0ZWQuXG4gICAqIElmIGByZW5kZXJPcmRlcmAgaXMgc2V0IHRvIHRoZSByb290LCBoZWxwZXJzIHdpbGwgY29weSB0aGUgc2FtZSBgcmVuZGVyT3JkZXJgIC5cbiAgICovXG4gIHB1YmxpYyBoZWxwZXJSb290PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBXZSBzaG91bGQgdXNlIHRoZSBleHRlbnNpb24gbmFtZSBpbnN0ZWFkIGJ1dCB3ZSBoYXZlIG11bHRpcGxlIHBsdWdpbnMgZm9yIGFuIGV4dGVuc2lvbi4uLlxuICAgIHJldHVybiAnVlJNTG9va0F0TG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1Mb29rQXRMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICB0aGlzLmhlbHBlclJvb3QgPSBvcHRpb25zPy5oZWxwZXJSb290O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFmdGVyUm9vdChnbHRmOiBHTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdnJtSHVtYW5vaWQgPSBnbHRmLnVzZXJEYXRhLnZybUh1bWFub2lkIGFzIFZSTUh1bWFub2lkIHwgdW5kZWZpbmVkO1xuXG4gICAgLy8gZXhwbGljaXRseSBkaXN0aW5ndWlzaCBudWxsIGFuZCB1bmRlZmluZWRcbiAgICAvLyBzaW5jZSB2cm1IdW1hbm9pZCBtaWdodCBiZSBudWxsIGFzIGEgcmVzdWx0XG4gICAgaWYgKHZybUh1bWFub2lkID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2cm1IdW1hbm9pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtSHVtYW5vaWQgaXMgdW5kZWZpbmVkLiBWUk1IdW1hbm9pZExvYWRlclBsdWdpbiBoYXZlIHRvIGJlIHVzZWQgZmlyc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB2cm1FeHByZXNzaW9uTWFuYWdlciA9IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIgYXMgVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtRXhwcmVzc2lvbk1hbmFnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZybUV4cHJlc3Npb25NYW5hZ2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1ZSTUxvb2tBdExvYWRlclBsdWdpbjogdnJtRXhwcmVzc2lvbk1hbmFnZXIgaXMgdW5kZWZpbmVkLiBWUk1FeHByZXNzaW9uTG9hZGVyUGx1Z2luIGhhdmUgdG8gYmUgdXNlZCBmaXJzdCcsXG4gICAgICApO1xuICAgIH1cblxuICAgIGdsdGYudXNlckRhdGEudnJtTG9va0F0ID0gYXdhaXQgdGhpcy5faW1wb3J0KGdsdGYsIHZybUh1bWFub2lkLCB2cm1FeHByZXNzaW9uTWFuYWdlcik7XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IGEge0BsaW5rIFZSTUxvb2tBdH0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIHtAbGluayBWUk1IdW1hbm9pZH0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGV4cHJlc3Npb25zIEEge0BsaW5rIFZSTUV4cHJlc3Npb25NYW5hZ2VyfSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkIHwgbnVsbCxcbiAgICBleHByZXNzaW9uczogVlJNRXhwcmVzc2lvbk1hbmFnZXIgfCBudWxsLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBpZiAoaHVtYW5vaWQgPT0gbnVsbCB8fCBleHByZXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYsIGh1bWFub2lkLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHYxUmVzdWx0KSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmLCBodW1hbm9pZCwgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh2MFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgaXNWUk1Vc2VkID0ganNvbi5leHRlbnNpb25zVXNlZD8uaW5kZXhPZignVlJNQ192cm0nKSAhPT0gLTE7XG4gICAgaWYgKCFpc1ZSTVVzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk1DX3ZybSddIGFzIFYxVlJNU2NoZW1hLlZSTUNWUk0gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNwZWNWZXJzaW9uID0gZXh0ZW5zaW9uLnNwZWNWZXJzaW9uO1xuICAgIGlmICghUE9TU0lCTEVfU1BFQ19WRVJTSU9OUy5oYXMoc3BlY1ZlcnNpb24pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTUxvb2tBdExvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUxvb2tBdCA9IGV4dGVuc2lvbi5sb29rQXQ7XG4gICAgaWYgKCFzY2hlbWFMb29rQXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRPdXRwdXRTY2FsZSA9IHNjaGVtYUxvb2tBdC50eXBlID09PSAnZXhwcmVzc2lvbicgPyAxLjAgOiAxMC4wO1xuXG4gICAgY29uc3QgbWFwSEkgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcEhvcml6b250YWxJbm5lciwgZGVmYXVsdE91dHB1dFNjYWxlKTtcbiAgICBjb25zdCBtYXBITyA9IHRoaXMuX3YxSW1wb3J0UmFuZ2VNYXAoc2NoZW1hTG9va0F0LnJhbmdlTWFwSG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjFJbXBvcnRSYW5nZU1hcChzY2hlbWFMb29rQXQucmFuZ2VNYXBWZXJ0aWNhbERvd24sIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gICAgY29uc3QgbWFwVlUgPSB0aGlzLl92MUltcG9ydFJhbmdlTWFwKHNjaGVtYUxvb2tBdC5yYW5nZU1hcFZlcnRpY2FsVXAsIGRlZmF1bHRPdXRwdXRTY2FsZSk7XG5cbiAgICBsZXQgYXBwbGllcjtcblxuICAgIGlmIChzY2hlbWFMb29rQXQudHlwZSA9PT0gJ2V4cHJlc3Npb24nKSB7XG4gICAgICBhcHBsaWVyID0gbmV3IFZSTUxvb2tBdEV4cHJlc3Npb25BcHBsaWVyKGV4cHJlc3Npb25zLCBtYXBISSwgbWFwSE8sIG1hcFZELCBtYXBWVSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0Qm9uZUFwcGxpZXIoaHVtYW5vaWQsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb29rQXQgPSB0aGlzLl9pbXBvcnRMb29rQXQoaHVtYW5vaWQsIGFwcGxpZXIpO1xuXG4gICAgbG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZS5mcm9tQXJyYXkoc2NoZW1hTG9va0F0Lm9mZnNldEZyb21IZWFkQm9uZSA/PyBbMC4wLCAwLjA2LCAwLjBdKTtcblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MUltcG9ydFJhbmdlTWFwKFxuICAgIHNjaGVtYVJhbmdlTWFwOiBWMVZSTVNjaGVtYS5Mb29rQXRSYW5nZU1hcCB8IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0T3V0cHV0U2NhbGU6IG51bWJlcixcbiAgKTogVlJNTG9va0F0UmFuZ2VNYXAge1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0UmFuZ2VNYXAoXG4gICAgICBzY2hlbWFSYW5nZU1hcD8uaW5wdXRNYXhWYWx1ZSA/PyA5MC4wLFxuICAgICAgc2NoZW1hUmFuZ2VNYXA/Lm91dHB1dFNjYWxlID8/IGRlZmF1bHRPdXRwdXRTY2FsZSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjBJbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgZXhwcmVzc2lvbnM6IFZSTUV4cHJlc3Npb25NYW5hZ2VyLFxuICApOiBQcm9taXNlPFZSTUxvb2tBdCB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbiA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0T3V0cHV0U2NhbGUgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSA9PT0gJ0JsZW5kU2hhcGUnID8gMS4wIDogMTAuMDtcblxuICAgIGNvbnN0IG1hcEhJID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbElubmVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcEhPID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbE91dGVyLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZEID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxEb3duLCBkZWZhdWx0T3V0cHV0U2NhbGUpO1xuICAgIGNvbnN0IG1hcFZVID0gdGhpcy5fdjBJbXBvcnREZWdyZWVNYXAoc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxVcCwgZGVmYXVsdE91dHB1dFNjYWxlKTtcblxuICAgIGxldCBhcHBsaWVyO1xuXG4gICAgaWYgKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lID09PSAnQmxlbmRTaGFwZScpIHtcbiAgICAgIGFwcGxpZXIgPSBuZXcgVlJNTG9va0F0RXhwcmVzc2lvbkFwcGxpZXIoZXhwcmVzc2lvbnMsIG1hcEhJLCBtYXBITywgbWFwVkQsIG1hcFZVKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwbGllciA9IG5ldyBWUk1Mb29rQXRCb25lQXBwbGllcihodW1hbm9pZCwgbWFwSEksIG1hcEhPLCBtYXBWRCwgbWFwVlUpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2tBdCA9IHRoaXMuX2ltcG9ydExvb2tBdChodW1hbm9pZCwgYXBwbGllcik7XG5cbiAgICBpZiAoc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0KSB7XG4gICAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLnNldChcbiAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnggPz8gMC4wLFxuICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueSA/PyAwLjA2LFxuICAgICAgICAtKHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC56ID8/IDAuMCksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb29rQXQub2Zmc2V0RnJvbUhlYWRCb25lLnNldCgwLjAsIDAuMDYsIDAuMCk7XG4gICAgfVxuXG4gICAgLy8gVlJNIDAuMCBhcmUgZmFjaW5nIFotIGluc3RlYWQgb2YgWitcbiAgICBsb29rQXQuZmFjZUZyb250LnNldCgwLjAsIDAuMCwgLTEuMCk7XG5cbiAgICBpZiAoYXBwbGllciBpbnN0YW5jZW9mIFZSTUxvb2tBdEJvbmVBcHBsaWVyKSB7XG4gICAgICBhcHBsaWVyLmZhY2VGcm9udC5zZXQoMC4wLCAwLjAsIC0xLjApO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rQXQ7XG4gIH1cblxuICBwcml2YXRlIF92MEltcG9ydERlZ3JlZU1hcChcbiAgICBzY2hlbWFEZWdyZWVNYXA6IFYwVlJNLkZpcnN0UGVyc29uRGVncmVlTWFwIHwgdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRPdXRwdXRTY2FsZTogbnVtYmVyLFxuICApOiBWUk1Mb29rQXRSYW5nZU1hcCB7XG4gICAgY29uc3QgY3VydmUgPSBzY2hlbWFEZWdyZWVNYXA/LmN1cnZlO1xuICAgIGlmIChKU09OLnN0cmluZ2lmeShjdXJ2ZSkgIT09ICdbMCwwLDAsMSwxLDEsMSwwXScpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ3VydmVzIG9mIExvb2tBdERlZ3JlZU1hcCBkZWZpbmVkIGluIFZSTSAwLjAgYXJlIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdFJhbmdlTWFwKHNjaGVtYURlZ3JlZU1hcD8ueFJhbmdlID8/IDkwLjAsIHNjaGVtYURlZ3JlZU1hcD8ueVJhbmdlID8/IGRlZmF1bHRPdXRwdXRTY2FsZSk7XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRMb29rQXQoaHVtYW5vaWQ6IFZSTUh1bWFub2lkLCBhcHBsaWVyOiBWUk1Mb29rQXRBcHBsaWVyKTogVlJNTG9va0F0IHtcbiAgICBjb25zdCBsb29rQXQgPSBuZXcgVlJNTG9va0F0KGh1bWFub2lkLCBhcHBsaWVyKTtcblxuICAgIGlmICh0aGlzLmhlbHBlclJvb3QpIHtcbiAgICAgIGNvbnN0IGhlbHBlciA9IG5ldyBWUk1Mb29rQXRIZWxwZXIobG9va0F0KTtcbiAgICAgIHRoaXMuaGVscGVyUm9vdC5hZGQoaGVscGVyKTtcbiAgICAgIGhlbHBlci5yZW5kZXJPcmRlciA9IHRoaXMuaGVscGVyUm9vdC5yZW5kZXJPcmRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9va0F0O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdHlwZSBvZiBhcHBsaWVyLlxuICovXG5leHBvcnQgY29uc3QgVlJNTG9va0F0VHlwZU5hbWUgPSB7XG4gIEJvbmU6ICdib25lJyxcbiAgRXhwcmVzc2lvbjogJ2V4cHJlc3Npb24nLFxufTtcblxuZXhwb3J0IHR5cGUgVlJNTG9va0F0VHlwZU5hbWUgPSB0eXBlb2YgVlJNTG9va0F0VHlwZU5hbWVba2V5b2YgdHlwZW9mIFZSTUxvb2tBdFR5cGVOYW1lXTtcbiIsIi8qKlxuICogWW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gSW52YWxpZCBVUkxcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnIHx8IHVybCA9PT0gJycpIHJldHVybiAnJztcblxuICAvLyBIb3N0IFJlbGF0aXZlIFVSTFxuICBpZiAoL15odHRwcz86XFwvXFwvL2kudGVzdChwYXRoKSAmJiAvXlxcLy8udGVzdCh1cmwpKSB7XG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvKF5odHRwcz86XFwvXFwvW14vXSspLiovaSwgJyQxJyk7XG4gIH1cblxuICAvLyBBYnNvbHV0ZSBVUkwgaHR0cDovLyxodHRwczovLywvL1xuICBpZiAoL14oaHR0cHM/Oik/XFwvXFwvL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIERhdGEgVVJJXG4gIGlmICgvXmRhdGE6LiosLiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIEJsb2IgVVJMXG4gIGlmICgvXmJsb2I6LiokL2kudGVzdCh1cmwpKSByZXR1cm4gdXJsO1xuXG4gIC8vIFJlbGF0aXZlIFVSTFxuICByZXR1cm4gcGF0aCArIHVybDtcbn1cbiIsImltcG9ydCB0eXBlIHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHR5cGUgeyBWUk0wTWV0YSB9IGZyb20gJy4vVlJNME1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk0xTWV0YSB9IGZyb20gJy4vVlJNMU1ldGEnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmltcG9ydCB0eXBlIHsgVlJNTWV0YUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB0eXBlICogYXMgVjBWUk0gZnJvbSAnQHBpeGl2L3R5cGVzLXZybS0wLjAnO1xuaW1wb3J0IHR5cGUgKiBhcyBWMVZSTVNjaGVtYSBmcm9tICdAcGl4aXYvdHlwZXMtdnJtYy12cm0tMS4wJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHJlc29sdmVVUkwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlVVJMJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuLyoqXG4gKiBQb3NzaWJsZSBzcGVjIHZlcnNpb25zIGl0IHJlY29nbml6ZXMuXG4gKi9cbmNvbnN0IFBPU1NJQkxFX1NQRUNfVkVSU0lPTlMgPSBuZXcgU2V0KFsnMS4wJywgJzEuMC1iZXRhJ10pO1xuXG4vKipcbiAqIEEgcGx1Z2luIG9mIEdMVEZMb2FkZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTTFNZXRhfSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NZXRhTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIElmIGBmYWxzZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCBpbWFnZSAoe0BsaW5rIFZSTTFNZXRhLnRodW1ibmFpbEltYWdlfSkuXG4gICAqIGB0cnVlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIG5lZWRUaHVtYm5haWxJbWFnZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGxpY2Vuc2UgdXJscy5cbiAgICogVGhpcyBtZXRhIGxvYWRlciB3aWxsIGFjY2VwdCB0aGVzZSBgbGljZW5zZVVybGBzLlxuICAgKiBPdGhlcndpc2UgaXQgd29uJ3QgYmUgbG9hZGVkLlxuICAgKi9cbiAgcHVibGljIGFjY2VwdExpY2Vuc2VVcmxzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogV2hldGhlciBpdCBzaG91bGQgYWNjZXB0IFZSTTAuMCBtZXRhIG9yIG5vdC5cbiAgICogTm90ZSB0aGF0IGl0IG1pZ2h0IGxvYWQge0BsaW5rIFZSTTBNZXRhfSBpbnN0ZWFkIG9mIHtAbGluayBWUk0xTWV0YX0gd2hlbiB0aGlzIGlzIGB0cnVlYC5cbiAgICogYHRydWVgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBwdWJsaWMgYWNjZXB0VjBNZXRhOiBib29sZWFuO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIFdlIHNob3VsZCB1c2UgdGhlIGV4dGVuc2lvbiBuYW1lIGluc3RlYWQgYnV0IHdlIGhhdmUgbXVsdGlwbGUgcGx1Z2lucyBmb3IgYW4gZXh0ZW5zaW9uLi4uXG4gICAgcmV0dXJuICdWUk1NZXRhTG9hZGVyUGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIsIG9wdGlvbnM/OiBWUk1NZXRhTG9hZGVyUGx1Z2luT3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgdGhpcy5uZWVkVGh1bWJuYWlsSW1hZ2UgPSBvcHRpb25zPy5uZWVkVGh1bWJuYWlsSW1hZ2UgPz8gdHJ1ZTtcbiAgICB0aGlzLmFjY2VwdExpY2Vuc2VVcmxzID0gb3B0aW9ucz8uYWNjZXB0TGljZW5zZVVybHMgPz8gWydodHRwczovL3ZybS5kZXYvbGljZW5zZXMvMS4wLyddO1xuICAgIHRoaXMuYWNjZXB0VjBNZXRhID0gb3B0aW9ucz8uYWNjZXB0VjBNZXRhID8/IHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBnbHRmLnVzZXJEYXRhLnZybU1ldGEgPSBhd2FpdCB0aGlzLl9pbXBvcnQoZ2x0Zik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9pbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCB2MVJlc3VsdCA9IGF3YWl0IHRoaXMuX3YxSW1wb3J0KGdsdGYpO1xuICAgIGlmICh2MVJlc3VsdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdjFSZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdjBSZXN1bHQgPSBhd2FpdCB0aGlzLl92MEltcG9ydChnbHRmKTtcbiAgICBpZiAodjBSZXN1bHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHYwUmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfdjFJbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNMU1ldGEgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIC8vIGVhcmx5IGFib3J0IGlmIGl0IGRvZXNuJ3QgdXNlIHZybVxuICAgIGNvbnN0IGlzVlJNVXNlZCA9IGpzb24uZXh0ZW5zaW9uc1VzZWQ/LmluZGV4T2YoJ1ZSTUNfdnJtJykgIT09IC0xO1xuICAgIGlmICghaXNWUk1Vc2VkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBqc29uLmV4dGVuc2lvbnM/LlsnVlJNQ192cm0nXSBhcyBWMVZSTVNjaGVtYS5WUk1DVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmIChleHRlbnNpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BlY1ZlcnNpb24gPSBleHRlbnNpb24uc3BlY1ZlcnNpb247XG4gICAgaWYgKCFQT1NTSUJMRV9TUEVDX1ZFUlNJT05TLmhhcyhzcGVjVmVyc2lvbikpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWV0YUxvYWRlclBsdWdpbjogVW5rbm93biBWUk1DX3ZybSBzcGVjVmVyc2lvbiBcIiR7c3BlY1ZlcnNpb259XCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYU1ldGEgPSBleHRlbnNpb24ubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHRocm93IGFuIGVycm9yIGlmIGFjY2VwdFYwTWV0YSBpcyBmYWxzZVxuICAgIGNvbnN0IGxpY2Vuc2VVcmwgPSBzY2hlbWFNZXRhLmxpY2Vuc2VVcmw7XG4gICAgY29uc3QgYWNjZXB0TGljZW5zZVVybHNTZXQgPSBuZXcgU2V0KHRoaXMuYWNjZXB0TGljZW5zZVVybHMpO1xuICAgIGlmICghYWNjZXB0TGljZW5zZVVybHNTZXQuaGFzKGxpY2Vuc2VVcmwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFZSTU1ldGFMb2FkZXJQbHVnaW46IFRoZSBsaWNlbnNlIHVybCBcIiR7bGljZW5zZVVybH1cIiBpcyBub3QgYWNjZXB0ZWRgKTtcbiAgICB9XG5cbiAgICBsZXQgdGh1bWJuYWlsSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMubmVlZFRodW1ibmFpbEltYWdlICYmIHNjaGVtYU1ldGEudGh1bWJuYWlsSW1hZ2UgIT0gbnVsbCkge1xuICAgICAgdGh1bWJuYWlsSW1hZ2UgPSAoYXdhaXQgdGhpcy5fZXh0cmFjdEdMVEZJbWFnZShzY2hlbWFNZXRhLnRodW1ibmFpbEltYWdlKSkgPz8gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtZXRhVmVyc2lvbjogJzEnLFxuICAgICAgbmFtZTogc2NoZW1hTWV0YS5uYW1lLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgYXV0aG9yczogc2NoZW1hTWV0YS5hdXRob3JzLFxuICAgICAgY29weXJpZ2h0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29weXJpZ2h0SW5mb3JtYXRpb24sXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgcmVmZXJlbmNlczogc2NoZW1hTWV0YS5yZWZlcmVuY2VzLFxuICAgICAgdGhpcmRQYXJ0eUxpY2Vuc2VzOiBzY2hlbWFNZXRhLnRoaXJkUGFydHlMaWNlbnNlcyxcbiAgICAgIHRodW1ibmFpbEltYWdlLFxuICAgICAgbGljZW5zZVVybDogc2NoZW1hTWV0YS5saWNlbnNlVXJsLFxuICAgICAgYXZhdGFyUGVybWlzc2lvbjogc2NoZW1hTWV0YS5hdmF0YXJQZXJtaXNzaW9uLFxuICAgICAgYWxsb3dFeGNlc3NpdmVseVZpb2xlbnRVc2FnZTogc2NoZW1hTWV0YS5hbGxvd0V4Y2Vzc2l2ZWx5VmlvbGVudFVzYWdlLFxuICAgICAgYWxsb3dFeGNlc3NpdmVseVNleHVhbFVzYWdlOiBzY2hlbWFNZXRhLmFsbG93RXhjZXNzaXZlbHlTZXh1YWxVc2FnZSxcbiAgICAgIGNvbW1lcmNpYWxVc2FnZTogc2NoZW1hTWV0YS5jb21tZXJjaWFsVXNhZ2UsXG4gICAgICBhbGxvd1BvbGl0aWNhbE9yUmVsaWdpb3VzVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dQb2xpdGljYWxPclJlbGlnaW91c1VzYWdlLFxuICAgICAgYWxsb3dBbnRpc29jaWFsT3JIYXRlVXNhZ2U6IHNjaGVtYU1ldGEuYWxsb3dBbnRpc29jaWFsT3JIYXRlVXNhZ2UsXG4gICAgICBjcmVkaXROb3RhdGlvbjogc2NoZW1hTWV0YS5jcmVkaXROb3RhdGlvbixcbiAgICAgIGFsbG93UmVkaXN0cmlidXRpb246IHNjaGVtYU1ldGEuYWxsb3dSZWRpc3RyaWJ1dGlvbixcbiAgICAgIG1vZGlmaWNhdGlvbjogc2NoZW1hTWV0YS5tb2RpZmljYXRpb24sXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF92MEltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk0wTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgdnJtXG4gICAgY29uc3QgdnJtRXh0ID0ganNvbi5leHRlbnNpb25zPy5WUk0gYXMgVjBWUk0uVlJNIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFNZXRhID0gdnJtRXh0Lm1ldGE7XG4gICAgaWYgKCFzY2hlbWFNZXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyB0aHJvdyBhbiBlcnJvciBpZiBhY2NlcHRWME1ldGEgaXMgZmFsc2VcbiAgICBpZiAoIXRoaXMuYWNjZXB0VjBNZXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHRlZCB0byBsb2FkIFZSTTAuMCBtZXRhIGJ1dCBhY2NlcHRWME1ldGEgaXMgZmFsc2UnKTtcbiAgICB9XG5cbiAgICAvLyBsb2FkIHRodW1ibmFpbCB0ZXh0dXJlXG4gICAgbGV0IHRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLm5lZWRUaHVtYm5haWxJbWFnZSAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT0gbnVsbCAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT09IC0xKSB7XG4gICAgICB0ZXh0dXJlID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHNjaGVtYU1ldGEudGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFWZXJzaW9uOiAnMCcsXG4gICAgICBhbGxvd2VkVXNlck5hbWU6IHNjaGVtYU1ldGEuYWxsb3dlZFVzZXJOYW1lLFxuICAgICAgYXV0aG9yOiBzY2hlbWFNZXRhLmF1dGhvcixcbiAgICAgIGNvbW1lcmNpYWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLmNvbW1lcmNpYWxVc3NhZ2VOYW1lLFxuICAgICAgY29udGFjdEluZm9ybWF0aW9uOiBzY2hlbWFNZXRhLmNvbnRhY3RJbmZvcm1hdGlvbixcbiAgICAgIGxpY2Vuc2VOYW1lOiBzY2hlbWFNZXRhLmxpY2Vuc2VOYW1lLFxuICAgICAgb3RoZXJMaWNlbnNlVXJsOiBzY2hlbWFNZXRhLm90aGVyTGljZW5zZVVybCxcbiAgICAgIG90aGVyUGVybWlzc2lvblVybDogc2NoZW1hTWV0YS5vdGhlclBlcm1pc3Npb25VcmwsXG4gICAgICByZWZlcmVuY2U6IHNjaGVtYU1ldGEucmVmZXJlbmNlLFxuICAgICAgc2V4dWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5zZXh1YWxVc3NhZ2VOYW1lLFxuICAgICAgdGV4dHVyZTogdGV4dHVyZSA/PyB1bmRlZmluZWQsXG4gICAgICB0aXRsZTogc2NoZW1hTWV0YS50aXRsZSxcbiAgICAgIHZlcnNpb246IHNjaGVtYU1ldGEudmVyc2lvbixcbiAgICAgIHZpb2xlbnRVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnZpb2xlbnRVc3NhZ2VOYW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9leHRyYWN0R0xURkltYWdlKGluZGV4OiBudW1iZXIpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsPiB7XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IHNvdXJjZSA9IGpzb24uaW1hZ2VzPy5baW5kZXhdO1xuXG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NZXRhTG9hZGVyUGx1Z2luOiBBdHRlbXB0IHRvIHVzZSBpbWFnZXNbJHtpbmRleH1dIG9mIGdsVEYgYXMgYSB0aHVtYm5haWwgYnV0IHRoZSBpbWFnZSBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9yMTI0L2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMjTDI0NjdcblxuICAgIC8vIGBzb3VyY2UudXJpYCBtaWdodCBiZSBhIHJlZmVyZW5jZSB0byBhIGZpbGVcbiAgICBsZXQgc291cmNlVVJJOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBzb3VyY2UudXJpO1xuXG4gICAgLy8gTG9hZCB0aGUgYmluYXJ5IGFzIGEgYmxvYlxuICAgIGlmIChzb3VyY2UuYnVmZmVyVmlldyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBidWZmZXJWaWV3ID0gYXdhaXQgdGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnYnVmZmVyVmlldycsIHNvdXJjZS5idWZmZXJWaWV3KTtcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYnVmZmVyVmlld10sIHsgdHlwZTogc291cmNlLm1pbWVUeXBlIH0pO1xuICAgICAgc291cmNlVVJJID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlVVJJID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1ldGFMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIGltYWdlc1ske2luZGV4fV0gb2YgZ2xURiBhcyBhIHRodW1ibmFpbCBidXQgdGhlIGltYWdlIGNvdWxkbid0IGxvYWQgcHJvcGVybHlgLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5JbWFnZUxvYWRlcigpO1xuICAgIHJldHVybiBhd2FpdCBsb2FkZXIubG9hZEFzeW5jKHJlc29sdmVVUkwoc291cmNlVVJJLCAodGhpcy5wYXJzZXIgYXMgYW55KS5vcHRpb25zLnBhdGgpKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgY29uc29sZS53YXJuKCdWUk1NZXRhTG9hZGVyUGx1Z2luOiBGYWlsZWQgdG8gbG9hZCBhIHRodW1ibmFpbCBpbWFnZScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUV4cHJlc3Npb25NYW5hZ2VyIH0gZnJvbSAnLi9leHByZXNzaW9ucy9WUk1FeHByZXNzaW9uTWFuYWdlcic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdCB9IGZyb20gJy4vbG9va0F0L1ZSTUxvb2tBdCc7XG5pbXBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNQ29yZVBhcmFtZXRlcnMgfSBmcm9tICcuL1ZSTUNvcmVQYXJhbWV0ZXJzJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKiBUaGlzIGNsYXNzIG9ubHkgaW5jbHVkZXMgY29yZSBzcGVjIG9mIHRoZSBWUk0gKGBWUk1DX3ZybWApLlxuICovXG5leHBvcnQgY2xhc3MgVlJNQ29yZSB7XG4gIC8qKlxuICAgKiBgVEhSRUUuR3JvdXBgIHRoYXQgY29udGFpbnMgdGhlIGVudGlyZSBWUk0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFRIUkVFLkdyb3VwO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtZXRhIGZpZWxkcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byByZWZlciB0aGVzZSBsaWNlbnNlIGZpZWxkcyBiZWZvcmUgdXNlIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtZXRhOiBWUk1NZXRhO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNSHVtYW5vaWR9IG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gY29udHJvbCBlYWNoIGJvbmVzIHVzaW5nIHtAbGluayBWUk1IdW1hbm9pZC5nZXROb3JtYWxpemVkQm9uZU5vZGV9IG9yIHtAbGluayBWUk1IdW1hbm9pZC5nZXRSYXdCb25lTm9kZX0uXG4gICAqXG4gICAqIEBUT0RPIEFkZCBhIGxpbmsgdG8gVlJNIHNwZWNcbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZDogVlJNSHVtYW5vaWQ7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlcn0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY29udHJvbCB0aGVzZSBmYWNpYWwgZXhwcmVzc2lvbnMgdmlhIHtAbGluayBWUk1FeHByZXNzaW9uTWFuYWdlci5zZXRWYWx1ZX0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZXhwcmVzc2lvbk1hbmFnZXI/OiBWUk1FeHByZXNzaW9uTWFuYWdlcjtcblxuICAvKipcbiAgICogQ29udGFpbnMge0BsaW5rIFZSTUZpcnN0UGVyc29ufSBvZiB0aGUgVlJNLlxuICAgKiBWUk1GaXJzdFBlcnNvbiBpcyBtb3N0bHkgdXNlZCBmb3IgbWVzaCBjdWxsaW5nIGZvciBmaXJzdCBwZXJzb24gdmlldy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvbj86IFZSTUZpcnN0UGVyc29uO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyB7QGxpbmsgVlJNTG9va0F0fSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byB1c2Uge0BsaW5rIFZSTUxvb2tBdC50YXJnZXR9IHRvIGNvbnRyb2wgdGhlIGV5ZSBkaXJlY3Rpb24gb2YgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGxvb2tBdD86IFZSTUxvb2tBdDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBbW1ZSTVBhcmFtZXRlcnNdXSB0aGF0IHJlcHJlc2VudHMgY29tcG9uZW50cyBvZiB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiBWUk1Db3JlUGFyYW1ldGVycykge1xuICAgIHRoaXMuc2NlbmUgPSBwYXJhbXMuc2NlbmU7XG4gICAgdGhpcy5tZXRhID0gcGFyYW1zLm1ldGE7XG4gICAgdGhpcy5odW1hbm9pZCA9IHBhcmFtcy5odW1hbm9pZDtcbiAgICB0aGlzLmV4cHJlc3Npb25NYW5hZ2VyID0gcGFyYW1zLmV4cHJlc3Npb25NYW5hZ2VyO1xuICAgIHRoaXMuZmlyc3RQZXJzb24gPSBwYXJhbXMuZmlyc3RQZXJzb247XG4gICAgdGhpcy5sb29rQXQgPSBwYXJhbXMubG9va0F0O1xuICB9XG5cbiAgLyoqXG4gICAqICoqWW91IG5lZWQgdG8gY2FsbCB0aGlzIG9uIHlvdXIgdXBkYXRlIGxvb3AuKipcbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGV2ZXJ5IFZSTSBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmh1bWFub2lkLnVwZGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMubG9va0F0KSB7XG4gICAgICB0aGlzLmxvb2tBdC51cGRhdGUoZGVsdGEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmV4cHJlc3Npb25NYW5hZ2VyKSB7XG4gICAgICB0aGlzLmV4cHJlc3Npb25NYW5hZ2VyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiwgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0IHsgVlJNQ29yZUxvYWRlclBsdWdpbk9wdGlvbnMgfSBmcm9tICcuL1ZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zJztcbmltcG9ydCB7IFZSTUNvcmUgfSBmcm9tICcuL1ZSTUNvcmUnO1xuaW1wb3J0IHsgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZXhwcmVzc2lvbnMvVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbkxvYWRlclBsdWdpbiB9IGZyb20gJy4vZmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkTG9hZGVyUGx1Z2luJztcbmltcG9ydCB7IFZSTU1ldGFMb2FkZXJQbHVnaW4gfSBmcm9tICcuL21ldGEvVlJNTWV0YUxvYWRlclBsdWdpbic7XG5pbXBvcnQgeyBWUk1Mb29rQXRMb2FkZXJQbHVnaW4gfSBmcm9tICcuL2xvb2tBdC9WUk1Mb29rQXRMb2FkZXJQbHVnaW4nO1xuaW1wb3J0IHR5cGUgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHR5cGUgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhJztcblxuZXhwb3J0IGNsYXNzIFZSTUNvcmVMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XG4gICAgLy8gV2Ugc2hvdWxkIHVzZSB0aGUgZXh0ZW5zaW9uIG5hbWUgaW5zdGVhZCBidXQgd2UgaGF2ZSBtdWx0aXBsZSBwbHVnaW5zIGZvciBhbiBleHRlbnNpb24uLi5cbiAgICByZXR1cm4gJ1ZSTUNfdnJtJztcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25QbHVnaW46IFZSTUV4cHJlc3Npb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvblBsdWdpbjogVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZFBsdWdpbjogVlJNSHVtYW5vaWRMb2FkZXJQbHVnaW47XG4gIHB1YmxpYyByZWFkb25seSBsb29rQXRQbHVnaW46IFZSTUxvb2tBdExvYWRlclBsdWdpbjtcbiAgcHVibGljIHJlYWRvbmx5IG1ldGFQbHVnaW46IFZSTU1ldGFMb2FkZXJQbHVnaW47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlciwgb3B0aW9ucz86IFZSTUNvcmVMb2FkZXJQbHVnaW5PcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICBjb25zdCBoZWxwZXJSb290ID0gb3B0aW9ucz8uaGVscGVyUm9vdDtcbiAgICBjb25zdCBhdXRvVXBkYXRlSHVtYW5Cb25lcyA9IG9wdGlvbnM/LmF1dG9VcGRhdGVIdW1hbkJvbmVzO1xuXG4gICAgdGhpcy5leHByZXNzaW9uUGx1Z2luID0gb3B0aW9ucz8uZXhwcmVzc2lvblBsdWdpbiA/PyBuZXcgVlJNRXhwcmVzc2lvbkxvYWRlclBsdWdpbihwYXJzZXIpO1xuICAgIHRoaXMuZmlyc3RQZXJzb25QbHVnaW4gPSBvcHRpb25zPy5maXJzdFBlcnNvblBsdWdpbiA/PyBuZXcgVlJNRmlyc3RQZXJzb25Mb2FkZXJQbHVnaW4ocGFyc2VyKTtcbiAgICB0aGlzLmh1bWFub2lkUGx1Z2luID1cbiAgICAgIG9wdGlvbnM/Lmh1bWFub2lkUGx1Z2luID8/IG5ldyBWUk1IdW1hbm9pZExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCwgYXV0b1VwZGF0ZUh1bWFuQm9uZXMgfSk7XG4gICAgdGhpcy5sb29rQXRQbHVnaW4gPSBvcHRpb25zPy5sb29rQXRQbHVnaW4gPz8gbmV3IFZSTUxvb2tBdExvYWRlclBsdWdpbihwYXJzZXIsIHsgaGVscGVyUm9vdCB9KTtcbiAgICB0aGlzLm1ldGFQbHVnaW4gPSBvcHRpb25zPy5tZXRhUGx1Z2luID8/IG5ldyBWUk1NZXRhTG9hZGVyUGx1Z2luKHBhcnNlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWZ0ZXJSb290KGdsdGY6IEdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1ldGFQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuaHVtYW5vaWRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZXhwcmVzc2lvblBsdWdpbi5hZnRlclJvb3QoZ2x0Zik7XG4gICAgYXdhaXQgdGhpcy5sb29rQXRQbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuICAgIGF3YWl0IHRoaXMuZmlyc3RQZXJzb25QbHVnaW4uYWZ0ZXJSb290KGdsdGYpO1xuXG4gICAgY29uc3QgbWV0YSA9IGdsdGYudXNlckRhdGEudnJtTWV0YSBhcyBWUk1NZXRhIHwgbnVsbDtcbiAgICBjb25zdCBodW1hbm9pZCA9IGdsdGYudXNlckRhdGEudnJtSHVtYW5vaWQgYXMgVlJNSHVtYW5vaWQgfCBudWxsO1xuXG4gICAgLy8gbWV0YSBhbmQgaHVtYW5vaWQgYXJlIHJlcXVpcmVkIHRvIGJlIGEgVlJNLlxuICAgIC8vIERvbid0IGNyZWF0ZSBWUk0gaWYgdGhleSBhcmUgbnVsbFxuICAgIGlmIChtZXRhICYmIGh1bWFub2lkKSB7XG4gICAgICBjb25zdCB2cm1Db3JlID0gbmV3IFZSTUNvcmUoe1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgZXhwcmVzc2lvbk1hbmFnZXI6IGdsdGYudXNlckRhdGEudnJtRXhwcmVzc2lvbk1hbmFnZXIsXG4gICAgICAgIGZpcnN0UGVyc29uOiBnbHRmLnVzZXJEYXRhLnZybUZpcnN0UGVyc29uLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgbG9va0F0OiBnbHRmLnVzZXJEYXRhLnZybUxvb2tBdCxcbiAgICAgICAgbWV0YSxcbiAgICAgIH0pO1xuXG4gICAgICBnbHRmLnVzZXJEYXRhLnZybUNvcmUgPSB2cm1Db3JlO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlRIUkVFIiwiUE9TU0lCTEVfU1BFQ19WRVJTSU9OUyIsIl92M0EiLCJfdjNCIiwiX3F1YXRBIiwiX3F1YXRCIiwiVkVDM19QT1NJVElWRV9aIiwiX2V1bGVyQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlBO0lBQ0E7SUFDYSxNQUFBLGFBQWMsU0FBUUEsZ0JBQUssQ0FBQyxRQUFRLENBQUE7SUE0RS9DLElBQUEsV0FBQSxDQUFZLGNBQXNCLEVBQUE7SUFDaEMsUUFBQSxLQUFLLEVBQUUsQ0FBQztJQXRFVjs7SUFFRztZQUNJLElBQU0sQ0FBQSxNQUFBLEdBQUcsR0FBRyxDQUFDO0lBRXBCOztJQUVHO1lBQ0ksSUFBUSxDQUFBLFFBQUEsR0FBRyxLQUFLLENBQUM7SUFFeEI7O0lBRUc7WUFDSSxJQUFhLENBQUEsYUFBQSxHQUE4QixNQUFNLENBQUM7SUFFekQ7O0lBRUc7WUFDSSxJQUFjLENBQUEsY0FBQSxHQUE4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SSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztTQUMxRDtJQUNGOztJQzNIRDtJQUNBO0FBQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0FBdURBO0lBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0lBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0lBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RSxLQUFLLENBQUMsQ0FBQztJQUNQOztJQzFFQSxTQUFTLHlCQUF5QixDQUFDLElBQVUsRUFBRSxTQUFpQixFQUFFLElBQW9CLEVBQUE7O0lBQ3BGLElBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUF3QixDQUFDO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaURHOztRQUdILE1BQU0sVUFBVSxTQUFHLElBQUksQ0FBQyxLQUFLLE1BQUcsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsU0FBUyxDQUFDLENBQUM7UUFDM0MsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO0lBQ3RCLFFBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxtREFBbUQsU0FBUyxDQUFBLG9DQUFBLENBQXNDLENBQUMsQ0FBQztJQUNqSCxRQUFBLE9BQU8sSUFBSSxDQUFDO0lBQ2IsS0FBQTtJQUVELElBQUEsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7SUFDckIsUUFBQSxPQUFPLElBQUksQ0FBQztJQUNiLEtBQUE7O1FBR0QsTUFBTSxVQUFVLFNBQUcsSUFBSSxDQUFDLE1BQU0sTUFBRyxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7SUFDdEIsUUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxTQUFTLENBQUEsb0NBQUEsQ0FBc0MsQ0FBQyxDQUFDO0lBQ2xILFFBQUEsT0FBTyxJQUFJLENBQUM7SUFDYixLQUFBO0lBRUQsSUFBQSxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7UUFHcEQsTUFBTSxVQUFVLEdBQWlCLEVBQUUsQ0FBQztJQUNwQyxJQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUk7SUFDdkIsUUFBQSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsY0FBYyxFQUFFO2dCQUN0QyxJQUFLLE1BQWMsQ0FBQyxNQUFNLEVBQUU7SUFDMUIsZ0JBQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFvQixDQUFDLENBQUM7SUFDdkMsYUFBQTtJQUNGLFNBQUE7SUFDSCxLQUFDLENBQUMsQ0FBQztJQUVILElBQUEsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7OztJQVFHO0lBQ21CLFNBQUEsNkJBQTZCLENBQUMsSUFBVSxFQUFFLFNBQWlCLEVBQUE7O0lBQy9FLFFBQUEsTUFBTSxJQUFJLEdBQW1CLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hGLE9BQU8seUJBQXlCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RCxDQUFBLENBQUE7SUFBQSxDQUFBO0lBRUQ7Ozs7Ozs7O0lBUUc7SUFDRyxTQUFnQiw4QkFBOEIsQ0FBQyxJQUFVLEVBQUE7O1lBQzdELE1BQU0sS0FBSyxHQUFxQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLFFBQUEsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7WUFFNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEtBQUk7Z0JBQzVCLE1BQU0sTUFBTSxHQUFHLHlCQUF5QixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzVELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtJQUNsQixnQkFBQSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QixhQUFBO0lBQ0gsU0FBQyxDQUFDLENBQUM7SUFFSCxRQUFBLE9BQU8sR0FBRyxDQUFDO1NBQ1osQ0FBQSxDQUFBO0lBQUE7O0lDM0hEOzs7Ozs7SUFNRztJQUNhLFNBQUEsOEJBQThCLENBQUMsTUFBa0IsRUFBRSxRQUF3QixFQUFBOztRQUN6RixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUNBLGdCQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRW5ELElBQUksS0FBSyxHQUFrQixJQUFJLENBQUM7UUFFaEMsSUFBSSxhQUFhLElBQUksR0FBRyxFQUFFO0lBQ3hCLFFBQUEsS0FBSyxHQUFHLENBQUEsRUFBQSxHQUFBLENBQUEsRUFBQSxHQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFFLFNBQVMsTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBSSxJQUFJLENBQUM7SUFDOUQsS0FBQTtJQUFNLFNBQUE7SUFXTCxRQUFBLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFzQyxDQUFDO1lBRW5FLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFBLFNBQVMsS0FBQSxJQUFBLElBQVQsU0FBUyxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFULFNBQVMsQ0FBRSxJQUFJLE1BQUssV0FBVyxFQUFFO0lBQ25DLFlBQUEsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDekIsU0FBQTtJQUNGLEtBQUE7SUFFRCxJQUFBLE9BQU8sS0FBSyxDQUFDO0lBQ2Y7O0lDdENBO0FBRWEsVUFBQSx1QkFBdUIsR0FBRztJQUNyQyxJQUFBLEVBQUUsRUFBRSxJQUFJO0lBQ1IsSUFBQSxFQUFFLEVBQUUsSUFBSTtJQUNSLElBQUEsRUFBRSxFQUFFLElBQUk7SUFDUixJQUFBLEVBQUUsRUFBRSxJQUFJO0lBQ1IsSUFBQSxFQUFFLEVBQUUsSUFBSTtJQUNSLElBQUEsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFBLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBQSxLQUFLLEVBQUUsT0FBTztJQUNkLElBQUEsR0FBRyxFQUFFLEtBQUs7SUFDVixJQUFBLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLElBQUEsTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBQSxTQUFTLEVBQUUsV0FBVztJQUN0QixJQUFBLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLElBQUEsUUFBUSxFQUFFLFVBQVU7SUFDcEIsSUFBQSxTQUFTLEVBQUUsV0FBVztJQUN0QixJQUFBLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLElBQUEsVUFBVSxFQUFFLFlBQVk7SUFDeEIsSUFBQSxPQUFPLEVBQUUsU0FBUzs7O0lDcEJwQjs7OztJQUlHO0lBQ0csU0FBVSxRQUFRLENBQUMsS0FBYSxFQUFBO0lBQ3BDLElBQUEsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDOztVQ0hhLG9CQUFvQixDQUFBO0lBbUUvQjs7SUFFRztJQUNILElBQUEsV0FBQSxHQUFBO0lBckVBOztJQUVHO1lBQ0ksSUFBb0IsQ0FBQSxvQkFBQSxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVuRTs7SUFFRztZQUNJLElBQXFCLENBQUEscUJBQUEsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRS9FOztJQUVHO0lBQ0ksUUFBQSxJQUFBLENBQUEsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFN0Q7OztJQUdHO1lBQ0ssSUFBWSxDQUFBLFlBQUEsR0FBb0IsRUFBRSxDQUFDO0lBSzNDOztJQUVHO1lBQ0ssSUFBYyxDQUFBLGNBQUEsR0FBc0MsRUFBRSxDQUFDOztTQTRDOUQ7SUFuREQsSUFBQSxJQUFXLFdBQVcsR0FBQTtJQUNwQixRQUFBLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuQztJQU1ELElBQUEsSUFBVyxhQUFhLEdBQUE7WUFDdEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDL0M7SUFFRDs7SUFFRztJQUNILElBQUEsSUFBVyxtQkFBbUIsR0FBQTtZQUM1QixNQUFNLE1BQU0sR0FBMEQsRUFBRSxDQUFDO0lBRXpFLFFBQUEsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFFOUUsUUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSTtJQUNqRSxZQUFBLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUMzQixnQkFBQSxNQUFNLENBQUMsSUFBK0IsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN0RCxhQUFBO0lBQ0gsU0FBQyxDQUFDLENBQUM7SUFFSCxRQUFBLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFFRDs7SUFFRztJQUNILElBQUEsSUFBVyxtQkFBbUIsR0FBQTtZQUM1QixNQUFNLE1BQU0sR0FBc0MsRUFBRSxDQUFDO0lBRXJELFFBQUEsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQVMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFFOUUsUUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSTtJQUNqRSxZQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQzVCLGdCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDM0IsYUFBQTtJQUNILFNBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBQSxPQUFPLE1BQU0sQ0FBQztTQUNmO0lBU0Q7Ozs7SUFJRztJQUNJLElBQUEsSUFBSSxDQUFDLE1BQTRCLEVBQUE7O1lBRXRDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0MsUUFBQSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxLQUFJO0lBQ2pDLFlBQUEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLFNBQUMsQ0FBQyxDQUFDOztZQUdILE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxLQUFJO0lBQ3pDLFlBQUEsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLFNBQUMsQ0FBQyxDQUFDOztZQUdILElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWpFLFFBQUEsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUVEOzs7SUFHRztRQUNJLEtBQUssR0FBQTtZQUNWLE9BQU8sSUFBSSxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QztJQUVEOzs7OztJQUtHO0lBQ0ksSUFBQSxhQUFhLENBQUMsSUFBc0MsRUFBQTs7WUFDekQsT0FBTyxDQUFBLEVBQUEsR0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFJLElBQUksQ0FBQztTQUMxQztJQUVEOzs7O0lBSUc7SUFDSSxJQUFBLGtCQUFrQixDQUFDLFVBQXlCLEVBQUE7SUFDakQsUUFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDN0Q7SUFFRDs7OztJQUlHO0lBQ0ksSUFBQSxvQkFBb0IsQ0FBQyxVQUF5QixFQUFBO1lBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELFFBQUEsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDaEIsWUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7SUFDbkYsU0FBQTtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3ZEO0lBRUQ7Ozs7O0lBS0c7SUFDSSxJQUFBLFFBQVEsQ0FBQyxJQUFzQyxFQUFBOztZQUNwRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLE9BQU8sQ0FBQSxFQUFBLEdBQUEsVUFBVSxhQUFWLFVBQVUsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBVixVQUFVLENBQUUsTUFBTSxNQUFJLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLElBQUksQ0FBQztTQUNuQztJQUVEOzs7OztJQUtHO1FBQ0ksUUFBUSxDQUFDLElBQXNDLEVBQUUsTUFBYyxFQUFBO1lBQ3BFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsUUFBQSxJQUFJLFVBQVUsRUFBRTtJQUNkLFlBQUEsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsU0FBQTtTQUNGO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5Qkc7SUFDSSxJQUFBLHNCQUFzQixDQUFDLElBQXNDLEVBQUE7WUFDbEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxRQUFBLE9BQU8sVUFBVSxHQUFHLENBQUcsRUFBQSxVQUFVLENBQUMsSUFBSSxDQUFTLE9BQUEsQ0FBQSxHQUFHLElBQUksQ0FBQztTQUN4RDtJQUVEOztJQUVHO1FBQ0ksTUFBTSxHQUFBOztJQUVYLFFBQUEsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQzs7WUFHN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEtBQUk7Z0JBQ3ZDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2xDLFNBQUMsQ0FBQyxDQUFDOztZQUdILElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxLQUFJO2dCQUN2QyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDckIsWUFBQSxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDO2dCQUV2QyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDbEQsZ0JBQUEsVUFBVSxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQztJQUN2QyxhQUFBO2dCQUVELElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtJQUNuRCxnQkFBQSxVQUFVLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDO0lBQ3hDLGFBQUE7Z0JBRUQsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQ2xELGdCQUFBLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7SUFDdkMsYUFBQTtJQUVELFlBQUEsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDekMsU0FBQyxDQUFDLENBQUM7U0FDSjtJQUVEOztJQUVHO1FBQ0ssMkJBQTJCLEdBQUE7WUFLakMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNqQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7WUFFaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEtBQUk7SUFDdkMsWUFBQSxLQUFLLElBQUksVUFBVSxDQUFDLG1CQUFtQixDQUFDO0lBQ3hDLFlBQUEsTUFBTSxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztJQUMxQyxZQUFBLEtBQUssSUFBSSxVQUFVLENBQUMsbUJBQW1CLENBQUM7SUFDMUMsU0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0IsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUU3QixRQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ2pDO0lBQ0Y7O0lDbFFEO0FBRWEsVUFBQSw4QkFBOEIsR0FBRztJQUM1QyxJQUFBLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBQSxhQUFhLEVBQUUsZUFBZTtJQUM5QixJQUFBLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLElBQUEsV0FBVyxFQUFFLGFBQWE7SUFDMUIsSUFBQSxRQUFRLEVBQUUsVUFBVTtJQUNwQixJQUFBLFlBQVksRUFBRSxjQUFjO01BQ25CO0lBS0osTUFBTSw0QkFBNEIsR0FBa0U7UUFDekcsTUFBTSxFQUFFLDhCQUE4QixDQUFDLEtBQUs7UUFDNUMsY0FBYyxFQUFFLDhCQUE4QixDQUFDLGFBQWE7UUFDNUQsV0FBVyxFQUFFLDhCQUE4QixDQUFDLFVBQVU7UUFDdEQsU0FBUyxFQUFFLDhCQUE4QixDQUFDLFFBQVE7UUFDbEQsYUFBYSxFQUFFLDhCQUE4QixDQUFDLFlBQVk7S0FDM0Q7O0lDaEJELE1BQU0sTUFBTSxHQUFHLElBQUlBLGdCQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFakM7O0lBRUc7VUFDVSw4QkFBOEIsQ0FBQTtJQWlEekMsSUFBQSxXQUFBLENBQW1CLEVBQ2pCLFFBQVEsRUFDUixJQUFJLEVBQ0osV0FBVyxHQWdCWixFQUFBOztJQUNDLFFBQUEsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDekIsUUFBQSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNqQixRQUFBLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztJQUcvQixRQUFBLE1BQU0sZUFBZSxHQUFHLENBQUEsRUFBQSxHQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQzdGLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSTtJQUNsQixZQUFBLE9BQVEsUUFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDbkQsU0FBQyxDQUNGLE1BQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUCxNQUFNLFlBQVksR0FBRyxDQUFBLEVBQUEsR0FBQSxlQUFlLEtBQWYsSUFBQSxJQUFBLGVBQWUsS0FBZixLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxlQUFlLENBQUcsSUFBSSxDQUFLLE1BQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsSUFBSSxDQUFDO1lBRXJELElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtJQUN4QixZQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ1YsQ0FBQSxtREFBQSxFQUNFLE1BQUEsUUFBUSxDQUFDLElBQUksTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBSSxXQUNuQixDQUFBLFdBQUEsRUFBYyxJQUFJLENBQUEsK0NBQUEsQ0FBaUQsQ0FDcEUsQ0FBQztJQUVGLFlBQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEIsU0FBQTtJQUFNLGFBQUE7SUFDTCxZQUFBLE1BQU0sTUFBTSxHQUFJLFFBQWdCLENBQUMsWUFBWSxDQUFnQixDQUFDO0lBRTlELFlBQUEsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDOztJQUdwQyxZQUFBLE1BQU0sVUFBVSxHQUFHLElBQUlBLGdCQUFLLENBQUMsS0FBSyxDQUNoQyxXQUFXLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLEVBQzlCLFdBQVcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsRUFDOUIsV0FBVyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUMvQixDQUFDO2dCQUVGLElBQUksQ0FBQyxNQUFNLEdBQUc7b0JBQ1osWUFBWTtvQkFDWixZQUFZO29CQUNaLFVBQVU7aUJBQ1gsQ0FBQztJQUNILFNBQUE7U0FDRjtJQUVNLElBQUEsV0FBVyxDQUFDLE1BQWMsRUFBQTtJQUMvQixRQUFBLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7O2dCQUV2QixPQUFPO0lBQ1IsU0FBQTtZQUVELE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUVqRCxNQUFNLE1BQU0sR0FBSSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxZQUFZLENBQWdCLENBQUM7WUFDbkUsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixPQUFPO0lBQ1IsU0FBQTtJQUVELFFBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRTNELElBQUksT0FBUSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7SUFDbEUsWUFBQSxJQUFJLENBQUMsUUFBZ0IsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDbkQsU0FBQTtTQUNGO1FBRU0sa0JBQWtCLEdBQUE7SUFDdkIsUUFBQSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFOztnQkFFdkIsT0FBTztJQUNSLFNBQUE7WUFFRCxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFbkQsTUFBTSxNQUFNLEdBQUksSUFBSSxDQUFDLFFBQWdCLENBQUMsWUFBWSxDQUFnQixDQUFDO1lBQ25FLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsT0FBTztJQUNSLFNBQUE7SUFFRCxRQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFMUIsSUFBSSxPQUFRLElBQUksQ0FBQyxRQUFnQixDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtJQUNsRSxZQUFBLElBQUksQ0FBQyxRQUFnQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUNuRCxTQUFBO1NBQ0Y7O0lBbEpEOztJQUVHO0lBQ1ksOEJBQUEsQ0FBQSxtQkFBbUIsR0FFOUI7SUFDRixJQUFBLHNCQUFzQixFQUFFO0lBQ3RCLFFBQUEsS0FBSyxFQUFFLE9BQU87SUFDZCxRQUFBLGFBQWEsRUFBRSxVQUFVO0lBQzFCLEtBQUE7SUFDRCxJQUFBLG1CQUFtQixFQUFFO0lBQ25CLFFBQUEsS0FBSyxFQUFFLE9BQU87SUFDZixLQUFBO0lBQ0QsSUFBQSxlQUFlLEVBQUU7SUFDZixRQUFBLEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBQSxhQUFhLEVBQUUsVUFBVTtJQUN6QixRQUFBLFlBQVksRUFBRSxvQkFBb0I7SUFDbEMsUUFBQSxXQUFXLEVBQUUsY0FBYztJQUMzQixRQUFBLFFBQVEsRUFBRSwwQkFBMEI7SUFDcEMsUUFBQSxVQUFVLEVBQUUsa0JBQWtCO0lBQy9CLEtBQUE7S0FDRjs7SUM1Qkg7O0lBRUc7VUFDVSw0QkFBNEIsQ0FBQTtJQWdCdkMsSUFBQSxXQUFBLENBQW1CLEVBQ2pCLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxHQWdCUCxFQUFBO0lBQ0MsUUFBQSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUM3QixRQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ25CLFFBQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7SUFFTSxJQUFBLFdBQVcsQ0FBQyxNQUFjLEVBQUE7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUk7O2dCQUMvQixJQUFJLENBQUEsQ0FBQSxFQUFBLEdBQUEsSUFBSSxDQUFDLHFCQUFxQixNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFHLElBQUksQ0FBQyxLQUFLLENBQUssS0FBQSxJQUFJLEVBQUU7SUFDcEQsZ0JBQUEsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNoRSxhQUFBO0lBQ0gsU0FBQyxDQUFDLENBQUM7U0FDSjtRQUVNLGtCQUFrQixHQUFBO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFJOztnQkFDL0IsSUFBSSxDQUFBLENBQUEsRUFBQSxHQUFBLElBQUksQ0FBQyxxQkFBcUIsTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFLLEtBQUEsSUFBSSxFQUFFO29CQUNwRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM5QyxhQUFBO0lBQ0gsU0FBQyxDQUFDLENBQUM7U0FDSjtJQUNGOztJQzNERCxNQUFNLEdBQUcsR0FBRyxJQUFJQSxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRWhDOztJQUVHO1VBQ1UsaUNBQWlDLENBQUE7SUFrRDVDLElBQUEsV0FBQSxDQUFtQixFQUNqQixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sR0FnQlAsRUFBQTs7SUFDQyxRQUFBLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLFFBQUEsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbkIsUUFBQSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUVyQixRQUFBLE1BQU0sYUFBYSxHQUFHLENBQUEsRUFBQSxHQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQzVGLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSTtJQUNsQixZQUFBLE9BQVEsUUFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDbkQsU0FBQyxDQUNGLE1BQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUcsQ0FBQyxDQUFDLENBQUM7WUFFUCxJQUFJLGFBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsWUFBQSxPQUFPLENBQUMsSUFBSSxDQUNWLENBQUEsc0RBQUEsRUFDRSxDQUFBLEVBQUEsR0FBQSxRQUFRLENBQUMsSUFBSSxNQUFJLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLFdBQ25CLENBQXFDLG1DQUFBLENBQUEsQ0FDdEMsQ0FBQztJQUVGLFlBQUEsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsU0FBQTtJQUFNLGFBQUE7SUFDTCxZQUFBLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXRCLFlBQUEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksS0FBSTs7b0JBQ3JDLE1BQU0sT0FBTyxTQUFLLFFBQWdCLENBQUMsWUFBWSxDQUErQixNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFFLEtBQUssRUFBRSxDQUFDO29CQUN4RixJQUFJLENBQUMsT0FBTyxFQUFFO0lBQ1osb0JBQUEsT0FBTyxJQUFJLENBQUM7SUFDYixpQkFBQTtJQUVBLGdCQUFBLFFBQWdCLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUUxQyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM3QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUM1QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRW5ELGdCQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3BCLG9CQUFBLElBQUksRUFBRSxZQUFZO3dCQUNsQixhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixVQUFVO0lBQ1gsaUJBQUEsQ0FBQyxDQUFDO0lBQ0wsYUFBQyxDQUFDLENBQUM7SUFDSixTQUFBO1NBQ0Y7SUFFTSxJQUFBLFdBQVcsQ0FBQyxNQUFjLEVBQUE7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEtBQUk7Z0JBQ3BDLE1BQU0sTUFBTSxHQUFJLElBQUksQ0FBQyxRQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQWtCLENBQUM7Z0JBQ3RFLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDeEIsT0FBTztJQUNSLGFBQUE7SUFFRCxZQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLFlBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFeEUsWUFBQSxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixTQUFDLENBQUMsQ0FBQztTQUNKO1FBRU0sa0JBQWtCLEdBQUE7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEtBQUk7Z0JBQ3BDLE1BQU0sTUFBTSxHQUFJLElBQUksQ0FBQyxRQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQWtCLENBQUM7Z0JBQ3RFLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDeEIsT0FBTztJQUNSLGFBQUE7Z0JBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFMUMsWUFBQSxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixTQUFDLENBQUMsQ0FBQztTQUNKOztJQTVJYyxpQ0FBQSxDQUFBLGlCQUFpQixHQUEwQztJQUN4RSxJQUFBLHNCQUFzQixFQUFFO1lBQ3RCLEtBQUs7WUFDTCxhQUFhO1lBQ2IsU0FBUztZQUNULFdBQVc7WUFDWCxpQkFBaUI7WUFDakIsY0FBYztZQUNkLGNBQWM7WUFDZCxVQUFVO0lBQ1gsS0FBQTtJQUNELElBQUEsbUJBQW1CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQztJQUN2RCxJQUFBLGVBQWUsRUFBRTtZQUNmLEtBQUs7WUFDTCxXQUFXO1lBQ1gsYUFBYTtZQUNiLHNCQUFzQjtZQUN0QixvQkFBb0I7WUFDcEIsNkJBQTZCO1lBQzdCLHdCQUF3QjtJQUN6QixLQUFBO0tBQ0Y7O0lDZkg7O0lBRUc7SUFDSCxNQUFNQyx3QkFBc0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRTVEOztJQUVHO1VBQ1UseUJBQXlCLENBQUE7SUE4QnBDLElBQUEsV0FBQSxDQUFtQixNQUFrQixFQUFBO0lBQ25DLFFBQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7SUFQRCxJQUFBLElBQVcsSUFBSSxHQUFBOztJQUViLFFBQUEsT0FBTywyQkFBMkIsQ0FBQztTQUNwQztJQU1ZLElBQUEsU0FBUyxDQUFDLElBQVUsRUFBQTs7SUFDL0IsWUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvRCxDQUFBLENBQUE7SUFBQSxLQUFBO0lBRUQ7Ozs7SUFJRztJQUNXLElBQUEsT0FBTyxDQUFDLElBQVUsRUFBQTs7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxZQUFBLElBQUksUUFBUSxFQUFFO0lBQ1osZ0JBQUEsT0FBTyxRQUFRLENBQUM7SUFDakIsYUFBQTtnQkFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsWUFBQSxJQUFJLFFBQVEsRUFBRTtJQUNaLGdCQUFBLE9BQU8sUUFBUSxDQUFDO0lBQ2pCLGFBQUE7SUFFRCxZQUFBLE9BQU8sSUFBSSxDQUFDO2FBQ2IsQ0FBQSxDQUFBO0lBQUEsS0FBQTtJQUVhLElBQUEsU0FBUyxDQUFDLElBQVUsRUFBQTs7O0lBQ2hDLFlBQUEsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUF3QixDQUFDOztJQUdsRCxZQUFBLE1BQU0sU0FBUyxHQUFHLENBQUEsQ0FBQSxFQUFBLEdBQUEsSUFBSSxDQUFDLGNBQWMsTUFBRSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxPQUFPLENBQUMsVUFBVSxDQUFNLE1BQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxTQUFTLEVBQUU7SUFDZCxnQkFBQSxPQUFPLElBQUksQ0FBQztJQUNiLGFBQUE7Z0JBRUQsTUFBTSxTQUFTLEdBQUcsQ0FBQSxFQUFBLEdBQUEsSUFBSSxDQUFDLFVBQVUsTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBRyxVQUFVLENBQW9DLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxTQUFTLEVBQUU7SUFDZCxnQkFBQSxPQUFPLElBQUksQ0FBQztJQUNiLGFBQUE7SUFFRCxZQUFBLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDMUMsWUFBQSxJQUFJLENBQUNBLHdCQUFzQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtJQUM1QyxnQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLDREQUE0RCxXQUFXLENBQUEsQ0FBQSxDQUFHLENBQUMsQ0FBQztJQUN6RixnQkFBQSxPQUFPLElBQUksQ0FBQztJQUNiLGFBQUE7SUFFRCxZQUFBLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO0lBQ3RCLGdCQUFBLE9BQU8sSUFBSSxDQUFDO0lBQ2IsYUFBQTs7SUFHRCxZQUFBLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFTLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLFlBQUEsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLEdBQUcsRUFBa0MsQ0FBQztJQUUxRSxZQUFBLElBQUksaUJBQWlCLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtJQUNwQyxnQkFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEtBQUk7d0JBQzVFLElBQUksZ0JBQWdCLElBQUksSUFBSSxFQUFFOzRCQUM1QixPQUFPO0lBQ1IscUJBQUE7SUFFRCxvQkFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM1Qix3QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxJQUFJLENBQUEsbUNBQUEsQ0FBcUMsQ0FBQyxDQUFDOzRCQUMzRyxPQUFPO0lBQ1IscUJBQUE7SUFFRCxvQkFBQSx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDdEQsaUJBQUMsQ0FBQyxDQUFDO0lBQ0osYUFBQTtJQUVELFlBQUEsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO0lBQ3BDLGdCQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsS0FBSTtJQUM1RSxvQkFBQSxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDM0Isd0JBQUEsT0FBTyxDQUFDLElBQUksQ0FDVix5RUFBeUUsSUFBSSxDQUFBLDBCQUFBLENBQTRCLENBQzFHLENBQUM7NEJBQ0YsT0FBTztJQUNSLHFCQUFBO0lBRUQsb0JBQUEsdUJBQXVCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RELGlCQUFDLENBQUMsQ0FBQztJQUNKLGFBQUE7O0lBR0QsWUFBQSxNQUFNLE9BQU8sR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7O2dCQUczQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFPLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEtBQUksU0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxhQUFBOztJQUNuRixnQkFBQSxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxnQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFM0IsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFBLEVBQUEsR0FBQSxnQkFBZ0IsQ0FBQyxRQUFRLE1BQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLEdBQUksS0FBSyxDQUFDO29CQUN6RCxVQUFVLENBQUMsYUFBYSxHQUFHLENBQUEsRUFBQSxHQUFBLGdCQUFnQixDQUFDLGFBQWEsTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBSSxNQUFNLENBQUM7b0JBQ3BFLFVBQVUsQ0FBQyxjQUFjLEdBQUcsQ0FBQSxFQUFBLEdBQUEsZ0JBQWdCLENBQUMsY0FBYyxNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFJLE1BQU0sQ0FBQztvQkFDdEUsVUFBVSxDQUFDLGFBQWEsR0FBRyxDQUFBLEVBQUEsR0FBQSxnQkFBZ0IsQ0FBQyxhQUFhLE1BQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLEdBQUksTUFBTSxDQUFDO29CQUVwRSxDQUFBLEVBQUEsR0FBQSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBRSxPQUFPLENBQUMsQ0FBTyxJQUFJLEtBQUksU0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxhQUFBOzt3QkFDeEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTs0QkFDdkQsT0FBTztJQUNSLHFCQUFBO0lBRUQsb0JBQUEsTUFBTSxVQUFVLElBQUksTUFBTSw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7SUFDM0Usb0JBQUEsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztJQUdwQyxvQkFBQSxJQUNFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FDZixDQUFDLFNBQVMsS0FDUixLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQztJQUM5Qyx3QkFBQSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUM1RCxFQUNEOzRCQUNBLE9BQU8sQ0FBQyxJQUFJLENBQ1YsQ0FBOEIsMkJBQUEsRUFBQSxnQkFBZ0IsQ0FBQyxJQUFJLENBQTZCLDBCQUFBLEVBQUEsZ0JBQWdCLENBQWlCLGVBQUEsQ0FBQSxDQUNsSCxDQUFDOzRCQUNGLE9BQU87SUFDUixxQkFBQTtJQUVELG9CQUFBLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLElBQUksNEJBQTRCLENBQUM7NEJBQy9CLFVBQVU7SUFDVix3QkFBQSxLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLHdCQUFBLE1BQU0sRUFBRSxDQUFBLEVBQUEsR0FBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSxHQUFHO0lBQzNCLHFCQUFBLENBQUMsQ0FDSCxDQUFDO0lBQ0osaUJBQUMsQ0FBQSxDQUFFLENBQUE7SUFFSCxnQkFBQSxJQUFJLGdCQUFnQixDQUFDLGtCQUFrQixJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFOzt3QkFFakYsTUFBTSxhQUFhLEdBQXFCLEVBQUUsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUk7SUFDN0Isd0JBQUEsTUFBTSxRQUFRLEdBQUksTUFBYyxDQUFDLFFBQXNDLENBQUM7SUFDeEUsd0JBQUEsSUFBSSxRQUFRLEVBQUU7SUFDWiw0QkFBQSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLHlCQUFBO0lBQ0gscUJBQUMsQ0FBQyxDQUFDO3dCQUVILENBQUEsRUFBQSxHQUFBLGdCQUFnQixDQUFDLGtCQUFrQixNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFFLE9BQU8sQ0FBQyxDQUFPLElBQUksS0FBSSxTQUFBLENBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLGFBQUE7NEJBQzFELE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEtBQUk7Z0NBQ2xELE1BQU0sYUFBYSxHQUFHLDhCQUE4QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUUsNEJBQUEsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQztJQUN6Qyx5QkFBQyxDQUFDLENBQUM7SUFFSCx3QkFBQSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxLQUFJO0lBQzdCLDRCQUFBLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLElBQUksOEJBQThCLENBQUM7b0NBQ2pDLFFBQVE7b0NBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0lBQ2YsZ0NBQUEsV0FBVyxFQUFFLElBQUlELGdCQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDM0QsNkJBQUEsQ0FBQyxDQUNILENBQUM7SUFDSix5QkFBQyxDQUFDLENBQUM7SUFDTCxxQkFBQyxDQUFBLENBQUUsQ0FBQTt3QkFFSCxDQUFBLEVBQUEsR0FBQSxnQkFBZ0IsQ0FBQyxxQkFBcUIsTUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBRSxPQUFPLENBQUMsQ0FBTyxJQUFJLEtBQUksU0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxhQUFBOzRCQUM3RCxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxLQUFJO2dDQUNsRCxNQUFNLGFBQWEsR0FBRyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLDRCQUFBLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxhQUFhLENBQUM7SUFDekMseUJBQUMsQ0FBQyxDQUFDO0lBRUgsd0JBQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsS0FBSTs7SUFDN0IsNEJBQUEsVUFBVSxDQUFDLE9BQU8sQ0FDaEIsSUFBSSxpQ0FBaUMsQ0FBQztvQ0FDcEMsUUFBUTtJQUNSLGdDQUFBLE1BQU0sRUFBRSxJQUFJQSxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQSxDQUFBLEVBQUEsR0FBQyxJQUFJLENBQUMsTUFBTSxNQUFJLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLGdDQUFBLEtBQUssRUFBRSxJQUFJQSxnQkFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQSxDQUFBLEVBQUEsR0FBQyxJQUFJLENBQUMsS0FBSyxNQUFJLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9ELDZCQUFBLENBQUMsQ0FDSCxDQUFDO0lBQ0oseUJBQUMsQ0FBQyxDQUFDO0lBQ0wscUJBQUMsQ0FBQSxDQUFFLENBQUE7SUFDSixpQkFBQTtJQUVELGdCQUFBLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDeEMsQ0FBQSxDQUFDLENBQ0gsQ0FBQztJQUVGLFlBQUEsT0FBTyxPQUFPLENBQUM7O0lBQ2hCLEtBQUE7SUFFYSxJQUFBLFNBQVMsQ0FBQyxJQUFVLEVBQUE7OztJQUNoQyxZQUFBLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBd0IsQ0FBQzs7Z0JBR2xELE1BQU0sTUFBTSxHQUFHLENBQUEsRUFBQSxHQUFBLElBQUksQ0FBQyxVQUFVLE1BQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUUsR0FBNEIsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNYLGdCQUFBLE9BQU8sSUFBSSxDQUFDO0lBQ2IsYUFBQTtJQUVELFlBQUEsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtJQUNyQixnQkFBQSxPQUFPLElBQUksQ0FBQztJQUNiLGFBQUE7SUFFRCxZQUFBLE1BQU0sT0FBTyxHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztJQUUzQyxZQUFBLE1BQU0sc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtJQUMzQixnQkFBQSxPQUFPLE9BQU8sQ0FBQztJQUNoQixhQUFBO0lBRUQsWUFBQSxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7Z0JBRTVDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBTyxXQUFXLEtBQUksU0FBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxhQUFBOztJQUMvQyxnQkFBQSxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzVDLGdCQUFBLE1BQU0sWUFBWSxHQUNoQixDQUFDLFlBQVksSUFBSSxJQUFJLElBQUkseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDO29CQUM5RixNQUFNLElBQUksR0FBRyxZQUFZLEtBQVosSUFBQSxJQUFBLFlBQVksS0FBWixLQUFBLENBQUEsR0FBQSxZQUFZLEdBQUksV0FBVyxDQUFDLElBQUksQ0FBQztvQkFFOUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0lBQ2hCLG9CQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkZBQTJGLENBQUMsQ0FBQzt3QkFDMUcsT0FBTztJQUNSLGlCQUFBOztJQUdELGdCQUFBLElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQy9CLG9CQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ1YsbURBQW1ELFlBQVksQ0FBQSxnREFBQSxDQUFrRCxDQUNsSCxDQUFDO3dCQUNGLE9BQU87SUFDUixpQkFBQTtJQUVELGdCQUFBLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixnQkFBQSxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxnQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFM0IsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFBLEVBQUEsR0FBQSxXQUFXLENBQUMsUUFBUSxNQUFBLElBQUEsSUFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFJLEtBQUssQ0FBQzs7O29CQUlwRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7d0JBQ3JCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQU8sSUFBSSxLQUFJLFNBQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQSxDQUFBLEVBQUEsS0FBQSxDQUFBLEVBQUEsYUFBQTs7NEJBQ3ZDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0NBQ3ZELE9BQU87SUFDUix5QkFBQTs0QkFFRCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7NEJBQ3BDLENBQUEsRUFBQSxHQUFBLElBQUksQ0FBQyxLQUFLLE1BQUUsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSTtJQUM5Qiw0QkFBQSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtJQUMzQixnQ0FBQSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLDZCQUFBO0lBQ0gseUJBQUMsQ0FBRSxDQUFBO0lBRUgsd0JBQUEsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUVwQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFPLFNBQVMsS0FBSSxTQUFBLENBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLGFBQUE7O2dDQUNyQyxNQUFNLFVBQVUsSUFBSSxNQUFNLDZCQUE2QixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBRSxDQUFDOztJQUczRSw0QkFBQSxJQUNFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FDZixDQUFDLFNBQVMsS0FDUixLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQztJQUM5QyxnQ0FBQSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUM1RCxFQUNEO29DQUNBLE9BQU8sQ0FBQyxJQUFJLENBQ1YsQ0FBOEIsMkJBQUEsRUFBQSxXQUFXLENBQUMsSUFBSSxDQUFzQixtQkFBQSxFQUFBLGdCQUFnQixDQUF5Qix1QkFBQSxDQUFBLENBQzlHLENBQUM7b0NBQ0YsT0FBTztJQUNSLDZCQUFBO0lBRUQsNEJBQUEsVUFBVSxDQUFDLE9BQU8sQ0FDaEIsSUFBSSw0QkFBNEIsQ0FBQztvQ0FDL0IsVUFBVTtJQUNWLGdDQUFBLEtBQUssRUFBRSxnQkFBZ0I7b0NBQ3ZCLE1BQU0sRUFBRSxJQUFJLElBQUcsQ0FBQSxFQUFBLEdBQUMsSUFBSSxDQUFDLE1BQU0sTUFBSSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxHQUFHLENBQUM7SUFDcEMsNkJBQUEsQ0FBQyxDQUNILENBQUM7NkJBQ0gsQ0FBQSxDQUFDLENBQ0gsQ0FBQzt5QkFDSCxDQUFBLENBQUMsQ0FBQztJQUNKLGlCQUFBOztJQUdELGdCQUFBLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7SUFDbEQsZ0JBQUEsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDakQsb0JBQUEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsS0FBSTtJQUN2Qyx3QkFBQSxJQUNFLGFBQWEsQ0FBQyxZQUFZLEtBQUssU0FBUztnQ0FDeEMsYUFBYSxDQUFDLFlBQVksS0FBSyxTQUFTO0lBQ3hDLDRCQUFBLGFBQWEsQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUN2QztnQ0FDQSxPQUFPO0lBQ1IseUJBQUE7SUFFRDs7Ozs7O0lBTUc7NEJBQ0gsTUFBTSxTQUFTLEdBQXFCLEVBQUUsQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUk7Z0NBQzdCLElBQUssTUFBYyxDQUFDLFFBQVEsRUFBRTtJQUM1QixnQ0FBQSxNQUFNLFFBQVEsR0FBdUMsTUFBYyxDQUFDLFFBQVEsQ0FBQztJQUM3RSxnQ0FBQSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7d0NBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQ1osR0FBRyxRQUFRLENBQUMsTUFBTSxDQUNoQixDQUFDLEdBQUcsS0FDRixDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLFlBQWE7NENBQ3ZDLEdBQUcsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLFlBQWEsR0FBRyxZQUFZOzRDQUN6RCxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNoQyxDQUNGLENBQUM7SUFDSCxpQ0FBQTtJQUFNLHFDQUFBLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDN0Ysb0NBQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixpQ0FBQTtJQUNGLDZCQUFBO0lBQ0gseUJBQUMsQ0FBQyxDQUFDO0lBRUgsd0JBQUEsTUFBTSxvQkFBb0IsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQ3hELHdCQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEtBQUk7O2dDQUU3QixJQUFJLG9CQUFvQixLQUFLLGFBQWEsRUFBRTtvQ0FDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSUEsZ0JBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsV0FBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzlGLE1BQU0sTUFBTSxHQUFHLElBQUlBLGdCQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLFdBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9GLGdDQUFBLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLElBQUksaUNBQWlDLENBQUM7d0NBQ3BDLFFBQVE7d0NBQ1IsS0FBSzt3Q0FDTCxNQUFNO0lBQ1AsaUNBQUEsQ0FBQyxDQUNILENBQUM7b0NBRUYsT0FBTztJQUNSLDZCQUFBOztJQUdELDRCQUFBLE1BQU0saUJBQWlCLEdBQUcsNEJBQTRCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3RSw0QkFBQSxJQUFJLGlCQUFpQixFQUFFO0lBQ3JCLGdDQUFBLFVBQVUsQ0FBQyxPQUFPLENBQ2hCLElBQUksOEJBQThCLENBQUM7d0NBQ2pDLFFBQVE7SUFDUixvQ0FBQSxJQUFJLEVBQUUsaUJBQWlCO0lBQ3ZCLG9DQUFBLFdBQVcsRUFBRSxJQUFJQSxnQkFBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxpQ0FBQSxDQUFDLENBQ0gsQ0FBQztvQ0FFRixPQUFPO0lBQ1IsNkJBQUE7SUFFRCw0QkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLENBQUM7SUFDM0QseUJBQUMsQ0FBQyxDQUFDO0lBQ0wscUJBQUMsQ0FBQyxDQUFDO0lBQ0osaUJBQUE7SUFFRCxnQkFBQSxPQUFPLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3hDLENBQUEsQ0FBQyxDQUNILENBQUM7SUFFRixZQUFBLE9BQU8sT0FBTyxDQUFDOztJQUNoQixLQUFBOztJQWxZc0IseUJBQUEsQ0FBQSxpQkFBaUIsR0FBeUU7SUFDL0csSUFBQSxDQUFDLEVBQUUsSUFBSTtJQUNQLElBQUEsQ0FBQyxFQUFFLElBQUk7SUFDUCxJQUFBLENBQUMsRUFBRSxJQUFJO0lBQ1AsSUFBQSxDQUFDLEVBQUUsSUFBSTtJQUNQLElBQUEsQ0FBQyxFQUFFLElBQUk7SUFDUCxJQUFBLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBQSxHQUFHLEVBQUUsT0FBTztJQUNaLElBQUEsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFBLE1BQU0sRUFBRSxLQUFLO0lBQ2IsSUFBQSxHQUFHLEVBQUUsU0FBUztJQUNkLElBQUEsTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBQSxRQUFRLEVBQUUsVUFBVTtJQUNwQixJQUFBLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLElBQUEsU0FBUyxFQUFFLFdBQVc7O0lBRXRCLElBQUEsT0FBTyxFQUFFLFdBQVc7O0lBRXBCLElBQUEsT0FBTyxFQUFFLFlBQVk7SUFDckIsSUFBQSxPQUFPLEVBQUUsU0FBUztLQUNuQjs7SUM1Q0g7QUFFYSxVQUFBLHlCQUF5QixHQUFHO0lBQ3ZDLElBQUEsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFBLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBQSxLQUFLLEVBQUUsT0FBTzs7O1VDREgsY0FBYyxDQUFBO0lBMEJ6Qjs7Ozs7SUFLRztRQUNILFdBQW1CLENBQUEsUUFBcUIsRUFBRSxlQUErQyxFQUFBO0lBWGpGLFFBQUEsSUFBQSxDQUFBLHFCQUFxQixHQUFHLGNBQWMsQ0FBQyw4QkFBOEIsQ0FBQztJQUN0RSxRQUFBLElBQUEsQ0FBQSxxQkFBcUIsR0FBRyxjQUFjLENBQUMsOEJBQThCLENBQUM7WUFFdEUsSUFBa0IsQ0FBQSxrQkFBQSxHQUFHLEtBQUssQ0FBQztJQVNqQyxRQUFBLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLFFBQUEsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7U0FDeEM7SUFFRDs7Ozs7SUFLRztJQUNJLElBQUEsSUFBSSxDQUFDLE1BQXNCLEVBQUE7SUFDaEMsUUFBQSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUNyQyxZQUFBLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztJQUMzRSxTQUFBO0lBRUQsUUFBQSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxNQUFNO0lBQ2pFLFlBQUEsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7SUFDdEIsU0FBQSxDQUFDLENBQUMsQ0FBQztJQUVKLFFBQUEsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUVEOzs7SUFHRztRQUNJLEtBQUssR0FBQTtJQUNWLFFBQUEsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0U7SUFFRDs7Ozs7Ozs7SUFRRztJQUNILElBQUEsSUFBVyxvQkFBb0IsR0FBQTtZQUM3QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztTQUNuQztJQUVEOzs7Ozs7OztJQVFHO0lBQ0gsSUFBQSxJQUFXLG9CQUFvQixHQUFBO1lBQzdCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ25DO0lBRUQ7Ozs7Ozs7Ozs7O0lBV0c7SUFDSSxJQUFBLEtBQUssQ0FBQyxFQUNYLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyw4QkFBOEIsRUFDcEUsb0JBQW9CLEdBQUcsY0FBYyxDQUFDLDhCQUE4QixHQUNyRSxHQUFHLEVBQUUsRUFBQTtZQUNKLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMzQixPQUFPO0lBQ1IsU0FBQTtJQUNELFFBQUEsSUFBSSxDQUFDLHFCQUFxQixHQUFHLG9CQUFvQixDQUFDO0lBQ2xELFFBQUEsSUFBSSxDQUFDLHFCQUFxQixHQUFHLG9CQUFvQixDQUFDO1lBRWxELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFJO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSTtJQUMzQixnQkFBQSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVDLG9CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUN4RSxpQkFBQTtJQUFNLHFCQUFBLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxpQkFBaUIsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDNUMsb0JBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLGlCQUFBO0lBQU0scUJBQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUMvQixvQkFBQSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsaUJBQUE7SUFDSCxhQUFDLENBQUMsQ0FBQztJQUNMLFNBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBQSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBRU8sSUFBQSxpQkFBaUIsQ0FBQyxTQUFtQixFQUFFLEdBQWUsRUFBRSxTQUFxQixFQUFFLE9BQWlCLEVBQUE7WUFDdEcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ2pDLFlBQUEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUM1QyxnQkFBQSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0IsZ0JBQUEsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLGdCQUFBLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzQixnQkFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUUsU0FBUztJQUN2RCxnQkFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUUsU0FBUztJQUN2RCxnQkFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUUsU0FBUztJQUN2RCxnQkFBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQUUsU0FBUztJQUV2RCxnQkFBQSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsZ0JBQUEsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNC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
