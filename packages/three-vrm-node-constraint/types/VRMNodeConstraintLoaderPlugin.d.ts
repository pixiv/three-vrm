import type * as ConstraintSchema from '@pixiv/types-vrmc-node-constraint-1.0';
import type * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMAimConstraint } from './VRMAimConstraint';
import type { VRMNodeConstraintLoaderPluginOptions } from './VRMNodeConstraintLoaderPluginOptions';
import { VRMNodeConstraintManager } from './VRMNodeConstraintManager';
import { VRMPositionConstraint } from './VRMPositionConstraint';
import { VRMRotationConstraint } from './VRMRotationConstraint';
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
    protected _importPositionConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], modelRoot: THREE.Object3D, position: ConstraintSchema.PositionConstraint): VRMPositionConstraint;
    protected _importRotationConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], modelRoot: THREE.Object3D, rotation: ConstraintSchema.RotationConstraint): VRMRotationConstraint;
    protected _importAimConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], modelRoot: THREE.Object3D, aim: ConstraintSchema.AimConstraint): VRMAimConstraint;
}
