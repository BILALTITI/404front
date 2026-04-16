"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true });

  const currentYear = new Date().getFullYear();

  const linkDefs = [
    { key: "work" as const, href: "#work" },
    { key: "about" as const, href: "#about" },
    { key: "services" as const, href: "#services" },
    { key: "process" as const, href: "#process" },
    { key: "testimonials" as const, href: "#testimonials" },
    { key: "contact" as const, href: "#contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gray-950 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 start-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <Link href="/" className="inline-block mb-6">
                <span className="font-display text-3xl font-bold">
                  <span className="text-white">4</span>
                  <span className="text-orange-500">o</span>
                  <span className="text-white">4</span>
                  <span className="ms-2 font-heading text-lg font-medium text-gray-400">
                    {tCommon("brandSuffix")}
                  </span>
                </span>
              </Link>
              <p className="font-body text-gray-400 leading-relaxed mb-6 max-w-sm">
                {t("blurb")}
              </p>
              <p className="font-heading text-sm text-gray-500">
                {t("location")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h3 className="font-heading font-semibold text-white mb-4">
                {t("explore")}
              </h3>
              <ul className="space-y-3">
                {linkDefs.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="font-body text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {t(`links.${item.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 border-t border-white/5"
        >
          <div className="flex items-center justify-center">
            <p className="font-body text-sm text-gray-500">
              {t("rights", { year: currentYear })}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
