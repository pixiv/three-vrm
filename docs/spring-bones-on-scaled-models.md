# Spring bones on scaled models

You might want to scale VRM models to make the model big or small.
However, it does not go that easy.
You will see spring bones react to its movement much faster or slower than you expected, like the capture below:

![A video shows the spring bone system behaves wrong on the scaled VRM model](./media/springbone-scale-wrong.mp4)

This is the limitation of the current spring bone system.
To use spring bones with scaled VRM models, you have to change the parameters of spring bones according to the scale like this:

```js
// scale the scene
const scale = 2.0; // for example
vrm.scene.scale.setScalar( scale );

// scale joints
for ( const joint of vrm.springBoneManager.joints ) {
  joint.settings.stiffness *= scale;
  joint.settings.hitRadius *= scale;
}

// scale colliders
for ( const collider of vrm.springBoneManager.colliders ) {
  const shape = collider.shape;
  if ( shape instanceof VRMSpringBoneColliderShapeCapsule ) {
    shape.radius *= scale;
    shape.tail.multiplyScalar( scale );
  } else if ( shape instanceof VRMSpringBoneColliderShapeSphere ) {
    shape.radius *= scale;
  }
}
```

By doing that, you should see the spring bone behaving successfully:

![A video shows the spring bone system behaves correctly after changing the parameters of joints and colliders according to the scale of the VRM model](./media/springbone-scale-wrong.mp4)

Or, if you want to change the scale dynamically, you might want to create `Map`s from joints and colliders to each initial parameter upon its initialization.
