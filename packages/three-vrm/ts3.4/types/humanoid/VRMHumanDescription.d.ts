/**
 * An interface represents a `HumanDescription` defined in VRM specification.
 * These fields are not used in this implementation.
 */
export interface VRMHumanDescription {
    armStretch?: number;
    legStretch?: number;
    upperArmTwist?: number;
    lowerArmTwist?: number;
    upperLegTwist?: number;
    lowerLegTwist?: number;
    feetSpacing?: number;
    hasTranslationDoF?: boolean;
}
