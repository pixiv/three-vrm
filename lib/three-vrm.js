/*!
 * @pixiv/three-vrm v0.5.1-monorepo-attempt1
 * Use VRM on Three.js
 * 
 * Copyright (c) 2019 pixiv Inc.
 * @pixiv/three-vrm is distributed under the MIT License
 * https://github.com/pixiv/three-vrm/blob/master/LICENSE
 */
var __three_vrm__ =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assign.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assign.ts":
/*!***********************!*\
  !*** ./src/assign.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var __three_vrm__ = __webpack_require__(/*! . */ "./src/index.ts");
Object.assign(THREE, __three_vrm__);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./vrm/ */ "./src/vrm/index.ts"), exports);


/***/ }),

/***/ "./src/vrm/VRM.ts":
/*!************************!*\
  !*** ./src/vrm/VRM.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRM = void 0;
var disposer_1 = __webpack_require__(/*! ./utils/disposer */ "./src/vrm/utils/disposer.ts");
var VRMImporter_1 = __webpack_require__(/*! ./VRMImporter */ "./src/vrm/VRMImporter.ts");
var VRM = (function () {
    function VRM(params) {
        this.scene = params.scene;
        this.humanoid = params.humanoid;
        this.blendShapeProxy = params.blendShapeProxy;
        this.firstPerson = params.firstPerson;
        this.lookAt = params.lookAt;
        this.materials = params.materials;
        this.springBoneManager = params.springBoneManager;
        this.meta = params.meta;
    }
    VRM.from = function (gltf, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var importer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        importer = new VRMImporter_1.VRMImporter(options);
                        return [4, importer.import(gltf)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    VRM.prototype.update = function (delta) {
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
            this.materials.forEach(function (material) {
                if (material.updateVRMMaterials) {
                    material.updateVRMMaterials(delta);
                }
            });
        }
    };
    VRM.prototype.dispose = function () {
        var _a, _b;
        var scene = this.scene;
        if (scene) {
            disposer_1.deepDispose(scene);
        }
        (_b = (_a = this.meta) === null || _a === void 0 ? void 0 : _a.texture) === null || _b === void 0 ? void 0 : _b.dispose();
    };
    return VRM;
}());
exports.VRM = VRM;


/***/ }),

/***/ "./src/vrm/VRMImporter.ts":
/*!********************************!*\
  !*** ./src/vrm/VRMImporter.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMImporter = void 0;
var blendshape_1 = __webpack_require__(/*! ./blendshape */ "./src/vrm/blendshape/index.ts");
var firstperson_1 = __webpack_require__(/*! ./firstperson */ "./src/vrm/firstperson/index.ts");
var VRMHumanoidImporter_1 = __webpack_require__(/*! ./humanoid/VRMHumanoidImporter */ "./src/vrm/humanoid/VRMHumanoidImporter.ts");
var VRMLookAtImporter_1 = __webpack_require__(/*! ./lookat/VRMLookAtImporter */ "./src/vrm/lookat/VRMLookAtImporter.ts");
var material_1 = __webpack_require__(/*! ./material */ "./src/vrm/material/index.ts");
var VRMMetaImporter_1 = __webpack_require__(/*! ./meta/VRMMetaImporter */ "./src/vrm/meta/VRMMetaImporter.ts");
var VRMSpringBoneImporter_1 = __webpack_require__(/*! ./springbone/VRMSpringBoneImporter */ "./src/vrm/springbone/VRMSpringBoneImporter.ts");
var VRM_1 = __webpack_require__(/*! ./VRM */ "./src/vrm/VRM.ts");
var VRMImporter = (function () {
    function VRMImporter(options) {
        if (options === void 0) { options = {}; }
        this._metaImporter = options.metaImporter || new VRMMetaImporter_1.VRMMetaImporter();
        this._blendShapeImporter = options.blendShapeImporter || new blendshape_1.VRMBlendShapeImporter();
        this._lookAtImporter = options.lookAtImporter || new VRMLookAtImporter_1.VRMLookAtImporter();
        this._humanoidImporter = options.humanoidImporter || new VRMHumanoidImporter_1.VRMHumanoidImporter();
        this._firstPersonImporter = options.firstPersonImporter || new firstperson_1.VRMFirstPersonImporter();
        this._materialImporter = options.materialImporter || new material_1.VRMMaterialImporter();
        this._springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporter_1.VRMSpringBoneImporter();
    }
    VRMImporter.prototype.import = function (gltf) {
        return __awaiter(this, void 0, Promise, function () {
            var scene, meta, materials, humanoid, firstPerson, _a, blendShapeProxy, lookAt, _b, springBoneManager;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
                            throw new Error('Could not find VRM extension on the GLTF');
                        }
                        scene = gltf.scene;
                        scene.updateMatrixWorld(false);
                        scene.traverse(function (object3d) {
                            if (object3d.isMesh) {
                                object3d.frustumCulled = false;
                            }
                        });
                        return [4, this._metaImporter.import(gltf)];
                    case 1:
                        meta = (_c.sent()) || undefined;
                        return [4, this._materialImporter.convertGLTFMaterials(gltf)];
                    case 2:
                        materials = (_c.sent()) || undefined;
                        return [4, this._humanoidImporter.import(gltf)];
                    case 3:
                        humanoid = (_c.sent()) || undefined;
                        if (!humanoid) return [3, 5];
                        return [4, this._firstPersonImporter.import(gltf, humanoid)];
                    case 4:
                        _a = (_c.sent()) || undefined;
                        return [3, 6];
                    case 5:
                        _a = undefined;
                        _c.label = 6;
                    case 6:
                        firstPerson = _a;
                        return [4, this._blendShapeImporter.import(gltf)];
                    case 7:
                        blendShapeProxy = (_c.sent()) || undefined;
                        if (!(firstPerson && blendShapeProxy && humanoid)) return [3, 9];
                        return [4, this._lookAtImporter.import(gltf, firstPerson, blendShapeProxy, humanoid)];
                    case 8:
                        _b = (_c.sent()) || undefined;
                        return [3, 10];
                    case 9:
                        _b = undefined;
                        _c.label = 10;
                    case 10:
                        lookAt = _b;
                        return [4, this._springBoneImporter.import(gltf)];
                    case 11:
                        springBoneManager = (_c.sent()) || undefined;
                        return [2, new VRM_1.VRM({
                                scene: gltf.scene,
                                meta: meta,
                                materials: materials,
                                humanoid: humanoid,
                                firstPerson: firstPerson,
                                blendShapeProxy: blendShapeProxy,
                                lookAt: lookAt,
                                springBoneManager: springBoneManager,
                            })];
                }
            });
        });
    };
    return VRMImporter;
}());
exports.VRMImporter = VRMImporter;


/***/ }),

/***/ "./src/vrm/VRMUtils/extractThumbnailBlob.ts":
/*!**************************************************!*\
  !*** ./src/vrm/VRMUtils/extractThumbnailBlob.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.extractThumbnailBlob = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var _v2A = new THREE.Vector2();
var _camera = new THREE.OrthographicCamera(-1, 1, -1, 1, -1, 1);
var _plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
var _scene = new THREE.Scene();
_scene.add(_plane);
function extractThumbnailBlob(renderer, vrm, size) {
    var _a;
    if (size === void 0) { size = 512; }
    var texture = (_a = vrm.meta) === null || _a === void 0 ? void 0 : _a.texture;
    if (!texture) {
        throw new Error('extractThumbnailBlob: This VRM does not have a thumbnail');
    }
    var canvas = renderer.getContext().canvas;
    renderer.getSize(_v2A);
    var prevWidth = _v2A.x;
    var prevHeight = _v2A.y;
    renderer.setSize(size, size, false);
    _plane.material.map = texture;
    renderer.render(_scene, _camera);
    _plane.material.map = null;
    if (canvas instanceof OffscreenCanvas) {
        return canvas.convertToBlob().finally(function () {
            renderer.setSize(prevWidth, prevHeight, false);
        });
    }
    return new Promise(function (resolve, reject) {
        canvas.toBlob(function (blob) {
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
exports.extractThumbnailBlob = extractThumbnailBlob;


/***/ }),

/***/ "./src/vrm/VRMUtils/index.ts":
/*!***********************************!*\
  !*** ./src/vrm/VRMUtils/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMUtils = void 0;
var extractThumbnailBlob_1 = __webpack_require__(/*! ./extractThumbnailBlob */ "./src/vrm/VRMUtils/extractThumbnailBlob.ts");
var removeUnnecessaryJoints_1 = __webpack_require__(/*! ./removeUnnecessaryJoints */ "./src/vrm/VRMUtils/removeUnnecessaryJoints.ts");
var VRMUtils = (function () {
    function VRMUtils() {
    }
    VRMUtils.extractThumbnailBlob = extractThumbnailBlob_1.extractThumbnailBlob;
    VRMUtils.removeUnnecessaryJoints = removeUnnecessaryJoints_1.removeUnnecessaryJoints;
    return VRMUtils;
}());
exports.VRMUtils = VRMUtils;


/***/ }),

/***/ "./src/vrm/VRMUtils/removeUnnecessaryJoints.ts":
/*!*****************************************************!*\
  !*** ./src/vrm/VRMUtils/removeUnnecessaryJoints.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUnnecessaryJoints = void 0;
var THREE = __webpack_require__(/*! three */ "three");
function removeUnnecessaryJoints(root) {
    var skeletonList = new Map();
    root.traverse(function (obj) {
        if (obj.type !== 'SkinnedMesh') {
            return;
        }
        var mesh = obj;
        var geometry = mesh.geometry;
        var attribute = geometry.getAttribute('skinIndex');
        var skeleton = skeletonList.get(attribute);
        if (!skeleton) {
            var bones = [];
            var boneInverses = [];
            var boneIndexMap = {};
            var array = attribute.array;
            for (var i = 0; i < array.length; i++) {
                var index = array[i];
                if (boneIndexMap[index] === undefined) {
                    boneIndexMap[index] = bones.length;
                    bones.push(mesh.skeleton.bones[index]);
                    boneInverses.push(mesh.skeleton.boneInverses[index]);
                }
                array[i] = boneIndexMap[index];
            }
            attribute.copyArray(array);
            attribute.needsUpdate = true;
            skeleton = new THREE.Skeleton(bones, boneInverses);
            skeletonList.set(attribute, skeleton);
        }
        mesh.bind(skeleton, new THREE.Matrix4());
    });
}
exports.removeUnnecessaryJoints = removeUnnecessaryJoints;


/***/ }),

/***/ "./src/vrm/blendshape/VRMBlendShapeGroup.ts":
/*!**************************************************!*\
  !*** ./src/vrm/blendshape/VRMBlendShapeGroup.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMBlendShapeGroup = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var VRMBlendShapeMaterialValueType;
(function (VRMBlendShapeMaterialValueType) {
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["NUMBER"] = 0] = "NUMBER";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["VECTOR2"] = 1] = "VECTOR2";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["VECTOR3"] = 2] = "VECTOR3";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["VECTOR4"] = 3] = "VECTOR4";
    VRMBlendShapeMaterialValueType[VRMBlendShapeMaterialValueType["COLOR"] = 4] = "COLOR";
})(VRMBlendShapeMaterialValueType || (VRMBlendShapeMaterialValueType = {}));
var _v2 = new THREE.Vector2();
var _v3 = new THREE.Vector3();
var _v4 = new THREE.Vector4();
var _color = new THREE.Color();
var VRMBlendShapeGroup = (function (_super) {
    __extends(VRMBlendShapeGroup, _super);
    function VRMBlendShapeGroup(expressionName) {
        var _this = _super.call(this) || this;
        _this.weight = 0.0;
        _this.isBinary = false;
        _this._binds = [];
        _this._materialValues = [];
        _this.name = "BlendShapeController_" + expressionName;
        _this.type = 'BlendShapeController';
        _this.visible = false;
        return _this;
    }
    VRMBlendShapeGroup.prototype.addBind = function (args) {
        var weight = args.weight / 100;
        this._binds.push({
            meshes: args.meshes,
            morphTargetIndex: args.morphTargetIndex,
            weight: weight,
        });
    };
    VRMBlendShapeGroup.prototype.addMaterialValue = function (args) {
        var material = args.material;
        var propertyName = args.propertyName;
        var value = material[propertyName];
        if (!value) {
            return;
        }
        value = args.defaultValue || value;
        var type;
        var defaultValue;
        var targetValue;
        var deltaValue;
        if (value.isVector2) {
            type = VRMBlendShapeMaterialValueType.VECTOR2;
            defaultValue = value.clone();
            targetValue = new THREE.Vector2().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isVector3) {
            type = VRMBlendShapeMaterialValueType.VECTOR3;
            defaultValue = value.clone();
            targetValue = new THREE.Vector3().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isVector4) {
            type = VRMBlendShapeMaterialValueType.VECTOR4;
            defaultValue = value.clone();
            targetValue = new THREE.Vector4().fromArray([
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
            targetValue = new THREE.Color().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else {
            type = VRMBlendShapeMaterialValueType.NUMBER;
            defaultValue = value;
            targetValue = args.targetValue[0];
            deltaValue = targetValue - defaultValue;
        }
        this._materialValues.push({
            material: material,
            propertyName: propertyName,
            defaultValue: defaultValue,
            targetValue: targetValue,
            deltaValue: deltaValue,
            type: type,
        });
    };
    VRMBlendShapeGroup.prototype.applyWeight = function () {
        var w = this.isBinary ? (this.weight < 0.5 ? 0.0 : 1.0) : this.weight;
        this._binds.forEach(function (bind) {
            bind.meshes.forEach(function (mesh) {
                if (!mesh.morphTargetInfluences) {
                    return;
                }
                mesh.morphTargetInfluences[bind.morphTargetIndex] += w * bind.weight;
            });
        });
        this._materialValues.forEach(function (materialValue) {
            var prop = materialValue.material[materialValue.propertyName];
            if (prop === undefined) {
                return;
            }
            if (materialValue.type === VRMBlendShapeMaterialValueType.NUMBER) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName] += deltaValue * w;
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR2) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v2.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR3) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v3.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR4) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v4.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.COLOR) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_color.copy(deltaValue).multiplyScalar(w));
            }
            if (typeof materialValue.material.shouldApplyUniforms === 'boolean') {
                materialValue.material.shouldApplyUniforms = true;
            }
        });
    };
    VRMBlendShapeGroup.prototype.clearAppliedWeight = function () {
        this._binds.forEach(function (bind) {
            bind.meshes.forEach(function (mesh) {
                if (!mesh.morphTargetInfluences) {
                    return;
                }
                mesh.morphTargetInfluences[bind.morphTargetIndex] = 0.0;
            });
        });
        this._materialValues.forEach(function (materialValue) {
            var prop = materialValue.material[materialValue.propertyName];
            if (prop === undefined) {
                return;
            }
            if (materialValue.type === VRMBlendShapeMaterialValueType.NUMBER) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName] = defaultValue;
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR2) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR3) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR4) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === VRMBlendShapeMaterialValueType.COLOR) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            if (typeof materialValue.material.shouldApplyUniforms === 'boolean') {
                materialValue.material.shouldApplyUniforms = true;
            }
        });
    };
    return VRMBlendShapeGroup;
}(THREE.Object3D));
exports.VRMBlendShapeGroup = VRMBlendShapeGroup;


/***/ }),

/***/ "./src/vrm/blendshape/VRMBlendShapeImporter.ts":
/*!*****************************************************!*\
  !*** ./src/vrm/blendshape/VRMBlendShapeImporter.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMBlendShapeImporter = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var renameMaterialProperty_1 = __webpack_require__(/*! ../utils/renameMaterialProperty */ "./src/vrm/utils/renameMaterialProperty.ts");
var VRMBlendShapeGroup_1 = __webpack_require__(/*! ./VRMBlendShapeGroup */ "./src/vrm/blendshape/VRMBlendShapeGroup.ts");
var VRMBlendShapeProxy_1 = __webpack_require__(/*! ./VRMBlendShapeProxy */ "./src/vrm/blendshape/VRMBlendShapeProxy.ts");
var VRMBlendShapeImporter = (function () {
    function VRMBlendShapeImporter() {
    }
    VRMBlendShapeImporter.prototype.import = function (gltf) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, schemaBlendShape, blendShape, blendShapeGroups, blendShapePresetMap;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt) {
                            return [2, null];
                        }
                        schemaBlendShape = vrmExt.blendShapeMaster;
                        if (!schemaBlendShape) {
                            return [2, null];
                        }
                        blendShape = new VRMBlendShapeProxy_1.VRMBlendShapeProxy();
                        blendShapeGroups = schemaBlendShape.blendShapeGroups;
                        if (!blendShapeGroups) {
                            return [2, blendShape];
                        }
                        blendShapePresetMap = {};
                        return [4, Promise.all(blendShapeGroups.map(function (schemaGroup) { return __awaiter(_this, void 0, void 0, function () {
                                var name, presetName, group, materialValues;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    name = schemaGroup.name;
                                    if (name === undefined) {
                                        console.warn('VRMBlendShapeImporter: One of blendShapeGroups has no name');
                                        return [2];
                                    }
                                    if (schemaGroup.presetName &&
                                        schemaGroup.presetName !== types_1.VRMSchema.BlendShapePresetName.Unknown &&
                                        !blendShapePresetMap[schemaGroup.presetName]) {
                                        presetName = schemaGroup.presetName;
                                        blendShapePresetMap[schemaGroup.presetName] = name;
                                    }
                                    group = new VRMBlendShapeGroup_1.VRMBlendShapeGroup(name);
                                    gltf.scene.add(group);
                                    group.isBinary = schemaGroup.isBinary || false;
                                    if (schemaGroup.binds) {
                                        schemaGroup.binds.forEach(function (bind) { return __awaiter(_this, void 0, void 0, function () {
                                            var morphMeshes, primitives, morphTargetIndex;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (bind.mesh === undefined || bind.index === undefined) {
                                                            return [2];
                                                        }
                                                        return [4, gltf.parser.getDependency('mesh', bind.mesh)];
                                                    case 1:
                                                        morphMeshes = _a.sent();
                                                        primitives = morphMeshes.type === 'Group'
                                                            ? morphMeshes.children
                                                            : [morphMeshes];
                                                        morphTargetIndex = bind.index;
                                                        if (!primitives.every(function (primitive) {
                                                            return Array.isArray(primitive.morphTargetInfluences) &&
                                                                morphTargetIndex < primitive.morphTargetInfluences.length;
                                                        })) {
                                                            console.warn("VRMBlendShapeImporter: " + schemaGroup.name + " attempts to index " + morphTargetIndex + "th morph but not found.");
                                                            return [2];
                                                        }
                                                        group.addBind({
                                                            meshes: primitives,
                                                            morphTargetIndex: morphTargetIndex,
                                                            weight: bind.weight || 100,
                                                        });
                                                        return [2];
                                                }
                                            });
                                        }); });
                                    }
                                    materialValues = schemaGroup.materialValues;
                                    if (materialValues) {
                                        materialValues.forEach(function (materialValue) {
                                            if (materialValue.materialName === undefined ||
                                                materialValue.propertyName === undefined ||
                                                materialValue.targetValue === undefined) {
                                                return;
                                            }
                                            var materials = [];
                                            gltf.scene.traverse(function (object) {
                                                if (object.material) {
                                                    var material = object.material;
                                                    if (Array.isArray(material)) {
                                                        materials.push.apply(materials, material.filter(function (mtl) { return mtl.name === materialValue.materialName && materials.indexOf(mtl) === -1; }));
                                                    }
                                                    else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                                                        materials.push(material);
                                                    }
                                                }
                                            });
                                            materials.forEach(function (material) {
                                                group.addMaterialValue({
                                                    material: material,
                                                    propertyName: renameMaterialProperty_1.renameMaterialProperty(materialValue.propertyName),
                                                    targetValue: materialValue.targetValue,
                                                });
                                            });
                                        });
                                    }
                                    blendShape.registerBlendShapeGroup(name, presetName, group);
                                    return [2];
                                });
                            }); }))];
                    case 1:
                        _b.sent();
                        return [2, blendShape];
                }
            });
        });
    };
    return VRMBlendShapeImporter;
}());
exports.VRMBlendShapeImporter = VRMBlendShapeImporter;


/***/ }),

/***/ "./src/vrm/blendshape/VRMBlendShapeProxy.ts":
/*!**************************************************!*\
  !*** ./src/vrm/blendshape/VRMBlendShapeProxy.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMBlendShapeProxy = void 0;
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
var VRMBlendShapeProxy = (function () {
    function VRMBlendShapeProxy() {
        this._blendShapeGroups = {};
        this._blendShapePresetMap = {};
        this._unknownGroupNames = [];
    }
    Object.defineProperty(VRMBlendShapeProxy.prototype, "expressions", {
        get: function () {
            return Object.keys(this._blendShapeGroups);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VRMBlendShapeProxy.prototype, "blendShapePresetMap", {
        get: function () {
            return this._blendShapePresetMap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VRMBlendShapeProxy.prototype, "unknownGroupNames", {
        get: function () {
            return this._unknownGroupNames;
        },
        enumerable: false,
        configurable: true
    });
    VRMBlendShapeProxy.prototype.getBlendShapeGroup = function (name) {
        var presetName = this._blendShapePresetMap[name];
        var controller = presetName ? this._blendShapeGroups[presetName] : this._blendShapeGroups[name];
        if (!controller) {
            console.warn("no blend shape found by " + name);
            return undefined;
        }
        return controller;
    };
    VRMBlendShapeProxy.prototype.registerBlendShapeGroup = function (name, presetName, controller) {
        this._blendShapeGroups[name] = controller;
        if (presetName) {
            this._blendShapePresetMap[presetName] = name;
        }
        else {
            this._unknownGroupNames.push(name);
        }
    };
    VRMBlendShapeProxy.prototype.getValue = function (name) {
        var _a;
        var controller = this.getBlendShapeGroup(name);
        return (_a = controller === null || controller === void 0 ? void 0 : controller.weight) !== null && _a !== void 0 ? _a : null;
    };
    VRMBlendShapeProxy.prototype.setValue = function (name, weight) {
        var controller = this.getBlendShapeGroup(name);
        if (controller) {
            controller.weight = math_1.saturate(weight);
        }
    };
    VRMBlendShapeProxy.prototype.getBlendShapeTrackName = function (name) {
        var controller = this.getBlendShapeGroup(name);
        return controller ? controller.name + ".weight" : null;
    };
    VRMBlendShapeProxy.prototype.update = function () {
        var _this = this;
        Object.keys(this._blendShapeGroups).forEach(function (name) {
            var controller = _this._blendShapeGroups[name];
            controller.clearAppliedWeight();
        });
        Object.keys(this._blendShapeGroups).forEach(function (name) {
            var controller = _this._blendShapeGroups[name];
            controller.applyWeight();
        });
    };
    return VRMBlendShapeProxy;
}());
exports.VRMBlendShapeProxy = VRMBlendShapeProxy;


/***/ }),

/***/ "./src/vrm/blendshape/index.ts":
/*!*************************************!*\
  !*** ./src/vrm/blendshape/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRMBlendShapeGroup */ "./src/vrm/blendshape/VRMBlendShapeGroup.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMBlendShapeImporter */ "./src/vrm/blendshape/VRMBlendShapeImporter.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMBlendShapeProxy */ "./src/vrm/blendshape/VRMBlendShapeProxy.ts"), exports);


/***/ }),

/***/ "./src/vrm/debug/VRMDebug.ts":
/*!***********************************!*\
  !*** ./src/vrm/debug/VRMDebug.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMDebug = exports.VRM_GIZMO_RENDER_ORDER = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var VRM_1 = __webpack_require__(/*! ../VRM */ "./src/vrm/VRM.ts");
var VRMImporterDebug_1 = __webpack_require__(/*! ./VRMImporterDebug */ "./src/vrm/debug/VRMImporterDebug.ts");
exports.VRM_GIZMO_RENDER_ORDER = 10000;
var VRMDebug = (function (_super) {
    __extends(VRMDebug, _super);
    function VRMDebug(params, debugOption) {
        if (debugOption === void 0) { debugOption = {}; }
        var _this = _super.call(this, params) || this;
        if (!debugOption.disableBoxHelper) {
            _this.scene.add(new THREE.BoxHelper(_this.scene));
        }
        if (!debugOption.disableSkeletonHelper) {
            _this.scene.add(new THREE.SkeletonHelper(_this.scene));
        }
        return _this;
    }
    VRMDebug.from = function (gltf, options, debugOption) {
        if (options === void 0) { options = {}; }
        if (debugOption === void 0) { debugOption = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var importer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        importer = new VRMImporterDebug_1.VRMImporterDebug(options);
                        return [4, importer.import(gltf, debugOption)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    VRMDebug.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
    };
    return VRMDebug;
}(VRM_1.VRM));
exports.VRMDebug = VRMDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMDebugOptions.ts":
/*!******************************************!*\
  !*** ./src/vrm/debug/VRMDebugOptions.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/debug/VRMImporterDebug.ts":
/*!*******************************************!*\
  !*** ./src/vrm/debug/VRMImporterDebug.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMImporterDebug = void 0;
var VRMImporter_1 = __webpack_require__(/*! ../VRMImporter */ "./src/vrm/VRMImporter.ts");
var VRMDebug_1 = __webpack_require__(/*! ./VRMDebug */ "./src/vrm/debug/VRMDebug.ts");
var VRMLookAtImporterDebug_1 = __webpack_require__(/*! ./VRMLookAtImporterDebug */ "./src/vrm/debug/VRMLookAtImporterDebug.ts");
var VRMSpringBoneImporterDebug_1 = __webpack_require__(/*! ./VRMSpringBoneImporterDebug */ "./src/vrm/debug/VRMSpringBoneImporterDebug.ts");
var VRMImporterDebug = (function (_super) {
    __extends(VRMImporterDebug, _super);
    function VRMImporterDebug(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        options.lookAtImporter = options.lookAtImporter || new VRMLookAtImporterDebug_1.VRMLookAtImporterDebug();
        options.springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporterDebug_1.VRMSpringBoneImporterDebug();
        _this = _super.call(this, options) || this;
        return _this;
    }
    VRMImporterDebug.prototype.import = function (gltf, debugOptions) {
        if (debugOptions === void 0) { debugOptions = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var scene, meta, materials, humanoid, firstPerson, _a, blendShapeProxy, lookAt, _b, springBoneManager;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
                            throw new Error('Could not find VRM extension on the GLTF');
                        }
                        scene = gltf.scene;
                        scene.updateMatrixWorld(false);
                        scene.traverse(function (object3d) {
                            if (object3d.isMesh) {
                                object3d.frustumCulled = false;
                            }
                        });
                        return [4, this._metaImporter.import(gltf)];
                    case 1:
                        meta = (_c.sent()) || undefined;
                        return [4, this._materialImporter.convertGLTFMaterials(gltf)];
                    case 2:
                        materials = (_c.sent()) || undefined;
                        return [4, this._humanoidImporter.import(gltf)];
                    case 3:
                        humanoid = (_c.sent()) || undefined;
                        if (!humanoid) return [3, 5];
                        return [4, this._firstPersonImporter.import(gltf, humanoid)];
                    case 4:
                        _a = (_c.sent()) || undefined;
                        return [3, 6];
                    case 5:
                        _a = undefined;
                        _c.label = 6;
                    case 6:
                        firstPerson = _a;
                        return [4, this._blendShapeImporter.import(gltf)];
                    case 7:
                        blendShapeProxy = (_c.sent()) || undefined;
                        if (!(firstPerson && blendShapeProxy && humanoid)) return [3, 9];
                        return [4, this._lookAtImporter.import(gltf, firstPerson, blendShapeProxy, humanoid)];
                    case 8:
                        _b = (_c.sent()) || undefined;
                        return [3, 10];
                    case 9:
                        _b = undefined;
                        _c.label = 10;
                    case 10:
                        lookAt = _b;
                        if (lookAt.setupHelper) {
                            lookAt.setupHelper(scene, debugOptions);
                        }
                        return [4, this._springBoneImporter.import(gltf)];
                    case 11:
                        springBoneManager = (_c.sent()) || undefined;
                        if (springBoneManager.setupHelper) {
                            springBoneManager.setupHelper(scene, debugOptions);
                        }
                        return [2, new VRMDebug_1.VRMDebug({
                                scene: gltf.scene,
                                meta: meta,
                                materials: materials,
                                humanoid: humanoid,
                                firstPerson: firstPerson,
                                blendShapeProxy: blendShapeProxy,
                                lookAt: lookAt,
                                springBoneManager: springBoneManager,
                            }, debugOptions)];
                }
            });
        });
    };
    return VRMImporterDebug;
}(VRMImporter_1.VRMImporter));
exports.VRMImporterDebug = VRMImporterDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMLookAtHeadDebug.ts":
/*!*********************************************!*\
  !*** ./src/vrm/debug/VRMLookAtHeadDebug.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtHeadDebug = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var VRMLookAtHead_1 = __webpack_require__(/*! ../lookat/VRMLookAtHead */ "./src/vrm/lookat/VRMLookAtHead.ts");
var _v3 = new THREE.Vector3();
var VRMLookAtHeadDebug = (function (_super) {
    __extends(VRMLookAtHeadDebug, _super);
    function VRMLookAtHeadDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VRMLookAtHeadDebug.prototype.setupHelper = function (scene, debugOption) {
        if (!debugOption.disableFaceDirectionHelper) {
            this._faceDirectionHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), 0.5, 0xff00ff);
            scene.add(this._faceDirectionHelper);
        }
    };
    VRMLookAtHeadDebug.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
        if (this._faceDirectionHelper) {
            this.firstPerson.getFirstPersonWorldPosition(this._faceDirectionHelper.position);
            this._faceDirectionHelper.setDirection(this.getLookAtWorldDirection(_v3));
        }
    };
    return VRMLookAtHeadDebug;
}(VRMLookAtHead_1.VRMLookAtHead));
exports.VRMLookAtHeadDebug = VRMLookAtHeadDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMLookAtImporterDebug.ts":
/*!*************************************************!*\
  !*** ./src/vrm/debug/VRMLookAtImporterDebug.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtImporterDebug = void 0;
var VRMLookAtImporter_1 = __webpack_require__(/*! ../lookat/VRMLookAtImporter */ "./src/vrm/lookat/VRMLookAtImporter.ts");
var VRMLookAtHeadDebug_1 = __webpack_require__(/*! ./VRMLookAtHeadDebug */ "./src/vrm/debug/VRMLookAtHeadDebug.ts");
var VRMLookAtImporterDebug = (function (_super) {
    __extends(VRMLookAtImporterDebug, _super);
    function VRMLookAtImporterDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VRMLookAtImporterDebug.prototype.import = function (gltf, firstPerson, blendShapeProxy, humanoid) {
        var _a;
        var vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
        if (!vrmExt) {
            return null;
        }
        var schemaFirstPerson = vrmExt.firstPerson;
        if (!schemaFirstPerson) {
            return null;
        }
        var applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
        return new VRMLookAtHeadDebug_1.VRMLookAtHeadDebug(firstPerson, applyer || undefined);
    };
    return VRMLookAtImporterDebug;
}(VRMLookAtImporter_1.VRMLookAtImporter));
exports.VRMLookAtImporterDebug = VRMLookAtImporterDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMSpringBoneDebug.ts":
/*!*********************************************!*\
  !*** ./src/vrm/debug/VRMSpringBoneDebug.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSpringBoneDebug = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var springbone_1 = __webpack_require__(/*! ../springbone */ "./src/vrm/springbone/index.ts");
var VRMDebug_1 = __webpack_require__(/*! ./VRMDebug */ "./src/vrm/debug/VRMDebug.ts");
var _v3A = new THREE.Vector3();
var VRMSpringBoneDebug = (function (_super) {
    __extends(VRMSpringBoneDebug, _super);
    function VRMSpringBoneDebug(bone, params) {
        return _super.call(this, bone, params) || this;
    }
    VRMSpringBoneDebug.prototype.getGizmo = function () {
        if (this._gizmo) {
            return this._gizmo;
        }
        var nextTailRelative = _v3A.copy(this._nextTail).sub(this._centerSpacePosition);
        var nextTailRelativeLength = nextTailRelative.length();
        this._gizmo = new THREE.ArrowHelper(nextTailRelative.normalize(), this._centerSpacePosition, nextTailRelativeLength, 0xffff00, this.radius, this.radius);
        this._gizmo.line.renderOrder = VRMDebug_1.VRM_GIZMO_RENDER_ORDER;
        this._gizmo.cone.renderOrder = VRMDebug_1.VRM_GIZMO_RENDER_ORDER;
        this._gizmo.line.material.depthTest = false;
        this._gizmo.line.material.transparent = true;
        this._gizmo.cone.material.depthTest = false;
        this._gizmo.cone.material.transparent = true;
        return this._gizmo;
    };
    VRMSpringBoneDebug.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
        this._updateGizmo();
    };
    VRMSpringBoneDebug.prototype._updateGizmo = function () {
        if (!this._gizmo) {
            return;
        }
        var nextTailRelative = _v3A.copy(this._currentTail).sub(this._centerSpacePosition);
        var nextTailRelativeLength = nextTailRelative.length();
        this._gizmo.setDirection(nextTailRelative.normalize());
        this._gizmo.setLength(nextTailRelativeLength, this.radius, this.radius);
        this._gizmo.position.copy(this._centerSpacePosition);
    };
    return VRMSpringBoneDebug;
}(springbone_1.VRMSpringBone));
exports.VRMSpringBoneDebug = VRMSpringBoneDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMSpringBoneImporterDebug.ts":
/*!*****************************************************!*\
  !*** ./src/vrm/debug/VRMSpringBoneImporterDebug.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSpringBoneImporterDebug = void 0;
var VRMSpringBoneImporter_1 = __webpack_require__(/*! ../springbone/VRMSpringBoneImporter */ "./src/vrm/springbone/VRMSpringBoneImporter.ts");
var VRMSpringBoneManagerDebug_1 = __webpack_require__(/*! ./VRMSpringBoneManagerDebug */ "./src/vrm/debug/VRMSpringBoneManagerDebug.ts");
var VRMSpringBoneDebug_1 = __webpack_require__(/*! ./VRMSpringBoneDebug */ "./src/vrm/debug/VRMSpringBoneDebug.ts");
var VRMSpringBoneImporterDebug = (function (_super) {
    __extends(VRMSpringBoneImporterDebug, _super);
    function VRMSpringBoneImporterDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VRMSpringBoneImporterDebug.prototype.import = function (gltf) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, schemaSecondaryAnimation, colliderGroups, springBoneGroupList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt)
                            return [2, null];
                        schemaSecondaryAnimation = vrmExt.secondaryAnimation;
                        if (!schemaSecondaryAnimation)
                            return [2, null];
                        return [4, this._importColliderMeshGroups(gltf, schemaSecondaryAnimation)];
                    case 1:
                        colliderGroups = _b.sent();
                        return [4, this._importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups)];
                    case 2:
                        springBoneGroupList = _b.sent();
                        return [2, new VRMSpringBoneManagerDebug_1.VRMSpringBoneManagerDebug(colliderGroups, springBoneGroupList)];
                }
            });
        });
    };
    VRMSpringBoneImporterDebug.prototype._createSpringBone = function (bone, params) {
        return new VRMSpringBoneDebug_1.VRMSpringBoneDebug(bone, params);
    };
    return VRMSpringBoneImporterDebug;
}(VRMSpringBoneImporter_1.VRMSpringBoneImporter));
exports.VRMSpringBoneImporterDebug = VRMSpringBoneImporterDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMSpringBoneManagerDebug.ts":
/*!****************************************************!*\
  !*** ./src/vrm/debug/VRMSpringBoneManagerDebug.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSpringBoneManagerDebug = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var springbone_1 = __webpack_require__(/*! ../springbone */ "./src/vrm/springbone/index.ts");
var VRMDebug_1 = __webpack_require__(/*! ./VRMDebug */ "./src/vrm/debug/VRMDebug.ts");
var _colliderGizmoMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
    transparent: true,
    depthTest: false,
});
var VRMSpringBoneManagerDebug = (function (_super) {
    __extends(VRMSpringBoneManagerDebug, _super);
    function VRMSpringBoneManagerDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VRMSpringBoneManagerDebug.prototype.setupHelper = function (scene, debugOption) {
        if (debugOption.disableSpringBoneHelper)
            return;
        this.springBoneGroupList.forEach(function (springBoneGroup) {
            springBoneGroup.forEach(function (springBone) {
                if (springBone.getGizmo) {
                    var gizmo = springBone.getGizmo();
                    scene.add(gizmo);
                }
            });
        });
        this.colliderGroups.forEach(function (colliderGroup) {
            colliderGroup.colliders.forEach(function (collider) {
                collider.material = _colliderGizmoMaterial;
                collider.renderOrder = VRMDebug_1.VRM_GIZMO_RENDER_ORDER;
            });
        });
    };
    return VRMSpringBoneManagerDebug;
}(springbone_1.VRMSpringBoneManager));
exports.VRMSpringBoneManagerDebug = VRMSpringBoneManagerDebug;


/***/ }),

/***/ "./src/vrm/debug/index.ts":
/*!********************************!*\
  !*** ./src/vrm/debug/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRMDebugOptions */ "./src/vrm/debug/VRMDebugOptions.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMDebug */ "./src/vrm/debug/VRMDebug.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSpringBoneDebug */ "./src/vrm/debug/VRMSpringBoneDebug.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSpringBoneImporterDebug */ "./src/vrm/debug/VRMSpringBoneImporterDebug.ts"), exports);


/***/ }),

/***/ "./src/vrm/firstperson/VRMFirstPerson.ts":
/*!***********************************************!*\
  !*** ./src/vrm/firstperson/VRMFirstPerson.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMFirstPerson = exports.VRMRendererFirstPersonFlags = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
var VECTOR3_FRONT = Object.freeze(new THREE.Vector3(0.0, 0.0, -1.0));
var _quat = new THREE.Quaternion();
var FirstPersonFlag;
(function (FirstPersonFlag) {
    FirstPersonFlag[FirstPersonFlag["Auto"] = 0] = "Auto";
    FirstPersonFlag[FirstPersonFlag["Both"] = 1] = "Both";
    FirstPersonFlag[FirstPersonFlag["ThirdPersonOnly"] = 2] = "ThirdPersonOnly";
    FirstPersonFlag[FirstPersonFlag["FirstPersonOnly"] = 3] = "FirstPersonOnly";
})(FirstPersonFlag || (FirstPersonFlag = {}));
var VRMRendererFirstPersonFlags = (function () {
    function VRMRendererFirstPersonFlags(firstPersonFlag, mesh) {
        this.firstPersonFlag = VRMRendererFirstPersonFlags._parseFirstPersonFlag(firstPersonFlag);
        this.mesh = mesh;
    }
    VRMRendererFirstPersonFlags._parseFirstPersonFlag = function (firstPersonFlag) {
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
    };
    return VRMRendererFirstPersonFlags;
}());
exports.VRMRendererFirstPersonFlags = VRMRendererFirstPersonFlags;
var VRMFirstPerson = (function () {
    function VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations) {
        this._meshAnnotations = [];
        this._firstPersonOnlyLayer = VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER;
        this._thirdPersonOnlyLayer = VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER;
        this._initialized = false;
        this._firstPersonBone = firstPersonBone;
        this._firstPersonBoneOffset = firstPersonBoneOffset;
        this._meshAnnotations = meshAnnotations;
    }
    Object.defineProperty(VRMFirstPerson.prototype, "firstPersonBone", {
        get: function () {
            return this._firstPersonBone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VRMFirstPerson.prototype, "meshAnnotations", {
        get: function () {
            return this._meshAnnotations;
        },
        enumerable: false,
        configurable: true
    });
    VRMFirstPerson.prototype.getFirstPersonWorldDirection = function (target) {
        return target.copy(VECTOR3_FRONT).applyQuaternion(math_1.getWorldQuaternionLite(this._firstPersonBone, _quat));
    };
    Object.defineProperty(VRMFirstPerson.prototype, "firstPersonOnlyLayer", {
        get: function () {
            return this._firstPersonOnlyLayer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VRMFirstPerson.prototype, "thirdPersonOnlyLayer", {
        get: function () {
            return this._thirdPersonOnlyLayer;
        },
        enumerable: false,
        configurable: true
    });
    VRMFirstPerson.prototype.getFirstPersonBoneOffset = function (target) {
        return target.copy(this._firstPersonBoneOffset);
    };
    VRMFirstPerson.prototype.getFirstPersonWorldPosition = function (v3) {
        var offset = this._firstPersonBoneOffset;
        var v4 = new THREE.Vector4(offset.x, offset.y, offset.z, 1.0);
        v4.applyMatrix4(this._firstPersonBone.matrixWorld);
        return v3.set(v4.x, v4.y, v4.z);
    };
    VRMFirstPerson.prototype.setup = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.firstPersonOnlyLayer, firstPersonOnlyLayer = _c === void 0 ? VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER : _c, _d = _b.thirdPersonOnlyLayer, thirdPersonOnlyLayer = _d === void 0 ? VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER : _d;
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._firstPersonOnlyLayer = firstPersonOnlyLayer;
        this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;
        this._meshAnnotations.forEach(function (item) {
            if (item.firstPersonFlag === FirstPersonFlag.FirstPersonOnly) {
                item.mesh.layers.set(_this._firstPersonOnlyLayer);
                item.mesh.traverse(function (child) { return child.layers.set(_this._firstPersonOnlyLayer); });
            }
            else if (item.firstPersonFlag === FirstPersonFlag.ThirdPersonOnly) {
                item.mesh.layers.set(_this._thirdPersonOnlyLayer);
                item.mesh.traverse(function (child) { return child.layers.set(_this._thirdPersonOnlyLayer); });
            }
            else if (item.firstPersonFlag === FirstPersonFlag.Auto) {
                _this._createHeadlessModel(item.mesh);
            }
        });
    };
    VRMFirstPerson.prototype._excludeTriangles = function (triangles, bws, skinIndex, exclude) {
        var count = 0;
        if (bws != null && bws.length > 0) {
            for (var i = 0; i < triangles.length; i += 3) {
                var a = triangles[i];
                var b = triangles[i + 1];
                var c = triangles[i + 2];
                var bw0 = bws[a];
                var skin0 = skinIndex[a];
                if (bw0[0] > 0 && exclude.includes(skin0[0]))
                    continue;
                if (bw0[1] > 0 && exclude.includes(skin0[1]))
                    continue;
                if (bw0[2] > 0 && exclude.includes(skin0[2]))
                    continue;
                if (bw0[3] > 0 && exclude.includes(skin0[3]))
                    continue;
                var bw1 = bws[b];
                var skin1 = skinIndex[b];
                if (bw1[0] > 0 && exclude.includes(skin1[0]))
                    continue;
                if (bw1[1] > 0 && exclude.includes(skin1[1]))
                    continue;
                if (bw1[2] > 0 && exclude.includes(skin1[2]))
                    continue;
                if (bw1[3] > 0 && exclude.includes(skin1[3]))
                    continue;
                var bw2 = bws[c];
                var skin2 = skinIndex[c];
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
    };
    VRMFirstPerson.prototype._createErasedMesh = function (src, erasingBonesIndex) {
        var dst = new THREE.SkinnedMesh(src.geometry.clone(), src.material);
        dst.name = src.name + "(erase)";
        dst.frustumCulled = src.frustumCulled;
        dst.layers.set(this._firstPersonOnlyLayer);
        var geometry = dst.geometry;
        var skinIndexAttr = geometry.getAttribute('skinIndex').array;
        var skinIndex = [];
        for (var i = 0; i < skinIndexAttr.length; i += 4) {
            skinIndex.push([skinIndexAttr[i], skinIndexAttr[i + 1], skinIndexAttr[i + 2], skinIndexAttr[i + 3]]);
        }
        var skinWeightAttr = geometry.getAttribute('skinWeight').array;
        var skinWeight = [];
        for (var i = 0; i < skinWeightAttr.length; i += 4) {
            skinWeight.push([skinWeightAttr[i], skinWeightAttr[i + 1], skinWeightAttr[i + 2], skinWeightAttr[i + 3]]);
        }
        var index = geometry.getIndex();
        if (!index) {
            throw new Error("The geometry doesn't have an index buffer");
        }
        var oldTriangles = Array.from(index.array);
        var count = this._excludeTriangles(oldTriangles, skinWeight, skinIndex, erasingBonesIndex);
        var newTriangle = [];
        for (var i = 0; i < count; i++) {
            newTriangle[i] = oldTriangles[i];
        }
        geometry.setIndex(newTriangle);
        if (src.onBeforeRender) {
            dst.onBeforeRender = src.onBeforeRender;
        }
        dst.bind(new THREE.Skeleton(src.skeleton.bones, src.skeleton.boneInverses), new THREE.Matrix4());
        return dst;
    };
    VRMFirstPerson.prototype._createHeadlessModelForSkinnedMesh = function (parent, mesh) {
        var _this = this;
        var eraseBoneIndexes = [];
        mesh.skeleton.bones.forEach(function (bone, index) {
            if (_this._isEraseTarget(bone))
                eraseBoneIndexes.push(index);
        });
        if (!eraseBoneIndexes.length) {
            mesh.layers.enable(this._thirdPersonOnlyLayer);
            mesh.layers.enable(this._firstPersonOnlyLayer);
            return;
        }
        mesh.layers.set(this._thirdPersonOnlyLayer);
        var newMesh = this._createErasedMesh(mesh, eraseBoneIndexes);
        parent.add(newMesh);
    };
    VRMFirstPerson.prototype._createHeadlessModel = function (node) {
        var _this = this;
        if (node.type === 'Group') {
            node.layers.set(this._thirdPersonOnlyLayer);
            if (this._isEraseTarget(node)) {
                node.traverse(function (child) { return child.layers.set(_this._thirdPersonOnlyLayer); });
            }
            else {
                var parent_1 = new THREE.Group();
                parent_1.name = "_headless_" + node.name;
                parent_1.layers.set(this._firstPersonOnlyLayer);
                node.parent.add(parent_1);
                node.children
                    .filter(function (child) { return child.type === 'SkinnedMesh'; })
                    .forEach(function (child) {
                    var skinnedMesh = child;
                    _this._createHeadlessModelForSkinnedMesh(parent_1, skinnedMesh);
                });
            }
        }
        else if (node.type === 'SkinnedMesh') {
            var skinnedMesh = node;
            this._createHeadlessModelForSkinnedMesh(node.parent, skinnedMesh);
        }
        else {
            if (this._isEraseTarget(node)) {
                node.layers.set(this._thirdPersonOnlyLayer);
                node.traverse(function (child) { return child.layers.set(_this._thirdPersonOnlyLayer); });
            }
        }
    };
    VRMFirstPerson.prototype._isEraseTarget = function (bone) {
        if (bone.name === this._firstPersonBone.name) {
            return true;
        }
        else if (!bone.parent) {
            return false;
        }
        else {
            return this._isEraseTarget(bone.parent);
        }
    };
    VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
    VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER = 10;
    return VRMFirstPerson;
}());
exports.VRMFirstPerson = VRMFirstPerson;


/***/ }),

/***/ "./src/vrm/firstperson/VRMFirstPersonImporter.ts":
/*!*******************************************************!*\
  !*** ./src/vrm/firstperson/VRMFirstPersonImporter.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMFirstPersonImporter = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var VRMFirstPerson_1 = __webpack_require__(/*! ./VRMFirstPerson */ "./src/vrm/firstperson/VRMFirstPerson.ts");
var VRMFirstPersonImporter = (function () {
    function VRMFirstPersonImporter() {
    }
    VRMFirstPersonImporter.prototype.import = function (gltf, humanoid) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, schemaFirstPerson, firstPersonBoneIndex, firstPersonBone, firstPersonBoneOffset, meshAnnotations, meshes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt) {
                            return [2, null];
                        }
                        schemaFirstPerson = vrmExt.firstPerson;
                        if (!schemaFirstPerson) {
                            return [2, null];
                        }
                        firstPersonBoneIndex = schemaFirstPerson.firstPersonBone;
                        if (!(firstPersonBoneIndex === undefined || firstPersonBoneIndex === -1)) return [3, 1];
                        firstPersonBone = humanoid.getBoneNode(types_1.VRMSchema.HumanoidBoneName.Head);
                        return [3, 3];
                    case 1: return [4, gltf.parser.getDependency('node', firstPersonBoneIndex)];
                    case 2:
                        firstPersonBone = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!firstPersonBone) {
                            console.warn('VRMFirstPersonImporter: Could not find firstPersonBone of the VRM');
                            return [2, null];
                        }
                        firstPersonBoneOffset = schemaFirstPerson.firstPersonBoneOffset
                            ? new THREE.Vector3(schemaFirstPerson.firstPersonBoneOffset.x, schemaFirstPerson.firstPersonBoneOffset.y, -schemaFirstPerson.firstPersonBoneOffset.z)
                            : new THREE.Vector3(0.0, 0.06, 0.0);
                        meshAnnotations = [];
                        return [4, gltf.parser.getDependencies('mesh')];
                    case 4:
                        meshes = _b.sent();
                        meshes.forEach(function (mesh, meshIndex) {
                            var flag = schemaFirstPerson.meshAnnotations
                                ? schemaFirstPerson.meshAnnotations.find(function (a) { return a.mesh === meshIndex; })
                                : undefined;
                            meshAnnotations.push(new VRMFirstPerson_1.VRMRendererFirstPersonFlags(flag === null || flag === void 0 ? void 0 : flag.firstPersonFlag, mesh));
                        });
                        return [2, new VRMFirstPerson_1.VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations)];
                }
            });
        });
    };
    return VRMFirstPersonImporter;
}());
exports.VRMFirstPersonImporter = VRMFirstPersonImporter;


/***/ }),

/***/ "./src/vrm/firstperson/index.ts":
/*!**************************************!*\
  !*** ./src/vrm/firstperson/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRMFirstPerson */ "./src/vrm/firstperson/VRMFirstPerson.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMFirstPersonImporter */ "./src/vrm/firstperson/VRMFirstPersonImporter.ts"), exports);


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanBone.ts":
/*!******************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanBone.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMHumanBone = void 0;
var VRMHumanBone = (function () {
    function VRMHumanBone(node, humanLimit) {
        this.node = node;
        this.humanLimit = humanLimit;
    }
    return VRMHumanBone;
}());
exports.VRMHumanBone = VRMHumanBone;


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanBones.ts":
/*!*******************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanBones.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanDescription.ts":
/*!*************************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanDescription.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanLimit.ts":
/*!*******************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanLimit.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanoid.ts":
/*!*****************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanoid.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMHumanoid = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var _v3A = new THREE.Vector3();
var _quatA = new THREE.Quaternion();
var VRMHumanoid = (function () {
    function VRMHumanoid(boneArray, humanDescription) {
        this.restPose = {};
        this.humanBones = this._createHumanBones(boneArray);
        this.humanDescription = humanDescription;
        this.restPose = this.getPose();
    }
    VRMHumanoid.prototype.getPose = function () {
        var _this = this;
        var pose = {};
        Object.keys(this.humanBones).forEach(function (vrmBoneName) {
            var node = _this.getBoneNode(vrmBoneName);
            if (!node) {
                return;
            }
            if (pose[vrmBoneName]) {
                return;
            }
            _v3A.set(0, 0, 0);
            _quatA.identity();
            var restState = _this.restPose[vrmBoneName];
            if (restState === null || restState === void 0 ? void 0 : restState.position) {
                _v3A.fromArray(restState.position).negate();
            }
            if (restState === null || restState === void 0 ? void 0 : restState.rotation) {
                _quatA.fromArray(restState.rotation).inverse();
            }
            _v3A.add(node.position);
            _quatA.premultiply(node.quaternion);
            pose[vrmBoneName] = {
                position: _v3A.toArray(),
                rotation: _quatA.toArray(),
            };
        }, {});
        return pose;
    };
    VRMHumanoid.prototype.setPose = function (poseObject) {
        var _this = this;
        Object.keys(poseObject).forEach(function (boneName) {
            var state = poseObject[boneName];
            var node = _this.getBoneNode(boneName);
            if (!node) {
                return;
            }
            var restState = _this.restPose[boneName];
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
    };
    VRMHumanoid.prototype.resetPose = function () {
        this.setPose({});
    };
    VRMHumanoid.prototype.getBone = function (name) {
        return this.humanBones[name][0] || undefined;
    };
    VRMHumanoid.prototype.getBones = function (name) {
        return this.humanBones[name];
    };
    VRMHumanoid.prototype.getBoneNode = function (name) {
        var _a, _b;
        return (_b = (_a = this.humanBones[name][0]) === null || _a === void 0 ? void 0 : _a.node) !== null && _b !== void 0 ? _b : null;
    };
    VRMHumanoid.prototype.getBoneNodes = function (name) {
        return this.humanBones[name].map(function (bone) { return bone.node; });
    };
    VRMHumanoid.prototype._createHumanBones = function (boneArray) {
        var bones = Object.values(types_1.VRMSchema.HumanoidBoneName).reduce(function (accum, name) {
            accum[name] = [];
            return accum;
        }, {});
        boneArray.forEach(function (bone) {
            bones[bone.name].push(bone.bone);
        });
        return bones;
    };
    return VRMHumanoid;
}());
exports.VRMHumanoid = VRMHumanoid;


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanoidImporter.ts":
/*!*************************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanoidImporter.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMHumanoidImporter = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var VRMHumanBone_1 = __webpack_require__(/*! ./VRMHumanBone */ "./src/vrm/humanoid/VRMHumanBone.ts");
var VRMHumanoid_1 = __webpack_require__(/*! ./VRMHumanoid */ "./src/vrm/humanoid/VRMHumanoid.ts");
var VRMHumanoidImporter = (function () {
    function VRMHumanoidImporter() {
    }
    VRMHumanoidImporter.prototype.import = function (gltf) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, schemaHumanoid, humanBoneArray, humanDescription;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt) {
                            return [2, null];
                        }
                        schemaHumanoid = vrmExt.humanoid;
                        if (!schemaHumanoid) {
                            return [2, null];
                        }
                        humanBoneArray = [];
                        if (!schemaHumanoid.humanBones) return [3, 2];
                        return [4, Promise.all(schemaHumanoid.humanBones.map(function (bone) { return __awaiter(_this, void 0, void 0, function () {
                                var node;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!bone.bone || !bone.node) {
                                                return [2];
                                            }
                                            return [4, gltf.parser.getDependency('node', bone.node)];
                                        case 1:
                                            node = _a.sent();
                                            humanBoneArray.push({
                                                name: bone.bone,
                                                bone: new VRMHumanBone_1.VRMHumanBone(node, {
                                                    axisLength: bone.axisLength,
                                                    center: bone.center && new THREE.Vector3(bone.center.x, bone.center.y, bone.center.z),
                                                    max: bone.max && new THREE.Vector3(bone.max.x, bone.max.y, bone.max.z),
                                                    min: bone.min && new THREE.Vector3(bone.min.x, bone.min.y, bone.min.z),
                                                    useDefaultValues: bone.useDefaultValues,
                                                }),
                                            });
                                            return [2];
                                    }
                                });
                            }); }))];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        humanDescription = {
                            armStretch: schemaHumanoid.armStretch,
                            legStretch: schemaHumanoid.legStretch,
                            upperArmTwist: schemaHumanoid.upperArmTwist,
                            lowerArmTwist: schemaHumanoid.lowerArmTwist,
                            upperLegTwist: schemaHumanoid.upperLegTwist,
                            lowerLegTwist: schemaHumanoid.lowerLegTwist,
                            feetSpacing: schemaHumanoid.feetSpacing,
                            hasTranslationDoF: schemaHumanoid.hasTranslationDoF,
                        };
                        return [2, new VRMHumanoid_1.VRMHumanoid(humanBoneArray, humanDescription)];
                }
            });
        });
    };
    return VRMHumanoidImporter;
}());
exports.VRMHumanoidImporter = VRMHumanoidImporter;


/***/ }),

/***/ "./src/vrm/humanoid/index.ts":
/*!***********************************!*\
  !*** ./src/vrm/humanoid/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRMHumanBone */ "./src/vrm/humanoid/VRMHumanBone.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMHumanBones */ "./src/vrm/humanoid/VRMHumanBones.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMHumanDescription */ "./src/vrm/humanoid/VRMHumanDescription.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMHumanLimit */ "./src/vrm/humanoid/VRMHumanLimit.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMHumanoid */ "./src/vrm/humanoid/VRMHumanoid.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMHumanoidImporter */ "./src/vrm/humanoid/VRMHumanoidImporter.ts"), exports);


/***/ }),

/***/ "./src/vrm/index.ts":
/*!**************************!*\
  !*** ./src/vrm/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRM */ "./src/vrm/VRM.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMImporter */ "./src/vrm/VRMImporter.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMUtils */ "./src/vrm/VRMUtils/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./blendshape */ "./src/vrm/blendshape/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./debug */ "./src/vrm/debug/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./firstperson */ "./src/vrm/firstperson/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./humanoid */ "./src/vrm/humanoid/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./lookat */ "./src/vrm/lookat/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./springbone */ "./src/vrm/springbone/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./src/vrm/types/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./material */ "./src/vrm/material/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./meta */ "./src/vrm/meta/index.ts"), exports);


/***/ }),

/***/ "./src/vrm/lookat/VRMCurveMapper.ts":
/*!******************************************!*\
  !*** ./src/vrm/lookat/VRMCurveMapper.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMCurveMapper = void 0;
var hermiteSpline = function (y0, y1, t0, t1, x) {
    var xc = x * x * x;
    var xs = x * x;
    var dy = y1 - y0;
    var h01 = -2.0 * xc + 3.0 * xs;
    var h10 = xc - 2.0 * xs + x;
    var h11 = xc - xs;
    return y0 + dy * h01 + t0 * h10 + t1 * h11;
};
var evaluateCurve = function (arr, x) {
    if (arr.length < 8) {
        throw new Error('evaluateCurve: Invalid curve detected! (Array length must be 8 at least)');
    }
    if (arr.length % 4 !== 0) {
        throw new Error('evaluateCurve: Invalid curve detected! (Array length must be multiples of 4');
    }
    var outNode;
    for (outNode = 0;; outNode++) {
        if (arr.length <= 4 * outNode) {
            return arr[4 * outNode - 3];
        }
        else if (x <= arr[4 * outNode]) {
            break;
        }
    }
    var inNode = outNode - 1;
    if (inNode < 0) {
        return arr[4 * inNode + 5];
    }
    var x0 = arr[4 * inNode];
    var x1 = arr[4 * outNode];
    var xHermite = (x - x0) / (x1 - x0);
    var y0 = arr[4 * inNode + 1];
    var y1 = arr[4 * outNode + 1];
    var t0 = arr[4 * inNode + 3];
    var t1 = arr[4 * outNode + 2];
    return hermiteSpline(y0, y1, t0, t1, xHermite);
};
var VRMCurveMapper = (function () {
    function VRMCurveMapper(xRange, yRange, curve) {
        this.curve = [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0];
        this.curveXRangeDegree = 90.0;
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
    VRMCurveMapper.prototype.map = function (src) {
        var clampedSrc = Math.min(Math.max(src, 0.0), this.curveXRangeDegree);
        var x = clampedSrc / this.curveXRangeDegree;
        return this.curveYRangeDegree * evaluateCurve(this.curve, x);
    };
    return VRMCurveMapper;
}());
exports.VRMCurveMapper = VRMCurveMapper;


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtApplyer.ts":
/*!********************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtApplyer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtApplyer = void 0;
var VRMLookAtApplyer = (function () {
    function VRMLookAtApplyer() {
    }
    return VRMLookAtApplyer;
}());
exports.VRMLookAtApplyer = VRMLookAtApplyer;


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtBlendShapeApplyer.ts":
/*!******************************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtBlendShapeApplyer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtBlendShapeApplyer = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var VRMLookAtApplyer_1 = __webpack_require__(/*! ./VRMLookAtApplyer */ "./src/vrm/lookat/VRMLookAtApplyer.ts");
var VRMLookAtBlendShapeApplyer = (function (_super) {
    __extends(VRMLookAtBlendShapeApplyer, _super);
    function VRMLookAtBlendShapeApplyer(blendShapeProxy, curveHorizontal, curveVerticalDown, curveVerticalUp) {
        var _this = _super.call(this) || this;
        _this.type = types_1.VRMSchema.FirstPersonLookAtTypeName.BlendShape;
        _this._curveHorizontal = curveHorizontal;
        _this._curveVerticalDown = curveVerticalDown;
        _this._curveVerticalUp = curveVerticalUp;
        _this._blendShapeProxy = blendShapeProxy;
        return _this;
    }
    VRMLookAtBlendShapeApplyer.prototype.name = function () {
        return types_1.VRMSchema.FirstPersonLookAtTypeName.BlendShape;
    };
    VRMLookAtBlendShapeApplyer.prototype.lookAt = function (euler) {
        var srcX = euler.x;
        var srcY = euler.y;
        if (srcX < 0.0) {
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookup, 0.0);
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookdown, this._curveVerticalDown.map(-srcX));
        }
        else {
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookdown, 0.0);
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookup, this._curveVerticalUp.map(srcX));
        }
        if (srcY < 0.0) {
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookleft, 0.0);
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookright, this._curveHorizontal.map(-srcY));
        }
        else {
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookright, 0.0);
            this._blendShapeProxy.setValue(types_1.VRMSchema.BlendShapePresetName.Lookleft, this._curveHorizontal.map(srcY));
        }
    };
    return VRMLookAtBlendShapeApplyer;
}(VRMLookAtApplyer_1.VRMLookAtApplyer));
exports.VRMLookAtBlendShapeApplyer = VRMLookAtBlendShapeApplyer;


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtBoneApplyer.ts":
/*!************************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtBoneApplyer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtBoneApplyer = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var VRMLookAtApplyer_1 = __webpack_require__(/*! ./VRMLookAtApplyer */ "./src/vrm/lookat/VRMLookAtApplyer.ts");
var VRMLookAtHead_1 = __webpack_require__(/*! ./VRMLookAtHead */ "./src/vrm/lookat/VRMLookAtHead.ts");
var _euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead_1.VRMLookAtHead.EULER_ORDER);
var VRMLookAtBoneApplyer = (function (_super) {
    __extends(VRMLookAtBoneApplyer, _super);
    function VRMLookAtBoneApplyer(humanoid, curveHorizontalInner, curveHorizontalOuter, curveVerticalDown, curveVerticalUp) {
        var _this = _super.call(this) || this;
        _this.type = types_1.VRMSchema.FirstPersonLookAtTypeName.Bone;
        _this._curveHorizontalInner = curveHorizontalInner;
        _this._curveHorizontalOuter = curveHorizontalOuter;
        _this._curveVerticalDown = curveVerticalDown;
        _this._curveVerticalUp = curveVerticalUp;
        _this._leftEye = humanoid.getBoneNode(types_1.VRMSchema.HumanoidBoneName.LeftEye);
        _this._rightEye = humanoid.getBoneNode(types_1.VRMSchema.HumanoidBoneName.RightEye);
        return _this;
    }
    VRMLookAtBoneApplyer.prototype.lookAt = function (euler) {
        var srcX = euler.x;
        var srcY = euler.y;
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
    };
    return VRMLookAtBoneApplyer;
}(VRMLookAtApplyer_1.VRMLookAtApplyer));
exports.VRMLookAtBoneApplyer = VRMLookAtBoneApplyer;


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtHead.ts":
/*!*****************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtHead.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtHead = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
var VECTOR3_FRONT = Object.freeze(new THREE.Vector3(0.0, 0.0, -1.0));
var _v3A = new THREE.Vector3();
var _v3B = new THREE.Vector3();
var _v3C = new THREE.Vector3();
var _quat = new THREE.Quaternion();
var VRMLookAtHead = (function () {
    function VRMLookAtHead(firstPerson, applyer) {
        this.autoUpdate = true;
        this._euler = new THREE.Euler(0.0, 0.0, 0.0, VRMLookAtHead.EULER_ORDER);
        this.firstPerson = firstPerson;
        this.applyer = applyer;
    }
    VRMLookAtHead.prototype.getLookAtWorldDirection = function (target) {
        var rot = math_1.getWorldQuaternionLite(this.firstPerson.firstPersonBone, _quat);
        return target.copy(VECTOR3_FRONT).applyEuler(this._euler).applyQuaternion(rot);
    };
    VRMLookAtHead.prototype.lookAt = function (position) {
        this._calcEuler(this._euler, position);
        if (this.applyer) {
            this.applyer.lookAt(this._euler);
        }
    };
    VRMLookAtHead.prototype.update = function (delta) {
        if (this.target && this.autoUpdate) {
            this.lookAt(this.target.getWorldPosition(_v3A));
            if (this.applyer) {
                this.applyer.lookAt(this._euler);
            }
        }
    };
    VRMLookAtHead.prototype._calcEuler = function (target, position) {
        var headPosition = this.firstPerson.getFirstPersonWorldPosition(_v3B);
        var lookAtDir = _v3C.copy(position).sub(headPosition).normalize();
        lookAtDir.applyQuaternion(math_1.getWorldQuaternionLite(this.firstPerson.firstPersonBone, _quat).inverse());
        target.x = Math.atan2(lookAtDir.y, Math.sqrt(lookAtDir.x * lookAtDir.x + lookAtDir.z * lookAtDir.z));
        target.y = Math.atan2(-lookAtDir.x, -lookAtDir.z);
        return target;
    };
    VRMLookAtHead.EULER_ORDER = 'YXZ';
    return VRMLookAtHead;
}());
exports.VRMLookAtHead = VRMLookAtHead;


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtImporter.ts":
/*!*********************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtImporter.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMLookAtImporter = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var VRMCurveMapper_1 = __webpack_require__(/*! ./VRMCurveMapper */ "./src/vrm/lookat/VRMCurveMapper.ts");
var VRMLookAtBlendShapeApplyer_1 = __webpack_require__(/*! ./VRMLookAtBlendShapeApplyer */ "./src/vrm/lookat/VRMLookAtBlendShapeApplyer.ts");
var VRMLookAtBoneApplyer_1 = __webpack_require__(/*! ./VRMLookAtBoneApplyer */ "./src/vrm/lookat/VRMLookAtBoneApplyer.ts");
var VRMLookAtHead_1 = __webpack_require__(/*! ./VRMLookAtHead */ "./src/vrm/lookat/VRMLookAtHead.ts");
var DEG2RAD = Math.PI / 180;
var VRMLookAtImporter = (function () {
    function VRMLookAtImporter() {
    }
    VRMLookAtImporter.prototype.import = function (gltf, firstPerson, blendShapeProxy, humanoid) {
        var _a;
        var vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
        if (!vrmExt) {
            return null;
        }
        var schemaFirstPerson = vrmExt.firstPerson;
        if (!schemaFirstPerson) {
            return null;
        }
        var applyer = this._importApplyer(schemaFirstPerson, blendShapeProxy, humanoid);
        return new VRMLookAtHead_1.VRMLookAtHead(firstPerson, applyer || undefined);
    };
    VRMLookAtImporter.prototype._importApplyer = function (schemaFirstPerson, blendShapeProxy, humanoid) {
        var lookAtHorizontalInner = schemaFirstPerson.lookAtHorizontalInner;
        var lookAtHorizontalOuter = schemaFirstPerson.lookAtHorizontalOuter;
        var lookAtVerticalDown = schemaFirstPerson.lookAtVerticalDown;
        var lookAtVerticalUp = schemaFirstPerson.lookAtVerticalUp;
        switch (schemaFirstPerson.lookAtTypeName) {
            case types_1.VRMSchema.FirstPersonLookAtTypeName.Bone: {
                if (lookAtHorizontalInner === undefined ||
                    lookAtHorizontalOuter === undefined ||
                    lookAtVerticalDown === undefined ||
                    lookAtVerticalUp === undefined) {
                    return null;
                }
                else {
                    return new VRMLookAtBoneApplyer_1.VRMLookAtBoneApplyer(humanoid, this._importCurveMapperBone(lookAtHorizontalInner), this._importCurveMapperBone(lookAtHorizontalOuter), this._importCurveMapperBone(lookAtVerticalDown), this._importCurveMapperBone(lookAtVerticalUp));
                }
            }
            case types_1.VRMSchema.FirstPersonLookAtTypeName.BlendShape: {
                if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
                    return null;
                }
                else {
                    return new VRMLookAtBlendShapeApplyer_1.VRMLookAtBlendShapeApplyer(blendShapeProxy, this._importCurveMapperBlendShape(lookAtHorizontalOuter), this._importCurveMapperBlendShape(lookAtVerticalDown), this._importCurveMapperBlendShape(lookAtVerticalUp));
                }
            }
            default: {
                return null;
            }
        }
    };
    VRMLookAtImporter.prototype._importCurveMapperBone = function (map) {
        return new VRMCurveMapper_1.VRMCurveMapper(typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined, typeof map.yRange === 'number' ? DEG2RAD * map.yRange : undefined, map.curve);
    };
    VRMLookAtImporter.prototype._importCurveMapperBlendShape = function (map) {
        return new VRMCurveMapper_1.VRMCurveMapper(typeof map.xRange === 'number' ? DEG2RAD * map.xRange : undefined, map.yRange, map.curve);
    };
    return VRMLookAtImporter;
}());
exports.VRMLookAtImporter = VRMLookAtImporter;


/***/ }),

/***/ "./src/vrm/lookat/index.ts":
/*!*********************************!*\
  !*** ./src/vrm/lookat/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRMCurveMapper */ "./src/vrm/lookat/VRMCurveMapper.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMLookAtApplyer */ "./src/vrm/lookat/VRMLookAtApplyer.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMLookAtBlendShapeApplyer */ "./src/vrm/lookat/VRMLookAtBlendShapeApplyer.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMLookAtBoneApplyer */ "./src/vrm/lookat/VRMLookAtBoneApplyer.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMLookAtHead */ "./src/vrm/lookat/VRMLookAtHead.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMLookAtImporter */ "./src/vrm/lookat/VRMLookAtImporter.ts"), exports);


/***/ }),

/***/ "./src/vrm/material/MToonMaterial.ts":
/*!*******************************************!*\
  !*** ./src/vrm/material/MToonMaterial.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MToonMaterial = exports.MToonMaterialRenderMode = exports.MToonMaterialOutlineWidthMode = exports.MToonMaterialOutlineColorMode = exports.MToonMaterialDebugMode = exports.MToonMaterialCullMode = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var getTexelDecodingFunction_1 = __webpack_require__(/*! ./getTexelDecodingFunction */ "./src/vrm/material/getTexelDecodingFunction.ts");
var mtoon_vert_1 = __webpack_require__(/*! ./shaders/mtoon.vert */ "./src/vrm/material/shaders/mtoon.vert");
var mtoon_frag_1 = __webpack_require__(/*! ./shaders/mtoon.frag */ "./src/vrm/material/shaders/mtoon.frag");
var TAU = 2.0 * Math.PI;
var MToonMaterialCullMode;
(function (MToonMaterialCullMode) {
    MToonMaterialCullMode[MToonMaterialCullMode["Off"] = 0] = "Off";
    MToonMaterialCullMode[MToonMaterialCullMode["Front"] = 1] = "Front";
    MToonMaterialCullMode[MToonMaterialCullMode["Back"] = 2] = "Back";
})(MToonMaterialCullMode = exports.MToonMaterialCullMode || (exports.MToonMaterialCullMode = {}));
var MToonMaterialDebugMode;
(function (MToonMaterialDebugMode) {
    MToonMaterialDebugMode[MToonMaterialDebugMode["None"] = 0] = "None";
    MToonMaterialDebugMode[MToonMaterialDebugMode["Normal"] = 1] = "Normal";
    MToonMaterialDebugMode[MToonMaterialDebugMode["LitShadeRate"] = 2] = "LitShadeRate";
    MToonMaterialDebugMode[MToonMaterialDebugMode["UV"] = 3] = "UV";
})(MToonMaterialDebugMode = exports.MToonMaterialDebugMode || (exports.MToonMaterialDebugMode = {}));
var MToonMaterialOutlineColorMode;
(function (MToonMaterialOutlineColorMode) {
    MToonMaterialOutlineColorMode[MToonMaterialOutlineColorMode["FixedColor"] = 0] = "FixedColor";
    MToonMaterialOutlineColorMode[MToonMaterialOutlineColorMode["MixedLighting"] = 1] = "MixedLighting";
})(MToonMaterialOutlineColorMode = exports.MToonMaterialOutlineColorMode || (exports.MToonMaterialOutlineColorMode = {}));
var MToonMaterialOutlineWidthMode;
(function (MToonMaterialOutlineWidthMode) {
    MToonMaterialOutlineWidthMode[MToonMaterialOutlineWidthMode["None"] = 0] = "None";
    MToonMaterialOutlineWidthMode[MToonMaterialOutlineWidthMode["WorldCoordinates"] = 1] = "WorldCoordinates";
    MToonMaterialOutlineWidthMode[MToonMaterialOutlineWidthMode["ScreenCoordinates"] = 2] = "ScreenCoordinates";
})(MToonMaterialOutlineWidthMode = exports.MToonMaterialOutlineWidthMode || (exports.MToonMaterialOutlineWidthMode = {}));
var MToonMaterialRenderMode;
(function (MToonMaterialRenderMode) {
    MToonMaterialRenderMode[MToonMaterialRenderMode["Opaque"] = 0] = "Opaque";
    MToonMaterialRenderMode[MToonMaterialRenderMode["Cutout"] = 1] = "Cutout";
    MToonMaterialRenderMode[MToonMaterialRenderMode["Transparent"] = 2] = "Transparent";
    MToonMaterialRenderMode[MToonMaterialRenderMode["TransparentWithZWrite"] = 3] = "TransparentWithZWrite";
})(MToonMaterialRenderMode = exports.MToonMaterialRenderMode || (exports.MToonMaterialRenderMode = {}));
var MToonMaterial = (function (_super) {
    __extends(MToonMaterial, _super);
    function MToonMaterial(parameters) {
        if (parameters === void 0) { parameters = {}; }
        var _this = _super.call(this) || this;
        _this.isMToonMaterial = true;
        _this.cutoff = 0.5;
        _this.color = new THREE.Vector4(1.0, 1.0, 1.0, 1.0);
        _this.shadeColor = new THREE.Vector4(0.97, 0.81, 0.86, 1.0);
        _this.map = null;
        _this.mainTex_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0);
        _this.shadeTexture = null;
        _this.normalMap = null;
        _this.normalMapType = THREE.TangentSpaceNormalMap;
        _this.normalScale = new THREE.Vector2(1.0, 1.0);
        _this.receiveShadowRate = 1.0;
        _this.receiveShadowTexture = null;
        _this.shadingGradeRate = 1.0;
        _this.shadingGradeTexture = null;
        _this.shadeShift = 0.0;
        _this.shadeToony = 0.9;
        _this.lightColorAttenuation = 0.0;
        _this.indirectLightIntensity = 0.1;
        _this.rimTexture = null;
        _this.rimColor = new THREE.Vector4(0.0, 0.0, 0.0, 1.0);
        _this.rimLightingMix = 0.0;
        _this.rimFresnelPower = 1.0;
        _this.rimLift = 0.0;
        _this.sphereAdd = null;
        _this.emissionColor = new THREE.Vector4(0.0, 0.0, 0.0, 1.0);
        _this.emissiveMap = null;
        _this.outlineWidthTexture = null;
        _this.outlineWidth = 0.5;
        _this.outlineScaledMaxDistance = 1.0;
        _this.outlineColor = new THREE.Vector4(0.0, 0.0, 0.0, 1.0);
        _this.outlineLightingMix = 1.0;
        _this.uvAnimMaskTexture = null;
        _this.uvAnimScrollX = 0.0;
        _this.uvAnimScrollY = 0.0;
        _this.uvAnimRotation = 0.0;
        _this.shouldApplyUniforms = true;
        _this._debugMode = MToonMaterialDebugMode.None;
        _this._blendMode = MToonMaterialRenderMode.Opaque;
        _this._outlineWidthMode = MToonMaterialOutlineWidthMode.None;
        _this._outlineColorMode = MToonMaterialOutlineColorMode.FixedColor;
        _this._cullMode = MToonMaterialCullMode.Back;
        _this._outlineCullMode = MToonMaterialCullMode.Front;
        _this._isOutline = false;
        _this._uvAnimOffsetX = 0.0;
        _this._uvAnimOffsetY = 0.0;
        _this._uvAnimPhase = 0.0;
        _this.encoding = parameters.encoding || THREE.LinearEncoding;
        if (_this.encoding !== THREE.LinearEncoding && _this.encoding !== THREE.sRGBEncoding) {
            console.warn('The specified color encoding does not work properly with MToonMaterial. You might want to use THREE.sRGBEncoding instead.');
        }
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
        ].forEach(function (key) {
            if (parameters[key] !== undefined) {
                delete parameters[key];
            }
        });
        parameters.fog = true;
        parameters.lights = true;
        parameters.clipping = true;
        parameters.skinning = parameters.skinning || false;
        parameters.morphTargets = parameters.morphTargets || false;
        parameters.morphNormals = parameters.morphNormals || false;
        parameters.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.normalmap,
            THREE.UniformsLib.emissivemap,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            {
                cutoff: { value: 0.5 },
                color: { value: new THREE.Color(1.0, 1.0, 1.0) },
                colorAlpha: { value: 1.0 },
                shadeColor: { value: new THREE.Color(0.97, 0.81, 0.86) },
                mainTex_ST: { value: new THREE.Vector4(0.0, 0.0, 1.0, 1.0) },
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
                rimColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
                rimLightingMix: { value: 0.0 },
                rimFresnelPower: { value: 1.0 },
                rimLift: { value: 0.0 },
                sphereAdd: { value: null },
                emissionColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
                outlineWidthTexture: { value: null },
                outlineWidth: { value: 0.5 },
                outlineScaledMaxDistance: { value: 1.0 },
                outlineColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
                outlineLightingMix: { value: 1.0 },
                uvAnimMaskTexture: { value: null },
                uvAnimOffsetX: { value: 0.0 },
                uvAnimOffsetY: { value: 0.0 },
                uvAnimTheta: { value: 0.0 },
            },
        ]);
        _this.setValues(parameters);
        _this._updateShaderCode();
        _this._applyUniforms();
        return _this;
    }
    Object.defineProperty(MToonMaterial.prototype, "mainTex", {
        get: function () {
            return this.map;
        },
        set: function (t) {
            this.map = t;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "bumpMap", {
        get: function () {
            return this.normalMap;
        },
        set: function (t) {
            this.normalMap = t;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "bumpScale", {
        get: function () {
            return this.normalScale.x;
        },
        set: function (t) {
            this.normalScale.set(t, t);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "emissionMap", {
        get: function () {
            return this.emissiveMap;
        },
        set: function (t) {
            this.emissiveMap = t;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "blendMode", {
        get: function () {
            return this._blendMode;
        },
        set: function (m) {
            this._blendMode = m;
            this.depthWrite = this._blendMode !== MToonMaterialRenderMode.Transparent;
            this.transparent =
                this._blendMode === MToonMaterialRenderMode.Transparent ||
                    this._blendMode === MToonMaterialRenderMode.TransparentWithZWrite;
            this._updateShaderCode();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "debugMode", {
        get: function () {
            return this._debugMode;
        },
        set: function (m) {
            this._debugMode = m;
            this._updateShaderCode();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "outlineWidthMode", {
        get: function () {
            return this._outlineWidthMode;
        },
        set: function (m) {
            this._outlineWidthMode = m;
            this._updateShaderCode();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "outlineColorMode", {
        get: function () {
            return this._outlineColorMode;
        },
        set: function (m) {
            this._outlineColorMode = m;
            this._updateShaderCode();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "cullMode", {
        get: function () {
            return this._cullMode;
        },
        set: function (m) {
            this._cullMode = m;
            this._updateCullFace();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "outlineCullMode", {
        get: function () {
            return this._outlineCullMode;
        },
        set: function (m) {
            this._outlineCullMode = m;
            this._updateCullFace();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "zWrite", {
        get: function () {
            return this.depthWrite ? 1 : 0;
        },
        set: function (i) {
            this.depthWrite = 0.5 <= i;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MToonMaterial.prototype, "isOutline", {
        get: function () {
            return this._isOutline;
        },
        set: function (b) {
            this._isOutline = b;
            this._updateShaderCode();
            this._updateCullFace();
        },
        enumerable: false,
        configurable: true
    });
    MToonMaterial.prototype.updateVRMMaterials = function (delta) {
        this._uvAnimOffsetX = this._uvAnimOffsetX + delta * this.uvAnimScrollX;
        this._uvAnimOffsetY = this._uvAnimOffsetY - delta * this.uvAnimScrollY;
        this._uvAnimPhase = this._uvAnimPhase + delta * this.uvAnimRotation;
        this._applyUniforms();
    };
    MToonMaterial.prototype.copy = function (source) {
        _super.prototype.copy.call(this, source);
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
    };
    MToonMaterial.prototype._applyUniforms = function () {
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
        if (this.encoding === THREE.sRGBEncoding) {
            this.uniforms.color.value.convertSRGBToLinear();
            this.uniforms.shadeColor.value.convertSRGBToLinear();
            this.uniforms.rimColor.value.convertSRGBToLinear();
            this.uniforms.emissionColor.value.convertSRGBToLinear();
            this.uniforms.outlineColor.value.convertSRGBToLinear();
        }
        this._updateCullFace();
    };
    MToonMaterial.prototype._updateShaderCode = function () {
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
        var encodings = (this.shadeTexture !== null
            ? getTexelDecodingFunction_1.getTexelDecodingFunction('shadeTextureTexelToLinear', this.shadeTexture.encoding) + '\n'
            : '') +
            (this.sphereAdd !== null
                ? getTexelDecodingFunction_1.getTexelDecodingFunction('sphereAddTexelToLinear', this.sphereAdd.encoding) + '\n'
                : '') +
            (this.rimTexture !== null
                ? getTexelDecodingFunction_1.getTexelDecodingFunction('rimTextureTexelToLinear', this.rimTexture.encoding) + '\n'
                : '');
        this.vertexShader = mtoon_vert_1.default;
        this.fragmentShader = encodings + mtoon_frag_1.default;
        this.needsUpdate = true;
    };
    MToonMaterial.prototype._updateCullFace = function () {
        if (!this.isOutline) {
            if (this.cullMode === MToonMaterialCullMode.Off) {
                this.side = THREE.DoubleSide;
            }
            else if (this.cullMode === MToonMaterialCullMode.Front) {
                this.side = THREE.BackSide;
            }
            else if (this.cullMode === MToonMaterialCullMode.Back) {
                this.side = THREE.FrontSide;
            }
        }
        else {
            if (this.outlineCullMode === MToonMaterialCullMode.Off) {
                this.side = THREE.DoubleSide;
            }
            else if (this.outlineCullMode === MToonMaterialCullMode.Front) {
                this.side = THREE.BackSide;
            }
            else if (this.outlineCullMode === MToonMaterialCullMode.Back) {
                this.side = THREE.FrontSide;
            }
        }
    };
    return MToonMaterial;
}(THREE.ShaderMaterial));
exports.MToonMaterial = MToonMaterial;


/***/ }),

/***/ "./src/vrm/material/VRMMaterialImporter.ts":
/*!*************************************************!*\
  !*** ./src/vrm/material/VRMMaterialImporter.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMMaterialImporter = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var MToonMaterial_1 = __webpack_require__(/*! ./MToonMaterial */ "./src/vrm/material/MToonMaterial.ts");
var VRMUnlitMaterial_1 = __webpack_require__(/*! ./VRMUnlitMaterial */ "./src/vrm/material/VRMUnlitMaterial.ts");
var VRMMaterialImporter = (function () {
    function VRMMaterialImporter(options) {
        if (options === void 0) { options = {}; }
        this._encoding = options.encoding || THREE.LinearEncoding;
        if (this._encoding !== THREE.LinearEncoding && this._encoding !== THREE.sRGBEncoding) {
            console.warn('The specified color encoding might not work properly with VRMMaterialImporter. You might want to use THREE.sRGBEncoding instead.');
        }
        this._requestEnvMap = options.requestEnvMap;
    }
    VRMMaterialImporter.prototype.convertGLTFMaterials = function (gltf) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, materialProperties, meshesMap, materialList, materials;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt) {
                            return [2, null];
                        }
                        materialProperties = vrmExt.materialProperties;
                        if (!materialProperties) {
                            return [2, null];
                        }
                        return [4, gltf.parser.getDependencies('mesh')];
                    case 1:
                        meshesMap = _b.sent();
                        materialList = {};
                        materials = [];
                        return [4, Promise.all(meshesMap.map(function (mesh, meshIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var schemaMesh, primitives;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            schemaMesh = gltf.parser.json.meshes[meshIndex];
                                            primitives = mesh.type === 'Group' ? mesh.children : [mesh];
                                            return [4, Promise.all(primitives.map(function (primitive, primitiveIndex) { return __awaiter(_this, void 0, void 0, function () {
                                                    var schemaPrimitive, primitiveGeometry, primitiveVertices, vrmMaterialIndex, props, vrmMaterials;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                schemaPrimitive = schemaMesh.primitives[primitiveIndex];
                                                                if (!schemaPrimitive) {
                                                                    return [2];
                                                                }
                                                                primitiveGeometry = primitive.geometry;
                                                                primitiveVertices = primitiveGeometry.index
                                                                    ? primitiveGeometry.index.count
                                                                    : primitiveGeometry.attributes.position.count / 3;
                                                                if (!Array.isArray(primitive.material)) {
                                                                    primitive.material = [primitive.material];
                                                                    primitiveGeometry.addGroup(0, primitiveVertices, 0);
                                                                }
                                                                vrmMaterialIndex = schemaPrimitive.material;
                                                                props = materialProperties[vrmMaterialIndex];
                                                                if (!props) {
                                                                    console.warn("VRMMaterialImporter: There are no material definition for material #" + vrmMaterialIndex + " on VRM extension.");
                                                                    props = { shader: 'VRM_USE_GLTFSHADER' };
                                                                }
                                                                if (!materialList[vrmMaterialIndex]) return [3, 1];
                                                                vrmMaterials = materialList[vrmMaterialIndex];
                                                                return [3, 3];
                                                            case 1: return [4, this.createVRMMaterials(primitive.material[0], props, gltf)];
                                                            case 2:
                                                                vrmMaterials = _a.sent();
                                                                materialList[vrmMaterialIndex] = vrmMaterials;
                                                                materials.push(vrmMaterials.surface);
                                                                if (vrmMaterials.outline) {
                                                                    materials.push(vrmMaterials.outline);
                                                                }
                                                                _a.label = 3;
                                                            case 3:
                                                                primitive.material[0] = vrmMaterials.surface;
                                                                if (this._requestEnvMap && vrmMaterials.surface.isMeshStandardMaterial) {
                                                                    this._requestEnvMap().then(function (envMap) {
                                                                        vrmMaterials.surface.envMap = envMap;
                                                                        vrmMaterials.surface.needsUpdate = true;
                                                                    });
                                                                }
                                                                primitive.renderOrder = props.renderQueue || 2000;
                                                                if (vrmMaterials.outline) {
                                                                    primitive.material[1] = vrmMaterials.outline;
                                                                    primitiveGeometry.addGroup(0, primitiveVertices, 1);
                                                                }
                                                                return [2];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); }))];
                    case 2:
                        _b.sent();
                        return [2, materials];
                }
            });
        });
    };
    VRMMaterialImporter.prototype.createVRMMaterials = function (originalMaterial, vrmProps, gltf) {
        return __awaiter(this, void 0, Promise, function () {
            var newSurface, newOutline, params_1, params, params, params, params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(vrmProps.shader === 'VRM/MToon')) return [3, 2];
                        return [4, this._extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 1:
                        params_1 = _a.sent();
                        ['srcBlend', 'dstBlend', 'isFirstSetup'].forEach(function (name) {
                            if (params_1[name] !== undefined) {
                                delete params_1[name];
                            }
                        });
                        ['mainTex', 'shadeTexture', 'emissionMap', 'sphereAdd', 'rimTexture'].forEach(function (name) {
                            if (params_1[name] !== undefined) {
                                params_1[name].encoding = _this._encoding;
                            }
                        });
                        params_1.encoding = this._encoding;
                        newSurface = new MToonMaterial_1.MToonMaterial(params_1);
                        if (params_1.outlineWidthMode !== MToonMaterial_1.MToonMaterialOutlineWidthMode.None) {
                            params_1.isOutline = true;
                            newOutline = new MToonMaterial_1.MToonMaterial(params_1);
                        }
                        return [3, 11];
                    case 2:
                        if (!(vrmProps.shader === 'VRM/UnlitTexture')) return [3, 4];
                        return [4, this._extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 3:
                        params = _a.sent();
                        params.renderType = VRMUnlitMaterial_1.VRMUnlitMaterialRenderType.Opaque;
                        newSurface = new VRMUnlitMaterial_1.VRMUnlitMaterial(params);
                        return [3, 11];
                    case 4:
                        if (!(vrmProps.shader === 'VRM/UnlitCutout')) return [3, 6];
                        return [4, this._extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 5:
                        params = _a.sent();
                        params.renderType = VRMUnlitMaterial_1.VRMUnlitMaterialRenderType.Cutout;
                        newSurface = new VRMUnlitMaterial_1.VRMUnlitMaterial(params);
                        return [3, 11];
                    case 6:
                        if (!(vrmProps.shader === 'VRM/UnlitTransparent')) return [3, 8];
                        return [4, this._extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 7:
                        params = _a.sent();
                        params.renderType = VRMUnlitMaterial_1.VRMUnlitMaterialRenderType.Transparent;
                        newSurface = new VRMUnlitMaterial_1.VRMUnlitMaterial(params);
                        return [3, 11];
                    case 8:
                        if (!(vrmProps.shader === 'VRM/UnlitTransparentZWrite')) return [3, 10];
                        return [4, this._extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 9:
                        params = _a.sent();
                        params.renderType = VRMUnlitMaterial_1.VRMUnlitMaterialRenderType.TransparentWithZWrite;
                        newSurface = new VRMUnlitMaterial_1.VRMUnlitMaterial(params);
                        return [3, 11];
                    case 10:
                        if (vrmProps.shader !== 'VRM_USE_GLTFSHADER') {
                            console.warn("Unknown shader detected: \"" + vrmProps.shader + "\"");
                        }
                        newSurface = this._convertGLTFMaterial(originalMaterial.clone());
                        _a.label = 11;
                    case 11:
                        newSurface.name = originalMaterial.name;
                        newSurface.userData = JSON.parse(JSON.stringify(originalMaterial.userData));
                        newSurface.userData.vrmMaterialProperties = vrmProps;
                        if (newOutline) {
                            newOutline.name = originalMaterial.name + ' (Outline)';
                            newOutline.userData = JSON.parse(JSON.stringify(originalMaterial.userData));
                            newOutline.userData.vrmMaterialProperties = vrmProps;
                        }
                        return [2, {
                                surface: newSurface,
                                outline: newOutline,
                            }];
                }
            });
        });
    };
    VRMMaterialImporter.prototype._renameMaterialProperty = function (name) {
        if (name[0] !== '_') {
            console.warn("VRMMaterials: Given property name \"" + name + "\" might be invalid");
            return name;
        }
        name = name.substring(1);
        if (!/[A-Z]/.test(name[0])) {
            console.warn("VRMMaterials: Given property name \"" + name + "\" might be invalid");
            return name;
        }
        return name[0].toLowerCase() + name.substring(1);
    };
    VRMMaterialImporter.prototype._convertGLTFMaterial = function (material) {
        if (material.isMeshStandardMaterial) {
            var mtl = material;
            if (mtl.map) {
                mtl.map.encoding = this._encoding;
            }
            if (mtl.emissiveMap) {
                mtl.emissiveMap.encoding = this._encoding;
            }
            if (this._encoding === THREE.LinearEncoding) {
                mtl.color.convertLinearToSRGB();
                mtl.emissive.convertLinearToSRGB();
            }
        }
        if (material.isMeshBasicMaterial) {
            var mtl = material;
            if (mtl.map) {
                mtl.map.encoding = this._encoding;
            }
            if (this._encoding === THREE.LinearEncoding) {
                mtl.color.convertLinearToSRGB();
            }
        }
        return material;
    };
    VRMMaterialImporter.prototype._extractMaterialProperties = function (originalMaterial, vrmProps, gltf) {
        var taskList = [];
        var params = {};
        if (vrmProps.textureProperties) {
            var _loop_1 = function (name) {
                var newName = this_1._renameMaterialProperty(name);
                var textureIndex = vrmProps.textureProperties[name];
                taskList.push(gltf.parser.getDependency('texture', textureIndex).then(function (texture) {
                    params[newName] = texture;
                }));
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(vrmProps.textureProperties); _i < _a.length; _i++) {
                var name = _a[_i];
                _loop_1(name);
            }
        }
        if (vrmProps.floatProperties) {
            for (var _b = 0, _c = Object.keys(vrmProps.floatProperties); _b < _c.length; _b++) {
                var name = _c[_b];
                var newName = this._renameMaterialProperty(name);
                params[newName] = vrmProps.floatProperties[name];
            }
        }
        if (vrmProps.vectorProperties) {
            var _loop_2 = function (name) {
                var _a;
                var newName = this_2._renameMaterialProperty(name);
                var isTextureST = [
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
                ].some(function (textureName) { return name === textureName; });
                if (isTextureST) {
                    newName += '_ST';
                }
                params[newName] = new ((_a = THREE.Vector4).bind.apply(_a, __spreadArrays([void 0], vrmProps.vectorProperties[name])))();
            };
            var this_2 = this;
            for (var _d = 0, _e = Object.keys(vrmProps.vectorProperties); _d < _e.length; _d++) {
                var name = _e[_d];
                _loop_2(name);
            }
        }
        if (vrmProps.keywordMap._ALPHATEST_ON && params.blendMode === MToonMaterial_1.MToonMaterialRenderMode.Opaque) {
            params.blendMode = MToonMaterial_1.MToonMaterialRenderMode.Cutout;
        }
        params.skinning = originalMaterial.skinning || false;
        params.morphTargets = originalMaterial.morphTargets || false;
        params.morphNormals = originalMaterial.morphNormals || false;
        return Promise.all(taskList).then(function () { return params; });
    };
    return VRMMaterialImporter;
}());
exports.VRMMaterialImporter = VRMMaterialImporter;


/***/ }),

/***/ "./src/vrm/material/VRMUnlitMaterial.ts":
/*!**********************************************!*\
  !*** ./src/vrm/material/VRMUnlitMaterial.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMUnlitMaterial = exports.VRMUnlitMaterialRenderType = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var unlit_vert_1 = __webpack_require__(/*! ./shaders/unlit.vert */ "./src/vrm/material/shaders/unlit.vert");
var unlit_frag_1 = __webpack_require__(/*! ./shaders/unlit.frag */ "./src/vrm/material/shaders/unlit.frag");
var VRMUnlitMaterialRenderType;
(function (VRMUnlitMaterialRenderType) {
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["Opaque"] = 0] = "Opaque";
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["Cutout"] = 1] = "Cutout";
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["Transparent"] = 2] = "Transparent";
    VRMUnlitMaterialRenderType[VRMUnlitMaterialRenderType["TransparentWithZWrite"] = 3] = "TransparentWithZWrite";
})(VRMUnlitMaterialRenderType = exports.VRMUnlitMaterialRenderType || (exports.VRMUnlitMaterialRenderType = {}));
var VRMUnlitMaterial = (function (_super) {
    __extends(VRMUnlitMaterial, _super);
    function VRMUnlitMaterial(parameters) {
        var _this = _super.call(this) || this;
        _this.isVRMUnlitMaterial = true;
        _this.cutoff = 0.5;
        _this.map = null;
        _this.mainTex_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0);
        _this._renderType = VRMUnlitMaterialRenderType.Opaque;
        _this.shouldApplyUniforms = true;
        if (parameters === undefined) {
            parameters = {};
        }
        parameters.fog = true;
        parameters.clipping = true;
        parameters.skinning = parameters.skinning || false;
        parameters.morphTargets = parameters.morphTargets || false;
        parameters.morphNormals = parameters.morphNormals || false;
        parameters.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.fog,
            {
                cutoff: { value: 0.5 },
                mainTex_ST: { value: new THREE.Vector4(0.0, 0.0, 1.0, 1.0) },
            },
        ]);
        _this.setValues(parameters);
        _this._updateShaderCode();
        _this._applyUniforms();
        return _this;
    }
    Object.defineProperty(VRMUnlitMaterial.prototype, "mainTex", {
        get: function () {
            return this.map;
        },
        set: function (t) {
            this.map = t;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VRMUnlitMaterial.prototype, "renderType", {
        get: function () {
            return this._renderType;
        },
        set: function (t) {
            this._renderType = t;
            this.depthWrite = this._renderType !== VRMUnlitMaterialRenderType.Transparent;
            this.transparent =
                this._renderType === VRMUnlitMaterialRenderType.Transparent ||
                    this._renderType === VRMUnlitMaterialRenderType.TransparentWithZWrite;
            this._updateShaderCode();
        },
        enumerable: false,
        configurable: true
    });
    VRMUnlitMaterial.prototype.updateVRMMaterials = function (delta) {
        this._applyUniforms();
    };
    VRMUnlitMaterial.prototype.copy = function (source) {
        _super.prototype.copy.call(this, source);
        this.cutoff = source.cutoff;
        this.map = source.map;
        this.mainTex_ST.copy(source.mainTex_ST);
        this.renderType = source.renderType;
        return this;
    };
    VRMUnlitMaterial.prototype._applyUniforms = function () {
        if (!this.shouldApplyUniforms) {
            return;
        }
        this.shouldApplyUniforms = false;
        this.uniforms.cutoff.value = this.cutoff;
        this.uniforms.map.value = this.map;
        this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
    };
    VRMUnlitMaterial.prototype._updateShaderCode = function () {
        this.defines = {
            RENDERTYPE_OPAQUE: this._renderType === VRMUnlitMaterialRenderType.Opaque,
            RENDERTYPE_CUTOUT: this._renderType === VRMUnlitMaterialRenderType.Cutout,
            RENDERTYPE_TRANSPARENT: this._renderType === VRMUnlitMaterialRenderType.Transparent ||
                this._renderType === VRMUnlitMaterialRenderType.TransparentWithZWrite,
        };
        this.vertexShader = unlit_vert_1.default;
        this.fragmentShader = unlit_frag_1.default;
        this.needsUpdate = true;
    };
    return VRMUnlitMaterial;
}(THREE.ShaderMaterial));
exports.VRMUnlitMaterial = VRMUnlitMaterial;


/***/ }),

/***/ "./src/vrm/material/getTexelDecodingFunction.ts":
/*!******************************************************!*\
  !*** ./src/vrm/material/getTexelDecodingFunction.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTexelDecodingFunction = exports.getEncodingComponents = void 0;
var THREE = __webpack_require__(/*! three */ "three");
exports.getEncodingComponents = function (encoding) {
    switch (encoding) {
        case THREE.LinearEncoding:
            return ['Linear', '( value )'];
        case THREE.sRGBEncoding:
            return ['sRGB', '( value )'];
        case THREE.RGBEEncoding:
            return ['RGBE', '( value )'];
        case THREE.RGBM7Encoding:
            return ['RGBM', '( value, 7.0 )'];
        case THREE.RGBM16Encoding:
            return ['RGBM', '( value, 16.0 )'];
        case THREE.RGBDEncoding:
            return ['RGBD', '( value, 256.0 )'];
        case THREE.GammaEncoding:
            return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
        default:
            throw new Error('unsupported encoding: ' + encoding);
    }
};
exports.getTexelDecodingFunction = function (functionName, encoding) {
    var components = exports.getEncodingComponents(encoding);
    return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
};


/***/ }),

/***/ "./src/vrm/material/index.ts":
/*!***********************************!*\
  !*** ./src/vrm/material/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./MToonMaterial */ "./src/vrm/material/MToonMaterial.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMMaterialImporter */ "./src/vrm/material/VRMMaterialImporter.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMUnlitMaterial */ "./src/vrm/material/VRMUnlitMaterial.ts"), exports);


/***/ }),

/***/ "./src/vrm/material/shaders/mtoon.frag":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/mtoon.frag ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// #define PHONG\n\n#ifdef BLENDMODE_CUTOUT\n  uniform float cutoff;\n#endif\n\nuniform vec3 color;\nuniform float colorAlpha;\nuniform vec3 shadeColor;\n#ifdef USE_SHADETEXTURE\n  uniform sampler2D shadeTexture;\n#endif\n\nuniform float receiveShadowRate;\n#ifdef USE_RECEIVESHADOWTEXTURE\n  uniform sampler2D receiveShadowTexture;\n#endif\n\nuniform float shadingGradeRate;\n#ifdef USE_SHADINGGRADETEXTURE\n  uniform sampler2D shadingGradeTexture;\n#endif\n\nuniform float shadeShift;\nuniform float shadeToony;\nuniform float lightColorAttenuation;\nuniform float indirectLightIntensity;\n\n#ifdef USE_RIMTEXTURE\n  uniform sampler2D rimTexture;\n#endif\nuniform vec3 rimColor;\nuniform float rimLightingMix;\nuniform float rimFresnelPower;\nuniform float rimLift;\n\n#ifdef USE_SPHEREADD\n  uniform sampler2D sphereAdd;\n#endif\n\nuniform vec3 emissionColor;\n\nuniform vec3 outlineColor;\nuniform float outlineLightingMix;\n\n#ifdef USE_UVANIMMASKTEXTURE\n  uniform sampler2D uvAnimMaskTexture;\n#endif\n\nuniform float uvAnimOffsetX;\nuniform float uvAnimOffsetY;\nuniform float uvAnimTheta;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n  varying vec2 vUv;\n#endif\n\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n\n  uniform sampler2D normalMap;\n  uniform vec2 normalScale;\n\n#endif\n\n#ifdef OBJECTSPACE_NORMALMAP\n\n  uniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && defined ( TANGENTSPACE_NORMALMAP )\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  // three-vrm specific change: it requires `uv` as an input in order to support uv scrolls\n\n  vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN ) {\n\n    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n    vec2 st0 = dFdx( uv.st );\n    vec2 st1 = dFdy( uv.st );\n\n    float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n    vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;\n    vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;\n\n    // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0\n    // TODO: Is this still required? Or shall I make a PR about it?\n\n    if ( length( S ) == 0.0 || length( T ) == 0.0 ) {\n      return surf_norm;\n    }\n\n    S = normalize( S );\n    T = normalize( T );\n    vec3 N = normalize( surf_norm );\n\n    #ifdef DOUBLE_SIDED\n\n      // Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331\n\n      bool frontFacing = dot( cross( S, T ), N ) > 0.0;\n\n      mapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );\n\n    #else\n\n      mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n    #endif\n\n    mat3 tsn = mat3( S, T, N );\n    return normalize( tsn * mapN );\n\n  }\n\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == lighting stuff ===========================================================\nfloat getLightIntensity(\n  const in IncidentLight directLight,\n  const in GeometricContext geometry,\n  const in float shadow,\n  const in float shadingGrade\n) {\n  float lightIntensity = dot( geometry.normal, directLight.direction );\n  lightIntensity = 0.5 + 0.5 * lightIntensity;\n  lightIntensity = lightIntensity * shadow;\n  lightIntensity = lightIntensity * shadingGrade;\n  lightIntensity = lightIntensity * 2.0 - 1.0;\n  return shadeToony == 1.0\n    ? step( shadeShift, lightIntensity )\n    : smoothstep( shadeShift, shadeShift + ( 1.0 - shadeToony ), lightIntensity );\n}\n\nvec3 getLighting( const in vec3 lightColor ) {\n  vec3 lighting = lightColor;\n  lighting = mix(\n    lighting,\n    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),\n    lightColorAttenuation\n  );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    lighting *= PI;\n  #endif\n\n  return lighting;\n}\n\nvec3 getDiffuse(\n  const in vec3 lit,\n  const in vec3 shade,\n  const in float lightIntensity,\n  const in vec3 lighting\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Diffuse_Lambert( lightIntensity * lighting ) );\n  #endif\n\n  return lighting * BRDF_Diffuse_Lambert( mix( shade, lit, lightIntensity ) );\n}\n\nvec3 calcDirectDiffuse(\n  const in vec2 uv,\n  const in vec3 lit,\n  const in vec3 shade,\n  in GeometricContext geometry,\n  inout ReflectedLight reflectedLight\n) {\n  IncidentLight directLight;\n  vec3 lightingSum = vec3( 0.0 );\n\n  float shadingGrade = 1.0;\n  #ifdef USE_SHADINGGRADETEXTURE\n    shadingGrade = 1.0 - shadingGradeRate * ( 1.0 - texture2D( shadingGradeTexture, uv ).r );\n  #endif\n\n  float receiveShadow = receiveShadowRate;\n  #ifdef USE_RECEIVESHADOWTEXTURE\n    receiveShadow *= texture2D( receiveShadowTexture, uv ).a;\n  #endif\n\n  #if ( NUM_POINT_LIGHTS > 0 )\n    PointLight pointLight;\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n      pointLight = pointLights[ i ];\n      getPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 )\n    SpotLight spotLight;\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n      spotLight = spotLights[ i ];\n      getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 )\n    DirectionalLight directionalLight;\n\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n      directionalLight = directionalLights[ i ];\n      getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  return lightingSum;\n}\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec2 uv = vec2(0.5, 0.5);\n\n  #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n    uv = vUv;\n\n    float uvAnimMask = 1.0;\n    #ifdef USE_UVANIMMASKTEXTURE\n      uvAnimMask = texture2D( uvAnimMaskTexture, uv ).x;\n    #endif\n\n    uv = uv + vec2( uvAnimOffsetX, uvAnimOffsetY ) * uvAnimMask;\n    float uvRotCos = cos( uvAnimTheta * uvAnimMask );\n    float uvRotSin = sin( uvAnimTheta * uvAnimMask );\n    uv = mat2( uvRotCos, uvRotSin, -uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;\n  #endif\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n      gl_FragColor = vec4( uv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( color, colorAlpha );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissionColor;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, uv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // -- MToon: alpha -----------------------------------------------------------\n  // #include <alphatest_fragment>\n  #ifdef BLENDMODE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef BLENDMODE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode\n    gl_FragColor = vec4( outlineColor, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // #include <specularmap_fragment>\n  #include <normal_fragment_begin>\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  // #include <normal_fragment_maps>\n\n  #ifdef OBJECTSPACE_NORMALMAP\n\n    normal = texture2D( normalMap, uv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n    #ifdef FLIP_SIDED\n\n      normal = - normal;\n\n    #endif\n\n    #ifdef DOUBLE_SIDED\n\n      normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n    #endif\n\n    normal = normalize( normalMatrix * normal );\n\n  #elif defined( TANGENTSPACE_NORMALMAP )\n\n    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;\n    mapN.xy *= normalScale;\n\n    #ifdef USE_TANGENT\n\n      normal = normalize( vTBN * mapN );\n\n    #else\n\n      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN );\n\n    #endif\n\n  #endif\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, uv ) ).rgb;\n  #endif\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  // #include <lights_fragment_begin>\n  vec3 lit = diffuseColor.rgb;\n  vec3 shade = shadeColor;\n  #ifdef USE_SHADETEXTURE\n    shade *= shadeTextureTexelToLinear( texture2D( shadeTexture, uv ) ).rgb;\n  #endif\n\n  GeometricContext geometry;\n\n  geometry.position = - vViewPosition;\n  geometry.normal = normal;\n  geometry.viewDir = normalize( vViewPosition );\n\n  vec3 lighting = calcDirectDiffuse( uv, diffuseColor.rgb, shade, geometry, reflectedLight );\n\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n  #if ( NUM_HEMI_LIGHTS > 0 )\n    #pragma unroll_loop_start\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n    }\n    #pragma unroll_loop_end\n  #endif\n\n  // #include <lights_fragment_maps>\n  #ifdef USE_LIGHTMAP\n    vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).rgb * lightMapIntensity;\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n    #endif\n    irradiance += lightMapIrradiance;\n  #endif\n\n  // #include <lights_fragment_end>\n  reflectedLight.indirectDiffuse += indirectLightIntensity * irradiance * BRDF_Diffuse_Lambert( lit );\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED )\n    gl_FragColor = vec4(\n      outlineColor.rgb * mix( vec3( 1.0 ), col, outlineLightingMix ),\n      diffuseColor.a\n    );\n    postCorrection();\n    return;\n  #endif\n\n  #ifdef DEBUG_LITSHADERATE\n    gl_FragColor = vec4( col, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: parametric rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n  vec3 rimMix = mix(vec3(1.0), lighting + indirectLightIntensity * irradiance, rimLightingMix);\n  vec3 rim = rimColor * pow( saturate( 1.0 - dot( viewDir, normal ) + rimLift ), rimFresnelPower );\n  #ifdef USE_RIMTEXTURE\n    rim *= rimTextureTexelToLinear( texture2D( rimTexture, uv ) ).rgb;\n  #endif\n  col += rim;\n\n  // -- MToon: additive matcap -------------------------------------------------\n  #ifdef USE_SPHEREADD\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      vec3 matcap = sphereAddTexelToLinear( texture2D( sphereAdd, sphereUv ) ).xyz;\n      col += matcap;\n    }\n  #endif\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}");

/***/ }),

/***/ "./src/vrm/material/shaders/mtoon.vert":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/mtoon.vert ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n  varying vec2 vUv;\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHTEXTURE\n  uniform sampler2D outlineWidthTexture;\n#endif\n\nuniform float outlineWidth;\nuniform float outlineScaledMaxDistance;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE ) || defined( USE_UVANIMMASKTEXTURE )\n    vUv = vec2( mainTex_ST.p * uv.x + mainTex_ST.s, mainTex_ST.q * uv.y + mainTex_ST.t );\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n\n  // we need this to compute the outline properly\n  objectNormal = normalize( objectNormal );\n\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  float outlineTex = 1.0;\n\n  #ifdef OUTLINE\n    #ifdef USE_OUTLINEWIDTHTEXTURE\n      outlineTex = texture2D( outlineWidthTexture, vUv ).r;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_WORLD\n      float worldNormalLength = length( transformedNormal );\n      vec3 outlineOffset = 0.01 * outlineWidth * outlineTex * worldNormalLength * objectNormal;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n      vec2 projectedNormal = normalize( clipNormal.xy );\n      projectedNormal *= min( gl_Position.w, outlineScaledMaxDistance );\n      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;\n      gl_Position.xy += 0.01 * outlineWidth * outlineTex * projectedNormal.xy;\n    #endif\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}");

/***/ }),

/***/ "./src/vrm/material/shaders/unlit.frag":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/unlit.frag ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#ifdef RENDERTYPE_CUTOUT\n  uniform float cutoff;\n#endif\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n// #include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n// #include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec4 diffuseColor = vec4( 1.0 );\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, vUv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // MToon: alpha\n  // #include <alphatest_fragment>\n  #ifdef RENDERTYPE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef RENDERTYPE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  // #include <specularmap_fragment>\n\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n  // accumulation (baked indirect lighting only)\n  #ifdef USE_LIGHTMAP\n    reflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n  #else\n    reflectedLight.indirectDiffuse += vec3( 1.0 );\n  #endif\n\n  // modulation\n  // #include <aomap_fragment>\n\n  reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n  vec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n  // #include <envmap_fragment>\n\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n  #include <premultiplied_alpha_fragment>\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n}");

/***/ }),

/***/ "./src/vrm/material/shaders/unlit.vert":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/unlit.vert ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef USE_MAP\n    vUv = vec2( mainTex_ST.p * uv.x + mainTex_ST.s, mainTex_ST.q * uv.y + mainTex_ST.t );\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n  #include <skinbase_vertex>\n\n  #ifdef USE_ENVMAP\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n\n  #endif\n\n  #include <begin_vertex>\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n\n  #include <worldpos_vertex>\n  #include <clipping_planes_vertex>\n  #include <envmap_vertex>\n  #include <fog_vertex>\n\n}");

/***/ }),

/***/ "./src/vrm/meta/VRMMeta.ts":
/*!*********************************!*\
  !*** ./src/vrm/meta/VRMMeta.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/meta/VRMMetaImporter.ts":
/*!*****************************************!*\
  !*** ./src/vrm/meta/VRMMetaImporter.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMMetaImporter = void 0;
var VRMMetaImporter = (function () {
    function VRMMetaImporter(options) {
        var _a;
        this.ignoreTexture = (_a = options === null || options === void 0 ? void 0 : options.ignoreTexture) !== null && _a !== void 0 ? _a : false;
    }
    VRMMetaImporter.prototype.import = function (gltf) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, schemaMeta, texture;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt) {
                            return [2, null];
                        }
                        schemaMeta = vrmExt.meta;
                        if (!schemaMeta) {
                            return [2, null];
                        }
                        if (!(!this.ignoreTexture && schemaMeta.texture != null && schemaMeta.texture !== -1)) return [3, 2];
                        return [4, gltf.parser.getDependency('texture', schemaMeta.texture)];
                    case 1:
                        texture = _b.sent();
                        _b.label = 2;
                    case 2: return [2, {
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
                        }];
                }
            });
        });
    };
    return VRMMetaImporter;
}());
exports.VRMMetaImporter = VRMMetaImporter;


/***/ }),

/***/ "./src/vrm/meta/VRMMetaImporterOptions.ts":
/*!************************************************!*\
  !*** ./src/vrm/meta/VRMMetaImporterOptions.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/meta/index.ts":
/*!*******************************!*\
  !*** ./src/vrm/meta/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMMetaImporterOptions = exports.VRMMetaImporter = exports.VRMMeta = void 0;
var VRMMeta_1 = __webpack_require__(/*! ./VRMMeta */ "./src/vrm/meta/VRMMeta.ts");
Object.defineProperty(exports, "VRMMeta", { enumerable: true, get: function () { return VRMMeta_1.VRMMeta; } });
var VRMMetaImporter_1 = __webpack_require__(/*! ./VRMMetaImporter */ "./src/vrm/meta/VRMMetaImporter.ts");
Object.defineProperty(exports, "VRMMetaImporter", { enumerable: true, get: function () { return VRMMetaImporter_1.VRMMetaImporter; } });
var VRMMetaImporterOptions_1 = __webpack_require__(/*! ./VRMMetaImporterOptions */ "./src/vrm/meta/VRMMetaImporterOptions.ts");
Object.defineProperty(exports, "VRMMetaImporterOptions", { enumerable: true, get: function () { return VRMMetaImporterOptions_1.VRMMetaImporterOptions; } });


/***/ }),

/***/ "./src/vrm/springbone/VRMSpringBone.ts":
/*!*********************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBone.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSpringBone = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
var Matrix4InverseCache_1 = __webpack_require__(/*! ../utils/Matrix4InverseCache */ "./src/vrm/utils/Matrix4InverseCache.ts");
var IDENTITY_MATRIX4 = Object.freeze(new THREE.Matrix4());
var IDENTITY_QUATERNION = Object.freeze(new THREE.Quaternion());
var _v3A = new THREE.Vector3();
var _v3B = new THREE.Vector3();
var _v3C = new THREE.Vector3();
var _quatA = new THREE.Quaternion();
var _matA = new THREE.Matrix4();
var _matB = new THREE.Matrix4();
var VRMSpringBone = (function () {
    function VRMSpringBone(bone, params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c, _d, _e, _f;
        this._currentTail = new THREE.Vector3();
        this._prevTail = new THREE.Vector3();
        this._nextTail = new THREE.Vector3();
        this._boneAxis = new THREE.Vector3();
        this._centerSpacePosition = new THREE.Vector3();
        this._center = null;
        this._parentWorldRotation = new THREE.Quaternion();
        this._initialLocalMatrix = new THREE.Matrix4();
        this._initialLocalRotation = new THREE.Quaternion();
        this._initialLocalChildPosition = new THREE.Vector3();
        this.bone = bone;
        this.bone.matrixAutoUpdate = false;
        this.radius = (_a = params.radius) !== null && _a !== void 0 ? _a : 0.02;
        this.stiffnessForce = (_b = params.stiffnessForce) !== null && _b !== void 0 ? _b : 1.0;
        this.gravityDir = params.gravityDir
            ? new THREE.Vector3().copy(params.gravityDir)
            : new THREE.Vector3().set(0.0, -1.0, 0.0);
        this.gravityPower = (_c = params.gravityPower) !== null && _c !== void 0 ? _c : 0.0;
        this.dragForce = (_d = params.dragForce) !== null && _d !== void 0 ? _d : 0.4;
        this.colliders = (_e = params.colliders) !== null && _e !== void 0 ? _e : [];
        this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
        this._initialLocalMatrix.copy(this.bone.matrix);
        this._initialLocalRotation.copy(this.bone.quaternion);
        if (this.bone.children.length === 0) {
            this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(0.07);
        }
        else {
            var firstChild = this.bone.children[0];
            this._initialLocalChildPosition.copy(firstChild.position);
        }
        this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
        this._prevTail.copy(this._currentTail);
        this._nextTail.copy(this._currentTail);
        this._boneAxis.copy(this._initialLocalChildPosition).normalize();
        this._centerSpaceBoneLength = _v3A
            .copy(this._initialLocalChildPosition)
            .applyMatrix4(this.bone.matrixWorld)
            .sub(this._centerSpacePosition)
            .length();
        this.center = (_f = params.center) !== null && _f !== void 0 ? _f : null;
    }
    Object.defineProperty(VRMSpringBone.prototype, "center", {
        get: function () {
            return this._center;
        },
        set: function (center) {
            var _a;
            this._getMatrixCenterToWorld(_matA);
            this._currentTail.applyMatrix4(_matA);
            this._prevTail.applyMatrix4(_matA);
            this._nextTail.applyMatrix4(_matA);
            if ((_a = this._center) === null || _a === void 0 ? void 0 : _a.userData.inverseCacheProxy) {
                this._center.userData.inverseCacheProxy.revert();
                delete this._center.userData.inverseCacheProxy;
            }
            this._center = center;
            if (this._center) {
                if (!this._center.userData.inverseCacheProxy) {
                    this._center.userData.inverseCacheProxy = new Matrix4InverseCache_1.Matrix4InverseCache(this._center.matrixWorld);
                }
            }
            this._getMatrixWorldToCenter(_matA);
            this._currentTail.applyMatrix4(_matA);
            this._prevTail.applyMatrix4(_matA);
            this._nextTail.applyMatrix4(_matA);
            _matA.multiply(this.bone.matrixWorld);
            this._centerSpacePosition.setFromMatrixPosition(_matA);
            this._centerSpaceBoneLength = _v3A
                .copy(this._initialLocalChildPosition)
                .applyMatrix4(_matA)
                .sub(this._centerSpacePosition)
                .length();
        },
        enumerable: false,
        configurable: true
    });
    VRMSpringBone.prototype.reset = function () {
        this.bone.quaternion.copy(this._initialLocalRotation);
        this.bone.updateMatrix();
        this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
        this._centerSpacePosition.setFromMatrixPosition(this.bone.matrixWorld);
        this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition));
        this._prevTail.copy(this._currentTail);
        this._nextTail.copy(this._currentTail);
    };
    VRMSpringBone.prototype.update = function (delta) {
        if (delta <= 0)
            return;
        this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
        if (this.bone.parent) {
            math_1.getWorldQuaternionLite(this.bone.parent, this._parentWorldRotation);
        }
        else {
            this._parentWorldRotation.copy(IDENTITY_QUATERNION);
        }
        this._getMatrixWorldToCenter(_matA);
        _matA.multiply(this.bone.matrixWorld);
        this._centerSpacePosition.setFromMatrixPosition(_matA);
        this._getMatrixWorldToCenter(_matB);
        _matB.multiply(this._getParentMatrixWorld());
        var stiffness = this.stiffnessForce * delta;
        var external = _v3B.copy(this.gravityDir).multiplyScalar(this.gravityPower * delta);
        this._nextTail
            .copy(this._currentTail)
            .add(_v3A
            .copy(this._currentTail)
            .sub(this._prevTail)
            .multiplyScalar(1 - this.dragForce))
            .add(_v3A
            .copy(this._boneAxis)
            .applyMatrix4(this._initialLocalMatrix)
            .applyMatrix4(_matB)
            .sub(this._centerSpacePosition)
            .normalize()
            .multiplyScalar(stiffness))
            .add(external);
        this._nextTail
            .sub(this._centerSpacePosition)
            .normalize()
            .multiplyScalar(this._centerSpaceBoneLength)
            .add(this._centerSpacePosition);
        this._collision(this._nextTail);
        this._prevTail.copy(this._currentTail);
        this._currentTail.copy(this._nextTail);
        var initialCenterSpaceMatrixInv = _matA.getInverse(_matB.multiply(this._initialLocalMatrix));
        var applyRotation = _quatA.setFromUnitVectors(this._boneAxis, _v3A.copy(this._nextTail).applyMatrix4(initialCenterSpaceMatrixInv).normalize());
        this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);
        this.bone.updateMatrix();
        this.bone.matrixWorld.multiplyMatrices(this._getParentMatrixWorld(), this.bone.matrix);
    };
    VRMSpringBone.prototype._collision = function (tail) {
        var _this = this;
        this.colliders.forEach(function (collider) {
            _this._getMatrixWorldToCenter(_matA);
            _matA.multiply(collider.matrixWorld);
            var colliderCenterSpacePosition = _v3A.setFromMatrixPosition(_matA);
            var colliderRadius = collider.geometry.boundingSphere.radius;
            var r = _this.radius + colliderRadius;
            if (tail.distanceToSquared(colliderCenterSpacePosition) <= r * r) {
                var normal = _v3B.subVectors(tail, colliderCenterSpacePosition).normalize();
                var posFromCollider = _v3C.addVectors(colliderCenterSpacePosition, normal.multiplyScalar(r));
                tail.copy(posFromCollider
                    .sub(_this._centerSpacePosition)
                    .normalize()
                    .multiplyScalar(_this._centerSpaceBoneLength)
                    .add(_this._centerSpacePosition));
            }
        });
    };
    VRMSpringBone.prototype._getMatrixCenterToWorld = function (target) {
        if (this._center) {
            target.copy(this._center.matrixWorld);
        }
        else {
            target.identity();
        }
        return target;
    };
    VRMSpringBone.prototype._getMatrixWorldToCenter = function (target) {
        if (this._center) {
            target.copy(this._center.userData.inverseCacheProxy.inverse);
        }
        else {
            target.identity();
        }
        return target;
    };
    VRMSpringBone.prototype._getParentMatrixWorld = function () {
        return this.bone.parent ? this.bone.parent.matrixWorld : IDENTITY_MATRIX4;
    };
    return VRMSpringBone;
}());
exports.VRMSpringBone = VRMSpringBone;


/***/ }),

/***/ "./src/vrm/springbone/VRMSpringBoneColliderGroup.ts":
/*!**********************************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBoneColliderGroup.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/springbone/VRMSpringBoneImporter.ts":
/*!*****************************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBoneImporter.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSpringBoneImporter = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var VRMSpringBone_1 = __webpack_require__(/*! ./VRMSpringBone */ "./src/vrm/springbone/VRMSpringBone.ts");
var VRMSpringBoneManager_1 = __webpack_require__(/*! ./VRMSpringBoneManager */ "./src/vrm/springbone/VRMSpringBoneManager.ts");
var _v3A = new THREE.Vector3();
var _colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
var VRMSpringBoneImporter = (function () {
    function VRMSpringBoneImporter() {
    }
    VRMSpringBoneImporter.prototype.import = function (gltf) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var vrmExt, schemaSecondaryAnimation, colliderGroups, springBoneGroupList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vrmExt = (_a = gltf.parser.json.extensions) === null || _a === void 0 ? void 0 : _a.VRM;
                        if (!vrmExt)
                            return [2, null];
                        schemaSecondaryAnimation = vrmExt.secondaryAnimation;
                        if (!schemaSecondaryAnimation)
                            return [2, null];
                        return [4, this._importColliderMeshGroups(gltf, schemaSecondaryAnimation)];
                    case 1:
                        colliderGroups = _b.sent();
                        return [4, this._importSpringBoneGroupList(gltf, schemaSecondaryAnimation, colliderGroups)];
                    case 2:
                        springBoneGroupList = _b.sent();
                        return [2, new VRMSpringBoneManager_1.VRMSpringBoneManager(colliderGroups, springBoneGroupList)];
                }
            });
        });
    };
    VRMSpringBoneImporter.prototype._createSpringBone = function (bone, params) {
        if (params === void 0) { params = {}; }
        return new VRMSpringBone_1.VRMSpringBone(bone, params);
    };
    VRMSpringBoneImporter.prototype._importSpringBoneGroupList = function (gltf, schemaSecondaryAnimation, colliderGroups) {
        return __awaiter(this, void 0, Promise, function () {
            var springBoneGroups, springBoneGroupList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        springBoneGroups = schemaSecondaryAnimation.boneGroups || [];
                        springBoneGroupList = [];
                        return [4, Promise.all(springBoneGroups.map(function (vrmBoneGroup) { return __awaiter(_this, void 0, void 0, function () {
                                var stiffnessForce, gravityDir, gravityPower, dragForce, radius, colliders, springBoneGroup;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
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
                                                return [2];
                                            }
                                            stiffnessForce = vrmBoneGroup.stiffiness;
                                            gravityDir = new THREE.Vector3(vrmBoneGroup.gravityDir.x, vrmBoneGroup.gravityDir.y, -vrmBoneGroup.gravityDir.z);
                                            gravityPower = vrmBoneGroup.gravityPower;
                                            dragForce = vrmBoneGroup.dragForce;
                                            radius = vrmBoneGroup.hitRadius;
                                            colliders = [];
                                            vrmBoneGroup.colliderGroups.forEach(function (colliderIndex) {
                                                colliders.push.apply(colliders, colliderGroups[colliderIndex].colliders);
                                            });
                                            springBoneGroup = [];
                                            return [4, Promise.all(vrmBoneGroup.bones.map(function (nodeIndex) { return __awaiter(_this, void 0, void 0, function () {
                                                    var springRootBone, center, _a;
                                                    var _this = this;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0: return [4, gltf.parser.getDependency('node', nodeIndex)];
                                                            case 1:
                                                                springRootBone = _b.sent();
                                                                if (!(vrmBoneGroup.center !== -1)) return [3, 3];
                                                                return [4, gltf.parser.getDependency('node', vrmBoneGroup.center)];
                                                            case 2:
                                                                _a = _b.sent();
                                                                return [3, 4];
                                                            case 3:
                                                                _a = null;
                                                                _b.label = 4;
                                                            case 4:
                                                                center = _a;
                                                                if (!springRootBone) {
                                                                    return [2];
                                                                }
                                                                springRootBone.traverse(function (bone) {
                                                                    var springBone = _this._createSpringBone(bone, {
                                                                        radius: radius,
                                                                        stiffnessForce: stiffnessForce,
                                                                        gravityDir: gravityDir,
                                                                        gravityPower: gravityPower,
                                                                        dragForce: dragForce,
                                                                        colliders: colliders,
                                                                        center: center,
                                                                    });
                                                                    springBoneGroup.push(springBone);
                                                                });
                                                                return [2];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            _a.sent();
                                            springBoneGroupList.push(springBoneGroup);
                                            return [2];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2, springBoneGroupList];
                }
            });
        });
    };
    VRMSpringBoneImporter.prototype._importColliderMeshGroups = function (gltf, schemaSecondaryAnimation) {
        return __awaiter(this, void 0, Promise, function () {
            var vrmColliderGroups, colliderGroups;
            var _this = this;
            return __generator(this, function (_a) {
                vrmColliderGroups = schemaSecondaryAnimation.colliderGroups;
                if (vrmColliderGroups === undefined)
                    return [2, []];
                colliderGroups = [];
                vrmColliderGroups.forEach(function (colliderGroup) { return __awaiter(_this, void 0, void 0, function () {
                    var bone, colliders, colliderMeshGroup;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (colliderGroup.node === undefined || colliderGroup.colliders === undefined) {
                                    return [2];
                                }
                                return [4, gltf.parser.getDependency('node', colliderGroup.node)];
                            case 1:
                                bone = _a.sent();
                                colliders = [];
                                colliderGroup.colliders.forEach(function (collider) {
                                    if (collider.offset === undefined ||
                                        collider.offset.x === undefined ||
                                        collider.offset.y === undefined ||
                                        collider.offset.z === undefined ||
                                        collider.radius === undefined) {
                                        return;
                                    }
                                    var offset = _v3A.set(collider.offset.x, collider.offset.y, -collider.offset.z);
                                    var colliderMesh = _this._createColliderMesh(collider.radius, offset);
                                    bone.add(colliderMesh);
                                    colliders.push(colliderMesh);
                                });
                                colliderMeshGroup = {
                                    node: colliderGroup.node,
                                    colliders: colliders,
                                };
                                colliderGroups.push(colliderMeshGroup);
                                return [2];
                        }
                    });
                }); });
                return [2, colliderGroups];
            });
        });
    };
    VRMSpringBoneImporter.prototype._createColliderMesh = function (radius, offset) {
        var colliderMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 8, 4), _colliderMaterial);
        colliderMesh.position.copy(offset);
        colliderMesh.name = 'vrmColliderSphere';
        colliderMesh.geometry.computeBoundingSphere();
        return colliderMesh;
    };
    return VRMSpringBoneImporter;
}());
exports.VRMSpringBoneImporter = VRMSpringBoneImporter;


/***/ }),

/***/ "./src/vrm/springbone/VRMSpringBoneManager.ts":
/*!****************************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBoneManager.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSpringBoneManager = void 0;
var VRMSpringBoneManager = (function () {
    function VRMSpringBoneManager(colliderGroups, springBoneGroupList) {
        this.colliderGroups = [];
        this.springBoneGroupList = [];
        this.colliderGroups = colliderGroups;
        this.springBoneGroupList = springBoneGroupList;
    }
    VRMSpringBoneManager.prototype.setCenter = function (root) {
        this.springBoneGroupList.forEach(function (springBoneGroup) {
            springBoneGroup.forEach(function (springBone) {
                springBone.center = root;
            });
        });
    };
    VRMSpringBoneManager.prototype.lateUpdate = function (delta) {
        this.springBoneGroupList.forEach(function (springBoneGroup) {
            springBoneGroup.forEach(function (springBone) {
                springBone.update(delta);
            });
        });
    };
    VRMSpringBoneManager.prototype.reset = function () {
        this.springBoneGroupList.forEach(function (springBoneGroup) {
            springBoneGroup.forEach(function (springBone) {
                springBone.reset();
            });
        });
    };
    return VRMSpringBoneManager;
}());
exports.VRMSpringBoneManager = VRMSpringBoneManager;


/***/ }),

/***/ "./src/vrm/springbone/VRMSpringBoneParameters.ts":
/*!*******************************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBoneParameters.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/springbone/index.ts":
/*!*************************************!*\
  !*** ./src/vrm/springbone/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./VRMSpringBone */ "./src/vrm/springbone/VRMSpringBone.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSpringBoneColliderGroup */ "./src/vrm/springbone/VRMSpringBoneColliderGroup.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSpringBoneImporter */ "./src/vrm/springbone/VRMSpringBoneImporter.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSpringBoneManager */ "./src/vrm/springbone/VRMSpringBoneManager.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSpringBoneParameters */ "./src/vrm/springbone/VRMSpringBoneParameters.ts"), exports);


/***/ }),

/***/ "./src/vrm/types/GLTFSchema.ts":
/*!*************************************!*\
  !*** ./src/vrm/types/GLTFSchema.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/types/VRMSchema.ts":
/*!************************************!*\
  !*** ./src/vrm/types/VRMSchema.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VRMSchema = void 0;
var VRMSchema;
(function (VRMSchema) {
    var BlendShapePresetName;
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
    })(BlendShapePresetName = VRMSchema.BlendShapePresetName || (VRMSchema.BlendShapePresetName = {}));
    var FirstPersonLookAtTypeName;
    (function (FirstPersonLookAtTypeName) {
        FirstPersonLookAtTypeName["BlendShape"] = "BlendShape";
        FirstPersonLookAtTypeName["Bone"] = "Bone";
    })(FirstPersonLookAtTypeName = VRMSchema.FirstPersonLookAtTypeName || (VRMSchema.FirstPersonLookAtTypeName = {}));
    var HumanoidBoneName;
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
    })(HumanoidBoneName = VRMSchema.HumanoidBoneName || (VRMSchema.HumanoidBoneName = {}));
    var MetaAllowedUserName;
    (function (MetaAllowedUserName) {
        MetaAllowedUserName["Everyone"] = "Everyone";
        MetaAllowedUserName["ExplicitlyLicensedPerson"] = "ExplicitlyLicensedPerson";
        MetaAllowedUserName["OnlyAuthor"] = "OnlyAuthor";
    })(MetaAllowedUserName = VRMSchema.MetaAllowedUserName || (VRMSchema.MetaAllowedUserName = {}));
    var MetaUssageName;
    (function (MetaUssageName) {
        MetaUssageName["Allow"] = "Allow";
        MetaUssageName["Disallow"] = "Disallow";
    })(MetaUssageName = VRMSchema.MetaUssageName || (VRMSchema.MetaUssageName = {}));
    var MetaLicenseName;
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
    })(MetaLicenseName = VRMSchema.MetaLicenseName || (VRMSchema.MetaLicenseName = {}));
})(VRMSchema = exports.VRMSchema || (exports.VRMSchema = {}));


/***/ }),

/***/ "./src/vrm/types/index.ts":
/*!********************************!*\
  !*** ./src/vrm/types/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./GLTFSchema */ "./src/vrm/types/GLTFSchema.ts"), exports);
__exportStar(__webpack_require__(/*! ./VRMSchema */ "./src/vrm/types/VRMSchema.ts"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./src/vrm/types/types.ts"), exports);


/***/ }),

/***/ "./src/vrm/types/types.ts":
/*!********************************!*\
  !*** ./src/vrm/types/types.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/vrm/utils/Matrix4InverseCache.ts":
/*!**********************************************!*\
  !*** ./src/vrm/utils/Matrix4InverseCache.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix4InverseCache = void 0;
var THREE = __webpack_require__(/*! three */ "three");
var Matrix4InverseCache = (function () {
    function Matrix4InverseCache(matrix) {
        var _this = this;
        this._inverseCache = new THREE.Matrix4();
        this._shouldUpdateInverse = true;
        this.matrix = matrix;
        var handler = {
            set: function (obj, prop, newVal) {
                _this._shouldUpdateInverse = true;
                obj[prop] = newVal;
                return true;
            },
        };
        this._originalElements = matrix.elements;
        matrix.elements = new Proxy(matrix.elements, handler);
    }
    Object.defineProperty(Matrix4InverseCache.prototype, "inverse", {
        get: function () {
            if (this._shouldUpdateInverse) {
                this._inverseCache.getInverse(this.matrix);
                this._shouldUpdateInverse = false;
            }
            return this._inverseCache;
        },
        enumerable: false,
        configurable: true
    });
    Matrix4InverseCache.prototype.revert = function () {
        this.matrix.elements = this._originalElements;
    };
    return Matrix4InverseCache;
}());
exports.Matrix4InverseCache = Matrix4InverseCache;


/***/ }),

/***/ "./src/vrm/utils/disposer.ts":
/*!***********************************!*\
  !*** ./src/vrm/utils/disposer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.deepDispose = void 0;
function disposeMaterial(material) {
    Object.keys(material).forEach(function (propertyName) {
        var value = material[propertyName];
        if (value === null || value === void 0 ? void 0 : value.isTexture) {
            var texture = value;
            texture.dispose();
        }
    });
    material.dispose();
}
function dispose(object3D) {
    var geometry = object3D.geometry;
    if (geometry) {
        geometry.dispose();
    }
    var material = object3D.material;
    if (material) {
        if (Array.isArray(material)) {
            material.forEach(function (material) { return disposeMaterial(material); });
        }
        else if (material) {
            disposeMaterial(material);
        }
    }
}
function deepDispose(object3D) {
    object3D.traverse(dispose);
}
exports.deepDispose = deepDispose;


/***/ }),

/***/ "./src/vrm/utils/math.ts":
/*!*******************************!*\
  !*** ./src/vrm/utils/math.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorldQuaternionLite = exports.getWorldScaleLite = exports.getWorldPositionLite = exports.linstep = exports.saturate = void 0;
var THREE = __webpack_require__(/*! three */ "three");
function saturate(value) {
    return Math.max(Math.min(value, 1.0), 0.0);
}
exports.saturate = saturate;
function linstep(x, min, max) {
    if (x <= min)
        return 0;
    if (x >= max)
        return 1;
    return (x - min) / (max - min);
}
exports.linstep = linstep;
var _position = new THREE.Vector3();
var _scale = new THREE.Vector3();
var _rotation = new THREE.Quaternion();
function getWorldPositionLite(object, out) {
    object.matrixWorld.decompose(out, _rotation, _scale);
    return out;
}
exports.getWorldPositionLite = getWorldPositionLite;
function getWorldScaleLite(object, out) {
    object.matrixWorld.decompose(_position, _rotation, out);
    return out;
}
exports.getWorldScaleLite = getWorldScaleLite;
function getWorldQuaternionLite(object, out) {
    object.matrixWorld.decompose(_position, out, _scale);
    return out;
}
exports.getWorldQuaternionLite = getWorldQuaternionLite;


/***/ }),

/***/ "./src/vrm/utils/renameMaterialProperty.ts":
/*!*************************************************!*\
  !*** ./src/vrm/utils/renameMaterialProperty.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.renameMaterialProperty = void 0;
function renameMaterialProperty(name) {
    if (name[0] !== '_') {
        console.warn("renameMaterialProperty: Given property name \"" + name + "\" might be invalid");
        return name;
    }
    name = name.substring(1);
    if (!/[A-Z]/.test(name[0])) {
        console.warn("renameMaterialProperty: Given property name \"" + name + "\" might be invalid");
        return name;
    }
    return name[0].toLowerCase() + name.substring(1);
}
exports.renameMaterialProperty = renameMaterialProperty;


/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvYXNzaWduLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vVlJNLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL2V4dHJhY3RUaHVtYm5haWxCbG9iLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUdyb3VwLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZVByb3h5LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNRGVidWdPcHRpb25zLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2RlYnVnL1ZSTUltcG9ydGVyRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNTG9va0F0SGVhZERlYnVnLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2RlYnVnL1ZSTUxvb2tBdEltcG9ydGVyRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNU3ByaW5nQm9uZURlYnVnLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2RlYnVnL1ZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2RlYnVnL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZmlyc3RwZXJzb24vVlJNRmlyc3RQZXJzb24udHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZmlyc3RwZXJzb24vVlJNRmlyc3RQZXJzb25JbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbkJvbmUudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vaHVtYW5vaWQvVlJNSHVtYW5Cb25lcy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbkRlc2NyaXB0aW9uLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2h1bWFub2lkL1ZSTUh1bWFuTGltaXQudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vaHVtYW5vaWQvVlJNSHVtYW5vaWQudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vaHVtYW5vaWQvVlJNSHVtYW5vaWRJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNQ3VydmVNYXBwZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbG9va2F0L1ZSTUxvb2tBdEFwcGx5ZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbG9va2F0L1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1Mb29rQXRCb25lQXBwbHllci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0SGVhZC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbG9va2F0L2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL01Ub29uTWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvVlJNTWF0ZXJpYWxJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9WUk1VbmxpdE1hdGVyaWFsLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL2dldFRleGVsRGVjb2RpbmdGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9zaGFkZXJzL210b29uLmZyYWciLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvc2hhZGVycy9tdG9vbi52ZXJ0Iiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL3NoYWRlcnMvdW5saXQuZnJhZyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9zaGFkZXJzL3VubGl0LnZlcnQiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWV0YS9WUk1NZXRhLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21ldGEvVlJNTWV0YUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21ldGEvVlJNTWV0YUltcG9ydGVyT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tZXRhL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lUGFyYW1ldGVycy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3R5cGVzL0dMVEZTY2hlbWEudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdHlwZXMvVlJNU2NoZW1hLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3R5cGVzL3R5cGVzLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdXRpbHMvZGlzcG9zZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdXRpbHMvbWF0aC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS91dGlscy9yZW5hbWVNYXRlcmlhbFByb3BlcnR5LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vZXh0ZXJuYWwgXCJUSFJFRVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxvQkFBb0IsbUJBQU8sQ0FBQyx5QkFBRztBQUMvQjs7Ozs7Ozs7Ozs7OztBQ0hhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGtDQUFROzs7Ozs7Ozs7Ozs7O0FDWmhCO0FBQ2I7QUFDQSwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDZCQUE2QiwwQkFBMEIsYUFBYSxFQUFFLHFCQUFxQjtBQUN4RyxnQkFBZ0IscURBQXFELG9FQUFvRSxhQUFhLEVBQUU7QUFDeEosc0JBQXNCLHNCQUFzQixxQkFBcUIsR0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsa0NBQWtDLFNBQVM7QUFDM0Msa0NBQWtDLFdBQVcsVUFBVTtBQUN2RCx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBLDZHQUE2RyxPQUFPLFVBQVU7QUFDOUgsZ0ZBQWdGLGlCQUFpQixPQUFPO0FBQ3hHLHdEQUF3RCxnQkFBZ0IsUUFBUSxPQUFPO0FBQ3ZGLDhDQUE4QyxnQkFBZ0IsZ0JBQWdCLE9BQU87QUFDckY7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLFNBQVMsWUFBWSxhQUFhLE9BQU8sRUFBRSxVQUFVLFdBQVc7QUFDaEUsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMscURBQWtCO0FBQzNDLG9CQUFvQixtQkFBTyxDQUFDLCtDQUFlO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQzlGYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGtDQUFrQyxTQUFTO0FBQzNDLGtDQUFrQyxXQUFXLFVBQVU7QUFDdkQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQSw2R0FBNkcsT0FBTyxVQUFVO0FBQzlILGdGQUFnRixpQkFBaUIsT0FBTztBQUN4Ryx3REFBd0QsZ0JBQWdCLFFBQVEsT0FBTztBQUN2Riw4Q0FBOEMsZ0JBQWdCLGdCQUFnQixPQUFPO0FBQ3JGO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLFlBQVksYUFBYSxPQUFPLEVBQUUsVUFBVSxXQUFXO0FBQ2hFLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG1CQUFtQixtQkFBTyxDQUFDLG1EQUFjO0FBQ3pDLG9CQUFvQixtQkFBTyxDQUFDLHFEQUFlO0FBQzNDLDRCQUE0QixtQkFBTyxDQUFDLGlGQUFnQztBQUNwRSwwQkFBMEIsbUJBQU8sQ0FBQyx5RUFBNEI7QUFDOUQsaUJBQWlCLG1CQUFPLENBQUMsK0NBQVk7QUFDckMsd0JBQXdCLG1CQUFPLENBQUMsaUVBQXdCO0FBQ3hELDhCQUE4QixtQkFBTyxDQUFDLHlGQUFvQztBQUMxRSxZQUFZLG1CQUFPLENBQUMsK0JBQU87QUFDM0I7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQzdIYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsWUFBWSxtQkFBTyxDQUFDLG9CQUFPO0FBQzNCO0FBQ0E7QUFDQSw4RkFBOEYsMENBQTBDO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSw2QkFBNkIsbUJBQU8sQ0FBQywwRUFBd0I7QUFDN0QsZ0NBQWdDLG1CQUFPLENBQUMsZ0ZBQTJCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQ1phO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxZQUFZLG1CQUFPLENBQUMsb0JBQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQ2E7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLDhFQUE4RTtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0VBQXdFO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7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QyxhQUFhO0FBQzdDLGdDQUFnQyxhQUFhO0FBQzdDLDhCQUE4QixhQUFhO0FBQzNDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNuZGE7QUFDYjtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZkEsdUIiLCJmaWxlIjoidGhyZWUtdnJtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXNzaWduLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIF9fdGhyZWVfdnJtX18gPSByZXF1aXJlKFwiLlwiKTtcclxuT2JqZWN0LmFzc2lnbihUSFJFRSwgX190aHJlZV92cm1fXyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdnJtL1wiKSwgZXhwb3J0cyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTSA9IHZvaWQgMDtcclxudmFyIGRpc3Bvc2VyXzEgPSByZXF1aXJlKFwiLi91dGlscy9kaXNwb3NlclwiKTtcclxudmFyIFZSTUltcG9ydGVyXzEgPSByZXF1aXJlKFwiLi9WUk1JbXBvcnRlclwiKTtcclxudmFyIFZSTSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk0ocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHBhcmFtcy5zY2VuZTtcclxuICAgICAgICB0aGlzLmh1bWFub2lkID0gcGFyYW1zLmh1bWFub2lkO1xyXG4gICAgICAgIHRoaXMuYmxlbmRTaGFwZVByb3h5ID0gcGFyYW1zLmJsZW5kU2hhcGVQcm94eTtcclxuICAgICAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xyXG4gICAgICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcclxuICAgICAgICB0aGlzLm1hdGVyaWFscyA9IHBhcmFtcy5tYXRlcmlhbHM7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlciA9IHBhcmFtcy5zcHJpbmdCb25lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1ldGEgPSBwYXJhbXMubWV0YTtcclxuICAgIH1cclxuICAgIFZSTS5mcm9tID0gZnVuY3Rpb24gKGdsdGYsIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbXBvcnRlcjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0ZXIgPSBuZXcgVlJNSW1wb3J0ZXJfMS5WUk1JbXBvcnRlcihvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBpbXBvcnRlci5pbXBvcnQoZ2x0ZildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBWUk0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tBdCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tBdC51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ibGVuZFNoYXBlUHJveHkpIHtcclxuICAgICAgICAgICAgdGhpcy5ibGVuZFNoYXBlUHJveHkudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIubGF0ZVVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1hdGVyaWFscykge1xyXG4gICAgICAgICAgICB0aGlzLm1hdGVyaWFscy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsLnVwZGF0ZVZSTU1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLnVwZGF0ZVZSTU1hdGVyaWFscyhkZWx0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWUk0ucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICB2YXIgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG4gICAgICAgIGlmIChzY2VuZSkge1xyXG4gICAgICAgICAgICBkaXNwb3Nlcl8xLmRlZXBEaXNwb3NlKHNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5tZXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGV4dHVyZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRpc3Bvc2UoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTSA9IFZSTTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNSW1wb3J0ZXIgPSB2b2lkIDA7XHJcbnZhciBibGVuZHNoYXBlXzEgPSByZXF1aXJlKFwiLi9ibGVuZHNoYXBlXCIpO1xyXG52YXIgZmlyc3RwZXJzb25fMSA9IHJlcXVpcmUoXCIuL2ZpcnN0cGVyc29uXCIpO1xyXG52YXIgVlJNSHVtYW5vaWRJbXBvcnRlcl8xID0gcmVxdWlyZShcIi4vaHVtYW5vaWQvVlJNSHVtYW5vaWRJbXBvcnRlclwiKTtcclxudmFyIFZSTUxvb2tBdEltcG9ydGVyXzEgPSByZXF1aXJlKFwiLi9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXJcIik7XHJcbnZhciBtYXRlcmlhbF8xID0gcmVxdWlyZShcIi4vbWF0ZXJpYWxcIik7XHJcbnZhciBWUk1NZXRhSW1wb3J0ZXJfMSA9IHJlcXVpcmUoXCIuL21ldGEvVlJNTWV0YUltcG9ydGVyXCIpO1xyXG52YXIgVlJNU3ByaW5nQm9uZUltcG9ydGVyXzEgPSByZXF1aXJlKFwiLi9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlclwiKTtcclxudmFyIFZSTV8xID0gcmVxdWlyZShcIi4vVlJNXCIpO1xyXG52YXIgVlJNSW1wb3J0ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNSW1wb3J0ZXIob3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XHJcbiAgICAgICAgdGhpcy5fbWV0YUltcG9ydGVyID0gb3B0aW9ucy5tZXRhSW1wb3J0ZXIgfHwgbmV3IFZSTU1ldGFJbXBvcnRlcl8xLlZSTU1ldGFJbXBvcnRlcigpO1xyXG4gICAgICAgIHRoaXMuX2JsZW5kU2hhcGVJbXBvcnRlciA9IG9wdGlvbnMuYmxlbmRTaGFwZUltcG9ydGVyIHx8IG5ldyBibGVuZHNoYXBlXzEuVlJNQmxlbmRTaGFwZUltcG9ydGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbG9va0F0SW1wb3J0ZXIgPSBvcHRpb25zLmxvb2tBdEltcG9ydGVyIHx8IG5ldyBWUk1Mb29rQXRJbXBvcnRlcl8xLlZSTUxvb2tBdEltcG9ydGVyKCk7XHJcbiAgICAgICAgdGhpcy5faHVtYW5vaWRJbXBvcnRlciA9IG9wdGlvbnMuaHVtYW5vaWRJbXBvcnRlciB8fCBuZXcgVlJNSHVtYW5vaWRJbXBvcnRlcl8xLlZSTUh1bWFub2lkSW1wb3J0ZXIoKTtcclxuICAgICAgICB0aGlzLl9maXJzdFBlcnNvbkltcG9ydGVyID0gb3B0aW9ucy5maXJzdFBlcnNvbkltcG9ydGVyIHx8IG5ldyBmaXJzdHBlcnNvbl8xLlZSTUZpcnN0UGVyc29uSW1wb3J0ZXIoKTtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbEltcG9ydGVyID0gb3B0aW9ucy5tYXRlcmlhbEltcG9ydGVyIHx8IG5ldyBtYXRlcmlhbF8xLlZSTU1hdGVyaWFsSW1wb3J0ZXIoKTtcclxuICAgICAgICB0aGlzLl9zcHJpbmdCb25lSW1wb3J0ZXIgPSBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciB8fCBuZXcgVlJNU3ByaW5nQm9uZUltcG9ydGVyXzEuVlJNU3ByaW5nQm9uZUltcG9ydGVyKCk7XHJcbiAgICB9XHJcbiAgICBWUk1JbXBvcnRlci5wcm90b3R5cGUuaW1wb3J0ID0gZnVuY3Rpb24gKGdsdGYpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2NlbmUsIG1ldGEsIG1hdGVyaWFscywgaHVtYW5vaWQsIGZpcnN0UGVyc29uLCBfYSwgYmxlbmRTaGFwZVByb3h5LCBsb29rQXQsIF9iLCBzcHJpbmdCb25lTWFuYWdlcjtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucyA9PT0gdW5kZWZpbmVkIHx8IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucy5WUk0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBWUk0gZXh0ZW5zaW9uIG9uIHRoZSBHTFRGJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUgPSBnbHRmLnNjZW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLnRyYXZlcnNlKGZ1bmN0aW9uIChvYmplY3QzZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdDNkLmlzTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDNkLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fbWV0YUltcG9ydGVyLmltcG9ydChnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhID0gKF9jLnNlbnQoKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX21hdGVyaWFsSW1wb3J0ZXIuY29udmVydEdMVEZNYXRlcmlhbHMoZ2x0ZildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzID0gKF9jLnNlbnQoKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2h1bWFub2lkSW1wb3J0ZXIuaW1wb3J0KGdsdGYpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh1bWFub2lkID0gKF9jLnNlbnQoKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWh1bWFub2lkKSByZXR1cm4gWzMsIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2ZpcnN0UGVyc29uSW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGh1bWFub2lkKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IChfYy5zZW50KCkpIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYy5sYWJlbCA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFBlcnNvbiA9IF9hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2JsZW5kU2hhcGVJbXBvcnRlci5pbXBvcnQoZ2x0ZildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmxlbmRTaGFwZVByb3h5ID0gKF9jLnNlbnQoKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShmaXJzdFBlcnNvbiAmJiBibGVuZFNoYXBlUHJveHkgJiYgaHVtYW5vaWQpKSByZXR1cm4gWzMsIDldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2xvb2tBdEltcG9ydGVyLmltcG9ydChnbHRmLCBmaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbm9pZCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMTBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9va0F0ID0gX2I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fc3ByaW5nQm9uZUltcG9ydGVyLmltcG9ydChnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXIgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbmV3IFZSTV8xLlZSTSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YTogbWV0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHM6IG1hdGVyaWFscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodW1hbm9pZDogaHVtYW5vaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQZXJzb246IGZpcnN0UGVyc29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsZW5kU2hhcGVQcm94eTogYmxlbmRTaGFwZVByb3h5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb2tBdDogbG9va0F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ0JvbmVNYW5hZ2VyOiBzcHJpbmdCb25lTWFuYWdlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTUltcG9ydGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTUltcG9ydGVyID0gVlJNSW1wb3J0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZXh0cmFjdFRodW1ibmFpbEJsb2IgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIF92MkEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xyXG52YXIgX2NhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoLTEsIDEsIC0xLCAxLCAtMSwgMSk7XHJcbnZhciBfcGxhbmUgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSwgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIH0pKTtcclxudmFyIF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG5fc2NlbmUuYWRkKF9wbGFuZSk7XHJcbmZ1bmN0aW9uIGV4dHJhY3RUaHVtYm5haWxCbG9iKHJlbmRlcmVyLCB2cm0sIHNpemUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGlmIChzaXplID09PSB2b2lkIDApIHsgc2l6ZSA9IDUxMjsgfVxyXG4gICAgdmFyIHRleHR1cmUgPSAoX2EgPSB2cm0ubWV0YSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRleHR1cmU7XHJcbiAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4dHJhY3RUaHVtYm5haWxCbG9iOiBUaGlzIFZSTSBkb2VzIG5vdCBoYXZlIGEgdGh1bWJuYWlsJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgY2FudmFzID0gcmVuZGVyZXIuZ2V0Q29udGV4dCgpLmNhbnZhcztcclxuICAgIHJlbmRlcmVyLmdldFNpemUoX3YyQSk7XHJcbiAgICB2YXIgcHJldldpZHRoID0gX3YyQS54O1xyXG4gICAgdmFyIHByZXZIZWlnaHQgPSBfdjJBLnk7XHJcbiAgICByZW5kZXJlci5zZXRTaXplKHNpemUsIHNpemUsIGZhbHNlKTtcclxuICAgIF9wbGFuZS5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xyXG4gICAgcmVuZGVyZXIucmVuZGVyKF9zY2VuZSwgX2NhbWVyYSk7XHJcbiAgICBfcGxhbmUubWF0ZXJpYWwubWFwID0gbnVsbDtcclxuICAgIGlmIChjYW52YXMgaW5zdGFuY2VvZiBPZmZzY3JlZW5DYW52YXMpIHtcclxuICAgICAgICByZXR1cm4gY2FudmFzLmNvbnZlcnRUb0Jsb2IoKS5maW5hbGx5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZShwcmV2V2lkdGgsIHByZXZIZWlnaHQsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYikge1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTaXplKHByZXZXaWR0aCwgcHJldkhlaWdodCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoYmxvYiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoJ2V4dHJhY3RUaHVtYm5haWxCbG9iOiBGYWlsZWQgdG8gY3JlYXRlIGEgYmxvYicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShibG9iKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5leHRyYWN0VGh1bWJuYWlsQmxvYiA9IGV4dHJhY3RUaHVtYm5haWxCbG9iO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTVV0aWxzID0gdm9pZCAwO1xyXG52YXIgZXh0cmFjdFRodW1ibmFpbEJsb2JfMSA9IHJlcXVpcmUoXCIuL2V4dHJhY3RUaHVtYm5haWxCbG9iXCIpO1xyXG52YXIgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHNfMSA9IHJlcXVpcmUoXCIuL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzXCIpO1xyXG52YXIgVlJNVXRpbHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNVXRpbHMoKSB7XHJcbiAgICB9XHJcbiAgICBWUk1VdGlscy5leHRyYWN0VGh1bWJuYWlsQmxvYiA9IGV4dHJhY3RUaHVtYm5haWxCbG9iXzEuZXh0cmFjdFRodW1ibmFpbEJsb2I7XHJcbiAgICBWUk1VdGlscy5yZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyA9IHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzXzEucmVtb3ZlVW5uZWNlc3NhcnlKb2ludHM7XHJcbiAgICByZXR1cm4gVlJNVXRpbHM7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVlJNVXRpbHMgPSBWUk1VdGlscztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5yZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyA9IHZvaWQgMDtcclxudmFyIFRIUkVFID0gcmVxdWlyZShcInRocmVlXCIpO1xyXG5mdW5jdGlvbiByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyhyb290KSB7XHJcbiAgICB2YXIgc2tlbGV0b25MaXN0ID0gbmV3IE1hcCgpO1xyXG4gICAgcm9vdC50cmF2ZXJzZShmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai50eXBlICE9PSAnU2tpbm5lZE1lc2gnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1lc2ggPSBvYmo7XHJcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gbWVzaC5nZW9tZXRyeTtcclxuICAgICAgICB2YXIgYXR0cmlidXRlID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKTtcclxuICAgICAgICB2YXIgc2tlbGV0b24gPSBza2VsZXRvbkxpc3QuZ2V0KGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgaWYgKCFza2VsZXRvbikge1xyXG4gICAgICAgICAgICB2YXIgYm9uZXMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGJvbmVJbnZlcnNlcyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgYm9uZUluZGV4TWFwID0ge307XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IGF0dHJpYnV0ZS5hcnJheTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9uZUluZGV4TWFwW2luZGV4XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9uZUluZGV4TWFwW2luZGV4XSA9IGJvbmVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBib25lcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZXNbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICBib25lSW52ZXJzZXMucHVzaChtZXNoLnNrZWxldG9uLmJvbmVJbnZlcnNlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBib25lSW5kZXhNYXBbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZS5jb3B5QXJyYXkoYXJyYXkpO1xyXG4gICAgICAgICAgICBhdHRyaWJ1dGUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBza2VsZXRvbiA9IG5ldyBUSFJFRS5Ta2VsZXRvbihib25lcywgYm9uZUludmVyc2VzKTtcclxuICAgICAgICAgICAgc2tlbGV0b25MaXN0LnNldChhdHRyaWJ1dGUsIHNrZWxldG9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzaC5iaW5kKHNrZWxldG9uLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1CbGVuZFNoYXBlR3JvdXAgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZTtcclxuKGZ1bmN0aW9uIChWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUpIHtcclxuICAgIFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZVtWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGVbXCJOVU1CRVJcIl0gPSAwXSA9IFwiTlVNQkVSXCI7XHJcbiAgICBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGVbVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlW1wiVkVDVE9SMlwiXSA9IDFdID0gXCJWRUNUT1IyXCI7XHJcbiAgICBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGVbVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlW1wiVkVDVE9SM1wiXSA9IDJdID0gXCJWRUNUT1IzXCI7XHJcbiAgICBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGVbVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlW1wiVkVDVE9SNFwiXSA9IDNdID0gXCJWRUNUT1I0XCI7XHJcbiAgICBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGVbVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlW1wiQ09MT1JcIl0gPSA0XSA9IFwiQ09MT1JcIjtcclxufSkoVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlIHx8IChWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUgPSB7fSkpO1xyXG52YXIgX3YyID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxudmFyIF92MyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbnZhciBfdjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgpO1xyXG52YXIgX2NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XHJcbnZhciBWUk1CbGVuZFNoYXBlR3JvdXAgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFZSTUJsZW5kU2hhcGVHcm91cCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZSTUJsZW5kU2hhcGVHcm91cChleHByZXNzaW9uTmFtZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMud2VpZ2h0ID0gMC4wO1xyXG4gICAgICAgIF90aGlzLmlzQmluYXJ5ID0gZmFsc2U7XHJcbiAgICAgICAgX3RoaXMuX2JpbmRzID0gW107XHJcbiAgICAgICAgX3RoaXMuX21hdGVyaWFsVmFsdWVzID0gW107XHJcbiAgICAgICAgX3RoaXMubmFtZSA9IFwiQmxlbmRTaGFwZUNvbnRyb2xsZXJfXCIgKyBleHByZXNzaW9uTmFtZTtcclxuICAgICAgICBfdGhpcy50eXBlID0gJ0JsZW5kU2hhcGVDb250cm9sbGVyJztcclxuICAgICAgICBfdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVlJNQmxlbmRTaGFwZUdyb3VwLnByb3RvdHlwZS5hZGRCaW5kID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgd2VpZ2h0ID0gYXJncy53ZWlnaHQgLyAxMDA7XHJcbiAgICAgICAgdGhpcy5fYmluZHMucHVzaCh7XHJcbiAgICAgICAgICAgIG1lc2hlczogYXJncy5tZXNoZXMsXHJcbiAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXg6IGFyZ3MubW9ycGhUYXJnZXRJbmRleCxcclxuICAgICAgICAgICAgd2VpZ2h0OiB3ZWlnaHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVlJNQmxlbmRTaGFwZUdyb3VwLnByb3RvdHlwZS5hZGRNYXRlcmlhbFZhbHVlID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgbWF0ZXJpYWwgPSBhcmdzLm1hdGVyaWFsO1xyXG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBhcmdzLnByb3BlcnR5TmFtZTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBtYXRlcmlhbFtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YWx1ZSA9IGFyZ3MuZGVmYXVsdFZhbHVlIHx8IHZhbHVlO1xyXG4gICAgICAgIHZhciB0eXBlO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgdmFyIHRhcmdldFZhbHVlO1xyXG4gICAgICAgIHZhciBkZWx0YVZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZS5pc1ZlY3RvcjIpIHtcclxuICAgICAgICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IyO1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB2YWx1ZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xyXG4gICAgICAgICAgICBkZWx0YVZhbHVlID0gdGFyZ2V0VmFsdWUuY2xvbmUoKS5zdWIoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUuaXNWZWN0b3IzKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMztcclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gdmFsdWUuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcclxuICAgICAgICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLmlzVmVjdG9yNCkge1xyXG4gICAgICAgICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjQ7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHZhbHVlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLlZlY3RvcjQoKS5mcm9tQXJyYXkoW1xyXG4gICAgICAgICAgICAgICAgYXJncy50YXJnZXRWYWx1ZVsyXSxcclxuICAgICAgICAgICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbM10sXHJcbiAgICAgICAgICAgICAgICBhcmdzLnRhcmdldFZhbHVlWzBdLFxyXG4gICAgICAgICAgICAgICAgYXJncy50YXJnZXRWYWx1ZVsxXSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS5pc0NvbG9yKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1I7XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHZhbHVlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xyXG4gICAgICAgICAgICBkZWx0YVZhbHVlID0gdGFyZ2V0VmFsdWUuY2xvbmUoKS5zdWIoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSO1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGFyZ2V0VmFsdWUgPSBhcmdzLnRhcmdldFZhbHVlWzBdO1xyXG4gICAgICAgICAgICBkZWx0YVZhbHVlID0gdGFyZ2V0VmFsdWUgLSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLnB1c2goe1xyXG4gICAgICAgICAgICBtYXRlcmlhbDogbWF0ZXJpYWwsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSxcclxuICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IHRhcmdldFZhbHVlLFxyXG4gICAgICAgICAgICBkZWx0YVZhbHVlOiBkZWx0YVZhbHVlLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZSTUJsZW5kU2hhcGVHcm91cC5wcm90b3R5cGUuYXBwbHlXZWlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHcgPSB0aGlzLmlzQmluYXJ5ID8gKHRoaXMud2VpZ2h0IDwgMC41ID8gMC4wIDogMS4wKSA6IHRoaXMud2VpZ2h0O1xyXG4gICAgICAgIHRoaXMuX2JpbmRzLmZvckVhY2goZnVuY3Rpb24gKGJpbmQpIHtcclxuICAgICAgICAgICAgYmluZC5tZXNoZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW2JpbmQubW9ycGhUYXJnZXRJbmRleF0gKz0gdyAqIGJpbmQud2VpZ2h0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbFZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRlcmlhbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbFttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdICs9IGRlbHRhVmFsdWUgKiB3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbFttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92Mi5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjMuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SNCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3Y0LmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLkNPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbC5zaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZSTUJsZW5kU2hhcGVHcm91cC5wcm90b3R5cGUuY2xlYXJBcHBsaWVkV2VpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2JpbmRzLmZvckVhY2goZnVuY3Rpb24gKGJpbmQpIHtcclxuICAgICAgICAgICAgYmluZC5tZXNoZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNoLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW2JpbmQubW9ycGhUYXJnZXRJbmRleF0gPSAwLjA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKG1hdGVyaWFsVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5OVU1CRVIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SNCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbFttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLkNPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbC5zaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1CbGVuZFNoYXBlR3JvdXA7XHJcbn0oVEhSRUUuT2JqZWN0M0QpKTtcclxuZXhwb3J0cy5WUk1CbGVuZFNoYXBlR3JvdXAgPSBWUk1CbGVuZFNoYXBlR3JvdXA7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTUJsZW5kU2hhcGVJbXBvcnRlciA9IHZvaWQgMDtcclxudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbnZhciByZW5hbWVNYXRlcmlhbFByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eVwiKTtcclxudmFyIFZSTUJsZW5kU2hhcGVHcm91cF8xID0gcmVxdWlyZShcIi4vVlJNQmxlbmRTaGFwZUdyb3VwXCIpO1xyXG52YXIgVlJNQmxlbmRTaGFwZVByb3h5XzEgPSByZXF1aXJlKFwiLi9WUk1CbGVuZFNoYXBlUHJveHlcIik7XHJcbnZhciBWUk1CbGVuZFNoYXBlSW1wb3J0ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNQmxlbmRTaGFwZUltcG9ydGVyKCkge1xyXG4gICAgfVxyXG4gICAgVlJNQmxlbmRTaGFwZUltcG9ydGVyLnByb3RvdHlwZS5pbXBvcnQgPSBmdW5jdGlvbiAoZ2x0Zikge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdnJtRXh0LCBzY2hlbWFCbGVuZFNoYXBlLCBibGVuZFNoYXBlLCBibGVuZFNoYXBlR3JvdXBzLCBibGVuZFNoYXBlUHJlc2V0TWFwO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2cm1FeHQgPSAoX2EgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5WUk07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdnJtRXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYUJsZW5kU2hhcGUgPSB2cm1FeHQuYmxlbmRTaGFwZU1hc3RlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzY2hlbWFCbGVuZFNoYXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsZW5kU2hhcGUgPSBuZXcgVlJNQmxlbmRTaGFwZVByb3h5XzEuVlJNQmxlbmRTaGFwZVByb3h5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsZW5kU2hhcGVHcm91cHMgPSBzY2hlbWFCbGVuZFNoYXBlLmJsZW5kU2hhcGVHcm91cHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmxlbmRTaGFwZUdyb3Vwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBibGVuZFNoYXBlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGVuZFNoYXBlUHJlc2V0TWFwID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgUHJvbWlzZS5hbGwoYmxlbmRTaGFwZUdyb3Vwcy5tYXAoZnVuY3Rpb24gKHNjaGVtYUdyb3VwKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUsIHByZXNldE5hbWUsIGdyb3VwLCBtYXRlcmlhbFZhbHVlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IHNjaGVtYUdyb3VwLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVlJNQmxlbmRTaGFwZUltcG9ydGVyOiBPbmUgb2YgYmxlbmRTaGFwZUdyb3VwcyBoYXMgbm8gbmFtZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hR3JvdXAucHJlc2V0TmFtZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hR3JvdXAucHJlc2V0TmFtZSAhPT0gdHlwZXNfMS5WUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuVW5rbm93biAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWJsZW5kU2hhcGVQcmVzZXRNYXBbc2NoZW1hR3JvdXAucHJlc2V0TmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNldE5hbWUgPSBzY2hlbWFHcm91cC5wcmVzZXROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxlbmRTaGFwZVByZXNldE1hcFtzY2hlbWFHcm91cC5wcmVzZXROYW1lXSA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBuZXcgVlJNQmxlbmRTaGFwZUdyb3VwXzEuVlJNQmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbHRmLnNjZW5lLmFkZChncm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmlzQmluYXJ5ID0gc2NoZW1hR3JvdXAuaXNCaW5hcnkgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWFHcm91cC5iaW5kcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hR3JvdXAuYmluZHMuZm9yRWFjaChmdW5jdGlvbiAoYmluZCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb3JwaE1lc2hlcywgcHJpbWl0aXZlcywgbW9ycGhUYXJnZXRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmluZC5tZXNoID09PSB1bmRlZmluZWQgfHwgYmluZC5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbWVzaCcsIGJpbmQubWVzaCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoTWVzaGVzID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMgPSBtb3JwaE1lc2hlcy50eXBlID09PSAnR3JvdXAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbW9ycGhNZXNoZXMuY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbbW9ycGhNZXNoZXNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJpbWl0aXZlcy5ldmVyeShmdW5jdGlvbiAocHJpbWl0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4IDwgcHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVlJNQmxlbmRTaGFwZUltcG9ydGVyOiBcIiArIHNjaGVtYUdyb3VwLm5hbWUgKyBcIiBhdHRlbXB0cyB0byBpbmRleCBcIiArIG1vcnBoVGFyZ2V0SW5kZXggKyBcInRoIG1vcnBoIGJ1dCBub3QgZm91bmQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hZGRCaW5kKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4OiBtb3JwaFRhcmdldEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IGJpbmQud2VpZ2h0IHx8IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRlcmlhbFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0ZXJpYWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZShmdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3QubWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRlcmlhbCA9IG9iamVjdC5tYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoLmFwcGx5KG1hdGVyaWFscywgbWF0ZXJpYWwuZmlsdGVyKGZ1bmN0aW9uIChtdGwpIHsgcmV0dXJuIG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMTsgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0ZXJpYWwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgJiYgbWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cC5hZGRNYXRlcmlhbFZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBtYXRlcmlhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eV8xLnJlbmFtZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxlbmRTaGFwZS5yZWdpc3RlckJsZW5kU2hhcGVHcm91cChuYW1lLCBwcmVzZXROYW1lLCBncm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBibGVuZFNoYXBlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTUJsZW5kU2hhcGVJbXBvcnRlcjtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1CbGVuZFNoYXBlSW1wb3J0ZXIgPSBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNQmxlbmRTaGFwZVByb3h5ID0gdm9pZCAwO1xyXG52YXIgbWF0aF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL21hdGhcIik7XHJcbnZhciBWUk1CbGVuZFNoYXBlUHJveHkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNQmxlbmRTaGFwZVByb3h5KCkge1xyXG4gICAgICAgIHRoaXMuX2JsZW5kU2hhcGVHcm91cHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fdW5rbm93bkdyb3VwTmFtZXMgPSBbXTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWUk1CbGVuZFNoYXBlUHJveHkucHJvdG90eXBlLCBcImV4cHJlc3Npb25zXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2JsZW5kU2hhcGVHcm91cHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWUk1CbGVuZFNoYXBlUHJveHkucHJvdG90eXBlLCBcImJsZW5kU2hhcGVQcmVzZXRNYXBcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmxlbmRTaGFwZVByZXNldE1hcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVlJNQmxlbmRTaGFwZVByb3h5LnByb3RvdHlwZSwgXCJ1bmtub3duR3JvdXBOYW1lc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91bmtub3duR3JvdXBOYW1lcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBWUk1CbGVuZFNoYXBlUHJveHkucHJvdG90eXBlLmdldEJsZW5kU2hhcGVHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHByZXNldE5hbWUgPSB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwW25hbWVdO1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gcHJlc2V0TmFtZSA/IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbcHJlc2V0TmFtZV0gOiB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xyXG4gICAgICAgIGlmICghY29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJubyBibGVuZCBzaGFwZSBmb3VuZCBieSBcIiArIG5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcclxuICAgIH07XHJcbiAgICBWUk1CbGVuZFNoYXBlUHJveHkucHJvdG90eXBlLnJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwID0gZnVuY3Rpb24gKG5hbWUsIHByZXNldE5hbWUsIGNvbnRyb2xsZXIpIHtcclxuICAgICAgICB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdID0gY29udHJvbGxlcjtcclxuICAgICAgICBpZiAocHJlc2V0TmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwW3ByZXNldE5hbWVdID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vua25vd25Hcm91cE5hbWVzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFZSTUJsZW5kU2hhcGVQcm94eS5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBjb250cm9sbGVyID09PSBudWxsIHx8IGNvbnRyb2xsZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRyb2xsZXIud2VpZ2h0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBudWxsO1xyXG4gICAgfTtcclxuICAgIFZSTUJsZW5kU2hhcGVQcm94eS5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbiAobmFtZSwgd2VpZ2h0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLmdldEJsZW5kU2hhcGVHcm91cChuYW1lKTtcclxuICAgICAgICBpZiAoY29udHJvbGxlcikge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLndlaWdodCA9IG1hdGhfMS5zYXR1cmF0ZSh3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWUk1CbGVuZFNoYXBlUHJveHkucHJvdG90eXBlLmdldEJsZW5kU2hhcGVUcmFja05hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5nZXRCbGVuZFNoYXBlR3JvdXAobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIgPyBjb250cm9sbGVyLm5hbWUgKyBcIi53ZWlnaHRcIiA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgVlJNQmxlbmRTaGFwZVByb3h5LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9ibGVuZFNoYXBlR3JvdXBzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gX3RoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xlYXJBcHBsaWVkV2VpZ2h0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgY29udHJvbGxlciA9IF90aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLmFwcGx5V2VpZ2h0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTUJsZW5kU2hhcGVQcm94eTtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1CbGVuZFNoYXBlUHJveHkgPSBWUk1CbGVuZFNoYXBlUHJveHk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNQmxlbmRTaGFwZUdyb3VwXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTUJsZW5kU2hhcGVJbXBvcnRlclwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1CbGVuZFNoYXBlUHJveHlcIiksIGV4cG9ydHMpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1EZWJ1ZyA9IGV4cG9ydHMuVlJNX0dJWk1PX1JFTkRFUl9PUkRFUiA9IHZvaWQgMDtcclxudmFyIFRIUkVFID0gcmVxdWlyZShcInRocmVlXCIpO1xyXG52YXIgVlJNXzEgPSByZXF1aXJlKFwiLi4vVlJNXCIpO1xyXG52YXIgVlJNSW1wb3J0ZXJEZWJ1Z18xID0gcmVxdWlyZShcIi4vVlJNSW1wb3J0ZXJEZWJ1Z1wiKTtcclxuZXhwb3J0cy5WUk1fR0laTU9fUkVOREVSX09SREVSID0gMTAwMDA7XHJcbnZhciBWUk1EZWJ1ZyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVlJNRGVidWcsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWUk1EZWJ1ZyhwYXJhbXMsIGRlYnVnT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKGRlYnVnT3B0aW9uID09PSB2b2lkIDApIHsgZGVidWdPcHRpb24gPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHBhcmFtcykgfHwgdGhpcztcclxuICAgICAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVCb3hIZWxwZXIpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2NlbmUuYWRkKG5ldyBUSFJFRS5Cb3hIZWxwZXIoX3RoaXMuc2NlbmUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFkZWJ1Z09wdGlvbi5kaXNhYmxlU2tlbGV0b25IZWxwZXIpIHtcclxuICAgICAgICAgICAgX3RoaXMuc2NlbmUuYWRkKG5ldyBUSFJFRS5Ta2VsZXRvbkhlbHBlcihfdGhpcy5zY2VuZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBWUk1EZWJ1Zy5mcm9tID0gZnVuY3Rpb24gKGdsdGYsIG9wdGlvbnMsIGRlYnVnT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cclxuICAgICAgICBpZiAoZGVidWdPcHRpb24gPT09IHZvaWQgMCkgeyBkZWJ1Z09wdGlvbiA9IHt9OyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGltcG9ydGVyO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRlciA9IG5ldyBWUk1JbXBvcnRlckRlYnVnXzEuVlJNSW1wb3J0ZXJEZWJ1ZyhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBpbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZGVidWdPcHRpb24pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiwgX2Euc2VudCgpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVlJNRGVidWcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGVsdGEpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1EZWJ1ZztcclxufShWUk1fMS5WUk0pKTtcclxuZXhwb3J0cy5WUk1EZWJ1ZyA9IFZSTURlYnVnO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1JbXBvcnRlckRlYnVnID0gdm9pZCAwO1xyXG52YXIgVlJNSW1wb3J0ZXJfMSA9IHJlcXVpcmUoXCIuLi9WUk1JbXBvcnRlclwiKTtcclxudmFyIFZSTURlYnVnXzEgPSByZXF1aXJlKFwiLi9WUk1EZWJ1Z1wiKTtcclxudmFyIFZSTUxvb2tBdEltcG9ydGVyRGVidWdfMSA9IHJlcXVpcmUoXCIuL1ZSTUxvb2tBdEltcG9ydGVyRGVidWdcIik7XHJcbnZhciBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1Z18xID0gcmVxdWlyZShcIi4vVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWdcIik7XHJcbnZhciBWUk1JbXBvcnRlckRlYnVnID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWUk1JbXBvcnRlckRlYnVnLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVlJNSW1wb3J0ZXJEZWJ1ZyhvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgPSBvcHRpb25zLmxvb2tBdEltcG9ydGVyIHx8IG5ldyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnXzEuVlJNTG9va0F0SW1wb3J0ZXJEZWJ1ZygpO1xyXG4gICAgICAgIG9wdGlvbnMuc3ByaW5nQm9uZUltcG9ydGVyID0gb3B0aW9ucy5zcHJpbmdCb25lSW1wb3J0ZXIgfHwgbmV3IFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnXzEuVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcoKTtcclxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG9wdGlvbnMpIHx8IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVlJNSW1wb3J0ZXJEZWJ1Zy5wcm90b3R5cGUuaW1wb3J0ID0gZnVuY3Rpb24gKGdsdGYsIGRlYnVnT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChkZWJ1Z09wdGlvbnMgPT09IHZvaWQgMCkgeyBkZWJ1Z09wdGlvbnMgPSB7fTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzY2VuZSwgbWV0YSwgbWF0ZXJpYWxzLCBodW1hbm9pZCwgZmlyc3RQZXJzb24sIF9hLCBibGVuZFNoYXBlUHJveHksIGxvb2tBdCwgX2IsIHNwcmluZ0JvbmVNYW5hZ2VyO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zID09PSB1bmRlZmluZWQgfHwgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIFZSTSBleHRlbnNpb24gb24gdGhlIEdMVEYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSA9IGdsdGYuc2NlbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUudHJhdmVyc2UoZnVuY3Rpb24gKG9iamVjdDNkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0M2QuaXNNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9tZXRhSW1wb3J0ZXIuaW1wb3J0KGdsdGYpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHMgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHVtYW5vaWQgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaHVtYW5vaWQpIHJldHVybiBbMywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gKF9jLnNlbnQoKSkgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gNjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGVyc29uID0gX2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibGVuZFNoYXBlUHJveHkgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZCkpIHJldHVybiBbMywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fbG9va0F0SW1wb3J0ZXIuaW1wb3J0KGdsdGYsIGZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYy5zZW50KCkpIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29rQXQgPSBfYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb2tBdC5zZXR1cEhlbHBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9va0F0LnNldHVwSGVscGVyKHNjZW5lLCBkZWJ1Z09wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fc3ByaW5nQm9uZUltcG9ydGVyLmltcG9ydChnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXIgPSAoX2Muc2VudCgpKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcHJpbmdCb25lTWFuYWdlci5zZXR1cEhlbHBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXIuc2V0dXBIZWxwZXIoc2NlbmUsIGRlYnVnT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBuZXcgVlJNRGVidWdfMS5WUk1EZWJ1Zyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmU6IGdsdGYuc2NlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YTogbWV0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHM6IG1hdGVyaWFscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodW1hbm9pZDogaHVtYW5vaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQZXJzb246IGZpcnN0UGVyc29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsZW5kU2hhcGVQcm94eTogYmxlbmRTaGFwZVByb3h5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb2tBdDogbG9va0F0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ0JvbmVNYW5hZ2VyOiBzcHJpbmdCb25lTWFuYWdlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlYnVnT3B0aW9ucyldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNSW1wb3J0ZXJEZWJ1ZztcclxufShWUk1JbXBvcnRlcl8xLlZSTUltcG9ydGVyKSk7XHJcbmV4cG9ydHMuVlJNSW1wb3J0ZXJEZWJ1ZyA9IFZSTUltcG9ydGVyRGVidWc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0SGVhZERlYnVnID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbnZhciBWUk1Mb29rQXRIZWFkXzEgPSByZXF1aXJlKFwiLi4vbG9va2F0L1ZSTUxvb2tBdEhlYWRcIik7XHJcbnZhciBfdjMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG52YXIgVlJNTG9va0F0SGVhZERlYnVnID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWUk1Mb29rQXRIZWFkRGVidWcsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWUk1Mb29rQXRIZWFkRGVidWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgVlJNTG9va0F0SGVhZERlYnVnLnByb3RvdHlwZS5zZXR1cEhlbHBlciA9IGZ1bmN0aW9uIChzY2VuZSwgZGVidWdPcHRpb24pIHtcclxuICAgICAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVGYWNlRGlyZWN0aW9uSGVscGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIgPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSwgMC41LCAweGZmMDBmZik7XHJcbiAgICAgICAgICAgIHNjZW5lLmFkZCh0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgVlJNTG9va0F0SGVhZERlYnVnLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnVwZGF0ZS5jYWxsKHRoaXMsIGRlbHRhKTtcclxuICAgICAgICBpZiAodGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0UGVyc29uLmdldEZpcnN0UGVyc29uV29ybGRQb3NpdGlvbih0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlci5zZXREaXJlY3Rpb24odGhpcy5nZXRMb29rQXRXb3JsZERpcmVjdGlvbihfdjMpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTUxvb2tBdEhlYWREZWJ1ZztcclxufShWUk1Mb29rQXRIZWFkXzEuVlJNTG9va0F0SGVhZCkpO1xyXG5leHBvcnRzLlZSTUxvb2tBdEhlYWREZWJ1ZyA9IFZSTUxvb2tBdEhlYWREZWJ1ZztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1Mb29rQXRJbXBvcnRlckRlYnVnID0gdm9pZCAwO1xyXG52YXIgVlJNTG9va0F0SW1wb3J0ZXJfMSA9IHJlcXVpcmUoXCIuLi9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXJcIik7XHJcbnZhciBWUk1Mb29rQXRIZWFkRGVidWdfMSA9IHJlcXVpcmUoXCIuL1ZSTUxvb2tBdEhlYWREZWJ1Z1wiKTtcclxudmFyIFZSTUxvb2tBdEltcG9ydGVyRGVidWcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFZSTUxvb2tBdEltcG9ydGVyRGVidWcsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWUk1Mb29rQXRJbXBvcnRlckRlYnVnKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIFZSTUxvb2tBdEltcG9ydGVyRGVidWcucHJvdG90eXBlLmltcG9ydCA9IGZ1bmN0aW9uIChnbHRmLCBmaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbm9pZCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgdnJtRXh0ID0gKF9hID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuVlJNO1xyXG4gICAgICAgIGlmICghdnJtRXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2NoZW1hRmlyc3RQZXJzb24gPSB2cm1FeHQuZmlyc3RQZXJzb247XHJcbiAgICAgICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFwcGx5ZXIgPSB0aGlzLl9pbXBvcnRBcHBseWVyKHNjaGVtYUZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKTtcclxuICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWREZWJ1Z18xLlZSTUxvb2tBdEhlYWREZWJ1ZyhmaXJzdFBlcnNvbiwgYXBwbHllciB8fCB1bmRlZmluZWQpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1Mb29rQXRJbXBvcnRlckRlYnVnO1xyXG59KFZSTUxvb2tBdEltcG9ydGVyXzEuVlJNTG9va0F0SW1wb3J0ZXIpKTtcclxuZXhwb3J0cy5WUk1Mb29rQXRJbXBvcnRlckRlYnVnID0gVlJNTG9va0F0SW1wb3J0ZXJEZWJ1ZztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1TcHJpbmdCb25lRGVidWcgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIHNwcmluZ2JvbmVfMSA9IHJlcXVpcmUoXCIuLi9zcHJpbmdib25lXCIpO1xyXG52YXIgVlJNRGVidWdfMSA9IHJlcXVpcmUoXCIuL1ZSTURlYnVnXCIpO1xyXG52YXIgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbnZhciBWUk1TcHJpbmdCb25lRGVidWcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFZSTVNwcmluZ0JvbmVEZWJ1ZywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZSTVNwcmluZ0JvbmVEZWJ1Zyhib25lLCBwYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgYm9uZSwgcGFyYW1zKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgVlJNU3ByaW5nQm9uZURlYnVnLnByb3RvdHlwZS5nZXRHaXptbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2l6bW8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dpem1vO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV4dFRhaWxSZWxhdGl2ZSA9IF92M0EuY29weSh0aGlzLl9uZXh0VGFpbCkuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xyXG4gICAgICAgIHZhciBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoID0gbmV4dFRhaWxSZWxhdGl2ZS5sZW5ndGgoKTtcclxuICAgICAgICB0aGlzLl9naXptbyA9IG5ldyBUSFJFRS5BcnJvd0hlbHBlcihuZXh0VGFpbFJlbGF0aXZlLm5vcm1hbGl6ZSgpLCB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLCBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLCAweGZmZmYwMCwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcclxuICAgICAgICB0aGlzLl9naXptby5saW5lLnJlbmRlck9yZGVyID0gVlJNRGVidWdfMS5WUk1fR0laTU9fUkVOREVSX09SREVSO1xyXG4gICAgICAgIHRoaXMuX2dpem1vLmNvbmUucmVuZGVyT3JkZXIgPSBWUk1EZWJ1Z18xLlZSTV9HSVpNT19SRU5ERVJfT1JERVI7XHJcbiAgICAgICAgdGhpcy5fZ2l6bW8ubGluZS5tYXRlcmlhbC5kZXB0aFRlc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9naXptby5saW5lLm1hdGVyaWFsLnRyYW5zcGFyZW50ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9naXptby5jb25lLm1hdGVyaWFsLmRlcHRoVGVzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2dpem1vLmNvbmUubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9naXptbztcclxuICAgIH07XHJcbiAgICBWUk1TcHJpbmdCb25lRGVidWcucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcywgZGVsdGEpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUdpem1vKCk7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZURlYnVnLnByb3RvdHlwZS5fdXBkYXRlR2l6bW8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9naXptbykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXh0VGFpbFJlbGF0aXZlID0gX3YzQS5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKS5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcbiAgICAgICAgdmFyIG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xyXG4gICAgICAgIHRoaXMuX2dpem1vLnNldERpcmVjdGlvbihuZXh0VGFpbFJlbGF0aXZlLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgICB0aGlzLl9naXptby5zZXRMZW5ndGgobmV4dFRhaWxSZWxhdGl2ZUxlbmd0aCwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcclxuICAgICAgICB0aGlzLl9naXptby5wb3NpdGlvbi5jb3B5KHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1TcHJpbmdCb25lRGVidWc7XHJcbn0oc3ByaW5nYm9uZV8xLlZSTVNwcmluZ0JvbmUpKTtcclxuZXhwb3J0cy5WUk1TcHJpbmdCb25lRGVidWcgPSBWUk1TcHJpbmdCb25lRGVidWc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnID0gdm9pZCAwO1xyXG52YXIgVlJNU3ByaW5nQm9uZUltcG9ydGVyXzEgPSByZXF1aXJlKFwiLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lSW1wb3J0ZXJcIik7XHJcbnZhciBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnXzEgPSByZXF1aXJlKFwiLi9WUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnXCIpO1xyXG52YXIgVlJNU3ByaW5nQm9uZURlYnVnXzEgPSByZXF1aXJlKFwiLi9WUk1TcHJpbmdCb25lRGVidWdcIik7XHJcbnZhciBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZygpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1Zy5wcm90b3R5cGUuaW1wb3J0ID0gZnVuY3Rpb24gKGdsdGYpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZybUV4dCwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLCBjb2xsaWRlckdyb3Vwcywgc3ByaW5nQm9uZUdyb3VwTGlzdDtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnJtRXh0ID0gKF9hID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuVlJNO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZybUV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbnVsbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiA9IHZybUV4dC5zZWNvbmRhcnlBbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckdyb3VwcyA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiwgY29sbGlkZXJHcm91cHMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ0JvbmVHcm91cExpc3QgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWdfMS5WUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnLnByb3RvdHlwZS5fY3JlYXRlU3ByaW5nQm9uZSA9IGZ1bmN0aW9uIChib25lLCBwYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZSTVNwcmluZ0JvbmVEZWJ1Z18xLlZSTVNwcmluZ0JvbmVEZWJ1Zyhib25lLCBwYXJhbXMpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZztcclxufShWUk1TcHJpbmdCb25lSW1wb3J0ZXJfMS5WUk1TcHJpbmdCb25lSW1wb3J0ZXIpKTtcclxuZXhwb3J0cy5WUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZyA9IFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIHNwcmluZ2JvbmVfMSA9IHJlcXVpcmUoXCIuLi9zcHJpbmdib25lXCIpO1xyXG52YXIgVlJNRGVidWdfMSA9IHJlcXVpcmUoXCIuL1ZSTURlYnVnXCIpO1xyXG52YXIgX2NvbGxpZGVyR2l6bW9NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XHJcbiAgICBjb2xvcjogMHhmZjAwZmYsXHJcbiAgICB3aXJlZnJhbWU6IHRydWUsXHJcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgIGRlcHRoVGVzdDogZmFsc2UsXHJcbn0pO1xyXG52YXIgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZywgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zy5wcm90b3R5cGUuc2V0dXBIZWxwZXIgPSBmdW5jdGlvbiAoc2NlbmUsIGRlYnVnT3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKGRlYnVnT3B0aW9uLmRpc2FibGVTcHJpbmdCb25lSGVscGVyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goZnVuY3Rpb24gKHNwcmluZ0JvbmVHcm91cCkge1xyXG4gICAgICAgICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaChmdW5jdGlvbiAoc3ByaW5nQm9uZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwcmluZ0JvbmUuZ2V0R2l6bW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ2l6bW8gPSBzcHJpbmdCb25lLmdldEdpem1vKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmUuYWRkKGdpem1vKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChjb2xsaWRlckdyb3VwKSB7XHJcbiAgICAgICAgICAgIGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzLmZvckVhY2goZnVuY3Rpb24gKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5tYXRlcmlhbCA9IF9jb2xsaWRlckdpem1vTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlci5yZW5kZXJPcmRlciA9IFZSTURlYnVnXzEuVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWc7XHJcbn0oc3ByaW5nYm9uZV8xLlZSTVNwcmluZ0JvbmVNYW5hZ2VyKSk7XHJcbmV4cG9ydHMuVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyA9IFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNRGVidWdPcHRpb25zXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTURlYnVnXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTVNwcmluZ0JvbmVEZWJ1Z1wiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1Z1wiKSwgZXhwb3J0cyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNRmlyc3RQZXJzb24gPSBleHBvcnRzLlZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyA9IHZvaWQgMDtcclxudmFyIFRIUkVFID0gcmVxdWlyZShcInRocmVlXCIpO1xyXG52YXIgbWF0aF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL21hdGhcIik7XHJcbnZhciBWRUNUT1IzX0ZST05UID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgLTEuMCkpO1xyXG52YXIgX3F1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xyXG52YXIgRmlyc3RQZXJzb25GbGFnO1xyXG4oZnVuY3Rpb24gKEZpcnN0UGVyc29uRmxhZykge1xyXG4gICAgRmlyc3RQZXJzb25GbGFnW0ZpcnN0UGVyc29uRmxhZ1tcIkF1dG9cIl0gPSAwXSA9IFwiQXV0b1wiO1xyXG4gICAgRmlyc3RQZXJzb25GbGFnW0ZpcnN0UGVyc29uRmxhZ1tcIkJvdGhcIl0gPSAxXSA9IFwiQm90aFwiO1xyXG4gICAgRmlyc3RQZXJzb25GbGFnW0ZpcnN0UGVyc29uRmxhZ1tcIlRoaXJkUGVyc29uT25seVwiXSA9IDJdID0gXCJUaGlyZFBlcnNvbk9ubHlcIjtcclxuICAgIEZpcnN0UGVyc29uRmxhZ1tGaXJzdFBlcnNvbkZsYWdbXCJGaXJzdFBlcnNvbk9ubHlcIl0gPSAzXSA9IFwiRmlyc3RQZXJzb25Pbmx5XCI7XHJcbn0pKEZpcnN0UGVyc29uRmxhZyB8fCAoRmlyc3RQZXJzb25GbGFnID0ge30pKTtcclxudmFyIFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MoZmlyc3RQZXJzb25GbGFnLCBtZXNoKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdFBlcnNvbkZsYWcgPSBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MuX3BhcnNlRmlyc3RQZXJzb25GbGFnKGZpcnN0UGVyc29uRmxhZyk7XHJcbiAgICAgICAgdGhpcy5tZXNoID0gbWVzaDtcclxuICAgIH1cclxuICAgIFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncy5fcGFyc2VGaXJzdFBlcnNvbkZsYWcgPSBmdW5jdGlvbiAoZmlyc3RQZXJzb25GbGFnKSB7XHJcbiAgICAgICAgc3dpdGNoIChmaXJzdFBlcnNvbkZsYWcpIHtcclxuICAgICAgICAgICAgY2FzZSAnQm90aCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkJvdGg7XHJcbiAgICAgICAgICAgIGNhc2UgJ1RoaXJkUGVyc29uT25seSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLlRoaXJkUGVyc29uT25seTtcclxuICAgICAgICAgICAgY2FzZSAnRmlyc3RQZXJzb25Pbmx5JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuRmlyc3RQZXJzb25Pbmx5O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5BdXRvO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyA9IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncztcclxudmFyIFZSTUZpcnN0UGVyc29uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZSTUZpcnN0UGVyc29uKGZpcnN0UGVyc29uQm9uZSwgZmlyc3RQZXJzb25Cb25lT2Zmc2V0LCBtZXNoQW5ub3RhdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tZXNoQW5ub3RhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XHJcbiAgICAgICAgdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZmlyc3RQZXJzb25Cb25lID0gZmlyc3RQZXJzb25Cb25lO1xyXG4gICAgICAgIHRoaXMuX2ZpcnN0UGVyc29uQm9uZU9mZnNldCA9IGZpcnN0UGVyc29uQm9uZU9mZnNldDtcclxuICAgICAgICB0aGlzLl9tZXNoQW5ub3RhdGlvbnMgPSBtZXNoQW5ub3RhdGlvbnM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVlJNRmlyc3RQZXJzb24ucHJvdG90eXBlLCBcImZpcnN0UGVyc29uQm9uZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbkJvbmU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZSTUZpcnN0UGVyc29uLnByb3RvdHlwZSwgXCJtZXNoQW5ub3RhdGlvbnNcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWVzaEFubm90YXRpb25zO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFZSTUZpcnN0UGVyc29uLnByb3RvdHlwZS5nZXRGaXJzdFBlcnNvbldvcmxkRGlyZWN0aW9uID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQuY29weShWRUNUT1IzX0ZST05UKS5hcHBseVF1YXRlcm5pb24obWF0aF8xLmdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5fZmlyc3RQZXJzb25Cb25lLCBfcXVhdCkpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWUk1GaXJzdFBlcnNvbi5wcm90b3R5cGUsIFwiZmlyc3RQZXJzb25Pbmx5TGF5ZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZSTUZpcnN0UGVyc29uLnByb3RvdHlwZSwgXCJ0aGlyZFBlcnNvbk9ubHlMYXllclwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBWUk1GaXJzdFBlcnNvbi5wcm90b3R5cGUuZ2V0Rmlyc3RQZXJzb25Cb25lT2Zmc2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQuY29weSh0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIFZSTUZpcnN0UGVyc29uLnByb3RvdHlwZS5nZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24gPSBmdW5jdGlvbiAodjMpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xyXG4gICAgICAgIHZhciB2NCA9IG5ldyBUSFJFRS5WZWN0b3I0KG9mZnNldC54LCBvZmZzZXQueSwgb2Zmc2V0LnosIDEuMCk7XHJcbiAgICAgICAgdjQuYXBwbHlNYXRyaXg0KHRoaXMuX2ZpcnN0UGVyc29uQm9uZS5tYXRyaXhXb3JsZCk7XHJcbiAgICAgICAgcmV0dXJuIHYzLnNldCh2NC54LCB2NC55LCB2NC56KTtcclxuICAgIH07XHJcbiAgICBWUk1GaXJzdFBlcnNvbi5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBfYyA9IF9iLmZpcnN0UGVyc29uT25seUxheWVyLCBmaXJzdFBlcnNvbk9ubHlMYXllciA9IF9jID09PSB2b2lkIDAgPyBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSIDogX2MsIF9kID0gX2IudGhpcmRQZXJzb25Pbmx5TGF5ZXIsIHRoaXJkUGVyc29uT25seUxheWVyID0gX2QgPT09IHZvaWQgMCA/IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgOiBfZDtcclxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBmaXJzdFBlcnNvbk9ubHlMYXllcjtcclxuICAgICAgICB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllciA9IHRoaXJkUGVyc29uT25seUxheWVyO1xyXG4gICAgICAgIHRoaXMuX21lc2hBbm5vdGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLkZpcnN0UGVyc29uT25seSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5tZXNoLmxheWVycy5zZXQoX3RoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubWVzaC50cmF2ZXJzZShmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIGNoaWxkLmxheWVycy5zZXQoX3RoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5UaGlyZFBlcnNvbk9ubHkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubWVzaC5sYXllcnMuc2V0KF90aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm1lc2gudHJhdmVyc2UoZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBjaGlsZC5sYXllcnMuc2V0KF90aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuQXV0bykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWwoaXRlbS5tZXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZSTUZpcnN0UGVyc29uLnByb3RvdHlwZS5fZXhjbHVkZVRyaWFuZ2xlcyA9IGZ1bmN0aW9uICh0cmlhbmdsZXMsIGJ3cywgc2tpbkluZGV4LCBleGNsdWRlKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICBpZiAoYndzICE9IG51bGwgJiYgYndzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhID0gdHJpYW5nbGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGIgPSB0cmlhbmdsZXNbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0cmlhbmdsZXNbaSArIDJdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ3MCA9IGJ3c1thXTtcclxuICAgICAgICAgICAgICAgIHZhciBza2luMCA9IHNraW5JbmRleFthXTtcclxuICAgICAgICAgICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ3MSA9IGJ3c1tiXTtcclxuICAgICAgICAgICAgICAgIHZhciBza2luMSA9IHNraW5JbmRleFtiXTtcclxuICAgICAgICAgICAgICAgIGlmIChidzFbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ3MVsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsxXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYncxWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzJdKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChidzFbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbM10pKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ3MiA9IGJ3c1tjXTtcclxuICAgICAgICAgICAgICAgIHZhciBza2luMiA9IHNraW5JbmRleFtjXTtcclxuICAgICAgICAgICAgICAgIGlmIChidzJbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ3MlsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsxXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYncyWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzJdKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChidzJbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbM10pKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdHJpYW5nbGVzW2NvdW50KytdID0gYTtcclxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH07XHJcbiAgICBWUk1GaXJzdFBlcnNvbi5wcm90b3R5cGUuX2NyZWF0ZUVyYXNlZE1lc2ggPSBmdW5jdGlvbiAoc3JjLCBlcmFzaW5nQm9uZXNJbmRleCkge1xyXG4gICAgICAgIHZhciBkc3QgPSBuZXcgVEhSRUUuU2tpbm5lZE1lc2goc3JjLmdlb21ldHJ5LmNsb25lKCksIHNyYy5tYXRlcmlhbCk7XHJcbiAgICAgICAgZHN0Lm5hbWUgPSBzcmMubmFtZSArIFwiKGVyYXNlKVwiO1xyXG4gICAgICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XHJcbiAgICAgICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xyXG4gICAgICAgIHZhciBnZW9tZXRyeSA9IGRzdC5nZW9tZXRyeTtcclxuICAgICAgICB2YXIgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4JykuYXJyYXk7XHJcbiAgICAgICAgdmFyIHNraW5JbmRleCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbkluZGV4QXR0ci5sZW5ndGg7IGkgKz0gNCkge1xyXG4gICAgICAgICAgICBza2luSW5kZXgucHVzaChbc2tpbkluZGV4QXR0cltpXSwgc2tpbkluZGV4QXR0cltpICsgMV0sIHNraW5JbmRleEF0dHJbaSArIDJdLCBza2luSW5kZXhBdHRyW2kgKyAzXV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKS5hcnJheTtcclxuICAgICAgICB2YXIgc2tpbldlaWdodCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbldlaWdodEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcclxuICAgICAgICAgICAgc2tpbldlaWdodC5wdXNoKFtza2luV2VpZ2h0QXR0cltpXSwgc2tpbldlaWdodEF0dHJbaSArIDFdLCBza2luV2VpZ2h0QXR0cltpICsgMl0sIHNraW5XZWlnaHRBdHRyW2kgKyAzXV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW5kZXggPSBnZW9tZXRyeS5nZXRJbmRleCgpO1xyXG4gICAgICAgIGlmICghaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGdlb21ldHJ5IGRvZXNuJ3QgaGF2ZSBhbiBpbmRleCBidWZmZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvbGRUcmlhbmdsZXMgPSBBcnJheS5mcm9tKGluZGV4LmFycmF5KTtcclxuICAgICAgICB2YXIgY291bnQgPSB0aGlzLl9leGNsdWRlVHJpYW5nbGVzKG9sZFRyaWFuZ2xlcywgc2tpbldlaWdodCwgc2tpbkluZGV4LCBlcmFzaW5nQm9uZXNJbmRleCk7XHJcbiAgICAgICAgdmFyIG5ld1RyaWFuZ2xlID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XHJcbiAgICAgICAgaWYgKHNyYy5vbkJlZm9yZVJlbmRlcikge1xyXG4gICAgICAgICAgICBkc3Qub25CZWZvcmVSZW5kZXIgPSBzcmMub25CZWZvcmVSZW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRzdC5iaW5kKG5ldyBUSFJFRS5Ta2VsZXRvbihzcmMuc2tlbGV0b24uYm9uZXMsIHNyYy5za2VsZXRvbi5ib25lSW52ZXJzZXMpLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfTtcclxuICAgIFZSTUZpcnN0UGVyc29uLnByb3RvdHlwZS5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoID0gZnVuY3Rpb24gKHBhcmVudCwgbWVzaCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGVyYXNlQm9uZUluZGV4ZXMgPSBbXTtcclxuICAgICAgICBtZXNoLnNrZWxldG9uLmJvbmVzLmZvckVhY2goZnVuY3Rpb24gKGJvbmUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5faXNFcmFzZVRhcmdldChib25lKSlcclxuICAgICAgICAgICAgICAgIGVyYXNlQm9uZUluZGV4ZXMucHVzaChpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xyXG4gICAgICAgICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XHJcbiAgICAgICAgdmFyIG5ld01lc2ggPSB0aGlzLl9jcmVhdGVFcmFzZWRNZXNoKG1lc2gsIGVyYXNlQm9uZUluZGV4ZXMpO1xyXG4gICAgICAgIHBhcmVudC5hZGQobmV3TWVzaCk7XHJcbiAgICB9O1xyXG4gICAgVlJNRmlyc3RQZXJzb24ucHJvdG90eXBlLl9jcmVhdGVIZWFkbGVzc01vZGVsID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdHcm91cCcpIHtcclxuICAgICAgICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUudHJhdmVyc2UoZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBjaGlsZC5sYXllcnMuc2V0KF90aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRfMS5uYW1lID0gXCJfaGVhZGxlc3NfXCIgKyBub2RlLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRfMS5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50LmFkZChwYXJlbnRfMSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIGNoaWxkLnR5cGUgPT09ICdTa2lubmVkTWVzaCc7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNraW5uZWRNZXNoID0gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnRfMSwgc2tpbm5lZE1lc2gpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobm9kZS50eXBlID09PSAnU2tpbm5lZE1lc2gnKSB7XHJcbiAgICAgICAgICAgIHZhciBza2lubmVkTWVzaCA9IG5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChub2RlLnBhcmVudCwgc2tpbm5lZE1lc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyYXZlcnNlKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gY2hpbGQubGF5ZXJzLnNldChfdGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWUk1GaXJzdFBlcnNvbi5wcm90b3R5cGUuX2lzRXJhc2VUYXJnZXQgPSBmdW5jdGlvbiAoYm9uZSkge1xyXG4gICAgICAgIGlmIChib25lLm5hbWUgPT09IHRoaXMuX2ZpcnN0UGVyc29uQm9uZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSID0gOTtcclxuICAgIFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcclxuICAgIHJldHVybiBWUk1GaXJzdFBlcnNvbjtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1GaXJzdFBlcnNvbiA9IFZSTUZpcnN0UGVyc29uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1GaXJzdFBlcnNvbkltcG9ydGVyID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xyXG52YXIgVlJNRmlyc3RQZXJzb25fMSA9IHJlcXVpcmUoXCIuL1ZSTUZpcnN0UGVyc29uXCIpO1xyXG52YXIgVlJNRmlyc3RQZXJzb25JbXBvcnRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk1GaXJzdFBlcnNvbkltcG9ydGVyKCkge1xyXG4gICAgfVxyXG4gICAgVlJNRmlyc3RQZXJzb25JbXBvcnRlci5wcm90b3R5cGUuaW1wb3J0ID0gZnVuY3Rpb24gKGdsdGYsIGh1bWFub2lkKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2cm1FeHQsIHNjaGVtYUZpcnN0UGVyc29uLCBmaXJzdFBlcnNvbkJvbmVJbmRleCwgZmlyc3RQZXJzb25Cb25lLCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQsIG1lc2hBbm5vdGF0aW9ucywgbWVzaGVzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2cm1FeHQgPSAoX2EgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5WUk07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdnJtRXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYUZpcnN0UGVyc29uID0gdnJtRXh0LmZpcnN0UGVyc29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGVyc29uQm9uZUluZGV4ID0gc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShmaXJzdFBlcnNvbkJvbmVJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGZpcnN0UGVyc29uQm9uZUluZGV4ID09PSAtMSkpIHJldHVybiBbMywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGVyc29uQm9uZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKHR5cGVzXzEuVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuSGVhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgM107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQsIGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBmaXJzdFBlcnNvbkJvbmVJbmRleCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQZXJzb25Cb25lID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcnN0UGVyc29uQm9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdWUk1GaXJzdFBlcnNvbkltcG9ydGVyOiBDb3VsZCBub3QgZmluZCBmaXJzdFBlcnNvbkJvbmUgb2YgdGhlIFZSTScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFBlcnNvbkJvbmVPZmZzZXQgPSBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LngsIHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC55LCAtc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wNiwgMC4wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaEFubm90YXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdtZXNoJyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaGVzID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzaCwgbWVzaEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc2NoZW1hRmlyc3RQZXJzb24ubWVzaEFubm90YXRpb25zLmZpbmQoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEubWVzaCA9PT0gbWVzaEluZGV4OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaEFubm90YXRpb25zLnB1c2gobmV3IFZSTUZpcnN0UGVyc29uXzEuVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzKGZsYWcgPT09IG51bGwgfHwgZmxhZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmxhZy5maXJzdFBlcnNvbkZsYWcsIG1lc2gpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbmV3IFZSTUZpcnN0UGVyc29uXzEuVlJNRmlyc3RQZXJzb24oZmlyc3RQZXJzb25Cb25lLCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQsIG1lc2hBbm5vdGF0aW9ucyldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNRmlyc3RQZXJzb25JbXBvcnRlcjtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1GaXJzdFBlcnNvbkltcG9ydGVyID0gVlJNRmlyc3RQZXJzb25JbXBvcnRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KSk7XHJcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1GaXJzdFBlcnNvblwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1GaXJzdFBlcnNvbkltcG9ydGVyXCIpLCBleHBvcnRzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1IdW1hbkJvbmUgPSB2b2lkIDA7XHJcbnZhciBWUk1IdW1hbkJvbmUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNSHVtYW5Cb25lKG5vZGUsIGh1bWFuTGltaXQpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuaHVtYW5MaW1pdCA9IGh1bWFuTGltaXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVlJNSHVtYW5Cb25lO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTUh1bWFuQm9uZSA9IFZSTUh1bWFuQm9uZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1IdW1hbm9pZCA9IHZvaWQgMDtcclxudmFyIFRIUkVFID0gcmVxdWlyZShcInRocmVlXCIpO1xyXG52YXIgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcclxudmFyIF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG52YXIgX3F1YXRBID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcclxudmFyIFZSTUh1bWFub2lkID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZSTUh1bWFub2lkKGJvbmVBcnJheSwgaHVtYW5EZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzdFBvc2UgPSB7fTtcclxuICAgICAgICB0aGlzLmh1bWFuQm9uZXMgPSB0aGlzLl9jcmVhdGVIdW1hbkJvbmVzKGJvbmVBcnJheSk7XHJcbiAgICAgICAgdGhpcy5odW1hbkRlc2NyaXB0aW9uID0gaHVtYW5EZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLnJlc3RQb3NlID0gdGhpcy5nZXRQb3NlKCk7XHJcbiAgICB9XHJcbiAgICBWUk1IdW1hbm9pZC5wcm90b3R5cGUuZ2V0UG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwb3NlID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKGZ1bmN0aW9uICh2cm1Cb25lTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IF90aGlzLmdldEJvbmVOb2RlKHZybUJvbmVOYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvc2VbdnJtQm9uZU5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3YzQS5zZXQoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIF9xdWF0QS5pZGVudGl0eSgpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdFN0YXRlID0gX3RoaXMucmVzdFBvc2VbdnJtQm9uZU5hbWVdO1xyXG4gICAgICAgICAgICBpZiAocmVzdFN0YXRlID09PSBudWxsIHx8IHJlc3RTdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzdFN0YXRlLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBfdjNBLmZyb21BcnJheShyZXN0U3RhdGUucG9zaXRpb24pLm5lZ2F0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXN0U3RhdGUgPT09IG51bGwgfHwgcmVzdFN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXN0U3RhdGUucm90YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIF9xdWF0QS5mcm9tQXJyYXkocmVzdFN0YXRlLnJvdGF0aW9uKS5pbnZlcnNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3YzQS5hZGQobm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIF9xdWF0QS5wcmVtdWx0aXBseShub2RlLnF1YXRlcm5pb24pO1xyXG4gICAgICAgICAgICBwb3NlW3ZybUJvbmVOYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBfdjNBLnRvQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBfcXVhdEEudG9BcnJheSgpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgICAgICByZXR1cm4gcG9zZTtcclxuICAgIH07XHJcbiAgICBWUk1IdW1hbm9pZC5wcm90b3R5cGUuc2V0UG9zZSA9IGZ1bmN0aW9uIChwb3NlT2JqZWN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBPYmplY3Qua2V5cyhwb3NlT2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uIChib25lTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBwb3NlT2JqZWN0W2JvbmVOYW1lXTtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBfdGhpcy5nZXRCb25lTm9kZShib25lTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciByZXN0U3RhdGUgPSBfdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XHJcbiAgICAgICAgICAgIGlmICghcmVzdFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXRlLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uLmZyb21BcnJheShzdGF0ZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdFN0YXRlLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbi5hZGQoX3YzQS5mcm9tQXJyYXkocmVzdFN0YXRlLnBvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXRlLnJvdGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHN0YXRlLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN0U3RhdGUucm90YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnF1YXRlcm5pb24ubXVsdGlwbHkoX3F1YXRBLmZyb21BcnJheShyZXN0U3RhdGUucm90YXRpb24pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZSTUh1bWFub2lkLnByb3RvdHlwZS5yZXNldFBvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRQb3NlKHt9KTtcclxuICAgIH07XHJcbiAgICBWUk1IdW1hbm9pZC5wcm90b3R5cGUuZ2V0Qm9uZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXSB8fCB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgVlJNSHVtYW5vaWQucHJvdG90eXBlLmdldEJvbmVzID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdO1xyXG4gICAgfTtcclxuICAgIFZSTUh1bWFub2lkLnByb3RvdHlwZS5nZXRCb25lTm9kZSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICByZXR1cm4gKF9iID0gKF9hID0gdGhpcy5odW1hbkJvbmVzW25hbWVdWzBdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eubm9kZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbDtcclxuICAgIH07XHJcbiAgICBWUk1IdW1hbm9pZC5wcm90b3R5cGUuZ2V0Qm9uZU5vZGVzID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odW1hbkJvbmVzW25hbWVdLm1hcChmdW5jdGlvbiAoYm9uZSkgeyByZXR1cm4gYm9uZS5ub2RlOyB9KTtcclxuICAgIH07XHJcbiAgICBWUk1IdW1hbm9pZC5wcm90b3R5cGUuX2NyZWF0ZUh1bWFuQm9uZXMgPSBmdW5jdGlvbiAoYm9uZUFycmF5KSB7XHJcbiAgICAgICAgdmFyIGJvbmVzID0gT2JqZWN0LnZhbHVlcyh0eXBlc18xLlZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKS5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIGFjY3VtW25hbWVdID0gW107XHJcbiAgICAgICAgICAgIHJldHVybiBhY2N1bTtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgYm9uZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGJvbmUpIHtcclxuICAgICAgICAgICAgYm9uZXNbYm9uZS5uYW1lXS5wdXNoKGJvbmUuYm9uZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJvbmVzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1IdW1hbm9pZDtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1IdW1hbm9pZCA9IFZSTUh1bWFub2lkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1IdW1hbm9pZEltcG9ydGVyID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbnZhciBWUk1IdW1hbkJvbmVfMSA9IHJlcXVpcmUoXCIuL1ZSTUh1bWFuQm9uZVwiKTtcclxudmFyIFZSTUh1bWFub2lkXzEgPSByZXF1aXJlKFwiLi9WUk1IdW1hbm9pZFwiKTtcclxudmFyIFZSTUh1bWFub2lkSW1wb3J0ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNSHVtYW5vaWRJbXBvcnRlcigpIHtcclxuICAgIH1cclxuICAgIFZSTUh1bWFub2lkSW1wb3J0ZXIucHJvdG90eXBlLmltcG9ydCA9IGZ1bmN0aW9uIChnbHRmKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2cm1FeHQsIHNjaGVtYUh1bWFub2lkLCBodW1hbkJvbmVBcnJheSwgaHVtYW5EZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnJtRXh0ID0gKF9hID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuVlJNO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZybUV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFIdW1hbm9pZCA9IHZybUV4dC5odW1hbm9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzY2hlbWFIdW1hbm9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodW1hbkJvbmVBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMpIHJldHVybiBbMywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgUHJvbWlzZS5hbGwoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcy5tYXAoZnVuY3Rpb24gKGJvbmUpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJvbmUuYm9uZSB8fCAhYm9uZS5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGJvbmUubm9kZSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHVtYW5Cb25lQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGJvbmUuYm9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9uZTogbmV3IFZSTUh1bWFuQm9uZV8xLlZSTUh1bWFuQm9uZShub2RlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBheGlzTGVuZ3RoOiBib25lLmF4aXNMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IGJvbmUuY2VudGVyICYmIG5ldyBUSFJFRS5WZWN0b3IzKGJvbmUuY2VudGVyLngsIGJvbmUuY2VudGVyLnksIGJvbmUuY2VudGVyLnopLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiBib25lLm1heCAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLm1heC54LCBib25lLm1heC55LCBib25lLm1heC56KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogYm9uZS5taW4gJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5taW4ueCwgYm9uZS5taW4ueSwgYm9uZS5taW4ueiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VEZWZhdWx0VmFsdWVzOiBib25lLnVzZURlZmF1bHRWYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodW1hbkRlc2NyaXB0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJtU3RyZXRjaDogc2NoZW1hSHVtYW5vaWQuYXJtU3RyZXRjaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ1N0cmV0Y2g6IHNjaGVtYUh1bWFub2lkLmxlZ1N0cmV0Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlckFybVR3aXN0OiBzY2hlbWFIdW1hbm9pZC51cHBlckFybVR3aXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJBcm1Ud2lzdDogc2NoZW1hSHVtYW5vaWQubG93ZXJBcm1Ud2lzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyTGVnVHdpc3Q6IHNjaGVtYUh1bWFub2lkLnVwcGVyTGVnVHdpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlckxlZ1R3aXN0OiBzY2hlbWFIdW1hbm9pZC5sb3dlckxlZ1R3aXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVldFNwYWNpbmc6IHNjaGVtYUh1bWFub2lkLmZlZXRTcGFjaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzVHJhbnNsYXRpb25Eb0Y6IHNjaGVtYUh1bWFub2lkLmhhc1RyYW5zbGF0aW9uRG9GLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG5ldyBWUk1IdW1hbm9pZF8xLlZSTUh1bWFub2lkKGh1bWFuQm9uZUFycmF5LCBodW1hbkRlc2NyaXB0aW9uKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1IdW1hbm9pZEltcG9ydGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTUh1bWFub2lkSW1wb3J0ZXIgPSBWUk1IdW1hbm9pZEltcG9ydGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pKTtcclxudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTUh1bWFuQm9uZVwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1IdW1hbkJvbmVzXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTUh1bWFuRGVzY3JpcHRpb25cIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNSHVtYW5MaW1pdFwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1IdW1hbm9pZFwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1IdW1hbm9pZEltcG9ydGVyXCIpLCBleHBvcnRzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KSk7XHJcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1cIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNSW1wb3J0ZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNVXRpbHNcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vYmxlbmRzaGFwZVwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9kZWJ1Z1wiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9maXJzdHBlcnNvblwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9odW1hbm9pZFwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9sb29rYXRcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3ByaW5nYm9uZVwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9tYXRlcmlhbFwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9tZXRhXCIpLCBleHBvcnRzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1DdXJ2ZU1hcHBlciA9IHZvaWQgMDtcclxudmFyIGhlcm1pdGVTcGxpbmUgPSBmdW5jdGlvbiAoeTAsIHkxLCB0MCwgdDEsIHgpIHtcclxuICAgIHZhciB4YyA9IHggKiB4ICogeDtcclxuICAgIHZhciB4cyA9IHggKiB4O1xyXG4gICAgdmFyIGR5ID0geTEgLSB5MDtcclxuICAgIHZhciBoMDEgPSAtMi4wICogeGMgKyAzLjAgKiB4cztcclxuICAgIHZhciBoMTAgPSB4YyAtIDIuMCAqIHhzICsgeDtcclxuICAgIHZhciBoMTEgPSB4YyAtIHhzO1xyXG4gICAgcmV0dXJuIHkwICsgZHkgKiBoMDEgKyB0MCAqIGgxMCArIHQxICogaDExO1xyXG59O1xyXG52YXIgZXZhbHVhdGVDdXJ2ZSA9IGZ1bmN0aW9uIChhcnIsIHgpIHtcclxuICAgIGlmIChhcnIubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXZhbHVhdGVDdXJ2ZTogSW52YWxpZCBjdXJ2ZSBkZXRlY3RlZCEgKEFycmF5IGxlbmd0aCBtdXN0IGJlIDggYXQgbGVhc3QpJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJyLmxlbmd0aCAlIDQgIT09IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2YWx1YXRlQ3VydmU6IEludmFsaWQgY3VydmUgZGV0ZWN0ZWQhIChBcnJheSBsZW5ndGggbXVzdCBiZSBtdWx0aXBsZXMgb2YgNCcpO1xyXG4gICAgfVxyXG4gICAgdmFyIG91dE5vZGU7XHJcbiAgICBmb3IgKG91dE5vZGUgPSAwOzsgb3V0Tm9kZSsrKSB7XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPD0gNCAqIG91dE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycls0ICogb3V0Tm9kZSAtIDNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh4IDw9IGFycls0ICogb3V0Tm9kZV0pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGluTm9kZSA9IG91dE5vZGUgLSAxO1xyXG4gICAgaWYgKGluTm9kZSA8IDApIHtcclxuICAgICAgICByZXR1cm4gYXJyWzQgKiBpbk5vZGUgKyA1XTtcclxuICAgIH1cclxuICAgIHZhciB4MCA9IGFycls0ICogaW5Ob2RlXTtcclxuICAgIHZhciB4MSA9IGFycls0ICogb3V0Tm9kZV07XHJcbiAgICB2YXIgeEhlcm1pdGUgPSAoeCAtIHgwKSAvICh4MSAtIHgwKTtcclxuICAgIHZhciB5MCA9IGFycls0ICogaW5Ob2RlICsgMV07XHJcbiAgICB2YXIgeTEgPSBhcnJbNCAqIG91dE5vZGUgKyAxXTtcclxuICAgIHZhciB0MCA9IGFycls0ICogaW5Ob2RlICsgM107XHJcbiAgICB2YXIgdDEgPSBhcnJbNCAqIG91dE5vZGUgKyAyXTtcclxuICAgIHJldHVybiBoZXJtaXRlU3BsaW5lKHkwLCB5MSwgdDAsIHQxLCB4SGVybWl0ZSk7XHJcbn07XHJcbnZhciBWUk1DdXJ2ZU1hcHBlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk1DdXJ2ZU1hcHBlcih4UmFuZ2UsIHlSYW5nZSwgY3VydmUpIHtcclxuICAgICAgICB0aGlzLmN1cnZlID0gWzAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wXTtcclxuICAgICAgICB0aGlzLmN1cnZlWFJhbmdlRGVncmVlID0gOTAuMDtcclxuICAgICAgICB0aGlzLmN1cnZlWVJhbmdlRGVncmVlID0gMTAuMDtcclxuICAgICAgICBpZiAoeFJhbmdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZSA9IHhSYW5nZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHlSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VydmVZUmFuZ2VEZWdyZWUgPSB5UmFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJ2ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VydmUgPSBjdXJ2ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBWUk1DdXJ2ZU1hcHBlci5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKHNyYykge1xyXG4gICAgICAgIHZhciBjbGFtcGVkU3JjID0gTWF0aC5taW4oTWF0aC5tYXgoc3JjLCAwLjApLCB0aGlzLmN1cnZlWFJhbmdlRGVncmVlKTtcclxuICAgICAgICB2YXIgeCA9IGNsYW1wZWRTcmMgLyB0aGlzLmN1cnZlWFJhbmdlRGVncmVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnZlWVJhbmdlRGVncmVlICogZXZhbHVhdGVDdXJ2ZSh0aGlzLmN1cnZlLCB4KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNQ3VydmVNYXBwZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVlJNQ3VydmVNYXBwZXIgPSBWUk1DdXJ2ZU1hcHBlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1Mb29rQXRBcHBseWVyID0gdm9pZCAwO1xyXG52YXIgVlJNTG9va0F0QXBwbHllciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk1Mb29rQXRBcHBseWVyKCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZSTUxvb2tBdEFwcGx5ZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0QXBwbHllciA9IFZSTUxvb2tBdEFwcGx5ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgPSB2b2lkIDA7XHJcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xyXG52YXIgVlJNTG9va0F0QXBwbHllcl8xID0gcmVxdWlyZShcIi4vVlJNTG9va0F0QXBwbHllclwiKTtcclxudmFyIFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyKGJsZW5kU2hhcGVQcm94eSwgY3VydmVIb3Jpem9udGFsLCBjdXJ2ZVZlcnRpY2FsRG93biwgY3VydmVWZXJ0aWNhbFVwKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy50eXBlID0gdHlwZXNfMS5WUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlO1xyXG4gICAgICAgIF90aGlzLl9jdXJ2ZUhvcml6b250YWwgPSBjdXJ2ZUhvcml6b250YWw7XHJcbiAgICAgICAgX3RoaXMuX2N1cnZlVmVydGljYWxEb3duID0gY3VydmVWZXJ0aWNhbERvd247XHJcbiAgICAgICAgX3RoaXMuX2N1cnZlVmVydGljYWxVcCA9IGN1cnZlVmVydGljYWxVcDtcclxuICAgICAgICBfdGhpcy5fYmxlbmRTaGFwZVByb3h5ID0gYmxlbmRTaGFwZVByb3h5O1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlc18xLlZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJsZW5kU2hhcGU7XHJcbiAgICB9O1xyXG4gICAgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIucHJvdG90eXBlLmxvb2tBdCA9IGZ1bmN0aW9uIChldWxlcikge1xyXG4gICAgICAgIHZhciBzcmNYID0gZXVsZXIueDtcclxuICAgICAgICB2YXIgc3JjWSA9IGV1bGVyLnk7XHJcbiAgICAgICAgaWYgKHNyY1ggPCAwLjApIHtcclxuICAgICAgICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKHR5cGVzXzEuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2t1cCwgMC4wKTtcclxuICAgICAgICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKHR5cGVzXzEuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tkb3duLCB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93bi5tYXAoLXNyY1gpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZSh0eXBlc18xLlZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rZG93biwgMC4wKTtcclxuICAgICAgICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKHR5cGVzXzEuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2t1cCwgdGhpcy5fY3VydmVWZXJ0aWNhbFVwLm1hcChzcmNYKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcmNZIDwgMC4wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZSh0eXBlc18xLlZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rbGVmdCwgMC4wKTtcclxuICAgICAgICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKHR5cGVzXzEuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tyaWdodCwgdGhpcy5fY3VydmVIb3Jpem9udGFsLm1hcCgtc3JjWSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKHR5cGVzXzEuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tyaWdodCwgMC4wKTtcclxuICAgICAgICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKHR5cGVzXzEuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tsZWZ0LCB0aGlzLl9jdXJ2ZUhvcml6b250YWwubWFwKHNyY1kpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyO1xyXG59KFZSTUxvb2tBdEFwcGx5ZXJfMS5WUk1Mb29rQXRBcHBseWVyKSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgPSBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1Mb29rQXRCb25lQXBwbHllciA9IHZvaWQgMDtcclxudmFyIFRIUkVFID0gcmVxdWlyZShcInRocmVlXCIpO1xyXG52YXIgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi90eXBlc1wiKTtcclxudmFyIFZSTUxvb2tBdEFwcGx5ZXJfMSA9IHJlcXVpcmUoXCIuL1ZSTUxvb2tBdEFwcGx5ZXJcIik7XHJcbnZhciBWUk1Mb29rQXRIZWFkXzEgPSByZXF1aXJlKFwiLi9WUk1Mb29rQXRIZWFkXCIpO1xyXG52YXIgX2V1bGVyID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsIFZSTUxvb2tBdEhlYWRfMS5WUk1Mb29rQXRIZWFkLkVVTEVSX09SREVSKTtcclxudmFyIFZSTUxvb2tBdEJvbmVBcHBseWVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWUk1Mb29rQXRCb25lQXBwbHllciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZSTUxvb2tBdEJvbmVBcHBseWVyKGh1bWFub2lkLCBjdXJ2ZUhvcml6b250YWxJbm5lciwgY3VydmVIb3Jpem9udGFsT3V0ZXIsIGN1cnZlVmVydGljYWxEb3duLCBjdXJ2ZVZlcnRpY2FsVXApIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnR5cGUgPSB0eXBlc18xLlZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJvbmU7XHJcbiAgICAgICAgX3RoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyID0gY3VydmVIb3Jpem9udGFsSW5uZXI7XHJcbiAgICAgICAgX3RoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyID0gY3VydmVIb3Jpem9udGFsT3V0ZXI7XHJcbiAgICAgICAgX3RoaXMuX2N1cnZlVmVydGljYWxEb3duID0gY3VydmVWZXJ0aWNhbERvd247XHJcbiAgICAgICAgX3RoaXMuX2N1cnZlVmVydGljYWxVcCA9IGN1cnZlVmVydGljYWxVcDtcclxuICAgICAgICBfdGhpcy5fbGVmdEV5ZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKHR5cGVzXzEuVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuTGVmdEV5ZSk7XHJcbiAgICAgICAgX3RoaXMuX3JpZ2h0RXllID0gaHVtYW5vaWQuZ2V0Qm9uZU5vZGUodHlwZXNfMS5WUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZS5SaWdodEV5ZSk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVlJNTG9va0F0Qm9uZUFwcGx5ZXIucHJvdG90eXBlLmxvb2tBdCA9IGZ1bmN0aW9uIChldWxlcikge1xyXG4gICAgICAgIHZhciBzcmNYID0gZXVsZXIueDtcclxuICAgICAgICB2YXIgc3JjWSA9IGV1bGVyLnk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xlZnRFeWUpIHtcclxuICAgICAgICAgICAgaWYgKHNyY1ggPCAwLjApIHtcclxuICAgICAgICAgICAgICAgIF9ldWxlci54ID0gLXRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfZXVsZXIueCA9IHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNyY1kgPCAwLjApIHtcclxuICAgICAgICAgICAgICAgIF9ldWxlci55ID0gLXRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyLm1hcCgtc3JjWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfZXVsZXIueSA9IHRoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyLm1hcChzcmNZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9sZWZ0RXllLnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKF9ldWxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9yaWdodEV5ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3JjWCA8IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgX2V1bGVyLnggPSAtdGhpcy5fY3VydmVWZXJ0aWNhbERvd24ubWFwKC1zcmNYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9ldWxlci54ID0gdGhpcy5fY3VydmVWZXJ0aWNhbFVwLm1hcChzcmNYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3JjWSA8IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgX2V1bGVyLnkgPSAtdGhpcy5fY3VydmVIb3Jpem9udGFsT3V0ZXIubWFwKC1zcmNZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9ldWxlci55ID0gdGhpcy5fY3VydmVIb3Jpem9udGFsSW5uZXIubWFwKHNyY1kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0RXllLnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKF9ldWxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBWUk1Mb29rQXRCb25lQXBwbHllcjtcclxufShWUk1Mb29rQXRBcHBseWVyXzEuVlJNTG9va0F0QXBwbHllcikpO1xyXG5leHBvcnRzLlZSTUxvb2tBdEJvbmVBcHBseWVyID0gVlJNTG9va0F0Qm9uZUFwcGx5ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0SGVhZCA9IHZvaWQgMDtcclxudmFyIFRIUkVFID0gcmVxdWlyZShcInRocmVlXCIpO1xyXG52YXIgbWF0aF8xID0gcmVxdWlyZShcIi4uL3V0aWxzL21hdGhcIik7XHJcbnZhciBWRUNUT1IzX0ZST05UID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgLTEuMCkpO1xyXG52YXIgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbnZhciBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxudmFyIF92M0MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG52YXIgX3F1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xyXG52YXIgVlJNTG9va0F0SGVhZCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk1Mb29rQXRIZWFkKGZpcnN0UGVyc29uLCBhcHBseWVyKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9ldWxlciA9IG5ldyBUSFJFRS5FdWxlcigwLjAsIDAuMCwgMC4wLCBWUk1Mb29rQXRIZWFkLkVVTEVSX09SREVSKTtcclxuICAgICAgICB0aGlzLmZpcnN0UGVyc29uID0gZmlyc3RQZXJzb247XHJcbiAgICAgICAgdGhpcy5hcHBseWVyID0gYXBwbHllcjtcclxuICAgIH1cclxuICAgIFZSTUxvb2tBdEhlYWQucHJvdG90eXBlLmdldExvb2tBdFdvcmxkRGlyZWN0aW9uID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHZhciByb3QgPSBtYXRoXzEuZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSwgX3F1YXQpO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQuY29weShWRUNUT1IzX0ZST05UKS5hcHBseUV1bGVyKHRoaXMuX2V1bGVyKS5hcHBseVF1YXRlcm5pb24ocm90KTtcclxuICAgIH07XHJcbiAgICBWUk1Mb29rQXRIZWFkLnByb3RvdHlwZS5sb29rQXQgPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgICAgICB0aGlzLl9jYWxjRXVsZXIodGhpcy5fZXVsZXIsIHBvc2l0aW9uKTtcclxuICAgICAgICBpZiAodGhpcy5hcHBseWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHllci5sb29rQXQodGhpcy5fZXVsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWUk1Mb29rQXRIZWFkLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy5hdXRvVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va0F0KHRoaXMudGFyZ2V0LmdldFdvcmxkUG9zaXRpb24oX3YzQSkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBseWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5ZXIubG9va0F0KHRoaXMuX2V1bGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBWUk1Mb29rQXRIZWFkLnByb3RvdHlwZS5fY2FsY0V1bGVyID0gZnVuY3Rpb24gKHRhcmdldCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgaGVhZFBvc2l0aW9uID0gdGhpcy5maXJzdFBlcnNvbi5nZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24oX3YzQik7XHJcbiAgICAgICAgdmFyIGxvb2tBdERpciA9IF92M0MuY29weShwb3NpdGlvbikuc3ViKGhlYWRQb3NpdGlvbikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgbG9va0F0RGlyLmFwcGx5UXVhdGVybmlvbihtYXRoXzEuZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSwgX3F1YXQpLmludmVyc2UoKSk7XHJcbiAgICAgICAgdGFyZ2V0LnggPSBNYXRoLmF0YW4yKGxvb2tBdERpci55LCBNYXRoLnNxcnQobG9va0F0RGlyLnggKiBsb29rQXREaXIueCArIGxvb2tBdERpci56ICogbG9va0F0RGlyLnopKTtcclxuICAgICAgICB0YXJnZXQueSA9IE1hdGguYXRhbjIoLWxvb2tBdERpci54LCAtbG9va0F0RGlyLnopO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9O1xyXG4gICAgVlJNTG9va0F0SGVhZC5FVUxFUl9PUkRFUiA9ICdZWFonO1xyXG4gICAgcmV0dXJuIFZSTUxvb2tBdEhlYWQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0SGVhZCA9IFZSTUxvb2tBdEhlYWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNTG9va0F0SW1wb3J0ZXIgPSB2b2lkIDA7XHJcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xyXG52YXIgVlJNQ3VydmVNYXBwZXJfMSA9IHJlcXVpcmUoXCIuL1ZSTUN1cnZlTWFwcGVyXCIpO1xyXG52YXIgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXJfMSA9IHJlcXVpcmUoXCIuL1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyXCIpO1xyXG52YXIgVlJNTG9va0F0Qm9uZUFwcGx5ZXJfMSA9IHJlcXVpcmUoXCIuL1ZSTUxvb2tBdEJvbmVBcHBseWVyXCIpO1xyXG52YXIgVlJNTG9va0F0SGVhZF8xID0gcmVxdWlyZShcIi4vVlJNTG9va0F0SGVhZFwiKTtcclxudmFyIERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwO1xyXG52YXIgVlJNTG9va0F0SW1wb3J0ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNTG9va0F0SW1wb3J0ZXIoKSB7XHJcbiAgICB9XHJcbiAgICBWUk1Mb29rQXRJbXBvcnRlci5wcm90b3R5cGUuaW1wb3J0ID0gZnVuY3Rpb24gKGdsdGYsIGZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHZhciB2cm1FeHQgPSAoX2EgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5WUk07XHJcbiAgICAgICAgaWYgKCF2cm1FeHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY2hlbWFGaXJzdFBlcnNvbiA9IHZybUV4dC5maXJzdFBlcnNvbjtcclxuICAgICAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYXBwbHllciA9IHRoaXMuX2ltcG9ydEFwcGx5ZXIoc2NoZW1hRmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVlJNTG9va0F0SGVhZF8xLlZSTUxvb2tBdEhlYWQoZmlyc3RQZXJzb24sIGFwcGx5ZXIgfHwgdW5kZWZpbmVkKTtcclxuICAgIH07XHJcbiAgICBWUk1Mb29rQXRJbXBvcnRlci5wcm90b3R5cGUuX2ltcG9ydEFwcGx5ZXIgPSBmdW5jdGlvbiAoc2NoZW1hRmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpIHtcclxuICAgICAgICB2YXIgbG9va0F0SG9yaXpvbnRhbElubmVyID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbElubmVyO1xyXG4gICAgICAgIHZhciBsb29rQXRIb3Jpem9udGFsT3V0ZXIgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXI7XHJcbiAgICAgICAgdmFyIGxvb2tBdFZlcnRpY2FsRG93biA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsRG93bjtcclxuICAgICAgICB2YXIgbG9va0F0VmVydGljYWxVcCA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsVXA7XHJcbiAgICAgICAgc3dpdGNoIChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIHR5cGVzXzEuVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQm9uZToge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvb2tBdEhvcml6b250YWxJbm5lciA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICBsb29rQXRWZXJ0aWNhbERvd24gPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGxvb2tBdFZlcnRpY2FsVXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRCb25lQXBwbHllcl8xLlZSTUxvb2tBdEJvbmVBcHBseWVyKGh1bWFub2lkLCB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0SG9yaXpvbnRhbElubmVyKSwgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdEhvcml6b250YWxPdXRlciksIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRWZXJ0aWNhbERvd24pLCB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0VmVydGljYWxVcCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgdHlwZXNfMS5WUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxEb3duID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxVcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyXzEuVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIoYmxlbmRTaGFwZVByb3h5LCB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobG9va0F0SG9yaXpvbnRhbE91dGVyKSwgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKGxvb2tBdFZlcnRpY2FsRG93biksIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShsb29rQXRWZXJ0aWNhbFVwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgVlJNTG9va0F0SW1wb3J0ZXIucHJvdG90eXBlLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUgPSBmdW5jdGlvbiAobWFwKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWUk1DdXJ2ZU1hcHBlcl8xLlZSTUN1cnZlTWFwcGVyKHR5cGVvZiBtYXAueFJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueFJhbmdlIDogdW5kZWZpbmVkLCB0eXBlb2YgbWFwLnlSYW5nZSA9PT0gJ251bWJlcicgPyBERUcyUkFEICogbWFwLnlSYW5nZSA6IHVuZGVmaW5lZCwgbWFwLmN1cnZlKTtcclxuICAgIH07XHJcbiAgICBWUk1Mb29rQXRJbXBvcnRlci5wcm90b3R5cGUuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZSA9IGZ1bmN0aW9uIChtYXApIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZSTUN1cnZlTWFwcGVyXzEuVlJNQ3VydmVNYXBwZXIodHlwZW9mIG1hcC54UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC54UmFuZ2UgOiB1bmRlZmluZWQsIG1hcC55UmFuZ2UsIG1hcC5jdXJ2ZSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTUxvb2tBdEltcG9ydGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTUxvb2tBdEltcG9ydGVyID0gVlJNTG9va0F0SW1wb3J0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNQ3VydmVNYXBwZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNTG9va0F0QXBwbHllclwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllclwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1Mb29rQXRCb25lQXBwbHllclwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1Mb29rQXRIZWFkXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTUxvb2tBdEltcG9ydGVyXCIpLCBleHBvcnRzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5NVG9vbk1hdGVyaWFsID0gZXhwb3J0cy5NVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSA9IGV4cG9ydHMuTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSBleHBvcnRzLk1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlID0gZXhwb3J0cy5NVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gZXhwb3J0cy5NVG9vbk1hdGVyaWFsQ3VsbE1vZGUgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uXCIpO1xyXG52YXIgbXRvb25fdmVydF8xID0gcmVxdWlyZShcIi4vc2hhZGVycy9tdG9vbi52ZXJ0XCIpO1xyXG52YXIgbXRvb25fZnJhZ18xID0gcmVxdWlyZShcIi4vc2hhZGVycy9tdG9vbi5mcmFnXCIpO1xyXG52YXIgVEFVID0gMi4wICogTWF0aC5QSTtcclxudmFyIE1Ub29uTWF0ZXJpYWxDdWxsTW9kZTtcclxuKGZ1bmN0aW9uIChNVG9vbk1hdGVyaWFsQ3VsbE1vZGUpIHtcclxuICAgIE1Ub29uTWF0ZXJpYWxDdWxsTW9kZVtNVG9vbk1hdGVyaWFsQ3VsbE1vZGVbXCJPZmZcIl0gPSAwXSA9IFwiT2ZmXCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsQ3VsbE1vZGVbTVRvb25NYXRlcmlhbEN1bGxNb2RlW1wiRnJvbnRcIl0gPSAxXSA9IFwiRnJvbnRcIjtcclxuICAgIE1Ub29uTWF0ZXJpYWxDdWxsTW9kZVtNVG9vbk1hdGVyaWFsQ3VsbE1vZGVbXCJCYWNrXCJdID0gMl0gPSBcIkJhY2tcIjtcclxufSkoTVRvb25NYXRlcmlhbEN1bGxNb2RlID0gZXhwb3J0cy5NVG9vbk1hdGVyaWFsQ3VsbE1vZGUgfHwgKGV4cG9ydHMuTVRvb25NYXRlcmlhbEN1bGxNb2RlID0ge30pKTtcclxudmFyIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGU7XHJcbihmdW5jdGlvbiAoTVRvb25NYXRlcmlhbERlYnVnTW9kZSkge1xyXG4gICAgTVRvb25NYXRlcmlhbERlYnVnTW9kZVtNVG9vbk1hdGVyaWFsRGVidWdNb2RlW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsRGVidWdNb2RlW01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVbXCJOb3JtYWxcIl0gPSAxXSA9IFwiTm9ybWFsXCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsRGVidWdNb2RlW01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVbXCJMaXRTaGFkZVJhdGVcIl0gPSAyXSA9IFwiTGl0U2hhZGVSYXRlXCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsRGVidWdNb2RlW01Ub29uTWF0ZXJpYWxEZWJ1Z01vZGVbXCJVVlwiXSA9IDNdID0gXCJVVlwiO1xyXG59KShNVG9vbk1hdGVyaWFsRGVidWdNb2RlID0gZXhwb3J0cy5NVG9vbk1hdGVyaWFsRGVidWdNb2RlIHx8IChleHBvcnRzLk1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgPSB7fSkpO1xyXG52YXIgTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGU7XHJcbihmdW5jdGlvbiAoTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUpIHtcclxuICAgIE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlW01Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlW1wiRml4ZWRDb2xvclwiXSA9IDBdID0gXCJGaXhlZENvbG9yXCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZVtNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZVtcIk1peGVkTGlnaHRpbmdcIl0gPSAxXSA9IFwiTWl4ZWRMaWdodGluZ1wiO1xyXG59KShNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSA9IGV4cG9ydHMuTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUgfHwgKGV4cG9ydHMuTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUgPSB7fSkpO1xyXG52YXIgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGU7XHJcbihmdW5jdGlvbiAoTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpIHtcclxuICAgIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlW01Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZVtNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZVtcIldvcmxkQ29vcmRpbmF0ZXNcIl0gPSAxXSA9IFwiV29ybGRDb29yZGluYXRlc1wiO1xyXG4gICAgTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVbTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGVbXCJTY3JlZW5Db29yZGluYXRlc1wiXSA9IDJdID0gXCJTY3JlZW5Db29yZGluYXRlc1wiO1xyXG59KShNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSA9IGV4cG9ydHMuTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgfHwgKGV4cG9ydHMuTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUgPSB7fSkpO1xyXG52YXIgTVRvb25NYXRlcmlhbFJlbmRlck1vZGU7XHJcbihmdW5jdGlvbiAoTVRvb25NYXRlcmlhbFJlbmRlck1vZGUpIHtcclxuICAgIE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlW01Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlW1wiT3BhcXVlXCJdID0gMF0gPSBcIk9wYXF1ZVwiO1xyXG4gICAgTVRvb25NYXRlcmlhbFJlbmRlck1vZGVbTVRvb25NYXRlcmlhbFJlbmRlck1vZGVbXCJDdXRvdXRcIl0gPSAxXSA9IFwiQ3V0b3V0XCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZVtNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZVtcIlRyYW5zcGFyZW50XCJdID0gMl0gPSBcIlRyYW5zcGFyZW50XCI7XHJcbiAgICBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZVtNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZVtcIlRyYW5zcGFyZW50V2l0aFpXcml0ZVwiXSA9IDNdID0gXCJUcmFuc3BhcmVudFdpdGhaV3JpdGVcIjtcclxufSkoTVRvb25NYXRlcmlhbFJlbmRlck1vZGUgPSBleHBvcnRzLk1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlIHx8IChleHBvcnRzLk1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlID0ge30pKTtcclxudmFyIE1Ub29uTWF0ZXJpYWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKE1Ub29uTWF0ZXJpYWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBNVG9vbk1hdGVyaWFsKHBhcmFtZXRlcnMpIHtcclxuICAgICAgICBpZiAocGFyYW1ldGVycyA9PT0gdm9pZCAwKSB7IHBhcmFtZXRlcnMgPSB7fTsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuaXNNVG9vbk1hdGVyaWFsID0gdHJ1ZTtcclxuICAgICAgICBfdGhpcy5jdXRvZmYgPSAwLjU7XHJcbiAgICAgICAgX3RoaXMuY29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgxLjAsIDEuMCwgMS4wLCAxLjApO1xyXG4gICAgICAgIF90aGlzLnNoYWRlQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjk3LCAwLjgxLCAwLjg2LCAxLjApO1xyXG4gICAgICAgIF90aGlzLm1hcCA9IG51bGw7XHJcbiAgICAgICAgX3RoaXMubWFpblRleF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7XHJcbiAgICAgICAgX3RoaXMuc2hhZGVUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICBfdGhpcy5ub3JtYWxNYXAgPSBudWxsO1xyXG4gICAgICAgIF90aGlzLm5vcm1hbE1hcFR5cGUgPSBUSFJFRS5UYW5nZW50U3BhY2VOb3JtYWxNYXA7XHJcbiAgICAgICAgX3RoaXMubm9ybWFsU2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMigxLjAsIDEuMCk7XHJcbiAgICAgICAgX3RoaXMucmVjZWl2ZVNoYWRvd1JhdGUgPSAxLjA7XHJcbiAgICAgICAgX3RoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgPSBudWxsO1xyXG4gICAgICAgIF90aGlzLnNoYWRpbmdHcmFkZVJhdGUgPSAxLjA7XHJcbiAgICAgICAgX3RoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSA9IG51bGw7XHJcbiAgICAgICAgX3RoaXMuc2hhZGVTaGlmdCA9IDAuMDtcclxuICAgICAgICBfdGhpcy5zaGFkZVRvb255ID0gMC45O1xyXG4gICAgICAgIF90aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IDAuMDtcclxuICAgICAgICBfdGhpcy5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gMC4xO1xyXG4gICAgICAgIF90aGlzLnJpbVRleHR1cmUgPSBudWxsO1xyXG4gICAgICAgIF90aGlzLnJpbUNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICAgICAgICBfdGhpcy5yaW1MaWdodGluZ01peCA9IDAuMDtcclxuICAgICAgICBfdGhpcy5yaW1GcmVzbmVsUG93ZXIgPSAxLjA7XHJcbiAgICAgICAgX3RoaXMucmltTGlmdCA9IDAuMDtcclxuICAgICAgICBfdGhpcy5zcGhlcmVBZGQgPSBudWxsO1xyXG4gICAgICAgIF90aGlzLmVtaXNzaW9uQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAxLjApO1xyXG4gICAgICAgIF90aGlzLmVtaXNzaXZlTWFwID0gbnVsbDtcclxuICAgICAgICBfdGhpcy5vdXRsaW5lV2lkdGhUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICBfdGhpcy5vdXRsaW5lV2lkdGggPSAwLjU7XHJcbiAgICAgICAgX3RoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gMS4wO1xyXG4gICAgICAgIF90aGlzLm91dGxpbmVDb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7XHJcbiAgICAgICAgX3RoaXMub3V0bGluZUxpZ2h0aW5nTWl4ID0gMS4wO1xyXG4gICAgICAgIF90aGlzLnV2QW5pbU1hc2tUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICBfdGhpcy51dkFuaW1TY3JvbGxYID0gMC4wO1xyXG4gICAgICAgIF90aGlzLnV2QW5pbVNjcm9sbFkgPSAwLjA7XHJcbiAgICAgICAgX3RoaXMudXZBbmltUm90YXRpb24gPSAwLjA7XHJcbiAgICAgICAgX3RoaXMuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMuX2RlYnVnTW9kZSA9IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTm9uZTtcclxuICAgICAgICBfdGhpcy5fYmxlbmRNb2RlID0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuT3BhcXVlO1xyXG4gICAgICAgIF90aGlzLl9vdXRsaW5lV2lkdGhNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZTtcclxuICAgICAgICBfdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLkZpeGVkQ29sb3I7XHJcbiAgICAgICAgX3RoaXMuX2N1bGxNb2RlID0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2s7XHJcbiAgICAgICAgX3RoaXMuX291dGxpbmVDdWxsTW9kZSA9IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udDtcclxuICAgICAgICBfdGhpcy5faXNPdXRsaW5lID0gZmFsc2U7XHJcbiAgICAgICAgX3RoaXMuX3V2QW5pbU9mZnNldFggPSAwLjA7XHJcbiAgICAgICAgX3RoaXMuX3V2QW5pbU9mZnNldFkgPSAwLjA7XHJcbiAgICAgICAgX3RoaXMuX3V2QW5pbVBoYXNlID0gMC4wO1xyXG4gICAgICAgIF90aGlzLmVuY29kaW5nID0gcGFyYW1ldGVycy5lbmNvZGluZyB8fCBUSFJFRS5MaW5lYXJFbmNvZGluZztcclxuICAgICAgICBpZiAoX3RoaXMuZW5jb2RpbmcgIT09IFRIUkVFLkxpbmVhckVuY29kaW5nICYmIF90aGlzLmVuY29kaW5nICE9PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgc3BlY2lmaWVkIGNvbG9yIGVuY29kaW5nIGRvZXMgbm90IHdvcmsgcHJvcGVybHkgd2l0aCBNVG9vbk1hdGVyaWFsLiBZb3UgbWlnaHQgd2FudCB0byB1c2UgVEhSRUUuc1JHQkVuY29kaW5nIGluc3RlYWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ21Ub29uVmVyc2lvbicsXHJcbiAgICAgICAgICAgICdzaGFkZVRleHR1cmVfU1QnLFxyXG4gICAgICAgICAgICAnYnVtcE1hcF9TVCcsXHJcbiAgICAgICAgICAgICdyZWNlaXZlU2hhZG93VGV4dHVyZV9TVCcsXHJcbiAgICAgICAgICAgICdzaGFkaW5nR3JhZGVUZXh0dXJlX1NUJyxcclxuICAgICAgICAgICAgJ3JpbVRleHR1cmVfU1QnLFxyXG4gICAgICAgICAgICAnc3BoZXJlQWRkX1NUJyxcclxuICAgICAgICAgICAgJ2VtaXNzaW9uTWFwX1NUJyxcclxuICAgICAgICAgICAgJ291dGxpbmVXaWR0aFRleHR1cmVfU1QnLFxyXG4gICAgICAgICAgICAndXZBbmltTWFza1RleHR1cmVfU1QnLFxyXG4gICAgICAgICAgICAnc3JjQmxlbmQnLFxyXG4gICAgICAgICAgICAnZHN0QmxlbmQnLFxyXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtZXRlcnNba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcclxuICAgICAgICBwYXJhbWV0ZXJzLmxpZ2h0cyA9IHRydWU7XHJcbiAgICAgICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XHJcbiAgICAgICAgcGFyYW1ldGVycy5za2lubmluZyA9IHBhcmFtZXRlcnMuc2tpbm5pbmcgfHwgZmFsc2U7XHJcbiAgICAgICAgcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgPSBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcclxuICAgICAgICBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyA9IHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xyXG4gICAgICAgIHBhcmFtZXRlcnMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtcclxuICAgICAgICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLFxyXG4gICAgICAgICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5ub3JtYWxtYXAsXHJcbiAgICAgICAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLFxyXG4gICAgICAgICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5mb2csXHJcbiAgICAgICAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmxpZ2h0cyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3V0b2ZmOiB7IHZhbHVlOiAwLjUgfSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMS4wLCAxLjAsIDEuMCkgfSxcclxuICAgICAgICAgICAgICAgIGNvbG9yQWxwaGE6IHsgdmFsdWU6IDEuMCB9LFxyXG4gICAgICAgICAgICAgICAgc2hhZGVDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuOTcsIDAuODEsIDAuODYpIH0sXHJcbiAgICAgICAgICAgICAgICBtYWluVGV4X1NUOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApIH0sXHJcbiAgICAgICAgICAgICAgICBzaGFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVTaGFkb3dSYXRlOiB7IHZhbHVlOiAxLjAgfSxcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVTaGFkb3dUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICBzaGFkaW5nR3JhZGVSYXRlOiB7IHZhbHVlOiAxLjAgfSxcclxuICAgICAgICAgICAgICAgIHNoYWRpbmdHcmFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgIHNoYWRlU2hpZnQ6IHsgdmFsdWU6IDAuMCB9LFxyXG4gICAgICAgICAgICAgICAgc2hhZGVUb29ueTogeyB2YWx1ZTogMC45IH0sXHJcbiAgICAgICAgICAgICAgICBsaWdodENvbG9yQXR0ZW51YXRpb246IHsgdmFsdWU6IDAuMCB9LFxyXG4gICAgICAgICAgICAgICAgaW5kaXJlY3RMaWdodEludGVuc2l0eTogeyB2YWx1ZTogMC4xIH0sXHJcbiAgICAgICAgICAgICAgICByaW1UZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICByaW1Db2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXHJcbiAgICAgICAgICAgICAgICByaW1MaWdodGluZ01peDogeyB2YWx1ZTogMC4wIH0sXHJcbiAgICAgICAgICAgICAgICByaW1GcmVzbmVsUG93ZXI6IHsgdmFsdWU6IDEuMCB9LFxyXG4gICAgICAgICAgICAgICAgcmltTGlmdDogeyB2YWx1ZTogMC4wIH0sXHJcbiAgICAgICAgICAgICAgICBzcGhlcmVBZGQ6IHsgdmFsdWU6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaW9uQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxyXG4gICAgICAgICAgICAgICAgb3V0bGluZVdpZHRoVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxyXG4gICAgICAgICAgICAgICAgb3V0bGluZVdpZHRoOiB7IHZhbHVlOiAwLjUgfSxcclxuICAgICAgICAgICAgICAgIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTogeyB2YWx1ZTogMS4wIH0sXHJcbiAgICAgICAgICAgICAgICBvdXRsaW5lQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxyXG4gICAgICAgICAgICAgICAgb3V0bGluZUxpZ2h0aW5nTWl4OiB7IHZhbHVlOiAxLjAgfSxcclxuICAgICAgICAgICAgICAgIHV2QW5pbU1hc2tUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICB1dkFuaW1PZmZzZXRYOiB7IHZhbHVlOiAwLjAgfSxcclxuICAgICAgICAgICAgICAgIHV2QW5pbU9mZnNldFk6IHsgdmFsdWU6IDAuMCB9LFxyXG4gICAgICAgICAgICAgICAgdXZBbmltVGhldGE6IHsgdmFsdWU6IDAuMCB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIF90aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcclxuICAgICAgICBfdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xyXG4gICAgICAgIF90aGlzLl9hcHBseVVuaWZvcm1zKCk7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcIm1haW5UZXhcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTVRvb25NYXRlcmlhbC5wcm90b3R5cGUsIFwiYnVtcE1hcFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vcm1hbE1hcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxNYXAgPSB0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNVG9vbk1hdGVyaWFsLnByb3RvdHlwZSwgXCJidW1wU2NhbGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxTY2FsZS54O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbFNjYWxlLnNldCh0LCB0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTVRvb25NYXRlcmlhbC5wcm90b3R5cGUsIFwiZW1pc3Npb25NYXBcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWlzc2l2ZU1hcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcImJsZW5kTW9kZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ibGVuZE1vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JsZW5kTW9kZSA9IG07XHJcbiAgICAgICAgICAgIHRoaXMuZGVwdGhXcml0ZSA9IHRoaXMuX2JsZW5kTW9kZSAhPT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbnQgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcImRlYnVnTW9kZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnTW9kZSA9IG07XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTVRvb25NYXRlcmlhbC5wcm90b3R5cGUsIFwib3V0bGluZVdpZHRoTW9kZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID0gbTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNVG9vbk1hdGVyaWFsLnByb3RvdHlwZSwgXCJvdXRsaW5lQ29sb3JNb2RlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX291dGxpbmVDb2xvck1vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX291dGxpbmVDb2xvck1vZGUgPSBtO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcImN1bGxNb2RlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1bGxNb2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdWxsTW9kZSA9IG07XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcIm91dGxpbmVDdWxsTW9kZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ3VsbE1vZGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX291dGxpbmVDdWxsTW9kZSA9IG07XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcInpXcml0ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlcHRoV3JpdGUgPyAxIDogMDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXB0aFdyaXRlID0gMC41IDw9IGk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLCBcImlzT3V0bGluZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc091dGxpbmU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzT3V0bGluZSA9IGI7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBNVG9vbk1hdGVyaWFsLnByb3RvdHlwZS51cGRhdGVWUk1NYXRlcmlhbHMgPSBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgICAgICB0aGlzLl91dkFuaW1PZmZzZXRYID0gdGhpcy5fdXZBbmltT2Zmc2V0WCArIGRlbHRhICogdGhpcy51dkFuaW1TY3JvbGxYO1xyXG4gICAgICAgIHRoaXMuX3V2QW5pbU9mZnNldFkgPSB0aGlzLl91dkFuaW1PZmZzZXRZIC0gZGVsdGEgKiB0aGlzLnV2QW5pbVNjcm9sbFk7XHJcbiAgICAgICAgdGhpcy5fdXZBbmltUGhhc2UgPSB0aGlzLl91dkFuaW1QaGFzZSArIGRlbHRhICogdGhpcy51dkFuaW1Sb3RhdGlvbjtcclxuICAgICAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XHJcbiAgICB9O1xyXG4gICAgTVRvb25NYXRlcmlhbC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNvcHkuY2FsbCh0aGlzLCBzb3VyY2UpO1xyXG4gICAgICAgIHRoaXMuY3V0b2ZmID0gc291cmNlLmN1dG9mZjtcclxuICAgICAgICB0aGlzLmNvbG9yLmNvcHkoc291cmNlLmNvbG9yKTtcclxuICAgICAgICB0aGlzLnNoYWRlQ29sb3IuY29weShzb3VyY2Uuc2hhZGVDb2xvcik7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xyXG4gICAgICAgIHRoaXMubWFpblRleF9TVC5jb3B5KHNvdXJjZS5tYWluVGV4X1NUKTtcclxuICAgICAgICB0aGlzLnNoYWRlVGV4dHVyZSA9IHNvdXJjZS5zaGFkZVRleHR1cmU7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xyXG4gICAgICAgIHRoaXMubm9ybWFsTWFwVHlwZSA9IHNvdXJjZS5ub3JtYWxNYXBUeXBlO1xyXG4gICAgICAgIHRoaXMubm9ybWFsU2NhbGUuY29weSh0aGlzLm5vcm1hbFNjYWxlKTtcclxuICAgICAgICB0aGlzLnJlY2VpdmVTaGFkb3dSYXRlID0gc291cmNlLnJlY2VpdmVTaGFkb3dSYXRlO1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgPSBzb3VyY2UucmVjZWl2ZVNoYWRvd1RleHR1cmU7XHJcbiAgICAgICAgdGhpcy5zaGFkaW5nR3JhZGVSYXRlID0gc291cmNlLnNoYWRpbmdHcmFkZVJhdGU7XHJcbiAgICAgICAgdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlID0gc291cmNlLnNoYWRpbmdHcmFkZVRleHR1cmU7XHJcbiAgICAgICAgdGhpcy5zaGFkZVNoaWZ0ID0gc291cmNlLnNoYWRlU2hpZnQ7XHJcbiAgICAgICAgdGhpcy5zaGFkZVRvb255ID0gc291cmNlLnNoYWRlVG9vbnk7XHJcbiAgICAgICAgdGhpcy5saWdodENvbG9yQXR0ZW51YXRpb24gPSBzb3VyY2UubGlnaHRDb2xvckF0dGVudWF0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5kaXJlY3RMaWdodEludGVuc2l0eSA9IHNvdXJjZS5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5O1xyXG4gICAgICAgIHRoaXMucmltVGV4dHVyZSA9IHNvdXJjZS5yaW1UZXh0dXJlO1xyXG4gICAgICAgIHRoaXMucmltQ29sb3IuY29weShzb3VyY2UucmltQ29sb3IpO1xyXG4gICAgICAgIHRoaXMucmltTGlnaHRpbmdNaXggPSBzb3VyY2UucmltTGlnaHRpbmdNaXg7XHJcbiAgICAgICAgdGhpcy5yaW1GcmVzbmVsUG93ZXIgPSBzb3VyY2UucmltRnJlc25lbFBvd2VyO1xyXG4gICAgICAgIHRoaXMucmltTGlmdCA9IHNvdXJjZS5yaW1MaWZ0O1xyXG4gICAgICAgIHRoaXMuc3BoZXJlQWRkID0gc291cmNlLnNwaGVyZUFkZDtcclxuICAgICAgICB0aGlzLmVtaXNzaW9uQ29sb3IuY29weShzb3VyY2UuZW1pc3Npb25Db2xvcik7XHJcbiAgICAgICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcDtcclxuICAgICAgICB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoVGV4dHVyZTtcclxuICAgICAgICB0aGlzLm91dGxpbmVXaWR0aCA9IHNvdXJjZS5vdXRsaW5lV2lkdGg7XHJcbiAgICAgICAgdGhpcy5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgPSBzb3VyY2Uub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMub3V0bGluZUNvbG9yLmNvcHkoc291cmNlLm91dGxpbmVDb2xvcik7XHJcbiAgICAgICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXggPSBzb3VyY2Uub3V0bGluZUxpZ2h0aW5nTWl4O1xyXG4gICAgICAgIHRoaXMudXZBbmltTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltTWFza1RleHR1cmU7XHJcbiAgICAgICAgdGhpcy51dkFuaW1TY3JvbGxYID0gc291cmNlLnV2QW5pbVNjcm9sbFg7XHJcbiAgICAgICAgdGhpcy51dkFuaW1TY3JvbGxZID0gc291cmNlLnV2QW5pbVNjcm9sbFk7XHJcbiAgICAgICAgdGhpcy51dkFuaW1Sb3RhdGlvbiA9IHNvdXJjZS51dkFuaW1Sb3RhdGlvbjtcclxuICAgICAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XHJcbiAgICAgICAgdGhpcy5ibGVuZE1vZGUgPSBzb3VyY2UuYmxlbmRNb2RlO1xyXG4gICAgICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNb2RlO1xyXG4gICAgICAgIHRoaXMub3V0bGluZUNvbG9yTW9kZSA9IHNvdXJjZS5vdXRsaW5lQ29sb3JNb2RlO1xyXG4gICAgICAgIHRoaXMuY3VsbE1vZGUgPSBzb3VyY2UuY3VsbE1vZGU7XHJcbiAgICAgICAgdGhpcy5vdXRsaW5lQ3VsbE1vZGUgPSBzb3VyY2Uub3V0bGluZUN1bGxNb2RlO1xyXG4gICAgICAgIHRoaXMuaXNPdXRsaW5lID0gc291cmNlLmlzT3V0bGluZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBNVG9vbk1hdGVyaWFsLnByb3RvdHlwZS5fYXBwbHlVbmlmb3JtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbU9mZnNldFgudmFsdWUgPSB0aGlzLl91dkFuaW1PZmZzZXRYO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMudXZBbmltT2Zmc2V0WS52YWx1ZSA9IHRoaXMuX3V2QW5pbU9mZnNldFk7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy51dkFuaW1UaGV0YS52YWx1ZSA9IFRBVSAqIHRoaXMuX3V2QW5pbVBoYXNlO1xyXG4gICAgICAgIGlmICghdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5jdXRvZmYudmFsdWUgPSB0aGlzLmN1dG9mZjtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLmNvbG9yLnZhbHVlLnNldFJHQih0aGlzLmNvbG9yLngsIHRoaXMuY29sb3IueSwgdGhpcy5jb2xvci56KTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLmNvbG9yQWxwaGEudmFsdWUgPSB0aGlzLmNvbG9yLnc7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLnNoYWRlQ29sb3IueCwgdGhpcy5zaGFkZUNvbG9yLnksIHRoaXMuc2hhZGVDb2xvci56KTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZSA9IHRoaXMubWFwO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMubWFpblRleF9TVC52YWx1ZS5jb3B5KHRoaXMubWFpblRleF9TVCk7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5zaGFkZVRleHR1cmUudmFsdWUgPSB0aGlzLnNoYWRlVGV4dHVyZTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcC52YWx1ZSA9IHRoaXMubm9ybWFsTWFwO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWUuY29weSh0aGlzLm5vcm1hbFNjYWxlKTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dSYXRlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93UmF0ZTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dUZXh0dXJlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdHcmFkZVJhdGUudmFsdWUgPSB0aGlzLnNoYWRpbmdHcmFkZVJhdGU7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nR3JhZGVUZXh0dXJlLnZhbHVlID0gdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMuc2hhZGVTaGlmdC52YWx1ZSA9IHRoaXMuc2hhZGVTaGlmdDtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVG9vbnkudmFsdWUgPSB0aGlzLnNoYWRlVG9vbnk7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5saWdodENvbG9yQXR0ZW51YXRpb24udmFsdWUgPSB0aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkudmFsdWUgPSB0aGlzLmluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5yaW1UZXh0dXJlLnZhbHVlID0gdGhpcy5yaW1UZXh0dXJlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMucmltQ29sb3IueCwgdGhpcy5yaW1Db2xvci55LCB0aGlzLnJpbUNvbG9yLnopO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXgudmFsdWUgPSB0aGlzLnJpbUxpZ2h0aW5nTWl4O1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMucmltRnJlc25lbFBvd2VyLnZhbHVlID0gdGhpcy5yaW1GcmVzbmVsUG93ZXI7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5yaW1MaWZ0LnZhbHVlID0gdGhpcy5yaW1MaWZ0O1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMuc3BoZXJlQWRkLnZhbHVlID0gdGhpcy5zcGhlcmVBZGQ7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5lbWlzc2lvbkNvbG9yLnZhbHVlLnNldFJHQih0aGlzLmVtaXNzaW9uQ29sb3IueCwgdGhpcy5lbWlzc2lvbkNvbG9yLnksIHRoaXMuZW1pc3Npb25Db2xvci56KTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlID0gdGhpcy5lbWlzc2l2ZU1hcDtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aFRleHR1cmUudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmU7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGgudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aDtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZS52YWx1ZSA9IHRoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLm91dGxpbmVDb2xvci54LCB0aGlzLm91dGxpbmVDb2xvci55LCB0aGlzLm91dGxpbmVDb2xvci56KTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peC52YWx1ZSA9IHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4O1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMudXZBbmltTWFza1RleHR1cmUudmFsdWUgPSB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlO1xyXG4gICAgICAgIGlmICh0aGlzLmVuY29kaW5nID09PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy51bmlmb3Jtcy5jb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaW9uQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XHJcbiAgICB9O1xyXG4gICAgTVRvb25NYXRlcmlhbC5wcm90b3R5cGUuX3VwZGF0ZVNoYWRlckNvZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5kZWZpbmVzID0ge1xyXG4gICAgICAgICAgICBPVVRMSU5FOiB0aGlzLl9pc091dGxpbmUsXHJcbiAgICAgICAgICAgIEJMRU5ETU9ERV9PUEFRVUU6IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuT3BhcXVlLFxyXG4gICAgICAgICAgICBCTEVORE1PREVfQ1VUT1VUOiB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLkN1dG91dCxcclxuICAgICAgICAgICAgQkxFTkRNT0RFX1RSQU5TUEFSRU5UOiB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50IHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50V2l0aFpXcml0ZSxcclxuICAgICAgICAgICAgVVNFX1NIQURFVEVYVFVSRTogdGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGwsXHJcbiAgICAgICAgICAgIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRTogdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgVVNFX1NIQURJTkdHUkFERVRFWFRVUkU6IHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgVVNFX1JJTVRFWFRVUkU6IHRoaXMucmltVGV4dHVyZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgVVNFX1NQSEVSRUFERDogdGhpcy5zcGhlcmVBZGQgIT09IG51bGwsXHJcbiAgICAgICAgICAgIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFOiB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmUgIT09IG51bGwsXHJcbiAgICAgICAgICAgIFVTRV9VVkFOSU1NQVNLVEVYVFVSRTogdGhpcy51dkFuaW1NYXNrVGV4dHVyZSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgREVCVUdfTk9STUFMOiB0aGlzLl9kZWJ1Z01vZGUgPT09IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTm9ybWFsLFxyXG4gICAgICAgICAgICBERUJVR19MSVRTSEFERVJBVEU6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5MaXRTaGFkZVJhdGUsXHJcbiAgICAgICAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuVVYsXHJcbiAgICAgICAgICAgIE9VVExJTkVfV0lEVEhfV09STEQ6IHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLldvcmxkQ29vcmRpbmF0ZXMsXHJcbiAgICAgICAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcyxcclxuICAgICAgICAgICAgT1VUTElORV9DT0xPUl9GSVhFRDogdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUuRml4ZWRDb2xvcixcclxuICAgICAgICAgICAgT1VUTElORV9DT0xPUl9NSVhFRDogdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUuTWl4ZWRMaWdodGluZyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBlbmNvZGluZ3MgPSAodGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGxcclxuICAgICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb25fMS5nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oJ3NoYWRlVGV4dHVyZVRleGVsVG9MaW5lYXInLCB0aGlzLnNoYWRlVGV4dHVyZS5lbmNvZGluZykgKyAnXFxuJ1xyXG4gICAgICAgICAgICA6ICcnKSArXHJcbiAgICAgICAgICAgICh0aGlzLnNwaGVyZUFkZCAhPT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb25fMS5nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oJ3NwaGVyZUFkZFRleGVsVG9MaW5lYXInLCB0aGlzLnNwaGVyZUFkZC5lbmNvZGluZykgKyAnXFxuJ1xyXG4gICAgICAgICAgICAgICAgOiAnJykgK1xyXG4gICAgICAgICAgICAodGhpcy5yaW1UZXh0dXJlICE9PSBudWxsXHJcbiAgICAgICAgICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbl8xLmdldFRleGVsRGVjb2RpbmdGdW5jdGlvbigncmltVGV4dHVyZVRleGVsVG9MaW5lYXInLCB0aGlzLnJpbVRleHR1cmUuZW5jb2RpbmcpICsgJ1xcbidcclxuICAgICAgICAgICAgICAgIDogJycpO1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gbXRvb25fdmVydF8xLmRlZmF1bHQ7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGVuY29kaW5ncyArIG10b29uX2ZyYWdfMS5kZWZhdWx0O1xyXG4gICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIE1Ub29uTWF0ZXJpYWwucHJvdG90eXBlLl91cGRhdGVDdWxsRmFjZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPdXRsaW5lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuT2ZmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuQmFja1NpZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkZyb250U2lkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuT2ZmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuRnJvbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuQmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRnJvbnRTaWRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBNVG9vbk1hdGVyaWFsO1xyXG59KFRIUkVFLlNoYWRlck1hdGVyaWFsKSk7XHJcbmV4cG9ydHMuTVRvb25NYXRlcmlhbCA9IE1Ub29uTWF0ZXJpYWw7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1NYXRlcmlhbEltcG9ydGVyID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbnZhciBNVG9vbk1hdGVyaWFsXzEgPSByZXF1aXJlKFwiLi9NVG9vbk1hdGVyaWFsXCIpO1xyXG52YXIgVlJNVW5saXRNYXRlcmlhbF8xID0gcmVxdWlyZShcIi4vVlJNVW5saXRNYXRlcmlhbFwiKTtcclxudmFyIFZSTU1hdGVyaWFsSW1wb3J0ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVlJNTWF0ZXJpYWxJbXBvcnRlcihvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cclxuICAgICAgICB0aGlzLl9lbmNvZGluZyA9IG9wdGlvbnMuZW5jb2RpbmcgfHwgVEhSRUUuTGluZWFyRW5jb2Rpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VuY29kaW5nICE9PSBUSFJFRS5MaW5lYXJFbmNvZGluZyAmJiB0aGlzLl9lbmNvZGluZyAhPT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVGhlIHNwZWNpZmllZCBjb2xvciBlbmNvZGluZyBtaWdodCBub3Qgd29yayBwcm9wZXJseSB3aXRoIFZSTU1hdGVyaWFsSW1wb3J0ZXIuIFlvdSBtaWdodCB3YW50IHRvIHVzZSBUSFJFRS5zUkdCRW5jb2RpbmcgaW5zdGVhZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdEVudk1hcCA9IG9wdGlvbnMucmVxdWVzdEVudk1hcDtcclxuICAgIH1cclxuICAgIFZSTU1hdGVyaWFsSW1wb3J0ZXIucHJvdG90eXBlLmNvbnZlcnRHTFRGTWF0ZXJpYWxzID0gZnVuY3Rpb24gKGdsdGYpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZybUV4dCwgbWF0ZXJpYWxQcm9wZXJ0aWVzLCBtZXNoZXNNYXAsIG1hdGVyaWFsTGlzdCwgbWF0ZXJpYWxzO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2cm1FeHQgPSAoX2EgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5WUk07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdnJtRXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsUHJvcGVydGllcyA9IHZybUV4dC5tYXRlcmlhbFByb3BlcnRpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0ZXJpYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdtZXNoJyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaGVzTWFwID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbExpc3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgUHJvbWlzZS5hbGwobWVzaGVzTWFwLm1hcChmdW5jdGlvbiAobWVzaCwgbWVzaEluZGV4KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjaGVtYU1lc2gsIHByaW1pdGl2ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFNZXNoID0gZ2x0Zi5wYXJzZXIuanNvbi5tZXNoZXNbbWVzaEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVzID0gbWVzaC50eXBlID09PSAnR3JvdXAnID8gbWVzaC5jaGlsZHJlbiA6IFttZXNoXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIFByb21pc2UuYWxsKHByaW1pdGl2ZXMubWFwKGZ1bmN0aW9uIChwcmltaXRpdmUsIHByaW1pdGl2ZUluZGV4KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2NoZW1hUHJpbWl0aXZlLCBwcmltaXRpdmVHZW9tZXRyeSwgcHJpbWl0aXZlVmVydGljZXMsIHZybU1hdGVyaWFsSW5kZXgsIHByb3BzLCB2cm1NYXRlcmlhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFQcmltaXRpdmUgPSBzY2hlbWFNZXNoLnByaW1pdGl2ZXNbcHJpbWl0aXZlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzY2hlbWFQcmltaXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlR2VvbWV0cnkgPSBwcmltaXRpdmUuZ2VvbWV0cnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVWZXJ0aWNlcyA9IHByaW1pdGl2ZUdlb21ldHJ5LmluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcmltaXRpdmVHZW9tZXRyeS5pbmRleC5jb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJpbWl0aXZlR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAvIDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJpbWl0aXZlLm1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbCA9IFtwcmltaXRpdmUubWF0ZXJpYWxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZUdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybU1hdGVyaWFsSW5kZXggPSBzY2hlbWFQcmltaXRpdmUubWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcyA9IG1hdGVyaWFsUHJvcGVydGllc1t2cm1NYXRlcmlhbEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJWUk1NYXRlcmlhbEltcG9ydGVyOiBUaGVyZSBhcmUgbm8gbWF0ZXJpYWwgZGVmaW5pdGlvbiBmb3IgbWF0ZXJpYWwgI1wiICsgdnJtTWF0ZXJpYWxJbmRleCArIFwiIG9uIFZSTSBleHRlbnNpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzID0geyBzaGFkZXI6ICdWUk1fVVNFX0dMVEZTSEFERVInIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XSkgcmV0dXJuIFszLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybU1hdGVyaWFscyA9IG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0LCB0aGlzLmNyZWF0ZVZSTU1hdGVyaWFscyhwcmltaXRpdmUubWF0ZXJpYWxbMF0sIHByb3BzLCBnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybU1hdGVyaWFscyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XSA9IHZybU1hdGVyaWFscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKHZybU1hdGVyaWFscy5zdXJmYWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2cm1NYXRlcmlhbHMub3V0bGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKHZybU1hdGVyaWFscy5vdXRsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlLm1hdGVyaWFsWzBdID0gdnJtTWF0ZXJpYWxzLnN1cmZhY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVxdWVzdEVudk1hcCAmJiB2cm1NYXRlcmlhbHMuc3VyZmFjZS5pc01lc2hTdGFuZGFyZE1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdEVudk1hcCgpLnRoZW4oZnVuY3Rpb24gKGVudk1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMuc3VyZmFjZS5lbnZNYXAgPSBlbnZNYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybU1hdGVyaWFscy5zdXJmYWNlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5yZW5kZXJPcmRlciA9IHByb3BzLnJlbmRlclF1ZXVlIHx8IDIwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodnJtTWF0ZXJpYWxzLm91dGxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWxbMV0gPSB2cm1NYXRlcmlhbHMub3V0bGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVHZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbWF0ZXJpYWxzXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVlJNTWF0ZXJpYWxJbXBvcnRlci5wcm90b3R5cGUuY3JlYXRlVlJNTWF0ZXJpYWxzID0gZnVuY3Rpb24gKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N1cmZhY2UsIG5ld091dGxpbmUsIHBhcmFtc18xLCBwYXJhbXMsIHBhcmFtcywgcGFyYW1zLCBwYXJhbXM7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9NVG9vbicpKSByZXR1cm4gWzMsIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc18xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ3NyY0JsZW5kJywgJ2RzdEJsZW5kJywgJ2lzRmlyc3RTZXR1cCddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXNfMVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtc18xW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgWydtYWluVGV4JywgJ3NoYWRlVGV4dHVyZScsICdlbWlzc2lvbk1hcCcsICdzcGhlcmVBZGQnLCAncmltVGV4dHVyZSddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXNfMVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zXzFbbmFtZV0uZW5jb2RpbmcgPSBfdGhpcy5fZW5jb2Rpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNfMS5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdXJmYWNlID0gbmV3IE1Ub29uTWF0ZXJpYWxfMS5NVG9vbk1hdGVyaWFsKHBhcmFtc18xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtc18xLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxfMS5NVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Ob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNfMS5pc091dGxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3T3V0bGluZSA9IG5ldyBNVG9vbk1hdGVyaWFsXzEuTVRvb25NYXRlcmlhbChwYXJhbXNfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUZXh0dXJlJykpIHJldHVybiBbMywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0ZildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxfMS5WUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbF8xLlZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRDdXRvdXQnKSkgcmV0dXJuIFszLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbF8xLlZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLkN1dG91dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsXzEuVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDExXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50JykpIHJldHVybiBbMywgOF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0ZildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxfMS5WUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsXzEuVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMsIDExXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJykpIHJldHVybiBbMywgMTBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsXzEuVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWxfMS5WUk1VbmxpdE1hdGVyaWFsKHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMTFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2cm1Qcm9wcy5zaGFkZXIgIT09ICdWUk1fVVNFX0dMVEZTSEFERVInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIHNoYWRlciBkZXRlY3RlZDogXFxcIlwiICsgdnJtUHJvcHMuc2hhZGVyICsgXCJcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N1cmZhY2UgPSB0aGlzLl9jb252ZXJ0R0xURk1hdGVyaWFsKG9yaWdpbmFsTWF0ZXJpYWwuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3VyZmFjZS5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdXJmYWNlLnVzZXJEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvcmlnaW5hbE1hdGVyaWFsLnVzZXJEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N1cmZhY2UudXNlckRhdGEudnJtTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdnJtUHJvcHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdPdXRsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPdXRsaW5lLm5hbWUgPSBvcmlnaW5hbE1hdGVyaWFsLm5hbWUgKyAnIChPdXRsaW5lKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPdXRsaW5lLnVzZXJEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvcmlnaW5hbE1hdGVyaWFsLnVzZXJEYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdPdXRsaW5lLnVzZXJEYXRhLnZybU1hdGVyaWFsUHJvcGVydGllcyA9IHZybVByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cmZhY2U6IG5ld1N1cmZhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZTogbmV3T3V0bGluZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBWUk1NYXRlcmlhbEltcG9ydGVyLnByb3RvdHlwZS5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJWUk1NYXRlcmlhbHM6IEdpdmVuIHByb3BlcnR5IG5hbWUgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBtaWdodCBiZSBpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIGlmICghL1tBLVpdLy50ZXN0KG5hbWVbMF0pKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlZSTU1hdGVyaWFsczogR2l2ZW4gcHJvcGVydHkgbmFtZSBcXFwiXCIgKyBuYW1lICsgXCJcXFwiIG1pZ2h0IGJlIGludmFsaWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZVswXS50b0xvd2VyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XHJcbiAgICB9O1xyXG4gICAgVlJNTWF0ZXJpYWxJbXBvcnRlci5wcm90b3R5cGUuX2NvbnZlcnRHTFRGTWF0ZXJpYWwgPSBmdW5jdGlvbiAobWF0ZXJpYWwpIHtcclxuICAgICAgICBpZiAobWF0ZXJpYWwuaXNNZXNoU3RhbmRhcmRNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICB2YXIgbXRsID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgICAgIGlmIChtdGwubWFwKSB7XHJcbiAgICAgICAgICAgICAgICBtdGwubWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG10bC5lbWlzc2l2ZU1hcCkge1xyXG4gICAgICAgICAgICAgICAgbXRsLmVtaXNzaXZlTWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2VuY29kaW5nID09PSBUSFJFRS5MaW5lYXJFbmNvZGluZykge1xyXG4gICAgICAgICAgICAgICAgbXRsLmNvbG9yLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcclxuICAgICAgICAgICAgICAgIG10bC5lbWlzc2l2ZS5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsLmlzTWVzaEJhc2ljTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgdmFyIG10bCA9IG1hdGVyaWFsO1xyXG4gICAgICAgICAgICBpZiAobXRsLm1hcCkge1xyXG4gICAgICAgICAgICAgICAgbXRsLm1hcC5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmNvZGluZyA9PT0gVEhSRUUuTGluZWFyRW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgICAgIG10bC5jb2xvci5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsO1xyXG4gICAgfTtcclxuICAgIFZSTU1hdGVyaWFsSW1wb3J0ZXIucHJvdG90eXBlLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKSB7XHJcbiAgICAgICAgdmFyIHRhc2tMaXN0ID0gW107XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIGlmICh2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3TmFtZSA9IHRoaXNfMS5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0dXJlSW5kZXggPSB2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIHRhc2tMaXN0LnB1c2goZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHRleHR1cmVJbmRleCkudGhlbihmdW5jdGlvbiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXModnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBfbG9vcF8xKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IE9iamVjdC5rZXlzKHZybVByb3BzLmZsb2F0UHJvcGVydGllcyk7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IF9jW19iXTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gdGhpcy5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IHZybVByb3BzLmZsb2F0UHJvcGVydGllc1tuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodnJtUHJvcHMudmVjdG9yUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICB2YXIgX2xvb3BfMiA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3TmFtZSA9IHRoaXNfMi5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpc1RleHR1cmVTVCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnX01haW5UZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICdfU2hhZGVUZXh0dXJlJyxcclxuICAgICAgICAgICAgICAgICAgICAnX0J1bXBNYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICdfUmVjZWl2ZVNoYWRvd1RleHR1cmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdfU2hhZGluZ0dyYWRlVGV4dHVyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ19SaW1UZXh0dXJlJyxcclxuICAgICAgICAgICAgICAgICAgICAnX1NwaGVyZUFkZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ19FbWlzc2lvbk1hcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ19PdXRsaW5lV2lkdGhUZXh0dXJlJyxcclxuICAgICAgICAgICAgICAgICAgICAnX1V2QW5pbU1hc2tUZXh0dXJlJyxcclxuICAgICAgICAgICAgICAgIF0uc29tZShmdW5jdGlvbiAodGV4dHVyZU5hbWUpIHsgcmV0dXJuIG5hbWUgPT09IHRleHR1cmVOYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1RleHR1cmVTVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld05hbWUgKz0gJ19TVCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSBuZXcgKChfYSA9IFRIUkVFLlZlY3RvcjQpLmJpbmQuYXBwbHkoX2EsIF9fc3ByZWFkQXJyYXlzKFt2b2lkIDBdLCB2cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzW25hbWVdKSkpKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciB0aGlzXzIgPSB0aGlzO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfZCA9IDAsIF9lID0gT2JqZWN0LmtleXModnJtUHJvcHMudmVjdG9yUHJvcGVydGllcyk7IF9kIDwgX2UubGVuZ3RoOyBfZCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IF9lW19kXTtcclxuICAgICAgICAgICAgICAgIF9sb29wXzIobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZybVByb3BzLmtleXdvcmRNYXAuX0FMUEhBVEVTVF9PTiAmJiBwYXJhbXMuYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsXzEuTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuT3BhcXVlKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5ibGVuZE1vZGUgPSBNVG9vbk1hdGVyaWFsXzEuTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuQ3V0b3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJhbXMuc2tpbm5pbmcgPSBvcmlnaW5hbE1hdGVyaWFsLnNraW5uaW5nIHx8IGZhbHNlO1xyXG4gICAgICAgIHBhcmFtcy5tb3JwaFRhcmdldHMgPSBvcmlnaW5hbE1hdGVyaWFsLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcclxuICAgICAgICBwYXJhbXMubW9ycGhOb3JtYWxzID0gb3JpZ2luYWxNYXRlcmlhbC5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRhc2tMaXN0KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBhcmFtczsgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTU1hdGVyaWFsSW1wb3J0ZXI7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVlJNTWF0ZXJpYWxJbXBvcnRlciA9IFZSTU1hdGVyaWFsSW1wb3J0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNVW5saXRNYXRlcmlhbCA9IGV4cG9ydHMuVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIHVubGl0X3ZlcnRfMSA9IHJlcXVpcmUoXCIuL3NoYWRlcnMvdW5saXQudmVydFwiKTtcclxudmFyIHVubGl0X2ZyYWdfMSA9IHJlcXVpcmUoXCIuL3NoYWRlcnMvdW5saXQuZnJhZ1wiKTtcclxudmFyIFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlO1xyXG4oZnVuY3Rpb24gKFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlKSB7XHJcbiAgICBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZVtWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZVtcIk9wYXF1ZVwiXSA9IDBdID0gXCJPcGFxdWVcIjtcclxuICAgIFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlW1ZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlW1wiQ3V0b3V0XCJdID0gMV0gPSBcIkN1dG91dFwiO1xyXG4gICAgVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGVbVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGVbXCJUcmFuc3BhcmVudFwiXSA9IDJdID0gXCJUcmFuc3BhcmVudFwiO1xyXG4gICAgVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGVbVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGVbXCJUcmFuc3BhcmVudFdpdGhaV3JpdGVcIl0gPSAzXSA9IFwiVHJhbnNwYXJlbnRXaXRoWldyaXRlXCI7XHJcbn0pKFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlID0gZXhwb3J0cy5WUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB8fCAoZXhwb3J0cy5WUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSA9IHt9KSk7XHJcbnZhciBWUk1VbmxpdE1hdGVyaWFsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWUk1VbmxpdE1hdGVyaWFsLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVlJNVW5saXRNYXRlcmlhbChwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5pc1ZSTVVubGl0TWF0ZXJpYWwgPSB0cnVlO1xyXG4gICAgICAgIF90aGlzLmN1dG9mZiA9IDAuNTtcclxuICAgICAgICBfdGhpcy5tYXAgPSBudWxsO1xyXG4gICAgICAgIF90aGlzLm1haW5UZXhfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApO1xyXG4gICAgICAgIF90aGlzLl9yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuT3BhcXVlO1xyXG4gICAgICAgIF90aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJhbWV0ZXJzLmZvZyA9IHRydWU7XHJcbiAgICAgICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XHJcbiAgICAgICAgcGFyYW1ldGVycy5za2lubmluZyA9IHBhcmFtZXRlcnMuc2tpbm5pbmcgfHwgZmFsc2U7XHJcbiAgICAgICAgcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgPSBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyB8fCBmYWxzZTtcclxuICAgICAgICBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyA9IHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xyXG4gICAgICAgIHBhcmFtZXRlcnMudW5pZm9ybXMgPSBUSFJFRS5Vbmlmb3Jtc1V0aWxzLm1lcmdlKFtcclxuICAgICAgICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLFxyXG4gICAgICAgICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5mb2csXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1dG9mZjogeyB2YWx1ZTogMC41IH0sXHJcbiAgICAgICAgICAgICAgICBtYWluVGV4X1NUOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgX3RoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIF90aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XHJcbiAgICAgICAgX3RoaXMuX2FwcGx5VW5pZm9ybXMoKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVlJNVW5saXRNYXRlcmlhbC5wcm90b3R5cGUsIFwibWFpblRleFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAgPSB0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWUk1VbmxpdE1hdGVyaWFsLnByb3RvdHlwZSwgXCJyZW5kZXJUeXBlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclR5cGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclR5cGUgPSB0O1xyXG4gICAgICAgICAgICB0aGlzLmRlcHRoV3JpdGUgPSB0aGlzLl9yZW5kZXJUeXBlICE9PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudDtcclxuICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVudCA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFZSTVVubGl0TWF0ZXJpYWwucHJvdG90eXBlLnVwZGF0ZVZSTU1hdGVyaWFscyA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcclxuICAgIH07XHJcbiAgICBWUk1VbmxpdE1hdGVyaWFsLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29weS5jYWxsKHRoaXMsIHNvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5jdXRvZmYgPSBzb3VyY2UuY3V0b2ZmO1xyXG4gICAgICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcclxuICAgICAgICB0aGlzLm1haW5UZXhfU1QuY29weShzb3VyY2UubWFpblRleF9TVCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gc291cmNlLnJlbmRlclR5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgVlJNVW5saXRNYXRlcmlhbC5wcm90b3R5cGUuX2FwcGx5VW5pZm9ybXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1zLmN1dG9mZi52YWx1ZSA9IHRoaXMuY3V0b2ZmO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdGhpcy5tYXA7XHJcbiAgICAgICAgdGhpcy51bmlmb3Jtcy5tYWluVGV4X1NULnZhbHVlLmNvcHkodGhpcy5tYWluVGV4X1NUKTtcclxuICAgIH07XHJcbiAgICBWUk1VbmxpdE1hdGVyaWFsLnByb3RvdHlwZS5fdXBkYXRlU2hhZGVyQ29kZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmRlZmluZXMgPSB7XHJcbiAgICAgICAgICAgIFJFTkRFUlRZUEVfT1BBUVVFOiB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWUsXHJcbiAgICAgICAgICAgIFJFTkRFUlRZUEVfQ1VUT1VUOiB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5DdXRvdXQsXHJcbiAgICAgICAgICAgIFJFTkRFUlRZUEVfVFJBTlNQQVJFTlQ6IHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50IHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudFdpdGhaV3JpdGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IHVubGl0X3ZlcnRfMS5kZWZhdWx0O1xyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSB1bmxpdF9mcmFnXzEuZGVmYXVsdDtcclxuICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNVW5saXRNYXRlcmlhbDtcclxufShUSFJFRS5TaGFkZXJNYXRlcmlhbCkpO1xyXG5leHBvcnRzLlZSTVVubGl0TWF0ZXJpYWwgPSBWUk1VbmxpdE1hdGVyaWFsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmdldFRleGVsRGVjb2RpbmdGdW5jdGlvbiA9IGV4cG9ydHMuZ2V0RW5jb2RpbmdDb21wb25lbnRzID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbmV4cG9ydHMuZ2V0RW5jb2RpbmdDb21wb25lbnRzID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XHJcbiAgICAgICAgY2FzZSBUSFJFRS5MaW5lYXJFbmNvZGluZzpcclxuICAgICAgICAgICAgcmV0dXJuIFsnTGluZWFyJywgJyggdmFsdWUgKSddO1xyXG4gICAgICAgIGNhc2UgVEhSRUUuc1JHQkVuY29kaW5nOlxyXG4gICAgICAgICAgICByZXR1cm4gWydzUkdCJywgJyggdmFsdWUgKSddO1xyXG4gICAgICAgIGNhc2UgVEhSRUUuUkdCRUVuY29kaW5nOlxyXG4gICAgICAgICAgICByZXR1cm4gWydSR0JFJywgJyggdmFsdWUgKSddO1xyXG4gICAgICAgIGNhc2UgVEhSRUUuUkdCTTdFbmNvZGluZzpcclxuICAgICAgICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCA3LjAgKSddO1xyXG4gICAgICAgIGNhc2UgVEhSRUUuUkdCTTE2RW5jb2Rpbmc6XHJcbiAgICAgICAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgMTYuMCApJ107XHJcbiAgICAgICAgY2FzZSBUSFJFRS5SR0JERW5jb2Rpbmc6XHJcbiAgICAgICAgICAgIHJldHVybiBbJ1JHQkQnLCAnKCB2YWx1ZSwgMjU2LjAgKSddO1xyXG4gICAgICAgIGNhc2UgVEhSRUUuR2FtbWFFbmNvZGluZzpcclxuICAgICAgICAgICAgcmV0dXJuIFsnR2FtbWEnLCAnKCB2YWx1ZSwgZmxvYXQoIEdBTU1BX0ZBQ1RPUiApICknXTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLmdldFRleGVsRGVjb2RpbmdGdW5jdGlvbiA9IGZ1bmN0aW9uIChmdW5jdGlvbk5hbWUsIGVuY29kaW5nKSB7XHJcbiAgICB2YXIgY29tcG9uZW50cyA9IGV4cG9ydHMuZ2V0RW5jb2RpbmdDb21wb25lbnRzKGVuY29kaW5nKTtcclxuICAgIHJldHVybiAndmVjNCAnICsgZnVuY3Rpb25OYW1lICsgJyggdmVjNCB2YWx1ZSApIHsgcmV0dXJuICcgKyBjb21wb25lbnRzWzBdICsgJ1RvTGluZWFyJyArIGNvbXBvbmVudHNbMV0gKyAnOyB9JztcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KSk7XHJcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9NVG9vbk1hdGVyaWFsXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1ZSTU1hdGVyaWFsSW1wb3J0ZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNVW5saXRNYXRlcmlhbFwiKSwgZXhwb3J0cyk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IFwiLy8gI2RlZmluZSBQSE9OR1xcblxcbiNpZmRlZiBCTEVORE1PREVfQ1VUT1VUXFxuICB1bmlmb3JtIGZsb2F0IGN1dG9mZjtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIHZlYzMgY29sb3I7XFxudW5pZm9ybSBmbG9hdCBjb2xvckFscGhhO1xcbnVuaWZvcm0gdmVjMyBzaGFkZUNvbG9yO1xcbiNpZmRlZiBVU0VfU0hBREVURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBzaGFkZVRleHR1cmU7XFxuI2VuZGlmXFxuXFxudW5pZm9ybSBmbG9hdCByZWNlaXZlU2hhZG93UmF0ZTtcXG4jaWZkZWYgVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCByZWNlaXZlU2hhZG93VGV4dHVyZTtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIGZsb2F0IHNoYWRpbmdHcmFkZVJhdGU7XFxuI2lmZGVmIFVTRV9TSEFESU5HR1JBREVURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBzaGFkaW5nR3JhZGVUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgc2hhZGVTaGlmdDtcXG51bmlmb3JtIGZsb2F0IHNoYWRlVG9vbnk7XFxudW5pZm9ybSBmbG9hdCBsaWdodENvbG9yQXR0ZW51YXRpb247XFxudW5pZm9ybSBmbG9hdCBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5O1xcblxcbiNpZmRlZiBVU0VfUklNVEVYVFVSRVxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgcmltVGV4dHVyZTtcXG4jZW5kaWZcXG51bmlmb3JtIHZlYzMgcmltQ29sb3I7XFxudW5pZm9ybSBmbG9hdCByaW1MaWdodGluZ01peDtcXG51bmlmb3JtIGZsb2F0IHJpbUZyZXNuZWxQb3dlcjtcXG51bmlmb3JtIGZsb2F0IHJpbUxpZnQ7XFxuXFxuI2lmZGVmIFVTRV9TUEhFUkVBRERcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNwaGVyZUFkZDtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIHZlYzMgZW1pc3Npb25Db2xvcjtcXG5cXG51bmlmb3JtIHZlYzMgb3V0bGluZUNvbG9yO1xcbnVuaWZvcm0gZmxvYXQgb3V0bGluZUxpZ2h0aW5nTWl4O1xcblxcbiNpZmRlZiBVU0VfVVZBTklNTUFTS1RFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHV2QW5pbU1hc2tUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgdXZBbmltT2Zmc2V0WDtcXG51bmlmb3JtIGZsb2F0IHV2QW5pbU9mZnNldFk7XFxudW5pZm9ybSBmbG9hdCB1dkFuaW1UaGV0YTtcXG5cXG4jaW5jbHVkZSA8Y29tbW9uPlxcbiNpbmNsdWRlIDxwYWNraW5nPlxcbiNpbmNsdWRlIDxkaXRoZXJpbmdfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8Y29sb3JfcGFyc19mcmFnbWVudD5cXG5cXG4vLyAjaW5jbHVkZSA8dXZfcGFyc19mcmFnbWVudD5cXG4jaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1VWQU5JTU1BU0tURVhUVVJFIClcXG4gIHZhcnlpbmcgdmVjMiB2VXY7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YWxwaGFtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8YW9tYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8bGlnaHRtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8ZW1pc3NpdmVtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8ZW52bWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGdyYWRpZW50bWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGZvZ19wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxic2Rmcz5cXG4jaW5jbHVkZSA8bGlnaHRzX3BhcnNfYmVnaW4+XFxuXFxuLy8gI2luY2x1ZGUgPGxpZ2h0c19waG9uZ19wYXJzX2ZyYWdtZW50PlxcbnZhcnlpbmcgdmVjMyB2Vmlld1Bvc2l0aW9uO1xcblxcbiNpZm5kZWYgRkxBVF9TSEFERURcXG4gIHZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcbiNlbmRpZlxcblxcbiNkZWZpbmUgTWF0ZXJpYWxfTGlnaHRQcm9iZUxPRCggbWF0ZXJpYWwgKSAoMClcXG5cXG4jaW5jbHVkZSA8c2hhZG93bWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGJ1bXBtYXBfcGFyc19mcmFnbWVudD5cXG5cXG4vLyAjaW5jbHVkZSA8bm9ybWFsbWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2lmZGVmIFVTRV9OT1JNQUxNQVBcXG5cXG4gIHVuaWZvcm0gc2FtcGxlcjJEIG5vcm1hbE1hcDtcXG4gIHVuaWZvcm0gdmVjMiBub3JtYWxTY2FsZTtcXG5cXG4jZW5kaWZcXG5cXG4jaWZkZWYgT0JKRUNUU1BBQ0VfTk9STUFMTUFQXFxuXFxuICB1bmlmb3JtIG1hdDMgbm9ybWFsTWF0cml4O1xcblxcbiNlbmRpZlxcblxcbiNpZiAhIGRlZmluZWQgKCBVU0VfVEFOR0VOVCApICYmIGRlZmluZWQgKCBUQU5HRU5UU1BBQ0VfTk9STUFMTUFQIClcXG5cXG4gIC8vIFBlci1QaXhlbCBUYW5nZW50IFNwYWNlIE5vcm1hbCBNYXBwaW5nXFxuICAvLyBodHRwOi8vaGFja3NvZmxpZmUuYmxvZ3Nwb3QuY2gvMjAwOS8xMS9wZXItcGl4ZWwtdGFuZ2VudC1zcGFjZS1ub3JtYWwtbWFwcGluZy5odG1sXFxuXFxuICAvLyB0aHJlZS12cm0gc3BlY2lmaWMgY2hhbmdlOiBpdCByZXF1aXJlcyBgdXZgIGFzIGFuIGlucHV0IGluIG9yZGVyIHRvIHN1cHBvcnQgdXYgc2Nyb2xsc1xcblxcbiAgdmVjMyBwZXJ0dXJiTm9ybWFsMkFyYiggdmVjMiB1diwgdmVjMyBleWVfcG9zLCB2ZWMzIHN1cmZfbm9ybSwgdmVjMyBtYXBOICkge1xcblxcbiAgICAvLyBXb3JrYXJvdW5kIGZvciBBZHJlbm8gM1hYIGRGZCooIHZlYzMgKSBidWcuIFNlZSAjOTk4OFxcblxcbiAgICB2ZWMzIHEwID0gdmVjMyggZEZkeCggZXllX3Bvcy54ICksIGRGZHgoIGV5ZV9wb3MueSApLCBkRmR4KCBleWVfcG9zLnogKSApO1xcbiAgICB2ZWMzIHExID0gdmVjMyggZEZkeSggZXllX3Bvcy54ICksIGRGZHkoIGV5ZV9wb3MueSApLCBkRmR5KCBleWVfcG9zLnogKSApO1xcbiAgICB2ZWMyIHN0MCA9IGRGZHgoIHV2LnN0ICk7XFxuICAgIHZlYzIgc3QxID0gZEZkeSggdXYuc3QgKTtcXG5cXG4gICAgZmxvYXQgc2NhbGUgPSBzaWduKCBzdDEudCAqIHN0MC5zIC0gc3QwLnQgKiBzdDEucyApOyAvLyB3ZSBkbyBub3QgY2FyZSBhYm91dCB0aGUgbWFnbml0dWRlXFxuXFxuICAgIHZlYzMgUyA9ICggcTAgKiBzdDEudCAtIHExICogc3QwLnQgKSAqIHNjYWxlO1xcbiAgICB2ZWMzIFQgPSAoIC0gcTAgKiBzdDEucyArIHExICogc3QwLnMgKSAqIHNjYWxlO1xcblxcbiAgICAvLyB0aHJlZS12cm0gc3BlY2lmaWMgY2hhbmdlOiBXb3JrYXJvdW5kIGZvciB0aGUgaXNzdWUgdGhhdCBoYXBwZW5zIHdoZW4gZGVsdGEgb2YgdXYgPSAwLjBcXG4gICAgLy8gVE9ETzogSXMgdGhpcyBzdGlsbCByZXF1aXJlZD8gT3Igc2hhbGwgSSBtYWtlIGEgUFIgYWJvdXQgaXQ/XFxuXFxuICAgIGlmICggbGVuZ3RoKCBTICkgPT0gMC4wIHx8IGxlbmd0aCggVCApID09IDAuMCApIHtcXG4gICAgICByZXR1cm4gc3VyZl9ub3JtO1xcbiAgICB9XFxuXFxuICAgIFMgPSBub3JtYWxpemUoIFMgKTtcXG4gICAgVCA9IG5vcm1hbGl6ZSggVCApO1xcbiAgICB2ZWMzIE4gPSBub3JtYWxpemUoIHN1cmZfbm9ybSApO1xcblxcbiAgICAjaWZkZWYgRE9VQkxFX1NJREVEXFxuXFxuICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgQWRyZW5vIEdQVXMgZ2xfRnJvbnRGYWNpbmcgYnVnLiBTZWUgIzE1ODUwIGFuZCAjMTAzMzFcXG5cXG4gICAgICBib29sIGZyb250RmFjaW5nID0gZG90KCBjcm9zcyggUywgVCApLCBOICkgPiAwLjA7XFxuXFxuICAgICAgbWFwTi54eSAqPSAoIGZsb2F0KCBmcm9udEZhY2luZyApICogMi4wIC0gMS4wICk7XFxuXFxuICAgICNlbHNlXFxuXFxuICAgICAgbWFwTi54eSAqPSAoIGZsb2F0KCBnbF9Gcm9udEZhY2luZyApICogMi4wIC0gMS4wICk7XFxuXFxuICAgICNlbmRpZlxcblxcbiAgICBtYXQzIHRzbiA9IG1hdDMoIFMsIFQsIE4gKTtcXG4gICAgcmV0dXJuIG5vcm1hbGl6ZSggdHNuICogbWFwTiApO1xcblxcbiAgfVxcblxcbiNlbmRpZlxcblxcbi8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc19mcmFnbWVudD5cXG5cXG4vLyA9PSBsaWdodGluZyBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbmZsb2F0IGdldExpZ2h0SW50ZW5zaXR5KFxcbiAgY29uc3QgaW4gSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodCxcXG4gIGNvbnN0IGluIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnksXFxuICBjb25zdCBpbiBmbG9hdCBzaGFkb3csXFxuICBjb25zdCBpbiBmbG9hdCBzaGFkaW5nR3JhZGVcXG4pIHtcXG4gIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZG90KCBnZW9tZXRyeS5ub3JtYWwsIGRpcmVjdExpZ2h0LmRpcmVjdGlvbiApO1xcbiAgbGlnaHRJbnRlbnNpdHkgPSAwLjUgKyAwLjUgKiBsaWdodEludGVuc2l0eTtcXG4gIGxpZ2h0SW50ZW5zaXR5ID0gbGlnaHRJbnRlbnNpdHkgKiBzaGFkb3c7XFxuICBsaWdodEludGVuc2l0eSA9IGxpZ2h0SW50ZW5zaXR5ICogc2hhZGluZ0dyYWRlO1xcbiAgbGlnaHRJbnRlbnNpdHkgPSBsaWdodEludGVuc2l0eSAqIDIuMCAtIDEuMDtcXG4gIHJldHVybiBzaGFkZVRvb255ID09IDEuMFxcbiAgICA/IHN0ZXAoIHNoYWRlU2hpZnQsIGxpZ2h0SW50ZW5zaXR5IClcXG4gICAgOiBzbW9vdGhzdGVwKCBzaGFkZVNoaWZ0LCBzaGFkZVNoaWZ0ICsgKCAxLjAgLSBzaGFkZVRvb255ICksIGxpZ2h0SW50ZW5zaXR5ICk7XFxufVxcblxcbnZlYzMgZ2V0TGlnaHRpbmcoIGNvbnN0IGluIHZlYzMgbGlnaHRDb2xvciApIHtcXG4gIHZlYzMgbGlnaHRpbmcgPSBsaWdodENvbG9yO1xcbiAgbGlnaHRpbmcgPSBtaXgoXFxuICAgIGxpZ2h0aW5nLFxcbiAgICB2ZWMzKCBtYXgoIDAuMDAxLCBtYXgoIGxpZ2h0aW5nLngsIG1heCggbGlnaHRpbmcueSwgbGlnaHRpbmcueiApICkgKSApLFxcbiAgICBsaWdodENvbG9yQXR0ZW51YXRpb25cXG4gICk7XFxuXFxuICAjaWZuZGVmIFBIWVNJQ0FMTFlfQ09SUkVDVF9MSUdIVFNcXG4gICAgbGlnaHRpbmcgKj0gUEk7XFxuICAjZW5kaWZcXG5cXG4gIHJldHVybiBsaWdodGluZztcXG59XFxuXFxudmVjMyBnZXREaWZmdXNlKFxcbiAgY29uc3QgaW4gdmVjMyBsaXQsXFxuICBjb25zdCBpbiB2ZWMzIHNoYWRlLFxcbiAgY29uc3QgaW4gZmxvYXQgbGlnaHRJbnRlbnNpdHksXFxuICBjb25zdCBpbiB2ZWMzIGxpZ2h0aW5nXFxuKSB7XFxuICAjaWZkZWYgREVCVUdfTElUU0hBREVSQVRFXFxuICAgIHJldHVybiB2ZWMzKCBCUkRGX0RpZmZ1c2VfTGFtYmVydCggbGlnaHRJbnRlbnNpdHkgKiBsaWdodGluZyApICk7XFxuICAjZW5kaWZcXG5cXG4gIHJldHVybiBsaWdodGluZyAqIEJSREZfRGlmZnVzZV9MYW1iZXJ0KCBtaXgoIHNoYWRlLCBsaXQsIGxpZ2h0SW50ZW5zaXR5ICkgKTtcXG59XFxuXFxudmVjMyBjYWxjRGlyZWN0RGlmZnVzZShcXG4gIGNvbnN0IGluIHZlYzIgdXYsXFxuICBjb25zdCBpbiB2ZWMzIGxpdCxcXG4gIGNvbnN0IGluIHZlYzMgc2hhZGUsXFxuICBpbiBHZW9tZXRyaWNDb250ZXh0IGdlb21ldHJ5LFxcbiAgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHRcXG4pIHtcXG4gIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQ7XFxuICB2ZWMzIGxpZ2h0aW5nU3VtID0gdmVjMyggMC4wICk7XFxuXFxuICBmbG9hdCBzaGFkaW5nR3JhZGUgPSAxLjA7XFxuICAjaWZkZWYgVVNFX1NIQURJTkdHUkFERVRFWFRVUkVcXG4gICAgc2hhZGluZ0dyYWRlID0gMS4wIC0gc2hhZGluZ0dyYWRlUmF0ZSAqICggMS4wIC0gdGV4dHVyZTJEKCBzaGFkaW5nR3JhZGVUZXh0dXJlLCB1diApLnIgKTtcXG4gICNlbmRpZlxcblxcbiAgZmxvYXQgcmVjZWl2ZVNoYWRvdyA9IHJlY2VpdmVTaGFkb3dSYXRlO1xcbiAgI2lmZGVmIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRVxcbiAgICByZWNlaXZlU2hhZG93ICo9IHRleHR1cmUyRCggcmVjZWl2ZVNoYWRvd1RleHR1cmUsIHV2ICkuYTtcXG4gICNlbmRpZlxcblxcbiAgI2lmICggTlVNX1BPSU5UX0xJR0hUUyA+IDAgKVxcbiAgICBQb2ludExpZ2h0IHBvaW50TGlnaHQ7XFxuXFxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcXG4gICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX1BPSU5UX0xJR0hUUzsgaSArKyApIHtcXG4gICAgICBwb2ludExpZ2h0ID0gcG9pbnRMaWdodHNbIGkgXTtcXG4gICAgICBnZXRQb2ludERpcmVjdExpZ2h0SXJyYWRpYW5jZSggcG9pbnRMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XFxuXFxuICAgICAgZmxvYXQgYXR0ZW4gPSAxLjA7XFxuICAgICAgI2lmZGVmIFVTRV9TSEFET1dNQVBcXG4gICAgICAgIGF0dGVuID0gYWxsKCBidmVjMiggcG9pbnRMaWdodC5zaGFkb3csIGRpcmVjdExpZ2h0LnZpc2libGUgKSApID8gZ2V0UG9pbnRTaGFkb3coIHBvaW50U2hhZG93TWFwWyBpIF0sIHBvaW50TGlnaHQuc2hhZG93TWFwU2l6ZSwgcG9pbnRMaWdodC5zaGFkb3dCaWFzLCBwb2ludExpZ2h0LnNoYWRvd1JhZGl1cywgdlBvaW50U2hhZG93Q29vcmRbIGkgXSwgcG9pbnRMaWdodC5zaGFkb3dDYW1lcmFOZWFyLCBwb2ludExpZ2h0LnNoYWRvd0NhbWVyYUZhciApIDogMS4wO1xcbiAgICAgICNlbmRpZlxcblxcbiAgICAgIGZsb2F0IHNoYWRvdyA9IDEuMCAtIHJlY2VpdmVTaGFkb3cgKiAoIDEuMCAtICggMC41ICsgMC41ICogYXR0ZW4gKSApO1xcbiAgICAgIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZ2V0TGlnaHRJbnRlbnNpdHkoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgc2hhZG93LCBzaGFkaW5nR3JhZGUgKTtcXG4gICAgICB2ZWMzIGxpZ2h0aW5nID0gZ2V0TGlnaHRpbmcoIGRpcmVjdExpZ2h0LmNvbG9yICk7XFxuICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBsaXQsIHNoYWRlLCBsaWdodEludGVuc2l0eSwgbGlnaHRpbmcgKTtcXG4gICAgICBsaWdodGluZ1N1bSArPSBsaWdodGluZztcXG4gICAgfVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxcbiAgI2VuZGlmXFxuXFxuICAjaWYgKCBOVU1fU1BPVF9MSUdIVFMgPiAwIClcXG4gICAgU3BvdExpZ2h0IHNwb3RMaWdodDtcXG5cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fU1BPVF9MSUdIVFM7IGkgKysgKSB7XFxuICAgICAgc3BvdExpZ2h0ID0gc3BvdExpZ2h0c1sgaSBdO1xcbiAgICAgIGdldFNwb3REaXJlY3RMaWdodElycmFkaWFuY2UoIHNwb3RMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XFxuXFxuICAgICAgZmxvYXQgYXR0ZW4gPSAxLjA7XFxuICAgICAgI2lmZGVmIFVTRV9TSEFET1dNQVBcXG4gICAgICAgIGF0dGVuID0gYWxsKCBidmVjMiggc3BvdExpZ2h0LnNoYWRvdywgZGlyZWN0TGlnaHQudmlzaWJsZSApICkgPyBnZXRTaGFkb3coIHNwb3RTaGFkb3dNYXBbIGkgXSwgc3BvdExpZ2h0LnNoYWRvd01hcFNpemUsIHNwb3RMaWdodC5zaGFkb3dCaWFzLCBzcG90TGlnaHQuc2hhZG93UmFkaXVzLCB2U3BvdFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcXG4gICAgICAjZW5kaWZcXG5cXG4gICAgICBmbG9hdCBzaGFkb3cgPSAxLjAgLSByZWNlaXZlU2hhZG93ICogKCAxLjAgLSAoIDAuNSArIDAuNSAqIGF0dGVuICkgKTtcXG4gICAgICBmbG9hdCBsaWdodEludGVuc2l0eSA9IGdldExpZ2h0SW50ZW5zaXR5KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIHNoYWRvdywgc2hhZGluZ0dyYWRlICk7XFxuICAgICAgdmVjMyBsaWdodGluZyA9IGdldExpZ2h0aW5nKCBkaXJlY3RMaWdodC5jb2xvciApO1xcbiAgICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgKz0gZ2V0RGlmZnVzZSggbGl0LCBzaGFkZSwgbGlnaHRJbnRlbnNpdHksIGxpZ2h0aW5nICk7XFxuICAgICAgbGlnaHRpbmdTdW0gKz0gbGlnaHRpbmc7XFxuICAgIH1cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcXG4gICNlbmRpZlxcblxcbiAgI2lmICggTlVNX0RJUl9MSUdIVFMgPiAwIClcXG4gICAgRGlyZWN0aW9uYWxMaWdodCBkaXJlY3Rpb25hbExpZ2h0O1xcblxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9ESVJfTElHSFRTOyBpICsrICkge1xcbiAgICAgIGRpcmVjdGlvbmFsTGlnaHQgPSBkaXJlY3Rpb25hbExpZ2h0c1sgaSBdO1xcbiAgICAgIGdldERpcmVjdGlvbmFsRGlyZWN0TGlnaHRJcnJhZGlhbmNlKCBkaXJlY3Rpb25hbExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcXG5cXG4gICAgICBmbG9hdCBhdHRlbiA9IDEuMDtcXG4gICAgICAjaWZkZWYgVVNFX1NIQURPV01BUFxcbiAgICAgICAgYXR0ZW4gPSBhbGwoIGJ2ZWMyKCBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvdywgZGlyZWN0TGlnaHQudmlzaWJsZSApICkgPyBnZXRTaGFkb3coIGRpcmVjdGlvbmFsU2hhZG93TWFwWyBpIF0sIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93TWFwU2l6ZSwgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3dCaWFzLCBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvd1JhZGl1cywgdkRpcmVjdGlvbmFsU2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xcbiAgICAgICNlbmRpZlxcblxcbiAgICAgIGZsb2F0IHNoYWRvdyA9IDEuMCAtIHJlY2VpdmVTaGFkb3cgKiAoIDEuMCAtICggMC41ICsgMC41ICogYXR0ZW4gKSApO1xcbiAgICAgIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZ2V0TGlnaHRJbnRlbnNpdHkoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgc2hhZG93LCBzaGFkaW5nR3JhZGUgKTtcXG4gICAgICB2ZWMzIGxpZ2h0aW5nID0gZ2V0TGlnaHRpbmcoIGRpcmVjdExpZ2h0LmNvbG9yICk7XFxuICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBsaXQsIHNoYWRlLCBsaWdodEludGVuc2l0eSwgbGlnaHRpbmcgKTtcXG4gICAgICBsaWdodGluZ1N1bSArPSBsaWdodGluZztcXG4gICAgfVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxcbiAgI2VuZGlmXFxuXFxuICByZXR1cm4gbGlnaHRpbmdTdW07XFxufVxcblxcbi8vID09IHBvc3QgY29ycmVjdGlvbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxudm9pZCBwb3N0Q29ycmVjdGlvbigpIHtcXG4gICNpbmNsdWRlIDx0b25lbWFwcGluZ19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxlbmNvZGluZ3NfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8Zm9nX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPHByZW11bHRpcGxpZWRfYWxwaGFfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8ZGl0aGVyaW5nX2ZyYWdtZW50Plxcbn1cXG5cXG4vLyA9PSBtYWluIHByb2NlZHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbnZvaWQgbWFpbigpIHtcXG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfZnJhZ21lbnQ+XFxuXFxuICB2ZWMyIHV2ID0gdmVjMigwLjUsIDAuNSk7XFxuXFxuICAjaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1VWQU5JTU1BU0tURVhUVVJFIClcXG4gICAgdXYgPSB2VXY7XFxuXFxuICAgIGZsb2F0IHV2QW5pbU1hc2sgPSAxLjA7XFxuICAgICNpZmRlZiBVU0VfVVZBTklNTUFTS1RFWFRVUkVcXG4gICAgICB1dkFuaW1NYXNrID0gdGV4dHVyZTJEKCB1dkFuaW1NYXNrVGV4dHVyZSwgdXYgKS54O1xcbiAgICAjZW5kaWZcXG5cXG4gICAgdXYgPSB1diArIHZlYzIoIHV2QW5pbU9mZnNldFgsIHV2QW5pbU9mZnNldFkgKSAqIHV2QW5pbU1hc2s7XFxuICAgIGZsb2F0IHV2Um90Q29zID0gY29zKCB1dkFuaW1UaGV0YSAqIHV2QW5pbU1hc2sgKTtcXG4gICAgZmxvYXQgdXZSb3RTaW4gPSBzaW4oIHV2QW5pbVRoZXRhICogdXZBbmltTWFzayApO1xcbiAgICB1diA9IG1hdDIoIHV2Um90Q29zLCB1dlJvdFNpbiwgLXV2Um90U2luLCB1dlJvdENvcyApICogKCB1diAtIDAuNSApICsgMC41O1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgREVCVUdfVVZcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggMC4wLCAwLjAsIDAuMCwgMS4wICk7XFxuICAgICNpZiBkZWZpbmVkKCBVU0VfTUFQICkgfHwgZGVmaW5lZCggVVNFX1NIQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9OT1JNQUxNQVAgKSB8fCBkZWZpbmVkKCBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfU0hBRElOR0dSQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9SSU1URVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX0VNSVNTSVZFTUFQICkgfHwgZGVmaW5lZCggVVNFX09VVExJTkVXSURUSFRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfVVZBTklNTUFTS1RFWFRVUkUgKVxcbiAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIHV2LCAwLjAsIDEuMCApO1xcbiAgICAjZW5kaWZcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICB2ZWM0IGRpZmZ1c2VDb2xvciA9IHZlYzQoIGNvbG9yLCBjb2xvckFscGhhICk7XFxuICBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodCA9IFJlZmxlY3RlZExpZ2h0KCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSApO1xcbiAgdmVjMyB0b3RhbEVtaXNzaXZlUmFkaWFuY2UgPSBlbWlzc2lvbkNvbG9yO1xcblxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX2ZyYWdtZW50PlxcblxcbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIGRpZmZ1c2VDb2xvciAqPSBtYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIG1hcCwgdXYgKSApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8Y29sb3JfZnJhZ21lbnQ+XFxuICAvLyAjaW5jbHVkZSA8YWxwaGFtYXBfZnJhZ21lbnQ+XFxuXFxuICAvLyAtLSBNVG9vbjogYWxwaGEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIC8vICNpbmNsdWRlIDxhbHBoYXRlc3RfZnJhZ21lbnQ+XFxuICAjaWZkZWYgQkxFTkRNT0RFX0NVVE9VVFxcbiAgICBpZiAoIGRpZmZ1c2VDb2xvci5hIDw9IGN1dG9mZiApIHsgZGlzY2FyZDsgfVxcbiAgICBkaWZmdXNlQ29sb3IuYSA9IDEuMDtcXG4gICNlbmRpZlxcblxcbiAgI2lmZGVmIEJMRU5ETU9ERV9PUEFRVUVcXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gICNpZiBkZWZpbmVkKCBPVVRMSU5FICkgJiYgZGVmaW5lZCggT1VUTElORV9DT0xPUl9GSVhFRCApIC8vIG9taXR0aW5nIERlYnVnTW9kZVxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBvdXRsaW5lQ29sb3IsIGRpZmZ1c2VDb2xvci5hICk7XFxuICAgIHBvc3RDb3JyZWN0aW9uKCk7XFxuICAgIHJldHVybjtcXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9iZWdpbj5cXG5cXG4gICNpZmRlZiBPVVRMSU5FXFxuICAgIG5vcm1hbCAqPSAtMS4wO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8bm9ybWFsX2ZyYWdtZW50X21hcHM+XFxuXFxuICAjaWZkZWYgT0JKRUNUU1BBQ0VfTk9STUFMTUFQXFxuXFxuICAgIG5vcm1hbCA9IHRleHR1cmUyRCggbm9ybWFsTWFwLCB1diApLnh5eiAqIDIuMCAtIDEuMDsgLy8gb3ZlcnJpZGVzIGJvdGggZmxhdFNoYWRpbmcgYW5kIGF0dHJpYnV0ZSBub3JtYWxzXFxuXFxuICAgICNpZmRlZiBGTElQX1NJREVEXFxuXFxuICAgICAgbm9ybWFsID0gLSBub3JtYWw7XFxuXFxuICAgICNlbmRpZlxcblxcbiAgICAjaWZkZWYgRE9VQkxFX1NJREVEXFxuXFxuICAgICAgbm9ybWFsID0gbm9ybWFsICogKCBmbG9hdCggZ2xfRnJvbnRGYWNpbmcgKSAqIDIuMCAtIDEuMCApO1xcblxcbiAgICAjZW5kaWZcXG5cXG4gICAgbm9ybWFsID0gbm9ybWFsaXplKCBub3JtYWxNYXRyaXggKiBub3JtYWwgKTtcXG5cXG4gICNlbGlmIGRlZmluZWQoIFRBTkdFTlRTUEFDRV9OT1JNQUxNQVAgKVxcblxcbiAgICB2ZWMzIG1hcE4gPSB0ZXh0dXJlMkQoIG5vcm1hbE1hcCwgdXYgKS54eXogKiAyLjAgLSAxLjA7XFxuICAgIG1hcE4ueHkgKj0gbm9ybWFsU2NhbGU7XFxuXFxuICAgICNpZmRlZiBVU0VfVEFOR0VOVFxcblxcbiAgICAgIG5vcm1hbCA9IG5vcm1hbGl6ZSggdlRCTiAqIG1hcE4gKTtcXG5cXG4gICAgI2Vsc2VcXG5cXG4gICAgICBub3JtYWwgPSBwZXJ0dXJiTm9ybWFsMkFyYiggdXYsIC12Vmlld1Bvc2l0aW9uLCBub3JtYWwsIG1hcE4gKTtcXG5cXG4gICAgI2VuZGlmXFxuXFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxlbWlzc2l2ZW1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfRU1JU1NJVkVNQVBcXG4gICAgdG90YWxFbWlzc2l2ZVJhZGlhbmNlICo9IGVtaXNzaXZlTWFwVGV4ZWxUb0xpbmVhciggdGV4dHVyZTJEKCBlbWlzc2l2ZU1hcCwgdXYgKSApLnJnYjtcXG4gICNlbmRpZlxcblxcbiAgI2lmZGVmIERFQlVHX05PUk1BTFxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCAwLjUgKyAwLjUgKiBub3JtYWwsIDEuMCApO1xcbiAgICByZXR1cm47XFxuICAjZW5kaWZcXG5cXG4gIC8vIC0tIE1Ub29uOiBsaWdodGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgLy8gYWNjdW11bGF0aW9uXFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX3Bob25nX2ZyYWdtZW50PlxcbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9iZWdpbj5cXG4gIHZlYzMgbGl0ID0gZGlmZnVzZUNvbG9yLnJnYjtcXG4gIHZlYzMgc2hhZGUgPSBzaGFkZUNvbG9yO1xcbiAgI2lmZGVmIFVTRV9TSEFERVRFWFRVUkVcXG4gICAgc2hhZGUgKj0gc2hhZGVUZXh0dXJlVGV4ZWxUb0xpbmVhciggdGV4dHVyZTJEKCBzaGFkZVRleHR1cmUsIHV2ICkgKS5yZ2I7XFxuICAjZW5kaWZcXG5cXG4gIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnk7XFxuXFxuICBnZW9tZXRyeS5wb3NpdGlvbiA9IC0gdlZpZXdQb3NpdGlvbjtcXG4gIGdlb21ldHJ5Lm5vcm1hbCA9IG5vcm1hbDtcXG4gIGdlb21ldHJ5LnZpZXdEaXIgPSBub3JtYWxpemUoIHZWaWV3UG9zaXRpb24gKTtcXG5cXG4gIHZlYzMgbGlnaHRpbmcgPSBjYWxjRGlyZWN0RGlmZnVzZSggdXYsIGRpZmZ1c2VDb2xvci5yZ2IsIHNoYWRlLCBnZW9tZXRyeSwgcmVmbGVjdGVkTGlnaHQgKTtcXG5cXG4gIHZlYzMgaXJyYWRpYW5jZSA9IGdldEFtYmllbnRMaWdodElycmFkaWFuY2UoIGFtYmllbnRMaWdodENvbG9yICk7XFxuICAjaWYgKCBOVU1fSEVNSV9MSUdIVFMgPiAwIClcXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fSEVNSV9MSUdIVFM7IGkgKysgKSB7XFxuICAgICAgaXJyYWRpYW5jZSArPSBnZXRIZW1pc3BoZXJlTGlnaHRJcnJhZGlhbmNlKCBoZW1pc3BoZXJlTGlnaHRzWyBpIF0sIGdlb21ldHJ5ICk7XFxuICAgIH1cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9tYXBzPlxcbiAgI2lmZGVmIFVTRV9MSUdIVE1BUFxcbiAgICB2ZWMzIGxpZ2h0TWFwSXJyYWRpYW5jZSA9IHRleHR1cmUyRCggbGlnaHRNYXAsIHZVdjIgKS5yZ2IgKiBsaWdodE1hcEludGVuc2l0eTtcXG4gICAgI2lmbmRlZiBQSFlTSUNBTExZX0NPUlJFQ1RfTElHSFRTXFxuICAgICAgbGlnaHRNYXBJcnJhZGlhbmNlICo9IFBJOyAvLyBmYWN0b3Igb2YgUEkgc2hvdWxkIG5vdCBiZSBwcmVzZW50OyBpbmNsdWRlZCBoZXJlIHRvIHByZXZlbnQgYnJlYWthZ2VcXG4gICAgI2VuZGlmXFxuICAgIGlycmFkaWFuY2UgKz0gbGlnaHRNYXBJcnJhZGlhbmNlO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X2VuZD5cXG4gIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5ICogaXJyYWRpYW5jZSAqIEJSREZfRGlmZnVzZV9MYW1iZXJ0KCBsaXQgKTtcXG5cXG4gIC8vIG1vZHVsYXRpb25cXG4gICNpbmNsdWRlIDxhb21hcF9mcmFnbWVudD5cXG5cXG4gIHZlYzMgY29sID0gcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZTtcXG5cXG4gICNpZiBkZWZpbmVkKCBPVVRMSU5FICkgJiYgZGVmaW5lZCggT1VUTElORV9DT0xPUl9NSVhFRCApXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoXFxuICAgICAgb3V0bGluZUNvbG9yLnJnYiAqIG1peCggdmVjMyggMS4wICksIGNvbCwgb3V0bGluZUxpZ2h0aW5nTWl4ICksXFxuICAgICAgZGlmZnVzZUNvbG9yLmFcXG4gICAgKTtcXG4gICAgcG9zdENvcnJlY3Rpb24oKTtcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgREVCVUdfTElUU0hBREVSQVRFXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIGNvbCwgZGlmZnVzZUNvbG9yLmEgKTtcXG4gICAgcG9zdENvcnJlY3Rpb24oKTtcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAtLSBNVG9vbjogcGFyYW1ldHJpYyByaW0gbGlnaHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIHZlYzMgdmlld0RpciA9IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xcbiAgdmVjMyByaW1NaXggPSBtaXgodmVjMygxLjApLCBsaWdodGluZyArIGluZGlyZWN0TGlnaHRJbnRlbnNpdHkgKiBpcnJhZGlhbmNlLCByaW1MaWdodGluZ01peCk7XFxuICB2ZWMzIHJpbSA9IHJpbUNvbG9yICogcG93KCBzYXR1cmF0ZSggMS4wIC0gZG90KCB2aWV3RGlyLCBub3JtYWwgKSArIHJpbUxpZnQgKSwgcmltRnJlc25lbFBvd2VyICk7XFxuICAjaWZkZWYgVVNFX1JJTVRFWFRVUkVcXG4gICAgcmltICo9IHJpbVRleHR1cmVUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIHJpbVRleHR1cmUsIHV2ICkgKS5yZ2I7XFxuICAjZW5kaWZcXG4gIGNvbCArPSByaW07XFxuXFxuICAvLyAtLSBNVG9vbjogYWRkaXRpdmUgbWF0Y2FwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gICNpZmRlZiBVU0VfU1BIRVJFQUREXFxuICAgIHtcXG4gICAgICB2ZWMzIHggPSBub3JtYWxpemUoIHZlYzMoIHZpZXdEaXIueiwgMC4wLCAtdmlld0Rpci54ICkgKTtcXG4gICAgICB2ZWMzIHkgPSBjcm9zcyggdmlld0RpciwgeCApOyAvLyBndWFyYW50ZWVkIHRvIGJlIG5vcm1hbGl6ZWRcXG4gICAgICB2ZWMyIHNwaGVyZVV2ID0gMC41ICsgMC41ICogdmVjMiggZG90KCB4LCBub3JtYWwgKSwgLWRvdCggeSwgbm9ybWFsICkgKTtcXG4gICAgICB2ZWMzIG1hdGNhcCA9IHNwaGVyZUFkZFRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggc3BoZXJlQWRkLCBzcGhlcmVVdiApICkueHl6O1xcbiAgICAgIGNvbCArPSBtYXRjYXA7XFxuICAgIH1cXG4gICNlbmRpZlxcblxcbiAgLy8gLS0gTVRvb246IEVtaXNzaW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICBjb2wgKz0gdG90YWxFbWlzc2l2ZVJhZGlhbmNlO1xcblxcbiAgLy8gI2luY2x1ZGUgPGVudm1hcF9mcmFnbWVudD5cXG5cXG4gIC8vIC0tIEFsbW9zdCBkb25lISAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggY29sLCBkaWZmdXNlQ29sb3IuYSApO1xcbiAgcG9zdENvcnJlY3Rpb24oKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIvLyAjZGVmaW5lIFBIT05HXFxuXFxudmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XFxuXFxuI2lmbmRlZiBGTEFUX1NIQURFRFxcbiAgdmFyeWluZyB2ZWMzIHZOb3JtYWw7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPGNvbW1vbj5cXG5cXG4vLyAjaW5jbHVkZSA8dXZfcGFyc192ZXJ0ZXg+XFxuI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9VVkFOSU1NQVNLVEVYVFVSRSApXFxuICB2YXJ5aW5nIHZlYzIgdlV2O1xcbiAgdW5pZm9ybSB2ZWM0IG1haW5UZXhfU1Q7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX3ZlcnRleD5cXG4vLyAjaW5jbHVkZSA8ZGlzcGxhY2VtZW50bWFwX3BhcnNfdmVydGV4Plxcbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxmb2dfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPG1vcnBodGFyZ2V0X3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxza2lubmluZ19wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8c2hhZG93bWFwX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3BhcnNfdmVydGV4PlxcblxcbiNpZmRlZiBVU0VfT1VUTElORVdJRFRIVEVYVFVSRVxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgb3V0bGluZVdpZHRoVGV4dHVyZTtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIGZsb2F0IG91dGxpbmVXaWR0aDtcXG51bmlmb3JtIGZsb2F0IG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTtcXG5cXG52b2lkIG1haW4oKSB7XFxuXFxuICAvLyAjaW5jbHVkZSA8dXZfdmVydGV4PlxcbiAgI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9VVkFOSU1NQVNLVEVYVFVSRSApXFxuICAgIHZVdiA9IHZlYzIoIG1haW5UZXhfU1QucCAqIHV2LnggKyBtYWluVGV4X1NULnMsIG1haW5UZXhfU1QucSAqIHV2LnkgKyBtYWluVGV4X1NULnQgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHV2Ml92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y29sb3JfdmVydGV4PlxcblxcbiAgI2luY2x1ZGUgPGJlZ2lubm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxtb3JwaG5vcm1hbF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbmJhc2VfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNraW5ub3JtYWxfdmVydGV4PlxcblxcbiAgLy8gd2UgbmVlZCB0aGlzIHRvIGNvbXB1dGUgdGhlIG91dGxpbmUgcHJvcGVybHlcXG4gIG9iamVjdE5vcm1hbCA9IG5vcm1hbGl6ZSggb2JqZWN0Tm9ybWFsICk7XFxuXFxuICAjaW5jbHVkZSA8ZGVmYXVsdG5vcm1hbF92ZXJ0ZXg+XFxuXFxuICAjaWZuZGVmIEZMQVRfU0hBREVEIC8vIE5vcm1hbCBjb21wdXRlZCB3aXRoIGRlcml2YXRpdmVzIHdoZW4gRkxBVF9TSEFERURcXG4gICAgdk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cXG5cXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxcbiAgLy8gI2luY2x1ZGUgPGRpc3BsYWNlbWVudG1hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8cHJvamVjdF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc192ZXJ0ZXg+XFxuXFxuICB2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcXG5cXG4gIGZsb2F0IG91dGxpbmVUZXggPSAxLjA7XFxuXFxuICAjaWZkZWYgT1VUTElORVxcbiAgICAjaWZkZWYgVVNFX09VVExJTkVXSURUSFRFWFRVUkVcXG4gICAgICBvdXRsaW5lVGV4ID0gdGV4dHVyZTJEKCBvdXRsaW5lV2lkdGhUZXh0dXJlLCB2VXYgKS5yO1xcbiAgICAjZW5kaWZcXG5cXG4gICAgI2lmZGVmIE9VVExJTkVfV0lEVEhfV09STERcXG4gICAgICBmbG9hdCB3b3JsZE5vcm1hbExlbmd0aCA9IGxlbmd0aCggdHJhbnNmb3JtZWROb3JtYWwgKTtcXG4gICAgICB2ZWMzIG91dGxpbmVPZmZzZXQgPSAwLjAxICogb3V0bGluZVdpZHRoICogb3V0bGluZVRleCAqIHdvcmxkTm9ybWFsTGVuZ3RoICogb2JqZWN0Tm9ybWFsO1xcbiAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIG91dGxpbmVPZmZzZXQgKyB0cmFuc2Zvcm1lZCwgMS4wICk7XFxuICAgICNlbmRpZlxcblxcbiAgICAjaWZkZWYgT1VUTElORV9XSURUSF9TQ1JFRU5cXG4gICAgICB2ZWMzIGNsaXBOb3JtYWwgPSAoIHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBvYmplY3ROb3JtYWwsIDAuMCApICkueHl6O1xcbiAgICAgIHZlYzIgcHJvamVjdGVkTm9ybWFsID0gbm9ybWFsaXplKCBjbGlwTm9ybWFsLnh5ICk7XFxuICAgICAgcHJvamVjdGVkTm9ybWFsICo9IG1pbiggZ2xfUG9zaXRpb24udywgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlICk7XFxuICAgICAgcHJvamVjdGVkTm9ybWFsLnggKj0gcHJvamVjdGlvbk1hdHJpeFsgMCBdLnggLyBwcm9qZWN0aW9uTWF0cml4WyAxIF0ueTtcXG4gICAgICBnbF9Qb3NpdGlvbi54eSArPSAwLjAxICogb3V0bGluZVdpZHRoICogb3V0bGluZVRleCAqIHByb2plY3RlZE5vcm1hbC54eTtcXG4gICAgI2VuZGlmXFxuXFxuICAgIGdsX1Bvc2l0aW9uLnogKz0gMUUtNiAqIGdsX1Bvc2l0aW9uLnc7IC8vIGFudGktYXJ0aWZhY3QgbWFnaWNcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHdvcmxkcG9zX3ZlcnRleD5cXG4gIC8vICNpbmNsdWRlIDxlbnZtYXBfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNoYWRvd21hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Zm9nX3ZlcnRleD5cXG5cXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjaWZkZWYgUkVOREVSVFlQRV9DVVRPVVRcXG4gIHVuaWZvcm0gZmxvYXQgY3V0b2ZmO1xcbiNlbmRpZlxcblxcbiNpbmNsdWRlIDxjb21tb24+XFxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPHV2X3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPHV2Ml9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YWxwaGFtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YW9tYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8bGlnaHRtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8ZW52bWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGZvZ19wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc19mcmFnbWVudD5cXG5cXG4vLyA9PSBtYWluIHByb2NlZHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbnZvaWQgbWFpbigpIHtcXG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfZnJhZ21lbnQ+XFxuXFxuICB2ZWM0IGRpZmZ1c2VDb2xvciA9IHZlYzQoIDEuMCApO1xcblxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX2ZyYWdtZW50PlxcblxcbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIGRpZmZ1c2VDb2xvciAqPSBtYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIG1hcCwgdlV2ICkgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGNvbG9yX2ZyYWdtZW50PlxcbiAgLy8gI2luY2x1ZGUgPGFscGhhbWFwX2ZyYWdtZW50PlxcblxcbiAgLy8gTVRvb246IGFscGhhXFxuICAvLyAjaW5jbHVkZSA8YWxwaGF0ZXN0X2ZyYWdtZW50PlxcbiAgI2lmZGVmIFJFTkRFUlRZUEVfQ1VUT1VUXFxuICAgIGlmICggZGlmZnVzZUNvbG9yLmEgPD0gY3V0b2ZmICkgeyBkaXNjYXJkOyB9XFxuICAgIGRpZmZ1c2VDb2xvci5hID0gMS4wO1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgUkVOREVSVFlQRV9PUEFRVUVcXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9mcmFnbWVudD5cXG5cXG4gIFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ID0gUmVmbGVjdGVkTGlnaHQoIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApICk7XFxuXFxuICAvLyBhY2N1bXVsYXRpb24gKGJha2VkIGluZGlyZWN0IGxpZ2h0aW5nIG9ubHkpXFxuICAjaWZkZWYgVVNFX0xJR0hUTUFQXFxuICAgIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSB0ZXh0dXJlMkQoIGxpZ2h0TWFwLCB2VXYyICkueHl6ICogbGlnaHRNYXBJbnRlbnNpdHk7XFxuICAjZWxzZVxcbiAgICByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgKz0gdmVjMyggMS4wICk7XFxuICAjZW5kaWZcXG5cXG4gIC8vIG1vZHVsYXRpb25cXG4gIC8vICNpbmNsdWRlIDxhb21hcF9mcmFnbWVudD5cXG5cXG4gIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSAqPSBkaWZmdXNlQ29sb3IucmdiO1xcbiAgdmVjMyBvdXRnb2luZ0xpZ2h0ID0gcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlO1xcblxcbiAgLy8gI2luY2x1ZGUgPGVudm1hcF9mcmFnbWVudD5cXG5cXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoIG91dGdvaW5nTGlnaHQsIGRpZmZ1c2VDb2xvci5hICk7XFxuXFxuICAjaW5jbHVkZSA8cHJlbXVsdGlwbGllZF9hbHBoYV9mcmFnbWVudD5cXG4gICNpbmNsdWRlIDx0b25lbWFwcGluZ19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxlbmNvZGluZ3NfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8Zm9nX2ZyYWdtZW50Plxcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNpbmNsdWRlIDxjb21tb24+XFxuXFxuLy8gI2luY2x1ZGUgPHV2X3BhcnNfdmVydGV4PlxcbiNpZmRlZiBVU0VfTUFQXFxuICB2YXJ5aW5nIHZlYzIgdlV2O1xcbiAgdW5pZm9ybSB2ZWM0IG1haW5UZXhfU1Q7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8ZW52bWFwX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjb2xvcl9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Zm9nX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxtb3JwaHRhcmdldF9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8c2tpbm5pbmdfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc192ZXJ0ZXg+XFxuXFxudm9pZCBtYWluKCkge1xcblxcbiAgLy8gI2luY2x1ZGUgPHV2X3ZlcnRleD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIHZVdiA9IHZlYzIoIG1haW5UZXhfU1QucCAqIHV2LnggKyBtYWluVGV4X1NULnMsIG1haW5UZXhfU1QucSAqIHV2LnkgKyBtYWluVGV4X1NULnQgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHV2Ml92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y29sb3JfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNraW5iYXNlX3ZlcnRleD5cXG5cXG4gICNpZmRlZiBVU0VfRU5WTUFQXFxuXFxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPG1vcnBobm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2lubm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxkZWZhdWx0bm9ybWFsX3ZlcnRleD5cXG5cXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHByb2plY3RfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3ZlcnRleD5cXG5cXG4gICNpbmNsdWRlIDx3b3JsZHBvc192ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxlbnZtYXBfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGZvZ192ZXJ0ZXg+XFxuXFxufVwiOyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTU1ldGFJbXBvcnRlciA9IHZvaWQgMDtcclxudmFyIFZSTU1ldGFJbXBvcnRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWUk1NZXRhSW1wb3J0ZXIob3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB0aGlzLmlnbm9yZVRleHR1cmUgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaWdub3JlVGV4dHVyZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgICBWUk1NZXRhSW1wb3J0ZXIucHJvdG90eXBlLmltcG9ydCA9IGZ1bmN0aW9uIChnbHRmKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2cm1FeHQsIHNjaGVtYU1ldGEsIHRleHR1cmU7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZybUV4dCA9IChfYSA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLlZSTTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2cm1FeHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbnVsbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hTWV0YSA9IHZybUV4dC5tZXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjaGVtYU1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbnVsbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoIXRoaXMuaWdub3JlVGV4dHVyZSAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT0gbnVsbCAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT09IC0xKSkgcmV0dXJuIFszLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlOiB0ZXh0dXJlICE9PSBudWxsICYmIHRleHR1cmUgIT09IHZvaWQgMCA/IHRleHR1cmUgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2NoZW1hTWV0YS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHNjaGVtYU1ldGEudmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpb2xlbnRVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnZpb2xlbnRVc3NhZ2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTU1ldGFJbXBvcnRlcjtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1NZXRhSW1wb3J0ZXIgPSBWUk1NZXRhSW1wb3J0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNTWV0YUltcG9ydGVyT3B0aW9ucyA9IGV4cG9ydHMuVlJNTWV0YUltcG9ydGVyID0gZXhwb3J0cy5WUk1NZXRhID0gdm9pZCAwO1xyXG52YXIgVlJNTWV0YV8xID0gcmVxdWlyZShcIi4vVlJNTWV0YVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVlJNTWV0YVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gVlJNTWV0YV8xLlZSTU1ldGE7IH0gfSk7XHJcbnZhciBWUk1NZXRhSW1wb3J0ZXJfMSA9IHJlcXVpcmUoXCIuL1ZSTU1ldGFJbXBvcnRlclwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVlJNTWV0YUltcG9ydGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBWUk1NZXRhSW1wb3J0ZXJfMS5WUk1NZXRhSW1wb3J0ZXI7IH0gfSk7XHJcbnZhciBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zXzEgPSByZXF1aXJlKFwiLi9WUk1NZXRhSW1wb3J0ZXJPcHRpb25zXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWUk1NZXRhSW1wb3J0ZXJPcHRpb25zXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zXzEuVlJNTWV0YUltcG9ydGVyT3B0aW9uczsgfSB9KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1TcHJpbmdCb25lID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbnZhciBtYXRoXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvbWF0aFwiKTtcclxudmFyIE1hdHJpeDRJbnZlcnNlQ2FjaGVfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlXCIpO1xyXG52YXIgSURFTlRJVFlfTUFUUklYNCA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLk1hdHJpeDQoKSk7XHJcbnZhciBJREVOVElUWV9RVUFURVJOSU9OID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuUXVhdGVybmlvbigpKTtcclxudmFyIF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG52YXIgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbnZhciBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxudmFyIF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XHJcbnZhciBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XHJcbnZhciBfbWF0QiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XHJcbnZhciBWUk1TcHJpbmdCb25lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZSTVNwcmluZ0JvbmUoYm9uZSwgcGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7IHBhcmFtcyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX3ByZXZUYWlsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLl9uZXh0VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5fYm9uZUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcclxuICAgICAgICB0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5ib25lID0gYm9uZTtcclxuICAgICAgICB0aGlzLmJvbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gKF9hID0gcGFyYW1zLnJhZGl1cykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMC4wMjtcclxuICAgICAgICB0aGlzLnN0aWZmbmVzc0ZvcmNlID0gKF9iID0gcGFyYW1zLnN0aWZmbmVzc0ZvcmNlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAxLjA7XHJcbiAgICAgICAgdGhpcy5ncmF2aXR5RGlyID0gcGFyYW1zLmdyYXZpdHlEaXJcclxuICAgICAgICAgICAgPyBuZXcgVEhSRUUuVmVjdG9yMygpLmNvcHkocGFyYW1zLmdyYXZpdHlEaXIpXHJcbiAgICAgICAgICAgIDogbmV3IFRIUkVFLlZlY3RvcjMoKS5zZXQoMC4wLCAtMS4wLCAwLjApO1xyXG4gICAgICAgIHRoaXMuZ3Jhdml0eVBvd2VyID0gKF9jID0gcGFyYW1zLmdyYXZpdHlQb3dlcikgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMC4wO1xyXG4gICAgICAgIHRoaXMuZHJhZ0ZvcmNlID0gKF9kID0gcGFyYW1zLmRyYWdGb3JjZSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogMC40O1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXJzID0gKF9lID0gcGFyYW1zLmNvbGxpZGVycykgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogW107XHJcbiAgICAgICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcclxuICAgICAgICB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXguY29weSh0aGlzLmJvbmUubWF0cml4KTtcclxuICAgICAgICB0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbi5jb3B5KHRoaXMuYm9uZS5xdWF0ZXJuaW9uKTtcclxuICAgICAgICBpZiAodGhpcy5ib25lLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkodGhpcy5ib25lLnBvc2l0aW9uKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcigwLjA3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBmaXJzdENoaWxkID0gdGhpcy5ib25lLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkoZmlyc3RDaGlsZC5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5fbmV4dFRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5fYm9uZUF4aXMuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGggPSBfdjNBXHJcbiAgICAgICAgICAgIC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pXHJcbiAgICAgICAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5ib25lLm1hdHJpeFdvcmxkKVxyXG4gICAgICAgICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXHJcbiAgICAgICAgICAgIC5sZW5ndGgoKTtcclxuICAgICAgICB0aGlzLmNlbnRlciA9IChfZiA9IHBhcmFtcy5jZW50ZXIpICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVlJNU3ByaW5nQm9uZS5wcm90b3R5cGUsIFwiY2VudGVyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNlbnRlcikge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoX21hdEEpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmV2VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXh0VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xyXG4gICAgICAgICAgICBpZiAoKF9hID0gdGhpcy5fY2VudGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eS5yZXZlcnQoKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2VudGVyID0gY2VudGVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlXzEuTWF0cml4NEludmVyc2VDYWNoZSh0aGlzLl9jZW50ZXIubWF0cml4V29ybGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmV2VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXh0VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xyXG4gICAgICAgICAgICBfbWF0QS5tdWx0aXBseSh0aGlzLmJvbmUubWF0cml4V29ybGQpO1xyXG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbihfbWF0QSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0FcclxuICAgICAgICAgICAgICAgIC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAuYXBwbHlNYXRyaXg0KF9tYXRBKVxyXG4gICAgICAgICAgICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgLmxlbmd0aCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFZSTVNwcmluZ0JvbmUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcclxuICAgICAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xyXG4gICAgICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XHJcbiAgICAgICAgdGhpcy5fbmV4dFRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhKSB7XHJcbiAgICAgICAgaWYgKGRlbHRhIDw9IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcclxuICAgICAgICBpZiAodGhpcy5ib25lLnBhcmVudCkge1xyXG4gICAgICAgICAgICBtYXRoXzEuZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmJvbmUucGFyZW50LCB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb24uY29weShJREVOVElUWV9RVUFURVJOSU9OKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XHJcbiAgICAgICAgX21hdEEubXVsdGlwbHkodGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbihfbWF0QSk7XHJcbiAgICAgICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0Qik7XHJcbiAgICAgICAgX21hdEIubXVsdGlwbHkodGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSk7XHJcbiAgICAgICAgdmFyIHN0aWZmbmVzcyA9IHRoaXMuc3RpZmZuZXNzRm9yY2UgKiBkZWx0YTtcclxuICAgICAgICB2YXIgZXh0ZXJuYWwgPSBfdjNCLmNvcHkodGhpcy5ncmF2aXR5RGlyKS5tdWx0aXBseVNjYWxhcih0aGlzLmdyYXZpdHlQb3dlciAqIGRlbHRhKTtcclxuICAgICAgICB0aGlzLl9uZXh0VGFpbFxyXG4gICAgICAgICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcclxuICAgICAgICAgICAgLmFkZChfdjNBXHJcbiAgICAgICAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxyXG4gICAgICAgICAgICAuc3ViKHRoaXMuX3ByZXZUYWlsKVxyXG4gICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuZHJhZ0ZvcmNlKSlcclxuICAgICAgICAgICAgLmFkZChfdjNBXHJcbiAgICAgICAgICAgIC5jb3B5KHRoaXMuX2JvbmVBeGlzKVxyXG4gICAgICAgICAgICAuYXBwbHlNYXRyaXg0KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeClcclxuICAgICAgICAgICAgLmFwcGx5TWF0cml4NChfbWF0QilcclxuICAgICAgICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKClcclxuICAgICAgICAgICAgLm11bHRpcGx5U2NhbGFyKHN0aWZmbmVzcykpXHJcbiAgICAgICAgICAgIC5hZGQoZXh0ZXJuYWwpO1xyXG4gICAgICAgIHRoaXMuX25leHRUYWlsXHJcbiAgICAgICAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcclxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXHJcbiAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcih0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGgpXHJcbiAgICAgICAgICAgIC5hZGQodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5fY29sbGlzaW9uKHRoaXMuX25leHRUYWlsKTtcclxuICAgICAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX25leHRUYWlsKTtcclxuICAgICAgICB2YXIgaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52ID0gX21hdEEuZ2V0SW52ZXJzZShfbWF0Qi5tdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpKTtcclxuICAgICAgICB2YXIgYXBwbHlSb3RhdGlvbiA9IF9xdWF0QS5zZXRGcm9tVW5pdFZlY3RvcnModGhpcy5fYm9uZUF4aXMsIF92M0EuY29weSh0aGlzLl9uZXh0VGFpbCkuYXBwbHlNYXRyaXg0KGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludikubm9ybWFsaXplKCkpO1xyXG4gICAgICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pLm11bHRpcGx5KGFwcGx5Um90YXRpb24pO1xyXG4gICAgICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcclxuICAgICAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcclxuICAgIH07XHJcbiAgICBWUk1TcHJpbmdCb25lLnByb3RvdHlwZS5fY29sbGlzaW9uID0gZnVuY3Rpb24gKHRhaWwpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXJzLmZvckVhY2goZnVuY3Rpb24gKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcclxuICAgICAgICAgICAgX21hdEEubXVsdGlwbHkoY29sbGlkZXIubWF0cml4V29ybGQpO1xyXG4gICAgICAgICAgICB2YXIgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uID0gX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xyXG4gICAgICAgICAgICB2YXIgY29sbGlkZXJSYWRpdXMgPSBjb2xsaWRlci5nZW9tZXRyeS5ib3VuZGluZ1NwaGVyZS5yYWRpdXM7XHJcbiAgICAgICAgICAgIHZhciByID0gX3RoaXMucmFkaXVzICsgY29sbGlkZXJSYWRpdXM7XHJcbiAgICAgICAgICAgIGlmICh0YWlsLmRpc3RhbmNlVG9TcXVhcmVkKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbikgPD0gciAqIHIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3JtYWwgPSBfdjNCLnN1YlZlY3RvcnModGFpbCwgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NGcm9tQ29sbGlkZXIgPSBfdjNDLmFkZFZlY3RvcnMoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uLCBub3JtYWwubXVsdGlwbHlTY2FsYXIocikpO1xyXG4gICAgICAgICAgICAgICAgdGFpbC5jb3B5KHBvc0Zyb21Db2xsaWRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5zdWIoX3RoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLm11bHRpcGx5U2NhbGFyKF90aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZChfdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZS5wcm90b3R5cGUuX2dldE1hdHJpeENlbnRlclRvV29ybGQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRlcikge1xyXG4gICAgICAgICAgICB0YXJnZXQuY29weSh0aGlzLl9jZW50ZXIubWF0cml4V29ybGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmlkZW50aXR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZS5wcm90b3R5cGUuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRlcikge1xyXG4gICAgICAgICAgICB0YXJnZXQuY29weSh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkuaW52ZXJzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXQuaWRlbnRpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcbiAgICBWUk1TcHJpbmdCb25lLnByb3RvdHlwZS5fZ2V0UGFyZW50TWF0cml4V29ybGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9uZS5wYXJlbnQgPyB0aGlzLmJvbmUucGFyZW50Lm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNU3ByaW5nQm9uZTtcclxufSgpKTtcclxuZXhwb3J0cy5WUk1TcHJpbmdCb25lID0gVlJNU3ByaW5nQm9uZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVlJNU3ByaW5nQm9uZUltcG9ydGVyID0gdm9pZCAwO1xyXG52YXIgVEhSRUUgPSByZXF1aXJlKFwidGhyZWVcIik7XHJcbnZhciBWUk1TcHJpbmdCb25lXzEgPSByZXF1aXJlKFwiLi9WUk1TcHJpbmdCb25lXCIpO1xyXG52YXIgVlJNU3ByaW5nQm9uZU1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXCIpO1xyXG52YXIgX3YzQSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbnZhciBfY29sbGlkZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IHZpc2libGU6IGZhbHNlIH0pO1xyXG52YXIgVlJNU3ByaW5nQm9uZUltcG9ydGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZSTVNwcmluZ0JvbmVJbXBvcnRlcigpIHtcclxuICAgIH1cclxuICAgIFZSTVNwcmluZ0JvbmVJbXBvcnRlci5wcm90b3R5cGUuaW1wb3J0ID0gZnVuY3Rpb24gKGdsdGYpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZybUV4dCwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLCBjb2xsaWRlckdyb3Vwcywgc3ByaW5nQm9uZUdyb3VwTGlzdDtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnJtRXh0ID0gKF9hID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuVlJNO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZybUV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbnVsbF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiA9IHZybUV4dC5zZWNvbmRhcnlBbmltYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBudWxsXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlckdyb3VwcyA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCB0aGlzLl9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiwgY29sbGlkZXJHcm91cHMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ0JvbmVHcm91cExpc3QgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyXzEuVlJNU3ByaW5nQm9uZU1hbmFnZXIoY29sbGlkZXJHcm91cHMsIHNwcmluZ0JvbmVHcm91cExpc3QpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZUltcG9ydGVyLnByb3RvdHlwZS5fY3JlYXRlU3ByaW5nQm9uZSA9IGZ1bmN0aW9uIChib25lLCBwYXJhbXMpIHtcclxuICAgICAgICBpZiAocGFyYW1zID09PSB2b2lkIDApIHsgcGFyYW1zID0ge307IH1cclxuICAgICAgICByZXR1cm4gbmV3IFZSTVNwcmluZ0JvbmVfMS5WUk1TcHJpbmdCb25lKGJvbmUsIHBhcmFtcyk7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZUltcG9ydGVyLnByb3RvdHlwZS5faW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdCA9IGZ1bmN0aW9uIChnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24sIGNvbGxpZGVyR3JvdXBzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNwcmluZ0JvbmVHcm91cHMsIHNwcmluZ0JvbmVHcm91cExpc3Q7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ0JvbmVHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24uYm9uZUdyb3VwcyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nQm9uZUdyb3VwTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIFByb21pc2UuYWxsKHNwcmluZ0JvbmVHcm91cHMubWFwKGZ1bmN0aW9uICh2cm1Cb25lR3JvdXApIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RpZmZuZXNzRm9yY2UsIGdyYXZpdHlEaXIsIGdyYXZpdHlQb3dlciwgZHJhZ0ZvcmNlLCByYWRpdXMsIGNvbGxpZGVycywgc3ByaW5nQm9uZUdyb3VwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZybUJvbmVHcm91cC5zdGlmZmluZXNzID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci54ID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnogPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eVBvd2VyID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnJtQm9uZUdyb3VwLmRyYWdGb3JjZSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybUJvbmVHcm91cC5oaXRSYWRpdXMgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuY29sbGlkZXJHcm91cHMgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuYm9uZXMgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuY2VudGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpZmZuZXNzRm9yY2UgPSB2cm1Cb25lR3JvdXAuc3RpZmZpbmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmF2aXR5RGlyID0gbmV3IFRIUkVFLlZlY3RvcjModnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueCwgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueSwgLXZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXZpdHlQb3dlciA9IHZybUJvbmVHcm91cC5ncmF2aXR5UG93ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0ZvcmNlID0gdnJtQm9uZUdyb3VwLmRyYWdGb3JjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpdXMgPSB2cm1Cb25lR3JvdXAuaGl0UmFkaXVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZybUJvbmVHcm91cC5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChjb2xsaWRlckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVycy5wdXNoLmFwcGx5KGNvbGxpZGVycywgY29sbGlkZXJHcm91cHNbY29sbGlkZXJJbmRleF0uY29sbGlkZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpbmdCb25lR3JvdXAgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIFByb21pc2UuYWxsKHZybUJvbmVHcm91cC5ib25lcy5tYXAoZnVuY3Rpb24gKG5vZGVJbmRleCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwcmluZ1Jvb3RCb25lLCBjZW50ZXIsIF9hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0LCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ1Jvb3RCb25lID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodnJtQm9uZUdyb3VwLmNlbnRlciAhPT0gLTEpKSByZXR1cm4gWzMsIDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgdnJtQm9uZUdyb3VwLmNlbnRlcildO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyID0gX2E7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNwcmluZ1Jvb3RCb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ1Jvb3RCb25lLnRyYXZlcnNlKGZ1bmN0aW9uIChib25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwcmluZ0JvbmUgPSBfdGhpcy5fY3JlYXRlU3ByaW5nQm9uZShib25lLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlmZm5lc3NGb3JjZTogc3RpZmZuZXNzRm9yY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXZpdHlEaXI6IGdyYXZpdHlEaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXZpdHlQb3dlcjogZ3Jhdml0eVBvd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnRm9yY2U6IGRyYWdGb3JjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJzOiBjb2xsaWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcmluZ0JvbmVHcm91cC5wdXNoKHNwcmluZ0JvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaW5nQm9uZUdyb3VwTGlzdC5wdXNoKHNwcmluZ0JvbmVHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgc3ByaW5nQm9uZUdyb3VwTGlzdF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFZSTVNwcmluZ0JvbmVJbXBvcnRlci5wcm90b3R5cGUuX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyA9IGZ1bmN0aW9uIChnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdnJtQ29sbGlkZXJHcm91cHMsIGNvbGxpZGVyR3JvdXBzO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICB2cm1Db2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3VwcztcclxuICAgICAgICAgICAgICAgIGlmICh2cm1Db2xsaWRlckdyb3VwcyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgW11dO1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZXJHcm91cHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZybUNvbGxpZGVyR3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKGNvbGxpZGVyR3JvdXApIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9uZSwgY29sbGlkZXJzLCBjb2xsaWRlck1lc2hHcm91cDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlckdyb3VwLm5vZGUgPT09IHVuZGVmaW5lZCB8fCBjb2xsaWRlckdyb3VwLmNvbGxpZGVycyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGNvbGxpZGVyR3JvdXAubm9kZSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvbmUgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaChmdW5jdGlvbiAoY29sbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyLm9mZnNldCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueiA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5yYWRpdXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBfdjNBLnNldChjb2xsaWRlci5vZmZzZXQueCwgY29sbGlkZXIub2Zmc2V0LnksIC1jb2xsaWRlci5vZmZzZXQueik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xsaWRlck1lc2ggPSBfdGhpcy5fY3JlYXRlQ29sbGlkZXJNZXNoKGNvbGxpZGVyLnJhZGl1cywgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9uZS5hZGQoY29sbGlkZXJNZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXJzLnB1c2goY29sbGlkZXJNZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlck1lc2hHcm91cCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogY29sbGlkZXJHcm91cC5ub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlcnM6IGNvbGxpZGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyR3JvdXBzLnB1c2goY29sbGlkZXJNZXNoR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgY29sbGlkZXJHcm91cHNdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBWUk1TcHJpbmdCb25lSW1wb3J0ZXIucHJvdG90eXBlLl9jcmVhdGVDb2xsaWRlck1lc2ggPSBmdW5jdGlvbiAocmFkaXVzLCBvZmZzZXQpIHtcclxuICAgICAgICB2YXIgY29sbGlkZXJNZXNoID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUJ1ZmZlckdlb21ldHJ5KHJhZGl1cywgOCwgNCksIF9jb2xsaWRlck1hdGVyaWFsKTtcclxuICAgICAgICBjb2xsaWRlck1lc2gucG9zaXRpb24uY29weShvZmZzZXQpO1xyXG4gICAgICAgIGNvbGxpZGVyTWVzaC5uYW1lID0gJ3ZybUNvbGxpZGVyU3BoZXJlJztcclxuICAgICAgICBjb2xsaWRlck1lc2guZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVyTWVzaDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gVlJNU3ByaW5nQm9uZUltcG9ydGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTVNwcmluZ0JvbmVJbXBvcnRlciA9IFZSTVNwcmluZ0JvbmVJbXBvcnRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WUk1TcHJpbmdCb25lTWFuYWdlciA9IHZvaWQgMDtcclxudmFyIFZSTVNwcmluZ0JvbmVNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFZSTVNwcmluZ0JvbmVNYW5hZ2VyKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlckdyb3VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXJHcm91cHMgPSBjb2xsaWRlckdyb3VwcztcclxuICAgICAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QgPSBzcHJpbmdCb25lR3JvdXBMaXN0O1xyXG4gICAgfVxyXG4gICAgVlJNU3ByaW5nQm9uZU1hbmFnZXIucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uIChyb290KSB7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goZnVuY3Rpb24gKHNwcmluZ0JvbmVHcm91cCkge1xyXG4gICAgICAgICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaChmdW5jdGlvbiAoc3ByaW5nQm9uZSkge1xyXG4gICAgICAgICAgICAgICAgc3ByaW5nQm9uZS5jZW50ZXIgPSByb290O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBWUk1TcHJpbmdCb25lTWFuYWdlci5wcm90b3R5cGUubGF0ZVVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChzcHJpbmdCb25lR3JvdXApIHtcclxuICAgICAgICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goZnVuY3Rpb24gKHNwcmluZ0JvbmUpIHtcclxuICAgICAgICAgICAgICAgIHNwcmluZ0JvbmUudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgVlJNU3ByaW5nQm9uZU1hbmFnZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChzcHJpbmdCb25lR3JvdXApIHtcclxuICAgICAgICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goZnVuY3Rpb24gKHNwcmluZ0JvbmUpIHtcclxuICAgICAgICAgICAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xyXG59KCkpO1xyXG5leHBvcnRzLlZSTVNwcmluZ0JvbmVNYW5hZ2VyID0gVlJNU3ByaW5nQm9uZU1hbmFnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNU3ByaW5nQm9uZVwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1TcHJpbmdCb25lSW1wb3J0ZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNU3ByaW5nQm9uZU1hbmFnZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnNcIiksIGV4cG9ydHMpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZSTVNjaGVtYSA9IHZvaWQgMDtcclxudmFyIFZSTVNjaGVtYTtcclxuKGZ1bmN0aW9uIChWUk1TY2hlbWEpIHtcclxuICAgIHZhciBCbGVuZFNoYXBlUHJlc2V0TmFtZTtcclxuICAgIChmdW5jdGlvbiAoQmxlbmRTaGFwZVByZXNldE5hbWUpIHtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIkFcIl0gPSBcImFcIjtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIkFuZ3J5XCJdID0gXCJhbmdyeVwiO1xyXG4gICAgICAgIEJsZW5kU2hhcGVQcmVzZXROYW1lW1wiQmxpbmtcIl0gPSBcImJsaW5rXCI7XHJcbiAgICAgICAgQmxlbmRTaGFwZVByZXNldE5hbWVbXCJCbGlua0xcIl0gPSBcImJsaW5rX2xcIjtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIkJsaW5rUlwiXSA9IFwiYmxpbmtfclwiO1xyXG4gICAgICAgIEJsZW5kU2hhcGVQcmVzZXROYW1lW1wiRVwiXSA9IFwiZVwiO1xyXG4gICAgICAgIEJsZW5kU2hhcGVQcmVzZXROYW1lW1wiRnVuXCJdID0gXCJmdW5cIjtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIklcIl0gPSBcImlcIjtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIkpveVwiXSA9IFwiam95XCI7XHJcbiAgICAgICAgQmxlbmRTaGFwZVByZXNldE5hbWVbXCJMb29rZG93blwiXSA9IFwibG9va2Rvd25cIjtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIkxvb2tsZWZ0XCJdID0gXCJsb29rbGVmdFwiO1xyXG4gICAgICAgIEJsZW5kU2hhcGVQcmVzZXROYW1lW1wiTG9va3JpZ2h0XCJdID0gXCJsb29rcmlnaHRcIjtcclxuICAgICAgICBCbGVuZFNoYXBlUHJlc2V0TmFtZVtcIkxvb2t1cFwiXSA9IFwibG9va3VwXCI7XHJcbiAgICAgICAgQmxlbmRTaGFwZVByZXNldE5hbWVbXCJOZXV0cmFsXCJdID0gXCJuZXV0cmFsXCI7XHJcbiAgICAgICAgQmxlbmRTaGFwZVByZXNldE5hbWVbXCJPXCJdID0gXCJvXCI7XHJcbiAgICAgICAgQmxlbmRTaGFwZVByZXNldE5hbWVbXCJTb3Jyb3dcIl0gPSBcInNvcnJvd1wiO1xyXG4gICAgICAgIEJsZW5kU2hhcGVQcmVzZXROYW1lW1wiVVwiXSA9IFwidVwiO1xyXG4gICAgICAgIEJsZW5kU2hhcGVQcmVzZXROYW1lW1wiVW5rbm93blwiXSA9IFwidW5rbm93blwiO1xyXG4gICAgfSkoQmxlbmRTaGFwZVByZXNldE5hbWUgPSBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfHwgKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSA9IHt9KSk7XHJcbiAgICB2YXIgRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZTtcclxuICAgIChmdW5jdGlvbiAoRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZSkge1xyXG4gICAgICAgIEZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWVbXCJCbGVuZFNoYXBlXCJdID0gXCJCbGVuZFNoYXBlXCI7XHJcbiAgICAgICAgRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZVtcIkJvbmVcIl0gPSBcIkJvbmVcIjtcclxuICAgIH0pKEZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUgPSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZSB8fCAoVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUgPSB7fSkpO1xyXG4gICAgdmFyIEh1bWFub2lkQm9uZU5hbWU7XHJcbiAgICAoZnVuY3Rpb24gKEh1bWFub2lkQm9uZU5hbWUpIHtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiQ2hlc3RcIl0gPSBcImNoZXN0XCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkhlYWRcIl0gPSBcImhlYWRcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiSGlwc1wiXSA9IFwiaGlwc1wiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJKYXdcIl0gPSBcImphd1wiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0RXllXCJdID0gXCJsZWZ0RXllXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRGb290XCJdID0gXCJsZWZ0Rm9vdFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0SGFuZFwiXSA9IFwibGVmdEhhbmRcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdEluZGV4RGlzdGFsXCJdID0gXCJsZWZ0SW5kZXhEaXN0YWxcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdEluZGV4SW50ZXJtZWRpYXRlXCJdID0gXCJsZWZ0SW5kZXhJbnRlcm1lZGlhdGVcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdEluZGV4UHJveGltYWxcIl0gPSBcImxlZnRJbmRleFByb3hpbWFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRMaXR0bGVEaXN0YWxcIl0gPSBcImxlZnRMaXR0bGVEaXN0YWxcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdExpdHRsZUludGVybWVkaWF0ZVwiXSA9IFwibGVmdExpdHRsZUludGVybWVkaWF0ZVwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0TGl0dGxlUHJveGltYWxcIl0gPSBcImxlZnRMaXR0bGVQcm94aW1hbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0TG93ZXJBcm1cIl0gPSBcImxlZnRMb3dlckFybVwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0TG93ZXJMZWdcIl0gPSBcImxlZnRMb3dlckxlZ1wiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0TWlkZGxlRGlzdGFsXCJdID0gXCJsZWZ0TWlkZGxlRGlzdGFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRNaWRkbGVJbnRlcm1lZGlhdGVcIl0gPSBcImxlZnRNaWRkbGVJbnRlcm1lZGlhdGVcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdE1pZGRsZVByb3hpbWFsXCJdID0gXCJsZWZ0TWlkZGxlUHJveGltYWxcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdFJpbmdEaXN0YWxcIl0gPSBcImxlZnRSaW5nRGlzdGFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRSaW5nSW50ZXJtZWRpYXRlXCJdID0gXCJsZWZ0UmluZ0ludGVybWVkaWF0ZVwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0UmluZ1Byb3hpbWFsXCJdID0gXCJsZWZ0UmluZ1Byb3hpbWFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRTaG91bGRlclwiXSA9IFwibGVmdFNob3VsZGVyXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRUaHVtYkRpc3RhbFwiXSA9IFwibGVmdFRodW1iRGlzdGFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRUaHVtYkludGVybWVkaWF0ZVwiXSA9IFwibGVmdFRodW1iSW50ZXJtZWRpYXRlXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIkxlZnRUaHVtYlByb3hpbWFsXCJdID0gXCJsZWZ0VGh1bWJQcm94aW1hbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJMZWZ0VG9lc1wiXSA9IFwibGVmdFRvZXNcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdFVwcGVyQXJtXCJdID0gXCJsZWZ0VXBwZXJBcm1cIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTGVmdFVwcGVyTGVnXCJdID0gXCJsZWZ0VXBwZXJMZWdcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiTmVja1wiXSA9IFwibmVja1wiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodEV5ZVwiXSA9IFwicmlnaHRFeWVcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiUmlnaHRGb290XCJdID0gXCJyaWdodEZvb3RcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiUmlnaHRIYW5kXCJdID0gXCJyaWdodEhhbmRcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiUmlnaHRJbmRleERpc3RhbFwiXSA9IFwicmlnaHRJbmRleERpc3RhbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodEluZGV4SW50ZXJtZWRpYXRlXCJdID0gXCJyaWdodEluZGV4SW50ZXJtZWRpYXRlXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0SW5kZXhQcm94aW1hbFwiXSA9IFwicmlnaHRJbmRleFByb3hpbWFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0TGl0dGxlRGlzdGFsXCJdID0gXCJyaWdodExpdHRsZURpc3RhbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodExpdHRsZUludGVybWVkaWF0ZVwiXSA9IFwicmlnaHRMaXR0bGVJbnRlcm1lZGlhdGVcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiUmlnaHRMaXR0bGVQcm94aW1hbFwiXSA9IFwicmlnaHRMaXR0bGVQcm94aW1hbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodExvd2VyQXJtXCJdID0gXCJyaWdodExvd2VyQXJtXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0TG93ZXJMZWdcIl0gPSBcInJpZ2h0TG93ZXJMZWdcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiUmlnaHRNaWRkbGVEaXN0YWxcIl0gPSBcInJpZ2h0TWlkZGxlRGlzdGFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlXCJdID0gXCJyaWdodE1pZGRsZUludGVybWVkaWF0ZVwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodE1pZGRsZVByb3hpbWFsXCJdID0gXCJyaWdodE1pZGRsZVByb3hpbWFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0UmluZ0Rpc3RhbFwiXSA9IFwicmlnaHRSaW5nRGlzdGFsXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0UmluZ0ludGVybWVkaWF0ZVwiXSA9IFwicmlnaHRSaW5nSW50ZXJtZWRpYXRlXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0UmluZ1Byb3hpbWFsXCJdID0gXCJyaWdodFJpbmdQcm94aW1hbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodFNob3VsZGVyXCJdID0gXCJyaWdodFNob3VsZGVyXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0VGh1bWJEaXN0YWxcIl0gPSBcInJpZ2h0VGh1bWJEaXN0YWxcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiUmlnaHRUaHVtYkludGVybWVkaWF0ZVwiXSA9IFwicmlnaHRUaHVtYkludGVybWVkaWF0ZVwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodFRodW1iUHJveGltYWxcIl0gPSBcInJpZ2h0VGh1bWJQcm94aW1hbFwiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodFRvZXNcIl0gPSBcInJpZ2h0VG9lc1wiO1xyXG4gICAgICAgIEh1bWFub2lkQm9uZU5hbWVbXCJSaWdodFVwcGVyQXJtXCJdID0gXCJyaWdodFVwcGVyQXJtXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlJpZ2h0VXBwZXJMZWdcIl0gPSBcInJpZ2h0VXBwZXJMZWdcIjtcclxuICAgICAgICBIdW1hbm9pZEJvbmVOYW1lW1wiU3BpbmVcIl0gPSBcInNwaW5lXCI7XHJcbiAgICAgICAgSHVtYW5vaWRCb25lTmFtZVtcIlVwcGVyQ2hlc3RcIl0gPSBcInVwcGVyQ2hlc3RcIjtcclxuICAgIH0pKEh1bWFub2lkQm9uZU5hbWUgPSBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSB8fCAoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUgPSB7fSkpO1xyXG4gICAgdmFyIE1ldGFBbGxvd2VkVXNlck5hbWU7XHJcbiAgICAoZnVuY3Rpb24gKE1ldGFBbGxvd2VkVXNlck5hbWUpIHtcclxuICAgICAgICBNZXRhQWxsb3dlZFVzZXJOYW1lW1wiRXZlcnlvbmVcIl0gPSBcIkV2ZXJ5b25lXCI7XHJcbiAgICAgICAgTWV0YUFsbG93ZWRVc2VyTmFtZVtcIkV4cGxpY2l0bHlMaWNlbnNlZFBlcnNvblwiXSA9IFwiRXhwbGljaXRseUxpY2Vuc2VkUGVyc29uXCI7XHJcbiAgICAgICAgTWV0YUFsbG93ZWRVc2VyTmFtZVtcIk9ubHlBdXRob3JcIl0gPSBcIk9ubHlBdXRob3JcIjtcclxuICAgIH0pKE1ldGFBbGxvd2VkVXNlck5hbWUgPSBWUk1TY2hlbWEuTWV0YUFsbG93ZWRVc2VyTmFtZSB8fCAoVlJNU2NoZW1hLk1ldGFBbGxvd2VkVXNlck5hbWUgPSB7fSkpO1xyXG4gICAgdmFyIE1ldGFVc3NhZ2VOYW1lO1xyXG4gICAgKGZ1bmN0aW9uIChNZXRhVXNzYWdlTmFtZSkge1xyXG4gICAgICAgIE1ldGFVc3NhZ2VOYW1lW1wiQWxsb3dcIl0gPSBcIkFsbG93XCI7XHJcbiAgICAgICAgTWV0YVVzc2FnZU5hbWVbXCJEaXNhbGxvd1wiXSA9IFwiRGlzYWxsb3dcIjtcclxuICAgIH0pKE1ldGFVc3NhZ2VOYW1lID0gVlJNU2NoZW1hLk1ldGFVc3NhZ2VOYW1lIHx8IChWUk1TY2hlbWEuTWV0YVVzc2FnZU5hbWUgPSB7fSkpO1xyXG4gICAgdmFyIE1ldGFMaWNlbnNlTmFtZTtcclxuICAgIChmdW5jdGlvbiAoTWV0YUxpY2Vuc2VOYW1lKSB7XHJcbiAgICAgICAgTWV0YUxpY2Vuc2VOYW1lW1wiQ2MwXCJdID0gXCJDQzBcIjtcclxuICAgICAgICBNZXRhTGljZW5zZU5hbWVbXCJDY0J5XCJdID0gXCJDQ19CWVwiO1xyXG4gICAgICAgIE1ldGFMaWNlbnNlTmFtZVtcIkNjQnlOY1wiXSA9IFwiQ0NfQllfTkNcIjtcclxuICAgICAgICBNZXRhTGljZW5zZU5hbWVbXCJDY0J5TmNOZFwiXSA9IFwiQ0NfQllfTkNfTkRcIjtcclxuICAgICAgICBNZXRhTGljZW5zZU5hbWVbXCJDY0J5TmNTYVwiXSA9IFwiQ0NfQllfTkNfU0FcIjtcclxuICAgICAgICBNZXRhTGljZW5zZU5hbWVbXCJDY0J5TmRcIl0gPSBcIkNDX0JZX05EXCI7XHJcbiAgICAgICAgTWV0YUxpY2Vuc2VOYW1lW1wiQ2NCeVNhXCJdID0gXCJDQ19CWV9TQVwiO1xyXG4gICAgICAgIE1ldGFMaWNlbnNlTmFtZVtcIk90aGVyXCJdID0gXCJPdGhlclwiO1xyXG4gICAgICAgIE1ldGFMaWNlbnNlTmFtZVtcIlJlZGlzdHJpYnV0aW9uUHJvaGliaXRlZFwiXSA9IFwiUmVkaXN0cmlidXRpb25fUHJvaGliaXRlZFwiO1xyXG4gICAgfSkoTWV0YUxpY2Vuc2VOYW1lID0gVlJNU2NoZW1hLk1ldGFMaWNlbnNlTmFtZSB8fCAoVlJNU2NoZW1hLk1ldGFMaWNlbnNlTmFtZSA9IHt9KSk7XHJcbn0pKFZSTVNjaGVtYSA9IGV4cG9ydHMuVlJNU2NoZW1hIHx8IChleHBvcnRzLlZSTVNjaGVtYSA9IHt9KSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vR0xURlNjaGVtYVwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9WUk1TY2hlbWFcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk1hdHJpeDRJbnZlcnNlQ2FjaGUgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxudmFyIE1hdHJpeDRJbnZlcnNlQ2FjaGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTWF0cml4NEludmVyc2VDYWNoZShtYXRyaXgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2ludmVyc2VDYWNoZSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XHJcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG9iaiwgcHJvcCwgbmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsRWxlbWVudHMgPSBtYXRyaXguZWxlbWVudHM7XHJcbiAgICAgICAgbWF0cml4LmVsZW1lbnRzID0gbmV3IFByb3h5KG1hdHJpeC5lbGVtZW50cywgaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWF0cml4NEludmVyc2VDYWNoZS5wcm90b3R5cGUsIFwiaW52ZXJzZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnZlcnNlQ2FjaGUuZ2V0SW52ZXJzZSh0aGlzLm1hdHJpeCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBNYXRyaXg0SW52ZXJzZUNhY2hlLnByb3RvdHlwZS5yZXZlcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXguZWxlbWVudHMgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNYXRyaXg0SW52ZXJzZUNhY2hlO1xyXG59KCkpO1xyXG5leHBvcnRzLk1hdHJpeDRJbnZlcnNlQ2FjaGUgPSBNYXRyaXg0SW52ZXJzZUNhY2hlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZXBEaXNwb3NlID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpIHtcclxuICAgIE9iamVjdC5rZXlzKG1hdGVyaWFsKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBtYXRlcmlhbFtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUuaXNUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRleHR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xyXG59XHJcbmZ1bmN0aW9uIGRpc3Bvc2Uob2JqZWN0M0QpIHtcclxuICAgIHZhciBnZW9tZXRyeSA9IG9iamVjdDNELmdlb21ldHJ5O1xyXG4gICAgaWYgKGdlb21ldHJ5KSB7XHJcbiAgICAgICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgdmFyIG1hdGVyaWFsID0gb2JqZWN0M0QubWF0ZXJpYWw7XHJcbiAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZm9yRWFjaChmdW5jdGlvbiAobWF0ZXJpYWwpIHsgcmV0dXJuIGRpc3Bvc2VNYXRlcmlhbChtYXRlcmlhbCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBkZWVwRGlzcG9zZShvYmplY3QzRCkge1xyXG4gICAgb2JqZWN0M0QudHJhdmVyc2UoZGlzcG9zZSk7XHJcbn1cclxuZXhwb3J0cy5kZWVwRGlzcG9zZSA9IGRlZXBEaXNwb3NlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmdldFdvcmxkUXVhdGVybmlvbkxpdGUgPSBleHBvcnRzLmdldFdvcmxkU2NhbGVMaXRlID0gZXhwb3J0cy5nZXRXb3JsZFBvc2l0aW9uTGl0ZSA9IGV4cG9ydHMubGluc3RlcCA9IGV4cG9ydHMuc2F0dXJhdGUgPSB2b2lkIDA7XHJcbnZhciBUSFJFRSA9IHJlcXVpcmUoXCJ0aHJlZVwiKTtcclxuZnVuY3Rpb24gc2F0dXJhdGUodmFsdWUpIHtcclxuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcclxufVxyXG5leHBvcnRzLnNhdHVyYXRlID0gc2F0dXJhdGU7XHJcbmZ1bmN0aW9uIGxpbnN0ZXAoeCwgbWluLCBtYXgpIHtcclxuICAgIGlmICh4IDw9IG1pbilcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIGlmICh4ID49IG1heClcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIHJldHVybiAoeCAtIG1pbikgLyAobWF4IC0gbWluKTtcclxufVxyXG5leHBvcnRzLmxpbnN0ZXAgPSBsaW5zdGVwO1xyXG52YXIgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxudmFyIF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbnZhciBfcm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xyXG5mdW5jdGlvbiBnZXRXb3JsZFBvc2l0aW9uTGl0ZShvYmplY3QsIG91dCkge1xyXG4gICAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShvdXQsIF9yb3RhdGlvbiwgX3NjYWxlKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn1cclxuZXhwb3J0cy5nZXRXb3JsZFBvc2l0aW9uTGl0ZSA9IGdldFdvcmxkUG9zaXRpb25MaXRlO1xyXG5mdW5jdGlvbiBnZXRXb3JsZFNjYWxlTGl0ZShvYmplY3QsIG91dCkge1xyXG4gICAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIF9yb3RhdGlvbiwgb3V0KTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn1cclxuZXhwb3J0cy5nZXRXb3JsZFNjYWxlTGl0ZSA9IGdldFdvcmxkU2NhbGVMaXRlO1xyXG5mdW5jdGlvbiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKG9iamVjdCwgb3V0KSB7XHJcbiAgICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgb3V0LCBfc2NhbGUpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufVxyXG5leHBvcnRzLmdldFdvcmxkUXVhdGVybmlvbkxpdGUgPSBnZXRXb3JsZFF1YXRlcm5pb25MaXRlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnJlbmFtZU1hdGVyaWFsUHJvcGVydHkgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIHJlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSkge1xyXG4gICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcInJlbmFtZU1hdGVyaWFsUHJvcGVydHk6IEdpdmVuIHByb3BlcnR5IG5hbWUgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBtaWdodCBiZSBpbnZhbGlkXCIpO1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG4gICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xyXG4gICAgaWYgKCEvW0EtWl0vLnRlc3QobmFtZVswXSkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJyZW5hbWVNYXRlcmlhbFByb3BlcnR5OiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIgbWlnaHQgYmUgaW52YWxpZFwiKTtcclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKTtcclxufVxyXG5leHBvcnRzLnJlbmFtZU1hdGVyaWFsUHJvcGVydHkgPSByZW5hbWVNYXRlcmlhbFByb3BlcnR5O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFRIUkVFOyJdLCJzb3VyY2VSb290IjoiIn0=