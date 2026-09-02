"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import WatadHeroAnimation from "./WatadHeroAnimation";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tWa = useTranslations("whatsapp");
  const bookCallLink = buildWhatsAppLink(tWa("bookCall"));
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.94]);

  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    },
    [mouseX],
  );

  const fgX = useTransform(smoothX, [-1, 1], [-5, 5]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh min-h-screen flex flex-col overflow-hidden bg-[#0C2740]"
      id="hero"
      onMouseMove={handleMouseMove}
    >
      {/* Signal field — full bleed; poster paints first for LCP */}
      <WatadHeroAnimation className="absolute inset-0 z-[1] h-full w-full" />

      {/* Soft vignette so headline stays AA over any animation frame */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(12,39,64,0.55) 0%, rgba(12,39,64,0.2) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="flex-1 flex items-center justify-center relative z-10 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-24">
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
            x: fgX,
          }}
          className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 text-center"
        >
          <h1 className="font-display font-bold tracking-tight mb-8 sm:mb-10 leading-[1.1] sm:leading-[0.95]">
            {/*
              Plain <span> + CSS animation, not motion.span: once the
              subtitle below stopped being the LCP element (see the note
              on that <p>), Lighthouse re-elected this headline instead --
              same root cause, a JS-gated reveal on a large text block.
            */}
            <span
              className="animate-hero-title-reveal block text-[clamp(3.25rem,16vw,7.5rem)] sm:text-8xl lg:text-[120px] text-white"
            >
              {/^[A-Za-z]+$/.test(tCommon("brand")) ? (
                <>
                  {tCommon("brand").slice(0, -2)}
                  <span style={{ color: "#22B8DE" }}>
                    {tCommon("brand").slice(-2)}
                  </span>
                </>
              ) : (
                tCommon("brand")
              )}
            </span>
          </h1>

          {/*
            Plain <p> + CSS animation, not motion.p: this text is the
            page's LCP element, and a JS-driven Framer Motion reveal here
            was gating its final paint behind React hydration, adding
            multiple seconds to LCP on throttled mobile connections. The
            hero-reveal keyframe (globals.css) gives the identical
            fade-up-blur look without that dependency.
          */}
          <p
            className="animate-hero-reveal max-w-lg mx-auto text-base sm:text-lg text-white/75 font-body mb-10 sm:mb-12 leading-relaxed"
          >
            <strong className="font-semibold text-white">
              {t("descriptionBrand")}
            </strong>{" "}
            {t("descriptionMid")}{" "}
            <em className="not-italic text-white/90 font-medium">
              {t("descriptionScope")}
            </em>{" "}
            {t("descriptionEnd")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href={`/${locale}#work`}
              className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 font-heading font-bold text-[#0C2740] rounded-full"
              style={{ background: "#22B8DE" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("ctaPrimary")}
            </motion.a>

            <motion.a
              href={bookCallLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 sm:px-9 py-4 rounded-full border border-white/25 text-white/90 font-heading font-semibold hover:border-[#22B8DE] hover:text-[#3ED2F0] transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("ctaContact")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 end-8 hidden lg:block z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          className="flex items-center gap-2"
        >
          <span className="font-heading text-[10px] text-white/35 tracking-widest uppercase">
            {t("cornerLabel")}
          </span>
          <span className="w-8 h-px" style={{ background: "rgba(34,184,222,0.4)" }} />
        </motion.div>
      </div>
    </section>
  );
}
