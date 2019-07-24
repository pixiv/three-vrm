import * as THREE from 'three';
import { VRMBlendShapeProxy } from './blendshape';
import { VRMFirstPerson } from './firstperson';
import { VRMHumanBones } from './humanoid';
import { VRMLookAtHead } from './lookat';
import { MaterialConverter } from './material';
import { VRMSpringBoneManager } from './springbone';
import { GLTF, RawVrmMeta, VRMPose } from './types';
import { deepDispose } from './utils/disposer';
import { VRMPartsBuilder } from './VRMPartsBuilder';

export class VRMBuilder {
  protected _materialConverter = new MaterialConverter(true);

  protected _partsBuilder = new VRMPartsBuilder();

  public materialConverter(materialConverter: MaterialConverter): VRMBuilder {
    this._materialConverter = materialConverter;
    return this;
  }

  public partsBuilder(partsBuilder: VRMPartsBuilder) {
    this._partsBuilder = partsBuilder;
    return this;
  }

  public async build(gltf: GLTF): Promise<VRM> {
    const vrm = new VRM(this._partsBuilder);
    const convertedGltf = await this._materialConverter.convertGLTFMaterials(gltf);
    await vrm.loadGLTF(convertedGltf);
    return vrm;
  }
}

export class VRM {
  public static get Builder(): VRMBuilder {
    return new VRMBuilder();
  }

  public static from(gltf: GLTF): Promise<VRM> {
    return new VRMBuilder().build(gltf);
  }

  private _restPose?: VRMPose | null;
  public get restPose() {
    return this._restPose;
  }

  private _humanBones?: VRMHumanBones | null;
  public get humanBones() {
    return this._humanBones;
  }

  private _blendShapeProxy?: VRMBlendShapeProxy | null;
  public get blendShapeProxy() {
    return this._blendShapeProxy;
  }

  private _firstPerson?: VRMFirstPerson | null;
  public get firstPerson() {
    return this._firstPerson;
  }

  private _lookAt?: VRMLookAtHead | null;
  public get lookAt() {
    return this._lookAt;
  }

  private _meta?: RawVrmMeta;
  public get meta() {
    return this._meta;
  }

  private _animationMixer?: THREE.AnimationMixer;
  public get animationMixer() {
    return this._animationMixer;
  }

  private _springBoneManager?: VRMSpringBoneManager;
  public get springBoneManager() {
    return this._springBoneManager;
  }

  private _gltf?: GLTF;

  private readonly _partsBuilder: VRMPartsBuilder;

  constructor(_builder?: VRMPartsBuilder) {
    if (_builder) {
      this._partsBuilder = _builder;
    } else {
      this._partsBuilder = new VRMPartsBuilder();
    }
  }

  public async loadGLTF(gltf: GLTF): Promise<void> {
    this._gltf = gltf;

    if (gltf.parser.json.extensions === undefined || gltf.parser.json.extensions.VRM === undefined) {
      throw new Error('Could not find VRM extension on the GLTF');
    }
    const vrmExt = gltf.parser.json.extensions.VRM;

    this._meta = vrmExt.meta;

    gltf.scene.updateMatrixWorld(false);

    // Skinned object should not be frustumCulled
    // Since pre-skinned position might be outside of view
    gltf.scene.traverse((object3d) => {
      if ((object3d as any).isMesh) {
        object3d.frustumCulled = false;
      }
    });

    reduceBones(gltf.scene);

    const humanBones = await this._partsBuilder.loadHumanoid(gltf);
    this._humanBones = humanBones;

    this._firstPerson = this.humanBones
      ? await this._partsBuilder.loadFirstPerson(vrmExt.firstPerson, this.humanBones, gltf)
      : null;

    this._animationMixer = new THREE.AnimationMixer(gltf.scene);
    const blendShapeProxy = await this._partsBuilder.loadBlendShapeMaster(this.animationMixer!, gltf);
    if (!blendShapeProxy) {
      throw new Error('failed to create blendShape. confirm your vrm file');
    }
    this._blendShapeProxy = blendShapeProxy;

    this._springBoneManager = await this._partsBuilder.loadSecondary(gltf);

    this._lookAt =
      this.blendShapeProxy && this.humanBones
        ? this._partsBuilder.loadLookAt(vrmExt.firstPerson, this.blendShapeProxy, this.humanBones)
        : null;

    // Save current initial pose (which is Rest-pose) to restPose field, since pose changing may lose the default transforms. This is useful when resetting the pose or referring default pose.
    this._restPose = this.humanBones
      ? Object.keys(this.humanBones).reduce(
          (restPose, vrmBoneName) => {
            const bone = this.humanBones![vrmBoneName]!;
            restPose[vrmBoneName] = {
              position: bone.position.toArray(),
              rotation: bone.quaternion.toArray(),
            };
            return restPose;
          },
          {} as VRMPose,
        )
      : null;
  }

