import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMFirstPersonImporter } from './VRMFirstPersonImporter';

/**
 * A plugin of GLTFLoader that imports a {@link VRMFirstPerson} from a VRM extension of a GLTF.
 */
export class VRMFirstPersonLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;
  public readonly importer: VRMFirstPersonImporter;

  public constructor(parser: GLTFParser, importer?: VRMFirstPersonImporter) {
    this.parser = parser;
    this.importer = importer ?? new VRMFirstPersonImporter();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const firstPerson = await this.importer.import(gltf, gltf.userData.vrmHumanoid);
    gltf.userData.vrmFirstPerson = firstPerson;
  }
}
