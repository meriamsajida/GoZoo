## Synopsis

Application Web de géolocalisation des zoos.

Cette application utilise les technologies suivantes :
* [nodejs](https://nodejs.org)
* [angularjs](https://angularjs.org)
* [D3.js](http://d3js.org/)
* [threejs](http://threejs.org/)
* [MongoDB](https://www.mongodb.org/)

## Lancement de serveur (nodejs)

```
> node server.js
```

## Point d'entrée à l'application

```
http://localhost:8888/
```

## Structure du projet

* **node_modules** : les modules Nodejs utilisés dans le projet et installé via **npm**
 * [express](http://expressjs.com/) : c'est un framework pour créer des applications Web avec Node.js.
 * [fs](https://nodejs.org/api/fs.html) : permet d'intéragir avec le système des fichiers. Utilisé dans le projet pour lire le fichier JSON.
 * [mongodb](https://www.mongodb.org/) : la base de données utilisée dans la vue 2D.
 * [underscore](http://underscorejs.org) : utilisé pour sélectionner les données du fichier JSON on fonction du filtre utilisateur.
* **public** : le code HTML et Javascript de angularjs et les scripts 2D et 3D.
 * bower_components : contient les bibliothèques JavaScript utilisées dans la partie client de l'application :
  * d3 : bibliothèque utilisée dans l'affichage 2D.
  * three.js : bibliothèque utilisée dans l'affichage 3D.
  * angularjs : n'est pas téléchargé mais utilisé directement à partir de https://ajax.googleapis.com et https://code.angularjs.org
 * content : ce répertoire contient éléments statiques de l'application, par exemple les images.
 * js : contient les traitement JavaScript de la partie client de l'application.
  * controllers : contient les controlleurs Angularjs avec leur configuration.
  * three : contient de fichier JavaScript qui gére le rendu 3D.
  * client-app.js : ce fichier crée le module principal de Angularjs.
 * views : ce répertoire contient les vues Angularjs pour les trois rendues (1D, 2D et 3D) en plus de la page d'accueil.
 * index.html : c'est la page principal de l'application et qui joue le role de Layout.
* **server** : la partie serveur (nodejs) de l'application qui contient les routes pour filtrer les données JSON.
 * controllers : contient les controlleurs Nodejs.
 * data : contient les données JSON.
* **server.js** : le fichier principal à exécuter par Nodejs pour initialiser et démarrer le serveur Web.

## Contributeurs

**Bouhassi** et **Soltan**
