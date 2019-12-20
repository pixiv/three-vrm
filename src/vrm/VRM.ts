import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanoid } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMSpringBoneManager } from './springbone';
import { VRMSchema } from './types';
import { deepDispose } from './utils/disposer';
import { VRMImporter, VRMImporterOptions } from './VRMImporter';

/**
 * Parameters for a [[VRM]] class.
 */
export interface VRMParameters {
  scene: THREE.Scene;
  humanoid?: VRMHumanoid;
  blendShapeProxy?: VRMBlendShapeProxy;
  firstPerson?: VRMFirstPerson;
  lookAt?: VRMLookAtHead;
  materials?: THREE.Material[];
  springBoneManager?: VRMSpringBoneManager;
  meta?: VRMSchema.Meta;
}

/**
 * A class that represents a single VRM model.
 * See the documentation of [[VRM.from]] for the most basic use of VRM.
 */
export class VRM {
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
  public static async from(gltf: GLTF, options: VRMImporterOptions = {}): Promise<VRM> {
    const importer = new VRMImporter(options);
    return await importer.import(gltf);
  }
  /**
   * `THREE.Scene` that contains the entire VRM.
   */
  public readonly scene: THREE.Scene;

  /**
   * Contains [[VRMHumanoid]] of the VRM.
   * You can control each bones using [[VRMHumanoid.getBoneNode]].
   *
   * @TODO Add a link to VRM spec
   */
  public readonly humanoid?: VRMHumanoid;

  /**
   * Contains [[VRMBlendShapeProxy]] of the VRM.
   * You might want to control these facial expressions via [[VRMBlendShapeProxy.setValue]].
   */
  public readonly blendShapeProxy?: VRMBlendShapeProxy;

  /**
   * Contains [[VRMFirstPerson]] of the VRM.
   * You can use various feature of the firstPerson field.
   */
  public readonly firstPerson?: VRMFirstPerson;

  /**
   * Contains [[VRMLookAtHead]] of the VRM.
   * You might want to use [[VRMLookAtHead.target]] to control the eye direction of your VRMs.
   */
  public readonly lookAt?: VRMLookAtHead;

  /**
   * Contains materials of the VRM.
   * `updateVRMMaterials` method of these materials will be called via its [[VRM.update]] method.
   */
  public readonly materials?: THREE.Material[];

  /**
   * Contains meta fields of the VRM.
   * You might want to refer these license fields before use your VRMs.
   */
  public readonly meta?: VRMSchema.Meta;

  /**
   * A [[VRMSpringBoneManager]] manipulates all spring bones attached on the VRM.
   * Usually you don't have to care about this property.
   */
  public readonly springBoneManager?: VRMSpringBoneManager;

  /**
   * Create a new VRM instance.
   *
   * @param params [[VRMParameters]] that represents components of the VRM
   */
  public constructor(params: VRMParameters) {
    this.scene = params.scene;
    this.humanoid = params.humanoid;
    this.blendShapeProxy = params.blendShapeProxy;
    this.firstPerson = params.firstPerson;
    this.lookAt = params.lookAt;
    this.materials = params.materials;
    this.springBoneManager = params.springBoneManager;
    this.meta = params.meta;
  }

  /**
   * **You need to call this on your update loop.**
   *
   * This function updates every VRM components.
   *
   * @param delta deltaTime
   */
  public update(delta: number): void {
    if (this.lookAt) {
      this.lookAt.update(delta);
    }

    if (this.blendShapeProxy) {
      this.blendShapeProxy.update();
    }

    if (this.springBoneManager) {
      this.springBoneManager.lateUpdate(delta);
    }

    if (this.materials) {
      this.materials.forEach((material: any) => {
        if (material.updateVRMMaterials) {
          material.updateVRMMaterials(delta);
        }
      });
    }
  }

  /**
   * Dispose everything about the VRM instance.
   */
  public dispose(): void {
    const scene = this.scene;
    if (scene) {
      deepDispose(scene);
      scene.dispose();
    }
  }
}
