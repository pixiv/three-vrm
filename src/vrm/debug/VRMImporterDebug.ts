import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMImporter, VRMImporterOptions } from '../VRMImporter';
import { VRMDebug } from './VRMDebug';
import { VRMDebugOptions } from './VRMDebugOptions';
import { VRMLookAtHeadDebug } from './VRMLookAtHeadDebug';
import { VRMLookAtImporterDebug } from './VRMLookAtImporterDebug';
import { VRMSpringBoneImporterDebug } from './VRMSpringBoneImporterDebug';
import { VRMSpringBoneManagerDebug } from './VRMSpringBoneManagerDebug';

/**
 * An importer that imports a [[VRMDebug]] from a VRM extension of a GLTF.
 */
export class VRMImporterDebug extends VRMImporter {
  public constructor(options: VRMImporterOptions = {}) {
    options.lookAtImporter = options.lookAtImporter || new VRMLookAtImporterDebug();
    options.springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporterDebug();
    super(options);
  }

  public async import(gltf: GLTF, debugOptions: VRMDebugOptions = {}): Promise<VRMDebug> {
    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('Could not find VRM extension on the GLTF');
    }
    const vrmExt = gltf.parser.json.extensions.VRM;

    const scene = gltf.scene;

    scene.updateMatrixWorld(false);

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false;
      }
    });

    const materials = (await this._materialImporter.convertGLTFMaterials(gltf)) || undefined;

    const humanoid = (await this._humanoidImporter.import(gltf)) || undefined;

    const firstPerson = humanoid ? (await this._firstPersonImporter.import(gltf, humanoid)) || undefined : undefined;

    const blendShapeProxy = (await this._blendShapeImporter.import(gltf)) || undefined;

    const lookAt =
      firstPerson && blendShapeProxy && humanoid
        ? (await this._lookAtImporter.import(gltf, firstPerson, blendShapeProxy, humanoid)) || undefined
        : undefined;
    if ((lookAt as any).setupHelper) {
      (lookAt as VRMLookAtHeadDebug).setupHelper(scene, debugOptions);
    }

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;
    if ((springBoneManager as any).setupHelper) {
      (springBoneManager as VRMSpringBoneManagerDebug).setupHelper(scene, debugOptions);
    }

    return new VRMDebug(
      {
        scene: gltf.scene,
        meta: vrmExt.meta,
        materials,
        humanoid,
        firstPerson,
        blendShapeProxy,
        lookAt,
        springBoneManager,
      },
      debugOptions,
    );
  }
}
