import { deepDispose } from './deepDispose';
import { removeUnnecessaryJoints } from './removeUnnecessaryJoints';
import { removeUnnecessaryVertices } from './removeUnnecessaryVertices';
import { rotateVRM0 } from './rotateVRM0';

export class VRMUtils {
  private constructor() {
    // this class is not meant to be instantiated
  }

  public static deepDispose = deepDispose;
  public static removeUnnecessaryJoints = removeUnnecessaryJoints;
  public static removeUnnecessaryVertices = removeUnnecessaryVertices;
  public static rotateVRM0 = rotateVRM0;
}
