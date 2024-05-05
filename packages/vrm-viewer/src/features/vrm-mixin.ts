import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import ModelViewerElementBase, {
  $getModelIsVisible,
  $renderer,
  $scene,
  $tick,
} from '@google/model-viewer/src/model-viewer-base.js';
import type { Constructor } from '@google/model-viewer/src/utilities';
import { $loader, CachingGLTFLoader } from '@google/model-viewer/src/three-components/CachingGLTFLoader';
import { ModelViewerGLTFInstance } from '@google/model-viewer/src/three-components/gltf-instance/ModelViewerGLTFInstance';
import { $clone, $prepare, $preparedGLTF, PreparedGLTF } from '@google/model-viewer/src/three-components/GLTFInstance';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export declare interface VRMInterface {
  vrm: VRM | undefined;
}

type PreparedModelViewerGLTF = ReturnType<typeof ModelViewerGLTFInstance['prepare']>;

export class ModelViewerVRMInstance extends ModelViewerGLTFInstance {
  /**
   * @override
   */
  protected static [$prepare](source: GLTF): PreparedModelViewerGLTF {
    const prepared = super[$prepare](source) as PreparedModelViewerGLTF;
    const vrm = prepared.userData.vrm;

    // calling these functions greatly improves the performance
    VRMUtils.removeUnnecessaryVertices(prepared.scene);
    VRMUtils.removeUnnecessaryJoints(prepared.scene);

    // light
    // TODO: expose light control
    const light = new THREE.DirectionalLight(0xffffff, Math.PI);
    light.position.set(1.0, 1.0, 1.0).normalize();
    prepared.scene.add(light);

    // Disable frustum culling
    vrm.scene.traverse((obj: THREE.Object3D) => {
      obj.frustumCulled = false;
    });

    VRMUtils.rotateVRM0(vrm);

    return prepared;
  }

  /**
   * @override
   */
  [$clone](): PreparedGLTF {
    // https://github.com/pixiv/three-vrm/discussions/1172
    // three-vrm not supported cloning yet so return the origin instance
    return this[$preparedGLTF];
  }
}

export class CachingVRMLoader extends CachingGLTFLoader<typeof ModelViewerGLTFInstance> {
  /**
   * @override
   */
  constructor(arg: typeof ModelViewerGLTFInstance) {
    super(arg);
    this[$loader].register((parser) => {
      return new VRMLoaderPlugin(parser);
    });
  }
}

// TODO: vrm animation
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VRMMixin = <T extends Constructor<ModelViewerElementBase>>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ModelViewerElement: T,
): Constructor<VRMInterface> & T => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  class VRMModelViewerElement extends ModelViewerElement {
    /**
     * @override
     */
    constructor(...args: any[]) {
      super(args);
      this[$renderer].loader = new CachingVRMLoader(ModelViewerVRMInstance);
    }

    /**
     * @override
     */
    [$tick](time: number, delta: number) {
      super[$tick](time, delta);

      if (!this[$getModelIsVisible]() || this[$renderer].isPresenting) {
        return;
      }

      this.vrm?.update(delta);
    }

    get vrm() {
      return this[$scene].currentGLTF?.userData.vrm;
    }
  }

  return VRMModelViewerElement;
};
