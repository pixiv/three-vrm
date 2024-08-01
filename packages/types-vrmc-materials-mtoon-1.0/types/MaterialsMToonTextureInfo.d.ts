export interface MaterialsMToonTextureInfo {
  /**
   * The index of the texture.
   */
  index: number;

  /**
   * This integer value is used to construct a string in the format `TEXCOORD_<set index>` which is a reference to a key in mesh.primitives.attributes (e.g. A value of `0` corresponds to `TEXCOORD_0`). Mesh must have corresponding texture coordinate attributes for the material to be applicable to it.
   */
  texCoord?: number;

  extensions?: { [name: string]: any };
  extras?: any;
}
