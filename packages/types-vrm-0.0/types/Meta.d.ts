export interface Meta {
  /**
   * A person who can perform with this avatar
   */
  allowedUserName?: 'OnlyAuthor' | 'ExplicitlyLicensedPerson' | 'Everyone';

  /**
   * Author of VRM model
   */
  author?: string;

  /**
   * For commercial use
   */
  commercialUssageName?: 'Disallow' | 'Allow';

  /**
   * Contact Information of VRM model author
   */
  contactInformation?: string;

  /**
   * License type
   */
  licenseName?:
    | 'Redistribution_Prohibited'
    | 'CC0'
    | 'CC_BY'
    | 'CC_BY_NC'
    | 'CC_BY_SA'
    | 'CC_BY_NC_SA'
    | 'CC_BY_ND'
    | 'CC_BY_NC_ND'
    | 'Other';

  /**
   * If “Other” is selected, put the URL link of the license document here.
   */
  otherLicenseUrl?: string;

  /**
   * If there are any conditions not mentioned above, put the URL link of the license document
   * here.
   */
  otherPermissionUrl?: string;

  /**
   * Reference of VRM model
   */
  reference?: string;

  /**
   * Permission to perform sexual acts with this avatar
   */
  sexualUssageName?: 'Disallow' | 'Allow';

  /**
   * Thumbnail of VRM model
   */
  texture?: number;

  /**
   * Title of VRM model
   */
  title?: string;

  /**
   * Version of VRM model
   */
  version?: string;

  /**
   * Permission to perform violent acts with this avatar
   */
  violentUssageName?: 'Disallow' | 'Allow';
}
