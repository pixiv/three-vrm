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
   * The index to access the thumbnail image of the avatar model in gltf.images.
   * The texture resolution of 1024x1024 is recommended.
   * It must be square. Preferable resolution is 1024 x 1024.
   * This is for the application to use as an icon.
   */
  thumbnailImage?: number;

  /**
   * A person who can perform with this avatar
   */
  avatarPermission?: 'OnlyAuthor' | 'ExplicitlyLicensedPerson' | 'Everyone';

  /**
   * Perform violent acts with this avatar
   */
  violentUsage?: boolean;

  /**
   * Perform sexual acts with this avatar
   */
  sexualUsage?: boolean;

  gameUsage?: boolean;

  /**
   * Commercial use
   */
  commercialUsage?:
    | 'PersonalNonCommercialNonProfit'
    | 'PersonalNonCommercialProfit'
    | 'PersonalCommercial'
    | 'Corporation';

  politicalOrReligiousUsage?: boolean;

  /**
   * Describe the URL links of license with regard to other permissions
   */
  otherPermissionUrl?: string;

  creditNotation?: 'Required' | 'Unnecessary' | 'Abandoned';

  allowRedistribution?: boolean;

  modify?: 'Prohibited' | 'Inherited' | 'NotInherited';

  /**
   * Describe the URL links of other license
   */
  otherLicenseUrl?: string;
}
