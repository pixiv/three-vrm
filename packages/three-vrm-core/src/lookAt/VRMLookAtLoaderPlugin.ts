import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMExpressionManager } from '../expressions/VRMExpressionManager';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { VRMLookAtHelper } from './helpers/VRMLookAtHelper';
import { VRMLookAt } from './VRMLookAt';
import type { VRMLookAtApplier } from './VRMLookAtApplier';
import { VRMLookAtBoneApplier } from './VRMLookAtBoneApplier';
import { VRMLookAtExpressionApplier } from './VRMLookAtExpressionApplier';
import type { VRMLookAtLoaderPluginOptions } from './VRMLookAtLoaderPluginOptions';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';

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

    if (vrmHumanoid == null) {
      throw new Error(
        'VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first',
      );
    }

    const vrmExpressionManager = gltf.userData.vrmExpressionManager as VRMExpressionManager | undefined;

    if (vrmExpressionManager == null) {
      throw new Error(
        'VRMFirstPersonLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first',
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
    // early abort if it doesn't use vrm
    const isVRMUsed = this.parser.json.extensionsUsed.indexOf('VRMC_vrm') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRMCVRM | undefined = this.parser.json.extensions?.['VRMC_vrm'];
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (specVersion !== '1.0-beta') {
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
    return new VRMLookAtRangeMap(
      schemaRangeMap?.inputMaxValue ?? 90.0,
      schemaRangeMap?.outputScale ?? defaultOutputScale,
    );
  }

  private async _v0Import(
    gltf: GLTF,
    humanoid: VRMHumanoid,
    expressions: VRMExpressionManager,
  ): Promise<VRMLookAt | null> {
    // early abort if it doesn't use vrm
    const vrmExt: V0VRM.VRM | undefined = this.parser.json.extensions?.VRM;
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

    return lookAt;
  }

  private _v0ImportDegreeMap(
    schemaDegreeMap: V0VRM.FirstPersonDegreeMap | undefined,
    defaultOutputScale: number,
  ): VRMLookAtRangeMap {
    if (schemaDegreeMap?.curve) {
      console.warn('Curves of LookAtDegreeMap defined in VRM 0.0 are not supported');
    }

    return new VRMLookAtRangeMap(schemaDegreeMap?.xRange ?? 90.0, schemaDegreeMap?.yRange ?? defaultOutputScale);
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
