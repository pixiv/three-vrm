/*!
 * @pixiv/three-vrm v0.4.3
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvYXNzaWduLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vVlJNLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL2V4dHJhY3RUaHVtYm5haWxCbG9iLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVV0aWxzL3JlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUdyb3VwLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZUltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvVlJNQmxlbmRTaGFwZVByb3h5LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNSW1wb3J0ZXJEZWJ1Zy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9WUk1Mb29rQXRIZWFkRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNTG9va0F0SW1wb3J0ZXJEZWJ1Zy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9WUk1TcHJpbmdCb25lRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zy50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9WUk1GaXJzdFBlcnNvbi50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9WUk1GaXJzdFBlcnNvbkltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2ZpcnN0cGVyc29uL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2h1bWFub2lkL1ZSTUh1bWFuQm9uZS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbm9pZC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbm9pZEltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2h1bWFub2lkL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1DdXJ2ZU1hcHBlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0QXBwbHllci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbG9va2F0L1ZSTUxvb2tBdEJvbmVBcHBseWVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1Mb29rQXRIZWFkLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1Mb29rQXRJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvTVRvb25NYXRlcmlhbC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9WUk1NYXRlcmlhbEltcG9ydGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL1ZSTVVubGl0TWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL3NoYWRlcnMvbXRvb24uZnJhZyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9zaGFkZXJzL210b29uLnZlcnQiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvc2hhZGVycy91bmxpdC5mcmFnIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL3NoYWRlcnMvdW5saXQudmVydCIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tZXRhL1ZSTU1ldGFJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tZXRhL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVJbXBvcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3NwcmluZ2JvbmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdHlwZXMvVlJNU2NoZW1hLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdXRpbHMvZGlzcG9zZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vdXRpbHMvbWF0aC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS91dGlscy9yZW5hbWVNYXRlcmlhbFByb3BlcnR5LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vZXh0ZXJuYWwgXCJUSFJFRVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtR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QUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsU0FBUztnQkFDdkQsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFFLFNBQVM7Z0JBQ3ZELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBRSxTQUFTO2dCQUN2RCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsU0FBUztnQkFFdkQsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBRSxTQUFTO2dCQUN2RCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsU0FBUztnQkFDdkQsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFFLFNBQVM7Z0JBQ3ZELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBRSxTQUFTO2dCQUV2RCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTywwQ0FBaUIsR0FBekIsVUFBMEIsR0FBc0IsRUFBRSxpQkFBMkI7UUFDM0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxJQUFJLEdBQU0sR0FBRyxDQUFDLElBQUksWUFBUyxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUN0QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUUzQyxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBZ0MsQ0FBQztRQUV0RCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMvRCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RztRQUVELElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pFLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pELFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNHO1FBRUQsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM3RixJQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUcvQixJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDdEIsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO1NBQ3pDO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVPLDJEQUFrQyxHQUExQyxVQUEyQyxNQUFzQixFQUFFLElBQXVCO1FBQTFGLGlCQWVDO1FBZEMsSUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7WUFDdEMsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFHSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQy9DLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTyw2Q0FBb0IsR0FBNUIsVUFBNkIsSUFBYztRQUEzQyxpQkF3QkM7UUF2QkMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM1QyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBQyxLQUFLLElBQUssWUFBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQzthQUN4RTtpQkFBTTtnQkFDTCxJQUFNLFFBQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDakMsUUFBTSxDQUFDLElBQUksR0FBRyxlQUFhLElBQUksQ0FBQyxJQUFNLENBQUM7Z0JBQ3ZDLFFBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsTUFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFNLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVE7cUJBQ1YsTUFBTSxDQUFDLFVBQUMsS0FBSyxJQUFLLFlBQUssQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUE1QixDQUE0QixDQUFDO3FCQUMvQyxPQUFPLENBQUMsVUFBQyxLQUFLO29CQUNiLEtBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxRQUFNLEVBQUUsS0FBMEIsQ0FBQyxDQUFDO2dCQUM5RSxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsTUFBTyxFQUFFLElBQXlCLENBQUMsQ0FBQztTQUNsRjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFDLEtBQUssSUFBSyxZQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO2FBQ3hFO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsSUFBYztRQUNuQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtZQUM1QyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFsUXVCLDhDQUErQixHQUFHLENBQUMsQ0FBQztJQU9wQyw4Q0FBK0IsR0FBRyxFQUFFLENBQUM7SUE0UC9ELHFCQUFDO0NBQUE7QUF6UVksd0NBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RDNCLHNEQUErQjtBQUcvQiw4RUFBeUQ7QUFDekQsOEdBQStFO0FBSy9FO0lBQUE7SUFtREEsQ0FBQztJQTVDYyx1Q0FBTSxHQUFuQixVQUFvQixJQUFVLEVBQUUsUUFBcUI7O3VDQUFHLE9BQU87Ozs7O3dCQUN2RCxNQUFNLFNBQThCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsMENBQUUsR0FBRyxDQUFDO3dCQUMzRSxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNYLFdBQU8sSUFBSSxFQUFDO3lCQUNiO3dCQUVLLGlCQUFpQixHQUFzQyxNQUFNLENBQUMsV0FBVyxDQUFDO3dCQUNoRixJQUFJLENBQUMsaUJBQWlCLEVBQUU7NEJBQ3RCLFdBQU8sSUFBSSxFQUFDO3lCQUNiO3dCQUVLLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQzs2QkFHM0QscUJBQW9CLEtBQUssU0FBUyxJQUFJLG9CQUFvQixLQUFLLENBQUMsQ0FBQyxHQUFqRSxjQUFpRTt3QkFDbkUsZUFBZSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsaUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7NEJBRXRELFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDOzt3QkFBL0UsZUFBZSxHQUFHLFNBQTZELENBQUM7Ozt3QkFHbEYsSUFBSSxDQUFDLGVBQWUsRUFBRTs0QkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDOzRCQUNsRixXQUFPLElBQUksRUFBQzt5QkFDYjt3QkFFSyxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUI7NEJBQ25FLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQ2YsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUN6QyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQ3pDLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBRSxDQUM1Qzs0QkFDSCxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBRWhDLGVBQWUsR0FBa0MsRUFBRSxDQUFDO3dCQUMvQixXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7d0JBQTlELE1BQU0sR0FBZSxTQUF5Qzt3QkFDcEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxTQUFTOzRCQUM3QixJQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxlQUFlO2dDQUM1QyxDQUFDLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxRQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBcEIsQ0FBb0IsQ0FBQztnQ0FDckUsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs0QkFDZCxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksNENBQTJCLENBQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNyRixDQUFDLENBQUMsQ0FBQzt3QkFFSCxXQUFPLElBQUksK0JBQWMsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxDQUFDLEVBQUM7Ozs7S0FDcEY7SUFDSCw2QkFBQztBQUFELENBQUM7QUFuRFksd0RBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVG5DLDhHQUFpQztBQUNqQyw4SEFBeUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNLekM7SUFpQkUsc0JBQW1CLElBQWMsRUFBRSxVQUF5QjtRQUMxRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDO0FBckJZLG9DQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnpCLDhFQUFnRjtBQVNoRjtJQXVCRSxxQkFBbUIsU0FBNEIsRUFBRSxnQkFBcUM7UUFDcEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBRXpDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFLTSw2QkFBTyxHQUFkO1FBQUEsaUJBcUJDO1FBcEJDLElBQU0sSUFBSSxHQUFZLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFXO1lBQy9DLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBeUMsQ0FBRSxDQUFDO1lBRzFFLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsT0FBTzthQUNSO1lBR0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRztnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFnQjtnQkFDL0MsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFnQjthQUNsRCxDQUFDO1FBQ0osQ0FBQyxFQUFFLEVBQWEsQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQU9NLDZCQUFPLEdBQWQsVUFBZSxVQUFtQjtRQUFsQyxpQkEyQkM7UUExQkMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQ3ZDLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUNwQyxJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQXNDLENBQUMsQ0FBQztZQUd0RSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE9BQU87YUFDUjtZQUVELElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxPQUFPO2FBQ1I7WUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBRWxCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNmLFNBQVMsQ0FBQyxRQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDMUMsU0FBUyxDQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUMxQyxTQUFTLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQzNDLENBQUM7YUFDSDtZQUNELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBU00sNkJBQU8sR0FBZCxVQUFlLElBQWdDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDL0MsQ0FBQztJQVNNLDhCQUFRLEdBQWYsVUFBZ0IsSUFBZ0M7UUFDOUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFTTSxpQ0FBVyxHQUFsQixVQUFtQixJQUFnQzs7UUFDakQsbUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsMENBQUUsSUFBSSxtQ0FBSSxJQUFJLENBQUM7SUFDaEQsQ0FBQztJQVNNLGtDQUFZLEdBQW5CLFVBQW9CLElBQWdDO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssV0FBSSxDQUFDLElBQUksRUFBVCxDQUFTLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBS08sdUNBQWlCLEdBQXpCLFVBQTBCLFNBQTRCO1FBQ3BELElBQU0sS0FBSyxHQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLEVBQUUsSUFBSTtZQUN4RixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFFLEVBQTRCLENBQWtCLENBQUM7UUFFbEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDO0FBckpZLGtDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVHhCLHNEQUErQjtBQUcvQixxR0FBOEM7QUFHOUMsa0dBQTRDO0FBSzVDO0lBQUE7SUFxREEsQ0FBQztJQS9DYyxvQ0FBTSxHQUFuQixVQUFvQixJQUFVOzt1Q0FBRyxPQUFPOzs7Ozs7d0JBQ2hDLE1BQU0sU0FBOEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxHQUFHLENBQUM7d0JBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsV0FBTyxJQUFJLEVBQUM7eUJBQ2I7d0JBRUssY0FBYyxHQUFtQyxNQUFNLENBQUMsUUFBUSxDQUFDO3dCQUN2RSxJQUFJLENBQUMsY0FBYyxFQUFFOzRCQUNuQixXQUFPLElBQUksRUFBQzt5QkFDYjt3QkFFSyxjQUFjLEdBQXNCLEVBQUUsQ0FBQzs2QkFDekMsY0FBYyxDQUFDLFVBQVUsRUFBekIsY0FBeUI7d0JBQzNCLFdBQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFPLElBQUk7Ozs7OzRDQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0RBQzVCLFdBQU87NkNBQ1I7NENBRVksV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7NENBQXpELElBQUksR0FBRyxTQUFrRDs0Q0FDL0QsY0FBYyxDQUFDLElBQUksQ0FBQztnREFDbEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dEQUNmLElBQUksRUFBRSxJQUFJLDJCQUFZLENBQUMsSUFBSSxFQUFFO29EQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0RBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvREFDckYsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29EQUN0RSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0RBQ3RFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7aURBQ3hDLENBQUM7NkNBQ0gsQ0FBQyxDQUFDOzs7O2lDQUNKLENBQUMsQ0FDSDs7d0JBbEJELFNBa0JDLENBQUM7Ozt3QkFHRSxnQkFBZ0IsR0FBd0I7NEJBQzVDLFVBQVUsRUFBRSxjQUFjLENBQUMsVUFBVTs0QkFDckMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxVQUFVOzRCQUNyQyxhQUFhLEVBQUUsY0FBYyxDQUFDLGFBQWE7NEJBQzNDLGFBQWEsRUFBRSxjQUFjLENBQUMsYUFBYTs0QkFDM0MsYUFBYSxFQUFFLGNBQWMsQ0FBQyxhQUFhOzRCQUMzQyxhQUFhLEVBQUUsY0FBYyxDQUFDLGFBQWE7NEJBQzNDLFdBQVcsRUFBRSxjQUFjLENBQUMsV0FBVzs0QkFDdkMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLGlCQUFpQjt5QkFDcEQsQ0FBQzt3QkFFRixXQUFPLElBQUkseUJBQVcsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsRUFBQzs7OztLQUMxRDtJQUNILDBCQUFDO0FBQUQsQ0FBQztBQXJEWSxrREFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYaEMsdUdBQStCO0FBQy9CLHlHQUFnQztBQUNoQyxxSEFBc0M7QUFDdEMseUdBQWdDO0FBQ2hDLHFHQUE4QjtBQUM5QixxSEFBc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMdEMsNEVBQXNCO0FBQ3RCLDRGQUE4QjtBQUM5Qiw0RkFBMkI7QUFDM0IsZ0dBQTZCO0FBQzdCLHNGQUF3QjtBQUN4QixrR0FBOEI7QUFDOUIsNEZBQTJCO0FBQzNCLHdGQUF5QjtBQUN6QixnR0FBNkI7QUFDN0Isc0ZBQXdCO0FBQ3hCLDRGQUEyQjtBQUMzQixvRkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGdkIsSUFBTSxhQUFhLEdBQUcsVUFBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsQ0FBUztJQUM5RSxJQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixJQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLElBQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDbkIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDakMsSUFBTSxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDN0MsQ0FBQyxDQUFDO0FBVUYsSUFBTSxhQUFhLEdBQUcsVUFBQyxHQUFhLEVBQUUsQ0FBUztJQUU3QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQztLQUM3RjtJQUNELElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkVBQTZFLENBQUMsQ0FBQztLQUNoRztJQUdELElBQUksT0FBTyxDQUFDO0lBQ1osS0FBSyxPQUFPLEdBQUcsQ0FBQyxHQUFJLE9BQU8sRUFBRSxFQUFFO1FBQzdCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsT0FBTyxFQUFFO1lBQzdCLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0I7YUFBTSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLE1BQU07U0FDUDtLQUNGO0lBRUQsSUFBTSxNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUMzQixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDZCxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBR0QsSUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUMzQixJQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLElBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBR3RDLElBQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLElBQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7QUFRRjtJQXlCRSx3QkFBWSxNQUFlLEVBQUUsTUFBZSxFQUFFLEtBQWdCO1FBbkJ2RCxVQUFLLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFLM0Qsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBS3pCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQVU5QixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztTQUNqQztRQUVELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQU9NLDRCQUFHLEdBQVYsVUFBVyxHQUFXO1FBQ3BCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsSUFBTSxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDO0FBakRZLHdDQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0QzQjtJQUFBO0lBWUEsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQztBQVpxQiw0Q0FBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHRDLDhFQUFxQztBQUVyQywrR0FBc0Q7QUFLdEQ7SUFBZ0QsOENBQWdCO0lBaUI5RCxvQ0FDRSxlQUFtQyxFQUNuQyxlQUErQixFQUMvQixpQkFBaUMsRUFDakMsZUFBK0I7UUFKakMsWUFNRSxpQkFBTyxTQU9SO1FBN0JlLFVBQUksR0FBRyxpQkFBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQztRQXdCcEUsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztRQUN4QyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7UUFDNUMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztRQUV4QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDOztJQUMxQyxDQUFDO0lBRU0seUNBQUksR0FBWDtRQUNFLE9BQU8saUJBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUM7SUFDeEQsQ0FBQztJQUVNLDJDQUFNLEdBQWIsVUFBYyxLQUFrQjtRQUM5QixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckIsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxpQkFBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGlCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdHO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGlCQUFTLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsaUJBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3hHO1FBRUQsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxpQkFBUyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGlCQUFTLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzVHO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGlCQUFTLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsaUJBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzFHO0lBQ0gsQ0FBQztJQUNILGlDQUFDO0FBQUQsQ0FBQyxDQXhEK0MsbUNBQWdCLEdBd0QvRDtBQXhEWSxnRUFBMEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVHZDLHNEQUErQjtBQUUvQiw4RUFBK0M7QUFFL0MsK0dBQXNEO0FBQ3RELHNHQUFnRDtBQUVoRCxJQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsNkJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUt6RTtJQUEwQyx3Q0FBZ0I7SUFvQnhELDhCQUNFLFFBQXFCLEVBQ3JCLG9CQUFvQyxFQUNwQyxvQkFBb0MsRUFDcEMsaUJBQWlDLEVBQ2pDLGVBQStCO1FBTGpDLFlBT0UsaUJBQU8sU0FTUjtRQW5DZSxVQUFJLEdBQUcsaUJBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7UUE0QjlELEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztRQUNsRCxLQUFJLENBQUMscUJBQXFCLEdBQUcsb0JBQW9CLENBQUM7UUFDbEQsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO1FBQzVDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFFeEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGlCQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekUsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGlCQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBQzdFLENBQUM7SUFFTSxxQ0FBTSxHQUFiLFVBQWMsS0FBa0I7UUFDOUIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBR3JCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUM7WUFFRCxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakQ7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFHRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVDO1lBRUQsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxDQTVFeUMsbUNBQWdCLEdBNEV6RDtBQTVFWSxvREFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaakMsc0RBQStCO0FBRS9CLGlGQUF1RDtBQUd2RCxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUV2RSxJQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQyxJQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQyxJQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQyxJQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUtyQztJQWtDRSx1QkFBWSxXQUEyQixFQUFFLE9BQTBCO1FBaEI1RCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBUWYsV0FBTSxHQUFnQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBU3hGLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFPTSwrQ0FBdUIsR0FBOUIsVUFBK0IsTUFBcUI7UUFDbEQsSUFBTSxHQUFHLEdBQUcsNkJBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUUsT0FBTyxNQUFNO2FBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUNuQixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN2QixlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQVFNLDhCQUFNLEdBQWIsVUFBYyxRQUF1QjtRQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFRTSw4QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVoRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQztTQUNGO0lBQ0gsQ0FBQztJQUVTLGtDQUFVLEdBQXBCLFVBQXFCLE1BQW1CLEVBQUUsUUFBdUI7UUFDL0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUd4RSxJQUFNLFNBQVMsR0FBRyxJQUFJO2FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDZCxHQUFHLENBQUMsWUFBWSxDQUFDO2FBQ2pCLFNBQVMsRUFBRSxDQUFDO1FBR2YsU0FBUyxDQUFDLGVBQWUsQ0FBQyw2QkFBc0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBR3JHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBbEdzQix5QkFBVyxHQUFHLEtBQUssQ0FBQztJQW1HN0Msb0JBQUM7Q0FBQTtBQXBHWSxzQ0FBYTs7Ozs7Ozs7Ozs7Ozs7OztBQ1gxQiw4RUFBcUM7QUFDckMseUdBQWtEO0FBRWxELDZJQUEwRTtBQUMxRSwySEFBOEQ7QUFDOUQsc0dBQWdEO0FBS2hELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBSzlCO0lBQUE7SUFzRkEsQ0FBQztJQTlFUSxrQ0FBTSxHQUFiLFVBQ0UsSUFBVSxFQUNWLFdBQTJCLEVBQzNCLGVBQW1DLEVBQ25DLFFBQXFCOztRQUVyQixJQUFNLE1BQU0sU0FBOEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxHQUFHLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFNLGlCQUFpQixHQUFzQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEYsT0FBTyxJQUFJLDZCQUFhLENBQUMsV0FBVyxFQUFFLE9BQU8sSUFBSSxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsMENBQWMsR0FBeEIsVUFDRSxpQkFBd0MsRUFDeEMsZUFBbUMsRUFDbkMsUUFBcUI7UUFFckIsSUFBTSxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztRQUN0RSxJQUFNLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDO1FBQ3RFLElBQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsa0JBQWtCLENBQUM7UUFDaEUsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUU1RCxRQUFRLGlCQUFpQixDQUFDLGNBQWMsRUFBRTtZQUN4QyxLQUFLLGlCQUFTLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLElBQ0UscUJBQXFCLEtBQUssU0FBUztvQkFDbkMscUJBQXFCLEtBQUssU0FBUztvQkFDbkMsa0JBQWtCLEtBQUssU0FBUztvQkFDaEMsZ0JBQWdCLEtBQUssU0FBUyxFQUM5QjtvQkFDQSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLElBQUksMkNBQW9CLENBQzdCLFFBQVEsRUFDUixJQUFJLENBQUMsc0JBQXNCLENBQUMscUJBQXFCLENBQUMsRUFDbEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLEVBQ2xELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUMvQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FDOUMsQ0FBQztpQkFDSDthQUNGO1lBQ0QsS0FBSyxpQkFBUyxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLHFCQUFxQixLQUFLLFNBQVMsSUFBSSxrQkFBa0IsS0FBSyxTQUFTLElBQUksZ0JBQWdCLEtBQUssU0FBUyxFQUFFO29CQUM3RyxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLElBQUksdURBQTBCLENBQ25DLGVBQWUsRUFDZixJQUFJLENBQUMsNEJBQTRCLENBQUMscUJBQXFCLENBQUMsRUFDeEQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGtCQUFrQixDQUFDLEVBQ3JELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUNwRCxDQUFDO2lCQUNIO2FBQ0Y7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDUCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sa0RBQXNCLEdBQTlCLFVBQStCLEdBQW1DO1FBQ2hFLE9BQU8sSUFBSSwrQkFBYyxDQUN2QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUNqRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUNqRSxHQUFHLENBQUMsS0FBSyxDQUNWLENBQUM7SUFDSixDQUFDO0lBRU8sd0RBQTRCLEdBQXBDLFVBQXFDLEdBQW1DO1FBQ3RFLE9BQU8sSUFBSSwrQkFBYyxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEgsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQztBQXRGWSw4Q0FBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQjlCLHlHQUFpQztBQUNqQyw2R0FBbUM7QUFDbkMsaUlBQTZDO0FBQzdDLHFIQUF1QztBQUN2Qyx1R0FBZ0M7QUFDaEMsK0dBQW9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hwQyxzREFBK0I7QUFDL0IseUlBQXNFO0FBQ3RFLDRHQUFnRDtBQUNoRCw0R0FBa0Q7QUFFbEQsSUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUF1RTFCLElBQVkscUJBSVg7QUFKRCxXQUFZLHFCQUFxQjtJQUMvQiwrREFBRztJQUNILG1FQUFLO0lBQ0wsaUVBQUk7QUFDTixDQUFDLEVBSlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFJaEM7QUFFRCxJQUFZLHNCQUtYO0FBTEQsV0FBWSxzQkFBc0I7SUFDaEMsbUVBQUk7SUFDSix1RUFBTTtJQUNOLG1GQUFZO0lBQ1osK0RBQUU7QUFDSixDQUFDLEVBTFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFLakM7QUFFRCxJQUFZLDZCQUdYO0FBSEQsV0FBWSw2QkFBNkI7SUFDdkMsNkZBQVU7SUFDVixtR0FBYTtBQUNmLENBQUMsRUFIVyw2QkFBNkIsR0FBN0IscUNBQTZCLEtBQTdCLHFDQUE2QixRQUd4QztBQUVELElBQVksNkJBSVg7QUFKRCxXQUFZLDZCQUE2QjtJQUN2QyxpRkFBSTtJQUNKLHlHQUFnQjtJQUNoQiwyR0FBaUI7QUFDbkIsQ0FBQyxFQUpXLDZCQUE2QixHQUE3QixxQ0FBNkIsS0FBN0IscUNBQTZCLFFBSXhDO0FBRUQsSUFBWSx1QkFLWDtBQUxELFdBQVksdUJBQXVCO0lBQ2pDLHlFQUFNO0lBQ04seUVBQU07SUFDTixtRkFBVztJQUNYLHVHQUFxQjtBQUN2QixDQUFDLEVBTFcsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFLbEM7QUFRRDtJQUFtQyxpQ0FBb0I7SUFnRnJELHVCQUFZLFVBQWdDO1FBQWhDLDRDQUFnQztRQUE1QyxZQUNFLGlCQUFPLFNBc0ZSO1FBbktlLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBRXpDLFlBQU0sR0FBRyxHQUFHLENBQUM7UUFDYixXQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLGdCQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELFNBQUcsR0FBeUIsSUFBSSxDQUFDO1FBQ2pDLGdCQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELGtCQUFZLEdBQXlCLElBQUksQ0FBQztRQUUxQyxlQUFTLEdBQXlCLElBQUksQ0FBQztRQUN2QyxtQkFBYSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUM1QyxpQkFBVyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFMUMsdUJBQWlCLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLDBCQUFvQixHQUF5QixJQUFJLENBQUM7UUFFbEQsc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLHlCQUFtQixHQUF5QixJQUFJLENBQUM7UUFFakQsZ0JBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsZ0JBQVUsR0FBRyxHQUFHLENBQUM7UUFDakIsMkJBQXFCLEdBQUcsR0FBRyxDQUFDO1FBQzVCLDRCQUFzQixHQUFHLEdBQUcsQ0FBQztRQUM3QixnQkFBVSxHQUF5QixJQUFJLENBQUM7UUFDeEMsY0FBUSxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUNyQixxQkFBZSxHQUFHLEdBQUcsQ0FBQztRQUN0QixhQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2QsZUFBUyxHQUF5QixJQUFJLENBQUM7UUFFdkMsbUJBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEQsaUJBQVcsR0FBeUIsSUFBSSxDQUFDO1FBRXpDLHlCQUFtQixHQUF5QixJQUFJLENBQUM7UUFFakQsa0JBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsOEJBQXdCLEdBQUcsR0FBRyxDQUFDO1FBQy9CLGtCQUFZLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELHdCQUFrQixHQUFHLEdBQUcsQ0FBQztRQUN6Qix1QkFBaUIsR0FBeUIsSUFBSSxDQUFDO1FBQy9DLG1CQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLG1CQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUcsR0FBRyxDQUFDO1FBRXJCLHlCQUFtQixHQUFHLElBQUksQ0FBQztRQWdCMUIsZ0JBQVUsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7UUFDekMsZ0JBQVUsR0FBRyx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7UUFDNUMsdUJBQWlCLEdBQUcsNkJBQTZCLENBQUMsSUFBSSxDQUFDO1FBQ3ZELHVCQUFpQixHQUFHLDZCQUE2QixDQUFDLFVBQVUsQ0FBQztRQUM3RCxlQUFTLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLHNCQUFnQixHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztRQUsvQyxnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQixvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUNyQixvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUNyQixrQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUt6QixLQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUM1RCxJQUFJLEtBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLGNBQWMsSUFBSSxLQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDbEYsT0FBTyxDQUFDLElBQUksQ0FDViwySEFBMkgsQ0FDNUgsQ0FBQztTQUNIO1FBR0Q7WUFDRSxjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLFlBQVk7WUFDWix5QkFBeUI7WUFDekIsd0JBQXdCO1lBQ3hCLGVBQWU7WUFDZixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixzQkFBc0I7WUFDdEIsVUFBVTtZQUNWLFVBQVU7U0FDWCxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDWixJQUFLLFVBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUUxQyxPQUFRLFVBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUdILFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRTNCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7UUFDbkQsVUFBVSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQztRQUMzRCxVQUFVLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDO1FBRzNELFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDOUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUztZQUMzQixLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVc7WUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHO1lBQ3JCLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTTtZQUN4QjtnQkFDRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUN0QixLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQzFCLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDeEQsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDNUQsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDN0IsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNqQyxvQkFBb0IsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7Z0JBQ3JDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUNwQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUMxQixVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUMxQixxQkFBcUIsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLHNCQUFzQixFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDdEMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDM0IsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNuRCxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUM5QixlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUMvQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUN2QixTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUMxQixhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hELG1CQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtnQkFDcEMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDNUIsd0JBQXdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZELGtCQUFrQixFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDbEMsaUJBQWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2dCQUNsQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUM3QixhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUM3QixXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBR0gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUczQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQ3hCLENBQUM7SUFFRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLENBQUM7YUFFRCxVQUFZLENBQXVCO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFZLENBQXVCO1lBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7OztPQUpBO0lBU0Qsc0JBQUksb0NBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQzthQUtELFVBQWMsQ0FBUztZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQzs7O09BUEE7SUFTRCxzQkFBSSxzQ0FBVzthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFnQixDQUF1QjtZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLG9DQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWMsQ0FBMEI7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxLQUFLLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztZQUMxRSxJQUFJLENBQUMsV0FBVztnQkFDZCxJQUFJLENBQUMsVUFBVSxLQUFLLHVCQUF1QixDQUFDLFdBQVc7b0JBQ3ZELElBQUksQ0FBQyxVQUFVLEtBQUssdUJBQXVCLENBQUMscUJBQXFCLENBQUM7WUFDcEUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BVkE7SUFZRCxzQkFBSSxvQ0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFjLENBQXlCO1lBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBRXBCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQU5BO0lBUUQsc0JBQUksMkNBQWdCO2FBQXBCO1lBQ0UsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQXFCLENBQWdDO1lBQ25ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7WUFFM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTkE7SUFRRCxzQkFBSSwyQ0FBZ0I7YUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBcUIsQ0FBZ0M7WUFDbkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FOQTtJQVFELHNCQUFJLG1DQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWEsQ0FBd0I7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFFbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7OztPQU5BO0lBUUQsc0JBQUksMENBQWU7YUFBbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDO2FBRUQsVUFBb0IsQ0FBd0I7WUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztZQUUxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7O09BTkE7SUFRRCxzQkFBSSxpQ0FBTTthQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBVyxDQUFTO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLG9DQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWMsQ0FBVTtZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUVwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQzs7O09BUEE7SUFlTSwwQ0FBa0IsR0FBekIsVUFBMEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDdkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUVwRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLDRCQUFJLEdBQVgsVUFBWSxNQUFZO1FBQ3RCLGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztRQUduQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQ2xELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUMxRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDeEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztRQUNwRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQ2xELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBRTVDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFFOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUtPLHNDQUFjLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRTFELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUVqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJB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XG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hc3NpZ24udHNcIik7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0ICogYXMgX190aHJlZV92cm1fXyBmcm9tICcuJztcbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5hc3NpZ24oVEhSRUUsIF9fdGhyZWVfdnJtX18pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi92cm0vJztcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuL2xvb2thdCc7XG5pbXBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGEnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL3NwcmluZ2JvbmUnO1xuaW1wb3J0IHsgZGVlcERpc3Bvc2UgfSBmcm9tICcuL3V0aWxzL2Rpc3Bvc2VyJztcbmltcG9ydCB7IFZSTUltcG9ydGVyLCBWUk1JbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuL1ZSTUltcG9ydGVyJztcblxuLyoqXG4gKiBQYXJhbWV0ZXJzIGZvciBhIFtbVlJNXV0gY2xhc3MuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVlJNUGFyYW1ldGVycyB7XG4gIHNjZW5lOiBUSFJFRS5TY2VuZSB8IFRIUkVFLkdyb3VwOyAvLyBDT01QQVQ6IGBHTFRGLnNjZW5lYCBpcyBnb2luZyB0byBiZSBgVEhSRUUuR3JvdXBgIGluIHIxMTRcbiAgaHVtYW5vaWQ/OiBWUk1IdW1hbm9pZDtcbiAgYmxlbmRTaGFwZVByb3h5PzogVlJNQmxlbmRTaGFwZVByb3h5O1xuICBmaXJzdFBlcnNvbj86IFZSTUZpcnN0UGVyc29uO1xuICBsb29rQXQ/OiBWUk1Mb29rQXRIZWFkO1xuICBtYXRlcmlhbHM/OiBUSFJFRS5NYXRlcmlhbFtdO1xuICBzcHJpbmdCb25lTWFuYWdlcj86IFZSTVNwcmluZ0JvbmVNYW5hZ2VyO1xuICBtZXRhPzogVlJNTWV0YTtcbn1cblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBWUk0gbW9kZWwuXG4gKiBTZWUgdGhlIGRvY3VtZW50YXRpb24gb2YgW1tWUk0uZnJvbV1dIGZvciB0aGUgbW9zdCBiYXNpYyB1c2Ugb2YgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk0gZnJvbSBhIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXIuXG4gICAqIEl0J3MgcHJvYmFibHkgYSB0aGluZyB3aGF0IHlvdSB3YW50IHRvIGdldCBzdGFydGVkIHdpdGggVlJNcy5cbiAgICpcbiAgICogQGV4YW1wbGUgTW9zdCBiYXNpYyB1c2Ugb2YgVlJNXG4gICAqIGBgYFxuICAgKiBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgKlxuICAgKiBuZXcgVEhSRUUuR0xURkxvYWRlcigpLmxvYWQoICdtb2RlbHMvdGhyZWUtdnJtLWdpcmwudnJtJywgKCBnbHRmICkgPT4ge1xuICAgKlxuICAgKiAgIFRIUkVFLlZSTS5mcm9tKCBnbHRmICkudGhlbiggKCB2cm0gKSA9PiB7XG4gICAqXG4gICAqICAgICBzY2VuZS5hZGQoIHZybS5zY2VuZSApO1xuICAgKlxuICAgKiAgIH0gKTtcbiAgICpcbiAgICogfSApO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgaW4gaW1wb3J0ZXJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZnJvbShnbHRmOiBHTFRGLCBvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSk6IFByb21pc2U8VlJNPiB7XG4gICAgY29uc3QgaW1wb3J0ZXIgPSBuZXcgVlJNSW1wb3J0ZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIGF3YWl0IGltcG9ydGVyLmltcG9ydChnbHRmKTtcbiAgfVxuICAvKipcbiAgICogYFRIUkVFLlNjZW5lYCBvciBgVEhSRUUuR3JvdXBgIChkZXBlbmRzIG9uIHlvdXIgdGhyZWUuanMgcmV2aXNpb24pIHRoYXQgY29udGFpbnMgdGhlIGVudGlyZSBWUk0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NlbmU6IFRIUkVFLlNjZW5lIHwgVEhSRUUuR3JvdXA7IC8vIENPTVBBVDogYEdMVEYuc2NlbmVgIGlzIGdvaW5nIHRvIGJlIGBUSFJFRS5Hcm91cGAgaW4gcjExNFxuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUh1bWFub2lkXV0gb2YgdGhlIFZSTS5cbiAgICogWW91IGNhbiBjb250cm9sIGVhY2ggYm9uZXMgdXNpbmcgW1tWUk1IdW1hbm9pZC5nZXRCb25lTm9kZV1dLlxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5vaWQ/OiBWUk1IdW1hbm9pZDtcblxuICAvKipcbiAgICogQ29udGFpbnMgW1tWUk1CbGVuZFNoYXBlUHJveHldXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjb250cm9sIHRoZXNlIGZhY2lhbCBleHByZXNzaW9ucyB2aWEgW1tWUk1CbGVuZFNoYXBlUHJveHkuc2V0VmFsdWVdXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBibGVuZFNoYXBlUHJveHk/OiBWUk1CbGVuZFNoYXBlUHJveHk7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNRmlyc3RQZXJzb25dXSBvZiB0aGUgVlJNLlxuICAgKiBZb3UgY2FuIHVzZSB2YXJpb3VzIGZlYXR1cmUgb2YgdGhlIGZpcnN0UGVyc29uIGZpZWxkLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGZpcnN0UGVyc29uPzogVlJNRmlyc3RQZXJzb247XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNTG9va0F0SGVhZF1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSBbW1ZSTUxvb2tBdEhlYWQudGFyZ2V0XV0gdG8gY29udHJvbCB0aGUgZXllIGRpcmVjdGlvbiBvZiB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbG9va0F0PzogVlJNTG9va0F0SGVhZDtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWF0ZXJpYWxzIG9mIHRoZSBWUk0uXG4gICAqIGB1cGRhdGVWUk1NYXRlcmlhbHNgIG1ldGhvZCBvZiB0aGVzZSBtYXRlcmlhbHMgd2lsbCBiZSBjYWxsZWQgdmlhIGl0cyBbW1ZSTS51cGRhdGVdXSBtZXRob2QuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0ZXJpYWxzPzogVEhSRUUuTWF0ZXJpYWxbXTtcblxuICAvKipcbiAgICogQ29udGFpbnMgbWV0YSBmaWVsZHMgb2YgdGhlIFZSTS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gcmVmZXIgdGhlc2UgbGljZW5zZSBmaWVsZHMgYmVmb3JlIHVzZSB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWV0YT86IFZSTU1ldGE7XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1TcHJpbmdCb25lTWFuYWdlcl1dIG1hbmlwdWxhdGVzIGFsbCBzcHJpbmcgYm9uZXMgYXR0YWNoZWQgb24gdGhlIFZSTS5cbiAgICogVXN1YWxseSB5b3UgZG9uJ3QgaGF2ZSB0byBjYXJlIGFib3V0IHRoaXMgcHJvcGVydHkuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZU1hbmFnZXI/OiBWUk1TcHJpbmdCb25lTWFuYWdlcjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBbW1ZSTVBhcmFtZXRlcnNdXSB0aGF0IHJlcHJlc2VudHMgY29tcG9uZW50cyBvZiB0aGUgVlJNXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiBWUk1QYXJhbWV0ZXJzKSB7XG4gICAgdGhpcy5zY2VuZSA9IHBhcmFtcy5zY2VuZTtcbiAgICB0aGlzLmh1bWFub2lkID0gcGFyYW1zLmh1bWFub2lkO1xuICAgIHRoaXMuYmxlbmRTaGFwZVByb3h5ID0gcGFyYW1zLmJsZW5kU2hhcGVQcm94eTtcbiAgICB0aGlzLmZpcnN0UGVyc29uID0gcGFyYW1zLmZpcnN0UGVyc29uO1xuICAgIHRoaXMubG9va0F0ID0gcGFyYW1zLmxvb2tBdDtcbiAgICB0aGlzLm1hdGVyaWFscyA9IHBhcmFtcy5tYXRlcmlhbHM7XG4gICAgdGhpcy5zcHJpbmdCb25lTWFuYWdlciA9IHBhcmFtcy5zcHJpbmdCb25lTWFuYWdlcjtcbiAgICB0aGlzLm1ldGEgPSBwYXJhbXMubWV0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiAqKllvdSBuZWVkIHRvIGNhbGwgdGhpcyBvbiB5b3VyIHVwZGF0ZSBsb29wLioqXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBldmVyeSBWUk0gY29tcG9uZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9va0F0KSB7XG4gICAgICB0aGlzLmxvb2tBdC51cGRhdGUoZGVsdGEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJsZW5kU2hhcGVQcm94eSkge1xuICAgICAgdGhpcy5ibGVuZFNoYXBlUHJveHkudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIpIHtcbiAgICAgIHRoaXMuc3ByaW5nQm9uZU1hbmFnZXIubGF0ZVVwZGF0ZShkZWx0YSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF0ZXJpYWxzKSB7XG4gICAgICB0aGlzLm1hdGVyaWFscy5mb3JFYWNoKChtYXRlcmlhbDogYW55KSA9PiB7XG4gICAgICAgIGlmIChtYXRlcmlhbC51cGRhdGVWUk1NYXRlcmlhbHMpIHtcbiAgICAgICAgICBtYXRlcmlhbC51cGRhdGVWUk1NYXRlcmlhbHMoZGVsdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSBldmVyeXRoaW5nIGFib3V0IHRoZSBWUk0gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBjb25zdCBzY2VuZSA9IHRoaXMuc2NlbmU7XG4gICAgaWYgKHNjZW5lKSB7XG4gICAgICBkZWVwRGlzcG9zZShzY2VuZSk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXRhPy50ZXh0dXJlPy5kaXNwb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVJbXBvcnRlciB9IGZyb20gJy4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbkltcG9ydGVyIH0gZnJvbSAnLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbm9pZEltcG9ydGVyIH0gZnJvbSAnLi9odW1hbm9pZC9WUk1IdW1hbm9pZEltcG9ydGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEltcG9ydGVyIH0gZnJvbSAnLi9sb29rYXQvVlJNTG9va0F0SW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNTWF0ZXJpYWxJbXBvcnRlciB9IGZyb20gJy4vbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVlJNTWV0YUltcG9ydGVyIH0gZnJvbSAnLi9tZXRhL1ZSTU1ldGFJbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIgfSBmcm9tICcuL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZUltcG9ydGVyJztcbmltcG9ydCB7IFZSTSB9IGZyb20gJy4vVlJNJztcblxuZXhwb3J0IGludGVyZmFjZSBWUk1JbXBvcnRlck9wdGlvbnMge1xuICBtZXRhSW1wb3J0ZXI/OiBWUk1NZXRhSW1wb3J0ZXI7XG4gIGxvb2tBdEltcG9ydGVyPzogVlJNTG9va0F0SW1wb3J0ZXI7XG4gIGh1bWFub2lkSW1wb3J0ZXI/OiBWUk1IdW1hbm9pZEltcG9ydGVyO1xuICBibGVuZFNoYXBlSW1wb3J0ZXI/OiBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI7XG4gIGZpcnN0UGVyc29uSW1wb3J0ZXI/OiBWUk1GaXJzdFBlcnNvbkltcG9ydGVyO1xuICBtYXRlcmlhbEltcG9ydGVyPzogVlJNTWF0ZXJpYWxJbXBvcnRlcjtcbiAgc3ByaW5nQm9uZUltcG9ydGVyPzogVlJNU3ByaW5nQm9uZUltcG9ydGVyO1xufVxuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSW1wb3J0ZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX21ldGFJbXBvcnRlcjogVlJNTWV0YUltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JsZW5kU2hhcGVJbXBvcnRlcjogVlJNQmxlbmRTaGFwZUltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2xvb2tBdEltcG9ydGVyOiBWUk1Mb29rQXRJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9odW1hbm9pZEltcG9ydGVyOiBWUk1IdW1hbm9pZEltcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpcnN0UGVyc29uSW1wb3J0ZXI6IFZSTUZpcnN0UGVyc29uSW1wb3J0ZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbWF0ZXJpYWxJbXBvcnRlcjogVlJNTWF0ZXJpYWxJbXBvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zcHJpbmdCb25lSW1wb3J0ZXI6IFZSTVNwcmluZ0JvbmVJbXBvcnRlcjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUltcG9ydGVyLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBbW1ZSTUltcG9ydGVyT3B0aW9uc11dLCBvcHRpb25hbGx5IGNvbnRhaW5zIGltcG9ydGVycyBmb3IgZWFjaCBjb21wb25lbnRcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBWUk1JbXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuX21ldGFJbXBvcnRlciA9IG9wdGlvbnMubWV0YUltcG9ydGVyIHx8IG5ldyBWUk1NZXRhSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9ibGVuZFNoYXBlSW1wb3J0ZXIgPSBvcHRpb25zLmJsZW5kU2hhcGVJbXBvcnRlciB8fCBuZXcgVlJNQmxlbmRTaGFwZUltcG9ydGVyKCk7XG4gICAgdGhpcy5fbG9va0F0SW1wb3J0ZXIgPSBvcHRpb25zLmxvb2tBdEltcG9ydGVyIHx8IG5ldyBWUk1Mb29rQXRJbXBvcnRlcigpO1xuICAgIHRoaXMuX2h1bWFub2lkSW1wb3J0ZXIgPSBvcHRpb25zLmh1bWFub2lkSW1wb3J0ZXIgfHwgbmV3IFZSTUh1bWFub2lkSW1wb3J0ZXIoKTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkltcG9ydGVyID0gb3B0aW9ucy5maXJzdFBlcnNvbkltcG9ydGVyIHx8IG5ldyBWUk1GaXJzdFBlcnNvbkltcG9ydGVyKCk7XG4gICAgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlciA9IG9wdGlvbnMubWF0ZXJpYWxJbXBvcnRlciB8fCBuZXcgVlJNTWF0ZXJpYWxJbXBvcnRlcigpO1xuICAgIHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlciA9IG9wdGlvbnMuc3ByaW5nQm9uZUltcG9ydGVyIHx8IG5ldyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNlaXZlIGEgR0xURiBvYmplY3QgcmV0cmlldmVkIGZyb20gYFRIUkVFLkdMVEZMb2FkZXJgIGFuZCBjcmVhdGUgYSBuZXcgW1tWUk1dXSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTT4ge1xuICAgIGlmIChnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgPT09IHVuZGVmaW5lZCB8fCBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgVlJNIGV4dGVuc2lvbiBvbiB0aGUgR0xURicpO1xuICAgIH1cbiAgICBjb25zdCBzY2VuZSA9IGdsdGYuc2NlbmU7XG5cbiAgICBzY2VuZS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XG5cbiAgICAvLyBTa2lubmVkIG9iamVjdCBzaG91bGQgbm90IGJlIGZydXN0dW1DdWxsZWRcbiAgICAvLyBTaW5jZSBwcmUtc2tpbm5lZCBwb3NpdGlvbiBtaWdodCBiZSBvdXRzaWRlIG9mIHZpZXdcbiAgICBzY2VuZS50cmF2ZXJzZSgob2JqZWN0M2QpID0+IHtcbiAgICAgIGlmICgob2JqZWN0M2QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWV0YSA9IChhd2FpdCB0aGlzLl9tZXRhSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtYXRlcmlhbHMgPSAoYXdhaXQgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaHVtYW5vaWQgPSAoYXdhaXQgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGZpcnN0UGVyc29uID0gaHVtYW5vaWQgPyAoYXdhaXQgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSAoYXdhaXQgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbG9va0F0ID1cbiAgICAgIGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZFxuICAgICAgICA/IChhd2FpdCB0aGlzLl9sb29rQXRJbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBzcHJpbmdCb25lTWFuYWdlciA9IChhd2FpdCB0aGlzLl9zcHJpbmdCb25lSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gbmV3IFZSTSh7XG4gICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgIG1ldGEsXG4gICAgICBtYXRlcmlhbHMsXG4gICAgICBodW1hbm9pZCxcbiAgICAgIGZpcnN0UGVyc29uLFxuICAgICAgYmxlbmRTaGFwZVByb3h5LFxuICAgICAgbG9va0F0LFxuICAgICAgc3ByaW5nQm9uZU1hbmFnZXIsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTSB9IGZyb20gJy4uL1ZSTSc7XG5cbmNvbnN0IF92MkEgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5jb25zdCBfY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSgtMSwgMSwgLTEsIDEsIC0xLCAxKTtcbmNvbnN0IF9wbGFuZSA9IG5ldyBUSFJFRS5NZXNoKFxuICBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgyLCAyKSxcbiAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlIH0pLFxuKTtcbmNvbnN0IF9zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuX3NjZW5lLmFkZChfcGxhbmUpO1xuXG4vKipcbiAqIEV4dHJhY3QgYSB0aHVtYm5haWwgaW1hZ2UgYmxvYiBmcm9tIGEge0BsaW5rIFZSTX0uXG4gKiBJZiB0aGUgdnJtIGRvZXMgbm90IGhhdmUgYSB0aHVtYm5haWwsIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuXG4gKiBAcGFyYW0gcmVuZGVyZXIgUmVuZGVyZXJcbiAqIEBwYXJhbSB2cm0gVlJNIHdpdGggYSB0aHVtYm5haWxcbiAqIEBwYXJhbSBzaXplIHdpZHRoIC8gaGVpZ2h0IG9mIHRoZSBpbWFnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRodW1ibmFpbEJsb2IocmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXIsIHZybTogVlJNLCBzaXplID0gNTEyKTogUHJvbWlzZTxCbG9iPiB7XG4gIC8vIGdldCB0aGUgdGV4dHVyZVxuICBjb25zdCB0ZXh0dXJlID0gdnJtLm1ldGE/LnRleHR1cmU7XG4gIGlmICghdGV4dHVyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXh0cmFjdFRodW1ibmFpbEJsb2I6IFRoaXMgVlJNIGRvZXMgbm90IGhhdmUgYSB0aHVtYm5haWwnKTtcbiAgfVxuXG4gIC8vIHN0b3JlIHRoZSBjdXJyZW50IHJlc29sdXRpb25cbiAgcmVuZGVyZXIuZ2V0U2l6ZShfdjJBKTtcbiAgY29uc3QgcHJldldpZHRoID0gX3YyQS54O1xuICBjb25zdCBwcmV2SGVpZ2h0ID0gX3YyQS55O1xuXG4gIC8vIG92ZXJ3cml0ZSB0aGUgcmVzb2x1dGlvblxuICByZW5kZXJlci5zZXRTaXplKHNpemUsIHNpemUpO1xuXG4gIC8vIGFzc2lnbiB0aGUgdGV4dHVyZSB0byBwbGFuZVxuICBfcGxhbmUubWF0ZXJpYWwubWFwID0gdGV4dHVyZTtcblxuICAvLyByZW5kZXJcbiAgcmVuZGVyZXIucmVuZGVyKF9zY2VuZSwgX2NhbWVyYSk7XG5cbiAgLy8gdW5hc3NpZ24gdGhlIHRleHR1cmVcbiAgX3BsYW5lLm1hdGVyaWFsLm1hcCA9IG51bGw7XG5cbiAgLy8gZ2V0IGJsb2JcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAocmVuZGVyZXIuZ2V0Q29udGV4dCgpLmNhbnZhcyBhcyBIVE1MQ2FudmFzRWxlbWVudCkudG9CbG9iKChibG9iKSA9PiB7XG4gICAgICAvLyByZXZlcnQgdG8gcHJldmlvdXMgcmVzb2x1dGlvblxuICAgICAgcmVuZGVyZXIuc2V0U2l6ZShwcmV2V2lkdGgsIHByZXZIZWlnaHQpO1xuXG4gICAgICBpZiAoYmxvYiA9PSBudWxsKSB7XG4gICAgICAgIHJlamVjdCgnZXh0cmFjdFRodW1ibmFpbEJsb2I6IEZhaWxlZCB0byBjcmVhdGUgYSBibG9iJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGJsb2IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IGV4dHJhY3RUaHVtYm5haWxCbG9iIH0gZnJvbSAnLi9leHRyYWN0VGh1bWJuYWlsQmxvYic7XG5pbXBvcnQgeyByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyB9IGZyb20gJy4vcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHMnO1xuXG5leHBvcnQgY2xhc3MgVlJNVXRpbHMge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHRoaXMgY2xhc3MgaXMgbm90IG1lYW50IHRvIGJlIGluc3RhbnRpYXRlZFxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBleHRyYWN0VGh1bWJuYWlsQmxvYiA9IGV4dHJhY3RUaHVtYm5haWxCbG9iO1xuICBwdWJsaWMgc3RhdGljIHJlbW92ZVVubmVjZXNzYXJ5Sm9pbnRzID0gcmVtb3ZlVW5uZWNlc3NhcnlKb2ludHM7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbi8qKlxuICogVHJhdmVyc2UgZ2l2ZW4gb2JqZWN0IGFuZCByZW1vdmUgdW5uZWNlc3NhcmlseSBib3VuZCBqb2ludHMgZnJvbSBldmVyeSBgVEhSRUUuU2tpbm5lZE1lc2hgLlxuICogU29tZSBlbnZpcm9ubWVudHMgbGlrZSBtb2JpbGUgZGV2aWNlcyBoYXZlIGEgbG93ZXIgbGltaXQgb2YgYm9uZXMgYW5kIG1pZ2h0IGJlIHVuYWJsZSB0byBwZXJmb3JtIG1lc2ggc2tpbm5pbmcsIHRoaXMgZnVuY3Rpb24gbWlnaHQgcmVzb2x2ZSBzdWNoIGFuIGlzc3VlLlxuICogQWxzbyB0aGlzIGZ1bmN0aW9uIG1pZ2h0IGdyZWF0bHkgaW1wcm92ZSB0aGUgcGVyZm9ybWFuY2Ugb2YgbWVzaCBza2lubmluZy5cbiAqXG4gKiBAcGFyYW0gcm9vdCBSb290IG9iamVjdCB0aGF0IHdpbGwgYmUgdHJhdmVyc2VkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVVbm5lY2Vzc2FyeUpvaW50cyhyb290OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAvLyBzb21lIG1lc2hlcyBtaWdodCBzaGFyZSBhIHNhbWUgc2tpbkluZGV4IGF0dHJpYnV0ZSBhbmQgdGhpcyBtYXAgcHJldmVudHMgdG8gY29udmVydCB0aGUgYXR0cmlidXRlIHR3aWNlXG4gIGNvbnN0IHNrZWxldG9uTGlzdDogTWFwPFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSwgVEhSRUUuU2tlbGV0b24+ID0gbmV3IE1hcCgpO1xuXG4gIC8vIFRyYXZlcnNlIGFuIGVudGlyZSB0cmVlXG4gIHJvb3QudHJhdmVyc2UoKG9iaikgPT4ge1xuICAgIGlmIChvYmoudHlwZSAhPT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2ggPSBvYmogYXMgVEhSRUUuU2tpbm5lZE1lc2g7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4JykgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gICAgLy8gbG9vayBmb3IgZXhpc3Rpbmcgc2tlbGV0b25cbiAgICBsZXQgc2tlbGV0b24gPSBza2VsZXRvbkxpc3QuZ2V0KGF0dHJpYnV0ZSk7XG5cbiAgICBpZiAoIXNrZWxldG9uKSB7XG4gICAgICAvLyBnZW5lcmF0ZSByZWR1Y2VkIGJvbmUgbGlzdFxuICAgICAgY29uc3QgYm9uZXM6IFRIUkVFLkJvbmVbXSA9IFtdOyAvLyBuZXcgbGlzdCBvZiBib25lXG4gICAgICBjb25zdCBib25lSW52ZXJzZXM6IFRIUkVFLk1hdHJpeDRbXSA9IFtdOyAvLyBuZXcgbGlzdCBvZiBib25lSW52ZXJzZVxuICAgICAgY29uc3QgYm9uZUluZGV4TWFwOiB7IFtpbmRleDogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTsgLy8gbWFwIG9mIG9sZCBib25lIGluZGV4IHZzLiBuZXcgYm9uZSBpbmRleFxuXG4gICAgICAvLyBjcmVhdGUgYSBuZXcgYm9uZSBtYXBcbiAgICAgIGNvbnN0IGFycmF5ID0gYXR0cmlidXRlLmFycmF5IGFzIG51bWJlcltdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGFycmF5W2ldO1xuXG4gICAgICAgIC8vIG5ldyBza2luSW5kZXggYnVmZmVyXG4gICAgICAgIGlmIChib25lSW5kZXhNYXBbaW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBib25lSW5kZXhNYXBbaW5kZXhdID0gYm9uZXMubGVuZ3RoO1xuICAgICAgICAgIGJvbmVzLnB1c2gobWVzaC5za2VsZXRvbi5ib25lc1tpbmRleF0pO1xuICAgICAgICAgIGJvbmVJbnZlcnNlcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZUludmVyc2VzW2luZGV4XSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcnJheVtpXSA9IGJvbmVJbmRleE1hcFtpbmRleF07XG4gICAgICB9XG5cbiAgICAgIC8vIHJlcGxhY2Ugd2l0aCBuZXcgaW5kaWNlc1xuICAgICAgYXR0cmlidXRlLmNvcHlBcnJheShhcnJheSk7XG4gICAgICBhdHRyaWJ1dGUubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAvLyByZXBsYWNlIHdpdGggbmV3IGluZGljZXNcbiAgICAgIHNrZWxldG9uID0gbmV3IFRIUkVFLlNrZWxldG9uKGJvbmVzLCBib25lSW52ZXJzZXMpO1xuICAgICAgc2tlbGV0b25MaXN0LnNldChhdHRyaWJ1dGUsIHNrZWxldG9uKTtcbiAgICB9XG5cbiAgICBtZXNoLmJpbmQoc2tlbGV0b24sIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgXl5eXl5eXl5eXl5eXl5eXl5eXiB0cmFuc2Zvcm0gb2YgbWVzaGVzIHNob3VsZCBiZSBpZ25vcmVkXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8yLjAjc2tpbnNcbiAgfSk7XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGUHJpbWl0aXZlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZSTUJsZW5kU2hhcGVCaW5kIHtcbiAgbWVzaGVzOiBHTFRGUHJpbWl0aXZlW107XG4gIG1vcnBoVGFyZ2V0SW5kZXg6IG51bWJlcjtcbiAgd2VpZ2h0OiBudW1iZXI7XG59XG5cbmVudW0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlIHtcbiAgTlVNQkVSLFxuICBWRUNUT1IyLFxuICBWRUNUT1IzLFxuICBWRUNUT1I0LFxuICBDT0xPUixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZSB7XG4gIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGRlZmF1bHRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gIHRhcmdldFZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgZGVsdGFWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7IC8vIHRhcmdldFZhbHVlIC0gZGVmYXVsdFZhbHVlXG4gIHR5cGU6IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZTtcbn1cblxuY29uc3QgX3YyID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbmNvbnN0IF92MyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgpO1xuY29uc3QgX2NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKCk7XG5cbi8vIGFuaW1hdGlvbk1peGVyIOOBruebo+imluWvvuixoeOBr+OAgVNjZW5lIOOBruS4reOBq+WFpeOBo+OBpuOBhOOCi+W/heimgeOBjOOBguOCi+OAglxuLy8g44Gd44Gu44Gf44KB44CB6KGo56S644Kq44OW44K444Kn44Kv44OI44Gn44Gv44Gq44GE44GR44KM44Gp44CBT2JqZWN0M0Qg44KS57aZ5om/44GX44GmIFNjZW5lIOOBq+aKleWFpeOBp+OBjeOCi+OCiOOBhuOBq+OBmeOCi+OAglxuZXhwb3J0IGNsYXNzIFZSTUJsZW5kU2hhcGVHcm91cCBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgcHVibGljIHdlaWdodCA9IDAuMDtcbiAgcHVibGljIGlzQmluYXJ5ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfYmluZHM6IFZSTUJsZW5kU2hhcGVCaW5kW10gPSBbXTtcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxWYWx1ZXM6IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihleHByZXNzaW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBgQmxlbmRTaGFwZUNvbnRyb2xsZXJfJHtleHByZXNzaW9uTmFtZX1gO1xuXG4gICAgLy8gdHJhdmVyc2Ug5pmC44Gu5pWR5riI5omL5q6144Go44GX44GmIE9iamVjdDNEIOOBp+OBr+OBquOBhOOBk+OBqOOCkuaYjuekuuOBl+OBpuOBiuOBj1xuICAgIHRoaXMudHlwZSA9ICdCbGVuZFNoYXBlQ29udHJvbGxlcic7XG4gICAgLy8g6KGo56S655uu55qE44Gu44Kq44OW44K444Kn44Kv44OI44Gn44Gv44Gq44GE44Gu44Gn44CB6LKg6I236Lu95rib44Gu44Gf44KB44GrIHZpc2libGUg44KSIGZhbHNlIOOBq+OBl+OBpuOBiuOBj+OAglxuICAgIC8vIOOBk+OCjOOBq+OCiOOCiuOAgeOBk+OBruOCpOODs+OCueOCv+ODs+OCueOBq+WvvuOBmeOCi+avjuODleODrOODvOODoOOBriBtYXRyaXgg6Ieq5YuV6KiI566X44KS55yB55Wl44Gn44GN44KL44CCXG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYWRkQmluZChhcmdzOiB7IG1lc2hlczogR0xURlByaW1pdGl2ZVtdOyBtb3JwaFRhcmdldEluZGV4OiBudW1iZXI7IHdlaWdodDogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICAvLyBvcmlnaW5hbCB3ZWlnaHQgaXMgMC0xMDAgYnV0IHdlIHdhbnQgdG8gZGVhbCB3aXRoIHRoaXMgdmFsdWUgd2l0aGluIDAtMVxuICAgIGNvbnN0IHdlaWdodCA9IGFyZ3Mud2VpZ2h0IC8gMTAwO1xuXG4gICAgdGhpcy5fYmluZHMucHVzaCh7XG4gICAgICBtZXNoZXM6IGFyZ3MubWVzaGVzLFxuICAgICAgbW9ycGhUYXJnZXRJbmRleDogYXJncy5tb3JwaFRhcmdldEluZGV4LFxuICAgICAgd2VpZ2h0LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZE1hdGVyaWFsVmFsdWUoYXJnczoge1xuICAgIG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbDtcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcbiAgICB0YXJnZXRWYWx1ZTogbnVtYmVyW107XG4gICAgZGVmYXVsdFZhbHVlPzogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gIH0pOiB2b2lkIHtcbiAgICBjb25zdCBtYXRlcmlhbCA9IGFyZ3MubWF0ZXJpYWw7XG4gICAgY29uc3QgcHJvcGVydHlOYW1lID0gYXJncy5wcm9wZXJ0eU5hbWU7XG5cbiAgICBsZXQgdmFsdWUgPSAobWF0ZXJpYWwgYXMgYW55KVtwcm9wZXJ0eU5hbWVdO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIC8vIHByb3BlcnR5IGhhcyBub3QgYmVlbiBmb3VuZFxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YWx1ZSA9IGFyZ3MuZGVmYXVsdFZhbHVlIHx8IHZhbHVlO1xuXG4gICAgbGV0IHR5cGU6IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZTtcbiAgICBsZXQgZGVmYXVsdFZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgICBsZXQgdGFyZ2V0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICAgIGxldCBkZWx0YVZhbHVlOiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcblxuICAgIGlmICgodmFsdWUgYXMgYW55KS5pc1ZlY3RvcjIpIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5WZWN0b3IyKS5jbG9uZSgpO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMigpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNWZWN0b3IzKSB7XG4gICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjM7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuVmVjdG9yMykuY2xvbmUoKTtcbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLlZlY3RvcjMoKS5mcm9tQXJyYXkoYXJncy50YXJnZXRWYWx1ZSk7XG4gICAgICBkZWx0YVZhbHVlID0gdGFyZ2V0VmFsdWUuY2xvbmUoKS5zdWIoZGVmYXVsdFZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKCh2YWx1ZSBhcyBhbnkpLmlzVmVjdG9yNCkge1xuICAgICAgdHlwZSA9IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0O1xuICAgICAgZGVmYXVsdFZhbHVlID0gKHZhbHVlIGFzIFRIUkVFLlZlY3RvcjQpLmNsb25lKCk7XG5cbiAgICAgIC8vIHZlY3RvclByb3BlcnR5IGFuZCB0YXJnZXRWYWx1ZSBpbmRleCBpcyBkaWZmZXJlbnQgZnJvbSBlYWNoIG90aGVyXG4gICAgICAvLyBleHBvcnRlZCB2cm0gYnkgVW5pVlJNIGZpbGUgaXNcbiAgICAgIC8vXG4gICAgICAvLyB2ZWN0b3JQcm9wZXJ0eVxuICAgICAgLy8gb2Zmc2V0ID0gdGFyZ2V0VmFsdWVbMF0sIHRhcmdldFZhbHVlWzFdXG4gICAgICAvLyB0aWxpbmcgPSB0YXJnZXRWYWx1ZVsyXSwgdGFyZ2V0VmFsdWVbM11cbiAgICAgIC8vXG4gICAgICAvLyB0YXJnZXRWYWx1ZVxuICAgICAgLy8gb2Zmc2V0ID0gdGFyZ2V0VmFsdWVbMl0sIHRhcmdldFZhbHVlWzNdXG4gICAgICAvLyB0aWxpbmcgPSB0YXJnZXRWYWx1ZVswXSwgdGFyZ2V0VmFsdWVbMV1cbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLlZlY3RvcjQoKS5mcm9tQXJyYXkoW1xuICAgICAgICBhcmdzLnRhcmdldFZhbHVlWzJdLFxuICAgICAgICBhcmdzLnRhcmdldFZhbHVlWzNdLFxuICAgICAgICBhcmdzLnRhcmdldFZhbHVlWzBdLFxuICAgICAgICBhcmdzLnRhcmdldFZhbHVlWzFdLFxuICAgICAgXSk7XG4gICAgICBkZWx0YVZhbHVlID0gdGFyZ2V0VmFsdWUuY2xvbmUoKS5zdWIoZGVmYXVsdFZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKCh2YWx1ZSBhcyBhbnkpLmlzQ29sb3IpIHtcbiAgICAgIHR5cGUgPSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1I7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuQ29sb3IpLmNsb25lKCk7XG4gICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5Db2xvcigpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLk5VTUJFUjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHZhbHVlIGFzIG51bWJlcjtcbiAgICAgIHRhcmdldFZhbHVlID0gYXJncy50YXJnZXRWYWx1ZVswXTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZSAtIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXRlcmlhbFZhbHVlcy5wdXNoKHtcbiAgICAgIG1hdGVyaWFsLFxuICAgICAgcHJvcGVydHlOYW1lLFxuICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgdGFyZ2V0VmFsdWUsXG4gICAgICBkZWx0YVZhbHVlLFxuICAgICAgdHlwZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB3ZWlnaHQgdG8gZXZlcnkgYXNzaWduZWQgYmxlbmQgc2hhcGVzLlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHZpYSB7QGxpbmsgQmxlbmRTaGFwZU1hc3RlciN1cGRhdGV9LlxuICAgKi9cbiAgcHVibGljIGFwcGx5V2VpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IHcgPSB0aGlzLmlzQmluYXJ5ID8gKHRoaXMud2VpZ2h0IDwgMC41ID8gMC4wIDogMS4wKSA6IHRoaXMud2VpZ2h0O1xuXG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4ge1xuICAgICAgYmluZC5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICBpZiAoIW1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZEJpbmRgXG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW2JpbmQubW9ycGhUYXJnZXRJbmRleF0gKz0gdyAqIGJpbmQud2VpZ2h0O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9tYXRlcmlhbFZhbHVlcy5mb3JFYWNoKChtYXRlcmlhbFZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0gKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV07XG4gICAgICBpZiAocHJvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkTWF0ZXJpYWxWYWx1ZWBcblxuICAgICAgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLk5VTUJFUikge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIG51bWJlcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0gKz0gZGVsdGFWYWx1ZSAqIHc7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjIpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5WZWN0b3IyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3YyLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IzKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuVmVjdG9yMztcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92My5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SNCkge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIFRIUkVFLlZlY3RvcjQ7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjQuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLkNPTE9SKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuQ29sb3I7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfY29sb3IuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBwcmV2aW91c2x5IGFzc2lnbmVkIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHB1YmxpYyBjbGVhckFwcGxpZWRXZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fYmluZHMuZm9yRWFjaCgoYmluZCkgPT4ge1xuICAgICAgYmluZC5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xuICAgICAgICBpZiAoIW1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZEJpbmRgXG4gICAgICAgIG1lc2gubW9ycGhUYXJnZXRJbmZsdWVuY2VzW2JpbmQubW9ycGhUYXJnZXRJbmRleF0gPSAwLjA7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIG51bWJlcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0gPSBkZWZhdWx0VmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjIpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuVmVjdG9yMjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IFZSTUJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IzKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLlZlY3RvcjM7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBWUk1CbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SNCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZSBhcyBUSFJFRS5WZWN0b3I0O1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gVlJNQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLkNPTE9SKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLkNvbG9yO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KS5zaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgR0xURk1lc2gsIEdMVEZQcmltaXRpdmUsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHJlbmFtZU1hdGVyaWFsUHJvcGVydHkgfSBmcm9tICcuLi91dGlscy9yZW5hbWVNYXRlcmlhbFByb3BlcnR5JztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVHcm91cCB9IGZyb20gJy4vVlJNQmxlbmRTaGFwZUdyb3VwJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4vVlJNQmxlbmRTaGFwZVByb3h5JztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUJsZW5kU2hhcGVdXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1CbGVuZFNoYXBlSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1CbGVuZFNoYXBlXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUJsZW5kU2hhcGVQcm94eSB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hQmxlbmRTaGFwZTogVlJNU2NoZW1hLkJsZW5kU2hhcGUgfCB1bmRlZmluZWQgPSB2cm1FeHQuYmxlbmRTaGFwZU1hc3RlcjtcbiAgICBpZiAoIXNjaGVtYUJsZW5kU2hhcGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGUgPSBuZXcgVlJNQmxlbmRTaGFwZVByb3h5KCk7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlR3JvdXBzOiBWUk1TY2hlbWEuQmxlbmRTaGFwZUdyb3VwW10gfCB1bmRlZmluZWQgPSBzY2hlbWFCbGVuZFNoYXBlLmJsZW5kU2hhcGVHcm91cHM7XG4gICAgaWYgKCFibGVuZFNoYXBlR3JvdXBzKSB7XG4gICAgICByZXR1cm4gYmxlbmRTaGFwZTtcbiAgICB9XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJlc2V0TWFwOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSA9IHt9O1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBibGVuZFNoYXBlR3JvdXBzLm1hcChhc3luYyAoc2NoZW1hR3JvdXApID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHNjaGVtYUdyb3VwLm5hbWU7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1ZSTUJsZW5kU2hhcGVJbXBvcnRlcjogT25lIG9mIGJsZW5kU2hhcGVHcm91cHMgaGFzIG5vIG5hbWUnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJlc2V0TmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc2NoZW1hR3JvdXAucHJlc2V0TmFtZSAmJlxuICAgICAgICAgIHNjaGVtYUdyb3VwLnByZXNldE5hbWUgIT09IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Vbmtub3duICYmXG4gICAgICAgICAgIWJsZW5kU2hhcGVQcmVzZXRNYXBbc2NoZW1hR3JvdXAucHJlc2V0TmFtZV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgcHJlc2V0TmFtZSA9IHNjaGVtYUdyb3VwLnByZXNldE5hbWU7XG4gICAgICAgICAgYmxlbmRTaGFwZVByZXNldE1hcFtzY2hlbWFHcm91cC5wcmVzZXROYW1lXSA9IG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBncm91cCA9IG5ldyBWUk1CbGVuZFNoYXBlR3JvdXAobmFtZSk7XG4gICAgICAgIGdsdGYuc2NlbmUuYWRkKGdyb3VwKTtcblxuICAgICAgICBncm91cC5pc0JpbmFyeSA9IHNjaGVtYUdyb3VwLmlzQmluYXJ5IHx8IGZhbHNlO1xuXG4gICAgICAgIGlmIChzY2hlbWFHcm91cC5iaW5kcykge1xuICAgICAgICAgIHNjaGVtYUdyb3VwLmJpbmRzLmZvckVhY2goYXN5bmMgKGJpbmQpID0+IHtcbiAgICAgICAgICAgIGlmIChiaW5kLm1lc2ggPT09IHVuZGVmaW5lZCB8fCBiaW5kLmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb3JwaE1lc2hlczogR0xURk1lc2ggPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdtZXNoJywgYmluZC5tZXNoKTtcbiAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXM6IEdMVEZQcmltaXRpdmVbXSA9XG4gICAgICAgICAgICAgIG1vcnBoTWVzaGVzLnR5cGUgPT09ICdHcm91cCdcbiAgICAgICAgICAgICAgICA/IChtb3JwaE1lc2hlcy5jaGlsZHJlbiBhcyBBcnJheTxHTFRGUHJpbWl0aXZlPilcbiAgICAgICAgICAgICAgICA6IFttb3JwaE1lc2hlcyBhcyBHTFRGUHJpbWl0aXZlXTtcbiAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0SW5kZXggPSBiaW5kLmluZGV4O1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgICAocHJpbWl0aXZlKSA9PlxuICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwcmltaXRpdmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzKSAmJlxuICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBWUk1CbGVuZFNoYXBlSW1wb3J0ZXI6ICR7c2NoZW1hR3JvdXAubmFtZX0gYXR0ZW1wdHMgdG8gaW5kZXggJHttb3JwaFRhcmdldEluZGV4fXRoIG1vcnBoIGJ1dCBub3QgZm91bmQuYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBncm91cC5hZGRCaW5kKHtcbiAgICAgICAgICAgICAgbWVzaGVzOiBwcmltaXRpdmVzLFxuICAgICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgICB3ZWlnaHQ6IGJpbmQud2VpZ2h0IHx8IDEwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBzY2hlbWFHcm91cC5tYXRlcmlhbFZhbHVlcztcbiAgICAgICAgaWYgKG1hdGVyaWFsVmFsdWVzKSB7XG4gICAgICAgICAgbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIG1hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgbWF0ZXJpYWxWYWx1ZS50YXJnZXRWYWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICAgIGdsdGYuc2NlbmUudHJhdmVyc2UoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoKG9iamVjdCBhcyBhbnkpLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRlcmlhbCkpIHtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgKG10bCkgPT4gbXRsLm5hbWUgPT09IG1hdGVyaWFsVmFsdWUubWF0ZXJpYWxOYW1lISAmJiBtYXRlcmlhbHMuaW5kZXhPZihtdGwpID09PSAtMSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSAmJiBtYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICAgIGdyb3VwLmFkZE1hdGVyaWFsVmFsdWUoe1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSEpLFxuICAgICAgICAgICAgICAgIHRhcmdldFZhbHVlOiBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlISxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsZW5kU2hhcGUucmVnaXN0ZXJCbGVuZFNoYXBlR3JvdXAobmFtZSwgcHJlc2V0TmFtZSwgZ3JvdXApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBibGVuZFNoYXBlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYXR1cmF0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZUdyb3VwIH0gZnJvbSAnLi9WUk1CbGVuZFNoYXBlR3JvdXAnO1xuXG5leHBvcnQgY2xhc3MgVlJNQmxlbmRTaGFwZVByb3h5IHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgcmVnaXN0ZXJlZCBibGVuZCBzaGFwZS5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVHcm91cHM6IHsgW25hbWU6IHN0cmluZ106IFZSTUJsZW5kU2hhcGVHcm91cCB9ID0ge307XG5cbiAgLyoqXG4gICAqIEEgbWFwIGZyb20gW1tWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdXSB0byBpdHMgYWN0dWFsIGJsZW5kIHNoYXBlIG5hbWUuXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9ibGVuZFNoYXBlUHJlc2V0TWFwOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgbmFtZSBvZiB1bmtub3duIGJsZW5kIHNoYXBlcy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3Vua25vd25Hcm91cE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNQmxlbmRTaGFwZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiBuYW1lIG9mIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGV4cHJlc3Npb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3Vwcyk7XG4gIH1cblxuICAvKipcbiAgICogQSBtYXAgZnJvbSBbW1ZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV1dIHRvIGl0cyBhY3R1YWwgYmxlbmQgc2hhcGUgbmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgYmxlbmRTaGFwZVByZXNldE1hcCgpOiB7IFtwcmVzZXROYW1lIGluIFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXA7XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIG5hbWUgb2YgdW5rbm93biBibGVuZCBzaGFwZXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHVua25vd25Hcm91cE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdW5rbm93bkdyb3VwTmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWU6IHN0cmluZyB8IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSk6IFZSTUJsZW5kU2hhcGVHcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJlc2V0TmFtZSA9IHRoaXMuX2JsZW5kU2hhcGVQcmVzZXRNYXBbbmFtZSBhcyBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWVdO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwcmVzZXROYW1lID8gdGhpcy5fYmxlbmRTaGFwZUdyb3Vwc1twcmVzZXROYW1lXSA6IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICBjb25zb2xlLndhcm4oYG5vIGJsZW5kIHNoYXBlIGZvdW5kIGJ5ICR7bmFtZX1gKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdvcnVwXG4gICAqIEBwYXJhbSBjb250cm9sbGVyIFZSTUJsZW5kU2hhcGVDb250cm9sbGVyIHRoYXQgZGVzY3JpYmVzIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwcmVzZXROYW1lOiBWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUgfCB1bmRlZmluZWQsXG4gICAgY29udHJvbGxlcjogVlJNQmxlbmRTaGFwZUdyb3VwLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdID0gY29udHJvbGxlcjtcbiAgICBpZiAocHJlc2V0TmFtZSkge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByZXNldE1hcFtwcmVzZXROYW1lXSA9IG5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Vua25vd25Hcm91cE5hbWVzLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHdlaWdodCBvZiBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdyb3VwXG4gICAqL1xuICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuZ2V0QmxlbmRTaGFwZUdyb3VwKG5hbWUpO1xuICAgIHJldHVybiBjb250cm9sbGVyPy53ZWlnaHQgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB3ZWlnaHQgdG8gc3BlY2lmaWVkIGJsZW5kIHNoYXBlIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKiBAcGFyYW0gd2VpZ2h0IFdlaWdodFxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZywgd2VpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5nZXRCbGVuZFNoYXBlR3JvdXAobmFtZSk7XG4gICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIud2VpZ2h0ID0gc2F0dXJhdGUod2VpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdHJhY2sgbmFtZSBvZiBzcGVjaWZpZWQgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqIFRoaXMgdHJhY2sgbmFtZSBpcyBuZWVkZWQgdG8gbWFuaXB1bGF0ZSBpdHMgYmxlbmQgc2hhcGUgZ3JvdXAgdmlhIGtleWZyYW1lIGFuaW1hdGlvbnMuXG4gICAqXG4gICAqIEBleGFtcGxlIE1hbmlwdWxhdGUgYSBibGVuZCBzaGFwZSBncm91cCB1c2luZyBrZXlmcmFtZSBhbmltYXRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgdHJhY2tOYW1lID0gdnJtLmJsZW5kU2hhcGVQcm94eS5nZXRCbGVuZFNoYXBlVHJhY2tOYW1lKCBUSFJFRS5WUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuQmxpbmsgKTtcbiAgICogY29uc3QgdHJhY2sgPSBuZXcgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFjayhcbiAgICogICBuYW1lLFxuICAgKiAgIFsgMC4wLCAwLjUsIDEuMCBdLCAvLyB0aW1lc1xuICAgKiAgIFsgMC4wLCAxLjAsIDAuMCBdIC8vIHZhbHVlc1xuICAgKiApO1xuICAgKlxuICAgKiBjb25zdCBjbGlwID0gbmV3IFRIUkVFLkFuaW1hdGlvbkNsaXAoXG4gICAqICAgJ2JsaW5rJywgLy8gbmFtZVxuICAgKiAgIDEuMCwgLy8gZHVyYXRpb25cbiAgICogICBbIHRyYWNrIF0gLy8gdHJhY2tzXG4gICAqICk7XG4gICAqXG4gICAqIGNvbnN0IG1peGVyID0gbmV3IFRIUkVFLkFuaW1hdGlvbk1peGVyKCB2cm0uc2NlbmUgKTtcbiAgICogY29uc3QgYWN0aW9uID0gbWl4ZXIuY2xpcEFjdGlvbiggY2xpcCApO1xuICAgKiBhY3Rpb24ucGxheSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBnZXRCbGVuZFNoYXBlVHJhY2tOYW1lKG5hbWU6IFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZSB8IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldEJsZW5kU2hhcGVHcm91cChuYW1lKTtcbiAgICByZXR1cm4gY29udHJvbGxlciA/IGAke2NvbnRyb2xsZXIubmFtZX0ud2VpZ2h0YCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGV2ZXJ5IGJsZW5kIHNoYXBlIGdyb3Vwcy5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgICBjb250cm9sbGVyLmNsZWFyQXBwbGllZFdlaWdodCgpO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5fYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuX2JsZW5kU2hhcGVHcm91cHNbbmFtZV07XG4gICAgICBjb250cm9sbGVyLmFwcGx5V2VpZ2h0KCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vVlJNQmxlbmRTaGFwZUdyb3VwJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNQmxlbmRTaGFwZUltcG9ydGVyJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNQmxlbmRTaGFwZVByb3h5JztcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEYgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJztcbmltcG9ydCB7IFZSTSwgVlJNUGFyYW1ldGVycyB9IGZyb20gJy4uL1ZSTSc7XG5pbXBvcnQgeyBWUk1JbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuLi9WUk1JbXBvcnRlcic7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1JbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1JbXBvcnRlckRlYnVnJztcblxuZXhwb3J0IGNvbnN0IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgPSAxMDAwMDtcblxuLyoqXG4gKiBbW1ZSTV1dIGJ1dCBpdCBoYXMgc29tZSB1c2VmdWwgZ2l6bW9zLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRGVidWcgZXh0ZW5kcyBWUk0ge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTURlYnVnIGZyb20gYSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyLlxuICAgKlxuICAgKiBTZWUgW1tWUk0uZnJvbV1dIGZvciBhIGRldGFpbGVkIGV4YW1wbGUuXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIEdMVEYgb2JqZWN0IHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRoYXQgd2lsbCBiZSB1c2VkIGluIGltcG9ydGVyXG4gICAqIEBwYXJhbSBkZWJ1Z09wdGlvbiBPcHRpb25zIGZvciBWUk1EZWJ1ZyBmZWF0dXJlc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhc3luYyBmcm9tKFxuICAgIGdsdGY6IEdMVEYsXG4gICAgb3B0aW9uczogVlJNSW1wb3J0ZXJPcHRpb25zID0ge30sXG4gICAgZGVidWdPcHRpb246IFZSTURlYnVnT3B0aW9ucyA9IHt9LFxuICApOiBQcm9taXNlPFZSTT4ge1xuICAgIGNvbnN0IGltcG9ydGVyID0gbmV3IFZSTUltcG9ydGVyRGVidWcob3B0aW9ucyk7XG4gICAgcmV0dXJuIGF3YWl0IGltcG9ydGVyLmltcG9ydChnbHRmLCBkZWJ1Z09wdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTURlYnVnIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIFtbVlJNUGFyYW1ldGVyc11dIHRoYXQgcmVwcmVzZW50cyBjb21wb25lbnRzIG9mIHRoZSBWUk1cbiAgICogQHBhcmFtIGRlYnVnT3B0aW9uIE9wdGlvbnMgZm9yIFZSTURlYnVnIGZlYXR1cmVzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFZSTVBhcmFtZXRlcnMsIGRlYnVnT3B0aW9uOiBWUk1EZWJ1Z09wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHBhcmFtcyk7XG5cbiAgICAvLyBHaXptb+OCkuWxlemWi1xuICAgIGlmICghZGVidWdPcHRpb24uZGlzYWJsZUJveEhlbHBlcikge1xuICAgICAgdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkJveEhlbHBlcih0aGlzLnNjZW5lKSk7XG4gICAgfVxuXG4gICAgaWYgKCFkZWJ1Z09wdGlvbi5kaXNhYmxlU2tlbGV0b25IZWxwZXIpIHtcbiAgICAgIHRoaXMuc2NlbmUuYWRkKG5ldyBUSFJFRS5Ta2VsZXRvbkhlbHBlcih0aGlzLnNjZW5lKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNSW1wb3J0ZXIsIFZSTUltcG9ydGVyT3B0aW9ucyB9IGZyb20gJy4uL1ZSTUltcG9ydGVyJztcbmltcG9ydCB7IFZSTURlYnVnIH0gZnJvbSAnLi9WUk1EZWJ1Zyc7XG5pbXBvcnQgeyBWUk1EZWJ1Z09wdGlvbnMgfSBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkRGVidWcgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWREZWJ1Zyc7XG5pbXBvcnQgeyBWUk1Mb29rQXRJbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1Mb29rQXRJbXBvcnRlckRlYnVnJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVJbXBvcnRlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTURlYnVnXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSW1wb3J0ZXJEZWJ1ZyBleHRlbmRzIFZSTUltcG9ydGVyIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZSTUltcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgb3B0aW9ucy5sb29rQXRJbXBvcnRlciA9IG9wdGlvbnMubG9va0F0SW1wb3J0ZXIgfHwgbmV3IFZSTUxvb2tBdEltcG9ydGVyRGVidWcoKTtcbiAgICBvcHRpb25zLnNwcmluZ0JvbmVJbXBvcnRlciA9IG9wdGlvbnMuc3ByaW5nQm9uZUltcG9ydGVyIHx8IG5ldyBWUk1TcHJpbmdCb25lSW1wb3J0ZXJEZWJ1ZygpO1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGLCBkZWJ1Z09wdGlvbnM6IFZSTURlYnVnT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxWUk1EZWJ1Zz4ge1xuICAgIGlmIChnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgPT09IHVuZGVmaW5lZCB8fCBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgVlJNIGV4dGVuc2lvbiBvbiB0aGUgR0xURicpO1xuICAgIH1cbiAgICBjb25zdCBzY2VuZSA9IGdsdGYuc2NlbmU7XG5cbiAgICBzY2VuZS51cGRhdGVNYXRyaXhXb3JsZChmYWxzZSk7XG5cbiAgICAvLyBTa2lubmVkIG9iamVjdCBzaG91bGQgbm90IGJlIGZydXN0dW1DdWxsZWRcbiAgICAvLyBTaW5jZSBwcmUtc2tpbm5lZCBwb3NpdGlvbiBtaWdodCBiZSBvdXRzaWRlIG9mIHZpZXdcbiAgICBzY2VuZS50cmF2ZXJzZSgob2JqZWN0M2QpID0+IHtcbiAgICAgIGlmICgob2JqZWN0M2QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWV0YSA9IChhd2FpdCB0aGlzLl9tZXRhSW1wb3J0ZXIuaW1wb3J0KGdsdGYpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtYXRlcmlhbHMgPSAoYXdhaXQgdGhpcy5fbWF0ZXJpYWxJbXBvcnRlci5jb252ZXJ0R0xURk1hdGVyaWFscyhnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgaHVtYW5vaWQgPSAoYXdhaXQgdGhpcy5faHVtYW5vaWRJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGZpcnN0UGVyc29uID0gaHVtYW5vaWQgPyAoYXdhaXQgdGhpcy5fZmlyc3RQZXJzb25JbXBvcnRlci5pbXBvcnQoZ2x0ZiwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSAoYXdhaXQgdGhpcy5fYmxlbmRTaGFwZUltcG9ydGVyLmltcG9ydChnbHRmKSkgfHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgbG9va0F0ID1cbiAgICAgIGZpcnN0UGVyc29uICYmIGJsZW5kU2hhcGVQcm94eSAmJiBodW1hbm9pZFxuICAgICAgICA/IChhd2FpdCB0aGlzLl9sb29rQXRJbXBvcnRlci5pbXBvcnQoZ2x0ZiwgZmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpKSB8fCB1bmRlZmluZWRcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKChsb29rQXQgYXMgYW55KS5zZXR1cEhlbHBlcikge1xuICAgICAgKGxvb2tBdCBhcyBWUk1Mb29rQXRIZWFkRGVidWcpLnNldHVwSGVscGVyKHNjZW5lLCBkZWJ1Z09wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNwcmluZ0JvbmVNYW5hZ2VyID0gKGF3YWl0IHRoaXMuX3NwcmluZ0JvbmVJbXBvcnRlci5pbXBvcnQoZ2x0ZikpIHx8IHVuZGVmaW5lZDtcbiAgICBpZiAoKHNwcmluZ0JvbmVNYW5hZ2VyIGFzIGFueSkuc2V0dXBIZWxwZXIpIHtcbiAgICAgIChzcHJpbmdCb25lTWFuYWdlciBhcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKS5zZXR1cEhlbHBlcihzY2VuZSwgZGVidWdPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFZSTURlYnVnKFxuICAgICAge1xuICAgICAgICBzY2VuZTogZ2x0Zi5zY2VuZSxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgbWF0ZXJpYWxzLFxuICAgICAgICBodW1hbm9pZCxcbiAgICAgICAgZmlyc3RQZXJzb24sXG4gICAgICAgIGJsZW5kU2hhcGVQcm94eSxcbiAgICAgICAgbG9va0F0LFxuICAgICAgICBzcHJpbmdCb25lTWFuYWdlcixcbiAgICAgIH0sXG4gICAgICBkZWJ1Z09wdGlvbnMsXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4uL2xvb2thdC9WUk1Mb29rQXRIZWFkJztcbmltcG9ydCB7IFZSTURlYnVnT3B0aW9ucyB9IGZyb20gJy4vVlJNRGVidWdPcHRpb25zJztcblxuY29uc3QgX3YzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlYWREZWJ1ZyBleHRlbmRzIFZSTUxvb2tBdEhlYWQge1xuICBwcml2YXRlIF9mYWNlRGlyZWN0aW9uSGVscGVyPzogVEhSRUUuQXJyb3dIZWxwZXI7XG5cbiAgcHVibGljIHNldHVwSGVscGVyKHNjZW5lOiBUSFJFRS5PYmplY3QzRCwgZGVidWdPcHRpb246IFZSTURlYnVnT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICghZGVidWdPcHRpb24uZGlzYWJsZUZhY2VEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIgPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSxcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksXG4gICAgICAgIDAuNSxcbiAgICAgICAgMHhmZjAwZmYsXG4gICAgICApO1xuICAgICAgc2NlbmUuYWRkKHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZShkZWx0YSk7XG5cbiAgICBpZiAodGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlcikge1xuICAgICAgdGhpcy5maXJzdFBlcnNvbi5nZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24odGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlci5wb3NpdGlvbik7XG4gICAgICB0aGlzLl9mYWNlRGlyZWN0aW9uSGVscGVyLnNldERpcmVjdGlvbih0aGlzLmdldExvb2tBdFdvcmxkRGlyZWN0aW9uKF92MykpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4uL2ZpcnN0cGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4uL2xvb2thdC9WUk1Mb29rQXRIZWFkJztcbmltcG9ydCB7IFZSTUxvb2tBdEltcG9ydGVyIH0gZnJvbSAnLi4vbG9va2F0L1ZSTUxvb2tBdEltcG9ydGVyJztcbmltcG9ydCB7IFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWREZWJ1ZyB9IGZyb20gJy4vVlJNTG9va0F0SGVhZERlYnVnJztcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEltcG9ydGVyRGVidWcgZXh0ZW5kcyBWUk1Mb29rQXRJbXBvcnRlciB7XG4gIHB1YmxpYyBpbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb24sXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICApOiBWUk1Mb29rQXRIZWFkIHwgbnVsbCB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWUk1TY2hlbWEuRmlyc3RQZXJzb24gfCB1bmRlZmluZWQgPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYXBwbHllciA9IHRoaXMuX2ltcG9ydEFwcGx5ZXIoc2NoZW1hRmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpO1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0SGVhZERlYnVnKGZpcnN0UGVyc29uLCBhcHBseWVyIHx8IHVuZGVmaW5lZCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCB7IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgfSBmcm9tICcuL1ZSTURlYnVnJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZURlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZSB7XG4gIHByaXZhdGUgX2dpem1vPzogVEhSRUUuQXJyb3dIZWxwZXI7XG5cbiAgY29uc3RydWN0b3IoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMpIHtcbiAgICBzdXBlcihib25lLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBzcHJpbmcgYm9uZSBnaXptbywgYXMgYFRIUkVFLkFycm93SGVscGVyYC5cbiAgICogVXNlZnVsIGZvciBkZWJ1Z2dpbmcgc3ByaW5nIGJvbmVzLlxuICAgKi9cbiAgcHVibGljIGdldEdpem1vKCk6IFRIUkVFLkFycm93SGVscGVyIHtcbiAgICAvLyByZXR1cm4gaWYgZ2l6bW8gaXMgYWxyZWFkeSBleGlzdGVkXG4gICAgaWYgKHRoaXMuX2dpem1vKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2l6bW87XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZSA9IF92M0EuY29weSh0aGlzLl9uZXh0VGFpbCkuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pO1xuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5fZ2l6bW8gPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoXG4gICAgICBuZXh0VGFpbFJlbGF0aXZlLm5vcm1hbGl6ZSgpLFxuICAgICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbixcbiAgICAgIG5leHRUYWlsUmVsYXRpdmVMZW5ndGgsXG4gICAgICAweGZmZmYwMCxcbiAgICAgIHRoaXMucmFkaXVzLFxuICAgICAgdGhpcy5yYWRpdXMsXG4gICAgKTtcblxuICAgIC8vIGl0IHNob3VsZCBiZSBhbHdheXMgdmlzaWJsZVxuICAgIHRoaXMuX2dpem1vLmxpbmUucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgIHRoaXMuX2dpem1vLmNvbmUucmVuZGVyT3JkZXIgPSBWUk1fR0laTU9fUkVOREVSX09SREVSO1xuICAgICh0aGlzLl9naXptby5saW5lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAodGhpcy5fZ2l6bW8ubGluZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkudHJhbnNwYXJlbnQgPSB0cnVlO1xuICAgICh0aGlzLl9naXptby5jb25lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS5kZXB0aFRlc3QgPSBmYWxzZTtcbiAgICAodGhpcy5fZ2l6bW8uY29uZS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCkudHJhbnNwYXJlbnQgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXMuX2dpem1vO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcbiAgICAvLyBsYXN0bHkgd2UncmUgZ29ubmEgdXBkYXRlIGdpem1vXG4gICAgdGhpcy5fdXBkYXRlR2l6bW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUdpem1vKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZ2l6bW8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0VGFpbFJlbGF0aXZlID0gX3YzQS5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKS5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZUxlbmd0aCA9IG5leHRUYWlsUmVsYXRpdmUubGVuZ3RoKCk7XG5cbiAgICB0aGlzLl9naXptby5zZXREaXJlY3Rpb24obmV4dFRhaWxSZWxhdGl2ZS5ub3JtYWxpemUoKSk7XG4gICAgdGhpcy5fZ2l6bW8uc2V0TGVuZ3RoKG5leHRUYWlsUmVsYXRpdmVMZW5ndGgsIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyk7XG4gICAgdGhpcy5fZ2l6bW8ucG9zaXRpb24uY29weSh0aGlzLl9jZW50ZXJTcGFjZVBvc2l0aW9uKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUltcG9ydGVyIH0gZnJvbSAnLi4vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lSW1wb3J0ZXInO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lRGVidWcgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVEZWJ1Zyc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyB9IGZyb20gJy4uL3NwcmluZ2JvbmUvVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcgZXh0ZW5kcyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIge1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyRGVidWcgfCBudWxsPiB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uIHwgdW5kZWZpbmVkID0gdnJtRXh0LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoIXNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICAvLyDooZ3nqoHliKTlrprnkIPkvZPjg6Hjg4Pjgrfjg6XjgIJcbiAgICBjb25zdCBjb2xsaWRlckdyb3VwcyA9IGF3YWl0IHRoaXMuX2ltcG9ydENvbGxpZGVyTWVzaEdyb3VwcyhnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pO1xuXG4gICAgLy8g5ZCM44GY5bGe5oCn77yIc3RpZmZpbmVzc+OChGRyYWdGb3JjZeOBjOWQjOOBmO+8ieOBruODnOODvOODs+OBr2JvbmVHcm91cOOBq+OBvuOBqOOCgeOCieOCjOOBpuOBhOOCi+OAglxuICAgIC8vIOS4gOWIl+OBoOOBkeOBp+OBr+OBquOBhOOBk+OBqOOBq+azqOaEj+OAglxuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cExpc3QgPSBhd2FpdCB0aGlzLl9pbXBvcnRTcHJpbmdCb25lR3JvdXBMaXN0KGdsdGYsIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbiwgY29sbGlkZXJHcm91cHMpO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnKGNvbGxpZGVyR3JvdXBzLCBzcHJpbmdCb25lR3JvdXBMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlU3ByaW5nQm9uZShib25lOiBUSFJFRS5PYmplY3QzRCwgcGFyYW1zOiBWUk1TcHJpbmdCb25lUGFyYW1ldGVycyk6IFZSTVNwcmluZ0JvbmVEZWJ1ZyB7XG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lRGVidWcoYm9uZSwgcGFyYW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCB7IFZSTURlYnVnT3B0aW9ucyB9IGZyb20gJy4vVlJNRGVidWdPcHRpb25zJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZURlYnVnJztcbmltcG9ydCB7IFZSTV9HSVpNT19SRU5ERVJfT1JERVIgfSBmcm9tICcuL1ZSTURlYnVnJztcblxuY29uc3QgX2NvbGxpZGVyR2l6bW9NYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gIGNvbG9yOiAweGZmMDBmZixcbiAgd2lyZWZyYW1lOiB0cnVlLFxuICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgZGVwdGhUZXN0OiBmYWxzZSxcbn0pO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgc3ByaW5nIGJvbmUgZ3JvdXAgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCB0eXBlIFZSTVNwcmluZ0JvbmVHcm91cERlYnVnID0gVlJNU3ByaW5nQm9uZURlYnVnW107XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwdWJsaWMgc2V0dXBIZWxwZXIoc2NlbmU6IFRIUkVFLk9iamVjdDNELCBkZWJ1Z09wdGlvbjogVlJNRGVidWdPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKGRlYnVnT3B0aW9uLmRpc2FibGVTcHJpbmdCb25lSGVscGVyKSByZXR1cm47XG5cbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBpZiAoKHNwcmluZ0JvbmUgYXMgYW55KS5nZXRHaXptbykge1xuICAgICAgICAgIGNvbnN0IGdpem1vID0gKHNwcmluZ0JvbmUgYXMgVlJNU3ByaW5nQm9uZURlYnVnKS5nZXRHaXptbygpO1xuICAgICAgICAgIHNjZW5lLmFkZChnaXptbyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jb2xsaWRlckdyb3Vwcy5mb3JFYWNoKChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBjb2xsaWRlci5tYXRlcmlhbCA9IF9jb2xsaWRlckdpem1vTWF0ZXJpYWw7XG4gICAgICAgIGNvbGxpZGVyLnJlbmRlck9yZGVyID0gVlJNX0dJWk1PX1JFTkRFUl9PUkRFUjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1ZSTURlYnVnT3B0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTURlYnVnJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZURlYnVnJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZUltcG9ydGVyRGVidWcnO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURk1lc2gsIEdMVEZOb2RlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuXG5jb25zdCBWRUNUT1IzX0ZST05UID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgLTEuMCkpO1xuXG5jb25zdCBfcXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbmVudW0gRmlyc3RQZXJzb25GbGFnIHtcbiAgQXV0byxcbiAgQm90aCxcbiAgVGhpcmRQZXJzb25Pbmx5LFxuICBGaXJzdFBlcnNvbk9ubHksXG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIFtgbWVzaEFubm90YXRpb25gXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvbWFzdGVyL3NwZWNpZmljYXRpb24vMC4wL3NjaGVtYS92cm0uZmlyc3RwZXJzb24ubWVzaGFubm90YXRpb24uc2NoZW1hLmpzb24pIGVudHJ5LlxuICogRWFjaCBtZXNoIHdpbGwgYmUgYXNzaWduZWQgdG8gc3BlY2lmaWVkIGxheWVyIHdoZW4geW91IGNhbGwgW1tWUk1GaXJzdFBlcnNvbi5zZXR1cF1dLlxuICovXG5leHBvcnQgY2xhc3MgVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX3BhcnNlRmlyc3RQZXJzb25GbGFnKGZpcnN0UGVyc29uRmxhZzogc3RyaW5nIHwgdW5kZWZpbmVkKTogRmlyc3RQZXJzb25GbGFnIHtcbiAgICBzd2l0Y2ggKGZpcnN0UGVyc29uRmxhZykge1xuICAgICAgY2FzZSAnQm90aCc6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuQm90aDtcbiAgICAgIGNhc2UgJ1RoaXJkUGVyc29uT25seSc6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuVGhpcmRQZXJzb25Pbmx5O1xuICAgICAgY2FzZSAnRmlyc3RQZXJzb25Pbmx5JzpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5GaXJzdFBlcnNvbk9ubHk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkF1dG87XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgW1tGaXJzdFBlcnNvbkZsYWddXSBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIHB1YmxpYyBmaXJzdFBlcnNvbkZsYWc6IEZpcnN0UGVyc29uRmxhZztcblxuICAvKipcbiAgICogQSBtZXNoIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgcHVibGljIG1lc2g6IEdMVEZNZXNoO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbWVzaCBhbm5vdGF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb25GbGFnIEEgW1tGaXJzdFBlcnNvbkZsYWddXSBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeVxuICAgKiBAcGFyYW0gbm9kZSBBIG5vZGUgb2YgdGhlIGFubm90YXRpb24gZW50cnkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmaXJzdFBlcnNvbkZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCwgbWVzaDogR0xURk1lc2gpIHtcbiAgICB0aGlzLmZpcnN0UGVyc29uRmxhZyA9IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFncy5fcGFyc2VGaXJzdFBlcnNvbkZsYWcoZmlyc3RQZXJzb25GbGFnKTtcbiAgICB0aGlzLm1lc2ggPSBtZXNoO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUk1GaXJzdFBlcnNvbiB7XG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldEZpcnN0UGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIgPSA5O1xuXG4gIC8qKlxuICAgKiBBIGRlZmF1bHQgY2FtZXJhIGxheWVyIGZvciBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICpcbiAgICogQHNlZSBbW2dldFRoaXJkUGVyc29uT25seUxheWVyXV1cbiAgICovXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9maXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoQW5ub3RhdGlvbnM6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpcnN0UGVyc29uQm9uZU9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLl9ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVI7XG4gIHByaXZhdGUgX3RoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUjtcblxuICBwcml2YXRlIF9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNRmlyc3RQZXJzb24gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb25Cb25lIEEgZmlyc3QgcGVyc29uIGJvbmVcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uQm9uZU9mZnNldCBBbiBvZmZzZXQgZnJvbSB0aGUgc3BlY2lmaWVkIGZpcnN0IHBlcnNvbiBib25lXG4gICAqIEBwYXJhbSBtZXNoQW5ub3RhdGlvbnMgQSByZW5kZXJlciBzZXR0aW5ncy4gU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiBbW1JlbmRlcmVyRmlyc3RQZXJzb25GbGFnc11dIGZvciBtb3JlIGluZm9cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGZpcnN0UGVyc29uQm9uZTogR0xURk5vZGUsXG4gICAgZmlyc3RQZXJzb25Cb25lT2Zmc2V0OiBUSFJFRS5WZWN0b3IzLFxuICAgIG1lc2hBbm5vdGF0aW9uczogVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzW10sXG4gICkge1xuICAgIHRoaXMuX2ZpcnN0UGVyc29uQm9uZSA9IGZpcnN0UGVyc29uQm9uZTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQgPSBmaXJzdFBlcnNvbkJvbmVPZmZzZXQ7XG4gICAgdGhpcy5fbWVzaEFubm90YXRpb25zID0gbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbkJvbmUoKTogR0xURk5vZGUge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbkJvbmU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lc2hBbm5vdGF0aW9ucygpOiBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NbXSB7XG4gICAgcmV0dXJuIHRoaXMuX21lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbldvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0YXJnZXQuY29weShWRUNUT1IzX0ZST05UKS5hcHBseVF1YXRlcm5pb24oZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSh0aGlzLl9maXJzdFBlcnNvbkJvbmUsIF9xdWF0KSk7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgRmlyc3RQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCBbW3NldHVwXV0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMgW1tERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVJdXSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEgW1tzZXR1cF1dIGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldCBmaXJzdFBlcnNvbk9ubHlMYXllcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBUaGlyZFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIFtbc2V0dXBdXSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyBbW0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUl1dIGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSBbW3NldHVwXV0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgcHVibGljIGdldEZpcnN0UGVyc29uQm9uZU9mZnNldCh0YXJnZXQ6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICByZXR1cm4gdGFyZ2V0LmNvcHkodGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcGVyc29uLlxuICAgKiBUaGUgcG9zaXRpb24gdGFrZXMgW1tGaXJzdFBlcnNvbkJvbmVdXSBhbmQgW1tGaXJzdFBlcnNvbk9mZnNldF1dIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogQHBhcmFtIHYzIHRhcmdldFxuICAgKiBAcmV0dXJucyBDdXJyZW50IHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwZXJzb25cbiAgICovXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbldvcmxkUG9zaXRpb24odjM6IFRIUkVFLlZlY3RvcjMpOiBUSFJFRS5WZWN0b3IzIHtcbiAgICAvLyBVbmlWUk0jVlJNRmlyc3RQZXJzb25FZGl0b3JcbiAgICAvLyB2YXIgd29ybGRPZmZzZXQgPSBoZWFkLmxvY2FsVG9Xb3JsZE1hdHJpeC5NdWx0aXBseVBvaW50KGNvbXBvbmVudC5GaXJzdFBlcnNvbk9mZnNldCk7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xuICAgIGNvbnN0IHY0ID0gbmV3IFRIUkVFLlZlY3RvcjQob2Zmc2V0LngsIG9mZnNldC55LCBvZmZzZXQueiwgMS4wKTtcbiAgICB2NC5hcHBseU1hdHJpeDQodGhpcy5fZmlyc3RQZXJzb25Cb25lLm1hdHJpeFdvcmxkKTtcbiAgICByZXR1cm4gdjMuc2V0KHY0LngsIHY0LnksIHY0LnopO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcykgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5fREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSLFxuICAgIHRoaXJkUGVyc29uT25seUxheWVyID0gVlJNRmlyc3RQZXJzb24uX0RFRkFVTFRfVEhJUkRQRVJTT05fT05MWV9MQVlFUixcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllciA9IGZpcnN0UGVyc29uT25seUxheWVyO1xuICAgIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyID0gdGhpcmRQZXJzb25Pbmx5TGF5ZXI7XG5cbiAgICB0aGlzLl9tZXNoQW5ub3RhdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuRmlyc3RQZXJzb25Pbmx5KSB7XG4gICAgICAgIGl0ZW0ubWVzaC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgaXRlbS5tZXNoLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLlRoaXJkUGVyc29uT25seSkge1xuICAgICAgICBpdGVtLm1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIGl0ZW0ubWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5BdXRvKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWwoaXRlbS5tZXNoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGlmIChid3MgIT0gbnVsbCAmJiBid3MubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgYSA9IHRyaWFuZ2xlc1tpXTtcbiAgICAgICAgY29uc3QgYiA9IHRyaWFuZ2xlc1tpICsgMV07XG4gICAgICAgIGNvbnN0IGMgPSB0cmlhbmdsZXNbaSArIDJdO1xuICAgICAgICBjb25zdCBidzAgPSBid3NbYV07XG4gICAgICAgIGNvbnN0IHNraW4wID0gc2tpbkluZGV4W2FdO1xuXG4gICAgICAgIGlmIChidzBbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbM10pKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBidzEgPSBid3NbYl07XG4gICAgICAgIGNvbnN0IHNraW4xID0gc2tpbkluZGV4W2JdO1xuICAgICAgICBpZiAoYncxWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncyID0gYndzW2NdO1xuICAgICAgICBjb25zdCBza2luMiA9IHNraW5JbmRleFtjXTtcbiAgICAgICAgaWYgKGJ3MlswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGE7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGI7XG4gICAgICAgIHRyaWFuZ2xlc1tjb3VudCsrXSA9IGM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG5cbiAgICBjb25zdCBza2luSW5kZXhBdHRyID0gZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdza2luSW5kZXgnKS5hcnJheTtcbiAgICBjb25zdCBza2luSW5kZXggPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5JbmRleEF0dHIubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIHNraW5JbmRleC5wdXNoKFtza2luSW5kZXhBdHRyW2ldLCBza2luSW5kZXhBdHRyW2kgKyAxXSwgc2tpbkluZGV4QXR0cltpICsgMl0sIHNraW5JbmRleEF0dHJbaSArIDNdXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2tpbldlaWdodEF0dHIgPSBnZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3NraW5XZWlnaHQnKS5hcnJheTtcbiAgICBjb25zdCBza2luV2VpZ2h0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luV2VpZ2h0QXR0ci5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgc2tpbldlaWdodC5wdXNoKFtza2luV2VpZ2h0QXR0cltpXSwgc2tpbldlaWdodEF0dHJbaSArIDFdLCBza2luV2VpZ2h0QXR0cltpICsgMl0sIHNraW5XZWlnaHRBdHRyW2kgKyAzXV0pO1xuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kZXgoKTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZ2VvbWV0cnkgZG9lc24ndCBoYXZlIGFuIGluZGV4IGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkVHJpYW5nbGVzID0gQXJyYXkuZnJvbShpbmRleC5hcnJheSk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2V4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gocGFyZW50OiBUSFJFRS5PYmplY3QzRCwgbWVzaDogVEhSRUUuU2tpbm5lZE1lc2gpOiB2b2lkIHtcbiAgICBjb25zdCBlcmFzZUJvbmVJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIG1lc2guc2tlbGV0b24uYm9uZXMuZm9yRWFjaCgoYm9uZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KGJvbmUpKSBlcmFzZUJvbmVJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLy8gVW5saWtlIFVuaVZSTSB3ZSBkb24ndCBjb3B5IG1lc2ggaWYgbm8gaW52aXNpYmxlIGJvbmUgd2FzIGZvdW5kXG4gICAgaWYgKCFlcmFzZUJvbmVJbmRleGVzLmxlbmd0aCkge1xuICAgICAgbWVzaC5sYXllcnMuZW5hYmxlKHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKTtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1lc2gubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgY29uc3QgbmV3TWVzaCA9IHRoaXMuX2NyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhlYWRsZXNzTW9kZWwobm9kZTogR0xURk5vZGUpOiB2b2lkIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAnR3JvdXAnKSB7XG4gICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2lzRXJhc2VUYXJnZXQobm9kZSkpIHtcbiAgICAgICAgbm9kZS50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgICAgICBwYXJlbnQubmFtZSA9IGBfaGVhZGxlc3NfJHtub2RlLm5hbWV9YDtcbiAgICAgICAgcGFyZW50LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnBhcmVudCEuYWRkKHBhcmVudCk7XG4gICAgICAgIG5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQudHlwZSA9PT0gJ1NraW5uZWRNZXNoJylcbiAgICAgICAgICAuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQsIGNoaWxkIGFzIFRIUkVFLlNraW5uZWRNZXNoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgdGhpcy5fY3JlYXRlSGVhZGxlc3NNb2RlbEZvclNraW5uZWRNZXNoKG5vZGUucGFyZW50ISwgbm9kZSBhcyBUSFJFRS5Ta2lubmVkTWVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNFcmFzZVRhcmdldChib25lOiBHTFRGTm9kZSk6IGJvb2xlYW4ge1xuICAgIGlmIChib25lLm5hbWUgPT09IHRoaXMuX2ZpcnN0UGVyc29uQm9uZS5uYW1lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFib25lLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5faXNFcmFzZVRhcmdldChib25lLnBhcmVudCEpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBHTFRGTWVzaCwgR0xURk5vZGUsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uLCBWUk1SZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MgfSBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUZpcnN0UGVyc29uXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNRmlyc3RQZXJzb25JbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUZpcnN0UGVyc29uXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBodW1hbm9pZCBBIFtbVlJNSHVtYW5vaWRdXSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGLCBodW1hbm9pZDogVlJNSHVtYW5vaWQpOiBQcm9taXNlPFZSTUZpcnN0UGVyc29uIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFGaXJzdFBlcnNvbjogVlJNU2NoZW1hLkZpcnN0UGVyc29uIHwgdW5kZWZpbmVkID0gdnJtRXh0LmZpcnN0UGVyc29uO1xuICAgIGlmICghc2NoZW1hRmlyc3RQZXJzb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGVyc29uQm9uZUluZGV4ID0gc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lO1xuXG4gICAgbGV0IGZpcnN0UGVyc29uQm9uZTogR0xURk5vZGUgfCBudWxsO1xuICAgIGlmIChmaXJzdFBlcnNvbkJvbmVJbmRleCA9PT0gdW5kZWZpbmVkIHx8IGZpcnN0UGVyc29uQm9uZUluZGV4ID09PSAtMSkge1xuICAgICAgZmlyc3RQZXJzb25Cb25lID0gaHVtYW5vaWQuZ2V0Qm9uZU5vZGUoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuSGVhZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0UGVyc29uQm9uZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBmaXJzdFBlcnNvbkJvbmVJbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKCFmaXJzdFBlcnNvbkJvbmUpIHtcbiAgICAgIGNvbnNvbGUud2FybignVlJNRmlyc3RQZXJzb25JbXBvcnRlcjogQ291bGQgbm90IGZpbmQgZmlyc3RQZXJzb25Cb25lIG9mIHRoZSBWUk0nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGVyc29uQm9uZU9mZnNldCA9IHNjaGVtYUZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldFxuICAgICAgPyBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueCxcbiAgICAgICAgICBzY2hlbWFGaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXQueSxcbiAgICAgICAgICAtc2NoZW1hRmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lT2Zmc2V0LnohLCAvLyBWUk0gMC4wIHVzZXMgbGVmdC1oYW5kZWQgeS11cFxuICAgICAgICApXG4gICAgICA6IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wNiwgMC4wKTsgLy8gZmFsbGJhY2ssIHRha2VuIGZyb20gVW5pVlJNIGltcGxlbWVudGF0aW9uXG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFZSTVJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gICAgY29uc3QgbWVzaGVzOiBHTFRGTWVzaFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdtZXNoJyk7XG4gICAgbWVzaGVzLmZvckVhY2goKG1lc2gsIG1lc2hJbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmxhZyA9IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IHNjaGVtYUZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhKSA9PiBhLm1lc2ggPT09IG1lc2hJbmRleClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaChuZXcgVlJNUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzKGZsYWc/LmZpcnN0UGVyc29uRmxhZywgbWVzaCkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBWUk1GaXJzdFBlcnNvbihmaXJzdFBlcnNvbkJvbmUsIGZpcnN0UGVyc29uQm9uZU9mZnNldCwgbWVzaEFubm90YXRpb25zKTtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1GaXJzdFBlcnNvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUZpcnN0UGVyc29uSW1wb3J0ZXInO1xuIiwiaW1wb3J0IHsgR0xURk5vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1IdW1hbkxpbWl0IH0gZnJvbSAnLi9WUk1IdW1hbkxpbWl0JztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgYSBzaW5nbGUgYGh1bWFuQm9uZWAgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbkJvbmUge1xuICAvKipcbiAgICogQSBbW0dMVEZOb2RlXV0gKHRoYXQgYWN0dWFsbHkgaXMgYSBgVEhSRUUuT2JqZWN0M0RgKSB0aGF0IHJlcHJlc2VudHMgdGhlIGJvbmUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbm9kZTogR0xURk5vZGU7XG5cbiAgLyoqXG4gICAqIEEgW1tWUk1IdW1hbkxpbWl0XV0gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBwcm9wZXJ0aWVzIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGh1bWFuTGltaXQ6IFZSTUh1bWFuTGltaXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1IdW1hbkJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlIEEgW1tHTFRGTm9kZV1dIHRoYXQgcmVwcmVzZW50cyB0aGUgbmV3IGJvbmVcbiAgICogQHBhcmFtIGh1bWFuTGltaXQgQSBbW1ZSTUh1bWFuTGltaXRdXSBvYmplY3QgdGhhdCByZXByZXNlbnRzIHByb3BlcnRpZXMgb2YgdGhlIG5ldyBib25lXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3Iobm9kZTogR0xURk5vZGUsIGh1bWFuTGltaXQ6IFZSTUh1bWFuTGltaXQpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgIHRoaXMuaHVtYW5MaW1pdCA9IGh1bWFuTGltaXQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMVEZOb2RlLCBSYXdWZWN0b3IzLCBSYXdWZWN0b3I0LCBWUk1Qb3NlLCBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmUgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZSc7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVBcnJheSB9IGZyb20gJy4vVlJNSHVtYW5Cb25lQXJyYXknO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vVlJNSHVtYW5Cb25lcyc7XG5pbXBvcnQgeyBWUk1IdW1hbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi9WUk1IdW1hbkRlc2NyaXB0aW9uJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgaHVtYW5vaWQgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbm9pZCB7XG4gIC8qKlxuICAgKiBBIFtbVlJNSHVtYW5Cb25lc11dIHRoYXQgY29udGFpbnMgYWxsIHRoZSBodW1hbiBib25lcyBvZiB0aGUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBnZXQgdGhlc2UgYm9uZXMgdXNpbmcgW1tWUk1IdW1hbm9pZC5nZXRCb25lXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5Cb25lczogVlJNSHVtYW5Cb25lcztcblxuICAvKipcbiAgICogQSBbW1ZSTUh1bWFuRGVzY3JpcHRpb25dXSB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgaHVtYW5vaWQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaHVtYW5EZXNjcmlwdGlvbjogVlJNSHVtYW5EZXNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQSBbW1ZSTVBvc2VdXSB0aGF0IGlzIGl0cyBkZWZhdWx0IHN0YXRlLlxuICAgKiBZb3UgbWlnaHQgdXNlIFtbVlJNSHVtYW5vaWQuc2V0UG9zZV1dIHdpdGggdGhpcyBwb3NlIHRvIHJlc2V0IGl0cyBzdGF0ZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSByZXN0UG9zZTogVlJNUG9zZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFtbVlJNSHVtYW5vaWRdXS5cbiAgICogQHBhcmFtIGJvbmVBcnJheSBBIFtbVlJNSHVtYW5Cb25lQXJyYXldXSBjb250YWlucyBhbGwgdGhlIGJvbmVzIG9mIHRoZSBuZXcgaHVtYW5vaWRcbiAgICogQHBhcmFtIGh1bWFuRGVzY3JpcHRpb24gQSBbW1ZSTUh1bWFuRGVzY3JpcHRpb25dXSB0aGF0IHJlcHJlc2VudHMgcHJvcGVydGllcyBvZiB0aGUgbmV3IGh1bWFub2lkXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoYm9uZUFycmF5OiBWUk1IdW1hbkJvbmVBcnJheSwgaHVtYW5EZXNjcmlwdGlvbjogVlJNSHVtYW5EZXNjcmlwdGlvbikge1xuICAgIHRoaXMuaHVtYW5Cb25lcyA9IHRoaXMuX2NyZWF0ZUh1bWFuQm9uZXMoYm9uZUFycmF5KTtcbiAgICB0aGlzLmh1bWFuRGVzY3JpcHRpb24gPSBodW1hbkRlc2NyaXB0aW9uO1xuXG4gICAgdGhpcy5yZXN0UG9zZSA9IHRoaXMuZ2V0UG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY3VycmVudCBwb3NlIG9mIHRoaXMgaHVtYW5vaWQgYXMgYSBbW1ZSTVBvc2VdXS5cbiAgICovXG4gIHB1YmxpYyBnZXRQb3NlKCk6IFZSTVBvc2Uge1xuICAgIGNvbnN0IHBvc2U6IFZSTVBvc2UgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLmZvckVhY2goKHZybUJvbmVOYW1lKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXRCb25lTm9kZSh2cm1Cb25lTmFtZSBhcyBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSkhO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSBvbiB0aGUgVlJNSHVtYW5vaWRcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gdGhlcmUgYXJlIHR3byBvciBtb3JlIGJvbmVzIGluIGEgc2FtZSBuYW1lLCB3ZSBhcmUgbm90IGdvaW5nIHRvIG92ZXJ3cml0ZSBleGlzdGluZyBvbmVcbiAgICAgIGlmIChwb3NlW3ZybUJvbmVOYW1lXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBvc2VbdnJtQm9uZU5hbWVdID0ge1xuICAgICAgICBwb3NpdGlvbjogbm9kZS5wb3NpdGlvbi50b0FycmF5KCkgYXMgUmF3VmVjdG9yMyxcbiAgICAgICAgcm90YXRpb246IG5vZGUucXVhdGVybmlvbi50b0FycmF5KCkgYXMgUmF3VmVjdG9yNCxcbiAgICAgIH07XG4gICAgfSwge30gYXMgVlJNUG9zZSk7XG4gICAgcmV0dXJuIHBvc2U7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBodW1hbm9pZCBkbyBhIHNwZWNpZmllZCBwb3NlLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBBIFtbVlJNUG9zZV1dIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBwb3NlXG4gICAqL1xuICBwdWJsaWMgc2V0UG9zZShwb3NlT2JqZWN0OiBWUk1Qb3NlKTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXMocG9zZU9iamVjdCkuZm9yRWFjaCgoYm9uZU5hbWUpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gcG9zZU9iamVjdFtib25lTmFtZV0hO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0Qm9uZU5vZGUoYm9uZU5hbWUgYXMgVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpO1xuXG4gICAgICAvLyBJZ25vcmUgd2hlbiB0aGVyZSBhcmUgbm8gYm9uZSB0aGF0IGlzIGRlZmluZWQgaW4gdGhlIHBvc2Ugb24gdGhlIFZSTUh1bWFub2lkXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlW2JvbmVOYW1lXTtcbiAgICAgIGlmICghcmVzdFN0YXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLnBvc2l0aW9uKSB7XG4gICAgICAgIC8vIOWFg+OBrueKtuaFi+OBq+aIu+OBl+OBpuOBi+OCieOAgeenu+WLleWIhuOCkui/veWKoFxuICAgICAgICBub2RlLnBvc2l0aW9uLnNldChcbiAgICAgICAgICByZXN0U3RhdGUucG9zaXRpb24hWzBdICsgc3RhdGUucG9zaXRpb25bMF0sXG4gICAgICAgICAgcmVzdFN0YXRlLnBvc2l0aW9uIVsxXSArIHN0YXRlLnBvc2l0aW9uWzFdLFxuICAgICAgICAgIHJlc3RTdGF0ZS5wb3NpdGlvbiFbMl0gKyBzdGF0ZS5wb3NpdGlvblsyXSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5yb3RhdGlvbikge1xuICAgICAgICBub2RlLnF1YXRlcm5pb24uZnJvbUFycmF5KHN0YXRlLnJvdGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGEgW1tWUk1IdW1hbkJvbmVdXS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZXNdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZShuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IFZSTUh1bWFuQm9uZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXSB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGJvbmVzIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGFuIGFycmF5IG9mIFtbVlJNSHVtYW5Cb25lXV0uXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZXMobmFtZTogVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpOiBWUk1IdW1hbkJvbmVbXSB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBib25lIGJvdW5kIHRvIGEgc3BlY2lmaWVkIFtbSHVtYW5Cb25lXV0sIGFzIGEgVEhSRUUuT2JqZWN0M0QuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBbW1ZSTUh1bWFub2lkLmdldEJvbmVOb2Rlc11dXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJvbmUgeW91IHdhbnRcbiAgICovXG4gIHB1YmxpYyBnZXRCb25lTm9kZShuYW1lOiBWUk1TY2hlbWEuSHVtYW5vaWRCb25lTmFtZSk6IEdMVEZOb2RlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXVswXT8ubm9kZSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBib25lcyBib3VuZCB0byBhIHNwZWNpZmllZCBbW0h1bWFuQm9uZV1dLCBhcyBhbiBhcnJheSBvZiBUSFJFRS5PYmplY3QzRC5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNSHVtYW5vaWQuZ2V0Qm9uZU5vZGVdXVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBib25lIHlvdSB3YW50XG4gICAqL1xuICBwdWJsaWMgZ2V0Qm9uZU5vZGVzKG5hbWU6IFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lKTogR0xURk5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuaHVtYW5Cb25lc1tuYW1lXS5tYXAoKGJvbmUpID0+IGJvbmUubm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSBhIFtbVlJNSHVtYW5Cb25lc11dIGZyb20gYSBbW1ZSTUh1bWFuQm9uZUFycmF5XV0uXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVIdW1hbkJvbmVzKGJvbmVBcnJheTogVlJNSHVtYW5Cb25lQXJyYXkpOiBWUk1IdW1hbkJvbmVzIHtcbiAgICBjb25zdCBib25lczogVlJNSHVtYW5Cb25lcyA9IE9iamVjdC52YWx1ZXMoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUpLnJlZHVjZSgoYWNjdW0sIG5hbWUpID0+IHtcbiAgICAgIGFjY3VtW25hbWVdID0gW107XG4gICAgICByZXR1cm4gYWNjdW07XG4gICAgfSwge30gYXMgUGFydGlhbDxWUk1IdW1hbkJvbmVzPikgYXMgVlJNSHVtYW5Cb25lcztcblxuICAgIGJvbmVBcnJheS5mb3JFYWNoKChib25lKSA9PiB7XG4gICAgICBib25lc1tib25lLm5hbWVdLnB1c2goYm9uZS5ib25lKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBib25lcztcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lIH0gZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lQXJyYXkgfSBmcm9tICcuL1ZSTUh1bWFuQm9uZUFycmF5JztcbmltcG9ydCB7IFZSTUh1bWFuRGVzY3JpcHRpb24gfSBmcm9tICcuL1ZSTUh1bWFuRGVzY3JpcHRpb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5vaWQgfSBmcm9tICcuL1ZSTUh1bWFub2lkJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSBbW1ZSTUh1bWFub2lkXV0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNSHVtYW5vaWRJbXBvcnRlciB7XG4gIC8qKlxuICAgKiBJbXBvcnQgYSBbW1ZSTUh1bWFub2lkXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTUh1bWFub2lkIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFIdW1hbm9pZDogVlJNU2NoZW1hLkh1bWFub2lkIHwgdW5kZWZpbmVkID0gdnJtRXh0Lmh1bWFub2lkO1xuICAgIGlmICghc2NoZW1hSHVtYW5vaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGh1bWFuQm9uZUFycmF5OiBWUk1IdW1hbkJvbmVBcnJheSA9IFtdO1xuICAgIGlmIChzY2hlbWFIdW1hbm9pZC5odW1hbkJvbmVzKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgc2NoZW1hSHVtYW5vaWQuaHVtYW5Cb25lcy5tYXAoYXN5bmMgKGJvbmUpID0+IHtcbiAgICAgICAgICBpZiAoIWJvbmUuYm9uZSB8fCAhYm9uZS5ub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBib25lLm5vZGUpO1xuICAgICAgICAgIGh1bWFuQm9uZUFycmF5LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogYm9uZS5ib25lLFxuICAgICAgICAgICAgYm9uZTogbmV3IFZSTUh1bWFuQm9uZShub2RlLCB7XG4gICAgICAgICAgICAgIGF4aXNMZW5ndGg6IGJvbmUuYXhpc0xlbmd0aCxcbiAgICAgICAgICAgICAgY2VudGVyOiBib25lLmNlbnRlciAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLmNlbnRlci54LCBib25lLmNlbnRlci55LCBib25lLmNlbnRlci56KSxcbiAgICAgICAgICAgICAgbWF4OiBib25lLm1heCAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLm1heC54LCBib25lLm1heC55LCBib25lLm1heC56KSxcbiAgICAgICAgICAgICAgbWluOiBib25lLm1pbiAmJiBuZXcgVEhSRUUuVmVjdG9yMyhib25lLm1pbi54LCBib25lLm1pbi55LCBib25lLm1pbi56KSxcbiAgICAgICAgICAgICAgdXNlRGVmYXVsdFZhbHVlczogYm9uZS51c2VEZWZhdWx0VmFsdWVzLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBodW1hbkRlc2NyaXB0aW9uOiBWUk1IdW1hbkRlc2NyaXB0aW9uID0ge1xuICAgICAgYXJtU3RyZXRjaDogc2NoZW1hSHVtYW5vaWQuYXJtU3RyZXRjaCxcbiAgICAgIGxlZ1N0cmV0Y2g6IHNjaGVtYUh1bWFub2lkLmxlZ1N0cmV0Y2gsXG4gICAgICB1cHBlckFybVR3aXN0OiBzY2hlbWFIdW1hbm9pZC51cHBlckFybVR3aXN0LFxuICAgICAgbG93ZXJBcm1Ud2lzdDogc2NoZW1hSHVtYW5vaWQubG93ZXJBcm1Ud2lzdCxcbiAgICAgIHVwcGVyTGVnVHdpc3Q6IHNjaGVtYUh1bWFub2lkLnVwcGVyTGVnVHdpc3QsXG4gICAgICBsb3dlckxlZ1R3aXN0OiBzY2hlbWFIdW1hbm9pZC5sb3dlckxlZ1R3aXN0LFxuICAgICAgZmVldFNwYWNpbmc6IHNjaGVtYUh1bWFub2lkLmZlZXRTcGFjaW5nLFxuICAgICAgaGFzVHJhbnNsYXRpb25Eb0Y6IHNjaGVtYUh1bWFub2lkLmhhc1RyYW5zbGF0aW9uRG9GLFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFZSTUh1bWFub2lkKGh1bWFuQm9uZUFycmF5LCBodW1hbkRlc2NyaXB0aW9uKTtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1IdW1hbkJvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNSHVtYW5EZXNjcmlwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUh1bWFuTGltaXQnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1IdW1hbm9pZCc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUh1bWFub2lkSW1wb3J0ZXInO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk0nO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1JbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVV0aWxzJztcbmV4cG9ydCAqIGZyb20gJy4vYmxlbmRzaGFwZSc7XG5leHBvcnQgKiBmcm9tICcuL2RlYnVnJztcbmV4cG9ydCAqIGZyb20gJy4vZmlyc3RwZXJzb24nO1xuZXhwb3J0ICogZnJvbSAnLi9odW1hbm9pZCc7XG5leHBvcnQgKiBmcm9tICcuL2xvb2thdCc7XG5leHBvcnQgKiBmcm9tICcuL3NwcmluZ2JvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL21hdGVyaWFsJztcbmV4cG9ydCAqIGZyb20gJy4vbWV0YSc7XG4iLCIvKipcbiAqIEV2YWx1YXRlIGEgaGVybWl0ZSBzcGxpbmUuXG4gKlxuICogQHBhcmFtIHkwIHkgb24gc3RhcnRcbiAqIEBwYXJhbSB5MSB5IG9uIGVuZFxuICogQHBhcmFtIHQwIGRlbHRhIHkgb24gc3RhcnRcbiAqIEBwYXJhbSB0MSBkZWx0YSB5IG9uIGVuZFxuICogQHBhcmFtIHggaW5wdXQgdmFsdWVcbiAqL1xuY29uc3QgaGVybWl0ZVNwbGluZSA9ICh5MDogbnVtYmVyLCB5MTogbnVtYmVyLCB0MDogbnVtYmVyLCB0MTogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCB4YyA9IHggKiB4ICogeDtcbiAgY29uc3QgeHMgPSB4ICogeDtcbiAgY29uc3QgZHkgPSB5MSAtIHkwO1xuICBjb25zdCBoMDEgPSAtMi4wICogeGMgKyAzLjAgKiB4cztcbiAgY29uc3QgaDEwID0geGMgLSAyLjAgKiB4cyArIHg7XG4gIGNvbnN0IGgxMSA9IHhjIC0geHM7XG4gIHJldHVybiB5MCArIGR5ICogaDAxICsgdDAgKiBoMTAgKyB0MSAqIGgxMTtcbn07XG5cbi8qKlxuICogRXZhbHVhdGUgYW4gQW5pbWF0aW9uQ3VydmUgYXJyYXkuIFNlZSBBbmltYXRpb25DdXJ2ZSBjbGFzcyBvZiBVbml0eSBmb3IgaXRzIGRldGFpbHMuXG4gKlxuICogU2VlOiBodHRwczovL2RvY3MudW5pdHkzZC5jb20vamEvY3VycmVudC9TY3JpcHRSZWZlcmVuY2UvQW5pbWF0aW9uQ3VydmUuaHRtbFxuICpcbiAqIEBwYXJhbSBhcnIgQW4gYXJyYXkgcmVwcmVzZW50cyBhIGN1cnZlXG4gKiBAcGFyYW0geCBBbiBpbnB1dCB2YWx1ZVxuICovXG5jb25zdCBldmFsdWF0ZUN1cnZlID0gKGFycjogbnVtYmVyW10sIHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIC8vIC0tIHNhbml0eSBjaGVjayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBpZiAoYXJyLmxlbmd0aCA8IDgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2YWx1YXRlQ3VydmU6IEludmFsaWQgY3VydmUgZGV0ZWN0ZWQhIChBcnJheSBsZW5ndGggbXVzdCBiZSA4IGF0IGxlYXN0KScpO1xuICB9XG4gIGlmIChhcnIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXZhbHVhdGVDdXJ2ZTogSW52YWxpZCBjdXJ2ZSBkZXRlY3RlZCEgKEFycmF5IGxlbmd0aCBtdXN0IGJlIG11bHRpcGxlcyBvZiA0Jyk7XG4gIH1cblxuICAvLyAtLSBjaGVjayByYW5nZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgbGV0IG91dE5vZGU7XG4gIGZvciAob3V0Tm9kZSA9IDA7IDsgb3V0Tm9kZSsrKSB7XG4gICAgaWYgKGFyci5sZW5ndGggPD0gNCAqIG91dE5vZGUpIHtcbiAgICAgIHJldHVybiBhcnJbNCAqIG91dE5vZGUgLSAzXTsgLy8gdG9vIGZ1cnRoZXIhISBhc3N1bWUgYXMgXCJDbGFtcFwiXG4gICAgfSBlbHNlIGlmICh4IDw9IGFycls0ICogb3V0Tm9kZV0pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGluTm9kZSA9IG91dE5vZGUgLSAxO1xuICBpZiAoaW5Ob2RlIDwgMCkge1xuICAgIHJldHVybiBhcnJbNCAqIGluTm9kZSArIDVdOyAvLyB0b28gYmVoaW5kISEgYXNzdW1lIGFzIFwiQ2xhbXBcIlxuICB9XG5cbiAgLy8gLS0gY2FsY3VsYXRlIGxvY2FsIHggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHgwID0gYXJyWzQgKiBpbk5vZGVdO1xuICBjb25zdCB4MSA9IGFycls0ICogb3V0Tm9kZV07XG4gIGNvbnN0IHhIZXJtaXRlID0gKHggLSB4MCkgLyAoeDEgLSB4MCk7XG5cbiAgLy8gLS0gZmluYWxseSBkbyB0aGUgaGVybWl0ZSBzcGxpbmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHkwID0gYXJyWzQgKiBpbk5vZGUgKyAxXTtcbiAgY29uc3QgeTEgPSBhcnJbNCAqIG91dE5vZGUgKyAxXTtcbiAgY29uc3QgdDAgPSBhcnJbNCAqIGluTm9kZSArIDNdO1xuICBjb25zdCB0MSA9IGFycls0ICogb3V0Tm9kZSArIDJdO1xuICByZXR1cm4gaGVybWl0ZVNwbGluZSh5MCwgeTEsIHQwLCB0MSwgeEhlcm1pdGUpO1xufTtcblxuLyoqXG4gKiBUaGlzIGlzIGFuIGVxdWl2YWxlbnQgb2YgQ3VydmVNYXBwZXIgY2xhc3MgZGVmaW5lZCBpbiBVbmlWUk0uXG4gKiBXaWxsIGJlIHVzZWQgZm9yIFtbVlJNTG9va0F0QXBwbHllcl1dcywgdG8gZGVmaW5lIGJlaGF2aW9yIG9mIExvb2tBdC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9Mb29rQXQvQ3VydmVNYXBwZXIuY3NcbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUN1cnZlTWFwcGVyIHtcbiAgLyoqXG4gICAqIEFuIGFycmF5IHJlcHJlc2VudHMgdGhlIGN1cnZlLiBTZWUgQW5pbWF0aW9uQ3VydmUgY2xhc3Mgb2YgVW5pdHkgZm9yIGl0cyBkZXRhaWxzLlxuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vZG9jcy51bml0eTNkLmNvbS9qYS9jdXJyZW50L1NjcmlwdFJlZmVyZW5jZS9BbmltYXRpb25DdXJ2ZS5odG1sXG4gICAqL1xuICBwdWJsaWMgY3VydmU6IG51bWJlcltdID0gWzAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wXTtcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gaW5wdXQgcmFuZ2Ugb2YgdGhlIFtbVlJNQ3VydmVNYXBwZXJdXS5cbiAgICovXG4gIHB1YmxpYyBjdXJ2ZVhSYW5nZURlZ3JlZSA9IDkwLjA7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIG91dHB1dCB2YWx1ZSBvZiB0aGUgW1tWUk1DdXJ2ZU1hcHBlcl1dLlxuICAgKi9cbiAgcHVibGljIGN1cnZlWVJhbmdlRGVncmVlID0gMTAuMDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFtbVlJNQ3VydmVNYXBwZXJdXS5cbiAgICpcbiAgICogQHBhcmFtIHhSYW5nZSBUaGUgbWF4aW11bSBpbnB1dCByYW5nZVxuICAgKiBAcGFyYW0geVJhbmdlIFRoZSBtYXhpbXVtIG91dHB1dCB2YWx1ZVxuICAgKiBAcGFyYW0gY3VydmUgQW4gYXJyYXkgcmVwcmVzZW50cyB0aGUgY3VydmVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHhSYW5nZT86IG51bWJlciwgeVJhbmdlPzogbnVtYmVyLCBjdXJ2ZT86IG51bWJlcltdKSB7XG4gICAgaWYgKHhSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmN1cnZlWFJhbmdlRGVncmVlID0geFJhbmdlO1xuICAgIH1cblxuICAgIGlmICh5UmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZVlSYW5nZURlZ3JlZSA9IHlSYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZSA9IGN1cnZlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZSBhbiBpbnB1dCB2YWx1ZSBhbmQgb3V0cHV0IGEgbWFwcGVkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0gc3JjIFRoZSBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIG1hcChzcmM6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgY2xhbXBlZFNyYyA9IE1hdGgubWluKE1hdGgubWF4KHNyYywgMC4wKSwgdGhpcy5jdXJ2ZVhSYW5nZURlZ3JlZSk7XG4gICAgY29uc3QgeCA9IGNsYW1wZWRTcmMgLyB0aGlzLmN1cnZlWFJhbmdlRGVncmVlO1xuICAgIHJldHVybiB0aGlzLmN1cnZlWVJhbmdlRGVncmVlICogZXZhbHVhdGVDdXJ2ZSh0aGlzLmN1cnZlLCB4KTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCBieSBbW1ZSTUxvb2tBdEhlYWRdXSwgYXBwbGllcyBsb29rIGF0IGRpcmVjdGlvbi5cbiAqIFRoZXJlIGFyZSBjdXJyZW50bHkgdHdvIHZhcmlhbnQgb2YgYXBwbGllcjogW1tWUk1Mb29rQXRCb25lQXBwbHllcl1dIGFuZCBbW1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyXV0uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgLyoqXG4gICAqIEl0IHJlcHJlc2VudHMgaXRzIHR5cGUgb2YgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCByZWFkb25seSB0eXBlOiBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZTtcblxuICAvKipcbiAgICogQXBwbHkgbG9vayBhdCBkaXJlY3Rpb24gdG8gaXRzIGFzc29jaWF0ZWQgVlJNIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZXVsZXIgYFRIUkVFLkV1bGVyYCBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBsb29rIGF0IGRpcmVjdGlvblxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1TY2hlbWEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBWUk1DdXJ2ZU1hcHBlciB9IGZyb20gJy4vVlJNQ3VydmVNYXBwZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGJ5IFtbVlJNTG9va0F0SGVhZF1dLCBhcHBsaWVzIGxvb2sgYXQgZGlyZWN0aW9uIHRvIGV5ZSBibGVuZCBzaGFwZXMgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllciBleHRlbmRzIFZSTUxvb2tBdEFwcGx5ZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJsZW5kU2hhcGU7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVIb3Jpem9udGFsOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbERvd246IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBibGVuZFNoYXBlUHJveHkgQSBbW1ZSTUJsZW5kU2hhcGVQcm94eV1dIHVzZWQgYnkgdGhpcyBhcHBsaWVyXG4gICAqIEBwYXJhbSBjdXJ2ZUhvcml6b250YWwgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgdHJhbnN2ZXJzZSBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxEb3duIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIGRvd24gZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZVZlcnRpY2FsVXAgQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgdXAgZGlyZWN0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBibGVuZFNoYXBlUHJveHk6IFZSTUJsZW5kU2hhcGVQcm94eSxcbiAgICBjdXJ2ZUhvcml6b250YWw6IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyLFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY3VydmVIb3Jpem9udGFsID0gY3VydmVIb3Jpem9udGFsO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxEb3duID0gY3VydmVWZXJ0aWNhbERvd247XG4gICAgdGhpcy5fY3VydmVWZXJ0aWNhbFVwID0gY3VydmVWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5ID0gYmxlbmRTaGFwZVByb3h5O1xuICB9XG5cbiAgcHVibGljIG5hbWUoKTogVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUge1xuICAgIHJldHVybiBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlO1xuICB9XG5cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzcmNYID0gZXVsZXIueDtcbiAgICBjb25zdCBzcmNZID0gZXVsZXIueTtcblxuICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2t1cCwgMC4wKTtcbiAgICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZShWUk1TY2hlbWEuQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2Rvd24sIHRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tkb3duLCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rdXAsIHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCkpO1xuICAgIH1cblxuICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tsZWZ0LCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rcmlnaHQsIHRoaXMuX2N1cnZlSG9yaXpvbnRhbC5tYXAoLXNyY1kpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKFZSTVNjaGVtYS5CbGVuZFNoYXBlUHJlc2V0TmFtZS5Mb29rcmlnaHQsIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoVlJNU2NoZW1hLkJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tsZWZ0LCB0aGlzLl9jdXJ2ZUhvcml6b250YWwubWFwKHNyY1kpKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgR0xURk5vZGUsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTUN1cnZlTWFwcGVyIH0gZnJvbSAnLi9WUk1DdXJ2ZU1hcHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuL1ZSTUxvb2tBdEhlYWQnO1xuXG5jb25zdCBfZXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoMC4wLCAwLjAsIDAuMCwgVlJNTG9va0F0SGVhZC5FVUxFUl9PUkRFUik7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIGJ5IFtbVlJNTG9va0F0SGVhZF1dLCBhcHBsaWVzIGxvb2sgYXQgZGlyZWN0aW9uIHRvIGV5ZSBib25lcyBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJvbmVBcHBseWVyIGV4dGVuZHMgVlJNTG9va0F0QXBwbHllciB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVlJNU2NoZW1hLkZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUuQm9uZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZUhvcml6b250YWxJbm5lcjogVlJNQ3VydmVNYXBwZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2N1cnZlSG9yaXpvbnRhbE91dGVyOiBWUk1DdXJ2ZU1hcHBlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3VydmVWZXJ0aWNhbERvd246IFZSTUN1cnZlTWFwcGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IF9jdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRFeWU6IEdMVEZOb2RlIHwgbnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcmlnaHRFeWU6IEdMVEZOb2RlIHwgbnVsbDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUxvb2tBdEJvbmVBcHBseWVyLlxuICAgKlxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSBbW1ZSTUh1bWFub2lkXV0gdXNlZCBieSB0aGlzIGFwcGxpZXJcbiAgICogQHBhcmFtIGN1cnZlSG9yaXpvbnRhbElubmVyIEEgW1tWUk1DdXJ2ZU1hcHBlcl1dIHVzZWQgZm9yIGlubmVyIHRyYW5zdmVyc2UgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJ2ZUhvcml6b250YWxPdXRlciBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciBvdXRlciB0cmFuc3ZlcnNlIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gY3VydmVWZXJ0aWNhbERvd24gQSBbW1ZSTUN1cnZlTWFwcGVyXV0gdXNlZCBmb3IgZG93biBkaXJlY3Rpb25cbiAgICogQHBhcmFtIGN1cnZlVmVydGljYWxVcCBBIFtbVlJNQ3VydmVNYXBwZXJdXSB1c2VkIGZvciB1cCBkaXJlY3Rpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGh1bWFub2lkOiBWUk1IdW1hbm9pZCxcbiAgICBjdXJ2ZUhvcml6b250YWxJbm5lcjogVlJNQ3VydmVNYXBwZXIsXG4gICAgY3VydmVIb3Jpem9udGFsT3V0ZXI6IFZSTUN1cnZlTWFwcGVyLFxuICAgIGN1cnZlVmVydGljYWxEb3duOiBWUk1DdXJ2ZU1hcHBlcixcbiAgICBjdXJ2ZVZlcnRpY2FsVXA6IFZSTUN1cnZlTWFwcGVyLFxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fY3VydmVIb3Jpem9udGFsSW5uZXIgPSBjdXJ2ZUhvcml6b250YWxJbm5lcjtcbiAgICB0aGlzLl9jdXJ2ZUhvcml6b250YWxPdXRlciA9IGN1cnZlSG9yaXpvbnRhbE91dGVyO1xuICAgIHRoaXMuX2N1cnZlVmVydGljYWxEb3duID0gY3VydmVWZXJ0aWNhbERvd247XG4gICAgdGhpcy5fY3VydmVWZXJ0aWNhbFVwID0gY3VydmVWZXJ0aWNhbFVwO1xuXG4gICAgdGhpcy5fbGVmdEV5ZSA9IGh1bWFub2lkLmdldEJvbmVOb2RlKFZSTVNjaGVtYS5IdW1hbm9pZEJvbmVOYW1lLkxlZnRFeWUpO1xuICAgIHRoaXMuX3JpZ2h0RXllID0gaHVtYW5vaWQuZ2V0Qm9uZU5vZGUoVlJNU2NoZW1hLkh1bWFub2lkQm9uZU5hbWUuUmlnaHRFeWUpO1xuICB9XG5cbiAgcHVibGljIGxvb2tBdChldWxlcjogVEhSRUUuRXVsZXIpOiB2b2lkIHtcbiAgICBjb25zdCBzcmNYID0gZXVsZXIueDtcbiAgICBjb25zdCBzcmNZID0gZXVsZXIueTtcblxuICAgIC8vIGxlZnRcbiAgICBpZiAodGhpcy5fbGVmdEV5ZSkge1xuICAgICAgaWYgKHNyY1ggPCAwLjApIHtcbiAgICAgICAgX2V1bGVyLnggPSAtdGhpcy5fY3VydmVWZXJ0aWNhbERvd24ubWFwKC1zcmNYKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlci54ID0gdGhpcy5fY3VydmVWZXJ0aWNhbFVwLm1hcChzcmNYKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNyY1kgPCAwLjApIHtcbiAgICAgICAgX2V1bGVyLnkgPSAtdGhpcy5fY3VydmVIb3Jpem9udGFsSW5uZXIubWFwKC1zcmNZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9ldWxlci55ID0gdGhpcy5fY3VydmVIb3Jpem9udGFsT3V0ZXIubWFwKHNyY1kpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9sZWZ0RXllLnF1YXRlcm5pb24uc2V0RnJvbUV1bGVyKF9ldWxlcik7XG4gICAgfVxuXG4gICAgLy8gcmlnaHRcbiAgICBpZiAodGhpcy5fcmlnaHRFeWUpIHtcbiAgICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci54ID0gLXRoaXMuX2N1cnZlVmVydGljYWxEb3duLm1hcCgtc3JjWCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueCA9IHRoaXMuX2N1cnZlVmVydGljYWxVcC5tYXAoc3JjWCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICAgIF9ldWxlci55ID0gLXRoaXMuX2N1cnZlSG9yaXpvbnRhbE91dGVyLm1hcCgtc3JjWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfZXVsZXIueSA9IHRoaXMuX2N1cnZlSG9yaXpvbnRhbElubmVyLm1hcChzcmNZKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmlnaHRFeWUucXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoX2V1bGVyKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi4vZmlyc3RwZXJzb24vVlJNRmlyc3RQZXJzb24nO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgVlJNTG9va0F0QXBwbHllciB9IGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG5cbmNvbnN0IFZFQ1RPUjNfRlJPTlQgPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMC4wLCAtMS4wKSk7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0ID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgbG9vayBhdCBvZiBhIFZSTS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlYWQge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVVTEVSX09SREVSID0gJ1lYWic7IC8vIHlhdy1waXRjaC1yb2xsXG5cbiAgLyoqXG4gICAqIEFzc29jaWF0ZWQgW1tWUk1GaXJzdFBlcnNvbl1dLCB3aWxsIGJlIHVzZWQgZm9yIGRpcmVjdGlvbiBjYWxjdWxhdGlvbi5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb247XG5cbiAgLyoqXG4gICAqIEFzc29jaWF0ZWQgW1tWUk1Mb29rQXRBcHBseWVyXV0sIGl0cyBsb29rIGF0IGRpcmVjdGlvbiB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIG1vZGVsIHVzaW5nIHRoaXMgYXBwbGllci5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBhcHBseWVyPzogVlJNTG9va0F0QXBwbHllcjtcblxuICAvKipcbiAgICogSWYgdGhpcyBpcyB0cnVlLCBpdHMgbG9vayBhdCBkaXJlY3Rpb24gd2lsbCBiZSB1cGRhdGVkIGF1dG9tYXRpY2FsbHkgYnkgY2FsbGluZyBbW1ZSTUxvb2tBdEhlYWQudXBkYXRlXV0gKHdoaWNoIGlzIGNhbGxlZCBmcm9tIFtbVlJNLnVwZGF0ZV1dKS5cbiAgICpcbiAgICogU2VlIGFsc286IFtbVlJNTG9va0F0SGVhZC50YXJnZXRdXVxuICAgKi9cbiAgcHVibGljIGF1dG9VcGRhdGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IG9iamVjdCBvZiB0aGUgbG9vayBhdC5cbiAgICogTm90ZSB0aGF0IGl0IGRvZXMgbm90IG1ha2UgYW55IHNlbnNlIGlmIFtbVlJNTG9va0F0SGVhZC5hdXRvVXBkYXRlXV0gaXMgZGlzYWJsZWQuXG4gICAqL1xuICBwdWJsaWMgdGFyZ2V0PzogVEhSRUUuT2JqZWN0M0Q7XG5cbiAgcHJvdGVjdGVkIF9ldWxlcjogVEhSRUUuRXVsZXIgPSBuZXcgVEhSRUUuRXVsZXIoMC4wLCAwLjAsIDAuMCwgVlJNTG9va0F0SGVhZC5FVUxFUl9PUkRFUik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1Mb29rQXRIZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb24gQSBbW1ZSTUZpcnN0UGVyc29uXV0gdGhhdCB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5ldyBWUk1Mb29rQXRIZWFkXG4gICAqIEBwYXJhbSBhcHBseWVyIEEgW1tWUk1Mb29rQXRBcHBseWVyXV0gdGhhdCB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5ldyBWUk1Mb29rQXRIZWFkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb24sIGFwcGx5ZXI/OiBWUk1Mb29rQXRBcHBseWVyKSB7XG4gICAgdGhpcy5maXJzdFBlcnNvbiA9IGZpcnN0UGVyc29uO1xuICAgIHRoaXMuYXBwbHllciA9IGFwcGx5ZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGl0cyBsb29rIGF0IGRpcmVjdGlvbiBpbiB3b3JsZCBjb29yZGluYXRlLlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGBUSFJFRS5WZWN0b3IzYFxuICAgKi9cbiAgcHVibGljIGdldExvb2tBdFdvcmxkRGlyZWN0aW9uKHRhcmdldDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIGNvbnN0IHJvdCA9IGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5maXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmUsIF9xdWF0KTtcbiAgICByZXR1cm4gdGFyZ2V0XG4gICAgICAuY29weShWRUNUT1IzX0ZST05UKVxuICAgICAgLmFwcGx5RXVsZXIodGhpcy5fZXVsZXIpXG4gICAgICAuYXBwbHlRdWF0ZXJuaW9uKHJvdCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGl0cyBsb29rIGF0IHBvc2l0aW9uLlxuICAgKiBOb3RlIHRoYXQgaXRzIHJlc3VsdCB3aWxsIGJlIGluc3RhbnRseSBvdmVyd3JpdHRlbiBpZiBbW1ZSTUxvb2tBdEhlYWQuYXV0b1VwZGF0ZV1dIGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBBIHRhcmdldCBwb3NpdGlvblxuICAgKi9cbiAgcHVibGljIGxvb2tBdChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IHZvaWQge1xuICAgIHRoaXMuX2NhbGNFdWxlcih0aGlzLl9ldWxlciwgcG9zaXRpb24pO1xuXG4gICAgaWYgKHRoaXMuYXBwbHllcikge1xuICAgICAgdGhpcy5hcHBseWVyLmxvb2tBdCh0aGlzLl9ldWxlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgVlJNTG9va0F0SGVhZC5cbiAgICogSWYgW1tWUk1Mb29rQXRIZWFkLmF1dG9VcGRhdGVdXSBpcyBkaXNhYmxlZCwgaXQgd2lsbCBkbyBub3RoaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy5hdXRvVXBkYXRlKSB7XG4gICAgICB0aGlzLmxvb2tBdCh0aGlzLnRhcmdldC5nZXRXb3JsZFBvc2l0aW9uKF92M0EpKTtcblxuICAgICAgaWYgKHRoaXMuYXBwbHllcikge1xuICAgICAgICB0aGlzLmFwcGx5ZXIubG9va0F0KHRoaXMuX2V1bGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NhbGNFdWxlcih0YXJnZXQ6IFRIUkVFLkV1bGVyLCBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLkV1bGVyIHtcbiAgICBjb25zdCBoZWFkUG9zaXRpb24gPSB0aGlzLmZpcnN0UGVyc29uLmdldEZpcnN0UGVyc29uV29ybGRQb3NpdGlvbihfdjNCKTtcblxuICAgIC8vIExvb2sgYXQgZGlyZWN0aW9uIGluIHdvcmxkIGNvb3JkaW5hdGVcbiAgICBjb25zdCBsb29rQXREaXIgPSBfdjNDXG4gICAgICAuY29weShwb3NpdGlvbilcbiAgICAgIC5zdWIoaGVhZFBvc2l0aW9uKVxuICAgICAgLm5vcm1hbGl6ZSgpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHRoZSBkaXJlY3Rpb24gaW50byBsb2NhbCBjb29yZGluYXRlIGZyb20gdGhlIGZpcnN0IHBlcnNvbiBib25lXG4gICAgbG9va0F0RGlyLmFwcGx5UXVhdGVybmlvbihnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lLCBfcXVhdCkuaW52ZXJzZSgpKTtcblxuICAgIC8vIGNvbnZlcnQgdGhlIGRpcmVjdGlvbiBpbnRvIGV1bGVyXG4gICAgdGFyZ2V0LnggPSBNYXRoLmF0YW4yKGxvb2tBdERpci55LCBNYXRoLnNxcnQobG9va0F0RGlyLnggKiBsb29rQXREaXIueCArIGxvb2tBdERpci56ICogbG9va0F0RGlyLnopKTtcbiAgICB0YXJnZXQueSA9IE1hdGguYXRhbjIoLWxvb2tBdERpci54LCAtbG9va0F0RGlyLnopO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNQmxlbmRTaGFwZVByb3h5IH0gZnJvbSAnLi4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4uL2ZpcnN0cGVyc29uJztcbmltcG9ydCB7IFZSTUh1bWFub2lkIH0gZnJvbSAnLi4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVlJNQ3VydmVNYXBwZXIgfSBmcm9tICcuL1ZSTUN1cnZlTWFwcGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuaW1wb3J0IHsgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEJvbmVBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi9WUk1Mb29rQXRIZWFkJztcblxuLy8gVEhSRUUuTWF0aCBoYXMgYmVlbiByZW5hbWVkIHRvIFRIUkVFLk1hdGhVdGlscyBzaW5jZSByMTEzLlxuLy8gV2UgYXJlIGdvaW5nIHRvIGRlZmluZSB0aGUgREVHMlJBRCBieSBvdXJzZWx2ZXMgZm9yIGEgd2hpbGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvcHVsbC8xODI3MFxuY29uc3QgREVHMlJBRCA9IE1hdGguUEkgLyAxODA7IC8vIFRIUkVFLk1hdGhVdGlscy5ERUcyUkFEO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNTG9va0F0SGVhZF1dIGZyb20gYSBWUk0gZXh0ZW5zaW9uIG9mIGEgR0xURi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEltcG9ydGVyIHtcbiAgLyoqXG4gICAqIEltcG9ydCBhIFtbVlJNTG9va0F0SGVhZF1dIGZyb20gYSBWUk0uXG4gICAqXG4gICAqIEBwYXJhbSBnbHRmIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlclxuICAgKiBAcGFyYW0gYmxlbmRTaGFwZVByb3h5IEEgW1tWUk1CbGVuZFNoYXBlUHJveHldXSBpbnN0YW5jZSB0aGF0IHJlcHJlc2VudHMgdGhlIFZSTVxuICAgKiBAcGFyYW0gaHVtYW5vaWQgQSBbW1ZSTUh1bWFub2lkXV0gaW5zdGFuY2UgdGhhdCByZXByZXNlbnRzIHRoZSBWUk1cbiAgICovXG4gIHB1YmxpYyBpbXBvcnQoXG4gICAgZ2x0ZjogR0xURixcbiAgICBmaXJzdFBlcnNvbjogVlJNRmlyc3RQZXJzb24sXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICApOiBWUk1Mb29rQXRIZWFkIHwgbnVsbCB7XG4gICAgY29uc3QgdnJtRXh0OiBWUk1TY2hlbWEuVlJNIHwgdW5kZWZpbmVkID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zPy5WUk07XG4gICAgaWYgKCF2cm1FeHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUZpcnN0UGVyc29uOiBWUk1TY2hlbWEuRmlyc3RQZXJzb24gfCB1bmRlZmluZWQgPSB2cm1FeHQuZmlyc3RQZXJzb247XG4gICAgaWYgKCFzY2hlbWFGaXJzdFBlcnNvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgYXBwbHllciA9IHRoaXMuX2ltcG9ydEFwcGx5ZXIoc2NoZW1hRmlyc3RQZXJzb24sIGJsZW5kU2hhcGVQcm94eSwgaHVtYW5vaWQpO1xuICAgIHJldHVybiBuZXcgVlJNTG9va0F0SGVhZChmaXJzdFBlcnNvbiwgYXBwbHllciB8fCB1bmRlZmluZWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pbXBvcnRBcHBseWVyKFxuICAgIHNjaGVtYUZpcnN0UGVyc29uOiBWUk1TY2hlbWEuRmlyc3RQZXJzb24sXG4gICAgYmxlbmRTaGFwZVByb3h5OiBWUk1CbGVuZFNoYXBlUHJveHksXG4gICAgaHVtYW5vaWQ6IFZSTUh1bWFub2lkLFxuICApOiBWUk1Mb29rQXRBcHBseWVyIHwgbnVsbCB7XG4gICAgY29uc3QgbG9va0F0SG9yaXpvbnRhbElubmVyID0gc2NoZW1hRmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbElubmVyO1xuICAgIGNvbnN0IGxvb2tBdEhvcml6b250YWxPdXRlciA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdEhvcml6b250YWxPdXRlcjtcbiAgICBjb25zdCBsb29rQXRWZXJ0aWNhbERvd24gPSBzY2hlbWFGaXJzdFBlcnNvbi5sb29rQXRWZXJ0aWNhbERvd247XG4gICAgY29uc3QgbG9va0F0VmVydGljYWxVcCA9IHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsVXA7XG5cbiAgICBzd2l0Y2ggKHNjaGVtYUZpcnN0UGVyc29uLmxvb2tBdFR5cGVOYW1lKSB7XG4gICAgICBjYXNlIFZSTVNjaGVtYS5GaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lLkJvbmU6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGxvb2tBdEhvcml6b250YWxJbm5lciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBsb29rQXRWZXJ0aWNhbERvd24gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGxvb2tBdFZlcnRpY2FsVXAgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEJvbmVBcHBseWVyKFxuICAgICAgICAgICAgaHVtYW5vaWQsXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0SG9yaXpvbnRhbElubmVyKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShsb29rQXRIb3Jpem9udGFsT3V0ZXIpLFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCb25lKGxvb2tBdFZlcnRpY2FsRG93biksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJvbmUobG9va0F0VmVydGljYWxVcCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FzZSBWUk1TY2hlbWEuRmlyc3RQZXJzb25Mb29rQXRUeXBlTmFtZS5CbGVuZFNoYXBlOiB7XG4gICAgICAgIGlmIChsb29rQXRIb3Jpem9udGFsT3V0ZXIgPT09IHVuZGVmaW5lZCB8fCBsb29rQXRWZXJ0aWNhbERvd24gPT09IHVuZGVmaW5lZCB8fCBsb29rQXRWZXJ0aWNhbFVwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyKFxuICAgICAgICAgICAgYmxlbmRTaGFwZVByb3h5LFxuICAgICAgICAgICAgdGhpcy5faW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKGxvb2tBdEhvcml6b250YWxPdXRlciksXG4gICAgICAgICAgICB0aGlzLl9pbXBvcnRDdXJ2ZU1hcHBlckJsZW5kU2hhcGUobG9va0F0VmVydGljYWxEb3duKSxcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydEN1cnZlTWFwcGVyQmxlbmRTaGFwZShsb29rQXRWZXJ0aWNhbFVwKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ltcG9ydEN1cnZlTWFwcGVyQm9uZShtYXA6IFZSTVNjaGVtYS5GaXJzdFBlcnNvbkRlZ3JlZU1hcCk6IFZSTUN1cnZlTWFwcGVyIHtcbiAgICByZXR1cm4gbmV3IFZSTUN1cnZlTWFwcGVyKFxuICAgICAgdHlwZW9mIG1hcC54UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC54UmFuZ2UgOiB1bmRlZmluZWQsXG4gICAgICB0eXBlb2YgbWFwLnlSYW5nZSA9PT0gJ251bWJlcicgPyBERUcyUkFEICogbWFwLnlSYW5nZSA6IHVuZGVmaW5lZCxcbiAgICAgIG1hcC5jdXJ2ZSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW1wb3J0Q3VydmVNYXBwZXJCbGVuZFNoYXBlKG1hcDogVlJNU2NoZW1hLkZpcnN0UGVyc29uRGVncmVlTWFwKTogVlJNQ3VydmVNYXBwZXIge1xuICAgIHJldHVybiBuZXcgVlJNQ3VydmVNYXBwZXIodHlwZW9mIG1hcC54UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC54UmFuZ2UgOiB1bmRlZmluZWQsIG1hcC55UmFuZ2UsIG1hcC5jdXJ2ZSk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vVlJNQ3VydmVNYXBwZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1Mb29rQXRCb25lQXBwbHllcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTUxvb2tBdEhlYWQnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1Mb29rQXRJbXBvcnRlcic7XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uIH0gZnJvbSAnLi9nZXRUZXhlbERlY29kaW5nRnVuY3Rpb24nO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuL3NoYWRlcnMvbXRvb24udmVydCc7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi9zaGFkZXJzL210b29uLmZyYWcnO1xuXG5jb25zdCBUQVUgPSAyLjAgKiBNYXRoLlBJO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1Ub29uUGFyYW1ldGVycyBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyB7XG4gIG1Ub29uVmVyc2lvbj86IG51bWJlcjsgLy8gX01Ub29uVmVyc2lvblxuXG4gIGN1dG9mZj86IG51bWJlcjsgLy8gX0N1dG9mZlxuICBjb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIHJnYiBvZiBfQ29sb3JcbiAgc2hhZGVDb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9TaGFkZUNvbG9yXG4gIG1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4XG4gIG1haW5UZXg/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleCAod2lsbCBiZSByZW5hbWVkIHRvIG1hcClcbiAgbWFpblRleF9TVD86IFRIUkVFLlZlY3RvcjQ7IC8vIF9NYWluVGV4X1NUXG4gIHNoYWRlVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9TaGFkZVRleHR1cmVcbiAgYnVtcFNjYWxlPzogbnVtYmVyOyAvLyBfQnVtcFNjYWxlICh3aWxsIGJlIGNvbnZlcnRlZCB0byBub3JtYWxTY2FsZSlcbiAgbm9ybWFsTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0J1bXBNYXBcbiAgbm9ybWFsTWFwVHlwZT86IFRIUkVFLk5vcm1hbE1hcFR5cGVzOyAvLyBUaHJlZS5qcyBzcGVjaWZpYyB2YWx1ZVxuICBub3JtYWxTY2FsZT86IFRIUkVFLlZlY3RvcjI7IC8vIF9CdW1wU2NhbGUgaW4gVGhyZWUuanMgZmFzaGlvblxuICBidW1wTWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX0J1bXBNYXAgKHdpbGwgYmUgcmVuYW1lZCB0byBub3JtYWxNYXApXG4gIHJlY2VpdmVTaGFkb3dSYXRlPzogbnVtYmVyOyAvLyBfUmVjZWl2ZVNoYWRvd1JhdGVcbiAgcmVjZWl2ZVNoYWRvd1RleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVcbiAgc2hhZGluZ0dyYWRlUmF0ZT86IG51bWJlcjsgLy8gX1NoYWRpbmdHcmFkZVJhdGVcbiAgc2hhZGluZ0dyYWRlVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9TaGFkaW5nR3JhZGVUZXh0dXJlXG4gIHNoYWRlU2hpZnQ/OiBudW1iZXI7IC8vIF9TaGFkZVNoaWZ0XG4gIHNoYWRlVG9vbnk/OiBudW1iZXI7IC8vIF9TaGFkZVRvb255XG4gIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbj86IG51bWJlcjsgLy8gX0xpZ2h0Q29sb3JBdHRlbnVhdGlvblxuICBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5PzogbnVtYmVyOyAvLyBfSW5kaXJlY3RMaWdodEludGVuc2l0eVxuICByaW1UZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1JpbVRleHR1cmVcbiAgcmltQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfUmltQ29sb3JcbiAgcmltTGlnaHRpbmdNaXg/OiBudW1iZXI7IC8vIF9SaW1MaWdodGluZ01peFxuICByaW1GcmVzbmVsUG93ZXI/OiBudW1iZXI7IC8vIF9SaW1GcmVzbmVsUG93ZXJcbiAgcmltTGlmdD86IG51bWJlcjsgLy8gX1JpbUxpZnRcbiAgc3BoZXJlQWRkPzogVEhSRUUuVGV4dHVyZTsgLy8gX1NwaGVyZUFkZFxuICBlbWlzc2lvbkNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX0VtaXNzaW9uQ29sb3JcbiAgZW1pc3NpdmVNYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfRW1pc3Npb25NYXBcbiAgZW1pc3Npb25NYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfRW1pc3Npb25NYXAgKHdpbGwgYmUgcmVuYW1lZCB0byBlbWlzc2l2ZU1hcClcbiAgb3V0bGluZVdpZHRoVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9PdXRsaW5lV2lkdGhUZXh0dXJlXG4gIG91dGxpbmVXaWR0aD86IG51bWJlcjsgLy8gX091dGxpbmVXaWR0aFxuICBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U/OiBudW1iZXI7IC8vIF9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2VcbiAgb3V0bGluZUNvbG9yPzogVEhSRUUuVmVjdG9yNDsgLy8gX091dGxpbmVDb2xvclxuICBvdXRsaW5lTGlnaHRpbmdNaXg/OiBudW1iZXI7IC8vIF9PdXRsaW5lTGlnaHRpbmdNaXhcbiAgdXZBbmltTWFza1RleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfVXZBbmltTWFza1RleHR1cmVcbiAgdXZBbmltU2Nyb2xsWD86IG51bWJlcjsgLy8gX1V2QW5pbVNjcm9sbFhcbiAgdXZBbmltU2Nyb2xsWT86IG51bWJlcjsgLy8gX1V2QW5pbVNjcm9sbFlcbiAgdXZBbmltUm90YXRpb24/OiBudW1iZXI7IC8vIF91dkFuaW1Sb3RhdGlvblxuXG4gIGRlYnVnTW9kZT86IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUgfCBudW1iZXI7IC8vIF9EZWJ1Z01vZGVcbiAgYmxlbmRNb2RlPzogTVRvb25NYXRlcmlhbFJlbmRlck1vZGUgfCBudW1iZXI7IC8vIF9CbGVuZE1vZGVcbiAgb3V0bGluZVdpZHRoTW9kZT86IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlIHwgbnVtYmVyOyAvLyBPdXRsaW5lV2lkdGhNb2RlXG4gIG91dGxpbmVDb2xvck1vZGU/OiBNVG9vbk1hdGVyaWFsT3V0bGluZUNvbG9yTW9kZSB8IG51bWJlcjsgLy8gT3V0bGluZUNvbG9yTW9kZVxuICBjdWxsTW9kZT86IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB8IG51bWJlcjsgLy8gX0N1bGxNb2RlXG4gIG91dGxpbmVDdWxsTW9kZT86IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB8IG51bWJlcjsgLy8gX091dGxpbmVDdWxsTW9kZVxuICBzcmNCbGVuZD86IG51bWJlcjsgLy8gX1NyY0JsZW5kXG4gIGRzdEJsZW5kPzogbnVtYmVyOyAvLyBfRHN0QmxlbmRcbiAgeldyaXRlPzogbnVtYmVyOyAvLyBfWldyaXRlICh3aWxsIGJlIHJlbmFtZWQgdG8gZGVwdGhXcml0ZSlcblxuICBpc091dGxpbmU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBlbmNvZGluZyBvZiBpbnB1dCB1bmlmb3JtIGNvbG9ycy5cbiAgICpcbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLkxpbmVhckVuY29kaW5nYCwgdXNlIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AuXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5zUkdCRW5jb2RpbmdgLCB1c2UgYFRIUkVFLnNSR0JFbmNvZGluZ2AuXG4gICAqXG4gICAqIEVuY29kaW5ncyBvZiB0ZXh0dXJlcyBzaG91bGQgYmUgc2V0IGluZGVwZW5kZW50bHkgb24gdGV4dHVyZXMuXG4gICAqXG4gICAqIFRoaXMgd2lsbCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYCBpZiB0aGlzIG9wdGlvbiBpc24ndCBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9yZW5kZXJlcnMvV2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZ1xuICAgKi9cbiAgZW5jb2Rpbmc/OiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSB7XG4gIE9mZixcbiAgRnJvbnQsXG4gIEJhY2ssXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUge1xuICBOb25lLFxuICBOb3JtYWwsXG4gIExpdFNoYWRlUmF0ZSxcbiAgVVYsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlIHtcbiAgRml4ZWRDb2xvcixcbiAgTWl4ZWRMaWdodGluZyxcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUge1xuICBOb25lLFxuICBXb3JsZENvb3JkaW5hdGVzLFxuICBTY3JlZW5Db29yZGluYXRlcyxcbn1cblxuZXhwb3J0IGVudW0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUge1xuICBPcGFxdWUsXG4gIEN1dG91dCxcbiAgVHJhbnNwYXJlbnQsXG4gIFRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbn1cblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbk1hdGVyaWFsIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWwge1xuICAvKipcbiAgICogUmVhZG9ubHkgYm9vbGVhbiB0aGF0IGluZGljYXRlcyB0aGlzIGlzIGEgW1tNVG9vbk1hdGVyaWFsXV0uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaXNNVG9vbk1hdGVyaWFsOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgY3V0b2ZmID0gMC41OyAvLyBfQ3V0b2ZmXG4gIHB1YmxpYyBjb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDEuMCwgMS4wLCAxLjAsIDEuMCk7IC8vIF9Db2xvclxuICBwdWJsaWMgc2hhZGVDb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuOTcsIDAuODEsIDAuODYsIDEuMCk7IC8vIF9TaGFkZUNvbG9yXG4gIHB1YmxpYyBtYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX01haW5UZXhcbiAgcHVibGljIG1haW5UZXhfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfTWFpblRleF9TVFxuICBwdWJsaWMgc2hhZGVUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9TaGFkZVRleHR1cmVcbiAgLy8gcHVibGljIHNoYWRlVGV4dHVyZV9TVCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9TaGFkZVRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIG5vcm1hbE1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfQnVtcE1hcC4gYWdhaW4sIFRISVMgSVMgX0J1bXBNYXBcbiAgcHVibGljIG5vcm1hbE1hcFR5cGUgPSBUSFJFRS5UYW5nZW50U3BhY2VOb3JtYWxNYXA7IC8vIFRocmVlLmpzIHJlcXVpcmVzIHRoaXNcbiAgcHVibGljIG5vcm1hbFNjYWxlID0gbmV3IFRIUkVFLlZlY3RvcjIoMS4wLCAxLjApOyAvLyBfQnVtcFNjYWxlLCBpbiBWZWN0b3IyXG4gIC8vIHB1YmxpYyBidW1wTWFwX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX0J1bXBNYXBfU1QgKHVudXNlZClcbiAgcHVibGljIHJlY2VpdmVTaGFkb3dSYXRlID0gMS4wOyAvLyBfUmVjZWl2ZVNoYWRvd1JhdGVcbiAgcHVibGljIHJlY2VpdmVTaGFkb3dUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9SZWNlaXZlU2hhZG93VGV4dHVyZVxuICAvLyBwdWJsaWMgcmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIHNoYWRpbmdHcmFkZVJhdGUgPSAxLjA7IC8vIF9TaGFkaW5nR3JhZGVSYXRlXG4gIHB1YmxpYyBzaGFkaW5nR3JhZGVUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9TaGFkaW5nR3JhZGVUZXh0dXJlXG4gIC8vIHB1YmxpYyBzaGFkaW5nR3JhZGVUZXh0dXJlX1NUID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1NoYWRpbmdHcmFkZVRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIHNoYWRlU2hpZnQgPSAwLjA7IC8vIF9TaGFkZVNoaWZ0XG4gIHB1YmxpYyBzaGFkZVRvb255ID0gMC45OyAvLyBfU2hhZGVUb29ueVxuICBwdWJsaWMgbGlnaHRDb2xvckF0dGVudWF0aW9uID0gMC4wOyAvLyBfTGlnaHRDb2xvckF0dGVudWF0aW9uXG4gIHB1YmxpYyBpbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gMC4xOyAvLyBfSW5kaXJlY3RMaWdodEludGVuc2l0eVxuICBwdWJsaWMgcmltVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfUmltVGV4dHVyZVxuICBwdWJsaWMgcmltQ29sb3IgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMC4wLCAxLjApOyAvLyBfUmltQ29sb3JcbiAgcHVibGljIHJpbUxpZ2h0aW5nTWl4ID0gMC4wOyAvLyBfUmltTGlnaHRpbmdNaXhcbiAgcHVibGljIHJpbUZyZXNuZWxQb3dlciA9IDEuMDsgLy8gX1JpbUZyZXNuZWxQb3dlclxuICBwdWJsaWMgcmltTGlmdCA9IDAuMDsgLy8gX1JpbUxpZnRcbiAgcHVibGljIHNwaGVyZUFkZDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU3BoZXJlQWRkXG4gIC8vIHB1YmxpYyBzcGhlcmVBZGRfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU3BoZXJlQWRkX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBlbWlzc2lvbkNvbG9yID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX0VtaXNzaW9uQ29sb3JcbiAgcHVibGljIGVtaXNzaXZlTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9FbWlzc2lvbk1hcFxuICAvLyBwdWJsaWMgZW1pc3Npb25NYXBfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfRW1pc3Npb25NYXBfU1QgKHVudXNlZClcbiAgcHVibGljIG91dGxpbmVXaWR0aFRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVcbiAgLy8gcHVibGljIG91dGxpbmVXaWR0aFRleHR1cmVfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfT3V0bGluZVdpZHRoVGV4dHVyZV9TVCAodW51c2VkKVxuICBwdWJsaWMgb3V0bGluZVdpZHRoID0gMC41OyAvLyBfT3V0bGluZVdpZHRoXG4gIHB1YmxpYyBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgPSAxLjA7IC8vIF9PdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2VcbiAgcHVibGljIG91dGxpbmVDb2xvciA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIF9PdXRsaW5lQ29sb3JcbiAgcHVibGljIG91dGxpbmVMaWdodGluZ01peCA9IDEuMDsgLy8gX091dGxpbmVMaWdodGluZ01peFxuICBwdWJsaWMgdXZBbmltTWFza1RleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1V2QW5pbU1hc2tUZXh0dXJlXG4gIHB1YmxpYyB1dkFuaW1TY3JvbGxYID0gMC4wOyAvLyBfVXZBbmltU2Nyb2xsWFxuICBwdWJsaWMgdXZBbmltU2Nyb2xsWSA9IDAuMDsgLy8gX1V2QW5pbVNjcm9sbFlcbiAgcHVibGljIHV2QW5pbVJvdGF0aW9uID0gMC4wOyAvLyBfdXZBbmltUm90YXRpb25cblxuICBwdWJsaWMgc2hvdWxkQXBwbHlVbmlmb3JtcyA9IHRydWU7IC8vIHdoZW4gdGhpcyBpcyB0cnVlLCBhcHBseVVuaWZvcm1zIGVmZmVjdHNcblxuICAvKipcbiAgICogVGhlIGVuY29kaW5nIG9mIGlucHV0IHVuaWZvcm0gY29sb3JzLlxuICAgKlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYC5cbiAgICogV2hlbiB5b3VyIGByZW5kZXJlci5vdXRwdXRFbmNvZGluZ2AgaXMgYFRIUkVFLnNSR0JFbmNvZGluZ2AsIHVzZSBgVEhSRUUuc1JHQkVuY29kaW5nYC5cbiAgICpcbiAgICogRW5jb2RpbmdzIG9mIHRleHR1cmVzIGFyZSBzZXQgaW5kZXBlbmRlbnRseSBvbiB0ZXh0dXJlcy5cbiAgICpcbiAgICogVGhpcyBpcyBgVEhSRUUuTGluZWFyRW5jb2RpbmdgIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9yZW5kZXJlcnMvV2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZ1xuICAgKi9cbiAgcHVibGljIGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG5cbiAgcHJpdmF0ZSBfZGVidWdNb2RlID0gTVRvb25NYXRlcmlhbERlYnVnTW9kZS5Ob25lOyAvLyBfRGVidWdNb2RlXG4gIHByaXZhdGUgX2JsZW5kTW9kZSA9IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLk9wYXF1ZTsgLy8gX0JsZW5kTW9kZVxuICBwcml2YXRlIF9vdXRsaW5lV2lkdGhNb2RlID0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZTsgLy8gX091dGxpbmVXaWR0aE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZUNvbG9yTW9kZSA9IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLkZpeGVkQ29sb3I7IC8vIF9PdXRsaW5lQ29sb3JNb2RlXG4gIHByaXZhdGUgX2N1bGxNb2RlID0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2s7IC8vIF9DdWxsTW9kZVxuICBwcml2YXRlIF9vdXRsaW5lQ3VsbE1vZGUgPSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuRnJvbnQ7IC8vIF9PdXRsaW5lQ3VsbE1vZGVcbiAgLy8gcHVibGljIHNyY0JsZW5kID0gMS4wOyAvLyBfU3JjQmxlbmQgKGlzIG5vdCBzdXBwb3J0ZWQpXG4gIC8vIHB1YmxpYyBkc3RCbGVuZCA9IDAuMDsgLy8gX0RzdEJsZW5kIChpcyBub3Qgc3VwcG9ydGVkKVxuICAvLyBwdWJsaWMgeldyaXRlID0gMS4wOyAvLyBfWldyaXRlICh3aWxsIGJlIGNvbnZlcnRlZCB0byBkZXB0aFdyaXRlKVxuXG4gIHByaXZhdGUgX2lzT3V0bGluZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3V2QW5pbU9mZnNldFggPSAwLjA7XG4gIHByaXZhdGUgX3V2QW5pbU9mZnNldFkgPSAwLjA7XG4gIHByaXZhdGUgX3V2QW5pbVBoYXNlID0gMC4wO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM6IE1Ub29uUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuZW5jb2RpbmcgPSBwYXJhbWV0ZXJzLmVuY29kaW5nIHx8IFRIUkVFLkxpbmVhckVuY29kaW5nO1xuICAgIGlmICh0aGlzLmVuY29kaW5nICE9PSBUSFJFRS5MaW5lYXJFbmNvZGluZyAmJiB0aGlzLmVuY29kaW5nICE9PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RoZSBzcGVjaWZpZWQgY29sb3IgZW5jb2RpbmcgZG9lcyBub3Qgd29yayBwcm9wZXJseSB3aXRoIE1Ub29uTWF0ZXJpYWwuIFlvdSBtaWdodCB3YW50IHRvIHVzZSBUSFJFRS5zUkdCRW5jb2RpbmcgaW5zdGVhZC4nLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyA9PSB0aGVzZSBwYXJhbWV0ZXIgaGFzIG5vIGNvbXBhdGliaWxpdHkgd2l0aCB0aGlzIGltcGxlbWVudGF0aW9uID09PT09PT09XG4gICAgW1xuICAgICAgJ21Ub29uVmVyc2lvbicsXG4gICAgICAnc2hhZGVUZXh0dXJlX1NUJyxcbiAgICAgICdidW1wTWFwX1NUJyxcbiAgICAgICdyZWNlaXZlU2hhZG93VGV4dHVyZV9TVCcsXG4gICAgICAnc2hhZGluZ0dyYWRlVGV4dHVyZV9TVCcsXG4gICAgICAncmltVGV4dHVyZV9TVCcsXG4gICAgICAnc3BoZXJlQWRkX1NUJyxcbiAgICAgICdlbWlzc2lvbk1hcF9TVCcsXG4gICAgICAnb3V0bGluZVdpZHRoVGV4dHVyZV9TVCcsXG4gICAgICAndXZBbmltTWFza1RleHR1cmVfU1QnLFxuICAgICAgJ3NyY0JsZW5kJyxcbiAgICAgICdkc3RCbGVuZCcsXG4gICAgXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgocGFyYW1ldGVycyBhcyBhbnkpW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjb25zb2xlLndhcm4oYFRIUkVFLiR7dGhpcy50eXBlfTogVGhlIHBhcmFtZXRlciBcIiR7a2V5fVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyA9PSBlbmFibGluZyBidW5jaCBvZiBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMubGlnaHRzID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIHBhcmFtZXRlcnMuc2tpbm5pbmcgPSBwYXJhbWV0ZXJzLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzID0gcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgPSBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubm9ybWFsbWFwLCAvLyBub3JtYWxNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLCAvLyBlbWlzc2l2ZU1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubGlnaHRzLFxuICAgICAge1xuICAgICAgICBjdXRvZmY6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBjb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIGNvbG9yQWxwaGE6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBzaGFkZUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC45NywgMC44MSwgMC44NikgfSxcbiAgICAgICAgbWFpblRleF9TVDogeyB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBzaGFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgcmVjZWl2ZVNoYWRvd1JhdGU6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICByZWNlaXZlU2hhZG93VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nR3JhZGVSYXRlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGluZ0dyYWRlVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkZVNoaWZ0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc2hhZGVUb29ueTogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIGluZGlyZWN0TGlnaHRJbnRlbnNpdHk6IHsgdmFsdWU6IDAuMSB9LFxuICAgICAgICByaW1UZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHJpbUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgcmltTGlnaHRpbmdNaXg6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICByaW1GcmVzbmVsUG93ZXI6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICByaW1MaWZ0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc3BoZXJlQWRkOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIGVtaXNzaW9uQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aDogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIG91dGxpbmVDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG91dGxpbmVMaWdodGluZ01peDogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIHV2QW5pbU1hc2tUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHV2QW5pbU9mZnNldFg6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICB1dkFuaW1PZmZzZXRZOiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgdXZBbmltVGhldGE6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgfSxcbiAgICBdKTtcblxuICAgIC8vID09IGZpbmFsbHkgY29tcGlsZSB0aGUgc2hhZGVyIHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLnNldFZhbHVlcyhwYXJhbWV0ZXJzKTtcblxuICAgIC8vID09IHVwZGF0ZSBzaGFkZXIgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgZ2V0IG1haW5UZXgoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hcDtcbiAgfVxuXG4gIHNldCBtYWluVGV4KHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5tYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGJ1bXBNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbE1hcDtcbiAgfVxuXG4gIHNldCBidW1wTWFwKHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSB0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRpbmcgdGhlIGBidW1wU2NhbGVgIHJldXRybnMgaXRzIHggY29tcG9uZW50IG9mIGBub3JtYWxTY2FsZWAgKGFzc3VtaW5nIHggYW5kIHkgY29tcG9uZW50IG9mIGBub3JtYWxTY2FsZWAgYXJlIHNhbWUpLlxuICAgKi9cbiAgZ2V0IGJ1bXBTY2FsZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbFNjYWxlLng7XG4gIH1cblxuICAvKipcbiAgICogU2V0dGluZyB0aGUgYGJ1bXBTY2FsZWAgd2lsbCBiZSBjb252ZXJ0IHRoZSB2YWx1ZSBpbnRvIFZlY3RvcjIgYG5vcm1hbFNjYWxlYCAuXG4gICAqL1xuICBzZXQgYnVtcFNjYWxlKHQ6IG51bWJlcikge1xuICAgIHRoaXMubm9ybWFsU2NhbGUuc2V0KHQsIHQpO1xuICB9XG5cbiAgZ2V0IGVtaXNzaW9uTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5lbWlzc2l2ZU1hcDtcbiAgfVxuXG4gIHNldCBlbWlzc2lvbk1hcCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGJsZW5kTW9kZSgpOiBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2JsZW5kTW9kZTtcbiAgfVxuXG4gIHNldCBibGVuZE1vZGUobTogTVRvb25NYXRlcmlhbFJlbmRlck1vZGUpIHtcbiAgICB0aGlzLl9ibGVuZE1vZGUgPSBtO1xuXG4gICAgdGhpcy5kZXB0aFdyaXRlID0gdGhpcy5fYmxlbmRNb2RlICE9PSBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZS5UcmFuc3BhcmVudDtcbiAgICB0aGlzLnRyYW5zcGFyZW50ID1cbiAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBkZWJ1Z01vZGUoKTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYnVnTW9kZTtcbiAgfVxuXG4gIHNldCBkZWJ1Z01vZGUobTogTVRvb25NYXRlcmlhbERlYnVnTW9kZSkge1xuICAgIHRoaXMuX2RlYnVnTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgb3V0bGluZVdpZHRoTW9kZSgpOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVXaWR0aE1vZGU7XG4gIH1cblxuICBzZXQgb3V0bGluZVdpZHRoTW9kZShtOiBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSBtO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVDb2xvck1vZGUoKTogTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVDb2xvck1vZGUobTogTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUpIHtcbiAgICB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlID0gbTtcblxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBjdWxsTW9kZSgpOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9jdWxsTW9kZTtcbiAgfVxuXG4gIHNldCBjdWxsTW9kZShtOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUpIHtcbiAgICB0aGlzLl9jdWxsTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVDdWxsTW9kZSgpOiBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ3VsbE1vZGU7XG4gIH1cblxuICBzZXQgb3V0bGluZUN1bGxNb2RlKG06IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVDdWxsTW9kZSA9IG07XG5cbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgZ2V0IHpXcml0ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRlcHRoV3JpdGUgPyAxIDogMDtcbiAgfVxuXG4gIHNldCB6V3JpdGUoaTogbnVtYmVyKSB7XG4gICAgdGhpcy5kZXB0aFdyaXRlID0gMC41IDw9IGk7XG4gIH1cblxuICBnZXQgaXNPdXRsaW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc091dGxpbmU7XG4gIH1cblxuICBzZXQgaXNPdXRsaW5lKGI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc091dGxpbmUgPSBiO1xuXG4gICAgdGhpcy5fdXBkYXRlU2hhZGVyQ29kZSgpO1xuICAgIHRoaXMuX3VwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoaXMgbWF0ZXJpYWwuXG4gICAqIFVzdWFsbHkgdGhpcyB3aWxsIGJlIGNhbGxlZCB2aWEgW1tWUk0udXBkYXRlXV0gc28geW91IGRvbid0IGhhdmUgdG8gY2FsbCB0aGlzIG1hbnVhbGx5LlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lIHNpbmNlIGxhc3QgdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVlJNTWF0ZXJpYWxzKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl91dkFuaW1PZmZzZXRYID0gdGhpcy5fdXZBbmltT2Zmc2V0WCArIGRlbHRhICogdGhpcy51dkFuaW1TY3JvbGxYO1xuICAgIHRoaXMuX3V2QW5pbU9mZnNldFkgPSB0aGlzLl91dkFuaW1PZmZzZXRZIC0gZGVsdGEgKiB0aGlzLnV2QW5pbVNjcm9sbFk7IC8vIE5lZ2F0aXZlIHNpbmNlIHQgYXhpcyBvZiB1dnMgYXJlIG9wcG9zaXRlIGZyb20gVW5pdHkncyBvbmVcbiAgICB0aGlzLl91dkFuaW1QaGFzZSA9IHRoaXMuX3V2QW5pbVBoYXNlICsgZGVsdGEgKiB0aGlzLnV2QW5pbVJvdGF0aW9uO1xuXG4gICAgdGhpcy5fYXBwbHlVbmlmb3JtcygpO1xuICB9XG5cbiAgcHVibGljIGNvcHkoc291cmNlOiB0aGlzKTogdGhpcyB7XG4gICAgc3VwZXIuY29weShzb3VyY2UpO1xuXG4gICAgLy8gPT0gY29weSBtZW1iZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuY3V0b2ZmID0gc291cmNlLmN1dG9mZjtcbiAgICB0aGlzLmNvbG9yLmNvcHkoc291cmNlLmNvbG9yKTtcbiAgICB0aGlzLnNoYWRlQ29sb3IuY29weShzb3VyY2Uuc2hhZGVDb2xvcik7XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubWFpblRleF9TVC5jb3B5KHNvdXJjZS5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnNoYWRlVGV4dHVyZSA9IHNvdXJjZS5zaGFkZVRleHR1cmU7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xuICAgIHRoaXMubm9ybWFsTWFwVHlwZSA9IHNvdXJjZS5ub3JtYWxNYXBUeXBlO1xuICAgIHRoaXMubm9ybWFsU2NhbGUuY29weSh0aGlzLm5vcm1hbFNjYWxlKTtcbiAgICB0aGlzLnJlY2VpdmVTaGFkb3dSYXRlID0gc291cmNlLnJlY2VpdmVTaGFkb3dSYXRlO1xuICAgIHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgPSBzb3VyY2UucmVjZWl2ZVNoYWRvd1RleHR1cmU7XG4gICAgdGhpcy5zaGFkaW5nR3JhZGVSYXRlID0gc291cmNlLnNoYWRpbmdHcmFkZVJhdGU7XG4gICAgdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlID0gc291cmNlLnNoYWRpbmdHcmFkZVRleHR1cmU7XG4gICAgdGhpcy5zaGFkZVNoaWZ0ID0gc291cmNlLnNoYWRlU2hpZnQ7XG4gICAgdGhpcy5zaGFkZVRvb255ID0gc291cmNlLnNoYWRlVG9vbnk7XG4gICAgdGhpcy5saWdodENvbG9yQXR0ZW51YXRpb24gPSBzb3VyY2UubGlnaHRDb2xvckF0dGVudWF0aW9uO1xuICAgIHRoaXMuaW5kaXJlY3RMaWdodEludGVuc2l0eSA9IHNvdXJjZS5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5O1xuICAgIHRoaXMucmltVGV4dHVyZSA9IHNvdXJjZS5yaW1UZXh0dXJlO1xuICAgIHRoaXMucmltQ29sb3IuY29weShzb3VyY2UucmltQ29sb3IpO1xuICAgIHRoaXMucmltTGlnaHRpbmdNaXggPSBzb3VyY2UucmltTGlnaHRpbmdNaXg7XG4gICAgdGhpcy5yaW1GcmVzbmVsUG93ZXIgPSBzb3VyY2UucmltRnJlc25lbFBvd2VyO1xuICAgIHRoaXMucmltTGlmdCA9IHNvdXJjZS5yaW1MaWZ0O1xuICAgIHRoaXMuc3BoZXJlQWRkID0gc291cmNlLnNwaGVyZUFkZDtcbiAgICB0aGlzLmVtaXNzaW9uQ29sb3IuY29weShzb3VyY2UuZW1pc3Npb25Db2xvcik7XG4gICAgdGhpcy5lbWlzc2l2ZU1hcCA9IHNvdXJjZS5lbWlzc2l2ZU1hcDtcbiAgICB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmUgPSBzb3VyY2Uub3V0bGluZVdpZHRoVGV4dHVyZTtcbiAgICB0aGlzLm91dGxpbmVXaWR0aCA9IHNvdXJjZS5vdXRsaW5lV2lkdGg7XG4gICAgdGhpcy5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgPSBzb3VyY2Uub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xuICAgIHRoaXMub3V0bGluZUNvbG9yLmNvcHkoc291cmNlLm91dGxpbmVDb2xvcik7XG4gICAgdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXggPSBzb3VyY2Uub3V0bGluZUxpZ2h0aW5nTWl4O1xuICAgIHRoaXMudXZBbmltTWFza1RleHR1cmUgPSBzb3VyY2UudXZBbmltTWFza1RleHR1cmU7XG4gICAgdGhpcy51dkFuaW1TY3JvbGxYID0gc291cmNlLnV2QW5pbVNjcm9sbFg7XG4gICAgdGhpcy51dkFuaW1TY3JvbGxZID0gc291cmNlLnV2QW5pbVNjcm9sbFk7XG4gICAgdGhpcy51dkFuaW1Sb3RhdGlvbiA9IHNvdXJjZS51dkFuaW1Sb3RhdGlvbjtcblxuICAgIHRoaXMuZGVidWdNb2RlID0gc291cmNlLmRlYnVnTW9kZTtcbiAgICB0aGlzLmJsZW5kTW9kZSA9IHNvdXJjZS5ibGVuZE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lV2lkdGhNb2RlID0gc291cmNlLm91dGxpbmVXaWR0aE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3JNb2RlID0gc291cmNlLm91dGxpbmVDb2xvck1vZGU7XG4gICAgdGhpcy5jdWxsTW9kZSA9IHNvdXJjZS5jdWxsTW9kZTtcbiAgICB0aGlzLm91dGxpbmVDdWxsTW9kZSA9IHNvdXJjZS5vdXRsaW5lQ3VsbE1vZGU7XG5cbiAgICB0aGlzLmlzT3V0bGluZSA9IHNvdXJjZS5pc091dGxpbmU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB1cGRhdGVkIHVuaWZvcm0gdmFyaWFibGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlVbmlmb3JtcygpOiB2b2lkIHtcbiAgICB0aGlzLnVuaWZvcm1zLnV2QW5pbU9mZnNldFgudmFsdWUgPSB0aGlzLl91dkFuaW1PZmZzZXRYO1xuICAgIHRoaXMudW5pZm9ybXMudXZBbmltT2Zmc2V0WS52YWx1ZSA9IHRoaXMuX3V2QW5pbU9mZnNldFk7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1UaGV0YS52YWx1ZSA9IFRBVSAqIHRoaXMuX3V2QW5pbVBoYXNlO1xuXG4gICAgaWYgKCF0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zID0gZmFsc2U7XG5cbiAgICB0aGlzLnVuaWZvcm1zLmN1dG9mZi52YWx1ZSA9IHRoaXMuY3V0b2ZmO1xuICAgIHRoaXMudW5pZm9ybXMuY29sb3IudmFsdWUuc2V0UkdCKHRoaXMuY29sb3IueCwgdGhpcy5jb2xvci55LCB0aGlzLmNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMuY29sb3JBbHBoYS52YWx1ZSA9IHRoaXMuY29sb3IudztcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMuc2hhZGVDb2xvci54LCB0aGlzLnNoYWRlQ29sb3IueSwgdGhpcy5zaGFkZUNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdGhpcy5tYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5tYWluVGV4X1NULnZhbHVlLmNvcHkodGhpcy5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVGV4dHVyZS52YWx1ZSA9IHRoaXMuc2hhZGVUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMubm9ybWFsTWFwLnZhbHVlID0gdGhpcy5ub3JtYWxNYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxTY2FsZS52YWx1ZS5jb3B5KHRoaXMubm9ybWFsU2NhbGUpO1xuICAgIHRoaXMudW5pZm9ybXMucmVjZWl2ZVNoYWRvd1JhdGUudmFsdWUgPSB0aGlzLnJlY2VpdmVTaGFkb3dSYXRlO1xuICAgIHRoaXMudW5pZm9ybXMucmVjZWl2ZVNoYWRvd1RleHR1cmUudmFsdWUgPSB0aGlzLnJlY2VpdmVTaGFkb3dUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGluZ0dyYWRlUmF0ZS52YWx1ZSA9IHRoaXMuc2hhZGluZ0dyYWRlUmF0ZTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdHcmFkZVRleHR1cmUudmFsdWUgPSB0aGlzLnNoYWRpbmdHcmFkZVRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkZVNoaWZ0LnZhbHVlID0gdGhpcy5zaGFkZVNoaWZ0O1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVUb29ueS52YWx1ZSA9IHRoaXMuc2hhZGVUb29ueTtcbiAgICB0aGlzLnVuaWZvcm1zLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbi52YWx1ZSA9IHRoaXMubGlnaHRDb2xvckF0dGVudWF0aW9uO1xuICAgIHRoaXMudW5pZm9ybXMuaW5kaXJlY3RMaWdodEludGVuc2l0eS52YWx1ZSA9IHRoaXMuaW5kaXJlY3RMaWdodEludGVuc2l0eTtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbVRleHR1cmUudmFsdWUgPSB0aGlzLnJpbVRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1Db2xvci52YWx1ZS5zZXRSR0IodGhpcy5yaW1Db2xvci54LCB0aGlzLnJpbUNvbG9yLnksIHRoaXMucmltQ29sb3Iueik7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peC52YWx1ZSA9IHRoaXMucmltTGlnaHRpbmdNaXg7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1GcmVzbmVsUG93ZXIudmFsdWUgPSB0aGlzLnJpbUZyZXNuZWxQb3dlcjtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUxpZnQudmFsdWUgPSB0aGlzLnJpbUxpZnQ7XG4gICAgdGhpcy51bmlmb3Jtcy5zcGhlcmVBZGQudmFsdWUgPSB0aGlzLnNwaGVyZUFkZDtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaW9uQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMuZW1pc3Npb25Db2xvci54LCB0aGlzLmVtaXNzaW9uQ29sb3IueSwgdGhpcy5lbWlzc2lvbkNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMuZW1pc3NpdmVNYXAudmFsdWUgPSB0aGlzLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVdpZHRoVGV4dHVyZS52YWx1ZSA9IHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aC52YWx1ZSA9IHRoaXMub3V0bGluZVdpZHRoO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlLnZhbHVlID0gdGhpcy5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMub3V0bGluZUNvbG9yLngsIHRoaXMub3V0bGluZUNvbG9yLnksIHRoaXMub3V0bGluZUNvbG9yLnopO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUxpZ2h0aW5nTWl4LnZhbHVlID0gdGhpcy5vdXRsaW5lTGlnaHRpbmdNaXg7XG4gICAgdGhpcy51bmlmb3Jtcy51dkFuaW1NYXNrVGV4dHVyZS52YWx1ZSA9IHRoaXMudXZBbmltTWFza1RleHR1cmU7XG5cbiAgICAvLyBhcHBseSBjb2xvciBzcGFjZSB0byB1bmlmb3JtIGNvbG9yc1xuICAgIGlmICh0aGlzLmVuY29kaW5nID09PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcbiAgICAgIHRoaXMudW5pZm9ybXMuY29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgdGhpcy51bmlmb3Jtcy5zaGFkZUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgICAgdGhpcy51bmlmb3Jtcy5lbWlzc2lvbkNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2hhZGVyQ29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmluZXMgPSB7XG4gICAgICBPVVRMSU5FOiB0aGlzLl9pc091dGxpbmUsXG4gICAgICBCTEVORE1PREVfT1BBUVVFOiB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLk9wYXF1ZSxcbiAgICAgIEJMRU5ETU9ERV9DVVRPVVQ6IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuQ3V0b3V0LFxuICAgICAgQkxFTkRNT0RFX1RSQU5TUEFSRU5UOlxuICAgICAgICB0aGlzLl9ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLlRyYW5zcGFyZW50IHx8XG4gICAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25NYXRlcmlhbFJlbmRlck1vZGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxuICAgICAgVVNFX1NIQURFVEVYVFVSRTogdGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkU6IHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU0hBRElOR0dSQURFVEVYVFVSRTogdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1JJTVRFWFRVUkU6IHRoaXMucmltVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9TUEhFUkVBREQ6IHRoaXMuc3BoZXJlQWRkICE9PSBudWxsLFxuICAgICAgVVNFX09VVExJTkVXSURUSFRFWFRVUkU6IHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9VVkFOSU1NQVNLVEVYVFVSRTogdGhpcy51dkFuaW1NYXNrVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLk5vcm1hbCxcbiAgICAgIERFQlVHX0xJVFNIQURFUkFURTogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbk1hdGVyaWFsRGVidWdNb2RlLkxpdFNoYWRlUmF0ZSxcbiAgICAgIERFQlVHX1VWOiB0aGlzLl9kZWJ1Z01vZGUgPT09IE1Ub29uTWF0ZXJpYWxEZWJ1Z01vZGUuVVYsXG4gICAgICBPVVRMSU5FX1dJRFRIX1dPUkxEOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk1hdGVyaWFsT3V0bGluZVdpZHRoTW9kZS5Xb3JsZENvb3JkaW5hdGVzLFxuICAgICAgT1VUTElORV9XSURUSF9TQ1JFRU46IHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLlNjcmVlbkNvb3JkaW5hdGVzLFxuICAgICAgT1VUTElORV9DT0xPUl9GSVhFRDogdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9PT0gTVRvb25NYXRlcmlhbE91dGxpbmVDb2xvck1vZGUuRml4ZWRDb2xvcixcbiAgICAgIE9VVExJTkVfQ09MT1JfTUlYRUQ6IHRoaXMuX291dGxpbmVDb2xvck1vZGUgPT09IE1Ub29uTWF0ZXJpYWxPdXRsaW5lQ29sb3JNb2RlLk1peGVkTGlnaHRpbmcsXG4gICAgfTtcblxuICAgIC8vID09IHRleHR1cmUgZW5jb2RpbmdzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCBlbmNvZGluZ3MgPVxuICAgICAgKHRoaXMuc2hhZGVUZXh0dXJlICE9PSBudWxsXG4gICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKCdzaGFkZVRleHR1cmVUZXhlbFRvTGluZWFyJywgdGhpcy5zaGFkZVRleHR1cmUuZW5jb2RpbmcpICsgJ1xcbidcbiAgICAgICAgOiAnJykgK1xuICAgICAgKHRoaXMuc3BoZXJlQWRkICE9PSBudWxsXG4gICAgICAgID8gZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uKCdzcGhlcmVBZGRUZXhlbFRvTGluZWFyJywgdGhpcy5zcGhlcmVBZGQuZW5jb2RpbmcpICsgJ1xcbidcbiAgICAgICAgOiAnJykgK1xuICAgICAgKHRoaXMucmltVGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbigncmltVGV4dHVyZVRleGVsVG9MaW5lYXInLCB0aGlzLnJpbVRleHR1cmUuZW5jb2RpbmcpICsgJ1xcbidcbiAgICAgICAgOiAnJyk7XG5cbiAgICAvLyA9PSBnZW5lcmF0ZSBzaGFkZXIgY29kZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSB2ZXJ0ZXhTaGFkZXI7XG4gICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGVuY29kaW5ncyArIGZyYWdtZW50U2hhZGVyO1xuXG4gICAgLy8gPT0gc2V0IG5lZWRzVXBkYXRlIGZsYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ3VsbEZhY2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3V0bGluZSkge1xuICAgICAgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxDdWxsTW9kZS5PZmYpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkZyb250KSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1bGxNb2RlID09PSBNVG9vbk1hdGVyaWFsQ3VsbE1vZGUuQmFjaykge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Gcm9udFNpZGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLk9mZikge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkZyb250KSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkJhY2tTaWRlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25NYXRlcmlhbEN1bGxNb2RlLkJhY2spIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRnJvbnRTaWRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgR0xURk1lc2gsIEdMVEZQcmltaXRpdmUsIEdMVEZTY2hlbWEsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IE1Ub29uTWF0ZXJpYWwsIE1Ub29uTWF0ZXJpYWxPdXRsaW5lV2lkdGhNb2RlLCBNVG9vbk1hdGVyaWFsUmVuZGVyTW9kZSB9IGZyb20gJy4vTVRvb25NYXRlcmlhbCc7XG5pbXBvcnQgeyBWUk1VbmxpdE1hdGVyaWFsLCBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB9IGZyb20gJy4vVlJNVW5saXRNYXRlcmlhbCc7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgYSBbW1ZSTU1hdGVyaWFsSW1wb3J0ZXJdXSBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWUk1NYXRlcmlhbEltcG9ydGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBlbmNvZGluZyBvZiBpbnB1dCB1bmlmb3JtIGNvbG9ycyBhbmQgdGV4dHVyZXMuXG4gICAqXG4gICAqIFdoZW4geW91ciBgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmdgIGlzIGBUSFJFRS5MaW5lYXJFbmNvZGluZ2AsIHVzZSBgVEhSRUUuTGluZWFyRW5jb2RpbmdgLlxuICAgKiBXaGVuIHlvdXIgYHJlbmRlcmVyLm91dHB1dEVuY29kaW5nYCBpcyBgVEhSRUUuc1JHQkVuY29kaW5nYCwgdXNlIGBUSFJFRS5zUkdCRW5jb2RpbmdgLlxuICAgKlxuICAgKiBUaGUgaW1wb3J0ZXIgd2lsbCB1c2UgYFRIUkVFLkxpbmVhckVuY29kaW5nYCBpZiB0aGlzIG9wdGlvbiBpc24ndCBzcGVjaWZpZWQuXG4gICAqXG4gICAqIFNlZSBhbHNvOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9yZW5kZXJlcnMvV2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZ1xuICAgKi9cbiAgZW5jb2Rpbmc/OiBUSFJFRS5UZXh0dXJlRW5jb2Rpbmc7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgYFByb21pc2VgIG9mIGVudmlyb25tZW50IG1hcCB0ZXh0dXJlLlxuICAgKiBUaGUgaW1wb3J0ZXIgd2lsbCBhdHRlbXB0IHRvIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIGl0IGhhdmUgdG8gdXNlIGFuIGVudm1hcC5cbiAgICovXG4gIHJlcXVlc3RFbnZNYXA/OiAoKSA9PiBQcm9taXNlPFRIUkVFLlRleHR1cmUgfCBudWxsPjtcbn1cblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgVlJNIG1hdGVyaWFscyBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1NYXRlcmlhbEltcG9ydGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZztcbiAgcHJpdmF0ZSByZWFkb25seSBfcmVxdWVzdEVudk1hcD86ICgpID0+IFByb21pc2U8VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNTWF0ZXJpYWxJbXBvcnRlci5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBvZiB0aGUgVlJNTWF0ZXJpYWxJbXBvcnRlclxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogVlJNTWF0ZXJpYWxJbXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuX2VuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZyB8fCBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgICBpZiAodGhpcy5fZW5jb2RpbmcgIT09IFRIUkVFLkxpbmVhckVuY29kaW5nICYmIHRoaXMuX2VuY29kaW5nICE9PSBUSFJFRS5zUkdCRW5jb2RpbmcpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RoZSBzcGVjaWZpZWQgY29sb3IgZW5jb2RpbmcgbWlnaHQgbm90IHdvcmsgcHJvcGVybHkgd2l0aCBWUk1NYXRlcmlhbEltcG9ydGVyLiBZb3UgbWlnaHQgd2FudCB0byB1c2UgVEhSRUUuc1JHQkVuY29kaW5nIGluc3RlYWQuJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVxdWVzdEVudk1hcCA9IG9wdGlvbnMucmVxdWVzdEVudk1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFsbCB0aGUgbWF0ZXJpYWxzIG9mIGdpdmVuIEdMVEYgYmFzZWQgb24gVlJNIGV4dGVuc2lvbiBmaWVsZCBgbWF0ZXJpYWxQcm9wZXJ0aWVzYC5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY29udmVydEdMVEZNYXRlcmlhbHMoZ2x0ZjogR0xURik6IFByb21pc2U8VEhSRUUuTWF0ZXJpYWxbXSB8IG51bGw+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFZSTVNjaGVtYS5WUk0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnM/LlZSTTtcbiAgICBpZiAoIXZybUV4dCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0ZXJpYWxQcm9wZXJ0aWVzOiBWUk1TY2hlbWEuTWF0ZXJpYWxbXSB8IHVuZGVmaW5lZCA9IHZybUV4dC5tYXRlcmlhbFByb3BlcnRpZXM7XG4gICAgaWYgKCFtYXRlcmlhbFByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc2hlc01hcDogR0xURk1lc2hbXSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY2llcygnbWVzaCcpO1xuICAgIGNvbnN0IG1hdGVyaWFsTGlzdDogeyBbdnJtTWF0ZXJpYWxJbmRleDogbnVtYmVyXTogeyBzdXJmYWNlOiBUSFJFRS5NYXRlcmlhbDsgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsIH0gfSA9IHt9O1xuICAgIGNvbnN0IG1hdGVyaWFsczogVEhSRUUuTWF0ZXJpYWxbXSA9IFtdOyAvLyByZXN1bHRcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgbWVzaGVzTWFwLm1hcChhc3luYyAobWVzaCwgbWVzaEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjaGVtYU1lc2g6IEdMVEZTY2hlbWEuTWVzaCA9IGdsdGYucGFyc2VyLmpzb24ubWVzaGVzIVttZXNoSW5kZXhdO1xuICAgICAgICBjb25zdCBwcmltaXRpdmVzOiBHTFRGUHJpbWl0aXZlW10gPVxuICAgICAgICAgIG1lc2gudHlwZSA9PT0gJ0dyb3VwJyA/IChtZXNoLmNoaWxkcmVuIGFzIEdMVEZQcmltaXRpdmVbXSkgOiBbbWVzaCBhcyBHTFRGUHJpbWl0aXZlXTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICBwcmltaXRpdmVzLm1hcChhc3luYyAocHJpbWl0aXZlLCBwcmltaXRpdmVJbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2NoZW1hUHJpbWl0aXZlID0gc2NoZW1hTWVzaC5wcmltaXRpdmVzW3ByaW1pdGl2ZUluZGV4XTtcblxuICAgICAgICAgICAgLy8gc29tZSBnbFRGIG1pZ2h0IGhhdmUgYm90aCBgbm9kZS5tZXNoYCBhbmQgYG5vZGUuY2hpbGRyZW5gIGF0IG9uY2VcbiAgICAgICAgICAgIC8vIGFuZCBHTFRGTG9hZGVyIGhhbmRsZXMgYm90aCBtZXNoIHByaW1pdGl2ZXMgYW5kIFwiY2hpbGRyZW5cIiBpbiBnbFRGIGFzIFwiY2hpbGRyZW5cIiBpbiBUSFJFRVxuICAgICAgICAgICAgLy8gSXQgc2VlbXMgR0xURkxvYWRlciBoYW5kbGVzIHByaW1pdGl2ZXMgZmlyc3QgdGhlbiBoYW5kbGVzIFwiY2hpbGRyZW5cIiBpbiBnbFRGIChpdCdzIGx1Y2t5ISlcbiAgICAgICAgICAgIC8vIHNvIHdlIHNob3VsZCBpZ25vcmUgKHByaW1pdGl2ZXMubGVuZ3RoKXRoIGFuZCBmb2xsb3dpbmcgY2hpbGRyZW4gb2YgYG1lc2guY2hpbGRyZW5gXG4gICAgICAgICAgICAvLyBUT0RPOiBzYW5pdGl6ZSB0aGlzIGFmdGVyIEdMVEZMb2FkZXIgcGx1Z2luIHN5c3RlbSBnZXRzIGludHJvZHVjZWQgOiBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL3B1bGwvMTg0MjFcbiAgICAgICAgICAgIGlmICghc2NoZW1hUHJpbWl0aXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlR2VvbWV0cnkgPSBwcmltaXRpdmUuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmVWZXJ0aWNlcyA9IHByaW1pdGl2ZUdlb21ldHJ5LmluZGV4XG4gICAgICAgICAgICAgID8gcHJpbWl0aXZlR2VvbWV0cnkuaW5kZXguY291bnRcbiAgICAgICAgICAgICAgOiBwcmltaXRpdmVHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmNvdW50IC8gMztcblxuICAgICAgICAgICAgLy8gaWYgcHJpbWl0aXZlcyBtYXRlcmlhbCBpcyBub3QgYW4gYXJyYXksIG1ha2UgaXQgYW4gYXJyYXlcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcmltaXRpdmUubWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbCA9IFtwcmltaXRpdmUubWF0ZXJpYWxdO1xuICAgICAgICAgICAgICBwcmltaXRpdmVHZW9tZXRyeS5hZGRHcm91cCgwLCBwcmltaXRpdmVWZXJ0aWNlcywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSAvIHB1c2ggdG8gY2FjaGUgKG9yIHBvcCBmcm9tIGNhY2hlKSB2cm0gbWF0ZXJpYWxzXG4gICAgICAgICAgICBjb25zdCB2cm1NYXRlcmlhbEluZGV4ID0gc2NoZW1hUHJpbWl0aXZlLm1hdGVyaWFsITtcblxuICAgICAgICAgICAgbGV0IHByb3BzID0gbWF0ZXJpYWxQcm9wZXJ0aWVzW3ZybU1hdGVyaWFsSW5kZXhdO1xuICAgICAgICAgICAgaWYgKCFwcm9wcykge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFZSTU1hdGVyaWFsSW1wb3J0ZXI6IFRoZXJlIGFyZSBubyBtYXRlcmlhbCBkZWZpbml0aW9uIGZvciBtYXRlcmlhbCAjJHt2cm1NYXRlcmlhbEluZGV4fSBvbiBWUk0gZXh0ZW5zaW9uLmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHByb3BzID0geyBzaGFkZXI6ICdWUk1fVVNFX0dMVEZTSEFERVInIH07IC8vIGZhbGxiYWNrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2cm1NYXRlcmlhbHM6IHsgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7IG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbCB9O1xuICAgICAgICAgICAgaWYgKG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XSkge1xuICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMgPSBtYXRlcmlhbExpc3RbdnJtTWF0ZXJpYWxJbmRleF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMgPSBhd2FpdCB0aGlzLmNyZWF0ZVZSTU1hdGVyaWFscyhwcmltaXRpdmUubWF0ZXJpYWxbMF0sIHByb3BzLCBnbHRmKTtcbiAgICAgICAgICAgICAgbWF0ZXJpYWxMaXN0W3ZybU1hdGVyaWFsSW5kZXhdID0gdnJtTWF0ZXJpYWxzO1xuXG4gICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKHZybU1hdGVyaWFscy5zdXJmYWNlKTtcbiAgICAgICAgICAgICAgaWYgKHZybU1hdGVyaWFscy5vdXRsaW5lKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2godnJtTWF0ZXJpYWxzLm91dGxpbmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN1cmZhY2VcbiAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbFswXSA9IHZybU1hdGVyaWFscy5zdXJmYWNlO1xuXG4gICAgICAgICAgICAvLyBlbnZtYXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0RW52TWFwICYmICh2cm1NYXRlcmlhbHMuc3VyZmFjZSBhcyBhbnkpLmlzTWVzaFN0YW5kYXJkTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdEVudk1hcCgpLnRoZW4oKGVudk1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICh2cm1NYXRlcmlhbHMuc3VyZmFjZSBhcyBhbnkpLmVudk1hcCA9IGVudk1hcDtcbiAgICAgICAgICAgICAgICB2cm1NYXRlcmlhbHMuc3VyZmFjZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZW5kZXIgb3JkZXJcbiAgICAgICAgICAgIHByaW1pdGl2ZS5yZW5kZXJPcmRlciA9IHByb3BzLnJlbmRlclF1ZXVlIHx8IDIwMDA7XG5cbiAgICAgICAgICAgIC8vIG91dGxpbmUgKFwiMiBwYXNzIHNoYWRpbmcgdXNpbmcgZ3JvdXBzXCIgdHJpY2sgaGVyZSlcbiAgICAgICAgICAgIGlmICh2cm1NYXRlcmlhbHMub3V0bGluZSkge1xuICAgICAgICAgICAgICBwcmltaXRpdmUubWF0ZXJpYWxbMV0gPSB2cm1NYXRlcmlhbHMub3V0bGluZTtcbiAgICAgICAgICAgICAgcHJpbWl0aXZlR2VvbWV0cnkuYWRkR3JvdXAoMCwgcHJpbWl0aXZlVmVydGljZXMsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBtYXRlcmlhbHM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3JlYXRlVlJNTWF0ZXJpYWxzKFxuICAgIG9yaWdpbmFsTWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsLFxuICAgIHZybVByb3BzOiBWUk1TY2hlbWEuTWF0ZXJpYWwsXG4gICAgZ2x0ZjogR0xURixcbiAgKTogUHJvbWlzZTx7XG4gICAgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7XG4gICAgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsO1xuICB9PiB7XG4gICAgbGV0IG5ld1N1cmZhY2U6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkO1xuICAgIGxldCBuZXdPdXRsaW5lOiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vTVRvb24nKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcblxuICAgICAgLy8gd2UgbmVlZCB0byBnZXQgcmlkIG9mIHRoZXNlIHByb3BlcnRpZXNcbiAgICAgIFsnc3JjQmxlbmQnLCAnZHN0QmxlbmQnLCAnaXNGaXJzdFNldHVwJ10uZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAocGFyYW1zW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgcGFyYW1zW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhlc2UgdGV4dHVyZXMgbXVzdCBiZSBzUkdCIEVuY29kaW5nLCBkZXBlbmRzIG9uIGN1cnJlbnQgY29sb3JzcGFjZVxuICAgICAgWydtYWluVGV4JywgJ3NoYWRlVGV4dHVyZScsICdlbWlzc2lvbk1hcCcsICdzcGhlcmVBZGQnLCAncmltVGV4dHVyZSddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGFyYW1zW25hbWVdLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBzcGVjaWZ5IHVuaWZvcm0gY29sb3IgZW5jb2RpbmdzXG4gICAgICBwYXJhbXMuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcblxuICAgICAgLy8gZG9uZVxuICAgICAgbmV3U3VyZmFjZSA9IG5ldyBNVG9vbk1hdGVyaWFsKHBhcmFtcyk7XG5cbiAgICAgIC8vIG91dGxpbmVcbiAgICAgIGlmIChwYXJhbXMub3V0bGluZVdpZHRoTW9kZSAhPT0gTVRvb25NYXRlcmlhbE91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgICBwYXJhbXMuaXNPdXRsaW5lID0gdHJ1ZTtcbiAgICAgICAgbmV3T3V0bGluZSA9IG5ldyBNVG9vbk1hdGVyaWFsKHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUZXh0dXJlJykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLk9wYXF1ZTtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0Q3V0b3V0Jykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLkN1dG91dDtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSBpZiAodnJtUHJvcHMuc2hhZGVyID09PSAnVlJNL1VubGl0VHJhbnNwYXJlbnQnKSB7XG4gICAgICAvLyB0aGlzIGlzIHZlcnkgbGVnYWN5XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLl9leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQ7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFZSTVVubGl0TWF0ZXJpYWwocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5fZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVlJNVW5saXRNYXRlcmlhbChwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodnJtUHJvcHMuc2hhZGVyICE9PSAnVlJNX1VTRV9HTFRGU0hBREVSJykge1xuICAgICAgICBjb25zb2xlLndhcm4oYFVua25vd24gc2hhZGVyIGRldGVjdGVkOiBcIiR7dnJtUHJvcHMuc2hhZGVyfVwiYCk7XG4gICAgICAgIC8vIHRoZW4gcHJlc3VtZSBhcyBWUk1fVVNFX0dMVEZTSEFERVJcbiAgICAgIH1cblxuICAgICAgbmV3U3VyZmFjZSA9IHRoaXMuX2NvbnZlcnRHTFRGTWF0ZXJpYWwob3JpZ2luYWxNYXRlcmlhbC5jbG9uZSgpKTtcbiAgICB9XG5cbiAgICBuZXdTdXJmYWNlLm5hbWUgPSBvcmlnaW5hbE1hdGVyaWFsLm5hbWU7XG4gICAgbmV3U3VyZmFjZS51c2VyRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxNYXRlcmlhbC51c2VyRGF0YSkpO1xuICAgIG5ld1N1cmZhY2UudXNlckRhdGEudnJtTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdnJtUHJvcHM7XG5cbiAgICBpZiAobmV3T3V0bGluZSkge1xuICAgICAgbmV3T3V0bGluZS5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lICsgJyAoT3V0bGluZSknO1xuICAgICAgbmV3T3V0bGluZS51c2VyRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxNYXRlcmlhbC51c2VyRGF0YSkpO1xuICAgICAgbmV3T3V0bGluZS51c2VyRGF0YS52cm1NYXRlcmlhbFByb3BlcnRpZXMgPSB2cm1Qcm9wcztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VyZmFjZTogbmV3U3VyZmFjZSxcbiAgICAgIG91dGxpbmU6IG5ld091dGxpbmUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAobmFtZVswXSAhPT0gJ18nKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFZSTU1hdGVyaWFsczogR2l2ZW4gcHJvcGVydHkgbmFtZSBcIiR7bmFtZX1cIiBtaWdodCBiZSBpbnZhbGlkYCk7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKDEpO1xuXG4gICAgaWYgKCEvW0EtWl0vLnRlc3QobmFtZVswXSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzOiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZVswXS50b0xvd2VyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XG4gIH1cblxuICBwcml2YXRlIF9jb252ZXJ0R0xURk1hdGVyaWFsKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCk6IFRIUkVFLk1hdGVyaWFsIHtcbiAgICBpZiAoKG1hdGVyaWFsIGFzIGFueSkuaXNNZXNoU3RhbmRhcmRNYXRlcmlhbCkge1xuICAgICAgY29uc3QgbXRsID0gbWF0ZXJpYWwgYXMgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWw7XG5cbiAgICAgIGlmIChtdGwubWFwKSB7XG4gICAgICAgIG10bC5tYXAuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcbiAgICAgIH1cbiAgICAgIGlmIChtdGwuZW1pc3NpdmVNYXApIHtcbiAgICAgICAgbXRsLmVtaXNzaXZlTWFwLmVuY29kaW5nID0gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lbmNvZGluZyA9PT0gVEhSRUUuTGluZWFyRW5jb2RpbmcpIHtcbiAgICAgICAgbXRsLmNvbG9yLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcbiAgICAgICAgbXRsLmVtaXNzaXZlLmNvbnZlcnRMaW5lYXJUb1NSR0IoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKG1hdGVyaWFsIGFzIGFueSkuaXNNZXNoQmFzaWNNYXRlcmlhbCkge1xuICAgICAgY29uc3QgbXRsID0gbWF0ZXJpYWwgYXMgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw7XG5cbiAgICAgIGlmIChtdGwubWFwKSB7XG4gICAgICAgIG10bC5tYXAuZW5jb2RpbmcgPSB0aGlzLl9lbmNvZGluZztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VuY29kaW5nID09PSBUSFJFRS5MaW5lYXJFbmNvZGluZykge1xuICAgICAgICBtdGwuY29sb3IuY29udmVydExpbmVhclRvU1JHQigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRlcmlhbDtcbiAgfVxuXG4gIHByaXZhdGUgX2V4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMoXG4gICAgb3JpZ2luYWxNYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwsXG4gICAgdnJtUHJvcHM6IFZSTVNjaGVtYS5NYXRlcmlhbCxcbiAgICBnbHRmOiBHTFRGLFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhc2tMaXN0OiBBcnJheTxQcm9taXNlPGFueT4+ID0gW107XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIC8vIGV4dHJhY3QgdGV4dHVyZSBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLl9yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlSW5kZXggPSB2cm1Qcm9wcy50ZXh0dXJlUHJvcGVydGllc1tuYW1lXTtcblxuICAgICAgICB0YXNrTGlzdC5wdXNoKFxuICAgICAgICAgIGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ3RleHR1cmUnLCB0ZXh0dXJlSW5kZXgpLnRoZW4oKHRleHR1cmU6IFRIUkVFLlRleHR1cmUpID0+IHtcbiAgICAgICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IHRleHR1cmU7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCBmbG9hdCBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLmZsb2F0UHJvcGVydGllcykge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKHZybVByb3BzLmZsb2F0UHJvcGVydGllcykpIHtcbiAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRoaXMuX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG4gICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IHZybVByb3BzLmZsb2F0UHJvcGVydGllc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYWN0IHZlY3RvciAoY29sb3IgdGJoKSBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLnZlY3RvclByb3BlcnRpZXMpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyh2cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzKSkge1xuICAgICAgICBsZXQgbmV3TmFtZSA9IHRoaXMuX3JlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG5cbiAgICAgICAgLy8gaWYgdGhpcyBpcyB0ZXh0dXJlU1QgKHNhbWUgbmFtZSBhcyB0ZXh0dXJlIG5hbWUgaXRzZWxmKSwgYWRkICdfU1QnXG4gICAgICAgIGNvbnN0IGlzVGV4dHVyZVNUID0gW1xuICAgICAgICAgICdfTWFpblRleCcsXG4gICAgICAgICAgJ19TaGFkZVRleHR1cmUnLFxuICAgICAgICAgICdfQnVtcE1hcCcsXG4gICAgICAgICAgJ19SZWNlaXZlU2hhZG93VGV4dHVyZScsXG4gICAgICAgICAgJ19TaGFkaW5nR3JhZGVUZXh0dXJlJyxcbiAgICAgICAgICAnX1JpbVRleHR1cmUnLFxuICAgICAgICAgICdfU3BoZXJlQWRkJyxcbiAgICAgICAgICAnX0VtaXNzaW9uTWFwJyxcbiAgICAgICAgICAnX091dGxpbmVXaWR0aFRleHR1cmUnLFxuICAgICAgICAgICdfVXZBbmltTWFza1RleHR1cmUnLFxuICAgICAgICBdLnNvbWUoKHRleHR1cmVOYW1lKSA9PiBuYW1lID09PSB0ZXh0dXJlTmFtZSk7XG4gICAgICAgIGlmIChpc1RleHR1cmVTVCkge1xuICAgICAgICAgIG5ld05hbWUgKz0gJ19TVCc7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSBuZXcgVEhSRUUuVmVjdG9yNCguLi52cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzW25hbWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBmIChodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9pc3N1ZXMvMTcyKVxuICAgIGlmICh2cm1Qcm9wcy5rZXl3b3JkTWFwIS5fQUxQSEFURVNUX09OICYmIHBhcmFtcy5ibGVuZE1vZGUgPT09IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLk9wYXF1ZSkge1xuICAgICAgcGFyYW1zLmJsZW5kTW9kZSA9IE1Ub29uTWF0ZXJpYWxSZW5kZXJNb2RlLkN1dG91dDtcbiAgICB9XG5cbiAgICAvLyBzZXQgd2hldGhlciBpdCBuZWVkcyBza2lubmluZyBhbmQgbW9ycGhpbmcgb3Igbm90XG4gICAgcGFyYW1zLnNraW5uaW5nID0gKG9yaWdpbmFsTWF0ZXJpYWwgYXMgYW55KS5za2lubmluZyB8fCBmYWxzZTtcbiAgICBwYXJhbXMubW9ycGhUYXJnZXRzID0gKG9yaWdpbmFsTWF0ZXJpYWwgYXMgYW55KS5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1zLm1vcnBoTm9ybWFscyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkubW9ycGhOb3JtYWxzIHx8IGZhbHNlO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRhc2tMaXN0KS50aGVuKCgpID0+IHBhcmFtcyk7XG4gIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4vc2hhZGVycy91bmxpdC52ZXJ0JztcbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuL3NoYWRlcnMvdW5saXQuZnJhZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVlJNVW5saXRNYXRlcmlhbFBhcmFtZXRlcnMgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMge1xuICBjdXRvZmY/OiBudW1iZXI7IC8vIF9DdXRvZmZcbiAgbWFwPzogVEhSRUUuVGV4dHVyZTsgLy8gX01haW5UZXhcbiAgbWFpblRleD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4ICh3aWxsIGJlIHJlbmFtZWQgdG8gbWFwKVxuICBtYWluVGV4X1NUPzogVEhSRUUuVmVjdG9yNDsgLy8gX01haW5UZXhfU1RcblxuICByZW5kZXJUeXBlPzogVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUgfCBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIFZSTVVubGl0TWF0ZXJpYWxSZW5kZXJUeXBlIHtcbiAgT3BhcXVlLFxuICBDdXRvdXQsXG4gIFRyYW5zcGFyZW50LFxuICBUcmFuc3BhcmVudFdpdGhaV3JpdGUsXG59XG5cbi8qKlxuICogVGhpcyBpcyBhIG1hdGVyaWFsIHRoYXQgaXMgYW4gZXF1aXZhbGVudCBvZiBcIlZSTS9VbmxpdCoqKlwiIG9uIFZSTSBzcGVjLCB0aG9zZSBtYXRlcmlhbHMgYXJlIGFscmVhZHkga2luZGEgZGVwcmVjYXRlZCB0aG91Z2guLi5cbiAqL1xuZXhwb3J0IGNsYXNzIFZSTVVubGl0TWF0ZXJpYWwgZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbCB7XG4gIC8qKlxuICAgKiBSZWFkb25seSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIHRoaXMgaXMgYSBbW1ZSTVVubGl0TWF0ZXJpYWxdXS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpc1ZSTVVubGl0TWF0ZXJpYWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBjdXRvZmYgPSAwLjU7XG4gIHB1YmxpYyBtYXA6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX01haW5UZXhcbiAgcHVibGljIG1haW5UZXhfU1QgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfTWFpblRleF9TVFxuICBwcml2YXRlIF9yZW5kZXJUeXBlID0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuT3BhcXVlO1xuXG4gIHB1YmxpYyBzaG91bGRBcHBseVVuaWZvcm1zID0gdHJ1ZTsgLy8gd2hlbiB0aGlzIGlzIHRydWUsIGFwcGx5VW5pZm9ybXMgZWZmZWN0c1xuXG4gIGNvbnN0cnVjdG9yKHBhcmFtZXRlcnM/OiBWUk1VbmxpdE1hdGVyaWFsUGFyYW1ldGVycykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAocGFyYW1ldGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbWV0ZXJzID0ge307XG4gICAgfVxuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIHBhcmFtZXRlcnMuc2tpbm5pbmcgPSBwYXJhbWV0ZXJzLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzID0gcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgPSBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAge1xuICAgICAgICBjdXRvZmY6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBtYWluVGV4X1NUOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApIH0sXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgICB0aGlzLl9hcHBseVVuaWZvcm1zKCk7XG4gIH1cblxuICBnZXQgbWFpblRleCgpOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFwO1xuICB9XG5cbiAgc2V0IG1haW5UZXgodDogVEhSRUUuVGV4dHVyZSB8IG51bGwpIHtcbiAgICB0aGlzLm1hcCA9IHQ7XG4gIH1cblxuICBnZXQgcmVuZGVyVHlwZSgpOiBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclR5cGU7XG4gIH1cblxuICBzZXQgcmVuZGVyVHlwZSh0OiBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZSkge1xuICAgIHRoaXMuX3JlbmRlclR5cGUgPSB0O1xuXG4gICAgdGhpcy5kZXB0aFdyaXRlID0gdGhpcy5fcmVuZGVyVHlwZSAhPT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQ7XG4gICAgdGhpcy50cmFuc3BhcmVudCA9XG4gICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5UcmFuc3BhcmVudCB8fFxuICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlO1xuICAgIHRoaXMuX3VwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhpcyBtYXRlcmlhbC5cbiAgICogVXN1YWxseSB0aGlzIHdpbGwgYmUgY2FsbGVkIHZpYSBbW1ZSTS51cGRhdGVdXSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byBjYWxsIHRoaXMgbWFudWFsbHkuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWUgc2luY2UgbGFzdCB1cGRhdGVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVWUk1NYXRlcmlhbHMoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FwcGx5VW5pZm9ybXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3B5KHNvdXJjZTogdGhpcyk6IHRoaXMge1xuICAgIHN1cGVyLmNvcHkoc291cmNlKTtcblxuICAgIC8vID09IGNvcHkgbWVtYmVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLmN1dG9mZiA9IHNvdXJjZS5jdXRvZmY7XG4gICAgdGhpcy5tYXAgPSBzb3VyY2UubWFwO1xuICAgIHRoaXMubWFpblRleF9TVC5jb3B5KHNvdXJjZS5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnJlbmRlclR5cGUgPSBzb3VyY2UucmVuZGVyVHlwZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHVwZGF0ZWQgdW5pZm9ybSB2YXJpYWJsZXMuXG4gICAqL1xuICBwcml2YXRlIF9hcHBseVVuaWZvcm1zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvdWxkQXBwbHlVbmlmb3JtcyA9IGZhbHNlO1xuXG4gICAgdGhpcy51bmlmb3Jtcy5jdXRvZmYudmFsdWUgPSB0aGlzLmN1dG9mZjtcbiAgICB0aGlzLnVuaWZvcm1zLm1hcC52YWx1ZSA9IHRoaXMubWFwO1xuICAgIHRoaXMudW5pZm9ybXMubWFpblRleF9TVC52YWx1ZS5jb3B5KHRoaXMubWFpblRleF9TVCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaGFkZXJDb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVmaW5lcyA9IHtcbiAgICAgIFJFTkRFUlRZUEVfT1BBUVVFOiB0aGlzLl9yZW5kZXJUeXBlID09PSBWUk1VbmxpdE1hdGVyaWFsUmVuZGVyVHlwZS5PcGFxdWUsXG4gICAgICBSRU5ERVJUWVBFX0NVVE9VVDogdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuQ3V0b3V0LFxuICAgICAgUkVOREVSVFlQRV9UUkFOU1BBUkVOVDpcbiAgICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnQgfHxcbiAgICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVlJNVW5saXRNYXRlcmlhbFJlbmRlclR5cGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxuICAgIH07XG5cbiAgICB0aGlzLnZlcnRleFNoYWRlciA9IHZlcnRleFNoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZnJhZ21lbnRTaGFkZXI7XG5cbiAgICAvLyA9PSBzZXQgbmVlZHNVcGRhdGUgZmxhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNvbnN0IGdldEVuY29kaW5nQ29tcG9uZW50cyA9IChlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKTogW3N0cmluZywgc3RyaW5nXSA9PiB7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlIFRIUkVFLkxpbmVhckVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnTGluZWFyJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuc1JHQkVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnc1JHQicsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQkVFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQkUnLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JNN0VuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCTScsICcoIHZhbHVlLCA3LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCTTE2RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JNJywgJyggdmFsdWUsIDE2LjAgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCREVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCRCcsICcoIHZhbHVlLCAyNTYuMCApJ107XG4gICAgY2FzZSBUSFJFRS5HYW1tYUVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnR2FtbWEnLCAnKCB2YWx1ZSwgZmxvYXQoIEdBTU1BX0ZBQ1RPUiApICknXTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBlbmNvZGluZzogJyArIGVuY29kaW5nKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbiA9IChmdW5jdGlvbk5hbWU6IHN0cmluZywgZW5jb2Rpbmc6IFRIUkVFLlRleHR1cmVFbmNvZGluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGNvbXBvbmVudHMgPSBnZXRFbmNvZGluZ0NvbXBvbmVudHMoZW5jb2RpbmcpO1xuICByZXR1cm4gJ3ZlYzQgJyArIGZ1bmN0aW9uTmFtZSArICcoIHZlYzQgdmFsdWUgKSB7IHJldHVybiAnICsgY29tcG9uZW50c1swXSArICdUb0xpbmVhcicgKyBjb21wb25lbnRzWzFdICsgJzsgfSc7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9NVG9vbk1hdGVyaWFsJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNTWF0ZXJpYWxJbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVVubGl0TWF0ZXJpYWwnO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCIvLyAjZGVmaW5lIFBIT05HXFxuXFxuI2lmZGVmIEJMRU5ETU9ERV9DVVRPVVRcXG4gIHVuaWZvcm0gZmxvYXQgY3V0b2ZmO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gdmVjMyBjb2xvcjtcXG51bmlmb3JtIGZsb2F0IGNvbG9yQWxwaGE7XFxudW5pZm9ybSB2ZWMzIHNoYWRlQ29sb3I7XFxuI2lmZGVmIFVTRV9TSEFERVRFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNoYWRlVGV4dHVyZTtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIGZsb2F0IHJlY2VpdmVTaGFkb3dSYXRlO1xcbiNpZmRlZiBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHJlY2VpdmVTaGFkb3dUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgc2hhZGluZ0dyYWRlUmF0ZTtcXG4jaWZkZWYgVVNFX1NIQURJTkdHUkFERVRFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNoYWRpbmdHcmFkZVRleHR1cmU7XFxuI2VuZGlmXFxuXFxudW5pZm9ybSBmbG9hdCBzaGFkZVNoaWZ0O1xcbnVuaWZvcm0gZmxvYXQgc2hhZGVUb29ueTtcXG51bmlmb3JtIGZsb2F0IGxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcXG51bmlmb3JtIGZsb2F0IGluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XFxuXFxuI2lmZGVmIFVTRV9SSU1URVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCByaW1UZXh0dXJlO1xcbiNlbmRpZlxcbnVuaWZvcm0gdmVjMyByaW1Db2xvcjtcXG51bmlmb3JtIGZsb2F0IHJpbUxpZ2h0aW5nTWl4O1xcbnVuaWZvcm0gZmxvYXQgcmltRnJlc25lbFBvd2VyO1xcbnVuaWZvcm0gZmxvYXQgcmltTGlmdDtcXG5cXG4jaWZkZWYgVVNFX1NQSEVSRUFERFxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgc3BoZXJlQWRkO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gdmVjMyBlbWlzc2lvbkNvbG9yO1xcblxcbnVuaWZvcm0gdmVjMyBvdXRsaW5lQ29sb3I7XFxudW5pZm9ybSBmbG9hdCBvdXRsaW5lTGlnaHRpbmdNaXg7XFxuXFxuI2lmZGVmIFVTRV9VVkFOSU1NQVNLVEVYVFVSRVxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgdXZBbmltTWFza1RleHR1cmU7XFxuI2VuZGlmXFxuXFxudW5pZm9ybSBmbG9hdCB1dkFuaW1PZmZzZXRYO1xcbnVuaWZvcm0gZmxvYXQgdXZBbmltT2Zmc2V0WTtcXG51bmlmb3JtIGZsb2F0IHV2QW5pbVRoZXRhO1xcblxcbiNpbmNsdWRlIDxjb21tb24+XFxuI2luY2x1ZGUgPHBhY2tpbmc+XFxuI2luY2x1ZGUgPGRpdGhlcmluZ19wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxjb2xvcl9wYXJzX2ZyYWdtZW50Plxcblxcbi8vICNpbmNsdWRlIDx1dl9wYXJzX2ZyYWdtZW50PlxcbiNpZiBkZWZpbmVkKCBVU0VfTUFQICkgfHwgZGVmaW5lZCggVVNFX1NIQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9OT1JNQUxNQVAgKSB8fCBkZWZpbmVkKCBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfU0hBRElOR0dSQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9SSU1URVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX0VNSVNTSVZFTUFQICkgfHwgZGVmaW5lZCggVVNFX09VVExJTkVXSURUSFRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfVVZBTklNTUFTS1RFWFRVUkUgKVxcbiAgdmFyeWluZyB2ZWMyIHZVdjtcXG4jZW5kaWZcXG5cXG4jaW5jbHVkZSA8dXYyX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPG1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxhbHBoYW1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxhb21hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxsaWdodG1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxlbWlzc2l2ZW1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8Z3JhZGllbnRtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8Zm9nX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGJzZGZzPlxcbiNpbmNsdWRlIDxsaWdodHNfcGFyc19iZWdpbj5cXG5cXG4vLyAjaW5jbHVkZSA8bGlnaHRzX3Bob25nX3BhcnNfZnJhZ21lbnQ+XFxudmFyeWluZyB2ZWMzIHZWaWV3UG9zaXRpb247XFxuXFxuI2lmbmRlZiBGTEFUX1NIQURFRFxcbiAgdmFyeWluZyB2ZWMzIHZOb3JtYWw7XFxuI2VuZGlmXFxuXFxuI2RlZmluZSBNYXRlcmlhbF9MaWdodFByb2JlTE9EKCBtYXRlcmlhbCApICgwKVxcblxcbiNpbmNsdWRlIDxzaGFkb3dtYXBfcGFyc19mcmFnbWVudD5cXG4vLyAjaW5jbHVkZSA8YnVtcG1hcF9wYXJzX2ZyYWdtZW50Plxcblxcbi8vICNpbmNsdWRlIDxub3JtYWxtYXBfcGFyc19mcmFnbWVudD5cXG4jaWZkZWYgVVNFX05PUk1BTE1BUFxcblxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgbm9ybWFsTWFwO1xcbiAgdW5pZm9ybSB2ZWMyIG5vcm1hbFNjYWxlO1xcblxcbiNlbmRpZlxcblxcbiNpZmRlZiBPQkpFQ1RTUEFDRV9OT1JNQUxNQVBcXG5cXG4gIHVuaWZvcm0gbWF0MyBub3JtYWxNYXRyaXg7XFxuXFxuI2VuZGlmXFxuXFxuI2lmICEgZGVmaW5lZCAoIFVTRV9UQU5HRU5UICkgJiYgZGVmaW5lZCAoIFRBTkdFTlRTUEFDRV9OT1JNQUxNQVAgKVxcblxcbiAgLy8gUGVyLVBpeGVsIFRhbmdlbnQgU3BhY2UgTm9ybWFsIE1hcHBpbmdcXG4gIC8vIGh0dHA6Ly9oYWNrc29mbGlmZS5ibG9nc3BvdC5jaC8yMDA5LzExL3Blci1waXhlbC10YW5nZW50LXNwYWNlLW5vcm1hbC1tYXBwaW5nLmh0bWxcXG5cXG4gIC8vIHRocmVlLXZybSBzcGVjaWZpYyBjaGFuZ2U6IGl0IHJlcXVpcmVzIGB1dmAgYXMgYW4gaW5wdXQgaW4gb3JkZXIgdG8gc3VwcG9ydCB1diBzY3JvbGxzXFxuXFxuICB2ZWMzIHBlcnR1cmJOb3JtYWwyQXJiKCB2ZWMyIHV2LCB2ZWMzIGV5ZV9wb3MsIHZlYzMgc3VyZl9ub3JtLCB2ZWMzIG1hcE4gKSB7XFxuXFxuICAgIC8vIFdvcmthcm91bmQgZm9yIEFkcmVubyAzWFggZEZkKiggdmVjMyApIGJ1Zy4gU2VlICM5OTg4XFxuXFxuICAgIHZlYzMgcTAgPSB2ZWMzKCBkRmR4KCBleWVfcG9zLnggKSwgZEZkeCggZXllX3Bvcy55ICksIGRGZHgoIGV5ZV9wb3MueiApICk7XFxuICAgIHZlYzMgcTEgPSB2ZWMzKCBkRmR5KCBleWVfcG9zLnggKSwgZEZkeSggZXllX3Bvcy55ICksIGRGZHkoIGV5ZV9wb3MueiApICk7XFxuICAgIHZlYzIgc3QwID0gZEZkeCggdXYuc3QgKTtcXG4gICAgdmVjMiBzdDEgPSBkRmR5KCB1di5zdCApO1xcblxcbiAgICBmbG9hdCBzY2FsZSA9IHNpZ24oIHN0MS50ICogc3QwLnMgLSBzdDAudCAqIHN0MS5zICk7IC8vIHdlIGRvIG5vdCBjYXJlIGFib3V0IHRoZSBtYWduaXR1ZGVcXG5cXG4gICAgdmVjMyBTID0gKCBxMCAqIHN0MS50IC0gcTEgKiBzdDAudCApICogc2NhbGU7XFxuICAgIHZlYzMgVCA9ICggLSBxMCAqIHN0MS5zICsgcTEgKiBzdDAucyApICogc2NhbGU7XFxuXFxuICAgIC8vIHRocmVlLXZybSBzcGVjaWZpYyBjaGFuZ2U6IFdvcmthcm91bmQgZm9yIHRoZSBpc3N1ZSB0aGF0IGhhcHBlbnMgd2hlbiBkZWx0YSBvZiB1diA9IDAuMFxcbiAgICAvLyBUT0RPOiBJcyB0aGlzIHN0aWxsIHJlcXVpcmVkPyBPciBzaGFsbCBJIG1ha2UgYSBQUiBhYm91dCBpdD9cXG5cXG4gICAgaWYgKCBsZW5ndGgoIFMgKSA9PSAwLjAgfHwgbGVuZ3RoKCBUICkgPT0gMC4wICkge1xcbiAgICAgIHJldHVybiBzdXJmX25vcm07XFxuICAgIH1cXG5cXG4gICAgUyA9IG5vcm1hbGl6ZSggUyApO1xcbiAgICBUID0gbm9ybWFsaXplKCBUICk7XFxuICAgIHZlYzMgTiA9IG5vcm1hbGl6ZSggc3VyZl9ub3JtICk7XFxuXFxuICAgICNpZmRlZiBET1VCTEVfU0lERURcXG5cXG4gICAgICAvLyBXb3JrYXJvdW5kIGZvciBBZHJlbm8gR1BVcyBnbF9Gcm9udEZhY2luZyBidWcuIFNlZSAjMTU4NTAgYW5kICMxMDMzMVxcblxcbiAgICAgIGJvb2wgZnJvbnRGYWNpbmcgPSBkb3QoIGNyb3NzKCBTLCBUICksIE4gKSA+IDAuMDtcXG5cXG4gICAgICBtYXBOLnh5ICo9ICggZmxvYXQoIGZyb250RmFjaW5nICkgKiAyLjAgLSAxLjAgKTtcXG5cXG4gICAgI2Vsc2VcXG5cXG4gICAgICBtYXBOLnh5ICo9ICggZmxvYXQoIGdsX0Zyb250RmFjaW5nICkgKiAyLjAgLSAxLjAgKTtcXG5cXG4gICAgI2VuZGlmXFxuXFxuICAgIG1hdDMgdHNuID0gbWF0MyggUywgVCwgTiApO1xcbiAgICByZXR1cm4gbm9ybWFsaXplKCB0c24gKiBtYXBOICk7XFxuXFxuICB9XFxuXFxuI2VuZGlmXFxuXFxuLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19wYXJzX2ZyYWdtZW50Plxcblxcbi8vID09IGxpZ2h0aW5nIHN0dWZmID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuZmxvYXQgZ2V0TGlnaHRJbnRlbnNpdHkoXFxuICBjb25zdCBpbiBJbmNpZGVudExpZ2h0IGRpcmVjdExpZ2h0LFxcbiAgY29uc3QgaW4gR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeSxcXG4gIGNvbnN0IGluIGZsb2F0IHNoYWRvdyxcXG4gIGNvbnN0IGluIGZsb2F0IHNoYWRpbmdHcmFkZVxcbikge1xcbiAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSBkb3QoIGdlb21ldHJ5Lm5vcm1hbCwgZGlyZWN0TGlnaHQuZGlyZWN0aW9uICk7XFxuICBsaWdodEludGVuc2l0eSA9IDAuNSArIDAuNSAqIGxpZ2h0SW50ZW5zaXR5O1xcbiAgbGlnaHRJbnRlbnNpdHkgPSBsaWdodEludGVuc2l0eSAqIHNoYWRvdztcXG4gIGxpZ2h0SW50ZW5zaXR5ID0gbGlnaHRJbnRlbnNpdHkgKiBzaGFkaW5nR3JhZGU7XFxuICBsaWdodEludGVuc2l0eSA9IGxpZ2h0SW50ZW5zaXR5ICogMi4wIC0gMS4wO1xcbiAgcmV0dXJuIHNoYWRlVG9vbnkgPT0gMS4wXFxuICAgID8gc3RlcCggc2hhZGVTaGlmdCwgbGlnaHRJbnRlbnNpdHkgKVxcbiAgICA6IHNtb290aHN0ZXAoIHNoYWRlU2hpZnQsIHNoYWRlU2hpZnQgKyAoIDEuMCAtIHNoYWRlVG9vbnkgKSwgbGlnaHRJbnRlbnNpdHkgKTtcXG59XFxuXFxudmVjMyBnZXRMaWdodGluZyggY29uc3QgaW4gdmVjMyBsaWdodENvbG9yICkge1xcbiAgdmVjMyBsaWdodGluZyA9IGxpZ2h0Q29sb3I7XFxuICBsaWdodGluZyA9IG1peChcXG4gICAgbGlnaHRpbmcsXFxuICAgIHZlYzMoIG1heCggMC4wMDEsIG1heCggbGlnaHRpbmcueCwgbWF4KCBsaWdodGluZy55LCBsaWdodGluZy56ICkgKSApICksXFxuICAgIGxpZ2h0Q29sb3JBdHRlbnVhdGlvblxcbiAgKTtcXG5cXG4gICNpZm5kZWYgUEhZU0lDQUxMWV9DT1JSRUNUX0xJR0hUU1xcbiAgICBsaWdodGluZyAqPSBQSTtcXG4gICNlbmRpZlxcblxcbiAgcmV0dXJuIGxpZ2h0aW5nO1xcbn1cXG5cXG52ZWMzIGdldERpZmZ1c2UoXFxuICBjb25zdCBpbiB2ZWMzIGxpdCxcXG4gIGNvbnN0IGluIHZlYzMgc2hhZGUsXFxuICBjb25zdCBpbiBmbG9hdCBsaWdodEludGVuc2l0eSxcXG4gIGNvbnN0IGluIHZlYzMgbGlnaHRpbmdcXG4pIHtcXG4gICNpZmRlZiBERUJVR19MSVRTSEFERVJBVEVcXG4gICAgcmV0dXJuIHZlYzMoIEJSREZfRGlmZnVzZV9MYW1iZXJ0KCBsaWdodEludGVuc2l0eSAqIGxpZ2h0aW5nICkgKTtcXG4gICNlbmRpZlxcblxcbiAgcmV0dXJuIGxpZ2h0aW5nICogQlJERl9EaWZmdXNlX0xhbWJlcnQoIG1peCggc2hhZGUsIGxpdCwgbGlnaHRJbnRlbnNpdHkgKSApO1xcbn1cXG5cXG52ZWMzIGNhbGNEaXJlY3REaWZmdXNlKFxcbiAgY29uc3QgaW4gdmVjMiB1dixcXG4gIGNvbnN0IGluIHZlYzMgbGl0LFxcbiAgY29uc3QgaW4gdmVjMyBzaGFkZSxcXG4gIGluIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnksXFxuICBpbm91dCBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodFxcbikge1xcbiAgSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodDtcXG4gIHZlYzMgbGlnaHRpbmdTdW0gPSB2ZWMzKCAwLjAgKTtcXG5cXG4gIGZsb2F0IHNoYWRpbmdHcmFkZSA9IDEuMDtcXG4gICNpZmRlZiBVU0VfU0hBRElOR0dSQURFVEVYVFVSRVxcbiAgICBzaGFkaW5nR3JhZGUgPSAxLjAgLSBzaGFkaW5nR3JhZGVSYXRlICogKCAxLjAgLSB0ZXh0dXJlMkQoIHNoYWRpbmdHcmFkZVRleHR1cmUsIHV2ICkuciApO1xcbiAgI2VuZGlmXFxuXFxuICBmbG9hdCByZWNlaXZlU2hhZG93ID0gcmVjZWl2ZVNoYWRvd1JhdGU7XFxuICAjaWZkZWYgVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFXFxuICAgIHJlY2VpdmVTaGFkb3cgKj0gdGV4dHVyZTJEKCByZWNlaXZlU2hhZG93VGV4dHVyZSwgdXYgKS5hO1xcbiAgI2VuZGlmXFxuXFxuICAjaWYgKCBOVU1fUE9JTlRfTElHSFRTID4gMCApXFxuICAgIFBvaW50TGlnaHQgcG9pbnRMaWdodDtcXG5cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcF9zdGFydFxcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fUE9JTlRfTElHSFRTOyBpICsrICkge1xcbiAgICAgIHBvaW50TGlnaHQgPSBwb2ludExpZ2h0c1sgaSBdO1xcbiAgICAgIGdldFBvaW50RGlyZWN0TGlnaHRJcnJhZGlhbmNlKCBwb2ludExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcXG5cXG4gICAgICBmbG9hdCBhdHRlbiA9IDEuMDtcXG4gICAgICAjaWZkZWYgVVNFX1NIQURPV01BUFxcbiAgICAgICAgYXR0ZW4gPSBhbGwoIGJ2ZWMyKCBwb2ludExpZ2h0LnNoYWRvdywgZGlyZWN0TGlnaHQudmlzaWJsZSApICkgPyBnZXRQb2ludFNoYWRvdyggcG9pbnRTaGFkb3dNYXBbIGkgXSwgcG9pbnRMaWdodC5zaGFkb3dNYXBTaXplLCBwb2ludExpZ2h0LnNoYWRvd0JpYXMsIHBvaW50TGlnaHQuc2hhZG93UmFkaXVzLCB2UG9pbnRTaGFkb3dDb29yZFsgaSBdLCBwb2ludExpZ2h0LnNoYWRvd0NhbWVyYU5lYXIsIHBvaW50TGlnaHQuc2hhZG93Q2FtZXJhRmFyICkgOiAxLjA7XFxuICAgICAgI2VuZGlmXFxuXFxuICAgICAgZmxvYXQgc2hhZG93ID0gMS4wIC0gcmVjZWl2ZVNoYWRvdyAqICggMS4wIC0gKCAwLjUgKyAwLjUgKiBhdHRlbiApICk7XFxuICAgICAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSBnZXRMaWdodEludGVuc2l0eSggZGlyZWN0TGlnaHQsIGdlb21ldHJ5LCBzaGFkb3csIHNoYWRpbmdHcmFkZSApO1xcbiAgICAgIHZlYzMgbGlnaHRpbmcgPSBnZXRMaWdodGluZyggZGlyZWN0TGlnaHQuY29sb3IgKTtcXG4gICAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIGxpdCwgc2hhZGUsIGxpZ2h0SW50ZW5zaXR5LCBsaWdodGluZyApO1xcbiAgICAgIGxpZ2h0aW5nU3VtICs9IGxpZ2h0aW5nO1xcbiAgICB9XFxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXFxuICAjZW5kaWZcXG5cXG4gICNpZiAoIE5VTV9TUE9UX0xJR0hUUyA+IDAgKVxcbiAgICBTcG90TGlnaHQgc3BvdExpZ2h0O1xcblxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9TUE9UX0xJR0hUUzsgaSArKyApIHtcXG4gICAgICBzcG90TGlnaHQgPSBzcG90TGlnaHRzWyBpIF07XFxuICAgICAgZ2V0U3BvdERpcmVjdExpZ2h0SXJyYWRpYW5jZSggc3BvdExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcXG5cXG4gICAgICBmbG9hdCBhdHRlbiA9IDEuMDtcXG4gICAgICAjaWZkZWYgVVNFX1NIQURPV01BUFxcbiAgICAgICAgYXR0ZW4gPSBhbGwoIGJ2ZWMyKCBzcG90TGlnaHQuc2hhZG93LCBkaXJlY3RMaWdodC52aXNpYmxlICkgKSA/IGdldFNoYWRvdyggc3BvdFNoYWRvd01hcFsgaSBdLCBzcG90TGlnaHQuc2hhZG93TWFwU2l6ZSwgc3BvdExpZ2h0LnNoYWRvd0JpYXMsIHNwb3RMaWdodC5zaGFkb3dSYWRpdXMsIHZTcG90U2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xcbiAgICAgICNlbmRpZlxcblxcbiAgICAgIGZsb2F0IHNoYWRvdyA9IDEuMCAtIHJlY2VpdmVTaGFkb3cgKiAoIDEuMCAtICggMC41ICsgMC41ICogYXR0ZW4gKSApO1xcbiAgICAgIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZ2V0TGlnaHRJbnRlbnNpdHkoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgc2hhZG93LCBzaGFkaW5nR3JhZGUgKTtcXG4gICAgICB2ZWMzIGxpZ2h0aW5nID0gZ2V0TGlnaHRpbmcoIGRpcmVjdExpZ2h0LmNvbG9yICk7XFxuICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBsaXQsIHNoYWRlLCBsaWdodEludGVuc2l0eSwgbGlnaHRpbmcgKTtcXG4gICAgICBsaWdodGluZ1N1bSArPSBsaWdodGluZztcXG4gICAgfVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxcbiAgI2VuZGlmXFxuXFxuICAjaWYgKCBOVU1fRElSX0xJR0hUUyA+IDAgKVxcbiAgICBEaXJlY3Rpb25hbExpZ2h0IGRpcmVjdGlvbmFsTGlnaHQ7XFxuXFxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3Bfc3RhcnRcXG4gICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX0RJUl9MSUdIVFM7IGkgKysgKSB7XFxuICAgICAgZGlyZWN0aW9uYWxMaWdodCA9IGRpcmVjdGlvbmFsTGlnaHRzWyBpIF07XFxuICAgICAgZ2V0RGlyZWN0aW9uYWxEaXJlY3RMaWdodElycmFkaWFuY2UoIGRpcmVjdGlvbmFsTGlnaHQsIGdlb21ldHJ5LCBkaXJlY3RMaWdodCApO1xcblxcbiAgICAgIGZsb2F0IGF0dGVuID0gMS4wO1xcbiAgICAgICNpZmRlZiBVU0VfU0hBRE9XTUFQXFxuICAgICAgICBhdHRlbiA9IGFsbCggYnZlYzIoIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93LCBkaXJlY3RMaWdodC52aXNpYmxlICkgKSA/IGdldFNoYWRvdyggZGlyZWN0aW9uYWxTaGFkb3dNYXBbIGkgXSwgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3dNYXBTaXplLCBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvd0JpYXMsIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93UmFkaXVzLCB2RGlyZWN0aW9uYWxTaGFkb3dDb29yZFsgaSBdICkgOiAxLjA7XFxuICAgICAgI2VuZGlmXFxuXFxuICAgICAgZmxvYXQgc2hhZG93ID0gMS4wIC0gcmVjZWl2ZVNoYWRvdyAqICggMS4wIC0gKCAwLjUgKyAwLjUgKiBhdHRlbiApICk7XFxuICAgICAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSBnZXRMaWdodEludGVuc2l0eSggZGlyZWN0TGlnaHQsIGdlb21ldHJ5LCBzaGFkb3csIHNoYWRpbmdHcmFkZSApO1xcbiAgICAgIHZlYzMgbGlnaHRpbmcgPSBnZXRMaWdodGluZyggZGlyZWN0TGlnaHQuY29sb3IgKTtcXG4gICAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIGxpdCwgc2hhZGUsIGxpZ2h0SW50ZW5zaXR5LCBsaWdodGluZyApO1xcbiAgICAgIGxpZ2h0aW5nU3VtICs9IGxpZ2h0aW5nO1xcbiAgICB9XFxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3BfZW5kXFxuICAjZW5kaWZcXG5cXG4gIHJldHVybiBsaWdodGluZ1N1bTtcXG59XFxuXFxuLy8gPT0gcG9zdCBjb3JyZWN0aW9uID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG52b2lkIHBvc3RDb3JyZWN0aW9uKCkge1xcbiAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPGVuY29kaW5nc19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxmb2dfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8cHJlbXVsdGlwbGllZF9hbHBoYV9mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxkaXRoZXJpbmdfZnJhZ21lbnQ+XFxufVxcblxcbi8vID09IG1haW4gcHJvY2VkdXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxudm9pZCBtYWluKCkge1xcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19mcmFnbWVudD5cXG5cXG4gIHZlYzIgdXYgPSB2ZWMyKDAuNSwgMC41KTtcXG5cXG4gICNpZiBkZWZpbmVkKCBVU0VfTUFQICkgfHwgZGVmaW5lZCggVVNFX1NIQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9OT1JNQUxNQVAgKSB8fCBkZWZpbmVkKCBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfU0hBRElOR0dSQURFVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9SSU1URVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX0VNSVNTSVZFTUFQICkgfHwgZGVmaW5lZCggVVNFX09VVExJTkVXSURUSFRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfVVZBTklNTUFTS1RFWFRVUkUgKVxcbiAgICB1diA9IHZVdjtcXG5cXG4gICAgZmxvYXQgdXZBbmltTWFzayA9IDEuMDtcXG4gICAgI2lmZGVmIFVTRV9VVkFOSU1NQVNLVEVYVFVSRVxcbiAgICAgIHV2QW5pbU1hc2sgPSB0ZXh0dXJlMkQoIHV2QW5pbU1hc2tUZXh0dXJlLCB1diApLng7XFxuICAgICNlbmRpZlxcblxcbiAgICB1diA9IHV2ICsgdmVjMiggdXZBbmltT2Zmc2V0WCwgdXZBbmltT2Zmc2V0WSApICogdXZBbmltTWFzaztcXG4gICAgZmxvYXQgdXZSb3RDb3MgPSBjb3MoIHV2QW5pbVRoZXRhICogdXZBbmltTWFzayApO1xcbiAgICBmbG9hdCB1dlJvdFNpbiA9IHNpbiggdXZBbmltVGhldGEgKiB1dkFuaW1NYXNrICk7XFxuICAgIHV2ID0gbWF0MiggdXZSb3RDb3MsIHV2Um90U2luLCAtdXZSb3RTaW4sIHV2Um90Q29zICkgKiAoIHV2IC0gMC41ICkgKyAwLjU7XFxuICAjZW5kaWZcXG5cXG4gICNpZmRlZiBERUJVR19VVlxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCAwLjAsIDAuMCwgMC4wLCAxLjAgKTtcXG4gICAgI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9VVkFOSU1NQVNLVEVYVFVSRSApXFxuICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggdXYsIDAuMCwgMS4wICk7XFxuICAgICNlbmRpZlxcbiAgICByZXR1cm47XFxuICAjZW5kaWZcXG5cXG4gIHZlYzQgZGlmZnVzZUNvbG9yID0gdmVjNCggY29sb3IsIGNvbG9yQWxwaGEgKTtcXG4gIFJlZmxlY3RlZExpZ2h0IHJlZmxlY3RlZExpZ2h0ID0gUmVmbGVjdGVkTGlnaHQoIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApICk7XFxuICB2ZWMzIHRvdGFsRW1pc3NpdmVSYWRpYW5jZSA9IGVtaXNzaW9uQ29sb3I7XFxuXFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfZnJhZ21lbnQ+XFxuXFxuICAvLyAjaW5jbHVkZSA8bWFwX2ZyYWdtZW50PlxcbiAgI2lmZGVmIFVTRV9NQVBcXG4gICAgZGlmZnVzZUNvbG9yICo9IG1hcFRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggbWFwLCB1diApICk7XFxuICAjZW5kaWZcXG5cXG4gICNpbmNsdWRlIDxjb2xvcl9mcmFnbWVudD5cXG4gIC8vICNpbmNsdWRlIDxhbHBoYW1hcF9mcmFnbWVudD5cXG5cXG4gIC8vIC0tIE1Ub29uOiBhbHBoYSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgLy8gI2luY2x1ZGUgPGFscGhhdGVzdF9mcmFnbWVudD5cXG4gICNpZmRlZiBCTEVORE1PREVfQ1VUT1VUXFxuICAgIGlmICggZGlmZnVzZUNvbG9yLmEgPD0gY3V0b2ZmICkgeyBkaXNjYXJkOyB9XFxuICAgIGRpZmZ1c2VDb2xvci5hID0gMS4wO1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgQkxFTkRNT0RFX09QQVFVRVxcbiAgICBkaWZmdXNlQ29sb3IuYSA9IDEuMDtcXG4gICNlbmRpZlxcblxcbiAgI2lmIGRlZmluZWQoIE9VVExJTkUgKSAmJiBkZWZpbmVkKCBPVVRMSU5FX0NPTE9SX0ZJWEVEICkgLy8gb21pdHRpbmcgRGVidWdNb2RlXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIG91dGxpbmVDb2xvciwgZGlmZnVzZUNvbG9yLmEgKTtcXG4gICAgcG9zdENvcnJlY3Rpb24oKTtcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8c3BlY3VsYXJtYXBfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8bm9ybWFsX2ZyYWdtZW50X2JlZ2luPlxcblxcbiAgI2lmZGVmIE9VVExJTkVcXG4gICAgbm9ybWFsICo9IC0xLjA7XFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxub3JtYWxfZnJhZ21lbnRfbWFwcz5cXG5cXG4gICNpZmRlZiBPQkpFQ1RTUEFDRV9OT1JNQUxNQVBcXG5cXG4gICAgbm9ybWFsID0gdGV4dHVyZTJEKCBub3JtYWxNYXAsIHV2ICkueHl6ICogMi4wIC0gMS4wOyAvLyBvdmVycmlkZXMgYm90aCBmbGF0U2hhZGluZyBhbmQgYXR0cmlidXRlIG5vcm1hbHNcXG5cXG4gICAgI2lmZGVmIEZMSVBfU0lERURcXG5cXG4gICAgICBub3JtYWwgPSAtIG5vcm1hbDtcXG5cXG4gICAgI2VuZGlmXFxuXFxuICAgICNpZmRlZiBET1VCTEVfU0lERURcXG5cXG4gICAgICBub3JtYWwgPSBub3JtYWwgKiAoIGZsb2F0KCBnbF9Gcm9udEZhY2luZyApICogMi4wIC0gMS4wICk7XFxuXFxuICAgICNlbmRpZlxcblxcbiAgICBub3JtYWwgPSBub3JtYWxpemUoIG5vcm1hbE1hdHJpeCAqIG5vcm1hbCApO1xcblxcbiAgI2VsaWYgZGVmaW5lZCggVEFOR0VOVFNQQUNFX05PUk1BTE1BUCApXFxuXFxuICAgIHZlYzMgbWFwTiA9IHRleHR1cmUyRCggbm9ybWFsTWFwLCB1diApLnh5eiAqIDIuMCAtIDEuMDtcXG4gICAgbWFwTi54eSAqPSBub3JtYWxTY2FsZTtcXG5cXG4gICAgI2lmZGVmIFVTRV9UQU5HRU5UXFxuXFxuICAgICAgbm9ybWFsID0gbm9ybWFsaXplKCB2VEJOICogbWFwTiApO1xcblxcbiAgICAjZWxzZVxcblxcbiAgICAgIG5vcm1hbCA9IHBlcnR1cmJOb3JtYWwyQXJiKCB1diwgLXZWaWV3UG9zaXRpb24sIG5vcm1hbCwgbWFwTiApO1xcblxcbiAgICAjZW5kaWZcXG5cXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPGVtaXNzaXZlbWFwX2ZyYWdtZW50PlxcbiAgI2lmZGVmIFVTRV9FTUlTU0lWRU1BUFxcbiAgICB0b3RhbEVtaXNzaXZlUmFkaWFuY2UgKj0gZW1pc3NpdmVNYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIGVtaXNzaXZlTWFwLCB1diApICkucmdiO1xcbiAgI2VuZGlmXFxuXFxuICAjaWZkZWYgREVCVUdfTk9STUFMXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIDAuNSArIDAuNSAqIG5vcm1hbCwgMS4wICk7XFxuICAgIHJldHVybjtcXG4gICNlbmRpZlxcblxcbiAgLy8gLS0gTVRvb246IGxpZ2h0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICAvLyBhY2N1bXVsYXRpb25cXG4gIC8vICNpbmNsdWRlIDxsaWdodHNfcGhvbmdfZnJhZ21lbnQ+XFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X2JlZ2luPlxcbiAgdmVjMyBsaXQgPSBkaWZmdXNlQ29sb3IucmdiO1xcbiAgdmVjMyBzaGFkZSA9IHNoYWRlQ29sb3I7XFxuICAjaWZkZWYgVVNFX1NIQURFVEVYVFVSRVxcbiAgICBzaGFkZSAqPSBzaGFkZVRleHR1cmVUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIHNoYWRlVGV4dHVyZSwgdXYgKSApLnJnYjtcXG4gICNlbmRpZlxcblxcbiAgR2VvbWV0cmljQ29udGV4dCBnZW9tZXRyeTtcXG5cXG4gIGdlb21ldHJ5LnBvc2l0aW9uID0gLSB2Vmlld1Bvc2l0aW9uO1xcbiAgZ2VvbWV0cnkubm9ybWFsID0gbm9ybWFsO1xcbiAgZ2VvbWV0cnkudmlld0RpciA9IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xcblxcbiAgdmVjMyBsaWdodGluZyA9IGNhbGNEaXJlY3REaWZmdXNlKCB1diwgZGlmZnVzZUNvbG9yLnJnYiwgc2hhZGUsIGdlb21ldHJ5LCByZWZsZWN0ZWRMaWdodCApO1xcblxcbiAgdmVjMyBpcnJhZGlhbmNlID0gZ2V0QW1iaWVudExpZ2h0SXJyYWRpYW5jZSggYW1iaWVudExpZ2h0Q29sb3IgKTtcXG4gICNpZiAoIE5VTV9IRU1JX0xJR0hUUyA+IDAgKVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX3N0YXJ0XFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9IRU1JX0xJR0hUUzsgaSArKyApIHtcXG4gICAgICBpcnJhZGlhbmNlICs9IGdldEhlbWlzcGhlcmVMaWdodElycmFkaWFuY2UoIGhlbWlzcGhlcmVMaWdodHNbIGkgXSwgZ2VvbWV0cnkgKTtcXG4gICAgfVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wX2VuZFxcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X21hcHM+XFxuICAjaWZkZWYgVVNFX0xJR0hUTUFQXFxuICAgIHZlYzMgbGlnaHRNYXBJcnJhZGlhbmNlID0gdGV4dHVyZTJEKCBsaWdodE1hcCwgdlV2MiApLnJnYiAqIGxpZ2h0TWFwSW50ZW5zaXR5O1xcbiAgICAjaWZuZGVmIFBIWVNJQ0FMTFlfQ09SUkVDVF9MSUdIVFNcXG4gICAgICBsaWdodE1hcElycmFkaWFuY2UgKj0gUEk7IC8vIGZhY3RvciBvZiBQSSBzaG91bGQgbm90IGJlIHByZXNlbnQ7IGluY2x1ZGVkIGhlcmUgdG8gcHJldmVudCBicmVha2FnZVxcbiAgICAjZW5kaWZcXG4gICAgaXJyYWRpYW5jZSArPSBsaWdodE1hcElycmFkaWFuY2U7XFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxsaWdodHNfZnJhZ21lbnRfZW5kPlxcbiAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICs9IGluZGlyZWN0TGlnaHRJbnRlbnNpdHkgKiBpcnJhZGlhbmNlICogQlJERl9EaWZmdXNlX0xhbWJlcnQoIGxpdCApO1xcblxcbiAgLy8gbW9kdWxhdGlvblxcbiAgI2luY2x1ZGUgPGFvbWFwX2ZyYWdtZW50PlxcblxcbiAgdmVjMyBjb2wgPSByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICsgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlO1xcblxcbiAgI2lmIGRlZmluZWQoIE9VVExJTkUgKSAmJiBkZWZpbmVkKCBPVVRMSU5FX0NPTE9SX01JWEVEIClcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChcXG4gICAgICBvdXRsaW5lQ29sb3IucmdiICogbWl4KCB2ZWMzKCAxLjAgKSwgY29sLCBvdXRsaW5lTGlnaHRpbmdNaXggKSxcXG4gICAgICBkaWZmdXNlQ29sb3IuYVxcbiAgICApO1xcbiAgICBwb3N0Q29ycmVjdGlvbigpO1xcbiAgICByZXR1cm47XFxuICAjZW5kaWZcXG5cXG4gICNpZmRlZiBERUJVR19MSVRTSEFERVJBVEVcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggY29sLCBkaWZmdXNlQ29sb3IuYSApO1xcbiAgICBwb3N0Q29ycmVjdGlvbigpO1xcbiAgICByZXR1cm47XFxuICAjZW5kaWZcXG5cXG4gIC8vIC0tIE1Ub29uOiBwYXJhbWV0cmljIHJpbSBsaWdodGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgdmVjMyB2aWV3RGlyID0gbm9ybWFsaXplKCB2Vmlld1Bvc2l0aW9uICk7XFxuICB2ZWMzIHJpbU1peCA9IG1peCh2ZWMzKDEuMCksIGxpZ2h0aW5nICsgaW5kaXJlY3RMaWdodEludGVuc2l0eSAqIGlycmFkaWFuY2UsIHJpbUxpZ2h0aW5nTWl4KTtcXG4gIHZlYzMgcmltID0gcmltQ29sb3IgKiBwb3coIHNhdHVyYXRlKCAxLjAgLSBkb3QoIHZpZXdEaXIsIG5vcm1hbCApICsgcmltTGlmdCApLCByaW1GcmVzbmVsUG93ZXIgKTtcXG4gICNpZmRlZiBVU0VfUklNVEVYVFVSRVxcbiAgICByaW0gKj0gcmltVGV4dHVyZVRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggcmltVGV4dHVyZSwgdXYgKSApLnJnYjtcXG4gICNlbmRpZlxcbiAgY29sICs9IHJpbTtcXG5cXG4gIC8vIC0tIE1Ub29uOiBhZGRpdGl2ZSBtYXRjYXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgI2lmZGVmIFVTRV9TUEhFUkVBRERcXG4gICAge1xcbiAgICAgIHZlYzMgeCA9IG5vcm1hbGl6ZSggdmVjMyggdmlld0Rpci56LCAwLjAsIC12aWV3RGlyLnggKSApO1xcbiAgICAgIHZlYzMgeSA9IGNyb3NzKCB2aWV3RGlyLCB4ICk7IC8vIGd1YXJhbnRlZWQgdG8gYmUgbm9ybWFsaXplZFxcbiAgICAgIHZlYzIgc3BoZXJlVXYgPSAwLjUgKyAwLjUgKiB2ZWMyKCBkb3QoIHgsIG5vcm1hbCApLCAtZG90KCB5LCBub3JtYWwgKSApO1xcbiAgICAgIHZlYzMgbWF0Y2FwID0gc3BoZXJlQWRkVGV4ZWxUb0xpbmVhciggdGV4dHVyZTJEKCBzcGhlcmVBZGQsIHNwaGVyZVV2ICkgKS54eXo7XFxuICAgICAgY29sICs9IG1hdGNhcDtcXG4gICAgfVxcbiAgI2VuZGlmXFxuXFxuICAvLyAtLSBNVG9vbjogRW1pc3Npb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIGNvbCArPSB0b3RhbEVtaXNzaXZlUmFkaWFuY2U7XFxuXFxuICAvLyAjaW5jbHVkZSA8ZW52bWFwX2ZyYWdtZW50PlxcblxcbiAgLy8gLS0gQWxtb3N0IGRvbmUhIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIGRpZmZ1c2VDb2xvci5hICk7XFxuICBwb3N0Q29ycmVjdGlvbigpO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIi8vICNkZWZpbmUgUEhPTkdcXG5cXG52YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcXG5cXG4jaWZuZGVmIEZMQVRfU0hBREVEXFxuICB2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG4jZW5kaWZcXG5cXG4jaW5jbHVkZSA8Y29tbW9uPlxcblxcbi8vICNpbmNsdWRlIDx1dl9wYXJzX3ZlcnRleD5cXG4jaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1VWQU5JTU1BU0tURVhUVVJFIClcXG4gIHZhcnlpbmcgdmVjMiB2VXY7XFxuICB1bmlmb3JtIHZlYzQgbWFpblRleF9TVDtcXG4jZW5kaWZcXG5cXG4jaW5jbHVkZSA8dXYyX3BhcnNfdmVydGV4Plxcbi8vICNpbmNsdWRlIDxkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXg+XFxuLy8gI2luY2x1ZGUgPGVudm1hcF9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Y29sb3JfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGZvZ19wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8bW9ycGh0YXJnZXRfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPHNraW5uaW5nX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxzaGFkb3dtYXBfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc192ZXJ0ZXg+XFxuXFxuI2lmZGVmIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBvdXRsaW5lV2lkdGhUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgb3V0bGluZVdpZHRoO1xcbnVuaWZvcm0gZmxvYXQgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xcblxcbnZvaWQgbWFpbigpIHtcXG5cXG4gIC8vICNpbmNsdWRlIDx1dl92ZXJ0ZXg+XFxuICAjaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1VWQU5JTU1BU0tURVhUVVJFIClcXG4gICAgdlV2ID0gdmVjMiggbWFpblRleF9TVC5wICogdXYueCArIG1haW5UZXhfU1QucywgbWFpblRleF9TVC5xICogdXYueSArIG1haW5UZXhfU1QudCApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8dXYyX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxjb2xvcl92ZXJ0ZXg+XFxuXFxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPG1vcnBobm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2luYmFzZV92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5vcm1hbF92ZXJ0ZXg+XFxuXFxuICAvLyB3ZSBuZWVkIHRoaXMgdG8gY29tcHV0ZSB0aGUgb3V0bGluZSBwcm9wZXJseVxcbiAgb2JqZWN0Tm9ybWFsID0gbm9ybWFsaXplKCBvYmplY3ROb3JtYWwgKTtcXG5cXG4gICNpbmNsdWRlIDxkZWZhdWx0bm9ybWFsX3ZlcnRleD5cXG5cXG4gICNpZm5kZWYgRkxBVF9TSEFERUQgLy8gTm9ybWFsIGNvbXB1dGVkIHdpdGggZGVyaXZhdGl2ZXMgd2hlbiBGTEFUX1NIQURFRFxcbiAgICB2Tm9ybWFsID0gbm9ybWFsaXplKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8YmVnaW5fdmVydGV4PlxcblxcbiAgI2luY2x1ZGUgPG1vcnBodGFyZ2V0X3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2lubmluZ192ZXJ0ZXg+XFxuICAvLyAjaW5jbHVkZSA8ZGlzcGxhY2VtZW50bWFwX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxwcm9qZWN0X3ZlcnRleD5cXG4gICNpbmNsdWRlIDxsb2dkZXB0aGJ1Zl92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3ZlcnRleD5cXG5cXG4gIHZWaWV3UG9zaXRpb24gPSAtIG12UG9zaXRpb24ueHl6O1xcblxcbiAgZmxvYXQgb3V0bGluZVRleCA9IDEuMDtcXG5cXG4gICNpZmRlZiBPVVRMSU5FXFxuICAgICNpZmRlZiBVU0VfT1VUTElORVdJRFRIVEVYVFVSRVxcbiAgICAgIG91dGxpbmVUZXggPSB0ZXh0dXJlMkQoIG91dGxpbmVXaWR0aFRleHR1cmUsIHZVdiApLnI7XFxuICAgICNlbmRpZlxcblxcbiAgICAjaWZkZWYgT1VUTElORV9XSURUSF9XT1JMRFxcbiAgICAgIGZsb2F0IHdvcmxkTm9ybWFsTGVuZ3RoID0gbGVuZ3RoKCB0cmFuc2Zvcm1lZE5vcm1hbCApO1xcbiAgICAgIHZlYzMgb3V0bGluZU9mZnNldCA9IDAuMDEgKiBvdXRsaW5lV2lkdGggKiBvdXRsaW5lVGV4ICogd29ybGROb3JtYWxMZW5ndGggKiBvYmplY3ROb3JtYWw7XFxuICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggb3V0bGluZU9mZnNldCArIHRyYW5zZm9ybWVkLCAxLjAgKTtcXG4gICAgI2VuZGlmXFxuXFxuICAgICNpZmRlZiBPVVRMSU5FX1dJRFRIX1NDUkVFTlxcbiAgICAgIHZlYzMgY2xpcE5vcm1hbCA9ICggcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIG9iamVjdE5vcm1hbCwgMC4wICkgKS54eXo7XFxuICAgICAgdmVjMiBwcm9qZWN0ZWROb3JtYWwgPSBub3JtYWxpemUoIGNsaXBOb3JtYWwueHkgKTtcXG4gICAgICBwcm9qZWN0ZWROb3JtYWwgKj0gbWluKCBnbF9Qb3NpdGlvbi53LCBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgKTtcXG4gICAgICBwcm9qZWN0ZWROb3JtYWwueCAqPSBwcm9qZWN0aW9uTWF0cml4WyAwIF0ueCAvIHByb2plY3Rpb25NYXRyaXhbIDEgXS55O1xcbiAgICAgIGdsX1Bvc2l0aW9uLnh5ICs9IDAuMDEgKiBvdXRsaW5lV2lkdGggKiBvdXRsaW5lVGV4ICogcHJvamVjdGVkTm9ybWFsLnh5O1xcbiAgICAjZW5kaWZcXG5cXG4gICAgZ2xfUG9zaXRpb24ueiArPSAxRS02ICogZ2xfUG9zaXRpb24udzsgLy8gYW50aS1hcnRpZmFjdCBtYWdpY1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8d29ybGRwb3NfdmVydGV4PlxcbiAgLy8gI2luY2x1ZGUgPGVudm1hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2hhZG93bWFwX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxmb2dfdmVydGV4Plxcblxcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNpZmRlZiBSRU5ERVJUWVBFX0NVVE9VVFxcbiAgdW5pZm9ybSBmbG9hdCBjdXRvZmY7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPGNvbW1vbj5cXG4jaW5jbHVkZSA8Y29sb3JfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8dXZfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8dXYyX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPG1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxhbHBoYW1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxhb21hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxsaWdodG1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8Zm9nX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19wYXJzX2ZyYWdtZW50Plxcblxcbi8vID09IG1haW4gcHJvY2VkdXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxudm9pZCBtYWluKCkge1xcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19mcmFnbWVudD5cXG5cXG4gIHZlYzQgZGlmZnVzZUNvbG9yID0gdmVjNCggMS4wICk7XFxuXFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfZnJhZ21lbnQ+XFxuXFxuICAvLyAjaW5jbHVkZSA8bWFwX2ZyYWdtZW50PlxcbiAgI2lmZGVmIFVTRV9NQVBcXG4gICAgZGlmZnVzZUNvbG9yICo9IG1hcFRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggbWFwLCB2VXYgKSApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8Y29sb3JfZnJhZ21lbnQ+XFxuICAvLyAjaW5jbHVkZSA8YWxwaGFtYXBfZnJhZ21lbnQ+XFxuXFxuICAvLyBNVG9vbjogYWxwaGFcXG4gIC8vICNpbmNsdWRlIDxhbHBoYXRlc3RfZnJhZ21lbnQ+XFxuICAjaWZkZWYgUkVOREVSVFlQRV9DVVRPVVRcXG4gICAgaWYgKCBkaWZmdXNlQ29sb3IuYSA8PSBjdXRvZmYgKSB7IGRpc2NhcmQ7IH1cXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gICNpZmRlZiBSRU5ERVJUWVBFX09QQVFVRVxcbiAgICBkaWZmdXNlQ29sb3IuYSA9IDEuMDtcXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX2ZyYWdtZW50PlxcblxcbiAgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgPSBSZWZsZWN0ZWRMaWdodCggdmVjMyggMC4wICksIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICkgKTtcXG5cXG4gIC8vIGFjY3VtdWxhdGlvbiAoYmFrZWQgaW5kaXJlY3QgbGlnaHRpbmcgb25seSlcXG4gICNpZmRlZiBVU0VfTElHSFRNQVBcXG4gICAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICs9IHRleHR1cmUyRCggbGlnaHRNYXAsIHZVdjIgKS54eXogKiBsaWdodE1hcEludGVuc2l0eTtcXG4gICNlbHNlXFxuICAgIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSB2ZWMzKCAxLjAgKTtcXG4gICNlbmRpZlxcblxcbiAgLy8gbW9kdWxhdGlvblxcbiAgLy8gI2luY2x1ZGUgPGFvbWFwX2ZyYWdtZW50PlxcblxcbiAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICo9IGRpZmZ1c2VDb2xvci5yZ2I7XFxuICB2ZWMzIG91dGdvaW5nTGlnaHQgPSByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2U7XFxuXFxuICAvLyAjaW5jbHVkZSA8ZW52bWFwX2ZyYWdtZW50PlxcblxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggb3V0Z29pbmdMaWdodCwgZGlmZnVzZUNvbG9yLmEgKTtcXG5cXG4gICNpbmNsdWRlIDxwcmVtdWx0aXBsaWVkX2FscGhhX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPGVuY29kaW5nc19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxmb2dfZnJhZ21lbnQ+XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2luY2x1ZGUgPGNvbW1vbj5cXG5cXG4vLyAjaW5jbHVkZSA8dXZfcGFyc192ZXJ0ZXg+XFxuI2lmZGVmIFVTRV9NQVBcXG4gIHZhcnlpbmcgdmVjMiB2VXY7XFxuICB1bmlmb3JtIHZlYzQgbWFpblRleF9TVDtcXG4jZW5kaWZcXG5cXG4jaW5jbHVkZSA8dXYyX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxlbnZtYXBfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxmb2dfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPG1vcnBodGFyZ2V0X3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxza2lubmluZ19wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8bG9nZGVwdGhidWZfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19wYXJzX3ZlcnRleD5cXG5cXG52b2lkIG1haW4oKSB7XFxuXFxuICAvLyAjaW5jbHVkZSA8dXZfdmVydGV4PlxcbiAgI2lmZGVmIFVTRV9NQVBcXG4gICAgdlV2ID0gdmVjMiggbWFpblRleF9TVC5wICogdXYueCArIG1haW5UZXhfU1QucywgbWFpblRleF9TVC5xICogdXYueSArIG1haW5UZXhfU1QudCApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8dXYyX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxjb2xvcl92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbmJhc2VfdmVydGV4PlxcblxcbiAgI2lmZGVmIFVTRV9FTlZNQVBcXG5cXG4gICNpbmNsdWRlIDxiZWdpbm5vcm1hbF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8bW9ycGhub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNraW5ub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGRlZmF1bHRub3JtYWxfdmVydGV4PlxcblxcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8YmVnaW5fdmVydGV4PlxcbiAgI2luY2x1ZGUgPG1vcnBodGFyZ2V0X3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2lubmluZ192ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8cHJvamVjdF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfdmVydGV4PlxcblxcbiAgI2luY2x1ZGUgPHdvcmxkcG9zX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGVudm1hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Zm9nX3ZlcnRleD5cXG5cXG59XCI7IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU2NoZW1hIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgVlJNTWV0YSB9IGZyb20gJy4vVlJNTWV0YSc7XG5pbXBvcnQgeyBWUk1NZXRhSW1wb3J0ZXJPcHRpb25zIH0gZnJvbSAnLi9WUk1NZXRhSW1wb3J0ZXJPcHRpb25zJztcblxuLyoqXG4gKiBBbiBpbXBvcnRlciB0aGF0IGltcG9ydHMgYSB7QGxpbmsgVlJNTWV0YX0gZnJvbSBhIFZSTSBleHRlbnNpb24gb2YgYSBHTFRGLlxuICovXG5leHBvcnQgY2xhc3MgVlJNTWV0YUltcG9ydGVyIHtcbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgaXQgd29uJ3QgbG9hZCBpdHMgdGh1bWJuYWlsIHRleHR1cmUgKHtAbGluayBWUk1NZXRhLnRleHR1cmV9KS4gYGZhbHNlYCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHVibGljIGlnbm9yZVRleHR1cmU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucz86IFZSTU1ldGFJbXBvcnRlck9wdGlvbnMpIHtcbiAgICB0aGlzLmlnbm9yZVRleHR1cmUgPSBvcHRpb25zPy5pZ25vcmVUZXh0dXJlID8/IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGltcG9ydChnbHRmOiBHTFRGKTogUHJvbWlzZTxWUk1NZXRhIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzY2hlbWFNZXRhOiBWUk1TY2hlbWEuTWV0YSB8IHVuZGVmaW5lZCA9IHZybUV4dC5tZXRhO1xuICAgIGlmICghc2NoZW1hTWV0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIGlmICghdGhpcy5pZ25vcmVUZXh0dXJlICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPSBudWxsICYmIHNjaGVtYU1ldGEudGV4dHVyZSAhPT0gLTEpIHtcbiAgICAgIHRleHR1cmUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCd0ZXh0dXJlJywgc2NoZW1hTWV0YS50ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWxsb3dlZFVzZXJOYW1lOiBzY2hlbWFNZXRhLmFsbG93ZWRVc2VyTmFtZSxcbiAgICAgIGF1dGhvcjogc2NoZW1hTWV0YS5hdXRob3IsXG4gICAgICBjb21tZXJjaWFsVXNzYWdlTmFtZTogc2NoZW1hTWV0YS5jb21tZXJjaWFsVXNzYWdlTmFtZSxcbiAgICAgIGNvbnRhY3RJbmZvcm1hdGlvbjogc2NoZW1hTWV0YS5jb250YWN0SW5mb3JtYXRpb24sXG4gICAgICBsaWNlbnNlTmFtZTogc2NoZW1hTWV0YS5saWNlbnNlTmFtZSxcbiAgICAgIG90aGVyTGljZW5zZVVybDogc2NoZW1hTWV0YS5vdGhlckxpY2Vuc2VVcmwsXG4gICAgICBvdGhlclBlcm1pc3Npb25Vcmw6IHNjaGVtYU1ldGEub3RoZXJQZXJtaXNzaW9uVXJsLFxuICAgICAgcmVmZXJlbmNlOiBzY2hlbWFNZXRhLnJlZmVyZW5jZSxcbiAgICAgIHNleHVhbFVzc2FnZU5hbWU6IHNjaGVtYU1ldGEuc2V4dWFsVXNzYWdlTmFtZSxcbiAgICAgIHRleHR1cmU6IHRleHR1cmUgPz8gdW5kZWZpbmVkLFxuICAgICAgdGl0bGU6IHNjaGVtYU1ldGEudGl0bGUsXG4gICAgICB2ZXJzaW9uOiBzY2hlbWFNZXRhLnZlcnNpb24sXG4gICAgICB2aW9sZW50VXNzYWdlTmFtZTogc2NoZW1hTWV0YS52aW9sZW50VXNzYWdlTmFtZSxcbiAgICB9O1xuICB9XG59XG4iLCJleHBvcnQgeyBWUk1NZXRhIH0gZnJvbSAnLi9WUk1NZXRhJztcbmV4cG9ydCB7IFZSTU1ldGFJbXBvcnRlciB9IGZyb20gJy4vVlJNTWV0YUltcG9ydGVyJztcbmV4cG9ydCB7IFZSTU1ldGFJbXBvcnRlck9wdGlvbnMgfSBmcm9tICcuL1ZSTU1ldGFJbXBvcnRlck9wdGlvbnMnO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuaW1wb3J0IHsgTWF0cml4NEludmVyc2VDYWNoZSB9IGZyb20gJy4uL3V0aWxzL01hdHJpeDRJbnZlcnNlQ2FjaGUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzJztcbi8vIGJhc2VkIG9uXG4vLyBodHRwOi8vcm9ja2V0anVtcC5za3IuanAvdW5pdHkzZC8xMDkvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9ibG9iL21hc3Rlci9TY3JpcHRzL1NwcmluZ0JvbmUvVlJNU3ByaW5nQm9uZS5jc1xuXG5jb25zdCBJREVOVElUWV9NQVRSSVg0ID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuTWF0cml4NCgpKTtcbmNvbnN0IElERU5USVRZX1FVQVRFUk5JT04gPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkpO1xuXG4vLyDoqIjnrpfkuK3jga7kuIDmmYLkv53lrZjnlKjlpInmlbDvvIjkuIDluqbjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzjgaPjgZ/jgonjgYLjgajjga/kvb/jgYTlm57jgZnvvIlcbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfbWF0QiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIHNwcmluZyBib25lIG9mIGEgVlJNLlxuICogSXQgc2hvdWxkIGJlIG1hbmFnZWQgYnkgYSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lIHtcbiAgLyoqXG4gICAqIFJhZGl1cyBvZiB0aGUgYm9uZSwgd2lsbCBiZSB1c2VkIGZvciBjb2xsaXNpb24uXG4gICAqL1xuICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN0aWZmbmVzcyBmb3JjZSBvZiB0aGUgYm9uZS4gSW5jcmVhc2luZyB0aGUgdmFsdWUgPSBmYXN0ZXIgY29udmVyZ2VuY2UgKGZlZWxzIFwiaGFyZGVyXCIpLlxuICAgKiBPbiBVbmlWUk0sIGl0cyByYW5nZSBvbiBHVUkgaXMgYmV0d2VlbiBgMC4wYCBhbmQgYDQuMGAgLlxuICAgKi9cbiAgcHVibGljIHN0aWZmbmVzc0ZvcmNlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFBvd2VyIG9mIHRoZSBncmF2aXR5IGFnYWluc3QgdGhpcyBib25lLlxuICAgKiBUaGUgXCJwb3dlclwiIHVzZWQgaW4gaGVyZSBpcyB2ZXJ5IGZhciBmcm9tIHNjaWVudGlmaWMgcGh5c2ljcyB0ZXJtLi4uXG4gICAqL1xuICBwdWJsaWMgZ3Jhdml0eVBvd2VyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERpcmVjdGlvbiBvZiB0aGUgZ3Jhdml0eSBhZ2FpbnN0IHRoaXMgYm9uZS5cbiAgICogVXN1YWxseSBpdCBzaG91bGQgYmUgbm9ybWFsaXplZC5cbiAgICovXG4gIHB1YmxpYyBncmF2aXR5RGlyOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBEcmFnIGZvcmNlIG9mIHRoZSBib25lLiBJbmNyZWFzaW5nIHRoZSB2YWx1ZSA9IGxlc3Mgb3NjaWxsYXRpb24gKGZlZWxzIFwiaGVhdmllclwiKS5cbiAgICogT24gVW5pVlJNLCBpdHMgcmFuZ2Ugb24gR1VJIGlzIGJldHdlZW4gYDAuMGAgYW5kIGAxLjBgIC5cbiAgICovXG4gIHB1YmxpYyBkcmFnRm9yY2U6IG51bWJlcjtcblxuICAvKipcbiAgICogQ29sbGlkZXIgZ3JvdXBzIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyBjb2xsaWRlcnM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2hbXTtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jdXJyZW50VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIFByZXZpb3VzIHBvc2l0aW9uIG9mIGNoaWxkIHRhaWwsIGluIHdvcmxkIHVuaXQuIFdpbGwgYmUgdXNlZCBmb3IgdmVybGV0IGludGVncmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9wcmV2VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIE5leHQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gd29ybGQgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqIEFjdHVhbGx5IHVzZWQgb25seSBpbiBbW3VwZGF0ZV1dIGFuZCBpdCdzIGtpbmQgb2YgdGVtcG9yYXJ5IHZhcmlhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9uZXh0VGFpbCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgYXhpcyBvZiB0aGUgYm9uZSwgaW4gbG9jYWwgdW5pdC5cbiAgICovXG4gIHByb3RlY3RlZCBfYm9uZUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBMZW5ndGggb2YgdGhlIGJvbmUgaW4gcmVsYXRpdmUgc3BhY2UgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciBub3JtYWxpemF0aW9uIGluIHVwZGF0ZSBsb29wLlxuICAgKiBJdCdzIHNhbWUgYXMgbG9jYWwgdW5pdCBsZW5ndGggdW5sZXNzIHRoZXJlIGFyZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbiBpbiB3b3JsZCBtYXRyaXguXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NlbnRlclNwYWNlQm9uZUxlbmd0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiB0aGlzIGJvbmUgaW4gcmVsYXRpdmUgc3BhY2UsIGtpbmQgb2YgYSB0ZW1wb3JhcnkgdmFyaWFibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NlbnRlclNwYWNlUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBUaGlzIHNwcmluZ2JvbmUgd2lsbCBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBzcGFjZSByZWxhdGl2ZSBmcm9tIHRoaXMgb2JqZWN0LlxuICAgKiBJZiB0aGlzIGlzIGBudWxsYCwgc3ByaW5nYm9uZSB3aWxsIGJlIGNhbGN1bGF0ZWQgaW4gd29ybGQgc3BhY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NlbnRlcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGdldCBjZW50ZXIoKTogVEhSRUUuT2JqZWN0M0QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xuICB9XG4gIHB1YmxpYyBzZXQgY2VudGVyKGNlbnRlcjogVEhSRUUuT2JqZWN0M0QgfCBudWxsKSB7XG4gICAgLy8gY29udmVydCB0YWlscyB0byB3b3JsZCBzcGFjZVxuICAgIHRoaXMuX2dldE1hdHJpeENlbnRlclRvV29ybGQoX21hdEEpO1xuXG4gICAgdGhpcy5fY3VycmVudFRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuICAgIHRoaXMuX25leHRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG5cbiAgICAvLyB1bmluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXI/LnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAodGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5IGFzIE1hdHJpeDRJbnZlcnNlQ2FjaGUpLnJldmVydCgpO1xuICAgICAgZGVsZXRlIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIGNlbnRlclxuICAgIHRoaXMuX2NlbnRlciA9IGNlbnRlcjtcblxuICAgIC8vIGluc3RhbGwgaW52ZXJzZSBjYWNoZVxuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fY2VudGVyLnVzZXJEYXRhLmludmVyc2VDYWNoZVByb3h5KSB7XG4gICAgICAgIHRoaXMuX2NlbnRlci51c2VyRGF0YS5pbnZlcnNlQ2FjaGVQcm94eSA9IG5ldyBNYXRyaXg0SW52ZXJzZUNhY2hlKHRoaXMuX2NlbnRlci5tYXRyaXhXb3JsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29udmVydCB0YWlscyB0byBjZW50ZXIgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcblxuICAgIHRoaXMuX2N1cnJlbnRUYWlsLmFwcGx5TWF0cml4NChfbWF0QSk7XG4gICAgdGhpcy5fcHJldlRhaWwuYXBwbHlNYXRyaXg0KF9tYXRBKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5hcHBseU1hdHJpeDQoX21hdEEpO1xuXG4gICAgLy8gY29udmVydCBjZW50ZXIgc3BhY2UgZGVwZW5kYW50IHN0YXRlXG4gICAgX21hdEEubXVsdGlwbHkodGhpcy5ib25lLm1hdHJpeFdvcmxkKTsgLy8g8J+UpSA/P1xuXG4gICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xuXG4gICAgdGhpcy5fY2VudGVyU3BhY2VCb25lTGVuZ3RoID0gX3YzQVxuICAgICAgLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbilcbiAgICAgIC5hcHBseU1hdHJpeDQoX21hdEEpXG4gICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAubGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRpb24gb2YgcGFyZW50IGJvbmUsIGluIHdvcmxkIHVuaXQuXG4gICAqIFdlIHNob3VsZCB1cGRhdGUgdGhpcyBjb25zdGFudGx5IGluIFtbdXBkYXRlXV0uXG4gICAqL1xuICBwcml2YXRlIF9wYXJlbnRXb3JsZFJvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgbG9jYWwgbWF0cml4IG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKTtcblxuICAvKipcbiAgICogSW5pdGlhbCBzdGF0ZSBvZiB0aGUgcm90YXRpb24gb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHBvc2l0aW9uIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNU3ByaW5nQm9uZS5cbiAgICpcbiAgICogQHBhcmFtIGJvbmUgQW4gT2JqZWN0M0QgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoaXMgYm9uZVxuICAgKiBAcGFyYW0gcGFyYW1zIFNldmVyYWwgcGFyYW1ldGVycyByZWxhdGVkIHRvIGJlaGF2aW9yIG9mIHRoZSBzcHJpbmcgYm9uZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYm9uZTogVEhSRUUuT2JqZWN0M0QsIHBhcmFtczogVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMgPSB7fSkge1xuICAgIHRoaXMuYm9uZSA9IGJvbmU7IC8vIHVuaVZSTeOBp+OBriBwYXJlbnRcbiAgICB0aGlzLmJvbmUubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlOyAvLyB1cGRhdGXjgavjgojjgoroqIjnrpfjgZXjgozjgovjga7jgad0aHJlZS5qc+WGheOBp+OBruiHquWLleWHpueQhuOBr+S4jeimgVxuXG4gICAgdGhpcy5yYWRpdXMgPSBwYXJhbXMucmFkaXVzID8/IDAuMDI7XG4gICAgdGhpcy5zdGlmZm5lc3NGb3JjZSA9IHBhcmFtcy5zdGlmZm5lc3NGb3JjZSA/PyAxLjA7XG4gICAgdGhpcy5ncmF2aXR5RGlyID0gcGFyYW1zLmdyYXZpdHlEaXJcbiAgICAgID8gbmV3IFRIUkVFLlZlY3RvcjMoKS5jb3B5KHBhcmFtcy5ncmF2aXR5RGlyKVxuICAgICAgOiBuZXcgVEhSRUUuVmVjdG9yMygpLnNldCgwLjAsIC0xLjAsIDAuMCk7XG4gICAgdGhpcy5ncmF2aXR5UG93ZXIgPSBwYXJhbXMuZ3Jhdml0eVBvd2VyID8/IDAuMDtcbiAgICB0aGlzLmRyYWdGb3JjZSA9IHBhcmFtcy5kcmFnRm9yY2UgPz8gMC40O1xuICAgIHRoaXMuY29sbGlkZXJzID0gcGFyYW1zLmNvbGxpZGVycyA/PyBbXTtcblxuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG5cbiAgICB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXguY29weSh0aGlzLmJvbmUubWF0cml4KTtcbiAgICB0aGlzLl9pbml0aWFsTG9jYWxSb3RhdGlvbi5jb3B5KHRoaXMuYm9uZS5xdWF0ZXJuaW9uKTtcblxuICAgIGlmICh0aGlzLmJvbmUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyDmnKvnq6/jga7jg5zjg7zjg7PjgILlrZDjg5zjg7zjg7PjgYzjgYTjgarjgYTjgZ/jgoHjgIzoh6rliIbjga7lsJHjgZflhYjjgI3jgYzlrZDjg5zjg7zjg7PjgajjgYTjgYbjgZPjgajjgavjgZnjgotcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzI0wyNDZcbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb25cbiAgICAgICAgLmNvcHkodGhpcy5ib25lLnBvc2l0aW9uKVxuICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgLm11bHRpcGx5U2NhbGFyKDAuMDcpOyAvLyBtYWdpYyBudW1iZXIhIGRlcml2ZXMgZnJvbSBvcmlnaW5hbCBzb3VyY2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IHRoaXMuYm9uZS5jaGlsZHJlblswXTtcbiAgICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY29weShmaXJzdENoaWxkLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2N1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpO1xuICAgIHRoaXMuX3ByZXZUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuICAgIHRoaXMuX25leHRUYWlsLmNvcHkodGhpcy5fY3VycmVudFRhaWwpO1xuXG4gICAgdGhpcy5fYm9uZUF4aXMuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGggPSBfdjNBXG4gICAgICAuY29weSh0aGlzLl9pbml0aWFsTG9jYWxDaGlsZFBvc2l0aW9uKVxuICAgICAgLmFwcGx5TWF0cml4NCh0aGlzLmJvbmUubWF0cml4V29ybGQpXG4gICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAubGVuZ3RoKCk7XG5cbiAgICB0aGlzLmNlbnRlciA9IHBhcmFtcy5jZW50ZXIgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXIucmVzZXRdXSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX2dldFBhcmVudE1hdHJpeFdvcmxkKCksIHRoaXMuYm9uZS5tYXRyaXgpO1xuICAgIHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24uc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuYm9uZS5tYXRyaXhXb3JsZCk7XG5cbiAgICAvLyBBcHBseSB1cGRhdGVkIHBvc2l0aW9uIHRvIHRhaWwgc3RhdGVzXG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLl9jdXJyZW50VGFpbC5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24pKTtcbiAgICB0aGlzLl9wcmV2VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgICB0aGlzLl9uZXh0VGFpbC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZV1dIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyDopqrjgrnjg5fjg6rjg7PjgrDjg5zjg7zjg7Pjga7lp7/li6Ljga/luLjjgavlpInljJbjgZfjgabjgYTjgovjgIJcbiAgICAvLyDjgZ3jgozjgavln7rjgaXjgYTjgablh6bnkIbnm7TliY3jgavoh6rliIbjga53b3JsZE1hdHJpeOOCkuabtOaWsOOBl+OBpuOBiuOBj1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuX2dldFBhcmVudE1hdHJpeFdvcmxkKCksIHRoaXMuYm9uZS5tYXRyaXgpO1xuXG4gICAgaWYgKHRoaXMuYm9uZS5wYXJlbnQpIHtcbiAgICAgIC8vIFNwcmluZ0JvbmXjga/opqrjgYvjgonpoIbjgavlh6bnkIbjgZXjgozjgabjgYTjgY/jgZ/jgoHjgIFcbiAgICAgIC8vIOimquOBrm1hdHJpeFdvcmxk44Gv5pyA5paw54q25oWL44Gu5YmN5o+Q44Gnd29ybGRNYXRyaXjjgYvjgolxdWF0ZXJuaW9u44KS5Y+W44KK5Ye644GZ44CCXG4gICAgICAvLyDliLbpmZDjga/jgYLjgovjgZHjgozjganjgIHoqIjnrpfjga/lsJHjgarjgYTjga7jgadnZXRXb3JsZFF1YXRlcm5pb27jgafjga/jgarjgY/jgZPjga7mlrnms5XjgpLlj5bjgovjgIJcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5ib25lLnBhcmVudCwgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb24uY29weShJREVOVElUWV9RVUFURVJOSU9OKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgYm9uZSBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRBKTtcbiAgICBfbWF0QS5tdWx0aXBseSh0aGlzLmJvbmUubWF0cml4V29ybGQpOyAvLyDwn5SlID8/XG4gICAgdGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xuXG4gICAgLy8gR2V0IHBhcmVudCBwb3NpdGlvbiBpbiBjZW50ZXIgc3BhY2VcbiAgICB0aGlzLl9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKF9tYXRCKTtcbiAgICBfbWF0Qi5tdWx0aXBseSh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpKTtcblxuICAgIC8vIHNldmVyYWwgcGFyYW1ldGVyc1xuICAgIGNvbnN0IHN0aWZmbmVzcyA9IHRoaXMuc3RpZmZuZXNzRm9yY2UgKiBkZWx0YTtcbiAgICBjb25zdCBleHRlcm5hbCA9IF92M0IuY29weSh0aGlzLmdyYXZpdHlEaXIpLm11bHRpcGx5U2NhbGFyKHRoaXMuZ3Jhdml0eVBvd2VyICogZGVsdGEpO1xuXG4gICAgLy8gdmVybGV056mN5YiG44Gn5qyh44Gu5L2N572u44KS6KiI566XXG4gICAgdGhpcy5fbmV4dFRhaWxcbiAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxuICAgICAgLmFkZChcbiAgICAgICAgX3YzQVxuICAgICAgICAgIC5jb3B5KHRoaXMuX2N1cnJlbnRUYWlsKVxuICAgICAgICAgIC5zdWIodGhpcy5fcHJldlRhaWwpXG4gICAgICAgICAgLm11bHRpcGx5U2NhbGFyKDEgLSB0aGlzLmRyYWdGb3JjZSksXG4gICAgICApIC8vIOWJjeODleODrOODvOODoOOBruenu+WLleOCkue2mee2muOBmeOCiyjmuJvoobDjgoLjgYLjgovjgogpXG4gICAgICAuYWRkKFxuICAgICAgICBfdjNBXG4gICAgICAgICAgLmNvcHkodGhpcy5fYm9uZUF4aXMpXG4gICAgICAgICAgLmFwcGx5TWF0cml4NCh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpXG4gICAgICAgICAgLmFwcGx5TWF0cml4NChfbWF0QilcbiAgICAgICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgLm11bHRpcGx5U2NhbGFyKHN0aWZmbmVzcyksXG4gICAgICApIC8vIOimquOBruWbnui7ouOBq+OCiOOCi+WtkOODnOODvOODs+OBruenu+WLleebruaomVxuICAgICAgLmFkZChleHRlcm5hbCk7IC8vIOWkluWKm+OBq+OCiOOCi+enu+WLlemHj1xuXG4gICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgdGhpcy5fbmV4dFRhaWxcbiAgICAgIC5zdWIodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbilcbiAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgLm11bHRpcGx5U2NhbGFyKHRoaXMuX2NlbnRlclNwYWNlQm9uZUxlbmd0aClcbiAgICAgIC5hZGQodGhpcy5fY2VudGVyU3BhY2VQb3NpdGlvbik7XG5cbiAgICAvLyBDb2xsaXNpb27jgafnp7vli5VcbiAgICB0aGlzLl9jb2xsaXNpb24odGhpcy5fbmV4dFRhaWwpO1xuXG4gICAgdGhpcy5fcHJldlRhaWwuY29weSh0aGlzLl9jdXJyZW50VGFpbCk7XG4gICAgdGhpcy5fY3VycmVudFRhaWwuY29weSh0aGlzLl9uZXh0VGFpbCk7XG5cbiAgICAvLyBBcHBseSByb3RhdGlvbiwgY29udmVydCB2ZWN0b3IzIHRoaW5nIGludG8gYWN0dWFsIHF1YXRlcm5pb25cbiAgICAvLyBPcmlnaW5hbCBVbmlWUk0gaXMgZG9pbmcgd29ybGQgdW5pdCBjYWxjdWx1cyBhdCBoZXJlIGJ1dCB3ZSdyZSBnb25uYSBkbyB0aGlzIG9uIGxvY2FsIHVuaXRcbiAgICAvLyBzaW5jZSBUaHJlZS5qcyBpcyBub3QgZ29vZCBhdCB3b3JsZCBjb29yZGluYXRpb24gc3R1ZmZcbiAgICBjb25zdCBpbml0aWFsQ2VudGVyU3BhY2VNYXRyaXhJbnYgPSBfbWF0QS5nZXRJbnZlcnNlKF9tYXRCLm11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeCkpO1xuICAgIGNvbnN0IGFwcGx5Um90YXRpb24gPSBfcXVhdEEuc2V0RnJvbVVuaXRWZWN0b3JzKFxuICAgICAgdGhpcy5fYm9uZUF4aXMsXG4gICAgICBfdjNBXG4gICAgICAgIC5jb3B5KHRoaXMuX25leHRUYWlsKVxuICAgICAgICAuYXBwbHlNYXRyaXg0KGluaXRpYWxDZW50ZXJTcGFjZU1hdHJpeEludilcbiAgICAgICAgLm5vcm1hbGl6ZSgpLFxuICAgICk7XG5cbiAgICB0aGlzLmJvbmUucXVhdGVybmlvbi5jb3B5KHRoaXMuX2luaXRpYWxMb2NhbFJvdGF0aW9uKS5tdWx0aXBseShhcHBseVJvdGF0aW9uKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGl0cyBtYXRyaXhXb3JsZCBtYW51YWxseSwgc2luY2Ugd2UgdHdlYWtlZCB0aGUgYm9uZSBieSBvdXIgaGFuZFxuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLl9nZXRQYXJlbnRNYXRyaXhXb3JsZCgpLCB0aGlzLmJvbmUubWF0cml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEbyBjb2xsaXNpb24gbWF0aCBhZ2FpbnN0IGV2ZXJ5IGNvbGxpZGVycyBhdHRhY2hlZCB0byB0aGlzIGJvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB0YWlsIFRoZSB0YWlsIHlvdSB3YW50IHRvIHByb2Nlc3NcbiAgICovXG4gIHByaXZhdGUgX2NvbGxpc2lvbih0YWlsOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgIHRoaXMuX2dldE1hdHJpeFdvcmxkVG9DZW50ZXIoX21hdEEpO1xuICAgICAgX21hdEEubXVsdGlwbHkoY29sbGlkZXIubWF0cml4V29ybGQpO1xuICAgICAgY29uc3QgY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uID0gX3YzQS5zZXRGcm9tTWF0cml4UG9zaXRpb24oX21hdEEpO1xuICAgICAgY29uc3QgY29sbGlkZXJSYWRpdXMgPSBjb2xsaWRlci5nZW9tZXRyeS5ib3VuZGluZ1NwaGVyZSEucmFkaXVzOyAvLyB0aGUgYm91bmRpbmcgc3BoZXJlIGlzIGd1YXJhbnRlZWQgdG8gYmUgZXhpc3QgYnkgVlJNU3ByaW5nQm9uZUltcG9ydGVyLl9jcmVhdGVDb2xsaWRlck1lc2hcbiAgICAgIGNvbnN0IHIgPSB0aGlzLnJhZGl1cyArIGNvbGxpZGVyUmFkaXVzO1xuXG4gICAgICBpZiAodGFpbC5kaXN0YW5jZVRvU3F1YXJlZChjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pIDw9IHIgKiByKSB7XG4gICAgICAgIC8vIOODkuODg+ODiOOAgkNvbGxpZGVy44Gu5Y2K5b6E5pa55ZCR44Gr5oq844GX5Ye644GZXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IF92M0Iuc3ViVmVjdG9ycyh0YWlsLCBjb2xsaWRlckNlbnRlclNwYWNlUG9zaXRpb24pLm5vcm1hbGl6ZSgpO1xuICAgICAgICBjb25zdCBwb3NGcm9tQ29sbGlkZXIgPSBfdjNDLmFkZFZlY3RvcnMoY29sbGlkZXJDZW50ZXJTcGFjZVBvc2l0aW9uLCBub3JtYWwubXVsdGlwbHlTY2FsYXIocikpO1xuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgICAgICB0YWlsLmNvcHkoXG4gICAgICAgICAgcG9zRnJvbUNvbGxpZGVyXG4gICAgICAgICAgICAuc3ViKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pXG4gICAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcih0aGlzLl9jZW50ZXJTcGFjZUJvbmVMZW5ndGgpXG4gICAgICAgICAgICAuYWRkKHRoaXMuX2NlbnRlclNwYWNlUG9zaXRpb24pLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG1hdHJpeCB0aGF0IGNvbnZlcnRzIGNlbnRlciBzcGFjZSBpbnRvIHdvcmxkIHNwYWNlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRhcmdldCBtYXRyaXhcbiAgICovXG4gIHByaXZhdGUgX2dldE1hdHJpeENlbnRlclRvV29ybGQodGFyZ2V0OiBUSFJFRS5NYXRyaXg0KTogVEhSRUUuTWF0cml4NCB7XG4gICAgaWYgKHRoaXMuX2NlbnRlcikge1xuICAgICAgdGFyZ2V0LmNvcHkodGhpcy5fY2VudGVyLm1hdHJpeFdvcmxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmlkZW50aXR5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBtYXRyaXggdGhhdCBjb252ZXJ0cyB3b3JsZCBzcGFjZSBpbnRvIGNlbnRlciBzcGFjZS5cbiAgICogQHBhcmFtIHRhcmdldCBUYXJnZXQgbWF0cml4XG4gICAqL1xuICBwcml2YXRlIF9nZXRNYXRyaXhXb3JsZFRvQ2VudGVyKHRhcmdldDogVEhSRUUuTWF0cml4NCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9jZW50ZXIpIHtcbiAgICAgIHRhcmdldC5jb3B5KCh0aGlzLl9jZW50ZXIudXNlckRhdGEuaW52ZXJzZUNhY2hlUHJveHkgYXMgTWF0cml4NEludmVyc2VDYWNoZSkuaW52ZXJzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5pZGVudGl0eSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0UGFyZW50TWF0cml4V29ybGQoKTogVEhSRUUuTWF0cml4NCB7XG4gICAgcmV0dXJuIHRoaXMuYm9uZS5wYXJlbnQgPyB0aGlzLmJvbmUucGFyZW50Lm1hdHJpeFdvcmxkIDogSURFTlRJVFlfTUFUUklYNDtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURiB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInO1xuaW1wb3J0IHsgR0xURk5vZGUsIFZSTVNjaGVtYSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmUgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAsIFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2ggfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVHcm91cCwgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lUGFyYW1ldGVycyc7XG5cbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuXG5jb25zdCBfY29sbGlkZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IHZpc2libGU6IGZhbHNlIH0pO1xuXG4vKipcbiAqIEFuIGltcG9ydGVyIHRoYXQgaW1wb3J0cyBhIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXJdXSBmcm9tIGEgVlJNIGV4dGVuc2lvbiBvZiBhIEdMVEYuXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lSW1wb3J0ZXIge1xuICAvKipcbiAgICogSW1wb3J0IGEgW1tWUk1Mb29rQXRIZWFkXV0gZnJvbSBhIFZSTS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW1wb3J0KGdsdGY6IEdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVNYW5hZ2VyIHwgbnVsbD4ge1xuICAgIGNvbnN0IHZybUV4dDogVlJNU2NoZW1hLlZSTSB8IHVuZGVmaW5lZCA9IGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucz8uVlJNO1xuICAgIGlmICghdnJtRXh0KSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbiB8IHVuZGVmaW5lZCA9IHZybUV4dC5zZWNvbmRhcnlBbmltYXRpb247XG4gICAgaWYgKCFzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24pIHJldHVybiBudWxsO1xuXG4gICAgLy8g6KGd56qB5Yik5a6a55CD5L2T44Oh44OD44K344Ol44CCXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHMgPSBhd2FpdCB0aGlzLl9pbXBvcnRDb2xsaWRlck1lc2hHcm91cHMoZ2x0Ziwgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uKTtcblxuICAgIC8vIOWQjOOBmOWxnuaAp++8iHN0aWZmaW5lc3PjgoRkcmFnRm9yY2XjgYzlkIzjgZjvvInjga7jg5zjg7zjg7Pjga9ib25lR3JvdXDjgavjgb7jgajjgoHjgonjgozjgabjgYTjgovjgIJcbiAgICAvLyDkuIDliJfjgaDjgZHjgafjga/jgarjgYTjgZPjgajjgavms6jmhI/jgIJcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBMaXN0ID0gYXdhaXQgdGhpcy5faW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdChnbHRmLCBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24sIGNvbGxpZGVyR3JvdXBzKTtcblxuICAgIHJldHVybiBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXIoY29sbGlkZXJHcm91cHMsIHNwcmluZ0JvbmVHcm91cExpc3QpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jcmVhdGVTcHJpbmdCb25lKGJvbmU6IFRIUkVFLk9iamVjdDNELCBwYXJhbXM6IFZSTVNwcmluZ0JvbmVQYXJhbWV0ZXJzID0ge30pOiBWUk1TcHJpbmdCb25lIHtcbiAgICByZXR1cm4gbmV3IFZSTVNwcmluZ0JvbmUoYm9uZSwgcGFyYW1zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0U3ByaW5nQm9uZUdyb3VwTGlzdChcbiAgICBnbHRmOiBHTFRGLFxuICAgIHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbjogVlJNU2NoZW1hLlNlY29uZGFyeUFuaW1hdGlvbixcbiAgICBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSxcbiAgKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lR3JvdXBbXT4ge1xuICAgIGNvbnN0IHNwcmluZ0JvbmVHcm91cHM6IFZSTVNjaGVtYS5TZWNvbmRhcnlBbmltYXRpb25TcHJpbmdbXSA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5ib25lR3JvdXBzIHx8IFtdO1xuXG4gICAgY29uc3Qgc3ByaW5nQm9uZUdyb3VwTGlzdDogVlJNU3ByaW5nQm9uZUdyb3VwW10gPSBbXTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgc3ByaW5nQm9uZUdyb3Vwcy5tYXAoYXN5bmMgKHZybUJvbmVHcm91cCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdnJtQm9uZUdyb3VwLnN0aWZmaW5lc3MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci54ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci56ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eVBvd2VyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZHJhZ0ZvcmNlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuaGl0UmFkaXVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuY29sbGlkZXJHcm91cHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ib25lcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgdnJtQm9uZUdyb3VwLmNlbnRlciA9PT0gdW5kZWZpbmVkXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0aWZmbmVzc0ZvcmNlID0gdnJtQm9uZUdyb3VwLnN0aWZmaW5lc3M7XG4gICAgICAgIGNvbnN0IGdyYXZpdHlEaXIgPSBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci54LFxuICAgICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnksXG4gICAgICAgICAgLXZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnosIC8vIFZSTSAwLjAgdXNlcyBsZWZ0LWhhbmRlZCB5LXVwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGdyYXZpdHlQb3dlciA9IHZybUJvbmVHcm91cC5ncmF2aXR5UG93ZXI7XG4gICAgICAgIGNvbnN0IGRyYWdGb3JjZSA9IHZybUJvbmVHcm91cC5kcmFnRm9yY2U7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHZybUJvbmVHcm91cC5oaXRSYWRpdXM7XG5cbiAgICAgICAgY29uc3QgY29sbGlkZXJzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJNZXNoW10gPSBbXTtcbiAgICAgICAgdnJtQm9uZUdyb3VwLmNvbGxpZGVyR3JvdXBzLmZvckVhY2goKGNvbGxpZGVySW5kZXgpID0+IHtcbiAgICAgICAgICBjb2xsaWRlcnMucHVzaCguLi5jb2xsaWRlckdyb3Vwc1tjb2xsaWRlckluZGV4XS5jb2xsaWRlcnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzcHJpbmdCb25lR3JvdXA6IFZSTVNwcmluZ0JvbmVHcm91cCA9IFtdO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICB2cm1Cb25lR3JvdXAuYm9uZXMubWFwKGFzeW5jIChub2RlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIFZSTeOBruaDheWgseOBi+OCieOAjOaPuuOCjOODouODjuOAjeODnOODvOODs+OBruODq+ODvOODiOOBjOWPluOCjOOCi1xuICAgICAgICAgICAgY29uc3Qgc3ByaW5nUm9vdEJvbmU6IEdMVEZOb2RlID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIG5vZGVJbmRleCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjogR0xURk5vZGUgPVxuICAgICAgICAgICAgICB2cm1Cb25lR3JvdXAuY2VudGVyISAhPT0gLTEgPyBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgdnJtQm9uZUdyb3VwLmNlbnRlciEpIDogbnVsbDtcblxuICAgICAgICAgICAgLy8gaXQncyB3ZWlyZCBidXQgdGhlcmUgbWlnaHQgYmUgY2FzZXMgd2UgY2FuJ3QgZmluZCB0aGUgcm9vdCBib25lXG4gICAgICAgICAgICBpZiAoIXNwcmluZ1Jvb3RCb25lKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3ByaW5nUm9vdEJvbmUudHJhdmVyc2UoKGJvbmUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3ByaW5nQm9uZSA9IHRoaXMuX2NyZWF0ZVNwcmluZ0JvbmUoYm9uZSwge1xuICAgICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBzdGlmZm5lc3NGb3JjZSxcbiAgICAgICAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICAgICAgICAgIGdyYXZpdHlQb3dlcixcbiAgICAgICAgICAgICAgICBkcmFnRm9yY2UsXG4gICAgICAgICAgICAgICAgY29sbGlkZXJzLFxuICAgICAgICAgICAgICAgIGNlbnRlcixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNwcmluZ0JvbmVHcm91cC5wdXNoKHNwcmluZ0JvbmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgc3ByaW5nQm9uZUdyb3VwTGlzdC5wdXNoKHNwcmluZ0JvbmVHcm91cCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHNwcmluZ0JvbmVHcm91cExpc3Q7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGFycmF5IG9mIFtbVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBdXS5cbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgcmVzdWx0IG9mIEdMVEYgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqIEBwYXJhbSBzY2hlbWFTZWNvbmRhcnlBbmltYXRpb24gQSBgc2Vjb25kYXJ5QW5pbWF0aW9uYCBmaWVsZCBvZiBWUk1cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBfaW1wb3J0Q29sbGlkZXJNZXNoR3JvdXBzKFxuICAgIGdsdGY6IEdMVEYsXG4gICAgc2NoZW1hU2Vjb25kYXJ5QW5pbWF0aW9uOiBWUk1TY2hlbWEuU2Vjb25kYXJ5QW5pbWF0aW9uLFxuICApOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10+IHtcbiAgICBjb25zdCB2cm1Db2xsaWRlckdyb3VwcyA9IHNjaGVtYVNlY29uZGFyeUFuaW1hdGlvbi5jb2xsaWRlckdyb3VwcztcbiAgICBpZiAodnJtQ29sbGlkZXJHcm91cHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10gPSBbXTtcbiAgICB2cm1Db2xsaWRlckdyb3Vwcy5mb3JFYWNoKGFzeW5jIChjb2xsaWRlckdyb3VwKSA9PiB7XG4gICAgICBpZiAoY29sbGlkZXJHcm91cC5ub2RlID09PSB1bmRlZmluZWQgfHwgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJvbmUgPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgY29sbGlkZXJHcm91cC5ub2RlKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyTWVzaFtdID0gW107XG4gICAgICBjb2xsaWRlckdyb3VwLmNvbGxpZGVycy5mb3JFYWNoKChjb2xsaWRlcikgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC56ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5yYWRpdXMgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQgPSBfdjNBLnNldChcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueCxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueSxcbiAgICAgICAgICAtY29sbGlkZXIub2Zmc2V0LnosIC8vIFZSTSAwLjAgdXNlcyBsZWZ0LWhhbmRlZCB5LXVwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVyTWVzaCA9IHRoaXMuX2NyZWF0ZUNvbGxpZGVyTWVzaChjb2xsaWRlci5yYWRpdXMsIG9mZnNldCk7XG5cbiAgICAgICAgYm9uZS5hZGQoY29sbGlkZXJNZXNoKTtcbiAgICAgICAgY29sbGlkZXJzLnB1c2goY29sbGlkZXJNZXNoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjb2xsaWRlck1lc2hHcm91cCA9IHtcbiAgICAgICAgbm9kZTogY29sbGlkZXJHcm91cC5ub2RlLFxuICAgICAgICBjb2xsaWRlcnMsXG4gICAgICB9O1xuICAgICAgY29sbGlkZXJHcm91cHMucHVzaChjb2xsaWRlck1lc2hHcm91cCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29sbGlkZXJHcm91cHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY29sbGlkZXIgbWVzaC5cbiAgICpcbiAgICogQHBhcmFtIHJhZGl1cyBSYWRpdXMgb2YgdGhlIG5ldyBjb2xsaWRlciBtZXNoXG4gICAqIEBwYXJhbSBvZmZzZXQgT2ZmZXN0IG9mIHRoZSBuZXcgY29sbGlkZXIgbWVzaFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jcmVhdGVDb2xsaWRlck1lc2gocmFkaXVzOiBudW1iZXIsIG9mZnNldDogVEhSRUUuVmVjdG9yMyk6IFZSTVNwcmluZ0JvbmVDb2xsaWRlck1lc2gge1xuICAgIGNvbnN0IGNvbGxpZGVyTWVzaCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeShyYWRpdXMsIDgsIDQpLCBfY29sbGlkZXJNYXRlcmlhbCk7XG5cbiAgICBjb2xsaWRlck1lc2gucG9zaXRpb24uY29weShvZmZzZXQpO1xuXG4gICAgLy8gdGhlIG5hbWUgaGF2ZSB0byBiZSB0aGlzIGluIG9yZGVyIHRvIGV4Y2x1ZGUgY29sbGlkZXJzIGZyb20gYm91bmRpbmcgYm94XG4gICAgLy8gKFNlZSBWaWV3ZXIudHMsIHNlYXJjaCBmb3IgY2hpbGQubmFtZSA9PT0gJ3ZybUNvbGxpZGVyU3BoZXJlJylcbiAgICBjb2xsaWRlck1lc2gubmFtZSA9ICd2cm1Db2xsaWRlclNwaGVyZSc7XG5cbiAgICAvLyBXZSB3aWxsIHVzZSB0aGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUgZm9yIGNvbGxpc2lvbiB2cyBib25lcy5cbiAgICAvLyBgYm91bmRpbmdTcGhlcmVgIG11c3QgYmUgY3JlYXRlZCB0byBjb21wdXRlIHRoZSByYWRpdXMuXG4gICAgY29sbGlkZXJNZXNoLmdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuXG4gICAgcmV0dXJuIGNvbGxpZGVyTWVzaDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVlJNU3ByaW5nQm9uZSB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZSc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgc3ByaW5nIGJvbmUgZ3JvdXAgb2YgYSBWUk0uXG4gKi9cbmV4cG9ydCB0eXBlIFZSTVNwcmluZ0JvbmVHcm91cCA9IFZSTVNwcmluZ0JvbmVbXTtcblxuLyoqXG4gKiBBIGNsYXNzIG1hbmFnZXMgZXZlcnkgc3ByaW5nIGJvbmVzIG9uIGEgVlJNLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgY29sbGlkZXJHcm91cHM6IFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10gPSBbXTtcbiAgcHVibGljIHJlYWRvbmx5IHNwcmluZ0JvbmVHcm91cExpc3Q6IFZSTVNwcmluZ0JvbmVHcm91cFtdID0gW107XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV1cbiAgICpcbiAgICogQHBhcmFtIHNwcmluZ0JvbmVHcm91cExpc3QgQW4gYXJyYXkgb2YgW1tWUk1TcHJpbmdCb25lR3JvdXBdXVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNvbGxpZGVyR3JvdXBzOiBWUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cFtdLCBzcHJpbmdCb25lR3JvdXBMaXN0OiBWUk1TcHJpbmdCb25lR3JvdXBbXSkge1xuICAgIHRoaXMuY29sbGlkZXJHcm91cHMgPSBjb2xsaWRlckdyb3VwcztcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QgPSBzcHJpbmdCb25lR3JvdXBMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbGwgYm9uZXMgYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgc3BhY2UgcmVsYXRpdmUgZnJvbSB0aGlzIG9iamVjdC5cbiAgICogSWYgYG51bGxgIGlzIGdpdmVuLCBzcHJpbmdib25lIHdpbGwgYmUgY2FsY3VsYXRlZCBpbiB3b3JsZCBzcGFjZS5cbiAgICogQHBhcmFtIHJvb3QgUm9vdCBvYmplY3QsIG9yIGBudWxsYFxuICAgKi9cbiAgcHVibGljIHNldENlbnRlcihyb290OiBUSFJFRS5PYmplY3QzRCB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnNwcmluZ0JvbmVHcm91cExpc3QuZm9yRWFjaCgoc3ByaW5nQm9uZUdyb3VwKSA9PiB7XG4gICAgICBzcHJpbmdCb25lR3JvdXAuZm9yRWFjaCgoc3ByaW5nQm9uZSkgPT4ge1xuICAgICAgICBzcHJpbmdCb25lLmNlbnRlciA9IHJvb3Q7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZXZlcnkgc3ByaW5nIGJvbmUgYXR0YWNoZWQgdG8gdGhpcyBtYW5hZ2VyLlxuICAgKlxuICAgKiBAcGFyYW0gZGVsdGEgZGVsdGFUaW1lXG4gICAqL1xuICBwdWJsaWMgbGF0ZVVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpbmdCb25lR3JvdXBMaXN0LmZvckVhY2goKHNwcmluZ0JvbmVHcm91cCkgPT4ge1xuICAgICAgc3ByaW5nQm9uZUdyb3VwLmZvckVhY2goKHNwcmluZ0JvbmUpID0+IHtcbiAgICAgICAgc3ByaW5nQm9uZS51cGRhdGUoZGVsdGEpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgZXZlcnkgc3ByaW5nIGJvbmUgYXR0YWNoZWQgdG8gdGhpcyBtYW5hZ2VyLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lQ29sbGlkZXJHcm91cCc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVJbXBvcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZVBhcmFtZXRlcnMnO1xuIiwiLy8gVHlwZWRvYyBkb2VzIG5vdCBzdXBwb3J0IGV4cG9ydCBkZWNsYXJhdGlvbnMgeWV0XG4vLyB0aGVuIHdlIGhhdmUgdG8gdXNlIGBuYW1lc3BhY2VgIGluc3RlYWQgb2YgZXhwb3J0IGRlY2xhcmF0aW9ucyBmb3Igbm93LlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vVHlwZVN0cm9uZy90eXBlZG9jL3B1bGwvODAxXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG5leHBvcnQgbmFtZXNwYWNlIFZSTVNjaGVtYSB7XG4gIC8qKlxuICAgKiBWUk0gZXh0ZW5zaW9uIGlzIGZvciAzZCBodW1hbm9pZCBhdmF0YXJzIChhbmQgbW9kZWxzKSBpbiBWUiBhcHBsaWNhdGlvbnMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZSTSB7XG4gICAgYmxlbmRTaGFwZU1hc3Rlcj86IEJsZW5kU2hhcGU7XG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBvZiBleHBvcnRlciB0aGF0IHZybSBjcmVhdGVkLiBVbmlWUk0tMC41My4wXG4gICAgICovXG4gICAgZXhwb3J0ZXJWZXJzaW9uPzogc3RyaW5nO1xuICAgIGZpcnN0UGVyc29uPzogRmlyc3RQZXJzb247XG4gICAgaHVtYW5vaWQ/OiBIdW1hbm9pZDtcbiAgICBtYXRlcmlhbFByb3BlcnRpZXM/OiBNYXRlcmlhbFtdO1xuICAgIG1ldGE/OiBNZXRhO1xuICAgIHNlY29uZGFyeUFuaW1hdGlvbj86IFNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIG9mIFZSTSBzcGVjaWZpY2F0aW9uLiAwLjBcbiAgICAgKi9cbiAgICBzcGVjVmVyc2lvbj86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBCbGVuZFNoYXBlQXZhdGFyIG9mIFVuaVZSTVxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBCbGVuZFNoYXBlIHtcbiAgICBibGVuZFNoYXBlR3JvdXBzPzogQmxlbmRTaGFwZUdyb3VwW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGVHcm91cCB7XG4gICAgLyoqXG4gICAgICogTG93IGxldmVsIGJsZW5kc2hhcGUgcmVmZXJlbmNlcy5cbiAgICAgKi9cbiAgICBiaW5kcz86IEJsZW5kU2hhcGVCaW5kW107XG4gICAgLyoqXG4gICAgICogMCBvciAxLiBEbyBub3QgYWxsb3cgYW4gaW50ZXJtZWRpYXRlIHZhbHVlLiBWYWx1ZSBzaG91bGQgcm91bmRlZFxuICAgICAqL1xuICAgIGlzQmluYXJ5PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBNYXRlcmlhbCBhbmltYXRpb24gcmVmZXJlbmNlcy5cbiAgICAgKi9cbiAgICBtYXRlcmlhbFZhbHVlcz86IEJsZW5kU2hhcGVNYXRlcmlhbGJpbmRbXTtcbiAgICAvKipcbiAgICAgKiBFeHByZXNzaW9uIG5hbWVcbiAgICAgKi9cbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFByZWRlZmluZWQgRXhwcmVzc2lvbiBuYW1lXG4gICAgICovXG4gICAgcHJlc2V0TmFtZT86IEJsZW5kU2hhcGVQcmVzZXROYW1lO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBCbGVuZFNoYXBlQmluZCB7XG4gICAgaW5kZXg/OiBudW1iZXI7XG4gICAgbWVzaD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTa2lubmVkTWVzaFJlbmRlcmVyLlNldEJsZW5kU2hhcGVXZWlnaHRcbiAgICAgKi9cbiAgICB3ZWlnaHQ/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJsZW5kU2hhcGVNYXRlcmlhbGJpbmQge1xuICAgIG1hdGVyaWFsTmFtZT86IHN0cmluZztcbiAgICBwcm9wZXJ0eU5hbWU/OiBzdHJpbmc7XG4gICAgdGFyZ2V0VmFsdWU/OiBudW1iZXJbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVkZWZpbmVkIEV4cHJlc3Npb24gbmFtZVxuICAgKi9cbiAgZXhwb3J0IGVudW0gQmxlbmRTaGFwZVByZXNldE5hbWUge1xuICAgIEEgPSAnYScsXG4gICAgQW5ncnkgPSAnYW5ncnknLFxuICAgIEJsaW5rID0gJ2JsaW5rJyxcbiAgICBCbGlua0wgPSAnYmxpbmtfbCcsXG4gICAgQmxpbmtSID0gJ2JsaW5rX3InLFxuICAgIEUgPSAnZScsXG4gICAgRnVuID0gJ2Z1bicsXG4gICAgSSA9ICdpJyxcbiAgICBKb3kgPSAnam95JyxcbiAgICBMb29rZG93biA9ICdsb29rZG93bicsXG4gICAgTG9va2xlZnQgPSAnbG9va2xlZnQnLFxuICAgIExvb2tyaWdodCA9ICdsb29rcmlnaHQnLFxuICAgIExvb2t1cCA9ICdsb29rdXAnLFxuICAgIE5ldXRyYWwgPSAnbmV1dHJhbCcsXG4gICAgTyA9ICdvJyxcbiAgICBTb3Jyb3cgPSAnc29ycm93JyxcbiAgICBVID0gJ3UnLFxuICAgIFVua25vd24gPSAndW5rbm93bicsXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEZpcnN0UGVyc29uIHtcbiAgICAvKipcbiAgICAgKiBUaGUgYm9uZSB3aG9zZSByZW5kZXJpbmcgc2hvdWxkIGJlIHR1cm5lZCBvZmYgaW4gZmlyc3QtcGVyc29uIHZpZXcuIFVzdWFsbHkgSGVhZCBpc1xuICAgICAqIHNwZWNpZmllZC5cbiAgICAgKi9cbiAgICBmaXJzdFBlcnNvbkJvbmU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBwb3NpdGlvbiBvZiB0aGUgVlIgaGVhZHNldCBpbiBmaXJzdC1wZXJzb24gdmlldy4gSXQgaXMgYXNzdW1lZCB0aGF0IGFuIG9mZnNldFxuICAgICAqIGZyb20gdGhlIGhlYWQgYm9uZSB0byB0aGUgVlIgaGVhZHNldCBpcyBhZGRlZC5cbiAgICAgKi9cbiAgICBmaXJzdFBlcnNvbkJvbmVPZmZzZXQ/OiBWZWN0b3IzO1xuICAgIGxvb2tBdEhvcml6b250YWxJbm5lcj86IEZpcnN0UGVyc29uRGVncmVlTWFwO1xuICAgIGxvb2tBdEhvcml6b250YWxPdXRlcj86IEZpcnN0UGVyc29uRGVncmVlTWFwO1xuICAgIC8qKlxuICAgICAqIEV5ZSBjb250cm9sbGVyIG1vZGUuXG4gICAgICovXG4gICAgbG9va0F0VHlwZU5hbWU/OiBGaXJzdFBlcnNvbkxvb2tBdFR5cGVOYW1lO1xuICAgIGxvb2tBdFZlcnRpY2FsRG93bj86IEZpcnN0UGVyc29uRGVncmVlTWFwO1xuICAgIGxvb2tBdFZlcnRpY2FsVXA/OiBGaXJzdFBlcnNvbkRlZ3JlZU1hcDtcbiAgICAvKipcbiAgICAgKiBTd2l0Y2ggZGlzcGxheSAvIHVuZGlzcGxheSBmb3IgZWFjaCBtZXNoIGluIGZpcnN0LXBlcnNvbiB2aWV3IG9yIHRoZSBvdGhlcnMuXG4gICAgICovXG4gICAgbWVzaEFubm90YXRpb25zPzogRmlyc3RQZXJzb25NZXNoYW5ub3RhdGlvbltdO1xuICB9XG5cbiAgLyoqXG4gICAqIEV5ZSBjb250cm9sbGVyIHNldHRpbmcuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEZpcnN0UGVyc29uRGVncmVlTWFwIHtcbiAgICAvKipcbiAgICAgKiBOb25lIGxpbmVhciBtYXBwaW5nIHBhcmFtcy4gdGltZSwgdmFsdWUsIGluVGFuZ2VudCwgb3V0VGFuZ2VudFxuICAgICAqL1xuICAgIGN1cnZlPzogbnVtYmVyW107XG4gICAgLyoqXG4gICAgICogTG9vayBhdCBpbnB1dCBjbGFtcCByYW5nZSBkZWdyZWUuXG4gICAgICovXG4gICAgeFJhbmdlPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIExvb2sgYXQgbWFwIHJhbmdlIGRlZ3JlZSBmcm9tIHhSYW5nZS5cbiAgICAgKi9cbiAgICB5UmFuZ2U/OiBudW1iZXI7XG4gIH1cblxuICAvKipcbiAgICogRXllIGNvbnRyb2xsZXIgbW9kZS5cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpcnN0UGVyc29uTG9va0F0VHlwZU5hbWUge1xuICAgIEJsZW5kU2hhcGUgPSAnQmxlbmRTaGFwZScsXG4gICAgQm9uZSA9ICdCb25lJyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQZXJzb25NZXNoYW5ub3RhdGlvbiB7XG4gICAgZmlyc3RQZXJzb25GbGFnPzogc3RyaW5nO1xuICAgIG1lc2g/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEh1bWFub2lkIHtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24uYXJtU3RyZXRjaFxuICAgICAqL1xuICAgIGFybVN0cmV0Y2g/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmZlZXRTcGFjaW5nXG4gICAgICovXG4gICAgZmVldFNwYWNpbmc/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmhhc1RyYW5zbGF0aW9uRG9GXG4gICAgICovXG4gICAgaGFzVHJhbnNsYXRpb25Eb0Y/OiBib29sZWFuO1xuICAgIGh1bWFuQm9uZXM/OiBIdW1hbm9pZEJvbmVbXTtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24ubGVnU3RyZXRjaFxuICAgICAqL1xuICAgIGxlZ1N0cmV0Y2g/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmxvd2VyQXJtVHdpc3RcbiAgICAgKi9cbiAgICBsb3dlckFybVR3aXN0PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5sb3dlckxlZ1R3aXN0XG4gICAgICovXG4gICAgbG93ZXJMZWdUd2lzdD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24udXBwZXJBcm1Ud2lzdFxuICAgICAqL1xuICAgIHVwcGVyQXJtVHdpc3Q/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLnVwcGVyTGVnVHdpc3RcbiAgICAgKi9cbiAgICB1cHBlckxlZ1R3aXN0PzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBIdW1hbm9pZEJvbmUge1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5MaW1pdC5heGlzTGVuZ3RoXG4gICAgICovXG4gICAgYXhpc0xlbmd0aD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBIdW1hbiBib25lIG5hbWUuXG4gICAgICovXG4gICAgYm9uZT86IEh1bWFub2lkQm9uZU5hbWU7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0LmNlbnRlclxuICAgICAqL1xuICAgIGNlbnRlcj86IFZlY3RvcjM7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0Lm1heFxuICAgICAqL1xuICAgIG1heD86IFZlY3RvcjM7XG4gICAgLyoqXG4gICAgICogVW5pdHkncyBIdW1hbkxpbWl0Lm1pblxuICAgICAqL1xuICAgIG1pbj86IFZlY3RvcjM7XG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIG5vZGUgaW5kZXhcbiAgICAgKi9cbiAgICBub2RlPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVuaXR5J3MgSHVtYW5MaW1pdC51c2VEZWZhdWx0VmFsdWVzXG4gICAgICovXG4gICAgdXNlRGVmYXVsdFZhbHVlcz86IGJvb2xlYW47XG4gIH1cblxuICAvKipcbiAgICogSHVtYW4gYm9uZSBuYW1lLlxuICAgKi9cbiAgZXhwb3J0IGVudW0gSHVtYW5vaWRCb25lTmFtZSB7XG4gICAgQ2hlc3QgPSAnY2hlc3QnLFxuICAgIEhlYWQgPSAnaGVhZCcsXG4gICAgSGlwcyA9ICdoaXBzJyxcbiAgICBKYXcgPSAnamF3JyxcbiAgICBMZWZ0RXllID0gJ2xlZnRFeWUnLFxuICAgIExlZnRGb290ID0gJ2xlZnRGb290JyxcbiAgICBMZWZ0SGFuZCA9ICdsZWZ0SGFuZCcsXG4gICAgTGVmdEluZGV4RGlzdGFsID0gJ2xlZnRJbmRleERpc3RhbCcsXG4gICAgTGVmdEluZGV4SW50ZXJtZWRpYXRlID0gJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gICAgTGVmdEluZGV4UHJveGltYWwgPSAnbGVmdEluZGV4UHJveGltYWwnLFxuICAgIExlZnRMaXR0bGVEaXN0YWwgPSAnbGVmdExpdHRsZURpc3RhbCcsXG4gICAgTGVmdExpdHRsZUludGVybWVkaWF0ZSA9ICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0TGl0dGxlUHJveGltYWwgPSAnbGVmdExpdHRsZVByb3hpbWFsJyxcbiAgICBMZWZ0TG93ZXJBcm0gPSAnbGVmdExvd2VyQXJtJyxcbiAgICBMZWZ0TG93ZXJMZWcgPSAnbGVmdExvd2VyTGVnJyxcbiAgICBMZWZ0TWlkZGxlRGlzdGFsID0gJ2xlZnRNaWRkbGVEaXN0YWwnLFxuICAgIExlZnRNaWRkbGVJbnRlcm1lZGlhdGUgPSAnbGVmdE1pZGRsZUludGVybWVkaWF0ZScsXG4gICAgTGVmdE1pZGRsZVByb3hpbWFsID0gJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gICAgTGVmdFJpbmdEaXN0YWwgPSAnbGVmdFJpbmdEaXN0YWwnLFxuICAgIExlZnRSaW5nSW50ZXJtZWRpYXRlID0gJ2xlZnRSaW5nSW50ZXJtZWRpYXRlJyxcbiAgICBMZWZ0UmluZ1Byb3hpbWFsID0gJ2xlZnRSaW5nUHJveGltYWwnLFxuICAgIExlZnRTaG91bGRlciA9ICdsZWZ0U2hvdWxkZXInLFxuICAgIExlZnRUaHVtYkRpc3RhbCA9ICdsZWZ0VGh1bWJEaXN0YWwnLFxuICAgIExlZnRUaHVtYkludGVybWVkaWF0ZSA9ICdsZWZ0VGh1bWJJbnRlcm1lZGlhdGUnLFxuICAgIExlZnRUaHVtYlByb3hpbWFsID0gJ2xlZnRUaHVtYlByb3hpbWFsJyxcbiAgICBMZWZ0VG9lcyA9ICdsZWZ0VG9lcycsXG4gICAgTGVmdFVwcGVyQXJtID0gJ2xlZnRVcHBlckFybScsXG4gICAgTGVmdFVwcGVyTGVnID0gJ2xlZnRVcHBlckxlZycsXG4gICAgTmVjayA9ICduZWNrJyxcbiAgICBSaWdodEV5ZSA9ICdyaWdodEV5ZScsXG4gICAgUmlnaHRGb290ID0gJ3JpZ2h0Rm9vdCcsXG4gICAgUmlnaHRIYW5kID0gJ3JpZ2h0SGFuZCcsXG4gICAgUmlnaHRJbmRleERpc3RhbCA9ICdyaWdodEluZGV4RGlzdGFsJyxcbiAgICBSaWdodEluZGV4SW50ZXJtZWRpYXRlID0gJ3JpZ2h0SW5kZXhJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0SW5kZXhQcm94aW1hbCA9ICdyaWdodEluZGV4UHJveGltYWwnLFxuICAgIFJpZ2h0TGl0dGxlRGlzdGFsID0gJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbiAgICBSaWdodExpdHRsZUludGVybWVkaWF0ZSA9ICdyaWdodExpdHRsZUludGVybWVkaWF0ZScsXG4gICAgUmlnaHRMaXR0bGVQcm94aW1hbCA9ICdyaWdodExpdHRsZVByb3hpbWFsJyxcbiAgICBSaWdodExvd2VyQXJtID0gJ3JpZ2h0TG93ZXJBcm0nLFxuICAgIFJpZ2h0TG93ZXJMZWcgPSAncmlnaHRMb3dlckxlZycsXG4gICAgUmlnaHRNaWRkbGVEaXN0YWwgPSAncmlnaHRNaWRkbGVEaXN0YWwnLFxuICAgIFJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlID0gJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodE1pZGRsZVByb3hpbWFsID0gJ3JpZ2h0TWlkZGxlUHJveGltYWwnLFxuICAgIFJpZ2h0UmluZ0Rpc3RhbCA9ICdyaWdodFJpbmdEaXN0YWwnLFxuICAgIFJpZ2h0UmluZ0ludGVybWVkaWF0ZSA9ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICAgIFJpZ2h0UmluZ1Byb3hpbWFsID0gJ3JpZ2h0UmluZ1Byb3hpbWFsJyxcbiAgICBSaWdodFNob3VsZGVyID0gJ3JpZ2h0U2hvdWxkZXInLFxuICAgIFJpZ2h0VGh1bWJEaXN0YWwgPSAncmlnaHRUaHVtYkRpc3RhbCcsXG4gICAgUmlnaHRUaHVtYkludGVybWVkaWF0ZSA9ICdyaWdodFRodW1iSW50ZXJtZWRpYXRlJyxcbiAgICBSaWdodFRodW1iUHJveGltYWwgPSAncmlnaHRUaHVtYlByb3hpbWFsJyxcbiAgICBSaWdodFRvZXMgPSAncmlnaHRUb2VzJyxcbiAgICBSaWdodFVwcGVyQXJtID0gJ3JpZ2h0VXBwZXJBcm0nLFxuICAgIFJpZ2h0VXBwZXJMZWcgPSAncmlnaHRVcHBlckxlZycsXG4gICAgU3BpbmUgPSAnc3BpbmUnLFxuICAgIFVwcGVyQ2hlc3QgPSAndXBwZXJDaGVzdCcsXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE1hdGVyaWFsIHtcbiAgICBmbG9hdFByb3BlcnRpZXM/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIGtleXdvcmRNYXA/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgcmVuZGVyUXVldWU/OiBudW1iZXI7XG4gICAgc2hhZGVyPzogc3RyaW5nO1xuICAgIHRhZ01hcD86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gICAgdGV4dHVyZVByb3BlcnRpZXM/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICAgIHZlY3RvclByb3BlcnRpZXM/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBNZXRhIHtcbiAgICAvKipcbiAgICAgKiBBIHBlcnNvbiB3aG8gY2FuIHBlcmZvcm0gd2l0aCB0aGlzIGF2YXRhclxuICAgICAqL1xuICAgIGFsbG93ZWRVc2VyTmFtZT86IE1ldGFBbGxvd2VkVXNlck5hbWU7XG4gICAgLyoqXG4gICAgICogQXV0aG9yIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIGF1dGhvcj86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBGb3IgY29tbWVyY2lhbCB1c2VcbiAgICAgKi9cbiAgICBjb21tZXJjaWFsVXNzYWdlTmFtZT86IE1ldGFVc3NhZ2VOYW1lO1xuICAgIC8qKlxuICAgICAqIENvbnRhY3QgSW5mb3JtYXRpb24gb2YgVlJNIG1vZGVsIGF1dGhvclxuICAgICAqL1xuICAgIGNvbnRhY3RJbmZvcm1hdGlvbj86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBMaWNlbnNlIHR5cGVcbiAgICAgKi9cbiAgICBsaWNlbnNlTmFtZT86IE1ldGFMaWNlbnNlTmFtZTtcbiAgICAvKipcbiAgICAgKiBJZiDigJxPdGhlcuKAnSBpcyBzZWxlY3RlZCwgcHV0IHRoZSBVUkwgbGluayBvZiB0aGUgbGljZW5zZSBkb2N1bWVudCBoZXJlLlxuICAgICAqL1xuICAgIG90aGVyTGljZW5zZVVybD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSBhcmUgYW55IGNvbmRpdGlvbnMgbm90IG1lbnRpb25lZCBhYm92ZSwgcHV0IHRoZSBVUkwgbGluayBvZiB0aGUgbGljZW5zZSBkb2N1bWVudFxuICAgICAqIGhlcmUuXG4gICAgICovXG4gICAgb3RoZXJQZXJtaXNzaW9uVXJsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZSBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICByZWZlcmVuY2U/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHNleHVhbCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAgICAgKi9cbiAgICBzZXh1YWxVc3NhZ2VOYW1lPzogTWV0YVVzc2FnZU5hbWU7XG4gICAgLyoqXG4gICAgICogVGh1bWJuYWlsIG9mIFZSTSBtb2RlbFxuICAgICAqL1xuICAgIHRleHR1cmU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGl0bGUgb2YgVlJNIG1vZGVsXG4gICAgICovXG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBvZiBWUk0gbW9kZWxcbiAgICAgKi9cbiAgICB2ZXJzaW9uPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSB2aW9sZW50IGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgICAqL1xuICAgIHZpb2xlbnRVc3NhZ2VOYW1lPzogTWV0YVVzc2FnZU5hbWU7XG4gIH1cblxuICAvKipcbiAgICogQSBwZXJzb24gd2hvIGNhbiBwZXJmb3JtIHdpdGggdGhpcyBhdmF0YXJcbiAgICovXG4gIGV4cG9ydCBlbnVtIE1ldGFBbGxvd2VkVXNlck5hbWUge1xuICAgIEV2ZXJ5b25lID0gJ0V2ZXJ5b25lJyxcbiAgICBFeHBsaWNpdGx5TGljZW5zZWRQZXJzb24gPSAnRXhwbGljaXRseUxpY2Vuc2VkUGVyc29uJyxcbiAgICBPbmx5QXV0aG9yID0gJ09ubHlBdXRob3InLFxuICB9XG5cbiAgLyoqXG4gICAqIEZvciBjb21tZXJjaWFsIHVzZVxuICAgKlxuICAgKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gc2V4dWFsIGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgKlxuICAgKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gdmlvbGVudCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAgICovXG4gIGV4cG9ydCBlbnVtIE1ldGFVc3NhZ2VOYW1lIHtcbiAgICBBbGxvdyA9ICdBbGxvdycsXG4gICAgRGlzYWxsb3cgPSAnRGlzYWxsb3cnLFxuICB9XG5cbiAgLyoqXG4gICAqIExpY2Vuc2UgdHlwZVxuICAgKi9cbiAgZXhwb3J0IGVudW0gTWV0YUxpY2Vuc2VOYW1lIHtcbiAgICBDYzAgPSAnQ0MwJyxcbiAgICBDY0J5ID0gJ0NDX0JZJyxcbiAgICBDY0J5TmMgPSAnQ0NfQllfTkMnLFxuICAgIENjQnlOY05kID0gJ0NDX0JZX05DX05EJyxcbiAgICBDY0J5TmNTYSA9ICdDQ19CWV9OQ19TQScsXG4gICAgQ2NCeU5kID0gJ0NDX0JZX05EJyxcbiAgICBDY0J5U2EgPSAnQ0NfQllfU0EnLFxuICAgIE90aGVyID0gJ090aGVyJyxcbiAgICBSZWRpc3RyaWJ1dGlvblByb2hpYml0ZWQgPSAnUmVkaXN0cmlidXRpb25fUHJvaGliaXRlZCcsXG4gIH1cblxuICAvKipcbiAgICogVGhlIHNldHRpbmcgb2YgYXV0b21hdGljIGFuaW1hdGlvbiBvZiBzdHJpbmctbGlrZSBvYmplY3RzIHN1Y2ggYXMgdGFpbHMgYW5kIGhhaXJzLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTZWNvbmRhcnlBbmltYXRpb24ge1xuICAgIGJvbmVHcm91cHM/OiBTZWNvbmRhcnlBbmltYXRpb25TcHJpbmdbXTtcbiAgICBjb2xsaWRlckdyb3Vwcz86IFNlY29uZGFyeUFuaW1hdGlvbkNvbGxpZGVyZ3JvdXBbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2Vjb25kYXJ5QW5pbWF0aW9uU3ByaW5nIHtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBub2RlIGluZGV4IG9mIHRoZSByb290IGJvbmUgb2YgdGhlIHN3YXlpbmcgb2JqZWN0LlxuICAgICAqL1xuICAgIGJvbmVzPzogbnVtYmVyW107XG4gICAgLyoqXG4gICAgICogVGhlIHJlZmVyZW5jZSBwb2ludCBvZiBhIHN3YXlpbmcgb2JqZWN0IGNhbiBiZSBzZXQgYXQgYW55IGxvY2F0aW9uIGV4Y2VwdCB0aGUgb3JpZ2luLlxuICAgICAqIFdoZW4gaW1wbGVtZW50aW5nIFVJIG1vdmluZyB3aXRoIHdhcnAsIHRoZSBwYXJlbnQgbm9kZSB0byBtb3ZlIHdpdGggd2FycCBjYW4gYmUgc3BlY2lmaWVkXG4gICAgICogaWYgeW91IGRvbid0IHdhbnQgdG8gbWFrZSB0aGUgb2JqZWN0IHN3YXlpbmcgd2l0aCB3YXJwIG1vdmVtZW50LlxuICAgICAqL1xuICAgIGNlbnRlcj86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBpbmRleCBvZiB0aGUgY29sbGlkZXIgZ3JvdXAgZm9yIGNvbGxpc2lvbnMgd2l0aCBzd2F5aW5nIG9iamVjdHMuXG4gICAgICovXG4gICAgY29sbGlkZXJHcm91cHM/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBBbm5vdGF0aW9uIGNvbW1lbnRcbiAgICAgKi9cbiAgICBjb21tZW50Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSByZXNpc3RhbmNlIChkZWNlbGVyYXRpb24pIG9mIGF1dG9tYXRpYyBhbmltYXRpb24uXG4gICAgICovXG4gICAgZHJhZ0ZvcmNlPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBkaXJlY3Rpb24gb2YgZ3Jhdml0eS4gU2V0ICgwLCAtMSwgMCkgZm9yIHNpbXVsYXRpbmcgdGhlIGdyYXZpdHkuIFNldCAoMSwgMCwgMCkgZm9yXG4gICAgICogc2ltdWxhdGluZyB0aGUgd2luZC5cbiAgICAgKi9cbiAgICBncmF2aXR5RGlyPzogVmVjdG9yMztcbiAgICAvKipcbiAgICAgKiBUaGUgc3RyZW5ndGggb2YgZ3Jhdml0eS5cbiAgICAgKi9cbiAgICBncmF2aXR5UG93ZXI/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIHVzZWQgZm9yIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uIHdpdGggY29sbGlkZXJzLlxuICAgICAqL1xuICAgIGhpdFJhZGl1cz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVzaWxpZW5jZSBvZiB0aGUgc3dheWluZyBvYmplY3QgKHRoZSBwb3dlciBvZiByZXR1cm5pbmcgdG8gdGhlIGluaXRpYWwgcG9zZSkuXG4gICAgICovXG4gICAgc3RpZmZpbmVzcz86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJncm91cCB7XG4gICAgY29sbGlkZXJzPzogU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXJbXTtcbiAgICAvKipcbiAgICAgKiBUaGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAgZm9yIHNldHRpbmcgdXAgY29sbGlzaW9uIGRldGVjdGlvbnMuXG4gICAgICovXG4gICAgbm9kZT86IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2Vjb25kYXJ5QW5pbWF0aW9uQ29sbGlkZXIge1xuICAgIC8qKlxuICAgICAqIFRoZSBsb2NhbCBjb29yZGluYXRlIGZyb20gdGhlIG5vZGUgb2YgdGhlIGNvbGxpZGVyIGdyb3VwLlxuICAgICAqL1xuICAgIG9mZnNldD86IFZlY3RvcjM7XG4gICAgLyoqXG4gICAgICogVGhlIHJhZGl1cyBvZiB0aGUgY29sbGlkZXIuXG4gICAgICovXG4gICAgcmFkaXVzPzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBWZWN0b3IzIHtcbiAgICB4PzogbnVtYmVyO1xuICAgIHk/OiBudW1iZXI7XG4gICAgej86IG51bWJlcjtcbiAgfVxufVxuIiwiLy8gVHlwZWRvYyBkb2VzIG5vdCBzdXBwb3J0IGV4cG9ydCBkZWNsYXJhdGlvbnMgeWV0XG4vLyB0aGVuIHdlIGhhdmUgdG8gdXNlIGBuYW1lc3BhY2VgIGluc3RlYWQgb2YgZXhwb3J0IGRlY2xhcmF0aW9ucyBmb3Igbm93LlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vVHlwZVN0cm9uZy90eXBlZG9jL3B1bGwvODAxXG5cbi8vIGltcG9ydCAqIGFzIEdMVEZTY2hlbWEgZnJvbSAnLi9HTFRGU2NoZW1hJztcbi8vIGltcG9ydCAqIGFzIFZSTVNjaGVtYSBmcm9tICcuL1ZSTVNjaGVtYSc7XG5cbi8vIGV4cG9ydCB7IEdMVEZTY2hlbWEsIFZSTVNjaGVtYSB9O1xuXG5leHBvcnQgKiBmcm9tICcuL0dMVEZTY2hlbWEnO1xuZXhwb3J0ICogZnJvbSAnLi9WUk1TY2hlbWEnO1xuXG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIE1hdHJpeDRJbnZlcnNlQ2FjaGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBtYXRyaXguXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbWF0cml4OiBUSFJFRS5NYXRyaXg0O1xuXG4gIC8qKlxuICAgKiBBIGNhY2hlIG9mIGludmVyc2Ugb2YgY3VycmVudCBtYXRyaXguXG4gICAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9pbnZlcnNlQ2FjaGUgPSBuZXcgVEhSRUUuTWF0cml4NCgpO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdGhhdCBtYWtlcyBpdCB3YW50IHRvIHJlY2FsY3VsYXRlIGl0cyB7QGxpbmsgX2ludmVyc2VDYWNoZX0uXG4gICAqIFdpbGwgYmUgc2V0IGB0cnVlYCB3aGVuIGBlbGVtZW50c2AgYXJlIG11dGF0ZWQgYW5kIGJlIHVzZWQgaW4gYGdldEludmVyc2VgLlxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvdWxkVXBkYXRlSW52ZXJzZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW5hbCBvZiBgbWF0cml4LmVsZW1lbnRzYFxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfb3JpZ2luYWxFbGVtZW50czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEludmVyc2Ugb2YgZ2l2ZW4gbWF0cml4LlxuICAgKiBOb3RlIHRoYXQgaXQgd2lsbCByZXR1cm4gaXRzIGludGVybmFsIHByaXZhdGUgaW5zdGFuY2UuXG4gICAqIE1ha2Ugc3VyZSBjb3B5aW5nIHRoaXMgYmVmb3JlIG11dGF0ZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBpbnZlcnNlKCk6IFRIUkVFLk1hdHJpeDQge1xuICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlKSB7XG4gICAgICB0aGlzLl9pbnZlcnNlQ2FjaGUuZ2V0SW52ZXJzZSh0aGlzLm1hdHJpeCk7XG4gICAgICB0aGlzLl9zaG91bGRVcGRhdGVJbnZlcnNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2ludmVyc2VDYWNoZTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXRyaXg6IFRIUkVFLk1hdHJpeDQpIHtcbiAgICB0aGlzLm1hdHJpeCA9IG1hdHJpeDtcblxuICAgIGNvbnN0IGhhbmRsZXI6IFByb3h5SGFuZGxlcjxudW1iZXJbXT4gPSB7XG4gICAgICBzZXQ6IChvYmosIHByb3A6IG51bWJlciwgbmV3VmFsKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUludmVyc2UgPSB0cnVlO1xuICAgICAgICBvYmpbcHJvcF0gPSBuZXdWYWw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICB0aGlzLl9vcmlnaW5hbEVsZW1lbnRzID0gbWF0cml4LmVsZW1lbnRzO1xuICAgIG1hdHJpeC5lbGVtZW50cyA9IG5ldyBQcm94eShtYXRyaXguZWxlbWVudHMsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJldmVydCgpOiB2b2lkIHtcbiAgICB0aGlzLm1hdHJpeC5lbGVtZW50cyA9IHRoaXMuX29yaWdpbmFsRWxlbWVudHM7XG4gIH1cbn1cbiIsIi8vIFNlZTogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNtYW51YWwvZW4vaW50cm9kdWN0aW9uL0hvdy10by1kaXNwb3NlLW9mLW9iamVjdHNcblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5mdW5jdGlvbiBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKTogdm9pZCB7XG4gIE9iamVjdC5rZXlzKG1hdGVyaWFsKS5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV07XG4gICAgaWYgKHZhbHVlPy5pc1RleHR1cmUpIHtcbiAgICAgIGNvbnN0IHRleHR1cmUgPSB2YWx1ZSBhcyBUSFJFRS5UZXh0dXJlO1xuICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICBtYXRlcmlhbC5kaXNwb3NlKCk7XG59XG5cbmZ1bmN0aW9uIGRpc3Bvc2Uob2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIGNvbnN0IGdlb21ldHJ5OiBUSFJFRS5HZW9tZXRyeSA9IChvYmplY3QzRCBhcyBhbnkpLmdlb21ldHJ5O1xuICBpZiAoZ2VvbWV0cnkpIHtcbiAgICBnZW9tZXRyeS5kaXNwb3NlKCk7XG4gIH1cblxuICBjb25zdCBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwgfCBUSFJFRS5NYXRlcmlhbFtdID0gKG9iamVjdDNEIGFzIGFueSkubWF0ZXJpYWw7XG4gIGlmIChtYXRlcmlhbCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGVyaWFsKSkge1xuICAgICAgbWF0ZXJpYWwuZm9yRWFjaCgobWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsKSA9PiBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpKTtcbiAgICB9IGVsc2UgaWYgKG1hdGVyaWFsKSB7XG4gICAgICBkaXNwb3NlTWF0ZXJpYWwobWF0ZXJpYWwpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcERpc3Bvc2Uob2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIG9iamVjdDNELnRyYXZlcnNlKGRpc3Bvc2UpO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIENsYW1wIGFuIGlucHV0IG51bWJlciB3aXRoaW4gWyBgMC4wYCAtIGAxLjBgIF0uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F0dXJhdGUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMS4wKSwgMC4wKTtcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHJhbmdlIG9mIGFuIGlucHV0IHZhbHVlIGZyb20gWyBgbWluYCAtIGBtYXhgIF0gdG8gWyBgMC4wYCAtIGAxLjBgIF0uXG4gKiBJZiBpbnB1dCB2YWx1ZSBpcyBsZXNzIHRoYW4gYG1pbmAgLCBpdCByZXR1cm5zIGAwLjBgLlxuICogSWYgaW5wdXQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIGBtYXhgICwgaXQgcmV0dXJucyBgMS4wYC5cbiAqXG4gKiBTZWUgYWxzbzogaHR0cHM6Ly90aHJlZWpzLm9yZy9kb2NzLyNhcGkvZW4vbWF0aC9NYXRoLnNtb290aHN0ZXBcbiAqXG4gKiBAcGFyYW0geCBUaGUgdmFsdWUgdGhhdCB3aWxsIGJlIG1hcHBlZCBpbnRvIHRoZSBzcGVjaWZpZWQgcmFuZ2VcbiAqIEBwYXJhbSBtaW4gTWluaW11bSB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAqIEBwYXJhbSBtYXggTWF4aW11bSB2YWx1ZSBvZiB0aGUgcmFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbnN0ZXAoeDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoeCA8PSBtaW4pIHJldHVybiAwO1xuICBpZiAoeCA+PSBtYXgpIHJldHVybiAxO1xuXG4gIHJldHVybiAoeCAtIG1pbikgLyAobWF4IC0gbWluKTtcbn1cblxuY29uc3QgX3Bvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfcm90YXRpb24gPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgcG9zaXRpb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUG9zaXRpb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKG91dCwgX3JvdGF0aW9uLCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgc2NhbGUgb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkU2NhbGVMaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgX3JvdGF0aW9uLCBvdXQpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgd29ybGQgcm90YXRpb24gb2YgYW4gb2JqZWN0IGZyb20gaXRzIHdvcmxkIHNwYWNlIG1hdHJpeCwgaW4gY2hlYXBlciB3YXkuXG4gKlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0XG4gKiBAcGFyYW0gb3V0IFRhcmdldCB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkUXVhdGVybmlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5RdWF0ZXJuaW9uKTogVEhSRUUuUXVhdGVybmlvbiB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoX3Bvc2l0aW9uLCBvdXQsIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAobmFtZVswXSAhPT0gJ18nKSB7XG4gICAgY29uc29sZS53YXJuKGByZW5hbWVNYXRlcmlhbFByb3BlcnR5OiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMSk7XG5cbiAgaWYgKCEvW0EtWl0vLnRlc3QobmFtZVswXSkpIHtcbiAgICBjb25zb2xlLndhcm4oYHJlbmFtZU1hdGVyaWFsUHJvcGVydHk6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIHJldHVybiBuYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gVEhSRUU7Il0sInNvdXJjZVJvb3QiOiIifQ==