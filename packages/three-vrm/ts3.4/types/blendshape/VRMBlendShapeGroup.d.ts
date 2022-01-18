import * as THREE from 'three';
import { GLTFPrimitive } from '../types';
export interface VRMBlendShapeBind {
    meshes: GLTFPrimitive[];
    morphTargetIndex: number;
    weight: number;
}
declare enum VRMBlendShapeMaterialValueType {
    NUMBER = 0,
    VECTOR2 = 1,
    VECTOR3 = 2,
    VECTOR4 = 3,
    COLOR = 4
}
export interface VRMBlendShapeMaterialValue {
    material: THREE.Material;
    propertyName: string;
    defaultValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
    targetValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
    deltaValue: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
    type: VRMBlendShapeMaterialValueType;
}
export declare class VRMBlendShapeGroup extends THREE.Object3D {
    weight: number;
    isBinary: boolean;
    private _binds;
    private _materialValues;
    constructor(expressionName: string);
    addBind(args: {
        meshes: GLTFPrimitive[];
        morphTargetIndex: number;
        weight: number;
    }): void;
    addMaterialValue(args: {
        material: THREE.Material;
        propertyName: string;
        targetValue: number[];
        defaultValue?: number | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color;
    }): void;
    /**
     * Apply weight to every assigned blend shapes.
     * Should be called via {@link BlendShapeMaster#update}.
     */
    applyWeight(): void;
    /**
     * Clear previously assigned blend shapes.
     */
    clearAppliedWeight(): void;
}
export {};
