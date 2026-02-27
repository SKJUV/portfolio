"use client";

import { useState, useEffect } from "react";

interface TerminalProps {
  terminalLines: { command: string; output: string }[];
}

export default function Terminal({ terminalLines }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [visibleLines]);

  return (
    <div className="glass-card rounded-2xl overflow-hidden font-mono text-sm glow-primary">
      {/* Window title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/5 dark:bg-white/5 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-destructive/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <span className="w-3 h-3 rounded-full bg-primary/80" />
        <span className="ml-2 text-xs text-muted-foreground">skjuv@portfolio — bash</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 space-y-2.5 min-h-[200px] bg-black/[0.02] dark:bg-black/20">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="space-y-0.5">
            <p className="text-primary font-medium">{line.command}</p>
            <p className="text-foreground/80 pl-4 text-xs sm:text-sm">{line.output}</p>
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
        )}
        {visibleLines >= terminalLines.length && (
          <p className="text-primary">
            $ <span className="inline-block w-2 h-4 bg-primary cursor-blink align-middle" />
          </p>
        )}
      </div>
    </div>
  );
}
