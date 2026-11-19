import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { expect, test } from 'vitest';

test('the built declarations resolve in a NodeNext consumer', () => {
  const fixture = mkdtempSync(path.join(tmpdir(), 'vrm-declarations-'));

  try {
    mkdirSync(path.join(fixture, 'types', 'group'), { recursive: true });
    writeFileSync(path.join(fixture, 'package.json'), JSON.stringify({ type: 'module' }));
    writeFileSync(path.join(fixture, 'types', 'expression.d.ts'), 'export interface Expression { name: string }');
    writeFileSync(
      path.join(fixture, 'types', 'group', 'index.d.ts'),
      ['export { type Expression } from "..";', 'export { type SameDirectoryExpression } from "./local";'].join('\n'),
    );
    writeFileSync(
      path.join(fixture, 'types', 'group', 'local.d.ts'),
      'export type SameDirectoryExpression = import(".").Expression;',
    );
    writeFileSync(
      path.join(fixture, 'types', 'index.d.ts'),
      [
        'export * as VRMUtils from "./group";',
        'export { type Expression } from "./expression";',
        'export type Item = import("./expression").Expression;',
        'export declare const literal: "./expression";',
      ].join('\n'),
    );
    writeFileSync(
      path.join(fixture, 'consumer.ts'),
      [
        'import { VRMUtils, type Item, literal } from "./types/index.js";',
        'const value: Item = { name: "happy" };',
        'const fromDirectory: VRMUtils.SameDirectoryExpression = value;',
        'const unchanged: "./expression" = literal;',
        'export { fromDirectory, unchanged };',
      ].join('\n'),
    );

    const script = fileURLToPath(new URL('../../../bin/fix-declaration-imports.mjs', import.meta.url));
    execFileSync(process.execPath, [script], { cwd: fixture });

    const program = ts.createProgram([path.join(fixture, 'consumer.ts')], {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      strict: true,
      noEmit: true,
      types: [],
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    expect(
      diagnostics.map(({ code, messageText }) => [code, ts.flattenDiagnosticMessageText(messageText, '\n')]),
    ).toEqual([]);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
