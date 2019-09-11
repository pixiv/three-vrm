import * as THREE from 'three';
import { VRMSchema } from '../types';

export abstract class VRMLookAtApplyer {
  public abstract readonly type: VRMSchema.FirstPersonLookAtTypeName;
  public abstract lookAt(euler: THREE.Euler): void;
}
