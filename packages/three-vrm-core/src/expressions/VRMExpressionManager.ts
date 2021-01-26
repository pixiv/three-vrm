import type { VRMExpressionPreset } from './VRMExpressionPreset';
import { saturate } from '../utils/saturate';
import type { VRMExpression } from './VRMExpression';

export class VRMExpressionManager {
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
    Object.values(this.expressionMap).forEach((expression) => {
      expression.clearAppliedWeight();
    });

    Object.values(this.expressionMap).forEach((expression) => {
      expression.applyWeight();
    });
  }
}
