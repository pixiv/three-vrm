import * as THREE from 'three';
import { VRMSpringBoneColliderShapePlane } from '../../VRMSpringBoneColliderShapePlane';
import { ColliderShapeBufferGeometry } from './ColliderShapeBufferGeometry';

export class ColliderShapePlaneBufferGeometry extends THREE.BufferGeometry implements ColliderShapeBufferGeometry {
  public worldScale = 1.0;

  private readonly _attrPos: THREE.BufferAttribute;
  private readonly _attrIndex: THREE.BufferAttribute;
  private readonly _shape: VRMSpringBoneColliderShapePlane;
  private readonly _currentOffset = new THREE.Vector3();
  private readonly _currentNormal = new THREE.Vector3();

  public constructor(shape: VRMSpringBoneColliderShapePlane) {
    super();

    this._shape = shape;

    this._attrPos = new THREE.BufferAttribute(new Float32Array(6 * 3), 3);
    this.setAttribute('position', this._attrPos);

    this._attrIndex = new THREE.BufferAttribute(new Uint16Array(10), 1);
    this.setIndex(this._attrIndex);

    this._buildIndex();
    this.update();
  }

  public update(): void {
    let shouldUpdateGeometry = false;

    if (!this._currentOffset.equals(this._shape.offset)) {
      this._currentOffset.copy(this._shape.offset);
      shouldUpdateGeometry = true;
    }

    if (!this._currentNormal.equals(this._shape.normal)) {
      this._currentNormal.copy(this._shape.normal);
      shouldUpdateGeometry = true;
    }

    if (shouldUpdateGeometry) {
      this._buildPosition();
    }
  }

  private _buildPosition(): void {
    this._attrPos.setXYZ(0, -0.5, -0.5, 0);
    this._attrPos.setXYZ(1, 0.5, -0.5, 0);
    this._attrPos.setXYZ(2, 0.5, 0.5, 0);
    this._attrPos.setXYZ(3, -0.5, 0.5, 0);
    this._attrPos.setXYZ(4, 0, 0, 0);
    this._attrPos.setXYZ(5, 0, 0, 0.25);

    this.translate(this._currentOffset.x, this._currentOffset.y, this._currentOffset.z);
    this.lookAt(this._currentNormal);

    this._attrPos.needsUpdate = true;
  }

  private _buildIndex(): void {
    this._attrIndex.setXY(0, 0, 1);
    this._attrIndex.setXY(2, 1, 2);
    this._attrIndex.setXY(4, 2, 3);
    this._attrIndex.setXY(6, 3, 0);
    this._attrIndex.setXY(8, 4, 5);

    this._attrIndex.needsUpdate = true;
  }
}
