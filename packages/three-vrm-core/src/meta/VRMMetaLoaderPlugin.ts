import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMMetaImporter } from './VRMMetaImporter';

/**
 * A plugin of GLTFLoader that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
export class VRMMetaLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;
  public readonly importer: VRMMetaImporter;

  public constructor(parser: GLTFParser, importer?: VRMMetaImporter) {
    this.parser = parser;
    this.importer = importer ?? new VRMMetaImporter();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const meta = await this.importer.import(gltf);
    gltf.userData.vrmMeta = meta;
  }
}
