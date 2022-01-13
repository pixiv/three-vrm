/**
 * Represents a single bone of a Humanoid.
 */
export interface HumanoidHumanBone {
    /**
     * Represents a single glTF node tied to this humanBone.
     */
    node: number;
    extensions?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    extras?: any;
}
