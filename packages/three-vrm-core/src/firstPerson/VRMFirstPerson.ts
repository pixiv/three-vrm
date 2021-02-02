import type { VRMFirstPersonMeshAnnotation } from './VRMFirstPersonMeshAnnotation';
import * as THREE from 'three';
import type { VRMHumanoid } from '../humanoid';

export class VRMFirstPerson {
  /**
   * A default camera layer for `FirstPersonOnly` layer.
   *
   * @see [[getFirstPersonOnlyLayer]]
   */
  public static readonly DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;

  /**
   * A default camera layer for `ThirdPersonOnly` layer.
   *
   * @see [[getThirdPersonOnlyLayer]]
   */
  public static readonly DEFAULT_THIRDPERSON_ONLY_LAYER = 10;

  public readonly humanoid: VRMHumanoid;
  public readonly meshAnnotations: VRMFirstPersonMeshAnnotation[];

  /**
   * It will be used to create a model that mesh annotation type are 'auto' for the first person only layer.
   */
  private readonly _humanoidHeadNode: THREE.Object3D | null;

  private _firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER;
  private _thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER;

  private _initializedLayers = false;

  /**
   * Create a new VRMFirstPerson object.
   *
   * @param humanoid A {@link VRMHumanoid}
   * @param meshAnnotations A renderer settings. See the description of [[RendererFirstPersonFlags]] for more info
   */
  public constructor(humanoid: VRMHumanoid, meshAnnotations: VRMFirstPersonMeshAnnotation[]) {
    this.humanoid = humanoid;
    this.meshAnnotations = meshAnnotations;

    this._humanoidHeadNode = humanoid.getBoneNode('head');
  }

  /**
   * A camera layer represents `FirstPersonOnly` layer.
   * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
   *
   * The value is {@link DEFAULT_FIRSTPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
   *
   * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
   * @see https://threejs.org/docs/#api/en/core/Layers
   */
  public get firstPersonOnlyLayer(): number {
    return this._firstPersonOnlyLayer;
  }

  /**
   * A camera layer represents `ThirdPersonOnly` layer.
   * Note that **you must call {@link setup} first before you use the layer feature** or it does not work properly.
   *
   * The value is {@link DEFAULT_THIRDPERSON_ONLY_LAYER} by default but you can change the layer by specifying via {@link setup} if you prefer.
   *
   * @see https://vrm.dev/en/univrm/api/univrm_use_firstperson/
   * @see https://threejs.org/docs/#api/en/core/Layers
   */
  public get thirdPersonOnlyLayer(): number {
    return this._thirdPersonOnlyLayer;
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
    firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER,
    thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER,
  } = {}): void {
    if (this._initializedLayers) {
      return;
    }
    this._initializedLayers = true;
    this._firstPersonOnlyLayer = firstPersonOnlyLayer;
    this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;

    this.meshAnnotations.forEach((item) => {
      item.meshes.forEach((mesh) => {
        if (item.firstPersonType === 'firstPersonOnly') {
          mesh.layers.set(this._firstPersonOnlyLayer);
          mesh.traverse((child) => child.layers.set(this._firstPersonOnlyLayer));
        } else if (item.firstPersonType === 'thirdPersonOnly') {
          mesh.layers.set(this._thirdPersonOnlyLayer);
          mesh.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
        } else if (item.firstPersonType === 'auto') {
          this._createHeadlessModel(mesh);
        }
      });
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

  private _createErasedMesh(
    src: THREE.SkinnedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>,
    erasingBonesIndex: number[],
  ): THREE.SkinnedMesh {
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

  private _createHeadlessModelForSkinnedMesh(
    parent: THREE.Object3D,
    mesh: THREE.SkinnedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>,
  ): void {
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

  private _createHeadlessModel(node: THREE.Object3D): void {
    if (node.type === 'Group') {
      node.layers.set(this._thirdPersonOnlyLayer);
      if (this._isEraseTarget(node)) {
        node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      } else {
        const parent = new THREE.Group();
        parent.name = `_headless_${node.name}`;
        parent.layers.set(this._firstPersonOnlyLayer);
        node.parent!.add(parent);
        node.children
          .filter((child) => child.type === 'SkinnedMesh')
          .forEach((child) => {
            const skinnedMesh = child as THREE.SkinnedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
            this._createHeadlessModelForSkinnedMesh(parent, skinnedMesh);
          });
      }
    } else if (node.type === 'SkinnedMesh') {
      const skinnedMesh = node as THREE.SkinnedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
      this._createHeadlessModelForSkinnedMesh(node.parent!, skinnedMesh);
    } else {
      if (this._isEraseTarget(node)) {
        node.layers.set(this._thirdPersonOnlyLayer);
        node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      }
    }
  }

  private _isEraseTarget(bone: THREE.Object3D): boolean {
    if (bone === this._humanoidHeadNode) {
      return true;
    } else if (!bone.parent) {
      return false;
    } else {
      return this._isEraseTarget(bone.parent!);
    }
  }
}
