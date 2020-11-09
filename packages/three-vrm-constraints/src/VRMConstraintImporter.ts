import * as ConstraintSchema from '@pixiv/types-vrmc-constraints-1.0';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMAimConstraint } from './VRMAimConstraint';
import { VRMConstraintManager } from './VRMConstraintManager';
import { VRMPositionConstraint } from './VRMPositionConstraint';
import { VRMRotationConstraint } from './VRMRotationConstraint';

export class VRMConstraintImporter {
  /**
   * Create a new VRMConstraintImporter.
   */
  constructor() {
    // do nothing
  }

  /**
   * Import constraints from a GLTF and returns a {@link VRMConstraintManager}.
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  public async import(gltf: GLTF): Promise<VRMConstraintManager | null> {
    // early abort if it doesn't use constraints
    const isConstraintsUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_constraints-1.0') !== -1;
    if (!isConstraintsUsed) {
      return null;
    }

    const manager = new VRMConstraintManager();
    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    // import constraints for each nodes
    threeNodes.forEach((node) => {
      const extension: ConstraintSchema.Constraints | undefined = node.userData?.gltfExtensions?.['VRMC_constraints-1.0'];

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

  private _importPositionConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], modelRoot: THREE.Object3D, position: ConstraintSchema.PositionConstraint): VRMPositionConstraint {
    const { source, sourceSpace, destinationSpace, weight, freezeAxes } = position;
    const constraint = new VRMPositionConstraint(destination, modelRoot);

    constraint.setSource(nodes[source]);

    if ( sourceSpace ) {constraint.sourceSpace=sourceSpace;}
    if ( destinationSpace ) {constraint.destinationSpace=destinationSpace;}
    if ( weight ) {constraint.weight=weight;}
    if ( freezeAxes ) {constraint.freezeAxes=freezeAxes;}

    return constraint;
  }

  private _importRotationConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], modelRoot: THREE.Object3D, rotation: ConstraintSchema.RotationConstraint): VRMRotationConstraint {
    const { source, sourceSpace, destinationSpace, weight, freezeAxes } = rotation;
    const constraint = new VRMRotationConstraint(destination, modelRoot);

    constraint.setSource(nodes[source]);

    if ( sourceSpace ) {constraint.sourceSpace=sourceSpace;}
    if ( destinationSpace ) {constraint.destinationSpace=destinationSpace;}
    if ( weight ) {constraint.weight=weight;}
    if ( freezeAxes ) {constraint.freezeAxes=freezeAxes;}

    return constraint;
  }

  private _importAimConstraint(destination: THREE.Object3D, nodes: THREE.Object3D[], modelRoot: THREE.Object3D, aim: ConstraintSchema.AimConstraint): VRMAimConstraint {
    const { source, aimVector, upVector, sourceSpace, destinationSpace, weight, freezeAxes } = aim;
    const constraint = new VRMAimConstraint(destination, modelRoot);

    constraint.setSource(nodes[source]);

    if (aimVector) {constraint.aimVector.fromArray(aimVector).normalize();}
    if (upVector) {constraint.upVector.fromArray(upVector).normalize();}
    if ( sourceSpace ) {constraint.sourceSpace=sourceSpace;}
    if ( destinationSpace ) {constraint.destinationSpace=destinationSpace;}
    if ( weight ) {constraint.weight=weight;}
    if ( freezeAxes ) {constraint.freezeAxes=freezeAxes;}

    return constraint;
  }
}
