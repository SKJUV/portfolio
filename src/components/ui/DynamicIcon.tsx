import React from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Server,
  Layout,
  Boxes,
  Terminal,
  Bot,
  KeyRound,
  Lock,
  Cloud,
  Database,
  GraduationCap,
  Laptop,
  BarChart3,
  Wrench,
  Sliders,
  Sparkles,
  Cpu,
  Layers,
  Code,
  Globe,
  Rocket,
  Lightbulb,
  User,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number | string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  // Named keys
  ShieldCheck,
  ShieldAlert,
  Shield,
  Server,
  Layout,
  Boxes,
  Container: Boxes,
  Terminal,
  Bot,
  KeyRound,
  Lock,
  Cloud,
  CloudCog: Cloud,
  Database,
  GraduationCap,
  Laptop,
  BarChart3,
  Wrench,
  Sliders,
  Sparkles,
  Cpu,
  Layers,
  Code,
  Globe,
  Rocket,
  Lightbulb,
  User,
  CheckCircle2,

  // Unicode Emoji fallbacks
  "\u{1F6E1}\u{FE0F}": ShieldCheck,
  "\u{1F6E1}": ShieldCheck,
  "\u{2699}\u{FE0F}": Server,
  "\u{2699}": Server,
  "\u{1F3A8}": Layout,
  "\u{1F433}": Boxes,
  "\u{1F427}": Terminal,
  "\u{1F916}": Bot,
  "\u{1F510}": KeyRound,
  "\u{1F512}": Lock,
  "\u{2601}\u{FE0F}": Cloud,
  "\u{2601}": Cloud,
  "\u{1F5C4}\u{FE0F}": Database,
  "\u{1F5C4}": Database,
  "\u{1F50D}": ShieldAlert,
  "\u{1F393}": GraduationCap,
  "\u{1FA9F}": Laptop,
  "\u{1F7E2}": Bot,
  "\u{1F4CA}": BarChart3,
  "\u{1F527}": Wrench,
  "\u{1F6E0}\u{FE0F}": Sliders,
  "\u{1F6E0}": Sliders,
  "\u{1F52E}": Sparkles,
  "\u{1F680}": Rocket,
  "\u{1F4A1}": Lightbulb,
  "\u{1F464}": User,
  "\u{1F30D}": Globe,
};

export function DynamicIcon({ name, className = "w-5 h-5", size, ...props }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name] || ShieldCheck;
  return <IconComponent className={className} size={size} {...props} />;
}
