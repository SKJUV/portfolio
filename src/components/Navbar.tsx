"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/providers/LanguageProvider";

export default function Navbar() {
  const { locale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", num: "01", label: locale === "fr" ? "Profil" : "About" },
    { href: "#skills", num: "02", label: locale === "fr" ? "Matrice" : "Capabilities" },
    { href: "#projects", num: "03", label: locale === "fr" ? "Réalisations" : "Work" },
    { href: "#certifications", num: "04", label: locale === "fr" ? "Certificats" : "Credentials" },
    { href: "#contact", num: "05", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 shadow-sm"
          : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm border-b border-zinc-200/50 dark:border-zinc-800/40"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Masthead / Brand */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Accueil">
          <span className="font-semibold text-xs tracking-tight uppercase text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 transition-colors">
            SINENG KENGNI
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            // ARCHITECT
          </span>
        </a>

        {/* Swiss Numbered Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-950 dark:group-hover:text-zinc-300 transition-colors">
                {link.num}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Action / System Status & Toggles */}
        <div className="flex items-center gap-3">
          {/* Availability pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
            <span className="uppercase tracking-wider">AVAILABLE</span>
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-mono tracking-wider uppercase text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
            >
              <span>{link.label}</span>
              <span className="text-[10px] text-zinc-400">{link.num}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
