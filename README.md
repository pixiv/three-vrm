# three-vrm

[VRM](https://vrm.dev/) utilities for [three.js](https://threejs.org/).

## Dependencies

```
yarn add three
```

## Usage

```
yarn add @pixiv/three-vrm
```

```javascript
import * as THREE from 'three'
import { GLTFLoader } from "three-vrm/lib/three/jsm/GLTFLoader";
import { VRM } from '@pixiv/three-vrm'

const scene = new THREE.Scene();
new Promise((resolve,reject) => {
  const loader = new GLTFLoader()
  loader.load("/models/shino.vrm", resolve, () => {} , reject)
}).then( (gltf ) => {
   const vrm = VRM.from(gltf)
   scene.add(vrm.scene)
})
```

```html
<script src="js/GLTFLoader.js"></script>
<script src="js/three-vrm.js"></script>
<script>
  const loader = new THREE.GLTFLoader();
  loader.load('/models/shino.vrm', gltf => { 
        THREE.VRM.from(gltf).then( vrm => { 
            scene.add( vrm.scene );  
        }); 
    },
  	progress => {},
  	error =>  {}
  );
</script>	
```



```javascript

```

## Examples

### Load from Html

```
three-vrm$ yarn build
three-vrm$ yarn global add http-server && http-server
```

* <http://localhost:8080/examples/html/basic.html>
* <http://localhost:8080/examples/html/dnd.html>
* <http://localhost:8080/exmaples/html/mouse.html>

### Use with React

```
three-vrm$ yarn build
three-vrm/examples/react$ yarn
three-vrm/examples/react$ yarn dev
```

* <http://localhost:4000>

## Public API 

### VRM

get the human bones of VRM model.
```
.humanBones: VRMHumanBones
```

get the utility for [blendshape](https://vrm.dev/univrm/components/univrm_blendshape/).
```
.blendShapeProxy: VRMBlendShapeProxy
```

get the utilifty for [lookAt](https://vrm.dev/univrm/components/univrm_firstperson/).
```
.lookAt: VRMLookAtHead
```

get the utility for [first person](https://vrm.dev/univrm/components/univrm_lookat/).
```
.firstPerson: VRMFirstPerson
```

get the utility for [spring bone](https://vrm.dev/univrm/components/univrm_secondary/).
```
.springBoneManager: VRMSpringBoneManager
```

get the [information](https://vrm.dev/univrm/components/univrm_meta/) of the VRM model.
```
.meta: RawVrmMeta
```

update VRM model.
```
.update(deltaTime: number)
```

call when unload VRM model.
```
.dispose()
```

### VRMBlendShapeProxy 


set the blendshape animation weight.
```
.setValue(name:string, weight:number)
```

get the blendshape animation weight.
```
.getValue(name:string) : number
```

get the blendshape animation controller.
```
.getController(name:string) : BlendShapeController
```

get the blendshape animations.
```
.expressions : AnimationClip[]
```

### VRMLookAtHead

get the head object of VRM. default is HumanBone.Head.
```
.head : THREE.Object3D 
```

set the look at target.
```
.setTarget( THREE.Object3D )
```

get the look at target.
```
.getTarget() : THREE.Object3D
```

make VRM model look specified position.
```
.lookAt(x:number, y:number, z:number)
```

### VRMFirstPerson

setup firstperson function.
* firstperson function is not setup by automatically.
* if you use firstperson function you must call this method.
* firstPersonOnlyLayer and thirdPersonOnlyLayer is camera layer.

```
.setup(cameraLayer?: {
  firstPersonOnlyLayer?: number;
  thirdPersonOnlyLayer?: number;
}) 
```

get the firstperson bone. default is Bone.head.
```
.getFirstPersonBone() : THREE.Object3D
```

get the firstperson bone offset. default is [0,0.06,0].
```
.getFirstPersonBoneOffset() : THREE.Vector3 
```

get the firstperson bone position. default is head position with offset.
```
.getFirstBonePosition(v3: THREE.Vector3) : THREE.Vector3
```

get the First Person Camera layer. default is 9.
```
.getFirstPersonOnlyLayer(): number
```

get the Third Person Camera layer. default is 10.
```
.getThirdPersonOnlyLayer(): number
```

### VRMSpringBoneManager

manually reset the spring bones.
```
.reset(): void
```

get the spring bones.
```
.springBoneGroupList: VRMSpringBoneGroup[]
```