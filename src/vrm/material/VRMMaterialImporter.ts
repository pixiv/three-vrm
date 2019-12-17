import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFMesh, GLTFPrimitive, VRMSchema } from '../types';
import { MToonMaterial, MToonMaterialOutlineWidthMode, MToonMaterialRenderMode } from './MToonMaterial';
import { VRMUnlitMaterial, VRMUnlitMaterialRenderType } from './VRMUnlitMaterial';

/**
 * Options for a [[VRMMaterialImporter]] instance.
 */
export interface VRMMaterialImporterOptions {
  /**
   * Whether the workflow should be linear or gamma.
   *
   * See also: https://threejs.org/docs/#api/en/renderers/WebGLRenderer.gammaOutput
   */
  colorSpaceGamma?: boolean;

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
  private readonly _colorSpaceGamma: boolean;
  private readonly _requestEnvMap?: () => Promise<THREE.Texture | null>;

  /**
   * Create a new VRMMaterialImporter.
   *
   * @param options Options of the VRMMaterialImporter
   */
  constructor(options: VRMMaterialImporterOptions = {}) {
    this._colorSpaceGamma = options.colorSpaceGamma || true;
    this._requestEnvMap = options.requestEnvMap;
  }

  /**
   * Convert all the materials of given GLTF based on VRM extension field `materialProperties`.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async convertGLTFMaterials(gltf: GLTF): Promise<THREE.Material[] | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions && gltf.parser.json.extensions.VRM;
    if (!vrmExt) {
      return null;
    }

    const materialProperties: VRMSchema.Material[] | undefined = vrmExt.materialProperties;
    if (!materialProperties) {
      return null;
    }

    const meshesMap: GLTFMesh[] = await gltf.parser.getDependencies('mesh');
    const materialList: { [vrmMaterialIndex: number]: { surface: THREE.Material; outline?: THREE.Material } } = {};
    const materials: THREE.Material[] = []; // result

    await Promise.all(
      meshesMap.map(async (mesh, meshIndex) => {
        const primitives: GLTFPrimitive[] =
          mesh.type === 'Group' ? (mesh.children as GLTFPrimitive[]) : [mesh as GLTFPrimitive];
        await Promise.all(
          primitives.map(async (primitive, primitiveIndex) => {
            const primitiveGeometry = primitive.geometry as THREE.BufferGeometry;
            const primitiveVertices = primitiveGeometry.index
              ? primitiveGeometry.index.count
              : primitiveGeometry.attributes.position.count / 3;

            // if primitives material is not an array, make it an array
            if (!Array.isArray(primitive.material)) {
              primitive.material = [primitive.material];
              primitiveGeometry.addGroup(0, primitiveVertices, 0);
            }

            // create / push to cache (or pop from cache) vrm materials
            const vrmMaterialIndex = gltf.parser.json.meshes![meshIndex].primitives[primitiveIndex].material!;

            let props = materialProperties[vrmMaterialIndex];
            if (!props) {
              console.warn(
                `VRMMaterialImporter: There are no material definition for material #${vrmMaterialIndex} on VRM extension.`,
              );
              props = { shader: 'VRM_USE_GLTFSHADER' }; // fallback
            }

            let vrmMaterials: { surface: THREE.Material; outline?: THREE.Material };
            if (materialList[vrmMaterialIndex]) {
              vrmMaterials = materialList[vrmMaterialIndex];
            } else {
              vrmMaterials = await this.createVRMMaterials(primitive.material[0], props, gltf);
              materialList[vrmMaterialIndex] = vrmMaterials;

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
            primitive.renderOrder = props.renderQueue || 2000;

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
      ['mainTex', 'shadeTexture', 'emission', 'sphereAdd'].forEach((name) => {
        if (params[name] !== undefined) {
          params[name].encoding = this._colorSpaceGamma ? THREE.LinearEncoding : THREE.sRGBEncoding;
        }
      });

      // done
      newSurface = new MToonMaterial(this._colorSpaceGamma, params);

      // outline
      if (params.outlineWidthMode !== MToonMaterialOutlineWidthMode.None) {
        params.isOutline = true;
        newOutline = new MToonMaterial(this._colorSpaceGamma, params);
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

      if (this._colorSpaceGamma) {
        if (mtl.map) {
          mtl.map.encoding = THREE.LinearEncoding;
        }
        if (mtl.emissiveMap) {
          mtl.emissiveMap.encoding = THREE.LinearEncoding;
        }
      } else {
        mtl.color.convertSRGBToLinear();
        mtl.emissive.convertSRGBToLinear();
      }
    }

    if ((material as any).isMeshBasicMaterial) {
      const mtl = material as THREE.MeshBasicMaterial;

      if (this._colorSpaceGamma) {
        if (mtl.map) {
          mtl.map.encoding = THREE.LinearEncoding;
        }
      } else {
        mtl.color.convertSRGBToLinear();
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
        // this is my most favorite MToon feature tbh
        const isTextureST = [
          '_MainTex',
          '_ShadeTexture',
          '_BumpMap',
          '_ReceiveShadowTexture',
          '_ShadingGradeTexture',
          '_SphereAdd',
          '_EmissionMap',
          '_OutlineWidthTexture',
        ].some((textureName) => name === textureName);
        if (isTextureST) {
          newName += '_ST';
        }

        params[newName] = new THREE.Vector4(...vrmProps.vectorProperties[name]);
      }
    }

    // TODO: f (https://github.com/dwango/UniVRM/issues/172)
    if (vrmProps.keywordMap!._ALPHATEST_ON && params.blendMode === MToonMaterialRenderMode.Opaque) {
      params.blendMode = MToonMaterialRenderMode.Cutout;
    }

    // set whether it needs skinning and morphing or not
    params.skinning = (originalMaterial as any).skinning || false;
    params.morphTargets = (originalMaterial as any).morphTargets || false;
    params.morphNormals = (originalMaterial as any).morphNormals || false;

    return Promise.all(taskList).then(() => params);
  }
}
