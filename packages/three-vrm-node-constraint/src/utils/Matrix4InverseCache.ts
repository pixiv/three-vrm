import * as THREE from 'three';
import { mat4InvertCompat } from './mat4InvertCompat';

export class Matrix4InverseCache {
  /**
   * The target matrix.
   */
  public readonly matrix: THREE.Matrix4;

  /**
   * A cache of inverse of current matrix.
   */
  private readonly _inverseCache = new THREE.Matrix4();

  /**
   * A flag that makes it want to recalculate its {@link _inverseCache}.
   * Will be set `true` when `elements` are mutated and be used in `getInverse`.
   */
  private _shouldUpdateInverse = true;

  /**
   * The original of `matrix.elements`
   */
  private readonly _originalElements: number[];

  /**
   * Inverse of given matrix.
   * Note that it will return its internal private instance.
   * Make sure copying this before mutate this.
   */
  public get inverse(): THREE.Matrix4 {
    if (this._shouldUpdateInverse) {
      this._inverseCache.copy(this.matrix);
      mat4InvertCompat(this._inverseCache);
      this._shouldUpdateInverse = false;
    }

    return this._inverseCache;
  }

  public constructor(matrix: THREE.Matrix4) {
    this.matrix = matrix;

    const handler: ProxyHandler<number[]> = {
      set: (obj, prop: number, newVal) => {
        this._shouldUpdateInverse = true;
        obj[prop] = newVal;

        return true;
      },
    };

    this._originalElements = matrix.elements;
    matrix.elements = new Proxy(matrix.elements, handler);
  }

  public revert(): void {
    this.matrix.elements = this._originalElements;
  }
}
