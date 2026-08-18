"use client";

import { HERO_NETWORK_CONFIG, HeroNetwork } from "./HeroNetwork";

/**
 * WatadHeroAnimation — the animated "signal resolving into structure" hero
 * background. Thin cyan lines trace orthogonal (90°-only) circuit routes from
 * the frame edges toward the lower-center ground bar; junction nodes pulse
 * once as each signal passes, then settle.
 *
 * The render engine lives in HeroNetworkScene (Three.js, procedural line
 * segments only — no meshes for signals, no models, no post-processing) and is
 * lazy-loaded behind a static navy poster so first paint / LCP never waits on
 * WebGL. This module is the stable public surface: mount it and tune CONFIG.
 *
 * Mount (behind the hero copy):
 *   <WatadHeroAnimation className="absolute inset-0 z-[1]" />
 *
 * ── CONFIG tunables (all live in HERO_NETWORK_CONFIG) ────────────────────────
 *  colors.navy900   #0C2740  background field
 *  colors.navy700   #123A5F  idle line traces
 *  colors.blue500   #1B6491  intermediate/structural accents (ground lip)
 *  colors.cyan400   #22B8DE  active signal lines
 *  colors.cyan300   #3ED2F0  node-pulse glow
 *  colors.ink       #1A1A1A  the ground bar
 *  lineCount        paths per breakpoint tier { base: 10, sm: 18, lg: 26 }
 *  cycleDuration    seconds per seamless loop (12–18 recommended)
 *  speed            travel-speed multiplier along each path
 *  density          right-angle turn density per path (1–3)
 *  lineOpacity      { min, max } — idle vs active line opacity
 *  parallaxPx       max cursor parallax displacement in CSS pixels
 *  dprCap           device-pixel-ratio caps { base: 1.5, sm: 2 }
 *  bounds           half-extents of the routing volume (world units)
 *  ground           { width, depth, y, thickness } — the fixed dark plane
 *  cameraZ          camera distance
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Performance behaviors (built into the engine):
 *  · prefers-reduced-motion → one static idle frame, no loop, no listeners
 *  · IntersectionObserver pauses the loop offscreen; visibilitychange pauses
 *    on hidden tabs; geometries/materials/textures/renderer disposed on unmount
 */
export const CONFIG = HERO_NETWORK_CONFIG;

export default function WatadHeroAnimation({
  className = "absolute inset-0",
}: {
  className?: string;
}) {
  return <HeroNetwork className={className} />;
}
