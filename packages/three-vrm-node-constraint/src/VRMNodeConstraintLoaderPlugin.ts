import type * as ConstraintSchema from '@pixiv/types-vrmc-node-constraint-1.0';
import type * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMNodeConstraintHelper } from './helpers';
import type { VRMNodeConstraintLoaderPluginOptions } from './VRMNodeConstraintLoaderPluginOptions';
import { VRMNodeConstraintManager } from './VRMNodeConstraintManager';
import { VRMRotationConstraint } from './VRMRotationConstraint';
import { GLTF as GLTFSchema } from '@gltf-transform/core';
import { VRMAimConstraint } from './VRMAimConstraint';
import { VRMRollConstraint } from './VRMRollConstraint';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

export class VRMNodeConstraintLoaderPlugin implements GLTFLoaderPlugin {
  public static readonly EXTENSION_NAME = 'VRMC_node_constraint';

  /**
   * Specify an Object3D to add {@link VRMNodeConstraintHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  public helperRoot?: THREE.Object3D;

  public readonly parser: GLTFParser;

  public get name(): string {
    return VRMNodeConstraintLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(parser: GLTFParser, options?: VRMNodeConstraintLoaderPluginOptions) {
    this.parser = parser;

    this.helperRoot = options?.helperRoot;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    gltf.userData.vrmNodeConstraintManager = await this._import(gltf);
  }

  /**
   * Import constraints from a GLTF and returns a {@link VRMNodeConstraintManager}.
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  protected async _import(gltf: GLTF): Promise<VRMNodeConstraintManager | null> {
    const json = this.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use constraints
    const isConstraintsUsed = json.extensionsUsed?.indexOf(VRMNodeConstraintLoaderPlugin.EXTENSION_NAME) !== -1;
    if (!isConstraintsUsed) {
      return null;
    }

    const manager = new VRMNodeConstraintManager();
    const threeNodes: THREE.Object3D[] = await this.parser.getDependencies('node');

    // import constraints for each nodes
    threeNodes.forEach((node, nodeIndex) => {
      const schemaNode = json.nodes![nodeIndex];

      // check if the extension uses the extension
      const extension = schemaNode?.extensions?.[VRMNodeConstraintLoaderPlugin.EXTENSION_NAME] as
        | ConstraintSchema.VRMCNodeConstraint
        | undefined;

      if (extension == null) {
        return;
      }

      const specVersion = extension.specVersion;
      if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
        console.warn(
          `VRMNodeConstraintLoaderPlugin: Unknown ${VRMNodeConstraintLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`,
        );
        return;
      }

      const constraintDef = extension.constraint;

      // import constraints
      if (constraintDef.roll != null) {
        const constraint = this._importRollConstraint(node, threeNodes, constraintDef.roll);
        manager.addConstraint(constraint);
      } else if (constraintDef.aim != null) {
        const constraint = this._importAimConstraint(node, threeNodes, constraintDef.aim);
        manager.addConstraint(constraint);
      } else if (constraintDef.rotation != null) {
        const constraint = this._importRotationConstraint(node, threeNodes, constraintDef.rotation);
        manager.addConstraint(constraint);
      }
    });

    // init constraints
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }

  protected _importRollConstraint(
    destination: THREE.Object3D,
    nodes: THREE.Object3D[],
    rollConstraintDef: ConstraintSchema.RollConstraint,
  ): VRMRollConstraint {
    const { source: sourceIndex, rollAxis, weight } = rollConstraintDef;
    const source = nodes[sourceIndex];
    const constraint = new VRMRollConstraint(destination, source);

    if (rollAxis != null) {
      constraint.rollAxis = rollAxis;
    }
    if (weight != null) {
      constraint.weight = weight;
    }

    if (this.helperRoot) {
      const helper = new VRMNodeConstraintHelper(constraint);
      this.helperRoot.add(helper);
    }

    return constraint;
  }

  protected _importAimConstraint(
    destination: THREE.Object3D,
    nodes: THREE.Object3D[],
    aimConstraintDef: ConstraintSchema.AimConstraint,
  ): VRMAimConstraint {
    const { source: sourceIndex, aimAxis, weight } = aimConstraintDef;
    const source = nodes[sourceIndex];
    const constraint = new VRMAimConstraint(destination, source);

    if (aimAxis != null) {
      constraint.aimAxis = aimAxis;
    }
    if (weight != null) {
      constraint.weight = weight;
    }

    if (this.helperRoot) {
      const helper = new VRMNodeConstraintHelper(constraint);
      this.helperRoot.add(helper);
    }

    return constraint;
  }

  protected _importRotationConstraint(
    destination: THREE.Object3D,
    nodes: THREE.Object3D[],
    rotationConstraintDef: ConstraintSchema.RotationConstraint,
  ): VRMRotationConstraint {
    const { source: sourceIndex, weight } = rotationConstraintDef;
    const source = nodes[sourceIndex];
    const constraint = new VRMRotationConstraint(destination, source);

    if (weight != null) {
      constraint.weight = weight;
    }

    if (this.helperRoot) {
      const helper = new VRMNodeConstraintHelper(constraint);
      this.helperRoot.add(helper);
    }

    return constraint;
  }
}
