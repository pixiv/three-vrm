import type { Expression } from './Expression';
import type { FirstPerson } from './FirstPerson';
import type { Humanoid } from './Humanoid';
import type { LookAt } from './LookAt';
import type { Meta } from './Meta';

export interface VRM {
  /**
   * Specification version of VRMC_vrm
   */
  specVersion?: '1.0';

  /**
   * Meta informations of the VRM model
   */
  meta?: Meta;

  humanoid?: Humanoid;

  /**
   * First-person perspective settings
   */
  firstPerson?: FirstPerson;

  /**
   * Eye gaze control
   */
  lookAt?: LookAt;

  expressions?: Expression[];

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
