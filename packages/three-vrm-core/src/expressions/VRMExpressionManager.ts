import { VRMExpressionPresetName } from './VRMExpressionPresetName';
import { saturate } from '../utils/saturate';
import type { VRMExpression } from './VRMExpression';

export class VRMExpressionManager {
  /**
   * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideBlink}.
   */
  public blinkExpressionNames = ['blink', 'blinkLeft', 'blinkRight'];

  /**
   * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideLookAt}.
   */
  public lookAtExpressionNames = ['lookLeft', 'lookRight', 'lookUp', 'lookDown'];

  /**
   * A set of name or preset name of expressions that will be overridden by {@link VRMExpression.overrideMouth}.
   */
  public mouthExpressionNames = ['aa', 'ee', 'ih', 'oh', 'ou'];

  /**
   * A set of {@link VRMExpression}.
   * When you want to register expressions, use {@link registerExpression}
   */
  private _expressions: VRMExpression[] = [];
  public get expressions(): VRMExpression[] {
    return this._expressions.concat();
  }

  /**
   * A map from name to expression.
   */
  private _expressionMap: { [name: string]: VRMExpression } = {};
  public get expressionMap(): { [name: string]: VRMExpression } {
    return Object.assign({}, this._expressionMap);
  }

  /**
   * A map from name to expression, but excluding custom expressions.
   */
  public get presetExpressionMap(): { [name in VRMExpressionPresetName]?: VRMExpression } {
    const result: { [name in VRMExpressionPresetName]?: VRMExpression } = {};

    const presetNameSet = new Set<string>(Object.values(VRMExpressionPresetName));

    Object.entries(this._expressionMap).forEach(([name, expression]) => {
      if (presetNameSet.has(name)) {
        result[name as VRMExpressionPresetName] = expression;
      }
    });

    return result;
  }

  /**
   * A map from name to expression, but excluding preset expressions.
   */
  public get customExpressionMap(): { [name: string]: VRMExpression } {
    const result: { [name: string]: VRMExpression } = {};

    const presetNameSet = new Set<string>(Object.values(VRMExpressionPresetName));

    Object.entries(this._expressionMap).forEach(([name, expression]) => {
      if (!presetNameSet.has(name)) {
        result[name] = expression;
      }
    });

    return result;
  }

  /**
   * Create a new {@link VRMExpressionManager}.
   */
  public constructor() {
    // do nothing
  }

  /**
   * Copy the given {@link VRMExpressionManager} into this one.
   * @param source The {@link VRMExpressionManager} you want to copy
   * @returns this
   */
  public copy(source: VRMExpressionManager): this {
    // first unregister all the expression it has
    const expressions = this._expressions.concat();
    expressions.forEach((expression) => {
      this.unregisterExpression(expression);
    });

    // then register all the expression of the source
    source._expressions.forEach((expression) => {
      this.registerExpression(expression);
    });

    // copy remaining members
    this.blinkExpressionNames = source.blinkExpressionNames.concat();
    this.lookAtExpressionNames = source.lookAtExpressionNames.concat();
    this.mouthExpressionNames = source.mouthExpressionNames.concat();

    return this;
  }

  /**
   * Returns a clone of this {@link VRMExpressionManager}.
   * @returns Copied {@link VRMExpressionManager}
   */
  public clone(): VRMExpressionManager {
    return new VRMExpressionManager().copy(this);
  }

  /**
   * Return a registered expression.
   * If it cannot find an expression, it will return `null` instead.
   *
   * @param name Name or preset name of the expression
   */
  public getExpression(name: VRMExpressionPresetName | string): VRMExpression | null {
    return this._expressionMap[name] ?? null;
  }

  /**
   * Register an expression.
   *
   * @param expression {@link VRMExpression} that describes the expression
   */
  public registerExpression(expression: VRMExpression): void {
    this._expressions.push(expression);
    this._expressionMap[expression.expressionName] = expression;
  }

  /**
   * Unregister an expression.
   *
   * @param expression The expression you want to unregister
   */
  public unregisterExpression(expression: VRMExpression): void {
    const index = this._expressions.indexOf(expression);
    if (index === -1) {
      console.warn('VRMExpressionManager: The specified expressions is not registered');
    }

    this._expressions.splice(index, 1);
    delete this._expressionMap[expression.expressionName];
  }

  /**
   * Get the current weight of the specified expression.
   * If it doesn't have an expression of given name, it will return `null` instead.
   *
   * @param name Name of the expression
   */
  public getValue(name: VRMExpressionPresetName | string): number | null {
    const expression = this.getExpression(name);
    return expression?.weight ?? null;
  }

  /**
   * Set a weight to the specified expression.
   *
   * @param name Name of the expression
   * @param weight Weight
   */
  public setValue(name: VRMExpressionPresetName | string, weight: number): void {
    const expression = this.getExpression(name);
    if (expression) {
      expression.weight = saturate(weight);
    }
  }

  /**
   * Get a track name of specified expression.
   * This track name is needed to manipulate its expression via keyframe animations.
   *
   * @example Manipulate an expression using keyframe animation
   * ```js
   * const trackName = vrm.expressionManager.getExpressionTrackName( 'blink' );
   * const track = new THREE.NumberKeyframeTrack(
   *   name,
   *   [ 0.0, 0.5, 1.0 ], // times
   *   [ 0.0, 1.0, 0.0 ] // values
   * );
   *
   * const clip = new THREE.AnimationClip(
   *   'blink', // name
   *   1.0, // duration
   *   [ track ] // tracks
   * );
   *
   * const mixer = new THREE.AnimationMixer( vrm.scene );
   * const action = mixer.clipAction( clip );
   * action.play();
   * ```
   *
   * @param name Name of the expression
   */
  public getExpressionTrackName(name: VRMExpressionPresetName | string): string | null {
    const expression = this.getExpression(name);
    return expression ? `${expression.name}.weight` : null;
  }

  /**
   * Update every expressions.
   */
  public update(): void {
    // see how much we should override certain expressions
    const weightMultipliers = this._calculateWeightMultipliers();

    // reset expression binds first
    this._expressions.forEach((expression) => {
      expression.clearAppliedWeight();
    });

    // then apply binds
    this._expressions.forEach((expression) => {
      let multiplier = 1.0;
      const name = expression.expressionName;

      if (this.blinkExpressionNames.indexOf(name) !== -1) {
        multiplier *= weightMultipliers.blink;
      }

      if (this.lookAtExpressionNames.indexOf(name) !== -1) {
        multiplier *= weightMultipliers.lookAt;
      }

      if (this.mouthExpressionNames.indexOf(name) !== -1) {
        multiplier *= weightMultipliers.mouth;
      }

      expression.applyWeight({ multiplier });
    });
  }

  /**
   * Calculate sum of override amounts to see how much we should multiply weights of certain expressions.
   */
  private _calculateWeightMultipliers(): {
    blink: number;
    lookAt: number;
    mouth: number;
  } {
    let blink = 1.0;
    let lookAt = 1.0;
    let mouth = 1.0;

    this._expressions.forEach((expression) => {
      blink -= expression.overrideBlinkAmount;
      lookAt -= expression.overrideLookAtAmount;
      mouth -= expression.overrideMouthAmount;
    });

    blink = Math.max(0.0, blink);
    lookAt = Math.max(0.0, lookAt);
    mouth = Math.max(0.0, mouth);

    return { blink, lookAt, mouth };
  }
}
