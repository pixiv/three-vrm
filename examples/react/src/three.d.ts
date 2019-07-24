import { GLTF } from "../../..";

declare module 'three' {
  export class GLTFLoader {
    public manager: THREE.LoadingManager;
    public dracoLoader: any;
    constructor(manager?: THREE.LoadingManager);
    public load(
      path: string,
      onLoad?: (gltf: GLTF) => void,
      onProgress?: (progress: number) => void,
      onError?: (event: ErrorEvent) => void,
    ): void;
    public parse(
      data: ArrayBuffer | ArrayBufferView,
      path?: string,
      onLoad?: (gltf: GLTF) => void,
      onError?: (event: ErrorEvent) => void,
    ): void;
  }
}
