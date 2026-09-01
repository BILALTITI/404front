"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import watadLogo from "@/images/Watadlogo.png";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function About() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const tWa = useTranslations("whatsapp");
  const startProjectLink = buildWhatsAppLink(tWa("startProject"));
  const locale = useLocale();
  const isArabic = locale === "ar";
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-40px" });
  const values = t.raw("values") as {
    number: string;
    title: string;
    desc: string;
  }[];
  const stats = t.raw("stats") as { value: string; label: string }[];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const decorY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-white"
    >
      <div
        className="absolute -top-8 start-0 font-display text-[20vw] font-bold text-gray-50 select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden
      >
        {t("bgWord")}
      </div>

      <div
        className="absolute top-1/3 end-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,184,222,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 sm:gap-20 lg:gap-28 items-center">
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-10 h-px bg-orange-500 shrink-0" />
              <span
                className={`font-heading text-xs font-bold text-orange-600 ${
                  isArabic
                    ? "tracking-normal"
                    : "tracking-[0.3em] uppercase"
                }`}
              >
                {t("eyebrow")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 44, filter: "blur(14px)", scale: 0.97 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                  : {}
              }
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`font-display font-bold text-[#123A5F] mb-7 ${
                isArabic ? "leading-[1.35]" : "leading-[1.05]"
              }`}
              style={{ fontSize: "clamp(1.9rem, 7.5vw, 4.5rem)" }}
            >
              {t("headingLine1")}
              <br />
              <span className="gradient-text gradient-text-shine inline-block py-[0.08em]">
                {t("headingGradient")}
              </span>
              <br />
              {t("headingLine2")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 font-body text-base sm:text-lg leading-relaxed mb-5"
            >
              {t("p1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-500 font-body text-base sm:text-lg leading-relaxed mb-8 sm:mb-12"
            >
              {t("p2")}{" "}
              <a href={`/${locale}#work`} className="text-orange-600 font-medium hover:underline">
                {t("p2Projects")}
              </a>{" "}
              {t("p2Or")}{" "}
              <a
                href={startProjectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 font-medium hover:underline"
              >
                {t("p2Contact")}
              </a>
              .
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-8 sm:mb-12">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  className="group flex items-start gap-3 p-4 rounded-2xl transition-colors hover:bg-orange-50/60"
                >
                  <span className="font-display text-2xl font-bold text-orange-500/25 group-hover:text-orange-500 transition-colors">
                    {v.number}
                  </span>
                  <div>
                    <p className="font-heading font-bold text-gray-900 mb-0.5">
                      {v.title}
                    </p>
                    <p className="font-body text-sm text-gray-400">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href={startProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex overflow-hidden items-center gap-3 px-8 py-4 rounded-full bg-[#0C2740] text-white font-heading font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-orange-500"
                initial={{ x: "-102%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative">{t("cta")}</span>
              <svg
                className="relative w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>

          <div className="relative">
            <motion.div style={{ y: imageY }} className="relative">
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,184,222,0.08) 0%, rgba(62,210,240,0.04) 100%)",
                  transform: "rotate(3deg) scale(1.02)",
                  y: decorY,
                }}
              />

              <div
                className="relative bg-white rounded-3xl overflow-hidden shadow-premium p-5 sm:p-8"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      className="p-4 sm:p-5 rounded-2xl text-center"
                      style={{
                        background: i % 2 === 0 ? "#F2F7FA" : "white",
                        border: "1px solid rgba(0,0,0,0.04)",
                      }}
                    >
                      <div className="font-display text-xl sm:text-3xl font-bold gradient-text mb-1 break-words">
                        {stat.value}
                      </div>
                      <div
                        className={`font-heading text-xs text-gray-400 ${
                          isArabic ? "tracking-normal" : "uppercase tracking-wide"
                        }`}
                      >
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Full logo — no circle, no empty padding */}
                <div className="flex justify-end mb-5">
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="shrink-0"
                  >
                    <Image
                      src={watadLogo}
                      alt={tCommon("brand")}
                      className="h-10 sm:h-12 md:h-14 w-auto max-w-[min(55vw,14rem)] object-contain object-right drop-shadow-md"
                      sizes="(max-width: 640px) 55vw, 224px"
                    />
                  </motion.div>
                </div>

                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ background: "#0d0d0d", padding: "20px 24px" }}
                >
                  <div className="flex gap-2 mb-4">
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                      <div
                        key={c}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-sm space-y-1.5" dir="ltr">
                    <p>
                      <span className="text-orange-400">const</span>{" "}
                      <span className="text-blue-300">watad</span>
                      <span className="text-white/60"> = {"{"}</span>
                    </p>
                    <p className="ps-4">
                      <span className="text-green-300">focus</span>
                      <span className="text-white/60">: </span>
                      <span className="text-orange-300">&quot;shipping&quot;</span>
                      <span className="text-white/60">,</span>
                    </p>
                    <p className="ps-4">
                      <span className="text-green-300">shipped</span>
                      <span className="text-white/60">: </span>
                      <span className="text-orange-300">&quot;20+&quot;</span>
                      <span className="text-white/60">,</span>
                    </p>
                    <p className="ps-4">
                      <span className="text-green-300">since</span>
                      <span className="text-white/60">: </span>
                      <span className="text-orange-300">2025</span>
                    </p>
                    <p>
                      <span className="text-white/60">{"}"}</span>
                    </p>
                    <motion.p
                      className="text-orange-500 font-bold"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      █
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
