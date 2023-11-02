import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gltfExtractPrimitivesFromNode } from '../utils/gltfExtractPrimitivesFromNode';
import { gltfGetAssociatedMaterialIndex } from '../utils/gltfGetAssociatedMaterialIndex';
import { VRMExpression } from './VRMExpression';
import { VRMExpressionManager } from './VRMExpressionManager';
import { v0ExpressionMaterialColorMap } from './VRMExpressionMaterialColorType';
import { VRMExpressionMaterialColorBind } from './VRMExpressionMaterialColorBind';
import { VRMExpressionMorphTargetBind } from './VRMExpressionMorphTargetBind';
import { VRMExpressionPresetName } from './VRMExpressionPresetName';
import { VRMExpressionTextureTransformBind } from './VRMExpressionTextureTransformBind';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

/**
 * A plugin of GLTFLoader that imports a {@link VRMExpressionManager} from a VRM extension of a GLTF.
 */
export class VRMExpressionLoaderPlugin implements GLTFLoaderPlugin {
  public static readonly v0v1PresetNameMap: { [v0Name in V0VRM.BlendShapePresetName]?: VRMExpressionPresetName } = {
    a: 'aa',
    e: 'ee',
    i: 'ih',
    o: 'oh',
    u: 'ou',
    blink: 'blink',
    joy: 'happy',
    angry: 'angry',
    sorrow: 'sad',
    fun: 'relaxed',
    lookup: 'lookUp',
    lookdown: 'lookDown',
    lookleft: 'lookLeft',
    lookright: 'lookRight',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    blink_l: 'blinkLeft',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    blink_r: 'blinkRight',
    neutral: 'neutral',
  };

