/* Lengua: teoría, fichas y portada */
(function(){
const bn=CEVA.banner("lengua");
if(bn){ const b=document.getElementById("ceBanner"); if(b) b.innerHTML=`<img src="${bn}" alt="" style="display:block;width:100%;border:3px solid var(--edge);margin-bottom:14px">`; }

const ln=(w=150)=>`<span class="ln" style="min-width:${w}px"></span>`;
const TYPES=["aguda","llana","esdrújula","sobresdrújula"];
const SILT=["monosílaba","bisílaba","trisílaba","polisílaba"];

const THEORY=[
 {id:"alfa",icon:"🔤",title:"Orden alfabético",html:`
  <p>Ordenar alfabéticamente es poner las palabras en el mismo orden que las letras del <b>abecedario</b>.</p>
  <div class="ex-ex">a b c d e f g h i j k l m n <b>ñ</b> o p q r s t u v w x y z</div>
  <p>En español el abecedario tiene <b>27 letras</b>: no te olvides de la <b>ñ</b>, que va después de la n.</p>
  <h3>¿Cómo se hace?</h3>
  <ul><li>Miro la <b>primera letra</b> de cada palabra.</li><li>Si dos empiezan igual, miro la <b>segunda</b>. Si también es igual, la <b>tercera</b>… y así.</li></ul>
  <div class="ex-ex">balón → baño → botella<br><small>(bal… va antes que bañ… porque la l va antes que la ñ)</small></div>
  <div class="ex-tip">Truco: las tildes no cuentan para ordenar. “árbol” se ordena como si fuera “arbol”.</div>`},
 {id:"sust",icon:"🧱",title:"Sustantivos y adjetivos",html:`
  <h3>Sustantivo</h3><p>Es la palabra que sirve para <b>nombrar</b> personas, animales, cosas, lugares o sentimientos.</p>
  <div class="ex-ex">niña · gato · mesa · cueva · alegría</div>
  <h3>Adjetivo</h3><p>Es la palabra que dice <b>cómo es</b> algo o alguien. Acompaña al sustantivo.</p>
  <div class="ex-ex">gato <b>bondadoso</b> · mesa <b>grande</b> · niña <b>valiente</b></div>
  <div class="ex-tip">Truco: si puedes ponerle “el” o “la” delante, suele ser sustantivo (el gato). Si responde a “¿cómo es?”, es adjetivo (¿cómo es el gato? → bondadoso).</div>`},
 {id:"prop",icon:"🏷️",title:"Nombres comunes y propios",html:`
  <h3>Comunes</h3><p>Nombran en <b>general</b> a cualquier persona, animal, cosa o lugar. Se escriben en <b>minúscula</b>.</p>
  <div class="ex-ex">niña · ciudad · gato · río</div>
  <h3>Propios</h3><p>Nombran a alguien o algo <b>único</b>, para distinguirlo de los demás. Se escriben siempre con <b>mayúscula</b>.</p>
  <div class="ex-ex">María · Madrid · Max · Tajo</div>
  <div class="ex-tip">Truco: “gato” es cualquier gato. “Max” es UN gato concreto: el tuyo. Por eso Max lleva mayúscula.</div>`},
 {id:"gen",icon:"⚖️",title:"Género y número",html:`
  <h3>Género</h3><ul><li><b>Masculino</b>: le ponemos “el” o “los” → el cerdo, los caballos.</li><li><b>Femenino</b>: le ponemos “la” o “las” → la granja, las literas.</li></ul>
  <h3>Número</h3><ul><li><b>Singular</b>: es solo uno → la cabeza.</li><li><b>Plural</b>: son varios → las cabezas.</li></ul>
  <h3>¿Cómo se forma el plural?</h3>
  <ul><li>Si acaba en vocal, se añade <b>-s</b>: mesa → mesas.</li><li>Si acaba en consonante, se añade <b>-es</b>: árbol → árboles.</li><li>Si acaba en <b>z</b>, la z cambia a <b>c</b>: lápiz → lápi<b>c</b>es, pez → pe<b>c</b>es.</li></ul>
  <div class="ex-tip">Truco: pon delante el, la, los o las. Así sabes a la vez el género y el número.</div>`},
 {id:"punto",icon:"⏺️",title:"Tipos de punto",html:`
  <h3>Punto y seguido</h3><p>Separa oraciones dentro del <b>mismo párrafo</b>. Después se sigue escribiendo en la misma línea.</p>
  <div class="ex-ex">Hoy he comprado pan<b>.</b> Después he ido al parque.</div>
  <h3>Punto y aparte</h3><p>Separa <b>párrafos</b>. Después se empieza a escribir en <b>otra línea</b>.</p>
  <div class="ex-ex">El viernes fui a la piscina<b>.</b><br>&nbsp;&nbsp;&nbsp;&nbsp;El sábado jugamos en casa de mi primo.</div>
  <h3>Punto final</h3><p>Se pone cuando <b>se termina el texto</b>.</p>
  <div class="ex-ex">…y colorín colorado, este cuento se ha acabado<b>.</b></div>
  <div class="ex-tip">Truco: seguido = sigo en la misma línea. Aparte = me voy aparte, a otra línea. Final = se acabó.</div>`},
 {id:"sil",icon:"👏",title:"Las sílabas",html:`
  <p>Una <b>sílaba</b> es cada golpe de voz con el que decimos una palabra.</p>
  <ul><li><b>Monosílaba</b>: 1 sílaba → sol, pan, mar.</li><li><b>Bisílaba</b>: 2 sílabas → que-so, ca-ma.</li>
  <li><b>Trisílaba</b>: 3 sílabas → ji-ra-fa, to-ma-te.</li><li><b>Polisílaba</b>: 4 o más → ma-ri-po-sa, se-má-fo-ro.</li></ul>
  <div class="ex-tip">Truco: da una palmada por cada trozo de la palabra. Cada palmada es una sílaba.</div>`},
 {id:"esd",icon:"💎",title:"Agudas, llanas y esdrújulas",html:`
  <p>En cada palabra hay una sílaba que suena más fuerte: la <b>sílaba tónica</b>. Para saber qué tipo de palabra es, contamos <b>desde el final</b>.</p>
  <ul><li><b>Aguda</b>: suena fuerte la <b>última</b> → ca-<b>MIÓN</b>, re-<b>LOJ</b>.</li>
  <li><b>Llana</b>: suena fuerte la <b>penúltima</b> → <b>ME</b>-sa, <b>ÁR</b>-bol.</li>
  <li><b>Esdrújula</b>: suena fuerte la <b>antepenúltima</b> → <b>MÉ</b>-di-co, <b>PÁ</b>-gi-na.</li></ul>
  <h3>¿Cuándo llevan tilde?</h3>
  <ul><li><b>Esdrújulas</b>: <b>siempre</b>. música, pájaro, océano.</li>
  <li><b>Agudas</b>: cuando acaban en <b>vocal, n o s</b>. café, camión, compás (pero reloj, pared, sin tilde).</li>
  <li><b>Llanas</b>: cuando <b>no</b> acaban en vocal, n ni s. árbol, lápiz, azúcar (pero mesa, zapato, sin tilde).</li></ul>
  <div class="ex-tip">Truco: di la palabra como si llamaras a alguien de lejos (“¡PÁ-gi-naaa!”). La sílaba que se alarga es la tónica.</div>`}
];

const isEsdW=x=>x.s.length-1-x.t;
const SHEETS=[
 {id:"alfa",title:"Orden alfabético",instr:"Ordena alfabéticamente estas palabras.",
  make(){ const w=shuffle(ALPHA).slice(0,5); return {key:w.join(),q:`${w.join(", ")}<br>${ln(320)}`,a:[...w].sort((a,b)=>a.localeCompare(b,"es")).join(" → ")}; }},
 {id:"sust",title:"Sustantivo o adjetivo",instr:"Escribe S si es un sustantivo o A si es un adjetivo.",
  make(){ const [w,t]=rnd(SUST); return {key:w,q:`<b>${w}</b> ${ln(50)}`,a:`${w}: ${t==="S"?"S (sustantivo)":"A (adjetivo)"}`}; }},
 {id:"prop",title:"Comunes y propios",instr:"Escríbela bien (con mayúscula si es nombre propio) y pon C si es común o P si es propio.",
  make(){ const [w,t]=rnd(PROP); return {key:w,q:`<b>${w.toLowerCase()}</b> → ${ln(120)} ( &nbsp;&nbsp; )`,a:`${w} (${t})`}; }},
 {id:"gen",title:"Género y número",instr:"Escribe su género (masculino o femenino) y su número (singular o plural).",
  make(){ const [w,g,n]=rnd(GEN); return {key:w,q:`<b>${w}</b>: ${ln(220)}`,a:`${w}: ${g==="M"?"masculino":"femenino"} y ${n==="S"?"singular":"plural"}`}; }},
 {id:"punto",title:"Tipos de punto",instr:"Escribe qué punto es el marcado con ●: seguido, aparte o final.",
  make(){ const [t,a]=rnd(PUNTO.filter(x=>x[0].includes("{.}"))); const q=t.replace("{.}","<b>.●</b>").replace("\n","<br>&nbsp;&nbsp;&nbsp;&nbsp;");
    return {key:t,q:`${q}<br>${ln(160)}`,a:`Punto y ${a}`.replace("Punto y final","Punto final")}; }},
 {id:"sil",title:"Las sílabas",instr:"Separa en sílabas y escribe si es monosílaba, bisílaba, trisílaba o polisílaba.",
  make(){ const s=rnd(SIL); const w=s.join(""); return {key:w,q:`<b>${w}</b>: ${ln(140)} → ${ln(120)}`,a:`${s.join("-")} → ${SILT[Math.min(s.length,4)-1]}`}; }},
 {id:"esd",title:"Agudas, llanas y esdrújulas",instr:"Separa en sílabas, rodea la sílaba tónica y escribe si es aguda, llana o esdrújula.",
  make(){ const x=rnd(ESD); const w=x.s.join(""); return {key:w,q:`<b>${w}</b>: ${ln(150)} → ${ln(110)}`,a:`${x.s.map((y,i)=>i===x.t?`<b>${y.toUpperCase()}</b>`:y).join("-")} → ${TYPES[Math.min(isEsdW(x),3)]}`}; }}
];

Extras.init({subject:"Lengua",lang:"es-ES",
  theme:{bg:"#EAF4E4",card:"#FFFFFF",ink:"#1E1E1E",line:"#1B1B1B",accent:"#3E7A26",soft:"#EEF3E6",rad:"6px"},
  theory:THEORY, sheets:SHEETS});
renderMenu();
})();
