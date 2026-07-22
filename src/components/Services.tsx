"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

type ServiceCopy = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
};

function ServiceCard({
  service,
  index,
}: {
  service: ServiceCopy;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  // Compact on mobile: description + chips collapse (grid-rows 0fr→1fr);
  // always expanded from md up.
  const collapseCls = `grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
  }`;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    },
    [mouseX, mouseY],
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, filter: "blur(14px)", scale: 0.94 }}
      animate={
        isInView ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : {}
      }
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
      style={{ perspective: "1200px" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden border transition-all duration-300"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "white",
          borderColor: hovered ? "rgba(34,184,222,0.25)" : "rgba(0,0,0,0.06)",
          boxShadow: hovered
            ? "0 24px 60px -12px rgba(34,184,222,0.18), 0 0 0 1px rgba(34,184,222,0.12)"
            : "0 4px 24px -4px rgba(0,0,0,0.06)",
        }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 220px at ${glowX.get()}% ${glowY.get()}%, rgba(34,184,222,0.09) 0%, transparent 80%)`,
          }}
        />

        <div
          className="relative p-4 sm:p-8 lg:p-10 h-full flex flex-col cursor-pointer md:cursor-default"
          style={{ transformStyle: "preserve-3d" }}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="hidden md:block absolute -top-3 -end-2 font-display text-[90px] font-bold select-none pointer-events-none transition-all duration-500"
            style={{
              color: hovered ? "rgba(34,184,222,0.12)" : "rgba(0,0,0,0.04)",
              lineHeight: 1,
            }}
          >
            {service.number}
          </span>

          <motion.div
            className="relative mb-4 sm:mb-7"
            style={{
              transform: "translateZ(20px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <div
                className="absolute inset-0 rounded-2xl rotate-6 transition-all duration-300"
                style={{
                  backgroundColor: hovered
                    ? "rgba(34,184,222,0.15)"
                    : "rgba(34,184,222,0.08)",
                }}
              />
              <div
                className="relative w-full h-full rounded-2xl flex items-center justify-center text-2xl font-bold text-white transition-shadow duration-300"
                style={{
                  background: hovered
                    ? "linear-gradient(135deg, #22B8DE, #3ED2F0)"
                    : "linear-gradient(135deg, #22B8DE, #3ED2F0)",
                  boxShadow: hovered
                    ? "0 8px 24px rgba(34,184,222,0.4)"
                    : "0 4px 12px rgba(34,184,222,0.2)",
                }}
              >
                {service.icon}
              </div>
            </div>
          </motion.div>

          <div style={{ transform: "translateZ(16px)" }}>
            <span className="block font-heading text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-1.5 sm:mb-2">
              {service.subtitle}
            </span>
            <div className="flex items-start justify-between gap-2 mb-0 md:mb-4">
              <h3
                className="font-display text-base sm:text-2xl lg:text-[1.65rem] font-bold transition-colors duration-300"
                style={{ color: hovered ? "#22B8DE" : "#0d0d0d" }}
              >
                {service.title}
              </h3>
              <svg
                className={`md:hidden shrink-0 mt-1 w-4 h-4 text-[#1B6491] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {/* Description + chips — collapse on mobile, open md+ */}
            <div className={collapseCls}>
              <div className="overflow-hidden min-h-0">
                <p className="font-body text-gray-500 leading-relaxed text-[0.9rem] sm:text-[0.93rem] pt-2 md:pt-0 mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-2 md:mb-8">
                  {service.features.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.07 + i * 0.05 }}
                      className="px-3 py-1.5 rounded-full font-heading text-[11px] font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: hovered
                          ? "rgba(34,184,222,0.08)"
                          : "rgba(0,0,0,0.04)",
                        color: hovered ? "#22B8DE" : "#666",
                        border: hovered
                          ? "1px solid rgba(34,184,222,0.2)"
                          : "1px solid rgba(0,0,0,0.07)",
                      }}
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto hidden md:flex items-center justify-between">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                backgroundColor: hovered ? "#22B8DE" : "rgba(0,0,0,0.05)",
                color: hovered ? "white" : "#999",
              }}
            >
              {service.number}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const t = useTranslations("services");
  const services = t.raw("list") as ServiceCopy[];
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fff 0%, #fafafa 50%, #fff 100%)",
      }}
    >
      <div
        className="absolute top-1/4 -end-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,184,222,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -start-40 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(62,210,240,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={headerRef} className="mb-14 sm:mb-20 lg:mb-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-orange-500" />
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
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
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display font-bold text-[#123A5F] leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)" }}
            >
              {t("titleLine1")}
              <br />
              <span className="gradient-text gradient-text-shine">
                {t("titleGradient")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 font-body text-base sm:text-lg max-w-xl leading-relaxed"
            >
              {t("intro")}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start md:items-stretch">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 lg:p-10 rounded-3xl border border-gray-100"
          style={{
            background: "linear-gradient(135deg, #F2F7FA 0%, #ffffff 100%)",
          }}
        >
          <div>
            <p className="font-display text-xl font-bold text-gray-900 mb-1">
              {t("ctaTitle")}
            </p>
            <p className="font-body text-gray-500">{t("ctaBody")}</p>
          </div>
          <motion.a
            href="#contact"
            className="group relative overflow-hidden flex-shrink-0 w-full sm:w-auto justify-center px-8 py-4 rounded-full bg-[#0C2740] text-white font-heading font-bold animate-pulse-glow inline-flex"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 bg-orange-500"
              initial={{ x: "-102%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative flex items-center gap-2">
              {t("ctaButton")}
              <svg
                className="w-4 h-4 rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
