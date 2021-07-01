import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRM0Meta } from './VRM0Meta';
import type { VRM1Meta } from './VRM1Meta';
import type { VRMMeta } from './VRMMeta';
import type { VRMMetaLoaderPluginOptions } from './VRMMetaLoaderPluginOptions';
import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import * as THREE from 'three';
import { resolveURL } from '../utils/resolveURL';

/**
 * A plugin of GLTFLoader that imports a {@link VRM1Meta} from a VRM extension of a GLTF.
 */
export class VRMMetaLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  /**
   * If `false`, it won't load its thumbnail image ({@link VRM1Meta.thumbnailImage}). `true` by default.
   */
  public needThumbnailImage: boolean;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMMetaLoaderPlugin';
  }

  public constructor(parser: GLTFParser, options?: VRMMetaLoaderPluginOptions) {
    this.parser = parser;

    this.needThumbnailImage = options?.needThumbnailImage ?? true;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    // this might be called twice or more by its dependants!

    if (gltf.userData.promiseVrmMeta == null) {
      gltf.userData.promiseVrmMeta = (async () => {
        return await this._import(gltf);
      })();

      gltf.userData.vrmMeta = await gltf.userData.promiseVrmMeta;
    }

    await gltf.userData.promiseVrmMeta;
  }

  protected async _import(gltf: GLTF): Promise<VRMMeta | null> {
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

  protected async _v1Import(gltf: GLTF): Promise<VRM1Meta | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = this.parser.json.extensionsUsed.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRM | undefined = this.parser.json.extensions?.['VRMC_vrm'];
    if (!extension) {
      return null;
    }

    const schemaMeta = extension.meta;
    if (!schemaMeta) {
      return null;
    }

    let thumbnailImage: HTMLImageElement | undefined = undefined;
    if (this.needThumbnailImage && schemaMeta.thumbnailImage != null) {
      thumbnailImage = (await this._extractGLTFImage(schemaMeta.thumbnailImage)) ?? undefined;
    }

    return {
      metaVersion: '1',
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
      allowAntisocialOrHateUsage: schemaMeta.allowAntisocialOrHateUsage,
      creditNotation: schemaMeta.creditNotation,
      allowRedistribution: schemaMeta.allowRedistribution,
      modification: schemaMeta.modification,
      otherLicenseUrl: schemaMeta.otherLicenseUrl,
    };
  }

  protected async _v0Import(gltf: GLTF): Promise<VRM0Meta | null> {
    // early abort if it doesn't use vrm
    const vrmExt: V0VRM.VRM | undefined = this.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaMeta = vrmExt.meta;
    if (!schemaMeta) {
      return null;
    }

    // load thumbnail texture
    let texture: THREE.Texture | null | undefined;
    if (this.needThumbnailImage && schemaMeta.texture != null && schemaMeta.texture !== -1) {
      texture = await this.parser.getDependency('texture', schemaMeta.texture);
    }

    return {
      metaVersion: '0',
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

  protected async _extractGLTFImage(index: number): Promise<HTMLImageElement | null> {
    const source = this.parser.json.images?.[index];
    if (source == null) {
      console.warn(`Attempt to use images[${index}] of glTF as a thumbnail but the image doesn't exist`);
      return null;
    }

    // Ref: https://github.com/mrdoob/three.js/blob/r124/examples/jsm/loaders/GLTFLoader.js#L2467

    // `source.uri` might be a reference to a file
    let sourceURI: string | undefined = source.uri;

    // Load the binary as a blob
    if (source.bufferView != null) {
      const bufferView = await this.parser.getDependency('bufferView', source.bufferView);
      const blob = new Blob([bufferView], { type: source.mimeType });
      sourceURI = URL.createObjectURL(blob);
    }

    if (sourceURI == null) {
      console.warn(`Attempt to use images[${index}] of glTF as a thumbnail but the image couldn't load properly`);
      return null;
    }

    const loader = new THREE.ImageLoader();
    return await loader.loadAsync(resolveURL(sourceURI, (this.parser as any).options.path)).catch((error) => {
      console.error(error);
      console.warn('Failed to load a thumbnail image');
      return null;
    });
  }
}
