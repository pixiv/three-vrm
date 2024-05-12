import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { createVRMAnimationClip, VRMAnimationLoaderPlugin, VRMLookAtQuaternionProxy } from '@pixiv/three-vrm-animation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { property } from 'lit/decorators.js';
import ModelViewerElementBase, {
  $getModelIsVisible,
  $needsRender,
  $onModelLoad,
  $renderer,
  $scene,
  $tick,
} from '@google/model-viewer/src/model-viewer-base.js';
import type { Constructor } from '@google/model-viewer/src/utilities';
import { $loader, CachingGLTFLoader } from '@google/model-viewer/src/three-components/CachingGLTFLoader';
import { ModelViewerGLTFInstance } from '@google/model-viewer/src/three-components/gltf-instance/ModelViewerGLTFInstance';
import { $clone, $prepare, $preparedGLTF, PreparedGLTF } from '@google/model-viewer/src/three-components/GLTFInstance';
import { Renderer } from '@google/model-viewer/src/three-components/Renderer';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

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

    // Add look at quaternion proxy to the VRM; which is needed to play the look at animation
    const lookAtQuatProxy = new VRMLookAtQuaternionProxy(vrm.lookAt);
    lookAtQuatProxy.name = 'lookAtQuaternionProxy';
    vrm.scene.add(lookAtQuatProxy);

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

    this[$loader]
      .register((parser) => {
        return new VRMLoaderPlugin(parser);
      })
      .register((parser) => {
        return new VRMAnimationLoaderPlugin(parser);
      });
  }
}

// These symbols for animation are different from model-viewer's animation feature
export const $vrmaReady = Symbol('vrmaReady');
export const $vrmaMixer = Symbol('vrmaMixer');

export declare interface VRMInterface {
  vrm: VRM | undefined;
}

// TODO: vrm animation
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VRMMixin = <T extends Constructor<ModelViewerElementBase>>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ModelViewerElement: T,
): Constructor<VRMInterface> & T => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  class VRMModelViewerElement extends ModelViewerElement {
    @property({ type: String })
    vrmaSrc: string | null = null;
    currentVrmaSrc: string | null = null;

    protected [$vrmaMixer]: THREE.AnimationMixer | null = null;
    protected [$vrmaReady]: boolean | null = null;

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

      const deltaForVrm = delta / 1000;

      if (this[$vrmaReady] === null) {
        // no vrma is specified
        this.vrm?.update(deltaForVrm);
      } else if (this[$vrmaReady] === true) {
        // wait until vrma is ready too
        // TODO: allow crossfade
        this.vrm?.update(deltaForVrm);
        this[$vrmaMixer]?.update(deltaForVrm);
        // always queue render since some mixins(camera-controls) may avoid render in some conditions
        this[$needsRender]();
      }
    }

    /**
     * @override
     */
    connectedCallback() {
      super.connectedCallback();

      const vrmaSrc = this.vrmaSrc;
      if (vrmaSrc !== null && vrmaSrc != this.currentVrmaSrc) {
        this.currentVrmaSrc = vrmaSrc;
        this.loadVRMA();
      }
    }

    /**
     * @override
     */
    async [$onModelLoad]() {
      // skip calling super as it produces errors
      try {
        super[$onModelLoad]();
      } catch (e: unknown) {
        if ((e as Error)?.message?.includes("'materials'")) {
          // ignore TypeError: Cannot read properties of undefined (reading 'materials')
          // this works fine if we do not override `$onModelLoad` so idk what's going on
        } else {
          throw e;
        }
      }

      if (this.currentVrmaSrc != null) {
        this.loadVRMA();
      }
    }

    async loadVRMA() {
      if (!this.vrm) return;
      if (!this.currentVrmaSrc) return;

      this[$vrmaReady] = false;

      // we can not use this[$renderer].loader because it's wrapped for main model
      const gltfVrma = await Renderer.singleton.loader[$loader].loadAsync(this.currentVrmaSrc);
      const vrmAnimation = gltfVrma.userData.vrmAnimations[0];

      // create animation clip
      const clip = createVRMAnimationClip(vrmAnimation, this.vrm);

      // play animation
      const mixer = new THREE.AnimationMixer(this.vrm.scene);
      mixer.clipAction(clip).play();

      this[$vrmaMixer] = mixer;
      this[$vrmaReady] = true;
    }

    get vrm() {
      return this[$scene].currentGLTF?.userData.vrm;
    }
  }

  return VRMModelViewerElement;
};
