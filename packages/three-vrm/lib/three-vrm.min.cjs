/*! (c) 2019-2024 pixiv Inc. - https://github.com/pixiv/three-vrm/blob/release/LICENSE */
"use strict";var fr=Object.create;var Le=Object.defineProperty;var _r=Object.getOwnPropertyDescriptor;var gr=Object.getOwnPropertyNames;var vr=Object.getPrototypeOf,Er=Object.prototype.hasOwnProperty;var Mr=(t,e)=>{for(var n in e)Le(t,n,{get:e[n],enumerable:!0})},gn=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of gr(e))!Er.call(t,r)&&r!==n&&Le(t,r,{get:()=>e[r],enumerable:!(i=_r(e,r))||i.enumerable});return t};var M=(t,e,n)=>(n=t!=null?fr(vr(t)):{},gn(e||!t||!t.__esModule?Le(n,"default",{value:t,enumerable:!0}):n,t)),Rr=t=>gn(Le({},"__esModule",{value:!0}),t);var _e=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())});var ko={};Mr(ko,{MToonMaterial:()=>si,MToonMaterialDebugMode:()=>ri,MToonMaterialLoaderPlugin:()=>Mt,MToonMaterialOutlineWidthMode:()=>ze,VRM:()=>he,VRMAimConstraint:()=>gi,VRMCore:()=>ke,VRMCoreLoaderPlugin:()=>Xr,VRMExpression:()=>rt,VRMExpressionLoaderPlugin:()=>Oe,VRMExpressionManager:()=>ot,VRMExpressionMaterialColorBind:()=>st,VRMExpressionMaterialColorType:()=>ue,VRMExpressionMorphTargetBind:()=>at,VRMExpressionOverrideType:()=>wr,VRMExpressionPresetName:()=>Ue,VRMExpressionTextureTransformBind:()=>lt,VRMFirstPerson:()=>ut,VRMFirstPersonLoaderPlugin:()=>Ne,VRMFirstPersonMeshAnnotationType:()=>Sr,VRMHumanBoneList:()=>Ve,VRMHumanBoneName:()=>Lr,VRMHumanBoneParentMap:()=>zn,VRMHumanoid:()=>ct,VRMHumanoidHelper:()=>dt,VRMHumanoidLoaderPlugin:()=>Be,VRMLoaderPlugin:()=>$e,VRMLookAt:()=>Zn,VRMLookAtBoneApplier:()=>ve,VRMLookAtExpressionApplier:()=>Ce,VRMLookAtHelper:()=>Xn,VRMLookAtLoaderPlugin:()=>Fe,VRMLookAtRangeMap:()=>ft,VRMLookAtTypeName:()=>Gr,VRMMetaLoaderPlugin:()=>We,VRMNodeConstraint:()=>Xe,VRMNodeConstraintHelper:()=>Qe,VRMNodeConstraintLoaderPlugin:()=>xt,VRMNodeConstraintManager:()=>vi,VRMRequiredHumanBoneName:()=>qn,VRMRollConstraint:()=>Mi,VRMRotationConstraint:()=>Ei,VRMSpringBoneCollider:()=>Pt,VRMSpringBoneColliderHelper:()=>wt,VRMSpringBoneColliderShape:()=>At,VRMSpringBoneColliderShapeCapsule:()=>Lt,VRMSpringBoneColliderShapeSphere:()=>Ht,VRMSpringBoneJoint:()=>Hi,VRMSpringBoneJointHelper:()=>wi,VRMSpringBoneLoaderPlugin:()=>bt,VRMSpringBoneManager:()=>St,VRMUtils:()=>ae});module.exports=Rr(ko);var Vn=M(require("three"),1),X=M(require("three"),1),_t=M(require("three"),1),Dn=M(require("three"),1),D=M(require("three"),1),j=M(require("three"),1),De=M(require("three"),1),B=M(require("three"),1),S=M(require("three"),1),Ee=M(require("three"),1),Y=M(require("three"),1),V=M(require("three"),1),vt=M(require("three"),1),A=M(require("three"),1),mt=M(require("three"),1),Jn=M(require("three"),1);var w=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())}),rt=class extends Vn.Object3D{constructor(t){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${t}`,this.expressionName=t,this.type="VRMExpression",this.visible=!1}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.weight?1:0:this.overrideBlink==="blend"?this.weight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.weight?1:0:this.overrideLookAt==="blend"?this.weight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.weight?1:0:this.overrideMouth==="blend"?this.weight:0}addBind(t){this._binds.push(t)}applyWeight(t){var e;let n=this.isBinary?this.weight<=.5?0:1:this.weight;n*=(e=t==null?void 0:t.multiplier)!=null?e:1,this._binds.forEach(i=>i.applyWeight(n))}clearAppliedWeight(){this._binds.forEach(t=>t.clearAppliedWeight())}};function In(t,e,n){var i,r;let s=t.parser.json,a=(i=s.nodes)==null?void 0:i[e];if(a==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;let l=a.mesh;if(l==null)return null;let o=(r=s.meshes)==null?void 0:r[l];if(o==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${l}] of glTF but the mesh doesn't exist`),null;let u=o.primitives.length,d=[];return n.traverse(c=>{d.length<u&&c.isMesh&&d.push(c)}),d}function vn(t,e){return w(this,null,function*(){let n=yield t.parser.getDependency("node",e);return In(t,e,n)})}function En(t){return w(this,null,function*(){let e=yield t.parser.getDependencies("node"),n=new Map;return e.forEach((i,r)=>{let s=In(t,r,i);s!=null&&n.set(r,s)}),n})}var Ue={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function Un(t){return Math.max(Math.min(t,1),0)}var ot=class Cn{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let e={},n=new Set(Object.values(Ue));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)&&(e[i]=r)}),e}get customExpressionMap(){let e={},n=new Set(Object.values(Ue));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)||(e[i]=r)}),e}copy(e){return this._expressions.concat().forEach(i=>{this.unregisterExpression(i)}),e._expressions.forEach(i=>{this.registerExpression(i)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new Cn().copy(this)}getExpression(e){var n;return(n=this._expressionMap[e])!=null?n:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){let n=this._expressions.indexOf(e);n===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(n,1),delete this._expressionMap[e.expressionName]}getValue(e){var n;let i=this.getExpression(e);return(n=i==null?void 0:i.weight)!=null?n:null}setValue(e,n){let i=this.getExpression(e);i&&(i.weight=Un(n))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){let n=this.getExpression(e);return n?`${n.name}.weight`:null}update(){let e=this._calculateWeightMultipliers();this._expressions.forEach(n=>{n.clearAppliedWeight()}),this._expressions.forEach(n=>{let i=1,r=n.expressionName;this.blinkExpressionNames.indexOf(r)!==-1&&(i*=e.blink),this.lookAtExpressionNames.indexOf(r)!==-1&&(i*=e.lookAt),this.mouthExpressionNames.indexOf(r)!==-1&&(i*=e.mouth),n.applyWeight({multiplier:i})})}_calculateWeightMultipliers(){let e=1,n=1,i=1;return this._expressions.forEach(r=>{e-=r.overrideBlinkAmount,n-=r.overrideLookAtAmount,i-=r.overrideMouthAmount}),e=Math.max(0,e),n=Math.max(0,n),i=Math.max(0,i),{blink:e,lookAt:n,mouth:i}}},ue={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},Tr={_Color:ue.Color,_EmissionColor:ue.EmissionColor,_ShadeColor:ue.ShadeColor,_RimColor:ue.RimColor,_OutlineColor:ue.OutlineColor},xr=new _t.Color,On=class Nn{constructor({material:e,type:n,targetValue:i,targetAlpha:r}){this.material=e,this.type=n,this.targetValue=i,this.targetAlpha=r!=null?r:1;let s=this._initColorBindState(),a=this._initAlphaBindState();this._state={color:s,alpha:a}}applyWeight(e){let{color:n,alpha:i}=this._state;if(n!=null){let{propertyName:r,deltaValue:s}=n,a=this.material[r];a!=null&&a.add(xr.copy(s).multiplyScalar(e))}if(i!=null){let{propertyName:r,deltaValue:s}=i;this.material[r]!=null&&(this.material[r]+=s*e)}}clearAppliedWeight(){let{color:e,alpha:n}=this._state;if(e!=null){let{propertyName:i,initialValue:r}=e,s=this.material[i];s!=null&&s.copy(r)}if(n!=null){let{propertyName:i,initialValue:r}=n;this.material[i]!=null&&(this.material[i]=r)}}_initColorBindState(){var e,n,i;let{material:r,type:s,targetValue:a}=this,l=this._getPropertyNameMap(),o=(n=(e=l==null?void 0:l[s])==null?void 0:e[0])!=null?n:null;if(o==null)return console.warn(`Tried to add a material color bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${s} but the material or the type is not supported.`),null;let d=r[o].clone(),c=new _t.Color(a.r-d.r,a.g-d.g,a.b-d.b);return{propertyName:o,initialValue:d,deltaValue:c}}_initAlphaBindState(){var e,n,i;let{material:r,type:s,targetAlpha:a}=this,l=this._getPropertyNameMap(),o=(n=(e=l==null?void 0:l[s])==null?void 0:e[1])!=null?n:null;if(o==null&&a!==1)return console.warn(`Tried to add a material alpha bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${s} but the material or the type does not support alpha.`),null;if(o==null)return null;let u=r[o],d=a-u;return{propertyName:o,initialValue:u,deltaValue:d}}_getPropertyNameMap(){var e,n;return(n=(e=Object.entries(Nn._propertyNameMapMap).find(([i])=>this.material[i]===!0))==null?void 0:e[1])!=null?n:null}};On._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var st=On,at=class{constructor({primitives:t,index:e,weight:n}){this.primitives=t,this.index=e,this.weight=n}applyWeight(t){this.primitives.forEach(e=>{var n;((n=e.morphTargetInfluences)==null?void 0:n[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*t)})}clearAppliedWeight(){this.primitives.forEach(t=>{var e;((e=t.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(t.morphTargetInfluences[this.index]=0)})}},Mn=new Dn.Vector2,Bn=class Fn{constructor({material:e,scale:n,offset:i}){var r,s;this.material=e,this.scale=n,this.offset=i;let a=(r=Object.entries(Fn._propertyNamesMap).find(([l])=>e[l]===!0))==null?void 0:r[1];a==null?(console.warn(`Tried to add a texture transform bind to the material ${(s=e.name)!=null?s:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],a.forEach(l=>{var o;let u=(o=e[l])==null?void 0:o.clone();if(!u)return null;e[l]=u;let d=u.offset.clone(),c=u.repeat.clone(),f=i.clone().sub(d),p=n.clone().sub(c);this._properties.push({name:l,initialOffset:d,deltaOffset:f,initialScale:c,deltaScale:p})}))}applyWeight(e){this._properties.forEach(n=>{let i=this.material[n.name];i!==void 0&&(i.offset.add(Mn.copy(n.deltaOffset).multiplyScalar(e)),i.repeat.add(Mn.copy(n.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{let n=this.material[e.name];n!==void 0&&(n.offset.copy(e.initialOffset),n.repeat.copy(e.initialScale))})}};Bn._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var lt=Bn,yr=new Set(["1.0","1.0-beta"]),Wn=class kn{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return w(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return w(this,null,function*(){let n=yield this._v1Import(e);if(n)return n;let i=yield this._v0Import(e);return i||null})}_v1Import(e){return w(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let a=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!a)return null;let l=a.specVersion;if(!yr.has(l))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let o=a.expressions;if(!o)return null;let u=new Set(Object.values(Ue)),d=new Map;o.preset!=null&&Object.entries(o.preset).forEach(([f,p])=>{if(p!=null){if(!u.has(f)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${f}" detected. Ignoring the expression`);return}d.set(f,p)}}),o.custom!=null&&Object.entries(o.custom).forEach(([f,p])=>{if(u.has(f)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${f}". Ignoring the expression`);return}d.set(f,p)});let c=new ot;return yield Promise.all(Array.from(d.entries()).map(f=>w(this,[f],function*([p,m]){var h,_,g,y,x,v,T;let E=new rt(p);if(e.scene.add(E),E.isBinary=(h=m.isBinary)!=null?h:!1,E.overrideBlink=(_=m.overrideBlink)!=null?_:"none",E.overrideLookAt=(g=m.overrideLookAt)!=null?g:"none",E.overrideMouth=(y=m.overrideMouth)!=null?y:"none",(x=m.morphTargetBinds)==null||x.forEach(R=>w(this,null,function*(){var L;if(R.node===void 0||R.index===void 0)return;let U=yield vn(e,R.node),H=R.index;if(!U.every(b=>Array.isArray(b.morphTargetInfluences)&&H<b.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${m.name} attempts to index morph #${H} but not found.`);return}E.addBind(new at({primitives:U,index:H,weight:(L=R.weight)!=null?L:1}))})),m.materialColorBinds||m.textureTransformBinds){let R=[];e.scene.traverse(L=>{let U=L.material;U&&R.push(U)}),(v=m.materialColorBinds)==null||v.forEach(L=>w(this,null,function*(){R.filter(H=>{var b;let C=(b=this.parser.associations.get(H))==null?void 0:b.materials;return L.material===C}).forEach(H=>{E.addBind(new st({material:H,type:L.type,targetValue:new X.Color().fromArray(L.targetValue),targetAlpha:L.targetValue[3]}))})})),(T=m.textureTransformBinds)==null||T.forEach(L=>w(this,null,function*(){R.filter(H=>{var b;let C=(b=this.parser.associations.get(H))==null?void 0:b.materials;return L.material===C}).forEach(H=>{var b,C;E.addBind(new lt({material:H,offset:new X.Vector2().fromArray((b=L.offset)!=null?b:[0,0]),scale:new X.Vector2().fromArray((C=L.scale)!=null?C:[1,1])}))})}))}c.registerExpression(E)}))),c})}_v0Import(e){return w(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let s=r.blendShapeMaster;if(!s)return null;let a=new ot,l=s.blendShapeGroups;if(!l)return a;let o=new Set;return yield Promise.all(l.map(u=>w(this,null,function*(){var d;let c=u.presetName,f=c!=null&&kn.v0v1PresetNameMap[c]||null,p=f!=null?f:u.name;if(p==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(o.has(p)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${c} has duplicated entries. Ignoring the expression`);return}o.add(p);let m=new rt(p);e.scene.add(m),m.isBinary=(d=u.isBinary)!=null?d:!1,u.binds&&u.binds.forEach(_=>w(this,null,function*(){var g;if(_.mesh===void 0||_.index===void 0)return;let y=[];(g=i.nodes)==null||g.forEach((v,T)=>{v.mesh===_.mesh&&y.push(T)});let x=_.index;yield Promise.all(y.map(v=>w(this,null,function*(){var T;let E=yield vn(e,v);if(!E.every(R=>Array.isArray(R.morphTargetInfluences)&&x<R.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${u.name} attempts to index ${x}th morph but not found.`);return}m.addBind(new at({primitives:E,index:x,weight:.01*((T=_.weight)!=null?T:100)}))})))}));let h=u.materialValues;h&&h.length!==0&&h.forEach(_=>{if(_.materialName===void 0||_.propertyName===void 0||_.targetValue===void 0)return;let g=[];e.scene.traverse(x=>{if(x.material){let v=x.material;Array.isArray(v)?g.push(...v.filter(T=>(T.name===_.materialName||T.name===_.materialName+" (Outline)")&&g.indexOf(T)===-1)):v.name===_.materialName&&g.indexOf(v)===-1&&g.push(v)}});let y=_.propertyName;g.forEach(x=>{if(y==="_MainTex_ST"){let T=new X.Vector2(_.targetValue[0],_.targetValue[1]),E=new X.Vector2(_.targetValue[2],_.targetValue[3]);E.y=1-E.y-T.y,m.addBind(new lt({material:x,scale:T,offset:E}));return}let v=Tr[y];if(v){m.addBind(new st({material:x,type:v,targetValue:new X.Color().fromArray(_.targetValue),targetAlpha:_.targetValue[3]}));return}console.warn(y+" is not supported")})}),a.registerExpression(m)}))),a})}};Wn.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var Oe=Wn,wr={None:"none",Block:"block",Blend:"blend"},gt=class de{constructor(e,n){this._firstPersonOnlyLayer=de.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=de.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=n}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(n=>({meshes:n.meshes.concat(),type:n.type})),this}clone(){return new de(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=de.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:n=de.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=n,this.meshAnnotations.forEach(i=>{i.meshes.forEach(r=>{i.type==="firstPersonOnly"?(r.layers.set(this._firstPersonOnlyLayer),r.traverse(s=>s.layers.set(this._firstPersonOnlyLayer))):i.type==="thirdPersonOnly"?(r.layers.set(this._thirdPersonOnlyLayer),r.traverse(s=>s.layers.set(this._thirdPersonOnlyLayer))):i.type==="auto"&&this._createHeadlessModel(r)})}),this._initializedLayers=!0)}_excludeTriangles(e,n,i,r){let s=0;if(n!=null&&n.length>0)for(let a=0;a<e.length;a+=3){let l=e[a],o=e[a+1],u=e[a+2],d=n[l],c=i[l];if(d[0]>0&&r.includes(c[0])||d[1]>0&&r.includes(c[1])||d[2]>0&&r.includes(c[2])||d[3]>0&&r.includes(c[3]))continue;let f=n[o],p=i[o];if(f[0]>0&&r.includes(p[0])||f[1]>0&&r.includes(p[1])||f[2]>0&&r.includes(p[2])||f[3]>0&&r.includes(p[3]))continue;let m=n[u],h=i[u];m[0]>0&&r.includes(h[0])||m[1]>0&&r.includes(h[1])||m[2]>0&&r.includes(h[2])||m[3]>0&&r.includes(h[3])||(e[s++]=l,e[s++]=o,e[s++]=u)}return s}_createErasedMesh(e,n){let i=new D.SkinnedMesh(e.geometry.clone(),e.material);i.name=`${e.name}(erase)`,i.frustumCulled=e.frustumCulled,i.layers.set(this._firstPersonOnlyLayer);let r=i.geometry,s=r.getAttribute("skinIndex"),a=s instanceof D.GLBufferAttribute?[]:s.array,l=[];for(let h=0;h<a.length;h+=4)l.push([a[h],a[h+1],a[h+2],a[h+3]]);let o=r.getAttribute("skinWeight"),u=o instanceof D.GLBufferAttribute?[]:o.array,d=[];for(let h=0;h<u.length;h+=4)d.push([u[h],u[h+1],u[h+2],u[h+3]]);let c=r.getIndex();if(!c)throw new Error("The geometry doesn't have an index buffer");let f=Array.from(c.array),p=this._excludeTriangles(f,d,l,n),m=[];for(let h=0;h<p;h++)m[h]=f[h];return r.setIndex(m),e.onBeforeRender&&(i.onBeforeRender=e.onBeforeRender),i.bind(new D.Skeleton(e.skeleton.bones,e.skeleton.boneInverses),new D.Matrix4),i}_createHeadlessModelForSkinnedMesh(e,n){let i=[];if(n.skeleton.bones.forEach((s,a)=>{this._isEraseTarget(s)&&i.push(a)}),!i.length){n.layers.enable(this._thirdPersonOnlyLayer),n.layers.enable(this._firstPersonOnlyLayer);return}n.layers.set(this._thirdPersonOnlyLayer);let r=this._createErasedMesh(n,i);e.add(r)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer));else{let n=new D.Group;n.name=`_headless_${e.name}`,n.layers.set(this._firstPersonOnlyLayer),e.parent.add(n),e.children.filter(i=>i.type==="SkinnedMesh").forEach(i=>{let r=i;this._createHeadlessModelForSkinnedMesh(n,r)})}else if(e.type==="SkinnedMesh"){let n=e;this._createHeadlessModelForSkinnedMesh(e.parent,n)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};gt.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;gt.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var ut=gt,Pr=new Set(["1.0","1.0-beta"]),Ne=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(t){this.parser=t}afterRoot(t){return w(this,null,function*(){let e=t.userData.vrmHumanoid;if(e!==null){if(e===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");t.userData.vrmFirstPerson=yield this._import(t,e)}})}_import(t,e){return w(this,null,function*(){if(e==null)return null;let n=yield this._v1Import(t,e);if(n)return n;let i=yield this._v0Import(t,e);return i||null})}_v1Import(t,e){return w(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let a=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!a)return null;let l=a.specVersion;if(!Pr.has(l))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let o=a.firstPerson;if(!o)return null;let u=[],d=yield En(t);return Array.from(d.entries()).forEach(([c,f])=>{var p;let m=o.meshAnnotations?o.meshAnnotations.find(h=>h.node===c):void 0;u.push({meshes:f,type:(p=m==null?void 0:m.type)!=null?p:"both"})}),new ut(e,u)})}_v0Import(t,e){return w(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let s=r.firstPerson;if(!s)return null;let a=[],l=yield En(t);return Array.from(l.entries()).forEach(([o,u])=>{let d=i.nodes[o],c=s.meshAnnotations?s.meshAnnotations.find(f=>f.mesh===d.mesh):void 0;a.push({meshes:u,type:this._convertV0FlagToV1Type(c==null?void 0:c.firstPersonFlag)})}),new ut(e,a)})}_convertV0FlagToV1Type(t){return t==="FirstPersonOnly"?"firstPersonOnly":t==="ThirdPersonOnly"?"thirdPersonOnly":t==="Auto"?"auto":"both"}},Sr={Auto:"auto",Both:"both",ThirdPersonOnly:"thirdPersonOnly",FirstPersonOnly:"firstPersonOnly"},Rn=new j.Vector3,Tn=new j.Vector3,Ar=new j.Quaternion,dt=class extends j.Group{constructor(t){super(),this.vrmHumanoid=t,this._boneAxesMap=new Map,Object.values(t.humanBones).forEach(e=>{let n=new j.AxesHelper(1);n.matrixAutoUpdate=!1,n.material.depthTest=!1,n.material.depthWrite=!1,this.add(n),this._boneAxesMap.set(e,n)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(t=>{t.geometry.dispose(),t.material.dispose()})}updateMatrixWorld(t){Array.from(this._boneAxesMap.entries()).forEach(([e,n])=>{e.node.updateWorldMatrix(!0,!1),e.node.matrixWorld.decompose(Rn,Ar,Tn);let i=Rn.set(.1,.1,.1).divide(Tn);n.matrix.copy(e.node.matrixWorld).scale(i)}),super.updateMatrixWorld(t)}},Ve=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"],Lr={Hips:"hips",Spine:"spine",Chest:"chest",UpperChest:"upperChest",Neck:"neck",Head:"head",LeftEye:"leftEye",RightEye:"rightEye",Jaw:"jaw",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",LeftToes:"leftToes",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",RightToes:"rightToes",LeftShoulder:"leftShoulder",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightShoulder:"rightShoulder",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand",LeftThumbMetacarpal:"leftThumbMetacarpal",LeftThumbProximal:"leftThumbProximal",LeftThumbDistal:"leftThumbDistal",LeftIndexProximal:"leftIndexProximal",LeftIndexIntermediate:"leftIndexIntermediate",LeftIndexDistal:"leftIndexDistal",LeftMiddleProximal:"leftMiddleProximal",LeftMiddleIntermediate:"leftMiddleIntermediate",LeftMiddleDistal:"leftMiddleDistal",LeftRingProximal:"leftRingProximal",LeftRingIntermediate:"leftRingIntermediate",LeftRingDistal:"leftRingDistal",LeftLittleProximal:"leftLittleProximal",LeftLittleIntermediate:"leftLittleIntermediate",LeftLittleDistal:"leftLittleDistal",RightThumbMetacarpal:"rightThumbMetacarpal",RightThumbProximal:"rightThumbProximal",RightThumbDistal:"rightThumbDistal",RightIndexProximal:"rightIndexProximal",RightIndexIntermediate:"rightIndexIntermediate",RightIndexDistal:"rightIndexDistal",RightMiddleProximal:"rightMiddleProximal",RightMiddleIntermediate:"rightMiddleIntermediate",RightMiddleDistal:"rightMiddleDistal",RightRingProximal:"rightRingProximal",RightRingIntermediate:"rightRingIntermediate",RightRingDistal:"rightRingDistal",RightLittleProximal:"rightLittleProximal",RightLittleIntermediate:"rightLittleIntermediate",RightLittleDistal:"rightLittleDistal"},zn={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function jn(t){return t.invert?t.invert():t.inverse(),t}var ee=new De.Vector3,te=new De.Quaternion,ht=class{constructor(t){this.humanBones=t,this.restPose=this.getAbsolutePose()}getAbsolutePose(){let t={};return Object.keys(this.humanBones).forEach(e=>{let n=e,i=this.getBoneNode(n);i&&(ee.copy(i.position),te.copy(i.quaternion),t[n]={position:ee.toArray(),rotation:te.toArray()})}),t}getPose(){let t={};return Object.keys(this.humanBones).forEach(e=>{let n=e,i=this.getBoneNode(n);if(!i)return;ee.set(0,0,0),te.identity();let r=this.restPose[n];r!=null&&r.position&&ee.fromArray(r.position).negate(),r!=null&&r.rotation&&jn(te.fromArray(r.rotation)),ee.add(i.position),te.premultiply(i.quaternion),t[n]={position:ee.toArray(),rotation:te.toArray()}}),t}setPose(t){Object.entries(t).forEach(([e,n])=>{let i=e,r=this.getBoneNode(i);if(!r)return;let s=this.restPose[i];s&&(n!=null&&n.position&&(r.position.fromArray(n.position),s.position&&r.position.add(ee.fromArray(s.position))),n!=null&&n.rotation&&(r.quaternion.fromArray(n.rotation),s.rotation&&r.quaternion.multiply(te.fromArray(s.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([t,e])=>{let n=this.getBoneNode(t);n&&(e!=null&&e.position&&n.position.fromArray(e.position),e!=null&&e.rotation&&n.quaternion.fromArray(e.rotation))})}getBone(t){var e;return(e=this.humanBones[t])!=null?e:void 0}getBoneNode(t){var e,n;return(n=(e=this.humanBones[t])==null?void 0:e.node)!=null?n:null}},tt=new B.Vector3,Hr=new B.Quaternion,br=new B.Vector3,xn=class Gn extends ht{static _setupTransforms(e){let n=new B.Object3D;n.name="VRMHumanoidRig";let i={},r={},s={},a={};Ve.forEach(o=>{var u;let d=e.getBoneNode(o);if(d){let c=new B.Vector3,f=new B.Quaternion;d.updateWorldMatrix(!0,!1),d.matrixWorld.decompose(c,f,tt),i[o]=c,r[o]=f,s[o]=d.quaternion.clone();let p=new B.Quaternion;(u=d.parent)==null||u.matrixWorld.decompose(tt,p,tt),a[o]=p}});let l={};return Ve.forEach(o=>{var u;let d=e.getBoneNode(o);if(d){let c=i[o],f=o,p;for(;p==null&&(f=zn[f],f!=null);)p=i[f];let m=new B.Object3D;m.name="Normalized_"+d.name,(f?(u=l[f])==null?void 0:u.node:n).add(m),m.position.copy(c),p&&m.position.sub(p),l[o]={node:m}}}),{rigBones:l,root:n,parentWorldRotations:a,boneRotations:s}}constructor(e){let{rigBones:n,root:i,parentWorldRotations:r,boneRotations:s}=Gn._setupTransforms(e);super(n),this.original=e,this.root=i,this._parentWorldRotations=r,this._boneRotations=s}update(){Ve.forEach(e=>{let n=this.original.getBoneNode(e);if(n!=null){let i=this.getBoneNode(e),r=this._parentWorldRotations[e],s=Hr.copy(r).invert(),a=this._boneRotations[e];if(n.quaternion.copy(i.quaternion).multiply(r).premultiply(s).multiply(a),e==="hips"){let l=i.getWorldPosition(br);n.parent.updateWorldMatrix(!0,!1);let o=n.parent.matrixWorld,u=l.applyMatrix4(o.invert());n.position.copy(u)}}})}},ct=class Qn{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,n){var i;this.autoUpdateHumanBones=(i=n==null?void 0:n.autoUpdateHumanBones)!=null?i:!0,this._rawHumanBones=new ht(e),this._normalizedHumanBones=new xn(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new ht(e.humanBones),this._normalizedHumanBones=new xn(this._rawHumanBones),this}clone(){return new Qn(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},qn={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},Vr=new Set(["1.0","1.0-beta"]),yn={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},Be=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(t,e){this.parser=t,this.helperRoot=e==null?void 0:e.helperRoot,this.autoUpdateHumanBones=e==null?void 0:e.autoUpdateHumanBones}afterRoot(t){return w(this,null,function*(){t.userData.vrmHumanoid=yield this._import(t)})}_import(t){return w(this,null,function*(){let e=yield this._v1Import(t);if(e)return e;let n=yield this._v0Import(t);return n||null})}_v1Import(t){return w(this,null,function*(){var e,n;let i=this.parser.json;if(!(((e=i.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let s=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!s)return null;let a=s.specVersion;if(!Vr.has(a))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=s.humanoid;if(!l)return null;let o=l.humanBones.leftThumbIntermediate!=null||l.humanBones.rightThumbIntermediate!=null,u={};l.humanBones!=null&&(yield Promise.all(Object.entries(l.humanBones).map(c=>w(this,[c],function*([f,p]){let m=f,h=p.node;if(o){let g=yn[m];g!=null&&(m=g)}let _=yield this.parser.getDependency("node",h);if(_==null){console.warn(`A glTF node bound to the humanoid bone ${m} (index = ${h}) does not exist`);return}u[m]={node:_}}))));let d=new ct(this._ensureRequiredBonesExist(u),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(t.scene.add(d.normalizedHumanBonesRoot),this.helperRoot){let c=new dt(d);this.helperRoot.add(c),c.renderOrder=this.helperRoot.renderOrder}return d})}_v0Import(t){return w(this,null,function*(){var e;let i=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!i)return null;let r=i.humanoid;if(!r)return null;let s={};r.humanBones!=null&&(yield Promise.all(r.humanBones.map(l=>w(this,null,function*(){let o=l.bone,u=l.node;if(o==null||u==null)return;let d=yield this.parser.getDependency("node",u);if(d==null){console.warn(`A glTF node bound to the humanoid bone ${o} (index = ${u}) does not exist`);return}let c=yn[o],f=c!=null?c:o;if(s[f]!=null){console.warn(`Multiple bone entries for ${f} detected (index = ${u}), ignoring duplicated entries.`);return}s[f]={node:d}}))));let a=new ct(this._ensureRequiredBonesExist(s),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(t.scene.add(a.normalizedHumanBonesRoot),this.helperRoot){let l=new dt(a);this.helperRoot.add(l),l.renderOrder=this.helperRoot.renderOrder}return a})}_ensureRequiredBonesExist(t){let e=Object.values(qn).filter(n=>t[n]==null);if(e.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${e.join(", ")}`);return t}},wn=class extends Ee.BufferGeometry{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new Ee.BufferAttribute(new Float32Array(65*3),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ee.BufferAttribute(new Uint16Array(3*63),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,t=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,t=!0),t&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let t=0;t<64;t++){let e=t/63*this._currentTheta;this._attrPos.setXYZ(t+1,this._currentRadius*Math.sin(e),0,this._currentRadius*Math.cos(e))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<63;t++)this._attrIndex.setXYZ(t*3,0,t+1,t+2);this._attrIndex.needsUpdate=!0}},Ir=class extends Y.BufferGeometry{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new Y.Vector3,this._currentTail=new Y.Vector3,this._attrPos=new Y.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Y.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,t=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},He=new S.Quaternion,Pn=new S.Quaternion,ge=new S.Vector3,Sn=new S.Vector3,An=Math.sqrt(2)/2,Ur=new S.Quaternion(0,0,-An,An),Cr=new S.Vector3(0,1,0),Xn=class extends S.Group{constructor(t){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=t;{let e=new wn;e.radius=.5;let n=new S.MeshBasicMaterial({color:65280,transparent:!0,opacity:.5,side:S.DoubleSide,depthTest:!1,depthWrite:!1});this._meshPitch=new S.Mesh(e,n),this.add(this._meshPitch)}{let e=new wn;e.radius=.5;let n=new S.MeshBasicMaterial({color:16711680,transparent:!0,opacity:.5,side:S.DoubleSide,depthTest:!1,depthWrite:!1});this._meshYaw=new S.Mesh(e,n),this.add(this._meshYaw)}{let e=new Ir;e.radius=.1;let n=new S.LineBasicMaterial({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new S.LineSegments(e,n),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(t){let e=S.MathUtils.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=e,this._meshYaw.geometry.update();let n=S.MathUtils.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=n,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(ge),this.vrmLookAt.getLookAtWorldQuaternion(He),He.multiply(this.vrmLookAt.getFaceFrontQuaternion(Pn)),this._meshYaw.position.copy(ge),this._meshYaw.quaternion.copy(He),this._meshPitch.position.copy(ge),this._meshPitch.quaternion.copy(He),this._meshPitch.quaternion.multiply(Pn.setFromAxisAngle(Cr,e)),this._meshPitch.quaternion.multiply(Ur);let{target:i,autoUpdate:r}=this.vrmLookAt;i!=null&&r&&(i.getWorldPosition(Sn).sub(ge),this._lineTarget.geometry.tail.copy(Sn),this._lineTarget.geometry.update(),this._lineTarget.position.copy(ge)),super.updateMatrixWorld(t)}},Or=new vt.Vector3,Nr=new vt.Vector3;function pt(t,e){return t.matrixWorld.decompose(Or,e,Nr),e}function Ie(t){return[Math.atan2(-t.z,t.x),Math.atan2(t.y,Math.sqrt(t.x*t.x+t.z*t.z))]}function Ln(t){let e=Math.round(t/2/Math.PI);return t-2*Math.PI*e}var Hn=new V.Vector3(0,0,1),Dr=new V.Vector3,Br=new V.Vector3,Fr=new V.Vector3,Wr=new V.Quaternion,nt=new V.Quaternion,bn=new V.Quaternion,kr=new V.Quaternion,it=new V.Euler,Yn=class $n{constructor(e,n){this.offsetFromHeadBone=new V.Vector3,this.autoUpdate=!0,this.faceFront=new V.Vector3(0,0,1),this.humanoid=e,this.applier=n,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new V.Quaternion)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new V.Euler)}getEuler(e){return e.set(V.MathUtils.DEG2RAD*this._pitch,V.MathUtils.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new $n(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){let n=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(n.matrixWorld)}getLookAtWorldQuaternion(e){let n=this.humanoid.getRawBoneNode("head");return pt(n,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(Hn)<.01)return e.copy(this._restHeadWorldQuaternion).invert();let[n,i]=Ie(this.faceFront);return it.set(0,.5*Math.PI+n,i,"YZX"),e.setFromEuler(it).premultiply(kr.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(nt),this.getFaceFrontQuaternion(bn),e.copy(Hn).applyQuaternion(nt).applyQuaternion(bn).applyEuler(this.getEuler(it))}lookAt(e){let n=Wr.copy(this._restHeadWorldQuaternion).multiply(jn(this.getLookAtWorldQuaternion(nt))),i=this.getLookAtWorldPosition(Br),r=Fr.copy(e).sub(i).applyQuaternion(n).normalize(),[s,a]=Ie(this.faceFront),[l,o]=Ie(r),u=Ln(l-s),d=Ln(a-o);this._yaw=V.MathUtils.RAD2DEG*u,this._pitch=V.MathUtils.RAD2DEG*d,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(Dr)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};Yn.EULER_ORDER="YXZ";var Zn=Yn,zr=new A.Vector3(0,0,1),F=new A.Quaternion,le=new A.Quaternion,N=new A.Euler(0,0,0,"YXZ"),ve=class{constructor(t,e,n,i,r){this.humanoid=t,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r,this.faceFront=new A.Vector3(0,0,1),this._restQuatLeftEye=new A.Quaternion,this._restQuatRightEye=new A.Quaternion,this._restLeftEyeParentWorldQuat=new A.Quaternion,this._restRightEyeParentWorldQuat=new A.Quaternion;let s=this.humanoid.getRawBoneNode("leftEye"),a=this.humanoid.getRawBoneNode("rightEye");s&&(this._restQuatLeftEye.copy(s.quaternion),pt(s.parent,this._restLeftEyeParentWorldQuat)),a&&(this._restQuatRightEye.copy(a.quaternion),pt(a.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(t,e){let n=this.humanoid.getRawBoneNode("leftEye"),i=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),s=this.humanoid.getNormalizedBoneNode("rightEye");n&&(e<0?N.x=-A.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-e):N.x=A.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(e),t<0?N.y=-A.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(-t):N.y=A.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(t),F.setFromEuler(N),this._getWorldFaceFrontQuat(le),r.quaternion.copy(le).multiply(F).multiply(le.invert()),F.copy(this._restLeftEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(F).premultiply(F.invert()).multiply(this._restQuatLeftEye)),i&&(e<0?N.x=-A.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-e):N.x=A.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(e),t<0?N.y=-A.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(-t):N.y=A.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(t),F.setFromEuler(N),this._getWorldFaceFrontQuat(le),s.quaternion.copy(le).multiply(F).multiply(le.invert()),F.copy(this._restRightEyeParentWorldQuat),i.quaternion.copy(s.quaternion).multiply(F).premultiply(F.invert()).multiply(this._restQuatRightEye))}lookAt(t){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=A.MathUtils.RAD2DEG*t.y,n=A.MathUtils.RAD2DEG*t.x;this.applyYawPitch(e,n)}_getWorldFaceFrontQuat(t){if(this.faceFront.distanceToSquared(zr)<.01)return t.identity();let[e,n]=Ie(this.faceFront);return N.set(0,.5*Math.PI+e,n,"YZX"),t.setFromEuler(N)}};ve.type="bone";var Ce=class{constructor(t,e,n,i,r){this.expressions=t,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r}applyYawPitch(t,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),t<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-t))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(t)))}lookAt(t){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=mt.MathUtils.RAD2DEG*t.y,n=mt.MathUtils.RAD2DEG*t.x;this.applyYawPitch(e,n)}};Ce.type="expression";var ft=class{constructor(t,e){this.inputMaxValue=t,this.outputScale=e}map(t){return this.outputScale*Un(t/this.inputMaxValue)}},jr=new Set(["1.0","1.0-beta"]),be=.01,Fe=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(t,e){this.parser=t,this.helperRoot=e==null?void 0:e.helperRoot}afterRoot(t){return w(this,null,function*(){let e=t.userData.vrmHumanoid;if(e===null)return;if(e===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");let n=t.userData.vrmExpressionManager;if(n!==null){if(n===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");t.userData.vrmLookAt=yield this._import(t,e,n)}})}_import(t,e,n){return w(this,null,function*(){if(e==null||n==null)return null;let i=yield this._v1Import(t,e,n);if(i)return i;let r=yield this._v0Import(t,e,n);return r||null})}_v1Import(t,e,n){return w(this,null,function*(){var i,r,s;let a=this.parser.json;if(!(((i=a.extensionsUsed)==null?void 0:i.indexOf("VRMC_vrm"))!==-1))return null;let o=(r=a.extensions)==null?void 0:r.VRMC_vrm;if(!o)return null;let u=o.specVersion;if(!jr.has(u))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${u}"`),null;let d=o.lookAt;if(!d)return null;let c=d.type==="expression"?1:10,f=this._v1ImportRangeMap(d.rangeMapHorizontalInner,c),p=this._v1ImportRangeMap(d.rangeMapHorizontalOuter,c),m=this._v1ImportRangeMap(d.rangeMapVerticalDown,c),h=this._v1ImportRangeMap(d.rangeMapVerticalUp,c),_;d.type==="expression"?_=new Ce(n,f,p,m,h):_=new ve(e,f,p,m,h);let g=this._importLookAt(e,_);return g.offsetFromHeadBone.fromArray((s=d.offsetFromHeadBone)!=null?s:[0,.06,0]),g})}_v1ImportRangeMap(t,e){var n,i;let r=(n=t==null?void 0:t.inputMaxValue)!=null?n:90,s=(i=t==null?void 0:t.outputScale)!=null?i:e;return r<be&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),r=be),new ft(r,s)}_v0Import(t,e,n){return w(this,null,function*(){var i,r,s,a;let o=(i=this.parser.json.extensions)==null?void 0:i.VRM;if(!o)return null;let u=o.firstPerson;if(!u)return null;let d=u.lookAtTypeName==="BlendShape"?1:10,c=this._v0ImportDegreeMap(u.lookAtHorizontalInner,d),f=this._v0ImportDegreeMap(u.lookAtHorizontalOuter,d),p=this._v0ImportDegreeMap(u.lookAtVerticalDown,d),m=this._v0ImportDegreeMap(u.lookAtVerticalUp,d),h;u.lookAtTypeName==="BlendShape"?h=new Ce(n,c,f,p,m):h=new ve(e,c,f,p,m);let _=this._importLookAt(e,h);return u.firstPersonBoneOffset?_.offsetFromHeadBone.set((r=u.firstPersonBoneOffset.x)!=null?r:0,(s=u.firstPersonBoneOffset.y)!=null?s:.06,-((a=u.firstPersonBoneOffset.z)!=null?a:0)):_.offsetFromHeadBone.set(0,.06,0),_.faceFront.set(0,0,-1),h instanceof ve&&h.faceFront.set(0,0,-1),_})}_v0ImportDegreeMap(t,e){var n,i;let r=t==null?void 0:t.curve;JSON.stringify(r)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let s=(n=t==null?void 0:t.xRange)!=null?n:90,a=(i=t==null?void 0:t.yRange)!=null?i:e;return s<be&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),s=be),new ft(s,a)}_importLookAt(t,e){let n=new Zn(t,e);if(this.helperRoot){let i=new Xn(n);this.helperRoot.add(i),i.renderOrder=this.helperRoot.renderOrder}return n}},Gr={Bone:"bone",Expression:"expression"};function Qr(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}var qr=new Set(["1.0","1.0-beta"]),We=class{get name(){return"VRMMetaLoaderPlugin"}constructor(t,e){var n,i,r;this.parser=t,this.needThumbnailImage=(n=e==null?void 0:e.needThumbnailImage)!=null?n:!1,this.acceptLicenseUrls=(i=e==null?void 0:e.acceptLicenseUrls)!=null?i:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(r=e==null?void 0:e.acceptV0Meta)!=null?r:!0}afterRoot(t){return w(this,null,function*(){t.userData.vrmMeta=yield this._import(t)})}_import(t){return w(this,null,function*(){let e=yield this._v1Import(t);if(e!=null)return e;let n=yield this._v0Import(t);return n!=null?n:null})}_v1Import(t){return w(this,null,function*(){var e,n,i;let r=this.parser.json;if(!(((e=r.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let a=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(a==null)return null;let l=a.specVersion;if(!qr.has(l))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let o=a.meta;if(!o)return null;let u=o.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(u))throw new Error(`VRMMetaLoaderPlugin: The license url "${u}" is not accepted`);let c;return this.needThumbnailImage&&o.thumbnailImage!=null&&(c=(i=yield this._extractGLTFImage(o.thumbnailImage))!=null?i:void 0),{metaVersion:"1",name:o.name,version:o.version,authors:o.authors,copyrightInformation:o.copyrightInformation,contactInformation:o.contactInformation,references:o.references,thirdPartyLicenses:o.thirdPartyLicenses,thumbnailImage:c,licenseUrl:o.licenseUrl,avatarPermission:o.avatarPermission,allowExcessivelyViolentUsage:o.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:o.allowExcessivelySexualUsage,commercialUsage:o.commercialUsage,allowPoliticalOrReligiousUsage:o.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:o.allowAntisocialOrHateUsage,creditNotation:o.creditNotation,allowRedistribution:o.allowRedistribution,modification:o.modification,otherLicenseUrl:o.otherLicenseUrl}})}_v0Import(t){return w(this,null,function*(){var e;let i=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!i)return null;let r=i.meta;if(!r)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let s;return this.needThumbnailImage&&r.texture!=null&&r.texture!==-1&&(s=yield this.parser.getDependency("texture",r.texture)),{metaVersion:"0",allowedUserName:r.allowedUserName,author:r.author,commercialUssageName:r.commercialUssageName,contactInformation:r.contactInformation,licenseName:r.licenseName,otherLicenseUrl:r.otherLicenseUrl,otherPermissionUrl:r.otherPermissionUrl,reference:r.reference,sexualUssageName:r.sexualUssageName,texture:s!=null?s:void 0,title:r.title,version:r.version,violentUssageName:r.violentUssageName}})}_extractGLTFImage(t){return w(this,null,function*(){var e;let i=(e=this.parser.json.images)==null?void 0:e[t];if(i==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${t}] of glTF as a thumbnail but the image doesn't exist`),null;let r=i.uri;if(i.bufferView!=null){let a=yield this.parser.getDependency("bufferView",i.bufferView),l=new Blob([a],{type:i.mimeType});r=URL.createObjectURL(l)}return r==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${t}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new Jn.ImageLoader().loadAsync(Qr(r,this.parser.options.path)).catch(a=>(console.error(a),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},ke=class{constructor(t){this.scene=t.scene,this.meta=t.meta,this.humanoid=t.humanoid,this.expressionManager=t.expressionManager,this.firstPerson=t.firstPerson,this.lookAt=t.lookAt}update(t){this.humanoid.update(),this.lookAt&&this.lookAt.update(t),this.expressionManager&&this.expressionManager.update()}},Xr=class{get name(){return"VRMC_vrm"}constructor(t,e){var n,i,r,s,a;this.parser=t;let l=e==null?void 0:e.helperRoot,o=e==null?void 0:e.autoUpdateHumanBones;this.expressionPlugin=(n=e==null?void 0:e.expressionPlugin)!=null?n:new Oe(t),this.firstPersonPlugin=(i=e==null?void 0:e.firstPersonPlugin)!=null?i:new Ne(t),this.humanoidPlugin=(r=e==null?void 0:e.humanoidPlugin)!=null?r:new Be(t,{helperRoot:l,autoUpdateHumanBones:o}),this.lookAtPlugin=(s=e==null?void 0:e.lookAtPlugin)!=null?s:new Fe(t,{helperRoot:l}),this.metaPlugin=(a=e==null?void 0:e.metaPlugin)!=null?a:new We(t)}afterRoot(t){return w(this,null,function*(){yield this.metaPlugin.afterRoot(t),yield this.humanoidPlugin.afterRoot(t),yield this.expressionPlugin.afterRoot(t),yield this.lookAtPlugin.afterRoot(t),yield this.firstPersonPlugin.afterRoot(t);let e=t.userData.vrmMeta,n=t.userData.vrmHumanoid;if(e&&n){let i=new ke({scene:t.scene,expressionManager:t.userData.vrmExpressionManager,firstPerson:t.userData.vrmFirstPerson,humanoid:n,lookAt:t.userData.vrmLookAt,meta:e});t.userData.vrmCore=i}})}};var he=class extends ke{constructor(e){super(e),this.materials=e.materials,this.springBoneManager=e.springBoneManager,this.nodeConstraintManager=e.nodeConstraintManager}update(e){super.update(e),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(e),this.materials&&this.materials.forEach(n=>{n.update&&n.update(e)})}};var Ge=M(require("three"),1),ni=M(require("three"),1),ii=M(require("three"),1),P=M(require("three"),1),oi=M(require("three"),1);var Yr=Object.defineProperty,Kn=Object.getOwnPropertySymbols,$r=Object.prototype.hasOwnProperty,Zr=Object.prototype.propertyIsEnumerable,ei=(t,e,n)=>e in t?Yr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ti=(t,e)=>{for(var n in e||(e={}))$r.call(e,n)&&ei(t,n,e[n]);if(Kn)for(var n of Kn(e))Zr.call(e,n)&&ei(t,n,e[n]);return t},ne=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())}),Jr={"":3e3,srgb:3001};function Kr(t,e){parseInt(ii.REVISION,10)>=152?t.colorSpace=e:t.encoding=Jr[e]}var eo=class{get pending(){return Promise.all(this._pendings)}constructor(t,e){this._parser=t,this._materialParams=e,this._pendings=[]}assignPrimitive(t,e){e!=null&&(this._materialParams[t]=e)}assignColor(t,e,n){e!=null&&(this._materialParams[t]=new ni.Color().fromArray(e),n&&this._materialParams[t].convertSRGBToLinear())}assignTexture(t,e,n){return ne(this,null,function*(){let i=ne(this,null,function*(){e!=null&&(yield this._parser.assignTexture(this._materialParams,t,e),n&&Kr(this._materialParams[t],"srgb"))});return this._pendings.push(i),i})}assignTextureByIndex(t,e,n){return ne(this,null,function*(){return this.assignTexture(t,e!=null?{index:e}:void 0,n)})}},to=`// #define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

#include <common>

// #include <uv_pars_vertex>
#ifdef MTOON_USE_UV
  varying vec2 vUv;

  // COMPAT: pre-r151 uses a common uvTransform
  #if THREE_VRM_THREE_REVISION < 151
    uniform mat3 uvTransform;
  #endif
#endif

// #include <uv2_pars_vertex>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    attribute vec2 uv2;
    varying vec2 vUv2;
    uniform mat3 uv2Transform;
  #endif
#endif

// #include <displacementmap_pars_vertex>
// #include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
  uniform sampler2D outlineWidthMultiplyTexture;
  uniform mat3 outlineWidthMultiplyTextureUvTransform;
#endif

uniform float outlineWidthFactor;

void main() {

  // #include <uv_vertex>
  #ifdef MTOON_USE_UV
    // COMPAT: pre-r151 uses a common uvTransform
    #if THREE_VRM_THREE_REVISION >= 151
      vUv = uv;
    #else
      vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    #endif
  #endif

  // #include <uv2_vertex>
  // COMAPT: pre-r151 uses uv2 for lightMap and aoMap
  #if THREE_VRM_THREE_REVISION < 151
    #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
      vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
    #endif
  #endif

  #include <color_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>

  // we need this to compute the outline properly
  objectNormal = normalize( objectNormal );

  #include <defaultnormal_vertex>

  #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  #include <begin_vertex>

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  // #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  float outlineTex = 1.0;

  #ifdef OUTLINE
    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;
      outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;
    #endif

    #ifdef OUTLINE_WIDTH_WORLD
      float worldNormalLength = length( transformedNormal );
      vec3 outlineOffset = outlineWidthFactor * outlineTex * worldNormalLength * objectNormal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );
    #endif

    #ifdef OUTLINE_WIDTH_SCREEN
      vec3 clipNormal = ( projectionMatrix * modelViewMatrix * vec4( objectNormal, 0.0 ) ).xyz;
      vec2 projectedNormal = normalize( clipNormal.xy );
      projectedNormal.x *= projectionMatrix[ 0 ].x / projectionMatrix[ 1 ].y;
      gl_Position.xy += 2.0 * outlineWidthFactor * outlineTex * projectedNormal.xy;
    #endif

    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic
  #endif

  #include <worldpos_vertex>
  // #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}`,no=`// #define PHONG

uniform vec3 litFactor;

uniform float opacity;

uniform vec3 shadeColorFactor;
#ifdef USE_SHADEMULTIPLYTEXTURE
  uniform sampler2D shadeMultiplyTexture;
  uniform mat3 shadeMultiplyTextureUvTransform;
#endif

uniform float shadingShiftFactor;
uniform float shadingToonyFactor;

#ifdef USE_SHADINGSHIFTTEXTURE
  uniform sampler2D shadingShiftTexture;
  uniform mat3 shadingShiftTextureUvTransform;
  uniform float shadingShiftTextureScale;
#endif

uniform float giEqualizationFactor;

uniform vec3 parametricRimColorFactor;
#ifdef USE_RIMMULTIPLYTEXTURE
  uniform sampler2D rimMultiplyTexture;
  uniform mat3 rimMultiplyTextureUvTransform;
#endif
uniform float rimLightingMixFactor;
uniform float parametricRimFresnelPowerFactor;
uniform float parametricRimLiftFactor;

#ifdef USE_MATCAPTEXTURE
  uniform vec3 matcapFactor;
  uniform sampler2D matcapTexture;
  uniform mat3 matcapTextureUvTransform;
#endif

uniform vec3 emissive;
uniform float emissiveIntensity;

uniform vec3 outlineColorFactor;
uniform float outlineLightingMixFactor;

#ifdef USE_UVANIMATIONMASKTEXTURE
  uniform sampler2D uvAnimationMaskTexture;
  uniform mat3 uvAnimationMaskTextureUvTransform;
#endif

uniform float uvAnimationScrollXOffset;
uniform float uvAnimationScrollYOffset;
uniform float uvAnimationRotationPhase;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>

// #include <uv_pars_fragment>
#if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
  varying vec2 vUv;
#endif

// #include <uv2_pars_fragment>
// COMAPT: pre-r151 uses uv2 for lightMap and aoMap
#if THREE_VRM_THREE_REVISION < 151
  #if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
    varying vec2 vUv2;
  #endif
#endif

#include <map_pars_fragment>

#ifdef USE_MAP
  uniform mat3 mapUvTransform;
#endif

// #include <alphamap_pars_fragment>

#include <alphatest_pars_fragment>

#include <aomap_pars_fragment>
// #include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>

#ifdef USE_EMISSIVEMAP
  uniform mat3 emissiveMapUvTransform;
#endif

// #include <envmap_common_pars_fragment>
// #include <envmap_pars_fragment>
// #include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>

// #include <bsdfs>
// COMPAT: pre-r151 doesn't have BRDF_Lambert in <common>
#if THREE_VRM_THREE_REVISION < 151
  vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
    return RECIPROCAL_PI * diffuseColor;
  }
#endif

#include <lights_pars_begin>

#include <normal_pars_fragment>

// #include <lights_phong_pars_fragment>
varying vec3 vViewPosition;

struct MToonMaterial {
  vec3 diffuseColor;
  vec3 shadeColor;
  float shadingShift;
};

float linearstep( float a, float b, float t ) {
  return clamp( ( t - a ) / ( b - a ), 0.0, 1.0 );
}

/**
 * Convert NdotL into toon shading factor using shadingShift and shadingToony
 */
float getShading(
  const in float dotNL,
  const in float shadow,
  const in float shadingShift
) {
  float shading = dotNL;
  shading = shading + shadingShift;
  shading = linearstep( -1.0 + shadingToonyFactor, 1.0 - shadingToonyFactor, shading );
  shading *= shadow;
  return shading;
}

/**
 * Mix diffuseColor and shadeColor using shading factor and light color
 */
vec3 getDiffuse(
  const in MToonMaterial material,
  const in float shading,
  in vec3 lightColor
) {
  #ifdef DEBUG_LITSHADERATE
    return vec3( BRDF_Lambert( shading * lightColor ) );
  #endif

  vec3 col = lightColor * BRDF_Lambert( mix( material.shadeColor, material.diffuseColor, shading ) );

  // The "comment out if you want to PBR absolutely" line
  #ifdef V0_COMPAT_SHADE
    col = min( col, material.diffuseColor );
  #endif

  return col;
}

// COMPAT: pre-r156 uses a struct GeometricContext
#if THREE_VRM_THREE_REVISION >= 157
  void RE_Direct_MToon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometryNormal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#else
  void RE_Direct_MToon( const in IncidentLight directLight, const in GeometricContext geometry, const in MToonMaterial material, const in float shadow, inout ReflectedLight reflectedLight ) {
    float dotNL = clamp( dot( geometry.normal, directLight.direction ), -1.0, 1.0 );
    vec3 irradiance = directLight.color;

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;

    irradiance *= dotNL;

    float shading = getShading( dotNL, shadow, material.shadingShift );

    // toon shaded diffuse
    reflectedLight.directDiffuse += getDiffuse( material, shading, directLight.color );
  }

  void RE_IndirectDiffuse_MToon( const in vec3 irradiance, const in GeometricContext geometry, const in MToonMaterial material, inout ReflectedLight reflectedLight ) {
    // indirect diffuse will use diffuseColor, no shadeColor involved
    reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

    // directSpecular will be used for rim lighting, not an actual specular
    reflectedLight.directSpecular += irradiance;
  }
#endif

#define RE_Direct RE_Direct_MToon
#define RE_IndirectDiffuse RE_IndirectDiffuse_MToon
#define Material_LightProbeLOD( material ) (0)

#include <shadowmap_pars_fragment>
// #include <bumpmap_pars_fragment>

// #include <normalmap_pars_fragment>
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform mat3 normalMapUvTransform;
  uniform vec2 normalScale;

#endif

// COMPAT: pre-r151
// USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
#if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

  uniform mat3 normalMatrix;

#endif

// COMPAT: pre-r151
// USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( TANGENTSPACE_NORMALMAP ) )

  // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html

  // three-vrm specific change: it requires \`uv\` as an input in order to support uv scrolls

  // Temporary compat against shader change @ Three.js r126, r151
  #if THREE_VRM_THREE_REVISION >= 151

    mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

      vec3 q0 = dFdx( eye_pos.xyz );
      vec3 q1 = dFdy( eye_pos.xyz );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = surf_norm;

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

      return mat3( T * scale, B * scale, N );

    }

  #else

    vec3 perturbNormal2Arb( vec2 uv, vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

      vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
      vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
      vec2 st0 = dFdx( uv.st );
      vec2 st1 = dFdy( uv.st );

      vec3 N = normalize( surf_norm );

      vec3 q1perp = cross( q1, N );
      vec3 q0perp = cross( N, q0 );

      vec3 T = q1perp * st0.x + q0perp * st1.x;
      vec3 B = q1perp * st0.y + q0perp * st1.y;

      // three-vrm specific change: Workaround for the issue that happens when delta of uv = 0.0
      // TODO: Is this still required? Or shall I make a PR about it?
      if ( length( T ) == 0.0 || length( B ) == 0.0 ) {
        return surf_norm;
      }

      float det = max( dot( T, T ), dot( B, B ) );
      float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

      return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

    }

  #endif

#endif

// #include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

// == post correction ==========================================================
void postCorrection() {
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}

// == main procedure ===========================================================
void main() {
  #include <clipping_planes_fragment>

  vec2 uv = vec2(0.5, 0.5);

  #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
    uv = vUv;

    float uvAnimMask = 1.0;
    #ifdef USE_UVANIMATIONMASKTEXTURE
      vec2 uvAnimationMaskTextureUv = ( uvAnimationMaskTextureUvTransform * vec3( uv, 1 ) ).xy;
      uvAnimMask = texture2D( uvAnimationMaskTexture, uvAnimationMaskTextureUv ).b;
    #endif

    float uvRotCos = cos( uvAnimationRotationPhase * uvAnimMask );
    float uvRotSin = sin( uvAnimationRotationPhase * uvAnimMask );
    uv = mat2( uvRotCos, -uvRotSin, uvRotSin, uvRotCos ) * ( uv - 0.5 ) + 0.5;
    uv = uv + vec2( uvAnimationScrollXOffset, uvAnimationScrollYOffset ) * uvAnimMask;
  #endif

  #ifdef DEBUG_UV
    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    #if ( defined( MTOON_USE_UV ) && !defined( MTOON_UVS_VERTEX_ONLY ) )
      gl_FragColor = vec4( uv, 0.0, 1.0 );
    #endif
    return;
  #endif

  vec4 diffuseColor = vec4( litFactor, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive * emissiveIntensity;

  #include <logdepthbuf_fragment>

  // #include <map_fragment>
  #ifdef USE_MAP
    vec2 mapUv = ( mapUvTransform * vec3( uv, 1 ) ).xy;
    vec4 sampledDiffuseColor = texture2D( map, mapUv );
    #ifdef DECODE_VIDEO_TEXTURE
      sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
    #endif
    diffuseColor *= sampledDiffuseColor;
  #endif

  // #include <color_fragment>
  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    diffuseColor.rgb *= vColor;
  #endif

  // #include <alphamap_fragment>

  #include <alphatest_fragment>

  // #include <specularmap_fragment>

  // #include <normal_fragment_begin>
  float faceDirection = gl_FrontFacing ? 1.0 : -1.0;

  #ifdef FLAT_SHADED

    vec3 fdx = dFdx( vViewPosition );
    vec3 fdy = dFdy( vViewPosition );
    vec3 normal = normalize( cross( fdx, fdy ) );

  #else

    vec3 normal = normalize( vNormal );

    #ifdef DOUBLE_SIDED

      normal *= faceDirection;

    #endif

  #endif

  #ifdef USE_NORMALMAP

    vec2 normalMapUv = ( normalMapUvTransform * vec3( uv, 1 ) ).xy;

  #endif

  #ifdef USE_NORMALMAP_TANGENTSPACE

    #ifdef USE_TANGENT

      mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn = getTangentFrame( - vViewPosition, normal, normalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn[0] *= faceDirection;
      tbn[1] *= faceDirection;

    #endif

  #endif

  #ifdef USE_CLEARCOAT_NORMALMAP

    #ifdef USE_TANGENT

      mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

    #else

      mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

    #endif

    #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

      tbn2[0] *= faceDirection;
      tbn2[1] *= faceDirection;

    #endif

  #endif

  // non perturbed normal for clearcoat among others

  vec3 nonPerturbedNormal = normal;

  #ifdef OUTLINE
    normal *= -1.0;
  #endif

  // #include <normal_fragment_maps>

  // COMPAT: pre-r151
  // USE_NORMALMAP_OBJECTSPACE used to be OBJECTSPACE_NORMALMAP in pre-r151
  #if defined( USE_NORMALMAP_OBJECTSPACE ) || defined( OBJECTSPACE_NORMALMAP )

    normal = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

    #ifdef FLIP_SIDED

      normal = - normal;

    #endif

    #ifdef DOUBLE_SIDED

      normal = normal * faceDirection;

    #endif

    normal = normalize( normalMatrix * normal );

  // COMPAT: pre-r151
  // USE_NORMALMAP_TANGENTSPACE used to be TANGENTSPACE_NORMALMAP in pre-r151
  #elif defined( USE_NORMALMAP_TANGENTSPACE ) || defined( TANGENTSPACE_NORMALMAP )

    vec3 mapN = texture2D( normalMap, normalMapUv ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;

    // COMPAT: pre-r151
    #if THREE_VRM_THREE_REVISION >= 151 || defined( USE_TANGENT )

      normal = normalize( tbn * mapN );

    #else

      normal = perturbNormal2Arb( uv, -vViewPosition, normal, mapN, faceDirection );

    #endif

  #endif

  // #include <emissivemap_fragment>
  #ifdef USE_EMISSIVEMAP
    vec2 emissiveMapUv = ( emissiveMapUvTransform * vec3( uv, 1 ) ).xy;
    totalEmissiveRadiance *= texture2D( emissiveMap, emissiveMapUv ).rgb;
  #endif

  #ifdef DEBUG_NORMAL
    gl_FragColor = vec4( 0.5 + 0.5 * normal, 1.0 );
    return;
  #endif

  // -- MToon: lighting --------------------------------------------------------
  // accumulation
  // #include <lights_phong_fragment>
  MToonMaterial material;

  material.diffuseColor = diffuseColor.rgb;

  material.shadeColor = shadeColorFactor;
  #ifdef USE_SHADEMULTIPLYTEXTURE
    vec2 shadeMultiplyTextureUv = ( shadeMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadeColor *= texture2D( shadeMultiplyTexture, shadeMultiplyTextureUv ).rgb;
  #endif

  #if ( defined( USE_COLOR ) && !defined( IGNORE_VERTEX_COLOR ) )
    material.shadeColor.rgb *= vColor;
  #endif

  material.shadingShift = shadingShiftFactor;
  #ifdef USE_SHADINGSHIFTTEXTURE
    vec2 shadingShiftTextureUv = ( shadingShiftTextureUvTransform * vec3( uv, 1 ) ).xy;
    material.shadingShift += texture2D( shadingShiftTexture, shadingShiftTextureUv ).r * shadingShiftTextureScale;
  #endif

  // #include <lights_fragment_begin>

  // MToon Specific changes:
  // Since we want to take shadows into account of shading instead of irradiance,
  // we had to modify the codes that multiplies the results of shadowmap into color of direct lights.

  // COMPAT: pre-r156 uses a struct GeometricContext
  #if THREE_VRM_THREE_REVISION >= 157
    vec3 geometryPosition = - vViewPosition;
    vec3 geometryNormal = normal;
    vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    vec3 geometryClearcoatNormal;

    #ifdef USE_CLEARCOAT

      geometryClearcoatNormal = clearcoatNormal;

    #endif
  #else
    GeometricContext geometry;

    geometry.position = - vViewPosition;
    geometry.normal = normal;
    geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

    #ifdef USE_CLEARCOAT

      geometry.clearcoatNormal = clearcoatNormal;

    #endif
  #endif

  IncidentLight directLight;

  // since these variables will be used in unrolled loop, we have to define in prior
  float shadow;

  #if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

    PointLight pointLight;
    #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
    PointLightShadow pointLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

      pointLight = pointLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getPointLightInfo( pointLight, geometryPosition, directLight );
      #else
        getPointLightInfo( pointLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
      pointLightShadow = pointLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

    SpotLight spotLight;
    #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
    SpotLightShadow spotLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

      spotLight = spotLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getSpotLightInfo( spotLight, geometryPosition, directLight );
      #else
        getSpotLightInfo( spotLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      spotLightShadow = spotLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  #if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

    DirectionalLight directionalLight;
    #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
    #endif

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

      directionalLight = directionalLights[ i ];

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        getDirectionalLightInfo( directionalLight, directLight );
      #else
        getDirectionalLightInfo( directionalLight, geometry, directLight );
      #endif

      shadow = 1.0;
      #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      // COMPAT: pre-r166
      // r166 introduced shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #else
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
      #endif
      #endif

      // COMPAT: pre-r156 uses a struct GeometricContext
      #if THREE_VRM_THREE_REVISION >= 157
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, shadow, reflectedLight );
      #else
        RE_Direct( directLight, geometry, material, shadow, reflectedLight );
      #endif

    }
    #pragma unroll_loop_end

  #endif

  // #if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

  //   RectAreaLight rectAreaLight;

  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

  //     rectAreaLight = rectAreaLights[ i ];
  //     RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

  //   }
  //   #pragma unroll_loop_end

  // #endif

  #if defined( RE_IndirectDiffuse )

    vec3 iblIrradiance = vec3( 0.0 );

    vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

    // COMPAT: pre-r156 uses a struct GeometricContext
    // COMPAT: pre-r156 doesn't have a define USE_LIGHT_PROBES
    #if THREE_VRM_THREE_REVISION >= 157
      #if defined( USE_LIGHT_PROBES )
        irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
      #endif
    #else
      irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
    #endif

    #if ( NUM_HEMI_LIGHTS > 0 )

      #pragma unroll_loop_start
      for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

        // COMPAT: pre-r156 uses a struct GeometricContext
        #if THREE_VRM_THREE_REVISION >= 157
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
        #else
          irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
        #endif

      }
      #pragma unroll_loop_end

    #endif

  #endif

  // #if defined( RE_IndirectSpecular )

  //   vec3 radiance = vec3( 0.0 );
  //   vec3 clearcoatRadiance = vec3( 0.0 );

  // #endif

  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 col = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

  #ifdef DEBUG_LITSHADERATE
    gl_FragColor = vec4( col, diffuseColor.a );
    postCorrection();
    return;
  #endif

  // -- MToon: rim lighting -----------------------------------------
  vec3 viewDir = normalize( vViewPosition );

  #ifndef PHYSICALLY_CORRECT_LIGHTS
    reflectedLight.directSpecular /= PI;
  #endif
  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, 1.0 );

  vec3 rim = parametricRimColorFactor * pow( saturate( 1.0 - dot( viewDir, normal ) + parametricRimLiftFactor ), parametricRimFresnelPowerFactor );

  #ifdef USE_MATCAPTEXTURE
    {
      vec3 x = normalize( vec3( viewDir.z, 0.0, -viewDir.x ) );
      vec3 y = cross( viewDir, x ); // guaranteed to be normalized
      vec2 sphereUv = 0.5 + 0.5 * vec2( dot( x, normal ), -dot( y, normal ) );
      sphereUv = ( matcapTextureUvTransform * vec3( sphereUv, 1 ) ).xy;
      vec3 matcap = texture2D( matcapTexture, sphereUv ).rgb;
      rim += matcapFactor * matcap;
    }
  #endif

  #ifdef USE_RIMMULTIPLYTEXTURE
    vec2 rimMultiplyTextureUv = ( rimMultiplyTextureUvTransform * vec3( uv, 1 ) ).xy;
    rim *= texture2D( rimMultiplyTexture, rimMultiplyTextureUv ).rgb;
  #endif

  col += rimMix * rim;

  // -- MToon: Emission --------------------------------------------------------
  col += totalEmissiveRadiance;

  // #include <envmap_fragment>

  // -- Almost done! -----------------------------------------------------------
  #if defined( OUTLINE )
    col = outlineColorFactor.rgb * mix( vec3( 1.0 ), col, outlineLightingMixFactor );
  #endif

  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif

  gl_FragColor = vec4( col, diffuseColor.a );
  postCorrection();
}
`,ri={None:"none",Normal:"normal",LitShadeRate:"litShadeRate",UV:"uv"},ze={None:"none",WorldCoordinates:"worldCoordinates",ScreenCoordinates:"screenCoordinates"},io={3e3:"",3001:"srgb"};function Et(t){return parseInt(oi.REVISION,10)>=152?t.colorSpace:io[t.encoding]}var si=class extends P.ShaderMaterial{constructor(t={}){var e;super({vertexShader:to,fragmentShader:no}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=P.TangentSpaceNormalMap,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=ri.None,this._outlineWidthMode=ze.None,this._isOutline=!1,t.transparentWithZWrite&&(t.depthWrite=!0),delete t.transparentWithZWrite,t.fog=!0,t.lights=!0,t.clipping=!0,this.uniforms=P.UniformsUtils.merge([P.UniformsLib.common,P.UniformsLib.normalmap,P.UniformsLib.emissivemap,P.UniformsLib.fog,P.UniformsLib.lights,{litFactor:{value:new P.Color(1,1,1)},mapUvTransform:{value:new P.Matrix3},colorAlpha:{value:1},normalMapUvTransform:{value:new P.Matrix3},shadeColorFactor:{value:new P.Color(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new P.Matrix3},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new P.Matrix3},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new P.Color(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new P.Matrix3},parametricRimColorFactor:{value:new P.Color(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new P.Matrix3},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new P.Color(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new P.Matrix3},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new P.Matrix3},outlineWidthFactor:{value:0},outlineColorFactor:{value:new P.Color(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new P.Matrix3},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(e=t.uniforms)!=null?e:{}]),this.setValues(t),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([n,i])=>`${n}:${i}`),this.matcapTexture?`matcapTextureColorSpace:${Et(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${Et(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${Et(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=n=>{let i=parseInt(P.REVISION,10),r=Object.entries(ti(ti({},this._generateDefines()),this.defines)).filter(([s,a])=>!!a).map(([s,a])=>`#define ${s} ${a}`).join(`
`)+`
`;n.vertexShader=r+n.vertexShader,n.fragmentShader=r+n.fragmentShader,i<154&&(n.fragmentShader=n.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(t){this.uniforms.litFactor.value=t}get map(){return this.uniforms.map.value}set map(t){this.uniforms.map.value=t}get normalMap(){return this.uniforms.normalMap.value}set normalMap(t){this.uniforms.normalMap.value=t}get normalScale(){return this.uniforms.normalScale.value}set normalScale(t){this.uniforms.normalScale.value=t}get emissive(){return this.uniforms.emissive.value}set emissive(t){this.uniforms.emissive.value=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(t){this.uniforms.emissiveIntensity.value=t}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(t){this.uniforms.emissiveMap.value=t}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(t){this.uniforms.shadeColorFactor.value=t}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(t){this.uniforms.shadeMultiplyTexture.value=t}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(t){this.uniforms.shadingShiftFactor.value=t}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(t){this.uniforms.shadingShiftTexture.value=t}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(t){this.uniforms.shadingShiftTextureScale.value=t}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(t){this.uniforms.shadingToonyFactor.value=t}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(t){this.uniforms.giEqualizationFactor.value=t}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(t){this.uniforms.matcapFactor.value=t}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(t){this.uniforms.matcapTexture.value=t}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(t){this.uniforms.parametricRimColorFactor.value=t}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(t){this.uniforms.rimMultiplyTexture.value=t}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(t){this.uniforms.rimLightingMixFactor.value=t}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(t){this.uniforms.parametricRimFresnelPowerFactor.value=t}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(t){this.uniforms.parametricRimLiftFactor.value=t}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(t){this.uniforms.outlineWidthMultiplyTexture.value=t}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(t){this.uniforms.outlineWidthFactor.value=t}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(t){this.uniforms.outlineColorFactor.value=t}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(t){this.uniforms.outlineLightingMixFactor.value=t}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(t){this.uniforms.uvAnimationMaskTexture.value=t}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(t){this.uniforms.uvAnimationScrollXOffset.value=t}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(t){this.uniforms.uvAnimationScrollYOffset.value=t}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(t){this.uniforms.uvAnimationRotationPhase.value=t}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(t){this._ignoreVertexColor=t,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(t){this._v0CompatShade=t,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(t){this._debugMode=t,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(t){this._outlineWidthMode=t,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(t){this._isOutline=t,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(t){this._uploadUniformsWorkaround(),this._updateUVAnimation(t)}copy(t){return super.copy(t),this.map=t.map,this.normalMap=t.normalMap,this.emissiveMap=t.emissiveMap,this.shadeMultiplyTexture=t.shadeMultiplyTexture,this.shadingShiftTexture=t.shadingShiftTexture,this.matcapTexture=t.matcapTexture,this.rimMultiplyTexture=t.rimMultiplyTexture,this.outlineWidthMultiplyTexture=t.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=t.uvAnimationMaskTexture,this.normalMapType=t.normalMapType,this.uvAnimationScrollXSpeedFactor=t.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=t.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=t.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=t.ignoreVertexColor,this.v0CompatShade=t.v0CompatShade,this.debugMode=t.debugMode,this.outlineWidthMode=t.outlineWidthMode,this.isOutline=t.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(t){this.uniforms.uvAnimationScrollXOffset.value+=t*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=t*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=t*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){let t=parseInt(P.REVISION,10),e=this.outlineWidthMultiplyTexture!==null,n=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:t,OUTLINE:this._isOutline,MTOON_USE_UV:e||n,MTOON_UVS_VERTEX_ONLY:e&&!n,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_WORLD:this._isOutline&&this._outlineWidthMode===ze.WorldCoordinates,OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===ze.ScreenCoordinates}}_updateTextureMatrix(t,e){t.value&&(t.value.matrixAutoUpdate&&t.value.updateMatrix(),e.value.copy(t.value.matrix))}},ro=new Set(["1.0","1.0-beta"]),ai=class je{get name(){return je.EXTENSION_NAME}constructor(e,n={}){var i,r,s,a;this.parser=e,this.materialType=(i=n.materialType)!=null?i:si,this.renderOrderOffset=(r=n.renderOrderOffset)!=null?r:0,this.v0CompatShade=(s=n.v0CompatShade)!=null?s:!1,this.debugMode=(a=n.debugMode)!=null?a:"none",this._mToonMaterialSet=new Set}beforeRoot(){return ne(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return ne(this,null,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?this.materialType:null}extendMaterialParams(e,n){let i=this._getMToonExtension(e);return i?this._extendMaterialParams(i,n):null}loadMesh(e){return ne(this,null,function*(){var n;let i=this.parser,s=(n=i.json.meshes)==null?void 0:n[e];if(s==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);let a=s.primitives,l=yield i.loadMesh(e);if(a.length===1){let o=l,u=a[0].material;u!=null&&this._setupPrimitive(o,u)}else{let o=l;for(let u=0;u<a.length;u++){let d=o.children[u],c=a[u].material;c!=null&&this._setupPrimitive(d,c)}}return l})}_removeUnlitExtensionIfMToonExists(){let i=this.parser.json.materials;i==null||i.map((r,s)=>{var a;this._getMToonExtension(s)&&((a=r.extensions)!=null&&a.KHR_materials_unlit)&&delete r.extensions.KHR_materials_unlit})}_getMToonExtension(e){var n,i;let a=(n=this.parser.json.materials)==null?void 0:n[e];if(a==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let l=(i=a.extensions)==null?void 0:i[je.EXTENSION_NAME];if(l==null)return;let o=l.specVersion;if(!ro.has(o)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${je.EXTENSION_NAME} specVersion "${o}"`);return}return l}_extendMaterialParams(e,n){return ne(this,null,function*(){var i;delete n.metalness,delete n.roughness;let r=new eo(this.parser,n);r.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),r.assignColor("shadeColorFactor",e.shadeColorFactor),r.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),r.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),r.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),r.assignPrimitive("shadingShiftTextureScale",(i=e.shadingShiftTexture)==null?void 0:i.scale),r.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),r.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),r.assignColor("matcapFactor",e.matcapFactor),r.assignTexture("matcapTexture",e.matcapTexture,!0),r.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),r.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),r.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),r.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),r.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),r.assignPrimitive("outlineWidthMode",e.outlineWidthMode),r.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),r.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),r.assignColor("outlineColorFactor",e.outlineColorFactor),r.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),r.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),r.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),r.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),r.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),r.assignPrimitive("v0CompatShade",this.v0CompatShade),r.assignPrimitive("debugMode",this.debugMode),yield r.pending})}_setupPrimitive(e,n){let i=this._getMToonExtension(n);if(i){let r=this._parseRenderOrder(i);e.renderOrder=r+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_shouldGenerateOutline(e){return typeof e.outlineWidthMode=="string"&&e.outlineWidthMode!=="none"&&typeof e.outlineWidthFactor=="number"&&e.outlineWidthFactor>0}_generateOutline(e){let n=e.material;if(!(n instanceof Ge.Material)||!this._shouldGenerateOutline(n))return;e.material=[n];let i=n.clone();i.name+=" (Outline)",i.isOutline=!0,i.side=Ge.BackSide,e.material.push(i);let r=e.geometry,s=r.index?r.index.count:r.attributes.position.count/3;r.addGroup(0,s,0),r.addGroup(0,s,1)}_addToMaterialSet(e){let n=e.material,i=new Set;Array.isArray(n)?n.forEach(r=>i.add(r)):i.add(n);for(let r of i)this._mToonMaterialSet.add(r)}_parseRenderOrder(e){var n;return(e.transparentWithZWrite?0:19)+((n=e.renderQueueOffsetNumber)!=null?n:0)}};ai.EXTENSION_NAME="VRMC_materials_mtoon";var Mt=ai;var oo=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())}),li=class Rt{get name(){return Rt.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,n){return oo(this,null,function*(){let i=this._getHDREmissiveMultiplierExtension(e);if(i==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");let r=i.emissiveMultiplier;n.emissiveIntensity=r})}_getHDREmissiveMultiplierExtension(e){var n,i;let a=(n=this.parser.json.materials)==null?void 0:n[e];if(a==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let l=(i=a.extensions)==null?void 0:i[Rt.EXTENSION_NAME];if(l!=null)return l}};li.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var ui=li;var pi=M(require("three"),1);var so=Object.defineProperty,ao=Object.defineProperties,lo=Object.getOwnPropertyDescriptors,di=Object.getOwnPropertySymbols,uo=Object.prototype.hasOwnProperty,ho=Object.prototype.propertyIsEnumerable,hi=(t,e,n)=>e in t?so(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,W=(t,e)=>{for(var n in e||(e={}))uo.call(e,n)&&hi(t,n,e[n]);if(di)for(var n of di(e))ho.call(e,n)&&hi(t,n,e[n]);return t},ci=(t,e)=>ao(t,lo(e)),co=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())});function ce(t){return Math.pow(t,2.2)}var mi=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(t){var e;this.parser=t,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;let n=this.parser.json;n.extensionsUsed=(e=n.extensionsUsed)!=null?e:[],n.extensionsUsed.indexOf("KHR_texture_transform")===-1&&n.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return co(this,null,function*(){var t;let e=this.parser.json,n=(t=e.extensions)==null?void 0:t.VRM,i=n==null?void 0:n.materialProperties;i&&(this._populateRenderQueueMap(i),i.forEach((r,s)=>{var a,l;let o=(a=e.materials)==null?void 0:a[s];if(o==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${s}] of glTF but the material doesn't exist`);return}if(r.shader==="VRM/MToon"){let u=this._parseV0MToonProperties(r,o);e.materials[s]=u}else if((l=r.shader)!=null&&l.startsWith("VRM/Unlit")){let u=this._parseV0UnlitProperties(r,o);e.materials[s]=u}else r.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${r.shader}`)}))})}_parseV0MToonProperties(t,e){var n,i,r,s,a,l,o,u,d,c,f,p,m,h,_,g,y,x,v,T,E,R,L,U,H,b,C,fe,Vt,It,Ut,Ct,Ot,Nt,Dt,Bt,Ft,Wt,kt,zt,jt,Gt,Qt,qt,Xt,Yt,$t,Zt,Jt,Kt,en,tn,nn,rn,on;let sn=(i=(n=t.keywordMap)==null?void 0:n._ALPHABLEND_ON)!=null?i:!1,Bi=((r=t.floatProperties)==null?void 0:r._ZWrite)===1&&sn,Fi=this._v0ParseRenderQueue(t),an=(a=(s=t.keywordMap)==null?void 0:s._ALPHATEST_ON)!=null?a:!1,Wi=sn?"BLEND":an?"MASK":"OPAQUE",ki=an?(o=(l=t.floatProperties)==null?void 0:l._Cutoff)!=null?o:.5:void 0,zi=((d=(u=t.floatProperties)==null?void 0:u._CullMode)!=null?d:2)===0,K=this._portTextureTransform(t),ji=((f=(c=t.vectorProperties)==null?void 0:c._Color)!=null?f:[1,1,1,1]).map((_n,mr)=>mr===3?_n:ce(_n)),ln=(p=t.textureProperties)==null?void 0:p._MainTex,Gi=ln!=null?{index:ln,extensions:W({},K)}:void 0,Qi=(h=(m=t.floatProperties)==null?void 0:m._BumpScale)!=null?h:1,un=(_=t.textureProperties)==null?void 0:_._BumpMap,qi=un!=null?{index:un,scale:Qi,extensions:W({},K)}:void 0,Xi=((y=(g=t.vectorProperties)==null?void 0:g._EmissionColor)!=null?y:[0,0,0,1]).map(ce),dn=(x=t.textureProperties)==null?void 0:x._EmissionMap,Yi=dn!=null?{index:dn,extensions:W({},K)}:void 0,$i=((T=(v=t.vectorProperties)==null?void 0:v._ShadeColor)!=null?T:[.97,.81,.86,1]).map(ce),hn=(E=t.textureProperties)==null?void 0:E._ShadeTexture,Zi=hn!=null?{index:hn,extensions:W({},K)}:void 0,Pe=(L=(R=t.floatProperties)==null?void 0:R._ShadeShift)!=null?L:0,Se=(H=(U=t.floatProperties)==null?void 0:U._ShadeToony)!=null?H:.9;Se=pi.MathUtils.lerp(Se,1,.5+.5*Pe),Pe=-Pe-(1-Se);let cn=(C=(b=t.floatProperties)==null?void 0:b._IndirectLightIntensity)!=null?C:.1,Ji=cn?1-cn:void 0,Ke=(fe=t.textureProperties)==null?void 0:fe._SphereAdd,Ki=Ke!=null?[1,1,1]:void 0,er=Ke!=null?{index:Ke}:void 0,tr=(It=(Vt=t.floatProperties)==null?void 0:Vt._RimLightingMix)!=null?It:0,pn=(Ut=t.textureProperties)==null?void 0:Ut._RimTexture,nr=pn!=null?{index:pn,extensions:W({},K)}:void 0,ir=((Ot=(Ct=t.vectorProperties)==null?void 0:Ct._RimColor)!=null?Ot:[0,0,0,1]).map(ce),rr=(Dt=(Nt=t.floatProperties)==null?void 0:Nt._RimFresnelPower)!=null?Dt:1,or=(Ft=(Bt=t.floatProperties)==null?void 0:Bt._RimLift)!=null?Ft:0,sr=["none","worldCoordinates","screenCoordinates"][(kt=(Wt=t.floatProperties)==null?void 0:Wt._OutlineWidthMode)!=null?kt:0],et=(jt=(zt=t.floatProperties)==null?void 0:zt._OutlineWidth)!=null?jt:0;et=.01*et;let mn=(Gt=t.textureProperties)==null?void 0:Gt._OutlineWidthTexture,ar=mn!=null?{index:mn,extensions:W({},K)}:void 0,lr=((qt=(Qt=t.vectorProperties)==null?void 0:Qt._OutlineColor)!=null?qt:[0,0,0]).map(ce),ur=((Yt=(Xt=t.floatProperties)==null?void 0:Xt._OutlineColorMode)!=null?Yt:0)===1?(Zt=($t=t.floatProperties)==null?void 0:$t._OutlineLightingMix)!=null?Zt:1:0,fn=(Jt=t.textureProperties)==null?void 0:Jt._UvAnimMaskTexture,dr=fn!=null?{index:fn,extensions:W({},K)}:void 0,hr=(en=(Kt=t.floatProperties)==null?void 0:Kt._UvAnimScrollX)!=null?en:0,Ae=(nn=(tn=t.floatProperties)==null?void 0:tn._UvAnimScrollY)!=null?nn:0;Ae!=null&&(Ae=-Ae);let cr=(on=(rn=t.floatProperties)==null?void 0:rn._UvAnimRotation)!=null?on:0,pr={specVersion:"1.0",transparentWithZWrite:Bi,renderQueueOffsetNumber:Fi,shadeColorFactor:$i,shadeMultiplyTexture:Zi,shadingShiftFactor:Pe,shadingToonyFactor:Se,giEqualizationFactor:Ji,matcapFactor:Ki,matcapTexture:er,rimLightingMixFactor:tr,rimMultiplyTexture:nr,parametricRimColorFactor:ir,parametricRimFresnelPowerFactor:rr,parametricRimLiftFactor:or,outlineWidthMode:sr,outlineWidthFactor:et,outlineWidthMultiplyTexture:ar,outlineColorFactor:lr,outlineLightingMixFactor:ur,uvAnimationMaskTexture:dr,uvAnimationScrollXSpeedFactor:hr,uvAnimationScrollYSpeedFactor:Ae,uvAnimationRotationSpeedFactor:cr};return ci(W({},e),{pbrMetallicRoughness:{baseColorFactor:ji,baseColorTexture:Gi},normalTexture:qi,emissiveTexture:Yi,emissiveFactor:Xi,alphaMode:Wi,alphaCutoff:ki,doubleSided:zi,extensions:{VRMC_materials_mtoon:pr}})}_parseV0UnlitProperties(t,e){var n,i,r,s,a;let l=t.shader==="VRM/UnlitTransparentZWrite",o=t.shader==="VRM/UnlitTransparent"||l,u=this._v0ParseRenderQueue(t),d=t.shader==="VRM/UnlitCutout",c=o?"BLEND":d?"MASK":"OPAQUE",f=d?(i=(n=t.floatProperties)==null?void 0:n._Cutoff)!=null?i:.5:void 0,p=this._portTextureTransform(t),m=((s=(r=t.vectorProperties)==null?void 0:r._Color)!=null?s:[1,1,1,1]).map(ce),h=(a=t.textureProperties)==null?void 0:a._MainTex,_=h!=null?{index:h,extensions:W({},p)}:void 0,g={specVersion:"1.0",transparentWithZWrite:l,renderQueueOffsetNumber:u,shadeColorFactor:m,shadeMultiplyTexture:_};return ci(W({},e),{pbrMetallicRoughness:{baseColorFactor:m,baseColorTexture:_},alphaMode:c,alphaCutoff:f,extensions:{VRMC_materials_mtoon:g}})}_portTextureTransform(t){var e,n,i,r,s;let a=(e=t.vectorProperties)==null?void 0:e._MainTex;if(a==null)return{};let l=[(n=a==null?void 0:a[0])!=null?n:0,(i=a==null?void 0:a[1])!=null?i:0],o=[(r=a==null?void 0:a[2])!=null?r:1,(s=a==null?void 0:a[3])!=null?s:1];return l[1]=1-o[1]-l[1],{KHR_texture_transform:{offset:l,scale:o}}}_v0ParseRenderQueue(t){var e,n,i;let r=(n=(e=t.keywordMap)==null?void 0:e._ALPHABLEND_ON)!=null?n:!1,s=((i=t.floatProperties)==null?void 0:i._ZWrite)===1,a=0;if(r){let l=t.renderQueue;l!=null&&(s?a=this._renderQueueMapTransparentZWrite.get(l):a=this._renderQueueMapTransparent.get(l))}return a}_populateRenderQueueMap(t){let e=new Set,n=new Set;t.forEach(i=>{var r,s,a;let l=(s=(r=i.keywordMap)==null?void 0:r._ALPHABLEND_ON)!=null?s:!1,o=((a=i.floatProperties)==null?void 0:a._ZWrite)===1;if(l){let u=i.renderQueue;u!=null&&(o?n.add(u):e.add(u))}}),e.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${e.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),n.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${n.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(e).sort().forEach((i,r)=>{let s=Math.min(Math.max(r-e.size+1,-9),0);this._renderQueueMapTransparent.set(i,s)}),Array.from(n).sort().forEach((i,r)=>{let s=Math.min(Math.max(r,0),9);this._renderQueueMapTransparentZWrite.set(i,s)})}};var O=M(require("three"),1),k=M(require("three"),1),Tt=M(require("three"),1),Re=M(require("three"),1),G=M(require("three"),1);var fi=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())}),$=new O.Vector3,Qe=class extends O.Group{constructor(t){super(),this._attrPosition=new O.BufferAttribute(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(O.DynamicDrawUsage);let e=new O.BufferGeometry;e.setAttribute("position",this._attrPosition);let n=new O.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new O.Line(e,n),this.add(this._line),this.constraint=t}updateMatrixWorld(t){$.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,$.x,$.y,$.z),this.constraint.source&&$.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,$.x,$.y,$.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(t)}};function _i(t,e){return e.set(t.elements[12],t.elements[13],t.elements[14])}var po=new Tt.Vector3,mo=new Tt.Vector3;function fo(t,e){return t.decompose(po,e,mo),e}function qe(t){return t.invert?t.invert():t.inverse(),t}var Xe=class{constructor(t,e){this.destination=t,this.source=e,this.weight=1}},_o=new k.Vector3,go=new k.Vector3,vo=new k.Vector3,Eo=new k.Quaternion,Mo=new k.Quaternion,Ro=new k.Quaternion,gi=class extends Xe{get aimAxis(){return this._aimAxis}set aimAxis(t){this._aimAxis=t,this._v3AimAxis.set(t==="PositiveX"?1:t==="NegativeX"?-1:0,t==="PositiveY"?1:t==="NegativeY"?-1:0,t==="PositiveZ"?1:t==="NegativeZ"?-1:0)}get dependencies(){let t=new Set([this.source]);return this.destination.parent&&t.add(this.destination.parent),t}constructor(t,e){super(t,e),this._aimAxis="PositiveX",this._v3AimAxis=new k.Vector3(1,0,0),this._dstRestQuat=new k.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);let t=Eo.identity(),e=Mo.identity();this.destination.parent&&(fo(this.destination.parent.matrixWorld,t),qe(e.copy(t)));let n=_o.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(t),i=_i(this.source.matrixWorld,go).sub(_i(this.destination.matrixWorld,vo)).normalize(),r=Ro.setFromUnitVectors(n,i).premultiply(e).multiply(t).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(r,this.weight)}};function To(t,e){let n=[t],i=t.parent;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{e(r)})}var vi=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(t){this._constraints.add(t);let e=this._objectConstraintsMap.get(t.destination);e==null&&(e=new Set,this._objectConstraintsMap.set(t.destination,e)),e.add(t)}deleteConstraint(t){this._constraints.delete(t),this._objectConstraintsMap.get(t.destination).delete(t)}setInitState(){let t=new Set,e=new Set;for(let n of this._constraints)this._processConstraint(n,t,e,i=>i.setInitState())}update(){let t=new Set,e=new Set;for(let n of this._constraints)this._processConstraint(n,t,e,i=>i.update())}_processConstraint(t,e,n,i){if(n.has(t))return;if(e.has(t))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");e.add(t);let r=t.dependencies;for(let s of r)To(s,a=>{let l=this._objectConstraintsMap.get(a);if(l)for(let o of l)this._processConstraint(o,e,n,i)});i(t),n.add(t)}},xo=new Re.Quaternion,yo=new Re.Quaternion,Ei=class extends Xe{get dependencies(){return new Set([this.source])}constructor(t,e){super(t,e),this._dstRestQuat=new Re.Quaternion,this._invSrcRestQuat=new Re.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),qe(this._invSrcRestQuat.copy(this.source.quaternion))}update(){let t=xo.copy(this._invSrcRestQuat).multiply(this.source.quaternion),e=yo.copy(this._dstRestQuat).multiply(t);this.destination.quaternion.copy(this._dstRestQuat).slerp(e,this.weight)}},wo=new G.Vector3,Po=new G.Quaternion,So=new G.Quaternion,Mi=class extends Xe{get rollAxis(){return this._rollAxis}set rollAxis(t){this._rollAxis=t,this._v3RollAxis.set(t==="X"?1:0,t==="Y"?1:0,t==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(t,e){super(t,e),this._rollAxis="X",this._v3RollAxis=new G.Vector3(1,0,0),this._dstRestQuat=new G.Quaternion,this._invDstRestQuat=new G.Quaternion,this._invSrcRestQuatMulDstRestQuat=new G.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),qe(this._invDstRestQuat.copy(this._dstRestQuat)),qe(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){let t=Po.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),e=wo.copy(this._v3RollAxis).applyQuaternion(t),i=So.setFromUnitVectors(e,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(t);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}},Ao=new Set(["1.0","1.0-beta"]),Ri=class Me{get name(){return Me.EXTENSION_NAME}constructor(e,n){this.parser=e,this.helperRoot=n==null?void 0:n.helperRoot}afterRoot(e){return fi(this,null,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){return fi(this,null,function*(){var n;let i=this.parser.json;if(!(((n=i.extensionsUsed)==null?void 0:n.indexOf(Me.EXTENSION_NAME))!==-1))return null;let s=new vi,a=yield this.parser.getDependencies("node");return a.forEach((l,o)=>{var u;let d=i.nodes[o],c=(u=d==null?void 0:d.extensions)==null?void 0:u[Me.EXTENSION_NAME];if(c==null)return;let f=c.specVersion;if(!Ao.has(f)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${Me.EXTENSION_NAME} specVersion "${f}"`);return}let p=c.constraint;if(p.roll!=null){let m=this._importRollConstraint(l,a,p.roll);s.addConstraint(m)}else if(p.aim!=null){let m=this._importAimConstraint(l,a,p.aim);s.addConstraint(m)}else if(p.rotation!=null){let m=this._importRotationConstraint(l,a,p.rotation);s.addConstraint(m)}}),e.scene.updateMatrixWorld(),s.setInitState(),s})}_importRollConstraint(e,n,i){let{source:r,rollAxis:s,weight:a}=i,l=n[r],o=new Mi(e,l);if(s!=null&&(o.rollAxis=s),a!=null&&(o.weight=a),this.helperRoot){let u=new Qe(o);this.helperRoot.add(u)}return o}_importAimConstraint(e,n,i){let{source:r,aimAxis:s,weight:a}=i,l=n[r],o=new gi(e,l);if(s!=null&&(o.aimAxis=s),a!=null&&(o.weight=a),this.helperRoot){let u=new Qe(o);this.helperRoot.add(u)}return o}_importRotationConstraint(e,n,i){let{source:r,weight:s}=i,a=n[r],l=new Ei(e,a);if(s!=null&&(l.weight=s),this.helperRoot){let o=new Qe(l);this.helperRoot.add(o)}return l}};Ri.EXTENSION_NAME="VRMC_node_constraint";var xt=Ri;var Z=M(require("three"),1),we=M(require("three"),1),yi=M(require("three"),1),q=M(require("three"),1),oe=M(require("three"),1),J=M(require("three"),1),se=M(require("three"),1),Pi=M(require("three"),1),I=M(require("three"),1),Si=M(require("three"),1),Li=M(require("three"),1),re=M(require("three"),1);var Ye=(t,e,n)=>new Promise((i,r)=>{var s=o=>{try{l(n.next(o))}catch(u){r(u)}},a=o=>{try{l(n.throw(o))}catch(u){r(u)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(s,a);l((n=n.apply(t,e)).next())}),At=class{},yt=new we.Vector3,ie=new we.Vector3,Lt=class extends At{get type(){return"capsule"}constructor(t){var e,n,i;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new we.Vector3(0,0,0),this.tail=(n=t==null?void 0:t.tail)!=null?n:new we.Vector3(0,0,0),this.radius=(i=t==null?void 0:t.radius)!=null?i:0}calculateCollision(t,e,n,i){yt.copy(this.offset).applyMatrix4(t),ie.copy(this.tail).applyMatrix4(t),ie.sub(yt);let r=ie.lengthSq();i.copy(e).sub(yt);let s=ie.dot(i);s<=0||(r<=s||ie.multiplyScalar(s/r),i.sub(ie));let a=n+this.radius,l=i.length()-a;return i.normalize(),l}},Ht=class extends At{get type(){return"sphere"}constructor(t){var e,n;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new yi.Vector3(0,0,0),this.radius=(n=t==null?void 0:t.radius)!=null?n:0}calculateCollision(t,e,n,i){i.copy(this.offset).applyMatrix4(t),i.negate().add(e);let r=n+this.radius,s=i.length()-r;return i.normalize(),s}},z=new q.Vector3,Lo=class extends q.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new q.Vector3,this._currentTail=new q.Vector3,this._shape=t,this._attrPos=new q.BufferAttribute(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new q.BufferAttribute(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0);let n=z.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(n)>1e-10&&(this._currentTail.copy(n),t=!0),t&&this._buildPosition()}_buildPosition(){z.copy(this._currentTail).sub(this._currentOffset);let t=z.length()/this._currentRadius;for(let i=0;i<=16;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(i,-Math.sin(r),-Math.cos(r),0),this._attrPos.setXYZ(17+i,t+Math.sin(r),Math.cos(r),0),this._attrPos.setXYZ(34+i,-Math.sin(r),0,-Math.cos(r)),this._attrPos.setXYZ(51+i,t+Math.sin(r),0,Math.cos(r))}for(let i=0;i<32;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(68+i,0,Math.sin(r),Math.cos(r)),this._attrPos.setXYZ(100+i,t,Math.sin(r),Math.cos(r))}let e=Math.atan2(z.y,Math.sqrt(z.x*z.x+z.z*z.z)),n=-Math.atan2(z.z,z.x);this.rotateZ(e),this.rotateY(n),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<34;t++){let e=(t+1)%34;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(68+t*2,34+t,34+e)}for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(136+t*2,68+t,68+e),this._attrIndex.setXY(200+t*2,100+t,100+e)}this._attrIndex.needsUpdate=!0}},Ho=class extends oe.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new oe.Vector3,this._shape=t,this._attrPos=new oe.BufferAttribute(new Float32Array(32*3*3),3),this.setAttribute("position",this._attrPos),this._attrIndex=new oe.BufferAttribute(new Uint16Array(64*3),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.needsUpdate=!0}},bo=new Z.Vector3,wt=class extends Z.Group{constructor(t){if(super(),this.matrixAutoUpdate=!1,this.collider=t,this.collider.shape instanceof Ht)this._geometry=new Ho(this.collider.shape);else if(this.collider.shape instanceof Lt)this._geometry=new Lo(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");let e=new Z.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new Z.LineSegments(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(t){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=bo.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(t)}},Vo=class extends se.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new se.Vector3,this._springBone=t,this._attrPos=new se.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new se.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},Io=new J.Vector3,wi=class extends J.Group{constructor(t){super(),this.matrixAutoUpdate=!1,this.springBone=t,this._geometry=new Vo(this.springBone);let e=new J.LineBasicMaterial({color:16776960,depthTest:!1,depthWrite:!1});this._line=new J.LineSegments(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(t){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=Io.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(t)}},Pt=class extends Pi.Object3D{constructor(t){super(),this.shape=t}},Uo=new Si.Matrix4;function Ai(t){return t.invert?t.invert():t.getInverse(Uo.copy(t)),t}var Co=class{constructor(t){this._inverseCache=new Li.Matrix4,this._shouldUpdateInverse=!0,this.matrix=t;let e={set:(n,i,r)=>(this._shouldUpdateInverse=!0,n[i]=r,!0)};this._originalElements=t.elements,t.elements=new Proxy(t.elements,e)}get inverse(){return this._shouldUpdateInverse&&(Ai(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},Oo=new I.Matrix4,Q=new I.Vector3,Te=new I.Vector3,No=new I.Vector3,pe=new I.Vector3,Ti=new I.Vector3,xe=new I.Vector3,xi=new I.Quaternion,me=new I.Matrix4,Do=new I.Matrix4,Hi=class{constructor(t,e,n={},i=[]){this._currentTail=new I.Vector3,this._prevTail=new I.Vector3,this._boneAxis=new I.Vector3,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new I.Matrix4,this._initialLocalRotation=new I.Quaternion,this._initialLocalChildPosition=new I.Vector3;var r,s,a,l,o,u;this.bone=t,this.bone.matrixAutoUpdate=!1,this.child=e,this.settings={hitRadius:(r=n.hitRadius)!=null?r:0,stiffness:(s=n.stiffness)!=null?s:1,gravityPower:(a=n.gravityPower)!=null?a:0,gravityDir:(o=(l=n.gravityDir)==null?void 0:l.clone())!=null?o:new I.Vector3(0,-1,0),dragForce:(u=n.dragForce)!=null?u:.4},this.colliderGroups=i}get center(){return this._center}set center(t){var e;(e=this._center)!=null&&e.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=t,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new Co(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:Oo}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);let t=this._getMatrixWorldToCenter(me);this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(t),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);let t=this._getMatrixWorldToCenter(me);this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(t),this._prevTail.copy(this._currentTail)}update(t){if(t<=0)return;this._calcWorldSpaceBoneLength(),pe.setFromMatrixPosition(this.bone.matrixWorld);let e=this._getMatrixWorldToCenter(me);Ti.copy(pe).applyMatrix4(e);let n=xi.setFromRotationMatrix(e),i=Do.copy(e).multiply(this._parentMatrixWorld),r=Te.copy(this._boneAxis).applyMatrix4(this._initialLocalMatrix).applyMatrix4(i).sub(Ti).normalize(),s=No.copy(this.settings.gravityDir).applyQuaternion(n).normalize(),a=this._getMatrixCenterToWorld(me);xe.copy(this._currentTail).add(Q.copy(this._currentTail).sub(this._prevTail).multiplyScalar(1-this.settings.dragForce)).add(Q.copy(r).multiplyScalar(this.settings.stiffness*t)).add(Q.copy(s).multiplyScalar(this.settings.gravityPower*t)).applyMatrix4(a),xe.sub(pe).normalize().multiplyScalar(this._worldSpaceBoneLength).add(pe),this._collision(xe),e=this._getMatrixWorldToCenter(me),this._prevTail.copy(this._currentTail),this._currentTail.copy(Q.copy(xe).applyMatrix4(e));let l=Ai(me.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix)),o=xi.setFromUnitVectors(this._boneAxis,Q.copy(xe).applyMatrix4(l).normalize());this.bone.quaternion.copy(this._initialLocalRotation).multiply(o),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(t){this.colliderGroups.forEach(e=>{e.colliders.forEach(n=>{let i=n.shape.calculateCollision(n.matrixWorld,t,this.settings.hitRadius,Q);i<0&&(t.add(Q.multiplyScalar(-i)),t.sub(pe).normalize().multiplyScalar(this._worldSpaceBoneLength).add(pe))})})}_calcWorldSpaceBoneLength(){Q.setFromMatrixPosition(this.bone.matrixWorld),this.child?Te.setFromMatrixPosition(this.child.matrixWorld):(Te.copy(this._initialLocalChildPosition),Te.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=Q.sub(Te).length()}_getMatrixCenterToWorld(t){return this._center?t.copy(this._center.matrixWorld):t.identity(),t}_getMatrixWorldToCenter(t){return this._center?t.copy(this._center.userData.inverseCacheProxy.inverse):t.identity(),t}};function Bo(t,e){let n=[],i=t;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{e(r)})}function bi(t,e){t.children.forEach(n=>{e(n)||bi(n,e)})}var St=class{constructor(){this._joints=new Set,this._objectSpringBonesMap=new Map}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){let t=new Set;return this._joints.forEach(e=>{e.colliderGroups.forEach(n=>{t.add(n)})}),Array.from(t)}get colliders(){let t=new Set;return this.colliderGroups.forEach(e=>{e.colliders.forEach(n=>{t.add(n)})}),Array.from(t)}addJoint(t){this._joints.add(t);let e=this._objectSpringBonesMap.get(t.bone);e==null&&(e=new Set,this._objectSpringBonesMap.set(t.bone,e)),e.add(t)}addSpringBone(t){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(t)}deleteJoint(t){this._joints.delete(t),this._objectSpringBonesMap.get(t.bone).delete(t)}deleteSpringBone(t){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(t)}setInitState(){let t=new Set,e=new Set,n=new Set;for(let i of this._joints)this._processSpringBone(i,t,e,n,r=>r.setInitState())}reset(){let t=new Set,e=new Set,n=new Set;for(let i of this._joints)this._processSpringBone(i,t,e,n,r=>r.reset())}update(t){let e=new Set,n=new Set,i=new Set;for(let r of this._joints)this._processSpringBone(r,e,n,i,s=>s.update(t)),bi(r.bone,s=>{var a,l;return((l=(a=this._objectSpringBonesMap.get(s))==null?void 0:a.size)!=null?l:0)>0?!0:(s.updateWorldMatrix(!1,!1),!1)})}_processSpringBone(t,e,n,i,r){if(n.has(t))return;if(e.has(t))throw new Error("VRMSpringBoneManager: Circular dependency detected while updating springbones");e.add(t);let s=this._getDependencies(t);for(let a of s)Bo(a,l=>{let o=this._objectSpringBonesMap.get(l);if(o)for(let u of o)this._processSpringBone(u,e,n,i,r);else i.has(l)||(l.updateWorldMatrix(!1,!1),i.add(l))});t.bone.updateMatrix(),t.bone.updateWorldMatrix(!1,!1),r(t),i.add(t.bone),n.add(t)}_getDependencies(t){let e=new Set,n=t.bone.parent;return n&&e.add(n),t.colliderGroups.forEach(i=>{i.colliders.forEach(r=>{e.add(r)})}),e}},Fo=new Set(["1.0","1.0-beta"]),Vi=class ye{get name(){return ye.EXTENSION_NAME}constructor(e,n){this.parser=e,this.jointHelperRoot=n==null?void 0:n.jointHelperRoot,this.colliderHelperRoot=n==null?void 0:n.colliderHelperRoot}afterRoot(e){return Ye(this,null,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return Ye(this,null,function*(){let n=yield this._v1Import(e);if(n!=null)return n;let i=yield this._v0Import(e);return i!=null?i:null})}_v1Import(e){return Ye(this,null,function*(){var n,i,r,s,a;let l=e.parser.json;if(!(((n=l.extensionsUsed)==null?void 0:n.indexOf(ye.EXTENSION_NAME))!==-1))return null;let u=new St,d=yield e.parser.getDependencies("node"),c=(i=l.extensions)==null?void 0:i[ye.EXTENSION_NAME];if(!c)return null;let f=c.specVersion;if(!Fo.has(f))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${ye.EXTENSION_NAME} specVersion "${f}"`),null;let p=(r=c.colliders)==null?void 0:r.map((h,_)=>{var g,y,x,v,T;let E=d[h.node],R=h.shape;if(R.sphere)return this._importSphereCollider(E,{offset:new re.Vector3().fromArray((g=R.sphere.offset)!=null?g:[0,0,0]),radius:(y=R.sphere.radius)!=null?y:0});if(R.capsule)return this._importCapsuleCollider(E,{offset:new re.Vector3().fromArray((x=R.capsule.offset)!=null?x:[0,0,0]),radius:(v=R.capsule.radius)!=null?v:0,tail:new re.Vector3().fromArray((T=R.capsule.tail)!=null?T:[0,0,0])});throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${_} has no valid shape`)}),m=(s=c.colliderGroups)==null?void 0:s.map((h,_)=>{var g;return{colliders:((g=h.colliders)!=null?g:[]).map(x=>{let v=p==null?void 0:p[x];if(v==null)throw new Error(`VRMSpringBoneLoaderPlugin: The colliderGroup #${_} attempted to use a collider #${x} but not found`);return v}),name:h.name}});return(a=c.springs)==null||a.forEach((h,_)=>{var g;let y=h.joints,x=(g=h.colliderGroups)==null?void 0:g.map(E=>{let R=m==null?void 0:m[E];if(R==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${_} attempted to use a colliderGroup ${E} but not found`);return R}),v=h.center!=null?d[h.center]:void 0,T;y.forEach(E=>{if(T){let R=T.node,L=d[R],U=E.node,H=d[U],b={hitRadius:T.hitRadius,dragForce:T.dragForce,gravityPower:T.gravityPower,stiffness:T.stiffness,gravityDir:T.gravityDir!=null?new re.Vector3().fromArray(T.gravityDir):void 0},C=this._importJoint(L,H,b,x);v&&(C.center=v),u.addJoint(C)}T=E})}),u.setInitState(),u})}_v0Import(e){return Ye(this,null,function*(){var n,i,r;let s=e.parser.json;if(!(((n=s.extensionsUsed)==null?void 0:n.indexOf("VRM"))!==-1))return null;let l=(i=s.extensions)==null?void 0:i.VRM,o=l==null?void 0:l.secondaryAnimation;if(!o)return null;let u=o==null?void 0:o.boneGroups;if(!u)return null;let d=new St,c=yield e.parser.getDependencies("node"),f=(r=o.colliderGroups)==null?void 0:r.map(p=>{var m;let h=c[p.node];return{colliders:((m=p.colliders)!=null?m:[]).map((g,y)=>{var x,v,T;let E=new re.Vector3(0,0,0);return g.offset&&E.set((x=g.offset.x)!=null?x:0,(v=g.offset.y)!=null?v:0,g.offset.z?-g.offset.z:0),this._importSphereCollider(h,{offset:E,radius:(T=g.radius)!=null?T:0})})}});return u==null||u.forEach((p,m)=>{let h=p.bones;h&&h.forEach(_=>{var g,y,x,v;let T=c[_],E=new re.Vector3;p.gravityDir?E.set((g=p.gravityDir.x)!=null?g:0,(y=p.gravityDir.y)!=null?y:0,(x=p.gravityDir.z)!=null?x:0):E.set(0,-1,0);let R=p.center!=null?c[p.center]:void 0,L={hitRadius:p.hitRadius,dragForce:p.dragForce,gravityPower:p.gravityPower,stiffness:p.stiffiness,gravityDir:E},U=(v=p.colliderGroups)==null?void 0:v.map(H=>{let b=f==null?void 0:f[H];if(b==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${m} attempted to use a colliderGroup ${H} but not found`);return b});T.traverse(H=>{var b;let C=(b=H.children[0])!=null?b:null,fe=this._importJoint(H,C,L,U);R&&(fe.center=R),d.addJoint(fe)})})}),e.scene.updateMatrixWorld(),d.setInitState(),d})}_importJoint(e,n,i,r){let s=new Hi(e,n,i,r);if(this.jointHelperRoot){let a=new wi(s);this.jointHelperRoot.add(a),a.renderOrder=this.jointHelperRoot.renderOrder}return s}_importSphereCollider(e,n){let{offset:i,radius:r}=n,s=new Ht({offset:i,radius:r}),a=new Pt(s);if(e.add(a),this.colliderHelperRoot){let l=new wt(a);this.colliderHelperRoot.add(l),l.renderOrder=this.colliderHelperRoot.renderOrder}return a}_importCapsuleCollider(e,n){let{offset:i,radius:r,tail:s}=n,a=new Lt({offset:i,radius:r,tail:s}),l=new Pt(a);if(e.add(l),this.colliderHelperRoot){let o=new wt(l);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return l}};Vi.EXTENSION_NAME="VRMC_springBone";var bt=Vi;var $e=class{get name(){return"VRMLoaderPlugin"}constructor(e,n){var s,a,l,o,u,d,c,f,p,m;this.parser=e;let i=n==null?void 0:n.helperRoot,r=n==null?void 0:n.autoUpdateHumanBones;this.expressionPlugin=(s=n==null?void 0:n.expressionPlugin)!=null?s:new Oe(e),this.firstPersonPlugin=(a=n==null?void 0:n.firstPersonPlugin)!=null?a:new Ne(e),this.humanoidPlugin=(l=n==null?void 0:n.humanoidPlugin)!=null?l:new Be(e,{helperRoot:i,autoUpdateHumanBones:r}),this.lookAtPlugin=(o=n==null?void 0:n.lookAtPlugin)!=null?o:new Fe(e,{helperRoot:i}),this.metaPlugin=(u=n==null?void 0:n.metaPlugin)!=null?u:new We(e),this.mtoonMaterialPlugin=(d=n==null?void 0:n.mtoonMaterialPlugin)!=null?d:new Mt(e),this.materialsHDREmissiveMultiplierPlugin=(c=n==null?void 0:n.materialsHDREmissiveMultiplierPlugin)!=null?c:new ui(e),this.materialsV0CompatPlugin=(f=n==null?void 0:n.materialsV0CompatPlugin)!=null?f:new mi(e),this.springBonePlugin=(p=n==null?void 0:n.springBonePlugin)!=null?p:new bt(e,{colliderHelperRoot:i,jointHelperRoot:i}),this.nodeConstraintPlugin=(m=n==null?void 0:n.nodeConstraintPlugin)!=null?m:new xt(e,{helperRoot:i})}beforeRoot(){return _e(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(e){return _e(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(e)})}getMaterialType(e){let n=this.mtoonMaterialPlugin.getMaterialType(e);return n!=null?n:null}extendMaterialParams(e,n){return _e(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(e,n),yield this.mtoonMaterialPlugin.extendMaterialParams(e,n)})}afterRoot(e){return _e(this,null,function*(){yield this.metaPlugin.afterRoot(e),yield this.humanoidPlugin.afterRoot(e),yield this.expressionPlugin.afterRoot(e),yield this.lookAtPlugin.afterRoot(e),yield this.firstPersonPlugin.afterRoot(e),yield this.springBonePlugin.afterRoot(e),yield this.nodeConstraintPlugin.afterRoot(e),yield this.mtoonMaterialPlugin.afterRoot(e);let n=e.userData.vrmMeta,i=e.userData.vrmHumanoid;if(n&&i){let r=new he({scene:e.scene,expressionManager:e.userData.vrmExpressionManager,firstPerson:e.userData.vrmFirstPerson,humanoid:i,lookAt:e.userData.vrmLookAt,meta:n,materials:e.userData.vrmMToonMaterials,springBoneManager:e.userData.vrmSpringBoneManager,nodeConstraintManager:e.userData.vrmNodeConstraintManager});e.userData.vrm=r}})}};function Ii(t){if(Object.values(t).forEach(e=>{e!=null&&e.isTexture&&e.dispose()}),t.isShaderMaterial){let e=t.uniforms;e&&Object.values(e).forEach(n=>{let i=n.value;i!=null&&i.isTexture&&i.dispose()})}t.dispose()}function Wo(t){let e=t.geometry;e&&e.dispose();let n=t.skeleton;n&&n.dispose();let i=t.material;i&&(Array.isArray(i)?i.forEach(r=>Ii(r)):i&&Ii(i))}function Ui(t){t.traverse(Wo)}var Ze=M(require("three"),1);function Ci(t,e){var a;let n=(a=e==null?void 0:e.experimentalSameBoneCounts)!=null?a:!1,i=[];t.traverse(l=>{l.type==="SkinnedMesh"&&i.push(l)});let r=new Map,s=0;for(let l of i){let u=l.geometry.getAttribute("skinIndex"),d=[],c=[],f={},p=u.array;for(let m=0;m<p.length;m++){let h=p[m];f[h]==null&&(f[h]=d.length,d.push(l.skeleton.bones[h]),c.push(l.skeleton.boneInverses[h])),p[m]=f[h]}u.copyArray(p),u.needsUpdate=!0,r.set(l,{bones:d,boneInverses:c}),s=Math.max(s,d.length)}for(let l of i){let{bones:o,boneInverses:u}=r.get(l);if(n)for(let c=o.length;c<s;c++)o[c]=o[0],u[c]=u[0];let d=new Ze.Skeleton(o,u);l.bind(d,new Ze.Matrix4)}}var Oi=M(require("three"),1),Je=require("three");function Ni(t){let e=new Map;t.traverse(n=>{var c,f,p,m;if(!n.isMesh)return;let i=n,r=i.geometry,s=r.index;if(s==null)return;let a=e.get(r);if(a!=null){i.geometry=a;return}let l=new Oi.BufferGeometry;l.name=r.name,l.morphTargetsRelative=r.morphTargetsRelative,r.groups.forEach(h=>{l.addGroup(h.start,h.count,h.materialIndex)}),l.boundingBox=(f=(c=r.boundingBox)==null?void 0:c.clone())!=null?f:null,l.boundingSphere=(m=(p=r.boundingSphere)==null?void 0:p.clone())!=null?m:null,l.setDrawRange(r.drawRange.start,r.drawRange.count),l.userData=r.userData,e.set(r,l);let o=[],u=[];{let h=s.array,_=new h.constructor(h.length),g=0;for(let y=0;y<h.length;y++){let x=h[y],v=o[x];v==null&&(o[x]=g,u[g]=x,v=g,g++),_[y]=v}l.setIndex(new Je.BufferAttribute(_,1,!1))}Object.keys(r.attributes).forEach(h=>{let _=r.attributes[h];if(_.isInterleavedBufferAttribute)throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");let g=_.array,{itemSize:y,normalized:x}=_,v=new g.constructor(u.length*y);u.forEach((T,E)=>{for(let R=0;R<y;R++)v[E*y+R]=g[T*y+R]}),l.setAttribute(h,new Je.BufferAttribute(v,y,x))});let d=!0;Object.keys(r.morphAttributes).forEach(h=>{l.morphAttributes[h]=[];let _=r.morphAttributes[h];for(let g=0;g<_.length;g++){let y=_[g];if(y.isInterleavedBufferAttribute)throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");let x=y.array,{itemSize:v,normalized:T}=y,E=new x.constructor(u.length*v);u.forEach((R,L)=>{for(let U=0;U<v;U++)E[L*v+U]=x[R*v+U]}),d=d&&E.every(R=>R===0),l.morphAttributes[h][g]=new Je.BufferAttribute(E,v,T)}}),d&&(l.morphAttributes={}),i.geometry=l}),Array.from(e.keys()).forEach(n=>{n.dispose()})}function Di(t){var e;((e=t.meta)==null?void 0:e.metaVersion)==="0"&&(t.scene.rotation.y=Math.PI)}var ae=class{constructor(){}};ae.deepDispose=Ui,ae.removeUnnecessaryJoints=Ci,ae.removeUnnecessaryVertices=Ni,ae.rotateVRM0=Di;
/*!
 * @pixiv/three-vrm-core v3.0.0-beta.2
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.0.0-beta.2
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.0.0-beta.2
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.0.0-beta.2
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.0.0-beta.2
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.0.0-beta.2
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2024 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
