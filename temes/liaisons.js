/* Les liaisons
   Per corregir o ampliar aquest tema, edita només aquest fitxer.
   Font: lepointdufle.net, «Liaisons obligatoires, liaisons interdites».

   Cada frase de LIAISONS: [frase amb _ al lloc de la liaison, resposta, so, regla, català]
     resposta: "o" obligatòria · "p" prohibida
     so: "z", "t", "n" o "v" (només per a les obligatòries; "" si no n'hi ha) */
(function(){
const R={
  det:"Determinant + nom: liaison obligatòria",
  nombre:"Nombre + nom: liaison obligatòria",
  adj:"Adjectiu + nom: liaison obligatòria",
  pron:"Pronom (on, nous, vous, ils, elles) + verb: liaison obligatòria",
  adv:"Després d'un adverbi curt (très, plus, bien…): liaison obligatòria",
  quand:"Quand + est-ce que, o quand + vocal: liaison obligatòria, sona [t]",
  comment:"Comment allez-vous ? és un cas únic: liaison obligatòria, sona [t]",
  prep:"Després de dans, chez, sans, en: liaison obligatòria",
  fixa:"Expressió fixa: la liaison sempre es fa",
  h:"Davant d'una h aspirada: liaison prohibida",
  nomAdj:"Nom singular + adjectiu: liaison prohibida",
  subj:"Subjecte nom (o nom propi, quelqu'un) + verb: liaison prohibida",
  verb:"Després del verb: no es fa (en un registre molt formal, de vegades sí)",
  huit:"Davant de huit i onze: liaison prohibida",
  ment:"Adverbi llarg en -ment + adjectiu: no es fa",
  inv:"Quand, comment, combien + inversió: liaison prohibida",
  et:"Després de et: liaison prohibida, mai!"
};
const LIAISONS=[
  /* obligatòries */
  ["Nathalie passe un_examen.","o","n",R.det,"La Nathalie fa un examen."],
  ["Ce sont des_études difficiles.","o","z",R.det,"Són uns estudis difícils."],
  ["mes_amis","o","z",R.det,"els meus amics"],
  ["les_enfants","o","z",R.det,"els nens"],
  ["ces_arbres","o","z",R.det,"aquests arbres"],
  ["nos_écoles","o","z",R.det,"les nostres escoles"],
  ["Il habite aux_États-Unis.","o","z",R.det,"Viu als Estats Units."],
  ["mon_ami","o","n",R.det,"el meu amic"],
  ["aucun_élève","o","n",R.det,"cap alumne"],
  ["leurs_amis","o","z",R.det,"els seus amics"],
  ["Quels_idiots !","o","z",R.det,"Quins idiotes!"],
  ["Je dois deux_euros à Paul.","o","z",R.nombre,"Dec dos euros al Paul."],
  ["trois_ans","o","z",R.nombre,"tres anys"],
  ["neuf_heures","o","v",R.nombre,"les nou"],
  ["neuf_ans","o","v",R.nombre,"nou anys"],
  ["Elle monte les vieilles_affaires au grenier.","o","z",R.adj,"Puja les coses velles a les golfes."],
  ["un petit_ami","o","t",R.adj,"un xicot"],
  ["un grand_homme","o","t",R.adj,"un gran home"],
  ["un bon_élève","o","n",R.adj,"un bon alumne"],
  ["On_a tout compris.","o","n",R.pron,"Ho hem entès tot."],
  ["Vous_avez un ordinateur.","o","z",R.pron,"Teniu un ordinador."],
  ["Vous vous_êtes bien reposé.","o","z",R.pron,"Heu descansat bé."],
  ["Ils_ont de l'énergie.","o","z",R.pron,"Tenen energia."],
  ["Elles_arrivent demain.","o","z",R.pron,"Arriben demà."],
  ["Nous_habitons à Gérone.","o","z",R.pron,"Vivim a Girona."],
  ["Il a été très_étonné de voir ça !","o","z",R.adv,"S'ha sorprès molt de veure això!"],
  ["Marc est plus_occupé que Luc.","o","z",R.adv,"En Marc està més ocupat que en Luc."],
  ["Hier, on s'est bien_amusés.","o","n",R.adv,"Ahir ens ho vam passar bé."],
  ["Quand_est-ce qu'on arrive ?","o","t",R.quand,"Quan arribem?"],
  ["Quand_il est là, je suis contente.","o","t",R.quand,"Quan ell hi és, estic contenta."],
  ["Bonjour, comment_allez-vous ?","o","t",R.comment,"Bon dia, com està?"],
  ["Elle vit dans_un vieux château.","o","z",R.prep,"Viu en un castell vell."],
  ["Ils rentrent chez_eux en voiture.","o","z",R.prep,"Tornen a casa en cotxe."],
  ["Vincent est arrivé en_avance.","o","n",R.prep,"En Vincent ha arribat d'hora."],
  ["Il part sans_argent.","o","z",R.prep,"Se'n va sense diners."],
  ["avant-_hier","o","t",R.fixa,"abans-d'ahir"],
  ["c'est-_à-dire","o","t",R.fixa,"és a dir"],
  ["de temps_en temps","o","z",R.fixa,"de tant en tant"],
  ["plus_ou moins","o","z",R.fixa,"més o menys"],
  ["un sous-_entendu","o","z",R.fixa,"un sobreentès"],
  ["tout_à coup","o","t",R.fixa,"de cop i volta"],
  ["À tout_à l'heure !","o","t",R.fixa,"Fins ara!"],
  /* prohibides */
  ["Ce sont des_héros !","p","",R.h,"Són herois!"],
  ["les_haricots","p","",R.h,"les mongetes"],
  ["Il habite en_haut de cette rue.","p","",R.h,"Viu a dalt d'aquest carrer."],
  ["un_hamburger","p","",R.h,"una hamburguesa"],
  ["des_hiboux","p","",R.h,"uns mussols"],
  ["C'est un étudiant_intelligent.","p","",R.nomAdj,"És un estudiant intel·ligent."],
  ["C'est du courrier_urgent.","p","",R.nomAdj,"És correu urgent."],
  ["Le train_arrive demain.","p","",R.subj,"El tren arriba demà."],
  ["Quelqu'un_est entré.","p","",R.subj,"Ha entrat algú."],
  ["Les étudiants_arrivent à huit heures.","p","",R.subj,"Els estudiants arriben a les vuit."],
  ["Vincent_est arrivé en avance.","p","",R.subj,"En Vincent ha arribat d'hora."],
  ["Elle écrit_une lettre à Lili.","p","",R.verb,"Escriu una carta a la Lili."],
  ["Tu veux_un café ?","p","",R.verb,"Vols un cafè?"],
  ["Elle tient_à Paul.","p","",R.verb,"Estima molt el Paul."],
  ["Elle descend_à ski.","p","",R.verb,"Baixa amb esquís."],
  ["Il part_avec sa copine.","p","",R.verb,"Se'n va amb la seva xicota."],
  ["Ils ont_onze ans.","p","",R.huit,"Tenen onze anys."],
  ["les_huit élèves","p","",R.huit,"els vuit alumnes"],
  ["C'est vraiment_ennuyeux !","p","",R.ment,"És realment avorrit!"],
  ["Quand_est-il arrivé ?","p","",R.inv,"Quan ha arribat?"],
  ["Comment_est-il venu ?","p","",R.inv,"Com ha vingut?"],
  ["Comment_il est venu ?","p","",R.inv,"Com ha vingut?"],
  ["Combien_en voulez-vous ?","p","",R.inv,"Quants en vol?"],
  ["Ils ont une fille et_un garçon.","p","",R.et,"Tenen una filla i un noi."]
].map(([s,r,so,why,ca])=>({s,r,so,why,ca}));

const SO={z:"[z]: s, x i z sonen com una s sonora",t:"[t]: d i t sonen [t]",n:"[n]: la n s'enllaça amb la vocal",v:"[v]: la f de neuf sona [v]"};
const parla=s=>s.replace(/-_|_-/g,"-").replace(/_/g," ");

CAHIER.tema({id:"liaisons",bloc:"pronunciacio",titol:"Les liaisons",mostra:"les‿amis",desc:"Quan s'han de fer i quan estan prohibides",afegit:"2026-11-12",
 consell:"La liaison uneix la consonant final muda amb la vocal de la paraula següent: les amis es diu [le-za-mi]. Escolta cada frase i repeteix-la.",
 regla:`<h3>Què és la liaison?</h3>
<p>Moltes paraules franceses acaben en una consonant que no es pronuncia: «les», «deux», «petit». Si la paraula següent comença per vocal o per h muda, aquesta consonant sona i s'uneix a la vocal: «les amis» → [le-za-mi].</p>
<h3>Liaisons obligatòries ‿</h3>
<table><tr><th>Quan</th><th>Exemples</th></tr>
<tr><td>Determinant o nombre + nom</td><td>«un examen», «des études», «mes amis», «deux euros», «aux États-Unis»</td></tr>
<tr><td>Adjectiu + nom</td><td>«les vieilles affaires», «un petit ami»</td></tr>
<tr><td>Pronom + verb</td><td>«on a», «vous avez», «ils ont», «nous habitons»</td></tr>
<tr><td>Adverbi curt</td><td>«très étonné», «plus occupé», «bien amusés»</td></tr>
<tr><td>Quand i comment</td><td>«Quand est-ce qu'on arrive ?», «Quand il est là…», «Comment allez-vous ?»</td></tr>
<tr><td>Dans, chez, sans, en</td><td>«dans un château», «chez eux», «en avance»</td></tr>
<tr><td>Expressions fixes</td><td>«c'est-à-dire», «de temps en temps», «tout à coup», «tout à l'heure», «plus ou moins»</td></tr></table>
<h3>Liaisons prohibides ✗</h3>
<table><tr><th>Quan</th><th>Exemples</th></tr>
<tr><td>Després de <b>et</b></td><td>«une fille et un garçon»</td></tr>
<tr><td>Davant d'h aspirada</td><td>«des héros», «les haricots», «en haut»</td></tr>
<tr><td>Nom singular + adjectiu</td><td>«un étudiant intelligent», «du courrier urgent»</td></tr>
<tr><td>Subjecte nom + verb</td><td>«Le train arrive», «Vincent est arrivé», «Quelqu'un est entré»</td></tr>
<tr><td>Davant de huit i onze</td><td>«Ils ont onze ans», «les huit élèves»</td></tr>
<tr><td>Quand, comment, combien + inversió</td><td>«Quand est-il arrivé ?», «Comment est-il venu ?», «Combien en voulez-vous ?»</td></tr>
<tr><td>Després del verb i després d'un adverbi en -ment</td><td>«Tu veux un café ?», «Il part avec sa copine», «C'est vraiment ennuyeux»</td></tr></table>
<div class="alerta">Després del verb i després d'un adverbi en -ment, la liaison no es fa quan parlem normalment. En un discurs molt formal o en poesia, de vegades sí.</div>
<h3>Quin so fa?</h3>
<table><tr><th>Lletra</th><th>So</th><th>Exemples</th></tr>
<tr><td>s, x, z</td><td>[z]</td><td>«les amis», «deux euros», «chez eux»</td></tr>
<tr><td>d, t</td><td>[t]</td><td>«quand il», «un grand homme», «petit ami»</td></tr>
<tr><td>n</td><td>[n]</td><td>«un ami», «on a», «en avance»</td></tr>
<tr><td>f</td><td>[v]</td><td>«neuf heures», «neuf ans»</td></tr></table>
<p>Font: <a href="https://www.lepointdufle.net/ressources_fle/liaisons_obligatoires_liaisons_interdites.htm" target="_blank" rel="noopener">lepointdufle.net</a></p>`,
 decisions:[
  {nom:"Liaison o no?",instr:"Cal fer la liaison al lloc marcat?",opcions:[["o","‿ Obligatòria"],["p","✗ Prohibida"]],marca:{o:"‿",p:"✗"},items:LIAISONS},
  {nom:"Quin so?",instr:"Quin so fa la liaison al lloc marcat?",opcions:[["z","[z]"],["t","[t]"],["n","[n]"],["v","[v]"]],
   marca:{z:"‿z",t:"‿t",n:"‿n",v:"‿v"},items:LIAISONS.filter(x=>x.so).map(x=>({s:x.s,r:x.so,ca:x.ca,why:SO[x.so]}))}],
 items:LIAISONS.filter(x=>x.r==="o").map(x=>({fr:parla(x.s),ca:x.ca})),
 acts:["regla","d0","d1","cartes","escolta","parla"]});
})();
