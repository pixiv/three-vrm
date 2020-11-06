export interface BlendShapeMaterialUVBind {
  material?: number;

  /**
   * uv scaling for TEXCOORD_0
   */
  scaling?: [number, number];

  /**
   * uv offset for TEXCOORD_0
   */
  offset?: [number, number];
}
