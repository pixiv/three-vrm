import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMHumanoid } from '../humanoid';
import { GLTFMesh, GLTFNode, VRMSchema } from '../types';
import { VRMFirstPerson, VRMRendererFirstPersonFlags } from './VRMFirstPerson';

/**
 * An importer that imports a [[VRMFirstPerson]] from a VRM extension of a GLTF.
 */
export class VRMFirstPersonImporter {
  /**
   * Import a [[VRMFirstPerson]] from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A [[VRMHumanoid]] instance that represents the VRM
   */
  public async import(gltf: GLTF, humanoid: VRMHumanoid): Promise<VRMFirstPerson | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaFirstPerson: VRMSchema.FirstPerson | undefined = vrmExt.firstPerson;
    if (!schemaFirstPerson) {
      return null;
    }

    const firstPersonBoneIndex = schemaFirstPerson.firstPersonBone;

    let firstPersonBone: GLTFNode | null;
    if (firstPersonBoneIndex === undefined || firstPersonBoneIndex === -1) {
      firstPersonBone = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Head);
    } else {
      firstPersonBone = await gltf.parser.getDependency('node', firstPersonBoneIndex);
    }

    if (!firstPersonBone) {
      console.warn('VRMFirstPersonImporter: Could not find firstPersonBone of the VRM');
      return null;
    }

    const firstPersonBoneOffset = schemaFirstPerson.firstPersonBoneOffset
      ? new THREE.Vector3(
          schemaFirstPerson.firstPersonBoneOffset.x,
          schemaFirstPerson.firstPersonBoneOffset.y,
          schemaFirstPerson.firstPersonBoneOffset.z,
        )
      : new THREE.Vector3(0.0, 0.06, 0.0); // fallback, taken from UniVRM implementation

    const meshAnnotations: VRMRendererFirstPersonFlags[] = [];
    const meshes: GLTFMesh[] = await gltf.parser.getDependencies('mesh');
    meshes.forEach((mesh, meshIndex) => {
      const flag = schemaFirstPerson.meshAnnotations
        ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === meshIndex)
        : undefined;
      meshAnnotations.push(new VRMRendererFirstPersonFlags(flag && flag.firstPersonFlag, mesh));
    });

    return new VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations);
  }
}
