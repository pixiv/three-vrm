import * as THREE from 'three';
import { VRMSchema } from '../types';
/**
 * Interface represents metadata of a VRM.
 */
export interface VRMMeta {
    /**
     * Enum indicates a condition who can perform with this avatar.
     */
    allowedUserName?: VRMSchema.MetaAllowedUserName;
    /**
     * Author of the model.
     */
    author?: string;
    /**
     * Enum indicates allow or disallow commercial use.
     */
    commercialUssageName?: VRMSchema.MetaUssageName;
    /**
     * Contact Information of its author.
     */
    contactInformation?: string;
    /**
     * Enum indicates a license type.
     */
    licenseName?: VRMSchema.MetaLicenseName;
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
    sexualUssageName?: VRMSchema.MetaUssageName;
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
    violentUssageName?: VRMSchema.MetaUssageName;
}
