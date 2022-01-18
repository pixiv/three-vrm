/**
 * Options for a {@link VRMMetaImporter} instance.
 */
export interface VRMMetaImporterOptions {
    /**
     * If `true`, it won't load its thumbnail texture ({@link VRMMeta.texture}). `false` by default.
     */
    ignoreTexture?: boolean;
}
