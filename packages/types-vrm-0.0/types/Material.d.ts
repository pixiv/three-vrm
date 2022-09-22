export interface Material {
    floatProperties?: {
        [key: string]: any;
    };
    keywordMap?: {
        [key: string]: any;
    };
    name?: string;
    renderQueue?: number;
    shader?: string;
    tagMap?: {
        [key: string]: any;
    };
    textureProperties?: {
        [key: string]: any;
    };
    vectorProperties?: {
        [key: string]: any;
    };
}
