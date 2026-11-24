/*! (c) 2019-2026 pixiv Inc. - https://github.com/pixiv/three-vrm/blob/release/LICENSE */
var Le=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())});import*as Kn from"three";import*as ne from"three";import*as xt from"three";import*as oi from"three";import*as W from"three";import*as $ from"three";import*as Ke from"three";import*as G from"three";import*as b from"three";import*as Ue from"three";import*as ie from"three";import*as V from"three";import*as Pt from"three";import*as L from"three";import*as Rt from"three";import*as fi from"three";var w=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())}),Ln=class extends Kn.Object3D{constructor(e){super(),this.weight=0,this.isBinary=!1,this.overrideBlink="none",this.overrideLookAt="none",this.overrideMouth="none",this._binds=[],this.name=`VRMExpression_${e}`,this.expressionName=e,this.type="VRMExpression",this.visible=!1}get binds(){return this._binds}get overrideBlinkAmount(){return this.overrideBlink==="block"?0<this.outputWeight?1:0:this.overrideBlink==="blend"?this.outputWeight:0}get overrideLookAtAmount(){return this.overrideLookAt==="block"?0<this.outputWeight?1:0:this.overrideLookAt==="blend"?this.outputWeight:0}get overrideMouthAmount(){return this.overrideMouth==="block"?0<this.outputWeight?1:0:this.overrideMouth==="blend"?this.outputWeight:0}get outputWeight(){return this.isBinary?this.weight>.5?1:0:this.weight}addBind(e){this._binds.push(e)}deleteBind(e){let t=this._binds.indexOf(e);t>=0&&this._binds.splice(t,1)}applyWeight(e){var t;let n=this.outputWeight;n*=(t=e==null?void 0:e.multiplier)!=null?t:1,this.isBinary&&n<1&&(n=0),this._binds.forEach(i=>i.applyWeight(n))}clearAppliedWeight(){this._binds.forEach(e=>e.clearAppliedWeight())}};function ei(e,t,n){var i,r;let o=e.parser.json,s=(i=o.nodes)==null?void 0:i[t];if(s==null)return console.warn(`extractPrimitivesInternal: Attempt to use nodes[${t}] of glTF but the node doesn't exist`),null;let l=s.mesh;if(l==null)return null;let a=(r=o.meshes)==null?void 0:r[l];if(a==null)return console.warn(`extractPrimitivesInternal: Attempt to use meshes[${l}] of glTF but the mesh doesn't exist`),null;let u=a.primitives.length,d=[];return n.traverse(h=>{d.length<u&&h.isMesh&&d.push(h)}),d}function In(e,t){return w(this,null,function*(){let n=yield e.parser.getDependency("node",t);return ei(e,t,n)})}function Vn(e){return w(this,null,function*(){let t=yield e.parser.getDependencies("node"),n=new Map;return t.forEach((i,r)=>{let o=ei(e,r,i);o!=null&&n.set(r,o)}),n})}var Et={Aa:"aa",Ih:"ih",Ou:"ou",Ee:"ee",Oh:"oh",Blink:"blink",Happy:"happy",Angry:"angry",Sad:"sad",Relaxed:"relaxed",LookUp:"lookUp",Surprised:"surprised",LookDown:"lookDown",LookLeft:"lookLeft",LookRight:"lookRight",BlinkLeft:"blinkLeft",BlinkRight:"blinkRight",Neutral:"neutral"};function ti(e){return Math.max(Math.min(e,1),0)}var Cn=class ni{constructor(){this.blinkExpressionNames=["blink","blinkLeft","blinkRight"],this.lookAtExpressionNames=["lookLeft","lookRight","lookUp","lookDown"],this.mouthExpressionNames=["aa","ee","ih","oh","ou"],this._expressions=[],this._expressionMap={}}get expressions(){return this._expressions.concat()}get expressionMap(){return Object.assign({},this._expressionMap)}get presetExpressionMap(){let t={},n=new Set(Object.values(Et));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)&&(t[i]=r)}),t}get customExpressionMap(){let t={},n=new Set(Object.values(Et));return Object.entries(this._expressionMap).forEach(([i,r])=>{n.has(i)||(t[i]=r)}),t}copy(t){return this._expressions.concat().forEach(i=>{this.unregisterExpression(i)}),t._expressions.forEach(i=>{this.registerExpression(i)}),this.blinkExpressionNames=t.blinkExpressionNames.concat(),this.lookAtExpressionNames=t.lookAtExpressionNames.concat(),this.mouthExpressionNames=t.mouthExpressionNames.concat(),this}clone(){return new ni().copy(this)}getExpression(t){var n;return(n=this._expressionMap[t])!=null?n:null}registerExpression(t){this._expressions.push(t),this._expressionMap[t.expressionName]=t}unregisterExpression(t){let n=this._expressions.indexOf(t);n===-1&&console.warn("VRMExpressionManager: The specified expressions is not registered"),this._expressions.splice(n,1),delete this._expressionMap[t.expressionName]}getValue(t){var n;let i=this.getExpression(t);return(n=i==null?void 0:i.weight)!=null?n:null}setValue(t,n){let i=this.getExpression(t);i&&(i.weight=ti(n))}resetValues(){this._expressions.forEach(t=>{t.weight=0})}getExpressionTrackName(t){let n=this.getExpression(t);return n?`${n.name}.weight`:null}update(){let t=this._calculateWeightMultipliers();this._expressions.forEach(n=>{n.clearAppliedWeight()}),this._expressions.forEach(n=>{let i=1,r=n.expressionName;this.blinkExpressionNames.indexOf(r)!==-1&&(i*=t.blink),this.lookAtExpressionNames.indexOf(r)!==-1&&(i*=t.lookAt),this.mouthExpressionNames.indexOf(r)!==-1&&(i*=t.mouth),n.applyWeight({multiplier:i})})}_calculateWeightMultipliers(){let t=1,n=1,i=1;return this._expressions.forEach(r=>{t-=r.overrideBlinkAmount,n-=r.overrideLookAtAmount,i-=r.overrideMouthAmount}),t=Math.max(0,t),n=Math.max(0,n),i=Math.max(0,i),{blink:t,lookAt:n,mouth:i}}},Ie={Color:"color",EmissionColor:"emissionColor",ShadeColor:"shadeColor",MatcapColor:"matcapColor",RimColor:"rimColor",OutlineColor:"outlineColor"},Fr={_Color:Ie.Color,_EmissionColor:Ie.EmissionColor,_ShadeColor:Ie.ShadeColor,_RimColor:Ie.RimColor,_OutlineColor:Ie.OutlineColor},kr=new xt.Color,ii=class ri{constructor({material:t,type:n,targetValue:i,targetAlpha:r}){this.material=t,this.type=n,this.targetValue=i,this.targetAlpha=r!=null?r:1;let o=this._initColorBindState(),s=this._initAlphaBindState();this._state={color:o,alpha:s}}applyWeight(t){let{color:n,alpha:i}=this._state;if(n!=null){let{propertyName:r,deltaValue:o}=n,s=this.material[r];s!=null&&s.add(kr.copy(o).multiplyScalar(t))}if(i!=null){let{propertyName:r,deltaValue:o}=i;this.material[r]!=null&&(this.material[r]+=o*t)}}clearAppliedWeight(){let{color:t,alpha:n}=this._state;if(t!=null){let{propertyName:i,initialValue:r}=t,o=this.material[i];o!=null&&o.copy(r)}if(n!=null){let{propertyName:i,initialValue:r}=n;this.material[i]!=null&&(this.material[i]=r)}}_initColorBindState(){var t,n,i;let{material:r,type:o,targetValue:s}=this,l=this._getPropertyNameMap(),a=(n=(t=l==null?void 0:l[o])==null?void 0:t[0])!=null?n:null;if(a==null)return console.warn(`Tried to add a material color bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${o} but the material or the type is not supported.`),null;let d=r[a].clone(),h=new xt.Color(s.r-d.r,s.g-d.g,s.b-d.b);return{propertyName:a,initialValue:d,deltaValue:h}}_initAlphaBindState(){var t,n,i;let{material:r,type:o,targetAlpha:s}=this,l=this._getPropertyNameMap(),a=(n=(t=l==null?void 0:l[o])==null?void 0:t[1])!=null?n:null;if(a==null&&s!==1)return console.warn(`Tried to add a material alpha bind to the material ${(i=r.name)!=null?i:"(no name)"}, the type ${o} but the material or the type does not support alpha.`),null;if(a==null)return null;let u=r[a],d=s-u;return{propertyName:a,initialValue:u,deltaValue:d}}_getPropertyNameMap(){var t,n;return(n=(t=Object.entries(ri._propertyNameMapMap).find(([i])=>this.material[i]===!0))==null?void 0:t[1])!=null?n:null}};ii._propertyNameMapMap={isMeshStandardMaterial:{color:["color","opacity"],emissionColor:["emissive",null]},isMeshBasicMaterial:{color:["color","opacity"]},isMToonMaterial:{color:["color","opacity"],emissionColor:["emissive",null],outlineColor:["outlineColorFactor",null],matcapColor:["matcapFactor",null],rimColor:["parametricRimColorFactor",null],shadeColor:["shadeColorFactor",null]}};var Un=ii,Ce=class{constructor({primitives:e,index:t,weight:n}){this.primitives=e,this.index=t,this.weight=n}applyWeight(e){this.primitives.forEach(t=>{var n;((n=t.morphTargetInfluences)==null?void 0:n[this.index])!=null&&(t.morphTargetInfluences[this.index]+=this.weight*e)})}clearAppliedWeight(){this.primitives.forEach(e=>{var t;((t=e.morphTargetInfluences)==null?void 0:t[this.index])!=null&&(e.morphTargetInfluences[this.index]=0)})}},On=new oi.Vector2,si=class ai{constructor({material:t,scale:n,offset:i}){var r,o;this.material=t,this.scale=n,this.offset=i;let s=(r=Object.entries(ai._propertyNamesMap).find(([l])=>t[l]===!0))==null?void 0:r[1];s==null?(console.warn(`Tried to add a texture transform bind to the material ${(o=t.name)!=null?o:"(no name)"} but the material is not supported.`),this._properties=[]):(this._properties=[],s.forEach(l=>{var a;let u=(a=t[l])==null?void 0:a.clone();if(!u)return null;t[l]=u;let d=u.offset.clone(),h=u.repeat.clone(),c=i.clone().sub(d),p=n.clone().sub(h);this._properties.push({name:l,initialOffset:d,deltaOffset:c,initialScale:h,deltaScale:p})}))}applyWeight(t){this._properties.forEach(n=>{let i=this.material[n.name];i!==void 0&&(i.offset.add(On.copy(n.deltaOffset).multiplyScalar(t)),i.repeat.add(On.copy(n.deltaScale).multiplyScalar(t)))})}clearAppliedWeight(){this._properties.forEach(t=>{let n=this.material[t.name];n!==void 0&&(n.offset.copy(t.initialOffset),n.repeat.copy(t.initialScale))})}};si._propertyNamesMap={isMeshStandardMaterial:["map","emissiveMap","bumpMap","normalMap","displacementMap","roughnessMap","metalnessMap","alphaMap"],isMeshBasicMaterial:["map","specularMap","alphaMap"],isMToonMaterial:["map","normalMap","emissiveMap","shadeMultiplyTexture","rimMultiplyTexture","outlineWidthMultiplyTexture","uvAnimationMaskTexture"]};var Bn=si,Wr=new Set(["1.0","1.0-beta"]),li=class ui{get name(){return"VRMExpressionLoaderPlugin"}constructor(t){this.parser=t}afterRoot(t){return w(this,null,function*(){t.userData.vrmExpressionManager=yield this._import(t)})}_import(t){return w(this,null,function*(){let n=yield this._v1Import(t);if(n)return n;let i=yield this._v0Import(t);return i||null})}_v1Import(t){return w(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let s=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!s)return null;let l=s.specVersion;if(!Wr.has(l))return console.warn(`VRMExpressionLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let a=s.expressions;if(!a)return null;let u=new Set(Object.values(Et)),d=new Map;a.preset!=null&&Object.entries(a.preset).forEach(([c,p])=>{if(p!=null){if(!u.has(c)){console.warn(`VRMExpressionLoaderPlugin: Unknown preset name "${c}" detected. Ignoring the expression`);return}d.set(c,p)}}),a.custom!=null&&Object.entries(a.custom).forEach(([c,p])=>{if(u.has(c)){console.warn(`VRMExpressionLoaderPlugin: Custom expression cannot have preset name "${c}". Ignoring the expression`);return}d.set(c,p)});let h=new Cn;return yield Promise.all(Array.from(d.entries()).map(c=>w(this,[c],function*([p,m]){var f,_,g,R,x,T,v;let M=new Ln(p);if(t.scene.add(M),M.isBinary=(f=m.isBinary)!=null?f:!1,M.overrideBlink=(_=m.overrideBlink)!=null?_:"none",M.overrideLookAt=(g=m.overrideLookAt)!=null?g:"none",M.overrideMouth=(R=m.overrideMouth)!=null?R:"none",(x=m.morphTargetBinds)==null||x.forEach(y=>w(this,null,function*(){var A;if(y.node===void 0||y.index===void 0)return;let I=yield In(t,y.node),P=y.index;if(!I.every(H=>Array.isArray(H.morphTargetInfluences)&&P<H.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${m.name} attempts to index morph #${P} but not found.`);return}M.addBind(new Ce({primitives:I,index:P,weight:(A=y.weight)!=null?A:1}))})),m.materialColorBinds||m.textureTransformBinds){let y=[];t.scene.traverse(A=>{let I=A.material;I&&(Array.isArray(I)?y.push(...I):y.push(I))}),(T=m.materialColorBinds)==null||T.forEach(A=>w(this,null,function*(){y.filter(P=>{var H;let C=(H=this.parser.associations.get(P))==null?void 0:H.materials;return A.material===C}).forEach(P=>{M.addBind(new Un({material:P,type:A.type,targetValue:new ne.Color().fromArray(A.targetValue),targetAlpha:A.targetValue[3]}))})})),(v=m.textureTransformBinds)==null||v.forEach(A=>w(this,null,function*(){y.filter(P=>{var H;let C=(H=this.parser.associations.get(P))==null?void 0:H.materials;return A.material===C}).forEach(P=>{var H,C;M.addBind(new Bn({material:P,offset:new ne.Vector2().fromArray((H=A.offset)!=null?H:[0,0]),scale:new ne.Vector2().fromArray((C=A.scale)!=null?C:[1,1])}))})}))}h.registerExpression(M)}))),h})}_v0Import(t){return w(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let o=r.blendShapeMaster;if(!o)return null;let s=new Cn,l=o.blendShapeGroups;if(!l)return s;let a=new Set;return yield Promise.all(l.map(u=>w(this,null,function*(){var d;let h=u.presetName,c=h!=null&&ui.v0v1PresetNameMap[h]||null,p=c!=null?c:u.name;if(p==null){console.warn("VRMExpressionLoaderPlugin: One of custom expressions has no name. Ignoring the expression");return}if(a.has(p)){console.warn(`VRMExpressionLoaderPlugin: An expression preset ${h} has duplicated entries. Ignoring the expression`);return}a.add(p);let m=new Ln(p);t.scene.add(m),m.isBinary=(d=u.isBinary)!=null?d:!1,u.binds&&u.binds.forEach(_=>w(this,null,function*(){var g;if(_.mesh===void 0||_.index===void 0)return;let R=[];if((g=i.nodes)==null||g.forEach((T,v)=>{T.mesh===_.mesh&&R.push(v)}),R.length===0){console.warn(`VRMExpressionLoaderPlugin: ${u.name} attempts to bind a morph target to the mesh #${_.mesh} but the mesh is not found or not used in the scene. Ignoring the bind.`);return}let x=_.index;yield Promise.all(R.map(T=>w(this,null,function*(){var v;let M=yield In(t,T);if(!M.every(y=>Array.isArray(y.morphTargetInfluences)&&x<y.morphTargetInfluences.length)){console.warn(`VRMExpressionLoaderPlugin: ${u.name} attempts to index ${x}th morph but not found.`);return}m.addBind(new Ce({primitives:M,index:x,weight:.01*((v=_.weight)!=null?v:100)}))})))}));let f=u.materialValues;f&&f.length!==0&&f.forEach(_=>{if(_.materialName===void 0||_.propertyName===void 0||_.targetValue===void 0)return;let g=[];t.scene.traverse(x=>{if(x.material){let T=x.material;Array.isArray(T)?g.push(...T.filter(v=>(v.name===_.materialName||v.name===_.materialName+" (Outline)")&&g.indexOf(v)===-1)):T.name===_.materialName&&g.indexOf(T)===-1&&g.push(T)}});let R=_.propertyName;g.forEach(x=>{if(R==="_MainTex_ST"){let v=new ne.Vector2(_.targetValue[0],_.targetValue[1]),M=new ne.Vector2(_.targetValue[2],_.targetValue[3]);M.y=1-M.y-v.y,m.addBind(new Bn({material:x,scale:v,offset:M}));return}let T=Fr[R];if(T){m.addBind(new Un({material:x,type:T,targetValue:new ne.Color().fromArray(_.targetValue),targetAlpha:_.targetValue[3]}));return}console.warn(R+" is not supported")})}),s.registerExpression(m)}))),s})}};li.v0v1PresetNameMap={a:"aa",e:"ee",i:"ih",o:"oh",u:"ou",blink:"blink",joy:"happy",angry:"angry",sorrow:"sad",fun:"relaxed",lookup:"lookUp",lookdown:"lookDown",lookleft:"lookLeft",lookright:"lookRight",blink_l:"blinkLeft",blink_r:"blinkRight",neutral:"neutral"};var yt=li,js={None:"none",Block:"block",Blend:"blend"},wt=class Me{constructor(t,n){this._firstPersonOnlyLayer=Me.DEFAULT_FIRSTPERSON_ONLY_LAYER,this._thirdPersonOnlyLayer=Me.DEFAULT_THIRDPERSON_ONLY_LAYER,this._initializedLayers=!1,this.humanoid=t,this.meshAnnotations=n}copy(t){if(this.humanoid!==t.humanoid)throw new Error("VRMFirstPerson: humanoid must be same in order to copy");return this.meshAnnotations=t.meshAnnotations.map(n=>({meshes:n.meshes.concat(),type:n.type})),this}clone(){return new Me(this.humanoid,this.meshAnnotations).copy(this)}get firstPersonOnlyLayer(){return this._firstPersonOnlyLayer}get thirdPersonOnlyLayer(){return this._thirdPersonOnlyLayer}setup({firstPersonOnlyLayer:t=Me.DEFAULT_FIRSTPERSON_ONLY_LAYER,thirdPersonOnlyLayer:n=Me.DEFAULT_THIRDPERSON_ONLY_LAYER}={}){this._initializedLayers||(this._firstPersonOnlyLayer=t,this._thirdPersonOnlyLayer=n,this.meshAnnotations.forEach(i=>{i.meshes.forEach(r=>{i.type==="firstPersonOnly"?(r.layers.set(this._firstPersonOnlyLayer),r.traverse(o=>o.layers.set(this._firstPersonOnlyLayer))):i.type==="thirdPersonOnly"?(r.layers.set(this._thirdPersonOnlyLayer),r.traverse(o=>o.layers.set(this._thirdPersonOnlyLayer))):i.type==="auto"&&this._createHeadlessModel(r)})}),this._initializedLayers=!0)}_excludeTriangles(t,n,i,r){let o=0;if(n!=null&&n.length>0)for(let s=0;s<t.length;s+=3){let l=t[s],a=t[s+1],u=t[s+2],d=n[l],h=i[l];if(d[0]>0&&r.includes(h[0])||d[1]>0&&r.includes(h[1])||d[2]>0&&r.includes(h[2])||d[3]>0&&r.includes(h[3]))continue;let c=n[a],p=i[a];if(c[0]>0&&r.includes(p[0])||c[1]>0&&r.includes(p[1])||c[2]>0&&r.includes(p[2])||c[3]>0&&r.includes(p[3]))continue;let m=n[u],f=i[u];m[0]>0&&r.includes(f[0])||m[1]>0&&r.includes(f[1])||m[2]>0&&r.includes(f[2])||m[3]>0&&r.includes(f[3])||(t[o++]=l,t[o++]=a,t[o++]=u)}return o}_createErasedMesh(t,n){let i=new W.SkinnedMesh(t.geometry.clone(),t.material);i.name=`${t.name}(erase)`,i.frustumCulled=t.frustumCulled,i.layers.set(this._firstPersonOnlyLayer);let r=i.geometry,o=r.getAttribute("skinIndex"),s=o instanceof W.GLBufferAttribute?[]:o.array,l=[];for(let f=0;f<s.length;f+=4)l.push([s[f],s[f+1],s[f+2],s[f+3]]);let a=r.getAttribute("skinWeight"),u=a instanceof W.GLBufferAttribute?[]:a.array,d=[];for(let f=0;f<u.length;f+=4)d.push([u[f],u[f+1],u[f+2],u[f+3]]);let h=r.getIndex();if(!h)throw new Error("The geometry doesn't have an index buffer");let c=Array.from(h.array),p=this._excludeTriangles(c,d,l,n),m=[];for(let f=0;f<p;f++)m[f]=c[f];return r.setIndex(m),t.onBeforeRender&&(i.onBeforeRender=t.onBeforeRender),i.bind(new W.Skeleton(t.skeleton.bones,t.skeleton.boneInverses),new W.Matrix4),i}_createHeadlessModelForSkinnedMesh(t,n){let i=[];if(n.skeleton.bones.forEach((o,s)=>{this._isEraseTarget(o)&&i.push(s)}),!i.length){n.layers.enable(this._thirdPersonOnlyLayer),n.layers.enable(this._firstPersonOnlyLayer);return}n.layers.set(this._thirdPersonOnlyLayer);let r=this._createErasedMesh(n,i);t.add(r)}_createHeadlessModel(t){if(t.type==="Group")if(t.layers.set(this._thirdPersonOnlyLayer),this._isEraseTarget(t))t.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer));else{let n=new W.Group;n.name=`_headless_${t.name}`,n.layers.set(this._firstPersonOnlyLayer),t.parent.add(n),t.children.filter(i=>i.type==="SkinnedMesh").forEach(i=>{let r=i;this._createHeadlessModelForSkinnedMesh(n,r)})}else if(t.type==="SkinnedMesh"){let n=t;this._createHeadlessModelForSkinnedMesh(t.parent,n)}else this._isEraseTarget(t)&&(t.layers.set(this._thirdPersonOnlyLayer),t.traverse(n=>n.layers.set(this._thirdPersonOnlyLayer)))}_isEraseTarget(t){return t===this.humanoid.getRawBoneNode("head")?!0:t.parent?this._isEraseTarget(t.parent):!1}};wt.DEFAULT_FIRSTPERSON_ONLY_LAYER=9;wt.DEFAULT_THIRDPERSON_ONLY_LAYER=10;var Nn=wt,Gr=new Set(["1.0","1.0-beta"]),St=class{get name(){return"VRMFirstPersonLoaderPlugin"}constructor(e){this.parser=e}afterRoot(e){return w(this,null,function*(){let t=e.userData.vrmHumanoid;if(t!==null){if(t===void 0)throw new Error("VRMFirstPersonLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");e.userData.vrmFirstPerson=yield this._import(e,t)}})}_import(e,t){return w(this,null,function*(){if(t==null)return null;let n=yield this._v1Import(e,t);if(n)return n;let i=yield this._v0Import(e,t);return i||null})}_v1Import(e,t){return w(this,null,function*(){var n,i;let r=this.parser.json;if(!(((n=r.extensionsUsed)==null?void 0:n.indexOf("VRMC_vrm"))!==-1))return null;let s=(i=r.extensions)==null?void 0:i.VRMC_vrm;if(!s)return null;let l=s.specVersion;if(!Gr.has(l))return console.warn(`VRMFirstPersonLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let a=s.firstPerson,u=[],d=yield Vn(e);return Array.from(d.entries()).forEach(([h,c])=>{var p,m;let f=(p=a==null?void 0:a.meshAnnotations)==null?void 0:p.find(_=>_.node===h);u.push({meshes:c,type:(m=f==null?void 0:f.type)!=null?m:"auto"})}),new Nn(t,u)})}_v0Import(e,t){return w(this,null,function*(){var n;let i=this.parser.json,r=(n=i.extensions)==null?void 0:n.VRM;if(!r)return null;let o=r.firstPerson;if(!o)return null;let s=[],l=yield Vn(e);return Array.from(l.entries()).forEach(([a,u])=>{let d=i.nodes[a],h=o.meshAnnotations?o.meshAnnotations.find(c=>c.mesh===d.mesh):void 0;s.push({meshes:u,type:this._convertV0FlagToV1Type(h==null?void 0:h.firstPersonFlag)})}),new Nn(t,s)})}_convertV0FlagToV1Type(e){return e==="FirstPersonOnly"?"firstPersonOnly":e==="ThirdPersonOnly"?"thirdPersonOnly":e==="Both"?"both":"auto"}},qs={Auto:"auto",Both:"both",ThirdPersonOnly:"thirdPersonOnly",FirstPersonOnly:"firstPersonOnly"},Dn=new $.Vector3,Fn=new $.Vector3,zr=new $.Quaternion,kn=class extends $.Group{constructor(e){super(),this.vrmHumanoid=e,this._boneAxesMap=new Map,Object.values(e.humanBones).forEach(t=>{let n=new $.AxesHelper(1);n.matrixAutoUpdate=!1,n.material.depthTest=!1,n.material.depthWrite=!1,this.add(n),this._boneAxesMap.set(t,n)})}dispose(){Array.from(this._boneAxesMap.values()).forEach(e=>{e.geometry.dispose(),e.material.dispose()})}updateMatrixWorld(e){Array.from(this._boneAxesMap.entries()).forEach(([t,n])=>{t.node.updateWorldMatrix(!0,!1),t.node.matrixWorld.decompose(Dn,zr,Fn);let i=Dn.set(.1,.1,.1).divide(Fn);n.matrix.copy(t.node.matrixWorld).scale(i)}),super.updateMatrixWorld(e)}},mt=["hips","spine","chest","upperChest","neck","head","leftEye","rightEye","jaw","leftUpperLeg","leftLowerLeg","leftFoot","leftToes","rightUpperLeg","rightLowerLeg","rightFoot","rightToes","leftShoulder","leftUpperArm","leftLowerArm","leftHand","rightShoulder","rightUpperArm","rightLowerArm","rightHand","leftThumbMetacarpal","leftThumbProximal","leftThumbDistal","leftIndexProximal","leftIndexIntermediate","leftIndexDistal","leftMiddleProximal","leftMiddleIntermediate","leftMiddleDistal","leftRingProximal","leftRingIntermediate","leftRingDistal","leftLittleProximal","leftLittleIntermediate","leftLittleDistal","rightThumbMetacarpal","rightThumbProximal","rightThumbDistal","rightIndexProximal","rightIndexIntermediate","rightIndexDistal","rightMiddleProximal","rightMiddleIntermediate","rightMiddleDistal","rightRingProximal","rightRingIntermediate","rightRingDistal","rightLittleProximal","rightLittleIntermediate","rightLittleDistal"],Zs={Hips:"hips",Spine:"spine",Chest:"chest",UpperChest:"upperChest",Neck:"neck",Head:"head",LeftEye:"leftEye",RightEye:"rightEye",Jaw:"jaw",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",LeftToes:"leftToes",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",RightToes:"rightToes",LeftShoulder:"leftShoulder",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightShoulder:"rightShoulder",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand",LeftThumbMetacarpal:"leftThumbMetacarpal",LeftThumbProximal:"leftThumbProximal",LeftThumbDistal:"leftThumbDistal",LeftIndexProximal:"leftIndexProximal",LeftIndexIntermediate:"leftIndexIntermediate",LeftIndexDistal:"leftIndexDistal",LeftMiddleProximal:"leftMiddleProximal",LeftMiddleIntermediate:"leftMiddleIntermediate",LeftMiddleDistal:"leftMiddleDistal",LeftRingProximal:"leftRingProximal",LeftRingIntermediate:"leftRingIntermediate",LeftRingDistal:"leftRingDistal",LeftLittleProximal:"leftLittleProximal",LeftLittleIntermediate:"leftLittleIntermediate",LeftLittleDistal:"leftLittleDistal",RightThumbMetacarpal:"rightThumbMetacarpal",RightThumbProximal:"rightThumbProximal",RightThumbDistal:"rightThumbDistal",RightIndexProximal:"rightIndexProximal",RightIndexIntermediate:"rightIndexIntermediate",RightIndexDistal:"rightIndexDistal",RightMiddleProximal:"rightMiddleProximal",RightMiddleIntermediate:"rightMiddleIntermediate",RightMiddleDistal:"rightMiddleDistal",RightRingProximal:"rightRingProximal",RightRingIntermediate:"rightRingIntermediate",RightRingDistal:"rightRingDistal",RightLittleProximal:"rightLittleProximal",RightLittleIntermediate:"rightLittleIntermediate",RightLittleDistal:"rightLittleDistal"},Yr={hips:null,spine:"hips",chest:"spine",upperChest:"chest",neck:"upperChest",head:"neck",leftEye:"head",rightEye:"head",jaw:"head",leftUpperLeg:"hips",leftLowerLeg:"leftUpperLeg",leftFoot:"leftLowerLeg",leftToes:"leftFoot",rightUpperLeg:"hips",rightLowerLeg:"rightUpperLeg",rightFoot:"rightLowerLeg",rightToes:"rightFoot",leftShoulder:"upperChest",leftUpperArm:"leftShoulder",leftLowerArm:"leftUpperArm",leftHand:"leftLowerArm",rightShoulder:"upperChest",rightUpperArm:"rightShoulder",rightLowerArm:"rightUpperArm",rightHand:"rightLowerArm",leftThumbMetacarpal:"leftHand",leftThumbProximal:"leftThumbMetacarpal",leftThumbDistal:"leftThumbProximal",leftIndexProximal:"leftHand",leftIndexIntermediate:"leftIndexProximal",leftIndexDistal:"leftIndexIntermediate",leftMiddleProximal:"leftHand",leftMiddleIntermediate:"leftMiddleProximal",leftMiddleDistal:"leftMiddleIntermediate",leftRingProximal:"leftHand",leftRingIntermediate:"leftRingProximal",leftRingDistal:"leftRingIntermediate",leftLittleProximal:"leftHand",leftLittleIntermediate:"leftLittleProximal",leftLittleDistal:"leftLittleIntermediate",rightThumbMetacarpal:"rightHand",rightThumbProximal:"rightThumbMetacarpal",rightThumbDistal:"rightThumbProximal",rightIndexProximal:"rightHand",rightIndexIntermediate:"rightIndexProximal",rightIndexDistal:"rightIndexIntermediate",rightMiddleProximal:"rightHand",rightMiddleIntermediate:"rightMiddleProximal",rightMiddleDistal:"rightMiddleIntermediate",rightRingProximal:"rightHand",rightRingIntermediate:"rightRingProximal",rightRingDistal:"rightRingIntermediate",rightLittleProximal:"rightHand",rightLittleIntermediate:"rightLittleProximal",rightLittleDistal:"rightLittleIntermediate"};function di(e){return e.invert?e.invert():e.inverse(),e}var he=new Ke.Vector3,ce=new Ke.Quaternion,vt=class{constructor(e){this.humanBones=e,this.restPose=this.getAbsolutePose()}getAbsolutePose(){let e={};return Object.keys(this.humanBones).forEach(t=>{let n=t,i=this.getBoneNode(n);i&&(he.copy(i.position),ce.copy(i.quaternion),e[n]={position:he.toArray(),rotation:ce.toArray()})}),e}getPose(){let e={};return Object.keys(this.humanBones).forEach(t=>{let n=t,i=this.getBoneNode(n);if(!i)return;he.set(0,0,0),ce.identity();let r=this.restPose[n];r!=null&&r.position&&he.fromArray(r.position).negate(),r!=null&&r.rotation&&di(ce.fromArray(r.rotation)),he.add(i.position),ce.premultiply(i.quaternion),e[n]={position:he.toArray(),rotation:ce.toArray()}}),e}setPose(e){Object.entries(e).forEach(([t,n])=>{let i=t,r=this.getBoneNode(i);if(!r)return;let o=this.restPose[i];o&&(n!=null&&n.position&&(r.position.fromArray(n.position),o.position&&r.position.add(he.fromArray(o.position))),n!=null&&n.rotation&&(r.quaternion.fromArray(n.rotation),o.rotation&&r.quaternion.multiply(ce.fromArray(o.rotation))))})}resetPose(){Object.entries(this.restPose).forEach(([e,t])=>{let n=this.getBoneNode(e);n&&(t!=null&&t.position&&n.position.fromArray(t.position),t!=null&&t.rotation&&n.quaternion.fromArray(t.rotation))})}getBone(e){var t;return(t=this.humanBones[e])!=null?t:void 0}getBoneNode(e){var t,n;return(n=(t=this.humanBones[e])==null?void 0:t.node)!=null?n:null}},ft=new G.Vector3,Xr=new G.Quaternion,Qr=new G.Vector3,Wn=class hi extends vt{static _setupTransforms(t){let n=new G.Object3D;n.name="VRMHumanoidRig";let i={},r={},o={},s={};mt.forEach(a=>{var u;let d=t.getBoneNode(a);if(d){let h=new G.Vector3,c=new G.Quaternion;d.updateWorldMatrix(!0,!1),d.matrixWorld.decompose(h,c,ft),i[a]=h,r[a]=c,o[a]=d.quaternion.clone();let p=new G.Quaternion;(u=d.parent)==null||u.matrixWorld.decompose(ft,p,ft),s[a]=p}});let l={};return mt.forEach(a=>{var u;let d=t.getBoneNode(a);if(d){let h=i[a],c=a,p;for(;p==null&&(c=Yr[c],c!=null);)p=i[c];let m=new G.Object3D;m.name="Normalized_"+d.name,(c?(u=l[c])==null?void 0:u.node:n).add(m),m.position.copy(h),p&&m.position.sub(p),l[a]={node:m}}}),{rigBones:l,root:n,parentWorldRotations:s,boneRotations:o}}constructor(t){let{rigBones:n,root:i,parentWorldRotations:r,boneRotations:o}=hi._setupTransforms(t);super(n),this.original=t,this.root=i,this._parentWorldRotations=r,this._boneRotations=o}update(){mt.forEach(t=>{let n=this.original.getBoneNode(t);if(n!=null){let i=this.getBoneNode(t),r=this._parentWorldRotations[t],o=Xr.copy(r).invert(),s=this._boneRotations[t];if(n.quaternion.copy(i.quaternion).multiply(r).premultiply(o).multiply(s),t==="hips"){let l=i.getWorldPosition(Qr);n.parent.updateWorldMatrix(!0,!1);let a=n.parent.matrixWorld,u=l.applyMatrix4(a.invert());n.position.copy(u)}}})}},Gn=class ci{get restPose(){return console.warn("VRMHumanoid: restPose is deprecated. Use either rawRestPose or normalizedRestPose instead."),this.rawRestPose}get rawRestPose(){return this._rawHumanBones.restPose}get normalizedRestPose(){return this._normalizedHumanBones.restPose}get humanBones(){return this._rawHumanBones.humanBones}get rawHumanBones(){return this._rawHumanBones.humanBones}get normalizedHumanBones(){return this._normalizedHumanBones.humanBones}get normalizedHumanBonesRoot(){return this._normalizedHumanBones.root}constructor(t,n){var i;this.autoUpdateHumanBones=(i=n==null?void 0:n.autoUpdateHumanBones)!=null?i:!0,this._rawHumanBones=new vt(t),this._normalizedHumanBones=new Wn(this._rawHumanBones)}copy(t){return this.autoUpdateHumanBones=t.autoUpdateHumanBones,this._rawHumanBones=new vt(t.humanBones),this._normalizedHumanBones=new Wn(this._rawHumanBones),this}clone(){return new ci(this.humanBones,{autoUpdateHumanBones:this.autoUpdateHumanBones}).copy(this)}getAbsolutePose(){return console.warn("VRMHumanoid: getAbsolutePose() is deprecated. Use either getRawAbsolutePose() or getNormalizedAbsolutePose() instead."),this.getRawAbsolutePose()}getRawAbsolutePose(){return this._rawHumanBones.getAbsolutePose()}getNormalizedAbsolutePose(){return this._normalizedHumanBones.getAbsolutePose()}getPose(){return console.warn("VRMHumanoid: getPose() is deprecated. Use either getRawPose() or getNormalizedPose() instead."),this.getRawPose()}getRawPose(){return this._rawHumanBones.getPose()}getNormalizedPose(){return this._normalizedHumanBones.getPose()}setPose(t){return console.warn("VRMHumanoid: setPose() is deprecated. Use either setRawPose() or setNormalizedPose() instead."),this.setRawPose(t)}setRawPose(t){return this._rawHumanBones.setPose(t)}setNormalizedPose(t){return this._normalizedHumanBones.setPose(t)}resetPose(){return console.warn("VRMHumanoid: resetPose() is deprecated. Use either resetRawPose() or resetNormalizedPose() instead."),this.resetRawPose()}resetRawPose(){return this._rawHumanBones.resetPose()}resetNormalizedPose(){return this._normalizedHumanBones.resetPose()}getBone(t){return console.warn("VRMHumanoid: getBone() is deprecated. Use either getRawBone() or getNormalizedBone() instead."),this.getRawBone(t)}getRawBone(t){return this._rawHumanBones.getBone(t)}getNormalizedBone(t){return this._normalizedHumanBones.getBone(t)}getBoneNode(t){return console.warn("VRMHumanoid: getBoneNode() is deprecated. Use either getRawBoneNode() or getNormalizedBoneNode() instead."),this.getRawBoneNode(t)}getRawBoneNode(t){return this._rawHumanBones.getBoneNode(t)}getNormalizedBoneNode(t){return this._normalizedHumanBones.getBoneNode(t)}update(){this.autoUpdateHumanBones&&this._normalizedHumanBones.update()}},jr={Hips:"hips",Spine:"spine",Head:"head",LeftUpperLeg:"leftUpperLeg",LeftLowerLeg:"leftLowerLeg",LeftFoot:"leftFoot",RightUpperLeg:"rightUpperLeg",RightLowerLeg:"rightLowerLeg",RightFoot:"rightFoot",LeftUpperArm:"leftUpperArm",LeftLowerArm:"leftLowerArm",LeftHand:"leftHand",RightUpperArm:"rightUpperArm",RightLowerArm:"rightLowerArm",RightHand:"rightHand"},qr=new Set(["1.0","1.0-beta"]),zn={leftThumbProximal:"leftThumbMetacarpal",leftThumbIntermediate:"leftThumbProximal",rightThumbProximal:"rightThumbMetacarpal",rightThumbIntermediate:"rightThumbProximal"},At=class{get name(){return"VRMHumanoidLoaderPlugin"}constructor(e,t){this.parser=e,this.helperRoot=t==null?void 0:t.helperRoot,this.autoUpdateHumanBones=t==null?void 0:t.autoUpdateHumanBones}afterRoot(e){return w(this,null,function*(){e.userData.vrmHumanoid=yield this._import(e)})}_import(e){return w(this,null,function*(){let t=yield this._v1Import(e);if(t)return t;let n=yield this._v0Import(e);return n||null})}_v1Import(e){return w(this,null,function*(){var t,n;let i=this.parser.json;if(!(((t=i.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let o=(n=i.extensions)==null?void 0:n.VRMC_vrm;if(!o)return null;let s=o.specVersion;if(!qr.has(s))return console.warn(`VRMHumanoidLoaderPlugin: Unknown VRMC_vrm specVersion "${s}"`),null;let l=o.humanoid;if(!l)return null;let a=l.humanBones.leftThumbIntermediate!=null||l.humanBones.rightThumbIntermediate!=null,u={};l.humanBones!=null&&(yield Promise.all(Object.entries(l.humanBones).map(h=>w(this,[h],function*([c,p]){let m=c,f=p.node;if(a){let g=zn[m];g!=null&&(m=g)}let _=yield this.parser.getDependency("node",f);if(_==null){console.warn(`A glTF node bound to the humanoid bone ${m} (index = ${f}) does not exist`);return}u[m]={node:_}}))));let d=new Gn(this._ensureRequiredBonesExist(u),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(e.scene.add(d.normalizedHumanBonesRoot),this.helperRoot){let h=new kn(d);this.helperRoot.add(h),h.renderOrder=this.helperRoot.renderOrder}return d})}_v0Import(e){return w(this,null,function*(){var t;let i=(t=this.parser.json.extensions)==null?void 0:t.VRM;if(!i)return null;let r=i.humanoid;if(!r)return null;let o={};r.humanBones!=null&&(yield Promise.all(r.humanBones.map(l=>w(this,null,function*(){let a=l.bone,u=l.node;if(a==null||u==null)return;if(u<0){console.warn(`A glTF node index for the humanoid bone ${a} is negative (${u}), ignoring this bone.`);return}let d=yield this.parser.getDependency("node",u);if(d==null){console.warn(`A glTF node bound to the humanoid bone ${a} (index = ${u}) does not exist`);return}let h=zn[a],c=h!=null?h:a;if(o[c]!=null){console.warn(`Multiple bone entries for ${c} detected (index = ${u}), ignoring duplicated entries.`);return}o[c]={node:d}}))));let s=new Gn(this._ensureRequiredBonesExist(o),{autoUpdateHumanBones:this.autoUpdateHumanBones});if(e.scene.add(s.normalizedHumanBonesRoot),this.helperRoot){let l=new kn(s);this.helperRoot.add(l),l.renderOrder=this.helperRoot.renderOrder}return s})}_ensureRequiredBonesExist(e){let t=Object.values(jr).filter(n=>e[n]==null);if(t.length>0)throw new Error(`VRMHumanoidLoaderPlugin: These humanoid bones are required but not exist: ${t.join(", ")}`);return e}},Yn=class extends Ue.BufferGeometry{constructor(){super(),this._currentTheta=0,this._currentRadius=0,this.theta=0,this.radius=0,this._currentTheta=0,this._currentRadius=0,this._attrPos=new Ue.BufferAttribute(new Float32Array(195),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ue.BufferAttribute(new Uint16Array(189),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1;this._currentTheta!==this.theta&&(this._currentTheta=this.theta,e=!0),this._currentRadius!==this.radius&&(this._currentRadius=this.radius,e=!0),e&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,0,0,0);for(let e=0;e<64;e++){let t=e/63*this._currentTheta;this._attrPos.setXYZ(e+1,this._currentRadius*Math.sin(t),0,this._currentRadius*Math.cos(t))}this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<63;e++)this._attrIndex.setXYZ(e*3,0,e+1,e+2);this._attrIndex.needsUpdate=!0}},Zr=class extends ie.BufferGeometry{constructor(){super(),this.radius=0,this._currentRadius=0,this.tail=new ie.Vector3,this._currentTail=new ie.Vector3,this._attrPos=new ie.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ie.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1;this._currentRadius!==this.radius&&(this._currentRadius=this.radius,e=!0),this._currentTail.equals(this.tail)||(this._currentTail.copy(this.tail),e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<32;e++){let t=e/16*Math.PI;this._attrPos.setXYZ(e,Math.cos(t),Math.sin(t),0),this._attrPos.setXYZ(32+e,0,Math.cos(t),Math.sin(t)),this._attrPos.setXYZ(64+e,Math.sin(t),0,Math.cos(t))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(64+e*2,32+e,32+t),this._attrIndex.setXY(128+e*2,64+e,64+t)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},qe=new b.Quaternion,Xn=new b.Quaternion,Ve=new b.Vector3,Qn=new b.Vector3,jn=Math.sqrt(2)/2,$r=new b.Quaternion(0,0,-jn,jn),Jr=new b.Vector3(0,1,0),Kr=class extends b.Group{constructor(e){super(),this.matrixAutoUpdate=!1,this.vrmLookAt=e;{let t=new Yn;t.radius=.5;let n=new b.MeshBasicMaterial({color:65280,transparent:!0,opacity:.5,side:b.DoubleSide,depthTest:!1,depthWrite:!1});this._meshPitch=new b.Mesh(t,n),this.add(this._meshPitch)}{let t=new Yn;t.radius=.5;let n=new b.MeshBasicMaterial({color:16711680,transparent:!0,opacity:.5,side:b.DoubleSide,depthTest:!1,depthWrite:!1});this._meshYaw=new b.Mesh(t,n),this.add(this._meshYaw)}{let t=new Zr;t.radius=.1;let n=new b.LineBasicMaterial({color:16777215,depthTest:!1,depthWrite:!1});this._lineTarget=new b.LineSegments(t,n),this._lineTarget.frustumCulled=!1,this.add(this._lineTarget)}}dispose(){this._meshYaw.geometry.dispose(),this._meshYaw.material.dispose(),this._meshPitch.geometry.dispose(),this._meshPitch.material.dispose(),this._lineTarget.geometry.dispose(),this._lineTarget.material.dispose()}updateMatrixWorld(e){let t=b.MathUtils.DEG2RAD*this.vrmLookAt.yaw;this._meshYaw.geometry.theta=t,this._meshYaw.geometry.update();let n=b.MathUtils.DEG2RAD*this.vrmLookAt.pitch;this._meshPitch.geometry.theta=n,this._meshPitch.geometry.update(),this.vrmLookAt.getLookAtWorldPosition(Ve),this.vrmLookAt.getLookAtWorldQuaternion(qe),qe.multiply(this.vrmLookAt.getFaceFrontQuaternion(Xn)),this._meshYaw.position.copy(Ve),this._meshYaw.quaternion.copy(qe),this._meshPitch.position.copy(Ve),this._meshPitch.quaternion.copy(qe),this._meshPitch.quaternion.multiply(Xn.setFromAxisAngle(Jr,t)),this._meshPitch.quaternion.multiply($r);let{target:i,autoUpdate:r}=this.vrmLookAt;i!=null&&r&&(i.getWorldPosition(Qn).sub(Ve),this._lineTarget.geometry.tail.copy(Qn),this._lineTarget.geometry.update(),this._lineTarget.position.copy(Ve)),super.updateMatrixWorld(e)}},eo=new Pt.Vector3,to=new Pt.Vector3;function Mt(e,t){return e.matrixWorld.decompose(eo,t,to),t}function $e(e){return[Math.atan2(-e.z,e.x),Math.atan2(e.y,Math.sqrt(e.x*e.x+e.z*e.z))]}function qn(e){let t=Math.round(e/2/Math.PI);return e-2*Math.PI*t}var Zn=new V.Vector3(0,0,1),no=new V.Vector3,io=new V.Vector3,ro=new V.Vector3,oo=new V.Quaternion,_t=new V.Quaternion,$n=new V.Quaternion,so=new V.Quaternion,gt=new V.Euler,pi=class mi{constructor(t,n){this.offsetFromHeadBone=new V.Vector3,this.autoUpdate=!0,this.faceFront=new V.Vector3(0,0,1),this.humanoid=t,this.applier=n,this._yaw=0,this._pitch=0,this._needsUpdate=!0,this._restHeadWorldQuaternion=this.getLookAtWorldQuaternion(new V.Quaternion)}get yaw(){return this._yaw}set yaw(t){this._yaw=t,this._needsUpdate=!0}get pitch(){return this._pitch}set pitch(t){this._pitch=t,this._needsUpdate=!0}get euler(){return console.warn("VRMLookAt: euler is deprecated. use getEuler() instead."),this.getEuler(new V.Euler)}getEuler(t){return t.set(V.MathUtils.DEG2RAD*this._pitch,V.MathUtils.DEG2RAD*this._yaw,0,"YXZ")}copy(t){if(this.humanoid!==t.humanoid)throw new Error("VRMLookAt: humanoid must be same in order to copy");return this.offsetFromHeadBone.copy(t.offsetFromHeadBone),this.applier=t.applier,this.autoUpdate=t.autoUpdate,this.target=t.target,this.faceFront.copy(t.faceFront),this}clone(){return new mi(this.humanoid,this.applier).copy(this)}reset(){this._yaw=0,this._pitch=0,this._needsUpdate=!0}getLookAtWorldPosition(t){let n=this.humanoid.getRawBoneNode("head");return t.copy(this.offsetFromHeadBone).applyMatrix4(n.matrixWorld)}getLookAtWorldQuaternion(t){let n=this.humanoid.getRawBoneNode("head");return Mt(n,t)}getFaceFrontQuaternion(t){if(this.faceFront.distanceToSquared(Zn)<.01)return t.copy(this._restHeadWorldQuaternion).invert();let[n,i]=$e(this.faceFront);return gt.set(0,.5*Math.PI+n,i,"YZX"),t.setFromEuler(gt).premultiply(so.copy(this._restHeadWorldQuaternion).invert())}getLookAtWorldDirection(t){return this.getLookAtWorldQuaternion(_t),this.getFaceFrontQuaternion($n),t.copy(Zn).applyQuaternion(_t).applyQuaternion($n).applyEuler(this.getEuler(gt))}lookAt(t){let n=oo.copy(this._restHeadWorldQuaternion).multiply(di(this.getLookAtWorldQuaternion(_t))),i=this.getLookAtWorldPosition(io),r=ro.copy(t).sub(i).applyQuaternion(n).normalize(),[o,s]=$e(this.faceFront),[l,a]=$e(r),u=qn(l-o),d=qn(s-a);this._yaw=V.MathUtils.RAD2DEG*u,this._pitch=V.MathUtils.RAD2DEG*d,this._needsUpdate=!0}update(t){this.target!=null&&this.autoUpdate&&this.lookAt(this.target.getWorldPosition(no)),this._needsUpdate&&(this._needsUpdate=!1,this.applier.applyYawPitch(this._yaw,this._pitch))}};pi.EULER_ORDER="YXZ";var ao=pi,lo=new L.Vector3(0,0,1),X=new L.Quaternion,ve=new L.Quaternion,F=new L.Euler(0,0,0,"YXZ"),Je=class{constructor(e,t,n,i,r){this.humanoid=e,this.rangeMapHorizontalInner=t,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r,this.faceFront=new L.Vector3(0,0,1),this._restQuatLeftEye=new L.Quaternion,this._restQuatRightEye=new L.Quaternion,this._restLeftEyeParentWorldQuat=new L.Quaternion,this._restRightEyeParentWorldQuat=new L.Quaternion;let o=this.humanoid.getRawBoneNode("leftEye"),s=this.humanoid.getRawBoneNode("rightEye");o&&(this._restQuatLeftEye.copy(o.quaternion),Mt(o.parent,this._restLeftEyeParentWorldQuat)),s&&(this._restQuatRightEye.copy(s.quaternion),Mt(s.parent,this._restRightEyeParentWorldQuat))}applyYawPitch(e,t){let n=this.humanoid.getRawBoneNode("leftEye"),i=this.humanoid.getRawBoneNode("rightEye"),r=this.humanoid.getNormalizedBoneNode("leftEye"),o=this.humanoid.getNormalizedBoneNode("rightEye");n&&(t<0?F.x=-L.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-t):F.x=L.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(t),e<0?F.y=-L.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(-e):F.y=L.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(e),X.setFromEuler(F),this._getWorldFaceFrontQuat(ve),r.quaternion.copy(ve).multiply(X).multiply(ve.invert()),X.copy(this._restLeftEyeParentWorldQuat),n.quaternion.copy(r.quaternion).multiply(X).premultiply(X.invert()).multiply(this._restQuatLeftEye)),i&&(t<0?F.x=-L.MathUtils.DEG2RAD*this.rangeMapVerticalDown.map(-t):F.x=L.MathUtils.DEG2RAD*this.rangeMapVerticalUp.map(t),e<0?F.y=-L.MathUtils.DEG2RAD*this.rangeMapHorizontalOuter.map(-e):F.y=L.MathUtils.DEG2RAD*this.rangeMapHorizontalInner.map(e),X.setFromEuler(F),this._getWorldFaceFrontQuat(ve),o.quaternion.copy(ve).multiply(X).multiply(ve.invert()),X.copy(this._restRightEyeParentWorldQuat),i.quaternion.copy(o.quaternion).multiply(X).premultiply(X.invert()).multiply(this._restQuatRightEye))}lookAt(e){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let t=L.MathUtils.RAD2DEG*e.y,n=L.MathUtils.RAD2DEG*e.x;this.applyYawPitch(t,n)}_getWorldFaceFrontQuat(e){if(this.faceFront.distanceToSquared(lo)<.01)return e.identity();let[t,n]=$e(this.faceFront);return F.set(0,.5*Math.PI+t,n,"YZX"),e.setFromEuler(F)}};Je.type="bone";var Tt=class{constructor(e,t,n,i,r){this.expressions=e,this.rangeMapHorizontalInner=t,this.rangeMapHorizontalOuter=n,this.rangeMapVerticalDown=i,this.rangeMapVerticalUp=r}applyYawPitch(e,t){t<0?(this.expressions.setValue("lookDown",0),this.expressions.setValue("lookUp",this.rangeMapVerticalUp.map(-t))):(this.expressions.setValue("lookUp",0),this.expressions.setValue("lookDown",this.rangeMapVerticalDown.map(t))),e<0?(this.expressions.setValue("lookLeft",0),this.expressions.setValue("lookRight",this.rangeMapHorizontalOuter.map(-e))):(this.expressions.setValue("lookRight",0),this.expressions.setValue("lookLeft",this.rangeMapHorizontalOuter.map(e)))}lookAt(e){console.warn("VRMLookAtBoneApplier: lookAt() is deprecated. use apply() instead.");let t=Rt.MathUtils.RAD2DEG*e.y,n=Rt.MathUtils.RAD2DEG*e.x;this.applyYawPitch(t,n)}};Tt.type="expression";var Jn=class{constructor(e,t){this.inputMaxValue=e,this.outputScale=t}map(e){return this.outputScale*ti(e/this.inputMaxValue)}},uo=new Set(["1.0","1.0-beta"]),Ze=.01,bt=class{get name(){return"VRMLookAtLoaderPlugin"}constructor(e,t){this.parser=e,this.helperRoot=t==null?void 0:t.helperRoot}afterRoot(e){return w(this,null,function*(){let t=e.userData.vrmHumanoid;if(t===null)return;if(t===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmHumanoid is undefined. VRMHumanoidLoaderPlugin have to be used first");let n=e.userData.vrmExpressionManager;if(n!==null){if(n===void 0)throw new Error("VRMLookAtLoaderPlugin: vrmExpressionManager is undefined. VRMExpressionLoaderPlugin have to be used first");e.userData.vrmLookAt=yield this._import(e,t,n)}})}_import(e,t,n){return w(this,null,function*(){if(t==null||n==null)return null;let i=yield this._v1Import(e,t,n);if(i)return i;let r=yield this._v0Import(e,t,n);return r||null})}_v1Import(e,t,n){return w(this,null,function*(){var i,r,o;let s=this.parser.json;if(!(((i=s.extensionsUsed)==null?void 0:i.indexOf("VRMC_vrm"))!==-1))return null;let a=(r=s.extensions)==null?void 0:r.VRMC_vrm;if(!a)return null;let u=a.specVersion;if(!uo.has(u))return console.warn(`VRMLookAtLoaderPlugin: Unknown VRMC_vrm specVersion "${u}"`),null;let d=a.lookAt;if(!d)return null;let h=d.type==="expression"?1:10,c=this._v1ImportRangeMap(d.rangeMapHorizontalInner,h),p=this._v1ImportRangeMap(d.rangeMapHorizontalOuter,h),m=this._v1ImportRangeMap(d.rangeMapVerticalDown,h),f=this._v1ImportRangeMap(d.rangeMapVerticalUp,h),_;d.type==="expression"?_=new Tt(n,c,p,m,f):_=new Je(t,c,p,m,f);let g=this._importLookAt(t,_);return g.offsetFromHeadBone.fromArray((o=d.offsetFromHeadBone)!=null?o:[0,.06,0]),g})}_v1ImportRangeMap(e,t){var n,i;let r=(n=e==null?void 0:e.inputMaxValue)!=null?n:90,o=(i=e==null?void 0:e.outputScale)!=null?i:t;return r<Ze&&(console.warn("VRMLookAtLoaderPlugin: inputMaxValue of a range map is too small. Consider reviewing the range map!"),r=Ze),new Jn(r,o)}_v0Import(e,t,n){return w(this,null,function*(){var i,r,o,s;let a=(i=this.parser.json.extensions)==null?void 0:i.VRM;if(!a)return null;let u=a.firstPerson;if(!u)return null;let d=u.lookAtTypeName==="BlendShape"?1:10,h=this._v0ImportDegreeMap(u.lookAtHorizontalInner,d),c=this._v0ImportDegreeMap(u.lookAtHorizontalOuter,d),p=this._v0ImportDegreeMap(u.lookAtVerticalDown,d),m=this._v0ImportDegreeMap(u.lookAtVerticalUp,d),f;u.lookAtTypeName==="BlendShape"?f=new Tt(n,h,c,p,m):f=new Je(t,h,c,p,m);let _=this._importLookAt(t,f);return u.firstPersonBoneOffset?_.offsetFromHeadBone.set((r=u.firstPersonBoneOffset.x)!=null?r:0,(o=u.firstPersonBoneOffset.y)!=null?o:.06,-((s=u.firstPersonBoneOffset.z)!=null?s:0)):_.offsetFromHeadBone.set(0,.06,0),_.faceFront.set(0,0,-1),f instanceof Je&&f.faceFront.set(0,0,-1),_})}_v0ImportDegreeMap(e,t){var n,i;let r=e==null?void 0:e.curve;JSON.stringify(r)!=="[0,0,0,1,1,1,1,0]"&&console.warn("Curves of LookAtDegreeMap defined in VRM 0.0 are not supported");let o=(n=e==null?void 0:e.xRange)!=null?n:90,s=(i=e==null?void 0:e.yRange)!=null?i:t;return o<Ze&&(console.warn("VRMLookAtLoaderPlugin: xRange of a degree map is too small. Consider reviewing the degree map!"),o=Ze),new Jn(o,s)}_importLookAt(e,t){let n=new ao(e,t);if(this.helperRoot){let i=new Kr(n);this.helperRoot.add(i),i.renderOrder=this.helperRoot.renderOrder}return n}},$s={Bone:"bone",Expression:"expression"};function ho(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}var co=new Set(["1.0","1.0-beta"]),Ht=class{get name(){return"VRMMetaLoaderPlugin"}constructor(e,t){var n,i,r;this.parser=e,this.needThumbnailImage=(n=t==null?void 0:t.needThumbnailImage)!=null?n:!1,this.acceptLicenseUrls=(i=t==null?void 0:t.acceptLicenseUrls)!=null?i:["https://vrm.dev/licenses/1.0/"],this.acceptV0Meta=(r=t==null?void 0:t.acceptV0Meta)!=null?r:!0}afterRoot(e){return w(this,null,function*(){e.userData.vrmMeta=yield this._import(e)})}_import(e){return w(this,null,function*(){let t=yield this._v1Import(e);if(t!=null)return t;let n=yield this._v0Import(e);return n!=null?n:null})}_v1Import(e){return w(this,null,function*(){var t,n,i;let r=this.parser.json;if(!(((t=r.extensionsUsed)==null?void 0:t.indexOf("VRMC_vrm"))!==-1))return null;let s=(n=r.extensions)==null?void 0:n.VRMC_vrm;if(s==null)return null;let l=s.specVersion;if(!co.has(l))return console.warn(`VRMMetaLoaderPlugin: Unknown VRMC_vrm specVersion "${l}"`),null;let a=s.meta;if(!a)return null;let u=a.licenseUrl;if(!new Set(this.acceptLicenseUrls).has(u))throw new Error(`VRMMetaLoaderPlugin: The license url "${u}" is not accepted`);let h;return this.needThumbnailImage&&a.thumbnailImage!=null&&(h=(i=yield this._extractGLTFImage(a.thumbnailImage))!=null?i:void 0),{metaVersion:"1",name:a.name,version:a.version,authors:a.authors,copyrightInformation:a.copyrightInformation,contactInformation:a.contactInformation,references:a.references,thirdPartyLicenses:a.thirdPartyLicenses,thumbnailImage:h,licenseUrl:a.licenseUrl,avatarPermission:a.avatarPermission,allowExcessivelyViolentUsage:a.allowExcessivelyViolentUsage,allowExcessivelySexualUsage:a.allowExcessivelySexualUsage,commercialUsage:a.commercialUsage,allowPoliticalOrReligiousUsage:a.allowPoliticalOrReligiousUsage,allowAntisocialOrHateUsage:a.allowAntisocialOrHateUsage,creditNotation:a.creditNotation,allowRedistribution:a.allowRedistribution,modification:a.modification,otherLicenseUrl:a.otherLicenseUrl}})}_v0Import(e){return w(this,null,function*(){var t;let i=(t=this.parser.json.extensions)==null?void 0:t.VRM;if(!i)return null;let r=i.meta;if(!r)return null;if(!this.acceptV0Meta)throw new Error("VRMMetaLoaderPlugin: Attempted to load VRM0.0 meta but acceptV0Meta is false");let o;return this.needThumbnailImage&&r.texture!=null&&r.texture!==-1&&(o=yield this.parser.getDependency("texture",r.texture)),{metaVersion:"0",allowedUserName:r.allowedUserName,author:r.author,commercialUssageName:r.commercialUssageName,contactInformation:r.contactInformation,licenseName:r.licenseName,otherLicenseUrl:r.otherLicenseUrl,otherPermissionUrl:r.otherPermissionUrl,reference:r.reference,sexualUssageName:r.sexualUssageName,texture:o!=null?o:void 0,title:r.title,version:r.version,violentUssageName:r.violentUssageName}})}_extractGLTFImage(e){return w(this,null,function*(){var t;let i=(t=this.parser.json.images)==null?void 0:t[e];if(i==null)return console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${e}] of glTF as a thumbnail but the image doesn't exist`),null;let r=i.uri;if(i.bufferView!=null){let s=yield this.parser.getDependency("bufferView",i.bufferView),l=new Blob([s],{type:i.mimeType});r=URL.createObjectURL(l)}return r==null?(console.warn(`VRMMetaLoaderPlugin: Attempt to use images[${e}] of glTF as a thumbnail but the image couldn't load properly`),null):yield new fi.ImageLoader().loadAsync(ho(r,this.parser.options.path)).catch(s=>(console.error(s),console.warn("VRMMetaLoaderPlugin: Failed to load a thumbnail image"),null))})}},Lt=class{constructor(e){this.scene=e.scene,this.meta=e.meta,this.humanoid=e.humanoid,this.expressionManager=e.expressionManager,this.firstPerson=e.firstPerson,this.lookAt=e.lookAt}update(e){this.humanoid.update(),this.lookAt&&this.lookAt.update(e),this.expressionManager&&this.expressionManager.update()}},Js=class{get name(){return"VRMC_vrm"}constructor(e,t){var n,i,r,o,s;this.parser=e;let l=t==null?void 0:t.helperRoot,a=t==null?void 0:t.autoUpdateHumanBones;this.expressionPlugin=(n=t==null?void 0:t.expressionPlugin)!=null?n:new yt(e),this.firstPersonPlugin=(i=t==null?void 0:t.firstPersonPlugin)!=null?i:new St(e),this.humanoidPlugin=(r=t==null?void 0:t.humanoidPlugin)!=null?r:new At(e,{helperRoot:l,autoUpdateHumanBones:a}),this.lookAtPlugin=(o=t==null?void 0:t.lookAtPlugin)!=null?o:new bt(e,{helperRoot:l}),this.metaPlugin=(s=t==null?void 0:t.metaPlugin)!=null?s:new Ht(e)}afterRoot(e){return w(this,null,function*(){yield this.metaPlugin.afterRoot(e),yield this.humanoidPlugin.afterRoot(e),yield this.expressionPlugin.afterRoot(e),yield this.lookAtPlugin.afterRoot(e),yield this.firstPersonPlugin.afterRoot(e);let t=e.userData.vrmMeta,n=e.userData.vrmHumanoid;if(t&&n){let i=new Lt({scene:e.scene,expressionManager:e.userData.vrmExpressionManager,firstPerson:e.userData.vrmFirstPerson,humanoid:n,lookAt:e.userData.vrmLookAt,meta:t});e.userData.vrmCore=i}})}};var Oe=class extends Lt{constructor(t){super(t),this.materials=t.materials,this.springBoneManager=t.springBoneManager,this.nodeConstraintManager=t.nodeConstraintManager}update(t){super.update(t),this.nodeConstraintManager&&this.nodeConstraintManager.update(),this.springBoneManager&&this.springBoneManager.update(t),this.materials&&this.materials.forEach(n=>{n.update&&n.update(t)})}};import*as tt from"three";import*as Mi from"three";import*as Ri from"three";import*as S from"three";import*as Ti from"three";var po=Object.defineProperty,_i=Object.getOwnPropertySymbols,mo=Object.prototype.hasOwnProperty,fo=Object.prototype.propertyIsEnumerable,gi=(e,t,n)=>t in e?po(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ei=(e,t)=>{for(var n in t||(t={}))mo.call(t,n)&&gi(e,n,t[n]);if(_i)for(var n of _i(t))fo.call(t,n)&&gi(e,n,t[n]);return e},pe=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())}),_o={"":3e3,srgb:3001};function go(e,t){parseInt(Ri.REVISION,10)>=152?e.colorSpace=t:e.encoding=_o[t]}var Eo=class{get pending(){return Promise.all(this._pendings)}constructor(e,t){this._parser=e,this._materialParams=t,this._pendings=[]}assignPrimitive(e,t){t!=null&&(this._materialParams[e]=t)}assignColor(e,t,n){if(t!=null){let i=new Mi.Color().fromArray(t);n&&i.convertSRGBToLinear(),this._materialParams[e]=i}}assignTexture(e,t,n){return pe(this,null,function*(){let i=pe(this,null,function*(){if(t!=null){let r=yield this._parser.assignTexture(this._materialParams,e,t);if(r==null){console.warn("GLTFMToonMaterialParamsAssignHelper: Failed to load texture. The rendering result may be wrong");return}n&&go(r,"srgb")}});return this._pendings.push(i),i})}assignTextureByIndex(e,t,n){return pe(this,null,function*(){return this.assignTexture(e,t!=null?{index:t}:void 0,n)})}},vo=`// #define PHONG

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

}`,Mo=`// #define PHONG

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
`,Ro={None:"none",Normal:"normal",LitShadeRate:"litShadeRate",UV:"uv"},vi={None:"none",WorldCoordinates:"worldCoordinates",ScreenCoordinates:"screenCoordinates"},To={3e3:"",3001:"srgb"};function It(e){return parseInt(Ti.REVISION,10)>=152?e.colorSpace:To[e.encoding]}var xo=class extends S.ShaderMaterial{constructor(e={}){var t;super({vertexShader:vo,fragmentShader:Mo}),this.uvAnimationScrollXSpeedFactor=0,this.uvAnimationScrollYSpeedFactor=0,this.uvAnimationRotationSpeedFactor=0,this.fog=!0,this.normalMapType=S.TangentSpaceNormalMap,this._ignoreVertexColor=!0,this._v0CompatShade=!1,this._debugMode=Ro.None,this._outlineWidthMode=vi.None,this._isOutline=!1,e.transparentWithZWrite&&(e.depthWrite=!0),delete e.transparentWithZWrite,e.fog=!0,e.lights=!0,e.clipping=!0,this.uniforms=S.UniformsUtils.merge([S.UniformsLib.common,S.UniformsLib.normalmap,S.UniformsLib.emissivemap,S.UniformsLib.fog,S.UniformsLib.lights,{litFactor:{value:new S.Color(1,1,1)},mapUvTransform:{value:new S.Matrix3},colorAlpha:{value:1},normalMapUvTransform:{value:new S.Matrix3},shadeColorFactor:{value:new S.Color(0,0,0)},shadeMultiplyTexture:{value:null},shadeMultiplyTextureUvTransform:{value:new S.Matrix3},shadingShiftFactor:{value:0},shadingShiftTexture:{value:null},shadingShiftTextureUvTransform:{value:new S.Matrix3},shadingShiftTextureScale:{value:1},shadingToonyFactor:{value:.9},giEqualizationFactor:{value:.9},matcapFactor:{value:new S.Color(1,1,1)},matcapTexture:{value:null},matcapTextureUvTransform:{value:new S.Matrix3},parametricRimColorFactor:{value:new S.Color(0,0,0)},rimMultiplyTexture:{value:null},rimMultiplyTextureUvTransform:{value:new S.Matrix3},rimLightingMixFactor:{value:1},parametricRimFresnelPowerFactor:{value:5},parametricRimLiftFactor:{value:0},emissive:{value:new S.Color(0,0,0)},emissiveIntensity:{value:1},emissiveMapUvTransform:{value:new S.Matrix3},outlineWidthMultiplyTexture:{value:null},outlineWidthMultiplyTextureUvTransform:{value:new S.Matrix3},outlineWidthFactor:{value:0},outlineColorFactor:{value:new S.Color(0,0,0)},outlineLightingMixFactor:{value:1},uvAnimationMaskTexture:{value:null},uvAnimationMaskTextureUvTransform:{value:new S.Matrix3},uvAnimationScrollXOffset:{value:0},uvAnimationScrollYOffset:{value:0},uvAnimationRotationPhase:{value:0}},(t=e.uniforms)!=null?t:{}]),this.setValues(e),this._uploadUniformsWorkaround(),this.customProgramCacheKey=()=>[...Object.entries(this._generateDefines()).map(([n,i])=>`${n}:${i}`),this.matcapTexture?`matcapTextureColorSpace:${It(this.matcapTexture)}`:"",this.shadeMultiplyTexture?`shadeMultiplyTextureColorSpace:${It(this.shadeMultiplyTexture)}`:"",this.rimMultiplyTexture?`rimMultiplyTextureColorSpace:${It(this.rimMultiplyTexture)}`:""].join(","),this.onBeforeCompile=n=>{let i=parseInt(S.REVISION,10),r=Object.entries(Ei(Ei({},this._generateDefines()),this.defines)).filter(([o,s])=>!!s).map(([o,s])=>`#define ${o} ${s}`).join(`
`)+`
`;n.vertexShader=r+n.vertexShader,n.fragmentShader=r+n.fragmentShader,i<154&&(n.fragmentShader=n.fragmentShader.replace("#include <colorspace_fragment>","#include <encodings_fragment>"))}}get color(){return this.uniforms.litFactor.value}set color(e){this.uniforms.litFactor.value=e}get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get normalMap(){return this.uniforms.normalMap.value}set normalMap(e){this.uniforms.normalMap.value=e}get normalScale(){return this.uniforms.normalScale.value}set normalScale(e){this.uniforms.normalScale.value=e}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=e}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get emissiveMap(){return this.uniforms.emissiveMap.value}set emissiveMap(e){this.uniforms.emissiveMap.value=e}get shadeColorFactor(){return this.uniforms.shadeColorFactor.value}set shadeColorFactor(e){this.uniforms.shadeColorFactor.value=e}get shadeMultiplyTexture(){return this.uniforms.shadeMultiplyTexture.value}set shadeMultiplyTexture(e){this.uniforms.shadeMultiplyTexture.value=e}get shadingShiftFactor(){return this.uniforms.shadingShiftFactor.value}set shadingShiftFactor(e){this.uniforms.shadingShiftFactor.value=e}get shadingShiftTexture(){return this.uniforms.shadingShiftTexture.value}set shadingShiftTexture(e){this.uniforms.shadingShiftTexture.value=e}get shadingShiftTextureScale(){return this.uniforms.shadingShiftTextureScale.value}set shadingShiftTextureScale(e){this.uniforms.shadingShiftTextureScale.value=e}get shadingToonyFactor(){return this.uniforms.shadingToonyFactor.value}set shadingToonyFactor(e){this.uniforms.shadingToonyFactor.value=e}get giEqualizationFactor(){return this.uniforms.giEqualizationFactor.value}set giEqualizationFactor(e){this.uniforms.giEqualizationFactor.value=e}get matcapFactor(){return this.uniforms.matcapFactor.value}set matcapFactor(e){this.uniforms.matcapFactor.value=e}get matcapTexture(){return this.uniforms.matcapTexture.value}set matcapTexture(e){this.uniforms.matcapTexture.value=e}get parametricRimColorFactor(){return this.uniforms.parametricRimColorFactor.value}set parametricRimColorFactor(e){this.uniforms.parametricRimColorFactor.value=e}get rimMultiplyTexture(){return this.uniforms.rimMultiplyTexture.value}set rimMultiplyTexture(e){this.uniforms.rimMultiplyTexture.value=e}get rimLightingMixFactor(){return this.uniforms.rimLightingMixFactor.value}set rimLightingMixFactor(e){this.uniforms.rimLightingMixFactor.value=e}get parametricRimFresnelPowerFactor(){return this.uniforms.parametricRimFresnelPowerFactor.value}set parametricRimFresnelPowerFactor(e){this.uniforms.parametricRimFresnelPowerFactor.value=e}get parametricRimLiftFactor(){return this.uniforms.parametricRimLiftFactor.value}set parametricRimLiftFactor(e){this.uniforms.parametricRimLiftFactor.value=e}get outlineWidthMultiplyTexture(){return this.uniforms.outlineWidthMultiplyTexture.value}set outlineWidthMultiplyTexture(e){this.uniforms.outlineWidthMultiplyTexture.value=e}get outlineWidthFactor(){return this.uniforms.outlineWidthFactor.value}set outlineWidthFactor(e){this.uniforms.outlineWidthFactor.value=e}get outlineColorFactor(){return this.uniforms.outlineColorFactor.value}set outlineColorFactor(e){this.uniforms.outlineColorFactor.value=e}get outlineLightingMixFactor(){return this.uniforms.outlineLightingMixFactor.value}set outlineLightingMixFactor(e){this.uniforms.outlineLightingMixFactor.value=e}get uvAnimationMaskTexture(){return this.uniforms.uvAnimationMaskTexture.value}set uvAnimationMaskTexture(e){this.uniforms.uvAnimationMaskTexture.value=e}get uvAnimationScrollXOffset(){return this.uniforms.uvAnimationScrollXOffset.value}set uvAnimationScrollXOffset(e){this.uniforms.uvAnimationScrollXOffset.value=e}get uvAnimationScrollYOffset(){return this.uniforms.uvAnimationScrollYOffset.value}set uvAnimationScrollYOffset(e){this.uniforms.uvAnimationScrollYOffset.value=e}get uvAnimationRotationPhase(){return this.uniforms.uvAnimationRotationPhase.value}set uvAnimationRotationPhase(e){this.uniforms.uvAnimationRotationPhase.value=e}get ignoreVertexColor(){return this._ignoreVertexColor}set ignoreVertexColor(e){this._ignoreVertexColor=e,this.needsUpdate=!0}get v0CompatShade(){return this._v0CompatShade}set v0CompatShade(e){this._v0CompatShade=e,this.needsUpdate=!0}get debugMode(){return this._debugMode}set debugMode(e){this._debugMode=e,this.needsUpdate=!0}get outlineWidthMode(){return this._outlineWidthMode}set outlineWidthMode(e){this._outlineWidthMode=e,this.needsUpdate=!0}get isOutline(){return this._isOutline}set isOutline(e){this._isOutline=e,this.needsUpdate=!0}get isMToonMaterial(){return!0}update(e){this._uploadUniformsWorkaround(),this._updateUVAnimation(e)}copy(e){return super.copy(e),this.map=e.map,this.normalMap=e.normalMap,this.emissiveMap=e.emissiveMap,this.shadeMultiplyTexture=e.shadeMultiplyTexture,this.shadingShiftTexture=e.shadingShiftTexture,this.matcapTexture=e.matcapTexture,this.rimMultiplyTexture=e.rimMultiplyTexture,this.outlineWidthMultiplyTexture=e.outlineWidthMultiplyTexture,this.uvAnimationMaskTexture=e.uvAnimationMaskTexture,this.normalMapType=e.normalMapType,this.uvAnimationScrollXSpeedFactor=e.uvAnimationScrollXSpeedFactor,this.uvAnimationScrollYSpeedFactor=e.uvAnimationScrollYSpeedFactor,this.uvAnimationRotationSpeedFactor=e.uvAnimationRotationSpeedFactor,this.ignoreVertexColor=e.ignoreVertexColor,this.v0CompatShade=e.v0CompatShade,this.debugMode=e.debugMode,this.outlineWidthMode=e.outlineWidthMode,this.isOutline=e.isOutline,this.needsUpdate=!0,this}_updateUVAnimation(e){this.uniforms.uvAnimationScrollXOffset.value+=e*this.uvAnimationScrollXSpeedFactor,this.uniforms.uvAnimationScrollYOffset.value+=e*this.uvAnimationScrollYSpeedFactor,this.uniforms.uvAnimationRotationPhase.value+=e*this.uvAnimationRotationSpeedFactor,this.uniforms.alphaTest.value=this.alphaTest,this.uniformsNeedUpdate=!0}_uploadUniformsWorkaround(){this.uniforms.opacity.value=this.opacity,this._updateTextureMatrix(this.uniforms.map,this.uniforms.mapUvTransform),this._updateTextureMatrix(this.uniforms.normalMap,this.uniforms.normalMapUvTransform),this._updateTextureMatrix(this.uniforms.emissiveMap,this.uniforms.emissiveMapUvTransform),this._updateTextureMatrix(this.uniforms.shadeMultiplyTexture,this.uniforms.shadeMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.shadingShiftTexture,this.uniforms.shadingShiftTextureUvTransform),this._updateTextureMatrix(this.uniforms.matcapTexture,this.uniforms.matcapTextureUvTransform),this._updateTextureMatrix(this.uniforms.rimMultiplyTexture,this.uniforms.rimMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.outlineWidthMultiplyTexture,this.uniforms.outlineWidthMultiplyTextureUvTransform),this._updateTextureMatrix(this.uniforms.uvAnimationMaskTexture,this.uniforms.uvAnimationMaskTextureUvTransform),this.uniformsNeedUpdate=!0}_generateDefines(){let e=parseInt(S.REVISION,10),t=this.outlineWidthMultiplyTexture!==null,n=this.map!==null||this.normalMap!==null||this.emissiveMap!==null||this.shadeMultiplyTexture!==null||this.shadingShiftTexture!==null||this.rimMultiplyTexture!==null||this.uvAnimationMaskTexture!==null;return{THREE_VRM_THREE_REVISION:e,OUTLINE:this._isOutline,MTOON_USE_UV:t||n,MTOON_UVS_VERTEX_ONLY:t&&!n,V0_COMPAT_SHADE:this._v0CompatShade,USE_SHADEMULTIPLYTEXTURE:this.shadeMultiplyTexture!==null,USE_SHADINGSHIFTTEXTURE:this.shadingShiftTexture!==null,USE_MATCAPTEXTURE:this.matcapTexture!==null,USE_RIMMULTIPLYTEXTURE:this.rimMultiplyTexture!==null,USE_OUTLINEWIDTHMULTIPLYTEXTURE:this._isOutline&&this.outlineWidthMultiplyTexture!==null,USE_UVANIMATIONMASKTEXTURE:this.uvAnimationMaskTexture!==null,IGNORE_VERTEX_COLOR:this._ignoreVertexColor===!0,DEBUG_NORMAL:this._debugMode==="normal",DEBUG_LITSHADERATE:this._debugMode==="litShadeRate",DEBUG_UV:this._debugMode==="uv",OUTLINE_WIDTH_SCREEN:this._isOutline&&this._outlineWidthMode===vi.ScreenCoordinates}}_updateTextureMatrix(e,t){e.value&&(e.value.matrixAutoUpdate&&e.value.updateMatrix(),t.value.copy(e.value.matrix))}},yo=new Set(["1.0","1.0-beta"]),xi=class et{get name(){return et.EXTENSION_NAME}constructor(t,n={}){var i,r,o,s;this.parser=t,this.materialType=(i=n.materialType)!=null?i:xo,this.renderOrderOffset=(r=n.renderOrderOffset)!=null?r:0,this.v0CompatShade=(o=n.v0CompatShade)!=null?o:!1,this.debugMode=(s=n.debugMode)!=null?s:"none",this._mToonMaterialSet=new Set}beforeRoot(){return pe(this,null,function*(){this._removeUnlitExtensionIfMToonExists()})}afterRoot(t){return pe(this,null,function*(){t.userData.vrmMToonMaterials=Array.from(this._mToonMaterialSet)})}getMaterialType(t){return this._getMToonExtension(t)?this.materialType:null}extendMaterialParams(t,n){let i=this._getMToonExtension(t);return i?this._extendMaterialParams(i,n):null}loadMesh(t){return pe(this,null,function*(){var n;let i=this.parser,o=(n=i.json.meshes)==null?void 0:n[t];if(o==null)throw new Error(`MToonMaterialLoaderPlugin: Attempt to use meshes[${t}] of glTF but the mesh doesn't exist`);let s=o.primitives,l=yield i.loadMesh(t);if(s.length===1){let a=l,u=s[0].material;u!=null&&this._setupPrimitive(a,u)}else{let a=l;for(let u=0;u<s.length;u++){let d=a.children[u],h=s[u].material;h!=null&&this._setupPrimitive(d,h)}}return l})}_removeUnlitExtensionIfMToonExists(){let i=this.parser.json.materials;i==null||i.map((r,o)=>{var s;this._getMToonExtension(o)&&((s=r.extensions)!=null&&s.KHR_materials_unlit)&&delete r.extensions.KHR_materials_unlit})}_getMToonExtension(t){var n,i;let s=(n=this.parser.json.materials)==null?void 0:n[t];if(s==null){console.warn(`MToonMaterialLoaderPlugin: Attempt to use materials[${t}] of glTF but the material doesn't exist`);return}let l=(i=s.extensions)==null?void 0:i[et.EXTENSION_NAME];if(l==null)return;let a=l.specVersion;if(!yo.has(a)){console.warn(`MToonMaterialLoaderPlugin: Unknown ${et.EXTENSION_NAME} specVersion "${a}"`);return}return l}_extendMaterialParams(t,n){return pe(this,null,function*(){var i;delete n.metalness,delete n.roughness;let r=new Eo(this.parser,n);r.assignPrimitive("transparentWithZWrite",t.transparentWithZWrite),r.assignColor("shadeColorFactor",t.shadeColorFactor),r.assignTexture("shadeMultiplyTexture",t.shadeMultiplyTexture,!0),r.assignPrimitive("shadingShiftFactor",t.shadingShiftFactor),r.assignTexture("shadingShiftTexture",t.shadingShiftTexture,!0),r.assignPrimitive("shadingShiftTextureScale",(i=t.shadingShiftTexture)==null?void 0:i.scale),r.assignPrimitive("shadingToonyFactor",t.shadingToonyFactor),r.assignPrimitive("giEqualizationFactor",t.giEqualizationFactor),r.assignColor("matcapFactor",t.matcapFactor),r.assignTexture("matcapTexture",t.matcapTexture,!0),r.assignColor("parametricRimColorFactor",t.parametricRimColorFactor),r.assignTexture("rimMultiplyTexture",t.rimMultiplyTexture,!0),r.assignPrimitive("rimLightingMixFactor",t.rimLightingMixFactor),r.assignPrimitive("parametricRimFresnelPowerFactor",t.parametricRimFresnelPowerFactor),r.assignPrimitive("parametricRimLiftFactor",t.parametricRimLiftFactor),r.assignPrimitive("outlineWidthMode",t.outlineWidthMode),r.assignPrimitive("outlineWidthFactor",t.outlineWidthFactor),r.assignTexture("outlineWidthMultiplyTexture",t.outlineWidthMultiplyTexture,!1),r.assignColor("outlineColorFactor",t.outlineColorFactor),r.assignPrimitive("outlineLightingMixFactor",t.outlineLightingMixFactor),r.assignTexture("uvAnimationMaskTexture",t.uvAnimationMaskTexture,!1),r.assignPrimitive("uvAnimationScrollXSpeedFactor",t.uvAnimationScrollXSpeedFactor),r.assignPrimitive("uvAnimationScrollYSpeedFactor",t.uvAnimationScrollYSpeedFactor),r.assignPrimitive("uvAnimationRotationSpeedFactor",t.uvAnimationRotationSpeedFactor),r.assignPrimitive("v0CompatShade",this.v0CompatShade),r.assignPrimitive("debugMode",this.debugMode),yield r.pending})}_setupPrimitive(t,n){let i=this._getMToonExtension(n);if(i){let r=this._parseRenderOrder(i);t.renderOrder=r+this.renderOrderOffset,this._generateOutline(t),this._addToMaterialSet(t);return}}_shouldGenerateOutline(t){return typeof t.outlineWidthMode=="string"&&t.outlineWidthMode!=="none"&&typeof t.outlineWidthFactor=="number"&&t.outlineWidthFactor>0}_generateOutline(t){let n=t.material;if(!(n instanceof tt.Material)||!this._shouldGenerateOutline(n))return;t.material=[n];let i=n.clone();i.name+=" (Outline)",i.isOutline=!0,i.side=tt.BackSide,t.material.push(i);let r=t.geometry,o=r.index?r.index.count:r.attributes.position.count/3;r.addGroup(0,o,0),r.addGroup(0,o,1)}_addToMaterialSet(t){let n=t.material,i=new Set;Array.isArray(n)?n.forEach(r=>i.add(r)):i.add(n);for(let r of i)this._mToonMaterialSet.add(r)}_parseRenderOrder(t){var n;return(t.transparentWithZWrite?0:19)+((n=t.renderQueueOffsetNumber)!=null?n:0)}};xi.EXTENSION_NAME="VRMC_materials_mtoon";var yi=xi;var wo=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())}),wi=class Vt{get name(){return Vt.EXTENSION_NAME}constructor(t){this.parser=t}extendMaterialParams(t,n){return wo(this,null,function*(){let i=this._getHDREmissiveMultiplierExtension(t);if(i==null)return;console.warn("VRMMaterialsHDREmissiveMultiplierLoaderPlugin: `VRMC_materials_hdr_emissiveMultiplier` is archived. Use `KHR_materials_emissive_strength` instead.");let r=i.emissiveMultiplier;n.emissiveIntensity=r})}_getHDREmissiveMultiplierExtension(t){var n,i;let s=(n=this.parser.json.materials)==null?void 0:n[t];if(s==null){console.warn(`VRMMaterialsHDREmissiveMultiplierLoaderPlugin: Attempt to use materials[${t}] of glTF but the material doesn't exist`);return}let l=(i=s.extensions)==null?void 0:i[Vt.EXTENSION_NAME];if(l!=null)return l}};wi.EXTENSION_NAME="VRMC_materials_hdr_emissiveMultiplier";var Si=wi;import*as Hi from"three";var So=Object.defineProperty,Ao=Object.defineProperties,Po=Object.getOwnPropertyDescriptors,Ai=Object.getOwnPropertySymbols,bo=Object.prototype.hasOwnProperty,Ho=Object.prototype.propertyIsEnumerable,Pi=(e,t,n)=>t in e?So(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Q=(e,t)=>{for(var n in t||(t={}))bo.call(t,n)&&Pi(e,n,t[n]);if(Ai)for(var n of Ai(t))Ho.call(t,n)&&Pi(e,n,t[n]);return e},bi=(e,t)=>Ao(e,Po(t)),Lo=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())});function Re(e){return Math.pow(e,2.2)}var Li=class{get name(){return"VRMMaterialsV0CompatPlugin"}constructor(e){var t;this.parser=e,this._renderQueueMapTransparent=new Map,this._renderQueueMapTransparentZWrite=new Map;let n=this.parser.json;n.extensionsUsed=(t=n.extensionsUsed)!=null?t:[],n.extensionsUsed.indexOf("KHR_texture_transform")===-1&&n.extensionsUsed.push("KHR_texture_transform")}beforeRoot(){return Lo(this,null,function*(){var e;let t=this.parser.json,n=(e=t.extensions)==null?void 0:e.VRM,i=n==null?void 0:n.materialProperties;i&&(this._populateRenderQueueMap(i),i.forEach((r,o)=>{var s,l;let a=(s=t.materials)==null?void 0:s[o];if(a==null){console.warn(`VRMMaterialsV0CompatPlugin: Attempt to use materials[${o}] of glTF but the material doesn't exist`);return}if(r.shader==="VRM/MToon"){let u=this._parseV0MToonProperties(r,a);t.materials[o]=u}else if((l=r.shader)!=null&&l.startsWith("VRM/Unlit")){let u=this._parseV0UnlitProperties(r,a);t.materials[o]=u}else r.shader==="VRM_USE_GLTFSHADER"||console.warn(`VRMMaterialsV0CompatPlugin: Unknown shader: ${r.shader}`)}))})}_parseV0MToonProperties(e,t){var n,i,r,o,s,l,a,u,d,h,c,p,m,f,_,g,R,x,T,v,M,y,A,I,P,H,C,k,Pe,be,Z,Y,Ee,He,B,Kt,en,tn,nn,rn,on,sn,an,ln,un,dn,hn,cn,pn,mn,fn,_n,gn,En,vn;let Mn=(i=(n=e.keywordMap)==null?void 0:n._ALPHABLEND_ON)!=null?i:!1,dr=((r=e.floatProperties)==null?void 0:r._ZWrite)===1&&Mn,hr=this._v0ParseRenderQueue(e),Rn=(s=(o=e.keywordMap)==null?void 0:o._ALPHATEST_ON)!=null?s:!1,cr=Mn?"BLEND":Rn?"MASK":"OPAQUE",pr=Rn?(a=(l=e.floatProperties)==null?void 0:l._Cutoff)!=null?a:.5:void 0,mr=((d=(u=e.floatProperties)==null?void 0:u._CullMode)!=null?d:2)===0,de=this._portTextureTransform(e),fr=((c=(h=e.vectorProperties)==null?void 0:h._Color)!=null?c:[1,1,1,1]).map((Hn,Dr)=>Dr===3?Hn:Re(Hn)),Tn=(p=e.textureProperties)==null?void 0:p._MainTex,_r=Tn!=null?{index:Tn,extensions:Q({},de)}:void 0,gr=(f=(m=e.floatProperties)==null?void 0:m._BumpScale)!=null?f:1,xn=(_=e.textureProperties)==null?void 0:_._BumpMap,Er=xn!=null?{index:xn,scale:gr,extensions:Q({},de)}:void 0,vr=((R=(g=e.vectorProperties)==null?void 0:g._EmissionColor)!=null?R:[0,0,0,1]).map(Re),yn=(x=e.textureProperties)==null?void 0:x._EmissionMap,Mr=yn!=null?{index:yn,extensions:Q({},de)}:void 0,Rr=((v=(T=e.vectorProperties)==null?void 0:T._ShadeColor)!=null?v:[.97,.81,.86,1]).map(Re),wn=(M=e.textureProperties)==null?void 0:M._ShadeTexture,Tr=wn!=null?{index:wn,extensions:Q({},de)}:void 0,Xe=(A=(y=e.floatProperties)==null?void 0:y._ShadeShift)!=null?A:0,Qe=(P=(I=e.floatProperties)==null?void 0:I._ShadeToony)!=null?P:.9;Qe=Hi.MathUtils.lerp(Qe,1,.5+.5*Xe),Xe=-Xe-(1-Qe);let Sn=(C=(H=e.floatProperties)==null?void 0:H._IndirectLightIntensity)!=null?C:.1,xr=Sn?1-Sn:void 0,ct=(k=e.textureProperties)==null?void 0:k._SphereAdd,yr=ct!=null?[1,1,1]:void 0,wr=ct!=null?{index:ct}:void 0,Sr=(be=(Pe=e.floatProperties)==null?void 0:Pe._RimLightingMix)!=null?be:0,An=(Z=e.textureProperties)==null?void 0:Z._RimTexture,Ar=An!=null?{index:An,extensions:Q({},de)}:void 0,Pr=((Ee=(Y=e.vectorProperties)==null?void 0:Y._RimColor)!=null?Ee:[0,0,0,1]).map(Re),br=(B=(He=e.floatProperties)==null?void 0:He._RimFresnelPower)!=null?B:1,Hr=(en=(Kt=e.floatProperties)==null?void 0:Kt._RimLift)!=null?en:0,Lr=["none","worldCoordinates","screenCoordinates"][(nn=(tn=e.floatProperties)==null?void 0:tn._OutlineWidthMode)!=null?nn:0],pt=(on=(rn=e.floatProperties)==null?void 0:rn._OutlineWidth)!=null?on:0;pt=.01*pt;let Pn=(sn=e.textureProperties)==null?void 0:sn._OutlineWidthTexture,Ir=Pn!=null?{index:Pn,extensions:Q({},de)}:void 0,Vr=((ln=(an=e.vectorProperties)==null?void 0:an._OutlineColor)!=null?ln:[0,0,0]).map(Re),Cr=((dn=(un=e.floatProperties)==null?void 0:un._OutlineColorMode)!=null?dn:0)===1?(cn=(hn=e.floatProperties)==null?void 0:hn._OutlineLightingMix)!=null?cn:1:0,bn=(pn=e.textureProperties)==null?void 0:pn._UvAnimMaskTexture,Ur=bn!=null?{index:bn,extensions:Q({},de)}:void 0,Or=(fn=(mn=e.floatProperties)==null?void 0:mn._UvAnimScrollX)!=null?fn:0,je=(gn=(_n=e.floatProperties)==null?void 0:_n._UvAnimScrollY)!=null?gn:0;je!=null&&(je=-je);let Br=(vn=(En=e.floatProperties)==null?void 0:En._UvAnimRotation)!=null?vn:0,Nr={specVersion:"1.0",transparentWithZWrite:dr,renderQueueOffsetNumber:hr,shadeColorFactor:Rr,shadeMultiplyTexture:Tr,shadingShiftFactor:Xe,shadingToonyFactor:Qe,giEqualizationFactor:xr,matcapFactor:yr,matcapTexture:wr,rimLightingMixFactor:Sr,rimMultiplyTexture:Ar,parametricRimColorFactor:Pr,parametricRimFresnelPowerFactor:br,parametricRimLiftFactor:Hr,outlineWidthMode:Lr,outlineWidthFactor:pt,outlineWidthMultiplyTexture:Ir,outlineColorFactor:Vr,outlineLightingMixFactor:Cr,uvAnimationMaskTexture:Ur,uvAnimationScrollXSpeedFactor:Or,uvAnimationScrollYSpeedFactor:je,uvAnimationRotationSpeedFactor:Br};return bi(Q({},t),{pbrMetallicRoughness:{baseColorFactor:fr,baseColorTexture:_r},normalTexture:Er,emissiveTexture:Mr,emissiveFactor:vr,alphaMode:cr,alphaCutoff:pr,doubleSided:mr,extensions:{VRMC_materials_mtoon:Nr}})}_parseV0UnlitProperties(e,t){var n,i,r,o,s;let l=e.shader==="VRM/UnlitTransparentZWrite",a=e.shader==="VRM/UnlitTransparent"||l,u=this._v0ParseRenderQueue(e),d=e.shader==="VRM/UnlitCutout",h=a?"BLEND":d?"MASK":"OPAQUE",c=d?(i=(n=e.floatProperties)==null?void 0:n._Cutoff)!=null?i:.5:void 0,p=this._portTextureTransform(e),m=((o=(r=e.vectorProperties)==null?void 0:r._Color)!=null?o:[1,1,1,1]).map(Re),f=(s=e.textureProperties)==null?void 0:s._MainTex,_=f!=null?{index:f,extensions:Q({},p)}:void 0,g={specVersion:"1.0",transparentWithZWrite:l,renderQueueOffsetNumber:u,shadeColorFactor:m,shadeMultiplyTexture:_};return bi(Q({},t),{pbrMetallicRoughness:{baseColorFactor:m,baseColorTexture:_},alphaMode:h,alphaCutoff:c,extensions:{VRMC_materials_mtoon:g}})}_portTextureTransform(e){var t,n,i,r,o;let s=(t=e.vectorProperties)==null?void 0:t._MainTex;if(s==null)return{};let l=[(n=s==null?void 0:s[0])!=null?n:0,(i=s==null?void 0:s[1])!=null?i:0],a=[(r=s==null?void 0:s[2])!=null?r:1,(o=s==null?void 0:s[3])!=null?o:1];return l[1]=1-a[1]-l[1],{KHR_texture_transform:{offset:l,scale:a}}}_v0ParseRenderQueue(e){var t,n;let i=e.shader==="VRM/UnlitTransparentZWrite",r=((t=e.keywordMap)==null?void 0:t._ALPHABLEND_ON)!=null||e.shader==="VRM/UnlitTransparent"||i,o=((n=e.floatProperties)==null?void 0:n._ZWrite)===1||i,s=0;if(r){let l=e.renderQueue;l!=null&&(o?s=this._renderQueueMapTransparentZWrite.get(l):s=this._renderQueueMapTransparent.get(l))}return s}_populateRenderQueueMap(e){let t=new Set,n=new Set;e.forEach(i=>{var r,o;let s=i.shader==="VRM/UnlitTransparentZWrite",l=((r=i.keywordMap)==null?void 0:r._ALPHABLEND_ON)!=null||i.shader==="VRM/UnlitTransparent"||s,a=((o=i.floatProperties)==null?void 0:o._ZWrite)===1||s;if(l){let u=i.renderQueue;u!=null&&(a?n.add(u):t.add(u))}}),t.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${t.size} render queues for Transparent materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),n.size>10&&console.warn(`VRMMaterialsV0CompatPlugin: This VRM uses ${n.size} render queues for TransparentZWrite materials while VRM 1.0 only supports up to 10 render queues. The model might not be rendered correctly.`),Array.from(t).sort().forEach((i,r)=>{let o=Math.min(Math.max(r-t.size+1,-9),0);this._renderQueueMapTransparent.set(i,o)}),Array.from(n).sort().forEach((i,r)=>{let o=Math.min(Math.max(r,0),9);this._renderQueueMapTransparentZWrite.set(i,o)})}};import*as D from"three";import*as j from"three";import*as Ut from"three";import*as Ne from"three";import*as J from"three";var Ii=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())}),re=new D.Vector3,Ct=class extends D.Group{constructor(e){super(),this._attrPosition=new D.BufferAttribute(new Float32Array([0,0,0,0,0,0]),3),this._attrPosition.setUsage(D.DynamicDrawUsage);let t=new D.BufferGeometry;t.setAttribute("position",this._attrPosition);let n=new D.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new D.Line(t,n),this.add(this._line),this.constraint=e}updateMatrixWorld(e){re.setFromMatrixPosition(this.constraint.destination.matrixWorld),this._attrPosition.setXYZ(0,re.x,re.y,re.z),this.constraint.source&&re.setFromMatrixPosition(this.constraint.source.matrixWorld),this._attrPosition.setXYZ(1,re.x,re.y,re.z),this._attrPosition.needsUpdate=!0,super.updateMatrixWorld(e)}};function Vi(e,t){return t.set(e.elements[12],e.elements[13],e.elements[14])}var Io=new Ut.Vector3,Vo=new Ut.Vector3;function Co(e,t){return e.decompose(Io,t,Vo),t}function nt(e){return e.invert?e.invert():e.inverse(),e}var Ot=class{constructor(e,t){this.destination=e,this.source=t,this.weight=1}},Uo=new j.Vector3,Oo=new j.Vector3,Bo=new j.Vector3,No=new j.Quaternion,Do=new j.Quaternion,Fo=new j.Quaternion,ko=class extends Ot{get aimAxis(){return this._aimAxis}set aimAxis(e){this._aimAxis=e,this._v3AimAxis.set(e==="PositiveX"?1:e==="NegativeX"?-1:0,e==="PositiveY"?1:e==="NegativeY"?-1:0,e==="PositiveZ"?1:e==="NegativeZ"?-1:0)}get dependencies(){let e=new Set([this.source]);return this.destination.parent&&e.add(this.destination.parent),e}constructor(e,t){super(e,t),this._aimAxis="PositiveX",this._v3AimAxis=new j.Vector3(1,0,0),this._dstRestQuat=new j.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion)}update(){this.destination.updateWorldMatrix(!0,!1),this.source.updateWorldMatrix(!0,!1);let e=No.identity(),t=Do.identity();this.destination.parent&&(Co(this.destination.parent.matrixWorld,e),nt(t.copy(e)));let n=Uo.copy(this._v3AimAxis).applyQuaternion(this._dstRestQuat).applyQuaternion(e),i=Vi(this.source.matrixWorld,Oo).sub(Vi(this.destination.matrixWorld,Bo)).normalize(),r=Fo.setFromUnitVectors(n,i).premultiply(t).multiply(e).multiply(this._dstRestQuat);this.destination.quaternion.copy(this._dstRestQuat).slerp(r,this.weight)}};function Wo(e,t){let n=[e],i=e.parent;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{t(r)})}var Go=class{constructor(){this._constraints=new Set,this._objectConstraintsMap=new Map}get constraints(){return this._constraints}addConstraint(e){this._constraints.add(e);let t=this._objectConstraintsMap.get(e.destination);t==null&&(t=new Set,this._objectConstraintsMap.set(e.destination,t)),t.add(e)}deleteConstraint(e){this._constraints.delete(e),this._objectConstraintsMap.get(e.destination).delete(e)}setInitState(){let e=new Set,t=new Set;for(let n of this._constraints)this._processConstraint(n,e,t,i=>i.setInitState())}update(){let e=new Set,t=new Set;for(let n of this._constraints)this._processConstraint(n,e,t,i=>i.update())}_processConstraint(e,t,n,i){if(n.has(e))return;if(t.has(e))throw new Error("VRMNodeConstraintManager: Circular dependency detected while updating constraints");t.add(e);let r=e.dependencies;for(let o of r)Wo(o,s=>{let l=this._objectConstraintsMap.get(s);if(l)for(let a of l)this._processConstraint(a,t,n,i)});i(e),n.add(e)}},zo=new Ne.Quaternion,Yo=new Ne.Quaternion,Xo=class extends Ot{get dependencies(){return new Set([this.source])}constructor(e,t){super(e,t),this._dstRestQuat=new Ne.Quaternion,this._invSrcRestQuat=new Ne.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),nt(this._invSrcRestQuat.copy(this.source.quaternion))}update(){let e=zo.copy(this._invSrcRestQuat).multiply(this.source.quaternion),t=Yo.copy(this._dstRestQuat).multiply(e);this.destination.quaternion.copy(this._dstRestQuat).slerp(t,this.weight)}},Qo=new J.Vector3,jo=new J.Quaternion,qo=new J.Quaternion,Zo=class extends Ot{get rollAxis(){return this._rollAxis}set rollAxis(e){this._rollAxis=e,this._v3RollAxis.set(e==="X"?1:0,e==="Y"?1:0,e==="Z"?1:0)}get dependencies(){return new Set([this.source])}constructor(e,t){super(e,t),this._rollAxis="X",this._v3RollAxis=new J.Vector3(1,0,0),this._dstRestQuat=new J.Quaternion,this._invDstRestQuat=new J.Quaternion,this._invSrcRestQuatMulDstRestQuat=new J.Quaternion}setInitState(){this._dstRestQuat.copy(this.destination.quaternion),nt(this._invDstRestQuat.copy(this._dstRestQuat)),nt(this._invSrcRestQuatMulDstRestQuat.copy(this.source.quaternion)).multiply(this._dstRestQuat)}update(){let e=jo.copy(this._invDstRestQuat).multiply(this.source.quaternion).multiply(this._invSrcRestQuatMulDstRestQuat),t=Qo.copy(this._v3RollAxis).applyQuaternion(e),i=qo.setFromUnitVectors(t,this._v3RollAxis).premultiply(this._dstRestQuat).multiply(e);this.destination.quaternion.copy(this._dstRestQuat).slerp(i,this.weight)}},$o=new Set(["1.0","1.0-beta"]),Ci=class Be{get name(){return Be.EXTENSION_NAME}constructor(t,n){this.parser=t,this.helperRoot=n==null?void 0:n.helperRoot}afterRoot(t){return Ii(this,null,function*(){t.userData.vrmNodeConstraintManager=yield this._import(t)})}_import(t){return Ii(this,null,function*(){var n;let i=this.parser.json;if(!(((n=i.extensionsUsed)==null?void 0:n.indexOf(Be.EXTENSION_NAME))!==-1))return null;let o=new Go,s=yield this.parser.getDependencies("node");return s.forEach((l,a)=>{var u;let d=i.nodes[a],h=(u=d==null?void 0:d.extensions)==null?void 0:u[Be.EXTENSION_NAME];if(h==null)return;let c=h.specVersion;if(!$o.has(c)){console.warn(`VRMNodeConstraintLoaderPlugin: Unknown ${Be.EXTENSION_NAME} specVersion "${c}"`);return}let p=h.constraint;if(p.roll!=null){let m=this._importRollConstraint(l,s,p.roll);o.addConstraint(m)}else if(p.aim!=null){let m=this._importAimConstraint(l,s,p.aim);o.addConstraint(m)}else if(p.rotation!=null){let m=this._importRotationConstraint(l,s,p.rotation);o.addConstraint(m)}}),t.scene.updateMatrixWorld(),o.setInitState(),o})}_importRollConstraint(t,n,i){let{source:r,rollAxis:o,weight:s}=i,l=n[r],a=new Zo(t,l);if(o!=null&&(a.rollAxis=o),s!=null&&(a.weight=s),this.helperRoot){let u=new Ct(a);this.helperRoot.add(u)}return a}_importAimConstraint(t,n,i){let{source:r,aimAxis:o,weight:s}=i,l=n[r],a=new ko(t,l);if(o!=null&&(a.aimAxis=o),s!=null&&(a.weight=s),this.helperRoot){let u=new Ct(a);this.helperRoot.add(u)}return a}_importRotationConstraint(t,n,i){let{source:r,weight:o}=i,s=n[r],l=new Xo(t,s);if(o!=null&&(l.weight=o),this.helperRoot){let a=new Ct(l);this.helperRoot.add(a)}return l}};Ci.EXTENSION_NAME="VRMC_node_constraint";var Ui=Ci;import*as se from"three";import*as ke from"three";import*as we from"three";import*as jt from"three";import*as ee from"three";import*as oe from"three";import*as _e from"three";import*as ae from"three";import*as ge from"three";import*as te from"three";import*as st from"three";import*as K from"three";import*as We from"three";import*as at from"three";import*as Ge from"three";import*as ye from"three";import*as ze from"three";import*as lt from"three";import*as U from"three";import*as qi from"three";import*as Zi from"three";import*as Zt from"three";import*as O from"three";var it=(e,t,n)=>new Promise((i,r)=>{var o=a=>{try{l(n.next(a))}catch(u){r(u)}},s=a=>{try{l(n.throw(a))}catch(u){r(u)}},l=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,s);l((n=n.apply(e,t)).next())}),Qt=class{},Bt=new ke.Vector3,me=new ke.Vector3,Gi=class extends Qt{get type(){return"capsule"}constructor(e){var t,n,i,r;super(),this.offset=(t=e==null?void 0:e.offset)!=null?t:new ke.Vector3(0,0,0),this.tail=(n=e==null?void 0:e.tail)!=null?n:new ke.Vector3(0,0,0),this.radius=(i=e==null?void 0:e.radius)!=null?i:0,this.inside=(r=e==null?void 0:e.inside)!=null?r:!1}calculateCollision(e,t,n,i){Bt.setFromMatrixPosition(e),me.subVectors(this.tail,this.offset).applyMatrix4(e),me.sub(Bt);let r=me.lengthSq();i.copy(t).sub(Bt);let o=me.dot(i);o<=0||(r<=o||me.multiplyScalar(o/r),i.sub(me));let s=i.length(),l=this.inside?this.radius-n-s:s-n-this.radius;return l<0&&(i.multiplyScalar(1/s),this.inside&&i.negate()),l}},Nt=new we.Vector3,Oi=new we.Matrix3,zi=class extends Qt{get type(){return"plane"}constructor(e){var t,n;super(),this.offset=(t=e==null?void 0:e.offset)!=null?t:new we.Vector3(0,0,0),this.normal=(n=e==null?void 0:e.normal)!=null?n:new we.Vector3(0,0,1)}calculateCollision(e,t,n,i){i.setFromMatrixPosition(e),i.negate().add(t),Oi.getNormalMatrix(e),Nt.copy(this.normal).applyNormalMatrix(Oi).normalize();let r=i.dot(Nt)-n;return i.copy(Nt),r}},Jo=new jt.Vector3,Yi=class extends Qt{get type(){return"sphere"}constructor(e){var t,n,i;super(),this.offset=(t=e==null?void 0:e.offset)!=null?t:new jt.Vector3(0,0,0),this.radius=(n=e==null?void 0:e.radius)!=null?n:0,this.inside=(i=e==null?void 0:e.inside)!=null?i:!1}calculateCollision(e,t,n,i){i.subVectors(t,Jo.setFromMatrixPosition(e));let r=i.length(),o=this.inside?this.radius-n-r:r-n-this.radius;return o<0&&(i.multiplyScalar(1/r),this.inside&&i.negate()),o}},q=new ee.Vector3,Ko=class extends ee.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new ee.Vector3,this._currentTail=new ee.Vector3,this._shape=e,this._attrPos=new ee.BufferAttribute(new Float32Array(396),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ee.BufferAttribute(new Uint16Array(264),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1,t=this._shape.radius/this.worldScale;this._currentRadius!==t&&(this._currentRadius=t,e=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),e=!0);let n=q.copy(this._shape.tail).divideScalar(this.worldScale);this._currentTail.distanceToSquared(n)>1e-10&&(this._currentTail.copy(n),e=!0),e&&this._buildPosition()}_buildPosition(){q.copy(this._currentTail).sub(this._currentOffset);let e=q.length()/this._currentRadius;for(let i=0;i<=16;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(i,-Math.sin(r),-Math.cos(r),0),this._attrPos.setXYZ(17+i,e+Math.sin(r),Math.cos(r),0),this._attrPos.setXYZ(34+i,-Math.sin(r),0,-Math.cos(r)),this._attrPos.setXYZ(51+i,e+Math.sin(r),0,Math.cos(r))}for(let i=0;i<32;i++){let r=i/16*Math.PI;this._attrPos.setXYZ(68+i,0,Math.sin(r),Math.cos(r)),this._attrPos.setXYZ(100+i,e,Math.sin(r),Math.cos(r))}let t=Math.atan2(q.y,Math.sqrt(q.x*q.x+q.z*q.z)),n=-Math.atan2(q.z,q.x);this.rotateZ(t),this.rotateY(n),this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<34;e++){let t=(e+1)%34;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(68+e*2,34+e,34+t)}for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(136+e*2,68+e,68+t),this._attrIndex.setXY(200+e*2,100+e,100+t)}this._attrIndex.needsUpdate=!0}},es=class extends oe.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentOffset=new oe.Vector3,this._currentNormal=new oe.Vector3,this._shape=e,this._attrPos=new oe.BufferAttribute(new Float32Array(18),3),this.setAttribute("position",this._attrPos),this._attrIndex=new oe.BufferAttribute(new Uint16Array(10),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1;this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),e=!0),this._currentNormal.equals(this._shape.normal)||(this._currentNormal.copy(this._shape.normal),e=!0),e&&this._buildPosition()}_buildPosition(){this._attrPos.setXYZ(0,-.5,-.5,0),this._attrPos.setXYZ(1,.5,-.5,0),this._attrPos.setXYZ(2,.5,.5,0),this._attrPos.setXYZ(3,-.5,.5,0),this._attrPos.setXYZ(4,0,0,0),this._attrPos.setXYZ(5,0,0,.25),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this.lookAt(this._currentNormal),this._attrPos.needsUpdate=!0}_buildIndex(){this._attrIndex.setXY(0,0,1),this._attrIndex.setXY(2,1,2),this._attrIndex.setXY(4,2,3),this._attrIndex.setXY(6,3,0),this._attrIndex.setXY(8,4,5),this._attrIndex.needsUpdate=!0}},ts=class extends _e.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentRadius=0,this._currentOffset=new _e.Vector3,this._shape=e,this._attrPos=new _e.BufferAttribute(new Float32Array(288),3),this.setAttribute("position",this._attrPos),this._attrIndex=new _e.BufferAttribute(new Uint16Array(192),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1,t=this._shape.radius/this.worldScale;this._currentRadius!==t&&(this._currentRadius=t,e=!0),this._currentOffset.equals(this._shape.offset)||(this._currentOffset.copy(this._shape.offset),e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<32;e++){let t=e/16*Math.PI;this._attrPos.setXYZ(e,Math.cos(t),Math.sin(t),0),this._attrPos.setXYZ(32+e,0,Math.cos(t),Math.sin(t)),this._attrPos.setXYZ(64+e,Math.sin(t),0,Math.cos(t))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentOffset.x,this._currentOffset.y,this._currentOffset.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(64+e*2,32+e,32+t),this._attrIndex.setXY(128+e*2,64+e,64+t)}this._attrIndex.needsUpdate=!0}},ns=new se.Vector3,Dt=class extends se.Group{constructor(e){if(super(),this.matrixAutoUpdate=!1,this.collider=e,this.collider.shape instanceof Yi)this._geometry=new ts(this.collider.shape);else if(this.collider.shape instanceof Gi)this._geometry=new Ko(this.collider.shape);else if(this.collider.shape instanceof zi)this._geometry=new es(this.collider.shape);else throw new Error("VRMSpringBoneColliderHelper: Unknown collider shape type detected");let t=new se.LineBasicMaterial({color:16711935,depthTest:!1,depthWrite:!1});this._line=new se.LineSegments(this._geometry,t),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(e){this.collider.updateWorldMatrix(!0,!1),this.matrix.copy(this.collider.matrixWorld);let t=this.matrix.elements;this._geometry.worldScale=ns.set(t[0],t[1],t[2]).length(),this._geometry.update(),super.updateMatrixWorld(e)}},is=class extends ge.BufferGeometry{constructor(e){super(),this.worldScale=1,this._currentRadius=0,this._currentTail=new ge.Vector3,this._springBone=e,this._attrPos=new ge.BufferAttribute(new Float32Array(294),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ge.BufferAttribute(new Uint16Array(194),1),this.setIndex(this._attrIndex),this._buildIndex(),this.update()}update(){let e=!1,t=this._springBone.settings.hitRadius/this.worldScale;this._currentRadius!==t&&(this._currentRadius=t,e=!0),this._currentTail.equals(this._springBone.initialLocalChildPosition)||(this._currentTail.copy(this._springBone.initialLocalChildPosition),e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<32;e++){let t=e/16*Math.PI;this._attrPos.setXYZ(e,Math.cos(t),Math.sin(t),0),this._attrPos.setXYZ(32+e,0,Math.cos(t),Math.sin(t)),this._attrPos.setXYZ(64+e,Math.sin(t),0,Math.cos(t))}this.scale(this._currentRadius,this._currentRadius,this._currentRadius),this.translate(this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.setXYZ(96,0,0,0),this._attrPos.setXYZ(97,this._currentTail.x,this._currentTail.y,this._currentTail.z),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<32;e++){let t=(e+1)%32;this._attrIndex.setXY(e*2,e,t),this._attrIndex.setXY(64+e*2,32+e,32+t),this._attrIndex.setXY(128+e*2,64+e,64+t)}this._attrIndex.setXY(192,96,97),this._attrIndex.needsUpdate=!0}},rs=new ae.Vector3,os=class extends ae.Group{constructor(e){super(),this.matrixAutoUpdate=!1,this.springBone=e,this._geometry=new is(this.springBone);let t=new ae.LineBasicMaterial({color:16776960,depthTest:!1,depthWrite:!1});this._line=new ae.LineSegments(this._geometry,t),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(e){this.springBone.bone.updateWorldMatrix(!0,!1),this.matrix.copy(this.springBone.bone.matrixWorld);let t=this.matrix.elements;this._geometry.worldScale=rs.set(t[0],t[1],t[2]).length(),this._geometry.update(),super.updateMatrixWorld(e)}},ss=new K.Vector3(1,0,0),as=new K.Vector3(0,1,0),ls=new K.Vector3(0,-1,0),Ft=new K.Quaternion,qt=class{get internalTotalRotationCache(){return this._totalRotationCache}constructor(){this.rotation=new K.Quaternion,this._totalRotationCache=new K.Quaternion,this._totalRotationInvCache=new K.Quaternion}internalPrecalcRotation(e,t){t.equals(ls)?Ft.setFromAxisAngle(ss,Math.PI):Ft.setFromUnitVectors(as,t),this._totalRotationCache.copy(e).multiply(Ft).multiply(this.rotation),this._totalRotationInvCache.copy(this._totalRotationCache).invert()}},us=Math.sqrt(Number.EPSILON),Xi=class extends qt{constructor(e){var t,n;super(),this.angle=st.MathUtils.clamp((t=e==null?void 0:e.angle)!=null?t:Math.PI,0,Math.PI),this.rotation=(n=e==null?void 0:e.rotation)!=null?n:new st.Quaternion}calculateLimit(e){e.applyQuaternion(this._totalRotationInvCache);let t=Math.cos(this.angle),n=!1;if(e.y<t){n=!0;let i=1-e.y*e.y;if(i<us)e.x=0,e.z=Math.sqrt(1-t*t);else{let r=Math.sqrt((1-t*t)/i);e.x*=r,e.z*=r}e.y=t}return e.applyQuaternion(this._totalRotationCache),n}},ot=4,N=4*ot,ds=class extends We.BufferGeometry{constructor(e){super(),this._limit=e,this._currentAngle=e.angle,this._attrPos=new We.BufferAttribute(new Float32Array(3*(N+1)),3),this.setAttribute("position",this._attrPos),this._attrIndex=new We.BufferAttribute(new Uint16Array(2*(N+4)),1),this.setIndex(this._attrIndex),this._buildIndex(),this._buildPosition()}update(){let e=!1;this._currentAngle!==this._limit.angle&&(this._currentAngle=this._limit.angle,e=!0),e&&this._buildPosition()}_buildPosition(){let e=Math.cos(this._currentAngle),t=Math.sin(this._currentAngle);for(let n=0;n<N;n++){let i=2*Math.PI*(n/N);this._attrPos.setXYZ(n,t*Math.cos(i),e,t*Math.sin(i))}this._attrPos.setXYZ(N,0,0,0),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<N;e++){let t=(e+1)%N;this._attrIndex.setXY(e*2,e,t)}this._attrIndex.setXY(N*2,N,0),this._attrIndex.setXY(N*2+2,N,ot),this._attrIndex.setXY(N*2+4,N,2*ot),this._attrIndex.setXY(N*2+6,N,3*ot),this._attrIndex.needsUpdate=!0}},hs=Math.sqrt(Number.EPSILON),Qi=class extends qt{constructor(e){var t,n;super(),this.angle=at.MathUtils.clamp((t=e==null?void 0:e.angle)!=null?t:Math.PI,0,Math.PI),this.rotation=(n=e==null?void 0:e.rotation)!=null?n:new at.Quaternion}calculateLimit(e){e.applyQuaternion(this._totalRotationInvCache);let t=!1,n=e.y*e.y+e.z*e.z;if(n<hs)t=!0,e.set(0,1,0);else{if(e.x!==0){t=!0;let r=1/Math.sqrt(n);e.set(0,e.y*r,e.z*r)}let i=Math.cos(this.angle);if(e.y<i){t=!0;let r=Math.sqrt(1-i*i),o=e.z<0?-1:1;e.y=i,e.z=r*o}}return e.applyQuaternion(this._totalRotationCache),t}},z=17,cs=class extends Ge.BufferGeometry{constructor(e){super(),this._limit=e,this._currentAngle=e.angle,this._attrPos=new Ge.BufferAttribute(new Float32Array(3*(z+1)),3),this.setAttribute("position",this._attrPos),this._attrIndex=new Ge.BufferAttribute(new Uint16Array(2*(z+1)),1),this.setIndex(this._attrIndex),this._buildIndex(),this._buildPosition()}update(){let e=!1;this._currentAngle!==this._limit.angle&&(this._currentAngle=this._limit.angle,e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<z;e++){let t=this._currentAngle*(2*(e/(z-1))-1);this._attrPos.setXYZ(e,0,Math.cos(t),Math.sin(t))}this._attrPos.setXYZ(z,0,0,0),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<z-1;e++)this._attrIndex.setXY(e*2,e,e+1);this._attrIndex.setXY(z*2-2,z-1,z),this._attrIndex.setXY(z*2,z,0),this._attrIndex.needsUpdate=!0}},Bi=Math.sqrt(Number.EPSILON),ji=class extends qt{constructor(e){var t,n,i;super(),this.pitch=ye.MathUtils.clamp((t=e==null?void 0:e.pitch)!=null?t:Math.PI,0,Math.PI),this.yaw=ye.MathUtils.clamp((n=e==null?void 0:e.yaw)!=null?n:Math.PI/2,0,Math.PI/2),this.rotation=(i=e==null?void 0:e.rotation)!=null?i:new ye.Quaternion}calculateLimit(e){e.applyQuaternion(this._totalRotationInvCache);let t=!1,n;e.y<-1+Bi?n=Math.PI:Math.abs(e.x)>1-Bi?n=0:n=Math.atan2(e.z,e.y);let i=Math.asin(ye.MathUtils.clamp(e.x,-1,1));Math.abs(n)>this.pitch&&(t=!0,n=this.pitch*Math.sign(n)),Math.abs(i)>this.yaw&&(t=!0,i=this.yaw*Math.sign(i));let r=Math.cos(i),o=Math.sin(i);return e.set(o,r*Math.cos(n),r*Math.sin(n)),e.applyQuaternion(this._totalRotationCache),t}},E=17,ps=class extends ze.BufferGeometry{constructor(e){super(),this._limit=e,this._currentPitch=e.pitch,this._currentYaw=e.yaw,this._attrPos=new ze.BufferAttribute(new Float32Array(3*(E+4*(E-1)+1)),3),this.setAttribute("position",this._attrPos),this._attrIndex=new ze.BufferAttribute(new Uint16Array(2*(5*(E-1)+6)),1),this.setIndex(this._attrIndex),this._buildIndex(),this._buildPosition()}update(){let e=!1;this._currentPitch!==this._limit.pitch&&(this._currentPitch=this._limit.pitch,e=!0),this._currentYaw!==this._limit.yaw&&(this._currentYaw=this._limit.yaw,e=!0),e&&this._buildPosition()}_buildPosition(){for(let e=0;e<E;e++){let t=this._currentPitch*(2*(e/(E-1))-1);this._attrPos.setXYZ(e,0,Math.cos(t),Math.sin(t))}{let e=Math.cos(this._currentYaw),t=Math.sin(this._currentYaw);for(let n=0;n<E-1;n++){let i=this._currentPitch*(2*(n/(E-1))-1),r=Math.cos(i),o=Math.sin(i);this._attrPos.setXYZ(E+n,t,e*r,e*o),this._attrPos.setXYZ(E+2*(E-1)+n,-t,e*r,-e*o)}}{let e=Math.cos(this._currentPitch),t=Math.sin(this._currentPitch);for(let n=0;n<E-1;n++){let i=this._currentYaw*(2*(n/(E-1))-1),r=Math.cos(i),o=Math.sin(i);this._attrPos.setXYZ(E+E-1+n,-o,r*e,r*t),this._attrPos.setXYZ(E+3*(E-1)+n,o,r*e,-r*t)}}this._attrPos.setXYZ(E+4*(E-1),0,0,0),this._attrPos.needsUpdate=!0}_buildIndex(){for(let e=0;e<E-1;e++)this._attrIndex.setXY(e*2,e,e+1);for(let e=0;e<4*(E-1);e++){let t=(e+1)%(4*(E-1));this._attrIndex.setXY(2*(E-1+e),E+e,E+t)}this._attrIndex.setXY(2*(5*(E-1)),E+4*(E-1),0),this._attrIndex.setXY(2*(5*(E-1)+1),E+4*(E-1),E-1),this._attrIndex.setXY(2*(5*(E-1)+2),E+4*(E-1),E),this._attrIndex.setXY(2*(5*(E-1)+3),E+4*(E-1),E+(E-1)),this._attrIndex.setXY(2*(5*(E-1)+4),E+4*(E-1),E+2*(E-1)),this._attrIndex.setXY(2*(5*(E-1)+5),E+4*(E-1),E+3*(E-1)),this._attrIndex.needsUpdate=!0}},Ni=new te.Vector3,Di=new te.Vector3,kt=class extends te.Group{constructor(e,t){if(super(),this.matrixAutoUpdate=!1,this.limit=e,this.joint=t,this.limit instanceof Xi)this._geometry=new ds(this.limit);else if(this.limit instanceof Qi)this._geometry=new cs(this.limit);else if(this.limit instanceof ji)this._geometry=new ps(this.limit);else throw new Error("VRMSpringBoneLimitHelper: Unknown limit type detected");let n=new te.LineBasicMaterial({color:65535,depthTest:!1,depthWrite:!1});this._line=new te.LineSegments(this._geometry,n),this.add(this._line)}dispose(){this._geometry.dispose()}updateMatrixWorld(e){this.joint.bone.updateWorldMatrix(!0,!1),this.joint.bone.getWorldPosition(Ni),Di.setScalar(.5*this.joint.worldSpaceBoneLength),this.matrix.compose(Ni,this.limit.internalTotalRotationCache,Di),this._geometry.update(),super.updateMatrixWorld(e)}},Wt=class extends lt.Object3D{constructor(e){super(),this.colliderMatrix=new lt.Matrix4,this.shape=e}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),ms(this.colliderMatrix,this.matrixWorld,this.shape.offset)}};function ms(e,t,n){let i=t.elements;e.copy(t),n&&(e.elements[12]=i[0]*n.x+i[4]*n.y+i[8]*n.z+i[12],e.elements[13]=i[1]*n.x+i[5]*n.y+i[9]*n.z+i[13],e.elements[14]=i[2]*n.x+i[6]*n.y+i[10]*n.z+i[14])}var fs=new Zi.Matrix4;function _s(e){return e.invert?e.invert():e.getInverse(fs.copy(e)),e}var gs=class{constructor(e){this._inverseCache=new qi.Matrix4,this._shouldUpdateInverse=!0,this.matrix=e;let t={set:(n,i,r)=>(this._shouldUpdateInverse=!0,n[i]=r,!0)};this._originalElements=e.elements,e.elements=new Proxy(e.elements,t)}get inverse(){return this._shouldUpdateInverse&&(_s(this._inverseCache.copy(this.matrix)),this._shouldUpdateInverse=!1),this._inverseCache}revert(){this.matrix.elements=this._originalElements}},Es=new Zt.Vector3,vs=new Zt.Vector3;function Ms(e,t){return e.matrixWorld.decompose(Es,t,vs),t}var Gt=new U.Matrix4,Te=new U.Vector3,De=new U.Vector3,rt=new U.Quaternion,zt=new U.Matrix4,Fi=new U.Matrix4,Fe=new U.Vector3,fe=new U.Vector3,Rs=class{constructor(e,t,n={},i=[]){this._currentTail=new U.Vector3,this._prevTail=new U.Vector3,this._boneAxis=new U.Vector3,this._worldSpaceBoneLength=0,this._center=null,this._initialLocalMatrix=new U.Matrix4,this._initialLocalRotation=new U.Quaternion,this._initialLocalChildPosition=new U.Vector3;var r,o,s,l,a,u;this.bone=e,this.bone.matrixAutoUpdate=!1,this.child=t,this.settings={hitRadius:(r=n.hitRadius)!=null?r:0,stiffness:(o=n.stiffness)!=null?o:1,gravityPower:(s=n.gravityPower)!=null?s:0,gravityDir:(a=(l=n.gravityDir)==null?void 0:l.clone())!=null?a:new U.Vector3(0,-1,0),dragForce:(u=n.dragForce)!=null?u:.4},this.limit=null,this.colliderGroups=i}get worldSpaceBoneLength(){return this._worldSpaceBoneLength}get dependencies(){let e=new Set,t=this.bone.parent;t&&e.add(t);for(let n=0;n<this.colliderGroups.length;n++)for(let i=0;i<this.colliderGroups[n].colliders.length;i++)e.add(this.colliderGroups[n].colliders[i]);return e}get center(){return this._center}set center(e){var t;(t=this._center)!=null&&t.userData.inverseCacheProxy&&(this._center.userData.inverseCacheProxy.revert(),delete this._center.userData.inverseCacheProxy),this._center=e,this._center&&(this._center.userData.inverseCacheProxy||(this._center.userData.inverseCacheProxy=new gs(this._center.matrixWorld)))}get initialLocalChildPosition(){return this._initialLocalChildPosition}get _parentMatrixWorld(){return this.bone.parent?this.bone.parent.matrixWorld:Gt}setInitState(){this._initialLocalMatrix.copy(this.bone.matrix),this._initialLocalRotation.copy(this.bone.quaternion),this.child?this._initialLocalChildPosition.copy(this.child.position):this._initialLocalChildPosition.copy(this.bone.position).normalize().multiplyScalar(.07);let e=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(e),this._prevTail.copy(this._currentTail),this._boneAxis.copy(this._initialLocalChildPosition).normalize()}reset(){this.bone.quaternion.copy(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix);let e=this._getMatrixWorldToCenter();this.bone.localToWorld(this._currentTail.copy(this._initialLocalChildPosition)).applyMatrix4(e),this._prevTail.copy(this._currentTail)}update(e){var t;if(e<=0)return;this._calcWorldSpaceBoneLength(),zt.copy(this._parentMatrixWorld).multiply(this._initialLocalMatrix),Fi.copy(zt).invert(),Fe.setFromMatrixPosition(this.bone.matrixWorld),this.limit&&(this.bone.parent?Ms(this.bone.parent,rt):rt.identity(),rt.multiply(this._initialLocalRotation).normalize(),this.limit.internalPrecalcRotation(rt,this._boneAxis));let n=De.copy(this._boneAxis).transformDirection(zt);fe.copy(this._currentTail).add(Te.subVectors(this._currentTail,this._prevTail).multiplyScalar(1-this.settings.dragForce)).applyMatrix4(this._getMatrixCenterToWorld()).addScaledVector(n,this.settings.stiffness*e).addScaledVector(this.settings.gravityDir,this.settings.gravityPower*e),fe.sub(Fe).normalize(),(t=this.limit)==null||t.calculateLimit(fe),fe.multiplyScalar(this._worldSpaceBoneLength).add(Fe),this._collision(fe),this._prevTail.copy(this._currentTail),this._currentTail.copy(fe).applyMatrix4(this._getMatrixWorldToCenter()),this.bone.quaternion.setFromUnitVectors(this._boneAxis,Te.copy(fe).applyMatrix4(Fi).normalize()).premultiply(this._initialLocalRotation),this.bone.updateMatrix(),this.bone.matrixWorld.multiplyMatrices(this._parentMatrixWorld,this.bone.matrix)}_collision(e){var t;for(let n=0;n<this.colliderGroups.length;n++)for(let i=0;i<this.colliderGroups[n].colliders.length;i++){let r=this.colliderGroups[n].colliders[i],o=r.shape.calculateCollision(r.colliderMatrix,e,this.settings.hitRadius,Te);o<0&&(e.addScaledVector(Te,-o),e.sub(Fe).normalize(),(t=this.limit)==null||t.calculateLimit(e),e.multiplyScalar(this._worldSpaceBoneLength).add(Fe))}}_calcWorldSpaceBoneLength(){Te.setFromMatrixPosition(this.bone.matrixWorld),this.child?De.setFromMatrixPosition(this.child.matrixWorld):(De.copy(this._initialLocalChildPosition),De.applyMatrix4(this.bone.matrixWorld)),this._worldSpaceBoneLength=Te.sub(De).length()}_getMatrixCenterToWorld(){return this._center?this._center.matrixWorld:Gt}_getMatrixWorldToCenter(){return this._center?this._center.userData.inverseCacheProxy.inverse:Gt}};function Ts(e,t){let n=[],i=e;for(;i!==null;)n.unshift(i),i=i.parent;n.forEach(r=>{t(r)})}function Xt(e,t){e.children.forEach(n=>{t(n)||Xt(n,t)})}function xs(e){var t;let n=new Map;for(let i of e){let r=i;do{let o=((t=n.get(r))!=null?t:0)+1;if(o===e.size)return r;n.set(r,o),r=r.parent}while(r!==null)}return null}var ki=class{constructor(){this._joints=new Set,this._sortedJoints=[],this._hasWarnedCircularDependency=!1,this._ancestors=[],this._objectSpringBonesMap=new Map,this._isSortedJointsDirty=!1,this._relevantChildrenUpdated=this._relevantChildrenUpdated.bind(this)}get joints(){return this._joints}get springBones(){return console.warn("VRMSpringBoneManager: springBones is deprecated. use joints instead."),this._joints}get colliderGroups(){let e=new Set;return this._joints.forEach(t=>{t.colliderGroups.forEach(n=>{e.add(n)})}),Array.from(e)}get colliders(){let e=new Set;return this.colliderGroups.forEach(t=>{t.colliders.forEach(n=>{e.add(n)})}),Array.from(e)}addJoint(e){this._joints.add(e);let t=this._objectSpringBonesMap.get(e.bone);t==null&&(t=new Set,this._objectSpringBonesMap.set(e.bone,t)),t.add(e),this._isSortedJointsDirty=!0}addSpringBone(e){console.warn("VRMSpringBoneManager: addSpringBone() is deprecated. use addJoint() instead."),this.addJoint(e)}deleteJoint(e){this._joints.delete(e),this._objectSpringBonesMap.get(e.bone).delete(e),this._isSortedJointsDirty=!0}deleteSpringBone(e){console.warn("VRMSpringBoneManager: deleteSpringBone() is deprecated. use deleteJoint() instead."),this.deleteJoint(e)}setInitState(){this._sortJoints();for(let e=0;e<this._sortedJoints.length;e++){let t=this._sortedJoints[e];t.bone.updateMatrix(),t.bone.updateWorldMatrix(!1,!1),t.setInitState()}}reset(){this._sortJoints();for(let e=0;e<this._sortedJoints.length;e++){let t=this._sortedJoints[e];t.bone.updateMatrix(),t.bone.updateWorldMatrix(!1,!1),t.reset()}}update(e){this._sortJoints();for(let t=0;t<this._ancestors.length;t++)this._ancestors[t].updateWorldMatrix(t===0,!1);for(let t=0;t<this._sortedJoints.length;t++){let n=this._sortedJoints[t];n.bone.updateMatrix(),n.bone.updateWorldMatrix(!1,!1),n.update(e),Xt(n.bone,this._relevantChildrenUpdated)}}_sortJoints(){if(!this._isSortedJointsDirty)return;let e=[],t=new Set,n=new Set,i=new Set;for(let o of this._joints)this._insertJointSort(o,t,n,e,i);this._sortedJoints=e;let r=xs(i);this._ancestors=[],r&&(this._ancestors.push(r),Xt(r,o=>{var s,l;return((l=(s=this._objectSpringBonesMap.get(o))==null?void 0:s.size)!=null?l:0)>0?!0:(this._ancestors.push(o),!1)})),this._isSortedJointsDirty=!1}_insertJointSort(e,t,n,i,r){if(n.has(e))return;if(t.has(e)){this._hasWarnedCircularDependency||(console.warn("VRMSpringBoneManager: Circular dependency detected"),this._hasWarnedCircularDependency=!0);return}t.add(e);let o=e.dependencies;for(let s of o){let l=!1,a=null;Ts(s,u=>{let d=this._objectSpringBonesMap.get(u);if(d)for(let h of d)l=!0,this._insertJointSort(h,t,n,i,r);else l||(a=u)}),a&&r.add(a)}i.push(e),n.add(e)}_relevantChildrenUpdated(e){var t,n;return((n=(t=this._objectSpringBonesMap.get(e))==null?void 0:t.size)!=null?n:0)>0?!0:(e.updateWorldMatrix(!1,!1),!1)}},Wi="VRMC_springBone_extended_collider",Yt="VRMC_springBone_limit",ys=new Set(["1.0","1.0-beta"]),ws=new Set(["1.0"]),Ss=new Set(["1.0","1.0-draft"]),$i=class xe{get name(){return xe.EXTENSION_NAME}constructor(t,n){var i,r;this.parser=t,this.jointHelperRoot=n==null?void 0:n.jointHelperRoot,this.colliderHelperRoot=n==null?void 0:n.colliderHelperRoot,this.limitHelperRoot=n==null?void 0:n.limitHelperRoot,this.useExtendedColliders=(i=n==null?void 0:n.useExtendedColliders)!=null?i:!0,this.useLimits=(r=n==null?void 0:n.useLimits)!=null?r:!0}afterRoot(t){return it(this,null,function*(){t.userData.vrmSpringBoneManager=yield this._import(t)})}_import(t){return it(this,null,function*(){let n=yield this._v1Import(t);if(n!=null)return n;let i=yield this._v0Import(t);return i!=null?i:null})}_v1Import(t){return it(this,null,function*(){var n,i,r,o,s;let l=t.parser.json;if(!(((n=l.extensionsUsed)==null?void 0:n.indexOf(xe.EXTENSION_NAME))!==-1))return null;let u=new ki,d=yield t.parser.getDependencies("node"),h=(i=l.extensions)==null?void 0:i[xe.EXTENSION_NAME];if(!h)return null;let c=h.specVersion;if(!ys.has(c))return console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${xe.EXTENSION_NAME} specVersion "${c}"`),null;let p=(r=h.colliders)==null?void 0:r.map((f,_)=>{var g,R,x,T,v,M,y,A,I,P,H,C,k,Pe,be;let Z=d[f.node];if(Z==null)return console.warn(`VRMSpringBoneLoaderPlugin: The collider #${_} attempted to reference a node #${f.node} but not found. Skipping the collider`),null;let Y=f.shape,Ee=(g=f.extensions)==null?void 0:g[Wi];if(this.useExtendedColliders&&Ee!=null){let He=Ee.specVersion;if(!ws.has(He))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Wi} specVersion "${He}". Fallbacking to the ${xe.EXTENSION_NAME} definition`);else{let B=Ee.shape;if(B.sphere)return this._importSphereCollider(Z,{offset:new O.Vector3().fromArray((R=B.sphere.offset)!=null?R:[0,0,0]),radius:(x=B.sphere.radius)!=null?x:0,inside:(T=B.sphere.inside)!=null?T:!1});if(B.capsule)return this._importCapsuleCollider(Z,{offset:new O.Vector3().fromArray((v=B.capsule.offset)!=null?v:[0,0,0]),radius:(M=B.capsule.radius)!=null?M:0,tail:new O.Vector3().fromArray((y=B.capsule.tail)!=null?y:[0,0,0]),inside:(A=B.capsule.inside)!=null?A:!1});if(B.plane)return this._importPlaneCollider(Z,{offset:new O.Vector3().fromArray((I=B.plane.offset)!=null?I:[0,0,0]),normal:new O.Vector3().fromArray((P=B.plane.normal)!=null?P:[0,0,1])})}}if(Y.sphere)return this._importSphereCollider(Z,{offset:new O.Vector3().fromArray((H=Y.sphere.offset)!=null?H:[0,0,0]),radius:(C=Y.sphere.radius)!=null?C:0,inside:!1});if(Y.capsule)return this._importCapsuleCollider(Z,{offset:new O.Vector3().fromArray((k=Y.capsule.offset)!=null?k:[0,0,0]),radius:(Pe=Y.capsule.radius)!=null?Pe:0,tail:new O.Vector3().fromArray((be=Y.capsule.tail)!=null?be:[0,0,0]),inside:!1});console.warn(`VRMSpringBoneLoaderPlugin: The collider #${_} has no valid shape. Skipping the collider`)}),m=(o=h.colliderGroups)==null?void 0:o.map((f,_)=>{var g;return{colliders:((g=f.colliders)!=null?g:[]).map(x=>{let T=p==null?void 0:p[x];return T==null?(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${_} attempted to reference a collider #${x} but not found. Skipping the collider`),null):T}).filter(x=>x!=null),name:f.name}});return(s=h.springs)==null||s.forEach((f,_)=>{var g;let R=f.joints;if(R==null){console.warn(`VRMSpringBoneLoaderPlugin: The spring #${_} has no joints. Skipping the spring`);return}let x=(g=f.colliderGroups)==null?void 0:g.map(M=>{let y=m==null?void 0:m[M];return y==null?(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${_} attempted to reference a collider group #${M} but not found. Skipping the collider group`),null):y}).filter(M=>M!=null),T=f.center!=null?d[f.center]:void 0,v;R.forEach(M=>{if(v){let y=v.node,A=d[y],I=M.node,P=d[I],H={hitRadius:v.hitRadius,dragForce:v.dragForce,gravityPower:v.gravityPower,stiffness:v.stiffness,gravityDir:v.gravityDir!=null?new O.Vector3().fromArray(v.gravityDir):void 0},C=this._importJoint(A,P,H,x);T&&(C.center=T);let k=this._tryImportLimitFromSchema(C,v);k&&(C.limit=k),u.addJoint(C)}v=M})}),u.setInitState(),u})}_v0Import(t){return it(this,null,function*(){var n,i,r;let o=t.parser.json;if(!(((n=o.extensionsUsed)==null?void 0:n.indexOf("VRM"))!==-1))return null;let l=(i=o.extensions)==null?void 0:i.VRM,a=l==null?void 0:l.secondaryAnimation;if(!a)return null;let u=a==null?void 0:a.boneGroups;if(!u)return null;let d=new ki,h=yield t.parser.getDependencies("node"),c=(r=a.colliderGroups)==null?void 0:r.map((p,m)=>{var f;let _=h[p.node];return _==null?(console.warn(`VRMSpringBoneLoaderPlugin: The collider group #${m} attempted to reference a node #${p.node} but not found. Skipping the collider group`),null):{colliders:((f=p.colliders)!=null?f:[]).map((R,x)=>{var T,v,M;let y=new O.Vector3(0,0,0);return R.offset&&y.set((T=R.offset.x)!=null?T:0,(v=R.offset.y)!=null?v:0,R.offset.z?-R.offset.z:0),this._importSphereCollider(_,{offset:y,radius:(M=R.radius)!=null?M:0,inside:!1})})}});return u==null||u.forEach((p,m)=>{let f=p.bones;f&&f.forEach(_=>{var g,R,x,T;let v=h[_];if(v==null){console.warn(`VRMSpringBoneLoaderPlugin: The spring bone group #${m} attempted to reference a node #${_} but not found. Skipping the node`);return}let M=new O.Vector3;p.gravityDir?M.set((g=p.gravityDir.x)!=null?g:0,(R=p.gravityDir.y)!=null?R:0,(x=p.gravityDir.z)!=null?x:0):M.set(0,-1,0);let y=p.center!=null?h[p.center]:void 0,A={hitRadius:p.hitRadius,dragForce:p.dragForce,gravityPower:p.gravityPower,stiffness:p.stiffiness,gravityDir:M},I=(T=p.colliderGroups)==null?void 0:T.map(P=>{let H=c==null?void 0:c[P];return H==null?(console.warn(`VRMSpringBoneLoaderPlugin: The spring #${m} attempted to reference a collider group #${P} but not found. Skipping the collider group`),null):H}).filter(P=>P!=null);v.traverse(P=>{var H;let C=(H=P.children[0])!=null?H:null,k=this._importJoint(P,C,A,I);y&&(k.center=y),d.addJoint(k)})})}),t.scene.updateMatrixWorld(),d.setInitState(),d})}_importJoint(t,n,i,r){let o=new Rs(t,n,i,r);if(this.jointHelperRoot){let s=new os(o);this.jointHelperRoot.add(s),s.renderOrder=this.jointHelperRoot.renderOrder}return o}_importSphereCollider(t,n){let i=new Yi(n),r=new Wt(i);if(t.add(r),this.colliderHelperRoot){let o=new Dt(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importCapsuleCollider(t,n){let i=new Gi(n),r=new Wt(i);if(t.add(r),this.colliderHelperRoot){let o=new Dt(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importPlaneCollider(t,n){let i=new zi(n),r=new Wt(i);if(t.add(r),this.colliderHelperRoot){let o=new Dt(r);this.colliderHelperRoot.add(o),o.renderOrder=this.colliderHelperRoot.renderOrder}return r}_importLimitCone(t,n){let i=new Xi(n);if(this.limitHelperRoot){let r=new kt(i,t);this.limitHelperRoot.add(r),r.renderOrder=this.limitHelperRoot.renderOrder}return i}_importLimitHinge(t,n){let i=new Qi(n);if(this.limitHelperRoot){let r=new kt(i,t);this.limitHelperRoot.add(r),r.renderOrder=this.limitHelperRoot.renderOrder}return i}_importLimitSpherical(t,n){let i=new ji(n);if(this.limitHelperRoot){let r=new kt(i,t);this.limitHelperRoot.add(r),r.renderOrder=this.limitHelperRoot.renderOrder}return i}_tryImportLimitFromSchema(t,n){var i,r,o,s;if(!this.useLimits)return;let l=(i=n.extensions)==null?void 0:i[Yt];if(l!=null){let a=l.specVersion;if(!Ss.has(a))console.warn(`VRMSpringBoneLoaderPlugin: Unknown ${Yt} specVersion "${a}". Ignoring the limit`);else{a==="1.0-draft"&&console.warn(`VRMSpringBoneLoaderPlugin: Using a draft spec version of ${Yt}: 1.0-draft. Some behaviors may be different. Consider updating the model file.`);let u=l.limit;if(u.cone)return this._importLimitCone(t,{angle:u.cone.angle,rotation:new O.Quaternion().fromArray((r=u.cone.rotation)!=null?r:[0,0,0,1])});if(u.hinge)return this._importLimitHinge(t,{angle:u.hinge.angle,rotation:new O.Quaternion().fromArray((o=u.hinge.rotation)!=null?o:[0,0,0,1])});if(u.spherical)return this._importLimitSpherical(t,{pitch:u.spherical.pitch,yaw:u.spherical.yaw,rotation:new O.Quaternion().fromArray((s=u.spherical.rotation)!=null?s:[0,0,0,1])});console.warn("VRMSpringBoneLoaderPlugin: Unknown limit type. Ignoring the limit");return}}}};$i.EXTENSION_NAME="VRMC_springBone";var Ji=$i;var $t=class{get name(){return"VRMLoaderPlugin"}constructor(t,n){var o,s,l,a,u,d,h,c,p,m;this.parser=t;let i=n==null?void 0:n.helperRoot,r=n==null?void 0:n.autoUpdateHumanBones;this.expressionPlugin=(o=n==null?void 0:n.expressionPlugin)!=null?o:new yt(t),this.firstPersonPlugin=(s=n==null?void 0:n.firstPersonPlugin)!=null?s:new St(t),this.humanoidPlugin=(l=n==null?void 0:n.humanoidPlugin)!=null?l:new At(t,{helperRoot:i,autoUpdateHumanBones:r}),this.lookAtPlugin=(a=n==null?void 0:n.lookAtPlugin)!=null?a:new bt(t,{helperRoot:i}),this.metaPlugin=(u=n==null?void 0:n.metaPlugin)!=null?u:new Ht(t),this.mtoonMaterialPlugin=(d=n==null?void 0:n.mtoonMaterialPlugin)!=null?d:new yi(t),this.materialsHDREmissiveMultiplierPlugin=(h=n==null?void 0:n.materialsHDREmissiveMultiplierPlugin)!=null?h:new Si(t),this.materialsV0CompatPlugin=(c=n==null?void 0:n.materialsV0CompatPlugin)!=null?c:new Li(t),this.springBonePlugin=(p=n==null?void 0:n.springBonePlugin)!=null?p:new Ji(t,{colliderHelperRoot:i,jointHelperRoot:i}),this.nodeConstraintPlugin=(m=n==null?void 0:n.nodeConstraintPlugin)!=null?m:new Ui(t,{helperRoot:i})}beforeRoot(){return Le(this,null,function*(){yield this.materialsV0CompatPlugin.beforeRoot(),yield this.mtoonMaterialPlugin.beforeRoot()})}loadMesh(t){return Le(this,null,function*(){return yield this.mtoonMaterialPlugin.loadMesh(t)})}getMaterialType(t){let n=this.mtoonMaterialPlugin.getMaterialType(t);return n!=null?n:null}extendMaterialParams(t,n){return Le(this,null,function*(){yield this.materialsHDREmissiveMultiplierPlugin.extendMaterialParams(t,n),yield this.mtoonMaterialPlugin.extendMaterialParams(t,n)})}afterRoot(t){return Le(this,null,function*(){yield this.metaPlugin.afterRoot(t),yield this.humanoidPlugin.afterRoot(t),yield this.expressionPlugin.afterRoot(t),yield this.lookAtPlugin.afterRoot(t),yield this.firstPersonPlugin.afterRoot(t),yield this.springBonePlugin.afterRoot(t),yield this.nodeConstraintPlugin.afterRoot(t),yield this.mtoonMaterialPlugin.afterRoot(t);let n=t.userData.vrmMeta,i=t.userData.vrmHumanoid;if(n&&i){let r=new Oe({scene:t.scene,expressionManager:t.userData.vrmExpressionManager,firstPerson:t.userData.vrmFirstPerson,humanoid:i,lookAt:t.userData.vrmLookAt,meta:n,materials:t.userData.vrmMToonMaterials,springBoneManager:t.userData.vrmSpringBoneManager,nodeConstraintManager:t.userData.vrmNodeConstraintManager});t.userData.vrm=r}})}};import*as er from"three";function As(e){let t=new Set;return e.traverse(n=>{if(!n.isMesh)return;let i=n;t.add(i)}),t}function Ki(e,t,n){if(t.size===1){let s=t.values().next().value;if(s.weight===1)return e[s.index]}let i=new Float32Array(e[0].count*3),r=0;if(n)r=1;else for(let s of t)r+=s.weight;for(let s of t){let l=e[s.index],a=s.weight/r;for(let u=0;u<l.count;u++)i[u*3+0]+=l.getX(u)*a,i[u*3+1]+=l.getY(u)*a,i[u*3+2]+=l.getZ(u)*a}return new er.BufferAttribute(i,3)}function tr(e){var r;let t=As(e.scene),n=new Map,i=(r=e.expressionManager)==null?void 0:r.expressionMap;if(i!=null)for(let[o,s]of Object.entries(i)){let l=new Set;for(let a of s.binds)if(a instanceof Ce){if(a.weight!==0)for(let u of a.primitives){let d=n.get(u);d==null&&(d=new Map,n.set(u,d));let h=d.get(o);h==null&&(h=new Set,d.set(o,h)),h.add(a)}l.add(a)}for(let a of l)s.deleteBind(a)}for(let o of t){let s=n.get(o);if(s==null)continue;let l=o.geometry.morphAttributes;o.geometry.morphAttributes={};let a=o.geometry.clone();o.geometry=a;let u=a.morphTargetsRelative,d=l.position!=null,h=l.normal!=null,c={},p={},m=[];if(d||h){d&&(c.position=[]),h&&(c.normal=[]);let f=0;for(let[_,g]of s)d&&(c.position[f]=Ki(l.position,g,u)),h&&(c.normal[f]=Ki(l.normal,g,u)),i==null||i[_].addBind(new Ce({index:f,weight:1,primitives:[o]})),p[_]=f,m.push(0),f++}a.morphAttributes=c,o.morphTargetDictionary=p,o.morphTargetInfluences=m}}import*as Ae from"three";import*as nr from"three";function Se(e,t,n){if(e.getComponent)return e.getComponent(t,n);{let i=e.array[t*e.itemSize+n];return e.normalized&&(i=nr.MathUtils.denormalize(i,e.array)),i}}import*as ir from"three";function ut(e,t,n,i){e.setComponent?e.setComponent(t,n,i):(e.normalized&&(i=ir.MathUtils.normalize(i,e.array)),e.array[t*e.itemSize+n]=i)}function rr(e){var d;let t=Ps(e),n=new Set;for(let h of t)n.has(h.geometry)&&(h.geometry=Cs(h.geometry)),n.add(h.geometry);let i=new Map;for(let h of n){let c=h.getAttribute("skinIndex"),p=(d=i.get(c))!=null?d:new Map;i.set(c,p);let m=h.getAttribute("skinWeight"),f=bs(c,m);p.set(m,f)}let r=new Map;for(let h of t){let c=Hs(h,i);r.set(h,c)}let o=[];for(let[h,c]of r){let p=!1;for(let m of o)if(Ls(c,m.boneInverseMap)){p=!0,m.meshes.add(h);for(let[_,g]of c)m.boneInverseMap.set(_,g);break}p||o.push({boneInverseMap:c,meshes:new Set([h])})}let s=new Map,l=new Ye,a=new Ye,u=new Ye;for(let h of o){let{boneInverseMap:c,meshes:p}=h,m=Array.from(c.keys()),f=Array.from(c.values()),_=new Ae.Skeleton(m,f),g=a.getOrCreate(_);for(let R of p){let x=R.geometry.getAttribute("skinIndex"),T=l.getOrCreate(x),v=R.skeleton.bones,M=v.map(I=>u.getOrCreate(I)).join(","),y=`${T};${g};${M}`,A=s.get(y);A==null&&(A=x.clone(),Is(A,v,m),s.set(y,A)),R.geometry.setAttribute("skinIndex",A)}for(let R of p)R.bind(_,new Ae.Matrix4)}}function Ps(e){let t=new Set;return e.traverse(n=>{if(!n.isSkinnedMesh)return;let i=n;t.add(i)}),t}function bs(e,t){let n=new Set;for(let i=0;i<e.count;i++)for(let r=0;r<e.itemSize;r++){let o=Se(e,i,r);Se(t,i,r)!==0&&n.add(o)}return n}function Hs(e,t){let n=new Map,i=e.skeleton,r=e.geometry,o=r.getAttribute("skinIndex"),s=r.getAttribute("skinWeight"),l=t.get(o),a=l==null?void 0:l.get(s);if(!a)throw new Error("Unreachable. attributeUsedIndexSetMap does not know the skin index attribute or the skin weight attribute.");for(let u of a)n.set(i.bones[u],i.boneInverses[u]);return n}function Ls(e,t){for(let[n,i]of e.entries()){let r=t.get(n);if(r!=null&&!Vs(i,r))return!1}return!0}function Is(e,t,n){let i=new Map;for(let o of t)i.set(o,i.size);let r=new Map;for(let[o,s]of n.entries()){let l=i.get(s);r.set(l,o)}for(let o=0;o<e.count;o++)for(let s=0;s<e.itemSize;s++){let l=Se(e,o,s),a=r.get(l);ut(e,o,s,a)}e.needsUpdate=!0}function Vs(e,t,n){if(n=n||1e-4,e.elements.length!=t.elements.length)return!1;for(let i=0,r=e.elements.length;i<r;i++)if(Math.abs(e.elements[i]-t.elements[i])>n)return!1;return!0}var Ye=class{constructor(){this._objectIndexMap=new Map;this._index=0}get(t){return this._objectIndexMap.get(t)}getOrCreate(t){let n=this._objectIndexMap.get(t);return n==null&&(n=this._index,this._objectIndexMap.set(t,n),this._index++),n}};function Cs(e){var n,i,r,o;let t=new Ae.BufferGeometry;t.name=e.name,t.setIndex(e.index);for(let[s,l]of Object.entries(e.attributes))t.setAttribute(s,l);for(let[s,l]of Object.entries(e.morphAttributes)){let a=s;t.morphAttributes[a]=l.concat()}t.morphTargetsRelative=e.morphTargetsRelative,t.groups=[];for(let s of e.groups)t.addGroup(s.start,s.count,s.materialIndex);return t.boundingSphere=(i=(n=e.boundingSphere)==null?void 0:n.clone())!=null?i:null,t.boundingBox=(o=(r=e.boundingBox)==null?void 0:r.clone())!=null?o:null,t.drawRange.start=e.drawRange.start,t.drawRange.count=e.drawRange.count,t.userData=e.userData,t}function or(e){if(Object.values(e).forEach(t=>{t!=null&&t.isTexture&&t.dispose()}),e.isShaderMaterial){let t=e.uniforms;t&&Object.values(t).forEach(n=>{let i=n.value;i!=null&&i.isTexture&&i.dispose()})}e.dispose()}function Us(e){let t=e.geometry;t&&t.dispose();let n=e.skeleton;n&&n.dispose();let i=e.material;i&&(Array.isArray(i)?i.forEach(r=>or(r)):i&&or(i))}function sr(e){e.traverse(Us)}import*as dt from"three";function ar(e,t){var s,l;console.warn("VRMUtils.removeUnnecessaryJoints: removeUnnecessaryJoints is deprecated. Use combineSkeletons instead. combineSkeletons contributes more to the performance improvement. This function will be removed in the next major version.");let n=(s=t==null?void 0:t.experimentalSameBoneCounts)!=null?s:!1,i=[];e.traverse(a=>{a.type==="SkinnedMesh"&&i.push(a)});let r=new Map,o=0;for(let a of i){let d=a.geometry.getAttribute("skinIndex");if(r.has(d))continue;let h=new Map,c=new Map;for(let p=0;p<d.count;p++)for(let m=0;m<d.itemSize;m++){let f=Se(d,p,m),_=h.get(f);_==null&&(_=h.size,h.set(f,_),c.set(_,f)),ut(d,p,m,_)}d.needsUpdate=!0,r.set(d,c),o=Math.max(o,h.size)}for(let a of i){let d=a.geometry.getAttribute("skinIndex"),h=r.get(d),c=[],p=[],m=n?o:h.size;for(let _=0;_<m;_++){let g=(l=h.get(_))!=null?l:0;c.push(a.skeleton.bones[g]),p.push(a.skeleton.boneInverses[g])}let f=new dt.Skeleton(c,p);a.bind(f,new dt.Matrix4)}}import*as le from"three";import{BufferAttribute as Jt}from"three";function Os(e,t){let n=e.position.count,i=new Array(n),r=0,o=t.array;for(let s=0;s<o.length;s++){let l=o[s];i[l]||(i[l]=!0,r++)}return{isVertexUsed:i,vertexCount:n,verticesUsed:r}}function Bs(e){let t=[],n=[],i=0;for(let r=0;r<e.length;r++)if(e[r]){let o=i++;t[r]=o,n[o]=r}return{originalIndexNewIndexMap:t,newIndexOriginalIndexMap:n}}function Ns(e,t){var n,i,r,o;t.name=e.name,t.morphTargetsRelative=e.morphTargetsRelative,e.groups.forEach(s=>{t.addGroup(s.start,s.count,s.materialIndex)}),t.boundingBox=(i=(n=e.boundingBox)==null?void 0:n.clone())!=null?i:null,t.boundingSphere=(o=(r=e.boundingSphere)==null?void 0:r.clone())!=null?o:null,t.setDrawRange(e.drawRange.start,e.drawRange.count),t.userData=e.userData}function Ds(e,t,n){let i=t.array,r=new i.constructor(i.length);for(let o=0;o<i.length;o++){let s=i[o];r[o]=n[s]}e.setIndex(new Jt(r,t.itemSize,t.normalized))}function ht(e,t,n){let i=e.constructor,r=new i(t.length*n),o=!0;for(let s=0;s<t.length;s++){let a=t[s]*n,u=s*n;for(let d=0;d<n;d++){let h=e[a+d];r[u+d]=h,o=o&&h===0}}return[r,o]}function Fs(e){var i;let t=new Map,n=[];for(let[r,o]of Object.entries(e))if(o.isInterleavedBufferAttribute){let s=o,l=s.data,a=(i=t.get(l))!=null?i:[];t.set(l,a),a.push([r,s])}else{let s=o;n.push([r,s])}return[t,n]}function ks(e,t,n){let[i,r]=Fs(t);for(let[o,s]of i){let l=o.array,{stride:a}=o,[u,d]=ht(l,n,a),h=new le.InterleavedBuffer(u,a);h.setUsage(o.usage);for(let[c,p]of s){let{itemSize:m,offset:f,normalized:_}=p,g=new le.InterleavedBufferAttribute(h,m,f,_);e.setAttribute(c,g)}}for(let[o,s]of r){let l=s.array,{itemSize:a,normalized:u}=s,[d,h]=ht(l,n,a);e.setAttribute(o,new Jt(d,a,u))}}function Ws(e){var i;let t=new Map,n=[];for(let[r,o]of Object.entries(e)){let s=r;for(let l=0;l<o.length;l++){let a=o[l];if(a.isInterleavedBufferAttribute){let u=a,d=u.data,h=(i=t.get(d))!=null?i:[];t.set(d,h),h.push([s,l,u])}else{let u=a;n.push([s,l,u])}}}return[t,n]}function Gs(e,t,n){var l,a;let i=!0,[r,o]=Ws(t),s={};for(let[u,d]of r){let h=u.array,{stride:c}=u,[p,m]=ht(h,n,c);i=i&&m;let f=new le.InterleavedBuffer(p,c);f.setUsage(u.usage);for(let[_,g,R]of d){let{itemSize:x,offset:T,normalized:v}=R,M=new le.InterleavedBufferAttribute(f,x,T,v);(l=s[_])!=null||(s[_]=[]),s[_][g]=M}}for(let[u,d,h]of o){let c=h,p=c.array,{itemSize:m,normalized:f}=c,[_,g]=ht(p,n,m);i=i&&g,(a=s[u])!=null||(s[u]=[]),s[u][d]=new Jt(_,m,f)}e.morphAttributes=i?{}:s}function lr(e){let t=new Map;e.traverse(n=>{if(!n.isMesh)return;let i=n,r=i.geometry,o=r.index;if(o==null)return;let s=t.get(r);if(s!=null){i.geometry=s;return}let{isVertexUsed:l,vertexCount:a,verticesUsed:u}=Os(r.attributes,o);if(u===a)return;let{originalIndexNewIndexMap:d,newIndexOriginalIndexMap:h}=Bs(l),c=new le.BufferGeometry;Ns(r,c),t.set(r,c),Ds(c,o,d),ks(c,r.attributes,h),Gs(c,r.morphAttributes,h),i.geometry=c}),Array.from(t.keys()).forEach(n=>{n.dispose()})}function ur(e){var t;((t=e.meta)==null?void 0:t.metaVersion)==="0"&&(e.scene.rotation.y=Math.PI)}var ue=class{constructor(){}};ue.combineMorphs=tr,ue.combineSkeletons=rr,ue.deepDispose=sr,ue.removeUnnecessaryJoints=ar,ue.removeUnnecessaryVertices=lr,ue.rotateVRM0=ur;export{xo as MToonMaterial,Ro as MToonMaterialDebugMode,yi as MToonMaterialLoaderPlugin,vi as MToonMaterialOutlineWidthMode,Oe as VRM,ko as VRMAimConstraint,Lt as VRMCore,Js as VRMCoreLoaderPlugin,Ln as VRMExpression,yt as VRMExpressionLoaderPlugin,Cn as VRMExpressionManager,Un as VRMExpressionMaterialColorBind,Ie as VRMExpressionMaterialColorType,Ce as VRMExpressionMorphTargetBind,js as VRMExpressionOverrideType,Et as VRMExpressionPresetName,Bn as VRMExpressionTextureTransformBind,Nn as VRMFirstPerson,St as VRMFirstPersonLoaderPlugin,qs as VRMFirstPersonMeshAnnotationType,mt as VRMHumanBoneList,Zs as VRMHumanBoneName,Yr as VRMHumanBoneParentMap,Gn as VRMHumanoid,kn as VRMHumanoidHelper,At as VRMHumanoidLoaderPlugin,$t as VRMLoaderPlugin,ao as VRMLookAt,Je as VRMLookAtBoneApplier,Tt as VRMLookAtExpressionApplier,Kr as VRMLookAtHelper,bt as VRMLookAtLoaderPlugin,Jn as VRMLookAtRangeMap,$s as VRMLookAtTypeName,Ht as VRMMetaLoaderPlugin,Ot as VRMNodeConstraint,Ct as VRMNodeConstraintHelper,Ui as VRMNodeConstraintLoaderPlugin,Go as VRMNodeConstraintManager,jr as VRMRequiredHumanBoneName,Zo as VRMRollConstraint,Xo as VRMRotationConstraint,Wt as VRMSpringBoneCollider,Dt as VRMSpringBoneColliderHelper,Qt as VRMSpringBoneColliderShape,Gi as VRMSpringBoneColliderShapeCapsule,zi as VRMSpringBoneColliderShapePlane,Yi as VRMSpringBoneColliderShapeSphere,Rs as VRMSpringBoneJoint,os as VRMSpringBoneJointHelper,qt as VRMSpringBoneLimit,Xi as VRMSpringBoneLimitCone,kt as VRMSpringBoneLimitHelper,Qi as VRMSpringBoneLimitHinge,ji as VRMSpringBoneLimitSpherical,Ji as VRMSpringBoneLoaderPlugin,ki as VRMSpringBoneManager,ue as VRMUtils};
/*!
 * @pixiv/three-vrm-core v3.6.0
 * The implementation of core features of VRM, for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-core is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-mtoon v3.6.0
 * MToon (toon material) module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-mtoon is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier v3.6.0
 * Support VRMC_hdr_emissiveMultiplier for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-hdr-emissive-multiplier is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-materials-v0compat v3.6.0
 * VRM0.0 materials compatibility layer plugin for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-materials-v0compat is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-node-constraint v3.6.0
 * Node constraint module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-node-constraint is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
/*!
 * @pixiv/three-vrm-springbone v3.6.0
 * Spring bone module for @pixiv/three-vrm
 *
 * Copyright (c) 2019-2026 pixiv Inc.
 * @pixiv/three-vrm-springbone is distributed under MIT License
 * https://github.com/pixiv/three-vrm/blob/release/LICENSE
 */
