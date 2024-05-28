// we should remove this once upstream support
/* eslint-disable @typescript-eslint/naming-convention */
export declare const VRMViewerElement: {
  new (...args: any[]): import('./features/vrm-mixin').VRMInterface;
  prototype: import('./features/vrm-mixin').VRMInterface;
} & object & {
    new (...args: any[]): import('@google/model-viewer/src/features/annotation').AnnotationInterface;
    prototype: import('@google/model-viewer/src/features/annotation').AnnotationInterface;
  } & {
    new (...args: any[]): import('@google/model-viewer/src/features/scene-graph').SceneGraphInterface;
    prototype: import('@google/model-viewer/src/features/scene-graph').SceneGraphInterface;
  } & {
    new (...args: any[]): import('@google/model-viewer/src/features/staging').StagingInterface;
    prototype: import('@google/model-viewer/src/features/staging').StagingInterface;
  } & {
    new (...args: any[]): import('@google/model-viewer/src/features/environment').EnvironmentInterface;
    prototype: import('@google/model-viewer/src/features/environment').EnvironmentInterface;
  } & {
    new (...args: any[]): import('@google/model-viewer/src/features/controls').ControlsInterface;
    prototype: import('@google/model-viewer/src/features/controls').ControlsInterface;
  } & {
    new (...args: any[]): import('@google/model-viewer/src/features/ar').ARInterface;
    prototype: import('@google/model-viewer/src/features/ar').ARInterface;
  } & {
    new (...args: any[]): import('@google/model-viewer/src/features/loading').LoadingInterface;
    prototype: import('@google/model-viewer/src/features/loading').LoadingInterface;
  } & import('@google/model-viewer/src/features/loading').LoadingStaticInterface & {
    new (...args: any[]): import('@google/model-viewer/src/features/animation').AnimationInterface;
    prototype: import('@google/model-viewer/src/features/animation').AnimationInterface;
  } & typeof import('@google/model-viewer/src/model-viewer-base').default;
export type VRMViewerElement = InstanceType<typeof VRMViewerElement>;
declare global {
  interface HTMLElementTagNameMap {
    'vrm-viewer': VRMViewerElement;
  }
}
