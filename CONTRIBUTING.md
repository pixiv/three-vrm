# How to contribute

We always appreciate your support!

## How to develop

The below should work:

```sh
yarn
yarn build
cd packages/three-vrm
yarn dev
```

Once you start the `yarn dev`, you can see examples at http://localhost:10001/examples/ .

### Editing two packages at the same time

You might want to watch two or more packages at the same time, but using `yarn dev` on multiple packages creates a port conflict of dev servers.
In this case, you can specify different ports for each dev server by the environment variable `PORT` to avoid this conflict.

```sh
PORT=10002 yarn dev
```

## Basic rules of the repository

- Be respectful to contributors of this repository, or sometimes [Three.js](https://github.com/mrdoob/three.js/wiki/How-to-contribute-to-three.js) or [VRM spec](https://github.com/vrm-c/vrm-specification).
- Pull requests should not be toward `release` branch. Use `dev` branch as a base branch unless you have any specific reason.
- Try to create a pull request per single patch or feature.
- We are not bound of [Mr.doob's Code Style™](https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2) inside of `/src`, but you MUST follow the style inside of `/examples`
- When you modified some API, make sure every example are working properly.

## Syntax guidelines

### First of all, obey your linter

We are utilizing `eslint` and `prettier` to ensure our syntax rules consistent.

Some editors like [Visual Studio Code](https://code.visualstudio.com/) have extensions that enable us to see which part on the code is not syntactically incorrect or even fix such parts automatically.

In the `/examples`, the [padded-blocks](https://eslint.org/docs/latest/rules/padded-blocks) is turned off because of problems with auto-formatting in inline scripts.
Please follow the [Mr.doob's Code Style™#Blocks](https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2#blocks).

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

## Typedef packages

We also provide type definition packages (e.g. `@pixiv/types-vrmc-vrm-1.0` , `@pixiv/types-vrm-0.0` , ...)
These branches should not include any implementations.
These type definitions are authored manually by referencing the [vrm spec schema](https://github.com/vrm-c/vrm-specification).

## How to release

There is a GitHub Actions workflow called "Publish to npmjs".
The workflow is defined in `.github/workflows/publish.yml`.

https://github.com/pixiv/three-vrm/actions/workflows/publish.yml

After the workflow done, don't forget to:

- Add a release note: https://github.com/pixiv/three-vrm/releases
- Manage the milestone: https://github.com/pixiv/three-vrm/milestones
  - Rename the existing `next` milestone to the version
  - Close the milestone
  - Open a new `next` milestone

## When you add a new package to the repository

- Do not forget to add a cache path for the new package!
