import {
  Syne,
  Space_Grotesk,
  Inter,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

/**
 * Self-hosted, build-time font loading via next/font/google. Replaces the
 * old `@import url("https://fonts.googleapis.com/...")` in globals.css,
 * which forced a render-blocking round trip to fonts.googleapis.com and
 * then fonts.gstatic.com before any text could paint. next/font downloads
 * the font files at build time, self-hosts them, and inlines the matching
 * @font-face with size-adjusted fallback metrics (less layout shift on load).
 */

export const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});
