/* global THREE, THREE_VRM_CORE, loadMixamoAnimation */

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// camera
const camera = new THREE.PerspectiveCamera(30.0, window.innerWidth / window.innerHeight, 0.1, 20.0);
camera.position.set(0.0, 1.0, 5.0);

// camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;
controls.target.set(0.0, 1.0, 0.0);
controls.update();

// scene
const scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1.0, 1.0, 1.0).normalize();
scene.add(light);

const defaultModelUrl = '../models/cube.gltf';

// gltf and vrm
let currentVrm = undefined;
let currentAnimationUrl = undefined;
let currentMixer = undefined;

const helperRoot = new THREE.Group();
helperRoot.renderOrder = 10000; // Helperをモデルよりも手前に描画させる
scene.add(helperRoot);

function loadVRM(modelUrl) {
  const loader = new THREE.GLTFLoader();
  loader.crossOrigin = 'anonymous';

  helperRoot.clear();
  loader.register((parser) => {
    return new THREE_VRM_CORE.VRMCoreLoaderPlugin(parser, { helperRoot: helperRoot, autoUpdateHumanoid: true });
  });

  loader.load(
    // URL of the VRM you want to load
    modelUrl,

    // called when the resource is loaded
    (gltf) => {
      const vrm = gltf.userData.vrmCore;
      if (currentVrm) {
        scene.remove(currentVrm.scene);
      }

      // put the model to the scene
      currentVrm = vrm;
      scene.add(vrm.scene);

      // HumanoidRigのRootを追加する必要がある
      const root = vrm.humanoid.humanoidRig.root;
      vrm.scene.add(root);

      if (currentAnimationUrl) {
        currentMixer = new THREE.AnimationMixer(vrm.scene); // vrmのAnimationMixerを作る
        loadMixamoAnimation(currentAnimationUrl, vrm).then((clip) => {
          // アニメーションを読み込む
          currentMixer.clipAction(clip).play(); // アニメーションをMixerに適用してplay
        });
      }

      console.log(vrm);
    },

    // called while loading is progressing
    (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),

    // called when loading has errors
    (error) => console.error(error),
  );
}
loadVRM(defaultModelUrl);

// helpers
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// animate
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const deltaTime = clock.getDelta();

  if (currentMixer) {
    // アニメーションが読み込まれていれば
    currentMixer.update(deltaTime); // アニメーションをアップデート
  }

  if (currentVrm) {
    currentVrm.update(deltaTime);
  }

  renderer.render(scene, camera);
}

animate();

// file input

// dnd handler
window.addEventListener('dragover', function (event) {
  event.preventDefault();
});

window.addEventListener('drop', function (event) {
  event.preventDefault();

  // read given file then convert it to blob url
  const files = event.dataTransfer.files;
  if (!files) {
    return;
  }
  const file = files[0];
  if (!file) {
    return;
  }

  const fileType = file.name.split('.').pop();
  console.log(fileType);
  const blob = new Blob([file], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);

  if (fileType === 'fbx') {
    currentAnimationUrl = url;
    currentMixer = new THREE.AnimationMixer(currentVrm.scene); // vrmのAnimationMixerを作る
    loadMixamoAnimation(url, currentVrm).then((clip) => {
      // アニメーションを読み込む
      currentMixer.clipAction(clip).play(); // アニメーションをMixerに適用してplay
    });
  } else {
    loadVRM(url);
  }
});
