import * as T from './three.module.js';
const $=s=>document.querySelector(s), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const acts=[
 {label:'THE LOST SON',nav:'幼子离散',title:'舍父逃逝，<br>周流诸国。',desc:'幼子自小离家，在外流浪乞讨五十余年，衣不蔽体，早已忘却自己的身世与故园。',quote:'「舍父逃逝，周流他国五十余年。」',button:'行至王城之外',caption:'流浪穷子 · 忘却身世',meaning:'穷子自幼离家，譬喻众生迷于无明，忘失本具佛性，流浪生死五十余年。身虽褴褛，心性本富；迷时不减，悟时不增。\n本幕呈现迷失的起点：离家越久，越不记得自己是谁。',eye:[16,8,18],target:[4.5,1,9]},
 {label:'THE GRAND ESTATE',nav:'王城遥见',title:'见其父舍，<br>心生怖畏。',desc:'穷子行至长者的王城宅邸，见殿宇巍峨、珍宝严饰，自念贫贱，无福承当，转身便想逃走。',quote:'「穷子见之，心怀恐怖，疾走而去。」',button:'见长者之静守',caption:'王城遥见 · 怯意欲退',meaning:'众生根性怯弱，乍见大法庄严，自愧不堪，反生退转。长者认出亲子，却不强行挽留——强拽只会令其更加惊怖。\n随顺其意，才是真正的慈悲。',eye:[9,4.5,17],target:[0,2.4,3]},
 {label:'THE DUNG-CARRYING JOB',nav:'除粪调伏',title:'就除粪役，<br>渐无惊怖。',desc:'长者密遣二人，以除粪之职雇穷子入宅。穷子执帚除秽，久处宅内，渐渐安住，不再怖畏。',quote:'「汝可于此，除粪执教，我当与汝直。」',button:'观心性渐柔',caption:'除粪调伏 · 方便接引',meaning:'除粪杂役譬喻小乘方便——以最易承当的方式接引。穷子渐习宅中生活，譬喻行者依法调心，怖畏渐消，根性渐熟。\n秽衣可脱，佛性不改；方便之门，只为人进门。',eye:[8.5,11,11.5],target:[-2,1,2.2]},
 {label:'ENTRUSTED WITH THE HOUSEHOLD',nav:'渐授家业',title:'委以家业，<br>心相体信。',desc:'数十年间，穷子自执事而进，长者渐次委以家产库藏。穷子安然领受，心性调柔，堪任大法。',quote:'「长者知子渐以调柔，即教其家业。」',button:'见当众宣认',caption:'掌库知家 · 根性渐熟',meaning:'委以家业譬喻由小乘渐入大乘。行者心量渐广，于大法无所怖畏；佛陀于中调熟，为最终开显作准备。\n经年累月的方便，只为等一个能承当的时节。',eye:[7,6,9],target:[2.3,1.4,0]},
 {label:'THE PUBLIC DECLARATION',nav:'宣认付产',title:'此真我子，<br>家业悉付。',desc:'长者集会大众，当众宣认：此实我子，昔以逃逝。今家业库藏，悉以付之。穷子欢喜承当，得未曾有。',quote:'「我实汝父，今以家业，悉以付汝。」',button:'再观一遍 · 回到初见',caption:'父子相认 · 承当本有',meaning:'当众宣认譬喻开权显实：种种方便至此会归一乘。穷子未曾失家，家业本自具足——众生承当佛性，非从外得。\n如衣里明珠，如客作之人归故家。',eye:[8,6,13.5],target:[0,1.1,7.4]}
];
let renderer,scene,camera;
try{renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});}catch(e){$('#loading small').textContent='当前浏览器无法启动 WebGL，请开启硬件加速后刷新。';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;$('#stage').append(renderer.domElement);
scene=new T.Scene();scene.background=new T.Color('#142220');scene.fog=new T.FogExp2('#142220',.018);camera=new T.PerspectiveCamera(40,innerWidth/innerHeight,.1,180);
scene.add(new T.HemisphereLight('#b0d3c5','#30271b',2));const sun=new T.DirectionalLight('#ffe2ae',3.4);sun.position.set(-7,17,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-22,right:22,top:22,bottom:-22,far:60});sun.shadow.normalBias=.04;scene.add(sun);
const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.85,...extra});
const M={stone:mat('#5e6c5b'),edge:mat('#344b40'),wood:mat('#633b2c'),dark:mat('#382e29'),roof:mat('#354e49'),gold:mat('#d5ae64',{metalness:.65,roughness:.28}),white:mat('#e9dfc3'),red:mat('#a24f35'),jade:mat('#61a99a',{metalness:.3,roughness:.25})};
function mesh(geo,m,parent,pos=[0,0,0]){let o=new T.Mesh(geo,m);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function box(parent,size,pos,m){return mesh(new T.BoxGeometry(...size),m,parent,pos);}
function ball(parent,r,pos,m,s=[1,1,1]){let o=mesh(new T.SphereGeometry(r,16,12),m,parent,pos);o.scale.set(...s);return o;}
function beam(parent,a,b,r,m){let av=new T.Vector3(...a),bv=new T.Vector3(...b),o=mesh(new T.CylinderGeometry(r,r,av.distanceTo(bv),10),m,parent);o.position.copy(av).add(bv).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bv.sub(av).normalize());return o;}
const world=new T.Group();scene.add(world);const island=new T.Group();world.add(island);
mesh(new T.CylinderGeometry(11.3,10.7,.7,80),M.edge,island,[0,-.65,1]);mesh(new T.CylinderGeometry(11,11.3,.28,80),M.stone,island,[0,-.16,1]);
for(let i=0;i<74;i++){let a=i*2.39996,r=9.7+Math.sin(i*7)*.65;let o=box(island,[.5+Math.random()*.5,.18,.4],[Math.cos(a)*r,.01,1+Math.sin(a)*r],i%2?M.edge:M.stone);o.rotation.y=a;}
box(island,[2.6,.05,3.9],[0,.03,8.95],mat('#89917a'));for(let z=7.1;z<10.6;z+=.8)for(let x=-1;x<=1;x++)box(island,[.66,.04,.62],[x*.8,.055,z],mat(x%2?'#a09a7f':'#89917a'));
// The walled estate of the wealthy elder in the royal city.
const house=new T.Group();house.position.z=-1;world.add(house);house.userData.info=['长者家业 · 譬喻本有家藏','殿宇库藏庄严，譬喻众生本具的佛性家业。穷子外出乞讨，正是众生向外驰求而忘失自家宝藏的写照。'];
box(house,[13.4,.3,13.4],[0,.17,0],M.dark);box(house,[12.6,.12,12.6],[0,.34,0],mat('#8f8974'));
const wall=(x,z,w,d)=>box(house,[w,2.1,d],[x,1.15,z],M.edge);wall(-4,6,5.4,.4);wall(4,6,5.4,.4);wall(0,-6,13.4,.4);wall(-6.7,0,.4,12.4);wall(6.7,0,.4,12.4);
box(house,[13.8,.14,.66],[0,2.28,6],M.stone);box(house,[13.8,.14,.66],[0,2.28,-6],M.stone);for(const x of [-6.7,6.7])box(house,[.66,.14,12.9],[x,2.28,0],M.stone);
for(let z=-5.4;z<5.6;z+=1.1)for(let x=-5.8;x<5.9;x+=1.1)box(house,[.95,.05,.9],[x,.42,z],mat((Math.round(x/1.1)+Math.round(z/1.1))%2?'#9a9478':'#8a886b'));
for(const x of [-1.25,1.25])box(house,[.28,2.6,.28],[x,1.4,6],M.red);box(house,[3.2,.3,.6],[0,2.85,6],M.gold);
let gr=box(house,[3.7,.2,1.3],[0,3.35,6],M.roof);for(const x of [-1.75,1.75]){beam(house,[x,3.15,6.6],[x,3.45,5.75],.05,M.gold);}
for(const x of [-.85,.85])ball(house,.2,[x,3.85,6.2],mat('#e0a151',{emissive:'#bc6020',emissiveIntensity:.55}),[.75,1.1,.75]);
box(house,[1.4,.42,.14],[0,2.85,6.36],M.gold);box(house,[1.05,.28,.04],[0,2.85,6.44],mat('#8a3c28'));
// Main hall with a two-tier roof.
const hall=new T.Group();hall.position.z=-3;house.add(hall);hall.userData.info=['王城大殿 · 大法庄严','巍峨殿宇譬喻大乘一乘之法。穷子乍见生畏，正如根机未熟者难以直下承当大法。'];
box(hall,[9.6,.5,6],[0,.55,0],M.stone);for(let x=-4.2;x<=4.2;x+=1.4)for(const z of [-2.4,2.4])mesh(new T.CylinderGeometry(.16,.2,3.2,10),M.red,hall,[x,2.2,z]);
box(hall,[9.2,.3,5.2],[0,4,0],M.dark);box(hall,[9.2,2.4,.3],[0,2.6,-2.55],M.wood);for(const x of [-4.6,4.6])box(hall,[.3,2.8,5],[x,2.5,0],M.wood);
for(const side of [-1,1]){let p=box(hall,[10.6,.2,3.4],[0,4.45,side*1.5],M.roof);p.rotation.x=side*.28;}beam(hall,[-5.4,4.9,0],[5.4,4.9,0],.14,M.gold);
for(const side of [-1,1]){let p=box(hall,[7.6,.18,2.6],[0,5.9,side*1.1],M.roof);p.rotation.x=side*.3;}beam(hall,[-4,6.3,0],[4,6.3,0],.12,M.gold);
ball(hall,.2,[0,6.75,0],M.gold);beam(hall,[0,6.45,0],[0,7,0],.05,M.gold);for(const x of [-5.3,5.3])for(const side of [-1,1])ball(hall,.12,[x,4.42,side*2.9],M.gold);
// Storehouse of treasures.
const store=new T.Group();store.position.set(-4.6,0,.2);house.add(store);store.userData.info=['库藏珍宝 · 本自具足','家产库藏譬喻佛性功德。穷子未曾失家，宝藏未曾失守；所失者，唯是认得。'];
box(store,[3.2,.35,4.6],[0,.15,0],M.dark);for(const x of [-1.3,1.3])for(const z of [-1.8,1.8])mesh(new T.CylinderGeometry(.11,.13,2.2,8),M.wood,store,[x,1.3,z]);box(store,[3,.4,4.4],[0,2.5,0],M.dark);
for(const side of [-1,1]){let p=box(store,[3.5,.16,2.3],[0,2.9,side*1.05],M.roof);p.rotation.x=side*.32;}
// Desk for the years of stewardship.
const desk=new T.Group();desk.position.set(2.6,0,-.2);house.add(desk);
box(desk,[1.5,.12,1],[0,1,0],M.wood);for(const x of [-.65,.65])for(const z of [-.4,.4])box(desk,[.09,1,.09],[x,.5,z],M.dark);
const scrolls=[];for(let i=0;i<3;i++){let s=mesh(new T.CylinderGeometry(.07,.07,.9,10),i===1?M.jade:M.gold,desk,[.4-i*.35,1.12,-.1]);s.rotation.z=Math.PI/2;s.rotation.y=i*.3;scrolls.push(s);}
// The lost son: ragged robe that lightens as he is tamed.
const sonRobe=mat('#8f8574');const son=new T.Group();world.add(son);son.userData.info=['穷子 · 从怯弱到承当','穷子譬喻声闻众生：本具佛性而流浪生死，根性怯弱；经方便调伏，终能承当本有家业。'];
mesh(new T.ConeGeometry(.26,.7,12),sonRobe,son,[0,.44,0]);ball(son,.19,[0,1,0],mat('#d7aa7e'));ball(son,.15,[0,1.14,-.02],M.dark,[1,.55,1]);
for(const x of [-.14,.14])beam(son,[x,.26,0],[x,.05,.05],.05,M.dark);
const bowl=new T.Group();bowl.position.set(.3,.52,.2);mesh(new T.CylinderGeometry(.1,.07,.09,10),M.dark,bowl,[0,0,0]);son.add(bowl);
const broom=new T.Group();broom.position.set(.34,.52,.12);broom.rotation.z=-.4;beam(broom,[0,0,0],[0,.95,0],.022,M.wood);mesh(new T.ConeGeometry(.13,.3,8),mat('#b09a6a'),broom,[0,-.13,0]);son.add(broom);
// The elder, wealthy and robed in gold.
const elder=new T.Group();world.add(elder);elder.userData.info=['长者 · 恒念亲子','长者譬喻佛陀。认出穷子而不强拉回，以除粪之职渐次接引，待心性调柔方当众宣认——慈悲与方便的圆满。'];
const elderRobe=mat('#c9a24f');mesh(new T.ConeGeometry(.34,1.15,12),elderRobe,elder,[0,.66,0]);ball(elder,.22,[0,1.44,0],mat('#d7aa7e'));ball(elder,.15,[0,1.6,-.02],M.dark,[1,.55,1]);ball(elder,.16,[0,1.27,.13],M.white,[1,1.1,.5]);
for(const x of [-.38,.38])beam(elder,[x,.12,.2],[x,1.22,.2],.035,M.wood);ball(elder,.11,[.38,1.22,.2],M.jade);
// The two men secretly sent to persuade the son.
const servants=[];['#7b8c80','#8c8477'].forEach(c=>{let g=new T.Group();world.add(g);mesh(new T.ConeGeometry(.23,.62,10),mat(c),g,[0,.4,0]);ball(g,.18,[0,.92,0],mat('#d7aa7e'));ball(g,.14,[0,1.05,-.02],M.dark,[1,.5,1]);g.userData.info=['密遣二人 · 方便之言','长者密遣二人接近穷子，以同侪之语相劝。方便接引，常借众生易近之缘。'];servants.push(g);});
// Dung heaps and the humble work corner.
const dung=new T.Group();dung.position.set(-3.2,0,1.2);world.add(dung);for(let i=0;i<5;i++){mesh(new T.ConeGeometry(.26,.32,10),mat('#4a3d30'),dung,[Math.cos(i*2.1)*.5,0,Math.sin(i*2.1)*.4]);}dung.userData.info=['除粪之役 · 小乘方便','最卑微的除粪杂役，譬喻小乘教法。先令其入门、安心，再渐渐令其心量广大。'];
// Treasure chest for the final inheritance.
const chest=new T.Group();chest.position.set(0,0,8.8);world.add(chest);chest.userData.info=['家业付子 · 开权显实','长者当众宣认穷子并尽付家业，譬喻佛陀开示三乘方便、会归一乘。穷子承当的，正是本自具足的佛性家业。'];
box(chest,[2,.95,1.15],[0,.47,0],M.wood);let lid=box(chest,[2,.34,1.15],[0,1.1,0],M.gold);lid.rotation.x=-.12;for(const x of [-.68,.68])box(chest,[.15,1.05,1.2],[x,.5,0],M.gold);ball(chest,.14,[0,.72,.58],M.jade);
const chestLight=new T.PointLight('#e8c069',0,7,2);chestLight.position.set(0,1.8,8.8);world.add(chestLight);
const halo=mesh(new T.TorusGeometry(2.6,.016,6,100),M.gold,world,[0,2.8,8.4]);halo.rotation.x=.08;const ring=mesh(new T.TorusGeometry(3.4,.022,6,100),M.gold,world,[0,.09,8.4]);ring.rotation.x=Math.PI/2;
// Cypress grove.
for(let i=0;i<9;i++){let a=i*.62+2.1,x=Math.cos(a)*9.1,z=Math.sin(a)*8.6+1;if(Math.abs(x)<1.9&&z>5)continue;let g=new T.Group();g.position.set(x,0,z);world.add(g);beam(g,[0,0,0],[0,1.9,0],.1,M.wood);ball(g,.75,[0,2,0],mat('#4d6852'),[.8,1.15,.8]);ball(g,.5,[0,2.75,0],mat('#54725c'),[.7,1.1,.7]);}
// Golden dust drifting through the estate.
const particles=140,positions=new Float32Array(particles*3);for(let i=0;i<particles;i++){positions[i*3]=(Math.random()-.5)*17;positions[i*3+1]=Math.random()*9;positions[i*3+2]=(Math.random()-.5)*17+1;}const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(positions,3));const dust=new T.Points(pg,new T.PointsMaterial({color:'#e2c07a',size:.05,transparent:true,opacity:.4,depthWrite:false}));world.add(dust);
let act=0,auto=false,rotating=!reduced,angle=0,zoom=1,pitch=0,last=performance.now(),elapsed=0,transition=0,drag=false,moved=0,lastX=0,lastY=0,actTimer=0,textTimer;
let focus=new T.Vector3(...acts[0].target),eye=new T.Vector3(...acts[0].eye);const raycaster=new T.Raycaster();
function openReading(title,text){$('#reading-title').textContent=title;$('#reading-text').textContent=text;if(!$('#reading').open)$('#reading').showModal();}
const nav=$('#chapters');acts.forEach((a,i)=>{let b=document.createElement('button');b.innerHTML=`<small>0${i+1} /</small>${a.nav}`;b.onclick=()=>setAct(i);nav.append(b);});
function updateText(){let a=acts[act];$('#title').innerHTML=a.title;$('#description').textContent=a.desc;$('#quote').textContent=a.quote;$('#next').innerHTML=a.button+' <span>↗</span>';$('#count').textContent=`0${act+1} / 05`;$('#act-number').textContent=`ACT 0${act+1}`;$('#act-label').textContent=a.label;$('#scene-caption').textContent=a.caption;[...nav.children].forEach((b,i)=>{b.classList.toggle('active',i===act);b.setAttribute('aria-current',i===act?'step':'false');});}
function setAct(n){act=(n+5)%5;actTimer=0;transition=0;angle=0;pitch=0;zoom=1;clearTimeout(textTimer);$('.story').classList.add('changing');textTimer=setTimeout(()=>{updateText();$('.story').classList.remove('changing');},180);}
$('#next').onclick=()=>setAct(act+1);$('#meaning').onclick=()=>openReading(acts[act].nav+' · 寓意',acts[act].meaning);$('#help').onclick=()=>$('#instructions').showModal();document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#rotate').onclick=()=>{rotating=!rotating;$('#rotate').textContent='环视 '+(rotating?'ON':'OFF');$('#rotate').setAttribute('aria-pressed',rotating);};$('#reset-view').onclick=()=>{angle=0;zoom=1;pitch=0;};$('#autoplay').onclick=()=>{auto=!auto;actTimer=0;$('#autoplay').innerHTML=auto?'暂停观演 <span>Ⅱ</span>':'自动观演 <span>▷</span>';$('#autoplay').setAttribute('aria-pressed',auto);};
addEventListener('keydown',e=>{if(document.querySelector('dialog[open]'))return;if(e.key==='ArrowRight')setAct(act+1);if(e.key==='ArrowLeft')setAct(act-1);});
const canvas=renderer.domElement,pointers=new Map();let pinch=0;
canvas.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);drag=true;moved=0;lastX=e.clientX;lastY=e.clientY;if(pointers.size===2){let p=[...pointers.values()];pinch=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){let p=[...pointers.values()],d=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);zoom=T.MathUtils.clamp(zoom+(pinch-d)*.003,.65,1.5);pinch=d;moved+=10;}else if(drag){let dx=e.clientX-lastX,dy=e.clientY-lastY;angle-=dx*.005;pitch=T.MathUtils.clamp(pitch+dy*.004,-.35,.4);moved+=Math.abs(dx)+Math.abs(dy);}lastX=e.clientX;lastY=e.clientY;});
canvas.addEventListener('pointerup',e=>{pointers.delete(e.pointerId);drag=pointers.size>0;if(moved>7)return;raycaster.setFromCamera(new T.Vector2(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1),camera);let hits=raycaster.intersectObjects(world.children,true);for(const h of hits){let o=h.object;while(o&&!o.userData.info)o=o.parent;if(o?.userData.info){openReading(...o.userData.info);break;}}});canvas.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);drag=false;});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=T.MathUtils.clamp(zoom+e.deltaY*.0007,.65,1.5);},{passive:false});
let audio,master;$('#sound').onclick=async()=>{try{if(!audio){audio=new AudioContext();master=audio.createGain();master.gain.value=0;master.connect(audio.destination);[110,164.81,220,329.63].forEach((f,i)=>{let o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.02/(i+1);o.connect(g);g.connect(master);o.start();});}await audio.resume();let on=$('#sound').getAttribute('aria-pressed')!=='true';master.gain.setTargetAtTime(on?1:0,audio.currentTime,.7);$('#sound').setAttribute('aria-pressed',on);$('#sound').textContent='音境 '+(on?'ON':'OFF');}catch(e){$('#toast').textContent='浏览器暂不支持音频，请继续静观。';$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),3000);}};
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}addEventListener('resize',resize);
updateText();if(reduced){$('#rotate').textContent='环视 OFF';$('#rotate').setAttribute('aria-pressed','false');}
const sonSpots=[[5.5,0,9.5],[1.1,0,8.4],[-1.6,0,2.2],[2.6,0,.4],[1.15,0,7.25]];
const sonRot=[-2.2,Math.PI*.94,-2.1,Math.PI,0];
const elderSpots=[[0,0,-2],[0,0,-1.6],[3.3,0,.3],[3.9,0,-.3],[-1.05,0,7.25]];
const elderRot=[0,0,-2,-1.05,0];
const robeColors=['#8f8574','#8f8574','#a59b85','#d3c9b4','#efe4c8'];
function frame(now){requestAnimationFrame(frame);let dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;elapsed+=dt;transition=Math.min(transition+dt*.5,1);if(auto&&!document.querySelector('dialog[open]')){actTimer+=dt;if(actTimer>14){if(act===4){auto=false;$('#autoplay').innerHTML='自动观演 <span>▷</span>';$('#autoplay').setAttribute('aria-pressed','false');}else setAct(act+1);}}
let t=elapsed,a=acts[act];if(rotating&&!drag)angle+=dt*.018;let destination=new T.Vector3(...a.eye),f=new T.Vector3(...a.target);let v=destination.sub(f),radius=Math.hypot(v.x,v.z)*zoom,theta=Math.atan2(v.x,v.z)+angle;destination.set(f.x+Math.sin(theta)*radius,Math.max(4,(v.y+pitch*15)*zoom+f.y),f.z+Math.cos(theta)*radius);if(innerWidth<600){destination.y+=8;destination.multiplyScalar(1.18);f.y+=3.4;}eye.lerp(destination,1-Math.exp(-dt*2));focus.lerp(f,1-Math.exp(-dt*2));camera.position.copy(eye);camera.lookAt(focus);if(innerWidth>=600)camera.setViewOffset(innerWidth,innerHeight,-innerWidth*.13,0,innerWidth,innerHeight);else camera.clearViewOffset();
son.position.lerp(new T.Vector3(...sonSpots[act]),dt*3);son.rotation.y+=(sonRot[act]-son.rotation.y)*dt*3;son.rotation.z=act===2&&!reduced?Math.sin(t*3)*.06:0;if(act===2&&!reduced)son.position.y=Math.abs(Math.sin(t*3))*.05;else son.position.y*=.9;bowl.visible=act<2;broom.visible=act===2;sonRobe.color.lerp(new T.Color(robeColors[act]),dt*3);
elder.position.lerp(new T.Vector3(...elderSpots[act]),dt*3);elder.rotation.y+=(elderRot[act]-elder.rotation.y)*dt*3;
servants.forEach((g,i)=>{let s=act===2?1:.001;g.scale.lerp(new T.Vector3(s,s,s),dt*3);if(act===2){g.position.set(-3.4+i*1,0,3.2+i*1.3);g.rotation.y=2-i*.7;}});
dung.scale.lerp(new T.Vector3(act===2?1:.001,act===2?1:.001,act===2?1:.001),dt*3);scrolls.forEach((s,i)=>{let sc=act>=3?1:.001;s.scale.setScalar(T.MathUtils.lerp(s.scale.x,sc,dt*3));});
let cs=act===4?1:.001;chest.scale.lerp(new T.Vector3(cs,cs,cs),dt*2);chest.rotation.y=t*.02;chestLight.intensity=act===4?6+Math.sin(t*3)*2:0;halo.visible=ring.visible=act===4;halo.rotation.z=t*.03;
let dustOp=act===5?.7:.4;dust.material.opacity=T.MathUtils.lerp(dust.material.opacity,dustOp,dt);for(let i=0;i<particles;i++){positions[i*3+1]+=dt*(.12+(i%6)*.03);if(positions[i*3+1]>9.5)positions[i*3+1]=.3;}pg.attributes.position.needsUpdate=true;
sun.intensity=T.MathUtils.lerp(sun.intensity,act===5?4.4:3.2,dt);renderer.render(scene,camera);}
requestAnimationFrame(frame);setTimeout(()=>{$('#loading').style.opacity=0;setTimeout(()=>$('#loading').remove(),1000);},500);
window.lostSon={get chapter(){return act+1;},setChapter:n=>setAct(n-1),scene,renderer};
