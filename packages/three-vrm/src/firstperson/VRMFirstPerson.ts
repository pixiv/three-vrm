import * as THREE from 'three';
import { GLTFNode, GLTFPrimitive } from '../types';
import { getWorldQuaternionLite } from '../utils/math';

const VECTOR3_FRONT = Object.freeze(new THREE.Vector3(0.0, 0.0, -1.0));

const _quat = new THREE.Quaternion();

enum FirstPersonFlag {
  Auto,
  Both,
  ThirdPersonOnly,
  FirstPersonOnly,
}

/**
 * This class represents a single [`meshAnnotation`](https://github.com/vrm-c/UniVRM/blob/master/specification/0.0/schema/vrm.firstperson.meshannotation.schema.json) entry.
 * Each mesh will be assigned to specified layer when you call [[VRMFirstPerson.setup]].
 */
export class VRMRendererFirstPersonFlags {
  private static _parseFirstPersonFlag(firstPersonFlag: string | undefined): FirstPersonFlag {
    switch (firstPersonFlag) {
      case 'Both':
        return FirstPersonFlag.Both;
      case 'ThirdPersonOnly':
        return FirstPersonFlag.ThirdPersonOnly;
      case 'FirstPersonOnly':
        return FirstPersonFlag.FirstPersonOnly;
      default:
        return FirstPersonFlag.Auto;
    }
  }

  /**
   * A [[FirstPersonFlag]] of the annotation entry.
   */
  public firstPersonFlag: FirstPersonFlag;

  /**
   * A mesh primitives of the annotation entry.
   */
  public primitives: GLTFPrimitive[];

  /**
   * Create a new mesh annotation.
   *
   * @param firstPersonFlag A [[FirstPersonFlag]] of the annotation entry
   * @param node A node of the annotation entry.
   */
  constructor(firstPersonFlag: string | undefined, primitives: GLTFPrimitive[]) {
    this.firstPersonFlag = VRMRendererFirstPersonFlags._parseFirstPersonFlag(firstPersonFlag);
    this.primitives = primitives;
  }
}

export class VRMFirstPerson {
  /**
   * A default camera layer for `FirstPersonOnly` layer.
   *
   * @see [[getFirstPersonOnlyLayer]]
   */
  private static readonly _DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;

  /**
   * A default camera layer for `ThirdPersonOnly` layer.
   *
   * @see [[getThirdPersonOnlyLayer]]
   */
  private static readonly _DEFAULT_THIRDPERSON_ONLY_LAYER = 10;

  private readonly _firstPersonBone: GLTFNode;
  private readonly _meshAnnotations: VRMRendererFirstPersonFlags[] = [];
  private readonly _firstPersonBoneOffset: THREE.Vector3;

  private _firstPersonOnlyLayer = VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER;
  private _thirdPersonOnlyLayer = VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER;

  private _initialized = false;

  /**
   * Create a new VRMFirstPerson object.
   *
   * @param firstPersonBone A first person bone
   * @param firstPersonBoneOffset An offset from the specified first person bone
   * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
   */
  constructor(
    firstPersonBone: GLTFNode,
    firstPersonBoneOffset: THREE.Vector3,
    meshAnnotations: VRMRendererFirstPersonFlags[],
  ) {
    this._firstPersonBone = firstPersonBone;
    this._firstPersonBoneOffset = firstPersonBoneOffset;
    this._meshAnnotations = meshAnnotations;
  }

  public get firstPersonBone(): GLTFNode {
    return this._firstPersonBone;
  }

  public get meshAnnotations(): VRMRendererFirstPersonFlags[] {
    return this._meshAnnotations;
  }

  public getFirstPersonWorldDirection(target: THREE.Vector3): THREE.Vector3 {
    return target.copy(VECTOR3_FRONT).applyQuaternion(getWorldQuaternionLite(this._firstPersonBone, _quat));
  }

  /**
   * A camera layer represents `FirstPersonOnly` layer.
   * Note that **you must call [[setup]] first before you use the layer feature** or it does not work properly.
   *
   * The value is [[DEFAULT_FIRSTPERSON_ONLY_LAYER]] by default but you can change the layer by specifying via [[setup]] if you prefer.
   *
   * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
   * @see https://threejs.org/docs/#api/en/core/Layers
   */
  public get firstPersonOnlyLayer(): number {
    return this._firstPersonOnlyLayer;
  }

