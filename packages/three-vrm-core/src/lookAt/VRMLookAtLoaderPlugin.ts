import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMExpressionManager } from '../expressions/VRMExpressionManager';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { VRMLookAt } from './VRMLookAt';
import { VRMLookAtBoneApplier } from './VRMLookAtBoneApplier';
import { VRMLookAtExpressionApplier } from './VRMLookAtExpressionApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';

/**
 * A plugin of GLTFLoader that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
export class VRMLookAtLoaderPlugin implements GLTFLoaderPlugin {
  public readonly parser: GLTFParser;

  public get name(): string {
    // We should use the extension name instead but we have multiple plugins for an extension...
    return 'VRMLookAtLoaderPlugin';
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    // this might be called twice or more by its dependants!

    if (gltf.userData.promiseVrmLookAt == null) {
      gltf.userData.promiseVrmLookAt = (async () => {
        // load dependencies
        const promiseHumanoid = this._dependOnHumanoid(gltf);
        const promiseExpressionManager = this._dependOnExpressionManager(gltf);

        // load the lookAt
        return await this._import(gltf, await promiseHumanoid, await promiseExpressionManager);
      })();

      gltf.userData.vrmLookAt = await gltf.userData.promiseVrmLookAt;
    }

    await gltf.userData.promiseVrmLookAt;
  }

  /**
   * Since LookAt depends on Humanoid, Humanoid must be loaded first.
   * Sadly, there is no system that do dependency resolution on GLTFLoader Plugin system.
   * This will execute the `afterRoot` of {@link VRMHumanoidLoaderPlugin} instead
   * while making sure the `afterRoot` will be called only once by making `gltf.userData.promiseVrmHumanoid` as a cache.
   * This function also returns the `gltf.userData.promiseVrmHumanoid`.
   * @param gltf The input GLTF
   */
  private async _dependOnHumanoid(gltf: GLTF): Promise<VRMHumanoid | null> {
    if (gltf.userData.promiseVrmHumanoid == null) {
      const humanoidPlugin = (this.parser as any).plugins['VRMHumanoidLoaderPlugin']; // TODO: remove any
      if (!humanoidPlugin) {
        throw new Error('VRMLookAtLoaderPlugin: It must be used along with VRMHumanoidLoaderPlugin');
      }

      humanoidPlugin.afterRoot(gltf); // this will make sure `gltf.userData.promiseVrmHumanoid` exists
    }

    return await gltf.userData.promiseVrmHumanoid;
  }

  /**
   * Since LookAt depends on Expressions, ExpressionManager must be loaded first.
   * Sadly, there is no system that do dependency resolution on GLTFLoader Plugin system.
   * This will execute the `afterRoot` of {@link VRMExpressionLoaderPlugin} instead
   * while making sure the `afterRoot` will be called only once by making `gltf.userData.promiseVrmExpressionManager` as a cache.
   * This function also returns the `gltf.userData.promiseVrmExpressionManager`.
   * @param gltf The input GLTF
   */
  private async _dependOnExpressionManager(gltf: GLTF): Promise<VRMExpressionManager | null> {
    if (gltf.userData.promiseVrmExpressionManager == null) {
      const expressionPlugin = (this.parser as any).plugins['VRMExpressionLoaderPlugin']; // TODO: remove any
      if (!expressionPlugin) {
        throw new Error('VRMLookAtLoaderPlugin: It must be used along with VRMExpressionLoaderPlugin');
      }

      expressionPlugin.afterRoot(gltf); // this will make sure `gltf.userData.promiseVrmExpressionManager` exists
    }

    return await gltf.userData.promiseVrmExpressionManager;
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

    const lookAt = new VRMLookAt(humanoid, applier);

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

    const lookAt = new VRMLookAt(humanoid, applier);

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
}
