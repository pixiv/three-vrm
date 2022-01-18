import * as THREE from 'three';
import { GLTFNode, GLTFPrimitive } from '../types';
declare enum FirstPersonFlag {
    Auto = 0,
    Both = 1,
    ThirdPersonOnly = 2,
    FirstPersonOnly = 3
}
/**
 * This class represents a single [`meshAnnotation`](https://github.com/vrm-c/UniVRM/blob/master/specification/0.0/schema/vrm.firstperson.meshannotation.schema.json) entry.
 * Each mesh will be assigned to specified layer when you call [[VRMFirstPerson.setup]].
 */
export declare class VRMRendererFirstPersonFlags {
    private static _parseFirstPersonFlag;
    /**
     * A [[FirstPersonFlag]] of the annotation entry.
     */
    firstPersonFlag: FirstPersonFlag;
    /**
     * A mesh primitives of the annotation entry.
     */
    primitives: GLTFPrimitive[];
    /**
     * Create a new mesh annotation.
     *
     * @param firstPersonFlag A [[FirstPersonFlag]] of the annotation entry
     * @param node A node of the annotation entry.
     */
    constructor(firstPersonFlag: string | undefined, primitives: GLTFPrimitive[]);
}
export declare class VRMFirstPerson {
    /**
     * A default camera layer for `FirstPersonOnly` layer.
     *
     * @see [[getFirstPersonOnlyLayer]]
     */
    private static readonly _DEFAULT_FIRSTPERSON_ONLY_LAYER;
    /**
     * A default camera layer for `ThirdPersonOnly` layer.
     *
     * @see [[getThirdPersonOnlyLayer]]
     */
    private static readonly _DEFAULT_THIRDPERSON_ONLY_LAYER;
    private readonly _firstPersonBone;
    private readonly _meshAnnotations;
    private readonly _firstPersonBoneOffset;
    private _firstPersonOnlyLayer;
    private _thirdPersonOnlyLayer;
    private _initialized;
    /**
     * Create a new VRMFirstPerson object.
     *
     * @param firstPersonBone A first person bone
     * @param firstPersonBoneOffset An offset from the specified first person bone
     * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
     */
    constructor(firstPersonBone: GLTFNode, firstPersonBoneOffset: THREE.Vector3, meshAnnotations: VRMRendererFirstPersonFlags[]);
    readonly firstPersonBone: GLTFNode;
    readonly meshAnnotations: VRMRendererFirstPersonFlags[];
    getFirstPersonWorldDirection(target: THREE.Vector3): THREE.Vector3;
    /*
    * A camera layer represents `FirstPersonOnly` layer.
    * Note that **you must call [[setup]] first before you use the layer feature** or it does not work properly.
    *
    * The value is [[DEFAULT_FIRSTPERSON_ONLY_LAYER]] by default but you can change the layer by specifying via [[setup]] if you prefer.
    *
    * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
    * @see https://threejs.org/docs/#api/en/core/Layers
    */
    readonly firstPersonOnlyLayer: number;
    /*
    * A camera layer represents `ThirdPersonOnly` layer.
    * Note that **you must call [[setup]] first before you use the layer feature** or it does not work properly.
    *
    * The value is [[DEFAULT_THIRDPERSON_ONLY_LAYER]] by default but you can change the layer by specifying via [[setup]] if you prefer.
    *
    * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
    * @see https://threejs.org/docs/#api/en/core/Layers
    */
    readonly thirdPersonOnlyLayer: number;
    getFirstPersonBoneOffset(target: THREE.Vector3): THREE.Vector3;
    /**
     * Get current world position of the first person.
     * The position takes [[FirstPersonBone]] and [[FirstPersonOffset]] into account.
     *
     * @param v3 target
     * @returns Current world position of the first person
     */
    getFirstPersonWorldPosition(v3: THREE.Vector3): THREE.Vector3;
    /**
     * In this method, it assigns layers for every meshes based on mesh annotations.
     * You must call this method first before you use the layer feature.
     *
     * This is an equivalent of [VRMFirstPerson.Setup](https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/FirstPerson/VRMFirstPerson.cs) of the UniVRM.
     *
     * The `cameraLayer` parameter specifies which layer will be assigned for `FirstPersonOnly` / `ThirdPersonOnly`.
     * In UniVRM, we specified those by naming each desired layer as `FIRSTPERSON_ONLY_LAYER` / `THIRDPERSON_ONLY_LAYER`
     * but we are going to specify these layers at here since we are unable to name layers in Three.js.
     *
     * @param cameraLayer Specify which layer will be for `FirstPersonOnly` / `ThirdPersonOnly`.
     */
    setup({ firstPersonOnlyLayer, thirdPersonOnlyLayer, }?: {
        firstPersonOnlyLayer?: number | undefined;
        thirdPersonOnlyLayer?: number | undefined;
    }): void;
    private _excludeTriangles;
    private _createErasedMesh;
    private _createHeadlessModelForSkinnedMesh;
    private _createHeadlessModel;
    /**
     * It just checks whether the node or its parent is the first person bone or not.
     * @param bone The target bone
     */
    private _isEraseTarget;
}
export {};
