export interface BlendShapeMaterialValue {
  material?: number;

  type?: 'color' | 'emissionColor' | 'shadeColor' | 'rimColor' | 'outlineColor';

  targetValue?: number;
}
