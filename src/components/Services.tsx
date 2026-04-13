"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, useCallback } from "react";

const services = [
  {
    id: 1,
    number: "01",
    title: "Web Development",
    subtitle: "Crafting Digital Experiences",
    description:
      "From pixel-perfect landing pages to complex web applications, we build digital platforms that captivate users and convert at every touchpoint.",
    features: [
      "Custom Web Apps",
      "E-Commerce",
      "CMS Solutions",
      "API Development",
    ],
    icon: "⬡",
  },
  {
    id: 2,
    number: "02",
    title: "Mobile Apps",
    subtitle: "Native & Cross-Platform",
    description:
      "Stunning mobile experiences for iOS and Android. React Native and Flutter-powered apps that are fast, beautiful, and built to scale.",
    features: [
      "iOS Development",
      "Android Apps",
      "Cross-Platform",
      "App Store Optimization",
    ],
    icon: "◈",
  },
  {
    id: 3,
    number: "03",
    title: "UI/UX Design",
    subtitle: "Design That Converts",
    description:
      "Research-backed design philosophy that puts users first. Intuitive interfaces and seamless experiences through prototyping and rigorous usability testing.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    icon: "◎",
  },
  {
    id: 4,
    number: "04",
    title: "Brand Strategy",
    subtitle: "Identity That Inspires",
    description:
      "We help brands find their voice and visual identity. From logo design to comprehensive brand systems that resonate deeply with your audience.",
    features: ["Brand Identity", "Logo Design", "Style Guides", "Brand Voice"],
    icon: "◇",
  },
  {
    id: 5,
    number: "05",
    title: "Cloud Solutions",
    subtitle: "Scalable Infrastructure",
    description:
      "Future-proof your business with cloud-native architecture. Robust solutions on AWS, GCP, and Azure that grow with your ambitions.",
    features: ["Cloud Migration", "DevOps", "Serverless", "Microservices"],
    icon: "⬟",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
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
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
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
          borderColor: hovered ? "rgba(255,107,0,0.25)" : "rgba(0,0,0,0.06)",
          boxShadow: hovered
            ? "0 24px 60px -12px rgba(255,107,0,0.18), 0 0 0 1px rgba(255,107,0,0.12)"
            : "0 4px 24px -4px rgba(0,0,0,0.06)",
        }}
      >
        {/* Radial cursor glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 220px at ${glowX.get()}% ${glowY.get()}%, rgba(255,107,0,0.09) 0%, transparent 80%)`,
          }}
        />

        <div
          className="relative p-8 lg:p-10 h-full flex flex-col"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Number watermark */}
          <span
            className="absolute -top-3 -right-2 font-display text-[90px] font-bold select-none pointer-events-none transition-all duration-500"
            style={{
              color: hovered ? "rgba(255,107,0,0.12)" : "rgba(0,0,0,0.04)",
              lineHeight: 1,
            }}
          >
            {service.number}
          </span>

          {/* Icon */}
          <motion.div
            className="relative mb-7"
            style={{
              transform: "translateZ(20px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative w-14 h-14">
              <div
                className="absolute inset-0 rounded-2xl rotate-6 transition-all duration-300"
                style={{
                  backgroundColor: hovered
                    ? "rgba(255,107,0,0.15)"
                    : "rgba(255,107,0,0.08)",
                }}
              />
              <div
                className="relative w-full h-full rounded-2xl flex items-center justify-center text-2xl font-bold text-white transition-shadow duration-300"
                style={{
                  background: hovered
                    ? "linear-gradient(135deg, #ff6b00, #ff8c3a)"
                    : "linear-gradient(135deg, #ff7a10, #ff9040)",
                  boxShadow: hovered
                    ? "0 8px 24px rgba(255,107,0,0.4)"
                    : "0 4px 12px rgba(255,107,0,0.2)",
                }}
              >
                {service.icon}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div style={{ transform: "translateZ(16px)" }}>
            <span className="block font-heading text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-2">
              {service.subtitle}
            </span>
            <h3
              className="font-display text-2xl lg:text-[1.65rem] font-bold mb-4 transition-colors duration-300"
              style={{ color: hovered ? "#ff6b00" : "#0d0d0d" }}
            >
              {service.title}
            </h3>
            <p className="font-body text-gray-500 leading-relaxed text-[0.93rem] mb-6">
              {service.description}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {service.features.map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.07 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-full font-heading text-[11px] font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: hovered
                      ? "rgba(255,107,0,0.08)"
                      : "rgba(0,0,0,0.04)",
                    color: hovered ? "#ff6b00" : "#666",
                    border: hovered
                      ? "1px solid rgba(255,107,0,0.2)"
                      : "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom action */}
          <div className="mt-auto flex items-center justify-between">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                backgroundColor: hovered ? "#ff6b00" : "rgba(0,0,0,0.05)",
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
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative py-40 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fff 0%, #fafafa 50%, #fff 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,140,58,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="mb-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-orange-500" />
              <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
                What We Do
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display font-bold text-gray-950 leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              Capability
              <br />
              <span className="gradient-text">Engines</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 font-body text-lg max-w-xl leading-relaxed"
            >
              End-to-end digital solutions designed to elevate your brand,
              captivate your audience, and compound your growth.
            </motion.p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 lg:p-10 rounded-3xl border border-gray-100"
          style={{
            background: "linear-gradient(135deg, #fff9f5 0%, #ffffff 100%)",
          }}
        >
          <div>
            <p className="font-display text-xl font-bold text-gray-900 mb-1">
              Need something bespoke?
            </p>
            <p className="font-body text-gray-500">
              Let's build something that doesn't exist yet.
            </p>
          </div>
          <motion.a
            href="#contact"
            className="group relative overflow-hidden flex-shrink-0 px-8 py-4 rounded-full bg-gray-950 text-white font-heading font-bold"
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
              Get Custom Quote
              <svg
                className="w-4 h-4"
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
