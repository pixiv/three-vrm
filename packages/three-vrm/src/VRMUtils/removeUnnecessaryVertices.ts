import * as THREE from 'three';
import { BufferAttribute } from 'three';

/**
 * Traverse given object and remove unnecessary vertices from every BufferGeometries.
 * This only processes buffer geometries with index buffer.
 *
 * Three.js creates morph textures for each geometries and it sometimes consumes unnecessary amount of VRAM for certain models.
 * This function will optimize geometries to reduce the size of morph texture.
 * See: https://github.com/mrdoob/three.js/issues/23095
 *
 * @param root Root object that will be traversed
 */
export function removeUnnecessaryVertices(root: THREE.Object3D): void {
  const geometryMap = new Map<THREE.BufferGeometry, THREE.BufferGeometry>();

  // Traverse an entire tree
  root.traverse((obj) => {
    if (!(obj as any).isMesh) {
      return;
    }

    const mesh = obj as THREE.Mesh;
    const geometry = mesh.geometry;

    // if the geometry does not have an index buffer it does not need to process
    const origianlIndex = geometry.index;
    if (origianlIndex == null) {
      return;
    }

    // skip already processed geometry
    const newGeometryAlreadyExisted = geometryMap.get(geometry);
    if (newGeometryAlreadyExisted != null) {
      mesh.geometry = newGeometryAlreadyExisted;
      return;
    }

    const newGeometry = new THREE.BufferGeometry();

    // copy various properties
    // Ref: https://github.com/mrdoob/three.js/blob/1a241ef10048770d56e06d6cd6a64c76cc720f95/src/core/BufferGeometry.js#L1011
    newGeometry.name = geometry.name;

    newGeometry.morphTargetsRelative = geometry.morphTargetsRelative;

    geometry.groups.forEach((group) => {
      newGeometry.addGroup(group.start, group.count, group.materialIndex);
    });

    newGeometry.boundingBox = geometry.boundingBox?.clone() ?? null;
    newGeometry.boundingSphere = geometry.boundingSphere?.clone() ?? null;

    newGeometry.setDrawRange(geometry.drawRange.start, geometry.drawRange.count);

    newGeometry.userData = geometry.userData;

    // set to geometryMap
    geometryMap.set(geometry, newGeometry);

    /** from original index to new index */
    const originalIndexNewIndexMap: number[] = [];

    /** from new index to original index */
    const newIndexOriginalIndexMap: number[] = [];

    // reorganize indices
    {
      const originalIndexArray = origianlIndex.array;
      const newIndexArray = new (originalIndexArray.constructor as any)(originalIndexArray.length);

      let indexHead = 0;

      for (let i = 0; i < originalIndexArray.length; i++) {
        const originalIndex = originalIndexArray[i];

        let newIndex = originalIndexNewIndexMap[originalIndex];
        if (newIndex == null) {
          originalIndexNewIndexMap[originalIndex] = indexHead;
          newIndexOriginalIndexMap[indexHead] = originalIndex;
          newIndex = indexHead;
          indexHead++;
        }
        newIndexArray[i] = newIndex;
      }

      newGeometry.setIndex(new BufferAttribute(newIndexArray, 1, false));
    }

    // reorganize attributes
    Object.keys(geometry.attributes).forEach((attributeName) => {
      const originalAttribute = geometry.attributes[attributeName] as THREE.BufferAttribute;

      if ((originalAttribute as any).isInterleavedBufferAttribute) {
        throw new Error('removeUnnecessaryVertices: InterleavedBufferAttribute is not supported');
      }

      const originalAttributeArray = originalAttribute.array;
      const { itemSize, normalized } = originalAttribute;

      const newAttributeArray = new (originalAttributeArray.constructor as any)(
        newIndexOriginalIndexMap.length * itemSize,
      );

      newIndexOriginalIndexMap.forEach((originalIndex, i) => {
        for (let j = 0; j < itemSize; j++) {
          newAttributeArray[i * itemSize + j] = originalAttributeArray[originalIndex * itemSize + j];
        }
      });

      newGeometry.setAttribute(attributeName, new BufferAttribute(newAttributeArray, itemSize, normalized));
    });

    // reorganize morph attributes
    /** True if all morphs are zero. */
    let isNullMorph = true;

    Object.keys(geometry.morphAttributes).forEach((attributeName) => {
      newGeometry.morphAttributes[attributeName] = [];

      const morphs = geometry.morphAttributes[attributeName];
      for (let iMorph = 0; iMorph < morphs.length; iMorph++) {
        const originalAttribute = morphs[iMorph] as THREE.BufferAttribute;

        if ((originalAttribute as any).isInterleavedBufferAttribute) {
          throw new Error('removeUnnecessaryVertices: InterleavedBufferAttribute is not supported');
        }

        const originalAttributeArray = originalAttribute.array;
        const { itemSize, normalized } = originalAttribute;

        const newAttributeArray = new (originalAttributeArray.constructor as any)(
          newIndexOriginalIndexMap.length * itemSize,
        );

        newIndexOriginalIndexMap.forEach((originalIndex, i) => {
          for (let j = 0; j < itemSize; j++) {
            newAttributeArray[i * itemSize + j] = originalAttributeArray[originalIndex * itemSize + j];
          }
        });

        isNullMorph = isNullMorph && newAttributeArray.every((v: number) => v === 0);

        newGeometry.morphAttributes[attributeName][iMorph] = new BufferAttribute(
          newAttributeArray,
          itemSize,
          normalized,
        );
      }
    });

    // If all morphs are zero, just discard the morph attributes we've just made
    if (isNullMorph) {
      newGeometry.morphAttributes = {};
    }

    mesh.geometry = newGeometry;
  });

  Array.from(geometryMap.keys()).forEach((originalGeometry) => {
    originalGeometry.dispose();
  });
}
