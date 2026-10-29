/* Els possessius
   Per corregir o ampliar aquest tema, edita només aquest fitxer.
   Té dues fonts de frases: el generador (genFrase), que combina les plantilles
   amb les paraules de lexic.js, i les frases escrites a mà (frases).
   «generat» és la proporció de frases generades: 0.7 = 7 de cada 10. */
CAHIER.tema({id:"possessifs",bloc:"gramatica",titol:"Els possessius",mostra:"mon · ma",desc:"mon, ma, mes · ton, ta, tes… · frases infinites",afegit:"2026-10-29",
 consell:"El possessiu concorda amb la cosa posseïda, no amb qui la té: Marie aime son chat (chat és masculí).",
 regla:`<h3>Els possessius</h3>
<div class="tablewrap"><table><tr><th>De qui és?</th><th>Masculí</th><th>Femení</th><th>Plural</th></tr>
<tr><td>à moi (meu)</td><td>«mon livre»</td><td>«ma trousse»</td><td>«mes crayons»</td></tr>
<tr><td>à toi (teu)</td><td>«ton livre»</td><td>«ta trousse»</td><td>«tes crayons»</td></tr>
<tr><td>à lui / à elle (seu)</td><td>«son livre»</td><td>«sa trousse»</td><td>«ses crayons»</td></tr>
<tr><td>à nous (nostre)</td><td colspan="2">«notre classe»</td><td>«nos livres»</td></tr>
<tr><td>à vous (vostre)</td><td colspan="2">«votre classe»</td><td>«vos livres»</td></tr>
<tr><td>à eux / à elles (seu)</td><td colspan="2">«leur classe»</td><td>«leurs livres»</td></tr></table></div>
<h3>Dues regles importants</h3>
<ul><li>Concorda amb la cosa, no amb la persona: «Paul aime sa mère» (mère és femení). «Marie aime son chat» (chat és masculí).</li>
<li>Davant d'una paraula femenina que comença per vocal, fem servir <b>mon, ton, son</b>: «mon amie», «ton école», «son adresse».</li></ul>
<div class="alerta">En francès el possessiu no porta article davant: «el meu llibre» → «mon livre».</div>`,
 generat:0.7,
 genFrase(){
  /* Formes franceses per persona: [masculí, femení, plural] */
  const F=[["mon","ma","mes"],["ton","ta","tes"],["son","sa","ses"],["notre","notre","nos"],["votre","votre","vos"],["leur","leur","leurs"]];
  /* Possessius catalans per persona: [m, f, m pl, f pl] */
  const C=[["el meu","la meva","els meus","les meves"],["el teu","la teva","els teus","les teves"],["el seu","la seva","els seus","les seves"],
   ["el nostre","la nostra","els nostres","les nostres"],["el vostre","la vostra","els vostres","les vostres"],["el seu","la seva","els seus","les seves"]];
  /* Plantilles. p = persona (0 je, 1 tu, 2 il/elle, 3 nous, 4 vous, 5 ils/elles) · {X}, {Y} = noms de persona · {P} = possessiu català */
  const T=[
   {p:0,cats:["objecte","roba","animal","persona"],fr:"Je cherche ___ {N}.",ca:["Busco {P} {N}."]},
   {p:0,cats:["roba","animal","persona","lloc"],fr:"J'adore ___ {N}.",ca:["M'encanta {P} {N}.","M'encanten {P} {N}."]},
   {p:1,cats:["objecte","roba"],fr:"Tu as ___ {N} ?",ca:["Tens {P} {N}?"]},
   {p:1,cats:["objecte","roba"],fr:"Tu ranges ___ {N} ?",ca:["Endreces {P} {N}?"]},
   {p:2,cats:["objecte","roba","animal","persona"],fr:"{X} cherche ___ {N}.",ca:["{X} busca {P} {N}."]},
   {p:2,cats:["roba","animal","persona","lloc"],fr:"{X} adore ___ {N}.",ca:["{X} adora {P} {N}."]},
   {p:3,cats:["objecte","roba","animal","persona"],fr:"Nous cherchons ___ {N}.",ca:["Busquem {P} {N}."]},
   {p:3,cats:["lloc","animal","persona","roba"],fr:"Nous aimons ___ {N}.",ca:["Ens agrada {P} {N}.","Ens agraden {P} {N}."]},
   {p:4,cats:["objecte","roba"],fr:"Vous avez ___ {N} ?",ca:["Teniu {P} {N}?"]},
   {p:4,cats:["objecte","animal","persona","roba"],fr:"Vous cherchez ___ {N} ?",ca:["Busqueu {P} {N}?"]},
   {p:5,cats:["objecte","roba","animal","persona"],fr:"{X} et {Y} cherchent ___ {N}.",ca:["{X} i {Y} busquen {P} {N}."]},
   {p:5,cats:["lloc","animal","persona","roba"],fr:"Ils adorent ___ {N}.",ca:["Adoren {P} {N}."]}];
  const t=any(T),n=any(noms(...t.cats)),pl=!n.sing&&rnd(3)===0,p=t.p;
  const form=pl?F[p][2]:(n.g==="f"&&!vocal(n))?F[p][1]:F[p][0];
  const [x,y]=shuffle(NOMS);
  const s=t.fr.replace("{X}",x[0]).replace("{Y}",y[0]).replace("{N}",pl?n.frp:n.fr);
  const ca=(t.ca[pl&&t.ca[1]?1:0]).replace("{X}",x[1]).replace("{Y}",y[1]).replace("{P}",C[p][idx(n.cg,pl)]).replace("{N}",pl?n.cap:n.ca);
  const altres={0:["ton","ta","tes"],1:["mon","ma","mes"],2:["leur","leurs"],3:["votre","vos"],4:["notre","nos"],5:["son","ses"]}[p];
  const o=p<3?[...F[p],any(altres)]:[F[p][0],F[p][2],...altres];
  const nom=pl?n.frp:n.fr;
  let why;
  if(p>=3)why=(pl?`diverses coses (${nom}) → ${form}`:`una sola cosa (${nom}) → ${form}`)+(p===5?" · els posseïdors són diversos: leur / leurs":"");
  else{why=pl?`${nom} és plural → ${form}`:n.g==="f"&&vocal(n)?`${nom} és femení però comença per vocal → ${form}`:n.g==="f"?`${nom} és femení → ${form}`:`${nom} és masculí → ${form}`;
    if(p===2&&!pl&&x[2]!==n.g)why+=` (concorda amb ${nom}, no amb ${x[1]})`}
  return {s,a:form,o:uniq(o),ca:cap(ca),why}},
 frases:[
  ["C'est ___ livre. (à moi)","mon",["mon","ma","mes","ton"],"És el meu llibre.","livre és masculí singular → mon"],
  ["C'est ___ trousse. (à moi)","ma",["mon","ma","mes","ta"],"És el meu estoig.","trousse és femení → ma"],
  ["Ce sont ___ crayons. (à moi)","mes",["mon","ma","mes","tes"],"Són els meus llapis.","crayons és plural → mes"],
  ["C'est ___ école. (à moi)","mon",["mon","ma","mes","ton"],"És la meva escola.","école és femení però comença per vocal → mon"],
  ["Tu as ___ cahier ? (à toi)","ton",["ton","ta","tes","mon"],"Tens la teva llibreta?","cahier és masculí → ton"],
  ["Où est ___ gomme ? (à toi)","ta",["ton","ta","tes","sa"],"On és la teva goma?","gomme és femení → ta"],
  ["Voici ___ parents. (à toi)","tes",["ton","ta","tes","ses"],"Aquí tens els teus pares.","parents és plural → tes"],
  ["Paul habite avec ___ mère.","sa",["son","sa","ses","leur"],"En Paul viu amb la seva mare.","mère és femení → sa (concorda amb la mare, no amb en Paul)"],
  ["Marie adore ___ chat.","son",["son","sa","ses","ma"],"La Marie adora el seu gat.","chat és masculí → son, encara que la Marie sigui una noia"],
  ["Julie range ___ affaires.","ses",["son","sa","ses","leurs"],"La Julie endreça les seves coses.","affaires és plural → ses"],
  ["Léa cherche ___ adresse.","son",["son","sa","ses","leur"],"La Léa busca la seva adreça.","adresse és femení però comença per vocal → son"],
  ["C'est ___ classe. (à nous)","notre",["notre","nos","votre","leur"],"És la nostra classe.","una cosa nostra → notre"],
  ["Ce sont ___ professeurs. (à nous)","nos",["notre","nos","vos","leurs"],"Són els nostres professors.","diverses coses nostres → nos"],
  ["C'est ___ maison ? (à vous)","votre",["votre","vos","notre","leur"],"És casa vostra?","una cosa vostra → votre"],
  ["Ce sont ___ livres ? (à vous)","vos",["votre","vos","nos","leurs"],"Són els vostres llibres?","diverses coses vostres → vos"],
  ["Ils aiment ___ ville.","leur",["leur","leurs","son","sa"],"Els agrada la seva ciutat.","diversos posseïdors, una cosa → leur"],
  ["Elles parlent avec ___ amis.","leurs",["leur","leurs","ses","son"],"Parlen amb els seus amics.","diversos posseïdors, diverses coses → leurs"],
  ["C'est ___ amie Laia. (à moi)","mon",["mon","ma","mes","ton"],"És la meva amiga Laia.","amie comença per vocal → mon"],
  ["Tu connais ___ frère ? (à moi)","mon",["mon","ma","mes","son"],"Coneixes el meu germà?","frère és masculí → mon"],
  ["Les élèves ouvrent ___ cahiers.","leurs",["leur","leurs","ses","nos"],"Els alumnes obren les seves llibretes.","diversos posseïdors, diverses coses → leurs"]]});