  /**
   * A camera layer represents `ThirdPersonOnly` layer.
   * Note that **you must call [[setup]] first before you use the layer feature** or it does not work properly.
   *
   * The value is [[DEFAULT_THIRDPERSON_ONLY_LAYER]] by default but you can change the layer by specifying via [[setup]] if you prefer.
   *
   * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
   * @see https://threejs.org/docs/#api/en/core/Layers
   */
  public get thirdPersonOnlyLayer(): number {
    return this._thirdPersonOnlyLayer;
  }

  public getFirstPersonBoneOffset(target: THREE.Vector3): THREE.Vector3 {
    return target.copy(this._firstPersonBoneOffset);
  }

  /**
   * Get current world position of the first person.
   * The position takes [[FirstPersonBone]] and [[FirstPersonOffset]] into account.
   *
   * @param v3 target
   * @returns Current world position of the first person
   */
  public getFirstPersonWorldPosition(v3: THREE.Vector3): THREE.Vector3 {
    // UniVRM#VRMFirstPersonEditor
    // var worldOffset = head.localToWorldMatrix.MultiplyPoint(component.FirstPersonOffset);
    const offset = this._firstPersonBoneOffset;
    const v4 = new THREE.Vector4(offset.x, offset.y, offset.z, 1.0);
    v4.applyMatrix4(this._firstPersonBone.matrixWorld);
    return v3.set(v4.x, v4.y, v4.z);
  }

  /**
   * In this method, it assigns layers for every meshes based on mesh annotations.
   * You must call this method first before you use the layer feature.
   *
   * This is an equivalent of [VRMFirstPerson.Setup](https://github.com/vrm-c/UniVRM/blob/master/Assets/VRM/UniVRM/Scripts/FirstPerson/VRMFirstPerson.cs) of the UniVRM.
   *
   * The `cameraLayer` parameter specifies which layer will be assigned for `FirstPersonOnly` / `ThirdPersonOnly`.
   * In UniVRM, we specified those by naming each desired layer as `FIRSTPERSON_ONLY_LAYER` / `THIRDPERSON_ONLY_LAYER`
   * but we are going to specify these layers at here since we are unable to name layers in Three.js.
   *
   * @param cameraLayer Specify which layer will be for `FirstPersonOnly` / `ThirdPersonOnly`.
   */
  public setup({
    firstPersonOnlyLayer = VRMFirstPerson._DEFAULT_FIRSTPERSON_ONLY_LAYER,
    thirdPersonOnlyLayer = VRMFirstPerson._DEFAULT_THIRDPERSON_ONLY_LAYER,
  } = {}): void {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
    this._firstPersonOnlyLayer = firstPersonOnlyLayer;
    this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;

    this._meshAnnotations.forEach((item) => {
      if (item.firstPersonFlag === FirstPersonFlag.FirstPersonOnly) {
        item.primitives.forEach((primitive) => {
          primitive.layers.set(this._firstPersonOnlyLayer);
        });
      } else if (item.firstPersonFlag === FirstPersonFlag.ThirdPersonOnly) {
        item.primitives.forEach((primitive) => {
          primitive.layers.set(this._thirdPersonOnlyLayer);
        });
      } else if (item.firstPersonFlag === FirstPersonFlag.Auto) {
        this._createHeadlessModel(item.primitives);
      }
    });
  }

  private _excludeTriangles(triangles: number[], bws: number[][], skinIndex: number[][], exclude: number[]): number {
    let count = 0;
    if (bws != null && bws.length > 0) {
      for (let i = 0; i < triangles.length; i += 3) {
        const a = triangles[i];
        const b = triangles[i + 1];
        const c = triangles[i + 2];
        const bw0 = bws[a];
        const skin0 = skinIndex[a];

        if (bw0[0] > 0 && exclude.includes(skin0[0])) continue;
        if (bw0[1] > 0 && exclude.includes(skin0[1])) continue;
        if (bw0[2] > 0 && exclude.includes(skin0[2])) continue;
        if (bw0[3] > 0 && exclude.includes(skin0[3])) continue;

        const bw1 = bws[b];
        const skin1 = skinIndex[b];
        if (bw1[0] > 0 && exclude.includes(skin1[0])) continue;
        if (bw1[1] > 0 && exclude.includes(skin1[1])) continue;
        if (bw1[2] > 0 && exclude.includes(skin1[2])) continue;
        if (bw1[3] > 0 && exclude.includes(skin1[3])) continue;

        const bw2 = bws[c];
        const skin2 = skinIndex[c];
        if (bw2[0] > 0 && exclude.includes(skin2[0])) continue;
        if (bw2[1] > 0 && exclude.includes(skin2[1])) continue;
        if (bw2[2] > 0 && exclude.includes(skin2[2])) continue;
        if (bw2[3] > 0 && exclude.includes(skin2[3])) continue;

        triangles[count++] = a;
        triangles[count++] = b;
        triangles[count++] = c;
      }
    }
    return count;
  }

