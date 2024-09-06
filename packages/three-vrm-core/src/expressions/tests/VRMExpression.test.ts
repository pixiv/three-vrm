import * as THREE from 'three';
import { VRMExpression } from '../VRMExpression';
import { VRMExpressionBind } from '../VRMExpressionBind';

class VRMExpressionMockBind implements VRMExpressionBind {
  public weight = 0.0;

  public applyWeight(weight: number): void {
    this.weight += weight;
  }

  public clearAppliedWeight(): void {
    this.weight = 0.0;
  }
}

describe('VRMExpression', () => {
  let expression: VRMExpression;

  beforeEach(() => {
    expression = new VRMExpression('aa');
  });

  describe('outputWeight', () => {
    it('returns the weight if the expression is not binary', () => {
      expression.weight = 0.64;
      expect(expression.outputWeight).toBe(0.64);
    });

    it('returns 0.0 if the expression is binary and the weight is less than 0.5', () => {
      expression.isBinary = true;
      expression.weight = 0.3;
      expect(expression.outputWeight).toBe(0.0);
    });

    it('returns 1.0 if the expression is binary and the weight is more than 0.5', () => {
      expression.isBinary = true;
      expression.weight = 0.7;
      expect(expression.outputWeight).toBe(1.0);
    });

    it('returns 1.0 if the expression is binary and the weight is exactly 0.5', () => {
      expression.isBinary = true;
      expression.weight = 0.5;
      expect(expression.outputWeight).toBe(1.0);
    });
  });

  describe('overrideBlinkAmount', () => {
    it('returns 0.0 when the overrideBlink is none', () => {
      expression.overrideBlink = 'none';
      expression.weight = 0.75;
      expect(expression.overrideBlinkAmount).toBe(0.0);
    });

    it('returns the override amount when the overrideBlink is blend', () => {
      expression.overrideBlink = 'blend';
      expression.weight = 0.75;
      expect(expression.overrideBlinkAmount).toBe(0.75);
    });

    it('returns 1.0 when the overrideBlink is block and the weight is not zero', () => {
      expression.overrideBlink = 'block';
      expression.weight = 0.1;
      expect(expression.overrideBlinkAmount).toBe(1.0);
    });

    it('returns 0.0 when the overrideBlink is block and the weight is exactly zero', () => {
      expression.overrideBlink = 'block';
      expression.weight = 0.0;
      expect(expression.overrideBlinkAmount).toBe(0.0);
    });

    it('returns 0.0 when the expression is binary, the overrideBlink is blend, and the weight is less than 0.5', () => {
      expression.overrideBlink = 'blend';
      expression.isBinary = true;
      expression.weight = 0.3;
      expect(expression.overrideBlinkAmount).toBe(0.0);
    });

    it('returns 1.0 when the expression is binary, the overrideBlink is blend, and the weight is more than 0.5', () => {
      expression.overrideBlink = 'blend';
      expression.isBinary = true;
      expression.weight = 0.7;
      expect(expression.overrideBlinkAmount).toBe(1.0);
    });

    it('returns 0.0 when the expression is binary, the overrideBlink is block, and the weight is less than 0.5', () => {
      expression.overrideBlink = 'block';
      expression.isBinary = true;
      expression.weight = 0.3;
      expect(expression.overrideBlinkAmount).toBe(0.0);
    });

    it('returns 1.0 when the expression is binary, the overrideBlink is block, and the weight is more than 0.5', () => {
      expression.overrideBlink = 'block';
      expression.isBinary = true;
      expression.weight = 0.7;
      expect(expression.overrideBlinkAmount).toBe(1.0);
    });
  });

  describe('applyWeight', () => {
    it('applies the weight to the binds', () => {
      const bind1 = new VRMExpressionMockBind();
      const bind2 = new VRMExpressionMockBind();
      expression.addBind(bind1);
      expression.addBind(bind2);

      expression.weight = 0.64;
      expression.applyWeight();

      expect(bind1.weight).toBe(0.64);
      expect(bind2.weight).toBe(0.64);
    });

    it('applies the 0.0 if the expression is binary and the weight is less than 0.5', () => {
      expression.isBinary = true;

      const bind = new VRMExpressionMockBind();
      expression.addBind(bind);

      expression.weight = 0.3;
      expression.applyWeight();

      expect(bind.weight).toBe(0.0);
    });

    it('applies the 1.0 if the expression is binary and the weight is more than 0.5', () => {
      expression.isBinary = true;

      const bind = new VRMExpressionMockBind();
      expression.addBind(bind);

      expression.weight = 0.7;
      expression.applyWeight();

      expect(bind.weight).toBe(1.0);
    });

    it('applies the 1.0 if the expression is binary and the weight is exactly 0.5', () => {
      expression.isBinary = true;

      const bind = new VRMExpressionMockBind();
      expression.addBind(bind);

      expression.weight = 0.5;
      expression.applyWeight();

      expect(bind.weight).toBe(1.0);
    });

    it('applies the weight with the override multiplier', () => {
      const bind = new VRMExpressionMockBind();
      expression.addBind(bind);

      expression.weight = 0.75;
      expression.applyWeight({ multiplier: 0.5 });

      expect(bind.weight).toBe(0.375);
    });

    it('applies the 0.0 if the expression is binary and the override multiplier is less than 1.0', () => {
      expression.isBinary = true;

      const bind = new VRMExpressionMockBind();
      expression.addBind(bind);

      expression.weight = 0.7;
      expression.applyWeight({ multiplier: 0.99 });

      expect(bind.weight).toBe(0.0);
    });
  });

  describe('clearAppliedWeight', () => {
    it('clears the applied weight from the binds', () => {
      const bind1 = new VRMExpressionMockBind();
      const bind2 = new VRMExpressionMockBind();
      bind1.applyWeight(0.82);
      bind2.applyWeight(0.48);
      expression.addBind(bind1);
      expression.addBind(bind2);

      expression.clearAppliedWeight();

      expect(bind1.weight).toBe(0.0);
      expect(bind2.weight).toBe(0.0);
    });
  });
});
