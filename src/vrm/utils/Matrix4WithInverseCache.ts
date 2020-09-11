import * as THREE from 'three';

export class Matrix4WithInverseCache extends THREE.Matrix4 {
  public constructor() {
    super();
  }

  /**
   * Inverse of this matrix.
   * Note that it will return its internal private instance.
   * Make sure copying this before mutate this.
   */
  public get inverse(): THREE.Matrix4 {
    if (this._shouldUpdateInverse) {
      this._inverseCache.getInverse(this);
      this._shouldUpdateInverse = false;
    }

    return this._inverseCache;
  }

  /**
   * A cache of inverse of current matrix.
   */
  private _inverseCache = new THREE.Matrix4();

  /**
   * A flag that makes it want to recalculate its {@link _inverseCache}.
   * Will be set `true` when `elements` are mutated and be used in `getInverse`.
   */
  private _shouldUpdateInverse = false;

  set(
    n11: number,
    n12: number,
    n13: number,
    n14: number,
    n21: number,
    n22: number,
    n23: number,
    n24: number,
    n31: number,
    n32: number,
    n33: number,
    n34: number,
    n41: number,
    n42: number,
    n43: number,
    n44: number,
  ): this {
    super.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);

    this._shouldUpdateInverse = true;

    return this;
  }

  /**
   * Resets this matrix to identity.
   */
  identity(): this {
    super.identity();

    this._shouldUpdateInverse = true;

    return this;
  }

  copy(m: THREE.Matrix4): this {
    super.copy(m);

    this._shouldUpdateInverse = true;

    return this;
  }

  copyPosition(m: THREE.Matrix4): this {
    super.copyPosition(m);

    this._shouldUpdateInverse = true;

    return this;
  }

  extractRotation(m: THREE.Matrix4): this {
    super.extractRotation(m);

    this._shouldUpdateInverse = true;

    return this;
  }

  makeRotationFromEuler(euler: THREE.Euler): this {
    super.makeRotationFromEuler(euler);

    this._shouldUpdateInverse = true;

    return this;
  }

  lookAt(eye: THREE.Vector3, target: THREE.Vector3, up: THREE.Vector3): this {
    super.lookAt(eye, target, up);

    this._shouldUpdateInverse = true;

    return this;
  }

  multiplyMatrices(a: THREE.Matrix4, b: THREE.Matrix4): this {
    super.multiplyMatrices(a, b);

    this._shouldUpdateInverse = true;

    return this;
  }

  multiplyScalar(s: number): this {
    super.multiplyScalar(s);

    this._shouldUpdateInverse = true;

    return this;
  }

  transpose(): this {
    super.transpose();

    this._shouldUpdateInverse = true;

    return this;
  }

  setPosition(v: THREE.Vector3 | number, y?: number, z?: number): this {
    super.setPosition(v, y, z);

    this._shouldUpdateInverse = true;

    return this;
  }

  getInverse(m: THREE.Matrix4): this {
    super.getInverse(m);

    this._shouldUpdateInverse = true;

    return this;
  }

  scale(v: THREE.Vector3): this {
    super.scale(v);

    this._shouldUpdateInverse = true;

    return this;
  }

  compose(translation: THREE.Vector3, rotation: THREE.Quaternion, scale: THREE.Vector3): this {
    super.compose(translation, rotation, scale);

    this._shouldUpdateInverse = true;

    return this;
  }

  makePerspective(fov: number, aspect: number, near: number, far: number): this {
    super.makePerspective(fov, aspect, near, far);

    this._shouldUpdateInverse = true;

    return this;
  }

  makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): this {
    super.makeOrthographic(left, right, top, bottom, near, far);

    this._shouldUpdateInverse = true;

    return this;
  }

  fromArray(array: number[], offset?: number): this {
    super.fromArray(array, offset);

    this._shouldUpdateInverse = true;

    return this;
  }
}
