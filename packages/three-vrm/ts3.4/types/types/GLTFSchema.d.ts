export declare namespace GLTFSchema {
    /**
     * The root object for a glTF asset.
     */
    interface GLTF {
        /**
         * An array of accessors.
         */
        accessors?: Accessor[];
        /**
         * An array of keyframe animations.
         */
        animations?: Animation[];
        /**
         * Metadata about the glTF asset.
         */
        asset: Asset;
        /**
         * An array of buffers.
         */
        buffers?: Buffer[];
        /**
         * An array of bufferViews.
         */
        bufferViews?: BufferView[];
        /**
         * An array of cameras.
         */
        cameras?: Camera[];
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        /**
         * Names of glTF extensions required to properly load this asset.
         */
        extensionsRequired?: string[];
        /**
         * Names of glTF extensions used somewhere in this asset.
         */
        extensionsUsed?: string[];
        extras?: any;
        /**
         * An array of images.
         */
        images?: Image[];
        /**
         * An array of materials.
         */
        materials?: Material[];
        /**
         * An array of meshes.
         */
        meshes?: Mesh[];
        /**
         * An array of nodes.
         */
        nodes?: Node[];
        /**
         * An array of samplers.
         */
        samplers?: Sampler[];
        /**
         * The index of the default scene.
         */
        scene?: number;
        /**
         * An array of scenes.
         */
        scenes?: Scene[];
        /**
         * An array of skins.
         */
        skins?: Skin[];
        /**
         * An array of textures.
         */
        textures?: Texture[];
    }
    /**
     * A typed view into a bufferView.  A bufferView contains raw binary data.  An accessor
     * provides a typed view into a bufferView or a subset of a bufferView similar to how
     * WebGL's `vertexAttribPointer()` defines an attribute in a buffer.
     */
    interface Accessor {
        /**
         * The index of the bufferView.
         */
        bufferView?: number;
        /**
         * The offset relative to the start of the bufferView in bytes.
         */
        byteOffset?: number;
        /**
         * The datatype of components in the attribute.
         */
        componentType: number;
        /**
         * The number of attributes referenced by this accessor.
         */
        count: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * Maximum value of each component in this attribute.
         */
        max?: number[];
        /**
         * Minimum value of each component in this attribute.
         */
        min?: number[];
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * Specifies whether integer data values should be normalized.
         */
        normalized?: boolean;
        /**
         * Sparse storage of attributes that deviate from their initialization value.
         */
        sparse?: AccessorSparse;
        /**
         * Specifies if the attribute is a scalar, vector, or matrix.
         */
        type: string;
    }
    /**
     * Sparse storage of attributes that deviate from their initialization value.
     */
    interface AccessorSparse {
        /**
         * Number of entries stored in the sparse array.
         */
        count: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * Index array of size `count` that points to those accessor attributes that deviate from
         * their initialization value. Indices must strictly increase.
         */
        indices: AccessorSparseIndices;
        /**
         * Array of size `count` times number of components, storing the displaced accessor
         * attributes pointed by `indices`. Substituted values must have the same `componentType`
         * and number of components as the base accessor.
         */
        values: AccessorSparseValues;
    }
    /**
     * Index array of size `count` that points to those accessor attributes that deviate from
     * their initialization value. Indices must strictly increase.
     *
     * Indices of those attributes that deviate from their initialization value.
     */
    interface AccessorSparseIndices {
        /**
         * The index of the bufferView with sparse indices. Referenced bufferView can't have
         * ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target.
         */
        bufferView: number;
        /**
         * The offset relative to the start of the bufferView in bytes. Must be aligned.
         */
        byteOffset?: number;
        /**
         * The indices data type.
         */
        componentType: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
    }
    /**
     * Array of size `count` times number of components, storing the displaced accessor
     * attributes pointed by `indices`. Substituted values must have the same `componentType`
     * and number of components as the base accessor.
     *
     * Array of size `accessor.sparse.count` times number of components storing the displaced
     * accessor attributes pointed by `accessor.sparse.indices`.
     */
    interface AccessorSparseValues {
        /**
         * The index of the bufferView with sparse values. Referenced bufferView can't have
         * ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target.
         */
        bufferView: number;
        /**
         * The offset relative to the start of the bufferView in bytes. Must be aligned.
         */
        byteOffset?: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
    }
    /**
     * A keyframe animation.
     */
    interface Animation {
        /**
         * An array of channels, each of which targets an animation's sampler at a node's property.
         * Different channels of the same animation can't have equal targets.
         */
        channels: AnimationChannel[];
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * An array of samplers that combines input and output accessors with an interpolation
         * algorithm to define a keyframe graph (but not its target).
         */
        samplers: AnimationSampler[];
    }
    /**
     * Targets an animation's sampler at a node's property.
     */
    interface AnimationChannel {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of a sampler in this animation used to compute the value for the target.
         */
        sampler: number;
        /**
         * The index of the node and TRS property to target.
         */
        target: AnimationChannelTarget;
    }
    /**
     * The index of the node and TRS property to target.
     *
     * The index of the node and TRS property that an animation channel targets.
     */
    interface AnimationChannelTarget {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of the node to target.
         */
        node?: number;
        /**
         * The name of the node's TRS property to modify, or the "weights" of the Morph Targets it
         * instantiates. For the "translation" property, the values that are provided by the sampler
         * are the translation along the x, y, and z axes. For the "rotation" property, the values
         * are a quaternion in the order (x, y, z, w), where w is the scalar. For the "scale"
         * property, the values are the scaling factors along the x, y, and z axes.
         */
        path: string;
    }
    /**
     * Combines input and output accessors with an interpolation algorithm to define a keyframe
     * graph (but not its target).
     */
    interface AnimationSampler {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of an accessor containing keyframe input values, e.g., time.
         */
        input: number;
        /**
         * Interpolation algorithm.
         */
        interpolation?: string;
        /**
         * The index of an accessor, containing keyframe output values.
         */
        output: number;
    }
    /**
     * Metadata about the glTF asset.
     */
    interface Asset {
        /**
         * A copyright message suitable for display to credit the content creator.
         */
        copyright?: string;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * Tool that generated this glTF model.  Useful for debugging.
         */
        generator?: string;
        /**
         * The minimum glTF version that this asset targets.
         */
        minVersion?: string;
        /**
         * The glTF version that this asset targets.
         */
        version: string;
    }
    /**
     * A view into a buffer generally representing a subset of the buffer.
     */
    interface BufferView {
        /**
         * The index of the buffer.
         */
        buffer: number;
        /**
         * The total byte length of the buffer view.
         */
        byteLength: number;
        /**
         * The offset into the buffer in bytes.
         */
        byteOffset?: number;
        /**
         * The stride, in bytes.
         */
        byteStride?: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The target that the GPU buffer should be bound to.
         */
        target?: number;
    }
    /**
     * A buffer points to binary geometry, animation, or skins.
     */
    interface Buffer {
        /**
         * The length of the buffer in bytes.
         */
        byteLength: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The uri of the buffer.
         */
        uri?: string;
    }
    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the
     * camera in the scene.
     */
    interface Camera {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix.
         */
        orthographic?: CameraOrthographic;
        /**
         * A perspective camera containing properties to create a perspective projection matrix.
         */
        perspective?: CameraPerspective;
        /**
         * Specifies if the camera uses a perspective or orthographic projection.
         */
        type: string;
    }
    /**
     * An orthographic camera containing properties to create an orthographic projection matrix.
     */
    interface CameraOrthographic {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The floating-point horizontal magnification of the view. Must not be zero.
         */
        xmag: number;
        /**
         * The floating-point vertical magnification of the view. Must not be zero.
         */
        ymag: number;
        /**
         * The floating-point distance to the far clipping plane. `zfar` must be greater than
         * `znear`.
         */
        zfar: number;
        /**
         * The floating-point distance to the near clipping plane.
         */
        znear: number;
    }
    /**
     * A perspective camera containing properties to create a perspective projection matrix.
     */
    interface CameraPerspective {
        /**
         * The floating-point aspect ratio of the field of view.
         */
        aspectRatio?: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The floating-point vertical field of view in radians.
         */
        yfov: number;
        /**
         * The floating-point distance to the far clipping plane.
         */
        zfar?: number;
        /**
         * The floating-point distance to the near clipping plane.
         */
        znear: number;
    }
    /**
     * Image data used to create a texture. Image can be referenced by URI or `bufferView`
     * index. `mimeType` is required in the latter case.
     */
    interface Image {
        /**
         * The index of the bufferView that contains the image. Use this instead of the image's uri
         * property.
         */
        bufferView?: number;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The image's MIME type. Required if `bufferView` is defined.
         */
        mimeType?: string;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The uri of the image.
         */
        uri?: string;
    }
    /**
     * The material appearance of a primitive.
     */
    interface Material {
        /**
         * The alpha cutoff value of the material.
         */
        alphaCutoff?: number;
        /**
         * The alpha rendering mode of the material.
         */
        alphaMode?: string;
        /**
         * Specifies whether the material is double sided.
         */
        doubleSided?: boolean;
        /**
         * The emissive color of the material.
         */
        emissiveFactor?: number[];
        /**
         * The emissive map texture.
         */
        emissiveTexture?: TextureInfo;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The normal map texture.
         */
        normalTexture?: MaterialNormalTextureInfoObject;
        /**
         * The occlusion map texture.
         */
        occlusionTexture?: MaterialOcclusionTextureInfoObject;
        /**
         * A set of parameter values that are used to define the metallic-roughness material model
         * from Physically-Based Rendering (PBR) methodology. When not specified, all the default
         * values of `pbrMetallicRoughness` apply.
         */
        pbrMetallicRoughness?: MaterialPBRMetallicRoughness;
    }
    /**
     * The emissive map texture.
     *
     * The base color texture.
     *
     * The metallic-roughness texture.
     *
     * Reference to a texture.
     */
    interface TextureInfo {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of the texture.
         */
        index: number;
        /**
         * The set index of texture's TEXCOORD attribute used for texture coordinate mapping.
         */
        texCoord?: number;
    }
    /**
     * The normal map texture.
     *
     * Reference to a texture.
     */
    interface MaterialNormalTextureInfoObject {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of the texture.
         */
        index: number;
        /**
         * The scalar multiplier applied to each normal vector of the normal texture.
         */
        scale?: number;
        /**
         * The set index of texture's TEXCOORD attribute used for texture coordinate mapping.
         */
        texCoord?: number;
    }
    /**
     * The occlusion map texture.
     *
     * Reference to a texture.
     */
    interface MaterialOcclusionTextureInfoObject {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of the texture.
         */
        index: number;
        /**
         * A scalar multiplier controlling the amount of occlusion applied.
         */
        strength?: number;
        /**
         * The set index of texture's TEXCOORD attribute used for texture coordinate mapping.
         */
        texCoord?: number;
    }
    /**
     * A set of parameter values that are used to define the metallic-roughness material model
     * from Physically-Based Rendering (PBR) methodology. When not specified, all the default
     * values of `pbrMetallicRoughness` apply.
     *
     * A set of parameter values that are used to define the metallic-roughness material model
     * from Physically-Based Rendering (PBR) methodology.
     */
    interface MaterialPBRMetallicRoughness {
        /**
         * The material's base color factor.
         */
        baseColorFactor?: number[];
        /**
         * The base color texture.
         */
        baseColorTexture?: TextureInfo;
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The metalness of the material.
         */
        metallicFactor?: number;
        /**
         * The metallic-roughness texture.
         */
        metallicRoughnessTexture?: TextureInfo;
        /**
         * The roughness of the material.
         */
        roughnessFactor?: number;
    }
    /**
     * A set of primitives to be rendered.  A node can contain one mesh.  A node's transform
     * places the mesh in the scene.
     */
    interface Mesh {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * An array of primitives, each defining geometry to be rendered with a material.
         */
        primitives: MeshPrimitive[];
        /**
         * Array of weights to be applied to the Morph Targets.
         */
        weights?: number[];
    }
    /**
     * Geometry to be rendered with the given material.
     */
    interface MeshPrimitive {
        /**
         * A dictionary object, where each key corresponds to mesh attribute semantic and each value
         * is the index of the accessor containing attribute's data.
         */
        attributes: {
            [key: string]: number;
        };
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of the accessor that contains the indices.
         */
        indices?: number;
        /**
         * The index of the material to apply to this primitive when rendering.
         */
        material?: number;
        /**
         * The type of primitives to render.
         */
        mode?: number;
        /**
         * An array of Morph Targets, each  Morph Target is a dictionary mapping attributes (only
         * `POSITION`, `NORMAL`, and `TANGENT` supported) to their deviations in the Morph Target.
         */
        targets?: {
            [key: string]: number;
        }[];
    }
    /**
     * A node in the node hierarchy.  When the node contains `skin`, all `mesh.primitives` must
     * contain `JOINTS_0` and `WEIGHTS_0` attributes.  A node can have either a `matrix` or any
     * combination of `translation`/`rotation`/`scale` (TRS) properties. TRS properties are
     * converted to matrices and postmultiplied in the `T * R * S` order to compose the
     * transformation matrix; first the scale is applied to the vertices, then the rotation, and
     * then the translation. If none are provided, the transform is the identity. When a node is
     * targeted for animation (referenced by an animation.channel.target), only TRS properties
     * may be present; `matrix` will not be present.
     */
    interface Node {
        /**
         * The index of the camera referenced by this node.
         */
        camera?: number;
        /**
         * The indices of this node's children.
         */
        children?: number[];
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * A floating-point 4x4 transformation matrix stored in column-major order.
         */
        matrix?: number[];
        /**
         * The index of the mesh in this node.
         */
        mesh?: number;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
         */
        rotation?: number[];
        /**
         * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
         */
        scale?: number[];
        /**
         * The index of the skin referenced by this node.
         */
        skin?: number;
        /**
         * The node's translation along the x, y, and z axes.
         */
        translation?: number[];
        /**
         * The weights of the instantiated Morph Target. Number of elements must match number of
         * Morph Targets of used mesh.
         */
        weights?: number[];
    }
    /**
     * Texture sampler properties for filtering and wrapping modes.
     */
    interface Sampler {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * Magnification filter.
         */
        magFilter?: number;
        /**
         * Minification filter.
         */
        minFilter?: number;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * s wrapping mode.
         */
        wrapS?: number;
        /**
         * t wrapping mode.
         */
        wrapT?: number;
    }
    /**
     * The root nodes of a scene.
     */
    interface Scene {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The indices of each root node.
         */
        nodes?: number[];
    }
    /**
     * Joints and matrices defining a skin.
     */
    interface Skin {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.  The
         * default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind
         * matrices were pre-applied.
         */
        inverseBindMatrices?: number;
        /**
         * Indices of skeleton nodes, used as joints in this skin.
         */
        joints: number[];
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The index of the node used as a skeleton root.
         */
        skeleton?: number;
    }
    /**
     * A texture and its sampler.
     */
    interface Texture {
        extensions?: {
            [key: string]: {
                [key: string]: any;
            };
        };
        extras?: any;
        /**
         * The user-defined name of this object.
         */
        name?: string;
        /**
         * The index of the sampler used by this texture. When undefined, a sampler with repeat
         * wrapping and auto filtering should be used.
         */
        sampler?: number;
        /**
         * The index of the image used by this texture. When undefined, it is expected that an
         * extension or other mechanism will supply an alternate texture source, otherwise behavior
         * is undefined.
         */
        source?: number;
    }
}
