export interface ExpressionTextureTransformBind {
  /**
   * target material
   */
  material: number;

  /**
   * uv scaling for TEXCOORD_0
   */
  scaling?: [number, number];

  /**
   * uv offset for TEXCOORD_0
   */
  offset?: [number, number];

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
