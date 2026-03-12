/*! (c) 2019-2026 pixiv Inc. - https://github.com/pixiv/three-vrm/blob/release/LICENSE */
"use strict";var br=Object.create;var We=Object.defineProperty;var Hr=Object.getOwnPropertyDescriptor;var Lr=Object.getOwnPropertyNames;var Ir=Object.getPrototypeOf,Vr=Object.prototype.hasOwnProperty;var Cr=(t,e)=>{for(var n in e)We(t,n,{get:e[n],enumerable:!0})},Hn=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Lr(e))!Vr.call(t,r)&&r!==n&&We(t,r,{get:()=>e[r],enumerable:!(i=Hr(e,r))||i.enumerable});return t};var v=(t,e,n)=>(n=t!=null?br(Ir(t)):{},Hn(e||!t||!t.__esModule?We(n,"default",{value:t,enumerable:!0}):n,t)),Or=t=>Hn(We({},"__esModule",{value:!0}),t);var Pe=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())});var Ts={};Cr(Ts,{MToonMaterial:()=>Ei,MToonMaterialDebugMode:()=>_i,MToonMaterialLoaderPlugin:()=>Nt,MToonMaterialOutlineWidthMode:()=>Bt,VRM:()=>ve,VRMAimConstraint:()=>Hi,VRMCore:()=>tt,VRMCoreLoaderPlugin:()=>lo,VRMExpression:()=>Tt,VRMExpressionLoaderPlugin:()=>qe,VRMExpressionManager:()=>xt,VRMExpressionMaterialColorBind:()=>yt,VRMExpressionMaterialColorType:()=>me,VRMExpressionMorphTargetBind:()=>_e,VRMExpressionOverrideType:()=>Dr,VRMExpressionPresetName:()=>Qe,VRMExpressionTextureTransformBind:()=>wt,VRMFirstPerson:()=>St,VRMFirstPersonLoaderPlugin:()=>Ze,VRMFirstPersonMeshAnnotationType:()=>kr,VRMHumanBoneList:()=>je,VRMHumanBoneName:()=>Gr,VRMHumanBoneParentMap:()=>ni,VRMHumanoid:()=>bt,VRMHumanoidHelper:()=>At,VRMHumanoidLoaderPlugin:()=>Je,VRMLoaderPlugin:()=>ct,VRMLookAt:()=>di,VRMLookAtBoneApplier:()=>He,VRMLookAtExpressionApplier:()=>Ye,VRMLookAtHelper:()=>ai,VRMLookAtLoaderPlugin:()=>Ke,VRMLookAtRangeMap:()=>It,VRMLookAtTypeName:()=>oo,VRMMetaLoaderPlugin:()=>et,VRMNodeConstraint:()=>st,VRMNodeConstraintHelper:()=>rt,VRMNodeConstraintLoaderPlugin:()=>kt,VRMNodeConstraintManager:()=>Li,VRMRequiredHumanBoneName:()=>si,VRMRollConstraint:()=>Vi,VRMRotationConstraint:()=>Ii,VRMSpringBoneCollider:()=>ut,VRMSpringBoneColliderHelper:()=>lt,VRMSpringBoneColliderShape:()=>dt,VRMSpringBoneColliderShapeCapsule:()=>Qt,VRMSpringBoneColliderShapePlane:()=>Yt,VRMSpringBoneColliderShapeSphere:()=>Zt,VRMSpringBoneJoint:()=>Fi,VRMSpringBoneJointHelper:()=>Bi,VRMSpringBoneLoaderPlugin:()=>$t,VRMSpringBoneManager:()=>Xt,VRMUtils:()=>$});module.exports=Or(Ts);var jn=v(require("three"),1),K=v(require("three"),1),Vt=v(require("three"),1),$n=v(require("three"),1),F=v(require("three"),1),Y=v(require("three"),1),$e=v(require("three"),1),k=v(require("three"),1),P=v(require("three"),1),Le=v(require("three"),1),ee=v(require("three"),1),V=v(require("three"),1),Ot=v(require("three"),1),L=v(require("three"),1),Lt=v(require("three"),1),hi=v(require("three"),1);var x=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())}),Tt=class extends jn.Object3D{constructor(t){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${t}`,this.expressionName=t,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(t){this._binds.push(t)}deleteBind(t){let e=this._binds.indexOf(t);e>=0&&this._binds.splice(e,1)}applyWeight(t){var e;let n=this.outputWeight;n*=(e=t==null?void 0:t.multiplier)!=null?e:1,this.isBinary&&n<1&&(n=0),this._binds.forEach(i=>i.applyWeight(n))}clearAppliedWeight(){this._binds.forEach(t=>t.clearAppliedWeight())}};function Xn(t,e,n){var i,r;let o=t.parser.json,s=(i=o.nodes)==null?void 0:i[e];if(s==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${e}] of glTF but the node doesn't exist`),null;let l=s.mesh;if(l==null)return null;let a=(r=o.meshes)==null?void 0:r[l];if(a==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${l}] of glTF but the mesh doesn't exist`),null;let u=a.primitives.length,d=[];return n.traverse(h=>{d.length<u&&h.isMesh&&d.push(h)}),d}function Ln(t,e){return x(this,null,function*(){let n=yield t.parser.getDependency("node",e);return Xn(t,e,n)})}function In(t){return x(this,null,function*(){let e=yield t.parser.getDependencies("node"),n=new Map;return e.forEach((i,r)=>{let o=Xn(t,r,i);o!=null&&n.set(r,o)}),n})}var Qe={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function Qn(t){return Math.max(Math.min(t,1),0)}var xt=class Yn{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let e={},n=new Set(Object.values(Qe));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)&&(e[i]=r)}),e}get customExpressionMap(){let e={},n=new Set(Object.values(Qe));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)||(e[i]=r)}),e}copy(e){return this._expressions.concat().forEach(i=>{this.unregisterExpression(i)}),e._expressions.forEach(i=>{this.registerExpression(i)}),this.blinkExpressionNames=e.blinkExpressionNames.concat(),this.lookAtExpressionNames=e.lookAtExpressionNames.concat(),this.mouthExpressionNames=e.mouthExpressionNames.concat(),this}clone(){return new Yn().copy(this)}getExpression(e){var n;return(n=this._expressionMap[e])!=null?n:null}registerExpression(e){this._expressions.push(e),this._expressionMap[e.expressionName]=e}unregisterExpression(e){let n=this._expressions.indexOf(e);n===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(n,1),delete this._expressionMap[e.expressionName]}getValue(e){var n;let i=this.getExpression(e);return(n=i==null?void 0:i.weight)!=null?n:null}setValue(e,n){let i=this.getExpression(e);i&&(i.weight=Qn(n))}resetValues(){this._expressions.forEach(e=>{e.weight=0})}getExpressionTrackName(e){let n=this.getExpression(e);return n?`${n.name}.weight`:null}update(){let e=this._calculateWeightMultipliers();this._expressions.forEach(n=>{n.clearAppliedWeight()}),this._expressions.forEach(n=>{let i=1,r=n.expressionName;this.blinkExpressionNames.indexOf(r)!==-1&&(i*=e.blink),this.lookAtExpressionNames.indexOf(r)!==-1&&(i*=e.lookAt),this.mouthExpressionNames.indexOf(r)!==-1&&(i*=e.mouth),n.applyWeight({multiplier:i})})}_calculateWeightMultipliers(){let e=1,n=1,i=1;return this._expressions.forEach(r=>{e-=r.overrideBlinkAmount,n-=r.overrideLookAtAmount,i-=r.overrideMouthAmount}),e=Math.max(0,e),n=Math.max(0,n),i=Math.max(0,i),{blink:e,lookAt:n,mouth:i}}},me={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},Ur={_Color:me.Color,_EmissionColor:me.EmissionColor,_ShadeColor:me.ShadeColor,_RimColor:me.RimColor,_OutlineColor:me.OutlineColor},Br=new Vt.Color,qn=class Zn{constructor({material:e,type:n,targetValue:i,targetAlpha:r}){this.material=e,this.type=n,this.targetValue=i,this.targetAlpha=r!=null?r:1;let o=this._initColorBindState(),s=this._initAlphaBindState();this._state={color:o,alpha:s}}applyWeight(e){let{color:n,alpha:i}=this._state;if(n!=null){let{propertyName:r,deltaValue:o}=n,s=this.material[r];s!=null&&s.add(Br.copy(o).multiplyScalar(e))}if(i!=null){let{propertyName:r,deltaValue:o}=i;this.material[r]!=null&&(this.material[r]+=o*e)}}clearAppliedWeight(){let{color:e,alpha:n}=this._state;if(e!=null){let{propertyName:i,initialValue:r}=e,o=this.material[i];o!=null&&o.copy(r)}if(n!=null){let{propertyName:i,initialValue:r}=n;this.material[i]!=null&&(this.material[i]=r)}}_initColorBindState(){var e,n,i;let{material:r,type:o,targetValue:s}=this,l=this._getPropertyNameMap(),a=(n=(e=l==null?void 0:l[o])==null?void 0:e[0])!=null?n:null;if(a==null)return console.warn(`Tried to add a material color bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${o} but the material or the type is not supported.`),null;let d=r[a].clone(),h=new Vt.Color(s.r-d.r,s.g-d.g,s.b-d.b);return{propertyName:a,initialValue:d,deltaValue:h}}_initAlphaBindState(){var e,n,i;let{material:r,type:o,targetAlpha:s}=this,l=this._getPropertyNameMap(),a=(n=(e=l==null?void 0:l[o])==null?void 0:e[1])!=null?n:null;if(a==null&&s!==1)return console.warn(`Tried to add a material alpha bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${o} but the material or the type does not support alpha.`),null;if(a==null)return null;let u=r[a],d=s-u;return{propertyName:a,initialValue:u,deltaValue:d}}_getPropertyNameMap(){var e,n;return(n=(e=Object.entries(Zn._propertyNameMapMap).find(([i])=>this.material[i]===!0))==null?void 0:e[1])!=null?n:null}};qn._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var yt=qn,_e=class{constructor({primitives:t,index:e,weight:n}){this.primitives=t,this.index=e,this.weight=n}applyWeight(t){this.primitives.forEach(e=>{var n;((n=e.morphTargetInfluences)==null?void 0:n[this.index])!=null&&(e.morphTargetInfluences[this.index]+=this.weight*t)})}clearAppliedWeight(){this.primitives.forEach(t=>{var e;((e=t.morphTargetInfluences)==null?void 0:e[this.index])!=null&&(t.morphTargetInfluences[this.index]=0)})}},Vn=new $n.Vector2,Jn=class Kn{constructor({material:e,scale:n,offset:i}){var r,o;this.material=e,this.scale=n,this.offset=i;let s=(r=Object.entries(Kn._propertyNamesMap).find(([l])=>e[l]===!0))==null?void 0:r[1];s==null?(console.warn(`Tried to add a texture transform bind to the material ${(o=e.name)!=null?o:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],s.forEach(l=>{var a;let u=(a=e[l])==null?void 0:a.clone();if(!u)return null;e[l]=u;let d=u.offset.clone(),h=u.repeat.clone(),c=i.clone().sub(d),p=n.clone().sub(h);this._properties.push({name:l,initialOffset:d,deltaOffset:c,initialScale:h,deltaScale:p})}))}applyWeight(e){this._properties.forEach(n=>{let i=this.material[n.name];i!==void 0&&(i.offset.add(Vn.copy(n.deltaOffset).multiplyScalar(e)),i.repeat.add(Vn.copy(n.deltaScale).multiplyScalar(e)))})}clearAppliedWeight(){this._properties.forEach(e=>{let n=this.material[e.name];n!==void 0&&(n.offset.copy(e.initialOffset),n.repeat.copy(e.initialScale))})}};Jn._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var wt=Jn,Nr=new Set(["1.0","1.0-beta"]),ei=class ti{get name(){return"VRMExpressionLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return x(this,null,function*(){e.userData.vrmExpressionManager=yield this._import(e)})}_import(e){return x(this,null,function*(){let n=yield this._v1Import(e);if(n)return n;let i=yield this._v0Import(e);return i||null})}_v1Import(e){return x(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let s=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!s)return null;let l=s.specVersion;if(!Nr.has(l))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let a=s.expressions;if(!a)return null;let u=new Set(Object.values(Qe)),d=new Map;a.preset!=null&&Object.entries(a.preset).forEach(([c,p])=>{if(p!=null){if(!u.has(c)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${c}" detected. Ignoring the expression`);return}d.set(c,p)}}),a.custom!=null&&Object.entries(a.custom).forEach(([c,p])=>{if(u.has(c)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${c}". Ignoring the expression`);return}d.set(c,p)});let h=new xt;return yield Promise.all(Array.from(d.entries()).map(c=>x(this,[c],function*([p,f]){var m,g,_,w,T,R,E;let M=new Tt(p);if(e.scene.add(M),M.isBinary=(m=f.isBinary)!=null?m:!1,M.overrideBlink=(g=f.overrideBlink)!=null?g:"none",M.overrideLookAt=(_=f.overrideLookAt)!=null?_:"none",M.overrideMouth=(w=f.overrideMouth)!=null?w:"none",(T=f.morphTargetBinds)==null||T.forEach(S=>x(this,null,function*(){var A;if(S.node===void 0||S.index===void 0)return;let I=yield Ln(e,S.node),b=S.index;if(!I.every(H=>Array.isArray(H.morphTargetInfluences)&&b<H.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${f.name} attempts to index morph #${b} but not found.`);return}M.addBind(new _e({primitives:I,index:b,weight:(A=S.weight)!=null?A:1}))})),f.materialColorBinds||f.textureTransformBinds){let S=[];e.scene.traverse(A=>{let I=A.material;I&&(Array.isArray(I)?S.push(...I):S.push(I))}),(R=f.materialColorBinds)==null||R.forEach(A=>x(this,null,function*(){S.filter(b=>{var H;let C=(H=this.parser.associations.get(b))==null?void 0:H.materials;return A.material===C}).forEach(b=>{M.addBind(new yt({material:b,type:A.type,targetValue:new K.Color().fromArray(A.targetValue),targetAlpha:A.targetValue[3]}))})})),(E=f.textureTransformBinds)==null||E.forEach(A=>x(this,null,function*(){S.filter(b=>{var H;let C=(H=this.parser.associations.get(b))==null?void 0:H.materials;return A.material===C}).forEach(b=>{var H,C;M.addBind(new wt({material:b,offset:new K.Vector2().fromArray((H=A.offset)!=null?H:[0,0]),scale:new K.Vector2().fromArray((C=A.scale)!=null?C:[1,1])}))})}))}h.registerExpression(M)}))),h})}_v0Import(e){return x(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let o=r.blendShapeMaster;if(!o)return null;let s=new xt,l=o.blendShapeGroups;if(!l)return s;let a=new Set;return yield Promise.all(l.map(u=>x(this,null,function*(){var d;let h=u.presetName,c=h!=null&&ti.v0v1PresetNameMap[h]||null,p=c!=null?c:u.name;if(p==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(a.has(p)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}a.add(p);let f=new Tt(p);e.scene.add(f),f.isBinary=(d=u.isBinary)!=null?d:!1,u.binds&&u.binds.forEach(g=>x(this,null,function*(){var _;if(g.mesh===void 0||g.index===void 0)return;let w=[];(_=i.nodes)==null||_.forEach((R,E)=>{R.mesh===g.mesh&&w.push(E)});let T=g.index;yield Promise.all(w.map(R=>x(this,null,function*(){var E;let M=yield Ln(e,R);if(!M.every(S=>Array.isArray(S.morphTargetInfluences)&&T<S.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${u.name} attempts to index ${T}th morph but not found.`);return}f.addBind(new _e({primitives:M,index:T,weight:.01*((E=g.weight)!=null?E:100)}))})))}));let m=u.materialValues;m&&m.length!==0&&m.forEach(g=>{if(g.materialName===void 0||g.propertyName===void 0||g.targetValue===void 0)return;let _=[];e.scene.traverse(T=>{if(T.material){let R=T.material;Array.isArray(R)?_.push(...R.filter(E=>(E.name===g.materialName||E.name===g.materialName+" (Outline)")&&_.indexOf(E)===-1)):R.name===g.materialName&&_.indexOf(R)===-1&&_.push(R)}});let w=g.propertyName;_.forEach(T=>{if(w==="_MainTex_ST"){let E=new K.Vector2(g.targetValue[0],g.targetValue[1]),M=new K.Vector2(g.targetValue[2],g.targetValue[3]);M.y=1-M.y-E.y,f.addBind(new wt({material:T,scale:E,offset:M}));return}let R=Ur[w];if(R){f.addBind(new yt({material:T,type:R,targetValue:new K.Color().fromArray(g.targetValue),targetAlpha:g.targetValue[3]}));return}console.warn(w+" is not supported")})}),s.registerExpression(f)}))),s})}};ei.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var qe=ei,Dr={None:"none",Block:"block",Blend:"blend"},Ct=class ge{constructor(e,n){this._firstPersonOnlyLayer=ge.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=ge.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=e,this.meshAnnotations=n}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=e.meshAnnotations.map(n=>({meshes:n.meshes.concat(),type:n.type})),this}clone(){return new ge(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:e=ge.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:n=ge.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=e,this._thirdPersonOnlyLayer=n,this.meshAnnotations.forEach(i=>{i.meshes.forEach(r=>{i.type==="firstPersonOnly"?(r.layers.set(this._firstPersonOnlyLayer),r.traverse(o=>o.layers.set(this._firstPersonOnlyLayer))):i.type==="thirdPersonOnly"?(r.layers.set(this._thirdPersonOnlyLayer),r.traverse(o=>o.layers.set(this._thirdPersonOnlyLayer))):i.type==="auto"&&this._createHeadlessModel(r)})}),this._initializedLayers=!0)}_excludeTriangles(e,n,i,r){let o=0;if(n!=null&&n.length>0)for(let s=0;s<e.length;s+=3){let l=e[s],a=e[s+1],u=e[s+2],d=n[l],h=i[l];if(d[0]>0&&r.includes(h[0])||d[1]>0&&r.includes(h[1])||d[2]>0&&r.includes(h[2])||d[3]>0&&r.includes(h[3]))continue;let c=n[a],p=i[a];if(c[0]>0&&r.includes(p[0])||c[1]>0&&r.includes(p[1])||c[2]>0&&r.includes(p[2])||c[3]>0&&r.includes(p[3]))continue;let f=n[u],m=i[u];f[0]>0&&r.includes(m[0])||f[1]>0&&r.includes(m[1])||f[2]>0&&r.includes(m[2])||f[3]>0&&r.includes(m[3])||(e[o++]=l,e[o++]=a,e[o++]=u)}return o}_createErasedMesh(e,n){let i=new F.SkinnedMesh(e.geometry.clone(),e.material);i.name=`${e.name}(erase)`,i.frustumCulled=e.frustumCulled,i.layers.set(this._firstPersonOnlyLayer);let r=i.geometry,o=r.getAttribute("skinIndex"),s=o instanceof F.GLBufferAttribute?[]:o.array,l=[];for(let m=0;m<s.length;m+=4)l.push([s[m],s[m+1],s[m+2],s[m+3]]);let a=r.getAttribute("skinWeight"),u=a instanceof F.GLBufferAttribute?[]:a.array,d=[];for(let m=0;m<u.length;m+=4)d.push([u[m],u[m+1],u[m+2],u[m+3]]);let h=r.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");let c=Array.from(h.array),p=this._excludeTriangles(c,d,l,n),f=[];for(let m=0;m<p;m++)f[m]=c[m];return r.setIndex(f),e.onBeforeRender&&(i.onBeforeRender=e.onBeforeRender),i.bind(new F.Skeleton(e.skeleton.bones,e.skeleton.boneInverses),new F.Matrix4),i}_createHeadlessModelForSkinnedMesh(e,n){let i=[];if(n.skeleton.bones.forEach((o,s)=>{this._isEraseTarget(o)&&i.push(s)}),!i.length){n.layers.enable(this._thirdPersonOnlyLayer),n.layers.enable(this._firstPersonOnlyLayer);return}n.layers.set(this._thirdPersonOnlyLayer);let r=this._createErasedMesh(n,i);e.add(r)}_createHeadlessModel(e){if(e.type==="Group")if(e.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(e))e.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer));else{let n=new F.Group;n.name=`_headless_${e.name}`,n.layers.set(this._firstPersonOnlyLayer),e.parent.add(n),e.children.filter(i=>i.type==="SkinnedMesh").forEach(i=>{let r=i;this._createHeadlessModelForSkinnedMesh(n,r)})}else if(e.type==="SkinnedMesh"){let n=e;this._createHeadlessModelForSkinnedMesh(e.parent,n)}else this._isEraseTarget(e)&&(e.layers.set(this._thirdPersonOnlyLayer),e.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(e){return e===this.humanoid.getRawBoneNode("head")?!0:e.parent?this._isEraseTarget(e.parent):!1}};Ct.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;Ct.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var St=Ct,Fr=new Set(["1.0","1.0-beta"]),Ze=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(t){this.parser=t}afterRoot(t){return x(this,null,function*(){let e=t.userData.vrmHumanoid;if(e!==null){if(e===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");t.userData.vrmFirstPerson=yield this._import(t,e)}})}_import(t,e){return x(this,null,function*(){if(e==null)return null;let n=yield this._v1Import(t,e);if(n)return n;let i=yield this._v0Import(t,e);return i||null})}_v1Import(t,e){return x(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let s=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!s)return null;let l=s.specVersion;if(!Fr.has(l))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let a=s.firstPerson,u=[],d=yield In(t);return Array.from(d.entries()).forEach(([h,c])=>{var p,f;let m=(p=a==null?void 0:a.meshAnnotations)==null?void 0:p.find(g=>g.node===h);u.push({meshes:c,type:(f=m==null?void 0:m.type)!=null?f:"auto"})}),new St(e,u)})}_v0Import(t,e){return x(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let o=r.firstPerson;if(!o)return null;let s=[],l=yield In(t);return Array.from(l.entries()).forEach(([a,u])=>{let d=i.nodes[a],h=o.meshAnnotations?o.meshAnnotations.find(c=>c.mesh===d.mesh):void 0;s.push({meshes:u,type:this._convertV0FlagToV1Type(h==null?void 0:h.firstPersonFlag)})}),new St(e,s)})}_convertV0FlagToV1Type(t){return t==="FirstPersonOnly"?"firstPersonOnly":t==="ThirdPersonOnly"?"thirdPersonOnly":t==="Both"?"both":"auto"}},kr={Auto:"auto",Both:"both",ThirdPersonOnly:"thirdPersonOnly",FirstPersonOnly:"firstPersonOnly"},Cn=new Y.Vector3,On=new Y.Vector3,Wr=new Y.Quaternion,At=class extends Y.Group{constructor(t){super(),this.vrmHumanoid=t,this._boneAxesMap=new Map,Object.values(t.humanBones).forEach(e=>{let n=new Y.AxesHelper(1);n.matrixAutoUpdate=!1,n.material.depthTest=!1,n.material.depthWrite=!1,this.add(n),this._boneAxesMap.set(e,n)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(t=>{t.geometry.dispose(),t.material.dispose()})}updateMatrixWorld(t){Array.from(this._boneAxesMap.entries()).forEach(([e,n])=>{e.node.updateWorldMatrix(!0,!1),e.node.matrixWorld.decompose(Cn,Wr,On);let i=Cn.set(.1,.1,.1).divide(On);n.matrix.copy(e.node.matrixWorld).scale(i)}),super.updateMatrixWorld(t)}},je=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"],Gr={Hips:"hips",Spine:"spine",Chest:"chest",UpperChest:"upperChest",Neck:"neck",Head:"head",LeftEye:"leftEye",RightEye:"rightEye",Jaw:"jaw",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",LeftToes:"leftToes",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",RightToes:"rightToes",LeftShoulder:"leftShoulder",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightShoulder:"rightShoulder",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand",LeftThumbMetacarpal:"leftThumbMetacarpal",LeftThumbProximal:"leftThumbProximal",LeftThumbDistal:"leftThumbDistal",LeftIndexProximal:"leftIndexProximal",LeftIndexIntermediate:"leftIndexIntermediate",LeftIndexDistal:"leftIndexDistal",LeftMiddleProximal:"leftMiddleProximal",LeftMiddleIntermediate:"leftMiddleIntermediate",LeftMiddleDistal:"leftMiddleDistal",LeftRingProximal:"leftRingProximal",LeftRingIntermediate:"leftRingIntermediate",LeftRingDistal:"leftRingDistal",LeftLittleProximal:"leftLittleProximal",LeftLittleIntermediate:"leftLittleIntermediate",LeftLittleDistal:"leftLittleDistal",RightThumbMetacarpal:"rightThumbMetacarpal",RightThumbProximal:"rightThumbProximal",RightThumbDistal:"rightThumbDistal",RightIndexProximal:"rightIndexProximal",RightIndexIntermediate:"rightIndexIntermediate",RightIndexDistal:"rightIndexDistal",RightMiddleProximal:"rightMiddleProximal",RightMiddleIntermediate:"rightMiddleIntermediate",RightMiddleDistal:"rightMiddleDistal",RightRingProximal:"rightRingProximal",RightRingIntermediate:"rightRingIntermediate",RightRingDistal:"rightRingDistal",RightLittleProximal:"rightLittleProximal",RightLittleIntermediate:"rightLittleIntermediate",RightLittleDistal:"rightLittleDistal"},ni={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function ii(t){return t.invert?t.invert():t.inverse(),t}var ae=new $e.Vector3,le=new $e.Quaternion,Pt=class{constructor(t){this.humanBones=t,this.restPose=this.getAbsolutePose()}getAbsolutePose(){let t={};return Object.keys(this.humanBones).forEach(e=>{let n=e,i=this.getBoneNode(n);i&&(ae.copy(i.position),le.copy(i.quaternion),t[n]={position:ae.toArray(),rotation:le.toArray()})}),t}getPose(){let t={};return Object.keys(this.humanBones).forEach(e=>{let n=e,i=this.getBoneNode(n);if(!i)return;ae.set(0,0,0),le.identity();let r=this.restPose[n];r!=null&&r.position&&ae.fromArray(r.position).negate(),r!=null&&r.rotation&&ii(le.fromArray(r.rotation)),ae.add(i.position),le.premultiply(i.quaternion),t[n]={position:ae.toArray(),rotation:le.toArray()}}),t}setPose(t){Object.entries(t).forEach(([e,n])=>{let i=e,r=this.getBoneNode(i);if(!r)return;let o=this.restPose[i];o&&(n!=null&&n.position&&(r.position.fromArray(n.position),o.position&&r.position.add(ae.fromArray(o.position))),n!=null&&n.rotation&&(r.quaternion.fromArray(n.rotation),o.rotation&&r.quaternion.multiply(le.fromArray(o.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([t,e])=>{let n=this.getBoneNode(t);n&&(e!=null&&e.position&&n.position.fromArray(e.position),e!=null&&e.rotation&&n.quaternion.fromArray(e.rotation))})}getBone(t){var e;return(e=this.humanBones[t])!=null?e:void 0}getBoneNode(t){var e,n;return(n=(e=this.humanBones[t])==null?void 0:e.node)!=null?n:null}},Et=new k.Vector3,zr=new k.Quaternion,jr=new k.Vector3,Un=class ri extends Pt{static _setupTransforms(e){let n=new k.Object3D;n.name="VRMHumanoidRig";let i={},r={},o={},s={};je.forEach(a=>{var u;let d=e.getBoneNode(a);if(d){let h=new k.Vector3,c=new k.Quaternion;d.updateWorldMatrix(!0,!1),d.matrixWorld.decompose(h,c,Et),i[a]=h,r[a]=c,o[a]=d.quaternion.clone();let p=new k.Quaternion;(u=d.parent)==null||u.matrixWorld.decompose(Et,p,Et),s[a]=p}});let l={};return je.forEach(a=>{var u;let d=e.getBoneNode(a);if(d){let h=i[a],c=a,p;for(;p==null&&(c=ni[c],c!=null);)p=i[c];let f=new k.Object3D;f.name="Normalized_"+d.name,(c?(u=l[c])==null?void 0:u.node:n).add(f),f.position.copy(h),p&&f.position.sub(p),l[a]={node:f}}}),{rigBones:l,root:n,parentWorldRotations:s,boneRotations:o}}constructor(e){let{rigBones:n,root:i,parentWorldRotations:r,boneRotations:o}=ri._setupTransforms(e);super(n),this.original=e,this.root=i,this._parentWorldRotations=r,this._boneRotations=o}update(){je.forEach(e=>{let n=this.original.getBoneNode(e);if(n!=null){let i=this.getBoneNode(e),r=this._parentWorldRotations[e],o=zr.copy(r).invert(),s=this._boneRotations[e];if(n.quaternion.copy(i.quaternion).multiply(r).premultiply(o).multiply(s),e==="hips"){let l=i.getWorldPosition(jr);n.parent.updateWorldMatrix(!0,!1);let a=n.parent.matrixWorld,u=l.applyMatrix4(a.invert());n.position.copy(u)}}})}},bt=class oi{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(e,n){var i;this.autoUpdateHumanBones=(i=n==null?void 0:n.autoUpdateHumanBones)!=null?i:!0,this._rawHumanBones=new Pt(e),this._normalizedHumanBones=new Un(this._rawHumanBones)}copy(e){return this.autoUpdateHumanBones=e.autoUpdateHumanBones,this._rawHumanBones=new Pt(e.humanBones),this._normalizedHumanBones=new Un(this._rawHumanBones),this}clone(){return new oi(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(e){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(e)}setRawPose(e){return this._rawHumanBones.setPose(e)}setNormalizedPose(e){return this._normalizedHumanBones.setPose(e)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(e){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(e)}getRawBone(e){return this._rawHumanBones.getBone(e)}getNormalizedBone(e){return this._normalizedHumanBones.getBone(e)}getBoneNode(e){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(e)}getRawBoneNode(e){return this._rawHumanBones.getBoneNode(e)}getNormalizedBoneNode(e){return this._normalizedHumanBones.getBoneNode(e)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},si={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},Xr=new Set(["1.0","1.0-beta"]),Bn={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},Je=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(t,e){this.parser=t,this.helperRoot=e==null?void 0:e.helperRoot,this.autoUpdateHumanBones=e==null?void 0:e.autoUpdateHumanBones}afterRoot(t){return x(this,null,function*(){t.userData.vrmHumanoid=yield this._import(t)})}_import(t){return x(this,null,function*(){let e=yield this._v1Import(t);if(e)return e;let n=yield this._v0Import(t);return n||null})}_v1Import(t){return x(this,null,function*(){var e,n;let i=this.parser.json;if(!(((e=i.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;let s=o.specVersion;if(!Xr.has(s))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${s}"`),null;let l=o.humanoid;if(!l)return null;let a=l.humanBones.leftThumbIntermediate!=null||l.humanBones.rightThumbIntermediate!=null,u={};l.humanBones!=null&&(yield Promise.all(Object.entries(l.humanBones).map(h=>x(this,[h],function*([c,p]){let f=c,m=p.node;if(a){let _=Bn[f];_!=null&&(f=_)}let g=yield this.parser.getDependency("node",m);if(g==null){console.warn(`A glTF node bound to the humanoid bone ${f} (index = ${m}) does not exist`);return}u[f]={node:g}}))));let d=new bt(this._ensureRequiredBonesExist(u),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(t.scene.add(d.normalizedHumanBonesRoot),this.helperRoot){let h=new At(d);this.helperRoot.add(h),h.renderOrder=this.helperRoot.renderOrder}return d})}_v0Import(t){return x(this,null,function*(){var e;let i=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!i)return null;let r=i.humanoid;if(!r)return null;let o={};r.humanBones!=null&&(yield Promise.all(r.humanBones.map(l=>x(this,null,function*(){let a=l.bone,u=l.node;if(a==null||u==null)return;let d=yield this.parser.getDependency("node",u);if(d==null){console.warn(`A glTF node bound to the humanoid bone ${a} (index = ${u}) does not exist`);return}let h=Bn[a],c=h!=null?h:a;if(o[c]!=null){console.warn(`Multiple bone entries for ${c} detected (index = ${u}), ignoring duplicated entries.`);return}o[c]={node:d}}))));let s=new bt(this._ensureRequiredBonesExist(o),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(t.scene.add(s.normalizedHumanBonesRoot),this.helperRoot){let l=new At(s);this.helperRoot.add(l),l.renderOrder=this.helperRoot.renderOrder}return s})}_ensureRequiredBonesExist(t){let e=Object.values(si).filter(n=>t[n]==null);if(e.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${e.join(", ")}`);return t}},Nn=class extends Le.BufferGeometry{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new Le.BufferAttribute(new Float32Array(195),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Le.BufferAttribute(new Uint16Array(189),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,t=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,t=!0),t&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let t=0;t<64;t++){let e=t/63*this._currentTheta;this._attrPos.setXYZ(t+1,this._currentRadius*Math.sin(e),0,this._currentRadius*Math.cos(e))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<63;t++)this._attrIndex.setXYZ(t*3,0,t+1,t+2);this._attrIndex.needsUpdate=!0}},Qr=class extends ee.BufferGeometry{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new ee.Vector3,this._currentTail=new ee.Vector3,this._attrPos=new ee.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ee.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,t=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},Ge=new P.Quaternion,Dn=new P.Quaternion,be=new P.Vector3,Fn=new P.Vector3,kn=Math.sqrt(2)/2,Yr=new P.Quaternion(0,0,-kn,kn),qr=new P.Vector3(0,1,0),ai=class extends P.Group{constructor(t){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=t;{let e=new Nn;e.radius=.5;let n=new P.MeshBasicMaterial({color:65280,transparent:!0,opacity:.5,side:P.DoubleSide,depthTest:!1,depthWrite:!1});this._meshPitch=new P.Mesh(e,n),this.add(this._meshPitch)}{let e=new Nn;e.radius=.5;let n=new P.MeshBasicMaterial({color:16711680,transparent:!0,opacity:.5,side:P.DoubleSide,depthTest:!1,depthWrite:!1});this._meshYaw=new P.Mesh(e,n),this.add(this._meshYaw)}{let e=new Qr;e.radius=.1;let n=new P.LineBasicMaterial({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new P.LineSegments(e,n),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(t){let e=P.MathUtils.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=e,this._meshYaw.geometry.update();let n=P.MathUtils.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=n,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(be),this.vrmLookAt.getLookAtWorldQuaternion(Ge),Ge.multiply(this.vrmLookAt.getFaceFrontQuaternion(Dn)),this._meshYaw.position.copy(be),this._meshYaw.quaternion.copy(Ge),this._meshPitch.position.copy(be),this._meshPitch.quaternion.copy(Ge),this._meshPitch.quaternion.multiply(Dn.setFromAxisAngle(qr,e)),this._meshPitch.quaternion.multiply(Yr);let{target:i,autoUpdate:r}=this.vrmLookAt;i!=null&&r&&(i.getWorldPosition(Fn).sub(be),this._lineTarget.geometry.tail.copy(Fn),this._lineTarget.geometry.update(),this._lineTarget.position.copy(be)),super.updateMatrixWorld(t)}},Zr=new Ot.Vector3,$r=new Ot.Vector3;function Ht(t,e){return t.matrixWorld.decompose(Zr,e,$r),e}function Xe(t){return[Math.atan2(-t.z,t.x),Math.atan2(t.y,Math.sqrt(t.x*t.x+t.z*t.z))]}function Wn(t){let e=Math.round(t/2/Math.PI);return t-2*Math.PI*e}var Gn=new V.Vector3(0,0,1),Jr=new V.Vector3,Kr=new V.Vector3,eo=new V.Vector3,to=new V.Quaternion,Mt=new V.Quaternion,zn=new V.Quaternion,no=new V.Quaternion,Rt=new V.Euler,li=class ui{constructor(e,n){this.offsetFromHeadBone=new V.Vector3,this.autoUpdate=!0,this.faceFront=new V.Vector3(0,0,1),this.humanoid=e,this.applier=n,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new V.Quaternion)}get yaw(){return this._yaw}set yaw(e){this._yaw=e,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(e){this._pitch=e,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new V.Euler)}getEuler(e){return e.set(V.MathUtils.DEG2RAD*this._pitch,V.MathUtils.DEG2RAD*this._yaw,0,"YXZ")}copy(e){if(this.humanoid!==e.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(e.offsetFromHeadBone),this.applier=e.applier,this.autoUpdate=e.autoUpdate,this.target=e.target,this.faceFront.copy(e.faceFront),this}clone(){return new ui(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(e){let n=this.humanoid.getRawBoneNode("head");return e.copy(this.offsetFromHeadBone).applyMatrix4(n.matrixWorld)}getLookAtWorldQuaternion(e){let n=this.humanoid.getRawBoneNode("head");return Ht(n,e)}getFaceFrontQuaternion(e){if(this.faceFront.distanceToSquared(Gn)<.01)return e.copy(this._restHeadWorldQuaternion).invert();let[n,i]=Xe(this.faceFront);return Rt.set(0,.5*Math.PI+n,i,"YZX"),e.setFromEuler(Rt).premultiply(no.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(e){return this.getLookAtWorldQuaternion(Mt),this.getFaceFrontQuaternion(zn),e.copy(Gn).applyQuaternion(Mt).applyQuaternion(zn).applyEuler(this.getEuler(Rt))}lookAt(e){let n=to.copy(this._restHeadWorldQuaternion).multiply(ii(this.getLookAtWorldQuaternion(Mt))),i=this.getLookAtWorldPosition(Kr),r=eo.copy(e).sub(i).applyQuaternion(n).normalize(),[o,s]=Xe(this.faceFront),[l,a]=Xe(r),u=Wn(l-o),d=Wn(s-a);this._yaw=V.MathUtils.RAD2DEG*u,this._pitch=V.MathUtils.RAD2DEG*d,this._needsUpdate=!0}update(e){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(Jr)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};li.EULER_ORDER="YXZ";var di=li,io=new L.Vector3(0,0,1),G=new L.Quaternion,fe=new L.Quaternion,N=new L.Euler(0,0,0,"YXZ"),He=class{constructor(t,e,n,i,r){this.humanoid=t,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r,this.faceFront=new L.Vector3(0,0,1),this._restQuatLeftEye=new L.Quaternion,this._restQuatRightEye=new L.Quaternion,this._restLeftEyeParentWorldQuat=new L.Quaternion,this._restRightEyeParentWorldQuat=new L.Quaternion;let o=this.humanoid.getRawBoneNode("leftEye"),s=this.humanoid.getRawBoneNode("rightEye");o&&(this._restQuatLeftEye.copy(o.quaternion),Ht(o.parent,this._restLeftEyeParentWorldQuat)),s&&(this._restQuatRightEye.copy(s.quaternion),Ht(s.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(t,e){let n=this.humanoid.getRawBoneNode("leftEye"),i=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),o=this.humanoid.getNormalizedBoneNode("rightEye");n&&(e<0?N.x=-L.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-e):N.x=L.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(e),t<0?N.y=-L.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(-t):N.y=L.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(t),G.setFromEuler(N),this._getWorldFaceFrontQuat(fe),r.quaternion.copy(fe).multiply(G).multiply(fe.invert()),G.copy(this._restLeftEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(G).premultiply(G.invert()).multiply(this._restQuatLeftEye)),i&&(e<0?N.x=-L.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-e):N.x=L.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(e),t<0?N.y=-L.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(-t):N.y=L.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(t),G.setFromEuler(N),this._getWorldFaceFrontQuat(fe),o.quaternion.copy(fe).multiply(G).multiply(fe.invert()),G.copy(this._restRightEyeParentWorldQuat),i.quaternion.copy(o.quaternion).multiply(G).premultiply(G.invert()).multiply(this._restQuatRightEye))}lookAt(t){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=L.MathUtils.RAD2DEG*t.y,n=L.MathUtils.RAD2DEG*t.x;this.applyYawPitch(e,n)}_getWorldFaceFrontQuat(t){if(this.faceFront.distanceToSquared(io)<.01)return t.identity();let[e,n]=Xe(this.faceFront);return N.set(0,.5*Math.PI+e,n,"YZX"),t.setFromEuler(N)}};He.type="bone";var Ye=class{constructor(t,e,n,i,r){this.expressions=t,this.rangeMapHorizontalInner=e,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r}applyYawPitch(t,e){e<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-e))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(e))),t<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-t))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(t)))}lookAt(t){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let e=Lt.MathUtils.RAD2DEG*t.y,n=Lt.MathUtils.RAD2DEG*t.x;this.applyYawPitch(e,n)}};Ye.type="expression";var It=class{constructor(t,e){this.inputMaxValue=t,this.outputScale=e}map(t){return this.outputScale*Qn(t/this.inputMaxValue)}},ro=new Set(["1.0","1.0-beta"]),ze=.01,Ke=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(t,e){this.parser=t,this.helperRoot=e==null?void 0:e.helperRoot}afterRoot(t){return x(this,null,function*(){let e=t.userData.vrmHumanoid;if(e===null)return;if(e===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");let n=t.userData.vrmExpressionManager;if(n!==null){if(n===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");t.userData.vrmLookAt=yield this._import(t,e,n)}})}_import(t,e,n){return x(this,null,function*(){if(e==null||n==null)return null;let i=yield this._v1Import(t,e,n);if(i)return i;let r=yield this._v0Import(t,e,n);return r||null})}_v1Import(t,e,n){return x(this,null,function*(){var i,r,o;let s=this.parser.json;if(!(((i=s.extensionsUsed)==null?void 0:i.indexOf("VRMC_vrm"))!==-1))return null;let a=(r=s.extensions)==null?void 0:r.VRMC_vrm;if(!a)return null;let u=a.specVersion;if(!ro.has(u))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${u}"`),null;let d=a.lookAt;if(!d)return null;let h=d.type==="expression"?1:10,c=this._v1ImportRangeMap(d.rangeMapHorizontalInner,h),p=this._v1ImportRangeMap(d.rangeMapHorizontalOuter,h),f=this._v1ImportRangeMap(d.rangeMapVerticalDown,h),m=this._v1ImportRangeMap(d.rangeMapVerticalUp,h),g;d.type==="expression"?g=new Ye(n,c,p,f,m):g=new He(e,c,p,f,m);let _=this._importLookAt(e,g);return _.offsetFromHeadBone.fromArray((o=d.offsetFromHeadBone)!=null?o:[0,.06,0]),_})}_v1ImportRangeMap(t,e){var n,i;let r=(n=t==null?void 0:t.inputMaxValue)!=null?n:90,o=(i=t==null?void 0:t.outputScale)!=null?i:e;return r<ze&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),r=ze),new It(r,o)}_v0Import(t,e,n){return x(this,null,function*(){var i,r,o,s;let a=(i=this.parser.json.extensions)==null?void 0:i.VRM;if(!a)return null;let u=a.firstPerson;if(!u)return null;let d=u.lookAtTypeName==="BlendShape"?1:10,h=this._v0ImportDegreeMap(u.lookAtHorizontalInner,d),c=this._v0ImportDegreeMap(u.lookAtHorizontalOuter,d),p=this._v0ImportDegreeMap(u.lookAtVerticalDown,d),f=this._v0ImportDegreeMap(u.lookAtVerticalUp,d),m;u.lookAtTypeName==="BlendShape"?m=new Ye(n,h,c,p,f):m=new He(e,h,c,p,f);let g=this._importLookAt(e,m);return u.firstPersonBoneOffset?g.offsetFromHeadBone.set((r=u.firstPersonBoneOffset.x)!=null?r:0,(o=u.firstPersonBoneOffset.y)!=null?o:.06,-((s=u.firstPersonBoneOffset.z)!=null?s:0)):g.offsetFromHeadBone.set(0,.06,0),g.faceFront.set(0,0,-1),m instanceof He&&m.faceFront.set(0,0,-1),g})}_v0ImportDegreeMap(t,e){var n,i;let r=t==null?void 0:t.curve;JSON.stringify(r)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let o=(n=t==null?void 0:t.xRange)!=null?n:90,s=(i=t==null?void 0:t.yRange)!=null?i:e;return o<ze&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),o=ze),new It(o,s)}_importLookAt(t,e){let n=new di(t,e);if(this.helperRoot){let i=new ai(n);this.helperRoot.add(i),i.renderOrder=this.helperRoot.renderOrder}return n}},oo={Bone:"bone",Expression:"expression"};function so(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}var ao=new Set(["1.0","1.0-beta"]),et=class{get name(){return"VRMMetaLoaderPlugin"}constructor(t,e){var n,i,r;this.parser=t,this.needThumbnailImage=(n=e==null?void 0:e.needThumbnailImage)!=null?n:!1,this.acceptLicenseUrls=(i=e==null?void 0:e.acceptLicenseUrls)!=null?i:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(r=e==null?void 0:e.acceptV0Meta)!=null?r:!0}afterRoot(t){return x(this,null,function*(){t.userData.vrmMeta=yield this._import(t)})}_import(t){return x(this,null,function*(){let e=yield this._v1Import(t);if(e!=null)return e;let n=yield this._v0Import(t);return n!=null?n:null})}_v1Import(t){return x(this,null,function*(){var e,n,i;let r=this.parser.json;if(!(((e=r.extensionsUsed)==null?void 0:e.indexOf("VRMC_vrm"))!==-1))return null;let s=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(s==null)return null;let l=s.specVersion;if(!ao.has(l))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let a=s.meta;if(!a)return null;let u=a.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(u))throw new Error(`VRMMetaLoaderPlugin: The license url "${u}" is not accepted`);let h;return this.needThumbnailImage&&a.thumbnailImage!=null&&(h=(i=yield this._extractGLTFImage(a.thumbnailImage))!=null?i:void 0),{metaVersion:"1",name:a.name,version:a.version,authors:a.authors,copyrightInformation:a.copyrightInformation,contactInformation:a.contactInformation,references:a.references,thirdPartyLicenses:a.thirdPartyLicenses,thumbnailImage:h,licenseUrl:a.licenseUrl,avatarPermission:a.avatarPermission,allowExcessivelyViolentUsage:a.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:a.allowExcessivelySexualUsage,commercialUsage:a.commercialUsage,allowPoliticalOrReligiousUsage:a.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:a.allowAntisocialOrHateUsage,creditNotation:a.creditNotation,allowRedistribution:a.allowRedistribution,modification:a.modification,otherLicenseUrl:a.otherLicenseUrl}})}_v0Import(t){return x(this,null,function*(){var e;let i=(e=this.parser.json.extensions)==null?void 0:e.VRM;if(!i)return null;let r=i.meta;if(!r)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let o;return this.needThumbnailImage&&r.texture!=null&&r.texture!==-1&&(o=yield this.parser.getDependency("texture",r.texture)),{metaVersion:"0",allowedUserName:r.allowedUserName,author:r.author,commercialUssageName:r.commercialUssageName,contactInformation:r.contactInformation,licenseName:r.licenseName,otherLicenseUrl:r.otherLicenseUrl,otherPermissionUrl:r.otherPermissionUrl,reference:r.reference,sexualUssageName:r.sexualUssageName,texture:o!=null?o:void 0,title:r.title,version:r.version,violentUssageName:r.violentUssageName}})}_extractGLTFImage(t){return x(this,null,function*(){var e;let i=(e=this.parser.json.images)==null?void 0:e[t];if(i==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${t}] of glTF as a thumbnail but the image doesn't exist`),null;let r=i.uri;if(i.bufferView!=null){let s=yield this.parser.getDependency("bufferView",i.bufferView),l=new Blob([s],{type:i.mimeType});r=URL.createObjectURL(l)}return r==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${t}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new hi.ImageLoader().loadAsync(so(r,this.parser.options.path)).catch(s=>(console.error(s),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},tt=class{constructor(t){this.scene=t.scene,this.meta=t.meta,this.humanoid=t.humanoid,this.expressionManager=t.expressionManager,this.firstPerson=t.firstPerson,this.lookAt=t.lookAt}update(t){this.humanoid.update(),this.lookAt&&this.lookAt.update(t),this.expressionManager&&this.expressionManager.update()}},lo=class{get name(){return"VRMC_vrm"}constructor(t,e){var n,i,r,o,s;this.parser=t;let l=e==null?void 0:e.helperRoot,a=e==null?void 0:e.autoUpdateHumanBones;this.expressionPlugin=(n=e==null?void 0:e.expressionPlugin)!=null?n:new qe(t),this.firstPersonPlugin=(i=e==null?void 0:e.firstPersonPlugin)!=null?i:new Ze(t),this.humanoidPlugin=(r=e==null?void 0:e.humanoidPlugin)!=null?r:new Je(t,{helperRoot:l,autoUpdateHumanBones:a}),this.lookAtPlugin=(o=e==null?void 0:e.lookAtPlugin)!=null?o:new Ke(t,{helperRoot:l}),this.metaPlugin=(s=e==null?void 0:e.metaPlugin)!=null?s:new et(t)}afterRoot(t){return x(this,null,function*(){yield this.metaPlugin.afterRoot(t),yield this.humanoidPlugin.afterRoot(t),yield this.expressionPlugin.afterRoot(t),yield this.lookAtPlugin.afterRoot(t),yield this.firstPersonPlugin.afterRoot(t);let e=t.userData.vrmMeta,n=t.userData.vrmHumanoid;if(e&&n){let i=new tt({scene:t.scene,expressionManager:t.userData.vrmExpressionManager,firstPerson:t.userData.vrmFirstPerson,humanoid:n,lookAt:t.userData.vrmLookAt,meta:e});t.userData.vrmCore=i}})}};var ve=class extends tt{constructor(e){super(e),this.materials=e.materials,this.springBoneManager=e.springBoneManager,this.nodeConstraintManager=e.nodeConstraintManager}update(e){super.update(e),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(e),this.materials&&this.materials.forEach(n=>{n.update&&n.update(e)})}};var it=v(require("three"),1),mi=v(require("three"),1),gi=v(require("three"),1),y=v(require("three"),1),vi=v(require("three"),1);var uo=Object.defineProperty,ci=Object.getOwnPropertySymbols,ho=Object.prototype.hasOwnProperty,co=Object.prototype.propertyIsEnumerable,pi=(t,e,n)=>e in t?uo(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fi=(t,e)=>{for(var n in e||(e={}))ho.call(e,n)&&pi(t,n,e[n]);if(ci)for(var n of ci(e))co.call(e,n)&&pi(t,n,e[n]);return t},ue=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())}),po={"":3e3,srgb:3001};function fo(t,e){parseInt(gi.REVISION,10)>=152?t.colorSpace=e:t.encoding=po[e]}var mo=class{get pending(){return Promise.all(this._pendings)}constructor(t,e){this._parser=t,this._materialParams=e,this._pendings=[]}assignPrimitive(t,e){e!=null&&(this._materialParams[t]=e)}assignColor(t,e,n){if(e!=null){let i=new mi.Color().fromArray(e);n&&i.convertSRGBToLinear(),this._materialParams[t]=i}}assignTexture(t,e,n){return ue(this,null,function*(){let i=ue(this,null,function*(){e!=null&&(yield this._parser.assignTexture(this._materialParams,t,e),n&&fo(this._materialParams[t],"srgb"))});return this._pendings.push(i),i})}assignTextureByIndex(t,e,n){return ue(this,null,function*(){return this.assignTexture(t,e!=null?{index:e}:void 0,n)})}},go=`// #define PHONG

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

}`,_o=`// #define PHONG

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
    // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS, r144+ uses NUM_SPOT_LIGHT_COORDS
    #if THREE_VRM_THREE_REVISION >= 144
      #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_COORDS > 0
      SpotLightShadow spotLightShadow;
      #endif
    #elif defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
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
      // COMPAT: pre-r144 uses NUM_SPOT_LIGHT_SHADOWS and vSpotShadowCoord, r144+ uses NUM_SPOT_LIGHT_COORDS and vSpotLightCoord
      // COMPAT: pre-r166 does not have shadowIntensity, r166+ has shadowIntensity
      #if THREE_VRM_THREE_REVISION >= 166
        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )
        spotLightShadow = spotLightShadows[ i ];
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
        #endif
      #elif THREE_VRM_THREE_REVISION >= 144
        #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_COORDS )
        spotLightShadow = spotLightShadows[ i ];
        shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
        #endif
      #elif defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      spotLightShadow = spotLightShadows[ i ];
      shadow = all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
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
  vec3 rimMix = mix( vec3( 1.0 ), reflectedLight.directSpecular, rimLightingMixFactor );

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
`,_i={None:"none",Normal:"normal",LitShadeRate:"litShadeRate",UV:"uv"},Bt={None:"none",WorldCoordinates:"worldCoordinates",ScreenCoordinates:"screenCoordinates"},vo={3e3:"",3001:"srgb"};function Ut(t){return parseInt(vi.REVISION,10)>=152?t.colorSpace:vo[t.encoding]}var Ei=class extends y.ShaderMaterial{constructor(t={}){var e;super({vertexShader:go,fragmentShader:_o}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=y.TangentSpaceNormalMap,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=_i.None,this._outlineWidthMode=Bt.None,this._isOutline=!1,t.transparentWithZWrite&&(t.depthWrite=!0),delete t.transparentWithZWrite,t.fog=!0,t.lights=!0,t.clipping=!0,this.uniforms=y.UniformsUtils.merge([y.UniformsLib.common,y.UniformsLib.normalmap,y.UniformsLib.emissivemap,y.UniformsLib.fog,y.UniformsLib.lights,{litFactor:{value:new y.Color(1,1,1)},mapUvTransform:{value:new y.Matrix3},colorAlpha:{value:1},normalMapUvTransform:{value:new y.Matrix3},shadeColorFactor:{value:new y.Color(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new y.Matrix3},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new y.Matrix3},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new y.Color(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new y.Matrix3},parametricRimColorFactor:{value:new y.Color(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new y.Matrix3},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new y.Color(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new y.Matrix3},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new y.Matrix3},outlineWidthFactor:{value:0},outlineColorFactor:{value:new y.Color(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new y.Matrix3},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(e=t.uniforms)!=null?e:{}]),this.setValues(t),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([n,i])=>`${n}:${i}`),this.matcapTexture?`matcapTextureColorSpace:${Ut(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${Ut(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${Ut(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=n=>{let i=parseInt(y.REVISION,10),r=Object.entries(fi(fi({},this._generateDefines()),this.defines)).filter(([o,s])=>!!s).map(([o,s])=>`#define ${o} ${s}`).join(`
`)+`
`;n.vertexShader=r+n.vertexShader,n.fragmentShader=r+n.fragmentShader,i<154&&(n.fragmentShader=n.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(t){this.uniforms.litFactor.value=t}get map(){return this.uniforms.map.value}set map(t){this.uniforms.map.value=t}get normalMap(){return this.uniforms.normalMap.value}set normalMap(t){this.uniforms.normalMap.value=t}get normalScale(){return this.uniforms.normalScale.value}set normalScale(t){this.uniforms.normalScale.value=t}get emissive(){return this.uniforms.emissive.value}set emissive(t){this.uniforms.emissive.value=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(t){this.uniforms.emissiveIntensity.value=t}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(t){this.uniforms.emissiveMap.value=t}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(t){this.uniforms.shadeColorFactor.value=t}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(t){this.uniforms.shadeMultiplyTexture.value=t}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(t){this.uniforms.shadingShiftFactor.value=t}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(t){this.uniforms.shadingShiftTexture.value=t}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(t){this.uniforms.shadingShiftTextureScale.value=t}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(t){this.uniforms.shadingToonyFactor.value=t}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(t){this.uniforms.giEqualizationFactor.value=t}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(t){this.uniforms.matcapFactor.value=t}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(t){this.uniforms.matcapTexture.value=t}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(t){this.uniforms.parametricRimColorFactor.value=t}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(t){this.uniforms.rimMultiplyTexture.value=t}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(t){this.uniforms.rimLightingMixFactor.value=t}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(t){this.uniforms.parametricRimFresnelPowerFactor.value=t}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(t){this.uniforms.parametricRimLiftFactor.value=t}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(t){this.uniforms.outlineWidthMultiplyTexture.value=t}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(t){this.uniforms.outlineWidthFactor.value=t}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(t){this.uniforms.outlineColorFactor.value=t}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(t){this.uniforms.outlineLightingMixFactor.value=t}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(t){this.uniforms.uvAnimationMaskTexture.value=t}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(t){this.uniforms.uvAnimationScrollXOffset.value=t}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(t){this.uniforms.uvAnimationScrollYOffset.value=t}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(t){this.uniforms.uvAnimationRotationPhase.value=t}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(t){this._ignoreVertexColor=t,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(t){this._v0CompatShade=t,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(t){this._debugMode=t,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(t){this._outlineWidthMode=t,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(t){this._isOutline=t,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(t){this._uploadUniformsWorkaround(),this._updateUVAnimation(t)}copy(t){return super.copy(t),this.map=t.map,this.normalMap=t.normalMap,this.emissiveMap=t.emissiveMap,this.shadeMultiplyTexture=t.shadeMultiplyTexture,this.shadingShiftTexture=t.shadingShiftTexture,this.matcapTexture=t.matcapTexture,this.rimMultiplyTexture=t.rimMultiplyTexture,this.outlineWidthMultiplyTexture=t.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=t.uvAnimationMaskTexture,this.normalMapType=t.normalMapType,this.uvAnimationScrollXSpeedFactor=t.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=t.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=t.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=t.ignoreVertexColor,this.v0CompatShade=t.v0CompatShade,this.debugMode=t.debugMode,this.outlineWidthMode=t.outlineWidthMode,this.isOutline=t.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(t){this.uniforms.uvAnimationScrollXOffset.value+=t*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=t*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=t*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){let t=parseInt(y.REVISION,10),e=this.outlineWidthMultiplyTexture!==null,n=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:t,OUTLINE:this._isOutline,MTOON_USE_UV:e||n,MTOON_UVS_VERTEX_ONLY:e&&!n,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===Bt.ScreenCoordinates}}_updateTextureMatrix(t,e){t.value&&(t.value.matrixAutoUpdate&&t.value.updateMatrix(),e.value.copy(t.value.matrix))}},Eo=new Set(["1.0","1.0-beta"]),Mi=class nt{get name(){return nt.EXTENSION_NAME}constructor(e,n={}){var i,r,o,s;this.parser=e,this.materialType=(i=n.materialType)!=null?i:Ei,this.renderOrderOffset=(r=n.renderOrderOffset)!=null?r:0,this.v0CompatShade=(o=n.v0CompatShade)!=null?o:!1,this.debugMode=(s=n.debugMode)!=null?s:"none",this._mToonMaterialSet=new Set}beforeRoot(){return ue(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(e){return ue(this,null,function*(){e.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(e){return this._getMToonExtension(e)?this.materialType:null}extendMaterialParams(e,n){let i=this._getMToonExtension(e);return i?this._extendMaterialParams(i,n):null}loadMesh(e){return ue(this,null,function*(){var n;let i=this.parser,o=(n=i.json.meshes)==null?void 0:n[e];if(o==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${e}] of glTF but the mesh doesn't exist`);let s=o.primitives,l=yield i.loadMesh(e);if(s.length===1){let a=l,u=s[0].material;u!=null&&this._setupPrimitive(a,u)}else{let a=l;for(let u=0;u<s.length;u++){let d=a.children[u],h=s[u].material;h!=null&&this._setupPrimitive(d,h)}}return l})}_removeUnlitExtensionIfMToonExists(){let i=this.parser.json.materials;i==null||i.map((r,o)=>{var s;this._getMToonExtension(o)&&((s=r.extensions)!=null&&s.KHR_materials_unlit)&&delete r.extensions.KHR_materials_unlit})}_getMToonExtension(e){var n,i;let s=(n=this.parser.json.materials)==null?void 0:n[e];if(s==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let l=(i=s.extensions)==null?void 0:i[nt.EXTENSION_NAME];if(l==null)return;let a=l.specVersion;if(!Eo.has(a)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${nt.EXTENSION_NAME} specVersion "${a}"`);return}return l}_extendMaterialParams(e,n){return ue(this,null,function*(){var i;delete n.metalness,delete n.roughness;let r=new mo(this.parser,n);r.assignPrimitive("transparentWithZWrite",e.transparentWithZWrite),r.assignColor("shadeColorFactor",e.shadeColorFactor),r.assignTexture("shadeMultiplyTexture",e.shadeMultiplyTexture,!0),r.assignPrimitive("shadingShiftFactor",e.shadingShiftFactor),r.assignTexture("shadingShiftTexture",e.shadingShiftTexture,!0),r.assignPrimitive("shadingShiftTextureScale",(i=e.shadingShiftTexture)==null?void 0:i.scale),r.assignPrimitive("shadingToonyFactor",e.shadingToonyFactor),r.assignPrimitive("giEqualizationFactor",e.giEqualizationFactor),r.assignColor("matcapFactor",e.matcapFactor),r.assignTexture("matcapTexture",e.matcapTexture,!0),r.assignColor("parametricRimColorFactor",e.parametricRimColorFactor),r.assignTexture("rimMultiplyTexture",e.rimMultiplyTexture,!0),r.assignPrimitive("rimLightingMixFactor",e.rimLightingMixFactor),r.assignPrimitive("parametricRimFresnelPowerFactor",e.parametricRimFresnelPowerFactor),r.assignPrimitive("parametricRimLiftFactor",e.parametricRimLiftFactor),r.assignPrimitive("outlineWidthMode",e.outlineWidthMode),r.assignPrimitive("outlineWidthFactor",e.outlineWidthFactor),r.assignTexture("outlineWidthMultiplyTexture",e.outlineWidthMultiplyTexture,!1),r.assignColor("outlineColorFactor",e.outlineColorFactor),r.assignPrimitive("outlineLightingMixFactor",e.outlineLightingMixFactor),r.assignTexture("uvAnimationMaskTexture",e.uvAnimationMaskTexture,!1),r.assignPrimitive("uvAnimationScrollXSpeedFactor",e.uvAnimationScrollXSpeedFactor),r.assignPrimitive("uvAnimationScrollYSpeedFactor",e.uvAnimationScrollYSpeedFactor),r.assignPrimitive("uvAnimationRotationSpeedFactor",e.uvAnimationRotationSpeedFactor),r.assignPrimitive("v0CompatShade",this.v0CompatShade),r.assignPrimitive("debugMode",this.debugMode),yield r.pending})}_setupPrimitive(e,n){let i=this._getMToonExtension(n);if(i){let r=this._parseRenderOrder(i);e.renderOrder=r+this.renderOrderOffset,this._generateOutline(e),this._addToMaterialSet(e);return}}_shouldGenerateOutline(e){return typeof e.outlineWidthMode=="string"&&e.outlineWidthMode!=="none"&&typeof e.outlineWidthFactor=="number"&&e.outlineWidthFactor>0}_generateOutline(e){let n=e.material;if(!(n instanceof it.Material)||!this._shouldGenerateOutline(n))return;e.material=[n];let i=n.clone();i.name+=" (Outline)",i.isOutline=!0,i.side=it.BackSide,e.material.push(i);let r=e.geometry,o=r.index?r.index.count:r.attributes.position.count/3;r.addGroup(0,o,0),r.addGroup(0,o,1)}_addToMaterialSet(e){let n=e.material,i=new Set;Array.isArray(n)?n.forEach(r=>i.add(r)):i.add(n);for(let r of i)this._mToonMaterialSet.add(r)}_parseRenderOrder(e){var n;return(e.transparentWithZWrite?0:19)+((n=e.renderQueueOffsetNumber)!=null?n:0)}};Mi.EXTENSION_NAME="VRMC_materials_mtoon";var Nt=Mi;var Mo=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())}),Ri=class Dt{get name(){return Dt.EXTENSION_NAME}constructor(e){this.parser=e}extendMaterialParams(e,n){return Mo(this,null,function*(){let i=this._getHDREmissiveMultiplierExtension(e);if(i==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");let r=i.emissiveMultiplier;n.emissiveIntensity=r})}_getHDREmissiveMultiplierExtension(e){var n,i;let s=(n=this.parser.json.materials)==null?void 0:n[e];if(s==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${e}] of glTF but the material doesn't exist`);return}let l=(i=s.extensions)==null?void 0:i[Dt.EXTENSION_NAME];if(l!=null)return l}};Ri.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var Ti=Ri;var Si=v(require("three"),1);var Ro=Object.defineProperty,To=Object.defineProperties,xo=Object.getOwnPropertyDescriptors,xi=Object.getOwnPropertySymbols,yo=Object.prototype.hasOwnProperty,wo=Object.prototype.propertyIsEnumerable,yi=(t,e,n)=>e in t?Ro(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,z=(t,e)=>{for(var n in e||(e={}))yo.call(e,n)&&yi(t,n,e[n]);if(xi)for(var n of xi(e))wo.call(e,n)&&yi(t,n,e[n]);return t},wi=(t,e)=>To(t,xo(e)),So=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())});function Ee(t){return Math.pow(t,2.2)}var Ai=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(t){var e;this.parser=t,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;let n=this.parser.json;n.extensionsUsed=(e=n.extensionsUsed)!=null?e:[],n.extensionsUsed.indexOf("KHR_texture_transform")===-1&&n.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return So(this,null,function*(){var t;let e=this.parser.json,n=(t=e.extensions)==null?void 0:t.VRM,i=n==null?void 0:n.materialProperties;i&&(this._populateRenderQueueMap(i),i.forEach((r,o)=>{var s,l;let a=(s=e.materials)==null?void 0:s[o];if(a==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${o}] of glTF but the material doesn't exist`);return}if(r.shader==="VRM/MToon"){let u=this._parseV0MToonProperties(r,a);e.materials[o]=u}else if((l=r.shader)!=null&&l.startsWith("VRM/Unlit")){let u=this._parseV0UnlitProperties(r,a);e.materials[o]=u}else r.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${r.shader}`)}))})}_parseV0MToonProperties(t,e){var n,i,r,o,s,l,a,u,d,h,c,p,f,m,g,_,w,T,R,E,M,S,A,I,b,H,C,J,we,Se,Q,W,pe,Ae,U,Jt,Kt,en,tn,nn,rn,on,sn,an,ln,un,dn,hn,cn,pn,fn,mn,gn,_n,vn;let En=(i=(n=t.keywordMap)==null?void 0:n._ALPHABLEND_ON)!=null?i:!1,Ki=((r=t.floatProperties)==null?void 0:r._ZWrite)===1&&En,er=this._v0ParseRenderQueue(t),Mn=(s=(o=t.keywordMap)==null?void 0:o._ALPHATEST_ON)!=null?s:!1,tr=En?"BLEND":Mn?"MASK":"OPAQUE",nr=Mn?(a=(l=t.floatProperties)==null?void 0:l._Cutoff)!=null?a:.5:void 0,ir=((d=(u=t.floatProperties)==null?void 0:u._CullMode)!=null?d:2)===0,se=this._portTextureTransform(t),rr=((c=(h=t.vectorProperties)==null?void 0:h._Color)!=null?c:[1,1,1,1]).map((bn,Pr)=>Pr===3?bn:Ee(bn)),Rn=(p=t.textureProperties)==null?void 0:p._MainTex,or=Rn!=null?{index:Rn,extensions:z({},se)}:void 0,sr=(m=(f=t.floatProperties)==null?void 0:f._BumpScale)!=null?m:1,Tn=(g=t.textureProperties)==null?void 0:g._BumpMap,ar=Tn!=null?{index:Tn,scale:sr,extensions:z({},se)}:void 0,lr=((w=(_=t.vectorProperties)==null?void 0:_._EmissionColor)!=null?w:[0,0,0,1]).map(Ee),xn=(T=t.textureProperties)==null?void 0:T._EmissionMap,ur=xn!=null?{index:xn,extensions:z({},se)}:void 0,dr=((E=(R=t.vectorProperties)==null?void 0:R._ShadeColor)!=null?E:[.97,.81,.86,1]).map(Ee),yn=(M=t.textureProperties)==null?void 0:M._ShadeTexture,hr=yn!=null?{index:yn,extensions:z({},se)}:void 0,De=(A=(S=t.floatProperties)==null?void 0:S._ShadeShift)!=null?A:0,Fe=(b=(I=t.floatProperties)==null?void 0:I._ShadeToony)!=null?b:.9;Fe=Si.MathUtils.lerp(Fe,1,.5+.5*De),De=-De-(1-Fe);let wn=(C=(H=t.floatProperties)==null?void 0:H._IndirectLightIntensity)!=null?C:.1,cr=wn?1-wn:void 0,_t=(J=t.textureProperties)==null?void 0:J._SphereAdd,pr=_t!=null?[1,1,1]:void 0,fr=_t!=null?{index:_t}:void 0,mr=(Se=(we=t.floatProperties)==null?void 0:we._RimLightingMix)!=null?Se:0,Sn=(Q=t.textureProperties)==null?void 0:Q._RimTexture,gr=Sn!=null?{index:Sn,extensions:z({},se)}:void 0,_r=((pe=(W=t.vectorProperties)==null?void 0:W._RimColor)!=null?pe:[0,0,0,1]).map(Ee),vr=(U=(Ae=t.floatProperties)==null?void 0:Ae._RimFresnelPower)!=null?U:1,Er=(Kt=(Jt=t.floatProperties)==null?void 0:Jt._RimLift)!=null?Kt:0,Mr=["none","worldCoordinates","screenCoordinates"][(tn=(en=t.floatProperties)==null?void 0:en._OutlineWidthMode)!=null?tn:0],vt=(rn=(nn=t.floatProperties)==null?void 0:nn._OutlineWidth)!=null?rn:0;vt=.01*vt;let An=(on=t.textureProperties)==null?void 0:on._OutlineWidthTexture,Rr=An!=null?{index:An,extensions:z({},se)}:void 0,Tr=((an=(sn=t.vectorProperties)==null?void 0:sn._OutlineColor)!=null?an:[0,0,0]).map(Ee),xr=((un=(ln=t.floatProperties)==null?void 0:ln._OutlineColorMode)!=null?un:0)===1?(hn=(dn=t.floatProperties)==null?void 0:dn._OutlineLightingMix)!=null?hn:1:0,Pn=(cn=t.textureProperties)==null?void 0:cn._UvAnimMaskTexture,yr=Pn!=null?{index:Pn,extensions:z({},se)}:void 0,wr=(fn=(pn=t.floatProperties)==null?void 0:pn._UvAnimScrollX)!=null?fn:0,ke=(gn=(mn=t.floatProperties)==null?void 0:mn._UvAnimScrollY)!=null?gn:0;ke!=null&&(ke=-ke);let Sr=(vn=(_n=t.floatProperties)==null?void 0:_n._UvAnimRotation)!=null?vn:0,Ar={specVersion:"1.0",transparentWithZWrite:Ki,renderQueueOffsetNumber:er,shadeColorFactor:dr,shadeMultiplyTexture:hr,shadingShiftFactor:De,shadingToonyFactor:Fe,giEqualizationFactor:cr,matcapFactor:pr,matcapTexture:fr,rimLightingMixFactor:mr,rimMultiplyTexture:gr,parametricRimColorFactor:_r,parametricRimFresnelPowerFactor:vr,parametricRimLiftFactor:Er,outlineWidthMode:Mr,outlineWidthFactor:vt,outlineWidthMultiplyTexture:Rr,outlineColorFactor:Tr,outlineLightingMixFactor:xr,uvAnimationMaskTexture:yr,uvAnimationScrollXSpeedFactor:wr,uvAnimationScrollYSpeedFactor:ke,uvAnimationRotationSpeedFactor:Sr};return wi(z({},e),{pbrMetallicRoughness:{baseColorFactor:rr,baseColorTexture:or},normalTexture:ar,emissiveTexture:ur,emissiveFactor:lr,alphaMode:tr,alphaCutoff:nr,doubleSided:ir,extensions:{VRMC_materials_mtoon:Ar}})}_parseV0UnlitProperties(t,e){var n,i,r,o,s;let l=t.shader==="VRM/UnlitTransparentZWrite",a=t.shader==="VRM/UnlitTransparent"||l,u=this._v0ParseRenderQueue(t),d=t.shader==="VRM/UnlitCutout",h=a?"BLEND":d?"MASK":"OPAQUE",c=d?(i=(n=t.floatProperties)==null?void 0:n._Cutoff)!=null?i:.5:void 0,p=this._portTextureTransform(t),f=((o=(r=t.vectorProperties)==null?void 0:r._Color)!=null?o:[1,1,1,1]).map(Ee),m=(s=t.textureProperties)==null?void 0:s._MainTex,g=m!=null?{index:m,extensions:z({},p)}:void 0,_={specVersion:"1.0",transparentWithZWrite:l,renderQueueOffsetNumber:u,shadeColorFactor:f,shadeMultiplyTexture:g};return wi(z({},e),{pbrMetallicRoughness:{baseColorFactor:f,baseColorTexture:g},alphaMode:h,alphaCutoff:c,extensions:{VRMC_materials_mtoon:_}})}_portTextureTransform(t){var e,n,i,r,o;let s=(e=t.vectorProperties)==null?void 0:e._MainTex;if(s==null)return{};let l=[(n=s==null?void 0:s[0])!=null?n:0,(i=s==null?void 0:s[1])!=null?i:0],a=[(r=s==null?void 0:s[2])!=null?r:1,(o=s==null?void 0:s[3])!=null?o:1];return l[1]=1-a[1]-l[1],{KHR_texture_transform:{offset:l,scale:a}}}_v0ParseRenderQueue(t){var e,n;let i=t.shader==="VRM/UnlitTransparentZWrite",r=((e=t.keywordMap)==null?void 0:e._ALPHABLEND_ON)!=null||t.shader==="VRM/UnlitTransparent"||i,o=((n=t.floatProperties)==null?void 0:n._ZWrite)===1||i,s=0;if(r){let l=t.renderQueue;l!=null&&(o?s=this._renderQueueMapTransparentZWrite.get(l):s=this._renderQueueMapTransparent.get(l))}return s}_populateRenderQueueMap(t){let e=new Set,n=new Set;t.forEach(i=>{var r,o;let s=i.shader==="VRM/UnlitTransparentZWrite",l=((r=i.keywordMap)==null?void 0:r._ALPHABLEND_ON)!=null||i.shader==="VRM/UnlitTransparent"||s,a=((o=i.floatProperties)==null?void 0:o._ZWrite)===1||s;if(l){let u=i.renderQueue;u!=null&&(a?n.add(u):e.add(u))}}),e.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${e.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),n.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${n.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(e).sort().forEach((i,r)=>{let o=Math.min(Math.max(r-e.size+1,-9),0);this._renderQueueMapTransparent.set(i,o)}),Array.from(n).sort().forEach((i,r)=>{let o=Math.min(Math.max(r,0),9);this._renderQueueMapTransparentZWrite.set(i,o)})}};var B=v(require("three"),1),j=v(require("three"),1),Ft=v(require("three"),1),Ve=v(require("three"),1),q=v(require("three"),1);var Pi=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())}),te=new B.Vector3,rt=class extends B.Group{constructor(t){super(),this._attrPosition=new B.BufferAttribute(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(B.DynamicDrawUsage);let e=new B.BufferGeometry;e.setAttribute("position",this._attrPosition);let n=new B.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new B.Line(e,n),this.add(this._line),this.constraint=t}updateMatrixWorld(t){te.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,te.x,te.y,te.z),this.constraint.source&&te.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,te.x,te.y,te.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(t)}};function bi(t,e){return e.set(t.elements[12],t.elements[13],t.elements[14])}var Ao=new Ft.Vector3,Po=new Ft.Vector3;function bo(t,e){return t.decompose(Ao,e,Po),e}function ot(t){return t.invert?t.invert():t.inverse(),t}var st=class{constructor(t,e){this.destination=t,this.source=e,this.weight=1}},Ho=new j.Vector3,Lo=new j.Vector3,Io=new j.Vector3,Vo=new j.Quaternion,Co=new j.Quaternion,Oo=new j.Quaternion,Hi=class extends st{get aimAxis(){return this._aimAxis}set aimAxis(t){this._aimAxis=t,this._v3AimAxis.set(t==="PositiveX"?1:t==="NegativeX"?-1:0,t==="PositiveY"?1:t==="NegativeY"?-1:0,t==="PositiveZ"?1:t==="NegativeZ"?-1:0)}get dependencies(){let t=new Set([this.source]);return this.destination.parent&&t.add(this.destination.parent),t}constructor(t,e){super(t,e),this._aimAxis="PositiveX",this._v3AimAxis=new j.Vector3(1,0,0),this._dstRestQuat=new j.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);let t=Vo.identity(),e=Co.identity();this.destination.parent&&(bo(this.destination.parent.matrixWorld,t),ot(e.copy(t)));let n=Ho.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(t),i=bi(this.source.matrixWorld,Lo).sub(bi(this.destination.matrixWorld,Io)).normalize(),r=Oo.setFromUnitVectors(n,i).premultiply(e).multiply(t).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(r,this.weight)}};function Uo(t,e){let n=[t],i=t.parent;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{e(r)})}var Li=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(t){this._constraints.add(t);let e=this._objectConstraintsMap.get(t.destination);e==null&&(e=new Set,this._objectConstraintsMap.set(t.destination,e)),e.add(t)}deleteConstraint(t){this._constraints.delete(t),this._objectConstraintsMap.get(t.destination).delete(t)}setInitState(){let t=new Set,e=new Set;for(let n of this._constraints)this._processConstraint(n,t,e,i=>i.setInitState())}update(){let t=new Set,e=new Set;for(let n of this._constraints)this._processConstraint(n,t,e,i=>i.update())}_processConstraint(t,e,n,i){if(n.has(t))return;if(e.has(t))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");e.add(t);let r=t.dependencies;for(let o of r)Uo(o,s=>{let l=this._objectConstraintsMap.get(s);if(l)for(let a of l)this._processConstraint(a,e,n,i)});i(t),n.add(t)}},Bo=new Ve.Quaternion,No=new Ve.Quaternion,Ii=class extends st{get dependencies(){return new Set([this.source])}constructor(t,e){super(t,e),this._dstRestQuat=new Ve.Quaternion,this._invSrcRestQuat=new Ve.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),ot(this._invSrcRestQuat.copy(this.source.quaternion))}update(){let t=Bo.copy(this._invSrcRestQuat).multiply(this.source.quaternion),e=No.copy(this._dstRestQuat).multiply(t);this.destination.quaternion.copy(this._dstRestQuat).slerp(e,this.weight)}},Do=new q.Vector3,Fo=new q.Quaternion,ko=new q.Quaternion,Vi=class extends st{get rollAxis(){return this._rollAxis}set rollAxis(t){this._rollAxis=t,this._v3RollAxis.set(t==="X"?1:0,t==="Y"?1:0,t==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(t,e){super(t,e),this._rollAxis="X",this._v3RollAxis=new q.Vector3(1,0,0),this._dstRestQuat=new q.Quaternion,this._invDstRestQuat=new q.Quaternion,this._invSrcRestQuatMulDstRestQuat=new q.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),ot(this._invDstRestQuat.copy(this._dstRestQuat)),ot(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){let t=Fo.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),e=Do.copy(this._v3RollAxis).applyQuaternion(t),i=ko.setFromUnitVectors(e,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(t);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}},Wo=new Set(["1.0","1.0-beta"]),Ci=class Ie{get name(){return Ie.EXTENSION_NAME}constructor(e,n){this.parser=e,this.helperRoot=n==null?void 0:n.helperRoot}afterRoot(e){return Pi(this,null,function*(){e.userData.vrmNodeConstraintManager=yield this._import(e)})}_import(e){return Pi(this,null,function*(){var n;let i=this.parser.json;if(!(((n=i.extensionsUsed)==null?void 0:n.indexOf(Ie.EXTENSION_NAME))!==-1))return null;let o=new Li,s=yield this.parser.getDependencies("node");return s.forEach((l,a)=>{var u;let d=i.nodes[a],h=(u=d==null?void 0:d.extensions)==null?void 0:u[Ie.EXTENSION_NAME];if(h==null)return;let c=h.specVersion;if(!Wo.has(c)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${Ie.EXTENSION_NAME} specVersion "${c}"`);return}let p=h.constraint;if(p.roll!=null){let f=this._importRollConstraint(l,s,p.roll);o.addConstraint(f)}else if(p.aim!=null){let f=this._importAimConstraint(l,s,p.aim);o.addConstraint(f)}else if(p.rotation!=null){let f=this._importRotationConstraint(l,s,p.rotation);o.addConstraint(f)}}),e.scene.updateMatrixWorld(),o.setInitState(),o})}_importRollConstraint(e,n,i){let{source:r,rollAxis:o,weight:s}=i,l=n[r],a=new Vi(e,l);if(o!=null&&(a.rollAxis=o),s!=null&&(a.weight=s),this.helperRoot){let u=new rt(a);this.helperRoot.add(u)}return a}_importAimConstraint(e,n,i){let{source:r,aimAxis:o,weight:s}=i,l=n[r],a=new Hi(e,l);if(o!=null&&(a.aimAxis=o),s!=null&&(a.weight=s),this.helperRoot){let u=new rt(a);this.helperRoot.add(u)}return a}_importRotationConstraint(e,n,i){let{source:r,weight:o}=i,s=n[r],l=new Ii(e,s);if(o!=null&&(l.weight=o),this.helperRoot){let a=new rt(l);this.helperRoot.add(a)}return l}};Ci.EXTENSION_NAME="VRMC_node_constraint";var kt=Ci;var ie=v(require("three"),1),Be=v(require("three"),1),Te=v(require("three"),1),qt=v(require("three"),1),Z=v(require("three"),1),ne=v(require("three"),1),he=v(require("three"),1),re=v(require("three"),1),ce=v(require("three"),1),ht=v(require("three"),1),O=v(require("three"),1),Ni=v(require("three"),1),Di=v(require("three"),1),D=v(require("three"),1);var at=(t,e,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(t,e)).next())}),dt=class{},Wt=new Be.Vector3,de=new Be.Vector3,Qt=class extends dt{get type(){return"capsule"}constructor(t){var e,n,i,r;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new Be.Vector3(0,0,0),this.tail=(n=t==null?void 0:t.tail)!=null?n:new Be.Vector3(0,0,0),this.radius=(i=t==null?void 0:t.radius)!=null?i:0,this.inside=(r=t==null?void 0:t.inside)!=null?r:!1}calculateCollision(t,e,n,i){Wt.setFromMatrixPosition(t),de.subVectors(this.tail,this.offset).applyMatrix4(t),de.sub(Wt);let r=de.lengthSq();i.copy(e).sub(Wt);let o=de.dot(i);o<=0||(r<=o||de.multiplyScalar(o/r),i.sub(de));let s=i.length(),l=this.inside?this.radius-n-s:s-n-this.radius;return l<0&&(i.multiplyScalar(1/s),this.inside&&i.negate()),l}},Gt=new Te.Vector3,Oi=new Te.Matrix3,Yt=class extends dt{get type(){return"plane"}constructor(t){var e,n;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new Te.Vector3(0,0,0),this.normal=(n=t==null?void 0:t.normal)!=null?n:new Te.Vector3(0,0,1)}calculateCollision(t,e,n,i){i.setFromMatrixPosition(t),i.negate().add(e),Oi.getNormalMatrix(t),Gt.copy(this.normal).applyNormalMatrix(Oi).normalize();let r=i.dot(Gt)-n;return i.copy(Gt),r}},Go=new qt.Vector3,Zt=class extends dt{get type(){return"sphere"}constructor(t){var e,n,i;super(),this.offset=(e=t==null?void 0:t.offset)!=null?e:new qt.Vector3(0,0,0),this.radius=(n=t==null?void 0:t.radius)!=null?n:0,this.inside=(i=t==null?void 0:t.inside)!=null?i:!1}calculateCollision(t,e,n,i){i.subVectors(e,Go.setFromMatrixPosition(t));let r=i.length(),o=this.inside?this.radius-n-r:r-n-this.radius;return o<0&&(i.multiplyScalar(1/r),this.inside&&i.negate()),o}},X=new Z.Vector3,zo=class extends Z.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new Z.Vector3,this._currentTail=new Z.Vector3,this._shape=t,this._attrPos=new Z.BufferAttribute(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Z.BufferAttribute(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0);let n=X.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(n)>1e-10&&(this._currentTail.copy(n),t=!0),t&&this._buildPosition()}_buildPosition(){X.copy(this._currentTail).sub(this._currentOffset);let t=X.length()/this._currentRadius;for(let i=0;i<=16;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(i,-Math.sin(r),-Math.cos(r),0),this._attrPos.setXYZ(17+i,t+Math.sin(r),Math.cos(r),0),this._attrPos.setXYZ(34+i,-Math.sin(r),0,-Math.cos(r)),this._attrPos.setXYZ(51+i,t+Math.sin(r),0,Math.cos(r))}for(let i=0;i<32;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(68+i,0,Math.sin(r),Math.cos(r)),this._attrPos.setXYZ(100+i,t,Math.sin(r),Math.cos(r))}let e=Math.atan2(X.y,Math.sqrt(X.x*X.x+X.z*X.z)),n=-Math.atan2(X.z,X.x);this.rotateZ(e),this.rotateY(n),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<34;t++){let e=(t+1)%34;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(68+t*2,34+t,34+e)}for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(136+t*2,68+t,68+e),this._attrIndex.setXY(200+t*2,100+t,100+e)}this._attrIndex.needsUpdate=!0}},jo=class extends ne.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentOffset=new ne.Vector3,this._currentNormal=new ne.Vector3,this._shape=t,this._attrPos=new ne.BufferAttribute(new Float32Array(18),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ne.BufferAttribute(new Uint16Array(10),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1;this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0),this._currentNormal.equals(this._shape.normal)||(this._currentNormal.copy(this._shape.normal),t=!0),t&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,-.5,-.5,0),this._attrPos.setXYZ(1,.5,-.5,0),this._attrPos.setXYZ(2,.5,.5,0),this._attrPos.setXYZ(3,-.5,.5,0),this._attrPos.setXYZ(4,0,0,0),this._attrPos.setXYZ(5,0,0,.25),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this.lookAt(this._currentNormal),this._attrPos.needsUpdate=!0}_buildIndex(){this._attrIndex.setXY(0,0,1),this._attrIndex.setXY(2,1,2),this._attrIndex.setXY(4,2,3),this._attrIndex.setXY(6,3,0),this._attrIndex.setXY(8,4,5),this._attrIndex.needsUpdate=!0}},Xo=class extends he.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new he.Vector3,this._shape=t,this._attrPos=new he.BufferAttribute(new Float32Array(288),3),this.setAttribute("position",this._attrPos),this._attrIndex=new he.BufferAttribute(new Uint16Array(192),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._shape.radius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.needsUpdate=!0}},Qo=new ie.Vector3,lt=class extends ie.Group{constructor(t){if(super(),this.matrixAutoUpdate=!1,this.collider=t,this.collider.shape instanceof Zt)this._geometry=new Xo(this.collider.shape);else if(this.collider.shape instanceof Qt)this._geometry=new zo(this.collider.shape);else if(this.collider.shape instanceof Yt)this._geometry=new jo(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");let e=new ie.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new ie.LineSegments(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(t){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=Qo.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(t)}},Yo=class extends ce.BufferGeometry{constructor(t){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new ce.Vector3,this._springBone=t,this._attrPos=new ce.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ce.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let t=!1,e=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==e&&(this._currentRadius=e,t=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),t=!0),t&&this._buildPosition()}_buildPosition(){for(let t=0;t<32;t++){let e=t/16*Math.PI;this._attrPos.setXYZ(t,Math.cos(e),Math.sin(e),0),this._attrPos.setXYZ(32+t,0,Math.cos(e),Math.sin(e)),this._attrPos.setXYZ(64+t,Math.sin(e),0,Math.cos(e))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let t=0;t<32;t++){let e=(t+1)%32;this._attrIndex.setXY(t*2,t,e),this._attrIndex.setXY(64+t*2,32+t,32+e),this._attrIndex.setXY(128+t*2,64+t,64+e)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},qo=new re.Vector3,Bi=class extends re.Group{constructor(t){super(),this.matrixAutoUpdate=!1,this.springBone=t,this._geometry=new Yo(this.springBone);let e=new re.LineBasicMaterial({color:16776960,depthTest:!1,depthWrite:!1});this._line=new re.LineSegments(this._geometry,e),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(t){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);let e=this.matrix.elements;this._geometry.worldScale=qo.set(e[0],e[1],e[2]).length(),this._geometry.update(),super.updateMatrixWorld(t)}},ut=class extends ht.Object3D{constructor(t){super(),this.colliderMatrix=new ht.Matrix4,this.shape=t}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),Zo(this.colliderMatrix,this.matrixWorld,this.shape.offset)}};function Zo(t,e,n){let i=e.elements;t.copy(e),n&&(t.elements[12]=i[0]*n.x+i[4]*n.y+i[8]*n.z+i[12],t.elements[13]=i[1]*n.x+i[5]*n.y+i[9]*n.z+i[13],t.elements[14]=i[2]*n.x+i[6]*n.y+i[10]*n.z+i[14])}var $o=new Di.Matrix4;function Jo(t){return t.invert?t.invert():t.getInverse($o.copy(t)),t}var Ko=class{constructor(t){this._inverseCache=new Ni.Matrix4,this._shouldUpdateInverse=!0,this.matrix=t;let e={set:(n,i,r)=>(this._shouldUpdateInverse=!0,n[i]=r,!0)};this._originalElements=t.elements,t.elements=new Proxy(t.elements,e)}get inverse(){return this._shouldUpdateInverse&&(Jo(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},zt=new O.Matrix4,Me=new O.Vector3,Ce=new O.Vector3,Oe=new O.Vector3,Ue=new O.Vector3,es=new O.Matrix4,Fi=class{constructor(t,e,n={},i=[]){this._currentTail=new O.Vector3,this._prevTail=new O.Vector3,this._boneAxis=new O.Vector3,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new O.Matrix4,this._initialLocalRotation=new O.Quaternion,this._initialLocalChildPosition=new O.Vector3;var r,o,s,l,a,u;this.bone=t,this.bone.matrixAutoUpdate=!1,this.child=e,this.settings={hitRadius:(r=n.hitRadius)!=null?r:0,stiffness:(o=n.stiffness)!=null?o:1,gravityPower:(s=n.gravityPower)!=null?s:0,gravityDir:(a=(l=n.gravityDir)==null?void 0:l.clone())!=null?a:new O.Vector3(0,-1,0),dragForce:(u=n.dragForce)!=null?u:.4},this.colliderGroups=i}get dependencies(){let t=new Set,e=this.bone.parent;e&&t.add(e);for(let n=0;n<this.colliderGroups.length;n++)for(let i=0;i<this.colliderGroups[n].colliders.length;i++)t.add(this.colliderGroups[n].colliders[i]);return t}get center(){return this._center}set center(t){var e;(e=this._center)!=null&&e.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=t,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new Ko(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:zt}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);let t=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(t),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);let t=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(t),this._prevTail.copy(this._currentTail)}update(t){if(t<=0)return;this._calcWorldSpaceBoneLength();let e=Ce.copy(this._boneAxis).transformDirection(this._initialLocalMatrix).transformDirection(this._parentMatrixWorld);Ue.copy(this._currentTail).add(Me.subVectors(this._currentTail,this._prevTail).multiplyScalar(1-this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(e,this.settings.stiffness*t).addScaledVector(this.settings.gravityDir,this.settings.gravityPower*t),Oe.setFromMatrixPosition(this.bone.matrixWorld),Ue.sub(Oe).normalize().multiplyScalar(this._worldSpaceBoneLength).add(Oe),this._collision(Ue),this._prevTail.copy(this._currentTail),this._currentTail.copy(Ue).applyMatrix4(this._getMatrixWorldToCenter());let n=es.multiplyMatrices(this._parentMatrixWorld,this._initialLocalMatrix).invert();this.bone.quaternion.setFromUnitVectors(this._boneAxis,Me.copy(Ue).applyMatrix4(n).normalize()).premultiply(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(t){for(let e=0;e<this.colliderGroups.length;e++)for(let n=0;n<this.colliderGroups[e].colliders.length;n++){let i=this.colliderGroups[e].colliders[n],r=i.shape.calculateCollision(i.colliderMatrix,t,this.settings.hitRadius,Me);if(r<0){t.addScaledVector(Me,-r),t.sub(Oe);let o=t.length();t.multiplyScalar(this._worldSpaceBoneLength/o).add(Oe)}}}_calcWorldSpaceBoneLength(){Me.setFromMatrixPosition(this.bone.matrixWorld),this.child?Ce.setFromMatrixPosition(this.child.matrixWorld):(Ce.copy(this._initialLocalChildPosition),Ce.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=Me.sub(Ce).length()}_getMatrixCenterToWorld(){return this._center?this._center.matrixWorld:zt}_getMatrixWorldToCenter(){return this._center?this._center.userData.inverseCacheProxy.inverse:zt}};function ts(t,e){let n=[],i=t;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{e(r)})}function jt(t,e){t.children.forEach(n=>{e(n)||jt(n,e)})}function ns(t){var e;let n=new Map;for(let i of t){let r=i;do{let o=((e=n.get(r))!=null?e:0)+1;if(o===t.size)return r;n.set(r,o),r=r.parent}while(r!==null)}return null}var Xt=class{constructor(){this._joints=new Set,this._sortedJoints=[],this._hasWarnedCircularDependency=!1,this._ancestors=[],this._objectSpringBonesMap=new Map,this._isSortedJointsDirty=!1,this._relevantChildrenUpdated=this._relevantChildrenUpdated.bind(this)}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){let t=new Set;return this._joints.forEach(e=>{e.colliderGroups.forEach(n=>{t.add(n)})}),Array.from(t)}get colliders(){let t=new Set;return this.colliderGroups.forEach(e=>{e.colliders.forEach(n=>{t.add(n)})}),Array.from(t)}addJoint(t){this._joints.add(t);let e=this._objectSpringBonesMap.get(t.bone);e==null&&(e=new Set,this._objectSpringBonesMap.set(t.bone,e)),e.add(t),this._isSortedJointsDirty=!0}addSpringBone(t){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(t)}deleteJoint(t){this._joints.delete(t),this._objectSpringBonesMap.get(t.bone).delete(t),this._isSortedJointsDirty=!0}deleteSpringBone(t){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(t)}setInitState(){this._sortJoints();for(let t=0;t<this._sortedJoints.length;t++){let e=this._sortedJoints[t];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.setInitState()}}reset(){this._sortJoints();for(let t=0;t<this._sortedJoints.length;t++){let e=this._sortedJoints[t];e.bone.updateMatrix(),e.bone.updateWorldMatrix(!1,!1),e.reset()}}update(t){this._sortJoints();for(let e=0;e<this._ancestors.length;e++)this._ancestors[e].updateWorldMatrix(e===0,!1);for(let e=0;e<this._sortedJoints.length;e++){let n=this._sortedJoints[e];n.bone.updateMatrix(),n.bone.updateWorldMatrix(!1,!1),n.update(t),jt(n.bone,this._relevantChildrenUpdated)}}_sortJoints(){if(!this._isSortedJointsDirty)return;let t=[],e=new Set,n=new Set,i=new Set;for(let o of this._joints)this._insertJointSort(o,e,n,t,i);this._sortedJoints=t;let r=ns(i);this._ancestors=[],r&&(this._ancestors.push(r),jt(r,o=>{var s,l;return((l=(s=this._objectSpringBonesMap.get(o))==null?void 0:s.size)!=null?l:0)>0?!0:(this._ancestors.push(o),!1)})),this._isSortedJointsDirty=!1}_insertJointSort(t,e,n,i,r){if(n.has(t))return;if(e.has(t)){this._hasWarnedCircularDependency||(console.warn("VRMSpringBoneManager: Circular dependency detected"),this._hasWarnedCircularDependency=!0);return}e.add(t);let o=t.dependencies;for(let s of o){let l=!1,a=null;ts(s,u=>{let d=this._objectSpringBonesMap.get(u);if(d)for(let h of d)l=!0,this._insertJointSort(h,e,n,i,r);else l||(a=u)}),a&&r.add(a)}i.push(t),n.add(t)}_relevantChildrenUpdated(t){var e,n;return((n=(e=this._objectSpringBonesMap.get(t))==null?void 0:e.size)!=null?n:0)>0?!0:(t.updateWorldMatrix(!1,!1),!1)}},Ui="VRMC_springBone_extended_collider",is=new Set(["1.0","1.0-beta"]),rs=new Set(["1.0"]),ki=class Re{get name(){return Re.EXTENSION_NAME}constructor(e,n){var i;this.parser=e,this.jointHelperRoot=n==null?void 0:n.jointHelperRoot,this.colliderHelperRoot=n==null?void 0:n.colliderHelperRoot,this.useExtendedColliders=(i=n==null?void 0:n.useExtendedColliders)!=null?i:!0}afterRoot(e){return at(this,null,function*(){e.userData.vrmSpringBoneManager=yield this._import(e)})}_import(e){return at(this,null,function*(){let n=yield this._v1Import(e);if(n!=null)return n;let i=yield this._v0Import(e);return i!=null?i:null})}_v1Import(e){return at(this,null,function*(){var n,i,r,o,s;let l=e.parser.json;if(!(((n=l.extensionsUsed)==null?void 0:n.indexOf(Re.EXTENSION_NAME))!==-1))return null;let u=new Xt,d=yield e.parser.getDependencies("node"),h=(i=l.extensions)==null?void 0:i[Re.EXTENSION_NAME];if(!h)return null;let c=h.specVersion;if(!is.has(c))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Re.EXTENSION_NAME} specVersion "${c}"`),null;let p=(r=h.colliders)==null?void 0:r.map((m,g)=>{var _,w,T,R,E,M,S,A,I,b,H,C,J,we,Se;let Q=d[m.node];if(Q==null)return console.warn(`VRMSpringBoneLoaderPlugin: The collider #${g} attempted to use the node #${m.node} but not found`),null;let W=m.shape,pe=(_=m.extensions)==null?void 0:_[Ui];if(this.useExtendedColliders&&pe!=null){let Ae=pe.specVersion;if(!rs.has(Ae))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Ui} specVersion "${Ae}". Fallbacking to the ${Re.EXTENSION_NAME} definition`);else{let U=pe.shape;if(U.sphere)return this._importSphereCollider(Q,{offset:new D.Vector3().fromArray((w=U.sphere.offset)!=null?w:[0,0,0]),radius:(T=U.sphere.radius)!=null?T:0,inside:(R=U.sphere.inside)!=null?R:!1});if(U.capsule)return this._importCapsuleCollider(Q,{offset:new D.Vector3().fromArray((E=U.capsule.offset)!=null?E:[0,0,0]),radius:(M=U.capsule.radius)!=null?M:0,tail:new D.Vector3().fromArray((S=U.capsule.tail)!=null?S:[0,0,0]),inside:(A=U.capsule.inside)!=null?A:!1});if(U.plane)return this._importPlaneCollider(Q,{offset:new D.Vector3().fromArray((I=U.plane.offset)!=null?I:[0,0,0]),normal:new D.Vector3().fromArray((b=U.plane.normal)!=null?b:[0,0,1])})}}if(W.sphere)return this._importSphereCollider(Q,{offset:new D.Vector3().fromArray((H=W.sphere.offset)!=null?H:[0,0,0]),radius:(C=W.sphere.radius)!=null?C:0,inside:!1});if(W.capsule)return this._importCapsuleCollider(Q,{offset:new D.Vector3().fromArray((J=W.capsule.offset)!=null?J:[0,0,0]),radius:(we=W.capsule.radius)!=null?we:0,tail:new D.Vector3().fromArray((Se=W.capsule.tail)!=null?Se:[0,0,0]),inside:!1});throw new Error(`VRMSpringBoneLoaderPlugin: The collider #${g} has no valid shape`)}),f=(o=h.colliderGroups)==null?void 0:o.map((m,g)=>{var _;return{colliders:((_=m.colliders)!=null?_:[]).flatMap(T=>{let R=p==null?void 0:p[T];return R==null?(console.warn(`VRMSpringBoneLoaderPlugin: The colliderGroup #${g} attempted to use a collider #${T} but not found`),[]):R}),name:m.name}});return(s=h.springs)==null||s.forEach((m,g)=>{var _;let w=m.joints,T=(_=m.colliderGroups)==null?void 0:_.map(M=>{let S=f==null?void 0:f[M];if(S==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${g} attempted to use a colliderGroup ${M} but not found`);return S}),R=m.center!=null?d[m.center]:void 0,E;w.forEach(M=>{if(E){let S=E.node,A=d[S],I=M.node,b=d[I],H={hitRadius:E.hitRadius,dragForce:E.dragForce,gravityPower:E.gravityPower,stiffness:E.stiffness,gravityDir:E.gravityDir!=null?new D.Vector3().fromArray(E.gravityDir):void 0},C=this._importJoint(A,b,H,T);R&&(C.center=R),u.addJoint(C)}E=M})}),u.setInitState(),u})}_v0Import(e){return at(this,null,function*(){var n,i,r;let o=e.parser.json;if(!(((n=o.extensionsUsed)==null?void 0:n.indexOf("VRM"))!==-1))return null;let l=(i=o.extensions)==null?void 0:i.VRM,a=l==null?void 0:l.secondaryAnimation;if(!a)return null;let u=a==null?void 0:a.boneGroups;if(!u)return null;let d=new Xt,h=yield e.parser.getDependencies("node"),c=(r=a.colliderGroups)==null?void 0:r.map(p=>{var f;let m=h[p.node];return{colliders:((f=p.colliders)!=null?f:[]).map((_,w)=>{var T,R,E;let M=new D.Vector3(0,0,0);return _.offset&&M.set((T=_.offset.x)!=null?T:0,(R=_.offset.y)!=null?R:0,_.offset.z?-_.offset.z:0),this._importSphereCollider(m,{offset:M,radius:(E=_.radius)!=null?E:0,inside:!1})})}});return u==null||u.forEach((p,f)=>{let m=p.bones;m&&m.forEach(g=>{var _,w,T,R;let E=h[g],M=new D.Vector3;p.gravityDir?M.set((_=p.gravityDir.x)!=null?_:0,(w=p.gravityDir.y)!=null?w:0,(T=p.gravityDir.z)!=null?T:0):M.set(0,-1,0);let S=p.center!=null?h[p.center]:void 0,A={hitRadius:p.hitRadius,dragForce:p.dragForce,gravityPower:p.gravityPower,stiffness:p.stiffiness,gravityDir:M},I=(R=p.colliderGroups)==null?void 0:R.map(b=>{let H=c==null?void 0:c[b];if(H==null)throw new Error(`VRMSpringBoneLoaderPlugin: The spring #${f} attempted to use a colliderGroup ${b} but not found`);return H});E.traverse(b=>{var H;let C=(H=b.children[0])!=null?H:null,J=this._importJoint(b,C,A,I);S&&(J.center=S),d.addJoint(J)})})}),e.scene.updateMatrixWorld(),d.setInitState(),d})}_importJoint(e,n,i,r){let o=new Fi(e,n,i,r);if(this.jointHelperRoot){let s=new Bi(o);this.jointHelperRoot.add(s),s.renderOrder=this.jointHelperRoot.renderOrder}return o}_importSphereCollider(e,n){let i=new Zt(n),r=new ut(i);if(e.add(r),this.colliderHelperRoot){let o=new lt(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importCapsuleCollider(e,n){let i=new Qt(n),r=new ut(i);if(e.add(r),this.colliderHelperRoot){let o=new lt(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importPlaneCollider(e,n){let i=new Yt(n),r=new ut(i);if(e.add(r),this.colliderHelperRoot){let o=new lt(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}};ki.EXTENSION_NAME="VRMC_springBone";var $t=ki;var ct=class{get name(){return"VRMLoaderPlugin"}constructor(e,n){var o,s,l,a,u,d,h,c,p,f;this.parser=e;let i=n==null?void 0:n.helperRoot,r=n==null?void 0:n.autoUpdateHumanBones;this.expressionPlugin=(o=n==null?void 0:n.expressionPlugin)!=null?o:new qe(e),this.firstPersonPlugin=(s=n==null?void 0:n.firstPersonPlugin)!=null?s:new Ze(e),this.humanoidPlugin=(l=n==null?void 0:n.humanoidPlugin)!=null?l:new Je(e,{helperRoot:i,autoUpdateHumanBones:r}),this.lookAtPlugin=(a=n==null?void 0:n.lookAtPlugin)!=null?a:new Ke(e,{helperRoot:i}),this.metaPlugin=(u=n==null?void 0:n.metaPlugin)!=null?u:new et(e),this.mtoonMaterialPlugin=(d=n==null?void 0:n.mtoonMaterialPlugin)!=null?d:new Nt(e),this.materialsHDREmissiveMultiplierPlugin=(h=n==null?void 0:n.materialsHDREmissiveMultiplierPlugin)!=null?h:new Ti(e),this.materialsV0CompatPlugin=(c=n==null?void 0:n.materialsV0CompatPlugin)!=null?c:new Ai(e),this.springBonePlugin=(p=n==null?void 0:n.springBonePlugin)!=null?p:new $t(e,{colliderHelperRoot:i,jointHelperRoot:i}),this.nodeConstraintPlugin=(f=n==null?void 0:n.nodeConstraintPlugin)!=null?f:new kt(e,{helperRoot:i})}beforeRoot(){return Pe(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(e){return Pe(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(e)})}getMaterialType(e){let n=this.mtoonMaterialPlugin.getMaterialType(e);return n!=null?n:null}extendMaterialParams(e,n){return Pe(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(e,n),yield this.mtoonMaterialPlugin.extendMaterialParams(e,n)})}afterRoot(e){return Pe(this,null,function*(){yield this.metaPlugin.afterRoot(e),yield this.humanoidPlugin.afterRoot(e),yield this.expressionPlugin.afterRoot(e),yield this.lookAtPlugin.afterRoot(e),yield this.firstPersonPlugin.afterRoot(e),yield this.springBonePlugin.afterRoot(e),yield this.nodeConstraintPlugin.afterRoot(e),yield this.mtoonMaterialPlugin.afterRoot(e);let n=e.userData.vrmMeta,i=e.userData.vrmHumanoid;if(n&&i){let r=new ve({scene:e.scene,expressionManager:e.userData.vrmExpressionManager,firstPerson:e.userData.vrmFirstPerson,humanoid:i,lookAt:e.userData.vrmLookAt,meta:n,materials:e.userData.vrmMToonMaterials,springBoneManager:e.userData.vrmSpringBoneManager,nodeConstraintManager:e.userData.vrmNodeConstraintManager});e.userData.vrm=r}})}};var Gi=v(require("three"),1);function os(t){let e=new Set;return t.traverse(n=>{if(!n.isMesh)return;let i=n;e.add(i)}),e}function Wi(t,e,n){if(e.size===1){let s=e.values().next().value;if(s.weight===1)return t[s.index]}let i=new Float32Array(t[0].count*3),r=0;if(n)r=1;else for(let s of e)r+=s.weight;for(let s of e){let l=t[s.index],a=s.weight/r;for(let u=0;u<l.count;u++)i[u*3+0]+=l.getX(u)*a,i[u*3+1]+=l.getY(u)*a,i[u*3+2]+=l.getZ(u)*a}return new Gi.BufferAttribute(i,3)}function zi(t){var r;let e=os(t.scene),n=new Map,i=(r=t.expressionManager)==null?void 0:r.expressionMap;if(i!=null)for(let[o,s]of Object.entries(i)){let l=new Set;for(let a of s.binds)if(a instanceof _e){if(a.weight!==0)for(let u of a.primitives){let d=n.get(u);d==null&&(d=new Map,n.set(u,d));let h=d.get(o);h==null&&(h=new Set,d.set(o,h)),h.add(a)}l.add(a)}for(let a of l)s.deleteBind(a)}for(let o of e){let s=n.get(o);if(s==null)continue;let l=o.geometry.morphAttributes;o.geometry.morphAttributes={};let a=o.geometry.clone();o.geometry=a;let u=a.morphTargetsRelative,d=l.position!=null,h=l.normal!=null,c={},p={},f=[];if(d||h){d&&(c.position=[]),h&&(c.normal=[]);let m=0;for(let[g,_]of s)d&&(c.position[m]=Wi(l.position,_,u)),h&&(c.normal[m]=Wi(l.normal,_,u)),i==null||i[g].addBind(new _e({index:m,weight:1,primitives:[o]})),p[g]=m,f.push(0),m++}a.morphAttributes=c,o.morphTargetDictionary=p,o.morphTargetInfluences=f}}var ye=v(require("three"),1);var ji=v(require("three"),1);function xe(t,e,n){if(t.getComponent)return t.getComponent(e,n);{let i=t.array[e*t.itemSize+n];return t.normalized&&(i=ji.MathUtils.denormalize(i,t.array)),i}}var Xi=v(require("three"),1);function pt(t,e,n,i){t.setComponent?t.setComponent(e,n,i):(t.normalized&&(i=Xi.MathUtils.normalize(i,t.array)),t.array[e*t.itemSize+n]=i)}function Qi(t){var d;let e=ss(t),n=new Set;for(let h of e)n.has(h.geometry)&&(h.geometry=cs(h.geometry)),n.add(h.geometry);let i=new Map;for(let h of n){let c=h.getAttribute("skinIndex"),p=(d=i.get(c))!=null?d:new Map;i.set(c,p);let f=h.getAttribute("skinWeight"),m=as(c,f);p.set(f,m)}let r=new Map;for(let h of e){let c=ls(h,i);r.set(h,c)}let o=[];for(let[h,c]of r){let p=!1;for(let f of o)if(us(c,f.boneInverseMap)){p=!0,f.meshes.add(h);for(let[g,_]of c)f.boneInverseMap.set(g,_);break}p||o.push({boneInverseMap:c,meshes:new Set([h])})}let s=new Map,l=new Ne,a=new Ne,u=new Ne;for(let h of o){let{boneInverseMap:c,meshes:p}=h,f=Array.from(c.keys()),m=Array.from(c.values()),g=new ye.Skeleton(f,m),_=a.getOrCreate(g);for(let w of p){let T=w.geometry.getAttribute("skinIndex"),R=l.getOrCreate(T),E=w.skeleton.bones,M=E.map(I=>u.getOrCreate(I)).join(","),S=`${R};${_};${M}`,A=s.get(S);A==null&&(A=T.clone(),ds(A,E,f),s.set(S,A)),w.geometry.setAttribute("skinIndex",A)}for(let w of p)w.bind(g,new ye.Matrix4)}}function ss(t){let e=new Set;return t.traverse(n=>{if(!n.isSkinnedMesh)return;let i=n;e.add(i)}),e}function as(t,e){let n=new Set;for(let i=0;i<t.count;i++)for(let r=0;r<t.itemSize;r++){let o=xe(t,i,r);xe(e,i,r)!==0&&n.add(o)}return n}function ls(t,e){let n=new Map,i=t.skeleton,r=t.geometry,o=r.getAttribute("skinIndex"),s=r.getAttribute("skinWeight"),l=e.get(o),a=l==null?void 0:l.get(s);if(!a)throw new Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");for(let u of a)n.set(i.bones[u],i.boneInverses[u]);return n}function us(t,e){for(let[n,i]of t.entries()){let r=e.get(n);if(r!=null&&!hs(i,r))return!1}return!0}function ds(t,e,n){let i=new Map;for(let o of e)i.set(o,i.size);let r=new Map;for(let[o,s]of n.entries()){let l=i.get(s);r.set(l,o)}for(let o=0;o<t.count;o++)for(let s=0;s<t.itemSize;s++){let l=xe(t,o,s),a=r.get(l);pt(t,o,s,a)}t.needsUpdate=!0}function hs(t,e,n){if(n=n||1e-4,t.elements.length!=e.elements.length)return!1;for(let i=0,r=t.elements.length;i<r;i++)if(Math.abs(t.elements[i]-e.elements[i])>n)return!1;return!0}var Ne=class{constructor(){this._objectIndexMap=new Map;this._index=0}get(e){return this._objectIndexMap.get(e)}getOrCreate(e){let n=this._objectIndexMap.get(e);return n==null&&(n=this._index,this._objectIndexMap.set(e,n),this._index++),n}};function cs(t){var n,i,r,o;let e=new ye.BufferGeometry;e.name=t.name,e.setIndex(t.index);for(let[s,l]of Object.entries(t.attributes))e.setAttribute(s,l);for(let[s,l]of Object.entries(t.morphAttributes)){let a=s;e.morphAttributes[a]=l.concat()}e.morphTargetsRelative=t.morphTargetsRelative,e.groups=[];for(let s of t.groups)e.addGroup(s.start,s.count,s.materialIndex);return e.boundingSphere=(i=(n=t.boundingSphere)==null?void 0:n.clone())!=null?i:null,e.boundingBox=(o=(r=t.boundingBox)==null?void 0:r.clone())!=null?o:null,e.drawRange.start=t.drawRange.start,e.drawRange.count=t.drawRange.count,e.userData=t.userData,e}function Yi(t){if(Object.values(t).forEach(e=>{e!=null&&e.isTexture&&e.dispose()}),t.isShaderMaterial){let e=t.uniforms;e&&Object.values(e).forEach(n=>{let i=n.value;i!=null&&i.isTexture&&i.dispose()})}t.dispose()}function ps(t){let e=t.geometry;e&&e.dispose();let n=t.skeleton;n&&n.dispose();let i=t.material;i&&(Array.isArray(i)?i.forEach(r=>Yi(r)):i&&Yi(i))}function qi(t){t.traverse(ps)}var ft=v(require("three"),1);function Zi(t,e){var s,l;console.warn("VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version.");let n=(s=e==null?void 0:e.experimentalSameBoneCounts)!=null?s:!1,i=[];t.traverse(a=>{a.type==="SkinnedMesh"&&i.push(a)});let r=new Map,o=0;for(let a of i){let d=a.geometry.getAttribute("skinIndex");if(r.has(d))continue;let h=new Map,c=new Map;for(let p=0;p<d.count;p++)for(let f=0;f<d.itemSize;f++){let m=xe(d,p,f),g=h.get(m);g==null&&(g=h.size,h.set(m,g),c.set(g,m)),pt(d,p,f,g)}d.needsUpdate=!0,r.set(d,c),o=Math.max(o,h.size)}for(let a of i){let d=a.geometry.getAttribute("skinIndex"),h=r.get(d),c=[],p=[],f=n?o:h.size;for(let g=0;g<f;g++){let _=(l=h.get(g))!=null?l:0;c.push(a.skeleton.bones[_]),p.push(a.skeleton.boneInverses[_])}let m=new ft.Skeleton(c,p);a.bind(m,new ft.Matrix4)}}var oe=v(require("three"),1),gt=require("three");function fs(t,e){let n=t.position.count,i=new Array(n),r=0,o=e.array;for(let s=0;s<o.length;s++){let l=o[s];i[l]||(i[l]=!0,r++)}return{isVertexUsed:i,vertexCount:n,verticesUsed:r}}function ms(t){let e=[],n=[],i=0;for(let r=0;r<t.length;r++)if(t[r]){let o=i++;e[r]=o,n[o]=r}return{originalIndexNewIndexMap:e,newIndexOriginalIndexMap:n}}function gs(t,e){var n,i,r,o;e.name=t.name,e.morphTargetsRelative=t.morphTargetsRelative,t.groups.forEach(s=>{e.addGroup(s.start,s.count,s.materialIndex)}),e.boundingBox=(i=(n=t.boundingBox)==null?void 0:n.clone())!=null?i:null,e.boundingSphere=(o=(r=t.boundingSphere)==null?void 0:r.clone())!=null?o:null,e.setDrawRange(t.drawRange.start,t.drawRange.count),e.userData=t.userData}function _s(t,e,n){let i=e.array,r=new i.constructor(i.length);for(let o=0;o<i.length;o++){let s=i[o];r[o]=n[s]}t.setIndex(new gt.BufferAttribute(r,e.itemSize,e.normalized))}function mt(t,e,n){let i=t.constructor,r=new i(e.length*n),o=!0;for(let s=0;s<e.length;s++){let a=e[s]*n,u=s*n;for(let d=0;d<n;d++){let h=t[a+d];r[u+d]=h,o=o&&h===0}}return[r,o]}function vs(t){var i;let e=new Map,n=[];for(let[r,o]of Object.entries(t))if(o.isInterleavedBufferAttribute){let s=o,l=s.data,a=(i=e.get(l))!=null?i:[];e.set(l,a),a.push([r,s])}else{let s=o;n.push([r,s])}return[e,n]}function Es(t,e,n){let[i,r]=vs(e);for(let[o,s]of i){let l=o.array,{stride:a}=o,[u,d]=mt(l,n,a),h=new oe.InterleavedBuffer(u,a);h.setUsage(o.usage);for(let[c,p]of s){let{itemSize:f,offset:m,normalized:g}=p,_=new oe.InterleavedBufferAttribute(h,f,m,g);t.setAttribute(c,_)}}for(let[o,s]of r){let l=s.array,{itemSize:a,normalized:u}=s,[d,h]=mt(l,n,a);t.setAttribute(o,new gt.BufferAttribute(d,a,u))}}function Ms(t){var i;let e=new Map,n=[];for(let[r,o]of Object.entries(t)){let s=r;for(let l=0;l<o.length;l++){let a=o[l];if(a.isInterleavedBufferAttribute){let u=a,d=u.data,h=(i=e.get(d))!=null?i:[];e.set(d,h),h.push([s,l,u])}else{let u=a;n.push([s,l,u])}}}return[e,n]}function Rs(t,e,n){var l,a;let i=!0,[r,o]=Ms(e),s={};for(let[u,d]of r){let h=u.array,{stride:c}=u,[p,f]=mt(h,n,c);i=i&&f;let m=new oe.InterleavedBuffer(p,c);m.setUsage(u.usage);for(let[g,_,w]of d){let{itemSize:T,offset:R,normalized:E}=w,M=new oe.InterleavedBufferAttribute(m,T,R,E);(l=s[g])!=null||(s[g]=[]),s[g][_]=M}}for(let[u,d,h]of o){let c=h,p=c.array,{itemSize:f,normalized:m}=c,[g,_]=mt(p,n,f);i=i&&_,(a=s[u])!=null||(s[u]=[]),s[u][d]=new gt.BufferAttribute(g,f,m)}t.morphAttributes=i?{}:s}function $i(t){let e=new Map;t.traverse(n=>{if(!n.isMesh)return;let i=n,r=i.geometry,o=r.index;if(o==null)return;let s=e.get(r);if(s!=null){i.geometry=s;return}let{isVertexUsed:l,vertexCount:a,verticesUsed:u}=fs(r.attributes,o);if(u===a)return;let{originalIndexNewIndexMap:d,newIndexOriginalIndexMap:h}=ms(l),c=new oe.BufferGeometry;gs(r,c),e.set(r,c),_s(c,o,d),Es(c,r.attributes,h),Rs(c,r.morphAttributes,h),i.geometry=c}),Array.from(e.keys()).forEach(n=>{n.dispose()})}function Ji(t){var e;((e=t.meta)==null?void 0:e.metaVersion)==="0"&&(t.scene.rotation.y=Math.PI)}var $=class{constructor(){}};$.combineMorphs=zi,$.combineSkeletons=Qi,$.deepDispose=qi,$.removeUnnecessaryJoints=Zi,$.removeUnnecessaryVertices=$i,$.rotateVRM0=Ji;
/*!
 * @pixiv/three-vrm-core v3.5.1
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.5.1
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.5.1
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.5.1
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.5.1
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.5.1
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
