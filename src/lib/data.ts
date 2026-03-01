import type { Project, SecuritySkill, SkillCategory, ProfileCategory } from "./types";

export const terminalLines = [
  { command: "$ whoami", output: "juvenal_sineng — cybersecurity enthusiast && full-stack developer" },
  { command: "$ uname -a", output: "Manjaro Linux (KDE) | Zorin OS Pro | Windows 11 Pro" },
  { command: "$ cat /etc/skills", output: "Pentest · OWASP Top 10 · JWT · RBAC · Docker Hardening · Cloud Security" },
  { command: "$ nmap --top-ports passion", output: "PORT 443/tcp — Sécuriser chaque ligne de code 🔐" },
  { command: "$ cat /etc/certifications | wc -l", output: "17 certifications Coursera (IBM, Google Cloud, Python, Security)" },
  { command: "$ echo $COMMUNITIES", output: "GDG Yaoundé · Django Cameroon · Women TechMakers · GDSC UY1" },
  { command: "$ echo $LEVEL", output: "Étudiant Université de Yaoundé 1 → En progression rapide 🚀" },
];

export const securitySkills: SecuritySkill[] = [
  {
    icon: "🔐",
    title: "Authentification & Autorisation",
    description: "JWT avec rotation de tokens, RBAC granulaire, multi-tenancy sécurisé, OAuth PKCE flow, Firebase Auth.",
    tags: ["JWT Custom Claims", "Token Rotation", "RBAC", "Multi-tenant", "OAuth PKCE", "Firebase Auth"],
  },
  {
    icon: "🛡️",
    title: "Hardening Web & HTTP",
    description: "HSTS preload, X-Frame-Options DENY, XSS Filter, CSRF protection, Content Security Policy.",
    tags: ["HSTS 1 an", "X-Frame DENY", "XSS Filter", "CSRF Secure", "Content-Type Nosniff", "SSL Redirect"],
  },
  {
    icon: "🐳",
    title: "Sécurité Infrastructure",
    description: "Dockerfiles multi-stage, exécution non-root, healthchecks, monitoring Sentry, CORS strict.",
    tags: ["Docker Non-Root", "Multi-Stage Build", "Sentry", "CORS Strict", "Gunicorn", "Healthcheck"],
  },
  {
    icon: "☁️",
    title: "Cloud Security",
    description: "Principes de sécurité cloud (Google Cloud), gestion des risques, identification et protection contre les menaces.",
    tags: ["Google Cloud", "Risk Management", "Threat Protection", "Cloud Principles", "IAM"],
  },
  {
    icon: "🗄️",
    title: "Sécurité BDD & Crypto",
    description: "Row Level Security, requêtes préparées, BCrypt hashing, chiffrement/déchiffrement C++.",
    tags: ["RLS", "Prepared Statements", "BCrypt", "Encryption C++", "PDO", "Supabase RLS"],
  },
  {
    icon: "🔍",
    title: "OWASP & Pentesting",
    description: "OWASP Top 10, Hack The Box (CTF), OverTheWire, tests d'intrusion IBM, culture cybersécurité active.",
    tags: ["OWASP Top 10", "Hack The Box", "OverTheWire CTF", "Pentest IBM", "Input Validation", "Least Privilege"],
  },
];

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Personnel",
    subtitle: "Site portfolio moderne avec CMS admin et chatbot IA",
    description:
      "Portfolio full-stack avec panneau d'administration complet, chatbot IA (Google Gemini), système i18n FR/EN, thème jour/nuit, stockage Supabase, déploiement Vercel avec domaine personnalisé.",
    badge: "Full-Stack + IA",
    badgeType: "security",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Google Gemini", "Vercel"],
    securityPoints: [
      "Auth HMAC-SHA256",
      "Edge Middleware",
      "Supabase RLS",
      "CORS strict",
    ],
    githubUrl: "https://github.com/SKJUV/portfolio",
    liveUrl: "https://sineng-juvenal.me",
  },
  {
    id: "educonverse",
    title: "EduConverse",
    subtitle: "Plateforme éducative multilingue avec IA",
    description:
      "Plateforme e-learning pour la Digital Innovation Week Cameroun. Cours en français et langues nationales, système de rôles (teacher/student/admin), assistant IA via Google Genkit, dashboards par rôle.",
    badge: "EdTech + IA",
    badgeType: "education",
    stack: ["Next.js", "TypeScript", "Firebase", "Google Genkit AI", "shadcn/ui", "Tailwind CSS"],
    securityPoints: [
      "Rôles teacher/student/admin",
      "Firebase Auth",
      "IA contrôlée",
      "Server Actions Zod",
    ],
    githubUrl: "https://github.com/SKJUV/EduConverse",
  },
  {
    id: "eduafrique",
    title: "EduAfrique",
    subtitle: "E-learning africain avec tuteur IA",
    description:
      "Plateforme de cours en ligne pour l'Afrique avec tuteur IA intelligent, parcours personnalisés, quiz/évaluations, catalogue de cours (Business, Agriculture, Tech, Arts & Culture).",
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
    id: "hrms",
    title: "HRMS",
    subtitle: "Système de gestion des ressources humaines",
    description:
      "Application Java complète pour la gestion RH : suivi des employés, gestion des départements, administration du personnel avec base de données PostgreSQL.",
    badge: "Gestion RH",
    badgeType: "university",
    stack: ["Java", "PostgreSQL", "CSS"],
    securityPoints: ["Gestion des rôles", "Requêtes préparées"],
    githubUrl: "https://github.com/SKJUV/HRMS",
  },
  {
    id: "gestion-employes",
    title: "Gestion des Employés",
    subtitle: "Application Java de gestion du personnel",
    description:
      "Système de gestion des employés en Java permettant le CRUD complet, l'organisation par départements et le suivi administratif.",
    badge: "Gestion",
    badgeType: "university",
    stack: ["Java"],
    securityPoints: [],
    githubUrl: "https://github.com/SKJUV/gestion_des_employes",
  },
  {
    id: "tp108f",
    title: "Gestion de Bibliothèque",
    subtitle: "Application web PHP pour la gestion de bibliothèque",
    description:
      "Application web pour la gestion d'une bibliothèque : catalogue de livres, emprunts, retours, gestion des adhérents avec PHP et MySQL.",
    badge: "Web App",
    badgeType: "academic",
    stack: ["PHP", "MySQL", "JavaScript", "CSS", "HTML"],
    securityPoints: ["Requêtes préparées PDO", "Validation entrées"],
    githubUrl: "https://github.com/SKJUV/tp108f",
  },
  {
    id: "botwha",
    title: "Bot WhatsApp",
    subtitle: "Bot d'automatisation WhatsApp en Python",
    description:
      "Bot WhatsApp développé en Python pour automatiser les interactions et l'envoi de messages sur la plateforme de messagerie.",
    badge: "Automatisation",
    badgeType: "academic",
    stack: ["Python"],
    securityPoints: [],
    githubUrl: "https://github.com/SKJUV/botwha",
  },
  {
    id: "tp1ct203",
    title: "TP C# .NET",
    subtitle: "Travaux pratiques en C#",
    description:
      "Projet académique en C# mettant en pratique la programmation orientée objet, les interfaces et les patterns de conception.",
    badge: "Académique",
    badgeType: "academic",
    stack: ["C#", ".NET"],
    securityPoints: [],
    githubUrl: "https://github.com/SKJUV/tp1ct203",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    icon: "🛡️",
    title: "Cybersécurité (Passion #1)",
    items: [
      "OWASP Top 10", "Hack The Box", "OverTheWire CTF", "Pentest",
      "JWT", "RBAC", "HSTS", "XSS Prevention", "CSRF",
      "RLS", "Encryption C++", "Cloud Security (Google)",
      "BCrypt", "OAuth PKCE", "Docker Hardening",
    ],
  },
  {
    icon: "⚙️",
    title: "Backend",
    items: [
      "Python", "Django", "DRF", "PHP", "MySQL", "Java",
      "Node.js", "PostgreSQL", "Redis", "Celery",
      "Supabase", "Firebase", "C#", ".NET",
    ],
  },
  {
    icon: "🎨",
    title: "Frontend",
    items: [
      "React", "Next.js 15", "TypeScript", "JavaScript",
      "Tailwind CSS", "shadcn/ui", "Vite", "Bootstrap",
      "Chart.js", "Recharts", "HTML5", "CSS3",
    ],
  },
  {
    icon: "🐳",
    title: "DevOps & Cloud",
    items: [
      "Docker", "Docker Compose", "Gunicorn", "Vercel",
      "Sentry", "Google Cloud Security", "S3/boto3",
      "WhiteNoise", "Multi-stage Builds", "CI/CD",
    ],
  },
  {
    icon: "🐧",
    title: "Systèmes & Administration",
    items: [
      "Manjaro Linux (KDE)", "Zorin OS Pro", "Windows 11 Pro",
      "Terminal avancé", "pacman/yay", "DNS Config",
      "Diagnostic BIOS", "Troubleshooting réseau",
    ],
  },
  {
    icon: "🤖",
    title: "IA & Data",
    items: [
      "Google Gemini", "Google Genkit AI", "Firebase AI",
      "Matplotlib", "Seaborn", "Kaggle",
      "Data Visualization", "JSON Processing", "Zod Validation",
    ],
  },
];

