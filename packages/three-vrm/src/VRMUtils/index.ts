import { combineMorphs } from './combineMorphs';
import { combineSkeletons } from './combineSkeletons';
import { deepDispose } from './deepDispose';
import { precompileShaders } from './precompileShaders';
import { removeUnnecessaryJoints } from './removeUnnecessaryJoints';
import { removeUnnecessaryVertices } from './removeUnnecessaryVertices';
import { rotateVRM0 } from './rotateVRM0';

export class VRMUtils {
  private constructor() {
    // this class is not meant to be instantiated
  }

  public static combineMorphs = combineMorphs;
  public static combineSkeletons = combineSkeletons;
  public static deepDispose = deepDispose;
  public static precompileShaders = precompileShaders;
  public static removeUnnecessaryJoints = removeUnnecessaryJoints;
  public static removeUnnecessaryVertices = removeUnnecessaryVertices;
  public static rotateVRM0 = rotateVRM0;
}
