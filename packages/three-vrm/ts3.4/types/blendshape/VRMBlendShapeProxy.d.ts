import { VRMSchema } from '../types';
import { VRMBlendShapeGroup } from './VRMBlendShapeGroup';
export declare class VRMBlendShapeProxy {
    /**
     * List of registered blend shape.
     */
    private readonly _blendShapeGroups;
    /**
     * A map from [[VRMSchema.BlendShapePresetName]] to its actual blend shape name.
     */
    private readonly _blendShapePresetMap;
    /**
     * A list of name of unknown blend shapes.
     */
    private readonly _unknownGroupNames;
    /**
     * Create a new VRMBlendShape.
     */
    constructor();
    /*
    * List of name of registered blend shape group.
    */
    readonly expressions: string[];
    /*
    * A map from [[VRMSchema.BlendShapePresetName]] to its actual blend shape name.
    */
    readonly blendShapePresetMap: {
        [presetName in VRMSchema.BlendShapePresetName]?: string;
    };
    /*
    * A list of name of unknown blend shapes.
    */
    readonly unknownGroupNames: string[];
    /**
     * Return registered blend shape group.
     *
     * @param name Name of the blend shape group
     */
    getBlendShapeGroup(name: string | VRMSchema.BlendShapePresetName): VRMBlendShapeGroup | undefined;
    /**
     * Register a blend shape group.
     *
     * @param name Name of the blend shape gorup
     * @param controller VRMBlendShapeController that describes the blend shape group
     */
    registerBlendShapeGroup(name: string, presetName: VRMSchema.BlendShapePresetName | undefined, controller: VRMBlendShapeGroup): void;
    /**
     * Get current weight of specified blend shape group.
     *
     * @param name Name of the blend shape group
     */
    getValue(name: VRMSchema.BlendShapePresetName | string): number | null;
    /**
     * Set a weight to specified blend shape group.
     *
     * @param name Name of the blend shape group
     * @param weight Weight
     */
    setValue(name: VRMSchema.BlendShapePresetName | string, weight: number): void;
    /**
     * Get a track name of specified blend shape group.
     * This track name is needed to manipulate its blend shape group via keyframe animations.
     *
     * @example Manipulate a blend shape group using keyframe animation
     * ```js
     * const trackName = vrm.blendShapeProxy.getBlendShapeTrackName( THREE.VRMSchema.BlendShapePresetName.Blink );
     * const track = new THREE.NumberKeyframeTrack(
     *   name,
     *   [ 0.0, 0.5, 1.0 ], // times
     *   [ 0.0, 1.0, 0.0 ] // values
     * );
     *
     * const clip = new THREE.AnimationClip(
     *   'blink', // name
     *   1.0, // duration
     *   [ track ] // tracks
     * );
     *
     * const mixer = new THREE.AnimationMixer( vrm.scene );
     * const action = mixer.clipAction( clip );
     * action.play();
     * ```
     *
     * @param name Name of the blend shape group
     */
    getBlendShapeTrackName(name: VRMSchema.BlendShapePresetName | string): string | null;
    /**
     * Update every blend shape groups.
     */
    update(): void;
}
