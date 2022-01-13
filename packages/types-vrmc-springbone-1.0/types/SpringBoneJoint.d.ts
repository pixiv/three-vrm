/**
 * A bone joint of VRMCSpringBone.
 */
export interface SpringBoneJoint {
    /**
     * The node index.
     */
    node: number;
    /**
     * The radius of spring sphere.
     */
    hitRadius: number;
    /**
     * The force to return to the initial pose.
     */
    stiffness: number;
    /**
     * Gravitational acceleration.
     */
    gravityPower: number;
    /**
     * gravityDir
     */
    gravityDir?: [number, number, number];
    /**
     * Air resistance. Deceleration force.
     */
    dragForce: number;
    extensions?: {
        [name: string]: any;
    };
    extras?: any;
}
