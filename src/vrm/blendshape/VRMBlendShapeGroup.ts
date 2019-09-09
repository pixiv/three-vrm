import * as THREE from 'three';
import { GLTFPrimitive } from '../types';

export interface VRMBlendShapeBind {
  meshes: GLTFPrimitive[];
  morphTargetIndex: number;
  weight: number;
}

enum VRMBlendShapeMaterialValueType {
  NUMBER,
  VECTOR2,
  VECTOR3,
  VECTOR4,
  COLOR,
}

export interface VRMBlendShapeMaterialValue {
  material: THREE.Material;
  propertyName: string;
  defaultValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
  targetValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
  deltaValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color; // targetValue - defaultValue
  type: VRMBlendShapeMaterialValueType;
}

const _v2 = new THREE.Vector2();
const _v3 = new THREE.Vector3();
const _v4 = new THREE.Vector4();
const _color = new THREE.Color();

// animationMixer の監視対象は、Scene の中に入っている必要がある。
// そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
export class VRMBlendShapeGroup extends THREE.Object3D {
  public weight = 0.0;
  public isBinary = false;

  private _binds: VRMBlendShapeBind[] = [];
  private _materialValues: VRMBlendShapeMaterialValue[] = [];

  constructor(expressionName: string) {
    super();
    this.name = `BlendShapeController_${expressionName}`;

    // traverse 時の救済手段として Object3D ではないことを明示しておく
    this.type = 'BlendShapeController';
    // 表示目的のオブジェクトではないので、負荷軽減のために visible を false にしておく。
    // これにより、このインスタンスに対する毎フレームの matrix 自動計算を省略できる。
    this.visible = false;
  }

  public addBind(args: { meshes: GLTFPrimitive[]; morphTargetIndex: number; weight: number }): void {
    // original weight is 0-100 but we want to deal with this value within 0-1
    const weight = args.weight / 100;

    this._binds.push({
      meshes: args.meshes,
      morphTargetIndex: args.morphTargetIndex,
      weight,
    });
  }

  public addMaterialValue(args: {
    material: THREE.Material;
    propertyName: string;
    targetValue: number[];
    defaultValue?: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
  }): void {
    const material = args.material;
    const propertyName = args.propertyName;

    let value = (material as any)[propertyName];
    if (!value) {
      // property has not been found
      return;
    }
    value = args.defaultValue || value;

    let type: VRMBlendShapeMaterialValueType;
    let defaultValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
    let targetValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
    let deltaValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;

    if ((value as any).isVector2) {
      type = VRMBlendShapeMaterialValueType.VECTOR2;
      defaultValue = (value as THREE.Vector2).clone();
      targetValue = new THREE.Vector2().fromArray(args.targetValue);
      deltaValue = targetValue.clone().sub(defaultValue);
    } else if ((value as any).isVector3) {
      type = VRMBlendShapeMaterialValueType.VECTOR3;
      defaultValue = (value as THREE.Vector3).clone();
      targetValue = new THREE.Vector3().fromArray(args.targetValue);
      deltaValue = targetValue.clone().sub(defaultValue);
    } else if ((value as any).isVector4) {
      type = VRMBlendShapeMaterialValueType.VECTOR4;
      defaultValue = (value as THREE.Vector4).clone();

      // vectorProperty and targetValue index is different from each other
      // exported vrm by UniVRM file is
      //
      // vectorProperty
      // offset = targetValue[0], targetValue[1]
      // tiling = targetValue[2], targetValue[3]
      //
      // targetValue
      // offset = targetValue[2], targetValue[3]
      // tiling = targetValue[0], targetValue[1]
      targetValue = new THREE.Vector4().fromArray([
        args.targetValue[2],
        args.targetValue[3],
        args.targetValue[0],
        args.targetValue[1],
      ]);
      deltaValue = targetValue.clone().sub(defaultValue);
    } else if ((value as any).isColor) {
      type = VRMBlendShapeMaterialValueType.COLOR;
      defaultValue = (value as THREE.Color).clone();
      targetValue = new THREE.Color().fromArray(args.targetValue);
      deltaValue = targetValue.clone().sub(defaultValue);
    } else {
      type = VRMBlendShapeMaterialValueType.NUMBER;
      defaultValue = value as number;
      targetValue = args.targetValue[0];
      deltaValue = targetValue - defaultValue;
    }

    this._materialValues.push({
      material,
      propertyName,
      defaultValue,
      targetValue,
      deltaValue,
      type,
    });
  }

