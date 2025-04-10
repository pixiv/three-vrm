/*! (c) 2019-2025 pixiv Inc. - https://github.com/pixiv/three-vrm/blob/release/LICENSE */
"use strict";var yr=Object.create;var Fe=Object.defineProperty;var wr=Object.getOwnPropertyDescriptor;var Sr=Object.getOwnPropertyNames;var Pr=Object.getPrototypeOf,Ar=Object.prototype.hasOwnProperty;var Lr=(t,e)=>{for(var n in e)Fe(t,n,{get:e[n],enumerable:!0})},Sn=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Sr(e))!Ar.call(t,r)&&r!==n&&Fe(t,r,{get:()=>e[r],enumerable:!(i=wr(e,r))||i.enumerable});return t};var R=(t,e,n)=>(n=t!=null?yr(Pr(t)):{},Sn(e||!t||!t.__esModule?Fe(n,"default",{value:t,enumerable:!0}):n,t)),br=t=>Sn(Fe({},"__esModule",{value:!0}),t);var Se=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())});var us={};Lr(us,{MToonMaterial:()=>fi,MToonMaterialDebugMode:()=>pi,MToonMaterialLoaderPlugin:()=>Ct,MToonMaterialOutlineWidthMode:()=>Vt,VRM:()=>ve,VRMAimConstraint:()=>Si,VRMCore:()=>Ke,VRMCoreLoaderPlugin:()=>io,VRMExpression:()=>vt,VRMExpressionLoaderPlugin:()=>Qe,VRMExpressionManager:()=>Et,VRMExpressionMaterialColorBind:()=>Mt,VRMExpressionMaterialColorType:()=>fe,VRMExpressionMorphTargetBind:()=>_e,VRMExpressionOverrideType:()=>Cr,VRMExpressionPresetName:()=>je,VRMExpressionTextureTransformBind:()=>Rt,VRMFirstPerson:()=>Tt,VRMFirstPersonLoaderPlugin:()=>Ye,VRMFirstPersonMeshAnnotationType:()=>Or,VRMHumanBoneList:()=>ze,VRMHumanBoneName:()=>Br,VRMHumanBoneParentMap:()=>Jn,VRMHumanoid:()=>wt,VRMHumanoidHelper:()=>xt,VRMHumanoidLoaderPlugin:()=>$e,VRMLoaderPlugin:()=>dt,VRMLookAt:()=>si,VRMLookAtBoneApplier:()=>Ae,VRMLookAtExpressionApplier:()=>Xe,VRMLookAtHelper:()=>ii,VRMLookAtLoaderPlugin:()=>Ze,VRMLookAtRangeMap:()=>At,VRMLookAtTypeName:()=>eo,VRMMetaLoaderPlugin:()=>Je,VRMNodeConstraint:()=>rt,VRMNodeConstraintHelper:()=>nt,VRMNodeConstraintLoaderPlugin:()=>Nt,VRMNodeConstraintManager:()=>Pi,VRMRequiredHumanBoneName:()=>ni,VRMRollConstraint:()=>Li,VRMRotationConstraint:()=>Ai,VRMSpringBoneCollider:()=>at,VRMSpringBoneColliderHelper:()=>st,VRMSpringBoneColliderShape:()=>lt,VRMSpringBoneColliderShapeCapsule:()=>zt,VRMSpringBoneColliderShapePlane:()=>Gt,VRMSpringBoneColliderShapeSphere:()=>Xt,VRMSpringBoneJoint:()=>Oi,VRMSpringBoneJointHelper:()=>Vi,VRMSpringBoneLoaderPlugin:()=>Qt,VRMSpringBoneManager:()=>Wt,VRMUtils:()=>K});module.exports=br(us);var kn=R(require("three"),1),ee=R(require("three"),1),Lt=R(require("three"),1),Qn=R(require("three"),1),F=R(require("three"),1),$=R(require("three"),1),qe=R(require("three"),1),k=R(require("three"),1),I=R(require("three"),1),Le=R(require("three"),1),te=R(require("three"),1),C=R(require("three"),1),Ht=R(require("three"),1),V=R(require("three"),1),Pt=R(require("three"),1),ai=R(require("three"),1);var w=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())}),vt=class extends kn.Object3D{constructor(t){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${t}`,this.expressionName=t,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(t){this._binds.push(t)}deleteBind(t){let e=this._binds.indexOf(t);e>=0&&this._binds.splice(e,1)}applyWeight(t){var e;let n=this.outputWeight;n*=(e=t==null?void 0:t.multiplier)!=null?e:1,this.isBinary&&n<1&&(n=0),this._binds.forEach(i=>i.applyWeight(n))}clearAppliedWeight(){this._binds.forEach(t=>t.clearAppliedWeight())}};function Wn(t,e,n){var i,r;let o=t.parser.json,a=(i=o.nodes)==null?void 0:i[e];if(a==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;let l=a.mesh;if(l==null)return null;let s=(r=o.meshes)==null?void 0:r[l];if(s==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${l}] of glTF but the mesh doesn't exist`),null;let u=s.primitives.length,d=[];return n.traverse(h=>{d.length<u&&h.isMesh&&d.push(h)}),d}function Pn(t,e){return w(this,null,function*(){let n=yield t.parser.getDependency("node",e);return Wn(t,e,n)})}function An(t){return w(this,null,function*(){let e=yield t.parser.getDependencies("node"),n=new Map;return e.forEach((i,r)=>{let o=Wn(t,r,i);o!=null&&n.set(r,o)}),n})}var je={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function zn(t){return Math.max(Math.min(t,1),0)}var Et=class Gn{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let e={},n=new Set(Object.values(je));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)&&(e[i]=r)}),e}get customExpressionMap(){let e={},n=new Set(Object.values(je));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)||(e[i]=r)}),e}copy(e){return this._expressions.concat().forEach(i=>{this.unregisterExpression(i)}),e._expressions.forEach(i=>{this.registerExpression(i)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new Gn().copy(this)}getExpression(e){var n;return(n=this._expressionMap[e])!=null?n:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){let n=this._expressions.indexOf(e);n===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(n,1),delete this._expressionMap[e.expressionName]}getValue(e){var n;let i=this.getExpression(e);return(n=i==null?void 0:i.weight)!=null?n:null}setValue(e,n){let i=this.getExpression(e);i&&(i.weight=zn(n))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){let n=this.getExpression(e);return n?`${n.name}.weight`:null}update(){let e=this._calculateWeightMultipliers();this._expressions.forEach(n=>{n.clearAppliedWeight()}),this._expressions.forEach(n=>{let i=1,r=n.expressionName;this.blinkExpressionNames.indexOf(r)!==-1&&(i*=e.blink),this.lookAtExpressionNames.indexOf(r)!==-1&&(i*=e.lookAt),this.mouthExpressionNames.indexOf(r)!==-1&&(i*=e.mouth),n.applyWeight({multiplier:i})})}_calculateWeightMultipliers(){let e=1,n=1,i=1;return this._expressions.forEach(r=>{e-=r.overrideBlinkAmount,n-=r.overrideLookAtAmount,i-=r.overrideMouthAmount}),e=Math.max(0,e),n=Math.max(0,n),i=Math.max(0,i),{blink:e,lookAt:n,mouth:i}}},fe={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},Hr={_Color:fe.Color,_EmissionColor:fe.EmissionColor,_ShadeColor:fe.ShadeColor,_RimColor:fe.RimColor,_OutlineColor:fe.OutlineColor},Ir=new Lt.Color,jn=class Xn{constructor({material:e,type:n,targetValue:i,targetAlpha:r}){this.material=e,this.type=n,this.targetValue=i,this.targetAlpha=r!=null?r:1;let o=this._initColorBindState(),a=this._initAlphaBindState();this._state={color:o,alpha:a}}applyWeight(e){let{color:n,alpha:i}=this._state;if(n!=null){let{propertyName:r,deltaValue:o}=n,a=this.material[r];a!=null&&a.add(Ir.copy(o).multiplyScalar(e))}if(i!=null){let{propertyName:r,deltaValue:o}=i;this.material[r]!=null&&(this.material[r]+=o*e)}}clearAppliedWeight(){let{color:e,alpha:n}=this._state;if(e!=null){let{propertyName:i,initialValue:r}=e,o=this.material[i];o!=null&&o.copy(r)}if(n!=null){let{propertyName:i,initialValue:r}=n;this.material[i]!=null&&(this.material[i]=r)}}_initColorBindState(){var e,n,i;let{material:r,type:o,targetValue:a}=this,l=this._getPropertyNameMap(),s=(n=(e=l==null?void 0:l[o])==null?void 0:e[0])!=null?n:null;if(s==null)return console.warn(`Tried to add a material color bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${o} but the material or the type is not supported.`),null;let d=r[s].clone(),h=new Lt.Color(a.r-d.r,a.g-d.g,a.b-d.b);return{propertyName:s,initialValue:d,deltaValue:h}}_initAlphaBindState(){var e,n,i;let{material:r,type:o,targetAlpha:a}=this,l=this._getPropertyNameMap(),s=(n=(e=l==null?void 0:l[o])==null?void 0:e[1])!=null?n:null;if(s==null&&a!==1)return console.warn(`Tried to add a material alpha bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${o} but the material or the type does not support alpha.`),null;if(s==null)return null;let u=r[s],d=a-u;return{propertyName:s,initialValue:u,deltaValue:d}}_getPropertyNameMap(){var e,n;return(n=(e=Object.entries(Xn._propertyNameMapMap).find(([i])=>this.material[i]===!0))==null?void 0:e[1])!=null?n:null}};jn._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var Mt=jn,_e=class{constructor({primitives:t,index:e,weight:n}){this.primitives=t,this.index=e,this.weight=n}applyWeight(t){this.primitives.forEach(e=>{var n;((n=e.morphTargetInfluences)==null?void 0:n[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*t)})}clearAppliedWeight(){this.primitives.forEach(t=>{var e;((e=t.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(t.morphTargetInfluences[this.index]=0)})}},Ln=new Qn.Vector2,Yn=class qn{constructor({material:e,scale:n,offset:i}){var r,o;this.material=e,this.scale=n,this.offset=i;let a=(r=Object.entries(qn._propertyNamesMap).find(([l])=>e[l]===!0))==null?void 0:r[1];a==null?(console.warn(`Tried to add a texture transform bind to the material ${(o=e.name)!=null?o:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],a.forEach(l=>{var s;let u=(s=e[l])==null?void 0:s.clone();if(!u)return null;e[l]=u;let d=u.offset.clone(),h=u.repeat.clone(),p=i.clone().sub(d),m=n.clone().sub(h);this._properties.push({name:l,initialOffset:d,deltaOffset:p,initialScale:h,deltaScale:m})}))}applyWeight(e){this._properties.forEach(n=>{let i=this.material[n.name];i!==void 0&&(i.offset.add(Ln.copy(n.deltaOffset).multiplyScalar(e)),i.repeat.add(Ln.copy(n.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{let n=this.material[e.name];n!==void 0&&(n.offset.copy(e.initialOffset),n.repeat.copy(e.initialScale))})}};Yn._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var Rt=Yn,Vr=new Set(["1.0","1.0-beta"]),$n=class Zn{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return w(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return w(this,null,function*(){let n=yield this._v1Import(e);if(n)return n;let i=yield this._v0Import(e);return i||null})}_v1Import(e){return w(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let a=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!a)return null;let l=a.specVersion;if(!Vr.has(l))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let s=a.expressions;if(!s)return null;let u=new Set(Object.values(je)),d=new Map;s.preset!=null&&Object.entries(s.preset).forEach(([p,m])=>{if(m!=null){if(!u.has(p)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${p}" detected. Ignoring the expression`);return}d.set(p,m)}}),s.custom!=null&&Object.entries(s.custom).forEach(([p,m])=>{if(u.has(p)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${p}". Ignoring the expression`);return}d.set(p,m)});let h=new Et;return yield Promise.all(Array.from(d.entries()).map(p=>w(this,[p],function*([m,c]){var f,g,v,P,y,_,E;let M=new vt(m);if(e.scene.add(M),M.isBinary=(f=c.isBinary)!=null?f:!1,M.overrideBlink=(g=c.overrideBlink)!=null?g:"none",M.overrideLookAt=(v=c.overrideLookAt)!=null?v:"none",M.overrideMouth=(P=c.overrideMouth)!=null?P:"none",(y=c.morphTargetBinds)==null||y.forEach(T=>w(this,null,function*(){var x;if(T.node===void 0||T.index===void 0)return;let L=yield Pn(e,T.node),b=T.index;if(!L.every(A=>Array.isArray(A.morphTargetInfluences)&&b<A.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${c.name} attempts to index morph #${b} but not found.`);return}M.addBind(new _e({primitives:L,index:b,weight:(x=T.weight)!=null?x:1}))})),c.materialColorBinds||c.textureTransformBinds){let T=[];e.scene.traverse(x=>{let L=x.material;L&&(Array.isArray(L)?T.push(...L):T.push(L))}),(_=c.materialColorBinds)==null||_.forEach(x=>w(this,null,function*(){T.filter(b=>{var A;let H=(A=this.parser.associations.get(b))==null?void 0:A.materials;return x.material===H}).forEach(b=>{M.addBind(new Mt({material:b,type:x.type,targetValue:new ee.Color().fromArray(x.targetValue),targetAlpha:x.targetValue[3]}))})})),(E=c.textureTransformBinds)==null||E.forEach(x=>w(this,null,function*(){T.filter(b=>{var A;let H=(A=this.parser.associations.get(b))==null?void 0:A.materials;return x.material===H}).forEach(b=>{var A,H;M.addBind(new Rt({material:b,offset:new ee.Vector2().fromArray((A=x.offset)!=null?A:[0,0]),scale:new ee.Vector2().fromArray((H=x.scale)!=null?H:[1,1])}))})}))}h.registerExpression(M)}))),h})}_v0Import(e){return w(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let o=r.blendShapeMaster;if(!o)return null;let a=new Et,l=o.blendShapeGroups;if(!l)return a;let s=new Set;return yield Promise.all(l.map(u=>w(this,null,function*(){var d;let h=u.presetName,p=h!=null&&Zn.v0v1PresetNameMap[h]||null,m=p!=null?p:u.name;if(m==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(s.has(m)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}s.add(m);let c=new vt(m);e.scene.add(c),c.isBinary=(d=u.isBinary)!=null?d:!1,u.binds&&u.binds.forEach(g=>w(this,null,function*(){var v;if(g.mesh===void 0||g.index===void 0)return;let P=[];(v=i.nodes)==null||v.forEach((_,E)=>{_.mesh===g.mesh&&P.push(E)});let y=g.index;yield Promise.all(P.map(_=>w(this,null,function*(){var E;let M=yield Pn(e,_);if(!M.every(T=>Array.isArray(T.morphTargetInfluences)&&y<T.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${u.name} attempts to index ${y}th morph but not found.`);return}c.addBind(new _e({primitives:M,index:y,weight:.01*((E=g.weight)!=null?E:100)}))})))}));let f=u.materialValues;f&&f.length!==0&&f.forEach(g=>{if(g.materialName===void 0||g.propertyName===void 0||g.targetValue===void 0)return;let v=[];e.scene.traverse(y=>{if(y.material){let _=y.material;Array.isArray(_)?v.push(..._.filter(E=>(E.name===g.materialName||E.name===g.materialName+" (Outline)")&&v.indexOf(E)===-1)):_.name===g.materialName&&v.indexOf(_)===-1&&v.push(_)}});let P=g.propertyName;v.forEach(y=>{if(P==="_MainTex_ST"){let E=new ee.Vector2(g.targetValue[0],g.targetValue[1]),M=new ee.Vector2(g.targetValue[2],g.targetValue[3]);M.y=1-M.y-E.y,c.addBind(new Rt({material:y,scale:E,offset:M}));return}let _=Hr[P];if(_){c.addBind(new Mt({material:y,type:_,targetValue:new ee.Color().fromArray(g.targetValue),targetAlpha:g.targetValue[3]}));return}console.warn(P+" is not supported")})}),a.registerExpression(c)}))),a})}};$n.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var Qe=$n,Cr={None:"none",Block:"block",Blend:"blend"},bt=class ge{constructor(e,n){this._firstPersonOnlyLayer=ge.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=ge.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=n}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(n=>({meshes:n.meshes.concat(),type:n.type})),this}clone(){return new ge(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=ge.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:n=ge.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=n,this.meshAnnotations.forEach(i=>{i.meshes.forEach(r=>{i.type==="firstPersonOnly"?(r.layers.set(this._firstPersonOnlyLayer),r.traverse(o=>o.layers.set(this._firstPersonOnlyLayer))):i.type==="thirdPersonOnly"?(r.layers.set(this._thirdPersonOnlyLayer),r.traverse(o=>o.layers.set(this._thirdPersonOnlyLayer))):i.type==="auto"&&this._createHeadlessModel(r)})}),this._initializedLayers=!0)}_excludeTriangles(e,n,i,r){let o=0;if(n!=null&&n.length>0)for(let a=0;a<e.length;a+=3){let l=e[a],s=e[a+1],u=e[a+2],d=n[l],h=i[l];if(d[0]>0&&r.includes(h[0])||d[1]>0&&r.includes(h[1])||d[2]>0&&r.includes(h[2])||d[3]>0&&r.includes(h[3]))continue;let p=n[s],m=i[s];if(p[0]>0&&r.includes(m[0])||p[1]>0&&r.includes(m[1])||p[2]>0&&r.includes(m[2])||p[3]>0&&r.includes(m[3]))continue;let c=n[u],f=i[u];c[0]>0&&r.includes(f[0])||c[1]>0&&r.includes(f[1])||c[2]>0&&r.includes(f[2])||c[3]>0&&r.includes(f[3])||(e[o++]=l,e[o++]=s,e[o++]=u)}return o}_createErasedMesh(e,n){let i=new F.SkinnedMesh(e.geometry.clone(),e.material);i.name=`${e.name}(erase)`,i.frustumCulled=e.frustumCulled,i.layers.set(this._firstPersonOnlyLayer);let r=i.geometry,o=r.getAttribute("skinIndex"),a=o instanceof F.GLBufferAttribute?[]:o.array,l=[];for(let f=0;f<a.length;f+=4)l.push([a[f],a[f+1],a[f+2],a[f+3]]);let s=r.getAttribute("skinWeight"),u=s instanceof F.GLBufferAttribute?[]:s.array,d=[];for(let f=0;f<u.length;f+=4)d.push([u[f],u[f+1],u[f+2],u[f+3]]);let h=r.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");let p=Array.from(h.array),m=this._excludeTriangles(p,d,l,n),c=[];for(let f=0;f<m;f++)c[f]=p[f];return r.setIndex(c),e.onBeforeRender&&(i.onBeforeRender=e.onBeforeRender),i.bind(new F.Skeleton(e.skeleton.bones,e.skeleton.boneInverses),new F.Matrix4),i}_createHeadlessModelForSkinnedMesh(e,n){let i=[];if(n.skeleton.bones.forEach((o,a)=>{this._isEraseTarget(o)&&i.push(a)}),!i.length){n.layers.enable(this._thirdPersonOnlyLayer),n.layers.enable(this._firstPersonOnlyLayer);return}n.layers.set(this._thirdPersonOnlyLayer);let r=this._createErasedMesh(n,i);e.add(r)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer));else{let n=new F.Group;n.name=`_headless_${e.name}`,n.layers.set(this._firstPersonOnlyLayer),e.parent.add(n),e.children.filter(i=>i.type==="SkinnedMesh").forEach(i=>{let r=i;this._createHeadlessModelForSkinnedMesh(n,r)})}else if(e.type==="SkinnedMesh"){let n=e;this._createHeadlessModelForSkinnedMesh(e.parent,n)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};bt.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;bt.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var Tt=bt,Ur=new Set(["1.0","1.0-beta"]),Ye=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(t){this.parser=t}afterRoot(t){return w(this,null,function*(){let e=t.userData.vrmHumanoid;if(e!==null){if(e===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");t.userData.vrmFirstPerson=yield this._import(t,e)}})}_import(t,e){return w(this,null,function*(){if(e==null)return null;let n=yield this._v1Import(t,e);if(n)return n;let i=yield this._v0Import(t,e);return i||null})}_v1Import(t,e){return w(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let a=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!a)return null;let l=a.specVersion;if(!Ur.has(l))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let s=a.firstPerson,u=[],d=yield An(t);return Array.from(d.entries()).forEach(([h,p])=>{var m,c;let f=(m=s==null?void 0:s.meshAnnotations)==null?void 0:m.find(g=>g.node===h);u.push({meshes:p,type:(c=f==null?void 0:f.type)!=null?c:"auto"})}),new Tt(e,u)})}_v0Import(t,e){return w(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let o=r.firstPerson;if(!o)return null;let a=[],l=yield An(t);return Array.from(l.entries()).forEach(([s,u])=>{let d=i.nodes[s],h=o.meshAnnotations?o.meshAnnotations.find(p=>p.mesh===d.mesh):void 0;a.push({meshes:u,type:this._convertV0FlagToV1Type(h==null?void 0:h.firstPersonFlag)})}),new Tt(e,a)})}_convertV0FlagToV1Type(t){return t==="FirstPersonOnly"?"firstPersonOnly":t==="ThirdPersonOnly"?"thirdPersonOnly":t==="Both"?"both":"auto"}},Or={Auto:"auto",Both:"both",ThirdPersonOnly:"thirdPersonOnly",FirstPersonOnly:"firstPersonOnly"},bn=new $.Vector3,Hn=new $.Vector3,Nr=new $.Quaternion,xt=class extends $.Group{constructor(t){super(),this.vrmHumanoid=t,this._boneAxesMap=new Map,Object.values(t.humanBones).forEach(e=>{let n=new $.AxesHelper(1);n.matrixAutoUpdate=!1,n.material.depthTest=!1,n.material.depthWrite=!1,this.add(n),this._boneAxesMap.set(e,n)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(t=>{t.geometry.dispose(),t.material.dispose()})}updateMatrixWorld(t){Array.from(this._boneAxesMap.entries()).forEach(([e,n])=>{e.node.updateWorldMatrix(!0,!1),e.node.matrixWorld.decompose(bn,Nr,Hn);let i=bn.set(.1,.1,.1).divide(Hn);n.matrix.copy(e.node.matrixWorld).scale(i)}),super.updateMatrixWorld(t)}},ze=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"],Br={Hips:"hips",Spine:"spine",Chest:"chest",UpperChest:"upperChest",Neck:"neck",Head:"head",LeftEye:"leftEye",RightEye:"rightEye",Jaw:"jaw",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",LeftToes:"leftToes",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",RightToes:"rightToes",LeftShoulder:"leftShoulder",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightShoulder:"rightShoulder",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand",LeftThumbMetacarpal:"leftThumbMetacarpal",LeftThumbProximal:"leftThumbProximal",LeftThumbDistal:"leftThumbDistal",LeftIndexProximal:"leftIndexProximal",LeftIndexIntermediate:"leftIndexIntermediate",LeftIndexDistal:"leftIndexDistal",LeftMiddleProximal:"leftMiddleProximal",LeftMiddleIntermediate:"leftMiddleIntermediate",LeftMiddleDistal:"leftMiddleDistal",LeftRingProximal:"leftRingProximal",LeftRingIntermediate:"leftRingIntermediate",LeftRingDistal:"leftRingDistal",LeftLittleProximal:"leftLittleProximal",LeftLittleIntermediate:"leftLittleIntermediate",LeftLittleDistal:"leftLittleDistal",RightThumbMetacarpal:"rightThumbMetacarpal",RightThumbProximal:"rightThumbProximal",RightThumbDistal:"rightThumbDistal",RightIndexProximal:"rightIndexProximal",RightIndexIntermediate:"rightIndexIntermediate",RightIndexDistal:"rightIndexDistal",RightMiddleProximal:"rightMiddleProximal",RightMiddleIntermediate:"rightMiddleIntermediate",RightMiddleDistal:"rightMiddleDistal",RightRingProximal:"rightRingProximal",RightRingIntermediate:"rightRingIntermediate",RightRingDistal:"rightRingDistal",RightLittleProximal:"rightLittleProximal",RightLittleIntermediate:"rightLittleIntermediate",RightLittleDistal:"rightLittleDistal"},Jn={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function Kn(t){return t.invert?t.invert():t.inverse(),t}var ae=new qe.Vector3,le=new qe.Quaternion,yt=class{constructor(t){this.humanBones=t,this.restPose=this.getAbsolutePose()}getAbsolutePose(){let t={};return Object.keys(this.humanBones).forEach(e=>{let n=e,i=this.getBoneNode(n);i&&(ae.copy(i.position),le.copy(i.quaternion),t[n]={position:ae.toArray(),rotation:le.toArray()})}),t}getPose(){let t={};return Object.keys(this.humanBones).forEach(e=>{let n=e,i=this.getBoneNode(n);if(!i)return;ae.set(0,0,0),le.identity();let r=this.restPose[n];r!=null&&r.position&&ae.fromArray(r.position).negate(),r!=null&&r.rotation&&Kn(le.fromArray(r.rotation)),ae.add(i.position),le.premultiply(i.quaternion),t[n]={position:ae.toArray(),rotation:le.toArray()}}),t}setPose(t){Object.entries(t).forEach(([e,n])=>{let i=e,r=this.getBoneNode(i);if(!r)return;let o=this.restPose[i];o&&(n!=null&&n.position&&(r.position.fromArray(n.position),o.position&&r.position.add(ae.fromArray(o.position))),n!=null&&n.rotation&&(r.quaternion.fromArray(n.rotation),o.rotation&&r.quaternion.multiply(le.fromArray(o.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([t,e])=>{let n=this.getBoneNode(t);n&&(e!=null&&e.position&&n.position.fromArray(e.position),e!=null&&e.rotation&&n.quaternion.fromArray(e.rotation))})}getBone(t){var e;return(e=this.humanBones[t])!=null?e:void 0}getBoneNode(t){var e,n;return(n=(e=this.humanBones[t])==null?void 0:e.node)!=null?n:null}},ft=new k.Vector3,Dr=new k.Quaternion,Fr=new k.Vector3,In=class ei extends yt{static _setupTransforms(e){let n=new k.Object3D;n.name="VRMHumanoidRig";let i={},r={},o={},a={};ze.forEach(s=>{var u;let d=e.getBoneNode(s);if(d){let h=new k.Vector3,p=new k.Quaternion;d.updateWorldMatrix(!0,!1),d.matrixWorld.decompose(h,p,ft),i[s]=h,r[s]=p,o[s]=d.quaternion.clone();let m=new k.Quaternion;(u=d.parent)==null||u.matrixWorld.decompose(ft,m,ft),a[s]=m}});let l={};return ze.forEach(s=>{var u;let d=e.getBoneNode(s);if(d){let h=i[s],p=s,m;for(;m==null&&(p=Jn[p],p!=null);)m=i[p];let c=new k.Object3D;c.name="Normalized_"+d.name,(p?(u=l[p])==null?void 0:u.node:n).add(c),c.position.copy(h),m&&c.position.sub(m),l[s]={node:c}}}),{rigBones:l,root:n,parentWorldRotations:a,boneRotations:o}}constructor(e){let{rigBones:n,root:i,parentWorldRotations:r,boneRotations:o}=ei._setupTransforms(e);super(n),this.original=e,this.root=i,this._parentWorldRotations=r,this._boneRotations=o}update(){ze.forEach(e=>{let n=this.original.getBoneNode(e);if(n!=null){let i=this.getBoneNode(e),r=this._parentWorldRotations[e],o=Dr.copy(r).invert(),a=this._boneRotations[e];if(n.quaternion.copy(i.quaternion).multiply(r).premultiply(o).multiply(a),e==="hips"){let l=i.getWorldPosition(Fr);n.parent.updateWorldMatrix(!0,!1);let s=n.parent.matrixWorld,u=l.applyMatrix4(s.invert());n.position.copy(u)}}})}},wt=class ti{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,n){var i;this.autoUpdateHumanBones=(i=n==null?void 0:n.autoUpdateHumanBones)!=null?i:!0,this._rawHumanBones=new yt(e),this._normalizedHumanBones=new In(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new yt(e.humanBones),this._normalizedHumanBones=new In(this._rawHumanBones),this}clone(){return new ti(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},ni={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},kr=new Set(["1.0","1.0-beta"]),Vn={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},$e=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(t,e){this.parser=t,this.helperRoot=e==null?void 0:e.helperRoot,this.autoUpdateHumanBones=e==null?void 0:e.autoUpdateHumanBones}afterRoot(t){return w(this,null,function*(){t.userData.vrmHumanoid=yield this._import(t)})}_import(t){return w(this,null,function*(){let e=yield this._v1Import(t);if(e)return e;let n=yield this._v0Import(t);return n||null})}_v1Import(t){return w(this,null,function*(){var e,n;let i=this.parser.json;if(!(((e=i.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;let a=o.specVersion;if(!kr.has(a))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${a}"`),null;let l=o.humanoid;if(!l)return null;let s=l.humanBones.leftThumbIntermediate!=null||l.humanBones.rightThumbIntermediate!=null,u={};l.humanBones!=null&&(yield Promise.all(Object.entries(l.humanBones).map(h=>w(this,[h],function*([p,m]){let c=p,f=m.node;if(s){let v=Vn[c];v!=null&&(c=v)}let g=yield this.parser.getDependency("node",f);if(g==null){console.warn(`A glTF node bound to the humanoid bone ${c} (index = ${f}) does not exist`);return}u[c]={node:g}}))));let d=new wt(this._ensureRequiredBonesExist(u),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(t.scene.add(d.normalizedHumanBonesRoot),this.helperRoot){let h=new xt(d);this.helperRoot.add(h),h.renderOrder=this.helperRoot.renderOrder}return d})}_v0Import(t){return w(this,null,function*(){var e;let i=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!i)return null;let r=i.humanoid;if(!r)return null;let o={};r.humanBones!=null&&(yield Promise.all(r.humanBones.map(l=>w(this,null,function*(){let s=l.bone,u=l.node;if(s==null||u==null)return;let d=yield this.parser.getDependency("node",u);if(d==null){console.warn(`A glTF node bound to the humanoid bone ${s} (index = ${u}) does not exist`);return}let h=Vn[s],p=h!=null?h:s;if(o[p]!=null){console.warn(`Multiple bone entries for ${p} detected (index = ${u}), ignoring duplicated entries.`);return}o[p]={node:d}}))));let a=new wt(this._ensureRequiredBonesExist(o),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(t.scene.add(a.normalizedHumanBonesRoot),this.helperRoot){let l=new xt(a);this.helperRoot.add(l),l.renderOrder=this.helperRoot.renderOrder}return a})}_ensureRequiredBonesExist(t){let e=Object.values(ni).filter(n=>t[n]==null);if(e.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${e.join(", ")}`);return t}},Cn=class extends Le.BufferGeometry{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new Le.BufferAttribute(new Float32Array(65*3),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Le.BufferAttribute(new Uint16Array(3*63),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,t=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,t=!0),t&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let t=0;t<64;t++){let e=t/63*this._currentTheta;this._attrPos.setXYZ(t+1,this._currentRadius*Math.sin(e),0,this._currentRadius*Math.cos(e))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<63;t++)this._attrIndex.setXYZ(t*3,0,t+1,t+2);this._attrIndex.needsUpdate=!0}},Wr=class extends te.BufferGeometry{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new te.Vector3,this._currentTail=new te.Vector3,this._attrPos=new te.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new te.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,t=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},ke=new I.Quaternion,Un=new I.Quaternion,Pe=new I.Vector3,On=new I.Vector3,Nn=Math.sqrt(2)/2,zr=new I.Quaternion(0,0,-Nn,Nn),Gr=new I.Vector3(0,1,0),ii=class extends I.Group{constructor(t){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=t;{let e=new Cn;e.radius=.5;let n=new I.MeshBasicMaterial({color:65280,transparent:!0,opacity:.5,side:I.DoubleSide,depthTest:!1,depthWrite:!1});this._meshPitch=new I.Mesh(e,n),this.add(this._meshPitch)}{let e=new Cn;e.radius=.5;let n=new I.MeshBasicMaterial({color:16711680,transparent:!0,opacity:.5,side:I.DoubleSide,depthTest:!1,depthWrite:!1});this._meshYaw=new I.Mesh(e,n),this.add(this._meshYaw)}{let e=new Wr;e.radius=.1;let n=new I.LineBasicMaterial({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new I.LineSegments(e,n),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(t){let e=I.MathUtils.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=e,this._meshYaw.geometry.update();let n=I.MathUtils.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=n,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(Pe),this.vrmLookAt.getLookAtWorldQuaternion(ke),ke.multiply(this.vrmLookAt.getFaceFrontQuaternion(Un)),this._meshYaw.position.copy(Pe),this._meshYaw.quaternion.copy(ke),this._meshPitch.position.copy(Pe),this._meshPitch.quaternion.copy(ke),this._meshPitch.quaternion.multiply(Un.setFromAxisAngle(Gr,e)),this._meshPitch.quaternion.multiply(zr);let{target:i,autoUpdate:r}=this.vrmLookAt;i!=null&&r&&(i.getWorldPosition(On).sub(Pe),this._lineTarget.geometry.tail.copy(On),this._lineTarget.geometry.update(),this._lineTarget.position.copy(Pe)),super.updateMatrixWorld(t)}},jr=new Ht.Vector3,Xr=new Ht.Vector3;function St(t,e){return t.matrixWorld.decompose(jr,e,Xr),e}function Ge(t){return[Math.atan2(-t.z,t.x),Math.atan2(t.y,Math.sqrt(t.x*t.x+t.z*t.z))]}function Bn(t){let e=Math.round(t/2/Math.PI);return t-2*Math.PI*e}var Dn=new C.Vector3(0,0,1),Qr=new C.Vector3,Yr=new C.Vector3,qr=new C.Vector3,$r=new C.Quaternion,gt=new C.Quaternion,Fn=new C.Quaternion,Zr=new C.Quaternion,_t=new C.Euler,ri=class oi{constructor(e,n){this.offsetFromHeadBone=new C.Vector3,this.autoUpdate=!0,this.faceFront=new C.Vector3(0,0,1),this.humanoid=e,this.applier=n,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new C.Quaternion)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new C.Euler)}getEuler(e){return e.set(C.MathUtils.DEG2RAD*this._pitch,C.MathUtils.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new oi(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){let n=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(n.matrixWorld)}getLookAtWorldQuaternion(e){let n=this.humanoid.getRawBoneNode("head");return St(n,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(Dn)<.01)return e.copy(this._restHeadWorldQuaternion).invert();let[n,i]=Ge(this.faceFront);return _t.set(0,.5*Math.PI+n,i,"YZX"),e.setFromEuler(_t).premultiply(Zr.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(gt),this.getFaceFrontQuaternion(Fn),e.copy(Dn).applyQuaternion(gt).applyQuaternion(Fn).applyEuler(this.getEuler(_t))}lookAt(e){let n=$r.copy(this._restHeadWorldQuaternion).multiply(Kn(this.getLookAtWorldQuaternion(gt))),i=this.getLookAtWorldPosition(Yr),r=qr.copy(e).sub(i).applyQuaternion(n).normalize(),[o,a]=Ge(this.faceFront),[l,s]=Ge(r),u=Bn(l-o),d=Bn(a-s);this._yaw=C.MathUtils.RAD2DEG*u,this._pitch=C.MathUtils.RAD2DEG*d,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(Qr)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};ri.EULER_ORDER="YXZ";var si=ri,Jr=new V.Vector3(0,0,1),j=new V.Quaternion,me=new V.Quaternion,B=new V.Euler(0,0,0,"YXZ"),Ae=class{constructor(t,e,n,i,r){this.humanoid=t,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r,this.faceFront=new V.Vector3(0,0,1),this._restQuatLeftEye=new V.Quaternion,this._restQuatRightEye=new V.Quaternion,this._restLeftEyeParentWorldQuat=new V.Quaternion,this._restRightEyeParentWorldQuat=new V.Quaternion;let o=this.humanoid.getRawBoneNode("leftEye"),a=this.humanoid.getRawBoneNode("rightEye");o&&(this._restQuatLeftEye.copy(o.quaternion),St(o.parent,this._restLeftEyeParentWorldQuat)),a&&(this._restQuatRightEye.copy(a.quaternion),St(a.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(t,e){let n=this.humanoid.getRawBoneNode("leftEye"),i=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),o=this.humanoid.getNormalizedBoneNode("rightEye");n&&(e<0?B.x=-V.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-e):B.x=V.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(e),t<0?B.y=-V.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(-t):B.y=V.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(t),j.setFromEuler(B),this._getWorldFaceFrontQuat(me),r.quaternion.copy(me).multiply(j).multiply(me.invert()),j.copy(this._restLeftEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(j).premultiply(j.invert()).multiply(this._restQuatLeftEye)),i&&(e<0?B.x=-V.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-e):B.x=V.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(e),t<0?B.y=-V.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(-t):B.y=V.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(t),j.setFromEuler(B),this._getWorldFaceFrontQuat(me),o.quaternion.copy(me).multiply(j).multiply(me.invert()),j.copy(this._restRightEyeParentWorldQuat),i.quaternion.copy(o.quaternion).multiply(j).premultiply(j.invert()).multiply(this._restQuatRightEye))}lookAt(t){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=V.MathUtils.RAD2DEG*t.y,n=V.MathUtils.RAD2DEG*t.x;this.applyYawPitch(e,n)}_getWorldFaceFrontQuat(t){if(this.faceFront.distanceToSquared(Jr)<.01)return t.identity();let[e,n]=Ge(this.faceFront);return B.set(0,.5*Math.PI+e,n,"YZX"),t.setFromEuler(B)}};Ae.type="bone";var Xe=class{constructor(t,e,n,i,r){this.expressions=t,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r}applyYawPitch(t,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),t<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-t))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(t)))}lookAt(t){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=Pt.MathUtils.RAD2DEG*t.y,n=Pt.MathUtils.RAD2DEG*t.x;this.applyYawPitch(e,n)}};Xe.type="expression";var At=class{constructor(t,e){this.inputMaxValue=t,this.outputScale=e}map(t){return this.outputScale*zn(t/this.inputMaxValue)}},Kr=new Set(["1.0","1.0-beta"]),We=.01,Ze=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(t,e){this.parser=t,this.helperRoot=e==null?void 0:e.helperRoot}afterRoot(t){return w(this,null,function*(){let e=t.userData.vrmHumanoid;if(e===null)return;if(e===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");let n=t.userData.vrmExpressionManager;if(n!==null){if(n===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");t.userData.vrmLookAt=yield this._import(t,e,n)}})}_import(t,e,n){return w(this,null,function*(){if(e==null||n==null)return null;let i=yield this._v1Import(t,e,n);if(i)return i;let r=yield this._v0Import(t,e,n);return r||null})}_v1Import(t,e,n){return w(this,null,function*(){var i,r,o;let a=this.parser.json;if(!(((i=a.extensionsUsed)==null?void 0:i.indexOf("VRMC_vrm"))!==-1))return null;let s=(r=a.extensions)==null?void 0:r.VRMC_vrm;if(!s)return null;let u=s.specVersion;if(!Kr.has(u))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${u}"`),null;let d=s.lookAt;if(!d)return null;let h=d.type==="expression"?1:10,p=this._v1ImportRangeMap(d.rangeMapHorizontalInner,h),m=this._v1ImportRangeMap(d.rangeMapHorizontalOuter,h),c=this._v1ImportRangeMap(d.rangeMapVerticalDown,h),f=this._v1ImportRangeMap(d.rangeMapVerticalUp,h),g;d.type==="expression"?g=new Xe(n,p,m,c,f):g=new Ae(e,p,m,c,f);let v=this._importLookAt(e,g);return v.offsetFromHeadBone.fromArray((o=d.offsetFromHeadBone)!=null?o:[0,.06,0]),v})}_v1ImportRangeMap(t,e){var n,i;let r=(n=t==null?void 0:t.inputMaxValue)!=null?n:90,o=(i=t==null?void 0:t.outputScale)!=null?i:e;return r<We&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),r=We),new At(r,o)}_v0Import(t,e,n){return w(this,null,function*(){var i,r,o,a;let s=(i=this.parser.json.extensions)==null?void 0:i.VRM;if(!s)return null;let u=s.firstPerson;if(!u)return null;let d=u.lookAtTypeName==="BlendShape"?1:10,h=this._v0ImportDegreeMap(u.lookAtHorizontalInner,d),p=this._v0ImportDegreeMap(u.lookAtHorizontalOuter,d),m=this._v0ImportDegreeMap(u.lookAtVerticalDown,d),c=this._v0ImportDegreeMap(u.lookAtVerticalUp,d),f;u.lookAtTypeName==="BlendShape"?f=new Xe(n,h,p,m,c):f=new Ae(e,h,p,m,c);let g=this._importLookAt(e,f);return u.firstPersonBoneOffset?g.offsetFromHeadBone.set((r=u.firstPersonBoneOffset.x)!=null?r:0,(o=u.firstPersonBoneOffset.y)!=null?o:.06,-((a=u.firstPersonBoneOffset.z)!=null?a:0)):g.offsetFromHeadBone.set(0,.06,0),g.faceFront.set(0,0,-1),f instanceof Ae&&f.faceFront.set(0,0,-1),g})}_v0ImportDegreeMap(t,e){var n,i;let r=t==null?void 0:t.curve;JSON.stringify(r)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let o=(n=t==null?void 0:t.xRange)!=null?n:90,a=(i=t==null?void 0:t.yRange)!=null?i:e;return o<We&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),o=We),new At(o,a)}_importLookAt(t,e){let n=new si(t,e);if(this.helperRoot){let i=new ii(n);this.helperRoot.add(i),i.renderOrder=this.helperRoot.renderOrder}return n}},eo={Bone:"bone",Expression:"expression"};function to(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}var no=new Set(["1.0","1.0-beta"]),Je=class{get name(){return"VRMMetaLoaderPlugin"}constructor(t,e){var n,i,r;this.parser=t,this.needThumbnailImage=(n=e==null?void 0:e.needThumbnailImage)!=null?n:!1,this.acceptLicenseUrls=(i=e==null?void 0:e.acceptLicenseUrls)!=null?i:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(r=e==null?void 0:e.acceptV0Meta)!=null?r:!0}afterRoot(t){return w(this,null,function*(){t.userData.vrmMeta=yield this._import(t)})}_import(t){return w(this,null,function*(){let e=yield this._v1Import(t);if(e!=null)return e;let n=yield this._v0Import(t);return n!=null?n:null})}_v1Import(t){return w(this,null,function*(){var e,n,i;let r=this.parser.json;if(!(((e=r.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let a=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(a==null)return null;let l=a.specVersion;if(!no.has(l))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let s=a.meta;if(!s)return null;let u=s.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(u))throw new Error(`VRMMetaLoaderPlugin: The license url "${u}" is not accepted`);let h;return this.needThumbnailImage&&s.thumbnailImage!=null&&(h=(i=yield this._extractGLTFImage(s.thumbnailImage))!=null?i:void 0),{metaVersion:"1",name:s.name,version:s.version,authors:s.authors,copyrightInformation:s.copyrightInformation,contactInformation:s.contactInformation,references:s.references,thirdPartyLicenses:s.thirdPartyLicenses,thumbnailImage:h,licenseUrl:s.licenseUrl,avatarPermission:s.avatarPermission,allowExcessivelyViolentUsage:s.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:s.allowExcessivelySexualUsage,commercialUsage:s.commercialUsage,allowPoliticalOrReligiousUsage:s.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:s.allowAntisocialOrHateUsage,creditNotation:s.creditNotation,allowRedistribution:s.allowRedistribution,modification:s.modification,otherLicenseUrl:s.otherLicenseUrl}})}_v0Import(t){return w(this,null,function*(){var e;let i=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!i)return null;let r=i.meta;if(!r)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let o;return this.needThumbnailImage&&r.texture!=null&&r.texture!==-1&&(o=yield this.parser.getDependency("texture",r.texture)),{metaVersion:"0",allowedUserName:r.allowedUserName,author:r.author,commercialUssageName:r.commercialUssageName,contactInformation:r.contactInformation,licenseName:r.licenseName,otherLicenseUrl:r.otherLicenseUrl,otherPermissionUrl:r.otherPermissionUrl,reference:r.reference,sexualUssageName:r.sexualUssageName,texture:o!=null?o:void 0,title:r.title,version:r.version,violentUssageName:r.violentUssageName}})}_extractGLTFImage(t){return w(this,null,function*(){var e;let i=(e=this.parser.json.images)==null?void 0:e[t];if(i==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${t}] of glTF as a thumbnail but the image doesn't exist`),null;let r=i.uri;if(i.bufferView!=null){let a=yield this.parser.getDependency("bufferView",i.bufferView),l=new Blob([a],{type:i.mimeType});r=URL.createObjectURL(l)}return r==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${t}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new ai.ImageLoader().loadAsync(to(r,this.parser.options.path)).catch(a=>(console.error(a),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},Ke=class{constructor(t){this.scene=t.scene,this.meta=t.meta,this.humanoid=t.humanoid,this.expressionManager=t.expressionManager,this.firstPerson=t.firstPerson,this.lookAt=t.lookAt}update(t){this.humanoid.update(),this.lookAt&&this.lookAt.update(t),this.expressionManager&&this.expressionManager.update()}},io=class{get name(){return"VRMC_vrm"}constructor(t,e){var n,i,r,o,a;this.parser=t;let l=e==null?void 0:e.helperRoot,s=e==null?void 0:e.autoUpdateHumanBones;this.expressionPlugin=(n=e==null?void 0:e.expressionPlugin)!=null?n:new Qe(t),this.firstPersonPlugin=(i=e==null?void 0:e.firstPersonPlugin)!=null?i:new Ye(t),this.humanoidPlugin=(r=e==null?void 0:e.humanoidPlugin)!=null?r:new $e(t,{helperRoot:l,autoUpdateHumanBones:s}),this.lookAtPlugin=(o=e==null?void 0:e.lookAtPlugin)!=null?o:new Ze(t,{helperRoot:l}),this.metaPlugin=(a=e==null?void 0:e.metaPlugin)!=null?a:new Je(t)}afterRoot(t){return w(this,null,function*(){yield this.metaPlugin.afterRoot(t),yield this.humanoidPlugin.afterRoot(t),yield this.expressionPlugin.afterRoot(t),yield this.lookAtPlugin.afterRoot(t),yield this.firstPersonPlugin.afterRoot(t);let e=t.userData.vrmMeta,n=t.userData.vrmHumanoid;if(e&&n){let i=new Ke({scene:t.scene,expressionManager:t.userData.vrmExpressionManager,firstPerson:t.userData.vrmFirstPerson,humanoid:n,lookAt:t.userData.vrmLookAt,meta:e});t.userData.vrmCore=i}})}};var ve=class extends Ke{constructor(e){super(e),this.materials=e.materials,this.springBoneManager=e.springBoneManager,this.nodeConstraintManager=e.nodeConstraintManager}update(e){super.update(e),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(e),this.materials&&this.materials.forEach(n=>{n.update&&n.update(e)})}};var tt=R(require("three"),1),hi=R(require("three"),1),ci=R(require("three"),1),S=R(require("three"),1),mi=R(require("three"),1);var ro=Object.defineProperty,li=Object.getOwnPropertySymbols,oo=Object.prototype.hasOwnProperty,so=Object.prototype.propertyIsEnumerable,ui=(t,e,n)=>e in t?ro(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,di=(t,e)=>{for(var n in e||(e={}))oo.call(e,n)&&ui(t,n,e[n]);if(li)for(var n of li(e))so.call(e,n)&&ui(t,n,e[n]);return t},ue=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())}),ao={"":3e3,srgb:3001};function lo(t,e){parseInt(ci.REVISION,10)>=152?t.colorSpace=e:t.encoding=ao[e]}var uo=class{get pending(){return Promise.all(this._pendings)}constructor(t,e){this._parser=t,this._materialParams=e,this._pendings=[]}assignPrimitive(t,e){e!=null&&(this._materialParams[t]=e)}assignColor(t,e,n){e!=null&&(this._materialParams[t]=new hi.Color().fromArray(e),n&&this._materialParams[t].convertSRGBToLinear())}assignTexture(t,e,n){return ue(this,null,function*(){let i=ue(this,null,function*(){e!=null&&(yield this._parser.assignTexture(this._materialParams,t,e),n&&lo(this._materialParams[t],"srgb"))});return this._pendings.push(i),i})}assignTextureByIndex(t,e,n){return ue(this,null,function*(){return this.assignTexture(t,e!=null?{index:e}:void 0,n)})}},ho=`// #define PHONG

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

  #ifdef OUTLINE
    float worldNormalLength = length( transformedNormal );
    vec3 outlineOffset = outlineWidthFactor * worldNormalLength * objectNormal;

    #ifdef USE_OUTLINEWIDTHMULTIPLYTEXTURE
      vec2 outlineWidthMultiplyTextureUv = ( outlineWidthMultiplyTextureUvTransform * vec3( vUv, 1 ) ).xy;
      float outlineTex = texture2D( outlineWidthMultiplyTexture, outlineWidthMultiplyTextureUv ).g;
      outlineOffset *= outlineTex;
    #endif

    #ifdef OUTLINE_WIDTH_SCREEN
      outlineOffset *= vViewPosition.z / projectionMatrix[ 1 ].y;
    #endif

    gl_Position = projectionMatrix * modelViewMatrix * vec4( outlineOffset + transformed, 1.0 );

    gl_Position.z += 1E-6 * gl_Position.w; // anti-artifact magic
  #endif

  #include <worldpos_vertex>
  // #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}`,co=`// #define PHONG

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
`,pi={None:"none",Normal:"normal",LitShadeRate:"litShadeRate",UV:"uv"},Vt={None:"none",WorldCoordinates:"worldCoordinates",ScreenCoordinates:"screenCoordinates"},po={3e3:"",3001:"srgb"};function It(t){return parseInt(mi.REVISION,10)>=152?t.colorSpace:po[t.encoding]}var fi=class extends S.ShaderMaterial{constructor(t={}){var e;super({vertexShader:ho,fragmentShader:co}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=S.TangentSpaceNormalMap,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=pi.None,this._outlineWidthMode=Vt.None,this._isOutline=!1,t.transparentWithZWrite&&(t.depthWrite=!0),delete t.transparentWithZWrite,t.fog=!0,t.lights=!0,t.clipping=!0,this.uniforms=S.UniformsUtils.merge([S.UniformsLib.common,S.UniformsLib.normalmap,S.UniformsLib.emissivemap,S.UniformsLib.fog,S.UniformsLib.lights,{litFactor:{value:new S.Color(1,1,1)},mapUvTransform:{value:new S.Matrix3},colorAlpha:{value:1},normalMapUvTransform:{value:new S.Matrix3},shadeColorFactor:{value:new S.Color(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new S.Matrix3},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new S.Matrix3},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new S.Color(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new S.Matrix3},parametricRimColorFactor:{value:new S.Color(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new S.Matrix3},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new S.Color(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new S.Matrix3},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new S.Matrix3},outlineWidthFactor:{value:0},outlineColorFactor:{value:new S.Color(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new S.Matrix3},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(e=t.uniforms)!=null?e:{}]),this.setValues(t),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([n,i])=>`${n}:${i}`),this.matcapTexture?`matcapTextureColorSpace:${It(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${It(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${It(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=n=>{let i=parseInt(S.REVISION,10),r=Object.entries(di(di({},this._generateDefines()),this.defines)).filter(([o,a])=>!!a).map(([o,a])=>`#define ${o} ${a}`).join(`
`)+`
`;n.vertexShader=r+n.vertexShader,n.fragmentShader=r+n.fragmentShader,i<154&&(n.fragmentShader=n.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(t){this.uniforms.litFactor.value=t}get map(){return this.uniforms.map.value}set map(t){this.uniforms.map.value=t}get normalMap(){return this.uniforms.normalMap.value}set normalMap(t){this.uniforms.normalMap.value=t}get normalScale(){return this.uniforms.normalScale.value}set normalScale(t){this.uniforms.normalScale.value=t}get emissive(){return this.uniforms.emissive.value}set emissive(t){this.uniforms.emissive.value=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(t){this.uniforms.emissiveIntensity.value=t}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(t){this.uniforms.emissiveMap.value=t}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(t){this.uniforms.shadeColorFactor.value=t}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(t){this.uniforms.shadeMultiplyTexture.value=t}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(t){this.uniforms.shadingShiftFactor.value=t}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(t){this.uniforms.shadingShiftTexture.value=t}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(t){this.uniforms.shadingShiftTextureScale.value=t}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(t){this.uniforms.shadingToonyFactor.value=t}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(t){this.uniforms.giEqualizationFactor.value=t}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(t){this.uniforms.matcapFactor.value=t}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(t){this.uniforms.matcapTexture.value=t}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(t){this.uniforms.parametricRimColorFactor.value=t}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(t){this.uniforms.rimMultiplyTexture.value=t}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(t){this.uniforms.rimLightingMixFactor.value=t}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(t){this.uniforms.parametricRimFresnelPowerFactor.value=t}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(t){this.uniforms.parametricRimLiftFactor.value=t}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(t){this.uniforms.outlineWidthMultiplyTexture.value=t}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(t){this.uniforms.outlineWidthFactor.value=t}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(t){this.uniforms.outlineColorFactor.value=t}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(t){this.uniforms.outlineLightingMixFactor.value=t}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(t){this.uniforms.uvAnimationMaskTexture.value=t}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(t){this.uniforms.uvAnimationScrollXOffset.value=t}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(t){this.uniforms.uvAnimationScrollYOffset.value=t}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(t){this.uniforms.uvAnimationRotationPhase.value=t}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(t){this._ignoreVertexColor=t,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(t){this._v0CompatShade=t,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(t){this._debugMode=t,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(t){this._outlineWidthMode=t,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(t){this._isOutline=t,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(t){this._uploadUniformsWorkaround(),this._updateUVAnimation(t)}copy(t){return super.copy(t),this.map=t.map,this.normalMap=t.normalMap,this.emissiveMap=t.emissiveMap,this.shadeMultiplyTexture=t.shadeMultiplyTexture,this.shadingShiftTexture=t.shadingShiftTexture,this.matcapTexture=t.matcapTexture,this.rimMultiplyTexture=t.rimMultiplyTexture,this.outlineWidthMultiplyTexture=t.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=t.uvAnimationMaskTexture,this.normalMapType=t.normalMapType,this.uvAnimationScrollXSpeedFactor=t.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=t.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=t.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=t.ignoreVertexColor,this.v0CompatShade=t.v0CompatShade,this.debugMode=t.debugMode,this.outlineWidthMode=t.outlineWidthMode,this.isOutline=t.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(t){this.uniforms.uvAnimationScrollXOffset.value+=t*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=t*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=t*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){let t=parseInt(S.REVISION,10),e=this.outlineWidthMultiplyTexture!==null,n=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:t,OUTLINE:this._isOutline,MTOON_USE_UV:e||n,MTOON_UVS_VERTEX_ONLY:e&&!n,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===Vt.ScreenCoordinates}}_updateTextureMatrix(t,e){t.value&&(t.value.matrixAutoUpdate&&t.value.updateMatrix(),e.value.copy(t.value.matrix))}},mo=new Set(["1.0","1.0-beta"]),gi=class et{get name(){return et.EXTENSION_NAME}constructor(e,n={}){var i,r,o,a;this.parser=e,this.materialType=(i=n.materialType)!=null?i:fi,this.renderOrderOffset=(r=n.renderOrderOffset)!=null?r:0,this.v0CompatShade=(o=n.v0CompatShade)!=null?o:!1,this.debugMode=(a=n.debugMode)!=null?a:"none",this._mToonMaterialSet=new Set}beforeRoot(){return ue(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return ue(this,null,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?this.materialType:null}extendMaterialParams(e,n){let i=this._getMToonExtension(e);return i?this._extendMaterialParams(i,n):null}loadMesh(e){return ue(this,null,function*(){var n;let i=this.parser,o=(n=i.json.meshes)==null?void 0:n[e];if(o==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);let a=o.primitives,l=yield i.loadMesh(e);if(a.length===1){let s=l,u=a[0].material;u!=null&&this._setupPrimitive(s,u)}else{let s=l;for(let u=0;u<a.length;u++){let d=s.children[u],h=a[u].material;h!=null&&this._setupPrimitive(d,h)}}return l})}_removeUnlitExtensionIfMToonExists(){let i=this.parser.json.materials;i==null||i.map((r,o)=>{var a;this._getMToonExtension(o)&&((a=r.extensions)!=null&&a.KHR_materials_unlit)&&delete r.extensions.KHR_materials_unlit})}_getMToonExtension(e){var n,i;let a=(n=this.parser.json.materials)==null?void 0:n[e];if(a==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let l=(i=a.extensions)==null?void 0:i[et.EXTENSION_NAME];if(l==null)return;let s=l.specVersion;if(!mo.has(s)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${et.EXTENSION_NAME} specVersion "${s}"`);return}return l}_extendMaterialParams(e,n){return ue(this,null,function*(){var i;delete n.metalness,delete n.roughness;let r=new uo(this.parser,n);r.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),r.assignColor("shadeColorFactor",e.shadeColorFactor),r.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),r.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),r.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),r.assignPrimitive("shadingShiftTextureScale",(i=e.shadingShiftTexture)==null?void 0:i.scale),r.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),r.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),r.assignColor("matcapFactor",e.matcapFactor),r.assignTexture("matcapTexture",e.matcapTexture,!0),r.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),r.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),r.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),r.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),r.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),r.assignPrimitive("outlineWidthMode",e.outlineWidthMode),r.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),r.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),r.assignColor("outlineColorFactor",e.outlineColorFactor),r.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),r.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),r.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),r.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),r.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),r.assignPrimitive("v0CompatShade",this.v0CompatShade),r.assignPrimitive("debugMode",this.debugMode),yield r.pending})}_setupPrimitive(e,n){let i=this._getMToonExtension(n);if(i){let r=this._parseRenderOrder(i);e.renderOrder=r+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_shouldGenerateOutline(e){return typeof e.outlineWidthMode=="string"&&e.outlineWidthMode!=="none"&&typeof e.outlineWidthFactor=="number"&&e.outlineWidthFactor>0}_generateOutline(e){let n=e.material;if(!(n instanceof tt.Material)||!this._shouldGenerateOutline(n))return;e.material=[n];let i=n.clone();i.name+=" (Outline)",i.isOutline=!0,i.side=tt.BackSide,e.material.push(i);let r=e.geometry,o=r.index?r.index.count:r.attributes.position.count/3;r.addGroup(0,o,0),r.addGroup(0,o,1)}_addToMaterialSet(e){let n=e.material,i=new Set;Array.isArray(n)?n.forEach(r=>i.add(r)):i.add(n);for(let r of i)this._mToonMaterialSet.add(r)}_parseRenderOrder(e){var n;return(e.transparentWithZWrite?0:19)+((n=e.renderQueueOffsetNumber)!=null?n:0)}};gi.EXTENSION_NAME="VRMC_materials_mtoon";var Ct=gi;var fo=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())}),_i=class Ut{get name(){return Ut.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,n){return fo(this,null,function*(){let i=this._getHDREmissiveMultiplierExtension(e);if(i==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");let r=i.emissiveMultiplier;n.emissiveIntensity=r})}_getHDREmissiveMultiplierExtension(e){var n,i;let a=(n=this.parser.json.materials)==null?void 0:n[e];if(a==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let l=(i=a.extensions)==null?void 0:i[Ut.EXTENSION_NAME];if(l!=null)return l}};_i.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var vi=_i;var Ti=R(require("three"),1);var go=Object.defineProperty,_o=Object.defineProperties,vo=Object.getOwnPropertyDescriptors,Ei=Object.getOwnPropertySymbols,Eo=Object.prototype.hasOwnProperty,Mo=Object.prototype.propertyIsEnumerable,Mi=(t,e,n)=>e in t?go(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,X=(t,e)=>{for(var n in e||(e={}))Eo.call(e,n)&&Mi(t,n,e[n]);if(Ei)for(var n of Ei(e))Mo.call(e,n)&&Mi(t,n,e[n]);return t},Ri=(t,e)=>_o(t,vo(e)),Ro=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())});function Ee(t){return Math.pow(t,2.2)}var xi=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(t){var e;this.parser=t,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;let n=this.parser.json;n.extensionsUsed=(e=n.extensionsUsed)!=null?e:[],n.extensionsUsed.indexOf("KHR_texture_transform")===-1&&n.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return Ro(this,null,function*(){var t;let e=this.parser.json,n=(t=e.extensions)==null?void 0:t.VRM,i=n==null?void 0:n.materialProperties;i&&(this._populateRenderQueueMap(i),i.forEach((r,o)=>{var a,l;let s=(a=e.materials)==null?void 0:a[o];if(s==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${o}] of glTF but the material doesn't exist`);return}if(r.shader==="VRM/MToon"){let u=this._parseV0MToonProperties(r,s);e.materials[o]=u}else if((l=r.shader)!=null&&l.startsWith("VRM/Unlit")){let u=this._parseV0UnlitProperties(r,s);e.materials[o]=u}else r.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${r.shader}`)}))})}_parseV0MToonProperties(t,e){var n,i,r,o,a,l,s,u,d,h,p,m,c,f,g,v,P,y,_,E,M,T,x,L,b,A,H,W,z,ye,q,G,pe,we,O,Yt,qt,$t,Zt,Jt,Kt,en,tn,nn,rn,on,sn,an,ln,un,dn,hn,cn,pn,mn;let fn=(i=(n=t.keywordMap)==null?void 0:n._ALPHABLEND_ON)!=null?i:!1,Yi=((r=t.floatProperties)==null?void 0:r._ZWrite)===1&&fn,qi=this._v0ParseRenderQueue(t),gn=(a=(o=t.keywordMap)==null?void 0:o._ALPHATEST_ON)!=null?a:!1,$i=fn?"BLEND":gn?"MASK":"OPAQUE",Zi=gn?(s=(l=t.floatProperties)==null?void 0:l._Cutoff)!=null?s:.5:void 0,Ji=((d=(u=t.floatProperties)==null?void 0:u._CullMode)!=null?d:2)===0,se=this._portTextureTransform(t),Ki=((p=(h=t.vectorProperties)==null?void 0:h._Color)!=null?p:[1,1,1,1]).map((wn,xr)=>xr===3?wn:Ee(wn)),_n=(m=t.textureProperties)==null?void 0:m._MainTex,er=_n!=null?{index:_n,extensions:X({},se)}:void 0,tr=(f=(c=t.floatProperties)==null?void 0:c._BumpScale)!=null?f:1,vn=(g=t.textureProperties)==null?void 0:g._BumpMap,nr=vn!=null?{index:vn,scale:tr,extensions:X({},se)}:void 0,ir=((P=(v=t.vectorProperties)==null?void 0:v._EmissionColor)!=null?P:[0,0,0,1]).map(Ee),En=(y=t.textureProperties)==null?void 0:y._EmissionMap,rr=En!=null?{index:En,extensions:X({},se)}:void 0,or=((E=(_=t.vectorProperties)==null?void 0:_._ShadeColor)!=null?E:[.97,.81,.86,1]).map(Ee),Mn=(M=t.textureProperties)==null?void 0:M._ShadeTexture,sr=Mn!=null?{index:Mn,extensions:X({},se)}:void 0,Ne=(x=(T=t.floatProperties)==null?void 0:T._ShadeShift)!=null?x:0,Be=(b=(L=t.floatProperties)==null?void 0:L._ShadeToony)!=null?b:.9;Be=Ti.MathUtils.lerp(Be,1,.5+.5*Ne),Ne=-Ne-(1-Be);let Rn=(H=(A=t.floatProperties)==null?void 0:A._IndirectLightIntensity)!=null?H:.1,ar=Rn?1-Rn:void 0,pt=(W=t.textureProperties)==null?void 0:W._SphereAdd,lr=pt!=null?[1,1,1]:void 0,ur=pt!=null?{index:pt}:void 0,dr=(ye=(z=t.floatProperties)==null?void 0:z._RimLightingMix)!=null?ye:0,Tn=(q=t.textureProperties)==null?void 0:q._RimTexture,hr=Tn!=null?{index:Tn,extensions:X({},se)}:void 0,cr=((pe=(G=t.vectorProperties)==null?void 0:G._RimColor)!=null?pe:[0,0,0,1]).map(Ee),pr=(O=(we=t.floatProperties)==null?void 0:we._RimFresnelPower)!=null?O:1,mr=(qt=(Yt=t.floatProperties)==null?void 0:Yt._RimLift)!=null?qt:0,fr=["none","worldCoordinates","screenCoordinates"][(Zt=($t=t.floatProperties)==null?void 0:$t._OutlineWidthMode)!=null?Zt:0],mt=(Kt=(Jt=t.floatProperties)==null?void 0:Jt._OutlineWidth)!=null?Kt:0;mt=.01*mt;let xn=(en=t.textureProperties)==null?void 0:en._OutlineWidthTexture,gr=xn!=null?{index:xn,extensions:X({},se)}:void 0,_r=((nn=(tn=t.vectorProperties)==null?void 0:tn._OutlineColor)!=null?nn:[0,0,0]).map(Ee),vr=((on=(rn=t.floatProperties)==null?void 0:rn._OutlineColorMode)!=null?on:0)===1?(an=(sn=t.floatProperties)==null?void 0:sn._OutlineLightingMix)!=null?an:1:0,yn=(ln=t.textureProperties)==null?void 0:ln._UvAnimMaskTexture,Er=yn!=null?{index:yn,extensions:X({},se)}:void 0,Mr=(dn=(un=t.floatProperties)==null?void 0:un._UvAnimScrollX)!=null?dn:0,De=(cn=(hn=t.floatProperties)==null?void 0:hn._UvAnimScrollY)!=null?cn:0;De!=null&&(De=-De);let Rr=(mn=(pn=t.floatProperties)==null?void 0:pn._UvAnimRotation)!=null?mn:0,Tr={specVersion:"1.0",transparentWithZWrite:Yi,renderQueueOffsetNumber:qi,shadeColorFactor:or,shadeMultiplyTexture:sr,shadingShiftFactor:Ne,shadingToonyFactor:Be,giEqualizationFactor:ar,matcapFactor:lr,matcapTexture:ur,rimLightingMixFactor:dr,rimMultiplyTexture:hr,parametricRimColorFactor:cr,parametricRimFresnelPowerFactor:pr,parametricRimLiftFactor:mr,outlineWidthMode:fr,outlineWidthFactor:mt,outlineWidthMultiplyTexture:gr,outlineColorFactor:_r,outlineLightingMixFactor:vr,uvAnimationMaskTexture:Er,uvAnimationScrollXSpeedFactor:Mr,uvAnimationScrollYSpeedFactor:De,uvAnimationRotationSpeedFactor:Rr};return Ri(X({},e),{pbrMetallicRoughness:{baseColorFactor:Ki,baseColorTexture:er},normalTexture:nr,emissiveTexture:rr,emissiveFactor:ir,alphaMode:$i,alphaCutoff:Zi,doubleSided:Ji,extensions:{VRMC_materials_mtoon:Tr}})}_parseV0UnlitProperties(t,e){var n,i,r,o,a;let l=t.shader==="VRM/UnlitTransparentZWrite",s=t.shader==="VRM/UnlitTransparent"||l,u=this._v0ParseRenderQueue(t),d=t.shader==="VRM/UnlitCutout",h=s?"BLEND":d?"MASK":"OPAQUE",p=d?(i=(n=t.floatProperties)==null?void 0:n._Cutoff)!=null?i:.5:void 0,m=this._portTextureTransform(t),c=((o=(r=t.vectorProperties)==null?void 0:r._Color)!=null?o:[1,1,1,1]).map(Ee),f=(a=t.textureProperties)==null?void 0:a._MainTex,g=f!=null?{index:f,extensions:X({},m)}:void 0,v={specVersion:"1.0",transparentWithZWrite:l,renderQueueOffsetNumber:u,shadeColorFactor:c,shadeMultiplyTexture:g};return Ri(X({},e),{pbrMetallicRoughness:{baseColorFactor:c,baseColorTexture:g},alphaMode:h,alphaCutoff:p,extensions:{VRMC_materials_mtoon:v}})}_portTextureTransform(t){var e,n,i,r,o;let a=(e=t.vectorProperties)==null?void 0:e._MainTex;if(a==null)return{};let l=[(n=a==null?void 0:a[0])!=null?n:0,(i=a==null?void 0:a[1])!=null?i:0],s=[(r=a==null?void 0:a[2])!=null?r:1,(o=a==null?void 0:a[3])!=null?o:1];return l[1]=1-s[1]-l[1],{KHR_texture_transform:{offset:l,scale:s}}}_v0ParseRenderQueue(t){var e,n;let i=t.shader==="VRM/UnlitTransparentZWrite",r=((e=t.keywordMap)==null?void 0:e._ALPHABLEND_ON)!=null||t.shader==="VRM/UnlitTransparent"||i,o=((n=t.floatProperties)==null?void 0:n._ZWrite)===1||i,a=0;if(r){let l=t.renderQueue;l!=null&&(o?a=this._renderQueueMapTransparentZWrite.get(l):a=this._renderQueueMapTransparent.get(l))}return a}_populateRenderQueueMap(t){let e=new Set,n=new Set;t.forEach(i=>{var r,o;let a=i.shader==="VRM/UnlitTransparentZWrite",l=((r=i.keywordMap)==null?void 0:r._ALPHABLEND_ON)!=null||i.shader==="VRM/UnlitTransparent"||a,s=((o=i.floatProperties)==null?void 0:o._ZWrite)===1||a;if(l){let u=i.renderQueue;u!=null&&(s?n.add(u):e.add(u))}}),e.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${e.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),n.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${n.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(e).sort().forEach((i,r)=>{let o=Math.min(Math.max(r-e.size+1,-9),0);this._renderQueueMapTransparent.set(i,o)}),Array.from(n).sort().forEach((i,r)=>{let o=Math.min(Math.max(r,0),9);this._renderQueueMapTransparentZWrite.set(i,o)})}};var N=R(require("three"),1),Q=R(require("three"),1),Ot=R(require("three"),1),He=R(require("three"),1),Z=R(require("three"),1);var yi=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())}),ne=new N.Vector3,nt=class extends N.Group{constructor(t){super(),this._attrPosition=new N.BufferAttribute(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(N.DynamicDrawUsage);let e=new N.BufferGeometry;e.setAttribute("position",this._attrPosition);let n=new N.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new N.Line(e,n),this.add(this._line),this.constraint=t}updateMatrixWorld(t){ne.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,ne.x,ne.y,ne.z),this.constraint.source&&ne.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,ne.x,ne.y,ne.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(t)}};function wi(t,e){return e.set(t.elements[12],t.elements[13],t.elements[14])}var To=new Ot.Vector3,xo=new Ot.Vector3;function yo(t,e){return t.decompose(To,e,xo),e}function it(t){return t.invert?t.invert():t.inverse(),t}var rt=class{constructor(t,e){this.destination=t,this.source=e,this.weight=1}},wo=new Q.Vector3,So=new Q.Vector3,Po=new Q.Vector3,Ao=new Q.Quaternion,Lo=new Q.Quaternion,bo=new Q.Quaternion,Si=class extends rt{get aimAxis(){return this._aimAxis}set aimAxis(t){this._aimAxis=t,this._v3AimAxis.set(t==="PositiveX"?1:t==="NegativeX"?-1:0,t==="PositiveY"?1:t==="NegativeY"?-1:0,t==="PositiveZ"?1:t==="NegativeZ"?-1:0)}get dependencies(){let t=new Set([this.source]);return this.destination.parent&&t.add(this.destination.parent),t}constructor(t,e){super(t,e),this._aimAxis="PositiveX",this._v3AimAxis=new Q.Vector3(1,0,0),this._dstRestQuat=new Q.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);let t=Ao.identity(),e=Lo.identity();this.destination.parent&&(yo(this.destination.parent.matrixWorld,t),it(e.copy(t)));let n=wo.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(t),i=wi(this.source.matrixWorld,So).sub(wi(this.destination.matrixWorld,Po)).normalize(),r=bo.setFromUnitVectors(n,i).premultiply(e).multiply(t).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(r,this.weight)}};function Ho(t,e){let n=[t],i=t.parent;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{e(r)})}var Pi=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(t){this._constraints.add(t);let e=this._objectConstraintsMap.get(t.destination);e==null&&(e=new Set,this._objectConstraintsMap.set(t.destination,e)),e.add(t)}deleteConstraint(t){this._constraints.delete(t),this._objectConstraintsMap.get(t.destination).delete(t)}setInitState(){let t=new Set,e=new Set;for(let n of this._constraints)this._processConstraint(n,t,e,i=>i.setInitState())}update(){let t=new Set,e=new Set;for(let n of this._constraints)this._processConstraint(n,t,e,i=>i.update())}_processConstraint(t,e,n,i){if(n.has(t))return;if(e.has(t))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");e.add(t);let r=t.dependencies;for(let o of r)Ho(o,a=>{let l=this._objectConstraintsMap.get(a);if(l)for(let s of l)this._processConstraint(s,e,n,i)});i(t),n.add(t)}},Io=new He.Quaternion,Vo=new He.Quaternion,Ai=class extends rt{get dependencies(){return new Set([this.source])}constructor(t,e){super(t,e),this._dstRestQuat=new He.Quaternion,this._invSrcRestQuat=new He.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),it(this._invSrcRestQuat.copy(this.source.quaternion))}update(){let t=Io.copy(this._invSrcRestQuat).multiply(this.source.quaternion),e=Vo.copy(this._dstRestQuat).multiply(t);this.destination.quaternion.copy(this._dstRestQuat).slerp(e,this.weight)}},Co=new Z.Vector3,Uo=new Z.Quaternion,Oo=new Z.Quaternion,Li=class extends rt{get rollAxis(){return this._rollAxis}set rollAxis(t){this._rollAxis=t,this._v3RollAxis.set(t==="X"?1:0,t==="Y"?1:0,t==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(t,e){super(t,e),this._rollAxis="X",this._v3RollAxis=new Z.Vector3(1,0,0),this._dstRestQuat=new Z.Quaternion,this._invDstRestQuat=new Z.Quaternion,this._invSrcRestQuatMulDstRestQuat=new Z.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),it(this._invDstRestQuat.copy(this._dstRestQuat)),it(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){let t=Uo.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),e=Co.copy(this._v3RollAxis).applyQuaternion(t),i=Oo.setFromUnitVectors(e,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(t);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}},No=new Set(["1.0","1.0-beta"]),bi=class be{get name(){return be.EXTENSION_NAME}constructor(e,n){this.parser=e,this.helperRoot=n==null?void 0:n.helperRoot}afterRoot(e){return yi(this,null,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){return yi(this,null,function*(){var n;let i=this.parser.json;if(!(((n=i.extensionsUsed)==null?void 0:n.indexOf(be.EXTENSION_NAME))!==-1))return null;let o=new Pi,a=yield this.parser.getDependencies("node");return a.forEach((l,s)=>{var u;let d=i.nodes[s],h=(u=d==null?void 0:d.extensions)==null?void 0:u[be.EXTENSION_NAME];if(h==null)return;let p=h.specVersion;if(!No.has(p)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${be.EXTENSION_NAME} specVersion "${p}"`);return}let m=h.constraint;if(m.roll!=null){let c=this._importRollConstraint(l,a,m.roll);o.addConstraint(c)}else if(m.aim!=null){let c=this._importAimConstraint(l,a,m.aim);o.addConstraint(c)}else if(m.rotation!=null){let c=this._importRotationConstraint(l,a,m.rotation);o.addConstraint(c)}}),e.scene.updateMatrixWorld(),o.setInitState(),o})}_importRollConstraint(e,n,i){let{source:r,rollAxis:o,weight:a}=i,l=n[r],s=new Li(e,l);if(o!=null&&(s.rollAxis=o),a!=null&&(s.weight=a),this.helperRoot){let u=new nt(s);this.helperRoot.add(u)}return s}_importAimConstraint(e,n,i){let{source:r,aimAxis:o,weight:a}=i,l=n[r],s=new Si(e,l);if(o!=null&&(s.aimAxis=o),a!=null&&(s.weight=a),this.helperRoot){let u=new nt(s);this.helperRoot.add(u)}return s}_importRotationConstraint(e,n,i){let{source:r,weight:o}=i,a=n[r],l=new Ai(e,a);if(o!=null&&(l.weight=o),this.helperRoot){let s=new nt(l);this.helperRoot.add(s)}return l}};bi.EXTENSION_NAME="VRMC_node_constraint";var Nt=bi;var re=R(require("three"),1),Ue=R(require("three"),1),Te=R(require("three"),1),jt=R(require("three"),1),J=R(require("three"),1),ie=R(require("three"),1),he=R(require("three"),1),oe=R(require("three"),1),ce=R(require("three"),1),ut=R(require("three"),1),U=R(require("three"),1),Ci=R(require("three"),1),Ui=R(require("three"),1),D=R(require("three"),1);var ot=(t,e,n)=>new Promise((i,r)=>{var o=s=>{try{l(n.next(s))}catch(u){r(u)}},a=s=>{try{l(n.throw(s))}catch(u){r(u)}},l=s=>s.done?i(s.value):Promise.resolve(s.value).then(o,a);l((n=n.apply(t,e)).next())}),lt=class{},Bt=new Ue.Vector3,de=new Ue.Vector3,zt=class extends lt{get type(){return"capsule"}constructor(t){var e,n,i,r;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new Ue.Vector3(0,0,0),this.tail=(n=t==null?void 0:t.tail)!=null?n:new Ue.Vector3(0,0,0),this.radius=(i=t==null?void 0:t.radius)!=null?i:0,this.inside=(r=t==null?void 0:t.inside)!=null?r:!1}calculateCollision(t,e,n,i){Bt.setFromMatrixPosition(t),de.subVectors(this.tail,this.offset).applyMatrix4(t),de.sub(Bt);let r=de.lengthSq();i.copy(e).sub(Bt);let o=de.dot(i);o<=0||(r<=o||de.multiplyScalar(o/r),i.sub(de));let a=i.length(),l=this.inside?this.radius-n-a:a-n-this.radius;return l<0&&(i.multiplyScalar(1/a),this.inside&&i.negate()),l}},Dt=new Te.Vector3,Hi=new Te.Matrix3,Gt=class extends lt{get type(){return"plane"}constructor(t){var e,n;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new Te.Vector3(0,0,0),this.normal=(n=t==null?void 0:t.normal)!=null?n:new Te.Vector3(0,0,1)}calculateCollision(t,e,n,i){i.setFromMatrixPosition(t),i.negate().add(e),Hi.getNormalMatrix(t),Dt.copy(this.normal).applyNormalMatrix(Hi).normalize();let r=i.dot(Dt)-n;return i.copy(Dt),r}},Bo=new jt.Vector3,Xt=class extends lt{get type(){return"sphere"}constructor(t){var e,n,i;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new jt.Vector3(0,0,0),this.radius=(n=t==null?void 0:t.radius)!=null?n:0,this.inside=(i=t==null?void 0:t.inside)!=null?i:!1}calculateCollision(t,e,n,i){i.subVectors(e,Bo.setFromMatrixPosition(t));let r=i.length(),o=this.inside?this.radius-n-r:r-n-this.radius;return o<0&&(i.multiplyScalar(1/r),this.inside&&i.negate()),o}},Y=new J.Vector3,Do=class extends J.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new J.Vector3,this._currentTail=new J.Vector3,this._shape=t,this._attrPos=new J.BufferAttribute(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new J.BufferAttribute(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0);let n=Y.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(n)>1e-10&&(this._currentTail.copy(n),t=!0),t&&this._buildPosition()}_buildPosition(){Y.copy(this._currentTail).sub(this._currentOffset);let t=Y.length()/this._currentRadius;for(let i=0;i<=16;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(i,-Math.sin(r),-Math.cos(r),0),this._attrPos.setXYZ(17+i,t+Math.sin(r),Math.cos(r),0),this._attrPos.setXYZ(34+i,-Math.sin(r),0,-Math.cos(r)),this._attrPos.setXYZ(51+i,t+Math.sin(r),0,Math.cos(r))}for(let i=0;i<32;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(68+i,0,Math.sin(r),Math.cos(r)),this._attrPos.setXYZ(100+i,t,Math.sin(r),Math.cos(r))}let e=Math.atan2(Y.y,Math.sqrt(Y.x*Y.x+Y.z*Y.z)),n=-Math.atan2(Y.z,Y.x);this.rotateZ(e),this.rotateY(n),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<34;t++){let e=(t+1)%34;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(68+t*2,34+t,34+e)}for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(136+t*2,68+t,68+e),this._attrIndex.setXY(200+t*2,100+t,100+e)}this._attrIndex.needsUpdate=!0}},Fo=class extends ie.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentOffset=new ie.Vector3,this._currentNormal=new ie.Vector3,this._shape=t,this._attrPos=new ie.BufferAttribute(new Float32Array(6*3),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ie.BufferAttribute(new Uint16Array(10),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0),this._currentNormal.equals(this._shape.normal)||(this._currentNormal.copy(this._shape.normal),t=!0),t&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,-.5,-.5,0),this._attrPos.setXYZ(1,.5,-.5,0),this._attrPos.setXYZ(2,.5,.5,0),this._attrPos.setXYZ(3,-.5,.5,0),this._attrPos.setXYZ(4,0,0,0),this._attrPos.setXYZ(5,0,0,.25),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this.lookAt(this._currentNormal),this._attrPos.needsUpdate=!0}_buildIndex(){this._attrIndex.setXY(0,0,1),this._attrIndex.setXY(2,1,2),this._attrIndex.setXY(4,2,3),this._attrIndex.setXY(6,3,0),this._attrIndex.setXY(8,4,5),this._attrIndex.needsUpdate=!0}},ko=class extends he.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new he.Vector3,this._shape=t,this._attrPos=new he.BufferAttribute(new Float32Array(32*3*3),3),this.setAttribute("position",this._attrPos),this._attrIndex=new he.BufferAttribute(new Uint16Array(64*3),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.needsUpdate=!0}},Wo=new re.Vector3,st=class extends re.Group{constructor(t){if(super(),this.matrixAutoUpdate=!1,this.collider=t,this.collider.shape instanceof Xt)this._geometry=new ko(this.collider.shape);else if(this.collider.shape instanceof zt)this._geometry=new Do(this.collider.shape);else if(this.collider.shape instanceof Gt)this._geometry=new Fo(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");let e=new re.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new re.LineSegments(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(t){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=Wo.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(t)}},zo=class extends ce.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new ce.Vector3,this._springBone=t,this._attrPos=new ce.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ce.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},Go=new oe.Vector3,Vi=class extends oe.Group{constructor(t){super(),this.matrixAutoUpdate=!1,this.springBone=t,this._geometry=new zo(this.springBone);let e=new oe.LineBasicMaterial({color:16776960,depthTest:!1,depthWrite:!1});this._line=new oe.LineSegments(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(t){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=Go.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(t)}},at=class extends ut.Object3D{constructor(t){super(),this.colliderMatrix=new ut.Matrix4,this.shape=t}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),jo(this.colliderMatrix,this.matrixWorld,this.shape.offset)}};function jo(t,e,n){let i=e.elements;t.copy(e),n&&(t.elements[12]=i[0]*n.x+i[4]*n.y+i[8]*n.z+i[12],t.elements[13]=i[1]*n.x+i[5]*n.y+i[9]*n.z+i[13],t.elements[14]=i[2]*n.x+i[6]*n.y+i[10]*n.z+i[14])}var Xo=new Ui.Matrix4;function Qo(t){return t.invert?t.invert():t.getInverse(Xo.copy(t)),t}var Yo=class{constructor(t){this._inverseCache=new Ci.Matrix4,this._shouldUpdateInverse=!0,this.matrix=t;let e={set:(n,i,r)=>(this._shouldUpdateInverse=!0,n[i]=r,!0)};this._originalElements=t.elements,t.elements=new Proxy(t.elements,e)}get inverse(){return this._shouldUpdateInverse&&(Qo(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},Ft=new U.Matrix4,Me=new U.Vector3,Ie=new U.Vector3,Ve=new U.Vector3,Ce=new U.Vector3,qo=new U.Matrix4,Oi=class{constructor(t,e,n={},i=[]){this._currentTail=new U.Vector3,this._prevTail=new U.Vector3,this._boneAxis=new U.Vector3,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new U.Matrix4,this._initialLocalRotation=new U.Quaternion,this._initialLocalChildPosition=new U.Vector3;var r,o,a,l,s,u;this.bone=t,this.bone.matrixAutoUpdate=!1,this.child=e,this.settings={hitRadius:(r=n.hitRadius)!=null?r:0,stiffness:(o=n.stiffness)!=null?o:1,gravityPower:(a=n.gravityPower)!=null?a:0,gravityDir:(s=(l=n.gravityDir)==null?void 0:l.clone())!=null?s:new U.Vector3(0,-1,0),dragForce:(u=n.dragForce)!=null?u:.4},this.colliderGroups=i}get dependencies(){let t=new Set,e=this.bone.parent;e&&t.add(e);for(let n=0;n<this.colliderGroups.length;n++)for(let i=0;i<this.colliderGroups[n].colliders.length;i++)t.add(this.colliderGroups[n].colliders[i]);return t}get center(){return this._center}set center(t){var e;(e=this._center)!=null&&e.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=t,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new Yo(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:Ft}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);let t=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(t),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);let t=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(t),this._prevTail.copy(this._currentTail)}update(t){if(t<=0)return;this._calcWorldSpaceBoneLength();let e=Ie.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);Ce.copy(this._currentTail).add(Me.subVectors(this._currentTail,this._prevTail).multiplyScalar(1-this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(e,this.settings.stiffness*t).addScaledVector(this.settings.gravityDir,this.settings.gravityPower*t),Ve.setFromMatrixPosition(this.bone.matrixWorld),Ce.sub(Ve).normalize().multiplyScalar(this._worldSpaceBoneLength).add(Ve),this._collision(Ce),this._prevTail.copy(this._currentTail),this._currentTail.copy(Ce).applyMatrix4(this._getMatrixWorldToCenter());let n=qo.multiplyMatrices(this._parentMatrixWorld,this._initialLocalMatrix).invert();this.bone.quaternion.setFromUnitVectors(this._boneAxis,Me.copy(Ce).applyMatrix4(n).normalize()).premultiply(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(t){for(let e=0;e<this.colliderGroups.length;e++)for(let n=0;n<this.colliderGroups[e].colliders.length;n++){let i=this.colliderGroups[e].colliders[n],r=i.shape.calculateCollision(i.colliderMatrix,t,this.settings.hitRadius,Me);if(r<0){t.addScaledVector(Me,-r),t.sub(Ve);let o=t.length();t.multiplyScalar(this._worldSpaceBoneLength/o).add(Ve)}}}_calcWorldSpaceBoneLength(){Me.setFromMatrixPosition(this.bone.matrixWorld),this.child?Ie.setFromMatrixPosition(this.child.matrixWorld):(Ie.copy(this._initialLocalChildPosition),Ie.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=Me.sub(Ie).length()}_getMatrixCenterToWorld(){return this._center?this._center.matrixWorld:Ft}_getMatrixWorldToCenter(){return this._center?this._center.userData.inverseCacheProxy.inverse:Ft}};function $o(t,e){let n=[],i=t;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{e(r)})}function kt(t,e){t.children.forEach(n=>{e(n)||kt(n,e)})}function Zo(t){var e;let n=new Map;for(let i of t){let r=i;do{let o=((e=n.get(r))!=null?e:0)+1;if(o===t.size)return r;n.set(r,o),r=r.parent}while(r!==null)}return null}var Wt=class{constructor(){this._joints=new Set,this._sortedJoints=[],this._hasWarnedCircularDependency=!1,this._ancestors=[],this._objectSpringBonesMap=new Map,this._isSortedJointsDirty=!1,this._relevantChildrenUpdated=this._relevantChildrenUpdated.bind(this)}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){let t=new Set;return this._joints.forEach(e=>{e.colliderGroups.forEach(n=>{t.add(n)})}),Array.from(t)}get colliders(){let t=new Set;return this.colliderGroups.forEach(e=>{e.colliders.forEach(n=>{t.add(n)})}),Array.from(t)}addJoint(t){this._joints.add(t);let e=this._objectSpringBonesMap.get(t.bone);e==null&&(e=new Set,this._objectSpringBonesMap.set(t.bone,e)),e.add(t),this._isSortedJointsDirty=!0}addSpringBone(t){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(t)}deleteJoint(t){this._joints.delete(t),this._objectSpringBonesMap.get(t.bone).delete(t),this._isSortedJointsDirty=!0}deleteSpringBone(t){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(t)}setInitState(){this._sortJoints();for(let t=0;t<this._sortedJoints.length;t++){let e=this._sortedJoints[t];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.setInitState()}}reset(){this._sortJoints();for(let t=0;t<this._sortedJoints.length;t++){let e=this._sortedJoints[t];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.reset()}}update(t){this._sortJoints();for(let e=0;e<this._ancestors.length;e++)this._ancestors[e].updateWorldMatrix(e===0,!1);for(let e=0;e<this._sortedJoints.length;e++){let n=this._sortedJoints[e];n.bone.updateMatrix(),n.bone.updateWorldMatrix(!1,!1),n.update(t),kt(n.bone,this._relevantChildrenUpdated)}}_sortJoints(){if(!this._isSortedJointsDirty)return;let t=[],e=new Set,n=new Set,i=new Set;for(let o of this._joints)this._insertJointSort(o,e,n,t,i);this._sortedJoints=t;let r=Zo(i);this._ancestors=[],r&&(this._ancestors.push(r),kt(r,o=>{var a,l;return((l=(a=this._objectSpringBonesMap.get(o))==null?void 0:a.size)!=null?l:0)>0?!0:(this._ancestors.push(o),!1)})),this._isSortedJointsDirty=!1}_insertJointSort(t,e,n,i,r){if(n.has(t))return;if(e.has(t)){this._hasWarnedCircularDependency||(console.warn("VRMSpringBoneManager: Circular dependency detected"),this._hasWarnedCircularDependency=!0);return}e.add(t);let o=t.dependencies;for(let a of o){let l=!1,s=null;$o(a,u=>{let d=this._objectSpringBonesMap.get(u);if(d)for(let h of d)l=!0,this._insertJointSort(h,e,n,i,r);else l||(s=u)}),s&&r.add(s)}i.push(t),n.add(t)}_relevantChildrenUpdated(t){var e,n;return((n=(e=this._objectSpringBonesMap.get(t))==null?void 0:e.size)!=null?n:0)>0?!0:(t.updateWorldMatrix(!1,!1),!1)}},Ii="VRMC_springBone_extended_collider",Jo=new Set(["1.0","1.0-beta"]),Ko=new Set(["1.0"]),Ni=class Re{get name(){return Re.EXTENSION_NAME}constructor(e,n){var i;this.parser=e,this.jointHelperRoot=n==null?void 0:n.jointHelperRoot,this.colliderHelperRoot=n==null?void 0:n.colliderHelperRoot,this.useExtendedColliders=(i=n==null?void 0:n.useExtendedColliders)!=null?i:!0}afterRoot(e){return ot(this,null,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return ot(this,null,function*(){let n=yield this._v1Import(e);if(n!=null)return n;let i=yield this._v0Import(e);return i!=null?i:null})}_v1Import(e){return ot(this,null,function*(){var n,i,r,o,a;let l=e.parser.json;if(!(((n=l.extensionsUsed)==null?void 0:n.indexOf(Re.EXTENSION_NAME))!==-1))return null;let u=new Wt,d=yield e.parser.getDependencies("node"),h=(i=l.extensions)==null?void 0:i[Re.EXTENSION_NAME];if(!h)return null;let p=h.specVersion;if(!Jo.has(p))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Re.EXTENSION_NAME} specVersion "${p}"`),null;let m=(r=h.colliders)==null?void 0:r.map((f,g)=>{var v,P,y,_,E,M,T,x,L,b,A,H,W,z,ye;let q=d[f.node];if(q==null)return console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} attempted to use the node #${f.node} but not found`),null;let G=f.shape,pe=(v=f.extensions)==null?void 0:v[Ii];if(this.useExtendedColliders&&pe!=null){let we=pe.specVersion;if(!Ko.has(we))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Ii} specVersion "${we}". Fallbacking to the ${Re.EXTENSION_NAME} definition`);else{let O=pe.shape;if(O.sphere)return this._importSphereCollider(q,{offset:new D.Vector3().fromArray((P=O.sphere.offset)!=null?P:[0,0,0]),radius:(y=O.sphere.radius)!=null?y:0,inside:(_=O.sphere.inside)!=null?_:!1});if(O.capsule)return this._importCapsuleCollider(q,{offset:new D.Vector3().fromArray((E=O.capsule.offset)!=null?E:[0,0,0]),radius:(M=O.capsule.radius)!=null?M:0,tail:new D.Vector3().fromArray((T=O.capsule.tail)!=null?T:[0,0,0]),inside:(x=O.capsule.inside)!=null?x:!1});if(O.plane)return this._importPlaneCollider(q,{offset:new D.Vector3().fromArray((L=O.plane.offset)!=null?L:[0,0,0]),normal:new D.Vector3().fromArray((b=O.plane.normal)!=null?b:[0,0,1])})}}if(G.sphere)return this._importSphereCollider(q,{offset:new D.Vector3().fromArray((A=G.sphere.offset)!=null?A:[0,0,0]),radius:(H=G.sphere.radius)!=null?H:0,inside:!1});if(G.capsule)return this._importCapsuleCollider(q,{offset:new D.Vector3().fromArray((W=G.capsule.offset)!=null?W:[0,0,0]),radius:(z=G.capsule.radius)!=null?z:0,tail:new D.Vector3().fromArray((ye=G.capsule.tail)!=null?ye:[0,0,0]),inside:!1});throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${g} has no valid shape`)}),c=(o=h.colliderGroups)==null?void 0:o.map((f,g)=>{var v;return{colliders:((v=f.colliders)!=null?v:[]).flatMap(y=>{let _=m==null?void 0:m[y];return _==null?(console.warn(`VRMSpringBoneLoaderPlugin: The colliderGroup #${g} attempted to use a collider #${y} but not found`),[]):_}),name:f.name}});return(a=h.springs)==null||a.forEach((f,g)=>{var v;let P=f.joints,y=(v=f.colliderGroups)==null?void 0:v.map(M=>{let T=c==null?void 0:c[M];if(T==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${g} attempted to use a colliderGroup ${M} but not found`);return T}),_=f.center!=null?d[f.center]:void 0,E;P.forEach(M=>{if(E){let T=E.node,x=d[T],L=M.node,b=d[L],A={hitRadius:E.hitRadius,dragForce:E.dragForce,gravityPower:E.gravityPower,stiffness:E.stiffness,gravityDir:E.gravityDir!=null?new D.Vector3().fromArray(E.gravityDir):void 0},H=this._importJoint(x,b,A,y);_&&(H.center=_),u.addJoint(H)}E=M})}),u.setInitState(),u})}_v0Import(e){return ot(this,null,function*(){var n,i,r;let o=e.parser.json;if(!(((n=o.extensionsUsed)==null?void 0:n.indexOf("VRM"))!==-1))return null;let l=(i=o.extensions)==null?void 0:i.VRM,s=l==null?void 0:l.secondaryAnimation;if(!s)return null;let u=s==null?void 0:s.boneGroups;if(!u)return null;let d=new Wt,h=yield e.parser.getDependencies("node"),p=(r=s.colliderGroups)==null?void 0:r.map(m=>{var c;let f=h[m.node];return{colliders:((c=m.colliders)!=null?c:[]).map((v,P)=>{var y,_,E;let M=new D.Vector3(0,0,0);return v.offset&&M.set((y=v.offset.x)!=null?y:0,(_=v.offset.y)!=null?_:0,v.offset.z?-v.offset.z:0),this._importSphereCollider(f,{offset:M,radius:(E=v.radius)!=null?E:0,inside:!1})})}});return u==null||u.forEach((m,c)=>{let f=m.bones;f&&f.forEach(g=>{var v,P,y,_;let E=h[g],M=new D.Vector3;m.gravityDir?M.set((v=m.gravityDir.x)!=null?v:0,(P=m.gravityDir.y)!=null?P:0,(y=m.gravityDir.z)!=null?y:0):M.set(0,-1,0);let T=m.center!=null?h[m.center]:void 0,x={hitRadius:m.hitRadius,dragForce:m.dragForce,gravityPower:m.gravityPower,stiffness:m.stiffiness,gravityDir:M},L=(_=m.colliderGroups)==null?void 0:_.map(b=>{let A=p==null?void 0:p[b];if(A==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${c} attempted to use a colliderGroup ${b} but not found`);return A});E.traverse(b=>{var A;let H=(A=b.children[0])!=null?A:null,W=this._importJoint(b,H,x,L);T&&(W.center=T),d.addJoint(W)})})}),e.scene.updateMatrixWorld(),d.setInitState(),d})}_importJoint(e,n,i,r){let o=new Oi(e,n,i,r);if(this.jointHelperRoot){let a=new Vi(o);this.jointHelperRoot.add(a),a.renderOrder=this.jointHelperRoot.renderOrder}return o}_importSphereCollider(e,n){let i=new Xt(n),r=new at(i);if(e.add(r),this.colliderHelperRoot){let o=new st(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importCapsuleCollider(e,n){let i=new zt(n),r=new at(i);if(e.add(r),this.colliderHelperRoot){let o=new st(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importPlaneCollider(e,n){let i=new Gt(n),r=new at(i);if(e.add(r),this.colliderHelperRoot){let o=new st(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}};Ni.EXTENSION_NAME="VRMC_springBone";var Qt=Ni;var dt=class{get name(){return"VRMLoaderPlugin"}constructor(e,n){var o,a,l,s,u,d,h,p,m,c;this.parser=e;let i=n==null?void 0:n.helperRoot,r=n==null?void 0:n.autoUpdateHumanBones;this.expressionPlugin=(o=n==null?void 0:n.expressionPlugin)!=null?o:new Qe(e),this.firstPersonPlugin=(a=n==null?void 0:n.firstPersonPlugin)!=null?a:new Ye(e),this.humanoidPlugin=(l=n==null?void 0:n.humanoidPlugin)!=null?l:new $e(e,{helperRoot:i,autoUpdateHumanBones:r}),this.lookAtPlugin=(s=n==null?void 0:n.lookAtPlugin)!=null?s:new Ze(e,{helperRoot:i}),this.metaPlugin=(u=n==null?void 0:n.metaPlugin)!=null?u:new Je(e),this.mtoonMaterialPlugin=(d=n==null?void 0:n.mtoonMaterialPlugin)!=null?d:new Ct(e),this.materialsHDREmissiveMultiplierPlugin=(h=n==null?void 0:n.materialsHDREmissiveMultiplierPlugin)!=null?h:new vi(e),this.materialsV0CompatPlugin=(p=n==null?void 0:n.materialsV0CompatPlugin)!=null?p:new xi(e),this.springBonePlugin=(m=n==null?void 0:n.springBonePlugin)!=null?m:new Qt(e,{colliderHelperRoot:i,jointHelperRoot:i}),this.nodeConstraintPlugin=(c=n==null?void 0:n.nodeConstraintPlugin)!=null?c:new Nt(e,{helperRoot:i})}beforeRoot(){return Se(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(e){return Se(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(e)})}getMaterialType(e){let n=this.mtoonMaterialPlugin.getMaterialType(e);return n!=null?n:null}extendMaterialParams(e,n){return Se(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(e,n),yield this.mtoonMaterialPlugin.extendMaterialParams(e,n)})}afterRoot(e){return Se(this,null,function*(){yield this.metaPlugin.afterRoot(e),yield this.humanoidPlugin.afterRoot(e),yield this.expressionPlugin.afterRoot(e),yield this.lookAtPlugin.afterRoot(e),yield this.firstPersonPlugin.afterRoot(e),yield this.springBonePlugin.afterRoot(e),yield this.nodeConstraintPlugin.afterRoot(e),yield this.mtoonMaterialPlugin.afterRoot(e);let n=e.userData.vrmMeta,i=e.userData.vrmHumanoid;if(n&&i){let r=new ve({scene:e.scene,expressionManager:e.userData.vrmExpressionManager,firstPerson:e.userData.vrmFirstPerson,humanoid:i,lookAt:e.userData.vrmLookAt,meta:n,materials:e.userData.vrmMToonMaterials,springBoneManager:e.userData.vrmSpringBoneManager,nodeConstraintManager:e.userData.vrmNodeConstraintManager});e.userData.vrm=r}})}};var Di=R(require("three"),1);function es(t){let e=new Set;return t.traverse(n=>{if(!n.isMesh)return;let i=n;e.add(i)}),e}function Bi(t,e,n){if(e.size===1){let a=e.values().next().value;if(a.weight===1)return t[a.index]}let i=new Float32Array(t[0].count*3),r=0;if(n)r=1;else for(let a of e)r+=a.weight;for(let a of e){let l=t[a.index],s=a.weight/r;for(let u=0;u<l.count;u++)i[u*3+0]+=l.getX(u)*s,i[u*3+1]+=l.getY(u)*s,i[u*3+2]+=l.getZ(u)*s}return new Di.BufferAttribute(i,3)}function Fi(t){var r;let e=es(t.scene),n=new Map,i=(r=t.expressionManager)==null?void 0:r.expressionMap;if(i!=null)for(let[o,a]of Object.entries(i)){let l=new Set;for(let s of a.binds)if(s instanceof _e){if(s.weight!==0)for(let u of s.primitives){let d=n.get(u);d==null&&(d=new Map,n.set(u,d));let h=d.get(o);h==null&&(h=new Set,d.set(o,h)),h.add(s)}l.add(s)}for(let s of l)a.deleteBind(s)}for(let o of e){let a=n.get(o);if(a==null)continue;let l=o.geometry.morphAttributes;o.geometry.morphAttributes={};let s=o.geometry.clone();o.geometry=s;let u=s.morphTargetsRelative,d=l.position!=null,h=l.normal!=null,p={},m={},c=[];if(d||h){d&&(p.position=[]),h&&(p.normal=[]);let f=0;for(let[g,v]of a)d&&(p.position[f]=Bi(l.position,v,u)),h&&(p.normal[f]=Bi(l.normal,v,u)),i==null||i[g].addBind(new _e({index:f,weight:1,primitives:[o]})),m[g]=f,c.push(0),f++}s.morphAttributes=p,o.morphTargetDictionary=m,o.morphTargetInfluences=c}}var xe=R(require("three"),1);function ki(t){var d;let e=ts(t),n=new Set;for(let h of e)n.has(h.geometry)&&(h.geometry=as(h.geometry)),n.add(h.geometry);let i=new Map;for(let h of n){let p=h.getAttribute("skinIndex"),m=(d=i.get(p))!=null?d:new Map;i.set(p,m);let c=h.getAttribute("skinWeight"),f=ns(p,c);m.set(c,f)}let r=new Map;for(let h of e){let p=is(h,i);r.set(h,p)}let o=[];for(let[h,p]of r){let m=!1;for(let c of o)if(rs(p,c.boneInverseMap)){m=!0,c.meshes.add(h);for(let[g,v]of p)c.boneInverseMap.set(g,v);break}m||o.push({boneInverseMap:p,meshes:new Set([h])})}let a=new Map,l=new Oe,s=new Oe,u=new Oe;for(let h of o){let{boneInverseMap:p,meshes:m}=h,c=Array.from(p.keys()),f=Array.from(p.values()),g=new xe.Skeleton(c,f),v=s.getOrCreate(g);for(let P of m){let y=P.geometry.getAttribute("skinIndex"),_=l.getOrCreate(y),E=P.skeleton.bones,M=E.map(L=>u.getOrCreate(L)).join(","),T=`${_};${v};${M}`,x=a.get(T);x==null&&(x=y.clone(),os(x,E,c),a.set(T,x)),P.geometry.setAttribute("skinIndex",x)}for(let P of m)P.bind(g,new xe.Matrix4)}}function ts(t){let e=new Set;return t.traverse(n=>{if(!n.isSkinnedMesh)return;let i=n;e.add(i)}),e}function ns(t,e){let n=new Set;for(let i=0;i<t.count;i++)for(let r=0;r<t.itemSize;r++){let o=t.getComponent(i,r);e.getComponent(i,r)!==0&&n.add(o)}return n}function is(t,e){let n=new Map,i=t.skeleton,r=t.geometry,o=r.getAttribute("skinIndex"),a=r.getAttribute("skinWeight"),l=e.get(o),s=l==null?void 0:l.get(a);if(!s)throw new Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");for(let u of s)n.set(i.bones[u],i.boneInverses[u]);return n}function rs(t,e){for(let[n,i]of t.entries()){let r=e.get(n);if(r!=null&&!ss(i,r))return!1}return!0}function os(t,e,n){let i=new Map;for(let o of e)i.set(o,i.size);let r=new Map;for(let[o,a]of n.entries()){let l=i.get(a);r.set(l,o)}for(let o=0;o<t.count;o++)for(let a=0;a<t.itemSize;a++){let l=t.getComponent(o,a),s=r.get(l);t.setComponent(o,a,s)}t.needsUpdate=!0}function ss(t,e,n){if(n=n||1e-4,t.elements.length!=e.elements.length)return!1;for(let i=0,r=t.elements.length;i<r;i++)if(Math.abs(t.elements[i]-e.elements[i])>n)return!1;return!0}var Oe=class{constructor(){this._objectIndexMap=new Map;this._index=0}get(e){return this._objectIndexMap.get(e)}getOrCreate(e){let n=this._objectIndexMap.get(e);return n==null&&(n=this._index,this._objectIndexMap.set(e,n),this._index++),n}};function as(t){var n,i,r,o;let e=new xe.BufferGeometry;e.name=t.name,e.setIndex(t.index);for(let[a,l]of Object.entries(t.attributes))e.setAttribute(a,l);for(let[a,l]of Object.entries(t.morphAttributes))e.morphAttributes[a]=l.concat();e.morphTargetsRelative=t.morphTargetsRelative,e.groups=[];for(let a of t.groups)e.addGroup(a.start,a.count,a.materialIndex);return e.boundingSphere=(i=(n=t.boundingSphere)==null?void 0:n.clone())!=null?i:null,e.boundingBox=(o=(r=t.boundingBox)==null?void 0:r.clone())!=null?o:null,e.drawRange.start=t.drawRange.start,e.drawRange.count=t.drawRange.count,e.userData=t.userData,e}function Wi(t){if(Object.values(t).forEach(e=>{e!=null&&e.isTexture&&e.dispose()}),t.isShaderMaterial){let e=t.uniforms;e&&Object.values(e).forEach(n=>{let i=n.value;i!=null&&i.isTexture&&i.dispose()})}t.dispose()}function ls(t){let e=t.geometry;e&&e.dispose();let n=t.skeleton;n&&n.dispose();let i=t.material;i&&(Array.isArray(i)?i.forEach(r=>Wi(r)):i&&Wi(i))}function zi(t){t.traverse(ls)}var ht=R(require("three"),1);function Gi(t,e){var a,l;console.warn("VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version.");let n=(a=e==null?void 0:e.experimentalSameBoneCounts)!=null?a:!1,i=[];t.traverse(s=>{s.type==="SkinnedMesh"&&i.push(s)});let r=new Map,o=0;for(let s of i){let d=s.geometry.getAttribute("skinIndex");if(r.has(d))continue;let h=new Map,p=new Map;for(let m=0;m<d.count;m++)for(let c=0;c<d.itemSize;c++){let f=d.getComponent(m,c),g=h.get(f);g==null&&(g=h.size,h.set(f,g),p.set(g,f)),d.setComponent(m,c,g)}d.needsUpdate=!0,r.set(d,p),o=Math.max(o,h.size)}for(let s of i){let d=s.geometry.getAttribute("skinIndex"),h=r.get(d),p=[],m=[],c=n?o:h.size;for(let g=0;g<c;g++){let v=(l=h.get(g))!=null?l:0;p.push(s.skeleton.bones[v]),m.push(s.skeleton.boneInverses[v])}let f=new ht.Skeleton(p,m);s.bind(f,new ht.Matrix4)}}var ji=R(require("three"),1),ct=require("three");function Xi(t){let e=new Map;t.traverse(n=>{var g,v,P,y;if(!n.isMesh)return;let i=n,r=i.geometry,o=r.index;if(o==null)return;let a=e.get(r);if(a!=null){i.geometry=a;return}let l=Object.values(r.attributes)[0].count,s=new Array(l),u=0,d=o.array;for(let _=0;_<d.length;_++){let E=d[_];s[E]||(s[E]=!0,u++)}if(u===l)return;let h=[],p=[],m=0;for(let _=0;_<s.length;_++)if(s[_]){let E=m++;h[_]=E,p[E]=_}let c=new ji.BufferGeometry;c.name=r.name,c.morphTargetsRelative=r.morphTargetsRelative,r.groups.forEach(_=>{c.addGroup(_.start,_.count,_.materialIndex)}),c.boundingBox=(v=(g=r.boundingBox)==null?void 0:g.clone())!=null?v:null,c.boundingSphere=(y=(P=r.boundingSphere)==null?void 0:P.clone())!=null?y:null,c.setDrawRange(r.drawRange.start,r.drawRange.count),c.userData=r.userData,e.set(r,c);{let _=o.array,E=new _.constructor(_.length);for(let M=0;M<_.length;M++){let T=_[M],x=h[T];E[M]=x}c.setIndex(new ct.BufferAttribute(E,1,!1))}Object.keys(r.attributes).forEach(_=>{let E=r.attributes[_];if(E.isInterleavedBufferAttribute)throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");let M=E.array,{itemSize:T,normalized:x}=E,L=new M.constructor(p.length*T);p.forEach((b,A)=>{for(let H=0;H<T;H++)L[A*T+H]=M[b*T+H]}),c.setAttribute(_,new ct.BufferAttribute(L,T,x))});let f=!0;Object.keys(r.morphAttributes).forEach(_=>{c.morphAttributes[_]=[];let E=r.morphAttributes[_];for(let M=0;M<E.length;M++){let T=E[M];if(T.isInterleavedBufferAttribute)throw new Error("removeUnnecessaryVertices: InterleavedBufferAttribute is not supported");let x=T.array,{itemSize:L,normalized:b}=T,A=new x.constructor(p.length*L);p.forEach((H,W)=>{for(let z=0;z<L;z++)A[W*L+z]=x[H*L+z]}),f=f&&A.every(H=>H===0),c.morphAttributes[_][M]=new ct.BufferAttribute(A,L,b)}}),f&&(c.morphAttributes={}),i.geometry=c}),Array.from(e.keys()).forEach(n=>{n.dispose()})}function Qi(t){var e;((e=t.meta)==null?void 0:e.metaVersion)==="0"&&(t.scene.rotation.y=Math.PI)}var K=class{constructor(){}};K.combineMorphs=Fi,K.combineSkeletons=ki,K.deepDispose=zi,K.removeUnnecessaryJoints=Gi,K.removeUnnecessaryVertices=Xi,K.rotateVRM0=Qi;
/*!
 * @pixiv/three-vrm-core v3.4.0
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.4.0
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.4.0
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.4.0
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.4.0
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.4.0
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2025 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
