import { HumanBone } from '../types';
import { VRMHumanBone } from './VRMHumanBone';

export type VRMHumanBoneArray = Array<{
  name: HumanBone;
  bone: VRMHumanBone;
}>;
