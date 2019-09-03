import * as THREE from 'three';
import { RawVrmHumanoid } from '../types';
import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneArray } from './VRMHumanBoneArray';
import { VRMHumanDescription } from './VRMHumanDescription';
import { VRMHumanoid } from './VRMHumanoid';

export class VRMHumanoidImporter {
  /**
   * Import a [[VRMHumanoid]] from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param schemaHumanoid A raw `humanoid` field taken from VRM extension of the GLTF
   */
  public async import(gltf: THREE.GLTF, schemaHumanoid: RawVrmHumanoid): Promise<VRMHumanoid | null> {
    const humanBoneArray: VRMHumanBoneArray = [];
    if (schemaHumanoid.humanBones) {
      await Promise.all(
        schemaHumanoid.humanBones.map(async (bone) => {
          if (!bone.bone || !bone.node) {
            return;
          }

          const node = await gltf.parser.getDependency('node', bone.node);
          humanBoneArray.push({
            name: bone.bone,
            bone: new VRMHumanBone(node, {
              axisLength: bone.axisLength,
              center: bone.center && new THREE.Vector3(bone.center.x, bone.center.y, bone.center.z),
              max: bone.max && new THREE.Vector3(bone.max.x, bone.max.y, bone.max.z),
              min: bone.min && new THREE.Vector3(bone.min.x, bone.min.y, bone.min.z),
              useDefaultValues: bone.useDefaultValues,
            }),
          });
        }),
      );
    }

    const humanDescription: VRMHumanDescription = {
      armStretch: schemaHumanoid.armStretch,
      legStretch: schemaHumanoid.legStretch,
      upperArmTwist: schemaHumanoid.upperArmTwist,
      lowerArmTwist: schemaHumanoid.lowerArmTwist,
      upperLegTwist: schemaHumanoid.upperLegTwist,
      lowerLegTwist: schemaHumanoid.lowerLegTwist,
      feetSpacing: schemaHumanoid.feetSpacing,
      hasTranslationDoF: schemaHumanoid.hasTranslationDoF,
    };

    return new VRMHumanoid(humanBoneArray, humanDescription);
  }
}
