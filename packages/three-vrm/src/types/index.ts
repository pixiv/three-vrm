// Typedoc does not support export declarations yet
// then we have to use `namespace` instead of export declarations for now.
// See: https://github.com/TypeStrong/typedoc/pull/801

// import * as GLTFSchema from './GLTFSchema';
// import * as VRMSchema from './VRMSchema';

// export { GLTFSchema, VRMSchema };

export * from './GLTFSchema';
export * from './VRMSchema';

export * from './types';
