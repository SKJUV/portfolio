/**
 * Rate limiter in-memory pour les API routes.
 * Utilise un Map avec nettoyage automatique des entrées expirées.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  /** Nombre max de requêtes par fenêtre */
  maxRequests: number;
  /** Durée de la fenêtre en millisecondes */
  windowMs: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

// Nettoyage périodique toutes les 5 minutes
let cleanupScheduled = false;

function scheduleCleanup() {
  if (cleanupScheduled) return;
  cleanupScheduled = true;
  setInterval(() => {
    const now = Date.now();
    for (const [, store] of stores) {
      for (const [key, entry] of store) {
        if (now > entry.resetAt) {
          store.delete(key);
        }
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Crée un rate limiter avec la config donnée.
 * Retourne une fonction qui vérifie si l'IP est autorisée.
 */
export function createRateLimiter(name: string, config: RateLimitConfig) {
  const store = new Map<string, RateLimitEntry>();
  stores.set(name, store);
  scheduleCleanup();

  return {
    /**
     * Vérifie et incrémente le compteur pour une clé (typiquement l'IP).
     * @returns { success: boolean, remaining: number, resetAt: number }
     */
    check(key: string): { success: boolean; remaining: number; resetAt: number } {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || now > entry.resetAt) {
        // Nouvelle fenêtre
        const resetAt = now + config.windowMs;
        store.set(key, { count: 1, resetAt });
        return { success: true, remaining: config.maxRequests - 1, resetAt };
      }

      if (entry.count >= config.maxRequests) {
        return { success: false, remaining: 0, resetAt: entry.resetAt };
      }

      entry.count++;
      return {
        success: true,
        remaining: config.maxRequests - entry.count,
        resetAt: entry.resetAt,
      };
    },
  };
}

/**
 * Extraire l'IP depuis les headers de la requête
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
