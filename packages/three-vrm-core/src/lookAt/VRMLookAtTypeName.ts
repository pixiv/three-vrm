/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Represents a type of applier.
 */
export const VRMLookAtTypeName = {
  Bone: 'bone',
  Expression: 'expression',
};

export type VRMLookAtTypeName = typeof VRMLookAtTypeName[keyof typeof VRMLookAtTypeName];
