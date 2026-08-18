"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type ProcessStepCopy = {
  number: string;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  accent: string;
};

function ProcessStep({
  step,
  index,
  total,
}: {
  step: ProcessStepCopy;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(false);

  // Accordion on mobile (grid-rows 0fr→1fr); always expanded from md up.
  const collapseCls = `grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
  }`;

  return (
    <div ref={ref} className="relative flex gap-5 sm:gap-8 lg:gap-12">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12, type: "spring", stiffness: 200 }}
          className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-display text-sm sm:text-base font-bold text-white z-10"
          style={{
            background: `linear-gradient(135deg, ${step.accent}, ${step.accent}99)`,
            boxShadow: `0 8px 24px ${step.accent}40`,
          }}
        >
          {step.number}
        </motion.div>

        {index < total - 1 && (
          <motion.div
            className="relative flex-1 w-px mt-3"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            style={{
              background: `linear-gradient(to bottom, ${step.accent}60, rgba(0,0,0,0.06))`,
              transformOrigin: "top",
              minHeight: 60,
            }}
          >
            <motion.span
              className="absolute -start-1 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: step.accent }}
              animate={{ y: [0, 52, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
            />
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
        animate={
          isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}
        }
        transition={{ duration: 0.8, delay: index * 0.12 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pb-12 flex-1"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full text-start flex flex-wrap items-center gap-3 mb-3 md:pointer-events-none md:cursor-default"
        >
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {step.title}
          </h3>
          <span
            className="px-3 py-1.5 rounded-full font-heading text-xs font-bold tracking-wide"
            style={{
              backgroundColor: `${step.accent}20`,
              color: step.accent,
              border: `1px solid ${step.accent}40`,
            }}
          >
            {step.duration}
          </span>
          <svg
            className={`md:hidden ms-auto w-5 h-5 text-white/50 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Description + deliverables — accordion on mobile, open md+ */}
        <div className={collapseCls}>
          <div className="overflow-hidden min-h-0">
            <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed mb-6 max-w-lg pt-1">
              {step.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {step.deliverables.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-xs text-white/60"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: step.accent }}
                  />
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  const t = useTranslations("process");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const steps = t.raw("steps") as ProcessStepCopy[];
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-[#0C2740]"
    >
      <div
        className="absolute top-0 start-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,184,222,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 end-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(62,210,240,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grid-pattern-light opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          <div ref={headerRef} className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-10 h-px bg-orange-500" />
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-500">
                {t("eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 44, filter: "blur(14px)", scale: 0.97 }}
              animate={
                isHeaderInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                  : {}
              }
              transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white leading-[1.05] mb-7"
              style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
            >
              {t("titleLine1")}
              <br />
              <span className="text-white">{t("to")}</span>{" "}
              <motion.span
                className="gradient-text inline-block"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(34,184,222,0)",
                    "0 0 16px rgba(34,184,222,0.35)",
                    "0 0 0px rgba(34,184,222,0)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                {t("titleGradient")}
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-body text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mb-10"
            >
              {t("intro")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex gap-8"
            >
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{t("metric1Value")}</div>
                <div
                  className={`font-heading text-xs text-gray-500 ${
                    isArabic ? "tracking-normal" : "uppercase tracking-wide"
                  }`}
                >
                  {t("metric1Label")}
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{t("metric2Value")}</div>
                <div
                  className={`font-heading text-xs text-gray-500 ${
                    isArabic ? "tracking-normal" : "uppercase tracking-wide"
                  }`}
                >
                  {t("metric2Label")}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="pt-4">
            {steps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} total={steps.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
