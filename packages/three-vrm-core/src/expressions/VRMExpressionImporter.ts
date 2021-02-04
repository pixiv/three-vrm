import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { gltfExtractPrimitivesFromNode } from '../utils/gltfExtractPrimitivesFromNode';
import { VRMExpression } from './VRMExpression';
import { VRMExpressionManager } from './VRMExpressionManager';
import type { VRMExpressionPreset } from './VRMExpressionPreset';

/**
 * An importer that imports a {@link VRMExpressionManager} from a VRM extension of a GLTF.
 */
export class VRMExpressionImporter {
  static readonly v0v1PresetNameMap: { [v0Name in V0VRM.BlendShapePresetName]: VRMExpressionPreset } = {
    unknown: 'custom',
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

  /**
   * Import a {@link VRMExpressionManager} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<VRMExpressionManager | null> {
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
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_vrm-1.0_draft') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRM | undefined = gltf.parser.json.extensions?.['VRMC_vrm-1.0_draft'];
    if (!extension) {
      return null;
    }

    const schemaExpressions = extension.expressions;
    if (!schemaExpressions) {
      return null;
    }

    const manager = new VRMExpressionManager();

    const blendShapePresetMap: { [presetName in VRMExpressionPreset]?: string } = {};

    await Promise.all(
      schemaExpressions.map(async (schemaExpression) => {
        const presetName = schemaExpression.preset;
        const name = schemaExpression.name;

        if (name === undefined && presetName === 'custom') {
          console.warn('One of custom expressions has no name');
          return;
        }

        const nameOrPresetName = name ?? presetName;

        if (presetName != null && presetName !== 'custom') {
          // duplication check
          if (blendShapePresetMap[presetName]) {
            console.warn(`An expression preset ${presetName} has duplicated entries`);
          } else {
            blendShapePresetMap[presetName] = nameOrPresetName;
          }
        }

        const expression = new VRMExpression(nameOrPresetName);
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
              `VRMBlendShapeImporter: ${schemaExpression.name} attempts to index ${morphTargetIndex}th morph but not found.`,
            );
            return;
          }

          expression.addMorphTargetBind({
            primitives,
            index: morphTargetIndex,
            weight: bind.weight ?? 1.0,
          });
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
              return gltf.parser.associations.get(material)?.index === bind.material;
            });

            materials.forEach((material) => {
              expression.addMaterialColorBind({
                material,
                type: bind.type,
                targetValue: new THREE.Color().fromArray(bind.targetValue),
              });
            });
          });

          schemaExpression.textureTransformBinds?.forEach(async (bind) => {
            const materials = gltfMaterials.filter((material) => {
              return gltf.parser.associations.get(material)?.index === bind.material;
            });

            materials.forEach((material) => {
              expression.addTextureTransformBind({
                material,
                offset: new THREE.Vector2().fromArray(bind.offset ?? [0.0, 0.0]),
                scaling: new THREE.Vector2().fromArray(bind.scaling ?? [1.0, 1.0]),
              });
            });
          });
        }

        manager.registerExpression(nameOrPresetName, presetName, expression);
      }),
    );

    return manager;
  }

  private async _v0Import(gltf: GLTF): Promise<VRMExpressionManager | null> {
    // early abort if it doesn't use vrm
    const vrmExt: V0VRM.VRM | undefined = gltf.parser.json.extensions?.VRM;
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

    const blendShapePresetMap: { [presetName in VRMExpressionPreset]?: string } = {};

    await Promise.all(
      schemaBlendShapeGroups.map(async (schemaGroup) => {
        const v0PresetName = schemaGroup.presetName;
        const v1PresetName = VRMExpressionImporter.v0v1PresetNameMap[v0PresetName ?? 'unknown'];
        const name = schemaGroup.name;

        if (name === undefined && v1PresetName === 'custom') {
          console.warn('One of custom expressions has no name');
          return;
        }

        const nameOrPresetName = name ?? v1PresetName;

        if (v1PresetName != null && v1PresetName !== 'custom') {
          // duplication check
          if (blendShapePresetMap[v1PresetName]) {
            console.warn(`An expression preset ${v0PresetName} has duplicated entries`);
          } else {
            blendShapePresetMap[v1PresetName] = nameOrPresetName;
          }
        }

        const expression = new VRMExpression(nameOrPresetName);
        gltf.scene.add(expression);

        expression.isBinary = schemaGroup.isBinary ?? false;
        // v0 doesn't have ignore properties

        if (schemaGroup.binds) {
          schemaGroup.binds.forEach(async (bind) => {
            if (bind.mesh === undefined || bind.index === undefined) {
              return;
            }

            const nodesUsingMesh: number[] = [];
            (gltf.parser.json.nodes as any[]).forEach((node, i) => {
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
                    `VRMBlendShapeImporter: ${schemaGroup.name} attempts to index ${morphTargetIndex}th morph but not found.`,
                  );
                  return;
                }

                expression.addMorphTargetBind({
                  primitives,
                  index: morphTargetIndex,
                  weight: 0.01 * (bind.weight ?? 100), // narrowing the range from [ 0.0 - 100.0 ] to [ 0.0 - 1.0 ]
                });
              }),
            );
          });
        }

        const materialValues = schemaGroup.materialValues;
        if (materialValues && materialValues.length !== 0) {
          console.warn('Material binds of VRM 0.0 are not supported. Setup the model in VRM 1.0 and try again');
        }

        manager.registerExpression(nameOrPresetName, v1PresetName, expression);
      }),
    );

    return manager;
  }
}
