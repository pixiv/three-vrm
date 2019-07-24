import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanBones } from '../humanoid';
import { VRMLookAtHead } from '../lookat';
import { VRMSpringBoneManager } from '../springbone';
import { GLTF } from '../types';
import * as Raw from '../types/VRM';
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

  public async loadHumanoid(gltf: GLTF): Promise<VRMHumanBones | null> {
    return await this.target.loadHumanoid(gltf);
  }

  public async loadFirstPerson(
    firstPerson: Raw.RawVrmFirstPerson,
    humanBones: VRMHumanBones,
    gltf: GLTF,
  ): Promise<VRMFirstPerson | null> {
    return await this.target.loadFirstPerson(firstPerson, humanBones, gltf);
  }

  public loadLookAt(
    firstPerson: Raw.RawVrmFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    return this.target.loadLookAt(firstPerson, blendShapeProxy, humanBodyBones);
  }

  public async loadBlendShapeMaster(
    animationMixer: THREE.AnimationMixer,
    gltf: GLTF,
  ): Promise<VRMBlendShapeProxy | null> {
    return await this.target.loadBlendShapeMaster(animationMixer, gltf);
  }

  public async loadSecondary(gltf: GLTF): Promise<VRMSpringBoneManager> {
    if (this.debugOption && this.debugOption.disableSpringBoneHelper) {
      return await this.target.loadSecondary(gltf);
    }

    const manager = new VRMSpringBoneManagerDebug();
    await manager.loadGLTF(gltf);
    return manager;
  }
}
