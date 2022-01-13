import * as THREE from 'three';
import { GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader';
/**
 * Get a material definition index of glTF from associated material.
 * It's basically a comat code between Three.js r133 or above and previous versions.
 * @param parser GLTFParser
 * @param material A material of gltf
 * @returns Material definition index of glTF
 */
export declare function gltfGetAssociatedMaterialIndex(parser: GLTFParser, material: THREE.Material): number | null;
