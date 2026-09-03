import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE_URL as siteUrl } from "@/lib/site";
import { PROJECT_META } from "@/data/projects";
import { SERVICE_META } from "@/data/services";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type ProjectItemCopy = {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  result: string;
  imageAlt: string;
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function findProject(items: Record<string, ProjectItemCopy>, slug: string) {
  const meta = PROJECT_META.find((m) => m.messageKey === slug);
  if (!meta) return null;
  const copy = items[meta.messageKey];
  if (!copy) return null;
  return { ...meta, ...copy };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECT_META.map((p) => ({ locale, slug: p.messageKey })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) return {};

  const t = await getTranslations({ locale, namespace: "projects" });
  const items = t.raw("items") as Record<string, ProjectItemCopy>;
  const project = findProject(items, slug);
  if (!project) return {};

  const title = `${project.title} — Watad`;
  const description =
    project.description.length > 160
      ? `${project.description.slice(0, 157)}...`
      : project.description;
  const url = `${siteUrl}/${locale}/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/projects/${slug}`,
        ar: `${siteUrl}/ar/projects/${slug}`,
        "x-default": `${siteUrl}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
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

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "projects" });
  const tPage = await getTranslations({ locale, namespace: "projectPage" });
  const tWa = await getTranslations({ locale, namespace: "whatsapp" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as Record<string, ProjectItemCopy>;
  const project = findProject(items, slug);
  if (!project) notFound();

  const startLink = buildWhatsAppLink(tWa("startProject"));
  const otherProjects = PROJECT_META.filter((p) => p.messageKey !== slug);
  const url = `${siteUrl}/${locale}/projects/${slug}`;

  const serviceList = tServices.raw("list") as { id: number; title: string }[];
  const relatedServices = SERVICE_META.filter((s) =>
    s.relatedProjects.includes(slug),
  )
    .map((s) => {
      const copy = serviceList.find((c) => c.id === s.id);
      if (!copy) return null;
      return { slug: s.slug, title: copy.title };
    })
    .filter((s): s is { slug: string; title: string } => s !== null);

  const projectJson = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@id": `${siteUrl}/#organization` },
    url,
    ...(project.link ? { sameAs: project.link } : {}),
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
        name: t("titleLine1"),
        item: `${siteUrl}/${locale}#work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <Navigation />

      <main className="min-h-screen bg-white">
        <div className="relative aspect-[21/9] overflow-hidden bg-gray-100 mt-[64px] sm:mt-[88px]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 sm:py-24">
          <nav className="mb-10 text-sm font-body text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              {tCommon("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/#work"
              className="hover:text-orange-500 transition-colors"
            >
              {t("titleLine1")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{project.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-4 py-2 rounded-full font-heading text-xs font-bold tracking-wider uppercase"
              style={{
                backgroundColor: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
              }}
            >
              {project.category}
            </span>
            <span className="font-heading text-xs text-gray-400 tracking-wider uppercase">
              {project.year}
            </span>
          </div>

          <p
            className="font-heading text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: project.accent }}
          >
            {tPage("eyebrow")} — {project.subtitle}
          </p>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-950 mb-6">
            {project.title}
          </h1>

          <p className="text-gray-600 font-body text-lg leading-relaxed max-w-2xl mb-10">
            {project.description}
          </p>

          <div className="mb-10 p-6 rounded-2xl border-2 border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div
                className="w-1.5 h-12 rounded-full"
                style={{ backgroundColor: project.accent }}
              />
              <div>
                <div className="font-heading text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {t("keyResult")}
                </div>
                <div
                  className="font-display text-2xl font-bold"
                  style={{ color: project.accent }}
                >
                  {project.result}
                </div>
              </div>
            </div>
          </div>

          <h2 className="font-display text-lg font-bold text-[#123A5F] mb-4">
            {tPage("techHeading")}
          </h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 font-heading text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-16">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: project.accent }}
              >
                <span>{t("visitLive")}</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
            <a
              href={startLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-500 transition-colors"
            >
              <span>{t("startProject")}</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          {relatedServices.length > 0 && (
            <>
              <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
                {tPage("relatedServicesHeading")}
              </h2>
              <div className="flex flex-wrap gap-3 mb-16">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="px-5 py-3 rounded-full border border-gray-200 font-heading text-sm text-gray-700 hover:border-orange-400 hover:text-orange-500 transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2 className="font-display text-xl font-bold text-[#123A5F] mb-5">
            {tPage("otherProjectsHeading")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherProjects.map((p) => {
              const copy = items[p.messageKey];
              if (!copy) return null;
              return (
                <Link
                  key={p.messageKey}
                  href={`/projects/${p.messageKey}`}
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
