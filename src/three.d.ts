import * as THREE from 'three';
declare module 'three' {
  namespace PropertyBinding {
    export function sanitizeNodeName (name: string): string;
  }
}
