/// <reference types="react" />
import * as THREE from 'three';
import * as VRM from 'three-vrm';
interface Props {
    vrm: VRM.VRM;
    camera: THREE.Camera;
}
export declare const Transform: (props: Props) => JSX.Element;
export declare const Meta: (props: Props) => JSX.Element;
export declare const LookAt: (props: Props) => JSX.Element;
export declare const FirstPerson: (props: Props) => JSX.Element;
export declare const BlendShape: (props: Props) => JSX.Element;
export {};
