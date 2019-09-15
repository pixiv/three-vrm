import CameraControls from 'camera-controls';
import * as React from 'react';
import * as THREE from 'three';
import * as VRM from '../..';
import { VRMSchema } from '../..';

const _v3 = new THREE.Vector3();

interface Props {
  vrm: VRM.VRM;
  camera: THREE.Camera;
  cameraControls: CameraControls;
  toggleDebug?: (key?: string) => void;
  debug?: boolean;
}

interface PanelProps {
  title: string;
}

const ItemName: React.FunctionComponent<{ value: string }> = ({ value }) => (
  <h2 style={{ fontSize: 10, display: 'flex', alignItems: 'center', marginRight: 10, width: 60 }}>{value}</h2>
);

const Panel: React.FunctionComponent<PanelProps> = ({ title, children }) => {
  return (
    <section>
      <h1
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#e04e3f',
          height: 24,
          fontSize: 12,
          color: 'white',
          paddingLeft: 10,
        }}
      >
        {title}
      </h1>
      <div style={{ padding: 5, fontSize: 10, backgroundColor: 'rgba(120,120,120,0.3)' }}>{children}</div>
    </section>
  );
};

export const Transform = (props: Props) => {
  const vrm = props.vrm;
  const position = vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position;
  const rotation = vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.rotation;
  const scale = vrm.scene!.scale;
  const toggleDebug = props.toggleDebug!;

  const nvl = (value: string, defVal: number) => {
    if (value === undefined || value === null || !value.length) return defVal;
    const v = parseInt(value, 10);
    return isNaN(v) ? defVal : v;
  };

  return (
    <Panel title={'Transform'}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <ItemName value="Position" />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            X
            <input
              style={{ width: 30 }}
              defaultValue={position.x.toString()}
              onChange={(e) => (position.x = nvl(e.target.value, position.x))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            Y
            <input
              style={{ width: 30 }}
              defaultValue={position.y.toString()}
              onChange={(e) => (position.y = nvl(e.target.value, position.y))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Z
            <input
              style={{ width: 30 }}
              defaultValue={position.z.toString()}
              onChange={(e) => (position.z = nvl(e.target.value, position.z))}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <ItemName value="Rotation" />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            X
            <input
              style={{ width: 30 }}
              defaultValue={rotation.x.toString()}
              onChange={(e) => (rotation.x = nvl(e.target.value, rotation.x))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            Y
            <input
              style={{ width: 30 }}
              defaultValue={rotation.y.toString()}
              onChange={(e) => (rotation.y = nvl(e.target.value, rotation.y))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Z
            <input
              style={{ width: 30 }}
              defaultValue={rotation.z.toString()}
              onChange={(e) => (rotation.z = nvl(e.target.value, rotation.z))}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <ItemName value="Scale" />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            X
            <input
              style={{ width: 30 }}
              defaultValue={scale.x.toString()}
              onChange={(e) => (scale.x = nvl(e.target.value, scale.x))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            Y
            <input
              style={{ width: 30 }}
              defaultValue={scale.y.toString()}
              onChange={(e) => (scale.y = nvl(e.target.value, scale.y))}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Z
            <input
              style={{ width: 30 }}
              defaultValue={scale.z.toString()}
              onChange={(e) => (scale.z = nvl(e.target.value, scale.z))}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <div>
            <button onClick={() => toggleDebug()}>Toggle Debug</button>
          </div>
        </div>
        {props.debug && (
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <div>
              <button onClick={() => toggleDebug('disableRightEyeDirectionHelper')}>
                Toggle RightEyeDirectionHelper
              </button>
            </div>
          </div>
        )}
        {props.debug && (
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <div>
              <button onClick={() => toggleDebug('disableLeftEyeDirectionHelper')}>
                Toggle LeftEyeDirectionHelper
              </button>
            </div>
          </div>
        )}
        {props.debug && (
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <div>
              <button onClick={() => toggleDebug('disableFaceDirectionHelper')}>Toggle FaceDirectionHelper</button>
            </div>
          </div>
        )}
        {props.debug && (
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <div>
              <button onClick={() => toggleDebug('disableSkeletonHelper')}>Toggle SkeletonHelper</button>
            </div>
          </div>
        )}
        {props.debug && (
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <div>
              <button onClick={() => toggleDebug('disableBoxHelper')}>Toggle BoxHelper</button>
            </div>
          </div>
        )}
        {props.debug && (
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <div>
              <button onClick={() => toggleDebug('disableSpringBoneHelper')}>Toggle SpringBoneHelper</button>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
};

export const Meta = (props: Props) => {
  const meta: VRMSchema.Meta = props.vrm.meta!;
  const style = { fontSize: 10 };
  return (
    <Panel title={'VRMMeta'}>
      <ul>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>Title: </span>
          <span>{meta.title}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>AllowedUser: </span>
          <span>{meta.allowedUserName}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>Author: </span>
          <span>{meta.author}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>CommercialUssage: </span>
          <span>{meta.commercialUssageName}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>Contact: </span>
          <span>{meta.contactInformation}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>Licence: </span>
          <span>{meta.licenseName}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>LicenceURL: </span>
          <a target="_blank" href={meta.otherLicenseUrl}>
            Here
          </a>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>PermissionURL: </span>
          <a target="_blank" href={meta.otherPermissionUrl}>
            Here
          </a>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>Reference: </span>
          <span>{meta.reference}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>SexualUssage: </span>
          <span>{meta.sexualUssageName}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>ViolentUssage: </span>
          <span>{meta.violentUssageName}</span>
        </li>
        <li style={style}>
          <span style={{ fontWeight: 'bold' }}>Version: </span>
          <span>{meta.version}</span>
        </li>
      </ul>
    </Panel>
  );
};

export const LookAt = (props: Props) => {
  const humanoid: VRM.VRMHumanoid = props.vrm.humanoid!;
  const firstPerson: VRM.VRMFirstPerson = props.vrm.firstPerson!;
  const lookAt: VRM.VRMLookAtHead = props.vrm.lookAt!;
  const camera: THREE.Camera = props.camera;
  const cameraControls = props.cameraControls;

  const pX = () => document.getElementById('x') as HTMLInputElement;
  const pY = () => document.getElementById('y') as HTMLInputElement;
  const pZ = () => document.getElementById('z') as HTMLInputElement;
  const rX = () => document.getElementById('rx') as HTMLInputElement;
  const rY = () => document.getElementById('ry') as HTMLInputElement;
  const rZ = () => document.getElementById('rz') as HTMLInputElement;

  const focusHead = () => {
    cameraControls.enabled = true;
    const __head = firstPerson.getFirstPersonWorldPosition(_v3);
    cameraControls.rotateTo(180 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, false);
    cameraControls.moveTo(__head.x, __head.y, __head.z, false);
    cameraControls.dollyTo(0.8, false);
  };

  const resetCamera = () => {
    cameraControls.enabled = true;
    const hip = humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position;
    cameraControls.rotateTo(180 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, false);
    cameraControls.moveTo(hip.x, hip.y, hip.z, false);
    cameraControls.dollyTo(1.5, false);
  };

  let theta = 0;
  let fi = 0;
  const v = 0.5;
  const vy = 1;

  const head = props.vrm.firstPerson!.getFirstPersonWorldPosition(new THREE.Vector3());

  const looper = (r: number) => {
    if (cameraControls.enabled) return;
    camera.lookAt(head);
    theta += v;
    fi += vy;
    camera.position.x = r * Math.sin((theta * Math.PI) / 180);
    camera.position.z = -r * Math.cos((theta * Math.PI) / 180);
    camera.position.y = (r / 2) * Math.sin((fi * Math.PI) / 180) + 1.3;

    // change target position
    requestAnimationFrame(() => looper(r));
  };

  const onClickAuto = () => {
    if (!cameraControls.enabled) return;
    cameraControls.enabled = false;
    const r = camera.position.distanceTo(head);
    looper(r);
  };

  const applyer = lookAt.applyer;
  const lookAtTypeName = applyer && applyer.type;

  const target = lookAt.target;

  return (
    <Panel title={'VRM Look At Head'}>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
        <ItemName value="Head" />
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>{firstPerson.firstPersonBone.name}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
        <ItemName value="Target" />
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
          {target && (target.name || target.uuid)}
        </div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <span>position</span>
        <ul>
          <li>
            X
            <input
              type="range"
              defaultValue={'0'}
              min="-1"
              max="1"
              step="0.1"
              id="x"
              onInput={() =>
                (humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position.x = parseFloat(pX().value))
              }
            />
          </li>
          <li>
            Y
            <input
              type="range"
              defaultValue={'1'}
              min="0"
              max="2"
              step="0.1"
              id="y"
              onInput={() =>
                (humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position.y = parseFloat(pY().value))
              }
            />
          </li>
          <li>
            Z
            <input
              type="range"
              defaultValue={'0'}
              min="-1"
              max="1"
              step="0.1"
              id="z"
              onInput={() =>
                (humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position.z = parseFloat(pZ().value))
              }
            />
          </li>
        </ul>
      </div>
      <div style={{ marginBottom: 10 }}>
        {' '}
        Rotation
        <ul>
          <li>
            X
            <input
              type="range"
              defaultValue={'0'}
              min={-Math.PI}
              max={Math.PI}
              step="0.1"
              id="rx"
              onInput={() =>
                (humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.rotation.x = parseFloat(rX().value))
              }
            />
          </li>
          <li>
            Y
            <input
              type="range"
              defaultValue={'0'}
              min={-Math.PI}
              max={Math.PI}
              step="0.1"
              id="ry"
              onInput={() =>
                (humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.rotation.y = parseFloat(rY().value))
              }
            />
          </li>
          <li>
            Z
            <input
              type="range"
              defaultValue={'0'}
              min={-Math.PI}
              max={Math.PI}
              step="0.1"
              id="rz"
              onInput={() =>
                (humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.rotation.z = parseFloat(rZ().value))
              }
            />
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
        <ItemName value="Type" />
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>{lookAtTypeName}</div>
      </div>
      <div style={{ marginBottom: 10 }}>
        {' '}
        Camera Operation
        <ul>
          <li>
            <button onClick={focusHead}>focus head</button>
          </li>
          <li>
            <button onClick={resetCamera}>reset camera</button>
          </li>
          <li>
            <button onClick={onClickAuto}>auto move camera</button>
          </li>
        </ul>
      </div>
    </Panel>
  );
};

export const FirstPerson = (props: Props) => {
  const firstPerson = props.vrm.firstPerson;

  const onClickFirstPerson = () => {
    if (!firstPerson) return;
    firstPerson.setup();
    props.camera.layers.disable(firstPerson.thirdPersonOnlyLayer);
    props.camera.layers.enable(firstPerson.firstPersonOnlyLayer);
  };

  const onClickThirdPerson = () => {
    if (!firstPerson) return;
    firstPerson.setup();
    props.camera.layers.enable(firstPerson.thirdPersonOnlyLayer);
    props.camera.layers.disable(firstPerson.firstPersonOnlyLayer);
  };

  const offset = firstPerson ? firstPerson.getFirstPersonBoneOffset(_v3) : _v3.set(0.0, 0.0, 0.0);

  return (
    <Panel title={'VRMFirstPerson'}>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <ItemName value="Bone" />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            {firstPerson && firstPerson.firstPersonBone.name}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
          <ItemName value="Offset" />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            X:
            <span>{firstPerson && offset.x}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            Y:
            <span>{firstPerson && offset.y}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Z:
            <span>{firstPerson && offset.z}</span>
          </div>
        </div>
        <ItemName value="MeshAnnotation" />
        <ul>
          {firstPerson &&
            firstPerson.meshAnnotations.map((mesh) => (
              <li style={{ paddingLeft: 100 }} key={mesh.mesh.uuid}>
                {mesh.mesh.name}
              </li>
            ))}
        </ul>
        <ul>
          <li>
            <button onClick={onClickFirstPerson}>FP Camera</button>
          </li>
          <li>
            <button onClick={onClickThirdPerson}>TP Camera</button>
          </li>
        </ul>
      </div>
    </Panel>
  );
};

export const BlendShape = (props: Props) => {
  const blendShapeProxy: VRM.VRMBlendShapeProxy = props.vrm.blendShapeProxy!;

  const setValue = (name: VRMSchema.BlendShapePresetName) => {
    blendShapeProxy.expressions.forEach((vname) => {
      blendShapeProxy.setValue(vname, 0.0);
    });
    blendShapeProxy.setValue(name, 1.0);
  };

  return (
    <Panel title={'VRMBlendShapeProxy'}>
      <ul>
        <li>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Neutral)}>Neutral</button>
        </li>
        <li>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.A)}>A</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.I)}>I</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.U)}>U</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.E)}>E</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.O)}>O</button>
        </li>
        <li>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Fun)}>Fun</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Angry)}>Angry</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Joy)}>Joy</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Sorrow)}>Sorrow</button>
        </li>
        <li>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Blink)}>Blink</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.BlinkL)}>BlinkL</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.BlinkR)}>BlinkR</button>
        </li>
        <li>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Lookup)}>Lookup</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Lookdown)}>Lookdown</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Lookright)}>Lookright</button>
          <button onClick={() => setValue(VRMSchema.BlendShapePresetName.Lookleft)}>Lookleft</button>
        </li>
      </ul>
    </Panel>
  );
};

export const SpringBone = (props: Props) => {
  const springBoneManager: VRM.VRMSpringBoneManager = props.vrm.springBoneManager!;
  const springBoneGroups = springBoneManager.springBoneGroupList;

  const groups = springBoneGroups.map((group, index) => {
    const groupArea = group.map((bone, j) => {
      const style = { fontSize: 10, marginLeft: 10 };
      const name = bone.bone.name;
      return (
        <ul key={j}>
          <li style={style}>
            <span style={{ fontWeight: 'bold' }}>Bone: </span>
            <span>{name}</span>
          </li>
          <li style={style}>
            <span style={{ fontWeight: 'bold' }}>Colliders: </span>
            {bone.colliders.length}
          </li>
        </ul>
      );
    });

    return (
      <div key={index}>
        <div>{index}</div>
        {groupArea}
      </div>
    );
  });

  return <Panel title={'VRMSpringBoneGroups'}>{groups}</Panel>;
};
