import * as THREE from 'three';
import { VRMNodeCollider } from '../VRMSpringBoneCollider';
import { VRMNodeColliderShapeCapsule } from '../VRMSpringBoneColliderShapeCapsule';
import { VRMNodeColliderShapeSphere } from '../VRMSpringBoneColliderShapeSphere';
import { ColliderShapeBufferGeometry } from './utils/ColliderShapeBufferGeometry';
import { ColliderShapeCapsuleBufferGeometry } from './utils/ColliderShapeCapsuleBufferGeometry';
import { ColliderShapeSphereBufferGeometry } from './utils/ColliderShapeSphereBufferGeometry';

export class VRMNodeColliderHelper extends THREE.Group {
  public readonly collider: VRMNodeCollider;
  private readonly _geometry: ColliderShapeBufferGeometry;
  private readonly _line: THREE.LineSegments;

  public constructor(collider: VRMNodeCollider) {
    super();
    this.matrixAutoUpdate = false;

    this.collider = collider;

    if (this.collider.shape instanceof VRMNodeColliderShapeSphere) {
      this._geometry = new ColliderShapeSphereBufferGeometry(this.collider.shape);
    } else if (this.collider.shape instanceof VRMNodeColliderShapeCapsule) {
      this._geometry = new ColliderShapeCapsuleBufferGeometry(this.collider.shape);
    } else {
      throw new Error('VRMNodeColliderHelper: Unknown collider shape type detected');
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

  public update(): void {
    this.collider.updateWorldMatrix(true, false);

    this.matrix.copy(this.collider.matrixWorld);

    this._geometry.update();
  }
}
