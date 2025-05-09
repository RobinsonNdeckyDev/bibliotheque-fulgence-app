# Bibliothèque Fulgence - Application Frontend

Application web Angular permettant la gestion d'une bibliothèque avec système d'authentification et différents rôles utilisateurs (admin, auteur, etc.).

## 🚀 Fonctionnalités

- **Authentification**
  - Login/Logout sécurisé
  - Gestion des rôles (SUPER_ADMIN, ADMIN, AUTEUR)
  - Protection des routes avec guards
  - Intercepteur HTTP pour gestion des tokens

- **Dashboard Admin**
  - Vue d'ensemble statistique
  - Gestion des auteurs
  - Gestion du catalogue de livres
  - Graphiques et tableaux de bord

- **Espace Auteur** 
  - Gestion de ses propres livres
  - Statistiques personnalisées
  - Mise à jour de son profil

## 🛠️ Technologies utilisées

- Angular 19.2
- PrimeNG 19.1 (UI Components)
- TailwindCSS
- Bootstrap Icons
- Chart.js
- NgRx Toastr

## 📋 Prérequis

- Node.js >= 18
- Angular CLI >= 19.2
- API Backend en cours d'exécution

## ⚙️ Installation

1. Cloner le repository
```bash
git clone https://github.com/your-username/bibliotheque-fulgence-app.git
```

2. Installer les dépendances
```bash
cd bibliotheque-fulgence-app
npm install
```

3. Configuration
- Copier `src/environments/environment.example.ts` vers `src/environments/environment.ts`
- Modifier l'URL de l'API dans `environment.ts`

4. Lancer l'application en développement
```bash
ng serve
```

L'application sera accessible à l'adresse `http://localhost:4200`

## 🏗️ Structure du projet

```
src/
├── app/
│   ├── core/           # Services, guards, interceptors
│   ├── layouts/        # Templates de mise en page
│   ├── shared/         # Composants réutilisables
│   └── views/          # Pages principales
│       ├── admin/      # Zone administrateur
│       ├── auth/       # Login/Register
│       └── client/     # Zone auteur
│   ├── BD/bibliotheque_db           # fichier db à importer dans xampp
├── assets/            # Images, fichiers statiques
└── environments/      # Configuration par environnement
```

## 🔧 Scripts disponibles

- `npm start` : Lance le serveur de développement
- `npm run build` : Crée une version de production
- `npm test` : Lance les tests unitaires
- `npm run lint` : Vérifie le code avec ESLint

## 🤝 Contribution

1. Forker le projet
2. Créer une branche pour votre fonctionnalité
```bash
git checkout -b feature/AmazingFeature
```
3. Commiter vos changements
```bash
git commit -m 'Add some AmazingFeature'
```
4. Pusher sur la branche
```bash
git push origin feature/AmazingFeature
```
5. Ouvrir une Pull Request

## 🔗 API Backend

Cette application se connecte à une API REST développée avec Spring Boot. 
Le repository du backend est disponible ici : https://github.com/RobinsonNdeckyDev/api-biblio-fulgence-app.git


## 🙏 Remerciements

- PrimeNG pour leur excellente bibliothèque de composants
- La communauté Angular pour leur support
