import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMHumanoidImporter } from './VRMHumanoidImporter';

/**
 * A plugin of GLTFLoader that imports a {@link VRMHumanoid} from a VRM extension of a GLTF.
 */
export class VRMHumanoidPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;
  public readonly importer: VRMHumanoidImporter;

  public constructor(parser: GLTFParser, importer?: VRMHumanoidImporter) {
    this.parser = parser;
    this.importer = importer ?? new VRMHumanoidImporter();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const expression = await this.importer.import(gltf);
    gltf.userData.vrmHumanoid = expression;
  }
}
