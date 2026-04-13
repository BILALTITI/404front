"use client";

import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";

const CODE_LINES = [
  "initializing 4O4 systems...",
  "building digital experiences...",
  "deploying intelligent interfaces...",
  "optimizing performance layer...",
  "creative engine online",
  "systems active",
  "rendering future-ready solutions...",
  "compiling innovation framework...",
  "4O4.solutions :: ready",
  "establishing secure connections...",
  "loading adaptive components...",
  "synchronizing design protocols...",
  "creative.engine = true;",
  "await deploy('excellence');",
  "interface.render() → success",
];

interface LineConfig {
  id: number;
  text: string;
  x: number;
  y: number;
  layer: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function TypingLine({
  config,
  mouseX,
  mouseY,
}: {
  config: LineConfig;
  mouseX: number;
  mouseY: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "visible" | "fading">("waiting");

  const isLayer2 = config.layer === 2;
  const opacity = isLayer2 ? 0.28 : 0.45;
  const blur = isLayer2 ? 0.6 : 0;
  const fontSize = isLayer2 ? 13 : 14;

  // Subtle parallax from mouse
  const parallaxStrength = isLayer2 ? 8 : 4;
  const dx = mouseX * parallaxStrength;
  const dy = mouseY * parallaxStrength;

  useEffect(() => {
    let typingTimer: ReturnType<typeof setInterval>;
    let idx = 0;

    // Random start delay per line
    const startDelay = 300 + config.id * 1600;

    const startTimeout = setTimeout(() => {
      setPhase("typing");

      typingTimer = setInterval(() => {
        idx++;
        if (idx <= config.text.length) {
          setDisplayText(config.text.slice(0, idx));
        } else {
          clearInterval(typingTimer);
          setPhase("visible");

          setTimeout(() => {
            setPhase("fading");
            setTimeout(() => {
              setDisplayText("");
              setPhase("waiting");
              // Restart cycle
              idx = 0;
              setTimeout(() => {
                setPhase("typing");
                typingTimer = setInterval(() => {
                  idx++;
                  if (idx <= config.text.length) {
                    setDisplayText(config.text.slice(0, idx));
                  } else {
                    clearInterval(typingTimer);
                    setPhase("visible");
                    setTimeout(() => setPhase("fading"), 2500);
                  }
                }, 55 + seededRandom(config.id + 99) * 40);
              }, 1500 + seededRandom(config.id + 50) * 3000);
            }, 1200);
          }, 2500);
        }
      }, 55 + seededRandom(config.id) * 40);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(typingTimer);
    };
  }, [config]);

  const isVisible = phase === "typing" || phase === "visible";

  return (
    <motion.div
      className="absolute pointer-events-none select-none whitespace-nowrap font-mono"
      style={{
        top: `${config.y}%`,
        left: `${config.x}%`,
        fontSize,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        opacity: isVisible ? opacity : 0,
        x: dx,
        y: dy,
      }}
      transition={{
        opacity: { duration: phase === "fading" ? 1.5 : 0.6, ease: "easeInOut" },
        x: { duration: 0.8, ease: "easeOut" },
        y: { duration: 0.8, ease: "easeOut" },
      }}
    >
      <span className="text-orange-500">
        {displayText}
        {phase === "typing" && (
          <motion.span
            className="inline-block ml-0.5"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          >
            |
          </motion.span>
        )}
      </span>
    </motion.div>
  );
}

export function GhostCodeBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (!isMounted) return null;

  // Generate stable positions on side lanes (left/right) to avoid overlap
  const lines: LineConfig[] = [];
  const laneY = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 12];
  for (let i = 0; i < 12; i++) {
    const isLeftLane = i % 2 === 0;
    const xBase = isLeftLane ? 6 : 74;
    const xJitter = seededRandom(i * 13 + 9) * 10; // 0..10
    const yJitter = seededRandom(i * 17 + 11) * 2 - 1; // -1..1
    lines.push({
      id: i,
      text: CODE_LINES[i % CODE_LINES.length],
      x: xBase + xJitter,
      y: laneY[i] + yJitter,
      layer: i < 7 ? 1 : 2,
    });
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep gradient mesh for warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255,107,0,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Breathing center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(255,107,0,0.04) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ghost code lines */}
      {lines.map((line) => (
        <TypingLine
          key={line.id}
          config={line}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      ))}
    </div>
  );
}
