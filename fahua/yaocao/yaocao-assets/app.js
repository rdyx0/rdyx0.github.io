import * as T from './three.module.js';
const $=s=>document.querySelector(s), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const acts=[
 {label:'THE THIRSTY EARTH',nav:'枯原待泽',title:'卉木丛生，<br>各待甘泽。',desc:'大地之上，三草二木，品类万千：小草、中草、大草、小树、大树，根性各异，皆仰泽而立。',quote:'「山川险谷，幽邃所生，卉木药草，大小诸树。」',button:'见密云普覆',caption:'枯原群生 · 根性各异',meaning:'大地譬喻众生所依的法界；三草二木譬喻根机各异的众生——人天、声闻缘觉、菩萨，乃至万千品类。根性虽有大小，向道之心无有贵贱。\n本幕呈现未雨之野：各有其性，各待其泽。',eye:[15,4.5,17],target:[0,1.4,2]},
 {label:'THE GREAT CLOUD',nav:'密云普覆',title:'密云弥布，<br>遍覆大千。',desc:'旷野之上，大云聚起，缓缓弥布，荫覆大地；雨将降未降，泽将洽未洽，草木皆仰首而待。',quote:'「即时密云弥布，遍覆三千大千世界。」',button:'观一味法雨',caption:'大云聚起 · 遮覆全境',meaning:'密云譬喻佛陀应化出世——为未来众生作大荫蔽。云无所偏私，荫覆一切草木；正如佛出于世，等视众生如罗睺罗，无一遗漏。\n云起，是为雨至作准备。',eye:[9,5,14],target:[0,4.8,0]},
 {label:'THE ONE RAIN',nav:'一味法雨',title:'一时等澍，<br>其泽普洽。',desc:'甘雨自云而降，遍洒原野。每一滴雨，大小滋味完全相同，无有偏私；山川幽谷，一切草木同沾一雨。',quote:'「一时等澍，其泽普洽卉木丛林及诸药草。」',button:'观草木受润',caption:'一味雨降 · 平等无别',meaning:'一味雨譬喻佛陀所说的教法——一相一味，无有差别。雨不择草木，法不拣根机；平等施予，正是佛法的根本品格。\n雨味唯一，受用却各随其量。',eye:[-11,3.6,12],target:[0,1.6,0]},
 {label:'GROWTH BY NATURE',nav:'随分受润',title:'随其种性，<br>各得生长。',desc:'同此一雨：小草受润生小芽，中草抽青，大草拔节，小树生枝，大树长成巨干繁荫——各随根性，充分生长。',quote:'「一云所雨，称其种性而得生长。」',button:'见万物同荣',caption:'各随根性 · 随分受润',meaning:'雨无差别，受有等差：根器小者得小益，根器大者得大益，皆得充分滋养，无一被弃。声闻、缘觉、菩萨同听一味法，各自成就各自之果。\n这不是不平等，而是恰到好处的平等。',eye:[6.5,6,8.5],target:[0,.8,1.8]},
 {label:'ALL FLOURISH',nav:'同归一乘',title:'一地所生，<br>一雨所润。',desc:'雨歇云开，金光洒遍原野。三草二木同沐一雨之后，万千生机汇成一片青翠，大地一色，同归一乘之境。',quote:'「如来说法，一相一味，究竟至于一切种智。」',button:'再观一遍 · 回到枯原',caption:'一雨一地 · 同归一乘',meaning:'虽一地所生，一雨所润，而诸草木各有差别——差别在众生根机，不在法之高下。三草二木所受同是一雨，所归同是一乘。\n如春雨过处，桃李松竹各荣，而同是春。',eye:[12,6.5,17],target:[-1.5,1.6,0]}
];
let renderer,scene,camera;
try{renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch(e){$('#loading small').textContent='当前浏览器无法启动 WebGL，请开启硬件加速后刷新。';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;$('#stage').append(renderer.domElement);
scene=new T.Scene();scene.background=new T.Color('#1c2620');scene.fog=new T.FogExp2('#1c2620',.016);camera=new T.PerspectiveCamera(40,innerWidth/innerHeight,.1,180);
scene.add(new T.HemisphereLight('#b8d0c2','#2e3226',2));const sun=new T.DirectionalLight('#ffdfae',3.4);sun.position.set(-8,16,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-20,right:20,top:20,bottom:-20,far:60});sun.shadow.normalBias=.04;scene.add(sun);
const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.85,...extra});
const M={soil:mat('#6a6350'),edge:mat('#3b5040'),wood:mat('#5d4630'),dark:mat('#33291f'),leaf:mat('#4d7a52'),gold:mat('#d5ae64',{metalness:.65,roughness:.28}),white:mat('#e9dfc3'),blossom:mat('#a25446'),jade:mat('#61a99a',{metalness:.3,roughness:.25})};
function mesh(geo,m,parent,pos=[0,0,0]){let o=new T.Mesh(geo,m);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function ball(parent,r,pos,m,s=[1,1,1]){let o=mesh(new T.SphereGeometry(r,16,12),m,parent,pos);o.scale.set(...s);return o;}
const world=new T.Group();scene.add(world);const island=new T.Group();world.add(island);
mesh(new T.CylinderGeometry(11.3,10.7,.7,80),M.edge,island,[0,-.65,1]);mesh(new T.CylinderGeometry(11,11.3,.28,80),mat('#5a7444'),island,[0,-.15,1]);
for(let i=0;i<12;i++){let a=i*2.39996+.8,r=9.4+Math.sin(i*5)*.4;let o=mesh(new T.BoxGeometry(.5+Math.random()*.4,.16,.35),M.soil,island,[Math.cos(a)*r,.01,1+Math.sin(a)*r]);o.rotation.y=a;}
// 三草二木：小草 / 中草 / 大草 / 小树 / 大树
const kinds=['s','m','l','t1','t2'];
function tuft(parent,n,h,r,c){for(let i=0;i<n;i++){let a=i/n*6.283+Math.random()*.6,hh=h*(.8+Math.random()*.4);let b=mesh(new T.ConeGeometry(r,hh,6),mat(c),parent,[Math.cos(a)*.13,hh/2,Math.sin(a)*.13]);b.rotation.z=(Math.random()-.5)*.3;b.rotation.x=(Math.random()-.5)*.3;}}
function tree(parent,trunkH,trunkR,c1,c2){mesh(new T.CylinderGeometry(trunkR*.7,trunkR,trunkH,8),M.wood,parent,[0,trunkH/2,0]);ball(parent,trunkR*4.2,[0,trunkH+trunkR*3.2,0],mat(c1));ball(parent,trunkR*3,[trunkR*2.1,trunkH+trunkR*2.1,0],mat(c2));ball(parent,trunkR*2.5,[-trunkR*1.9,trunkH+trunkR*3.5,trunkR*1.2],mat(c2));}
function makePlant(kind){const g=new T.Group();
 if(kind==='s')tuft(g,4,.42,.05,'#77955a');
 else if(kind==='m')tuft(g,6,.8,.07,'#637f48');
 else if(kind==='l')tuft(g,8,1.35,.09,'#4f7442');
 else if(kind==='t1')tree(g,.9,.09,'#4d7a52','#567f58');
 else tree(g,2,.17,'#446d4b','#547c57');
 return g;}
const specInfo=[['小草 · 下根众生','小根小茎，得雨即生小芽——根机尚浅的众生（人天乘），受润虽微，亦足立身，各成其性。'],['中草 · 声闻缘觉','中根受润，抽青拔节——声闻缘觉之机，闻一乘法，随分证果，不失其分。'],['大草 · 初心菩萨','大草受润，茂然成丛——初心菩萨信受一乘，渐渐广大，润泽渐深。'],['小树 · 久修菩萨','小树受润，枝干渐成——久修菩萨深入法味，承当渐重，荫渐可依。'],['大树 · 大菩萨','大树受润，巨干繁荫——根熟菩萨一雨之下成就最大，荫蔽众生，摄取十方。']];
const plants=[];const specPos=[[-3.2,4.3],[-1.6,3.9],[0,3.6],[1.6,3.9],[3.2,4.3]];
kinds.forEach((k,i)=>{let p=makePlant(k);p.position.set(specPos[i][0],0,specPos[i][1]);p.userData.base=1;p.scale.setScalar(.42);p.userData.info=specInfo[i];world.add(p);plants.push(p);});
for(let i=0;i<46;i++){let a=Math.random()*6.283,r=3.2+Math.random()*6.2;let x=Math.cos(a)*r,z=1+Math.sin(a)*r*.9;if(Math.abs(x)<4.6&&z>2.2)continue;if(Math.hypot(x,z-1)<3.6)continue;let p=makePlant(kinds[i%5]);p.position.set(x,0,z);p.rotation.y=Math.random()*6.28;p.userData.base=.7+Math.random()*.5;p.scale.setScalar(p.userData.base*.42);world.add(p);plants.push(p);}
// 密云：佛陀应世之荫
const cloud=new T.Group();world.add(cloud);cloud.userData.info=['密云 · 佛陀应世','密云弥布，荫覆大千——譬喻佛陀出于世间，等视众生，为一切根性者作大荫蔽，无一遗漏。'];
for(let i=0;i<11;i++){let r=.55+Math.random()*.7;ball(cloud,r,[(Math.random()-.5)*8.6,Math.random()*1.1,(Math.random()-.5)*4.4],mat('#c6cfd2',{roughness:1}));}
for(let i=0;i<4;i++){let r=.5+Math.random()*.4;ball(cloud,r,[(Math.random()-.5)*6.4,-.35-Math.random()*.4,(Math.random()-.5)*3.4],mat('#9aa5a8',{roughness:1}));}
cloud.position.set(0,6.7,0);cloud.scale.set(.001,.001,.001);
// 一味法雨：所有雨滴同样大小、同样滋味
const RAIN=420,rp=new Float32Array(RAIN*3);for(let i=0;i<RAIN;i++){rp[i*3]=(Math.random()-.5)*19;rp[i*3+1]=Math.random()*8.5;rp[i*3+2]=(Math.random()-.5)*19+1;}
const rainGeo=new T.BufferGeometry();rainGeo.setAttribute('position',new T.BufferAttribute(rp,3));const rainMat=new T.PointsMaterial({color:'#a9c6cf',size:.07,transparent:true,opacity:0,depthWrite:false});const rain=new T.Points(rainGeo,rainMat);world.add(rain);
// 草尖露光
const DEW=90,dp=new Float32Array(DEW*3);for(let i=0;i<DEW;i++){let a=Math.random()*6.283,r=1.2+Math.random()*7.6;dp[i*3]=Math.cos(a)*r;dp[i*3+1]=.2+Math.random()*1.1;dp[i*3+2]=1+Math.sin(a)*r*.9;}
const dewGeo=new T.BufferGeometry();dewGeo.setAttribute('position',new T.BufferAttribute(dp,3));const dewMat=new T.PointsMaterial({color:'#ffe9b0',size:.05,transparent:true,opacity:0,depthWrite:false});const dew=new T.Points(dewGeo,dewMat);world.add(dew);
let act=0,auto=false,rotating=!reduced,angle=0,zoom=1,pitch=0,last=performance.now(),elapsed=0,drag=false,moved=0,lastX=0,lastY=0,actTimer=0,textTimer;
let focus=new T.Vector3(...acts[0].target),eye=new T.Vector3(...acts[0].eye);const raycaster=new T.Raycaster();
function openReading(title,text){$('#reading-title').textContent=title;$('#reading-text').textContent=text;if(!$('#reading').open)$('#reading').showModal();}
const nav=$('#chapters');acts.forEach((a,i)=>{let b=document.createElement('button');b.innerHTML=`<small>0${i+1} /</small>${a.nav}`;b.onclick=()=>setAct(i);nav.append(b);});
function updateText(){let a=acts[act];$('#title').innerHTML=a.title;$('#description').textContent=a.desc;$('#quote').textContent=a.quote;$('#next').innerHTML=a.button+' <span>↗</span>';$('#count').textContent=`0${act+1} / 05`;$('#act-number').textContent=`ACT 0${act+1}`;$('#act-label').textContent=a.label;$('#scene-caption').textContent=a.caption;[...nav.children].forEach((b,i)=>{b.classList.toggle('active',i===act);b.setAttribute('aria-current',i===act?'step':'false');});}
function setAct(n){act=(n+5)%5;actTimer=0;angle=0;pitch=0;zoom=1;clearTimeout(textTimer);$('.story').classList.add('changing');textTimer=setTimeout(()=>{updateText();$('.story').classList.remove('changing');},180);}
$('#next').onclick=()=>setAct(act+1);$('#meaning').onclick=()=>openReading(acts[act].nav+' · 寓意',acts[act].meaning);$('#help').onclick=()=>$('#instructions').showModal();document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#rotate').onclick=()=>{rotating=!rotating;$('#rotate').textContent='环视 '+(rotating?'ON':'OFF');$('#rotate').setAttribute('aria-pressed',rotating);};$('#reset-view').onclick=()=>{angle=0;zoom=1;pitch=0;};$('#autoplay').onclick=()=>{auto=!auto;actTimer=0;$('#autoplay').innerHTML=auto?'暂停观演 <span>Ⅱ</span>':'自动观演 <span>▷</span>';$('#autoplay').setAttribute('aria-pressed',auto);};
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]'))return;if(e.key==='ArrowRight')setAct(act+1);if(e.key==='ArrowLeft')setAct(act-1);});
const canvas=renderer.domElement,pointers=new Map();let pinch=0;
canvas.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);drag=true;moved=0;lastX=e.clientX;lastY=e.clientY;if(pointers.size===2){let p=[...pointers.values()];pinch=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){let p=[...pointers.values()],d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);zoom=T.MathUtils.clamp(zoom+(pinch-d)*.003,.65,1.5);pinch=d;moved+=10;}else if(drag){let dx=e.clientX-lastX,dy=e.clientY-lastY;angle-=dx*.005;pitch=T.MathUtils.clamp(pitch+dy*.004,-.35,.4);moved+=Math.abs(dx)+Math.abs(dy);}lastX=e.clientX;lastY=e.clientY;});
canvas.addEventListener('pointerup',e=>{pointers.delete(e.pointerId);drag=pointers.size>0;if(moved>7)return;raycaster.setFromCamera(new T.Vector2(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1),camera);let hits=raycaster.intersectObjects(world.children,true);for(const h of hits){let o=h.object;while(o&&!o.userData.info)o=o.parent;if(o?.userData.info){openReading(...o.userData.info);break;}}});canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);drag=false;});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=T.MathUtils.clamp(zoom+e.deltaY*.0007,.65,1.5);},{passive:false});
let audio,master;$('#sound').onclick=async()=>{try{if(!audio){audio=new AudioContext();master=audio.createGain();master.gain.value=0;master.connect(audio.destination);[98,146.83,196,293.66].forEach((f,i)=>{let o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.02/(i+1);o.connect(g);g.connect(master);o.start();});}await audio.resume();let on=$('#sound').getAttribute('aria-pressed')!=='true';master.gain.setTargetAtTime(on?1:0,audio.currentTime,.7);$('#sound').setAttribute('aria-pressed',on);$('#sound').textContent='音境 '+(on?'ON':'OFF');}catch(e){$('#toast').textContent='浏览器暂不支持音频，请继续静观。';$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),3000);}};
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}addEventListener('resize',resize);
updateText();if(reduced){$('#rotate').textContent='环视 OFF';$('#rotate').setAttribute('aria-pressed','false');}
const growth=[.42,.5,.62,.86,1],rainOp=[0,0,.8,.8,.14],cloudSc=[.001,1,1,1,.12],sunI=[3.4,2.6,2.2,2.8,4],dewOp=[0,0,0,.45,.6],bgC=['#1c2620','#18221f','#17231f','#182820','#1d3026'];
const bgT=new T.Color(bgC[0]);
function frame(now){requestAnimationFrame(frame);let dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;elapsed+=dt;if(auto&&!document.querySelector('dialog[open]')){actTimer+=dt;if(actTimer>14){if(act===4){auto=false;$('#autoplay').innerHTML='自动观演 <span>▷</span>';$('#autoplay').setAttribute('aria-pressed','false');}else setAct(act+1);}}
let t=elapsed,a=acts[act];if(rotating&&!drag)angle+=dt*.018;let destination=new T.Vector3(...a.eye),f=new T.Vector3(...a.target);let v=destination.sub(f),radius=Math.hypot(v.x,v.z)*zoom,theta=Math.atan2(v.x,v.z)+angle;destination.set(f.x+Math.sin(theta)*radius,Math.max(3,(v.y+pitch*15)*zoom+f.y),f.z+Math.cos(theta)*radius);if(innerWidth<600){destination.y+=8;destination.multiplyScalar(1.18);f.y+=3.4;}eye.lerp(destination,1-Math.exp(-dt*2));focus.lerp(f,1-Math.exp(-dt*2));camera.position.copy(eye);camera.lookAt(focus);if(innerWidth>=600)camera.setViewOffset(innerWidth,innerHeight,-innerWidth*.13,0,innerWidth,innerHeight);else camera.clearViewOffset();
plants.forEach((p,i)=>{let s=p.userData.base*growth[act];p.scale.lerp(new T.Vector3(s,s,s),dt*2.5);if(!reduced)p.rotation.z=Math.sin(t*1.5+i)*.018;});
cloud.scale.lerp(new T.Vector3(cloudSc[act],cloudSc[act],cloudSc[act]),dt*2);cloud.position.x=Math.sin(t*.1)*.6;cloud.position.z=Math.cos(t*.08)*.45;
for(let i=0;i<RAIN;i++){rp[i*3+1]-=dt*7;if(rp[i*3+1]<0)rp[i*3+1]=8.5;}rainGeo.attributes.position.needsUpdate=true;rainMat.opacity=T.MathUtils.lerp(rainMat.opacity,rainOp[act],dt*2.5);rain.visible=rainMat.opacity>.01;
for(let i=0;i<DEW;i++){dp[i*3+1]+=dt*.14;if(dp[i*3+1]>1.4)dp[i*3+1]=.2;}dewGeo.attributes.position.needsUpdate=true;dewMat.opacity=T.MathUtils.lerp(dewMat.opacity,dewOp[act],dt*2.5);
sun.intensity=T.MathUtils.lerp(sun.intensity,sunI[act],dt*2);bgT.lerp(new T.Color(bgC[act]),dt*2);scene.background.copy(bgT);scene.fog.color.copy(bgT);
renderer.render(scene,camera);}
requestAnimationFrame(frame);setTimeout(()=>{$('#loading').style.opacity=0;setTimeout(()=>$('#loading').remove(),1000);},500);
window.yaocao={get chapter(){return act+1;},setChapter:n=>setAct(n-1),scene,plants,cloud,rainMat,dewMat,sun};
