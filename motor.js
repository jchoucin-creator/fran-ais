/* ======================================================================
   MOTOR DEL CAHIER — activitats comunes a tots els temes.
   Per afegir o corregir continguts no cal tocar aquest fitxer:
   cada tema és a la carpeta temes/.
   ====================================================================== */
const TEMES=[],BLOCS=[];
window.CAHIER={tema:t=>{TEMES.push(t)},blocs:b=>{BLOCS.push(...b)}};
const SPK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>';
const $=s=>document.querySelector(s);
const rnd=n=>Math.floor(Math.random()*n);
const any=a=>a[rnd(a.length)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const uniq=a=>[...new Set(a)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[’']/g,"'").replace(/[?!.,;:—]/g,"").replace(/-/g," ").replace(/\s+/g," ").trim();
const snorm=s=>norm(s).replace(/^(les|le|la|l'|une|un|des) ?/,"").trim();
const spoken=fr=>fr.split(" / ")[0];
const clean=s=>s.replace(/\s*\([^)]*\)/g,"").replace(/\s+([.?!])/g," $1").replace(/ \./g,".").trim();
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function fill(s,a){return s.replace(/(['’])\s?___/,"$1"+a).replace(/___\s?/,m=>a.endsWith("'")?a:a+(m.endsWith(" ")?" ":""))}
function lev(a,b){const m=a.length,n=b.length;if(!m||!n)return Math.max(m,n);let p=[...Array(n+1).keys()];
  for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
const VOC=/^[AEIOUÉÈÊÎaeiouéèêî]/;
const rich=html=>html.replace(/«([^»]+)»/g,(m,t)=>`<span class="ex" data-say="${esc(t.replace(/<[^>]+>/g,""))}" role="button" tabindex="0">${t}</span>`);

/* ---------- numbers 0 – 1 000 000 ---------- */
const U=["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"];
const TENS={2:"vingt",3:"trente",4:"quarante",5:"cinquante",6:"soixante"};
function b100(n,fin){if(n<17)return U[n];if(n<20)return "dix-"+U[n-10];const t=Math.floor(n/10),r=n%10;
  if(t<7)return TENS[t]+(r===0?"":r===1?" et un":"-"+U[r]);
  if(t===7)return "soixante"+(r===1?" et onze":"-"+b100(10+r));
  if(t===8)return r===0?(fin?"quatre-vingts":"quatre-vingt"):"quatre-vingt-"+U[r];
  return "quatre-vingt-"+b100(10+r)}
function b1000(n,fin){const h=Math.floor(n/100),r=n%100;if(!h)return b100(r,fin);
  const hs=h===1?"cent":U[h]+" cent";if(!r)return h>1&&fin?hs+"s":hs;return hs+" "+b100(r,fin)}
function frNum(n){if(n===0)return "zéro";if(n===1e6)return "un million";const th=Math.floor(n/1000),r=n%1000;
  const ts=!th?"":th===1?"mille":b1000(th,false)+" mille";return [ts,r?b1000(r,true):""].filter(Boolean).join(" ")}
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ");
const numItem=n=>({fr:frNum(n),ca:fmt(n),n});
function randNum(){const k=rnd(4);return k===0?rnd(101):k===1?100+rnd(900):k===2?1000+rnd(99000):rnd(4)?1000*(1+rnd(999)):(rnd(10)?100000+rnd(900000):1000000)}
function nearNums(n,count){const set=new Set([n]),mag=n<20?3:n<100?10:n<1000?100:n<100000?1000:100000;let g=0;
  while(set.size<count+1&&g++<200){const c=n+(rnd(2)?1:-1)*(1+rnd(4))*(rnd(3)?mag:Math.max(1,mag/10));if(c>=0&&c<=1e6)set.add(c)}
  while(set.size<count+1)set.add(rnd(1001));set.delete(n);return [...set].slice(0,count)}

/* ---------- builders: turn compact content into items / sentences ---------- */
const normItem=x=>Array.isArray(x)?{fr:x[0],ca:x[1],g:x[2]||undefined,r:x[3]}:x;
const normFrase=x=>{if(!Array.isArray(x))return x;const [s,a,o,ca,why]=x;return {s,a,o,ca,why}};
function caA(ca){return ca.startsWith("el ")?"al "+ca.slice(3):ca.startsWith("els ")?"als "+ca.slice(4):"a "+ca}
function caDe(ca){return ca.startsWith("el ")?"del "+ca.slice(3):ca.startsWith("els ")?"dels "+ca.slice(4):/^(la |les |l')/.test(ca)?"de "+ca:/^[AEIOUÀÈÉÍÒÓÚaeiou]/.test(ca)?"d'"+ca:"de "+ca}
function paysItem([base,g,ca,a,de]){if(g==="n")return {fr:base,base,g,ca,a,de};const art=g==="p"?"les":VOC.test(base)?"l'":g==="f"?"la":"le";
  return {fr:(art==="l'"?"l'":art+" ")+base,base,art,g,ca}}
function prepA(p){if(p.g==="n")return p.a;return p.g==="p"?"aux":(p.g==="f"||VOC.test(p.base))?"en":"au"}
function prepDe(p){if(p.g==="n")return p.de;return p.g==="p"?"des":VOC.test(p.base)?"d'":p.g==="f"?"de":"du"}
function whyA(p){if(p.g==="n")return `país sense article → ${p.a}`;return p.g==="p"?"país plural → aux (à + les)":p.g==="f"?"país femení → en":VOC.test(p.base)?"país masculí que comença per vocal → en":"país masculí → au (à + le)"}
function whyDe(p){if(p.g==="n")return `país sense article → ${p.de}`;return p.g==="p"?"país plural → des (de + les)":p.g==="m"&&!VOC.test(p.base)?"país masculí → du (de + le)":VOC.test(p.base)?"comença per vocal → d'":"país femení → de"}
const PRON=["je","tu","il","nous","vous","ils"],PRONF=["je","tu","elle","nous","vous","elles"];
const CAPR=["(jo)","(tu)","(ell)","(nosaltres)","(vosaltres)","(ells)"],CAPRF=["(jo)","(tu)","(ella)","(nosaltres)","(vosaltres)","(elles)"];
function conj(pron,form){return pron==="je"&&/^[aeiouéèêh]/.test(form)?"j'"+form:pron+" "+form}

const BUILD={
  nombres(t){t.items=t.llista.map(numItem);t.genItem=()=>numItem(randNum());t.distract=it=>nearNums(it.n,3).map(numItem)},
  pays(t){t.items=t.paisos.map(paysItem);
    t.acts=["regla","vocab","cartes","article","quiz","escolta","parelles","escriu","parla"]},
  villes(t){const P=TEMES.find(x=>x.id==="pays").paisos.map(paysItem);
    const V=t.villesLlista.map(v=>Array.isArray(v)?{nom:v[0],ca:v[1],base:v[0],a:"à",de:VOC.test(v[0])?"d'":"de"}:v);
    const IN=[["J'habite ___ X.","Visc Y."],["Je vais ___ X.","Vaig Y."],["Nous allons ___ X.","Anem Y."],["Elle travaille ___ X.","Treballa Y."],["Tu es ___ X ?","Ets Y?"]];
    const DE=[["Je viens ___ X.","Vinc Y."],["Il est ___ X.","És Y."],["Ils arrivent ___ X.","Arriben Y."],["Elle rentre ___ X.","Torna Y."]];
    t.genFrase=()=>{const from=rnd(3)===0,tpl=any(from?DE:IN);
      if(rnd(3)===0){const v=any(V);const a=from?v.de:v.a;
        return {s:tpl[0].replace("X",v.base),a,o:from?["de","d'","du","des"]:["à","en","au","aux"],ca:tpl[1].replace("Y",from?caDe(v.ca):caA(v.ca)),
          why:v.base!==v.nom?`${v.nom}: ciutat amb article → ${a}`:from?(a==="d'"?"ciutat que comença per vocal → d'":"ciutat → de"):"ciutat → à"}}
      const p=any(P);const a=from?prepDe(p):prepA(p);
      return {s:tpl[0].replace("X",p.base),a,o:from?["de","d'","du","des"]:["à","en","au","aux"],ca:tpl[1].replace("Y",from?caDe(p.ca):caA(p.ca)),
        why:`${p.fr} · `+(from?whyDe(p):whyA(p))}};
    t.acts=["regla","buits","escriuB","cartes","ordena","parla"]},
  nationalites(t){t.items=t.nacio.map(([m,f,ca])=>({fr:m===f?m:m+" / "+f,ca}));
    const NM=["Paul","Marc","Jordi","Hugo"],NF=["Marie","Léa","Laia","Emma"];
    const pl=w=>/[sx]$/.test(w)?w:w+"s";
    t.genFrase=()=>{const n=any(t.nacio.filter(x=>x[0]!==x[1]));const [m,f,ca,pays]=n;const cs=ca.split(" / ");const k=rnd(4);
      if(k===3){const fem=rnd(2);const a=fem?pl(f):pl(m);
        return {s:`${fem?"Elles":"Ils"} sont ___. (${pays})`,a,o:uniq([pl(m),pl(f),m,f]),ca:`${fem?"Elles":"Ells"} són de ${pays}.`,why:`plural ${fem?"femení":"masculí"} → ${a}`}}
      const fem=k%2===1,nom=any(fem?NF:NM),a=fem?f:m;
      return {s:`${nom} est ___. (${pays})`,a,o:[m,f],ca:`${nom} és ${fem?cs[1]:cs[0]}.`,why:fem?`${nom} és una noia → femení: ${f}`:`${nom} és un noi → masculí: ${m}`}};
    t.acts=["vocab","cartes","buits","quiz","escolta","parelles","escriu","parla"]},
  articles(t){const O=TEMES.find(x=>x.id==="objets").items.map(normItem),M=TEMES.find(x=>x.id==="maison").items.map(normItem);
    t.genFrase=()=>{const k=rnd(4);
      if(k===0){const it=any(O);const m=it.fr.match(/^(le|la|l'|les) ?(.*)$/);const art=m[1],noun=m[2];
        return {s:`${art==="les"?"Où sont":"Où est"} ___ ${noun} ?`,a:art,o:["le","la","l'","les"],ca:`On ${art==="les"?"són":"és"} ${it.ca}?`,why:`${noun}: `+(art==="les"?"plural → les":art==="l'"?"comença per vocal → l'":art==="le"?"masculí → le":"femení → la")}}
      if(k===1){const it=any(M);const m=it.fr.match(/^(une?) (.*)$/);
        return {s:`C'est ___ ${m[2]}.`,a:m[1],o:["un","une"],ca:`És ${it.ca}.`,why:`${m[2]} és ${m[1]==="un"?"masculí → un":"femení → une"}`}}
      return null};
    t.parlaFrases=true},
  verbes(t){const V=t.verbs;
    t.items=[];V.forEach(v=>v.f.forEach((f,i)=>t.items.push({fr:conj(PRON[i],f),ca:CAPR[i]+" "+v.c[i],grp:v.inf})));
    t.frases=t.frases.map(x=>{if(!Array.isArray(x))return x;const [s,a,inf,ca,why]=x;const v=V.find(y=>y.inf===inf);
      return {s,a,o:[a,...shuffle(uniq(v.f).filter(y=>y!==a)).slice(0,3)],ca,why:why||`${inf}: ${a}`}});
    t.genFrase=()=>{if(rnd(2))return null;const v=any(V),i=rnd(6),fem=rnd(2)&&(i===2||i===5);const pron=(fem?PRONF:PRON)[i],a=v.f[i];
      const full=conj(pron,a);const s=full.startsWith("j'")?`j'___ (${v.inf})`:`${pron} ___ (${v.inf})`;
      return {s,a,o:[a,...shuffle(uniq(v.f).filter(y=>y!==a)).slice(0,3)],ca:(fem?CAPRF:CAPR)[i]+" "+v.c[i],why:`${v.inf} → ${full}`}};
    t.parells=()=>{const v=any(V);return {titol:`Uneix cada pronom amb la forma de «${v.inf}»`,pairs:v.f.map((f,i)=>[conj(PRON[i],f).startsWith("j'")?"j'":PRON[i],f])}};
    t.regla+=V.map((v,k)=>`<details class="verb"${k<2?" open":""}><summary>${v.inf} <span>· ${v.ca}</span></summary><table>${
      v.f.map((f,i)=>`<tr><td>«${conj(["je","tu","il / elle","nous","vous","ils / elles"][i],f).replace("il / elle","il / elle")}»</td><td style="color:var(--ink-soft)">${["jo","tu","ell / ella","nosaltres","vosaltres","ells / elles"][i]} ${v.c[i]}</td></tr>`).join("")
    }</table></details>`).join("");
    t.parlaFrases=true;
    t.acts=["regla","buits","escriuB","parelles","escolta","cartes","ordena","parla"]}
};
const ACTS={regla:"La regla",vocab:"Vocabulari",cartes:"Targetes",quiz:"Tria",escolta:"Escolta",parelles:"Parelles",escriu:"Escriu",
  genre:"Masculí o femení?",article:"Quin article?",ordre:"Ordena",calcul:"Càlcul",buits:"Completa",escriuB:"Escriu la paraula",ordena:"Ordena la frase",parla:"Parla 🎤"};
function actsOf(t){if(t.acts)return t.acts;const a=[];if(t.regla)a.push("regla");
  if(t.tipus==="nombres")return ["vocab","cartes","escolta","quiz","calcul","escriu","parla"];
  const hasF=!!(t.frases||t.genFrase);
  if(t.items){a.push("vocab","cartes");if(t.items.some(x=>x.g&&/^(le|la|un|une) /.test(x.fr)))a.push("genre");if(t.ordenat)a.push("ordre")}
  if(hasF){a.push("buits","escriuB");if(!t.items)a.push("cartes")}
  if(t.parells)a.push("parelles");
  if(t.items){a.push("quiz","escolta");if(!t.parells)a.push("parelles");a.push("escriu")}
  if(hasF||t.ordena)a.push("ordena");
  a.push("parla");return a}

/* ---------- state & progress (kept only in this browser) ---------- */
let T=null,act=null,room="tot",score={ok:0,total:0};
const KEY="cahier-progres-v1";let PROG={};
try{PROG=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){PROG={}}
function saveProg(){try{localStorage.setItem(KEY,JSON.stringify(PROG))}catch(e){}}
const stage=()=>$("#stage");
const items=()=>T.estances&&room!=="tot"?T.items.filter(x=>x.r===room):T.items;
function pickItem(){if(T.genItem&&rnd(2))return T.genItem();return any(items())}
function distract(it,n=3){if(T.distract)return T.distract(it);
  const pool=items().filter(x=>x.fr!==it.fr&&x.ca!==it.ca);const same=it.grp?shuffle(pool.filter(x=>x.grp===it.grp)):[];
  return uniq([...same,...shuffle(pool)]).slice(0,n)}
function pickFrase(){let f=null;if(T.genFrase&&(!T.frases||Math.random()<(T.generat??.5)))f=T.genFrase();if(!f&&T.frases)f=any(T.frases);if(!f&&T.genFrase){let g=0;while(!f&&g++<20)f=T.genFrase()}
  f={...f};f.fr=clean(fill(f.s,f.a));f.o=shuffle(uniq(f.o.includes(f.a)?f.o:[f.a,...f.o]));return f}
function frDeck(n=15){const out=[],seen=new Set();let g=0;while(out.length<n&&g++<200){const f=pickFrase();if(!seen.has(f.fr)){seen.add(f.fr);out.push(f)}}return out}

/* ---------- speech synthesis ---------- */
let frVoice=null,ttsBusy=false;
function pickVoice(){try{const v=speechSynthesis.getVoices();frVoice=v.find(x=>/^fr(-|_)FR/i.test(x.lang))||v.find(x=>/^fr/i.test(x.lang))||null}catch(e){}}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
function say(text,rate=.85){
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="fr-FR";u.rate=rate;if(frVoice)u.voice=frVoice;
    ttsBusy=true;u.onend=u.onerror=()=>setTimeout(()=>{ttsBusy=false},300);speechSynthesis.speak(u)}
  catch(e){setFeedback("El navegador no pot reproduir l'àudio.","ko")}}
const speakBtn=(text,cls="")=>`<button class="speak ${cls}" data-say="${esc(text)}" aria-label="Escolta: ${esc(text)}">${SPK}<span>Écoute</span></button>`;
document.addEventListener("click",e=>{const b=e.target.closest("[data-say]");if(b)say(b.dataset.say)});
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("ex")){e.preventDefault();say(e.target.dataset.say)}});

/* ---------- speech recognition: one microphone session per activity ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let srBlocked=false,parlaMode="llegeix",micOn=false,recG=null,onHeard=null,nextTimer=null;
function paintMic(){const m=$("#mic");if(m){m.textContent=micOn?"● Micròfon obert · toca per tancar":"🎤 Obre el micròfon";m.style.background=micOn?"var(--ko)":""}}
function startMic(){if(!SR||micOn)return;micOn=true;
  recG=new SR();recG.lang="fr-FR";recG.continuous=true;recG.interimResults=false;recG.maxAlternatives=5;
  recG.onresult=e=>{if(ttsBusy)return;const r=e.results[e.results.length-1];if(!r.isFinal)return;
    const alts=[...r].map(a=>a.transcript.trim()).filter(Boolean);if(alts.length&&onHeard&&act==="parla")onHeard(alts)};
  recG.onerror=e=>{if(["not-allowed","service-not-allowed","audio-capture"].includes(e.error)){srBlocked=true;stopMic();if(act==="parla")RUN.parla()}};
  recG.onend=()=>{if(micOn)setTimeout(()=>{try{micOn&&recG&&recG.start()}catch(e){}},200)};
  try{recG.start()}catch(e){micOn=false}
  paintMic();setFeedback("Micròfon obert. Digues-ho quan vulguis.","")}
function stopMic(){micOn=false;try{recG&&recG.stop()}catch(e){}recG=null;paintMic()}

/* ---------- shared UI bits ---------- */
function setFeedback(msg,kind){const f=$("#fb");if(f){f.textContent=msg;f.className="feedback "+(kind||"")}}
const scoreBar=(extra)=>`<div class="score"><span>${extra||ACTS[act]}</span><span>Encerts: <b id="sc-ok">${score.ok}</b> / <span id="sc-t">${score.total}</span></span></div>`;
function mark(ok){score.total++;if(ok)score.ok++;const a=$("#sc-ok"),b=$("#sc-t");if(a){a.textContent=score.ok;b.textContent=score.total}
  const p=PROG[T.id]||(PROG[T.id]={ok:0,total:0});p.total++;if(ok)p.ok++;p.last=Date.now();PROG._last=T.id;saveProg()}
const nextBtn=()=>`<div class="row" style="margin-top:14px"><button class="btn" id="next">Següent →</button></div>`;
function wireNext(fn){const n=$("#next");if(n)n.onclick=fn}
const gTag=g=>g?`<span class="tag ${g}">${g==="m"?"masc.":g==="f"?"fem.":g==="n"?"sense article":"plural"}</span>`:"";
const caLabel=it=>esc(it.ca)+(it.g?" "+gTag(it.g):"");
const sentHTML=f=>esc(f.s).replace(/\s*\(([^)]*)\)/," <span style=\"color:var(--ink-soft);font-weight:400\">($1)</span>").replace("___",'<span class="gap" id="gap">&nbsp;?&nbsp;</span>');
const accentsHTML=`<div class="accents">${"é è ê à â ç ô û ù î ï ë œ '".split(" ").map(c=>`<button type="button" data-c="${c}">${c}</button>`).join("")}</div>`;
function wireAccents(inp){stage().querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{const p=inp.selectionStart??inp.value.length;inp.value=inp.value.slice(0,p)+b.dataset.c+inp.value.slice(p);inp.focus();inp.setSelectionRange(p+1,p+1)})}
function answerOpts(onDone){stage().querySelectorAll(".opts .opt, .gender .opt").forEach(b=>b.onclick=()=>{
  const ok=b.dataset.ok==="true";stage().querySelectorAll(".opts .opt, .gender .opt").forEach(x=>{x.disabled=true;if(x.dataset.ok==="true")x.classList.add("ok")});
  if(!ok)b.classList.add("ko");mark(ok);onDone(ok)})}
function toks(fr){const out=[];fr.split(" ").forEach(w=>{if(/^[?!:;—]+$/.test(w)&&out.length)out[out.length-1]+=" "+w;else out.push(w)});return out}

/* ---------- activities ---------- */
const RUN={
  regla(){stage().innerHTML=`<div class="regla">${T.regla}</div><p class="cahint" style="margin-top:14px">Toca les paraules en francès per escoltar-les.</p>`},
  vocab(){
    const L=items();stage().innerHTML=`<p class="label">Llista · toca 🔊 per escoltar</p><div class="tablewrap"><table class="vocab"><tbody>${
      L.map((it,i)=>(T.estances&&it.r!==(L[i-1]||{}).r?`<tr><td colspan="3" class="label" style="padding-top:14px;font-weight:700;color:var(--violet)">${T.estances[it.r]}</td></tr>`:"")+
        `<tr><td>${esc(it.fr)}${it.abbr?` <span style="color:var(--ink-soft);font-weight:400">(${it.abbr})</span>`:""}</td><td>${caLabel(it)}</td><td style="text-align:right"><button data-say="${esc(spoken(it.fr))}" aria-label="Escolta ${esc(it.fr)}">${SPK}</button></td></tr>`).join("")
    }</tbody></table></div>`},
  cartes(){
    const deck=T.items?shuffle(items()):frDeck();let i=0,flipped=false;
    const draw=()=>{const it=deck[i];
      stage().innerHTML=`<div class="score"><span>Targeta ${i+1} / ${deck.length}</span><span>Toca per girar-la</span></div>
      <div class="flash"><div class="flash-inner" id="card" tabindex="0" role="button" aria-label="Gira la targeta">
        ${flipped?`<div class="ca">${caLabel(it)}</div><div class="fr" style="font-size:1.7rem">${esc(it.fr)}</div>`:`<div class="fr" style="${it.fr.length>22?"font-size:1.9rem":""}">${esc(it.fr)}</div><div class="hint">Què vol dir?</div>`}
      </div></div>
      <div class="row">${speakBtn(spoken(it.fr))}<button class="btn ghost" id="prev">←</button><button class="btn" id="nx">Següent →</button></div>`;
      const flip=()=>{flipped=!flipped;draw()};
      $("#card").onclick=flip;$("#card").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}};
      $("#nx").onclick=()=>{i=(i+1)%deck.length;flipped=false;draw()};
      $("#prev").onclick=()=>{i=(i-1+deck.length)%deck.length;flipped=false;draw()}};draw()},
  quiz(){
    const it=pickItem(),dir=rnd(2),opts=shuffle([it,...distract(it)]);
    stage().innerHTML=scoreBar()+`<p class="label">${dir?"Com es diu en francès?":"Què vol dir?"}</p>
      <p class="prompt ${dir||it.fr.length>20?"small":""}">${dir?esc(it.ca):esc(it.fr)}</p>
      ${dir?"":`<div class="row">${speakBtn(spoken(it.fr))}</div>`}
      <div class="opts many">${opts.map(o=>`<button class="opt" data-ok="${o===it}">${esc(dir?o.fr:o.ca)}</button>`).join("")}</div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    answerOpts(ok=>{setFeedback((ok?"✔ Très bien ! ":"✘ Oh non… ")+`${it.fr} = ${it.ca}`,ok?"ok":"ko");say(spoken(it.fr))});wireNext(RUN.quiz)},
  escolta(){
    const it=pickItem(),opts=shuffle([it,...distract(it)]),show=o=>T.tipus==="nombres"?o.ca:o.fr;
    stage().innerHTML=scoreBar()+`<p class="label">Escolta i tria el que has sentit</p>
      <div class="row" style="margin:14px 0 18px">${speakBtn(spoken(it.fr),"big-speak")}<button class="speak" id="slow" aria-label="Escolta a poc a poc">🐢 Lent</button></div>
      <div class="opts many">${opts.map(o=>`<button class="opt" data-ok="${o===it}" style="${T.tipus==="nombres"?"font-size:1.5rem;font-weight:700":""}">${esc(show(o))}</button>`).join("")}</div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    $("#slow").onclick=()=>say(spoken(it.fr),.55);
    answerOpts(ok=>{setFeedback((ok?"✔ Très bien ! ":"✘ Era: ")+`${it.fr} — ${it.ca}`,ok?"ok":"ko");say(spoken(it.fr))});wireNext(RUN.escolta)},
  escriu(){
    const it=pickItem(),target=it.fr.split(" / ");
    stage().innerHTML=scoreBar()+`<p class="label">Escriu-ho en francès</p>
      <p class="prompt small">${T.tipus==="nombres"?`<span style="font-family:var(--f-display);font-size:3.2rem">${esc(it.ca)}</span>`:caLabel(it)}</p>
      <form id="wf" class="row" style="flex-direction:column"><label for="ans" class="label" style="margin:0">La teva resposta</label>
        <input id="ans" class="answer" autocomplete="off" autocapitalize="off" spellcheck="false">${accentsHTML}
        <div class="row" style="margin-top:10px"><button class="btn" type="submit">Comprova</button><button class="btn ghost" type="button" id="hint">Pista</button></div></form>
      <p class="feedback" id="fb"></p>`+nextBtn();
    const inp=$("#ans");wireAccents(inp);
    $("#hint").onclick=()=>setFeedback("Comença per: «"+target[0].slice(0,Math.ceil(target[0].length/3))+"…»","");
    let done=false;
    $("#wf").onsubmit=e=>{e.preventDefault();if(done)return;const v=inp.value.trim();if(!v)return;done=true;
      const exact=target.some(t=>t.toLowerCase()===v.toLowerCase().replace(/’/g,"'"));
      const close=!exact&&target.some(t=>norm(t)===norm(v));const noArt=!exact&&!close&&target.some(t=>snorm(t)===snorm(v));
      mark(exact||close);say(spoken(it.fr));
      if(exact)setFeedback("✔ Très bien ! "+it.fr,"ok");
      else if(close)setFeedback("✔ Gairebé! Revisa els accents: "+it.fr,"ok");
      else if(noArt)setFeedback("✘ Falta o sobra l'article: "+it.fr,"ko");
      else setFeedback("✘ La resposta és: "+it.fr,"ko")};
    wireNext(RUN.escriu)},
  parelles(){
    let titol="Uneix cada parella",pairs;
    if(T.parells){const p=typeof T.parells==="function"?T.parells():{pairs:shuffle(T.parells).slice(0,5)};pairs=p.pairs;if(p.titol)titol=p.titol}
    else pairs=shuffle(items()).slice(0,6).map(x=>[x.fr,x.ca]);
    const left=shuffle(pairs),right=shuffle(pairs);let sel=null,found=0,tries=0;
    stage().innerHTML=`<div class="score"><span>${esc(titol)}</span><span id="pc">0 / ${pairs.length}</span></div>
      <div class="match"><div class="col">${left.map(p=>`<button class="opt" data-side="l" data-k="${esc(p[1])}" data-fr="${esc(p[0])}">${esc(p[0])}</button>`).join("")}</div>
      <div class="col">${right.map(p=>`<button class="opt" data-side="r" data-k="${esc(p[1])}">${esc(p[1])}</button>`).join("")}</div></div>
      <p class="feedback" id="fb"></p><div class="row" style="margin-top:8px"><button class="btn" id="next">Nova ronda</button></div>`;
    stage().querySelector(".match").onclick=e=>{const b=e.target.closest(".opt");if(!b||b.classList.contains("done"))return;
      if(b.dataset.side==="l")say(spoken(b.dataset.fr));
      if(!sel||sel.dataset.side===b.dataset.side){if(sel)sel.classList.remove("sel");sel=b;b.classList.add("sel");return}
      tries++;
      if(sel.dataset.k===b.dataset.k){[sel,b].forEach(x=>{x.classList.remove("sel");x.classList.add("done");x.disabled=true});found++;$("#pc").textContent=found+" / "+pairs.length;
        if(found===pairs.length){mark(tries<=pairs.length+1);setFeedback(`Bravo ! Fet en ${tries} intents.`,"ok")}else setFeedback("✔","ok")}
      else{const a=sel;[a,b].forEach(x=>x.classList.add("ko"));setTimeout(()=>[a,b].forEach(x=>x.classList.remove("ko","sel")),600);setFeedback("Torna-ho a provar","ko")}
      sel=null};
    wireNext(RUN.parelles)},
  genre(){
    const pool=items().filter(x=>/^(le|la|un|une) /.test(x.fr)),it=any(pool),noun=it.fr.replace(/^(le|la|une|un) /,""),indef=/^une? /.test(it.fr);
    stage().innerHTML=scoreBar()+`<p class="label">Masculí o femení?</p>
      <p class="prompt">… ${esc(noun)}</p><p class="cahint">${esc(it.ca)}</p>
      <div class="gender"><button class="opt" data-g="m" data-ok="${it.g==="m"}">${indef?"un":"le"}</button><button class="opt" data-g="f" data-ok="${it.g==="f"}">${indef?"une":"la"}</button></div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    answerOpts(ok=>{setFeedback((ok?"✔ Très bien ! ":"✘ Oh non… ")+it.fr,ok?"ok":"ko");say(it.fr)});wireNext(RUN.genre)},
  article(){
    const it=any(items().filter(x=>x.art));
    stage().innerHTML=scoreBar()+`<p class="label">Quin article porta?</p>
      <p class="prompt">… ${esc(it.base)}</p><p class="cahint">${esc(it.ca)}</p>
      <div class="opts">${["le","la","l'","les"].map(a=>`<button class="opt" style="font-family:var(--f-display);font-size:1.9rem;padding:.3rem" data-ok="${a===it.art}">${a}</button>`).join("")}</div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    answerOpts(ok=>{setFeedback((ok?"✔ Très bien ! ":"✘ Era: ")+it.fr+(it.art==="l'"?` (${it.g==="f"?"femení":"masculí"})`:""),ok?"ok":"ko");say(it.fr)});wireNext(RUN.article)},
  ordre(){
    const all=items(),start=rnd(all.length),seq=[0,1,2,3].map(k=>all[(start+k)%all.length]);let pos=0,missed=false;const built=[];
    stage().innerHTML=scoreBar()+`<p class="label">Toca en ordre, començant per ${esc(seq[0].ca)}</p>
      <p class="prompt small" id="built" style="min-height:2.2em">…</p>
      <div class="opts">${shuffle(seq).map(o=>`<button class="opt" data-k="${esc(o.fr)}">${esc(o.fr)}</button>`).join("")}</div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    stage().querySelector(".opts").onclick=e=>{const b=e.target.closest(".opt");if(!b||b.disabled)return;say(b.dataset.k);
      if(b.dataset.k===seq[pos].fr){b.classList.add("ok");b.disabled=true;built.push(b.dataset.k);pos++;$("#built").textContent=built.join(" → ");
        if(pos===seq.length){mark(!missed);setFeedback("✔ Parfait !","ok")}}
      else{b.classList.add("ko");setTimeout(()=>b.classList.remove("ko"),500);missed=true;setFeedback("Aquest no toca encara","ko")}};
    wireNext(RUN.ordre)},
  calcul(){
    let a,b,op,r;const lvl=rnd(3);
    do{const m=lvl===0?11:lvl===1?600:500001;const unit=lvl===2&&rnd(2)?1000:1;
      a=rnd(m/unit)*unit;b=rnd(m/unit)*unit;op=rnd(2)?"plus":"moins";if(op==="moins"&&b>a)[a,b]=[b,a];r=op==="plus"?a+b:a-b}while(r>1e6);
    const opts=shuffle([r,...nearNums(r,3)]),sentence=`${frNum(a)} ${op} ${frNum(b)}`;
    stage().innerHTML=scoreBar()+`<p class="label">Calcula i tria la resposta en francès</p>
      <p class="prompt" style="font-size:clamp(1.6rem,6vw,2.6rem)">${esc(sentence)}</p><div class="row">${speakBtn(sentence+" égale combien ?")}</div>
      <div class="opts many">${opts.map(n=>`<button class="opt" data-ok="${n===r}">${esc(frNum(n))}</button>`).join("")}</div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    answerOpts(ok=>{setFeedback((ok?"✔ Très bien ! ":"✘ Oh non… ")+`${fmt(a)} ${op==="plus"?"+":"−"} ${fmt(b)} = ${fmt(r)}`,ok?"ok":"ko");say(`${sentence} égale ${frNum(r)}`)});wireNext(RUN.calcul)},
  buits(){
    const f=pickFrase();
    stage().innerHTML=scoreBar()+`<p class="label">Tria la paraula que falta</p>
      <p class="sent">${sentHTML(f)}</p><p class="cahint">${esc(f.ca)}</p>
      <div class="opts ${f.o.some(x=>x.length>8)?"many":""}">${f.o.map(o=>`<button class="opt" data-ok="${o===f.a}">${esc(o)}</button>`).join("")}</div>
      <p class="feedback" id="fb"></p><p class="why" id="why"></p>`+nextBtn();
    answerOpts(ok=>{$("#gap").textContent=f.a;setFeedback((ok?"✔ Très bien ! ":"✘ Era: ")+f.fr,ok?"ok":"ko");if(f.why)$("#why").textContent="💡 "+f.why;say(f.fr)});
    wireNext(RUN.buits)},
  escriuB(){
    const f=pickFrase();
    stage().innerHTML=scoreBar()+`<p class="label">Escriu la paraula que falta</p>
      <p class="sent">${sentHTML(f)}</p><p class="cahint">${esc(f.ca)}</p>
      <form id="wf" class="row" style="flex-direction:column"><label for="ans" class="label" style="margin:0">La paraula</label>
        <input id="ans" class="answer" autocomplete="off" autocapitalize="off" spellcheck="false">${accentsHTML}
        <div class="row" style="margin-top:10px"><button class="btn" type="submit">Comprova</button><button class="btn ghost" type="button" id="hint">Opcions</button></div></form>
      <p class="feedback" id="fb"></p><p class="why" id="why"></p>`+nextBtn();
    const inp=$("#ans");wireAccents(inp);
    $("#hint").onclick=()=>setFeedback("Pot ser: "+f.o.join(" · "),"");
    let done=false;
    $("#wf").onsubmit=e=>{e.preventDefault();if(done)return;const v=inp.value.trim().replace(/’/g,"'");if(!v)return;done=true;
      const exact=v.toLowerCase()===f.a.toLowerCase(),close=!exact&&norm(v)===norm(f.a);
      mark(exact||close);$("#gap").textContent=f.a;say(f.fr);if(f.why)$("#why").textContent="💡 "+f.why;
      setFeedback(exact?"✔ Très bien ! "+f.fr:close?"✔ Gairebé! Revisa els accents: "+f.a:"✘ Era: "+f.a+" — "+f.fr,exact||close?"ok":"ko")};
    wireNext(RUN.escriuB)},
  ordena(){
    let src=null;
    if(T.items&&(!(T.frases||T.genFrase)||rnd(2))){const c=items().filter(x=>toks(spoken(x.fr)).length>=3);if(c.length){const it=any(c);src={fr:spoken(it.fr),ca:it.ca}}}
    if(!src){let g=0;do{src=pickFrase()}while(toks(src.fr).length<3&&g++<30)}
    const words=toks(src.fr);let order=words.map((w,i)=>i),g=0;do{order=shuffle(order)}while(order.every((v,i)=>v===i)&&g++<10);
    const built=[];let done=false;
    stage().innerHTML=scoreBar()+`<p class="label">Ordena les paraules</p><p class="cahint" style="font-size:1.1rem">${esc(src.ca)}</p>
      <div class="built" id="built" aria-live="polite"></div><div class="tiles" id="pool"></div>
      <div class="row" style="margin-top:12px"><button class="btn ghost" id="undo">↶ Desfés</button></div>
      <p class="feedback" id="fb"></p>`+nextBtn();
    const paint=()=>{$("#built").innerHTML=built.map(i=>`<button class="tile" data-i="${i}">${esc(words[i])}</button>`).join("");
      $("#pool").innerHTML=order.filter(i=>!built.includes(i)).map(i=>`<button class="tile" data-i="${i}">${esc(words[i])}</button>`).join("")};
    paint();
    $("#pool").onclick=e=>{const b=e.target.closest(".tile");if(!b||done)return;built.push(+b.dataset.i);paint();
      if(built.length===words.length){done=true;const got=built.map(i=>words[i]).join(" ");const ok=norm(got)===norm(src.fr);mark(ok);
        setFeedback(ok?"✔ Parfait ! "+src.fr:"✘ L'ordre correcte és: "+src.fr,ok?"ok":"ko");say(src.fr)}};
    $("#built").onclick=e=>{const b=e.target.closest(".tile");if(!b||done)return;built.splice(built.indexOf(+b.dataset.i),1);paint()};
    $("#undo").onclick=()=>{if(done)return;built.pop();paint()};
    wireNext(RUN.ordena)},
  parla(){
    clearTimeout(nextTimer);onHeard=null;
    let it;
    if((T.parlaFrases||!T.items)&&(T.frases||T.genFrase)){const f=pickFrase();it={fr:f.fr,ca:f.ca}}else it=pickItem();
    const targets=it.fr.split(" / ").map(t=>t.replace(/ Joan$/,""));
    const accept=[...targets,...it.fr.split(" / "),...(it.n!=null?[String(it.n)]:[]),...(it.abbr?[it.abbr]:[])];
    const canListen=SR&&!srBlocked;
    const shown=parlaMode==="llegeix"
      ?`<p class="label">Llegeix-ho en veu alta</p><p class="prompt ${it.fr.length>22?"small":""}">${esc(it.fr)}</p>`
      :`<p class="label">Digues-ho en francès (de memòria)</p><p class="prompt small">${T.tipus==="nombres"?`<span style="font-family:var(--f-display);font-size:3.2rem">${esc(it.ca)}</span>`:esc(it.ca)}</p>`;
    stage().innerHTML=scoreBar()+`<div class="row" style="margin-bottom:10px">
        <button class="speak" id="m-l" aria-pressed="${parlaMode==="llegeix"}" style="${parlaMode==="llegeix"?"":"background:transparent"}">Llegir</button>
        <button class="speak" id="m-r" aria-pressed="${parlaMode==="recita"}" style="${parlaMode==="recita"?"":"background:transparent"}">Recitar</button></div>
      ${shown}
      <div class="row" style="margin:6px 0 4px">${canListen?`<button class="btn mic" id="mic">🎤 Obre el micròfon</button>`:""}<span id="model" ${parlaMode==="recita"?"hidden":""}>${speakBtn(spoken(it.fr))}</span></div>
      <p id="heard" style="text-align:center;color:var(--ink-soft);min-height:1.5em;margin:8px 0 0"></p>
      <div class="row" id="self" ${canListen?"hidden":""} style="margin-top:8px">
        <button class="btn ghost" id="s-ko">Ho he de repetir</button><button class="btn" id="s-ok">Ho he dit bé</button></div>
      <p class="feedback" id="fb">${canListen?"":"Aquí no es pot fer servir el micròfon. Digues-ho en veu alta, escolta el model i valora-ho tu mateix."}</p>`+nextBtn();
    $("#m-l").onclick=()=>{parlaMode="llegeix";RUN.parla()};$("#m-r").onclick=()=>{parlaMode="recita";RUN.parla()};
    let done=false;const reveal=()=>{const m=$("#model");if(m)m.hidden=false};
    if(!canListen){
      if(parlaMode==="recita"){$("#self").hidden=true;const r=document.createElement("div");r.className="row";r.innerHTML=`<button class="btn ghost" id="show">Mostra la resposta</button>`;$("#self").before(r);
        $("#show").onclick=()=>{r.remove();reveal();$("#self").hidden=false;$("#heard").textContent=it.fr;say(spoken(it.fr))}}
      $("#s-ok").onclick=()=>{if(done)return;done=true;mark(true);setFeedback("✔ Très bien !","ok")};
      $("#s-ko").onclick=()=>{if(done)return;done=true;mark(false);setFeedback("Escolta el model i torna-ho a provar.","ko");say(spoken(it.fr))};
    } else {
      paintMic();if(micOn)setFeedback("Micròfon obert. Digues-ho quan vulguis.","");
      $("#mic").onclick=()=>micOn?stopMic():startMic();
      onHeard=alts=>{
        let best=alts[0],bestScore=0;
        for(const a of alts)for(const t of accept){const x=snorm(a),y=snorm(t);const s=1-lev(x,y)/Math.max(x.length,y.length,1);if(s>bestScore){bestScore=s;best=a}}
        if(it.n!=null&&alts.some(a=>a.replace(/\D/g,"")===String(it.n))){bestScore=1;best=alts.find(a=>a.replace(/\D/g,"")===String(it.n))}
        $("#heard").innerHTML=`He entès: «<b>${esc(best)}</b>»`;
        const counted=!done;done=true;
        if(bestScore>=.99){if(counted)mark(true);setFeedback("✔ Parfait ! Pronúncia reconeguda.","ok");nextTimer=setTimeout(RUN.parla,1600)}
        else if(bestScore>=.7){if(counted)mark(true);setFeedback("✔ Gairebé! Era: "+it.fr,"ok");reveal();nextTimer=setTimeout(RUN.parla,2600)}
        else{if(counted)mark(false);setFeedback("✘ No ho he reconegut. Era: "+it.fr+" — torna-ho a provar.","ko");reveal();say(spoken(it.fr))}};
    }
    wireNext(RUN.parla)}
};

/* ---------- views ---------- */
const DAY=864e5;
function isNew(t){return t.afegit&&(Date.now()-new Date(t.afegit).getTime())<14*DAY}
function renderIndex(){
  const last=TEMES.find(t=>t.id===PROG._last);
  $("#app").innerHTML=`<div class="in"><header class="hero"><h1>Cahier de français</h1>
    <p class="sub">Francès per a principiants. Tria un tema i practica amb àudio, targetes, jocs i el micròfon.</p>
    ${last?`<a class="resume" href="#${last.id}">Continua → ${esc(last.titol)} <span>· on ho vas deixar</span></a>`:""}</header>
    ${BLOCS.map(b=>{const ts=TEMES.filter(t=>t.bloc===b.id);if(!ts.length)return "";
      return `<section class="bloc"><h2>${b.nom}</h2><div class="cards">${ts.map(t=>{const p=PROG[t.id];const pct=p&&p.total?Math.round(100*p.ok/p.total):0;
        return `<a class="card" href="#${t.id}">${isNew(t)?`<span class="nou">Nou</span>`:""}<span class="chip">${esc(t.mostra||"")}</span>
          <span style="min-width:0"><b>${esc(t.titol)}</b><small>${esc(t.desc||"")}</small>
          ${p&&p.total?`<span class="prog" aria-hidden="true"><i style="width:${pct}%"></i></span><span class="progtxt">${p.ok} encerts de ${p.total} · ${pct}%</span>`:""}</span></a>`}).join("")}</div></section>`}).join("")}
    <div class="foot"><span>El progrés es guarda només en aquest dispositiu.</span><button id="reset">Esborra el meu progrés</button></div></div>`;
  const r=$("#reset");let armed=false;
  r.onclick=()=>{if(!armed){armed=true;r.textContent="Segur? Toca de nou per esborrar";return}PROG={};saveProg();renderIndex()};
}
function renderTema(){
  const A=actsOf(T);
  $("#app").innerHTML=`<div class="top"><a class="back" href="#" aria-label="Torna a l'índex">← Índex</a><h1>${esc(T.titol)}</h1></div>
    <div class="in"><nav class="tabs" id="tabs" aria-label="Activitats">${A.map(a=>`<button aria-pressed="${a===act}" data-a="${a}">${ACTS[a]}</button>`).join("")}</nav>
    ${T.estances?`<div class="rooms" id="rooms">${Object.entries(T.estances).map(([k,v])=>`<button aria-pressed="${k===room}" data-r="${k}">${v}</button>`).join("")}</div>`:""}
    <section class="stage" id="stage" aria-live="polite"></section>
    ${T.consell?`<p class="tip">💡 ${esc(T.consell)}</p>`:""}</div>`;
  $("#tabs").onclick=e=>{const b=e.target.closest("[data-a]");if(!b)return;history.replaceState(null,"","#"+T.id+"."+b.dataset.a);route()};
  if(T.estances)$("#rooms").onclick=e=>{const b=e.target.closest("[data-r]");if(!b)return;room=b.dataset.r;score={ok:0,total:0};renderTema()};
  const cur=$("#tabs [aria-pressed=true]");if(cur)cur.scrollIntoView({block:"nearest",inline:"center"});
  clearTimeout(nextTimer);if(act!=="parla"&&micOn)stopMic();
  RUN[act]();
}
function route(){
  const [id,a]=decodeURIComponent(location.hash.slice(1)).split(".");
  const t=TEMES.find(x=>x.id===id);
  clearTimeout(nextTimer);
  if(!t){if(micOn)stopMic();T=null;renderIndex();window.scrollTo(0,0);return}
  const A=actsOf(t);const newT=T!==t;
  if(newT){T=t;room="tot";window.scrollTo(0,0)}
  const na=A.includes(a)?a:A[0];if(na!==act||newT)score={ok:0,total:0};act=na;
  renderTema();
}
function init(){
TEMES.forEach(t=>{
  if(t.items)t.items=t.items.map(normItem);
  if(t.frases&&t.tipus!=="verbes")t.frases=t.frases.map(normFrase);
  if(t.tipus&&BUILD[t.tipus])BUILD[t.tipus](t);
  if(t.regla)t.regla=rich(t.regla);
});
/* the "il / elle" inside verb tables should read both pronouns aloud */
TEMES.forEach(t=>{if(t.regla)t.regla=t.regla.replace(/data-say="il \/ elle ([^"]+)"/g,'data-say="il $1. elle $1"').replace(/data-say="ils \/ elles ([^"]+)"/g,'data-say="ils $1. elles $1"')});
  window.addEventListener("hashchange",route);
  route();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
