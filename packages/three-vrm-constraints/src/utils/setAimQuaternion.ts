import * as THREE from 'three';

const _v3Dir = new THREE.Vector3();
const _v3PlaneX = new THREE.Vector3();
const _v3PlaneY = new THREE.Vector3();
const _quatA = new THREE.Quaternion();

/**
 * Return a quaternion that represents a rotation of aim vector.
 * @param target Target quaternion
 * @param from A vector represents eye position of the aim quaternion.
 * @param to A vector represents target position of the aim quaternion.
 * @param aim A reference vector of the aim vector. Must be normalized
 * @param up An up vector. Must be normalized
 */
export function setAimQuaternion<T extends THREE.Quaternion>(
  target: T,
  from: THREE.Vector3,
  to: THREE.Vector3,
  aim: THREE.Vector3,
  up: THREE.Vector3,
  freezeAxes: [boolean, boolean]
): T {
  // this is the target rotation
  _v3Dir.copy(to).sub(from).normalize();

  // calculate the diff of theta
  const thetaAim = Math.asin(up.dot(aim));
  const thetaDir = Math.asin(up.dot(_v3Dir));

  // create a plane that is determined by up vector and aim vector
  _v3PlaneX.crossVectors(up, aim).normalize();
  _v3PlaneY.crossVectors(_v3PlaneX, up); // guaranteed to be normalized

  // calculate the diff of phi
  // the phi of the aim vector is already guaranteed to be zero, since the plane is already made of the aim vector
  const phiDir = Math.atan2(_v3PlaneX.dot(_v3Dir), _v3PlaneY.dot(_v3Dir));

  // made a quaternion out of calculated phi and theta
  target.setFromAxisAngle(up, freezeAxes[0] ? phiDir : 0.0);
  _quatA.setFromAxisAngle(_v3PlaneX, freezeAxes[1] ? (thetaAim - thetaDir) : 0.0);
  target.multiply(_quatA);

  return target;
}
