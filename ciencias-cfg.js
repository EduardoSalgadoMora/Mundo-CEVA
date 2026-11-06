/* Science: teoría, fichas y portada */
(function(){
const bn=CEVA.banner("ciencias");
if(bn){ const h=document.querySelector(".hero"); if(h){ h.innerHTML=`<img src="${bn}" alt="" style="display:block;width:100%">`; h.style.background="none"; } }

const say=w=>`<button class="ex-say" data-say="${w}">🔊 ${w}</button>`;
const pp=n=>`<span class="pic">${svg(n)}</span>`;
const card=(w,n)=>`<div class="w">${pp(n)}${say(w)}</div>`;
const em=e=>`<span class="em">${e}</span>`;
const cardE=(w,e)=>`<div class="w">${em(e)}${say(w)}</div>`;
const ln=(w=130)=>`<span class="ln" style="min-width:${w}px"></span>`;

const THEORY=[
 {id:"plants",icon:"🌳",title:"What are plants? · ¿Qué son las plantas?",html:`
  <p><b>Plants are living things.</b> Las plantas son seres vivos: nacen, crecen y se reproducen. Hay de muchos tipos.</p>
  <div class="ex-words">${card("tree","tree")}${card("bush","bush")}${card("grass","grass")}</div>
  <ul><li><b>tree</b> (árbol): grande, con un tronco grueso y ramas.</li><li><b>bush</b> (arbusto): pequeño, con muchas ramas finas.</li><li><b>grass</b> (hierba): fina y blandita.</li></ul>
  <h3>Parts of a tree · Partes del árbol</h3>
  <p>${say("trunk")} tronco · ${say("branch")} rama · ${say("leaves")} hojas</p>
  <div class="ex-tip">Wow! Trees have got rings inside. Dentro del tronco hay anillos y cada año sale uno nuevo: contándolos sabes la edad del árbol.</div>`},
 {id:"seasons",icon:"🍂",title:"Deciduous and evergreen · Caduca y perenne",html:`
  <p><b>Do all plants lose their leaves in autumn?</b> No.</p>
  <div class="ex-words">${card("evergreen","pine")}${card("deciduous","autumn")}</div>
  <ul><li><b>Evergreen</b> (de hoja perenne): keep their leaves in autumn. Tienen hojas verdes todo el año. Ejemplos: el pino, la palmera.</li>
  <li><b>Deciduous</b> (de hoja caduca): change with the seasons. Sus hojas cambian de color y se caen en otoño.</li></ul>
  <div class="ex-ex">${say("This tree is always green.")} → evergreen<br>${say("The leaves on this tree change colour.")} → deciduous</div>`},
 {id:"parts",icon:"🌻",title:"Parts of a plant and a flower · Partes de la planta y la flor",html:`
  <div class="ex-words">${card("flower","flower")}${card("leaf","leaf")}${card("stem","stem")}${card("roots","roots")}</div>
  <p><b>flower</b> flor · <b>leaf</b> hoja · <b>stem</b> tallo · <b>roots</b> raíces (bajo tierra)</p>
  <h3>Parts of a flower · Partes de la flor</h3>
  <ul><li>${say("petals")} pétalos: the colourful parts of the flower. La parte de colores.</li>
  <li>${say("sepals")} sépalos: protect the flower before it grows. Son verdes y están debajo.</li>
  <li>${say("pistil")} pistilo: long tube, female part of the flower.</li>
  <li>${say("stamen")} estambre: long and thin, male part of the flower.</li></ul>`},
 {id:"repro",icon:"🍎",title:"How do flowering plants reproduce?",html:`
  <p><b>Flowers are the tool that some plants use to reproduce.</b> Las flores sirven para hacer plantas nuevas.</p>
  <p>La flor se convierte en <b>fruit</b> (fruta), y dentro de la fruta están las <b>seeds</b> (semillas). Si plantas una semilla, crece una planta nueva.</p>
  <div class="ex-words">${cardE("flowers","🌻")}${cardE("fruits","🍎")}${card("seeds","seed")}</div>
  <div class="ex-ex">${say("Apple trees have got flowers. The flowers grow into apples.")}</div>
  <div class="ex-tip">Wow! Broccoli is a flower and a vegetable! El brócoli es una flor y una verdura.</div>`},
 {id:"spores",icon:"🌿",title:"Plants without flowers · Plantas sin flores",html:`
  <p><b>Some plants haven’t got flowers or seeds.</b> Se reproducen con <b>spores</b> (esporas).</p>
  <div class="ex-words">${card("fern","fern")}${card("moss","moss")}</div>
  <ul><li><b>fern</b> (helecho): no flowers, large leaves. Las esporas están <b>under the leaf</b> (debajo de la hoja).</li>
  <li><b>moss</b> (musgo): no flowers, no roots, small plant. Tiene tallitos <b>long</b> (largos) con las esporas arriba.</li></ul>
  <p>The spores grow into new ferns: espora → brote enrollado → helecho pequeño → helecho grande.</p>
  <div class="ex-words">${card("1","spore")}${card("2","sprout")}${card("3","young")}${card("4","fern")}</div>
  <div class="ex-tip">Flowering = con flores (tulipanes, cerezo). Non-flowering = sin flores (musgo, helecho).</div>`},
 {id:"places",icon:"🏜️",title:"Where do plants grow? · ¿Dónde crecen?",html:`
  <ul><li><b>Wild plants</b> grow naturally. Crecen solas, en el campo o el bosque.</li>
  <li><b>Cultivated plants</b> grow with the help of humans, for example on farms. Las cultivan las personas.</li></ul>
  <div class="ex-words">${card("wild","meadow")}${card("cultivated","farm")}</div>
  <h3>Plants adapt to the places they grow in</h3>
  <div class="ex-words">${card("dark","dark")}${card("sunlight","sunflower")}${card("wet","lily")}${card("dry","cactus")}</div>
  <p>Some plants grow in <b>dark</b> places (oscuros), others need a lot of <b>sunlight</b> (luz del sol). Some grow in <b>wet</b> places (mojados) and others in <b>dry</b> places (secos).</p>
  <div class="ex-tip">All plants need water. Todas las plantas necesitan agua.</div>`}
];

const PICW=["tree","bush","grass","flower","leaf","stem","roots","seed","fern","moss","cactus"];
const scr=w=>{ let s; do{ s=shuffle(w.split("")).join(""); }while(s===w&&w.length>2); return s; };
const SHEETS=[
 {id:"vocab",title:"Vocabulary",instr:"Look and write. Mira el dibujo y escribe la palabra en inglés.",
  make(){ const w=rnd(PICW); return {key:w,q:`${pp(w)}${ln()}`,a:w}; }},
 {id:"spell",title:"Spelling",instr:"Order the letters. Ordena las letras y escribe la palabra.",
  make(){ const w=rnd([...PICW,"petals","sepals","pistil","stamen","spores","trunk","branch"]); return {key:w,q:`<b style="letter-spacing:3px">${scr(w)}</b> → ${ln()}`,a:w}; }},
 {id:"yesno",title:"Yes or no?",instr:"Read and write yes or no. Lee y escribe yes o no.",
  make(){ const [s,y]=rnd(STATEMENTS); return {key:s,q:`${s} ${ln(70)}`,a:y?"yes":"no"}; }},
 {id:"de",title:"Deciduous or evergreen?",instr:"Write D (deciduous) or E (evergreen). Escribe D o E.",
  make(){ if(Math.random()<.5){ const t=rnd(Object.keys(TREES)); return {key:t,q:`${pp(t)} ${ln(60)}`,a:TREES[t]==="evergreen"?"E":"D"}; }
    const [s,a]=rnd(TREE_SENT); return {key:s,q:`${s} ${ln(60)}`,a:a==="evergreen"?"E":"D"}; }},
 {id:"jobs",title:"Parts of a flower",instr:"Write: petals, sepals, pistil or stamen. Escribe la parte de la flor.",
  make(){ const [s,a]=rnd(JOBS); return {key:a,q:`${s} → ${ln()}`,a}; }},
 {id:"flw",title:"Flowering or non-flowering?",instr:"Write flowering or non-flowering. Escribe si tiene flores o no.",
  make(){ const t=rnd(Object.keys(FLOWERING)); return {key:t,q:`${pp(t)} ${ln(160)}`,a:FLOWERING[t]}; }},
 {id:"env",title:"Where do plants grow?",instr:"Write: dark, sunlight, wet or dry. Completa la frase.",
  make(){ const [p,s,a]=rnd(ENV); return {key:p,q:`${pp(p)} ${s.replace("___",ln(110))}`,a:s.replace("___",a)}; }}
];

Extras.init({subject:"Science",lang:"en-GB",
  theme:{bg:"#F3FBEA",card:"#FFFFFF",ink:"#17324D",line:"#17324D",accent:"#F27A1A",soft:"#E3F4D3",rad:"16px"},
  theory:THEORY, sheets:SHEETS});
renderMenu();
})();
