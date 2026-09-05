"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICE_META } from "@/data/services";

type ServiceCopy = { id: number; title: string };

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tServices = useTranslations("services");
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true });
  const serviceList = tServices.raw("list") as ServiceCopy[];

  const currentYear = new Date().getFullYear();

  const linkDefs = [
    { key: "work" as const, href: "#work" },
    { key: "about" as const, href: "#about" },
    { key: "services" as const, href: "#services" },
    { key: "process" as const, href: "#process" },
    { key: "testimonials" as const, href: "#testimonials" },
    { key: "faq" as const, href: "#faq" },
    { key: "blog" as const, href: "/blog" },
    { key: "contact" as const, href: "#contact" },
  ];

  const brandText = tCommon("brand");
  const renderBrand = () => {
    if (/^[A-Za-z\s]+$/.test(brandText) && brandText.includes(" ")) {
      // Multi-word brand like "Watad Solutions"
      const words = brandText.split(" ");
      return (
        <>
          {words.slice(0, -1).join(" ")}{" "}
          <span className="text-[#22B8DE]">
            {words[words.length - 1]}
          </span>
        </>
      );
    } else if (/^[A-Za-z]+$/.test(brandText)) {
      // Single word brand
      return (
        <>
          {brandText.slice(0, -2)}
          <span className="text-[#22B8DE]">
            {brandText.slice(-2)}
          </span>
        </>
      );
    } else {
      // Fallback
      return brandText;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0C2740] border-t border-white/5 overflow-hidden"
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
                <span className="font-display text-2xl sm:text-3xl font-bold">
                  <span className="text-white">
                    {renderBrand()}
                  </span>
                </span>
              </Link>
              <p className="font-body text-gray-400 leading-relaxed mb-6 max-w-sm">
                {t("blurb")}
              </p>
              <p className="font-heading text-sm text-gray-500 mb-2">
                {t("location")}
              </p>
              <p className="font-heading text-sm text-gray-500 mb-2">
                <a
                  href={`mailto:${t("email")}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {t("email")}
                </a>
              </p>
              <p className="font-heading text-sm text-gray-500 mb-2">
                <a
                  href={t("phoneHref")}
                  className="hover:text-orange-500 transition-colors"
                  dir="ltr"
                >
                  {t("phone")}
                </a>
              </p>
              <p className="font-heading text-sm text-gray-500">
                <a
                  href={`https://wa.me/962798124169`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  {t("whatsappLabel")}
                </a>
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
                      href={`/${locale}${item.href}`}
                      className="font-body text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {t(`links.${item.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <h3 className="font-heading font-semibold text-white mb-4">
                {t("links.services")}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {SERVICE_META.map((meta) => {
                  const copy = serviceList.find((s) => s.id === meta.id);
                  if (!copy) return null;
                  return (
                    <li key={meta.slug}>
                      <Link
                        href={`/services/${meta.slug}`}
                        className="font-body text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        {copy.title}
                      </Link>
                    </li>
                  );
                })}
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
