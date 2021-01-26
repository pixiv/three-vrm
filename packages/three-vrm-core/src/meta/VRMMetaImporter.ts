import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMMeta } from './VRMMeta';
import type { VRMMetaImporterOptions } from './VRMMetaImporterOptions';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import * as THREE from 'three';

/**
 * An importer that imports a {@link VRMMeta} from a VRM extension of a GLTF.
 */
export class VRMMetaImporter {
  /**
   * If `false`, it won't load its thumbnail image ({@link VRMMeta.thumbnailImage}). `true` by default.
   */
  public needThumbnailImage: boolean;

  constructor(options?: VRMMetaImporterOptions) {
    this.needThumbnailImage = options?.needThumbnailImage ?? true;
  }

  public async import(gltf: GLTF): Promise<VRMMeta | null> {
    const v1Result = await this._v1Import(gltf);
    if (v1Result != null) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf);
    if (v0Result != null) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(gltf: GLTF): Promise<VRMMeta | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_vrm-1.0_draft') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRM | undefined = gltf.parser.json.extensions?.['VRMC_vrm-1.0_draft'];
    if (!extension) {
      return null;
    }

    const schemaMeta = extension.meta;
    if (!schemaMeta) {
      return null;
    }

    let thumbnailImage: HTMLImageElement | undefined = undefined;
    if (this.needThumbnailImage && schemaMeta.thumbnailImage != null && schemaMeta.thumbnailImage !== -1) {
      thumbnailImage = (await this._extractGLTFImage(gltf, schemaMeta.thumbnailImage)) ?? undefined;
    }

    return {
      name: schemaMeta.name,
      version: schemaMeta.version,
      authors: schemaMeta.authors,
      copyrightInformation: schemaMeta.copyrightInformation,
      contactInformation: schemaMeta.contactInformation,
      references: schemaMeta.references,
      thirdPartyLicenses: schemaMeta.thirdPartyLicenses,
      thumbnailImage,
      avatarPermission: schemaMeta.avatarPermission,
      allowExcessivelyViolentUsage: schemaMeta.allowExcessivelyViolentUsage,
      allowExcessivelySexualUsage: schemaMeta.allowExcessivelySexualUsage,
      commercialUsage: schemaMeta.commercialUsage,
      allowPoliticalOrReligiousUsage: schemaMeta.allowPoliticalOrReligiousUsage,
      creditNotation: schemaMeta.creditNotation,
      allowRedistribution: schemaMeta.allowRedistribution,
      modification: schemaMeta.modification,
      otherLicenseUrl: schemaMeta.otherLicenseUrl,
    };
  }

  private async _v0Import(gltf: GLTF): Promise<VRMMeta | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRM') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    // we don't support v0 meta atm
    console.warn("We don't support v0 meta at the moment");
    return null;
  }

  private async _extractGLTFImage(gltf: GLTF, index: number): Promise<HTMLImageElement | null> {
    const source = gltf.parser.json.images?.[index];
    if (source == null) {
      console.warn(`Attempt to use images[${index}] of glTF as a thumbnail but the image doesn't exist`);
      return null;
    }

    // Ref: https://github.com/mrdoob/three.js/blob/r124/examples/jsm/loaders/GLTFLoader.js#L2467

    // `source.uri` might be a reference to a file
    let sourceURI: string | undefined = source.uri;

    // Load the binary as a blob
    if (source.bufferView != null) {
      const bufferView = await gltf.parser.getDependency('bufferView', source.bufferView);
      const blob = new Blob([bufferView], { type: source.mimeType });
      sourceURI = URL.createObjectURL(blob);
    }

    if (sourceURI == null) {
      console.warn(`Attempt to use images[${index}] of glTF as a thumbnail but the image couldn't load properly`);
      return null;
    }

    const loader = new THREE.ImageLoader();
    return await loader.loadAsync(sourceURI).catch((error) => {
      console.error(error);
      console.warn('Failed to load a thumbnail image');
      return null;
    });
  }
}