export const profileCategories: ProfileCategory[] = [
  {
    icon: "🎓",
    title: "Formation & Communautés",
    points: [
      "Étudiant à l'Université de Yaoundé 1",
      "GDSC Université de Yaoundé 1",
      "GDG Yaoundé — Google Developer Groups",
      "Django Cameroon (Hacktoberfest 2025)",
      "Women TechMakers Yaoundé",
      "17 certifications Coursera (IBM, Google Cloud)",
    ],
  },
  {
    icon: "🐧",
    title: "Systèmes Linux",
    points: [
      "Manjaro KDE avec pacman/yay",
      "Zorin OS Pro",
      "Terminal avancé (ps, pkill, find, ~/.config)",
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
      "Bot WhatsApp Python",
      "OAuth PKCE flow",
      "Token API & intégrations",
      "Google Gemini AI API",
    ],
  },
  {
    icon: "📊",
    title: "Data Science & Visualisation",
    points: [
      "Python Matplotlib & Seaborn",
      "Traitement JSON avec Python",
      "Kaggle — nettoyage de données",
      "Progression structurée en ML",
    ],
  },
  {
    icon: "🔧",
    title: "Résolution de Problèmes",
    points: [
      "Diagnostic système et lecture logs",
      "Analyse bips BIOS",
      "CTF Hack The Box & OverTheWire",
      "Correction erreurs JavaScript/TypeScript",
      "Nettoyage apps corrompues",
    ],
  },
  {
    icon: "🛠️",
    title: "Outils Dev",
    points: [
      "Git CLI (branches, commits, merge)",
      "VS Code avec extensions",
      "GitHub Education Pack",
      "Vercel, Supabase, Firebase",
    ],
  },
];
