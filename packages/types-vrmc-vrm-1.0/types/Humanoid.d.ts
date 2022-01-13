import type { HumanoidHumanBones } from './HumanoidHumanBones';
/**
 * Correspondence between nodes and human bones
 */
export interface Humanoid {
    humanBones: HumanoidHumanBones;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
}
