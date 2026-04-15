import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "../components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "4o4 — Startup software development | Web & mobile apps (Amman)",
    template: "%s | 4o4 Solutions",
  },
  description:
    "4o4 is a Jordan-based startup software team (since 2025) building custom web applications, mobile apps, and workflow automation for founders and companies across MENA.",
  keywords: [
    "startup software development",
    "custom web applications",
    "mobile app development",
    "MVP development",
    "web apps",
    "Jordan software company",
    "Amman developers",
    "MENA tech",
    "workflow automation",
    "n8n",
    "UI UX",
    "cloud deployment",
    "ASP.NET",
    "React",
    "React Native",
  ],
  authors: [{ name: "4o4 Solutions", url: siteUrl }],
  creator: "4o4 Solutions",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "4o4 — Custom web & mobile software from Jordan",
    description:
      "Ship reliable web apps, mobile apps, and automation with a focused team. Serving startups and growing businesses in Jordan and MENA since 2025.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "4o4 Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "4o4 — Startup software development (Jordan)",
    description:
      "Custom web applications, mobile apps, and automation for teams in MENA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
