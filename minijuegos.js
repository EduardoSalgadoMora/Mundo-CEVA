/* Minijuegos de práctica: se configuran por materia con MiniGames.init(cfg) */
(function(){
const CSS=`
.mg-title{font-weight:900;margin:22px 0 4px}
.mg-sub{margin:0 0 12px;opacity:.8;font-weight:700}
.mg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.mg-card{display:flex;align-items:center;gap:12px;text-align:left;padding:12px;font:inherit;cursor:pointer;
  background:var(--mg-card);color:var(--mg-ink);border:3px solid var(--mg-line);border-radius:var(--mg-rad);box-shadow:0 4px 0 var(--mg-line)}
.mg-card:active{transform:translateY(3px);box-shadow:0 1px 0 var(--mg-line)}
.mg-card .ic{width:50px;height:50px;flex:none;display:grid;place-items:center;font-size:1.7rem;border:3px solid var(--mg-line);border-radius:var(--mg-rad);background:var(--mg-soft)}
.mg-card b{display:block;font-size:1.05rem}
.mg-card small{display:block;opacity:.75;font-size:.86rem}
.mg-card.locked{opacity:.5;cursor:default}
.mg-ov{position:fixed;inset:0;z-index:900;background:var(--mg-bg);color:var(--mg-ink);display:flex;flex-direction:column;font-family:"Nunito",system-ui,sans-serif;
  padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}
.mg-top{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:3px solid var(--mg-line);background:var(--mg-card);flex:none}
.mg-top b{flex:1;font-size:1.1rem}
.mg-pill{font-weight:900;background:var(--mg-soft);border:2px solid var(--mg-line);border-radius:99px;padding:3px 10px;white-space:nowrap}
.mg-btn{font:inherit;font-weight:900;font-size:1.05rem;padding:10px 14px;border-radius:var(--mg-rad);border:3px solid var(--mg-line);background:var(--mg-card);color:var(--mg-ink);box-shadow:0 3px 0 var(--mg-line);cursor:pointer;touch-action:manipulation}
.mg-btn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--mg-line)}
.mg-btn.go{background:var(--mg-accent);color:#fff}
.mg-btn.ok{background:#2E9E5B;color:#fff}
.mg-btn.bad{background:#E0444E;color:#fff}
.mg-btn:disabled{opacity:.45}
.mg-body{flex:1;min-height:0;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:14px;align-items:center}
.mg-body>*{max-width:640px;width:100%}
.mg-lbl{font-weight:900;font-size:1.15rem;text-align:center;margin:0}
.mg-big{font-weight:900;font-size:clamp(1.6rem,8vw,2.6rem);text-align:center;line-height:1.2}
.mg-pic{width:110px;margin:0 auto;background:#FFF8EC;border:3px solid var(--mg-line);border-radius:14px;padding:6px;display:block}
.mg-pic svg{width:100%;height:auto;display:block}
.mg-emoji{font-size:3rem;text-align:center;display:block}
.mg-slots{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.mg-slot{min-width:34px;height:46px;border-bottom:4px solid var(--mg-line);display:grid;place-items:end center;font-weight:900;font-size:1.8rem;text-transform:uppercase}
.mg-slot.gap{border:none;min-width:14px}
.mg-keys{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.mg-keys .mg-btn{width:46px;height:50px;padding:0;font-size:1.25rem}
.mg-hearts{text-align:center;font-size:1.5rem;letter-spacing:4px}
.mg-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
@media (max-width:420px){.mg-cards{grid-template-columns:repeat(3,1fr)}}
.mg-mem{aspect-ratio:3/4;border-radius:14px;border:3px solid var(--mg-line);background:var(--mg-accent);color:#fff;font-size:2rem;font-weight:900;display:grid;place-items:center;cursor:pointer;padding:4px;overflow:hidden;font-family:inherit}
.mg-mem.open,.mg-mem.done{background:var(--mg-card);color:var(--mg-ink);font-size:1rem}
.mg-mem.done{border-color:#2E9E5B;box-shadow:0 0 0 3px #2E9E5B inset}
.mg-mem svg{width:100%;height:auto}
.mg-mem .em{font-size:2rem}
.mg-ws{display:grid;gap:3px;touch-action:none;user-select:none;-webkit-user-select:none;max-width:460px}
.mg-ws span{aspect-ratio:1;display:grid;place-items:center;font-weight:900;font-size:clamp(.95rem,4.2vw,1.35rem);background:var(--mg-card);border:2px solid var(--mg-line);border-radius:7px}
.mg-ws span.st{background:#FFD23F;color:#17324D}
.mg-ws span.f{background:#5BC67A;color:#fff}
.mg-words{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.mg-words span{font-weight:900;padding:4px 10px;border-radius:99px;border:2px solid var(--mg-line);background:var(--mg-card)}
.mg-words span.f{text-decoration:line-through;opacity:.5}
.mg-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mg-opts.one{grid-template-columns:1fr}
.mg-opts .mg-btn svg{width:100%;height:auto;display:block}
.mg-typed{min-height:56px;font-size:2rem;font-weight:900;text-align:center;border-bottom:4px solid var(--mg-line);letter-spacing:2px}
.mg-area{position:relative;flex:1;min-height:320px;width:100%;overflow:hidden;border:3px solid var(--mg-line);border-radius:18px;background:linear-gradient(#E7F7FF,#FFF8EC)}
.mg-bub{position:absolute;padding:8px 14px;border-radius:99px;background:#fff;border:3px solid var(--mg-line);font-weight:900;font-size:1.15rem;white-space:nowrap;cursor:pointer;color:#17324D}
.mg-bub.pop{background:#5BC67A;color:#fff;transition:transform .2s,opacity .2s;transform:scale(1.3);opacity:0}
.mg-bub.no{background:#E0444E;color:#fff}
.mg-fb{min-height:1.4em;text-align:center;font-weight:800}
.mg-end{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding-top:20px}
.mg-end .big{font-size:3rem}
.mg-shake{animation:mgsh .35s}
@keyframes mgsh{25%{transform:translateX(-6px)}50%{transform:translateX(6px)}75%{transform:translateX(-4px)}}
`;
const LIST=[
  {id:"hang",  ic:"❤️", name:"Adivina la palabra", desc:"Letra a letra",        need:0,  better:"max", rec:v=>`${v}/5 palabras`},
  {id:"pairs", ic:"🃏", name:"Parejas",            desc:"Juego de memoria",     need:5, better:"min", rec:v=>`${v} intentos`},
  {id:"search",ic:"🔎", name:"Sopa de letras",     desc:"Encuentra 6 palabras", need:10, better:"min", rec:v=>`${v} segundos`},
  {id:"clock", ic:"⏱️", name:"Contrarreloj",       desc:"60 segundos",          need:15, better:"max", rec:v=>`${v} aciertos`},
  {id:"dict",  ic:"🔊", name:"Dictado",            desc:"Escucha y escribe",    need:20, better:"max", rec:v=>`${v}/6`},
  {id:"catch", ic:"🫧", name:"Atrapa palabras",    desc:"Toca solo las buenas", need:30,better:"max", rec:v=>`${v} puntos`}
];
let cfg=null;
const hasProfile=()=>CEVA.profiles().some(p=>p.id===PROFILE);
const cost=()=>hasProfile()?Math.max(0,+CEVA.cfg().mgCost||0):0;
const half=()=>Math.floor(cost()/2);
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const base=s=>s.normalize("NFD").replace(/[\u0301\u0308]/g,"").normalize("NFC");
function speak(t){
  try{
    if(window.Android&&Android.speakLang){ Android.speakLang(t,cfg.lang); return; }
    if(window.Android&&Android.speak&&cfg.lang.startsWith("en")){ Android.speak(t); return; }
    if("speechSynthesis" in window){ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang=cfg.lang; u.rate=.85;
      const v=speechSynthesis.getVoices().find(v=>v.lang&&v.lang.replace("_","-").startsWith(cfg.lang.slice(0,2))); if(v)u.voice=v; speechSynthesis.speak(u); }
  }catch(e){}
}
const canSpeak=()=>!!((window.Android&&(Android.speakLang||(Android.speak&&cfg.lang.startsWith("en"))))||("speechSynthesis" in window));
function injectCSS(){ if(document.getElementById("mg-css"))return; const s=document.createElement("style"); s.id="mg-css"; s.textContent=CSS; document.head.appendChild(s); }

function renderCards(box){
  if(!box||!cfg) return;
  const sv=cfg.getSave(), gems=+sv.gems||0, recs=sv.mg||{};
  box.innerHTML=`<h2 class="mg-title" style="font-family:${cfg.theme.head}">Minijuegos</h2>
    <p class="mg-sub">Cada partida cuesta ${cost()} 💎 (tienes ${CEVA.wallet(PROFILE)}). Perfecta: te devolvemos ${cost()}. Casi perfecta: ${half()}. Se desbloquean con las gemas ganadas en total.</p><div class="mg-grid"></div>`;
  const grid=box.querySelector(".mg-grid");
  LIST.forEach(m=>{
    const open=gems>=m.need, b=document.createElement("button");
    b.className="mg-card"+(open?"":" locked");
    b.innerHTML=`<span class="ic">${open?m.ic:"🔒"}</span><span><b>${m.name}</b><small>${open?(recs[m.id]!=null?"Récord: "+m.rec(recs[m.id]):m.desc):`Se abre con ${m.need} 💎 ganadas (llevas ${gems})`}</small></span>`;
    if(open) b.onclick=()=>open_(m); else b.disabled=true;
    grid.appendChild(b);
  });
}

function open_(m){
  const t=cfg.theme;
  const ov=document.createElement("div"); ov.className="mg-ov";
  ov.style.cssText=`--mg-bg:${t.bg};--mg-card:${t.card};--mg-ink:${t.ink};--mg-line:${t.line};--mg-accent:${t.accent};--mg-soft:${t.soft};--mg-rad:${t.rad}`;
  ov.innerHTML=`<div class="mg-top"><button class="mg-btn" data-x>⟵ Salir</button><b>${m.ic} ${m.name}</b><span class="mg-pill" data-s></span></div><div class="mg-body"></div>`;
  document.body.appendChild(ov);
  const body=ov.querySelector(".mg-body");
  const api={alive:true, timers:[],
    body, stat:s=>ov.querySelector("[data-s]").textContent=s,
    after(ms,f){ const id=setTimeout(()=>{ if(api.alive) f(); },ms); api.timers.push(id); },
    every(ms,f){ const id=setInterval(()=>{ if(api.alive) f(); },ms); api.timers.push(id); return id; },
    end(recVal,tier){
      if(!api.alive) return; api.timers.forEach(x=>{clearTimeout(x);clearInterval(x);});
      const sv=cfg.getSave(); sv.mg=sv.mg||{}; const old=sv.mg[m.id];
      let isRec=false;
      if(recVal!=null && (old==null || (m.better==="max"?recVal>old:recVal<old))){ sv.mg[m.id]=recVal; isRec=true; }
      cfg.persist();
      const paid=api.paid||0, back=tier==="p"?paid:tier==="c"?Math.floor(paid/2):0;
      if(back>0) CEVA.spend(PROFILE,-back);
      const head=tier==="p"?"¡Perfecto!":tier==="c"?"¡Casi perfecto!":"¡Buen intento!";
      const line=paid?(back?`Recuperas ${back} 💎`:"Esta vez no recuperas gemas"):"";
      body.innerHTML=`<div class="mg-end"><div class="big">${tier==="p"?"🏆":tier==="c"?"🎉":"💪"}</div><p class="mg-big" style="font-size:1.8rem">${head}</p><p style="margin:0;font-weight:900;font-size:1.2rem">${line}</p>
        <p style="margin:0;font-weight:800">${isRec?"¡Nuevo récord! ":""}${recVal!=null?m.rec(recVal):""}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="mg-btn go" data-a>Otra vez</button><button class="mg-btn" data-b>Salir</button></div></div>`;
      body.querySelector("[data-a]").onclick=()=>{ close(); open_(m); };
      body.querySelector("[data-b]").onclick=close;
      api.alive=false;
    }
  };
  function close(){ api.alive=false; api.timers.forEach(x=>{clearTimeout(x);clearInterval(x);}); ov.remove(); cfg.onChange&&cfg.onChange(); }
  ov.querySelector("[data-x]").onclick=close;
  const c=cost(), w=CEVA.wallet(PROFILE);
  if(c>0){
    const enough=w>=c;
    body.innerHTML=`<div class="mg-end"><div class="big">${m.ic}</div><p class="mg-big" style="font-size:1.6rem">${m.name}</p>
      <p style="margin:0;font-weight:800">Esta partida cuesta <b>${c} 💎</b>. Tienes ${w} 💎.</p>
      <p style="margin:0;font-weight:700;opacity:.85">Si la haces perfecta, te devolvemos ${c} 💎.<br>Si fallas muy poco, ${half()} 💎. Si fallas mucho, ninguna.</p>
      ${enough?`<button class="mg-btn go" data-go style="font-size:1.2rem">Jugar (−${c} 💎)</button>`:`<p style="margin:0;font-weight:900;color:#E0444E">Te faltan ${c-w} 💎. Gánalas en los juegos de la materia.</p>`}</div>`;
    if(enough) body.querySelector("[data-go]").onclick=()=>{ CEVA.spend(PROFILE,c); api.paid=c; body.innerHTML=""; GAMES[m.id](api); };
  } else { api.paid=0; GAMES[m.id](api); }
}

const kbd=lang=>lang.startsWith("es")?"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split(""):"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const GAMES={
  /* Adivina la palabra */
  hang(api){
    const words=shuf(cfg.hang()).slice(0,5); let i=0, pts=0;
    function next(){
      if(i>=words.length) return api.end(pts,pts===5?"p":pts===4?"c":"n");
      const it=words[i], w=it.w; let lives=6; const got=new Set(); let done=false;
      api.stat(`${i+1}/5 · ✔ ${pts}`);
      api.body.innerHTML=`<p class="mg-lbl">Pista:</p><div>${it.hint}</div><div class="mg-hearts" data-h></div><div class="mg-slots" data-w></div><div class="mg-fb" data-f></div><div class="mg-keys" data-k></div>`;
      const paint=()=>{
        api.body.querySelector("[data-h]").textContent="❤️".repeat(lives)+"🤍".repeat(6-lives);
        api.body.querySelector("[data-w]").innerHTML=[...w].map(ch=>ch===" "?`<span class="mg-slot gap"></span>`:`<span class="mg-slot">${got.has(base(ch).toUpperCase())||done?ch:""}</span>`).join("");
      };
      const keys=api.body.querySelector("[data-k]");
      kbd(cfg.lang).forEach(L=>{ const b=document.createElement("button"); b.className="mg-btn"; b.textContent=L; keys.appendChild(b);
        b.onclick=()=>{ if(done||got.has(L))return; got.add(L); b.disabled=true;
          if(base(w).toUpperCase().includes(L)) b.classList.add("ok"); else { b.classList.add("bad"); lives--; }
          const won=[...w].every(ch=>ch===" "||got.has(base(ch).toUpperCase()));
          if(won||lives<=0){ done=true; if(won)pts++; paint();
            api.body.querySelector("[data-f]").innerHTML=won?`¡Muy bien! Era “${w}”.`:`Era “${w}”.`;
            if(cfg.lang.startsWith("en")) speak(w);
            i++; api.after(1600,next); return; }
          paint(); };
      });
      paint();
    }
    next();
  },
  /* Parejas */
  pairs(api){
    const ps=shuf(cfg.pairs()).slice(0,6);
    const cards=shuf(ps.flatMap((p,k)=>[{k,h:p[0]},{k,h:p[1]}]));
    let open=[], moves=0, matched=0, lock=false;
    api.body.innerHTML=`<p class="mg-lbl">${cfg.pairsTitle}</p><div class="mg-cards"></div>`;
    const grid=api.body.querySelector(".mg-cards");
    const stat=()=>api.stat(`Intentos: ${moves} · ${matched}/6`); stat();
    cards.forEach(cd=>{ const b=document.createElement("button"); b.className="mg-mem"; b.textContent="?"; cd.el=b; grid.appendChild(b);
      b.onclick=()=>{ if(lock||cd.done||open.includes(cd))return; b.classList.add("open"); b.innerHTML=cd.h; open.push(cd);
        if(open.length===2){ moves++; const [a,c]=open;
          if(a.k===c.k){ a.done=c.done=true; a.el.classList.add("done"); c.el.classList.add("done"); open=[]; matched++; stat();
            if(matched===6) api.after(700,()=>api.end(moves,moves<=6?"p":moves<=9?"c":"n")); }
          else { lock=true; stat(); api.after(900,()=>{ [a,c].forEach(x=>{x.el.classList.remove("open"); x.el.textContent="?";}); open=[]; lock=false; }); } } };
    });
  },
  /* Sopa de letras */
  search(api){
    const set=rnd(cfg.search()), N=10, words=set.words.map(w=>base(w).toUpperCase().replace(/[^A-ZÑ]/g,"")).slice(0,6);
    const g=Array.from({length:N},()=>Array(N).fill(null)), dirs=[[0,1],[1,0],[1,1]];
    const placed=[];
    words.forEach(w=>{ for(let t=0;t<300;t++){ const [dr,dc]=rnd(dirs), r0=Math.floor(Math.random()*N), c0=Math.floor(Math.random()*N);
      const r1=r0+dr*(w.length-1), c1=c0+dc*(w.length-1); if(r1>=N||c1>=N)continue;
      let ok=true; for(let k=0;k<w.length;k++){ const v=g[r0+dr*k][c0+dc*k]; if(v&&v!==w[k]){ok=false;break;} } if(!ok)continue;
      for(let k=0;k<w.length;k++) g[r0+dr*k][c0+dc*k]=w[k]; placed.push(w); return; } });
    const AB=kbd(cfg.lang); for(let r=0;r<N;r++)for(let c=0;c<N;c++) if(!g[r][c]) g[r][c]=rnd(AB);
    const found=new Set(); let sec=0, first=null;
    api.body.innerHTML=`<p class="mg-lbl">${set.title}</p><div class="mg-words" data-l></div><div class="mg-ws" style="grid-template-columns:repeat(${N},1fr)"></div><p class="mg-fb" data-f>Toca la primera y la última letra de cada palabra (o arrastra).</p>`;
    const ws=api.body.querySelector(".mg-ws");
    for(let r=0;r<N;r++)for(let c=0;c<N;c++){ const s=document.createElement("span"); s.textContent=g[r][c]; s.dataset.r=r; s.dataset.c=c; ws.appendChild(s); }
    const cellEl=(r,c)=>ws.children[r*N+c];
    const list=()=>api.body.querySelector("[data-l]").innerHTML=placed.map(w=>`<span class="${found.has(w)?"f":""}">${w}</span>`).join("");
    list(); api.stat(`⏱ 0 s · 0/${placed.length}`);
    api.every(1000,()=>{ sec++; api.stat(`⏱ ${sec} s · ${found.size}/${placed.length}`); });
    function tryLine(a,b){
      const dr=Math.sign(b[0]-a[0]), dc=Math.sign(b[1]-a[1]), lr=Math.abs(b[0]-a[0]), lc=Math.abs(b[1]-a[1]);
      if(!(lr===0||lc===0||lr===lc)) return false;
      const n=Math.max(lr,lc)+1; let s=""; const cells=[];
      for(let k=0;k<n;k++){ const r=a[0]+dr*k, c=a[1]+dc*k; s+=g[r][c]; cells.push([r,c]); }
      const rev=[...s].reverse().join(""), w=placed.find(x=>!found.has(x)&&(x===s||x===rev));
      if(!w) return false;
      found.add(w); cells.forEach(([r,c])=>cellEl(r,c).classList.add("f")); list();
      api.body.querySelector("[data-f]").textContent=`¡${w}!`;
      api.stat(`⏱ ${sec} s · ${found.size}/${placed.length}`);
      if(found.size===placed.length) api.after(600,()=>api.end(sec,sec<=120?"p":sec<=180?"c":"n"));
      return true;
    }
    const at=e=>{ const el=document.elementFromPoint(e.clientX,e.clientY); return el&&el.parentNode===ws?[+el.dataset.r,+el.dataset.c]:null; };
    let downCell=null;
    ws.addEventListener("pointerdown",e=>{ e.preventDefault(); downCell=at(e); });
    ws.addEventListener("pointerup",e=>{
      const up=at(e); if(!downCell||!up){downCell=null;return;}
      if(up[0]!==downCell[0]||up[1]!==downCell[1]){ if(first){cellEl(...first).classList.remove("st"); first=null;} if(!tryLine(downCell,up)) shake(); }
      else if(first){ cellEl(...first).classList.remove("st"); const ok=tryLine(first,up); first=null; if(!ok) shake(); }
      else { first=up; cellEl(...up).classList.add("st"); }
      downCell=null;
    });
    function shake(){ ws.classList.remove("mg-shake"); void ws.offsetWidth; ws.classList.add("mg-shake"); api.body.querySelector("[data-f]").textContent="Esa no es. Prueba otra vez."; }
  },
  /* Contrarreloj */
  clock(api){
    let left=60, pts=0, busy=false, fails=0;
    api.body.innerHTML=`<p class="mg-lbl" data-l></p><div data-d style="width:100%;display:flex;flex-direction:column;align-items:center"></div><div class="mg-opts" data-o></div><div class="mg-fb" data-f></div>`;
    const stat=()=>api.stat(`⏱ ${left} s · ✔ ${pts}`); stat();
    api.every(1000,()=>{ left--; stat(); if(left<=0) api.end(pts,(fails===0&&pts>=10)?"p":(fails<=2&&pts>=8)?"c":"n"); });
    function next(){
      busy=false; const q=cfg.quiz();
      api.body.querySelector("[data-l]").textContent=q.label;
      api.body.querySelector("[data-d]").innerHTML=q.display;
      const o=api.body.querySelector("[data-o]"); o.innerHTML="";
      const opts=q.options.map(x=>typeof x==="string"?{html:x,val:x}:x);
      o.className="mg-opts"+(opts.some(x=>String(x.val).length>16)?" one":"");
      opts.forEach(op=>{ const b=document.createElement("button"); b.className="mg-btn"; b.innerHTML=op.html; o.appendChild(b);
        b.onclick=()=>{ if(busy)return; busy=true; const ok=op.val===q.answer;
          if(ok){ pts++; b.classList.add("ok"); stat(); api.after(250,next); }
          else { fails++; b.classList.add("bad"); [...o.children].forEach((x,k)=>{ if(opts[k].val===q.answer)x.classList.add("ok"); }); api.after(800,next); } };
      });
    }
    next();
  },
  /* Dictado */
  dict(api){
    const words=shuf(cfg.dict()).slice(0,6); let i=0, pts=0; const voice=canSpeak();
    const keys=cfg.lang.startsWith("es")?[..."abcdefghijklmnñopqrstuvwxyz","á","é","í","ó","ú"]:[..."abcdefghijklmnopqrstuvwxyz"];
    function next(){
      if(i>=words.length) return api.end(pts,pts===6?"p":pts===5?"c":"n");
      const w=words[i]; let typed=""; let done=false;
      api.stat(`${i+1}/6 · ✔ ${pts}`);
      api.body.innerHTML=`<p class="mg-lbl">${voice?"Escucha y escribe la palabra":"Memoriza la palabra y escríbela"}</p>
        <div style="display:flex;justify-content:center">${voice?`<button class="mg-btn go" data-p style="font-size:1.6rem;padding:14px 26px">🔊 Escuchar</button>`:`<div class="mg-big" data-m>${w}</div>`}</div>
        <div class="mg-typed" data-t></div><div class="mg-keys" data-k></div>
        <div style="display:flex;gap:10px;justify-content:center"><button class="mg-btn" data-b>⌫ Borrar</button><button class="mg-btn go" data-c>✔ Comprobar</button></div><div class="mg-fb" data-f></div>`;
      const T=api.body.querySelector("[data-t]"), K=api.body.querySelector("[data-k]");
      if(voice){ api.body.querySelector("[data-p]").onclick=()=>speak(w); speak(w); }
      else api.after(2500,()=>{ const m=api.body.querySelector("[data-m]"); if(m) m.textContent="❓"; });
      keys.forEach(L=>{ const b=document.createElement("button"); b.className="mg-btn"; b.textContent=L; b.onclick=()=>{ if(done)return; typed+=L; T.textContent=typed; }; K.appendChild(b); });
      api.body.querySelector("[data-b]").onclick=()=>{ if(done)return; typed=typed.slice(0,-1); T.textContent=typed; };
      api.body.querySelector("[data-c]").onclick=()=>{
        if(done||!typed)return; done=true; const ok=typed===w.toLowerCase();
        if(ok) pts++;
        api.body.querySelector("[data-f]").innerHTML=ok?`¡Perfecto! “${w}”`:`Se escribe “<b>${w}</b>”${base(typed)===base(w.toLowerCase())&&typed!==w.toLowerCase()?" (¡ojo con la tilde!)":""}`;
        T.style.color=ok?"#2E9E5B":"#E0444E"; i++; api.after(ok?1300:2200,next);
      };
    }
    next();
  },
  /* Atrapa palabras */
  catch(api){
    const cat=rnd(cfg.catch()); let lives=3, pts=0, left=60, spawnT=0, speed=55, last=0;
    api.body.innerHTML=`<p class="mg-lbl">${cat.title}</p><div class="mg-area"></div>`;
    const area=api.body.querySelector(".mg-area"); const bubs=[];
    const stat=()=>api.stat(`⏱ ${left} s · ${"❤️".repeat(lives)} · ${pts}`); stat();
    const tierC=()=>{ const lost=3-lives; return (lost===0&&pts>=10)?"p":(lost<=1&&pts>=8)?"c":"n"; };
    api.every(1000,()=>{ left--; stat(); if(left<=0) api.end(pts,tierC()); });
    function spawn(){
      const yes=Math.random()<.5, w=rnd(yes?cat.yes:cat.no);
      const b=document.createElement("div"); b.className="mg-bub"; b.textContent=w; area.appendChild(b);
      const maxX=Math.max(10,area.clientWidth-b.offsetWidth-10);
      const o={el:b,x:10+Math.random()*(maxX-10),y:-50,yes,dead:false}; b.style.left=o.x+"px"; b.style.top=o.y+"px"; bubs.push(o);
      b.addEventListener("pointerdown",e=>{ e.preventDefault(); if(o.dead||!api.alive)return; o.dead=true;
        if(o.yes){ pts++; b.classList.add("pop"); setTimeout(()=>b.remove(),220); }
        else { lives--; b.classList.add("no","mg-shake"); setTimeout(()=>b.remove(),400); if(lives<=0){ stat(); return api.end(pts,"n"); } }
        stat(); });
    }
    function loop(t){
      if(!api.alive) return;
      const dt=Math.min(.05,last?(t-last)/1000:0); last=t;
      spawnT-=dt; speed=Math.min(150,speed+dt*1.6);
      if(spawnT<=0){ spawn(); spawnT=Math.max(.55,1.15-(60-left)*.008); }
      const H=area.clientHeight;
      bubs.forEach(o=>{ if(o.dead)return; o.y+=speed*dt; o.el.style.top=o.y+"px"; if(o.y>H){ o.dead=true; o.el.remove(); } });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
};

window.MiniGames={
  init(c){ cfg=c; injectCSS(); },
  renderCards
};
})();
