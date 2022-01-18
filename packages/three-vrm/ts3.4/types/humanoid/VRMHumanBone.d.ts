import { GLTFNode } from '../types';
import { VRMHumanLimit } from './VRMHumanLimit';
/**
 * A class represents a single `humanBone` of a VRM.
 */
export declare class VRMHumanBone {
    /**
     * A [[GLTFNode]] (that actually is a `THREE.Object3D`) that represents the bone.
     */
    readonly node: GLTFNode;
    /**
     * A [[VRMHumanLimit]] object that represents properties of the bone.
     */
    readonly humanLimit: VRMHumanLimit;
    /**
     * Create a new VRMHumanBone.
     *
     * @param node A [[GLTFNode]] that represents the new bone
     * @param humanLimit A [[VRMHumanLimit]] object that represents properties of the new bone
     */
    constructor(node: GLTFNode, humanLimit: VRMHumanLimit);
}
