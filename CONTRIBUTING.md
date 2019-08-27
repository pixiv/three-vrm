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
- When you modified some API, make sure every examples are working properly.

## Syntax guidelines

### Accessors are cool

We accept use of `get` / `set` .
Let's use them unless you have any reason you should not use accessors (there are some arguments required, the stuff we are going to see via accessor does not have to be a private member...).

Value that is required to be instanced (instances) are not appliable to this since we should give a priority to the [Instantiation should be minimal](#instantiation-should-be-minimal) rule described in below.

```ts
class someClass {
  private _counter: number = 0;

  // 😖 bad
  public getCounter(): number {
    return _counter ++;
  }

  // 😃 preferrable
  public get counter(): number {
    return _counter ++;
  }
}
```

### Instantiation should be minimal

Instantiating something ( `new` ) costs so much for us.
In our Three.js community, we are achieving most of features without some instantiations, utilizing these techniques:

#### Target instances

When you need to implement a function that is required to return a vector,
passing a target vector might let us enable to avoid needless instantiations.

```ts
// 😖 bad
function createSomeVector(): THREE.Vector3 {
  return new THREE.Vector3(5.0, 5.0, 5.0);
}

// 😃 perferrable
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
