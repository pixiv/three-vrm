import * as THREE from 'three';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanBones } from '../humanoid';
import { VRMLookAtHead } from '../lookat';
import { VRMSpringBoneManager } from '../springbone';
import { VRMSchema } from '../types';
import { VRMPartsBuilder } from '../VRMPartsBuilder';
import { DebugOption } from './DebugOption';
import { VRMSpringBoneManagerDebug } from './VRMSpringBoneManager';

export class VRMPartsBuilderDebugProxy extends VRMPartsBuilder {
  private readonly target: VRMPartsBuilder;
  private readonly debugOption?: DebugOption;

  constructor(target: VRMPartsBuilder, debugOption?: DebugOption) {
    super();
    this.target = target;
    this.debugOption = debugOption;
  }

  public async loadHumanoid(gltf: THREE.GLTF): Promise<VRMHumanBones | null> {
    return await this.target.loadHumanoid(gltf);
  }

  public async loadFirstPerson(
    firstPerson: VRMSchema.FirstPerson,
    humanBones: VRMHumanBones,
    gltf: THREE.GLTF,
  ): Promise<VRMFirstPerson | null> {
    return await this.target.loadFirstPerson(firstPerson, humanBones, gltf);
  }

  public loadLookAt(
    firstPerson: VRMSchema.FirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    return this.target.loadLookAt(firstPerson, blendShapeProxy, humanBodyBones);
  }

  public async loadBlendShapeMaster(
    animationMixer: THREE.AnimationMixer,
    gltf: THREE.GLTF,
  ): Promise<VRMBlendShapeProxy | null> {
    return await this.target.loadBlendShapeMaster(animationMixer, gltf);
  }

  public async loadSecondary(gltf: THREE.GLTF): Promise<VRMSpringBoneManager> {
    if (this.debugOption && this.debugOption.disableSpringBoneHelper) {
      return await this.target.loadSecondary(gltf);
    }

    const manager = new VRMSpringBoneManagerDebug();
    await manager.loadGLTF(gltf);
    return manager;
  }
}
