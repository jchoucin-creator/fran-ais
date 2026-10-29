/* Els demostratius
   Per corregir o ampliar aquest tema, edita només aquest fitxer.
   Les frases es generen soles: combinen les plantilles de sota amb les
   paraules de lexic.js. Per tenir més frases, afegeix plantilles o paraules. */
CAHIER.tema({id:"demonstratifs",bloc:"gramatica",titol:"Els demostratius",mostra:"ce · cette",desc:"ce, cet, cette, ces · frases infinites",afegit:"2026-10-29",
 consell:"Cet i cette sonen igual; la diferència només es veu escrita. Mira sempre el gènere en francès, que no sempre coincideix amb el català: cette gomme, ce cahier.",
 regla:`<h3>Ce, cet, cette, ces</h3>
<p>Vol dir «aquest, aquesta, aquests, aquestes». Concorda amb el nom que ve després.</p>
<table><tr><th></th><th>Singular</th><th>Plural</th></tr>
<tr><td>Masculí</td><td><b>ce</b> · «ce livre», «ce garçon»</td><td rowspan="3"><b>ces</b> · «ces livres», «ces amis», «ces tables»</td></tr>
<tr><td>Masculí davant de vocal o h muda</td><td><b>cet</b> · «cet ami», «cet arbre», «cet hôtel»</td></tr>
<tr><td>Femení</td><td><b>cette</b> · «cette table», «cette école»</td></tr></table>
<h3>Compte amb la h</h3>
<p>La majoria de paraules amb h es comporten com si comencessin per vocal: «cet homme», «cet hôtel».</p>
<p>Algunes tenen <b>h aspirada</b> i es comporten com si comencessin per consonant: «ce héros», «ce hibou», «ce hamburger», «ce haricot».</p>
<h3>Aquest o aquell?</h3>
<p>El francès normalment no fa la diferència. Si cal, s'afegeix -ci (a prop) o -là (lluny): «ce livre-ci» (aquest llibre), «ce livre-là» (aquell llibre).</p>
<div class="alerta">Els femenins no canvien mai davant de vocal: «cette école», «cette amie».</div>`,
 generat:1,
 genFrase(){
  /* Plantilles. {N} = nom · {A} = adjectiu · {D} = demostratiu català. sing / pl = versió singular / plural */
  const P=[
   {cats:["objecte","roba","menjar","animal","persona","lloc"],adj:true,fr:["___ {N} est {A}.","___ {N} sont {A}."],ca:["{D} {N} és {A}.","{D} {N} són {A}."]},
   {cats:["objecte","roba","menjar","lloc","animal"],fr:["J'aime ___ {N}.","J'aime ___ {N}."],ca:["M'agrada {D} {N}.","M'agraden {D} {N}."]},
   {cats:["objecte","roba","menjar","animal","persona","lloc"],fr:["Regarde ___ {N} !","Regarde ___ {N} !"],ca:["Mira {D} {N}!","Mira {D} {N}!"]},
   {cats:["menjar","roba","objecte"],fr:["Je voudrais ___ {N}, s'il vous plaît.","Je voudrais ___ {N}, s'il vous plaît."],ca:["Voldria {D} {N}, si us plau.","Voldria {D} {N}, si us plau."]},
   {cats:["persona"],fr:["Qui est ___ {N} ?","Qui sont ___ {N} ?"],ca:["Qui és {D} {N}?","Qui són {D} {N}?"]},
   {cats:["persona","lloc"],fr:["Tu connais ___ {N} ?","Tu connais ___ {N} ?"],ca:["Coneixes {D} {N}?","Coneixes {D} {N}?"]}];
  const t=any(P),n=any(noms(...t.cats)),pl=!n.sing&&rnd(3)===0,k=pl?1:0;
  const form=pl?"ces":n.g==="f"?"cette":vocal(n)?"cet":"ce";
  const caD=pl?(n.cg==="f"?"aquestes":"aquests"):(n.cg==="f"?"aquesta":"aquest");
  const a=t.adj?adjPer(n):null;
  let s=t.fr[k].replace("{N}",pl?n.frp:n.fr).replace("{A}",a?a.fr[idx(n.g,pl)]:"");
  let ca=t.ca[k].replace("{D}",caD).replace("{N}",pl?n.cap:n.ca).replace("{A}",a?a.ca[idx(n.cg,pl)]:"");
  const start=s.startsWith("___");
  const opts=["ce","cet","cette","ces"].map(o=>start?cap(o):o);
  const nom=pl?n.frp:n.fr;
  let why=pl?`${nom}: plural → ces`
    :n.g==="f"?`${nom} és femení → cette`+(n.cg!=="f"?` (en català és masculí: ${n.ca})`:"")
    :n.h?`${nom} té h aspirada, es comporta com una consonant → ce`
    :vocal(n)?`${nom} és masculí i comença per ${/^h/.test(nom)?"h muda":"vocal"} → cet`
    :`${nom} és masculí → ce`+(n.cg==="f"?` (en català és femení: ${n.ca})`:"");
  return {s,a:start?cap(form):form,o:opts,ca:cap(ca),why}}
});
