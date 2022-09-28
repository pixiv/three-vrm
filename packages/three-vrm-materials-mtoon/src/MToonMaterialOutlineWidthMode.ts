/* eslint-disable @typescript-eslint/naming-convention */

export const MToonMaterialOutlineWidthMode = {
  None: 'none',
  WorldCoordinates: 'worldCoordinates',
  ScreenCoordinates: 'screenCoordinates',
} as const;

export type MToonMaterialOutlineWidthMode =
  typeof MToonMaterialOutlineWidthMode[keyof typeof MToonMaterialOutlineWidthMode];
