"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const targetPos = useRef({ x: -1000, y: -1000 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth spring interpolation for mouse spotlight
    const smoothFollow = () => {
      setMousePos((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        // Ease into position smoothly
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          return prev;
        }
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animFrameId.current = requestAnimationFrame(smoothFollow);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrameId.current = requestAnimationFrame(smoothFollow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Base Nuanced Gradient Mesh — softens stark black/white */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.14),rgba(0,0,0,0))]" />

      {/* 2. Floating Ambient Neon Orbs (GPU accelerated keyframes) */}
      <div className="absolute inset-0 filter blur-[100px] sm:blur-[130px] opacity-75 dark:opacity-85">
        {/* Orb 1: Cyber Emerald & Mint Neon (Top-Left) */}
        <div
          className="absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full bg-emerald-500/12 dark:bg-emerald-500/16 animate-orb-1"
          style={{ willChange: "transform" }}
        />

        {/* Orb 2: Electric Indigo & Violet Neon (Top-Right / Center) */}
        <div
          className="absolute top-1/4 -right-20 w-[42rem] h-[42rem] rounded-full bg-indigo-500/14 dark:bg-indigo-500/18 animate-orb-2"
          style={{ willChange: "transform" }}
        />

        {/* Orb 3: Cyan & Ice Blue Neon (Bottom-Left) */}
        <div
          className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 animate-orb-3"
          style={{ willChange: "transform" }}
        />

        {/* Orb 4: Steel Violet & Subtle Magenta Glow (Bottom-Right) */}
        <div
          className="absolute bottom-1/4 -right-16 w-[34rem] h-[34rem] rounded-full bg-violet-500/10 dark:bg-violet-500/14 animate-orb-1"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* 3. Interactive Mouse Spotlight (Subtle Neon Cursor Aura) */}
      {mounted && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.07), transparent 70%)`,
          }}
        />
      )}

      {/* 4. Swiss Architectural Grid Layer */}
      <div className="absolute inset-0 bg-swiss-grid opacity-80" />

      {/* 5. Delicate Micro-Noise Texture for filmic depth (avoids color banding) */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
