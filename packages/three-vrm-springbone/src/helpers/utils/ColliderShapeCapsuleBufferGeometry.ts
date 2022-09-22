import * as THREE from 'three';
import { VRMSpringBoneColliderShapeCapsule } from '../../VRMSpringBoneColliderShapeCapsule';
import { ColliderShapeBufferGeometry } from './ColliderShapeBufferGeometry';

const _vecA = new THREE.Vector3();

export class ColliderShapeCapsuleBufferGeometry extends THREE.BufferGeometry implements ColliderShapeBufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _shape: VRMSpringBoneColliderShapeCapsule;
  private _currentRadius = 0;
  private readonly _currentOffset = new THREE.Vector3();
  private readonly _currentTail = new THREE.Vector3();

  public constructor(shape: VRMSpringBoneColliderShapeCapsule) {
    super();

    this._shape = shape;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(396), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(264), 1);
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

    if (!this._currentTail.equals(this._shape.tail)) {
      this._currentTail.copy(this._shape.tail);
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    _vecA.copy(this._currentTail).sub(this._currentOffset);
    const l = _vecA.length() / this._currentRadius;

    for (let i = 0; i <= 16; i++) {
      const t = (i / 16.0) * Math.PI;

      this._attrPos.setXYZ(i, -Math.sin(t), -Math.cos(t), 0.0);
      this._attrPos.setXYZ(17 + i, l + Math.sin(t), Math.cos(t), 0.0);
      this._attrPos.setXYZ(34 + i, -Math.sin(t), 0.0, -Math.cos(t));
      this._attrPos.setXYZ(51 + i, l + Math.sin(t), 0.0, Math.cos(t));
    }

    for (let i = 0; i < 32; i++) {
      const t = (i / 16.0) * Math.PI;
      this._attrPos.setXYZ(68 + i, 0.0, Math.sin(t), Math.cos(t));
      this._attrPos.setXYZ(100 + i, l, Math.sin(t), Math.cos(t));
    }

    const theta = Math.atan2(_vecA.y, Math.sqrt(_vecA.x * _vecA.x + _vecA.z * _vecA.z));
    const phi = -Math.atan2(_vecA.z, _vecA.x);

    this.rotateZ(theta);
    this.rotateY(phi);
    this.scale(this._currentRadius, this._currentRadius, this._currentRadius);
    this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < 34; i++) {
      const i1 = (i + 1) % 34;

      this._attrIndex.setXY(i * 2, i, i1);
      this._attrIndex.setXY(68 + i * 2, 34 + i, 34 + i1);
    }

    for (let i = 0; i < 32; i++) {
      const i1 = (i + 1) % 32;

      this._attrIndex.setXY(136 + i * 2, 68 + i, 68 + i1);
      this._attrIndex.setXY(200 + i * 2, 100 + i, 100 + i1);
    }

    this._attrIndex.needsUpdate = true;
  }
}
