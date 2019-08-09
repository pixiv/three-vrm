import * as THREE from 'three';
import { GLTFMesh, GLTFPrimitive, RawVrm, RawVrmMaterial } from '../types';
import { MToon, MToonOutlineWidthMode, MToonRenderMode } from './MToon';
import { Unlit, UnlitRenderType } from './Unlit';

export interface VRMMaterialImporterOptions {
  colorSpaceGamma?: boolean;
  requestEnvMap?: () => Promise<THREE.Texture | null>;
}

export class VRMMaterialImporter {
  private readonly _colorSpaceGamma: boolean;
  private readonly _requestEnvMap?: () => Promise<THREE.Texture | null>;

  constructor(options: VRMMaterialImporterOptions = {}) {
    this._colorSpaceGamma = options.colorSpaceGamma || true;
    this._requestEnvMap = options.requestEnvMap;
  }

  public async convertGLTFMaterials(gltf: THREE.GLTF): Promise<THREE.Material[]> {
    const meshesMap: GLTFMesh[] = await gltf.parser.getDependencies('mesh');
    const materialList: { [vrmMaterialIndex: number]: { surface: THREE.Material; outline?: THREE.Material } } = {};
    const materials: THREE.Material[] = []; // result

    await Promise.all(
      meshesMap.map(async (mesh, meshIndex) => {
        const primitives: GLTFPrimitive[] =
          mesh.type === 'Group' ? (mesh.children as GLTFPrimitive[]) : [mesh as GLTFPrimitive];
        await Promise.all(
          primitives.map(async (primitive, primitiveIndex) => {
            // if primitives material is not an array, make it an array
            if (!Array.isArray(primitive.material)) {
              primitive.material = [primitive.material];
              (primitive.geometry as THREE.BufferGeometry).addGroup(
                0,
                (primitive.geometry as THREE.BufferGeometry).index.count,
                0,
              );
            }

            // create / push to cache (or pop from cache) vrm materials
            const vrmMaterialIndex = gltf.parser.json.meshes![meshIndex].primitives[primitiveIndex].material!;

            let props = (gltf.parser.json.extensions!.VRM as RawVrm).materialProperties![vrmMaterialIndex];
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
            if (this._requestEnvMap) {
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
              (primitive.geometry as THREE.BufferGeometry).addGroup(
                0,
                (primitive.geometry as THREE.BufferGeometry).index.count,
                1,
              );
            }
          }),
        );
      }),
    );

    return materials;
  }

  public async createVRMMaterials(
    originalMaterial: THREE.Material,
    vrmProps: RawVrmMaterial,
    gltf: THREE.GLTF,
  ): Promise<{
    surface: THREE.Material;
    outline?: THREE.Material;
  }> {
    let newSurface: THREE.Material | undefined;
    let newOutline: THREE.Material | undefined;

    if (vrmProps.shader === 'VRM/MToon') {
      const params = await this.extractMaterialProperties(originalMaterial, vrmProps, gltf);

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
      newSurface = new MToon(this._colorSpaceGamma, params);

      // outline
      if (params.outlineWidthMode !== MToonOutlineWidthMode.None) {
        params.isOutline = true;
        newOutline = new MToon(this._colorSpaceGamma, params);
      }
    } else if (vrmProps.shader === 'VRM/UnlitTexture') {
      // this is very legacy
      const params = await this.extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = UnlitRenderType.Opaque;
      newSurface = new Unlit(params);
    } else if (vrmProps.shader === 'VRM/UnlitCutout') {
      // this is very legacy
      const params = await this.extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = UnlitRenderType.Cutout;
      newSurface = new Unlit(params);
    } else if (vrmProps.shader === 'VRM/UnlitTransparent') {
      // this is very legacy
      const params = await this.extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = UnlitRenderType.Transparent;
      newSurface = new Unlit(params);
    } else if (vrmProps.shader === 'VRM/UnlitTransparentZWrite') {
      // this is very legacy
      const params = await this.extractMaterialProperties(originalMaterial, vrmProps, gltf);
      params.renderType = UnlitRenderType.TransparentWithZWrite;
      newSurface = new Unlit(params);
    } else {
      if (vrmProps.shader !== 'VRM_USE_GLTFSHADER') {
        console.warn(`Unknown shader detected: "${vrmProps.shader}"`);
        // then presume as VRM_USE_GLTFSHADER
      }

      newSurface = this.convertGLTFMaterial(originalMaterial.clone());
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

  private renameMaterialProperty(name: string): string {
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

  private convertGLTFMaterial(material: THREE.Material): THREE.Material {
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
        (mtl as any).color.convertSRGBToLinear(); // TODO: `as any` is temporal, since there are no declaration in @types/three
        (mtl as any).emissive.convertSRGBToLinear(); // TODO: `as any` is temporal, since there are no declaration in @types/three
      }
    }

    if ((material as any).isMeshBasicMaterial) {
      const mtl = material as THREE.MeshBasicMaterial;

      if (this._colorSpaceGamma) {
        if (mtl.map) {
          mtl.map.encoding = THREE.LinearEncoding;
        }
      } else {
        (mtl as any).color.convertSRGBToLinear(); // TODO: `as any` is temporal, since there are no declaration in @types/three
      }
    }

    return material;
  }

  private extractMaterialProperties(
    originalMaterial: THREE.Material,
    vrmProps: RawVrmMaterial,
    gltf: THREE.GLTF,
  ): Promise<any> {
    const taskList: Array<Promise<any>> = [];
    const params: any = {};

    // extract texture properties
    if (vrmProps.textureProperties) {
      for (const name of Object.keys(vrmProps.textureProperties)) {
        const newName = this.renameMaterialProperty(name);
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
        const newName = this.renameMaterialProperty(name);
        params[newName] = vrmProps.floatProperties[name];
      }
    }

    // extract vector (color tbh) properties
    if (vrmProps.vectorProperties) {
      for (const name of Object.keys(vrmProps.vectorProperties)) {
        let newName = this.renameMaterialProperty(name);

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
    if (vrmProps.keywordMap!._ALPHATEST_ON && params.blendMode === MToonRenderMode.Opaque) {
      params.blendMode = MToonRenderMode.Cutout;
    }

    // set whether it needs skinning and morphing or not
    params.skinning = (originalMaterial as any).skinning || false;
    params.morphTargets = (originalMaterial as any).morphTargets || false;
    params.morphNormals = (originalMaterial as any).morphNormals || false;

    return Promise.all(taskList).then(() => params);
  }
}
