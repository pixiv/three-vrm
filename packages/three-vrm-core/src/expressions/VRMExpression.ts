import * as THREE from 'three';
import { VRMExpressionBind } from './VRMExpressionBind';
import type { VRMExpressionOverrideType } from './VRMExpressionOverrideType';
import type { VRMExpressionManager } from './VRMExpressionManager';

// animationMixer の監視対象は、Scene の中に入っている必要がある。
// そのため、表示オブジェクトではないけれど、Object3D を継承して Scene に投入できるようにする。
export class VRMExpression extends THREE.Object3D {
  /**
   * Name of this expression.
   * Distinguished with `name` since `name` will be conflicted with Object3D.
   */
  public expressionName: string;

  /**
   * The current weight of the expression.
   *
   * You usually want to set the weight via {@link VRMExpressionManager.setValue}.
   *
   * It might also be controlled by the Three.js animation system.
   */
  public weight = 0.0;

  /**
   * Interpret values greater than 0.5 as 1.0, ortherwise 0.0.
   */
  public isBinary = false;

  /**
   * Specify how the expression overrides blink expressions.
   */
  public overrideBlink: VRMExpressionOverrideType = 'none';

  /**
   * Specify how the expression overrides lookAt expressions.
   */
  public overrideLookAt: VRMExpressionOverrideType = 'none';

  /**
   * Specify how the expression overrides mouth expressions.
   */
  public overrideMouth: VRMExpressionOverrideType = 'none';

  private _binds: VRMExpressionBind[] = [];

  override readonly type: string | 'VRMExpression';

  /**
   * A value represents how much it should override blink expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  public get overrideBlinkAmount(): number {
    if (this.overrideBlink === 'block') {
      return 0.0 < this.outputWeight ? 1.0 : 0.0;
    } else if (this.overrideBlink === 'blend') {
      return this.outputWeight;
    } else {
      return 0.0;
    }
  }

  /**
   * A value represents how much it should override lookAt expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  public get overrideLookAtAmount(): number {
    if (this.overrideLookAt === 'block') {
      return 0.0 < this.outputWeight ? 1.0 : 0.0;
    } else if (this.overrideLookAt === 'blend') {
      return this.outputWeight;
    } else {
      return 0.0;
    }
  }

  /**
   * A value represents how much it should override mouth expressions.
   * `0.0` == no override at all, `1.0` == completely block the expressions.
   */
  public get overrideMouthAmount(): number {
    if (this.overrideMouth === 'block') {
      return 0.0 < this.outputWeight ? 1.0 : 0.0;
    } else if (this.overrideMouth === 'blend') {
      return this.outputWeight;
    } else {
      return 0.0;
    }
  }

  /**
   * An output weight of this expression, considering the {@link isBinary}.
   */
  public get outputWeight(): number {
    if (this.isBinary) {
      return this.weight >= 0.5 ? 1.0 : 0.0;
    }

    return this.weight;
  }

  constructor(expressionName: string) {
    super();

    this.name = `VRMExpression_${expressionName}`;
    this.expressionName = expressionName;

    // traverse 時の救済手段として Object3D ではないことを明示しておく
    this.type = 'VRMExpression';

    // 表示目的のオブジェクトではないので、負荷軽減のために visible を false にしておく。
    // これにより、このインスタンスに対する毎フレームの matrix 自動計算を省略できる。
    this.visible = false;
  }

  public addBind(bind: VRMExpressionBind): void {
    this._binds.push(bind);
  }

  /**
   * Apply weight to every assigned blend shapes.
   * Should be called every frame.
   */
  public applyWeight(options?: {
    /**
     * Multiplies a value to its weight to apply.
     * Intended to be used for overriding an expression weight by another expression.
     * See also: {@link overrideBlink}, {@link overrideLookAt}, {@link overrideMouth}
     */
    multiplier?: number;
  }): void {
    let actualWeight = this.outputWeight;
    actualWeight *= options?.multiplier ?? 1.0;

    // if the expression is binary, the override value must be also treated as binary
    if (this.isBinary && actualWeight < 1.0) {
      actualWeight = 0.0;
    }

    this._binds.forEach((bind) => bind.applyWeight(actualWeight));
  }

  /**
   * Clear previously assigned blend shapes.
   */
  public clearAppliedWeight(): void {
    this._binds.forEach((bind) => bind.clearAppliedWeight());
  }
}