  private _createErasedMesh(src: THREE.SkinnedMesh, erasingBonesIndex: number[]): THREE.SkinnedMesh {
    const dst = new THREE.SkinnedMesh(src.geometry.clone(), src.material);
    dst.name = `${src.name}(erase)`;
    dst.frustumCulled = src.frustumCulled;
    dst.layers.set(this._firstPersonOnlyLayer);

    const geometry = dst.geometry;

    const skinIndexAttr = geometry.getAttribute('skinIndex').array;
    const skinIndex = [];
    for (let i = 0; i < skinIndexAttr.length; i += 4) {
      skinIndex.push([skinIndexAttr[i], skinIndexAttr[i + 1], skinIndexAttr[i + 2], skinIndexAttr[i + 3]]);
    }

    const skinWeightAttr = geometry.getAttribute('skinWeight').array;
    const skinWeight = [];
    for (let i = 0; i < skinWeightAttr.length; i += 4) {
      skinWeight.push([skinWeightAttr[i], skinWeightAttr[i + 1], skinWeightAttr[i + 2], skinWeightAttr[i + 3]]);
    }

    const index = geometry.getIndex();
    if (!index) {
      throw new Error("The geometry doesn't have an index buffer");
    }
    const oldTriangles = Array.from(index.array);

    const count = this._excludeTriangles(oldTriangles, skinWeight, skinIndex, erasingBonesIndex);
    const newTriangle: number[] = [];
    for (let i = 0; i < count; i++) {
      newTriangle[i] = oldTriangles[i];
    }
    geometry.setIndex(newTriangle);

    // mtoon material includes onBeforeRender. this is unsupported at SkinnedMesh#clone
    if (src.onBeforeRender) {
      dst.onBeforeRender = src.onBeforeRender;
    }
    dst.bind(new THREE.Skeleton(src.skeleton.bones, src.skeleton.boneInverses), new THREE.Matrix4());
    return dst;
  }

  private _createHeadlessModelForSkinnedMesh(parent: THREE.Object3D, mesh: THREE.SkinnedMesh): void {
    const eraseBoneIndexes: number[] = [];
    mesh.skeleton.bones.forEach((bone, index) => {
      if (this._isEraseTarget(bone)) eraseBoneIndexes.push(index);
    });

    // Unlike UniVRM we don't copy mesh if no invisible bone was found
    if (!eraseBoneIndexes.length) {
      mesh.layers.enable(this._thirdPersonOnlyLayer);
      mesh.layers.enable(this._firstPersonOnlyLayer);
      return;
    }
    mesh.layers.set(this._thirdPersonOnlyLayer);
    const newMesh = this._createErasedMesh(mesh, eraseBoneIndexes);
    parent.add(newMesh);
  }

  private _createHeadlessModel(primitives: GLTFPrimitive[]): void {
    primitives.forEach((primitive) => {
      if (primitive.type === 'SkinnedMesh') {
        const skinnedMesh = primitive as THREE.SkinnedMesh;
        this._createHeadlessModelForSkinnedMesh(skinnedMesh.parent!, skinnedMesh);
      } else {
        if (this._isEraseTarget(primitive)) {
          primitive.layers.set(this._thirdPersonOnlyLayer);
        }
      }
    });
  }

  /**
   * It just checks whether the node or its parent is the first person bone or not.
   * @param bone The target bone
   */
  private _isEraseTarget(bone: GLTFNode): boolean {
    if (bone === this._firstPersonBone) {
      return true;
    } else if (!bone.parent) {
      return false;
    } else {
      return this._isEraseTarget(bone.parent);
    }
  }
}
