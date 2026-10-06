// ---------- Scroll reveal ----------
const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), {threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- FAQ ----------
document.querySelectorAll('.faq-item').forEach(it => it.addEventListener('click', () => it.classList.toggle('open')));

// ---------- Copy buttons ----------
document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {
  const txt = b.parentElement.childNodes[0].textContent.trim();
  try { await navigator.clipboard.writeText(txt); b.textContent = '✓ تم'; } catch { b.textContent = '—'; }
  setTimeout(() => b.textContent = 'نسخ', 1500);
}));

// ---------- WebGL: cinematic particle grid ----------
(function(){
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('webgl');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060a, 0.0022);
  const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, .1, 2000);
  camera.position.z = 400;

  const N = 2600, pos = new Float32Array(N*3), col = new Float32Array(N*3);
  const c1 = new THREE.Color(0x6d5cff), c2 = new THREE.Color(0x00e5ff);
  for (let i=0;i<N;i++){
    pos[i*3] = (Math.random()-.5)*1600;
    pos[i*3+1] = (Math.random()-.5)*1600;
    pos[i*3+2] = (Math.random()-.5)*1600;
    const c = c1.clone().lerp(c2, Math.random());
    col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color', new THREE.BufferAttribute(col,3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({size:2.4, vertexColors:true, transparent:true, opacity:.8, depthWrite:false}));
  scene.add(pts);

  const grid = new THREE.GridHelper(3000, 60, 0x6d5cff, 0x11142a);
  grid.position.y = -260; scene.add(grid);

  let mx=0,my=0;
  addEventListener('mousemove', e => { mx=(e.clientX/innerWidth-.5)*2; my=(e.clientY/innerHeight-.5)*2; });
  addEventListener('resize', () => { camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });

  (function animate(t){
    requestAnimationFrame(animate);
    pts.rotation.y = t*0.00006 + mx*.15;
    pts.rotation.x = my*.1;
    grid.position.z = (t*0.05)%100;
    camera.position.z = 400 + window.scrollY*0.25;
    renderer.render(scene,camera);
  })(0);
})();

// ---------- Dynamic sound design (WebAudio ambience) ----------
(function(){
  const btn = document.getElementById('soundBtn');
  let ctx, nodes, on=false;
  btn.addEventListener('click', () => {
    if (!ctx){
      ctx = new (window.AudioContext||window.webkitAudioContext)();
      const osc = ctx.createOscillator(), osc2 = ctx.createOscillator(),
            lfo = ctx.createOscillator(), lfoG = ctx.createGain(),
            filt = ctx.createBiquadFilter(), gain = ctx.createGain();
      osc.type='sine'; osc.frequency.value=55;
      osc2.type='sine'; osc2.frequency.value=110.5;
      lfo.type='sine'; lfo.frequency.value=0.08; lfoG.gain.value=18;
      lfo.connect(lfoG).connect(osc.frequency);
      filt.type='lowpass'; filt.frequency.value=320;
      gain.gain.value=0;
      osc.connect(filt); osc2.connect(filt); filt.connect(gain).connect(ctx.destination);
      osc.start(); osc2.start(); lfo.start();
      nodes={gain};
    }
    on=!on;
    nodes.gain.gain.linearRampToValueAtTime(on?0.12:0, ctx.currentTime+.6);
    btn.textContent = on ? '🔊' : '🔇';
  });
})();
