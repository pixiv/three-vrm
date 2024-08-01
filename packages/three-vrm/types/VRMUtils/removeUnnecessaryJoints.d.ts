import * as THREE from 'three';
/**
 * Traverse the given object and remove unnecessarily bound joints from every `THREE.SkinnedMesh`.
 *
 * Some environments like mobile devices have a lower limit of bones
 * and might be unable to perform mesh skinning with many bones.
 * This function might resolve such an issue.
 *
 * Also, this function might significantly improve the performance of mesh skinning.
 *
 * @param root Root object that will be traversed
 */
export declare function removeUnnecessaryJoints(root: THREE.Object3D, options?: {
    /**
     * If `true`, this function will compensate skeletons with dummy bones to keep the bone count same between skeletons.
     *
     * This option might be effective for the shader compilation performance that matters to the initial rendering time in WebGPURenderer,
     * especially when the model loaded has many materials and the dependent bone count is different between them.
     *
     * Consider this parameter as experimental. We might modify or delete this API without notice in the future.
     *
     * `false` by default.
     */
    experimentalSameBoneCounts?: boolean;
}): void;
