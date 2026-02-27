"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Layers,
  FolderKanban,
  Code2,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const sidebarItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sections", label: "Sections", icon: Layers },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/stacks", label: "Technologies", icon: Code2 },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/settings", label: "Personnalisation", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Ne pas appliquer le layout admin sur la page login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 h-14 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Shield className="h-4 w-4 text-primary" />
          Admin
        </div>
        <ThemeToggle />
      </div>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 glass border-r border-border/50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Admin Panel</p>
              <p className="text-xs text-muted-foreground font-mono">skjuv</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="h-3.5 w-3.5" />}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border/50 space-y-2">
          <div className="flex items-center justify-between px-3">
            <ThemeToggle />
            <a
              href="/"
              target="_blank"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Voir le site →
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="pt-14 lg:pt-0">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
