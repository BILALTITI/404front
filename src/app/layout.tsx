import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { SITE_URL as siteUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { syne, spaceGrotesk, inter, ibmPlexSansArabic } from "@/lib/fonts";

/**
 * Root metadata must NOT set a title.template — locale layout owns titles.
 * A root template was double-suffixing every page (e.g. "… — Watad | Watad").
 * OG image comes from app/opengraph-image.tsx (1200×630).
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "tFgjC0cr61vbHLOP4qcHKNHL4Vyel10TgthZphxBiiw",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // getLocale() reads the locale next-intl's middleware already resolved for
  // this request, so <html lang>/dir> are correct in the very first
  // server-rendered response instead of only after client-side hydration
  // (see src/components/LocaleAttributes.tsx, kept as a client-nav backstop).
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`scroll-smooth ${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${ibmPlexSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
