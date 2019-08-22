import * as THREE from 'three';
import { reduceBones } from '../reduceBones';
import { VRMImporter, VRMImporterOptions } from '../VRMImporter';
import { DebugOption } from './DebugOption';
import { VRMDebug } from './VRMDebug';
import { VRMSpringBoneImporterDebug } from './VRMSpringBoneImporterDebug';

export class VRMImporterDebug extends VRMImporter {
  public constructor(options: VRMImporterOptions = {}) {
    options.springBoneImporter = options.springBoneImporter || new VRMSpringBoneImporterDebug();
    super(options);
  }

  public async import(gltf: THREE.GLTF, debugOption: DebugOption = {}): Promise<VRMDebug> {
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

    reduceBones(scene);

    const materials = await this._materialImporter.convertGLTFMaterials(gltf);

    const humanoid = (await this._humanoidImporter.import(gltf, vrmExt.humanoid)) || undefined;

    const firstPerson = humanoid
      ? (await this.loadFirstPerson(vrmExt.firstPerson, humanoid, gltf)) || undefined
      : undefined;

    const animationMixer = new THREE.AnimationMixer(gltf.scene);

    const blendShapeProxy = (await this.loadBlendShapeMaster(animationMixer!, gltf)) || undefined;

    const lookAt =
      blendShapeProxy && humanoid ? this.loadLookAt(vrmExt.firstPerson, blendShapeProxy, humanoid) : undefined;

    const springBoneManager = (await this._springBoneImporter.import(gltf)) || undefined;

    return new VRMDebug(
      {
        scene: gltf.scene,
        meta: vrmExt.meta,
        materials,
        humanoid,
        firstPerson,
        animationMixer,
        blendShapeProxy,
        lookAt,
        springBoneManager,
      },
      debugOption,
    );
  }
}
