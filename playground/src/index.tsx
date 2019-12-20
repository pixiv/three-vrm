import CameraControls from 'camera-controls';
import * as React from 'react';
import { render } from 'react-dom';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMDebug, VRMDebugOptions, VRMSchema, VRMSpringBoneImporter, VRMSpringBoneImporterDebug } from '../..';
import * as Action from './components';

CameraControls.install({ THREE });

class App extends React.Component<{}, { vrmId: string | null }> {
  private canvas?: HTMLCanvasElement | null;
  private vrm?: VRM | null;
  private vrmPath?: string | null;
  private clock: THREE.Clock = new THREE.Clock();
  private scene: THREE.Scene = new THREE.Scene();
  private renderer?: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.25,
    1000,
  );
  private directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  private cameraControls?: CameraControls;
  private debug: boolean = false;
  private debugOption: VRMDebugOptions = {
    disableFaceDirectionHelper: false,
    disableSkeletonHelper: false,
    disableBoxHelper: false,
    disableSpringBoneHelper: false,
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      vrmId: null,
    };
    this.animate = this.animate.bind(this);
    this.toggleDebug = this.toggleDebug.bind(this);
  }

  public componentDidMount() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas!, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 1.0);
    this.cameraControls = new CameraControls(this.camera, this.renderer.domElement);

    this.directionalLight.position.set(20, 20, -20);
    this.scene.add(new THREE.AxesHelper(3));
    this.scene.add(new THREE.GridHelper(10, 10));
    this.scene.add(this.directionalLight);

    this.loadVRM('../models/three-vrm-girl.vrm')
      .then((vrm: VRM) => {
        this.clock.start();
        this.animate();
      })
      .catch(console.error);

    window.addEventListener('resize', () => {
      this.renderer!.setPixelRatio(window.devicePixelRatio);
      this.renderer!.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    window.addEventListener('dragover', (e) => e.preventDefault());

    // load arbitrary model!
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      // read given file then convert it to blob url
      const files = e.dataTransfer!.files;
      if (!files) {
        return;
      }
      const file = files[0];
      if (!file) {
        return;
      }
      const blob = new Blob([file], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      this.loadVRM(url);
    });
  }

  public animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    if (this.cameraControls!.enabled) this.cameraControls!.update(delta);
    if (this.vrm) this.vrm.update(delta);
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  }

  public render() {
    const vrmId = this.state.vrmId;
    return (
      <div>
        <div style={{ position: 'absolute', width: '50vw', left: 0, padding: 5 }}>
          You can change the VRM model by drag and drop.
        </div>
        <div style={{ position: 'absolute', width: 240, height: window.innerHeight, right: 0, overflowY: 'scroll' }}>
          {vrmId && (
            <Action.Transform
              key={`0${vrmId}`}
              debug={this.debug}
              vrm={this.vrm!}
              camera={this.camera}
              cameraControls={this.cameraControls!}
              toggleDebug={this.toggleDebug}
            />
          )}
          {vrmId && (
            <Action.Meta key={`1${vrmId}`} vrm={this.vrm!} camera={this.camera} cameraControls={this.cameraControls!} />
          )}
          {vrmId && (
            <Action.BlendShape
              key={`2${vrmId}`}
              vrm={this.vrm!}
              camera={this.camera}
              cameraControls={this.cameraControls!}
            />
          )}
          {vrmId && (
            <Action.FirstPerson
              key={`3${vrmId}`}
              vrm={this.vrm!}
              camera={this.camera}
              cameraControls={this.cameraControls!}
            />
          )}
          {vrmId && (
            <Action.LookAt
              key={`4${vrmId}`}
              vrm={this.vrm!}
              camera={this.camera}
              cameraControls={this.cameraControls!}
            />
          )}
          {vrmId && (
            <Action.SpringBone
              key={`5${vrmId}`}
              vrm={this.vrm!}
              camera={this.camera}
              cameraControls={this.cameraControls!}
            />
          )}
        </div>
        <canvas ref={(ref) => (this.canvas = ref)} />
      </div>
    );
  }

  private toggleDebug(key?: string) {
    if (this.vrmPath) {
      // @tslint:disable-next-line
      if (key) {
        (this.debugOption as any)[key] = !(this.debugOption as any)[key];
      } else {
        this.debug = !this.debug;
      }
      this.loadVRM(this.vrmPath);
    }
  }

  private loadVRM(path: string): Promise<VRM> {
    if (this.vrm) {
      const vrm = this.vrm;
      this.vrm = null;
      this.vrmPath = null;
      vrm.dispose();
      this.scene.remove(vrm.scene!);
    }
    return new Promise<GLTF>((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(path, resolve, () => {}, reject);
    })
      .then((gltf: any) => {
        return this.debug
          ? VRMDebug.from(
              gltf,
              {
                springBoneImporter: this.debugOption.disableSpringBoneHelper
                  ? new VRMSpringBoneImporter()
                  : new VRMSpringBoneImporterDebug(),
              },
              this.debugOption,
            )
          : VRM.from(gltf);
      })
      .then((vrm: VRM) => {
        this.vrm = vrm;
        this.vrmPath = path;

        this.vrm.humanoid!.setPose({
          leftUpperLeg: { rotation: [0, 0, -0.4537776, 0.891115] },
          leftLowerLeg: { rotation: [-0.4537776, 0, 0, 0.891115] },
          leftUpperArm: { rotation: [0, 0, -0.4537776, 0.891115] },
          rightUpperArm: { rotation: [0, 0, -0.4537776, 0.891115] },
        });
        console.log(this.vrm);

        this.scene.add(this.vrm.scene!);
        const hip = this.vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.Hips)!.position;
        this.cameraControls!.enabled = true;
        this.cameraControls!.rotateTo(180 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, false);
        this.cameraControls!.moveTo(hip.x, hip.y, hip.z, false);
        this.cameraControls!.dollyTo(1.5, false);
        this.vrm.lookAt!.target = this.camera;

        this.setState({
          vrmId: this.vrm.scene!.uuid,
        });
        return vrm;
      });
  }
}
render(<App />, document.getElementById('root'));
