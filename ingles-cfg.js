/* Inglés: teoría, fichas y portada */
(function(){
const bn=CEVA.banner("ingles");
if(bn){ const h=document.querySelector(".hero"); if(h){ h.innerHTML=`<img src="${bn}" alt="" style="display:block;width:100%">`; h.style.background="none"; } }

const say=w=>`<button class="ex-say" data-say="${w}">🔊 ${w}</button>`;
const card=(w,pic)=>`<div class="w">${pic}${say(w)}</div>`;
const objPic=o=>svg(o);
const emo=e=>`<span class="em">${e}</span>`;
const sw=c=>`<span style="display:inline-block;width:44px;height:44px;border-radius:50%;background:${c};border:3px solid #17324D;-webkit-print-color-adjust:exact;print-color-adjust:exact"></span>`;
const ln=(w=130)=>`<span class="ln" style="min-width:${w}px"></span>`;
const pp=h=>`<span class="pic">${h}</span>`;

const THEORY=[
 {id:"class",icon:"🏫",title:"Classroom objects · Cosas de la clase",html:`
  <p>Toca cada palabra para escuchar cómo se dice.</p>
  <div class="ex-words">${OBJS.map(o=>card(o,objPic(o))).join("")}</div>
  <div class="ex-tip">Ojo con “cupboard” (armario): se dice más o menos “cáberd”. La “p” no suena.</div>`},
 {id:"people",icon:"👦",title:"People · Personas",html:`
  <div class="ex-words">${card("boy",emo("👦"))}${card("boys",emo("👦👦"))}${card("girl",emo("👧"))}${card("girls",emo("👧👧"))}${card("children",emo("👦👧"))}${card("teacher",emo("🧑‍🏫"))}</div>
  <p><b>boy</b> = niño · <b>girl</b> = niña · <b>children</b> = niños y niñas · <b>teacher</b> = profe</p>
  <div class="ex-tip">“children” es el plural de “child” (niño o niña). No lleva -s al final.</div>`},
 {id:"cansee",icon:"👀",title:"I can see / I can’t see",html:`
  <p><b>I can see</b> = puedo ver (sí lo veo). <b>I can’t see</b> = no puedo ver (no lo veo).</p>
  <div class="ex-ex">${say("I can see a door.")} → Veo una puerta.</div>
  <div class="ex-ex">${say("I can’t see a bin.")} → No veo una papelera.</div>
  <div class="ex-tip">“can’t” es la forma corta de “cannot”. El apóstrofo (’) va en lugar de las letras que quitamos.</div>`},
 {id:"num",icon:"🔢",title:"Numbers and plurals · Números y plurales",html:`
  <div class="ex-words">${["one","two","three","four","five","six"].map((n,i)=>card(n,`<span class="em">${i+1}</span>`)).join("")}</div>
  <p>Con <b>uno</b> decimos <b>a</b>: ${say("a chair")}</p>
  <p>Con <b>más de uno</b>, número + palabra con <b>-s</b>: ${say("three chairs")} ${say("two desks")}</p>
  <div class="ex-tip">Pregunta para contar: ${say("How many chairs?")} = ¿Cuántas sillas?</div>`},
 {id:"col",icon:"🎨",title:"Colours · Colores",html:`
  <div class="ex-words">${Object.entries(COLORS).map(([w,c])=>card(w,sw(c))).join("")}</div>
  <p>En inglés el color va <b>antes</b> de la cosa: ${say("a red chair")} = una silla roja.</p>`},
 {id:"feel",icon:"💗",title:"Feelings · Emociones",html:`
  <div class="ex-words">${Object.entries(FEEL).map(([w,[e]])=>card(w,emo(e))).join("")}</div>
  <p>Para decir cómo estás: ${say("I’m happy.")} = Estoy contenta. ${say("I’m cold.")} = Tengo frío.</p>
  <p>Para preguntar: ${say("How do you feel?")} = ¿Cómo te sientes?</p>`},
 {id:"where",icon:"🗺️",title:"Places · Where’s…?",html:`
  <div class="ex-words">${PLACES.map(p=>card(p,objPic(p))).join("")}</div>
  <p>${say("Where’s Tom?")} = ¿Dónde está Tom?</p>
  <ul><li>Chico → <b>He’s</b>: ${say("He’s in the library.")}</li><li>Chica → <b>She’s</b>: ${say("She’s in the classroom.")}</li>
  <li>Si <b>no</b> está → <b>isn’t</b>: ${say("He isn’t in the playground.")}</li></ul>
  <div class="ex-tip">He’s = He is. She’s = She is. isn’t = is not.</div>`}
];

const VOCS=[...OBJS.map(o=>[o,pp(svg(o))]),...PLACES.map(p=>[p,pp(svg(p))]),
  ...Object.entries(PEOPLE).map(([w,e])=>[w,`<span class="em">${e}</span>`]),...Object.entries(FEEL).map(([w,[e]])=>[w,`<span class="em">${e}</span>`])];
const scr=w=>{ let s; do{ s=shuffle(w.split("")).join(""); }while(s===w&&w.length>2); return s; };
const SHEETS=[
 {id:"vocab",title:"Vocabulary",instr:"Look and write. Mira el dibujo y escribe la palabra en inglés.",
  make(){ const [w,p]=rnd(VOCS); return {key:w,q:`${p}${ln()}`,a:w}; }},
 {id:"spell",title:"Spelling",instr:"Order the letters. Ordena las letras y escribe la palabra.",
  make(){ const w=rnd([...OBJS,...PLACES,"teacher","children","happy","excited"]); return {key:w,q:`<b style="letter-spacing:3px">${scr(w)}</b> → ${ln()}`,a:w}; }},
 {id:"cansee",title:"I can see / I can’t see",instr:"Look and write can or can’t. Escribe can o can’t según lo que ves.",
  make(){ const pr=shuffle(OBJS).slice(0,3), t=rnd(OBJS), yes=pr.includes(t);
    return {key:pr.join()+t,q:`<span class="row">${pr.map(o=>pp(svg(o))).join("")}</span> I ${ln(70)} see a ${t}.`,a:`I ${yes?"can":"can’t"} see a ${t}.`}; }},
 {id:"count",title:"How many?",instr:"Count and write. Cuenta y completa la frase.",
  make(){ const o=rnd(OBJS), n=1+Math.floor(Math.random()*5); const ph=n===1?`a ${o}`:`${["","one","two","three","four","five"][n]} ${PLUR[o]}`;
    return {key:o+n,q:`<span class="row">${Array.from({length:n},()=>pp(svg(o))).join("")}</span> I can see ${ln(150)}.`,a:`I can see ${ph}.`}; }},
 {id:"col",title:"Colours",instr:"Write the colour. Escribe el color en inglés.",
  make(){ const [w,c]=rnd(Object.entries(COLORS)); return {key:w,q:`${sw(c)} ${ln()}`,a:w}; }},
 {id:"feel",title:"Feelings",instr:"How do you feel? Escribe la emoción.",
  make(){ const [w,[e]]=rnd(Object.entries(FEEL)); return {key:w,q:`<span class="em">${e}</span> I’m ${ln()}.`,a:`I’m ${w}.`}; }},
 {id:"where",title:"Where’s…?",instr:"Complete. Completa con He’s o She’s y el lugar.",
  make(){ const [name,g]=rnd(KIDS), pl=rnd(PLACES); return {key:name+pl,q:`${pp(svg(pl))} <span class="em">${g==="M"?"👦":"👧"}</span> Where’s ${name}? ${ln(80)} in the ${ln(120)}.`,a:`${g==="M"?"He’s":"She’s"} in the ${pl}.`}; }}
];

Extras.init({subject:"Inglés",lang:"en-GB",
  theme:{bg:"#FFF8EC",card:"#FFFFFF",ink:"#17324D",line:"#17324D",accent:"#E8457A",soft:"#FFE7EF",rad:"16px"},
  theory:THEORY, sheets:SHEETS});
renderMenu();
})();
