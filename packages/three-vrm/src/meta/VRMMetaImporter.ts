import * as VRMSchema from '@pixiv/types-vrm-0.0';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMMeta } from './VRMMeta';
import { VRMMetaAllowedUserName } from './VRMMetaAllowedUserName';
import { VRMMetaImporterOptions } from './VRMMetaImporterOptions';
import { VRMMetaLicenseName } from './VRMMetaLicenseName';
import { VRMMetaUssageName } from './VRMMetaUssageName';

/**
 * An importer that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
export class VRMMetaImporter {
  /**
   * If `true`, it won't load its thumbnail texture ({@link VRMMeta.texture}). `false` by default.
   */
  public ignoreTexture: boolean;

  constructor(options?: VRMMetaImporterOptions) {
    this.ignoreTexture = options?.ignoreTexture ?? false;
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
      allowedUserName: schemaMeta.allowedUserName as VRMMetaAllowedUserName,
      author: schemaMeta.author,
      commercialUssageName: schemaMeta.commercialUssageName as VRMMetaUssageName,
      contactInformation: schemaMeta.contactInformation,
      licenseName: schemaMeta.licenseName as VRMMetaLicenseName,
      otherLicenseUrl: schemaMeta.otherLicenseUrl,
      otherPermissionUrl: schemaMeta.otherPermissionUrl,
      reference: schemaMeta.reference,
      sexualUssageName: schemaMeta.sexualUssageName as VRMMetaUssageName,
      texture: texture ?? undefined,
      title: schemaMeta.title,
      version: schemaMeta.version,
      violentUssageName: schemaMeta.violentUssageName as VRMMetaUssageName,
    };
  }
}
