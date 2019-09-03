/**
 * Stole the idea from `gltf-typescript-generator`
 * Original source code is distributed under unlicense
 * https://github.com/robertlong/gltf-typescript-generator/blob/master/bin/generator.js
 */

const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const traverse = (obj, func) => {
  func(obj);

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      traverse(obj[key], func);
    }
  });
};

const gen = (toplevel, schemaUrl, outPath) => {
  return new Promise((resolve, reject) => {
    cp.exec(
      `quicktype -s schema ${schemaUrl} --just-types -t ${toplevel} -l typescript`,
      (error, stdout) => {
        if (error) { reject(error); return; }

        fs.writeFile(outPath, stdout, (error) => {
          if (error) { reject(error); return; }

          resolve();
        });
      }
    );
  });
}

console.log('Generating type definitions from json schema...');
Promise.all([
  gen(
    'GLTF',
    'https://raw.githubusercontent.com/KhronosGroup/glTF/master/specification/2.0/schema/glTF.schema.json',
    path.resolve(__dirname, '../src/vrm/types/GLTFSchema.ts'),
  ),
  gen(
    'VRM',
    'https://raw.githubusercontent.com/vrm-c/vrm-specification/master/specification/0.0/schema/vrm.schema.json',
    path.resolve(__dirname, '../src/vrm/types/VRMSchema.ts'),
  ),
]).catch((error) => {
  throw error;
});
