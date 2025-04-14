import * as THREE from 'three';
import { VRMSpringBoneLimit } from '../VRMSpringBoneLimit';
import { VRMSpringBoneJoint } from '../VRMSpringBoneJoint';
import { VRMSpringBoneLimitCone } from '../VRMSpringBoneLimitCone';
import { LimitConeBufferGeometry } from './utils/LimitConeBufferGeometry';
import { LimitBufferGeometry } from './utils/LimitBufferGeometry';

const _vec3WorldPosition = /*@__PURE__*/ new THREE.Vector3();
const _vec3Scale = /*@__PURE__*/ new THREE.Vector3();

export class VRMSpringBoneLimitHelper extends THREE.Group {
  public readonly limit: VRMSpringBoneLimit;
  public readonly joint: VRMSpringBoneJoint;
  private readonly _geometry: LimitBufferGeometry;
  private readonly _line: THREE.LineSegments;

  public constructor(limit: VRMSpringBoneLimit, joint: VRMSpringBoneJoint) {
    super();
    this.matrixAutoUpdate = false;

    this.limit = limit;
    this.joint = joint;

    if (this.limit instanceof VRMSpringBoneLimitCone) {
      this._geometry = new LimitConeBufferGeometry(this.limit);
    } else {
      throw new Error('VRMSpringBoneLimitHelper: Unknown limit type detected');
    }

    const material = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      depthTest: false,
      depthWrite: false,
    });

    this._line = new THREE.LineSegments(this._geometry, material);
    this.add(this._line);
  }

  public dispose(): void {
    this._geometry.dispose();
  }

  public updateMatrixWorld(force: boolean): void {
    this.joint.bone.updateWorldMatrix(true, false);
    this.joint.bone.getWorldPosition(_vec3WorldPosition);
    _vec3Scale.setScalar(0.5 * this.joint.worldSpaceBoneLength);

    this.matrix.compose(_vec3WorldPosition, this.limit.internalTotalRotationCache, _vec3Scale);

    this._geometry.update();

    super.updateMatrixWorld(force);
  }
}
