import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMCoreLoaderPluginOptions } from './VRMCoreLoaderPluginOptions';
import { VRMExpressionLoaderPlugin } from './expressions/VRMExpressionLoaderPlugin';
import { VRMFirstPersonLoaderPlugin } from './firstPerson/VRMFirstPersonLoaderPlugin';
import { VRMHumanoidLoaderPlugin } from './humanoid/VRMHumanoidLoaderPlugin';
import { VRMMetaLoaderPlugin } from './meta/VRMMetaLoaderPlugin';
import { VRMLookAtLoaderPlugin } from './lookAt/VRMLookAtLoaderPlugin';
export declare class VRMCoreLoaderPlugin implements GLTFLoaderPlugin {
    get name(): string;
    readonly parser: GLTFParser;
    readonly expressionPlugin: VRMExpressionLoaderPlugin;
    readonly firstPersonPlugin: VRMFirstPersonLoaderPlugin;
    readonly humanoidPlugin: VRMHumanoidLoaderPlugin;
    readonly lookAtPlugin: VRMLookAtLoaderPlugin;
    readonly metaPlugin: VRMMetaLoaderPlugin;
    constructor(parser: GLTFParser, options?: VRMCoreLoaderPluginOptions);
    afterRoot(gltf: GLTF): Promise<void>;
}
