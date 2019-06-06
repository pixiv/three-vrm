import * as React from 'react'
import * as THREE from 'three'
import * as VRM from 'three-vrm'

interface Props {
  vrm: VRM.VRM,
  camera: THREE.Camera
}

interface PanelProps {
  title: string,
}

const ItemName:  React.FunctionComponent<{value:string}> = ({value}) =>
  <h2 style={{fontSize: 10, display: 'flex', alignItems: 'center', marginRight: 10, width: 60}}>{value}</h2>

const Panel: React.FunctionComponent<PanelProps> = ({title, children}) => {
  return (
    <section>
      <h1 style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e04e3f',
        height: 24,
        fontSize: 12,
        color: 'white',
        paddingLeft: 10
      }}>
        {title}
      </h1>
      <div style={{padding: 5, fontSize: 10, backgroundColor: 'rgba(120,120,120,0.3)'}}>{children}</div>
    </section>
  )
}

export const Transform = (props: Props) => {
  const vrm = props.vrm
  const position = vrm.scene.position
  const rotation = vrm.scene.rotation
  const scale = vrm.scene.scale

  const nvl = (value: string, defVal: number) => {
    if (value === undefined || value === null || !value.length) return defVal
    const v = parseInt(value, 10)
    return isNaN(v) ? defVal : v
  }

  return (
    <Panel title={'Transform'}>
      <div>
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          <ItemName value="Position"/>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>X
            <input style={{width: 30}} defaultValue={position.x.toString()}
                   onChange={(e) => position.x = nvl(e.target.value, position.x)}/></div>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>Y
            <input style={{width: 30}} defaultValue={position.y.toString()}
                   onChange={(e) => position.y = nvl(e.target.value, position.y)}/></div>
          <div style={{display: 'flex', alignItems: 'center'}}>Z
            <input style={{width: 30}} defaultValue={position.z.toString()}
                   onChange={(e) => position.z = nvl(e.target.value, position.z)}/></div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          <ItemName value="Rotation"/>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>X
            <input style={{width: 30}} defaultValue={rotation.x.toString()}
                   onChange={(e) => rotation.x = nvl(e.target.value, rotation.x)}/></div>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>Y
            <input style={{width: 30}} defaultValue={rotation.y.toString()}
                   onChange={(e) => rotation.y = nvl(e.target.value, rotation.y)}/></div>
          <div style={{display: 'flex', alignItems: 'center'}}>Z
            <input style={{width: 30}} defaultValue={rotation.z.toString()}
                   onChange={(e) => rotation.z = nvl(e.target.value, rotation.z)}/></div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          <ItemName value="Scale"/>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>X
            <input style={{width: 30}} defaultValue={scale.x.toString()}
                   onChange={(e) => scale.x = nvl(e.target.value, scale.x)}/></div>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>Y
            <input style={{width: 30}} defaultValue={scale.y.toString()}
                   onChange={(e) => scale.y = nvl(e.target.value, scale.y)}/></div>
          <div style={{display: 'flex', alignItems: 'center'}}>Z
            <input style={{width: 30}} defaultValue={scale.z.toString()}
                   onChange={(e) => scale.z = nvl(e.target.value, scale.z)}/></div>
        </div>
      </div>
    </Panel>
  )
}

export const Meta = (props: Props) => {
  const meta: VRM.RawVrmMeta = props.vrm.meta
  const style = {fontSize: 10}
  return (
    <Panel title={'VRMMeta'}>
      <ul>
        <li style={style}><span style={{fontWeight:'bold'}}>Title: </span><span>{meta.title}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>AllowedUser: </span><span>{meta.allowedUserName}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>Author: </span><span>{meta.author}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>CommercialUssage: </span><span>{meta.commercialUssageName}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>Contact: </span><span>{meta.contactInformation}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>Licence: </span><span>{meta.licenseName}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>LicenceURL: </span><a target="_blank" href={meta.otherLicenseUrl}>Here</a></li>
        <li style={style}><span style={{fontWeight:'bold'}}>PermissionURL: </span><a target="_blank" href={meta.otherPermissionUrl}>Here</a></li>
        <li style={style}><span style={{fontWeight:'bold'}}>Reference: </span><span>{meta.reference}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>SexualUssage: </span><span>{meta.sexualUssageName}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>ViolentUssage: </span><span>{meta.violentUssageName}</span></li>
        <li style={style}><span style={{fontWeight:'bold'}}>Version: </span><span>{meta.version}</span></li>
      </ul>
    </Panel>
  )
}

