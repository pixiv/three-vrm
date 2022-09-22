import * as THREE from 'three';
import { VRMNodeConstraint } from '../VRMNodeConstraint';

const _v3A = new THREE.Vector3();

export class VRMNodeConstraintHelper extends THREE.Group {
  public readonly constraint: VRMNodeConstraint;
  private _line: THREE.Line;
  private _attrPosition: THREE.BufferAttribute;

  public constructor(constraint: VRMNodeConstraint) {
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

  public updateMatrixWorld(force?: boolean): void {
    _v3A.setFromMatrixPosition(this.constraint.destination.matrixWorld);
    this._attrPosition.setXYZ(0, _v3A.x, _v3A.y, _v3A.z);

    if (this.constraint.source) {
      _v3A.setFromMatrixPosition(this.constraint.source.matrixWorld);
    }
    this._attrPosition.setXYZ(1, _v3A.x, _v3A.y, _v3A.z);

    this._attrPosition.needsUpdate = true;

    super.updateMatrixWorld(force);
  }
}
