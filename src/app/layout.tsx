import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Default metadata when middleware has not yet resolved locale (overridden per `[locale]`). */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "4o4 Solutions",
    template: "%s | 4o4 Solutions",
  },
  openGraph: {
    title: "4o4 Solutions",
    description: "Professional software solutions",
    url: siteUrl,
    siteName: "4o4 Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
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
