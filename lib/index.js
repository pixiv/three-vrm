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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./vrm/ */ "./src/vrm/index.ts"));


/***/ }),

/***/ "./src/vrm/VRM.ts":
/*!************************!*\
  !*** ./src/vrm/VRM.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var THREE = __webpack_require__(/*! three */ "three");
var material_1 = __webpack_require__(/*! ./material */ "./src/vrm/material/index.ts");
var disposer_1 = __webpack_require__(/*! ./utils/disposer */ "./src/vrm/utils/disposer.ts");
var VRMPartsBuilder_1 = __webpack_require__(/*! ./VRMPartsBuilder */ "./src/vrm/VRMPartsBuilder.ts");
var VRMBuilder = (function () {
    function VRMBuilder() {
        this._materialConverter = new material_1.MaterialConverter(true);
        this._partsBuilder = new VRMPartsBuilder_1.VRMPartsBuilder();
    }
    VRMBuilder.prototype.materialConverter = function (materialConverter) {
        this._materialConverter = materialConverter;
        return this;
    };
    VRMBuilder.prototype.partsBuilder = function (partsBuilder) {
        this._partsBuilder = partsBuilder;
        return this;
    };
    VRMBuilder.prototype.build = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var vrm, convertedGltf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vrm = new VRM(this._partsBuilder);
                        return [4, this._materialConverter.convertGLTFMaterials(gltf)];
                    case 1:
                        convertedGltf = _a.sent();
                        return [4, vrm.loadGLTF(convertedGltf)];
                    case 2:
                        _a.sent();
                        return [2, vrm];
                }
            });
        });
    };
    return VRMBuilder;
}());
exports.VRMBuilder = VRMBuilder;
var VRM = (function () {
    function VRM(_builder) {
        if (_builder) {
            this._partsBuilder = _builder;
        }
        else {
            this._partsBuilder = new VRMPartsBuilder_1.VRMPartsBuilder();
        }
    }
    Object.defineProperty(VRM, "Builder", {
        get: function () {
            return new VRMBuilder();
        },
        enumerable: true,
        configurable: true
    });
    VRM.from = function (gltf) {
        return new VRMBuilder().build(gltf);
    };
    Object.defineProperty(VRM.prototype, "restPose", {
        get: function () {
            return this._restPose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "humanBones", {
        get: function () {
            return this._humanBones;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "blendShapeProxy", {
        get: function () {
            return this._blendShapeProxy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "firstPerson", {
        get: function () {
            return this._firstPerson;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "lookAt", {
        get: function () {
            return this._lookAt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "meta", {
        get: function () {
            return this._meta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "animationMixer", {
        get: function () {
            return this._animationMixer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRM.prototype, "springBoneManager", {
        get: function () {
            return this._springBoneManager;
        },
        enumerable: true,
        configurable: true
    });
    VRM.prototype.loadGLTF = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var vrmExt, humanBones, _a, _b, blendShapeProxy, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this._gltf = gltf;
                        if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
                            throw new Error('Could not find VRM extension on the GLTF');
                        }
                        vrmExt = gltf.parser.json.extensions.VRM;
                        this._meta = vrmExt.meta;
                        gltf.scene.updateMatrixWorld(false);
                        gltf.scene.traverse(function (object3d) {
                            if (object3d.isMesh) {
                                object3d.frustumCulled = false;
                            }
                        });
                        reduceBones(gltf.scene);
                        return [4, this._partsBuilder.loadHumanoid(gltf)];
                    case 1:
                        humanBones = _d.sent();
                        this._humanBones = humanBones;
                        _a = this;
                        if (!this.humanBones) return [3, 3];
                        return [4, this._partsBuilder.loadFirstPerson(vrmExt.firstPerson, this.humanBones, gltf)];
                    case 2:
                        _b = _d.sent();
                        return [3, 4];
                    case 3:
                        _b = null;
                        _d.label = 4;
                    case 4:
                        _a._firstPerson = _b;
                        this._animationMixer = new THREE.AnimationMixer(gltf.scene);
                        return [4, this._partsBuilder.loadBlendShapeMaster(this.animationMixer, gltf)];
                    case 5:
                        blendShapeProxy = _d.sent();
                        if (!blendShapeProxy) {
                            throw new Error('failed to create blendShape. confirm your vrm file');
                        }
                        this._blendShapeProxy = blendShapeProxy;
                        _c = this;
                        return [4, this._partsBuilder.loadSecondary(gltf)];
                    case 6:
                        _c._springBoneManager = _d.sent();
                        this._lookAt =
                            this.blendShapeProxy && this.humanBones
                                ? this._partsBuilder.loadLookAt(vrmExt.firstPerson, this.blendShapeProxy, this.humanBones)
                                : null;
                        this._restPose = this.humanBones
                            ? Object.keys(this.humanBones).reduce(function (restPose, vrmBoneName) {
                                var bone = _this.humanBones[vrmBoneName];
                                restPose[vrmBoneName] = {
                                    position: bone.position.toArray(),
                                    rotation: bone.quaternion.toArray(),
                                };
                                return restPose;
                            }, {})
                            : null;
                        return [2];
                }
            });
        });
    };
    VRM.prototype.setPose = function (poseObject) {
        var _this = this;
        if (!this.humanBones) {
            console.warn('This VRM cannot be posed since humanBones are not properly set');
            return;
        }
        Object.keys(poseObject).forEach(function (boneName) {
            var state = poseObject[boneName];
            var targetBone = _this.humanBones[boneName];
            if (!targetBone) {
                return;
            }
            var restState = _this.restPose[boneName];
            if (!restState) {
                return;
            }
            if (state.position) {
                targetBone.position.set(restState.position[0] + state.position[0], restState.position[1] + state.position[1], restState.position[2] + state.position[2]);
            }
            if (state.rotation) {
                targetBone.quaternion.fromArray(state.rotation);
            }
        });
    };
    Object.defineProperty(VRM.prototype, "scene", {
        get: function () {
            return this._gltf && this._gltf.scene;
        },
        enumerable: true,
        configurable: true
    });
    VRM.prototype.update = function (delta) {
        if (this.lookAt) {
            this.lookAt.update();
        }
        if (this.animationMixer) {
            this.animationMixer.update(delta);
        }
        if (this.blendShapeProxy) {
            this.blendShapeProxy.update();
        }
        if (this.springBoneManager) {
            this.springBoneManager.lateUpdate(delta);
        }
    };
    VRM.prototype.dispose = function () {
        var scene = this.scene;
        if (scene) {
            while (scene.children.length > 0) {
                var object = scene.children[scene.children.length - 1];
                disposer_1.deepDispose(object);
                scene.remove(object);
            }
        }
    };
    return VRM;
}());
exports.VRM = VRM;
function reduceBones(root) {
    root.traverse(function (obj) {
        if (obj.type !== 'SkinnedMesh') {
            return;
        }
        var mesh = obj;
        var geometry = mesh.geometry.clone();
        mesh.geometry = geometry;
        var attribute = geometry.getAttribute('skinIndex');
        var bones = [];
        var boneInverses = [];
        var boneIndexMap = {};
        var array = attribute.array.map(function (index) {
            if (boneIndexMap[index] === undefined) {
                boneIndexMap[index] = bones.length;
                bones.push(mesh.skeleton.bones[index]);
                boneInverses.push(mesh.skeleton.boneInverses[index]);
            }
            return boneIndexMap[index];
        });
        geometry.removeAttribute('skinIndex');
        geometry.addAttribute('skinIndex', new THREE.BufferAttribute(array, 4, false));
        mesh.bind(new THREE.Skeleton(bones, boneInverses), new THREE.Matrix4());
    });
}


/***/ }),

/***/ "./src/vrm/VRMPartsBuilder.ts":
/*!************************************!*\
  !*** ./src/vrm/VRMPartsBuilder.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var THREE = __webpack_require__(/*! three */ "three");
var blendshape_1 = __webpack_require__(/*! ./blendshape */ "./src/vrm/blendshape/index.ts");
var firstperson_1 = __webpack_require__(/*! ./firstperson */ "./src/vrm/firstperson/index.ts");
var lookat_1 = __webpack_require__(/*! ./lookat */ "./src/vrm/lookat/index.ts");
var VRMLookAtBlendShapeApplyer_1 = __webpack_require__(/*! ./lookat/VRMLookAtBlendShapeApplyer */ "./src/vrm/lookat/VRMLookAtBlendShapeApplyer.ts");
var VRMLookAtBoneApplyer_1 = __webpack_require__(/*! ./lookat/VRMLookAtBoneApplyer */ "./src/vrm/lookat/VRMLookAtBoneApplyer.ts");
var springbone_1 = __webpack_require__(/*! ./springbone */ "./src/vrm/springbone/index.ts");
var Raw = __webpack_require__(/*! ./types/VRM */ "./src/vrm/types/VRM.ts");
var VRMPartsBuilder = (function () {
    function VRMPartsBuilder() {
    }
    VRMPartsBuilder.prototype.loadHumanoid = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var humanBones;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        humanBones = gltf.parser.json.extensions &&
                            gltf.parser.json.extensions.VRM &&
                            gltf.parser.json.extensions.VRM.humanoid &&
                            gltf.parser.json.extensions.VRM.humanoid.humanBones;
                        if (!humanBones) {
                            console.warn('Could not find humanBones field on the VRM file');
                            return [2, null];
                        }
                        return [4, humanBones.reduce(function (vrmBonesPromise, bone) { return __awaiter(_this, void 0, void 0, function () {
                                var vrmBones, nodeIndex, boneName, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4, vrmBonesPromise];
                                        case 1:
                                            vrmBones = _c.sent();
                                            nodeIndex = bone.node;
                                            boneName = bone.bone;
                                            if (!(nodeIndex !== undefined && boneName !== undefined)) return [3, 3];
                                            _a = vrmBones;
                                            _b = boneName;
                                            return [4, gltf.parser.getDependency('node', nodeIndex)];
                                        case 2:
                                            _a[_b] = _c.sent();
                                            _c.label = 3;
                                        case 3: return [2, vrmBones];
                                    }
                                });
                            }); }, Promise.resolve({}))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    VRMPartsBuilder.prototype.loadFirstPerson = function (firstPerson, humanBones, gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var isFirstPersonBoneNotSet, firstPersonBone, _a, firstPersonBoneOffset, meshAnnotations, meshes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isFirstPersonBoneNotSet = firstPerson.firstPersonBone === undefined || firstPerson.firstPersonBone === -1;
                        if (!isFirstPersonBoneNotSet) return [3, 1];
                        _a = humanBones[Raw.HumanBone.Head];
                        return [3, 3];
                    case 1: return [4, gltf.parser.getDependency('node', firstPerson.firstPersonBone)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        firstPersonBone = _a;
                        if (!firstPersonBone) {
                            console.warn('Could not find firstPersonBone of the VRM');
                            return [2, null];
                        }
                        firstPersonBoneOffset = !isFirstPersonBoneNotSet && firstPerson.firstPersonBoneOffset
                            ? new THREE.Vector3(firstPerson.firstPersonBoneOffset.x, firstPerson.firstPersonBoneOffset.y, firstPerson.firstPersonBoneOffset.z)
                            : new THREE.Vector3(0, 0.06, 0);
                        meshAnnotations = [];
                        return [4, gltf.parser.getDependencies('mesh')];
                    case 4:
                        meshes = _b.sent();
                        meshes.forEach(function (mesh, meshIndex) {
                            var flag = firstPerson.meshAnnotations
                                ? firstPerson.meshAnnotations.find(function (annotation) { return annotation.mesh === meshIndex; })
                                : undefined;
                            meshAnnotations.push(new firstperson_1.RendererFirstPersonFlags(flag && flag.firstPersonFlag, mesh));
                        });
                        return [2, new firstperson_1.VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations)];
                }
            });
        });
    };
    VRMPartsBuilder.prototype.loadLookAt = function (firstPerson, blendShapeProxy, humanBodyBones) {
        var lookAtHorizontalInner = firstPerson.lookAtHorizontalInner;
        var lookAtHorizontalOuter = firstPerson.lookAtHorizontalOuter;
        var lookAtVerticalDown = firstPerson.lookAtVerticalDown;
        var lookAtVerticalUp = firstPerson.lookAtVerticalUp;
        switch (firstPerson.lookAtTypeName) {
            case Raw.LookAtTypeName.Bone: {
                if (lookAtHorizontalInner === undefined ||
                    lookAtHorizontalOuter === undefined ||
                    lookAtVerticalDown === undefined ||
                    lookAtVerticalUp === undefined) {
                    return new lookat_1.VRMLookAtHead(humanBodyBones);
                }
                else {
                    return new lookat_1.VRMLookAtHead(humanBodyBones, new VRMLookAtBoneApplyer_1.VRMLookAtBoneApplyer(humanBodyBones, lookAtHorizontalInner, lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp));
                }
            }
            case Raw.LookAtTypeName.BlendShape: {
                if (lookAtHorizontalOuter === undefined || lookAtVerticalDown === undefined || lookAtVerticalUp === undefined) {
                    return new lookat_1.VRMLookAtHead(humanBodyBones);
                }
                else {
                    return new lookat_1.VRMLookAtHead(humanBodyBones, new VRMLookAtBlendShapeApplyer_1.VRMLookAtBlendShapeApplyer(blendShapeProxy, lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp));
                }
            }
            default: {
                return new lookat_1.VRMLookAtHead(humanBodyBones);
            }
        }
    };
    VRMPartsBuilder.prototype.loadBlendShapeMaster = function (animationMixer, gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var blendShapeGroups, blendShapeMaster, blendShapePresetMap;
            var _this = this;
            return __generator(this, function (_a) {
                blendShapeGroups = gltf.parser.json.extensions &&
                    gltf.parser.json.extensions.VRM &&
                    gltf.parser.json.extensions.VRM.blendShapeMaster &&
                    gltf.parser.json.extensions.VRM.blendShapeMaster.blendShapeGroups;
                if (!blendShapeGroups) {
                    return [2, null];
                }
                blendShapeMaster = new blendshape_1.BlendShapeMaster();
                blendShapePresetMap = {};
                blendShapeGroups.forEach(function (group) { return __awaiter(_this, void 0, void 0, function () {
                    var name, controller, materialValues;
                    var _this = this;
                    return __generator(this, function (_a) {
                        name = group.name;
                        if (name === undefined) {
                            console.warn('createBlendShapeMasterFromVRM: One of blendShapeGroups has no name');
                            return [2];
                        }
                        if (group.presetName &&
                            group.presetName !== Raw.BlendShapePresetName.Unknown &&
                            !blendShapePresetMap[group.presetName]) {
                            blendShapePresetMap[group.presetName] = group.name;
                        }
                        controller = new blendshape_1.BlendShapeController(name);
                        gltf.scene.add(controller);
                        controller.isBinary = group.isBinary || false;
                        if (Array.isArray(group.binds)) {
                            group.binds.forEach(function (bind) { return __awaiter(_this, void 0, void 0, function () {
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
                                                console.warn("createBlendShapeMasterFromVRM: " + group.name + " attempts to index " + morphTargetIndex + "th morph but not found.");
                                                return [2];
                                            }
                                            controller.addBind({
                                                meshes: primitives,
                                                morphTargetIndex: morphTargetIndex,
                                                weight: bind.weight || 100,
                                            });
                                            return [2];
                                    }
                                });
                            }); });
                        }
                        materialValues = group.materialValues;
                        if (Array.isArray(materialValues)) {
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
                                    controller.addMaterialValue({
                                        material: material,
                                        propertyName: _this.renameMaterialProperty(materialValue.propertyName),
                                        targetValue: materialValue.targetValue,
                                    });
                                });
                            });
                        }
                        blendShapeMaster.registerBlendShapeGroup(name, controller);
                        return [2];
                    });
                }); });
                return [2, blendshape_1.VRMBlendShapeProxy.create(animationMixer, blendShapeMaster, blendShapePresetMap)];
            });
        });
    };
    VRMPartsBuilder.prototype.loadSecondary = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = new springbone_1.VRMSpringBoneManager();
                        return [4, manager.loadGLTF(gltf)];
                    case 1:
                        _a.sent();
                        return [2, manager];
                }
            });
        });
    };
    VRMPartsBuilder.prototype.renameMaterialProperty = function (name) {
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
    return VRMPartsBuilder;
}());
exports.VRMPartsBuilder = VRMPartsBuilder;


/***/ }),

/***/ "./src/vrm/blendshape/BlendShapeController.ts":
/*!****************************************************!*\
  !*** ./src/vrm/blendshape/BlendShapeController.ts ***!
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
var THREE = __webpack_require__(/*! three */ "three");
var BlendShapeMaterialValueType;
(function (BlendShapeMaterialValueType) {
    BlendShapeMaterialValueType[BlendShapeMaterialValueType["NUMBER"] = 0] = "NUMBER";
    BlendShapeMaterialValueType[BlendShapeMaterialValueType["VECTOR2"] = 1] = "VECTOR2";
    BlendShapeMaterialValueType[BlendShapeMaterialValueType["VECTOR3"] = 2] = "VECTOR3";
    BlendShapeMaterialValueType[BlendShapeMaterialValueType["VECTOR4"] = 3] = "VECTOR4";
    BlendShapeMaterialValueType[BlendShapeMaterialValueType["COLOR"] = 4] = "COLOR";
})(BlendShapeMaterialValueType || (BlendShapeMaterialValueType = {}));
var _v2 = new THREE.Vector2();
var _v3 = new THREE.Vector3();
var _v4 = new THREE.Vector4();
var _color = new THREE.Color();
var BlendShapeController = (function (_super) {
    __extends(BlendShapeController, _super);
    function BlendShapeController(expressionName) {
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
    BlendShapeController.prototype.addBind = function (args) {
        var weight = args.weight / 100;
        this._binds.push({
            meshes: args.meshes,
            morphTargetIndex: args.morphTargetIndex,
            weight: weight,
        });
    };
    BlendShapeController.prototype.addMaterialValue = function (args) {
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
            type = BlendShapeMaterialValueType.VECTOR2;
            defaultValue = value.clone();
            targetValue = new THREE.Vector2().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isVector3) {
            type = BlendShapeMaterialValueType.VECTOR3;
            defaultValue = value.clone();
            targetValue = new THREE.Vector3().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else if (value.isVector4) {
            type = BlendShapeMaterialValueType.VECTOR4;
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
            type = BlendShapeMaterialValueType.COLOR;
            defaultValue = value.clone();
            targetValue = new THREE.Color().fromArray(args.targetValue);
            deltaValue = targetValue.clone().sub(defaultValue);
        }
        else {
            type = BlendShapeMaterialValueType.NUMBER;
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
    BlendShapeController.prototype.applyWeight = function () {
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
            if (materialValue.type === BlendShapeMaterialValueType.NUMBER) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName] += deltaValue * w;
            }
            else if (materialValue.type === BlendShapeMaterialValueType.VECTOR2) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v2.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === BlendShapeMaterialValueType.VECTOR3) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v3.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === BlendShapeMaterialValueType.VECTOR4) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_v4.copy(deltaValue).multiplyScalar(w));
            }
            else if (materialValue.type === BlendShapeMaterialValueType.COLOR) {
                var deltaValue = materialValue.deltaValue;
                materialValue.material[materialValue.propertyName].add(_color.copy(deltaValue).multiplyScalar(w));
            }
            if (typeof materialValue.material.shouldApplyUniforms === 'boolean') {
                materialValue.material.shouldApplyUniforms = true;
            }
        });
    };
    BlendShapeController.prototype.clearAppliedWeight = function () {
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
            if (materialValue.type === BlendShapeMaterialValueType.NUMBER) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName] = defaultValue;
            }
            else if (materialValue.type === BlendShapeMaterialValueType.VECTOR2) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === BlendShapeMaterialValueType.VECTOR3) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === BlendShapeMaterialValueType.VECTOR4) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            else if (materialValue.type === BlendShapeMaterialValueType.COLOR) {
                var defaultValue = materialValue.defaultValue;
                materialValue.material[materialValue.propertyName].copy(defaultValue);
            }
            if (typeof materialValue.material.shouldApplyUniforms === 'boolean') {
                materialValue.material.shouldApplyUniforms = true;
            }
        });
    };
    return BlendShapeController;
}(THREE.Object3D));
exports.BlendShapeController = BlendShapeController;


/***/ }),

/***/ "./src/vrm/blendshape/BlendShapeMaster.ts":
/*!************************************************!*\
  !*** ./src/vrm/blendshape/BlendShapeMaster.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BlendShapeMaster = (function () {
    function BlendShapeMaster() {
        this._blendShapeGroups = {};
    }
    Object.defineProperty(BlendShapeMaster.prototype, "blendShapeGroups", {
        get: function () {
            return this._blendShapeGroups;
        },
        enumerable: true,
        configurable: true
    });
    BlendShapeMaster.prototype.getBlendShapeGroup = function (name) {
        return this._blendShapeGroups[name];
    };
    BlendShapeMaster.prototype.registerBlendShapeGroup = function (name, controller) {
        this._blendShapeGroups[name] = controller;
    };
    BlendShapeMaster.prototype.update = function () {
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
    return BlendShapeMaster;
}());
exports.BlendShapeMaster = BlendShapeMaster;


/***/ }),

/***/ "./src/vrm/blendshape/VRMBlendShapeProxy.ts":
/*!**************************************************!*\
  !*** ./src/vrm/blendshape/VRMBlendShapeProxy.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
var VRMBlendShapeProxy = (function () {
    function VRMBlendShapeProxy(blendShapeMaster, blendShapePresetMap, expressions) {
        this.expressions = {};
        this._blendShapeMaster = blendShapeMaster;
        this._blendShapePresetMap = blendShapePresetMap;
        this.expressions = expressions;
    }
    VRMBlendShapeProxy.create = function (animationMixer, blendShapeMaster, blendShapePresetMap) {
        var expressions = {};
        Object.keys(blendShapeMaster.blendShapeGroups).forEach(function (expressionName) {
            var controller = blendShapeMaster.blendShapeGroups[expressionName];
            var tracks = [];
            var trackName = controller.name + ".weight";
            var times = [0, 1];
            var values = [1, 1];
            var track = new THREE.NumberKeyframeTrack(trackName, times, values);
            tracks.push(track);
            var clip = new THREE.AnimationClip(expressionName, 1, tracks);
            var expression = animationMixer.clipAction(clip);
            expression.setEffectiveWeight(1).stop();
            expression.clampWhenFinished = true;
            expressions[expressionName] = expression;
        });
        return new VRMBlendShapeProxy(blendShapeMaster, blendShapePresetMap, expressions);
    };
    VRMBlendShapeProxy.clamp = function (value) {
        return Math.max(Math.min(value, 1.0), 0.0);
    };
    VRMBlendShapeProxy.prototype.getExpression = function (name) {
        return this.expressions[name];
    };
    VRMBlendShapeProxy.prototype.getValue = function (name) {
        var controller = this.getController(name);
        return controller && controller.weight;
    };
    VRMBlendShapeProxy.prototype.setValue = function (name, weight) {
        var controller = this.getController(name);
        if (controller) {
            controller.weight = VRMBlendShapeProxy.clamp(weight);
        }
    };
    VRMBlendShapeProxy.prototype.update = function () {
        this._blendShapeMaster.update();
    };
    VRMBlendShapeProxy.prototype.getController = function (name) {
        var actualName = this._blendShapePresetMap[name];
        var controller = this._blendShapeMaster.getBlendShapeGroup(actualName || name);
        if (!controller) {
            console.warn("no blend shape found by " + name);
            return;
        }
        return controller;
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRMBlendShapeProxy */ "./src/vrm/blendshape/VRMBlendShapeProxy.ts"));
__export(__webpack_require__(/*! ./BlendShapeController */ "./src/vrm/blendshape/BlendShapeController.ts"));
__export(__webpack_require__(/*! ./BlendShapeMaster */ "./src/vrm/blendshape/BlendShapeMaster.ts"));


/***/ }),

/***/ "./src/vrm/debug/VRM.ts":
/*!******************************!*\
  !*** ./src/vrm/debug/VRM.ts ***!
  \******************************/
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var THREE = __webpack_require__(/*! three */ "three");
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
var VRM_1 = __webpack_require__(/*! ../VRM */ "./src/vrm/VRM.ts");
var VRMPartsBuilder_1 = __webpack_require__(/*! ./VRMPartsBuilder */ "./src/vrm/debug/VRMPartsBuilder.ts");
var _v3B = new THREE.Vector3();
var _quatA = new THREE.Quaternion();
var VRMBuilderDebug = (function (_super) {
    __extends(VRMBuilderDebug, _super);
    function VRMBuilderDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VRMBuilderDebug.prototype.option = function (option) {
        this._option = option;
        return this;
    };
    VRMBuilderDebug.prototype.build = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var partsBuilder, vrm, convertedGltf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        partsBuilder = new VRMPartsBuilder_1.VRMPartsBuilderDebugProxy(this._partsBuilder, this._option);
                        vrm = new VRMDebug(partsBuilder, this._option);
                        return [4, this._materialConverter.convertGLTFMaterials(gltf)];
                    case 1:
                        convertedGltf = _a.sent();
                        return [4, vrm.loadGLTF(convertedGltf)];
                    case 2:
                        _a.sent();
                        return [2, vrm];
                }
            });
        });
    };
    return VRMBuilderDebug;
}(VRM_1.VRMBuilder));
exports.VRMBuilderDebug = VRMBuilderDebug;
var VRMDebug = (function (_super) {
    __extends(VRMDebug, _super);
    function VRMDebug(partsBuilder, debugOption) {
        var _this = _super.call(this, partsBuilder) || this;
        _this._debugOption = debugOption || {};
        return _this;
    }
    Object.defineProperty(VRMDebug, "Builder", {
        get: function () {
            return new VRMBuilderDebug();
        },
        enumerable: true,
        configurable: true
    });
    VRMDebug.from = function (gltf) {
        return new VRMBuilderDebug().build(gltf);
    };
    VRMDebug.prototype.loadGLTF = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.loadGLTF.call(this, gltf)];
                    case 1:
                        _a.sent();
                        if (!this._debugOption.disableBoxHelper) {
                            gltf.scene.add(new THREE.BoxHelper(gltf.scene));
                        }
                        if (!this._debugOption.disableSkeletonHelper) {
                            gltf.scene.add(new THREE.SkeletonHelper(gltf.scene));
                        }
                        if (!this._debugOption.disableFaceDirectionHelper) {
                            this._faceDirectionHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), 0.5, 0xff00ff);
                            gltf.scene.add(this._faceDirectionHelper);
                        }
                        if (this.humanBones && this.humanBones.leftEye && this.lookAt && !this._debugOption.disableLeftEyeDirectionHelper) {
                            this._leftEyeDirectionHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), 0.3, 0xff00ff, 0.05);
                            gltf.scene.add(this._leftEyeDirectionHelper);
                        }
                        if (this.humanBones &&
                            this.humanBones.rightEye &&
                            this.lookAt &&
                            !this._debugOption.disableRightEyeDirectionHelper) {
                            this._rightEyeDirectionHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), 0.3, 0xff00ff, 0.05);
                            gltf.scene.add(this._rightEyeDirectionHelper);
                        }
                        return [2];
                }
            });
        });
    };
    VRMDebug.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
        this.updateGizmos();
    };
    VRMDebug.prototype.updateGizmos = function () {
        if (this.lookAt && this._faceDirectionHelper) {
            this._faceDirectionHelper.position.fromArray(this.lookAt.getHeadPosition());
            this._faceDirectionHelper.setDirection(_v3B.fromArray(this.lookAt.getFaceDirection()));
        }
        if (this.humanBones &&
            this.humanBones.leftEye &&
            this.lookAt &&
            this.lookAt.leftEyeWorldPosition &&
            this._leftEyeDirectionHelper) {
            var leftEyeWorldRotation = math_1.getWorldQuaternionLite(this.humanBones.leftEye, _quatA);
            var direction = _v3B.set(0, 0, -1).applyQuaternion(leftEyeWorldRotation);
            this._leftEyeDirectionHelper.position.copy(this.lookAt.leftEyeWorldPosition);
            this._leftEyeDirectionHelper.setDirection(direction);
        }
        if (this.humanBones &&
            this.humanBones.rightEye &&
            this.lookAt &&
            this.lookAt.rightEyeWorldPosition &&
            this._rightEyeDirectionHelper) {
            var rightEyeWorldRotation = math_1.getWorldQuaternionLite(this.humanBones.rightEye, _quatA);
            var direction = _v3B.set(0, 0, -1).applyQuaternion(rightEyeWorldRotation);
            this._rightEyeDirectionHelper.position.copy(this.lookAt.rightEyeWorldPosition);
            this._rightEyeDirectionHelper.setDirection(direction);
        }
    };
    return VRMDebug;
}(VRM_1.VRM));
exports.VRMDebug = VRMDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMPartsBuilder.ts":
/*!******************************************!*\
  !*** ./src/vrm/debug/VRMPartsBuilder.ts ***!
  \******************************************/
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var VRMPartsBuilder_1 = __webpack_require__(/*! ../VRMPartsBuilder */ "./src/vrm/VRMPartsBuilder.ts");
var VRMSpringBoneManager_1 = __webpack_require__(/*! ./VRMSpringBoneManager */ "./src/vrm/debug/VRMSpringBoneManager.ts");
var VRMPartsBuilderDebugProxy = (function (_super) {
    __extends(VRMPartsBuilderDebugProxy, _super);
    function VRMPartsBuilderDebugProxy(target, debugOption) {
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.debugOption = debugOption;
        return _this;
    }
    VRMPartsBuilderDebugProxy.prototype.loadHumanoid = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.target.loadHumanoid(gltf)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    VRMPartsBuilderDebugProxy.prototype.loadFirstPerson = function (firstPerson, humanBones, gltf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.target.loadFirstPerson(firstPerson, humanBones, gltf)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    VRMPartsBuilderDebugProxy.prototype.loadLookAt = function (firstPerson, blendShapeProxy, humanBodyBones) {
        return this.target.loadLookAt(firstPerson, blendShapeProxy, humanBodyBones);
    };
    VRMPartsBuilderDebugProxy.prototype.loadBlendShapeMaster = function (animationMixer, gltf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.target.loadBlendShapeMaster(animationMixer, gltf)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    VRMPartsBuilderDebugProxy.prototype.loadSecondary = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var manager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.debugOption && this.debugOption.disableSpringBoneHelper)) return [3, 2];
                        return [4, this.target.loadSecondary(gltf)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        manager = new VRMSpringBoneManager_1.VRMSpringBoneManagerDebug();
                        return [4, manager.loadGLTF(gltf)];
                    case 3:
                        _a.sent();
                        return [2, manager];
                }
            });
        });
    };
    return VRMPartsBuilderDebugProxy;
}(VRMPartsBuilder_1.VRMPartsBuilder));
exports.VRMPartsBuilderDebugProxy = VRMPartsBuilderDebugProxy;


/***/ }),

/***/ "./src/vrm/debug/VRMSpringBone.ts":
/*!****************************************!*\
  !*** ./src/vrm/debug/VRMSpringBone.ts ***!
  \****************************************/
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
var THREE = __webpack_require__(/*! three */ "three");
var springbone_1 = __webpack_require__(/*! ../springbone */ "./src/vrm/springbone/index.ts");
var _v3A = new THREE.Vector3();
var VRMSpringBoneDebug = (function (_super) {
    __extends(VRMSpringBoneDebug, _super);
    function VRMSpringBoneDebug(bone, radius, stiffiness, gravityDir, gravityPower, dragForce, colliders) {
        if (colliders === void 0) { colliders = []; }
        return _super.call(this, bone, radius, stiffiness, gravityDir, gravityPower, dragForce, colliders) || this;
    }
    VRMSpringBoneDebug.prototype.getGizmo = function () {
        if (this._gizmo) {
            return this._gizmo;
        }
        var nextTailRelative = _v3A.copy(this.nextTail).sub(this.worldPosition);
        var nextTailRelativeLength = nextTailRelative.length();
        this._gizmo = new THREE.ArrowHelper(nextTailRelative.normalize(), this.worldPosition, nextTailRelativeLength, 0xffff00, this.radius, this.radius);
        this._gizmo.line.renderOrder = springbone_1.GIZMO_RENDER_ORDER;
        this._gizmo.cone.renderOrder = springbone_1.GIZMO_RENDER_ORDER;
        this._gizmo.line.material.depthTest = false;
        this._gizmo.line.material.transparent = true;
        this._gizmo.cone.material.depthTest = false;
        this._gizmo.cone.material.transparent = true;
        return this._gizmo;
    };
    VRMSpringBoneDebug.prototype.update = function (delta) {
        _super.prototype.update.call(this, delta);
        this.updateGizmo();
    };
    VRMSpringBoneDebug.prototype.updateGizmo = function () {
        if (!this._gizmo) {
            return;
        }
        var nextTailRelative = _v3A.copy(this.currentTail).sub(this.worldPosition);
        var nextTailRelativeLength = nextTailRelative.length();
        this._gizmo.setDirection(nextTailRelative.normalize());
        this._gizmo.setLength(nextTailRelativeLength, this.radius, this.radius);
        this._gizmo.position.copy(this.worldPosition);
    };
    return VRMSpringBoneDebug;
}(springbone_1.VRMSpringBone));
exports.VRMSpringBoneDebug = VRMSpringBoneDebug;


/***/ }),

/***/ "./src/vrm/debug/VRMSpringBoneManager.ts":
/*!***********************************************!*\
  !*** ./src/vrm/debug/VRMSpringBoneManager.ts ***!
  \***********************************************/
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
var springbone_1 = __webpack_require__(/*! ../springbone */ "./src/vrm/springbone/index.ts");
var VRMSpringBone_1 = __webpack_require__(/*! ./VRMSpringBone */ "./src/vrm/debug/VRMSpringBone.ts");
var VRMSpringBoneManagerDebug = (function (_super) {
    __extends(VRMSpringBoneManagerDebug, _super);
    function VRMSpringBoneManagerDebug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VRMSpringBoneManagerDebug.prototype.isColiderMeshVisible = function () {
        return true;
    };
    VRMSpringBoneManagerDebug.prototype.createSpringBone = function (gltf, bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders) {
        if (colliders === void 0) { colliders = []; }
        var springBone = new VRMSpringBone_1.VRMSpringBoneDebug(bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders);
        gltf.scene.add(springBone.getGizmo());
        return springBone;
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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRMPartsBuilder */ "./src/vrm/debug/VRMPartsBuilder.ts"));
__export(__webpack_require__(/*! ./VRM */ "./src/vrm/debug/VRM.ts"));
__export(__webpack_require__(/*! ./VRMSpringBoneManager */ "./src/vrm/debug/VRMSpringBoneManager.ts"));
__export(__webpack_require__(/*! ./VRMSpringBone */ "./src/vrm/debug/VRMSpringBone.ts"));


/***/ }),

/***/ "./src/vrm/firstperson/VRMFirstPerson.ts":
/*!***********************************************!*\
  !*** ./src/vrm/firstperson/VRMFirstPerson.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
var FirstPersonFlag;
(function (FirstPersonFlag) {
    FirstPersonFlag[FirstPersonFlag["Auto"] = 0] = "Auto";
    FirstPersonFlag[FirstPersonFlag["Both"] = 1] = "Both";
    FirstPersonFlag[FirstPersonFlag["ThirdPersonOnly"] = 2] = "ThirdPersonOnly";
    FirstPersonFlag[FirstPersonFlag["FirstPersonOnly"] = 3] = "FirstPersonOnly";
})(FirstPersonFlag || (FirstPersonFlag = {}));
var RendererFirstPersonFlags = (function () {
    function RendererFirstPersonFlags(firstPersonFlag, mesh) {
        this.firstPersonFlag = RendererFirstPersonFlags.parseFirstPersonFlag(firstPersonFlag);
        this.mesh = mesh;
    }
    RendererFirstPersonFlags.parseFirstPersonFlag = function (firstPersonFlag) {
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
    return RendererFirstPersonFlags;
}());
exports.RendererFirstPersonFlags = RendererFirstPersonFlags;
var VRMFirstPerson = (function () {
    function VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations) {
        this._meshAnnotations = [];
        this._firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER;
        this._thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER;
        this._initialized = false;
        this._firstPersonBone = firstPersonBone;
        this._firstPersonBoneOffset = firstPersonBoneOffset;
        this._meshAnnotations = meshAnnotations;
    }
    VRMFirstPerson.prototype.getFirstPersonBone = function () {
        return this._firstPersonBone;
    };
    VRMFirstPerson.prototype.getFirstPersonBoneOffset = function () {
        return this._firstPersonBoneOffset;
    };
    VRMFirstPerson.prototype.getMeshAnnotations = function () {
        return this._meshAnnotations;
    };
    VRMFirstPerson.prototype.setup = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.firstPersonOnlyLayer, firstPersonOnlyLayer = _c === void 0 ? VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER : _c, _d = _b.thirdPersonOnlyLayer, thirdPersonOnlyLayer = _d === void 0 ? VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER : _d;
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
                _this.createHeadlessModel(item.mesh);
            }
        });
    };
    VRMFirstPerson.prototype.getFirstPersonOnlyLayer = function () {
        return this._firstPersonOnlyLayer;
    };
    VRMFirstPerson.prototype.getThirdPersonOnlyLayer = function () {
        return this._thirdPersonOnlyLayer;
    };
    VRMFirstPerson.prototype.getFirstPersonWorldPosition = function (v3) {
        var offset = this._firstPersonBoneOffset;
        var v4 = new THREE.Vector4(offset.x, offset.y, offset.z, 1.0);
        v4.applyMatrix4(this._firstPersonBone.matrixWorld);
        return v3.set(v4.x, v4.y, v4.z);
    };
    VRMFirstPerson.prototype.excludeTriangles = function (triangles, bws, skinIndex, exclude) {
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
    VRMFirstPerson.prototype.createErasedMesh = function (src, erasingBonesIndex) {
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
        var oldTriangles = Array.from(geometry.getIndex().array);
        var count = this.excludeTriangles(oldTriangles, skinWeight, skinIndex, erasingBonesIndex);
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
    VRMFirstPerson.prototype.createHeadlessModelForSkinnedMesh = function (parent, mesh) {
        var _this = this;
        var eraseBoneIndexes = [];
        mesh.skeleton.bones.forEach(function (bone, index) {
            if (_this.isEraseTarget(bone))
                eraseBoneIndexes.push(index);
        });
        if (!eraseBoneIndexes.length) {
            mesh.layers.enable(this._thirdPersonOnlyLayer);
            mesh.layers.enable(this._firstPersonOnlyLayer);
            return;
        }
        mesh.layers.set(this._thirdPersonOnlyLayer);
        var newMesh = this.createErasedMesh(mesh, eraseBoneIndexes);
        parent.add(newMesh);
    };
    VRMFirstPerson.prototype.createHeadlessModel = function (node) {
        var _this = this;
        if (node.type === 'Group') {
            node.layers.set(this._thirdPersonOnlyLayer);
            if (this.isEraseTarget(node)) {
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
                    _this.createHeadlessModelForSkinnedMesh(parent_1, child);
                });
            }
        }
        else if (node.type === 'SkinnedMesh') {
            this.createHeadlessModelForSkinnedMesh(node.parent, node);
        }
        else {
            if (this.isEraseTarget(node)) {
                node.layers.set(this._thirdPersonOnlyLayer);
                node.traverse(function (child) { return child.layers.set(_this._thirdPersonOnlyLayer); });
            }
        }
    };
    VRMFirstPerson.prototype.isEraseTarget = function (bone) {
        if (bone.name === this._firstPersonBone.name) {
            return true;
        }
        else if (!bone.parent) {
            return false;
        }
        else {
            return this.isEraseTarget(bone.parent);
        }
    };
    VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
    VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER = 10;
    return VRMFirstPerson;
}());
exports.VRMFirstPerson = VRMFirstPerson;


/***/ }),

/***/ "./src/vrm/firstperson/index.ts":
/*!**************************************!*\
  !*** ./src/vrm/firstperson/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRMFirstPerson */ "./src/vrm/firstperson/VRMFirstPerson.ts"));


/***/ }),

/***/ "./src/vrm/humanoid/VRMHumanBones.ts":
/*!*******************************************!*\
  !*** ./src/vrm/humanoid/VRMHumanBones.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var VRMHumanBones = (function () {
    function VRMHumanBones() {
    }
    return VRMHumanBones;
}());
types_1.HumanBone.Hips, types_1.HumanBone.LeftUpperLeg, types_1.HumanBone.RightUpperLeg, types_1.HumanBone.LeftLowerLeg, types_1.HumanBone.RightLowerLeg, types_1.HumanBone.LeftFoot, types_1.HumanBone.RightFoot, types_1.HumanBone.Spine, types_1.HumanBone.Chest, types_1.HumanBone.Neck, types_1.HumanBone.Head, types_1.HumanBone.LeftShoulder, types_1.HumanBone.RightShoulder, types_1.HumanBone.LeftUpperArm, types_1.HumanBone.RightUpperArm, types_1.HumanBone.LeftLowerArm, types_1.HumanBone.RightLowerArm, types_1.HumanBone.LeftHand, types_1.HumanBone.RightHand, types_1.HumanBone.LeftToes, types_1.HumanBone.RightToes, types_1.HumanBone.LeftEye, types_1.HumanBone.RightEye, types_1.HumanBone.Jaw, types_1.HumanBone.LeftThumbProximal, types_1.HumanBone.LeftThumbIntermediate, types_1.HumanBone.LeftThumbDistal, types_1.HumanBone.LeftIndexProximal, types_1.HumanBone.LeftIndexIntermediate, types_1.HumanBone.LeftIndexDistal, types_1.HumanBone.LeftMiddleProximal, types_1.HumanBone.LeftMiddleIntermediate, types_1.HumanBone.LeftMiddleDistal, types_1.HumanBone.LeftRingProximal, types_1.HumanBone.LeftRingIntermediate, types_1.HumanBone.LeftRingDistal, types_1.HumanBone.LeftLittleProximal, types_1.HumanBone.LeftLittleIntermediate, types_1.HumanBone.LeftLittleDistal, types_1.HumanBone.RightThumbProximal, types_1.HumanBone.RightThumbIntermediate, types_1.HumanBone.RightThumbDistal, types_1.HumanBone.RightIndexProximal, types_1.HumanBone.RightIndexIntermediate, types_1.HumanBone.RightIndexDistal, types_1.HumanBone.RightMiddleProximal, types_1.HumanBone.RightMiddleIntermediate, types_1.HumanBone.RightMiddleDistal, types_1.HumanBone.RightRingProximal, types_1.HumanBone.RightRingIntermediate, types_1.HumanBone.RightRingDistal, types_1.HumanBone.RightLittleProximal, types_1.HumanBone.RightLittleIntermediate, types_1.HumanBone.RightLittleDistal, types_1.HumanBone.UpperChest;
exports.VRMHumanBones = VRMHumanBones;


/***/ }),

/***/ "./src/vrm/humanoid/index.ts":
/*!***********************************!*\
  !*** ./src/vrm/humanoid/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRMHumanBones */ "./src/vrm/humanoid/VRMHumanBones.ts"));


/***/ }),

/***/ "./src/vrm/index.ts":
/*!**************************!*\
  !*** ./src/vrm/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRM */ "./src/vrm/VRM.ts"));
__export(__webpack_require__(/*! ./VRMPartsBuilder */ "./src/vrm/VRMPartsBuilder.ts"));
__export(__webpack_require__(/*! ./blendshape */ "./src/vrm/blendshape/index.ts"));
__export(__webpack_require__(/*! ./debug */ "./src/vrm/debug/index.ts"));
__export(__webpack_require__(/*! ./firstperson */ "./src/vrm/firstperson/index.ts"));
__export(__webpack_require__(/*! ./humanoid */ "./src/vrm/humanoid/index.ts"));
__export(__webpack_require__(/*! ./lookat */ "./src/vrm/lookat/index.ts"));
__export(__webpack_require__(/*! ./springbone */ "./src/vrm/springbone/index.ts"));
__export(__webpack_require__(/*! ./types */ "./src/vrm/types/index.ts"));
__export(__webpack_require__(/*! ./material */ "./src/vrm/material/index.ts"));


/***/ }),

/***/ "./src/vrm/lookat/CurveMapper.ts":
/*!***************************************!*\
  !*** ./src/vrm/lookat/CurveMapper.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEG2RAD = Math.PI / 180.0;
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
    var outNode = 0;
    while (true) {
        if (arr.length <= 4 * outNode) {
            return arr[4 * outNode - 3];
        }
        else if (x <= arr[4 * outNode]) {
            break;
        }
        outNode++;
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
var CurveMapper = (function () {
    function CurveMapper(xRange, yRange, curve) {
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
    CurveMapper.apply = function (map) {
        return new CurveMapper(map.xRange, map.yRange, map.curve);
    };
    CurveMapper.prototype.map = function (src) {
        var clampedSrc = Math.min(Math.max(src, 0.0), this.curveXRangeDegree);
        var x = clampedSrc / this.curveXRangeDegree;
        return this.curveYRangeDegree * evaluateCurve(this.curve, x);
    };
    return CurveMapper;
}());
exports.CurveMapper = CurveMapper;


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtApplyer.ts":
/*!********************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtApplyer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VRMLookAtApplyer = (function () {
    function VRMLookAtApplyer(lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp) {
        this.lookAtHorizontalOuter = lookAtHorizontalOuter;
        this.lookAtVerticalDown = lookAtVerticalDown;
        this.lookAtVerticalUp = lookAtVerticalUp;
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
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var CurveMapper_1 = __webpack_require__(/*! ./CurveMapper */ "./src/vrm/lookat/CurveMapper.ts");
var VRMLookAtApplyer_1 = __webpack_require__(/*! ./VRMLookAtApplyer */ "./src/vrm/lookat/VRMLookAtApplyer.ts");
var VRMLookAtBlendShapeApplyer = (function (_super) {
    __extends(VRMLookAtBlendShapeApplyer, _super);
    function VRMLookAtBlendShapeApplyer(blendShapeProxy, lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp) {
        var _this = _super.call(this, lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp) || this;
        _this._blendShapeProxy = blendShapeProxy;
        return _this;
    }
    VRMLookAtBlendShapeApplyer.prototype.name = function () {
        return types_1.LookAtTypeName.BlendShape;
    };
    VRMLookAtBlendShapeApplyer.prototype.lookAt = function (euler) {
        var srcX = euler.x;
        var srcY = euler.y;
        var mapperHorizontal = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtHorizontalOuter));
        var mapperVerticalDown = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtVerticalDown));
        var mapperVerticalUp = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtVerticalUp));
        if (srcY < 0.0) {
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookleft, 0.0);
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookright, mapperHorizontal.map(-srcY));
        }
        else {
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookright, 0.0);
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookleft, mapperHorizontal.map(srcY));
        }
        if (srcX < 0.0) {
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookdown, 0.0);
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookup, mapperVerticalUp.map(-srcX));
        }
        else {
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookup, 0.0);
            this._blendShapeProxy.setValue(types_1.BlendShapePresetName.Lookdown, mapperVerticalDown.map(srcX));
        }
    };
    return VRMLookAtBlendShapeApplyer;
}(VRMLookAtApplyer_1.VRMLookAtApplyer));
exports.VRMLookAtBlendShapeApplyer = VRMLookAtBlendShapeApplyer;
function deg2rad(map) {
    return {
        xRange: typeof map.xRange === 'number' ? CurveMapper_1.DEG2RAD * map.xRange : undefined,
        yRange: map.yRange,
        curve: map.curve,
    };
}


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
var types_1 = __webpack_require__(/*! ../types */ "./src/vrm/types/index.ts");
var CurveMapper_1 = __webpack_require__(/*! ./CurveMapper */ "./src/vrm/lookat/CurveMapper.ts");
var VRMLookAtApplyer_1 = __webpack_require__(/*! ./VRMLookAtApplyer */ "./src/vrm/lookat/VRMLookAtApplyer.ts");
var VRMLookAtBoneApplyer = (function (_super) {
    __extends(VRMLookAtBoneApplyer, _super);
    function VRMLookAtBoneApplyer(humanBodyBones, lookAtHorizontalInner, lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp) {
        var _this = _super.call(this, lookAtHorizontalOuter, lookAtVerticalDown, lookAtVerticalUp) || this;
        _this._leftEye = humanBodyBones.leftEye;
        _this._rightEye = humanBodyBones.rightEye;
        _this.lookAtHorizontalInner = lookAtHorizontalInner;
        return _this;
    }
    VRMLookAtBoneApplyer.prototype.name = function () {
        return types_1.LookAtTypeName.Bone;
    };
    VRMLookAtBoneApplyer.prototype.lookAt = function (euler) {
        var srcX = euler.x;
        var srcY = euler.y;
        var mapperHorizontalInner = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtHorizontalInner));
        var mapperHorizontalOuter = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtHorizontalOuter));
        var mapperVerticalDown = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtVerticalDown));
        var mapperVerticalUp = CurveMapper_1.CurveMapper.apply(deg2rad(this.lookAtVerticalUp));
        if (this._leftEye) {
            if (srcX < 0.0) {
                this._leftEye.rotation.x = -mapperVerticalDown.map(-srcX);
            }
            else {
                this._leftEye.rotation.x = mapperVerticalUp.map(srcX);
            }
            if (srcY < 0.0) {
                this._leftEye.rotation.y = -mapperHorizontalInner.map(-srcY);
            }
            else {
                this._leftEye.rotation.y = mapperHorizontalOuter.map(srcY);
            }
        }
        if (this._rightEye) {
            if (srcX < 0.0) {
                this._rightEye.rotation.x = -mapperVerticalDown.map(-srcX);
            }
            else {
                this._rightEye.rotation.x = mapperVerticalUp.map(srcX);
            }
            if (srcY < 0.0) {
                this._rightEye.rotation.y = -mapperHorizontalOuter.map(-srcY);
            }
            else {
                this._rightEye.rotation.y = mapperHorizontalInner.map(srcY);
            }
        }
    };
    return VRMLookAtBoneApplyer;
}(VRMLookAtApplyer_1.VRMLookAtApplyer));
exports.VRMLookAtBoneApplyer = VRMLookAtBoneApplyer;
function deg2rad(map) {
    return {
        xRange: typeof map.xRange === 'number' ? CurveMapper_1.DEG2RAD * map.xRange : undefined,
        yRange: typeof map.yRange === 'number' ? CurveMapper_1.DEG2RAD * map.yRange : undefined,
        curve: map.curve,
    };
}


/***/ }),

/***/ "./src/vrm/lookat/VRMLookAtHead.ts":
/*!*****************************************!*\
  !*** ./src/vrm/lookat/VRMLookAtHead.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
var _v3A = new THREE.Vector3();
var _v3B = new THREE.Vector3();
var _euler = new THREE.Euler();
var _mat4 = new THREE.Matrix4();
var _quatA = new THREE.Quaternion();
var _quatB = new THREE.Quaternion();
var _quatC = new THREE.Quaternion();
var UP_VECTOR = Object.freeze(new THREE.Vector3(0, 1, 0));
var LOOK_AT_EULER_ORDER = 'ZXY';
var VRMLookAtHead = (function () {
    function VRMLookAtHead(humanBones, applyer) {
        this.autoUpdate = true;
        this.givingUpThreshold = undefined;
        this.dumpingFactor = 0.5;
        this._lastTargetPosition = new THREE.Vector3();
        this._applyer = applyer;
        this.head = humanBones.head;
        this._leftEye = humanBones.leftEye;
        this._rightEye = humanBones.rightEye;
        if (this._leftEye) {
            this.leftEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._leftEye.matrixWorld);
        }
        if (this._rightEye) {
            this.rightEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._rightEye.matrixWorld);
        }
    }
    VRMLookAtHead.prototype.getApplyer = function () {
        return this._applyer;
    };
    VRMLookAtHead.prototype.getTarget = function () {
        return this._target;
    };
    VRMLookAtHead.prototype.setTarget = function (target) {
        this._target = target;
        this._lookAtTarget = target.position.clone();
        this._lastTargetPosition = target.position.clone();
        this._lookAtTargetTo = target.position.clone();
    };
    VRMLookAtHead.prototype.getHeadPosition = function () {
        _v3A.setFromMatrixPosition(this.head.matrixWorld);
        var x = _v3A.x;
        var z = _v3A.z;
        var y = this.leftEyeWorldPosition
            ? this.leftEyeWorldPosition.y
            : this.rightEyeWorldPosition
                ? this.rightEyeWorldPosition.y
                : _v3A.y;
        return [x, y, z];
    };
    VRMLookAtHead.prototype.getFaceDirection = function () {
        _mat4.extractRotation(this.head.matrixWorld);
        var direction = _v3A.set(0, 0, -1);
        direction.applyMatrix4(_mat4);
        return [direction.x, direction.y, direction.z];
    };
    VRMLookAtHead.prototype.lookAt = function (x, y, z) {
        if (!this._applyer) {
            return;
        }
        var headPosition = _v3A.fromArray(this.getHeadPosition());
        var targetPosition = _v3B.set(x, y, z);
        _mat4.identity().lookAt(headPosition, targetPosition, UP_VECTOR);
        var worldRotation = _quatA.setFromRotationMatrix(_mat4);
        var localRotation = _quatB.multiplyQuaternions(worldRotation, math_1.getWorldQuaternionLite(this.head.parent, _quatC).inverse());
        _euler.setFromQuaternion(localRotation, LOOK_AT_EULER_ORDER);
        this._applyer.lookAt(_euler);
    };
    VRMLookAtHead.prototype.update = function () {
        if (this._target && this.head && this.autoUpdate && this._lookAtTarget && this._lookAtTargetTo) {
            this.setCurrentTargetPosition(this._target, this._lookAtTargetTo);
            var result = new THREE.Vector3().set(this._lookAtTargetTo.x - this._lookAtTarget.x, this._lookAtTargetTo.y - this._lookAtTarget.y, this._lookAtTargetTo.z - this._lookAtTarget.z);
            this._lookAtTarget.add(result.multiplyScalar(this.dumpingFactor));
            this.lookAt(this._lookAtTarget.x, this._lookAtTarget.y, this._lookAtTarget.z);
        }
        if (this._leftEye) {
            this.leftEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._leftEye.matrixWorld);
        }
        if (this._rightEye) {
            this.rightEyeWorldPosition = new THREE.Vector3().setFromMatrixPosition(this._rightEye.matrixWorld);
        }
    };
    VRMLookAtHead.prototype.setCurrentTargetPosition = function (target, lookAtTargetTo) {
        if (!this._lastTargetPosition.equals(target.position)) {
            this.setTarget(target);
            var headPosition = new THREE.Vector3().fromArray(this.getHeadPosition());
            var faceDirection = new THREE.Vector3().fromArray(this.getFaceDirection());
            var targetPosition = new THREE.Vector3(target.position.x, target.position.y, target.position.z);
            var lookAtDirection = targetPosition.sub(headPosition).normalize();
            if (this.givingUpThreshold !== undefined && lookAtDirection.dot(faceDirection) < this.givingUpThreshold) {
                targetPosition.copy(headPosition).add(faceDirection.multiplyScalar(3.0));
                lookAtTargetTo.copy(targetPosition);
                return;
            }
            var distance = targetPosition.distanceTo(headPosition);
            var modifiedLookAtDirection = lookAtDirection.multiplyScalar(distance).add(headPosition);
            lookAtTargetTo.set(modifiedLookAtDirection.x, modifiedLookAtDirection.y, modifiedLookAtDirection.z);
        }
    };
    return VRMLookAtHead;
}());
exports.VRMLookAtHead = VRMLookAtHead;


/***/ }),

/***/ "./src/vrm/lookat/index.ts":
/*!*********************************!*\
  !*** ./src/vrm/lookat/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRMLookAtHead */ "./src/vrm/lookat/VRMLookAtHead.ts"));
__export(__webpack_require__(/*! ./VRMLookAtApplyer */ "./src/vrm/lookat/VRMLookAtApplyer.ts"));


/***/ }),

/***/ "./src/vrm/material/MToon.ts":
/*!***********************************!*\
  !*** ./src/vrm/material/MToon.ts ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
var texel_decoder_1 = __webpack_require__(/*! ./texel-decoder */ "./src/vrm/material/texel-decoder.ts");
var MToon = (function (_super) {
    __extends(MToon, _super);
    function MToon(colorSpaceGamma, parameters) {
        var _this = _super.call(this) || this;
        _this.isVRMMToon = true;
        _this.cutoff = 0.5;
        _this.color = new THREE.Vector4(1.0, 1.0, 1.0, 1.0);
        _this.shadeColor = new THREE.Vector4(0.97, 0.81, 0.86, 1.0);
        _this.map = null;
        _this.mainTex_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0);
        _this.shadeTexture = null;
        _this.bumpScale = 1.0;
        _this.normalMap = null;
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
        _this.shouldApplyUniforms = true;
        _this._debugMode = MToonDebugMode.None;
        _this._blendMode = MToonRenderMode.Opaque;
        _this._outlineWidthMode = MToonOutlineWidthMode.None;
        _this._outlineColorMode = MToonOutlineColorMode.FixedColor;
        _this._cullMode = MToonCullMode.Back;
        _this._outlineCullMode = MToonCullMode.Front;
        _this._isOutline = false;
        _this._colorSpaceGamma = colorSpaceGamma;
        if (parameters === undefined) {
            parameters = {};
        }
        [
            'shadeTexture_ST',
            'bumpMap_ST',
            'receiveShadowTexture_ST',
            'shadingGradeTexture_ST',
            'sphereAdd_ST',
            'emissionMap_ST',
            'outlineWidthTexture_ST',
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
                bumpScale: { value: 1.0 },
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
            },
        ]);
        _this.setValues(parameters);
        _this.updateShaderCode();
        return _this;
    }
    Object.defineProperty(MToon.prototype, "mainTex", {
        get: function () {
            return this.map;
        },
        set: function (t) {
            this.map = t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "bumpMap", {
        get: function () {
            return this.normalMap;
        },
        set: function (t) {
            this.normalMap = t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "emissionMap", {
        get: function () {
            return this.emissiveMap;
        },
        set: function (t) {
            this.emissiveMap = t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "blendMode", {
        get: function () {
            return this._blendMode;
        },
        set: function (m) {
            this._blendMode = m;
            this.depthWrite = this._blendMode !== MToonRenderMode.Transparent;
            this.transparent =
                this._blendMode === MToonRenderMode.Transparent || this._blendMode === MToonRenderMode.TransparentWithZWrite;
            this.updateShaderCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "debugMode", {
        get: function () {
            return this._debugMode;
        },
        set: function (m) {
            this._debugMode = m;
            this.updateShaderCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "outlineWidthMode", {
        get: function () {
            return this._outlineWidthMode;
        },
        set: function (m) {
            this._outlineWidthMode = m;
            this.updateShaderCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "outlineColorMode", {
        get: function () {
            return this._outlineColorMode;
        },
        set: function (m) {
            this._outlineColorMode = m;
            this.updateShaderCode();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "cullMode", {
        get: function () {
            return this._cullMode;
        },
        set: function (m) {
            this._cullMode = m;
            this.updateCullFace();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "outlineCullMode", {
        get: function () {
            return this._outlineCullMode;
        },
        set: function (m) {
            this._outlineCullMode = m;
            this.updateCullFace();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "zWrite", {
        get: function () {
            return this.depthWrite ? 1 : 0;
        },
        set: function (i) {
            this.depthWrite = 0.5 <= i;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MToon.prototype, "isOutline", {
        get: function () {
            return this._isOutline;
        },
        set: function (b) {
            this._isOutline = b;
            this.updateShaderCode();
            this.updateCullFace();
        },
        enumerable: true,
        configurable: true
    });
    MToon.prototype.copy = function (source) {
        _super.prototype.copy.call(this, source);
        this.cutoff = source.cutoff;
        this.color.copy(source.color);
        this.shadeColor.copy(source.shadeColor);
        this.map = source.map;
        this.mainTex_ST.copy(source.mainTex_ST);
        this.shadeTexture = source.shadeTexture;
        this.bumpScale = source.bumpScale;
        this.normalMap = source.normalMap;
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
        this.debugMode = source.debugMode;
        this.blendMode = source.blendMode;
        this.outlineWidthMode = source.outlineWidthMode;
        this.outlineColorMode = source.outlineColorMode;
        this.cullMode = source.cullMode;
        this.outlineCullMode = source.outlineCullMode;
        this.isOutline = source.isOutline;
        return this;
    };
    MToon.prototype.applyUniforms = function () {
        if (!this.shouldApplyUniforms) {
            return;
        }
        this.shouldApplyUniforms = false;
        this.uniforms.cutoff.value = this.cutoff;
        this.uniforms.color.value.setRGB(this.color.x, this.color.y, this.color.z);
        if (!this._colorSpaceGamma) {
            this.uniforms.color.value.convertSRGBToLinear();
        }
        this.uniforms.colorAlpha.value = this.color.w;
        this.uniforms.shadeColor.value.setRGB(this.shadeColor.x, this.shadeColor.y, this.shadeColor.z);
        if (!this._colorSpaceGamma) {
            this.uniforms.shadeColor.value.convertSRGBToLinear();
        }
        this.uniforms.map.value = this.map;
        this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
        this.uniforms.shadeTexture.value = this.shadeTexture;
        this.uniforms.bumpScale.value = this.bumpScale;
        this.uniforms.normalMap.value = this.normalMap;
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
        if (!this._colorSpaceGamma) {
            this.uniforms.rimColor.value.convertSRGBToLinear();
        }
        this.uniforms.rimLightingMix.value = this.rimLightingMix;
        this.uniforms.rimFresnelPower.value = this.rimFresnelPower;
        this.uniforms.rimLift.value = this.rimLift;
        this.uniforms.sphereAdd.value = this.sphereAdd;
        this.uniforms.emissionColor.value.setRGB(this.emissionColor.x, this.emissionColor.y, this.emissionColor.z);
        if (!this._colorSpaceGamma) {
            this.uniforms.emissionColor.value.convertSRGBToLinear();
        }
        this.uniforms.emissiveMap.value = this.emissiveMap;
        this.uniforms.outlineWidthTexture.value = this.outlineWidthTexture;
        this.uniforms.outlineWidth.value = this.outlineWidth;
        this.uniforms.outlineScaledMaxDistance.value = this.outlineScaledMaxDistance;
        this.uniforms.outlineColor.value.setRGB(this.outlineColor.x, this.outlineColor.y, this.outlineColor.z);
        if (!this._colorSpaceGamma) {
            this.uniforms.outlineColor.value.convertSRGBToLinear();
        }
        this.uniforms.outlineLightingMix.value = this.outlineLightingMix;
        this.updateCullFace();
    };
    MToon.prototype.updateShaderCode = function () {
        this.defines = {
            OUTLINE: this._isOutline,
            BLENDMODE_OPAQUE: this._blendMode === MToonRenderMode.Opaque,
            BLENDMODE_CUTOUT: this._blendMode === MToonRenderMode.Cutout,
            BLENDMODE_TRANSPARENT: this._blendMode === MToonRenderMode.Transparent || this._blendMode === MToonRenderMode.TransparentWithZWrite,
            USE_SHADETEXTURE: this.shadeTexture !== null,
            USE_RECEIVESHADOWTEXTURE: this.receiveShadowTexture !== null,
            USE_SHADINGGRADETEXTURE: this.shadingGradeTexture !== null,
            USE_RIMTEXTURE: this.rimTexture !== null,
            USE_SPHEREADD: this.sphereAdd !== null,
            USE_OUTLINEWIDTHTEXTURE: this.outlineWidthTexture !== null,
            DEBUG_NORMAL: this._debugMode === MToonDebugMode.Normal,
            DEBUG_LITSHADERATE: this._debugMode === MToonDebugMode.LitShadeRate,
            DEBUG_UV: this._debugMode === MToonDebugMode.UV,
            OUTLINE_WIDTH_WORLD: this._outlineWidthMode === MToonOutlineWidthMode.WorldCoordinates,
            OUTLINE_WIDTH_SCREEN: this._outlineWidthMode === MToonOutlineWidthMode.ScreenCoordinates,
            OUTLINE_COLOR_FIXED: this._outlineColorMode === MToonOutlineColorMode.FixedColor,
            OUTLINE_COLOR_MIXED: this._outlineColorMode === MToonOutlineColorMode.MixedLighting,
        };
        var encodings = (this.shadeTexture !== null
            ? texel_decoder_1.getTexelDecodingFunction('shadeTextureTexelToLinear', this.shadeTexture.encoding) + '\n'
            : '') +
            (this.sphereAdd !== null
                ? texel_decoder_1.getTexelDecodingFunction('sphereAddTexelToLinear', this.sphereAdd.encoding) + '\n'
                : '');
        this.vertexShader = __webpack_require__(/*! ./shaders/mtoon.vert */ "./src/vrm/material/shaders/mtoon.vert");
        this.fragmentShader = encodings + __webpack_require__(/*! ./shaders/mtoon.frag */ "./src/vrm/material/shaders/mtoon.frag");
        this.needsUpdate = true;
    };
    MToon.prototype.updateCullFace = function () {
        if (!this.isOutline) {
            if (this.cullMode === MToonCullMode.Off) {
                this.side = THREE.DoubleSide;
            }
            else if (this.cullMode === MToonCullMode.Front) {
                this.side = THREE.BackSide;
            }
            else if (this.cullMode === MToonCullMode.Back) {
                this.side = THREE.FrontSide;
            }
        }
        else {
            if (this.outlineCullMode === MToonCullMode.Off) {
                this.side = THREE.DoubleSide;
            }
            else if (this.outlineCullMode === MToonCullMode.Front) {
                this.side = THREE.BackSide;
            }
            else if (this.outlineCullMode === MToonCullMode.Back) {
                this.side = THREE.FrontSide;
            }
        }
    };
    return MToon;
}(THREE.ShaderMaterial));
exports.MToon = MToon;
var MToonCullMode;
(function (MToonCullMode) {
    MToonCullMode[MToonCullMode["Off"] = 0] = "Off";
    MToonCullMode[MToonCullMode["Front"] = 1] = "Front";
    MToonCullMode[MToonCullMode["Back"] = 2] = "Back";
})(MToonCullMode = exports.MToonCullMode || (exports.MToonCullMode = {}));
var MToonDebugMode;
(function (MToonDebugMode) {
    MToonDebugMode[MToonDebugMode["None"] = 0] = "None";
    MToonDebugMode[MToonDebugMode["Normal"] = 1] = "Normal";
    MToonDebugMode[MToonDebugMode["LitShadeRate"] = 2] = "LitShadeRate";
    MToonDebugMode[MToonDebugMode["UV"] = 3] = "UV";
})(MToonDebugMode = exports.MToonDebugMode || (exports.MToonDebugMode = {}));
var MToonOutlineColorMode;
(function (MToonOutlineColorMode) {
    MToonOutlineColorMode[MToonOutlineColorMode["FixedColor"] = 0] = "FixedColor";
    MToonOutlineColorMode[MToonOutlineColorMode["MixedLighting"] = 1] = "MixedLighting";
})(MToonOutlineColorMode = exports.MToonOutlineColorMode || (exports.MToonOutlineColorMode = {}));
var MToonOutlineWidthMode;
(function (MToonOutlineWidthMode) {
    MToonOutlineWidthMode[MToonOutlineWidthMode["None"] = 0] = "None";
    MToonOutlineWidthMode[MToonOutlineWidthMode["WorldCoordinates"] = 1] = "WorldCoordinates";
    MToonOutlineWidthMode[MToonOutlineWidthMode["ScreenCoordinates"] = 2] = "ScreenCoordinates";
})(MToonOutlineWidthMode = exports.MToonOutlineWidthMode || (exports.MToonOutlineWidthMode = {}));
var MToonRenderMode;
(function (MToonRenderMode) {
    MToonRenderMode[MToonRenderMode["Opaque"] = 0] = "Opaque";
    MToonRenderMode[MToonRenderMode["Cutout"] = 1] = "Cutout";
    MToonRenderMode[MToonRenderMode["Transparent"] = 2] = "Transparent";
    MToonRenderMode[MToonRenderMode["TransparentWithZWrite"] = 3] = "TransparentWithZWrite";
})(MToonRenderMode = exports.MToonRenderMode || (exports.MToonRenderMode = {}));


/***/ }),

/***/ "./src/vrm/material/MaterialConverter.ts":
/*!***********************************************!*\
  !*** ./src/vrm/material/MaterialConverter.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var THREE = __webpack_require__(/*! three */ "three");
var MToon_1 = __webpack_require__(/*! ./MToon */ "./src/vrm/material/MToon.ts");
var Unlit_1 = __webpack_require__(/*! ./Unlit */ "./src/vrm/material/Unlit.ts");
var MaterialConverter = (function () {
    function MaterialConverter(colorSpaceGamma, options) {
        if (options === void 0) { options = {}; }
        this._colorSpaceGamma = colorSpaceGamma;
        this._options = options;
    }
    MaterialConverter.prototype.convertGLTFMaterials = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var meshesMap, materialList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, gltf.parser.getDependencies('mesh')];
                    case 1:
                        meshesMap = _a.sent();
                        materialList = {};
                        return [4, Promise.all(meshesMap.map(function (mesh, meshIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var primitives;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            primitives = mesh.type === 'Group' ? mesh.children : [mesh];
                                            return [4, Promise.all(primitives.map(function (primitive, primitiveIndex) { return __awaiter(_this, void 0, void 0, function () {
                                                    var vrmMaterialIndex, props, vrmMaterials;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!Array.isArray(primitive.material)) {
                                                                    primitive.material = [primitive.material];
                                                                    primitive.geometry.addGroup(0, primitive.geometry.index.count, 0);
                                                                }
                                                                vrmMaterialIndex = gltf.parser.json.meshes[meshIndex].primitives[primitiveIndex].material;
                                                                props = gltf.parser.json.extensions.VRM.materialProperties[vrmMaterialIndex];
                                                                if (!materialList[vrmMaterialIndex]) return [3, 1];
                                                                vrmMaterials = materialList[vrmMaterialIndex];
                                                                return [3, 3];
                                                            case 1: return [4, this.createVRMMaterials(primitive.material[0], props, gltf)];
                                                            case 2:
                                                                vrmMaterials = _a.sent();
                                                                materialList[vrmMaterialIndex] = vrmMaterials;
                                                                _a.label = 3;
                                                            case 3:
                                                                primitive.material[0] = vrmMaterials.surface;
                                                                if (this._options.requestEnvMap) {
                                                                    this._options.requestEnvMap().then(function (envMap) {
                                                                        vrmMaterials.surface.envMap = envMap;
                                                                        vrmMaterials.surface.needsUpdate = true;
                                                                    });
                                                                }
                                                                primitive.renderOrder = props.renderQueue || 2000;
                                                                if (vrmMaterials.outline) {
                                                                    primitive.material[1] = vrmMaterials.outline;
                                                                    primitive.geometry.addGroup(0, primitive.geometry.index.count, 1);
                                                                }
                                                                primitive.onBeforeRender = function () {
                                                                    primitive.material.forEach(function (mtl) {
                                                                        if (mtl.applyUniforms) {
                                                                            mtl.applyUniforms();
                                                                        }
                                                                    });
                                                                };
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
                        _a.sent();
                        return [2, gltf];
                }
            });
        });
    };
    MaterialConverter.prototype.createVRMMaterials = function (originalMaterial, vrmProps, gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var newSurface, newOutline, params_1, params, params, params, params;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(vrmProps.shader === 'VRM/MToon')) return [3, 2];
                        return [4, this.extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 1:
                        params_1 = _a.sent();
                        ['srcBlend', 'dstBlend', 'isFirstSetup'].forEach(function (name) {
                            if (params_1[name] !== undefined) {
                                delete params_1[name];
                            }
                        });
                        ['mainTex', 'shadeTexture', 'emission', 'sphereAdd'].forEach(function (name) {
                            if (params_1[name] !== undefined) {
                                params_1[name].encoding = _this._colorSpaceGamma ? THREE.LinearEncoding : THREE.sRGBEncoding;
                            }
                        });
                        newSurface = new MToon_1.MToon(this._colorSpaceGamma, params_1);
                        if (params_1.outlineWidthMode !== MToon_1.MToonOutlineWidthMode.None) {
                            params_1.isOutline = true;
                            newOutline = new MToon_1.MToon(this._colorSpaceGamma, params_1);
                        }
                        return [3, 11];
                    case 2:
                        if (!(vrmProps.shader === 'VRM/UnlitTexture')) return [3, 4];
                        return [4, this.extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 3:
                        params = _a.sent();
                        params.renderType = Unlit_1.UnlitRenderType.Opaque;
                        newSurface = new Unlit_1.Unlit(params);
                        return [3, 11];
                    case 4:
                        if (!(vrmProps.shader === 'VRM/UnlitCutout')) return [3, 6];
                        return [4, this.extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 5:
                        params = _a.sent();
                        params.renderType = Unlit_1.UnlitRenderType.Cutout;
                        newSurface = new Unlit_1.Unlit(params);
                        return [3, 11];
                    case 6:
                        if (!(vrmProps.shader === 'VRM/UnlitTransparent')) return [3, 8];
                        return [4, this.extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 7:
                        params = _a.sent();
                        params.renderType = Unlit_1.UnlitRenderType.Transparent;
                        newSurface = new Unlit_1.Unlit(params);
                        return [3, 11];
                    case 8:
                        if (!(vrmProps.shader === 'VRM/UnlitTransparentZWrite')) return [3, 10];
                        return [4, this.extractMaterialProperties(originalMaterial, vrmProps, gltf)];
                    case 9:
                        params = _a.sent();
                        params.renderType = Unlit_1.UnlitRenderType.TransparentWithZWrite;
                        newSurface = new Unlit_1.Unlit(params);
                        return [3, 11];
                    case 10:
                        if (vrmProps.shader !== 'VRM_USE_GLTFSHADER') {
                            console.warn("Unknown shader detected: \"" + vrmProps.shader + "\"");
                        }
                        newSurface = this.convertGLTFMaterial(originalMaterial.clone());
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
    MaterialConverter.prototype.renameMaterialProperty = function (name) {
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
    MaterialConverter.prototype.convertGLTFMaterial = function (material) {
        if (material.isMeshStandardMaterial) {
            var mtl = material;
            if (this._colorSpaceGamma) {
                if (mtl.map) {
                    mtl.map.encoding = THREE.LinearEncoding;
                }
                if (mtl.emissiveMap) {
                    mtl.emissiveMap.encoding = THREE.LinearEncoding;
                }
            }
            else {
                mtl.color.convertSRGBToLinear();
                mtl.emissive.convertSRGBToLinear();
            }
        }
        if (material.isMeshBasicMaterial) {
            var mtl = material;
            if (this._colorSpaceGamma) {
                if (mtl.map) {
                    mtl.map.encoding = THREE.LinearEncoding;
                }
            }
            else {
                mtl.color.convertSRGBToLinear();
            }
        }
        return material;
    };
    MaterialConverter.prototype.extractMaterialProperties = function (originalMaterial, vrmProps, gltf) {
        var taskList = [];
        var params = {};
        if (vrmProps.textureProperties) {
            var _loop_1 = function (name_1) {
                var newName = this_1.renameMaterialProperty(name_1);
                var textureIndex = vrmProps.textureProperties[name_1];
                taskList.push(gltf.parser.getDependency('texture', textureIndex).then(function (texture) {
                    params[newName] = texture;
                }));
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(vrmProps.textureProperties); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                _loop_1(name_1);
            }
        }
        if (vrmProps.floatProperties) {
            for (var _b = 0, _c = Object.keys(vrmProps.floatProperties); _b < _c.length; _b++) {
                var name_2 = _c[_b];
                var newName = this.renameMaterialProperty(name_2);
                params[newName] = vrmProps.floatProperties[name_2];
            }
        }
        if (vrmProps.vectorProperties) {
            var _loop_2 = function (name_3) {
                var _a;
                var newName = this_2.renameMaterialProperty(name_3);
                var isTextureST = [
                    '_MainTex',
                    '_ShadeTexture',
                    '_BumpMap',
                    '_ReceiveShadowTexture',
                    '_ShadingGradeTexture',
                    '_SphereAdd',
                    '_EmissionMap',
                    '_OutlineWidthTexture',
                ].some(function (textureName) { return name_3 === textureName; });
                if (isTextureST) {
                    newName += '_ST';
                }
                params[newName] = new ((_a = THREE.Vector4).bind.apply(_a, [void 0].concat(vrmProps.vectorProperties[name_3])))();
            };
            var this_2 = this;
            for (var _d = 0, _e = Object.keys(vrmProps.vectorProperties); _d < _e.length; _d++) {
                var name_3 = _e[_d];
                _loop_2(name_3);
            }
        }
        if (vrmProps.keywordMap._ALPHATEST_ON && params.blendMode === MToon_1.MToonRenderMode.Opaque) {
            params.blendMode = MToon_1.MToonRenderMode.Cutout;
        }
        params.skinning = originalMaterial.skinning || false;
        params.morphTargets = originalMaterial.morphTargets || false;
        params.morphNormals = originalMaterial.morphNormals || false;
        return Promise.all(taskList).then(function () { return params; });
    };
    return MaterialConverter;
}());
exports.MaterialConverter = MaterialConverter;


/***/ }),

/***/ "./src/vrm/material/Unlit.ts":
/*!***********************************!*\
  !*** ./src/vrm/material/Unlit.ts ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
var Unlit = (function (_super) {
    __extends(Unlit, _super);
    function Unlit(parameters) {
        var _this = _super.call(this) || this;
        _this.isVRMUnlit = true;
        _this.cutoff = 0.5;
        _this.map = null;
        _this.mainTex_ST = new THREE.Vector4(0.0, 0.0, 1.0, 1.0);
        _this._renderType = UnlitRenderType.Opaque;
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
        _this.updateShaderCode();
        return _this;
    }
    Object.defineProperty(Unlit.prototype, "mainTex", {
        get: function () {
            return this.map;
        },
        set: function (t) {
            this.map = t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Unlit.prototype, "renderType", {
        get: function () {
            return this._renderType;
        },
        set: function (t) {
            this._renderType = t;
            this.depthWrite = this._renderType !== UnlitRenderType.Transparent;
            this.transparent =
                this._renderType === UnlitRenderType.Transparent || this._renderType === UnlitRenderType.TransparentWithZWrite;
            this.updateShaderCode();
        },
        enumerable: true,
        configurable: true
    });
    Unlit.prototype.copy = function (source) {
        _super.prototype.copy.call(this, source);
        this.cutoff = source.cutoff;
        this.map = source.map;
        this.mainTex_ST.copy(source.mainTex_ST);
        this.renderType = source.renderType;
        return this;
    };
    Unlit.prototype.applyUniforms = function () {
        if (!this.shouldApplyUniforms) {
            return;
        }
        this.shouldApplyUniforms = false;
        this.uniforms.cutoff.value = this.cutoff;
        this.uniforms.map.value = this.map;
        this.uniforms.mainTex_ST.value.copy(this.mainTex_ST);
    };
    Unlit.prototype.updateShaderCode = function () {
        this.defines = {
            RENDERTYPE_OPAQUE: this._renderType === UnlitRenderType.Opaque,
            RENDERTYPE_CUTOUT: this._renderType === UnlitRenderType.Cutout,
            RENDERTYPE_TRANSPARENT: this._renderType === UnlitRenderType.Transparent || this._renderType === UnlitRenderType.TransparentWithZWrite,
        };
        this.vertexShader = __webpack_require__(/*! ./shaders/unlit.vert */ "./src/vrm/material/shaders/unlit.vert");
        this.fragmentShader = __webpack_require__(/*! ./shaders/unlit.frag */ "./src/vrm/material/shaders/unlit.frag");
        this.needsUpdate = true;
    };
    return Unlit;
}(THREE.ShaderMaterial));
exports.Unlit = Unlit;
var UnlitRenderType;
(function (UnlitRenderType) {
    UnlitRenderType[UnlitRenderType["Opaque"] = 0] = "Opaque";
    UnlitRenderType[UnlitRenderType["Cutout"] = 1] = "Cutout";
    UnlitRenderType[UnlitRenderType["Transparent"] = 2] = "Transparent";
    UnlitRenderType[UnlitRenderType["TransparentWithZWrite"] = 3] = "TransparentWithZWrite";
})(UnlitRenderType = exports.UnlitRenderType || (exports.UnlitRenderType = {}));


/***/ }),

/***/ "./src/vrm/material/index.ts":
/*!***********************************!*\
  !*** ./src/vrm/material/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./MaterialConverter */ "./src/vrm/material/MaterialConverter.ts"));


/***/ }),

/***/ "./src/vrm/material/shaders/mtoon.frag":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/mtoon.frag ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "// #define PHONG\n\n#ifdef BLENDMODE_CUTOUT\n  uniform float cutoff;\n#endif\n\nuniform vec3 color;\nuniform float colorAlpha;\nuniform vec3 shadeColor;\n#ifdef USE_SHADETEXTURE\n  uniform sampler2D shadeTexture;\n#endif\n\nuniform float receiveShadowRate;\n#ifdef USE_RECEIVESHADOWTEXTURE\n  uniform sampler2D receiveShadowTexture;\n#endif\n\nuniform float shadingGradeRate;\n#ifdef USE_SHADINGGRADETEXTURE\n  uniform sampler2D shadingGradeTexture;\n#endif\n\nuniform float shadeShift;\nuniform float shadeToony;\nuniform float lightColorAttenuation;\nuniform float indirectLightIntensity;\n\n#ifdef USE_RIMTEXTURE\n  uniform sampler2D rimTexture;\n#endif\nuniform vec3 rimColor;\nuniform float rimLightingMix;\nuniform float rimFresnelPower;\nuniform float rimLift;\n\n#ifdef USE_SPHEREADD\n  uniform sampler2D sphereAdd;\n#endif\n\nuniform vec3 emissionColor;\n\nuniform vec3 outlineColor;\nuniform float outlineLightingMix;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n\n// #include <uv_pars_fragment>\n#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE )\n  varying vec2 vUv;\n#endif\n\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n// #include <envmap_pars_fragment>\n// #include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n\n// #include <lights_phong_pars_fragment>\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#define Material_LightProbeLOD( material ) (0)\n\n#include <shadowmap_pars_fragment>\n// #include <bumpmap_pars_fragment>\n\n// #include <normalmap_pars_fragment>\n#ifdef USE_NORMALMAP\n  uniform sampler2D normalMap;\n  uniform float bumpScale;\n\n  // this number is very random, this is still a 対処療法\n  #define UV_DERIVATIVE_EPSILON 1E-6\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n  vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n    vec2 st0 = dFdx( vUv.st );\n    vec2 st1 = dFdy( vUv.st );\n\n    float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n    vec3 S = ( q0 * st1.t - q1 * st0.t ) * scale;\n    vec3 T = ( - q0 * st1.s + q1 * st0.s ) * scale;\n\n    // See: https://hub.vroid.com/characters/5207275812824687366/models/1630298405840303507\n    if ( length( S ) == 0.0 || length( T ) == 0.0 ) {\n      return surf_norm;\n    }\n\n    S = normalize( S );\n    T = normalize( T );\n\n    vec3 N = normalize( surf_norm );\n    mat3 tsn = mat3( S, T, N );\n    vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n    mapN.xy *= bumpScale;\n    mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n    return normalize( tsn * mapN );\n  }\n#endif\n\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == lighting stuff ===========================================================\nfloat getLightIntensity(\n  const in IncidentLight directLight,\n  const in GeometricContext geometry,\n  const in float shadow,\n  const in float shadingGrade\n) {\n  float lightIntensity = dot( geometry.normal, directLight.direction );\n  lightIntensity = 0.5 + 0.5 * lightIntensity;\n  lightIntensity = lightIntensity * shadow;\n  lightIntensity = lightIntensity * shadingGrade;\n  lightIntensity = lightIntensity * 2.0 - 1.0;\n  return smoothstep( shadeShift, shadeShift + ( 1.0 - shadeToony ), lightIntensity );\n}\n\nvec3 getLighting( const in vec3 lightColor ) {\n  vec3 lighting = lightColor;\n  lighting = mix(\n    lighting,\n    vec3( max( 0.001, max( lighting.x, max( lighting.y, lighting.z ) ) ) ),\n    lightColorAttenuation\n  );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n    lighting *= PI;\n  #endif\n\n  return lighting;\n}\n\nvec3 getDiffuse(\n  const in vec3 lit,\n  const in vec3 shade,\n  const in float lightIntensity,\n  const in vec3 lighting\n) {\n  #ifdef DEBUG_LITSHADERATE\n    return vec3( BRDF_Diffuse_Lambert( lightIntensity * lighting ) );\n  #endif\n\n  return lighting * BRDF_Diffuse_Lambert( mix( shade, lit, lightIntensity ) );\n}\n\nvec3 calcDirectDiffuse(\n  const in vec3 lit,\n  const in vec3 shade,\n  in GeometricContext geometry,\n  inout ReflectedLight reflectedLight\n) {\n  IncidentLight directLight;\n  vec3 lightingSum = vec3( 0.0 );\n\n  float shadingGrade = 1.0;\n  #ifdef USE_SHADINGGRADETEXTURE\n    shadingGrade = 1.0 - shadingGradeRate * ( 1.0 - texture2D( shadingGradeTexture, vUv ).r );\n  #endif\n\n  float receiveShadow = receiveShadowRate;\n  #ifdef USE_RECEIVESHADOWTEXTURE\n    receiveShadow *= texture2D( receiveShadowTexture, vUv ).a;\n  #endif\n\n  #if ( NUM_POINT_LIGHTS > 0 )\n    PointLight pointLight;\n\n    #pragma unroll_loop\n    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n      pointLight = pointLights[ i ];\n      getPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n  #endif\n\n  #if ( NUM_SPOT_LIGHTS > 0 )\n    SpotLight spotLight;\n\n    #pragma unroll_loop\n    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n      spotLight = spotLights[ i ];\n      getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n  #endif\n\n  #if ( NUM_DIR_LIGHTS > 0 )\n    DirectionalLight directionalLight;\n\n    #pragma unroll_loop\n    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n      directionalLight = directionalLights[ i ];\n      getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n      float atten = 1.0;\n      #ifdef USE_SHADOWMAP\n        atten = all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n      #endif\n\n      float shadow = 1.0 - receiveShadow * ( 1.0 - ( 0.5 + 0.5 * atten ) );\n      float lightIntensity = getLightIntensity( directLight, geometry, shadow, shadingGrade );\n      vec3 lighting = getLighting( directLight.color );\n      reflectedLight.directDiffuse += getDiffuse( lit, shade, lightIntensity, lighting );\n      lightingSum += lighting;\n    }\n  #endif\n\n  return lightingSum;\n}\n\n// == post correction ==========================================================\nvoid postCorrection() {\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  #ifdef DEBUG_UV\n    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n    #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE )\n      gl_FragColor = vec4( vUv, 0.0, 1.0 );\n    #endif\n    return;\n  #endif\n\n  vec4 diffuseColor = vec4( color, colorAlpha );\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n  vec3 totalEmissiveRadiance = emissionColor;\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, vUv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // -- MToon: alpha -----------------------------------------------------------\n  // #include <alphatest_fragment>\n  #ifdef BLENDMODE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef BLENDMODE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_FIXED ) // omitting DebugMode\n    gl_FragColor = vec4( outlineColor, diffuseColor.a );\n    postCorrection();\n    return;\n  #endif\n\n  // #include <specularmap_fragment>\n  #include <normal_fragment_begin>\n\n  #ifdef OUTLINE\n    normal *= -1.0;\n  #endif\n\n  #include <normal_fragment_maps>\n\n  // #include <emissivemap_fragment>\n  #ifdef USE_EMISSIVEMAP\n    totalEmissiveRadiance *= emissiveMapTexelToLinear( texture2D( emissiveMap, vUv ) ).rgb;\n  #endif\n\n  if (normal.z < 0.0) { // TODO: temporary treatment against Snapdragon issue\n    normal = -normal;\n  }\n\n  #ifdef DEBUG_NORMAL\n    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );\n    return;\n  #endif\n\n  // -- MToon: lighting --------------------------------------------------------\n  // accumulation\n  // #include <lights_phong_fragment>\n  // #include <lights_fragment_begin>\n  vec3 lit = diffuseColor.rgb;\n  vec3 shade = shadeColor;\n  #ifdef USE_SHADETEXTURE\n    shade *= shadeTextureTexelToLinear( texture2D( shadeTexture, vUv ) ).rgb;\n  #endif\n\n  GeometricContext geometry;\n\n  geometry.position = - vViewPosition;\n  geometry.normal = normal;\n  geometry.viewDir = normalize( vViewPosition );\n\n  vec3 lighting = calcDirectDiffuse( diffuseColor.rgb, shade, geometry, reflectedLight );\n\n  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n  #if ( NUM_HEMI_LIGHTS > 0 )\n    #pragma unroll_loop\n    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n    }\n  #endif\n\n  // #include <lights_fragment_maps>\n  #ifdef USE_LIGHTMAP\n    vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).rgb * lightMapIntensity;\n    #ifndef PHYSICALLY_CORRECT_LIGHTS\n      lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n    #endif\n    irradiance += lightMapIrradiance;\n  #endif\n\n  // #include <lights_fragment_end>\n  reflectedLight.indirectDiffuse += indirectLightIntensity * irradiance * BRDF_Diffuse_Lambert( lit );\n\n  // modulation\n  #include <aomap_fragment>\n\n  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\n  #if defined( OUTLINE ) && defined( OUTLINE_COLOR_MIXED ) // omitting DebugMode\n    gl_FragColor = vec4(\n      outlineColor.rgb * mix( vec3( 1.0 ), col, outlineLightingMix ),\n      diffuseColor.a\n    );\n    postCorrection();\n    return;\n  #endif\n\n  // -- MToon: parametric rim lighting -----------------------------------------\n  vec3 viewDir = normalize( vViewPosition );\n  vec3 rimMix = mix(vec3(1.0), lighting + indirectLightIntensity * irradiance, rimLightingMix);\n  vec3 rim = rimColor * pow( saturate( 1.0 - dot( viewDir, normal ) + rimLift ), rimFresnelPower );\n  #ifdef USE_RIMTEXTURE\n    rim *= texture2D( rimTexture, vUv ).rgb;\n  #endif\n  col += rim;\n\n  // -- MToon: additive matcap -------------------------------------------------\n  #ifdef USE_SPHEREADD\n    {\n      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );\n      vec3 y = cross( viewDir, x ); // guaranteed to be normalized\n      vec2 uv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );\n      vec3 matcap = sphereAddTexelToLinear( texture2D( sphereAdd, uv ) ).xyz;\n      col += matcap;\n    }\n  #endif\n\n  // -- MToon: Emission --------------------------------------------------------\n  col += totalEmissiveRadiance;\n\n  // #include <envmap_fragment>\n\n  // -- Almost done! -----------------------------------------------------------\n  gl_FragColor = vec4( col, diffuseColor.a );\n  postCorrection();\n}"

/***/ }),

/***/ "./src/vrm/material/shaders/mtoon.vert":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/mtoon.vert ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "// #define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n  varying vec3 vNormal;\n#endif\n\n#include <common>\n\n// #include <uv_pars_vertex>\n#if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE )\n  varying vec2 vUv;\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n// #include <displacementmap_pars_vertex>\n// #include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_OUTLINEWIDTHTEXTURE\n  uniform sampler2D outlineWidthTexture;\n#endif\n\nuniform float outlineWidth;\nuniform float outlineScaledMaxDistance;\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #if defined( USE_MAP ) || defined( USE_SHADETEXTURE ) || defined( USE_NORMALMAP ) || defined( USE_RECEIVESHADOWTEXTURE ) || defined( USE_SHADINGGRADETEXTURE ) || defined( USE_RIMTEXTURE ) || defined( USE_EMISSIVEMAP ) || defined( USE_OUTLINEWIDTHTEXTURE )\n    vUv = vec2( mainTex_ST.p * uv.x + mainTex_ST.s, mainTex_ST.q * uv.y + mainTex_ST.t );\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n\n  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n    vNormal = normalize( transformedNormal );\n  #endif\n\n  #include <begin_vertex>\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  // #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  vViewPosition = - mvPosition.xyz;\n\n  float outlineTex = 1.0;\n\n  #ifdef OUTLINE\n    #ifdef USE_OUTLINEWIDTHTEXTURE\n      outlineTex = texture2D( outlineWidthTexture, vUv ).r;\n    #endif\n\n    #ifdef OUTLINE_WIDTH_WORLD\n      vec3 outlineOffset = 0.01 * outlineWidth * outlineTex * normalize( objectNormal );\n      gl_Position += projectionMatrix * modelViewMatrix * vec4( outlineOffset, 0.0 );\n    #endif\n\n    #ifdef OUTLINE_WIDTH_SCREEN\n      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( normalize( objectNormal ), 0.0 ) ).xyz;\n      vec2 projectedNormal = normalize( clipNormal.xy );\n      projectedNormal *= min( gl_Position.w, outlineScaledMaxDistance );\n      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;\n      gl_Position.xy += 0.01 * outlineWidth * projectedNormal.xy;\n    #endif\n\n    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic\n  #endif\n\n  #include <worldpos_vertex>\n  // #include <envmap_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n\n}"

/***/ }),

/***/ "./src/vrm/material/shaders/unlit.frag":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/unlit.frag ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#ifdef RENDERTYPE_CUTOUT\n  uniform float cutoff;\n#endif\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n// #include <alphamap_pars_fragment>\n// #include <aomap_pars_fragment>\n// #include <lightmap_pars_fragment>\n// #include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n// #include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// == main procedure ===========================================================\nvoid main() {\n  #include <clipping_planes_fragment>\n\n  vec4 diffuseColor = vec4( 1.0 );\n\n  #include <logdepthbuf_fragment>\n\n  // #include <map_fragment>\n  #ifdef USE_MAP\n    diffuseColor *= mapTexelToLinear( texture2D( map, vUv ) );\n  #endif\n\n  #include <color_fragment>\n  // #include <alphamap_fragment>\n\n  // MToon: alpha\n  // #include <alphatest_fragment>\n  #ifdef RENDERTYPE_CUTOUT\n    if ( diffuseColor.a <= cutoff ) { discard; }\n    diffuseColor.a = 1.0;\n  #endif\n\n  #ifdef RENDERTYPE_OPAQUE\n    diffuseColor.a = 1.0;\n  #endif\n\n  // #include <specularmap_fragment>\n\n  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n  // accumulation (baked indirect lighting only)\n  #ifdef USE_LIGHTMAP\n    reflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n  #else\n    reflectedLight.indirectDiffuse += vec3( 1.0 );\n  #endif\n\n  // modulation\n  // #include <aomap_fragment>\n\n  reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n  vec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n  // #include <envmap_fragment>\n\n  gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n  #include <premultiplied_alpha_fragment>\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n}"

/***/ }),

/***/ "./src/vrm/material/shaders/unlit.vert":
/*!*********************************************!*\
  !*** ./src/vrm/material/shaders/unlit.vert ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#include <common>\n\n// #include <uv_pars_vertex>\n#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 mainTex_ST;\n#endif\n\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n  // #include <uv_vertex>\n  #ifdef USE_MAP\n    vUv = vec2( mainTex_ST.p * uv.x + mainTex_ST.s, mainTex_ST.q * uv.y + mainTex_ST.t );\n  #endif\n\n  #include <uv2_vertex>\n  #include <color_vertex>\n  #include <skinbase_vertex>\n\n  #ifdef USE_ENVMAP\n\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n\n  #endif\n\n  #include <begin_vertex>\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n\n  #include <worldpos_vertex>\n  #include <clipping_planes_vertex>\n  #include <envmap_vertex>\n  #include <fog_vertex>\n\n}"

/***/ }),

/***/ "./src/vrm/material/texel-decoder.ts":
/*!*******************************************!*\
  !*** ./src/vrm/material/texel-decoder.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

/***/ "./src/vrm/springbone/VRMSpringBone.ts":
/*!*********************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBone.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
var math_1 = __webpack_require__(/*! ../utils/math */ "./src/vrm/utils/math.ts");
exports.GIZMO_RENDER_ORDER = 10000;
exports.IDENTITY_MATRIX4 = Object.freeze(new THREE.Matrix4());
var IDENTITY_QUATERNION = Object.freeze(new THREE.Quaternion());
var _v3A = new THREE.Vector3();
var _v3B = new THREE.Vector3();
var _v3C = new THREE.Vector3();
var _quatA = new THREE.Quaternion();
var _matA = new THREE.Matrix4();
var _matB = new THREE.Matrix4();
var VRMSpringBone = (function () {
    function VRMSpringBone(bone, radius, stiffiness, gravityDir, gravityPower, dragForce, colliders) {
        var _this = this;
        if (colliders === void 0) { colliders = []; }
        this.bone = bone;
        this.bone.matrixAutoUpdate = false;
        this.radius = radius;
        this.stiffnessForce = stiffiness;
        this.gravityDir = gravityDir;
        this.gravityPower = gravityPower;
        this.dragForce = dragForce;
        this.colliders = colliders;
        this.worldPosition = new THREE.Vector3().setFromMatrixPosition(this.bone.matrixWorld);
        this._parentWorldRotation = new THREE.Quaternion();
        this._initialLocalMatrix = this.bone.matrix.clone();
        this._initialLocalRotation = this.bone.quaternion.clone();
        this._initialLocalChildPosition = (function () {
            if (_this.bone.children.length === 0) {
                return _this.bone.position
                    .clone()
                    .normalize()
                    .multiplyScalar(0.07);
            }
            else {
                var firstChild = _this.bone.children[0];
                return firstChild.position.clone();
            }
        })();
        this.currentTail = this.bone.localToWorld(this._initialLocalChildPosition.clone());
        this.prevTail = this.currentTail.clone();
        this.nextTail = this.currentTail.clone();
        this.boneAxis = this._initialLocalChildPosition.clone().normalize();
        this.worldBoneLength = this.bone
            .localToWorld(_v3A.copy(this._initialLocalChildPosition))
            .sub(this.worldPosition)
            .length();
    }
    VRMSpringBone.prototype.reset = function () {
        this.bone.matrix.copy(this._initialLocalMatrix);
        this.bone.localToWorld(this.currentTail.copy(this._initialLocalChildPosition));
        this.prevTail.copy(this.currentTail);
        this.nextTail.copy(this.currentTail);
        this.bone.updateMatrix();
        this.bone.matrixWorld.multiplyMatrices(this.getParentMatrixWorld(), this.bone.matrix);
        this.worldPosition.setFromMatrixPosition(this.bone.matrixWorld);
    };
    VRMSpringBone.prototype.update = function (delta) {
        if (delta <= 0)
            return;
        this.bone.matrixWorld.multiplyMatrices(this.getParentMatrixWorld(), this.bone.matrix);
        if (!!this.bone.parent) {
            math_1.getWorldQuaternionLite(this.bone.parent, this._parentWorldRotation);
        }
        else {
            this._parentWorldRotation.copy(IDENTITY_QUATERNION);
        }
        this.worldPosition.setFromMatrixPosition(this.bone.matrixWorld);
        var stiffness = this.stiffnessForce * delta;
        var external = _v3B.copy(this.gravityDir).multiplyScalar(this.gravityPower * delta);
        this.nextTail
            .copy(this.currentTail)
            .add(_v3A
            .copy(this.currentTail)
            .sub(this.prevTail)
            .multiplyScalar(1 - this.dragForce))
            .add(_v3A
            .copy(this.boneAxis)
            .applyMatrix4(this._initialLocalMatrix)
            .applyMatrix4(this.getParentMatrixWorld())
            .sub(this.worldPosition)
            .normalize()
            .multiplyScalar(stiffness))
            .add(external);
        this.nextTail
            .sub(this.worldPosition)
            .normalize()
            .multiplyScalar(this.worldBoneLength)
            .add(this.worldPosition);
        this.collision(this.nextTail);
        this.prevTail.copy(this.currentTail);
        this.currentTail.copy(this.nextTail);
        var initialWorldMatrixInv = _matA.getInverse(_matB.copy(this.getParentMatrixWorld()).multiply(this._initialLocalMatrix));
        var applyRotation = _quatA.setFromUnitVectors(this.boneAxis, _v3A
            .copy(this.nextTail)
            .applyMatrix4(initialWorldMatrixInv)
            .normalize());
        this.bone.quaternion.copy(this._initialLocalRotation).multiply(applyRotation);
        this.bone.updateMatrix();
        this.bone.matrixWorld.multiplyMatrices(this.getParentMatrixWorld(), this.bone.matrix);
    };
    VRMSpringBone.prototype.collision = function (tail) {
        var _this = this;
        this.colliders.forEach(function (collider) {
            var colliderWorldPosition = _v3A.setFromMatrixPosition(collider.matrixWorld);
            var colliderRadius = collider.geometry.boundingSphere.radius;
            var r = _this.radius + colliderRadius;
            if (tail.distanceToSquared(colliderWorldPosition) <= r * r) {
                var normal = _v3B.subVectors(tail, colliderWorldPosition).normalize();
                var posFromCollider = _v3C.addVectors(colliderWorldPosition, normal.multiplyScalar(r));
                tail.copy(posFromCollider
                    .sub(_this.worldPosition)
                    .normalize()
                    .multiplyScalar(_this.worldBoneLength)
                    .add(_this.worldPosition));
            }
        });
    };
    VRMSpringBone.prototype.getParentMatrixWorld = function () {
        return this.bone.parent ? this.bone.parent.matrixWorld : exports.IDENTITY_MATRIX4;
    };
    return VRMSpringBone;
}());
exports.VRMSpringBone = VRMSpringBone;


/***/ }),

/***/ "./src/vrm/springbone/VRMSpringBoneManager.ts":
/*!****************************************************!*\
  !*** ./src/vrm/springbone/VRMSpringBoneManager.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var THREE = __webpack_require__(/*! three */ "three");
var VRMSpringBone_1 = __webpack_require__(/*! ./VRMSpringBone */ "./src/vrm/springbone/VRMSpringBone.ts");
var VRMSpringBoneManager = (function () {
    function VRMSpringBoneManager() {
        this.springBoneGroupList = [];
    }
    VRMSpringBoneManager.prototype.loadGLTF = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var springBoneGroups, colliderMeshGroups;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        springBoneGroups = gltf.parser.json.extensions &&
                            gltf.parser.json.extensions.VRM &&
                            gltf.parser.json.extensions.VRM.secondaryAnimation &&
                            gltf.parser.json.extensions.VRM.secondaryAnimation.boneGroups;
                        if (springBoneGroups === undefined) {
                            console.warn('Could not find springBoneGroups in the VRM');
                            return [2];
                        }
                        return [4, this.getColliderMeshGroups(gltf)];
                    case 1:
                        colliderMeshGroups = _a.sent();
                        colliderMeshGroups.forEach(function (group) {
                            var _a;
                            return (_a = gltf.scene).add.apply(_a, group.colliders);
                        });
                        springBoneGroups.forEach(function (vrmBoneGroup) {
                            if (vrmBoneGroup.stiffiness === undefined ||
                                vrmBoneGroup.gravityDir === undefined ||
                                vrmBoneGroup.gravityDir.x === undefined ||
                                vrmBoneGroup.gravityDir.y === undefined ||
                                vrmBoneGroup.gravityDir.z === undefined ||
                                vrmBoneGroup.gravityPower === undefined ||
                                vrmBoneGroup.dragForce === undefined ||
                                vrmBoneGroup.hitRadius === undefined ||
                                vrmBoneGroup.colliderGroups === undefined ||
                                vrmBoneGroup.bones === undefined) {
                                return;
                            }
                            var stiffiness = vrmBoneGroup.stiffiness;
                            var gravityDir = new THREE.Vector3(vrmBoneGroup.gravityDir.x, vrmBoneGroup.gravityDir.y, vrmBoneGroup.gravityDir.z);
                            var gravityPower = vrmBoneGroup.gravityPower;
                            var dragForce = vrmBoneGroup.dragForce;
                            var hitRadius = vrmBoneGroup.hitRadius;
                            var colliders = [];
                            vrmBoneGroup.colliderGroups.forEach(function (colliderIndex) {
                                colliders.push.apply(colliders, colliderMeshGroups[colliderIndex].colliders);
                            });
                            var springBoneGroup = [];
                            vrmBoneGroup.bones.forEach(function (nodeIndex) { return __awaiter(_this, void 0, void 0, function () {
                                var springRootBone;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, gltf.parser.getDependency('node', nodeIndex)];
                                        case 1:
                                            springRootBone = _a.sent();
                                            if (!springRootBone) {
                                                return [2];
                                            }
                                            springRootBone.traverse(function (bone) {
                                                var springBone = _this.createSpringBone(gltf, bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders);
                                                springBoneGroup.push(springBone);
                                            });
                                            return [2];
                                    }
                                });
                            }); });
                            _this.springBoneGroupList.push(springBoneGroup);
                        });
                        return [2];
                }
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
    VRMSpringBoneManager.prototype.isColiderMeshVisible = function () {
        return false;
    };
    VRMSpringBoneManager.prototype.createSpringBone = function (gltf, bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders) {
        if (colliders === void 0) { colliders = []; }
        return new VRMSpringBone_1.VRMSpringBone(bone, hitRadius, stiffiness, gravityDir, gravityPower, dragForce, colliders);
    };
    VRMSpringBoneManager.prototype.getColliderMeshGroups = function (gltf) {
        return __awaiter(this, void 0, void 0, function () {
            var vrmExt, secondaryAnimation, vrmColliderGroups, colliderGroups;
            var _this = this;
            return __generator(this, function (_a) {
                vrmExt = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
                if (vrmExt === undefined) {
                    return [2, []];
                }
                secondaryAnimation = vrmExt.secondaryAnimation;
                if (secondaryAnimation === undefined) {
                    return [2, []];
                }
                vrmColliderGroups = secondaryAnimation.colliderGroups;
                if (vrmColliderGroups === undefined) {
                    return [2, []];
                }
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
                                    var offsetMatrix = new THREE.Matrix4().makeTranslation(collider.offset.x, collider.offset.y, -collider.offset.z);
                                    var visible = _this.isColiderMeshVisible();
                                    var colliderMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(collider.radius, 8, 4), new THREE.MeshBasicMaterial({
                                        color: 0xff00ff,
                                        visible: visible,
                                        wireframe: true,
                                        transparent: true,
                                        depthTest: false,
                                    }));
                                    colliderMesh.material.renderOrder = VRMSpringBone_1.GIZMO_RENDER_ORDER;
                                    colliderMesh.name = 'vrmColliderSphere';
                                    colliderMesh.geometry.computeBoundingSphere();
                                    colliderMesh.updateMatrixWorld = function () {
                                        colliderMesh.matrixWorld.copy(bone.matrixWorld).multiply(offsetMatrix);
                                    };
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
    return VRMSpringBoneManager;
}());
exports.VRMSpringBoneManager = VRMSpringBoneManager;


/***/ }),

/***/ "./src/vrm/springbone/index.ts":
/*!*************************************!*\
  !*** ./src/vrm/springbone/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRMSpringBoneManager */ "./src/vrm/springbone/VRMSpringBoneManager.ts"));
__export(__webpack_require__(/*! ./VRMSpringBone */ "./src/vrm/springbone/VRMSpringBone.ts"));


/***/ }),

/***/ "./src/vrm/types/VRM.ts":
/*!******************************!*\
  !*** ./src/vrm/types/VRM.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(BlendShapePresetName = exports.BlendShapePresetName || (exports.BlendShapePresetName = {}));
var LookAtTypeName;
(function (LookAtTypeName) {
    LookAtTypeName["BlendShape"] = "BlendShape";
    LookAtTypeName["Bone"] = "Bone";
})(LookAtTypeName = exports.LookAtTypeName || (exports.LookAtTypeName = {}));
var HumanBone;
(function (HumanBone) {
    HumanBone["Chest"] = "chest";
    HumanBone["Head"] = "head";
    HumanBone["Hips"] = "hips";
    HumanBone["Jaw"] = "jaw";
    HumanBone["LeftEye"] = "leftEye";
    HumanBone["LeftFoot"] = "leftFoot";
    HumanBone["LeftHand"] = "leftHand";
    HumanBone["LeftIndexDistal"] = "leftIndexDistal";
    HumanBone["LeftIndexIntermediate"] = "leftIndexIntermediate";
    HumanBone["LeftIndexProximal"] = "leftIndexProximal";
    HumanBone["LeftLittleDistal"] = "leftLittleDistal";
    HumanBone["LeftLittleIntermediate"] = "leftLittleIntermediate";
    HumanBone["LeftLittleProximal"] = "leftLittleProximal";
    HumanBone["LeftLowerArm"] = "leftLowerArm";
    HumanBone["LeftLowerLeg"] = "leftLowerLeg";
    HumanBone["LeftMiddleDistal"] = "leftMiddleDistal";
    HumanBone["LeftMiddleIntermediate"] = "leftMiddleIntermediate";
    HumanBone["LeftMiddleProximal"] = "leftMiddleProximal";
    HumanBone["LeftRingDistal"] = "leftRingDistal";
    HumanBone["LeftRingIntermediate"] = "leftRingIntermediate";
    HumanBone["LeftRingProximal"] = "leftRingProximal";
    HumanBone["LeftShoulder"] = "leftShoulder";
    HumanBone["LeftThumbDistal"] = "leftThumbDistal";
    HumanBone["LeftThumbIntermediate"] = "leftThumbIntermediate";
    HumanBone["LeftThumbProximal"] = "leftThumbProximal";
    HumanBone["LeftToes"] = "leftToes";
    HumanBone["LeftUpperArm"] = "leftUpperArm";
    HumanBone["LeftUpperLeg"] = "leftUpperLeg";
    HumanBone["Neck"] = "neck";
    HumanBone["RightEye"] = "rightEye";
    HumanBone["RightFoot"] = "rightFoot";
    HumanBone["RightHand"] = "rightHand";
    HumanBone["RightIndexDistal"] = "rightIndexDistal";
    HumanBone["RightIndexIntermediate"] = "rightIndexIntermediate";
    HumanBone["RightIndexProximal"] = "rightIndexProximal";
    HumanBone["RightLittleDistal"] = "rightLittleDistal";
    HumanBone["RightLittleIntermediate"] = "rightLittleIntermediate";
    HumanBone["RightLittleProximal"] = "rightLittleProximal";
    HumanBone["RightLowerArm"] = "rightLowerArm";
    HumanBone["RightLowerLeg"] = "rightLowerLeg";
    HumanBone["RightMiddleDistal"] = "rightMiddleDistal";
    HumanBone["RightMiddleIntermediate"] = "rightMiddleIntermediate";
    HumanBone["RightMiddleProximal"] = "rightMiddleProximal";
    HumanBone["RightRingDistal"] = "rightRingDistal";
    HumanBone["RightRingIntermediate"] = "rightRingIntermediate";
    HumanBone["RightRingProximal"] = "rightRingProximal";
    HumanBone["RightShoulder"] = "rightShoulder";
    HumanBone["RightThumbDistal"] = "rightThumbDistal";
    HumanBone["RightThumbIntermediate"] = "rightThumbIntermediate";
    HumanBone["RightThumbProximal"] = "rightThumbProximal";
    HumanBone["RightToes"] = "rightToes";
    HumanBone["RightUpperArm"] = "rightUpperArm";
    HumanBone["RightUpperLeg"] = "rightUpperLeg";
    HumanBone["Spine"] = "spine";
    HumanBone["UpperChest"] = "upperChest";
})(HumanBone = exports.HumanBone || (exports.HumanBone = {}));
var AllowedUserName;
(function (AllowedUserName) {
    AllowedUserName["Everyone"] = "Everyone";
    AllowedUserName["ExplicitlyLicensedPerson"] = "ExplicitlyLicensedPerson";
    AllowedUserName["OnlyAuthor"] = "OnlyAuthor";
})(AllowedUserName = exports.AllowedUserName || (exports.AllowedUserName = {}));
var UssageName;
(function (UssageName) {
    UssageName["Allow"] = "Allow";
    UssageName["Disallow"] = "Disallow";
})(UssageName = exports.UssageName || (exports.UssageName = {}));
var LicenseName;
(function (LicenseName) {
    LicenseName["Cc0"] = "CC0";
    LicenseName["CcBy"] = "CC_BY";
    LicenseName["CcByNc"] = "CC_BY_NC";
    LicenseName["CcByNcNd"] = "CC_BY_NC_ND";
    LicenseName["CcByNcSa"] = "CC_BY_NC_SA";
    LicenseName["CcByNd"] = "CC_BY_ND";
    LicenseName["CcBySa"] = "CC_BY_SA";
    LicenseName["Other"] = "Other";
    LicenseName["RedistributionProhibited"] = "Redistribution_Prohibited";
})(LicenseName = exports.LicenseName || (exports.LicenseName = {}));


/***/ }),

/***/ "./src/vrm/types/index.ts":
/*!********************************!*\
  !*** ./src/vrm/types/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./VRM */ "./src/vrm/types/VRM.ts"));


/***/ }),

/***/ "./src/vrm/utils/disposer.ts":
/*!***********************************!*\
  !*** ./src/vrm/utils/disposer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function deepDispose(object3D) {
    object3D.traverse(dispose);
}
exports.deepDispose = deepDispose;
function dispose(object3D) {
    if (!!object3D.geometry) {
        object3D.geometry.dispose();
        object3D.geometry = undefined;
    }
    if (!!object3D.material && Array.isArray(object3D.material)) {
        object3D.material.forEach(function (material) { return disposeMaterial(material); });
    }
    else if (!!object3D.material) {
        disposeMaterial(object3D.material);
    }
}
function disposeMaterial(material) {
    Object.keys(material).forEach(function (propertyName) {
        if (!!material[propertyName] && typeof material[propertyName].dispose === 'function') {
            material[propertyName].dispose();
        }
    });
    material.dispose();
    material = undefined;
}


/***/ }),

/***/ "./src/vrm/utils/math.ts":
/*!*******************************!*\
  !*** ./src/vrm/utils/math.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __webpack_require__(/*! three */ "three");
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

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvYXNzaWduLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vVlJNLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL1ZSTVBhcnRzQnVpbGRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9ibGVuZHNoYXBlL0JsZW5kU2hhcGVDb250cm9sbGVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2JsZW5kc2hhcGUvQmxlbmRTaGFwZU1hc3Rlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9ibGVuZHNoYXBlL1ZSTUJsZW5kU2hhcGVQcm94eS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9ibGVuZHNoYXBlL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2RlYnVnL1ZSTS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9WUk1QYXJ0c0J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vZGVidWcvVlJNU3ByaW5nQm9uZS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9kZWJ1Zy9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9WUk1GaXJzdFBlcnNvbi50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9maXJzdHBlcnNvbi9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9odW1hbm9pZC9WUk1IdW1hbkJvbmVzLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2h1bWFub2lkL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9DdXJ2ZU1hcHBlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0QXBwbHllci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9sb29rYXQvVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbG9va2F0L1ZSTUxvb2tBdEJvbmVBcHBseWVyLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9WUk1Mb29rQXRIZWFkLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL2xvb2thdC9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9NVG9vbi50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9NYXRlcmlhbENvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9VbmxpdC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9zaGFkZXJzL210b29uLmZyYWciLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvc2hhZGVycy9tdG9vbi52ZXJ0Iiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL21hdGVyaWFsL3NoYWRlcnMvdW5saXQuZnJhZyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9tYXRlcmlhbC9zaGFkZXJzL3VubGl0LnZlcnQiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vbWF0ZXJpYWwvdGV4ZWwtZGVjb2Rlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL1ZSTVNwcmluZ0JvbmUudHMiLCJ3ZWJwYWNrOi8vX190aHJlZV92cm1fXy8uL3NyYy92cm0vc3ByaW5nYm9uZS9WUk1TcHJpbmdCb25lTWFuYWdlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS9zcHJpbmdib25lL2luZGV4LnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vLi9zcmMvdnJtL3R5cGVzL1ZSTS50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS90eXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS91dGlscy9kaXNwb3Nlci50cyIsIndlYnBhY2s6Ly9fX3RocmVlX3ZybV9fLy4vc3JjL3ZybS91dGlscy9tYXRoLnRzIiwid2VicGFjazovL19fdGhyZWVfdnJtX18vZXh0ZXJuYWwgXCJUSFJFRVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxj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Ozs7Ozs7Ozs7O0FDckNELHVCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXNzaWduLnRzXCIpO1xuIiwiaW1wb3J0ICogYXMgX190aHJlZV92cm1fXyBmcm9tICcuJztcbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5hc3NpZ24oVEhSRUUsIF9fdGhyZWVfdnJtX18pO1xuIiwiZXhwb3J0ICogZnJvbSAnLi92cm0vJztcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBWUk1GaXJzdFBlcnNvbiB9IGZyb20gJy4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4vaHVtYW5vaWQnO1xuaW1wb3J0IHsgVlJNTG9va0F0SGVhZCB9IGZyb20gJy4vbG9va2F0JztcbmltcG9ydCB7IE1hdGVyaWFsQ29udmVydGVyIH0gZnJvbSAnLi9tYXRlcmlhbCc7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlciB9IGZyb20gJy4vc3ByaW5nYm9uZSc7XG5pbXBvcnQgeyBSYXdWZWN0b3IzLCBSYXdWZWN0b3I0LCBSYXdWcm1NZXRhLCBWUk1Qb3NlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBkZWVwRGlzcG9zZSB9IGZyb20gJy4vdXRpbHMvZGlzcG9zZXInO1xuaW1wb3J0IHsgVlJNUGFydHNCdWlsZGVyIH0gZnJvbSAnLi9WUk1QYXJ0c0J1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgVlJNQnVpbGRlciB7XG4gIHByb3RlY3RlZCBfbWF0ZXJpYWxDb252ZXJ0ZXIgPSBuZXcgTWF0ZXJpYWxDb252ZXJ0ZXIodHJ1ZSk7XG5cbiAgcHJvdGVjdGVkIF9wYXJ0c0J1aWxkZXIgPSBuZXcgVlJNUGFydHNCdWlsZGVyKCk7XG5cbiAgcHVibGljIG1hdGVyaWFsQ29udmVydGVyKG1hdGVyaWFsQ29udmVydGVyOiBNYXRlcmlhbENvbnZlcnRlcik6IFZSTUJ1aWxkZXIge1xuICAgIHRoaXMuX21hdGVyaWFsQ29udmVydGVyID0gbWF0ZXJpYWxDb252ZXJ0ZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgcGFydHNCdWlsZGVyKHBhcnRzQnVpbGRlcjogVlJNUGFydHNCdWlsZGVyKSB7XG4gICAgdGhpcy5fcGFydHNCdWlsZGVyID0gcGFydHNCdWlsZGVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGJ1aWxkKGdsdGY6IFRIUkVFLkdMVEYpOiBQcm9taXNlPFZSTT4ge1xuICAgIGNvbnN0IHZybSA9IG5ldyBWUk0odGhpcy5fcGFydHNCdWlsZGVyKTtcbiAgICBjb25zdCBjb252ZXJ0ZWRHbHRmID0gYXdhaXQgdGhpcy5fbWF0ZXJpYWxDb252ZXJ0ZXIuY29udmVydEdMVEZNYXRlcmlhbHMoZ2x0Zik7XG4gICAgYXdhaXQgdnJtLmxvYWRHTFRGKGNvbnZlcnRlZEdsdGYpO1xuICAgIHJldHVybiB2cm07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVlJNIG1vZGVsLlxuICogSXQgaGFzIHNvIG1hbnkgZmVhdHVyZSB0byBkZWFsIHdpdGggeW91ciBWUk0gbW9kZWxzIVxuICpcbiAqIEBleGFtcGxlIE1vc3QgYmFzaWMgdXNlIG9mIFZSTVxuICogYGBgXG4gKiBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICpcbiAqIG5ldyBUSFJFRS5HTFRGTG9hZGVyKCkubG9hZCggJ21vZGVscy9zaGluby52cm0nLCAoIGdsdGYgKSA9PiB7XG4gKlxuICogICBUSFJFRS5WUk0uZnJvbSggZ2x0ZiApLnRoZW4oICggdnJtICkgPT4ge1xuICpcbiAqICAgICBzY2VuZS5hZGQoIHZybS5zY2VuZSApO1xuICpcbiAqICAgfSApO1xuICpcbiAqIH0gKTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgVlJNIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFtbVlJNXV0gdXNpbmcgQnVpbGRlciBwYXR0ZXJuLlxuICAgKiBTZWUgdGhlIHJlZmVyZW5jZSBvZiBbW1ZSTUJ1aWxkZXJdXSBmb3IgZnVydGhlciB1c2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCBCdWlsZGVyKCk6IFZSTUJ1aWxkZXIge1xuICAgIHJldHVybiBuZXcgVlJNQnVpbGRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFtbVlJNXV0gZnJvbSBhIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXIuXG4gICAqIEl0J3MgcHJvYmFibHkgYSB0aGluZyB3aGF0IHlvdSB3YW50IHRvIGdldCBzdGFydGVkIHdpdGggVlJNcy5cbiAgICpcbiAgICogQGV4YW1wbGUgTW9zdCBiYXNpYyB1c2Ugb2YgVlJNXG4gICAqIGBgYFxuICAgKiBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgKlxuICAgKiBuZXcgVEhSRUUuR0xURkxvYWRlcigpLmxvYWQoICdtb2RlbHMvc2hpbm8udnJtJywgKCBnbHRmICkgPT4ge1xuICAgKlxuICAgKiAgIFRIUkVFLlZSTS5mcm9tKCBnbHRmICkudGhlbiggKCB2cm0gKSA9PiB7XG4gICAqXG4gICAqICAgICBzY2VuZS5hZGQoIHZybS5zY2VuZSApO1xuICAgKlxuICAgKiAgIH0gKTtcbiAgICpcbiAgICogfSApO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIGdsdGYgQSBwYXJzZWQgR0xURiBvYmplY3QgdGFrZW4gZnJvbSBHTFRGTG9hZGVyXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGZyb20oZ2x0ZjogVEhSRUUuR0xURik6IFByb21pc2U8VlJNPiB7XG4gICAgcmV0dXJuIG5ldyBWUk1CdWlsZGVyKCkuYnVpbGQoZ2x0Zik7XG4gIH1cblxuICBwcml2YXRlIF9yZXN0UG9zZT86IFZSTVBvc2UgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBpbmZvcm1hdGlvbnMgYWJvdXQgcmVzdCBwb3NlIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHJlZmVyIHRoaXMgd2hlbiB5b3Ugd2FudCB0byByZXNldCBpdHMgcG9zZSwgYWxvbmcgd2l0aCBbW1ZSTS5zZXRQb3NlXV19LlxuICAgKi9cbiAgcHVibGljIGdldCByZXN0UG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdFBvc2U7XG4gIH1cblxuICBwcml2YXRlIF9odW1hbkJvbmVzPzogVlJNSHVtYW5Cb25lcyB8IG51bGw7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNSHVtYW5Cb25lc11dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBjYW4gbW92ZSBvciByb3RhdGUgdGhlc2UgYm9uZXMgYXMgYSBgVEhSRUUuT2JqZWN0M0RgLlxuICAgKiBFYWNoIGJvbmVzIGRlZmluZWQgaW4gVlJNIHNwZWMgYXJlIGVpdGhlciByZXF1aXJlZCBvciBvcHRpb25hbC5cbiAgICogU2VlIGFsc286IFtbVlJNLnNldFBvc2VdXVxuICAgKlxuICAgKiBAVE9ETyBBZGQgYSBsaW5rIHRvIFZSTSBzcGVjXG4gICAqL1xuICBwdWJsaWMgZ2V0IGh1bWFuQm9uZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2h1bWFuQm9uZXM7XG4gIH1cblxuICBwcml2YXRlIF9ibGVuZFNoYXBlUHJveHk/OiBWUk1CbGVuZFNoYXBlUHJveHkgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUJsZW5kU2hhcGVQcm94eV1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNvbnRyb2wgdGhlc2UgZmFjaWFsIGV4cHJlc3Npb25zIHZpYSBbW1ZSTUJsZW5kU2hhcGVQcm94eS5zZXRWYWx1ZV1dLlxuICAgKi9cbiAgcHVibGljIGdldCBibGVuZFNoYXBlUHJveHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JsZW5kU2hhcGVQcm94eTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpcnN0UGVyc29uPzogVlJNRmlyc3RQZXJzb24gfCBudWxsO1xuXG4gIC8qKlxuICAgKiBDb250YWlucyBbW1ZSTUZpcnN0UGVyc29uXV0gb2YgdGhlIFZSTS5cbiAgICogWW91IGNhbiB1c2UgdmFyaW91cyBmZWF0dXJlIG9mIHRoZSBmaXJzdFBlcnNvbiBmaWVsZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZmlyc3RQZXJzb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0UGVyc29uO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9va0F0PzogVlJNTG9va0F0SGVhZCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIFtbVlJNTG9va0F0SGVhZF1dIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHVzZSBbW1ZSTUxvb2tBdEhlYWQuc2V0VGFyZ2V0XV0gdG8gY29udHJvbCB0aGUgZXllIGRpcmVjdGlvbiBvZiB5b3VyIFZSTXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxvb2tBdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9va0F0O1xuICB9XG5cbiAgcHJpdmF0ZSBfbWV0YT86IFJhd1ZybU1ldGE7XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIG1ldGEgZmllbGRzIG9mIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIHJlZmVyIHRoZXNlIGxpY2Vuc2UgZmllbGRzIGJlZm9yZSB1c2UgeW91ciBWUk1zLlxuICAgKi9cbiAgcHVibGljIGdldCBtZXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9tZXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uTWl4ZXI/OiBUSFJFRS5BbmltYXRpb25NaXhlcjtcblxuICAvKipcbiAgICogQ29udGFpbnMgQW5pbWF0aW9uTWl4ZXIgYXNzb2NpYXRlZCB3aXRoIHRoZSBbW1ZSTS5ibGVuZFNoYXBlUHJveHldXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgYW5pbWF0aW9uTWl4ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbk1peGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3ByaW5nQm9uZU1hbmFnZXI/OiBWUk1TcHJpbmdCb25lTWFuYWdlcjtcblxuICAvKipcbiAgICogQSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0gbWFuaXB1bGF0ZXMgYWxsIHNwcmluZyBib25lcyBhdHRhY2hlZCBvbiB0aGUgVlJNLlxuICAgKiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgdGhpcyBwcm9wZXJ0eS5cbiAgICovXG4gIHB1YmxpYyBnZXQgc3ByaW5nQm9uZU1hbmFnZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwcmluZ0JvbmVNYW5hZ2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgcGFyc2VkIHJlc3VsdCBvZiBHTFRGIHRha2VuIGZyb20gR0xURkxvYWRlci5cbiAgICovXG4gIHByaXZhdGUgX2dsdGY/OiBUSFJFRS5HTFRGO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX3BhcnRzQnVpbGRlcjogVlJNUGFydHNCdWlsZGVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVlJNIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gX2J1aWxkZXIgQSBbW1ZSTVBhcnRzQnVpbGRlcl1dLiBVc3VhbGx5IHlvdSBkb24ndCBoYXZlIHRvIGNhcmUgYWJvdXQgaXRcbiAgICovXG4gIGNvbnN0cnVjdG9yKF9idWlsZGVyPzogVlJNUGFydHNCdWlsZGVyKSB7XG4gICAgaWYgKF9idWlsZGVyKSB7XG4gICAgICB0aGlzLl9wYXJ0c0J1aWxkZXIgPSBfYnVpbGRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFydHNCdWlsZGVyID0gbmV3IFZSTVBhcnRzQnVpbGRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNlaXZlIGEgR0xURiBvYmplY3QgcmV0cmlldmVkIGZyb20gYFRIUkVFLkdMVEZMb2FkZXJgIGFuZCBsb2FkIFZSTSBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZ2x0ZiBBIHBhcnNlZCByZXN1bHQgb2YgR0xURiB0YWtlbiBmcm9tIEdMVEZMb2FkZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkR0xURihnbHRmOiBUSFJFRS5HTFRGKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fZ2x0ZiA9IGdsdGY7XG5cbiAgICBpZiAoZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zID09PSB1bmRlZmluZWQgfHwgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIFZSTSBleHRlbnNpb24gb24gdGhlIEdMVEYnKTtcbiAgICB9XG4gICAgY29uc3QgdnJtRXh0ID0gZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTTtcblxuICAgIHRoaXMuX21ldGEgPSB2cm1FeHQubWV0YTtcblxuICAgIGdsdGYuc2NlbmUudXBkYXRlTWF0cml4V29ybGQoZmFsc2UpO1xuXG4gICAgLy8gU2tpbm5lZCBvYmplY3Qgc2hvdWxkIG5vdCBiZSBmcnVzdHVtQ3VsbGVkXG4gICAgLy8gU2luY2UgcHJlLXNraW5uZWQgcG9zaXRpb24gbWlnaHQgYmUgb3V0c2lkZSBvZiB2aWV3XG4gICAgZ2x0Zi5zY2VuZS50cmF2ZXJzZSgob2JqZWN0M2QpID0+IHtcbiAgICAgIGlmICgob2JqZWN0M2QgYXMgYW55KS5pc01lc2gpIHtcbiAgICAgICAgb2JqZWN0M2QuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVkdWNlQm9uZXMoZ2x0Zi5zY2VuZSk7XG5cbiAgICBjb25zdCBodW1hbkJvbmVzID0gYXdhaXQgdGhpcy5fcGFydHNCdWlsZGVyLmxvYWRIdW1hbm9pZChnbHRmKTtcbiAgICB0aGlzLl9odW1hbkJvbmVzID0gaHVtYW5Cb25lcztcblxuICAgIHRoaXMuX2ZpcnN0UGVyc29uID0gdGhpcy5odW1hbkJvbmVzXG4gICAgICA/IGF3YWl0IHRoaXMuX3BhcnRzQnVpbGRlci5sb2FkRmlyc3RQZXJzb24odnJtRXh0LmZpcnN0UGVyc29uLCB0aGlzLmh1bWFuQm9uZXMsIGdsdGYpXG4gICAgICA6IG51bGw7XG5cbiAgICB0aGlzLl9hbmltYXRpb25NaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihnbHRmLnNjZW5lKTtcbiAgICBjb25zdCBibGVuZFNoYXBlUHJveHkgPSBhd2FpdCB0aGlzLl9wYXJ0c0J1aWxkZXIubG9hZEJsZW5kU2hhcGVNYXN0ZXIodGhpcy5hbmltYXRpb25NaXhlciEsIGdsdGYpO1xuICAgIGlmICghYmxlbmRTaGFwZVByb3h5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBjcmVhdGUgYmxlbmRTaGFwZS4gY29uZmlybSB5b3VyIHZybSBmaWxlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5ID0gYmxlbmRTaGFwZVByb3h5O1xuXG4gICAgdGhpcy5fc3ByaW5nQm9uZU1hbmFnZXIgPSBhd2FpdCB0aGlzLl9wYXJ0c0J1aWxkZXIubG9hZFNlY29uZGFyeShnbHRmKTtcblxuICAgIHRoaXMuX2xvb2tBdCA9XG4gICAgICB0aGlzLmJsZW5kU2hhcGVQcm94eSAmJiB0aGlzLmh1bWFuQm9uZXNcbiAgICAgICAgPyB0aGlzLl9wYXJ0c0J1aWxkZXIubG9hZExvb2tBdCh2cm1FeHQuZmlyc3RQZXJzb24sIHRoaXMuYmxlbmRTaGFwZVByb3h5LCB0aGlzLmh1bWFuQm9uZXMpXG4gICAgICAgIDogbnVsbDtcblxuICAgIC8vIFNhdmUgY3VycmVudCBpbml0aWFsIHBvc2UgKHdoaWNoIGlzIFJlc3QtcG9zZSkgdG8gcmVzdFBvc2UgZmllbGQsIHNpbmNlIHBvc2UgY2hhbmdpbmcgbWF5IGxvc2UgdGhlIGRlZmF1bHQgdHJhbnNmb3Jtcy4gVGhpcyBpcyB1c2VmdWwgd2hlbiByZXNldHRpbmcgdGhlIHBvc2Ugb3IgcmVmZXJyaW5nIGRlZmF1bHQgcG9zZS5cbiAgICB0aGlzLl9yZXN0UG9zZSA9IHRoaXMuaHVtYW5Cb25lc1xuICAgICAgPyBPYmplY3Qua2V5cyh0aGlzLmh1bWFuQm9uZXMpLnJlZHVjZShcbiAgICAgICAgICAocmVzdFBvc2UsIHZybUJvbmVOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBib25lID0gdGhpcy5odW1hbkJvbmVzIVt2cm1Cb25lTmFtZV0hO1xuICAgICAgICAgICAgcmVzdFBvc2VbdnJtQm9uZU5hbWVdID0ge1xuICAgICAgICAgICAgICBwb3NpdGlvbjogYm9uZS5wb3NpdGlvbi50b0FycmF5KCkgYXMgUmF3VmVjdG9yMyxcbiAgICAgICAgICAgICAgcm90YXRpb246IGJvbmUucXVhdGVybmlvbi50b0FycmF5KCkgYXMgUmF3VmVjdG9yNCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcmVzdFBvc2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7fSBhcyBWUk1Qb3NlLFxuICAgICAgICApXG4gICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogTGV0IHRoZSBWUk0gZG8gYSBnaXZlbiBwb3NlLlxuICAgKlxuICAgKiBAcGFyYW0gcG9zZU9iamVjdCBbW1ZSTVBvc2VdXSByZXByZXNlbnRzIGEgcG9zZVxuICAgKi9cbiAgcHVibGljIHNldFBvc2UocG9zZU9iamVjdDogVlJNUG9zZSk6IHZvaWQge1xuICAgIC8vIFZSTeOBq+WumuOCgeOCieOCjOOBn2JvbmXjgYzotrPjgorjgarjgYTloLTlkIjjgIHmraPjgZfjgY9wb3Nl44GM5Y+W44KM44Gq44GE5Y+v6IO95oCn44GM44GC44KLXG4gICAgaWYgKCF0aGlzLmh1bWFuQm9uZXMpIHtcbiAgICAgIGNvbnNvbGUud2FybignVGhpcyBWUk0gY2Fubm90IGJlIHBvc2VkIHNpbmNlIGh1bWFuQm9uZXMgYXJlIG5vdCBwcm9wZXJseSBzZXQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhwb3NlT2JqZWN0KS5mb3JFYWNoKChib25lTmFtZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBwb3NlT2JqZWN0W2JvbmVOYW1lXSE7XG4gICAgICBjb25zdCB0YXJnZXRCb25lID0gdGhpcy5odW1hbkJvbmVzIVtib25lTmFtZV07XG5cbiAgICAgIC8vIFZSTeaomea6luODnOODvOODs+OCkua6gOOBn+OBl+OBpuOBhOOBquOBhFZSTeODleOCoeOCpOODq+OBjOS4luOBruS4reOBq+OBr+WtmOWcqOOBmeOCi1xuICAgICAgLy8g77yI5bCR44GX5Y+k44GEdW5pVlJN44Gv44CB5b+F6aCI44Gq44Gu44GraGlwc+OCkuWHuuWKm+OBl+OBpuOBhOOBquOBleOBneOBhu+8iVxuICAgICAgLy8g44Gd44Gu5aC05ZCI44Gv54Sh6KaW44CCXG4gICAgICBpZiAoIXRhcmdldEJvbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0U3RhdGUgPSB0aGlzLnJlc3RQb3NlIVtib25lTmFtZV07XG4gICAgICBpZiAoIXJlc3RTdGF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5wb3NpdGlvbikge1xuICAgICAgICAvLyDlhYPjga7nirbmhYvjgavmiLvjgZfjgabjgYvjgonjgIHnp7vli5XliIbjgpLov73liqBcbiAgICAgICAgdGFyZ2V0Qm9uZS5wb3NpdGlvbi5zZXQoXG4gICAgICAgICAgcmVzdFN0YXRlLnBvc2l0aW9uIVswXSArIHN0YXRlLnBvc2l0aW9uWzBdLFxuICAgICAgICAgIHJlc3RTdGF0ZS5wb3NpdGlvbiFbMV0gKyBzdGF0ZS5wb3NpdGlvblsxXSxcbiAgICAgICAgICByZXN0U3RhdGUucG9zaXRpb24hWzJdICsgc3RhdGUucG9zaXRpb25bMl0sXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUucm90YXRpb24pIHtcbiAgICAgICAgdGFyZ2V0Qm9uZS5xdWF0ZXJuaW9uLmZyb21BcnJheShzdGF0ZS5yb3RhdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udGFpbnMgdGhlIHNjZW5lIG9mIHRoZSBlbnRpcmUgVlJNLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBkbyBgc2NlbmUuYWRkKCB2cm0uc2NlbmUgKWAuXG4gICAqIEl0IGlzIGFuIGVxdWl2YWxlbnQgb2YgYGdsdGYuc2NlbmVgLlxuICAgKi9cbiAgZ2V0IHNjZW5lKCkge1xuICAgIHJldHVybiB0aGlzLl9nbHRmICYmIHRoaXMuX2dsdGYuc2NlbmU7XG4gIH1cblxuICAvKipcbiAgICogKipZb3UgbmVlZCB0byBjYWxsIHRoaXMgb24geW91ciB1cGRhdGUgbG9vcC4qKlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgZXZlcnkgVlJNIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvb2tBdCkge1xuICAgICAgdGhpcy5sb29rQXQudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uTWl4ZXIpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uTWl4ZXIudXBkYXRlKGRlbHRhKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ibGVuZFNoYXBlUHJveHkpIHtcbiAgICAgIHRoaXMuYmxlbmRTaGFwZVByb3h5LnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyKSB7XG4gICAgICB0aGlzLnNwcmluZ0JvbmVNYW5hZ2VyLmxhdGVVcGRhdGUoZGVsdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBWUk0uXG4gICAqIFlvdSBtaWdodCB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSB3YW50IHRvIHVubG9hZCB0aGUgVlJNIG1vZGVsLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgY29uc3Qgc2NlbmUgPSB0aGlzLnNjZW5lO1xuICAgIGlmIChzY2VuZSkge1xuICAgICAgd2hpbGUgKHNjZW5lLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gc2NlbmUuY2hpbGRyZW5bc2NlbmUuY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgIGRlZXBEaXNwb3NlKG9iamVjdCk7XG4gICAgICAgIHNjZW5lLnJlbW92ZShvYmplY3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZWR1Y2VCb25lcyhyb290OiBUSFJFRS5PYmplY3QzRCk6IHZvaWQge1xuICAvLyBUcmF2ZXJzZSBhbiBlbnRpcmUgdHJlZVxuICByb290LnRyYXZlcnNlKChvYmopID0+IHtcbiAgICBpZiAob2JqLnR5cGUgIT09ICdTa2lubmVkTWVzaCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gb2JqIGFzIFRIUkVFLlNraW5uZWRNZXNoO1xuICAgIGNvbnN0IGdlb21ldHJ5ID0gKG1lc2guZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnkpLmNsb25lKCk7XG4gICAgbWVzaC5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG5cbiAgICAvLyBnZW5lcmF0ZSByZWR1Y2VkIGJvbmUgbGlzdFxuICAgIGNvbnN0IGJvbmVzOiBUSFJFRS5Cb25lW10gPSBbXTsgLy8gbmV3IGxpc3Qgb2YgYm9uZVxuICAgIGNvbnN0IGJvbmVJbnZlcnNlczogVEhSRUUuTWF0cml4NFtdID0gW107IC8vIG5ldyBsaXN0IG9mIGJvbmVJbnZlcnNlXG4gICAgY29uc3QgYm9uZUluZGV4TWFwOiB7IFtpbmRleDogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTsgLy8gbWFwIG9mIG9sZCBib25lIGluZGV4IHZzLiBuZXcgYm9uZSBpbmRleFxuICAgIGNvbnN0IGFycmF5ID0gKGF0dHJpYnV0ZS5hcnJheSBhcyBhbnkpLm1hcCgoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgLy8gbmV3IHNraW5JbmRleCBidWZmZXJcbiAgICAgIGlmIChib25lSW5kZXhNYXBbaW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYm9uZUluZGV4TWFwW2luZGV4XSA9IGJvbmVzLmxlbmd0aDtcbiAgICAgICAgYm9uZXMucHVzaChtZXNoLnNrZWxldG9uLmJvbmVzW2luZGV4XSk7XG4gICAgICAgIGJvbmVJbnZlcnNlcy5wdXNoKG1lc2guc2tlbGV0b24uYm9uZUludmVyc2VzW2luZGV4XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYm9uZUluZGV4TWFwW2luZGV4XTtcbiAgICB9KTtcblxuICAgIC8vIGF0dGFjaCBuZXcgc2tpbkluZGV4IGJ1ZmZlclxuICAgIGdlb21ldHJ5LnJlbW92ZUF0dHJpYnV0ZSgnc2tpbkluZGV4Jyk7XG4gICAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdza2luSW5kZXgnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGFycmF5LCA0LCBmYWxzZSkpO1xuICAgIG1lc2guYmluZChuZXcgVEhSRUUuU2tlbGV0b24oYm9uZXMsIGJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF5eXl5eXl5eXl5eXl5eXl5eXl4gdHJhbnNmb3JtIG9mIG1lc2hlcyBzaG91bGQgYmUgaWdub3JlZFxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFzdGVyL3NwZWNpZmljYXRpb24vMi4wI3NraW5zXG4gIH0pO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgQmxlbmRTaGFwZUNvbnRyb2xsZXIsIEJsZW5kU2hhcGVNYXN0ZXIsIFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4vYmxlbmRzaGFwZSc7XG5pbXBvcnQgeyBSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3MsIFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi9maXJzdHBlcnNvbic7XG5pbXBvcnQgeyBWUk1IdW1hbkJvbmVzIH0gZnJvbSAnLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBWUk1Mb29rQXRIZWFkIH0gZnJvbSAnLi9sb29rYXQnO1xuaW1wb3J0IHsgVlJNTG9va0F0QmxlbmRTaGFwZUFwcGx5ZXIgfSBmcm9tICcuL2xvb2thdC9WUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRCb25lQXBwbHllciB9IGZyb20gJy4vbG9va2F0L1ZSTUxvb2tBdEJvbmVBcHBseWVyJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVNYW5hZ2VyIH0gZnJvbSAnLi9zcHJpbmdib25lJztcbmltcG9ydCB7IEdMVEZNZXNoLCBHTFRGTm9kZSwgR0xURlByaW1pdGl2ZSwgUmF3VnJtSHVtYW5vaWRCb25lIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgKiBhcyBSYXcgZnJvbSAnLi90eXBlcy9WUk0nO1xuXG5leHBvcnQgY2xhc3MgVlJNUGFydHNCdWlsZGVyIHtcbiAgLyoqXG4gICAqIGxvYWQgaHVtYW5vaWRcbiAgICogQHBhcmFtIGdsdGZcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkSHVtYW5vaWQoZ2x0ZjogVEhSRUUuR0xURik6IFByb21pc2U8VlJNSHVtYW5Cb25lcyB8IG51bGw+IHtcbiAgICBjb25zdCBodW1hbkJvbmVzOiBSYXdWcm1IdW1hbm9pZEJvbmVbXSB8IHVuZGVmaW5lZCA9XG4gICAgICBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgJiZcbiAgICAgIGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucy5WUk0gJiZcbiAgICAgIGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucy5WUk0uaHVtYW5vaWQgJiZcbiAgICAgIGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucy5WUk0uaHVtYW5vaWQuaHVtYW5Cb25lcztcbiAgICBpZiAoIWh1bWFuQm9uZXMpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGZpbmQgaHVtYW5Cb25lcyBmaWVsZCBvbiB0aGUgVlJNIGZpbGUnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCBodW1hbkJvbmVzLnJlZHVjZShhc3luYyAodnJtQm9uZXNQcm9taXNlLCBib25lKSA9PiB7XG4gICAgICBjb25zdCB2cm1Cb25lcyA9IGF3YWl0IHZybUJvbmVzUHJvbWlzZTtcbiAgICAgIGNvbnN0IG5vZGVJbmRleCA9IGJvbmUubm9kZTtcbiAgICAgIGNvbnN0IGJvbmVOYW1lID0gYm9uZS5ib25lO1xuXG4gICAgICBpZiAobm9kZUluZGV4ICE9PSB1bmRlZmluZWQgJiYgYm9uZU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2cm1Cb25lc1tib25lTmFtZV0gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgbm9kZUluZGV4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2cm1Cb25lcztcbiAgICB9LCBQcm9taXNlLnJlc29sdmUoe30gYXMgVlJNSHVtYW5Cb25lcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvYWQgZmlyc3QgcGVyc29uXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvblxuICAgKiBAcGFyYW0gaHVtYW5Cb25lc1xuICAgKiBAcGFyYW0gZ2x0ZlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWRGaXJzdFBlcnNvbihcbiAgICBmaXJzdFBlcnNvbjogUmF3LlJhd1ZybUZpcnN0UGVyc29uLFxuICAgIGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMsXG4gICAgZ2x0ZjogVEhSRUUuR0xURixcbiAgKTogUHJvbWlzZTxWUk1GaXJzdFBlcnNvbiB8IG51bGw+IHtcbiAgICBjb25zdCBpc0ZpcnN0UGVyc29uQm9uZU5vdFNldCA9IGZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSA9PT0gdW5kZWZpbmVkIHx8IGZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZSA9PT0gLTE7XG4gICAgY29uc3QgZmlyc3RQZXJzb25Cb25lOiBHTFRGTm9kZSA9IGlzRmlyc3RQZXJzb25Cb25lTm90U2V0XG4gICAgICA/IGh1bWFuQm9uZXNbUmF3Lkh1bWFuQm9uZS5IZWFkXSAvLyBmYWxsYmFja1xuICAgICAgOiBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmN5KCdub2RlJywgZmlyc3RQZXJzb24uZmlyc3RQZXJzb25Cb25lISk7XG5cbiAgICBpZiAoIWZpcnN0UGVyc29uQm9uZSkge1xuICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgZmluZCBmaXJzdFBlcnNvbkJvbmUgb2YgdGhlIFZSTScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQZXJzb25Cb25lT2Zmc2V0ID1cbiAgICAgICFpc0ZpcnN0UGVyc29uQm9uZU5vdFNldCAmJiBmaXJzdFBlcnNvbi5maXJzdFBlcnNvbkJvbmVPZmZzZXRcbiAgICAgICAgPyBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgICAgIGZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldCEueCxcbiAgICAgICAgICAgIGZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldCEueSxcbiAgICAgICAgICAgIGZpcnN0UGVyc29uLmZpcnN0UGVyc29uQm9uZU9mZnNldCEueixcbiAgICAgICAgICApXG4gICAgICAgIDogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMC4wNiwgMCk7IC8vIGZhbGxiYWNrXG5cbiAgICBjb25zdCBtZXNoQW5ub3RhdGlvbnM6IFJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gICAgY29uc3QgbWVzaGVzOiBHTFRGTWVzaFtdID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCdtZXNoJyk7XG4gICAgbWVzaGVzLmZvckVhY2goKG1lc2gsIG1lc2hJbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmxhZyA9IGZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9uc1xuICAgICAgICA/IGZpcnN0UGVyc29uLm1lc2hBbm5vdGF0aW9ucy5maW5kKChhbm5vdGF0aW9uKSA9PiBhbm5vdGF0aW9uLm1lc2ggPT09IG1lc2hJbmRleClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICBtZXNoQW5ub3RhdGlvbnMucHVzaChuZXcgUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzKGZsYWcgJiYgZmxhZy5maXJzdFBlcnNvbkZsYWcsIG1lc2gpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgVlJNRmlyc3RQZXJzb24oZmlyc3RQZXJzb25Cb25lLCBmaXJzdFBlcnNvbkJvbmVPZmZzZXQsIG1lc2hBbm5vdGF0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgbG9hZExvb2tBdChcbiAgICBmaXJzdFBlcnNvbjogUmF3LlJhd1ZybUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFuQm9keUJvbmVzOiBWUk1IdW1hbkJvbmVzLFxuICApOiBWUk1Mb29rQXRIZWFkIHtcbiAgICBjb25zdCBsb29rQXRIb3Jpem9udGFsSW5uZXIgPSBmaXJzdFBlcnNvbi5sb29rQXRIb3Jpem9udGFsSW5uZXI7XG4gICAgY29uc3QgbG9va0F0SG9yaXpvbnRhbE91dGVyID0gZmlyc3RQZXJzb24ubG9va0F0SG9yaXpvbnRhbE91dGVyO1xuICAgIGNvbnN0IGxvb2tBdFZlcnRpY2FsRG93biA9IGZpcnN0UGVyc29uLmxvb2tBdFZlcnRpY2FsRG93bjtcbiAgICBjb25zdCBsb29rQXRWZXJ0aWNhbFVwID0gZmlyc3RQZXJzb24ubG9va0F0VmVydGljYWxVcDtcblxuICAgIHN3aXRjaCAoZmlyc3RQZXJzb24ubG9va0F0VHlwZU5hbWUpIHtcbiAgICAgIGNhc2UgUmF3Lkxvb2tBdFR5cGVOYW1lLkJvbmU6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGxvb2tBdEhvcml6b250YWxJbm5lciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgbG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBsb29rQXRWZXJ0aWNhbERvd24gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGxvb2tBdFZlcnRpY2FsVXAgPT09IHVuZGVmaW5lZFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWQoaHVtYW5Cb2R5Qm9uZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgVlJNTG9va0F0SGVhZChcbiAgICAgICAgICAgIGh1bWFuQm9keUJvbmVzLFxuICAgICAgICAgICAgbmV3IFZSTUxvb2tBdEJvbmVBcHBseWVyKFxuICAgICAgICAgICAgICBodW1hbkJvZHlCb25lcyxcbiAgICAgICAgICAgICAgbG9va0F0SG9yaXpvbnRhbElubmVyLFxuICAgICAgICAgICAgICBsb29rQXRIb3Jpem9udGFsT3V0ZXIsXG4gICAgICAgICAgICAgIGxvb2tBdFZlcnRpY2FsRG93bixcbiAgICAgICAgICAgICAgbG9va0F0VmVydGljYWxVcCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FzZSBSYXcuTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZToge1xuICAgICAgICBpZiAobG9va0F0SG9yaXpvbnRhbE91dGVyID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxEb3duID09PSB1bmRlZmluZWQgfHwgbG9va0F0VmVydGljYWxVcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBWUk1Mb29rQXRIZWFkKGh1bWFuQm9keUJvbmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWQoXG4gICAgICAgICAgICBodW1hbkJvZHlCb25lcyxcbiAgICAgICAgICAgIG5ldyBWUk1Mb29rQXRCbGVuZFNoYXBlQXBwbHllcihcbiAgICAgICAgICAgICAgYmxlbmRTaGFwZVByb3h5LFxuICAgICAgICAgICAgICBsb29rQXRIb3Jpem9udGFsT3V0ZXIsXG4gICAgICAgICAgICAgIGxvb2tBdFZlcnRpY2FsRG93bixcbiAgICAgICAgICAgICAgbG9va0F0VmVydGljYWxVcCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gbmV3IFZSTUxvb2tBdEhlYWQoaHVtYW5Cb2R5Qm9uZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0FuaW1hdGlvbk1peGVyfSBhbmltYXRpb25NaXhlclxuICAgKiBAcGFyYW0ge0dMVEZ9IGdsdGZcbiAgICogQHJldHVybnMge1ZSTUJsZW5kU2hhcGVQcm94eX1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkQmxlbmRTaGFwZU1hc3RlcihcbiAgICBhbmltYXRpb25NaXhlcjogVEhSRUUuQW5pbWF0aW9uTWl4ZXIsXG4gICAgZ2x0ZjogVEhSRUUuR0xURixcbiAgKTogUHJvbWlzZTxWUk1CbGVuZFNoYXBlUHJveHkgfCBudWxsPiB7XG4gICAgY29uc3QgYmxlbmRTaGFwZUdyb3VwczogUmF3LlJhd1ZybUJsZW5kU2hhcGVHcm91cFtdIHwgdW5kZWZpbmVkID1cbiAgICAgIGdsdGYucGFyc2VyLmpzb24uZXh0ZW5zaW9ucyAmJlxuICAgICAgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTSAmJlxuICAgICAgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTS5ibGVuZFNoYXBlTWFzdGVyICYmXG4gICAgICBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNLmJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3VwcztcbiAgICBpZiAoIWJsZW5kU2hhcGVHcm91cHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGJsZW5kU2hhcGVNYXN0ZXIgPSBuZXcgQmxlbmRTaGFwZU1hc3RlcigpO1xuICAgIGNvbnN0IGJsZW5kU2hhcGVQcmVzZXRNYXA6IHsgW3ByZXNldE5hbWUgaW4gUmF3LkJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9ID0ge307XG5cbiAgICBibGVuZFNoYXBlR3JvdXBzLmZvckVhY2goYXN5bmMgKGdyb3VwKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gZ3JvdXAubmFtZTtcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdjcmVhdGVCbGVuZFNoYXBlTWFzdGVyRnJvbVZSTTogT25lIG9mIGJsZW5kU2hhcGVHcm91cHMgaGFzIG5vIG5hbWUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGdyb3VwLnByZXNldE5hbWUgJiZcbiAgICAgICAgZ3JvdXAucHJlc2V0TmFtZSAhPT0gUmF3LkJsZW5kU2hhcGVQcmVzZXROYW1lLlVua25vd24gJiZcbiAgICAgICAgIWJsZW5kU2hhcGVQcmVzZXRNYXBbZ3JvdXAucHJlc2V0TmFtZV1cbiAgICAgICkge1xuICAgICAgICBibGVuZFNoYXBlUHJlc2V0TWFwW2dyb3VwLnByZXNldE5hbWVdID0gZ3JvdXAubmFtZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBCbGVuZFNoYXBlQ29udHJvbGxlcihuYW1lKTtcbiAgICAgIGdsdGYuc2NlbmUuYWRkKGNvbnRyb2xsZXIpO1xuXG4gICAgICBjb250cm9sbGVyLmlzQmluYXJ5ID0gZ3JvdXAuaXNCaW5hcnkgfHwgZmFsc2U7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGdyb3VwLmJpbmRzKSkge1xuICAgICAgICBncm91cC5iaW5kcy5mb3JFYWNoKGFzeW5jIChiaW5kKSA9PiB7XG4gICAgICAgICAgaWYgKGJpbmQubWVzaCA9PT0gdW5kZWZpbmVkIHx8IGJpbmQuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG1vcnBoTWVzaGVzOiBHTFRGTWVzaCA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ21lc2gnLCBiaW5kLm1lc2gpO1xuICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZXM6IEdMVEZQcmltaXRpdmVbXSA9XG4gICAgICAgICAgICBtb3JwaE1lc2hlcy50eXBlID09PSAnR3JvdXAnXG4gICAgICAgICAgICAgID8gKG1vcnBoTWVzaGVzLmNoaWxkcmVuIGFzIEFycmF5PEdMVEZQcmltaXRpdmU+KVxuICAgICAgICAgICAgICA6IFttb3JwaE1lc2hlcyBhcyBHTFRGUHJpbWl0aXZlXTtcbiAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldEluZGV4ID0gYmluZC5pbmRleDtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhcHJpbWl0aXZlcy5ldmVyeShcbiAgICAgICAgICAgICAgKHByaW1pdGl2ZSkgPT5cbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMpICYmXG4gICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRJbmRleCA8IHByaW1pdGl2ZS5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgY3JlYXRlQmxlbmRTaGFwZU1hc3RlckZyb21WUk06ICR7XG4gICAgICAgICAgICAgICAgZ3JvdXAubmFtZVxuICAgICAgICAgICAgICB9IGF0dGVtcHRzIHRvIGluZGV4ICR7bW9ycGhUYXJnZXRJbmRleH10aCBtb3JwaCBidXQgbm90IGZvdW5kLmAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRyb2xsZXIuYWRkQmluZCh7XG4gICAgICAgICAgICBtZXNoZXM6IHByaW1pdGl2ZXMsXG4gICAgICAgICAgICBtb3JwaFRhcmdldEluZGV4LFxuICAgICAgICAgICAgd2VpZ2h0OiBiaW5kLndlaWdodCB8fCAxMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXRlcmlhbFZhbHVlcyA9IGdyb3VwLm1hdGVyaWFsVmFsdWVzO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWxWYWx1ZXMpKSB7XG4gICAgICAgIG1hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBtYXRlcmlhbFZhbHVlLnRhcmdldFZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IFRIUkVFLk1hdGVyaWFsW10gPSBbXTtcbiAgICAgICAgICBnbHRmLnNjZW5lLnRyYXZlcnNlKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICgob2JqZWN0IGFzIGFueSkubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsW10gfCBUSFJFRS5NYXRlcmlhbCA9IChvYmplY3QgYXMgYW55KS5tYXRlcmlhbDtcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnB1c2goXG4gICAgICAgICAgICAgICAgICAuLi5tYXRlcmlhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIChtdGwpID0+IG10bC5uYW1lID09PSBtYXRlcmlhbFZhbHVlLm1hdGVyaWFsTmFtZSEgJiYgbWF0ZXJpYWxzLmluZGV4T2YobXRsKSA9PT0gLTEsXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWwubmFtZSA9PT0gbWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbE5hbWUgJiYgbWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgbWF0ZXJpYWxzLmZvckVhY2goKG1hdGVyaWFsKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmFkZE1hdGVyaWFsVmFsdWUoe1xuICAgICAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiB0aGlzLnJlbmFtZU1hdGVyaWFsUHJvcGVydHkobWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWUhKSxcbiAgICAgICAgICAgICAgdGFyZ2V0VmFsdWU6IG1hdGVyaWFsVmFsdWUudGFyZ2V0VmFsdWUhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBibGVuZFNoYXBlTWFzdGVyLnJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKG5hbWUsIGNvbnRyb2xsZXIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFZSTUJsZW5kU2hhcGVQcm94eS5jcmVhdGUoYW5pbWF0aW9uTWl4ZXIsIGJsZW5kU2hhcGVNYXN0ZXIsIGJsZW5kU2hhcGVQcmVzZXRNYXApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWRTZWNvbmRhcnkoZ2x0ZjogVEhSRUUuR0xURik6IFByb21pc2U8VlJNU3ByaW5nQm9uZU1hbmFnZXI+IHtcbiAgICBjb25zdCBtYW5hZ2VyID0gbmV3IFZSTVNwcmluZ0JvbmVNYW5hZ2VyKCk7XG4gICAgYXdhaXQgbWFuYWdlci5sb2FkR0xURihnbHRmKTtcbiAgICByZXR1cm4gbWFuYWdlcjtcbiAgfVxuXG4gIHByaXZhdGUgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzOiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMSk7XG5cbiAgICBpZiAoIS9bQS1aXS8udGVzdChuYW1lWzBdKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NYXRlcmlhbHM6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgR0xURlByaW1pdGl2ZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBCbGVuZFNoYXBlQmluZCB7XG4gIG1lc2hlczogR0xURlByaW1pdGl2ZVtdO1xuICBtb3JwaFRhcmdldEluZGV4OiBudW1iZXI7XG4gIHdlaWdodDogbnVtYmVyO1xufVxuXG5lbnVtIEJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZSB7XG4gIE5VTUJFUixcbiAgVkVDVE9SMixcbiAgVkVDVE9SMyxcbiAgVkVDVE9SNCxcbiAgQ09MT1IsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWUge1xuICBtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWw7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBkZWZhdWx0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICB0YXJnZXRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gIGRlbHRhVmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yOyAvLyB0YXJnZXRWYWx1ZSAtIGRlZmF1bHRWYWx1ZVxuICB0eXBlOiBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGU7XG59XG5cbmNvbnN0IF92MiA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5jb25zdCBfdjMgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3Y0ID0gbmV3IFRIUkVFLlZlY3RvcjQoKTtcbmNvbnN0IF9jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuXG4vLyBhbmltYXRpb25NaXhlciDjga7nm6Poppblr77osaHjga/jgIFTY2VuZSDjga7kuK3jgavlhaXjgaPjgabjgYTjgovlv4XopoHjgYzjgYLjgovjgIJcbi8vIOOBneOBruOBn+OCgeOAgeihqOekuuOCquODluOCuOOCp+OCr+ODiOOBp+OBr+OBquOBhOOBkeOCjOOBqeOAgU9iamVjdDNEIOOCkue2meaJv+OBl+OBpiBTY2VuZSDjgavmipXlhaXjgafjgY3jgovjgojjgYbjgavjgZnjgovjgIJcbmV4cG9ydCBjbGFzcyBCbGVuZFNoYXBlQ29udHJvbGxlciBleHRlbmRzIFRIUkVFLk9iamVjdDNEIHtcbiAgcHVibGljIHdlaWdodDogbnVtYmVyID0gMC4wO1xuICBwdWJsaWMgaXNCaW5hcnk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9iaW5kczogQmxlbmRTaGFwZUJpbmRbXSA9IFtdO1xuICBwcml2YXRlIF9tYXRlcmlhbFZhbHVlczogQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IGBCbGVuZFNoYXBlQ29udHJvbGxlcl8ke2V4cHJlc3Npb25OYW1lfWA7XG5cbiAgICAvLyB0cmF2ZXJzZSDmmYLjga7mlZHmuIjmiYvmrrXjgajjgZfjgaYgT2JqZWN0M0Qg44Gn44Gv44Gq44GE44GT44Go44KS5piO56S644GX44Gm44GK44GPXG4gICAgdGhpcy50eXBlID0gJ0JsZW5kU2hhcGVDb250cm9sbGVyJztcbiAgICAvLyDooajnpLrnm67nmoTjga7jgqrjg5bjgrjjgqfjgq/jg4jjgafjga/jgarjgYTjga7jgafjgIHosqDojbfou73muJvjga7jgZ/jgoHjgasgdmlzaWJsZSDjgpIgZmFsc2Ug44Gr44GX44Gm44GK44GP44CCXG4gICAgLy8g44GT44KM44Gr44KI44KK44CB44GT44Gu44Kk44Oz44K544K/44Oz44K544Gr5a++44GZ44KL5q+O44OV44Os44O844Og44GuIG1hdHJpeCDoh6rli5XoqIjnrpfjgpLnnIHnlaXjgafjgY3jgovjgIJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRCaW5kKGFyZ3M6IHsgbWVzaGVzOiBHTFRGUHJpbWl0aXZlW107IG1vcnBoVGFyZ2V0SW5kZXg6IG51bWJlcjsgd2VpZ2h0OiBudW1iZXIgfSk6IHZvaWQge1xuICAgIC8vIG9yaWdpbmFsIHdlaWdodCBpcyAwLTEwMCBidXQgd2Ugd2FudCB0byBkZWFsIHdpdGggdGhpcyB2YWx1ZSB3aXRoaW4gMC0xXG4gICAgY29uc3Qgd2VpZ2h0ID0gYXJncy53ZWlnaHQgLyAxMDA7XG5cbiAgICB0aGlzLl9iaW5kcy5wdXNoKHtcbiAgICAgIG1lc2hlczogYXJncy5tZXNoZXMsXG4gICAgICBtb3JwaFRhcmdldEluZGV4OiBhcmdzLm1vcnBoVGFyZ2V0SW5kZXgsXG4gICAgICB3ZWlnaHQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkTWF0ZXJpYWxWYWx1ZShhcmdzOiB7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsO1xuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICAgIHRhcmdldFZhbHVlOiBudW1iZXJbXTtcbiAgICBkZWZhdWx0VmFsdWU/OiBudW1iZXIgfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5Db2xvcjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gYXJncy5tYXRlcmlhbDtcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBhcmdzLnByb3BlcnR5TmFtZTtcblxuICAgIGxldCB2YWx1ZSA9IChtYXRlcmlhbCBhcyBhbnkpW3Byb3BlcnR5TmFtZV07XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgLy8gcHJvcGVydHkgaGFzIG5vdCBiZWVuIGZvdW5kXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlID0gYXJncy5kZWZhdWx0VmFsdWUgfHwgdmFsdWU7XG5cbiAgICBsZXQgdHlwZTogQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlO1xuICAgIGxldCBkZWZhdWx0VmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuICAgIGxldCB0YXJnZXRWYWx1ZTogbnVtYmVyIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuQ29sb3I7XG4gICAgbGV0IGRlbHRhVmFsdWU6IG51bWJlciB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkNvbG9yO1xuXG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpLmlzVmVjdG9yMikge1xuICAgICAgdHlwZSA9IEJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1IyO1xuICAgICAgZGVmYXVsdFZhbHVlID0gKHZhbHVlIGFzIFRIUkVFLlZlY3RvcjIpLmNsb25lKCk7XG4gICAgICB0YXJnZXRWYWx1ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgYW55KS5pc1ZlY3RvcjMpIHtcbiAgICAgIHR5cGUgPSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMztcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5WZWN0b3IzKS5jbG9uZSgpO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheShhcmdzLnRhcmdldFZhbHVlKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNWZWN0b3I0KSB7XG4gICAgICB0eXBlID0gQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjQ7XG4gICAgICBkZWZhdWx0VmFsdWUgPSAodmFsdWUgYXMgVEhSRUUuVmVjdG9yNCkuY2xvbmUoKTtcblxuICAgICAgLy8gdmVjdG9yUHJvcGVydHkgYW5kIHRhcmdldFZhbHVlIGluZGV4IGlzIGRpZmZlcmVudCBmcm9tIGVhY2ggb3RoZXJcbiAgICAgIC8vIGV4cG9ydGVkIHZybSBieSBVbmlWUk0gZmlsZSBpc1xuICAgICAgLy9cbiAgICAgIC8vIHZlY3RvclByb3BlcnR5XG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVswXSwgdGFyZ2V0VmFsdWVbMV1cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzJdLCB0YXJnZXRWYWx1ZVszXVxuICAgICAgLy9cbiAgICAgIC8vIHRhcmdldFZhbHVlXG4gICAgICAvLyBvZmZzZXQgPSB0YXJnZXRWYWx1ZVsyXSwgdGFyZ2V0VmFsdWVbM11cbiAgICAgIC8vIHRpbGluZyA9IHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsxXVxuICAgICAgdGFyZ2V0VmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yNCgpLmZyb21BcnJheShbXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMl0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbM10sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMF0sXG4gICAgICAgIGFyZ3MudGFyZ2V0VmFsdWVbMV0sXG4gICAgICBdKTtcbiAgICAgIGRlbHRhVmFsdWUgPSB0YXJnZXRWYWx1ZS5jbG9uZSgpLnN1YihkZWZhdWx0VmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoKHZhbHVlIGFzIGFueSkuaXNDb2xvcikge1xuICAgICAgdHlwZSA9IEJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5DT0xPUjtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9ICh2YWx1ZSBhcyBUSFJFRS5Db2xvcikuY2xvbmUoKTtcbiAgICAgIHRhcmdldFZhbHVlID0gbmV3IFRIUkVFLkNvbG9yKCkuZnJvbUFycmF5KGFyZ3MudGFyZ2V0VmFsdWUpO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlLmNsb25lKCkuc3ViKGRlZmF1bHRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGUgPSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSO1xuICAgICAgZGVmYXVsdFZhbHVlID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgdGFyZ2V0VmFsdWUgPSBhcmdzLnRhcmdldFZhbHVlWzBdO1xuICAgICAgZGVsdGFWYWx1ZSA9IHRhcmdldFZhbHVlIC0gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLnB1c2goe1xuICAgICAgbWF0ZXJpYWwsXG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICB0YXJnZXRWYWx1ZSxcbiAgICAgIGRlbHRhVmFsdWUsXG4gICAgICB0eXBlLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHdlaWdodCB0byBldmVyeSBhc3NpZ25lZCBibGVuZCBzaGFwZXMuXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgdmlhIHtAbGluayBCbGVuZFNoYXBlTWFzdGVyI3VwZGF0ZX0uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlXZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgdyA9IHRoaXMuaXNCaW5hcnkgPyAodGhpcy53ZWlnaHQgPCAwLjUgPyAwLjAgOiAxLjApIDogdGhpcy53ZWlnaHQ7XG5cbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSArPSB3ICogYmluZC53ZWlnaHQ7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdGVyaWFsVmFsdWVzLmZvckVhY2goKG1hdGVyaWFsVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXTtcbiAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUT0RPOiB3ZSBzaG91bGQga2ljayB0aGlzIGF0IGBhZGRNYXRlcmlhbFZhbHVlYFxuXG4gICAgICBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuTlVNQkVSKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSArPSBkZWx0YVZhbHVlICogdztcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWx0YVZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWx0YVZhbHVlIGFzIFRIUkVFLlZlY3RvcjI7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmFkZChfdjIuY29weShkZWx0YVZhbHVlKS5tdWx0aXBseVNjYWxhcih3KSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5WZWN0b3IzO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5hZGQoX3YzLmNvcHkoZGVsdGFWYWx1ZSkubXVsdGlwbHlTY2FsYXIodykpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IEJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlbHRhVmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlbHRhVmFsdWUgYXMgVEhSRUUuVmVjdG9yNDtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF92NC5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVsdGFWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVsdGFWYWx1ZSBhcyBUSFJFRS5Db2xvcjtcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uYWRkKF9jb2xvci5jb3B5KGRlbHRhVmFsdWUpLm11bHRpcGx5U2NhbGFyKHcpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHByZXZpb3VzbHkgYXNzaWduZWQgYmxlbmQgc2hhcGVzLlxuICAgKi9cbiAgcHVibGljIGNsZWFyQXBwbGllZFdlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iaW5kcy5mb3JFYWNoKChiaW5kKSA9PiB7XG4gICAgICBiaW5kLm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XG4gICAgICAgIGlmICghbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gVE9ETzogd2Ugc2hvdWxkIGtpY2sgdGhpcyBhdCBgYWRkQmluZGBcbiAgICAgICAgbWVzaC5tb3JwaFRhcmdldEluZmx1ZW5jZXNbYmluZC5tb3JwaFRhcmdldEluZGV4XSA9IDAuMDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0ZXJpYWxWYWx1ZXMuZm9yRWFjaCgobWF0ZXJpYWxWYWx1ZSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdO1xuICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRPRE86IHdlIHNob3VsZCBraWNrIHRoaXMgYXQgYGFkZE1hdGVyaWFsVmFsdWVgXG5cbiAgICAgIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IEJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5OVU1CRVIpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuVkVDVE9SMikge1xuICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBtYXRlcmlhbFZhbHVlLmRlZmF1bHRWYWx1ZSBhcyBUSFJFRS5WZWN0b3IyO1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpW21hdGVyaWFsVmFsdWUucHJvcGVydHlOYW1lXS5jb3B5KGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsVmFsdWUudHlwZSA9PT0gQmxlbmRTaGFwZU1hdGVyaWFsVmFsdWVUeXBlLlZFQ1RPUjMpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuVmVjdG9yMztcbiAgICAgICAgKG1hdGVyaWFsVmFsdWUubWF0ZXJpYWwgYXMgYW55KVttYXRlcmlhbFZhbHVlLnByb3BlcnR5TmFtZV0uY29weShkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChtYXRlcmlhbFZhbHVlLnR5cGUgPT09IEJsZW5kU2hhcGVNYXRlcmlhbFZhbHVlVHlwZS5WRUNUT1I0KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IG1hdGVyaWFsVmFsdWUuZGVmYXVsdFZhbHVlIGFzIFRIUkVFLlZlY3RvcjQ7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWxWYWx1ZS50eXBlID09PSBCbGVuZFNoYXBlTWF0ZXJpYWxWYWx1ZVR5cGUuQ09MT1IpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gbWF0ZXJpYWxWYWx1ZS5kZWZhdWx0VmFsdWUgYXMgVEhSRUUuQ29sb3I7XG4gICAgICAgIChtYXRlcmlhbFZhbHVlLm1hdGVyaWFsIGFzIGFueSlbbWF0ZXJpYWxWYWx1ZS5wcm9wZXJ0eU5hbWVdLmNvcHkoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPT09ICdib29sZWFuJykge1xuICAgICAgICAobWF0ZXJpYWxWYWx1ZS5tYXRlcmlhbCBhcyBhbnkpLnNob3VsZEFwcGx5VW5pZm9ybXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCbGVuZFNoYXBlQ29udHJvbGxlciB9IGZyb20gJy4vQmxlbmRTaGFwZUNvbnRyb2xsZXInO1xuXG5leHBvcnQgY2xhc3MgQmxlbmRTaGFwZU1hc3RlciB7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHJlZ2lzdGVyZWQgYmxlbmQgc2hhcGUuXG4gICAqL1xuICBwcml2YXRlIF9ibGVuZFNoYXBlR3JvdXBzOiB7IFtuYW1lOiBzdHJpbmddOiBCbGVuZFNoYXBlQ29udHJvbGxlciB9ID0ge307XG5cbiAgLyoqXG4gICAqIEl0cyByZWdpc3RlcmVkIGJsZW5kIHNoYXBlIGdyb3Vwcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgYmxlbmRTaGFwZUdyb3VwcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYmxlbmRTaGFwZUdyb3VwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gcmVnaXN0ZXJlZCBibGVuZCBzaGFwZSBncm91cC5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgZ3JvdXBcbiAgICovXG4gIHB1YmxpYyBnZXRCbGVuZFNoYXBlR3JvdXAobmFtZTogc3RyaW5nKTogQmxlbmRTaGFwZUNvbnRyb2xsZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgYmxlbmQgc2hhcGUgZ3JvdXAuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIGdvcnVwXG4gICAqIEBwYXJhbSBjb250cm9sbGVyIEJsZW5kU2hhcGVDb250cm9sbGVyIHRoYXQgZGVzY3JpYmVzIHRoZSBibGVuZCBzaGFwZSBncm91cFxuICAgKi9cbiAgcHVibGljIHJlZ2lzdGVyQmxlbmRTaGFwZUdyb3VwKG5hbWU6IHN0cmluZywgY29udHJvbGxlcjogQmxlbmRTaGFwZUNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdID0gY29udHJvbGxlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZXZlcnkgcmVnaXN0ZXJlZCBibGVuZCBzaGFwZSBncm91cHMuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX2JsZW5kU2hhcGVHcm91cHMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xuICAgICAgY29udHJvbGxlci5jbGVhckFwcGxpZWRXZWlnaHQoKTtcbiAgICB9KTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuX2JsZW5kU2hhcGVHcm91cHMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLl9ibGVuZFNoYXBlR3JvdXBzW25hbWVdO1xuICAgICAgY29udHJvbGxlci5hcHBseVdlaWdodCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBCbGVuZFNoYXBlUHJlc2V0TmFtZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEJsZW5kU2hhcGVDb250cm9sbGVyIH0gZnJvbSAnLi9CbGVuZFNoYXBlQ29udHJvbGxlcic7XG5pbXBvcnQgeyBCbGVuZFNoYXBlTWFzdGVyIH0gZnJvbSAnLi9CbGVuZFNoYXBlTWFzdGVyJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudHMgdGhlIGBibGVuZFNoYXBlUHJveHlgIGZpZWxkIG9mIGEgVlJNLlxuICogVGhpcyBjbGFzcyBoYXMgc2V2ZXJhbCBtZXRob2RzIHRvIGNvbnRyb2wgZXhwcmVzc2lvbnMgb2YgeW91ciBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1CbGVuZFNoYXBlUHJveHkge1xuICBwdWJsaWMgc3RhdGljIGNyZWF0ZShcbiAgICBhbmltYXRpb25NaXhlcjogVEhSRUUuQW5pbWF0aW9uTWl4ZXIsXG4gICAgYmxlbmRTaGFwZU1hc3RlcjogQmxlbmRTaGFwZU1hc3RlcixcbiAgICBibGVuZFNoYXBlUHJlc2V0TWFwOiB7IFtwcmVzZXROYW1lIGluIEJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9LFxuICApOiBWUk1CbGVuZFNoYXBlUHJveHkge1xuICAgIGNvbnN0IGV4cHJlc3Npb25zOiB7IFtrZXk6IHN0cmluZ106IFRIUkVFLkFuaW1hdGlvbkFjdGlvbiB8IHVuZGVmaW5lZCB9ID0ge307XG4gICAgLy8gVlJN44Gu5ZCE5qiZ5rqW6KGo5oOF44KSY2xpcOOBq+OBl+OBpuOBiuOBj1xuICAgIE9iamVjdC5rZXlzKGJsZW5kU2hhcGVNYXN0ZXIuYmxlbmRTaGFwZUdyb3VwcykuZm9yRWFjaCgoZXhwcmVzc2lvbk5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBibGVuZFNoYXBlTWFzdGVyLmJsZW5kU2hhcGVHcm91cHNbZXhwcmVzc2lvbk5hbWVdITtcbiAgICAgIGNvbnN0IHRyYWNrczogVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFja1tdID0gW107XG5cbiAgICAgIGNvbnN0IHRyYWNrTmFtZSA9IGAke2NvbnRyb2xsZXIubmFtZX0ud2VpZ2h0YDtcbiAgICAgIGNvbnN0IHRpbWVzID0gWzAsIDFdO1xuICAgICAgLy8gd2VpZ2h0IOOBp+WItuW+oeOBmeOCi+OBruOBpyB2YWx1ZSDjga/luLjjgasgYDFgIOOBq+OBquOCi+OCiOOBhuOBq+OBmeOCi+OAglxuICAgICAgY29uc3QgdmFsdWVzID0gWzEsIDFdO1xuXG4gICAgICAvLyBtaXhlcuOBrndlaWdodOOBp+W9semfv+W6puOCkuWkieabtOOBmeOCi+OBruOBp+OAgTHjg5Xjg6zjg7zjg6Djga7jgb9cbiAgICAgIGNvbnN0IHRyYWNrID0gbmV3IFRIUkVFLk51bWJlcktleWZyYW1lVHJhY2sodHJhY2tOYW1lLCB0aW1lcywgdmFsdWVzKTtcbiAgICAgIHRyYWNrcy5wdXNoKHRyYWNrKTtcblxuICAgICAgY29uc3QgY2xpcCA9IG5ldyBUSFJFRS5BbmltYXRpb25DbGlwKGV4cHJlc3Npb25OYW1lLCAxLCB0cmFja3MpO1xuICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IGFuaW1hdGlvbk1peGVyLmNsaXBBY3Rpb24oY2xpcCk7XG4gICAgICBleHByZXNzaW9uLnNldEVmZmVjdGl2ZVdlaWdodCgxKS5zdG9wKCk7XG4gICAgICBleHByZXNzaW9uLmNsYW1wV2hlbkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIGV4cHJlc3Npb25zW2V4cHJlc3Npb25OYW1lXSA9IGV4cHJlc3Npb247XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBWUk1CbGVuZFNoYXBlUHJveHkoYmxlbmRTaGFwZU1hc3RlciwgYmxlbmRTaGFwZVByZXNldE1hcCwgZXhwcmVzc2lvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY2xhbXAodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCAxLjApLCAwLjApO1xuICB9XG5cbiAgcHVibGljIHJlYWRvbmx5IGV4cHJlc3Npb25zOiB7IFtrZXk6IHN0cmluZ106IFRIUkVFLkFuaW1hdGlvbkFjdGlvbiB8IHVuZGVmaW5lZCB9ID0ge307XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYmxlbmRTaGFwZU1hc3RlcjogQmxlbmRTaGFwZU1hc3RlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBfYmxlbmRTaGFwZVByZXNldE1hcDogeyBbcHJlc2V0TmFtZSBpbiBCbGVuZFNoYXBlUHJlc2V0TmFtZV0/OiBzdHJpbmcgfTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgYmxlbmRTaGFwZU1hc3RlcjogQmxlbmRTaGFwZU1hc3RlcixcbiAgICBibGVuZFNoYXBlUHJlc2V0TWFwOiB7IFtwcmVzZXROYW1lIGluIEJsZW5kU2hhcGVQcmVzZXROYW1lXT86IHN0cmluZyB9LFxuICAgIGV4cHJlc3Npb25zOiB7IFtrZXk6IHN0cmluZ106IFRIUkVFLkFuaW1hdGlvbkFjdGlvbiB8IHVuZGVmaW5lZCB9LFxuICApIHtcbiAgICB0aGlzLl9ibGVuZFNoYXBlTWFzdGVyID0gYmxlbmRTaGFwZU1hc3RlcjtcbiAgICB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwID0gYmxlbmRTaGFwZVByZXNldE1hcDtcbiAgICB0aGlzLmV4cHJlc3Npb25zID0gZXhwcmVzc2lvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0RXhwcmVzc2lvbihuYW1lOiBzdHJpbmcpOiBUSFJFRS5BbmltYXRpb25BY3Rpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmV4cHJlc3Npb25zW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0IHJldHVybnMgYSBjdXJyZW50IHdlaWdodCB2YWx1ZSBvZiBhIHNwZWNpZmllZCBibGVuZCBzaGFwZS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgeW91IHdhbnQgdG8gc2V0XG4gICAqIEByZXR1cm5zIFRoZSBjdXJyZW50IHdlaWdodCB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGJsZW5kIHNoYXBlXG4gICAqL1xuICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogQmxlbmRTaGFwZVByZXNldE5hbWUgfCBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldENvbnRyb2xsZXIobmFtZSk7XG4gICAgcmV0dXJuIGNvbnRyb2xsZXIgJiYgY29udHJvbGxlci53ZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgd2VpZ2h0IHZhbHVlIG9mIGEgc3BlY2lmaWVkIGJsZW5kIHNoYXBlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgeW91IGFsc28gY2FuIGFuaW1hdGUgdGhlIGJsZW5kIHNoYXBlIHZpYSBgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFja2AuXG4gICAqIFNlZSBhbiBleGFtcGxlIG9mIFtbZ2V0Q29udHJvbGxlcl1dIGZvciBtb3JlIGluZm8uXG4gICAqXG4gICAqIEBleGFtcGxlIFNldCBhIHdlaWdodCB2YWx1ZSB0byBhIHNwZWNpZmljIGJsZW5kIHNoYXBlXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogLy8gV2hlbiB5b3Ugd2FudCB0byBzcGVjaWZ5IGEgcHJlc2V0IGJsZW5kIHNoYXBlXG4gICAqIHZybS5ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoIFRIUkVFLkJsZW5kU2hhcGVQcmVzZXROYW1lLkEsIDAuODMgKTtcbiAgICpcbiAgICogLy8gV2hlbiB5b3Ugd2FudCB0byBzcGVjaWZ5IGEgY3VzdG9tIGJsZW5kIHNoYXBlXG4gICAqIHZybS5ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoICdUaGlua2luZycsIDEuMCApO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYmxlbmQgc2hhcGUgeW91IHdhbnQgdG8gc2V0XG4gICAqIEBwYXJhbSB2YWx1ZSBBIG5ldyB3ZWlnaHQgdmFsdWUgZm9yIHRoZSBzcGVjaWZpZWQgYmxlbmQgc2hhcGUsIHNob3VsZCBiZSBhIG51bWJlciBiZXR3ZWVuIGAwLjBgIGFuZCBgMS4wYFxuICAgKi9cbiAgcHVibGljIHNldFZhbHVlKG5hbWU6IEJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nLCB3ZWlnaHQ6IG51bWJlcikge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmdldENvbnRyb2xsZXIobmFtZSk7XG4gICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIud2VpZ2h0ID0gVlJNQmxlbmRTaGFwZVByb3h5LmNsYW1wKHdlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBldmVyeSBibGVuZCBzaGFwZXMgb2YgdGhlIFZSTS5cbiAgICogVXN1YWxseSB0aGlzIHdpbGwgYmUgY2FsbGVkIHZpYSBbW1ZSTS51cGRhdGVdXSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byBjYWxsIHRoaXMgbWFudWFsbHkuXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCkge1xuICAgIHRoaXMuX2JsZW5kU2hhcGVNYXN0ZXIudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogSXQgcmV0dXJucyBhIFtbQmxlbmRTaGFwZUNvbnRyb2xsZXJdXSBvZiBhIHNwZWNpZmllZCBibGVuZCBzaGFwZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gZ3JhYiB0aGUgY29udHJvbGxlciB3aGVuIHlvdSB3YW50IHRvIG1hbmlwdWxhdGUgaXRzIHdlaWdodCBtYW51YWxseSwgb3IgYW5pbWF0ZSB1c2luZyBgVEhSRUUuTnVtYmVyS2V5ZnJhbWVUcmFja2AuXG4gICAqXG4gICAqIEBleGFtcGxlIEhvdyB0byBhbmltYXRlIGJsZW5kIHNoYXBlcyB1c2luZyBrZXlmcmFtZXNcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBjb25zdCB0cmFjayA9IG5ldyBUSFJFRS5OdW1iZXJLZXlmcmFtZVRyYWNrKFxuICAgKiAgIHZybS5ibGVuZFNoYXBlUHJveHkuZ2V0Q29udHJvbGxlciggJ0JsaW5rJyApLm5hbWUgKyAnLndlaWdodCcsIC8vIG5hbWVcbiAgICogICBbIDAuMCwgMC41LCAxLjAgXSwgLy8gdGltZXNcbiAgICogICBbIDAuMCwgMS4wLCAwLjAgXSAvLyB2YWx1ZXNcbiAgICogKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGJsZW5kIHNoYXBlIHlvdSB3YW50IHRvIGdldFxuICAgKiBAcmV0dXJucyBUaGUgW1tCbGVuZFNoYXBlQ29udHJvbGxlcl1dIG9mIHRoZSBzcGVjaWZpZWQgYmxlbmQgc2hhcGVcbiAgICovXG4gIHB1YmxpYyBnZXRDb250cm9sbGVyKG5hbWU6IEJsZW5kU2hhcGVQcmVzZXROYW1lIHwgc3RyaW5nKTogQmxlbmRTaGFwZUNvbnRyb2xsZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFjdHVhbE5hbWUgPSB0aGlzLl9ibGVuZFNoYXBlUHJlc2V0TWFwW25hbWUgYXMgQmxlbmRTaGFwZVByZXNldE5hbWVdO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLl9ibGVuZFNoYXBlTWFzdGVyLmdldEJsZW5kU2hhcGVHcm91cChhY3R1YWxOYW1lIHx8IG5hbWUpO1xuICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgY29uc29sZS53YXJuKGBubyBibGVuZCBzaGFwZSBmb3VuZCBieSAke25hbWV9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1ZSTUJsZW5kU2hhcGVQcm94eSc7XG5leHBvcnQgKiBmcm9tICcuL0JsZW5kU2hhcGVDb250cm9sbGVyJztcbmV4cG9ydCAqIGZyb20gJy4vQmxlbmRTaGFwZU1hc3Rlcic7XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBnZXRXb3JsZFF1YXRlcm5pb25MaXRlIH0gZnJvbSAnLi4vdXRpbHMvbWF0aCc7XG5pbXBvcnQgeyBWUk0sIFZSTUJ1aWxkZXIgfSBmcm9tICcuLi9WUk0nO1xuaW1wb3J0IHsgVlJNUGFydHNCdWlsZGVyIH0gZnJvbSAnLi4vVlJNUGFydHNCdWlsZGVyJztcbmltcG9ydCB7IERlYnVnT3B0aW9uIH0gZnJvbSAnLi9EZWJ1Z09wdGlvbic7XG5pbXBvcnQgeyBWUk1QYXJ0c0J1aWxkZXJEZWJ1Z1Byb3h5IH0gZnJvbSAnLi9WUk1QYXJ0c0J1aWxkZXInO1xuXG5jb25zdCBfdjNCID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbmV4cG9ydCBjbGFzcyBWUk1CdWlsZGVyRGVidWcgZXh0ZW5kcyBWUk1CdWlsZGVyIHtcbiAgcHJpdmF0ZSBfb3B0aW9uPzogRGVidWdPcHRpb247XG5cbiAgcHVibGljIG9wdGlvbihvcHRpb246IERlYnVnT3B0aW9uKTogVlJNQnVpbGRlckRlYnVnIHtcbiAgICB0aGlzLl9vcHRpb24gPSBvcHRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYnVpbGQoZ2x0ZjogVEhSRUUuR0xURik6IFByb21pc2U8VlJNPiB7XG4gICAgY29uc3QgcGFydHNCdWlsZGVyID0gbmV3IFZSTVBhcnRzQnVpbGRlckRlYnVnUHJveHkodGhpcy5fcGFydHNCdWlsZGVyLCB0aGlzLl9vcHRpb24pO1xuICAgIGNvbnN0IHZybSA9IG5ldyBWUk1EZWJ1ZyhwYXJ0c0J1aWxkZXIsIHRoaXMuX29wdGlvbik7XG4gICAgY29uc3QgY29udmVydGVkR2x0ZiA9IGF3YWl0IHRoaXMuX21hdGVyaWFsQ29udmVydGVyLmNvbnZlcnRHTFRGTWF0ZXJpYWxzKGdsdGYpO1xuICAgIGF3YWl0IHZybS5sb2FkR0xURihjb252ZXJ0ZWRHbHRmKTtcbiAgICByZXR1cm4gdnJtO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWUk1EZWJ1ZyBleHRlbmRzIFZSTSB7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEJ1aWxkZXIoKTogVlJNQnVpbGRlckRlYnVnIHtcbiAgICByZXR1cm4gbmV3IFZSTUJ1aWxkZXJEZWJ1ZygpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tKGdsdGY6IFRIUkVFLkdMVEYpOiBQcm9taXNlPFZSTT4ge1xuICAgIHJldHVybiBuZXcgVlJNQnVpbGRlckRlYnVnKCkuYnVpbGQoZ2x0Zik7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IF9kZWJ1Z09wdGlvbjogRGVidWdPcHRpb247XG5cbiAgcHJpdmF0ZSBfZmFjZURpcmVjdGlvbkhlbHBlcj86IFRIUkVFLkFycm93SGVscGVyO1xuICBwcml2YXRlIF9sZWZ0RXllRGlyZWN0aW9uSGVscGVyPzogVEhSRUUuQXJyb3dIZWxwZXI7XG4gIHByaXZhdGUgX3JpZ2h0RXllRGlyZWN0aW9uSGVscGVyPzogVEhSRUUuQXJyb3dIZWxwZXI7XG5cbiAgY29uc3RydWN0b3IocGFydHNCdWlsZGVyPzogVlJNUGFydHNCdWlsZGVyLCBkZWJ1Z09wdGlvbj86IERlYnVnT3B0aW9uKSB7XG4gICAgc3VwZXIocGFydHNCdWlsZGVyKTtcblxuICAgIHRoaXMuX2RlYnVnT3B0aW9uID0gZGVidWdPcHRpb24gfHwge307XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZEdMVEYoZ2x0ZjogVEhSRUUuR0xURik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHN1cGVyLmxvYWRHTFRGKGdsdGYpO1xuXG4gICAgLy8gR2l6bW/jgpLlsZXplotcbiAgICBpZiAoIXRoaXMuX2RlYnVnT3B0aW9uLmRpc2FibGVCb3hIZWxwZXIpIHtcbiAgICAgIGdsdGYuc2NlbmUuYWRkKG5ldyBUSFJFRS5Cb3hIZWxwZXIoZ2x0Zi5zY2VuZSkpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fZGVidWdPcHRpb24uZGlzYWJsZVNrZWxldG9uSGVscGVyKSB7XG4gICAgICBnbHRmLnNjZW5lLmFkZChuZXcgVEhSRUUuU2tlbGV0b25IZWxwZXIoZ2x0Zi5zY2VuZSkpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fZGVidWdPcHRpb24uZGlzYWJsZUZhY2VEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIgPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSxcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksXG4gICAgICAgIDAuNSxcbiAgICAgICAgMHhmZjAwZmYsXG4gICAgICApO1xuICAgICAgZ2x0Zi5zY2VuZS5hZGQodGhpcy5fZmFjZURpcmVjdGlvbkhlbHBlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaHVtYW5Cb25lcyAmJiB0aGlzLmh1bWFuQm9uZXMubGVmdEV5ZSAmJiB0aGlzLmxvb2tBdCAmJiAhdGhpcy5fZGVidWdPcHRpb24uZGlzYWJsZUxlZnRFeWVEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuX2xlZnRFeWVEaXJlY3Rpb25IZWxwZXIgPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoXG4gICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIC0xKSxcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksXG4gICAgICAgIDAuMyxcbiAgICAgICAgMHhmZjAwZmYsXG4gICAgICAgIDAuMDUsXG4gICAgICApO1xuICAgICAgZ2x0Zi5zY2VuZS5hZGQodGhpcy5fbGVmdEV5ZURpcmVjdGlvbkhlbHBlcik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5odW1hbkJvbmVzICYmXG4gICAgICB0aGlzLmh1bWFuQm9uZXMucmlnaHRFeWUgJiZcbiAgICAgIHRoaXMubG9va0F0ICYmXG4gICAgICAhdGhpcy5fZGVidWdPcHRpb24uZGlzYWJsZVJpZ2h0RXllRGlyZWN0aW9uSGVscGVyXG4gICAgKSB7XG4gICAgICB0aGlzLl9yaWdodEV5ZURpcmVjdGlvbkhlbHBlciA9IG5ldyBUSFJFRS5BcnJvd0hlbHBlcihcbiAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTEpLFxuICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSxcbiAgICAgICAgMC4zLFxuICAgICAgICAweGZmMDBmZixcbiAgICAgICAgMC4wNSxcbiAgICAgICk7XG4gICAgICBnbHRmLnNjZW5lLmFkZCh0aGlzLl9yaWdodEV5ZURpcmVjdGlvbkhlbHBlcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKGRlbHRhKTtcbiAgICB0aGlzLnVwZGF0ZUdpem1vcygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVHaXptb3MoKSB7XG4gICAgaWYgKHRoaXMubG9va0F0ICYmIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIpIHtcbiAgICAgIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIucG9zaXRpb24uZnJvbUFycmF5KHRoaXMubG9va0F0LmdldEhlYWRQb3NpdGlvbigpKTtcbiAgICAgIHRoaXMuX2ZhY2VEaXJlY3Rpb25IZWxwZXIuc2V0RGlyZWN0aW9uKF92M0IuZnJvbUFycmF5KHRoaXMubG9va0F0LmdldEZhY2VEaXJlY3Rpb24oKSkpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuaHVtYW5Cb25lcyAmJlxuICAgICAgdGhpcy5odW1hbkJvbmVzLmxlZnRFeWUgJiZcbiAgICAgIHRoaXMubG9va0F0ICYmXG4gICAgICB0aGlzLmxvb2tBdC5sZWZ0RXllV29ybGRQb3NpdGlvbiAmJlxuICAgICAgdGhpcy5fbGVmdEV5ZURpcmVjdGlvbkhlbHBlclxuICAgICkge1xuICAgICAgY29uc3QgbGVmdEV5ZVdvcmxkUm90YXRpb24gPSBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuaHVtYW5Cb25lcy5sZWZ0RXllLCBfcXVhdEEpO1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gX3YzQi5zZXQoMCwgMCwgLTEpLmFwcGx5UXVhdGVybmlvbihsZWZ0RXllV29ybGRSb3RhdGlvbik7XG4gICAgICB0aGlzLl9sZWZ0RXllRGlyZWN0aW9uSGVscGVyLnBvc2l0aW9uLmNvcHkodGhpcy5sb29rQXQubGVmdEV5ZVdvcmxkUG9zaXRpb24pO1xuICAgICAgdGhpcy5fbGVmdEV5ZURpcmVjdGlvbkhlbHBlci5zZXREaXJlY3Rpb24oZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmh1bWFuQm9uZXMgJiZcbiAgICAgIHRoaXMuaHVtYW5Cb25lcy5yaWdodEV5ZSAmJlxuICAgICAgdGhpcy5sb29rQXQgJiZcbiAgICAgIHRoaXMubG9va0F0LnJpZ2h0RXllV29ybGRQb3NpdGlvbiAmJlxuICAgICAgdGhpcy5fcmlnaHRFeWVEaXJlY3Rpb25IZWxwZXJcbiAgICApIHtcbiAgICAgIGNvbnN0IHJpZ2h0RXllV29ybGRSb3RhdGlvbiA9IGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5odW1hbkJvbmVzLnJpZ2h0RXllLCBfcXVhdEEpO1xuICAgICAgY29uc3QgZGlyZWN0aW9uID0gX3YzQi5zZXQoMCwgMCwgLTEpLmFwcGx5UXVhdGVybmlvbihyaWdodEV5ZVdvcmxkUm90YXRpb24pO1xuICAgICAgdGhpcy5fcmlnaHRFeWVEaXJlY3Rpb25IZWxwZXIucG9zaXRpb24uY29weSh0aGlzLmxvb2tBdC5yaWdodEV5ZVdvcmxkUG9zaXRpb24pO1xuICAgICAgdGhpcy5fcmlnaHRFeWVEaXJlY3Rpb25IZWxwZXIuc2V0RGlyZWN0aW9uKGRpcmVjdGlvbik7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBWUk1CbGVuZFNoYXBlUHJveHkgfSBmcm9tICcuLi9ibGVuZHNoYXBlJztcbmltcG9ydCB7IFZSTUZpcnN0UGVyc29uIH0gZnJvbSAnLi4vZmlyc3RwZXJzb24nO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IFZSTUxvb2tBdEhlYWQgfSBmcm9tICcuLi9sb29rYXQnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCAqIGFzIFJhdyBmcm9tICcuLi90eXBlcy9WUk0nO1xuaW1wb3J0IHsgVlJNUGFydHNCdWlsZGVyIH0gZnJvbSAnLi4vVlJNUGFydHNCdWlsZGVyJztcbmltcG9ydCB7IERlYnVnT3B0aW9uIH0gZnJvbSAnLi9EZWJ1Z09wdGlvbic7XG5pbXBvcnQgeyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBWUk1QYXJ0c0J1aWxkZXJEZWJ1Z1Byb3h5IGV4dGVuZHMgVlJNUGFydHNCdWlsZGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSB0YXJnZXQ6IFZSTVBhcnRzQnVpbGRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBkZWJ1Z09wdGlvbj86IERlYnVnT3B0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldDogVlJNUGFydHNCdWlsZGVyLCBkZWJ1Z09wdGlvbj86IERlYnVnT3B0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLmRlYnVnT3B0aW9uID0gZGVidWdPcHRpb247XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZEh1bWFub2lkKGdsdGY6IFRIUkVFLkdMVEYpOiBQcm9taXNlPFZSTUh1bWFuQm9uZXMgfCBudWxsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMudGFyZ2V0LmxvYWRIdW1hbm9pZChnbHRmKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkRmlyc3RQZXJzb24oXG4gICAgZmlyc3RQZXJzb246IFJhdy5SYXdWcm1GaXJzdFBlcnNvbixcbiAgICBodW1hbkJvbmVzOiBWUk1IdW1hbkJvbmVzLFxuICAgIGdsdGY6IFRIUkVFLkdMVEYsXG4gICk6IFByb21pc2U8VlJNRmlyc3RQZXJzb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMudGFyZ2V0LmxvYWRGaXJzdFBlcnNvbihmaXJzdFBlcnNvbiwgaHVtYW5Cb25lcywgZ2x0Zik7XG4gIH1cblxuICBwdWJsaWMgbG9hZExvb2tBdChcbiAgICBmaXJzdFBlcnNvbjogUmF3LlJhd1ZybUZpcnN0UGVyc29uLFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGh1bWFuQm9keUJvbmVzOiBWUk1IdW1hbkJvbmVzLFxuICApOiBWUk1Mb29rQXRIZWFkIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQubG9hZExvb2tBdChmaXJzdFBlcnNvbiwgYmxlbmRTaGFwZVByb3h5LCBodW1hbkJvZHlCb25lcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZEJsZW5kU2hhcGVNYXN0ZXIoXG4gICAgYW5pbWF0aW9uTWl4ZXI6IFRIUkVFLkFuaW1hdGlvbk1peGVyLFxuICAgIGdsdGY6IFRIUkVFLkdMVEYsXG4gICk6IFByb21pc2U8VlJNQmxlbmRTaGFwZVByb3h5IHwgbnVsbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnRhcmdldC5sb2FkQmxlbmRTaGFwZU1hc3RlcihhbmltYXRpb25NaXhlciwgZ2x0Zik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZFNlY29uZGFyeShnbHRmOiBUSFJFRS5HTFRGKTogUHJvbWlzZTxWUk1TcHJpbmdCb25lTWFuYWdlcj4ge1xuICAgIGlmICh0aGlzLmRlYnVnT3B0aW9uICYmIHRoaXMuZGVidWdPcHRpb24uZGlzYWJsZVNwcmluZ0JvbmVIZWxwZXIpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnRhcmdldC5sb2FkU2Vjb25kYXJ5KGdsdGYpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVlJNU3ByaW5nQm9uZU1hbmFnZXJEZWJ1ZygpO1xuICAgIGF3YWl0IG1hbmFnZXIubG9hZEdMVEYoZ2x0Zik7XG4gICAgcmV0dXJuIG1hbmFnZXI7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdJWk1PX1JFTkRFUl9PUkRFUiwgVlJNU3ByaW5nQm9uZSB9IGZyb20gJy4uL3NwcmluZ2JvbmUnO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcblxuZXhwb3J0IGNsYXNzIFZSTVNwcmluZ0JvbmVEZWJ1ZyBleHRlbmRzIFZSTVNwcmluZ0JvbmUge1xuICBwcml2YXRlIF9naXptbz86IFRIUkVFLkFycm93SGVscGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJvbmU6IFRIUkVFLk9iamVjdDNELFxuICAgIHJhZGl1czogbnVtYmVyLFxuICAgIHN0aWZmaW5lc3M6IG51bWJlcixcbiAgICBncmF2aXR5RGlyOiBUSFJFRS5WZWN0b3IzLFxuICAgIGdyYXZpdHlQb3dlcjogbnVtYmVyLFxuICAgIGRyYWdGb3JjZTogbnVtYmVyLFxuICAgIGNvbGxpZGVyczogVEhSRUUuTWVzaFtdID0gW10sXG4gICkge1xuICAgIHN1cGVyKGJvbmUsIHJhZGl1cywgc3RpZmZpbmVzcywgZ3Jhdml0eURpciwgZ3Jhdml0eVBvd2VyLCBkcmFnRm9yY2UsIGNvbGxpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHNwcmluZyBib25lIGdpem1vLCBhcyBgVEhSRUUuQXJyb3dIZWxwZXJgLlxuICAgKiBVc2VmdWwgaW4gZGVidWdnaW5nIHNwcmluZyBib25lcy5cbiAgICovXG4gIHB1YmxpYyBnZXRHaXptbygpOiBUSFJFRS5BcnJvd0hlbHBlciB7XG4gICAgLy8gcmV0dXJuIGlmIGdpem1vIGlzIGFscmVhZHkgZXhpc3RlZFxuICAgIGlmICh0aGlzLl9naXptbykge1xuICAgICAgcmV0dXJuIHRoaXMuX2dpem1vO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmUgPSBfdjNBLmNvcHkodGhpcy5uZXh0VGFpbCkuc3ViKHRoaXMud29ybGRQb3NpdGlvbik7XG4gICAgY29uc3QgbmV4dFRhaWxSZWxhdGl2ZUxlbmd0aCA9IG5leHRUYWlsUmVsYXRpdmUubGVuZ3RoKCk7XG5cbiAgICB0aGlzLl9naXptbyA9IG5ldyBUSFJFRS5BcnJvd0hlbHBlcihcbiAgICAgIG5leHRUYWlsUmVsYXRpdmUubm9ybWFsaXplKCksXG4gICAgICB0aGlzLndvcmxkUG9zaXRpb24sXG4gICAgICBuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLFxuICAgICAgMHhmZmZmMDAsXG4gICAgICB0aGlzLnJhZGl1cyxcbiAgICAgIHRoaXMucmFkaXVzLFxuICAgICk7XG5cbiAgICAvLyBpdCBzaG91bGQgYmUgYWx3YXlzIHZpc2libGVcbiAgICB0aGlzLl9naXptby5saW5lLnJlbmRlck9yZGVyID0gR0laTU9fUkVOREVSX09SREVSO1xuICAgIHRoaXMuX2dpem1vLmNvbmUucmVuZGVyT3JkZXIgPSBHSVpNT19SRU5ERVJfT1JERVI7XG4gICAgKHRoaXMuX2dpem1vLmxpbmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoVGVzdCA9IGZhbHNlO1xuICAgICh0aGlzLl9naXptby5saW5lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS50cmFuc3BhcmVudCA9IHRydWU7XG4gICAgKHRoaXMuX2dpem1vLmNvbmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwpLmRlcHRoVGVzdCA9IGZhbHNlO1xuICAgICh0aGlzLl9naXptby5jb25lLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsKS50cmFuc3BhcmVudCA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpcy5fZ2l6bW87XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoZGVsdGEpO1xuICAgIC8vIGxhc3RseSB3ZSdyZSBnb25uYSB1cGRhdGUgZ2l6bW9cbiAgICB0aGlzLnVwZGF0ZUdpem1vKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUdpem1vKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZ2l6bW8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0VGFpbFJlbGF0aXZlID0gX3YzQS5jb3B5KHRoaXMuY3VycmVudFRhaWwpLnN1Yih0aGlzLndvcmxkUG9zaXRpb24pO1xuICAgIGNvbnN0IG5leHRUYWlsUmVsYXRpdmVMZW5ndGggPSBuZXh0VGFpbFJlbGF0aXZlLmxlbmd0aCgpO1xuXG4gICAgdGhpcy5fZ2l6bW8uc2V0RGlyZWN0aW9uKG5leHRUYWlsUmVsYXRpdmUubm9ybWFsaXplKCkpO1xuICAgIHRoaXMuX2dpem1vLnNldExlbmd0aChuZXh0VGFpbFJlbGF0aXZlTGVuZ3RoLCB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMpO1xuICAgIHRoaXMuX2dpem1vLnBvc2l0aW9uLmNvcHkodGhpcy53b3JsZFBvc2l0aW9uKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNU3ByaW5nQm9uZSwgVlJNU3ByaW5nQm9uZU1hbmFnZXIgfSBmcm9tICcuLi9zcHJpbmdib25lJztcbmltcG9ydCB7IFZSTVNwcmluZ0JvbmVEZWJ1ZyB9IGZyb20gJy4vVlJNU3ByaW5nQm9uZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lTWFuYWdlckRlYnVnIGV4dGVuZHMgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwcm90ZWN0ZWQgaXNDb2xpZGVyTWVzaFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlU3ByaW5nQm9uZShcbiAgICBnbHRmOiBUSFJFRS5HTFRGLFxuICAgIGJvbmU6IFRIUkVFLk9iamVjdDNELFxuICAgIGhpdFJhZGl1czogbnVtYmVyLFxuICAgIHN0aWZmaW5lc3M6IG51bWJlcixcbiAgICBncmF2aXR5RGlyOiBUSFJFRS5WZWN0b3IzLFxuICAgIGdyYXZpdHlQb3dlcjogbnVtYmVyLFxuICAgIGRyYWdGb3JjZTogbnVtYmVyLFxuICAgIGNvbGxpZGVyczogVEhSRUUuTWVzaFtdID0gW10sXG4gICk6IFZSTVNwcmluZ0JvbmUge1xuICAgIGNvbnN0IHNwcmluZ0JvbmUgPSBuZXcgVlJNU3ByaW5nQm9uZURlYnVnKFxuICAgICAgYm9uZSxcbiAgICAgIGhpdFJhZGl1cyxcbiAgICAgIHN0aWZmaW5lc3MsXG4gICAgICBncmF2aXR5RGlyLFxuICAgICAgZ3Jhdml0eVBvd2VyLFxuICAgICAgZHJhZ0ZvcmNlLFxuICAgICAgY29sbGlkZXJzLFxuICAgICk7XG4gICAgZ2x0Zi5zY2VuZS5hZGQoc3ByaW5nQm9uZS5nZXRHaXptbygpKTtcbiAgICByZXR1cm4gc3ByaW5nQm9uZTtcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9EZWJ1Z09wdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVBhcnRzQnVpbGRlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTSc7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVNYW5hZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZSc7XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGTWVzaCwgR0xURk5vZGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmVudW0gRmlyc3RQZXJzb25GbGFnIHtcbiAgQXV0byxcbiAgQm90aCxcbiAgVGhpcmRQZXJzb25Pbmx5LFxuICBGaXJzdFBlcnNvbk9ubHksXG59XG5cbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIFtgbWVzaEFubm90YXRpb25gXShodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvVW5pVlJNL2Jsb2IvbWFzdGVyL3NwZWNpZmljYXRpb24vMC4wL3NjaGVtYS92cm0uZmlyc3RwZXJzb24ubWVzaGFubm90YXRpb24uc2NoZW1hLmpzb24pIGVudHJ5LlxuICogRWFjaCBtZXNoIHdpbGwgYmUgYXNzaWduZWQgdG8gc3BlY2lmaWVkIGxheWVyIHdoZW4geW91IGNhbGwgW1tWUk1GaXJzdFBlcnNvbi5zZXR1cF1dLlxuICovXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJGaXJzdFBlcnNvbkZsYWdzIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VGaXJzdFBlcnNvbkZsYWcoZmlyc3RQZXJzb25GbGFnOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICBzd2l0Y2ggKGZpcnN0UGVyc29uRmxhZykge1xuICAgICAgY2FzZSAnQm90aCc6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuQm90aDtcbiAgICAgIGNhc2UgJ1RoaXJkUGVyc29uT25seSc6XG4gICAgICAgIHJldHVybiBGaXJzdFBlcnNvbkZsYWcuVGhpcmRQZXJzb25Pbmx5O1xuICAgICAgY2FzZSAnRmlyc3RQZXJzb25Pbmx5JzpcbiAgICAgICAgcmV0dXJuIEZpcnN0UGVyc29uRmxhZy5GaXJzdFBlcnNvbk9ubHk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRmlyc3RQZXJzb25GbGFnLkF1dG87XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgW1tGaXJzdFBlcnNvbkZsYWddXSBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeS5cbiAgICovXG4gIHB1YmxpYyBmaXJzdFBlcnNvbkZsYWc6IEZpcnN0UGVyc29uRmxhZztcblxuICAvKipcbiAgICogQSBtZXNoIG9mIHRoZSBhbm5vdGF0aW9uIGVudHJ5LlxuICAgKi9cbiAgcHVibGljIG1lc2g6IEdMVEZNZXNoO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbWVzaCBhbm5vdGF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZmlyc3RQZXJzb25GbGFnIEEgW1tGaXJzdFBlcnNvbkZsYWddXSBvZiB0aGUgYW5ub3RhdGlvbiBlbnRyeVxuICAgKiBAcGFyYW0gbm9kZSBBIG5vZGUgb2YgdGhlIGFubm90YXRpb24gZW50cnkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihmaXJzdFBlcnNvbkZsYWc6IHN0cmluZyB8IHVuZGVmaW5lZCwgbWVzaDogR0xURk1lc2gpIHtcbiAgICB0aGlzLmZpcnN0UGVyc29uRmxhZyA9IFJlbmRlcmVyRmlyc3RQZXJzb25GbGFncy5wYXJzZUZpcnN0UGVyc29uRmxhZyhmaXJzdFBlcnNvbkZsYWcpO1xuICAgIHRoaXMubWVzaCA9IG1lc2g7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZSTUZpcnN0UGVyc29uIHtcbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjYW1lcmEgbGF5ZXIgZm9yIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKlxuICAgKiBAc2VlIFtbZ2V0Rmlyc3RQZXJzb25Pbmx5TGF5ZXJdXVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9GSVJTVFBFUlNPTl9PTkxZX0xBWUVSID0gOTtcblxuICAvKipcbiAgICogQSBkZWZhdWx0IGNhbWVyYSBsYXllciBmb3IgYFRoaXJkUGVyc29uT25seWAgbGF5ZXIuXG4gICAqXG4gICAqIEBzZWUgW1tnZXRUaGlyZFBlcnNvbk9ubHlMYXllcl1dXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIgPSAxMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9maXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlO1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNoQW5ub3RhdGlvbnM6IFJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpcnN0UGVyc29uQm9uZU9mZnNldDogVEhSRUUuVmVjdG9yMztcblxuICBwcml2YXRlIF9maXJzdFBlcnNvbk9ubHlMYXllciA9IFZSTUZpcnN0UGVyc29uLkRFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUjtcbiAgcHJpdmF0ZSBfdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVI7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZSTUZpcnN0UGVyc29uIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGZpcnN0UGVyc29uQm9uZSBBIGZpcnN0IHBlcnNvbiBib25lXG4gICAqIEBwYXJhbSBmaXJzdFBlcnNvbkJvbmVPZmZzZXQgQW4gb2Zmc2V0IGZyb20gdGhlIHNwZWNpZmllZCBmaXJzdCBwZXJzb24gYm9uZVxuICAgKiBAcGFyYW0gbWVzaEFubm90YXRpb25zIEEgcmVuZGVyZXIgc2V0dGluZ3MuIFNlZSB0aGUgZGVzY3JpcHRpb24gb2YgW1tSZW5kZXJlckZpcnN0UGVyc29uRmxhZ3NdXSBmb3IgbW9yZSBpbmZvXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBmaXJzdFBlcnNvbkJvbmU6IEdMVEZOb2RlLFxuICAgIGZpcnN0UGVyc29uQm9uZU9mZnNldDogVEhSRUUuVmVjdG9yMyxcbiAgICBtZXNoQW5ub3RhdGlvbnM6IFJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdLFxuICApIHtcbiAgICB0aGlzLl9maXJzdFBlcnNvbkJvbmUgPSBmaXJzdFBlcnNvbkJvbmU7XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Cb25lT2Zmc2V0ID0gZmlyc3RQZXJzb25Cb25lT2Zmc2V0O1xuICAgIHRoaXMuX21lc2hBbm5vdGF0aW9ucyA9IG1lc2hBbm5vdGF0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaXJzdFBlcnNvbkJvbmUoKTogR0xURk5vZGUge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbkJvbmU7XG4gIH1cblxuICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25Cb25lT2Zmc2V0KCk6IFRIUkVFLlZlY3RvcjMge1xuICAgIHJldHVybiB0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVzaEFubm90YXRpb25zKCk6IFJlbmRlcmVyRmlyc3RQZXJzb25GbGFnc1tdIHtcbiAgICByZXR1cm4gdGhpcy5fbWVzaEFubm90YXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbWV0aG9kLCBpdCBhc3NpZ25zIGxheWVycyBmb3IgZXZlcnkgbWVzaGVzIGJhc2VkIG9uIG1lc2ggYW5ub3RhdGlvbnMuXG4gICAqIFlvdSBtdXN0IGNhbGwgdGhpcyBtZXRob2QgZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gZXF1aXZhbGVudCBvZiBbVlJNRmlyc3RQZXJzb24uU2V0dXBdKGh0dHBzOi8vZ2l0aHViLmNvbS92cm0tYy9VbmlWUk0vYmxvYi9tYXN0ZXIvQXNzZXRzL1ZSTS9VbmlWUk0vU2NyaXB0cy9GaXJzdFBlcnNvbi9WUk1GaXJzdFBlcnNvbi5jcykgb2YgdGhlIFVuaVZSTS5cbiAgICpcbiAgICogVGhlIGBjYW1lcmFMYXllcmAgcGFyYW1ldGVyIHNwZWNpZmllcyB3aGljaCBsYXllciB3aWxsIGJlIGFzc2lnbmVkIGZvciBgRmlyc3RQZXJzb25Pbmx5YCAvIGBUaGlyZFBlcnNvbk9ubHlgLlxuICAgKiBJbiBVbmlWUk0sIHdlIHNwZWNpZmllZCB0aG9zZSBieSBuYW1pbmcgZWFjaCBkZXNpcmVkIGxheWVyIGFzIGBGSVJTVFBFUlNPTl9PTkxZX0xBWUVSYCAvIGBUSElSRFBFUlNPTl9PTkxZX0xBWUVSYFxuICAgKiBidXQgd2UgYXJlIGdvaW5nIHRvIHNwZWNpZnkgdGhlc2UgbGF5ZXJzIGF0IGhlcmUgc2luY2Ugd2UgYXJlIHVuYWJsZSB0byBuYW1lIGxheWVycyBpbiBUaHJlZS5qcy5cbiAgICpcbiAgICogQHBhcmFtIGNhbWVyYUxheWVyIFNwZWNpZnkgd2hpY2ggbGF5ZXIgd2lsbCBiZSBmb3IgYEZpcnN0UGVyc29uT25seWAgLyBgVGhpcmRQZXJzb25Pbmx5YC5cbiAgICovXG4gIHB1YmxpYyBzZXR1cCh7XG4gICAgZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX0ZJUlNUUEVSU09OX09OTFlfTEFZRVIsXG4gICAgdGhpcmRQZXJzb25Pbmx5TGF5ZXIgPSBWUk1GaXJzdFBlcnNvbi5ERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVIsXG4gIH0gPSB7fSkge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIgPSBmaXJzdFBlcnNvbk9ubHlMYXllcjtcbiAgICB0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllciA9IHRoaXJkUGVyc29uT25seUxheWVyO1xuXG4gICAgdGhpcy5fbWVzaEFubm90YXRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmZpcnN0UGVyc29uRmxhZyA9PT0gRmlyc3RQZXJzb25GbGFnLkZpcnN0UGVyc29uT25seSkge1xuICAgICAgICBpdGVtLm1lc2gubGF5ZXJzLnNldCh0aGlzLl9maXJzdFBlcnNvbk9ubHlMYXllcik7XG4gICAgICAgIGl0ZW0ubWVzaC50cmF2ZXJzZSgoY2hpbGQpID0+IGNoaWxkLmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5maXJzdFBlcnNvbkZsYWcgPT09IEZpcnN0UGVyc29uRmxhZy5UaGlyZFBlcnNvbk9ubHkpIHtcbiAgICAgICAgaXRlbS5tZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBpdGVtLm1lc2gudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uZmlyc3RQZXJzb25GbGFnID09PSBGaXJzdFBlcnNvbkZsYWcuQXV0bykge1xuICAgICAgICB0aGlzLmNyZWF0ZUhlYWRsZXNzTW9kZWwoaXRlbS5tZXNoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGNhbWVyYSBsYXllciByZXByZXNlbnRzIGBGaXJzdFBlcnNvbk9ubHlgIGxheWVyLlxuICAgKiBOb3RlIHRoYXQgKip5b3UgbXVzdCBjYWxsIFtbc2V0dXBdXSBmaXJzdCBiZWZvcmUgeW91IHVzZSB0aGUgbGF5ZXIgZmVhdHVyZSoqIG9yIGl0IGRvZXMgbm90IHdvcmsgcHJvcGVybHkuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyBbW0RFRkFVTFRfRklSU1RQRVJTT05fT05MWV9MQVlFUl1dIGJ5IGRlZmF1bHQgYnV0IHlvdSBjYW4gY2hhbmdlIHRoZSBsYXllciBieSBzcGVjaWZ5aW5nIHZpYSBbW3NldHVwXV0gaWYgeW91IHByZWZlci5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3ZybS5kZXYvZW4vdW5pdnJtL2FwaS91bml2cm1fdXNlX2ZpcnN0cGVyc29uL1xuICAgKiBAc2VlIGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL2NvcmUvTGF5ZXJzXG4gICAqL1xuICBwdWJsaWMgZ2V0Rmlyc3RQZXJzb25Pbmx5TGF5ZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICogQSBjYW1lcmEgbGF5ZXIgcmVwcmVzZW50cyBgVGhpcmRQZXJzb25Pbmx5YCBsYXllci5cbiAgICogTm90ZSB0aGF0ICoqeW91IG11c3QgY2FsbCBbW3NldHVwXV0gZmlyc3QgYmVmb3JlIHlvdSB1c2UgdGhlIGxheWVyIGZlYXR1cmUqKiBvciBpdCBkb2VzIG5vdCB3b3JrIHByb3Blcmx5LlxuICAgKlxuICAgKiBUaGUgdmFsdWUgaXMgW1tERUZBVUxUX1RISVJEUEVSU09OX09OTFlfTEFZRVJdXSBieSBkZWZhdWx0IGJ1dCB5b3UgY2FuIGNoYW5nZSB0aGUgbGF5ZXIgYnkgc3BlY2lmeWluZyB2aWEgW1tzZXR1cF1dIGlmIHlvdSBwcmVmZXIuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly92cm0uZGV2L2VuL3VuaXZybS9hcGkvdW5pdnJtX3VzZV9maXJzdHBlcnNvbi9cbiAgICogQHNlZSBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9jb3JlL0xheWVyc1xuICAgKi9cbiAgcHVibGljIGdldFRoaXJkUGVyc29uT25seUxheWVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwZXJzb24uXG4gICAqIFRoZSBwb3NpdGlvbiB0YWtlcyBbW0ZpcnN0UGVyc29uQm9uZV1dIGFuZCBbW0ZpcnN0UGVyc29uT2Zmc2V0XV0gaW50byBhY2NvdW50LlxuICAgKlxuICAgKiBAcGFyYW0gdjMgdGFyZ2V0XG4gICAqIEByZXR1cm5zIEN1cnJlbnQgd29ybGQgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHBlcnNvblxuICAgKi9cbiAgcHVibGljIGdldEZpcnN0UGVyc29uV29ybGRQb3NpdGlvbih2MzogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICAgIC8vIFVuaVZSTSNWUk1GaXJzdFBlcnNvbkVkaXRvclxuICAgIC8vIHZhciB3b3JsZE9mZnNldCA9IGhlYWQubG9jYWxUb1dvcmxkTWF0cml4Lk11bHRpcGx5UG9pbnQoY29tcG9uZW50LkZpcnN0UGVyc29uT2Zmc2V0KTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLl9maXJzdFBlcnNvbkJvbmVPZmZzZXQ7XG4gICAgY29uc3QgdjQgPSBuZXcgVEhSRUUuVmVjdG9yNChvZmZzZXQueCwgb2Zmc2V0LnksIG9mZnNldC56LCAxLjApO1xuICAgIHY0LmFwcGx5TWF0cml4NCh0aGlzLl9maXJzdFBlcnNvbkJvbmUubWF0cml4V29ybGQpO1xuICAgIHJldHVybiB2My5zZXQodjQueCwgdjQueSwgdjQueik7XG4gIH1cblxuICBwcml2YXRlIGV4Y2x1ZGVUcmlhbmdsZXModHJpYW5nbGVzOiBudW1iZXJbXSwgYndzOiBudW1iZXJbXVtdLCBza2luSW5kZXg6IG51bWJlcltdW10sIGV4Y2x1ZGU6IG51bWJlcltdKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBpZiAoYndzICE9IG51bGwgJiYgYndzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJpYW5nbGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIGNvbnN0IGEgPSB0cmlhbmdsZXNbaV07XG4gICAgICAgIGNvbnN0IGIgPSB0cmlhbmdsZXNbaSArIDFdO1xuICAgICAgICBjb25zdCBjID0gdHJpYW5nbGVzW2kgKyAyXTtcbiAgICAgICAgY29uc3QgYncwID0gYndzW2FdO1xuICAgICAgICBjb25zdCBza2luMCA9IHNraW5JbmRleFthXTtcblxuICAgICAgICBpZiAoYncwWzBdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzBdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzBbMV0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjBbMV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MFsyXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMFsyXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncwWzNdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4wWzNdKSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgYncxID0gYndzW2JdO1xuICAgICAgICBjb25zdCBza2luMSA9IHNraW5JbmRleFtiXTtcbiAgICAgICAgaWYgKGJ3MVswXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVswXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncxWzFdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4xWzFdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzFbMl0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjFbMl0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MVszXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMVszXSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IGJ3MiA9IGJ3c1tjXTtcbiAgICAgICAgY29uc3Qgc2tpbjIgPSBza2luSW5kZXhbY107XG4gICAgICAgIGlmIChidzJbMF0gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbMF0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGJ3MlsxXSA+IDAgJiYgZXhjbHVkZS5pbmNsdWRlcyhza2luMlsxXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoYncyWzJdID4gMCAmJiBleGNsdWRlLmluY2x1ZGVzKHNraW4yWzJdKSkgY29udGludWU7XG4gICAgICAgIGlmIChidzJbM10gPiAwICYmIGV4Y2x1ZGUuaW5jbHVkZXMoc2tpbjJbM10pKSBjb250aW51ZTtcblxuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBhO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBiO1xuICAgICAgICB0cmlhbmdsZXNbY291bnQrK10gPSBjO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVyYXNlZE1lc2goc3JjOiBUSFJFRS5Ta2lubmVkTWVzaCwgZXJhc2luZ0JvbmVzSW5kZXg6IG51bWJlcltdKTogVEhSRUUuU2tpbm5lZE1lc2gge1xuICAgIGNvbnN0IGRzdCA9IG5ldyBUSFJFRS5Ta2lubmVkTWVzaChzcmMuZ2VvbWV0cnkuY2xvbmUoKSwgc3JjLm1hdGVyaWFsKTtcbiAgICBkc3QubmFtZSA9IGAke3NyYy5uYW1lfShlcmFzZSlgO1xuICAgIGRzdC5mcnVzdHVtQ3VsbGVkID0gc3JjLmZydXN0dW1DdWxsZWQ7XG4gICAgZHN0LmxheWVycy5zZXQodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBkc3QuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgY29uc3Qgc2tpbkluZGV4QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbkluZGV4JykuYXJyYXk7XG4gICAgY29uc3Qgc2tpbkluZGV4ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luSW5kZXhBdHRyLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luSW5kZXgucHVzaChbc2tpbkluZGV4QXR0cltpXSwgc2tpbkluZGV4QXR0cltpICsgMV0sIHNraW5JbmRleEF0dHJbaSArIDJdLCBza2luSW5kZXhBdHRyW2kgKyAzXV0pO1xuICAgIH1cbiAgICBjb25zdCBza2luV2VpZ2h0QXR0ciA9IGdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnc2tpbldlaWdodCcpLmFycmF5O1xuICAgIGNvbnN0IHNraW5XZWlnaHQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5XZWlnaHRBdHRyLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICBza2luV2VpZ2h0LnB1c2goW3NraW5XZWlnaHRBdHRyW2ldLCBza2luV2VpZ2h0QXR0cltpICsgMV0sIHNraW5XZWlnaHRBdHRyW2kgKyAyXSwgc2tpbldlaWdodEF0dHJbaSArIDNdXSk7XG4gICAgfVxuICAgIGNvbnN0IG9sZFRyaWFuZ2xlcyA9IEFycmF5LmZyb20oZ2VvbWV0cnkuZ2V0SW5kZXgoKS5hcnJheSk7XG4gICAgY29uc3QgY291bnQgPSB0aGlzLmV4Y2x1ZGVUcmlhbmdsZXMob2xkVHJpYW5nbGVzLCBza2luV2VpZ2h0LCBza2luSW5kZXgsIGVyYXNpbmdCb25lc0luZGV4KTtcbiAgICBjb25zdCBuZXdUcmlhbmdsZTogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIG5ld1RyaWFuZ2xlW2ldID0gb2xkVHJpYW5nbGVzW2ldO1xuICAgIH1cbiAgICBnZW9tZXRyeS5zZXRJbmRleChuZXdUcmlhbmdsZSk7XG5cbiAgICAvLyBtdG9vbiBtYXRlcmlhbCBpbmNsdWRlcyBvbkJlZm9yZVJlbmRlci4gdGhpcyBpcyB1bnN1cHBvcnRlZCBhdCBTa2lubmVkTWVzaCNjbG9uZVxuICAgIGlmIChzcmMub25CZWZvcmVSZW5kZXIpIHtcbiAgICAgIGRzdC5vbkJlZm9yZVJlbmRlciA9IHNyYy5vbkJlZm9yZVJlbmRlcjtcbiAgICB9XG4gICAgZHN0LmJpbmQobmV3IFRIUkVFLlNrZWxldG9uKHNyYy5za2VsZXRvbi5ib25lcywgc3JjLnNrZWxldG9uLmJvbmVJbnZlcnNlcyksIG5ldyBUSFJFRS5NYXRyaXg0KCkpO1xuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQ6IFRIUkVFLk9iamVjdDNELCBtZXNoOiBUSFJFRS5Ta2lubmVkTWVzaCkge1xuICAgIGNvbnN0IGVyYXNlQm9uZUluZGV4ZXM6IG51bWJlcltdID0gW107XG4gICAgbWVzaC5za2VsZXRvbi5ib25lcy5mb3JFYWNoKChib25lLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNFcmFzZVRhcmdldChib25lKSkgZXJhc2VCb25lSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8vIFVubGlrZSBVbmlWUk0gd2UgZG9uJ3QgY29weSBtZXNoIGlmIG5vIGludmlzaWJsZSBib25lIHdhcyBmb3VuZFxuICAgIGlmICghZXJhc2VCb25lSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgIG1lc2gubGF5ZXJzLmVuYWJsZSh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBtZXNoLmxheWVycy5lbmFibGUodGhpcy5fZmlyc3RQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtZXNoLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgIGNvbnN0IG5ld01lc2ggPSB0aGlzLmNyZWF0ZUVyYXNlZE1lc2gobWVzaCwgZXJhc2VCb25lSW5kZXhlcyk7XG4gICAgcGFyZW50LmFkZChuZXdNZXNoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSGVhZGxlc3NNb2RlbChub2RlOiBHTFRGTm9kZSkge1xuICAgIGlmIChub2RlLnR5cGUgPT09ICdHcm91cCcpIHtcbiAgICAgIG5vZGUubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcik7XG4gICAgICBpZiAodGhpcy5pc0VyYXNlVGFyZ2V0KG5vZGUpKSB7XG4gICAgICAgIG5vZGUudHJhdmVyc2UoKGNoaWxkKSA9PiBjaGlsZC5sYXllcnMuc2V0KHRoaXMuX3RoaXJkUGVyc29uT25seUxheWVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgcGFyZW50Lm5hbWUgPSBgX2hlYWRsZXNzXyR7bm9kZS5uYW1lfWA7XG4gICAgICAgIHBhcmVudC5sYXllcnMuc2V0KHRoaXMuX2ZpcnN0UGVyc29uT25seUxheWVyKTtcbiAgICAgICAgbm9kZS5wYXJlbnQhLmFkZChwYXJlbnQpO1xuICAgICAgICBub2RlLmNoaWxkcmVuXG4gICAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLnR5cGUgPT09ICdTa2lubmVkTWVzaCcpXG4gICAgICAgICAgLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUhlYWRsZXNzTW9kZWxGb3JTa2lubmVkTWVzaChwYXJlbnQsIGNoaWxkIGFzIFRIUkVFLlNraW5uZWRNZXNoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ1NraW5uZWRNZXNoJykge1xuICAgICAgdGhpcy5jcmVhdGVIZWFkbGVzc01vZGVsRm9yU2tpbm5lZE1lc2gobm9kZS5wYXJlbnQhLCBub2RlIGFzIFRIUkVFLlNraW5uZWRNZXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaXNFcmFzZVRhcmdldChub2RlKSkge1xuICAgICAgICBub2RlLmxheWVycy5zZXQodGhpcy5fdGhpcmRQZXJzb25Pbmx5TGF5ZXIpO1xuICAgICAgICBub2RlLnRyYXZlcnNlKChjaGlsZCkgPT4gY2hpbGQubGF5ZXJzLnNldCh0aGlzLl90aGlyZFBlcnNvbk9ubHlMYXllcikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNFcmFzZVRhcmdldChib25lOiBHTFRGTm9kZSk6IGJvb2xlYW4ge1xuICAgIGlmIChib25lLm5hbWUgPT09IHRoaXMuX2ZpcnN0UGVyc29uQm9uZS5uYW1lKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFib25lLnBhcmVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0VyYXNlVGFyZ2V0KGJvbmUucGFyZW50ISk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1ZSTUZpcnN0UGVyc29uJztcbiIsImltcG9ydCB7IEdMVEZOb2RlLCBIdW1hbkJvbmUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIHRoZSBgaHVtYW5vaWQuaHVtYW5Cb25lc2AgYXJyYXkgb2YgYSBWUk0uXG4gKiBUaGlzIGlzIHNpbXBseSBhIGxpc3Qgb2YgYm9uZXMgb2YgeW91ciBWUk0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1IdW1hbkJvbmVzIHtcbiAgcHVibGljIFtIdW1hbkJvbmUuSGlwc106IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0VXBwZXJMZWddOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuUmlnaHRVcHBlckxlZ106IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0TG93ZXJMZWddOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuUmlnaHRMb3dlckxlZ106IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0Rm9vdF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodEZvb3RdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuU3BpbmVdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuQ2hlc3RdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTmVja106IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5IZWFkXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRTaG91bGRlcl06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodFNob3VsZGVyXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRVcHBlckFybV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodFVwcGVyQXJtXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRMb3dlckFybV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodExvd2VyQXJtXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRIYW5kXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0SGFuZF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0VG9lc106IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodFRvZXNdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTGVmdEV5ZV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodEV5ZV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5KYXddOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTGVmdFRodW1iUHJveGltYWxdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTGVmdFRodW1iSW50ZXJtZWRpYXRlXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRUaHVtYkRpc3RhbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0SW5kZXhQcm94aW1hbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0SW5kZXhJbnRlcm1lZGlhdGVdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTGVmdEluZGV4RGlzdGFsXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRNaWRkbGVQcm94aW1hbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0TWlkZGxlSW50ZXJtZWRpYXRlXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLkxlZnRNaWRkbGVEaXN0YWxdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTGVmdFJpbmdQcm94aW1hbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0UmluZ0ludGVybWVkaWF0ZV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0UmluZ0Rpc3RhbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0TGl0dGxlUHJveGltYWxdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuTGVmdExpdHRsZUludGVybWVkaWF0ZV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5MZWZ0TGl0dGxlRGlzdGFsXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0VGh1bWJQcm94aW1hbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodFRodW1iSW50ZXJtZWRpYXRlXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0VGh1bWJEaXN0YWxdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuUmlnaHRJbmRleFByb3hpbWFsXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0SW5kZXhJbnRlcm1lZGlhdGVdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuUmlnaHRJbmRleERpc3RhbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodE1pZGRsZVByb3hpbWFsXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0TWlkZGxlRGlzdGFsXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0UmluZ1Byb3hpbWFsXTogR0xURk5vZGU7XG4gIHB1YmxpYyBbSHVtYW5Cb25lLlJpZ2h0UmluZ0ludGVybWVkaWF0ZV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodFJpbmdEaXN0YWxdOiBHTFRGTm9kZTtcbiAgcHVibGljIFtIdW1hbkJvbmUuUmlnaHRMaXR0bGVQcm94aW1hbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodExpdHRsZUludGVybWVkaWF0ZV06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5SaWdodExpdHRsZURpc3RhbF06IEdMVEZOb2RlO1xuICBwdWJsaWMgW0h1bWFuQm9uZS5VcHBlckNoZXN0XTogR0xURk5vZGU7XG5cbiAgW25hbWU6IHN0cmluZ106IEdMVEZOb2RlIHwgdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1IdW1hbkJvbmVzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vVlJNJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNUGFydHNCdWlsZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vYmxlbmRzaGFwZSc7XG5leHBvcnQgKiBmcm9tICcuL2RlYnVnJztcbmV4cG9ydCAqIGZyb20gJy4vZmlyc3RwZXJzb24nO1xuZXhwb3J0ICogZnJvbSAnLi9odW1hbm9pZCc7XG5leHBvcnQgKiBmcm9tICcuL2xvb2thdCc7XG5leHBvcnQgKiBmcm9tICcuL3NwcmluZ2JvbmUnO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL21hdGVyaWFsJztcbiIsImltcG9ydCB7IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwIH0gZnJvbSAnLi4vdHlwZXMvVlJNJztcblxuZXhwb3J0IGNvbnN0IERFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLjA7XG5cbmNvbnN0IGhlcm1pdGVTcGxpbmUgPSAoeTA6IG51bWJlciwgeTE6IG51bWJlciwgdDA6IG51bWJlciwgdDE6IG51bWJlciwgeDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgeGMgPSB4ICogeCAqIHg7XG4gIGNvbnN0IHhzID0geCAqIHg7XG4gIGNvbnN0IGR5ID0geTEgLSB5MDtcbiAgY29uc3QgaDAxID0gLTIuMCAqIHhjICsgMy4wICogeHM7XG4gIGNvbnN0IGgxMCA9IHhjIC0gMi4wICogeHMgKyB4O1xuICBjb25zdCBoMTEgPSB4YyAtIHhzO1xuICByZXR1cm4geTAgKyBkeSAqIGgwMSArIHQwICogaDEwICsgdDEgKiBoMTE7XG59O1xuXG5jb25zdCBldmFsdWF0ZUN1cnZlID0gKGFycjogbnVtYmVyW10sIHg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIC8vIC0tIHNhbml0eSBjaGVjayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBpZiAoYXJyLmxlbmd0aCA8IDgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2YWx1YXRlQ3VydmU6IEludmFsaWQgY3VydmUgZGV0ZWN0ZWQhIChBcnJheSBsZW5ndGggbXVzdCBiZSA4IGF0IGxlYXN0KScpO1xuICB9XG4gIGlmIChhcnIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZXZhbHVhdGVDdXJ2ZTogSW52YWxpZCBjdXJ2ZSBkZXRlY3RlZCEgKEFycmF5IGxlbmd0aCBtdXN0IGJlIG11bHRpcGxlcyBvZiA0Jyk7XG4gIH1cblxuICAvLyAtLSBjaGVjayByYW5nZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgbGV0IG91dE5vZGUgPSAwO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmIChhcnIubGVuZ3RoIDw9IDQgKiBvdXROb2RlKSB7XG4gICAgICByZXR1cm4gYXJyWzQgKiBvdXROb2RlIC0gM107IC8vIHRvbyBmdXJ0aGVyISEgYXNzdW1lIGFzIFwiQ2xhbXBcIlxuICAgIH0gZWxzZSBpZiAoeCA8PSBhcnJbNCAqIG91dE5vZGVdKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb3V0Tm9kZSsrO1xuICB9XG5cbiAgY29uc3QgaW5Ob2RlID0gb3V0Tm9kZSAtIDE7XG4gIGlmIChpbk5vZGUgPCAwKSB7XG4gICAgcmV0dXJuIGFycls0ICogaW5Ob2RlICsgNV07IC8vIHRvbyBiZWhpbmQhISBhc3N1bWUgYXMgXCJDbGFtcFwiXG4gIH1cblxuICAvLyAtLSBjYWxjdWxhdGUgbG9jYWwgeCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgeDAgPSBhcnJbNCAqIGluTm9kZV07XG4gIGNvbnN0IHgxID0gYXJyWzQgKiBvdXROb2RlXTtcbiAgY29uc3QgeEhlcm1pdGUgPSAoeCAtIHgwKSAvICh4MSAtIHgwKTtcblxuICAvLyAtLSBmaW5hbGx5IGRvIHRoZSBoZXJtaXRlIHNwbGluZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgeTAgPSBhcnJbNCAqIGluTm9kZSArIDFdO1xuICBjb25zdCB5MSA9IGFycls0ICogb3V0Tm9kZSArIDFdO1xuICBjb25zdCB0MCA9IGFycls0ICogaW5Ob2RlICsgM107XG4gIGNvbnN0IHQxID0gYXJyWzQgKiBvdXROb2RlICsgMl07XG4gIHJldHVybiBoZXJtaXRlU3BsaW5lKHkwLCB5MSwgdDAsIHQxLCB4SGVybWl0ZSk7XG59O1xuXG5leHBvcnQgY2xhc3MgQ3VydmVNYXBwZXIge1xuICBwdWJsaWMgc3RhdGljIGFwcGx5KG1hcDogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXApOiBDdXJ2ZU1hcHBlciB7XG4gICAgcmV0dXJuIG5ldyBDdXJ2ZU1hcHBlcihtYXAueFJhbmdlLCBtYXAueVJhbmdlLCBtYXAuY3VydmUpO1xuICB9XG5cbiAgcHVibGljIGN1cnZlOiBudW1iZXJbXSA9IFswLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMF07XG4gIHB1YmxpYyBjdXJ2ZVhSYW5nZURlZ3JlZTogbnVtYmVyID0gOTAuMDtcbiAgcHVibGljIGN1cnZlWVJhbmdlRGVncmVlOiBudW1iZXIgPSAxMC4wO1xuXG4gIGNvbnN0cnVjdG9yKHhSYW5nZT86IG51bWJlciwgeVJhbmdlPzogbnVtYmVyLCBjdXJ2ZT86IG51bWJlcltdKSB7XG4gICAgaWYgKHhSYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmN1cnZlWFJhbmdlRGVncmVlID0geFJhbmdlO1xuICAgIH1cblxuICAgIGlmICh5UmFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZVlSYW5nZURlZ3JlZSA9IHlSYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jdXJ2ZSA9IGN1cnZlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXAoc3JjOiBudW1iZXIpIHtcbiAgICBjb25zdCBjbGFtcGVkU3JjID0gTWF0aC5taW4oTWF0aC5tYXgoc3JjLCAwLjApLCB0aGlzLmN1cnZlWFJhbmdlRGVncmVlKTtcbiAgICBjb25zdCB4ID0gY2xhbXBlZFNyYyAvIHRoaXMuY3VydmVYUmFuZ2VEZWdyZWU7XG4gICAgcmV0dXJuIHRoaXMuY3VydmVZUmFuZ2VEZWdyZWUgKiBldmFsdWF0ZUN1cnZlKHRoaXMuY3VydmUsIHgpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBMb29rQXRUeXBlTmFtZSwgUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXAgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgcHVibGljIGxvb2tBdEhvcml6b250YWxPdXRlcjogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXA7XG4gIHB1YmxpYyBsb29rQXRWZXJ0aWNhbERvd246IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwO1xuICBwdWJsaWMgbG9va0F0VmVydGljYWxVcDogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXA7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgIGxvb2tBdEhvcml6b250YWxPdXRlcjogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXAsXG4gICAgbG9va0F0VmVydGljYWxEb3duOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCxcbiAgICBsb29rQXRWZXJ0aWNhbFVwOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCxcbiAgKSB7XG4gICAgdGhpcy5sb29rQXRIb3Jpem9udGFsT3V0ZXIgPSBsb29rQXRIb3Jpem9udGFsT3V0ZXI7XG4gICAgdGhpcy5sb29rQXRWZXJ0aWNhbERvd24gPSBsb29rQXRWZXJ0aWNhbERvd247XG4gICAgdGhpcy5sb29rQXRWZXJ0aWNhbFVwID0gbG9va0F0VmVydGljYWxVcDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBuYW1lKCk6IExvb2tBdFR5cGVOYW1lO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKTogdm9pZDtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUJsZW5kU2hhcGVQcm94eSB9IGZyb20gJy4uL2JsZW5kc2hhcGUnO1xuaW1wb3J0IHsgQmxlbmRTaGFwZVByZXNldE5hbWUsIExvb2tBdFR5cGVOYW1lLCBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEN1cnZlTWFwcGVyLCBERUcyUkFEIH0gZnJvbSAnLi9DdXJ2ZU1hcHBlcic7XG5pbXBvcnQgeyBWUk1Mb29rQXRBcHBseWVyIH0gZnJvbSAnLi9WUk1Mb29rQXRBcHBseWVyJztcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEJsZW5kU2hhcGVBcHBseWVyIGV4dGVuZHMgVlJNTG9va0F0QXBwbHllciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2JsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJsZW5kU2hhcGVQcm94eTogVlJNQmxlbmRTaGFwZVByb3h5LFxuICAgIGxvb2tBdEhvcml6b250YWxPdXRlcjogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXAsXG4gICAgbG9va0F0VmVydGljYWxEb3duOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCxcbiAgICBsb29rQXRWZXJ0aWNhbFVwOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCxcbiAgKSB7XG4gICAgc3VwZXIobG9va0F0SG9yaXpvbnRhbE91dGVyLCBsb29rQXRWZXJ0aWNhbERvd24sIGxvb2tBdFZlcnRpY2FsVXApO1xuICAgIHRoaXMuX2JsZW5kU2hhcGVQcm94eSA9IGJsZW5kU2hhcGVQcm94eTtcbiAgfVxuXG4gIHB1YmxpYyBuYW1lKCk6IExvb2tBdFR5cGVOYW1lIHtcbiAgICByZXR1cm4gTG9va0F0VHlwZU5hbWUuQmxlbmRTaGFwZTtcbiAgfVxuXG4gIHB1YmxpYyBsb29rQXQoZXVsZXI6IFRIUkVFLkV1bGVyKSB7XG4gICAgY29uc3Qgc3JjWCA9IGV1bGVyLng7XG4gICAgY29uc3Qgc3JjWSA9IGV1bGVyLnk7XG5cbiAgICBjb25zdCBtYXBwZXJIb3Jpem9udGFsID0gQ3VydmVNYXBwZXIuYXBwbHkoZGVnMnJhZCh0aGlzLmxvb2tBdEhvcml6b250YWxPdXRlcikpO1xuICAgIGNvbnN0IG1hcHBlclZlcnRpY2FsRG93biA9IEN1cnZlTWFwcGVyLmFwcGx5KGRlZzJyYWQodGhpcy5sb29rQXRWZXJ0aWNhbERvd24pKTtcbiAgICBjb25zdCBtYXBwZXJWZXJ0aWNhbFVwID0gQ3VydmVNYXBwZXIuYXBwbHkoZGVnMnJhZCh0aGlzLmxvb2tBdFZlcnRpY2FsVXApKTtcblxuICAgIGlmIChzcmNZIDwgMC4wKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2xlZnQsIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3JpZ2h0LCBtYXBwZXJIb3Jpem9udGFsLm1hcCgtc3JjWSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3JpZ2h0LCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKEJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tsZWZ0LCBtYXBwZXJIb3Jpem9udGFsLm1hcChzcmNZKSk7XG4gICAgfVxuICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va2Rvd24sIDAuMCk7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3VwLCBtYXBwZXJWZXJ0aWNhbFVwLm1hcCgtc3JjWCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ibGVuZFNoYXBlUHJveHkuc2V0VmFsdWUoQmxlbmRTaGFwZVByZXNldE5hbWUuTG9va3VwLCAwLjApO1xuICAgICAgdGhpcy5fYmxlbmRTaGFwZVByb3h5LnNldFZhbHVlKEJsZW5kU2hhcGVQcmVzZXROYW1lLkxvb2tkb3duLCBtYXBwZXJWZXJ0aWNhbERvd24ubWFwKHNyY1gpKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVnMnJhZChtYXA6IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwKTogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXAge1xuICByZXR1cm4ge1xuICAgIHhSYW5nZTogdHlwZW9mIG1hcC54UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC54UmFuZ2UgOiB1bmRlZmluZWQsXG4gICAgeVJhbmdlOiBtYXAueVJhbmdlLCAvLyB5UmFuZ2UgbWVhbnMgd2VpZ2h0IG5vdCByYWRpYW5cbiAgICBjdXJ2ZTogbWFwLmN1cnZlLFxuICB9O1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgVlJNSHVtYW5Cb25lcyB9IGZyb20gJy4uL2h1bWFub2lkJztcbmltcG9ydCB7IEdMVEZOb2RlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTG9va0F0VHlwZU5hbWUsIFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ3VydmVNYXBwZXIsIERFRzJSQUQgfSBmcm9tICcuL0N1cnZlTWFwcGVyJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuXG5leHBvcnQgY2xhc3MgVlJNTG9va0F0Qm9uZUFwcGx5ZXIgZXh0ZW5kcyBWUk1Mb29rQXRBcHBseWVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBsb29rQXRIb3Jpem9udGFsSW5uZXI6IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRFeWU/OiBHTFRGTm9kZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfcmlnaHRFeWU/OiBHTFRGTm9kZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBodW1hbkJvZHlCb25lczogVlJNSHVtYW5Cb25lcyxcbiAgICBsb29rQXRIb3Jpem9udGFsSW5uZXI6IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwLFxuICAgIGxvb2tBdEhvcml6b250YWxPdXRlcjogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXAsXG4gICAgbG9va0F0VmVydGljYWxEb3duOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCxcbiAgICBsb29rQXRWZXJ0aWNhbFVwOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCxcbiAgKSB7XG4gICAgc3VwZXIobG9va0F0SG9yaXpvbnRhbE91dGVyLCBsb29rQXRWZXJ0aWNhbERvd24sIGxvb2tBdFZlcnRpY2FsVXApO1xuICAgIHRoaXMuX2xlZnRFeWUgPSBodW1hbkJvZHlCb25lcy5sZWZ0RXllO1xuICAgIHRoaXMuX3JpZ2h0RXllID0gaHVtYW5Cb2R5Qm9uZXMucmlnaHRFeWU7XG4gICAgdGhpcy5sb29rQXRIb3Jpem9udGFsSW5uZXIgPSBsb29rQXRIb3Jpem9udGFsSW5uZXI7XG4gIH1cblxuICBwdWJsaWMgbmFtZSgpOiBMb29rQXRUeXBlTmFtZSB7XG4gICAgcmV0dXJuIExvb2tBdFR5cGVOYW1lLkJvbmU7XG4gIH1cblxuICBwdWJsaWMgbG9va0F0KGV1bGVyOiBUSFJFRS5FdWxlcikge1xuICAgIGNvbnN0IHNyY1ggPSBldWxlci54O1xuICAgIGNvbnN0IHNyY1kgPSBldWxlci55O1xuXG4gICAgY29uc3QgbWFwcGVySG9yaXpvbnRhbElubmVyID0gQ3VydmVNYXBwZXIuYXBwbHkoZGVnMnJhZCh0aGlzLmxvb2tBdEhvcml6b250YWxJbm5lcikpO1xuICAgIGNvbnN0IG1hcHBlckhvcml6b250YWxPdXRlciA9IEN1cnZlTWFwcGVyLmFwcGx5KGRlZzJyYWQodGhpcy5sb29rQXRIb3Jpem9udGFsT3V0ZXIpKTtcbiAgICBjb25zdCBtYXBwZXJWZXJ0aWNhbERvd24gPSBDdXJ2ZU1hcHBlci5hcHBseShkZWcycmFkKHRoaXMubG9va0F0VmVydGljYWxEb3duKSk7XG4gICAgY29uc3QgbWFwcGVyVmVydGljYWxVcCA9IEN1cnZlTWFwcGVyLmFwcGx5KGRlZzJyYWQodGhpcy5sb29rQXRWZXJ0aWNhbFVwKSk7XG5cbiAgICAvLyBsZWZ0XG4gICAgaWYgKHRoaXMuX2xlZnRFeWUpIHtcbiAgICAgIGlmIChzcmNYIDwgMC4wKSB7XG4gICAgICAgIHRoaXMuX2xlZnRFeWUucm90YXRpb24ueCA9IC1tYXBwZXJWZXJ0aWNhbERvd24ubWFwKC1zcmNYKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xlZnRFeWUucm90YXRpb24ueCA9IG1hcHBlclZlcnRpY2FsVXAubWFwKHNyY1gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgICB0aGlzLl9sZWZ0RXllLnJvdGF0aW9uLnkgPSAtbWFwcGVySG9yaXpvbnRhbElubmVyLm1hcCgtc3JjWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9sZWZ0RXllLnJvdGF0aW9uLnkgPSBtYXBwZXJIb3Jpem9udGFsT3V0ZXIubWFwKHNyY1kpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJpZ2h0XG4gICAgaWYgKHRoaXMuX3JpZ2h0RXllKSB7XG4gICAgICBpZiAoc3JjWCA8IDAuMCkge1xuICAgICAgICB0aGlzLl9yaWdodEV5ZS5yb3RhdGlvbi54ID0gLW1hcHBlclZlcnRpY2FsRG93bi5tYXAoLXNyY1gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmlnaHRFeWUucm90YXRpb24ueCA9IG1hcHBlclZlcnRpY2FsVXAubWFwKHNyY1gpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3JjWSA8IDAuMCkge1xuICAgICAgICB0aGlzLl9yaWdodEV5ZS5yb3RhdGlvbi55ID0gLW1hcHBlckhvcml6b250YWxPdXRlci5tYXAoLXNyY1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmlnaHRFeWUucm90YXRpb24ueSA9IG1hcHBlckhvcml6b250YWxJbm5lci5tYXAoc3JjWSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZzJyYWQobWFwOiBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCk6IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwIHtcbiAgcmV0dXJuIHtcbiAgICB4UmFuZ2U6IHR5cGVvZiBtYXAueFJhbmdlID09PSAnbnVtYmVyJyA/IERFRzJSQUQgKiBtYXAueFJhbmdlIDogdW5kZWZpbmVkLFxuICAgIHlSYW5nZTogdHlwZW9mIG1hcC55UmFuZ2UgPT09ICdudW1iZXInID8gREVHMlJBRCAqIG1hcC55UmFuZ2UgOiB1bmRlZmluZWQsXG4gICAgY3VydmU6IG1hcC5jdXJ2ZSxcbiAgfTtcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFZSTUh1bWFuQm9uZXMgfSBmcm9tICcuLi9odW1hbm9pZCc7XG5pbXBvcnQgeyBHTFRGTm9kZSwgUmF3VmVjdG9yMyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGdldFdvcmxkUXVhdGVybmlvbkxpdGUgfSBmcm9tICcuLi91dGlscy9tYXRoJztcbmltcG9ydCB7IFZSTUxvb2tBdEFwcGx5ZXIgfSBmcm9tICcuL1ZSTUxvb2tBdEFwcGx5ZXInO1xuXG5jb25zdCBfdjNBID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF92M0IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX2V1bGVyID0gbmV3IFRIUkVFLkV1bGVyKCk7XG5jb25zdCBfbWF0NCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfcXVhdEEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpO1xuY29uc3QgX3F1YXRCID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcbmNvbnN0IF9xdWF0QyA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBVUF9WRUNUT1IgPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApKTtcbmNvbnN0IExPT0tfQVRfRVVMRVJfT1JERVIgPSAnWlhZJzsgLy8geWF3LXBpdGNoLXJvbGxcblxuZXhwb3J0IGNsYXNzIFZSTUxvb2tBdEhlYWQge1xuICBwdWJsaWMgaGVhZDogR0xURk5vZGU7XG5cbiAgcHVibGljIGF1dG9VcGRhdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBnaXZpbmdVcFRocmVzaG9sZD86IG51bWJlciA9IHVuZGVmaW5lZDsgLy8gdGhpcyBpcyB0aGUgdmFsdWUgb2YgY29zKHRoZXRhKVxuICBwdWJsaWMgZHVtcGluZ0ZhY3RvcjogbnVtYmVyID0gMC41O1xuXG4gIHB1YmxpYyBsZWZ0RXllV29ybGRQb3NpdGlvbj86IFRIUkVFLlZlY3RvcjM7XG4gIHB1YmxpYyByaWdodEV5ZVdvcmxkUG9zaXRpb24/OiBUSFJFRS5WZWN0b3IzO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2xlZnRFeWU/OiBHTFRGTm9kZTtcbiAgcHJpdmF0ZSByZWFkb25seSBfcmlnaHRFeWU/OiBHTFRGTm9kZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hcHBseWVyPzogVlJNTG9va0F0QXBwbHllcjtcblxuICBwcml2YXRlIF90YXJnZXQ/OiBUSFJFRS5PYmplY3QzRDtcbiAgcHJpdmF0ZSBfbGFzdFRhcmdldFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgcHJpdmF0ZSBfbG9va0F0VGFyZ2V0VG8/OiBUSFJFRS5WZWN0b3IzO1xuICBwcml2YXRlIF9sb29rQXRUYXJnZXQ/OiBUSFJFRS5WZWN0b3IzO1xuXG4gIGNvbnN0cnVjdG9yKGh1bWFuQm9uZXM6IFZSTUh1bWFuQm9uZXMsIGFwcGx5ZXI/OiBWUk1Mb29rQXRBcHBseWVyKSB7XG4gICAgdGhpcy5fYXBwbHllciA9IGFwcGx5ZXI7XG4gICAgdGhpcy5oZWFkID0gaHVtYW5Cb25lcy5oZWFkO1xuXG4gICAgLy8g55uu44Gu44Oc44O844Oz44GvVlJN5LuV5qeY44Gn44Gv44Kq44OX44K344On44OK44Or44CCXG4gICAgdGhpcy5fbGVmdEV5ZSA9IGh1bWFuQm9uZXMubGVmdEV5ZTtcbiAgICB0aGlzLl9yaWdodEV5ZSA9IGh1bWFuQm9uZXMucmlnaHRFeWU7XG5cbiAgICBpZiAodGhpcy5fbGVmdEV5ZSkge1xuICAgICAgdGhpcy5sZWZ0RXllV29ybGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuX2xlZnRFeWUubWF0cml4V29ybGQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcmlnaHRFeWUpIHtcbiAgICAgIHRoaXMucmlnaHRFeWVXb3JsZFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKS5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5fcmlnaHRFeWUubWF0cml4V29ybGQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRBcHBseWVyKCk6IFZSTUxvb2tBdEFwcGx5ZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9hcHBseWVyO1xuICB9XG5cbiAgcHVibGljIGdldFRhcmdldCgpOiBUSFJFRS5PYmplY3QzRCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUYXJnZXQodGFyZ2V0OiBUSFJFRS5PYmplY3QzRCkge1xuICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLl9sb29rQXRUYXJnZXQgPSB0YXJnZXQucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLl9sYXN0VGFyZ2V0UG9zaXRpb24gPSB0YXJnZXQucG9zaXRpb24uY2xvbmUoKTtcbiAgICB0aGlzLl9sb29rQXRUYXJnZXRUbyA9IHRhcmdldC5wb3NpdGlvbi5jbG9uZSgpO1xuICB9XG5cbiAgLy8g6aGU44Gu5Lit5b+D5bqn5qiZ44KS5Y+W5b6X44GZ44KLXG4gIC8vIOOCq+ODoeODqeODleOCqeODvOOCq+OCueeUqFxuICBwdWJsaWMgZ2V0SGVhZFBvc2l0aW9uKCk6IFJhd1ZlY3RvcjMge1xuICAgIF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuaGVhZC5tYXRyaXhXb3JsZCk7XG4gICAgY29uc3QgeCA9IF92M0EueDtcbiAgICBjb25zdCB6ID0gX3YzQS56O1xuICAgIC8vIOmrmOOBleOBr+OAgeebruOBruS9jee9ruOCkuS4reW/g+OBq+OBmeOCi1xuICAgIGNvbnN0IHkgPSB0aGlzLmxlZnRFeWVXb3JsZFBvc2l0aW9uXG4gICAgICA/IHRoaXMubGVmdEV5ZVdvcmxkUG9zaXRpb24ueVxuICAgICAgOiB0aGlzLnJpZ2h0RXllV29ybGRQb3NpdGlvblxuICAgICAgPyB0aGlzLnJpZ2h0RXllV29ybGRQb3NpdGlvbi55XG4gICAgICA6IF92M0EueTtcblxuICAgIHJldHVybiBbeCwgeSwgel07XG4gIH1cblxuICAvLyDpoZTjgYzlkJHjgYTjgabjgYTjgot3b3JsZOS4iuOBp+OBruaWueWQkeODmeOCr+ODiOODq+OCkuWPluW+l1xuICBwdWJsaWMgZ2V0RmFjZURpcmVjdGlvbigpOiBSYXdWZWN0b3IzIHtcbiAgICBfbWF0NC5leHRyYWN0Um90YXRpb24odGhpcy5oZWFkLm1hdHJpeFdvcmxkKTtcbiAgICAvLyBWUk3jgavjgajjgaPjgabjga7mraPpnaLmlrnlkJHjgIJWUk3jga/mqJnmupbjgaflvozjgo3jgpLlkJHjgYTjgabjgYTjgovku5Xmp5jjgIJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBfdjNBLnNldCgwLCAwLCAtMSk7XG4gICAgZGlyZWN0aW9uLmFwcGx5TWF0cml4NChfbWF0NCk7XG5cbiAgICByZXR1cm4gW2RpcmVjdGlvbi54LCBkaXJlY3Rpb24ueSwgZGlyZWN0aW9uLnpdO1xuICB9XG5cbiAgcHVibGljIGxvb2tBdCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9hcHBseWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhlYWRQb3NpdGlvbiA9IF92M0EuZnJvbUFycmF5KHRoaXMuZ2V0SGVhZFBvc2l0aW9uKCkpO1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gX3YzQi5zZXQoeCwgeSwgeik7XG4gICAgX21hdDQuaWRlbnRpdHkoKS5sb29rQXQoaGVhZFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbiwgVVBfVkVDVE9SKTtcbiAgICBjb25zdCB3b3JsZFJvdGF0aW9uID0gX3F1YXRBLnNldEZyb21Sb3RhdGlvbk1hdHJpeChfbWF0NCk7XG4gICAgY29uc3QgbG9jYWxSb3RhdGlvbiA9IF9xdWF0Qi5tdWx0aXBseVF1YXRlcm5pb25zKFxuICAgICAgd29ybGRSb3RhdGlvbixcbiAgICAgIGdldFdvcmxkUXVhdGVybmlvbkxpdGUodGhpcy5oZWFkLnBhcmVudCEsIF9xdWF0QykuaW52ZXJzZSgpLFxuICAgICk7XG4gICAgX2V1bGVyLnNldEZyb21RdWF0ZXJuaW9uKGxvY2FsUm90YXRpb24sIExPT0tfQVRfRVVMRVJfT1JERVIpO1xuICAgIHRoaXMuX2FwcGx5ZXIubG9va0F0KF9ldWxlcik7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl90YXJnZXQgJiYgdGhpcy5oZWFkICYmIHRoaXMuYXV0b1VwZGF0ZSAmJiB0aGlzLl9sb29rQXRUYXJnZXQgJiYgdGhpcy5fbG9va0F0VGFyZ2V0VG8pIHtcbiAgICAgIHRoaXMuc2V0Q3VycmVudFRhcmdldFBvc2l0aW9uKHRoaXMuX3RhcmdldCwgdGhpcy5fbG9va0F0VGFyZ2V0VG8pO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBuZXcgVEhSRUUuVmVjdG9yMygpLnNldChcbiAgICAgICAgdGhpcy5fbG9va0F0VGFyZ2V0VG8ueCAtIHRoaXMuX2xvb2tBdFRhcmdldC54LFxuICAgICAgICB0aGlzLl9sb29rQXRUYXJnZXRUby55IC0gdGhpcy5fbG9va0F0VGFyZ2V0LnksXG4gICAgICAgIHRoaXMuX2xvb2tBdFRhcmdldFRvLnogLSB0aGlzLl9sb29rQXRUYXJnZXQueixcbiAgICAgICk7XG4gICAgICB0aGlzLl9sb29rQXRUYXJnZXQuYWRkKHJlc3VsdC5tdWx0aXBseVNjYWxhcih0aGlzLmR1bXBpbmdGYWN0b3IpKTtcbiAgICAgIHRoaXMubG9va0F0KHRoaXMuX2xvb2tBdFRhcmdldC54LCB0aGlzLl9sb29rQXRUYXJnZXQueSwgdGhpcy5fbG9va0F0VGFyZ2V0LnopO1xuICAgIH1cblxuICAgIC8vIOacgOaWsOOBrndvcmxkTWF0cml444KS5rWB44GX6L6844KAXG4gICAgaWYgKHRoaXMuX2xlZnRFeWUpIHtcbiAgICAgIHRoaXMubGVmdEV5ZVdvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLl9sZWZ0RXllLm1hdHJpeFdvcmxkKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3JpZ2h0RXllKSB7XG4gICAgICB0aGlzLnJpZ2h0RXllV29ybGRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMuX3JpZ2h0RXllLm1hdHJpeFdvcmxkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEN1cnJlbnRUYXJnZXRQb3NpdGlvbih0YXJnZXQ6IFRIUkVFLk9iamVjdDNELCBsb29rQXRUYXJnZXRUbzogVEhSRUUuVmVjdG9yMykge1xuICAgIGlmICghdGhpcy5fbGFzdFRhcmdldFBvc2l0aW9uLmVxdWFscyh0YXJnZXQucG9zaXRpb24pKSB7XG4gICAgICB0aGlzLnNldFRhcmdldCh0YXJnZXQpO1xuXG4gICAgICBjb25zdCBoZWFkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheSh0aGlzLmdldEhlYWRQb3NpdGlvbigpKTtcbiAgICAgIGNvbnN0IGZhY2VEaXJlY3Rpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpLmZyb21BcnJheSh0aGlzLmdldEZhY2VEaXJlY3Rpb24oKSk7XG4gICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKHRhcmdldC5wb3NpdGlvbi54LCB0YXJnZXQucG9zaXRpb24ueSwgdGFyZ2V0LnBvc2l0aW9uLnopO1xuXG4gICAgICAvLyBWUk3jg6Ljg4fjg6vjgYvjgonopovjgZ/lr77osaHjga7mlrnlkJHvvIh3b3JsZOW6p+aome+8iVxuICAgICAgY29uc3QgbG9va0F0RGlyZWN0aW9uID0gdGFyZ2V0UG9zaXRpb24uc3ViKGhlYWRQb3NpdGlvbikubm9ybWFsaXplKCk7XG5cbiAgICAgIC8vIOmhlOOBruato+mdouOBi+OCieOBruinkuW6puOBjOOBjeOBpOOBhOWgtOWQiOOAgWxvb2tBdOOCkuirpuOCgeOCi1xuICAgICAgaWYgKHRoaXMuZ2l2aW5nVXBUaHJlc2hvbGQgIT09IHVuZGVmaW5lZCAmJiBsb29rQXREaXJlY3Rpb24uZG90KGZhY2VEaXJlY3Rpb24pIDwgdGhpcy5naXZpbmdVcFRocmVzaG9sZCkge1xuICAgICAgICB0YXJnZXRQb3NpdGlvbi5jb3B5KGhlYWRQb3NpdGlvbikuYWRkKGZhY2VEaXJlY3Rpb24ubXVsdGlwbHlTY2FsYXIoMy4wKSk7XG4gICAgICAgIGxvb2tBdFRhcmdldFRvLmNvcHkodGFyZ2V0UG9zaXRpb24pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGFyZ2V0UG9zaXRpb24uZGlzdGFuY2VUbyhoZWFkUG9zaXRpb24pO1xuICAgICAgY29uc3QgbW9kaWZpZWRMb29rQXREaXJlY3Rpb24gPSBsb29rQXREaXJlY3Rpb24ubXVsdGlwbHlTY2FsYXIoZGlzdGFuY2UpLmFkZChoZWFkUG9zaXRpb24pO1xuICAgICAgbG9va0F0VGFyZ2V0VG8uc2V0KG1vZGlmaWVkTG9va0F0RGlyZWN0aW9uLngsIG1vZGlmaWVkTG9va0F0RGlyZWN0aW9uLnksIG1vZGlmaWVkTG9va0F0RGlyZWN0aW9uLnopO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1Mb29rQXRIZWFkJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNTG9va0F0QXBwbHllcic7XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uIH0gZnJvbSAnLi90ZXhlbC1kZWNvZGVyJztcblxuLyoqXG4gKiBNVG9vbiBpcyBhIG1hdGVyaWFsIHNwZWNpZmljYXRpb24gdGhhdCBoYXMgdmFyaW91cyBmZWF0dXJlcy5cbiAqIFRoZSBzcGVjIGFuZCBpbXBsZW1lbnRhdGlvbiBhcmUgb3JpZ2luYWxseSBmb3VuZGVkIGZvciBVbml0eSBlbmdpbmUgYW5kIHRoaXMgaXMgYSBwb3J0IG9mIHRoZSBtYXRlcmlhbC5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9TYW50YXJoL01Ub29uXG4gKi9cbmV4cG9ydCBjbGFzcyBNVG9vbiBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIE1Ub29uIG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlzVlJNTVRvb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBjdXRvZmY6IG51bWJlciA9IDAuNTsgLy8gX0N1dG9mZlxuICBwdWJsaWMgY29sb3I6IFRIUkVFLlZlY3RvcjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgxLjAsIDEuMCwgMS4wLCAxLjApOyAvLyBfQ29sb3JcbiAgcHVibGljIHNoYWRlQ29sb3I6IFRIUkVFLlZlY3RvcjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjk3LCAwLjgxLCAwLjg2LCAxLjApOyAvLyBfU2hhZGVDb2xvclxuICBwdWJsaWMgbWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9NYWluVGV4XG4gIHB1YmxpYyBtYWluVGV4X1NUOiBUSFJFRS5WZWN0b3I0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX01haW5UZXhfU1RcbiAgcHVibGljIHNoYWRlVGV4dHVyZTogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfU2hhZGVUZXh0dXJlXG4gIC8vIHB1YmxpYyBzaGFkZVRleHR1cmVfU1Q6IFRIUkVFLlZlY3RvcjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU2hhZGVUZXh0dXJlX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBidW1wU2NhbGU6IG51bWJlciA9IDEuMDsgLy8gX0J1bXBTY2FsZVxuICBwdWJsaWMgbm9ybWFsTWFwOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9CdW1wTWFwLiBhZ2FpbiwgVEhJUyBJUyBfQnVtcE1hcFxuICAvLyBwdWJsaWMgYnVtcE1hcF9TVDogVEhSRUUuVmVjdG9yNCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9CdW1wTWFwX1NUICh1bnVzZWQpXG4gIHB1YmxpYyByZWNlaXZlU2hhZG93UmF0ZTogbnVtYmVyID0gMS4wOyAvLyBfUmVjZWl2ZVNoYWRvd1JhdGVcbiAgcHVibGljIHJlY2VpdmVTaGFkb3dUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9SZWNlaXZlU2hhZG93VGV4dHVyZVxuICAvLyBwdWJsaWMgcmVjZWl2ZVNoYWRvd1RleHR1cmVfU1Q6IFRIUkVFLlZlY3RvcjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfUmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIHNoYWRpbmdHcmFkZVJhdGU6IG51bWJlciA9IDEuMDsgLy8gX1NoYWRpbmdHcmFkZVJhdGVcbiAgcHVibGljIHNoYWRpbmdHcmFkZVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1NoYWRpbmdHcmFkZVRleHR1cmVcbiAgLy8gcHVibGljIHNoYWRpbmdHcmFkZVRleHR1cmVfU1Q6IFRIUkVFLlZlY3RvcjQgPSBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApOyAvLyBfU2hhZGluZ0dyYWRlVGV4dHVyZV9TVCAodW51c2VkKVxuICBwdWJsaWMgc2hhZGVTaGlmdDogbnVtYmVyID0gMC4wOyAvLyBfU2hhZGVTaGlmdFxuICBwdWJsaWMgc2hhZGVUb29ueTogbnVtYmVyID0gMC45OyAvLyBfU2hhZGVUb29ueVxuICBwdWJsaWMgbGlnaHRDb2xvckF0dGVudWF0aW9uOiBudW1iZXIgPSAwLjA7IC8vIF9MaWdodENvbG9yQXR0ZW51YXRpb25cbiAgcHVibGljIGluZGlyZWN0TGlnaHRJbnRlbnNpdHk6IG51bWJlciA9IDAuMTsgLy8gX0luZGlyZWN0TGlnaHRJbnRlbnNpdHlcbiAgcHVibGljIHJpbVRleHR1cmU6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1JpbVRleHR1cmVcbiAgcHVibGljIHJpbUNvbG9yOiBUSFJFRS5WZWN0b3I0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX1JpbUNvbG9yXG4gIHB1YmxpYyByaW1MaWdodGluZ01peDogbnVtYmVyID0gMC4wOyAvLyBfUmltTGlnaHRpbmdNaXhcbiAgcHVibGljIHJpbUZyZXNuZWxQb3dlcjogbnVtYmVyID0gMS4wOyAvLyBfUmltRnJlc25lbFBvd2VyXG4gIHB1YmxpYyByaW1MaWZ0OiBudW1iZXIgPSAwLjA7IC8vIF9SaW1MaWZ0XG4gIHB1YmxpYyBzcGhlcmVBZGQ6IFRIUkVFLlRleHR1cmUgfCBudWxsID0gbnVsbDsgLy8gX1NwaGVyZUFkZFxuICAvLyBwdWJsaWMgc3BoZXJlQWRkX1NUOiBUSFJFRS5WZWN0b3I0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX1NwaGVyZUFkZF9TVCAodW51c2VkKVxuICBwdWJsaWMgZW1pc3Npb25Db2xvcjogVEhSRUUuVmVjdG9yNCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAwLjAsIDEuMCk7IC8vIF9FbWlzc2lvbkNvbG9yXG4gIHB1YmxpYyBlbWlzc2l2ZU1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfRW1pc3Npb25NYXBcbiAgLy8gcHVibGljIGVtaXNzaW9uTWFwX1NUOiBUSFJFRS5WZWN0b3I0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX0VtaXNzaW9uTWFwX1NUICh1bnVzZWQpXG4gIHB1YmxpYyBvdXRsaW5lV2lkdGhUZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7IC8vIF9PdXRsaW5lV2lkdGhUZXh0dXJlXG4gIC8vIHB1YmxpYyBvdXRsaW5lV2lkdGhUZXh0dXJlX1NUOiBUSFJFRS5WZWN0b3I0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKTsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVfU1QgKHVudXNlZClcbiAgcHVibGljIG91dGxpbmVXaWR0aDogbnVtYmVyID0gMC41OyAvLyBfT3V0bGluZVdpZHRoXG4gIHB1YmxpYyBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U6IG51bWJlciA9IDEuMDsgLy8gX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZVxuICBwdWJsaWMgb3V0bGluZUNvbG9yOiBUSFJFRS5WZWN0b3I0ID0gbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDAuMCwgMS4wKTsgLy8gX091dGxpbmVDb2xvclxuICBwdWJsaWMgb3V0bGluZUxpZ2h0aW5nTWl4OiBudW1iZXIgPSAxLjA7IC8vIF9PdXRsaW5lTGlnaHRpbmdNaXhcblxuICBwdWJsaWMgc2hvdWxkQXBwbHlVbmlmb3JtczogYm9vbGVhbiA9IHRydWU7IC8vIHdoZW4gdGhpcyBpcyB0cnVlLCBhcHBseVVuaWZvcm1zIGVmZmVjdHNcblxuICBwcml2YXRlIF9kZWJ1Z01vZGU6IE1Ub29uRGVidWdNb2RlID0gTVRvb25EZWJ1Z01vZGUuTm9uZTsgLy8gX0RlYnVnTW9kZVxuICBwcml2YXRlIF9ibGVuZE1vZGU6IE1Ub29uUmVuZGVyTW9kZSA9IE1Ub29uUmVuZGVyTW9kZS5PcGFxdWU7IC8vIF9CbGVuZE1vZGVcbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoTW9kZTogTVRvb25PdXRsaW5lV2lkdGhNb2RlID0gTVRvb25PdXRsaW5lV2lkdGhNb2RlLk5vbmU7IC8vIF9PdXRsaW5lV2lkdGhNb2RlXG4gIHByaXZhdGUgX291dGxpbmVDb2xvck1vZGU6IE1Ub29uT3V0bGluZUNvbG9yTW9kZSA9IE1Ub29uT3V0bGluZUNvbG9yTW9kZS5GaXhlZENvbG9yOyAvLyBfT3V0bGluZUNvbG9yTW9kZVxuICBwcml2YXRlIF9jdWxsTW9kZTogTVRvb25DdWxsTW9kZSA9IE1Ub29uQ3VsbE1vZGUuQmFjazsgLy8gX0N1bGxNb2RlXG4gIHByaXZhdGUgX291dGxpbmVDdWxsTW9kZTogTVRvb25DdWxsTW9kZSA9IE1Ub29uQ3VsbE1vZGUuRnJvbnQ7IC8vIF9PdXRsaW5lQ3VsbE1vZGVcbiAgLy8gcHVibGljIHNyY0JsZW5kOiBudW1iZXIgPSAxLjA7IC8vIF9TcmNCbGVuZCAoaXMgbm90IHN1cHBvcnRlZClcbiAgLy8gcHVibGljIGRzdEJsZW5kOiBudW1iZXIgPSAwLjA7IC8vIF9Ec3RCbGVuZCAoaXMgbm90IHN1cHBvcnRlZClcbiAgLy8gcHVibGljIHpXcml0ZTogbnVtYmVyID0gMS4wOyAvLyBfWldyaXRlICh3aWxsIGJlIGNvbnZlcnRlZCB0byBkZXB0aFdyaXRlKVxuXG4gIHByaXZhdGUgX2lzT3V0bGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbG9yU3BhY2VHYW1tYTogYm9vbGVhbjtcblxuICAvLyBUT0RPOiDjgZPjgZPjgatjb2xvclNwYWNlR2FtbWHjgYLjgovjga7jg4DjgrXjgYRcbiAgY29uc3RydWN0b3IoY29sb3JTcGFjZUdhbW1hOiBib29sZWFuLCBwYXJhbWV0ZXJzPzogTVRvb25QYXJhbWV0ZXJzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2NvbG9yU3BhY2VHYW1tYSA9IGNvbG9yU3BhY2VHYW1tYTtcblxuICAgIGlmIChwYXJhbWV0ZXJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgICB9XG5cbiAgICAvLyA9PSB0aGVzZSBwYXJhbWV0ZXIgaGFzIG5vIGNvbXBhdGliaWxpdHkgd2l0aCB0aGlzIGltcGxlbWVudGF0aW9uID09PT09PT09XG4gICAgW1xuICAgICAgJ3NoYWRlVGV4dHVyZV9TVCcsXG4gICAgICAnYnVtcE1hcF9TVCcsXG4gICAgICAncmVjZWl2ZVNoYWRvd1RleHR1cmVfU1QnLFxuICAgICAgJ3NoYWRpbmdHcmFkZVRleHR1cmVfU1QnLFxuICAgICAgJ3NwaGVyZUFkZF9TVCcsXG4gICAgICAnZW1pc3Npb25NYXBfU1QnLFxuICAgICAgJ291dGxpbmVXaWR0aFRleHR1cmVfU1QnLFxuICAgICAgJ3NyY0JsZW5kJyxcbiAgICAgICdkc3RCbGVuZCcsXG4gICAgXS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgocGFyYW1ldGVycyBhcyBhbnkpW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjb25zb2xlLndhcm4oYFRIUkVFLiR7dGhpcy50eXBlfTogVGhlIHBhcmFtZXRlciBcIiR7a2V5fVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgIGRlbGV0ZSAocGFyYW1ldGVycyBhcyBhbnkpW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyA9PSBlbmFibGluZyBidW5jaCBvZiBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcGFyYW1ldGVycy5mb2cgPSB0cnVlO1xuICAgIHBhcmFtZXRlcnMubGlnaHRzID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIHBhcmFtZXRlcnMuc2tpbm5pbmcgPSBwYXJhbWV0ZXJzLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzID0gcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgPSBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubm9ybWFsbWFwLCAvLyBub3JtYWxNYXBcbiAgICAgIFRIUkVFLlVuaWZvcm1zTGliLmVtaXNzaXZlbWFwLCAvLyBlbWlzc2l2ZU1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIubGlnaHRzLFxuICAgICAge1xuICAgICAgICBjdXRvZmY6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBjb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDEuMCwgMS4wLCAxLjApIH0sXG4gICAgICAgIGNvbG9yQWxwaGE6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICBzaGFkZUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC45NywgMC44MSwgMC44NikgfSxcbiAgICAgICAgbWFpblRleF9TVDogeyB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjQoMC4wLCAwLjAsIDEuMCwgMS4wKSB9LFxuICAgICAgICBzaGFkZVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgYnVtcFNjYWxlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgcmVjZWl2ZVNoYWRvd1JhdGU6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICByZWNlaXZlU2hhZG93VGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkaW5nR3JhZGVSYXRlOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgICAgc2hhZGluZ0dyYWRlVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICBzaGFkZVNoaWZ0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc2hhZGVUb29ueTogeyB2YWx1ZTogMC45IH0sXG4gICAgICAgIGxpZ2h0Q29sb3JBdHRlbnVhdGlvbjogeyB2YWx1ZTogMC4wIH0sXG4gICAgICAgIGluZGlyZWN0TGlnaHRJbnRlbnNpdHk6IHsgdmFsdWU6IDAuMSB9LFxuICAgICAgICByaW1UZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHJpbUNvbG9yOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMC4wLCAwLjAsIDAuMCkgfSxcbiAgICAgICAgcmltTGlnaHRpbmdNaXg6IHsgdmFsdWU6IDAuMCB9LFxuICAgICAgICByaW1GcmVzbmVsUG93ZXI6IHsgdmFsdWU6IDEuMCB9LFxuICAgICAgICByaW1MaWZ0OiB7IHZhbHVlOiAwLjAgfSxcbiAgICAgICAgc3BoZXJlQWRkOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIGVtaXNzaW9uQ29sb3I6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigwLjAsIDAuMCwgMC4wKSB9LFxuICAgICAgICBvdXRsaW5lV2lkdGhUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIG91dGxpbmVXaWR0aDogeyB2YWx1ZTogMC41IH0sXG4gICAgICAgIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZTogeyB2YWx1ZTogMS4wIH0sXG4gICAgICAgIG91dGxpbmVDb2xvcjogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKDAuMCwgMC4wLCAwLjApIH0sXG4gICAgICAgIG91dGxpbmVMaWdodGluZ01peDogeyB2YWx1ZTogMS4wIH0sXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG1haW5UZXgoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hcDtcbiAgfVxuXG4gIHNldCBtYWluVGV4KHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5tYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGJ1bXBNYXAoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm5vcm1hbE1hcDtcbiAgfVxuXG4gIHNldCBidW1wTWFwKHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGVtaXNzaW9uTWFwKCk6IFRIUkVFLlRleHR1cmUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5lbWlzc2l2ZU1hcDtcbiAgfVxuXG4gIHNldCBlbWlzc2lvbk1hcCh0OiBUSFJFRS5UZXh0dXJlIHwgbnVsbCkge1xuICAgIHRoaXMuZW1pc3NpdmVNYXAgPSB0O1xuICB9XG5cbiAgZ2V0IGJsZW5kTW9kZSgpOiBNVG9vblJlbmRlck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9ibGVuZE1vZGU7XG4gIH1cblxuICBzZXQgYmxlbmRNb2RlKG06IE1Ub29uUmVuZGVyTW9kZSkge1xuICAgIHRoaXMuX2JsZW5kTW9kZSA9IG07XG5cbiAgICB0aGlzLmRlcHRoV3JpdGUgPSB0aGlzLl9ibGVuZE1vZGUgIT09IE1Ub29uUmVuZGVyTW9kZS5UcmFuc3BhcmVudDtcbiAgICB0aGlzLnRyYW5zcGFyZW50ID1cbiAgICAgIHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25SZW5kZXJNb2RlLlRyYW5zcGFyZW50IHx8IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25SZW5kZXJNb2RlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBkZWJ1Z01vZGUoKTogTVRvb25EZWJ1Z01vZGUge1xuICAgIHJldHVybiB0aGlzLl9kZWJ1Z01vZGU7XG4gIH1cblxuICBzZXQgZGVidWdNb2RlKG06IE1Ub29uRGVidWdNb2RlKSB7XG4gICAgdGhpcy5fZGVidWdNb2RlID0gbTtcblxuICAgIHRoaXMudXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG91dGxpbmVXaWR0aE1vZGUoKTogTVRvb25PdXRsaW5lV2lkdGhNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZVdpZHRoTW9kZTtcbiAgfVxuXG4gIHNldCBvdXRsaW5lV2lkdGhNb2RlKG06IE1Ub29uT3V0bGluZVdpZHRoTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVXaWR0aE1vZGUgPSBtO1xuXG4gICAgdGhpcy51cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBnZXQgb3V0bGluZUNvbG9yTW9kZSgpOiBNVG9vbk91dGxpbmVDb2xvck1vZGUge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlO1xuICB9XG5cbiAgc2V0IG91dGxpbmVDb2xvck1vZGUobTogTVRvb25PdXRsaW5lQ29sb3JNb2RlKSB7XG4gICAgdGhpcy5fb3V0bGluZUNvbG9yTW9kZSA9IG07XG5cbiAgICB0aGlzLnVwZGF0ZVNoYWRlckNvZGUoKTtcbiAgfVxuXG4gIGdldCBjdWxsTW9kZSgpOiBNVG9vbkN1bGxNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fY3VsbE1vZGU7XG4gIH1cblxuICBzZXQgY3VsbE1vZGUobTogTVRvb25DdWxsTW9kZSkge1xuICAgIHRoaXMuX2N1bGxNb2RlID0gbTtcblxuICAgIHRoaXMudXBkYXRlQ3VsbEZhY2UoKTtcbiAgfVxuXG4gIGdldCBvdXRsaW5lQ3VsbE1vZGUoKTogTVRvb25DdWxsTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVDdWxsTW9kZTtcbiAgfVxuXG4gIHNldCBvdXRsaW5lQ3VsbE1vZGUobTogTVRvb25DdWxsTW9kZSkge1xuICAgIHRoaXMuX291dGxpbmVDdWxsTW9kZSA9IG07XG5cbiAgICB0aGlzLnVwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICBnZXQgeldyaXRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGVwdGhXcml0ZSA/IDEgOiAwO1xuICB9XG5cbiAgc2V0IHpXcml0ZShpOiBudW1iZXIpIHtcbiAgICB0aGlzLmRlcHRoV3JpdGUgPSAwLjUgPD0gaTtcbiAgfVxuXG4gIGdldCBpc091dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3V0bGluZTtcbiAgfVxuXG4gIHNldCBpc091dGxpbmUoYjogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzT3V0bGluZSA9IGI7XG5cbiAgICB0aGlzLnVwZGF0ZVNoYWRlckNvZGUoKTtcbiAgICB0aGlzLnVwZGF0ZUN1bGxGYWNlKCk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG5cbiAgICAvLyA9PSBjb3B5IG1lbWJlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5jdXRvZmYgPSBzb3VyY2UuY3V0b2ZmO1xuICAgIHRoaXMuY29sb3IuY29weShzb3VyY2UuY29sb3IpO1xuICAgIHRoaXMuc2hhZGVDb2xvci5jb3B5KHNvdXJjZS5zaGFkZUNvbG9yKTtcbiAgICB0aGlzLm1hcCA9IHNvdXJjZS5tYXA7XG4gICAgdGhpcy5tYWluVGV4X1NULmNvcHkoc291cmNlLm1haW5UZXhfU1QpO1xuICAgIHRoaXMuc2hhZGVUZXh0dXJlID0gc291cmNlLnNoYWRlVGV4dHVyZTtcbiAgICB0aGlzLmJ1bXBTY2FsZSA9IHNvdXJjZS5idW1wU2NhbGU7XG4gICAgdGhpcy5ub3JtYWxNYXAgPSBzb3VyY2Uubm9ybWFsTWFwO1xuICAgIHRoaXMucmVjZWl2ZVNoYWRvd1JhdGUgPSBzb3VyY2UucmVjZWl2ZVNoYWRvd1JhdGU7XG4gICAgdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZSA9IHNvdXJjZS5yZWNlaXZlU2hhZG93VGV4dHVyZTtcbiAgICB0aGlzLnNoYWRpbmdHcmFkZVJhdGUgPSBzb3VyY2Uuc2hhZGluZ0dyYWRlUmF0ZTtcbiAgICB0aGlzLnNoYWRpbmdHcmFkZVRleHR1cmUgPSBzb3VyY2Uuc2hhZGluZ0dyYWRlVGV4dHVyZTtcbiAgICB0aGlzLnNoYWRlU2hpZnQgPSBzb3VyY2Uuc2hhZGVTaGlmdDtcbiAgICB0aGlzLnNoYWRlVG9vbnkgPSBzb3VyY2Uuc2hhZGVUb29ueTtcbiAgICB0aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbiA9IHNvdXJjZS5saWdodENvbG9yQXR0ZW51YXRpb247XG4gICAgdGhpcy5pbmRpcmVjdExpZ2h0SW50ZW5zaXR5ID0gc291cmNlLmluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XG4gICAgdGhpcy5yaW1UZXh0dXJlID0gc291cmNlLnJpbVRleHR1cmU7XG4gICAgdGhpcy5yaW1Db2xvci5jb3B5KHNvdXJjZS5yaW1Db2xvcik7XG4gICAgdGhpcy5yaW1MaWdodGluZ01peCA9IHNvdXJjZS5yaW1MaWdodGluZ01peDtcbiAgICB0aGlzLnJpbUZyZXNuZWxQb3dlciA9IHNvdXJjZS5yaW1GcmVzbmVsUG93ZXI7XG4gICAgdGhpcy5yaW1MaWZ0ID0gc291cmNlLnJpbUxpZnQ7XG4gICAgdGhpcy5zcGhlcmVBZGQgPSBzb3VyY2Uuc3BoZXJlQWRkO1xuICAgIHRoaXMuZW1pc3Npb25Db2xvci5jb3B5KHNvdXJjZS5lbWlzc2lvbkNvbG9yKTtcbiAgICB0aGlzLmVtaXNzaXZlTWFwID0gc291cmNlLmVtaXNzaXZlTWFwO1xuICAgIHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhUZXh0dXJlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoID0gc291cmNlLm91dGxpbmVXaWR0aDtcbiAgICB0aGlzLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZSA9IHNvdXJjZS5vdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2U7XG4gICAgdGhpcy5vdXRsaW5lQ29sb3IuY29weShzb3VyY2Uub3V0bGluZUNvbG9yKTtcbiAgICB0aGlzLm91dGxpbmVMaWdodGluZ01peCA9IHNvdXJjZS5vdXRsaW5lTGlnaHRpbmdNaXg7XG5cbiAgICB0aGlzLmRlYnVnTW9kZSA9IHNvdXJjZS5kZWJ1Z01vZGU7XG4gICAgdGhpcy5ibGVuZE1vZGUgPSBzb3VyY2UuYmxlbmRNb2RlO1xuICAgIHRoaXMub3V0bGluZVdpZHRoTW9kZSA9IHNvdXJjZS5vdXRsaW5lV2lkdGhNb2RlO1xuICAgIHRoaXMub3V0bGluZUNvbG9yTW9kZSA9IHNvdXJjZS5vdXRsaW5lQ29sb3JNb2RlO1xuICAgIHRoaXMuY3VsbE1vZGUgPSBzb3VyY2UuY3VsbE1vZGU7XG4gICAgdGhpcy5vdXRsaW5lQ3VsbE1vZGUgPSBzb3VyY2Uub3V0bGluZUN1bGxNb2RlO1xuXG4gICAgdGhpcy5pc091dGxpbmUgPSBzb3VyY2UuaXNPdXRsaW5lO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdXBkYXRlZCB1bmlmb3JtIHZhcmlhYmxlcy5cbiAgICogU3Ryb25nbHkgcmVjb21tZW5kZWQgdG8gY2FsbCB0aGlzIGluIGBPYmplY3QzRC5vbkJlZm9yZVJlbmRlcmAgLlxuICAgKi9cbiAgcHVibGljIGFwcGx5VW5pZm9ybXMoKSB7XG4gICAgaWYgKCF0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zaG91bGRBcHBseVVuaWZvcm1zID0gZmFsc2U7XG5cbiAgICB0aGlzLnVuaWZvcm1zLmN1dG9mZi52YWx1ZSA9IHRoaXMuY3V0b2ZmO1xuICAgIHRoaXMudW5pZm9ybXMuY29sb3IudmFsdWUuc2V0UkdCKHRoaXMuY29sb3IueCwgdGhpcy5jb2xvci55LCB0aGlzLmNvbG9yLnopO1xuICAgIGlmICghdGhpcy5fY29sb3JTcGFjZUdhbW1hKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zLmNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICB9XG4gICAgdGhpcy51bmlmb3Jtcy5jb2xvckFscGhhLnZhbHVlID0gdGhpcy5jb2xvci53O1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvci52YWx1ZS5zZXRSR0IodGhpcy5zaGFkZUNvbG9yLngsIHRoaXMuc2hhZGVDb2xvci55LCB0aGlzLnNoYWRlQ29sb3Iueik7XG4gICAgaWYgKCF0aGlzLl9jb2xvclNwYWNlR2FtbWEpIHtcbiAgICAgIHRoaXMudW5pZm9ybXMuc2hhZGVDb2xvci52YWx1ZS5jb252ZXJ0U1JHQlRvTGluZWFyKCk7XG4gICAgfVxuICAgIHRoaXMudW5pZm9ybXMubWFwLnZhbHVlID0gdGhpcy5tYXA7XG4gICAgdGhpcy51bmlmb3Jtcy5tYWluVGV4X1NULnZhbHVlLmNvcHkodGhpcy5tYWluVGV4X1NUKTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVGV4dHVyZS52YWx1ZSA9IHRoaXMuc2hhZGVUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMuYnVtcFNjYWxlLnZhbHVlID0gdGhpcy5idW1wU2NhbGU7XG4gICAgdGhpcy51bmlmb3Jtcy5ub3JtYWxNYXAudmFsdWUgPSB0aGlzLm5vcm1hbE1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dSYXRlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93UmF0ZTtcbiAgICB0aGlzLnVuaWZvcm1zLnJlY2VpdmVTaGFkb3dUZXh0dXJlLnZhbHVlID0gdGhpcy5yZWNlaXZlU2hhZG93VGV4dHVyZTtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRpbmdHcmFkZVJhdGUudmFsdWUgPSB0aGlzLnNoYWRpbmdHcmFkZVJhdGU7XG4gICAgdGhpcy51bmlmb3Jtcy5zaGFkaW5nR3JhZGVUZXh0dXJlLnZhbHVlID0gdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMuc2hhZGVTaGlmdC52YWx1ZSA9IHRoaXMuc2hhZGVTaGlmdDtcbiAgICB0aGlzLnVuaWZvcm1zLnNoYWRlVG9vbnkudmFsdWUgPSB0aGlzLnNoYWRlVG9vbnk7XG4gICAgdGhpcy51bmlmb3Jtcy5saWdodENvbG9yQXR0ZW51YXRpb24udmFsdWUgPSB0aGlzLmxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcbiAgICB0aGlzLnVuaWZvcm1zLmluZGlyZWN0TGlnaHRJbnRlbnNpdHkudmFsdWUgPSB0aGlzLmluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1UZXh0dXJlLnZhbHVlID0gdGhpcy5yaW1UZXh0dXJlO1xuICAgIHRoaXMudW5pZm9ybXMucmltQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMucmltQ29sb3IueCwgdGhpcy5yaW1Db2xvci55LCB0aGlzLnJpbUNvbG9yLnopO1xuICAgIGlmICghdGhpcy5fY29sb3JTcGFjZUdhbW1hKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zLnJpbUNvbG9yLnZhbHVlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTtcbiAgICB9XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1MaWdodGluZ01peC52YWx1ZSA9IHRoaXMucmltTGlnaHRpbmdNaXg7XG4gICAgdGhpcy51bmlmb3Jtcy5yaW1GcmVzbmVsUG93ZXIudmFsdWUgPSB0aGlzLnJpbUZyZXNuZWxQb3dlcjtcbiAgICB0aGlzLnVuaWZvcm1zLnJpbUxpZnQudmFsdWUgPSB0aGlzLnJpbUxpZnQ7XG4gICAgdGhpcy51bmlmb3Jtcy5zcGhlcmVBZGQudmFsdWUgPSB0aGlzLnNwaGVyZUFkZDtcbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaW9uQ29sb3IudmFsdWUuc2V0UkdCKHRoaXMuZW1pc3Npb25Db2xvci54LCB0aGlzLmVtaXNzaW9uQ29sb3IueSwgdGhpcy5lbWlzc2lvbkNvbG9yLnopO1xuICAgIGlmICghdGhpcy5fY29sb3JTcGFjZUdhbW1hKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaW9uQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgIH1cbiAgICB0aGlzLnVuaWZvcm1zLmVtaXNzaXZlTWFwLnZhbHVlID0gdGhpcy5lbWlzc2l2ZU1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVXaWR0aFRleHR1cmUudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aFRleHR1cmU7XG4gICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lV2lkdGgudmFsdWUgPSB0aGlzLm91dGxpbmVXaWR0aDtcbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZS52YWx1ZSA9IHRoaXMub3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xuICAgIHRoaXMudW5pZm9ybXMub3V0bGluZUNvbG9yLnZhbHVlLnNldFJHQih0aGlzLm91dGxpbmVDb2xvci54LCB0aGlzLm91dGxpbmVDb2xvci55LCB0aGlzLm91dGxpbmVDb2xvci56KTtcbiAgICBpZiAoIXRoaXMuX2NvbG9yU3BhY2VHYW1tYSkge1xuICAgICAgdGhpcy51bmlmb3Jtcy5vdXRsaW5lQ29sb3IudmFsdWUuY29udmVydFNSR0JUb0xpbmVhcigpO1xuICAgIH1cbiAgICB0aGlzLnVuaWZvcm1zLm91dGxpbmVMaWdodGluZ01peC52YWx1ZSA9IHRoaXMub3V0bGluZUxpZ2h0aW5nTWl4O1xuXG4gICAgdGhpcy51cGRhdGVDdWxsRmFjZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTaGFkZXJDb2RlKCkge1xuICAgIHRoaXMuZGVmaW5lcyA9IHtcbiAgICAgIE9VVExJTkU6IHRoaXMuX2lzT3V0bGluZSxcbiAgICAgIEJMRU5ETU9ERV9PUEFRVUU6IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25SZW5kZXJNb2RlLk9wYXF1ZSxcbiAgICAgIEJMRU5ETU9ERV9DVVRPVVQ6IHRoaXMuX2JsZW5kTW9kZSA9PT0gTVRvb25SZW5kZXJNb2RlLkN1dG91dCxcbiAgICAgIEJMRU5ETU9ERV9UUkFOU1BBUkVOVDpcbiAgICAgICAgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vblJlbmRlck1vZGUuVHJhbnNwYXJlbnQgfHwgdGhpcy5fYmxlbmRNb2RlID09PSBNVG9vblJlbmRlck1vZGUuVHJhbnNwYXJlbnRXaXRoWldyaXRlLFxuICAgICAgVVNFX1NIQURFVEVYVFVSRTogdGhpcy5zaGFkZVRleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkU6IHRoaXMucmVjZWl2ZVNoYWRvd1RleHR1cmUgIT09IG51bGwsXG4gICAgICBVU0VfU0hBRElOR0dSQURFVEVYVFVSRTogdGhpcy5zaGFkaW5nR3JhZGVUZXh0dXJlICE9PSBudWxsLFxuICAgICAgVVNFX1JJTVRFWFRVUkU6IHRoaXMucmltVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIFVTRV9TUEhFUkVBREQ6IHRoaXMuc3BoZXJlQWRkICE9PSBudWxsLFxuICAgICAgVVNFX09VVExJTkVXSURUSFRFWFRVUkU6IHRoaXMub3V0bGluZVdpZHRoVGV4dHVyZSAhPT0gbnVsbCxcbiAgICAgIERFQlVHX05PUk1BTDogdGhpcy5fZGVidWdNb2RlID09PSBNVG9vbkRlYnVnTW9kZS5Ob3JtYWwsXG4gICAgICBERUJVR19MSVRTSEFERVJBVEU6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25EZWJ1Z01vZGUuTGl0U2hhZGVSYXRlLFxuICAgICAgREVCVUdfVVY6IHRoaXMuX2RlYnVnTW9kZSA9PT0gTVRvb25EZWJ1Z01vZGUuVVYsXG4gICAgICBPVVRMSU5FX1dJRFRIX1dPUkxEOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk91dGxpbmVXaWR0aE1vZGUuV29ybGRDb29yZGluYXRlcyxcbiAgICAgIE9VVExJTkVfV0lEVEhfU0NSRUVOOiB0aGlzLl9vdXRsaW5lV2lkdGhNb2RlID09PSBNVG9vbk91dGxpbmVXaWR0aE1vZGUuU2NyZWVuQ29vcmRpbmF0ZXMsXG4gICAgICBPVVRMSU5FX0NPTE9SX0ZJWEVEOiB0aGlzLl9vdXRsaW5lQ29sb3JNb2RlID09PSBNVG9vbk91dGxpbmVDb2xvck1vZGUuRml4ZWRDb2xvcixcbiAgICAgIE9VVExJTkVfQ09MT1JfTUlYRUQ6IHRoaXMuX291dGxpbmVDb2xvck1vZGUgPT09IE1Ub29uT3V0bGluZUNvbG9yTW9kZS5NaXhlZExpZ2h0aW5nLFxuICAgIH07XG5cbiAgICAvLyA9PSB0ZXh0dXJlIGVuY29kaW5ncyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgY29uc3QgZW5jb2RpbmdzID1cbiAgICAgICh0aGlzLnNoYWRlVGV4dHVyZSAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbignc2hhZGVUZXh0dXJlVGV4ZWxUb0xpbmVhcicsIHRoaXMuc2hhZGVUZXh0dXJlLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpICtcbiAgICAgICh0aGlzLnNwaGVyZUFkZCAhPT0gbnVsbFxuICAgICAgICA/IGdldFRleGVsRGVjb2RpbmdGdW5jdGlvbignc3BoZXJlQWRkVGV4ZWxUb0xpbmVhcicsIHRoaXMuc3BoZXJlQWRkLmVuY29kaW5nKSArICdcXG4nXG4gICAgICAgIDogJycpO1xuXG4gICAgLy8gPT0gZ2VuZXJhdGUgc2hhZGVyIGNvZGUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudmVydGV4U2hhZGVyID0gcmVxdWlyZSgnLi9zaGFkZXJzL210b29uLnZlcnQnKTtcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZW5jb2RpbmdzICsgcmVxdWlyZSgnLi9zaGFkZXJzL210b29uLmZyYWcnKTtcblxuICAgIC8vID09IHNldCBuZWVkc1VwZGF0ZSBmbGFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VsbEZhY2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3V0bGluZSkge1xuICAgICAgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uQ3VsbE1vZGUuT2ZmKSB7XG4gICAgICAgIHRoaXMuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uQ3VsbE1vZGUuRnJvbnQpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VsbE1vZGUgPT09IE1Ub29uQ3VsbE1vZGUuQmFjaykge1xuICAgICAgICB0aGlzLnNpZGUgPSBUSFJFRS5Gcm9udFNpZGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm91dGxpbmVDdWxsTW9kZSA9PT0gTVRvb25DdWxsTW9kZS5PZmYpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vdXRsaW5lQ3VsbE1vZGUgPT09IE1Ub29uQ3VsbE1vZGUuRnJvbnQpIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuQmFja1NpZGU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3V0bGluZUN1bGxNb2RlID09PSBNVG9vbkN1bGxNb2RlLkJhY2spIHtcbiAgICAgICAgdGhpcy5zaWRlID0gVEhSRUUuRnJvbnRTaWRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1Ub29uUGFyYW1ldGVycyBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyB7XG4gIGN1dG9mZj86IG51bWJlcjsgLy8gX0N1dG9mZlxuICBjb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIHJnYiBvZiBfQ29sb3JcbiAgc2hhZGVDb2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9TaGFkZUNvbG9yXG4gIG1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4XG4gIG1haW5UZXg/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleCAod2lsbCBiZSByZW5hbWVkIHRvIG1hcClcbiAgbWFpblRleF9TVD86IFRIUkVFLlZlY3RvcjQ7IC8vIF9NYWluVGV4X1NUXG4gIHNoYWRlVGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9TaGFkZVRleHR1cmVcbiAgYnVtcFNjYWxlPzogbnVtYmVyOyAvLyBfQnVtcFNjYWxlXG4gIG5vcm1hbE1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9CdW1wTWFwXG4gIGJ1bXBNYXA/OiBUSFJFRS5UZXh0dXJlOyAvLyBfQnVtcE1hcCAod2lsbCBiZSByZW5hbWVkIHRvIG5vcm1hbE1hcClcbiAgcmVjZWl2ZVNoYWRvd1JhdGU/OiBudW1iZXI7IC8vIF9SZWNlaXZlU2hhZG93UmF0ZVxuICByZWNlaXZlU2hhZG93VGV4dHVyZT86IFRIUkVFLlRleHR1cmU7IC8vIF9SZWNlaXZlU2hhZG93VGV4dHVyZVxuICBzaGFkaW5nR3JhZGVSYXRlPzogbnVtYmVyOyAvLyBfU2hhZGluZ0dyYWRlUmF0ZVxuICBzaGFkaW5nR3JhZGVUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX1NoYWRpbmdHcmFkZVRleHR1cmVcbiAgc2hhZGVTaGlmdD86IG51bWJlcjsgLy8gX1NoYWRlU2hpZnRcbiAgc2hhZGVUb29ueT86IG51bWJlcjsgLy8gX1NoYWRlVG9vbnlcbiAgbGlnaHRDb2xvckF0dGVudWF0aW9uPzogbnVtYmVyOyAvLyBfTGlnaHRDb2xvckF0dGVudWF0aW9uXG4gIGluZGlyZWN0TGlnaHRJbnRlbnNpdHk/OiBudW1iZXI7IC8vIF9JbmRpcmVjdExpZ2h0SW50ZW5zaXR5XG4gIHJpbVRleHR1cmU/OiBUSFJFRS5UZXh0dXJlOyAvLyBfUmltVGV4dHVyZVxuICByaW1Db2xvcj86IFRIUkVFLlZlY3RvcjQ7IC8vIF9SaW1Db2xvclxuICByaW1MaWdodGluZ01peD86IG51bWJlcjsgLy8gX1JpbUxpZ2h0aW5nTWl4XG4gIHJpbUZyZXNuZWxQb3dlcj86IG51bWJlcjsgLy8gX1JpbUZyZXNuZWxQb3dlclxuICByaW1MaWZ0PzogbnVtYmVyOyAvLyBfUmltTGlmdFxuICBzcGhlcmVBZGQ/OiBUSFJFRS5UZXh0dXJlOyAvLyBfU3BoZXJlQWRkXG4gIGVtaXNzaW9uQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfRW1pc3Npb25Db2xvclxuICBlbWlzc2l2ZU1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9FbWlzc2lvbk1hcFxuICBlbWlzc2lvbk1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9FbWlzc2lvbk1hcCAod2lsbCBiZSByZW5hbWVkIHRvIGVtaXNzaXZlTWFwKVxuICBvdXRsaW5lV2lkdGhUZXh0dXJlPzogVEhSRUUuVGV4dHVyZTsgLy8gX091dGxpbmVXaWR0aFRleHR1cmVcbiAgb3V0bGluZVdpZHRoPzogbnVtYmVyOyAvLyBfT3V0bGluZVdpZHRoXG4gIG91dGxpbmVTY2FsZWRNYXhEaXN0YW5jZT86IG51bWJlcjsgLy8gX091dGxpbmVTY2FsZWRNYXhEaXN0YW5jZVxuICBvdXRsaW5lQ29sb3I/OiBUSFJFRS5WZWN0b3I0OyAvLyBfT3V0bGluZUNvbG9yXG4gIG91dGxpbmVMaWdodGluZ01peD86IG51bWJlcjsgLy8gX091dGxpbmVMaWdodGluZ01peFxuXG4gIGRlYnVnTW9kZT86IE1Ub29uRGVidWdNb2RlIHwgbnVtYmVyOyAvLyBfRGVidWdNb2RlXG4gIGJsZW5kTW9kZT86IE1Ub29uUmVuZGVyTW9kZSB8IG51bWJlcjsgLy8gX0JsZW5kTW9kZVxuICBvdXRsaW5lV2lkdGhNb2RlPzogTVRvb25PdXRsaW5lV2lkdGhNb2RlIHwgbnVtYmVyOyAvLyBPdXRsaW5lV2lkdGhNb2RlXG4gIG91dGxpbmVDb2xvck1vZGU/OiBNVG9vbk91dGxpbmVDb2xvck1vZGUgfCBudW1iZXI7IC8vIE91dGxpbmVDb2xvck1vZGVcbiAgY3VsbE1vZGU/OiBNVG9vbkN1bGxNb2RlIHwgbnVtYmVyOyAvLyBfQ3VsbE1vZGVcbiAgb3V0bGluZUN1bGxNb2RlPzogTVRvb25DdWxsTW9kZSB8IG51bWJlcjsgLy8gX091dGxpbmVDdWxsTW9kZVxuICBzcmNCbGVuZD86IG51bWJlcjsgLy8gX1NyY0JsZW5kXG4gIGRzdEJsZW5kPzogbnVtYmVyOyAvLyBfRHN0QmxlbmRcbiAgeldyaXRlPzogbnVtYmVyOyAvLyBfWldyaXRlICh3aWxsIGJlIHJlbmFtZWQgdG8gZGVwdGhXcml0ZSlcblxuICBpc091dGxpbmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZW51bSBNVG9vbkN1bGxNb2RlIHtcbiAgT2ZmLFxuICBGcm9udCxcbiAgQmFjayxcbn1cblxuZXhwb3J0IGVudW0gTVRvb25EZWJ1Z01vZGUge1xuICBOb25lLFxuICBOb3JtYWwsXG4gIExpdFNoYWRlUmF0ZSxcbiAgVVYsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uT3V0bGluZUNvbG9yTW9kZSB7XG4gIEZpeGVkQ29sb3IsXG4gIE1peGVkTGlnaHRpbmcsXG59XG5cbmV4cG9ydCBlbnVtIE1Ub29uT3V0bGluZVdpZHRoTW9kZSB7XG4gIE5vbmUsXG4gIFdvcmxkQ29vcmRpbmF0ZXMsXG4gIFNjcmVlbkNvb3JkaW5hdGVzLFxufVxuXG5leHBvcnQgZW51bSBNVG9vblJlbmRlck1vZGUge1xuICBPcGFxdWUsXG4gIEN1dG91dCxcbiAgVHJhbnNwYXJlbnQsXG4gIFRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IEdMVEZNZXNoLCBHTFRGUHJpbWl0aXZlLCBSYXdWcm0sIFJhd1ZybU1hdGVyaWFsIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTVRvb24sIE1Ub29uT3V0bGluZVdpZHRoTW9kZSwgTVRvb25SZW5kZXJNb2RlIH0gZnJvbSAnLi9NVG9vbic7XG5pbXBvcnQgeyBVbmxpdCwgVW5saXRSZW5kZXJUeXBlIH0gZnJvbSAnLi9VbmxpdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWxDb252ZXJ0ZXJPcHRpb25zIHtcbiAgcmVxdWVzdEVudk1hcD86ICgpID0+IFByb21pc2U8VEhSRUUuVGV4dHVyZSB8IG51bGw+O1xufVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDb252ZXJ0ZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IF9jb2xvclNwYWNlR2FtbWE6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgX29wdGlvbnM6IE1hdGVyaWFsQ29udmVydGVyT3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihjb2xvclNwYWNlR2FtbWE6IGJvb2xlYW4sIG9wdGlvbnM6IE1hdGVyaWFsQ29udmVydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5fY29sb3JTcGFjZUdhbW1hID0gY29sb3JTcGFjZUdhbW1hO1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbnZlcnRHTFRGTWF0ZXJpYWxzKGdsdGY6IFRIUkVFLkdMVEYpOiBQcm9taXNlPFRIUkVFLkdMVEY+IHtcbiAgICBjb25zdCBtZXNoZXNNYXA6IEdMVEZNZXNoW10gPSBhd2FpdCBnbHRmLnBhcnNlci5nZXREZXBlbmRlbmNpZXMoJ21lc2gnKTtcbiAgICBjb25zdCBtYXRlcmlhbExpc3Q6IHsgW3ZybU1hdGVyaWFsSW5kZXg6IG51bWJlcl06IHsgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7IG91dGxpbmU/OiBUSFJFRS5NYXRlcmlhbCB9IH0gPSB7fTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgbWVzaGVzTWFwLm1hcChhc3luYyAobWVzaCwgbWVzaEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZXM6IEdMVEZQcmltaXRpdmVbXSA9XG4gICAgICAgICAgbWVzaC50eXBlID09PSAnR3JvdXAnID8gKG1lc2guY2hpbGRyZW4gYXMgR0xURlByaW1pdGl2ZVtdKSA6IFttZXNoIGFzIEdMVEZQcmltaXRpdmVdO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICBwcmltaXRpdmVzLm1hcChhc3luYyAocHJpbWl0aXZlLCBwcmltaXRpdmVJbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgcHJpbWl0aXZlcyBtYXRlcmlhbCBpcyBub3QgYW4gYXJyYXksIG1ha2UgaXQgYW4gYXJyYXlcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcmltaXRpdmUubWF0ZXJpYWwpKSB7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbCA9IFtwcmltaXRpdmUubWF0ZXJpYWxdO1xuICAgICAgICAgICAgICAocHJpbWl0aXZlLmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5KS5hZGRHcm91cChcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIChwcmltaXRpdmUuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnkpLmluZGV4LmNvdW50LFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSAvIHB1c2ggdG8gY2FjaGUgKG9yIHBvcCBmcm9tIGNhY2hlKSB2cm0gbWF0ZXJpYWxzXG4gICAgICAgICAgICBjb25zdCB2cm1NYXRlcmlhbEluZGV4ID0gZ2x0Zi5wYXJzZXIuanNvbi5tZXNoZXMhW21lc2hJbmRleF0ucHJpbWl0aXZlc1twcmltaXRpdmVJbmRleF0ubWF0ZXJpYWwhO1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSAoZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zIS5WUk0gYXMgUmF3VnJtKS5tYXRlcmlhbFByb3BlcnRpZXMhW3ZybU1hdGVyaWFsSW5kZXhdO1xuICAgICAgICAgICAgbGV0IHZybU1hdGVyaWFsczogeyBzdXJmYWNlOiBUSFJFRS5NYXRlcmlhbDsgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsIH07XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWxMaXN0W3ZybU1hdGVyaWFsSW5kZXhdKSB7XG4gICAgICAgICAgICAgIHZybU1hdGVyaWFscyA9IG1hdGVyaWFsTGlzdFt2cm1NYXRlcmlhbEluZGV4XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZybU1hdGVyaWFscyA9IGF3YWl0IHRoaXMuY3JlYXRlVlJNTWF0ZXJpYWxzKHByaW1pdGl2ZS5tYXRlcmlhbFswXSwgcHJvcHMsIGdsdGYpO1xuICAgICAgICAgICAgICBtYXRlcmlhbExpc3RbdnJtTWF0ZXJpYWxJbmRleF0gPSB2cm1NYXRlcmlhbHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN1cmZhY2VcbiAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbFswXSA9IHZybU1hdGVyaWFscy5zdXJmYWNlO1xuXG4gICAgICAgICAgICAvLyBlbnZtYXBcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnJlcXVlc3RFbnZNYXApIHtcbiAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5yZXF1ZXN0RW52TWFwKCkudGhlbigoZW52TWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgKHZybU1hdGVyaWFscy5zdXJmYWNlIGFzIGFueSkuZW52TWFwID0gZW52TWFwO1xuICAgICAgICAgICAgICAgIHZybU1hdGVyaWFscy5zdXJmYWNlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlbmRlciBvcmRlclxuICAgICAgICAgICAgcHJpbWl0aXZlLnJlbmRlck9yZGVyID0gcHJvcHMucmVuZGVyUXVldWUgfHwgMjAwMDtcblxuICAgICAgICAgICAgLy8gb3V0bGluZSAoXCIyIHBhc3Mgc2hhZGluZyB1c2luZyBncm91cHNcIiB0cmljayBoZXJlKVxuICAgICAgICAgICAgaWYgKHZybU1hdGVyaWFscy5vdXRsaW5lKSB7XG4gICAgICAgICAgICAgIHByaW1pdGl2ZS5tYXRlcmlhbFsxXSA9IHZybU1hdGVyaWFscy5vdXRsaW5lO1xuICAgICAgICAgICAgICAocHJpbWl0aXZlLmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5KS5hZGRHcm91cChcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIChwcmltaXRpdmUuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnkpLmluZGV4LmNvdW50LFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGF0dGFjaCBgbWF0ZXJpYWwuYXBwbHlVbmlmb3Jtc2AgdG8gYG1lc2gub25CZWZvcmVSZW5kZXJgXG4gICAgICAgICAgICBwcmltaXRpdmUub25CZWZvcmVSZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIChwcmltaXRpdmUubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWxbXSkuZm9yRWFjaCgobXRsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKChtdGwgYXMgYW55KS5hcHBseVVuaWZvcm1zKSB7XG4gICAgICAgICAgICAgICAgICAobXRsIGFzIGFueSkuYXBwbHlVbmlmb3JtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHJldHVybiBnbHRmO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNyZWF0ZVZSTU1hdGVyaWFscyhcbiAgICBvcmlnaW5hbE1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCxcbiAgICB2cm1Qcm9wczogUmF3VnJtTWF0ZXJpYWwsXG4gICAgZ2x0ZjogVEhSRUUuR0xURixcbiAgKTogUHJvbWlzZTx7XG4gICAgc3VyZmFjZTogVEhSRUUuTWF0ZXJpYWw7XG4gICAgb3V0bGluZT86IFRIUkVFLk1hdGVyaWFsO1xuICB9PiB7XG4gICAgbGV0IG5ld1N1cmZhY2U6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkO1xuICAgIGxldCBuZXdPdXRsaW5lOiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZDtcblxuICAgIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vTVRvb24nKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCB0aGlzLmV4dHJhY3RNYXRlcmlhbFByb3BlcnRpZXMob3JpZ2luYWxNYXRlcmlhbCwgdnJtUHJvcHMsIGdsdGYpO1xuXG4gICAgICAvLyB3ZSBuZWVkIHRvIGdldCByaWQgb2YgdGhlc2UgcHJvcGVydGllc1xuICAgICAgWydzcmNCbGVuZCcsICdkc3RCbGVuZCcsICdpc0ZpcnN0U2V0dXAnXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGlmIChwYXJhbXNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSBwYXJhbXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGVzZSB0ZXh0dXJlcyBtdXN0IGJlIHNSR0IgRW5jb2RpbmcsIGRlcGVuZHMgb24gY3VycmVudCBjb2xvcnNwYWNlXG4gICAgICBbJ21haW5UZXgnLCAnc2hhZGVUZXh0dXJlJywgJ2VtaXNzaW9uJywgJ3NwaGVyZUFkZCddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKHBhcmFtc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGFyYW1zW25hbWVdLmVuY29kaW5nID0gdGhpcy5fY29sb3JTcGFjZUdhbW1hID8gVEhSRUUuTGluZWFyRW5jb2RpbmcgOiBUSFJFRS5zUkdCRW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBkb25lXG4gICAgICBuZXdTdXJmYWNlID0gbmV3IE1Ub29uKHRoaXMuX2NvbG9yU3BhY2VHYW1tYSwgcGFyYW1zKTtcblxuICAgICAgLy8gb3V0bGluZVxuICAgICAgaWYgKHBhcmFtcy5vdXRsaW5lV2lkdGhNb2RlICE9PSBNVG9vbk91dGxpbmVXaWR0aE1vZGUuTm9uZSkge1xuICAgICAgICBwYXJhbXMuaXNPdXRsaW5lID0gdHJ1ZTtcbiAgICAgICAgbmV3T3V0bGluZSA9IG5ldyBNVG9vbih0aGlzLl9jb2xvclNwYWNlR2FtbWEsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUZXh0dXJlJykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVW5saXRSZW5kZXJUeXBlLk9wYXF1ZTtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVW5saXQocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdEN1dG91dCcpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFVubGl0UmVuZGVyVHlwZS5DdXRvdXQ7XG4gICAgICBuZXdTdXJmYWNlID0gbmV3IFVubGl0KHBhcmFtcyk7XG4gICAgfSBlbHNlIGlmICh2cm1Qcm9wcy5zaGFkZXIgPT09ICdWUk0vVW5saXRUcmFuc3BhcmVudCcpIHtcbiAgICAgIC8vIHRoaXMgaXMgdmVyeSBsZWdhY3lcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGF3YWl0IHRoaXMuZXh0cmFjdE1hdGVyaWFsUHJvcGVydGllcyhvcmlnaW5hbE1hdGVyaWFsLCB2cm1Qcm9wcywgZ2x0Zik7XG4gICAgICBwYXJhbXMucmVuZGVyVHlwZSA9IFVubGl0UmVuZGVyVHlwZS5UcmFuc3BhcmVudDtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVW5saXQocGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKHZybVByb3BzLnNoYWRlciA9PT0gJ1ZSTS9VbmxpdFRyYW5zcGFyZW50WldyaXRlJykge1xuICAgICAgLy8gdGhpcyBpcyB2ZXJ5IGxlZ2FjeVxuICAgICAgY29uc3QgcGFyYW1zID0gYXdhaXQgdGhpcy5leHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKG9yaWdpbmFsTWF0ZXJpYWwsIHZybVByb3BzLCBnbHRmKTtcbiAgICAgIHBhcmFtcy5yZW5kZXJUeXBlID0gVW5saXRSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZTtcbiAgICAgIG5ld1N1cmZhY2UgPSBuZXcgVW5saXQocGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZybVByb3BzLnNoYWRlciAhPT0gJ1ZSTV9VU0VfR0xURlNIQURFUicpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBVbmtub3duIHNoYWRlciBkZXRlY3RlZDogXCIke3ZybVByb3BzLnNoYWRlcn1cImApO1xuICAgICAgICAvLyB0aGVuIHByZXN1bWUgYXMgVlJNX1VTRV9HTFRGU0hBREVSXG4gICAgICB9XG5cbiAgICAgIG5ld1N1cmZhY2UgPSB0aGlzLmNvbnZlcnRHTFRGTWF0ZXJpYWwob3JpZ2luYWxNYXRlcmlhbC5jbG9uZSgpKTtcbiAgICB9XG5cbiAgICBuZXdTdXJmYWNlLm5hbWUgPSBvcmlnaW5hbE1hdGVyaWFsLm5hbWU7XG4gICAgbmV3U3VyZmFjZS51c2VyRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxNYXRlcmlhbC51c2VyRGF0YSkpO1xuICAgIG5ld1N1cmZhY2UudXNlckRhdGEudnJtTWF0ZXJpYWxQcm9wZXJ0aWVzID0gdnJtUHJvcHM7XG5cbiAgICBpZiAobmV3T3V0bGluZSkge1xuICAgICAgbmV3T3V0bGluZS5uYW1lID0gb3JpZ2luYWxNYXRlcmlhbC5uYW1lICsgJyAoT3V0bGluZSknO1xuICAgICAgbmV3T3V0bGluZS51c2VyRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxNYXRlcmlhbC51c2VyRGF0YSkpO1xuICAgICAgbmV3T3V0bGluZS51c2VyRGF0YS52cm1NYXRlcmlhbFByb3BlcnRpZXMgPSB2cm1Qcm9wcztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VyZmFjZTogbmV3U3VyZmFjZSxcbiAgICAgIG91dGxpbmU6IG5ld091dGxpbmUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuYW1lTWF0ZXJpYWxQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVlJNTWF0ZXJpYWxzOiBHaXZlbiBwcm9wZXJ0eSBuYW1lIFwiJHtuYW1lfVwiIG1pZ2h0IGJlIGludmFsaWRgKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMSk7XG5cbiAgICBpZiAoIS9bQS1aXS8udGVzdChuYW1lWzBdKSkge1xuICAgICAgY29uc29sZS53YXJuKGBWUk1NYXRlcmlhbHM6IEdpdmVuIHByb3BlcnR5IG5hbWUgXCIke25hbWV9XCIgbWlnaHQgYmUgaW52YWxpZGApO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydEdMVEZNYXRlcmlhbChtYXRlcmlhbDogVEhSRUUuTWF0ZXJpYWwpOiBUSFJFRS5NYXRlcmlhbCB7XG4gICAgaWYgKChtYXRlcmlhbCBhcyBhbnkpLmlzTWVzaFN0YW5kYXJkTWF0ZXJpYWwpIHtcbiAgICAgIGNvbnN0IG10bCA9IG1hdGVyaWFsIGFzIFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsO1xuXG4gICAgICBpZiAodGhpcy5fY29sb3JTcGFjZUdhbW1hKSB7XG4gICAgICAgIGlmIChtdGwubWFwKSB7XG4gICAgICAgICAgbXRsLm1hcC5lbmNvZGluZyA9IFRIUkVFLkxpbmVhckVuY29kaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtdGwuZW1pc3NpdmVNYXApIHtcbiAgICAgICAgICBtdGwuZW1pc3NpdmVNYXAuZW5jb2RpbmcgPSBUSFJFRS5MaW5lYXJFbmNvZGluZztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKG10bCBhcyBhbnkpLmNvbG9yLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTsgLy8gVE9ETzogYGFzIGFueWAgaXMgdGVtcG9yYWwsIHNpbmNlIHRoZXJlIGFyZSBubyBkZWNsYXJhdGlvbiBpbiBAdHlwZXMvdGhyZWVcbiAgICAgICAgKG10bCBhcyBhbnkpLmVtaXNzaXZlLmNvbnZlcnRTUkdCVG9MaW5lYXIoKTsgLy8gVE9ETzogYGFzIGFueWAgaXMgdGVtcG9yYWwsIHNpbmNlIHRoZXJlIGFyZSBubyBkZWNsYXJhdGlvbiBpbiBAdHlwZXMvdGhyZWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKG1hdGVyaWFsIGFzIGFueSkuaXNNZXNoQmFzaWNNYXRlcmlhbCkge1xuICAgICAgY29uc3QgbXRsID0gbWF0ZXJpYWwgYXMgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWw7XG5cbiAgICAgIGlmICh0aGlzLl9jb2xvclNwYWNlR2FtbWEpIHtcbiAgICAgICAgaWYgKG10bC5tYXApIHtcbiAgICAgICAgICBtdGwubWFwLmVuY29kaW5nID0gVEhSRUUuTGluZWFyRW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChtdGwgYXMgYW55KS5jb2xvci5jb252ZXJ0U1JHQlRvTGluZWFyKCk7IC8vIFRPRE86IGBhcyBhbnlgIGlzIHRlbXBvcmFsLCBzaW5jZSB0aGVyZSBhcmUgbm8gZGVjbGFyYXRpb24gaW4gQHR5cGVzL3RocmVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGVyaWFsO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0TWF0ZXJpYWxQcm9wZXJ0aWVzKFxuICAgIG9yaWdpbmFsTWF0ZXJpYWw6IFRIUkVFLk1hdGVyaWFsLFxuICAgIHZybVByb3BzOiBSYXdWcm1NYXRlcmlhbCxcbiAgICBnbHRmOiBUSFJFRS5HTFRGLFxuICApOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhc2tMaXN0OiBBcnJheTxQcm9taXNlPGFueT4+ID0gW107XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIC8vIGV4dHJhY3QgdGV4dHVyZSBwcm9wZXJ0aWVzXG4gICAgaWYgKHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMudGV4dHVyZVByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLnJlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG4gICAgICAgIGNvbnN0IHRleHR1cmVJbmRleCA9IHZybVByb3BzLnRleHR1cmVQcm9wZXJ0aWVzW25hbWVdO1xuXG4gICAgICAgIHRhc2tMaXN0LnB1c2goXG4gICAgICAgICAgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgndGV4dHVyZScsIHRleHR1cmVJbmRleCkudGhlbigodGV4dHVyZTogVEhSRUUuVGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgcGFyYW1zW25ld05hbWVdID0gdGV4dHVyZTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBleHRyYWN0IGZsb2F0IHByb3BlcnRpZXNcbiAgICBpZiAodnJtUHJvcHMuZmxvYXRQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMuZmxvYXRQcm9wZXJ0aWVzKSkge1xuICAgICAgICBjb25zdCBuZXdOYW1lID0gdGhpcy5yZW5hbWVNYXRlcmlhbFByb3BlcnR5KG5hbWUpO1xuICAgICAgICBwYXJhbXNbbmV3TmFtZV0gPSB2cm1Qcm9wcy5mbG9hdFByb3BlcnRpZXNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCB2ZWN0b3IgKGNvbG9yIHRiaCkgcHJvcGVydGllc1xuICAgIGlmICh2cm1Qcm9wcy52ZWN0b3JQcm9wZXJ0aWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXModnJtUHJvcHMudmVjdG9yUHJvcGVydGllcykpIHtcbiAgICAgICAgbGV0IG5ld05hbWUgPSB0aGlzLnJlbmFtZU1hdGVyaWFsUHJvcGVydHkobmFtZSk7XG5cbiAgICAgICAgLy8gaWYgdGhpcyBpcyB0ZXh0dXJlU1QgKHNhbWUgbmFtZSBhcyB0ZXh0dXJlIG5hbWUgaXRzZWxmKSwgYWRkICdfU1QnXG4gICAgICAgIC8vIHRoaXMgaXMgbXkgbW9zdCBmYXZvcml0ZSBNVG9vbiBmZWF0dXJlIHRiaFxuICAgICAgICBjb25zdCBpc1RleHR1cmVTVCA9IFtcbiAgICAgICAgICAnX01haW5UZXgnLFxuICAgICAgICAgICdfU2hhZGVUZXh0dXJlJyxcbiAgICAgICAgICAnX0J1bXBNYXAnLFxuICAgICAgICAgICdfUmVjZWl2ZVNoYWRvd1RleHR1cmUnLFxuICAgICAgICAgICdfU2hhZGluZ0dyYWRlVGV4dHVyZScsXG4gICAgICAgICAgJ19TcGhlcmVBZGQnLFxuICAgICAgICAgICdfRW1pc3Npb25NYXAnLFxuICAgICAgICAgICdfT3V0bGluZVdpZHRoVGV4dHVyZScsXG4gICAgICAgIF0uc29tZSgodGV4dHVyZU5hbWUpID0+IG5hbWUgPT09IHRleHR1cmVOYW1lKTtcbiAgICAgICAgaWYgKGlzVGV4dHVyZVNUKSB7XG4gICAgICAgICAgbmV3TmFtZSArPSAnX1NUJztcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtc1tuZXdOYW1lXSA9IG5ldyBUSFJFRS5WZWN0b3I0KC4uLnZybVByb3BzLnZlY3RvclByb3BlcnRpZXNbbmFtZV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IGYgKGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2lzc3Vlcy8xNzIpXG4gICAgaWYgKHZybVByb3BzLmtleXdvcmRNYXAhLl9BTFBIQVRFU1RfT04gJiYgcGFyYW1zLmJsZW5kTW9kZSA9PT0gTVRvb25SZW5kZXJNb2RlLk9wYXF1ZSkge1xuICAgICAgcGFyYW1zLmJsZW5kTW9kZSA9IE1Ub29uUmVuZGVyTW9kZS5DdXRvdXQ7XG4gICAgfVxuXG4gICAgLy8gc2V0IHdoZXRoZXIgaXQgbmVlZHMgc2tpbm5pbmcgYW5kIG1vcnBoaW5nIG9yIG5vdFxuICAgIHBhcmFtcy5za2lubmluZyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkuc2tpbm5pbmcgfHwgZmFsc2U7XG4gICAgcGFyYW1zLm1vcnBoVGFyZ2V0cyA9IChvcmlnaW5hbE1hdGVyaWFsIGFzIGFueSkubW9ycGhUYXJnZXRzIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5tb3JwaE5vcm1hbHMgPSAob3JpZ2luYWxNYXRlcmlhbCBhcyBhbnkpLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdCkudGhlbigoKSA9PiBwYXJhbXMpO1xuICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTptZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBtYXRlcmlhbCB0aGF0IGlzIGFuIGVxdWl2YWxlbnQgb2YgXCJWUk0vVW5saXQqKipcIiBvbiBWUk0gc3BlYywgdGhvc2UgbWF0ZXJpYWxzIGFyZSBhbHJlYWR5IGtpbmRhIGRlcHJlY2F0ZWQgdGhvdWdoLi4uXG4gKi9cbmV4cG9ydCBjbGFzcyBVbmxpdCBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsIHtcbiAgLyoqXG4gICAqIFJlYWRvbmx5IGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgdGhpcyBpcyBhIFVubGl0IG1hdGVyaWFsLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGlzVlJNVW5saXQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBjdXRvZmY6IG51bWJlciA9IDAuNTtcbiAgcHVibGljIG1hcDogVEhSRUUuVGV4dHVyZSB8IG51bGwgPSBudWxsOyAvLyBfTWFpblRleFxuICBwdWJsaWMgbWFpblRleF9TVDogVEhSRUUuVmVjdG9yNCA9IG5ldyBUSFJFRS5WZWN0b3I0KDAuMCwgMC4wLCAxLjAsIDEuMCk7IC8vIF9NYWluVGV4X1NUXG4gIHByaXZhdGUgX3JlbmRlclR5cGU6IFVubGl0UmVuZGVyVHlwZSA9IFVubGl0UmVuZGVyVHlwZS5PcGFxdWU7XG5cbiAgcHVibGljIHNob3VsZEFwcGx5VW5pZm9ybXM6IGJvb2xlYW4gPSB0cnVlOyAvLyB3aGVuIHRoaXMgaXMgdHJ1ZSwgYXBwbHlVbmlmb3JtcyBlZmZlY3RzXG5cbiAgY29uc3RydWN0b3IocGFyYW1ldGVycz86IFVubGl0UGFyYW1ldGVycykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAocGFyYW1ldGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbWV0ZXJzID0ge307XG4gICAgfVxuXG4gICAgLy8gPT0gZW5hYmxpbmcgYnVuY2ggb2Ygc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHBhcmFtZXRlcnMuZm9nID0gdHJ1ZTtcbiAgICBwYXJhbWV0ZXJzLmNsaXBwaW5nID0gdHJ1ZTtcblxuICAgIHBhcmFtZXRlcnMuc2tpbm5pbmcgPSBwYXJhbWV0ZXJzLnNraW5uaW5nIHx8IGZhbHNlO1xuICAgIHBhcmFtZXRlcnMubW9ycGhUYXJnZXRzID0gcGFyYW1ldGVycy5tb3JwaFRhcmdldHMgfHwgZmFsc2U7XG4gICAgcGFyYW1ldGVycy5tb3JwaE5vcm1hbHMgPSBwYXJhbWV0ZXJzLm1vcnBoTm9ybWFscyB8fCBmYWxzZTtcblxuICAgIC8vID09IHVuaWZvcm1zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBwYXJhbWV0ZXJzLnVuaWZvcm1zID0gVEhSRUUuVW5pZm9ybXNVdGlscy5tZXJnZShbXG4gICAgICBUSFJFRS5Vbmlmb3Jtc0xpYi5jb21tb24sIC8vIG1hcFxuICAgICAgVEhSRUUuVW5pZm9ybXNMaWIuZm9nLFxuICAgICAge1xuICAgICAgICBjdXRvZmY6IHsgdmFsdWU6IDAuNSB9LFxuICAgICAgICBtYWluVGV4X1NUOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yNCgwLjAsIDAuMCwgMS4wLCAxLjApIH0sXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gPT0gZmluYWxseSBjb21waWxlIHRoZSBzaGFkZXIgcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMuc2V0VmFsdWVzKHBhcmFtZXRlcnMpO1xuXG4gICAgLy8gPT0gdXBkYXRlIHNoYWRlciBzdHVmZiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMudXBkYXRlU2hhZGVyQ29kZSgpO1xuICB9XG5cbiAgZ2V0IG1haW5UZXgoKTogVEhSRUUuVGV4dHVyZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hcDtcbiAgfVxuXG4gIHNldCBtYWluVGV4KHQ6IFRIUkVFLlRleHR1cmUgfCBudWxsKSB7XG4gICAgdGhpcy5tYXAgPSB0O1xuICB9XG5cbiAgZ2V0IHJlbmRlclR5cGUoKTogVW5saXRSZW5kZXJUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyVHlwZTtcbiAgfVxuXG4gIHNldCByZW5kZXJUeXBlKHQ6IFVubGl0UmVuZGVyVHlwZSkge1xuICAgIHRoaXMuX3JlbmRlclR5cGUgPSB0O1xuXG4gICAgdGhpcy5kZXB0aFdyaXRlID0gdGhpcy5fcmVuZGVyVHlwZSAhPT0gVW5saXRSZW5kZXJUeXBlLlRyYW5zcGFyZW50O1xuICAgIHRoaXMudHJhbnNwYXJlbnQgPVxuICAgICAgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVW5saXRSZW5kZXJUeXBlLlRyYW5zcGFyZW50IHx8IHRoaXMuX3JlbmRlclR5cGUgPT09IFVubGl0UmVuZGVyVHlwZS5UcmFuc3BhcmVudFdpdGhaV3JpdGU7XG4gICAgdGhpcy51cGRhdGVTaGFkZXJDb2RlKCk7XG4gIH1cblxuICBwdWJsaWMgY29weShzb3VyY2U6IHRoaXMpOiB0aGlzIHtcbiAgICBzdXBlci5jb3B5KHNvdXJjZSk7XG5cbiAgICAvLyA9PSBjb3B5IG1lbWJlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgdGhpcy5jdXRvZmYgPSBzb3VyY2UuY3V0b2ZmO1xuICAgIHRoaXMubWFwID0gc291cmNlLm1hcDtcbiAgICB0aGlzLm1haW5UZXhfU1QuY29weShzb3VyY2UubWFpblRleF9TVCk7XG4gICAgdGhpcy5yZW5kZXJUeXBlID0gc291cmNlLnJlbmRlclR5cGU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB1cGRhdGVkIHVuaWZvcm0gdmFyaWFibGVzLlxuICAgKiBTdHJvbmdseSByZWNvbW1lbmRlZCB0byBjYWxsIHRoaXMgaW4gYE9iamVjdDNELm9uQmVmb3JlUmVuZGVyYCAuXG4gICAqL1xuICBwdWJsaWMgYXBwbHlVbmlmb3JtcygpIHtcbiAgICBpZiAoIXRoaXMuc2hvdWxkQXBwbHlVbmlmb3Jtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNob3VsZEFwcGx5VW5pZm9ybXMgPSBmYWxzZTtcblxuICAgIHRoaXMudW5pZm9ybXMuY3V0b2ZmLnZhbHVlID0gdGhpcy5jdXRvZmY7XG4gICAgdGhpcy51bmlmb3Jtcy5tYXAudmFsdWUgPSB0aGlzLm1hcDtcbiAgICB0aGlzLnVuaWZvcm1zLm1haW5UZXhfU1QudmFsdWUuY29weSh0aGlzLm1haW5UZXhfU1QpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTaGFkZXJDb2RlKCkge1xuICAgIHRoaXMuZGVmaW5lcyA9IHtcbiAgICAgIFJFTkRFUlRZUEVfT1BBUVVFOiB0aGlzLl9yZW5kZXJUeXBlID09PSBVbmxpdFJlbmRlclR5cGUuT3BhcXVlLFxuICAgICAgUkVOREVSVFlQRV9DVVRPVVQ6IHRoaXMuX3JlbmRlclR5cGUgPT09IFVubGl0UmVuZGVyVHlwZS5DdXRvdXQsXG4gICAgICBSRU5ERVJUWVBFX1RSQU5TUEFSRU5UOlxuICAgICAgICB0aGlzLl9yZW5kZXJUeXBlID09PSBVbmxpdFJlbmRlclR5cGUuVHJhbnNwYXJlbnQgfHwgdGhpcy5fcmVuZGVyVHlwZSA9PT0gVW5saXRSZW5kZXJUeXBlLlRyYW5zcGFyZW50V2l0aFpXcml0ZSxcbiAgICB9O1xuXG4gICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSByZXF1aXJlKCcuL3NoYWRlcnMvdW5saXQudmVydCcpO1xuICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSByZXF1aXJlKCcuL3NoYWRlcnMvdW5saXQuZnJhZycpO1xuXG4gICAgLy8gPT0gc2V0IG5lZWRzVXBkYXRlIGZsYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5saXRQYXJhbWV0ZXJzIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzIHtcbiAgY3V0b2ZmPzogbnVtYmVyOyAvLyBfQ3V0b2ZmXG4gIG1hcD86IFRIUkVFLlRleHR1cmU7IC8vIF9NYWluVGV4XG4gIG1haW5UZXg/OiBUSFJFRS5UZXh0dXJlOyAvLyBfTWFpblRleCAod2lsbCBiZSByZW5hbWVkIHRvIG1hcClcbiAgbWFpblRleF9TVD86IFRIUkVFLlZlY3RvcjQ7IC8vIF9NYWluVGV4X1NUXG5cbiAgcmVuZGVyVHlwZT86IFVubGl0UmVuZGVyVHlwZSB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gVW5saXRSZW5kZXJUeXBlIHtcbiAgT3BhcXVlLFxuICBDdXRvdXQsXG4gIFRyYW5zcGFyZW50LFxuICBUcmFuc3BhcmVudFdpdGhaV3JpdGUsXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01hdGVyaWFsQ29udmVydGVyJztcbiIsIm1vZHVsZS5leHBvcnRzID0gXCIvLyAjZGVmaW5lIFBIT05HXFxuXFxuI2lmZGVmIEJMRU5ETU9ERV9DVVRPVVRcXG4gIHVuaWZvcm0gZmxvYXQgY3V0b2ZmO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gdmVjMyBjb2xvcjtcXG51bmlmb3JtIGZsb2F0IGNvbG9yQWxwaGE7XFxudW5pZm9ybSB2ZWMzIHNoYWRlQ29sb3I7XFxuI2lmZGVmIFVTRV9TSEFERVRFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNoYWRlVGV4dHVyZTtcXG4jZW5kaWZcXG5cXG51bmlmb3JtIGZsb2F0IHJlY2VpdmVTaGFkb3dSYXRlO1xcbiNpZmRlZiBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHJlY2VpdmVTaGFkb3dUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgc2hhZGluZ0dyYWRlUmF0ZTtcXG4jaWZkZWYgVVNFX1NIQURJTkdHUkFERVRFWFRVUkVcXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHNoYWRpbmdHcmFkZVRleHR1cmU7XFxuI2VuZGlmXFxuXFxudW5pZm9ybSBmbG9hdCBzaGFkZVNoaWZ0O1xcbnVuaWZvcm0gZmxvYXQgc2hhZGVUb29ueTtcXG51bmlmb3JtIGZsb2F0IGxpZ2h0Q29sb3JBdHRlbnVhdGlvbjtcXG51bmlmb3JtIGZsb2F0IGluZGlyZWN0TGlnaHRJbnRlbnNpdHk7XFxuXFxuI2lmZGVmIFVTRV9SSU1URVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCByaW1UZXh0dXJlO1xcbiNlbmRpZlxcbnVuaWZvcm0gdmVjMyByaW1Db2xvcjtcXG51bmlmb3JtIGZsb2F0IHJpbUxpZ2h0aW5nTWl4O1xcbnVuaWZvcm0gZmxvYXQgcmltRnJlc25lbFBvd2VyO1xcbnVuaWZvcm0gZmxvYXQgcmltTGlmdDtcXG5cXG4jaWZkZWYgVVNFX1NQSEVSRUFERFxcbiAgdW5pZm9ybSBzYW1wbGVyMkQgc3BoZXJlQWRkO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gdmVjMyBlbWlzc2lvbkNvbG9yO1xcblxcbnVuaWZvcm0gdmVjMyBvdXRsaW5lQ29sb3I7XFxudW5pZm9ybSBmbG9hdCBvdXRsaW5lTGlnaHRpbmdNaXg7XFxuXFxuI2luY2x1ZGUgPGNvbW1vbj5cXG4jaW5jbHVkZSA8cGFja2luZz5cXG4jaW5jbHVkZSA8ZGl0aGVyaW5nX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGNvbG9yX3BhcnNfZnJhZ21lbnQ+XFxuXFxuLy8gI2luY2x1ZGUgPHV2X3BhcnNfZnJhZ21lbnQ+XFxuI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApXFxuICB2YXJ5aW5nIHZlYzIgdlV2O1xcbiNlbmRpZlxcblxcbiNpbmNsdWRlIDx1djJfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8bWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGFscGhhbWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGFvbWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGxpZ2h0bWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGVtaXNzaXZlbWFwX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPGVudm1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxncmFkaWVudG1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpbmNsdWRlIDxmb2dfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8YnNkZnM+XFxuI2luY2x1ZGUgPGxpZ2h0c19wYXJzX2JlZ2luPlxcblxcbi8vICNpbmNsdWRlIDxsaWdodHNfcGhvbmdfcGFyc19mcmFnbWVudD5cXG52YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcXG5cXG4jaWZuZGVmIEZMQVRfU0hBREVEXFxuICB2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG4jZW5kaWZcXG5cXG4jZGVmaW5lIE1hdGVyaWFsX0xpZ2h0UHJvYmVMT0QoIG1hdGVyaWFsICkgKDApXFxuXFxuI2luY2x1ZGUgPHNoYWRvd21hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxidW1wbWFwX3BhcnNfZnJhZ21lbnQ+XFxuXFxuLy8gI2luY2x1ZGUgPG5vcm1hbG1hcF9wYXJzX2ZyYWdtZW50PlxcbiNpZmRlZiBVU0VfTk9STUFMTUFQXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBub3JtYWxNYXA7XFxuICB1bmlmb3JtIGZsb2F0IGJ1bXBTY2FsZTtcXG5cXG4gIC8vIHRoaXMgbnVtYmVyIGlzIHZlcnkgcmFuZG9tLCB0aGlzIGlzIHN0aWxsIGEg5a++5Yem55mC5rOVXFxuICAjZGVmaW5lIFVWX0RFUklWQVRJVkVfRVBTSUxPTiAxRS02XFxuXFxuICAvLyBQZXItUGl4ZWwgVGFuZ2VudCBTcGFjZSBOb3JtYWwgTWFwcGluZ1xcbiAgLy8gaHR0cDovL2hhY2tzb2ZsaWZlLmJsb2dzcG90LmNoLzIwMDkvMTEvcGVyLXBpeGVsLXRhbmdlbnQtc3BhY2Utbm9ybWFsLW1hcHBpbmcuaHRtbFxcbiAgdmVjMyBwZXJ0dXJiTm9ybWFsMkFyYiggdmVjMyBleWVfcG9zLCB2ZWMzIHN1cmZfbm9ybSApIHtcXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgQWRyZW5vIDNYWCBkRmQqKCB2ZWMzICkgYnVnLiBTZWUgIzk5ODhcXG4gICAgdmVjMyBxMCA9IHZlYzMoIGRGZHgoIGV5ZV9wb3MueCApLCBkRmR4KCBleWVfcG9zLnkgKSwgZEZkeCggZXllX3Bvcy56ICkgKTtcXG4gICAgdmVjMyBxMSA9IHZlYzMoIGRGZHkoIGV5ZV9wb3MueCApLCBkRmR5KCBleWVfcG9zLnkgKSwgZEZkeSggZXllX3Bvcy56ICkgKTtcXG4gICAgdmVjMiBzdDAgPSBkRmR4KCB2VXYuc3QgKTtcXG4gICAgdmVjMiBzdDEgPSBkRmR5KCB2VXYuc3QgKTtcXG5cXG4gICAgZmxvYXQgc2NhbGUgPSBzaWduKCBzdDEudCAqIHN0MC5zIC0gc3QwLnQgKiBzdDEucyApOyAvLyB3ZSBkbyBub3QgY2FyZSBhYm91dCB0aGUgbWFnbml0dWRlXFxuICAgIHZlYzMgUyA9ICggcTAgKiBzdDEudCAtIHExICogc3QwLnQgKSAqIHNjYWxlO1xcbiAgICB2ZWMzIFQgPSAoIC0gcTAgKiBzdDEucyArIHExICogc3QwLnMgKSAqIHNjYWxlO1xcblxcbiAgICAvLyBTZWU6IGh0dHBzOi8vaHViLnZyb2lkLmNvbS9jaGFyYWN0ZXJzLzUyMDcyNzU4MTI4MjQ2ODczNjYvbW9kZWxzLzE2MzAyOTg0MDU4NDAzMDM1MDdcXG4gICAgaWYgKCBsZW5ndGgoIFMgKSA9PSAwLjAgfHwgbGVuZ3RoKCBUICkgPT0gMC4wICkge1xcbiAgICAgIHJldHVybiBzdXJmX25vcm07XFxuICAgIH1cXG5cXG4gICAgUyA9IG5vcm1hbGl6ZSggUyApO1xcbiAgICBUID0gbm9ybWFsaXplKCBUICk7XFxuXFxuICAgIHZlYzMgTiA9IG5vcm1hbGl6ZSggc3VyZl9ub3JtICk7XFxuICAgIG1hdDMgdHNuID0gbWF0MyggUywgVCwgTiApO1xcbiAgICB2ZWMzIG1hcE4gPSB0ZXh0dXJlMkQoIG5vcm1hbE1hcCwgdlV2ICkueHl6ICogMi4wIC0gMS4wO1xcbiAgICBtYXBOLnh5ICo9IGJ1bXBTY2FsZTtcXG4gICAgbWFwTi54eSAqPSAoIGZsb2F0KCBnbF9Gcm9udEZhY2luZyApICogMi4wIC0gMS4wICk7XFxuICAgIHJldHVybiBub3JtYWxpemUoIHRzbiAqIG1hcE4gKTtcXG4gIH1cXG4jZW5kaWZcXG5cXG4vLyAjaW5jbHVkZSA8c3BlY3VsYXJtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8bG9nZGVwdGhidWZfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3BhcnNfZnJhZ21lbnQ+XFxuXFxuLy8gPT0gbGlnaHRpbmcgc3R1ZmYgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG5mbG9hdCBnZXRMaWdodEludGVuc2l0eShcXG4gIGNvbnN0IGluIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQsXFxuICBjb25zdCBpbiBHZW9tZXRyaWNDb250ZXh0IGdlb21ldHJ5LFxcbiAgY29uc3QgaW4gZmxvYXQgc2hhZG93LFxcbiAgY29uc3QgaW4gZmxvYXQgc2hhZGluZ0dyYWRlXFxuKSB7XFxuICBmbG9hdCBsaWdodEludGVuc2l0eSA9IGRvdCggZ2VvbWV0cnkubm9ybWFsLCBkaXJlY3RMaWdodC5kaXJlY3Rpb24gKTtcXG4gIGxpZ2h0SW50ZW5zaXR5ID0gMC41ICsgMC41ICogbGlnaHRJbnRlbnNpdHk7XFxuICBsaWdodEludGVuc2l0eSA9IGxpZ2h0SW50ZW5zaXR5ICogc2hhZG93O1xcbiAgbGlnaHRJbnRlbnNpdHkgPSBsaWdodEludGVuc2l0eSAqIHNoYWRpbmdHcmFkZTtcXG4gIGxpZ2h0SW50ZW5zaXR5ID0gbGlnaHRJbnRlbnNpdHkgKiAyLjAgLSAxLjA7XFxuICByZXR1cm4gc21vb3Roc3RlcCggc2hhZGVTaGlmdCwgc2hhZGVTaGlmdCArICggMS4wIC0gc2hhZGVUb29ueSApLCBsaWdodEludGVuc2l0eSApO1xcbn1cXG5cXG52ZWMzIGdldExpZ2h0aW5nKCBjb25zdCBpbiB2ZWMzIGxpZ2h0Q29sb3IgKSB7XFxuICB2ZWMzIGxpZ2h0aW5nID0gbGlnaHRDb2xvcjtcXG4gIGxpZ2h0aW5nID0gbWl4KFxcbiAgICBsaWdodGluZyxcXG4gICAgdmVjMyggbWF4KCAwLjAwMSwgbWF4KCBsaWdodGluZy54LCBtYXgoIGxpZ2h0aW5nLnksIGxpZ2h0aW5nLnogKSApICkgKSxcXG4gICAgbGlnaHRDb2xvckF0dGVudWF0aW9uXFxuICApO1xcblxcbiAgI2lmbmRlZiBQSFlTSUNBTExZX0NPUlJFQ1RfTElHSFRTXFxuICAgIGxpZ2h0aW5nICo9IFBJO1xcbiAgI2VuZGlmXFxuXFxuICByZXR1cm4gbGlnaHRpbmc7XFxufVxcblxcbnZlYzMgZ2V0RGlmZnVzZShcXG4gIGNvbnN0IGluIHZlYzMgbGl0LFxcbiAgY29uc3QgaW4gdmVjMyBzaGFkZSxcXG4gIGNvbnN0IGluIGZsb2F0IGxpZ2h0SW50ZW5zaXR5LFxcbiAgY29uc3QgaW4gdmVjMyBsaWdodGluZ1xcbikge1xcbiAgI2lmZGVmIERFQlVHX0xJVFNIQURFUkFURVxcbiAgICByZXR1cm4gdmVjMyggQlJERl9EaWZmdXNlX0xhbWJlcnQoIGxpZ2h0SW50ZW5zaXR5ICogbGlnaHRpbmcgKSApO1xcbiAgI2VuZGlmXFxuXFxuICByZXR1cm4gbGlnaHRpbmcgKiBCUkRGX0RpZmZ1c2VfTGFtYmVydCggbWl4KCBzaGFkZSwgbGl0LCBsaWdodEludGVuc2l0eSApICk7XFxufVxcblxcbnZlYzMgY2FsY0RpcmVjdERpZmZ1c2UoXFxuICBjb25zdCBpbiB2ZWMzIGxpdCxcXG4gIGNvbnN0IGluIHZlYzMgc2hhZGUsXFxuICBpbiBHZW9tZXRyaWNDb250ZXh0IGdlb21ldHJ5LFxcbiAgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHRcXG4pIHtcXG4gIEluY2lkZW50TGlnaHQgZGlyZWN0TGlnaHQ7XFxuICB2ZWMzIGxpZ2h0aW5nU3VtID0gdmVjMyggMC4wICk7XFxuXFxuICBmbG9hdCBzaGFkaW5nR3JhZGUgPSAxLjA7XFxuICAjaWZkZWYgVVNFX1NIQURJTkdHUkFERVRFWFRVUkVcXG4gICAgc2hhZGluZ0dyYWRlID0gMS4wIC0gc2hhZGluZ0dyYWRlUmF0ZSAqICggMS4wIC0gdGV4dHVyZTJEKCBzaGFkaW5nR3JhZGVUZXh0dXJlLCB2VXYgKS5yICk7XFxuICAjZW5kaWZcXG5cXG4gIGZsb2F0IHJlY2VpdmVTaGFkb3cgPSByZWNlaXZlU2hhZG93UmF0ZTtcXG4gICNpZmRlZiBVU0VfUkVDRUlWRVNIQURPV1RFWFRVUkVcXG4gICAgcmVjZWl2ZVNoYWRvdyAqPSB0ZXh0dXJlMkQoIHJlY2VpdmVTaGFkb3dUZXh0dXJlLCB2VXYgKS5hO1xcbiAgI2VuZGlmXFxuXFxuICAjaWYgKCBOVU1fUE9JTlRfTElHSFRTID4gMCApXFxuICAgIFBvaW50TGlnaHQgcG9pbnRMaWdodDtcXG5cXG4gICAgI3ByYWdtYSB1bnJvbGxfbG9vcFxcbiAgICBmb3IgKCBpbnQgaSA9IDA7IGkgPCBOVU1fUE9JTlRfTElHSFRTOyBpICsrICkge1xcbiAgICAgIHBvaW50TGlnaHQgPSBwb2ludExpZ2h0c1sgaSBdO1xcbiAgICAgIGdldFBvaW50RGlyZWN0TGlnaHRJcnJhZGlhbmNlKCBwb2ludExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcXG5cXG4gICAgICBmbG9hdCBhdHRlbiA9IDEuMDtcXG4gICAgICAjaWZkZWYgVVNFX1NIQURPV01BUFxcbiAgICAgICAgYXR0ZW4gPSBhbGwoIGJ2ZWMyKCBwb2ludExpZ2h0LnNoYWRvdywgZGlyZWN0TGlnaHQudmlzaWJsZSApICkgPyBnZXRQb2ludFNoYWRvdyggcG9pbnRTaGFkb3dNYXBbIGkgXSwgcG9pbnRMaWdodC5zaGFkb3dNYXBTaXplLCBwb2ludExpZ2h0LnNoYWRvd0JpYXMsIHBvaW50TGlnaHQuc2hhZG93UmFkaXVzLCB2UG9pbnRTaGFkb3dDb29yZFsgaSBdLCBwb2ludExpZ2h0LnNoYWRvd0NhbWVyYU5lYXIsIHBvaW50TGlnaHQuc2hhZG93Q2FtZXJhRmFyICkgOiAxLjA7XFxuICAgICAgI2VuZGlmXFxuXFxuICAgICAgZmxvYXQgc2hhZG93ID0gMS4wIC0gcmVjZWl2ZVNoYWRvdyAqICggMS4wIC0gKCAwLjUgKyAwLjUgKiBhdHRlbiApICk7XFxuICAgICAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSBnZXRMaWdodEludGVuc2l0eSggZGlyZWN0TGlnaHQsIGdlb21ldHJ5LCBzaGFkb3csIHNoYWRpbmdHcmFkZSApO1xcbiAgICAgIHZlYzMgbGlnaHRpbmcgPSBnZXRMaWdodGluZyggZGlyZWN0TGlnaHQuY29sb3IgKTtcXG4gICAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIGxpdCwgc2hhZGUsIGxpZ2h0SW50ZW5zaXR5LCBsaWdodGluZyApO1xcbiAgICAgIGxpZ2h0aW5nU3VtICs9IGxpZ2h0aW5nO1xcbiAgICB9XFxuICAjZW5kaWZcXG5cXG4gICNpZiAoIE5VTV9TUE9UX0xJR0hUUyA+IDAgKVxcbiAgICBTcG90TGlnaHQgc3BvdExpZ2h0O1xcblxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wXFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9TUE9UX0xJR0hUUzsgaSArKyApIHtcXG4gICAgICBzcG90TGlnaHQgPSBzcG90TGlnaHRzWyBpIF07XFxuICAgICAgZ2V0U3BvdERpcmVjdExpZ2h0SXJyYWRpYW5jZSggc3BvdExpZ2h0LCBnZW9tZXRyeSwgZGlyZWN0TGlnaHQgKTtcXG5cXG4gICAgICBmbG9hdCBhdHRlbiA9IDEuMDtcXG4gICAgICAjaWZkZWYgVVNFX1NIQURPV01BUFxcbiAgICAgICAgYXR0ZW4gPSBhbGwoIGJ2ZWMyKCBzcG90TGlnaHQuc2hhZG93LCBkaXJlY3RMaWdodC52aXNpYmxlICkgKSA/IGdldFNoYWRvdyggc3BvdFNoYWRvd01hcFsgaSBdLCBzcG90TGlnaHQuc2hhZG93TWFwU2l6ZSwgc3BvdExpZ2h0LnNoYWRvd0JpYXMsIHNwb3RMaWdodC5zaGFkb3dSYWRpdXMsIHZTcG90U2hhZG93Q29vcmRbIGkgXSApIDogMS4wO1xcbiAgICAgICNlbmRpZlxcblxcbiAgICAgIGZsb2F0IHNoYWRvdyA9IDEuMCAtIHJlY2VpdmVTaGFkb3cgKiAoIDEuMCAtICggMC41ICsgMC41ICogYXR0ZW4gKSApO1xcbiAgICAgIGZsb2F0IGxpZ2h0SW50ZW5zaXR5ID0gZ2V0TGlnaHRJbnRlbnNpdHkoIGRpcmVjdExpZ2h0LCBnZW9tZXRyeSwgc2hhZG93LCBzaGFkaW5nR3JhZGUgKTtcXG4gICAgICB2ZWMzIGxpZ2h0aW5nID0gZ2V0TGlnaHRpbmcoIGRpcmVjdExpZ2h0LmNvbG9yICk7XFxuICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBnZXREaWZmdXNlKCBsaXQsIHNoYWRlLCBsaWdodEludGVuc2l0eSwgbGlnaHRpbmcgKTtcXG4gICAgICBsaWdodGluZ1N1bSArPSBsaWdodGluZztcXG4gICAgfVxcbiAgI2VuZGlmXFxuXFxuICAjaWYgKCBOVU1fRElSX0xJR0hUUyA+IDAgKVxcbiAgICBEaXJlY3Rpb25hbExpZ2h0IGRpcmVjdGlvbmFsTGlnaHQ7XFxuXFxuICAgICNwcmFnbWEgdW5yb2xsX2xvb3BcXG4gICAgZm9yICggaW50IGkgPSAwOyBpIDwgTlVNX0RJUl9MSUdIVFM7IGkgKysgKSB7XFxuICAgICAgZGlyZWN0aW9uYWxMaWdodCA9IGRpcmVjdGlvbmFsTGlnaHRzWyBpIF07XFxuICAgICAgZ2V0RGlyZWN0aW9uYWxEaXJlY3RMaWdodElycmFkaWFuY2UoIGRpcmVjdGlvbmFsTGlnaHQsIGdlb21ldHJ5LCBkaXJlY3RMaWdodCApO1xcblxcbiAgICAgIGZsb2F0IGF0dGVuID0gMS4wO1xcbiAgICAgICNpZmRlZiBVU0VfU0hBRE9XTUFQXFxuICAgICAgICBhdHRlbiA9IGFsbCggYnZlYzIoIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93LCBkaXJlY3RMaWdodC52aXNpYmxlICkgKSA/IGdldFNoYWRvdyggZGlyZWN0aW9uYWxTaGFkb3dNYXBbIGkgXSwgZGlyZWN0aW9uYWxMaWdodC5zaGFkb3dNYXBTaXplLCBkaXJlY3Rpb25hbExpZ2h0LnNoYWRvd0JpYXMsIGRpcmVjdGlvbmFsTGlnaHQuc2hhZG93UmFkaXVzLCB2RGlyZWN0aW9uYWxTaGFkb3dDb29yZFsgaSBdICkgOiAxLjA7XFxuICAgICAgI2VuZGlmXFxuXFxuICAgICAgZmxvYXQgc2hhZG93ID0gMS4wIC0gcmVjZWl2ZVNoYWRvdyAqICggMS4wIC0gKCAwLjUgKyAwLjUgKiBhdHRlbiApICk7XFxuICAgICAgZmxvYXQgbGlnaHRJbnRlbnNpdHkgPSBnZXRMaWdodEludGVuc2l0eSggZGlyZWN0TGlnaHQsIGdlb21ldHJ5LCBzaGFkb3csIHNoYWRpbmdHcmFkZSApO1xcbiAgICAgIHZlYzMgbGlnaHRpbmcgPSBnZXRMaWdodGluZyggZGlyZWN0TGlnaHQuY29sb3IgKTtcXG4gICAgICByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICs9IGdldERpZmZ1c2UoIGxpdCwgc2hhZGUsIGxpZ2h0SW50ZW5zaXR5LCBsaWdodGluZyApO1xcbiAgICAgIGxpZ2h0aW5nU3VtICs9IGxpZ2h0aW5nO1xcbiAgICB9XFxuICAjZW5kaWZcXG5cXG4gIHJldHVybiBsaWdodGluZ1N1bTtcXG59XFxuXFxuLy8gPT0gcG9zdCBjb3JyZWN0aW9uID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG52b2lkIHBvc3RDb3JyZWN0aW9uKCkge1xcbiAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPGVuY29kaW5nc19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxmb2dfZnJhZ21lbnQ+XFxuICAjaW5jbHVkZSA8cHJlbXVsdGlwbGllZF9hbHBoYV9mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxkaXRoZXJpbmdfZnJhZ21lbnQ+XFxufVxcblxcbi8vID09IG1haW4gcHJvY2VkdXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxudm9pZCBtYWluKCkge1xcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19mcmFnbWVudD5cXG5cXG4gICNpZmRlZiBERUJVR19VVlxcbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KCAwLjAsIDAuMCwgMC4wLCAxLjAgKTtcXG4gICAgI2lmIGRlZmluZWQoIFVTRV9NQVAgKSB8fCBkZWZpbmVkKCBVU0VfU0hBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX05PUk1BTE1BUCApIHx8IGRlZmluZWQoIFVTRV9SRUNFSVZFU0hBRE9XVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9TSEFESU5HR1JBREVURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1JJTVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfRU1JU1NJVkVNQVAgKSB8fCBkZWZpbmVkKCBVU0VfT1VUTElORVdJRFRIVEVYVFVSRSApXFxuICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggdlV2LCAwLjAsIDEuMCApO1xcbiAgICAjZW5kaWZcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICB2ZWM0IGRpZmZ1c2VDb2xvciA9IHZlYzQoIGNvbG9yLCBjb2xvckFscGhhICk7XFxuICBSZWZsZWN0ZWRMaWdodCByZWZsZWN0ZWRMaWdodCA9IFJlZmxlY3RlZExpZ2h0KCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICksIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSApO1xcbiAgdmVjMyB0b3RhbEVtaXNzaXZlUmFkaWFuY2UgPSBlbWlzc2lvbkNvbG9yO1xcblxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX2ZyYWdtZW50PlxcblxcbiAgLy8gI2luY2x1ZGUgPG1hcF9mcmFnbWVudD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIGRpZmZ1c2VDb2xvciAqPSBtYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIG1hcCwgdlV2ICkgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGNvbG9yX2ZyYWdtZW50PlxcbiAgLy8gI2luY2x1ZGUgPGFscGhhbWFwX2ZyYWdtZW50PlxcblxcbiAgLy8gLS0gTVRvb246IGFscGhhIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICAvLyAjaW5jbHVkZSA8YWxwaGF0ZXN0X2ZyYWdtZW50PlxcbiAgI2lmZGVmIEJMRU5ETU9ERV9DVVRPVVRcXG4gICAgaWYgKCBkaWZmdXNlQ29sb3IuYSA8PSBjdXRvZmYgKSB7IGRpc2NhcmQ7IH1cXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gICNpZmRlZiBCTEVORE1PREVfT1BBUVVFXFxuICAgIGRpZmZ1c2VDb2xvci5hID0gMS4wO1xcbiAgI2VuZGlmXFxuXFxuICAjaWYgZGVmaW5lZCggT1VUTElORSApICYmIGRlZmluZWQoIE9VVExJTkVfQ09MT1JfRklYRUQgKSAvLyBvbWl0dGluZyBEZWJ1Z01vZGVcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggb3V0bGluZUNvbG9yLCBkaWZmdXNlQ29sb3IuYSApO1xcbiAgICBwb3N0Q29ycmVjdGlvbigpO1xcbiAgICByZXR1cm47XFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxzcGVjdWxhcm1hcF9mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxub3JtYWxfZnJhZ21lbnRfYmVnaW4+XFxuXFxuICAjaWZkZWYgT1VUTElORVxcbiAgICBub3JtYWwgKj0gLTEuMDtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPG5vcm1hbF9mcmFnbWVudF9tYXBzPlxcblxcbiAgLy8gI2luY2x1ZGUgPGVtaXNzaXZlbWFwX2ZyYWdtZW50PlxcbiAgI2lmZGVmIFVTRV9FTUlTU0lWRU1BUFxcbiAgICB0b3RhbEVtaXNzaXZlUmFkaWFuY2UgKj0gZW1pc3NpdmVNYXBUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIGVtaXNzaXZlTWFwLCB2VXYgKSApLnJnYjtcXG4gICNlbmRpZlxcblxcbiAgaWYgKG5vcm1hbC56IDwgMC4wKSB7IC8vIFRPRE86IHRlbXBvcmFyeSB0cmVhdG1lbnQgYWdhaW5zdCBTbmFwZHJhZ29uIGlzc3VlXFxuICAgIG5vcm1hbCA9IC1ub3JtYWw7XFxuICB9XFxuXFxuICAjaWZkZWYgREVCVUdfTk9STUFMXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoIDAuNSArIDAuNSAqIG5vcm1hbCwgMS4wICk7XFxuICAgIHJldHVybjtcXG4gICNlbmRpZlxcblxcbiAgLy8gLS0gTVRvb246IGxpZ2h0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICAvLyBhY2N1bXVsYXRpb25cXG4gIC8vICNpbmNsdWRlIDxsaWdodHNfcGhvbmdfZnJhZ21lbnQ+XFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X2JlZ2luPlxcbiAgdmVjMyBsaXQgPSBkaWZmdXNlQ29sb3IucmdiO1xcbiAgdmVjMyBzaGFkZSA9IHNoYWRlQ29sb3I7XFxuICAjaWZkZWYgVVNFX1NIQURFVEVYVFVSRVxcbiAgICBzaGFkZSAqPSBzaGFkZVRleHR1cmVUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIHNoYWRlVGV4dHVyZSwgdlV2ICkgKS5yZ2I7XFxuICAjZW5kaWZcXG5cXG4gIEdlb21ldHJpY0NvbnRleHQgZ2VvbWV0cnk7XFxuXFxuICBnZW9tZXRyeS5wb3NpdGlvbiA9IC0gdlZpZXdQb3NpdGlvbjtcXG4gIGdlb21ldHJ5Lm5vcm1hbCA9IG5vcm1hbDtcXG4gIGdlb21ldHJ5LnZpZXdEaXIgPSBub3JtYWxpemUoIHZWaWV3UG9zaXRpb24gKTtcXG5cXG4gIHZlYzMgbGlnaHRpbmcgPSBjYWxjRGlyZWN0RGlmZnVzZSggZGlmZnVzZUNvbG9yLnJnYiwgc2hhZGUsIGdlb21ldHJ5LCByZWZsZWN0ZWRMaWdodCApO1xcblxcbiAgdmVjMyBpcnJhZGlhbmNlID0gZ2V0QW1iaWVudExpZ2h0SXJyYWRpYW5jZSggYW1iaWVudExpZ2h0Q29sb3IgKTtcXG4gICNpZiAoIE5VTV9IRU1JX0xJR0hUUyA+IDAgKVxcbiAgICAjcHJhZ21hIHVucm9sbF9sb29wXFxuICAgIGZvciAoIGludCBpID0gMDsgaSA8IE5VTV9IRU1JX0xJR0hUUzsgaSArKyApIHtcXG4gICAgICBpcnJhZGlhbmNlICs9IGdldEhlbWlzcGhlcmVMaWdodElycmFkaWFuY2UoIGhlbWlzcGhlcmVMaWdodHNbIGkgXSwgZ2VvbWV0cnkgKTtcXG4gICAgfVxcbiAgI2VuZGlmXFxuXFxuICAvLyAjaW5jbHVkZSA8bGlnaHRzX2ZyYWdtZW50X21hcHM+XFxuICAjaWZkZWYgVVNFX0xJR0hUTUFQXFxuICAgIHZlYzMgbGlnaHRNYXBJcnJhZGlhbmNlID0gdGV4dHVyZTJEKCBsaWdodE1hcCwgdlV2MiApLnJnYiAqIGxpZ2h0TWFwSW50ZW5zaXR5O1xcbiAgICAjaWZuZGVmIFBIWVNJQ0FMTFlfQ09SUkVDVF9MSUdIVFNcXG4gICAgICBsaWdodE1hcElycmFkaWFuY2UgKj0gUEk7IC8vIGZhY3RvciBvZiBQSSBzaG91bGQgbm90IGJlIHByZXNlbnQ7IGluY2x1ZGVkIGhlcmUgdG8gcHJldmVudCBicmVha2FnZVxcbiAgICAjZW5kaWZcXG4gICAgaXJyYWRpYW5jZSArPSBsaWdodE1hcElycmFkaWFuY2U7XFxuICAjZW5kaWZcXG5cXG4gIC8vICNpbmNsdWRlIDxsaWdodHNfZnJhZ21lbnRfZW5kPlxcbiAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICs9IGluZGlyZWN0TGlnaHRJbnRlbnNpdHkgKiBpcnJhZGlhbmNlICogQlJERl9EaWZmdXNlX0xhbWJlcnQoIGxpdCApO1xcblxcbiAgLy8gbW9kdWxhdGlvblxcbiAgI2luY2x1ZGUgPGFvbWFwX2ZyYWdtZW50PlxcblxcbiAgdmVjMyBjb2wgPSByZWZsZWN0ZWRMaWdodC5kaXJlY3REaWZmdXNlICsgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlO1xcblxcbiAgI2lmIGRlZmluZWQoIE9VVExJTkUgKSAmJiBkZWZpbmVkKCBPVVRMSU5FX0NPTE9SX01JWEVEICkgLy8gb21pdHRpbmcgRGVidWdNb2RlXFxuICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoXFxuICAgICAgb3V0bGluZUNvbG9yLnJnYiAqIG1peCggdmVjMyggMS4wICksIGNvbCwgb3V0bGluZUxpZ2h0aW5nTWl4ICksXFxuICAgICAgZGlmZnVzZUNvbG9yLmFcXG4gICAgKTtcXG4gICAgcG9zdENvcnJlY3Rpb24oKTtcXG4gICAgcmV0dXJuO1xcbiAgI2VuZGlmXFxuXFxuICAvLyAtLSBNVG9vbjogcGFyYW1ldHJpYyByaW0gbGlnaHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIHZlYzMgdmlld0RpciA9IG5vcm1hbGl6ZSggdlZpZXdQb3NpdGlvbiApO1xcbiAgdmVjMyByaW1NaXggPSBtaXgodmVjMygxLjApLCBsaWdodGluZyArIGluZGlyZWN0TGlnaHRJbnRlbnNpdHkgKiBpcnJhZGlhbmNlLCByaW1MaWdodGluZ01peCk7XFxuICB2ZWMzIHJpbSA9IHJpbUNvbG9yICogcG93KCBzYXR1cmF0ZSggMS4wIC0gZG90KCB2aWV3RGlyLCBub3JtYWwgKSArIHJpbUxpZnQgKSwgcmltRnJlc25lbFBvd2VyICk7XFxuICAjaWZkZWYgVVNFX1JJTVRFWFRVUkVcXG4gICAgcmltICo9IHRleHR1cmUyRCggcmltVGV4dHVyZSwgdlV2ICkucmdiO1xcbiAgI2VuZGlmXFxuICBjb2wgKz0gcmltO1xcblxcbiAgLy8gLS0gTVRvb246IGFkZGl0aXZlIG1hdGNhcCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuICAjaWZkZWYgVVNFX1NQSEVSRUFERFxcbiAgICB7XFxuICAgICAgdmVjMyB4ID0gbm9ybWFsaXplKCB2ZWMzKCB2aWV3RGlyLnosIDAuMCwgLXZpZXdEaXIueCApICk7XFxuICAgICAgdmVjMyB5ID0gY3Jvc3MoIHZpZXdEaXIsIHggKTsgLy8gZ3VhcmFudGVlZCB0byBiZSBub3JtYWxpemVkXFxuICAgICAgdmVjMiB1diA9IDAuNSArIDAuNSAqIHZlYzIoIGRvdCggeCwgbm9ybWFsICksIC1kb3QoIHksIG5vcm1hbCApICk7XFxuICAgICAgdmVjMyBtYXRjYXAgPSBzcGhlcmVBZGRUZXhlbFRvTGluZWFyKCB0ZXh0dXJlMkQoIHNwaGVyZUFkZCwgdXYgKSApLnh5ejtcXG4gICAgICBjb2wgKz0gbWF0Y2FwO1xcbiAgICB9XFxuICAjZW5kaWZcXG5cXG4gIC8vIC0tIE1Ub29uOiBFbWlzc2lvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbiAgY29sICs9IHRvdGFsRW1pc3NpdmVSYWRpYW5jZTtcXG5cXG4gIC8vICNpbmNsdWRlIDxlbnZtYXBfZnJhZ21lbnQ+XFxuXFxuICAvLyAtLSBBbG1vc3QgZG9uZSEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoIGNvbCwgZGlmZnVzZUNvbG9yLmEgKTtcXG4gIHBvc3RDb3JyZWN0aW9uKCk7XFxufVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcIi8vICNkZWZpbmUgUEhPTkdcXG5cXG52YXJ5aW5nIHZlYzMgdlZpZXdQb3NpdGlvbjtcXG5cXG4jaWZuZGVmIEZMQVRfU0hBREVEXFxuICB2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcXG4jZW5kaWZcXG5cXG4jaW5jbHVkZSA8Y29tbW9uPlxcblxcbi8vICNpbmNsdWRlIDx1dl9wYXJzX3ZlcnRleD5cXG4jaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFIClcXG4gIHZhcnlpbmcgdmVjMiB2VXY7XFxuICB1bmlmb3JtIHZlYzQgbWFpblRleF9TVDtcXG4jZW5kaWZcXG5cXG4jaW5jbHVkZSA8dXYyX3BhcnNfdmVydGV4Plxcbi8vICNpbmNsdWRlIDxkaXNwbGFjZW1lbnRtYXBfcGFyc192ZXJ0ZXg+XFxuLy8gI2luY2x1ZGUgPGVudm1hcF9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Y29sb3JfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGZvZ19wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8bW9ycGh0YXJnZXRfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPHNraW5uaW5nX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxzaGFkb3dtYXBfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc192ZXJ0ZXg+XFxuXFxuI2lmZGVmIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFXFxuICB1bmlmb3JtIHNhbXBsZXIyRCBvdXRsaW5lV2lkdGhUZXh0dXJlO1xcbiNlbmRpZlxcblxcbnVuaWZvcm0gZmxvYXQgb3V0bGluZVdpZHRoO1xcbnVuaWZvcm0gZmxvYXQgb3V0bGluZVNjYWxlZE1heERpc3RhbmNlO1xcblxcbnZvaWQgbWFpbigpIHtcXG5cXG4gIC8vICNpbmNsdWRlIDx1dl92ZXJ0ZXg+XFxuICAjaWYgZGVmaW5lZCggVVNFX01BUCApIHx8IGRlZmluZWQoIFVTRV9TSEFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfTk9STUFMTUFQICkgfHwgZGVmaW5lZCggVVNFX1JFQ0VJVkVTSEFET1dURVhUVVJFICkgfHwgZGVmaW5lZCggVVNFX1NIQURJTkdHUkFERVRFWFRVUkUgKSB8fCBkZWZpbmVkKCBVU0VfUklNVEVYVFVSRSApIHx8IGRlZmluZWQoIFVTRV9FTUlTU0lWRU1BUCApIHx8IGRlZmluZWQoIFVTRV9PVVRMSU5FV0lEVEhURVhUVVJFIClcXG4gICAgdlV2ID0gdmVjMiggbWFpblRleF9TVC5wICogdXYueCArIG1haW5UZXhfU1QucywgbWFpblRleF9TVC5xICogdXYueSArIG1haW5UZXhfU1QudCApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8dXYyX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxjb2xvcl92ZXJ0ZXg+XFxuXFxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPG1vcnBobm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2luYmFzZV92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5vcm1hbF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8ZGVmYXVsdG5vcm1hbF92ZXJ0ZXg+XFxuXFxuICAjaWZuZGVmIEZMQVRfU0hBREVEIC8vIE5vcm1hbCBjb21wdXRlZCB3aXRoIGRlcml2YXRpdmVzIHdoZW4gRkxBVF9TSEFERURcXG4gICAgdk5vcm1hbCA9IG5vcm1hbGl6ZSggdHJhbnNmb3JtZWROb3JtYWwgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cXG5cXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxcbiAgLy8gI2luY2x1ZGUgPGRpc3BsYWNlbWVudG1hcF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8cHJvamVjdF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc192ZXJ0ZXg+XFxuXFxuICB2Vmlld1Bvc2l0aW9uID0gLSBtdlBvc2l0aW9uLnh5ejtcXG5cXG4gIGZsb2F0IG91dGxpbmVUZXggPSAxLjA7XFxuXFxuICAjaWZkZWYgT1VUTElORVxcbiAgICAjaWZkZWYgVVNFX09VVExJTkVXSURUSFRFWFRVUkVcXG4gICAgICBvdXRsaW5lVGV4ID0gdGV4dHVyZTJEKCBvdXRsaW5lV2lkdGhUZXh0dXJlLCB2VXYgKS5yO1xcbiAgICAjZW5kaWZcXG5cXG4gICAgI2lmZGVmIE9VVExJTkVfV0lEVEhfV09STERcXG4gICAgICB2ZWMzIG91dGxpbmVPZmZzZXQgPSAwLjAxICogb3V0bGluZVdpZHRoICogb3V0bGluZVRleCAqIG5vcm1hbGl6ZSggb2JqZWN0Tm9ybWFsICk7XFxuICAgICAgZ2xfUG9zaXRpb24gKz0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIG91dGxpbmVPZmZzZXQsIDAuMCApO1xcbiAgICAjZW5kaWZcXG5cXG4gICAgI2lmZGVmIE9VVExJTkVfV0lEVEhfU0NSRUVOXFxuICAgICAgdmVjMyBjbGlwTm9ybWFsID0gKCBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggbm9ybWFsaXplKCBvYmplY3ROb3JtYWwgKSwgMC4wICkgKS54eXo7XFxuICAgICAgdmVjMiBwcm9qZWN0ZWROb3JtYWwgPSBub3JtYWxpemUoIGNsaXBOb3JtYWwueHkgKTtcXG4gICAgICBwcm9qZWN0ZWROb3JtYWwgKj0gbWluKCBnbF9Qb3NpdGlvbi53LCBvdXRsaW5lU2NhbGVkTWF4RGlzdGFuY2UgKTtcXG4gICAgICBwcm9qZWN0ZWROb3JtYWwueCAqPSBwcm9qZWN0aW9uTWF0cml4WyAwIF0ueCAvIHByb2plY3Rpb25NYXRyaXhbIDEgXS55O1xcbiAgICAgIGdsX1Bvc2l0aW9uLnh5ICs9IDAuMDEgKiBvdXRsaW5lV2lkdGggKiBwcm9qZWN0ZWROb3JtYWwueHk7XFxuICAgICNlbmRpZlxcblxcbiAgICBnbF9Qb3NpdGlvbi56ICs9IDFFLTYgKiBnbF9Qb3NpdGlvbi53OyAvLyBhbnRpLWFydGlmYWN0IG1hZ2ljXFxuICAjZW5kaWZcXG5cXG4gICNpbmNsdWRlIDx3b3JsZHBvc192ZXJ0ZXg+XFxuICAvLyAjaW5jbHVkZSA8ZW52bWFwX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxzaGFkb3dtYXBfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGZvZ192ZXJ0ZXg+XFxuXFxufVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcIiNpZmRlZiBSRU5ERVJUWVBFX0NVVE9VVFxcbiAgdW5pZm9ybSBmbG9hdCBjdXRvZmY7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPGNvbW1vbj5cXG4jaW5jbHVkZSA8Y29sb3JfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8dXZfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8dXYyX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPG1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxhbHBoYW1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxhb21hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxsaWdodG1hcF9wYXJzX2ZyYWdtZW50Plxcbi8vICNpbmNsdWRlIDxlbnZtYXBfcGFyc19mcmFnbWVudD5cXG4jaW5jbHVkZSA8Zm9nX3BhcnNfZnJhZ21lbnQ+XFxuLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfZnJhZ21lbnQ+XFxuI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19wYXJzX2ZyYWdtZW50Plxcblxcbi8vID09IG1haW4gcHJvY2VkdXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxudm9pZCBtYWluKCkge1xcbiAgI2luY2x1ZGUgPGNsaXBwaW5nX3BsYW5lc19mcmFnbWVudD5cXG5cXG4gIHZlYzQgZGlmZnVzZUNvbG9yID0gdmVjNCggMS4wICk7XFxuXFxuICAjaW5jbHVkZSA8bG9nZGVwdGhidWZfZnJhZ21lbnQ+XFxuXFxuICAvLyAjaW5jbHVkZSA8bWFwX2ZyYWdtZW50PlxcbiAgI2lmZGVmIFVTRV9NQVBcXG4gICAgZGlmZnVzZUNvbG9yICo9IG1hcFRleGVsVG9MaW5lYXIoIHRleHR1cmUyRCggbWFwLCB2VXYgKSApO1xcbiAgI2VuZGlmXFxuXFxuICAjaW5jbHVkZSA8Y29sb3JfZnJhZ21lbnQ+XFxuICAvLyAjaW5jbHVkZSA8YWxwaGFtYXBfZnJhZ21lbnQ+XFxuXFxuICAvLyBNVG9vbjogYWxwaGFcXG4gIC8vICNpbmNsdWRlIDxhbHBoYXRlc3RfZnJhZ21lbnQ+XFxuICAjaWZkZWYgUkVOREVSVFlQRV9DVVRPVVRcXG4gICAgaWYgKCBkaWZmdXNlQ29sb3IuYSA8PSBjdXRvZmYgKSB7IGRpc2NhcmQ7IH1cXG4gICAgZGlmZnVzZUNvbG9yLmEgPSAxLjA7XFxuICAjZW5kaWZcXG5cXG4gICNpZmRlZiBSRU5ERVJUWVBFX09QQVFVRVxcbiAgICBkaWZmdXNlQ29sb3IuYSA9IDEuMDtcXG4gICNlbmRpZlxcblxcbiAgLy8gI2luY2x1ZGUgPHNwZWN1bGFybWFwX2ZyYWdtZW50PlxcblxcbiAgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQgPSBSZWZsZWN0ZWRMaWdodCggdmVjMyggMC4wICksIHZlYzMoIDAuMCApLCB2ZWMzKCAwLjAgKSwgdmVjMyggMC4wICkgKTtcXG5cXG4gIC8vIGFjY3VtdWxhdGlvbiAoYmFrZWQgaW5kaXJlY3QgbGlnaHRpbmcgb25seSlcXG4gICNpZmRlZiBVU0VfTElHSFRNQVBcXG4gICAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICs9IHRleHR1cmUyRCggbGlnaHRNYXAsIHZVdjIgKS54eXogKiBsaWdodE1hcEludGVuc2l0eTtcXG4gICNlbHNlXFxuICAgIHJlZmxlY3RlZExpZ2h0LmluZGlyZWN0RGlmZnVzZSArPSB2ZWMzKCAxLjAgKTtcXG4gICNlbmRpZlxcblxcbiAgLy8gbW9kdWxhdGlvblxcbiAgLy8gI2luY2x1ZGUgPGFvbWFwX2ZyYWdtZW50PlxcblxcbiAgcmVmbGVjdGVkTGlnaHQuaW5kaXJlY3REaWZmdXNlICo9IGRpZmZ1c2VDb2xvci5yZ2I7XFxuICB2ZWMzIG91dGdvaW5nTGlnaHQgPSByZWZsZWN0ZWRMaWdodC5pbmRpcmVjdERpZmZ1c2U7XFxuXFxuICAvLyAjaW5jbHVkZSA8ZW52bWFwX2ZyYWdtZW50PlxcblxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCggb3V0Z29pbmdMaWdodCwgZGlmZnVzZUNvbG9yLmEgKTtcXG5cXG4gICNpbmNsdWRlIDxwcmVtdWx0aXBsaWVkX2FscGhhX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPHRvbmVtYXBwaW5nX2ZyYWdtZW50PlxcbiAgI2luY2x1ZGUgPGVuY29kaW5nc19mcmFnbWVudD5cXG4gICNpbmNsdWRlIDxmb2dfZnJhZ21lbnQ+XFxufVwiIiwibW9kdWxlLmV4cG9ydHMgPSBcIiNpbmNsdWRlIDxjb21tb24+XFxuXFxuLy8gI2luY2x1ZGUgPHV2X3BhcnNfdmVydGV4PlxcbiNpZmRlZiBVU0VfTUFQXFxuICB2YXJ5aW5nIHZlYzIgdlV2O1xcbiAgdW5pZm9ybSB2ZWM0IG1haW5UZXhfU1Q7XFxuI2VuZGlmXFxuXFxuI2luY2x1ZGUgPHV2Ml9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8ZW52bWFwX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjb2xvcl9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8Zm9nX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxtb3JwaHRhcmdldF9wYXJzX3ZlcnRleD5cXG4jaW5jbHVkZSA8c2tpbm5pbmdfcGFyc192ZXJ0ZXg+XFxuI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3BhcnNfdmVydGV4PlxcbiNpbmNsdWRlIDxjbGlwcGluZ19wbGFuZXNfcGFyc192ZXJ0ZXg+XFxuXFxudm9pZCBtYWluKCkge1xcblxcbiAgLy8gI2luY2x1ZGUgPHV2X3ZlcnRleD5cXG4gICNpZmRlZiBVU0VfTUFQXFxuICAgIHZVdiA9IHZlYzIoIG1haW5UZXhfU1QucCAqIHV2LnggKyBtYWluVGV4X1NULnMsIG1haW5UZXhfU1QucSAqIHV2LnkgKyBtYWluVGV4X1NULnQgKTtcXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPHV2Ml92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y29sb3JfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHNraW5iYXNlX3ZlcnRleD5cXG5cXG4gICNpZmRlZiBVU0VfRU5WTUFQXFxuXFxuICAjaW5jbHVkZSA8YmVnaW5ub3JtYWxfdmVydGV4PlxcbiAgI2luY2x1ZGUgPG1vcnBobm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxza2lubm9ybWFsX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxkZWZhdWx0bm9ybWFsX3ZlcnRleD5cXG5cXG4gICNlbmRpZlxcblxcbiAgI2luY2x1ZGUgPGJlZ2luX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxtb3JwaHRhcmdldF92ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8c2tpbm5pbmdfdmVydGV4PlxcbiAgI2luY2x1ZGUgPHByb2plY3RfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGxvZ2RlcHRoYnVmX3ZlcnRleD5cXG5cXG4gICNpbmNsdWRlIDx3b3JsZHBvc192ZXJ0ZXg+XFxuICAjaW5jbHVkZSA8Y2xpcHBpbmdfcGxhbmVzX3ZlcnRleD5cXG4gICNpbmNsdWRlIDxlbnZtYXBfdmVydGV4PlxcbiAgI2luY2x1ZGUgPGZvZ192ZXJ0ZXg+XFxuXFxufVwiIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY29uc3QgZ2V0RW5jb2RpbmdDb21wb25lbnRzID0gKGVuY29kaW5nOiBUSFJFRS5UZXh0dXJlRW5jb2RpbmcpID0+IHtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgVEhSRUUuTGluZWFyRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydMaW5lYXInLCAnKCB2YWx1ZSApJ107XG4gICAgY2FzZSBUSFJFRS5zUkdCRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydzUkdCJywgJyggdmFsdWUgKSddO1xuICAgIGNhc2UgVEhSRUUuUkdCRUVuY29kaW5nOlxuICAgICAgcmV0dXJuIFsnUkdCRScsICcoIHZhbHVlICknXTtcbiAgICBjYXNlIFRIUkVFLlJHQk03RW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JNJywgJyggdmFsdWUsIDcuMCApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JNMTZFbmNvZGluZzpcbiAgICAgIHJldHVybiBbJ1JHQk0nLCAnKCB2YWx1ZSwgMTYuMCApJ107XG4gICAgY2FzZSBUSFJFRS5SR0JERW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydSR0JEJywgJyggdmFsdWUsIDI1Ni4wICknXTtcbiAgICBjYXNlIFRIUkVFLkdhbW1hRW5jb2Rpbmc6XG4gICAgICByZXR1cm4gWydHYW1tYScsICcoIHZhbHVlLCBmbG9hdCggR0FNTUFfRkFDVE9SICkgKSddO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGV4ZWxEZWNvZGluZ0Z1bmN0aW9uID0gKGZ1bmN0aW9uTmFtZTogc3RyaW5nLCBlbmNvZGluZzogVEhSRUUuVGV4dHVyZUVuY29kaW5nKSA9PiB7XG4gIGNvbnN0IGNvbXBvbmVudHMgPSBnZXRFbmNvZGluZ0NvbXBvbmVudHMoZW5jb2RpbmcpO1xuICByZXR1cm4gJ3ZlYzQgJyArIGZ1bmN0aW9uTmFtZSArICcoIHZlYzQgdmFsdWUgKSB7IHJldHVybiAnICsgY29tcG9uZW50c1swXSArICdUb0xpbmVhcicgKyBjb21wb25lbnRzWzFdICsgJzsgfSc7XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgZ2V0V29ybGRRdWF0ZXJuaW9uTGl0ZSB9IGZyb20gJy4uL3V0aWxzL21hdGgnO1xuLy8gYmFzZWQgb25cbi8vIGh0dHA6Ly9yb2NrZXRqdW1wLnNrci5qcC91bml0eTNkLzEwOS9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzXG5cbmV4cG9ydCBjb25zdCBHSVpNT19SRU5ERVJfT1JERVIgPSAxMDAwMDtcbmV4cG9ydCBjb25zdCBJREVOVElUWV9NQVRSSVg0ID0gT2JqZWN0LmZyZWV6ZShuZXcgVEhSRUUuTWF0cml4NCgpKTtcbmNvbnN0IElERU5USVRZX1FVQVRFUk5JT04gPSBPYmplY3QuZnJlZXplKG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkpO1xuXG4vLyDoqIjnrpfkuK3jga7kuIDmmYLkv53lrZjnlKjlpInmlbDvvIjkuIDluqbjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvZzjgaPjgZ/jgonjgYLjgajjga/kvb/jgYTlm57jgZnvvIlcbmNvbnN0IF92M0EgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3YzQiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfdjNDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9xdWF0QSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfbWF0QSA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfbWF0QiA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5cbi8qKlxuICogQSBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIHNwcmluZyBib25lIG9mIGEgVlJNLlxuICogSXQgc2hvdWxkIGJlIG1hbmFnZWQgYnkgYSBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyXV0uXG4gKi9cbmV4cG9ydCBjbGFzcyBWUk1TcHJpbmdCb25lIHtcbiAgLyoqXG4gICAqIFJhZGl1cyBvZiB0aGUgYm9uZSwgd2lsbCBiZSB1c2VkIGZvciBjb2xsaXNpb24uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgcmFkaXVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN0aWZmbmVzcyBmb3JjZSBvZiB0aGUgYm9uZS4gSW5jcmVhc2luZyB0aGUgdmFsdWUgPSBmYXN0ZXIgY29udmVyZ2VuY2UgKGZlZWxzIFwiaGFyZGVyXCIpLlxuICAgKiBPbiBVbmlWUk0sIGl0cyByYW5nZSBvbiBHVUkgaXMgYmV0d2VlbiBgMC4wYCBhbmQgYDQuMGAgLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHN0aWZmbmVzc0ZvcmNlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFBvd2VyIG9mIHRoZSBncmF2aXR5IGFnYWluc3QgdGhpcyBib25lLlxuICAgKiBUaGUgXCJwb3dlclwiIHVzZWQgaW4gaGVyZSBpcyB2ZXJ5IGZhciBmcm9tIHNjaWVudGlmaWMgcGh5c2ljcyB0ZXJtLi4uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZ3Jhdml0eVBvd2VyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIERpcmVjdGlvbiBvZiB0aGUgZ3Jhdml0eSBhZ2FpbnN0IHRoaXMgYm9uZS5cbiAgICogVXN1YWxseSBpdCBzaG91bGQgYmUgbm9ybWFsaXplZC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBncmF2aXR5RGlyOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBEcmFnIGZvcmNlIG9mIHRoZSBib25lLiBJbmNyZWFzaW5nIHRoZSB2YWx1ZSA9IGxlc3Mgb3NjaWxsYXRpb24gKGZlZWxzIFwiaGVhdmllclwiKS5cbiAgICogT24gVW5pVlJNLCBpdHMgcmFuZ2Ugb24gR1VJIGlzIGJldHdlZW4gYDAuMGAgYW5kIGAxLjBgIC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBkcmFnRm9yY2U6IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gT2JqZWN0M0QgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJvbmU6IFRIUkVFLk9iamVjdDNEO1xuXG4gIC8qKlxuICAgKiBDb2xsaWRlcnMgKGFzIGBUSFJFRS5NZXNoYCApIGF0dGFjaGVkIHRvIHRoaXMgYm9uZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBjb2xsaWRlcnM6IFRIUkVFLk1lc2hbXTtcblxuICAvKipcbiAgICogQ3VycmVudCBwb3NpdGlvbiBvZiBjaGlsZCB0YWlsLCBpbiB3b3JsZCB1bml0LiBXaWxsIGJlIHVzZWQgZm9yIHZlcmxldCBpbnRlZ3JhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBjdXJyZW50VGFpbDogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogUHJldmlvdXMgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gd29ybGQgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgcHJldlRhaWw6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIE5leHQgcG9zaXRpb24gb2YgY2hpbGQgdGFpbCwgaW4gd29ybGQgdW5pdC4gV2lsbCBiZSB1c2VkIGZvciB2ZXJsZXQgaW50ZWdyYXRpb24uXG4gICAqIEFjdHVhbGx5IHVzZWQgb25seSBpbiBbW3VwZGF0ZV1dIGFuZCBpdCdzIGtpbmQgb2YgdGVtcG9yYXJ5IHZhcmlhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIG5leHRUYWlsOiBUSFJFRS5WZWN0b3IzO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIGF4aXMgb2YgdGhlIGJvbmUsIGluIGxvY2FsIHVuaXQuXG4gICAqL1xuICBwcm90ZWN0ZWQgYm9uZUF4aXM6IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIExlbmd0aCBvZiB0aGUgYm9uZSBpbiAqKndvcmxkIHVuaXQqKi4gV2lsbCBiZSB1c2VkIGZvciBub3JtYWxpemF0aW9uIGluIHVwZGF0ZSBsb29wLlxuICAgKiBJdCdzIHNhbWUgYXMgbG9jYWwgdW5pdCBsZW5ndGggdW5sZXNzIHRoZXJlIGFyZSBzY2FsZSB0cmFuc2Zvcm1hdGlvbiBpbiB3b3JsZCBtYXRyaXguXG4gICAqL1xuICBwcm90ZWN0ZWQgd29ybGRCb25lTGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdvcmxkIHBvc2l0aW9uIG9mIHRoaXMgYm9uZSwga2luZCBvZiB0ZW1wb3JhcnkgdmFyaWFibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgd29ybGRQb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcblxuICAvKipcbiAgICogUm90YXRpb24gb2YgcGFyZW50IGJvbmUsIGluIHdvcmxkIHVuaXQuXG4gICAqIFdlIHNob3VsZCB1cGRhdGUgdGhpcyBjb25zdGFudGx5IGluIFtbdXBkYXRlXV0uXG4gICAqL1xuICBwcml2YXRlIF9wYXJlbnRXb3JsZFJvdGF0aW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHN0YXRlIG9mIHRoZSBsb2NhbCBtYXRyaXggb2YgdGhlIGJvbmUuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsTG9jYWxNYXRyaXg6IFRIUkVFLk1hdHJpeDQ7XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBib25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbExvY2FsUm90YXRpb246IFRIUkVFLlF1YXRlcm5pb247XG5cbiAgLyoqXG4gICAqIEluaXRpYWwgc3RhdGUgb2YgdGhlIHBvc2l0aW9uIG9mIGl0cyBjaGlsZC5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb246IFRIUkVFLlZlY3RvcjM7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBWUk1TcHJpbmdCb25lLlxuICAgKlxuICAgKiBAcGFyYW0gYm9uZSBBbiBPYmplY3QzRCB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBib25lXG4gICAqIEBwYXJhbSByYWRpdXMgUmFkaXVzIG9mIHRoZSBib25lXG4gICAqIEBwYXJhbSBzdGlmZm5lc3MgU3RpZmZuZXNzIGZvcmNlIG9mIHRoZSBib25lXG4gICAqIEBwYXJhbSBncmF2aXR5RGlyIERpcmVjdGlvbiBvZiB0aGUgZ3Jhdml0eSBhZ2FpbnN0IHRoaXMgYm9uZVxuICAgKiBAcGFyYW0gZ3Jhdml0eVBvd2VyIFBvd2VyIG9mIHRoZSBncmF2aXR5IGFnYWluc3QgdGhpcyBib25lXG4gICAqIEBwYXJhbSBkcmFnRm9yY2UgRHJhZyBmb3JjZSBvZiB0aGUgYm9uZVxuICAgKiBAcGFyYW0gY29sbGlkZXJzIENvbGxpZGVycyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBib25lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBib25lOiBUSFJFRS5PYmplY3QzRCxcbiAgICByYWRpdXM6IG51bWJlcixcbiAgICBzdGlmZmluZXNzOiBudW1iZXIsXG4gICAgZ3Jhdml0eURpcjogVEhSRUUuVmVjdG9yMyxcbiAgICBncmF2aXR5UG93ZXI6IG51bWJlcixcbiAgICBkcmFnRm9yY2U6IG51bWJlcixcbiAgICBjb2xsaWRlcnM6IFRIUkVFLk1lc2hbXSA9IFtdLFxuICApIHtcbiAgICB0aGlzLmJvbmUgPSBib25lOyAvLyB1bmlWUk3jgafjga4gcGFyZW50XG4gICAgdGhpcy5ib25lLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTsgLy8gdXBkYXRl44Gr44KI44KK6KiI566X44GV44KM44KL44Gu44GndGhyZWUuanPlhoXjgafjga7oh6rli5Xlh6bnkIbjga/kuI3opoFcblxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuc3RpZmZuZXNzRm9yY2UgPSBzdGlmZmluZXNzO1xuICAgIHRoaXMuZ3Jhdml0eURpciA9IGdyYXZpdHlEaXI7XG4gICAgdGhpcy5ncmF2aXR5UG93ZXIgPSBncmF2aXR5UG93ZXI7XG4gICAgdGhpcy5kcmFnRm9yY2UgPSBkcmFnRm9yY2U7XG4gICAgdGhpcy5jb2xsaWRlcnMgPSBjb2xsaWRlcnM7XG5cbiAgICB0aGlzLndvcmxkUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuXG4gICAgdGhpcy5fcGFyZW50V29ybGRSb3RhdGlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5cbiAgICB0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXggPSB0aGlzLmJvbmUubWF0cml4LmNsb25lKCk7XG4gICAgdGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24gPSB0aGlzLmJvbmUucXVhdGVybmlvbi5jbG9uZSgpO1xuICAgIHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24gPSAoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYm9uZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8g5pyr56uv44Gu44Oc44O844Oz44CC5a2Q44Oc44O844Oz44GM44GE44Gq44GE44Gf44KB44CM6Ieq5YiG44Gu5bCR44GX5YWI44CN44GM5a2Q44Oc44O844Oz44Go44GE44GG44GT44Go44Gr44GZ44KLXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kd2FuZ28vVW5pVlJNL2Jsb2IvbWFzdGVyL0Fzc2V0cy9WUk0vVW5pVlJNL1NjcmlwdHMvU3ByaW5nQm9uZS9WUk1TcHJpbmdCb25lLmNzI0wyNDZcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9uZS5wb3NpdGlvblxuICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgLm11bHRpcGx5U2NhbGFyKDAuMDcpOyAvLyBtYWdpYyBudW1iZXIhIGRlcml2ZXMgZnJvbSBvcmlnaW5hbCBzb3VyY2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSB0aGlzLmJvbmUuY2hpbGRyZW5bMF07XG4gICAgICAgIHJldHVybiBmaXJzdENoaWxkLnBvc2l0aW9uLmNsb25lKCk7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHRoaXMuY3VycmVudFRhaWwgPSB0aGlzLmJvbmUubG9jYWxUb1dvcmxkKHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY2xvbmUoKSk7XG4gICAgdGhpcy5wcmV2VGFpbCA9IHRoaXMuY3VycmVudFRhaWwuY2xvbmUoKTtcbiAgICB0aGlzLm5leHRUYWlsID0gdGhpcy5jdXJyZW50VGFpbC5jbG9uZSgpO1xuXG4gICAgdGhpcy5ib25lQXhpcyA9IHRoaXMuX2luaXRpYWxMb2NhbENoaWxkUG9zaXRpb24uY2xvbmUoKS5ub3JtYWxpemUoKTtcbiAgICB0aGlzLndvcmxkQm9uZUxlbmd0aCA9IHRoaXMuYm9uZVxuICAgICAgLmxvY2FsVG9Xb3JsZChfdjNBLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpXG4gICAgICAuc3ViKHRoaXMud29ybGRQb3NpdGlvbilcbiAgICAgIC5sZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgc3RhdGUgb2YgdGhpcyBib25lLlxuICAgKiBZb3UgbWlnaHQgd2FudCB0byBjYWxsIFtbVlJNU3ByaW5nQm9uZU1hbmFnZXIucmVzZXRdXSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYm9uZS5tYXRyaXguY29weSh0aGlzLl9pbml0aWFsTG9jYWxNYXRyaXgpO1xuXG4gICAgdGhpcy5ib25lLmxvY2FsVG9Xb3JsZCh0aGlzLmN1cnJlbnRUYWlsLmNvcHkodGhpcy5faW5pdGlhbExvY2FsQ2hpbGRQb3NpdGlvbikpO1xuICAgIHRoaXMucHJldlRhaWwuY29weSh0aGlzLmN1cnJlbnRUYWlsKTtcbiAgICB0aGlzLm5leHRUYWlsLmNvcHkodGhpcy5jdXJyZW50VGFpbCk7XG5cbiAgICAvLyDjg5zjg7zjg7Pjga7lp7/li6LjgpLmiYvli5Xjgafmk43kvZzjgZfjgZ/jga7jgafjgIFtYXRyaXhXb3JsZOOCguabtOaWsOOBl+OBpuOBiuOBj1xuICAgIHRoaXMuYm9uZS51cGRhdGVNYXRyaXgoKTtcbiAgICB0aGlzLmJvbmUubWF0cml4V29ybGQubXVsdGlwbHlNYXRyaWNlcyh0aGlzLmdldFBhcmVudE1hdHJpeFdvcmxkKCksIHRoaXMuYm9uZS5tYXRyaXgpO1xuICAgIHRoaXMud29ybGRQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5ib25lLm1hdHJpeFdvcmxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoaXMgYm9uZS5cbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW1ZSTVNwcmluZ0JvbmVNYW5hZ2VyLnVwZGF0ZV1dIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBkZWx0YSBkZWx0YVRpbWVcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChkZWx0YSA8PSAwKSByZXR1cm47XG5cbiAgICAvLyDopqrjgrnjg5fjg6rjg7PjgrDjg5zjg7zjg7Pjga7lp7/li6Ljga/luLjjgavlpInljJbjgZfjgabjgYTjgovjgIJcbiAgICAvLyDjgZ3jgozjgavln7rjgaXjgYTjgablh6bnkIbnm7TliY3jgavoh6rliIbjga53b3JsZE1hdHJpeOOCkuabtOaWsOOBl+OBpuOBiuOBj1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuZ2V0UGFyZW50TWF0cml4V29ybGQoKSwgdGhpcy5ib25lLm1hdHJpeCk7XG5cbiAgICBpZiAoISF0aGlzLmJvbmUucGFyZW50KSB7XG4gICAgICAvLyBTcHJpbmdCb25l44Gv6Kaq44GL44KJ6aCG44Gr5Yem55CG44GV44KM44Gm44GE44GP44Gf44KB44CBXG4gICAgICAvLyDopqrjga5tYXRyaXhXb3JsZOOBr+acgOaWsOeKtuaFi+OBruWJjeaPkOOBp3dvcmxkTWF0cml444GL44KJcXVhdGVybmlvbuOCkuWPluOCiuWHuuOBmeOAglxuICAgICAgLy8g5Yi26ZmQ44Gv44GC44KL44GR44KM44Gp44CB6KiI566X44Gv5bCR44Gq44GE44Gu44GnZ2V0V29ybGRRdWF0ZXJuaW9u44Gn44Gv44Gq44GP44GT44Gu5pa55rOV44KS5Y+W44KL44CCXG4gICAgICBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKHRoaXMuYm9uZS5wYXJlbnQsIHRoaXMuX3BhcmVudFdvcmxkUm90YXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYXJlbnRXb3JsZFJvdGF0aW9uLmNvcHkoSURFTlRJVFlfUVVBVEVSTklPTik7XG4gICAgfVxuXG4gICAgLy8g5pu05paw5riI44G/44Gud29ybGRNYXRyaXjjgYvjgol3b3JsZFBvc2l0aW9u44KS5Y+W44KK5Ye644GZ44CCXG4gICAgLy8gYGdldFdvcmxkUG9zaXRpb24oKWAg44Gv6LKg6I2344GM6auY44GE44Gu44Gn5Yip55So44GX44Gq44GE44CCXG4gICAgdGhpcy53b3JsZFBvc2l0aW9uLnNldEZyb21NYXRyaXhQb3NpdGlvbih0aGlzLmJvbmUubWF0cml4V29ybGQpO1xuICAgIGNvbnN0IHN0aWZmbmVzcyA9IHRoaXMuc3RpZmZuZXNzRm9yY2UgKiBkZWx0YTtcbiAgICBjb25zdCBleHRlcm5hbCA9IF92M0IuY29weSh0aGlzLmdyYXZpdHlEaXIpLm11bHRpcGx5U2NhbGFyKHRoaXMuZ3Jhdml0eVBvd2VyICogZGVsdGEpO1xuXG4gICAgLy8gdmVybGV056mN5YiG44Gn5qyh44Gu5L2N572u44KS6KiI566XXG4gICAgdGhpcy5uZXh0VGFpbFxuICAgICAgLmNvcHkodGhpcy5jdXJyZW50VGFpbClcbiAgICAgIC5hZGQoXG4gICAgICAgIF92M0FcbiAgICAgICAgICAuY29weSh0aGlzLmN1cnJlbnRUYWlsKVxuICAgICAgICAgIC5zdWIodGhpcy5wcmV2VGFpbClcbiAgICAgICAgICAubXVsdGlwbHlTY2FsYXIoMSAtIHRoaXMuZHJhZ0ZvcmNlKSxcbiAgICAgICkgLy8g5YmN44OV44Os44O844Og44Gu56e75YuV44KS57aZ57aa44GZ44KLKOa4m+ihsOOCguOBguOCi+OCiClcbiAgICAgIC5hZGQoXG4gICAgICAgIF92M0FcbiAgICAgICAgICAuY29weSh0aGlzLmJvbmVBeGlzKVxuICAgICAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5faW5pdGlhbExvY2FsTWF0cml4KVxuICAgICAgICAgIC5hcHBseU1hdHJpeDQodGhpcy5nZXRQYXJlbnRNYXRyaXhXb3JsZCgpKVxuICAgICAgICAgIC5zdWIodGhpcy53b3JsZFBvc2l0aW9uKVxuICAgICAgICAgIC5ub3JtYWxpemUoKVxuICAgICAgICAgIC5tdWx0aXBseVNjYWxhcihzdGlmZm5lc3MpLFxuICAgICAgKSAvLyDopqrjga7lm57ou6LjgavjgojjgovlrZDjg5zjg7zjg7Pjga7np7vli5Xnm67mqJlcbiAgICAgIC5hZGQoZXh0ZXJuYWwpOyAvLyDlpJblipvjgavjgojjgovnp7vli5Xph49cblxuICAgIC8vIG5vcm1hbGl6ZSBib25lIGxlbmd0aFxuICAgIHRoaXMubmV4dFRhaWxcbiAgICAgIC5zdWIodGhpcy53b3JsZFBvc2l0aW9uKVxuICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAubXVsdGlwbHlTY2FsYXIodGhpcy53b3JsZEJvbmVMZW5ndGgpXG4gICAgICAuYWRkKHRoaXMud29ybGRQb3NpdGlvbik7XG5cbiAgICAvLyBDb2xsaXNpb27jgafnp7vli5VcbiAgICB0aGlzLmNvbGxpc2lvbih0aGlzLm5leHRUYWlsKTtcblxuICAgIHRoaXMucHJldlRhaWwuY29weSh0aGlzLmN1cnJlbnRUYWlsKTtcbiAgICB0aGlzLmN1cnJlbnRUYWlsLmNvcHkodGhpcy5uZXh0VGFpbCk7XG5cbiAgICAvLyBBcHBseSByb3RhdGlvbiwgY29udmVydCB2ZWN0b3IzIHRoaW5nIGludG8gYWN0dWFsIHF1YXRlcm5pb25cbiAgICAvLyBPcmlnaW5hbCBVbmlWUk0gaXMgZG9pbmcgd29ybGQgdW5pdCBjYWxjdWx1cyBhdCBoZXJlIGJ1dCB3ZSdyZSBnb25uYSBkbyB0aGlzIG9uIGxvY2FsIHVuaXRcbiAgICAvLyBzaW5jZSBUaHJlZS5qcyBpcyBub3QgZ29vZCBhdCB3b3JsZCBjb29yZGluYXRpb24gc3R1ZmZcbiAgICBjb25zdCBpbml0aWFsV29ybGRNYXRyaXhJbnYgPSBfbWF0QS5nZXRJbnZlcnNlKFxuICAgICAgX21hdEIuY29weSh0aGlzLmdldFBhcmVudE1hdHJpeFdvcmxkKCkpLm11bHRpcGx5KHRoaXMuX2luaXRpYWxMb2NhbE1hdHJpeCksXG4gICAgKTtcbiAgICBjb25zdCBhcHBseVJvdGF0aW9uID0gX3F1YXRBLnNldEZyb21Vbml0VmVjdG9ycyhcbiAgICAgIHRoaXMuYm9uZUF4aXMsXG4gICAgICBfdjNBXG4gICAgICAgIC5jb3B5KHRoaXMubmV4dFRhaWwpXG4gICAgICAgIC5hcHBseU1hdHJpeDQoaW5pdGlhbFdvcmxkTWF0cml4SW52KVxuICAgICAgICAubm9ybWFsaXplKCksXG4gICAgKTtcblxuICAgIHRoaXMuYm9uZS5xdWF0ZXJuaW9uLmNvcHkodGhpcy5faW5pdGlhbExvY2FsUm90YXRpb24pLm11bHRpcGx5KGFwcGx5Um90YXRpb24pO1xuXG4gICAgLy8gV2UgbmVlZCB0byB1cGRhdGUgaXRzIG1hdHJpeFdvcmxkIG1hbnVhbGx5LCBzaW5jZSB3ZSB0d2Vha2VkIHRoZSBib25lIGJ5IG91ciBoYW5kXG4gICAgdGhpcy5ib25lLnVwZGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuYm9uZS5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMuZ2V0UGFyZW50TWF0cml4V29ybGQoKSwgdGhpcy5ib25lLm1hdHJpeCk7XG4gIH1cblxuICAvKipcbiAgICogRG8gY29sbGlzaW9uIG1hdGggYWdhaW5zdCBldmVyeSBjb2xsaWRlcnMgYXR0YWNoZWQgdG8gdGhpcyBib25lLlxuICAgKlxuICAgKiBAcGFyYW0gdGFpbCBUaGUgdGFpbCB5b3Ugd2FudCB0byBwcm9jZXNzXG4gICAqL1xuICBwcml2YXRlIGNvbGxpc2lvbih0YWlsOiBUSFJFRS5WZWN0b3IzKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgIGNvbnN0IGNvbGxpZGVyV29ybGRQb3NpdGlvbiA9IF92M0Euc2V0RnJvbU1hdHJpeFBvc2l0aW9uKGNvbGxpZGVyLm1hdHJpeFdvcmxkKTtcbiAgICAgIGNvbnN0IGNvbGxpZGVyUmFkaXVzID0gY29sbGlkZXIuZ2VvbWV0cnkuYm91bmRpbmdTcGhlcmUucmFkaXVzO1xuICAgICAgY29uc3QgciA9IHRoaXMucmFkaXVzICsgY29sbGlkZXJSYWRpdXM7XG5cbiAgICAgIGlmICh0YWlsLmRpc3RhbmNlVG9TcXVhcmVkKGNvbGxpZGVyV29ybGRQb3NpdGlvbikgPD0gciAqIHIpIHtcbiAgICAgICAgLy8g44OS44OD44OI44CCQ29sbGlkZXLjga7ljYrlvoTmlrnlkJHjgavmirzjgZflh7rjgZlcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gX3YzQi5zdWJWZWN0b3JzKHRhaWwsIGNvbGxpZGVyV29ybGRQb3NpdGlvbikubm9ybWFsaXplKCk7XG4gICAgICAgIGNvbnN0IHBvc0Zyb21Db2xsaWRlciA9IF92M0MuYWRkVmVjdG9ycyhjb2xsaWRlcldvcmxkUG9zaXRpb24sIG5vcm1hbC5tdWx0aXBseVNjYWxhcihyKSk7XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIGJvbmUgbGVuZ3RoXG4gICAgICAgIHRhaWwuY29weShcbiAgICAgICAgICBwb3NGcm9tQ29sbGlkZXJcbiAgICAgICAgICAgIC5zdWIodGhpcy53b3JsZFBvc2l0aW9uKVxuICAgICAgICAgICAgLm5vcm1hbGl6ZSgpXG4gICAgICAgICAgICAubXVsdGlwbHlTY2FsYXIodGhpcy53b3JsZEJvbmVMZW5ndGgpXG4gICAgICAgICAgICAuYWRkKHRoaXMud29ybGRQb3NpdGlvbiksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd29ybGQgbWF0cml4IG9mIGl0cyBwYXJlbnQgb2JqZWN0LlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRQYXJlbnRNYXRyaXhXb3JsZCgpOiBUSFJFRS5NYXRyaXg0IHtcbiAgICByZXR1cm4gdGhpcy5ib25lLnBhcmVudCA/IHRoaXMuYm9uZS5wYXJlbnQubWF0cml4V29ybGQgOiBJREVOVElUWV9NQVRSSVg0O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBHTFRGTm9kZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCAqIGFzIFJhdyBmcm9tICcuLi90eXBlcy9WUk0nO1xuaW1wb3J0IHsgR0laTU9fUkVOREVSX09SREVSLCBWUk1TcHJpbmdCb25lIH0gZnJvbSAnLi9WUk1TcHJpbmdCb25lJztcbmltcG9ydCB7IENvbGxpZGVyTWVzaCwgVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXAgfSBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcblxuZXhwb3J0IHR5cGUgVlJNU3ByaW5nQm9uZUdyb3VwID0gVlJNU3ByaW5nQm9uZVtdO1xuXG4vKipcbiAqIEEgY2xhc3MgbWFuYWdlcyBhbGwgdGhlIHNwcmluZyBib25lcyBvZiBhIFZSTS5cbiAqIFlvdSB1c3VhbGx5IGRvbid0IGhhdmUgdG8gY2FyZSBvZiB0aGlzIGNsYXNzLCBzb21ldGltZXMgeW91IG1pZ2h0IHdhbnQgdG8gY2FsbCBbW3Jlc2V0XV0gdGhvdWdoLlxuICovXG5leHBvcnQgY2xhc3MgVlJNU3ByaW5nQm9uZU1hbmFnZXIge1xuICBwdWJsaWMgcmVhZG9ubHkgc3ByaW5nQm9uZUdyb3VwTGlzdDogVlJNU3ByaW5nQm9uZUdyb3VwW10gPSBbXTtcblxuICAvKipcbiAgICogSW1wb3J0IHNwcmluZyBib25lcyBmcm9tIGEgVlJNLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWRHTFRGKGdsdGY6IFRIUkVFLkdMVEYpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzcHJpbmdCb25lR3JvdXBzOiBSYXcuUmF3VnJtU2Vjb25kYXJ5YW5pbWF0aW9uU3ByaW5nW10gfCB1bmRlZmluZWQgPVxuICAgICAgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zICYmXG4gICAgICBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNICYmXG4gICAgICBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMuVlJNLnNlY29uZGFyeUFuaW1hdGlvbiAmJlxuICAgICAgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTS5zZWNvbmRhcnlBbmltYXRpb24uYm9uZUdyb3VwcztcbiAgICBpZiAoc3ByaW5nQm9uZUdyb3VwcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kIHNwcmluZ0JvbmVHcm91cHMgaW4gdGhlIFZSTScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIOihneeqgeWIpOWumueQg+S9k+ODoeODg+OCt+ODpeOAglxuICAgIGNvbnN0IGNvbGxpZGVyTWVzaEdyb3VwcyA9IGF3YWl0IHRoaXMuZ2V0Q29sbGlkZXJNZXNoR3JvdXBzKGdsdGYpO1xuICAgIGNvbGxpZGVyTWVzaEdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gZ2x0Zi5zY2VuZS5hZGQoLi4uZ3JvdXAuY29sbGlkZXJzKSk7XG5cbiAgICAvLyDlkIzjgZjlsZ7mgKfvvIhzdGlmZmluZXNz44KEZHJhZ0ZvcmNl44GM5ZCM44GY77yJ44Gu44Oc44O844Oz44GvYm9uZUdyb3Vw44Gr44G+44Go44KB44KJ44KM44Gm44GE44KL44CCXG4gICAgLy8g5LiA5YiX44Gg44GR44Gn44Gv44Gq44GE44GT44Go44Gr5rOo5oSP44CCXG4gICAgc3ByaW5nQm9uZUdyb3Vwcy5mb3JFYWNoKCh2cm1Cb25lR3JvdXApID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdnJtQm9uZUdyb3VwLnN0aWZmaW5lc3MgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICB2cm1Cb25lR3JvdXAuZ3Jhdml0eURpci55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdnJtQm9uZUdyb3VwLmdyYXZpdHlEaXIueiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5UG93ZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICB2cm1Cb25lR3JvdXAuZHJhZ0ZvcmNlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdnJtQm9uZUdyb3VwLmhpdFJhZGl1cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHZybUJvbmVHcm91cC5jb2xsaWRlckdyb3VwcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHZybUJvbmVHcm91cC5ib25lcyA9PT0gdW5kZWZpbmVkXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGlmZmluZXNzID0gdnJtQm9uZUdyb3VwLnN0aWZmaW5lc3M7XG4gICAgICBjb25zdCBncmF2aXR5RGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLngsXG4gICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnksXG4gICAgICAgIHZybUJvbmVHcm91cC5ncmF2aXR5RGlyLnosXG4gICAgICApO1xuICAgICAgY29uc3QgZ3Jhdml0eVBvd2VyID0gdnJtQm9uZUdyb3VwLmdyYXZpdHlQb3dlcjtcbiAgICAgIGNvbnN0IGRyYWdGb3JjZSA9IHZybUJvbmVHcm91cC5kcmFnRm9yY2U7XG4gICAgICBjb25zdCBoaXRSYWRpdXMgPSB2cm1Cb25lR3JvdXAuaGl0UmFkaXVzO1xuXG4gICAgICBjb25zdCBjb2xsaWRlcnM6IENvbGxpZGVyTWVzaFtdID0gW107XG4gICAgICB2cm1Cb25lR3JvdXAuY29sbGlkZXJHcm91cHMuZm9yRWFjaCgoY29sbGlkZXJJbmRleCkgPT4ge1xuICAgICAgICBjb2xsaWRlcnMucHVzaCguLi5jb2xsaWRlck1lc2hHcm91cHNbY29sbGlkZXJJbmRleF0uY29sbGlkZXJzKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzcHJpbmdCb25lR3JvdXA6IFZSTVNwcmluZ0JvbmVHcm91cCA9IFtdO1xuICAgICAgdnJtQm9uZUdyb3VwLmJvbmVzLmZvckVhY2goYXN5bmMgKG5vZGVJbmRleCkgPT4ge1xuICAgICAgICAvLyBWUk3jga7mg4XloLHjgYvjgonjgIzmj7rjgozjg6Ljg47jgI3jg5zjg7zjg7Pjga7jg6vjg7zjg4jjgYzlj5bjgozjgotcbiAgICAgICAgY29uc3Qgc3ByaW5nUm9vdEJvbmU6IEdMVEZOb2RlID0gYXdhaXQgZ2x0Zi5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgnbm9kZScsIG5vZGVJbmRleCk7XG5cbiAgICAgICAgLy8gaXQncyB3ZWlyZCBidXQgdGhlcmUgbWlnaHQgYmUgY2FzZXMgd2UgY2FuJ3QgZmluZCB0aGUgcm9vdCBib25lXG4gICAgICAgIGlmICghc3ByaW5nUm9vdEJvbmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzcHJpbmdSb290Qm9uZS50cmF2ZXJzZSgoYm9uZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNwcmluZ0JvbmUgPSB0aGlzLmNyZWF0ZVNwcmluZ0JvbmUoXG4gICAgICAgICAgICBnbHRmLFxuICAgICAgICAgICAgYm9uZSxcbiAgICAgICAgICAgIGhpdFJhZGl1cyxcbiAgICAgICAgICAgIHN0aWZmaW5lc3MsXG4gICAgICAgICAgICBncmF2aXR5RGlyLFxuICAgICAgICAgICAgZ3Jhdml0eVBvd2VyLFxuICAgICAgICAgICAgZHJhZ0ZvcmNlLFxuICAgICAgICAgICAgY29sbGlkZXJzLFxuICAgICAgICAgICk7XG4gICAgICAgICAgc3ByaW5nQm9uZUdyb3VwLnB1c2goc3ByaW5nQm9uZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5wdXNoKHNwcmluZ0JvbmVHcm91cCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFsbCB0aGUgc3ByaW5nIGJvbmVzIGJlbG9uZ3MgdG8gdGhpcyBtYW5hZ2VyLlxuICAgKiBVc3VhbGx5IHRoaXMgd2lsbCBiZSBjYWxsZWQgdmlhIFtbVlJNLnVwZGF0ZV1dIHNvIHlvdSBkb24ndCBoYXZlIHRvIGNhbGwgdGhpcyBtYW51YWxseS5cbiAgICpcbiAgICogQHBhcmFtIGRlbHRhIGRlbHRhVGltZVxuICAgKi9cbiAgcHVibGljIGxhdGVVcGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUudXBkYXRlKGRlbHRhKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGFsbCB0aGUgc3ByaW5nIGJvbmVzIGJlbG9uZ3MgdG8gdGhpcyBtYW5hZ2VyLlxuICAgKi9cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaW5nQm9uZUdyb3VwTGlzdC5mb3JFYWNoKChzcHJpbmdCb25lR3JvdXApID0+IHtcbiAgICAgIHNwcmluZ0JvbmVHcm91cC5mb3JFYWNoKChzcHJpbmdCb25lKSA9PiB7XG4gICAgICAgIHNwcmluZ0JvbmUucmVzZXQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ29saWRlck1lc2hWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVTcHJpbmdCb25lKFxuICAgIGdsdGY6IFRIUkVFLkdMVEYsXG4gICAgYm9uZTogVEhSRUUuT2JqZWN0M0QsXG4gICAgaGl0UmFkaXVzOiBudW1iZXIsXG4gICAgc3RpZmZpbmVzczogbnVtYmVyLFxuICAgIGdyYXZpdHlEaXI6IFRIUkVFLlZlY3RvcjMsXG4gICAgZ3Jhdml0eVBvd2VyOiBudW1iZXIsXG4gICAgZHJhZ0ZvcmNlOiBudW1iZXIsXG4gICAgY29sbGlkZXJzOiBUSFJFRS5NZXNoW10gPSBbXSxcbiAgKTogVlJNU3ByaW5nQm9uZSB7XG4gICAgcmV0dXJuIG5ldyBWUk1TcHJpbmdCb25lKGJvbmUsIGhpdFJhZGl1cywgc3RpZmZpbmVzcywgZ3Jhdml0eURpciwgZ3Jhdml0eVBvd2VyLCBkcmFnRm9yY2UsIGNvbGxpZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGFycmF5IG9mIFtbVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBdXS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgZ2V0Q29sbGlkZXJNZXNoR3JvdXBzKGdsdGY6IFRIUkVFLkdMVEYpOiBQcm9taXNlPFZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwW10+IHtcbiAgICBjb25zdCB2cm1FeHQ6IFJhdy5SYXdWcm0gfCB1bmRlZmluZWQgPSBnbHRmLnBhcnNlci5qc29uLmV4dGVuc2lvbnMgJiYgZ2x0Zi5wYXJzZXIuanNvbi5leHRlbnNpb25zLlZSTTtcbiAgICBpZiAodnJtRXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3Qgc2Vjb25kYXJ5QW5pbWF0aW9uID0gdnJtRXh0LnNlY29uZGFyeUFuaW1hdGlvbjtcbiAgICBpZiAoc2Vjb25kYXJ5QW5pbWF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgdnJtQ29sbGlkZXJHcm91cHMgPSBzZWNvbmRhcnlBbmltYXRpb24uY29sbGlkZXJHcm91cHM7XG4gICAgaWYgKHZybUNvbGxpZGVyR3JvdXBzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xsaWRlckdyb3VwczogVlJNU3ByaW5nQm9uZUNvbGxpZGVyR3JvdXBbXSA9IFtdO1xuICAgIHZybUNvbGxpZGVyR3JvdXBzLmZvckVhY2goYXN5bmMgKGNvbGxpZGVyR3JvdXApID0+IHtcbiAgICAgIGlmIChjb2xsaWRlckdyb3VwLm5vZGUgPT09IHVuZGVmaW5lZCB8fCBjb2xsaWRlckdyb3VwLmNvbGxpZGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYm9uZSA9IGF3YWl0IGdsdGYucGFyc2VyLmdldERlcGVuZGVuY3koJ25vZGUnLCBjb2xsaWRlckdyb3VwLm5vZGUpO1xuICAgICAgY29uc3QgY29sbGlkZXJzOiBDb2xsaWRlck1lc2hbXSA9IFtdO1xuICAgICAgY29sbGlkZXJHcm91cC5jb2xsaWRlcnMuZm9yRWFjaCgoY29sbGlkZXIpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIGNvbGxpZGVyLm9mZnNldC55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICBjb2xsaWRlci5vZmZzZXQueiA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgY29sbGlkZXIucmFkaXVzID09PSB1bmRlZmluZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0TWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24oXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LngsXG4gICAgICAgICAgY29sbGlkZXIub2Zmc2V0LnksXG4gICAgICAgICAgLWNvbGxpZGVyLm9mZnNldC56LCAvLyB0aGlzIGlzIHByZXR0eSB3ZWlyZC4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZHdhbmdvL1VuaVZSTS9pc3N1ZXMvNjVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IHRoaXMuaXNDb2xpZGVyTWVzaFZpc2libGUoKTtcbiAgICAgICAgY29uc3QgY29sbGlkZXJNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgbmV3IFRIUkVFLlNwaGVyZUJ1ZmZlckdlb21ldHJ5KGNvbGxpZGVyLnJhZGl1cywgOCwgNCksXG4gICAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgICAgIGNvbG9yOiAweGZmMDBmZixcbiAgICAgICAgICAgIHZpc2libGUsXG4gICAgICAgICAgICB3aXJlZnJhbWU6IHRydWUsXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRlcHRoVGVzdDogZmFsc2UsXG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIChjb2xsaWRlck1lc2gubWF0ZXJpYWwgYXMgYW55KS5yZW5kZXJPcmRlciA9IEdJWk1PX1JFTkRFUl9PUkRFUjtcblxuICAgICAgICAvLyB0aGUgbmFtZSBoYXZlIHRvIGJlIHRoaXMgaW4gb3JkZXIgdG8gZXhjbHVkZSBjb2xsaWRlcnMgZnJvbSBib3VuZGluZyBib3hcbiAgICAgICAgLy8gKFNlZSBWaWV3ZXIudHMsIHNlYXJjaCBmb3IgY2hpbGQubmFtZSA9PT0gJ3ZybUNvbGxpZGVyU3BoZXJlJylcbiAgICAgICAgY29sbGlkZXJNZXNoLm5hbWUgPSAndnJtQ29sbGlkZXJTcGhlcmUnO1xuXG4gICAgICAgIC8vIFdlIHdpbGwgdXNlIHRoZSByYWRpdXMgb2YgdGhlIHNwaGVyZSBmb3IgY29sbGlzaW9uIHZzIGJvbmVzLlxuICAgICAgICAvLyBgYm91bmRpbmdTcGhlcmVgIG11c3QgYmUgY3JlYXRlZCB0byBjb21wdXRlIHRoZSByYWRpdXMuXG4gICAgICAgIGNvbGxpZGVyTWVzaC5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcblxuICAgICAgICAvLyBUaGUgY29sbGlkZXJNZXNoIG11c3Qgc3luYyB3aXRoIHRoZSBib25lLlxuICAgICAgICAvLyBBdHRhY2hpbmcgYm9uZSdzIG1hdHJpeCB0byB0aGUgY29sbGlkZXJNZXNoIGF0IGV2ZXJ5IHVwZGF0ZS5cbiAgICAgICAgLy8gKGNvbGxpZGVyTWVzaCB3aWxsIG1vdmUgYXV0b21lY2ljYWxsdHkpXG4gICAgICAgIGNvbGxpZGVyTWVzaC51cGRhdGVNYXRyaXhXb3JsZCA9ICgpID0+IHtcbiAgICAgICAgICBjb2xsaWRlck1lc2gubWF0cml4V29ybGQuY29weShib25lLm1hdHJpeFdvcmxkKS5tdWx0aXBseShvZmZzZXRNYXRyaXgpO1xuICAgICAgICB9O1xuICAgICAgICBjb2xsaWRlcnMucHVzaChjb2xsaWRlck1lc2gpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvbGxpZGVyTWVzaEdyb3VwID0ge1xuICAgICAgICBub2RlOiBjb2xsaWRlckdyb3VwLm5vZGUsXG4gICAgICAgIGNvbGxpZGVycyxcbiAgICAgIH07XG4gICAgICBjb2xsaWRlckdyb3Vwcy5wdXNoKGNvbGxpZGVyTWVzaEdyb3VwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xsaWRlckdyb3VwcztcbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk1TcHJpbmdCb25lTWFuYWdlcic7XG5leHBvcnQgKiBmcm9tICcuL1ZSTVNwcmluZ0JvbmVDb2xsaWRlckdyb3VwJztcbmV4cG9ydCAqIGZyb20gJy4vVlJNU3ByaW5nQm9uZSc7XG4iLCIvKipcbiAqIFZSTS50cyBleHRlbnNpb24gaXMgZm9yIDNkIGh1bWFub2lkIGF2YXRhcnMgKGFuZCBtb2RlbHMpIGluIFZSIGFwcGxpY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdWcm0ge1xuICBCbGVuZFNoYXBlTWFzdGVyPzogUmF3VnJtQmxlbmRTaGFwZTtcbiAgLyoqXG4gICAqIFZlcnNpb24gb2YgZXhwb3J0ZXIgdGhhdCB2cm0gY3JlYXRlZC4gVW5pVlJNLTAuNDZcbiAgICovXG4gIGV4cG9ydGVyVmVyc2lvbj86IHN0cmluZztcbiAgZmlyc3RQZXJzb24/OiBSYXdWcm1GaXJzdFBlcnNvbjtcbiAgaHVtYW5vaWQ/OiBSYXdWcm1IdW1hbm9pZDtcbiAgbWF0ZXJpYWxQcm9wZXJ0aWVzPzogUmF3VnJtTWF0ZXJpYWxbXTtcbiAgbWV0YT86IFJhd1ZybU1ldGE7XG4gIHNlY29uZGFyeUFuaW1hdGlvbj86IFJhd1ZybVNlY29uZGFyeWFuaW1hdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYXdWcm1CbGVuZFNoYXBlIHtcbiAgQmxlbmRTaGFwZUdyb3Vwcz86IFJhd1ZybUJsZW5kU2hhcGVHcm91cFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1ZybUJsZW5kU2hhcGVHcm91cCB7XG4gIC8qKlxuICAgKiBMb3cgbGV2ZWwgQmxlbmRTaGFwZSByZWZlcmVuY2VzLlxuICAgKi9cbiAgYmluZHM/OiBSYXdWcm1CbGVuZFNoYXBlQmluZFtdO1xuICAvKipcbiAgICogMCBvciAxLiBEbyBub3QgYWxsb3cgYW4gaW50ZXJtZWRpYXRlIHZhbHVlLiBWYWx1ZSBzaG91bGQgcm91bmRlZFxuICAgKi9cbiAgaXNCaW5hcnk/OiBib29sZWFuO1xuICAvKipcbiAgICogTWF0ZXJpYWwgYW5pbWF0aW9uIHJlZmVyZW5jZXMuXG4gICAqL1xuICBtYXRlcmlhbFZhbHVlcz86IFJhd1ZybUJsZW5kU2hhcGVNYXRlcmlhbGJpbmRbXTtcbiAgLyoqXG4gICAqIEV4cHJlc3Npb24gbmFtZVxuICAgKi9cbiAgbmFtZT86IHN0cmluZztcbiAgLyoqXG4gICAqIFByZWRlZmluZWQgRXhwcmVzc2lvbiBuYW1lXG4gICAqL1xuICBwcmVzZXROYW1lPzogQmxlbmRTaGFwZVByZXNldE5hbWU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3VnJtQmxlbmRTaGFwZUJpbmQge1xuICBpbmRleD86IG51bWJlcjtcbiAgbWVzaD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNraW5uZWRNZXNoUmVuZGVyZXIuU2V0QmxlbmRTaGFwZVdlaWdodFxuICAgKi9cbiAgd2VpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1ZybUJsZW5kU2hhcGVNYXRlcmlhbGJpbmQge1xuICBtYXRlcmlhbE5hbWU/OiBzdHJpbmc7XG4gIHByb3BlcnR5TmFtZT86IHN0cmluZztcbiAgdGFyZ2V0VmFsdWU/OiBudW1iZXJbXTtcbn1cblxuLyoqXG4gKiBQcmVkZWZpbmVkIEV4cHJlc3Npb24gbmFtZVxuICovXG5leHBvcnQgZW51bSBCbGVuZFNoYXBlUHJlc2V0TmFtZSB7XG4gIEEgPSAnYScsXG4gIEFuZ3J5ID0gJ2FuZ3J5JyxcbiAgQmxpbmsgPSAnYmxpbmsnLFxuICBCbGlua0wgPSAnYmxpbmtfbCcsXG4gIEJsaW5rUiA9ICdibGlua19yJyxcbiAgRSA9ICdlJyxcbiAgRnVuID0gJ2Z1bicsXG4gIEkgPSAnaScsXG4gIEpveSA9ICdqb3knLFxuICBMb29rZG93biA9ICdsb29rZG93bicsXG4gIExvb2tsZWZ0ID0gJ2xvb2tsZWZ0JyxcbiAgTG9va3JpZ2h0ID0gJ2xvb2tyaWdodCcsXG4gIExvb2t1cCA9ICdsb29rdXAnLFxuICBOZXV0cmFsID0gJ25ldXRyYWwnLFxuICBPID0gJ28nLFxuICBTb3Jyb3cgPSAnc29ycm93JyxcbiAgVSA9ICd1JyxcbiAgVW5rbm93biA9ICd1bmtub3duJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYXdWcm1GaXJzdFBlcnNvbiB7XG4gIC8qKlxuICAgKiBUaGUgYm9uZSB3aG9zZSByZW5kZXJpbmcgc2hvdWxkIGJlIHR1cm5lZCBvZmYgaW4gZmlyc3QtcGVyc29uIHZpZXcuIFVzdWFsbHkgSGVhZCBpc1xuICAgKiBzcGVjaWZpZWQuXG4gICAqL1xuICBmaXJzdFBlcnNvbkJvbmU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IHBvc2l0aW9uIG9mIHRoZSBWUiBoZWFkc2V0IGluIGZpcnN0LXBlcnNvbiB2aWV3LiBJdCBpcyBhc3N1bWVkIHRoYXQgYW4gb2Zmc2V0XG4gICAqIGZyb20gdGhlIGhlYWQgYm9uZSB0byB0aGUgVlIgaGVhZHNldCBpcyBhZGRlZC5cbiAgICovXG4gIGZpcnN0UGVyc29uQm9uZU9mZnNldD86IFJhd0ZpcnN0UGVyc29uQm9uZU9mZnNldDtcbiAgbG9va0F0SG9yaXpvbnRhbElubmVyPzogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXA7XG4gIGxvb2tBdEhvcml6b250YWxPdXRlcj86IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwO1xuICAvKipcbiAgICogRXllIGNvbnRyb2xsZXIgbW9kZS5cbiAgICovXG4gIGxvb2tBdFR5cGVOYW1lPzogTG9va0F0VHlwZU5hbWU7XG4gIGxvb2tBdFZlcnRpY2FsRG93bj86IFJhd1ZybUZpcnN0UGVyc29uRGVncmVlbWFwO1xuICBsb29rQXRWZXJ0aWNhbFVwPzogUmF3VnJtRmlyc3RQZXJzb25EZWdyZWVtYXA7XG4gIC8qKlxuICAgKiBTd2l0Y2ggZGlzcGxheSAvIHVuZGlzcGxheSBmb3IgZWFjaCBtZXNoIGluIGZpcnN0LXBlcnNvbiB2aWV3IG9yIHRoZSBvdGhlcnMuXG4gICAqL1xuICBtZXNoQW5ub3RhdGlvbnM/OiBSYXdWcm1GaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uW107XG59XG5cbi8qKlxuICogVGhlIHRhcmdldCBwb3NpdGlvbiBvZiB0aGUgVlIgaGVhZHNldCBpbiBmaXJzdC1wZXJzb24gdmlldy4gSXQgaXMgYXNzdW1lZCB0aGF0IGFuIG9mZnNldFxuICogZnJvbSB0aGUgaGVhZCBib25lIHRvIHRoZSBWUiBoZWFkc2V0IGlzIGFkZGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJhd0ZpcnN0UGVyc29uQm9uZU9mZnNldCB7XG4gIHg/OiBudW1iZXI7XG4gIHk/OiBudW1iZXI7XG4gIHo/OiBudW1iZXI7XG59XG5cbi8qKlxuICogRXllIGNvbnRyb2xsZXIgc2V0dGluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdWcm1GaXJzdFBlcnNvbkRlZ3JlZW1hcCB7XG4gIC8qKlxuICAgKiBOb25lIGxpbmVhciBtYXBwaW5nIHBhcmFtcy4gdGltZSwgdmFsdWUsIGluVGFuZ2VudCwgb3V0VGFuZ2VudFxuICAgKi9cbiAgY3VydmU/OiBudW1iZXJbXTtcbiAgLyoqXG4gICAqIExvb2sgYXQgaW5wdXQgY2xhbXAgcmFuZ2UgZGVncmVlLlxuICAgKi9cbiAgeFJhbmdlPzogbnVtYmVyO1xuICAvKipcbiAgICogTG9vayBhdCBtYXAgcmFuZ2UgZGVncmVlIGZyb20geFJhbmdlLlxuICAgKi9cbiAgeVJhbmdlPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIEV5ZSBjb250cm9sbGVyIG1vZGUuXG4gKi9cbmV4cG9ydCBlbnVtIExvb2tBdFR5cGVOYW1lIHtcbiAgQmxlbmRTaGFwZSA9ICdCbGVuZFNoYXBlJyxcbiAgQm9uZSA9ICdCb25lJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYXdWcm1GaXJzdFBlcnNvbk1lc2hhbm5vdGF0aW9uIHtcbiAgZmlyc3RQZXJzb25GbGFnPzogc3RyaW5nO1xuICBtZXNoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1ZybUh1bWFub2lkIHtcbiAgLyoqXG4gICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5hcm1TdHJldGNoXG4gICAqL1xuICBhcm1TdHJldGNoPzogbnVtYmVyO1xuICAvKipcbiAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmZlZXRTcGFjaW5nXG4gICAqL1xuICBmZWV0U3BhY2luZz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5oYXNUcmFuc2xhdGlvbkRvRlxuICAgKi9cbiAgaGFzVHJhbnNsYXRpb25Eb0Y/OiBib29sZWFuO1xuICBodW1hbkJvbmVzPzogUmF3VnJtSHVtYW5vaWRCb25lW107XG4gIC8qKlxuICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24ubGVnU3RyZXRjaFxuICAgKi9cbiAgbGVnU3RyZXRjaD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi5sb3dlckFybVR3aXN0XG4gICAqL1xuICBsb3dlckFybVR3aXN0PzogbnVtYmVyO1xuICAvKipcbiAgICogVW5pdHkncyBIdW1hbkRlc2NyaXB0aW9uLmxvd2VyTGVnVHdpc3RcbiAgICovXG4gIGxvd2VyTGVnVHdpc3Q/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBVbml0eSdzIEh1bWFuRGVzY3JpcHRpb24udXBwZXJBcm1Ud2lzdFxuICAgKi9cbiAgdXBwZXJBcm1Ud2lzdD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFVuaXR5J3MgSHVtYW5EZXNjcmlwdGlvbi51cHBlckxlZ1R3aXN0XG4gICAqL1xuICB1cHBlckxlZ1R3aXN0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1ZybUh1bWFub2lkQm9uZSB7XG4gIC8qKlxuICAgKiBVbml0eSdzIEh1bWFuTGltaXQuYXhpc0xlbmd0aFxuICAgKi9cbiAgYXhpc0xlbmd0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEh1bWFuIGJvbmUgbmFtZS5cbiAgICovXG4gIGJvbmU/OiBIdW1hbkJvbmU7XG4gIC8qKlxuICAgKiBVbml0eSdzIEh1bWFuTGltaXQuY2VudGVyXG4gICAqL1xuICBjZW50ZXI/OiBSYXdDZW50ZXI7XG4gIC8qKlxuICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWF4XG4gICAqL1xuICBtYXg/OiBSYXdNYXg7XG4gIC8qKlxuICAgKiBVbml0eSdzIEh1bWFuTGltaXQubWluXG4gICAqL1xuICBtaW4/OiBSYXdNaW47XG4gIC8qKlxuICAgKiBSZWZlcmVuY2Ugbm9kZSBpbmRleFxuICAgKi9cbiAgbm9kZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFVuaXR5J3MgSHVtYW5MaW1pdC51c2VEZWZhdWx0VmFsdWVzXG4gICAqL1xuICB1c2VEZWZhdWx0VmFsdWVzPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBIdW1hbiBib25lIG5hbWUuXG4gKi9cbmV4cG9ydCBlbnVtIEh1bWFuQm9uZSB7XG4gIENoZXN0ID0gJ2NoZXN0JyxcbiAgSGVhZCA9ICdoZWFkJyxcbiAgSGlwcyA9ICdoaXBzJyxcbiAgSmF3ID0gJ2phdycsXG4gIExlZnRFeWUgPSAnbGVmdEV5ZScsXG4gIExlZnRGb290ID0gJ2xlZnRGb290JyxcbiAgTGVmdEhhbmQgPSAnbGVmdEhhbmQnLFxuICBMZWZ0SW5kZXhEaXN0YWwgPSAnbGVmdEluZGV4RGlzdGFsJyxcbiAgTGVmdEluZGV4SW50ZXJtZWRpYXRlID0gJ2xlZnRJbmRleEludGVybWVkaWF0ZScsXG4gIExlZnRJbmRleFByb3hpbWFsID0gJ2xlZnRJbmRleFByb3hpbWFsJyxcbiAgTGVmdExpdHRsZURpc3RhbCA9ICdsZWZ0TGl0dGxlRGlzdGFsJyxcbiAgTGVmdExpdHRsZUludGVybWVkaWF0ZSA9ICdsZWZ0TGl0dGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdExpdHRsZVByb3hpbWFsID0gJ2xlZnRMaXR0bGVQcm94aW1hbCcsXG4gIExlZnRMb3dlckFybSA9ICdsZWZ0TG93ZXJBcm0nLFxuICBMZWZ0TG93ZXJMZWcgPSAnbGVmdExvd2VyTGVnJyxcbiAgTGVmdE1pZGRsZURpc3RhbCA9ICdsZWZ0TWlkZGxlRGlzdGFsJyxcbiAgTGVmdE1pZGRsZUludGVybWVkaWF0ZSA9ICdsZWZ0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgTGVmdE1pZGRsZVByb3hpbWFsID0gJ2xlZnRNaWRkbGVQcm94aW1hbCcsXG4gIExlZnRSaW5nRGlzdGFsID0gJ2xlZnRSaW5nRGlzdGFsJyxcbiAgTGVmdFJpbmdJbnRlcm1lZGlhdGUgPSAnbGVmdFJpbmdJbnRlcm1lZGlhdGUnLFxuICBMZWZ0UmluZ1Byb3hpbWFsID0gJ2xlZnRSaW5nUHJveGltYWwnLFxuICBMZWZ0U2hvdWxkZXIgPSAnbGVmdFNob3VsZGVyJyxcbiAgTGVmdFRodW1iRGlzdGFsID0gJ2xlZnRUaHVtYkRpc3RhbCcsXG4gIExlZnRUaHVtYkludGVybWVkaWF0ZSA9ICdsZWZ0VGh1bWJJbnRlcm1lZGlhdGUnLFxuICBMZWZ0VGh1bWJQcm94aW1hbCA9ICdsZWZ0VGh1bWJQcm94aW1hbCcsXG4gIExlZnRUb2VzID0gJ2xlZnRUb2VzJyxcbiAgTGVmdFVwcGVyQXJtID0gJ2xlZnRVcHBlckFybScsXG4gIExlZnRVcHBlckxlZyA9ICdsZWZ0VXBwZXJMZWcnLFxuICBOZWNrID0gJ25lY2snLFxuICBSaWdodEV5ZSA9ICdyaWdodEV5ZScsXG4gIFJpZ2h0Rm9vdCA9ICdyaWdodEZvb3QnLFxuICBSaWdodEhhbmQgPSAncmlnaHRIYW5kJyxcbiAgUmlnaHRJbmRleERpc3RhbCA9ICdyaWdodEluZGV4RGlzdGFsJyxcbiAgUmlnaHRJbmRleEludGVybWVkaWF0ZSA9ICdyaWdodEluZGV4SW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRJbmRleFByb3hpbWFsID0gJ3JpZ2h0SW5kZXhQcm94aW1hbCcsXG4gIFJpZ2h0TGl0dGxlRGlzdGFsID0gJ3JpZ2h0TGl0dGxlRGlzdGFsJyxcbiAgUmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUgPSAncmlnaHRMaXR0bGVJbnRlcm1lZGlhdGUnLFxuICBSaWdodExpdHRsZVByb3hpbWFsID0gJ3JpZ2h0TGl0dGxlUHJveGltYWwnLFxuICBSaWdodExvd2VyQXJtID0gJ3JpZ2h0TG93ZXJBcm0nLFxuICBSaWdodExvd2VyTGVnID0gJ3JpZ2h0TG93ZXJMZWcnLFxuICBSaWdodE1pZGRsZURpc3RhbCA9ICdyaWdodE1pZGRsZURpc3RhbCcsXG4gIFJpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlID0gJ3JpZ2h0TWlkZGxlSW50ZXJtZWRpYXRlJyxcbiAgUmlnaHRNaWRkbGVQcm94aW1hbCA9ICdyaWdodE1pZGRsZVByb3hpbWFsJyxcbiAgUmlnaHRSaW5nRGlzdGFsID0gJ3JpZ2h0UmluZ0Rpc3RhbCcsXG4gIFJpZ2h0UmluZ0ludGVybWVkaWF0ZSA9ICdyaWdodFJpbmdJbnRlcm1lZGlhdGUnLFxuICBSaWdodFJpbmdQcm94aW1hbCA9ICdyaWdodFJpbmdQcm94aW1hbCcsXG4gIFJpZ2h0U2hvdWxkZXIgPSAncmlnaHRTaG91bGRlcicsXG4gIFJpZ2h0VGh1bWJEaXN0YWwgPSAncmlnaHRUaHVtYkRpc3RhbCcsXG4gIFJpZ2h0VGh1bWJJbnRlcm1lZGlhdGUgPSAncmlnaHRUaHVtYkludGVybWVkaWF0ZScsXG4gIFJpZ2h0VGh1bWJQcm94aW1hbCA9ICdyaWdodFRodW1iUHJveGltYWwnLFxuICBSaWdodFRvZXMgPSAncmlnaHRUb2VzJyxcbiAgUmlnaHRVcHBlckFybSA9ICdyaWdodFVwcGVyQXJtJyxcbiAgUmlnaHRVcHBlckxlZyA9ICdyaWdodFVwcGVyTGVnJyxcbiAgU3BpbmUgPSAnc3BpbmUnLFxuICBVcHBlckNoZXN0ID0gJ3VwcGVyQ2hlc3QnLFxufVxuXG4vKipcbiAqIFVuaXR5J3MgSHVtYW5MaW1pdC5jZW50ZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdDZW50ZXIge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xuICB6PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFVuaXR5J3MgSHVtYW5MaW1pdC5tYXhcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdNYXgge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xuICB6PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFVuaXR5J3MgSHVtYW5MaW1pdC5taW5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdNaW4ge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xuICB6PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1ZybU1hdGVyaWFsIHtcbiAgZmxvYXRQcm9wZXJ0aWVzPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAga2V5d29yZE1hcD86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHJlbmRlclF1ZXVlPzogbnVtYmVyO1xuICBzaGFkZXI/OiBzdHJpbmc7XG4gIHRhZ01hcD86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG4gIHRleHR1cmVQcm9wZXJ0aWVzPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgdmVjdG9yUHJvcGVydGllcz86IHsgW2tleTogc3RyaW5nXTogYW55IH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3VnJtTWV0YSB7XG4gIC8qKlxuICAgKiBBIHBlcnNvbiB3aG8gY2FuIHBlcmZvcm0gd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgYWxsb3dlZFVzZXJOYW1lPzogQWxsb3dlZFVzZXJOYW1lO1xuICAvKipcbiAgICogQXV0aG9yIG9mIFZSTS50cyBtb2RlbFxuICAgKi9cbiAgYXV0aG9yPzogc3RyaW5nO1xuICAvKipcbiAgICogRm9yIGNvbW1lcmNpYWwgdXNlXG4gICAqL1xuICBjb21tZXJjaWFsVXNzYWdlTmFtZT86IFVzc2FnZU5hbWU7XG4gIC8qKlxuICAgKiBDb250YWN0IEluZm9ybWF0aW9uIG9mIFZSTS50cyBtb2RlbCBhdXRob3JcbiAgICovXG4gIGNvbnRhY3RJbmZvcm1hdGlvbj86IHN0cmluZztcbiAgLyoqXG4gICAqIExpY2Vuc2UgdHlwZVxuICAgKi9cbiAgbGljZW5zZU5hbWU/OiBMaWNlbnNlTmFtZTtcbiAgLyoqXG4gICAqIElmIOKAnE90aGVy4oCdIGlzIHNlbGVjdGVkLCBwdXQgdGhlIFVSTCBsaW5rIG9mIHRoZSBsaWNlbnNlIGRvY3VtZW50IGhlcmUuXG4gICAqL1xuICBvdGhlckxpY2Vuc2VVcmw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBJZiB0aGVyZSBhcmUgYW55IGNvbmRpdGlvbnMgbm90IG1lbnRpb25lZCBhYm92ZSwgcHV0IHRoZSBVUkwgbGluayBvZiB0aGUgbGljZW5zZSBkb2N1bWVudFxuICAgKiBoZXJlLlxuICAgKi9cbiAgb3RoZXJQZXJtaXNzaW9uVXJsPzogc3RyaW5nO1xuICAvKipcbiAgICogUmVmZXJlbmNlIG9mIFZSTS50cyBtb2RlbFxuICAgKi9cbiAgcmVmZXJlbmNlPzogc3RyaW5nO1xuICAvKipcbiAgICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHNleHVhbCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAgICovXG4gIHNleHVhbFVzc2FnZU5hbWU/OiBVc3NhZ2VOYW1lO1xuICAvKipcbiAgICogVGh1bWJuYWlsIG9mIFZSTS50cyBtb2RlbFxuICAgKi9cbiAgdGV4dHVyZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRpdGxlIG9mIFZSTS50cyBtb2RlbFxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBWZXJzaW9uIG9mIFZSTS50cyBtb2RlbFxuICAgKi9cbiAgdmVyc2lvbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFBlcm1pc3Npb24gdG8gcGVyZm9ybSB2aW9sZW50IGFjdHMgd2l0aCB0aGlzIGF2YXRhclxuICAgKi9cbiAgdmlvbGVudFVzc2FnZU5hbWU/OiBVc3NhZ2VOYW1lO1xufVxuXG4vKipcbiAqIEEgcGVyc29uIHdobyBjYW4gcGVyZm9ybSB3aXRoIHRoaXMgYXZhdGFyXG4gKi9cbmV4cG9ydCBlbnVtIEFsbG93ZWRVc2VyTmFtZSB7XG4gIEV2ZXJ5b25lID0gJ0V2ZXJ5b25lJyxcbiAgRXhwbGljaXRseUxpY2Vuc2VkUGVyc29uID0gJ0V4cGxpY2l0bHlMaWNlbnNlZFBlcnNvbicsXG4gIE9ubHlBdXRob3IgPSAnT25seUF1dGhvcicsXG59XG5cbi8qKlxuICogRm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogUGVybWlzc2lvbiB0byBwZXJmb3JtIHNleHVhbCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAqXG4gKiBQZXJtaXNzaW9uIHRvIHBlcmZvcm0gdmlvbGVudCBhY3RzIHdpdGggdGhpcyBhdmF0YXJcbiAqL1xuZXhwb3J0IGVudW0gVXNzYWdlTmFtZSB7XG4gIEFsbG93ID0gJ0FsbG93JyxcbiAgRGlzYWxsb3cgPSAnRGlzYWxsb3cnLFxufVxuXG4vKipcbiAqIExpY2Vuc2UgdHlwZVxuICovXG5leHBvcnQgZW51bSBMaWNlbnNlTmFtZSB7XG4gIENjMCA9ICdDQzAnLFxuICBDY0J5ID0gJ0NDX0JZJyxcbiAgQ2NCeU5jID0gJ0NDX0JZX05DJyxcbiAgQ2NCeU5jTmQgPSAnQ0NfQllfTkNfTkQnLFxuICBDY0J5TmNTYSA9ICdDQ19CWV9OQ19TQScsXG4gIENjQnlOZCA9ICdDQ19CWV9ORCcsXG4gIENjQnlTYSA9ICdDQ19CWV9TQScsXG4gIE90aGVyID0gJ090aGVyJyxcbiAgUmVkaXN0cmlidXRpb25Qcm9oaWJpdGVkID0gJ1JlZGlzdHJpYnV0aW9uX1Byb2hpYml0ZWQnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1ZybVNlY29uZGFyeWFuaW1hdGlvbiB7XG4gIGJvbmVHcm91cHM/OiBSYXdWcm1TZWNvbmRhcnlhbmltYXRpb25TcHJpbmdbXTtcbiAgY29sbGlkZXJHcm91cHM/OiBSYXdWcm1TZWNvbmRhcnlhbmltYXRpb25Db2xsaWRlcmdyb3VwW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3VnJtU2Vjb25kYXJ5YW5pbWF0aW9uU3ByaW5nIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIG5vZGUgaW5kZXggb2YgdGhlIHJvb3QgYm9uZSBvZiB0aGUgc3dheWluZyBvYmplY3QuXG4gICAqL1xuICBib25lcz86IG51bWJlcltdO1xuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSBwb2ludCBvZiBhIHN3YXlpbmcgb2JqZWN0IGNhbiBiZSBzZXQgYXQgYW55IGxvY2F0aW9uIGV4Y2VwdCB0aGUgb3JpZ2luLlxuICAgKiBXaGVuIGltcGxlbWVudGluZyBVSSBtb3Zpbmcgd2l0aCB3YXJwLCB0aGUgcGFyZW50IG5vZGUgdG8gbW92ZSB3aXRoIHdhcnAgY2FuIGJlIHNwZWNpZmllZFxuICAgKiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBtYWtlIHRoZSBvYmplY3Qgc3dheWluZyB3aXRoIHdhcnAgbW92ZW1lbnQuXG4gICAqL1xuICBjZW50ZXI/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBpbmRleCBvZiB0aGUgY29sbGlkZXIgZ3JvdXAgZm9yIGNvbGxpc2lvbnMgd2l0aCBzd2F5aW5nIG9iamVjdHMuXG4gICAqL1xuICBjb2xsaWRlckdyb3Vwcz86IG51bWJlcltdO1xuICAvKipcbiAgICogQW5ub3RhdGlvbiBjb21tZW50XG4gICAqL1xuICBjb21tZW50Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHJlc2lzdGFuY2UgKGRlY2VsZXJhdGlvbikgb2YgYXV0b21hdGljIGFuaW1hdGlvbi5cbiAgICovXG4gIGRyYWdGb3JjZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBkaXJlY3Rpb24gb2YgZ3Jhdml0eS4gU2V0ICgwLCAtMSwgMCkgZm9yIHNpbXVsYXRpbmcgdGhlIGdyYXZpdHkuIFNldCAoMSwgMCwgMCkgZm9yXG4gICAqIHNpbXVsYXRpbmcgdGhlIHdpbmQuXG4gICAqL1xuICBncmF2aXR5RGlyPzogUmF3R3Jhdml0eURpcjtcbiAgLyoqXG4gICAqIFRoZSBzdHJlbmd0aCBvZiBncmF2aXR5LlxuICAgKi9cbiAgZ3Jhdml0eVBvd2VyPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlIHVzZWQgZm9yIHRoZSBjb2xsaXNpb24gZGV0ZWN0aW9uIHdpdGggY29sbGlkZXJzLlxuICAgKi9cbiAgaGl0UmFkaXVzPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHJlc2lsaWVuY2Ugb2YgdGhlIHN3YXlpbmcgb2JqZWN0ICh0aGUgcG93ZXIgb2YgcmV0dXJuaW5nIHRvIHRoZSBpbml0aWFsIHBvc2UpLlxuICAgKi9cbiAgc3RpZmZpbmVzcz86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGUgZGlyZWN0aW9uIG9mIGdyYXZpdHkuIFNldCAoMCwgLTEsIDApIGZvciBzaW11bGF0aW5nIHRoZSBncmF2aXR5LiBTZXQgKDEsIDAsIDApIGZvclxuICogc2ltdWxhdGluZyB0aGUgd2luZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdHcmF2aXR5RGlyIHtcbiAgeD86IG51bWJlcjtcbiAgeT86IG51bWJlcjtcbiAgej86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYXdWcm1TZWNvbmRhcnlhbmltYXRpb25Db2xsaWRlcmdyb3VwIHtcbiAgY29sbGlkZXJzPzogUmF3Q29sbGlkZXJbXTtcbiAgLyoqXG4gICAqIFRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cCBmb3Igc2V0dGluZyB1cCBjb2xsaXNpb24gZGV0ZWN0aW9ucy5cbiAgICovXG4gIG5vZGU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3Q29sbGlkZXIge1xuICAvKipcbiAgICogVGhlIGxvY2FsIGNvb3JkaW5hdGUgZnJvbSB0aGUgbm9kZSBvZiB0aGUgY29sbGlkZXIgZ3JvdXAuXG4gICAqL1xuICBvZmZzZXQ/OiBSYXdPZmZzZXQ7XG4gIC8qKlxuICAgKiBUaGUgcmFkaXVzIG9mIHRoZSBjb2xsaWRlci5cbiAgICovXG4gIHJhZGl1cz86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGUgbG9jYWwgY29vcmRpbmF0ZSBmcm9tIHRoZSBub2RlIG9mIHRoZSBjb2xsaWRlciBncm91cC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSYXdPZmZzZXQge1xuICB4PzogbnVtYmVyO1xuICB5PzogbnVtYmVyO1xuICB6PzogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9WUk0nO1xuZXhwb3J0ICogZnJvbSAnLi9HTFRGJztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVlcERpc3Bvc2Uob2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEKTogdm9pZCB7XG4gIG9iamVjdDNELnRyYXZlcnNlKGRpc3Bvc2UpO1xufVxuXG5mdW5jdGlvbiBkaXNwb3NlKG9iamVjdDNEOiBhbnkpOiB2b2lkIHtcbiAgaWYgKCEhb2JqZWN0M0QuZ2VvbWV0cnkpIHtcbiAgICBvYmplY3QzRC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgb2JqZWN0M0QuZ2VvbWV0cnkgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoISFvYmplY3QzRC5tYXRlcmlhbCAmJiBBcnJheS5pc0FycmF5KG9iamVjdDNELm1hdGVyaWFsKSkge1xuICAgIG9iamVjdDNELm1hdGVyaWFsLmZvckVhY2goKG1hdGVyaWFsOiBUSFJFRS5NYXRlcmlhbCkgPT4gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsKSk7XG4gIH0gZWxzZSBpZiAoISFvYmplY3QzRC5tYXRlcmlhbCkge1xuICAgIGRpc3Bvc2VNYXRlcmlhbChvYmplY3QzRC5tYXRlcmlhbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcG9zZU1hdGVyaWFsKG1hdGVyaWFsOiBhbnkpOiB2b2lkIHtcbiAgT2JqZWN0LmtleXMobWF0ZXJpYWwpLmZvckVhY2goKHByb3BlcnR5TmFtZSkgPT4ge1xuICAgIGlmICghIW1hdGVyaWFsW3Byb3BlcnR5TmFtZV0gJiYgdHlwZW9mIG1hdGVyaWFsW3Byb3BlcnR5TmFtZV0uZGlzcG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbWF0ZXJpYWxbcHJvcGVydHlOYW1lXS5kaXNwb3NlKCk7XG4gICAgfVxuICB9KTtcblxuICBtYXRlcmlhbC5kaXNwb3NlKCk7XG4gIG1hdGVyaWFsID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG4vLyBtaW7jgahtYXjjga7plpPjga7ot53pm6LjgavjgYrjgZHjgovjgIF444Gu44OR44O844K744Oz44OG44O844K444KS6KGo44GZ44CBMOOBi+OCiTHjgb7jgafjga7mta7li5XlsI/mlbDngrnmlbDlgKTjgpLov5TjgZlcbi8vIO+8iHRocmVlLmpz44Gr44Gvc21vb3Roc3RlcOOBr+OBguOCi+OBjOOAgWxpbnN0ZXDjgYznlKjmhI/jgZXjgozjgabjgYTjgarjgYTvvIlcbmV4cG9ydCBmdW5jdGlvbiBsaW5zdGVwKHg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHggPD0gbWluKSByZXR1cm4gMDtcbiAgaWYgKHggPj0gbWF4KSByZXR1cm4gMTtcblxuICByZXR1cm4gKHggLSBtaW4pIC8gKG1heCAtIG1pbik7XG59XG5cbmNvbnN0IF9wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfc2NhbGUgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3JvdGF0aW9uID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKTtcblxuLyoqXG4gKiBFeHRyYWN0IG9iamVjdCdzIHdvcmxkIHBvc2l0aW9uLCBpbiBjaGVhcGVyIHdheVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ybGRQb3NpdGlvbkxpdGUob2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgb3V0OiBUSFJFRS5WZWN0b3IzKTogVEhSRUUuVmVjdG9yMyB7XG4gIG9iamVjdC5tYXRyaXhXb3JsZC5kZWNvbXBvc2Uob3V0LCBfcm90YXRpb24sIF9zY2FsZSk7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogRXh0cmFjdCBvYmplY3QncyB3b3JsZCBzY2FsZSwgaW4gY2hlYXBlciB3YXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmxkU2NhbGVMaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuVmVjdG9yMyk6IFRIUkVFLlZlY3RvcjMge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgX3JvdGF0aW9uLCBvdXQpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIEV4dHJhY3Qgb2JqZWN0J3Mgd29ybGQgcm90YXRpb24sIGluIGNoZWFwZXIgd2F5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JsZFF1YXRlcm5pb25MaXRlKG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIG91dDogVEhSRUUuUXVhdGVybmlvbik6IFRIUkVFLlF1YXRlcm5pb24ge1xuICBvYmplY3QubWF0cml4V29ybGQuZGVjb21wb3NlKF9wb3NpdGlvbiwgb3V0LCBfc2NhbGUpO1xuICByZXR1cm4gb3V0O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBUSFJFRTsiXSwic291cmNlUm9vdCI6IiJ9