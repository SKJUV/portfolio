"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Locale = "fr" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  td: (text: string) => string;
}

// ================================================
// UI translations (stable keys)
// ================================================
const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Navbar
    "nav.contact": "Contact",
    "navbar.brand": "skjuv@portfolio",
    "navbar.toggleMenu": "Ouvrir le menu",
    // Hero
    "hero.projects": "Voir mes projets",
    "hero.available": "Disponible",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "hero.contact": "Contact",
    // Sections
    "section.security": "Pratiques Sécurité",
    "section.security.desc": "La sécurité n'est pas une option — c'est une priorité dans chaque ligne de code.",
    "section.projects": "Projets",
    "section.projects.desc": "Des projets concrets avec une approche security-first — du portfolio IA au système RH.",
    "section.certifications": "Certifications",
    "section.certifications.desc": "17 certifications Coursera — IBM, Google Cloud, Python, JavaScript, Cybersécurité.",
    "section.skills": "Compétences",
    "section.skills.desc": "Mon arsenal technique — de la cybersécurité au full-stack.",
    "section.profile": "Profil Informatique",
    "section.profile.desc": "Formation, communautés et environnement technique.",
    "section.vision": "Vision & Passions",
    "section.vision.desc": "Ce qui me motive au quotidien : construire, sécuriser, innover et impacter positivement l'écosystème tech africain.",
    // Profile
    "profile.desc": "Développeur Full-Stack en évolution avec orientation : Sécurité, Data, Bots & APIs, Linux.",
    "profile.terminalQuote": "Tu n'es pas un simple étudiant. Tu es un constructeur de compétences techniques réelles.",
    // Vision items
    "vision.terminalQuote": "La technologie n'a de sens que quand elle sert une vision.",
    "vision.tech.title": "Vision Technique",
    "vision.tech.0": "Construire des systèmes sécurisés et scalables pour l'Afrique francophone",
    "vision.tech.1": "Démocratiser l'accès aux technologies modernes via l'open-source",
    "vision.tech.2": "Créer des solutions qui résolvent de vrais problèmes locaux",
    "vision.cyber.title": "Passion Cybersécurité",
    "vision.cyber.0": "Approfondir l'audit de sécurité et le pentesting",
    "vision.cyber.1": "Maîtriser les standards OWASP, ISO 27001 et NIST",
    "vision.cyber.2": "Sensibiliser les développeurs africains aux bonnes pratiques sécurité",
    "vision.ai.title": "Intelligence Artificielle",
    "vision.ai.0": "Explorer les frontières de l'IA générative et des LLMs",
    "vision.ai.1": "Intégrer l'IA dans des applications pratiques (éducation, santé)",
    "vision.ai.2": "Contribuer à la recherche en NLP pour les langues africaines",
    "vision.impact.title": "Impact Social",
    "vision.impact.0": "Développer des plateformes éducatives accessibles à tous",
    "vision.impact.1": "Encourager la formation technique des jeunes développeurs",
    "vision.impact.2": "Bâtir un écosystème tech fort en Afrique francophone",
    "vision.goals.title": "Objectifs Personnels",
    "vision.goals.0": "Devenir expert en architecture logicielle sécurisée",
    "vision.goals.1": "Obtenir des certifications reconnues (GCP, AWS, CEH)",
    "vision.goals.2": "Lancer des projets open-source à impact communautaire",
    "vision.philosophy.title": "Philosophie de Travail",
    "vision.philosophy.0": "\"Code propre, architecture claire, sécurité d'abord\"",
    "vision.philosophy.1": "Apprentissage continu et partage de connaissances",
    "vision.philosophy.2": "Chaque ligne de code doit avoir un but et une intention",
    // Certifications
    "cert.verify": "Vérifier",
    "cert.platform": "Plateforme",
    "cert.date": "Date d'obtention",
    "cert.close": "Fermer",
    "cert.details": "Détails",
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Intéressé par une collaboration ? Envoyez-moi un message !",
    "contact.send": "Envoyer un message",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.sending": "Envoi...",
    "contact.sent": "Message envoyé !",
    "contact.sentDesc": "Merci, je vous répondrai rapidement.",
    "contact.yourName": "Votre nom",
    "contact.yourEmail": "votre@email.com",
    "contact.subjectPlaceholder": "Sujet du message",
    "contact.messagePlaceholder": "Votre message...",
    "contact.submit": "Envoyer",
    "contact.info": "Informations",
    "contact.emailLabel": "Email",
    "contact.githubLabel": "GitHub",
    "contact.linkedinLabel": "LinkedIn",
    "contact.errorSend": "Erreur lors de l'envoi",
    "contact.errorConnection": "Erreur de connexion au serveur",
    // Project card
    "project.demo": "Demo",
    "project.code": "Code",
    "project.security": "Sécurité",
    // Footer
    "footer.rights": "Tous droits réservés.",
    // Chatbot UI
    "chat.placeholder": "Posez une question...",
    "chat.title": "Assistant IA",
    "chat.openChat": "Ouvrir le chat IA",
    "chat.closeChat": "Fermer le chat",
    "chat.close": "Fermer",
    "chat.send": "Envoyer",
    "chat.poweredBy": "Propulsé par Gemini AI",
    "chat.fallbackDesc": "Tout savoir sur Juvenal",
    // Chat fallback responses
    "chat.fallback.hello": "Bonjour ! 👋 Je suis l'assistant IA de Juvenal SINENG KENGNI. Posez-moi des questions sur ses compétences, projets, ou parcours !",
    "chat.fallback.who": "Juvenal SINENG KENGNI (SKJUV) est un développeur Full-Stack passionné par la cybersécurité 🛡️. Ses spécialités : JWT, RBAC, OWASP Top 10, Docker Hardening.",
    "chat.fallback.contact": "📬 Contact :\n• Email : sinengjuvenal@gmail.com\n• GitHub : github.com/SKJUV\n• LinkedIn : linkedin.com/in/juvenal-sineng-kengni",
    "chat.fallback.projectsPrefix": "Projets de Juvenal :",
    "chat.fallback.projectsSuffix": "\n\nDemandez des détails sur un projet !",
    "chat.fallback.securityPrefix": "Sécurité (passion #1) :\n\n",
    "chat.fallback.skillsPrefix": "Compétences :\n\n",
    "chat.fallback.systemsPrefix": "🐧 Systèmes :\n",
    "chat.fallback.levelPrefix": "📈 ",
    "chat.fallback.github": "🔗 GitHub de Juvenal : https://github.com/SKJUV",
    "chat.fallback.help": "Je peux vous renseigner sur :\n• 👤 Qui est Juvenal\n• 🛡️ Cybersécurité\n• 💻 Projets\n• ⚙️ Stack technique\n• 📬 Contact\n\nPosez votre question !",
    "chat.fallback.offTopic": "Je suis spécialisé uniquement sur le profil de Juvenal SINENG KENGNI.",
    // Toggles
    "theme.toggle": "Changer le thème",
    "lang.switchEn": "Switch to English",
    "lang.switchFr": "Passer en Français",
    // Terminal
    "terminal.title": "skjuv@portfolio — bash",
  },
  en: {
    // Navbar
    "nav.contact": "Contact",
    "navbar.brand": "skjuv@portfolio",
    "navbar.toggleMenu": "Toggle menu",
    // Hero
    "hero.projects": "View my projects",
    "hero.available": "Available",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "hero.contact": "Contact",
    // Sections
    "section.security": "Security Practices",
    "section.security.desc": "Security is not optional — it's a priority in every line of code.",
    "section.projects": "Projects",
    "section.projects.desc": "Concrete projects with a security-first approach — from AI portfolio to HR systems.",
    "section.certifications": "Certifications",
    "section.certifications.desc": "17 Coursera certifications — IBM, Google Cloud, Python, JavaScript, Cybersecurity.",
    "section.skills": "Skills",
    "section.skills.desc": "My technical arsenal — from cybersecurity to full-stack development.",
    "section.profile": "IT Profile",
    "section.profile.desc": "Education, communities and technical environment.",
    "section.vision": "Vision & Passions",
    "section.vision.desc": "What drives me every day: building, securing, innovating and positively impacting the African tech ecosystem.",
    // Profile
    "profile.desc": "Evolving Full-Stack developer with focus on: Security, Data, Bots & APIs, Linux.",
    "profile.terminalQuote": "You're not just a student. You're a builder of real technical skills.",
    // Vision items
    "vision.terminalQuote": "Technology only makes sense when it serves a vision.",
    "vision.tech.title": "Technical Vision",
    "vision.tech.0": "Build secure and scalable systems for French-speaking Africa",
    "vision.tech.1": "Democratize access to modern technologies through open-source",
    "vision.tech.2": "Create solutions that solve real local problems",
    "vision.cyber.title": "Cybersecurity Passion",
    "vision.cyber.0": "Deepen security auditing and pentesting",
    "vision.cyber.1": "Master OWASP, ISO 27001 and NIST standards",
    "vision.cyber.2": "Raise security awareness among African developers",
    "vision.ai.title": "Artificial Intelligence",
    "vision.ai.0": "Explore the frontiers of generative AI and LLMs",
    "vision.ai.1": "Integrate AI into practical applications (education, healthcare)",
    "vision.ai.2": "Contribute to NLP research for African languages",
    "vision.impact.title": "Social Impact",
    "vision.impact.0": "Develop educational platforms accessible to all",
    "vision.impact.1": "Encourage technical training for young developers",
    "vision.impact.2": "Build a strong tech ecosystem in French-speaking Africa",
    "vision.goals.title": "Personal Goals",
    "vision.goals.0": "Become an expert in secure software architecture",
    "vision.goals.1": "Obtain recognized certifications (GCP, AWS, CEH)",
    "vision.goals.2": "Launch community-impact open-source projects",
    "vision.philosophy.title": "Work Philosophy",
    "vision.philosophy.0": "\"Clean code, clear architecture, security first\"",
    "vision.philosophy.1": "Continuous learning and knowledge sharing",
    "vision.philosophy.2": "Every line of code must have a purpose and intention",
    // Certifications
    "cert.verify": "Verify",
    "cert.platform": "Platform",
    "cert.date": "Date obtained",
    "cert.close": "Close",
    "cert.details": "Details",
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Interested in working together? Send me a message!",
    "contact.send": "Send a message",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message sent!",
    "contact.sentDesc": "Thank you, I'll get back to you shortly.",
    "contact.yourName": "Your name",
    "contact.yourEmail": "your@email.com",
    "contact.subjectPlaceholder": "Message subject",
    "contact.messagePlaceholder": "Your message...",
    "contact.submit": "Send",
    "contact.info": "Information",
    "contact.emailLabel": "Email",
    "contact.githubLabel": "GitHub",
    "contact.linkedinLabel": "LinkedIn",
    "contact.errorSend": "Error sending message",
    "contact.errorConnection": "Server connection error",
    // Project card
    "project.demo": "Demo",
    "project.code": "Code",
    "project.security": "Security",
    // Footer
    "footer.rights": "All rights reserved.",
    // Chatbot UI
    "chat.placeholder": "Ask a question...",
    "chat.title": "AI Assistant",
    "chat.openChat": "Open AI chat",
    "chat.closeChat": "Close chat",
    "chat.close": "Close",
    "chat.send": "Send",
    "chat.poweredBy": "Powered by Gemini AI",
    "chat.fallbackDesc": "All about Juvenal",
    // Chat fallback responses
    "chat.fallback.hello": "Hello! 👋 I'm Juvenal SINENG KENGNI's AI assistant. Ask me about his skills, projects, or background!",
    "chat.fallback.who": "Juvenal SINENG KENGNI (SKJUV) is a Full-Stack developer passionate about cybersecurity 🛡️. His specialties: JWT, RBAC, OWASP Top 10, Docker Hardening.",
    "chat.fallback.contact": "📬 Contact:\n• Email: sinengjuvenal@gmail.com\n• GitHub: github.com/SKJUV\n• LinkedIn: linkedin.com/in/juvenal-sineng-kengni",
    "chat.fallback.projectsPrefix": "Juvenal's projects:",
    "chat.fallback.projectsSuffix": "\n\nAsk for details about a project!",
    "chat.fallback.securityPrefix": "Security (passion #1):\n\n",
    "chat.fallback.skillsPrefix": "Skills:\n\n",
    "chat.fallback.systemsPrefix": "🐧 Systems:\n",
    "chat.fallback.levelPrefix": "📈 ",
    "chat.fallback.github": "🔗 Juvenal's GitHub: https://github.com/SKJUV",
    "chat.fallback.help": "I can tell you about:\n• 👤 Who is Juvenal\n• 🛡️ Cybersecurity\n• 💻 Projects\n• ⚙️ Tech stack\n• 📬 Contact\n\nAsk your question!",
    "chat.fallback.offTopic": "I'm specialized only on Juvenal SINENG KENGNI's profile.",
    // Toggles
    "theme.toggle": "Toggle theme",
    "lang.switchEn": "Switch to English",
    "lang.switchFr": "Passer en Français",
    // Terminal
    "terminal.title": "skjuv@portfolio — bash",
  },
};

