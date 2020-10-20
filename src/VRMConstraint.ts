import type * as THREE from 'three';

export abstract class VRMConstraint {
  public weight = 1.0;

  protected _object: THREE.Object3D;
  public get object(): THREE.Object3D {
    return this._object;
  }

  protected _source?: THREE.Object3D | null;

  public get dependencies(): Set<THREE.Object3D> {
    const deps = new Set<THREE.Object3D>();
    this._source && deps.add(this._source);
    return deps;
  }

  public constructor(object: THREE.Object3D) {
    this._object = object;
  }

  public setSource(source: THREE.Object3D | null): void {
    this._source = source;
  }

  public abstract setInitState(): void;
  public abstract update(): void;
}
