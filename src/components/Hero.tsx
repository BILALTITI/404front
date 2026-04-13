"use client";

import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";
import { HeroOrb } from "./HeroOrb";

const HEADLINE_WORDS = ["We", "Build", "Digital", "Futures"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollVelocityRef = useRef(0);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollVelocity = useVelocity(scrollY);

  useMotionValueEvent(scrollVelocity, "change", (v) => {
    scrollVelocityRef.current = v;
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.92]);

  const orbScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.25]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white noise"
      id="hero"
    >
      {/* Radial gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,107,0,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent pointer-events-none"
        animate={{ y: ["-50vh", "150vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      {/* 3D Orb */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: orbScale, opacity: orbOpacity }}
      >
        <HeroOrb scrollVelocityRef={scrollVelocityRef} />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center"
      >
        {/* Overline pill */}
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
            Digital Excellence
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

        {/* Main headline — word-by-word reveal */}
        <h1 className="font-display font-bold tracking-tight text-gray-950 mb-8 leading-[0.95]">
          {HEADLINE_WORDS.map((word, i) => {
            const isOrange = word === "Digital" || word === "Futures";
            const isLarge = word === "Digital" || word === "Futures";
            return (
              <motion.span
                key={word}
                className={`relative inline-block ${i === 2 || i === 3 ? "block" : "inline-block "} ${
                  i < 2 ? "text-5xl sm:text-7xl lg:text-8xl mr-4" : ""
                } ${isLarge ? "text-6xl sm:text-8xl lg:text-[108px]" : ""}`}
                initial={{ opacity: 0, y: 80, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredWord(i)}
                onMouseLeave={() => setHoveredWord(null)}
                style={{ perspective: "800px" }}
              >
                {isOrange ? (
                  <span
                    className="relative gradient-text"
                    data-text={word}
                  >
                    {word}
                    {hoveredWord === i && (
                      <>
                        <motion.span
                          className="absolute inset-0 gradient-text select-none"
                          animate={{
                            x: [-3, 3, -2, 2, 0],
                            opacity: [0.7, 0.8, 0.6, 0.7, 0],
                          }}
                          transition={{ duration: 0.4, ease: "linear" }}
                          aria-hidden
                        >
                          {word}
                        </motion.span>
                      </>
                    )}
                  </span>
                ) : (
                  <span className="text-gray-900">{word}</span>
                )}
                {/* Underline on last word */}
                {word === "Futures" && (
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full overflow-visible"
                    viewBox="0 0 280 10"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.8, delay: 1.4, ease: "easeInOut" }}
                  >
                    <motion.path
                      d="M2 7 Q70 2, 140 7 T278 7"
                      fill="none"
                      stroke="url(#orangeGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ff6b00" />
                        <stop offset="50%" stopColor="#ff8c3a" />
                        <stop offset="100%" stopColor="#ff6b00" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                )}
              </motion.span>
            );
          })}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-lg sm:text-xl text-gray-500 font-body mb-14 leading-relaxed"
        >
          A forward-thinking digital agency crafting{" "}
          <em className="not-italic text-gray-800 font-medium">
            cinematic websites, apps, and experiences
          </em>{" "}
          that transform ideas into unforgettable realities.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#work"
            className="group relative overflow-hidden px-9 py-4 bg-gray-950 text-white font-heading font-bold rounded-full"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"
              initial={{ x: "-102%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative flex items-center gap-3">
              Explore Our Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </motion.a>

          <motion.a
            href="#services"
            className="group px-9 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-heading font-semibold hover:border-orange-400 hover:text-orange-500 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2">
              Our Services
              <svg className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 relative"
        >
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden">
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "12+", label: "Years Experience" },
              { value: "50+", label: "Expert Creatives" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative bg-white px-6 py-8 text-center group"
                whileHover={{ backgroundColor: "#fff9f5" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.1, type: "spring", stiffness: 200 }}
                  className="font-display text-3xl sm:text-4xl font-bold text-gray-950 mb-1 group-hover:text-orange-500 transition-colors"
                >
                  {stat.value}
                </motion.div>
                <div className="font-body text-xs text-gray-400 tracking-wide">
                  {stat.label}
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <motion.span
          className="font-heading text-[10px] tracking-[0.4em] text-gray-300 uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <div className="w-5 h-9 rounded-full border border-gray-200 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-orange-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Corner accent labels */}
      <div className="absolute bottom-10 left-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8 }}
          className="flex items-center gap-2"
        >
          <span className="font-heading text-[10px] text-gray-300 tracking-widest uppercase">
            4O4 Solutions © 2024
          </span>
        </motion.div>
      </div>
      <div className="absolute bottom-10 right-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8 }}
          className="flex items-center gap-2"
        >
          <span className="font-heading text-[10px] text-gray-300 tracking-widest uppercase">
            Digital Agency
          </span>
          <span className="w-8 h-px bg-orange-400/40" />
        </motion.div>
      </div>
    </section>
  );
}
