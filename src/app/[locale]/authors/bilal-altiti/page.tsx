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
};

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) return {};

  const t = await getTranslations({ locale, namespace: "authorPage" });
  const title = `${t("name")} — Watad Solutions`;
  const description = t("metaDescription");
  const url = `${siteUrl}/${locale}/authors/bilal-altiti`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/authors/bilal-altiti`,
        ar: `${siteUrl}/ar/authors/bilal-altiti`,
        "x-default": `${siteUrl}/en/authors/bilal-altiti`,
      },
    },
    openGraph: {
      title,
      description,
      type: "profile",
      url,
      siteName: "Watad Solutions",
      locale: locale === "ar" ? "ar_JO" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "authorPage" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const blogItems = tBlog.raw("items") as Record<string, BlogItemCopy>;
  const expertiseAreas = t.raw("expertise") as string[];

  const url = `${siteUrl}/${locale}/authors/bilal-altiti`;

  const personJson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#bilal-altiti`,
    name: "Bilal Altiti",
    jobTitle: t("role"),
    description: t("bioShort"),
    url,
    worksFor: { "@id": `${siteUrl}/#organization` },
    knowsAbout: expertiseAreas,
    sameAs: [
      "https://github.com/BILALTITI",
    ],
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tCommon("brand"),
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumbAuthors"),
        item: `${siteUrl}/${locale}/authors/bilal-altiti`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Bilal Altiti",
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <Navigation />

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-32 sm:pt-40 pb-24 sm:pb-32">
          {/* Breadcrumb */}
          <nav className="mb-10 text-sm font-body text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              {tCommon("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{t("name")}</span>
          </nav>

          {/* Author header */}
          <div className="mb-12">
            <div className="w-10 h-1 rounded-full bg-[#22B8DE] mb-6" />
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#123A5F] mb-4 leading-tight">
              {t("name")}
            </h1>
            <p className="font-heading text-sm font-semibold tracking-widest uppercase text-[#22B8DE] mb-6">
              {t("role")}
            </p>
            <div className="space-y-4 mb-8">
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                {t("bio1")}
              </p>
              <p className="font-body text-gray-600 text-lg leading-relaxed">
                {t("bio2")}
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
              {t("expertiseHeading")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 font-heading text-xs text-gray-600"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Published articles */}
          <div>
            <h2 className="font-display text-xl font-bold text-[#123A5F] mb-6">
              {t("articlesHeading")}
            </h2>
            <div className="space-y-4">
              {BLOG_META.map((post) => {
                const copy = blogItems[post.slug];
                if (!copy) return null;
                const formattedDate = new Date(post.date).toLocaleDateString(
                  locale === "ar" ? "ar" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                );
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-5 rounded-2xl border border-gray-100 hover:border-orange-300 transition-colors group"
                  >
                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
                      {copy.title}
                    </h3>
                    <p className="font-body text-sm text-gray-500 mb-2 line-clamp-2">
                      {copy.excerpt}
                    </p>
                    <div className="flex items-center gap-2 font-heading text-xs text-gray-400">
                      <time dateTime={post.date}>{formattedDate}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{copy.readTime} {tBlog("readTime")}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
