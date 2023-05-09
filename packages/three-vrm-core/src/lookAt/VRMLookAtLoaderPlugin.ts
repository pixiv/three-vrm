import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { VRMExpressionManager } from '../expressions/VRMExpressionManager';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { VRMLookAtHelper } from './helpers/VRMLookAtHelper';
import { VRMLookAt } from './VRMLookAt';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtBoneApplier } from './VRMLookAtBoneApplier';
import { VRMLookAtExpressionApplier } from './VRMLookAtExpressionApplier';
import type { VRMLookAtLoaderPluginOptions } from './VRMLookAtLoaderPluginOptions';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

/**
 * The minimum permitted value for {@link V1VRMSchema.LookAtRangeMap.inputMaxValue}.
 * If the given value is smaller than this, the loader shows a warning and clamps up the value.
 */
const INPUT_MAX_VALUE_MINIMUM = 0.01;

/**
 * A plugin of GLTFLoader that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
export class VRMLookAtLoaderPlugin implements GLTFLoaderPlugin {
  /**
   * Specify an Object3D to add {@link VRMLookAtHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  public helperRoot?: THREE.Object3D;

  public readonly parser: GLTFParser;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMLookAtLoaderPlugin';
  }

  public constructor(parser: GLTFParser, options?: VRMLookAtLoaderPluginOptions) {
    this.parser = parser;

    this.helperRoot = options?.helperRoot;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    const vrmHumanoid = gltf.userData.vrmHumanoid as VRMHumanoid | undefined;

    // explicitly distinguish null and undefined
    // since vrmHumanoid might be null as a result
    if (vrmHumanoid === null) {
      return;
    } else if (vrmHumanoid === undefined) {
      throw new Error('VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first');
    }

    const vrmExpressionManager = gltf.userData.vrmExpressionManager as VRMExpressionManager | undefined;

    if (vrmExpressionManager === null) {
      return;
    } else if (vrmExpressionManager === undefined) {
      throw new Error(
        'VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first',
      );
    }

    gltf.userData.vrmLookAt = await this._import(gltf, vrmHumanoid, vrmExpressionManager);
  }

  /**
   * Import a {@link VRMLookAt} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   * @param expressions A {@link VRMExpressionManager} instance that represents the VRM
   */
  private async _import(
    gltf: GLTF,
    humanoid: VRMHumanoid | null,
    expressions: VRMExpressionManager | null,
  ): Promise<VRMLookAt | null> {
    if (humanoid == null || expressions == null) {
      return null;
    }

    const v1Result = await this._v1Import(gltf, humanoid, expressions);
    if (v1Result) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf, humanoid, expressions);
    if (v0Result) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(
    gltf: GLTF,
    humanoid: VRMHumanoid,
    expressions: VRMExpressionManager,
  ): Promise<VRMLookAt | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use vrm
    const isVRMUsed = json.extensionsUsed?.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension = json.extensions?.['VRMC_vrm'] as V1VRMSchema.VRMCVRM | undefined;
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
      console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${specVersion}"`);
      return null;
    }

    const schemaLookAt = extension.lookAt;
    if (!schemaLookAt) {
      return null;
    }

    const defaultOutputScale = schemaLookAt.type === 'expression' ? 1.0 : 10.0;

    const mapHI = this._v1ImportRangeMap(schemaLookAt.rangeMapHorizontalInner, defaultOutputScale);
    const mapHO = this._v1ImportRangeMap(schemaLookAt.rangeMapHorizontalOuter, defaultOutputScale);
    const mapVD = this._v1ImportRangeMap(schemaLookAt.rangeMapVerticalDown, defaultOutputScale);
    const mapVU = this._v1ImportRangeMap(schemaLookAt.rangeMapVerticalUp, defaultOutputScale);

    let applier;

    if (schemaLookAt.type === 'expression') {
      applier = new VRMLookAtExpressionApplier(expressions, mapHI, mapHO, mapVD, mapVU);
    } else {
      applier = new VRMLookAtBoneApplier(humanoid, mapHI, mapHO, mapVD, mapVU);
    }

    const lookAt = this._importLookAt(humanoid, applier);

    lookAt.offsetFromHeadBone.fromArray(schemaLookAt.offsetFromHeadBone ?? [0.0, 0.06, 0.0]);

    return lookAt;
  }

  private _v1ImportRangeMap(
    schemaRangeMap: V1VRMSchema.LookAtRangeMap | undefined,
    defaultOutputScale: number,
  ): VRMLookAtRangeMap {
    let inputMaxValue = schemaRangeMap?.inputMaxValue ?? 90.0;
    const outputScale = schemaRangeMap?.outputScale ?? defaultOutputScale;

    // It might cause NaN when `inputMaxValue` is too small
    // which makes the mesh of the head disappear
    // See: https://github.com/pixiv/three-vrm/issues/1201
    if (inputMaxValue < INPUT_MAX_VALUE_MINIMUM) {
      console.warn(
        'VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!',
      );
      inputMaxValue = INPUT_MAX_VALUE_MINIMUM;
    }

    return new VRMLookAtRangeMap(inputMaxValue, outputScale);
  }

  private async _v0Import(
    gltf: GLTF,
    humanoid: VRMHumanoid,
    expressions: VRMExpressionManager,
  ): Promise<VRMLookAt | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use vrm
    const vrmExt = json.extensions?.VRM as V0VRM.VRM | undefined;
    if (!vrmExt) {
      return null;
    }

    const schemaFirstPerson = vrmExt.firstPerson;
    if (!schemaFirstPerson) {
      return null;
    }

    const defaultOutputScale = schemaFirstPerson.lookAtTypeName === 'BlendShape' ? 1.0 : 10.0;

    const mapHI = this._v0ImportDegreeMap(schemaFirstPerson.lookAtHorizontalInner, defaultOutputScale);
    const mapHO = this._v0ImportDegreeMap(schemaFirstPerson.lookAtHorizontalOuter, defaultOutputScale);
    const mapVD = this._v0ImportDegreeMap(schemaFirstPerson.lookAtVerticalDown, defaultOutputScale);
    const mapVU = this._v0ImportDegreeMap(schemaFirstPerson.lookAtVerticalUp, defaultOutputScale);

    let applier;

    if (schemaFirstPerson.lookAtTypeName === 'BlendShape') {
      applier = new VRMLookAtExpressionApplier(expressions, mapHI, mapHO, mapVD, mapVU);
    } else {
      applier = new VRMLookAtBoneApplier(humanoid, mapHI, mapHO, mapVD, mapVU);
    }

    const lookAt = this._importLookAt(humanoid, applier);

    if (schemaFirstPerson.firstPersonBoneOffset) {
      lookAt.offsetFromHeadBone.set(
        schemaFirstPerson.firstPersonBoneOffset.x ?? 0.0,
        schemaFirstPerson.firstPersonBoneOffset.y ?? 0.06,
        -(schemaFirstPerson.firstPersonBoneOffset.z ?? 0.0),
      );
    } else {
      lookAt.offsetFromHeadBone.set(0.0, 0.06, 0.0);
    }

    // VRM 0.0 are facing Z- instead of Z+
    lookAt.faceFront.set(0.0, 0.0, -1.0);

    if (applier instanceof VRMLookAtBoneApplier) {
      applier.faceFront.set(0.0, 0.0, -1.0);
    }

    return lookAt;
  }

  private _v0ImportDegreeMap(
    schemaDegreeMap: V0VRM.FirstPersonDegreeMap | undefined,
    defaultOutputScale: number,
  ): VRMLookAtRangeMap {
    const curve = schemaDegreeMap?.curve;
    if (JSON.stringify(curve) !== '[0,0,0,1,1,1,1,0]') {
      console.warn('Curves of LookAtDegreeMap defined in VRM 0.0 are not supported');
    }

    let xRange = schemaDegreeMap?.xRange ?? 90.0;
    const yRange = schemaDegreeMap?.yRange ?? defaultOutputScale;

    // It might cause NaN when `xRange` is too small
    // which makes the mesh of the head disappear
    // See: https://github.com/pixiv/three-vrm/issues/1201
    if (xRange < INPUT_MAX_VALUE_MINIMUM) {
      console.warn('VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!');
      xRange = INPUT_MAX_VALUE_MINIMUM;
    }

    return new VRMLookAtRangeMap(xRange, yRange);
  }

  private _importLookAt(humanoid: VRMHumanoid, applier: VRMLookAtApplier): VRMLookAt {
    const lookAt = new VRMLookAt(humanoid, applier);

    if (this.helperRoot) {
      const helper = new VRMLookAtHelper(lookAt);
      this.helperRoot.add(helper);
      helper.renderOrder = this.helperRoot.renderOrder;
    }

    return lookAt;
  }
}
