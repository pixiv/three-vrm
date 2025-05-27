import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { loadMixamoAnimation } from './loadMixamoAnimation.js';
import GUI from 'three/addons/libs/lil-gui.module.min.js';

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

// camera
const camera = new THREE.PerspectiveCamera( 30.0, window.innerWidth / window.innerHeight, 0.1, 20.0 );
camera.position.set( 0.0, 1.0, 5.0 );

// camera controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.screenSpacePanning = true;
controls.target.set( 0.0, 1.0, 0.0 );
controls.update();

// scene
const scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight( 0xffffff, Math.PI );
light.position.set( 1.0, 1.0, 1.0 ).normalize();
scene.add( light );

const defaultModelUrl = '../models/VRM1_Constraint_Twist_Sample.vrm';

// gltf and vrm
let currentVrm = undefined;
let currentAnimationUrl = undefined;
let currentMixer = undefined;
let currentAction = undefined;

const helperRoot = new THREE.Group();
helperRoot.renderOrder = 10000;
scene.add( helperRoot );

function loadVRM( modelUrl ) {

	const loader = new GLTFLoader();
	loader.crossOrigin = 'anonymous';

	helperRoot.clear();

	loader.register( ( parser ) => {

		return new VRMLoaderPlugin( parser, { helperRoot: helperRoot, autoUpdateHumanBones: true } );

	} );

	loader.load(
		// URL of the VRM you want to load
		modelUrl,

		// called when the resource is loaded
		( gltf ) => {

			const vrm = gltf.userData.vrm;

			// calling this function greatly improves the performance
			VRMUtils.removeUnnecessaryVertices( gltf.scene );
			VRMUtils.combineSkeletons( gltf.scene );
			VRMUtils.combineMorphs( vrm );

			if ( currentVrm ) {

				scene.remove( currentVrm.scene );

				VRMUtils.deepDispose( currentVrm.scene );

			}

			// put the model to the scene
			currentVrm = vrm;
			scene.add( vrm.scene );

			// create AnimationMixer for VRM
			currentMixer = new THREE.AnimationMixer( currentVrm.scene );

			// Disable frustum culling
			vrm.scene.traverse( ( obj ) => {

				obj.frustumCulled = false;

			} );

			if ( currentAnimationUrl ) {

				loadFBX( currentAnimationUrl );

			}

			// rotate if the VRM is VRM0.0
			VRMUtils.rotateVRM0( vrm );

			console.log( vrm );

		},

		// called while loading is progressing
		( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),

		// called when loading has errors
		( error ) => console.error( error ),
	);

}

loadVRM( defaultModelUrl );

// mixamo animation
async function loadFBX( animationUrl ) {

	currentAnimationUrl = animationUrl;

	if ( currentMixer ) {

		// Load animation
		const clip = await loadMixamoAnimation( animationUrl, currentVrm );

		const newAction = currentMixer.clipAction( clip );
		newAction.reset().play();

		if ( currentAction && currentAction !== newAction ) {

			currentAction.crossFadeTo( newAction, 0.5, false );

		}

		currentAction = newAction;

	}

}

// helpers
const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// animate
const clock = new THREE.Clock();

function animate() {

	requestAnimationFrame( animate );

	const deltaTime = clock.getDelta();

	// if animation is loaded
	if ( currentMixer ) {

		// update the animation
		currentMixer.update( deltaTime );

	}

	if ( currentVrm ) {

		currentVrm.update( deltaTime );

	}

	renderer.render( scene, camera );

}

animate();

// gui
const gui = new GUI();

const params = {

	timeScale: 1.0,

};

gui.add( params, 'timeScale', 0.0, 2.0, 0.001 ).onChange( ( value ) => {

	currentMixer.timeScale = value;

} );

// file input

// dnd handler
window.addEventListener( 'dragover', function ( event ) {

	event.preventDefault();

} );

window.addEventListener( 'drop', function ( event ) {

	event.preventDefault();

	// read given file then convert it to blob url
	const files = event.dataTransfer.files;
	if ( ! files ) return;

	const file = files[ 0 ];
	if ( ! file ) return;

	const fileType = file.name.split( '.' ).pop();
	const blob = new Blob( [ file ], { type: 'application/octet-stream' } );
	const url = URL.createObjectURL( blob );

	if ( fileType === 'fbx' ) {

		loadFBX( url );

	} else {

		loadVRM( url );

	}

} );
