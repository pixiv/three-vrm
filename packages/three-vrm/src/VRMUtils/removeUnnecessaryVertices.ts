import * as THREE from 'three';
import { BufferAttribute } from 'three';

/**
 * Checks which vertices are used by the index attribute.
 * @param attributes Geometry attributes
 * @param originalIndex Original index attribute
 * @returns Vertex usage map and counts
 */
function checkIsVertexUsed(
  attributes: THREE.BufferGeometry['attributes'],
  originalIndex: THREE.BufferAttribute,
): {
  isVertexUsed: boolean[];
  vertexCount: number;
  verticesUsed: number;
} {
  // determine which vertices are used in the geometry
  const vertexCount = attributes.position.count;
  const isVertexUsed = new Array(vertexCount) as boolean[];
  let verticesUsed = 0;

  const originalIndexArray = originalIndex.array;
  for (let i = 0; i < originalIndexArray.length; i++) {
    const index = originalIndexArray[i];
    if (!isVertexUsed[index]) {
      isVertexUsed[index] = true;
      verticesUsed++;
    }
  }

  return { isVertexUsed, vertexCount, verticesUsed };
}

/**
 * Builds index maps from the vertex usage map.
 * @param isVertexUsed Vertex usage map
 * @returns Index maps
 */
function buildIndexMapsFromIsVertexUsed(isVertexUsed: boolean[]): {
  originalIndexNewIndexMap: number[];
  newIndexOriginalIndexMap: number[];
} {
  /** from original index to new index */
  const originalIndexNewIndexMap: number[] = [];

  /** from new index to original index */
  const newIndexOriginalIndexMap: number[] = [];

  // assign new indices
  let indexHead = 0;
  for (let i = 0; i < isVertexUsed.length; i++) {
    if (isVertexUsed[i]) {
      const newIndex = indexHead++;
      originalIndexNewIndexMap[i] = newIndex;
      newIndexOriginalIndexMap[newIndex] = i;
    }
  }

  return { originalIndexNewIndexMap, newIndexOriginalIndexMap };
}

/**
 * Copies geometry properties that are not part of attributes or indices.
 * @param source Source geometry
 * @param target Target geometry
 */
function copyGeometryProperties(source: THREE.BufferGeometry, target: THREE.BufferGeometry): void {
  // Ref: https://github.com/mrdoob/three.js/blob/1a241ef10048770d56e06d6cd6a64c76cc720f95/src/core/BufferGeometry.js#L1011
  target.name = source.name;

  target.morphTargetsRelative = source.morphTargetsRelative;

  source.groups.forEach((group) => {
    target.addGroup(group.start, group.count, group.materialIndex);
  });

  target.boundingBox = source.boundingBox?.clone() ?? null;
  target.boundingSphere = source.boundingSphere?.clone() ?? null;

  target.setDrawRange(source.drawRange.start, source.drawRange.count);

  target.userData = source.userData;
}

/**
 * Rebuilds index attribute based on the original-to-new index map.
 * @param newGeometry New geometry
 * @param originalIndex Original index attribute
 * @param originalIndexNewIndexMap Map from original index to new index
 */
function reorganizeIndexAttribute(
  newGeometry: THREE.BufferGeometry,
  originalIndex: THREE.BufferAttribute,
  originalIndexNewIndexMap: number[],
): void {
  const originalIndexArray = originalIndex.array;
  const newIndexArray = new (originalIndexArray.constructor as any)(originalIndexArray.length);

  for (let i = 0; i < originalIndexArray.length; i++) {
    const index = originalIndexArray[i];
    newIndexArray[i] = originalIndexNewIndexMap[index];
  }

  newGeometry.setIndex(new BufferAttribute(newIndexArray, originalIndex.itemSize, originalIndex.normalized));
}

/**
 * Copies typed array data by remapping indices.
 * @param originalArray Source array
 * @param newIndexOriginalIndexMap Map from new index to original index
 * @param stride Number of components per vertex in the array
 * @returns New array with remapped data
 */
