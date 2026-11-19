// @ts-check
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const options = {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
};

for (const entry of readdirSync('types', { recursive: true, withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.d.ts')) {
    fixDeclaration(path.resolve(entry.parentPath, entry.name));
  }
}

/** @param {string} fileName */
function fixDeclaration(fileName) {
  const source = readFileSync(fileName, 'utf8');
  const declaration = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest);
  /** @type {{ start: number, end: number, specifier: string }[]} */
  const edits = [];

  visit(declaration);

  if (edits.length > 0) {
    let updated = source;
    for (const { start, end, specifier } of edits.reverse()) {
      updated = updated.slice(0, start) + JSON.stringify(specifier) + updated.slice(end);
    }
    writeFileSync(fileName, updated);
  }

  /** @param {ts.Node} node */
  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      fixSpecifier(node.moduleSpecifier);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      fixSpecifier(node.argument.literal);
    } else if (ts.isExternalModuleReference(node)) {
      fixSpecifier(node.expression);
    } else if (ts.isModuleDeclaration(node)) {
      fixSpecifier(node.name);
    }
    ts.forEachChild(node, visit);
  }

  /** @param {ts.Node | undefined} specifier */
  function fixSpecifier(specifier) {
    if (!specifier || !ts.isStringLiteral(specifier) || !/^\.\.?(?:\/|$)/.test(specifier.text)) {
      return;
    }

    // Use the same resolution as declaration emit, including directory index files.
    const target = ts.resolveModuleName(specifier.text, fileName, options, ts.sys).resolvedModule;
    if (target?.extension !== ts.Extension.Dts) {
      return;
    }

    let explicit = path.relative(path.dirname(fileName), target.resolvedFileName);
    explicit = explicit.replaceAll(path.sep, '/').replace(/\.d\.ts$/, '.js');
    if (!explicit.startsWith('../')) {
      explicit = './' + explicit;
    }

    if (explicit !== specifier.text) {
      edits.push({ start: specifier.getStart(declaration), end: specifier.getEnd(), specifier: explicit });
    }
  }
}
