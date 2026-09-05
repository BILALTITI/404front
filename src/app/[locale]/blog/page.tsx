import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE_URL as siteUrl } from "@/lib/site";
import { BLOG_META } from "@/data/blog";

type BlogItemCopy = {
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t("eyebrow");
  const description = t("intro");
  const url = `${siteUrl}/${locale}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/blog`,
        ar: `${siteUrl}/ar/blog`,
        "x-default": `${siteUrl}/en/blog`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Watad Solutions",
      locale: locale === "ar" ? "ar_JO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const items = t.raw("items") as Record<string, BlogItemCopy>;

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-32 sm:pt-40 pb-24 sm:pb-32">
          <nav className="mb-10 text-sm font-body text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              {tCommon("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{t("eyebrow")}</span>
          </nav>

          <p className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600 mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#123A5F] mb-6">
            {t("titleLine1")} {t("titleGradient")}
          </h1>
          <p className="font-body text-gray-600 text-lg leading-relaxed mb-14 max-w-2xl">
            {t("intro")}
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {BLOG_META.map((meta) => {
              const copy = items[meta.slug];
              if (!copy) return null;
              return (
                <Link
                  key={meta.slug}
                  href={`/blog/${meta.slug}`}
                  className="group block p-6 sm:p-8 rounded-3xl border border-gray-100 hover:border-orange-200 transition-colors"
                  style={{ background: "linear-gradient(135deg, #F2F7FA 0%, #ffffff 100%)" }}
                >
                  <div
                    className="w-10 h-1 rounded-full mb-6"
                    style={{ backgroundColor: meta.accent }}
                  />
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#123A5F] mb-3 group-hover:text-orange-600 transition-colors">
                    {copy.title}
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed mb-4">
                    {copy.excerpt}
                  </p>
                  <span className="font-heading text-xs font-semibold tracking-wider uppercase text-gray-400">
                    {copy.readTime} {t("readTime")}
                    <span aria-hidden="true"> &middot; </span>
                    <time dateTime={meta.date}>
                      {new Date(meta.date).toLocaleDateString(
                        locale === "ar" ? "ar" : "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </time>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
