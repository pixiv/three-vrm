import type * as THREE from 'three';
import type { VRMConstraintSource } from './VRMConstraintSource';

export abstract class VRMConstraint {
  protected _object: THREE.Object3D;
  public get object(): THREE.Object3D {
    return this._object;
  }

  protected _sources = new Set<VRMConstraintSource>();

  public get dependencies(): Set<THREE.Object3D> {
    const deps = new Set<THREE.Object3D>();
    for (const source of this._sources) {
      deps.add(source.object);
    }
    return deps;
  }

  public constructor(object: THREE.Object3D) {
    this._object = object;
  }

  public addSource(source: VRMConstraintSource): void {
    this._sources.add(source);
  }

  public deleteSource(source: VRMConstraintSource): void {
    this._sources.delete(source);
  }

  public abstract setInitState(): void;
  public abstract update(): void;
}
