import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { gltfExtractPrimitivesFromNodes } from '../utils/gltfExtractPrimitivesFromNode';
import { VRMFirstPerson } from './VRMFirstPerson';
import type { VRMFirstPersonMeshAnnotation } from './VRMFirstPersonMeshAnnotation';
import type { VRMFirstPersonMeshAnnotationType } from './VRMFirstPersonMeshAnnotationType';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

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
    const vrmHumanoid = gltf.userData.vrmHumanoid as VRMHumanoid | undefined;

    // explicitly distinguish null and undefined
    // since vrmHumanoid might be null as a result
    if (vrmHumanoid === null) {
      return;
    } else if (vrmHumanoid === undefined) {
      throw new Error(
        'VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first',
      );
    }

    gltf.userData.vrmFirstPerson = await this._import(gltf, vrmHumanoid);
  }

  /**
   * Import a {@link VRMFirstPerson} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   */

  private async _import(gltf: GLTF, humanoid: VRMHumanoid | null): Promise<VRMFirstPerson | null> {
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

  private async _v1Import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
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
      console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
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

  private async _v0Import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    const vrmExt = json.extensions?.VRM as V0VRM.VRM | undefined;
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
      const schemaNode = json.nodes![nodeIndex];

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

  private _convertV0FlagToV1Type(flag: string | undefined): VRMFirstPersonMeshAnnotationType {
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
