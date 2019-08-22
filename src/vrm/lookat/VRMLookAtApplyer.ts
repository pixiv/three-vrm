import * as THREE from 'three';
import { LookAtTypeName } from '../types';

export abstract class VRMLookAtApplyer {
  public abstract readonly type: LookAtTypeName;
  public abstract lookAt(euler: THREE.Euler): void;
}
