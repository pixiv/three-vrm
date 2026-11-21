import { afterEach, describe, expect, it, vi } from 'vitest';
import { VRMExpression } from '../VRMExpression';
import { VRMExpressionManager } from '../VRMExpressionManager';

describe('VRMExpressionManager', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('unregisterExpression', () => {
    it('unregisters a registered expression', () => {
      const manager = new VRMExpressionManager();
      const aa = new VRMExpression('aa');
      const ih = new VRMExpression('ih');
      manager.registerExpression(aa);
      manager.registerExpression(ih);

      manager.unregisterExpression(aa);

      expect(manager.expressions).toEqual([ih]);
      expect(manager.getExpression('aa')).toBeNull();
      expect(manager.getExpression('ih')).toBe(ih);
    });

    it('does not touch other expressions if the given expression is not registered', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});

      const manager = new VRMExpressionManager();
      const aa = new VRMExpression('aa');
      const ih = new VRMExpression('ih');
      manager.registerExpression(aa);
      manager.registerExpression(ih);

      manager.unregisterExpression(new VRMExpression('ih'));

      expect(console.warn).toHaveBeenCalledOnce();
      expect(manager.expressions).toEqual([aa, ih]);
      expect(manager.getExpression('ih')).toBe(ih);
    });
  });
});
