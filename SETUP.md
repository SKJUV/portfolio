# 📖 Guide de Setup Détaillé

> Guide pas-à-pas complet pour configurer et personnaliser votre portfolio.

---

## Table des matières

1. [Prérequis détaillés](#1--prérequis-détaillés)
2. [Installation locale](#2--installation-locale)
3. [Configuration Supabase complète](#3--configuration-supabase-complète)
4. [Personnalisation des données](#4--personnalisation-des-données)
5. [Configuration du chatbot Gemini](#5--configuration-du-chatbot-gemini)
6. [Déploiement Vercel étape par étape](#6--déploiement-vercel-étape-par-étape)
7. [Domaine personnalisé](#7--domaine-personnalisé)
8. [Personnalisation visuelle](#8--personnalisation-visuelle)
9. [Maintenance et mises à jour](#9--maintenance-et-mises-à-jour)
10. [Dépannage](#10--dépannage)

---

## 1 — Prérequis détaillés

### Node.js

```bash
# Vérifier la version
node --version  # doit être ≥ 18

# Installer via nvm (recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Comptes nécessaires (tous gratuits)

| Service | Usage | Inscription |
|---|---|---|
| **GitHub** | Héberger le code source | [github.com](https://github.com/) |
| **Supabase** | Base de données + storage images | [supabase.com](https://supabase.com/) |
| **Vercel** | Hébergement + déploiement auto | [vercel.com](https://vercel.com/) |
| **Google AI Studio** | Chatbot IA (optionnel) | [aistudio.google.com](https://aistudio.google.com/) |

---

## 2 — Installation locale

### Cloner le projet

```bash
git clone https://github.com/SKJUV/portfolio.git my-portfolio
cd my-portfolio
```

### Installer les dépendances

```bash
npm install
```

### Créer le fichier d'environnement

```bash
cp .env.example .env.local
```

### Configuration minimale (développement local)

Pour un fonctionnement **local sans Supabase**, seules 2 variables sont nécessaires :

```env
ADMIN_PASSWORD=admin123
ADMIN_SECRET=ma_cle_secrete_de_test
```

> En développement, les données sont lues/écrites dans `src/data/portfolio-data.json`.

### Préparer vos données

```bash
# Copier le template comme point de départ
cp src/data/portfolio-data.template.json src/data/portfolio-data.json
```

### Lancer le serveur

```bash
npm run dev
```

Vérifier :
- ✅ Portfolio → [http://localhost:3000](http://localhost:3000)
- ✅ Admin → [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- ✅ Se connecter avec `ADMIN_PASSWORD`

---

## 3 — Configuration Supabase complète

### 3.1 Créer un projet

1. Aller sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Cliquer **New project**
3. Choisir :
   - **Name** : `my-portfolio` (ou ce que vous voulez)
   - **Database Password** : Générer un mot de passe fort (le sauvegarder)
   - **Region** : Celle la plus proche de vous
4. Attendre la création (~2 min)

### 3.2 Exécuter le schéma SQL

1. Dans le dashboard Supabase, aller dans **SQL Editor**
2. Cliquer **New query**
3. Copier/coller le contenu complet de `supabase-schema.sql`
4. Cliquer **Run**

Résultat attendu :

```
✅ Success. No rows returned
```

Ce script crée :

| Élément | Description |
|---|---|
| `portfolio_data` | Table JSONB (id=1) stockant toutes vos données |
| `page_views` | Table analytics (tracking des visites) |
| `uploads` | Bucket Storage public (images) |
| Policies RLS | Lecture publique, écriture service_role |
| Trigger | Auto-update `updated_at` sur modification |

### 3.3 Récupérer les clés

1. Aller dans **Settings > API**
2. Copier :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** (sous "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **IMPORTANT** : Utilisez la clé `service_role` (secret), PAS la clé `anon` (public). La clé anon est bloquée par les policies RLS pour l'écriture.

### 3.4 Mettre à jour .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.5 Vérifier le fonctionnement

Relancer le serveur (`npm run dev`), puis :

1. Aller dans l'admin → Modifier un projet → Sauvegarder
2. Vérifier dans Supabase > Table Editor > `portfolio_data` que les données sont là

---

## 4 — Personnalisation des données

### Via le fichier JSON

Éditer `src/data/portfolio-data.json`. Structure complète :

```jsonc
{
  "settings": {
    "siteTitle": "Votre Nom — Votre Titre",       // ← Titre SEO
    "siteTitle_en": "Your Name — Your Title",       // ← Version anglaise
    "heroTitle": "Votre Nom",                        // ← Affiché dans le hero
    "heroSubtitle": "🚀 Votre Titre",               // ← Sous-titre
    "contactEmail": "you@example.com",
    "contactGithub": "https://github.com/votre-user",
    "contactLinkedin": "https://linkedin.com/in/votre-profil"
  },
  "sections": [
    // Activer/désactiver des sections en mettant "enabled": false
    { "id": "security", "enabled": true, "order": 0 },
    { "id": "projects", "enabled": true, "order": 1 }
    // ...
  ],
  "projects": [
    {
      "id": "unique-id",
      "title": "Mon Super Projet",
      "title_en": "My Great Project",             // Chaque champ a sa version _en
      "stack": ["React", "Node.js"],
      "githubUrl": "https://github.com/..."
    }
  ],
  "terminalLines": [
    { "command": "$ whoami", "output": "votre_pseudo — votre_role" }
    // Ces lignes s'affichent dans le terminal du hero
  ],
  "chatBotSettings": {
    "botName": "Mon Assistant",
    "welcomeMessage": "Bonjour ! Posez-moi vos questions..."
  }
}
```

### Via l'admin CMS

1. Lancer `npm run dev`
2. Aller à [localhost:3000/admin](http://localhost:3000/admin)
3. Naviguer dans les différentes pages pour modifier votre contenu
4. Chaque sauvegarde met à jour automatiquement Supabase (ou le JSON local)

### Système bilingue (i18n)

Chaque champ texte a une version `_en` :
- `title` → affiché en français
- `title_en` → affiché en anglais quand l'utilisateur switch

Si `title_en` est vide, le français est affiché par défaut.

---

## 5 — Configuration du chatbot Gemini

### 5.1 Obtenir une clé API

1. Aller sur [aistudio.google.com](https://aistudio.google.com/)
2. Se connecter avec un compte Google
3. Cliquer **Get API key** → **Create API key**
4. Copier la clé

### 5.2 Configurer

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 5.3 Enrichir le contexte (optionnel)

Le chatbot utilise 2 sources de contexte :

1. **portfolio-data.json** — Vos données (automatique)
2. **github-repos.json** — Vos repos GitHub avec README

Pour alimenter `github-repos.json`, vous pouvez utiliser l'API GitHub :

```bash
# Exemple simple avec curl
curl -s "https://api.github.com/users/VOTRE_USER/repos?per_page=50" \
  | jq '[.[] | {name, description, language, html_url}]' \
  > src/data/github-repos.json
```

### 5.4 Personnaliser le comportement

Dans l'admin → **Chatbot IA** :
- **Nom** : Nom affiché du bot
- **Message d'accueil** : Premier message affiché
- **Message hors-sujet** : Quand la question est hors contexte
- **Placeholder** : Texte du champ de saisie

### Sans clé Gemini

Le chatbot fonctionne quand même avec des réponses pré-programmées basées sur vos données.

---

## 6 — Déploiement Vercel étape par étape

### 6.1 Préparer le repository GitHub

```bash
# Initialiser git (si pas déjà fait)
git init
git add -A
git commit -m "Initial commit"

# Créer le repo sur GitHub puis pousser
git remote add origin https://github.com/VOTRE_USER/mon-portfolio.git
git push -u origin main
```

### 6.2 Connecter à Vercel

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → Sélectionner votre repo
3. Vercel détecte automatiquement Next.js
4. Cliquer **Deploy** (ça échouera la première fois sans les env vars, c'est normal)

### 6.3 Ajouter les variables d'environnement

Dans Vercel > **Settings > Environment Variables**, ajouter :

| Clé | Valeur | Environnement |
|---|---|---|
| `ADMIN_PASSWORD` | Votre mot de passe | Production |
| `ADMIN_SECRET` | `openssl rand -hex 32` | Production |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Production |
| `GEMINI_API_KEY` | `AIzaSy...` (optionnel) | Production |

### 6.4 Redéployer

1. Aller dans **Deployments** → Cliquer sur le dernier déploiement
2. **Redeploy** → Confirmer

Votre site est maintenant live sur `your-project.vercel.app` !

---

## 7 — Domaine personnalisé

### 7.1 Sur Vercel

1. **Settings > Domains** → Ajouter votre domaine (ex: `mon-portfolio.com`)
2. Vercel affiche les enregistrements DNS nécessaires

### 7.2 Chez votre registrar

Ajouter ces enregistrements DNS :

| Type | Nom | Valeur |
|---|---|---|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

> La propagation DNS peut prendre 5 min à 48h.

### 7.3 SSL

Vercel génère automatiquement un certificat SSL Let's Encrypt. Aucune configuration nécessaire.

---

## 8 — Personnalisation visuelle

### Thème public (portfolio)

Fichier : `src/app/globals.css`

```css
/* Mode clair */
:root {
  --primary: 152 70% 35%;        /* Couleur principale (vert) */
  --accent: 200 80% 45%;          /* Couleur accent (bleu) */
  --background: 210 20% 98%;      /* Fond clair */
  --foreground: 220 20% 10%;      /* Texte */
}

/* Mode sombre */
.dark {
  --primary: 152 100% 50%;        /* Vert néon */
  --accent: 195 90% 55%;
  --background: 240 15% 5%;       /* Fond sombre */
  --foreground: 0 0% 90%;
}
```

> Les valeurs sont en format HSL (Hue Saturation% Lightness%).

### Thème admin

Fichier : `src/app/admin/admin-theme.css`

Le thème admin est 100% indépendant. Modifier les mêmes variables CSS pour l'admin.

### Exemples de palettes

| Thème | `--primary` light | `--primary` dark |
|---|---|---|
| 🟢 Vert (défaut) | `152 70% 35%` | `152 100% 50%` |
| 🔵 Bleu | `220 90% 56%` | `220 90% 62%` |
| 🟣 Violet | `270 80% 55%` | `270 90% 65%` |
| 🟠 Orange | `30 95% 50%` | `30 100% 55%` |
| 🔴 Rouge | `0 80% 50%` | `0 90% 55%` |

---

## 9 — Maintenance et mises à jour

### Mettre à jour les données

Les modifications dans l'admin sont persistées dans Supabase. Aucune action manuelle.

### Mettre à jour le template

```bash
# Ajouter le repo original comme remote
git remote add upstream https://github.com/SKJUV/portfolio.git

# Récupérer les dernières mises à jour
git fetch upstream
git merge upstream/main

# Résoudre les conflits éventuels puis pousser
git push
```

### Sauvegarder les données

```bash
# Exporter les données depuis Supabase
curl "https://xxx.supabase.co/rest/v1/portfolio_data?select=data" \
  -H "apikey: VOTRE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer VOTRE_SERVICE_ROLE_KEY" \
  > backup.json
```

---

## 10 — Dépannage

### Le site affiche une erreur 500

1. Vérifier les logs Vercel (Deployments > Functions)
2. Vérifier que toutes les variables d'environnement sont set
3. Vérifier que le schéma SQL a été exécuté dans Supabase

### L'admin ne se connecte pas

1. Vérifier `ADMIN_PASSWORD` et `ADMIN_SECRET` dans les env vars
2. Vérifier que le middleware n'est pas en erreur
3. Essayer en navigation privée (cookies)

### Les données ne s'affichent pas

1. Vérifier `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`
2. Vérifier que le schéma SQL a été exécuté
3. Vérifier dans Supabase > Table Editor > `portfolio_data` que la ligne id=1 existe

### Les images ne s'affichent pas

1. Vérifier que le bucket `uploads` existe dans Supabase Storage
2. Vérifier que le bucket est public
3. Vérifier `next.config.ts` — le domaine Supabase doit être dans `images.remotePatterns`

### Le chatbot ne fonctionne pas

1. Sans `GEMINI_API_KEY` : le chatbot utilise des réponses statiques, c'est normal
2. Avec clé : Vérifier la clé sur [aistudio.google.com](https://aistudio.google.com/)
3. Quota dépassé : Google AI Studio a des limites gratuites (60 RPM)

### PostgREST schema cache

Si une table existe dans Supabase mais l'API retourne "relation not found" :

```sql
-- Exécuter dans SQL Editor
NOTIFY pgrst, 'reload schema';
```

---

## 📞 Support

Si vous avez des questions :

1. Ouvrir une **Issue** sur GitHub
2. Consulter la **FAQ** dans le README
3. Contacter le créateur du template

---

<div align="center">

Guide rédigé par [SINENG KENGNI Juvenal](https://sineng-juvenal.me)

</div>
