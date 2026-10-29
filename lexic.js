/* ======================================================================
   DICCIONARI DE NOMS I ADJECTIUS
   El fan servir els generadors de frases (demostratius, possessius…).
   Si hi afegeixes paraules, tots els generadors les aprofiten.

   Noms, una línia per paraula:
   francès | plural francès | gènere | català | plural català | gènere català | categoria | marca
     · plural francès buit = es calcula sol (livre → livres, gâteau → gâteaux)
     · gènere català buit = el mateix que en francès
     · marca: h = h aspirada (ce héros, no cet héros) · s = només en singular
     · categories: objecte, roba, menjar, animal, persona, lloc
   ====================================================================== */
const LEXIC=`
livre||m|llibre|llibres||objecte
stylo||m|bolígraf|bolígrafs||objecte
crayon||m|llapis|llapis||objecte
gomme||f|goma|gomes||objecte
règle||f|regle|regles|m|objecte
cahier||m|llibreta|llibretes|f|objecte
trousse||f|estoig|estoigs|m|objecte
ordinateur||m|ordinador|ordinadors||objecte
table||f|taula|taules||objecte
chaise||f|cadira|cadires||objecte
téléphone||m|telèfon|telèfons||objecte
portable||m|mòbil|mòbils||objecte
clé||f|clau|claus||objecte
lampe||f|llum|llums|m|objecte
affiche||f|pòster|pòsters|m|objecte
horloge||f|rellotge|rellotges|m|objecte
armoire||f|armari|armaris|m|objecte
étagère||f|prestatge|prestatges|m|objecte
album||m|àlbum|àlbums||objecte
agenda||m|agenda|agendes|f|objecte
vélo||m|bicicleta|bicicletes|f|objecte
pull||m|jersei|jerseis||roba
chemise||f|camisa|camises||roba
pantalon||m|pantaló|pantalons||roba
robe||f|vestit|vestits|m|roba
jupe||f|faldilla|faldilles||roba
chaussure||f|sabata|sabates||roba
manteau||m|abric|abrics||roba
écharpe||f|bufanda|bufandes||roba
anorak||m|anorac|anoracs||roba
casquette||f|gorra|gorres||roba
gâteau||m|pastís|pastissos||menjar
pomme||f|poma|pomes||menjar
orange||f|taronja|taronges||menjar
pain||m|pa|pans||menjar
fromage||m|formatge|formatges||menjar
glace||f|gelat|gelats|m|menjar
hamburger||m|hamburguesa|hamburgueses|f|menjar|h
haricot||m|mongeta|mongetes|f|menjar|h
croissant||m|croissant|croissants||menjar
abricot||m|albercoc|albercocs||menjar
chat||m|gat|gats||animal
chien||m|gos|gossos||animal
oiseau||m|ocell|ocells||animal
cheval|chevaux|m|cavall|cavalls||animal
souris||f|ratolí|ratolins|m|animal
hibou||m|mussol|mussols||animal|h
lapin||m|conill|conills||animal
araignée||f|aranya|aranyes||animal
garçon||m|noi|nois||persona
fille||f|noia|noies||persona
homme||m|home|homes||persona
femme||f|dona|dones||persona
professeur||m|professor|professors||persona
étudiant||m|estudiant|estudiants||persona
ami||m|amic|amics||persona
amie||f|amiga|amigues||persona
frère||m|germà|germans||persona
sœur||f|germana|germanes||persona
père||m|pare|pares||persona|s
mère||f|mare|mares||persona|s
cousin||m|cosí|cosins||persona
cousine||f|cosina|cosines||persona
oncle||m|oncle|oncles||persona
tante||f|tia|ties||persona
grand-père||m|avi|avis||persona|s
grand-mère||f|àvia|àvies||persona|s
voisin||m|veí|veïns||persona
voisine||f|veïna|veïnes||persona
héros||m|heroi|herois||persona|h
école||f|escola|escoles||lloc
hôtel||m|hotel|hotels||lloc
hôpital|hôpitaux|m|hospital|hospitals||lloc
maison||f|casa|cases||lloc
chambre||f|habitació|habitacions||lloc
ville||f|ciutat|ciutats||lloc
village||m|poble|pobles||lloc
appartement||m|pis|pisos||lloc
restaurant||m|restaurant|restaurants||lloc
parc||m|parc|parcs||lloc
musée||m|museu|museus||lloc
église||f|església|esglésies||lloc
rue||f|carrer|carrers|m|lloc
plage||f|platja|platges||lloc
arbre||m|arbre|arbres||lloc
`.trim().split("\n").map(l=>{const [fr,frp,g,ca,cap,cg,cat,marca]=l.split("|").map(x=>(x||"").trim());
  return {fr,frp:frp||plFr(fr),g,ca,cap:cap||ca+"s",cg:cg||g,cat,h:marca==="h",sing:marca==="s"}});

/* Adjectius: francès [m, f, m pl, f pl] · català [m, f, m pl, f pl] · categories on encaixen */
const ADJ=[
  {fr:["grand","grande","grands","grandes"],ca:["gran","gran","grans","grans"],cats:["objecte","lloc","animal","roba","persona"]},
  {fr:["petit","petite","petits","petites"],ca:["petit","petita","petits","petites"],cats:["objecte","lloc","animal","roba","persona"]},
  {fr:["joli","jolie","jolis","jolies"],ca:["bonic","bonica","bonics","boniques"],cats:["objecte","lloc","roba","animal"]},
  {fr:["cher","chère","chers","chères"],ca:["car","cara","cars","cares"],cats:["objecte","roba","menjar"]},
  {fr:["noir","noire","noirs","noires"],ca:["negre","negra","negres","negres"],cats:["objecte","roba","animal"]},
  {fr:["sympa","sympa","sympas","sympas"],ca:["simpàtic","simpàtica","simpàtics","simpàtiques"],cats:["persona"]},
  {fr:["gentil","gentille","gentils","gentilles"],ca:["amable","amable","amables","amables"],cats:["persona"]},
  {fr:["drôle","drôle","drôles","drôles"],ca:["divertit","divertida","divertits","divertides"],cats:["persona"]},
  {fr:["bon","bonne","bons","bonnes"],ca:["bo","bona","bons","bones"],cats:["menjar"]},
  {fr:["délicieux","délicieuse","délicieux","délicieuses"],ca:["deliciós","deliciosa","deliciosos","delicioses"],cats:["menjar"]},
  {fr:["mignon","mignonne","mignons","mignonnes"],ca:["bufó","bufona","bufons","bufones"],cats:["animal"]},
  {fr:["calme","calme","calmes","calmes"],ca:["tranquil","tranquil·la","tranquils","tranquil·les"],cats:["lloc","animal"]}];

/* Noms de persona per a les frases: [francès, català amb article, gènere] */
const NOMS=[["Paul","en Paul","m"],["Marie","la Marie","f"],["Laia","la Laia","f"],["Jordi","en Jordi","m"],["Léa","la Léa","f"],["Hugo","en Hugo","m"]];

/* ---------- eines per als generadors ---------- */
function plFr(w){return /[sxz]$/.test(w)?w:/(eau|eu)$/.test(w)?w+"x":/al$/.test(w)?w.slice(0,-2)+"aux":w+"s"}
function noms(...cats){return LEXIC.filter(n=>cats.includes(n.cat))}
function vocal(n){return !n.h&&/^[aeiouéèêîôâh]/i.test(n.fr)}
function adjPer(n){const c=ADJ.filter(a=>a.cats.includes(n.cat));return c.length?any(c):null}
function idx(g,pl){return (pl?2:0)+(g==="f"?1:0)}
