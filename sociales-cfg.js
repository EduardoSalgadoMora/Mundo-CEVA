/* Sociales (El clima): teoría, fichas y portada */
(function(){
const bn=CEVA.banner("sociales");
if(bn){ const h=document.getElementById("hero"); if(h){ h.innerHTML=`<img src="${bn}" alt="" style="display:block;width:100%">`; } }

const ln=(w=150)=>`<span class="ln" style="min-width:${w}px"></span>`;
const pic=n=>`<span class="pic">${spr(n)}</span>`;
const tbl=(head,rows)=>`<table style="border-collapse:collapse;width:100%;table-layout:fixed;font-size:.82rem;line-height:1.35;margin:8px 0;overflow-wrap:anywhere;hyphens:auto;-webkit-hyphens:auto"><tr>${head.map(h=>`<th style="border:2px solid #1B1B1B;padding:4px;background:#5DBB3F;color:#fff;text-align:left">${h}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td style="border:2px solid #1B1B1B;padding:4px;vertical-align:top">${c}</td>`).join("")}</tr>`).join("")}</table>`;

const THEORY=[
 {id:"atm",icon:"🌍",title:"La atmósfera y sus capas",html:`
  <p>La <b>atmósfera</b> es la capa de <b>aire</b> que rodea la Tierra. Nos protege del Sol y gracias a ella podemos respirar.</p>
  <div style="max-width:300px;margin:10px auto;border:3px solid #1B1B1B">${tower(null,true)}</div>
  <p>Tiene <b>cinco capas</b>. De abajo arriba:</p>
  <ul><li><b>Troposfera</b>: la más cercana a la Tierra. Aquí vivimos y aquí se forman las nubes, la lluvia y el viento.</li>
  <li><b>Estratosfera</b>: aquí está la <b>capa de ozono</b>, que nos protege de los rayos ultravioleta del Sol.</li>
  <li><b>Mesosfera</b>: aquí se queman los <b>meteoritos</b> (las estrellas fugaces). Es la capa más fría.</li>
  <li><b>Termosfera</b>: hace muchísimo calor y se forman las <b>auroras polares</b>.</li>
  <li><b>Exosfera</b>: la última capa. Después empieza el espacio.</li></ul>
  <div class="ex-tip">Truco para el orden: TROPO, ESTRATO, MESO, TERMO, EXO. Y ojo: la biosfera NO es una capa de la atmósfera.</div>`},
 {id:"tiempo",icon:"🌦️",title:"Tiempo atmosférico y clima",html:`
  <h3>Tiempo atmosférico</h3><p>Es el estado de la atmósfera en un <b>momento</b> y un <b>lugar concretos</b>. Cambia de un día a otro.</p>
  <div class="ex-ex">“Hoy en Illescas hace sol.” · “Mañana lloverá en Toledo.”</div>
  <h3>Clima</h3><p>Es el tiempo que suele hacer en un lugar durante un <b>periodo largo</b>, de muchos años.</p>
  <div class="ex-ex">“En Galicia llueve mucho todo el año.” · “En Canarias hace calor casi siempre.”</div>
  <ul><li>La <b>meteorología</b> es la ciencia que estudia el <b>tiempo</b>.</li><li>La <b>climatología</b> es la ciencia que estudia el <b>clima</b>.</li></ul>
  <div class="ex-tip">Truco: hoy, mañana, ahora, esta tarde → tiempo. Siempre, normalmente, todo el año → clima.</div>`},
 {id:"elem",icon:"🌡️",title:"Elementos del tiempo",html:`
  <p>Para saber qué tiempo hace nos fijamos en cinco <b>elementos</b>:</p>
  <ul><li><b>Temperatura</b>: lo caliente o lo frío que está el aire.</li>
  <li><b>Precipitaciones</b>: el agua que cae de las nubes, como lluvia, nieve o granizo.</li>
  <li><b>Humedad</b>: la cantidad de vapor de agua que hay en el aire.</li>
  <li><b>Presión atmosférica</b>: el peso del aire sobre la superficie de la Tierra.</li>
  <li><b>Viento</b>: el aire en movimiento.</li></ul>`},
 {id:"instr",icon:"📡",title:"La estación meteorológica",html:`
  <p>En una <b>estación meteorológica</b> hay instrumentos que miden los elementos del tiempo:</p>
  ${tbl(["Instrumento","¿Qué mide?"],[
    [`${pic("thermo")} Termómetro`,"La temperatura"],[`${pic("pluvio")} Pluviómetro`,"La cantidad de agua que cae (lluvia, nieve o granizo)"],
    [`${pic("anemo")} Anemómetro`,"La velocidad del viento"],[`${pic("veleta")} Veleta`,"La dirección del viento"],
    [`${pic("baro")} Barómetro`,"La presión atmosférica"],[`${pic("higro")} Higrómetro`,"La humedad del aire"]])}
  <div class="ex-tip">No los confundas: la veleta dice HACIA DÓNDE sopla el viento y el anemómetro dice LO RÁPIDO que sopla.</div>`},
 {id:"fact",icon:"⛰️",title:"Factores que influyen en el clima",html:`
  <ul><li><b>La distancia al mar</b>: en las zonas cercanas al mar hace menos calor en verano y menos frío en invierno, y también llueve más.</li>
  <li><b>El relieve</b>: las montañas detienen las nubes y no las dejan pasar hacia las tierras del interior.</li>
  <li><b>La altitud</b>: en las zonas más elevadas, como las montañas, hace más frío y llueve más.</li>
  <li><b>La latitud</b>: en las zonas más cercanas a los polos las temperaturas son más bajas. Cerca del Ecuador hace más calor.</li></ul>
  <div class="ex-tip">Altitud = lo alto que está un lugar. Latitud = lo lejos que está del Ecuador.</div>`},
 {id:"climas",icon:"🗺️",title:"Los climas de España",html:`
  ${tbl(["Clima","Temperaturas","Precipitaciones","¿Dónde?"],Object.entries(CLIMAS).map(([n,c])=>[`<b>${cap(n)}</b>`,cap(c.temp),cap(c.prec),cap(c.donde)]))}
  <h3>Paisajes</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">${Object.entries(BIOMES).map(([n,s])=>`<div style="border:3px solid #1B1B1B;background:#fff">${s}<div style="padding:4px 6px;font-weight:900">${cap(n)}</div></div>`).join("")}</div>
  <div class="ex-tip">Illescas está en el interior de la península: tiene clima continental.</div>`}
];

const SHEETS=[
 {id:"capas",title:"Capas de la atmósfera",instr:"Escribe el nombre de la capa de la atmósfera.",
  make(){ const [s,a]=rnd(LFACT); return {key:s,q:`${s} → ${ln()}`,a}; }},
 {id:"orden",title:"Ordena las capas",instr:"Ordena las capas de la atmósfera de abajo arriba (escribe 1, 2, 3, 4 y 5).",
  make(){ const l=shuffle(LAYERS); return {key:l.join(),q:l.map(x=>`${x} ${ln(40)}`).join(" · "),a:l.map(x=>`${x} ${LAYERS.indexOf(x)+1}`).join(" · ")}; }},
 {id:"tc",title:"¿Tiempo o clima?",instr:"Escribe T si habla del tiempo atmosférico o C si habla del clima.",
  make(){ const t=Math.random()<.5, s=rnd(t?TIEMPO:CLIMA_S); return {key:s,q:`${s} ${ln(50)}`,a:t?"T":"C"}; }},
 {id:"elem",title:"Elementos del tiempo",instr:"Escribe el elemento del tiempo: temperatura, precipitaciones, humedad, presión atmosférica o viento.",
  make(){ const e=rnd(EN); return {key:e,q:`${ELEM[e][0]} → ${ln()}`,a:e}; }},
 {id:"instr",title:"Instrumentos",instr:"Escribe qué mide cada instrumento.",
  make(){ const i=rnd(IN); return {key:i,q:`${pic(INSTR[i][1])} ${cap(i)}: ${ln(220)}`,a:`${cap(i)}: ${INSTR[i][0]}`}; }},
 {id:"fact",title:"Factores del clima",instr:"Escribe qué factor lo explica: la distancia al mar, el relieve, la altitud o la latitud.",
  make(){ const [s,a]=rnd(FCASE); return {key:s,q:`${s}<br>${ln(200)}`,a}; }},
 {id:"climas",title:"Climas de España",instr:"Escribe el nombre del clima.",
  make(){ const c=rnd(CN); return Math.random()<.5?{key:"d"+c,q:`${CLIMAS[c].desc} → ${ln()}`,a:c}:{key:"w"+c,q:`Está en ${CLIMAS[c].donde} → ${ln()}`,a:c}; }},
 {id:"lugar",title:"¿Qué clima tiene?",instr:"Escribe qué clima tiene cada lugar.",
  make(){ const c=rnd(CN), l=rnd(CLIMAS[c].lugares); return {key:l,q:`${cap(l)} → ${ln()}`,a:c}; }}
];

Extras.init({subject:"Sociales",lang:"es-ES",
  theme:{bg:"#DDF1FF",card:"#F4EBD9",ink:"#1E1E1E",line:"#1B1B1B",accent:"#3E8E2B",soft:"#E6D8BC",rad:"0px"},
  theory:THEORY, sheets:SHEETS});
renderMenu();
})();
