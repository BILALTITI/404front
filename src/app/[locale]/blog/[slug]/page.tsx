import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE_URL as siteUrl } from "@/lib/site";
import { BLOG_META } from "@/data/blog";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type BlogItemCopy = {
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function findPost(items: Record<string, BlogItemCopy>, slug: string) {
  const meta = BLOG_META.find((m) => m.slug === slug);
  if (!meta) return null;
  const copy = items[meta.slug];
  if (!copy) return null;
  return { ...meta, ...copy };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_META.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) return {};

  const t = await getTranslations({ locale, namespace: "blog" });
  const items = t.raw("items") as Record<string, BlogItemCopy>;
  const post = findPost(items, slug);
  if (!post) return {};

  const title = `${post.title} — Watad`;
  const url = `${siteUrl}/${locale}/blog/${slug}`;

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        ar: `${siteUrl}/ar/blog/${slug}`,
        "x-default": `${siteUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: "Watad",
      locale: locale === "ar" ? "ar_JO" : "en_US",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tWa = await getTranslations({ locale, namespace: "whatsapp" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const items = t.raw("items") as Record<string, BlogItemCopy>;
  const post = findPost(items, slug);
  if (!post) notFound();

  const startLink = buildWhatsAppLink(tWa("startProject"));
  const otherPosts = BLOG_META.filter((p) => p.slug !== slug);
  const url = `${siteUrl}/${locale}/blog/${slug}`;

  const articleJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    url,
    mainEntityOfPage: url,
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
        name: t("eyebrow"),
        item: `${siteUrl}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <Navigation />

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-32 sm:pt-40 pb-24 sm:pb-32">
          <nav className="mb-10 text-sm font-body text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              {tCommon("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-orange-500 transition-colors">
              {t("eyebrow")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{post.title}</span>
          </nav>

          <div
            className="w-10 h-1 rounded-full mb-6"
            style={{ backgroundColor: post.accent }}
          />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#123A5F] mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="font-heading text-xs font-semibold tracking-wider uppercase text-gray-400 mb-12">
            {post.readTime} {t("readTime")}
          </p>

          <div className="space-y-6 mb-16">
            {post.body.map((paragraph, i) => (
              <p
                key={i}
                className="font-body text-gray-600 text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            className="p-6 sm:p-8 rounded-3xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16"
            style={{ background: "linear-gradient(135deg, #F2F7FA 0%, #ffffff 100%)" }}
          >
            <div>
              <p className="font-display text-xl font-bold text-gray-900 mb-1">
                {tServices("ctaTitle")}
              </p>
              <p className="font-body text-gray-500">{tServices("ctaBody")}</p>
            </div>
            <a
              href={startLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#0C2740] text-white font-heading font-bold hover:bg-orange-500 transition-colors"
            >
              {tProjects("startProject")}
            </a>
          </div>

          <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
            {t("backToBlog")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherPosts.map((p) => {
              const copy = items[p.slug];
              if (!copy) return null;
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="px-5 py-3 rounded-full border border-gray-200 font-heading text-sm text-gray-700 hover:border-orange-400 hover:text-orange-500 transition-colors"
                >
                  {copy.title}
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
