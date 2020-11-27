import * as THREE from 'three';
import * as VRMSchema from '@pixiv/types-vrm-0.0';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMHumanBone } from './VRMHumanBone';
import { VRMHumanBoneArray } from './VRMHumanBoneArray';
import { VRMHumanDescription } from './VRMHumanDescription';
import { VRMHumanoid } from './VRMHumanoid';
import { VRMHumanoidBoneName } from './VRMHumanoidBoneName';

/**
 * An importer that imports a [[VRMHumanoid]] from a VRM extension of a GLTF.
 */
export class VRMHumanoidImporter {
  /**
   * Import a [[VRMHumanoid]] from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<VRMHumanoid | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaHumanoid: VRMSchema.Humanoid | undefined = vrmExt.humanoid;
    if (!schemaHumanoid) {
      return null;
    }

    const humanBoneArray: VRMHumanBoneArray = [];
    if (schemaHumanoid.humanBones) {
      await Promise.all(
        schemaHumanoid.humanBones.map(async (bone) => {
          if (!bone.bone || !bone.node) {
            return;
          }

          const node = await gltf.parser.getDependency('node', bone.node);
          humanBoneArray.push({
            name: bone.bone as VRMHumanoidBoneName,
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
