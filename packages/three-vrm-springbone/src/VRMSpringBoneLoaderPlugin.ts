import type * as V0VRM from '@pixiv/types-vrm-0.0';
import type * as V1SpringBoneSchema from '@pixiv/types-vrmc-springbone-1.0';
import * as THREE from 'three';
import type { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMSpringBoneColliderHelper, VRMSpringBoneJointHelper } from './helpers';
import { VRMSpringBoneCollider } from './VRMSpringBoneCollider';
import type { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import { VRMSpringBoneColliderShapeCapsule } from './VRMSpringBoneColliderShapeCapsule';
import { VRMSpringBoneColliderShapeSphere } from './VRMSpringBoneColliderShapeSphere';
import { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import type { VRMSpringBoneLoaderPluginOptions } from './VRMSpringBoneLoaderPluginOptions';
import { VRMSpringBoneManager } from './VRMSpringBoneManager';
import type { VRMSpringBoneJointSettings } from './VRMSpringBoneJointSettings';
import { GLTF as GLTFSchema } from '@gltf-transform/core';

/**
 * Possible spec versions it recognizes.
 */
const POSSIBLE_SPEC_VERSIONS = new Set(['1.0', '1.0-beta']);

export class VRMSpringBoneLoaderPlugin implements GLTFLoaderPlugin {
  public static readonly EXTENSION_NAME = 'VRMC_springBone';

  /**
   * Specify an Object3D to add {@link VRMSpringBoneJointHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  public jointHelperRoot?: THREE.Object3D;

  /**
   * Specify an Object3D to add {@link VRMSpringBoneJointHelper} s.
   * If not specified, helper will not be created.
   * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
   */
  public colliderHelperRoot?: THREE.Object3D;

  public readonly parser: GLTFParser;

  public get name(): string {
    return VRMSpringBoneLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(parser: GLTFParser, options?: VRMSpringBoneLoaderPluginOptions) {
    this.parser = parser;

    this.jointHelperRoot = options?.jointHelperRoot;
    this.colliderHelperRoot = options?.colliderHelperRoot;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    gltf.userData.vrmSpringBoneManager = await this._import(gltf);
  }

  /**
   * Import spring bones from a GLTF and return a {@link VRMSpringBoneManager}.
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  private async _import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
    const v1Result = await this._v1Import(gltf);
    if (v1Result != null) {
      return v1Result;
    }

    const v0Result = await this._v0Import(gltf);
    if (v0Result != null) {
      return v0Result;
    }

    return null;
  }

  private async _v1Import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
    const json = gltf.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use spring bones
    const isSpringBoneUsed = json.extensionsUsed?.indexOf(VRMSpringBoneLoaderPlugin.EXTENSION_NAME) !== -1;
    if (!isSpringBoneUsed) {
      return null;
    }

    const manager = new VRMSpringBoneManager();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    const extension = json.extensions?.[VRMSpringBoneLoaderPlugin.EXTENSION_NAME] as
      | V1SpringBoneSchema.VRMCSpringBone
      | undefined;
    if (!extension) {
      return null;
    }

    const specVersion = extension.specVersion;
    if (!POSSIBLE_SPEC_VERSIONS.has(specVersion)) {
      console.warn(
        `VRMSpringBoneLoaderPlugin: Unknown ${VRMSpringBoneLoaderPlugin.EXTENSION_NAME} specVersion "${specVersion}"`,
      );
      return null;
    }

    const colliders = extension.colliders?.map((schemaCollider, iCollider) => {
      const node = threeNodes[schemaCollider.node!];
      const schemaShape = schemaCollider.shape!;

      if (schemaShape.sphere) {
        return this._importSphereCollider(node, {
          offset: new THREE.Vector3().fromArray(schemaShape.sphere.offset ?? [0.0, 0.0, 0.0]),
          radius: schemaShape.sphere.radius ?? 0.0,
        });
      } else if (schemaShape.capsule) {
        return this._importCapsuleCollider(node, {
          offset: new THREE.Vector3().fromArray(schemaShape.capsule.offset ?? [0.0, 0.0, 0.0]),
          radius: schemaShape.capsule.radius ?? 0.0,
          tail: new THREE.Vector3().fromArray(schemaShape.capsule.tail ?? [0.0, 0.0, 0.0]),
        });
      }

      throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${iCollider} has no valid shape`);
    });

    const colliderGroups = extension.colliderGroups?.map(
      (schemaColliderGroup, iColliderGroup): VRMSpringBoneColliderGroup => {
        const cols = (schemaColliderGroup.colliders ?? []).map((iCollider) => {
          const col = colliders?.[iCollider];

          if (col == null) {
            throw new Error(
              `VRMSpringBoneLoaderPlugin: The colliderGroup #${iColliderGroup} attempted to use a collider #${iCollider} but not found`,
            );
          }

          return col;
        });

        return {
          colliders: cols,
          name: schemaColliderGroup.name,
        };
      },
    );

    extension.springs?.forEach((schemaSpring, iSpring) => {
      const schemaJoints = schemaSpring.joints;

      // prepare colliders
      const colliderGroupsForSpring = schemaSpring.colliderGroups?.map((iColliderGroup) => {
        const group = colliderGroups?.[iColliderGroup];

        if (group == null) {
          throw new Error(
            `VRMSpringBoneLoaderPlugin: The spring #${iSpring} attempted to use a colliderGroup ${iColliderGroup} but not found`,
          );
        }

        return group;
      });

      const center = schemaSpring.center != null ? threeNodes[schemaSpring.center] : undefined;

      let prevSchemaJoint: V1SpringBoneSchema.SpringBoneJoint | undefined;
      schemaJoints.forEach((schemaJoint) => {
        if (prevSchemaJoint) {
          // prepare node
          const nodeIndex = prevSchemaJoint.node;
          const node = threeNodes[nodeIndex];
          const childIndex = schemaJoint.node;
          const child = threeNodes[childIndex];

          // prepare setting
          const setting: Partial<VRMSpringBoneJointSettings> = {
            hitRadius: prevSchemaJoint.hitRadius,
            dragForce: prevSchemaJoint.dragForce,
            gravityPower: prevSchemaJoint.gravityPower,
            stiffness: prevSchemaJoint.stiffness,
            gravityDir:
              prevSchemaJoint.gravityDir != null
                ? new THREE.Vector3().fromArray(prevSchemaJoint.gravityDir)
                : undefined,
          };

          // create spring bones
          const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
          if (center) {
            joint.center = center;
          }

          manager.addJoint(joint);
        }

        prevSchemaJoint = schemaJoint;
      });
    });

    // init spring bones
    manager.setInitState();

    return manager;
  }

  private async _v0Import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
    const json = gltf.parser.json as GLTFSchema.IGLTF;

    // early abort if it doesn't use vrm
    const isVRMUsed = json.extensionsUsed?.indexOf('VRM') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    // early abort if it doesn't have bone groups
    const extension = json.extensions?.['VRM'] as V0VRM.VRM | undefined;
    const schemaSecondaryAnimation = extension?.secondaryAnimation;
    if (!schemaSecondaryAnimation) {
      return null;
    }

    const schemaBoneGroups = schemaSecondaryAnimation?.boneGroups;
    if (!schemaBoneGroups) {
      return null;
    }

    const manager = new VRMSpringBoneManager();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    const colliderGroups = schemaSecondaryAnimation.colliderGroups?.map(
      (schemaColliderGroup): VRMSpringBoneColliderGroup => {
        const node = threeNodes[schemaColliderGroup.node!];
        const colliders = (schemaColliderGroup.colliders ?? []).map((schemaCollider, iCollider) => {
          const offset = new THREE.Vector3(0.0, 0.0, 0.0);
          if (schemaCollider.offset) {
            offset.set(
              schemaCollider.offset.x ?? 0.0,
              schemaCollider.offset.y ?? 0.0,
              schemaCollider.offset.z ? -schemaCollider.offset.z : 0.0, // z is opposite in VRM0.0
            );
          }

          return this._importSphereCollider(node, {
            offset,
            radius: schemaCollider.radius ?? 0.0,
          });
        });

        return { colliders };
      },
    );

    // import spring bones for each spring bone groups
    schemaBoneGroups?.forEach((schemaBoneGroup, iBoneGroup) => {
      const rootIndices = schemaBoneGroup.bones;
      if (!rootIndices) {
        return;
      }

      rootIndices.forEach((rootIndex) => {
        const root = threeNodes[rootIndex];

        // prepare setting
        const gravityDir = new THREE.Vector3();
        if (schemaBoneGroup.gravityDir) {
          gravityDir.set(
            schemaBoneGroup.gravityDir.x ?? 0.0,
            schemaBoneGroup.gravityDir.y ?? 0.0,
            schemaBoneGroup.gravityDir.z ?? 0.0,
          );
        } else {
          gravityDir.set(0.0, -1.0, 0.0);
        }

        const center = schemaBoneGroup.center != null ? threeNodes[schemaBoneGroup.center] : undefined;

        const setting: Partial<VRMSpringBoneJointSettings> = {
          hitRadius: schemaBoneGroup.hitRadius,
          dragForce: schemaBoneGroup.dragForce,
          gravityPower: schemaBoneGroup.gravityPower,
          stiffness: schemaBoneGroup.stiffiness,
          gravityDir,
        };

        // prepare colliders
        const colliderGroupsForSpring = schemaBoneGroup.colliderGroups?.map((iColliderGroup) => {
          const group = colliderGroups?.[iColliderGroup];

          if (group == null) {
            throw new Error(
              `VRMSpringBoneLoaderPlugin: The spring #${iBoneGroup} attempted to use a colliderGroup ${iColliderGroup} but not found`,
            );
          }

          return group;
        });

        // create spring bones
        root.traverse((node) => {
          const child: THREE.Object3D | null = node.children[0] ?? null;

          const joint = this._importJoint(node, child, setting, colliderGroupsForSpring);
          if (center) {
            joint.center = center;
          }

          manager.addJoint(joint);
        });
      });
    });

    // init spring bones
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }

  private _importJoint(
    node: THREE.Object3D,
    child: THREE.Object3D,
    setting?: Partial<VRMSpringBoneJointSettings>,
    colliderGroupsForSpring?: VRMSpringBoneColliderGroup[],
  ): VRMSpringBoneJoint {
    const springBone = new VRMSpringBoneJoint(node, child, setting, colliderGroupsForSpring);

    if (this.jointHelperRoot) {
      const helper = new VRMSpringBoneJointHelper(springBone);
      this.jointHelperRoot.add(helper);
      helper.renderOrder = this.jointHelperRoot.renderOrder;
    }

    return springBone;
  }

  private _importSphereCollider(
    destination: THREE.Object3D,
    params: {
      offset: THREE.Vector3;
      radius: number;
    },
  ): VRMSpringBoneCollider {
    const { offset, radius } = params;

    const shape = new VRMSpringBoneColliderShapeSphere({ offset, radius });

    const collider = new VRMSpringBoneCollider(shape);

    destination.add(collider);

    if (this.colliderHelperRoot) {
      const helper = new VRMSpringBoneColliderHelper(collider);
      this.colliderHelperRoot.add(helper);
      helper.renderOrder = this.colliderHelperRoot.renderOrder;
    }

    return collider;
  }

  private _importCapsuleCollider(
    destination: THREE.Object3D,
    params: {
      offset: THREE.Vector3;
      radius: number;
      tail: THREE.Vector3;
    },
  ): VRMSpringBoneCollider {
    const { offset, radius, tail } = params;

    const shape = new VRMSpringBoneColliderShapeCapsule({ offset, radius, tail });

    const collider = new VRMSpringBoneCollider(shape);

    destination.add(collider);

    if (this.colliderHelperRoot) {
      const helper = new VRMSpringBoneColliderHelper(collider);
      this.colliderHelperRoot.add(helper);
      helper.renderOrder = this.colliderHelperRoot.renderOrder;
    }

    return collider;
  }
}