function remapAttributeArray(
  originalArray: THREE.TypedArray,
  newIndexOriginalIndexMap: number[],
  stride: number,
): [THREE.TypedArray, isAllZero: boolean] {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const ArrayCtor = originalArray.constructor as THREE.TypedArrayConstructor;
  const newArray = new ArrayCtor(newIndexOriginalIndexMap.length * stride);

  let isAllZero = true;

  for (let i = 0; i < newIndexOriginalIndexMap.length; i++) {
    const originalIndex = newIndexOriginalIndexMap[i];
    const srcBase = originalIndex * stride;
    const dstBase = i * stride;
    for (let j = 0; j < stride; j++) {
      const v = originalArray[srcBase + j];
      newArray[dstBase + j] = v;
      isAllZero = isAllZero && v === 0;
    }
  }

  return [newArray, isAllZero];
}

type GeometryInterleavedEntry = [name: string, attribute: THREE.InterleavedBufferAttribute];
type GeometryNonInterleavedEntry = [name: string, attribute: THREE.BufferAttribute];

/**
 * Collects geometry attributes.
 * For interleaved attributes, group them if they share the same InterleavedBuffer.
 * For non-interleaved attributes, just collect them as is.
 * @param attributes Original geometry attributes
 * @returns Collected geometry attribute groups
 */
function collectGeometryAttributeGroups(
  attributes: THREE.BufferGeometry['attributes'],
): [
  interleavedBufferAttributeMap: Map<THREE.InterleavedBuffer, GeometryInterleavedEntry[]>,
  nonInterleavedAttributes: GeometryNonInterleavedEntry[],
] {
  const interleavedBufferAttributeMap = new Map<THREE.InterleavedBuffer, GeometryInterleavedEntry[]>();
  const nonInterleavedAttributes: GeometryNonInterleavedEntry[] = [];

  for (const [attributeName, originalAttribute] of Object.entries(attributes)) {
    if ((originalAttribute as any).isInterleavedBufferAttribute) {
      const interleavedAttribute = originalAttribute as THREE.InterleavedBufferAttribute;
      const interleavedBuffer = interleavedAttribute.data;
      const group = interleavedBufferAttributeMap.get(interleavedBuffer) ?? [];
      interleavedBufferAttributeMap.set(interleavedBuffer, group);
      group.push([attributeName, interleavedAttribute]);
    } else {
      const attribute = originalAttribute as THREE.BufferAttribute;
      nonInterleavedAttributes.push([attributeName, attribute]);
    }
  }

  return [interleavedBufferAttributeMap, nonInterleavedAttributes];
}

/**
 * Rebuilds all geometry attributes based on the new-to-original index map.
 * @param newGeometry New geometry
 * @param attributes Original geometry attributes
 * @param newIndexOriginalIndexMap Map from new index to original index
 */
function reorganizeGeometryAttributes(
  newGeometry: THREE.BufferGeometry,
  attributes: THREE.BufferGeometry['attributes'],
  newIndexOriginalIndexMap: number[],
): void {
  // collect interleaved and non-interleaved attributes
  const [interleavedBufferAttributeMap, nonInterleavedAttributes] = collectGeometryAttributeGroups(attributes);

  // process interleaved attributes
  for (const [interleavedBuffer, attributesInGroup] of interleavedBufferAttributeMap) {
    // rebuild interleaved buffer array
    const originalInterleavedBufferArray = interleavedBuffer.array;
    const { stride } = interleavedBuffer;
    const [newInterleavedArray, _] = remapAttributeArray(
      originalInterleavedBufferArray,
      newIndexOriginalIndexMap,
      stride,
    );

    // rebuild interleaved buffer
    const newInterleavedBuffer = new THREE.InterleavedBuffer(newInterleavedArray, stride);
    newInterleavedBuffer.setUsage(interleavedBuffer.usage);

    // rebuild interleaved buffer attributes
    for (const [attributeName, originalAttribute] of attributesInGroup) {
      const { itemSize, offset, normalized } = originalAttribute;
      const newAttribute = new THREE.InterleavedBufferAttribute(newInterleavedBuffer, itemSize, offset, normalized);
      newGeometry.setAttribute(attributeName, newAttribute);
    }
  }

  // process non-interleaved attributes
  for (const [attributeName, originalAttribute] of nonInterleavedAttributes) {
    // rebuild attribute array
    const originalAttributeArray = originalAttribute.array;
    const { itemSize, normalized } = originalAttribute;
    const [newAttributeArray, _] = remapAttributeArray(originalAttributeArray, newIndexOriginalIndexMap, itemSize);

    // rebuild buffer attribute
    newGeometry.setAttribute(attributeName, new BufferAttribute(newAttributeArray, itemSize, normalized));
  }
}

