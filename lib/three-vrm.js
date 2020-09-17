/*!
 * @pixiv/three-vrm v0.4.1
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
    renderer.getSize(_v2A);
    var prevWidth = _v2A.x;
    var prevHeight = _v2A.y;
    renderer.setSize(size, size);
    _plane.material.map = texture;
    renderer.render(_scene, _camera);
    _plane.material.map = null;
    return new Promise(function (resolve, reject) {
        renderer.getContext().canvas.toBlob(function (blob) {
            renderer.setSize(prevWidth, prevHeight);
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    }
    Object.defineProperty(VRMBlendShapeProxy.prototype, "expressions", {
        get: function () {
            return Object.keys(this._blendShapeGroups);
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            var vrmExt, scene, materials, humanoid, firstPerson, _a, blendShapeProxy, lookAt, _b, springBoneManager;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
                            throw new Error('Could not find VRM extension on the GLTF');
                        }
                        vrmExt = gltf.parser.json.extensions.VRM;
                        scene = gltf.scene;
                        scene.updateMatrixWorld(false);
                        scene.traverse(function (object3d) {
                            if (object3d.isMesh) {
                                object3d.frustumCulled = false;
                            }
                        });
                        return [4, this._materialImporter.convertGLTFMaterials(gltf)];
                    case 1:
                        materials = (_c.sent()) || undefined;
                        return [4, this._humanoidImporter.import(gltf)];
                    case 2:
                        humanoid = (_c.sent()) || undefined;
                        if (!humanoid) return [3, 4];
                        return [4, this._firstPersonImporter.import(gltf, humanoid)];
                    case 3:
                        _a = (_c.sent()) || undefined;
                        return [3, 5];
                    case 4:
                        _a = undefined;
                        _c.label = 5;
                    case 5:
                        firstPerson = _a;
                        return [4, this._blendShapeImporter.import(gltf)];
                    case 6:
                        blendShapeProxy = (_c.sent()) || undefined;
                        if (!(firstPerson && blendShapeProxy && humanoid)) return [3, 8];
                        return [4, this._lookAtImporter.import(gltf, firstPerson, blendShapeProxy, humanoid)];
                    case 7:
                        _b = (_c.sent()) || undefined;
                        return [3, 9];
                    case 8:
                        _b = undefined;
                        _c.label = 9;
                    case 9:
                        lookAt = _b;
                        if (lookAt.setupHelper) {
                            lookAt.setupHelper(scene, debugOptions);
                        }
                        return [4, this._springBoneImporter.import(gltf)];
                    case 10:
                        springBoneManager = (_c.sent()) || undefined;
                        if (springBoneManager.setupHelper) {
                            springBoneManager.setupHelper(scene, debugOptions);
                        }
                        return [2, new VRMDebug_1.VRMDebug({
                                scene: gltf.scene,
                                meta: vrmExt.meta,
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
                    _this._createHeadlessModelForSkinnedMesh(parent_1, child);
                });
            }
        }
        else if (node.type === 'SkinnedMesh') {
            this._createHeadlessModelForSkinnedMesh(node.parent, node);
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var VRMHumanoid = (function () {
    function VRMHumanoid(boneArray, humanDescription) {
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
            pose[vrmBoneName] = {
                position: node.position.toArray(),
                rotation: node.quaternion.toArray(),
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
                node.position.set(restState.position[0] + state.position[0], restState.position[1] + state.position[1], restState.position[2] + state.position[2]);
            }
            if (state.rotation) {
                node.quaternion.fromArray(state.rotation);
            }
        });
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
        return target
            .copy(VECTOR3_FRONT)
            .applyEuler(this._euler)
            .applyQuaternion(rot);
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
        var lookAtDir = _v3C
            .copy(position)
            .sub(headPosition)
            .normalize();
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
            this._initialLocalChildPosition
                .copy(this.bone.position)
                .normalize()
                .multiplyScalar(0.07);
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
        var applyRotation = _quatA.setFromUnitVectors(this._boneAxis, _v3A
            .copy(this._nextTail)
            .applyMatrix4(initialCenterSpaceMatrixInv)
            .normalize());
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvYXNzaWduLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vVlJNLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL2V4dHJhY3RUaHVtYm5haWxCbG9iLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUdyb3VwLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZVByb3h5LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNSW1wb3J0ZXJEZWJ1Zy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9WUk1Mb29rQXRIZWFkRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNTG9va0F0SW1wb3J0ZXJEZWJ1Zy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9WUk1TcHJpbmdCb25lRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9WUk1GaXJzdFBlcnNvbi50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9WUk1GaXJzdFBlcnNvbkltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2ZpcnN0cGVyc29uL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2h1bWFub2lkL1ZSTUh1bWFuQm9uZS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbm9pZC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbm9pZEltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2h1bWFub2lkL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1DdXJ2ZU1hcHBlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0QXBwbHllci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbG9va2F0L1ZSTUxvb2tBdEJvbmVBcHBseWVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1Mb29rQXRIZWFkLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvTVRvb25NYXRlcmlhbC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9WUk1NYXRlcmlhbEltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL1ZSTVVubGl0TWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL3NoYWRlcnMvbXRvb24uZnJhZyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9zaGFkZXJzL210b29uLnZlcnQiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvc2hhZGVycy91bmxpdC5mcmFnIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL3NoYWRlcnMvdW5saXQudmVydCIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tZXRhL1ZSTU1ldGFJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tZXRhL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdHlwZXMvVlJNU2NoZW1hLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdXRpbHMvZGlzcG9zZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdXRpbHMvbWF0aC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS91dGlscy9yZW5hbWVNYXRlcmlhbFByb3BlcnR5LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vZXh0ZXJuYWwgXCJUSFJFRVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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QVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFIRCx3REFHQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFRCxTQUFnQixzQkFBc0IsQ0FBQyxJQUFZO0lBQ2pELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFnRCxJQUFJLHdCQUFvQixDQUFDLENBQUM7UUFDdkYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsbURBQWdELElBQUksd0JBQW9CLENBQUMsQ0FBQztRQUN2RixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBWkQsd0RBWUM7Ozs7Ozs7Ozs7OztBQ1pELHVCIiwiZmlsZSI6InRocmVlLXZybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2Fzc2lnbi50c1wiKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgKiBhcyBfX3RocmVlX3ZybV9fIGZyb20gJy4nO1xuLy8gQHRzLWlnbm9yZVxuT2JqZWN0LmFzc2lnbihUSFJFRSwgX190aHJlZV92cm1fXyk7XG4iLCJleHBvcnQgKiBmcm9tICcuL3ZybS8nO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4vbG9va2F0JztcbmltcG9ydCB7IFZSTU1ldGEgfSBmcm9tICcuL21ldGEvVlJNTWV0YSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBkZWVwRGlzcG9zZSB9IGZyb20gJy4vdXRpbHMvZGlzcG9zZXInO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXIsIFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4vVlJNSW1wb3J0ZXInO1xuXG4vKipcbiAqIFBhcmFtZXRlcnMgZm9yIGEgW1tWUk1dXSBjbGFzcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWUk1QYXJhbWV0ZXJzIHtcbiAgc2NlbmU6IFRIUkVFLlNjZW5lIHwgVEhSRUUuR3JvdXA7IC8vIENPTVBBVDogYEdMVEYuc2NlbmVgIGlzIGdvaW5nIHRvIGJlIGBUSFJFRS5Hcm91cGAgaW4gcjExNFxuICBodW1hbm9pZD86IFZSTUh1bWFub2lkO1xuICBibGVuZFNoYXBlUHJveHk/OiBWUk1CbGVuZFNoYXBlUHJveHk7XG4gIGZpcnN0UGVyc29uPzogVlJNRmlyc3RQZXJzb247XG4gIGxvb2tBdD86IFZSTUxvb2tBdEhlYWQ7XG4gIG1hdGVyaWFscz86IFRIUkVFLk1hdGVyaWFsW107XG4gIHNwcmluZ0JvbmVNYW5hZ2VyPzogVlJNU3ByaW5nQm9uZU1hbmFnZXI7XG4gIG1ldGE/OiBWUk1NZXRhO1xufVxuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgc2luZ2xlIFZSTSBtb2RlbC5cbiAqIFNlZSB0aGUgZG9jdW1lbnRhdGlvbiBvZiBbW1ZSTS5mcm9tXV0gZm9yIHRoZSBtb3N0IGJhc2ljIHVzZSBvZiBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBmcm9tIGEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlci5cbiAgICogSXQncyBwcm9iYWJseSBhIHRoaW5nIHdoYXQgeW91IHdhbnQgdG8gZ2V0IHN0YXJ0ZWQgd2l0aCBWUk1zLlxuICAgKlxuICAgKiBAZXhhbXBsZSBNb3N0IGJhc2ljIHVzZSBvZiBWUk1cbiAgICogYGBgXG4gICAqIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAqXG4gICAqIG5ldyBUSFJFRS5HTFRGTG9hZGVyKCkubG9hZCggJ21vZGVscy90aHJlZS12cm0tZ2lybC52cm0nLCAoIGdsdGYgKSA9PiB7XG4gICAqXG4gICAqICAgVEhSRUUuVlJNLmZyb20oIGdsdGYgKS50aGVuKCAoIHZybSApID0+IHtcbiAgICpcbiAgICogICAgIHNjZW5lLmFkZCggdnJtLnNjZW5lICk7XG4gICAqXG4gICAqICAgfSApO1xuICAgKlxuICAgKiB9ICk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCBpbiBpbXBvcnRlclxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhc3luYyBmcm9tKGdsdGY6IEdMVEYsIG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxWUk0+IHtcbiAgICBjb25zdCBpbXBvcnRlciA9IG5ldyBWUk1JbXBvcnRlcihvcHRpb25zKTtcbiAgICByZXR1cm4gYXdhaXQgaW1wb3J0ZXIuaW1wb3J0KGdsdGYpO1xuICB9XG4gIC8qKlxuICAgKiBgVEhSRUUuU2NlbmVgIG9yIGBUSFJFRS5Hcm91cGAgKGRlcGVuZHMgb24geW91ciB0aHJlZS5qcyByZXZpc2lvbikgdGhhdCBjb250YWlucyB0aGUgZW50aXJlIFZSTS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzY2VuZTogVEhSRUUuU2NlbmUgfCBUSFJFRS5Hcm91cDsgLy8gQ09NUEFUOiBgR0xURi5zY2VuZWAgaXMgZ29pbmcgdG8gYmUgYFRIUkVFLkdyb3VwYCBpbiByMTE0XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNSHVtYW5vaWRdXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIGNvbnRyb2wgZWFjaCBib25lcyB1c2luZyBbW1ZSTUh1bWFub2lkLmdldEJvbmVOb2RlXV0uXG4gICAqXG4gICAqIEBUT0RPIEFkZCBhIGxpbmsgdG8gVlJNIHNwZWNcbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbm9pZD86IFZSTUh1bWFub2lkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUJsZW5kU2hhcGVQcm94eV1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSBbW1ZSTUJsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZV1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJsZW5kU2hhcGVQcm94eT86IFZSTUJsZW5kU2hhcGVQcm94eTtcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1GaXJzdFBlcnNvbl1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gdXNlIHZhcmlvdXMgZmVhdHVyZSBvZiB0aGUgZmlyc3RQZXJzb24gZmllbGQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb24/OiBWUk1GaXJzdFBlcnNvbjtcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1Mb29rQXRIZWFkXV0gb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIFtbVlJNTG9va0F0SGVhZC50YXJnZXRdXSB0byBjb250cm9sIHRoZSBleWUgZGlyZWN0aW9uIG9mIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBsb29rQXQ/OiBWUk1Mb29rQXRIZWFkO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtYXRlcmlhbHMgb2YgdGhlIFZSTS5cbiAgICogYHVwZGF0ZVZSTU1hdGVyaWFsc2AgbWV0aG9kIG9mIHRoZXNlIG1hdGVyaWFscyB3aWxsIGJlIGNhbGxlZCB2aWEgaXRzIFtbVlJNLnVwZGF0ZV1dIG1ldGhvZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtYXRlcmlhbHM/OiBUSFJFRS5NYXRlcmlhbFtdO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBtZXRhIGZpZWxkcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byByZWZlciB0aGVzZSBsaWNlbnNlIGZpZWxkcyBiZWZvcmUgdXNlIHlvdXIgVlJNcy5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBtZXRhPzogVlJNTWV0YTtcblxuICAvKipcbiAgICogQSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0gbWFuaXB1bGF0ZXMgYWxsIHNwcmluZyBib25lcyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lTWFuYWdlcj86IFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIFtbVlJNUGFyYW1ldGVyc11dIHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTVBhcmFtZXRlcnMpIHtcbiAgICB0aGlzLnNjZW5lID0gcGFyYW1zLnNjZW5lO1xuICAgIHRoaXMuaHVtYW5vaWQgPSBwYXJhbXMuaHVtYW5vaWQ7XG4gICAgdGhpcy5ibGVuZFNoYXBlUHJveHkgPSBwYXJhbXMuYmxlbmRTaGFwZVByb3h5O1xuICAgIHRoaXMuZmlyc3RQZXJzb24gPSBwYXJhbXMuZmlyc3RQZXJzb247XG4gICAgdGhpcy5sb29rQXQgPSBwYXJhbXMubG9va0F0O1xuICAgIHRoaXMubWF0ZXJpYWxzID0gcGFyYW1zLm1hdGVyaWFscztcbiAgICB0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyID0gcGFyYW1zLnNwcmluZ0JvbmVNYW5hZ2VyO1xuICAgIHRoaXMubWV0YSA9IHBhcmFtcy5tZXRhO1xuICB9XG5cbiAgLyoqXG4gICAqICoqWW91IG5lZWQgdG8gY2FsbCB0aGlzIG9uIHlvdXIgdXBkYXRlIGxvb3AuKipcbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGV2ZXJ5IFZSTSBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb29rQXQpIHtcbiAgICAgIHRoaXMubG9va0F0LnVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxlbmRTaGFwZVByb3h5KSB7XG4gICAgICB0aGlzLmJsZW5kU2hhcGVQcm94eS51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zcHJpbmdCb25lTWFuYWdlcikge1xuICAgICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlci5sYXRlVXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXRlcmlhbHMpIHtcbiAgICAgIHRoaXMubWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKG1hdGVyaWFsLnVwZGF0ZVZSTU1hdGVyaWFscykge1xuICAgICAgICAgIG1hdGVyaWFsLnVwZGF0ZVZSTU1hdGVyaWFscyhkZWx0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIGV2ZXJ5dGhpbmcgYWJvdXQgdGhlIFZSTSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHNjZW5lID0gdGhpcy5zY2VuZTtcbiAgICBpZiAoc2NlbmUpIHtcbiAgICAgIGRlZXBEaXNwb3NlKHNjZW5lKTtcbiAgICB9XG5cbiAgICB0aGlzLm1ldGE/LnRleHR1cmU/LmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUltcG9ydGVyIH0gZnJvbSAnLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXIgfSBmcm9tICcuL2ZpcnN0cGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkSW1wb3J0ZXIgfSBmcm9tICcuL2h1bWFub2lkL1ZSTUh1bWFub2lkSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0SW1wb3J0ZXIgfSBmcm9tICcuL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1NYXRlcmlhbEltcG9ydGVyIH0gZnJvbSAnLi9tYXRlcmlhbCc7XG5pbXBvcnQgeyBWUk1NZXRhSW1wb3J0ZXIgfSBmcm9tICcuL21ldGEvVlJNTWV0YUltcG9ydGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlciB9IGZyb20gJy4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi9WUk0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUltcG9ydGVyT3B0aW9ucyB7XG4gIG1ldGFJbXBvcnRlcj86IFZSTU1ldGFJbXBvcnRlcjtcbiAgbG9va0F0SW1wb3J0ZXI/OiBWUk1Mb29rQXRJbXBvcnRlcjtcbiAgaHVtYW5vaWRJbXBvcnRlcj86IFZSTUh1bWFub2lkSW1wb3J0ZXI7XG4gIGJsZW5kU2hhcGVJbXBvcnRlcj86IFZSTUJsZW5kU2hhcGVJbXBvcnRlcjtcbiAgZmlyc3RQZXJzb25JbXBvcnRlcj86IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXI7XG4gIG1hdGVyaWFsSW1wb3J0ZXI/OiBWUk1NYXRlcmlhbEltcG9ydGVyO1xuICBzcHJpbmdCb25lSW1wb3J0ZXI/OiBWUk1TcHJpbmdCb25lSW1wb3J0ZXI7XG59XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1dXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1JbXBvcnRlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbWV0YUltcG9ydGVyOiBWUk1NZXRhSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfYmxlbmRTaGFwZUltcG9ydGVyOiBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbG9va0F0SW1wb3J0ZXI6IFZSTUxvb2tBdEltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2h1bWFub2lkSW1wb3J0ZXI6IFZSTUh1bWFub2lkSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlyc3RQZXJzb25JbXBvcnRlcjogVlJNRmlyc3RQZXJzb25JbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9tYXRlcmlhbEltcG9ydGVyOiBWUk1NYXRlcmlhbEltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NwcmluZ0JvbmVJbXBvcnRlcjogVlJNU3ByaW5nQm9uZUltcG9ydGVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNSW1wb3J0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFtbVlJNSW1wb3J0ZXJPcHRpb25zXV0sIG9wdGlvbmFsbHkgY29udGFpbnMgaW1wb3J0ZXJzIGZvciBlYWNoIGNvbXBvbmVudFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5fbWV0YUltcG9ydGVyID0gb3B0aW9ucy5tZXRhSW1wb3J0ZXIgfHwgbmV3IFZSTU1ldGFJbXBvcnRlcigpO1xuICAgIHRoaXMuX2JsZW5kU2hhcGVJbXBvcnRlciA9IG9wdGlvbnMuYmxlbmRTaGFwZUltcG9ydGVyIHx8IG5ldyBWUk1CbGVuZFNoYXBlSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9sb29rQXRJbXBvcnRlciA9IG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgfHwgbmV3IFZSTUxvb2tBdEltcG9ydGVyKCk7XG4gICAgdGhpcy5faHVtYW5vaWRJbXBvcnRlciA9IG9wdGlvbnMuaHVtYW5vaWRJbXBvcnRlciB8fCBuZXcgVlJNSHVtYW5vaWRJbXBvcnRlcigpO1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uSW1wb3J0ZXIgPSBvcHRpb25zLmZpcnN0UGVyc29uSW1wb3J0ZXIgfHwgbmV3IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9tYXRlcmlhbEltcG9ydGVyID0gb3B0aW9ucy5tYXRlcmlhbEltcG9ydGVyIHx8IG5ldyBWUk1NYXRlcmlhbEltcG9ydGVyKCk7XG4gICAgdGhpcy5fc3ByaW5nQm9uZUltcG9ydGVyID0gb3B0aW9ucy5zcHJpbmdCb25lSW1wb3J0ZXIgfHwgbmV3IFZSTVNwcmluZ0JvbmVJbXBvcnRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2VpdmUgYSBHTFRGIG9iamVjdCByZXRyaWV2ZWQgZnJvbSBgVEhSRUUuR0xURkxvYWRlcmAgYW5kIGNyZWF0ZSBhIG5ldyBbW1ZSTV1dIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNPiB7XG4gICAgaWYgKGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucyA9PT0gdW5kZWZpbmVkIHx8IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucy5WUk0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBWUk0gZXh0ZW5zaW9uIG9uIHRoZSBHTFRGJyk7XG4gICAgfVxuICAgIGNvbnN0IHNjZW5lID0gZ2x0Zi5zY2VuZTtcblxuICAgIHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKGZhbHNlKTtcblxuICAgIC8vIFNraW5uZWQgb2JqZWN0IHNob3VsZCBub3QgYmUgZnJ1c3R1bUN1bGxlZFxuICAgIC8vIFNpbmNlIHByZS1za2lubmVkIHBvc2l0aW9uIG1pZ2h0IGJlIG91dHNpZGUgb2Ygdmlld1xuICAgIHNjZW5lLnRyYXZlcnNlKChvYmplY3QzZCkgPT4ge1xuICAgICAgaWYgKChvYmplY3QzZCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBvYmplY3QzZC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtZXRhID0gKGF3YWl0IHRoaXMuX21ldGFJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG1hdGVyaWFscyA9IChhd2FpdCB0aGlzLl9tYXRlcmlhbEltcG9ydGVyLmNvbnZlcnRHTFRGTWF0ZXJpYWxzKGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBodW1hbm9pZCA9IChhd2FpdCB0aGlzLl9odW1hbm9pZEltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgZmlyc3RQZXJzb24gPSBodW1hbm9pZCA/IChhd2FpdCB0aGlzLl9maXJzdFBlcnNvbkltcG9ydGVyLmltcG9ydChnbHRmLCBodW1hbm9pZCkpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGJsZW5kU2hhcGVQcm94eSA9IChhd2FpdCB0aGlzLl9ibGVuZFNoYXBlSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBsb29rQXQgPVxuICAgICAgZmlyc3RQZXJzb24gJiYgYmxlbmRTaGFwZVByb3h5ICYmIGh1bWFub2lkXG4gICAgICAgID8gKGF3YWl0IHRoaXMuX2xvb2tBdEltcG9ydGVyLmltcG9ydChnbHRmLCBmaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbm9pZCkpIHx8IHVuZGVmaW5lZFxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHNwcmluZ0JvbmVNYW5hZ2VyID0gKGF3YWl0IHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBuZXcgVlJNKHtcbiAgICAgIHNjZW5lOiBnbHRmLnNjZW5lLFxuICAgICAgbWV0YSxcbiAgICAgIG1hdGVyaWFscyxcbiAgICAgIGh1bWFub2lkLFxuICAgICAgZmlyc3RQZXJzb24sXG4gICAgICBibGVuZFNoYXBlUHJveHksXG4gICAgICBsb29rQXQsXG4gICAgICBzcHJpbmdCb25lTWFuYWdlcixcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNIH0gZnJvbSAnLi4vVlJNJztcblxuY29uc3QgX3YyQSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cbmNvbnN0IF9jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKC0xLCAxLCAtMSwgMSwgLTEsIDEpO1xuY29uc3QgX3BsYW5lID0gbmV3IFRIUkVFLk1lc2goXG4gIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDIsIDIpLFxuICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSksXG4pO1xuY29uc3QgX3NjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5fc2NlbmUuYWRkKF9wbGFuZSk7XG5cbi8qKlxuICogRXh0cmFjdCBhIHRodW1ibmFpbCBpbWFnZSBibG9iIGZyb20gYSB7QGxpbmsgVlJNfS5cbiAqIElmIHRoZSB2cm0gZG9lcyBub3QgaGF2ZSBhIHRodW1ibmFpbCwgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAqIEBwYXJhbSByZW5kZXJlciBSZW5kZXJlclxuICogQHBhcmFtIHZybSBWUk0gd2l0aCBhIHRodW1ibmFpbFxuICogQHBhcmFtIHNpemUgd2lkdGggLyBoZWlnaHQgb2YgdGhlIGltYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0VGh1bWJuYWlsQmxvYihyZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgdnJtOiBWUk0sIHNpemUgPSA1MTIpOiBQcm9taXNlPEJsb2I+IHtcbiAgLy8gZ2V0IHRoZSB0ZXh0dXJlXG4gIGNvbnN0IHRleHR1cmUgPSB2cm0ubWV0YT8udGV4dHVyZTtcbiAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdleHRyYWN0VGh1bWJuYWlsQmxvYjogVGhpcyBWUk0gZG9lcyBub3QgaGF2ZSBhIHRodW1ibmFpbCcpO1xuICB9XG5cbiAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgcmVzb2x1dGlvblxuICByZW5kZXJlci5nZXRTaXplKF92MkEpO1xuICBjb25zdCBwcmV2V2lkdGggPSBfdjJBLng7XG4gIGNvbnN0IHByZXZIZWlnaHQgPSBfdjJBLnk7XG5cbiAgLy8gb3ZlcndyaXRlIHRoZSByZXNvbHV0aW9uXG4gIHJlbmRlcmVyLnNldFNpemUoc2l6ZSwgc2l6ZSk7XG5cbiAgLy8gYXNzaWduIHRoZSB0ZXh0dXJlIHRvIHBsYW5lXG4gIF9wbGFuZS5tYXRlcmlhbC5tYXAgPSB0ZXh0dXJlO1xuXG4gIC8vIHJlbmRlclxuICByZW5kZXJlci5yZW5kZXIoX3NjZW5lLCBfY2FtZXJhKTtcblxuICAvLyB1bmFzc2lnbiB0aGUgdGV4dHVyZVxuICBfcGxhbmUubWF0ZXJpYWwubWFwID0gbnVsbDtcblxuICAvLyBnZXQgYmxvYlxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIChyZW5kZXJlci5nZXRDb250ZXh0KCkuY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50KS50b0Jsb2IoKGJsb2IpID0+IHtcbiAgICAgIC8vIHJldmVydCB0byBwcmV2aW91cyByZXNvbHV0aW9uXG4gICAgICByZW5kZXJlci5zZXRTaXplKHByZXZXaWR0aCwgcHJldkhlaWdodCk7XG5cbiAgICAgIGlmIChibG9iID09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KCdleHRyYWN0VGh1bWJuYWlsQmxvYjogRmFpbGVkIHRvIGNyZWF0ZSBhIGJsb2InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgZXh0cmFjdFRodW1ibmFpbEJsb2IgfSBmcm9tICcuL2V4dHJhY3RUaHVtYm5haWxCbG9iJztcbmltcG9ydCB7IHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzIH0gZnJvbSAnLi9yZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1VdGlscyB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gdGhpcyBjbGFzcyBpcyBub3QgbWVhbnQgdG8gYmUgaW5zdGFudGlhdGVkXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGV4dHJhY3RUaHVtYm5haWxCbG9iID0gZXh0cmFjdFRodW1ibmFpbEJsb2I7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMgPSByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cztcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBUcmF2ZXJzZSBnaXZlbiBvYmplY3QgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyaWx5IGJvdW5kIGpvaW50cyBmcm9tIGV2ZXJ5IGBUSFJFRS5Ta2lubmVkTWVzaGAuXG4gKiBTb21lIGVudmlyb25tZW50cyBsaWtlIG1vYmlsZSBkZXZpY2VzIGhhdmUgYSBsb3dlciBsaW1pdCBvZiBib25lcyBhbmQgbWlnaHQgYmUgdW5hYmxlIHRvIHBlcmZvcm0gbWVzaCBza2lubmluZywgdGhpcyBmdW5jdGlvbiBtaWdodCByZXNvbHZlIHN1Y2ggYW4gaXNzdWUuXG4gKiBBbHNvIHRoaXMgZnVuY3Rpb24gbWlnaHQgZ3JlYXRseSBpbXByb3ZlIHRoZSBwZXJmb3JtYW5jZSBvZiBtZXNoIHNraW5uaW5nLlxuICpcbiAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0IHRoYXQgd2lsbCBiZSB0cmF2ZXJzZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzKHJvb3Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIC8vIHNvbWUgbWVzaGVzIG1pZ2h0IHNoYXJlIGEgc2FtZSBza2luSW5kZXggYXR0cmlidXRlIGFuZCB0aGlzIG1hcCBwcmV2ZW50cyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdHdpY2VcbiAgY29uc3Qgc2tlbGV0b25MaXN0OiBNYXA8VEhSRUUuQnVmZmVyQXR0cmlidXRlLCBUSFJFRS5Ta2VsZXRvbj4gPSBuZXcgTWFwKCk7XG5cbiAgLy8gVHJhdmVyc2UgYW4gZW50aXJlIHRyZWVcbiAgcm9vdC50cmF2ZXJzZSgob2JqKSA9PiB7XG4gICAgaWYgKG9iai50eXBlICE9PSAnU2tpbm5lZE1lc2gnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzaCA9IG9iaiBhcyBUSFJFRS5Ta2lubmVkTWVzaDtcbiAgICBjb25zdCBnZW9tZXRyeSA9IG1lc2guZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgY29uc3QgYXR0cmlidXRlID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKSBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG5cbiAgICAvLyBsb29rIGZvciBleGlzdGluZyBza2VsZXRvblxuICAgIGxldCBza2VsZXRvbiA9IHNrZWxldG9uTGlzdC5nZXQoYXR0cmlidXRlKTtcblxuICAgIGlmICghc2tlbGV0b24pIHtcbiAgICAgIC8vIGdlbmVyYXRlIHJlZHVjZWQgYm9uZSBsaXN0XG4gICAgICBjb25zdCBib25lczogVEhSRUUuQm9uZVtdID0gW107IC8vIG5ldyBsaXN0IG9mIGJvbmVcbiAgICAgIGNvbnN0IGJvbmVJbnZlcnNlczogVEhSRUUuTWF0cml4NFtdID0gW107IC8vIG5ldyBsaXN0IG9mIGJvbmVJbnZlcnNlXG4gICAgICBjb25zdCBib25lSW5kZXhNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSA9IHt9OyAvLyBtYXAgb2Ygb2xkIGJvbmUgaW5kZXggdnMuIG5ldyBib25lIGluZGV4XG5cbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBib25lIG1hcFxuICAgICAgY29uc3QgYXJyYXkgPSBhdHRyaWJ1dGUuYXJyYXkgYXMgbnVtYmVyW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlbaV07XG5cbiAgICAgICAgLy8gbmV3IHNraW5JbmRleCBidWZmZXJcbiAgICAgICAgaWYgKGJvbmVJbmRleE1hcFtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJvbmVJbmRleE1hcFtpbmRleF0gPSBib25lcy5sZW5ndGg7XG4gICAgICAgICAgYm9uZXMucHVzaChtZXNoLnNrZWxldG9uLmJvbmVzW2luZGV4XSk7XG4gICAgICAgICAgYm9uZUludmVyc2VzLnB1c2gobWVzaC5za2VsZXRvbi5ib25lSW52ZXJzZXNbaW5kZXhdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5W2ldID0gYm9uZUluZGV4TWFwW2luZGV4XTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVwbGFjZSB3aXRoIG5ldyBpbmRpY2VzXG4gICAgICBhdHRyaWJ1dGUuY29weUFycmF5KGFycmF5KTtcbiAgICAgIGF0dHJpYnV0ZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgIC8vIHJlcGxhY2Ugd2l0aCBuZXcgaW5kaWNlc1xuICAgICAgc2tlbGV0b24gPSBuZXcgVEhSRUUuU2tlbGV0b24oYm9uZXMsIGJvbmVJbnZlcnNlcyk7XG4gICAgICBza2VsZXRvbkxpc3Quc2V0KGF0dHJpYnV0ZSwgc2tlbGV0b24pO1xuICAgIH1cblxuICAgIG1lc2guYmluZChza2VsZXRvbiwgbmV3IFRIUkVFLk1hdHJpeDQoKSk7XG4gICAgLy8gICAgICAgICAgICAgICAgICBeXl5eXl5eXl5eXl5eXl5eXl5eIHRyYW5zZm9ybSBvZiBtZXNoZXMgc2hvdWxkIGJlIGlnbm9yZWRcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzIuMCNza2luc1xuICB9KTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZQcmltaXRpdmUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNQmxlbmRTaGFwZUJpbmQge1xuICBtZXNoZXM6IEdMVEZQcmltaXRpdmVbXTtcbiAgbW9ycGhUYXJnZXRJbmRleDogbnVtYmVyO1xuICB3ZWlnaHQ6IG51bWJlcjtcbn1cblxuZW51bSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUge1xuICBOVU1CRVIsXG4gIFZFQ1RPUjIsXG4gIFZFQ1RPUjMsXG4gIFZFQ1RPUjQsXG4gIENPTE9SLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlIHtcbiAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgZGVmYXVsdFZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgdGFyZ2V0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICBkZWx0YVZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjsgLy8gdGFyZ2V0VmFsdWUgLSBkZWZhdWx0VmFsdWVcbiAgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xufVxuXG5jb25zdCBfdjIgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuY29uc3QgX3YzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92NCA9IG5ldyBUSFJFRS5WZWN0b3I0KCk7XG5jb25zdCBfY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKTtcblxuLy8gYW5pbWF0aW9uTWl4ZXIg44Gu55uj6KaW5a++6LGh44Gv44CBU2NlbmUg44Gu5Lit44Gr5YWl44Gj44Gm44GE44KL5b+F6KaB44GM44GC44KL44CCXG4vLyDjgZ3jga7jgZ/jgoHjgIHooajnpLrjgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjgZHjgozjganjgIFPYmplY3QzRCDjgpLntpnmib/jgZfjgaYgU2NlbmUg44Gr5oqV5YWl44Gn44GN44KL44KI44GG44Gr44GZ44KL44CCXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZUdyb3VwIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0Qge1xuICBwdWJsaWMgd2VpZ2h0ID0gMC4wO1xuICBwdWJsaWMgaXNCaW5hcnkgPSBmYWxzZTtcblxuICBwcml2YXRlIF9iaW5kczogVlJNQmxlbmRTaGFwZUJpbmRbXSA9IFtdO1xuICBwcml2YXRlIF9tYXRlcmlhbFZhbHVlczogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IGBCbGVuZFNoYXBlQ29udHJvbGxlcl8ke2V4cHJlc3Npb25OYW1lfWA7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ0JsZW5kU2hhcGVDb250cm9sbGVyJztcbiAgICAvLyDooajnpLrnm67nmoTjga7jgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjga7jgafjgIHosqDojbfou73muJvjga7jgZ/jgoHjgasgdmlzaWJsZSDjgpIgZmFsc2Ug44Gr44GX44Gm44GK44GP44CCXG4gICAgLy8g44GT44KM44Gr44KI44KK44CB44GT44Gu44Kk44Oz44K544K/44Oz44K544Gr5a++44GZ44KL5q+O44OV44Os44O844Og44GuIG1hdHJpeCDoh6rli5XoqIjnrpfjgpLnnIHnlaXjgafjgY3jgovjgIJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRCaW5kKGFyZ3M6IHsgbWVzaGVzOiBHTFRGUHJpbWl0aXZlW107IG1vcnBoVGFyZ2V0SW5kZXg6IG51bWJlcjsgd2VpZ2h0OiBudW1iZXIgfSk6IHZvaWQge1xuICAgIC8vIG9yaWdpbmFsIHdlaWdodCBpcyAwLTEwMCBidXQgd2Ugd2FudCB0byBkZWFsIHdpdGggdGhpcyB2YWx1ZSB3aXRoaW4gMC0xXG4gICAgY29uc3Qgd2VpZ2h0ID0gYXJncy53ZWlnaHQgLyAxMDA7XG5cbiAgICB0aGlzLl9iaW5kcy5wdXNoKHtcbiAgICAgIG1lc2hlczogYXJncy5tZXNoZXMsXG4gICAgICBtb3JwaFRhcmdldEluZGV4OiBhcmdzLm1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICB3ZWlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTWF0ZXJpYWxWYWx1ZShhcmdzOiB7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcbiAgICBkZWZhdWx0VmFsdWU/OiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gYXJncy5tYXRlcmlhbDtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBhcmdzLnByb3BlcnR5TmFtZTtcblxuICAgIGxldCB2YWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV07XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgLy8gcHJvcGVydHkgaGFzIG5vdCBiZWVuIGZvdW5kXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlID0gYXJncy5kZWZhdWx0VmFsdWUgfHwgdmFsdWU7XG5cbiAgICBsZXQgdHlwZTogVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xuICAgIGxldCBkZWZhdWx0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICAgIGxldCB0YXJnZXRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gICAgbGV0IGRlbHRhVmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuXG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpLmlzVmVjdG9yMikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IyO1xuICAgICAgZGVmYXVsdFZhbHVlID0gKHZhbHVlIGFzIFRIUkVFLlZlY3RvcjIpLmNsb25lKCk7XG4gICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgYW55KS5pc1ZlY3RvcjMpIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMztcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5WZWN0b3IzKS5jbG9uZSgpO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNWZWN0b3I0KSB7XG4gICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjQ7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuVmVjdG9yNCkuY2xvbmUoKTtcblxuICAgICAgLy8gdmVjdG9yUHJvcGVydHkgYW5kIHRhcmdldFZhbHVlIGluZGV4IGlzIGRpZmZlcmVudCBmcm9tIGVhY2ggb3RoZXJcbiAgICAgIC8vIGV4cG9ydGVkIHZybSBieSBVbmlWUk0gZmlsZSBpc1xuICAgICAgLy9cbiAgICAgIC8vIHZlY3RvclByb3BlcnR5XG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVswXSwgdGFyZ2V0VmFsdWVbMV1cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzJdLCB0YXJnZXRWYWx1ZVszXVxuICAgICAgLy9cbiAgICAgIC8vIHRhcmdldFZhbHVlXG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVsyXSwgdGFyZ2V0VmFsdWVbM11cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsxXVxuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yNCgpLmZyb21BcnJheShbXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMl0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMF0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMV0sXG4gICAgICBdKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNDb2xvcikge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5DT0xPUjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5Db2xvcikuY2xvbmUoKTtcbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSO1xuICAgICAgZGVmYXVsdFZhbHVlID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBhcmdzLnRhcmdldFZhbHVlWzBdO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlIC0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLnB1c2goe1xuICAgICAgbWF0ZXJpYWwsXG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICB0YXJnZXRWYWx1ZSxcbiAgICAgIGRlbHRhVmFsdWUsXG4gICAgICB0eXBlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgdmlhIHtAbGluayBCbGVuZFNoYXBlTWFzdGVyI3VwZGF0ZX0uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgdyA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPCAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG5cbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSArPSB3ICogYmluZC53ZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSArPSBkZWx0YVZhbHVlICogdztcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIFRIUkVFLlZlY3RvcjI7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjIuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5WZWN0b3IzO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3YzLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuVmVjdG9yNDtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92NC5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHByZXZpb3VzbHkgYXNzaWduZWQgYmxlbmQgc2hhcGVzLlxuICAgKi9cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSA9IDAuMDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdO1xuICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5OVU1CRVIpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZSBhcyBUSFJFRS5WZWN0b3IyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuVmVjdG9yMztcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLlZlY3RvcjQ7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuQ29sb3I7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBHTFRGTWVzaCwgR0xURlByaW1pdGl2ZSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eSB9IGZyb20gJy4uL3V0aWxzL3JlbmFtZU1hdGVyaWFsUHJvcGVydHknO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUdyb3VwIH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlR3JvdXAnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlUHJveHknO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNQmxlbmRTaGFwZV1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUJsZW5kU2hhcGVJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUJsZW5kU2hhcGVdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNQmxlbmRTaGFwZVByb3h5IHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFCbGVuZFNoYXBlOiBWUk1TY2hlbWEuQmxlbmRTaGFwZSB8IHVuZGVmaW5lZCA9IHZybUV4dC5ibGVuZFNoYXBlTWFzdGVyO1xuICAgIGlmICghc2NoZW1hQmxlbmRTaGFwZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYmxlbmRTaGFwZSA9IG5ldyBWUk1CbGVuZFNoYXBlUHJveHkoKTtcblxuICAgIGNvbnN0IGJsZW5kU2hhcGVHcm91cHM6IFZSTVNjaGVtYS5CbGVuZFNoYXBlR3JvdXBbXSB8IHVuZGVmaW5lZCA9IHNjaGVtYUJsZW5kU2hhcGUuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIWJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBibGVuZFNoYXBlO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVQcmVzZXRNYXA6IHsgW3ByZXNldE5hbWUgaW4gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9ID0ge307XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGJsZW5kU2hhcGVHcm91cHMubWFwKGFzeW5jIChzY2hlbWFHcm91cCkgPT4ge1xuICAgICAgICBjb25zdCBuYW1lID0gc2NoZW1hR3JvdXAubmFtZTtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVlJNQmxlbmRTaGFwZUltcG9ydGVyOiBPbmUgb2YgYmxlbmRTaGFwZUdyb3VwcyBoYXMgbm8gbmFtZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcmVzZXROYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzY2hlbWFHcm91cC5wcmVzZXROYW1lICYmXG4gICAgICAgICAgc2NoZW1hR3JvdXAucHJlc2V0TmFtZSAhPT0gVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLlVua25vd24gJiZcbiAgICAgICAgICAhYmxlbmRTaGFwZVByZXNldE1hcFtzY2hlbWFHcm91cC5wcmVzZXROYW1lXVxuICAgICAgICApIHtcbiAgICAgICAgICBwcmVzZXROYW1lID0gc2NoZW1hR3JvdXAucHJlc2V0TmFtZTtcbiAgICAgICAgICBibGVuZFNoYXBlUHJlc2V0TWFwW3NjaGVtYUdyb3VwLnByZXNldE5hbWVdID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFZSTUJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICAgICAgZ2x0Zi5zY2VuZS5hZGQoZ3JvdXApO1xuXG4gICAgICAgIGdyb3VwLmlzQmluYXJ5ID0gc2NoZW1hR3JvdXAuaXNCaW5hcnkgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKHNjaGVtYUdyb3VwLmJpbmRzKSB7XG4gICAgICAgICAgc2NoZW1hR3JvdXAuYmluZHMuZm9yRWFjaChhc3luYyAoYmluZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJpbmQubWVzaCA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vcnBoTWVzaGVzOiBHTFRGTWVzaCA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ21lc2gnLCBiaW5kLm1lc2gpO1xuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlczogR0xURlByaW1pdGl2ZVtdID1cbiAgICAgICAgICAgICAgbW9ycGhNZXNoZXMudHlwZSA9PT0gJ0dyb3VwJ1xuICAgICAgICAgICAgICAgID8gKG1vcnBoTWVzaGVzLmNoaWxkcmVuIGFzIEFycmF5PEdMVEZQcmltaXRpdmU+KVxuICAgICAgICAgICAgICAgIDogW21vcnBoTWVzaGVzIGFzIEdMVEZQcmltaXRpdmVdO1xuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRJbmRleCA9IGJpbmQuaW5kZXg7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICFwcmltaXRpdmVzLmV2ZXJ5KFxuICAgICAgICAgICAgICAgIChwcmltaXRpdmUpID0+XG4gICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4IDwgcHJpbWl0aXZlLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5sZW5ndGgsXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTUJsZW5kU2hhcGVJbXBvcnRlcjogJHtzY2hlbWFHcm91cC5uYW1lfSBhdHRlbXB0cyB0byBpbmRleCAke21vcnBoVGFyZ2V0SW5kZXh9dGggbW9ycGggYnV0IG5vdCBmb3VuZC5gLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyb3VwLmFkZEJpbmQoe1xuICAgICAgICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgICAgICAgIG1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICAgICAgICAgIHdlaWdodDogYmluZC53ZWlnaHQgfHwgMTAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXRlcmlhbFZhbHVlcyA9IHNjaGVtYUdyb3VwLm1hdGVyaWFsVmFsdWVzO1xuICAgICAgICBpZiAobWF0ZXJpYWxWYWx1ZXMpIHtcbiAgICAgICAgICBtYXRlcmlhbFZhbHVlcy5mb3JFYWNoKChtYXRlcmlhbFZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsczogVEhSRUUuTWF0ZXJpYWxbXSA9IFtdO1xuICAgICAgICAgICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgIGlmICgob2JqZWN0IGFzIGFueSkubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWxbXSB8IFRIUkVFLk1hdGVyaWFsID0gKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsKSkge1xuICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIC4uLm1hdGVyaWFsLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAobXRsKSA9PiBtdGwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUhICYmIG1hdGVyaWFscy5pbmRleE9mKG10bCkgPT09IC0xLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsLm5hbWUgPT09IG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lICYmIG1hdGVyaWFscy5pbmRleE9mKG1hdGVyaWFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgZ3JvdXAuYWRkTWF0ZXJpYWxWYWx1ZSh7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiByZW5hbWVNYXRlcmlhbFByb3BlcnR5KG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lISksXG4gICAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxlbmRTaGFwZS5yZWdpc3RlckJsZW5kU2hhcGVHcm91cChuYW1lLCBwcmVzZXROYW1lLCBncm91cCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIGJsZW5kU2hhcGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNhdHVyYXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlR3JvdXAgfSBmcm9tICcuL1ZSTUJsZW5kU2hhcGVHcm91cCc7XG5cbmV4cG9ydCBjbGFzcyBWUk1CbGVuZFNoYXBlUHJveHkge1xuICAvKipcbiAgICogTGlzdCBvZiByZWdpc3RlcmVkIGJsZW5kIHNoYXBlLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IF9ibGVuZFNoYXBlR3JvdXBzOiB7IFtuYW1lOiBzdHJpbmddOiBWUk1CbGVuZFNoYXBlR3JvdXAgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBIG1hcCBmcm9tIFtbVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXV0gdG8gaXRzIGFjdHVhbCBibGVuZCBzaGFwZSBuYW1lLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfYmxlbmRTaGFwZVByZXNldE1hcDogeyBbcHJlc2V0TmFtZSBpbiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdPzogc3RyaW5nIH0gPSB7fTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUJsZW5kU2hhcGUuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbmFtZSBvZiByZWdpc3RlcmVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKi9cbiAgcHVibGljIGdldCBleHByZXNzaW9ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2JsZW5kU2hhcGVHcm91cHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiByZWdpc3RlcmVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIGdldEJsZW5kU2hhcGVHcm91cChuYW1lOiBzdHJpbmcgfCBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUpOiBWUk1CbGVuZFNoYXBlR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHByZXNldE5hbWUgPSB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwW25hbWUgYXMgVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lXTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gcHJlc2V0TmFtZSA/IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbcHJlc2V0TmFtZV0gOiB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xuICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgY29uc29sZS53YXJuKGBubyBibGVuZCBzaGFwZSBmb3VuZCBieSAke25hbWV9YCk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBnb3J1cFxuICAgKiBAcGFyYW0gY29udHJvbGxlciBWUk1CbGVuZFNoYXBlQ29udHJvbGxlciB0aGF0IGRlc2NyaWJlcyB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyByZWdpc3RlckJsZW5kU2hhcGVHcm91cChcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcHJlc2V0TmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgdW5kZWZpbmVkLFxuICAgIGNvbnRyb2xsZXI6IFZSTUJsZW5kU2hhcGVHcm91cCxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1tuYW1lXSA9IGNvbnRyb2xsZXI7XG4gICAgaWYgKHByZXNldE5hbWUpIHtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXBbcHJlc2V0TmFtZV0gPSBuYW1lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCB3ZWlnaHQgb2Ygc3BlY2lmaWVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIGdldFZhbHVlKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldEJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICByZXR1cm4gY29udHJvbGxlcj8ud2VpZ2h0ID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgd2VpZ2h0IHRvIHNwZWNpZmllZCBibGVuZCBzaGFwZSBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICogQHBhcmFtIHdlaWdodCBXZWlnaHRcbiAgICovXG4gIHB1YmxpYyBzZXRWYWx1ZShuYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCBzdHJpbmcsIHdlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xuICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICBjb250cm9sbGVyLndlaWdodCA9IHNhdHVyYXRlKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRyYWNrIG5hbWUgb2Ygc3BlY2lmaWVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKiBUaGlzIHRyYWNrIG5hbWUgaXMgbmVlZGVkIHRvIG1hbmlwdWxhdGUgaXRzIGJsZW5kIHNoYXBlIGdyb3VwIHZpYSBrZXlmcmFtZSBhbmltYXRpb25zLlxuICAgKlxuICAgKiBAZXhhbXBsZSBNYW5pcHVsYXRlIGEgYmxlbmQgc2hhcGUgZ3JvdXAgdXNpbmcga2V5ZnJhbWUgYW5pbWF0aW9uXG4gICAqIGBgYGpzXG4gICAqIGNvbnN0IHRyYWNrTmFtZSA9IHZybS5ibGVuZFNoYXBlUHJveHkuZ2V0QmxlbmRTaGFwZVRyYWNrTmFtZSggVEhSRUUuVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkJsaW5rICk7XG4gICAqIGNvbnN0IHRyYWNrID0gbmV3IFRIUkVFLk51bWJlcktleWZyYW1lVHJhY2soXG4gICAqICAgbmFtZSxcbiAgICogICBbIDAuMCwgMC41LCAxLjAgXSwgLy8gdGltZXNcbiAgICogICBbIDAuMCwgMS4wLCAwLjAgXSAvLyB2YWx1ZXNcbiAgICogKTtcbiAgICpcbiAgICogY29uc3QgY2xpcCA9IG5ldyBUSFJFRS5BbmltYXRpb25DbGlwKFxuICAgKiAgICdibGluaycsIC8vIG5hbWVcbiAgICogICAxLjAsIC8vIGR1cmF0aW9uXG4gICAqICAgWyB0cmFjayBdIC8vIHRyYWNrc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlciggdnJtLnNjZW5lICk7XG4gICAqIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oIGNsaXAgKTtcbiAgICogYWN0aW9uLnBsYXkoKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0QmxlbmRTaGFwZVRyYWNrTmFtZShuYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5nZXRCbGVuZFNoYXBlR3JvdXAobmFtZSk7XG4gICAgcmV0dXJuIGNvbnRyb2xsZXIgPyBgJHtjb250cm9sbGVyLm5hbWV9LndlaWdodGAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBibGVuZCBzaGFwZSBncm91cHMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX2JsZW5kU2hhcGVHcm91cHMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xuICAgICAgY29udHJvbGxlci5jbGVhckFwcGxpZWRXZWlnaHQoKTtcbiAgICB9KTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuX2JsZW5kU2hhcGVHcm91cHMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xuICAgICAgY29udHJvbGxlci5hcHBseVdlaWdodCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1ZSTUJsZW5kU2hhcGVHcm91cCc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUJsZW5kU2hhcGVJbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUJsZW5kU2hhcGVQcm94eSc7XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcic7XG5pbXBvcnQgeyBWUk0sIFZSTVBhcmFtZXRlcnMgfSBmcm9tICcuLi9WUk0nO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXJPcHRpb25zIH0gZnJvbSAnLi4vVlJNSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNRGVidWdPcHRpb25zIH0gZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXJEZWJ1ZyB9IGZyb20gJy4vVlJNSW1wb3J0ZXJEZWJ1Zyc7XG5cbmV4cG9ydCBjb25zdCBWUk1fR0laTU9fUkVOREVSX09SREVSID0gMTAwMDA7XG5cbi8qKlxuICogW1tWUk1dXSBidXQgaXQgaGFzIHNvbWUgdXNlZnVsIGdpem1vcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTURlYnVnIGV4dGVuZHMgVlJNIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1EZWJ1ZyBmcm9tIGEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlci5cbiAgICpcbiAgICogU2VlIFtbVlJNLmZyb21dXSBmb3IgYSBkZXRhaWxlZCBleGFtcGxlLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCBHTFRGIG9iamVjdCB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCBpbiBpbXBvcnRlclxuICAgKiBAcGFyYW0gZGVidWdPcHRpb24gT3B0aW9ucyBmb3IgVlJNRGVidWcgZmVhdHVyZXNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZnJvbShcbiAgICBnbHRmOiBHTFRGLFxuICAgIG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9LFxuICAgIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMgPSB7fSxcbiAgKTogUHJvbWlzZTxWUk0+IHtcbiAgICBjb25zdCBpbXBvcnRlciA9IG5ldyBWUk1JbXBvcnRlckRlYnVnKG9wdGlvbnMpO1xuICAgIHJldHVybiBhd2FpdCBpbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZGVidWdPcHRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1EZWJ1ZyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBbW1ZSTVBhcmFtZXRlcnNdXSB0aGF0IHJlcHJlc2VudHMgY29tcG9uZW50cyBvZiB0aGUgVlJNXG4gICAqIEBwYXJhbSBkZWJ1Z09wdGlvbiBPcHRpb25zIGZvciBWUk1EZWJ1ZyBmZWF0dXJlc1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBWUk1QYXJhbWV0ZXJzLCBkZWJ1Z09wdGlvbjogVlJNRGVidWdPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuXG4gICAgLy8gR2l6bW/jgpLlsZXplotcbiAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVCb3hIZWxwZXIpIHtcbiAgICAgIHRoaXMuc2NlbmUuYWRkKG5ldyBUSFJFRS5Cb3hIZWxwZXIodGhpcy5zY2VuZSkpO1xuICAgIH1cblxuICAgIGlmICghZGVidWdPcHRpb24uZGlzYWJsZVNrZWxldG9uSGVscGVyKSB7XG4gICAgICB0aGlzLnNjZW5lLmFkZChuZXcgVEhSRUUuU2tlbGV0b25IZWxwZXIodGhpcy5zY2VuZSkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZShkZWx0YSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUltcG9ydGVyLCBWUk1JbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuLi9WUk1JbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1EZWJ1ZyB9IGZyb20gJy4vVlJNRGVidWcnO1xuaW1wb3J0IHsgVlJNRGVidWdPcHRpb25zIH0gZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZERlYnVnIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkRGVidWcnO1xuaW1wb3J0IHsgVlJNTG9va0F0SW1wb3J0ZXJEZWJ1ZyB9IGZyb20gJy4vVlJNTG9va0F0SW1wb3J0ZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1EZWJ1Z11dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUltcG9ydGVyRGVidWcgZXh0ZW5kcyBWUk1JbXBvcnRlciB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgPSBvcHRpb25zLmxvb2tBdEltcG9ydGVyIHx8IG5ldyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnKCk7XG4gICAgb3B0aW9ucy5zcHJpbmdCb25lSW1wb3J0ZXIgPSBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciB8fCBuZXcgVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcoKTtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURiwgZGVidWdPcHRpb25zOiBWUk1EZWJ1Z09wdGlvbnMgPSB7fSk6IFByb21pc2U8VlJNRGVidWc+IHtcbiAgICBpZiAoZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zID09PSB1bmRlZmluZWQgfHwgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIFZSTSBleHRlbnNpb24gb24gdGhlIEdMVEYnKTtcbiAgICB9XG4gICAgY29uc3QgdnJtRXh0ID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTTtcblxuICAgIGNvbnN0IHNjZW5lID0gZ2x0Zi5zY2VuZTtcblxuICAgIHNjZW5lLnVwZGF0ZU1hdHJpeFdvcmxkKGZhbHNlKTtcblxuICAgIC8vIFNraW5uZWQgb2JqZWN0IHNob3VsZCBub3QgYmUgZnJ1c3R1bUN1bGxlZFxuICAgIC8vIFNpbmNlIHByZS1za2lubmVkIHBvc2l0aW9uIG1pZ2h0IGJlIG91dHNpZGUgb2Ygdmlld1xuICAgIHNjZW5lLnRyYXZlcnNlKChvYmplY3QzZCkgPT4ge1xuICAgICAgaWYgKChvYmplY3QzZCBhcyBhbnkpLmlzTWVzaCkge1xuICAgICAgICBvYmplY3QzZC5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXRlcmlhbHMgPSAoYXdhaXQgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaHVtYW5vaWQgPSAoYXdhaXQgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGZpcnN0UGVyc29uID0gaHVtYW5vaWQgPyAoYXdhaXQgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSAoYXdhaXQgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbG9va0F0ID1cbiAgICAgIGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZFxuICAgICAgICA/IChhd2FpdCB0aGlzLl9sb29rQXRJbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKChsb29rQXQgYXMgYW55KS5zZXR1cEhlbHBlcikge1xuICAgICAgKGxvb2tBdCBhcyBWUk1Mb29rQXRIZWFkRGVidWcpLnNldHVwSGVscGVyKHNjZW5lLCBkZWJ1Z09wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNwcmluZ0JvbmVNYW5hZ2VyID0gKGF3YWl0IHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcbiAgICBpZiAoKHNwcmluZ0JvbmVNYW5hZ2VyIGFzIGFueSkuc2V0dXBIZWxwZXIpIHtcbiAgICAgIChzcHJpbmdCb25lTWFuYWdlciBhcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKS5zZXR1cEhlbHBlcihzY2VuZSwgZGVidWdPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTURlYnVnKFxuICAgICAge1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgbWV0YTogdnJtRXh0Lm1ldGEsXG4gICAgICAgIG1hdGVyaWFscyxcbiAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgIGZpcnN0UGVyc29uLFxuICAgICAgICBibGVuZFNoYXBlUHJveHksXG4gICAgICAgIGxvb2tBdCxcbiAgICAgICAgc3ByaW5nQm9uZU1hbmFnZXIsXG4gICAgICB9LFxuICAgICAgZGVidWdPcHRpb25zLFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SGVhZCc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5cbmNvbnN0IF92MyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWFkRGVidWcgZXh0ZW5kcyBWUk1Mb29rQXRIZWFkIHtcbiAgcHJpdmF0ZSBfZmFjZURpcmVjdGlvbkhlbHBlcj86IFRIUkVFLkFycm93SGVscGVyO1xuXG4gIHB1YmxpYyBzZXR1cEhlbHBlcihzY2VuZTogVEhSRUUuT2JqZWN0M0QsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAoIWRlYnVnT3B0aW9uLmRpc2FibGVGYWNlRGlyZWN0aW9uSGVscGVyKSB7XG4gICAgICB0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyID0gbmV3IFRIUkVFLkFycm93SGVscGVyKFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLFxuICAgICAgICAwLjUsXG4gICAgICAgIDB4ZmYwMGZmLFxuICAgICAgKTtcbiAgICAgIHNjZW5lLmFkZCh0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuXG4gICAgaWYgKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuZmlyc3RQZXJzb24uZ2V0Rmlyc3RQZXJzb25Xb3JsZFBvc2l0aW9uKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIucG9zaXRpb24pO1xuICAgICAgdGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlci5zZXREaXJlY3Rpb24odGhpcy5nZXRMb29rQXRXb3JsZERpcmVjdGlvbihfdjMpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQvVlJNTG9va0F0SGVhZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlciB9IGZyb20gJy4uL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkRGVidWcgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWREZWJ1Zyc7XG5cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnIGV4dGVuZHMgVlJNTG9va0F0SW1wb3J0ZXIge1xuICBwdWJsaWMgaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0SGVhZCB8IG51bGwge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5ZXIgPSB0aGlzLl9pbXBvcnRBcHBseWVyKHNjaGVtYUZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKTtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWREZWJ1ZyhmaXJzdFBlcnNvbiwgYXBwbHllciB8fCB1bmRlZmluZWQpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi4vc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBWUk1fR0laTU9fUkVOREVSX09SREVSIH0gZnJvbSAnLi9WUk1EZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVEZWJ1ZyBleHRlbmRzIFZSTVNwcmluZ0JvbmUge1xuICBwcml2YXRlIF9naXptbz86IFRIUkVFLkFycm93SGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yKGJvbmU6IFRIUkVFLk9iamVjdDNELCBwYXJhbXM6IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzKSB7XG4gICAgc3VwZXIoYm9uZSwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gc3ByaW5nIGJvbmUgZ2l6bW8sIGFzIGBUSFJFRS5BcnJvd0hlbHBlcmAuXG4gICAqIFVzZWZ1bCBmb3IgZGVidWdnaW5nIHNwcmluZyBib25lcy5cbiAgICovXG4gIHB1YmxpYyBnZXRHaXptbygpOiBUSFJFRS5BcnJvd0hlbHBlciB7XG4gICAgLy8gcmV0dXJuIGlmIGdpem1vIGlzIGFscmVhZHkgZXhpc3RlZFxuICAgIGlmICh0aGlzLl9naXptbykge1xuICAgICAgcmV0dXJuIHRoaXMuX2dpem1vO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmUgPSBfdjNBLmNvcHkodGhpcy5fbmV4dFRhaWwpLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKTtcbiAgICBjb25zdCBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoID0gbmV4dFRhaWxSZWxhdGl2ZS5sZW5ndGgoKTtcblxuICAgIHRoaXMuX2dpem1vID0gbmV3IFRIUkVFLkFycm93SGVscGVyKFxuICAgICAgbmV4dFRhaWxSZWxhdGl2ZS5ub3JtYWxpemUoKSxcbiAgICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24sXG4gICAgICBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLFxuICAgICAgMHhmZmZmMDAsXG4gICAgICB0aGlzLnJhZGl1cyxcbiAgICAgIHRoaXMucmFkaXVzLFxuICAgICk7XG5cbiAgICAvLyBpdCBzaG91bGQgYmUgYWx3YXlzIHZpc2libGVcbiAgICB0aGlzLl9naXptby5saW5lLnJlbmRlck9yZGVyID0gVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcbiAgICB0aGlzLl9naXptby5jb25lLnJlbmRlck9yZGVyID0gVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcbiAgICAodGhpcy5fZ2l6bW8ubGluZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgKHRoaXMuX2dpem1vLmxpbmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICAodGhpcy5fZ2l6bW8uY29uZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkuZGVwdGhUZXN0ID0gZmFsc2U7XG4gICAgKHRoaXMuX2dpem1vLmNvbmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLnRyYW5zcGFyZW50ID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzLl9naXptbztcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZShkZWx0YSk7XG4gICAgLy8gbGFzdGx5IHdlJ3JlIGdvbm5hIHVwZGF0ZSBnaXptb1xuICAgIHRoaXMuX3VwZGF0ZUdpem1vKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVHaXptbygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2dpem1vKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZSA9IF92M0EuY29weSh0aGlzLl9jdXJyZW50VGFpbCkuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5fZ2l6bW8uc2V0RGlyZWN0aW9uKG5leHRUYWlsUmVsYXRpdmUubm9ybWFsaXplKCkpO1xuICAgIHRoaXMuX2dpem1vLnNldExlbmd0aChuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLCB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMpO1xuICAgIHRoaXMuX2dpem1vLnBvc2l0aW9uLmNvcHkodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlciB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZUltcG9ydGVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZURlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lRGVidWcnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgfSBmcm9tICcuLi9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzJztcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZUltcG9ydGVyIHtcbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHJldHVybiBudWxsO1xuXG4gICAgLy8g6KGd56qB5Yik5a6a55CD5L2T44Oh44OD44K344Ol44CCXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBhd2FpdCB0aGlzLl9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKTtcblxuICAgIC8vIOWQjOOBmOWxnuaAp++8iHN0aWZmaW5lc3PjgoRkcmFnRm9yY2XjgYzlkIzjgZjvvInjga7jg5zjg7zjg7Pjga9ib25lR3JvdXDjgavjgb7jgajjgoHjgonjgozjgabjgYTjgovjgIJcbiAgICAvLyDkuIDliJfjgaDjgZHjgafjga/jgarjgYTjgZPjgajjgavms6jmhI/jgIJcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBMaXN0ID0gYXdhaXQgdGhpcy5faW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdChnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24sIGNvbGxpZGVyR3JvdXBzKTtcblxuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyhjb2xsaWRlckdyb3Vwcywgc3ByaW5nQm9uZUdyb3VwTGlzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZVNwcmluZ0JvbmUoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMpOiBWUk1TcHJpbmdCb25lRGVidWcge1xuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZURlYnVnKGJvbmUsIHBhcmFtcyk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lRGVidWcgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1fR0laTU9fUkVOREVSX09SREVSIH0gZnJvbSAnLi9WUk1EZWJ1Zyc7XG5cbmNvbnN0IF9jb2xsaWRlckdpem1vTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICBjb2xvcjogMHhmZjAwZmYsXG4gIHdpcmVmcmFtZTogdHJ1ZSxcbiAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gIGRlcHRoVGVzdDogZmFsc2UsXG59KTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIHNwcmluZyBib25lIGdyb3VwIG9mIGEgVlJNLlxuICovXG5leHBvcnQgdHlwZSBWUk1TcHJpbmdCb25lR3JvdXBEZWJ1ZyA9IFZSTVNwcmluZ0JvbmVEZWJ1Z1tdO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyBleHRlbmRzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHVibGljIHNldHVwSGVscGVyKHNjZW5lOiBUSFJFRS5PYmplY3QzRCwgZGVidWdPcHRpb246IFZSTURlYnVnT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmIChkZWJ1Z09wdGlvbi5kaXNhYmxlU3ByaW5nQm9uZUhlbHBlcikgcmV0dXJuO1xuXG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goKHNwcmluZ0JvbmVHcm91cCkgPT4ge1xuICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgICAgaWYgKChzcHJpbmdCb25lIGFzIGFueSkuZ2V0R2l6bW8pIHtcbiAgICAgICAgICBjb25zdCBnaXptbyA9IChzcHJpbmdCb25lIGFzIFZSTVNwcmluZ0JvbmVEZWJ1ZykuZ2V0R2l6bW8oKTtcbiAgICAgICAgICBzY2VuZS5hZGQoZ2l6bW8pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgY29sbGlkZXIubWF0ZXJpYWwgPSBfY29sbGlkZXJHaXptb01hdGVyaWFsO1xuICAgICAgICBjb2xsaWRlci5yZW5kZXJPcmRlciA9IFZSTV9HSVpNT19SRU5ERVJfT1JERVI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1EZWJ1Z09wdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1EZWJ1Zyc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVEZWJ1Zyc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnJztcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZNZXNoLCBHTFRGTm9kZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcblxuY29uc3QgVkVDVE9SM19GUk9OVCA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIC0xLjApKTtcblxuY29uc3QgX3F1YXQgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG5lbnVtIEZpcnN0UGVyc29uRmxhZyB7XG4gIEF1dG8sXG4gIEJvdGgsXG4gIFRoaXJkUGVyc29uT25seSxcbiAgRmlyc3RQZXJzb25Pbmx5LFxufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBbYG1lc2hBbm5vdGF0aW9uYF0oaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL1VuaVZSTS9ibG9iL21hc3Rlci9zcGVjaWZpY2F0aW9uLzAuMC9zY2hlbWEvdnJtLmZpcnN0cGVyc29uLm1lc2hhbm5vdGF0aW9uLnNjaGVtYS5qc29uKSBlbnRyeS5cbiAqIEVhY2ggbWVzaCB3aWxsIGJlIGFzc2lnbmVkIHRvIHNwZWNpZmllZCBsYXllciB3aGVuIHlvdSBjYWxsIFtbVlJNRmlyc3RQZXJzb24uc2V0dXBdXS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyB7XG4gIHByaXZhdGUgc3RhdGljIF9wYXJzZUZpcnN0UGVyc29uRmxhZyhmaXJzdFBlcnNvbkZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCk6IEZpcnN0UGVyc29uRmxhZyB7XG4gICAgc3dpdGNoIChmaXJzdFBlcnNvbkZsYWcpIHtcbiAgICAgIGNhc2UgJ0JvdGgnOlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkJvdGg7XG4gICAgICBjYXNlICdUaGlyZFBlcnNvbk9ubHknOlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLlRoaXJkUGVyc29uT25seTtcbiAgICAgIGNhc2UgJ0ZpcnN0UGVyc29uT25seSc6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuRmlyc3RQZXJzb25Pbmx5O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5BdXRvO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIFtbRmlyc3RQZXJzb25GbGFnXV0gb2YgdGhlIGFubm90YXRpb24gZW50cnkuXG4gICAqL1xuICBwdWJsaWMgZmlyc3RQZXJzb25GbGFnOiBGaXJzdFBlcnNvbkZsYWc7XG5cbiAgLyoqXG4gICAqIEEgbWVzaCBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIHB1YmxpYyBtZXNoOiBHTFRGTWVzaDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG1lc2ggYW5ub3RhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uRmxhZyBBIFtbRmlyc3RQZXJzb25GbGFnXV0gb2YgdGhlIGFubm90YXRpb24gZW50cnlcbiAgICogQHBhcmFtIG5vZGUgQSBub2RlIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoZmlyc3RQZXJzb25GbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQsIG1lc2g6IEdMVEZNZXNoKSB7XG4gICAgdGhpcy5maXJzdFBlcnNvbkZsYWcgPSBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MuX3BhcnNlRmlyc3RQZXJzb25GbGFnKGZpcnN0UGVyc29uRmxhZyk7XG4gICAgdGhpcy5tZXNoID0gbWVzaDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb24ge1xuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRGaXJzdFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSID0gOTtcblxuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRUaGlyZFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9USElSRFBFUlNPTl9PTkxZX0xBWUVSID0gMTA7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfZmlyc3RQZXJzb25Cb25lOiBHTFRGTm9kZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfbWVzaEFubm90YXRpb25zOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IF9maXJzdFBlcnNvbkJvbmVPZmZzZXQ6IFRIUkVFLlZlY3RvcjM7XG5cbiAgcHJpdmF0ZSBfZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSO1xuICBwcml2YXRlIF90aGlyZFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVI7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUZpcnN0UGVyc29uIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uQm9uZSBBIGZpcnN0IHBlcnNvbiBib25lXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvbkJvbmVPZmZzZXQgQW4gb2Zmc2V0IGZyb20gdGhlIHNwZWNpZmllZCBmaXJzdCBwZXJzb24gYm9uZVxuICAgKiBAcGFyYW0gbWVzaEFubm90YXRpb25zIEEgcmVuZGVyZXIgc2V0dGluZ3MuIFNlZSB0aGUgZGVzY3JpcHRpb24gb2YgW1tSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NdXSBmb3IgbW9yZSBpbmZvXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBmaXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlLFxuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldDogVEhSRUUuVmVjdG9yMyxcbiAgICBtZXNoQW5ub3RhdGlvbnM6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdLFxuICApIHtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkJvbmUgPSBmaXJzdFBlcnNvbkJvbmU7XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0ID0gZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xuICAgIHRoaXMuX21lc2hBbm5vdGF0aW9ucyA9IG1lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZmlyc3RQZXJzb25Cb25lKCk6IEdMVEZOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RQZXJzb25Cb25lO1xuICB9XG5cbiAgcHVibGljIGdldCBtZXNoQW5ub3RhdGlvbnMoKTogVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzW10ge1xuICAgIHJldHVybiB0aGlzLl9tZXNoQW5ub3RhdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25Xb3JsZERpcmVjdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkoVkVDVE9SM19GUk9OVCkuYXBwbHlRdWF0ZXJuaW9uKGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5fZmlyc3RQZXJzb25Cb25lLCBfcXVhdCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY2FtZXJhIGxheWVyIHJlcHJlc2VudHMgYEZpcnN0UGVyc29uT25seWAgbGF5ZXIuXG4gICAqIE5vdGUgdGhhdCAqKnlvdSBtdXN0IGNhbGwgW1tzZXR1cF1dIGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlKiogb3IgaXQgZG9lcyBub3Qgd29yayBwcm9wZXJseS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGlzIFtbREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSXV0gYnkgZGVmYXVsdCBidXQgeW91IGNhbiBjaGFuZ2UgdGhlIGxheWVyIGJ5IHNwZWNpZnlpbmcgdmlhIFtbc2V0dXBdXSBpZiB5b3UgcHJlZmVyLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vdnJtLmRldi9lbi91bml2cm0vYXBpL3VuaXZybV91c2VfZmlyc3RwZXJzb24vXG4gICAqIEBzZWUgaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vY29yZS9MYXllcnNcbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCBbW3NldHVwXV0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMgW1tERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVJdXSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEgW1tzZXR1cF1dIGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCB0aGlyZFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbkJvbmVPZmZzZXQodGFyZ2V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgcmV0dXJuIHRhcmdldC5jb3B5KHRoaXMuX2ZpcnN0UGVyc29uQm9uZU9mZnNldCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGN1cnJlbnQgd29ybGQgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHBlcnNvbi5cbiAgICogVGhlIHBvc2l0aW9uIHRha2VzIFtbRmlyc3RQZXJzb25Cb25lXV0gYW5kIFtbRmlyc3RQZXJzb25PZmZzZXRdXSBpbnRvIGFjY291bnQuXG4gICAqXG4gICAqIEBwYXJhbSB2MyB0YXJnZXRcbiAgICogQHJldHVybnMgQ3VycmVudCB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcGVyc29uXG4gICAqL1xuICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25Xb3JsZFBvc2l0aW9uKHYzOiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gICAgLy8gVW5pVlJNI1ZSTUZpcnN0UGVyc29uRWRpdG9yXG4gICAgLy8gdmFyIHdvcmxkT2Zmc2V0ID0gaGVhZC5sb2NhbFRvV29ybGRNYXRyaXguTXVsdGlwbHlQb2ludChjb21wb25lbnQuRmlyc3RQZXJzb25PZmZzZXQpO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2ZpcnN0UGVyc29uQm9uZU9mZnNldDtcbiAgICBjb25zdCB2NCA9IG5ldyBUSFJFRS5WZWN0b3I0KG9mZnNldC54LCBvZmZzZXQueSwgb2Zmc2V0LnosIDEuMCk7XG4gICAgdjQuYXBwbHlNYXRyaXg0KHRoaXMuX2ZpcnN0UGVyc29uQm9uZS5tYXRyaXhXb3JsZCk7XG4gICAgcmV0dXJuIHYzLnNldCh2NC54LCB2NC55LCB2NC56KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbiB0aGlzIG1ldGhvZCwgaXQgYXNzaWducyBsYXllcnMgZm9yIGV2ZXJ5IG1lc2hlcyBiYXNlZCBvbiBtZXNoIGFubm90YXRpb25zLlxuICAgKiBZb3UgbXVzdCBjYWxsIHRoaXMgbWV0aG9kIGZpcnN0IGJlZm9yZSB5b3UgdXNlIHRoZSBsYXllciBmZWF0dXJlLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIGVxdWl2YWxlbnQgb2YgW1ZSTUZpcnN0UGVyc29uLlNldHVwXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvRmlyc3RQZXJzb24vVlJNRmlyc3RQZXJzb24uY3MpIG9mIHRoZSBVbmlWUk0uXG4gICAqXG4gICAqIFRoZSBgY2FtZXJhTGF5ZXJgIHBhcmFtZXRlciBzcGVjaWZpZXMgd2hpY2ggbGF5ZXIgd2lsbCBiZSBhc3NpZ25lZCBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICogSW4gVW5pVlJNLCB3ZSBzcGVjaWZpZWQgdGhvc2UgYnkgbmFtaW5nIGVhY2ggZGVzaXJlZCBsYXllciBhcyBgRklSU1RQRVJTT05fT05MWV9MQVlFUmAgLyBgVEhJUkRQRVJTT05fT05MWV9MQVlFUmBcbiAgICogYnV0IHdlIGFyZSBnb2luZyB0byBzcGVjaWZ5IHRoZXNlIGxheWVycyBhdCBoZXJlIHNpbmNlIHdlIGFyZSB1bmFibGUgdG8gbmFtZSBsYXllcnMgaW4gVGhyZWUuanMuXG4gICAqXG4gICAqIEBwYXJhbSBjYW1lcmFMYXllciBTcGVjaWZ5IHdoaWNoIGxheWVyIHdpbGwgYmUgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIC8gYFRoaXJkUGVyc29uT25seWAuXG4gICAqL1xuICBwdWJsaWMgc2V0dXAoe1xuICAgIGZpcnN0UGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUixcbiAgICB0aGlyZFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIsXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBmaXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgICB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllciA9IHRoaXJkUGVyc29uT25seUxheWVyO1xuXG4gICAgdGhpcy5fbWVzaEFubm90YXRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLkZpcnN0UGVyc29uT25seSkge1xuICAgICAgICBpdGVtLm1lc2gubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIGl0ZW0ubWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5UaGlyZFBlcnNvbk9ubHkpIHtcbiAgICAgICAgaXRlbS5tZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBpdGVtLm1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuQXV0bykge1xuICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsKGl0ZW0ubWVzaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leGNsdWRlVHJpYW5nbGVzKHRyaWFuZ2xlczogbnVtYmVyW10sIGJ3czogbnVtYmVyW11bXSwgc2tpbkluZGV4OiBudW1iZXJbXVtdLCBleGNsdWRlOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoYndzICE9IG51bGwgJiYgYndzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIGNvbnN0IGEgPSB0cmlhbmdsZXNbaV07XG4gICAgICAgIGNvbnN0IGIgPSB0cmlhbmdsZXNbaSArIDFdO1xuICAgICAgICBjb25zdCBjID0gdHJpYW5nbGVzW2kgKyAyXTtcbiAgICAgICAgY29uc3QgYncwID0gYndzW2FdO1xuICAgICAgICBjb25zdCBza2luMCA9IHNraW5JbmRleFthXTtcblxuICAgICAgICBpZiAoYncwWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncxID0gYndzW2JdO1xuICAgICAgICBjb25zdCBza2luMSA9IHNraW5JbmRleFtiXTtcbiAgICAgICAgaWYgKGJ3MVswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MiA9IGJ3c1tjXTtcbiAgICAgICAgY29uc3Qgc2tpbjIgPSBza2luSW5kZXhbY107XG4gICAgICAgIGlmIChidzJbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbM10pKSBjb250aW51ZTtcblxuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBhO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBiO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFcmFzZWRNZXNoKHNyYzogVEhSRUUuU2tpbm5lZE1lc2gsIGVyYXNpbmdCb25lc0luZGV4OiBudW1iZXJbXSk6IFRIUkVFLlNraW5uZWRNZXNoIHtcbiAgICBjb25zdCBkc3QgPSBuZXcgVEhSRUUuU2tpbm5lZE1lc2goc3JjLmdlb21ldHJ5LmNsb25lKCksIHNyYy5tYXRlcmlhbCk7XG4gICAgZHN0Lm5hbWUgPSBgJHtzcmMubmFtZX0oZXJhc2UpYDtcbiAgICBkc3QuZnJ1c3R1bUN1bGxlZCA9IHNyYy5mcnVzdHVtQ3VsbGVkO1xuICAgIGRzdC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcblxuICAgIGNvbnN0IGdlb21ldHJ5ID0gZHN0Lmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuXG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4JykuYXJyYXk7XG4gICAgY29uc3Qgc2tpbkluZGV4ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luSW5kZXgucHVzaChbc2tpbkluZGV4QXR0cltpXSwgc2tpbkluZGV4QXR0cltpICsgMV0sIHNraW5JbmRleEF0dHJbaSArIDJdLCBza2luSW5kZXhBdHRyW2kgKyAzXV0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNraW5XZWlnaHRBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luV2VpZ2h0JykuYXJyYXk7XG4gICAgY29uc3Qgc2tpbldlaWdodCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbldlaWdodEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5XZWlnaHQucHVzaChbc2tpbldlaWdodEF0dHJbaV0sIHNraW5XZWlnaHRBdHRyW2kgKyAxXSwgc2tpbldlaWdodEF0dHJbaSArIDJdLCBza2luV2VpZ2h0QXR0cltpICsgM11dKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGdlb21ldHJ5LmdldEluZGV4KCk7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGdlb21ldHJ5IGRvZXNuJ3QgaGF2ZSBhbiBpbmRleCBidWZmZXJcIik7XG4gICAgfVxuICAgIGNvbnN0IG9sZFRyaWFuZ2xlcyA9IEFycmF5LmZyb20oaW5kZXguYXJyYXkpO1xuXG4gICAgY29uc3QgY291bnQgPSB0aGlzLl9leGNsdWRlVHJpYW5nbGVzKG9sZFRyaWFuZ2xlcywgc2tpbldlaWdodCwgc2tpbkluZGV4LCBlcmFzaW5nQm9uZXNJbmRleCk7XG4gICAgY29uc3QgbmV3VHJpYW5nbGU6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBuZXdUcmlhbmdsZVtpXSA9IG9sZFRyaWFuZ2xlc1tpXTtcbiAgICB9XG4gICAgZ2VvbWV0cnkuc2V0SW5kZXgobmV3VHJpYW5nbGUpO1xuXG4gICAgLy8gbXRvb24gbWF0ZXJpYWwgaW5jbHVkZXMgb25CZWZvcmVSZW5kZXIuIHRoaXMgaXMgdW5zdXBwb3J0ZWQgYXQgU2tpbm5lZE1lc2gjY2xvbmVcbiAgICBpZiAoc3JjLm9uQmVmb3JlUmVuZGVyKSB7XG4gICAgICBkc3Qub25CZWZvcmVSZW5kZXIgPSBzcmMub25CZWZvcmVSZW5kZXI7XG4gICAgfVxuICAgIGRzdC5iaW5kKG5ldyBUSFJFRS5Ta2VsZXRvbihzcmMuc2tlbGV0b24uYm9uZXMsIHNyYy5za2VsZXRvbi5ib25lSW52ZXJzZXMpLCBuZXcgVEhSRUUuTWF0cml4NCgpKTtcbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKHBhcmVudDogVEhSRUUuT2JqZWN0M0QsIG1lc2g6IFRIUkVFLlNraW5uZWRNZXNoKTogdm9pZCB7XG4gICAgY29uc3QgZXJhc2VCb25lSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICBtZXNoLnNrZWxldG9uLmJvbmVzLmZvckVhY2goKGJvbmUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChib25lKSkgZXJhc2VCb25lSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8vIFVubGlrZSBVbmlWUk0gd2UgZG9uJ3QgY29weSBtZXNoIGlmIG5vIGludmlzaWJsZSBib25lIHdhcyBmb3VuZFxuICAgIGlmICghZXJhc2VCb25lSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgIGNvbnN0IG5ld01lc2ggPSB0aGlzLl9jcmVhdGVFcmFzZWRNZXNoKG1lc2gsIGVyYXNlQm9uZUluZGV4ZXMpO1xuICAgIHBhcmVudC5hZGQobmV3TWVzaCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsKG5vZGU6IEdMVEZOb2RlKTogdm9pZCB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0dyb3VwJykge1xuICAgICAgbm9kZS5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgcGFyZW50Lm5hbWUgPSBgX2hlYWRsZXNzXyR7bm9kZS5uYW1lfWA7XG4gICAgICAgIHBhcmVudC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS5wYXJlbnQhLmFkZChwYXJlbnQpO1xuICAgICAgICBub2RlLmNoaWxkcmVuXG4gICAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50LCBjaGlsZCBhcyBUSFJFRS5Ta2lubmVkTWVzaCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChub2RlLnBhcmVudCEsIG5vZGUgYXMgVEhSRUUuU2tpbm5lZE1lc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNFcmFzZVRhcmdldChub2RlKSkge1xuICAgICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzRXJhc2VUYXJnZXQoYm9uZTogR0xURk5vZGUpOiBib29sZWFuIHtcbiAgICBpZiAoYm9uZS5uYW1lID09PSB0aGlzLl9maXJzdFBlcnNvbkJvbmUubmFtZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghYm9uZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzRXJhc2VUYXJnZXQoYm9uZS5wYXJlbnQhKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgR0xURk1lc2gsIEdMVEZOb2RlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiwgVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzIH0gZnJvbSAnLi9WUk1GaXJzdFBlcnNvbic7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1GaXJzdFBlcnNvbl1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1GaXJzdFBlcnNvbl1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSBbW1ZSTUh1bWFub2lkXV0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURiwgaHVtYW5vaWQ6IFZSTUh1bWFub2lkKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hRmlyc3RQZXJzb246IFZSTVNjaGVtYS5GaXJzdFBlcnNvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5maXJzdFBlcnNvbjtcbiAgICBpZiAoIXNjaGVtYUZpcnN0UGVyc29uKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBlcnNvbkJvbmVJbmRleCA9IHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZTtcblxuICAgIGxldCBmaXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlIHwgbnVsbDtcbiAgICBpZiAoZmlyc3RQZXJzb25Cb25lSW5kZXggPT09IHVuZGVmaW5lZCB8fCBmaXJzdFBlcnNvbkJvbmVJbmRleCA9PT0gLTEpIHtcbiAgICAgIGZpcnN0UGVyc29uQm9uZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lLkhlYWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBlcnNvbkJvbmUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgZmlyc3RQZXJzb25Cb25lSW5kZXgpO1xuICAgIH1cblxuICAgIGlmICghZmlyc3RQZXJzb25Cb25lKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1ZSTUZpcnN0UGVyc29uSW1wb3J0ZXI6IENvdWxkIG5vdCBmaW5kIGZpcnN0UGVyc29uQm9uZSBvZiB0aGUgVlJNJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQgPSBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXRcbiAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LngsXG4gICAgICAgICAgc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnksXG4gICAgICAgICAgLXNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldC56ISwgLy8gVlJNIDAuMCB1c2VzIGxlZnQtaGFuZGVkIHktdXBcbiAgICAgICAgKVxuICAgICAgOiBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMDYsIDAuMCk7IC8vIGZhbGxiYWNrLCB0YWtlbiBmcm9tIFVuaVZSTSBpbXBsZW1lbnRhdGlvblxuXG4gICAgY29uc3QgbWVzaEFubm90YXRpb25zOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSA9IFtdO1xuICAgIGNvbnN0IG1lc2hlczogR0xURk1lc2hbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbWVzaCcpO1xuICAgIG1lc2hlcy5mb3JFYWNoKChtZXNoLCBtZXNoSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZsYWcgPSBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnNcbiAgICAgICAgPyBzY2hlbWFGaXJzdFBlcnNvbi5tZXNoQW5ub3RhdGlvbnMuZmluZCgoYSkgPT4gYS5tZXNoID09PSBtZXNoSW5kZXgpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgbWVzaEFubm90YXRpb25zLnB1c2gobmV3IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncyhmbGFnPy5maXJzdFBlcnNvbkZsYWcsIG1lc2gpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oZmlyc3RQZXJzb25Cb25lLCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vVlJNRmlyc3RQZXJzb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1GaXJzdFBlcnNvbkltcG9ydGVyJztcbiIsImltcG9ydCB7IEdMVEZOb2RlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5MaW1pdCB9IGZyb20gJy4vVlJNSHVtYW5MaW1pdCc7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIGBodW1hbkJvbmVgIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5Cb25lIHtcbiAgLyoqXG4gICAqIEEgW1tHTFRGTm9kZV1dICh0aGF0IGFjdHVhbGx5IGlzIGEgYFRIUkVFLk9iamVjdDNEYCkgdGhhdCByZXByZXNlbnRzIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG5vZGU6IEdMVEZOb2RlO1xuXG4gIC8qKlxuICAgKiBBIFtbVlJNSHVtYW5MaW1pdF1dIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBodW1hbkxpbWl0OiBWUk1IdW1hbkxpbWl0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNSHVtYW5Cb25lLlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZSBBIFtbR0xURk5vZGVdXSB0aGF0IHJlcHJlc2VudHMgdGhlIG5ldyBib25lXG4gICAqIEBwYXJhbSBodW1hbkxpbWl0IEEgW1tWUk1IdW1hbkxpbWl0XV0gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBwcm9wZXJ0aWVzIG9mIHRoZSBuZXcgYm9uZVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKG5vZGU6IEdMVEZOb2RlLCBodW1hbkxpbWl0OiBWUk1IdW1hbkxpbWl0KSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICB0aGlzLmh1bWFuTGltaXQgPSBodW1hbkxpbWl0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTFRGTm9kZSwgUmF3VmVjdG9yMywgUmF3VmVjdG9yNCwgVlJNUG9zZSwgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lQXJyYXkgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUFycmF5JztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5EZXNjcmlwdGlvbiB9IGZyb20gJy4vVlJNSHVtYW5EZXNjcmlwdGlvbic7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGh1bWFub2lkIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWQge1xuICAvKipcbiAgICogQSBbW1ZSTUh1bWFuQm9uZXNdXSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaHVtYW4gYm9uZXMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gZ2V0IHRoZXNlIGJvbmVzIHVzaW5nIFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZV1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXM7XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1IdW1hbkRlc2NyaXB0aW9uXV0gdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIGh1bWFub2lkLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFuRGVzY3JpcHRpb246IFZSTUh1bWFuRGVzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1Qb3NlXV0gdGhhdCBpcyBpdHMgZGVmYXVsdCBzdGF0ZS5cbiAgICogWW91IG1pZ2h0IHVzZSBbW1ZSTUh1bWFub2lkLnNldFBvc2VdXSB3aXRoIHRoaXMgcG9zZSB0byByZXNldCBpdHMgc3RhdGUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgcmVzdFBvc2U6IFZSTVBvc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBbW1ZSTUh1bWFub2lkXV0uXG4gICAqIEBwYXJhbSBib25lQXJyYXkgQSBbW1ZSTUh1bWFuQm9uZUFycmF5XV0gY29udGFpbnMgYWxsIHRoZSBib25lcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqIEBwYXJhbSBodW1hbkRlc2NyaXB0aW9uIEEgW1tWUk1IdW1hbkRlc2NyaXB0aW9uXV0gdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIG5ldyBodW1hbm9pZFxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGJvbmVBcnJheTogVlJNSHVtYW5Cb25lQXJyYXksIGh1bWFuRGVzY3JpcHRpb246IFZSTUh1bWFuRGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmh1bWFuQm9uZXMgPSB0aGlzLl9jcmVhdGVIdW1hbkJvbmVzKGJvbmVBcnJheSk7XG4gICAgdGhpcy5odW1hbkRlc2NyaXB0aW9uID0gaHVtYW5EZXNjcmlwdGlvbjtcblxuICAgIHRoaXMucmVzdFBvc2UgPSB0aGlzLmdldFBvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgcG9zZSBvZiB0aGlzIGh1bWFub2lkIGFzIGEgW1tWUk1Qb3NlXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0UG9zZSgpOiBWUk1Qb3NlIHtcbiAgICBjb25zdCBwb3NlOiBWUk1Qb3NlID0ge307XG4gICAgT2JqZWN0LmtleXModGhpcy5odW1hbkJvbmVzKS5mb3JFYWNoKCh2cm1Cb25lTmFtZSkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUodnJtQm9uZU5hbWUgYXMgVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpITtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHRoZXJlIGFyZSB0d28gb3IgbW9yZSBib25lcyBpbiBhIHNhbWUgbmFtZSwgd2UgYXJlIG5vdCBnb2luZyB0byBvdmVyd3JpdGUgZXhpc3Rpbmcgb25lXG4gICAgICBpZiAocG9zZVt2cm1Cb25lTmFtZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwb3NlW3ZybUJvbmVOYW1lXSA9IHtcbiAgICAgICAgcG9zaXRpb246IG5vZGUucG9zaXRpb24udG9BcnJheSgpIGFzIFJhd1ZlY3RvcjMsXG4gICAgICAgIHJvdGF0aW9uOiBub2RlLnF1YXRlcm5pb24udG9BcnJheSgpIGFzIFJhd1ZlY3RvcjQsXG4gICAgICB9O1xuICAgIH0sIHt9IGFzIFZSTVBvc2UpO1xuICAgIHJldHVybiBwb3NlO1xuICB9XG5cbiAgLyoqXG4gICAqIExldCB0aGUgaHVtYW5vaWQgZG8gYSBzcGVjaWZpZWQgcG9zZS5cbiAgICpcbiAgICogQHBhcmFtIHBvc2VPYmplY3QgQSBbW1ZSTVBvc2VdXSB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHBvc2VPYmplY3QpLmZvckVhY2goKGJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHBvc2VPYmplY3RbYm9uZU5hbWVdITtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldEJvbmVOb2RlKGJvbmVOYW1lIGFzIFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTtcblxuICAgICAgLy8gSWdub3JlIHdoZW4gdGhlcmUgYXJlIG5vIGJvbmUgdGhhdCBpcyBkZWZpbmVkIGluIHRoZSBwb3NlIG9uIHRoZSBWUk1IdW1hbm9pZFxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdFN0YXRlID0gdGhpcy5yZXN0UG9zZVtib25lTmFtZV07XG4gICAgICBpZiAoIXJlc3RTdGF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5wb3NpdGlvbikge1xuICAgICAgICAvLyDlhYPjga7nirbmhYvjgavmiLvjgZfjgabjgYvjgonjgIHnp7vli5XliIbjgpLov73liqBcbiAgICAgICAgbm9kZS5wb3NpdGlvbi5zZXQoXG4gICAgICAgICAgcmVzdFN0YXRlLnBvc2l0aW9uIVswXSArIHN0YXRlLnBvc2l0aW9uWzBdLFxuICAgICAgICAgIHJlc3RTdGF0ZS5wb3NpdGlvbiFbMV0gKyBzdGF0ZS5wb3NpdGlvblsxXSxcbiAgICAgICAgICByZXN0U3RhdGUucG9zaXRpb24hWzJdICsgc3RhdGUucG9zaXRpb25bMl0sXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgbm9kZS5xdWF0ZXJuaW9uLmZyb21BcnJheShzdGF0ZS5yb3RhdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCBbW0h1bWFuQm9uZV1dLCBhcyBhIFtbVlJNSHVtYW5Cb25lXV0uXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVzXV1cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmUobmFtZTogVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV1bMF0gfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBib25lcyBib3VuZCB0byBhIHNwZWNpZmllZCBbW0h1bWFuQm9uZV1dLCBhcyBhbiBhcnJheSBvZiBbW1ZSTUh1bWFuQm9uZV1dLlxuICAgKlxuICAgKiBTZWUgYWxzbzogW1tWUk1IdW1hbm9pZC5nZXRCb25lXV1cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVzKG5hbWU6IFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTogVlJNSHVtYW5Cb25lW10ge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgYm9uZSBib3VuZCB0byBhIHNwZWNpZmllZCBbW0h1bWFuQm9uZV1dLCBhcyBhIFRIUkVFLk9iamVjdDNELlxuICAgKlxuICAgKiBTZWUgYWxzbzogW1tWUk1IdW1hbm9pZC5nZXRCb25lTm9kZXNdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGUobmFtZTogVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpOiBHTFRGTm9kZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV1bMF0/Lm5vZGUgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYm9uZXMgYm91bmQgdG8gYSBzcGVjaWZpZWQgW1tIdW1hbkJvbmVdXSwgYXMgYW4gYXJyYXkgb2YgVEhSRUUuT2JqZWN0M0QuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVOb2RlXV1cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYm9uZSB5b3Ugd2FudFxuICAgKi9cbiAgcHVibGljIGdldEJvbmVOb2RlcyhuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IEdMVEZOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmh1bWFuQm9uZXNbbmFtZV0ubWFwKChib25lKSA9PiBib25lLm5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgYSBbW1ZSTUh1bWFuQm9uZXNdXSBmcm9tIGEgW1tWUk1IdW1hbkJvbmVBcnJheV1dLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSHVtYW5Cb25lcyhib25lQXJyYXk6IFZSTUh1bWFuQm9uZUFycmF5KTogVlJNSHVtYW5Cb25lcyB7XG4gICAgY29uc3QgYm9uZXM6IFZSTUh1bWFuQm9uZXMgPSBPYmplY3QudmFsdWVzKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKS5yZWR1Y2UoKGFjY3VtLCBuYW1lKSA9PiB7XG4gICAgICBhY2N1bVtuYW1lXSA9IFtdO1xuICAgICAgcmV0dXJuIGFjY3VtO1xuICAgIH0sIHt9IGFzIFBhcnRpYWw8VlJNSHVtYW5Cb25lcz4pIGFzIFZSTUh1bWFuQm9uZXM7XG5cbiAgICBib25lQXJyYXkuZm9yRWFjaCgoYm9uZSkgPT4ge1xuICAgICAgYm9uZXNbYm9uZS5uYW1lXS5wdXNoKGJvbmUuYm9uZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYm9uZXM7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZUFycmF5IH0gZnJvbSAnLi9WUk1IdW1hbkJvbmVBcnJheSc7XG5pbXBvcnQgeyBWUk1IdW1hbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi9WUk1IdW1hbkRlc2NyaXB0aW9uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi9WUk1IdW1hbm9pZCc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEgW1tWUk1IdW1hbm9pZF1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUh1bWFub2lkSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1IdW1hbm9pZF1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1IdW1hbm9pZCB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hSHVtYW5vaWQ6IFZSTVNjaGVtYS5IdW1hbm9pZCB8IHVuZGVmaW5lZCA9IHZybUV4dC5odW1hbm9pZDtcbiAgICBpZiAoIXNjaGVtYUh1bWFub2lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbkJvbmVBcnJheTogVlJNSHVtYW5Cb25lQXJyYXkgPSBbXTtcbiAgICBpZiAoc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcykge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHNjaGVtYUh1bWFub2lkLmh1bWFuQm9uZXMubWFwKGFzeW5jIChib25lKSA9PiB7XG4gICAgICAgICAgaWYgKCFib25lLmJvbmUgfHwgIWJvbmUubm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgYm9uZS5ub2RlKTtcbiAgICAgICAgICBodW1hbkJvbmVBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGJvbmUuYm9uZSxcbiAgICAgICAgICAgIGJvbmU6IG5ldyBWUk1IdW1hbkJvbmUobm9kZSwge1xuICAgICAgICAgICAgICBheGlzTGVuZ3RoOiBib25lLmF4aXNMZW5ndGgsXG4gICAgICAgICAgICAgIGNlbnRlcjogYm9uZS5jZW50ZXIgJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5jZW50ZXIueCwgYm9uZS5jZW50ZXIueSwgYm9uZS5jZW50ZXIueiksXG4gICAgICAgICAgICAgIG1heDogYm9uZS5tYXggJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5tYXgueCwgYm9uZS5tYXgueSwgYm9uZS5tYXgueiksXG4gICAgICAgICAgICAgIG1pbjogYm9uZS5taW4gJiYgbmV3IFRIUkVFLlZlY3RvcjMoYm9uZS5taW4ueCwgYm9uZS5taW4ueSwgYm9uZS5taW4ueiksXG4gICAgICAgICAgICAgIHVzZURlZmF1bHRWYWx1ZXM6IGJvbmUudXNlRGVmYXVsdFZhbHVlcyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaHVtYW5EZXNjcmlwdGlvbjogVlJNSHVtYW5EZXNjcmlwdGlvbiA9IHtcbiAgICAgIGFybVN0cmV0Y2g6IHNjaGVtYUh1bWFub2lkLmFybVN0cmV0Y2gsXG4gICAgICBsZWdTdHJldGNoOiBzY2hlbWFIdW1hbm9pZC5sZWdTdHJldGNoLFxuICAgICAgdXBwZXJBcm1Ud2lzdDogc2NoZW1hSHVtYW5vaWQudXBwZXJBcm1Ud2lzdCxcbiAgICAgIGxvd2VyQXJtVHdpc3Q6IHNjaGVtYUh1bWFub2lkLmxvd2VyQXJtVHdpc3QsXG4gICAgICB1cHBlckxlZ1R3aXN0OiBzY2hlbWFIdW1hbm9pZC51cHBlckxlZ1R3aXN0LFxuICAgICAgbG93ZXJMZWdUd2lzdDogc2NoZW1hSHVtYW5vaWQubG93ZXJMZWdUd2lzdCxcbiAgICAgIGZlZXRTcGFjaW5nOiBzY2hlbWFIdW1hbm9pZC5mZWV0U3BhY2luZyxcbiAgICAgIGhhc1RyYW5zbGF0aW9uRG9GOiBzY2hlbWFIdW1hbm9pZC5oYXNUcmFuc2xhdGlvbkRvRixcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBWUk1IdW1hbm9pZChodW1hbkJvbmVBcnJheSwgaHVtYW5EZXNjcmlwdGlvbik7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vVlJNSHVtYW5Cb25lJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUh1bWFuRGVzY3JpcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1IdW1hbkxpbWl0JztcbmV4cG9ydCAqIGZyb20gJy4vVlJNSHVtYW5vaWQnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1IdW1hbm9pZEltcG9ydGVyJztcbiIsImV4cG9ydCAqIGZyb20gJy4vVlJNJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNSW1wb3J0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1VdGlscyc7XG5leHBvcnQgKiBmcm9tICcuL2JsZW5kc2hhcGUnO1xuZXhwb3J0ICogZnJvbSAnLi9kZWJ1Zyc7XG5leHBvcnQgKiBmcm9tICcuL2ZpcnN0cGVyc29uJztcbmV4cG9ydCAqIGZyb20gJy4vaHVtYW5vaWQnO1xuZXhwb3J0ICogZnJvbSAnLi9sb29rYXQnO1xuZXhwb3J0ICogZnJvbSAnLi9zcHJpbmdib25lJztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXRlcmlhbCc7XG5leHBvcnQgKiBmcm9tICcuL21ldGEnO1xuIiwiLyoqXG4gKiBFdmFsdWF0ZSBhIGhlcm1pdGUgc3BsaW5lLlxuICpcbiAqIEBwYXJhbSB5MCB5IG9uIHN0YXJ0XG4gKiBAcGFyYW0geTEgeSBvbiBlbmRcbiAqIEBwYXJhbSB0MCBkZWx0YSB5IG9uIHN0YXJ0XG4gKiBAcGFyYW0gdDEgZGVsdGEgeSBvbiBlbmRcbiAqIEBwYXJhbSB4IGlucHV0IHZhbHVlXG4gKi9cbmNvbnN0IGhlcm1pdGVTcGxpbmUgPSAoeTA6IG51bWJlciwgeTE6IG51bWJlciwgdDA6IG51bWJlciwgdDE6IG51bWJlciwgeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgeGMgPSB4ICogeCAqIHg7XG4gIGNvbnN0IHhzID0geCAqIHg7XG4gIGNvbnN0IGR5ID0geTEgLSB5MDtcbiAgY29uc3QgaDAxID0gLTIuMCAqIHhjICsgMy4wICogeHM7XG4gIGNvbnN0IGgxMCA9IHhjIC0gMi4wICogeHMgKyB4O1xuICBjb25zdCBoMTEgPSB4YyAtIHhzO1xuICByZXR1cm4geTAgKyBkeSAqIGgwMSArIHQwICogaDEwICsgdDEgKiBoMTE7XG59O1xuXG4vKipcbiAqIEV2YWx1YXRlIGFuIEFuaW1hdGlvbkN1cnZlIGFycmF5LiBTZWUgQW5pbWF0aW9uQ3VydmUgY2xhc3Mgb2YgVW5pdHkgZm9yIGl0cyBkZXRhaWxzLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kb2NzLnVuaXR5M2QuY29tL2phL2N1cnJlbnQvU2NyaXB0UmVmZXJlbmNlL0FuaW1hdGlvbkN1cnZlLmh0bWxcbiAqXG4gKiBAcGFyYW0gYXJyIEFuIGFycmF5IHJlcHJlc2VudHMgYSBjdXJ2ZVxuICogQHBhcmFtIHggQW4gaW5wdXQgdmFsdWVcbiAqL1xuY29uc3QgZXZhbHVhdGVDdXJ2ZSA9IChhcnI6IG51bWJlcltdLCB4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAvLyAtLSBzYW5pdHkgY2hlY2sgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgaWYgKGFyci5sZW5ndGggPCA4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdldmFsdWF0ZUN1cnZlOiBJbnZhbGlkIGN1cnZlIGRldGVjdGVkISAoQXJyYXkgbGVuZ3RoIG11c3QgYmUgOCBhdCBsZWFzdCknKTtcbiAgfVxuICBpZiAoYXJyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2YWx1YXRlQ3VydmU6IEludmFsaWQgY3VydmUgZGV0ZWN0ZWQhIChBcnJheSBsZW5ndGggbXVzdCBiZSBtdWx0aXBsZXMgb2YgNCcpO1xuICB9XG5cbiAgLy8gLS0gY2hlY2sgcmFuZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGxldCBvdXROb2RlO1xuICBmb3IgKG91dE5vZGUgPSAwOyA7IG91dE5vZGUrKykge1xuICAgIGlmIChhcnIubGVuZ3RoIDw9IDQgKiBvdXROb2RlKSB7XG4gICAgICByZXR1cm4gYXJyWzQgKiBvdXROb2RlIC0gM107IC8vIHRvbyBmdXJ0aGVyISEgYXNzdW1lIGFzIFwiQ2xhbXBcIlxuICAgIH0gZWxzZSBpZiAoeCA8PSBhcnJbNCAqIG91dE5vZGVdKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBpbk5vZGUgPSBvdXROb2RlIC0gMTtcbiAgaWYgKGluTm9kZSA8IDApIHtcbiAgICByZXR1cm4gYXJyWzQgKiBpbk5vZGUgKyA1XTsgLy8gdG9vIGJlaGluZCEhIGFzc3VtZSBhcyBcIkNsYW1wXCJcbiAgfVxuXG4gIC8vIC0tIGNhbGN1bGF0ZSBsb2NhbCB4IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCB4MCA9IGFycls0ICogaW5Ob2RlXTtcbiAgY29uc3QgeDEgPSBhcnJbNCAqIG91dE5vZGVdO1xuICBjb25zdCB4SGVybWl0ZSA9ICh4IC0geDApIC8gKHgxIC0geDApO1xuXG4gIC8vIC0tIGZpbmFsbHkgZG8gdGhlIGhlcm1pdGUgc3BsaW5lIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCB5MCA9IGFycls0ICogaW5Ob2RlICsgMV07XG4gIGNvbnN0IHkxID0gYXJyWzQgKiBvdXROb2RlICsgMV07XG4gIGNvbnN0IHQwID0gYXJyWzQgKiBpbk5vZGUgKyAzXTtcbiAgY29uc3QgdDEgPSBhcnJbNCAqIG91dE5vZGUgKyAyXTtcbiAgcmV0dXJuIGhlcm1pdGVTcGxpbmUoeTAsIHkxLCB0MCwgdDEsIHhIZXJtaXRlKTtcbn07XG5cbi8qKlxuICogVGhpcyBpcyBhbiBlcXVpdmFsZW50IG9mIEN1cnZlTWFwcGVyIGNsYXNzIGRlZmluZWQgaW4gVW5pVlJNLlxuICogV2lsbCBiZSB1c2VkIGZvciBbW1ZSTUxvb2tBdEFwcGx5ZXJdXXMsIHRvIGRlZmluZSBiZWhhdmlvciBvZiBMb29rQXQuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvTG9va0F0L0N1cnZlTWFwcGVyLmNzXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1DdXJ2ZU1hcHBlciB7XG4gIC8qKlxuICAgKiBBbiBhcnJheSByZXByZXNlbnRzIHRoZSBjdXJ2ZS4gU2VlIEFuaW1hdGlvbkN1cnZlIGNsYXNzIG9mIFVuaXR5IGZvciBpdHMgZGV0YWlscy5cbiAgICpcbiAgICogU2VlOiBodHRwczovL2RvY3MudW5pdHkzZC5jb20vamEvY3VycmVudC9TY3JpcHRSZWZlcmVuY2UvQW5pbWF0aW9uQ3VydmUuaHRtbFxuICAgKi9cbiAgcHVibGljIGN1cnZlOiBudW1iZXJbXSA9IFswLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMF07XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGlucHV0IHJhbmdlIG9mIHRoZSBbW1ZSTUN1cnZlTWFwcGVyXV0uXG4gICAqL1xuICBwdWJsaWMgY3VydmVYUmFuZ2VEZWdyZWUgPSA5MC4wO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBvdXRwdXQgdmFsdWUgb2YgdGhlIFtbVlJNQ3VydmVNYXBwZXJdXS5cbiAgICovXG4gIHB1YmxpYyBjdXJ2ZVlSYW5nZURlZ3JlZSA9IDEwLjA7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBbW1ZSTUN1cnZlTWFwcGVyXV0uXG4gICAqXG4gICAqIEBwYXJhbSB4UmFuZ2UgVGhlIG1heGltdW0gaW5wdXQgcmFuZ2VcbiAgICogQHBhcmFtIHlSYW5nZSBUaGUgbWF4aW11bSBvdXRwdXQgdmFsdWVcbiAgICogQHBhcmFtIGN1cnZlIEFuIGFycmF5IHJlcHJlc2VudHMgdGhlIGN1cnZlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih4UmFuZ2U/OiBudW1iZXIsIHlSYW5nZT86IG51bWJlciwgY3VydmU/OiBudW1iZXJbXSkge1xuICAgIGlmICh4UmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZSA9IHhSYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoeVJhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3VydmVZUmFuZ2VEZWdyZWUgPSB5UmFuZ2U7XG4gICAgfVxuXG4gICAgaWYgKGN1cnZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3VydmUgPSBjdXJ2ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXZhbHVhdGUgYW4gaW5wdXQgdmFsdWUgYW5kIG91dHB1dCBhIG1hcHBlZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHNyYyBUaGUgaW5wdXQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGNsYW1wZWRTcmMgPSBNYXRoLm1pbihNYXRoLm1heChzcmMsIDAuMCksIHRoaXMuY3VydmVYUmFuZ2VEZWdyZWUpO1xuICAgIGNvbnN0IHggPSBjbGFtcGVkU3JjIC8gdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZTtcbiAgICByZXR1cm4gdGhpcy5jdXJ2ZVlSYW5nZURlZ3JlZSAqIGV2YWx1YXRlQ3VydmUodGhpcy5jdXJ2ZSwgeCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgYnkgW1tWUk1Mb29rQXRIZWFkXV0sIGFwcGxpZXMgbG9vayBhdCBkaXJlY3Rpb24uXG4gKiBUaGVyZSBhcmUgY3VycmVudGx5IHR3byB2YXJpYW50IG9mIGFwcGxpZXI6IFtbVlJNTG9va0F0Qm9uZUFwcGx5ZXJdXSBhbmQgW1tWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcl1dLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVlJNTG9va0F0QXBwbHllciB7XG4gIC8qKlxuICAgKiBJdCByZXByZXNlbnRzIGl0cyB0eXBlIG9mIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgcmVhZG9ubHkgdHlwZTogVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWU7XG5cbiAgLyoqXG4gICAqIEFwcGx5IGxvb2sgYXQgZGlyZWN0aW9uIHRvIGl0cyBhc3NvY2lhdGVkIFZSTSBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGV1bGVyIGBUSFJFRS5FdWxlcmAgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgbG9vayBhdCBkaXJlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNQ3VydmVNYXBwZXIgfSBmcm9tICcuL1ZSTUN1cnZlTWFwcGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCBieSBbW1ZSTUxvb2tBdEhlYWRdXSwgYXBwbGllcyBsb29rIGF0IGRpcmVjdGlvbiB0byBleWUgYmxlbmQgc2hhcGVzIG9mIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgZXh0ZW5kcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlSG9yaXpvbnRhbDogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9ibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyLlxuICAgKlxuICAgKiBAcGFyYW0gYmxlbmRTaGFwZVByb3h5IEEgW1tWUk1CbGVuZFNoYXBlUHJveHldXSB1c2VkIGJ5IHRoaXMgYXBwbGllclxuICAgKiBAcGFyYW0gY3VydmVIb3Jpem9udGFsIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsRG93biBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBkb3duIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVWZXJ0aWNhbFVwIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIHVwIGRpcmVjdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgY3VydmVIb3Jpem9udGFsOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsRG93bjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcixcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2N1cnZlSG9yaXpvbnRhbCA9IGN1cnZlSG9yaXpvbnRhbDtcbiAgICB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93biA9IGN1cnZlVmVydGljYWxEb3duO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxVcCA9IGN1cnZlVmVydGljYWxVcDtcblxuICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eSA9IGJsZW5kU2hhcGVQcm94eTtcbiAgfVxuXG4gIHB1YmxpYyBuYW1lKCk6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lIHtcbiAgICByZXR1cm4gVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3JjWCA9IGV1bGVyLng7XG4gICAgY29uc3Qgc3JjWSA9IGV1bGVyLnk7XG5cbiAgICBpZiAoc3JjWCA8IDAuMCkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rdXAsIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tkb3duLCB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93bi5tYXAoLXNyY1gpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rZG93biwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3VwLCB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAubWFwKHNyY1gpKTtcbiAgICB9XG5cbiAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rbGVmdCwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3JpZ2h0LCB0aGlzLl9jdXJ2ZUhvcml6b250YWwubWFwKC1zcmNZKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3JpZ2h0LCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rbGVmdCwgdGhpcy5fY3VydmVIb3Jpem9udGFsLm1hcChzcmNZKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IEdMVEZOb2RlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1DdXJ2ZU1hcHBlciB9IGZyb20gJy4vVlJNQ3VydmVNYXBwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkJztcblxuY29uc3QgX2V1bGVyID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsIFZSTUxvb2tBdEhlYWQuRVVMRVJfT1JERVIpO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCBieSBbW1ZSTUxvb2tBdEhlYWRdXSwgYXBwbGllcyBsb29rIGF0IGRpcmVjdGlvbiB0byBleWUgYm9uZXMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRCb25lQXBwbHllciBleHRlbmRzIFZSTUxvb2tBdEFwcGx5ZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJvbmU7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVIb3Jpem9udGFsSW5uZXI6IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZUhvcml6b250YWxPdXRlcjogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9sZWZ0RXllOiBHTFRGTm9kZSB8IG51bGw7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3JpZ2h0RXllOiBHTFRGTm9kZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1Mb29rQXRCb25lQXBwbHllci5cbiAgICpcbiAgICogQHBhcmFtIGh1bWFub2lkIEEgW1tWUk1IdW1hbm9pZF1dIHVzZWQgYnkgdGhpcyBhcHBsaWVyXG4gICAqIEBwYXJhbSBjdXJ2ZUhvcml6b250YWxJbm5lciBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBpbm5lciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVIb3Jpem9udGFsT3V0ZXIgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3Igb3V0ZXIgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxEb3duIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsVXAgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBodW1hbm9pZDogVlJNSHVtYW5vaWQsXG4gICAgY3VydmVIb3Jpem9udGFsSW5uZXI6IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlSG9yaXpvbnRhbE91dGVyOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsRG93bjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVWZXJ0aWNhbFVwOiBWUk1DdXJ2ZU1hcHBlcixcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyID0gY3VydmVIb3Jpem9udGFsSW5uZXI7XG4gICAgdGhpcy5fY3VydmVIb3Jpem9udGFsT3V0ZXIgPSBjdXJ2ZUhvcml6b250YWxPdXRlcjtcbiAgICB0aGlzLl9jdXJ2ZVZlcnRpY2FsRG93biA9IGN1cnZlVmVydGljYWxEb3duO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxVcCA9IGN1cnZlVmVydGljYWxVcDtcblxuICAgIHRoaXMuX2xlZnRFeWUgPSBodW1hbm9pZC5nZXRCb25lTm9kZShWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZS5MZWZ0RXllKTtcbiAgICB0aGlzLl9yaWdodEV5ZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lLlJpZ2h0RXllKTtcbiAgfVxuXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZCB7XG4gICAgY29uc3Qgc3JjWCA9IGV1bGVyLng7XG4gICAgY29uc3Qgc3JjWSA9IGV1bGVyLnk7XG5cbiAgICAvLyBsZWZ0XG4gICAgaWYgKHRoaXMuX2xlZnRFeWUpIHtcbiAgICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci54ID0gLXRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueCA9IHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci55ID0gLXRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyLm1hcCgtc3JjWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueSA9IHRoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyLm1hcChzcmNZKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGVmdEV5ZS5xdWF0ZXJuaW9uLnNldEZyb21FdWxlcihfZXVsZXIpO1xuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKHRoaXMuX3JpZ2h0RXllKSB7XG4gICAgICBpZiAoc3JjWCA8IDAuMCkge1xuICAgICAgICBfZXVsZXIueCA9IC10aGlzLl9jdXJ2ZVZlcnRpY2FsRG93bi5tYXAoLXNyY1gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyLnggPSB0aGlzLl9jdXJ2ZVZlcnRpY2FsVXAubWFwKHNyY1gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgICBfZXVsZXIueSA9IC10aGlzLl9jdXJ2ZUhvcml6b250YWxPdXRlci5tYXAoLXNyY1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2V1bGVyLnkgPSB0aGlzLl9jdXJ2ZUhvcml6b250YWxJbm5lci5tYXAoc3JjWSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JpZ2h0RXllLnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKF9ldWxlcik7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4uL2ZpcnN0cGVyc29uL1ZSTUZpcnN0UGVyc29uJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuXG5jb25zdCBWRUNUT1IzX0ZST05UID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgLTEuMCkpO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGxvb2sgYXQgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRIZWFkIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFVUxFUl9PUkRFUiA9ICdZWFonOyAvLyB5YXctcGl0Y2gtcm9sbFxuXG4gIC8qKlxuICAgKiBBc3NvY2lhdGVkIFtbVlJNRmlyc3RQZXJzb25dXSwgd2lsbCBiZSB1c2VkIGZvciBkaXJlY3Rpb24gY2FsY3VsYXRpb24uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uO1xuXG4gIC8qKlxuICAgKiBBc3NvY2lhdGVkIFtbVlJNTG9va0F0QXBwbHllcl1dLCBpdHMgbG9vayBhdCBkaXJlY3Rpb24gd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBtb2RlbCB1c2luZyB0aGlzIGFwcGxpZXIuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgYXBwbHllcj86IFZSTUxvb2tBdEFwcGx5ZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgaXMgdHJ1ZSwgaXRzIGxvb2sgYXQgZGlyZWN0aW9uIHdpbGwgYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IGNhbGxpbmcgW1tWUk1Mb29rQXRIZWFkLnVwZGF0ZV1dICh3aGljaCBpcyBjYWxsZWQgZnJvbSBbW1ZSTS51cGRhdGVdXSkuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUxvb2tBdEhlYWQudGFyZ2V0XV1cbiAgICovXG4gIHB1YmxpYyBhdXRvVXBkYXRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBvYmplY3Qgb2YgdGhlIGxvb2sgYXQuXG4gICAqIE5vdGUgdGhhdCBpdCBkb2VzIG5vdCBtYWtlIGFueSBzZW5zZSBpZiBbW1ZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZV1dIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgcHVibGljIHRhcmdldD86IFRIUkVFLk9iamVjdDNEO1xuXG4gIHByb3RlY3RlZCBfZXVsZXI6IFRIUkVFLkV1bGVyID0gbmV3IFRIUkVFLkV1bGVyKDAuMCwgMC4wLCAwLjAsIFZSTUxvb2tBdEhlYWQuRVVMRVJfT1JERVIpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTG9va0F0SGVhZC5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uIEEgW1tWUk1GaXJzdFBlcnNvbl1dIHRoYXQgd2lsbCBiZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBuZXcgVlJNTG9va0F0SGVhZFxuICAgKiBAcGFyYW0gYXBwbHllciBBIFtbVlJNTG9va0F0QXBwbHllcl1dIHRoYXQgd2lsbCBiZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBuZXcgVlJNTG9va0F0SGVhZFxuICAgKi9cbiAgY29uc3RydWN0b3IoZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLCBhcHBseWVyPzogVlJNTG9va0F0QXBwbHllcikge1xuICAgIHRoaXMuZmlyc3RQZXJzb24gPSBmaXJzdFBlcnNvbjtcbiAgICB0aGlzLmFwcGx5ZXIgPSBhcHBseWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdHMgbG9vayBhdCBkaXJlY3Rpb24gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRhcmdldCBBIHRhcmdldCBgVEhSRUUuVmVjdG9yM2BcbiAgICovXG4gIHB1YmxpYyBnZXRMb29rQXRXb3JsZERpcmVjdGlvbih0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICBjb25zdCByb3QgPSBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lLCBfcXVhdCk7XG4gICAgcmV0dXJuIHRhcmdldFxuICAgICAgLmNvcHkoVkVDVE9SM19GUk9OVClcbiAgICAgIC5hcHBseUV1bGVyKHRoaXMuX2V1bGVyKVxuICAgICAgLmFwcGx5UXVhdGVybmlvbihyb3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpdHMgbG9vayBhdCBwb3NpdGlvbi5cbiAgICogTm90ZSB0aGF0IGl0cyByZXN1bHQgd2lsbCBiZSBpbnN0YW50bHkgb3ZlcndyaXR0ZW4gaWYgW1tWUk1Mb29rQXRIZWFkLmF1dG9VcGRhdGVdXSBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zaXRpb24gQSB0YXJnZXQgcG9zaXRpb25cbiAgICovXG4gIHB1YmxpYyBsb29rQXQocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiB2b2lkIHtcbiAgICB0aGlzLl9jYWxjRXVsZXIodGhpcy5fZXVsZXIsIHBvc2l0aW9uKTtcblxuICAgIGlmICh0aGlzLmFwcGx5ZXIpIHtcbiAgICAgIHRoaXMuYXBwbHllci5sb29rQXQodGhpcy5fZXVsZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIFZSTUxvb2tBdEhlYWQuXG4gICAqIElmIFtbVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlXV0gaXMgZGlzYWJsZWQsIGl0IHdpbGwgZG8gbm90aGluZy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5sb29rQXQodGhpcy50YXJnZXQuZ2V0V29ybGRQb3NpdGlvbihfdjNBKSk7XG5cbiAgICAgIGlmICh0aGlzLmFwcGx5ZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseWVyLmxvb2tBdCh0aGlzLl9ldWxlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jYWxjRXVsZXIodGFyZ2V0OiBUSFJFRS5FdWxlciwgcG9zaXRpb246IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5FdWxlciB7XG4gICAgY29uc3QgaGVhZFBvc2l0aW9uID0gdGhpcy5maXJzdFBlcnNvbi5nZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24oX3YzQik7XG5cbiAgICAvLyBMb29rIGF0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlXG4gICAgY29uc3QgbG9va0F0RGlyID0gX3YzQ1xuICAgICAgLmNvcHkocG9zaXRpb24pXG4gICAgICAuc3ViKGhlYWRQb3NpdGlvbilcbiAgICAgIC5ub3JtYWxpemUoKTtcblxuICAgIC8vIFRyYW5zZm9ybSB0aGUgZGlyZWN0aW9uIGludG8gbG9jYWwgY29vcmRpbmF0ZSBmcm9tIHRoZSBmaXJzdCBwZXJzb24gYm9uZVxuICAgIGxvb2tBdERpci5hcHBseVF1YXRlcm5pb24oZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLmZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSwgX3F1YXQpLmludmVyc2UoKSk7XG5cbiAgICAvLyBjb252ZXJ0IHRoZSBkaXJlY3Rpb24gaW50byBldWxlclxuICAgIHRhcmdldC54ID0gTWF0aC5hdGFuMihsb29rQXREaXIueSwgTWF0aC5zcXJ0KGxvb2tBdERpci54ICogbG9va0F0RGlyLnggKyBsb29rQXREaXIueiAqIGxvb2tBdERpci56KSk7XG4gICAgdGFyZ2V0LnkgPSBNYXRoLmF0YW4yKC1sb29rQXREaXIueCwgLWxvb2tBdERpci56KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgVlJNRmlyc3RQZXJzb24gfSBmcm9tICcuLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZCB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUN1cnZlTWFwcGVyIH0gZnJvbSAnLi9WUk1DdXJ2ZU1hcHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRCb25lQXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0Qm9uZUFwcGx5ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4vVlJNTG9va0F0SGVhZCc7XG5cbi8vIFRIUkVFLk1hdGggaGFzIGJlZW4gcmVuYW1lZCB0byBUSFJFRS5NYXRoVXRpbHMgc2luY2UgcjExMy5cbi8vIFdlIGFyZSBnb2luZyB0byBkZWZpbmUgdGhlIERFRzJSQUQgYnkgb3Vyc2VsdmVzIGZvciBhIHdoaWxlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTgyNzBcbmNvbnN0IERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwOyAvLyBUSFJFRS5NYXRoVXRpbHMuREVHMlJBRDtcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUxvb2tBdEhlYWRdXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUxvb2tBdEhlYWRdXSBmcm9tIGEgVlJNLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICogQHBhcmFtIGJsZW5kU2hhcGVQcm94eSBBIFtbVlJNQmxlbmRTaGFwZVByb3h5XV0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICogQHBhcmFtIGh1bWFub2lkIEEgW1tWUk1IdW1hbm9pZF1dIGluc3RhbmNlIHRoYXQgcmVwcmVzZW50cyB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgaW1wb3J0KFxuICAgIGdsdGY6IEdMVEYsXG4gICAgZmlyc3RQZXJzb246IFZSTUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0SGVhZCB8IG51bGwge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGFwcGx5ZXIgPSB0aGlzLl9pbXBvcnRBcHBseWVyKHNjaGVtYUZpcnN0UGVyc29uLCBibGVuZFNoYXBlUHJveHksIGh1bWFub2lkKTtcbiAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWQoZmlyc3RQZXJzb24sIGFwcGx5ZXIgfHwgdW5kZWZpbmVkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW1wb3J0QXBwbHllcihcbiAgICBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgKTogVlJNTG9va0F0QXBwbHllciB8IG51bGwge1xuICAgIGNvbnN0IGxvb2tBdEhvcml6b250YWxJbm5lciA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxJbm5lcjtcbiAgICBjb25zdCBsb29rQXRIb3Jpem9udGFsT3V0ZXIgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsT3V0ZXI7XG4gICAgY29uc3QgbG9va0F0VmVydGljYWxEb3duID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxEb3duO1xuICAgIGNvbnN0IGxvb2tBdFZlcnRpY2FsVXAgPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbFVwO1xuXG4gICAgc3dpdGNoIChzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRUeXBlTmFtZSkge1xuICAgICAgY2FzZSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5Cb25lOiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBsb29rQXRIb3Jpem9udGFsSW5uZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGxvb2tBdEhvcml6b250YWxPdXRlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbG9va0F0VmVydGljYWxEb3duID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBsb29rQXRWZXJ0aWNhbFVwID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRCb25lQXBwbHllcihcbiAgICAgICAgICAgIGh1bWFub2lkLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdEhvcml6b250YWxJbm5lciksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0SG9yaXpvbnRhbE91dGVyKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRWZXJ0aWNhbERvd24pLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdFZlcnRpY2FsVXApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhc2UgVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZToge1xuICAgICAgICBpZiAobG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxEb3duID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxVcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcihcbiAgICAgICAgICAgIGJsZW5kU2hhcGVQcm94eSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShsb29rQXRIb3Jpem9udGFsT3V0ZXIpLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKGxvb2tBdFZlcnRpY2FsRG93biksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobG9va0F0VmVydGljYWxVcCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobWFwOiBWUk1TY2hlbWEuRmlyc3RQZXJzb25EZWdyZWVNYXApOiBWUk1DdXJ2ZU1hcHBlciB7XG4gICAgcmV0dXJuIG5ldyBWUk1DdXJ2ZU1hcHBlcihcbiAgICAgIHR5cGVvZiBtYXAueFJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueFJhbmdlIDogdW5kZWZpbmVkLFxuICAgICAgdHlwZW9mIG1hcC55UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC55UmFuZ2UgOiB1bmRlZmluZWQsXG4gICAgICBtYXAuY3VydmUsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShtYXA6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCk6IFZSTUN1cnZlTWFwcGVyIHtcbiAgICByZXR1cm4gbmV3IFZSTUN1cnZlTWFwcGVyKHR5cGVvZiBtYXAueFJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueFJhbmdlIDogdW5kZWZpbmVkLCBtYXAueVJhbmdlLCBtYXAuY3VydmUpO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1ZSTUN1cnZlTWFwcGVyJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNTG9va0F0Qm9uZUFwcGx5ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1Mb29rQXRIZWFkJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNTG9va0F0SW1wb3J0ZXInO1xuIiwiLyogdHNsaW50OmRpc2FibGU6bWVtYmVyLW9yZGVyaW5nICovXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbiB9IGZyb20gJy4vZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uJztcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLnZlcnQnO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gJy4vc2hhZGVycy9tdG9vbi5mcmFnJztcblxuY29uc3QgVEFVID0gMi4wICogTWF0aC5QSTtcblxuZXhwb3J0IGludGVyZmFjZSBNVG9vblBhcmFtZXRlcnMgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMge1xuICBtVG9vblZlcnNpb24/OiBudW1iZXI7IC8vIF9NVG9vblZlcnNpb25cblxuICBjdXRvZmY/OiBudW1iZXI7IC8vIF9DdXRvZmZcbiAgY29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyByZ2Igb2YgX0NvbG9yXG4gIHNoYWRlQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfU2hhZGVDb2xvclxuICBtYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleFxuICBtYWluVGV4PzogVEhSRUUuVGV4dHVyZTsgLy8gX01haW5UZXggKHdpbGwgYmUgcmVuYW1lZCB0byBtYXApXG4gIG1haW5UZXhfU1Q/OiBUSFJFRS5WZWN0b3I0OyAvLyBfTWFpblRleF9TVFxuICBzaGFkZVRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfU2hhZGVUZXh0dXJlXG4gIGJ1bXBTY2FsZT86IG51bWJlcjsgLy8gX0J1bXBTY2FsZSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gbm9ybWFsU2NhbGUpXG4gIG5vcm1hbE1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9CdW1wTWFwXG4gIG5vcm1hbE1hcFR5cGU/OiBUSFJFRS5Ob3JtYWxNYXBUeXBlczsgLy8gVGhyZWUuanMgc3BlY2lmaWMgdmFsdWVcbiAgbm9ybWFsU2NhbGU/OiBUSFJFRS5WZWN0b3IyOyAvLyBfQnVtcFNjYWxlIGluIFRocmVlLmpzIGZhc2hpb25cbiAgYnVtcE1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9CdW1wTWFwICh3aWxsIGJlIHJlbmFtZWQgdG8gbm9ybWFsTWFwKVxuICByZWNlaXZlU2hhZG93UmF0ZT86IG51bWJlcjsgLy8gX1JlY2VpdmVTaGFkb3dSYXRlXG4gIHJlY2VpdmVTaGFkb3dUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1JlY2VpdmVTaGFkb3dUZXh0dXJlXG4gIHNoYWRpbmdHcmFkZVJhdGU/OiBudW1iZXI7IC8vIF9TaGFkaW5nR3JhZGVSYXRlXG4gIHNoYWRpbmdHcmFkZVRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfU2hhZGluZ0dyYWRlVGV4dHVyZVxuICBzaGFkZVNoaWZ0PzogbnVtYmVyOyAvLyBfU2hhZGVTaGlmdFxuICBzaGFkZVRvb255PzogbnVtYmVyOyAvLyBfU2hhZGVUb29ueVxuICBsaWdodENvbG9yQXR0ZW51YXRpb24/OiBudW1iZXI7IC8vIF9MaWdodENvbG9yQXR0ZW51YXRpb25cbiAgaW5kaXJlY3RMaWdodEludGVuc2l0eT86IG51bWJlcjsgLy8gX0luZGlyZWN0TGlnaHRJbnRlbnNpdHlcbiAgcmltVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9SaW1UZXh0dXJlXG4gIHJpbUNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX1JpbUNvbG9yXG4gIHJpbUxpZ2h0aW5nTWl4PzogbnVtYmVyOyAvLyBfUmltTGlnaHRpbmdNaXhcbiAgcmltRnJlc25lbFBvd2VyPzogbnVtYmVyOyAvLyBfUmltRnJlc25lbFBvd2VyXG4gIHJpbUxpZnQ/OiBudW1iZXI7IC8vIF9SaW1MaWZ0XG4gIHNwaGVyZUFkZD86IFRIUkVFLlRleHR1cmU7IC8vIF9TcGhlcmVBZGRcbiAgZW1pc3Npb25Db2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9FbWlzc2lvbkNvbG9yXG4gIGVtaXNzaXZlTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0VtaXNzaW9uTWFwXG4gIGVtaXNzaW9uTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0VtaXNzaW9uTWFwICh3aWxsIGJlIHJlbmFtZWQgdG8gZW1pc3NpdmVNYXApXG4gIG91dGxpbmVXaWR0aFRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfT3V0bGluZVdpZHRoVGV4dHVyZVxuICBvdXRsaW5lV2lkdGg/OiBudW1iZXI7IC8vIF9PdXRsaW5lV2lkdGhcbiAgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlPzogbnVtYmVyOyAvLyBfT3V0bGluZVNjYWxlZE1heERpc3RhbmNlXG4gIG91dGxpbmVDb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9PdXRsaW5lQ29sb3JcbiAgb3V0bGluZUxpZ2h0aW5nTWl4PzogbnVtYmVyOyAvLyBfT3V0bGluZUxpZ2h0aW5nTWl4XG4gIHV2QW5pbU1hc2tUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1V2QW5pbU1hc2tUZXh0dXJlXG4gIHV2QW5pbVNjcm9sbFg/OiBudW1iZXI7IC8vIF9VdkFuaW1TY3JvbGxYXG4gIHV2QW5pbVNjcm9sbFk/OiBudW1iZXI7IC8vIF9VdkFuaW1TY3JvbGxZXG4gIHV2QW5pbVJvdGF0aW9uPzogbnVtYmVyOyAvLyBfdXZBbmltUm90YXRpb25cblxuICBkZWJ1Z01vZGU/OiBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIHwgbnVtYmVyOyAvLyBfRGVidWdNb2RlXG4gIGJsZW5kTW9kZT86IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlIHwgbnVtYmVyOyAvLyBfQmxlbmRNb2RlXG4gIG91dGxpbmVXaWR0aE1vZGU/OiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB8IG51bWJlcjsgLy8gT3V0bGluZVdpZHRoTW9kZVxuICBvdXRsaW5lQ29sb3JNb2RlPzogTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUgfCBudW1iZXI7IC8vIE91dGxpbmVDb2xvck1vZGVcbiAgY3VsbE1vZGU/OiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUgfCBudW1iZXI7IC8vIF9DdWxsTW9kZVxuICBvdXRsaW5lQ3VsbE1vZGU/OiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUgfCBudW1iZXI7IC8vIF9PdXRsaW5lQ3VsbE1vZGVcbiAgc3JjQmxlbmQ/OiBudW1iZXI7IC8vIF9TcmNCbGVuZFxuICBkc3RCbGVuZD86IG51bWJlcjsgLy8gX0RzdEJsZW5kXG4gIHpXcml0ZT86IG51bWJlcjsgLy8gX1pXcml0ZSAod2lsbCBiZSByZW5hbWVkIHRvIGRlcHRoV3JpdGUpXG5cbiAgaXNPdXRsaW5lPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZW5jb2Rpbmcgb2YgaW5wdXQgdW5pZm9ybSBjb2xvcnMuXG4gICAqXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuc1JHQkVuY29kaW5nYCwgdXNlIGBUSFJFRS5zUkdCRW5jb2RpbmdgLlxuICAgKlxuICAgKiBFbmNvZGluZ3Mgb2YgdGV4dHVyZXMgc2hvdWxkIGJlIHNldCBpbmRlcGVuZGVudGx5IG9uIHRleHR1cmVzLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AgaWYgdGhpcyBvcHRpb24gaXNuJ3Qgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vcmVuZGVyZXJzL1dlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmdcbiAgICovXG4gIGVuY29kaW5nPzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUge1xuICBPZmYsXG4gIEZyb250LFxuICBCYWNrLFxufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlIHtcbiAgTm9uZSxcbiAgTm9ybWFsLFxuICBMaXRTaGFkZVJhdGUsXG4gIFVWLFxufVxuXG5leHBvcnQgZW51bSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSB7XG4gIEZpeGVkQ29sb3IsXG4gIE1peGVkTGlnaHRpbmcsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHtcbiAgTm9uZSxcbiAgV29ybGRDb29yZGluYXRlcyxcbiAgU2NyZWVuQ29vcmRpbmF0ZXMsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlIHtcbiAgT3BhcXVlLFxuICBDdXRvdXQsXG4gIFRyYW5zcGFyZW50LFxuICBUcmFuc3BhcmVudFdpdGhaV3JpdGUsXG59XG5cbi8qKlxuICogTVRvb24gaXMgYSBtYXRlcmlhbCBzcGVjaWZpY2F0aW9uIHRoYXQgaGFzIHZhcmlvdXMgZmVhdHVyZXMuXG4gKiBUaGUgc3BlYyBhbmQgaW1wbGVtZW50YXRpb24gYXJlIG9yaWdpbmFsbHkgZm91bmRlZCBmb3IgVW5pdHkgZW5naW5lIGFuZCB0aGlzIGlzIGEgcG9ydCBvZiB0aGUgbWF0ZXJpYWwuXG4gKlxuICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vU2FudGFyaC9NVG9vblxuICovXG5leHBvcnQgY2xhc3MgTVRvb25NYXRlcmlhbCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIFtbTVRvb25NYXRlcmlhbF1dLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlzTVRvb25NYXRlcmlhbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIGN1dG9mZiA9IDAuNTsgLy8gX0N1dG9mZlxuICBwdWJsaWMgY29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgxLjAsIDEuMCwgMS4wLCAxLjApOyAvLyBfQ29sb3JcbiAgcHVibGljIHNoYWRlQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjk3LCAwLjgxLCAwLjg2LCAxLjApOyAvLyBfU2hhZGVDb2xvclxuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9NYWluVGV4XG4gIHB1YmxpYyBtYWluVGV4X1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX01haW5UZXhfU1RcbiAgcHVibGljIHNoYWRlVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU2hhZGVUZXh0dXJlXG4gIC8vIHB1YmxpYyBzaGFkZVRleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU2hhZGVUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBub3JtYWxNYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX0J1bXBNYXAuIGFnYWluLCBUSElTIElTIF9CdW1wTWFwXG4gIHB1YmxpYyBub3JtYWxNYXBUeXBlID0gVEhSRUUuVGFuZ2VudFNwYWNlTm9ybWFsTWFwOyAvLyBUaHJlZS5qcyByZXF1aXJlcyB0aGlzXG4gIHB1YmxpYyBub3JtYWxTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IyKDEuMCwgMS4wKTsgLy8gX0J1bXBTY2FsZSwgaW4gVmVjdG9yMlxuICAvLyBwdWJsaWMgYnVtcE1hcF9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9CdW1wTWFwX1NUICh1bnVzZWQpXG4gIHB1YmxpYyByZWNlaXZlU2hhZG93UmF0ZSA9IDEuMDsgLy8gX1JlY2VpdmVTaGFkb3dSYXRlXG4gIHB1YmxpYyByZWNlaXZlU2hhZG93VGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVcbiAgLy8gcHVibGljIHJlY2VpdmVTaGFkb3dUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1JlY2VpdmVTaGFkb3dUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBzaGFkaW5nR3JhZGVSYXRlID0gMS4wOyAvLyBfU2hhZGluZ0dyYWRlUmF0ZVxuICBwdWJsaWMgc2hhZGluZ0dyYWRlVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU2hhZGluZ0dyYWRlVGV4dHVyZVxuICAvLyBwdWJsaWMgc2hhZGluZ0dyYWRlVGV4dHVyZV9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9TaGFkaW5nR3JhZGVUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBzaGFkZVNoaWZ0ID0gMC4wOyAvLyBfU2hhZGVTaGlmdFxuICBwdWJsaWMgc2hhZGVUb29ueSA9IDAuOTsgLy8gX1NoYWRlVG9vbnlcbiAgcHVibGljIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IDAuMDsgLy8gX0xpZ2h0Q29sb3JBdHRlbnVhdGlvblxuICBwdWJsaWMgaW5kaXJlY3RMaWdodEludGVuc2l0eSA9IDAuMTsgLy8gX0luZGlyZWN0TGlnaHRJbnRlbnNpdHlcbiAgcHVibGljIHJpbVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1JpbVRleHR1cmVcbiAgcHVibGljIHJpbUNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX1JpbUNvbG9yXG4gIHB1YmxpYyByaW1MaWdodGluZ01peCA9IDAuMDsgLy8gX1JpbUxpZ2h0aW5nTWl4XG4gIHB1YmxpYyByaW1GcmVzbmVsUG93ZXIgPSAxLjA7IC8vIF9SaW1GcmVzbmVsUG93ZXJcbiAgcHVibGljIHJpbUxpZnQgPSAwLjA7IC8vIF9SaW1MaWZ0XG4gIHB1YmxpYyBzcGhlcmVBZGQ6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1NwaGVyZUFkZFxuICAvLyBwdWJsaWMgc3BoZXJlQWRkX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1NwaGVyZUFkZF9TVCAodW51c2VkKVxuICBwdWJsaWMgZW1pc3Npb25Db2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIF9FbWlzc2lvbkNvbG9yXG4gIHB1YmxpYyBlbWlzc2l2ZU1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfRW1pc3Npb25NYXBcbiAgLy8gcHVibGljIGVtaXNzaW9uTWFwX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX0VtaXNzaW9uTWFwX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9PdXRsaW5lV2lkdGhUZXh0dXJlXG4gIC8vIHB1YmxpYyBvdXRsaW5lV2lkdGhUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIG91dGxpbmVXaWR0aCA9IDAuNTsgLy8gX091dGxpbmVXaWR0aFxuICBwdWJsaWMgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gMS4wOyAvLyBfT3V0bGluZVNjYWxlZE1heERpc3RhbmNlXG4gIHB1YmxpYyBvdXRsaW5lQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAxLjApOyAvLyBfT3V0bGluZUNvbG9yXG4gIHB1YmxpYyBvdXRsaW5lTGlnaHRpbmdNaXggPSAxLjA7IC8vIF9PdXRsaW5lTGlnaHRpbmdNaXhcbiAgcHVibGljIHV2QW5pbU1hc2tUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9VdkFuaW1NYXNrVGV4dHVyZVxuICBwdWJsaWMgdXZBbmltU2Nyb2xsWCA9IDAuMDsgLy8gX1V2QW5pbVNjcm9sbFhcbiAgcHVibGljIHV2QW5pbVNjcm9sbFkgPSAwLjA7IC8vIF9VdkFuaW1TY3JvbGxZXG4gIHB1YmxpYyB1dkFuaW1Sb3RhdGlvbiA9IDAuMDsgLy8gX3V2QW5pbVJvdGF0aW9uXG5cbiAgcHVibGljIHNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlOyAvLyB3aGVuIHRoaXMgaXMgdHJ1ZSwgYXBwbHlVbmlmb3JtcyBlZmZlY3RzXG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyBvZiBpbnB1dCB1bmlmb3JtIGNvbG9ycy5cbiAgICpcbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AuXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5zUkdCRW5jb2RpbmdgLCB1c2UgYFRIUkVFLnNSR0JFbmNvZGluZ2AuXG4gICAqXG4gICAqIEVuY29kaW5ncyBvZiB0ZXh0dXJlcyBhcmUgc2V0IGluZGVwZW5kZW50bHkgb24gdGV4dHVyZXMuXG4gICAqXG4gICAqIFRoaXMgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCBieSBkZWZhdWx0LlxuICAgKlxuICAgKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vcmVuZGVyZXJzL1dlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmdcbiAgICovXG4gIHB1YmxpYyBlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xuXG4gIHByaXZhdGUgX2RlYnVnTW9kZSA9IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuTm9uZTsgLy8gX0RlYnVnTW9kZVxuICBwcml2YXRlIF9ibGVuZE1vZGUgPSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5PcGFxdWU7IC8vIF9CbGVuZE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmU7IC8vIF9PdXRsaW5lV2lkdGhNb2RlXG4gIHByaXZhdGUgX291dGxpbmVDb2xvck1vZGUgPSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZS5GaXhlZENvbG9yOyAvLyBfT3V0bGluZUNvbG9yTW9kZVxuICBwcml2YXRlIF9jdWxsTW9kZSA9IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5CYWNrOyAvLyBfQ3VsbE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZUN1bGxNb2RlID0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkZyb250OyAvLyBfT3V0bGluZUN1bGxNb2RlXG4gIC8vIHB1YmxpYyBzcmNCbGVuZCA9IDEuMDsgLy8gX1NyY0JsZW5kIChpcyBub3Qgc3VwcG9ydGVkKVxuICAvLyBwdWJsaWMgZHN0QmxlbmQgPSAwLjA7IC8vIF9Ec3RCbGVuZCAoaXMgbm90IHN1cHBvcnRlZClcbiAgLy8gcHVibGljIHpXcml0ZSA9IDEuMDsgLy8gX1pXcml0ZSAod2lsbCBiZSBjb252ZXJ0ZWQgdG8gZGVwdGhXcml0ZSlcblxuICBwcml2YXRlIF9pc091dGxpbmUgPSBmYWxzZTtcblxuICBwcml2YXRlIF91dkFuaW1PZmZzZXRYID0gMC4wO1xuICBwcml2YXRlIF91dkFuaW1PZmZzZXRZID0gMC4wO1xuICBwcml2YXRlIF91dkFuaW1QaGFzZSA9IDAuMDtcblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzOiBNVG9vblBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmVuY29kaW5nID0gcGFyYW1ldGVycy5lbmNvZGluZyB8fCBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgICBpZiAodGhpcy5lbmNvZGluZyAhPT0gVEhSRUUuTGluZWFyRW5jb2RpbmcgJiYgdGhpcy5lbmNvZGluZyAhPT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdUaGUgc3BlY2lmaWVkIGNvbG9yIGVuY29kaW5nIGRvZXMgbm90IHdvcmsgcHJvcGVybHkgd2l0aCBNVG9vbk1hdGVyaWFsLiBZb3UgbWlnaHQgd2FudCB0byB1c2UgVEhSRUUuc1JHQkVuY29kaW5nIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gPT0gdGhlc2UgcGFyYW1ldGVyIGhhcyBubyBjb21wYXRpYmlsaXR5IHdpdGggdGhpcyBpbXBsZW1lbnRhdGlvbiA9PT09PT09PVxuICAgIFtcbiAgICAgICdtVG9vblZlcnNpb24nLFxuICAgICAgJ3NoYWRlVGV4dHVyZV9TVCcsXG4gICAgICAnYnVtcE1hcF9TVCcsXG4gICAgICAncmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QnLFxuICAgICAgJ3NoYWRpbmdHcmFkZVRleHR1cmVfU1QnLFxuICAgICAgJ3JpbVRleHR1cmVfU1QnLFxuICAgICAgJ3NwaGVyZUFkZF9TVCcsXG4gICAgICAnZW1pc3Npb25NYXBfU1QnLFxuICAgICAgJ291dGxpbmVXaWR0aFRleHR1cmVfU1QnLFxuICAgICAgJ3V2QW5pbU1hc2tUZXh0dXJlX1NUJyxcbiAgICAgICdzcmNCbGVuZCcsXG4gICAgICAnZHN0QmxlbmQnLFxuICAgIF0uZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoKHBhcmFtZXRlcnMgYXMgYW55KVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKGBUSFJFRS4ke3RoaXMudHlwZX06IFRoZSBwYXJhbWV0ZXIgXCIke2tleX1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xuICAgICAgICBkZWxldGUgKHBhcmFtZXRlcnMgYXMgYW55KVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmxpZ2h0cyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XG5cbiAgICBwYXJhbWV0ZXJzLnNraW5uaW5nID0gcGFyYW1ldGVycy5za2lubmluZyB8fCBmYWxzZTtcbiAgICBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyA9IHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzID0gcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW1xuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLCAvLyBtYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLm5vcm1hbG1hcCwgLy8gbm9ybWFsTWFwXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5lbWlzc2l2ZW1hcCwgLy8gZW1pc3NpdmVNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmZvZyxcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmxpZ2h0cyxcbiAgICAgIHtcbiAgICAgICAgY3V0b2ZmOiB7IHZhbHVlOiAwLjUgfSxcbiAgICAgICAgY29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigxLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBjb2xvckFscGhhOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGVDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuOTcsIDAuODEsIDAuODYpIH0sXG4gICAgICAgIG1haW5UZXhfU1Q6IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCkgfSxcbiAgICAgICAgc2hhZGVUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHJlY2VpdmVTaGFkb3dSYXRlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgcmVjZWl2ZVNoYWRvd1RleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGluZ0dyYWRlUmF0ZTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHNoYWRpbmdHcmFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgc2hhZGVTaGlmdDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHNoYWRlVG9vbnk6IHsgdmFsdWU6IDAuOSB9LFxuICAgICAgICBsaWdodENvbG9yQXR0ZW51YXRpb246IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5OiB7IHZhbHVlOiAwLjEgfSxcbiAgICAgICAgcmltVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICByaW1Db2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIHJpbUxpZ2h0aW5nTWl4OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgcmltRnJlc25lbFBvd2VyOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgcmltTGlmdDogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHNwaGVyZUFkZDogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBlbWlzc2lvbkNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgb3V0bGluZVdpZHRoVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBvdXRsaW5lV2lkdGg6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBvdXRsaW5lQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lTGlnaHRpbmdNaXg6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICB1dkFuaW1NYXNrVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICB1dkFuaW1PZmZzZXRYOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltT2Zmc2V0WTogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIHV2QW5pbVRoZXRhOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgIH0sXG4gICAgXSk7XG5cbiAgICAvLyA9PSBmaW5hbGx5IGNvbXBpbGUgdGhlIHNoYWRlciBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5zZXRWYWx1ZXMocGFyYW1ldGVycyk7XG5cbiAgICAvLyA9PSB1cGRhdGUgc2hhZGVyIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIGdldCBtYWluVGV4KCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYXA7XG4gIH1cblxuICBzZXQgbWFpblRleCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMubWFwID0gdDtcbiAgfVxuXG4gIGdldCBidW1wTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxNYXA7XG4gIH1cblxuICBzZXQgYnVtcE1hcCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMubm9ybWFsTWFwID0gdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXR0aW5nIHRoZSBgYnVtcFNjYWxlYCByZXV0cm5zIGl0cyB4IGNvbXBvbmVudCBvZiBgbm9ybWFsU2NhbGVgIChhc3N1bWluZyB4IGFuZCB5IGNvbXBvbmVudCBvZiBgbm9ybWFsU2NhbGVgIGFyZSBzYW1lKS5cbiAgICovXG4gIGdldCBidW1wU2NhbGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5ub3JtYWxTY2FsZS54O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHRpbmcgdGhlIGBidW1wU2NhbGVgIHdpbGwgYmUgY29udmVydCB0aGUgdmFsdWUgaW50byBWZWN0b3IyIGBub3JtYWxTY2FsZWAgLlxuICAgKi9cbiAgc2V0IGJ1bXBTY2FsZSh0OiBudW1iZXIpIHtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLnNldCh0LCB0KTtcbiAgfVxuXG4gIGdldCBlbWlzc2lvbk1hcCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZW1pc3NpdmVNYXA7XG4gIH1cblxuICBzZXQgZW1pc3Npb25NYXAodDogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gdDtcbiAgfVxuXG4gIGdldCBibGVuZE1vZGUoKTogTVRvb25NYXRlcmlhbFJlbmRlck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9ibGVuZE1vZGU7XG4gIH1cblxuICBzZXQgYmxlbmRNb2RlKG06IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlKSB7XG4gICAgdGhpcy5fYmxlbmRNb2RlID0gbTtcblxuICAgIHRoaXMuZGVwdGhXcml0ZSA9IHRoaXMuX2JsZW5kTW9kZSAhPT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQ7XG4gICAgdGhpcy50cmFuc3BhcmVudCA9XG4gICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50IHx8XG4gICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgZGVidWdNb2RlKCk6IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XG4gIH1cblxuICBzZXQgZGVidWdNb2RlKG06IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUpIHtcbiAgICB0aGlzLl9kZWJ1Z01vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVXaWR0aE1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVXaWR0aE1vZGUobTogTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBvdXRsaW5lQ29sb3JNb2RlKCk6IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZUNvbG9yTW9kZTtcbiAgfVxuXG4gIHNldCBvdXRsaW5lQ29sb3JNb2RlKG06IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgY3VsbE1vZGUoKTogTVRvb25NYXRlcmlhbEN1bGxNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fY3VsbE1vZGU7XG4gIH1cblxuICBzZXQgY3VsbE1vZGUobTogTVRvb25NYXRlcmlhbEN1bGxNb2RlKSB7XG4gICAgdGhpcy5fY3VsbE1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIGdldCBvdXRsaW5lQ3VsbE1vZGUoKTogTVRvb25NYXRlcmlhbEN1bGxNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZUN1bGxNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVDdWxsTW9kZShtOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lQ3VsbE1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIGdldCB6V3JpdGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kZXB0aFdyaXRlID8gMSA6IDA7XG4gIH1cblxuICBzZXQgeldyaXRlKGk6IG51bWJlcikge1xuICAgIHRoaXMuZGVwdGhXcml0ZSA9IDAuNSA8PSBpO1xuICB9XG5cbiAgZ2V0IGlzT3V0bGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNPdXRsaW5lO1xuICB9XG5cbiAgc2V0IGlzT3V0bGluZShiOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNPdXRsaW5lID0gYjtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGlzIG1hdGVyaWFsLlxuICAgKiBVc3VhbGx5IHRoaXMgd2lsbCBiZSBjYWxsZWQgdmlhIFtbVlJNLnVwZGF0ZV1dIHNvIHlvdSBkb24ndCBoYXZlIHRvIGNhbGwgdGhpcyBtYW51YWxseS5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZSBzaW5jZSBsYXN0IHVwZGF0ZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVZSTU1hdGVyaWFscyhkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fdXZBbmltT2Zmc2V0WCA9IHRoaXMuX3V2QW5pbU9mZnNldFggKyBkZWx0YSAqIHRoaXMudXZBbmltU2Nyb2xsWDtcbiAgICB0aGlzLl91dkFuaW1PZmZzZXRZID0gdGhpcy5fdXZBbmltT2Zmc2V0WSAtIGRlbHRhICogdGhpcy51dkFuaW1TY3JvbGxZOyAvLyBOZWdhdGl2ZSBzaW5jZSB0IGF4aXMgb2YgdXZzIGFyZSBvcHBvc2l0ZSBmcm9tIFVuaXR5J3Mgb25lXG4gICAgdGhpcy5fdXZBbmltUGhhc2UgPSB0aGlzLl91dkFuaW1QaGFzZSArIGRlbHRhICogdGhpcy51dkFuaW1Sb3RhdGlvbjtcblxuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1dG9mZiA9IHNvdXJjZS5jdXRvZmY7XG4gICAgdGhpcy5jb2xvci5jb3B5KHNvdXJjZS5jb2xvcik7XG4gICAgdGhpcy5zaGFkZUNvbG9yLmNvcHkoc291cmNlLnNoYWRlQ29sb3IpO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcbiAgICB0aGlzLm1haW5UZXhfU1QuY29weShzb3VyY2UubWFpblRleF9TVCk7XG4gICAgdGhpcy5zaGFkZVRleHR1cmUgPSBzb3VyY2Uuc2hhZGVUZXh0dXJlO1xuICAgIHRoaXMubm9ybWFsTWFwID0gc291cmNlLm5vcm1hbE1hcDtcbiAgICB0aGlzLm5vcm1hbE1hcFR5cGUgPSBzb3VyY2Uubm9ybWFsTWFwVHlwZTtcbiAgICB0aGlzLm5vcm1hbFNjYWxlLmNvcHkodGhpcy5ub3JtYWxTY2FsZSk7XG4gICAgdGhpcy5yZWNlaXZlU2hhZG93UmF0ZSA9IHNvdXJjZS5yZWNlaXZlU2hhZG93UmF0ZTtcbiAgICB0aGlzLnJlY2VpdmVTaGFkb3dUZXh0dXJlID0gc291cmNlLnJlY2VpdmVTaGFkb3dUZXh0dXJlO1xuICAgIHRoaXMuc2hhZGluZ0dyYWRlUmF0ZSA9IHNvdXJjZS5zaGFkaW5nR3JhZGVSYXRlO1xuICAgIHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSA9IHNvdXJjZS5zaGFkaW5nR3JhZGVUZXh0dXJlO1xuICAgIHRoaXMuc2hhZGVTaGlmdCA9IHNvdXJjZS5zaGFkZVNoaWZ0O1xuICAgIHRoaXMuc2hhZGVUb29ueSA9IHNvdXJjZS5zaGFkZVRvb255O1xuICAgIHRoaXMubGlnaHRDb2xvckF0dGVudWF0aW9uID0gc291cmNlLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcbiAgICB0aGlzLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkgPSBzb3VyY2UuaW5kaXJlY3RMaWdodEludGVuc2l0eTtcbiAgICB0aGlzLnJpbVRleHR1cmUgPSBzb3VyY2UucmltVGV4dHVyZTtcbiAgICB0aGlzLnJpbUNvbG9yLmNvcHkoc291cmNlLnJpbUNvbG9yKTtcbiAgICB0aGlzLnJpbUxpZ2h0aW5nTWl4ID0gc291cmNlLnJpbUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMucmltRnJlc25lbFBvd2VyID0gc291cmNlLnJpbUZyZXNuZWxQb3dlcjtcbiAgICB0aGlzLnJpbUxpZnQgPSBzb3VyY2UucmltTGlmdDtcbiAgICB0aGlzLnNwaGVyZUFkZCA9IHNvdXJjZS5zcGhlcmVBZGQ7XG4gICAgdGhpcy5lbWlzc2lvbkNvbG9yLmNvcHkoc291cmNlLmVtaXNzaW9uQ29sb3IpO1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSBzb3VyY2UuZW1pc3NpdmVNYXA7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhUZXh0dXJlID0gc291cmNlLm91dGxpbmVXaWR0aFRleHR1cmU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGggPSBzb3VyY2Uub3V0bGluZVdpZHRoO1xuICAgIHRoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlID0gc291cmNlLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTtcbiAgICB0aGlzLm91dGxpbmVDb2xvci5jb3B5KHNvdXJjZS5vdXRsaW5lQ29sb3IpO1xuICAgIHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4ID0gc291cmNlLm91dGxpbmVMaWdodGluZ01peDtcbiAgICB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlID0gc291cmNlLnV2QW5pbU1hc2tUZXh0dXJlO1xuICAgIHRoaXMudXZBbmltU2Nyb2xsWCA9IHNvdXJjZS51dkFuaW1TY3JvbGxYO1xuICAgIHRoaXMudXZBbmltU2Nyb2xsWSA9IHNvdXJjZS51dkFuaW1TY3JvbGxZO1xuICAgIHRoaXMudXZBbmltUm90YXRpb24gPSBzb3VyY2UudXZBbmltUm90YXRpb247XG5cbiAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XG4gICAgdGhpcy5ibGVuZE1vZGUgPSBzb3VyY2UuYmxlbmRNb2RlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNb2RlO1xuICAgIHRoaXMub3V0bGluZUNvbG9yTW9kZSA9IHNvdXJjZS5vdXRsaW5lQ29sb3JNb2RlO1xuICAgIHRoaXMuY3VsbE1vZGUgPSBzb3VyY2UuY3VsbE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lQ3VsbE1vZGUgPSBzb3VyY2Uub3V0bGluZUN1bGxNb2RlO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdXBkYXRlZCB1bmlmb3JtIHZhcmlhYmxlcy5cbiAgICovXG4gIHByaXZhdGUgX2FwcGx5VW5pZm9ybXMoKTogdm9pZCB7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1PZmZzZXRYLnZhbHVlID0gdGhpcy5fdXZBbmltT2Zmc2V0WDtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbU9mZnNldFkudmFsdWUgPSB0aGlzLl91dkFuaW1PZmZzZXRZO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltVGhldGEudmFsdWUgPSBUQVUgKiB0aGlzLl91dkFuaW1QaGFzZTtcblxuICAgIGlmICghdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IGZhbHNlO1xuXG4gICAgdGhpcy51bmlmb3Jtcy5jdXRvZmYudmFsdWUgPSB0aGlzLmN1dG9mZjtcbiAgICB0aGlzLnVuaWZvcm1zLmNvbG9yLnZhbHVlLnNldFJHQih0aGlzLmNvbG9yLngsIHRoaXMuY29sb3IueSwgdGhpcy5jb2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLmNvbG9yQWxwaGEudmFsdWUgPSB0aGlzLmNvbG9yLnc7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLnNoYWRlQ29sb3IueCwgdGhpcy5zaGFkZUNvbG9yLnksIHRoaXMuc2hhZGVDb2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZSA9IHRoaXMubWFwO1xuICAgIHRoaXMudW5pZm9ybXMubWFpblRleF9TVC52YWx1ZS5jb3B5KHRoaXMubWFpblRleF9TVCk7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZVRleHR1cmUudmFsdWUgPSB0aGlzLnNoYWRlVGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLm5vcm1hbE1hcC52YWx1ZSA9IHRoaXMubm9ybWFsTWFwO1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsU2NhbGUudmFsdWUuY29weSh0aGlzLm5vcm1hbFNjYWxlKTtcbiAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dSYXRlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93UmF0ZTtcbiAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dUZXh0dXJlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdHcmFkZVJhdGUudmFsdWUgPSB0aGlzLnNoYWRpbmdHcmFkZVJhdGU7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nR3JhZGVUZXh0dXJlLnZhbHVlID0gdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVTaGlmdC52YWx1ZSA9IHRoaXMuc2hhZGVTaGlmdDtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVG9vbnkudmFsdWUgPSB0aGlzLnNoYWRlVG9vbnk7XG4gICAgdGhpcy51bmlmb3Jtcy5saWdodENvbG9yQXR0ZW51YXRpb24udmFsdWUgPSB0aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcbiAgICB0aGlzLnVuaWZvcm1zLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkudmFsdWUgPSB0aGlzLmluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1UZXh0dXJlLnZhbHVlID0gdGhpcy5yaW1UZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMucmltQ29sb3IueCwgdGhpcy5yaW1Db2xvci55LCB0aGlzLnJpbUNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMucmltTGlnaHRpbmdNaXgudmFsdWUgPSB0aGlzLnJpbUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMudW5pZm9ybXMucmltRnJlc25lbFBvd2VyLnZhbHVlID0gdGhpcy5yaW1GcmVzbmVsUG93ZXI7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWZ0LnZhbHVlID0gdGhpcy5yaW1MaWZ0O1xuICAgIHRoaXMudW5pZm9ybXMuc3BoZXJlQWRkLnZhbHVlID0gdGhpcy5zcGhlcmVBZGQ7XG4gICAgdGhpcy51bmlmb3Jtcy5lbWlzc2lvbkNvbG9yLnZhbHVlLnNldFJHQih0aGlzLmVtaXNzaW9uQ29sb3IueCwgdGhpcy5lbWlzc2lvbkNvbG9yLnksIHRoaXMuZW1pc3Npb25Db2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlID0gdGhpcy5lbWlzc2l2ZU1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aFRleHR1cmUudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGgudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aDtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZS52YWx1ZSA9IHRoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLm91dGxpbmVDb2xvci54LCB0aGlzLm91dGxpbmVDb2xvci55LCB0aGlzLm91dGxpbmVDb2xvci56KTtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peC52YWx1ZSA9IHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltTWFza1RleHR1cmUudmFsdWUgPSB0aGlzLnV2QW5pbU1hc2tUZXh0dXJlO1xuXG4gICAgLy8gYXBwbHkgY29sb3Igc3BhY2UgdG8gdW5pZm9ybSBjb2xvcnNcbiAgICBpZiAodGhpcy5lbmNvZGluZyA9PT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zLmNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnJpbUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMuZW1pc3Npb25Db2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNoYWRlckNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWZpbmVzID0ge1xuICAgICAgT1VUTElORTogdGhpcy5faXNPdXRsaW5lLFxuICAgICAgQkxFTkRNT0RFX09QQVFVRTogdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5PcGFxdWUsXG4gICAgICBCTEVORE1PREVfQ1VUT1VUOiB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLkN1dG91dCxcbiAgICAgIEJMRU5ETU9ERV9UUkFOU1BBUkVOVDpcbiAgICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudCB8fFxuICAgICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICAgIFVTRV9TSEFERVRFWFRVUkU6IHRoaXMuc2hhZGVUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFOiB0aGlzLnJlY2VpdmVTaGFkb3dUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1NIQURJTkdHUkFERVRFWFRVUkU6IHRoaXMuc2hhZGluZ0dyYWRlVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9SSU1URVhUVVJFOiB0aGlzLnJpbVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU1BIRVJFQUREOiB0aGlzLnNwaGVyZUFkZCAhPT0gbnVsbCxcbiAgICAgIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFOiB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfVVZBTklNTUFTS1RFWFRVUkU6IHRoaXMudXZBbmltTWFza1RleHR1cmUgIT09IG51bGwsXG4gICAgICBERUJVR19OT1JNQUw6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob3JtYWwsXG4gICAgICBERUJVR19MSVRTSEFERVJBVEU6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5MaXRTaGFkZVJhdGUsXG4gICAgICBERUJVR19VVjogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLlVWLFxuICAgICAgT1VUTElORV9XSURUSF9XT1JMRDogdGhpcy5fb3V0bGluZVdpZHRoTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5TY3JlZW5Db29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfQ09MT1JfRklYRUQ6IHRoaXMuX291dGxpbmVDb2xvck1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLkZpeGVkQ29sb3IsXG4gICAgICBPVVRMSU5FX0NPTE9SX01JWEVEOiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZS5NaXhlZExpZ2h0aW5nLFxuICAgIH07XG5cbiAgICAvLyA9PSB0ZXh0dXJlIGVuY29kaW5ncyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgY29uc3QgZW5jb2RpbmdzID1cbiAgICAgICh0aGlzLnNoYWRlVGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbignc2hhZGVUZXh0dXJlVGV4ZWxUb0xpbmVhcicsIHRoaXMuc2hhZGVUZXh0dXJlLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpICtcbiAgICAgICh0aGlzLnNwaGVyZUFkZCAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbignc3BoZXJlQWRkVGV4ZWxUb0xpbmVhcicsIHRoaXMuc3BoZXJlQWRkLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpICtcbiAgICAgICh0aGlzLnJpbVRleHR1cmUgIT09IG51bGxcbiAgICAgICAgPyBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24oJ3JpbVRleHR1cmVUZXhlbFRvTGluZWFyJywgdGhpcy5yaW1UZXh0dXJlLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpO1xuXG4gICAgLy8gPT0gZ2VuZXJhdGUgc2hhZGVyIGNvZGUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudmVydGV4U2hhZGVyID0gdmVydGV4U2hhZGVyO1xuICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBlbmNvZGluZ3MgKyBmcmFnbWVudFNoYWRlcjtcblxuICAgIC8vID09IHNldCBuZWVkc1VwZGF0ZSBmbGFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUN1bGxGYWNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc091dGxpbmUpIHtcbiAgICAgIGlmICh0aGlzLmN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuT2ZmKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udCkge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2spIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRnJvbnRTaWRlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5PZmYpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5Gcm9udCkge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5CYWNrU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5CYWNrKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkZyb250U2lkZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IEdMVEZNZXNoLCBHTFRGUHJpbWl0aXZlLCBHTFRGU2NoZW1hLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBNVG9vbk1hdGVyaWFsLCBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSwgTVRvb25NYXRlcmlhbFJlbmRlck1vZGUgfSBmcm9tICcuL01Ub29uTWF0ZXJpYWwnO1xuaW1wb3J0IHsgVlJNVW5saXRNYXRlcmlhbCwgVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUgfSBmcm9tICcuL1ZSTVVubGl0TWF0ZXJpYWwnO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGEgW1tWUk1NYXRlcmlhbEltcG9ydGVyXV0gaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVlJNTWF0ZXJpYWxJbXBvcnRlck9wdGlvbnMge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZW5jb2Rpbmcgb2YgaW5wdXQgdW5pZm9ybSBjb2xvcnMgYW5kIHRleHR1cmVzLlxuICAgKlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYC5cbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLnNSR0JFbmNvZGluZ2AsIHVzZSBgVEhSRUUuc1JHQkVuY29kaW5nYC5cbiAgICpcbiAgICogVGhlIGltcG9ydGVyIHdpbGwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AgaWYgdGhpcyBvcHRpb24gaXNuJ3Qgc3BlY2lmaWVkLlxuICAgKlxuICAgKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vcmVuZGVyZXJzL1dlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmdcbiAgICovXG4gIGVuY29kaW5nPzogVEhSRUUuVGV4dHVyZUVuY29kaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGBQcm9taXNlYCBvZiBlbnZpcm9ubWVudCBtYXAgdGV4dHVyZS5cbiAgICogVGhlIGltcG9ydGVyIHdpbGwgYXR0ZW1wdCB0byBjYWxsIHRoaXMgZnVuY3Rpb24gd2hlbiBpdCBoYXZlIHRvIHVzZSBhbiBlbnZtYXAuXG4gICAqL1xuICByZXF1ZXN0RW52TWFwPzogKCkgPT4gUHJvbWlzZTxUSFJFRS5UZXh0dXJlIHwgbnVsbD47XG59XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIFZSTSBtYXRlcmlhbHMgZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxJbXBvcnRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2VuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3JlcXVlc3RFbnZNYXA/OiAoKSA9PiBQcm9taXNlPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTU1hdGVyaWFsSW1wb3J0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgb2YgdGhlIFZSTU1hdGVyaWFsSW1wb3J0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTU1hdGVyaWFsSW1wb3J0ZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLl9lbmNvZGluZyA9IG9wdGlvbnMuZW5jb2RpbmcgfHwgVEhSRUUuTGluZWFyRW5jb2Rpbmc7XG4gICAgaWYgKHRoaXMuX2VuY29kaW5nICE9PSBUSFJFRS5MaW5lYXJFbmNvZGluZyAmJiB0aGlzLl9lbmNvZGluZyAhPT0gVEhSRUUuc1JHQkVuY29kaW5nKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdUaGUgc3BlY2lmaWVkIGNvbG9yIGVuY29kaW5nIG1pZ2h0IG5vdCB3b3JrIHByb3Blcmx5IHdpdGggVlJNTWF0ZXJpYWxJbXBvcnRlci4gWW91IG1pZ2h0IHdhbnQgdG8gdXNlIFRIUkVFLnNSR0JFbmNvZGluZyBpbnN0ZWFkLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3JlcXVlc3RFbnZNYXAgPSBvcHRpb25zLnJlcXVlc3RFbnZNYXA7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhbGwgdGhlIG1hdGVyaWFscyBvZiBnaXZlbiBHTFRGIGJhc2VkIG9uIFZSTSBleHRlbnNpb24gZmllbGQgYG1hdGVyaWFsUHJvcGVydGllc2AuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNvbnZlcnRHTFRGTWF0ZXJpYWxzKGdsdGY6IEdMVEYpOiBQcm9taXNlPFRIUkVFLk1hdGVyaWFsW10gfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFsUHJvcGVydGllczogVlJNU2NoZW1hLk1hdGVyaWFsW10gfCB1bmRlZmluZWQgPSB2cm1FeHQubWF0ZXJpYWxQcm9wZXJ0aWVzO1xuICAgIGlmICghbWF0ZXJpYWxQcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoZXNNYXA6IEdMVEZNZXNoW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ21lc2gnKTtcbiAgICBjb25zdCBtYXRlcmlhbExpc3Q6IHsgW3ZybU1hdGVyaWFsSW5kZXg6IG51bWJlcl06IHsgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7IG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbCB9IH0gPSB7fTtcbiAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTsgLy8gcmVzdWx0XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIG1lc2hlc01hcC5tYXAoYXN5bmMgKG1lc2gsIG1lc2hJbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzY2hlbWFNZXNoOiBHTFRGU2NoZW1hLk1lc2ggPSBnbHRmLnBhcnNlci5qc29uLm1lc2hlcyFbbWVzaEluZGV4XTtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlczogR0xURlByaW1pdGl2ZVtdID1cbiAgICAgICAgICBtZXNoLnR5cGUgPT09ICdHcm91cCcgPyAobWVzaC5jaGlsZHJlbiBhcyBHTFRGUHJpbWl0aXZlW10pIDogW21lc2ggYXMgR0xURlByaW1pdGl2ZV07XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgcHJpbWl0aXZlcy5tYXAoYXN5bmMgKHByaW1pdGl2ZSwgcHJpbWl0aXZlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYVByaW1pdGl2ZSA9IHNjaGVtYU1lc2gucHJpbWl0aXZlc1twcmltaXRpdmVJbmRleF07XG5cbiAgICAgICAgICAgIC8vIHNvbWUgZ2xURiBtaWdodCBoYXZlIGJvdGggYG5vZGUubWVzaGAgYW5kIGBub2RlLmNoaWxkcmVuYCBhdCBvbmNlXG4gICAgICAgICAgICAvLyBhbmQgR0xURkxvYWRlciBoYW5kbGVzIGJvdGggbWVzaCBwcmltaXRpdmVzIGFuZCBcImNoaWxkcmVuXCIgaW4gZ2xURiBhcyBcImNoaWxkcmVuXCIgaW4gVEhSRUVcbiAgICAgICAgICAgIC8vIEl0IHNlZW1zIEdMVEZMb2FkZXIgaGFuZGxlcyBwcmltaXRpdmVzIGZpcnN0IHRoZW4gaGFuZGxlcyBcImNoaWxkcmVuXCIgaW4gZ2xURiAoaXQncyBsdWNreSEpXG4gICAgICAgICAgICAvLyBzbyB3ZSBzaG91bGQgaWdub3JlIChwcmltaXRpdmVzLmxlbmd0aCl0aCBhbmQgZm9sbG93aW5nIGNoaWxkcmVuIG9mIGBtZXNoLmNoaWxkcmVuYFxuICAgICAgICAgICAgLy8gVE9ETzogc2FuaXRpemUgdGhpcyBhZnRlciBHTFRGTG9hZGVyIHBsdWdpbiBzeXN0ZW0gZ2V0cyBpbnRyb2R1Y2VkIDogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE4NDIxXG4gICAgICAgICAgICBpZiAoIXNjaGVtYVByaW1pdGl2ZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZUdlb21ldHJ5ID0gcHJpbWl0aXZlLmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlVmVydGljZXMgPSBwcmltaXRpdmVHZW9tZXRyeS5pbmRleFxuICAgICAgICAgICAgICA/IHByaW1pdGl2ZUdlb21ldHJ5LmluZGV4LmNvdW50XG4gICAgICAgICAgICAgIDogcHJpbWl0aXZlR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudCAvIDM7XG5cbiAgICAgICAgICAgIC8vIGlmIHByaW1pdGl2ZXMgbWF0ZXJpYWwgaXMgbm90IGFuIGFycmF5LCBtYWtlIGl0IGFuIGFycmF5XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJpbWl0aXZlLm1hdGVyaWFsKSkge1xuICAgICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWwgPSBbcHJpbWl0aXZlLm1hdGVyaWFsXTtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlR2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjcmVhdGUgLyBwdXNoIHRvIGNhY2hlIChvciBwb3AgZnJvbSBjYWNoZSkgdnJtIG1hdGVyaWFsc1xuICAgICAgICAgICAgY29uc3QgdnJtTWF0ZXJpYWxJbmRleCA9IHNjaGVtYVByaW1pdGl2ZS5tYXRlcmlhbCE7XG5cbiAgICAgICAgICAgIGxldCBwcm9wcyA9IG1hdGVyaWFsUHJvcGVydGllc1t2cm1NYXRlcmlhbEluZGV4XTtcbiAgICAgICAgICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1NYXRlcmlhbEltcG9ydGVyOiBUaGVyZSBhcmUgbm8gbWF0ZXJpYWwgZGVmaW5pdGlvbiBmb3IgbWF0ZXJpYWwgIyR7dnJtTWF0ZXJpYWxJbmRleH0gb24gVlJNIGV4dGVuc2lvbi5gLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBwcm9wcyA9IHsgc2hhZGVyOiAnVlJNX1VTRV9HTFRGU0hBREVSJyB9OyAvLyBmYWxsYmFja1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdnJtTWF0ZXJpYWxzOiB7IHN1cmZhY2U6IFRIUkVFLk1hdGVyaWFsOyBvdXRsaW5lPzogVEhSRUUuTWF0ZXJpYWwgfTtcbiAgICAgICAgICAgIGlmIChtYXRlcmlhbExpc3RbdnJtTWF0ZXJpYWxJbmRleF0pIHtcbiAgICAgICAgICAgICAgdnJtTWF0ZXJpYWxzID0gbWF0ZXJpYWxMaXN0W3ZybU1hdGVyaWFsSW5kZXhdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdnJtTWF0ZXJpYWxzID0gYXdhaXQgdGhpcy5jcmVhdGVWUk1NYXRlcmlhbHMocHJpbWl0aXZlLm1hdGVyaWFsWzBdLCBwcm9wcywgZ2x0Zik7XG4gICAgICAgICAgICAgIG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XSA9IHZybU1hdGVyaWFscztcblxuICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaCh2cm1NYXRlcmlhbHMuc3VyZmFjZSk7XG4gICAgICAgICAgICAgIGlmICh2cm1NYXRlcmlhbHMub3V0bGluZSkge1xuICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKHZybU1hdGVyaWFscy5vdXRsaW5lKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdXJmYWNlXG4gICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWxbMF0gPSB2cm1NYXRlcmlhbHMuc3VyZmFjZTtcblxuICAgICAgICAgICAgLy8gZW52bWFwXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVxdWVzdEVudk1hcCAmJiAodnJtTWF0ZXJpYWxzLnN1cmZhY2UgYXMgYW55KS5pc01lc2hTdGFuZGFyZE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RFbnZNYXAoKS50aGVuKChlbnZNYXApID0+IHtcbiAgICAgICAgICAgICAgICAodnJtTWF0ZXJpYWxzLnN1cmZhY2UgYXMgYW55KS5lbnZNYXAgPSBlbnZNYXA7XG4gICAgICAgICAgICAgICAgdnJtTWF0ZXJpYWxzLnN1cmZhY2UubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVuZGVyIG9yZGVyXG4gICAgICAgICAgICBwcmltaXRpdmUucmVuZGVyT3JkZXIgPSBwcm9wcy5yZW5kZXJRdWV1ZSB8fCAyMDAwO1xuXG4gICAgICAgICAgICAvLyBvdXRsaW5lIChcIjIgcGFzcyBzaGFkaW5nIHVzaW5nIGdyb3Vwc1wiIHRyaWNrIGhlcmUpXG4gICAgICAgICAgICBpZiAodnJtTWF0ZXJpYWxzLm91dGxpbmUpIHtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlLm1hdGVyaWFsWzFdID0gdnJtTWF0ZXJpYWxzLm91dGxpbmU7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZUdlb21ldHJ5LmFkZEdyb3VwKDAsIHByaW1pdGl2ZVZlcnRpY2VzLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICByZXR1cm4gbWF0ZXJpYWxzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNyZWF0ZVZSTU1hdGVyaWFscyhcbiAgICBvcmlnaW5hbE1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCxcbiAgICB2cm1Qcm9wczogVlJNU2NoZW1hLk1hdGVyaWFsLFxuICAgIGdsdGY6IEdMVEYsXG4gICk6IFByb21pc2U8e1xuICAgIHN1cmZhY2U6IFRIUkVFLk1hdGVyaWFsO1xuICAgIG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbDtcbiAgfT4ge1xuICAgIGxldCBuZXdTdXJmYWNlOiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcbiAgICBsZXQgbmV3T3V0bGluZTogVEhSRUUuTWF0ZXJpYWwgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL01Ub29uJykge1xuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gZ2V0IHJpZCBvZiB0aGVzZSBwcm9wZXJ0aWVzXG4gICAgICBbJ3NyY0JsZW5kJywgJ2RzdEJsZW5kJywgJ2lzRmlyc3RTZXR1cCddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIHBhcmFtc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoZXNlIHRleHR1cmVzIG11c3QgYmUgc1JHQiBFbmNvZGluZywgZGVwZW5kcyBvbiBjdXJyZW50IGNvbG9yc3BhY2VcbiAgICAgIFsnbWFpblRleCcsICdzaGFkZVRleHR1cmUnLCAnZW1pc3Npb25NYXAnLCAnc3BoZXJlQWRkJywgJ3JpbVRleHR1cmUnXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGlmIChwYXJhbXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBhcmFtc1tuYW1lXS5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc3BlY2lmeSB1bmlmb3JtIGNvbG9yIGVuY29kaW5nc1xuICAgICAgcGFyYW1zLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG5cbiAgICAgIC8vIGRvbmVcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgTVRvb25NYXRlcmlhbChwYXJhbXMpO1xuXG4gICAgICAvLyBvdXRsaW5lXG4gICAgICBpZiAocGFyYW1zLm91dGxpbmVXaWR0aE1vZGUgIT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLk5vbmUpIHtcbiAgICAgICAgcGFyYW1zLmlzT3V0bGluZSA9IHRydWU7XG4gICAgICAgIG5ld091dGxpbmUgPSBuZXcgTVRvb25NYXRlcmlhbChwYXJhbXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0VGV4dHVyZScpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWU7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdEN1dG91dCcpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5DdXRvdXQ7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50Jykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50O1xuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBWUk1VbmxpdE1hdGVyaWFsKHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudFpXcml0ZScpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuICAgICAgcGFyYW1zLnJlbmRlclR5cGUgPSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZybVByb3BzLnNoYWRlciAhPT0gJ1ZSTV9VU0VfR0xURlNIQURFUicpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBVbmtub3duIHNoYWRlciBkZXRlY3RlZDogXCIke3ZybVByb3BzLnNoYWRlcn1cImApO1xuICAgICAgICAvLyB0aGVuIHByZXN1bWUgYXMgVlJNX1VTRV9HTFRGU0hBREVSXG4gICAgICB9XG5cbiAgICAgIG5ld1N1cmZhY2UgPSB0aGlzLl9jb252ZXJ0R0xURk1hdGVyaWFsKG9yaWdpbmFsTWF0ZXJpYWwuY2xvbmUoKSk7XG4gICAgfVxuXG4gICAgbmV3U3VyZmFjZS5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lO1xuICAgIG5ld1N1cmZhY2UudXNlckRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsTWF0ZXJpYWwudXNlckRhdGEpKTtcbiAgICBuZXdTdXJmYWNlLnVzZXJEYXRhLnZybU1hdGVyaWFsUHJvcGVydGllcyA9IHZybVByb3BzO1xuXG4gICAgaWYgKG5ld091dGxpbmUpIHtcbiAgICAgIG5ld091dGxpbmUubmFtZSA9IG9yaWdpbmFsTWF0ZXJpYWwubmFtZSArICcgKE91dGxpbmUpJztcbiAgICAgIG5ld091dGxpbmUudXNlckRhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsTWF0ZXJpYWwudXNlckRhdGEpKTtcbiAgICAgIG5ld091dGxpbmUudXNlckRhdGEudnJtTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdnJtUHJvcHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1cmZhY2U6IG5ld1N1cmZhY2UsXG4gICAgICBvdXRsaW5lOiBuZXdPdXRsaW5lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NYXRlcmlhbHM6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygxKTtcblxuICAgIGlmICghL1tBLVpdLy50ZXN0KG5hbWVbMF0pKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTU1hdGVyaWFsczogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVbMF0udG9Mb3dlckNhc2UoKSArIG5hbWUuc3Vic3RyaW5nKDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udmVydEdMVEZNYXRlcmlhbChtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiBUSFJFRS5NYXRlcmlhbCB7XG4gICAgaWYgKChtYXRlcmlhbCBhcyBhbnkpLmlzTWVzaFN0YW5kYXJkTWF0ZXJpYWwpIHtcbiAgICAgIGNvbnN0IG10bCA9IG1hdGVyaWFsIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsO1xuXG4gICAgICBpZiAobXRsLm1hcCkge1xuICAgICAgICBtdGwubWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICB9XG4gICAgICBpZiAobXRsLmVtaXNzaXZlTWFwKSB7XG4gICAgICAgIG10bC5lbWlzc2l2ZU1hcC5lbmNvZGluZyA9IHRoaXMuX2VuY29kaW5nO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZW5jb2RpbmcgPT09IFRIUkVFLkxpbmVhckVuY29kaW5nKSB7XG4gICAgICAgIG10bC5jb2xvci5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XG4gICAgICAgIG10bC5lbWlzc2l2ZS5jb252ZXJ0TGluZWFyVG9TUkdCKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKChtYXRlcmlhbCBhcyBhbnkpLmlzTWVzaEJhc2ljTWF0ZXJpYWwpIHtcbiAgICAgIGNvbnN0IG10bCA9IG1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsO1xuXG4gICAgICBpZiAobXRsLm1hcCkge1xuICAgICAgICBtdGwubWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lbmNvZGluZyA9PT0gVEhSRUUuTGluZWFyRW5jb2RpbmcpIHtcbiAgICAgICAgbXRsLmNvbG9yLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0ZXJpYWw7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKFxuICAgIG9yaWdpbmFsTWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsLFxuICAgIHZybVByb3BzOiBWUk1TY2hlbWEuTWF0ZXJpYWwsXG4gICAgZ2x0ZjogR0xURixcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YXNrTGlzdDogQXJyYXk8UHJvbWlzZTxhbnk+PiA9IFtdO1xuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge307XG5cbiAgICAvLyBleHRyYWN0IHRleHR1cmUgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllcykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzKSkge1xuICAgICAgICBjb25zdCBuZXdOYW1lID0gdGhpcy5fcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lKTtcbiAgICAgICAgY29uc3QgdGV4dHVyZUluZGV4ID0gdnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXNbbmFtZV07XG5cbiAgICAgICAgdGFza0xpc3QucHVzaChcbiAgICAgICAgICBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgdGV4dHVyZUluZGV4KS50aGVuKCh0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSB0ZXh0dXJlO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4dHJhY3QgZmxvYXQgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXMpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyh2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLl9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSB2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCB2ZWN0b3IgKGNvbG9yIHRiaCkgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMudmVjdG9yUHJvcGVydGllcykpIHtcbiAgICAgICAgbGV0IG5ld05hbWUgPSB0aGlzLl9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuXG4gICAgICAgIC8vIGlmIHRoaXMgaXMgdGV4dHVyZVNUIChzYW1lIG5hbWUgYXMgdGV4dHVyZSBuYW1lIGl0c2VsZiksIGFkZCAnX1NUJ1xuICAgICAgICBjb25zdCBpc1RleHR1cmVTVCA9IFtcbiAgICAgICAgICAnX01haW5UZXgnLFxuICAgICAgICAgICdfU2hhZGVUZXh0dXJlJyxcbiAgICAgICAgICAnX0J1bXBNYXAnLFxuICAgICAgICAgICdfUmVjZWl2ZVNoYWRvd1RleHR1cmUnLFxuICAgICAgICAgICdfU2hhZGluZ0dyYWRlVGV4dHVyZScsXG4gICAgICAgICAgJ19SaW1UZXh0dXJlJyxcbiAgICAgICAgICAnX1NwaGVyZUFkZCcsXG4gICAgICAgICAgJ19FbWlzc2lvbk1hcCcsXG4gICAgICAgICAgJ19PdXRsaW5lV2lkdGhUZXh0dXJlJyxcbiAgICAgICAgICAnX1V2QW5pbU1hc2tUZXh0dXJlJyxcbiAgICAgICAgXS5zb21lKCh0ZXh0dXJlTmFtZSkgPT4gbmFtZSA9PT0gdGV4dHVyZU5hbWUpO1xuICAgICAgICBpZiAoaXNUZXh0dXJlU1QpIHtcbiAgICAgICAgICBuZXdOYW1lICs9ICdfU1QnO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW25ld05hbWVdID0gbmV3IFRIUkVFLlZlY3RvcjQoLi4udnJtUHJvcHMudmVjdG9yUHJvcGVydGllc1tuYW1lXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZiAoaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vaXNzdWVzLzE3MilcbiAgICBpZiAodnJtUHJvcHMua2V5d29yZE1hcCEuX0FMUEhBVEVTVF9PTiAmJiBwYXJhbXMuYmxlbmRNb2RlID09PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5PcGFxdWUpIHtcbiAgICAgIHBhcmFtcy5ibGVuZE1vZGUgPSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5DdXRvdXQ7XG4gICAgfVxuXG4gICAgLy8gc2V0IHdoZXRoZXIgaXQgbmVlZHMgc2tpbm5pbmcgYW5kIG1vcnBoaW5nIG9yIG5vdFxuICAgIHBhcmFtcy5za2lubmluZyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkuc2tpbm5pbmcgfHwgZmFsc2U7XG4gICAgcGFyYW1zLm1vcnBoVGFyZ2V0cyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5tb3JwaE5vcm1hbHMgPSAob3JpZ2luYWxNYXRlcmlhbCBhcyBhbnkpLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdCkudGhlbigoKSA9PiBwYXJhbXMpO1xuICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvdW5saXQudmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL3VubGl0LmZyYWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZSTVVubGl0TWF0ZXJpYWxQYXJhbWV0ZXJzIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzIHtcbiAgY3V0b2ZmPzogbnVtYmVyOyAvLyBfQ3V0b2ZmXG4gIG1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4XG4gIG1haW5UZXg/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleCAod2lsbCBiZSByZW5hbWVkIHRvIG1hcClcbiAgbWFpblRleF9TVD86IFRIUkVFLlZlY3RvcjQ7IC8vIF9NYWluVGV4X1NUXG5cbiAgcmVuZGVyVHlwZT86IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgZW51bSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB7XG4gIE9wYXF1ZSxcbiAgQ3V0b3V0LFxuICBUcmFuc3BhcmVudCxcbiAgVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxufVxuXG4vKipcbiAqIFRoaXMgaXMgYSBtYXRlcmlhbCB0aGF0IGlzIGFuIGVxdWl2YWxlbnQgb2YgXCJWUk0vVW5saXQqKipcIiBvbiBWUk0gc3BlYywgdGhvc2UgbWF0ZXJpYWxzIGFyZSBhbHJlYWR5IGtpbmRhIGRlcHJlY2F0ZWQgdGhvdWdoLi4uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1VbmxpdE1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEgW1tWUk1VbmxpdE1hdGVyaWFsXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaXNWUk1VbmxpdE1hdGVyaWFsOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgY3V0b2ZmID0gMC41O1xuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9NYWluVGV4XG4gIHB1YmxpYyBtYWluVGV4X1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX01haW5UZXhfU1RcbiAgcHJpdmF0ZSBfcmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLk9wYXF1ZTtcblxuICBwdWJsaWMgc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7IC8vIHdoZW4gdGhpcyBpcyB0cnVlLCBhcHBseVVuaWZvcm1zIGVmZmVjdHNcblxuICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXJzPzogVlJNVW5saXRNYXRlcmlhbFBhcmFtZXRlcnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHBhcmFtZXRlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1ldGVycyA9IHt9O1xuICAgIH1cblxuICAgIC8vID09IGVuYWJsaW5nIGJ1bmNoIG9mIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLmZvZyA9IHRydWU7XG4gICAgcGFyYW1ldGVycy5jbGlwcGluZyA9IHRydWU7XG5cbiAgICBwYXJhbWV0ZXJzLnNraW5uaW5nID0gcGFyYW1ldGVycy5za2lubmluZyB8fCBmYWxzZTtcbiAgICBwYXJhbWV0ZXJzLm1vcnBoVGFyZ2V0cyA9IHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhOb3JtYWxzID0gcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgfHwgZmFsc2U7XG5cbiAgICAvLyA9PSB1bmlmb3JtcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy51bmlmb3JtcyA9IFRIUkVFLlVuaWZvcm1zVXRpbHMubWVyZ2UoW1xuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuY29tbW9uLCAvLyBtYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmZvZyxcbiAgICAgIHtcbiAgICAgICAgY3V0b2ZmOiB7IHZhbHVlOiAwLjUgfSxcbiAgICAgICAgbWFpblRleF9TVDogeyB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgfSxcbiAgICBdKTtcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgZ2V0IG1haW5UZXgoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hcDtcbiAgfVxuXG4gIHNldCBtYWluVGV4KHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5tYXAgPSB0O1xuICB9XG5cbiAgZ2V0IHJlbmRlclR5cGUoKTogVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJUeXBlO1xuICB9XG5cbiAgc2V0IHJlbmRlclR5cGUodDogVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUpIHtcbiAgICB0aGlzLl9yZW5kZXJUeXBlID0gdDtcblxuICAgIHRoaXMuZGVwdGhXcml0ZSA9IHRoaXMuX3JlbmRlclR5cGUgIT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50O1xuICAgIHRoaXMudHJhbnNwYXJlbnQgPVxuICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqIFVzdWFsbHkgdGhpcyB3aWxsIGJlIGNhbGxlZCB2aWEgW1tWUk0udXBkYXRlXV0gc28geW91IGRvbid0IGhhdmUgdG8gY2FsbCB0aGlzIG1hbnVhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVlJNTWF0ZXJpYWxzKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG5cbiAgICAvLyA9PSBjb3B5IG1lbWJlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5jdXRvZmYgPSBzb3VyY2UuY3V0b2ZmO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcbiAgICB0aGlzLm1haW5UZXhfU1QuY29weShzb3VyY2UubWFpblRleF9TVCk7XG4gICAgdGhpcy5yZW5kZXJUeXBlID0gc291cmNlLnJlbmRlclR5cGU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB1cGRhdGVkIHVuaWZvcm0gdmFyaWFibGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlVbmlmb3JtcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc2hvdWxkQXBwbHlVbmlmb3Jtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMgPSBmYWxzZTtcblxuICAgIHRoaXMudW5pZm9ybXMuY3V0b2ZmLnZhbHVlID0gdGhpcy5jdXRvZmY7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB0aGlzLm1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm1haW5UZXhfU1QudmFsdWUuY29weSh0aGlzLm1haW5UZXhfU1QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2hhZGVyQ29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmluZXMgPSB7XG4gICAgICBSRU5ERVJUWVBFX09QQVFVRTogdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuT3BhcXVlLFxuICAgICAgUkVOREVSVFlQRV9DVVRPVVQ6IHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLkN1dG91dCxcbiAgICAgIFJFTkRFUlRZUEVfVFJBTlNQQVJFTlQ6XG4gICAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50IHx8XG4gICAgICAgIHRoaXMuX3JlbmRlclR5cGUgPT09IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICB9O1xuXG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB2ZXJ0ZXhTaGFkZXI7XG4gICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGZyYWdtZW50U2hhZGVyO1xuXG4gICAgLy8gPT0gc2V0IG5lZWRzVXBkYXRlIGZsYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjb25zdCBnZXRFbmNvZGluZ0NvbXBvbmVudHMgPSAoZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZyk6IFtzdHJpbmcsIHN0cmluZ10gPT4ge1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSBUSFJFRS5MaW5lYXJFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ0xpbmVhcicsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLnNSR0JFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ3NSR0InLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JFRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JFJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCTTdFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgNy4wICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQk0xNkVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCAxNi4wICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQkRFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQkQnLCAnKCB2YWx1ZSwgMjU2LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuR2FtbWFFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ0dhbW1hJywgJyggdmFsdWUsIGZsb2F0KCBHQU1NQV9GQUNUT1IgKSApJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgZW5jb2Rpbmc6ICcgKyBlbmNvZGluZyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUZXhlbERlY29kaW5nRnVuY3Rpb24gPSAoZnVuY3Rpb25OYW1lOiBzdHJpbmcsIGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjb21wb25lbnRzID0gZ2V0RW5jb2RpbmdDb21wb25lbnRzKGVuY29kaW5nKTtcbiAgcmV0dXJuICd2ZWM0ICcgKyBmdW5jdGlvbk5hbWUgKyAnKCB2ZWM0IHZhbHVlICkgeyByZXR1cm4gJyArIGNvbXBvbmVudHNbMF0gKyAnVG9MaW5lYXInICsgY29tcG9uZW50c1sxXSArICc7IH0nO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vTVRvb25NYXRlcmlhbCc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTU1hdGVyaWFsSW1wb3J0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1VbmxpdE1hdGVyaWFsJztcbiIsImV4cG9ydCBkZWZhdWx0IFwiLy8gI2RlZmluZSBQSE9OR1xcblxcbiNpZmRlZiBCTEVORE1PREVfQ1VUT1VUXFxuICB1bmlmb3JtIGZsb2F0IGN1dG9mZjtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIHZlYzMgY29sb3I7XFxudW5pZm9ybSBmbG9hdCBjb2xvckFscGhhO1xcbnVuaWZvcm0gdmVjMyBzaGFkZUNvbG9yO1xcbiNpZmRlZiBVU0VfU0hBREVURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBzaGFkZVRleHR1cmU7XFxuI2VuZGlmXFxuXFxudW5pZm9ybSBmbG9hdCByZWNlaXZlU2hhZG93UmF0ZTtcXG4jaWZkZWYgVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCByZWNlaXZlU2hhZG93VGV4dHVyZTtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIGZsb2F0IHNoYWRpbmdHcmFkZVJhdGU7XFxuI2lmZGVmIFVTRV9TSEFESU5HR1JBREVURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBzaGFkaW5nR3JhZGVUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgc2hhZGVTaGlmdDtcXG51bmlmb3JtIGZsb2F0IHNoYWRlVG9vbnk7XFxudW5pZm9ybSBmbG9hdCBsaWdodENvbG9yQXR0ZW51YXRpb247XFxudW5pZm9ybSBmbG9hdCBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5O1xcblxcbiNpZmRlZiBVU0VfUklNVEVYVFVSRVxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgcmltVGV4dHVyZTtcXG4jZW5kaWZcXG51bmlmb3JtIHZlYzMgcmltQ29sb3I7XFxudW5pZm9ybSBmbG9hdCByaW1MaWdodGluZ01peDtcXG51bmlmb3JtIGZsb2F0IHJpbUZyZXNuZWxQb3dlcjtcXG51bmlmb3JtIGZsb2F0IHJpbUxpZnQ7XFxuXFxuI2lmZGVmIFVTRV9TUEhFUkVBRERcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNwaGVyZUFkZDtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIHZlYzMgZW1pc3Npb25Db2xvcjtcXG5cXG51bmlmb3JtIHZlYzMgb3V0bGluZUNvbG9yO1xcbnVuaWZvcm0gZmxvYXQgb3V0bGluZUxpZ2h0aW5nTWl4O1xcblxcbiNpZmRlZiBVU0VfVVZBTklNTUFTS1RFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHV2QW5pbU1hc2tUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgdXZBbmltT2Zmc2V0WDtcXG51bmlmb3JtIGZsb2F0IHV2QW5pbU9mZnNldFk7XFxudW5pZm9ybSBmbG9hdCB1dkFuaW1UaGV0YTtcXG5cXG4jaW5jbHVkZSA8Y29tbW9uPlxcbiNpbmNsdWRlIDxwYWNraW5nPlxcbiNpbmNsdWRlIDxkaXRoZXJpbmdfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8Y29sb3JfcGFyc19mcmFnbWVudD5cXG5cXG4vLyAjaW5jbHVkZSA8dXZfcGFyc19mcmFnbWVudD5cXG4jaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1VWQU5JTU1BU0tURVhUVVJFIClcXG4gIHZhcnlpbmcgdmVjMiB2VXY7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YWxwaGFtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8YW9tYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8bGlnaHRtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8ZW1pc3NpdmVtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8ZW52bWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGdyYWRpZW50bWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGZvZ19wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxic2Rmcz5cXG4jaW5jbHVkZSA8bGlnaHRzX3BhcnNfYmVnaW4+XFxuXFxuLy8gI2luY2x1ZGUgPGxpZ2h0c19waG9uZ19wYXJzX2ZyYWdtZW50PlxcbnZhcnlpbmcgdmVjMyB2Vmlld1Bvc2l0aW9uO1xcblxcbiNpZm5kZWYgRkxBVF9TSEFERURcXG4gIHZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xcbiNlbmRpZlxcblxcbiNkZWZpbmUgTWF0ZXJpYWxfTGlnaHRQcm9iZUxPRCggbWF0ZXJpYWwgKSAoMClcXG5cXG4jaW5jbHVkZSA8c2hhZG93bWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGJ1bXBtYXBfcGFyc19mcmFnbWVudD5cXG5cXG4vLyAjaW5jbHVkZSA8bm9ybWFsbWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2lmZGVmIFVTRV9OT1JNQUxNQVBcXG5cXG4gIHVuaWZvcm0gc2FtcGxlcjJEIG5vcm1hbE1hcDtcXG4gIHVuaWZvcm0gdmVjMiBub3JtYWxTY2FsZTtcXG5cXG4jZW5kaWZcXG5cXG4jaWZkZWYgT0JKRUNUU1BBQ0VfTk9STUFMTUFQXFxuXFxuICB1bmlmb3JtIG1hdDMgbm9ybWFsTWF0cml4O1xcblxcbiNlbmRpZlxcblxcbiNpZiAhIGRlZmluZWQgKCBVU0VfVEFOR0VOVCApICYmIGRlZmluZWQgKCBUQU5HRU5UU1BBQ0VfTk9STUFMTUFQIClcXG5cXG4gIC8vIFBlci1QaXhlbCBUYW5nZW50IFNwYWNlIE5vcm1hbCBNYXBwaW5nXFxuICAvLyBodHRwOi8vaGFja3NvZmxpZmUuYmxvZ3Nwb3QuY2gvMjAwOS8xMS9wZXItcGl4ZWwtdGFuZ2VudC1zcGFjZS1ub3JtYWwtbWFwcGluZy5odG1sXFxuXFxuICAvLyB0aHJlZS12cm0gc3BlY2lmaWMgY2hhbmdlOiBpdCByZXF1aXJlcyBgdXZgIGFzIGFuIGlucHV0IGluIG9yZGVyIHRvIHN1cHBvcnQgdXYgc2Nyb2xsc1xcblxcbiAgdmVjMyBwZXJ0dXJiTm9ybWFsMkFyYiggdmVjMiB1diwgdmVjMyBleWVfcG9zLCB2ZWMzIHN1cmZfbm9ybSwgdmVjMyBtYXBOICkge1xcblxcbiAgICAvLyBXb3JrYXJvdW5kIGZvciBBZHJlbm8gM1hYIGRGZCooIHZlYzMgKSBidWcuIFNlZSAjOTk4OFxcblxcbiAgICB2ZWMzIHEwID0gdmVjMyggZEZkeCggZXllX3Bvcy54ICksIGRGZHgoIGV5ZV9wb3MueSApLCBkRmR4KCBleWVfcG9zLnogKSApO1xcbiAgICB2ZWMzIHExID0gdmVjMyggZEZkeSggZXllX3Bvcy54ICksIGRGZHkoIGV5ZV9wb3MueSApLCBkRmR5KCBleWVfcG9zLnogKSApO1xcbiAgICB2ZWMyIHN0MCA9IGRGZHgoIHV2LnN0ICk7XFxuICAgIHZlYzIgc3QxID0gZEZkeSggdXYuc3QgKTtcXG5cXG4gICAgZmxvYXQgc2NhbGUgPSBzaWduKCBzdDEudCAqIHN0MC5zIC0gc3QwLnQgKiBzdDEucyApOyAvLyB3ZSBkbyBub3QgY2FyZSBhYm91dCB0aGUgbWFnbml0dWRlXFxuXFxuICAgIHZlYzMgUyA9ICggcTAgKiBzdDEudCAtIHExICogc3QwLnQgKSAqIHNjYWxlO1xcbiAgICB2ZWMzIFQgPSAoIC0gcTAgKiBzdDEucyArIHExICogc3QwLnMgKSAqIHNjYWxlO1xcblxcbiAgICAvLyB0aHJlZS12cm0gc3BlY2lmaWMgY2hhbmdlOiBXb3JrYXJvdW5kIGZvciB0aGUgaXNzdWUgdGhhdCBoYXBwZW5zIHdoZW4gZGVsdGEgb2YgdXYgPSAwLjBcXG4gICAgLy8gVE9ETzogSXMgdGhpcyBzdGlsbCByZXF1aXJlZD8gT3Igc2hhbGwgSSBtYWtlIGEgUFIgYWJvdXQgaXQ/XFxuXFxuICAgIGlmICggbGVuZ3RoKCBTICkgPT0gMC4wIHx8IGxlbmd0aCggVCApID09IDAuMCApIHtcXG4gICAgICByZXR1cm4gc3VyZl9ub3JtO1xcbiAgICB9XFxuXFxuICAgIFMgPSBub3JtYWxpemUoIFMgKTtcXG4gICAgVCA9IG5vcm1hbGl6ZSggVCApO1xcbiAgICB2ZWMzIE4gPSBub3JtYWxpemUoIHN1cmZfbm9ybSApO1xcblxcbiAgICAjaWZkZWYgRE9VQkxFX1NJREVEXFxuXFxuICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgQWRyZW5vIEdQVXMgZ2xfRnJvbnRGYWNpbmcgYnVnLiBTZWUgIzE1ODUwIGFuZCAjMTAzMzFcXG5cXG4gICAgICBib29sIGZyb250RmFjaW5nID0gZG90KCBjcm9zcyggUywgVCApLCBOICkgPiAwLjA7XFxuXFxuICAgICAgbWFwTi54eSAqPSAoIGZsb2F0KCBmcm9udEZhY2luZyApICogMi4wIC0gMS4wICk7XFxuXFxuICAgICNlbHNlXFxuXFxuICAgICAgbWFwTi54eSAqPSAoIGZsb2F0KCBnbF9Gcm9udEZhY2luZyApICogMi4wIC0gMS4wICk7XFxuXFxuICAgICNlbmRpZlxcblxcbiAgICBtYXQzIHRzbiA9IG1hdDMoIFMsIFQsIE4gKTtcXG4gICAgcmV0dXJuIG5vcm1hbGl6ZSggdHNuICogbWFwTiApO1xcblxcbiAgfVxcblxcbiNlbmRpZlxcblxcbi8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc19mcmFnbWVudD5cXG5cXG4vLyA9PSBsaWdodGluZyBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbmZsb2F0IGdldExpZ2h0SW50ZW5zaXR5KFxcbiAgY29uc3QgaW4gSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodCxcXG4gIGNvbnN0IGluIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnksXFxuICBjb25zdCBpbiBmbG9hdCBzaGFkb3csXFxuICBjb25zdCBpbiBmbG9hdCBzaGFkaW5nR3JhZGVcXG4pIHtcXG4gIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZG90KCBnZW9tZXRyeS5ub3JtYWwsIGRpcmVjdExpZ2h0LmRpcmVjdGlvbiApO1xcbiAgbGlnaHRJbnRlbnNpdHkgPSAwLjUgKyAwLjUgKiBsaWdodEludGVuc2l0eTtcXG4gIGxpZ2h0SW50ZW5zaXR5ID0gbGlnaHRJbnRlbnNpdHkgKiBzaGFkb3c7XFxuICBsaWdodEludGVuc2l0eSA9IGxpZ2h0SW50ZW5zaXR5ICogc2hhZGluZ0dyYWRlO1xcbiAgbGlnaHRJbnRlbnNpdHkgPSBsaWdodEludGVuc2l0eSAqIDIuMCAtIDEuMDtcXG4gIHJldHVybiBzaGFkZVRvb255ID09IDEuMFxcbiAgICA/IHN0ZXAoIHNoYWRlU2hpZnQsIGxpZ2h0SW50ZW5zaXR5IClcXG4gICAgOiBzbW9vdGhzdGVwKCBzaGFkZVNoaWZ0LCBzaGFkZVNoaWZ0ICsgKCAxLjAgLSBzaGFkZVRvb255ICksIGxpZ2h0SW50ZW5zaXR5ICk7XFxufVxcblxcbnZlYzMgZ2V0TGlnaHRpbmcoIGNvbnN0IGluIHZlYzMgbGlnaHRDb2xvciApIHtcXG4gIHZlYzMgbGlnaHRpbmcgPSBsaWdodENvbG9yO1xcbiAgbGlnaHRpbmcgPSBtaXgoXFxuICAgIGxpZ2h0aW5nLFxcbiAgICB2ZWMzKCBtYXgoIDAuMDAxLCBtYXgoIGxpZ2h0aW5nLngsIG1heCggbGlnaHRpbmcueSwgbGlnaHRpbmcueiApICkgKSApLFxcbiAgICBsaWdodENvbG9yQXR0ZW51YXRpb25cXG4gICk7XFxuXFxuICAjaWZuZGVmIFBIWVNJQ0FMTFlfQ09SUkVDVF9MSUdIVFNcXG4gICAgbGlnaHRpbmcgKj0gUEk7XFxuICAjZW5kaWZcXG5cXG4gIHJldHVybiBsaWdodGluZztcXG59XFxuXFxudmVjMyBnZXREaWZmdXNlKFxcbiAgY29uc3QgaW4gdmVjMyBsaXQsXFxuICBjb25zdCBpbiB2ZWMzIHNoYWRlLFxcbiAgY29uc3QgaW4gZmxvYXQgbGlnaHRJbnRlbnNpdHksXFxuICBjb25zdCBpbiB2ZWMzIGxpZ2h0aW5nXFxuKSB7XFxuICAjaWZkZWYgREVCVUdfTElUU0hBREVSQVRFXFxuICAgIHJldHVybiB2ZWMzKCBCUkRGX0RpZmZ1c2VfTGFtYmVydCggbGlnaHRJbnRlbnNpdHkgKiBsaWdodGluZyApICk7XFxuICAjZW5kaWZcXG5cXG4gIHJldHVybiBsaWdodGluZyAqIEJSREZfRGlmZnVzZV9MYW1iZXJ0KCBtaXgoIHNoYWRlLCBsaXQsIGxpZ2h0SW50ZW5zaXR5ICkgKTtcXG59XFxuXFxudmVjMyBjYWxjRGlyZWN0RGlmZnVzZShcXG4gIGNvbnN0IGluIHZlYzIgdXYsXFxuICBjb25zdCBpbiB2ZWMzIGxpdCxcXG4gIGNvbnN0IGluIHZlYzMgc2hhZGUsXFxuICBpbiBHZW9tZXRyaWNDb250ZXh0IGdlb21ldHJ5LFxcbiAgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHRcXG4pIHtcXG4gIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQ7XFxuICB2ZWMzIGxpZ2h0aW5nU3VtID0gdmVjMyggMC4wICk7XFxuXFxuICBmbG9hdCBzaGFkaW5nR3JhZGUgPSAxLjA7XFxuICAjaWZkZWYgVVNFX1NIQURJTkdHUkFERVRFWFRVUkVcXG4gICAgc2hhZGluZ0dyYWRlID0gMS4wIC0gc2hhZGluZ0dyYWRlUmF0ZSAqICggMS4wIC0gdGV4dHVyZTJEKCBzaGFkaW5nR3JhZGVUZXh0dXJlLCB1diApLnIgKTtcXG4gICNlbmRpZlxcblxcbiAgZmxvYXQgcmVjZWl2ZVNoYWRvdyA9IHJlY2VpdmVTaGFkb3dSYXRlO1xcbiAgI2lmZGVmIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRVxcbiAgICByZWNlaXZlU2hhZG93ICo9IHRleHR1cmUyRCggcmVjZWl2ZVNoYWRvd1RleHR1cmUsIHV2ICkuYTtcXG4gICNlbmRpZlxcblxcbiAgI2lmICggTlVNX1BPSU5UX0xJR0hUUyA+IDAgKVxcbiAgICBQb2ludExpZ2h0IHBvaW50TGlnaHQ7XFxuXFxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcXG4gICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX1BPSU5UX0xJR0hUUzsgaSArKyApIHtcXG4gICAgICBwb2ludExpZ2h0ID0gcG9pbnRMaWdodHNbIGkgXTtcXG4gICAgICBnZXRQb2ludERpcmVjdExpZ2h0SXJyYWRpYW5jZSggcG9pbnRMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XFxuXFxuICAgICAgZmxvYXQgYXR0ZW4gPSAxLjA7XFxuICAgICAgI2lmZGVmIFVTRV9TSEFET1dNQVBcXG4gICAgICAgIGF0dGVuID0gYWxsKCBidmVjMiggcG9pbnRMaWdodC5zaGFkb3csIGRpcmVjdExpZ2h0LnZpc2libGUgKSApID8gZ2V0UG9pbnRTaGFkb3coIHBvaW50U2hhZG93TWFwWyBpIF0sIHBvaW50TGlnaHQuc2hhZG93TWFwU2l6ZSwgcG9pbnRMaWdodC5zaGFkb3dCaWFzLCBwb2ludExpZ2h0LnNoYWRvd1JhZGl1cywgdlBvaW50U2hhZG93Q29vcmRbIGkgXSwgcG9pbnRMaWdodC5zaGFkb3dDYW1lcmFOZWFyLCBwb2ludExpZ2h0LnNoYWRvd0NhbWVyYUZhciApIDogMS4wO1xcbiAgICAgICNlbmRpZlxcblxcbiAgICAgIGZsb2F0IHNoYWRvdyA9IDEuMCAtIHJlY2VpdmVTaGFkb3cgKiAoIDEuMCAtICggMC41ICsgMC41ICogYXR0ZW4gKSApO1xcbiAgICAgIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZ2V0TGlnaHRJbnRlbnNpdHkoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgc2hhZG93LCBzaGFkaW5nR3JhZGUgKTtcXG4gICAgICB2ZWMzIGxpZ2h0aW5nID0gZ2V0TGlnaHRpbmcoIGRpcmVjdExpZ2h0LmNvbG9yICk7XFxuICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBsaXQsIHNoYWRlLCBsaWdodEludGVuc2l0eSwgbGlnaHRpbmcgKTtcXG4gICAgICBsaWdodGluZ1N1bSArPSBsaWdodGluZztcXG4gICAgfVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxcbiAgI2VuZGlmXFxuXFxuICAjaWYgKCBOVU1fU1BPVF9MSUdIVFMgPiAwIClcXG4gICAgU3BvdExpZ2h0IHNwb3RMaWdodDtcXG5cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fU1BPVF9MSUdIVFM7IGkgKysgKSB7XFxuICAgICAgc3BvdExpZ2h0ID0gc3BvdExpZ2h0c1sgaSBdO1xcbiAgICAgIGdldFNwb3REaXJlY3RMaWdodElycmFkaWFuY2UoIHNwb3RMaWdodCwgZ2VvbWV0cnksIGRpcmVjdExpZ2h0ICk7XFxuXFxuICAgICAgZmxvYXQgYXR0ZW4gPSAxLjA7XFxuICAgICAgI2lmZGVmIFVTRV9TSEFET1dNQVBcXG4gICAgICAgIGF0dGVuID0gYWxsKCBidmVjMiggc3BvdExpZ2h0LnNoYWRvdywgZGlyZWN0TGlnaHQudmlzaWJsZSApICkgPyBnZXRTaGFkb3coIHNwb3RTaGFkb3dNYXBbIGkgXSwgc3BvdExpZ2h0LnNoYWRvd01hcFNpemUsIHNwb3RMaWdodC5zaGFkb3dCaWFzLCBzcG90TGlnaHQuc2hhZG93UmFkaXVzLCB2U3BvdFNoYWRvd0Nvb3JkWyBpIF0gKSA6IDEuMDtcXG4gICAgICAjZW5kaWZcXG5cXG4gICAgICBmbG9hdCBzaGFkb3cgPSAxLjAgLSByZWNlaXZlU2hhZG93ICogKCAxLjAgLSAoIDAuNSArIDAuNSAqIGF0dGVuICkgKTtcXG4gICAgICBmbG9hdCBsaWdodEludGVuc2l0eSA9IGdldExpZ2h0SW50ZW5zaXR5KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnksIHNoYWRvdywgc2hhZGluZ0dyYWRlICk7XFxuICAgICAgdmVjMyBsaWdodGluZyA9IGdldExpZ2h0aW5nKCBkaXJlY3RMaWdodC5jb2xvciApO1xcbiAgICAgIHJlZmxlY3RlZExpZ2h0LmRpcmVjdERpZmZ1c2UgKz0gZ2V0RGlmZnVzZSggbGl0LCBzaGFkZSwgbGlnaHRJbnRlbnNpdHksIGxpZ2h0aW5nICk7XFxuICAgICAgbGlnaHRpbmdTdW0gKz0gbGlnaHRpbmc7XFxuICAgIH1cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcXG4gICNlbmRpZlxcblxcbiAgI2lmICggTlVNX0RJUl9MSUdIVFMgPiAwIClcXG4gICAgRGlyZWN0aW9uYWxMaWdodCBkaXJlY3Rpb25hbExpZ2h0O1xcblxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9ESVJfTElHSFRTOyBpICsrICkge1xcbiAgICAgIGRpcmVjdGlvbmFsTGlnaHQgPSBkaXJlY3Rpb25hbExpZ2h0c1sgaSBdO1xcbiAgICAgIGdldERpcmVjdGlvbmFsRGlyZWN0TGlnaHRJcnJhZGlhbmNlKCBkaXJlY3Rpb25hbExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcXG5cXG4gICAgICBmbG9hdCBhdHRlbiA9IDEuMDtcXG4gICAgICAjaWZkZWYgVVNFX1NIQURPV01BUFxcbiAgICAgICAgYXR0ZW4gPSBhbGwoIGJ2ZWMyKCBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvdywgZGlyZWN0TGlnaHQudmlzaWJsZSApICkgPyBnZXRTaGFkb3coIGRpcmVjdGlvbmFsU2hhZG93TWFwWyBpIF0sIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93TWFwU2l6ZSwgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3dCaWFzLCBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvd1JhZGl1cywgdkRpcmVjdGlvbmFsU2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xcbiAgICAgICNlbmRpZlxcblxcbiAgICAgIGZsb2F0IHNoYWRvdyA9IDEuMCAtIHJlY2VpdmVTaGFkb3cgKiAoIDEuMCAtICggMC41ICsgMC41ICogYXR0ZW4gKSApO1xcbiAgICAgIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZ2V0TGlnaHRJbnRlbnNpdHkoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgc2hhZG93LCBzaGFkaW5nR3JhZGUgKTtcXG4gICAgICB2ZWMzIGxpZ2h0aW5nID0gZ2V0TGlnaHRpbmcoIGRpcmVjdExpZ2h0LmNvbG9yICk7XFxuICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBsaXQsIHNoYWRlLCBsaWdodEludGVuc2l0eSwgbGlnaHRpbmcgKTtcXG4gICAgICBsaWdodGluZ1N1bSArPSBsaWdodGluZztcXG4gICAgfVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxcbiAgI2VuZGlmXFxuXFxuICByZXR1cm4gbGlnaHRpbmdTdW07XFxufVxcblxcbi8vID09IHBvc3QgY29ycmVjdGlvbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxudm9pZCBwb3N0Q29ycmVjdGlvbigpIHtcXG4gICNpbmNsdWRlIDx0b25lbWFwcGluZ19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxlbmNvZGluZ3NfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8Zm9nX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPHByZW11bHRpcGxpZWRfYWxwaGFfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8ZGl0aGVyaW5nX2ZyYWdtZW50Plxcbn1cXG5cXG4vLyA9PSBtYWluIHByb2NlZHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbnZvaWQgbWFpbigpIHtcXG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfZnJhZ21lbnQ+XFxuXFxuICB2ZWMyIHV2ID0gdmVjMigwLjUsIDAuNSk7XFxuXFxuICAjaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1VWQU5JTU1BU0tURVhUVVJFIClcXG4gICAgdXYgPSB2VXY7XFxuXFxuICAgIGZsb2F0IHV2QW5pbU1hc2sgPSAxLjA7XFxuICAgICNpZmRlZiBVU0VfVVZBTklNTUFTS1RFWFRVUkVcXG4gICAgICB1dkFuaW1NYXNrID0gdGV4dHVyZTJEKCB1dkFuaW1NYXNrVGV4dHVyZSwgdXYgKS54O1xcbiAgICAjZW5kaWZcXG5cXG4gICAgdXYgPSB1diArIHZlYzIoIHV2QW5pbU9mZnNldFgsIHV2QW5pbU9mZnNldFkgKSAqIHV2QW5pbU1hc2s7XFxuICAgIGZsb2F0IHV2Um90Q29zID0gY29zKCB1dkFuaW1UaGV0YSAqIHV2QW5pbU1hc2sgKTtcXG4gICAgZmxvYXQgdXZSb3RTaW4gPSBzaW4oIHV2QW5pbVRoZXRhICogdXZBbmltTWFzayApO1xcbiAgICB1diA9IG1hdDIoIHV2Um90Q29zLCB1dlJvdFNpbiwgLXV2Um90U2luLCB1dlJvdENvcyApICogKCB1diAtIDAuNSApICsgMC41O1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgREVCVUdfVVZcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggMC4wLCAwLjAsIDAuMCwgMS4wICk7XFxuICAgICNpZiBkZWZpbmVkKCBVU0VfTUFQICkgfHwgZGVmaW5lZCggVVNFX1NIQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9OT1JNQUxNQVAgKSB8fCBkZWZpbmVkKCBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfU0hBRElOR0dSQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9SSU1URVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX0VNSVNTSVZFTUFQICkgfHwgZGVmaW5lZCggVVNFX09VVExJTkVXSURUSFRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfVVZBTklNTUFTS1RFWFRVUkUgKVxcbiAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIHV2LCAwLjAsIDEuMCApO1xcbiAgICAjZW5kaWZcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICB2ZWM0IGRpZmZ1c2VDb2xvciA9IHZlYzQoIGNvbG9yLCBjb2xvckFscGhhICk7XFxuICBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodCA9IFJlZmxlY3RlZExpZ2h0KCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSApO1xcbiAgdmVjMyB0b3RhbEVtaXNzaXZlUmFkaWFuY2UgPSBlbWlzc2lvbkNvbG9yO1xcblxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX2ZyYWdtZW50PlxcblxcbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIGRpZmZ1c2VDb2xvciAqPSBtYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIG1hcCwgdXYgKSApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8Y29sb3JfZnJhZ21lbnQ+XFxuICAvLyAjaW5jbHVkZSA8YWxwaGFtYXBfZnJhZ21lbnQ+XFxuXFxuICAvLyAtLSBNVG9vbjogYWxwaGEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIC8vICNpbmNsdWRlIDxhbHBoYXRlc3RfZnJhZ21lbnQ+XFxuICAjaWZkZWYgQkxFTkRNT0RFX0NVVE9VVFxcbiAgICBpZiAoIGRpZmZ1c2VDb2xvci5hIDw9IGN1dG9mZiApIHsgZGlzY2FyZDsgfVxcbiAgICBkaWZmdXNlQ29sb3IuYSA9IDEuMDtcXG4gICNlbmRpZlxcblxcbiAgI2lmZGVmIEJMRU5ETU9ERV9PUEFRVUVcXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gICNpZiBkZWZpbmVkKCBPVVRMSU5FICkgJiYgZGVmaW5lZCggT1VUTElORV9DT0xPUl9GSVhFRCApIC8vIG9taXR0aW5nIERlYnVnTW9kZVxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBvdXRsaW5lQ29sb3IsIGRpZmZ1c2VDb2xvci5hICk7XFxuICAgIHBvc3RDb3JyZWN0aW9uKCk7XFxuICAgIHJldHVybjtcXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9iZWdpbj5cXG5cXG4gICNpZmRlZiBPVVRMSU5FXFxuICAgIG5vcm1hbCAqPSAtMS4wO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8bm9ybWFsX2ZyYWdtZW50X21hcHM+XFxuXFxuICAjaWZkZWYgT0JKRUNUU1BBQ0VfTk9STUFMTUFQXFxuXFxuICAgIG5vcm1hbCA9IHRleHR1cmUyRCggbm9ybWFsTWFwLCB1diApLnh5eiAqIDIuMCAtIDEuMDsgLy8gb3ZlcnJpZGVzIGJvdGggZmxhdFNoYWRpbmcgYW5kIGF0dHJpYnV0ZSBub3JtYWxzXFxuXFxuICAgICNpZmRlZiBGTElQX1NJREVEXFxuXFxuICAgICAgbm9ybWFsID0gLSBub3JtYWw7XFxuXFxuICAgICNlbmRpZlxcblxcbiAgICAjaWZkZWYgRE9VQkxFX1NJREVEXFxuXFxuICAgICAgbm9ybWFsID0gbm9ybWFsICogKCBmbG9hdCggZ2xfRnJvbnRGYWNpbmcgKSAqIDIuMCAtIDEuMCApO1xcblxcbiAgICAjZW5kaWZcXG5cXG4gICAgbm9ybWFsID0gbm9ybWFsaXplKCBub3JtYWxNYXRyaXggKiBub3JtYWwgKTtcXG5cXG4gICNlbGlmIGRlZmluZWQoIFRBTkdFTlRTUEFDRV9OT1JNQUxNQVAgKVxcblxcbiAgICB2ZWMzIG1hcE4gPSB0ZXh0dXJlMkQoIG5vcm1hbE1hcCwgdXYgKS54eXogKiAyLjAgLSAxLjA7XFxuICAgIG1hcE4ueHkgKj0gbm9ybWFsU2NhbGU7XFxuXFxuICAgICNpZmRlZiBVU0VfVEFOR0VOVFxcblxcbiAgICAgIG5vcm1hbCA9IG5vcm1hbGl6ZSggdlRCTiAqIG1hcE4gKTtcXG5cXG4gICAgI2Vsc2VcXG5cXG4gICAgICBub3JtYWwgPSBwZXJ0dXJiTm9ybWFsMkFyYiggdXYsIC12Vmlld1Bvc2l0aW9uLCBub3JtYWwsIG1hcE4gKTtcXG5cXG4gICAgI2VuZGlmXFxuXFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxlbWlzc2l2ZW1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfRU1JU1NJVkVNQVBcXG4gICAgdG90YWxFbWlzc2l2ZVJhZGlhbmNlICo9IGVtaXNzaXZlTWFwVGV4ZWxUb0xpbmVhciggdGV4dHVyZTJEKCBlbWlzc2l2ZU1hcCwgdXYgKSApLnJnYjtcXG4gICNlbmRpZlxcblxcbiAgI2lmZGVmIERFQlVHX05PUk1BTFxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCAwLjUgKyAwLjUgKiBub3JtYWwsIDEuMCApO1xcbiAgICByZXR1cm47XFxuICAjZW5kaWZcXG5cXG4gIC8vIC0tIE1Ub29uOiBsaWdodGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgLy8gYWNjdW11bGF0aW9uXFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX3Bob25nX2ZyYWdtZW50PlxcbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9iZWdpbj5cXG4gIHZlYzMgbGl0ID0gZGlmZnVzZUNvbG9yLnJnYjtcXG4gIHZlYzMgc2hhZGUgPSBzaGFkZUNvbG9yO1xcbiAgI2lmZGVmIFVTRV9TSEFERVRFWFRVUkVcXG4gICAgc2hhZGUgKj0gc2hhZGVUZXh0dXJlVGV4ZWxUb0xpbmVhciggdGV4dHVyZTJEKCBzaGFkZVRleHR1cmUsIHV2ICkgKS5yZ2I7XFxuICAjZW5kaWZcXG5cXG4gIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnk7XFxuXFxuICBnZW9tZXRyeS5wb3NpdGlvbiA9IC0gdlZpZXdQb3NpdGlvbjtcXG4gIGdlb21ldHJ5Lm5vcm1hbCA9IG5vcm1hbDtcXG4gIGdlb21ldHJ5LnZpZXdEaXIgPSBub3JtYWxpemUoIHZWaWV3UG9zaXRpb24gKTtcXG5cXG4gIHZlYzMgbGlnaHRpbmcgPSBjYWxjRGlyZWN0RGlmZnVzZSggdXYsIGRpZmZ1c2VDb2xvci5yZ2IsIHNoYWRlLCBnZW9tZXRyeSwgcmVmbGVjdGVkTGlnaHQgKTtcXG5cXG4gIHZlYzMgaXJyYWRpYW5jZSA9IGdldEFtYmllbnRMaWdodElycmFkaWFuY2UoIGFtYmllbnRMaWdodENvbG9yICk7XFxuICAjaWYgKCBOVU1fSEVNSV9MSUdIVFMgPiAwIClcXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fSEVNSV9MSUdIVFM7IGkgKysgKSB7XFxuICAgICAgaXJyYWRpYW5jZSArPSBnZXRIZW1pc3BoZXJlTGlnaHRJcnJhZGlhbmNlKCBoZW1pc3BoZXJlTGlnaHRzWyBpIF0sIGdlb21ldHJ5ICk7XFxuICAgIH1cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9lbmRcXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPGxpZ2h0c19mcmFnbWVudF9tYXBzPlxcbiAgI2lmZGVmIFVTRV9MSUdIVE1BUFxcbiAgICB2ZWMzIGxpZ2h0TWFwSXJyYWRpYW5jZSA9IHRleHR1cmUyRCggbGlnaHRNYXAsIHZVdjIgKS5yZ2IgKiBsaWdodE1hcEludGVuc2l0eTtcXG4gICAgI2lmbmRlZiBQSFlTSUNBTExZX0NPUlJFQ1RfTElHSFRTXFxuICAgICAgbGlnaHRNYXBJcnJhZGlhbmNlICo9IFBJOyAvLyBmYWN0b3Igb2YgUEkgc2hvdWxkIG5vdCBiZSBwcmVzZW50OyBpbmNsdWRlZCBoZXJlIHRvIHByZXZlbnQgYnJlYWthZ2VcXG4gICAgI2VuZGlmXFxuICAgIGlycmFkaWFuY2UgKz0gbGlnaHRNYXBJcnJhZGlhbmNlO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X2VuZD5cXG4gIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5ICogaXJyYWRpYW5jZSAqIEJSREZfRGlmZnVzZV9MYW1iZXJ0KCBsaXQgKTtcXG5cXG4gIC8vIG1vZHVsYXRpb25cXG4gICNpbmNsdWRlIDxhb21hcF9mcmFnbWVudD5cXG5cXG4gIHZlYzMgY29sID0gcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZTtcXG5cXG4gICNpZiBkZWZpbmVkKCBPVVRMSU5FICkgJiYgZGVmaW5lZCggT1VUTElORV9DT0xPUl9NSVhFRCApXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoXFxuICAgICAgb3V0bGluZUNvbG9yLnJnYiAqIG1peCggdmVjMyggMS4wICksIGNvbCwgb3V0bGluZUxpZ2h0aW5nTWl4ICksXFxuICAgICAgZGlmZnVzZUNvbG9yLmFcXG4gICAgKTtcXG4gICAgcG9zdENvcnJlY3Rpb24oKTtcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgREVCVUdfTElUU0hBREVSQVRFXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIGNvbCwgZGlmZnVzZUNvbG9yLmEgKTtcXG4gICAgcG9zdENvcnJlY3Rpb24oKTtcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAtLSBNVG9vbjogcGFyYW1ldHJpYyByaW0gbGlnaHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIHZlYzMgdmlld0RpciA9IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xcbiAgdmVjMyByaW1NaXggPSBtaXgodmVjMygxLjApLCBsaWdodGluZyArIGluZGlyZWN0TGlnaHRJbnRlbnNpdHkgKiBpcnJhZGlhbmNlLCByaW1MaWdodGluZ01peCk7XFxuICB2ZWMzIHJpbSA9IHJpbUNvbG9yICogcG93KCBzYXR1cmF0ZSggMS4wIC0gZG90KCB2aWV3RGlyLCBub3JtYWwgKSArIHJpbUxpZnQgKSwgcmltRnJlc25lbFBvd2VyICk7XFxuICAjaWZkZWYgVVNFX1JJTVRFWFRVUkVcXG4gICAgcmltICo9IHJpbVRleHR1cmVUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIHJpbVRleHR1cmUsIHV2ICkgKS5yZ2I7XFxuICAjZW5kaWZcXG4gIGNvbCArPSByaW07XFxuXFxuICAvLyAtLSBNVG9vbjogYWRkaXRpdmUgbWF0Y2FwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gICNpZmRlZiBVU0VfU1BIRVJFQUREXFxuICAgIHtcXG4gICAgICB2ZWMzIHggPSBub3JtYWxpemUoIHZlYzMoIHZpZXdEaXIueiwgMC4wLCAtdmlld0Rpci54ICkgKTtcXG4gICAgICB2ZWMzIHkgPSBjcm9zcyggdmlld0RpciwgeCApOyAvLyBndWFyYW50ZWVkIHRvIGJlIG5vcm1hbGl6ZWRcXG4gICAgICB2ZWMyIHNwaGVyZVV2ID0gMC41ICsgMC41ICogdmVjMiggZG90KCB4LCBub3JtYWwgKSwgLWRvdCggeSwgbm9ybWFsICkgKTtcXG4gICAgICB2ZWMzIG1hdGNhcCA9IHNwaGVyZUFkZFRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggc3BoZXJlQWRkLCBzcGhlcmVVdiApICkueHl6O1xcbiAgICAgIGNvbCArPSBtYXRjYXA7XFxuICAgIH1cXG4gICNlbmRpZlxcblxcbiAgLy8gLS0gTVRvb246IEVtaXNzaW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICBjb2wgKz0gdG90YWxFbWlzc2l2ZVJhZGlhbmNlO1xcblxcbiAgLy8gI2luY2x1ZGUgPGVudm1hcF9mcmFnbWVudD5cXG5cXG4gIC8vIC0tIEFsbW9zdCBkb25lISAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggY29sLCBkaWZmdXNlQ29sb3IuYSApO1xcbiAgcG9zdENvcnJlY3Rpb24oKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIvLyAjZGVmaW5lIFBIT05HXFxuXFxudmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XFxuXFxuI2lmbmRlZiBGTEFUX1NIQURFRFxcbiAgdmFyeWluZyB2ZWMzIHZOb3JtYWw7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPGNvbW1vbj5cXG5cXG4vLyAjaW5jbHVkZSA8dXZfcGFyc192ZXJ0ZXg+XFxuI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9VVkFOSU1NQVNLVEVYVFVSRSApXFxuICB2YXJ5aW5nIHZlYzIgdlV2O1xcbiAgdW5pZm9ybSB2ZWM0IG1haW5UZXhfU1Q7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX3ZlcnRleD5cXG4vLyAjaW5jbHVkZSA8ZGlzcGxhY2VtZW50bWFwX3BhcnNfdmVydGV4Plxcbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxmb2dfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPG1vcnBodGFyZ2V0X3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxza2lubmluZ19wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8c2hhZG93bWFwX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3BhcnNfdmVydGV4PlxcblxcbiNpZmRlZiBVU0VfT1VUTElORVdJRFRIVEVYVFVSRVxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgb3V0bGluZVdpZHRoVGV4dHVyZTtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIGZsb2F0IG91dGxpbmVXaWR0aDtcXG51bmlmb3JtIGZsb2F0IG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTtcXG5cXG52b2lkIG1haW4oKSB7XFxuXFxuICAvLyAjaW5jbHVkZSA8dXZfdmVydGV4PlxcbiAgI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9VVkFOSU1NQVNLVEVYVFVSRSApXFxuICAgIHZVdiA9IHZlYzIoIG1haW5UZXhfU1QucCAqIHV2LnggKyBtYWluVGV4X1NULnMsIG1haW5UZXhfU1QucSAqIHV2LnkgKyBtYWluVGV4X1NULnQgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHV2Ml92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y29sb3JfdmVydGV4PlxcblxcbiAgI2luY2x1ZGUgPGJlZ2lubm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxtb3JwaG5vcm1hbF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbmJhc2VfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNraW5ub3JtYWxfdmVydGV4PlxcblxcbiAgLy8gd2UgbmVlZCB0aGlzIHRvIGNvbXB1dGUgdGhlIG91dGxpbmUgcHJvcGVybHlcXG4gIG9iamVjdE5vcm1hbCA9IG5vcm1hbGl6ZSggb2JqZWN0Tm9ybWFsICk7XFxuXFxuICAjaW5jbHVkZSA8ZGVmYXVsdG5vcm1hbF92ZXJ0ZXg+XFxuXFxuICAjaWZuZGVmIEZMQVRfU0hBREVEIC8vIE5vcm1hbCBjb21wdXRlZCB3aXRoIGRlcml2YXRpdmVzIHdoZW4gRkxBVF9TSEFERURcXG4gICAgdk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cXG5cXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxcbiAgLy8gI2luY2x1ZGUgPGRpc3BsYWNlbWVudG1hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8cHJvamVjdF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc192ZXJ0ZXg+XFxuXFxuICB2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcXG5cXG4gIGZsb2F0IG91dGxpbmVUZXggPSAxLjA7XFxuXFxuICAjaWZkZWYgT1VUTElORVxcbiAgICAjaWZkZWYgVVNFX09VVExJTkVXSURUSFRFWFRVUkVcXG4gICAgICBvdXRsaW5lVGV4ID0gdGV4dHVyZTJEKCBvdXRsaW5lV2lkdGhUZXh0dXJlLCB2VXYgKS5yO1xcbiAgICAjZW5kaWZcXG5cXG4gICAgI2lmZGVmIE9VVExJTkVfV0lEVEhfV09STERcXG4gICAgICBmbG9hdCB3b3JsZE5vcm1hbExlbmd0aCA9IGxlbmd0aCggdHJhbnNmb3JtZWROb3JtYWwgKTtcXG4gICAgICB2ZWMzIG91dGxpbmVPZmZzZXQgPSAwLjAxICogb3V0bGluZVdpZHRoICogb3V0bGluZVRleCAqIHdvcmxkTm9ybWFsTGVuZ3RoICogb2JqZWN0Tm9ybWFsO1xcbiAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIG91dGxpbmVPZmZzZXQgKyB0cmFuc2Zvcm1lZCwgMS4wICk7XFxuICAgICNlbmRpZlxcblxcbiAgICAjaWZkZWYgT1VUTElORV9XSURUSF9TQ1JFRU5cXG4gICAgICB2ZWMzIGNsaXBOb3JtYWwgPSAoIHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBvYmplY3ROb3JtYWwsIDAuMCApICkueHl6O1xcbiAgICAgIHZlYzIgcHJvamVjdGVkTm9ybWFsID0gbm9ybWFsaXplKCBjbGlwTm9ybWFsLnh5ICk7XFxuICAgICAgcHJvamVjdGVkTm9ybWFsICo9IG1pbiggZ2xfUG9zaXRpb24udywgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlICk7XFxuICAgICAgcHJvamVjdGVkTm9ybWFsLnggKj0gcHJvamVjdGlvbk1hdHJpeFsgMCBdLnggLyBwcm9qZWN0aW9uTWF0cml4WyAxIF0ueTtcXG4gICAgICBnbF9Qb3NpdGlvbi54eSArPSAwLjAxICogb3V0bGluZVdpZHRoICogb3V0bGluZVRleCAqIHByb2plY3RlZE5vcm1hbC54eTtcXG4gICAgI2VuZGlmXFxuXFxuICAgIGdsX1Bvc2l0aW9uLnogKz0gMUUtNiAqIGdsX1Bvc2l0aW9uLnc7IC8vIGFudGktYXJ0aWZhY3QgbWFnaWNcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHdvcmxkcG9zX3ZlcnRleD5cXG4gIC8vICNpbmNsdWRlIDxlbnZtYXBfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNoYWRvd21hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Zm9nX3ZlcnRleD5cXG5cXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjaWZkZWYgUkVOREVSVFlQRV9DVVRPVVRcXG4gIHVuaWZvcm0gZmxvYXQgY3V0b2ZmO1xcbiNlbmRpZlxcblxcbiNpbmNsdWRlIDxjb21tb24+XFxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPHV2X3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPHV2Ml9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YWxwaGFtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YW9tYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8bGlnaHRtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8ZW52bWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGZvZ19wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc19mcmFnbWVudD5cXG5cXG4vLyA9PSBtYWluIHByb2NlZHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbnZvaWQgbWFpbigpIHtcXG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfZnJhZ21lbnQ+XFxuXFxuICB2ZWM0IGRpZmZ1c2VDb2xvciA9IHZlYzQoIDEuMCApO1xcblxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX2ZyYWdtZW50PlxcblxcbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIGRpZmZ1c2VDb2xvciAqPSBtYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIG1hcCwgdlV2ICkgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGNvbG9yX2ZyYWdtZW50PlxcbiAgLy8gI2luY2x1ZGUgPGFscGhhbWFwX2ZyYWdtZW50PlxcblxcbiAgLy8gTVRvb246IGFscGhhXFxuICAvLyAjaW5jbHVkZSA8YWxwaGF0ZXN0X2ZyYWdtZW50PlxcbiAgI2lmZGVmIFJFTkRFUlRZUEVfQ1VUT1VUXFxuICAgIGlmICggZGlmZnVzZUNvbG9yLmEgPD0gY3V0b2ZmICkgeyBkaXNjYXJkOyB9XFxuICAgIGRpZmZ1c2VDb2xvci5hID0gMS4wO1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgUkVOREVSVFlQRV9PUEFRVUVcXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9mcmFnbWVudD5cXG5cXG4gIFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ID0gUmVmbGVjdGVkTGlnaHQoIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApICk7XFxuXFxuICAvLyBhY2N1bXVsYXRpb24gKGJha2VkIGluZGlyZWN0IGxpZ2h0aW5nIG9ubHkpXFxuICAjaWZkZWYgVVNFX0xJR0hUTUFQXFxuICAgIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSB0ZXh0dXJlMkQoIGxpZ2h0TWFwLCB2VXYyICkueHl6ICogbGlnaHRNYXBJbnRlbnNpdHk7XFxuICAjZWxzZVxcbiAgICByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2UgKz0gdmVjMyggMS4wICk7XFxuICAjZW5kaWZcXG5cXG4gIC8vIG1vZHVsYXRpb25cXG4gIC8vICNpbmNsdWRlIDxhb21hcF9mcmFnbWVudD5cXG5cXG4gIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSAqPSBkaWZmdXNlQ29sb3IucmdiO1xcbiAgdmVjMyBvdXRnb2luZ0xpZ2h0ID0gcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlO1xcblxcbiAgLy8gI2luY2x1ZGUgPGVudm1hcF9mcmFnbWVudD5cXG5cXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoIG91dGdvaW5nTGlnaHQsIGRpZmZ1c2VDb2xvci5hICk7XFxuXFxuICAjaW5jbHVkZSA8cHJlbXVsdGlwbGllZF9hbHBoYV9mcmFnbWVudD5cXG4gICNpbmNsdWRlIDx0b25lbWFwcGluZ19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxlbmNvZGluZ3NfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8Zm9nX2ZyYWdtZW50Plxcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNpbmNsdWRlIDxjb21tb24+XFxuXFxuLy8gI2luY2x1ZGUgPHV2X3BhcnNfdmVydGV4PlxcbiNpZmRlZiBVU0VfTUFQXFxuICB2YXJ5aW5nIHZlYzIgdlV2O1xcbiAgdW5pZm9ybSB2ZWM0IG1haW5UZXhfU1Q7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8ZW52bWFwX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjb2xvcl9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Zm9nX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxtb3JwaHRhcmdldF9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8c2tpbm5pbmdfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc192ZXJ0ZXg+XFxuXFxudm9pZCBtYWluKCkge1xcblxcbiAgLy8gI2luY2x1ZGUgPHV2X3ZlcnRleD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIHZVdiA9IHZlYzIoIG1haW5UZXhfU1QucCAqIHV2LnggKyBtYWluVGV4X1NULnMsIG1haW5UZXhfU1QucSAqIHV2LnkgKyBtYWluVGV4X1NULnQgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHV2Ml92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y29sb3JfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNraW5iYXNlX3ZlcnRleD5cXG5cXG4gICNpZmRlZiBVU0VfRU5WTUFQXFxuXFxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPG1vcnBobm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2lubm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxkZWZhdWx0bm9ybWFsX3ZlcnRleD5cXG5cXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHByb2plY3RfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3ZlcnRleD5cXG5cXG4gICNpbmNsdWRlIDx3b3JsZHBvc192ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxlbnZtYXBfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGZvZ192ZXJ0ZXg+XFxuXFxufVwiOyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTU1ldGEgfSBmcm9tICcuL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNTWV0YUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4vVlJNTWV0YUltcG9ydGVyT3B0aW9ucyc7XG5cbi8qKlxuICogQW4gaW1wb3J0ZXIgdGhhdCBpbXBvcnRzIGEge0BsaW5rIFZSTU1ldGF9IGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTU1ldGFJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGl0IHdvbid0IGxvYWQgaXRzIHRodW1ibmFpbCB0ZXh0dXJlICh7QGxpbmsgVlJNTWV0YS50ZXh0dXJlfSkuIGBmYWxzZWAgYnkgZGVmYXVsdC5cbiAgICovXG4gIHB1YmxpYyBpZ25vcmVUZXh0dXJlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zKSB7XG4gICAgdGhpcy5pZ25vcmVUZXh0dXJlID0gb3B0aW9ucz8uaWdub3JlVGV4dHVyZSA/PyBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpbXBvcnQoZ2x0ZjogR0xURik6IFByb21pc2U8VlJNTWV0YSB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hTWV0YTogVlJNU2NoZW1hLk1ldGEgfCB1bmRlZmluZWQgPSB2cm1FeHQubWV0YTtcbiAgICBpZiAoIXNjaGVtYU1ldGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCB0ZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXRoaXMuaWdub3JlVGV4dHVyZSAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT0gbnVsbCAmJiBzY2hlbWFNZXRhLnRleHR1cmUgIT09IC0xKSB7XG4gICAgICB0ZXh0dXJlID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHNjaGVtYU1ldGEudGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGFsbG93ZWRVc2VyTmFtZTogc2NoZW1hTWV0YS5hbGxvd2VkVXNlck5hbWUsXG4gICAgICBhdXRob3I6IHNjaGVtYU1ldGEuYXV0aG9yLFxuICAgICAgY29tbWVyY2lhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuY29tbWVyY2lhbFVzc2FnZU5hbWUsXG4gICAgICBjb250YWN0SW5mb3JtYXRpb246IHNjaGVtYU1ldGEuY29udGFjdEluZm9ybWF0aW9uLFxuICAgICAgbGljZW5zZU5hbWU6IHNjaGVtYU1ldGEubGljZW5zZU5hbWUsXG4gICAgICBvdGhlckxpY2Vuc2VVcmw6IHNjaGVtYU1ldGEub3RoZXJMaWNlbnNlVXJsLFxuICAgICAgb3RoZXJQZXJtaXNzaW9uVXJsOiBzY2hlbWFNZXRhLm90aGVyUGVybWlzc2lvblVybCxcbiAgICAgIHJlZmVyZW5jZTogc2NoZW1hTWV0YS5yZWZlcmVuY2UsXG4gICAgICBzZXh1YWxVc3NhZ2VOYW1lOiBzY2hlbWFNZXRhLnNleHVhbFVzc2FnZU5hbWUsXG4gICAgICB0ZXh0dXJlOiB0ZXh0dXJlID8/IHVuZGVmaW5lZCxcbiAgICAgIHRpdGxlOiBzY2hlbWFNZXRhLnRpdGxlLFxuICAgICAgdmVyc2lvbjogc2NoZW1hTWV0YS52ZXJzaW9uLFxuICAgICAgdmlvbGVudFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEudmlvbGVudFVzc2FnZU5hbWUsXG4gICAgfTtcbiAgfVxufVxuIiwiZXhwb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vVlJNTWV0YSc7XG5leHBvcnQgeyBWUk1NZXRhSW1wb3J0ZXIgfSBmcm9tICcuL1ZSTU1ldGFJbXBvcnRlcic7XG5leHBvcnQgeyBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zIH0gZnJvbSAnLi9WUk1NZXRhSW1wb3J0ZXJPcHRpb25zJztcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcbmltcG9ydCB7IE1hdHJpeDRJbnZlcnNlQ2FjaGUgfSBmcm9tICcuLi91dGlscy9NYXRyaXg0SW52ZXJzZUNhY2hlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2ggfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG4vLyBiYXNlZCBvblxuLy8gaHR0cDovL3JvY2tldGp1bXAuc2tyLmpwL3VuaXR5M2QvMTA5L1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2R3YW5nby9VbmlWUk0vYmxvYi9tYXN0ZXIvU2NyaXB0cy9TcHJpbmdCb25lL1ZSTVNwcmluZ0JvbmUuY3NcblxuY29uc3QgSURFTlRJVFlfTUFUUklYNCA9IE9iamVjdC5mcmVlemUobmV3IFRIUkVFLk1hdHJpeDQoKSk7XG5jb25zdCBJREVOVElUWV9RVUFURVJOSU9OID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuUXVhdGVybmlvbigpKTtcblxuLy8g6KiI566X5Lit44Gu5LiA5pmC5L+d5a2Y55So5aSJ5pWw77yI5LiA5bqm44Kk44Oz44K544K/44Oz44K544KS5L2c44Gj44Gf44KJ44GC44Go44Gv5L2/44GE5Zue44GZ77yJXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX21hdEEgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuY29uc3QgX21hdEIgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4vKipcbiAqIEEgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSBzcHJpbmcgYm9uZSBvZiBhIFZSTS5cbiAqIEl0IHNob3VsZCBiZSBtYW5hZ2VkIGJ5IGEgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZSB7XG4gIC8qKlxuICAgKiBSYWRpdXMgb2YgdGhlIGJvbmUsIHdpbGwgYmUgdXNlZCBmb3IgY29sbGlzaW9uLlxuICAgKi9cbiAgcHVibGljIHJhZGl1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdGlmZm5lc3MgZm9yY2Ugb2YgdGhlIGJvbmUuIEluY3JlYXNpbmcgdGhlIHZhbHVlID0gZmFzdGVyIGNvbnZlcmdlbmNlIChmZWVscyBcImhhcmRlclwiKS5cbiAgICogT24gVW5pVlJNLCBpdHMgcmFuZ2Ugb24gR1VJIGlzIGJldHdlZW4gYDAuMGAgYW5kIGA0LjBgIC5cbiAgICovXG4gIHB1YmxpYyBzdGlmZm5lc3NGb3JjZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBQb3dlciBvZiB0aGUgZ3Jhdml0eSBhZ2FpbnN0IHRoaXMgYm9uZS5cbiAgICogVGhlIFwicG93ZXJcIiB1c2VkIGluIGhlcmUgaXMgdmVyeSBmYXIgZnJvbSBzY2llbnRpZmljIHBoeXNpY3MgdGVybS4uLlxuICAgKi9cbiAgcHVibGljIGdyYXZpdHlQb3dlcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBEaXJlY3Rpb24gb2YgdGhlIGdyYXZpdHkgYWdhaW5zdCB0aGlzIGJvbmUuXG4gICAqIFVzdWFsbHkgaXQgc2hvdWxkIGJlIG5vcm1hbGl6ZWQuXG4gICAqL1xuICBwdWJsaWMgZ3Jhdml0eURpcjogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogRHJhZyBmb3JjZSBvZiB0aGUgYm9uZS4gSW5jcmVhc2luZyB0aGUgdmFsdWUgPSBsZXNzIG9zY2lsbGF0aW9uIChmZWVscyBcImhlYXZpZXJcIikuXG4gICAqIE9uIFVuaVZSTSwgaXRzIHJhbmdlIG9uIEdVSSBpcyBiZXR3ZWVuIGAwLjBgIGFuZCBgMS4wYCAuXG4gICAqL1xuICBwdWJsaWMgZHJhZ0ZvcmNlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENvbGxpZGVyIGdyb3VwcyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgY29sbGlkZXJzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoW107XG5cbiAgLyoqXG4gICAqIEFuIE9iamVjdDNEIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBib25lOiBUSFJFRS5PYmplY3QzRDtcblxuICAvKipcbiAgICogQ3VycmVudCBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiB3b3JsZCB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBfY3VycmVudFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBQcmV2aW91cyBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiB3b3JsZCB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBfcHJldlRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBOZXh0IHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKiBBY3R1YWxseSB1c2VkIG9ubHkgaW4gW1t1cGRhdGVdXSBhbmQgaXQncyBraW5kIG9mIHRlbXBvcmFyeSB2YXJpYWJsZS5cbiAgICovXG4gIHByb3RlY3RlZCBfbmV4dFRhaWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGF4aXMgb2YgdGhlIGJvbmUsIGluIGxvY2FsIHVuaXQuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2JvbmVBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogTGVuZ3RoIG9mIHRoZSBib25lIGluIHJlbGF0aXZlIHNwYWNlIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3Igbm9ybWFsaXphdGlvbiBpbiB1cGRhdGUgbG9vcC5cbiAgICogSXQncyBzYW1lIGFzIGxvY2FsIHVuaXQgbGVuZ3RoIHVubGVzcyB0aGVyZSBhcmUgc2NhbGUgdHJhbnNmb3JtYXRpb24gaW4gd29ybGQgbWF0cml4LlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jZW50ZXJTcGFjZUJvbmVMZW5ndGg6IG51bWJlcjtcblxuICAvKipcbiAgICogUG9zaXRpb24gb2YgdGhpcyBib25lIGluIHJlbGF0aXZlIHNwYWNlLCBraW5kIG9mIGEgdGVtcG9yYXJ5IHZhcmlhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jZW50ZXJTcGFjZVBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogVGhpcyBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgdGhpcyBpcyBgbnVsbGAsIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGluIHdvcmxkIHNwYWNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgY2VudGVyKCk6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcbiAgfVxuICBwdWJsaWMgc2V0IGNlbnRlcihjZW50ZXI6IFRIUkVFLk9iamVjdDNEIHwgbnVsbCkge1xuICAgIC8vIGNvbnZlcnQgdGFpbHMgdG8gd29ybGQgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKF9tYXRBKTtcblxuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fcHJldlRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuXG4gICAgLy8gdW5pbnN0YWxsIGludmVyc2UgY2FjaGVcbiAgICBpZiAodGhpcy5fY2VudGVyPy51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xuICAgICAgKHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSBhcyBNYXRyaXg0SW52ZXJzZUNhY2hlKS5yZXZlcnQoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHk7XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHRoZSBjZW50ZXJcbiAgICB0aGlzLl9jZW50ZXIgPSBjZW50ZXI7XG5cbiAgICAvLyBpbnN0YWxsIGludmVyc2UgY2FjaGVcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICBpZiAoIXRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSkge1xuICAgICAgICB0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgPSBuZXcgTWF0cml4NEludmVyc2VDYWNoZSh0aGlzLl9jZW50ZXIubWF0cml4V29ybGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgdGFpbHMgdG8gY2VudGVyIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG5cbiAgICB0aGlzLl9jdXJyZW50VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fbmV4dFRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcblxuICAgIC8vIGNvbnZlcnQgY2VudGVyIHNwYWNlIGRlcGVuZGFudCBzdGF0ZVxuICAgIF9tYXRBLm11bHRpcGx5KHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7IC8vIPCflKUgPz9cblxuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKF9tYXRBKTtcblxuICAgIHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aCA9IF92M0FcbiAgICAgIC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pXG4gICAgICAuYXBwbHlNYXRyaXg0KF9tYXRBKVxuICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgLmxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0aW9uIG9mIHBhcmVudCBib25lLCBpbiB3b3JsZCB1bml0LlxuICAgKiBXZSBzaG91bGQgdXBkYXRlIHRoaXMgY29uc3RhbnRseSBpbiBbW3VwZGF0ZV1dLlxuICAgKi9cbiAgcHJpdmF0ZSBfcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIGxvY2FsIG1hdHJpeCBvZiB0aGUgYm9uZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbE1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBwb3NpdGlvbiBvZiBpdHMgY2hpbGQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTVNwcmluZ0JvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBib25lIEFuIE9iamVjdDNEIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGlzIGJvbmVcbiAgICogQHBhcmFtIHBhcmFtcyBTZXZlcmFsIHBhcmFtZXRlcnMgcmVsYXRlZCB0byBiZWhhdmlvciBvZiB0aGUgc3ByaW5nIGJvbmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGJvbmU6IFRIUkVFLk9iamVjdDNELCBwYXJhbXM6IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzID0ge30pIHtcbiAgICB0aGlzLmJvbmUgPSBib25lOyAvLyB1bmlWUk3jgafjga4gcGFyZW50XG4gICAgdGhpcy5ib25lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTsgLy8gdXBkYXRl44Gr44KI44KK6KiI566X44GV44KM44KL44Gu44GndGhyZWUuanPlhoXjgafjga7oh6rli5Xlh6bnkIbjga/kuI3opoFcblxuICAgIHRoaXMucmFkaXVzID0gcGFyYW1zLnJhZGl1cyA/PyAwLjAyO1xuICAgIHRoaXMuc3RpZmZuZXNzRm9yY2UgPSBwYXJhbXMuc3RpZmZuZXNzRm9yY2UgPz8gMS4wO1xuICAgIHRoaXMuZ3Jhdml0eURpciA9IHBhcmFtcy5ncmF2aXR5RGlyXG4gICAgICA/IG5ldyBUSFJFRS5WZWN0b3IzKCkuY29weShwYXJhbXMuZ3Jhdml0eURpcilcbiAgICAgIDogbmV3IFRIUkVFLlZlY3RvcjMoKS5zZXQoMC4wLCAtMS4wLCAwLjApO1xuICAgIHRoaXMuZ3Jhdml0eVBvd2VyID0gcGFyYW1zLmdyYXZpdHlQb3dlciA/PyAwLjA7XG4gICAgdGhpcy5kcmFnRm9yY2UgPSBwYXJhbXMuZHJhZ0ZvcmNlID8/IDAuNDtcbiAgICB0aGlzLmNvbGxpZGVycyA9IHBhcmFtcy5jb2xsaWRlcnMgPz8gW107XG5cbiAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgdGhpcy5faW5pdGlhbExvY2FsTWF0cml4LmNvcHkodGhpcy5ib25lLm1hdHJpeCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24uY29weSh0aGlzLmJvbmUucXVhdGVybmlvbik7XG5cbiAgICBpZiAodGhpcy5ib25lLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8g5pyr56uv44Gu44Oc44O844Oz44CC5a2Q44Oc44O844Oz44GM44GE44Gq44GE44Gf44KB44CM6Ieq5YiG44Gu5bCR44GX5YWI44CN44GM5a2Q44Oc44O844Oz44Go44GE44GG44GT44Go44Gr44GZ44KLXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9Bc3NldHMvVlJNL1VuaVZSTS9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jcyNMMjQ2XG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uXG4gICAgICAgIC5jb3B5KHRoaXMuYm9uZS5wb3NpdGlvbilcbiAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgIC5tdWx0aXBseVNjYWxhcigwLjA3KTsgLy8gbWFnaWMgbnVtYmVyISBkZXJpdmVzIGZyb20gb3JpZ2luYWwgc291cmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmJvbmUuY2hpbGRyZW5bMF07XG4gICAgICB0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uLmNvcHkoZmlyc3RDaGlsZC5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcblxuICAgIHRoaXMuX2JvbmVBeGlzLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgdGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQVxuICAgICAgLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbilcbiAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5ib25lLm1hdHJpeFdvcmxkKVxuICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5jZW50ZXIgPSBwYXJhbXMuY2VudGVyID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnJlc2V0XV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgICB0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgLy8gQXBwbHkgdXBkYXRlZCBwb3NpdGlvbiB0byB0YWlsIHN0YXRlc1xuICAgIHRoaXMuYm9uZS5sb2NhbFRvV29ybGQodGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKSk7XG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fbmV4dFRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGlzIGJvbmUuXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwgW1tWUk1TcHJpbmdCb25lTWFuYWdlci51cGRhdGVdXSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZGVsdGEgPD0gMCkgcmV0dXJuO1xuXG4gICAgLy8g6Kaq44K544OX44Oq44Oz44Kw44Oc44O844Oz44Gu5ae/5Yui44Gv5bi444Gr5aSJ5YyW44GX44Gm44GE44KL44CCXG4gICAgLy8g44Gd44KM44Gr5Z+644Gl44GE44Gm5Yem55CG55u05YmN44Gr6Ieq5YiG44Gud29ybGRNYXRyaXjjgpLmm7TmlrDjgZfjgabjgYrjgY9cbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcblxuICAgIGlmICh0aGlzLmJvbmUucGFyZW50KSB7XG4gICAgICAvLyBTcHJpbmdCb25l44Gv6Kaq44GL44KJ6aCG44Gr5Yem55CG44GV44KM44Gm44GE44GP44Gf44KB44CBXG4gICAgICAvLyDopqrjga5tYXRyaXhXb3JsZOOBr+acgOaWsOeKtuaFi+OBruWJjeaPkOOBp3dvcmxkTWF0cml444GL44KJcXVhdGVybmlvbuOCkuWPluOCiuWHuuOBmeOAglxuICAgICAgLy8g5Yi26ZmQ44Gv44GC44KL44GR44KM44Gp44CB6KiI566X44Gv5bCR44Gq44GE44Gu44GnZ2V0V29ybGRRdWF0ZXJuaW9u44Gn44Gv44Gq44GP44GT44Gu5pa55rOV44KS5Y+W44KL44CCXG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuYm9uZS5wYXJlbnQsIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uLmNvcHkoSURFTlRJVFlfUVVBVEVSTklPTik7XG4gICAgfVxuXG4gICAgLy8gR2V0IGJvbmUgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0QSk7XG4gICAgX21hdEEubXVsdGlwbHkodGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8g8J+UpSA/P1xuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKF9tYXRBKTtcblxuICAgIC8vIEdldCBwYXJlbnQgcG9zaXRpb24gaW4gY2VudGVyIHNwYWNlXG4gICAgdGhpcy5fZ2V0TWF0cml4V29ybGRUb0NlbnRlcihfbWF0Qik7XG4gICAgX21hdEIubXVsdGlwbHkodGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSk7XG5cbiAgICAvLyBzZXZlcmFsIHBhcmFtZXRlcnNcbiAgICBjb25zdCBzdGlmZm5lc3MgPSB0aGlzLnN0aWZmbmVzc0ZvcmNlICogZGVsdGE7XG4gICAgY29uc3QgZXh0ZXJuYWwgPSBfdjNCLmNvcHkodGhpcy5ncmF2aXR5RGlyKS5tdWx0aXBseVNjYWxhcih0aGlzLmdyYXZpdHlQb3dlciAqIGRlbHRhKTtcblxuICAgIC8vIHZlcmxldOepjeWIhuOBp+asoeOBruS9jee9ruOCkuioiOeul1xuICAgIHRoaXMuX25leHRUYWlsXG4gICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoXG4gICAgICAgIF92M0FcbiAgICAgICAgICAuY29weSh0aGlzLl9jdXJyZW50VGFpbClcbiAgICAgICAgICAuc3ViKHRoaXMuX3ByZXZUYWlsKVxuICAgICAgICAgIC5tdWx0aXBseVNjYWxhcigxIC0gdGhpcy5kcmFnRm9yY2UpLFxuICAgICAgKSAvLyDliY3jg5Xjg6zjg7zjg6Djga7np7vli5XjgpLntpnntprjgZnjgoso5rib6KGw44KC44GC44KL44KIKVxuICAgICAgLmFkZChcbiAgICAgICAgX3YzQVxuICAgICAgICAgIC5jb3B5KHRoaXMuX2JvbmVBeGlzKVxuICAgICAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5faW5pdGlhbExvY2FsTWF0cml4KVxuICAgICAgICAgIC5hcHBseU1hdHJpeDQoX21hdEIpXG4gICAgICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihzdGlmZm5lc3MpLFxuICAgICAgKSAvLyDopqrjga7lm57ou6LjgavjgojjgovlrZDjg5zjg7zjg7Pjga7np7vli5Xnm67mqJlcbiAgICAgIC5hZGQoZXh0ZXJuYWwpOyAvLyDlpJblipvjgavjgojjgovnp7vli5Xph49cblxuICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgIHRoaXMuX25leHRUYWlsXG4gICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAubm9ybWFsaXplKClcbiAgICAgIC5tdWx0aXBseVNjYWxhcih0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGgpXG4gICAgICAuYWRkKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuXG4gICAgLy8gQ29sbGlzaW9u44Gn56e75YuVXG4gICAgdGhpcy5fY29sbGlzaW9uKHRoaXMuX25leHRUYWlsKTtcblxuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5fbmV4dFRhaWwpO1xuXG4gICAgLy8gQXBwbHkgcm90YXRpb24sIGNvbnZlcnQgdmVjdG9yMyB0aGluZyBpbnRvIGFjdHVhbCBxdWF0ZXJuaW9uXG4gICAgLy8gT3JpZ2luYWwgVW5pVlJNIGlzIGRvaW5nIHdvcmxkIHVuaXQgY2FsY3VsdXMgYXQgaGVyZSBidXQgd2UncmUgZ29ubmEgZG8gdGhpcyBvbiBsb2NhbCB1bml0XG4gICAgLy8gc2luY2UgVGhyZWUuanMgaXMgbm90IGdvb2QgYXQgd29ybGQgY29vcmRpbmF0aW9uIHN0dWZmXG4gICAgY29uc3QgaW5pdGlhbENlbnRlclNwYWNlTWF0cml4SW52ID0gX21hdEEuZ2V0SW52ZXJzZShfbWF0Qi5tdWx0aXBseSh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpKTtcbiAgICBjb25zdCBhcHBseVJvdGF0aW9uID0gX3F1YXRBLnNldEZyb21Vbml0VmVjdG9ycyhcbiAgICAgIHRoaXMuX2JvbmVBeGlzLFxuICAgICAgX3YzQVxuICAgICAgICAuY29weSh0aGlzLl9uZXh0VGFpbClcbiAgICAgICAgLmFwcGx5TWF0cml4NChpbml0aWFsQ2VudGVyU3BhY2VNYXRyaXhJbnYpXG4gICAgICAgIC5ub3JtYWxpemUoKSxcbiAgICApO1xuXG4gICAgdGhpcy5ib25lLnF1YXRlcm5pb24uY29weSh0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbikubXVsdGlwbHkoYXBwbHlSb3RhdGlvbik7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHVwZGF0ZSBpdHMgbWF0cml4V29ybGQgbWFudWFsbHksIHNpbmNlIHdlIHR3ZWFrZWQgdGhlIGJvbmUgYnkgb3VyIGhhbmRcbiAgICB0aGlzLmJvbmUudXBkYXRlTWF0cml4KCk7XG4gICAgdGhpcy5ib25lLm1hdHJpeFdvcmxkLm11bHRpcGx5TWF0cmljZXModGhpcy5fZ2V0UGFyZW50TWF0cml4V29ybGQoKSwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIF9jb2xsaXNpb24odGFpbDogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIHRoaXMuY29sbGlkZXJzLmZvckVhY2goKGNvbGxpZGVyKSA9PiB7XG4gICAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcbiAgICAgIF9tYXRBLm11bHRpcGx5KGNvbGxpZGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiA9IF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKF9tYXRBKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyUmFkaXVzID0gY29sbGlkZXIuZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUhLnJhZGl1czsgLy8gdGhlIGJvdW5kaW5nIHNwaGVyZSBpcyBndWFyYW50ZWVkIHRvIGJlIGV4aXN0IGJ5IFZSTVNwcmluZ0JvbmVJbXBvcnRlci5fY3JlYXRlQ29sbGlkZXJNZXNoXG4gICAgICBjb25zdCByID0gdGhpcy5yYWRpdXMgKyBjb2xsaWRlclJhZGl1cztcblxuICAgICAgaWYgKHRhaWwuZGlzdGFuY2VUb1NxdWFyZWQoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKSA8PSByICogcikge1xuICAgICAgICAvLyDjg5Ljg4Pjg4jjgIJDb2xsaWRlcuOBruWNiuW+hOaWueWQkeOBq+aKvOOBl+WHuuOBmVxuICAgICAgICBjb25zdCBub3JtYWwgPSBfdjNCLnN1YlZlY3RvcnModGFpbCwgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgICAgICAgY29uc3QgcG9zRnJvbUNvbGxpZGVyID0gX3YzQy5hZGRWZWN0b3JzKGNvbGxpZGVyQ2VudGVyU3BhY2VQb3NpdGlvbiwgbm9ybWFsLm11bHRpcGx5U2NhbGFyKHIpKTtcblxuICAgICAgICAvLyBub3JtYWxpemUgYm9uZSBsZW5ndGhcbiAgICAgICAgdGFpbC5jb3B5KFxuICAgICAgICAgIHBvc0Zyb21Db2xsaWRlclxuICAgICAgICAgICAgLnN1Yih0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKVxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIodGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoKVxuICAgICAgICAgICAgLmFkZCh0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyBjZW50ZXIgc3BhY2UgaW50byB3b3JsZCBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhDZW50ZXJUb1dvcmxkKHRhcmdldDogVEhSRUUuTWF0cml4NCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIHRhcmdldC5jb3B5KHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbWF0cml4IHRoYXQgY29udmVydHMgd29ybGQgc3BhY2UgaW50byBjZW50ZXIgc3BhY2UuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGFyZ2V0IG1hdHJpeFxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0TWF0cml4V29ybGRUb0NlbnRlcih0YXJnZXQ6IFRIUkVFLk1hdHJpeDQpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fY2VudGVyKSB7XG4gICAgICB0YXJnZXQuY29weSgodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLmludmVyc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaWRlbnRpdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdvcmxkIG1hdHJpeCBvZiBpdHMgcGFyZW50IG9iamVjdC5cbiAgICovXG4gIHByaXZhdGUgX2dldFBhcmVudE1hdHJpeFdvcmxkKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIHJldHVybiB0aGlzLmJvbmUucGFyZW50ID8gdGhpcy5ib25lLnBhcmVudC5tYXRyaXhXb3JsZCA6IElERU5USVRZX01BVFJJWDQ7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IEdMVEZOb2RlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwLCBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lR3JvdXAsIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuY29uc3QgX2NvbGxpZGVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyB2aXNpYmxlOiBmYWxzZSB9KTtcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNTG9va0F0SGVhZF1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlciB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb246IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb24gfCB1bmRlZmluZWQgPSB2cm1FeHQuc2Vjb25kYXJ5QW5pbWF0aW9uO1xuICAgIGlmICghc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIOihneeqgeWIpOWumueQg+S9k+ODoeODg+OCt+ODpeOAglxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzID0gYXdhaXQgdGhpcy5faW1wb3J0Q29sbGlkZXJNZXNoR3JvdXBzKGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbik7XG5cbiAgICAvLyDlkIzjgZjlsZ7mgKfvvIhzdGlmZmluZXNz44KEZHJhZ0ZvcmNl44GM5ZCM44GY77yJ44Gu44Oc44O844Oz44GvYm9uZUdyb3Vw44Gr44G+44Go44KB44KJ44KM44Gm44GE44KL44CCXG4gICAgLy8g5LiA5YiX44Gg44GR44Gn44Gv44Gq44GE44GT44Go44Gr5rOo5oSP44CCXG4gICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwTGlzdCA9IGF3YWl0IHRoaXMuX2ltcG9ydFNwcmluZ0JvbmVHcm91cExpc3QoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uLCBjb2xsaWRlckdyb3Vwcyk7XG5cbiAgICByZXR1cm4gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlU3ByaW5nQm9uZShib25lOiBUSFJFRS5PYmplY3QzRCwgcGFyYW1zOiBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyA9IHt9KTogVlJNU3ByaW5nQm9uZSB7XG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lKGJvbmUsIHBhcmFtcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydFNwcmluZ0JvbmVHcm91cExpc3QoXG4gICAgZ2x0ZjogR0xURixcbiAgICBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb246IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb24sXG4gICAgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10sXG4gICk6IFByb21pc2U8VlJNU3ByaW5nQm9uZUdyb3VwW10+IHtcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBzOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nW10gPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24uYm9uZUdyb3VwcyB8fCBbXTtcblxuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cExpc3Q6IFZSTVNwcmluZ0JvbmVHcm91cFtdID0gW107XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHNwcmluZ0JvbmVHcm91cHMubWFwKGFzeW5jICh2cm1Cb25lR3JvdXApID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZybUJvbmVHcm91cC5zdGlmZmluZXNzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlQb3dlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmRyYWdGb3JjZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmhpdFJhZGl1cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuYm9uZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5jZW50ZXIgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGlmZm5lc3NGb3JjZSA9IHZybUJvbmVHcm91cC5zdGlmZmluZXNzO1xuICAgICAgICBjb25zdCBncmF2aXR5RGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueCxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci55LFxuICAgICAgICAgIC12cm1Cb25lR3JvdXAuZ3Jhdml0eURpci56LCAvLyBWUk0gMC4wIHVzZXMgbGVmdC1oYW5kZWQgeS11cFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBncmF2aXR5UG93ZXIgPSB2cm1Cb25lR3JvdXAuZ3Jhdml0eVBvd2VyO1xuICAgICAgICBjb25zdCBkcmFnRm9yY2UgPSB2cm1Cb25lR3JvdXAuZHJhZ0ZvcmNlO1xuICAgICAgICBjb25zdCByYWRpdXMgPSB2cm1Cb25lR3JvdXAuaGl0UmFkaXVzO1xuXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaFtdID0gW107XG4gICAgICAgIHZybUJvbmVHcm91cC5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckluZGV4KSA9PiB7XG4gICAgICAgICAgY29sbGlkZXJzLnB1c2goLi4uY29sbGlkZXJHcm91cHNbY29sbGlkZXJJbmRleF0uY29sbGlkZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwOiBWUk1TcHJpbmdCb25lR3JvdXAgPSBbXTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmJvbmVzLm1hcChhc3luYyAobm9kZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyBWUk3jga7mg4XloLHjgYvjgonjgIzmj7rjgozjg6Ljg47jgI3jg5zjg7zjg7Pjga7jg6vjg7zjg4jjgYzlj5bjgozjgotcbiAgICAgICAgICAgIGNvbnN0IHNwcmluZ1Jvb3RCb25lOiBHTFRGTm9kZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBub2RlSW5kZXgpO1xuXG4gICAgICAgICAgICBjb25zdCBjZW50ZXI6IEdMVEZOb2RlID1cbiAgICAgICAgICAgICAgdnJtQm9uZUdyb3VwLmNlbnRlciEgIT09IC0xID8gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIHZybUJvbmVHcm91cC5jZW50ZXIhKSA6IG51bGw7XG5cbiAgICAgICAgICAgIC8vIGl0J3Mgd2VpcmQgYnV0IHRoZXJlIG1pZ2h0IGJlIGNhc2VzIHdlIGNhbid0IGZpbmQgdGhlIHJvb3QgYm9uZVxuICAgICAgICAgICAgaWYgKCFzcHJpbmdSb290Qm9uZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwcmluZ1Jvb3RCb25lLnRyYXZlcnNlKChib25lKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLl9jcmVhdGVTcHJpbmdCb25lKGJvbmUsIHtcbiAgICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgICAgc3RpZmZuZXNzRm9yY2UsXG4gICAgICAgICAgICAgICAgZ3Jhdml0eURpcixcbiAgICAgICAgICAgICAgICBncmF2aXR5UG93ZXIsXG4gICAgICAgICAgICAgICAgZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgICAgIGNvbGxpZGVycyxcbiAgICAgICAgICAgICAgICBjZW50ZXIsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzcHJpbmdCb25lR3JvdXAucHVzaChzcHJpbmdCb25lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIHNwcmluZ0JvbmVHcm91cExpc3QucHVzaChzcHJpbmdCb25lR3JvdXApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBzcHJpbmdCb25lR3JvdXBMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBhcnJheSBvZiBbW1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwXV0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uIEEgYHNlY29uZGFyeUFuaW1hdGlvbmAgZmllbGQgb2YgVlJNXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyhcbiAgICBnbHRmOiBHTFRGLFxuICAgIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbixcbiAgKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdPiB7XG4gICAgY29uc3QgdnJtQ29sbGlkZXJHcm91cHMgPSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24uY29sbGlkZXJHcm91cHM7XG4gICAgaWYgKHZybUNvbGxpZGVyR3JvdXBzID09PSB1bmRlZmluZWQpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW107XG4gICAgdnJtQ29sbGlkZXJHcm91cHMuZm9yRWFjaChhc3luYyAoY29sbGlkZXJHcm91cCkgPT4ge1xuICAgICAgaWYgKGNvbGxpZGVyR3JvdXAubm9kZSA9PT0gdW5kZWZpbmVkIHx8IGNvbGxpZGVyR3JvdXAuY29sbGlkZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBib25lID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIGNvbGxpZGVyR3JvdXAubm9kZSk7XG4gICAgICBjb25zdCBjb2xsaWRlcnM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2hbXSA9IFtdO1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIucmFkaXVzID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gX3YzQS5zZXQoXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LngsXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnksXG4gICAgICAgICAgLWNvbGxpZGVyLm9mZnNldC56LCAvLyBWUk0gMC4wIHVzZXMgbGVmdC1oYW5kZWQgeS11cFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb2xsaWRlck1lc2ggPSB0aGlzLl9jcmVhdGVDb2xsaWRlck1lc2goY29sbGlkZXIucmFkaXVzLCBvZmZzZXQpO1xuXG4gICAgICAgIGJvbmUuYWRkKGNvbGxpZGVyTWVzaCk7XG4gICAgICAgIGNvbGxpZGVycy5wdXNoKGNvbGxpZGVyTWVzaCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY29sbGlkZXJNZXNoR3JvdXAgPSB7XG4gICAgICAgIG5vZGU6IGNvbGxpZGVyR3JvdXAubm9kZSxcbiAgICAgICAgY29sbGlkZXJzLFxuICAgICAgfTtcbiAgICAgIGNvbGxpZGVyR3JvdXBzLnB1c2goY29sbGlkZXJNZXNoR3JvdXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbGxpZGVyR3JvdXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbGxpZGVyIG1lc2guXG4gICAqXG4gICAqIEBwYXJhbSByYWRpdXMgUmFkaXVzIG9mIHRoZSBuZXcgY29sbGlkZXIgbWVzaFxuICAgKiBAcGFyYW0gb2Zmc2V0IE9mZmVzdCBvZiB0aGUgbmV3IGNvbGxpZGVyIG1lc2hcbiAgICovXG4gIHByb3RlY3RlZCBfY3JlYXRlQ29sbGlkZXJNZXNoKHJhZGl1czogbnVtYmVyLCBvZmZzZXQ6IFRIUkVFLlZlY3RvcjMpOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoIHtcbiAgICBjb25zdCBjb2xsaWRlck1lc2ggPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlQnVmZmVyR2VvbWV0cnkocmFkaXVzLCA4LCA0KSwgX2NvbGxpZGVyTWF0ZXJpYWwpO1xuXG4gICAgY29sbGlkZXJNZXNoLnBvc2l0aW9uLmNvcHkob2Zmc2V0KTtcblxuICAgIC8vIHRoZSBuYW1lIGhhdmUgdG8gYmUgdGhpcyBpbiBvcmRlciB0byBleGNsdWRlIGNvbGxpZGVycyBmcm9tIGJvdW5kaW5nIGJveFxuICAgIC8vIChTZWUgVmlld2VyLnRzLCBzZWFyY2ggZm9yIGNoaWxkLm5hbWUgPT09ICd2cm1Db2xsaWRlclNwaGVyZScpXG4gICAgY29sbGlkZXJNZXNoLm5hbWUgPSAndnJtQ29sbGlkZXJTcGhlcmUnO1xuXG4gICAgLy8gV2Ugd2lsbCB1c2UgdGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIGZvciBjb2xsaXNpb24gdnMgYm9uZXMuXG4gICAgLy8gYGJvdW5kaW5nU3BoZXJlYCBtdXN0IGJlIGNyZWF0ZWQgdG8gY29tcHV0ZSB0aGUgcmFkaXVzLlxuICAgIGNvbGxpZGVyTWVzaC5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcblxuICAgIHJldHVybiBjb2xsaWRlck1lc2g7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIHNwcmluZyBib25lIGdyb3VwIG9mIGEgVlJNLlxuICovXG5leHBvcnQgdHlwZSBWUk1TcHJpbmdCb25lR3JvdXAgPSBWUk1TcHJpbmdCb25lW107XG5cbi8qKlxuICogQSBjbGFzcyBtYW5hZ2VzIGV2ZXJ5IHNwcmluZyBib25lcyBvbiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdID0gW107XG4gIHB1YmxpYyByZWFkb25seSBzcHJpbmdCb25lR3JvdXBMaXN0OiBWUk1TcHJpbmdCb25lR3JvdXBbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dXG4gICAqXG4gICAqIEBwYXJhbSBzcHJpbmdCb25lR3JvdXBMaXN0IEFuIGFycmF5IG9mIFtbVlJNU3ByaW5nQm9uZUdyb3VwXV1cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSwgc3ByaW5nQm9uZUdyb3VwTGlzdDogVlJNU3ByaW5nQm9uZUdyb3VwW10pIHtcbiAgICB0aGlzLmNvbGxpZGVyR3JvdXBzID0gY29sbGlkZXJHcm91cHM7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0ID0gc3ByaW5nQm9uZUdyb3VwTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYWxsIGJvbmVzIGJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIHNwYWNlIHJlbGF0aXZlIGZyb20gdGhpcyBvYmplY3QuXG4gICAqIElmIGBudWxsYCBpcyBnaXZlbiwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqIEBwYXJhbSByb290IFJvb3Qgb2JqZWN0LCBvciBgbnVsbGBcbiAgICovXG4gIHB1YmxpYyBzZXRDZW50ZXIocm9vdDogVEhSRUUuT2JqZWN0M0QgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goKHNwcmluZ0JvbmVHcm91cCkgPT4ge1xuICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgICAgc3ByaW5nQm9uZS5jZW50ZXIgPSByb290O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGV2ZXJ5IHNwcmluZyBib25lIGF0dGFjaGVkIHRvIHRoaXMgbWFuYWdlci5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIGxhdGVVcGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUudXBkYXRlKGRlbHRhKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGV2ZXJ5IHNwcmluZyBib25lIGF0dGFjaGVkIHRvIHRoaXMgbWFuYWdlci5cbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBzcHJpbmdCb25lLnJlc2V0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lSW1wb3J0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzJztcbiIsIi8vIFR5cGVkb2MgZG9lcyBub3Qgc3VwcG9ydCBleHBvcnQgZGVjbGFyYXRpb25zIHlldFxuLy8gdGhlbiB3ZSBoYXZlIHRvIHVzZSBgbmFtZXNwYWNlYCBpbnN0ZWFkIG9mIGV4cG9ydCBkZWNsYXJhdGlvbnMgZm9yIG5vdy5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1R5cGVTdHJvbmcvdHlwZWRvYy9wdWxsLzgwMVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBWUk1TY2hlbWEge1xuICAvKipcbiAgICogVlJNIGV4dGVuc2lvbiBpcyBmb3IgM2QgaHVtYW5vaWQgYXZhdGFycyAoYW5kIG1vZGVscykgaW4gVlIgYXBwbGljYXRpb25zLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBWUk0ge1xuICAgIGJsZW5kU2hhcGVNYXN0ZXI/OiBCbGVuZFNoYXBlO1xuICAgIC8qKlxuICAgICAqIFZlcnNpb24gb2YgZXhwb3J0ZXIgdGhhdCB2cm0gY3JlYXRlZC4gVW5pVlJNLTAuNTMuMFxuICAgICAqL1xuICAgIGV4cG9ydGVyVmVyc2lvbj86IHN0cmluZztcbiAgICBmaXJzdFBlcnNvbj86IEZpcnN0UGVyc29uO1xuICAgIGh1bWFub2lkPzogSHVtYW5vaWQ7XG4gICAgbWF0ZXJpYWxQcm9wZXJ0aWVzPzogTWF0ZXJpYWxbXTtcbiAgICBtZXRhPzogTWV0YTtcbiAgICBzZWNvbmRhcnlBbmltYXRpb24/OiBTZWNvbmRhcnlBbmltYXRpb247XG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBvZiBWUk0gc3BlY2lmaWNhdGlvbi4gMC4wXG4gICAgICovXG4gICAgc3BlY1ZlcnNpb24/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogQmxlbmRTaGFwZUF2YXRhciBvZiBVbmlWUk1cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZSB7XG4gICAgYmxlbmRTaGFwZUdyb3Vwcz86IEJsZW5kU2hhcGVHcm91cFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBCbGVuZFNoYXBlR3JvdXAge1xuICAgIC8qKlxuICAgICAqIExvdyBsZXZlbCBibGVuZHNoYXBlIHJlZmVyZW5jZXMuXG4gICAgICovXG4gICAgYmluZHM/OiBCbGVuZFNoYXBlQmluZFtdO1xuICAgIC8qKlxuICAgICAqIDAgb3IgMS4gRG8gbm90IGFsbG93IGFuIGludGVybWVkaWF0ZSB2YWx1ZS4gVmFsdWUgc2hvdWxkIHJvdW5kZWRcbiAgICAgKi9cbiAgICBpc0JpbmFyeT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogTWF0ZXJpYWwgYW5pbWF0aW9uIHJlZmVyZW5jZXMuXG4gICAgICovXG4gICAgbWF0ZXJpYWxWYWx1ZXM/OiBCbGVuZFNoYXBlTWF0ZXJpYWxiaW5kW107XG4gICAgLyoqXG4gICAgICogRXhwcmVzc2lvbiBuYW1lXG4gICAgICovXG4gICAgbmFtZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBQcmVkZWZpbmVkIEV4cHJlc3Npb24gbmFtZVxuICAgICAqL1xuICAgIHByZXNldE5hbWU/OiBCbGVuZFNoYXBlUHJlc2V0TmFtZTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZUJpbmQge1xuICAgIGluZGV4PzogbnVtYmVyO1xuICAgIG1lc2g/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogU2tpbm5lZE1lc2hSZW5kZXJlci5TZXRCbGVuZFNoYXBlV2VpZ2h0XG4gICAgICovXG4gICAgd2VpZ2h0PzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBCbGVuZFNoYXBlTWF0ZXJpYWxiaW5kIHtcbiAgICBtYXRlcmlhbE5hbWU/OiBzdHJpbmc7XG4gICAgcHJvcGVydHlOYW1lPzogc3RyaW5nO1xuICAgIHRhcmdldFZhbHVlPzogbnVtYmVyW107XG4gIH1cblxuICAvKipcbiAgICogUHJlZGVmaW5lZCBFeHByZXNzaW9uIG5hbWVcbiAgICovXG4gIGV4cG9ydCBlbnVtIEJsZW5kU2hhcGVQcmVzZXROYW1lIHtcbiAgICBBID0gJ2EnLFxuICAgIEFuZ3J5ID0gJ2FuZ3J5JyxcbiAgICBCbGluayA9ICdibGluaycsXG4gICAgQmxpbmtMID0gJ2JsaW5rX2wnLFxuICAgIEJsaW5rUiA9ICdibGlua19yJyxcbiAgICBFID0gJ2UnLFxuICAgIEZ1biA9ICdmdW4nLFxuICAgIEkgPSAnaScsXG4gICAgSm95ID0gJ2pveScsXG4gICAgTG9va2Rvd24gPSAnbG9va2Rvd24nLFxuICAgIExvb2tsZWZ0ID0gJ2xvb2tsZWZ0JyxcbiAgICBMb29rcmlnaHQgPSAnbG9va3JpZ2h0JyxcbiAgICBMb29rdXAgPSAnbG9va3VwJyxcbiAgICBOZXV0cmFsID0gJ25ldXRyYWwnLFxuICAgIE8gPSAnbycsXG4gICAgU29ycm93ID0gJ3NvcnJvdycsXG4gICAgVSA9ICd1JyxcbiAgICBVbmtub3duID0gJ3Vua25vd24nLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBlcnNvbiB7XG4gICAgLyoqXG4gICAgICogVGhlIGJvbmUgd2hvc2UgcmVuZGVyaW5nIHNob3VsZCBiZSB0dXJuZWQgb2ZmIGluIGZpcnN0LXBlcnNvbiB2aWV3LiBVc3VhbGx5IEhlYWQgaXNcbiAgICAgKiBzcGVjaWZpZWQuXG4gICAgICovXG4gICAgZmlyc3RQZXJzb25Cb25lPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgcG9zaXRpb24gb2YgdGhlIFZSIGhlYWRzZXQgaW4gZmlyc3QtcGVyc29uIHZpZXcuIEl0IGlzIGFzc3VtZWQgdGhhdCBhbiBvZmZzZXRcbiAgICAgKiBmcm9tIHRoZSBoZWFkIGJvbmUgdG8gdGhlIFZSIGhlYWRzZXQgaXMgYWRkZWQuXG4gICAgICovXG4gICAgZmlyc3RQZXJzb25Cb25lT2Zmc2V0PzogVmVjdG9yMztcbiAgICBsb29rQXRIb3Jpem9udGFsSW5uZXI/OiBGaXJzdFBlcnNvbkRlZ3JlZU1hcDtcbiAgICBsb29rQXRIb3Jpem9udGFsT3V0ZXI/OiBGaXJzdFBlcnNvbkRlZ3JlZU1hcDtcbiAgICAvKipcbiAgICAgKiBFeWUgY29udHJvbGxlciBtb2RlLlxuICAgICAqL1xuICAgIGxvb2tBdFR5cGVOYW1lPzogRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZTtcbiAgICBsb29rQXRWZXJ0aWNhbERvd24/OiBGaXJzdFBlcnNvbkRlZ3JlZU1hcDtcbiAgICBsb29rQXRWZXJ0aWNhbFVwPzogRmlyc3RQZXJzb25EZWdyZWVNYXA7XG4gICAgLyoqXG4gICAgICogU3dpdGNoIGRpc3BsYXkgLyB1bmRpc3BsYXkgZm9yIGVhY2ggbWVzaCBpbiBmaXJzdC1wZXJzb24gdmlldyBvciB0aGUgb3RoZXJzLlxuICAgICAqL1xuICAgIG1lc2hBbm5vdGF0aW9ucz86IEZpcnN0UGVyc29uTWVzaGFubm90YXRpb25bXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeWUgY29udHJvbGxlciBzZXR0aW5nLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBlcnNvbkRlZ3JlZU1hcCB7XG4gICAgLyoqXG4gICAgICogTm9uZSBsaW5lYXIgbWFwcGluZyBwYXJhbXMuIHRpbWUsIHZhbHVlLCBpblRhbmdlbnQsIG91dFRhbmdlbnRcbiAgICAgKi9cbiAgICBjdXJ2ZT86IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIExvb2sgYXQgaW5wdXQgY2xhbXAgcmFuZ2UgZGVncmVlLlxuICAgICAqL1xuICAgIHhSYW5nZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBMb29rIGF0IG1hcCByYW5nZSBkZWdyZWUgZnJvbSB4UmFuZ2UuXG4gICAgICovXG4gICAgeVJhbmdlPzogbnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEV5ZSBjb250cm9sbGVyIG1vZGUuXG4gICAqL1xuICBleHBvcnQgZW51bSBGaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lIHtcbiAgICBCbGVuZFNoYXBlID0gJ0JsZW5kU2hhcGUnLFxuICAgIEJvbmUgPSAnQm9uZScsXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEZpcnN0UGVyc29uTWVzaGFubm90YXRpb24ge1xuICAgIGZpcnN0UGVyc29uRmxhZz86IHN0cmluZztcbiAgICBtZXNoPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBIdW1hbm9pZCB7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmFybVN0cmV0Y2hcbiAgICAgKi9cbiAgICBhcm1TdHJldGNoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5mZWV0U3BhY2luZ1xuICAgICAqL1xuICAgIGZlZXRTcGFjaW5nPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5oYXNUcmFuc2xhdGlvbkRvRlxuICAgICAqL1xuICAgIGhhc1RyYW5zbGF0aW9uRG9GPzogYm9vbGVhbjtcbiAgICBodW1hbkJvbmVzPzogSHVtYW5vaWRCb25lW107XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmxlZ1N0cmV0Y2hcbiAgICAgKi9cbiAgICBsZWdTdHJldGNoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5sb3dlckFybVR3aXN0XG4gICAgICovXG4gICAgbG93ZXJBcm1Ud2lzdD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24ubG93ZXJMZWdUd2lzdFxuICAgICAqL1xuICAgIGxvd2VyTGVnVHdpc3Q/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLnVwcGVyQXJtVHdpc3RcbiAgICAgKi9cbiAgICB1cHBlckFybVR3aXN0PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi51cHBlckxlZ1R3aXN0XG4gICAgICovXG4gICAgdXBwZXJMZWdUd2lzdD86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSHVtYW5vaWRCb25lIHtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQuYXhpc0xlbmd0aFxuICAgICAqL1xuICAgIGF4aXNMZW5ndGg/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogSHVtYW4gYm9uZSBuYW1lLlxuICAgICAqL1xuICAgIGJvbmU/OiBIdW1hbm9pZEJvbmVOYW1lO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5MaW1pdC5jZW50ZXJcbiAgICAgKi9cbiAgICBjZW50ZXI/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5MaW1pdC5tYXhcbiAgICAgKi9cbiAgICBtYXg/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5MaW1pdC5taW5cbiAgICAgKi9cbiAgICBtaW4/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSBub2RlIGluZGV4XG4gICAgICovXG4gICAgbm9kZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuTGltaXQudXNlRGVmYXVsdFZhbHVlc1xuICAgICAqL1xuICAgIHVzZURlZmF1bHRWYWx1ZXM/OiBib29sZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEh1bWFuIGJvbmUgbmFtZS5cbiAgICovXG4gIGV4cG9ydCBlbnVtIEh1bWFub2lkQm9uZU5hbWUge1xuICAgIENoZXN0ID0gJ2NoZXN0JyxcbiAgICBIZWFkID0gJ2hlYWQnLFxuICAgIEhpcHMgPSAnaGlwcycsXG4gICAgSmF3ID0gJ2phdycsXG4gICAgTGVmdEV5ZSA9ICdsZWZ0RXllJyxcbiAgICBMZWZ0Rm9vdCA9ICdsZWZ0Rm9vdCcsXG4gICAgTGVmdEhhbmQgPSAnbGVmdEhhbmQnLFxuICAgIExlZnRJbmRleERpc3RhbCA9ICdsZWZ0SW5kZXhEaXN0YWwnLFxuICAgIExlZnRJbmRleEludGVybWVkaWF0ZSA9ICdsZWZ0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRJbmRleFByb3hpbWFsID0gJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgICBMZWZ0TGl0dGxlRGlzdGFsID0gJ2xlZnRMaXR0bGVEaXN0YWwnLFxuICAgIExlZnRMaXR0bGVJbnRlcm1lZGlhdGUgPSAnbGVmdExpdHRsZUludGVybWVkaWF0ZScsXG4gICAgTGVmdExpdHRsZVByb3hpbWFsID0gJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gICAgTGVmdExvd2VyQXJtID0gJ2xlZnRMb3dlckFybScsXG4gICAgTGVmdExvd2VyTGVnID0gJ2xlZnRMb3dlckxlZycsXG4gICAgTGVmdE1pZGRsZURpc3RhbCA9ICdsZWZ0TWlkZGxlRGlzdGFsJyxcbiAgICBMZWZ0TWlkZGxlSW50ZXJtZWRpYXRlID0gJ2xlZnRNaWRkbGVJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRNaWRkbGVQcm94aW1hbCA9ICdsZWZ0TWlkZGxlUHJveGltYWwnLFxuICAgIExlZnRSaW5nRGlzdGFsID0gJ2xlZnRSaW5nRGlzdGFsJyxcbiAgICBMZWZ0UmluZ0ludGVybWVkaWF0ZSA9ICdsZWZ0UmluZ0ludGVybWVkaWF0ZScsXG4gICAgTGVmdFJpbmdQcm94aW1hbCA9ICdsZWZ0UmluZ1Byb3hpbWFsJyxcbiAgICBMZWZ0U2hvdWxkZXIgPSAnbGVmdFNob3VsZGVyJyxcbiAgICBMZWZ0VGh1bWJEaXN0YWwgPSAnbGVmdFRodW1iRGlzdGFsJyxcbiAgICBMZWZ0VGh1bWJJbnRlcm1lZGlhdGUgPSAnbGVmdFRodW1iSW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0VGh1bWJQcm94aW1hbCA9ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gICAgTGVmdFRvZXMgPSAnbGVmdFRvZXMnLFxuICAgIExlZnRVcHBlckFybSA9ICdsZWZ0VXBwZXJBcm0nLFxuICAgIExlZnRVcHBlckxlZyA9ICdsZWZ0VXBwZXJMZWcnLFxuICAgIE5lY2sgPSAnbmVjaycsXG4gICAgUmlnaHRFeWUgPSAncmlnaHRFeWUnLFxuICAgIFJpZ2h0Rm9vdCA9ICdyaWdodEZvb3QnLFxuICAgIFJpZ2h0SGFuZCA9ICdyaWdodEhhbmQnLFxuICAgIFJpZ2h0SW5kZXhEaXN0YWwgPSAncmlnaHRJbmRleERpc3RhbCcsXG4gICAgUmlnaHRJbmRleEludGVybWVkaWF0ZSA9ICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodEluZGV4UHJveGltYWwgPSAncmlnaHRJbmRleFByb3hpbWFsJyxcbiAgICBSaWdodExpdHRsZURpc3RhbCA9ICdyaWdodExpdHRsZURpc3RhbCcsXG4gICAgUmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUgPSAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0TGl0dGxlUHJveGltYWwgPSAncmlnaHRMaXR0bGVQcm94aW1hbCcsXG4gICAgUmlnaHRMb3dlckFybSA9ICdyaWdodExvd2VyQXJtJyxcbiAgICBSaWdodExvd2VyTGVnID0gJ3JpZ2h0TG93ZXJMZWcnLFxuICAgIFJpZ2h0TWlkZGxlRGlzdGFsID0gJ3JpZ2h0TWlkZGxlRGlzdGFsJyxcbiAgICBSaWdodE1pZGRsZUludGVybWVkaWF0ZSA9ICdyaWdodE1pZGRsZUludGVybWVkaWF0ZScsXG4gICAgUmlnaHRNaWRkbGVQcm94aW1hbCA9ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgICBSaWdodFJpbmdEaXN0YWwgPSAncmlnaHRSaW5nRGlzdGFsJyxcbiAgICBSaWdodFJpbmdJbnRlcm1lZGlhdGUgPSAncmlnaHRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodFJpbmdQcm94aW1hbCA9ICdyaWdodFJpbmdQcm94aW1hbCcsXG4gICAgUmlnaHRTaG91bGRlciA9ICdyaWdodFNob3VsZGVyJyxcbiAgICBSaWdodFRodW1iRGlzdGFsID0gJ3JpZ2h0VGh1bWJEaXN0YWwnLFxuICAgIFJpZ2h0VGh1bWJJbnRlcm1lZGlhdGUgPSAncmlnaHRUaHVtYkludGVybWVkaWF0ZScsXG4gICAgUmlnaHRUaHVtYlByb3hpbWFsID0gJ3JpZ2h0VGh1bWJQcm94aW1hbCcsXG4gICAgUmlnaHRUb2VzID0gJ3JpZ2h0VG9lcycsXG4gICAgUmlnaHRVcHBlckFybSA9ICdyaWdodFVwcGVyQXJtJyxcbiAgICBSaWdodFVwcGVyTGVnID0gJ3JpZ2h0VXBwZXJMZWcnLFxuICAgIFNwaW5lID0gJ3NwaW5lJyxcbiAgICBVcHBlckNoZXN0ID0gJ3VwcGVyQ2hlc3QnLFxuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBNYXRlcmlhbCB7XG4gICAgZmxvYXRQcm9wZXJ0aWVzPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBrZXl3b3JkTWFwPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHJlbmRlclF1ZXVlPzogbnVtYmVyO1xuICAgIHNoYWRlcj86IHN0cmluZztcbiAgICB0YWdNYXA/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIHRleHR1cmVQcm9wZXJ0aWVzPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICB2ZWN0b3JQcm9wZXJ0aWVzPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWV0YSB7XG4gICAgLyoqXG4gICAgICogQSBwZXJzb24gd2hvIGNhbiBwZXJmb3JtIHdpdGggdGhpcyBhdmF0YXJcbiAgICAgKi9cbiAgICBhbGxvd2VkVXNlck5hbWU/OiBNZXRhQWxsb3dlZFVzZXJOYW1lO1xuICAgIC8qKlxuICAgICAqIEF1dGhvciBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICBhdXRob3I/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRm9yIGNvbW1lcmNpYWwgdXNlXG4gICAgICovXG4gICAgY29tbWVyY2lhbFVzc2FnZU5hbWU/OiBNZXRhVXNzYWdlTmFtZTtcbiAgICAvKipcbiAgICAgKiBDb250YWN0IEluZm9ybWF0aW9uIG9mIFZSTSBtb2RlbCBhdXRob3JcbiAgICAgKi9cbiAgICBjb250YWN0SW5mb3JtYXRpb24/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTGljZW5zZSB0eXBlXG4gICAgICovXG4gICAgbGljZW5zZU5hbWU/OiBNZXRhTGljZW5zZU5hbWU7XG4gICAgLyoqXG4gICAgICogSWYg4oCcT3RoZXLigJ0gaXMgc2VsZWN0ZWQsIHB1dCB0aGUgVVJMIGxpbmsgb2YgdGhlIGxpY2Vuc2UgZG9jdW1lbnQgaGVyZS5cbiAgICAgKi9cbiAgICBvdGhlckxpY2Vuc2VVcmw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUgYXJlIGFueSBjb25kaXRpb25zIG5vdCBtZW50aW9uZWQgYWJvdmUsIHB1dCB0aGUgVVJMIGxpbmsgb2YgdGhlIGxpY2Vuc2UgZG9jdW1lbnRcbiAgICAgKiBoZXJlLlxuICAgICAqL1xuICAgIG90aGVyUGVybWlzc2lvblVybD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2Ugb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgcmVmZXJlbmNlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSBzZXh1YWwgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAgICovXG4gICAgc2V4dWFsVXNzYWdlTmFtZT86IE1ldGFVc3NhZ2VOYW1lO1xuICAgIC8qKlxuICAgICAqIFRodW1ibmFpbCBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICB0ZXh0dXJlPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRpdGxlIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFZlcnNpb24gb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgdmVyc2lvbj86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gdmlvbGVudCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAgICAgKi9cbiAgICB2aW9sZW50VXNzYWdlTmFtZT86IE1ldGFVc3NhZ2VOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcGVyc29uIHdobyBjYW4gcGVyZm9ybSB3aXRoIHRoaXMgYXZhdGFyXG4gICAqL1xuICBleHBvcnQgZW51bSBNZXRhQWxsb3dlZFVzZXJOYW1lIHtcbiAgICBFdmVyeW9uZSA9ICdFdmVyeW9uZScsXG4gICAgRXhwbGljaXRseUxpY2Vuc2VkUGVyc29uID0gJ0V4cGxpY2l0bHlMaWNlbnNlZFBlcnNvbicsXG4gICAgT25seUF1dGhvciA9ICdPbmx5QXV0aG9yJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgY29tbWVyY2lhbCB1c2VcbiAgICpcbiAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHNleHVhbCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAgICpcbiAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHZpb2xlbnQgYWN0cyB3aXRoIHRoaXMgYXZhdGFyXG4gICAqL1xuICBleHBvcnQgZW51bSBNZXRhVXNzYWdlTmFtZSB7XG4gICAgQWxsb3cgPSAnQWxsb3cnLFxuICAgIERpc2FsbG93ID0gJ0Rpc2FsbG93JyxcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWNlbnNlIHR5cGVcbiAgICovXG4gIGV4cG9ydCBlbnVtIE1ldGFMaWNlbnNlTmFtZSB7XG4gICAgQ2MwID0gJ0NDMCcsXG4gICAgQ2NCeSA9ICdDQ19CWScsXG4gICAgQ2NCeU5jID0gJ0NDX0JZX05DJyxcbiAgICBDY0J5TmNOZCA9ICdDQ19CWV9OQ19ORCcsXG4gICAgQ2NCeU5jU2EgPSAnQ0NfQllfTkNfU0EnLFxuICAgIENjQnlOZCA9ICdDQ19CWV9ORCcsXG4gICAgQ2NCeVNhID0gJ0NDX0JZX1NBJyxcbiAgICBPdGhlciA9ICdPdGhlcicsXG4gICAgUmVkaXN0cmlidXRpb25Qcm9oaWJpdGVkID0gJ1JlZGlzdHJpYnV0aW9uX1Byb2hpYml0ZWQnLFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzZXR0aW5nIG9mIGF1dG9tYXRpYyBhbmltYXRpb24gb2Ygc3RyaW5nLWxpa2Ugb2JqZWN0cyBzdWNoIGFzIHRhaWxzIGFuZCBoYWlycy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2Vjb25kYXJ5QW5pbWF0aW9uIHtcbiAgICBib25lR3JvdXBzPzogU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nW107XG4gICAgY29sbGlkZXJHcm91cHM/OiBTZWNvbmRhcnlBbmltYXRpb25Db2xsaWRlcmdyb3VwW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFNlY29uZGFyeUFuaW1hdGlvblNwcmluZyB7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgbm9kZSBpbmRleCBvZiB0aGUgcm9vdCBib25lIG9mIHRoZSBzd2F5aW5nIG9iamVjdC5cbiAgICAgKi9cbiAgICBib25lcz86IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIFRoZSByZWZlcmVuY2UgcG9pbnQgb2YgYSBzd2F5aW5nIG9iamVjdCBjYW4gYmUgc2V0IGF0IGFueSBsb2NhdGlvbiBleGNlcHQgdGhlIG9yaWdpbi5cbiAgICAgKiBXaGVuIGltcGxlbWVudGluZyBVSSBtb3Zpbmcgd2l0aCB3YXJwLCB0aGUgcGFyZW50IG5vZGUgdG8gbW92ZSB3aXRoIHdhcnAgY2FuIGJlIHNwZWNpZmllZFxuICAgICAqIGlmIHlvdSBkb24ndCB3YW50IHRvIG1ha2UgdGhlIG9iamVjdCBzd2F5aW5nIHdpdGggd2FycCBtb3ZlbWVudC5cbiAgICAgKi9cbiAgICBjZW50ZXI/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgaW5kZXggb2YgdGhlIGNvbGxpZGVyIGdyb3VwIGZvciBjb2xsaXNpb25zIHdpdGggc3dheWluZyBvYmplY3RzLlxuICAgICAqL1xuICAgIGNvbGxpZGVyR3JvdXBzPzogbnVtYmVyW107XG4gICAgLyoqXG4gICAgICogQW5ub3RhdGlvbiBjb21tZW50XG4gICAgICovXG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgcmVzaXN0YW5jZSAoZGVjZWxlcmF0aW9uKSBvZiBhdXRvbWF0aWMgYW5pbWF0aW9uLlxuICAgICAqL1xuICAgIGRyYWdGb3JjZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgZGlyZWN0aW9uIG9mIGdyYXZpdHkuIFNldCAoMCwgLTEsIDApIGZvciBzaW11bGF0aW5nIHRoZSBncmF2aXR5LiBTZXQgKDEsIDAsIDApIGZvclxuICAgICAqIHNpbXVsYXRpbmcgdGhlIHdpbmQuXG4gICAgICovXG4gICAgZ3Jhdml0eURpcj86IFZlY3RvcjM7XG4gICAgLyoqXG4gICAgICogVGhlIHN0cmVuZ3RoIG9mIGdyYXZpdHkuXG4gICAgICovXG4gICAgZ3Jhdml0eVBvd2VyPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSByYWRpdXMgb2YgdGhlIHNwaGVyZSB1c2VkIGZvciB0aGUgY29sbGlzaW9uIGRldGVjdGlvbiB3aXRoIGNvbGxpZGVycy5cbiAgICAgKi9cbiAgICBoaXRSYWRpdXM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIHJlc2lsaWVuY2Ugb2YgdGhlIHN3YXlpbmcgb2JqZWN0ICh0aGUgcG93ZXIgb2YgcmV0dXJuaW5nIHRvIHRoZSBpbml0aWFsIHBvc2UpLlxuICAgICAqL1xuICAgIHN0aWZmaW5lc3M/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyZ3JvdXAge1xuICAgIGNvbGxpZGVycz86IFNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyW107XG4gICAgLyoqXG4gICAgICogVGhlIG5vZGUgb2YgdGhlIGNvbGxpZGVyIGdyb3VwIGZvciBzZXR0aW5nIHVwIGNvbGxpc2lvbiBkZXRlY3Rpb25zLlxuICAgICAqL1xuICAgIG5vZGU/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbG9jYWwgY29vcmRpbmF0ZSBmcm9tIHRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cC5cbiAgICAgKi9cbiAgICBvZmZzZXQ/OiBWZWN0b3IzO1xuICAgIC8qKlxuICAgICAqIFRoZSByYWRpdXMgb2YgdGhlIGNvbGxpZGVyLlxuICAgICAqL1xuICAgIHJhZGl1cz86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgVmVjdG9yMyB7XG4gICAgeD86IG51bWJlcjtcbiAgICB5PzogbnVtYmVyO1xuICAgIHo/OiBudW1iZXI7XG4gIH1cbn1cbiIsIi8vIFR5cGVkb2MgZG9lcyBub3Qgc3VwcG9ydCBleHBvcnQgZGVjbGFyYXRpb25zIHlldFxuLy8gdGhlbiB3ZSBoYXZlIHRvIHVzZSBgbmFtZXNwYWNlYCBpbnN0ZWFkIG9mIGV4cG9ydCBkZWNsYXJhdGlvbnMgZm9yIG5vdy5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1R5cGVTdHJvbmcvdHlwZWRvYy9wdWxsLzgwMVxuXG4vLyBpbXBvcnQgKiBhcyBHTFRGU2NoZW1hIGZyb20gJy4vR0xURlNjaGVtYSc7XG4vLyBpbXBvcnQgKiBhcyBWUk1TY2hlbWEgZnJvbSAnLi9WUk1TY2hlbWEnO1xuXG4vLyBleHBvcnQgeyBHTFRGU2NoZW1hLCBWUk1TY2hlbWEgfTtcblxuZXhwb3J0ICogZnJvbSAnLi9HTFRGU2NoZW1hJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU2NoZW1hJztcblxuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBNYXRyaXg0SW52ZXJzZUNhY2hlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgbWF0cml4LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1hdHJpeDogVEhSRUUuTWF0cml4NDtcblxuICAvKipcbiAgICogQSBjYWNoZSBvZiBpbnZlcnNlIG9mIGN1cnJlbnQgbWF0cml4LlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW52ZXJzZUNhY2hlID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogQSBmbGFnIHRoYXQgbWFrZXMgaXQgd2FudCB0byByZWNhbGN1bGF0ZSBpdHMge0BsaW5rIF9pbnZlcnNlQ2FjaGV9LlxuICAgKiBXaWxsIGJlIHNldCBgdHJ1ZWAgd2hlbiBgZWxlbWVudHNgIGFyZSBtdXRhdGVkIGFuZCBiZSB1c2VkIGluIGBnZXRJbnZlcnNlYC5cbiAgICovXG4gIHByaXZhdGUgX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luYWwgb2YgYG1hdHJpeC5lbGVtZW50c2BcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX29yaWdpbmFsRWxlbWVudHM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBJbnZlcnNlIG9mIGdpdmVuIG1hdHJpeC5cbiAgICogTm90ZSB0aGF0IGl0IHdpbGwgcmV0dXJuIGl0cyBpbnRlcm5hbCBwcml2YXRlIGluc3RhbmNlLlxuICAgKiBNYWtlIHN1cmUgY29weWluZyB0aGlzIGJlZm9yZSBtdXRhdGUgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW52ZXJzZSgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICBpZiAodGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSkge1xuICAgICAgdGhpcy5faW52ZXJzZUNhY2hlLmdldEludmVyc2UodGhpcy5tYXRyaXgpO1xuICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlSW52ZXJzZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbnZlcnNlQ2FjaGU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IobWF0cml4OiBUSFJFRS5NYXRyaXg0KSB7XG4gICAgdGhpcy5tYXRyaXggPSBtYXRyaXg7XG5cbiAgICBjb25zdCBoYW5kbGVyOiBQcm94eUhhbmRsZXI8bnVtYmVyW10+ID0ge1xuICAgICAgc2V0OiAob2JqLCBwcm9wOiBudW1iZXIsIG5ld1ZhbCkgPT4ge1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gdHJ1ZTtcbiAgICAgICAgb2JqW3Byb3BdID0gbmV3VmFsO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdGhpcy5fb3JpZ2luYWxFbGVtZW50cyA9IG1hdHJpeC5lbGVtZW50cztcbiAgICBtYXRyaXguZWxlbWVudHMgPSBuZXcgUHJveHkobWF0cml4LmVsZW1lbnRzLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnQoKTogdm9pZCB7XG4gICAgdGhpcy5tYXRyaXguZWxlbWVudHMgPSB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzO1xuICB9XG59XG4iLCIvLyBTZWU6IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jbWFudWFsL2VuL2ludHJvZHVjdGlvbi9Ib3ctdG8tZGlzcG9zZS1vZi1vYmplY3RzXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZnVuY3Rpb24gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IHZvaWQge1xuICBPYmplY3Qua2V5cyhtYXRlcmlhbCkuZm9yRWFjaCgocHJvcGVydHlOYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdO1xuICAgIGlmICh2YWx1ZT8uaXNUZXh0dXJlKSB7XG4gICAgICBjb25zdCB0ZXh0dXJlID0gdmFsdWUgYXMgVEhSRUUuVGV4dHVyZTtcbiAgICAgIHRleHR1cmUuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWF0ZXJpYWwuZGlzcG9zZSgpO1xufVxuXG5mdW5jdGlvbiBkaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBjb25zdCBnZW9tZXRyeTogVEhSRUUuR2VvbWV0cnkgPSAob2JqZWN0M0QgYXMgYW55KS5nZW9tZXRyeTtcbiAgaWYgKGdlb21ldHJ5KSB7XG4gICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICB9XG5cbiAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsIHwgVEhSRUUuTWF0ZXJpYWxbXSA9IChvYmplY3QzRCBhcyBhbnkpLm1hdGVyaWFsO1xuICBpZiAobWF0ZXJpYWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgIG1hdGVyaWFsLmZvckVhY2goKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCkgPT4gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gICAgfSBlbHNlIGlmIChtYXRlcmlhbCkge1xuICAgICAgZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBEaXNwb3NlKG9iamVjdDNEOiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICBvYmplY3QzRC50cmF2ZXJzZShkaXNwb3NlKTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBDbGFtcCBhbiBpbnB1dCBudW1iZXIgd2l0aGluIFsgYDAuMGAgLSBgMS4wYCBdLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5wdXQgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdHVyYXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEuMCksIDAuMCk7XG59XG5cbi8qKlxuICogTWFwIHRoZSByYW5nZSBvZiBhbiBpbnB1dCB2YWx1ZSBmcm9tIFsgYG1pbmAgLSBgbWF4YCBdIHRvIFsgYDAuMGAgLSBgMS4wYCBdLlxuICogSWYgaW5wdXQgdmFsdWUgaXMgbGVzcyB0aGFuIGBtaW5gICwgaXQgcmV0dXJucyBgMC4wYC5cbiAqIElmIGlucHV0IHZhbHVlIGlzIGdyZWF0ZXIgdGhhbiBgbWF4YCAsIGl0IHJldHVybnMgYDEuMGAuXG4gKlxuICogU2VlIGFsc286IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL21hdGgvTWF0aC5zbW9vdGhzdGVwXG4gKlxuICogQHBhcmFtIHggVGhlIHZhbHVlIHRoYXQgd2lsbCBiZSBtYXBwZWQgaW50byB0aGUgc3BlY2lmaWVkIHJhbmdlXG4gKiBAcGFyYW0gbWluIE1pbmltdW0gdmFsdWUgb2YgdGhlIHJhbmdlXG4gKiBAcGFyYW0gbWF4IE1heGltdW0gdmFsdWUgb2YgdGhlIHJhbmdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW5zdGVwKHg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHggPD0gbWluKSByZXR1cm4gMDtcbiAgaWYgKHggPj0gbWF4KSByZXR1cm4gMTtcblxuICByZXR1cm4gKHggLSBtaW4pIC8gKG1heCAtIG1pbik7XG59XG5cbmNvbnN0IF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3JvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBFeHRyYWN0IHdvcmxkIHBvc2l0aW9uIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIGluIGNoZWFwZXIgd2F5LlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdFxuICogQHBhcmFtIG91dCBUYXJnZXQgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFBvc2l0aW9uTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShvdXQsIF9yb3RhdGlvbiwgX3NjYWxlKTtcbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHdvcmxkIHNjYWxlIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIGluIGNoZWFwZXIgd2F5LlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdFxuICogQHBhcmFtIG91dCBUYXJnZXQgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFNjYWxlTGl0ZShvYmplY3Q6IFRIUkVFLk9iamVjdDNELCBvdXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgb2JqZWN0Lm1hdHJpeFdvcmxkLmRlY29tcG9zZShfcG9zaXRpb24sIF9yb3RhdGlvbiwgb3V0KTtcbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHdvcmxkIHJvdGF0aW9uIG9mIGFuIG9iamVjdCBmcm9tIGl0cyB3b3JsZCBzcGFjZSBtYXRyaXgsIGluIGNoZWFwZXIgd2F5LlxuICpcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdFxuICogQHBhcmFtIG91dCBUYXJnZXQgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgb3V0LCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgIGNvbnNvbGUud2FybihgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eTogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xuXG4gIGlmICghL1tBLVpdLy50ZXN0KG5hbWVbMF0pKSB7XG4gICAgY29uc29sZS53YXJuKGByZW5hbWVNYXRlcmlhbFByb3BlcnR5OiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICByZXR1cm4gbmFtZVswXS50b0xvd2VyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFRIUkVFOyJdLCJzb3VyY2VSb290IjoiIn0=