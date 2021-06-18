import * as THREE from 'three';
import { VRMConstraint } from '../VRMConstraint';

const _v3A = new THREE.Vector3();

export class VRMConstraintHelper extends THREE.Group {
  public readonly constraint: VRMConstraint;
  private _line: THREE.Line;
  private _attrPosition: THREE.BufferAttribute;

  public constructor(constraint: VRMConstraint) {
    super();

    this._attrPosition = new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0]), 3);
    this._attrPosition.setUsage(THREE.DynamicDrawUsage);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', this._attrPosition);

    const material = new THREE.LineBasicMaterial({
      color: 0xff00ff,
      depthTest: false,
      depthWrite: false,
    });

    this._line = new THREE.Line(geometry, material);
    this.add(this._line);

    this.constraint = constraint;
  }

  public update(): void {
    _v3A.setFromMatrixPosition(this.constraint.object.matrixWorld);
    this._attrPosition.setXYZ(0, _v3A.x, _v3A.y, _v3A.z);

    if (this.constraint.source) {
      _v3A.setFromMatrixPosition(this.constraint.source.matrixWorld);
    }
    this._attrPosition.setXYZ(1, _v3A.x, _v3A.y, _v3A.z);

    this._attrPosition.needsUpdate = true;
  }
}