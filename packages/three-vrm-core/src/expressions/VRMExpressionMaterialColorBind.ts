import * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';
import type { VRMExpressionMaterialColorType } from './VRMExpressionMaterialColorType';

const _color = new THREE.Color();

/**
 * A bind of expression influences to a material color.
 */
export class VRMExpressionMaterialColorBind implements VRMExpressionBind {
  private static _propertyNameMapMap: {
    [distinguisher: string]: { [type in VRMExpressionMaterialColorType]?: string };
  } = {
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
      rimColor: 'parametricRimColorFactor',
      shadeColor: 'shadeColorFactor',
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
   * Its state.
   * If it cannot find the target property in constructor, it will be null instead.
   */
  private _state: {
    propertyName: string;
    initialValue: THREE.Color;
    deltaValue: THREE.Color;
  } | null;

  public constructor({
    material,
    type,
    targetValue,
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
  }) {
    this.material = material;
    this.type = type;
    this.targetValue = targetValue;

    // init property name
    const propertyNameMap = Object.entries(VRMExpressionMaterialColorBind._propertyNameMapMap).find(
      ([distinguisher]) => {
        return (material as any)[distinguisher] === true;
      },
    )?.[1];
    const propertyName = propertyNameMap?.[type] ?? null;

    if (propertyName == null) {
      console.warn(
        `Tried to add a material color bind to the material ${
          material.name ?? '(no name)'
        }, the type ${type} but the material or the type is not supported.`,
      );

      this._state = null;
    } else {
      const target = (material as any)[propertyName] as THREE.Color;

      const initialValue = target.clone();

      // 負の値を保持するためにColor.subを使わずに差分を計算する
      const deltaValue = new THREE.Color(
        targetValue.r - initialValue.r,
        targetValue.g - initialValue.g,
        targetValue.b - initialValue.b,
      );

      this._state = {
        propertyName,
        initialValue,
        deltaValue,
      };
    }
  }

  public applyWeight(weight: number): void {
    if (this._state == null) {
      // warning is already emitted in constructor
      return;
    }

    const { propertyName, deltaValue } = this._state;

    const target = (this.material as any)[propertyName] as THREE.Color;
    if (target === undefined) {
      return;
    } // TODO: we should kick this at `addMaterialValue`

    target.add(_color.copy(deltaValue).multiplyScalar(weight));

    if (typeof (this.material as any).shouldApplyUniforms === 'boolean') {
      (this.material as any).shouldApplyUniforms = true;
    }
  }

  public clearAppliedWeight(): void {
    if (this._state == null) {
      // warning is already emitted in constructor
      return;
    }

    const { propertyName, initialValue } = this._state;

    const target = (this.material as any)[propertyName] as THREE.Color;
    if (target === undefined) {
      return;
    } // TODO: we should kick this at `addMaterialValue`

    target.copy(initialValue);

    if (typeof (this.material as any).shouldApplyUniforms === 'boolean') {
      (this.material as any).shouldApplyUniforms = true;
    }
  }
}
