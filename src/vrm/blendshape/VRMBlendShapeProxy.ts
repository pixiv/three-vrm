import { VRMSchema } from '../types';
import { saturate } from '../utils/math';
import { VRMBlendShapeGroup } from './VRMBlendShapeGroup';

export class VRMBlendShapeProxy {
  /**
   * List of registered blend shape.
   */
  public readonly _blendShapeGroups: { [name: string]: VRMBlendShapeGroup } = {};

  /**
   * A map from [[VRMSchema.BlendShapePresetName]] to its actual blend shape name.
   */
  private readonly _blendShapePresetMap: { [presetName in VRMSchema.BlendShapePresetName]?: string } = {};

  /**
   * Create a new VRMBlendShape.
   */
  public constructor() {
    // do nothing
  }

  /**
   * List of name of registered blend shape group.
   */
  public get expressions(): string[] {
    return Object.keys(this._blendShapeGroups);
  }

  /**
   * Return registered blend shape group.
   *
   * @param name Name of the blend shape group
   */
  public getBlendShapeGroup(name: string | VRMSchema.BlendShapePresetName): VRMBlendShapeGroup | undefined {
    const presetName = this._blendShapePresetMap[name as VRMSchema.BlendShapePresetName];
    const controller = presetName ? this._blendShapeGroups[presetName] : this._blendShapeGroups[name];
    if (!controller) {
      console.warn(`no blend shape found by ${name}`);
      return undefined;
    }
    return controller;
  }

  /**
   * Register a blend shape group.
   *
   * @param name Name of the blend shape gorup
   * @param controller VRMBlendShapeController that describes the blend shape group
   */
  public registerBlendShapeGroup(
    name: string,
    presetName: VRMSchema.BlendShapePresetName | undefined,
    controller: VRMBlendShapeGroup,
  ): void {
    this._blendShapeGroups[name] = controller;
    if (presetName) {
      this._blendShapePresetMap[presetName] = name;
    }
  }

  /**
   * Get current weight of specified blend shape group.
   *
   * @param name Name of the blend shape group
   */
  public getValue(name: VRMSchema.BlendShapePresetName | string): number | null {
    const controller = this.getBlendShapeGroup(name);
    return (controller && controller.weight) || null;
  }

  /**
   * Set a weight to specified blend shape group.
   *
   * @param name Name of the blend shape group
   * @param weight Weight
   */
  public setValue(name: VRMSchema.BlendShapePresetName | string, weight: number): void {
    const controller = this.getBlendShapeGroup(name);
    if (controller) {
      controller.weight = saturate(weight);
    }
  }

  /**
   * Get a track name of specified blend shape group.
   * This track name is needed to manipulate its blend shape group via keyframe animations.
   *
   * @example Manipulate a blend shape group using keyframe animation
   * ```js
   * const trackName = vrm.blendShapeProxy.getBlendShapeTrackName( THREE.VRMSchema.BlendShapePresetName.Blink );
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
   * @param name Name of the blend shape group
   */
  public getBlendShapeTrackName(name: VRMSchema.BlendShapePresetName | string): string | null {
    const controller = this.getBlendShapeGroup(name);
    return controller ? `${controller.name}.weight` : null;
  }

  /**
   * Update every blend shape groups.
   */
  public update(): void {
    Object.keys(this._blendShapeGroups).forEach((name) => {
      const controller = this._blendShapeGroups[name];
      controller.clearAppliedWeight();
    });

    Object.keys(this._blendShapeGroups).forEach((name) => {
      const controller = this._blendShapeGroups[name];
      controller.applyWeight();
    });
  }
}
