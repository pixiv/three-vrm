import * as THREE from 'three';
import { VRMSpringBoneCollider } from '../VRMSpringBoneCollider';
import { VRMSpringBoneColliderShapeCapsule } from '../VRMSpringBoneColliderShapeCapsule';
import { VRMSpringBoneColliderShapeSphere } from '../VRMSpringBoneColliderShapeSphere';
import { ColliderShapeBufferGeometry } from './utils/ColliderShapeBufferGeometry';
import { ColliderShapeCapsuleBufferGeometry } from './utils/ColliderShapeCapsuleBufferGeometry';
import { ColliderShapeSphereBufferGeometry } from './utils/ColliderShapeSphereBufferGeometry';

export class VRMSpringBoneColliderHelper extends THREE.Group {
  public readonly collider: VRMSpringBoneCollider;
  private readonly _geometry: ColliderShapeBufferGeometry;
  private readonly _line: THREE.LineSegments;

  public constructor(collider: VRMSpringBoneCollider) {
    super();
    this.matrixAutoUpdate = false;

    this.collider = collider;

    if (this.collider.shape instanceof VRMSpringBoneColliderShapeSphere) {
      this._geometry = new ColliderShapeSphereBufferGeometry(this.collider.shape);
    } else if (this.collider.shape instanceof VRMSpringBoneColliderShapeCapsule) {
      this._geometry = new ColliderShapeCapsuleBufferGeometry(this.collider.shape);
    } else {
      throw new Error('VRMSpringBoneColliderHelper: Unknown collider shape type detected');
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xff00ff,
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
    this.collider.updateWorldMatrix(true, false);

    this.matrix.copy(this.collider.matrixWorld);

    this._geometry.update();

    super.updateMatrixWorld(force);
  }
}
