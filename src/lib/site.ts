/**
 * Canonical production origin for absolute URLs (canonical tags, og:url,
 * hreflang alternates, JSON-LD @id). Pulled from NEXT_PUBLIC_SITE_URL so it
 * can be overridden per environment; the fallback is the live production
 * domain (never localhost) so metadata never regresses to a dev URL when the
 * env var is missing at build time.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.4o4solutions.com"
).replace(/\/$/, "");
