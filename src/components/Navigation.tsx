"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_LINKS = [
  { key: "work", href: "#work" },
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "stories", href: "#testimonials" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "fixed top-0 inset-x-0 z-50 transition-[padding] duration-300 ease-out",
        scrolled ? "py-3" : "py-4 sm:py-7",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 -z-10 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out",
          scrolled || menuOpen
            ? "border-b border-black/[0.06] bg-white/85 shadow-sm backdrop-blur-md backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              className="relative group flex items-center gap-3 shrink-0"
            >
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-gray-900">4</span>
                <span className="text-orange-500">o</span>
                <span className="text-gray-900">4</span>
              </span>
              <span className="font-heading text-sm font-medium text-gray-400 hidden sm:block tracking-wider">
                {t("brandSuffix")}
              </span>
            </Link>
          </motion.div>

          <nav
            className="hidden lg:flex items-center gap-8 font-heading text-sm font-medium text-gray-600"
            aria-label={t("primary")}
          >
            <a href="#work" className="hover:text-orange-600 transition-colors">
              {t("work")}
            </a>
            <a href="#about" className="hover:text-orange-600 transition-colors">
              {t("about")}
            </a>
            <a
              href="#services"
              className="hover:text-orange-600 transition-colors"
            >
              {t("services")}
            </a>
            <a href="#process" className="hover:text-orange-600 transition-colors">
              {t("process")}
            </a>
            <a
              href="#testimonials"
              className="hover:text-orange-600 transition-colors"
            >
              {t("stories")}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />
            <motion.a
              href="#contact"
              className="relative group overflow-hidden hidden sm:inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gray-900 text-white font-heading text-xs sm:text-sm font-semibold"
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
              <span className="relative flex items-center gap-2">{t("cta")}</span>
            </motion.a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden relative w-10 h-10 rounded-full border border-black/[0.08] bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center"
              aria-label={t("primary")}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">{t("primary")}</span>
              <span className="relative block w-4 h-3">
                <motion.span
                  className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-gray-900"
                  animate={
                    menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-gray-900"
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gray-900"
                  animate={
                    menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-b border-black/[0.06] bg-white/95 backdrop-blur-md shadow-sm"
          >
            <nav
              className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1 font-heading text-base font-medium text-gray-700"
              aria-label={t("primary")}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="px-3 py-3 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.05 }}
                className="mt-2 px-5 py-3 rounded-full bg-gray-900 text-white text-center font-semibold animate-pulse-glow"
              >
                {t("cta")}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
