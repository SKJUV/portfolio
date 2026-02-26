import type { Project, SecuritySkill, SkillCategory, ProfileCategory } from "./types";

export const terminalLines = [
  { command: "$ whoami", output: "juvenal_sineng — security_enthusiast && full_stack_dev" },
  { command: "$ uname -a", output: "Manjaro Linux | Zorin OS Pro | Windows 11 Pro" },
  { command: "$ cat /etc/skills", output: "JWT · RBAC · HSTS · Docker Hardening · OWASP Top 10" },
  { command: "$ nmap --top-ports passion", output: "PORT 443/tcp — Sécuriser chaque ligne de code 🔐" },
  { command: "$ echo $LEVEL", output: "Intermédiaire en progression rapide → Constructeur de compétences" },
];

export const securitySkills: SecuritySkill[] = [
  {
    icon: "🔐",
    title: "Authentification & Autorisation",
    description: "JWT personnalisé avec rotation de tokens, RBAC granulaire, multi-tenancy sécurisé, OAuth PKCE flow.",
    tags: ["JWT Custom Claims", "Token Rotation", "RBAC", "Multi-tenant", "OAuth PKCE", "Spotify API"],
  },
  {
    icon: "🛡️",
    title: "Hardening Web & HTTP",
    description: "HSTS preload, X-Frame-Options DENY, XSS Filter, CSRF protection.",
    tags: ["HSTS 1 an", "X-Frame DENY", "XSS Filter", "CSRF Secure", "Content-Type Nosniff", "SSL Redirect"],
  },
  {
    icon: "🐳",
    title: "Sécurité Infrastructure",
    description: "Dockerfiles multi-stage, exécution non-root, healthchecks, Sentry, CORS strict.",
    tags: ["Docker Non-Root", "Multi-Stage Build", "Sentry", "CORS Strict", "Gunicorn", "Healthcheck"],
  },
  {
    icon: "📋",
    title: "Audit & Conformité",
    description: "Audit trail complet, conformité OHADA/CNPS, soft-delete.",
    tags: ["Audit Log", "OHADA", "CNPS", "Traçabilité IP", "Soft Delete"],
  },
  {
    icon: "🗄️",
    title: "Sécurité BDD",
    description: "Row Level Security, requêtes préparées PDO, BCrypt hashing.",
    tags: ["RLS", "Prepared Statements", "BCrypt", "Access Policies", "PDO"],
  },
  {
    icon: "🔍",
    title: "OWASP & Pentesting",
    description: "OWASP Top 10, Hack The Box, VPN, culture cybersécurité.",
    tags: ["OWASP Top 10", "Hack The Box", "VPN", "Input Validation", "Least Privilege"],
  },
];

