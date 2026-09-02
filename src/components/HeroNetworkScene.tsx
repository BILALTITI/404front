"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { HeroNetworkConfig } from "./HeroNetwork";

type Tier = "base" | "sm" | "lg";

type PathDef = {
  points: THREE.Vector3[];
  /** Cumulative lengths along the polyline; last entry = total length. */
  cumLen: number[];
  totalLen: number;
  /** Phase offset 0–1 within the shared cycle. */
  phase: number;
  /** Fraction of the cycle spent traveling (rest is idle). */
  duty: number;
};

type Pulse = {
  position: THREE.Vector3;
  age: number;
  life: number;
  active: boolean;
};

const EDGE_AXES = ["x", "y", "z"] as const;

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/** Soft round glow sprite — procedural, no asset files. */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Manhattan route from edge → ground. Only axis-aligned segments;
 * turn count scales with density. Paths always terminate on the ground
 * surface — nothing passes through.
 */
function buildOrthogonalPath(
  rng: () => number,
  cfg: HeroNetworkConfig,
  index: number,
): THREE.Vector3[] {
  const { bounds, ground, density } = cfg;
  const end = new THREE.Vector3(
    (rng() - 0.5) * ground.width * 0.55,
    ground.y + ground.thickness * 0.5,
    (rng() - 0.5) * ground.depth * 0.45,
  );

  // Spawn on one of the four framing edges (top / left / right / far).
  const edge = Math.floor(rng() * 4);
  let start: THREE.Vector3;
  if (edge === 0) {
    start = new THREE.Vector3(
      (rng() - 0.5) * bounds.x * 2,
      bounds.y * (0.55 + rng() * 0.45),
      (rng() - 0.5) * bounds.z * 1.6,
    );
  } else if (edge === 1) {
    start = new THREE.Vector3(
      -bounds.x * (0.7 + rng() * 0.3),
      (rng() - 0.15) * bounds.y * 1.6,
      (rng() - 0.5) * bounds.z * 1.6,
    );
  } else if (edge === 2) {
    start = new THREE.Vector3(
      bounds.x * (0.7 + rng() * 0.3),
      (rng() - 0.15) * bounds.y * 1.6,
      (rng() - 0.5) * bounds.z * 1.6,
    );
  } else {
    start = new THREE.Vector3(
      (rng() - 0.5) * bounds.x * 2,
      (rng() - 0.1) * bounds.y * 1.4,
      -bounds.z * (0.6 + rng() * 0.4),
    );
  }

  const turns = Math.max(2, Math.min(5, Math.round(2 + density + (index % 3) * 0.5)));
  const points: THREE.Vector3[] = [start.clone()];
  const cur = start.clone();

  // Intermediate waypoints: change one axis at a time toward the target.
  const order = [...EDGE_AXES];
  // Shuffle axis order once per path for variety.
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  for (let t = 0; t < turns - 1; t++) {
    const axis = order[t % order.length];
    const next = cur.clone();
    if (axis === "x") {
      // Partial approach, then hold — creates circuit-like stubs.
      const target = THREE.MathUtils.lerp(cur.x, end.x, 0.35 + rng() * 0.55);
      next.x = target;
    } else if (axis === "y") {
      // Descend gradually; never go below ground until the final segment.
      const target = THREE.MathUtils.lerp(
        cur.y,
        end.y + 1.2 + rng() * 2.5,
        0.4 + rng() * 0.5,
      );
      next.y = Math.max(target, end.y + 0.8);
    } else {
      const target = THREE.MathUtils.lerp(cur.z, end.z, 0.35 + rng() * 0.55);
      next.z = target;
    }
    if (next.distanceToSquared(cur) > 0.01) {
      points.push(next.clone());
      cur.copy(next);
    }
  }

  // Final approach: drop Y last so the path meets the plane cleanly.
  if (Math.abs(cur.x - end.x) > 0.05) {
    const mid = cur.clone();
    mid.x = end.x;
    points.push(mid);
    cur.copy(mid);
  }
  if (Math.abs(cur.z - end.z) > 0.05) {
    const mid = cur.clone();
    mid.z = end.z;
    points.push(mid);
    cur.copy(mid);
  }
  points.push(end.clone());

  return points;
}

