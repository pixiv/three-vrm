import { SpringBoneJoint } from './SpringBoneJoint';
/**
 * A bone group of VRMCSpringBone.
 */
export interface SpringBoneSpring {
    /**
     * Name of the Spring
     */
    name?: string;
    /**
     * Joints of the spring. Except for the first element, a previous joint of the array must be an ancestor of the joint.
     */
    joints: SpringBoneJoint[];
    /**
     * Indices of ColliderGroups that detect collision with this spring.
     */
    colliderGroups?: number[];
    extensions?: {
        [name: string]: any;
    };
    extras?: any;
}
