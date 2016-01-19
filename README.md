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

* node_modules : les modules Nodejs utilisés dans le projet et installé via **npm**
 * [express](http://expressjs.com/) : c'est un framework pour créer des applications Web avec Node.js.
 * [fs](https://nodejs.org/api/fs.html) : permet d'intéragir avec le système des fichiers. Utilisé dans le projet pour lire le fichier JSON.
 * [mongodb](https://www.mongodb.org/) : la base de données utilisée dans la vue 2D.
 * [underscore](http://underscorejs.org) : utilisé pour sélectionner les données du fichier JSON on fonction du filtre utilisateur.
* public : le code HTML et Javascript de angularjs et les scripts 2D et 3D.
* server : la partie serveur (nodejs) de l'application qui contient les routes pour filtrer les données JSON.
* server.js : le fichier à exécuter par Nodejs.

## Contributeurs

**Bouhassi** et **Soltan**
