# Challenge Le Closet

### Consignes générales

- cloner ce repo (_ne pas_ le forker)
- créer un repo personnel (nous envoyer le lien dès le début de l'exercice)
- faire des commits clairs et pertinents

N'hésitez pas à faire du _[shameless](https://blog.red-badger.com/2014/08/20/i-spent-3-days-with-sandi-metz-heres-what-i-learned) code_ dans un premier temps. Et si c'est le cas, commit le séparemment ! Vous ne serez pas pénalisé, bien au contraire.

Le boilerplate pour l'exercice utilise Rails 5.2.1, Ruby 2.4.3 & React 16

Lancer le back (port 3000) :

```bash
cd server
bundle install
rails db:setup
rails s
```

Lancer le front (port 3001) :

```bash
cd client
npm install
npm start
```

### Description du projet

Vous êtes une entreprise d'envoi de vêtements. Votre catalogue se compose de plusieurs produits (_Product_) et d'un certain nombre de pièces pour chaque produit (_Item_). Par exemple, il y a le **produit** Robe Rouge, et dans vos stocks vous disposez de 20 **items** (ou 20 **pièces**) correspondant à ce produit.

Il y a trois étapes avant l'envoi d'une pièce qui correspondent aux trois *Poste*s logistiques :

- le _picking_ où un opérateur sort les pièces nécessaires des stocks
- le _checking_ où un opérateur contrôle la qualité des pièces
- le _packing_ où un opérateur empacte la pièce et imprime le bordereau pour l'envoi

Au début de la journée, un opérateur (_Operator_) est affecté à un _Poste_ (l'_OperatorPoste_ correspondant est créé à ce moment là).

### Travail demandé

_L'énoncé est volontairement très succinct. Nous souhaitons vous laisser le maximum de liberté sur les choix techniques. Si les choix effectués dans le boilerplate de l'application ne vous conviennent pas, vous êtes libres de les changer._

Votre CEO adoré aimerait mieux suivre les opérations et vous demande d'imaginer puis d'implementer une solution.  
Plus exactement, il voudrait tracker le plus précisément possible chaque étape logistique (c'est-à-dire, à partir de la lecture de la base de données, pouvoir récupérer l'information _telle pièce a été pické par X, checké par Y et n'a pas encore été packé_ par exemple).  

Il n'est pas nécessaire d'implémenter la partie FRONT sur cette partie, une fois la solution élaborée en BACK, seedez là pour la suite de l'exercice.  

A la fin de la journée, chaque opérateur se verra attribuer _automatiquement_ un certain nombre de points suivant le nombre de pièces qu'il a traité. Un opérateur peut suivre l'évolution de ses points dans un dashboard personnel.

### Allez plus loin

_Cette section n'est pas nécessaire à la résolution du test. Voici quelques idées néamoins si vous voulez en faire plus._

- Refacto, toujours plus de refacto ... (code du boilerplate aussi)
- Si la réponse à la question "Est-ce que ma solution marche toujours si je rajoute une 4ème étape logisique ?" est non, faire en sorte qu'elle le devienne !
- La partie FRONT pour qu'un opérator puisse en direct _picker_, _checker_ ou _packer_ une pièce
