import * as THREE from 'three';
import { VRM } from '../VRM';
/**
 * Extract a thumbnail image blob from a {@link VRM}.
 * If the vrm does not have a thumbnail, it will throw an error.
 * @param renderer Renderer
 * @param vrm VRM with a thumbnail
 * @param size width / height of the image
 */
export declare function extractThumbnailBlob(renderer: THREE.WebGLRenderer, vrm: VRM, size?: number): Promise<Blob>;
