import { BlendShapeController } from './BlendShapeController'

export class BlendShapeMaster {
  /**
   * List of registered blend shape.
   */
  private _blendShapeGroups: { [name: string]: BlendShapeController } = {}

  /**
   * Its registered blend shape groups.
   */
  public get blendShapeGroups () {
    return this._blendShapeGroups
  }

  /**
   * Return registered blend shape group.
   * @param name Name of the blend shape group
   */
  public getBlendShapeGroup (name: string): BlendShapeController | undefined {
    return this._blendShapeGroups[name]
  }

  /**
   * Register a blend shape group.
   * @param name Name of the blend shape gorup
   * @param controller BlendShapeController that describes the blend shape group
   */
  public registerBlendShapeGroup (name: string, controller: BlendShapeController) {
    this._blendShapeGroups[name] = controller
  }

  /**
   * Update every registered blend shape groups.
   */
  public update () {
    Object.keys(this._blendShapeGroups).forEach((name) => {
      const controller = this._blendShapeGroups[name]
      controller.clearAppliedWeight()
    })

    Object.keys(this._blendShapeGroups).forEach((name) => {
      const controller = this._blendShapeGroups[name]
      controller.applyWeight()
    })
  }
}