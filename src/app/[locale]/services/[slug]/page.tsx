import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE_URL as siteUrl } from "@/lib/site";
import { SERVICE_META } from "@/data/services";
import { BLOG_META } from "@/data/blog";
import { PROJECT_META } from "@/data/projects";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type ServiceCopy = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  faqs?: { question: string; answer: string }[];
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function findService(list: ServiceCopy[], slug: string) {
  const meta = SERVICE_META.find((m) => m.slug === slug);
  if (!meta) return null;
  const copy = list.find((s) => s.id === meta.id);
  if (!copy) return null;
  return { ...meta, ...copy };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_META.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) return {};

  const t = await getTranslations({ locale, namespace: "services" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const list = t.raw("list") as ServiceCopy[];
  const service = findService(list, slug);
  if (!service) return {};

  const title = `${service.title} — Watad`;
  const description =
    service.description.length > 160
      ? `${service.description.slice(0, 157)}...`
      : service.description;
  const url = `${siteUrl}/${locale}/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/services/${slug}`,
        ar: `${siteUrl}/ar/services/${slug}`,
        "x-default": `${siteUrl}/en/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Watad",
      locale: locale === "ar" ? "ar_JO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });
  const tPage = await getTranslations({ locale, namespace: "servicePage" });
  const tWa = await getTranslations({ locale, namespace: "whatsapp" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const list = t.raw("list") as ServiceCopy[];
  const service = findService(list, slug);
  if (!service) notFound();

  const startLink = buildWhatsAppLink(tWa("startProject"));
  const otherServices = SERVICE_META.filter((s) => s.slug !== slug);
  const url = `${siteUrl}/${locale}/services/${slug}`;

  const projectItems = tProjects.raw("items") as Record<string, { title: string }>;
  const relatedProjects = (service.relatedProjects ?? [])
    .map((key) => {
      const meta = PROJECT_META.find((p) => p.messageKey === key);
      const copy = projectItems[key];
      if (!meta || !copy) return null;
      return { slug: key, title: copy.title };
    })
    .filter((p): p is { slug: string; title: string } => p !== null);

  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: ["JO", "MENA"],
    url,
  };

  const serviceFaqJson =
    service.faqs && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

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
        name: t("titleLine1"),
        item: `${siteUrl}/${locale}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      {serviceFaqJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqJson) }}
        />
      )}

      <Navigation />

      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-32 sm:pt-40 pb-24 sm:pb-32">
          <nav className="mb-10 text-sm font-body text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              {tCommon("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/#services"
              className="hover:text-orange-500 transition-colors"
            >
              {t("titleLine1")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{service.title}</span>
          </nav>

          <p className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-orange-600 mb-4">
            {tPage("eyebrow")}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#123A5F] mb-6">
            {service.title}
          </h1>
          <p className="font-heading text-lg text-gray-500 mb-8">
            {service.subtitle}
          </p>
          <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
            {service.description}
          </p>

          <h2 className="font-display text-2xl font-bold text-[#123A5F] mb-5">
            {tPage("featuresHeading")}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-14">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 font-body text-gray-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {service.techStack && service.techStack.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-bold text-[#123A5F] mb-5">
                {tPage("techStackHeading")}
              </h2>
              <div className="flex flex-wrap gap-2 mb-14">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 font-heading text-xs text-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          )}

          <div
            className="p-6 sm:p-8 rounded-3xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16"
            style={{ background: "linear-gradient(135deg, #F2F7FA 0%, #ffffff 100%)" }}
          >
            <div>
              <p className="font-display text-xl font-bold text-gray-900 mb-1">
                {t("ctaTitle")}
              </p>
              <p className="font-body text-gray-500">{t("ctaBody")}</p>
            </div>
            <a
              href={startLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full sm:w-auto text-center px-8 py-4 rounded-full bg-[#0C2740] text-white font-heading font-bold hover:bg-orange-500 transition-colors"
            >
              {t("ctaButton")}
            </a>
          </div>

          {relatedProjects.length > 0 && (
            <>
              <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
                {tPage("relatedProjectsHeading")}
              </h2>
              <div className="flex flex-wrap gap-3 mb-16">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="px-5 py-3 rounded-full border border-gray-200 font-heading text-sm text-gray-700 hover:border-orange-400 hover:text-orange-500 transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </>
          )}

          {service.faqs && service.faqs.length > 0 && (
            <>
              <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
                {tPage("faqHeading")}
              </h2>
              <div className="mb-16 divide-y divide-gray-100 border-t border-b border-gray-100">
                {service.faqs.map((item) => (
                  <div key={item.question} className="py-5">
                    <p className="font-heading font-semibold text-[#123A5F] mb-2">
                      {item.question}
                    </p>
                    <p className="font-body text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Related articles */}
          {(() => {
            const relArticles = BLOG_META.filter((b) =>
              b.relatedServices?.includes(slug),
            );
            if (relArticles.length === 0) return null;
            const blogItems = tBlog.raw("items") as Record<string, { title: string; excerpt: string }>;
            return (
              <>
                <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
                  {tPage("relatedArticlesHeading")}
                </h2>
                <div className="space-y-3 mb-16">
                  {relArticles.map((article) => {
                    const copy = blogItems[article.slug];
                    if (!copy) return null;
                    return (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        className="block p-4 rounded-xl border border-gray-100 hover:border-orange-300 transition-colors group"
                      >
                        <p className="font-display text-base font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
                          {copy.title}
                        </p>
                        <p className="font-body text-sm text-gray-500 line-clamp-1">
                          {copy.excerpt}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </>
            );
          })()}

          <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
            {tPage("otherServicesHeading")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherServices.map((s) => {
              const copy = list.find((c) => c.id === s.id);
              if (!copy) return null;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
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
