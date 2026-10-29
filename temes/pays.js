/* Els països i el seu gènere
   Per corregir o ampliar aquest tema, edita només aquest fitxer.
   Format de cada país: ["nom francès sense article", gènere, "nom català"]
     gènere: "f" femení · "m" masculí · "p" plural
     "n" = sense article; llavors cal afegir la preposició per a «a» i per a «de»:
     ["Cuba","n","Cuba","à","de"]
   Aquesta llista també la fa servir el tema «Països, ciutats i preposicions». */
CAHIER.tema({id:"pays",bloc:"mon",titol:"Els països i el seu gènere",mostra:"la France",desc:"Gairebé tots els països del món, amb el seu article",afegit:"2026-10-29",tipus:"pays",
 consell:"Truc: si el país acaba en -e, gairebé sempre és femení. Davant de vocal l'article és l' i no ens diu el gènere: l'Espagne (f), l'Iran (m).",
 regla:`<h3>Els països porten article</h3>
<p>En català diem «França», però en francès el país porta article: «la France», «le Portugal».</p>
<table><tr><th>Article</th><th>Quan</th><th>Exemples</th></tr>
<tr><td><b>la</b></td><td>femení</td><td>«la France», «la Belgique», «la Chine»</td></tr>
<tr><td><b>le</b></td><td>masculí</td><td>«le Portugal», «le Japon», «le Canada»</td></tr>
<tr><td><b>l'</b></td><td>comença per vocal</td><td>«l'Espagne», «l'Italie», «l'Iran»</td></tr>
<tr><td><b>les</b></td><td>plural</td><td>«les États-Unis», «les Pays-Bas»</td></tr></table>
<h3>Com saber el gènere?</h3>
<ul><li>Acaba en <b>-e</b> → femení: «la Suisse», «la Grèce», «l'Allemagne».</li>
<li>No acaba en -e → masculí: «le Maroc», «le Brésil», «le Sénégal».</li>
<li>Excepcions: «le Mexique», «le Cambodge», «le Mozambique», «le Zimbabwe» acaben en -e però són masculins.</li></ul>
<h3>Països sense article</h3>
<p>Alguns països petits i moltes illes no porten article: «Cuba», «Madagascar», «Malte», «Chypre», «Monaco», «Singapour», «Israël», «Haïti», «Andorre».</p>
<div class="alerta">Les ciutats no porten article: «Paris», «Barcelone», «Rome». Excepció: «Le Caire», «La Havane».</div>`,
 paisos:[
  /* Europa */
  ["Albanie","f","Albània"],["Allemagne","f","Alemanya"],["Angleterre","f","Anglaterra"],["Autriche","f","Àustria"],["Belgique","f","Bèlgica"],
  ["Biélorussie","f","Bielorússia"],["Bosnie-Herzégovine","f","Bòsnia i Hercegovina"],["Bulgarie","f","Bulgària"],["Catalogne","f","Catalunya"],["Croatie","f","Croàcia"],
  ["Écosse","f","Escòcia"],["Espagne","f","Espanya"],["Estonie","f","Estònia"],["Finlande","f","Finlàndia"],["France","f","França"],["Grèce","f","Grècia"],
  ["Hongrie","f","Hongria"],["Irlande","f","Irlanda"],["Islande","f","Islàndia"],["Italie","f","Itàlia"],["Lettonie","f","Letònia"],["Lituanie","f","Lituània"],
  ["Macédoine du Nord","f","Macedònia del Nord"],["Moldavie","f","Moldàvia"],["Norvège","f","Noruega"],["Pologne","f","Polònia"],["Roumanie","f","Romania"],
  ["Russie","f","Rússia"],["Serbie","f","Sèrbia"],["Slovaquie","f","Eslovàquia"],["Slovénie","f","Eslovènia"],["Suède","f","Suècia"],["Suisse","f","Suïssa"],
  ["Tchéquie","f","Txèquia"],["Ukraine","f","Ucraïna"],["Turquie","f","Turquia"],["Géorgie","f","Geòrgia"],["Arménie","f","Armènia"],
  ["Danemark","m","Dinamarca"],["Kosovo","m","Kosovo"],["Liechtenstein","m","Liechtenstein"],["Luxembourg","m","Luxemburg"],["Monténégro","m","Montenegro"],
  ["Portugal","m","Portugal"],["Royaume-Uni","m","el Regne Unit"],["pays de Galles","m","el País de Gal·les"],["Vatican","m","el Vaticà"],["Azerbaïdjan","m","l'Azerbaidjan"],
  ["Pays-Bas","p","els Països Baixos"],
  ["Andorre","n","Andorra","en","d'"],["Chypre","n","Xipre","à","de"],["Malte","n","Malta","à","de"],["Monaco","n","Mònaco","à","de"],["Saint-Marin","n","Sant Marino","à","de"],
  /* Amèrica */
  ["Argentine","f","l'Argentina"],["Bolivie","f","Bolívia"],["Colombie","f","Colòmbia"],["Jamaïque","f","Jamaica"],["République dominicaine","f","la República Dominicana"],
  ["Brésil","m","el Brasil"],["Canada","m","el Canadà"],["Chili","m","Xile"],["Costa Rica","m","Costa Rica"],["Équateur","m","l'Equador"],["Guatemala","m","Guatemala"],
  ["Honduras","m","Hondures"],["Mexique","m","Mèxic"],["Nicaragua","m","Nicaragua"],["Panama","m","Panamà"],["Paraguay","m","el Paraguai"],["Pérou","m","el Perú"],
  ["Québec","m","el Quebec"],["Salvador","m","el Salvador"],["Uruguay","m","l'Uruguai"],["Venezuela","m","Veneçuela"],
  ["États-Unis","p","els Estats Units"],
  ["Cuba","n","Cuba","à","de"],["Haïti","n","Haití","en","d'"],
  /* Àfrica */
  ["Afrique du Sud","f","Sud-àfrica"],["Algérie","f","Algèria"],["Côte d'Ivoire","f","Costa d'Ivori"],["Égypte","f","Egipte"],["Éthiopie","f","Etiòpia"],
  ["Guinée","f","Guinea"],["Libye","f","Líbia"],["Mauritanie","f","Mauritània"],["Somalie","f","Somàlia"],["Tanzanie","f","Tanzània"],["Tunisie","f","Tunísia"],["Zambie","f","Zàmbia"],
  ["Angola","m","Angola"],["Bénin","m","Benín"],["Burkina Faso","m","Burkina Faso"],["Cameroun","m","el Camerun"],["Cap-Vert","m","Cap Verd"],["Congo","m","el Congo"],
  ["Gabon","m","el Gabon"],["Ghana","m","Ghana"],["Kenya","m","Kenya"],["Mali","m","Mali"],["Maroc","m","el Marroc"],["Mozambique","m","Moçambic"],["Niger","m","el Níger"],
  ["Nigeria","m","Nigèria"],["Ouganda","m","Uganda"],["Rwanda","m","Ruanda"],["Sénégal","m","el Senegal"],["Soudan","m","el Sudan"],["Tchad","m","el Txad"],
  ["Togo","m","Togo"],["Zimbabwe","m","Zimbàbue"],
  ["Madagascar","n","Madagascar","à","de"],
  /* Àsia */
  ["Arabie saoudite","f","l'Aràbia Saudita"],["Chine","f","la Xina"],["Corée du Nord","f","Corea del Nord"],["Corée du Sud","f","Corea del Sud"],["Inde","f","l'Índia"],
  ["Indonésie","f","Indonèsia"],["Jordanie","f","Jordània"],["Malaisie","f","Malàisia"],["Mongolie","f","Mongòlia"],["Syrie","f","Síria"],["Thaïlande","f","Tailàndia"],
  ["Afghanistan","m","l'Afganistan"],["Bangladesh","m","Bangladesh"],["Bhoutan","m","Bhutan"],["Cambodge","m","Cambodja"],["Irak","m","l'Iraq"],["Iran","m","l'Iran"],
  ["Japon","m","el Japó"],["Kazakhstan","m","el Kazakhstan"],["Koweït","m","Kuwait"],["Laos","m","Laos"],["Liban","m","el Líban"],["Népal","m","el Nepal"],
  ["Ouzbékistan","m","l'Uzbekistan"],["Pakistan","m","el Pakistan"],["Qatar","m","Qatar"],["Sri Lanka","m","Sri Lanka"],["Vietnam","m","el Vietnam"],["Yémen","m","el Iemen"],
  ["Émirats arabes unis","p","els Emirats Àrabs Units"],["Maldives","p","les Maldives"],["Philippines","p","les Filipines"],
  ["Israël","n","Israel","en","d'"],["Singapour","n","Singapur","à","de"],["Taïwan","n","Taiwan","à","de"],
  /* Oceania */
  ["Australie","f","Austràlia"],["Nouvelle-Zélande","f","Nova Zelanda"],["Papouasie-Nouvelle-Guinée","f","Papua Nova Guinea"],["Fidji","p","les Fiji"]]});
