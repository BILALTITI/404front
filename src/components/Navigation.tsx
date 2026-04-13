"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function MagneticLink({ item, index }: { item: typeof navItems[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const [active, setActive] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setActive(false);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      className="relative group py-2 px-1"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`relative font-heading text-sm font-medium tracking-wide transition-colors duration-300 ${
          active ? "text-orange-500" : "text-gray-700"
        }`}
      >
        {item.label}
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-orange-500 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </motion.a>
  );
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  const navBg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.82)"]);
  const navBorderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 24]);
  const navPy = useTransform(scrollY, [0, 80], [28, 14]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["hero", "work", "services", "about", "testimonials", "contact"];
      const current = sections.find((id) => {
        const el = id === "hero"
          ? document.body
          : document.getElementById(id);
        if (!el) return false;
        const rect = el === document.body
          ? { top: 0, bottom: window.innerHeight }
          : el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionLabel: Record<string, string> = {
    hero: "Home",
    work: "Projects",
    services: "Services",
    about: "About",
    testimonials: "Testimonials",
    contact: "Contact",
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ paddingTop: navPy, paddingBottom: navPy }}
      >
        {/* Glassmorphism background */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: navBg,
            backdropFilter: `blur(${navBlur}px)`,
            WebkitBackdropFilter: `blur(${navBlur}px)`,
            borderBottom: `1px solid rgba(0,0,0,${navBorderOpacity.get() * 0.05})`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo with glitch pulse */}
            <motion.a
              href="#"
              className="relative group flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <span className="font-display text-2xl font-bold tracking-tight">
                  <span className="text-gray-900">4</span>
                  <motion.span
                    className="text-orange-500"
                    animate={{
                      textShadow: [
                        "0 0 0px transparent",
                        "0 0 12px rgba(255,107,0,0.8), 0 0 24px rgba(255,107,0,0.4)",
                        "0 0 0px transparent",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                  >
                    O
                  </motion.span>
                  <span className="text-gray-900">4</span>
                </span>
                {/* Glitch layer */}
                <motion.span
                  className="absolute inset-0 font-display text-2xl font-bold tracking-tight text-orange-500/30 select-none"
                  animate={{
                    x: [-2, 2, -1, 1, 0],
                    opacity: [0, 0.8, 0, 0.4, 0],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                >
                  4O4
                </motion.span>
              </div>
              <span className="font-heading text-sm font-medium text-gray-400 hidden sm:block tracking-wider">
                Solutions
              </span>

              {/* Context indicator */}
              <motion.span
                key={activeSection}
                initial={{ opacity: 0, y: 4, x: -4 }}
                animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 4 }}
                className="hidden lg:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20"
              >
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span className="font-heading text-[11px] font-semibold text-orange-600 tracking-widest uppercase">
                  {sectionLabel[activeSection] ?? ""}
                </span>
              </motion.span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item, i) => (
                <MagneticLink key={item.label} item={item} index={i} />
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href="#contact"
                className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gray-900 text-white font-heading text-sm font-semibold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.span
                  className="absolute inset-0 bg-orange-500"
                  initial={{ x: "-102%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative flex items-center gap-2">
                  Let's Talk
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.a>
            </div>

            {/* Mobile burger */}
            <motion.button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-5 h-4">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-0 right-0 h-0.5 bg-gray-900 rounded-full"
                    style={{ top: i === 0 ? "0%" : i === 1 ? "50%" : "100%" }}
                    animate={
                      isMobileMenuOpen
                        ? i === 0
                          ? { top: "50%", rotate: 45, y: "-50%" }
                          : i === 1
                          ? { opacity: 0 }
                          : { top: "50%", rotate: -45, y: "50%" }
                        : { top: i === 0 ? "0%" : i === 1 ? "50%" : "100%", rotate: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden bg-white flex flex-col"
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -30,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10 pt-20">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isMobileMenuOpen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-orange-500 text-white font-heading font-bold rounded-full text-lg"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isMobileMenuOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ delay: 0.3 }}
          >
            Let's Talk
          </motion.a>
        </div>

        {/* Orange accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
      </motion.div>
    </>
  );
}
