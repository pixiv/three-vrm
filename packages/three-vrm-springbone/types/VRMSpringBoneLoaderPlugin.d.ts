import * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { VRMSpringBoneLoaderPluginOptions } from './VRMSpringBoneLoaderPluginOptions';
export declare class VRMSpringBoneLoaderPlugin implements GLTFLoaderPlugin {
    static readonly EXTENSION_NAME = "VRMC_springBone";
    /**
     * Specify an Object3D to add {@link VRMSpringBoneJointHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    jointHelperRoot?: THREE.Object3D;
    /**
     * Specify an Object3D to add {@link VRMSpringBoneColliderHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    colliderHelperRoot?: THREE.Object3D;
    /**
     * Specify an Object3D to add {@link VRMSpringBoneLimitHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    limitHelperRoot?: THREE.Object3D;
    /**
     * If true, load colliders defined in `VRMC_springBone_extended_collider`.
     * Set to `false` to disable loading extended colliders and use the fallback behavior.
     * `true` by default.
     */
    useExtendedColliders: boolean;
    /**
     * If true, load limits defined in `VRMC_springBone_limit`.
     * Set to `false` to disable loading limits and use the fallback behavior.
     * `true` by default.
     */
    useLimits: boolean;
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser, options?: VRMSpringBoneLoaderPluginOptions);
    afterRoot(gltf: GLTF): Promise<void>;
    /**
     * Import spring bones from a GLTF and return a {@link VRMSpringBoneManager}.
     * It might return `null` instead when it does not need to be created or something go wrong.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    private _import;
    private _v1Import;
    private _v0Import;
    private _importJoint;
    private _importSphereCollider;
    private _importCapsuleCollider;
    private _importPlaneCollider;
    private _importLimitCone;
    private _importLimitHinge;
    private _importLimitSpherical;
    private _tryImportLimitFromSchema;
}
