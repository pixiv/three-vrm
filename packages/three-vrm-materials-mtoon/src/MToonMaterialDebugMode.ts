/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Specifiers of debug mode of {@link MToonMaterial}.
 *
 * See: {@link MToonMaterial.debugMode}
 */
export const MToonMaterialDebugMode = {
  /**
   * Render normally.
   */
  None: 'none',

  /**
   * Visualize normals of the surface.
   */
  Normal: 'normal',

  /**
   * Visualize lit/shade of the surface.
   */
  LitShadeRate: 'litShadeRate',

  /**
   * Visualize UV of the surface.
   */
  UV: 'uv',
} as const;

export type MToonMaterialDebugMode = typeof MToonMaterialDebugMode[keyof typeof MToonMaterialDebugMode];
