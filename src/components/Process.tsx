"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

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

  return (
    <div ref={ref} className="relative flex gap-8 lg:gap-12">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12, type: "spring", stiffness: 200 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-white z-10"
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
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.12 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pb-12 flex-1"
      >
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white">
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
        </div>

        <p className="font-body text-gray-400 leading-relaxed mb-6 max-w-lg">
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
      </motion.div>
    </div>
  );
}

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as ProcessStepCopy[];
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="relative py-40 overflow-hidden bg-gray-950"
    >
      <div
        className="absolute top-0 start-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 end-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,140,58,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grid-pattern-light opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
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
              initial={{ opacity: 0, y: 40 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white leading-[1.05] mb-7"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
            >
              {t("titleLine1")}
              <br />
              <span className="text-white">{t("to")}</span>{" "}
              <motion.span
                className="gradient-text inline-block"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255,107,0,0)",
                    "0 0 16px rgba(255,107,0,0.35)",
                    "0 0 0px rgba(255,107,0,0)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                {t("titleGradient")}
              </motion.span>
              .
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-body text-gray-400 text-lg leading-relaxed max-w-md mb-10"
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
                <div className="font-display text-3xl font-bold gradient-text">{t("metric1Value")}</div>
                <div className="font-heading text-xs text-gray-500 uppercase tracking-wide">{t("metric1Label")}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold gradient-text">{t("metric2Value")}</div>
                <div className="font-heading text-xs text-gray-500 uppercase tracking-wide">{t("metric2Label")}</div>
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
