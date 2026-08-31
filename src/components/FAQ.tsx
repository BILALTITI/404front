"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type FaqItemCopy = {
  question: string;
  answer: string;
};

function FaqRow({ item, index }: { item: FaqItemCopy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(index === 0);
  const panelId = `faq-panel-${index}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-gray-100 last:border-b-0"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-start flex items-center justify-between gap-4 py-5 sm:py-6 group"
      >
        <span className="font-heading text-base sm:text-lg font-semibold text-[#123A5F] group-hover:text-[#22B8DE] transition-colors">
          {item.question}
        </span>
        <svg
          className={`shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* Grid-rows collapse keeps the answer text in the DOM (not unmounted)
          so it stays crawlable/quotable even while visually collapsed. */}
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <p className="font-body text-sm sm:text-base text-gray-500 leading-relaxed pb-5 sm:pb-6 max-w-2xl">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const items = t.raw("items") as FaqItemCopy[];
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-white">
      <div
        className="absolute top-0 end-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,184,222,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <div ref={headerRef} className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-10 h-px bg-orange-500 shrink-0" />
            <span
              className={`font-heading text-xs font-bold text-orange-600 ${
                isArabic ? "tracking-normal" : "tracking-[0.3em] uppercase"
              }`}
            >
              {t("eyebrow")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 44, filter: "blur(14px)", scale: 0.97 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}
            }
            transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`font-display font-bold text-[#123A5F] mb-6 ${
              isArabic ? "leading-[1.35]" : "leading-[1.05]"
            }`}
            style={{ fontSize: "clamp(1.9rem, 6.5vw, 3.75rem)" }}
          >
            {t("titleLine1")}{" "}
            <span className="gradient-text gradient-text-shine inline-block py-[0.08em]">
              {t("titleGradient")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-gray-500 text-base sm:text-lg leading-relaxed"
          >
            {t("intro")}
          </motion.p>
        </div>

        <div>
          {items.map((item, i) => (
            <FaqRow key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
