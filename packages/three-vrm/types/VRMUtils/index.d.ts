import { combineMorphs } from './combineMorphs';
import { combineSkeletons } from './combineSkeletons';
import { deepDispose } from './deepDispose';
import { removeUnnecessaryJoints } from './removeUnnecessaryJoints';
import { removeUnnecessaryVertices } from './removeUnnecessaryVertices';
import { rotateVRM0 } from './rotateVRM0';
export declare class VRMUtils {
    private constructor();
    static combineMorphs: typeof combineMorphs;
    static combineSkeletons: typeof combineSkeletons;
    static deepDispose: typeof deepDispose;
    static removeUnnecessaryJoints: typeof removeUnnecessaryJoints;
    static removeUnnecessaryVertices: typeof removeUnnecessaryVertices;
    static rotateVRM0: typeof rotateVRM0;
}