  public readonly parser: GLTFParser;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMExpressionLoaderPlugin';
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    gltf.userData.vrmExpressionManager = await this._import(gltf);
  }

  /**
   * Import a {@link VRMExpressionManager} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  private async _import(gltf: GLTF): Promise<VRMExpressionManager | null> {
    const v1Result = await this._v1Import(gltf);
    if (v1Result) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf);
    if (v0Result) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(gltf: GLTF): Promise<VRMExpressionManager | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use vrm
    const isVRMUsed = json.extensionsUsed?.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension = json.extensions?.['VRMC_vrm'] as V1VRMSchema.VRMCVRM | undefined;
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
      console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
      return null;
    }

    const schemaExpressions = extension.expressions;
    if (!schemaExpressions) {
      return null;
    }

    // list expressions
    const presetNameSet = new Set<string>(Object.values(VRMExpressionPresetName));
    const nameSchemaExpressionMap = new Map<string, V1VRMSchema.Expression>();

    if (schemaExpressions.preset != null) {
      Object.entries(schemaExpressions.preset).forEach(([name, schemaExpression]) => {
        if (schemaExpression == null) {
          return;
        } // typescript

        if (!presetNameSet.has(name)) {
          console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${name}" detected. Ignoring the expression`);
          return;
        }

        nameSchemaExpressionMap.set(name, schemaExpression);
      });
    }

    if (schemaExpressions.custom != null) {
      Object.entries(schemaExpressions.custom).forEach(([name, schemaExpression]) => {
        if (presetNameSet.has(name)) {
          console.warn(
            `VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${name}". Ignoring the expression`,
          );
          return;
        }

        nameSchemaExpressionMap.set(name, schemaExpression);
      });
    }

    // prepare manager
    const manager = new VRMExpressionManager();

    // load expressions
    await Promise.all(
      Array.from(nameSchemaExpressionMap.entries()).map(async ([name, schemaExpression]) => {
        const expression = new VRMExpression(name);
        gltf.scene.add(expression);

        expression.isBinary = schemaExpression.isBinary ?? false;
        expression.overrideBlink = schemaExpression.overrideBlink ?? 'none';
        expression.overrideLookAt = schemaExpression.overrideLookAt ?? 'none';
        expression.overrideMouth = schemaExpression.overrideMouth ?? 'none';

        schemaExpression.morphTargetBinds?.forEach(async (bind) => {
          if (bind.node === undefined || bind.index === undefined) {
            return;
          }

          const primitives = (await gltfExtractPrimitivesFromNode(gltf, bind.node))!;
          const morphTargetIndex = bind.index;

          // check if the mesh has the target morph target
          if (
            !primitives.every(
              (primitive) =>
                Array.isArray(primitive.morphTargetInfluences) &&
                morphTargetIndex < primitive.morphTargetInfluences.length,
            )
          ) {
            console.warn(
              `VRMExpressionLoaderPlugin: ${schemaExpression.name} attempts to index morph #${morphTargetIndex} but not found.`,
            );
            return;
          }

          expression.addBind(
            new VRMExpressionMorphTargetBind({
              primitives,
              index: morphTargetIndex,
              weight: bind.weight ?? 1.0,
            }),
          );
        });

        if (schemaExpression.materialColorBinds || schemaExpression.textureTransformBinds) {
          // list up every material in `gltf.scene`
          const gltfMaterials: THREE.Material[] = [];
          gltf.scene.traverse((object) => {
            const material = (object as any).material as THREE.Material | undefined;
            if (material) {
              gltfMaterials.push(material);
            }
          });

          schemaExpression.materialColorBinds?.forEach(async (bind) => {
            const materials = gltfMaterials.filter((material) => {
              const materialIndex = gltfGetAssociatedMaterialIndex(this.parser, material);
              return bind.material === materialIndex;
            });

            materials.forEach((material) => {
              expression.addBind(
                new VRMExpressionMaterialColorBind({
                  material,
                  type: bind.type,
                  targetValue: new THREE.Color().fromArray(bind.targetValue),
                  targetAlpha: bind.targetValue[3],
                }),
              );
            });
          });

          schemaExpression.textureTransformBinds?.forEach(async (bind) => {
            const materials = gltfMaterials.filter((material) => {
              const materialIndex = gltfGetAssociatedMaterialIndex(this.parser, material);
              return bind.material === materialIndex;
            });

            materials.forEach((material) => {
              expression.addBind(
                new VRMExpressionTextureTransformBind({
                  material,
                  offset: new THREE.Vector2().fromArray(bind.offset ?? [0.0, 0.0]),
                  scale: new THREE.Vector2().fromArray(bind.scale ?? [1.0, 1.0]),
                }),
              );
            });
          });
        }

        manager.registerExpression(expression);
      }),
    );

    return manager;
  }

  private async _v0Import(gltf: GLTF): Promise<VRMExpressionManager | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use vrm
    const vrmExt = json.extensions?.VRM as V0VRM.VRM | undefined;
    if (!vrmExt) {
      return null;
    }

    const schemaBlendShape = vrmExt.blendShapeMaster;
    if (!schemaBlendShape) {
      return null;
    }

    const manager = new VRMExpressionManager();

    const schemaBlendShapeGroups = schemaBlendShape.blendShapeGroups;
    if (!schemaBlendShapeGroups) {
      return manager;
    }

    const blendShapeNameSet = new Set<string>();

    await Promise.all(
      schemaBlendShapeGroups.map(async (schemaGroup) => {
        const v0PresetName = schemaGroup.presetName;
        const v1PresetName =
          (v0PresetName != null && VRMExpressionLoaderPlugin.v0v1PresetNameMap[v0PresetName]) || null;
        const name = v1PresetName ?? schemaGroup.name;

        if (name == null) {
          console.warn('VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression');
          return;
        }

        // duplication check
        if (blendShapeNameSet.has(name)) {
          console.warn(
            `VRMExpressionLoaderPlugin: An expression preset ${v0PresetName} has duplicated entries. Ignoring the expression`,
          );
          return;
        }

        blendShapeNameSet.add(name);

        const expression = new VRMExpression(name);
        gltf.scene.add(expression);

        expression.isBinary = schemaGroup.isBinary ?? false;
        // v0 doesn't have ignore properties

        // Bind morphTarget
        if (schemaGroup.binds) {
          schemaGroup.binds.forEach(async (bind) => {
            if (bind.mesh === undefined || bind.index === undefined) {
              return;
            }

            const nodesUsingMesh: number[] = [];
            json.nodes?.forEach((node, i) => {
              if (node.mesh === bind.mesh) {
                nodesUsingMesh.push(i);
              }
            });

            const morphTargetIndex = bind.index;

            await Promise.all(
              nodesUsingMesh.map(async (nodeIndex) => {
                const primitives = (await gltfExtractPrimitivesFromNode(gltf, nodeIndex))!;

                // check if the mesh has the target morph target
                if (
                  !primitives.every(
                    (primitive) =>
                      Array.isArray(primitive.morphTargetInfluences) &&
                      morphTargetIndex < primitive.morphTargetInfluences.length,
                  )
                ) {
                  console.warn(
                    `VRMExpressionLoaderPlugin: ${schemaGroup.name} attempts to index ${morphTargetIndex}th morph but not found.`,
                  );
                  return;
                }

                expression.addBind(
                  new VRMExpressionMorphTargetBind({
                    primitives,
                    index: morphTargetIndex,
                    weight: 0.01 * (bind.weight ?? 100), // narrowing the range from [ 0.0 - 100.0 ] to [ 0.0 - 1.0 ]
                  }),
                );
              }),
            );
          });
        }

        // Bind MaterialColor and TextureTransform
        const materialValues = schemaGroup.materialValues;
        if (materialValues && materialValues.length !== 0) {
          materialValues.forEach((materialValue) => {
            if (
              materialValue.materialName === undefined ||
              materialValue.propertyName === undefined ||
              materialValue.targetValue === undefined
            ) {
              return;
            }

            /**
             * アバターのオブジェクトに設定されているマテリアルの内から
             * materialValueで指定されているマテリアルを集める。
             *
             * 特定には名前を使用する。
             * アウトライン描画用のマテリアルも同時に集める。
             */
            const materials: THREE.Material[] = [];
            gltf.scene.traverse((object) => {
              if ((object as any).material) {
                const material: THREE.Material[] | THREE.Material = (object as any).material;
                if (Array.isArray(material)) {
                  materials.push(
                    ...material.filter(
                      (mtl) =>
                        (mtl.name === materialValue.materialName! ||
                          mtl.name === materialValue.materialName! + ' (Outline)') &&
                        materials.indexOf(mtl) === -1,
                    ),
                  );
                } else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                  materials.push(material);
                }
              }
            });

            const materialPropertyName = materialValue.propertyName;
            materials.forEach((material) => {
              // TextureTransformBind
              if (materialPropertyName === '_MainTex_ST') {
                const scale = new THREE.Vector2(materialValue.targetValue![0], materialValue.targetValue![1]);
                const offset = new THREE.Vector2(materialValue.targetValue![2], materialValue.targetValue![3]);

                offset.y = 1.0 - offset.y - scale.y;

                expression.addBind(
                  new VRMExpressionTextureTransformBind({
                    material,
                    scale,
                    offset,
                  }),
                );

                return;
              }

              // MaterialColorBind
              const materialColorType = v0ExpressionMaterialColorMap[materialPropertyName];
              if (materialColorType) {
                expression.addBind(
                  new VRMExpressionMaterialColorBind({
                    material,
                    type: materialColorType,
                    targetValue: new THREE.Color().fromArray(materialValue.targetValue!),
                    targetAlpha: materialValue.targetValue![3],
                  }),
                );

                return;
              }

              console.warn(materialPropertyName + ' is not supported');
            });
          });
        }

        manager.registerExpression(expression);
      }),
    );

    return manager;
  }
}