  public setPose(poseObject: VRMPose): void {
    // VRMに定められたboneが足りない場合、正しくposeが取れない可能性がある
    if (!this.humanBones) {
      console.warn('This VRM cannot be posed since humanBones are not properly set');
      return;
    }

    Object.keys(poseObject).forEach((boneName) => {
      const state = poseObject[boneName]!;
      const targetBone = this.humanBones![boneName];

      // VRM標準ボーンを満たしていないVRMファイルが世の中には存在する
      // （少し古いuniVRMは、必須なのにhipsを出力していなさそう）
      // その場合は無視。
      if (!targetBone) {
        return;
      }

      const restState = this.restPose![boneName];
      if (!restState) {
        return;
      }

      if (state.position) {
        // 元の状態に戻してから、移動分を追加
        targetBone.position.set(
          restState.position![0] + state.position[0],
          restState.position![1] + state.position[1],
          restState.position![2] + state.position[2],
        );
      }
      if (state.rotation) {
        targetBone.quaternion.fromArray(state.rotation);
      }
    });
  }

  get scene() {
    return this._gltf && this._gltf.scene;
  }

  public update(delta: number): void {
    if (this.lookAt) {
      this.lookAt.update();
    }

    if (this.animationMixer) {
      this.animationMixer.update(delta);
    }

    if (this.blendShapeProxy) {
      this.blendShapeProxy.update();
    }

    if (this.springBoneManager) {
      this.springBoneManager.lateUpdate(delta);
    }
  }

  public dispose(): void {
    const scene = this.scene;
    if (scene) {
      while (scene.children.length > 0) {
        const object = scene.children[scene.children.length - 1];
        deepDispose(object);
        scene.remove(object);
      }
    }
  }
}

function reduceBones(root: THREE.Object3D): void {
  // Traverse an entire tree
  root.traverse((obj) => {
    if (obj.type !== 'SkinnedMesh') {
      return;
    }

    const mesh = obj as THREE.SkinnedMesh;
    const geometry = (mesh.geometry as THREE.BufferGeometry).clone();
    mesh.geometry = geometry;
    const attribute = geometry.getAttribute('skinIndex');

    // generate reduced bone list
    const bones: THREE.Bone[] = []; // new list of bone
    const boneInverses: THREE.Matrix4[] = []; // new list of boneInverse
    const boneIndexMap: { [index: number]: number } = {}; // map of old bone index vs. new bone index
    const array = (attribute.array as any).map((index: number) => {
      // new skinIndex buffer
      if (boneIndexMap[index] === undefined) {
        boneIndexMap[index] = bones.length;
        bones.push(mesh.skeleton.bones[index]);
        boneInverses.push(mesh.skeleton.boneInverses[index]);
      }
      return boneIndexMap[index];
    });

    // attach new skinIndex buffer
    geometry.removeAttribute('skinIndex');
    geometry.addAttribute('skinIndex', new THREE.BufferAttribute(array, 4, false));
    mesh.bind(new THREE.Skeleton(bones, boneInverses), new THREE.Matrix4());
    //                                                 ^^^^^^^^^^^^^^^^^^^ transform of meshes should be ignored
    // See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
  });
}
