import { BlendShapePresetName } from '../types';
import { saturate } from '../utils/math';
import { VRMBlendShapeGroup } from './VRMBlendShapeGroup';

export class VRMBlendShapeMaster {
  /**
   * List of registered blend shape.
   */
  public readonly _blendShapeGroups: { [name: string]: VRMBlendShapeGroup } = {};

  /**
   * A map from [[BlendShapePresetName]] to its actual blend shape name.
   */
  private readonly _blendShapePresetMap: { [presetName in BlendShapePresetName]?: string } = {};

  /**
   * Create a new VRMBlendShape.
   */
  public constructor() {}

  /**
   * Return registered blend shape group.
   * @param name Name of the blend shape group
   */
  public getBlendShapeGroup(name: string | BlendShapePresetName): VRMBlendShapeGroup | undefined {
    const presetName = this._blendShapePresetMap[name as BlendShapePresetName];
    const controller = presetName ? this._blendShapeGroups[presetName] : this._blendShapeGroups[name];
    if (!controller) {
      console.warn(`no blend shape found by ${name}`);
      return undefined;
    }
    return controller;
  }

  /**
   * Register a blend shape group.
   * @param name Name of the blend shape gorup
   * @param controller VRMBlendShapeController that describes the blend shape group
   */
  public registerBlendShapeGroup(
    name: string,
    presetName: BlendShapePresetName | undefined,
    controller: VRMBlendShapeGroup,
  ) {
    this._blendShapeGroups[name] = controller;
    if (presetName) {
      this._blendShapePresetMap[presetName] = name;
    }
  }

  public getValue(name: BlendShapePresetName | string): number | undefined {
    const controller = this.getBlendShapeGroup(name);
    return controller && controller.weight;
  }

  public setValue(name: BlendShapePresetName | string, weight: number) {
    const controller = this.getBlendShapeGroup(name);
    if (controller) {
      controller.weight = saturate(weight);
    }
  }

  /**
   * Update every blend shape groups.
   */
  public update() {
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
