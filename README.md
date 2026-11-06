# OKOUME DIGITAL

Site de présentation d’agence construit avec React et Vite. La liste des projets est stockée dans `client/public/api/projects.json`, utilisée aussi bien par l’API Express en local que par l’hébergement statique Netlify.

## Prérequis

- Node.js 20 ou ultérieur
- npm

## Démarrer en développement

```powershell
npm.cmd install
npm.cmd run dev
```

Le site React est servi sur `http://localhost:5173` et l’API Express sur `http://localhost:3000`. L’API propose `GET /api/health` et `GET /api/projects`.

## Publication sur Netlify

Le fichier `netlify.toml` définit la commande de build, le dossier publié et la réécriture de `/api/projects` vers le JSON statique. Le site n’a ainsi pas besoin d’un serveur Express actif en production.

- Connecte le dépôt Git à Netlify.
- Netlify détecte la configuration et lance `npm run build`.
- Le site est publié sur une adresse Netlify gratuite ; un domaine personnalisé peut être relié ensuite.
- Le plan gratuit a des limites d’usage mensuelles ; consulte le tableau de bord Netlify pour suivre les crédits.

## Construire et lancer en production

```powershell
npm.cmd run build
npm.cmd start
```

Express sert alors les fichiers compilés et l’API sur le port `3000` (ou la valeur de la variable d’environnement `PORT`).

## À compléter avant publication

- Vérifie que le client autorise la diffusion des captures de King of Tacos avant publication.
- Choisis le nom définitif du SaaS universitaire avant d’enrichir sa fiche projet.
- Ajoute les liens sociaux officiels et vérifie les coordonnées avant publication.
- Valide les offres, les périmètres et les tarifs proposés séparément avant de les publier.

La fiche de King of Tacos décrit les tâches confirmées par le développeur, et la fiche du SaaS indique qu’il est en cours de conception. Le domaine `kingoftacos.com` est fourni comme lien externe.
