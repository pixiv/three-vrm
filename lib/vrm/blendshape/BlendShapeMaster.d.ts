import { BlendShapeController } from './BlendShapeController';
export declare class BlendShapeMaster {
    private _blendShapeGroups;
    readonly blendShapeGroups: {
        [name: string]: BlendShapeController;
    };
    getBlendShapeGroup(name: string): BlendShapeController | undefined;
    registerBlendShapeGroup(name: string, controller: BlendShapeController): void;
    update(): void;
}
