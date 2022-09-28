/* eslint-disable @typescript-eslint/naming-convention */

export const VRMFirstPersonMeshAnnotationType = {
  Auto: 'auto',
  Both: 'both',
  ThirdPersonOnly: 'thirdPersonOnly',
  FirstPersonOnly: 'firstPersonOnly',
} as const;

export type VRMFirstPersonMeshAnnotationType =
  typeof VRMFirstPersonMeshAnnotationType[keyof typeof VRMFirstPersonMeshAnnotationType];
