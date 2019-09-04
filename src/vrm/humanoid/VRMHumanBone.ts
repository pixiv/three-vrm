import { GLTFNode } from '../types';
import { VRMHumanLimit } from './VRMHumanLimit';

/**
 * A class represents a single `humanBone` of a VRM.
 */
export class VRMHumanBone {
  public readonly node: GLTFNode;
  public readonly humanLimit: VRMHumanLimit;

  public constructor(node: GLTFNode, humanLimit: VRMHumanLimit) {
    this.node = node;
    this.humanLimit = humanLimit;
  }
}
