import type { BlendShapeGroup } from '@pixiv/types-vrm-0.0';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { describe, expect, it, vi } from 'vitest';
import { VRMExpressionLoaderPlugin } from '../VRMExpressionLoaderPlugin';
import type { VRMExpressionManager } from '../VRMExpressionManager';

async function loadV0Expressions(blendShapeGroups: BlendShapeGroup[]): Promise<VRMExpressionManager> {
  const loader = new GLTFLoader();
  loader.register((parser) => new VRMExpressionLoaderPlugin(parser));

  const gltf = await loader.parseAsync(
    JSON.stringify({
      asset: { version: '2.0' },
      extensionsUsed: ['VRM'],
      extensions: { VRM: { blendShapeMaster: { blendShapeGroups } } },
      scene: 0,
      scenes: [{}],
    }),
    '',
  );
  return gltf.userData.vrmExpressionManager as VRMExpressionManager;
}

describe('VRMExpressionLoaderPlugin', () => {
  it('loads VRM 0.x names matching a preset independently of letter case', async () => {
    const manager = await loadV0Expressions([
      { name: 'Surprised', presetName: 'unknown' },
      { name: 'jOy', presetName: 'unknown' },
      { name: 'CustomSmile', presetName: 'unknown' },
      { name: 'Sorrow', presetName: 'angry' },
    ]);

    expect(Object.keys(manager.presetExpressionMap)).toEqual(['surprised', 'happy', 'angry']);
    expect(Object.keys(manager.customExpressionMap)).toEqual(['CustomSmile']);
    manager.setValue('surprised', 0.5);
    expect(manager.getValue('surprised')).toBe(0.5);
  });

  it('keeps the first expression when a named group resolves to an existing preset', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const manager = await loadV0Expressions([
        { name: 'ExplicitJoy', presetName: 'joy', isBinary: true },
        { name: 'JOY', presetName: 'unknown' },
      ]);

      expect(manager.expressions).toHaveLength(1);
      expect(manager.getExpression('happy')?.isBinary).toBe(true);
    } finally {
      warn.mockRestore();
    }
  });
});
