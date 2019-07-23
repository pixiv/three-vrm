import * as THREE from 'three';
import { GLTF, VRM } from '../../';

export class VRMLoader {
  public manager: THREE.LoadingManager;
  public dracoLoader: any;
  constructor(manager?: THREE.LoadingManager, parser?: any);
  public loadGLTF(
    url: string,
    onLoad: (gltf: GLTF) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ): void;
  public load(
    url: string,
    onLoad: (gltf: VRM) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ): void;
  public parse(
    data: ArrayBuffer | ArrayBufferView,
    path?: string,
    onLoad?: (gltf: GLTF) => void,
    onError?: (event: ErrorEvent) => void,
  ): void;
}
