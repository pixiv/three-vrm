/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.4.5
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
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
export {
  VRMMaterialsHDREmissiveMultiplierLoaderPlugin
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL1ZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgR0xURkxvYWRlclBsdWdpbiwgR0xURlBhcnNlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnO1xuaW1wb3J0ICogYXMgSERSRW1pc3NpdmVNdWx0aXBsaWVyU2NoZW1hIGZyb20gJ0BwaXhpdi90eXBlcy12cm1jLW1hdGVyaWFscy1oZHItZW1pc3NpdmUtbXVsdGlwbGllci0xLjAnO1xuaW1wb3J0IHsgR0xURiBhcyBHTFRGU2NoZW1hIH0gZnJvbSAnQGdsdGYtdHJhbnNmb3JtL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luIGltcGxlbWVudHMgR0xURkxvYWRlclBsdWdpbiB7XG4gIHB1YmxpYyBzdGF0aWMgRVhURU5TSU9OX05BTUUgPSAnVlJNQ19tYXRlcmlhbHNfaGRyX2VtaXNzaXZlTXVsdGlwbGllcicgYXMgY29uc3Q7XG5cbiAgcHVibGljIHJlYWRvbmx5IHBhcnNlcjogR0xURlBhcnNlcjtcblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcnNlcjogR0xURlBhcnNlcikge1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4dGVuZE1hdGVyaWFsUGFyYW1zKG1hdGVyaWFsSW5kZXg6IG51bWJlciwgbWF0ZXJpYWxQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9nZXRIRFJFbWlzc2l2ZU11bHRpcGxpZXJFeHRlbnNpb24obWF0ZXJpYWxJbmRleCk7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhpcyBleHRlbnNpb24gaXMgYXJjaGl2ZWQuIEVtaXQgd2FybmluZ1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3ZybS1jL3ZybS1zcGVjaWZpY2F0aW9uL3B1bGwvMzc1XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1ZSTU1hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllckxvYWRlclBsdWdpbjogYFZSTUNfbWF0ZXJpYWxzX2hkcl9lbWlzc2l2ZU11bHRpcGxpZXJgIGlzIGFyY2hpdmVkLiBVc2UgYEtIUl9tYXRlcmlhbHNfZW1pc3NpdmVfc3RyZW5ndGhgIGluc3RlYWQuJyxcbiAgICApO1xuXG4gICAgY29uc3QgZW1pc3NpdmVNdWx0aXBsaWVyID0gZXh0ZW5zaW9uLmVtaXNzaXZlTXVsdGlwbGllcjtcbiAgICBtYXRlcmlhbFBhcmFtcy5lbWlzc2l2ZUludGVuc2l0eSA9IGVtaXNzaXZlTXVsdGlwbGllcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEhEUkVtaXNzaXZlTXVsdGlwbGllckV4dGVuc2lvbihcbiAgICBtYXRlcmlhbEluZGV4OiBudW1iZXIsXG4gICk6IEhEUkVtaXNzaXZlTXVsdGlwbGllclNjaGVtYS5WUk1DTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLnBhcnNlcjtcbiAgICBjb25zdCBqc29uID0gcGFyc2VyLmpzb24gYXMgR0xURlNjaGVtYS5JR0xURjtcblxuICAgIGNvbnN0IG1hdGVyaWFsRGVmID0ganNvbi5tYXRlcmlhbHM/LlttYXRlcmlhbEluZGV4XTtcblxuICAgIGlmIChtYXRlcmlhbERlZiA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBWUk1NYXRlcmlhbHNIRFJFbWlzc2l2ZU11bHRpcGxpZXJMb2FkZXJQbHVnaW46IEF0dGVtcHQgdG8gdXNlIG1hdGVyaWFsc1ske21hdGVyaWFsSW5kZXh9XSBvZiBnbFRGIGJ1dCB0aGUgbWF0ZXJpYWwgZG9lc24ndCBleGlzdGAsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbnNpb24gPSBtYXRlcmlhbERlZi5leHRlbnNpb25zPy5bVlJNTWF0ZXJpYWxzSERSRW1pc3NpdmVNdWx0aXBsaWVyTG9hZGVyUGx1Z2luLkVYVEVOU0lPTl9OQU1FXSBhc1xuICAgICAgfCBIRFJFbWlzc2l2ZU11bHRpcGxpZXJTY2hlbWEuVlJNQ01hdGVyaWFsc0hEUkVtaXNzaXZlTXVsdGlwbGllclxuICAgICAgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGV4dGVuc2lvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlPLElBQU0saURBQU4sTUFBTSwrQ0FBMEU7QUFBQSxFQUtyRixJQUFXLE9BQWU7QUFDeEIsV0FBTywrQ0FBOEM7QUFBQSxFQUN2RDtBQUFBLEVBRU8sWUFBWSxRQUFvQjtBQUNyQyxTQUFLLFNBQVM7QUFBQSxFQUNoQjtBQUFBLEVBRWEscUJBQXFCLGVBQXVCLGdCQUF1RDtBQUFBO0FBQzlHLFlBQU0sWUFBWSxLQUFLLG1DQUFtQyxhQUFhO0FBQ3ZFLFVBQUksYUFBYSxNQUFNO0FBQ3JCO0FBQUEsTUFDRjtBQUlBLGNBQVE7QUFBQSxRQUNOO0FBQUEsTUFDRjtBQUVBLFlBQU0scUJBQXFCLFVBQVU7QUFDckMscUJBQWUsb0JBQW9CO0FBQUEsSUFDckM7QUFBQTtBQUFBLEVBRVEsbUNBQ04sZUFDNEU7QUFuQ2hGO0FBb0NJLFVBQU0sU0FBUyxLQUFLO0FBQ3BCLFVBQU0sT0FBTyxPQUFPO0FBRXBCLFVBQU0sZUFBYyxVQUFLLGNBQUwsbUJBQWlCO0FBRXJDLFFBQUksZUFBZSxNQUFNO0FBQ3ZCLGNBQVE7QUFBQSxRQUNOLDJFQUEyRSxhQUFhO0FBQUEsTUFDMUY7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sYUFBWSxpQkFBWSxlQUFaLG1CQUF5QiwrQ0FBOEM7QUFHekYsUUFBSSxhQUFhLE1BQU07QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBckRhLCtDQUNHLGlCQUFpQjtBQUQxQixJQUFNLGdEQUFOOyIsCiAgIm5hbWVzIjogW10KfQo=
