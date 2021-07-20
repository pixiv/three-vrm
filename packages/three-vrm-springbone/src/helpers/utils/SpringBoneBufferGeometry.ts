import * as THREE from 'three';
import { VRMSpringBoneJoint } from '../../VRMSpringBoneJoint';

export class SpringBoneBufferGeometry extends THREE.BufferGeometry {
  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _springBone: VRMSpringBoneJoint;
  private _currentRadius = 0;
  private readonly _currentTail = new THREE.Vector3();

  public constructor(springBone: VRMSpringBoneJoint) {
    super();

    this._springBone = springBone;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(294), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(194), 1);
    this.setIndex(this._attrIndex);

    this._buildIndex();
    this.update();
  }

  public update(): void {
    let shouldUpdateGeometry = false;

    if (this._currentRadius !== this._springBone.settings.hitRadius) {
      this._currentRadius = this._springBone.settings.hitRadius;
      shouldUpdateGeometry = true;
    }

    if (!this._currentTail.equals(this._springBone.initialLocalChildPosition)) {
      this._currentTail.copy(this._springBone.initialLocalChildPosition);
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
    this.translate(this._currentTail.x, this._currentTail.y, this._currentTail.z);

    this._attrPos.setXYZ(96, 0, 0, 0);
    this._attrPos.setXYZ(97, this._currentTail.x, this._currentTail.y, this._currentTail.z);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    for (let i = 0; i < 32; i++) {
      const i1 = (i + 1) % 32;

      this._attrIndex.setXY(i * 2, i, i1);
      this._attrIndex.setXY(64 + i * 2, 32 + i, 32 + i1);
      this._attrIndex.setXY(128 + i * 2, 64 + i, 64 + i1);
    }
    this._attrIndex.setXY(192, 96, 97);

    this._attrIndex.needsUpdate = true;
  }
}