export const projects: Project[] = [
  {
    id: "sirh",
    title: "SIRH SaaS (projetHMRS)",
    subtitle: "Plateforme complète multi-tenant pour la zone CEMAC",
    description:
      "Système d'Information RH complet avec authentification JWT custom, RBAC granulaire par module:action, moteur de paie avec règles fiscales CNPS/IRPP, recrutement ATS, gestion des congés et audit trail. Architecture sécurisée de bout en bout avec isolation multi-tenant.",
    badge: "Security-First Architecture",
    badgeType: "security",
    stack: ["Django 6", "DRF", "PostgreSQL 16", "Redis", "Celery", "Next.js", "Docker", "Sentry"],
    securityPoints: [
      "JWT custom claims",
      "RBAC module:action",
      "Multi-tenancy TenantMiddleware",
      "HSTS preload + X-Frame DENY",
      "Docker multi-stage non-root",
      "Audit trail IP",
      "Soft-delete OHADA/CNPS",
      "Token rotation + blacklist",
    ],
    githubUrl: "https://github.com/SKJUV/projetHMRS",
  },
  {
    id: "solaire",
    title: "Solaire CM Connect ☀️ (sollar-CM)",
    subtitle: "Plateforme solaire avec marketplace pour le Cameroun",
    description:
      "Application de calcul de besoins énergétiques solaires, marketplace d'équipements et annuaire de fournisseurs/techniciens certifiés. Sécurité native via Supabase avec Row Level Security sur toutes les tables.",
    badge: "Row Level Security",
    badgeType: "security",
    stack: ["React", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL"],
    securityPoints: [
      "RLS sur toutes les tables",
      "Auth Supabase",
      "Politiques auth.uid()",
      "Schema SQL contraintes",
    ],
    githubUrl: "https://github.com/SKJUV/sollar-CM",
  },
  {
    id: "prouy1",
    title: "ProUY1 (proUY1)",
    subtitle: "Système de gestion universitaire Yaoundé 1",
    description:
      "Application de gestion des diplômes, attestations et PV pour l'Université de Yaoundé 1. Génération PDF en masse, gestion des étudiants, filtrage avancé et panneau d'administration avec contrôle d'accès par rôle.",
    badge: "Système Universitaire",
    badgeType: "university",
    stack: ["PHP", "MySQL/MariaDB", "FPDF/FPDI", "Bootstrap", "jQuery"],
    securityPoints: [
      "Auth sessions + RBAC",
      "BCrypt",
      "htmlspecialchars XSS",
      "PDO prepared statements",
      "Contrôle accès admin",
    ],
    githubUrl: "https://github.com/SKJUV/proUY1",
  },
  {
    id: "educonverse",
    title: "EduConverse",
    subtitle: "Plateforme éducative multilingue avec IA",
    description:
      "E-learning platform pour la Digital Innovation Week Cameroun. Cours en français et langues nationales, système de rôles (teacher/student/admin), assistant IA pour les leçons via Google Genkit, dashboards par rôle.",
    badge: "EdTech Multilingue + IA",
    badgeType: "education",
    stack: ["Next.js", "TypeScript", "Firebase", "Google Genkit AI", "shadcn/ui", "Tailwind CSS"],
    securityPoints: [
      "Rôles teacher/student/admin",
      "Account Security page",
      "Firebase Auth",
      "IA contrôlée",
    ],
    githubUrl: "https://github.com/SKJUV/EduConverse",
  },
  {
    id: "eduafrique",
    title: "EduAfrique",
    subtitle: "E-learning africain avec tuteur IA",
    description:
      "Plateforme de cours en ligne pour l'Afrique avec tuteur IA intelligent, parcours d'apprentissage personnalisés, quiz/évaluations, accès hors-ligne et catalogue de cours (Business, Agriculture, Tech, Arts & Culture).",
    badge: "AI-Powered Learning",
    badgeType: "education",
    stack: ["Next.js 15", "TypeScript", "Firebase", "Google Genkit AI", "Tailwind CSS", "Recharts"],
    securityPoints: [
      "Firebase Auth",
      "IA Tutor contrôlée",
      "Server Actions Zod",
      "Validation serveur",
    ],
    githubUrl: "https://github.com/SKJUV/EduAfrique",
  },
  {
    id: "tpjava",
    title: "TP Java ICT207",
    subtitle: "Travaux pratiques universitaires L2",
    description:
      "Travaux pratiques de programmation Java réalisés dans le cadre du module ICT207 (Programmation en Java) en Licence 2. Fondamentaux de la programmation orientée objet.",
    badge: "Académique",
    badgeType: "academic",
    stack: ["Java"],
    securityPoints: [],
    githubUrl: "https://github.com/SKJUV/TP_0_ICT207_SINENG_24H2194",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    icon: "🛡️",
    title: "Sécurité (Passion #1)",
    items: [
      "JWT", "RBAC", "OWASP Top 10", "HSTS", "XSS Prevention", "CSRF",
      "RLS", "Audit Logging", "Multi-tenancy", "Docker Hardening",
      "BCrypt", "OAuth PKCE", "VPN", "Hack The Box",
    ],
  },
  {
    icon: "⚙️",
    title: "Backend",
    items: [
      "Python", "Django", "DRF", "PHP", "Java", "Node.js",
      "PostgreSQL", "MySQL", "Redis", "Celery", "Supabase", "Firebase",
    ],
  },
  {
    icon: "🎨",
    title: "Frontend",
    items: [
      "React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui",
      "Vite", "Bootstrap", "Chart.js", "Recharts", "DOM Manipulation",
    ],
  },
  {
    icon: "🐳",
    title: "DevOps & Infra",
    items: [
      "Docker", "Docker Compose", "Gunicorn", "Sentry",
      "S3/boto3", "WhiteNoise", "Multi-stage Builds",
    ],
  },
  {
    icon: "🐧",
    title: "Systèmes & Administration",
    items: [
      "Manjaro (KDE)", "Zorin OS Pro", "Windows 11 Pro",
      "Terminal avancé", "pacman/yay", "DNS Config",
      "BIOS Diagnostic", "Troubleshooting",
    ],
  },
  {
    icon: "🤖",
    title: "IA & Data",
    items: [
      "Google Genkit AI", "Firebase AI", "Kaggle",
      "Pipelines ML", "Nettoyage CSV", "Zod Validation",
    ],
  },
];

export const profileCategories: ProfileCategory[] = [
  {
    icon: "🐧",
    title: "Systèmes Linux",
    points: [
      "Manjaro KDE avec pacman/yay",
      "Zorin OS Pro",
      "Terminal avancé (ps, pkill, find, gestion ~/.config)",
      "Installation/désinstallation propre",
    ],
  },
  {
    icon: "🪟",
    title: "Windows",
    points: [
      "Windows 11 Pro",
      "DNS Google 8.8.8.8/8.8.4.4",
      "Diagnostic réseau",
      "Diagnostic BIOS (CMOS checksum, bips système)",
    ],
  },
  {
    icon: "🟢",
    title: "Bots & APIs",
    points: [
      "Bot WhatsApp Pydroid 3",
      "OAuth PKCE flow Spotify",
      "Token API",
      "Intégration API Spotify",
    ],
  },
  {
    icon: "📊",
    title: "Data Science & ML",
    points: [
      "Kaggle CSV",
      "Nettoyage données",
      "Pipelines ML",
      "Progression structurée",
    ],
  },
  {
    icon: "🔧",
    title: "Résolution de Problèmes",
    points: [
      "Diagnostic système et lecture logs",
      "Analyse bips BIOS",
      "Correction erreurs JavaScript",
      "Nettoyage apps corrompues",
      "Réinitialisation configurations",
    ],
  },
  {
    icon: "🛠️",
    title: "Outils Dev",
    points: [
      "Git CLI (branches, commits)",
      "VS Code",
      "GitHub Education Pack",
      "Prisma ORM (schema.prisma, seed.ts)",
    ],
  },
];
