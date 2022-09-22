export interface VRMExpressionBind {
    /**
     * Apply a weight to this bind.
     * Applied weights will be accumulated until {@link clearAppliedWeight} is called.
     */
    applyWeight(weight: number): void;
    /**
     * Clear previously applied weights.
     */
    clearAppliedWeight(): void;
}
