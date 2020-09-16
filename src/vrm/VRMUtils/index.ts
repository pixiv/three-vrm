import { extractThumbnailBlob } from './extractThumbnailBlob';
import { removeUnnecessaryJoints } from './removeUnnecessaryJoints';

export class VRMUtils {
  private constructor() {
    // this class is not meant to be instantiated
  }

  public static extractThumbnailBlob = extractThumbnailBlob;
  public static removeUnnecessaryJoints = removeUnnecessaryJoints;
}
