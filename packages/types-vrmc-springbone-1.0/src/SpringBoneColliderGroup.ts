/**
 * collider group definition for SpringBone
 */
export interface SpringBoneColliderGroup {
  name?: string;

  colliders?: number[];

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
