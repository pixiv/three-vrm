import * as THREE from 'three';
import { VRM, VRMBuilder } from '../VRM';
import { VRMPartsBuilder } from '../VRMPartsBuilder';
import { DebugOption } from './DebugOption';
export declare class VRMBuilderDebug extends VRMBuilder {
    private _option?;
    option(option: DebugOption): VRMBuilderDebug;
    build(gltf: THREE.GLTF): Promise<VRM>;
}
export declare class VRMDebug extends VRM {
    static readonly Builder: VRMBuilderDebug;
    static from(gltf: THREE.GLTF): Promise<VRM>;
    private readonly _debugOption;
    private _faceDirectionHelper?;
    private _leftEyeDirectionHelper?;
    private _rightEyeDirectionHelper?;
    constructor(partsBuilder?: VRMPartsBuilder, debugOption?: DebugOption);
    loadGLTF(gltf: THREE.GLTF): Promise<void>;
    update(delta: number): void;
    private updateGizmos;
}
