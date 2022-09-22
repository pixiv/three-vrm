import { SpringBoneColliderSphere } from './SpringBoneColliderSphere';
import { SpringBoneColliderCapsule } from './SpringBoneColliderCapsule';
/**
 * Shape of collider. Have one of sphere and capsule
 */
export interface SpringBoneColliderShape {
    sphere?: SpringBoneColliderSphere;
    capsule?: SpringBoneColliderCapsule;
    extensions?: {
        [name: string]: any;
    };
    extras?: any;
}
