import * as THREE from 'three';
import type { VRMExpressionMaterialColorBind } from './VRMExpressionMaterialColorBind';
import type { VRMExpressionMaterialColorBindState } from './VRMExpressionMaterialColorBindState';
import type { VRMExpressionMaterialColorType } from './VRMExpressionMaterialColorType';
import type { VRMExpressionMorphTargetBind } from './VRMExpressionMorphTargetBind';
import type { VRMExpressionOverrideType } from './VRMExpressionOverrideType';
import type { VRMExpressionTextureTransformBind } from './VRMExpressionTextureTransformBind';
import type { VRMExpressionTextureTransformBindState } from './VRMExpressionTextureTransformBindState';

const _v2 = new THREE.Vector2();
const _color = new THREE.Color();

// animationMixer の監視対象は、Scene の中に入っている必要がある。
// そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
export class VRMExpression extends THREE.Object3D {
  public materialColorTypePropertyNameMap: {
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
      outlineColor: 'outlineFactor',
      rimColor: 'rimFactor',
      shadeColor: 'shadeFactor',
    },
  };

  public textureTransformPropertyNamesMap: { [distinguisher: string]: string[] } = {
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
   * Name of this expression.
   * Distinguished with `name` since `name` will be conflicted with Object3D.
   */
  public expressionName: string;

  /**
   * The current weight of the expression.
   */
  public weight = 0.0;

  /**
   * Interpret non-zero values as 1.
   */
  public isBinary = false;

  /**
   * Specify how the expression overrides blink expressions.
   */
  public overrideBlink: VRMExpressionOverrideType = 'none';

  /**
   * Specify how the expression overrides lookAt expressions.
   */
  public overrideLookAt: VRMExpressionOverrideType = 'none';

  /**
   * Specify how the expression overrides mouth expressions.
   */
  public overrideMouth: VRMExpressionOverrideType = 'none';

  private _materialColorBinds: (VRMExpressionMaterialColorBind & VRMExpressionMaterialColorBindState)[] = [];
  private _morphTargetBinds: VRMExpressionMorphTargetBind[] = [];
  private _textureTransformBinds: (VRMExpressionTextureTransformBind & VRMExpressionTextureTransformBindState)[] = [];

  /**
   * A value represents how much it should override blink expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  public get overrideBlinkAmount(): number {
    if (this.overrideBlink === 'block') {
      return 0.0 < this.weight ? 1.0 : 0.0;
    } else if (this.overrideBlink === 'blend') {
      return this.weight;
    } else {
      return 0.0;
    }
  }

  /**
   * A value represents how much it should override lookAt expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  public get overrideLookAtAmount(): number {
    if (this.overrideLookAt === 'block') {
      return 0.0 < this.weight ? 1.0 : 0.0;
    } else if (this.overrideLookAt === 'blend') {
      return this.weight;
    } else {
      return 0.0;
    }
  }

  /**
   * A value represents how much it should override mouth expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  public get overrideMouthAmount(): number {
    if (this.overrideMouth === 'block') {
      return 0.0 < this.weight ? 1.0 : 0.0;
    } else if (this.overrideMouth === 'blend') {
      return this.weight;
    } else {
      return 0.0;
    }
  }

  constructor(expressionName: string) {
    super();

    this.name = `VRMExpression_${expressionName}`;
    this.expressionName = expressionName;

    // traverse 時の救済手段として Object3D ではないことを明示しておく
    this.type = 'VRMExpression';
    // 表示目的のオブジェクトではないので、負荷軽減のために visible を false にしておく。
    // これにより、このインスタンスに対する毎フレームの matrix 自動計算を省略できる。
    this.visible = false;
  }

  public addMorphTargetBind(bind: VRMExpressionMorphTargetBind): void {
    this._morphTargetBinds.push(bind);
  }

  public addMaterialColorBind(bind: VRMExpressionMaterialColorBind): void {
    const { material, type } = bind;

    const propertyNameMap = Object.entries(this.materialColorTypePropertyNameMap).find(([distinguisher]) => {
      return (material as any)[distinguisher] === true;
    })?.[1];
    const propertyName = propertyNameMap?.[type];

    if (!propertyName) {
      console.warn(
        `Tried to add a material color bind to the material ${
          material.name ?? '(no name)'
        }, the type ${type} but the material or the type is not supported.`,
      );
      return;
    }

    const target = (material as any)[propertyName] as THREE.Color;

    const initialColor = target.clone();
    const deltaColor = bind.targetValue.clone().sub(initialColor);

    this._materialColorBinds.push({
      ...bind,
      propertyName,
      initialValue: initialColor,
      deltaValue: deltaColor,
    });
  }

  public addTextureTransformBind(bind: VRMExpressionTextureTransformBind): void {
    const { material } = bind;

    const propertyNames = Object.entries(this.textureTransformPropertyNamesMap).find(([distinguisher]) => {
      return (material as any)[distinguisher] === true;
    })?.[1];

    if (!propertyNames) {
      console.warn(
        `Tried to add a texture transform bind to the material ${
          material.name ?? '(no name)'
        } but the material is not supported.`,
      );
      return;
    }

    const properties: VRMExpressionTextureTransformBindState['properties'] = [];
    propertyNames.forEach((propertyName) => {
      const texture = ((material as any)[propertyName] as THREE.Texture | undefined)?.clone();
      if (texture) {
        (material as any)[propertyName] = texture; // because the texture is cloned

        const initialOffset = texture.offset.clone();
        const deltaOffset = bind.offset.clone().sub(initialOffset);
        const initialScaling = texture.repeat.clone();
        const deltaScaling = bind.scaling.clone().multiply(initialScaling);

        properties.push({
          name: propertyName,
          initialOffset,
          deltaOffset,
          initialScaling,
          deltaScaling,
        });
      }
    });

    this._textureTransformBinds.push({
      ...bind,
      properties,
    });
  }

  /**
   * Apply weight to every assigned blend shapes.
   * Should be called every frame.
   */
  public applyWeight(options?: {
    /**
     * Multiplies a value to its weight to apply.
     * Intended to be used for overriding an expression weight by another expression.
     * See also: {@link overrideBlink}, {@link overrideLookAt}, {@link overrideMouth}
     */
    multiplier?: number;
  }): void {
    let actualWeight = this.isBinary ? (this.weight === 0.0 ? 0.0 : 1.0) : this.weight;
    actualWeight *= options?.multiplier ?? 1.0;

    this._morphTargetBinds.forEach((bind) => {
      bind.primitives.forEach((mesh) => {
        if (!mesh.morphTargetInfluences) {
          return;
        } // TODO: we should kick this at `addBind`

        mesh.morphTargetInfluences[bind.index] += actualWeight * bind.weight;
      });
    });

    this._materialColorBinds.forEach((bind) => {
      const target = (bind.material as any)[bind.propertyName] as THREE.Color;
      if (target === undefined) {
        return;
      } // TODO: we should kick this at `addMaterialValue`

      target.add(_color.copy(bind.deltaValue).multiplyScalar(actualWeight));

      if (typeof (bind.material as any).shouldApplyUniforms === 'boolean') {
        (bind.material as any).shouldApplyUniforms = true;
      }
    });

    this._textureTransformBinds.forEach((bind) => {
      bind.properties.forEach((property) => {
        const target = (bind.material as any)[property.name] as THREE.Texture;
        if (target === undefined) {
          return;
        } // TODO: we should kick this at `addMaterialValue`

        target.offset.add(_v2.copy(property.deltaOffset).multiplyScalar(actualWeight));
        target.repeat.add(_v2.copy(property.deltaScaling).multiplyScalar(actualWeight));

        target.needsUpdate = true;
      });
    });
  }

  /**
   * Clear previously assigned blend shapes.
   */
  public clearAppliedWeight(): void {
    this._morphTargetBinds.forEach((bind) => {
      bind.primitives.forEach((mesh) => {
        if (!mesh.morphTargetInfluences) {
          return;
        } // TODO: we should kick this at `addBind`

        mesh.morphTargetInfluences[bind.index] = 0.0;
      });
    });

    this._materialColorBinds.forEach((bind) => {
      const target = (bind.material as any)[bind.propertyName] as THREE.Color;
      if (target === undefined) {
        return;
      } // TODO: we should kick this at `addMaterialValue`

      const initialValue = bind.initialValue;
      target.copy(initialValue);

      if (typeof (bind.material as any).shouldApplyUniforms === 'boolean') {
        (bind.material as any).shouldApplyUniforms = true;
      }
    });

    this._textureTransformBinds.forEach((bind) => {
      bind.properties.forEach((property) => {
        const target = (bind.material as any)[property.name] as THREE.Texture;
        if (target === undefined) {
          return;
        } // TODO: we should kick this at `addMaterialValue`

        target.offset.copy(property.initialOffset);
        target.repeat.copy(property.initialScaling);

        target.needsUpdate = true;
      });
    });
  }
}
