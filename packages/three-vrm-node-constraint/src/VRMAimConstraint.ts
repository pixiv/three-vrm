import * as THREE from 'three';
import { quatInvertCompat } from './utils/quatInvertCompat';
import { VRMNodeConstraint } from './VRMNodeConstraint';

const _v3A = new THREE.Vector3();
const _v3B = new THREE.Vector3();
const _v3C = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();
const _quatC = new THREE.Quaternion();

/**
 * A constraint that makes it look at a source object.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_draft#roll-constraint
 */
export class VRMAimConstraint extends VRMNodeConstraint {
  /**
   * The aim axis of the constraint.
   */
  public get aimAxis(): '+X' | '-X' | '+Y' | '-Y' | '+Z' | '-Z' {
    return this._aimAxis;
  }

  /**
   * The aim axis of the constraint.
   */
  public set aimAxis(aimAxis: '+X' | '-X' | '+Y' | '-Y' | '+Z' | '-Z') {
    this._aimAxis = aimAxis;
    this._v3AimAxis.set(
      aimAxis === '+X' ? 1.0 : aimAxis === '-X' ? -1.0 : 0.0,
      aimAxis === '+Y' ? 1.0 : aimAxis === '-Y' ? -1.0 : 0.0,
      aimAxis === '+Z' ? 1.0 : aimAxis === '-Z' ? -1.0 : 0.0,
    );
  }

  /**
   * The aim axis of the constraint.
   */
  private _aimAxis: '+X' | '-X' | '+Y' | '-Y' | '+Z' | '-Z';

  /**
   * The {@link _aimAxis} but in an actual Vector3 form.
   */
  private _v3AimAxis: THREE.Vector3;

  /**
   * The rest quaternion of the {@link destination}.
   */
  private _dstRestQuat: THREE.Quaternion;

  public get dependencies(): Set<THREE.Object3D<THREE.Event>> {
    const set = new Set<THREE.Object3D>([this.source]);

    if (this.destination.parent) {
      set.add(this.destination.parent);
    }

    return set;
  }

  public constructor(destination: THREE.Object3D, source: THREE.Object3D) {
    super(destination, source);

    this._aimAxis = '+X';
    this._v3AimAxis = new THREE.Vector3(1, 0, 0);

    this._dstRestQuat = new THREE.Quaternion();
  }

  public setInitState(): void {
    this._dstRestQuat.copy(this.destination.quaternion);
  }

  public update(): void {
    const dstParentWorldQuat = _quatA.identity();
    this.destination.parent?.getWorldQuaternion(dstParentWorldQuat);
    const invDstParentWorldQuat = quatInvertCompat(_quatB.copy(dstParentWorldQuat));

    const a0 = _v3A.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(dstParentWorldQuat);

    const a1 = this.source.getWorldPosition(_v3B).sub(this.destination.getWorldPosition(_v3C)).normalize();

    const targetQuat = _quatC
      .setFromUnitVectors(a0, a1)
      .premultiply(invDstParentWorldQuat)
      .multiply(dstParentWorldQuat)
      .multiply(this._dstRestQuat);

    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
}
