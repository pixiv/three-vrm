import type { VRMFirstPersonMeshAnnotation } from './VRMFirstPersonMeshAnnotation';
import type { VRMHumanoid } from '../humanoid';
export declare class VRMFirstPerson {
    /**
     * A default camera layer for `FirstPersonOnly` layer.
     *
     * @see [[getFirstPersonOnlyLayer]]
     */
    static readonly DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
    /**
     * A default camera layer for `ThirdPersonOnly` layer.
     *
     * @see [[getThirdPersonOnlyLayer]]
     */
    static readonly DEFAULT_THIRDPERSON_ONLY_LAYER = 10;
    /**
     * Its associated {@link VRMHumanoid}.
     */
    readonly humanoid: VRMHumanoid;
    meshAnnotations: VRMFirstPersonMeshAnnotation[];
    private _firstPersonOnlyLayer;
    private _thirdPersonOnlyLayer;
    private _initializedLayers;
    /**
     * Create a new VRMFirstPerson object.
     *
     * @param humanoid A {@link VRMHumanoid}
     * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
     */
    constructor(humanoid: VRMHumanoid, meshAnnotations: VRMFirstPersonMeshAnnotation[]);
    /**
     * Copy the given {@link VRMFirstPerson} into this one.
     * {@link humanoid} must be same as the source one.
     * @param source The {@link VRMFirstPerson} you want to copy
     * @returns this
     */
    copy(source: VRMFirstPerson): this;
    /**
     * Returns a clone of this {@link VRMFirstPerson}.
     * @returns Copied {@link VRMFirstPerson}
     */
    clone(): VRMFirstPerson;
    /**
     * A camera layer represents `FirstPersonOnly` layer.
     * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
     *
     * The value is {@link DEFAULT_FIRSTPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
     *
     * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
     * @see https://threejs.org/docs/#api/en/core/Layers
     */
    get firstPersonOnlyLayer(): number;
    /**
     * A camera layer represents `ThirdPersonOnly` layer.
     * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
     *
     * The value is {@link DEFAULT_THIRDPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
     *
     * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
     * @see https://threejs.org/docs/#api/en/core/Layers
     */
    get thirdPersonOnlyLayer(): number;
    /**
     * In this method, it assigns layers for every meshes based on mesh annotations.
     * You must call this method first before you use the layer feature.
     *
     * This is an equivalent of [VRMFirstPerson.Setup](https://github.com/vrm-c/UniVRM/blob/73a5bd8fcddaa2a7a8735099a97e63c9db3e5ea0/Assets/VRM/Runtime/FirstPerson/VRMFirstPerson.cs#L295-L299) of the UniVRM.
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
    private _isEraseTarget;
}
