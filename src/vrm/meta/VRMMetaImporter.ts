import { VRMSchema } from '../types';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMMeta } from './VRMMeta';

/**
 * An importer that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
export class VRMMetaImporter {
  public async import(gltf: GLTF): Promise<VRMMeta | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaMeta: VRMSchema.Meta | undefined = vrmExt.meta;
    if (!schemaMeta) {
      return null;
    }

    const texture =
      schemaMeta.texture != null && schemaMeta.texture !== -1
        ? await gltf.parser.getDependency('texture', schemaMeta.texture)
        : null;

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
