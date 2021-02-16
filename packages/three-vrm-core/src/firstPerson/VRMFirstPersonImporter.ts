import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { gltfExtractPrimitivesFromNodes } from '../utils/gltfExtractPrimitivesFromNode';
import { VRMFirstPerson } from './VRMFirstPerson';
import type { VRMFirstPersonMeshAnnotation } from './VRMFirstPersonMeshAnnotation';
import type { VRMFirstPersonMeshAnnotationType } from './VRMFirstPersonMeshAnnotationType';

/**
 * An importer that imports a {@link VRMFirstPerson} from a VRM extension of a GLTF.
 */
export class VRMFirstPersonImporter {
  /**
   * Import a {@link VRMFirstPerson} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   */
  public async import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
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
    // early abort if it doesn't use vrm
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_vrm-1.0_draft') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRM | undefined = gltf.parser.json.extensions?.['VRMC_vrm-1.0_draft'];
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
        firstPersonType: annotation?.firstPersonType ?? 'both',
      });
    });

    return new VRMFirstPerson(humanoid, meshAnnotations);
  }

  private async _v0Import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
    const vrmExt: V0VRM.VRM | undefined = gltf.parser.json.extensions?.VRM;
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
      const schemaNode = gltf.parser.json.nodes[nodeIndex];

      const flag = schemaFirstPerson.meshAnnotations
        ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === schemaNode.mesh)
        : undefined;

      meshAnnotations.push({
        meshes: primitives,
        firstPersonType: this._convertV0FlagToV1Type(flag?.firstPersonFlag),
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
