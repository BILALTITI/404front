"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Single source of truth for the Watad hero signal background.
 * Edit this object only — the scene reads nothing else.
 */
export const HERO_NETWORK_CONFIG = {
  colors: {
    navy900: "#0C2740",
    navy700: "#123A5F",
    blue500: "#1B6491",
    cyan400: "#22B8DE",
    cyan300: "#3ED2F0",
    ink: "#1A1A1A",
  },
  /** Active orthogonal paths per tier. Mobile is ~60% fewer than desktop. */
  lineCount: { base: 10, sm: 18, lg: 26 },
  /** Full visual cycle length in seconds (loops seamlessly). */
  cycleDuration: 15,
  /** Travel speed multiplier along each path (1 = one cycle per duration). */
  speed: 1,
  /** Path density: higher = more right-angle turns (1–3). */
  density: 1.4,
  /** Line opacity range — background only, never competes with copy. */
  lineOpacity: { min: 0.15, max: 0.5 },
  /** Max cursor parallax displacement in CSS pixels. */
  parallaxPx: 15,
  /** Device pixel ratio caps. Mobile stays at 1.5; no post-processing anywhere. */
  dprCap: { base: 1.5, sm: 2 },
  /** Half-extents of the routing volume (world units). */
  bounds: { x: 22, y: 14, z: 10 },
  /** Ground plane: solid, dark, never moves. */
  ground: {
    width: 28,
    depth: 14,
    y: -7.2,
    thickness: 0.18,
  },
  cameraZ: 32,
} as const;

export type HeroNetworkConfig = typeof HERO_NETWORK_CONFIG;

const HeroNetworkScene = dynamic(
  () => import("./HeroNetworkScene").then((m) => m.HeroNetworkScene),
  { ssr: false },
);

/**
 * Animated 3D orthogonal-signal hero background.
 * Static navy poster paints first (LCP-safe); WebGL mounts after idle + near-viewport.
 *
 * Drop in behind hero copy:
 * `<HeroNetwork className="absolute inset-0 z-[1]" />`
 */
export function HeroNetwork({
  className = "absolute inset-0",
}: {
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const { colors } = HERO_NETWORK_CONFIG;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let idleId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const armWhenIdle = () => {
      const w = window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
      };
      if (w.requestIdleCallback) {
        idleId = w.requestIdleCallback(() => setSceneReady(true), {
          timeout: 2500,
        });
      } else {
        timeoutId = setTimeout(() => setSceneReady(true), 350);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          armWhenIdle();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={`${className} overflow-hidden pointer-events-none`}
      aria-hidden
    >
      {/* Static poster: brand navy field — first paint, never regresses LCP. */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 78%, ${colors.navy700} 0%, ${colors.navy900} 55%, #081828 100%)`,
        }}
      />
      {sceneReady && <HeroNetworkScene config={HERO_NETWORK_CONFIG} />}
    </div>
  );
}