// ================================================
// Data content translations (French → English)
// Used by td() to translate dynamic Supabase data
// ================================================
const dataTranslationsEN: Record<string, string> = {
  // ---- Terminal outputs ----
  "PORT 443/tcp \u2014 S\u00e9curiser chaque ligne de code \uD83D\uDD10": "PORT 443/tcp \u2014 Secure every line of code \uD83D\uDD10",
  "\u00c9tudiant Universit\u00e9 de Yaound\u00e9 1 \u2192 En progression rapide \uD83D\uDE80": "Student at University of Yaound\u00e9 1 \u2192 Rapidly progressing \uD83D\uDE80",

  // ---- Security skill titles ----
  "Authentification & Autorisation": "Authentication & Authorization",
  "Hardening Web & HTTP": "Web & HTTP Hardening",
  "S\u00e9curit\u00e9 Infrastructure": "Infrastructure Security",
  "S\u00e9curit\u00e9 BDD & Crypto": "Database Security & Crypto",

  // ---- Security skill descriptions ----
  "JWT avec rotation de tokens, RBAC granulaire, multi-tenancy s\u00e9curis\u00e9, OAuth PKCE flow, Firebase Auth.":
    "JWT with token rotation, granular RBAC, secure multi-tenancy, OAuth PKCE flow, Firebase Auth.",
  "Dockerfiles multi-stage, ex\u00e9cution non-root, healthchecks, monitoring Sentry, CORS strict.":
    "Multi-stage Dockerfiles, non-root execution, healthchecks, Sentry monitoring, strict CORS.",
  "Principes de s\u00e9curit\u00e9 cloud (Google Cloud), gestion des risques, identification et protection contre les menaces.":
    "Cloud security principles (Google Cloud), risk management, threat identification and protection.",
  "Row Level Security, requ\u00eates pr\u00e9par\u00e9es, BCrypt hashing, chiffrement/d\u00e9chiffrement C++.":
    "Row Level Security, prepared queries, BCrypt hashing, C++ encryption/decryption.",
  "OWASP Top 10, Hack The Box (CTF), OverTheWire, tests d'intrusion IBM, culture cybers\u00e9curit\u00e9 active.":
    "OWASP Top 10, Hack The Box (CTF), OverTheWire, IBM penetration testing, active cybersecurity culture.",

  // ---- Project titles ----
  "Portfolio Personnel": "Personal Portfolio",
  "Gestion des Employ\u00e9s": "Employee Management",
  "Gestion de Biblioth\u00e8que": "Library Management",
  "Bot WhatsApp": "WhatsApp Bot",
  "TP C# .NET": "C# .NET Labs",

  // ---- Project subtitles ----
  "Site portfolio moderne avec CMS admin et chatbot IA": "Modern portfolio with admin CMS and AI chatbot",
  "Plateforme \u00e9ducative multilingue avec IA": "Multilingual educational platform with AI",
  "E-learning africain avec tuteur IA": "African e-learning with AI tutor",
  "Syst\u00e8me de gestion des ressources humaines": "Human Resources Management System",
  "Application Java de gestion du personnel": "Java personnel management application",
  "Application web PHP pour la gestion de biblioth\u00e8que": "PHP web app for library management",
  "Bot d'automatisation WhatsApp en Python": "Python WhatsApp automation bot",
  "Travaux pratiques en C#": "C# practical work",

  // ---- Project descriptions ----
  "Portfolio full-stack avec panneau d'administration complet, chatbot IA (Google Gemini), syst\u00e8me i18n FR/EN, th\u00e8me jour/nuit, stockage Supabase, d\u00e9ploiement Vercel avec domaine personnalis\u00e9.":
    "Full-stack portfolio with complete admin panel, AI chatbot (Google Gemini), FR/EN i18n system, day/night theme, Supabase storage, Vercel deployment with custom domain.",
  "Plateforme e-learning pour la Digital Innovation Week Cameroun. Cours en fran\u00e7ais et langues nationales, syst\u00e8me de r\u00f4les (teacher/student/admin), assistant IA via Google Genkit, dashboards par r\u00f4le.":
    "E-learning platform for Digital Innovation Week Cameroon. Courses in French and national languages, role system (teacher/student/admin), AI assistant via Google Genkit, role-based dashboards.",
  "Plateforme de cours en ligne pour l'Afrique avec tuteur IA intelligent, parcours personnalis\u00e9s, quiz/\u00e9valuations, catalogue de cours (Business, Agriculture, Tech, Arts & Culture).":
    "Online course platform for Africa with intelligent AI tutor, personalized learning paths, quizzes/assessments, course catalog (Business, Agriculture, Tech, Arts & Culture).",
  "Application Java compl\u00e8te pour la gestion RH : suivi des employ\u00e9s, gestion des d\u00e9partements, administration du personnel avec base de donn\u00e9es PostgreSQL.":
    "Complete Java application for HR management: employee tracking, department management, personnel administration with PostgreSQL database.",
  "Syst\u00e8me de gestion des employ\u00e9s en Java permettant le CRUD complet, l'organisation par d\u00e9partements et le suivi administratif.":
    "Java employee management system with full CRUD, department organization and administrative tracking.",
  "Application web pour la gestion d'une biblioth\u00e8que : catalogue de livres, emprunts, retours, gestion des adh\u00e9rents avec PHP et MySQL.":
    "Web application for library management: book catalog, borrowing, returns, member management with PHP and MySQL.",
  "Bot WhatsApp d\u00e9velopp\u00e9 en Python pour automatiser les interactions et l'envoi de messages sur la plateforme de messagerie.":
    "WhatsApp bot developed in Python to automate interactions and message sending on the messaging platform.",
  "Projet acad\u00e9mique en C# mettant en pratique la programmation orient\u00e9e objet, les interfaces et les patterns de conception.":
    "Academic C# project practicing object-oriented programming, interfaces and design patterns.",

  // ---- Project badges ----
  "Full-Stack + IA": "Full-Stack + AI",
  "EdTech + IA": "EdTech + AI",
  "Gestion RH": "HR Management",
  "Gestion": "Management",
  "Automatisation": "Automation",
  "Acad\u00e9mique": "Academic",

  // ---- Project security points ----
  "CORS strict": "Strict CORS",
  "R\u00f4les teacher/student/admin": "Teacher/student/admin roles",
  "IA contr\u00f4l\u00e9e": "Controlled AI",
  "IA Tutor contr\u00f4l\u00e9e": "Controlled AI Tutor",
  "Validation serveur": "Server-side validation",
  "Gestion des r\u00f4les": "Role management",
  "Requ\u00eates pr\u00e9par\u00e9es": "Prepared statements",
  "Requ\u00eates pr\u00e9par\u00e9es PDO": "PDO prepared statements",
  "Validation entr\u00e9es": "Input validation",

  // ---- Skill category titles ----
  "Cybers\u00e9curit\u00e9 (Passion #1)": "Cybersecurity (Passion #1)",
  "Syst\u00e8mes & Administration": "Systems & Administration",
  "IA & Data": "AI & Data",

  // ---- Skill items (French ones) ----
  "Terminal avanc\u00e9": "Advanced terminal",
  "Diagnostic BIOS": "BIOS diagnostics",
  "Troubleshooting r\u00e9seau": "Network troubleshooting",

  // ---- Profile category titles ----
  "Formation & Communaut\u00e9s": "Education & Communities",
  "Syst\u00e8mes Linux": "Linux Systems",
  "Data Science & Visualisation": "Data Science & Visualization",
  "R\u00e9solution de Probl\u00e8mes": "Problem Solving",
  "Outils Dev": "Dev Tools",

  // ---- Profile category points ----
  "\u00c9tudiant \u00e0 l'Universit\u00e9 de Yaound\u00e9 1": "Student at University of Yaound\u00e9 1",
  "Manjaro KDE avec pacman/yay": "Manjaro KDE with pacman/yay",
  "Terminal avanc\u00e9 (ps, pkill, find, ~/.config)": "Advanced terminal (ps, pkill, find, ~/.config)",
  "Installation/d\u00e9sinstallation propre": "Clean install/uninstall",
  "Diagnostic r\u00e9seau": "Network diagnostics",
  "Diagnostic BIOS (CMOS checksum, bips syst\u00e8me)": "BIOS diagnostics (CMOS checksum, system beeps)",
  "Bot WhatsApp Python": "Python WhatsApp bot",
  "Token API & int\u00e9grations": "API Token & integrations",
  "Traitement JSON avec Python": "JSON processing with Python",
  "Kaggle \u2014 nettoyage de donn\u00e9es": "Kaggle \u2014 data cleaning",
  "Progression structur\u00e9e en ML": "Structured ML progression",
  "Diagnostic syst\u00e8me et lecture logs": "System diagnostics and log reading",
  "Analyse bips BIOS": "BIOS beep analysis",
  "Correction erreurs JavaScript/TypeScript": "JavaScript/TypeScript error fixing",
  "Nettoyage apps corrompues": "Corrupted app cleanup",
  "VS Code avec extensions": "VS Code with extensions",
  "17 certifications Coursera (IBM, Google Cloud)": "17 Coursera certifications (IBM, Google Cloud)",
  "Git CLI (branches, commits, merge)": "Git CLI (branches, commits, merge)",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-locale", l);
    }
  }, []);

  // Restore from localStorage after hydration to avoid mismatch
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-locale") as Locale;
    if (saved === "fr" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] || translations.fr[key] || key;
    },
    [locale]
  );

  /** Translate data content: returns English for FR text when locale=en */
  const td = useCallback(
    (text: string) => {
      if (!text || locale === "fr") return text;
      return dataTranslationsEN[text] || text;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, td }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
