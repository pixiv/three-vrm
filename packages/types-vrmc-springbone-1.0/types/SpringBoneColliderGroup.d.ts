/**
 * collider group definition for SpringBone
 */
export interface SpringBoneColliderGroup {
  name?: string;

  colliders?: number[];

  extensions?: { [name: string]: any };
  extras?: any;
}
