/**
 * A set of options for a {@link VRMMetaLoaderPlugin} instance.
 */
export interface VRMMetaLoaderPluginOptions {
    /**
     * If `false`, it won't load its thumbnail image ({@link VRM1Meta.thumbnailImage}).
     * `true` by default.
     */
    needThumbnailImage?: boolean;
    /**
     * A list of license urls.
     * This meta loader will accept these `licenseUrl`s.
     * Otherwise it will throw an error.
     */
    acceptLicenseUrls?: string[];
    /**
     * Whether it should accept VRM0.0 meta or not.
     * Note that it might load {@link VRM0Meta} instead of {@link VRM1Meta} when this is `true`.
     * `true` by default.
     */
    acceptV0Meta?: boolean;
}
