import { Expressions } from './Expressions';
import { FirstPerson } from './FirstPerson';
import { Humanoid } from './Humanoid';
import { LookAt } from './LookAt';
import { Meta } from './Meta';
export interface VRMCVRM {
    /**
     * Specification version of VRMC_vrm
     */
    specVersion: '1.0' | '1.0-beta';
    /**
     * Meta informations of the VRM model
     */
    meta: Meta;
    humanoid: Humanoid;
    /**
     * First-person perspective settings
     */
    firstPerson?: FirstPerson;
    /**
     * Eye gaze control
     */
    lookAt?: LookAt;
    expressions?: Expressions;
    extensions?: {
        [name: string]: any;
    };
    extras?: any;
}
