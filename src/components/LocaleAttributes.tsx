"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/** Syncs <html lang> and dir with the active next-intl locale (SSR defaults in root layout). */
export function LocaleAttributes() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("font-arabic", locale === "ar");
  }, [locale]);

  return null;
}
