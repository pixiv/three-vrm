import type { BlendShape } from './BlendShape';
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

  blendShape?: BlendShape;
}
