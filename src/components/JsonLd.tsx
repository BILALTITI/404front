import { getTranslations } from "next-intl/server";
import { SITE_URL as siteUrl } from "@/lib/site";

type ServiceCopy = {
  title: string;
  description: string;
};

/** Organization + WebSite entity graph. FAQPage belongs only on the homepage
 *  (see HomeFaqJsonLd) — emitting it site-wide is invalid structured data. */
export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });
  const description = t("organizationDescription");
  const tServices = await getTranslations({ locale, namespace: "services" });
  const serviceItems = tServices.raw("list") as ServiceCopy[];

  const organizationJson = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: "Watad Solutions",
    alternateName: ["وتد", "Watad"],
    url: siteUrl,
    sameAs: ["https://www.instagram.com/4o4_solution", "https://github.com/BILALTITI"],
    logo: `${siteUrl}/watad-logo.png`,
    image: `${siteUrl}/watad-logo.png`,
    description,
    email: "info@watad-solutions.com",
    telephone: "+962-7-9812-4169",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressRegion: "Amman",
      addressCountry: "JO",
    },
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      "@id": `${siteUrl}/#bilal-altiti`,
      name: "Bilal Altiti",
      jobTitle: "Founder",
      url: `${siteUrl}/${locale}/authors/bilal-altiti`,
      sameAs: ["https://github.com/BILALTITI"],
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+962-7-9812-4169",
        email: "info@watad-solutions.com",
        areaServed: ["JO", "SA", "AE", "MENA"],
        availableLanguage: ["English", "Arabic"],
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Jordan" },
      { "@type": "AdministrativeArea", name: "Amman" },
      { "@type": "Place", name: "MENA" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    knowsAbout: [
      "Software development",
      "Custom software development",
      "Web applications",
      "Web development",
      "Mobile application development",
      "SaaS development",
      "UI/UX design",
      "Business automation",
      "Workflow automation",
      "Cloud solutions",
      "API development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Watad Solutions services",
      itemListElement: serviceItems.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: ["JO", "MENA"],
          provider: { "@id": `${siteUrl}/#organization` },
        },
      })),
    },
  };

  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Watad Solutions",
    url: siteUrl,
    description,
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJson),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
      />
    </>
  );
}

/** FAQPage JSON-LD — homepage only, matching visible FAQ content. */
export async function HomeFaqJsonLd({ locale }: { locale: string }) {
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
    />
  );
}
