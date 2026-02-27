# 🛡️ Portfolio — SINENG KENGNI Juvenal

> Cybersecurity Enthusiast & Full-Stack Developer

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Storage-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)](https://vercel.com/)

Portfolio professionnel avec un dashboard admin CMS intégré, un chatbot IA alimenté par Gemini et un stockage cloud via Supabase. Conçu pour être entièrement administrable sans toucher au code.

🔗 **Live** : [sineng-juvenal.me](https://sineng-juvenal.me)

---

## 📸 Aperçu

| Portfolio (Dark) | Admin Dashboard |
|:---:|:---:|
| Page d'accueil avec terminal animé, sections dynamiques | Dashboard CMS complet avec gestion de contenu |

---

## ✨ Fonctionnalités

### 🌐 Portfolio Public
- **Hero animé** avec terminal interactif simulant des commandes shell
- **Sections dynamiques** : Sécurité, Projets, Certifications, Compétences, Profil, Vision & Passions
- **Cartes projets** avec stack technique, liens GitHub/démo et points de sécurité
- **Navbar dynamique** qui s'adapte aux sections activées dans l'admin
- **Thème sombre/clair** avec basculement fluide (next-themes)
- **Formulaire de contact** avec stockage des messages
- **100% responsive** (mobile, tablette, desktop)

### 🤖 Chatbot IA (Gemini)
- **Google Gemini 2.5 Flash** avec fallback automatique (2.0-flash, 2.0-flash-lite)
- **Contexte enrichi** : toutes les données du portfolio + 31 repos GitHub avec README
- **Rendu Markdown** : gras, italique, code, liens, listes
- **Historique de conversation** conservé dans la session
- **Fallback local** : réponses pré-programmées si Gemini n'est pas configuré
- **Limité au portfolio** : ne répond qu'aux questions sur Juvenal et ses projets

### 🔐 Admin Dashboard (CMS)
- **Authentification sécurisée** : HMAC-SHA256 cookies (Node crypto + Web Crypto API pour Edge)
- **Middleware de protection** sur toutes les routes `/admin` et `/api/admin`
- **Pages d'administration** :
  - 📊 **Dashboard** — Vue d'ensemble avec statistiques
  - 📑 **Sections** — Activer/désactiver, réordonner les sections du portfolio
  - 💼 **Projets** — CRUD complet avec upload d'images
  - 🏅 **Certifications** — Gestion avec upload images et PDF
  - ⚙️ **Technologies** — Gérer la stack technique par catégorie
  - 💬 **Messages** — Lire les messages du formulaire de contact
  - 🤖 **Chatbot** — Configurer le comportement de l'IA
  - ⚡ **Paramètres** — SEO, titre, description, liens sociaux
- **Thème admin isolé** : palette bleue indépendante du thème portfolio (vert)
- **Responsive** : utilisable sur mobile

### ☁️ Infrastructure
- **Dual-mode storage** : Supabase en production, JSON local en développement
- **Supabase** : table JSONB unique (`portfolio_data`) + bucket Storage (`uploads`)
- **Auto-seed** : données initiales injectées automatiquement depuis le JSON local
- **Vercel-ready** : détection automatique du filesystem read-only
- **Images distantes** : support `*.supabase.co` dans Next.js Image

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx                    # Page principale du portfolio
│   ├── layout.tsx                  # Layout racine + metadata SEO
│   ├── globals.css                 # Thèmes (portfolio + admin) + animations
│   ├── admin/
│   │   ├── layout.tsx              # Layout admin avec sidebar
│   │   ├── page.tsx                # Dashboard
│   │   ├── certifications/         # Gestion certifications
│   │   ├── chatbot/                # Configuration chatbot
│   │   ├── login/                  # Page de connexion
│   │   ├── messages/               # Messages reçus
│   │   ├── projects/               # Gestion projets
│   │   ├── sections/               # Ordre & activation des sections
│   │   ├── settings/               # Paramètres globaux
│   │   └── stacks/                 # Technologies
│   └── api/
│       ├── admin/                  # Routes protégées (auth, CRUD, upload)
│       ├── chat/                   # Chatbot Gemini AI
│       ├── contact/                # Formulaire de contact
│       └── portfolio/              # API publique avec cache
├── components/
│   ├── AIChatBot.tsx               # Chatbot flottant avec rendu markdown
│   ├── CertificationsSection.tsx   # Section certifications (images + PDF)
│   ├── Hero.tsx                    # Hero avec terminal animé
│   ├── Navbar.tsx                  # Navigation dynamique
│   ├── ProjectCard.tsx             # Carte projet
│   ├── ProjectsSection.tsx         # Grille de projets
│   ├── SecuritySection.tsx         # Pratiques de sécurité
│   ├── SkillsSection.tsx           # Compétences techniques
│   ├── ProfileSection.tsx          # Profil informatique
│   ├── VisionSection.tsx           # Vision & passions
│   ├── Terminal.tsx                # Terminal interactif
│   ├── ThemeToggle.tsx             # Bouton dark/light
│   └── Footer.tsx                  # Pied de page
├── data/
│   ├── portfolio-data.json         # Données initiales du portfolio
│   └── github-repos.json           # 31 repos GitHub enrichis (README, langages)
├── lib/
│   ├── admin-types.ts              # Types TypeScript (Certification, Project, etc.)
│   ├── auth.ts                     # Authentification HMAC
│   ├── data-manager.ts             # Gestionnaire dual-mode (Supabase/JSON)
│   ├── data.ts                     # Données statiques legacy
│   ├── supabase.ts                 # Client Supabase admin
│   └── types.ts                    # Types partagés
├── providers/
│   └── ThemeProvider.tsx           # Provider next-themes
└── middleware.ts                   # Protection routes admin (Edge)
```

---

## 🚀 Installation

### Prérequis

- **Node.js** ≥ 18
- **npm** ou **yarn**
- (Optionnel) Compte [Supabase](https://supabase.com) + [Google AI Studio](https://aistudio.google.com)

### 1. Cloner le projet

```bash
git clone https://github.com/SKJUV/portfolio.git
cd portfolio
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Remplir les valeurs dans `.env.local` :

```env
# Admin Dashboard
ADMIN_PASSWORD=votre_mot_de_passe_admin
ADMIN_SECRET=votre_cle_secrete_hmac    # openssl rand -hex 32

# Supabase (optionnel en dev, requis pour Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Gemini AI (optionnel — active le chatbot intelligent)
GEMINI_API_KEY=AIzaSy...
```

### 4. Configurer Supabase (production)

Exécuter le schéma SQL dans l'éditeur Supabase :

```bash
cat supabase-schema.sql
# → Copier/coller dans Supabase > SQL Editor > New query > Run
```

Cela crée :
- Table `portfolio_data` (JSONB, auto-seed)
- Bucket Storage `uploads` (public)
- Policies RLS (lecture publique, écriture service_role)

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

Admin : [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🌍 Déploiement (Vercel)

### 1. Importer le repo sur Vercel

Connecter le repo GitHub sur [vercel.com/new](https://vercel.com/new).

### 2. Variables d'environnement

Ajouter dans Vercel > Settings > Environment Variables :

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe admin |
| `ADMIN_SECRET` | Clé HMAC (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé **service_role** (pas anon !) |
| `GEMINI_API_KEY` | Clé API Google AI Studio |

### 3. Déployer

Chaque push sur `main` déclenche un déploiement automatique.

> ⚠️ **Important** : Utiliser la clé **service_role** de Supabase (pas la clé anon). La clé anon est bloquée par les policies RLS.

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| **Next.js 15** (App Router) | Framework React SSR/SSG |
| **TypeScript 5** | Typage statique |
| **Tailwind CSS 3.4** | Styling utility-first |
| **Supabase** | Base de données (JSONB) + Storage (images/PDF) |
| **Google Gemini 2.5 Flash** | Chatbot IA avec fallback multi-modèles |
| **next-themes** | Thème sombre/clair |
| **Lucide React** | Icônes |
| **Vercel** | Hébergement + CI/CD |

---

## 🔒 Sécurité

- **Authentification HMAC-SHA256** avec cookies `httpOnly` + `secure` + `sameSite`
- **Middleware Edge** protégeant toutes les routes `/admin` et `/api/admin`
- **Validation des fichiers** : types MIME whitelist + limite de taille (5 Mo images, 10 Mo PDF)
- **RLS Supabase** : lecture publique, écriture uniquement via `service_role`
- **Variables sensibles** : jamais exposées côté client (`SUPABASE_SERVICE_ROLE_KEY` server-only)
- **Limite de messages** chatbot : max 1000 caractères par requête

---

## 📝 Scripts

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production
npm run start     # Serveur de production
npm run lint      # Vérification ESLint
```

---

## 🤝 Contact

- **Email** : sinengjuvenal@gmail.com
- **GitHub** : [github.com/SKJUV](https://github.com/SKJUV)
- **LinkedIn** : [linkedin.com/in/juvenal-sineng-kengni](https://www.linkedin.com/in/juvenal-sineng-kengni)

---

<div align="center">

**Fait avec ❤️ par Juvenal SINENG KENGNI**

*🛡️ Passionné de cybersécurité • 💻 Développeur Full-Stack*

</div>
