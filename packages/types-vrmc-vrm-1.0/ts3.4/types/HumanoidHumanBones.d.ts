import { HumanoidHumanBone } from './HumanoidHumanBone';
import { HumanoidHumanBoneName } from './HumanoidHumanBoneName';
/**
 * Represents a set of humanBones of a humanoid.
 */
export type HumanoidHumanBones = {
    [key in HumanoidHumanBoneName]?: HumanoidHumanBone;
};
