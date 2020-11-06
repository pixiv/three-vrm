import type { FirstPersonMeshAnnotation } from './FirstPersonMeshAnnotation';

/**
 * First-person perspective settings
 */
export interface FirstPerson {
  /**
   * Mesh rendering annotation for cameras
   */
  meshAnnotations?: FirstPersonMeshAnnotation[];
}
