/**
 * GA4 Measurement ID for the Watad marketing site.
 * Pulled from NEXT_PUBLIC_GA_MEASUREMENT_ID so it can be overridden per
 * environment; the fallback is the live GA4 property's ID so analytics
 * never silently stop working when the env var is missing at build time.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-T0P0FB0RB5";
