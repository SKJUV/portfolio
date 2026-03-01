"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Locale = "fr" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Navbar
    "nav.contact": "Contact",
    // Hero
    "hero.projects": "Voir mes projets",
    "hero.available": "Disponible",
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
    // Project card
    "project.demo": "Demo",
    "project.code": "Code",
    "project.security": "Sécurité",
    // Footer
    "footer.rights": "Tous droits réservés.",
    // Chatbot
    "chat.placeholder": "Posez une question...",
    "chat.title": "Assistant IA",
  },
  en: {
    // Navbar
    "nav.contact": "Contact",
    // Hero
    "hero.projects": "View my projects",
    "hero.available": "Available",
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
    // Project card
    "project.demo": "Demo",
    "project.code": "Code",
    "project.security": "Security",
    // Footer
    "footer.rights": "All rights reserved.",
    // Chatbot
    "chat.placeholder": "Ask a question...",
    "chat.title": "AI Assistant",
  },
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

  // Restore from localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-locale") as Locale;
      if (saved === "fr" || saved === "en") {
        setLocaleState(saved);
      }
    }
  });

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] || translations.fr[key] || key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
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