type MorphAttributeName = keyof THREE.BufferGeometry['morphAttributes'];
type MorphInterleavedEntry = [
  name: MorphAttributeName,
  morphIndex: number,
  attribute: THREE.InterleavedBufferAttribute,
];
type MorphNonInterleavedEntry = [name: MorphAttributeName, morphIndex: number, attribute: THREE.BufferAttribute];

/**
 * Collects morph attributes.
 * For interleaved attributes, group them if they share the same InterleavedBuffer.
 * For non-interleaved attributes, just collect them as is.
 * @param morphAttributes Original morph attributes
 * @returns Collected morph attribute groups
 */
function collectMorphAttributeGroups(
  morphAttributes: THREE.BufferGeometry['morphAttributes'],
): [
  interleavedBufferAttributeMap: Map<THREE.InterleavedBuffer, MorphInterleavedEntry[]>,
  nonInterleavedAttributes: MorphNonInterleavedEntry[],
] {
  const interleavedBufferAttributeMap = new Map<THREE.InterleavedBuffer, MorphInterleavedEntry[]>();
  const nonInterleavedAttributes: MorphNonInterleavedEntry[] = [];

  for (const [key, attributes] of Object.entries(morphAttributes)) {
    const attributeName = key as MorphAttributeName;
    for (let iMorph = 0; iMorph < attributes.length; iMorph++) {
      const originalAttribute = attributes[iMorph] as THREE.BufferAttribute | THREE.InterleavedBufferAttribute;

      if ((originalAttribute as any).isInterleavedBufferAttribute) {
        const interleavedAttribute = originalAttribute as THREE.InterleavedBufferAttribute;
        const interleavedBuffer = interleavedAttribute.data;
        const group = interleavedBufferAttributeMap.get(interleavedBuffer) ?? [];
        interleavedBufferAttributeMap.set(interleavedBuffer, group);
        group.push([attributeName, iMorph, interleavedAttribute]);
      } else {
        const attribute = originalAttribute as THREE.BufferAttribute;
        nonInterleavedAttributes.push([attributeName, iMorph, attribute]);
      }
    }
  }

  return [interleavedBufferAttributeMap, nonInterleavedAttributes];
}

/**
 * Rebuilds morph attributes based on the new-to-original index map.
 * If all relative morph deltas are zero, the morph attributes will be discarded.
 * @param newGeometry New geometry
 * @param morphAttributes Original morph attributes
 * @param newIndexOriginalIndexMap Map from new index to original index
 */
