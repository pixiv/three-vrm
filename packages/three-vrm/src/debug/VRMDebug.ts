import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMParameters } from '../VRM';
import { VRMImporterOptions } from '../VRMImporter';
import { VRMDebugOptions } from './VRMDebugOptions';
import { VRMImporterDebug } from './VRMImporterDebug';

export const VRM_GIZMO_RENDER_ORDER = 10000;

/**
 * [[VRM]] but it has some useful gizmos.
 */
export class VRMDebug extends VRM {
  /**
   * Create a new VRMDebug from a parsed result of GLTF taken from GLTFLoader.
   *
   * See [[VRM.from]] for a detailed example.
   *
   * @param gltf A parsed GLTF object taken from GLTFLoader
   * @param options Options that will be used in importer
   * @param debugOption Options for VRMDebug features
   */
  public static async from(
    gltf: GLTF,
    options: VRMImporterOptions = {},
    debugOption: VRMDebugOptions = {},
  ): Promise<VRM> {
    const importer = new VRMImporterDebug(options);
    return await importer.import(gltf, debugOption);
  }

  /**
   * Create a new VRMDebug instance.
   *
   * @param params [[VRMParameters]] that represents components of the VRM
   * @param debugOption Options for VRMDebug features
   */
  constructor(params: VRMParameters, debugOption: VRMDebugOptions = {}) {
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
