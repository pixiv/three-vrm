import * as THREE from 'three';

/**
 * Basically `Color.fromArray()`, but handles undefined properly.
 * @param array Input array
 */
export function colorFromArray( array: number[] | undefined ): THREE.Color | undefined {
  if ( array == null ) { return undefined; }

  return new THREE.Color().fromArray( array );
}
