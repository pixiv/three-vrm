/**
 * A set of options for a {@link VRMMetaLoaderPlugin} instance.
 */
export interface VRMMetaLoaderPluginOptions {
  /**
   * If `false`, it won't load its thumbnail image ({@link VRMMeta.thumbnailImage}). `true` by default.
   */
  needThumbnailImage?: boolean;
}
