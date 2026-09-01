import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
