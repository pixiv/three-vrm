import * as THREE from 'three';
import { BufferGeometry, Group, Object3D, SkinnedMesh } from 'three';
import { GLTFNode } from '../types';

enum FirstPersonFlag {
  Auto,
  Both,
  ThirdPersonOnly,
  FirstPersonOnly,
}

export class RendererFirstPersonFlags {
  private static parseFirstPersonFlag(firstPersonFlag: string | undefined) {
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

  public firstPersonFlag: FirstPersonFlag;
  public node: GLTFNode;

  constructor(firstPersonFlag: string | undefined, node: GLTFNode) {
    this.firstPersonFlag = RendererFirstPersonFlags.parseFirstPersonFlag(firstPersonFlag);
    this.node = node;
  }
}

export class VRMFirstPerson {
  /** Camera Layer */
  private static readonly DEFAULT_FIRSTPERSON_ONLY_LAYER = 9;
  private static readonly DEFAULT_THIRDPERSON_ONLY_LAYER = 10;

  private readonly _firstPersonBone: GLTFNode;
  private readonly _meshAnnotations: RendererFirstPersonFlags[] = [];
  private readonly _firstPersonBoneOffset: THREE.Vector3;

  private _firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER;
  private _thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER;

  private _initialized: boolean = false;

  constructor(
    firstPersonBone: GLTFNode,
    firstPersonBoneOffset: THREE.Vector3,
    meshAnnotations: RendererFirstPersonFlags[],
  ) {
    this._firstPersonBone = firstPersonBone;
    this._firstPersonBoneOffset = firstPersonBoneOffset;
    this._meshAnnotations = meshAnnotations;
  }

  public getFirstPersonBone(): GLTFNode {
    return this._firstPersonBone;
  }

  public getFirstPersonBoneOffset(): THREE.Vector3 {
    return this._firstPersonBoneOffset;
  }

  public getMeshAnnotations(): RendererFirstPersonFlags[] {
    return this._meshAnnotations;
  }

  public setup({
    firstPersonOnlyLayer = VRMFirstPerson.DEFAULT_FIRSTPERSON_ONLY_LAYER,
    thirdPersonOnlyLayer = VRMFirstPerson.DEFAULT_THIRDPERSON_ONLY_LAYER,
  } = {}) {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
    this._firstPersonOnlyLayer = firstPersonOnlyLayer;
    this._thirdPersonOnlyLayer = thirdPersonOnlyLayer;

    this._meshAnnotations.forEach((item) => {
      if (item.firstPersonFlag === FirstPersonFlag.FirstPersonOnly) {
        item.node.layers.set(this._firstPersonOnlyLayer);
        item.node.traverse((child) => child.layers.set(this._firstPersonOnlyLayer));
      } else if (item.firstPersonFlag === FirstPersonFlag.ThirdPersonOnly) {
        item.node.layers.set(this._thirdPersonOnlyLayer);
        item.node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      } else if (item.firstPersonFlag === FirstPersonFlag.Auto) {
        this.createHeadlessModel(item.node);
      }
    });
  }

  public getFirstPersonOnlyLayer(): number {
    return this._firstPersonOnlyLayer;
  }

  public getThirdPersonOnlyLayer(): number {
    return this._thirdPersonOnlyLayer;
  }

  public getFirstPersonBonePosition(v3: THREE.Vector3): THREE.Vector3 {
    // UniVRM#VRMFirstPersonEditor
    // var worldOffset = head.localToWorldMatrix.MultiplyPoint(component.FirstPersonOffset);
    const offset = this._firstPersonBoneOffset;
    const v4 = new THREE.Vector4(offset.x, offset.y, offset.z, 1.0);
    v4.applyMatrix4(this._firstPersonBone.matrixWorld);
    return v3.set(v4.x, v4.y, v4.z);
  }

  private excludeTriangles(triangles: number[], bws: number[][], skinIndex: number[][], exclude: number[]) {
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

  private createErasedMesh(src: SkinnedMesh, erasingBonesIndex: number[]): SkinnedMesh {
    const dst = new THREE.SkinnedMesh(src.geometry.clone(), src.material);
    dst.name = `${src.name}(erase)`;
    dst.frustumCulled = src.frustumCulled;
    dst.layers.set(this._firstPersonOnlyLayer);

    const geometry = dst.geometry as BufferGeometry;
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
    const oldTriangles = Array.from(geometry.getIndex().array);
    const count = this.excludeTriangles(oldTriangles, skinWeight, skinIndex, erasingBonesIndex);
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

  private createHeadlessModelForSkinnedMesh(parent: Object3D, mesh: SkinnedMesh) {
    const eraseBoneIndexes: number[] = [];
    mesh.skeleton.bones.forEach((bone, index) => {
      if (this.isEraseTarget(bone)) eraseBoneIndexes.push(index);
    });

    // Unlike UniVRM we don't copy mesh if no invisible bone was found
    if (!eraseBoneIndexes.length) {
      mesh.layers.enable(this._thirdPersonOnlyLayer);
      mesh.layers.enable(this._firstPersonOnlyLayer);
      return;
    }
    mesh.layers.set(this._thirdPersonOnlyLayer);
    const newMesh = this.createErasedMesh(mesh, eraseBoneIndexes);
    parent.add(newMesh);
  }

  private createHeadlessModel(node: GLTFNode) {
    if (node instanceof Group) {
      node.layers.set(this._thirdPersonOnlyLayer);
      if (this.isEraseTarget(node)) {
        node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      } else {
        const parent = new Group();
        parent.name = `_headless_${node.name}`;
        parent.layers.set(this._firstPersonOnlyLayer);
        node.parent!.add(parent);
        node.children
          .filter((child) => child instanceof SkinnedMesh)
          .forEach((child) => {
            this.createHeadlessModelForSkinnedMesh(parent, child as SkinnedMesh);
          });
      }
    } else if (node instanceof SkinnedMesh) {
      this.createHeadlessModelForSkinnedMesh(node.parent!, node);
    } else {
      if (this.isEraseTarget(node)) {
        node.layers.set(this._thirdPersonOnlyLayer);
        node.traverse((child) => child.layers.set(this._thirdPersonOnlyLayer));
      }
    }
  }

  private isEraseTarget(bone: GLTFNode): boolean {
    if (bone.name === this._firstPersonBone.name) {
      return true;
    } else if (!bone.parent) {
      return false;
    } else {
      return this.isEraseTarget(bone.parent!);
    }
  }
}
