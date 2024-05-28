/* eslint-disable @typescript-eslint/naming-convention */
import { VRM } from '@pixiv/three-vrm';
import ModelViewerElementBase from '@google/model-viewer/src/model-viewer-base.js';
import type { Constructor } from '@google/model-viewer/src/utilities';
import { CachingGLTFLoader } from '@google/model-viewer/src/three-components/CachingGLTFLoader';
import { ModelViewerGLTFInstance } from '@google/model-viewer/src/three-components/gltf-instance/ModelViewerGLTFInstance';
import { $clone, $prepare, PreparedGLTF } from '@google/model-viewer/src/three-components/GLTFInstance';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
export declare interface VRMInterface {
  vrm: VRM | undefined;
}
type PreparedModelViewerGLTF = ReturnType<typeof ModelViewerGLTFInstance['prepare']>;
// @ts-expect-error Excessive stack depth comparing types 'typeof ModelViewerVRMInstance' and 'typeof ModelViewerGLTFInstance'
export declare class ModelViewerVRMInstance extends ModelViewerGLTFInstance {
  /**
   * @override
   */
  protected static [$prepare](source: GLTF): PreparedModelViewerGLTF;
  /**
   * @override
   */
  [$clone](): PreparedGLTF;
}
export declare class CachingVRMLoader extends CachingGLTFLoader<typeof ModelViewerGLTFInstance> {
  /**
   * @override
   */
  constructor(arg: typeof ModelViewerGLTFInstance);
}
export declare const VRMMixin: <T extends Constructor<ModelViewerElementBase>>(
  ModelViewerElement: T,
) => Constructor<VRMInterface> & T;
export {};
