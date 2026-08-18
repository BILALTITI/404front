"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Locale-aware 404 — rendered for unmatched paths under /en and /ar. */
export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8EDF1] px-6 text-center">
      <p className="font-heading text-sm text-[#1B6491] mb-2">{t("eyebrow")}</p>
      <h1 className="font-display text-3xl font-bold text-[#123A5F] mb-4">
        {t("title")}
      </h1>
      <p className="text-gray-500 font-body mb-8 max-w-md">{t("body")}</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#0C2740] text-white font-heading font-semibold hover:bg-[#1B6491] transition-colors"
      >
        {t("cta")}
      </Link>
    </div>
  );
}
