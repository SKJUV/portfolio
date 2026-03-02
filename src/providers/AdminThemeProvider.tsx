"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type AdminTheme = "light" | "dark";

interface AdminThemeContextType {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = "admin-theme-mode";

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: AdminTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Prevent flash — render nothing until mounted
  if (!mounted) {
    return (
      <div className="admin-theme admin-dark min-h-screen" style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`admin-theme${theme === "dark" ? " admin-dark" : ""} min-h-screen`}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
