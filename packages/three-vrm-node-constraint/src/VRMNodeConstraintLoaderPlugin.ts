import type * as ConstraintSchema from '@pixiv/types-vrmc-node-constraint-1.0';
import type * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMNodeConstraintHelper } from './helpers';
import { VRMAimConstraint } from './VRMAimConstraint';
import type { VRMNodeConstraintLoaderPluginOptions } from './VRMNodeConstraintLoaderPluginOptions';
import { VRMNodeConstraintManager } from './VRMNodeConstraintManager';
import { VRMPositionConstraint } from './VRMPositionConstraint';
import { VRMRotationConstraint } from './VRMRotationConstraint';

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
    // early abort if it doesn't use constraints
    const isConstraintsUsed =
      this.parser.json.extensionsUsed?.indexOf(VRMNodeConstraintLoaderPlugin.EXTENSION_NAME) !== -1;
    if (!isConstraintsUsed) {
      return null;
    }

    const manager = new VRMNodeConstraintManager();
    const threeNodes: THREE.Object3D[] = await this.parser.getDependencies('node');

    // import constraints for each nodes
    threeNodes.forEach((node, nodeIndex) => {
      const schemaNode = this.parser.json.nodes[nodeIndex];

      // check if the extension uses the extension
      const extension: ConstraintSchema.VRMCNodeConstraint | undefined =
        schemaNode?.extensions?.[VRMNodeConstraintLoaderPlugin.EXTENSION_NAME];

      if (extension == null) {
        return;
      }

      const specVersion = extension.specVersion;
      if (specVersion !== '1.0-draft') {
        return;
      }

      // import constraints
      if (extension?.position) {
        const constraint = this._importPositionConstraint(node, threeNodes, gltf.scene, extension.position);
        manager.addConstraint(constraint);
      }

      if (extension?.rotation) {
        const constraint = this._importRotationConstraint(node, threeNodes, gltf.scene, extension.rotation);
        manager.addConstraint(constraint);
      }

      if (extension?.aim) {
        const constraint = this._importAimConstraint(node, threeNodes, gltf.scene, extension.aim);
        manager.addConstraint(constraint);
      }
    });

    // init constraints
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }

  protected _importPositionConstraint(
    destination: THREE.Object3D,
    nodes: THREE.Object3D[],
    modelRoot: THREE.Object3D,
    position: ConstraintSchema.PositionConstraint,
  ): VRMPositionConstraint {
    const { source, sourceSpace, destinationSpace, weight, freezeAxes } = position;
    const constraint = new VRMPositionConstraint(destination, modelRoot);

    constraint.setSource(nodes[source]);

    if (sourceSpace) {
      constraint.sourceSpace = sourceSpace;
    }
    if (destinationSpace) {
      constraint.destinationSpace = destinationSpace;
    }
    if (weight) {
      constraint.weight = weight;
    }
    if (freezeAxes) {
      constraint.freezeAxes = freezeAxes;
    }

    if (this.helperRoot) {
      const helper = new VRMNodeConstraintHelper(constraint);
      this.helperRoot.add(helper);
      helper.renderOrder = this.helperRoot.renderOrder;
    }

    return constraint;
  }

  protected _importRotationConstraint(
    destination: THREE.Object3D,
    nodes: THREE.Object3D[],
    modelRoot: THREE.Object3D,
    rotation: ConstraintSchema.RotationConstraint,
  ): VRMRotationConstraint {
    const { source, sourceSpace, destinationSpace, weight, freezeAxes } = rotation;
    const constraint = new VRMRotationConstraint(destination, modelRoot);

    constraint.setSource(nodes[source]);

    if (sourceSpace) {
      constraint.sourceSpace = sourceSpace;
    }
    if (destinationSpace) {
      constraint.destinationSpace = destinationSpace;
    }
    if (weight) {
      constraint.weight = weight;
    }
    if (freezeAxes) {
      constraint.freezeAxes = freezeAxes;
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
    modelRoot: THREE.Object3D,
    aim: ConstraintSchema.AimConstraint,
  ): VRMAimConstraint {
    const { source, aimVector, upVector, sourceSpace, destinationSpace, weight, freezeAxes } = aim;
    const constraint = new VRMAimConstraint(destination, modelRoot);

    constraint.setSource(nodes[source]);

    if (aimVector) {
      constraint.aimVector.fromArray(aimVector).normalize();
    }
    if (upVector) {
      constraint.upVector.fromArray(upVector).normalize();
    }
    if (sourceSpace) {
      constraint.sourceSpace = sourceSpace;
    }
    if (destinationSpace) {
      constraint.destinationSpace = destinationSpace;
    }
    if (weight) {
      constraint.weight = weight;
    }
    if (freezeAxes) {
      constraint.freezeAxes = freezeAxes;
    }

    if (this.helperRoot) {
      const helper = new VRMNodeConstraintHelper(constraint);
      this.helperRoot.add(helper);
    }

    return constraint;
  }
}
