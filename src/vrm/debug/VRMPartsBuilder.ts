import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanBones } from '../humanoid';
import { VRMLookAtHead } from '../lookat';
import { VRMSpringBoneManager } from '../springbone';
import { GLTF, GLTFNode } from '../types';
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

  public getNodesMap(gltf: GLTF): GLTFNode[] {
    return this.target.getNodesMap(gltf);
  }

  public loadHumanoid(gltf: GLTF, nodesMap: GLTFNode[]): VRMHumanBones | null {
    return this.target.loadHumanoid(gltf, nodesMap);
  }

  public loadFirstPerson(
    firstPerson: Raw.RawVrmFirstPerson | undefined,
    nodesMap: GLTFNode[],
    humanBones: VRMHumanBones,
    gltf: GLTF,
  ): VRMFirstPerson | null {
    return this.target.loadFirstPerson(firstPerson, nodesMap, humanBones, gltf);
  }

  public loadLookAt(
    firstPerson: Raw.RawVrmFirstPerson,
    blendShapeProxy: VRMBlendShapeProxy,
    humanBodyBones: VRMHumanBones,
  ): VRMLookAtHead {
    return this.target.loadLookAt(firstPerson, blendShapeProxy, humanBodyBones);
  }

  public loadBlendShapeMaster(animationMixer: THREE.AnimationMixer, gltf: GLTF): VRMBlendShapeProxy | null {
    return this.target.loadBlendShapeMaster(animationMixer, gltf);
  }

  public loadSecondary(gltf: GLTF, nodesMap: GLTFNode[]): VRMSpringBoneManager {
    if (this.debugOption && this.debugOption.disableSpringBoneHelper) {
      return this.target.loadSecondary(gltf, nodesMap);
    }
    return new VRMSpringBoneManagerDebug(gltf, nodesMap);
  }
}
