import * as THREE from 'three';
import { VRMSchema } from '../types';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMMeta } from './VRMMeta';
import { VRMMetaImporterOptions } from './VRMMetaImporterOptions';

/**
 * An importer that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
export class VRMMetaImporter {
  /**
   * If `true`, it won't load its thumbnail texture ({@link VRMMeta.texture}). `false` by default.
   */
  public ignoreTexture: boolean;

  constructor(options: VRMMetaImporterOptions) {
    this.ignoreTexture = options.ignoreTexture ?? false;
  }

  public async import(gltf: GLTF): Promise<VRMMeta | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaMeta: VRMSchema.Meta | undefined = vrmExt.meta;
    if (!schemaMeta) {
      return null;
    }

    let texture: THREE.Texture | null | undefined;
    if (!this.ignoreTexture && schemaMeta.texture != null && schemaMeta.texture !== -1) {
      texture = await gltf.parser.getDependency('texture', schemaMeta.texture);
    }

    return {
      allowedUserName: schemaMeta.allowedUserName,
      author: schemaMeta.author,
      commercialUssageName: schemaMeta.commercialUssageName,
      contactInformation: schemaMeta.contactInformation,
      licenseName: schemaMeta.licenseName,
      otherLicenseUrl: schemaMeta.otherLicenseUrl,
      otherPermissionUrl: schemaMeta.otherPermissionUrl,
      reference: schemaMeta.reference,
      sexualUssageName: schemaMeta.sexualUssageName,
      texture: texture ?? undefined,
      title: schemaMeta.title,
      version: schemaMeta.version,
      violentUssageName: schemaMeta.violentUssageName,
    };
  }
}
