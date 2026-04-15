"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Scope was clear from week one—no surprise change orders. We shipped our customer portal on the date we agreed, and their documentation made handover straightforward for our internal team.",
    author: "Omar Haddad",
    role: "CTO",
    company: "Regional logistics (Jordan)",
    metric: "On schedule",
    metricLabel: "Phase 1 launch",
    logoAbbr: "OH",
    accent: "#ff6b00",
  },
  {
    id: 2,
    quote:
      "4o4 integrated tightly with our existing .NET backend. The mobile app felt native, and when we had production issues, responses were fast and practical—not blame shifting.",
    author: "Dana Saeed",
    role: "Product lead",
    company: "Retail & lifestyle",
    metric: "2 platforms",
    metricLabel: "iOS & Android",
    logoAbbr: "DS",
    accent: "#ff8c3a",
  },
  {
    id: 3,
    quote:
      "We replaced a fragile mix of spreadsheets and email with n8n workflows. Finance finally trusts the numbers because the pipeline is visible and repeatable.",
    author: "Karim Nasser",
    role: "Operations director",
    company: "Services company (MENA)",
    metric: "Fewer manual",
    metricLabel: "Monthly reconciliations",
    logoAbbr: "KN",
    accent: "#ffa556",
  },
  {
    id: 4,
    quote:
      "As a small founding team we needed a partner who could challenge assumptions without slowing us down. 4o4 pushed for a thinner MVP, and it was the right call—we validated before overbuilding.",
    author: "Leila Khoury",
    role: "Co-founder",
    company: "Early-stage SaaS",
    metric: "MVP",
    metricLabel: "8-week first release",
    logoAbbr: "LK",
    accent: "#ff6b00",
  },
];

const ROTATE_INTERVAL = 5200;

function BackgroundCard({
  testimonial,
  position,
  isExiting,
}: {
  testimonial: (typeof testimonials)[0];
  position: "left" | "right" | "far-left" | "far-right";
  isExiting: boolean;
}) {
  const posStyles: Record<string, React.CSSProperties> = {
    "far-left": { left: "-2%", top: "15%", scale: "0.72", opacity: 0.18, rotate: "-8deg", zIndex: 1 },
    left: { left: "3%", top: "20%", scale: "0.82", opacity: 0.32, rotate: "-4deg", zIndex: 2 },
    right: { right: "3%", top: "20%", scale: "0.82", opacity: 0.32, rotate: "4deg", zIndex: 2 },
    "far-right": { right: "-2%", top: "15%", scale: "0.72", opacity: 0.18, rotate: "8deg", zIndex: 1 },
  };

  const s = posStyles[position];

  return (
    <motion.div
      className="absolute w-72 lg:w-80 pointer-events-none"
      style={s}
      animate={{
        y: [0, -10, 0, 8, 0],
        filter: `blur(${position.startsWith("far") ? 4 : 2}px)`,
      }}
      transition={{
        y: {
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        },
        filter: { duration: 0 },
      }}
    >
      <div
        className="bg-white rounded-2xl p-5 shadow-card"
        style={{ border: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
            style={{ backgroundColor: testimonial.accent }}
          >
            {testimonial.logoAbbr}
          </div>
          <div>
            <p className="font-heading text-xs font-semibold text-gray-700">{testimonial.author}</p>
            <p className="font-body text-[10px] text-gray-400">{testimonial.company}</p>
          </div>
        </div>
        <p className="font-body text-xs text-gray-500 leading-relaxed line-clamp-3">
          "{testimonial.quote.substring(0, 90)}..."
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDirection(1);
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused]);

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  const active = testimonials[activeIndex];
  const bgLeft = testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length];
  const bgRight = testimonials[(activeIndex + 1) % testimonials.length];
  const bgFarLeft = testimonials[(activeIndex - 2 + testimonials.length) % testimonials.length];
  const bgFarRight = testimonials[(activeIndex + 2) % testimonials.length];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #fff9f5 40%, #fff5ee 60%, #ffffff 100%)",
      }}
    >
      {/* Ambient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,107,0,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-10 h-px bg-orange-500" />
            <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
              Partner feedback
            </span>
            <span className="w-10 h-px bg-orange-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-gray-950 leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What partners say
            <br />
            <span className="gradient-text">about 4o4</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-body text-lg max-w-lg mx-auto"
          >
            Real quotes from product and operations leaders we have worked with—
            focused on delivery, clarity, and outcomes you can verify.
          </motion.p>
        </div>

        {/* Floating depth stage */}
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: 480 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background cards — desktop only */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <BackgroundCard testimonial={bgFarLeft} position="far-left" isExiting={false} />
            <BackgroundCard testimonial={bgLeft} position="left" isExiting={false} />
            <BackgroundCard testimonial={bgRight} position="right" isExiting={false} />
            <BackgroundCard testimonial={bgFarRight} position="far-right" isExiting={false} />
          </div>

          {/* Primary testimonial */}
          <div className="relative z-10 w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, y: direction > 0 ? 40 : -40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: direction > 0 ? -40 : 40, scale: 0.96 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-3xl overflow-hidden"
                style={{
                  border: `1px solid rgba(255,107,0,0.15)`,
                  boxShadow: "0 32px 80px -16px rgba(255,107,0,0.12), 0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                {/* Top orange accent */}
                <div
                  className="h-1"
                  style={{ background: `linear-gradient(90deg, ${active.accent}, ${active.accent}88)` }}
                />

                <div className="p-8 lg:p-10">
                  {/* Quote icon + metric */}
                  <div className="flex items-start justify-between mb-7">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${active.accent}18` }}
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active.accent}>
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <div
                      className="text-right px-5 py-3 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${active.accent}12, ${active.accent}05)`,
                        border: `1px solid ${active.accent}22`,
                      }}
                    >
                      <div
                        className="font-display text-3xl font-bold"
                        style={{ color: active.accent }}
                      >
                        {active.metric}
                      </div>
                      <div className="font-heading text-xs text-gray-400 uppercase tracking-wider">
                        {active.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
                        className="w-4 h-4 text-orange-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </motion.svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-body text-gray-700 text-lg leading-relaxed mb-8">
                    "{active.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-full border-2 border-white shadow-md flex items-center justify-center font-heading font-bold text-white text-sm"
                        style={{
                          background: `linear-gradient(135deg, ${active.accent}, ${active.accent}99)`,
                        }}
                        aria-label={active.author}
                      >
                        {active.logoAbbr}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: active.accent }}
                      />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-gray-900 text-base">
                        {active.author}
                      </div>
                      <div className="font-body text-sm text-gray-400">
                        {active.role},{" "}
                        <span style={{ color: active.accent }}>{active.company}</span>
                      </div>
                    </div>

                    {/* Logo abbr */}
                    <div className="ml-auto">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-white text-sm"
                        style={{ backgroundColor: `${active.accent}dd` }}
                      >
                        {active.logoAbbr}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => goTo((activeIndex - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:border-orange-300 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="relative overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 32 : 8,
                    height: 8,
                    backgroundColor:
                      i === activeIndex ? active.accent : "rgba(0,0,0,0.12)",
                  }}
                />
              ))}

              <button
                type="button"
                onClick={() => goTo((activeIndex + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:border-orange-300 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
