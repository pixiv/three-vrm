import type * as ConstraintSchema from '@pixiv/types-vrmc-node-constraint-1.0';
import type * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { VRMNodeConstraintLoaderPluginOptions } from './VRMNodeConstraintLoaderPluginOptions';
import { VRMNodeConstraintManager } from './VRMNodeConstraintManager';
import { VRMRotationConstraint } from './VRMRotationConstraint';
import { VRMAimConstraint } from './VRMAimConstraint';
import { VRMRollConstraint } from './VRMRollConstraint';
export declare class VRMNodeConstraintLoaderPlugin implements GLTFLoaderPlugin {
    static readonly EXTENSION_NAME = "VRMC_node_constraint";
    /**
     * Specify an Object3D to add {@link VRMNodeConstraintHelper} s.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    helperRoot?: THREE.Object3D;
    readonly parser: GLTFParser;
    get name(): string;
    constructor(parser: GLTFParser, options?: VRMNodeConstraintLoaderPluginOptions);
    afterRoot(gltf: GLTF): Promise<void>;
    /**
     * Import constraints from a GLTF and returns a {@link VRMNodeConstraintManager}.
     * It might return `null` instead when it does not need to be created or something go wrong.
     *
     * @param gltf A parsed result of GLTF taken from GLTFLoader
     */
    protected _import(gltf: GLTF): Promise<VRMNodeConstraintManager | null>;
    protected _importRollConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], rollConstraintDef: ConstraintSchema.RollConstraint): VRMRollConstraint;
    protected _importAimConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], aimConstraintDef: ConstraintSchema.AimConstraint): VRMAimConstraint;
    protected _importRotationConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], rotationConstraintDef: ConstraintSchema.RotationConstraint): VRMRotationConstraint;
}