  /**
   * Apply weight to every assigned blend shapes.
   * Should be called via {@link BlendShapeMaster#update}.
   */
  public applyWeight(): void {
    const w = this.isBinary ? (this.weight < 0.5 ? 0.0 : 1.0) : this.weight;

    this._binds.forEach((bind) => {
      bind.meshes.forEach((mesh) => {
        if (!mesh.morphTargetInfluences) {
          return;
        } // TODO: we should kick this at `addBind`
        mesh.morphTargetInfluences[bind.morphTargetIndex] += w * bind.weight;
      });
    });

    this._materialValues.forEach((materialValue) => {
      const prop = (materialValue.material as any)[materialValue.propertyName];
      if (prop === undefined) {
        return;
      } // TODO: we should kick this at `addMaterialValue`

      if (materialValue.type === VRMBlendShapeMaterialValueType.NUMBER) {
        const deltaValue = materialValue.deltaValue as number;
        (materialValue.material as any)[materialValue.propertyName] += deltaValue * w;
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR2) {
        const deltaValue = materialValue.deltaValue as THREE.Vector2;
        (materialValue.material as any)[materialValue.propertyName].add(_v2.copy(deltaValue).multiplyScalar(w));
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR3) {
        const deltaValue = materialValue.deltaValue as THREE.Vector3;
        (materialValue.material as any)[materialValue.propertyName].add(_v3.copy(deltaValue).multiplyScalar(w));
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR4) {
        const deltaValue = materialValue.deltaValue as THREE.Vector4;
        (materialValue.material as any)[materialValue.propertyName].add(_v4.copy(deltaValue).multiplyScalar(w));
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.COLOR) {
        const deltaValue = materialValue.deltaValue as THREE.Color;
        (materialValue.material as any)[materialValue.propertyName].add(_color.copy(deltaValue).multiplyScalar(w));
      }

      if (typeof (materialValue.material as any).shouldApplyUniforms === 'boolean') {
        (materialValue.material as any).shouldApplyUniforms = true;
      }
    });
  }

  /**
   * Clear previously assigned blend shapes.
   */
  public clearAppliedWeight(): void {
    this._binds.forEach((bind) => {
      bind.meshes.forEach((mesh) => {
        if (!mesh.morphTargetInfluences) {
          return;
        } // TODO: we should kick this at `addBind`
        mesh.morphTargetInfluences[bind.morphTargetIndex] = 0.0;
      });
    });

    this._materialValues.forEach((materialValue) => {
      const prop = (materialValue.material as any)[materialValue.propertyName];
      if (prop === undefined) {
        return;
      } // TODO: we should kick this at `addMaterialValue`

      if (materialValue.type === VRMBlendShapeMaterialValueType.NUMBER) {
        const defaultValue = materialValue.defaultValue as number;
        (materialValue.material as any)[materialValue.propertyName] = defaultValue;
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR2) {
        const defaultValue = materialValue.defaultValue as THREE.Vector2;
        (materialValue.material as any)[materialValue.propertyName].copy(defaultValue);
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR3) {
        const defaultValue = materialValue.defaultValue as THREE.Vector3;
        (materialValue.material as any)[materialValue.propertyName].copy(defaultValue);
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.VECTOR4) {
        const defaultValue = materialValue.defaultValue as THREE.Vector4;
        (materialValue.material as any)[materialValue.propertyName].copy(defaultValue);
      } else if (materialValue.type === VRMBlendShapeMaterialValueType.COLOR) {
        const defaultValue = materialValue.defaultValue as THREE.Color;
        (materialValue.material as any)[materialValue.propertyName].copy(defaultValue);
      }

      if (typeof (materialValue.material as any).shouldApplyUniforms === 'boolean') {
        (materialValue.material as any).shouldApplyUniforms = true;
      }
    });
  }
}
