



# Frontend - FrontOlympique

## Description
Ce projet représente le frontend d'une application de billetterie pour les Jeux Olympiques, développé avec React. Il permet aux utilisateurs de s'inscrire, se connecter, acheter des billets, et recevoir un e-ticket sous forme de QR code.

## Fonctionnalités principales
- Page d'accueil avec présentation des offres
- Authentification des utilisateurs avec gestion de session via JWT
- Ajout de billets au panier et gestion du paiement (mock de paiement)
- Réception d'un QR code comme e-ticket après l'achat
- Interface d'administration pour gérer les offres et les statistiques de ventes

## Technologies utilisées
- **Frontend** : React, Redux, React Router
- **Gestion de l'état** : Redux
- **Styling** : Styled-components

## Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation
1. Clonez le projet :
   ```bash
   git clone https://github.com/thugcoder972/FrontOlympique.git
   cd FrontOlympique
Installez les dépendances avec npm ou yarn :

npm install
ou

yarn install
Lancez le serveur de développement :

npm start
L'application sera accessible sur http://localhost:3000.

Structure des dossiers
src/components/ : Composants réutilisables de l'interface.
src/pages/ : Pages principales (Page d'accueil, Connexion, Inscription, etc.).
src/redux/ : Gestion de l'état avec Redux (actions, reducers).
src/styles/ : Styles avec Styled-components.
Routes principales
/ : Page d'accueil avec présentation des épreuves.
/login : Page de connexion pour les utilisateurs.
/signup : Page d'inscription pour les nouveaux utilisateurs.
/cart : Page du panier pour l'achat de billets.
/admin : Espace administrateur pour gérer les offres et consulter les statistiques de ventes.
Sécurité
Utilisation de JWT pour l'authentification et la gestion des sessions.
Stockage sécurisé du token JWT dans le stockage local du navigateur.
Mise en place de la protection contre les attaques XSS.
Auteurs
Terry Marie-Sainte
