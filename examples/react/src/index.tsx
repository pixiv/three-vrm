import CameraControls from "camera-controls";
import "imports-loader?THREE=three!three-vrm/lib/GLTFLoader.js";
import * as React from "react";
import { render } from "react-dom";
import * as THREE from "three";
import { GLTF, MaterialConverter, VRM, VRMDebug } from "three-vrm";
import * as Action from "./components";

CameraControls.install( { THREE } );

class App extends React.Component<{}, { loaded: boolean }> {

  private canvas?: HTMLCanvasElement | null
  private vrm?: VRM
  private clock: THREE.Clock = new THREE.Clock()
  private scene: THREE.Scene = new THREE.Scene()
  private renderer?: THREE.WebGLRenderer
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.25, 1000);
  private directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  private cameraControls?: CameraControls

  constructor (props: {}) {
    super(props);
    this.state = {
      loaded: false
    }
    this.animate = this.animate.bind(this)
  }

  public componentDidMount () {
    new Promise<GLTF>((resolve,reject) => {
      const loader = new THREE.GLTFLoader()
      loader.load("/models/shino.vrm", resolve, () => {} , reject)
    }).then( (gltf: GLTF) => {
      const materialConverter = new MaterialConverter(true)
      const debugOption = {
        disableBoxHelper: true,
        disableSkeletonHelper: true,
        disableFaceDirectionHelper: true,
        disableLeftEyeDirectionHelper: true,
        disableRightEyeDirectionHelper: true
      }
      return VRMDebug.Builder
        .option(debugOption)
        .materialConverter(materialConverter)
        .build(gltf)
    }).then ( (vrm: VRM) => {
      this.vrm = vrm
      this.vrm.setPose({
        leftUpperLeg: {rotation: [0, 0, -0.4537776, 0.891115]},
        leftLowerLeg: {rotation: [-0.4537776, 0, 0, 0.891115]},
        leftUpperArm: {rotation: [0,0, -0.4537776, 0.891115]},
        rightUpperArm: {rotation: [0,0, -0.4537776, 0.891115]}
      })

      this.renderer = new THREE.WebGLRenderer({canvas: this.canvas!, antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0xFFFFFF,1.0);

      console.log(this.vrm)

      this.cameraControls = new CameraControls(this.camera, this.renderer.domElement)
      const hip = this.vrm.humanBones.hips.position
      this.cameraControls.rotateTo(180 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, false);
      this.cameraControls.moveTo(hip.x, hip.y, hip.z, false);
      this.cameraControls.dollyTo(1.5, false);

      this.directionalLight.position.set(0, 20, 0);

      this.scene.add(new THREE.AxesHelper(3));
      this.scene.add(new THREE.GridHelper(10, 10))
      this.scene.add(this.directionalLight);
      this.scene.add(this.vrm.scene)

      this.vrm.lookAt.setTarget(this.camera)

      window.addEventListener('resize', () => {
        this.renderer!.setPixelRatio(window.devicePixelRatio);
        this.renderer!.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      })

      this.clock.start()

      this.setState({loaded:true})

    }).catch(console.error)
  }

  public animate(){
    requestAnimationFrame(this.animate)
    const delta = this.clock.getDelta()
    if(this.cameraControls!.enabled) this.cameraControls!.update( delta );
    if(this.vrm) this.vrm.update(delta)
    if(this.renderer) this.renderer.render(this.scene, this.camera);
  }

  public render () {
    const loaded = this.state.loaded
    if(loaded) this.animate()
    return (
      <div>
        <div style={{position:'absolute', width: 240, height: window.innerHeight, right: 0, overflowY:'scroll'}}>
          {loaded && <Action.Transform vrm={this.vrm!} camera={this.camera} cameraControls={this.cameraControls!}/>}
          {loaded && <Action.Meta vrm={this.vrm!} camera={this.camera} cameraControls={this.cameraControls!}/>}
          {loaded && <Action.BlendShape vrm={this.vrm!} camera={this.camera} cameraControls={this.cameraControls!}/>}
          {loaded && <Action.FirstPerson vrm={this.vrm!} camera={this.camera} cameraControls={this.cameraControls!}/>}
          {loaded && <Action.LookAt vrm={this.vrm!} camera={this.camera} cameraControls={this.cameraControls!}/>}
        </div>
        <canvas ref={ref => this.canvas = ref} />
      </div>
    )
  }
}
render(<App />, document.getElementById('root'))
