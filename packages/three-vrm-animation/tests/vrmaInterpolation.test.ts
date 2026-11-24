import * as THREE from 'three';
import {
  VRMExpression,
  VRMExpressionManager,
  VRMHumanoid,
  VRMHumanBoneParentMap,
  VRMRequiredHumanBoneName,
} from '@pixiv/three-vrm-core';
import type { VRMHumanBoneName, VRMHumanBones } from '@pixiv/three-vrm-core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { describe, expect, it } from 'vitest';
import { createVRMAnimationExpressionTracks, createVRMAnimationHumanoidTracks, VRMAnimationLoaderPlugin } from '../src';
import type { VRMAnimation } from '../src';

type Interpolation = 'STEP' | 'LINEAR' | 'CUBICSPLINE';

function createGlb(json: object, binary: Float32Array): ArrayBuffer {
  const jsonBytes = new TextEncoder().encode(JSON.stringify(json));
  const jsonLength = (jsonBytes.length + 3) & ~3;
  const glb = new ArrayBuffer(28 + jsonLength + binary.byteLength);
  const header = new DataView(glb);
  header.setUint32(0, 0x46546c67, true); // glTF
  header.setUint32(4, 2, true);
  header.setUint32(8, glb.byteLength, true);
  header.setUint32(12, jsonLength, true);
  header.setUint32(16, 0x4e4f534a, true); // JSON
  const jsonChunk = new Uint8Array(glb, 20, jsonLength);
  jsonChunk.fill(0x20);
  jsonChunk.set(jsonBytes);
  header.setUint32(20 + jsonLength, binary.byteLength, true);
  header.setUint32(24 + jsonLength, 0x004e4942, true); // BIN
  new Float32Array(glb, 28 + jsonLength).set(binary);
  return glb;
}

async function loadAnimation(interpolation: Interpolation): Promise<VRMAnimation> {
  const boneNames = Object.values(VRMRequiredHumanBoneName);
  const boneIndices = new Map<VRMHumanBoneName, number>(boneNames.map((name, index) => [name, index]));
  const nodes = [...boneNames, 'expression'].map((name) => ({
    name,
    children: [] as number[],
    translation: name === 'hips' ? [0, 1, 0] : [0, 0, 0],
  }));
  boneNames.forEach((name, index) => {
    let parent = VRMHumanBoneParentMap[name];
    while (parent != null && !boneIndices.has(parent)) {
      parent = VRMHumanBoneParentMap[parent];
    }
    if (parent != null) {
      nodes[boneIndices.get(parent)!].children.push(index);
    }
  });

  const expressionIndex = boneNames.length;
  const times = [0, 1];
  const expressions =
    interpolation === 'CUBICSPLINE'
      ? [0, 0, 0, 0.2, 1, 2, 1, 3, 4, 0, 0, 0, 0.8, 5, 6, 0, 0, 0]
      : [0.2, 1, 2, 0.8, 5, 6];
  const rotations =
    interpolation === 'CUBICSPLINE'
      ? [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
      : [0, 0, 0, 1, 0, 0, 1, 0];
  const binary = new Float32Array([...times, ...expressions, ...rotations]);
  const extensionName = 'VRMC_vrm_animation';
  const json = {
    asset: { version: '2.0' },
    scene: 0,
    scenes: [{ nodes: [boneIndices.get('hips'), expressionIndex] }],
    nodes,
    extensionsUsed: [extensionName],
    extensions: {
      [extensionName]: {
        specVersion: '1.0',
        humanoid: { humanBones: Object.fromEntries(boneNames.map((name, node) => [name, { node }])) },
        expressions: { preset: { happy: { node: expressionIndex } } },
      },
    },
    animations: [
      {
        channels: [
          { sampler: 0, target: { node: expressionIndex, path: 'translation' } },
          { sampler: 1, target: { node: boneIndices.get('hips'), path: 'rotation' } },
        ],
        samplers: [1, 2].map((output) => ({ input: 0, output, interpolation })),
      },
    ],
    buffers: [{ byteLength: binary.byteLength }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: times.length * 4 },
      { buffer: 0, byteOffset: times.length * 4, byteLength: expressions.length * 4 },
      { buffer: 0, byteOffset: (times.length + expressions.length) * 4, byteLength: rotations.length * 4 },
    ],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: times.length,
        type: 'SCALAR',
        min: times.slice(0, 1),
        max: times.slice(1),
      },
      { bufferView: 1, componentType: 5126, count: expressions.length / 3, type: 'VEC3' },
      { bufferView: 2, componentType: 5126, count: rotations.length / 4, type: 'VEC4' },
    ],
  };
  const loader = new GLTFLoader();
  loader.register((parser) => new VRMAnimationLoaderPlugin(parser));
  const gltf = await loader.parseAsync(createGlb(json, binary), '');
  return (gltf.userData.vrmAnimations as VRMAnimation[])[0];
}

describe('VRMA interpolation', () => {
  it.each([
    ['STEP', '1', 0.2, 0],
    ['LINEAR', '1', 0.5, Math.SQRT1_2],
    ['CUBICSPLINE', '1', 0.625, Math.SQRT1_2],
    ['CUBICSPLINE', '0', 0.625, -Math.SQRT1_2],
  ] as const)(
    'keeps %s interpolation for expressions and rotations on a VRM %s target',
    async (mode, metaVersion, weight, rotationZ) => {
      const animation = await loadAnimation(mode);
      const expressionManager = new VRMExpressionManager();
      const expression = new VRMExpression('happy');
      expressionManager.registerExpression(expression);

      const bones = Object.fromEntries(
        Object.values(VRMRequiredHumanBoneName).map((name) => [name, { node: new THREE.Object3D() }]),
      ) as VRMHumanBones;
      const humanoid = new VRMHumanoid(bones);
      const hips = humanoid.getNormalizedBoneNode('hips')!;
      const root = new THREE.Group();
      root.add(humanoid.normalizedHumanBonesRoot, expression);

      const weightTrack = createVRMAnimationExpressionTracks(animation, expressionManager).preset.get('happy')!;
      const rotationTrack = createVRMAnimationHumanoidTracks(animation, humanoid, metaVersion).rotation.get('hips')!;
      const mixer = new THREE.AnimationMixer(root);
      mixer.clipAction(new THREE.AnimationClip('Test', 1, [weightTrack, rotationTrack])).play();
      mixer.setTime(0.5);

      expect.soft(expression.weight).toBeCloseTo(weight);
      expect.soft(hips.quaternion.z).toBeCloseTo(rotationZ);
      expect(hips.quaternion.length()).toBeCloseTo(1);
    },
  );
});
