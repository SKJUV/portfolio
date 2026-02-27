"use client";

import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavSection {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

interface NavbarProps {
  sections?: NavSection[];
}

export default function Navbar({ sections = [] }: NavbarProps) {
  // Générer les liens dynamiquement à partir des sections activées
  const sectionLinks = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ href: `#${s.id}`, label: s.title }));

  // Contact toujours à la fin
  const navLinks = [...sectionLinks, { href: "#contact", label: "Contact" }];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-mono text-sm text-primary">
          <Shield className="h-5 w-5" />
          <span className="hidden sm:inline">skjuv@portfolio</span>
          <span className="text-muted-foreground hidden sm:inline">:~$</span>
          <span className="sm:hidden">skjuv</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg glass hover:bg-primary/10 transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 glass">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