function reorganizeMorphAttributes(
  newGeometry: THREE.BufferGeometry,
  morphAttributes: THREE.BufferGeometry['morphAttributes'],
  newIndexOriginalIndexMap: number[],
): void {
  /** True if all morph attribute values are zero */
  let allMorphsAreZero = true;

  // collect interleaved and non-interleaved morph attributes
  const [interleavedBufferAttributeMap, nonInterleavedAttributes] = collectMorphAttributeGroups(morphAttributes);

  const newMorphAttributes: THREE.BufferGeometry['morphAttributes'] = {};

  // process interleaved morph attributes
  for (const [interleavedBuffer, attributesInGroup] of interleavedBufferAttributeMap) {
    // rebuild interleaved buffer array
    const originalInterleavedBufferArray = interleavedBuffer.array;
    const { stride } = interleavedBuffer;
    const [newInterleavedArray, isAllZero] = remapAttributeArray(
      originalInterleavedBufferArray,
      newIndexOriginalIndexMap,
      stride,
    );
    allMorphsAreZero = allMorphsAreZero && isAllZero;

    // rebuild interleaved buffer
    const newInterleavedBuffer = new THREE.InterleavedBuffer(newInterleavedArray, stride);
    newInterleavedBuffer.setUsage(interleavedBuffer.usage);

    // rebuild interleaved buffer attributes
    for (const [attributeName, morphIndex, attribute] of attributesInGroup) {
      const { itemSize, offset, normalized } = attribute as THREE.InterleavedBufferAttribute;
      const newAttribute = new THREE.InterleavedBufferAttribute(newInterleavedBuffer, itemSize, offset, normalized);
      newMorphAttributes[attributeName] ??= [];
      newMorphAttributes[attributeName][morphIndex] = newAttribute;
    }
  }

  // process non-interleaved morph attributes
  for (const [attributeName, morphIndex, attribute] of nonInterleavedAttributes) {
    const originalAttribute = attribute as THREE.BufferAttribute;
    const originalAttributeArray = originalAttribute.array;
    const { itemSize, normalized } = originalAttribute;
    const [newAttributeArray, isAllZero] = remapAttributeArray(
      originalAttributeArray,
      newIndexOriginalIndexMap,
      itemSize,
    );
    allMorphsAreZero = allMorphsAreZero && isAllZero;

    newMorphAttributes[attributeName] ??= [];
    newMorphAttributes[attributeName][morphIndex] = new BufferAttribute(newAttributeArray, itemSize, normalized);
  }

  // Zero absolute targets still move vertices to the origin.
  const discardMorphs = newGeometry.morphTargetsRelative && allMorphsAreZero;
  newGeometry.morphAttributes = discardMorphs ? {} : newMorphAttributes;
}

/**
 * Traverse given object and remove unnecessary vertices from every BufferGeometries.
 * This only processes buffer geometries with index buffer.
 *
 * Certain models have vertices that are not used by any faces.
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

    // if the geometry does not have an index buffer it does not need to be processed
    const originalIndex = geometry.index;
    if (originalIndex == null) {
      return;
    }

    // if the geometry has already been processed, reuse it
    const newGeometryAlreadyExisted = geometryMap.get(geometry);
    if (newGeometryAlreadyExisted != null) {
      mesh.geometry = newGeometryAlreadyExisted;
      return;
    }

    // check which vertices are used
    const { isVertexUsed, vertexCount, verticesUsed } = checkIsVertexUsed(geometry.attributes, originalIndex);

    // if all vertices are used, do nothing
    if (verticesUsed === vertexCount) {
      return;
    }

    // build index maps
    const { originalIndexNewIndexMap, newIndexOriginalIndexMap } = buildIndexMapsFromIsVertexUsed(isVertexUsed);

    // this is the new geometry we will build
    const newGeometry = new THREE.BufferGeometry();
    copyGeometryProperties(geometry, newGeometry);

    // set to geometryMap for later reuse
    geometryMap.set(geometry, newGeometry);

    // reorganize indices and attributes
    reorganizeIndexAttribute(newGeometry, originalIndex, originalIndexNewIndexMap);
    reorganizeGeometryAttributes(newGeometry, geometry.attributes, newIndexOriginalIndexMap);
    reorganizeMorphAttributes(newGeometry, geometry.morphAttributes, newIndexOriginalIndexMap);

    // finally, set the new geometry to the mesh
    mesh.geometry = newGeometry;
  });

  Array.from(geometryMap.keys()).forEach((originalGeometry) => {
    originalGeometry.dispose();
  });
}
