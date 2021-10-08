import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { gltfExtractPrimitivesFromNode } from '../utils/gltfExtractPrimitivesFromNode';
import { VRMExpression } from './VRMExpression';
import { VRMExpressionManager } from './VRMExpressionManager';
import { VRMExpressionMaterialColorBind } from './VRMExpressionMaterialColorBind';
import { VRMExpressionMorphTargetBind } from './VRMExpressionMorphTargetBind';
import { VRMExpressionPresetName } from './VRMExpressionPresetName';
import { VRMExpressionTextureTransformBind } from './VRMExpressionTextureTransformBind';

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
    // early abort if it doesn't use vrm
    const isVRMUsed = this.parser.json.extensionsUsed?.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRMCVRM | undefined = this.parser.json.extensions?.['VRMC_vrm'];
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (specVersion !== '1.0-beta') {
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
              return this.parser.associations.get(material)?.index === bind.material;
            });

            materials.forEach((material) => {
              expression.addBind(
                new VRMExpressionMaterialColorBind({
                  material,
                  type: bind.type,
                  targetValue: new THREE.Color().fromArray(bind.targetValue),
                }),
              );
            });
          });

          schemaExpression.textureTransformBinds?.forEach(async (bind) => {
            const materials = gltfMaterials.filter((material) => {
              return this.parser.associations.get(material)?.index === bind.material;
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
    // early abort if it doesn't use vrm
    const vrmExt: V0VRM.VRM | undefined = this.parser.json.extensions?.VRM;
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

        if (schemaGroup.binds) {
          schemaGroup.binds.forEach(async (bind) => {
            if (bind.mesh === undefined || bind.index === undefined) {
              return;
            }

            const nodesUsingMesh: number[] = [];
            (this.parser.json.nodes as any[]).forEach((node, i) => {
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

        const materialValues = schemaGroup.materialValues;
        if (materialValues && materialValues.length !== 0) {
          console.warn('Material binds of VRM 0.0 are not supported. Setup the model in VRM 1.0 and try again');
        }

        manager.registerExpression(expression);
      }),
    );

    return manager;
  }
}
