import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanoid } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMMeta } from './meta/VRMMeta';
import { VRMSpringBoneManager } from './springbone';
import { VRMImporterOptions } from './VRMImporter';
/**
 * Parameters for a [[VRM]] class.
 */
export interface VRMParameters {
    scene: THREE.Scene | THREE.Group;
    humanoid?: VRMHumanoid;
    blendShapeProxy?: VRMBlendShapeProxy;
    firstPerson?: VRMFirstPerson;
    lookAt?: VRMLookAtHead;
    materials?: THREE.Material[];
    springBoneManager?: VRMSpringBoneManager;
    meta?: VRMMeta;
}
/**
 * A class that represents a single VRM model.
 * See the documentation of [[VRM.from]] for the most basic use of VRM.
 */
export declare class VRM {
    /**
     * Create a new VRM from a parsed result of GLTF taken from GLTFLoader.
     * It's probably a thing what you want to get started with VRMs.
     *
     * @example Most basic use of VRM
     * ```
     * const scene = new THREE.Scene();
     *
     * new THREE.GLTFLoader().load( 'models/three-vrm-girl.vrm', ( gltf ) => {
     *
     *   THREE.VRM.from( gltf ).then( ( vrm ) => {
     *
     *     scene.add( vrm.scene );
     *
     *   } );
     *
     * } );
     * ```
     *
     * @param gltf A parsed GLTF object taken from GLTFLoader
     * @param options Options that will be used in importer
     */
    static from(gltf: GLTF, options?: VRMImporterOptions): Promise<VRM>;
    /**
     * `THREE.Scene` or `THREE.Group` (depends on your three.js revision) that contains the entire VRM.
     */
    readonly scene: THREE.Scene | THREE.Group;
    /**
     * Contains [[VRMHumanoid]] of the VRM.
     * You can control each bones using [[VRMHumanoid.getBoneNode]].
     *
     * @TODO Add a link to VRM spec
     */
    readonly humanoid?: VRMHumanoid;
    /**
     * Contains [[VRMBlendShapeProxy]] of the VRM.
     * You might want to control these facial expressions via [[VRMBlendShapeProxy.setValue]].
     */
    readonly blendShapeProxy?: VRMBlendShapeProxy;
    /**
     * Contains [[VRMFirstPerson]] of the VRM.
     * You can use various feature of the firstPerson field.
     */
    readonly firstPerson?: VRMFirstPerson;
    /**
     * Contains [[VRMLookAtHead]] of the VRM.
     * You might want to use [[VRMLookAtHead.target]] to control the eye direction of your VRMs.
     */
    readonly lookAt?: VRMLookAtHead;
    /**
     * Contains materials of the VRM.
     * `updateVRMMaterials` method of these materials will be called via its [[VRM.update]] method.
     */
    readonly materials?: THREE.Material[];
    /**
     * Contains meta fields of the VRM.
     * You might want to refer these license fields before use your VRMs.
     */
    readonly meta?: VRMMeta;
    /**
     * A [[VRMSpringBoneManager]] manipulates all spring bones attached on the VRM.
     * Usually you don't have to care about this property.
     */
    readonly springBoneManager?: VRMSpringBoneManager;
    /**
     * Create a new VRM instance.
     *
     * @param params [[VRMParameters]] that represents components of the VRM
     */
    constructor(params: VRMParameters);
    /**
     * **You need to call this on your update loop.**
     *
     * This function updates every VRM components.
     *
     * @param delta deltaTime
     */
    update(delta: number): void;
    /**
     * Dispose everything about the VRM instance.
     */
    dispose(): void;
}
