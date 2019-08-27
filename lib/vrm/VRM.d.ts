import * as THREE from 'three';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { MaterialConverter } from './material';
import { VRMSpringBoneManager } from './springbone';
import { RawVrmMeta, VRMPose } from './types';
import { VRMPartsBuilder } from './VRMPartsBuilder';
export declare class VRMBuilder {
    protected _materialConverter: MaterialConverter;
    protected _partsBuilder: VRMPartsBuilder;
    materialConverter(materialConverter: MaterialConverter): VRMBuilder;
    partsBuilder(partsBuilder: VRMPartsBuilder): this;
    build(gltf: THREE.GLTF): Promise<VRM>;
}
export declare class VRM {
    static readonly Builder: VRMBuilder;
    static from(gltf: THREE.GLTF): Promise<VRM>;
    private _restPose?;
    readonly restPose: VRMPose | null | undefined;
    private _humanBones?;
    readonly humanBones: VRMHumanBones | null | undefined;
    private _blendShapeProxy?;
    readonly blendShapeProxy: VRMBlendShapeProxy | null | undefined;
    private _firstPerson?;
    readonly firstPerson: VRMFirstPerson | null | undefined;
    private _lookAt?;
    readonly lookAt: VRMLookAtHead | null | undefined;
    private _meta?;
    readonly meta: RawVrmMeta | undefined;
    private _animationMixer?;
    readonly animationMixer: THREE.AnimationMixer | undefined;
    private _springBoneManager?;
    readonly springBoneManager: VRMSpringBoneManager | undefined;
    private _gltf?;
    private readonly _partsBuilder;
    constructor(_builder?: VRMPartsBuilder);
    loadGLTF(gltf: THREE.GLTF): Promise<void>;
    setPose(poseObject: VRMPose): void;
    readonly scene: THREE.Scene | undefined;
    update(delta: number): void;
    dispose(): void;
}
