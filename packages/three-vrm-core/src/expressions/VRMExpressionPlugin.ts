import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMExpressionImporter } from './VRMExpressionImporter';

/**
 * A plugin of GLTFLoader that imports a {@link VRMExpressionManager} from a VRM extension of a GLTF.
 */
export class VRMExpressionPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;
  public readonly importer: VRMExpressionImporter;

  public constructor(parser: GLTFParser, importer?: VRMExpressionImporter) {
    this.parser = parser;
    this.importer = importer ?? new VRMExpressionImporter();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const expressionManager = await this.importer.import(gltf);
    gltf.userData.vrmExpressionManager = expressionManager;
  }
}
