import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { SITE_URL as siteUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { syne, spaceGrotesk, inter, ibmPlexSansArabic } from "@/lib/fonts";

/** Default metadata when middleware has not yet resolved locale (overridden per `[locale]`).
 *  The OG image comes from the app/opengraph-image.tsx file convention (1200×630). */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Watad",
    template: "%s | Watad",
  },
  openGraph: {
    title: "Watad",
    description: "Custom software, delivered and handed over.",
    url: siteUrl,
    siteName: "Watad",
    type: "website",
  },
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
