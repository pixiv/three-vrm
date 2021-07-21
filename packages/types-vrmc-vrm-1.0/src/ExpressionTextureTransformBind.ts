export interface ExpressionTextureTransformBind {
  /**
   * target material
   */
  material: number;

  /**
   * uv scale for TEXCOORD_0
   */
  scale?: [number, number];

  /**
   * uv offset for TEXCOORD_0
   */
  offset?: [number, number];

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
