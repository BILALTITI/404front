"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const values = [
  { number: "01", title: "Innovation", desc: "Pushing the boundaries of what digital can be" },
  { number: "02", title: "Quality", desc: "Pixel-perfect delivery, zero compromises" },
  { number: "03", title: "Partnership", desc: "Long-term success over short-term gains" },
  { number: "04", title: "Results", desc: "Measurable impact on your bottom line" },
];

const stats = [
  { value: "150+", label: "Projects" },
  { value: "12+", label: "Years" },
  { value: "50+", label: "Experts" },
  { value: "98%", label: "Satisfaction" },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

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
      className="relative py-40 overflow-hidden bg-white"
    >
      {/* Large background text */}
      <div
        className="absolute -top-8 left-0 font-display text-[20vw] font-bold text-gray-50 select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden
      >
        ABOUT
      </div>

      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
          {/* Left: Content */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-10 h-px bg-orange-500" />
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
                About Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-gray-950 leading-[1.05] mb-7"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              We're not just
              <br />
              <span className="gradient-text">developers</span>—
              <br />
              we're digital
              <br />
              architects.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 font-body text-lg leading-relaxed mb-5"
            >
              At 4O4 Solutions, we believe exceptional digital experiences are born
              from the perfect blend of strategy, creativity, and technical mastery.
              Since 2014, we've been transforming bold ideas into digital realities
              that drive growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-500 font-body text-lg leading-relaxed mb-12"
            >
              Our team of designers, engineers, and strategists work as an
              extension of your team — bringing passion and precision to every
              pixel.
            </motion.p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-5 mb-12">
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
                    <p className="font-heading font-bold text-gray-900 mb-0.5">{v.title}</p>
                    <p className="font-body text-sm text-gray-400">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="group relative inline-flex overflow-hidden items-center gap-3 px-8 py-4 rounded-full bg-gray-950 text-white font-heading font-bold"
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
              <span className="relative">Work With Us</span>
              <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <motion.div style={{ y: imageY }} className="relative">
              {/* Background shape */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(255,140,58,0.04) 100%)",
                  transform: "rotate(3deg) scale(1.02)",
                  y: decorY,
                }}
              />

              {/* Main card */}
              <div
                className="relative bg-white rounded-3xl overflow-hidden shadow-premium p-8"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              >
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      className="p-5 rounded-2xl text-center"
                      style={{ background: i % 2 === 0 ? "#fff9f5" : "white", border: "1px solid rgba(0,0,0,0.04)" }}
                    >
                      <div className="font-display text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                      <div className="font-heading text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Floating brand element */}
                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #ff6b00, #ff8c3a)",
                    boxShadow: "0 12px 32px rgba(255,107,0,0.35)",
                  }}
                >
                  <span className="font-display text-2xl font-bold text-white">4O4</span>
                </motion.div>

                {/* Code-like decoration */}
                <div className="relative rounded-2xl overflow-hidden" style={{ background: "#0d0d0d", padding: "20px 24px" }}>
                  <div className="flex gap-2 mb-4">
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="font-mono text-sm space-y-1.5">
                    <p>
                      <span className="text-orange-400">const</span>{" "}
                      <span className="text-blue-300">agency</span>
                      <span className="text-white/60"> = {"{"}</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-green-300">quality</span>
                      <span className="text-white/60">: </span>
                      <span className="text-orange-300">"obsessed"</span>
                      <span className="text-white/60">,</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-green-300">clients</span>
                      <span className="text-white/60">: </span>
                      <span className="text-orange-300">"150+"</span>
                      <span className="text-white/60">,</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-green-300">mindset</span>
                      <span className="text-white/60">: </span>
                      <span className="text-orange-300">"future-first"</span>
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
