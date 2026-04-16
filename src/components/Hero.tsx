"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GhostCodeBackground } from "./GhostCodeBackground";

const HERO_BACKGROUND_SRC =
  "https://framerusercontent.com/images/tc4IY5GwaSnaAH9NzSPU11ALg.webp?width=5760&height=3912";

type HeadlineSeg = {
  text: string;
  accent: boolean;
  large: boolean;
  underline?: boolean;
};

export function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const line1 = t.raw("line1") as HeadlineSeg[];
  const line2 = t.raw("line2") as HeadlineSeg[];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.92]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [mouseX, mouseY],
  );

  const bgX = useTransform(smoothX, [-1, 1], [12, -12]);
  const bgY = useTransform(smoothY, [-1, 1], [8, -8]);
  const fgX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const fgY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const glowX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const glowY = useTransform(smoothY, [-1, 1], [-15, 15]);

  const renderWord = (
    word: HeadlineSeg,
    i: number,
    row: "first" | "rest",
    globalIndex: number,
  ) => {
    const isOrange = word.accent;
    const isLarge = word.large;
    const lineKey = `${row}-${i}`;
    return (
      <motion.span
        key={lineKey}
        className={`relative inline-block ${
          row === "rest" ? "block" : "inline-block"
        } ${row === "first" && i === 0 ? "text-5xl sm:text-7xl lg:text-8xl me-4" : row === "first" && i === 1 ? "text-5xl sm:text-7xl lg:text-8xl" : ""} ${
          isLarge ? "text-6xl sm:text-8xl lg:text-[108px]" : ""
        }`}
        initial={{ opacity: 0, y: 80, rotateX: -30 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 1,
          delay: 0.4 + globalIndex * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ perspective: "800px" }}
      >
        {isOrange ? (
          <span className="relative">
            <span
              className="absolute inset-0 gradient-text blur-xl opacity-30 select-none"
              aria-hidden
            >
              {word.text}
            </span>
            <span className="relative gradient-text" data-text={word.text}>
              {word.text}
            </span>
          </span>
        ) : (
          <span className="text-gray-900">{word.text}</span>
        )}
        {word.underline && (
          <>
            <motion.svg
              className="absolute -bottom-2 start-0 w-full overflow-visible"
              viewBox="0 0 280 10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <motion.path
                d="M2 7 Q70 2, 140 7 T278 7"
                fill="none"
                stroke="url(#orangeGradHero)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.8,
                  delay: 1.4,
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient
                  id="orangeGradHero"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#ff6b00" />
                  <stop offset="50%" stopColor="#ff8c3a" />
                  <stop offset="100%" stopColor="#ff6b00" />
                </linearGradient>
              </defs>
            </motion.svg>
            <motion.div
              className="absolute -bottom-3 start-0 w-full h-2 blur-md"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.3] }}
              transition={{
                delay: 2,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </>
        )}
      </motion.span>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#faf8f5]"
      id="hero"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_BACKGROUND_SRC}
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_100%] sm:object-[85%_100%] md:object-right-bottom"
          quality={100}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/25 sm:from-white sm:via-white/80 sm:to-transparent md:from-white/95 md:via-white/55 md:to-transparent rtl:bg-gradient-to-l rtl:sm:from-white rtl:sm:via-white/80 rtl:sm:to-transparent rtl:md:from-white/95 rtl:md:via-white/55 rtl:md:to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30 sm:from-white/20"
          aria-hidden
        />
      </div>

      <motion.div className="absolute inset-0 z-[1]" style={{ x: bgX, y: bgY }}>
        <GhostCodeBackground />
      </motion.div>

      <div className="absolute inset-0 z-[1] grid-pattern opacity-30" />

      <motion.div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none z-[2]"
        style={{ x: glowX, y: glowY }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,107,0,0.10) 0%, rgba(255,140,58,0.04) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
            x: fgX,
          }}
          className="max-w-7xl mx-auto px-6 lg:px-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <motion.span
              className="w-16 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{
                background: "linear-gradient(to right, transparent, #ff6b00)",
                transformOrigin: "left",
              }}
            />
            <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600 flex items-center gap-2">
              <motion.span
                className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t("overline")}
            </span>
            <motion.span
              className="w-16 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{
                background: "linear-gradient(to left, transparent, #ff6b00)",
                transformOrigin: "right",
              }}
            />
          </motion.div>

          <h1 className="font-display font-bold tracking-tight text-gray-950 mb-8 leading-[0.95]">
            <span className="block">
              {line1.map((w, i) => renderWord(w, i, "first", i))}
            </span>
            <span className="block mt-1">
              {line2.map((w, i) =>
                renderWord(w, i, "rest", line1.length + i),
              )}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mx-auto text-lg sm:text-xl text-gray-500 font-body mb-14 leading-relaxed"
          >
            <strong className="font-semibold text-gray-800">
              {t("descriptionBrand")}
            </strong>{" "}
            {t("descriptionMid")}{" "}
            <em className="not-italic text-gray-800 font-medium">
              {t("descriptionScope")}
            </em>{" "}
            {t("descriptionEnd")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#work"
              className="group relative overflow-hidden px-10 py-4 bg-gray-950 text-white font-heading font-bold rounded-full shadow-glow"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rtl:bg-gradient-to-l"
                initial={{ x: "-102%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 30px rgba(255,107,0,0.4), 0 0 60px rgba(255,107,0,0.15)",
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-3">
                {t("ctaPrimary")}
              </span>
            </motion.a>

            <motion.a
              href="#services"
              className="group px-9 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-heading font-semibold hover:border-orange-400 hover:text-orange-500 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-2">
                {t("ctaSecondary")}
                <svg
                  className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300 rtl:-scale-x-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              className="group px-9 py-4 rounded-full border-2 border-transparent text-gray-700 font-heading font-semibold bg-white/80 hover:border-orange-400 hover:text-orange-600 transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-2">
                {t("ctaContact")}
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.77 19.77 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 10.91a16 16 0 007.17 7.17l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 end-8 hidden lg:block z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8 }}
          className="flex items-center gap-2"
        >
          <span className="font-heading text-[10px] text-gray-300 tracking-widest uppercase">
            {t("cornerLabel")}
          </span>
          <span className="w-8 h-px bg-orange-400/40" />
        </motion.div>
      </div>
    </section>
  );
}
