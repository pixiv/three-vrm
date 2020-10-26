import * as THREE from 'three';
import { VRM } from '../VRM';

const _v2A = new THREE.Vector2();

const _camera = new THREE.OrthographicCamera(-1, 1, -1, 1, -1, 1);
const _plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
);
const _scene = new THREE.Scene();
_scene.add(_plane);

/**
 * Extract a thumbnail image blob from a {@link VRM}.
 * If the vrm does not have a thumbnail, it will throw an error.
 * @param renderer Renderer
 * @param vrm VRM with a thumbnail
 * @param size width / height of the image
 */
export function extractThumbnailBlob(renderer: THREE.WebGLRenderer, vrm: VRM, size = 512): Promise<Blob> {
  // get the texture
  const texture = vrm.meta?.texture;
  if (!texture) {
    throw new Error('extractThumbnailBlob: This VRM does not have a thumbnail');
  }

  const canvas = renderer.getContext().canvas;

  // store the current resolution
  renderer.getSize(_v2A);
  const prevWidth = _v2A.x;
  const prevHeight = _v2A.y;

  // overwrite the resolution
  renderer.setSize(size, size, false);

  // assign the texture to plane
  _plane.material.map = texture;

  // render
  renderer.render(_scene, _camera);

  // unassign the texture
  _plane.material.map = null;

  // get blob
  if (canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob().finally(() => {
      // revert to previous resolution
      renderer.setSize(prevWidth, prevHeight, false);
    });
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      // revert to previous resolution
      renderer.setSize(prevWidth, prevHeight, false);

      if (blob == null) {
        reject('extractThumbnailBlob: Failed to create a blob');
      } else {
        resolve(blob);
      }
    });
  });
}
