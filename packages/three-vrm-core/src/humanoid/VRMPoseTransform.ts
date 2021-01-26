import type { RawVector3 } from '../utils/RawVector3';
import type { RawVector4 } from '../utils/RawVector4';

/**
 * Represents a transform of a single bone of [[VRMPose]].
 * Both `position` and `rotation` are optional.
 */
export interface VRMPoseTransform {
  /**
   * Position of the transform.
   */
  position?: RawVector3;

  /**
   * Rotation of the transform.
   * Note that it's a quaternion.
   */
  rotation?: RawVector4;
}
