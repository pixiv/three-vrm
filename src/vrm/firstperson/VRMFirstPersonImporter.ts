import * as THREE from 'three';
import { VRMHumanBones } from '../humanoid';
import { GLTFMesh, GLTFNode, HumanBone, RawVrmFirstPerson } from '../types';
import { RendererFirstPersonFlags, VRMFirstPerson } from './VRMFirstPerson';

export class VRMFirstPersonImporter {
  public async import(
    gltf: THREE.GLTF,
    humanBones: VRMHumanBones,
    schemaFirstPerson: RawVrmFirstPerson,
  ): Promise<VRMFirstPerson | null> {
    const firstPersonBoneIndex = schemaFirstPerson.firstPersonBone;

    let firstPersonBone: GLTFNode;
    if (firstPersonBoneIndex === undefined || firstPersonBoneIndex === -1) {
      firstPersonBone = humanBones[HumanBone.Head];
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

    const meshAnnotations: RendererFirstPersonFlags[] = [];
    const meshes: GLTFMesh[] = await gltf.parser.getDependencies('mesh');
    meshes.forEach((mesh, meshIndex) => {
      const flag = schemaFirstPerson.meshAnnotations
        ? schemaFirstPerson.meshAnnotations.find((a) => a.mesh === meshIndex)
        : undefined;
      meshAnnotations.push(new RendererFirstPersonFlags(flag && flag.firstPersonFlag, mesh));
    });

    return new VRMFirstPerson(firstPersonBone, firstPersonBoneOffset, meshAnnotations);
  }
}
