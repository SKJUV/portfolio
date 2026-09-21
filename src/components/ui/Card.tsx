import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive";
  className?: string;
}

export function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const base =
    "rounded-xl border bg-card text-card-foreground transition-all duration-200 overflow-hidden";

  const variants = {
    default: "border-zinc-800/80 bg-zinc-900/50 shadow-sm",
    elevated: "border-zinc-800 bg-zinc-900/80 shadow-md",
    interactive: "border-zinc-800/80 bg-zinc-900/40 card-hover cursor-pointer",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 sm:p-6 pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold tracking-tight text-zinc-100 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-zinc-400 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 sm:p-6 pt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-5 sm:p-6 pt-0 flex items-center border-t border-zinc-800/50 mt-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
