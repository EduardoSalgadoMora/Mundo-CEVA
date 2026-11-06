/* Teoría (Aprende) y fichas imprimibles */
(function(){
const CSS=`
.ex-row{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 4px}
.ex-btn{font:inherit;font-weight:900;font-size:1.02rem;padding:12px 14px;flex:1;min-width:150px;cursor:pointer;
  background:var(--ex-card,#fff);color:var(--ex-ink,#17324D);border:3px solid var(--ex-line,#17324D);border-radius:var(--ex-rad,14px);box-shadow:0 4px 0 var(--ex-line,#17324D)}
.ex-btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--ex-line,#17324D)}
.ex-btn.go{background:var(--ex-accent);color:#fff}
.ex-ov{position:fixed;inset:0;z-index:900;background:var(--ex-bg);color:var(--ex-ink);display:flex;flex-direction:column;font-family:"Nunito",system-ui,sans-serif;
  padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}
.ex-top{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:3px solid var(--ex-line);background:var(--ex-card);flex:none;flex-wrap:wrap}
.ex-top b{flex:1;font-size:1.1rem}
.ex-body{flex:1;min-height:0;overflow:auto;padding:16px}
.ex-body>*{max-width:720px;margin-left:auto;margin-right:auto}
.ex-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.ex-topic{font-size:1rem;padding:14px;text-align:left;display:flex;gap:12px;align-items:center}
.ex-topic span.i{font-size:1.8rem}
.ex-th{background:var(--ex-card);border:3px solid var(--ex-line);border-radius:var(--ex-rad);padding:16px 18px;line-height:1.6;font-size:1.08rem}
.ex-th h2{margin:0 0 8px;font-size:1.5rem}
.ex-th h3{margin:16px 0 6px;font-size:1.15rem}
.ex-th p{margin:6px 0}
.ex-th ul{margin:6px 0;padding-left:22px}
.ex-tip{background:#FFF4C2;color:#3A2E00;border:2px dashed #C99A1C;border-radius:12px;padding:10px 12px;margin:12px 0;font-weight:800}
.ex-ex{background:var(--ex-soft);border-radius:12px;padding:8px 12px;margin:8px 0}
.ex-say{font:inherit;font-weight:900;border:2px solid var(--ex-line);background:var(--ex-card);color:var(--ex-ink);border-radius:99px;padding:2px 10px;margin:2px;cursor:pointer}
.ex-words{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.ex-words .w{display:flex;flex-direction:column;align-items:center;gap:4px;border:2px solid var(--ex-line);border-radius:12px;padding:6px;background:#fff;min-width:84px;color:#17324D}
.ex-words .w svg{width:56px;height:56px}
.ex-words .w .em{font-size:2rem}
.ex-form{display:flex;flex-direction:column;gap:12px}
.ex-chk{display:flex;align-items:center;gap:10px;padding:10px 12px;border:3px solid var(--ex-line);border-radius:var(--ex-rad);background:var(--ex-card);font-weight:900;cursor:pointer;font:inherit;text-align:left;color:var(--ex-ink)}
.ex-chk .b{width:28px;height:28px;border:3px solid var(--ex-line);border-radius:8px;display:grid;place-items:center;flex:none}
.ex-chk.on .b{background:var(--ex-accent);color:#fff}
.ex-seg{display:flex;gap:8px;flex-wrap:wrap}
.ex-seg .ex-btn{flex:none;min-width:0}
.ex-doc{background:#fff;color:#111;max-width:760px;margin:0 auto;padding:28px 26px;border-radius:8px;box-shadow:0 4px 18px rgba(0,0,0,.18);font-family:"Nunito",Arial,sans-serif}
.ex-doc h1{font-size:1.45rem;margin:0 0 6px}
.ex-doc .nm{display:flex;gap:24px;margin:8px 0 18px;font-weight:700}
.ex-doc .nm span{flex:1;border-bottom:1.5px solid #111;padding-bottom:2px}
.ex-doc h2{font-size:1.08rem;margin:20px 0 8px;break-after:avoid;page-break-after:avoid}
.ex-doc ol{margin:0;padding-left:26px}
.ex-doc li{margin:10px 0;break-inside:avoid;page-break-inside:avoid;line-height:1.7}
.ex-doc .ln{display:inline-block;min-width:150px;border-bottom:1.5px solid #111;margin:0 4px}
.ex-doc .pic{display:inline-block;width:62px;height:62px;vertical-align:middle;margin-right:8px}
.ex-doc .pic svg{width:100%;height:100%}
.ex-doc .em{font-size:2.2rem;vertical-align:middle;margin-right:8px}
.ex-doc .row{display:inline-flex;gap:4px;vertical-align:middle;margin-right:8px}
.ex-doc .row .pic{width:40px;height:40px;margin:0}
.ex-ans{break-before:page;page-break-before:always;margin-top:36px;border-top:2px dashed #999;padding-top:18px}
@media print{
  html,body{background:#fff!important}
  body>*:not(.ex-printroot){display:none!important}
  .ex-printroot{position:static!important;inset:auto!important;display:block!important;background:#fff!important;padding:0!important}
  .ex-printroot .ex-body{overflow:visible!important;padding:0!important}
  .ex-noprint{display:none!important}
  .ex-doc{box-shadow:none;border-radius:0;max-width:none;padding:0}
  .ex-ans{border-top:none;margin-top:0;padding-top:0}
}
`;
let cfg=null;
function injectCSS(){ if(document.getElementById("ex-css"))return; const s=document.createElement("style"); s.id="ex-css"; s.textContent=CSS; document.head.appendChild(s); }
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function vars(el){ const t=cfg.theme; el.style.cssText+=`;--ex-bg:${t.bg};--ex-card:${t.card};--ex-ink:${t.ink};--ex-line:${t.line};--ex-accent:${t.accent};--ex-soft:${t.soft};--ex-rad:${t.rad}`; }
function overlay(title){
  const ov=document.createElement("div"); ov.className="ex-ov"; vars(ov);
  ov.innerHTML=`<div class="ex-top ex-noprint"><button class="ex-btn" data-x style="flex:none;min-width:0">⟵ Volver</button><b>${title}</b><span data-tools style="display:flex;gap:8px;flex-wrap:wrap"></span></div><div class="ex-body"></div>`;
  document.body.appendChild(ov);
  return ov;
}
function wireSay(root){ root.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>CEVA.speak(b.dataset.say,b.dataset.lang||cfg.lang)); }

function openTheory(startId){
  const ov=overlay("📖 Aprende"), body=ov.querySelector(".ex-body");
  let stack=[];
  ov.querySelector("[data-x]").onclick=()=>{ if(stack.length){ stack.pop(); list(); } else ov.remove(); };
  function list(){
    body.innerHTML=`<p style="font-weight:800;margin:0 0 12px">Elige un tema para repasar la teoría.</p><div class="ex-list"></div>`;
    const L=body.querySelector(".ex-list");
    cfg.theory.forEach(t=>{ const b=document.createElement("button"); b.className="ex-btn ex-topic"; b.innerHTML=`<span class="i">${t.icon}</span><span>${t.title}</span>`; b.onclick=()=>show(t); L.appendChild(b); });
  }
  function show(t){ stack=[t.id]; body.innerHTML=`<div class="ex-th"><h2>${t.icon} ${t.title}</h2>${t.html}</div>`; wireSay(body); body.scrollTop=0; }
  const first=startId&&cfg.theory.find(t=>t.id===startId);
  if(first) show(first); else list();
}

function openSheets(){
  const ov=overlay("🖨️ Fichas para imprimir"), body=ov.querySelector(".ex-body"), tools=ov.querySelector("[data-tools]");
  const sel=new Set(cfg.sheets.map(s=>s.id)); let per=5;
  ov.querySelector("[data-x]").onclick=()=>{ if(body.querySelector(".ex-doc")){ form(); } else ov.remove(); };
  function form(){
    ov.classList.remove("ex-printroot"); tools.innerHTML="";
    body.innerHTML=`<div class="ex-form"><p style="margin:0;font-weight:800">Elige los temas y cuántos ejercicios de cada uno. Cada vez sale una ficha distinta, con las soluciones en otra página.</p>
      <div data-t class="ex-form" style="gap:8px"></div>
      <div><b>Ejercicios por tema</b><div class="ex-seg" data-n style="margin-top:6px"></div></div>
      <button class="ex-btn go" data-g style="font-size:1.15rem">Crear ficha</button></div>`;
    const T=body.querySelector("[data-t]");
    cfg.sheets.forEach(s=>{ const b=document.createElement("button"); b.className="ex-chk"+(sel.has(s.id)?" on":""); b.innerHTML=`<span class="b">${sel.has(s.id)?"✓":""}</span><span>${s.title}</span>`;
      b.onclick=()=>{ sel.has(s.id)?sel.delete(s.id):sel.add(s.id); form(); }; T.appendChild(b); });
    const N=body.querySelector("[data-n]");
    [3,5,8,10].forEach(n=>{ const b=document.createElement("button"); b.className="ex-btn"+(per===n?" go":""); b.textContent=n; b.onclick=()=>{ per=n; form(); }; N.appendChild(b); });
    body.querySelector("[data-g]").onclick=()=>{ if(!sel.size) return; doc(); };
  }
  function doc(){
    const topics=cfg.sheets.filter(s=>sel.has(s.id));
    const sections=topics.map(s=>{ const items=[], keys=new Set(); let tries=0;
      while(items.length<per&&tries<200){ tries++; const it=s.make(); const k=it.key||it.q; if(keys.has(k))continue; keys.add(k); items.push(it); }
      return {s,items}; });
    const today=new Date().toLocaleDateString("es-ES");
    body.innerHTML=`<div class="ex-doc">
      <h1>Mundo CEVA · Ficha de ${cfg.subject}</h1>
      <div class="nm"><span>Nombre:</span><span style="flex:.5">Fecha:</span></div>
      ${sections.map((x,i)=>`<h2>${i+1}. ${x.s.instr}</h2><ol>${x.items.map(it=>`<li>${it.q}</li>`).join("")}</ol>`).join("")}
      <div class="ex-ans"><h1>Soluciones</h1><p style="margin:0;color:#555">Ficha creada el ${today}</p>
      ${sections.map((x,i)=>`<h2>${i+1}. ${x.s.title}</h2><ol>${x.items.map(it=>`<li>${it.a}</li>`).join("")}</ol>`).join("")}</div></div>`;
    ov.classList.add("ex-printroot");
    tools.innerHTML=`<button class="ex-btn" data-o style="flex:none;min-width:0">🔄 Otra</button><button class="ex-btn go" data-p style="flex:none;min-width:0">🖨️ Imprimir / PDF</button>`;
    tools.querySelector("[data-o]").onclick=doc;
    tools.querySelector("[data-p]").onclick=()=>CEVA.printPage(`Ficha ${cfg.subject}`);
    body.scrollTop=0;
  }
  form();
}

function renderButtons(box){
  if(!box||!cfg) return;
  box.innerHTML=`<div class="ex-row"><button class="ex-btn" data-t>📖 Aprende la teoría</button><button class="ex-btn" data-p>🖨️ Fichas para imprimir</button></div>`;
  vars(box);
  box.querySelector("[data-t]").onclick=()=>openTheory();
  box.querySelector("[data-p]").onclick=openSheets;
}
window.Extras={ init(c){ cfg=c; injectCSS(); }, renderButtons, openTheory };
})();
