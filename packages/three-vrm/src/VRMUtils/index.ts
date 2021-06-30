import { deepDispose } from './deepDispose';
import { removeUnnecessaryJoints } from './removeUnnecessaryJoints';

export class VRMUtils {
  private constructor() {
    // this class is not meant to be instantiated
  }

  public static deepDispose = deepDispose;
  public static removeUnnecessaryJoints = removeUnnecessaryJoints;
}
