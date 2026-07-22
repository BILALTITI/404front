import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL as siteUrl } from "@/lib/site";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
