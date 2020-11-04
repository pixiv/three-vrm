# How to contribute

We always appreciate your support!

## How to develop

The below should work:

```sh
yarn
yarn dev
```

Once you start the `yarn dev`, you can see examples at http://localhost:3000/examples/ .

## Basic rules of the repository

- Be respectful to contributor of this repository, or sometimes [Three.js](https://github.com/mrdoob/three.js/wiki/How-to-contribute-to-three.js) or [VRM spec](https://github.com/vrm-c/vrm-specification).
- Pull requests should not be toward `master` branch. Use `dev` branch as a base branch unless you have any specific reason.
- Try to create a pull request per single patch or feature.
- We are not bound of [Mr.doob's Code Style™](https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2) inside of `/src`, but you MUST follow the style inside of `/examples`
- When you modified some API, make sure every example are working properly.

## `typedefgen.js`

`typedefgen.js` ( can be run via `yarn typedefgen` ) is a script that generates type definitions of GLTF and VRM schema automatically using [quicktype](https://quicktype.io/).
However, names of each interfaces/enums are not good so you have to rename these names by your own hand.
We usually don't have to generate these frequently.

## Syntax guidelines

### First of all, obey your linter

We are utilizing `eslint` and `prettier` to ensure our syntax rules consistent.

Some editors like [Visual Studio Code](https://code.visualstudio.com/) have extensions that enable us to see which part on the code is not syntactically incorrect or even fix such parts automatically.

### `private` / `protected` members must start with `_`

Every private (or protected) members of a class should have a leading underscore.
It's kind of old JavaScript convention but it actually turns out to be very useful when you want to add accessors to members.
Plus we prefer consistent syntaxes, make sure you have a leading underscore when you attempt to add some private members to our classes.

See: https://www.typescriptlang.org/docs/handbook/classes.html#accessors

```ts
class someClass {
  // 😖 bad
  private member: string = 'This is a private stuff';

  // 😃 preferable
  private _member: string = 'This is a private stuff';
}
```

### `get` / `set` are cool

We accept use of accessors ( `get` / `set` ) .
Let's use them unless you have any reason you should not use accessors (there are some arguments required, the stuff we are going to see via accessor does not have to be a private member...).

Some values that are required to be instanced (instances) are not applicable to this since we should give priority to the [Instantiation should be minimal](#instantiation-should-be-minimal) rule described below.

```ts
class someClass {
  private _counter: number = 0;

  // 😖 bad
  public getCounter(): number {
    return _counter ++;
  }

  // 😃 preferable
  public get counter(): number {
    return _counter ++;
  }
}
```

### Instantiation should be minimal

Instantiating something ( `new` ) costs so much for us.
In our Three.js community, we are achieving most of the features without some instantiations, utilizing these techniques:

#### Target instances

When you need to implement a function that is required to return a vector,
passing a target vector might let us enable to avoid needless instantiations.

```ts
// 😖 bad
function createSomeVector(): THREE.Vector3 {
  return new THREE.Vector3(5.0, 5.0, 5.0);
}

// 😃 preferable
function createSomeVector(target: THREE.Vector3): THREE.Vector3 {
  return target.set(5.0, 5.0, 5.0);
}
```

#### Temporary instances

Avoid needless instantiations using "temp" instances on global.
It actually helps us a lot...

```ts
const _v3 = new THREE.Vector3();

function processSomeVector(v: THREE.Vector3): number {
  return _v3.copy(v).addScalar(3.0).length();
  //     ^^^ using a temporary vector instead of create a new vector
}
```

## How to release

- 1, Make sure you're on `master` branch, with latest changes from `dev`

- 2, Run the following:

  ```sh
  npm version <newversion> # will also automatically runs build scripts
  git push
  git push --tags
  npm publish # will also automatically pushes some files into `gh-pages` branch
  ```

- 3, Add a release note to https://github.com/pixiv/three-vrm/releases
  - Do not forget to upload builds!
