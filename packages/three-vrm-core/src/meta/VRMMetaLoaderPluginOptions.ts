/**
 * A set of options for a {@link VRMMetaLoaderPlugin} instance.
 */
export interface VRMMetaLoaderPluginOptions {
  /**
   * If `false`, it won't load its thumbnail image ({@link VRM1Meta.thumbnailImage}). `true` by default.
   */
  needThumbnailImage?: boolean;
}
