import { GLTFSchema } from '.';

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  export class GLTF {
    public scene: THREE.Scene;
    public scenes: THREE.Scene[];
    public cameras: THREE.Camera[];
    public animations: THREE.AnimationClip[];
    public asset: object;
    public parser: {
      json: GLTFSchema.GLTF;
      getDependency: (type: string, index: number) => Promise<any>;
      getDependencies: (type: string) => Promise<any[]>;
      [key: string]: any;
    };
    public userData: any;
  }
}
