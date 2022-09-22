import * as THREE from 'three';
import { VRMNodeConstraint } from '../VRMNodeConstraint';

export class VRMMockedConstraint extends VRMNodeConstraint {
  public dependencies: Set<THREE.Object3D<THREE.Event>>;

  public onSetInitState?: () => void;
  public onUpdate?: () => void;

  public constructor(destination: THREE.Object3D, source: THREE.Object3D) {
    super(destination, source);

    this.dependencies = new Set();
  }

  public setInitState(): void {
    this.onSetInitState?.();
  }

  public update(): void {
    this.onUpdate?.();
  }
}
