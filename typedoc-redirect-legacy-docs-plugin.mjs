// TypeDoc plugin to redirect legacy docs to the new ones
// Ref: https://github.com/Gerrit0/typedoc-plugin-redirect/blob/main/src/plugin.ts (Copyright 2024 Gerrit Birkeland, MIT License)

import { PageEvent } from 'typedoc';

const DOCS_ROOT = process.env.DOCS_ROOT || '/docs';

/**
 * Replace the input path with the new path.
 * @param {string} path The legacy path
 * @returns The new path
 */
function replacePath(path) {
  // Item and nested module pages
  // Before: /packages/three-vrm-animation/docs/classes/VRMAnimation.html
  // After: /docs/classes/three-vrm-materials-mtoon.MToonMaterial.html
  const matchItems = path.match(/packages\/(.+)\/docs\/(classes|interfaces|functions|types|variables|modules)\/(.+)/);
  if (matchItems != null) {
    const [_, packageName, kind, item] = matchItems;
    return `${DOCS_ROOT}/${kind}/${packageName}.${item}`;
  }

  // Hierarchy page
  // Before: /packages/three-vrm-animation/docs/hierarchy.html
  // After: /docs/hierarchy.html
  const matchHierarchy = path.match(/packages\/(.+)\/docs\/hierarchy/);
  if (matchHierarchy != null) {
    return `${DOCS_ROOT}/hierarchy.html`;
  }

  // Package root page (index.html or modules.html)
  // Before: /packages/three-vrm-animation/docs/index.html
  // After: /docs/modules/three-vrm-animation.html
  const matchRoot = path.match(/packages\/(.+)\/docs\//);
  if (matchRoot != null) {
    const [_, packageName] = matchRoot;
    return `${DOCS_ROOT}/modules/${packageName}.html`;
  }

  // I don't think it will reach here but return the root of the docs just in case
  return `${DOCS_ROOT}/index.html`;
}

const PAGE_TEMPLATE = `<!DOCTYPE html>

<html>
  <head>
    <title>This page has moved</title>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;URL='{DEST}'" />
  </head>
  <body>
    <p>
      This page has moved to <a href="{DEST}">{DEST}</a>
    </p>
  </body>
</html>
`.split('\n').map((line) => line.trim()).join('');

/**
 * Generate an HTML page redirecting to the new path.
 * @param {string} dest The destination path for redirection
 * @returns The HTML string for the redirect page
 */
function genPage(dest) {
  return PAGE_TEMPLATE.replace(/{DEST}/g, dest);
}

/**
 * Load the plugin.
 * @param {import('typedoc').Application} app
 */
export function load(app) {
  app.renderer.on(PageEvent.END, (event) => {
    const dest = replacePath(event.filename);
    if (dest) {
      event.contents = genPage(dest);
    }
  });
}
