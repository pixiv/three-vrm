/* global THREE, THREE_VRM,THREE_VRM_CORE, loadMixamoAnimation */

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

const defaultModelUrl = '../models/1_0.vrm'; // 削除する

// gltf and vrm
let currentGltf = undefined;
let currentAnimationUrl = '../models/anim.fbx'; // 削除する
let currentMixer = undefined;

function loadVRM(modelUrl) {
  const loader = new THREE.GLTFLoader();
  loader.crossOrigin = 'anonymous';

  loader.register((parser) => {
    return new THREE_VRM_CORE.VRMCoreLoaderPlugin(parser, { helperRoot: scene });
  });

  loader.load(
    // URL of the VRM you want to load
    modelUrl,

    // called when the resource is loaded
    (gltf) => {
      if (currentGltf) {
        scene.remove(currentGltf.scene);
        // THREE_VRM.VRMUtils.deepDispose(currentGltf.scene);
      }

      // put the model to the scene
      scene.add(gltf.scene);
      console.log(gltf);

      currentGltf = gltf;

      const root = gltf.userData.vrmCore.humanoid.humanoidRig.root; // HumanoidRigのRootを渡す必要がある
      gltf.scene.add(root);
      console.log(root);

      if (currentAnimationUrl) {
        currentMixer = new THREE.AnimationMixer(gltf.scene); // vrmのAnimationMixerを作る
        loadMixamoAnimation(currentAnimationUrl, gltf.userData.vrmCore).then((clip) => {
          // アニメーションを読み込む
          currentMixer.clipAction(clip).play(); // アニメーションをMixerに適用してplay
        });
      }
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

  if (currentGltf) {
    currentGltf.userData.vrmCore.update(deltaTime);
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
    currentMixer = new THREE.AnimationMixer(currentGltf.scene); // vrmのAnimationMixerを作る
    loadMixamoAnimation(url, currentGltf.userData.vrmCore).then((clip) => {
      // アニメーションを読み込む
      currentMixer.clipAction(clip).play(); // アニメーションをMixerに適用してplay
    });
  } else {
    loadVRM(url);
  }
});
