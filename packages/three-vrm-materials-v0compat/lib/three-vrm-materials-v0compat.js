/*!
 * @pixiv/three-vrm-materials-v0compat v1.0.0
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2020-2021 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE_VRM_MATERIALS_V0COMPAT = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

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

    function gammaEOTF(e) {
        return Math.pow(e, 2.2);
    }

    class VRMMaterialsV0CompatPlugin {
        constructor(parser) {
            var _a;
            this.parser = parser;
            this._renderQueueMapTransparent = new Map();
            this._renderQueueMapTransparentZWrite = new Map();
            // WORKAROUND: Add KHR_texture_transform to extensionsUsed
            // It is too late to add this in beforeRoot
            const json = this.parser.json;
            json.extensionsUsed = (_a = json.extensionsUsed) !== null && _a !== void 0 ? _a : [];
            if (json.extensionsUsed.indexOf('KHR_texture_transform') === -1) {
                json.extensionsUsed.push('KHR_texture_transform');
            }
        }
        get name() {
            return 'VRMMaterialsV0CompatPlugin';
        }
        beforeRoot() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const json = this.parser.json;
                // early abort if it doesn't use V0VRM
                const v0VRMExtension = (_a = json.extensions) === null || _a === void 0 ? void 0 : _a['VRM'];
                const v0MaterialProperties = v0VRMExtension === null || v0VRMExtension === void 0 ? void 0 : v0VRMExtension.materialProperties;
                if (!v0MaterialProperties) {
                    return;
                }
                // populate render queue map
                this._populateRenderQueueMap(v0MaterialProperties);
                // convert V0 material properties into V1 compatible format
                v0MaterialProperties.forEach((materialProperties, materialIndex) => {
                    var _a, _b;
                    const materialDef = (_a = json.materials) === null || _a === void 0 ? void 0 : _a[materialIndex];
                    if (materialDef == null) {
                        console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`);
                        return;
                    }
                    if (materialProperties.shader === 'VRM/MToon') {
                        const material = this._parseV0MToonProperties(materialProperties, materialDef);
                        json.materials[materialIndex] = material;
                    }
                    else if ((_b = materialProperties.shader) === null || _b === void 0 ? void 0 : _b.startsWith('VRM/Unlit')) {
                        const material = this._parseV0UnlitProperties(materialProperties, materialDef);
                        json.materials[materialIndex] = material;
                    }
                    else if (materialProperties.shader === 'VRM_USE_GLTFSHADER') ;
                    else {
                        console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${materialProperties.shader}`);
                    }
                });
            });
        }
        _parseV0MToonProperties(materialProperties, schemaMaterial) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
            const isTransparent = (_b = (_a = materialProperties.keywordMap) === null || _a === void 0 ? void 0 : _a['_ALPHABLEND_ON']) !== null && _b !== void 0 ? _b : false;
            const enabledZWrite = ((_c = materialProperties.floatProperties) === null || _c === void 0 ? void 0 : _c['_ZWrite']) === 1;
            const transparentWithZWrite = enabledZWrite && isTransparent;
            const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);
            const isCutoff = (_e = (_d = materialProperties.keywordMap) === null || _d === void 0 ? void 0 : _d['_ALPHATEST_ON']) !== null && _e !== void 0 ? _e : false;
            const alphaMode = isTransparent ? 'BLEND' : isCutoff ? 'MASK' : 'OPAQUE';
            const alphaCutoff = isCutoff ? (_f = materialProperties.floatProperties) === null || _f === void 0 ? void 0 : _f['_Cutoff'] : undefined;
            const cullMode = (_h = (_g = materialProperties.floatProperties) === null || _g === void 0 ? void 0 : _g['_CullMode']) !== null && _h !== void 0 ? _h : 2; // enum, { Off, Front, Back }
            const doubleSided = cullMode === 0;
            const textureTransformExt = this._portTextureTransform(materialProperties);
            const baseColorFactor = (_k = (_j = materialProperties.vectorProperties) === null || _j === void 0 ? void 0 : _j['_Color']) === null || _k === void 0 ? void 0 : _k.map((v, i) => (i === 3 ? v : gammaEOTF(v)));
            const baseColorTextureIndex = (_l = materialProperties.textureProperties) === null || _l === void 0 ? void 0 : _l['_MainTex'];
            const baseColorTexture = baseColorTextureIndex != null
                ? {
                    index: baseColorTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            const normalTextureScale = (_m = materialProperties.floatProperties) === null || _m === void 0 ? void 0 : _m['_BumpScale'];
            const normalTextureIndex = (_o = materialProperties.textureProperties) === null || _o === void 0 ? void 0 : _o['_BumpMap'];
            const normalTexture = normalTextureIndex != null
                ? {
                    index: normalTextureIndex,
                    scale: normalTextureScale,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            const emissiveFactor = (_q = (_p = materialProperties.vectorProperties) === null || _p === void 0 ? void 0 : _p['_EmissionColor']) === null || _q === void 0 ? void 0 : _q.map(gammaEOTF);
            const emissiveTextureIndex = (_r = materialProperties.textureProperties) === null || _r === void 0 ? void 0 : _r['_EmissionMap'];
            const emissiveTexture = emissiveTextureIndex != null
                ? {
                    index: emissiveTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            const shadeColorFactor = (_t = (_s = materialProperties.vectorProperties) === null || _s === void 0 ? void 0 : _s['_ShadeColor']) === null || _t === void 0 ? void 0 : _t.map(gammaEOTF);
            const shadeMultiplyTextureIndex = (_u = materialProperties.textureProperties) === null || _u === void 0 ? void 0 : _u['_ShadeTexture'];
            const shadeMultiplyTexture = shadeMultiplyTextureIndex != null
                ? {
                    index: shadeMultiplyTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            // // convert v0 shade shift / shade toony
            let shadingShiftFactor = (_w = (_v = materialProperties.floatProperties) === null || _v === void 0 ? void 0 : _v['_ShadeShift']) !== null && _w !== void 0 ? _w : 0.0;
            let shadingToonyFactor = (_y = (_x = materialProperties.floatProperties) === null || _x === void 0 ? void 0 : _x['_ShadeToony']) !== null && _y !== void 0 ? _y : 0.9;
            shadingToonyFactor = THREE__namespace.MathUtils.lerp(shadingToonyFactor, 1.0, 0.5 + 0.5 * shadingShiftFactor);
            shadingShiftFactor = -shadingShiftFactor - (1.0 - shadingToonyFactor);
            const giIntensityFactor = (_z = materialProperties.floatProperties) === null || _z === void 0 ? void 0 : _z['_IndirectLightIntensity'];
            const giEqualizationFactor = giIntensityFactor ? 1.0 - giIntensityFactor : undefined;
            const matcapTextureIndex = (_0 = materialProperties.textureProperties) === null || _0 === void 0 ? void 0 : _0['_SphereAdd'];
            const matcapTexture = matcapTextureIndex != null
                ? {
                    index: matcapTextureIndex,
                }
                : undefined;
            const rimLightingMixFactor = (_1 = materialProperties.floatProperties) === null || _1 === void 0 ? void 0 : _1['_RimLightingMix'];
            const rimMultiplyTextureIndex = (_2 = materialProperties.textureProperties) === null || _2 === void 0 ? void 0 : _2['_RimTexture'];
            const rimMultiplyTexture = rimMultiplyTextureIndex != null
                ? {
                    index: rimMultiplyTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            const parametricRimColorFactor = (_4 = (_3 = materialProperties.vectorProperties) === null || _3 === void 0 ? void 0 : _3['_RimColor']) === null || _4 === void 0 ? void 0 : _4.map(gammaEOTF);
            const parametricRimFresnelPowerFactor = (_5 = materialProperties.floatProperties) === null || _5 === void 0 ? void 0 : _5['_RimFresnelPower'];
            const parametricRimLiftFactor = (_6 = materialProperties.floatProperties) === null || _6 === void 0 ? void 0 : _6['_RimLift'];
            const outlineWidthMode = ['none', 'worldCoordinates', 'screenCoordinates'][(_8 = (_7 = materialProperties.floatProperties) === null || _7 === void 0 ? void 0 : _7['_OutlineWidthMode']) !== null && _8 !== void 0 ? _8 : 0];
            // // v0 outlineWidthFactor is in centimeter
            let outlineWidthFactor = (_10 = (_9 = materialProperties.floatProperties) === null || _9 === void 0 ? void 0 : _9['_OutlineWidth']) !== null && _10 !== void 0 ? _10 : 0.0;
            outlineWidthFactor = 0.01 * outlineWidthFactor;
            const outlineWidthMultiplyTextureIndex = (_11 = materialProperties.textureProperties) === null || _11 === void 0 ? void 0 : _11['_OutlineWidthTexture'];
            const outlineWidthMultiplyTexture = outlineWidthMultiplyTextureIndex != null
                ? {
                    index: outlineWidthMultiplyTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            const outlineColorFactor = (_13 = (_12 = materialProperties.vectorProperties) === null || _12 === void 0 ? void 0 : _12['_OutlineColor']) === null || _13 === void 0 ? void 0 : _13.map(gammaEOTF);
            const outlineColorMode = (_14 = materialProperties.floatProperties) === null || _14 === void 0 ? void 0 : _14['_OutlineColorMode']; // enum, { Fixed, Mixed }
            const outlineLightingMixFactor = outlineColorMode === 1 ? (_15 = materialProperties.floatProperties) === null || _15 === void 0 ? void 0 : _15['_OutlineLightingMix'] : 0.0;
            const uvAnimationMaskTextureIndex = (_16 = materialProperties.textureProperties) === null || _16 === void 0 ? void 0 : _16['_UvAnimMaskTexture'];
            const uvAnimationMaskTexture = uvAnimationMaskTextureIndex != null
                ? {
                    index: uvAnimationMaskTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            const uvAnimationScrollXSpeedFactor = (_17 = materialProperties.floatProperties) === null || _17 === void 0 ? void 0 : _17['_UvAnimScrollX'];
            // uvAnimationScrollYSpeedFactor will be opposite between V0 and V1
            let uvAnimationScrollYSpeedFactor = (_18 = materialProperties.floatProperties) === null || _18 === void 0 ? void 0 : _18['_UvAnimScrollY'];
            if (uvAnimationScrollYSpeedFactor != null) {
                uvAnimationScrollYSpeedFactor = -uvAnimationScrollYSpeedFactor;
            }
            const uvAnimationRotationSpeedFactor = (_19 = materialProperties.floatProperties) === null || _19 === void 0 ? void 0 : _19['_UvAnimRotation'];
            const mtoonExtension = {
                specVersion: '1.0',
                transparentWithZWrite,
                renderQueueOffsetNumber,
                shadeColorFactor,
                shadeMultiplyTexture,
                shadingShiftFactor,
                shadingToonyFactor,
                giEqualizationFactor,
                matcapTexture,
                rimLightingMixFactor,
                rimMultiplyTexture,
                parametricRimColorFactor,
                parametricRimFresnelPowerFactor,
                parametricRimLiftFactor,
                outlineWidthMode,
                outlineWidthFactor,
                outlineWidthMultiplyTexture,
                outlineColorFactor,
                outlineLightingMixFactor,
                uvAnimationMaskTexture,
                uvAnimationScrollXSpeedFactor,
                uvAnimationScrollYSpeedFactor,
                uvAnimationRotationSpeedFactor,
            };
            return Object.assign(Object.assign({}, schemaMaterial), { pbrMetallicRoughness: {
                    baseColorFactor,
                    baseColorTexture,
                }, normalTexture,
                emissiveTexture,
                emissiveFactor,
                alphaMode,
                alphaCutoff,
                doubleSided, extensions: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    VRMC_materials_mtoon: mtoonExtension,
                } });
        }
        _parseV0UnlitProperties(materialProperties, schemaMaterial) {
            var _a, _b, _c, _d;
            const isTransparentZWrite = materialProperties.shader === 'VRM/UnlitTransparentZWrite';
            const isTransparent = materialProperties.shader === 'VRM/UnlitTransparent' || isTransparentZWrite;
            const renderQueueOffsetNumber = this._v0ParseRenderQueue(materialProperties);
            const isCutoff = materialProperties.shader === 'VRM/UnlitCutout';
            const alphaMode = isTransparent ? 'BLEND' : isCutoff ? 'MASK' : 'OPAQUE';
            const alphaCutoff = isCutoff ? (_a = materialProperties.floatProperties) === null || _a === void 0 ? void 0 : _a['_Cutoff'] : undefined;
            const textureTransformExt = this._portTextureTransform(materialProperties);
            const baseColorFactor = (_c = (_b = materialProperties.vectorProperties) === null || _b === void 0 ? void 0 : _b['_Color']) === null || _c === void 0 ? void 0 : _c.map(gammaEOTF);
            const baseColorTextureIndex = (_d = materialProperties.textureProperties) === null || _d === void 0 ? void 0 : _d['_MainTex'];
            const baseColorTexture = baseColorTextureIndex != null
                ? {
                    index: baseColorTextureIndex,
                    extensions: Object.assign({}, textureTransformExt),
                }
                : undefined;
            // use mtoon instead of unlit, since there might be VRM0.0 specific features that are not supported by gltf
            const mtoonExtension = {
                specVersion: '1.0',
                transparentWithZWrite: isTransparentZWrite,
                renderQueueOffsetNumber,
                shadeColorFactor: baseColorFactor,
                shadeMultiplyTexture: baseColorTexture,
            };
            return Object.assign(Object.assign({}, schemaMaterial), { pbrMetallicRoughness: {
                    baseColorFactor,
                    baseColorTexture,
                }, alphaMode,
                alphaCutoff, extensions: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    VRMC_materials_mtoon: mtoonExtension,
                } });
        }
        /**
         * Create a glTF `KHR_texture_transform` extension from v0 texture transform info.
         */
        _portTextureTransform(materialProperties) {
            var _a, _b, _c, _d, _e;
            const textureTransform = (_a = materialProperties.vectorProperties) === null || _a === void 0 ? void 0 : _a['_MainTex'];
            if (textureTransform == null) {
                return {};
            }
            const offset = [(_b = textureTransform === null || textureTransform === void 0 ? void 0 : textureTransform[0]) !== null && _b !== void 0 ? _b : 0.0, (_c = textureTransform === null || textureTransform === void 0 ? void 0 : textureTransform[1]) !== null && _c !== void 0 ? _c : 0.0];
            const scale = [(_d = textureTransform === null || textureTransform === void 0 ? void 0 : textureTransform[2]) !== null && _d !== void 0 ? _d : 1.0, (_e = textureTransform === null || textureTransform === void 0 ? void 0 : textureTransform[3]) !== null && _e !== void 0 ? _e : 1.0];
            offset[1] = (scale[1] * (1.0 - offset[1])) % 1.0;
            return {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                KHR_texture_transform: { offset, scale },
            };
        }
        /**
         * Convert v0 render order into v1 render order.
         * This uses a map from v0 render queue to v1 compliant render queue offset which is generated in {@link _populateRenderQueueMap}.
         */
        _v0ParseRenderQueue(materialProperties) {
            var _a, _b, _c;
            const isTransparent = (_b = (_a = materialProperties.keywordMap) === null || _a === void 0 ? void 0 : _a['_ALPHABLEND_ON']) !== null && _b !== void 0 ? _b : false;
            const enabledZWrite = ((_c = materialProperties.floatProperties) === null || _c === void 0 ? void 0 : _c['_ZWrite']) === 1;
            let offset = 0;
            if (isTransparent) {
                const v0Queue = materialProperties.renderQueue;
                if (v0Queue != null) {
                    if (enabledZWrite) {
                        offset = this._renderQueueMapTransparentZWrite.get(v0Queue);
                    }
                    else {
                        offset = this._renderQueueMapTransparent.get(v0Queue);
                    }
                }
            }
            return offset;
        }
        /**
         * Create a map which maps v0 render queue to v1 compliant render queue offset.
         * This lists up all render queues the model use and creates a map to new render queue offsets in the same order.
         */
        _populateRenderQueueMap(materialPropertiesList) {
            /**
             * A set of used render queues in Transparent materials.
             */
            const renderQueuesTransparent = new Set();
            /**
             * A set of used render queues in TransparentZWrite materials.
             */
            const renderQueuesTransparentZWrite = new Set();
            // populate the render queue set
            materialPropertiesList.forEach((materialProperties) => {
                var _a, _b, _c;
                const isTransparent = (_b = (_a = materialProperties.keywordMap) === null || _a === void 0 ? void 0 : _a['_ALPHABLEND_ON']) !== null && _b !== void 0 ? _b : false;
                const enabledZWrite = ((_c = materialProperties.floatProperties) === null || _c === void 0 ? void 0 : _c['_ZWrite']) === 1;
                if (isTransparent) {
                    const v0Queue = materialProperties.renderQueue;
                    if (v0Queue != null) {
                        if (enabledZWrite) {
                            renderQueuesTransparentZWrite.add(v0Queue);
                        }
                        else {
                            renderQueuesTransparent.add(v0Queue);
                        }
                    }
                }
            });
            // show a warning if the model uses v1 incompatible number of render queues
            if (renderQueuesTransparent.size > 10) {
                console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${renderQueuesTransparent.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`);
            }
            if (renderQueuesTransparentZWrite.size > 10) {
                console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${renderQueuesTransparentZWrite.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`);
            }
            // create a map from v0 render queue to v1 render queue offset
            Array.from(renderQueuesTransparent)
                .sort()
                .forEach((queue, i) => {
                const newQueueOffset = Math.min(Math.max(i - renderQueuesTransparent.size + 1, -9), 0);
                this._renderQueueMapTransparent.set(queue, newQueueOffset);
            });
            Array.from(renderQueuesTransparentZWrite)
                .sort()
                .forEach((queue, i) => {
                const newQueueOffset = Math.min(Math.max(i, 0), 9);
                this._renderQueueMapTransparentZWrite.set(queue, newQueueOffset);
            });
        }
    }

    exports.VRMMaterialsV0CompatPlugin = VRMMaterialsV0CompatPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    Object.assign(THREE, exports);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWUtdnJtLW1hdGVyaWFscy12MGNvbXBhdC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy91dGlscy9nYW1tYUVPVEYudHMiLCIuLi9zcmMvVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdhbW1hRU9URihlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5wb3coZSwgMi4yKTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTSBhcyBWMFZSTSwgTWF0ZXJpYWwgYXMgVjBNYXRlcmlhbCB9IGZyb20gJ0BwaXhpdi90eXBlcy12cm0tMC4wJztcbmltcG9ydCAqIGFzIFYxTVRvb25TY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbWF0ZXJpYWxzLW10b29uLTEuMCc7XG5pbXBvcnQgdHlwZSB7IEdMVEZMb2FkZXJQbHVnaW4sIEdMVEZQYXJzZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJztcbmltcG9ydCB7IGdhbW1hRU9URiB9IGZyb20gJy4vdXRpbHMvZ2FtbWFFT1RGJztcbmltcG9ydCB7IEdMVEYgYXMgR0xURlNjaGVtYSB9IGZyb20gJ0BnbHRmLXRyYW5zZm9ybS9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyByZWFkb25seSBwYXJzZXI6IEdMVEZQYXJzZXI7XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIHJlbmRlciBxdWV1ZSBvZmZzZXQsIGZvciBUcmFuc3BhcmVudCBtYXRlcmlhbHMuXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50OiBNYXA8bnVtYmVyLCBudW1iZXI+O1xuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIHYwIHJlbmRlciBxdWV1ZSB0byB2MSByZW5kZXIgcXVldWUgb2Zmc2V0LCBmb3IgVHJhbnNwYXJlbnRaV3JpdGUgbWF0ZXJpYWxzLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudFpXcml0ZTogTWFwPG51bWJlciwgbnVtYmVyPjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ1ZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luJztcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJzZXI6IEdMVEZQYXJzZXIpIHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcblxuICAgIHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnQgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fcmVuZGVyUXVldWVNYXBUcmFuc3BhcmVudFpXcml0ZSA9IG5ldyBNYXAoKTtcblxuICAgIC8vIFdPUktBUk9VTkQ6IEFkZCBLSFJfdGV4dHVyZV90cmFuc2Zvcm0gdG8gZXh0ZW5zaW9uc1VzZWRcbiAgICAvLyBJdCBpcyB0b28gbGF0ZSB0byBhZGQgdGhpcyBpbiBiZWZvcmVSb290XG4gICAgY29uc3QganNvbiA9IHRoaXMucGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGpzb24uZXh0ZW5zaW9uc1VzZWQgPSBqc29uLmV4dGVuc2lvbnNVc2VkID8/IFtdO1xuICAgIGlmIChqc29uLmV4dGVuc2lvbnNVc2VkLmluZGV4T2YoJ0tIUl90ZXh0dXJlX3RyYW5zZm9ybScpID09PSAtMSkge1xuICAgICAganNvbi5leHRlbnNpb25zVXNlZC5wdXNoKCdLSFJfdGV4dHVyZV90cmFuc2Zvcm0nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYmVmb3JlUm9vdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBqc29uID0gdGhpcy5wYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgLy8gZWFybHkgYWJvcnQgaWYgaXQgZG9lc24ndCB1c2UgVjBWUk1cbiAgICBjb25zdCB2MFZSTUV4dGVuc2lvbiA9IGpzb24uZXh0ZW5zaW9ucz8uWydWUk0nXSBhcyBWMFZSTSB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCB2ME1hdGVyaWFsUHJvcGVydGllcyA9IHYwVlJNRXh0ZW5zaW9uPy5tYXRlcmlhbFByb3BlcnRpZXM7XG4gICAgaWYgKCF2ME1hdGVyaWFsUHJvcGVydGllcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHBvcHVsYXRlIHJlbmRlciBxdWV1ZSBtYXBcbiAgICB0aGlzLl9wb3B1bGF0ZVJlbmRlclF1ZXVlTWFwKHYwTWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIC8vIGNvbnZlcnQgVjAgbWF0ZXJpYWwgcHJvcGVydGllcyBpbnRvIFYxIGNvbXBhdGlibGUgZm9ybWF0XG4gICAgdjBNYXRlcmlhbFByb3BlcnRpZXMuZm9yRWFjaCgobWF0ZXJpYWxQcm9wZXJ0aWVzLCBtYXRlcmlhbEluZGV4KSA9PiB7XG4gICAgICBjb25zdCBtYXRlcmlhbERlZiA9IGpzb24ubWF0ZXJpYWxzPy5bbWF0ZXJpYWxJbmRleF07XG5cbiAgICAgIGlmIChtYXRlcmlhbERlZiA9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1hdGVyaWFsc1ske21hdGVyaWFsSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWF0ZXJpYWwgZG9lc24ndCBleGlzdGAsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vTVRvb24nKSB7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5fcGFyc2VWME1Ub29uUHJvcGVydGllcyhtYXRlcmlhbFByb3BlcnRpZXMsIG1hdGVyaWFsRGVmKTtcbiAgICAgICAganNvbi5tYXRlcmlhbHMhW21hdGVyaWFsSW5kZXhdID0gbWF0ZXJpYWw7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXI/LnN0YXJ0c1dpdGgoJ1ZSTS9VbmxpdCcpKSB7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5fcGFyc2VWMFVubGl0UHJvcGVydGllcyhtYXRlcmlhbFByb3BlcnRpZXMsIG1hdGVyaWFsRGVmKTtcbiAgICAgICAganNvbi5tYXRlcmlhbHMhW21hdGVyaWFsSW5kZXhdID0gbWF0ZXJpYWw7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk1fVVNFX0dMVEZTSEFERVInKSB7XG4gICAgICAgIC8vIGBqc29uLm1hdGVyaWFsc1ttYXRlcmlhbEluZGV4XWAgc2hvdWxkIGJlIGFscmVhZHkgdmFsaWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzVjBDb21wYXRQbHVnaW46IFVua25vd24gc2hhZGVyOiAke21hdGVyaWFsUHJvcGVydGllcy5zaGFkZXJ9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVYwTVRvb25Qcm9wZXJ0aWVzKFxuICAgIG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCxcbiAgICBzY2hlbWFNYXRlcmlhbDogR0xURlNjaGVtYS5JTWF0ZXJpYWwsXG4gICk6IEdMVEZTY2hlbWEuSU1hdGVyaWFsIHtcbiAgICBjb25zdCBpc1RyYW5zcGFyZW50ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmtleXdvcmRNYXA/LlsnX0FMUEhBQkxFTkRfT04nXSA/PyBmYWxzZTtcbiAgICBjb25zdCBlbmFibGVkWldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfWldyaXRlJ10gPT09IDE7XG4gICAgY29uc3QgdHJhbnNwYXJlbnRXaXRoWldyaXRlID0gZW5hYmxlZFpXcml0ZSAmJiBpc1RyYW5zcGFyZW50O1xuXG4gICAgY29uc3QgcmVuZGVyUXVldWVPZmZzZXROdW1iZXIgPSB0aGlzLl92MFBhcnNlUmVuZGVyUXVldWUobWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IGlzQ3V0b2ZmID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmtleXdvcmRNYXA/LlsnX0FMUEhBVEVTVF9PTiddID8/IGZhbHNlO1xuICAgIGNvbnN0IGFscGhhTW9kZSA9IGlzVHJhbnNwYXJlbnQgPyAnQkxFTkQnIDogaXNDdXRvZmYgPyAnTUFTSycgOiAnT1BBUVVFJztcbiAgICBjb25zdCBhbHBoYUN1dG9mZiA9IGlzQ3V0b2ZmID8gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQ3V0b2ZmJ10gOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBjdWxsTW9kZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX0N1bGxNb2RlJ10gPz8gMjsgLy8gZW51bSwgeyBPZmYsIEZyb250LCBCYWNrIH1cbiAgICBjb25zdCBkb3VibGVTaWRlZCA9IGN1bGxNb2RlID09PSAwO1xuXG4gICAgY29uc3QgdGV4dHVyZVRyYW5zZm9ybUV4dCA9IHRoaXMuX3BvcnRUZXh0dXJlVHJhbnNmb3JtKG1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBiYXNlQ29sb3JGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfQ29sb3InXT8ubWFwKFxuICAgICAgKHY6IG51bWJlciwgaTogbnVtYmVyKSA9PiAoaSA9PT0gMyA/IHYgOiBnYW1tYUVPVEYodikpLCAvLyBhbHBoYSBjaGFubmVsIGlzIHN0b3JlZCBpbiBsaW5lYXJcbiAgICApO1xuICAgIGNvbnN0IGJhc2VDb2xvclRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfTWFpblRleCddO1xuICAgIGNvbnN0IGJhc2VDb2xvclRleHR1cmUgPVxuICAgICAgYmFzZUNvbG9yVGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogYmFzZUNvbG9yVGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgbm9ybWFsVGV4dHVyZVNjYWxlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQnVtcFNjYWxlJ107XG4gICAgY29uc3Qgbm9ybWFsVGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19CdW1wTWFwJ107XG4gICAgY29uc3Qgbm9ybWFsVGV4dHVyZSA9XG4gICAgICBub3JtYWxUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBub3JtYWxUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgICBzY2FsZTogbm9ybWFsVGV4dHVyZVNjYWxlLFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZW1pc3NpdmVGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfRW1pc3Npb25Db2xvciddPy5tYXAoZ2FtbWFFT1RGKTtcbiAgICBjb25zdCBlbWlzc2l2ZVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfRW1pc3Npb25NYXAnXTtcbiAgICBjb25zdCBlbWlzc2l2ZVRleHR1cmUgPVxuICAgICAgZW1pc3NpdmVUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBlbWlzc2l2ZVRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHNoYWRlQ29sb3JGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMudmVjdG9yUHJvcGVydGllcz8uWydfU2hhZGVDb2xvciddPy5tYXAoZ2FtbWFFT1RGKTtcbiAgICBjb25zdCBzaGFkZU11bHRpcGx5VGV4dHVyZUluZGV4ID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnRleHR1cmVQcm9wZXJ0aWVzPy5bJ19TaGFkZVRleHR1cmUnXTtcbiAgICBjb25zdCBzaGFkZU11bHRpcGx5VGV4dHVyZSA9XG4gICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZUluZGV4ICE9IG51bGxcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpbmRleDogc2hhZGVNdWx0aXBseVRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIC8vIGNvbnZlcnQgdjAgc2hhZGUgc2hpZnQgLyBzaGFkZSB0b29ueVxuICAgIGxldCBzaGFkaW5nU2hpZnRGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19TaGFkZVNoaWZ0J10gPz8gMC4wO1xuICAgIGxldCBzaGFkaW5nVG9vbnlGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19TaGFkZVRvb255J10gPz8gMC45O1xuICAgIHNoYWRpbmdUb29ueUZhY3RvciA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKHNoYWRpbmdUb29ueUZhY3RvciwgMS4wLCAwLjUgKyAwLjUgKiBzaGFkaW5nU2hpZnRGYWN0b3IpO1xuICAgIHNoYWRpbmdTaGlmdEZhY3RvciA9IC1zaGFkaW5nU2hpZnRGYWN0b3IgLSAoMS4wIC0gc2hhZGluZ1Rvb255RmFjdG9yKTtcblxuICAgIGNvbnN0IGdpSW50ZW5zaXR5RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfSW5kaXJlY3RMaWdodEludGVuc2l0eSddO1xuICAgIGNvbnN0IGdpRXF1YWxpemF0aW9uRmFjdG9yID0gZ2lJbnRlbnNpdHlGYWN0b3IgPyAxLjAgLSBnaUludGVuc2l0eUZhY3RvciA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG1hdGNhcFRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfU3BoZXJlQWRkJ107XG4gICAgY29uc3QgbWF0Y2FwVGV4dHVyZSA9XG4gICAgICBtYXRjYXBUZXh0dXJlSW5kZXggIT0gbnVsbFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGluZGV4OiBtYXRjYXBUZXh0dXJlSW5kZXgsXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHJpbUxpZ2h0aW5nTWl4RmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfUmltTGlnaHRpbmdNaXgnXTtcbiAgICBjb25zdCByaW1NdWx0aXBseVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfUmltVGV4dHVyZSddO1xuICAgIGNvbnN0IHJpbU11bHRpcGx5VGV4dHVyZSA9XG4gICAgICByaW1NdWx0aXBseVRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IHJpbU11bHRpcGx5VGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgcGFyYW1ldHJpY1JpbUNvbG9yRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX1JpbUNvbG9yJ10/Lm1hcChnYW1tYUVPVEYpO1xuICAgIGNvbnN0IHBhcmFtZXRyaWNSaW1GcmVzbmVsUG93ZXJGYWN0b3IgPSBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19SaW1GcmVzbmVsUG93ZXInXTtcbiAgICBjb25zdCBwYXJhbWV0cmljUmltTGlmdEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1JpbUxpZnQnXTtcblxuICAgIGNvbnN0IG91dGxpbmVXaWR0aE1vZGUgPSBbJ25vbmUnLCAnd29ybGRDb29yZGluYXRlcycsICdzY3JlZW5Db29yZGluYXRlcyddW1xuICAgICAgbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZVdpZHRoTW9kZSddID8/IDBcbiAgICBdIGFzIFYxTVRvb25TY2hlbWEuTWF0ZXJpYWxzTVRvb25PdXRsaW5lV2lkdGhNb2RlO1xuXG4gICAgLy8gLy8gdjAgb3V0bGluZVdpZHRoRmFjdG9yIGlzIGluIGNlbnRpbWV0ZXJcbiAgICBsZXQgb3V0bGluZVdpZHRoRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZVdpZHRoJ10gPz8gMC4wO1xuICAgIG91dGxpbmVXaWR0aEZhY3RvciA9IDAuMDEgKiBvdXRsaW5lV2lkdGhGYWN0b3I7XG5cbiAgICBjb25zdCBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfT3V0bGluZVdpZHRoVGV4dHVyZSddO1xuICAgIGNvbnN0IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZSA9XG4gICAgICBvdXRsaW5lV2lkdGhNdWx0aXBseVRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IG91dGxpbmVXaWR0aE11bHRpcGx5VGV4dHVyZUluZGV4LFxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xuICAgICAgICAgICAgICAuLi50ZXh0dXJlVHJhbnNmb3JtRXh0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgb3V0bGluZUNvbG9yRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX091dGxpbmVDb2xvciddPy5tYXAoZ2FtbWFFT1RGKTtcbiAgICBjb25zdCBvdXRsaW5lQ29sb3JNb2RlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfT3V0bGluZUNvbG9yTW9kZSddOyAvLyBlbnVtLCB7IEZpeGVkLCBNaXhlZCB9XG4gICAgY29uc3Qgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yID1cbiAgICAgIG91dGxpbmVDb2xvck1vZGUgPT09IDEgPyBtYXRlcmlhbFByb3BlcnRpZXMuZmxvYXRQcm9wZXJ0aWVzPy5bJ19PdXRsaW5lTGlnaHRpbmdNaXgnXSA6IDAuMDtcblxuICAgIGNvbnN0IHV2QW5pbWF0aW9uTWFza1RleHR1cmVJbmRleCA9IG1hdGVyaWFsUHJvcGVydGllcy50ZXh0dXJlUHJvcGVydGllcz8uWydfVXZBbmltTWFza1RleHR1cmUnXTtcbiAgICBjb25zdCB1dkFuaW1hdGlvbk1hc2tUZXh0dXJlID1cbiAgICAgIHV2QW5pbWF0aW9uTWFza1RleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IHV2QW5pbWF0aW9uTWFza1RleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfVXZBbmltU2Nyb2xsWCddO1xuXG4gICAgLy8gdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3Igd2lsbCBiZSBvcHBvc2l0ZSBiZXR3ZWVuIFYwIGFuZCBWMVxuICAgIGxldCB1dkFuaW1hdGlvblNjcm9sbFlTcGVlZEZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1V2QW5pbVNjcm9sbFknXTtcbiAgICBpZiAodXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgIT0gbnVsbCkge1xuICAgICAgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IgPSAtdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3I7XG4gICAgfVxuXG4gICAgY29uc3QgdXZBbmltYXRpb25Sb3RhdGlvblNwZWVkRmFjdG9yID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfVXZBbmltUm90YXRpb24nXTtcblxuICAgIGNvbnN0IG10b29uRXh0ZW5zaW9uOiBWMU1Ub29uU2NoZW1hLlZSTUNNYXRlcmlhbHNNVG9vbiA9IHtcbiAgICAgIHNwZWNWZXJzaW9uOiAnMS4wJyxcbiAgICAgIHRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICAgIHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyLFxuICAgICAgc2hhZGVDb2xvckZhY3RvcixcbiAgICAgIHNoYWRlTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgc2hhZGluZ1NoaWZ0RmFjdG9yLFxuICAgICAgc2hhZGluZ1Rvb255RmFjdG9yLFxuICAgICAgZ2lFcXVhbGl6YXRpb25GYWN0b3IsXG4gICAgICBtYXRjYXBUZXh0dXJlLFxuICAgICAgcmltTGlnaHRpbmdNaXhGYWN0b3IsXG4gICAgICByaW1NdWx0aXBseVRleHR1cmUsXG4gICAgICBwYXJhbWV0cmljUmltQ29sb3JGYWN0b3IsXG4gICAgICBwYXJhbWV0cmljUmltRnJlc25lbFBvd2VyRmFjdG9yLFxuICAgICAgcGFyYW1ldHJpY1JpbUxpZnRGYWN0b3IsXG4gICAgICBvdXRsaW5lV2lkdGhNb2RlLFxuICAgICAgb3V0bGluZVdpZHRoRmFjdG9yLFxuICAgICAgb3V0bGluZVdpZHRoTXVsdGlwbHlUZXh0dXJlLFxuICAgICAgb3V0bGluZUNvbG9yRmFjdG9yLFxuICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4RmFjdG9yLFxuICAgICAgdXZBbmltYXRpb25NYXNrVGV4dHVyZSxcbiAgICAgIHV2QW5pbWF0aW9uU2Nyb2xsWFNwZWVkRmFjdG9yLFxuICAgICAgdXZBbmltYXRpb25TY3JvbGxZU3BlZWRGYWN0b3IsXG4gICAgICB1dkFuaW1hdGlvblJvdGF0aW9uU3BlZWRGYWN0b3IsXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zY2hlbWFNYXRlcmlhbCxcblxuICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3M6IHtcbiAgICAgICAgYmFzZUNvbG9yRmFjdG9yLFxuICAgICAgICBiYXNlQ29sb3JUZXh0dXJlLFxuICAgICAgfSxcbiAgICAgIG5vcm1hbFRleHR1cmUsXG4gICAgICBlbWlzc2l2ZVRleHR1cmUsXG4gICAgICBlbWlzc2l2ZUZhY3RvcixcbiAgICAgIGFscGhhTW9kZSxcbiAgICAgIGFscGhhQ3V0b2ZmLFxuICAgICAgZG91YmxlU2lkZWQsXG4gICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgVlJNQ19tYXRlcmlhbHNfbXRvb246IG10b29uRXh0ZW5zaW9uLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VWMFVubGl0UHJvcGVydGllcyhcbiAgICBtYXRlcmlhbFByb3BlcnRpZXM6IFYwTWF0ZXJpYWwsXG4gICAgc2NoZW1hTWF0ZXJpYWw6IEdMVEZTY2hlbWEuSU1hdGVyaWFsLFxuICApOiBHTFRGU2NoZW1hLklNYXRlcmlhbCB7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZSc7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudCA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudCcgfHwgaXNUcmFuc3BhcmVudFpXcml0ZTtcblxuICAgIGNvbnN0IHJlbmRlclF1ZXVlT2Zmc2V0TnVtYmVyID0gdGhpcy5fdjBQYXJzZVJlbmRlclF1ZXVlKG1hdGVyaWFsUHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBpc0N1dG9mZiA9IG1hdGVyaWFsUHJvcGVydGllcy5zaGFkZXIgPT09ICdWUk0vVW5saXRDdXRvdXQnO1xuICAgIGNvbnN0IGFscGhhTW9kZSA9IGlzVHJhbnNwYXJlbnQgPyAnQkxFTkQnIDogaXNDdXRvZmYgPyAnTUFTSycgOiAnT1BBUVVFJztcbiAgICBjb25zdCBhbHBoYUN1dG9mZiA9IGlzQ3V0b2ZmID8gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfQ3V0b2ZmJ10gOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCB0ZXh0dXJlVHJhbnNmb3JtRXh0ID0gdGhpcy5fcG9ydFRleHR1cmVUcmFuc2Zvcm0obWF0ZXJpYWxQcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IGJhc2VDb2xvckZhY3RvciA9IG1hdGVyaWFsUHJvcGVydGllcy52ZWN0b3JQcm9wZXJ0aWVzPy5bJ19Db2xvciddPy5tYXAoZ2FtbWFFT1RGKTtcbiAgICBjb25zdCBiYXNlQ29sb3JUZXh0dXJlSW5kZXggPSBtYXRlcmlhbFByb3BlcnRpZXMudGV4dHVyZVByb3BlcnRpZXM/LlsnX01haW5UZXgnXTtcbiAgICBjb25zdCBiYXNlQ29sb3JUZXh0dXJlID1cbiAgICAgIGJhc2VDb2xvclRleHR1cmVJbmRleCAhPSBudWxsXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaW5kZXg6IGJhc2VDb2xvclRleHR1cmVJbmRleCxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgLi4udGV4dHVyZVRyYW5zZm9ybUV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIHVzZSBtdG9vbiBpbnN0ZWFkIG9mIHVubGl0LCBzaW5jZSB0aGVyZSBtaWdodCBiZSBWUk0wLjAgc3BlY2lmaWMgZmVhdHVyZXMgdGhhdCBhcmUgbm90IHN1cHBvcnRlZCBieSBnbHRmXG4gICAgY29uc3QgbXRvb25FeHRlbnNpb246IFYxTVRvb25TY2hlbWEuVlJNQ01hdGVyaWFsc01Ub29uID0ge1xuICAgICAgc3BlY1ZlcnNpb246ICcxLjAnLFxuICAgICAgdHJhbnNwYXJlbnRXaXRoWldyaXRlOiBpc1RyYW5zcGFyZW50WldyaXRlLFxuICAgICAgcmVuZGVyUXVldWVPZmZzZXROdW1iZXIsXG4gICAgICBzaGFkZUNvbG9yRmFjdG9yOiBiYXNlQ29sb3JGYWN0b3IsXG4gICAgICBzaGFkZU11bHRpcGx5VGV4dHVyZTogYmFzZUNvbG9yVGV4dHVyZSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNjaGVtYU1hdGVyaWFsLFxuXG4gICAgICBwYnJNZXRhbGxpY1JvdWdobmVzczoge1xuICAgICAgICBiYXNlQ29sb3JGYWN0b3IsXG4gICAgICAgIGJhc2VDb2xvclRleHR1cmUsXG4gICAgICB9LFxuICAgICAgYWxwaGFNb2RlLFxuICAgICAgYWxwaGFDdXRvZmYsXG4gICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgVlJNQ19tYXRlcmlhbHNfbXRvb246IG10b29uRXh0ZW5zaW9uLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGdsVEYgYEtIUl90ZXh0dXJlX3RyYW5zZm9ybWAgZXh0ZW5zaW9uIGZyb20gdjAgdGV4dHVyZSB0cmFuc2Zvcm0gaW5mby5cbiAgICovXG4gIHByaXZhdGUgX3BvcnRUZXh0dXJlVHJhbnNmb3JtKG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCk6IHsgW25hbWU6IHN0cmluZ106IGFueSB9IHtcbiAgICBjb25zdCB0ZXh0dXJlVHJhbnNmb3JtID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLnZlY3RvclByb3BlcnRpZXM/LlsnX01haW5UZXgnXTtcbiAgICBpZiAodGV4dHVyZVRyYW5zZm9ybSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29uc3Qgb2Zmc2V0ID0gW3RleHR1cmVUcmFuc2Zvcm0/LlswXSA/PyAwLjAsIHRleHR1cmVUcmFuc2Zvcm0/LlsxXSA/PyAwLjBdO1xuICAgIGNvbnN0IHNjYWxlID0gW3RleHR1cmVUcmFuc2Zvcm0/LlsyXSA/PyAxLjAsIHRleHR1cmVUcmFuc2Zvcm0/LlszXSA/PyAxLjBdO1xuXG4gICAgb2Zmc2V0WzFdID0gKHNjYWxlWzFdICogKDEuMCAtIG9mZnNldFsxXSkpICUgMS4wO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgIEtIUl90ZXh0dXJlX3RyYW5zZm9ybTogeyBvZmZzZXQsIHNjYWxlIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHYwIHJlbmRlciBvcmRlciBpbnRvIHYxIHJlbmRlciBvcmRlci5cbiAgICogVGhpcyB1c2VzIGEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIGNvbXBsaWFudCByZW5kZXIgcXVldWUgb2Zmc2V0IHdoaWNoIGlzIGdlbmVyYXRlZCBpbiB7QGxpbmsgX3BvcHVsYXRlUmVuZGVyUXVldWVNYXB9LlxuICAgKi9cbiAgcHJpdmF0ZSBfdjBQYXJzZVJlbmRlclF1ZXVlKG1hdGVyaWFsUHJvcGVydGllczogVjBNYXRlcmlhbCk6IG51bWJlciB7XG4gICAgY29uc3QgaXNUcmFuc3BhcmVudCA9IG1hdGVyaWFsUHJvcGVydGllcy5rZXl3b3JkTWFwPy5bJ19BTFBIQUJMRU5EX09OJ10gPz8gZmFsc2U7XG4gICAgY29uc3QgZW5hYmxlZFpXcml0ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5mbG9hdFByb3BlcnRpZXM/LlsnX1pXcml0ZSddID09PSAxO1xuXG4gICAgbGV0IG9mZnNldCA9IDA7XG5cbiAgICBpZiAoaXNUcmFuc3BhcmVudCkge1xuICAgICAgY29uc3QgdjBRdWV1ZSA9IG1hdGVyaWFsUHJvcGVydGllcy5yZW5kZXJRdWV1ZTtcblxuICAgICAgaWYgKHYwUXVldWUgIT0gbnVsbCkge1xuICAgICAgICBpZiAoZW5hYmxlZFpXcml0ZSkge1xuICAgICAgICAgIG9mZnNldCA9IHRoaXMuX3JlbmRlclF1ZXVlTWFwVHJhbnNwYXJlbnRaV3JpdGUuZ2V0KHYwUXVldWUpITtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQgPSB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50LmdldCh2MFF1ZXVlKSE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hcCB3aGljaCBtYXBzIHYwIHJlbmRlciBxdWV1ZSB0byB2MSBjb21wbGlhbnQgcmVuZGVyIHF1ZXVlIG9mZnNldC5cbiAgICogVGhpcyBsaXN0cyB1cCBhbGwgcmVuZGVyIHF1ZXVlcyB0aGUgbW9kZWwgdXNlIGFuZCBjcmVhdGVzIGEgbWFwIHRvIG5ldyByZW5kZXIgcXVldWUgb2Zmc2V0cyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICovXG4gIHByaXZhdGUgX3BvcHVsYXRlUmVuZGVyUXVldWVNYXAobWF0ZXJpYWxQcm9wZXJ0aWVzTGlzdDogVjBNYXRlcmlhbFtdKSB7XG4gICAgLyoqXG4gICAgICogQSBzZXQgb2YgdXNlZCByZW5kZXIgcXVldWVzIGluIFRyYW5zcGFyZW50IG1hdGVyaWFscy5cbiAgICAgKi9cbiAgICBjb25zdCByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuXG4gICAgLyoqXG4gICAgICogQSBzZXQgb2YgdXNlZCByZW5kZXIgcXVldWVzIGluIFRyYW5zcGFyZW50WldyaXRlIG1hdGVyaWFscy5cbiAgICAgKi9cbiAgICBjb25zdCByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZSA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuXG4gICAgLy8gcG9wdWxhdGUgdGhlIHJlbmRlciBxdWV1ZSBzZXRcbiAgICBtYXRlcmlhbFByb3BlcnRpZXNMaXN0LmZvckVhY2goKG1hdGVyaWFsUHJvcGVydGllcykgPT4ge1xuICAgICAgY29uc3QgaXNUcmFuc3BhcmVudCA9IG1hdGVyaWFsUHJvcGVydGllcy5rZXl3b3JkTWFwPy5bJ19BTFBIQUJMRU5EX09OJ10gPz8gZmFsc2U7XG4gICAgICBjb25zdCBlbmFibGVkWldyaXRlID0gbWF0ZXJpYWxQcm9wZXJ0aWVzLmZsb2F0UHJvcGVydGllcz8uWydfWldyaXRlJ10gPT09IDE7XG5cbiAgICAgIGlmIChpc1RyYW5zcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IHYwUXVldWUgPSBtYXRlcmlhbFByb3BlcnRpZXMucmVuZGVyUXVldWU7XG5cbiAgICAgICAgaWYgKHYwUXVldWUgIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChlbmFibGVkWldyaXRlKSB7XG4gICAgICAgICAgICByZW5kZXJRdWV1ZXNUcmFuc3BhcmVudFpXcml0ZS5hZGQodjBRdWV1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50LmFkZCh2MFF1ZXVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHNob3cgYSB3YXJuaW5nIGlmIHRoZSBtb2RlbCB1c2VzIHYxIGluY29tcGF0aWJsZSBudW1iZXIgb2YgcmVuZGVyIHF1ZXVlc1xuICAgIGlmIChyZW5kZXJRdWV1ZXNUcmFuc3BhcmVudC5zaXplID4gMTApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1hdGVyaWFsc1YwQ29tcGF0UGx1Z2luOiBUaGlzIFZSTSB1c2VzICR7cmVuZGVyUXVldWVzVHJhbnNwYXJlbnQuc2l6ZX0gcmVuZGVyIHF1ZXVlcyBmb3IgVHJhbnNwYXJlbnQgbWF0ZXJpYWxzIHdoaWxlIFZSTSAxLjAgb25seSBzdXBwb3J0cyB1cCB0byAxMCByZW5kZXIgcXVldWVzLiBUaGUgbW9kZWwgbWlnaHQgbm90IGJlIHJlbmRlcmVkIGNvcnJlY3RseS5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocmVuZGVyUXVldWVzVHJhbnNwYXJlbnRaV3JpdGUuc2l6ZSA+IDEwKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NYXRlcmlhbHNWMENvbXBhdFBsdWdpbjogVGhpcyBWUk0gdXNlcyAke3JlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlLnNpemV9IHJlbmRlciBxdWV1ZXMgZm9yIFRyYW5zcGFyZW50WldyaXRlIG1hdGVyaWFscyB3aGlsZSBWUk0gMS4wIG9ubHkgc3VwcG9ydHMgdXAgdG8gMTAgcmVuZGVyIHF1ZXVlcy4gVGhlIG1vZGVsIG1pZ2h0IG5vdCBiZSByZW5kZXJlZCBjb3JyZWN0bHkuYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgbWFwIGZyb20gdjAgcmVuZGVyIHF1ZXVlIHRvIHYxIHJlbmRlciBxdWV1ZSBvZmZzZXRcbiAgICBBcnJheS5mcm9tKHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50KVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZvckVhY2goKHF1ZXVlLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1F1ZXVlT2Zmc2V0ID0gTWF0aC5taW4oTWF0aC5tYXgoaSAtIHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50LnNpemUgKyAxLCAtOSksIDApO1xuICAgICAgICB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50LnNldChxdWV1ZSwgbmV3UXVldWVPZmZzZXQpO1xuICAgICAgfSk7XG5cbiAgICBBcnJheS5mcm9tKHJlbmRlclF1ZXVlc1RyYW5zcGFyZW50WldyaXRlKVxuICAgICAgLnNvcnQoKVxuICAgICAgLmZvckVhY2goKHF1ZXVlLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1F1ZXVlT2Zmc2V0ID0gTWF0aC5taW4oTWF0aC5tYXgoaSwgMCksIDkpO1xuICAgICAgICB0aGlzLl9yZW5kZXJRdWV1ZU1hcFRyYW5zcGFyZW50WldyaXRlLnNldChxdWV1ZSwgbmV3UXVldWVPZmZzZXQpO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJUSFJFRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUE7SUFDQTtBQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtBQXVEQTtJQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtJQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFP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
