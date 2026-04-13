"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useCallback } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const dotX = useSpring(cursorX, { stiffness: 900, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 40 });

  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const [hoverState, setHoverState] = useState<"default" | "link" | "project" | "button">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const updateHoverState = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-cursor='project']")) {
      setHoverState("project");
    } else if (target.closest("button") || target.closest("[data-cursor='button']")) {
      setHoverState("button");
    } else if (target.closest("a") || target.closest("[data-cursor='link']")) {
      setHoverState("link");
    } else {
      setHoverState("default");
    }
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      updateHoverState(e);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY, isVisible, updateHoverState]);

  const ringSize =
    hoverState === "project" ? 80 :
    hoverState === "button" ? 56 :
    hoverState === "link" ? 48 :
    isClicking ? 20 : 36;

  const dotSize =
    hoverState === "project" ? 4 :
    hoverState === "button" ? 10 :
    isClicking ? 18 : 6;

  const ringBg =
    hoverState === "project" ? "rgba(255, 107, 0, 0.12)" :
    hoverState === "button" ? "rgba(255, 107, 0, 0.08)" :
    "transparent";

  const ringBorder =
    hoverState === "project" ? "rgba(255, 107, 0, 0.7)" :
    hoverState === "button" ? "rgba(255, 107, 0, 0.8)" :
    hoverState === "link" ? "rgba(255, 107, 0, 0.5)" :
    "rgba(255, 107, 0, 0.35)";

  return (
    <>
      {/* Outer ring – slower, elastic */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          style={{
            borderRadius: "50%",
            border: `1px solid ${ringBorder}`,
            backgroundColor: ringBg,
          }}
          animate={{
            width: ringSize,
            height: ringSize,
            boxShadow: hoverState !== "default"
              ? `0 0 ${ringSize}px rgba(255, 107, 0, 0.15)`
              : "0 0 12px rgba(255, 107, 0, 0.06)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.div>

      {/* Inner dot – fast */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full bg-orange-500"
          animate={{
            width: dotSize,
            height: dotSize,
            boxShadow: "0 0 12px rgba(255, 107, 0, 0.6)",
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* "View" label on project hover */}
      {hoverState === "project" && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] pointer-events-none"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <span className="font-heading text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">
            View
          </span>
        </motion.div>
      )}
    </>
  );
}
