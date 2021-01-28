import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFSchema, VRMSchema } from '../types';
import { gltfExtractPrimitivesFromNode } from '../utils/gltfExtractPrimitivesFromNode';
import { renameMaterialProperty } from '../utils/renameMaterialProperty';
import { VRMBlendShapeGroup } from './VRMBlendShapeGroup';
import { VRMBlendShapeProxy } from './VRMBlendShapeProxy';

/**
 * An importer that imports a [[VRMBlendShape]] from a VRM extension of a GLTF.
 */
export class VRMBlendShapeImporter {
  /**
   * Import a [[VRMBlendShape]] from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<VRMBlendShapeProxy | null> {
    const vrmExt: VRMSchema.VRM | undefined = gltf.parser.json.extensions?.VRM;
    if (!vrmExt) {
      return null;
    }

    const schemaBlendShape: VRMSchema.BlendShape | undefined = vrmExt.blendShapeMaster;
    if (!schemaBlendShape) {
      return null;
    }

    const blendShape = new VRMBlendShapeProxy();

    const blendShapeGroups: VRMSchema.BlendShapeGroup[] | undefined = schemaBlendShape.blendShapeGroups;
    if (!blendShapeGroups) {
      return blendShape;
    }

    const blendShapePresetMap: { [presetName in VRMSchema.BlendShapePresetName]?: string } = {};

    await Promise.all(
      blendShapeGroups.map(async (schemaGroup) => {
        const name = schemaGroup.name;
        if (name === undefined) {
          console.warn('VRMBlendShapeImporter: One of blendShapeGroups has no name');
          return;
        }

        let presetName: VRMSchema.BlendShapePresetName | undefined;
        if (
          schemaGroup.presetName &&
          schemaGroup.presetName !== VRMSchema.BlendShapePresetName.Unknown &&
          !blendShapePresetMap[schemaGroup.presetName]
        ) {
          presetName = schemaGroup.presetName;
          blendShapePresetMap[schemaGroup.presetName] = name;
        }

        const group = new VRMBlendShapeGroup(name);
        gltf.scene.add(group);

        group.isBinary = schemaGroup.isBinary || false;

        if (schemaGroup.binds) {
          schemaGroup.binds.forEach(async (bind) => {
            if (bind.mesh === undefined || bind.index === undefined) {
              return;
            }

            const nodesUsingMesh: number[] = [];
            (gltf.parser.json.nodes as GLTFSchema.Node[]).forEach((node, i) => {
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

                group.addBind({
                  meshes: primitives,
                  morphTargetIndex,
                  weight: bind.weight ?? 100,
                });
              }),
            );
          });
        }

        const materialValues = schemaGroup.materialValues;
        if (materialValues) {
          materialValues.forEach((materialValue) => {
            if (
              materialValue.materialName === undefined ||
              materialValue.propertyName === undefined ||
              materialValue.targetValue === undefined
            ) {
              return;
            }

            const materials: THREE.Material[] = [];
            gltf.scene.traverse((object) => {
              if ((object as any).material) {
                const material: THREE.Material[] | THREE.Material = (object as any).material;
                if (Array.isArray(material)) {
                  materials.push(
                    ...material.filter(
                      (mtl) => mtl.name === materialValue.materialName! && materials.indexOf(mtl) === -1,
                    ),
                  );
                } else if (material.name === materialValue.materialName && materials.indexOf(material) === -1) {
                  materials.push(material);
                }
              }
            });

            materials.forEach((material) => {
              group.addMaterialValue({
                material,
                propertyName: renameMaterialProperty(materialValue.propertyName!),
                targetValue: materialValue.targetValue!,
              });
            });
          });
        }

        blendShape.registerBlendShapeGroup(name, presetName, group);
      }),
    );

    return blendShape;
  }
}
