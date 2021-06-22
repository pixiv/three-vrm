import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLookAtImporter } from './VRMLookAtImporter';

/**
 * A plugin of GLTFLoader that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
export class VRMLookAtPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;
  public readonly importer: VRMLookAtImporter;

  public constructor(parser: GLTFParser, importer?: VRMLookAtImporter) {
    this.parser = parser;
    this.importer = importer ?? new VRMLookAtImporter();
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const lookAt = await this.importer.import(gltf, gltf.userData.vrmHumanoid, gltf.userData.vrmExpressions);
    gltf.userData.vrmLookAt = lookAt;
  }
}
