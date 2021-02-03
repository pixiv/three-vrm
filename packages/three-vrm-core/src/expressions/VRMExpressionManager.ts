import type { VRMExpressionPreset } from './VRMExpressionPreset';
import { saturate } from '../utils/saturate';
import type { VRMExpression } from './VRMExpression';

export class VRMExpressionManager {
  /**
   * A set of presets that will be overridden by {@link VRMExpression.overrideBlink}.
   */
  private static readonly _blinkPresetSet = new Set<VRMExpressionPreset>(['blink', 'blinkLeft', 'blinkRight']);

  /**
   * A set of presets that will be overridden by {@link VRMExpression.overrideLookAt}.
   */
  private static readonly _lookAtPresetSet = new Set<VRMExpressionPreset>([
    'lookLeft',
    'lookRight',
    'lookUp',
    'lookDown',
  ]);

  /**
   * A set of presets that will be overridden by {@link VRMExpression.overrideMouth}.
   */
  private static readonly _mouthPresetSet = new Set<VRMExpressionPreset>(['aa', 'ee', 'ih', 'oh', 'ou']);

  /**
   * A map from name to {@link VRMExpression}.
   */
  public readonly expressionMap: { [name: string]: VRMExpression } = {};

  /**
   * A map from {@link VRMExpressionPreset} to custom name.
   */
  public readonly expressionPresetMap: { [presetName in VRMExpressionPreset]?: string } = {};

  /**
   * A list of name of custom expressions.
   */
  public readonly customExpressionNames: string[] = [];

  /**
   * A set of blink expressions.
   * See also: {@link _blinkPresets}
   */
  private readonly _blinkExpressionSet = new Set<VRMExpression>();

  /**
   * A set of lookAt expressions.
   * See also: {@link _lookAtPresets}
   */
  private readonly _lookAtExpressionSet = new Set<VRMExpression>();

  /**
   * A set of mouth expressions.
   * See also: {@link _mouthPresets}
   */
  private readonly _mouthExpressionSet = new Set<VRMExpression>();

  /**
   * Create a new {@link VRMExpressionManager}.
   */
  public constructor() {
    // do nothing
  }

  /**
   * Return a registered expression.
   * If it cannot find an expression, it will return `null` instead.
   *
   * @param name Name or preset name of the expression
   */
  public getExpression(name: string | VRMExpressionPreset): VRMExpression | null {
    const nameToRefer = this.expressionPresetMap[name as VRMExpressionPreset] ?? name;

    const expression = this.expressionMap[nameToRefer];
    if (expression != null) {
      return expression;
    }

    return null;
  }

  /**
   * Register an expression.
   *
   * @param name Name of the expression. It can be either custom name or preset name.
   * @param presetName Preset name of the expression.
   * @param expression {@link VRMExpression} that describes the expression
   */
  public registerExpression(
    name: VRMExpressionPreset | string,
    presetName: VRMExpressionPreset,
    expression: VRMExpression,
  ): void {
    this.expressionMap[name] = expression;

    if (presetName !== 'custom') {
      this.expressionPresetMap[presetName] = name;

      // add overridden expressions to corresponding sets
      if (VRMExpressionManager._blinkPresetSet.has(presetName)) {
        this._blinkExpressionSet.add(expression);
      }

      if (VRMExpressionManager._lookAtPresetSet.has(presetName)) {
        this._lookAtExpressionSet.add(expression);
      }

      if (VRMExpressionManager._mouthPresetSet.has(presetName)) {
        this._mouthExpressionSet.add(expression);
      }
    } else {
      this.customExpressionNames.push(name);
    }
  }

  /**
   * Get the current weight of the specified expression.
   * If it doesn't have an expression of given name, it will return `null` instead.
   *
   * @param name Name of the expression
   */
  public getValue(name: VRMExpressionPreset | string): number | null {
    const expression = this.getExpression(name);
    return expression?.weight ?? null;
  }

  /**
   * Set a weight to the specified expression.
   *
   * @param name Name of the expression
   * @param weight Weight
   */
  public setValue(name: VRMExpressionPreset | string, weight: number): void {
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
  public getExpressionTrackName(name: VRMExpressionPreset | string): string | null {
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
    Object.values(this.expressionMap).forEach((expression) => {
      expression.clearAppliedWeight();
    });

    // then apply binds
    Object.values(this.expressionMap).forEach((expression) => {
      let multiplier = 1.0;

      if (this._blinkExpressionSet.has(expression)) {
        multiplier *= weightMultipliers.blink;
      }

      if (this._lookAtExpressionSet.has(expression)) {
        multiplier *= weightMultipliers.lookAt;
      }

      if (this._mouthExpressionSet.has(expression)) {
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

    Object.values(this.expressionMap).forEach((expression) => {
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
