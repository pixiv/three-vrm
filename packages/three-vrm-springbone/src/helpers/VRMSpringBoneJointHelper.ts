import * as THREE from 'three';
import { VRMSpringBoneJoint } from '../VRMSpringBoneJoint';
import { SpringBoneBufferGeometry } from './utils/SpringBoneBufferGeometry';

export class VRMSpringBoneJointHelper extends THREE.Group {
  public readonly springBone: VRMSpringBoneJoint;
  private readonly _geometry: SpringBoneBufferGeometry;
  private readonly _line: THREE.LineSegments;

  public constructor(springBone: VRMSpringBoneJoint) {
    super();
    this.matrixAutoUpdate = false;

    this.springBone = springBone;

    this._geometry = new SpringBoneBufferGeometry(this.springBone);

    const material = new THREE.LineBasicMaterial({
      color: 0xffff00,
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
    this.springBone.bone.updateWorldMatrix(true, false);

    this.matrix.copy(this.springBone.bone.matrixWorld);

    this._geometry.update();

    super.updateMatrixWorld(force);
  }
}
