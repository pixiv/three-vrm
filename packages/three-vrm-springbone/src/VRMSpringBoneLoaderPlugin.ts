import * as V0VRM from '@pixiv/types-vrm-0.0';
import * as V1SpringBoneSchema from '@pixiv/types-vrmc-springbone-1.0';
import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMSpringBoneCollider } from './VRMSpringBoneCollider';
import { VRMSpringBoneColliderGroup } from './VRMSpringBoneColliderGroup';
import { VRMSpringBoneColliderShapeCapsule } from './VRMSpringBoneColliderShapeCapsule';
import { VRMSpringBoneColliderShapeSphere } from './VRMSpringBoneColliderShapeSphere';
import { VRMSpringBoneJoint } from './VRMSpringBoneJoint';
import { VRMSpringBoneManager } from './VRMSpringBoneManager';
import { VRMSpringBoneSettings } from './VRMSpringBoneSettings';

export class VRMSpringBoneLoaderPlugin implements GLTFLoaderPlugin {
  public static readonly EXTENSION_NAME = 'VRMC_springBone';

  public readonly parser: GLTFParser;

  public get name(): string {
    return VRMSpringBoneLoaderPlugin.EXTENSION_NAME;
  }

  public constructor(parser: GLTFParser) {
    this.parser = parser;
  }

  public async afterRoot(gltf: GLTF): Promise<void> {
    // this might be called twice or more by its dependants!

    if (gltf.userData.promiseVrmSpringBoneManager == null) {
      gltf.userData.promiseVrmSpringBoneManager = (async () => {
        // load the lookAt
        return await this._import(gltf);
      })();

      gltf.userData.vrmSpringBoneManager = await gltf.userData.promiseVrmSpringBoneManager;
    }

    await gltf.userData.promiseVrmSpringBoneManager;
  }

  /**
   * Import spring bones from a GLTF and return a {@link VRMSpringBoneManager}.
   * It might return `null` instead when it does not need to be created or something go wrong.
   *
   * @param gltf A parsed result of GLTF taken from GLTFLoader
   */
  protected async _import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
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

  protected async _v1Import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
    // early abort if it doesn't use spring bones
    const isSpringBoneUsed = gltf.parser.json.extensionsUsed.indexOf('VRMC_springBone-1.0') !== -1;
    if (!isSpringBoneUsed) {
      return null;
    }

    const manager = new VRMSpringBoneManager();

    const threeNodes: THREE.Object3D[] = await gltf.parser.getDependencies('node');

    const extension: V1SpringBoneSchema.SpringBone | undefined = gltf.parser.json.extensions?.['VRMC_springBone-1.0'];
    if (!extension) {
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

      let prevJoint: V1SpringBoneSchema.SpringBoneJoint | undefined;
      schemaJoints.forEach((joint) => {
        if (prevJoint) {
          // prepare node
          const nodeIndex = prevJoint.node;
          const node = threeNodes[nodeIndex];
          const childIndex = joint.node;
          const child = threeNodes[childIndex];

          // prepare setting
          const setting: Partial<VRMSpringBoneSettings> = {
            hitRadius: prevJoint.hitRadius,
            dragForce: prevJoint.dragForce,
            gravityPower: prevJoint.gravityPower,
            stiffness: prevJoint.stiffness,
            gravityDir: new THREE.Vector3().fromArray(prevJoint.gravityDir ?? [0.0, 1.0, 0.0]),
          };

          // create spring bones
          const spring = new VRMSpringBoneJoint(node, child, setting, colliderGroupsForSpring);
          manager.addSpringBone(spring);
        }

        prevJoint = joint;
      });
    });

    // init spring bones
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }

  protected async _v0Import(gltf: GLTF): Promise<VRMSpringBoneManager | null> {
    // early abort if it doesn't use vrm
    const isVRMUsed = gltf.parser.json.extensionsUsed.indexOf('VRM') !== -1;
    if (!isVRMUsed) {
      return null;
    }

    // early abort if it doesn't have bone groups
    const extension: V0VRM.VRM | undefined = gltf.parser.json.extensions?.['VRM'];
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
            offset.set(schemaCollider.offset.x ?? 0.0, schemaCollider.offset.y ?? 0.0, schemaCollider.offset.z ?? 0.0);
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
        const setting: Partial<VRMSpringBoneSettings> = {
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
          const spring = new VRMSpringBoneJoint(node, child, setting, colliderGroupsForSpring);
          manager.addSpringBone(spring);
        });
      });
    });

    // init spring bones
    gltf.scene.updateMatrixWorld();
    manager.setInitState();

    return manager;
  }

  protected _importSphereCollider(
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

    return collider;
  }

  protected _importCapsuleCollider(
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

    return collider;
  }
}
