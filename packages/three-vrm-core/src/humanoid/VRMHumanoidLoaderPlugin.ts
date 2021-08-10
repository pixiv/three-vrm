import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMHumanoid } from './VRMHumanoid';
import type { VRMHumanBones } from './VRMHumanBones';
import { VRMRequiredHumanBoneName } from './VRMRequiredHumanBoneName';

/**
 * A plugin of GLTFLoader that imports a {@link VRMHumanoid} from a VRM extension of a GLTF.
 */
export class VRMHumanoidLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMHumanoidLoaderPlugin';
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    // this might be called twice or more by its dependants!

    if (gltf.userData.promiseVrmHumanoid == null) {
      gltf.userData.promiseVrmHumanoid = (async () => {
        return await this._import(gltf);
      })();

      gltf.userData.vrmHumanoid = await gltf.userData.promiseVrmHumanoid;
    }

    await gltf.userData.promiseVrmHumanoid;
  }

  /**
   * Import a {@link VRMHumanoid} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  private async _import(gltf: GLTF): Promise<VRMHumanoid | null> {
    const v1Result = await this._v1Import(gltf);
    if (v1Result) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf);
    if (v0Result) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(gltf: GLTF): Promise<VRMHumanoid | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = this.parser.json.extensionsUsed.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRMCVRM | undefined = this.parser.json.extensions?.['VRMC_vrm'];
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (specVersion !== '1.0-beta') {
      return null;
    }

    const schemaHumanoid = extension.humanoid;
    if (!schemaHumanoid) {
      return null;
    }

    const humanBones: Partial<VRMHumanBones> = {};
    if (schemaHumanoid.humanBones != null) {
      await Promise.all(
        Object.entries(schemaHumanoid.humanBones).map(async ([boneNameString, schemaHumanBone]) => {
          const boneName = boneNameString as V1VRMSchema.HumanoidHumanBoneName;
          const index = schemaHumanBone.node;

          const node = await this.parser.getDependency('node', index);

          // if the specified node does not exist, emit a warning
          if (node == null) {
            console.warn(`A glTF node bound to the humanoid bone ${boneName} (index = ${index}) does not exist`);
            return;
          }

          // set to the `humanBones`
          humanBones[boneName] = { node };
        }),
      );
    }

    return new VRMHumanoid(this._ensureRequiredBonesExist(humanBones));
  }

  private async _v0Import(gltf: GLTF): Promise<VRMHumanoid | null> {
    const vrmExt: V0VRM.VRM | undefined = this.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaHumanoid: V0VRM.Humanoid | undefined = vrmExt.humanoid;
    if (!schemaHumanoid) {
      return null;
    }

    const humanBones: Partial<VRMHumanBones> = {};
    if (schemaHumanoid.humanBones != null) {
      await Promise.all(
        schemaHumanoid.humanBones.map(async (bone) => {
          const boneName = bone.bone;
          const index = bone.node;

          if (boneName == null || index == null) {
            return;
          }

          const node = await this.parser.getDependency('node', index);

          // if the specified node does not exist, emit a warning
          if (node == null) {
            console.warn(`A glTF node bound to the humanoid bone ${boneName} (index = ${index}) does not exist`);
            return;
          }

          // v0 VRMs might have a multiple nodes attached to a single bone...
          // so if there already is an entry in the `humanBones`, show a warning and ignore it
          if (humanBones[boneName] != null) {
            console.warn(
              `Multiple bone entries for ${boneName} detected (index = ${index}), ignoring duplicated entries.`,
            );
            return;
          }

          // set to the `humanBones`
          humanBones[boneName] = { node };
        }),
      );
    }

    return new VRMHumanoid(this._ensureRequiredBonesExist(humanBones));
  }

  /**
   * Ensure required bones exist in given human bones.
   * @param humanBones Human bones
   * @returns Human bones, no longer partial!
   */
  private _ensureRequiredBonesExist(humanBones: Partial<VRMHumanBones>): VRMHumanBones {
    // ensure required bones exist
    const missingRequiredBones = Object.values(VRMRequiredHumanBoneName).filter(
      (requiredBoneName) => humanBones[requiredBoneName] == null,
    );

    // throw an error if there are missing bones
    if (missingRequiredBones.length > 0) {
      throw new Error(
        `VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${missingRequiredBones.join(', ')}`,
      );
    }

    return humanBones as VRMHumanBones;
  }
}
