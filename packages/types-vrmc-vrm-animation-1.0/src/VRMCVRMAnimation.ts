import type { Expressions } from './Expressions';
import type { Humanoid } from './Humanoid';
import type { LookAt } from './LookAt';

/**
 * glTF extension that defines humanoid animations.
 */
export interface VRMCVRMAnimation {
  /**
   * Specification version of VRMC_vrm_animation
   */
  specVersion: '1.0' | '1.0-draft';

  /**
   * An object which describes about humanoid bones.
   */
  humanoid?: Humanoid;

  /**
   * An object which maps expressions to nodes.
   */
  expressions?: Expressions;

  /**
   * An object which maps a eye gaze point to a node.
   */
  lookAt?: LookAt;

  extensions?: { [name: string]: any };
  extras?: any;
}