export const LookAt = (props: Props) => {
  const humanBones: VRM.VRMHumanBones = props.vrm.humanBones
  const lookAt: VRM.VRMLookAtHead = props.vrm.lookAt
  const camera: THREE.Camera = props.camera

  const pX = () => document.getElementById('x') as HTMLInputElement
  const pY = () => document.getElementById('y') as HTMLInputElement
  const pZ = () => document.getElementById('z') as HTMLInputElement
  const rX = () => document.getElementById('rx') as HTMLInputElement
  const rY = () => document.getElementById('ry') as HTMLInputElement
  const rZ = () => document.getElementById('rz') as HTMLInputElement

  let autoRotate = false
  const focusHead = () => {
    autoRotate = false
    const __head = lookAt.getHeadPosition()
    camera.position.set(__head[0], __head[1], __head[2])
    camera.rotation.set(0, Math.PI, 0)
    camera.position.z -= 0.5
  }

  const resetCamera = () => {
    autoRotate = false
    camera.position.set(0, 1, -3)
    camera.rotation.set(0, Math.PI, 0)
  }

  let theta = 0
  let fi = 0
  const v = 0.5
  const vy = 1

  const _head = props.vrm.lookAt.getHeadPosition()
  const head = new THREE.Vector3(_head[0], _head[1], _head[2])

  const looper = (r: number) => {
    if (!autoRotate) return
    camera.lookAt(head)
    theta += v
    fi += vy
    camera.position.x = r * Math.sin(theta * Math.PI / 180)
    camera.position.z = -r * Math.cos(theta * Math.PI / 180)
    camera.position.y = (r / 2) * Math.sin(fi * Math.PI / 180) + 1.3

    // change target position
    requestAnimationFrame(() => looper(r))
  }

  const onClickAuto = () => {
    if (autoRotate) return
    autoRotate = true
    const r = camera.position.distanceTo(head)
    looper(r)
  }

  const applyer = lookAt.getApplyer()
  const lookAtTypeName = applyer && applyer.name()

  return (
    <Panel title={"VRM Look At Head"}>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
        <ItemName value="Head"/>
        <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>{lookAt.head.name}</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
        <h2 style={{display: 'flex', alignItems: 'center', marginRight: 10, width: 60}}>Target</h2>
        <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>{lookAt.getTarget().name}</div>
      </div>
      <div style={{marginBottom: 10}}><span>position</span>
        <ul>
          <li>X<input type="range" defaultValue={'0'} min="-1" max="1" step="0.1" id="x"
                      onInput={() => humanBones.hips.position.x = parseFloat(pX().value)}/></li>
          <li>Y<input type="range" defaultValue={'1'} min="0" max="2" step="0.1" id="y"
                      onInput={() => humanBones.hips.position.y = parseFloat(pY().value)}/></li>
          <li>Z<input type="range" defaultValue={'0'} min="-1" max="1" step="0.1" id="z"
                      onInput={() => humanBones.hips.position.z = parseFloat(pZ().value)}/></li>
        </ul>
      </div>
      <div style={{marginBottom: 10}}> Rotation
        <ul>
          <li>X<input type="range" defaultValue={'0'} min={-Math.PI} max={Math.PI} step="0.1" id="rx"
                      onInput={() => humanBones.hips.rotation.x = parseFloat(rX().value)}/></li>
          <li>Y<input type="range" defaultValue={'0'} min={-Math.PI} max={Math.PI} step="0.1" id="ry"
                      onInput={() => humanBones.hips.rotation.y = parseFloat(rY().value)}/></li>
          <li>Z<input type="range" defaultValue={'0'} min={-Math.PI} max={Math.PI} step="0.1" id="rz"
                      onInput={() => humanBones.hips.rotation.z = parseFloat(rZ().value)}/></li>
        </ul>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
        <h2 style={{display: 'flex', alignItems: 'center', marginRight: 10, width: 160}}>look At Type Name</h2>
        <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>{lookAtTypeName}</div>
      </div>
      <div style={{marginBottom: 10}}> Camera Operation
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
  )
}

export const FirstPerson = (props: Props) => {

  const firstPerson: VRM.VRMFirstPerson = props.vrm.firstPerson

  const onClickFirstPerson = () => {
    firstPerson.setup()
    props.camera.layers.disable(firstPerson.getThirdPersonOnlyLayer())
    props.camera.layers.enable(firstPerson.getFirstPersonOnlyLayer())
  }

  const onClickThirdPerson = () => {
    firstPerson.setup()
    props.camera.layers.enable(firstPerson.getThirdPersonOnlyLayer())
    props.camera.layers.disable(firstPerson.getFirstPersonOnlyLayer())
  }
  return (
    <Panel title={"VRMFirstPerson"}>
      <div>
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          <ItemName value="Bone"/>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>{firstPerson.getFirstPersonBone().name}</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          <ItemName value="Offset"/>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>X:
            <span>{firstPerson.getFirstPersonBoneOffset().x}</span></div>
          <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>Y:
            <span>{firstPerson.getFirstPersonBoneOffset().y}</span></div>
          <div style={{display: 'flex', alignItems: 'center'}}>Z:
            <span>{firstPerson.getFirstPersonBoneOffset().z}</span></div>
        </div>
        <ItemName value="Mesh Annotation"/>
        <ul>
          {firstPerson.getMeshAnnotations().map( mesh => <li key={mesh.node.uuid}>{mesh.node.name}</li>)}
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
  )
}

export const BlendShape = (props: Props) => {

  const blendShapeProxy: VRM.VRMBlendShapeProxy = props.vrm.blendShapeProxy

  const setValue = (name:VRM.BlendShapePresetName) => {
    Object.keys(blendShapeProxy.expressions).forEach( vname => {
      blendShapeProxy.setValue(vname, 0.0)
    })
    blendShapeProxy.setValue(name, 1.0)
  }

  return (
    <Panel title={"VRMBlendShapeProxy"}>
      <ul>
        <li>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Neutral)}>Neutral</button>
        </li>
        <li>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.A)}>A</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.I)}>I</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.U)}>U</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.E)}>E</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.O)}>O</button>
        </li>
        <li>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Fun)}>Fun</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Angry)}>Angry</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Joy)}>Joy</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Sorrow)}>Sorrow</button>
        </li>
        <li>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Blink)}>Blink</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.BlinkL)}>BlinkL</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.BlinkR)}>BlinkR</button>
        </li>
        <li>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Lookup)}>Lookup</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Lookdown)}>Lookdown</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Lookright)}>Lookright</button>
          <button onClick={()=>setValue(VRM.BlendShapePresetName.Lookleft)}>Lookleft</button>
        </li>
      </ul>
    </Panel>
  )
}