function pathLengths(points: THREE.Vector3[]): { cumLen: number[]; totalLen: number } {
  const cumLen = [0];
  for (let i = 1; i < points.length; i++) {
    cumLen.push(cumLen[i - 1] + points[i - 1].distanceTo(points[i]));
  }
  return { cumLen, totalLen: cumLen[cumLen.length - 1] || 1 };
}

/** Point at arc-length `dist` along the polyline. */
function pointAtLength(
  points: THREE.Vector3[],
  cumLen: number[],
  dist: number,
  out: THREE.Vector3,
): void {
  const total = cumLen[cumLen.length - 1];
  const d = THREE.MathUtils.clamp(dist, 0, total);
  let i = 1;
  while (i < cumLen.length && cumLen[i] < d) i++;
  const a = points[i - 1];
  const b = points[i] ?? a;
  const segStart = cumLen[i - 1];
  const segLen = (cumLen[i] ?? segStart) - segStart || 1;
  out.lerpVectors(a, b, (d - segStart) / segLen);
}

export function HeroNetworkScene({ config }: { config: HeroNetworkConfig }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const cfg = config;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const currentTier = (): Tier =>
      mqLg.matches ? "lg" : mqSm.matches ? "sm" : "base";

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: mqSm.matches,
        powerPreference: "low-power",
        // No post-processing pipelines — keep the mobile budget clean.
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 120);
    camera.position.set(0, 1.5, cfg.cameraZ);
    camera.lookAt(0, -3.5, 0);

    // Signals move with parallax; ground stays fixed in world space.
    const signalGroup = new THREE.Group();
    scene.add(signalGroup);

    const cIdle = new THREE.Color(cfg.colors.navy700);
    const cActive = new THREE.Color(cfg.colors.cyan400);
    const cHighlight = new THREE.Color(cfg.colors.cyan300);
    const cBlue = new THREE.Color(cfg.colors.blue500);

    // --- Ground plane (never animated, never parallaxed) ---
    const groundGeo = new THREE.BoxGeometry(
      cfg.ground.width,
      cfg.ground.thickness,
      cfg.ground.depth,
    );
    // Invisible collider only — paths still terminate here, but no black bar.
    const groundMat = new THREE.MeshBasicMaterial({
      color: cfg.colors.ink,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, cfg.ground.y, 0);
    scene.add(ground);

    // Soft cyan lip — keeps depth cue without a solid black band.
    const groundPlaneGeo = new THREE.PlaneGeometry(
      cfg.ground.width * 0.98,
      cfg.ground.depth * 0.98,
    );
    const edgeGeo = new THREE.EdgesGeometry(groundPlaneGeo);
    groundPlaneGeo.dispose();
    const edgeMat = new THREE.LineBasicMaterial({
      color: cfg.colors.cyan400,
      transparent: true,
      opacity: 0.18,
    });
    const groundEdge = new THREE.LineSegments(edgeGeo, edgeMat);
    groundEdge.rotation.x = -Math.PI / 2;
    groundEdge.position.set(0, cfg.ground.y + cfg.ground.thickness * 0.51, 0);
    scene.add(groundEdge);

    // --- Paths ---
    const maxLines = cfg.lineCount.lg;
    const rng = seededRand(404042);
    const paths: PathDef[] = [];
    for (let i = 0; i < maxLines; i++) {
      const points = buildOrthogonalPath(rng, cfg, i);
      const { cumLen, totalLen } = pathLengths(points);
      paths.push({
        points,
        cumLen,
        totalLen,
        phase: (i / maxLines) * 0.92 + rng() * 0.06,
        duty: 0.55 + rng() * 0.25,
      });
    }

    // Segment pool: each consecutive pair of waypoints is one line segment.
    let maxSegs = 0;
    for (const p of paths) maxSegs += Math.max(0, p.points.length - 1);

    const linePos = new Float32Array(maxSegs * 2 * 3);
    const lineCol = new Float32Array(maxSegs * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    lineGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(lineCol, 3).setUsage(THREE.DynamicDrawUsage),
    );
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: cfg.lineOpacity.max,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    signalGroup.add(lines);

    // Pulse nodes at junctions
    const maxPulses = maxLines * 4;
    const pulses: Pulse[] = Array.from({ length: maxPulses }, () => ({
      position: new THREE.Vector3(),
      age: 0,
      life: 0.7,
      active: false,
    }));
    const pulsePos = new Float32Array(maxPulses * 3);
    const pulseCol = new Float32Array(maxPulses * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(pulsePos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    pulseGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(pulseCol, 3).setUsage(THREE.DynamicDrawUsage),
    );
    const glowTex = makeGlowTexture();
    const pulseMat = new THREE.PointsMaterial({
      size: 0.85,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    signalGroup.add(pulsePoints);

    // Track last visited waypoint index per path to fire pulses once.
    const lastWaypoint = new Int16Array(maxLines).fill(-1);
    const headPos = new THREE.Vector3();
    const tmpColor = new THREE.Color();

    let activeCount = cfg.lineCount[currentTier()];

    const spawnPulse = (pos: THREE.Vector3) => {
      for (let i = 0; i < pulses.length; i++) {
        if (!pulses[i].active) {
          pulses[i].active = true;
          pulses[i].age = 0;
          pulses[i].life = 0.55 + Math.random() * 0.35;
          pulses[i].position.copy(pos);
          return;
        }
      }
    };

    const writeFrame = (cycleT: number) => {
      let seg = 0;
      let pulseDraw = 0;

      for (let pi = 0; pi < activeCount; pi++) {
        const path = paths[pi];
        const local =
          (((cycleT * cfg.speed) / cfg.cycleDuration + path.phase) % 1 + 1) % 1;
        // Travel during [0, duty), then idle until wrap — seamless loop.
        const traveling = local < path.duty;
        const progress = traveling ? local / path.duty : 1;
        const headDist = progress * path.totalLen;
        const trailLen = path.totalLen * 0.22;

        if (traveling) {
          pointAtLength(path.points, path.cumLen, headDist, headPos);
          // Detect waypoint crossings for pulse nodes.
          let wp = 0;
          while (
            wp < path.cumLen.length - 1 &&
            path.cumLen[wp] <= headDist + 0.001
          ) {
            wp++;
          }
          const crossed = wp - 1;
          if (crossed > lastWaypoint[pi] && crossed > 0) {
            spawnPulse(path.points[crossed]);
          }
          lastWaypoint[pi] = crossed;
        } else {
          lastWaypoint[pi] = -1;
        }

        for (let s = 0; s < path.points.length - 1; s++) {
          if (seg >= maxSegs) break;
          const a = path.points[s];
          const b = path.points[s + 1];
          const segStart = path.cumLen[s];
          const segEnd = path.cumLen[s + 1];
          const segMid = (segStart + segEnd) * 0.5;

          // Idle navy; cyan only on the active/traveling head + short trail.
          let mix = 0;
          if (traveling) {
            if (segEnd <= headDist && segStart >= headDist - trailLen) {
              const along = (headDist - segMid) / trailLen;
              mix = THREE.MathUtils.clamp(1 - along * 0.85, 0.25, 1);
            } else if (segStart <= headDist && segEnd >= headDist) {
              mix = 1;
            } else if (segEnd < headDist - trailLen) {
              mix = 0.08; // faint settled trace behind the signal
            }
          }

          if (mix > 0.5) {
            tmpColor.copy(cActive).lerp(cHighlight, (mix - 0.5) * 2);
          } else if (mix > 0) {
            tmpColor.copy(cIdle).lerp(cBlue, mix * 1.4);
          } else {
            tmpColor.copy(cIdle);
          }

          const alphaBoost = cfg.lineOpacity.min + mix * (cfg.lineOpacity.max - cfg.lineOpacity.min);
          // Bake opacity into vertex color brightness so idle stays quiet.
          tmpColor.multiplyScalar(0.55 + alphaBoost * 0.9);

          const base = seg * 6;
          linePos[base] = a.x;
          linePos[base + 1] = a.y;
          linePos[base + 2] = a.z;
          linePos[base + 3] = b.x;
          linePos[base + 4] = b.y;
          linePos[base + 5] = b.z;
          for (let k = 0; k < 2; k++) {
            lineCol[base + k * 3] = tmpColor.r;
            lineCol[base + k * 3 + 1] = tmpColor.g;
            lineCol[base + k * 3 + 2] = tmpColor.b;
          }
          seg++;
        }
      }

      // Pulses
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        if (!p.active) continue;
        const t = p.age / p.life;
        if (t >= 1) {
          p.active = false;
          continue;
        }
        // Pulse once: rise fast, fade slow.
        const envelope = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;
        pulsePos[pulseDraw * 3] = p.position.x;
        pulsePos[pulseDraw * 3 + 1] = p.position.y;
        pulsePos[pulseDraw * 3 + 2] = p.position.z;
        pulseCol[pulseDraw * 3] = cHighlight.r * envelope;
        pulseCol[pulseDraw * 3 + 1] = cHighlight.g * envelope;
        pulseCol[pulseDraw * 3 + 2] = cHighlight.b * envelope;
        pulseDraw++;
      }

      lineGeo.setDrawRange(0, seg * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
      pulseGeo.setDrawRange(0, pulseDraw);
      pulseGeo.attributes.position.needsUpdate = true;
      pulseGeo.attributes.color.needsUpdate = true;
      pulseMat.opacity = 0.85;
    };

    // --- Mount canvas ---
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 1.1s ease";
    host.appendChild(canvas);
    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };
    let worldPerPx = 0.02;

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      const cap = mqSm.matches ? cfg.dprCap.sm : cfg.dprCap.base;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      activeCount = cfg.lineCount[currentTier()];

      const depth = camera.position.z;
      const vFov = (camera.fov * Math.PI) / 180;
      const worldH = 2 * Math.tan(vFov / 2) * depth;
      worldPerPx = worldH / h;

      if (!running) {
        writeFrame(cfg.cycleDuration * 0.35);
        renderer.render(scene, camera);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = false;
    let inView = true;
    let elapsed = 0;

    // Phones spend far more main-thread time per WebGL draw call than
    // desktop, which is what showed up as a very high Total Blocking Time
    // in Lighthouse mobile audits. The scene is a slow ambient loop, so
    // drawing it at ~30fps instead of 60fps on the "base" tier is visually
    // unnoticeable but roughly halves the JS work Lighthouse penalizes.
    let frameAcc = 0;

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      const ease = 1 - Math.exp(-dt * 4.5);
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * ease;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * ease;

      // Max 15px screen displacement — signals only; ground stays put.
      const maxWorld = cfg.parallaxPx * worldPerPx;
      signalGroup.position.x = pointerCurrent.x * maxWorld;
      signalGroup.position.y = -pointerCurrent.y * maxWorld * 0.65;

      for (const p of pulses) {
        if (p.active) p.age += dt;
      }

      frameAcc += dt;
      const minInterval = currentTier() === "base" ? 1 / 30 : 0;
      if (frameAcc >= minInterval) {
        frameAcc = 0;
        writeFrame(elapsed);
        renderer.render(scene, camera);
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !inView || document.hidden || reducedMotion) return;
      running = true;
      clock.getDelta();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    window.addEventListener("resize", resize);

    let observer: IntersectionObserver | undefined;
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    if (reducedMotion) {
      writeFrame(cfg.cycleDuration * 0.4);
      renderer.render(scene, camera);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
      observer = new IntersectionObserver((entries) => {
        inView = entries.some((e) => e.isIntersecting);
        if (inView) start();
        else stop();
      });
      observer.observe(host);
      start();
    }

    return () => {
      stop();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      groundGeo.dispose();
      groundMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      glowTex.dispose();
      renderer.dispose();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, [config]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden />;
}
