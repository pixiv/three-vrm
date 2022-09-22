import * as THREE from 'three';
import { VRMSpringBoneColliderShapeSphere } from '../../VRMSpringBoneColliderShapeSphere';
import { ColliderShapeBufferGeometry } from './ColliderShapeBufferGeometry';

export class ColliderShapeSphereBufferGeometry extends THREE.BufferGeometry implements ColliderShapeBufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _shape: VRMSpringBoneColliderShapeSphere;
  private _currentRadius = 0;
  private readonly _currentOffset = new THREE.Vector3();

  public constructor(shape: VRMSpringBoneColliderShapeSphere) {
    super();

    this._shape = shape;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(32 * 3 * 3), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(64 * 3), 1);
    this.setIndex(this._attrIndex);

    this._buildIndex();
    this.update();
  }

  public update(): void {
    let shouldUpdateGeometry = false;

    if (this._currentRadius !== this._shape.radius) {
      this._currentRadius = this._shape.radius;
      shouldUpdateGeometry = true;
    }

    if (!this._currentOffset.equals(this._shape.offset)) {
      this._currentOffset.copy(this._shape.offset);
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    for (let i = 0; i < 32; i++) {
      const t = (i / 16.0) * Math.PI;

      this._attrPos.setXYZ(i, Math.cos(t), Math.sin(t), 0.0);
      this._attrPos.setXYZ(32 + i, 0.0, Math.cos(t), Math.sin(t));
      this._attrPos.setXYZ(64 + i, Math.sin(t), 0.0, Math.cos(t));
    }

    this.scale(this._currentRadius, this._currentRadius, this._currentRadius);
    this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < 32; i++) {
      const i1 = (i + 1) % 32;

      this._attrIndex.setXY(i * 2, i, i1);
      this._attrIndex.setXY(64 + i * 2, 32 + i, 32 + i1);
      this._attrIndex.setXY(128 + i * 2, 64 + i, 64 + i1);
    }

    this._attrIndex.needsUpdate = true;
  }
}
