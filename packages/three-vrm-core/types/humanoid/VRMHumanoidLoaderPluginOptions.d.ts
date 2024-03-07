import type * as THREE from 'three';
export interface VRMHumanoidLoaderPluginOptions {
    /**
     * Specify an Object3D to add {@link VRMHumanoidHelper}.
     * If not specified, helper will not be created.
     * If `renderOrder` is set to the root, helpers will copy the same `renderOrder` .
     */
    helperRoot?: THREE.Object3D;
    /**
     * Whether it copies pose from normalizedHumanBones to rawHumanBones on {@link update}.
     * `true` by default.
     *
     * @default true
     */
    autoUpdateHumanBones?: boolean;
}
