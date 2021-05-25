import type { Expression } from './Expression';
import type { FirstPerson } from './FirstPerson';
import type { Humanoid } from './Humanoid';
import type { LookAt } from './LookAt';
import type { Meta } from './Meta';

export interface VRM {
  specVersion?: '1.0';

  meta?: Meta;

  humanoid?: Humanoid;

  firstPerson?: FirstPerson;

  lookAt?: LookAt;

  /**
   * Definitions of expressions
   */
  expressions?: Expression[];

  extensions?: { [key: string]: { [key: string]: any } };
  extras?: any;
}
