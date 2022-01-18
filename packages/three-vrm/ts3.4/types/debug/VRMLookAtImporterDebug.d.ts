import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMBlendShapeProxy } from '../blendshape';
import { VRMFirstPerson } from '../firstperson';
import { VRMHumanoid } from '../humanoid';
import { VRMLookAtHead } from '../lookat/VRMLookAtHead';
import { VRMLookAtImporter } from '../lookat/VRMLookAtImporter';
export declare class VRMLookAtImporterDebug extends VRMLookAtImporter {
    import(gltf: GLTF, firstPerson: VRMFirstPerson, blendShapeProxy: VRMBlendShapeProxy, humanoid: VRMHumanoid): VRMLookAtHead | null;
}
