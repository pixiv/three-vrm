import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1VRMSchema from '@pixiv/types-vrmc-vrm-1.0';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { VRMExpressionManager } from '../expressions/VRMExpressionManager';
import type { VRMHumanoid } from '../humanoid/VRMHumanoid';
import { VRMLookAt } from './VRMLookAt';
import { VRMLookAtBoneApplier } from './VRMLookAtBoneApplier';
import { VRMLookAtExpressionApplier } from './VRMLookAtExpressionApplier';
import { VRMLookAtRangeMap } from './VRMLookAtRangeMap';

/**
 * An importer that imports a {@link VRMLookAt} from a VRM extension of a GLTF.
 */
export class VRMLookAtImporter {
  /**
   * Import a {@link VRMLookAt} from a VRM.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   * @param humanoid A {@link VRMHumanoid} instance that represents the VRM
   * @param expressions A {@link VRMExpressionManager} instance that represents the VRM
   */
  public async import(gltf: GLTF, humanoid: VRMHumanoid, expressions: VRMExpressionManager): Promise<VRMLookAt | null> {
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
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_vrm-1.0_draft') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    const extension: V1VRMSchema.VRM | undefined = gltf.parser.json.extensions?.['VRMC_vrm-1.0_draft'];
    if (!extension) {
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
    const vrmExt: V0VRM.VRM | undefined = gltf.parser.json.extensions?.VRM;
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
