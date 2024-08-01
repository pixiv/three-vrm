export interface Meta {
  /**
   * The name of the model
   */
  name: string;

  /**
   * The version of the model
   */
  version?: string;

  /**
   * Authos of the model
   */
  authors: string[];

  /**
   * An information that describes the copyright of the model
   */
  copyrightInformation?: string;

  /**
   * An information that describes the contact information of the author
   */
  contactInformation?: string;

  /**
   * References / original works of the model
   */
  references?: string[];

  /**
   * Third party licenses of the model, if required. You can use line breaks
   */
  thirdPartyLicenses?: string;

  /**
   * The index to the thumbnail image of the model in gltf.images
   */
  thumbnailImage?: number;

  /**
   * A URL towards the license document this model refers to
   */
  licenseUrl: string;

  /**
   * A person who can perform as an avatar with this model
   */
  avatarPermission?: 'onlyAuthor' | 'onlySeparatelyLicensedPerson' | 'everyone';

  /**
   * A flag that permits to use this model in excessively violent contents
   */
  allowExcessivelyViolentUsage?: boolean;

  /**
   * A flag that permits to use this model in excessively sexual contents
   */
  allowExcessivelySexualUsage?: boolean;

  /**
   * An option that permits to use this model in commercial products
   */
  commercialUsage?: 'personalNonProfit' | 'personalProfit' | 'corporation';

  /**
   * A flag that permits to use this model in political or religious contents
   */
  allowPoliticalOrReligiousUsage?: boolean;

  /**
   * A flag that permits to use this model in contents contain anti-social activities or hate speeches
   */
  allowAntisocialOrHateUsage?: boolean;

  /**
   * An option that forces or abandons to display the credit of this model
   */
  creditNotation?: 'required' | 'unnecessary';

  /**
   * A flag that permits to redistribute this model
   */
  allowRedistribution?: boolean;

  /**
   * An option that controls the condition to modify this model
   */
  modification?: 'prohibited' | 'allowModification' | 'allowModificationRedistribution';

  /**
   * Describe the URL links of other license
   */
  otherLicenseUrl?: string;

  extensions?: { [name: string]: any };
  extras?: any;
}
