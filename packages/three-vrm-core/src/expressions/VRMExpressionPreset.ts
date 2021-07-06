/* eslint-disable @typescript-eslint/naming-convention */

export const VRMExpressionPreset = {
  Aa: 'aa',
  Ih: 'ih',
  Ou: 'ou',
  Ee: 'ee',
  Oh: 'oh',
  Blink: 'blink',
  Happy: 'happy',
  Angry: 'angry',
  Sad: 'sad',
  Relaxed: 'relaxed',
  LookUp: 'lookUp',
  Surprised: 'surprised',
  LookDown: 'lookDown',
  LookLeft: 'lookLeft',
  LookRight: 'lookRight',
  BlinkLeft: 'blinkLeft',
  BlinkRight: 'blinkRight',
  Neutral: 'neutral',
} as const;

export type VRMExpressionPreset = typeof VRMExpressionPreset[keyof typeof VRMExpressionPreset];
