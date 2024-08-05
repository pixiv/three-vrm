// This module will be imported at the beginning of `three-vrm-materials-mtoon/nodes`
// If the version of Three.js is less than r167, it will warn that it is not supported

import * as THREE from 'three';

const threeRevision = parseInt(THREE.REVISION, 10);
if (threeRevision < 167) {
  console.warn(
    `MToonNodeMaterial requires Three.js r167 or higher (You are using r${threeRevision}). This would not work correctly.`,
  );
}
