import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMHumanoid } from './VRMHumanoid';
import type { VRMHumanBones } from './VRMHumanBones';
import { VRMRequiredHumanBoneName } from './VRMRequiredHumanBoneName';
import { GLTF as GLTFSchema } from '@gltf-transform/core';
import { VRMHumanoidHelper } from './helpers/VRMHumanoidHelper';
import { VRMHumanoidLoaderPluginOptions } from './VRMHumanoidLoaderPluginOptions';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

/**
 * A map from old thumb bone names to new thumb bone names
 */
const thumbBoneNameMap: { [key: string]: V1VRMSchema.HumanoidHumanBoneName | undefined } = {
  leftThumbProximal: 'leftThumbMetacarpal',
  leftThumbIntermediate: 'leftThumbProximal',
  rightThumbProximal: 'rightThumbMetacarpal',
  rightThumbIntermediate: 'rightThumbProximal',
};

/**
 * A plugin of GLTFLoader that imports a {@link VRMHumanoid} from a VRM extension of a GLTF.
 */
export class VRMHumanoidLoaderPlugin implements GLTFLoaderPlugin {
  /**
   * Specify an Object3D to add {@link VRMHumanoidHelper}.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, the helper will copy the same `renderOrder` .
   */
  public helperRoot?: THREE.Object3D;

  public autoUpdateHumanBones?: boolean;

  public readonly parser: GLTFParser;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMHumanoidLoaderPlugin';
  }

  public constructor(parser: GLTFParser, options?: VRMHumanoidLoaderPluginOptions) {
    this.parser = parser;

    this.helperRoot = options?.helperRoot;
    this.autoUpdateHumanBones = options?.autoUpdateHumanBones;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    gltf.userData.vrmHumanoid = await this._import(gltf);
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
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use vrm
    const isVRMUsed = json.extensionsUsed?.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension = json.extensions?.['VRMC_vrm'] as V1VRMSchema.VRMCVRM | undefined;
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
      console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
      return null;
    }

    const schemaHumanoid = extension.humanoid;
    if (!schemaHumanoid) {
      return null;
    }

    /**
     * compat: 1.0-beta thumb bone names
     *
     * `true` if `leftThumbIntermediate` or `rightThumbIntermediate` exists
     */
    const existsPreviousThumbName =
      (schemaHumanoid.humanBones as any).leftThumbIntermediate != null ||
      (schemaHumanoid.humanBones as any).rightThumbIntermediate != null;

    const humanBones: Partial<VRMHumanBones> = {};
    if (schemaHumanoid.humanBones != null) {
      await Promise.all(
        Object.entries(schemaHumanoid.humanBones).map(async ([boneNameString, schemaHumanBone]) => {
          let boneName = boneNameString as V1VRMSchema.HumanoidHumanBoneName;
          const index = schemaHumanBone.node;

          // compat: 1.0-beta previous thumb bone names
          if (existsPreviousThumbName) {
            const thumbBoneName = thumbBoneNameMap[boneName];
            if (thumbBoneName != null) {
              boneName = thumbBoneName;
            }
          }

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

    const humanoid = new VRMHumanoid(this._ensureRequiredBonesExist(humanBones), {
      autoUpdateHumanBones: this.autoUpdateHumanBones,
    });
    gltf.scene.add(humanoid.normalizedHumanBonesRoot);

    if (this.helperRoot) {
      const helper = new VRMHumanoidHelper(humanoid);
      this.helperRoot.add(helper);
      helper.renderOrder = this.helperRoot.renderOrder;
    }

    return humanoid;
  }

  private async _v0Import(gltf: GLTF): Promise<VRMHumanoid | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    const vrmExt = json.extensions?.VRM as V0VRM.VRM | undefined;
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

          // map to new bone name
          const thumbBoneName = thumbBoneNameMap[boneName];
          const newBoneName = (thumbBoneName ?? boneName) as V1VRMSchema.HumanoidHumanBoneName;

          // v0 VRMs might have a multiple nodes attached to a single bone...
          // so if there already is an entry in the `humanBones`, show a warning and ignore it
          if (humanBones[newBoneName] != null) {
            console.warn(
              `Multiple bone entries for ${newBoneName} detected (index = ${index}), ignoring duplicated entries.`,
            );
            return;
          }

          // set to the `humanBones`
          humanBones[newBoneName] = { node };
        }),
      );
    }

    const humanoid = new VRMHumanoid(this._ensureRequiredBonesExist(humanBones), {
      autoUpdateHumanBones: this.autoUpdateHumanBones,
    });
    gltf.scene.add(humanoid.normalizedHumanBonesRoot);

    if (this.helperRoot) {
      const helper = new VRMHumanoidHelper(humanoid);
      this.helperRoot.add(helper);
      helper.renderOrder = this.helperRoot.renderOrder;
    }

    return humanoid;
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
