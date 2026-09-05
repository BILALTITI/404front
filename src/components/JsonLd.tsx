import { getTranslations } from "next-intl/server";
import { SITE_URL as siteUrl } from "@/lib/site";

type ServiceCopy = {
  title: string;
  description: string;
};

export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });
  const description = t("organizationDescription");
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];
  const tServices = await getTranslations({ locale, namespace: "services" });
  const serviceItems = tServices.raw("list") as ServiceCopy[];

  const organizationJson = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "Watad Solutions",
    alternateName: ["وتد"],
    url: siteUrl,
    sameAs: ["https://www.instagram.com/4o4_solution"],
    logo: `${siteUrl}/watad-logo.png`,
    image: `${siteUrl}/watad-logo.png`,
    description,
    email: "hello@watad.co",
    telephone: "+962-7-9812-4169",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      "@id": `${siteUrl}/#bilal-altiti`,
      name: "Bilal Altiti",
      jobTitle: "Founder",
      url: `${siteUrl}/en/authors/bilal-altiti`,
      sameAs: ["https://github.com/BILALTITI"],
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+962-7-9812-4169",
      areaServed: ["JO", "MENA"],
      availableLanguage: ["English", "Arabic"],
    },
    areaServed: ["JO", "MENA"],
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
    "@id": `${siteUrl}/#organization`,
  };

  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Watad Solutions",
    url: siteUrl,
    description,
    inLanguage: locale === "ar" ? "ar" : "en",
    publisher: { "@id": `${siteUrl}/#organization` },
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </>
  );
}
