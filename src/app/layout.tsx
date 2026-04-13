import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4O4 Solutions | Premium Digital Agency",
  description:
    "We're a forward-thinking digital agency crafting exceptional websites, apps, and smart business solutions that transform ideas into unforgettable experiences.",
  keywords: [
    "digital agency",
    "web development",
    "mobile apps",
    "UI/UX design",
    "brand strategy",
  ],
  authors: [{ name: "4O4 Solutions" }],
  openGraph: {
    title: "4O4 Solutions | Premium Digital Agency",
    description:
      "Crafting exceptional digital experiences that drive growth and inspire users.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
