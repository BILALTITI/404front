"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.82)"],
  );
  const navBorderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 24]);
  const navPy = useTransform(scrollY, [0, 80], [28, 14]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ paddingTop: navPy, paddingBottom: navPy }}
    >
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
        <div className="flex items-center justify-between gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/#hero"
              className="relative group flex items-center gap-3 shrink-0"
            >
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-gray-900">4</span>
                <span className="text-orange-500">o</span>
                <span className="text-gray-900">4</span>
              </span>
              <span className="font-heading text-sm font-medium text-gray-400 hidden sm:block tracking-wider">
                Solutions
              </span>
            </Link>
          </motion.div>

          <nav
            className="hidden lg:flex items-center gap-8 font-heading text-sm font-medium text-gray-600"
            aria-label="Primary"
          >
            <a href="#work" className="hover:text-orange-600 transition-colors">
              Work
            </a>
            <a href="#about" className="hover:text-orange-600 transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-orange-600 transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-orange-600 transition-colors">
              Process
            </a>
            <a href="#testimonials" className="hover:text-orange-600 transition-colors">
              Stories
            </a>
          </nav>

          <motion.a
            href="#contact"
            className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gray-900 text-white font-heading text-sm font-semibold"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="absolute inset-0 bg-orange-500"
              initial={{ x: "-102%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative flex items-center gap-2">
              Let's Talk
            
            </span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
