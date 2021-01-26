/**
 * Interface represents a set of metadata of a VRM.
 */
export interface VRMMeta {
  /**
   * The name of the model.
   */
  name: string;

  /**
   * The version of the model.
   */
  version?: string;

  /**
   * Authors of the model.
   */
  authors: string[];

  /**
   * An information that describes the copyright of the model.
   */
  copyrightInformation?: string;

  /**
   * An information that describes the contact information of the author.
   */
  contactInformation?: string;

  /**
   * References / original works of the model.
   */
  references?: string[];

  /**
   * Third party licenses of the model, if required. You can use line breaks.
   */
  thirdPartyLicenses?: string;

  /**
   * An image of the thumbnail image of the avatar model.
   * It must be square. Preferable resolution is 1024 x 1024.
   * This is for the application to use as an icon.
   */
  thumbnailImage?: HTMLImageElement;

  /**
   * A person who can perform with this avatar.
   */
  avatarPermission?: 'onlyAuthor' | 'explicitlyLicensedPerson' | 'everyone';

  /**
   * A flag that permits to use this avatar in excessively violent contents.
   */
  allowExcessivelyViolentUsage?: boolean;

  /**
   * A flag that permits to use this avatar in excessively sexual contents.
   */
  allowExcessivelySexualUsage?: boolean;

  /**
   * An option that permits to use this avatar in commercial products.
   */
  commercialUsage?: 'personalNonProfit' | 'personalProfit' | 'corporation';

  /**
   * A flag that permits to use this avatar in political or religious contents.
   */
  allowPoliticalOrReligiousUsage?: boolean;

  /**
   * An option that forces or abandons to display the credit of this avatar.
   */
  creditNotation?: 'required' | 'unnecessary' | 'abandoned';

  /**
   * A flag that permits to redistribute this avatar.
   */
  allowRedistribution?: boolean;

  /**
   * An option that controls the condition to modify this avatar.
   */
  modification?: 'prohibited' | 'inherited' | 'notInherited';

  /**
   * Describe the URL links of other license.
   */
  otherLicenseUrl?: string;
}
