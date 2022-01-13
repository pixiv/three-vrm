import { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { MToonMaterialParameters } from './MToonMaterialParameters';
/**
 * MaterialParameters hates `undefined`. This helper automatically rejects assign of these `undefined`.
 * It also handles asynchronous process of textures.
 * Make sure await for {@link GLTFMToonMaterialParamsAssignHelper.pending}.
 */
export declare class GLTFMToonMaterialParamsAssignHelper {
    private readonly _parser;
    private _materialParams;
    private _pendings;
    get pending(): Promise<unknown>;
    constructor(parser: GLTFParser, materialParams: MToonMaterialParameters);
    assignPrimitive<T extends keyof MToonMaterialParameters>(key: T, value: MToonMaterialParameters[T]): void;
    assignColor<T extends keyof MToonMaterialParameters>(key: T, value: number[] | undefined, convertSRGBToLinear?: boolean): void;
    assignTexture<T extends keyof MToonMaterialParameters>(key: T, texture: {
        index: number;
    } | undefined, isColorTexture: boolean): Promise<void>;
    assignTextureByIndex<T extends keyof MToonMaterialParameters>(key: T, textureIndex: number | undefined, isColorTexture: boolean): Promise<void>;
}
