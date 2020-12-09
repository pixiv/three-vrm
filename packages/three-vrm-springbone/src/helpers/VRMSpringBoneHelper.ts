import * as THREE from 'three';
import { VRMSpringBone } from '../VRMSpringBone';
import { SpringBoneBufferGeometry } from './utils/SpringBoneBufferGeometry';

export class VRMSpringBoneHelper extends THREE.Group {
  public readonly springBone: VRMSpringBone;
  private readonly _geometry: SpringBoneBufferGeometry;
  private readonly _line: THREE.LineSegments;

  public constructor(springBone: VRMSpringBone) {
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

  public update(): void {
    this.matrix.copy(this.springBone.bone.matrixWorld);

    this._geometry.update();
  }
}
