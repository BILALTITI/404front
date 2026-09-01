import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE_URL as siteUrl } from "@/lib/site";
import { SERVICE_META } from "@/data/services";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type ServiceCopy = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
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
  const list = t.raw("list") as ServiceCopy[];
  const service = findService(list, slug);
  if (!service) notFound();

  const startLink = buildWhatsAppLink(tWa("startProject"));
  const otherServices = SERVICE_META.filter((s) => s.slug !== slug);
  const url = `${siteUrl}/${locale}/services/${slug}`;

  const serviceJson = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: ["JO", "MENA"],
    url,
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
