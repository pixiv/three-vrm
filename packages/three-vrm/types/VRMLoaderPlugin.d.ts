import * as THREE from 'three';
import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMExpressionLoaderPlugin, VRMFirstPersonLoaderPlugin, VRMHumanoidLoaderPlugin, VRMLookAtLoaderPlugin, VRMMetaLoaderPlugin } from '@pixiv/three-vrm-core';
import { MToonMaterialLoaderPlugin } from '@pixiv/three-vrm-materials-mtoon';
import { VRMMaterialsHDREmissiveMultiplierLoaderPlugin } from '@pixiv/three-vrm-materials-hdr-emissive-multiplier';
import { VRMMaterialsV0CompatPlugin } from '@pixiv/three-vrm-materials-v0compat';
import { VRMNodeConstraintLoaderPlugin } from '@pixiv/three-vrm-node-constraint';
import { VRMSpringBoneLoaderPlugin } from '@pixiv/three-vrm-springbone';
import { VRMLoaderPluginOptions } from './VRMLoaderPluginOptions';
export declare class VRMLoaderPlugin implements GLTFLoaderPlugin {
    readonly parser: GLTFParser;
    readonly expressionPlugin: VRMExpressionLoaderPlugin;
    readonly firstPersonPlugin: VRMFirstPersonLoaderPlugin;
    readonly humanoidPlugin: VRMHumanoidLoaderPlugin;
    readonly lookAtPlugin: VRMLookAtLoaderPlugin;
    readonly metaPlugin: VRMMetaLoaderPlugin;
    readonly mtoonMaterialPlugin: MToonMaterialLoaderPlugin;
    readonly materialsHDREmissiveMultiplierPlugin: VRMMaterialsHDREmissiveMultiplierLoaderPlugin;
    readonly materialsV0CompatPlugin: VRMMaterialsV0CompatPlugin;
    readonly springBonePlugin: VRMSpringBoneLoaderPlugin;
    readonly nodeConstraintPlugin: VRMNodeConstraintLoaderPlugin;
    get name(): string;
    constructor(parser: GLTFParser, options?: VRMLoaderPluginOptions);
    beforeRoot(): Promise<void>;
    loadMesh(meshIndex: number): Promise<THREE.Group | THREE.Mesh | THREE.SkinnedMesh>;
    getMaterialType(materialIndex: number): typeof THREE.Material | null;
    extendMaterialParams(materialIndex: number, materialParams: {
        [key: string]: any;
    }): Promise<any>;
    afterRoot(gltf: GLTF): Promise<void>;
}
