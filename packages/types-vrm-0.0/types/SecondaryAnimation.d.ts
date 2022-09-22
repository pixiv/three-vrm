import type { SecondaryAnimationColliderGroup } from './SecondaryAnimationColliderGroup';
import type { SecondaryAnimationSpring } from './SecondaryAnimationSpring';
/**
 * The setting of automatic animation of string-like objects such as tails and hairs.
 */
export interface SecondaryAnimation {
    boneGroups?: SecondaryAnimationSpring[];
    colliderGroups?: SecondaryAnimationColliderGroup[];
}
