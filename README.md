# Backend - API de Films Favoris

## Description du Projet

Le backend est une API basée sur Node.js pour une application web de films favoris, permettant aux utilisateurs d'effectuer des opérations CRUD (Créer, Lire, Mettre à Jour, Supprimer) sur les entrées de films. Il prend en charge les propriétés de base des films (titre, date de sortie) avec un champ JSON de métadonnées extensible pour les améliorations futures. 

L'architecture utilise Express.js pour le routage, Sequelize ORM pour l'abstraction de base de données (initialement configuré pour MySQL, avec support pour basculer vers d'autres bases de données comme SQLite), et inclut des composants modulaires pour les modèles, contrôleurs et routes.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre système :

- Node.js (version 14 ou supérieure)
- npm (généralement installé avec Node.js)
- Une base de données MySQL (en fonction de votre configuration)

## Installation

1. Clonez le dépôt
   ```
   git clone git@github.com:ghrlt/pn-react-coding-test-backend
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

   Les dépendances clés incluent :
   - express (^5.1.0)
   - sequelize (^6.37.7)
   - mysql2 (^3.6.5)
   - sqlite3 (^5.1.7)
   - cors (^2.8.5)
   - dotenv (^17.2.3)

## Configuration de l'Environnement

1. Copiez le fichier d'exemple des variables d'environnement :
   ```
   cp .env.example .env
   ```

2. Modifiez le fichier `.env` avec vos propres valeurs. Les variables d'environnement requises sont :
   - `PORT` : Port sur lequel le serveur tournera (par défaut 3000)
   - `DB_DIALECT` : Dialecte de la base de données (par exemple, mysql ou sqlite)

   Pour une configuration MySQL, vous aurez également besoin de :
   - `DB_HOST` : Hôte de la base de données
   - `DB_USER` : Utilisateur de la base de données
   - `DB_PASSWORD` : Mot de passe de la base de données
   - `DB_NAME` : Nom de la base de données
   - `DB_PORT` : Port de la base de données (par défaut 3306 pour MySQL)

   Exemple pour MySQL :
   ```
   PORT=3000
   DB_DIALECT=mysql
   DB_HOST=localhost
   DB_USER=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=movies_db
   DB_PORT=3306
   ```

   Exemple pour SQLite :
   ```
   PORT=3000
   DB_DIALECT=sqlite
   DB_STORAGE=./database.sqlite
   ```

## Lancement de l'Application

1. Assurez-vous que votre base de données est en cours d'exécution et accessible.

2. Lancez le serveur :
   ```
   npm start
   ```

   Le serveur démarrera sur le port spécifié dans `PORT` (par défaut 3000). Le point d'entrée principal est `server.js`, qui initialise la base de données, teste la connexion et démarre le serveur Express.

## Points de Terminaison API

L'API expose des points de terminaison pour les opérations CRUD sur les films via `/api/movies`. Voici un aperçu :

- `GET /api/movies` : Récupérer la liste de tous les films
- `POST /api/movies` : Créer un nouveau film
- `GET /api/movies/:id` : Récupérer un film spécifique par ID
- `PUT /api/movies/:id` : Mettre à jour un film spécifique par ID
- `DELETE /api/movies/:id` : Supprimer un film spécifique par ID

Pour plus de détails sur les schémas de requête et de réponse, consultez la documentation des routes dans `routes/movies.js` et les contrôleurs dans `controllers/movieController.js`.

## Structure du Projet

- `server.js` : Point d'entrée principal pour initialiser et démarrer le serveur.
- `app.js` : Définit l'application Express, y compris les middlewares et le montage des routes.
- `config/database.js` : Configuration de la base de données avec Sequelize.
- `models/movie.js` : Modèle Sequelize pour les films.
- `controllers/movieController.js` : Logique métier pour les opérations sur les films.
- `routes/movies.js` : Définition des routes API pour les films.

## Dépannage

- Si vous rencontrez des problèmes de connexion à la base de données, vérifiez vos variables d'environnement et assurez-vous que la base de données est en cours d'exécution.
