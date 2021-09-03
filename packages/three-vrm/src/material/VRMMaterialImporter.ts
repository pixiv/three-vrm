import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFSchema, VRMSchema } from '../types';
import { gltfExtractPrimitivesFromNodes } from '../utils/gltfExtractPrimitivesFromNode';
import { MToonMaterial, MToonMaterialOutlineWidthMode } from './MToonMaterial';
import { VRMUnlitMaterial, VRMUnlitMaterialRenderType } from './VRMUnlitMaterial';

/**
 * Options for a [[VRMMaterialImporter]] instance.
 */
export interface VRMMaterialImporterOptions {
  /**
   * Specify the encoding of input uniform colors and textures.
   *
   * When your `renderer.outputEncoding` is `THREE.LinearEncoding`, use `THREE.LinearEncoding`.
   * When your `renderer.outputEncoding` is `THREE.sRGBEncoding`, use `THREE.sRGBEncoding`.
   *
   * The importer will use `THREE.LinearEncoding` if this option isn't specified.
   *
   * See also: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.outputEncoding
   */
  encoding?: THREE.TextureEncoding;

  /**
   * A function that returns a `Promise` of environment map texture.
   * The importer will attempt to call this function when it have to use an envmap.
   */
  requestEnvMap?: () => Promise<THREE.Texture | null>;
}

/**
 * An importer that imports VRM materials from a VRM extension of a GLTF.
 */
export class VRMMaterialImporter {
  private readonly _encoding: THREE.TextureEncoding;
  private readonly _requestEnvMap?: () => Promise<THREE.Texture | null>;

  /**
   * Create a new VRMMaterialImporter.
   *
   * @param options Options of the VRMMaterialImporter
   */
  constructor(options: VRMMaterialImporterOptions = {}) {
    this._encoding = options.encoding ?? THREE.LinearEncoding;
    if (this._encoding !== THREE.LinearEncoding && this._encoding !== THREE.sRGBEncoding) {
      console.warn(
        'The specified color encoding might not work properly with VRMMaterialImporter. You might want to use THREE.sRGBEncoding instead.',
      );
    }

    this._requestEnvMap = options.requestEnvMap;
  }

