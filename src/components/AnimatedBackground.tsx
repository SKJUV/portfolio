"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const targetMouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Neon Cyber Palette for Particles
    const neonColors = [
      "rgba(6, 182, 212, 0.8)",   // Cyber Cyan
      "rgba(16, 185, 129, 0.8)",  // Cyber Emerald
      "rgba(139, 92, 246, 0.8)",  // Electric Violet
      "rgba(59, 130, 246, 0.8)",   // High-Tech Blue
    ];

    // Initialize 45 particles
    const particleCount = Math.min(50, Math.floor((width * height) / 24000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 1.5 + 1.2,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
      });
    }

    // Spring interpolation for cursor spotlight
    let curX = -1000;
    let curY = -1000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor follow
      curX += (targetMouse.current.x - curX) * 0.08;
      curY += (targetMouse.current.y - curY) * 0.08;
      setMousePos({ x: curX, y: curY });

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interactive mouse repulsion/attraction
        const mdx = curX - p.x;
        const mdy = curY - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160 && mDist > 0) {
          // Draw bright line from particle to cursor
          const mAlpha = (1 - mDist / 160) * 0.35;
          ctx.strokeStyle = `rgba(139, 92, 246, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(curX, curY);
          ctx.stroke();

          // Gentle push away
          p.x -= (mdx / mDist) * 0.4;
          p.y -= (mdy / mDist) * 0.4;
        }

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Connect nearby particles with laser constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.22;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base Subtle Ambient Tint */}
      <div className="absolute inset-0 bg-[#f8f8fa] dark:bg-[#0c0d14] transition-colors duration-500" />

      {/* 2. Floating & Breathing Neon Orbs (Distinct, highly visible glow) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1: Cyber Emerald Neon (Top-Left) */}
        <div
          className="absolute -top-20 -left-20 w-[30rem] sm:w-[38rem] h-[30rem] sm:h-[38rem] rounded-full bg-emerald-500/20 dark:bg-emerald-500/28 blur-[90px] animate-orb-1"
          style={{ willChange: "transform" }}
        />

        {/* Orb 2: Electric Indigo & Violet Neon (Top-Right / Center) */}
        <div
          className="absolute top-1/4 -right-16 w-[32rem] sm:w-[42rem] h-[32rem] sm:h-[42rem] rounded-full bg-violet-600/20 dark:bg-violet-600/32 blur-[100px] animate-orb-2"
          style={{ willChange: "transform" }}
        />

        {/* Orb 3: Cyan Glacé Neon (Bottom-Left) */}
        <div
          className="absolute -bottom-24 left-1/5 w-[28rem] sm:w-[36rem] h-[28rem] sm:h-[36rem] rounded-full bg-cyan-500/18 dark:bg-cyan-500/26 blur-[90px] animate-orb-3"
          style={{ willChange: "transform" }}
        />

        {/* Orb 4: Electric Blue Glow (Bottom-Right) */}
        <div
          className="absolute bottom-1/5 -right-10 w-[26rem] sm:w-[34rem] h-[26rem] sm:h-[34rem] rounded-full bg-blue-600/18 dark:bg-blue-600/26 blur-[100px] animate-orb-1"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* 3. Interactive Neon Spotlight following cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.12), transparent 75%)`,
        }}
      />

      {/* 4. Swiss Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-swiss-grid opacity-60 dark:opacity-40" />

      {/* 5. Living Interactive Cyber Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-85 dark:opacity-90"
      />
    </div>
  );
}
