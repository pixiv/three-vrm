import type { FirstPersonMeshAnnotation } from './FirstPersonMeshAnnotation';

/**
 * First-person perspective settings
 */
export interface FirstPerson {
  /**
   * Mesh rendering annotation for cameras
   */
  meshAnnotations?: FirstPersonMeshAnnotation[];

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
