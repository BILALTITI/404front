"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const locales = [
  { code: "en" as const, label: "EN" },
  { code: "ar" as const, label: "عربي" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/80 p-1 text-xs font-heading font-semibold shadow-sm backdrop-blur-sm"
      role="navigation"
      aria-label={t("languageSwitcher")}
    >
      {locales.map(({ code, label }) => {
        const active = locale === code;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            className={[
              "rounded-full px-3 py-1.5 transition-colors",
              active
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-orange-600",
            ].join(" ")}
            hrefLang={code}
            lang={code}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
