import type { FirstPersonDegreeMap } from './FirstPersonDegreeMap';
import type { FirstPersonMeshAnnotation } from './FirstPersonMeshAnnotation';
import type { Vector3 } from './Vector3';
export interface FirstPerson {
    /**
     * The bone whose rendering should be turned off in first-person view. Usually Head is
     * specified.
     */
    firstPersonBone?: number;
    /**
     * The target position of the VR headset in first-person view. It is assumed that an offset
     * from the head bone to the VR headset is added.
     */
    firstPersonBoneOffset?: Vector3;
    /**
     * Switch display / undisplay for each mesh in first-person view or the others.
     */
    meshAnnotations?: FirstPersonMeshAnnotation[];
    /**
     * Eye controller mode.
     */
    lookAtTypeName?: 'Bone' | 'BlendShape';
    lookAtHorizontalInner?: FirstPersonDegreeMap;
    lookAtHorizontalOuter?: FirstPersonDegreeMap;
    lookAtVerticalDown?: FirstPersonDegreeMap;
    lookAtVerticalUp?: FirstPersonDegreeMap;
}
