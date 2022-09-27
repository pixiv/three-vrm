import * as THREE from 'three';
import { decomposePosition } from './utils/decomposePosition';
import { decomposeRotation } from './utils/decomposeRotation';
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
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
export class VRMAimConstraint extends VRMNodeConstraint {
  /**
   * The aim axis of the constraint.
   */
  public get aimAxis(): 'PositiveX' | 'NegativeX' | 'PositiveY' | 'NegativeY' | 'PositiveZ' | 'NegativeZ' {
    return this._aimAxis;
  }

  /**
   * The aim axis of the constraint.
   */
  public set aimAxis(aimAxis: 'PositiveX' | 'NegativeX' | 'PositiveY' | 'NegativeY' | 'PositiveZ' | 'NegativeZ') {
    this._aimAxis = aimAxis;
    this._v3AimAxis.set(
      aimAxis === 'PositiveX' ? 1.0 : aimAxis === 'NegativeX' ? -1.0 : 0.0,
      aimAxis === 'PositiveY' ? 1.0 : aimAxis === 'NegativeY' ? -1.0 : 0.0,
      aimAxis === 'PositiveZ' ? 1.0 : aimAxis === 'NegativeZ' ? -1.0 : 0.0,
    );
  }

  /**
   * The aim axis of the constraint.
   */
  private _aimAxis: 'PositiveX' | 'NegativeX' | 'PositiveY' | 'NegativeY' | 'PositiveZ' | 'NegativeZ';

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

    this._aimAxis = 'PositiveX';
    this._v3AimAxis = new THREE.Vector3(1, 0, 0);

    this._dstRestQuat = new THREE.Quaternion();
  }

  public setInitState(): void {
    this._dstRestQuat.copy(this.destination.quaternion);
  }

  public update(): void {
    // update world matrix of destination and source manually
    this.destination.updateWorldMatrix(true, false);
    this.source.updateWorldMatrix(true, false);

    // get world quaternion of the parent of the destination
    const dstParentWorldQuat = _quatA.identity();
    const invDstParentWorldQuat = _quatB.identity();
    if (this.destination.parent) {
      decomposeRotation(this.destination.parent.matrixWorld, dstParentWorldQuat);
      quatInvertCompat(invDstParentWorldQuat.copy(dstParentWorldQuat));
    }

    // calculate from-to vectors in world coord
    const a0 = _v3A.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(dstParentWorldQuat);
    const a1 = decomposePosition(this.source.matrixWorld, _v3B)
      .sub(decomposePosition(this.destination.matrixWorld, _v3C))
      .normalize();

    // create a from-to quaternion, convert to destination local coord, then multiply rest quaternion
    const targetQuat = _quatC
      .setFromUnitVectors(a0, a1)
      .premultiply(invDstParentWorldQuat)
      .multiply(dstParentWorldQuat)
      .multiply(this._dstRestQuat);

    // blend with the rest quaternion using weight
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
}
