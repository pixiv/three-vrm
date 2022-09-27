import * as THREE from 'three';
import { quatInvertCompat } from './utils/quatInvertCompat';
import { VRMNodeConstraint } from './VRMNodeConstraint';

const _v3A = new THREE.Vector3();
const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();

/**
 * A constraint that transfers a rotation around one axis of a source.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
export class VRMRollConstraint extends VRMNodeConstraint {
  /**
   * The roll axis of the constraint.
   */
  public get rollAxis(): 'X' | 'Y' | 'Z' {
    return this._rollAxis;
  }

  /**
   * The roll axis of the constraint.
   */
  public set rollAxis(rollAxis: 'X' | 'Y' | 'Z') {
    this._rollAxis = rollAxis;
    this._v3RollAxis.set(rollAxis === 'X' ? 1.0 : 0.0, rollAxis === 'Y' ? 1.0 : 0.0, rollAxis === 'Z' ? 1.0 : 0.0);
  }

  /**
   * The roll axis of the constraint.
   */
  private _rollAxis: 'X' | 'Y' | 'Z';

  /**
   * The {@link _rollAxis} but in an actual Vector3 form.
   */
  private _v3RollAxis: THREE.Vector3;

  /**
   * The rest quaternion of the {@link destination}.
   */
  private _dstRestQuat: THREE.Quaternion;

  /**
   * The inverse of the rest quaternion of the {@link destination}.
   */
  private _invDstRestQuat: THREE.Quaternion;

  /**
   * `srcRestQuat.invert() * dstRestQuat`.
   */
  private _invSrcRestQuatMulDstRestQuat: THREE.Quaternion;

  public get dependencies(): Set<THREE.Object3D<THREE.Event>> {
    return new Set([this.source]);
  }

  public constructor(destination: THREE.Object3D, source: THREE.Object3D) {
    super(destination, source);

    this._rollAxis = 'X';
    this._v3RollAxis = new THREE.Vector3(1, 0, 0);

    this._dstRestQuat = new THREE.Quaternion();
    this._invDstRestQuat = new THREE.Quaternion();
    this._invSrcRestQuatMulDstRestQuat = new THREE.Quaternion();
  }

  public setInitState(): void {
    this._dstRestQuat.copy(this.destination.quaternion);
    quatInvertCompat(this._invDstRestQuat.copy(this._dstRestQuat));
    quatInvertCompat(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat);
  }

  public update(): void {
    // calculate the delta rotation from the rest about the source, then convert to the destination local coord
    /**
     * What the quatDelta is intended to be:
     *
     * ```ts
     * const quatSrcDelta = _quatA
     *   .copy( this._invSrcRestQuat )
     *   .multiply( this.source.quaternion );
     * const quatSrcDeltaInParent = _quatB
     *   .copy( this._srcRestQuat )
     *   .multiply( quatSrcDelta )
     *   .multiply( this._invSrcRestQuat );
     * const quatSrcDeltaInDst = _quatA
     *   .copy( this._invDstRestQuat )
     *   .multiply( quatSrcDeltaInParent )
     *   .multiply( this._dstRestQuat );
     * ```
     */
    const quatDelta = _quatA
      .copy(this._invDstRestQuat)
      .multiply(this.source.quaternion)
      .multiply(this._invSrcRestQuatMulDstRestQuat);

    // create a from-to quaternion
    const n1 = _v3A.copy(this._v3RollAxis).applyQuaternion(quatDelta);

    /**
     * What the quatFromTo is intended to be:
     *
     * ```ts
     * const quatFromTo = _quatB.setFromUnitVectors( this._v3RollAxis, n1 ).inverse();
     * ```
     */
    const quatFromTo = _quatB.setFromUnitVectors(n1, this._v3RollAxis);

    // quatFromTo * quatDelta == roll extracted from quatDelta
    const targetQuat = quatFromTo.premultiply(this._dstRestQuat).multiply(quatDelta);

    // blend with the rest quaternion using weight
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
}
