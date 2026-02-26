"use client";

import { useState, useEffect } from "react";
import { terminalLines } from "@/lib/data";

export default function Terminal() {
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
    <div className="bg-card border border-border rounded-lg overflow-hidden font-mono text-sm">
      {/* Window dots */}
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-destructive" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-primary" />
        <span className="ml-2 text-xs text-muted-foreground">terminal — bash</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 space-y-2 min-h-[200px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            <p className="text-primary">{line.command}</p>
            <p className="text-foreground pl-2">{line.output}</p>
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        )}
      </div>
    </div>
  );
}
