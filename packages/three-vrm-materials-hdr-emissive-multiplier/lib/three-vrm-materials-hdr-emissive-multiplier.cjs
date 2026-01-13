/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.4.5
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  VRMMaterialsHDREmissiveMultiplierLoaderPlugin: () => VRMMaterialsHDREmissiveMultiplierLoaderPlugin
});
module.exports = __toCommonJS(src_exports);

// src/VRMMaterialsHDREmissiveMultiplierLoaderPlugin.ts
var _VRMMaterialsHDREmissiveMultiplierLoaderPlugin = class _VRMMaterialsHDREmissiveMultiplierLoaderPlugin {
  get name() {
    return _VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME;
  }
  constructor(parser) {
    this.parser = parser;
  }
  extendMaterialParams(materialIndex, materialParams) {
    return __async(this, null, function* () {
      const extension = this._getHDREmissiveMultiplierExtension(materialIndex);
      if (extension == null) {
        return;
      }
      console.warn(
        "VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead."
      );
      const emissiveMultiplier = extension.emissiveMultiplier;
      materialParams.emissiveIntensity = emissiveMultiplier;
    });
  }
  _getHDREmissiveMultiplierExtension(materialIndex) {
    var _a, _b;
    const parser = this.parser;
    const json = parser.json;
    const materialDef = (_a = json.materials) == null ? void 0 : _a[materialIndex];
    if (materialDef == null) {
      console.warn(
        `VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${materialIndex}] of glTF but the material doesn't exist`
      );
      return void 0;
    }
    const extension = (_b = materialDef.extensions) == null ? void 0 : _b[_VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME];
    if (extension == null) {
      return void 0;
    }
    return extension;
  }
};
_VRMMaterialsHDREmissiveMultiplierLoaderPlugin.EXTENSION_NAME = "VRMC_materials_hdr_emissiveMultiplier";
var VRMMaterialsHDREmissiveMultiplierLoaderPlugin = _VRMMaterialsHDREmissiveMultiplierLoaderPlugin;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9WUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7IFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbiB9IGZyb20gJy4vVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luJztcbiIsICJpbXBvcnQgeyBHTFRGTG9hZGVyUGx1Z2luLCBHTFRGUGFyc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcyc7XG5pbXBvcnQgKiBhcyBIRFJFbWlzc2l2ZU11bHRpcGxpZXJTY2hlbWEgZnJvbSAnQHBpeGl2L3R5cGVzLXZybWMtbWF0ZXJpYWxzLWhkci1lbWlzc2l2ZS1tdWx0aXBsaWVyLTEuMCc7XG5pbXBvcnQgeyBHTFRGIGFzIEdMVEZTY2hlbWEgfSBmcm9tICdAZ2x0Zi10cmFuc2Zvcm0vY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4gaW1wbGVtZW50cyBHTFRGTG9hZGVyUGx1Z2luIHtcbiAgcHVibGljIHN0YXRpYyBFWFRFTlNJT05fTkFNRSA9ICdWUk1DX21hdGVyaWFsc19oZHJfZW1pc3NpdmVNdWx0aXBsaWVyJyBhcyBjb25zdDtcblxuICBwdWJsaWMgcmVhZG9ubHkgcGFyc2VyOiBHTFRGUGFyc2VyO1xuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyc2VyOiBHTFRGUGFyc2VyKSB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXh0ZW5kTWF0ZXJpYWxQYXJhbXMobWF0ZXJpYWxJbmRleDogbnVtYmVyLCBtYXRlcmlhbFBhcmFtczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2dldEhEUkVtaXNzaXZlTXVsdGlwbGllckV4dGVuc2lvbihtYXRlcmlhbEluZGV4KTtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGV4dGVuc2lvbiBpcyBhcmNoaXZlZC4gRW1pdCB3YXJuaW5nXG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdnJtLWMvdnJtLXNwZWNpZmljYXRpb24vcHVsbC8zNzVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luOiBgVlJNQ19tYXRlcmlhbHNfaGRyX2VtaXNzaXZlTXVsdGlwbGllcmAgaXMgYXJjaGl2ZWQuIFVzZSBgS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aGAgaW5zdGVhZC4nLFxuICAgICk7XG5cbiAgICBjb25zdCBlbWlzc2l2ZU11bHRpcGxpZXIgPSBleHRlbnNpb24uZW1pc3NpdmVNdWx0aXBsaWVyO1xuICAgIG1hdGVyaWFsUGFyYW1zLmVtaXNzaXZlSW50ZW5zaXR5ID0gZW1pc3NpdmVNdWx0aXBsaWVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0SERSRW1pc3NpdmVNdWx0aXBsaWVyRXh0ZW5zaW9uKFxuICAgIG1hdGVyaWFsSW5kZXg6IG51bWJlcixcbiAgKTogSERSRW1pc3NpdmVNdWx0aXBsaWVyU2NoZW1hLlZSTUNNYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMucGFyc2VyO1xuICAgIGNvbnN0IGpzb24gPSBwYXJzZXIuanNvbiBhcyBHTFRGU2NoZW1hLklHTFRGO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxEZWYgPSBqc29uLm1hdGVyaWFscz8uW21hdGVyaWFsSW5kZXhdO1xuXG4gICAgaWYgKG1hdGVyaWFsRGVmID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbjogQXR0ZW1wdCB0byB1c2UgbWF0ZXJpYWxzWyR7bWF0ZXJpYWxJbmRleH1dIG9mIGdsVEYgYnV0IHRoZSBtYXRlcmlhbCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IG1hdGVyaWFsRGVmLmV4dGVuc2lvbnM/LltWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW4uRVhURU5TSU9OX05BTUVdIGFzXG4gICAgICB8IEhEUkVtaXNzaXZlTXVsdGlwbGllclNjaGVtYS5WUk1DTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyXG4gICAgICB8IHVuZGVmaW5lZDtcbiAgICBpZiAoZXh0ZW5zaW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDSU8sSUFBTSxpREFBTixNQUFNLCtDQUEwRTtBQUFBLEVBS3JGLElBQVcsT0FBZTtBQUN4QixXQUFPLCtDQUE4QztBQUFBLEVBQ3ZEO0FBQUEsRUFFTyxZQUFZLFFBQW9CO0FBQ3JDLFNBQUssU0FBUztBQUFBLEVBQ2hCO0FBQUEsRUFFYSxxQkFBcUIsZUFBdUIsZ0JBQXVEO0FBQUE7QUFDOUcsWUFBTSxZQUFZLEtBQUssbUNBQW1DLGFBQWE7QUFDdkUsVUFBSSxhQUFhLE1BQU07QUFDckI7QUFBQSxNQUNGO0FBSUEsY0FBUTtBQUFBLFFBQ047QUFBQSxNQUNGO0FBRUEsWUFBTSxxQkFBcUIsVUFBVTtBQUNyQyxxQkFBZSxvQkFBb0I7QUFBQSxJQUNyQztBQUFBO0FBQUEsRUFFUSxtQ0FDTixlQUM0RTtBQW5DaEY7QUFvQ0ksVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxPQUFPLE9BQU87QUFFcEIsVUFBTSxlQUFjLFVBQUssY0FBTCxtQkFBaUI7QUFFckMsUUFBSSxlQUFlLE1BQU07QUFDdkIsY0FBUTtBQUFBLFFBQ04sMkVBQTJFLGFBQWE7QUFBQSxNQUMxRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxhQUFZLGlCQUFZLGVBQVosbUJBQXlCLCtDQUE4QztBQUd6RixRQUFJLGFBQWEsTUFBTTtBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFyRGEsK0NBQ0csaUJBQWlCO0FBRDFCLElBQU0sZ0RBQU47IiwKICAibmFtZXMiOiBbXQp9Cg==
