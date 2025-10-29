import * as THREE from 'three/webgpu';
import { ShaderNodeObject, Swizzable } from 'three/tsl';
import { MToonLightingModel } from './MToonLightingModel';
import { MToonMaterialOutlineWidthMode } from '../MToonMaterialOutlineWidthMode';
import { MToonNodeMaterialParameters } from './MToonNodeMaterialParameters';
/**
 * MToon is a material specification that has various features.
 * The spec and implementation are originally founded for Unity engine and this is a port of the material.
 *
 * This material is a NodeMaterial variant of {@link MToonMaterial}.
 *
 * See: https://github.com/Santarh/MToon
 */
export declare class MToonNodeMaterial extends THREE.NodeMaterial {
    emissiveNode: ShaderNodeObject<THREE.Node> | null;
    color: THREE.Color;
    map: THREE.Texture | null;
    emissive: THREE.Color;
    emissiveIntensity: number;
    emissiveMap: THREE.Texture | null;
    normalMap: THREE.Texture | null;
    normalScale: THREE.Vector2;
    shadeColorFactor: THREE.Color;
    shadeMultiplyTexture: THREE.Texture | null;
    shadingShiftFactor: number;
    shadingShiftTexture: THREE.Texture | null;
    shadingShiftTextureScale: number;
    shadingToonyFactor: number;
    rimLightingMixFactor: number;
    rimMultiplyTexture: THREE.Texture | null;
    matcapFactor: THREE.Color;
    matcapTexture: THREE.Texture | null;
    parametricRimColorFactor: THREE.Color;
    parametricRimLiftFactor: number;
    parametricRimFresnelPowerFactor: number;
    outlineWidthMode: MToonMaterialOutlineWidthMode;
    outlineWidthMultiplyTexture: THREE.Texture | null;
    outlineWidthFactor: number;
    outlineColorFactor: THREE.Color;
    outlineLightingMixFactor: number;
    uvAnimationScrollXSpeedFactor: number;
    uvAnimationScrollYSpeedFactor: number;
    uvAnimationRotationSpeedFactor: number;
    uvAnimationMaskTexture: THREE.Texture | null;
    shadeColorNode: Swizzable | null;
    shadingShiftNode: THREE.Node | null;
    shadingToonyNode: THREE.Node | null;
    rimLightingMixNode: THREE.Node | null;
    rimMultiplyNode: THREE.Node | null;
    matcapNode: THREE.Node | null;
    parametricRimColorNode: Swizzable | null;
    parametricRimLiftNode: THREE.Node | null;
    parametricRimFresnelPowerNode: THREE.Node | null;
    uvAnimationScrollXOffset: number;
    uvAnimationScrollYOffset: number;
    uvAnimationRotationPhase: number;
    isOutline: boolean;
    private _animatedUVNode;
    customProgramCacheKey(): string;
    /**
     * Readonly boolean that indicates this is a {@link MToonNodeMaterial}.
     */
    get isMToonNodeMaterial(): true;
    constructor(parameters?: MToonNodeMaterialParameters);
    setupLightingModel(): MToonLightingModel;
    setup(builder: THREE.NodeBuilder): void;
    setupDiffuseColor(builder: THREE.NodeBuilder): void;
    setupVariants(): void;
    setupNormal(): ShaderNodeObject<THREE.Node>;
    setupNormal(builder?: THREE.NodeBuilder): ShaderNodeObject<THREE.Node>;
    setupLighting(builder: THREE.NodeBuilder): THREE.Node;
    setupOutput(builder: THREE.NodeBuilder, outputNode: ShaderNodeObject<THREE.Node>): ShaderNodeObject<THREE.Node>;
    setupPosition(builder: THREE.NodeBuilder): ShaderNodeObject<THREE.Node>;
    copy(source: MToonNodeMaterial): this;
    update(delta: number): void;
    private _setupShadeColorNode;
    private _setupShadingShiftNode;
    private _setupShadingToonyNode;
    private _setupRimLightingMixNode;
    private _setupRimMultiplyNode;
    private _setupMatcapNode;
    private _setupParametricRimNode;
}
