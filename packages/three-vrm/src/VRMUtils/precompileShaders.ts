import * as THREE from 'three';

const _v4A = new THREE.Vector4();

/**
 * Resolves after the next frame.
 */
function sleepFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

/**
 * Time slice the given generator to prevent the main thread from being blocked.
 */
async function timeSlice(generator: Generator<void>, budgetMs: number): Promise<void> {
  let pauseTime = performance.now() + budgetMs;

  for (const _ of generator) {
    if (performance.now() > pauseTime) {
      await sleepFrame();
      pauseTime = performance.now() + budgetMs;
    }
  }
}

function* generatorAwait(promise: Promise<unknown>) {
  let finished = false;
  promise.then(() => {
    finished = true;
  });

  while (!finished) {
    yield;
  }
}

function* generatorInitMeshTexturesWebGL(renderer: THREE.WebGLRenderer, mesh: THREE.Mesh) {
  const textures: THREE.Texture[] = [];

  // Collect textures from the material
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  for (const material of materials) {
    for (const key in material) {
      const prop = (material as any)[key];
      if (prop?.isTexture) {
        textures.push(prop);
      }
    }

    // Also check the uniforms (MToon stores all textures in the uniforms)
    if ((material as any).uniforms) {
      for (const key in (material as any).uniforms) {
        const prop = (material as any).uniforms[key];
        if (prop?.value?.isTexture) {
          textures.push(prop.value);
        }
      }
    }
  }

  // Initialize textures
  for (const texture of textures) {
    if (texture.image) {
      renderer.initTexture(texture);
    }

    yield;
  }
}

function precompileMeshShadersWebGL(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  mesh: THREE.Mesh,
) {
  // We will render each mesh onto the current render target
  const tempViewport = renderer.getViewport(_v4A);
  const tempAutoClear = renderer.autoClear;

  // Set the viewport to zero to not draw anything on the target
  renderer.setViewport(0, 0, 0, 0);
  renderer.autoClear = false;

  // Clone the mesh, put it into the scene, and render it
  const meshClone = mesh.clone();
  scene.add(meshClone);
  renderer.render(scene, camera);
  scene.remove(meshClone);

  // Restore the viewport and autoClear
  renderer.setViewport(tempViewport);
  renderer.autoClear = tempAutoClear;
}

function* generatorPrecompileShadersWebGL(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  root: THREE.Object3D,
  onProgress?: (progress: { compiled: number; total: number }) => void,
) {
  const meshes: THREE.Mesh[] = [];

  // Traverse the root and collect meshes
  root.traverse((ob) => {
    if ((ob as any).isMesh) {
      meshes.push(ob as THREE.Mesh);
    }
  });

  // for each meshes...
  const nMeshes = meshes.length;
  for (let i = 0; i < nMeshes; i++) {
    const mesh = meshes[i];

    // Initialize textures
    yield* generatorInitMeshTexturesWebGL(renderer, mesh);

    // Compile shaders with `KHR_parallel_shader_compile`
    yield* generatorAwait(renderer.compileAsync(mesh, camera, scene));

    // Draw once to compile the shader on the graphics API
    precompileMeshShadersWebGL(scene, camera, renderer, mesh);

    // Report the progress
    onProgress?.({
      compiled: i + 1,
      total: nMeshes,
    });

    yield;
  }
}

async function precompileShadersWebGL(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  root: THREE.Object3D,
  onProgress?: (progress: { compiled: number; total: number }) => void,
): Promise<void> {
  await timeSlice(generatorPrecompileShadersWebGL(scene, camera, renderer, root, onProgress), 1.0);
}

/**
 * Precompile shaders for all mesh materials in the given root.
 * The shader compilation will be time sliced to prevent the main thread from being blocked.
 *
 * Call this function before adding the root to the scene.
 *
 * ```js
 * await precompileShaders(scene, camera, renderer, vrm.scene);
 * scene.add(vrm.scene);
 * ```
 *
 * This function compiles shaders by rendering meshes once to the current render target (not visible on the render target).
 * The shader variant on the graphics API might be different depending on the format of the render target.
 * Make sure to attach the render target you will use (or null if you want to render onto the canvas) to the renderer before calling this function.
 * Otherwise, this function will not make any benefits.
 *
 * This function only supports WebGLRenderer at the moment.
 *
 * @param scene The scene to render.
 * @param camera The camera to render.
 * @param renderer The renderer to render.
 * @param root The root object to precompile shaders.
 * @param onProgress A function to be called when the precompilation progresses.
 */
export async function precompileShaders(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  root: THREE.Object3D,
  onProgress?: (progress: { compiled: number; total: number }) => void,
): Promise<void> {
  if ((renderer as any).isWebGLRenderer) {
    return precompileShadersWebGL(scene, camera, renderer as THREE.WebGLRenderer, root, onProgress);
  } else {
    throw new Error('Unsupported renderer');
  }
}
