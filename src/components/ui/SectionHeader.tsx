import React from "react";
import { Badge } from "./Badge";

export interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClasses =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 max-w-3xl ${alignClasses} ${className}`}>
      {badge && (
        <div className="mb-3">
          <Badge variant="blue" size="sm" icon={badgeIcon}>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
