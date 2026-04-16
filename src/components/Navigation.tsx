"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "fixed top-0 inset-x-0 z-50 transition-[padding] duration-300 ease-out",
        scrolled ? "py-3.5" : "py-7",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 -z-10 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out",
          scrolled
            ? "border-b border-black/[0.06] bg-white/85 shadow-sm backdrop-blur-md backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              className="relative group flex items-center gap-3 shrink-0"
            >
              <span className="font-display text-2xl font-bold tracking-tight">
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

          <div className="flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
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
              <span className="relative flex items-center gap-2">{t("cta")}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
