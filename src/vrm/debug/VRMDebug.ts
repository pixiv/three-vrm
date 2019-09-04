import * as THREE from 'three';
import { VRM, VRMParameters } from '../VRM';
import { VRMImporterOptions } from '../VRMImporter';
import { DebugOption } from './DebugOption';
import { VRMImporterDebug } from './VRMImporterDebug';

export class VRMDebug extends VRM {
  public static async from(
    gltf: THREE.GLTF,
    options: VRMImporterOptions = {},
    debugOption: DebugOption = {},
  ): Promise<VRM> {
    const importer = new VRMImporterDebug(options);
    return await importer.import(gltf, debugOption);
  }

  constructor(params: VRMParameters, debugOption: DebugOption = {}) {
    super(params);

    // Gizmoを展開
    if (!debugOption.disableBoxHelper) {
      this.scene.add(new THREE.BoxHelper(this.scene));
    }

    if (!debugOption.disableSkeletonHelper) {
      this.scene.add(new THREE.SkeletonHelper(this.scene));
    }
  }

  public update(delta: number): void {
    super.update(delta);
  }
}
