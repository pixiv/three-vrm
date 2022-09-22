import * as THREE from 'three';
/**
 * Interface represents metadata of a VRM 0.0 model.
 */
export interface VRM0Meta {
    /**
     * The version of meta.
     */
    metaVersion: '0';
    /**
     * Enum indicates a condition who can perform with this avatar.
     */
    allowedUserName?: 'Everyone' | 'ExplicitlyLicensedPerson' | 'OnlyAuthor';
    /**
     * Author of the model.
     */
    author?: string;
    /**
     * Enum indicates allow or disallow commercial use.
     */
    commercialUssageName?: 'Allow' | 'Disallow';
    /**
     * Contact Information of its author.
     */
    contactInformation?: string;
    /**
     * Enum indicates a license type.
     */
    licenseName?: 'CC0' | 'CC_BY' | 'CC_BY_NC' | 'CC_BY_NC_ND' | 'CC_BY_NC_SA' | 'CC_BY_ND' | 'CC_BY_SA' | 'Other' | 'Redistribution_Prohibited';
    /**
     * If `Other` is selected for {@link licenseName}, put the URL link of the license document here.
     */
    otherLicenseUrl?: string;
    /**
     * If there are any conditions not mentioned in {@link licenseName} or {@link otherLicenseUrl}, put the URL link of the license document here.
     */
    otherPermissionUrl?: string;
    /**
     * Reference of the model.
     */
    reference?: string;
    /**
     * Enum indicates allow or disallow sexual expressions.
     */
    sexualUssageName?: 'Allow' | 'Disallow';
    /**
     * Thumbnail of the model.
     */
    texture?: THREE.Texture;
    /**
     * Title of the model.
     */
    title?: string;
    /**
     * Version of the model.
     */
    version?: string;
    /**
     * Enum indicates allow or disallow violent expressions.
     */
    violentUssageName?: 'Allow' | 'Disallow';
}
