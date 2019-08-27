import * as THREE from 'three';
import { BlendShapePresetName } from '../types';
import { BlendShapeController } from './BlendShapeController';
import { BlendShapeMaster } from './BlendShapeMaster';
export declare class VRMBlendShapeProxy {
    static create(animationMixer: THREE.AnimationMixer, blendShapeMaster: BlendShapeMaster, blendShapePresetMap: {
        [presetName in BlendShapePresetName]?: string;
    }): VRMBlendShapeProxy;
    private static clamp;
    readonly expressions: {
        [key: string]: THREE.AnimationAction | undefined;
    };
    private readonly _blendShapeMaster;
    private readonly _blendShapePresetMap;
    protected constructor(blendShapeMaster: BlendShapeMaster, blendShapePresetMap: {
        [presetName in BlendShapePresetName]?: string;
    }, expressions: {
        [key: string]: THREE.AnimationAction | undefined;
    });
    getExpression(name: string): THREE.AnimationAction | undefined;
    getValue(name: BlendShapePresetName | string): number | undefined;
    setValue(name: BlendShapePresetName | string, weight: number): void;
    update(): void;
    getController(name: BlendShapePresetName | string): BlendShapeController | undefined;
}
