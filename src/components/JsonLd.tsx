import { getTranslations } from "next-intl/server";
import { SITE_URL as siteUrl } from "@/lib/site";

export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });
  const description = t("organizationDescription");
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const faqItems = tFaq.raw("items") as { question: string; answer: string }[];

  const organizationJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Watad",
    alternateName: "وتد",
    url: siteUrl,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    foundingDate: "2025",
    areaServed: ["JO", "MENA"],
    knowsAbout: [
      "Software development",
      "Web applications",
      "Mobile application development",
      "Workflow automation",
    ],
    "@id": `${siteUrl}/#organization`,
  };

  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Watad",
    url: siteUrl,
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
