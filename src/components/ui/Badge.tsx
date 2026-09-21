import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "zinc" | "emerald" | "outline" | "security";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "blue",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  const base = "inline-flex items-center font-medium rounded-full transition-colors";

  const variants = {
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    zinc: "bg-zinc-800/80 text-zinc-300 border border-zinc-700/60",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    outline: "bg-transparent text-zinc-400 border border-zinc-700/70",
    security: "bg-blue-950/40 text-blue-300 border border-blue-500/30 font-mono",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1 gap-2",
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