  /**
   * Convert all the materials of given GLTF based on VRM extension field `materialProperties`.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async convertGLTFMaterials(gltf: GLTF): Promise<THREE.Material[] | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const materialProperties: VRMSchema.Material[] | undefined = vrmExt.materialProperties;
    if (!materialProperties) {
      return null;
    }

    const nodePrimitivesMap = await gltfExtractPrimitivesFromNodes(gltf);
    const materialIndexMaterialsMap = new Map<number, { surface: THREE.Material; outline?: THREE.Material }>();
    const materials: THREE.Material[] = []; // result

    await Promise.all(
      Array.from(nodePrimitivesMap.entries()).map(async ([nodeIndex, primitives]) => {
        const schemaNode: GLTFSchema.Node = gltf.parser.json.nodes[nodeIndex];
        const schemaMesh: GLTFSchema.Mesh = gltf.parser.json.meshes[schemaNode.mesh!];

        await Promise.all(
          primitives.map(async (primitive, primitiveIndex) => {
            const schemaPrimitive = schemaMesh.primitives[primitiveIndex];

            const primitiveGeometry = primitive.geometry;
            const primitiveVertices = primitiveGeometry.index
              ? primitiveGeometry.index.count
              : primitiveGeometry.attributes.position.count / 3;

            // if primitives material is not an array, make it an array
            if (!Array.isArray(primitive.material)) {
              primitive.material = [primitive.material];
              primitiveGeometry.addGroup(0, primitiveVertices, 0);
            }

            // create / push to cache (or pop from cache) vrm materials
            const vrmMaterialIndex = schemaPrimitive.material!;

            let props = materialProperties[vrmMaterialIndex] as VRMSchema.Material | undefined;
            if (props == null) {
              console.warn(
                `VRMMaterialImporter: There are no material definition for material #${vrmMaterialIndex} on VRM extension.`,
              );
              props = { shader: 'VRM_USE_GLTFSHADER' }; // fallback
            }

            let vrmMaterials: { surface: THREE.Material; outline?: THREE.Material };
            const vrmMaterialsAlreadyLoaded = materialIndexMaterialsMap.get(vrmMaterialIndex);
            if (vrmMaterialsAlreadyLoaded != null) {
              vrmMaterials = vrmMaterialsAlreadyLoaded;
            } else {
              vrmMaterials = await this.createVRMMaterials(primitive.material[0], props, gltf);
              materialIndexMaterialsMap.set(vrmMaterialIndex, vrmMaterials);

              materials.push(vrmMaterials.surface);
              if (vrmMaterials.outline) {
                materials.push(vrmMaterials.outline);
              }
            }

            // surface
            primitive.material[0] = vrmMaterials.surface;

            // envmap
            if (this._requestEnvMap && (vrmMaterials.surface as any).isMeshStandardMaterial) {
              this._requestEnvMap().then((envMap) => {
                (vrmMaterials.surface as any).envMap = envMap;
                vrmMaterials.surface.needsUpdate = true;
              });
            }

            // render order
            primitive.renderOrder = props.renderQueue ?? 2000;

            // outline ("2 pass shading using groups" trick here)
            if (vrmMaterials.outline) {
              primitive.material[1] = vrmMaterials.outline;
              primitiveGeometry.addGroup(0, primitiveVertices, 1);
            }
          }),
        );
      }),
    );

    return materials;
  }

  public async createVRMMaterials(
    originalMaterial: THREE.Material,
    vrmProps: VRMSchema.Material,
    gltf: GLTF,
  ): Promise<{
    surface: THREE.Material;
    outline?: THREE.Material;
  }> {
    let newSurface: THREE.Material | undefined;
    let newOutline: THREE.Material | undefined;

    if (vrmProps.shader === 'VRM/MToon') {
      const params = await this._extractMaterialProperties(originalMaterial, vrmProps, gltf);

      // we need to get rid of these properties
      ['srcBlend', 'dstBlend', 'isFirstSetup'].forEach((name) => {
        if (params[name] !== undefined) {
          delete params[name];
        }
      });

      // these textures must be sRGB Encoding, depends on current colorspace
      ['mainTex', 'shadeTexture', 'emissionMap', 'sphereAdd', 'rimTexture'].forEach((name) => {
        if (params[name] !== undefined) {
          params[name].encoding = this._encoding;
        }
      });

      // specify uniform color encodings
      params.encoding = this._encoding;

      // done
      newSurface = new MToonMaterial(params);

      // outline
      if (params.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
        params.isOutline = true;
        newOutline = new MToonMaterial(params);
      }
    } else if (vrmProps.shader === 'VRM/UnlitTexture') {
      // this is very legacy
      const params = await this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = VRMUnlitMaterialRenderType.Opaque;
      newSurface = new VRMUnlitMaterial(params);
    } else if (vrmProps.shader === 'VRM/UnlitCutout') {
      // this is very legacy
      const params = await this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = VRMUnlitMaterialRenderType.Cutout;
      newSurface = new VRMUnlitMaterial(params);
    } else if (vrmProps.shader === 'VRM/UnlitTransparent') {
      // this is very legacy
      const params = await this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = VRMUnlitMaterialRenderType.Transparent;
      newSurface = new VRMUnlitMaterial(params);
    } else if (vrmProps.shader === 'VRM/UnlitTransparentZWrite') {
      // this is very legacy
      const params = await this._extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = VRMUnlitMaterialRenderType.TransparentWithZWrite;
      newSurface = new VRMUnlitMaterial(params);
    } else {
      if (vrmProps.shader !== 'VRM_USE_GLTFSHADER') {
        console.warn(`Unknown shader detected: "${vrmProps.shader}"`);
        // then presume as VRM_USE_GLTFSHADER
      }

      newSurface = this._convertGLTFMaterial(originalMaterial.clone());
    }

    newSurface.name = originalMaterial.name;
    newSurface.userData = JSON.parse(JSON.stringify(originalMaterial.userData));
    newSurface.userData.vrmMaterialProperties = vrmProps;

    if (newOutline) {
      newOutline.name = originalMaterial.name + ' (Outline)';
      newOutline.userData = JSON.parse(JSON.stringify(originalMaterial.userData));
      newOutline.userData.vrmMaterialProperties = vrmProps;
    }

    return {
      surface: newSurface,
      outline: newOutline,
    };
  }

  private _renameMaterialProperty(name: string): string {
    if (name[0] !== '_') {
      console.warn(`VRMMaterials: Given property name "${name}" might be invalid`);
      return name;
    }
    name = name.substring(1);

    if (!/[A-Z]/.test(name[0])) {
      console.warn(`VRMMaterials: Given property name "${name}" might be invalid`);
      return name;
    }
    return name[0].toLowerCase() + name.substring(1);
  }

  private _convertGLTFMaterial(material: THREE.Material): THREE.Material {
    if ((material as any).isMeshStandardMaterial) {
      const mtl = material as THREE.MeshStandardMaterial;

      if (mtl.map) {
        mtl.map.encoding = this._encoding;
      }
      if (mtl.emissiveMap) {
        mtl.emissiveMap.encoding = this._encoding;
      }

      if (this._encoding === THREE.LinearEncoding) {
        mtl.color.convertLinearToSRGB();
        mtl.emissive.convertLinearToSRGB();
      }
    }

    if ((material as any).isMeshBasicMaterial) {
      const mtl = material as THREE.MeshBasicMaterial;

      if (mtl.map) {
        mtl.map.encoding = this._encoding;
      }

      if (this._encoding === THREE.LinearEncoding) {
        mtl.color.convertLinearToSRGB();
      }
    }

    return material;
  }

  private _extractMaterialProperties(
    originalMaterial: THREE.Material,
    vrmProps: VRMSchema.Material,
    gltf: GLTF,
  ): Promise<any> {
    const taskList: Array<Promise<any>> = [];
    const params: any = {};

    // extract texture properties
    if (vrmProps.textureProperties) {
      for (const name of Object.keys(vrmProps.textureProperties)) {
        const newName = this._renameMaterialProperty(name);
        const textureIndex = vrmProps.textureProperties[name];

        taskList.push(
          gltf.parser.getDependency('texture', textureIndex).then((texture: THREE.Texture) => {
            params[newName] = texture;
          }),
        );
      }
    }

    // extract float properties
    if (vrmProps.floatProperties) {
      for (const name of Object.keys(vrmProps.floatProperties)) {
        const newName = this._renameMaterialProperty(name);
        params[newName] = vrmProps.floatProperties[name];
      }
    }

    // extract vector (color tbh) properties
    if (vrmProps.vectorProperties) {
      for (const name of Object.keys(vrmProps.vectorProperties)) {
        let newName = this._renameMaterialProperty(name);

        // if this is textureST (same name as texture name itself), add '_ST'
        const isTextureST = [
          '_MainTex',
          '_ShadeTexture',
          '_BumpMap',
          '_ReceiveShadowTexture',
          '_ShadingGradeTexture',
          '_RimTexture',
          '_SphereAdd',
          '_EmissionMap',
          '_OutlineWidthTexture',
          '_UvAnimMaskTexture',
        ].some((textureName) => name === textureName);
        if (isTextureST) {
          newName += '_ST';
        }

        params[newName] = new THREE.Vector4(...vrmProps.vectorProperties[name]);
      }
    }

    // set whether it needs skinning and morphing or not
    params.skinning = (originalMaterial as any).skinning || false;
    params.morphTargets = (originalMaterial as any).morphTargets || false;
    params.morphNormals = (originalMaterial as any).morphNormals || false;

    return Promise.all(taskList).then(() => params);
  }
}
