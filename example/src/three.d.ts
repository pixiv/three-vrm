import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

declare module 'three' {

  export class GLTFLoader {
    public manager: THREE.LoadingManager;
    public dracoLoader: any;
    constructor(manager?: THREE.LoadingManager, parser?: any);
    public load(url: string, onLoad: (gltf: GLTF) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void) : void;
    public parse(
      data: ArrayBuffer | ArrayBufferView,
      path?: string,
      onLoad?: (gltf: GLTF) => void,
      onError?: (event: ErrorEvent) => void,
    ): void;
  }
}
