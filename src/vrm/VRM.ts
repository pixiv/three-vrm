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

export class VRM {
  public static async from(gltf: THREE.GLTF, options: VRMImporterOptions = {}): Promise<VRM> {
    const importer = new VRMImporter(options);
    return await importer.import(gltf);
  }

  public readonly scene: THREE.Scene;
  public readonly humanoid?: VRMHumanoid;
  public readonly blendShapeProxy?: VRMBlendShapeProxy;
  public readonly firstPerson?: VRMFirstPerson;
  public readonly lookAt?: VRMLookAtHead;
  public readonly materials?: THREE.Material[];
  public readonly meta?: RawVrmMeta;
  public readonly animationMixer?: THREE.AnimationMixer;
  public readonly springBoneManager?: VRMSpringBoneManager;

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
