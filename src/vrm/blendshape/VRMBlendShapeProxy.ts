import * as THREE from 'three'
import { BlendShapePresetName } from '../types'
import { BlendShapeController } from './BlendShapeController'
import { BlendShapeMaster } from './BlendShapeMaster'

export class VRMBlendShapeProxy {

  public static create (
    animationMixer: THREE.AnimationMixer,
    blendShapeMaster: BlendShapeMaster,
    blendShapePresetMap: { [presetName in BlendShapePresetName]?: string }): VRMBlendShapeProxy {

    const expressions: { [key: string]: THREE.AnimationAction | undefined } = {}
    // VRMの各標準表情をclipにしておく
    Object.keys(blendShapeMaster.blendShapeGroups).forEach((expressionName) => {
      const controller = blendShapeMaster.blendShapeGroups[expressionName]!
      const tracks: THREE.NumberKeyframeTrack[] = []

      const trackName = `${controller.name}.weight`
      const times = [0, 1]
      // weight で制御するので value は常に `1` になるようにする。
      const values = [1, 1]

      // mixerのweightで影響度を変更するので、1フレームのみ
      const track = new THREE.NumberKeyframeTrack(trackName, times, values)
      tracks.push(track)

      const clip = new THREE.AnimationClip(expressionName, 1, tracks)
      const expression = animationMixer.clipAction(clip)
      expression.setEffectiveWeight(1).stop()
      expression.clampWhenFinished = true
      expressions[expressionName] = expression
    })
    return new VRMBlendShapeProxy(blendShapeMaster, blendShapePresetMap, expressions)
  }

  private static clamp (value: number): number {
    return Math.max(Math.min(value, 1.0), 0.0)
  }

  public readonly expressions: { [key: string]: THREE.AnimationAction | undefined } = {}

  private readonly _blendShapeMaster: BlendShapeMaster
  private readonly _blendShapePresetMap: { [presetName in BlendShapePresetName]?: string }

  protected constructor (blendShapeMaster: BlendShapeMaster,
                         blendShapePresetMap: { [presetName in BlendShapePresetName]?: string },
                         expressions: { [key: string]: THREE.AnimationAction | undefined }) {
    this._blendShapeMaster = blendShapeMaster
    this._blendShapePresetMap = blendShapePresetMap
    this.expressions = expressions
  }

  public getExpression (name: string): THREE.AnimationAction | undefined {
    return this.expressions[name]
  }

  public getValue (name: BlendShapePresetName | string): number | undefined {
    const controller = this.getController(name)
    return controller && controller.weight
  }

  public setValue (name: BlendShapePresetName | string, weight: number) {
    const controller = this.getController(name)
    if (controller) controller.weight = VRMBlendShapeProxy.clamp(weight)
  }

  public update () {
    this._blendShapeMaster.update()
  }

  public getController (name: BlendShapePresetName | string): BlendShapeController | undefined {
    const actualName = this._blendShapePresetMap[name as BlendShapePresetName]
    const controller = this._blendShapeMaster.getBlendShapeGroup(actualName || name)
    if (!controller) {
      console.warn(`no blend shape found by ${name}`)
      return
    }
    return controller
  }
}
