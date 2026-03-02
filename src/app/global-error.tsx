"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 mx-auto">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Erreur critique</h1>
            <p className="text-sm text-zinc-400">
              L&apos;application a rencontré une erreur critique. Veuillez recharger la page.
            </p>
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Recharger
          </button>
        </div>
      </body>
    </html>
  );
}
