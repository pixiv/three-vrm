import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { gltfExtractPrimitivesFromNodes } from '../utils/gltfExtractPrimitivesFromNode';
import { VRMFirstPerson } from './VRMFirstPerson';
import type { VRMFirstPersonMeshAnnotation } from './VRMFirstPersonMeshAnnotation';
import type { VRMFirstPersonMeshAnnotationType } from './VRMFirstPersonMeshAnnotationType';

/**
 * A plugin of GLTFLoader that imports a {@link VRMFirstPerson} from a VRM extension of a GLTF.
 */
export class VRMFirstPersonLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMFirstPersonLoaderPlugin';
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    // this might be called twice or more by its dependants!

    if (gltf.userData.promiseVrmFirstPerson == null) {
      gltf.userData.promiseVrmFirstPerson = (async () => {
        // it depends on humanoid, load humanoid first
        const promiseHumanoid = this._dependOnHumanoid(gltf);

        // load the firstPerson
        return await this._import(gltf, await promiseHumanoid);
      })();

      gltf.userData.vrmFirstPerson = await gltf.userData.promiseVrmFirstPerson;
    }

    await gltf.userData.promiseVrmFirstPerson;
  }

  /**
   * Since FirstPerson depends on Humanoid, Humanoid must be loaded first.
   * Sadly, there is no system that do dependency resolution on GLTFLoader Plugin system.
   * This will execute the `afterRoot` of {@link VRMHumanoidLoaderPlugin} instead
   * while making sure the `afterRoot` will be called only once by making `gltf.userData.promiseVrmHumanoid` as a cache.
   * This function also returns the `gltf.userData.promiseVrmHumanoid`.
   * @param gltf The input GLTF
   */
  private async _dependOnHumanoid(gltf: GLTF): Promise<VRMHumanoid | null> {
    if (gltf.userData.promiseVrmHumanoid == null) {
      const humanoidPlugin = (this.parser as any).plugins['VRMHumanoidLoaderPlugin']; // TODO: remove any
      if (!humanoidPlugin) {
        throw new Error('VRMFirstPersonLoaderPlugin: It must be used along with VRMHumanoidLoaderPlugin');
      }

      humanoidPlugin.afterRoot(gltf); // this will make sure `gltf.userData.promiseVrmHumanoid` exists
    }

    return await gltf.userData.promiseVrmHumanoid;
  }

  /**
   * Import a {@link VRMFirstPerson} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   */

  protected async _import(gltf: GLTF, humanoid: VRMHumanoid | null): Promise<VRMFirstPerson | null> {
    if (humanoid == null) {
      return null;
    }

    const v1Result = await this._v1Import(gltf, humanoid);
    if (v1Result) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf, humanoid);
    if (v0Result) {
      return v0Result;
    }

    return null;
  }

  protected async _v1Import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = this.parser.json.extensionsUsed.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRM | undefined = this.parser.json.extensions?.['VRMC_vrm'];
    if (!extension) {
      return null;
    }

    const schemaFirstPerson = extension.firstPerson;
    if (!schemaFirstPerson) {
      return null;
    }

    const meshAnnotations: VRMFirstPersonMeshAnnotation[] = [];
    const nodePrimitivesMap = await gltfExtractPrimitivesFromNodes(gltf);
    Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
      const annotation = schemaFirstPerson.meshAnnotations
        ? schemaFirstPerson.meshAnnotations.find((a) => a.node === nodeIndex)
        : undefined;

      meshAnnotations.push({
        meshes: primitives,
        type: annotation?.type ?? 'both',
      });
    });

    return new VRMFirstPerson(humanoid, meshAnnotations);
  }

  protected async _v0Import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
    const vrmExt: V0VRM.VRM | undefined = this.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaFirstPerson: V0VRM.FirstPerson | undefined = vrmExt.firstPerson;
    if (!schemaFirstPerson) {
      return null;
    }

    const meshAnnotations: VRMFirstPersonMeshAnnotation[] = [];
    const nodePrimitivesMap = await gltfExtractPrimitivesFromNodes(gltf);

    Array.from(nodePrimitivesMap.entries()).forEach(([nodeIndex, primitives]) => {
      const schemaNode = this.parser.json.nodes[nodeIndex];

      const flag = schemaFirstPerson.meshAnnotations
        ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === schemaNode.mesh)
        : undefined;

      meshAnnotations.push({
        meshes: primitives,
        type: this._convertV0FlagToV1Type(flag?.firstPersonFlag),
      });
    });

    return new VRMFirstPerson(humanoid, meshAnnotations);
  }

  protected _convertV0FlagToV1Type(flag: string | undefined): VRMFirstPersonMeshAnnotationType {
    if (flag === 'FirstPersonOnly') {
      return 'firstPersonOnly';
    } else if (flag === 'ThirdPersonOnly') {
      return 'thirdPersonOnly';
    } else if (flag === 'Auto') {
      return 'auto';
    } else {
      return 'both';
    }
  }
}
