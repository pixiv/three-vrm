import * as THREE from 'three';
import { quatInvertCompat } from './utils/quatInvertCompat';
import { VRMNodeConstraint } from './VRMNodeConstraint';

const _quatA = new THREE.Quaternion();
const _quatB = new THREE.Quaternion();

/**
 * A constraint that transfers a rotation around one axis of a source.
 *
 * See: https://github.com/vrm-c/vrm-specification/tree/master/specification/VRMC_node_constraint-1.0_beta#roll-constraint
 */
export class VRMRotationConstraint extends VRMNodeConstraint {
  /**
   * The rest quaternion of the {@link destination}.
   */
  private _dstRestQuat: THREE.Quaternion;

  /**
   * The inverse of the rest quaternion of the {@link source}.
   */
  private _invSrcRestQuat: THREE.Quaternion;

  public get dependencies(): Set<THREE.Object3D<THREE.Event>> {
    return new Set([this.source]);
  }

  public constructor(destination: THREE.Object3D, source: THREE.Object3D) {
    super(destination, source);

    this._dstRestQuat = new THREE.Quaternion();
    this._invSrcRestQuat = new THREE.Quaternion();
  }

  public setInitState(): void {
    this._dstRestQuat.copy(this.destination.quaternion);
    quatInvertCompat(this._invSrcRestQuat.copy(this.source.quaternion));
  }

  public update(): void {
    // calculate the delta rotation from the rest about the source
    const srcDeltaQuat = _quatA.copy(this._invSrcRestQuat).multiply(this.source.quaternion);

    // multiply the delta to the rest of the destination
    const targetQuat = _quatB.copy(this._dstRestQuat).multiply(srcDeltaQuat);

    // blend with the rest quaternion using weight
    this.destination.quaternion.copy(this._dstRestQuat).slerp(targetQuat, this.weight);
  }
}
