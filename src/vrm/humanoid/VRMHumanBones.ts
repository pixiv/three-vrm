import { HumanBone } from '../types';
import { VRMHumanBone } from './VRMHumanBone';

export type VRMHumanBones = { [name in HumanBone]: VRMHumanBone[] };
