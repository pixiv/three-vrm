import { extractThumbnailBlob } from './extractThumbnailBlob';
import { removeUnnecessaryJoints } from './removeUnnecessaryJoints';
import { removeUnnecessaryVertices } from './removeUnnecessaryVertices';

export class VRMUtils {
  private constructor() {
    // this class is not meant to be instantiated
  }

  public static extractThumbnailBlob = extractThumbnailBlob;
  public static removeUnnecessaryJoints = removeUnnecessaryJoints;
  public static removeUnnecessaryVertices = removeUnnecessaryVertices;
}
