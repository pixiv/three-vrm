import { RawGltf } from './GLTF';

declare module 'three' {
  export class GLTF {
    public scene: THREE.Scene;
    public scenes: THREE.Scene[];
    public cameras: THREE.Camera[];
    public animations: THREE.AnimationClip[];
    public asset: {
      copyright?: string;
      generator?: string;
      version: string;
      minVersion?: string;
      extensions?: object;
      extras?: any;
    };
    public parser: {
      json: RawGltf;
      getDependency: (type: string, index: number) => Promise<any>;
      getDependencies: (type: string) => Promise<any[]>;
      [key: string]: any;
    };
    public userData: any;
  }
}
