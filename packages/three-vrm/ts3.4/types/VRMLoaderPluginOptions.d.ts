import * as THREE from 'three';
import { VRMExpressionLoaderPlugin, VRMFirstPersonLoaderPlugin, VRMHumanoidLoaderPlugin, VRMLookAtLoaderPlugin, VRMMetaLoaderPlugin } from '@pixiv/three-vrm-core';
import { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { VRMMaterialsHDREmissiveMultiplierLoaderPlugin } from '@pixiv/three-vrm-materials-hdr-emissive-multiplier';
import { VRMMaterialsV0CompatPlugin } from '@pixiv/three-vrm-materials-v0compat';
import { VRMNodeConstraintLoaderPlugin } from '@pixiv/three-vrm-node-constraint';
import { VRMSpringBoneLoaderPlugin } from '@pixiv/three-vrm-springbone';
export interface VRMLoaderPluginOptions {
    expressionPlugin?: VRMExpressionLoaderPlugin;
    firstPersonPlugin?: VRMFirstPersonLoaderPlugin;
    humanoidPlugin?: VRMHumanoidLoaderPlugin;
    lookAtPlugin?: VRMLookAtLoaderPlugin;
    metaPlugin?: VRMMetaLoaderPlugin;
    mtoonMaterialPlugin?: MToonMaterialLoaderPlugin;
    materialsHDREmissiveMultiplierPlugin?: VRMMaterialsHDREmissiveMultiplierLoaderPlugin;
    materialsV0CompatPlugin?: VRMMaterialsV0CompatPlugin;
    springBonePlugin?: VRMSpringBoneLoaderPlugin;
    nodeConstraintPlugin?: VRMNodeConstraintLoaderPlugin;
    /**
     * If assigned, the object will be used as a helper root of every component.
     * Useful for debug.
     * Will be overwritten if you use custom loader plugins for each components.
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
