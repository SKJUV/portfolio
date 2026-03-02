"use client";

import { Sun, Moon } from "lucide-react";
import { useAdminTheme } from "@/providers/AdminThemeProvider";

export default function AdminThemeToggle() {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-all"
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-primary" />
      )}
    </button>
  );
}
