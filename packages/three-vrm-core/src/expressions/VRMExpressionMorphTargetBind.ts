import type * as THREE from 'three';
import type { VRMExpressionBind } from './VRMExpressionBind';

/**
 * A bind of {@link VRMExpression} influences to morph targets.
 */
export class VRMExpressionMorphTargetBind implements VRMExpressionBind {
  /**
   * The mesh primitives that attached to target mesh.
   */
  public readonly primitives: THREE.Mesh[];

  /**
   * The index of the morph target in the mesh.
   */
  public readonly index: number;

  /**
   * The weight value of target morph target. Ranging in [0.0 - 1.0].
   */
  public readonly weight: number;

  public constructor({
    primitives,
    index,
    weight,
  }: {
    /**
     * The mesh primitives that attached to target mesh.
     */
    primitives: THREE.Mesh[];

    /**
     * The index of the morph target in the mesh.
     */
    index: number;

    /**
     * The weight value of target morph target. Ranging in [0.0 - 1.0].
     */
    weight: number;
  }) {
    this.primitives = primitives;
    this.index = index;
    this.weight = weight;
  }

  public applyWeight(weight: number): void {
    this.primitives.forEach((mesh) => {
      if (mesh.morphTargetInfluences?.[this.index] != null) {
        mesh.morphTargetInfluences[this.index] += this.weight * weight;
      }
    });
  }

  public clearAppliedWeight(): void {
    this.primitives.forEach((mesh) => {
      if (mesh.morphTargetInfluences?.[this.index] != null) {
        mesh.morphTargetInfluences[this.index] = 0.0;
      }
    });
  }
}
