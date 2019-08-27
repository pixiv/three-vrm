export interface RawGltf {
    accessors?: RawAccessor[];
    animations?: RawAnimation[];
    asset: RawAsset;
    buffers?: RawBuffer[];
    bufferViews?: RawBufferView[];
    cameras?: RawCamera[];
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extensionsRequired?: string[];
    extensionsUsed?: string[];
    extras?: any;
    images?: RawImage[];
    materials?: RawMaterial[];
    meshes?: RawMesh[];
    nodes?: RawNode[];
    samplers?: RawSampler[];
    scene?: number;
    scenes?: RawScene[];
    skins?: RawSkin[];
    textures?: RawTexture[];
}
export interface RawAccessor {
    bufferView?: number;
    byteOffset?: number;
    componentType: number;
    count: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    max?: number[];
    min?: number[];
    name?: string;
    normalized?: boolean;
    sparse?: RawAccessorSparse;
    type: string;
}
export interface RawAccessorSparse {
    count: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    indices: RawAccessorSparseIndices;
    values: RawAccessorSparseValues;
}
export interface RawAccessorSparseIndices {
    bufferView: number;
    byteOffset?: number;
    componentType: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
}
export interface RawAccessorSparseValues {
    bufferView: number;
    byteOffset?: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
}
export interface RawAnimation {
    channels: RawAnimationChannel[];
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    samplers: RawAnimationSampler[];
}
export interface RawAnimationChannel {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    sampler: number;
    target: RawAnimationChannelTarget;
}
export interface RawAnimationChannelTarget {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    node?: number;
    path: string;
}
export interface RawAnimationSampler {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    input: number;
    interpolation?: string;
    output: number;
}
export interface RawAsset {
    copyright?: string;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    generator?: string;
    minVersion?: string;
    version: string;
}
export interface RawBufferView {
    buffer: number;
    byteLength: number;
    byteOffset?: number;
    byteStride?: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    target?: number;
}
export interface RawBuffer {
    byteLength: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    uri?: string;
}
export interface RawCamera {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    orthographic?: RawCameraOrthographic;
    perspective?: RawCameraPerspective;
    type: string;
}
export interface RawCameraOrthographic {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    xmag: number;
    ymag: number;
    zfar: number;
    znear: number;
}
export interface RawCameraPerspective {
    aspectRatio?: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    yfov: number;
    zfar?: number;
    znear: number;
}
export interface RawImage {
    bufferView?: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    mimeType?: string;
    name?: string;
    uri?: string;
}
export interface RawMaterial {
    alphaCutoff?: number;
    alphaMode?: string;
    doubleSided?: boolean;
    emissiveFactor?: number[];
    emissiveTexture?: RawTextureInfo;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    normalTexture?: RawMaterialNormalTextureInfoObject;
    occlusionTexture?: RawMaterialOcclusionTextureInfoObject;
    pbrMetallicRoughness?: RawMaterialPBRMetallicRoughness;
}
export interface RawTextureInfo {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    index: number;
    texCoord?: number;
}
export interface RawMaterialNormalTextureInfoObject {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    index: number;
    scale?: number;
    texCoord?: number;
}
export interface RawMaterialOcclusionTextureInfoObject {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    index: number;
    strength?: number;
    texCoord?: number;
}
export interface RawMaterialPBRMetallicRoughness {
    baseColorFactor?: number[];
    baseColorTexture?: RawTextureInfo;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    metallicFactor?: number;
    metallicRoughnessTexture?: RawTextureInfo;
    roughnessFactor?: number;
}
export interface RawMesh {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    primitives: RawMeshPrimitive[];
    weights?: number[];
}
export interface RawMeshPrimitive {
    attributes: {
        [key: string]: number;
    };
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    indices?: number;
    material?: number;
    mode?: number;
    targets?: Array<{
        [key: string]: number;
    }>;
}
export interface RawNode {
    camera?: number;
    children?: number[];
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    matrix?: number[];
    mesh?: number;
    name?: string;
    rotation?: number[];
    scale?: number[];
    skin?: number;
    translation?: number[];
    weights?: number[];
}
export interface RawSampler {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    magFilter?: number;
    minFilter?: number;
    name?: string;
    wrapS?: number;
    wrapT?: number;
}
export interface RawScene {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    nodes?: number[];
}
export interface RawSkin {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    inverseBindMatrices?: number;
    joints: number[];
    name?: string;
    skeleton?: number;
}
export interface RawTexture {
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
    name?: string;
    sampler?: number;
    source?: number;
}
