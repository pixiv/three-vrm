import * as THREE from 'three';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanoid } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { VRMSpringBoneManager } from './springbone';
import { RawVrmMeta } from './types';
import { deepDispose } from './utils/disposer';
import { VRMImporter, VRMImporterOptions } from './VRMImporter';

export interface VRMParameters {
  scene: THREE.Scene;
  humanoid?: VRMHumanoid;
  animationMixer?: THREE.AnimationMixer;
  blendShapeProxy?: VRMBlendShapeProxy;
  firstPerson?: VRMFirstPerson;
  lookAt?: VRMLookAtHead;
  materials?: THREE.Material[];
  springBoneManager?: VRMSpringBoneManager;
  meta?: RawVrmMeta;
}

/**
 * Represents a VRM model.
 * It has so many feature to deal with your VRM models!
 *
 * @example Most basic use of VRM
 * ```
 * const scene = new THREE.Scene();
 *
 * new THREE.GLTFLoader().load( 'models/shino.vrm', ( gltf ) => {
 *
 *   THREE.VRM.from( gltf ).then( ( vrm ) => {
 *
 *     scene.add( vrm.scene );
 *
 *   } );
 *
 * } );
 * ```
 */
export class VRM {
  /**
   * Create a [[VRM]] from a parsed result of GLTF taken from GLTFLoader.
   * It's probably a thing what you want to get started with VRMs.
   *
   * @example Most basic use of VRM
   * ```
   * const scene = new THREE.Scene();
   *
   * new THREE.GLTFLoader().load( 'models/shino.vrm', ( gltf ) => {
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
  public static async from(gltf: THREE.GLTF, options: VRMImporterOptions = {}): Promise<VRM> {
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
   * You might want to use [[VRMLookAtHead.setTarget]] to control the eye direction of your VRMs.
   */
  public readonly lookAt?: VRMLookAtHead;
  public readonly materials?: THREE.Material[];

  /**
   * Contains meta fields of the VRM.
   * You might want to refer these license fields before use your VRMs.
   */
  public readonly meta?: RawVrmMeta;

  /**
   * Contains AnimationMixer associated with the [[VRM.blendShapeProxy]].
   */
  public readonly animationMixer?: THREE.AnimationMixer;

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
    this.animationMixer = params.animationMixer;
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
      this.lookAt.update();
    }

    if (this.animationMixer) {
      this.animationMixer.update(delta);
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
   * Dispose the VRM.
   * You might want to call this when you want to unload the VRM model.
   */
  public dispose(): void {
    const scene = this.scene;
    if (scene) {
      while (scene.children.length > 0) {
        const object = scene.children[scene.children.length - 1];
        deepDispose(object);
        scene.remove(object);
      }
    }
  }
}
