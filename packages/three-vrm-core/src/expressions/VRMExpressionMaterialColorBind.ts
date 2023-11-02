import * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';
import type { VRMExpressionMaterialColorType } from './VRMExpressionMaterialColorType';

const _color = new THREE.Color();

interface ColorBindState {
  propertyName: string;
  initialValue: THREE.Color;
  deltaValue: THREE.Color;
}

interface AlphaBindState {
  propertyName: string;
  initialValue: number;
  deltaValue: number;
}

interface BindState {
  color: ColorBindState | null;
  alpha: AlphaBindState | null;
}

/**
 * A bind of expression influences to a material color.
 */
export class VRMExpressionMaterialColorBind implements VRMExpressionBind {
  /**
   * Mapping of property names from VRMC/materialColorBinds.type to three.js/Material.
   * The first element stands for color channels, the second element stands for the alpha channel.
   * The second element can be null if the target property doesn't exist.
   */
  // TODO: We might want to use the `satisfies` operator once we bump TS to 4.9 or higher
  // See: https://github.com/pixiv/three-vrm/pull/1323#discussion_r1374020035
  private static _propertyNameMapMap: {
    [distinguisher: string]: { [type in VRMExpressionMaterialColorType]?: readonly [string, string | null] };
  } = {
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
   * The target material.
   */
  public readonly material: THREE.Material;

  /**
   * The type of the target property of the material.
   */
  public readonly type: VRMExpressionMaterialColorType;

  /**
   * The target color.
   */
  public readonly targetValue: THREE.Color;

  /**
   * The target alpha.
   */
  public readonly targetAlpha: number;

  /**
   * Its binding state.
   * If it cannot find the target property in the constructor, each property will be null instead.
   */
  private _state: BindState;

  public constructor({
    material,
    type,
    targetValue,
    targetAlpha,
  }: {
    /**
     * The target material.
     */
    material: THREE.Material;

    /**
     * The type of the target property of the material.
     */
    type: VRMExpressionMaterialColorType;

    /**
     * The target color.
     */
    targetValue: THREE.Color;

    /**
     * The target alpha.
     */
    targetAlpha?: number;
  }) {
    this.material = material;
    this.type = type;
    this.targetValue = targetValue;
    this.targetAlpha = targetAlpha ?? 1.0;

    // init bind state
    const color = this._initColorBindState();
    const alpha = this._initAlphaBindState();
    this._state = { color, alpha };
  }

  public applyWeight(weight: number): void {
    const { color, alpha } = this._state;

    if (color != null) {
      const { propertyName, deltaValue } = color;

      const target = (this.material as any)[propertyName] as THREE.Color;
      if (target != undefined) {
        target.add(_color.copy(deltaValue).multiplyScalar(weight));
      }
    }

    if (alpha != null) {
      const { propertyName, deltaValue } = alpha;

      const target = (this.material as any)[propertyName] as number;
      if (target != undefined) {
        ((this.material as any)[propertyName] as number) += deltaValue * weight;
      }
    }
  }

  public clearAppliedWeight(): void {
    const { color, alpha } = this._state;

    if (color != null) {
      const { propertyName, initialValue } = color;

      const target = (this.material as any)[propertyName] as THREE.Color;
      if (target != undefined) {
        target.copy(initialValue);
      }
    }

    if (alpha != null) {
      const { propertyName, initialValue } = alpha;

      const target = (this.material as any)[propertyName] as number;
      if (target != undefined) {
        ((this.material as any)[propertyName] as number) = initialValue;
      }
    }
  }

  private _initColorBindState(): ColorBindState | null {
    const { material, type, targetValue } = this;

    const propertyNameMap = this._getPropertyNameMap();
    const propertyName = propertyNameMap?.[type]?.[0] ?? null;

    if (propertyName == null) {
      console.warn(
        `Tried to add a material color bind to the material ${
          material.name ?? '(no name)'
        }, the type ${type} but the material or the type is not supported.`,
      );

      return null;
    }

    const target = (material as any)[propertyName] as THREE.Color;

    const initialValue = target.clone();

    // 負の値を保持するためにColor.subを使わずに差分を計算する
    const deltaValue = new THREE.Color(
      targetValue.r - initialValue.r,
      targetValue.g - initialValue.g,
      targetValue.b - initialValue.b,
    );

    return { propertyName, initialValue, deltaValue };
  }

  private _initAlphaBindState(): AlphaBindState | null {
    const { material, type, targetAlpha } = this;

    const propertyNameMap = this._getPropertyNameMap();
    const propertyName = propertyNameMap?.[type]?.[1] ?? null;

    if (propertyName == null && targetAlpha !== 1.0) {
      console.warn(
        `Tried to add a material alpha bind to the material ${
          material.name ?? '(no name)'
        }, the type ${type} but the material or the type does not support alpha.`,
      );

      return null;
    }

    if (propertyName == null) {
      return null;
    }

    const initialValue = (material as any)[propertyName] as number;

    const deltaValue = targetAlpha - initialValue;

    return { propertyName, initialValue, deltaValue };
  }

  private _getPropertyNameMap():
    | { [type in VRMExpressionMaterialColorType]?: readonly [string, string | null] }
    | null {
    return (
      Object.entries(VRMExpressionMaterialColorBind._propertyNameMapMap).find(([distinguisher]) => {
        return (this.material as any)[distinguisher] === true;
      })?.[1] ?? null
    );
  }
}
