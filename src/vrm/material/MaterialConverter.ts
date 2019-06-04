import * as THREE from 'three';
import { GLTF } from '../types';
import { MToon, MToonOutlineWidthMode, MToonRenderMode } from './mtoon';
import { Unlit, UnlitRenderType } from './unlit';

export class MaterialConverter {

  private readonly _colorSpaceGamma : boolean

  private readonly _options: {
    requestEnvMap?: () => Promise<THREE.Texture | null>;
  }

  constructor(colorSpaceGamma:boolean, options: {requestEnvMap?: () => Promise<THREE.Texture | null>} = {}){
    this._colorSpaceGamma = colorSpaceGamma
    this._options = options
  }

  public convertGLTFMaterials(
    gltf: GLTF,
  ): Promise<GLTF> {
    return new Promise((resolve) => {
      const taskList: Array<Promise<any>> = [];

      gltf.scene.traverse((object: THREE.Object3D) => {
        if (!(object as any).isMesh) {
          return;
        }
        const mesh = object as THREE.Mesh;

        // shallow copy 'n' hard copy its groups, since we're gonna tweak mesh.geometry.groups
        // idk whether the process is required or not
        const geometry = new THREE.BufferGeometry();
        Object.assign(geometry, mesh.geometry);
        geometry.groups = geometry.groups.map((v) => v);
        mesh.geometry = geometry;

        // attach `material.applyUniforms` to `mesh.onBeforeRender`
        mesh.onBeforeRender = () => {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => {
              if ((material as any).applyUniforms) {
                (material as any).applyUniforms();
              }
            });
          } else {
            if ((mesh.material as any).applyUniforms) {
              (mesh.material as any).applyUniforms();
            }
          }
        };

        // convert material into array format, if it already is not
        if (!Array.isArray(mesh.material)) {
          mesh.material = [mesh.material];
          geometry.addGroup(0, geometry.index.count, 0);
        }
        const materials = mesh.material;

        materials
          .map((v) => v) // since we're gonna mutate the array
          .forEach((material, index) => {
            taskList.push(
              this.convertMaterial(material, gltf).then((newMaterial) => {
                // attach envMap
                if (this._options.requestEnvMap && (newMaterial as any).isMeshStandardMaterial) {
                  this._options.requestEnvMap().then((texture) => {
                    (newMaterial as any).envMap = texture;
                    newMaterial.needsUpdate = true;
                  });
                }

                // register a new material
                materials[index] = newMaterial;

                // let's do the outline trick
                const hasOutline =
                  newMaterial.hasOwnProperty('isVRMMToon') &&
                  (newMaterial as MToon).outlineWidthMode !== MToonOutlineWidthMode.None;

                if (hasOutline) {
                  // create a new outline material, then push into material list of the mesh
                  const outlineMaterial = newMaterial.clone();
                  outlineMaterial.name += ' (Outline)';
                  (outlineMaterial as MToon).isOutline = true;
                  materials.push(outlineMaterial);

                  // register new submeshes corresponds to previous outline material
                  const outlineMaterialIndex = materials.length - 1;
                  geometry.groups
                    .filter((group) => group.materialIndex === index)
                    .forEach((group) => {
                      geometry.addGroup(group.start, group.count, outlineMaterialIndex);
                    });
                }
              }),
            );
          });
      });

      Promise.all(taskList).then(() => {
        resolve(gltf);
      });
    });
  };

  public convertMaterialLegacy(material: THREE.MeshStandardMaterial, gltf: GLTF): Promise<THREE.Material>{
    return new Promise((resolve) => {
      const unlitAlt = new THREE.MeshBasicMaterial();
      THREE.Material.prototype.copy.call(unlitAlt, material);
      unlitAlt.color.copy(material.color);
      unlitAlt.map = material.map;
      unlitAlt.alphaTest = 0.5;
      unlitAlt.lights = false;
      unlitAlt.skinning = material.skinning;
      unlitAlt.morphTargets = material.morphTargets;
      resolve(unlitAlt);
    });
  };

  public convertMaterial(material: THREE.Material, gltf: GLTF): Promise<THREE.Material>{
    const materialProperties = gltf.userData.gltfExtensions.VRM.materialProperties;
    const vrmProps =
      material.userData.gltfIndex &&
      typeof material.userData.gltfIndex.materials === 'number' &&
      materialProperties[material.userData.gltfIndex.materials];
    if (!vrmProps) {
      console.warn('No materialProperty found in VRM, aborted');
      return Promise.resolve(material);
    }

    return new Promise<THREE.Material>((resolve) => {
      if (vrmProps.shader === 'VRM/MToon') {
        this.extractMaterialProperties(material, vrmProps, gltf).then((params) => {
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
          resolve(new MToon(this._colorSpaceGamma, params));
        });
      } else if (vrmProps.shader === 'VRM_USE_GLTFSHADER') {
        const newMaterial = this.convertGLTFMaterial(material.clone());
        resolve(newMaterial);
      } else if (vrmProps.shader === 'VRM/UnlitTexture') {
        // this is very legacy
        this.extractMaterialProperties(material, vrmProps, gltf).then((params) => {
          params.renderType = UnlitRenderType.Opaque;

          resolve(new Unlit(params));
        });
      } else if (vrmProps.shader === 'VRM/UnlitCutout') {
        // this is very legacy
        this.extractMaterialProperties(material, vrmProps, gltf).then((params) => {
          params.renderType = UnlitRenderType.Cutout;

          resolve(new Unlit(params));
        });
      } else if (vrmProps.shader === 'VRM/UnlitTransparent') {
        // this is very legacy
        this.extractMaterialProperties(material, vrmProps, gltf).then((params) => {
          params.renderType = UnlitRenderType.Transparent;

          resolve(new Unlit(params));
        });
      } else if (vrmProps.shader === 'VRM/UnlitTransparentZWrite') {
        // **however this is not legacy**
        this.extractMaterialProperties(material, vrmProps, gltf).then((params) => {
          params.renderType = UnlitRenderType.TransparentWithZWrite;

          resolve(new Unlit(params));
        });
      } else {
        // nope (incl. "Standard")
        console.warn(`Unknown shader detected: "${vrmProps.shader}"`);

        // presume as VRM_USE_GLTFSHADER
        const newMaterial = this.convertGLTFMaterial(material.clone());
        resolve(newMaterial);
      }
    }).then((newMaterial) => {
      newMaterial.name = material.name;
      newMaterial.userData = JSON.parse(JSON.stringify(material.userData));
      newMaterial.userData.vrmMaterialProperties = vrmProps;
      return newMaterial;
    });
  };

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
  };

  private convertGLTFMaterial (material: THREE.Material): THREE.Material {
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
  };

  private extractMaterialProperties (material: THREE.Material, vrmProps: any, gltf: GLTF): Promise<any> {
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
    if (vrmProps.keywordMap._ALPHATEST_ON && params.blendMode === MToonRenderMode.Opaque) {
      params.blendMode = MToonRenderMode.Cutout;
    }

    // set whether it needs skinning and morphing or not
    params.skinning = (material as any).skinning || false;
    params.morphTargets = (material as any).morphTargets || false;
    params.morphNormals = (material as any).morphNormals || false;

    return Promise.all(taskList).then(() => params);
  };
}