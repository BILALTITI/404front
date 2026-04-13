"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    number: "01",
    title: "Nexus Banking",
    subtitle: "Fintech Revolution",
    category: "Web Application",
    description:
      "A next-generation digital banking platform that redefined how millennials interact with their finances. End-to-end design system with real-time transaction intelligence.",
    results: [
      { value: "300%", label: "User Growth" },
      { value: "4.9★", label: "App Rating" },
      { value: "$50M", label: "Processed" },
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&h=900&fit=crop",
    accent: "#ff6b00",
    year: "2024",
    tags: ["React", "Node.js", "Real-time"],
  },
  {
    id: 2,
    number: "02",
    title: "Verdant Spaces",
    subtitle: "Smart Home Evolution",
    category: "IoT Platform",
    description:
      "An intelligent home automation system connecting over 200+ smart devices. Seamless UX for complex IoT ecosystems — beautiful on every surface.",
    results: [
      { value: "200K+", label: "Devices" },
      { value: "40%", label: "Energy Saved" },
      { value: "Gold", label: "Industry Award" },
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=900&fit=crop",
    accent: "#ff8c3a",
    year: "2024",
    tags: ["IoT", "React Native", "AI"],
  },
  {
    id: 3,
    number: "03",
    title: "Pulse Health",
    subtitle: "Wellness Reimagined",
    category: "Mobile App",
    description:
      "A holistic health tracking application combining AI-driven insights with breathtaking design. Co-developed with leading healthcare providers nationwide.",
    results: [
      { value: "1M+", label: "Downloads" },
      { value: "92%", label: "Retention" },
      { value: "#1", label: "Apple Feature" },
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=900&fit=crop",
    accent: "#ffa556",
    year: "2023",
    tags: ["Flutter", "ML", "HealthKit"],
  },
  {
    id: 4,
    number: "04",
    title: "Atlas Commerce",
    subtitle: "E-Commerce Mastery",
    category: "Platform",
    description:
      "A scalable e-commerce infrastructure powering 500+ global brands. Built for peak performance, engineered for conversion at every touchpoint.",
    results: [
      { value: "$200M", label: "GMV" },
      { value: "99.99%", label: "Uptime" },
      { value: "3×", label: "Conversions" },
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=900&fit=crop",
    accent: "#ff6b00",
    year: "2023",
    tags: ["Next.js", "Postgres", "Stripe"],
  },
  {
    id: 5,
    number: "05",
    title: "Quantum Labs",
    subtitle: "Research Innovation",
    category: "Web Platform",
    description:
      "Cutting-edge research collaboration for quantum computing scientists. Real-time data visualization and simulation tools at petascale.",
    results: [
      { value: "50+", label: "Universities" },
      { value: "10K", label: "Researchers" },
      { value: "Nature", label: "Featured" },
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&h=900&fit=crop",
    accent: "#ff8c3a",
    year: "2023",
    tags: ["WebGL", "Python", "D3.js"],
  },
];

function ProjectScene({
  project,
  direction,
}: {
  project: (typeof projects)[0];
  direction: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0, y: direction > 0 ? 80 : -80, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: direction > 0 ? -80 : 80, scale: 0.97 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1.03 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/92 via-gray-950/70 to-gray-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/30" />
        {/* Orange accent glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 20% 80%, ${project.accent}18 0%, transparent 70%)`,
          }}
          animate={{ opacity: hovered ? 1.5 : 1 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern-light opacity-20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left: project info */}
            <div className="lg:col-span-7">
              {/* Category + year */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                <span
                  className="px-4 py-2 rounded-full font-heading text-xs font-bold tracking-[0.2em] uppercase"
                  style={{
                    backgroundColor: `${project.accent}22`,
                    color: project.accent,
                    border: `1px solid ${project.accent}44`,
                  }}
                >
                  {project.category}
                </span>
                <span className="font-heading text-xs text-white/40 tracking-[0.2em] uppercase">
                  {project.year}
                </span>
              </motion.div>

              {/* Number */}
              <motion.div
                className="font-display text-[140px] lg:text-[200px] font-bold leading-none select-none absolute -left-4 top-0 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.04)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {project.number}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="font-heading text-sm font-semibold tracking-[0.25em] uppercase mb-4"
                style={{ color: project.accent }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                {project.subtitle}
              </motion.p>

              {/* Title */}
              <motion.h2
                className="font-display font-bold text-white leading-none mb-6"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-gray-300 font-body text-base lg:text-lg max-w-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.7 }}
              >
                {project.description}
              </motion.p>

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-2 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.48 }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/8 border border-white/10 font-heading text-xs text-white/60 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* View case study CTA */}
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-3 font-heading font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                whileHover={{ x: 6 }}
              >
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: project.accent }}
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
                View Case Study
                <motion.span
                  className="h-px w-8"
                  style={{ backgroundColor: project.accent }}
                  animate={{ width: hovered ? 32 : 24 }}
                />
              </motion.a>
            </div>

            {/* Right: Metrics */}
            <div className="lg:col-span-5">
              <motion.div
                className="grid gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.results.map((result, i) => (
                  <motion.div
                    key={result.label}
                    className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-md"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{
                      background: "rgba(255,255,255,0.08)",
                      borderColor: `${project.accent}40`,
                    }}
                  >
                    {/* Accent stripe */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                      style={{ backgroundColor: project.accent }}
                    />
                    <div className="pl-4">
                      <div
                        className="font-display text-4xl lg:text-5xl font-bold mb-1"
                        style={{ color: project.accent }}
                      >
                        {result.value}
                      </div>
                      <div className="font-heading text-sm text-white/50 tracking-wide uppercase">
                        {result.label}
                      </div>
                    </div>
                    {/* Subtle glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 20% 50%, ${project.accent}10 0%, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, projects.length]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const next = Math.min(Math.floor(v), projects.length - 1);
    if (next !== activeIndex) {
      setDirection(next > activeIndex ? 1 : -1);
      setActiveIndex(next);
    }
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="work"
      ref={containerRef}
      style={{ height: `${projects.length * 100 + 30}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-gray-950">
        {/* Section label */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
          <motion.span
            className="w-2 h-2 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-heading text-[11px] font-bold tracking-[0.3em] uppercase text-white/30">
            Featured Work
          </span>
        </div>

        {/* Project counter */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
          <motion.span
            key={activeIndex}
            className="font-display text-4xl font-bold text-white/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {projects[activeIndex].number}
          </motion.span>
          <span className="font-heading text-sm text-white/20">
            / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Project scenes */}
        <AnimatePresence mode="wait" custom={direction}>
          <ProjectScene
            key={activeIndex}
            project={projects[activeIndex]}
            direction={direction}
          />
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-3 mb-5">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className="relative"
                animate={{
                  width: i === activeIndex ? 32 : 8,
                  height: 8,
                  backgroundColor: i === activeIndex ? "#ff6b00" : "rgba(255,255,255,0.2)",
                }}
                style={{ borderRadius: 4 }}
                transition={{ duration: 0.3 }}
                whileHover={{ backgroundColor: i === activeIndex ? "#ff6b00" : "rgba(255,255,255,0.4)" }}
              />
            ))}
          </div>

          {/* Thin scroll progress line */}
          <div className="h-0.5 bg-white/5">
            <motion.div className="h-full bg-orange-500/60" style={{ width: progressWidth }} />
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-12 right-8 z-20 hidden lg:flex items-center gap-3"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-white/30">
            Scroll to explore
          </span>
          <svg className="w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
